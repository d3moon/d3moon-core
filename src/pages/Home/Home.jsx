import React, { useState } from 'react'; 
import '../Home/index.css';
import '../Home/cards.css';
import LazyLoading from '../../components/LazyLoading';
import Sidebar from '../../components/Sidebar';

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
  );
};

const Home = () => {
  const [path, setPath] = useState(''); 

  return (
    <>
      {path && <LazyLoading path={path} />}
      <div className="container">
        <Sidebar setPath={setPath} /> 
        <section className="principal">
          <h1>Seus treinamentos</h1>
          <Cards />
        </section>
      </div>
    </>
  );
};

export default Home;
