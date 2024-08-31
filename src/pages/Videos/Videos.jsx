import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar'
import LazyLoading from '../../components/LazyLoading'
import CustomVideoPlayer from '../../components/Youtube'
import { MdOutlineDescription } from 'react-icons/md'
import './index.css'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/Auth'
import { toast } from 'react-toastify'
import axios from 'axios'

const Videos = () => {
  const [path, setPath] = useState('')
  const [video, setVideo] = useState(null)
  const [playlist, setPlaylist] = useState([])
  const [showDescription, setShowDescription] = useState(false)

  const { authData, setAuthData } = useAuth()
  const navigate = useNavigate()

  const opts = {
    height: '600', // Altura do vídeo
    width: '1000', // Largura do vídeo
    playerVars: {
      autoplay: 1, // Inicia o vídeo automaticamente
      controls: 1, // Mostra os controles do player (0 = ocultar, 1 = mostrar)
      modestbranding: 1, // Oculta o logotipo do YouTube no player
      rel: 0, // Não mostra vídeos relacionados ao final
      showinfo: 0, // Oculta informações do vídeo como o título (em players mais antigos)
      mute: 1, // Inicia o vídeo no mudo
    },
  }

  useEffect(() => {
    const fetchAuthData = async () => {
      const savedAuthData = localStorage.getItem('authData')
      console.log(savedAuthData)
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
    }
  }, [authData])

  useEffect(() => {
    const fetchVideo = async () => {
      const videoId = authData?.content?.[0]?.videos?.[0]?.videoId
      if (videoId) {
        try {
          const responseVideo = await axios.get(
            `http://localhost:3000/contents/video/${videoId}`
          )
          setVideo(responseVideo?.data)
        } catch (error) {
          console.error('Erro ao buscar vídeo:', error)
          toast.error('Erro ao buscar vídeo.')
        }
      }
    }

    const fetchPlaylist = async () => {
      const playlistId = authData?.content?.[0]?.idPlaylist
      if (playlistId) {
        try {
          const responsePlaylist = await axios.get(
            `http://localhost:3000/contents/${playlistId}`
          )
          console.log('Dados da playlist:', responsePlaylist?.data)
          setPlaylist(responsePlaylist?.data)
        } catch (error) {
          console.error('Erro ao buscar playlist:', error)
          toast.error('Erro ao buscar playlist.')
        }
      }
    }

    if (authData) {
      fetchVideo()
      fetchPlaylist()
    }
  }, [authData])

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
              <span>Publicado em: {formatDate(publishedAt)}</span>
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
                  <CustomVideoPlayer
                    videoId={video?.id}
                    opts={opts}
                  />
                ) : (
                  <p>Carregando vídeo...</p>
                )}
           </div>
          <div className="side-thumbnails">
            {playlist?.snippet?.thumbnails?.default ? (
              <div className="thumbnail">
                <img
                  src={playlist.snippet.thumbnails.default.url}
                  alt={playlist.snippet.title}
                />
                <p>{playlist.snippet.title}</p>
              </div>
            ) : (
              <p>Carregando thumbnails...</p>
            )}
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
                <p>{video?.snippet?.description}</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default Videos
