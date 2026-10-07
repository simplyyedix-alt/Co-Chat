import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import './composer-fix.css'

class AppErrorBoundary extends React.Component<React.PropsWithChildren, { hasError: boolean }> {
  state = { hasError: false }
  static getDerivedStateFromError() { return { hasError: true } }
  componentDidCatch(error: unknown) { console.error('Co-Chat UI error', error) }
  render() {
    if (!this.state.hasError) return this.props.children
    return <main className="app-crash-screen"><section><div className="brand-mark">C</div><p className="eyebrow">CO-CHAT</p><h1>That screen hit a snag.</h1><p>Refresh once and your conversations should be right back.</p><button className="primary" type="button" onClick={() => window.location.reload()}>Reload Co-Chat</button></section></main>
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppErrorBoundary><App /></AppErrorBoundary>
  </React.StrictMode>,
)
