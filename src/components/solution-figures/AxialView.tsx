import { motion } from 'motion/react'
import type { AxialFigure, AxialSegment, SolutionScene } from '../../types'
import { resolveFocus, type Focus } from './focus'
import { formatNumber, local, SEGMENT_COLORS } from './shared'

const HIDDEN_LABELS = new Set(['', 'górny', 'dolny', 'g', 'd'])

function mergeSegments(segments: AxialSegment[]) {
  const merged: AxialSegment[] = []
  const sourceIndex: number[] = []
  for (const segment of segments) {
    const last = merged[merged.length - 1]
    const sameArea = last ? (last.area ?? null) === (segment.area ?? null) : false
    const sameLabel = last ? last.label === segment.label : false
    const artificial = last ? HIDDEN_LABELS.has(last.label) && HIDDEN_LABELS.has(segment.label) : false
    if (last && sameArea && (sameLabel || artificial)) {
      last.length += segment.length
      if (artificial) last.label = ''
      sourceIndex.push(merged.length - 1)
    } else {
      merged.push({ ...segment })
      sourceIndex.push(merged.length - 1)
    }
  }
  return { segments: merged, sourceIndex }
}

export function AxialView({
  figure,
  scene,
  focus: suppliedFocus,
  animationKey,
  progress = 1,
  revealedFocus,
  sceneIndex = 0,
  revealedMath = '',
}: {
  figure: AxialFigure
  scene: SolutionScene
  focus?: Focus
  animationKey?: string
  progress?: number
  revealedFocus?: string[]
  sceneIndex?: number
  revealedMath?: string
}) {
  const focus = suppliedFocus ?? resolveFocus(scene, figure)
  const { segments, sourceIndex } = mergeSegments(figure.segments)
  const totalLength = segments.reduce((sum, segment) => sum + segment.length, 0)

  const chart = { top: 32, bottom: 252, centerX: 188 }
  const usable = chart.bottom - chart.top
  const rawHeights = segments.map((segment) => (segment.length / totalLength) * usable)
  const scale = Math.min(1, usable / rawHeights.reduce((sum, value) => sum + Math.max(value, 30), 0))
  const heights = rawHeights.map((value) => Math.max(value, 30) * scale)
  const nodes = [chart.top]
  for (const height of heights) nodes.push(nodes[nodes.length - 1] + height)

  const ratios = [0]
  let runningLength = 0
  for (const segment of segments) {
    runningLength += segment.length
    ratios.push(runningLength / totalLength)
  }
  const sourceRatios = [0]
  let sourceLength = 0
  const sourceTotal = figure.segments.reduce((sum, segment) => sum + segment.length, 0)
  for (const segment of figure.segments) {
    sourceLength += segment.length
    sourceRatios.push(sourceLength / sourceTotal)
  }

  const yForRatio = (ratio: number) => {
    for (let index = 0; index < segments.length; index += 1) {
      if (ratio <= ratios[index + 1] || index === segments.length - 1) {
        const span = ratios[index + 1] - ratios[index]
        const within = span > 0 ? (ratio - ratios[index]) / span : 0
        return nodes[index] + Math.min(1, Math.max(0, within)) * heights[index]
      }
    }
    return nodes[nodes.length - 1]
  }

  const maxArea = Math.max(...segments.map((segment) => segment.area ?? 1), 1)
  const halfWidths = segments.map((segment) => 14 + 46 * Math.sqrt((segment.area ?? maxArea) / maxArea))
  const maxHalfWidth = Math.max(...halfWidths)
  const activeSource = figure.segments.findIndex((segment) => segment.id === focus.segment)
  const activeHeight = activeSource >= 0 ? sourceIndex[activeSource] : -1

  const support = (y: number, direction: 'top' | 'bottom') => {
    const sign = direction === 'top' ? -1 : 1
    return (
      <g key={`${direction}-${y}`} stroke="#68727e" strokeWidth={2} strokeLinecap="round">
        <line x1={chart.centerX - maxHalfWidth - 18} y1={y} x2={chart.centerX + maxHalfWidth + 18} y2={y} />
        {Array.from({ length: 9 }, (_, index) => {
          const x = chart.centerX - maxHalfWidth - 12 + index * ((maxHalfWidth * 2 + 24) / 8)
          return <line key={index} x1={x} y1={y} x2={x + sign * 8} y2={y + sign * 12} strokeWidth={1.5} />
        })}
      </g>
    )
  }

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg viewBox="0 0 460 280" role="img" aria-label={`Pręt podzielony na ${segments.length} odcinków`}>
          {figure.top === 'fixed' && support(chart.top, 'top')}
          {figure.top === 'gap' && (
            <text x={chart.centerX} y={chart.top - 10} textAnchor="middle" fontSize={10} fill="#87929d">
              luz a
            </text>
          )}
          {figure.bottom === 'fixed' && support(nodes[nodes.length - 1], 'bottom')}
          {figure.bottom === 'gap' && (
            <g stroke="#87929d" strokeWidth={1.5} strokeDasharray="4 4">
              <line
                x1={chart.centerX - 60}
                y1={nodes[nodes.length - 1] + 14}
                x2={chart.centerX + 60}
                y2={nodes[nodes.length - 1] + 14}
              />
              <line
                x1={chart.centerX - 60}
                y1={nodes[nodes.length - 1] + 22}
                x2={chart.centerX + 60}
                y2={nodes[nodes.length - 1] + 22}
              />
            </g>
          )}

          {segments.map((segment, index) => {
            const y = nodes[index]
            const height = heights[index]
            const color = SEGMENT_COLORS[index % SEGMENT_COLORS.length]
            const active = index === activeHeight
            const width = halfWidths[index] * 2
            return (
              <g key={`${segment.id}-${index}`}>
                <motion.rect
                  x={chart.centerX - halfWidths[index]}
                  y={y}
                  width={width}
                  height={height}
                  rx={4}
                  fill={color}
                  initial={false}
                  animate={{
                    fillOpacity: active ? 0.32 : index % 2 === 0 ? 0.12 : 0.2,
                    strokeWidth: active ? 3 : 1.6,
                  }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  stroke={color}
                />
                {active && (
                  <motion.rect
                    key={`outline-${animationKey}-${segment.id}`}
                    x={chart.centerX - halfWidths[index]}
                    y={y}
                    width={width}
                    height={height}
                    rx={4}
                    fill="none"
                    stroke={color}
                    strokeWidth={2}
                    initial={{ pathLength: 0, opacity: 0.4 }}
                    animate={{ pathLength: progress, opacity: 1 }}
                    transition={{ pathLength: { duration: 0.12, ease: 'linear' }, opacity: { duration: 0.3 } }}
                  />
                )}
                {!HIDDEN_LABELS.has(segment.label) && (
                  <text
                    x={chart.centerX - halfWidths[index] - 10}
                    y={y + height / 2 + 4}
                    textAnchor="end"
                    fontSize={12}
                    fontWeight={700}
                    fill={color}
                  >
                    {segment.label}
                  </text>
                )}
                <text x={chart.centerX + maxHalfWidth + 16} y={y + height / 2 - 2} fontSize={9} fill="#87929d">
                  L = {formatNumber(segment.length)}
                </text>
                {segment.area != null && (
                  <text x={chart.centerX + maxHalfWidth + 16} y={y + height / 2 + 11} fontSize={9} fill="#87929d">
                    A = {formatNumber(segment.area)}
                  </text>
                )}
              </g>
            )
          })}

          {(figure.loads ?? []).map((load, index) => {
            const y = yForRatio(sourceRatios[load.node] ?? 0)
            const direction = load.direction ?? 'down'
            const x = chart.centerX + maxHalfWidth + 66 + (index % 2) * 0
            const start = direction === 'down' ? y - 38 : y + 38
            const end = direction === 'down' ? y - 6 : y + 6
            return (
              <g key={`${load.node}-${load.label}`} stroke="#ff6b45" fill="#ff6b45">
                <line x1={x} y1={start} x2={x} y2={end} strokeWidth={2.5} />
                <path
                  d={
                    direction === 'down'
                      ? `M${x - 5} ${end - 8} L${x} ${end} L${x + 5} ${end - 8}`
                      : `M${x - 5} ${end + 8} L${x} ${end} L${x + 5} ${end + 8}`
                  }
                  fill="none"
                  strokeWidth={2.5}
                />
                <text x={x + 8} y={(start + end) / 2 + 4} fontSize={10} stroke="none">
                  {load.label}
                </text>
              </g>
            )
          })}
        </svg>
      </div>
      {figure.note && <p className={local('note')}>{figure.note}</p>}
    </div>
  )
}
