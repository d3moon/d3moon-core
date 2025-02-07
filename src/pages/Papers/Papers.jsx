import React, { useState, useEffect } from 'react'
import '../Papers/index.css'
import LazyLoading from '../../components/LazyLoading'
import Sidebar from '../../components/Sidebar'
import { FaFilePdf } from 'react-icons/fa'
import axios from 'axios'

const Papers = () => {
  const [papers, setPapers] = useState([])
  const [path, setPath] = useState('')

  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const response = await axios.get(
          'https://d3moon-back.vercel.app:3000/papers'
        )
        console.log(response.data)
        setPapers(response.data)
      } catch (error) {
        console.error('Erro ao carregar os papers:', error)
      }
    }

    fetchPapers()
  }, [])

  const handleDownload = async (name) => {
    try {
      const response = await axios.get(
        `https://d3moon-back.vercel.app:3000/papers/download/${name}`,
        {
          responseType: 'blob',
        }
      )

      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', name)
      document.body.appendChild(link)
      link.click()

      document.body.removeChild(link)
    } catch (error) {
      console.error('Erro ao iniciar download:', error)
    }
  }

  const splitIntoColumns = (papers) => {
    const midIndex = Math.ceil(papers.length / 2)
    return [papers.slice(0, midIndex), papers.slice(midIndex)]
  }

  const [column1, column2] = splitIntoColumns(papers)

  return (
    <>
      {path && <LazyLoading path={path} />}
      <div className="container">
        <Sidebar setPath={setPath} />
        <section className="principal-paper">
          <h1>Papers disponíveis</h1>
          {papers.length > 0 ? (
            <div className="container-paper">
              <div className="paper-wrapper">
                <div className="column">
                  {column1.map((paper, idx) => (
                    <div className="single" key={idx}>
                      <p>{paper.name.split('.')[0]}</p>
                      <FaFilePdf
                        className="icon-file"
                        onClick={() => handleDownload(paper.name)}
                      />
                    </div>
                  ))}
                </div>
                <div className="column">
                  {column2.map((paper, idx) => (
                    <div className="single" key={idx}>
                      <p>{paper.name.split('.')[0]}</p>
                      <FaFilePdf
                        className="icon-file"
                        onClick={() => handleDownload(paper.name)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <p>No papers available.</p>
          )}
        </section>
      </div>
    </>
  )
}

export default Papers
