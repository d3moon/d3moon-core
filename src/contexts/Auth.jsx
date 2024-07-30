// src/contexts/Auth.js
import React, { createContext, useState, useContext, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const savedAuthData = localStorage.getItem('authData')
    if (savedAuthData) {
      setAuthData(JSON.parse(savedAuthData))
    }
  }, [])

  useEffect(() => {
    if (authData) {
      localStorage.setItem('authData', JSON.stringify(authData))
    } else {
      localStorage.removeItem('authData')
    }
  }, [authData])

  const signIn = async (accessCode) => {
    setLoading(true)
    try {
      const response = await axios.get(
        `http://localhost:3000/users/${accessCode}/access_code`
      )
      setAuthData(response.data)
      setError(null)
      return true // sucesso
    } catch (error) {
      setError('Invalid access code!')
      setAuthData(null)
      return false // falha
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{ authData, signIn, loading, error, setAuthData }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
