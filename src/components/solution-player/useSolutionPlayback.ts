import { useCallback, useEffect, useState } from 'react'
import type { SolutionTiming } from './useSolutionTiming'

export function useSolutionPlayback(
  totalMs: number,
  timing: SolutionTiming['timing'],
  lastIndex: number,
  initialPlaying = false,
) {
  const [position, setPosition] = useState(0)
  const [playing, setPlaying] = useState(initialPlaying)
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

  const seekTo = useCallback(
    (value: number) => {
      setEngaged(true)
      setPosition(Math.max(0, Math.min(totalMs, value)))
    },
    [totalMs],
  )

  const reset = useCallback(() => {
    setEngaged(false)
    setPlaying(false)
    setPosition(0)
  }, [])

  const toggle = useCallback(() => {
    setEngaged(true)
    if (atEnd) {
      setPosition(0)
      setPlaying(true)
      return
    }
    setPlaying((value) => !value)
  }, [atEnd])

  const goToScene = useCallback(
    (target: number) => {
      const sceneIndex = Math.max(0, Math.min(lastIndex, target))
      setEngaged(false)
      setPlaying(false)
      setPosition(timing[sceneIndex]?.start ?? 0)
    },
    [lastIndex, timing],
  )

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
