import { Expand, FastForward, Pause, Play, Rewind } from 'lucide-react'
import { cn } from 'shared/lib'
import { Button } from '../button'
import { Slider } from '../slider'
import { displayTime } from './video-player.lib'
import { useVideoPlayer } from './video-player.model'

interface IProps {
  url: string
  className?: string
}

export const VideoPlayer = ({ url, className }: IProps) => {
  const { refs, video, actions, slider } = useVideoPlayer()

  const handleOnValueChange = (values: number[]) => {
    const value = values[0]
    slider.onChange(value)
  }

  return (
    <div
      ref={refs.rootRef}
      className={cn(
        'relative h-[380px] rounded-lg overflow-hidden bg-zinc-800/20',
        className
      )}
    >
      <video
        ref={refs.videoRef}
        src={url}
        controls={false}
        className="w-full h-full"
      />
      <div className="absolute bottom-0 left-0 w-full p-4">
        <Slider
          value={[slider.value]}
          onValueChange={handleOnValueChange}
          onValueCommit={slider.onChangeCommitted}
          max={slider.maxValue}
          className="mb-2"
        />
        <div className="flex justify-between">
          <div className="flex space-x-2">
            <Button onClick={actions.revert} variant="secondary" size="icon">
              <Rewind />
            </Button>
            <Button onClick={actions.toggle} variant="secondary" size="icon">
              {video.isPlaying ? <Pause /> : <Play />}
            </Button>
            <Button onClick={actions.forward} variant="secondary" size="icon">
              <FastForward />
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-muted-foreground">
              {`${displayTime(slider.value)} / ${displayTime(slider.maxValue)}`}
            </span>
            <Button
              onClick={actions.fullscreen}
              variant="secondary"
              size="icon"
            >
              <Expand />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
