import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import LogoImage from '../../assets/logo.png'
import LoginImg from '../../assets/login.svg'
import './index.css'
import LazyLoading from '../../components/LazyLoading'
import { useAuth } from '../../contexts/Auth'

const SignIn = () => {
  const [accessCode, setAccessCode] = useState('')
  const navigate = useNavigate()
  const { signIn, loading, error, authData } = useAuth()

  const handleLoginClick = async () => {
    const success = await signIn(accessCode)
    if (success) {
      navigate('/home')
    } else {
      toast.error(error)
    }
  }

  return (
    <div className="container-signin">
      {authData ? (
        <LazyLoading path="home" />
      ) : (
        <>
          <img src={LogoImage} alt="Logo" />
          <h3>
            Welcome to <span>D3moon</span>
          </h3>
          <div className="container-input">
            <input
              type="text"
              placeholder="Type your access code"
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
            />
            <img
              className="login"
              src={LoginImg}
              alt="Login"
              onClick={handleLoginClick}
              disabled={loading}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default SignIn
