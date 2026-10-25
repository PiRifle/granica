import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const LOAD = '#ff6b45'
const REACTION = '#2f7d5b'
const TORQUE = '#a970dd'
const SHAFT = '#556273'
const BEARING = '#68727e'
const AXIS = '#9aa5b1'
const MUTED = '#87929d'
const INK = '#17202a'

const A = { x: 80, y: 220 }
const B = { x: 280, y: 220 }
const P = { x: 160, y: 220 }
const Q = { x: 220, y: 220 }

function ScreenArrow({
  from,
  to,
  color,
  marker,
  width = 2.8,
  dashed = false,
  reveal = 1,
}: {
  from: { x: number; y: number }
  to: { x: number; y: number }
  color: string
  marker: string
  width?: number
  dashed?: boolean
  reveal?: number
}) {
  return (
    <motion.line
      x1={from.x}
      y1={from.y}
      x2={to.x}
      y2={to.y}
      stroke={color}
      strokeWidth={width}
      strokeDasharray={dashed ? '5 4' : undefined}
      markerEnd={dashed ? undefined : `url(#${marker})`}
      initial={false}
      animate={{ opacity: reveal }}
      transition={{ duration: 0.32 }}
    />
  )
}

export function ShaftBearingsAnimation({ index }: SolutionAnimationProps) {
  const showAxial = index >= 1
  const showMoments = index >= 2
  const showForces = index >= 3
  const showRadial = index >= 4
  const showTorque = index >= 5

  const status = [
    'Wał wzdłuż osi x: łożysko wzdłużne A i poprzeczne B',
    'A_x = −4 kN — siłę osiową przejmuje łożysko A',
    'ΣM_A: B_z = 4 kN, B_y = −4,2 kN',
    'ΣF: A_y = −1,8 kN, A_z = 6 kN',
    'R_A = 6,26 kN, R_B = 5,80 kN',
    'M_x: 3 − 3 = 0; łożyska nie przenoszą skręcania',
  ][index]

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg viewBox="0 0 460 340" role="img" aria-label="Wał w łożyskach i reakcje w dwóch płaszczyznach">
          <title>Wał i łożyska</title>
          <desc>Wał z łożyskiem wzdłużnym i poprzecznym, obciążenia w dwóch płaszczyznach i reakcje.</desc>
          <defs>
            <marker
              id="ex-waly3d-load"
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
              id="ex-waly3d-react"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={REACTION} />
            </marker>
            <marker
              id="ex-waly3d-torque"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="5.5"
              markerHeight="5.5"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={TORQUE} />
            </marker>
          </defs>

          {index === 0 && (
            <g opacity="0.35">
              <polygon
                points={`${A.x},${A.y - 38} ${B.x},${B.y - 38} ${B.x},${B.y + 38} ${A.x},${A.y + 38}`}
                fill="#eef3fb"
                stroke={AXIS}
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              <polygon
                points={`${A.x - 36},${A.y + 22} ${B.x - 36},${B.y + 22} ${B.x + 36},${B.y - 22} ${A.x + 36},${A.y - 22}`}
                fill="#f4f1fa"
                stroke={AXIS}
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              <text x={B.x - 8} y={A.y - 28} textAnchor="end" fontSize="9" fill={MUTED}>
                płaszczyzna x–z
              </text>
              <text x={B.x + 30} y={A.y - 16} textAnchor="end" fontSize="9" fill={MUTED}>
                płaszczyzna x–y
              </text>
            </g>
          )}

          <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke={SHAFT} strokeWidth="8" strokeLinecap="round" />
          <line x1={A.x} y1={A.y - 2} x2={B.x} y2={B.y - 2} stroke="#9aa5b1" strokeWidth="1.6" opacity="0.7" />

          <g>
            <rect x={A.x - 9} y={A.y - 24} width="18" height="48" rx="3" fill={BEARING} />
            <rect x={A.x - 16} y={A.y - 12} width="7" height="24" rx="2" fill="#8a949f" />
            <rect x={A.x - 15} y={A.y - 12} width="5" height="24" rx="2" fill={BEARING} />
            <text x={A.x} y={A.y + 40} textAnchor="middle" fontSize="11" fontWeight="600" fill={INK}>
              A
            </text>
            <text x={A.x} y={A.y + 53} textAnchor="middle" fontSize="8.5" fill={MUTED}>
              wzdłużne
            </text>
          </g>
          <g>
            <rect x={B.x - 7} y={B.y - 21} width="14" height="42" rx="3" fill={BEARING} />
            <circle cx={B.x} cy={B.y - 15} r="2.6" fill="#e7ebf0" stroke={BEARING} strokeWidth="1" />
            <circle cx={B.x} cy={B.y + 15} r="2.6" fill="#e7ebf0" stroke={BEARING} strokeWidth="1" />
            <text x={B.x} y={B.y + 40} textAnchor="middle" fontSize="11" fontWeight="600" fill={INK}>
              B
            </text>
            <text x={B.x} y={B.y + 53} textAnchor="middle" fontSize="8.5" fill={MUTED}>
              poprzeczne
            </text>
          </g>

          <line x1={A.x} y1={A.y + 70} x2={B.x} y2={B.y + 70} stroke={AXIS} strokeWidth="1" />
          <line x1={A.x} y1={A.y + 66} x2={A.x} y2={A.y + 74} stroke={AXIS} strokeWidth="1" />
          <line x1={B.x} y1={B.y + 66} x2={B.x} y2={B.y + 74} stroke={AXIS} strokeWidth="1" />
          <text x={(A.x + B.x) / 2} y={A.y + 66} textAnchor="middle" fontSize="9" fill={MUTED}>
            x = 1,0 m
          </text>

          <ScreenArrow from={P} to={{ x: P.x, y: P.y + 62 }} color={LOAD} marker="ex-waly3d-load" width={3} />
          <text x={P.x - 8} y={P.y + 30} textAnchor="end" fontSize="10.5" fontWeight="700" fill={LOAD}>
            P = 10 kN
          </text>
          <text x={P.x - 8} y={P.y + 43} textAnchor="end" fontSize="9" fill={LOAD}>
            (x = 0,4 m, −z)
          </text>

          <ScreenArrow from={Q} to={{ x: Q.x + 39, y: Q.y - 14 }} color={LOAD} marker="ex-waly3d-load" width={3} />
          <text x={Q.x + 44} y={Q.y - 12} fontSize="10.5" fontWeight="700" fill={LOAD}>
            Q = 6 kN
          </text>
          <text x={Q.x + 44} y={Q.y + 1} fontSize="9" fill={LOAD}>
            +y
          </text>

          <ScreenArrow
            from={{ x: P.x, y: P.y - 10 }}
            to={{ x: P.x + 44, y: P.y - 10 }}
            color={LOAD}
            marker="ex-waly3d-load"
            width={2.8}
          />
          <text x={P.x + 50} y={P.y - 7} fontSize="10" fontWeight="700" fill={LOAD}>
            H = 4 kN
          </text>

          {showAxial && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>
              <ScreenArrow from={A} to={{ x: A.x - 40, y: A.y }} color={REACTION} marker="ex-waly3d-react" width={3} />
              <text x={A.x - 50} y={A.y - 10} fontSize="10" fontWeight="700" fill={REACTION}>
                A_x = −4 kN
              </text>
            </motion.g>
          )}

          {showMoments && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
              <g stroke={MUTED} strokeWidth="1.2" strokeDasharray="4 4" fill="none">
                <line x1={A.x} y1={A.y} x2={P.x} y2={P.y} />
                <line x1={A.x} y1={A.y} x2={Q.x} y2={Q.y} />
              </g>
              <text x={(A.x + P.x) / 2} y={A.y + 14} textAnchor="middle" fontSize="8.5" fill={MUTED}>
                0,4 m
              </text>
              <text x={(A.x + Q.x) / 2} y={A.y + 14} textAnchor="middle" fontSize="8.5" fill={MUTED}>
                0,7 m
              </text>
              <ScreenArrow from={B} to={{ x: B.x, y: B.y - 40 }} color={REACTION} marker="ex-waly3d-react" width={3} />
              <text x={B.x + 7} y={B.y - 38} fontSize="10" fontWeight="700" fill={REACTION}>
                B_z = 4 kN
              </text>
              <ScreenArrow
                from={B}
                to={{ x: B.x - 34, y: B.y + 12 }}
                color={REACTION}
                marker="ex-waly3d-react"
                width={3}
              />
              <text x={B.x - 38} y={B.y + 28} textAnchor="end" fontSize="10" fontWeight="700" fill={REACTION}>
                B_y = −4,2 kN
              </text>
            </motion.g>
          )}

          {showForces && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
              <ScreenArrow
                from={A}
                to={{ x: A.x - 30, y: A.y + 11 }}
                color={REACTION}
                marker="ex-waly3d-react"
                width={3}
              />
              <text x={A.x - 64} y={A.y + 32} fontSize="10" fontWeight="700" fill={REACTION}>
                A_y = −1,8 kN
              </text>
              <ScreenArrow from={A} to={{ x: A.x, y: A.y - 60 }} color={REACTION} marker="ex-waly3d-react" width={3} />
              <text x={A.x + 6} y={A.y - 58} fontSize="10" fontWeight="700" fill={REACTION}>
                A_z = 6 kN
              </text>
            </motion.g>
          )}

          {showRadial && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45 }}>
              <ScreenArrow
                from={A}
                to={{ x: A.x - 30, y: A.y - 51 }}
                color={REACTION}
                marker="ex-waly3d-react"
                width={4.6}
              />
              <text x={A.x - 54} y={A.y - 62} fontSize="10" fontWeight="700" fill={REACTION}>
                R_A = 6,26 kN
              </text>
              <ScreenArrow
                from={B}
                to={{ x: B.x - 34, y: B.y - 28 }}
                color={REACTION}
                marker="ex-waly3d-react"
                width={4.6}
              />
              <text x={B.x - 40} y={B.y - 32} textAnchor="end" fontSize="10" fontWeight="700" fill={REACTION}>
                R_B = 5,80 kN
              </text>
              <ellipse
                cx={A.x}
                cy={A.y}
                rx="52"
                ry="58"
                fill="none"
                stroke={REACTION}
                strokeWidth="1"
                strokeDasharray="4 5"
                opacity="0.5"
              />
              <ellipse
                cx={B.x}
                cy={B.y}
                rx="48"
                ry="45"
                fill="none"
                stroke={REACTION}
                strokeWidth="1"
                strokeDasharray="4 5"
                opacity="0.5"
              />
            </motion.g>
          )}

          {showTorque && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45 }}>
              <path
                d={`M ${A.x + 112} ${A.y - 12} A 40 14 0 1 1 ${A.x + 108} ${A.y + 14}`}
                fill="none"
                stroke={TORQUE}
                strokeWidth="2.6"
                markerEnd="url(#ex-waly3d-torque)"
              />
              <text x={A.x + 130} y={A.y - 22} fontSize="10.5" fontWeight="700" fill={TORQUE}>
                M = 3 kN·m
              </text>
              <text x={A.x + 130} y={A.y - 9} fontSize="9" fill={TORQUE}>
                napęd −3 kN·m
              </text>
              <rect x="292" y="80" width="142" height="44" rx="8" fill="#f4f1fa" stroke={TORQUE} strokeWidth="1.1" />
              <text x="363" y="97" textAnchor="middle" fontSize="10.5" fontWeight="700" fill={TORQUE}>
                łożyska: M_x = 0
              </text>
              <text x="363" y="113" textAnchor="middle" fontSize="9" fill={MUTED}>
                skręcanie równoważy napęd
              </text>
            </motion.g>
          )}

          <text x="230" y="330" textAnchor="middle" fontSize="12" fill={INK}>
            {status}
          </text>
        </svg>
      </div>
    </div>
  )
}
