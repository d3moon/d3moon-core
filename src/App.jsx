// App.js
import React from 'react'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import SignIn from './pages/SignIn/SignIn'
import Home from './pages/Home/Home'
import Videos from './pages/Videos/Videos'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/home" element={<Home />} />
          <Route path="/videos" element={<Videos />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
