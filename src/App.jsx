import React from 'react'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import SignIn from './pages/SignIn/SignIn'
import Home from './pages/Home/Home'
import Videos from './pages/Videos/Videos'
import Papers from './pages/Papers/Papers'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AuthProvider } from './contexts/Auth'
import Notes from './pages/notes/Notes'
import NotFound from './pages/NotFound/NotFound'

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/home" element={<Home />} />
            <Route path="/videos/:idPlaylist" element={<Videos />} />
            <Route path="/papers" element={<Papers />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
        <ToastContainer />
      </Router>
    </div>
  )
}

export default App
