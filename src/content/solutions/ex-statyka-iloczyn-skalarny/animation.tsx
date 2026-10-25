import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const FORCE = '#ff6b45'
const VERTICAL = '#4f6df5'
const RESULT = '#27835a'
const AXIS = '#9aa5b1'
const MUTED = '#87929d'
const INK = '#17202a'
const EDGE = '#68727e'
const CART = '#dfe6f2'

const P = { x: 110, y: 255 }
const forceScale = 2
const fEnd = { x: P.x + 20 * forceScale, y: P.y - 20 * Math.sqrt(3) * forceScale }
const gEnd = { x: P.x, y: P.y - 30 * forceScale }
const sStart = { x: 150, y: 325 }
const sEnd = { x: 330, y: 325 }

const arcPoint = (radius: number, degrees: number) => ({
  x: P.x + radius * Math.cos((degrees * Math.PI) / 180),
  y: P.y - radius * Math.sin((degrees * Math.PI) / 180),
})

const clamp01 = (value: number) => Math.max(0, Math.min(1, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}

const captions = [
  'Przemieszczenie poziome, siła ukośna i pionowa',
  'Praca F: W = F·s = 240 J',
  'Kontrola rzutem: Fx·s = 20·12 = 240 J',
  'Siła pionowa jest prostopadła do ruchu — W_G = 0',
  'Iloczyn F·G = 600√3 ≈ 1039,2 N²',
  'Kąt z cosinusa: φ = 30°',
]

export function DotProductAnimation({ index, playing, sceneProgress }: SolutionAnimationProps) {
  const showProjection = index >= 1
  const showAngle60 = index >= 2
  const showPerpendicular = index >= 3
  const showAngle30 = index >= 4

  const forceFade = index === 3 ? 0.4 : 1
  const workGlow = index === 1 && playing ? 0.25 + 0.55 * smooth(sceneProgress) : index === 1 ? 0.8 : 0.45
  const angleSweep = showAngle30 ? (playing && index === 4 ? smooth(sceneProgress) : 1) : 0
  const summary = captions[Math.min(index, captions.length - 1)]

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 350"
          role="img"
          aria-label="Iloczyn skalarny siły i przemieszczenia oraz kąt między siłami"
        >
          <title>Praca i kąt między siłami z iloczynu skalarnego</title>
          <desc>Wózek, przemieszczenie 12 m, siła 40 N pod kątem 60 stopni, siła pionowa 30 N i kąt 30 stopni.</desc>
          <defs>
            <marker id="ex-dot-f" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0 0L10 5L0 10Z" fill={FORCE} />
            </marker>
            <marker id="ex-dot-g" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0 0L10 5L0 10Z" fill={VERTICAL} />
            </marker>
            <marker id="ex-dot-s" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0 0L10 5L0 10Z" fill={RESULT} />
            </marker>
            <marker id="ex-dot-u" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
              <path d="M0 0L10 5L0 10Z" fill={RESULT} />
            </marker>
          </defs>

          <line x1="45" y1="300" x2="410" y2="300" stroke={EDGE} strokeWidth="2" />
          <line x1="70" y1={P.y} x2="410" y2={P.y} stroke={AXIS} strokeWidth="1.2" strokeDasharray="4 4" />
          <line x1={P.x} y1="160" x2={P.x} y2="292" stroke={AXIS} strokeWidth="1.2" strokeDasharray="4 4" />
          <text x="402" y={P.y - 7} fontSize="11" fill={INK}>
            x
          </text>
          <text x={P.x + 7} y="170" fontSize="11" fill={INK}>
            y
          </text>

          <g>
            <rect x="78" y="258" width="64" height="28" rx="4" fill={CART} stroke={EDGE} strokeWidth="1.6" />
            <circle cx="94" cy="292" r="7" fill={EDGE} />
            <circle cx="128" cy="292" r="7" fill={EDGE} />
            <circle cx={P.x} cy="258" r="3" fill={INK} />
          </g>

          <motion.g initial={false} animate={{ opacity: forceFade }} transition={{ duration: 0.3 }}>
            <line
              x1={P.x}
              y1={P.y}
              x2={fEnd.x}
              y2={fEnd.y}
              stroke={FORCE}
              strokeWidth="3.4"
              markerEnd="url(#ex-dot-f)"
            />
            <text x={fEnd.x + 7} y={fEnd.y + 4} fontSize="11" fill={FORCE}>
              F = 40 N
            </text>
          </motion.g>

          <motion.g initial={false} animate={{ opacity: index >= 3 ? 1 : 0.85 }}>
            <line
              x1={P.x}
              y1={P.y}
              x2={gEnd.x}
              y2={gEnd.y}
              stroke={VERTICAL}
              strokeWidth="3.4"
              markerEnd="url(#ex-dot-g)"
            />
            <text x={gEnd.x - 7} y={gEnd.y + 4} textAnchor="end" fontSize="11" fill={VERTICAL}>
              G = 30 N
            </text>
          </motion.g>

          <line x1={sStart.x} y1={sStart.y} x2={sEnd.x} y2={sEnd.y} stroke={MUTED} strokeWidth="1.4" />
          <motion.line
            x1={sStart.x}
            y1={sStart.y}
            x2={sEnd.x}
            y2={sEnd.y}
            stroke={RESULT}
            strokeWidth="7"
            strokeLinecap="round"
            initial={false}
            animate={{ opacity: workGlow }}
          />
          <line
            x1={sStart.x}
            y1={sStart.y}
            x2={sEnd.x}
            y2={sEnd.y}
            stroke={RESULT}
            strokeWidth="2.4"
            markerEnd="url(#ex-dot-s)"
          />
          <line
            x1={sStart.x}
            y1={sStart.y}
            x2={sStart.x}
            y2="302"
            stroke={MUTED}
            strokeWidth="1"
            strokeDasharray="3 3"
          />
          <text x={(sStart.x + sEnd.x) / 2} y={sStart.y - 8} textAnchor="middle" fontSize="11" fill={RESULT}>
            s = 12 m
          </text>

          {showProjection && (
            <g stroke={MUTED} strokeWidth="1.4" strokeDasharray="5 4" fill="none">
              <line x1={P.x} y1={P.y} x2={fEnd.x} y2={P.y} />
              <line x1={fEnd.x} y1={P.y} x2={fEnd.x} y2={fEnd.y} />
              <text x={fEnd.x + 6} y={P.y - 8} fontSize="10" fill={MUTED} stroke="none">
                Fx = 20 N
              </text>
            </g>
          )}

          {showAngle60 && (
            <g fill="none" stroke={MUTED} strokeWidth="1.6">
              <path
                d={`M ${arcPoint(46, 0).x} ${arcPoint(46, 0).y} A 46 46 0 0 0 ${arcPoint(46, 60).x} ${arcPoint(46, 60).y}`}
              />
              <text x={arcPoint(52, 27).x} y={arcPoint(52, 27).y} fontSize="10" fill={MUTED} stroke="none">
                60°
              </text>
            </g>
          )}

          {showPerpendicular && (
            <g stroke={VERTICAL} fill="none" strokeWidth="1.5">
              <path d={`M ${P.x} ${P.y - 12} L ${P.x + 12} ${P.y - 12} L ${P.x + 12} ${P.y}`} />
              <text x={P.x + 16} y={P.y - 18} fontSize="10" fill={VERTICAL} stroke="none">
                90°
              </text>
            </g>
          )}

          {showAngle30 && (
            <g fill="none" stroke={RESULT} strokeWidth="1.8">
              <motion.path
                d={`M ${arcPoint(58, 60).x} ${arcPoint(58, 60).y} A 58 58 0 0 0 ${arcPoint(58, 60 + 30).x} ${arcPoint(58, 60 + 30).y}`}
                initial={false}
                animate={{ pathLength: angleSweep, opacity: angleSweep > 0 ? 1 : 0 }}
                transition={{ duration: 0.4 }}
              />
              <text x={arcPoint(70, 76).x} y={arcPoint(70, 76).y} fontSize="11" fill={RESULT} stroke="none">
                30°
              </text>
            </g>
          )}

          {index >= 5 && (
            <g>
              <path
                d={`M ${arcPoint(74, 60).x} ${arcPoint(74, 60).y} A 74 74 0 0 0 ${arcPoint(74, 90).x} ${arcPoint(74, 90).y}`}
                fill="none"
                stroke={RESULT}
                strokeWidth="2.6"
              />
              <text x={arcPoint(92, 76).x} y={arcPoint(92, 76).y} fontSize="10" fill={RESULT}>
                cos φ = 0,866
              </text>
            </g>
          )}

          <text x="230" y="344" textAnchor="middle" fontSize="12" fill={INK}>
            {summary}
          </text>
        </svg>
      </div>
    </div>
  )
}
