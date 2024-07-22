import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import LazyLoading from '../../components/LazyLoading';
import { FaArrowRight } from 'react-icons/fa6';
import { CiSearch } from 'react-icons/ci';

import './index.css';

const Videos = () => {
  const [path, setPath] = useState('');

  return (
    <div className="container">
      <Sidebar setPath={setPath} />
      <main className="principal">
        {path && <LazyLoading path={path} />}
        <h1>Instalando editor de código Visual Studio Code</h1>
        <div className='map-container'>
          <span>M.E.R.N</span>
          <FaArrowRight className='arrow' fill='white' />
          <span>Introdução e conceitos</span>
          <FaArrowRight className='arrow' fill='white' />
          <span>Instalando editor de código Visual Studio Code</span>
        </div>

        <div className='container-video'>
        <video src="" className='video'></video>
        <div className='progress-video'>
          <p>Progresso total do treinamento</p>
        <button>Restart</button>
        <input type="text" name="" id="" />
        <div className='search'>
          <CiSearch className='search-icon' fill='white' />
        </div>
        </div>

        <div className='next-videos'>
            
        </div>
        </div>
      </main>
    </div>
  );
};

export default Videos;
