import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const Q_COLOR = '#ff6b45'
const T_COLOR = '#4f6df5'
const M_COLOR = '#a970dd'
const OK = '#2e9e6b'
const MUTED = '#87929d'
const INK = '#17202a'

const L = 6
const LOAD_END = 3
const X0 = 64
const X1 = 412
const Q_BASE = 54
const Q_SCALE = 7
const T_BASE = 176
const T_SCALE = 5.5
const M_BASE = 330
const M_SCALE = 6.2
const SPAN = X1 - X0
const xAt = (metres: number) => X0 + (metres / L) * SPAN
const yQ = (value: number) => Q_BASE - value * Q_SCALE
const yT = (value: number) => T_BASE - value * T_SCALE
const yM = (value: number) => M_BASE - value * M_SCALE

const T_AT = (x: number) => (x <= LOAD_END ? 9 - 4 * x : -3)
const M_AT = (x: number) => (x <= LOAD_END ? 9 * x - 2 * x * x : 9 - 3 * (x - LOAD_END))

const tPath = `M ${xAt(0)} ${yT(9)} L ${xAt(LOAD_END)} ${yT(-3)} L ${xAt(L)} ${yT(-3)}`
const mPath = Array.from({ length: 121 }, (_, index) => {
  const metres = (index / 120) * L
  return `${index === 0 ? 'M' : 'L'} ${xAt(metres)} ${yM(M_AT(metres))}`
}).join(' ')

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}

function AxisLabel({ y, label, color }: { y: number; label: string; color: string }) {
  return (
    <text x={X0 - 12} y={y + 4} textAnchor="end" fontSize={12} fontWeight={700} fill={color}>
      {label}
    </text>
  )
}

function ValueDot({ x, y, color }: { x: number; y: number; color: string }) {
  return <circle cx={x} cy={y} r={3.6} fill={color} />
}

