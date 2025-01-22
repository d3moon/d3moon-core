import React, { useState } from 'react'
import LazyLoading from '../../components/LazyLoading'
import Sidebar from '../../components/Sidebar'
import { FaArrowLeft } from 'react-icons/fa'

import '../Notes/index.css'
import { Link, useNavigate } from 'react-router-dom'

const Notes = () => {
  const [path, setPath] = useState('') 
  const navigate = useNavigate()


  const handleClick = (newPath) => {
    setPath(newPath)
    navigate(newPath)
  }

  return (
    <>
      {path && <LazyLoading path={path} />}
      <div className="container">
        <Sidebar setPath={setPath} />
        <section className="principal-notes">
          <div className="title-note">
            <Link to="#" onClick={() => handleClick('/home')}>
              <FaArrowLeft className="icon-arrow-left" />
            </Link>
            <h1>Anotações</h1>
          </div>

          <div className="container-notes">
            <form className="container-inputs">
              <div className="container-wrapper">
                <div className="input-wrapper">
                  <label>Nome do bloco de notas</label>
                  <input type="text" />
                </div>
                <div className="input-wrapper tags">
                  <label>Tags</label>
                  <input type="text" />
                </div>
              </div>

              <div className="container-wrapper">
                <div className="input-wrapper workout">
                  <label>Treinamento</label>
                  <input type="text" />
                </div>

                <div className="input-wrapper videos">
                  <label>Vídeos</label>
                  <select>
                    <option value="volvo">Volvo</option>
                    <option value="saab">Saab</option>
                    <option value="opel">Opel</option>
                    <option value="audi">Audi</option>
                  </select>
                </div>
              </div>
              <button className="submit-form-notes">Criar Nota</button>
            </form>

            <div className="container-card">
              <div className="notes-wrapper">
                <div className="note-content">
                  <div className="note-left">
                    <h2>Card</h2>
                    <button>Acessar</button>
                  </div>
                  <div className="note-right">
                    <p className="course-description"></p>
                  </div>
                </div>
              </div>

              <div className="notes-wrapper">
                <div className="note-content">
                  <div className="note-left">
                    <h2>Card</h2>
                    <button>Acessar</button>
                  </div>
                  <div className="note-right">
                    <p className="course-description"></p>
                  </div>
                </div>
              </div>

              <div className="notes-wrapper">
                <div className="note-content">
                  <div className="note-left">
                    <h2>Card</h2>
                    <button>Acessar</button>
                  </div>
                  <div className="note-right">
                    <p className="course-description"></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Notes
