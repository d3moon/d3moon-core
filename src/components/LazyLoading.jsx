import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from '../assets/logo.png'

const LazyLoading = ({ path }) => {
  const [show, setShow] = useState(true)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false)
      setLoading(false)
      navigate(path) 
    }, 3000)

    return () => {
      clearTimeout(timer)
    }
  }, [navigate, path])

  return (
    <div>
      {loading ? (
        <div>
          <img src={Logo} alt="Logo" className="lazy" />
        </div>
      ) : null}
    </div>
  )
}

export default LazyLoading
