import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png';
import HomeIcon from '../assets/home.svg';
import VideoIcon from '../assets/videos.svg';
import PaperIcon from '../assets/papers.svg';
import PowerIcon from '../assets/power.svg';
import Profile from '../assets/profile.svg';

const Sidebar = ({ setPath }) => { 
  const navigate = useNavigate();
  
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
  );
};

export default Sidebar;
