import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const LOAD = '#ff6b45'
const RECT = '#4f6df5'
const TRI = '#d8a13b'
const RESULT = '#27835a'
const MUTED = '#87929d'
const INK = '#17202a'
const BEAM = '#dfe5ec'

const X0 = 60
const X1 = 360
const BEAM_Y = 175
const S = 50
const QS = 2.2

const clamp01 = (value: number) => Math.max(0, Math.min(1, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}

const tAt = (x: number) => (x - X0) / (X1 - X0)
const loadTop = (x: number) => BEAM_Y - (14 + 28 * tAt(x))

const Q1_X = X0 + 3 * S
const Q2_X = X0 + 4 * S
const Q_X = X0 + 3.5 * S

export function DistributedLoadAnimation({ index, playing, sceneProgress }: SolutionAnimationProps) {
  const reveal = playing ? smooth(sceneProgress) : 1
  const showSplit = index >= 1
  const showResultant = index >= 2
  const showB = index >= 3
  const showA = index >= 4
  const showCheck = index >= 5

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg viewBox="0 0 460 330" role="img" aria-label="Obciążenie trapezowe belki i reakcje podpór">
          <title>Obciążenie trapezowe belki</title>
          <desc>Podział obciążenia trapezowego na prostokąt i trójkąt, wypadkowa oraz reakcje podpór.</desc>
          <defs>
            <marker
              id="ex-dist-load"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="5.5"
              markerHeight="5.5"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={LOAD} />
            </marker>
            <marker
              id="ex-dist-force"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={LOAD} />
            </marker>
            <marker
              id="ex-dist-up"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={RESULT} />
            </marker>
          </defs>

          <rect x={X0 - 12} y={BEAM_Y - 7} width={X1 - X0 + 24} height="14" rx="4" fill={BEAM} stroke="#b8c2ce" />

          <path
            d={`M ${X0} ${BEAM_Y} L ${X0} ${loadTop(X0)} L ${X1} ${loadTop(X1)} L ${X1} ${BEAM_Y} Z`}
            fill={LOAD}
            fillOpacity="0.14"
            stroke={LOAD}
            strokeWidth="1.4"
          />
          {Array.from({ length: 13 }, (_, step) => {
            const x = X0 + (step * (X1 - X0)) / 12
            return (
              <line
                key={`load-${step}`}
                x1={x}
                y1={loadTop(x)}
                x2={x}
                y2={BEAM_Y - 4}
                stroke={LOAD}
                strokeWidth="1.1"
                markerEnd="url(#ex-dist-load)"
                opacity="0.75"
              />
            )
          })}
          <text x={X0 - 4} y={loadTop(X0) - 6} textAnchor="end" fontSize="9" fill={LOAD}>
            q₁ = 2
          </text>
          <text x={X1 + 4} y={loadTop(X1) - 4} fontSize="9" fill={LOAD}>
            q = 6 kN/m
          </text>

          {showSplit && (
            <g>
              <rect x={X0} y={loadTop(X0)} width={X1 - X0} height={14} fill={RECT} fillOpacity="0.2" stroke={RECT} />
              <path
                d={`M ${X0} ${loadTop(X0)} L ${X1} ${loadTop(X1)} L ${X1} ${loadTop(X0)} Z`}
                fill={TRI}
                fillOpacity="0.25"
                stroke={TRI}
              />
              <text x={X0 + 8} y={loadTop(X0) - 6} fontSize="8.5" fill={RECT}>
                q₁ = 2 kN/m
              </text>
              <text x={X1 - 6} y={loadTop(X1) + 24} textAnchor="end" fontSize="8.5" fill={TRI}>
                trójkąt 4 kN/m
              </text>
            </g>
          )}

          {showSplit && (
            <g opacity={showResultant ? 0.35 : 1}>
              <line
                x1={Q1_X}
                y1={BEAM_Y + 8}
                x2={Q1_X}
                y2={BEAM_Y + 8 + 12 * QS}
                stroke={RECT}
                strokeWidth="2.6"
                markerEnd="url(#ex-dist-force)"
              />
              <text x={Q1_X} y={BEAM_Y + 48} textAnchor="middle" fontSize="9" fill={RECT}>
                Q₁ = 12 kN
              </text>
              <line
                x1={Q2_X}
                y1={BEAM_Y + 8}
                x2={Q2_X}
                y2={BEAM_Y + 8 + 12 * QS}
                stroke={TRI}
                strokeWidth="2.6"
                markerEnd="url(#ex-dist-force)"
              />
              <text x={Q2_X} y={BEAM_Y + 48} textAnchor="middle" fontSize="9" fill={TRI}>
                Q₂ = 12 kN
              </text>
            </g>
          )}

          {showResultant && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: reveal }} transition={{ duration: 0.25 }}>
              <line
                x1={Q_X}
                y1={BEAM_Y + 8}
                x2={Q_X}
                y2={BEAM_Y + 8 + 24 * QS}
                stroke={LOAD}
                strokeWidth="3.4"
                markerEnd="url(#ex-dist-force)"
              />
              <text x={Q_X + 8} y={BEAM_Y + 70} fontSize="10" fontWeight="700" fill={LOAD}>
                Q = 24 kN
              </text>
              <line x1={X0} y1={BEAM_Y + 94} x2={Q_X} y2={BEAM_Y + 94} stroke={LOAD} strokeWidth="1" />
              <line x1={X0} y1={BEAM_Y + 88} x2={X0} y2={BEAM_Y + 100} stroke={LOAD} />
              <line x1={Q_X} y1={BEAM_Y + 88} x2={Q_X} y2={BEAM_Y + 100} stroke={LOAD} />
              <text x={(X0 + Q_X) / 2} y={BEAM_Y + 108} textAnchor="middle" fontSize="9" fill={LOAD}>
                3,5 m
              </text>
            </motion.g>
          )}

          <path
            d={`M ${X0 - 9} ${BEAM_Y + 7} L ${X0} ${BEAM_Y + 22} L ${X0 + 9} ${BEAM_Y + 7} Z`}
            fill={INK}
            opacity="0.7"
          />
          <circle cx={X1} cy={BEAM_Y + 17} r="6" fill="none" stroke={INK} strokeWidth="1.5" opacity="0.7" />
          <text x={X0} y={BEAM_Y + 36} textAnchor="middle" fontSize="9" fill={INK}>
            A
          </text>
          <text x={X1} y={BEAM_Y + 36} textAnchor="middle" fontSize="9" fill={INK}>
            B
          </text>

          {showB && (
            <g>
              <line
                x1={X1}
                y1={BEAM_Y + 66}
                x2={X1}
                y2={BEAM_Y + 24}
                stroke={RESULT}
                strokeWidth="3"
                markerEnd="url(#ex-dist-up)"
              />
              <text x={X1} y={BEAM_Y + 82} textAnchor="middle" fontSize="10" fontWeight="700" fill={RESULT}>
                R_B = 14 kN
              </text>
            </g>
          )}

          {showA && (
            <g>
              <line
                x1={X0}
                y1={BEAM_Y + 66}
                x2={X0}
                y2={BEAM_Y + 24}
                stroke={RESULT}
                strokeWidth="3"
                markerEnd="url(#ex-dist-up)"
              />
              <text x={X0} y={BEAM_Y + 82} textAnchor="middle" fontSize="10" fontWeight="700" fill={RESULT}>
                R_A = 10 kN
              </text>
            </g>
          )}

          {showCheck && (
            <g>
              <polyline
                points="176,296 182,302 194,288"
                fill="none"
                stroke={RESULT}
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              <text x="202" y="301" fontSize="9.5" fill={RESULT}>
                R_A · 6 = 60 = Q₁ · 3 + Q₂ · 2
              </text>
            </g>
          )}

          <text x="230" y="322" textAnchor="middle" fontSize="9.5" fill={MUTED}>
            {showResultant
              ? 'Wypadkowa = pole diagramu, zaczepiona w środku ciężkości'
              : 'Trapez = prostokąt + trójkąt'}
          </text>
        </svg>
      </div>
    </div>
  )
}
