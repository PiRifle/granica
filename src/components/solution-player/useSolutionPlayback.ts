import { useEffect, useState } from 'react'
import type { SolutionTiming } from './useSolutionTiming'

export function useSolutionPlayback(totalMs: number, timing: SolutionTiming['timing'], lastIndex: number) {
  const [position, setPosition] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [speed, setSpeed] = useState<number>(1)
  const [seeking, setSeeking] = useState(false)
  const [engaged, setEngaged] = useState(false)
  const atEnd = position >= totalMs

  useEffect(() => {
    if (!playing || atEnd) return
    let last = performance.now()
    const timer = window.setInterval(() => {
      const now = performance.now()
      const delta = (now - last) * speed
      last = now
      setPosition((current) => Math.min(totalMs, current + delta))
    }, 16)
    return () => window.clearInterval(timer)
  }, [atEnd, playing, speed, totalMs])

  useEffect(() => {
    if (playing && atEnd) {
      setPlaying(false)
      setEngaged(false)
    }
  }, [atEnd, playing])

  const seekTo = (value: number) => {
    setEngaged(true)
    setPosition(Math.max(0, Math.min(totalMs, value)))
  }

  const reset = () => {
    setEngaged(false)
    setPlaying(false)
    setPosition(0)
  }

  const toggle = () => {
    setEngaged(true)
    if (atEnd) {
      setPosition(0)
      setPlaying(true)
      return
    }
    setPlaying((value) => !value)
  }

  const goToScene = (target: number) => {
    const sceneIndex = Math.max(0, Math.min(lastIndex, target))
    setEngaged(false)
    setPlaying(false)
    setPosition(timing[sceneIndex]?.start ?? 0)
  }

  return {
    position,
    playing,
    speed,
    setSpeed,
    seeking,
    setSeeking,
    seekTo,
    reset,
    toggle,
    goToScene,
    atEnd,
    engaged,
  }
}

export type SolutionPlayback = ReturnType<typeof useSolutionPlayback>
