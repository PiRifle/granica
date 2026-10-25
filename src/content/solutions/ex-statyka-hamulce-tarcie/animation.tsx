import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const DRIVE = '#ff6b45'
const FRICTION = '#4f6df5'
const NORMAL = '#27835a'
const WEIGHT = '#68727e'
const MUTED = '#9aa5b1'
const INK = '#17202a'

const CENTER = { x: 180, y: 172 }
const RB = 58
const R = 30
const PIVOT = { x: 100, y: 82 }
const LEVER_END = { x: 344, y: 82 }
const BLOCK_X = 180
const BLOCK_TOP = 96
const BLOCK_BOTTOM = 114
const FORCE_X = 300

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))

const arcPath = (cx: number, cy: number, radius: number, from: number, to: number) => {
  const a = (from * Math.PI) / 180
  const b = (to * Math.PI) / 180
  return `M ${cx + radius * Math.cos(a)} ${cy + radius * Math.sin(a)} A ${radius} ${radius} 0 0 1 ${cx + radius * Math.cos(b)} ${cy + radius * Math.sin(b)}`
}

export function BlockBrakeAnimation({ index, playing, sceneProgress }: SolutionAnimationProps) {
  const t = playing ? clamp01(sceneProgress) : 1
  const showLoadMoment = index >= 1
  const showFriction = index >= 2
  const showNormal = index >= 3
  const showDrive = index >= 4
  const reverse = index === 5
  const pValue = showDrive ? (reverse ? 6.24 : 5.76) : 0
  const pLength = pValue * 9
  const tDir = reverse ? -1 : 1
  const showReactions = index === 5
  const spinAngle = index >= 1 ? (reverse ? -1 : 1) * (playing ? 34 * t : 34) : 0

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg viewBox="0 0 460 340" role="img" aria-label="Hamulec klockowy z bębnem linowym i dźwignią">
          <title>Hamulec klockowy</title>
          <desc>Bęben linowy, tarcza hamulcowa, klocek, dźwignia z siłą P i momenty tarcia.</desc>
          <defs>
            <marker
              id="ex-hamulec-p"
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
              id="ex-hamulec-q"
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
              id="ex-hamulec-t"
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
              id="ex-hamulec-n"
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
              id="ex-hamulec-m"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={WEIGHT} />
            </marker>
          </defs>

          <motion.g
            initial={false}
            animate={{ rotate: spinAngle }}
            transition={{ type: 'spring', stiffness: 55, damping: 18 }}
            style={{ transformOrigin: `${CENTER.x}px ${CENTER.y}px` }}
          >
            <circle cx={CENTER.x} cy={CENTER.y} r={RB} fill="#eef2fb" stroke="#4f6df5" strokeWidth="2.6" />
            <circle cx={CENTER.x} cy={CENTER.y} r={R} fill="#f7f9fc" stroke={WEIGHT} strokeWidth="2" />
            {[0, 60, 120, 180, 240, 300].map((angle) => {
              const rad = (angle * Math.PI) / 180
              return (
                <line
                  key={`spoke-${angle}`}
                  x1={CENTER.x + 6 * Math.cos(rad)}
                  y1={CENTER.y + 6 * Math.sin(rad)}
                  x2={CENTER.x + (RB - 6) * Math.cos(rad)}
                  y2={CENTER.y + (RB - 6) * Math.sin(rad)}
                  stroke="#c9d3e2"
                  strokeWidth="1.1"
                />
              )
            })}
            <circle cx={CENTER.x} cy={CENTER.y} r="4" fill={INK} />
          </motion.g>

          <line
            x1={PIVOT.x}
            y1={PIVOT.y}
            x2={LEVER_END.x}
            y2={LEVER_END.y}
            stroke={WEIGHT}
            strokeWidth="6"
            strokeLinecap="round"
          />
          <circle cx={PIVOT.x} cy={PIVOT.y} r="7" fill="#f7f9fc" stroke={WEIGHT} strokeWidth="2.4" />
          <text x={PIVOT.x - 10} y={PIVOT.y - 10} fontSize="11" fill={INK}>
            A
          </text>

          <line x1={BLOCK_X} y1={LEVER_END.y} x2={BLOCK_X} y2={BLOCK_TOP} stroke={WEIGHT} strokeWidth="3" />
          <rect
            x={BLOCK_X - 16}
            y={BLOCK_TOP}
            width="32"
            height={BLOCK_BOTTOM - BLOCK_TOP}
            rx="3"
            fill={FRICTION}
            opacity="0.85"
          />
          <text x={BLOCK_X + 22} y={BLOCK_TOP + 12} fontSize="10" fill={FRICTION}>
            klocek
          </text>

          <line
            x1={CENTER.x - R}
            y1={CENTER.y}
            x2={CENTER.x - R}
            y2={CENTER.y + 86}
            stroke={WEIGHT}
            strokeWidth="3.2"
          />
          <line
            x1={CENTER.x - R}
            y1={CENTER.y + 66}
            x2={CENTER.x - R}
            y2={CENTER.y + 104}
            stroke={WEIGHT}
            strokeWidth="3.2"
            markerEnd="url(#ex-hamulec-q)"
          />
          <text x={CENTER.x - R - 10} y={CENTER.y + 112} textAnchor="end" fontSize="11" fill={WEIGHT}>
            Q = 12 kN
          </text>

          {showLoadMoment && (
            <>
              <path
                d={arcPath(CENTER.x, CENTER.y, 44, 30, 150)}
                fill="none"
                stroke={WEIGHT}
                strokeWidth="2.6"
                markerEnd="url(#ex-hamulec-m)"
              />
              <text x={CENTER.x - 86} y={CENTER.y - 46} fontSize="11" fill={WEIGHT}>
                M_Q = 3 kN·m
              </text>
            </>
          )}

          {showFriction && (
            <>
              <line
                x1={BLOCK_X}
                y1={BLOCK_BOTTOM}
                x2={BLOCK_X + tDir * 48}
                y2={BLOCK_BOTTOM}
                stroke={FRICTION}
                strokeWidth="3.6"
                markerEnd="url(#ex-hamulec-t)"
              />
              <text
                x={BLOCK_X + tDir * 54}
                y={BLOCK_BOTTOM + 4}
                textAnchor={reverse ? 'end' : 'start'}
                fontSize="11"
                fill={FRICTION}
              >
                T = 6 kN
              </text>
              <path
                d={reverse ? arcPath(CENTER.x, CENTER.y, 66, 300, 180) : arcPath(CENTER.x, CENTER.y, 66, 180, 300)}
                fill="none"
                stroke={FRICTION}
                strokeWidth="2.2"
                markerEnd="url(#ex-hamulec-t)"
                opacity="0.8"
              />
            </>
          )}

          {showNormal && (
            <>
              <line
                x1={BLOCK_X}
                y1={BLOCK_TOP + 2}
                x2={BLOCK_X}
                y2={LEVER_END.y - 22}
                stroke={NORMAL}
                strokeWidth="3.4"
                markerEnd="url(#ex-hamulec-n)"
              />
              <text x={BLOCK_X + 10} y={LEVER_END.y - 26} fontSize="11" fill={NORMAL}>
                N = 24 kN
              </text>
            </>
          )}

          {showDrive && (
            <>
              <line
                x1={FORCE_X}
                y1={LEVER_END.y}
                x2={FORCE_X}
                y2={LEVER_END.y + pLength}
                stroke={DRIVE}
                strokeWidth="4"
                markerEnd="url(#ex-hamulec-p)"
              />
              <text x={FORCE_X + 8} y={LEVER_END.y + pLength + 4} fontSize="11" fill={DRIVE}>
                P = {reverse ? '6,24' : '5,76'} kN
              </text>
            </>
          )}

          {!showDrive && (
            <text x={FORCE_X + 8} y={LEVER_END.y + 16} fontSize="11" fill={MUTED}>
              P = ?
            </text>
          )}

          <g stroke={MUTED} strokeWidth="1.1" fill={MUTED}>
            <line x1={PIVOT.x} y1="54" x2={BLOCK_X} y2="54" />
            <line x1={PIVOT.x} y1="49" x2={PIVOT.x} y2="59" />
            <line x1={BLOCK_X} y1="49" x2={BLOCK_X} y2="59" />
            <text x={(PIVOT.x + BLOCK_X) / 2} y="48" textAnchor="middle" fontSize="9" stroke="none">
              a = 0,25 m
            </text>
            <line x1={BLOCK_X} y1="40" x2={FORCE_X} y2="40" />
            <line x1={BLOCK_X} y1="35" x2={BLOCK_X} y2="45" />
            <line x1={FORCE_X} y1="35" x2={FORCE_X} y2="45" />
            <text x={(BLOCK_X + FORCE_X) / 2} y="34" textAnchor="middle" fontSize="9" stroke="none">
              b = 0,75 m
            </text>
            <line
              x1={BLOCK_X + 30}
              y1={LEVER_END.y}
              x2={BLOCK_X + 30}
              y2={BLOCK_BOTTOM}
              stroke={MUTED}
              strokeDasharray="4 3"
            />
            <text x={BLOCK_X + 34} y={(LEVER_END.y + BLOCK_BOTTOM) / 2 + 4} fontSize="9" stroke="none">
              e = 0,04 m
            </text>
          </g>

          {index === 1 && (
            <text x="230" y="326" textAnchor="middle" fontSize="11" fill={WEIGHT}>
              Obciążenie Q daje moment 3 kN·m względem osi bębna
            </text>
          )}
          {index === 2 && (
            <text x="230" y="326" textAnchor="middle" fontSize="11" fill={FRICTION}>
              Tarcie na większym promieniu równoważy ten sam moment
            </text>
          )}
          {index === 3 && (
            <text x="230" y="326" textAnchor="middle" fontSize="11" fill={NORMAL}>
              Stan graniczny: T = μsN, więc N = 24 kN
            </text>
          )}
          {index === 4 && (
            <text x="230" y="326" textAnchor="middle" fontSize="11" fill={DRIVE}>
              Tarcie pomaga dźwigni: P = 5,76 kN
            </text>
          )}
          {index === 5 && (
            <text x="230" y="326" textAnchor="middle" fontSize="11" fill={DRIVE}>
              Przeciwny obrót: tarcie przeszkadza, P = 6,24 kN
            </text>
          )}
          {index === 0 && (
            <text x="230" y="326" textAnchor="middle" fontSize="11" fill={MUTED}>
              Dwa równania momentów: dla bębna i dla dźwigni
            </text>
          )}

          {showReactions && (
            <g>
              <line
                x1={CENTER.x}
                y1={CENTER.y}
                x2={CENTER.x - 34}
                y2={CENTER.y}
                stroke={NORMAL}
                strokeWidth="2.4"
                markerEnd="url(#ex-hamulec-n)"
              />
              <line
                x1={CENTER.x}
                y1={CENTER.y}
                x2={CENTER.x}
                y2={CENTER.y - 34}
                stroke={NORMAL}
                strokeWidth="2.4"
                markerEnd="url(#ex-hamulec-n)"
              />
              <line
                x1={PIVOT.x}
                y1={PIVOT.y}
                x2={PIVOT.x + 34}
                y2={PIVOT.y}
                stroke={NORMAL}
                strokeWidth="2.4"
                markerEnd="url(#ex-hamulec-n)"
              />
              <line
                x1={PIVOT.x}
                y1={PIVOT.y}
                x2={PIVOT.x}
                y2={PIVOT.y + 34}
                stroke={NORMAL}
                strokeWidth="2.4"
                markerEnd="url(#ex-hamulec-n)"
              />
              <text x={CENTER.x - 38} y={CENTER.y - 6} textAnchor="end" fontSize="10" fill={NORMAL}>
                O_x
              </text>
              <text x={CENTER.x + 8} y={CENTER.y - 38} fontSize="10" fill={NORMAL}>
                O_y
              </text>
              <text x={PIVOT.x + 38} y={PIVOT.y - 6} fontSize="10" fill={NORMAL}>
                A_x
              </text>
              <text x={PIVOT.x + 8} y={PIVOT.y + 42} fontSize="10" fill={NORMAL}>
                A_y
              </text>
            </g>
          )}
        </svg>
      </div>
    </div>
  )
}
