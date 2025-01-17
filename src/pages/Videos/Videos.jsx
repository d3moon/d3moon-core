import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar'
import LazyLoading from '../../components/LazyLoading'
import { MdOutlineDescription } from 'react-icons/md'
import './index.css'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/Auth'
import { toast } from 'react-toastify'
import axios from 'axios'

// Novo componente SideThumbnails
const SideThumbnails = ({ playlist }) => {
  const navigate = useNavigate()

  const handleVideoClick = (videoId) => {
    // Mudar a URL para o novo vídeo
    navigate(`/videos/${videoId}`)
  }

  return (
    <div className="side-thumbnails">
      {playlist?.items?.map((item) => (
        <div key={item.id} className="thumbnail" onClick={() => handleVideoClick(item.id)}>
          <img
            src={item.snippet.thumbnails.default.url}
            alt={item.snippet.title}
          />
          <p>{item.snippet.title}</p>
        </div>
      ))}
    </div>
  )
}

const Videos = () => {
  const [path, setPath] = useState('')
  const [video, setVideo] = useState(null)
  const [playlist, setPlaylist] = useState([])
  const [showDescription, setShowDescription] = useState(false)

  const { authData, setAuthData } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchAuthData = async () => {
      const savedAuthData = localStorage.getItem('authData')
      if (savedAuthData) {
        setAuthData(JSON.parse(savedAuthData))
      } else if (!authData) {
        toast.error('Você precisa estar autenticado para acessar esta página.')
        navigate('/')
      }
    }
  
    fetchAuthData()
  }, [navigate, setAuthData])
  

  useEffect(() => {
    if (authData) {
      localStorage.setItem('authData', JSON.stringify(authData))

      const fetchVideoAndPlaylist = async () => {
        const videoId = authData?.content?.[0]?.videos?.[0]?.videoId
        const playlistId = authData?.content?.[0]?.idPlaylist

        try {
          if (videoId) {
            const responseVideo = await axios.get(`http://localhost:3000/contents/video/${videoId}`)
            setVideo(responseVideo?.data)
          }
          if (playlistId) {
            const responsePlaylist = await axios.get(`http://localhost:3000/contents/${playlistId}`)
            setPlaylist(responsePlaylist?.data)
          }
        } catch (error) {
          console.error('Erro ao buscar dados:', error)
          toast.error('Erro ao buscar dados.')
        }
      }

      fetchVideoAndPlaylist()
    }
  }, [])

  const toggleDescription = () => {
    setShowDescription(!showDescription)
  }

  const handleCloseModal = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      setShowDescription(false)
    }
  }

  const publishedAt = video?.snippet?.publishedAt

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short',
    }
    return date.toLocaleDateString('pt-BR', options)
  }

  return (
    <div className="container">
      <Sidebar setPath={setPath} />
      <main className="principal">
        {path && <LazyLoading path={path} />}
        <div className="title">
          <h1>
            {authData?.content?.[0]?.videos?.[0]?.title || 'Título do Vídeo'}
          </h1>
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

        <div className="container-video">
          <div className="main-video">
            {video ? (
              <iframe
                className="video"
                src={`https://www.youtube.com/embed/${video.id}`}
                title={video.snippet.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <p>Carregando vídeo...</p>
            )}
          </div>

          {/* Componente que exibe os próximos vídeos */}
          <SideThumbnails playlist={playlist} />
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
  )
}

export default Videos
