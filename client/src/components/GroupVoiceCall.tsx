import { useEffect, useMemo, useRef, useState } from 'react'
import { arrayRemove, arrayUnion, doc, onSnapshot, setDoc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { getUserProfile, type UserProfile } from '../services/chat'
import Avatar from './Avatar'

type Props = {
  uid: string
  callId: string
  groupName: string
  memberIds: string[]
  callerId: string
  host: boolean
  onClose: () => void
}

type PeerState = { peer: RTCPeerConnection; remoteReady: boolean; pending: RTCIceCandidateInit[]; seen: Set<string> }
const MAX_CALL_SECONDS = 60 * 60

export default function GroupVoiceCall({ uid, callId, groupName, memberIds, callerId, host, onClose }: Props) {
  const [status, setStatus] = useState('Joining…')
  const [muted, setMuted] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [joinedIds, setJoinedIds] = useState<string[]>([uid])
  const [profiles, setProfiles] = useState<Record<string, UserProfile>>({})
  const streamRef = useRef<MediaStream | null>(null)
  const peers = useRef<Record<string, PeerState>>({})
  const audioRefs = useRef<Record<string, HTMLAudioElement | null>>({})
  const startedAt = useRef<number>(Date.now())
  const expiryTimer = useRef<number | undefined>(undefined)
  const stopped = useRef(false)
  const [error, setError] = useState('')
  const otherIds = useMemo(() => joinedIds.filter(id => id !== uid), [joinedIds, uid])

  useEffect(() => {
    let unsubscribe: (() => void) | undefined
    const start = async () => {
      if (!db) { setError('Voice calling is unavailable.'); return }
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        if (stopped.current) return
        streamRef.current = stream
        const callRef = doc(db, 'calls', callId)
        await updateDoc(callRef, { joinedIds: arrayUnion(uid) })
        unsubscribe = onSnapshot(callRef, snap => {
          const data = snap.data()
          if (!data) return
          if (data.status === 'ended') { setStatus('Call ended'); onClose(); return }
          const created = data.createdAt?.toMillis?.()
          if (created) {
            startedAt.current = created
            const remaining = Math.max(0, created + MAX_CALL_SECONDS * 1000 - Date.now())
            if (remaining === 0) {
              updateDoc(callRef, { status: 'ended', endedAt: serverTimestamp() }).catch(() => undefined)
              setStatus('One-hour limit reached'); onClose(); return
            }
            if (expiryTimer.current) window.clearTimeout(expiryTimer.current)
            expiryTimer.current = window.setTimeout(() => {
              updateDoc(callRef, { status: 'ended', endedAt: serverTimestamp() }).catch(() => undefined)
              setStatus('One-hour limit reached'); onClose()
            }, remaining)
          }
          const ids = Array.isArray(data.joinedIds) ? data.joinedIds.map(String) : []
          setJoinedIds(ids.includes(uid) ? ids : [...ids, uid])
          setStatus(ids.length > 1 ? 'Connected' : 'Waiting for others…')
        })
      } catch (e) { setError(e instanceof Error ? e.message : 'Microphone permission is required.') }
    }
    start()
    return () => { stopped.current = true; unsubscribe?.(); if (expiryTimer.current) window.clearTimeout(expiryTimer.current); streamRef.current?.getTracks().forEach(track => track.stop()); Object.values(peers.current).forEach(item => item.peer.close()) }
  }, [callId, uid, onClose])

  useEffect(() => {
    const ids = [...new Set([...memberIds, ...joinedIds])]
    Promise.all(ids.map(async id => [id, await getUserProfile(id)] as const)).then(items => setProfiles(old => ({ ...old, ...Object.fromEntries(items.filter((item): item is [string, UserProfile] => Boolean(item[1]))) })))
  }, [memberIds, joinedIds, uid])

  useEffect(() => {
    if (!db || !streamRef.current) return
    const iceServers: RTCIceServer[] = [{ urls: 'stun:stun.l.google.com:19302' }]
    const turnUrl = import.meta.env.VITE_TURN_URL as string | undefined
    const turnUsername = import.meta.env.VITE_TURN_USERNAME as string | undefined
    const turnCredential = import.meta.env.VITE_TURN_CREDENTIAL as string | undefined
    if (turnUrl && turnUsername && turnCredential) iceServers.push({ urls: turnUrl, username: turnUsername, credential: turnCredential })
    const cleanups: (() => void)[] = []
    const connect = async (otherId: string) => {
      if (!db || stopped.current || peers.current[otherId] || uid > otherId) return
      const pairId = [uid, otherId].sort().join('_')
      const signalRef = doc(db, 'calls', callId, 'peers', pairId)
      const state: PeerState = { peer: new RTCPeerConnection({ iceServers }), remoteReady: false, pending: [], seen: new Set() }
      peers.current[otherId] = state
      streamRef.current?.getTracks().forEach(track => state.peer.addTrack(track, streamRef.current!))
      state.peer.ontrack = event => { const audio = audioRefs.current[otherId]; if (audio && !audio.srcObject) { audio.srcObject = event.streams[0]; audio.play().catch(() => undefined) } }
      state.peer.onicecandidate = event => { if (event.candidate) updateDoc(signalRef, { offerCandidates: arrayUnion(event.candidate.toJSON()) }).catch(() => undefined) }
      const offer = await state.peer.createOffer(); await state.peer.setLocalDescription(offer)
      await setDoc(signalRef, { offer: { type: offer.type, sdp: offer.sdp }, offerCandidates: [], answerCandidates: [], updatedAt: serverTimestamp() }, { merge: true })
      const unsubscribe = onSnapshot(signalRef, async snap => {
        const data = snap.data(); if (!data || stopped.current) return
        if (data.answer && !state.peer.currentRemoteDescription) { await state.peer.setRemoteDescription(data.answer); state.remoteReady = true; for (const candidate of state.pending.splice(0)) await state.peer.addIceCandidate(candidate).catch(() => undefined) }
        for (const candidate of (data.answerCandidates || [])) { const key = JSON.stringify(candidate); if (state.seen.has(key)) continue; state.seen.add(key); if (!state.remoteReady) state.pending.push(candidate); else await state.peer.addIceCandidate(candidate).catch(() => undefined) }
      })
      cleanups.push(unsubscribe)
    }
    otherIds.forEach(id => { if (uid < id) connect(id) })
    const answerListeners = otherIds.filter(id => uid > id).map(otherId => {
      const pairId = [uid, otherId].sort().join('_'); const signalRef = doc(db!, 'calls', callId, 'peers', pairId)
      const peerState: PeerState = { peer: new RTCPeerConnection({ iceServers }), remoteReady: false, pending: [], seen: new Set() }; peers.current[otherId] = peerState
      streamRef.current?.getTracks().forEach(track => peerState.peer.addTrack(track, streamRef.current!))
      peerState.peer.ontrack = event => { const audio = audioRefs.current[otherId]; if (audio && !audio.srcObject) { audio.srcObject = event.streams[0]; audio.play().catch(() => undefined) } }
      peerState.peer.onicecandidate = event => { if (event.candidate) updateDoc(signalRef, { answerCandidates: arrayUnion(event.candidate.toJSON()) }).catch(() => undefined) }
      return onSnapshot(signalRef, async snap => { const data = snap.data(); if (!data || stopped.current || !data.offer || peerState.peer.currentRemoteDescription) return; await peerState.peer.setRemoteDescription(data.offer); peerState.remoteReady = true; const answer = await peerState.peer.createAnswer(); await peerState.peer.setLocalDescription(answer); await updateDoc(signalRef, { answer: { type: answer.type, sdp: answer.sdp } }); for (const candidate of (data.offerCandidates || [])) await peerState.peer.addIceCandidate(candidate).catch(() => undefined) })
    })
    return () => { cleanups.forEach(fn => fn()); answerListeners.forEach(fn => fn()) }
  }, [callId, uid, otherIds.join('|')])

  useEffect(() => { if (status !== 'Connected') return; const timer = window.setInterval(() => setElapsed(Math.max(0, Math.floor((Date.now() - startedAt.current) / 1000))), 1000); return () => window.clearInterval(timer) }, [status])
  const leave = async (endForEveryone: boolean) => { if (db) { const ref = doc(db, 'calls', callId); if (endForEveryone) await updateDoc(ref, { status: 'ended', endedAt: serverTimestamp() }).catch(() => undefined); else await updateDoc(ref, { joinedIds: arrayRemove(uid), leftIds: arrayUnion(uid) }).catch(() => undefined) }; onClose() }
  return <div className="group-call-page"><header><div className="avatar large">{groupName.slice(0, 2).toUpperCase()}</div><div><p className="eyebrow">GROUP VOICE CALL</p><h1>{groupName}</h1><strong>{joinedIds.length} member{joinedIds.length === 1 ? '' : 's'} joined</strong></div></header><p className="group-call-status">{error || status}</p>{status === 'Connected' && <strong className="call-duration">{String(Math.floor(elapsed / 60)).padStart(2, '0')}:{String(elapsed % 60).padStart(2, '0')}</strong>}<div className="group-call-members">{joinedIds.map(id => <div className="group-call-member" key={id}><Avatar profile={profiles[id]} name={id === uid ? 'You' : 'Member'} /><span>{id === uid ? 'You' : profiles[id]?.displayName || 'Member'}</span>{id === callerId && <small>Host</small>}<audio ref={element => { audioRefs.current[id] = element }} autoPlay /></div>)}</div><div className="call-actions"><button className="secondary" onClick={() => { streamRef.current?.getAudioTracks().forEach(track => { track.enabled = muted }); setMuted(value => !value) }}>{muted ? 'Unmute' : 'Mute'}</button><button className="danger" onClick={() => leave(host)}>{host ? 'End call' : 'Leave call'}</button></div></div>
}

function initials(name: string) { return name.split(/\s+/).filter(Boolean).map(part => part[0]).join('').slice(0, 2).toUpperCase() || 'U' }
