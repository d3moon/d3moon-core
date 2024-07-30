import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '../Home/index.css'
import '../Home/cards.css'
import LazyLoading from '../../components/LazyLoading'
import Sidebar from '../../components/Sidebar'
import { useAuth } from '../../contexts/Auth'

const Cards = () => {
  const { authData } = useAuth()
  const navigate = useNavigate()

  const handleButtonClick = () => {
    navigate('/videos')
  }

  return (
    <div className="cards">
      {authData?.content.map((item, index) => (
        <div className="cards-wrapper" key={index}>
          <h3>{item.name}</h3>
          <div className="progress"></div>
          <button onClick={handleButtonClick}>Acessar</button>
        </div>
      ))}
      <div className="line"></div>
    </div>
  )
}

const Home = () => {
  const { authData, setAuthData } = useAuth()
  const [path, setPath] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const savedAuthData = localStorage.getItem('authData')
    if (savedAuthData) {
      setAuthData(JSON.parse(savedAuthData))
    } else if (!authData) {
      toast.error('Você precisa estar autenticado para acessar esta página.')
      navigate('/')
    }
  }, [])

  useEffect(() => {
    if (authData) {
      localStorage.setItem('authData', JSON.stringify(authData))
    }
  }, [authData])

  return (
    <>
      {path && <LazyLoading path={path} />}
      <div className="container">
        <Sidebar setPath={setPath} />
        <section className="principal">
          <h1>Seus treinamentos</h1>
          <Cards />
        </section>
      </div>
    </>
  )
}

export default Home
