import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import LazyLoading from '../../components/LazyLoading';
import { MdOutlineDescription } from 'react-icons/md';
import './index.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/Auth';
import { toast } from 'react-toastify';
import axios from 'axios';

// Componente SideThumbnails
const SideThumbnails = ({ playlist, onVideoSelect }) => {
  return (
    <div className="side-thumbnails">
      {playlist?.map((item) => (
        <div
          key={item.id}
          className="thumbnail"
          onClick={() => onVideoSelect(item?.snippet?.resourceId?.videoId)} // Chama a função de seleção
        >
          <img
            src={item?.snippet?.thumbnails?.high?.url}
            alt={item?.snippet?.title}
          />
          <p>{item.snippet.title}</p>
        </div>
      ))}
    </div>
  );
};

const Videos = () => {
  const [path, setPath] = useState('');
  const [video, setVideo] = useState(null);
  const [playlist, setPlaylist] = useState([]);
  const [showDescription, setShowDescription] = useState(false);

  const { authData, setAuthData } = useAuth();
  const navigate = useNavigate();
  const { idPlaylist } = useParams();


  // Carrega os dados de autenticação
  useEffect(() => {
    const fetchAuthData = async () => {
      const savedAuthData = localStorage.getItem('authData');
      if (savedAuthData && !authData) {
        setAuthData(JSON.parse(savedAuthData));
      } else if (!savedAuthData && !authData) {
        toast.error('Você precisa estar autenticado para acessar esta página.');
        navigate('/');
      }
    };
  
    fetchAuthData();
  }, [navigate, setAuthData, authData]); // Verifique se 'authData' é necessário como dependência
  

  // Carrega os dados da playlist e do vídeo principal (primeiro vídeo)
  useEffect(() => {
    if (authData) {
      const fetchVideoAndPlaylist = async () => {
        try {
          if (idPlaylist) {
            const responsePlaylist = await axios.get(
              `http://localhost:3000/contents/${idPlaylist}`
            );
            const playlistData = responsePlaylist?.data;

            // Define a playlist e o primeiro vídeo da playlist
            console.log(playlist)
            setPlaylist(playlistData);
            if (playlistData && playlistData.length > 0) {
              setVideo(playlistData[0]); // O primeiro vídeo será carregado automaticamente
            }
          }
        } catch (error) {
          console.error('Erro ao buscar dados da playlist:', error);
          toast.error('Erro ao buscar dados da playlist.');
        }
      };

      fetchVideoAndPlaylist();
    }
  }, [authData, idPlaylist]);
  

  // Função para carregar o vídeo ao selecionar um item da playlist
  const handleVideoSelect = async (videoId) => {
    try {
      console.log(videoId)
      const responseVideo = await axios.get(
        `http://localhost:3000/contents/video/${videoId}`
      );
      setVideo(responseVideo?.data);
      console.log(video)
    } catch (error) {
      console.error('Erro ao carregar vídeo:', error);
      toast.error('Erro ao carregar o vídeo selecionado.');
    }
  };

  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  const handleCloseModal = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      setShowDescription(false);
    }
  };

  const publishedAt = video?.snippet?.publishedAt;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short',
    };
    return date.toLocaleDateString('pt-BR', options);
  };
  

  return (
    <div className="container">
      <Sidebar setPath={setPath} />
      <main className="principal">
        {path && <LazyLoading path={path} />}
        <div className="title">
          <h1>{video?.snippet?.title || 'Título do Vídeo'}</h1>
          <div className="map-container">
            <div className="date-container">
              <span>
                Publicado em: {publishedAt ? formatDate(publishedAt) : 'N/A'}
              </span>
            </div>
            <div className="description-section">
              <MdOutlineDescription
                className="description-icon"
                onClick={toggleDescription}
              />
            </div>
          </div>
        </div>

        <div className="container-content">
          <div className="container-video">
            <div className="main-video">
              {video ? (
                <iframe
                  className="video"
                  src={
                    video?.snippet?.resourceId?.videoId
                      ? `https://www.youtube.com/embed/${video.snippet.resourceId.videoId}`
                      : `https://www.youtube.com/embed/${video?.id}`  // URL alternativa caso o primeiro vídeoId não seja encontrado
                  }                  title={video?.snippet?.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <LazyLoading />
              )}
            </div>

            {/* Passa a função para selecionar o vídeo */}
            <SideThumbnails playlist={playlist} onVideoSelect={handleVideoSelect} />
          </div>
        </div>

        {/* Modal */}
        {showDescription && (
          <div className="modal-overlay" onClick={handleCloseModal}>
            <div className="modal-content">
              <div className="modal-header">
                <h2>Descrição do Treinamento</h2>
                <button
                  className="modal-close"
                  onClick={() => setShowDescription(false)}
                >
                  X
                </button>
              </div>
              <div className="modal-body">
                <p>
                  {video?.snippet?.description || 'Sem descrição disponível.'}
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Videos;
