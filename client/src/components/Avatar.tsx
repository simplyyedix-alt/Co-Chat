import { useEffect, useState } from 'react'
import type { UserProfile } from '../services/chat'

type Props = {
  name?: string
  profile?: Pick<UserProfile, 'displayName' | 'photoURL'> | null
  photoURL?: string
  active?: boolean
  className?: string
  label?: string
}

export function avatarInitials(name: string) {
  return name.split(/\s+/).filter(Boolean).map(part => part[0]).join('').slice(0, 2).toUpperCase() || 'U'
}

export const DEFAULT_AVATAR_URL = '/assets/co-chat-default-avatar.jpg'

export default function Avatar({ name = 'Co-Chat member', profile, photoURL, active = false, className = 'avatar', label = 'Online' }: Props) {
  const displayName = profile?.displayName || name
  const uploadedSrc = profile?.photoURL || photoURL
  const [imageFailed, setImageFailed] = useState(false)
  useEffect(() => setImageFailed(false), [uploadedSrc])
  const src = !imageFailed && uploadedSrc ? uploadedSrc : DEFAULT_AVATAR_URL
  return <span className={`${className}${active ? ' is-active' : ''}`}>
    <img src={src} alt={`${displayName} profile`} referrerPolicy="no-referrer" onError={() => setImageFailed(true)} />
    {active && <i className="active-dot" aria-label={label} />}
  </span>
}
