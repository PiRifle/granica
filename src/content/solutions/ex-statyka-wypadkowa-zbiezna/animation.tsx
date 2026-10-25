import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const FORCE_1 = '#ff6b45'
const FORCE_2 = '#4f6df5'
const FORCE_3 = '#a970dd'
const RESULT = '#27835a'
const AXIS = '#9aa5b1'
const MUTED = '#87929d'
const INK = '#17202a'

const origin = { x: 112, y: 238 }
const scale = 11
const f1 = { x: 8 * Math.cos((60 * Math.PI) / 180), y: 8 * Math.sin((60 * Math.PI) / 180) }
const f2 = { x: 6, y: 0 }
const f3 = { x: 5 * Math.cos((-30 * Math.PI) / 180), y: 5 * Math.sin((-30 * Math.PI) / 180) }
const resultant = { x: f1.x + f2.x + f3.x, y: f1.y + f2.y + f3.y }
const point = (vector: { x: number; y: number }) => ({
  x: origin.x + vector.x * scale,
  y: origin.y - vector.y * scale,
})
const f1End = point(f1)
const f2End = point(f2)
const f3End = point(f3)
const resultEnd = point(resultant)
const polygon1 = f1End
const polygon2 = point({ x: f1.x + f2.x, y: f1.y + f2.y })
const sumX = point({ x: resultant.x, y: 0 })
const sumY = point({ x: 0, y: resultant.y })

