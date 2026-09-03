const menu = document.querySelector('.menu-toggle')
const nav = document.querySelector('.site-header nav')
const headline = document.querySelector('.hero h1')
if (headline) headline.innerHTML = 'Chat light.<br><span>Feel right.</span>'
const communityBanner = document.createElement('div')
communityBanner.className = 'community-banner'
communityBanner.innerHTML = '<span>✦ We’re building Co‑Chat in public</span><a href="https://chat.whatsapp.com/EggFAYsKcKxHFJjhPtErfx" target="_blank" rel="noopener">Join the WhatsApp community&nbsp; ↗</a>'
document.querySelector('.site-header')?.after(communityBanner)
menu?.addEventListener('click', () => nav?.classList.toggle('open'))
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => nav.classList.remove('open')))
const year = document.querySelector('#year')
if (year) year.textContent = String(new Date().getFullYear())
const form = document.querySelector('#join-form')
const note = document.querySelector('#form-note')
form?.addEventListener('submit', event => {
  event.preventDefault()
  const email = document.querySelector('#email').value.trim()
  const subscribers = JSON.parse(localStorage.getItem('cochat-subscribers') || '[]')
  if (!subscribers.includes(email)) subscribers.push(email)
  localStorage.setItem('cochat-subscribers', JSON.stringify(subscribers))
  if (note) note.textContent = 'You’re on the list — thank you for being early.'
  form.reset()
})
