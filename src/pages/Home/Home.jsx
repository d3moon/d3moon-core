import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Logo from '../../assets/logo.png'
import HomeIcon from '../../assets/home.svg'
import VideoIcon from '../../assets/videos.svg'
import PaperIcon from '../../assets/papers.svg'
import PowerIcon from '../../assets/power.svg'
import Profile from '../../assets/profile.svg'

import '../Home/index.css'
import '../Home/cards.css'
import LazyLoading from '../../components/LazyLoading'

const Cards = () => {
  return (
    <div className="cards">
      <div className="cards-wrapper">
        <h3>M.E.R.N</h3>
        <div className="progress"></div>
        <button>Acessar</button>
      </div>
      <div className="line"></div>
      <div className="cards-wrapper">
        <h3>M.E.R.N</h3>
        <div className="progress"></div>
        <button>Acessar</button>
      </div>
    </div>
  )
}

const Home = () => {
  const [path, setPath] = useState('')
  const navigate = useNavigate()

  const handleClick = (newPath) => {
    setPath(newPath)
  }

  return (
    <>
      {path && <LazyLoading path={path} />}
      <div className="container">
        <aside>
          <img src={Logo} alt="Logo" className="logo" />
          <div className="menu-wrapper">
            <Link to="#" onClick={() => handleClick('/home')}>
              <img src={HomeIcon} alt="Principal" />
            </Link>
            <Link to="#" onClick={() => handleClick('/videos')}>
              <img src={VideoIcon} alt="Videos" />
            </Link>
            <Link to="#" onClick={() => handleClick('/papers')}>
              <img src={PaperIcon} alt="Papers" />
            </Link>
            <img className="profile" src={Profile} alt="Perfil" />
            <Link to="#" onClick={() => handleClick('/')}>
              <img src={PowerIcon} alt="Logout" className="power" />
            </Link>
          </div>
        </aside>
        <section className="principal">
          <h1>Seus treinamentos</h1>
          <Cards />
        </section>
      </div>
    </>
  )
}

export default Home
