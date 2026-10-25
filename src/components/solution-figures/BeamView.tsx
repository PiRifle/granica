import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import type { BeamFigure, SolutionScene } from '../../types'
import { resolveFocus, type Focus } from './focus'
import { formatNumber, local, parseFigureNumber, valueRevealed } from './shared'

const BEAM_BANDS = [
  { key: 'shear' as const, label: 'T', baseline: 178, height: 34, color: '#4f6df5' },
  { key: 'moment' as const, label: 'M', baseline: 276, height: 34, color: '#ff6b45' },
]

export function BeamView({
  figure,
  scene,
  focus: suppliedFocus,
  animationKey,
  progress = 1,
  revealedFocus,
  sceneIndex = 0,
  revealedMath = '',
  heightFloor = 0,
  onRequestHeight,
}: {
  figure: BeamFigure
  scene: SolutionScene
  focus?: Focus
  animationKey?: string
  progress?: number
  revealedFocus?: string[]
  sceneIndex?: number
  revealedMath?: string
  heightFloor?: number
  onRequestHeight?: (height: number) => void
}) {
  const focus = suppliedFocus ?? resolveFocus(scene, figure)
  const activeBand = focus.metric === 'T' ? 'shear' : focus.metric === 'M' ? 'moment' : null
  const x = (value: number) => 55 + (value / figure.length) * 380
  const beamY = 82
  const maxDistributed = Math.max(...(figure.distributed ?? []).flatMap((item) => [item.start, item.end]), 1)
  const revealed = new Set(revealedFocus ?? [])
  const visibleValue = (item: { value: string; reveal?: number }) => valueRevealed(item, sceneIndex, revealedMath)
  const loadValue = (figure.values ?? []).find((item) => item.focus === 'load' && item.label === 'Q')
  const positionValue = (figure.values ?? []).find(
    (item) => item.focus === 'load' && (item.label.startsWith('x_Q') || item.label.startsWith('x_P')),
  )
  const shearValue = (figure.values ?? []).find((item) => item.focus === 'T')
  const momentValue = (figure.values ?? []).find((item) => item.focus === 'M')
  const showLoad = (revealed.has('load') || focus.metric === 'load') && (loadValue ? visibleValue(loadValue) : true)
  const showPosition = positionValue ? visibleValue(positionValue) : false
  const showReactions = revealed.has('reaction') || focus.metric === 'reaction'
  const showShear = (revealed.has('T') || focus.metric === 'T') && (shearValue ? visibleValue(shearValue) : true)
  const showMoment = (revealed.has('M') || focus.metric === 'M') && (momentValue ? visibleValue(momentValue) : true)
  const hasBands = showShear || showMoment
  const viewHeight = hasBands ? 320 : showPosition ? 200 : 150
  const effectiveViewHeight = Math.max(viewHeight, heightFloor)
  const viewportRef = useRef<HTMLDivElement>(null)
  const [viewportWidth, setViewportWidth] = useState(0)
  const [viewportReady, setViewportReady] = useState(false)

  useLayoutEffect(() => {
    const element = viewportRef.current
    if (!element) return
    const update = () => setViewportWidth(element.getBoundingClientRect().width)
    update()
    const observer = new ResizeObserver(([entry]) => setViewportWidth(entry.contentRect.width))
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    setViewportReady(true)
  }, [])

  useEffect(() => {
    onRequestHeight?.(viewHeight)
  }, [onRequestHeight, viewHeight])

  const viewportHeight = viewportWidth > 0 ? (viewportWidth * effectiveViewHeight) / 480 : undefined
  const resultants = (figure.distributed ?? []).flatMap((load) => {
    const total = ((load.start + load.end) / 2) * (load.to - load.from)
    const span = load.to - load.from
    const sum = load.start + load.end
    const centroid = sum === 0 ? load.from + span / 2 : load.from + (span * (load.start + 2 * load.end)) / (3 * sum)
    return total > 0 ? [{ total, centroid, label: load.label }] : []
  })

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <div
          ref={viewportRef}
          className={local('beam-viewport')}
          style={{ height: viewportHeight ?? 0, transition: viewportReady ? undefined : 'none' }}
        >
          <svg
            className={local('beam-svg')}
            viewBox="0 0 480 320"
            role="img"
            aria-label="Schemat belki z obciążeniem, reakcjami i wykresami"
          >
            <line
              x1={x(0)}
              y1={beamY}
              x2={x(figure.length)}
              y2={beamY}
              stroke="#556273"
              strokeWidth={5}
              strokeLinecap="round"
            />

            {(figure.distributed ?? []).map((load, loadIndex) => {
              const count = 9
              return (
                <g
                  key={`distributed-${loadIndex}`}
                  stroke="#ff8a5c"
                  fill="#ff8a5c"
                  opacity={focus.metric === 'load' ? 1 : 0.6}
                >
                  {Array.from({ length: count }, (_, index) => {
                    const ratio = index / (count - 1)
                    const position = load.from + ratio * (load.to - load.from)
                    const intensity = load.start + ratio * (load.end - load.start)
                    const height = 7 + (intensity / maxDistributed) * 26
                    const px = x(position)
                    return (
                      <g key={index}>
                        <line x1={px} y1={beamY - height} x2={px} y2={beamY - 5} strokeWidth={1.4} />
                        <path
                          d={`M${px - 3} ${beamY - 10} L${px} ${beamY - 4} L${px + 3} ${beamY - 10}`}
                          fill="none"
                          strokeWidth={1.4}
                        />
                      </g>
                    )
                  })}
                  <line
                    x1={x(load.from)}
                    y1={beamY - (7 + (load.start / maxDistributed) * 26)}
                    x2={x(load.to)}
                    y2={beamY - (7 + (load.end / maxDistributed) * 26)}
                    strokeWidth={2}
                  />
                  <text x={x((load.from + load.to) / 2)} y={beamY - 42} textAnchor="middle" fontSize={9} stroke="none">
                    {load.label}
                  </text>
                </g>
              )
            })}

            {(figure.pointLoads ?? []).map((load) => (
              <g
                key={`load-${load.at}-${load.label}`}
                stroke="#ff6b45"
                fill="#ff6b45"
                opacity={focus.metric === 'load' ? 1 : 0.6}
              >
                <line x1={x(load.at)} y1={beamY - 44} x2={x(load.at)} y2={beamY - 7} strokeWidth={2.6} />
                <path
                  d={`M${x(load.at) - 5} ${beamY - 15} L${x(load.at)} ${beamY - 6} L${x(load.at) + 5} ${beamY - 15}`}
                  fill="none"
                  strokeWidth={2.6}
                />
                <text x={x(load.at)} y={beamY - 50} textAnchor="middle" fontSize={10} stroke="none">
                  {load.label}
                </text>
              </g>
            ))}

            <AnimatePresence initial={false}>
              {showLoad &&
                resultants.map((resultant, index) => (
                  <motion.g
                    key={`resultant-${index}`}
                    stroke="#d84f28"
                    fill="#d84f28"
                    initial={{ opacity: 0, y: -10, scale: 0.9 }}
                    animate={{ opacity: focus.metric === 'load' ? 1 : 0.55, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.9 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    style={{ transformOrigin: `${x(resultant.centroid)}px ${beamY}px` }}
                  >
                    <line
                      x1={x(resultant.centroid)}
                      y1={beamY - 64}
                      x2={x(resultant.centroid)}
                      y2={beamY - 8}
                      strokeWidth={2.6}
                    />
                    <path
                      d={`M${x(resultant.centroid) - 5} ${beamY - 17} L${x(resultant.centroid)} ${beamY - 7} L${x(resultant.centroid) + 5} ${beamY - 17}`}
                      fill="none"
                      strokeWidth={2.6}
                    />
                    <line
                      x1={x(resultant.centroid)}
                      y1={beamY + 2}
                      x2={x(resultant.centroid)}
                      y2={beamY + 14}
                      strokeDasharray="3 3"
                      strokeWidth={1}
                    />
                    <text x={x(resultant.centroid)} y={beamY - 70} textAnchor="middle" fontSize={9} stroke="none">
                      Q = {formatNumber(resultant.total)} kN
                    </text>
                  </motion.g>
                ))}
            </AnimatePresence>

            <AnimatePresence initial={false}>
              {showReactions &&
                figure.supports.map((support, supportIndex) => {
                  const value = (figure.values ?? []).find(
                    (item) => item.focus === 'reaction' && item.label.includes(support.label),
                  )
                  if (value && !visibleValue(value)) return null
                  const magnitude = value ? parseFigureNumber(value.value) : undefined
                  if (magnitude == null) return null
                  const offset = figure.supports.length > 1 ? (supportIndex === 0 ? -22 : 22) : 0
                  const active = focus.metric === 'reaction'
                  return (
                    <motion.g
                      key={`reaction-${support.label}`}
                      stroke="#2f7d5b"
                      fill="#2f7d5b"
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: active ? 1 : 0.55, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.9 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      style={{ transformOrigin: `${x(support.at)}px ${beamY + 24}px` }}
                    >
                      <line
                        x1={x(support.at) + offset}
                        y1={beamY + 42}
                        x2={x(support.at) + offset}
                        y2={beamY + 8}
                        strokeWidth={2.4}
                      />
                      <path
                        d={`M${x(support.at) + offset - 4} ${beamY + 16} L${x(support.at) + offset} ${beamY + 5} L${x(support.at) + offset + 4} ${beamY + 16}`}
                        fill="none"
                        strokeWidth={2.4}
                      />
                      <text x={x(support.at) + offset} y={beamY + 54} textAnchor="middle" fontSize={8.5} stroke="none">
                        {value?.label} = {formatNumber(magnitude)} kN
                      </text>
                    </motion.g>
                  )
                })}
            </AnimatePresence>

            <AnimatePresence initial={false}>
              {showPosition && resultants.length > 0 && (
                <motion.g
                  key="resultant-position"
                  stroke="#4f6df5"
                  fill="#4f6df5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                >
                  <line x1={x(0)} y1={beamY + 64} x2={x(resultants[0].centroid)} y2={beamY + 64} strokeWidth={2} />
                  <line x1={x(0)} y1={beamY + 56} x2={x(0)} y2={beamY + 72} strokeWidth={2} />
                  <line
                    x1={x(resultants[0].centroid)}
                    y1={beamY + 56}
                    x2={x(resultants[0].centroid)}
                    y2={beamY + 72}
                    strokeWidth={2}
                  />
                  <text
                    x={x(resultants[0].centroid / 2)}
                    y={beamY + 82}
                    textAnchor="middle"
                    fontSize={10}
                    stroke="none"
                  >
                    {positionValue?.label} = {formatNumber(resultants[0].centroid)} m
                  </text>
                </motion.g>
              )}
            </AnimatePresence>

            {(figure.moments ?? []).map((moment) => (
              <g key={`moment-${moment.at}-${moment.label}`} stroke="#a970dd" fill="#a970dd">
                <path
                  d={`M${x(moment.at) - 14} ${beamY - 18} A16 16 0 1 1 ${x(moment.at) + 14} ${beamY - 18}`}
                  fill="none"
                  strokeWidth={2.4}
                />
                <path
                  d={`M${x(moment.at) + 9} ${beamY - 28} L${x(moment.at) + 16} ${beamY - 18} L${x(moment.at) + 5} ${beamY - 15}`}
                  strokeWidth={2.4}
                />
                <text x={x(moment.at)} y={beamY - 40} textAnchor="middle" fontSize={10} stroke="none">
                  {moment.label}
                </text>
              </g>
            ))}

            {figure.supports.map((support) => (
              <g key={`support-${support.at}-${support.label}`}>
                <path
                  d={`M${x(support.at) - 10} ${beamY + 16} L${x(support.at)} ${beamY + 2} L${x(support.at) + 10} ${beamY + 16} Z`}
                  fill="#68727e"
                />
                <text x={x(support.at)} y={beamY + 30} textAnchor="middle" fontSize={10} fill="#68727e">
                  {support.label}
                </text>
              </g>
            ))}

            <AnimatePresence initial={false}>
              {BEAM_BANDS.map((band) => {
                const lines = (band.key === 'shear' ? figure.shear : figure.moment) ?? []
                const shown = band.key === 'shear' ? showShear : showMoment
                if (!shown || lines.length === 0) return null
                const allValues = lines.flat().map(([, value]) => value)
                const maxAbs = Math.max(...allValues.map(Math.abs), 1)
                const active = activeBand === band.key
                const y = (value: number) => band.baseline - (value / maxAbs) * band.height
                return (
                  <motion.g
                    key={band.key}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: activeBand && !active ? 0.38 : 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  >
                    <line x1={55} y1={band.baseline} x2={440} y2={band.baseline} stroke="#c9d0d9" strokeWidth={1} />
                    <text x={20} y={band.baseline - band.height - 8} fontSize={10} fontWeight={700} fill={band.color}>
                      {band.label}
                    </text>
                    {lines.map((line, lineIndex) => {
                      const points = line.map(([position, value]) => `${x(position)},${y(value)}`).join(' ')
                      return (
                        <motion.polyline
                          key={`${band.key}-${lineIndex}`}
                          points={points}
                          fill="none"
                          stroke={band.color}
                          initial={{ pathLength: 0, opacity: 0.3 }}
                          animate={{ pathLength: 1, opacity: 1 }}
                          transition={{ pathLength: { duration: 0.6, ease: 'easeOut' }, opacity: { duration: 0.3 } }}
                          strokeWidth={active ? 3 : 2}
                          strokeLinejoin="round"
                        />
                      )
                    })}
                    {(figure.markers ?? [])
                      .filter((marker) => marker.diagram === band.key)
                      .map((marker, markerIndex) => (
                        <motion.g
                          key={`${band.key}-${markerIndex}`}
                          initial={{ opacity: 0, scale: 0.6 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.45, duration: 0.3 }}
                          style={{ transformOrigin: `${x(marker.x)}px ${y(marker.y)}px` }}
                        >
                          <circle cx={x(marker.x)} cy={y(marker.y)} r={3} fill={band.color} />
                          <text x={x(marker.x) + 6} y={y(marker.y) - 5} fontSize={8.5} fill={band.color}>
                            {marker.text}
                          </text>
                        </motion.g>
                      ))}
                  </motion.g>
                )
              })}
            </AnimatePresence>
          </svg>
        </div>
      </div>
      {figure.note && <p className={local('note')}>{figure.note}</p>}
    </div>
  )
}
