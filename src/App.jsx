import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './services/AuthContext'
import { BrowserRouter } from 'react-router-dom'
import UserRouter from './Routes'
import Footer from './Components/Footer/Footer';
import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <>
            <UserRouter />
            <Footer />
          </>
        </AuthProvider>
        <ToastContainer />
      </BrowserRouter>
    </>
  )
}

export default App
