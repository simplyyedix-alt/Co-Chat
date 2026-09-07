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

export default function Avatar({ name = 'Co-Chat member', profile, photoURL, active = false, className = 'avatar', label = 'Online' }: Props) {
  const displayName = profile?.displayName || name
  const src = profile?.photoURL || photoURL
  const [imageFailed, setImageFailed] = useState(false)
  useEffect(() => setImageFailed(false), [src])
  return <span className={`${className}${active ? ' is-active' : ''}`}>
    {src && !imageFailed ? <img src={src} alt={`${displayName} profile`} referrerPolicy="no-referrer" onError={() => setImageFailed(true)} /> : avatarInitials(displayName)}
    {active && <i className="active-dot" aria-label={label} />}
  </span>
}
