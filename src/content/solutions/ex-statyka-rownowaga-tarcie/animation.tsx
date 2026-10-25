import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const DRIVE = '#ff6b45'
const FRICTION = '#4f6df5'
const NORMAL = '#27835a'
const WEIGHT = '#68727e'
const MUTED = '#9aa5b1'
const INK = '#17202a'

const BASE = { x: 80, y: 272 }
const TOP = { x: 400, y: 85 }
const ANGLE = Math.PI / 6
const U = { x: Math.cos(ANGLE), y: -Math.sin(ANGLE) }
const N = { x: -Math.sin(ANGLE), y: -Math.cos(ANGLE) }
const DOWN = { x: -Math.cos(ANGLE), y: Math.sin(ANGLE) }
const INTO = { x: Math.sin(ANGLE), y: Math.cos(ANGLE) }
const CENTER = { x: 225, y: 172 }
const PHI = (11.3 * Math.PI) / 180
const R_DIR = {
  x: N.x * Math.cos(PHI) + U.x * Math.sin(PHI),
  y: N.y * Math.cos(PHI) + U.y * Math.sin(PHI),
}

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const point = (origin: { x: number; y: number }, direction: { x: number; y: number }, length: number) => ({
  x: origin.x + direction.x * length,
  y: origin.y + direction.y * length,
})

