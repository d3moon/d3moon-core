import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/logo.png';
import './index.css'

const NotFound = ({ path }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <>
      {loading && (
        <div className="loading-blur">
          <img src={Logo} alt="Logo" />
          <div className="container-notfound">
            <h1>Essa página não existe</h1>
            <Link className='link-notfound' to="/" onClick={() => handleClick('/')}>
              <p className="notfound-link">Volte para o início</p>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default NotFound;
