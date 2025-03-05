import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { AuthProvider } from './services/AuthContext'
import { BrowserRouter } from 'react-router-dom'
import UserRouter from './Routes'
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <UserRouter />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
