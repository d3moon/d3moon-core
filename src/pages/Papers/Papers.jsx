import React, { useState, useEffect } from 'react';
import '../Papers/index.css';
import LazyLoading from '../../components/LazyLoading';
import Sidebar from '../../components/Sidebar';
import { FaFile } from 'react-icons/fa';
import axios from 'axios';

const Papers = () => {
  const [papers, setPapers] = useState([]); // Armazena os papers
  const [path, setPath] = useState(''); // Armazena o caminho para o lazy loading

  // Buscar os papers da API
  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/papers');
        console.log(response.data); // Verifique a resposta da API
        setPapers(response.data); // Supondo que a resposta da API seja uma lista de papers
      } catch (error) {
        console.error('Erro ao carregar os papers:', error);
      }
    };

    fetchPapers();
  }, []); // A chamada é feita apenas uma vez após o componente ser montado

  // Função para fazer download de um paper
  const handleDownload = async (name) => {
    try {
      const response = await axios.get(`http://localhost:3000/papers/download/${name}`, {
        responseType: 'blob', // Garante que o arquivo seja tratado como blob
      });
      
      // Cria um link temporário para fazer o download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', name); // Define o nome do arquivo para download
      document.body.appendChild(link);
      link.click();
      
      // Limpa o link após o download
      document.body.removeChild(link);
    } catch (error) {
      console.error('Erro ao iniciar download:', error);
    }
  };
  

  return (
    <>
      {path && <LazyLoading path={path} />}
      <div className="container">
        <Sidebar setPath={setPath} />
        <section className="principal-paper">
          <h1>Papers disponíveis</h1>
          {/* Renderize a lista de arquivos */}
          {papers.length > 0 ? (
            <div className="container-paper">
              <div className="paper-wrapper">
                {papers.map((paper, idx) => (
                  <div className="single" key={idx}>
                    <p>{paper.name}</p>
                    <FaFile
                      className="icon-file"
                      onClick={() => handleDownload(paper.name)} // Chama o download ao clicar
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p>No papers available.</p>
          )}
        </section>
      </div>
    </>
  );
};


export default Papers;
