import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SplashPage from './pages/SplashPage'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import ChatWindow from './pages/ChatWindow'
import CallsPage from './pages/CallsPage'
import StoriesPage from './pages/StoriesPage'
import ProfilePage from './pages/ProfilePage'
import SettingsPage from './pages/SettingsPage'
import AIAssistantPage from './pages/AIAssistantPage'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/chat/:id" element={<ChatWindow />} />
        <Route path="/calls" element={<CallsPage />} />
        <Route path="/stories" element={<StoriesPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/ai-assistant" element={<AIAssistantPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
