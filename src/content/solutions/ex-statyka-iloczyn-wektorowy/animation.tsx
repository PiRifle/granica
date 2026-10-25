import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const FORCE_1 = '#ff6b45'
const FORCE_2 = '#4f6df5'
const RESULT = '#27835a'
const MUTED = '#87929d'
const AXIS = '#9aa5b1'
const INK = '#17202a'
const NEGATIVE = '#c64632'

const O = { x: 80, y: 285 }
const scale = 32
const f1 = { x: 3, y: 4 }
const f2 = { x: 4, y: 3 }
const total = { x: f1.x + f2.x, y: f1.y + f2.y }
const point = (vector: { x: number; y: number }) => ({
  x: O.x + vector.x * scale,
  y: O.y - vector.y * scale,
})
const f1End = point(f1)
const f2End = point(f2)
const totalEnd = point(total)
const center = {
  x: (O.x + f1End.x + totalEnd.x + f2End.x) / 4,
  y: (O.y + f1End.y + totalEnd.y + f2End.y) / 4,
}

const clamp01 = (value: number) => Math.max(0, Math.min(1, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}
const arcPoint = (radius: number, degrees: number) => ({
  x: O.x + radius * Math.cos((degrees * Math.PI) / 180),
  y: O.y - radius * Math.sin((degrees * Math.PI) / 180),
})

const captions = [
  'Dwie siły w płaszczyźnie xy',
  'Wyznacznik: niezerowa tylko składowa k',
  'F₁×F₂ = −7k — wektor pod płytę',
  'Pole równoległoboku = 7 kN²',
  'Kąt z sinusa: φ ≈ 16,26°',
  'F₂×F₁ = +7k — kolejność zmienia zwrot',
]

export function CrossProductAnimation({ index, playing, sceneProgress }: SolutionAnimationProps) {
  const showComponents = index >= 1
  const showResult = index >= 2
  const showArea = index >= 3
  const showAngle = index >= 4
  const showOrder = index >= 5
  const symbolProgress = showResult ? (playing && index === 2 ? smooth(sceneProgress) : 1) : 0
  const areaProgress = showArea ? (playing && index === 3 ? 0.25 + 0.75 * smooth(sceneProgress) : 1) : 0
  const summary = captions[Math.min(index, captions.length - 1)]

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg viewBox="0 0 460 340" role="img" aria-label="Iloczyn wektorowy dwóch sił i pole równoległoboku">
          <title>Iloczyn wektorowy dwóch sił na płycie</title>
          <desc>
            Siły 3-4-0 i 4-3-0 kN, ich iloczyn wektorowy minus 7k, pole 7 kN kwadratowych i kąt 16,26 stopnia.
          </desc>
          <defs>
            <marker
              id="ex-cross-f1"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={FORCE_1} />
            </marker>
            <marker
              id="ex-cross-f2"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={FORCE_2} />
            </marker>
          </defs>

          <rect x="46" y="40" width="382" height="234" rx="6" fill="#f7f8fa" stroke="#e1e6ee" />
          <text x="56" y="56" fontSize="9" fill={MUTED}>
            PŁASZCZYZNA xy PŁYTY
          </text>
          <line x1="50" y1={O.y} x2="414" y2={O.y} stroke={AXIS} strokeWidth="1.4" />
          <line x1={O.x} y1="46" x2={O.x} y2="302" stroke={AXIS} strokeWidth="1.4" />
          <text x="402" y={O.y - 7} fontSize="11" fill={INK}>
            x
          </text>
          <text x={O.x + 7} y="58" fontSize="11" fill={INK}>
            y
          </text>
          <text x={O.x - 15} y={O.y + 17} fontSize="11" fill={INK}>
            O
          </text>

          {showComponents && (
            <g stroke={MUTED} strokeWidth="1.3" strokeDasharray="5 4" fill="none" opacity="0.8">
              <line x1={O.x} y1={O.y} x2={f1End.x} y2={O.y} />
              <line x1={f1End.x} y1={O.y} x2={f1End.x} y2={f1End.y} />
              <line x1={O.x} y1={O.y} x2={f2End.x} y2={O.y} />
              <line x1={f2End.x} y1={O.y} x2={f2End.x} y2={f2End.y} />
              <text x={(O.x + f1End.x) / 2} y={O.y + 14} textAnchor="middle" fontSize="9" fill={MUTED} stroke="none">
                3
              </text>
              <text x={f1End.x + 5} y={(O.y + f1End.y) / 2} fontSize="9" fill={MUTED} stroke="none">
                4
              </text>
              <text x={(O.x + f2End.x) / 2} y={O.y + 27} textAnchor="middle" fontSize="9" fill={MUTED} stroke="none">
                4
              </text>
              <text x={f2End.x + 5} y={(O.y + f2End.y) / 2 + 12} fontSize="9" fill={MUTED} stroke="none">
                3
              </text>
            </g>
          )}

          {showArea && (
            <motion.path
              d={`M ${O.x} ${O.y} L ${f1End.x} ${f1End.y} L ${totalEnd.x} ${totalEnd.y} L ${f2End.x} ${f2End.y} Z`}
              fill={RESULT}
              stroke={RESULT}
              strokeWidth="1.4"
              initial={false}
              animate={{ fillOpacity: 0.16 * areaProgress, opacity: areaProgress }}
            />
          )}

          <line
            x1={O.x}
            y1={O.y}
            x2={f1End.x}
            y2={f1End.y}
            stroke={FORCE_1}
            strokeWidth="3.8"
            markerEnd="url(#ex-cross-f1)"
          />
          <text x={f1End.x - 6} y={f1End.y - 8} textAnchor="end" fontSize="11" fill={FORCE_1}>
            F₁ = (3, 4, 0)
          </text>

          <line
            x1={O.x}
            y1={O.y}
            x2={f2End.x}
            y2={f2End.y}
            stroke={FORCE_2}
            strokeWidth="3.8"
            markerEnd="url(#ex-cross-f2)"
          />
          <text x={f2End.x + 7} y={f2End.y + 5} fontSize="11" fill={FORCE_2}>
            F₂ = (4, 3, 0)
          </text>

          {showAngle && (
            <g fill="none" stroke={RESULT} strokeWidth="1.7">
              <path
                d={`M ${arcPoint(100, 53.13).x} ${arcPoint(100, 53.13).y} A 100 100 0 0 1 ${arcPoint(100, 36.87).x} ${arcPoint(100, 36.87).y}`}
              />
              <text x={arcPoint(112, 45).x} y={arcPoint(112, 45).y} fontSize="10" fill={RESULT} stroke="none">
                16,26°
              </text>
            </g>
          )}

          {showResult && (
            <motion.g
              initial={false}
              animate={{ opacity: symbolProgress, scale: 0.7 + 0.3 * symbolProgress }}
              style={{ transformOrigin: `${center.x}px ${center.y}px` }}
            >
              <circle
                cx={center.x}
                cy={center.y}
                r="18"
                fill="#ffffff"
                stroke={showOrder ? RESULT : NEGATIVE}
                strokeWidth="1.8"
              />
              {!showOrder ? (
                <g stroke={NEGATIVE} strokeWidth="2">
                  <line x1={center.x - 9} y1={center.y - 9} x2={center.x + 9} y2={center.y + 9} />
                  <line x1={center.x + 9} y1={center.y - 9} x2={center.x - 9} y2={center.y + 9} />
                </g>
              ) : (
                <circle cx={center.x} cy={center.y} r="4.5" fill={RESULT} />
              )}
              <text x={center.x + 24} y={center.y - 14} fontSize="12" fill={showOrder ? RESULT : NEGATIVE}>
                {showOrder ? 'F₂×F₁ = +7k' : 'F₁×F₂ = −7k'}
              </text>
            </motion.g>
          )}

          {showArea && (
            <g>
              <text x={totalEnd.x - 34} y={totalEnd.y - 8} fontSize="11" fill={RESULT}>
                pole = 7 kN²
              </text>
              <line
                x1={f1End.x}
                y1={f1End.y}
                x2={totalEnd.x}
                y2={totalEnd.y}
                stroke={FORCE_2}
                strokeWidth="1.6"
                strokeDasharray="5 4"
                opacity="0.7"
              />
              <line
                x1={f2End.x}
                y1={f2End.y}
                x2={totalEnd.x}
                y2={totalEnd.y}
                stroke={FORCE_1}
                strokeWidth="1.6"
                strokeDasharray="5 4"
                opacity="0.7"
              />
            </g>
          )}

          <text x="230" y="332" textAnchor="middle" fontSize="12" fill={INK}>
            {summary}
          </text>
        </svg>
      </div>
    </div>
  )
}
