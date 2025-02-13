import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../assets/logo.png'
import Profile from '../assets/profile.svg'

import { HiMiniHome } from 'react-icons/hi2'
import { IoVideocam } from 'react-icons/io5'
import { FaBookBookmark, FaPowerOff } from 'react-icons/fa6'
import { FaRegStickyNote } from 'react-icons/fa'

import { toast } from 'react-toastify'
import { useAuth } from '../contexts/Auth'

const Sidebar = ({ setPath }) => {
  const navigate = useNavigate()
  const { authData } = useAuth()

  const notify = () => {
    toast.warn('Shutdown!', {
      theme: 'dark',
    })
  }

  const handleClick = (newPath) => {
    setPath(newPath)
    navigate(newPath)
  }

  const handleRemoveItem = () => {
    localStorage.removeItem('authData')
    setAuthData(null)
    navigate('/')
  }

  return (
    <aside>
      <Link to="/">
        <img src={Logo} alt="Logo" className="logo" />
      </Link>
      <div className="menu-wrapper">
        <Link to="#" onClick={() => handleClick('/home')}>
          <HiMiniHome className="icon" />
        </Link>
        <Link
          to="#"
          onClick={() =>
            handleClick(`/videos/${authData?.content[0].idPlaylist}`)
          }
        >
          <IoVideocam className="icon" />
        </Link>
        <Link to="#" onClick={() => handleClick('/papers')}>
          <FaBookBookmark className="icon" />
        </Link>
        <Link to="#" onClick={() => handleClick('/notes')}>
          <FaRegStickyNote className="icon" />
        </Link>
        <div className="power-profile">
          <div className='container-profile'>
            <img
              className="profile"
              src={authData?.profile_picker}
              alt="Perfil"
            />
            <span>{authData?.nickname}</span>
          </div>
          <Link
            to="#"
            onClick={() => {
              notify()
              handleRemoveItem()
              handleClick('/')
            }}
          >
            <FaPowerOff className="power" />
          </Link>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
