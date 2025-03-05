import { useEffect, useRef, useState } from 'react'
import { useEvent } from 'shared/lib'

const STEP = 10

export const useVideoPlayer = () => {
  const rootRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [isSeeking, setIsSeeking] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  const onTimeUpdate = useEvent(() => {
    if (isSeeking) {
      return
    }

    const video = videoRef.current

    if (!video) {
      return
    }

    setCurrentTime(video.currentTime)
  })

  useEffect(() => {
    const video = videoRef.current

    if (!video) {
      return
    }

    const onPlay = () => {
      setIsPlaying(true)
    }

    const onPause = () => {
      setIsPlaying(false)
    }

    video.addEventListener('play', onPlay)
    video.addEventListener('pause', onPause)
    video.addEventListener('timeupdate', onTimeUpdate)

    return () => {
      video.removeEventListener('play', onPlay)
      video.removeEventListener('pause', onPause)
      video.removeEventListener('timeupdate', onTimeUpdate)
    }
  }, [videoRef])

  useEffect(() => {
    if (videoRef.current?.duration) {
      setDuration(videoRef.current?.duration)
    }
  }, [videoRef.current?.duration])

  const revert = useEvent(() => {
    const video = videoRef.current

    if (!video) {
      return
    }

    video.currentTime -= STEP
  })

  const forward = useEvent(() => {
    const video = videoRef.current

    if (!video) {
      return
    }

    video.currentTime += STEP
  })

  const toggle = useEvent(() => {
    const video = videoRef.current

    if (!video) {
      return
    }

    if (isPlaying) {
      video.pause()
    } else {
      video.play()
    }
  })

  const fullscreen = useEvent(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      rootRef.current?.requestFullscreen()
    }
  })

  const onBeginChange = useEvent(() => {
    setIsSeeking(true)
  })

  const onChange = useEvent((value: number) => {
    const video = videoRef.current

    if (!video) {
      return
    }

    video.currentTime = value
    setCurrentTime(value)
  })

  const onChangeCommitted = useEvent(() => {
    setIsSeeking(false)
  })

  return {
    refs: {
      rootRef,
      videoRef,
    },
    video: {
      isPlaying,
      isSeeking,
      currentTime,
      duration,
    },
    actions: {
      revert,
      forward,
      toggle,
      fullscreen,
    },
    slider: {
      value: currentTime,
      maxValue: duration,
      onBeginChange,
      onChange,
      onChangeCommitted,
    },
  }
}