export function FrictionEquilibriumAnimation({ index, playing, sceneProgress }: SolutionAnimationProps) {
  const t = playing ? clamp01(sceneProgress) : 1
  const pValue = [0, 0, 0, 32.7, 67.3, 0][index] ?? 0
  const pLength = pValue * 1.3
  const showComponents = index >= 1
  const showFriction = index >= 2
  const showMinimum = index === 3
  const showMaximum = index === 4
  const showAngle = index === 5
  const tDirection = index === 4 ? DOWN : U
  const tLength = showFriction ? 26 * (index === 2 ? t : 1) : 0
  const pStart = point(CENTER, N, 8)
  const tStart = point(CENTER, INTO, 10)
  const pEnd = point(pStart, U, pLength)
  const tEnd = point(tStart, tDirection, tLength)
  const gEnd = point(CENTER, { x: 0, y: 1 }, 76)
  const nEnd = point(CENTER, N, 54)
  const rEnd = point(CENTER, R_DIR, 74)
  const normalEnd = point(CENTER, N, 74)
  const netStart = point(CENTER, DOWN, 8)
  const netEnd = point(netStart, DOWN, 39)

  const phiStart = Math.atan2(N.y, N.x)
  const phiEnd = Math.atan2(R_DIR.y, R_DIR.x)
  const arc = (radius: number) => {
    const start = { x: CENTER.x + radius * Math.cos(phiStart), y: CENTER.y + radius * Math.sin(phiStart) }
    const end = { x: CENTER.x + radius * Math.cos(phiEnd), y: CENTER.y + radius * Math.sin(phiEnd) }
    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 0 1 ${end.x} ${end.y}`
  }

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg viewBox="0 0 460 340" role="img" aria-label="Ciało na równi pochyłej z siłą P i tarciem">
          <title>Równowaga z tarciem na równi</title>
          <desc>Równia 30 stopni, składowe ciężaru, tarcie graniczne, zakres siły P i kąt tarcia.</desc>
          <defs>
            <marker
              id="ex-rownowaga-p"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={DRIVE} />
            </marker>
            <marker
              id="ex-rownowaga-t"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={FRICTION} />
            </marker>
            <marker
              id="ex-rownowaga-n"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={NORMAL} />
            </marker>
            <marker
              id="ex-rownowaga-g"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={WEIGHT} />
            </marker>
            <marker
              id="ex-rownowaga-r"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={NORMAL} />
            </marker>
          </defs>

          <line x1="38" y1={BASE.y} x2="428" y2={BASE.y} stroke={MUTED} strokeWidth="1.4" />
          {Array.from({ length: 13 }, (_, i) => (
            <line
              key={`hatch-${i}`}
              x1={48 + i * 29}
              y1={BASE.y}
              x2={40 + i * 29}
              y2={BASE.y + 13}
              stroke={MUTED}
              strokeWidth="1.2"
            />
          ))}
          <line x1={BASE.x} y1={BASE.y} x2={TOP.x} y2={TOP.y} stroke="#68727e" strokeWidth="5" strokeLinecap="round" />
          <line x1={BASE.x} y1={BASE.y} x2="428" y2={BASE.y} stroke="#68727e" strokeWidth="2" />
          <path
            d={`M ${BASE.x + 48} ${BASE.y} A 48 48 0 0 0 ${BASE.x + 48 * Math.cos(ANGLE)} ${BASE.y - 48 * Math.sin(ANGLE)}`}
            fill="none"
            stroke={INK}
            strokeWidth="1.4"
          />
          <text x={BASE.x + 56} y={BASE.y - 8} fontSize="11" fill={INK}>
            α = 30°
          </text>

          <g transform={`rotate(-30 ${CENTER.x} ${CENTER.y})`}>
            <rect
              x={CENTER.x - 28}
              y={CENTER.y - 14}
              width="56"
              height="28"
              rx="4"
              fill="#eef2fb"
              stroke="#4f6df5"
              strokeWidth="2"
            />
          </g>
          <circle cx={CENTER.x} cy={CENTER.y} r="2.5" fill={INK} />

          {showComponents && (
            <g>
              <motion.line
                x1={CENTER.x}
                y1={CENTER.y}
                x2={point(CENTER, INTO, 52).x}
                y2={point(CENTER, INTO, 52).y}
                stroke={WEIGHT}
                strokeWidth="1.6"
                strokeDasharray="5 4"
                initial={false}
                animate={{ opacity: showComponents ? 0.75 : 0 }}
              />
              <motion.line
                x1={CENTER.x}
                y1={CENTER.y}
                x2={point(CENTER, DOWN, 50).x}
                y2={point(CENTER, DOWN, 50).y}
                stroke={WEIGHT}
                strokeWidth="1.6"
                strokeDasharray="5 4"
                initial={false}
                animate={{ opacity: showComponents ? 0.75 : 0 }}
              />
              <text
                x={point(CENTER, DOWN, 56).x - 6}
                y={point(CENTER, DOWN, 56).y + 4}
                textAnchor="end"
                fontSize="10"
                fill={WEIGHT}
              >
                G sin α = 50 N
              </text>
              <text x={point(CENTER, INTO, 58).x + 4} y={point(CENTER, INTO, 58).y + 4} fontSize="10" fill={WEIGHT}>
                G cos α = 86,6 N
              </text>
            </g>
          )}

          <line
            x1={CENTER.x}
            y1={CENTER.y}
            x2={gEnd.x}
            y2={gEnd.y}
            stroke={WEIGHT}
            strokeWidth="3.5"
            markerEnd="url(#ex-rownowaga-g)"
          />
          <text x={gEnd.x + 8} y={gEnd.y - 4} fontSize="11" fill={WEIGHT}>
            G = 100 N
          </text>

          <line
            x1={CENTER.x}
            y1={CENTER.y}
            x2={nEnd.x}
            y2={nEnd.y}
            stroke={NORMAL}
            strokeWidth="3"
            markerEnd="url(#ex-rownowaga-n)"
          />
          <text x={nEnd.x - 6} y={nEnd.y - 6} textAnchor="end" fontSize="11" fill={NORMAL}>
            N = 86,6 N
          </text>

          {showFriction && (
            <>
              <line
                x1={tStart.x}
                y1={tStart.y}
                x2={tEnd.x}
                y2={tEnd.y}
                stroke={FRICTION}
                strokeWidth="3.5"
                markerEnd="url(#ex-rownowaga-t)"
              />
              <text x={tEnd.x + 6} y={tEnd.y + (index === 4 ? -8 : 14)} fontSize="11" fill={FRICTION}>
                T_max = 17,3 N {index === 4 ? 'w dół' : 'w górę'}
              </text>
            </>
          )}

          {pValue > 0 && (
            <>
              <line
                x1={pStart.x}
                y1={pStart.y}
                x2={pEnd.x}
                y2={pEnd.y}
                stroke={DRIVE}
                strokeWidth="3.8"
                markerEnd="url(#ex-rownowaga-p)"
              />
              <text x={pEnd.x + 6} y={pEnd.y - 8} fontSize="11" fill={DRIVE}>
                P = {index === 3 ? '32,7' : '67,3'} N
              </text>
            </>
          )}

          {showMinimum && (
            <text x="230" y="322" textAnchor="middle" fontSize="11" fill={FRICTION}>
              Dolna granica: P + T_max = 50 N
            </text>
          )}
          {showMaximum && (
            <text x="230" y="322" textAnchor="middle" fontSize="11" fill={DRIVE}>
              Górna granica: P = 50 N + T_max
            </text>
          )}
          {index === 2 && (
            <>
              <line
                x1={netStart.x}
                y1={netStart.y}
                x2={netEnd.x}
                y2={netEnd.y}
                stroke={DRIVE}
                strokeWidth="2"
                strokeDasharray="4 3"
                markerEnd="url(#ex-rownowaga-p)"
              />
              <text x="230" y="322" textAnchor="middle" fontSize="11" fill={DRIVE}>
                50 N &gt; 17,3 N — bez siły P ciało zjeżdża
              </text>
            </>
          )}

          {showAngle && (
            <g>
              <line
                x1={CENTER.x}
                y1={CENTER.y}
                x2={normalEnd.x}
                y2={normalEnd.y}
                stroke={MUTED}
                strokeWidth="1.4"
                strokeDasharray="5 4"
              />
              <motion.line
                x1={CENTER.x}
                y1={CENTER.y}
                x2={rEnd.x}
                y2={rEnd.y}
                stroke={NORMAL}
                strokeWidth="4"
                markerEnd="url(#ex-rownowaga-r)"
                initial={false}
                animate={{ opacity: 1 }}
              />
              <path d={arc(38)} fill="none" stroke={NORMAL} strokeWidth="1.6" />
              <text
                x={CENTER.x + 50 * Math.cos((phiStart + phiEnd) / 2)}
                y={CENTER.y + 50 * Math.sin((phiStart + phiEnd) / 2)}
                fontSize="11"
                fill={NORMAL}
              >
                φs = 11,3°
              </text>
              <text x="230" y="322" textAnchor="middle" fontSize="11" fill={NORMAL}>
                Wypadkowa reakcji mieści się w kącie tarcia
              </text>
            </g>
          )}

          {index === 0 && (
            <text x="230" y="322" textAnchor="middle" fontSize="11" fill={MUTED}>
              Rozkład sił na równi: ciężar, normalna i tarcie
            </text>
          )}
        </svg>
      </div>
    </div>
  )
}
