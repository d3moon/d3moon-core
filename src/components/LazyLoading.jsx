// LazyLoading.js
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from '../assets/logo.png'

const LazyLoading = ({ path }) => {
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
      navigate(path)
    }, 3000)

    return () => {
      clearTimeout(timer)
    }
  }, [navigate, path])

  return (
    <>
      {loading && (
        <div className="loading-blur">
          <img src={Logo} alt="Logo" className="lazy" />
        </div>
      )}
    </>
  )
}

export default LazyLoading