export function ResultantAnimation({ index, playing, sceneProgress }: SolutionAnimationProps) {
  const grow = playing ? Math.min(1, 0.18 + sceneProgress * 1.6) : 1
  const reveal = index === 0 ? grow : 1
  const showF1Components = index >= 1
  const showOtherComponents = index >= 2
  const showSum = index >= 3
  const showResult = index >= 4
  const showPolygon = index >= 5
  const baseOpacity = showPolygon ? 0.22 : 1

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg viewBox="0 0 460 350" role="img" aria-label="Wypadkowa trzech sił zbieżnych">
          <title>Wypadkowa trzech sił zbieżnych</title>
          <desc>Trzy siły zaczepione w punkcie O, ich składowe, suma rzutów, wypadkowa i wielobok sił.</desc>
          <defs>
            <marker id="ex-wyp-f1" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0 0L10 5L0 10Z" fill={FORCE_1} />
            </marker>
            <marker id="ex-wyp-f2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0 0L10 5L0 10Z" fill={FORCE_2} />
            </marker>
            <marker id="ex-wyp-f3" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0 0L10 5L0 10Z" fill={FORCE_3} />
            </marker>
            <marker id="ex-wyp-r" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
              <path d="M0 0L10 5L0 10Z" fill={RESULT} />
            </marker>
          </defs>

          <line x1="34" y1={origin.y} x2="430" y2={origin.y} stroke={AXIS} strokeWidth="1.4" />
          <line x1={origin.x} y1="24" x2={origin.x} y2="318" stroke={AXIS} strokeWidth="1.4" />
          <text x="416" y={origin.y - 8} fontSize="12" fill={INK}>
            x
          </text>
          <text x={origin.x + 8} y="38" fontSize="12" fill={INK}>
            y
          </text>
          <text x={origin.x - 16} y={origin.y + 18} fontSize="12" fill={INK}>
            O
          </text>

          {showF1Components && (
            <g stroke={MUTED} strokeWidth="1.4" strokeDasharray="5 4" fill="none">
              <line x1={origin.x} y1={origin.y} x2={f1End.x} y2={origin.y} />
              <line x1={f1End.x} y1={origin.y} x2={f1End.x} y2={f1End.y} />
              <line x1={origin.x} y1={origin.y} x2={origin.x} y2={f1End.y} opacity="0.55" />
            </g>
          )}
          {showF1Components && (
            <g fontSize="10.5" fill={MUTED}>
              <text x={(origin.x + f1End.x) / 2} y={origin.y + 15} textAnchor="middle">
                F₁x = 4,00
              </text>
              <text x={f1End.x + 6} y={(origin.y + f1End.y) / 2}>
                F₁y = 6,93
              </text>
            </g>
          )}

          {showOtherComponents && (
            <g stroke={MUTED} strokeWidth="1.3" strokeDasharray="4 4" fill="none">
              <line x1={origin.x} y1={origin.y} x2={f3End.x} y2={origin.y} />
              <line x1={f3End.x} y1={origin.y} x2={f3End.x} y2={f3End.y} />
            </g>
          )}
          {showOtherComponents && (
            <text x={f3End.x + 6} y={origin.y + 14} fontSize="10.5" fill={MUTED}>
              F₃x = 4,33
            </text>
          )}

          <motion.line
            x1={origin.x}
            y1={origin.y}
            x2={origin.x + (f1End.x - origin.x) * reveal}
            y2={origin.y + (f1End.y - origin.y) * reveal}
            stroke={FORCE_1}
            strokeWidth="4"
            markerEnd="url(#ex-wyp-f1)"
            opacity={baseOpacity}
          />
          <text x={f1End.x + 6} y={f1End.y - 8} fontSize="12" fill={FORCE_1} opacity={baseOpacity}>
            F₁ = 8 kN
          </text>

          <motion.line
            x1={origin.x}
            y1={origin.y}
            x2={origin.x + (f2End.x - origin.x) * reveal}
            y2={origin.y + (f2End.y - origin.y) * reveal}
            stroke={FORCE_2}
            strokeWidth="4"
            markerEnd="url(#ex-wyp-f2)"
            opacity={baseOpacity}
          />
          <text x={f2End.x - 4} y={f2End.y + 18} textAnchor="middle" fontSize="12" fill={FORCE_2} opacity={baseOpacity}>
            F₂ = 6 kN
          </text>

          <motion.line
            x1={origin.x}
            y1={origin.y}
            x2={origin.x + (f3End.x - origin.x) * reveal}
            y2={origin.y + (f3End.y - origin.y) * reveal}
            stroke={FORCE_3}
            strokeWidth="4"
            markerEnd="url(#ex-wyp-f3)"
            opacity={baseOpacity}
          />
          <text x={f3End.x + 8} y={f3End.y + 14} fontSize="12" fill={FORCE_3} opacity={baseOpacity}>
            F₃ = 5 kN
          </text>

          {showSum && (
            <g stroke={RESULT} strokeWidth="1.7" fill="none" opacity="0.7">
              <line x1={origin.x} y1={origin.y} x2={sumX.x} y2={sumX.y} strokeDasharray="6 4" />
              <line x1={sumX.x} y1={origin.y} x2={sumX.x} y2={sumY.y} strokeDasharray="6 4" />
              <line x1={origin.x} y1={origin.y} x2={origin.x} y2={sumY.y} strokeDasharray="6 4" />
            </g>
          )}
          {showSum && (
            <g fontSize="10.5" fill={RESULT}>
              <text x={sumX.x - 8} y={origin.y + 17} textAnchor="end">
                Wx = 14,33
              </text>
              <text x={origin.x + 6} y={sumY.y - 5}>
                Wy = 4,43
              </text>
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
                markerEnd="url(#ex-wyp-r)"
                initial={false}
                animate={{ opacity: showResult ? 1 : 0 }}
              />
              <text x={resultEnd.x + 8} y={resultEnd.y - 2} fontSize="13" fill={RESULT}>
                W = 15,0 kN
              </text>
              <path
                d={`M ${origin.x + 46} ${origin.y} A 46 46 0 0 0 ${origin.x + 46 * Math.cos((17.2 * Math.PI) / 180)} ${origin.y - 46 * Math.sin((17.2 * Math.PI) / 180)}`}
                fill="none"
                stroke={RESULT}
                strokeWidth="1.8"
              />
              <text x={origin.x + 52} y={origin.y - 14} fontSize="10.5" fill={RESULT}>
                17,2°
              </text>
            </>
          )}

          {showPolygon && (
            <g>
              <motion.line
                x1={origin.x}
                y1={origin.y}
                x2={polygon1.x}
                y2={polygon1.y}
                stroke={FORCE_1}
                strokeWidth="4"
                markerEnd="url(#ex-wyp-f1)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />
              <motion.line
                x1={polygon1.x}
                y1={polygon1.y}
                x2={polygon2.x}
                y2={polygon2.y}
                stroke={FORCE_2}
                strokeWidth="4"
                markerEnd="url(#ex-wyp-f2)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />
              <motion.line
                x1={polygon2.x}
                y1={polygon2.y}
                x2={resultEnd.x}
                y2={resultEnd.y}
                stroke={FORCE_3}
                strokeWidth="4"
                markerEnd="url(#ex-wyp-f3)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />
              <circle cx={resultEnd.x} cy={resultEnd.y} r="4" fill={RESULT} />
              <text x={polygon1.x - 16} y={polygon1.y - 8} fontSize="11" fill={FORCE_1}>
                F₁
              </text>
              <text x={polygon2.x + 6} y={polygon2.y - 8} fontSize="11" fill={FORCE_2}>
                F₂
              </text>
              <text x={resultEnd.x - 18} y={resultEnd.y + 16} fontSize="11" fill={FORCE_3}>
                F₃
              </text>
              <text x="230" y="340" textAnchor="middle" fontSize="12" fill={RESULT}>
                Koniec wieloboku = koniec wypadkowej
              </text>
            </g>
          )}

          {!showPolygon && (
            <text x="230" y="340" textAnchor="middle" fontSize="12" fill={INK}>
              {showResult ? 'W = F₁ + F₂ + F₃ — suma wektorowa' : 'Rzutujemy każdą siłę na osie x i y'}
            </text>
          )}
        </svg>
      </div>
    </div>
  )
}
