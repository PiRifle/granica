import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const LOAD = '#ff6b45'
const LOAD_DARK = '#d84f28'
const REACT = '#2e9e6b'
const T_COLOR = '#4f6df5'
const M_COLOR = '#a970dd'
const OK = '#2e9e6b'
const MUTED = '#87929d'
const EDGE = '#68727e'
const INK = '#17202a'

const L = 6
const X0 = 64
const X1 = 414
const BEAM_Y = 92
const T_BASE = 202
const T_SCALE = 4.2
const M_BASE = 344
const M_SCALE = 4.6
const SPAN = X1 - X0
const xAt = (metres: number) => X0 + (metres / L) * SPAN
const yT = (value: number) => T_BASE - value * T_SCALE
const yM = (value: number) => M_BASE - value * M_SCALE

const T_AT = (x: number) => 6 - (x * x) / 2
const M_AT = (x: number) => 6 * x - (x * x * x) / 6

const tPath = Array.from({ length: 121 }, (_, index) => {
  const metres = (index / 120) * L
  return `${index === 0 ? 'M' : 'L'} ${xAt(metres)} ${yT(T_AT(metres))}`
}).join(' ')
const mPath = Array.from({ length: 121 }, (_, index) => {
  const metres = (index / 120) * L
  return `${index === 0 ? 'M' : 'L'} ${xAt(metres)} ${yM(M_AT(metres))}`
}).join(' ')

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}

function ArrowY({
  x,
  from,
  to,
  color,
  marker,
  label,
  labelX = x,
  labelY,
  align = 'middle',
}: {
  x: number
  from: number
  to: number
  color: string
  marker: string
  label: string
  labelX?: number
  labelY: number
  align?: 'start' | 'middle' | 'end'
}) {
  return (
    <g>
      <line x1={x} y1={from} x2={x} y2={to} stroke={color} strokeWidth={2.3} markerEnd={`url(#${marker})`} />
      <text x={labelX} y={labelY} textAnchor={align} fontSize={9} fill={color}>
        {label}
      </text>
    </g>
  )
}

function Support({ x, label, roller = false }: { x: number; label: string; roller?: boolean }) {
  return (
    <g>
      <path d={`M ${x - 10} ${BEAM_Y + 16} L ${x} ${BEAM_Y + 3} L ${x + 10} ${BEAM_Y + 16} Z`} fill={EDGE} />
      {roller && (
        <g fill={EDGE}>
          <circle cx={x - 4.5} cy={BEAM_Y + 21} r={2.8} />
          <circle cx={x + 4.5} cy={BEAM_Y + 21} r={2.8} />
        </g>
      )}
      <text x={x} y={BEAM_Y + 38} textAnchor="middle" fontSize={10} fontWeight={600} fill={EDGE}>
        {label}
      </text>
    </g>
  )
}

function Dimension({ x1, x2, y, label }: { x1: number; x2: number; y: number; label: string }) {
  return (
    <g stroke={MUTED} fill={MUTED}>
      <line x1={x1} y1={y} x2={x2} y2={y} strokeWidth={1} />
      <line x1={x1} y1={y - 4} x2={x1} y2={y + 4} strokeWidth={1} />
      <line x1={x2} y1={y - 4} x2={x2} y2={y + 4} strokeWidth={1} />
      <text x={(x1 + x2) / 2} y={y - 5} textAnchor="middle" fontSize={8.5} stroke="none">
        {label}
      </text>
    </g>
  )
}

