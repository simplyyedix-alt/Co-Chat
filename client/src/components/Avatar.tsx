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

// Resolve through the app's base URL so the fallback works on GitHub Pages
// (`/Co-Chat/app/`) as well as local and Android builds.
export const DEFAULT_AVATAR_URL = `${import.meta.env.BASE_URL}assets/co-chat-default-avatar.svg`

// Google can return a generated initials avatar as a photoURL when the user
// has not uploaded a profile picture. Treat that provider fallback as empty so
// Co-Chat can show its own anonymous avatar consistently.
export function usablePhotoURL(value?: string) {
  const candidate = value?.trim() || ''
  return /(?:^https?:\/\/|^\/\/)(?:lh\d*\.)?googleusercontent\.com\//i.test(candidate) ? '' : candidate
}

export default function Avatar({ name = 'Anonymous', profile, photoURL, active = false, className = 'avatar', label = 'Online' }: Props) {
  const displayName = profile?.displayName || name
  const uploadedSrc = usablePhotoURL(profile?.photoURL || photoURL)
  const [imageFailed, setImageFailed] = useState(false)
  useEffect(() => setImageFailed(false), [uploadedSrc])
  const src = !imageFailed && uploadedSrc ? uploadedSrc : DEFAULT_AVATAR_URL
  return <span className={`${className}${active ? ' is-active' : ''}`}>
    <img src={src} alt="" referrerPolicy="no-referrer" onError={(event) => {
      if (!imageFailed) setImageFailed(true)
      else event.currentTarget.style.visibility = 'hidden'
    }} />
    {active && <i className="active-dot" aria-label={label} />}
  </span>
}
