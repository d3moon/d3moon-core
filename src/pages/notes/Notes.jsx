import React, { useState } from 'react'
import LazyLoading from '../../components/LazyLoading'
import Sidebar from '../../components/Sidebar'

const Notes = () => {
    const [path, setPath] = useState(''); // Armazena o caminho para o lazy loading
  
  return (
    <>
      {path && <LazyLoading path={path} />}
      <div className="container">
        <Sidebar setPath={setPath} />
        <section className="principal-paper">
          <h1>Notas</h1>
        </section>
      </div>
    </>
  )
}

export default Notes
