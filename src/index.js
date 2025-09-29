// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext'
import { TranslationProvider } from './context/TranslationContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TranslationProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </TranslationProvider>
  </React.StrictMode>
)
