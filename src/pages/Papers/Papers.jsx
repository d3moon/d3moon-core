import React, { useState } from 'react'
import '../Papers/index.css'
import LazyLoading from '../../components/LazyLoading'
import Sidebar from '../../components/Sidebar'
import { FaFile } from 'react-icons/fa'

const Papers = () => {
  const [path, setPath] = useState('')

  return (
    <>
      {path && <LazyLoading path={path} />}
      <div className="container">
        <Sidebar setPath={setPath} />
        <section className="principal-paper">
          <h1>Papers</h1>
          <div className="container-paper">
            <h3>Análise de Malware</h3>
            <div className="paper-wrapper">
              <div className="single">
                <p>Cap 1 - Lorem ipsum dolor sit amet consectetur adipisic.</p>
                <FaFile className="icon-file" />
              </div>
              <div className="single">
                <p>Cap 1 - Lorem ipsum dolor sit amet consectetur adipisic.</p>
                <FaFile className="icon-file" />
              </div>
              <div className="single">
                <p>Cap 1 - Lorem ipsum dolor sit amet consectetur adipisic.</p>
                <FaFile className="icon-file" />
              </div>
              <div className="single">
                <p>Cap 1 - Lorem ipsum dolor sit amet consectetur adipisic.</p>
                <FaFile className="icon-file" />
              </div>
              <div className="single">
                <p>Cap 1 - Lorem ipsum dolor sit amet consectetur adipisic.</p>
                <FaFile className="icon-file" />
              </div>
            </div>
          </div>
          <div className="container-paper">
            <h3>Análise de Malware</h3>
            <div className="paper-wrapper">
              <div className="single">
                <p>Cap 1 - Lorem ipsum dolor sit amet consectetur adipisic.</p>
                <FaFile className="icon-file" />
              </div>
              <div className="single">
                <p>Cap 1 - Lorem ipsum dolor sit amet consectetur adipisic.</p>
                <FaFile className="icon-file" />
              </div>
              <div className="single">
                <p>Cap 1 - Lorem ipsum dolor sit amet consectetur adipisic.</p>
                <FaFile className="icon-file" />
              </div>
              <div className="single">
                <p>Cap 1 - Lorem ipsum dolor sit amet consectetur adipisic.</p>
                <FaFile className="icon-file" />
              </div>
              <div className="single">
                <p>Cap 1 - Lorem ipsum dolor sit amet consectetur adipisic.</p>
                <FaFile className="icon-file" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Papers
