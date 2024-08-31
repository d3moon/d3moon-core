import React from 'react'
import YouTube from 'react-youtube'

const CustomVideoPlayer = ({ videoId, opts }) => {
  return <YouTube videoId={videoId} opts={opts} />
}

export default CustomVideoPlayer
