import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import LazyLoading from '../../components/LazyLoading';
import { FaArrowRight } from 'react-icons/fa';
import { IoEyeSharp } from 'react-icons/io5';
import { MdOutlineDescription } from 'react-icons/md';

import './index.css';

const Videos = () => {
  const [path, setPath] = useState('');
  const [showDescription, setShowDescription] = useState(false);

  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  const handleCloseModal = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      setShowDescription(false);
    }
  };

  return (
    <div className="container">
      <Sidebar setPath={setPath} />
      <main className="principal">
        {path && <LazyLoading path={path} />}
        <div className="title">
          <h1>Instalando editor de código Visual Studio Code</h1>
          <div className="map-container">
            <span>M.E.R.N</span>
            <FaArrowRight className="arrow" fill="white" />
            <span>Introdução e conceitos</span>
            <FaArrowRight className="arrow" fill="white" />
            <span>Instalando editor de código Visual Studio Code</span>
           <div className="description-section">
              <MdOutlineDescription 
                className="description-icon" 
                onClick={toggleDescription} 
                />
            </div>
          </div>
        </div>

        <div className="container-video">
          <div className="main-video">
            <video src="" className="video"></video>
          </div>
          <div className="side-thumbnails">
            <div className="next-videos">
              <div className="next">
                <IoEyeSharp />
                <div className="container-desc">
                  <p>Instalando editor de código Visual Studio Code</p>
                  <span>10 min</span>
                </div>
              </div>
              <div className="next">
                <IoEyeSharp />
                <div className="container-desc">
                  <p>Introdução ao Node.js</p>
                  <span>12 min</span>
                </div>
              </div>
              <div className="next">
                <IoEyeSharp />
                <div className="container-desc">
                  <p>Configurando Express.js</p>
                  <span>15 min</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal */}
        {showDescription && (
          <div className="modal-overlay" onClick={handleCloseModal}>
            <div className="modal-content">
              <div className="modal-header">
                <h2>Descrição do Treinamento</h2>
                <button className="modal-close" onClick={() => setShowDescription(false)}>X</button>
              </div>
              <div className="modal-body">
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus earum explicabo ipsum ipsa iure consequatur, ea esse. Natus fugit fuga veniam magnam optio ipsa adipisci aspernatur, ab vitae pariatur tempore.</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Videos;
