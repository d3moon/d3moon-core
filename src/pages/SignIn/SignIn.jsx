import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LogoImage from '../../assets/logo.png'
import LoginImg from '../../assets/login.svg'
import './index.css'
import LazyLoading from '../../components/LazyLoading'

const SignIn = () => {
  const [loading, setLoading] = useState(false)
  const [redirect, setRedirect] = useState(false)
  const navigate = useNavigate()

  const handleLoginClick = () => {
    setLoading(true)
    setRedirect(true)
  }

  return (
    <div className="container">
      {redirect ? (
        <LazyLoading path="home" />
      ) : (
        <>
          <img src={LogoImage} alt="Logo" />
          <h3>
            Welcome to <span>BinaryPumpkin</span>
          </h3>
          <div className="container-input">
            <input type="text" placeholder="Type your access code" />
            <img
              className="login"
              src={LoginImg}
              alt="Login"
              onClick={handleLoginClick}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default SignIn
