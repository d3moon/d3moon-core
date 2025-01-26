import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '../Home/index.css'
import '../Home/cards.css'
import LazyLoading from '../../components/LazyLoading'
import Sidebar from '../../components/Sidebar'
import { useAuth } from '../../contexts/Auth'
import { AiFillThunderbolt } from "react-icons/ai";


export const Cards = ({ searchQuery }) => {
  const { authData } = useAuth()
  const navigate = useNavigate()

  const [showModal, setShowModal] = useState(false)
  const [videoUrl, setVideoUrl] = useState('')

  const handleButtonClick = (playlistId) => {
    console.log(playlistId)
    navigate(`/videos/${playlistId}`) 
  }

  const handleVideoClick = (videoId) => {
    const videoUrl = `https://www.youtube.com/embed/${videoId}`
    setVideoUrl(videoUrl)
    setShowModal(true)
  }


  const filteredContent = Array.isArray(authData?.content)
  ? searchQuery
    ? authData.content.filter(
        (item) =>
          (item.name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
          (item.description?.toLowerCase() || '').includes(searchQuery.toLowerCase())
      )
    : authData.content 
  : []

const filteredVideos = Array.isArray(authData?.content)
  ? searchQuery
    ? authData.content.flatMap(
        (item) =>
          item.videos?.filter(
            (video) =>
              video.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
              video.videoId?.toLowerCase().includes(searchQuery.toLowerCase())
          ) || []
      )
    : [] 
  : []

return (
  <div className="cards">
    {filteredContent.length === 0 && filteredVideos.length === 0 ? (
      <p style={{ fontSize: '20px', color: '#666' }}>Nenhum conteúdo encontrado.</p>
    ) : (
      <>
        {filteredContent.map((item, index) => (
         <div className="cards-wrapper" key={index}>
         <div className="icon-wrapper">
            <AiFillThunderbolt className='-icon' />
         </div>
         <div className="card-content">
           <div className="card-left">
             <h2>{item.name}</h2>
             <div className="progress"></div>
             <button onClick={() => handleButtonClick(item.idPlaylist)}>
               Acessar
             </button>
           </div>
           <div className="card-right">
             <p className="course-description">{item.description}</p>
           </div>
         </div>
       </div>
       
        ))}
        {searchQuery && filteredVideos.map((video, index) => (
          <div className="cards-wrapper" key={`video-${index}`}>
            <div className="card-content">
              <div className="card-left">
                <h2>{video.title}</h2>
                <button onClick={() => handleVideoClick(video.videoId)}>
                  Acessar Vídeo
                </button>
              </div>
            </div>
          </div>
        ))}
      </>
    )}

    {showModal && (
      <div className="modal-overlay">
        <div className="modal-content-video">
          <button className="close-btn" onClick={() => setShowModal(false)}>
            X
          </button>
          <iframe
            width="560"
            height="315"
            src={videoUrl}
            title="Vídeo"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    )}
  </div>

  )
}


const Home = () => {
  const { authData, setAuthData } = useAuth()
  const [path, setPath] = useState('')
  const [searchQuery, setSearchQuery] = useState('') 
  const navigate = useNavigate()

  useEffect(() => {
    const savedAuthData = localStorage.getItem('authData')
    if (savedAuthData) {
      setAuthData(JSON.parse(savedAuthData))
    } else if (!authData) {
      toast.error('Você precisa estar autenticado para acessar esta página.')
      navigate('/')
    }
  }, [])

  useEffect(() => {
    if (authData) {
      localStorage.setItem('authData', JSON.stringify(authData))
    }
  }, [authData])

  return (
    <>
      {path && <LazyLoading path={path} />}
      <div className="container">
        <Sidebar setPath={setPath} />
        <section className="principal">
          <h1>Seus treinamentos</h1>
          <input
            type="text"
            placeholder="Pesquisar treinamentos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='filter-field'
          />

          <Cards searchQuery={searchQuery} />
        </section>
      </div>
    </>
  )
}

export default Home