function LoadTriangle() {
  const arrows = Array.from({ length: 13 }, (_, index) => (index / 12) * L)
  return (
    <g>
      <line x1={X0} y1={BEAM_Y - 5} x2={X1} y2={BEAM_Y - 47} stroke={LOAD} strokeWidth={1.4} />
      <line x1={X0} y1={BEAM_Y - 5} x2={X0} y2={BEAM_Y - 20} stroke={LOAD} strokeWidth={1} />
      {arrows.map((metres, index) => {
        const top = BEAM_Y - 5 - (metres / L) * 42
        return (
          <line
            key={`tri-${index}`}
            x1={xAt(metres)}
            y1={top}
            x2={xAt(metres)}
            y2={BEAM_Y - 5}
            stroke={LOAD}
            strokeWidth={1.2}
            markerEnd="url(#ex-tw-load)"
          />
        )
      })}
      <text x={X1 - 4} y={BEAM_Y - 52} textAnchor="end" fontSize={9} fontWeight={600} fill={LOAD}>
        q₀ = 6 kN/m
      </text>
      <text x={X0 + 5} y={BEAM_Y - 12} fontSize={8.5} fill={LOAD}>
        q = 0
      </text>
    </g>
  )
}

export function TriangularLoadAnimation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'load'
  const reveal = playing ? smooth(sceneProgress) : 1
  const isLoad = metric === 'load'
  const isReaction = metric === 'reaction'
  const isT = metric === 'T'
  const isM = metric === 'M'
  const isExtremum = metric === 'extremum'
  const isCheck = metric === 'check'
  const showT = isT || isExtremum || isCheck
  const showM = isM || isExtremum || isCheck
  const xExt = Math.sqrt(12)
  const mMax = M_AT(xExt)

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 380"
          role="img"
          aria-label="Belka z obciążeniem trójkątnym, wykres siły tnącej i momentu z maksimum."
        >
          <title>Wykresy przy obciążeniu trójkątnym</title>
          <desc>
            Obciążenie od zera do 6 kN/m, reakcje 6 i 12 kN, parabola siły tnącej i sześcienna krzywa momentu.
          </desc>
          <defs>
            <marker
              id="ex-tw-load"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={LOAD} />
            </marker>
            <marker
              id="ex-tw-react"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={REACT} />
            </marker>
            <marker
              id="ex-tw-result"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={LOAD_DARK} />
            </marker>
          </defs>

          <line x1={X0} y1={BEAM_Y} x2={X1} y2={BEAM_Y} stroke={EDGE} strokeWidth={5} />
          <Support x={X0} label="A" />
          <Support x={X1} label="B" roller />
          <LoadTriangle />

          {isReaction && (
            <g>
              <ArrowY
                x={xAt(4)}
                from={34}
                to={BEAM_Y - 9}
                color={LOAD_DARK}
                marker="ex-tw-result"
                label="W = 18 kN"
                labelY={28}
              />
              <ArrowY
                x={X0 + 15}
                from={BEAM_Y + 56}
                to={BEAM_Y + 6}
                color={REACT}
                marker="ex-tw-react"
                label="R_A = 6 kN"
                labelY={BEAM_Y + 70}
              />
              <ArrowY
                x={X1 - 15}
                from={BEAM_Y + 56}
                to={BEAM_Y + 6}
                color={REACT}
                marker="ex-tw-react"
                label="R_B = 12 kN"
                labelY={BEAM_Y + 70}
              />
              <Dimension x1={X0} x2={xAt(4)} y={BEAM_Y + 92} label="2L/3 = 4 m" />
              <Dimension x1={X0} x2={X1} y={BEAM_Y + 116} label="L = 6 m" />
            </g>
          )}

          {isCheck && (
            <g>
              <line x1={X0} y1={BEAM_Y + 6} x2={X0} y2={BEAM_Y + 18} stroke={MUTED} strokeWidth={1} />
              <line x1={X1} y1={BEAM_Y + 6} x2={X1} y2={BEAM_Y + 18} stroke={MUTED} strokeWidth={1} />
              <circle cx={X0} cy={BEAM_Y} r={3.2} fill={EDGE} />
              <circle cx={X1} cy={BEAM_Y} r={3.2} fill={EDGE} />
            </g>
          )}

          {(showT || showM) && (
            <g>
              <line x1={X0} y1={T_BASE} x2={X1} y2={T_BASE} stroke={MUTED} strokeWidth={1} />
              <line x1={X0} y1={M_BASE} x2={X1} y2={M_BASE} stroke={MUTED} strokeWidth={1} />
              <line x1={X0} y1={T_BASE} x2={X0} y2={M_BASE} stroke={MUTED} strokeWidth={1} />
              <text x={X0 - 12} y={T_BASE + 4} textAnchor="end" fontSize={12} fontWeight={700} fill={T_COLOR}>
                T
              </text>
              <text x={X0 - 12} y={M_BASE + 4} textAnchor="end" fontSize={12} fontWeight={700} fill={M_COLOR}>
                M
              </text>
            </g>
          )}

          {showT && (
            <g>
              <motion.path
                d={tPath}
                fill="none"
                stroke={T_COLOR}
                strokeWidth={2.7}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: reveal }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <text x={xAt(0) + 5} y={yT(6) - 7} fontSize={8.5} fill={T_COLOR}>
                6 kN
              </text>
              <text x={xAt(3)} y={yT(1.5) - 8} textAnchor="middle" fontSize={8.5} fill={T_COLOR}>
                T(3) = 1,5 kN
              </text>
              <text x={xAt(5.85)} y={yT(-12) + 14} textAnchor="end" fontSize={8.5} fill={T_COLOR}>
                T(6) = −12 kN
              </text>
            </g>
          )}

          {showM && (
            <g>
              <motion.path
                d={mPath}
                fill="none"
                stroke={M_COLOR}
                strokeWidth={2.8}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: reveal }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <circle cx={X0} cy={yM(0)} r={3.4} fill={M_COLOR} />
              <circle cx={X1} cy={yM(0)} r={3.4} fill={M_COLOR} />
              <text x={xAt(3)} y={yM(13.5) - 8} textAnchor="middle" fontSize={8.5} fill={M_COLOR}>
                M(3) = 13,5 kN·m
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
              <circle cx={xAt(xExt)} cy={yT(0)} r={4.3} fill={OK} />
              <circle cx={xAt(xExt)} cy={yM(mMax)} r={4.3} fill={OK} />
              <text x={xAt(xExt) + 7} y={yT(0) - 6} fontSize={8.5} fill={OK}>
                T = 0, x = 3,46 m
              </text>
              <text x={xAt(xExt) + 7} y={yM(mMax) - 6} fontSize={8.5} fontWeight={600} fill={OK}>
                M_max = 13,86 kN·m
              </text>
            </g>
          )}

          {isCheck && (
            <g>
              <line
                x1={X1}
                y1={yT(-12)}
                x2={X1}
                y2={yT(0)}
                stroke={OK}
                strokeWidth={1.8}
                strokeDasharray="4 3"
                markerEnd="url(#ex-tw-react)"
              />
              <text x={X1 - 8} y={yT(-6)} textAnchor="end" fontSize={8.5} fill={OK}>
                skok +12 kN
              </text>
              <text x={X0 - 6} y={yM(0) + 16} textAnchor="end" fontSize={8.5} fill={OK}>
                M(0) = 0
              </text>
              <text x={X1} y={yM(0) + 16} textAnchor="middle" fontSize={8.5} fill={OK}>
                M(6) = 0
              </text>
              <text x={xAt(4.5)} y={T_BASE + 20} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                q liniowe → T kwadratowe → M sześcienne
              </text>
            </g>
          )}

          {isLoad && (
            <g>
              <Dimension x1={X0} x2={X1} y={BEAM_Y + 84} label="L = 6 m" />
              <text x={xAt(3)} y={BEAM_Y + 108} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                natężenie rośnie liniowo od A do B
              </text>
            </g>
          )}

          <text x={X1} y={M_BASE + 26} textAnchor="end" fontSize={9} fill={MUTED}>
            x [m]
          </text>
          <text x="230" y="372" textAnchor="middle" fontSize={10.5} fill={INK}>
            {isExtremum
              ? 'Maksimum momentu tam, gdzie parabola T przecina zero'
              : isCheck
                ? 'Warunki brzegowe i skok pod podporą potwierdzają wykresy'
                : isReaction
                  ? 'Wypadkowa trójkąta działa w 2/3 rozpiętości od wierzchołka'
                  : 'Kształt wykresu wynika z funkcji obciążenia q(x)'}
          </text>
        </svg>
      </div>
    </div>
  )
}
