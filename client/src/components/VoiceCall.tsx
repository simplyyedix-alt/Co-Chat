import { useEffect, useRef, useState } from 'react'
import { arrayUnion, doc, onSnapshot, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'

type Props = { uid: string; otherUid: string; otherName: string; onClose: () => void }

export default function VoiceCall({ uid, otherUid, otherName, onClose }: Props) {
  const [status, setStatus] = useState('Connecting…'); const [muted, setMuted] = useState(false); const [error, setError] = useState(''); const [elapsed, setElapsed] = useState(0)
  const peerRef = useRef<RTCPeerConnection | null>(null); const streamRef = useRef<MediaStream | null>(null); const callRef = useRef<string | null>(null); const remoteAudio = useRef<HTMLAudioElement>(null)
  useEffect(() => {
    if (!db || !uid || !otherUid) { setError('Voice calling is unavailable.'); return }
    let stopped = false; let unsub: (() => void) | undefined
    const start = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true }); if (stopped) return; streamRef.current = stream
        const peer = new RTCPeerConnection({ iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] }); peerRef.current = peer
        stream.getTracks().forEach(track => peer.addTrack(track, stream)); peer.ontrack = event => { if (remoteAudio.current) { remoteAudio.current.srcObject = event.streams[0]; remoteAudio.current.play().catch(() => undefined) } }; peer.onconnectionstatechange = () => { if (peer.connectionState === 'connected') setStatus('Connected'); if (['failed', 'disconnected', 'closed'].includes(peer.connectionState)) setStatus('Call ended') }
        const caller = uid < otherUid; const callId = [uid, otherUid].sort().join('_'); callRef.current = callId; const firestore = db; if (!firestore) throw new Error('Firestore is unavailable.'); const callDoc = doc(firestore, 'calls', callId)
        if (caller) {
          await setDoc(callDoc, { type: 'audio', callerId: uid, calleeId: otherUid, memberIds: [uid, otherUid], status: 'ringing', createdAt: serverTimestamp(), callerCandidates: [], calleeCandidates: [] })
          peer.onicecandidate = event => { if (event.candidate) updateDoc(callDoc, { callerCandidates: arrayUnion(event.candidate.toJSON()) }).catch(() => undefined) }
          const offer = await peer.createOffer(); await peer.setLocalDescription(offer); await updateDoc(callDoc, { offer: { type: offer.type, sdp: offer.sdp } }); setStatus('Calling…')
        } else {
          peer.onicecandidate = event => { if (event.candidate) updateDoc(callDoc, { calleeCandidates: arrayUnion(event.candidate.toJSON()) }).catch(() => undefined) }
          setStatus('Waiting for caller…')
        }
        unsub = onSnapshot(callDoc, async snap => {
          const data = snap.data(); if (!data || stopped) return
          if (data.status === 'ended' || data.status === 'declined' || data.status === 'missed') { setStatus('Call ended'); onClose(); return }
          if (!caller && data.offer && !peer.currentRemoteDescription) { await peer.setRemoteDescription(data.offer); const answer = await peer.createAnswer(); await peer.setLocalDescription(answer); await updateDoc(callDoc, { answer: { type: answer.type, sdp: answer.sdp }, status: 'connected' }); setStatus('Connecting…') }
          if (caller && data.answer && !peer.currentRemoteDescription) await peer.setRemoteDescription(data.answer)
          const candidates = (caller ? data.calleeCandidates : data.callerCandidates) || []; for (const candidate of candidates) { try { await peer.addIceCandidate(candidate) } catch { /* duplicate candidates are harmless */ } }
        })
      } catch (e) { setError(e instanceof Error ? e.message : 'Microphone permission or call setup failed.') }
    }
    start(); return () => { stopped = true; unsub?.(); streamRef.current?.getTracks().forEach(track => track.stop()); peerRef.current?.close() }
  }, [uid, otherUid])
  useEffect(() => { if (status !== 'Connected') return; const timer = window.setInterval(() => setElapsed(value => value + 1), 1000); return () => window.clearInterval(timer) }, [status])
  const hangUp = async () => { if (db && callRef.current) await updateDoc(doc(db, 'calls', callRef.current), { status: 'ended', endedAt: serverTimestamp() }).catch(() => undefined); streamRef.current?.getTracks().forEach(track => track.stop()); peerRef.current?.close(); onClose() }
  return <div className="call-backdrop"><section className="call-card"><div className="avatar large">{otherName.slice(0, 2).toUpperCase()}</div><p className="eyebrow">VOICE CALL</p><h2>{otherName}</h2><p>{error || status}</p>{status === 'Connected' && <strong className="call-duration">{String(Math.floor(elapsed / 60)).padStart(2, '0')}:{String(elapsed % 60).padStart(2, '0')}</strong>}<audio ref={remoteAudio} autoPlay /><div className="call-actions"><button className="secondary" onClick={() => { streamRef.current?.getAudioTracks().forEach(track => { track.enabled = muted }); setMuted(value => !value) }}>{muted ? 'Unmute' : 'Mute'}</button><button className="danger" onClick={hangUp}>End call</button></div></section></div>
}
