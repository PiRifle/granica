import { ChevronLeft, ChevronRight, FastForward, Pause, Play, Rewind, RotateCcw } from 'lucide-react'
import type { CourseSolution } from '../../types'
import { SPEEDS, SKIP_MS } from './constants'
import { local } from './local'
import { SolutionTimeline } from './SolutionTimeline'
import type { SolutionActive } from './useSolutionActive'
import type { SolutionPlayback } from './useSolutionPlayback'
import type { SolutionTiming } from './useSolutionTiming'

export function SolutionControls({
  solution,
  playback,
  active,
  timing,
  totalMs,
  progress,
}: {
  solution: CourseSolution
  playback: SolutionPlayback
  active: SolutionActive
  timing: SolutionTiming['timing']
  totalMs: number
  progress: number
}) {
  return (
    <div className={local('solution-controls')}>
      <div className={local('solution-buttons')}>
        <button className={local('icon-button')} type="button" onClick={playback.reset} aria-label="Od początku">
          <RotateCcw size={17} />
        </button>
        <button
          className={local('icon-button')}
          type="button"
          onClick={() => playback.goToScene(active.index - 1)}
          aria-label="Poprzednia scena"
          disabled={active.index === 0}
        >
          <ChevronLeft size={18} />
        </button>
        <button
          className={local('icon-button')}
          type="button"
          onClick={() => playback.seekTo(playback.position - SKIP_MS)}
          aria-label="Cofnij 5 sekund"
          disabled={playback.position <= 0}
        >
          <Rewind size={16} />
        </button>
        <button className={local('button button-dark button-small')} type="button" onClick={playback.toggle}>
          {playback.playing ? <Pause size={15} /> : <Play size={15} />}
          {playback.playing ? 'Pauza' : 'Odtwarzaj'}
        </button>
        <button
          className={local('icon-button')}
          type="button"
          onClick={() => playback.seekTo(playback.position + SKIP_MS)}
          aria-label="Przewiń 5 sekund"
          disabled={playback.position >= totalMs}
        >
          <FastForward size={16} />
        </button>
        <button
          className={local('icon-button')}
          type="button"
          onClick={() => playback.goToScene(active.index + 1)}
          aria-label="Następna scena"
          disabled={active.index === active.lastIndex}
        >
          <ChevronRight size={18} />
        </button>
        <div className={local('solution-speed')} role="group" aria-label="Tempo odtwarzania">
          {SPEEDS.map((value) => (
            <button
              key={value}
              type="button"
              className={playback.speed === value ? local('active') : undefined}
              aria-pressed={playback.speed === value}
              onClick={() => playback.setSpeed(value)}
            >
              {value}×
            </button>
          ))}
        </div>
      </div>
      <SolutionTimeline
        position={playback.position}
        totalMs={totalMs}
        progress={progress}
        seeking={playback.seeking}
        setSeeking={playback.setSeeking}
        seekTo={playback.seekTo}
        scenes={solution.scenes}
        timing={timing}
      />
    </div>
  )
}
