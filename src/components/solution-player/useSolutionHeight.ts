import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

export function useSolutionHeight(solutionId: string, index: number, seeking: boolean, position: number) {
  const [heightFloor, setHeightFloor] = useState(0)
  const [stageFloor, setStageFloor] = useState(0)
  const stageRef = useRef<HTMLDivElement>(null)
  const previousPositionRef = useRef(0)

  useEffect(() => {
    setHeightFloor(0)
    setStageFloor(0)
  }, [solutionId])

  useEffect(() => {
    if (position < previousPositionRef.current - 1) {
      setHeightFloor(0)
      setStageFloor(0)
    }
    previousPositionRef.current = position
  }, [position])

  const requestHeight = useCallback(
    (height: number) => {
      if (seeking) return
      setHeightFloor((current) => Math.max(current, height))
    },
    [seeking],
  )

  useLayoutEffect(() => {
    if (seeking) return
    const element = stageRef.current
    if (!element) return
    let timer: number | undefined
    const measure = () => {
      if (timer) window.clearTimeout(timer)
      timer = window.setTimeout(() => {
        const natural = Array.from(element.children).reduce((height, child) => {
          const inner = child.firstElementChild
          if (!inner) return height
          const styles = window.getComputedStyle(child)
          const padding = (Number.parseFloat(styles.paddingTop) || 0) + (Number.parseFloat(styles.paddingBottom) || 0)
          return Math.max(height, inner.getBoundingClientRect().height + padding)
        }, 0)
        setStageFloor(natural)
      }, 400)
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(element)
    return () => {
      observer.disconnect()
      if (timer) window.clearTimeout(timer)
    }
  }, [index, seeking, solutionId])

  return { stageRef, stageFloor, heightFloor, requestHeight }
}

export type SolutionHeight = ReturnType<typeof useSolutionHeight>
