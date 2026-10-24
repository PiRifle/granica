import { useRef } from 'react'
import type { SolutionScene } from '../../types'
import { formatTime, SCENE_MS, SKIP_MS } from './constants'
import { local } from './local'

export function SolutionTimeline({
  position,
  totalMs,
  progress,
  seeking,
  setSeeking,
  seekTo,
  scenes,
  timing,
}: {
  position: number
  totalMs: number
  progress: number
  seeking: boolean
  setSeeking: (value: boolean) => void
  seekTo: (value: number) => void
  scenes: SolutionScene[]
  timing: Array<{ start: number }>
}) {
  const trackRef = useRef<HTMLDivElement>(null)

  const seekFromClientX = (clientX: number) => {
    const track = trackRef.current
    if (!track) return
    const rect = track.getBoundingClientRect()
    if (rect.width === 0) return
    seekTo(((clientX - rect.left) / rect.width) * totalMs)
  }

  return (
    <div className={local('solution-timeline')}>
      <span className={local('solution-time')}>{formatTime(position)}</span>
      <div
        ref={trackRef}
        className={local('solution-track', seeking && 'seeking')}
        role="slider"
        tabIndex={0}
        aria-label="Postęp odtwarzania"
        aria-valuemin={0}
        aria-valuemax={Math.round(totalMs / 1000)}
        aria-valuenow={Math.round(position / 1000)}
        aria-valuetext={`${formatTime(position)} z ${formatTime(totalMs)}`}
        onPointerDown={(event) => {
          event.preventDefault()
          event.currentTarget.focus()
          event.currentTarget.setPointerCapture(event.pointerId)
          setSeeking(true)
          seekFromClientX(event.clientX)
        }}
        onPointerMove={(event) => {
          if (seeking) seekFromClientX(event.clientX)
        }}
        onPointerUp={(event) => {
          if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId)
          }
          setSeeking(false)
        }}
        onPointerCancel={() => setSeeking(false)}
        onKeyDown={(event) => {
          const step = event.shiftKey ? SCENE_MS : SKIP_MS
          if (event.key === 'ArrowLeft') {
            event.preventDefault()
            seekTo(position - step)
          } else if (event.key === 'ArrowRight') {
            event.preventDefault()
            seekTo(position + step)
          } else if (event.key === 'Home') {
            event.preventDefault()
            seekTo(0)
          } else if (event.key === 'End') {
            event.preventDefault()
            seekTo(totalMs)
          }
        }}
      >
        <span className={local('solution-track-fill')} style={{ width: `${progress}%` }} />
        {scenes.map((item, sceneIndex) =>
          sceneIndex === 0 ? null : (
            <span
              key={`tick-${item.title}-${sceneIndex}`}
              className={local('solution-track-tick')}
              style={{ left: `${(timing[sceneIndex].start / totalMs) * 100}%` }}
              title={`Scena ${sceneIndex + 1}: ${item.title}`}
            />
          ),
        )}
        <span className={local('solution-track-thumb')} style={{ left: `${progress}%` }} />
      </div>
      <span className={local('solution-time')}>{formatTime(totalMs)}</span>
    </div>
  )
}
