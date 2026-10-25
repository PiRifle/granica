import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const FORCE_1 = '#ff6b45'
const FORCE_2 = '#4f6df5'
const RESULT = '#27835a'
const AXIS = '#9aa5b1'
const MUTED = '#87929d'
const INK = '#17202a'

const origin = { x: 140, y: 238 }
const scale = 4.6
const f1 = { x: 24, y: 18 }
const f2 = { x: -20, y: -15 }
const resultant = { x: f1.x + f2.x, y: f1.y + f2.y }
const point = (vector: { x: number; y: number }) => ({
  x: origin.x + vector.x * scale,
  y: origin.y - vector.y * scale,
})
const f1End = point(f1)
const f2End = point(f2)
const resultEnd = point(resultant)
const sumXEnd = point({ x: resultant.x, y: 0 })
const sumYEnd = point({ x: 0, y: resultant.y })

const insetOrigin = { x: 324, y: 132 }
const insetScale = 13
const insetRxEnd = { x: insetOrigin.x + resultant.x * insetScale, y: insetOrigin.y }
const insetRyEnd = { x: insetOrigin.x, y: insetOrigin.y - resultant.y * insetScale }
const insetEnd = {
  x: insetOrigin.x + resultant.x * insetScale,
  y: insetOrigin.y - resultant.y * insetScale,
}