export function QtmRelationsAnimation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'diagrams'
  const reveal = playing ? smooth(sceneProgress) : 1
  const xExt = Math.sqrt(12)
  const mMax = 9 * xExt - 2 * xExt * xExt
  const isDerivativeT = metric === 'derivativeT'
  const isDerivativeM = metric === 'derivativeM'
  const isExtremum = metric === 'extremum'
  const isArea = metric === 'area'
  const isCheck = metric === 'check'

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 372"
          role="img"
          aria-label="Wykresy obciążenia, siły tnącej i momentu oraz związki różniczkowe i całkowe."
        >
          <title>Zależności q, T i M</title>
          <desc>Obciążenie 4 kN/m, siła tnąca od 9 do minus 3 kN, moment do 10,125 kN·m i pole pod wykresem T.</desc>
          <defs>
            <marker
              id="ex-qtm-q"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="5.4"
              markerHeight="5.4"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={Q_COLOR} />
            </marker>
            <marker
              id="ex-qtm-t"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="5.4"
              markerHeight="5.4"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={T_COLOR} />
            </marker>
            <marker
              id="ex-qtm-m"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="5.4"
              markerHeight="5.4"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={M_COLOR} />
            </marker>
          </defs>

          <AxisLabel y={Q_BASE} label="q" color={Q_COLOR} />
          <AxisLabel y={T_BASE} label="T" color={T_COLOR} />
          <AxisLabel y={M_BASE} label="M" color={M_COLOR} />

          <line x1={X0} y1={Q_BASE} x2={X1} y2={Q_BASE} stroke={MUTED} strokeWidth={1} />
          <line x1={X0} y1={T_BASE} x2={X1} y2={T_BASE} stroke={MUTED} strokeWidth={1} />
          <line x1={X0} y1={M_BASE} x2={X1} y2={M_BASE} stroke={MUTED} strokeWidth={1} />
          <line x1={X0} y1={Q_BASE} x2={X0} y2={M_BASE} stroke={MUTED} strokeWidth={1} />

          <motion.rect
            x={X0}
            y={Q_BASE - 4 * Q_SCALE}
            width={(xAt(LOAD_END) - X0) * (0.15 + 0.85 * reveal)}
            height={4 * Q_SCALE}
            fill={Q_COLOR}
            fillOpacity={0.24}
            stroke={Q_COLOR}
            strokeWidth={1.3}
          />
          <text x={xAt(LOAD_END / 2)} y={Q_BASE - 4 * Q_SCALE - 6} textAnchor="middle" fontSize={8.5} fill={Q_COLOR}>
            q = 4 kN/m
          </text>
          <text x={xAt(LOAD_END) + 6} y={Q_BASE - 4 * Q_SCALE + 2} fontSize={8} fill={Q_COLOR}>
            q = 0
          </text>

          <motion.path
            d={tPath}
            fill="none"
            stroke={T_COLOR}
            strokeWidth={2.6}
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: reveal }}
            transition={{ duration: 0.12, ease: 'linear' }}
          />
          <text x={xAt(0) + 5} y={yT(9) - 7} fontSize={8.5} fill={T_COLOR}>
            9 kN
          </text>
          <text x={xAt(LOAD_END) + 7} y={yT(-3) + 14} fontSize={8.5} fill={T_COLOR}>
            T = −3 kN
          </text>

          <motion.path
            d={mPath}
            fill="none"
            stroke={M_COLOR}
            strokeWidth={2.8}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: reveal }}
            transition={{ duration: 0.12, ease: 'linear' }}
          />
          <text x={xAt(LOAD_END) + 5} y={yM(9) - 5} fontSize={8.5} fill={M_COLOR}>
            9 kN·m
          </text>

          {metric === 'diagrams' && (
            <g>
              <ValueDot x={xAt(0)} y={yM(0)} color={M_COLOR} />
              <ValueDot x={xAt(L)} y={yM(0)} color={M_COLOR} />
              <text x={X1} y={M_BASE + 16} textAnchor="end" fontSize={8.5} fill={MUTED}>
                M = 0 na podporach
              </text>
            </g>
          )}

          {isDerivativeT && (
            <g>
              <line
                x1={xAt(0)}
                y1={yT(9)}
                x2={xAt(1)}
                y2={yT(9)}
                stroke={Q_COLOR}
                strokeWidth={1.2}
                strokeDasharray="4 3"
              />
              <line
                x1={xAt(1)}
                y1={yT(9)}
                x2={xAt(1)}
                y2={yT(5)}
                stroke={Q_COLOR}
                strokeWidth={1.2}
                strokeDasharray="4 3"
              />
              <text x={xAt(0.5)} y={yT(9) + 14} textAnchor="middle" fontSize={8.5} fill={Q_COLOR}>
                1 m
              </text>
              <text x={xAt(1) + 6} y={yT(7)} fontSize={8.5} fill={Q_COLOR}>
                −4 kN/m
              </text>
              <text x={xAt(4.5)} y={T_BASE + 18} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                q = 0 → T poziome
              </text>
            </g>
          )}

          {isDerivativeM && (
            <g>
              <line x1={xAt(1.5)} y1={yM(9.5)} x2={xAt(2.5)} y2={yM(10.5)} stroke={Q_COLOR} strokeWidth={1.6} />
              <circle cx={xAt(2)} cy={yM(M_AT(2))} r={4} fill={Q_COLOR} />
              <text x={xAt(2) + 8} y={yM(M_AT(2)) - 10} fontSize={8.5} fill={Q_COLOR}>
                nachylenie = T(2) = 1
              </text>
              <ValueDot x={xAt(2)} y={yT(1)} color={T_COLOR} />
              <text x={xAt(2) + 8} y={yT(1) + 4} fontSize={8.5} fill={T_COLOR}>
                T = 1 kN
              </text>
              <text x={xAt(4.5)} y={yM(M_AT(4.5)) - 8} textAnchor="middle" fontSize={8.5} fill={M_COLOR}>
                T = −3 → M maleje
              </text>
            </g>
          )}

          {isExtremum && (
            <g>
              <line
                x1={xAt(xExt)}
                y1={yT(0)}
                x2={xAt(xExt)}
                y2={yM(mMax)}
                stroke={OK}
                strokeWidth={1.4}
                strokeDasharray="5 4"
              />
              <circle cx={xAt(xExt)} cy={yT(0)} r={4.5} fill={OK} />
              <circle cx={xAt(xExt)} cy={yM(mMax)} r={4.5} fill={OK} />
              <text x={xAt(xExt) + 7} y={yT(0) - 6} fontSize={8.5} fill={OK}>
                T = 0 w x = 2,25 m
              </text>
              <text x={xAt(xExt) + 7} y={yM(mMax) - 6} fontSize={8.5} fontWeight={600} fill={OK}>
                M_max = 10,125 kN·m
              </text>
            </g>
          )}

          {isArea && (
            <g>
              <rect
                x={xAt(LOAD_END)}
                y={yT(0)}
                width={xAt(L) - xAt(LOAD_END)}
                height={yT(-3) - yT(0)}
                fill={Q_COLOR}
                fillOpacity={0.2}
                stroke={Q_COLOR}
                strokeWidth={1.2}
              />
              <text x={xAt(4.5)} y={yT(-3) + 18} textAnchor="middle" fontSize={8.5} fill={Q_COLOR}>
                pole = (−3)·3 = −9
              </text>
              <text x={xAt(4.5)} y={yM(4.5) + 14} textAnchor="middle" fontSize={8.5} fill={M_COLOR}>
                ΔM = −9 kN·m
              </text>
            </g>
          )}

          {isCheck && (
            <g>
              <ValueDot x={xAt(0)} y={yM(0)} color={OK} />
              <ValueDot x={xAt(L)} y={yM(0)} color={OK} />
              <text x={xAt(0) - 5} y={yM(0) + 16} textAnchor="middle" fontSize={8.5} fill={OK}>
                M(0) = 0
              </text>
              <text x={xAt(L)} y={yM(0) + 16} textAnchor="middle" fontSize={8.5} fill={OK}>
                M(6) = 0
              </text>
              <line
                x1={xAt(0)}
                y1={yT(9)}
                x2={xAt(LOAD_END)}
                y2={yT(9)}
                stroke={T_COLOR}
                strokeWidth={1.1}
                strokeDasharray="4 3"
              />
              <line
                x1={xAt(LOAD_END)}
                y1={yT(9)}
                x2={xAt(LOAD_END)}
                y2={yT(-3)}
                stroke={T_COLOR}
                strokeWidth={1.1}
                strokeDasharray="4 3"
              />
              <text x={xAt(1.5)} y={yT(9) - 6} textAnchor="middle" fontSize={8.5} fill={T_COLOR}>
                ΔT = −12 kN
              </text>
              <text x={xAt(4.5)} y={Q_BASE - 42} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                d²M/dx² = −q
              </text>
            </g>
          )}

          <text x={X1} y={M_BASE + 28} textAnchor="end" fontSize={9} fill={MUTED}>
            x [m]
          </text>
          <text x="230" y="364" textAnchor="middle" fontSize={10.5} fill={INK}>
            {isExtremum
              ? 'Maksimum momentu leży tam, gdzie siła tnąca przecina zero'
              : isArea
                ? 'Przyrost momentu to pole pod wykresem siły tnącej'
                : isCheck
                  ? 'Warunki brzegowe i związki różniczkowe domykają rachunek'
                  : 'Nachylenie T to −q, a nachylenie M to T'}
          </text>
        </svg>
      </div>
    </div>
  )
}
