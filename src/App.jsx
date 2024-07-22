// App.js
import React from 'react'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import SignIn from './pages/SignIn/SignIn'
import Home from './pages/Home/Home'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