const clamp01 = (value: number) => Math.max(0, Math.min(1, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}

const captions = [
  'Dwie siły wzdłuż tej samej prostej, o przeciwnych zwrotach',
  'Rzut F₁ na osie: 24 kN i 18 kN',
  'Rzut F₂: 20 kN w lewo i 15 kN w dół',
  'Suma rzutów: Rx = 4 kN, Ry = 3 kN',
  'Wypadkowa R = 5 kN pod kątem 36,87°',
  'Kontrola: F₂ na końcu F₁ domyka wielobok',
]

export function ProjectionAdditionAnimation({ index, playing, sceneProgress }: SolutionAnimationProps) {
  const showF1Components = index >= 1
  const showF2Components = index >= 2
  const showSum = index >= 3
  const showResult = index >= 4
  const showCheck = index >= 5
  const growth = showResult ? (playing && index < 5 ? 0.45 + 0.55 * smooth(sceneProgress) : 1) : 0
  const resultTip = {
    x: origin.x + (resultEnd.x - origin.x) * growth,
    y: origin.y + (resultEnd.y - origin.y) * growth,
  }
  const fadeForces = index >= 3 ? 0.42 : 1
  const summary = captions[Math.min(index, captions.length - 1)]

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg viewBox="0 0 460 340" role="img" aria-label="Rzutowanie dwóch sił na osie i wyznaczanie wypadkowej">
          <title>Dodawanie sił przez rzuty na osie</title>
          <desc>Dwie siły 30 kN i 25 kN wzdłuż kierunku 3-4-5, ich rzuty, suma rzutów i wypadkowa 5 kN.</desc>
          <defs>
            <marker
              id="ex-dod-rzut-f1"
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
              id="ex-dod-rzut-f2"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={FORCE_2} />
            </marker>
            <marker
              id="ex-dod-rzut-r"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={RESULT} />
            </marker>
            <marker
              id="ex-dod-rzut-muted"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={MUTED} />
            </marker>
          </defs>

          <line x1="42" y1={origin.y} x2="426" y2={origin.y} stroke={AXIS} strokeWidth="1.4" />
          <line x1={origin.x} y1="34" x2={origin.x} y2="326" stroke={AXIS} strokeWidth="1.4" />
          <text x="414" y={origin.y - 7} fontSize="12" fill={INK}>
            x
          </text>
          <text x={origin.x + 7} y="46" fontSize="12" fill={INK}>
            y
          </text>
          <text x={origin.x - 16} y={origin.y + 18} fontSize="12" fill={INK}>
            O
          </text>

          <motion.g initial={false} animate={{ opacity: fadeForces }} transition={{ duration: 0.3 }}>
            <line
              x1={origin.x}
              y1={origin.y}
              x2={f1End.x}
              y2={f1End.y}
              stroke={FORCE_1}
              strokeWidth="4"
              markerEnd="url(#ex-dod-rzut-f1)"
            />
            <text x={f1End.x - 6} y={f1End.y - 8} textAnchor="end" fontSize="12" fill={FORCE_1}>
              F₁ = 30 kN
            </text>
            <line
              x1={origin.x}
              y1={origin.y}
              x2={f2End.x}
              y2={f2End.y}
              stroke={FORCE_2}
              strokeWidth="4"
              markerEnd="url(#ex-dod-rzut-f2)"
            />
            <text x={f2End.x + 9} y={f2End.y - 10} fontSize="12" fill={FORCE_2}>
              F₂ = 25 kN
            </text>
          </motion.g>

          {showF1Components && (
            <motion.g
              initial={false}
              animate={{ opacity: index >= 3 ? 0.5 : 1 }}
              stroke={MUTED}
              strokeWidth="1.4"
              strokeDasharray="5 4"
              fill="none"
            >
              <line x1={origin.x} y1={origin.y} x2={f1End.x} y2={origin.y} />
              <line x1={f1End.x} y1={origin.y} x2={f1End.x} y2={f1End.y} />
              <text
                x={(origin.x + f1End.x) / 2}
                y={origin.y + 15}
                textAnchor="middle"
                fontSize="10"
                fill={MUTED}
                stroke="none"
              >
                24 kN
              </text>
              <text x={f1End.x + 6} y={(origin.y + f1End.y) / 2} fontSize="10" fill={MUTED} stroke="none">
                18 kN
              </text>
            </motion.g>
          )}

          {showF2Components && (
            <motion.g
              initial={false}
              animate={{ opacity: index >= 3 ? 0.5 : 1 }}
              stroke={MUTED}
              strokeWidth="1.4"
              strokeDasharray="5 4"
              fill="none"
            >
              <line x1={origin.x} y1={origin.y} x2={f2End.x} y2={origin.y} />
              <line x1={f2End.x} y1={origin.y} x2={f2End.x} y2={f2End.y} />
              <text
                x={(origin.x + f2End.x) / 2}
                y={origin.y + 15}
                textAnchor="middle"
                fontSize="10"
                fill={MUTED}
                stroke="none"
              >
                20 kN
              </text>
              <text x={f2End.x + 6} y={(origin.y + f2End.y) / 2} fontSize="10" fill={MUTED} stroke="none">
                15 kN
              </text>
            </motion.g>
          )}

          {showSum && (
            <g>
              <line
                x1={sumXEnd.x}
                y1={sumXEnd.y}
                x2={sumYEnd.x}
                y2={sumYEnd.y}
                stroke={RESULT}
                strokeWidth="2"
                strokeDasharray="5 4"
                opacity="0.7"
              />
              <line
                x1={origin.x}
                y1={origin.y}
                x2={sumXEnd.x}
                y2={sumXEnd.y}
                stroke={RESULT}
                strokeWidth="2.4"
                markerEnd="url(#ex-dod-rzut-muted)"
              />
              <line
                x1={origin.x}
                y1={origin.y}
                x2={sumYEnd.x}
                y2={sumYEnd.y}
                stroke={RESULT}
                strokeWidth="2.4"
                markerEnd="url(#ex-dod-rzut-muted)"
              />
              {showResult && (
                <>
                  <motion.line
                    x1={origin.x}
                    y1={origin.y}
                    x2={resultTip.x}
                    y2={resultTip.y}
                    stroke={RESULT}
                    strokeWidth="4.6"
                    markerEnd="url(#ex-dod-rzut-r)"
                    initial={false}
                    animate={{ x2: resultTip.x, y2: resultTip.y }}
                    transition={{ duration: 0.2 }}
                  />
                  <text x={resultEnd.x + 8} y={resultEnd.y + 12} fontSize="12" fill={RESULT}>
                    R = 5 kN
                  </text>
                  <path
                    d={`M ${origin.x + 34} ${origin.y} A 34 34 0 0 0 ${origin.x + 34 * Math.cos((36.87 * Math.PI) / 180)} ${origin.y - 34 * Math.sin((36.87 * Math.PI) / 180)}`}
                    fill="none"
                    stroke={RESULT}
                    strokeWidth="1.8"
                  />
                  <text x={origin.x + 42} y={origin.y - 12} fontSize="10" fill={RESULT}>
                    36,87°
                  </text>
                </>
              )}
            </g>
          )}

          {showCheck && (
            <g>
              <line
                x1={f1End.x}
                y1={f1End.y}
                x2={resultEnd.x}
                y2={resultEnd.y}
                stroke={FORCE_2}
                strokeWidth="3"
                strokeDasharray="7 4"
                markerEnd="url(#ex-dod-rzut-f2)"
                opacity="0.85"
              />
              <text x={f1End.x + 6} y={f1End.y + 16} fontSize="10" fill={FORCE_2}>
                F₂ przesunięta
              </text>
              <text x={origin.x + 48} y={origin.y - 42} fontSize="10" fill={MUTED}>
                kąt 180°
              </text>
            </g>
          )}

          {showSum && (
            <g>
              <rect x="304" y="48" width="132" height="108" rx="8" fill="#f7f8fa" stroke="#d7dde5" />
              <text x="312" y="62" fontSize="9" fill={MUTED}>
                SUMA RZUTÓW
              </text>
              <line x1={insetOrigin.x} y1={insetOrigin.y} x2="430" y2={insetOrigin.y} stroke={AXIS} strokeWidth="1" />
              <line x1={insetOrigin.x} y1={insetOrigin.y} x2={insetOrigin.x} y2="72" stroke={AXIS} strokeWidth="1" />
              <line
                x1={insetOrigin.x}
                y1={insetOrigin.y}
                x2={insetRxEnd.x}
                y2={insetRxEnd.y}
                stroke={RESULT}
                strokeWidth="2"
              />
              <line
                x1={insetOrigin.x}
                y1={insetOrigin.y}
                x2={insetRyEnd.x}
                y2={insetRyEnd.y}
                stroke={RESULT}
                strokeWidth="2"
              />
              <text x={insetRxEnd.x + 3} y={insetRxEnd.y + 13} fontSize="9" fill={RESULT}>
                4 kN
              </text>
              <text x={insetOrigin.x + 4} y={insetRyEnd.y - 3} fontSize="9" fill={RESULT}>
                3 kN
              </text>
              {showResult && (
                <>
                  <line
                    x1={insetOrigin.x}
                    y1={insetOrigin.y}
                    x2={insetEnd.x}
                    y2={insetEnd.y}
                    stroke={RESULT}
                    strokeWidth="2.6"
                    markerEnd="url(#ex-dod-rzut-r)"
                  />
                  <text x={insetEnd.x + 2} y={insetEnd.y - 6} fontSize="10" fill={RESULT}>
                    5 kN
                  </text>
                </>
              )}
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
