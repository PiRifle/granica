import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const FORCE_1 = '#ff6b45'
const FORCE_2 = '#4f6df5'
const RESULT = '#27835a'
const AXIS = '#9aa5b1'
const MUTED = '#87929d'
const INK = '#17202a'

const origin = { x: 112, y: 252 }
const scale = 4.6
const f1 = { x: 30 * Math.cos((25 * Math.PI) / 180), y: 30 * Math.sin((25 * Math.PI) / 180) }
const f2 = { x: 20 * Math.cos((120 * Math.PI) / 180), y: 20 * Math.sin((120 * Math.PI) / 180) }
const resultant = { x: f1.x + f2.x, y: f1.y + f2.y }
const point = (vector: { x: number; y: number }) => ({
  x: origin.x + vector.x * scale,
  y: origin.y - vector.y * scale,
})
const f1End = point(f1)
const f2End = point(f2)
const resultEnd = point(resultant)
const sumEnd = point({ x: f1.x + f2.x, y: 0 })
const sumY = point({ x: 0, y: f1.y + f2.y })

export function VectorAdditionAnimation({ index, playing, sceneProgress }: SolutionAnimationProps) {
  const showComponents = index >= 1
  const showSecond = index >= 2
  const showSum = index >= 3
  const showResult = index >= 4
  const showCheck = index >= 5
  const reveal = showResult ? (playing ? Math.min(1, 0.35 + sceneProgress * 2) : 1) : 0

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg viewBox="0 0 460 340" role="img" aria-label="Składanie dwóch sił i wyznaczanie wypadkowej">
          <title>Składanie dwóch sił</title>
          <desc>Dwie siły zaczepione w początku układu, ich składowe, suma i wypadkowa.</desc>
          <defs>
            <marker
              id="vec-add-f1"
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
              id="vec-add-f2"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={FORCE_2} />
            </marker>
            <marker id="vec-add-r" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
              <path d="M0 0L10 5L0 10Z" fill={RESULT} />
            </marker>
          </defs>

          <line x1="42" y1={origin.y} x2="420" y2={origin.y} stroke={AXIS} strokeWidth="1.5" />
          <line x1={origin.x} y1="28" x2={origin.x} y2="318" stroke={AXIS} strokeWidth="1.5" />
          <text x="410" y={origin.y - 8} fontSize="12" fill={INK}>
            x
          </text>
          <text x={origin.x + 8} y="42" fontSize="12" fill={INK}>
            y
          </text>
          <text x={origin.x - 14} y={origin.y + 18} fontSize="12" fill={INK}>
            O
          </text>

          {showComponents && (
            <g stroke={MUTED} strokeWidth="1.4" strokeDasharray="5 4" fill="none">
              <line x1={origin.x} y1={origin.y} x2={f1End.x} y2={origin.y} />
              <line x1={f1End.x} y1={origin.y} x2={f1End.x} y2={f1End.y} />
              <line x1={origin.x} y1={origin.y} x2={origin.x} y2={f1End.y} opacity="0.5" />
            </g>
          )}
          {showSecond && (
            <g stroke={MUTED} strokeWidth="1.4" strokeDasharray="5 4" fill="none">
              <line x1={origin.x} y1={origin.y} x2={f2End.x} y2={origin.y} />
              <line x1={f2End.x} y1={origin.y} x2={f2End.x} y2={f2End.y} />
            </g>
          )}

          <motion.line
            x1={origin.x}
            y1={origin.y}
            x2={f1End.x}
            y2={f1End.y}
            stroke={FORCE_1}
            strokeWidth="4"
            markerEnd="url(#vec-add-f1)"
            initial={false}
            animate={{ x2: f1End.x, y2: f1End.y }}
          />
          <text x={f1End.x + 7} y={f1End.y - 6} fontSize="12" fill={FORCE_1}>
            F₁ = 30 kN
          </text>

          {showSecond && (
            <>
              <motion.line
                x1={origin.x}
                y1={origin.y}
                x2={f2End.x}
                y2={f2End.y}
                stroke={FORCE_2}
                strokeWidth="4"
                markerEnd="url(#vec-add-f2)"
                initial={false}
                animate={{ x2: f2End.x, y2: f2End.y }}
              />
              <text x={f2End.x - 6} y={f2End.y - 8} textAnchor="end" fontSize="12" fill={FORCE_2}>
                F₂ = 20 kN
              </text>
            </>
          )}

          {showSum && (
            <g>
              <line
                x1={sumEnd.x}
                y1={sumEnd.y}
                x2={sumEnd.x}
                y2={sumY.y}
                stroke={MUTED}
                strokeWidth="2"
                strokeDasharray="4 4"
              />
              <text x={sumEnd.x + 6} y={sumEnd.y + 16} fontSize="11" fill={MUTED}>
                Rx = 17,19 kN
              </text>
              <text x={sumY.x + 6} y={sumY.y} fontSize="11" fill={MUTED}>
                Ry = 30,00 kN
              </text>
            </g>
          )}

          {showCheck && (
            <g fill="none" stroke={RESULT} strokeWidth="1.5" strokeDasharray="6 5" opacity="0.45">
              <line x1={f1End.x} y1={f1End.y} x2={resultEnd.x} y2={resultEnd.y} />
              <line x1={f2End.x} y1={f2End.y} x2={resultEnd.x} y2={resultEnd.y} />
            </g>
          )}

          {showResult && (
            <>
              <motion.line
                x1={origin.x}
                y1={origin.y}
                x2={resultEnd.x}
                y2={resultEnd.y}
                stroke={RESULT}
                strokeWidth="4.5"
                markerEnd="url(#vec-add-r)"
                initial={false}
                animate={{ opacity: reveal, x2: resultEnd.x, y2: resultEnd.y }}
              />
              <text x={resultEnd.x + 8} y={resultEnd.y + 4} fontSize="13" fill={RESULT}>
                R = 34,60 kN
              </text>
              <path
                d={`M ${origin.x + 34} ${origin.y} A 34 34 0 0 0 ${origin.x + 34 * Math.cos((60.2 * Math.PI) / 180)} ${origin.y - 34 * Math.sin((60.2 * Math.PI) / 180)}`}
                fill="none"
                stroke={RESULT}
                strokeWidth="1.8"
              />
              <text x={origin.x + 44} y={origin.y - 16} fontSize="11" fill={RESULT}>
                60,2°
              </text>
            </>
          )}

          <text x="230" y="330" textAnchor="middle" fontSize="12" fill={INK}>
            {showResult ? 'R = F₁ + F₂ — przekątna równoległoboku' : 'Składowe dodajemy oddzielnie dla x i y'}
          </text>
        </svg>
      </div>
    </div>
  )
}
