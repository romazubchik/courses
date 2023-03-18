import React, { useEffect } from 'react'
import ReactPlayer from 'react-player'

const saveVideoTime = (videoId, time) => {
  if (!time) return
  localStorage.setItem(`${videoId}-time`, time)
}

const getVideoTime = (videoId) => {
  return parseFloat(localStorage.getItem(`${videoId}-time`))
}

function LessonPlayer({ srcVideo, lessonId }) {
  const playerRef = React.useRef(null)
  const [ video, setVideo ] = React.useState({ lessonId, srcVideo, startPosition: getVideoTime(lessonId) })
  const [ playbackRate, setPlaybackRate ] = React.useState(1)

  useEffect(() => {
    window.addEventListener('beforeunload', function (e) {
      e.preventDefault();
      e.returnValue = '';
      console.log('unmount')
      const currentTime = playerRef.current.getCurrentTime()
      saveVideoTime(video.lessonId, currentTime)
    });

    window.addEventListener('keypress', function (e) {
      const buttonKey = e.key

      if (buttonKey === '1') {
        setPlaybackRate( (prev) => prev + 0.2)
      }

      if (buttonKey === '0') {
        setPlaybackRate( (prev) => prev - 0.2)
      }
    })

    return () => {
      window.removeEventListener('beforeunload', null);
    }
  }, [])

  useEffect(() => {
      const currentTime = playerRef.current.getCurrentTime()
      saveVideoTime(video.lessonId, currentTime)
      const startPosition = localStorage.getItem(`${lessonId}-time`) || 0

      setVideo({ lessonId, srcVideo, startPosition })
  }, [ lessonId ])

  useEffect(() => {
    if (video.startPosition === 0) return
  }, [ video.startPosition ])

  const onReady = () => {
    playerRef.current.seekTo(video.startPosition, "seconds");
  };


  return (
    <div>
      <ReactPlayer
        playerRef={playerRef}
        url={video.srcVideo}
        playbackRate={playbackRate}
        controls={true}
        ref={playerRef}
        onReady={onReady}
        pip
        width={800}
        height={600}
      />
      <em>Playback rate: {playbackRate.toFixed(1)} (For change please use button 1️⃣ 0️⃣)</em>
    </div>
  )
}

export default LessonPlayer