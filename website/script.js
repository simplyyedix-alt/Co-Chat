const menu = document.querySelector('.menu-toggle')
const nav = document.querySelector('.site-header nav')
const headline = document.querySelector('.hero h1')
if (headline) headline.innerHTML = 'Chat bright.<br><span>Feel right.</span>'
const communityBanner = document.createElement('div')
communityBanner.className = 'community-banner'
communityBanner.innerHTML = '<span>✦ Better conversations start together</span><a href="https://whatsapp.com/channel/0029Vb8ytL14tRs06vJo5Z3B" target="_blank" rel="noopener">Join our WhatsApp channel&nbsp; ↗</a>'
document.querySelector('.site-header')?.after(communityBanner)
const communityUrl = 'https://whatsapp.com/channel/0029Vb8ytL14tRs06vJo5Z3B'
document.querySelectorAll('a[href*="chat.whatsapp.com"]').forEach(link => link.setAttribute('href', communityUrl))
document.querySelectorAll('.marquee span').forEach((item, index) => { item.textContent = ['REAL-TIME MESSAGING', 'STORIES & MOMENTS', 'VOICE & VIDEO', 'COMMUNITY FIRST'][index] || 'CO-CHAT' })
document.querySelector('.marquee')?.remove()
const detailSections = `
<section class="section details" aria-label="How Co-Chat works">
  <div class="section-heading"><p class="kicker">HOW IT WORKS</p><h2>Simple to start.<br/><i>Made to stay.</i></h2><p class="section-intro">Co‑Chat keeps the important things close and the complicated things out of the way.</p></div>
  <div class="steps"><article><b>01</b><span class="step-icon">✦</span><h3>Create your space</h3><p>Choose a name, find your people, and make Co‑Chat feel like yours.</p></article><article><b>02</b><span class="step-icon">↗</span><h3>Start a conversation</h3><p>Send a message, share a moment, or open a group chat in seconds.</p></article><article><b>03</b><span class="step-icon">♡</span><h3>Stay connected</h3><p>Come back when you want to. Your conversations are waiting for you.</p></article></div>
</section>
<section class="section logo-story"><div class="logo-showcase"><img src="assets/logo.svg" alt="Co-Chat logo"/><div><p class="kicker">THE CO‑CHAT MARK</p><h2>A little <i>spark</i> for every conversation.</h2><p>Our logo is a C, a conversation bubble, and two people meeting in the middle. It represents a simple idea: connection should feel natural.</p></div></div></section>
<section class="section community-guide"><div><p class="kicker">OUR COMMUNITY</p><h2>Come curious.<br/><i>Leave kinder.</i></h2></div><div class="rules"><div><span>01</span><strong>Share ideas, not pressure.</strong></div><div><span>02</span><strong>Respect every voice.</strong></div><div><span>03</span><strong>Help us build in the open.</strong></div><a class="button whatsapp" href="https://chat.whatsapp.com/EggFAYsKcKxHFJjhPtErfx" target="_blank" rel="noopener">Join the WhatsApp community <span>↗</span></a></div></section>`
document.querySelector('main')?.insertAdjacentHTML('beforeend', detailSections)
document.querySelectorAll('a[href*="chat.whatsapp.com"]').forEach(link => link.setAttribute('href', communityUrl))
const emailForm = document.querySelector('#join-form')
if (emailForm) emailForm.outerHTML = '<div class="community-panel"><span>✦</span><strong>Bring your ideas.</strong><p>Join the channel to share feedback, see progress, and help shape Co‑Chat.</p><a class="button whatsapp" href="' + communityUrl + '" target="_blank" rel="noopener">Join the WhatsApp channel <span>↗</span></a></div>'
document.querySelector('.site-header .nav-cta')?.remove()
document.querySelector('.vision-card .whatsapp')?.remove()
document.querySelector('.community-guide .whatsapp')?.remove()
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
