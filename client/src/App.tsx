import { FormEvent, useEffect, useMemo, useState } from 'react'
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, signOut, updateProfile, User } from 'firebase/auth'
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore'
import { auth, db, firebaseReady, googleProvider } from './firebase'
import './index.css'

type Chat = { id: number; name: string; avatar: string; preview: string; time: string; messages: { from: 'me' | 'them'; text: string; time: string }[] }
const starterChats: Chat[] = [
  { id: 1, name: 'Maya Patel', avatar: 'MP', preview: 'That sounds perfect — see you there!', time: '10:42', messages: [{ from: 'them', text: 'Are we still on for coffee this afternoon?', time: '10:37' }, { from: 'me', text: 'Absolutely! I’ll be there at 4.', time: '10:40' }, { from: 'them', text: 'That sounds perfect — see you there!', time: '10:42' }] },
  { id: 2, name: 'Design Crew', avatar: 'DC', preview: 'Leo: I added the final screens.', time: '09:15', messages: [{ from: 'them', text: 'I added the final screens. What do you think?', time: '09:15' }] },
  { id: 3, name: 'Jordan Kim', avatar: 'JK', preview: 'Thanks for sharing that!', time: 'Yesterday', messages: [{ from: 'them', text: 'Thanks for sharing that!', time: 'Yesterday' }] },
]
const Nav = ({ page, setPage }: { page: string; setPage: (page: string) => void }) => <nav className="bottom-nav">{[['chats', '💬', 'Chats'], ['calls', '📞', 'Calls'], ['stories', '◉', 'Stories'], ['profile', '☺', 'Profile']].map(([id, icon, label]) => <button key={id} className={page === id ? 'active' : ''} onClick={() => setPage(id)}><span>{icon}</span>{label}</button>)}</nav>

