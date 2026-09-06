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
  return <span className={`${className}${active ? ' is-active' : ''}`}>
    {src ? <img src={src} alt={`${displayName} profile`} /> : avatarInitials(displayName)}
    {active && <i className="active-dot" aria-label={label} />}
  </span>
}
