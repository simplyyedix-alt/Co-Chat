import { useEffect, useRef, useState } from 'react'
import { arrayUnion, doc, getDoc, onSnapshot, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'

type Props = { uid: string; otherUid: string; otherName: string; role?: 'caller' | 'callee'; onClose: () => void }

export default function VoiceCall({ uid, otherUid, otherName, role, onClose }: Props) {
  const [status, setStatus] = useState('Connecting…'); const [muted, setMuted] = useState(false); const [error, setError] = useState(''); const [elapsed, setElapsed] = useState(0)
  const peerRef = useRef<RTCPeerConnection | null>(null); const streamRef = useRef<MediaStream | null>(null); const callRef = useRef<string | null>(null); const remoteAudio = useRef<HTMLAudioElement>(null)
  useEffect(() => {
    if (!db || !uid || !otherUid) { setError('Voice calling is unavailable.'); return }
    let stopped = false; let unsub: (() => void) | undefined; let ringTimeout: number | undefined; let disconnectTimer: number | undefined; const receivedCandidates = new Set<string>(); const pendingCandidates: RTCIceCandidateInit[] = []; let remoteDescriptionReady = false
    const start = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true }); if (stopped) return; streamRef.current = stream
        // Add TURN credentials through VITE_TURN_* for mobile/carrier networks; never commit real credentials.
        const turnUrl = import.meta.env.VITE_TURN_URL as string | undefined; const turnUsername = import.meta.env.VITE_TURN_USERNAME as string | undefined; const turnCredential = import.meta.env.VITE_TURN_CREDENTIAL as string | undefined
        const iceServers: RTCIceServer[] = [{ urls: 'stun:stun.l.google.com:19302' }]
        if (turnUrl && turnUsername && turnCredential) iceServers.push({ urls: turnUrl, username: turnUsername, credential: turnCredential })
        const peer = new RTCPeerConnection({ iceServers }); peerRef.current = peer
        stream.getTracks().forEach(track => peer.addTrack(track, stream)); peer.ontrack = event => { if (remoteAudio.current) { remoteAudio.current.srcObject = event.streams[0]; remoteAudio.current.play().catch(() => undefined) } }; peer.onconnectionstatechange = () => { if (peer.connectionState === 'connected') { if (disconnectTimer) { window.clearTimeout(disconnectTimer); disconnectTimer = undefined }; setStatus('Connected') } else if (peer.connectionState === 'disconnected' || peer.connectionState === 'failed') { setStatus('Reconnecting…'); if (peer.connectionState === 'failed' && 'restartIce' in peer) peer.restartIce() } }
        const callId = [uid, otherUid].sort().join('_'); callRef.current = callId; const firestore = db; if (!firestore) throw new Error('Firestore is unavailable.'); const callDoc = doc(firestore, 'calls', callId); const existing = await getDoc(callDoc); const existingActive = existing.exists() && ['ringing', 'connected'].includes(String(existing.data().status || '')); const incomingForThisUser = existingActive && existing.data().status === 'ringing' && existing.data().calleeId === uid; const caller = role ? role === 'caller' : !incomingForThisUser
        if (caller) {
          await setDoc(callDoc, { type: 'audio', callerId: uid, calleeId: otherUid, memberIds: [uid, otherUid], status: 'ringing', createdAt: serverTimestamp(), callerCandidates: [], calleeCandidates: [] })
          ringTimeout = window.setTimeout(() => { if (!stopped && db) { updateDoc(callDoc, { status: 'missed', endedAt: serverTimestamp() }).catch(() => undefined); onClose() } }, 45000)
          peer.onicecandidate = event => { if (event.candidate) updateDoc(callDoc, { callerCandidates: arrayUnion(event.candidate.toJSON()) }).catch(() => undefined) }
          const offer = await peer.createOffer(); await peer.setLocalDescription(offer); await updateDoc(callDoc, { offer: { type: offer.type, sdp: offer.sdp } }); setStatus('Calling…')
        } else {
          peer.onicecandidate = event => { if (event.candidate) updateDoc(callDoc, { calleeCandidates: arrayUnion(event.candidate.toJSON()) }).catch(() => undefined) }
          setStatus('Waiting for caller…')
        }
        unsub = onSnapshot(callDoc, async snap => {
          const data = snap.data(); if (!data || stopped) return
          if (data.status === 'connected' && ringTimeout) { window.clearTimeout(ringTimeout); ringTimeout = undefined }
          if (data.status === 'ended' || data.status === 'declined' || data.status === 'missed') { setStatus('Call ended'); onClose(); return }
          if (!caller && data.offer && !peer.currentRemoteDescription) { await peer.setRemoteDescription(data.offer); remoteDescriptionReady = true; for (const candidate of pendingCandidates.splice(0)) await peer.addIceCandidate(candidate).catch(() => undefined); const answer = await peer.createAnswer(); await peer.setLocalDescription(answer); await updateDoc(callDoc, { answer: { type: answer.type, sdp: answer.sdp }, status: 'connected' }); setStatus('Connecting…') }
          if (caller && data.answer && !peer.currentRemoteDescription) { await peer.setRemoteDescription(data.answer); remoteDescriptionReady = true; for (const candidate of pendingCandidates.splice(0)) await peer.addIceCandidate(candidate).catch(() => undefined) }
          const candidates = (caller ? data.calleeCandidates : data.callerCandidates) || []; for (const candidate of candidates) { const key = JSON.stringify(candidate); if (receivedCandidates.has(key)) continue; receivedCandidates.add(key); if (!remoteDescriptionReady) pendingCandidates.push(candidate); else await peer.addIceCandidate(candidate).catch(() => undefined) }
        })
        if (!caller) ringTimeout = window.setTimeout(() => { if (!stopped) { setStatus('Call timed out'); onClose() } }, 45000)
      } catch (e) { setError(e instanceof Error ? e.message : 'Microphone permission or call setup failed.') }
    }
    start(); return () => { stopped = true; if (ringTimeout) window.clearTimeout(ringTimeout); if (disconnectTimer) window.clearTimeout(disconnectTimer); unsub?.(); streamRef.current?.getTracks().forEach(track => track.stop()); peerRef.current?.close() }
  }, [uid, otherUid, role])
  useEffect(() => { if (status !== 'Connected') return; const timer = window.setInterval(() => setElapsed(value => value + 1), 1000); return () => window.clearInterval(timer) }, [status])
  const hangUp = async () => { if (db && callRef.current) await updateDoc(doc(db, 'calls', callRef.current), { status: 'ended', endedAt: serverTimestamp() }).catch(() => undefined); streamRef.current?.getTracks().forEach(track => track.stop()); peerRef.current?.close(); onClose() }
  return <div className="call-backdrop"><section className="call-card"><div className="avatar large">{otherName.slice(0, 2).toUpperCase()}</div><p className="eyebrow">VOICE CALL</p><h2>{otherName}</h2><p>{error || status}</p>{status === 'Connected' && <strong className="call-duration">{String(Math.floor(elapsed / 60)).padStart(2, '0')}:{String(elapsed % 60).padStart(2, '0')}</strong>}<audio ref={remoteAudio} autoPlay /><div className="call-actions"><button className="secondary" onClick={() => { streamRef.current?.getAudioTracks().forEach(track => { track.enabled = muted }); setMuted(value => !value) }}>{muted ? 'Unmute' : 'Mute'}</button><button className="danger" onClick={hangUp}>End call</button></div></section></div>
}