export default function App() {
  const [user, setUser] = useState<User | null>(null)
  const [authLoading, setAuthLoading] = useState(firebaseReady)
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin')
  const [authError, setAuthError] = useState('')
  const [page, setPage] = useState('chats'); const [chats, setChats] = useState(starterChats); const [selectedChat, setSelectedChat] = useState<Chat | null>(null); const [message, setMessage] = useState(''); const [search, setSearch] = useState('')
  const visibleChats = useMemo(() => chats.filter(chat => chat.name.toLowerCase().includes(search.toLowerCase())), [chats, search])
  useEffect(() => {
    if (!auth) { setAuthLoading(false); return }
    return onAuthStateChanged(auth, next => { setUser(next); setAuthLoading(false) })
  }, [])
  useEffect(() => {
    if (!db || !user || user.uid === 'preview' || !selectedChat) return
    const messagesQuery = query(collection(db, 'rooms', String(selectedChat.id), 'messages'), orderBy('createdAt', 'asc'))
    return onSnapshot(messagesQuery, snapshot => {
      const messages = snapshot.docs.map(doc => { const data = doc.data(); return { from: data.uid === user.uid ? 'me' as const : 'them' as const, text: String(data.text || ''), time: data.createdAt?.toDate?.().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) || 'now' } })
      if (messages.length) setSelectedChat(old => old ? { ...old, messages } : old)
    })
  }, [db, user, selectedChat?.id])
  const signIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setAuthError('')
    if (!auth) return
    const data = new FormData(event.currentTarget); const email = String(data.get('email')); const password = String(data.get('password')); const name = String(data.get('name') || '')
    try {
      if (authMode === 'signup') { const result = await createUserWithEmailAndPassword(auth, email, password); if (name) await updateProfile(result.user, { displayName: name }) }
      else await signInWithEmailAndPassword(auth, email, password)
    } catch (error) { setAuthError(error instanceof Error ? error.message.replace('Firebase: ', '').replace(/ \(auth\/[^)]+\)\.?$/, '') : 'Unable to sign in. Please check your details.') }
  }
  const googleSignIn = async () => { if (!auth) return; setAuthError(''); try { await signInWithPopup(auth, googleProvider) } catch (error) { setAuthError(error instanceof Error ? error.message.replace('Firebase: ', '') : 'Google sign-in could not be completed.') } }
  const send = async (event: FormEvent) => { event.preventDefault(); if (!message.trim() || !selectedChat) return; const text = message.trim(); const nextMessage = { from: 'me' as const, text, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }; setChats(old => old.map(chat => chat.id === selectedChat.id ? { ...chat, preview: text, time: nextMessage.time, messages: [...chat.messages, nextMessage] } : chat)); setSelectedChat(old => old ? { ...old, preview: text, time: nextMessage.time, messages: [...old.messages, nextMessage] } : old); setMessage(''); if (db && user && user.uid !== 'preview') await addDoc(collection(db, 'rooms', String(selectedChat.id), 'messages'), { text, uid: user.uid, createdAt: serverTimestamp() }) }
  if (authLoading) return <main className="auth"><section className="auth-card"><div className="brand-mark">C</div><h1>Co Chat</h1><p>Connecting your account…</p></section></main>
  if (!user) return <main className="auth"><section className="auth-card"><div className="brand-mark">C</div><h1>Co Chat</h1><p>Chat bright. Feel right.</p>{!firebaseReady ? <><div className="hero-card"><h2>Online accounts are almost ready</h2><p>Add the Firebase keys from <code>client/.env</code> to enable real accounts. The local preview below is still available.</p><button className="secondary" onClick={() => setUser({ uid: 'preview', displayName: 'Preview user', email: 'preview@cochat.local' } as User)}>Continue preview</button></div></> : <><div className="auth-tabs"><button className={authMode === 'signin' ? 'active' : ''} onClick={() => setAuthMode('signin')}>Sign in</button><button className={authMode === 'signup' ? 'active' : ''} onClick={() => setAuthMode('signup')}>Create account</button></div><form onSubmit={signIn}>{authMode === 'signup' && <label>Display name<input name="name" required placeholder="Your name" /></label>}<label>Email<input name="email" type="email" required placeholder="you@example.com" /></label><label>Password<input name="password" type="password" minLength={6} required placeholder="At least 6 characters" /></label>{authError && <p className="error-text">{authError}</p>}<button className="primary">{authMode === 'signin' ? 'Sign in' : 'Create account'}</button></form><button className="google-button" onClick={googleSignIn}>Continue with Google</button><small>Your account will sync across devices. No phone number or OTP is required.</small></>}</section></main>
  if (selectedChat) return <main className="app"><header className="chat-header"><button className="icon" onClick={() => setSelectedChat(null)}>←</button><div className="avatar">{selectedChat.avatar}</div><div><strong>{selectedChat.name}</strong><small>Online</small></div><button className="icon">☎</button><button className="icon">⋮</button></header><section className="messages">{selectedChat.messages.map((item, i) => <div className={`bubble ${item.from}`} key={i}>{item.text}<small>{item.time}</small></div>)}</section><form className="composer" onSubmit={send}><input value={message} onChange={e => setMessage(e.target.value)} placeholder="Write a message" /><button className="primary">Send</button></form></main>
  return <main className="app"><header className="topbar"><div><div className="eyebrow">WELCOME BACK</div><h1>{page === 'chats' ? 'Messages' : page === 'ai' ? 'Co Assist' : page[0].toUpperCase() + page.slice(1)}</h1></div><button className="avatar profile-button" onClick={() => setPage('profile')}>{(user.displayName || user.email || 'U').split(' ').map(x => x[0]).join('').slice(0, 2)}</button></header><section className="content">
    {page === 'chats' && <><input className="search" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search messages" /><div className="section-title">RECENT CONVERSATIONS</div><div className="list">{visibleChats.map(chat => <button className="chat-row" key={chat.id} onClick={() => setSelectedChat(chat)}><span className="avatar">{chat.avatar}</span><span className="chat-copy"><strong>{chat.name}</strong><span>{chat.preview}</span></span><small>{chat.time}</small></button>)}</div><button className="fab" onClick={() => alert('New conversations will be connected to a free Supabase backend in the next milestone.')}>＋</button></>}
    {page === 'calls' && <><div className="hero-card"><span>📞</span><h2>Call your people</h2><p>Audio and video calling are planned for the online version. Your recent activity will appear here.</p><button className="secondary">Invite a friend</button></div><div className="section-title">RECENT</div>{['Maya Patel — outgoing · 12 min', 'Jordan Kim — missed · Yesterday'].map(x => <div className="activity" key={x}>☎ <span>{x}</span></div>)}</>}
    {page === 'stories' && <><div className="story-grid"><button className="story mine"><b>＋</b><span>Your story</span></button>{['Maya', 'Jordan', 'Design Crew'].map((x, i) => <button className="story" key={x}><div className={`story-art a${i}`}>{x[0]}</div><span>{x}</span></button>)}</div><div className="hero-card"><span>◉</span><h2>Share a moment</h2><p>Stories are a fun way to post a short update that disappears after 24 hours.</p><button className="primary" onClick={() => alert('Story publishing needs the free online backend — this preview is ready for its UI.')}>Create story</button></div></>}
    {page === 'profile' && <><div className="profile-card"><div className="avatar large">{(user.displayName || user.email || 'U').split(' ').map(x => x[0]).join('').slice(0, 2)}</div><h2>{user.displayName || 'Co Chat member'}</h2><p>{user.email}</p><button className="secondary">Edit profile</button></div><div className="settings"><button>🔔 Notifications <span>›</span></button><button>◐ Appearance <span>›</span></button><button>🔒 Privacy <span>›</span></button><button onClick={() => { if (auth) signOut(auth); else setUser(null) }}>↪ Sign out <span>›</span></button></div></>}
  </section><Nav page={page} setPage={setPage} /></main>
}
