import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AIAssistantPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'summarize' | 'translate' | 'replies'>('summarize')
  const [summaries] = useState([
    { chat: 'Team Dev', summary: 'Team discussed Q2 roadmap, decided on 3 major features' },
    { chat: 'Alice', summary: 'Talked about weekend plans and upcoming birthday party' },
  ])

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 shadow-lg flex items-center gap-3">
        <button onClick={() => navigate('/home')} className="text-xl">←</button>
        <h1 className="text-2xl font-bold">🤖 AI Assistant</h1>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('summarize')}
          className={`flex-1 py-3 font-semibold transition ${
            activeTab === 'summarize'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          📝 Summarize
        </button>
        <button
          onClick={() => setActiveTab('translate')}
          className={`flex-1 py-3 font-semibold transition ${
            activeTab === 'translate'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          🌐 Translate
        </button>
        <button
          onClick={() => setActiveTab('replies')}
          className={`flex-1 py-3 font-semibold transition ${
            activeTab === 'replies'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          💬 Smart Replies
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'summarize' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Chat Summaries</h2>
            {summaries.map((item, idx) => (
              <div key={idx} className="p-4 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-gray-900 mb-2">{item.chat}</h3>
                <p className="text-gray-700">{item.summary}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'translate' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Instant Translation</h2>
            <div className="p-4 bg-blue-50 rounded-lg">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Select Language:</label>
              <select className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-700">
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
                <option>Japanese</option>
              </select>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Sample Translation:</p>
              <p className="text-gray-900 italic">"Hey! How are you?" → "¡Hola! ¿Cómo estás?"</p>
            </div>
          </div>
        )}

        {activeTab === 'replies' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Smart Reply Suggestions</h2>
            <p className="text-gray-600 text-sm mb-4">AI-powered suggestions based on conversation context:</p>
            <div className="space-y-2">
              <button className="w-full p-4 text-left bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-300 rounded-lg hover:bg-blue-100 transition">
                <p className="font-semibold text-blue-900">Thanks for letting me know!</p>
                <p className="text-xs text-blue-700 mt-1">Perfect for acknowledgments</p>
              </button>
              <button className="w-full p-4 text-left bg-gradient-to-r from-green-50 to-green-100 border border-green-300 rounded-lg hover:bg-green-100 transition">
                <p className="font-semibold text-green-900">That sounds great!</p>
                <p className="text-xs text-green-700 mt-1">Great for positive feedback</p>
              </button>
              <button className="w-full p-4 text-left bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-300 rounded-lg hover:bg-purple-100 transition">
                <p className="font-semibold text-purple-900">Can we chat about this later?</p>
                <p className="text-xs text-purple-700 mt-1">Perfect for deferring conversations</p>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="bg-white border-t border-gray-200 p-4 flex justify-around">
        <button onClick={() => navigate('/home')} className="flex flex-col items-center gap-1 text-gray-600 hover:opacity-70">
          <span className="text-2xl">💬</span>
          <span className="text-xs">Chat</span>
        </button>
        <button onClick={() => navigate('/calls')} className="flex flex-col items-center gap-1 text-gray-600 hover:opacity-70">
          <span className="text-2xl">📞</span>
          <span className="text-xs">Calls</span>
        </button>
        <button onClick={() => navigate('/stories')} className="flex flex-col items-center gap-1 text-gray-600 hover:opacity-70">
          <span className="text-2xl">📸</span>
          <span className="text-xs">Stories</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-purple-600 hover:opacity-70">
          <span className="text-2xl">🤖</span>
          <span className="text-xs">AI</span>
        </button>
      </div>
    </div>
  )
}
