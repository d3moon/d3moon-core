import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png';
import Profile from '../assets/profile.svg';

import { HiMiniHome } from "react-icons/hi2";
import { IoVideocam } from "react-icons/io5";
import { FaBookBookmark, FaPowerOff } from "react-icons/fa6";

import { toast } from 'react-toastify';



const Sidebar = ({ setPath }) => { 
  const navigate = useNavigate();

  const notify = () => {
      toast.warn("Shutdown!", {
      theme: "dark"
    })
  }
  
  const handleClick = (newPath) => {
    setPath(newPath);
    navigate(newPath)
  };

  return (
    <aside>
      <Link to="/">
      <img src={Logo} alt="Logo" className="logo" />
      </Link>
      <div className="menu-wrapper">
        <Link to="#" onClick={() => handleClick('/home')}>
          <HiMiniHome className='icon'/>
        </Link>
        <Link to="#" onClick={() => handleClick('/videos')}>
          <IoVideocam className='icon'/>
        </Link>
        <Link to="#" onClick={() => handleClick('/papers')}>
          <FaBookBookmark className='icon'/>
        </Link>
        <img className="profile" src={Profile} alt="Perfil" />
        <Link to="#" onClick={() => {
              notify()
              handleClick('/')
        }}>
          <FaPowerOff className="power" />
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
