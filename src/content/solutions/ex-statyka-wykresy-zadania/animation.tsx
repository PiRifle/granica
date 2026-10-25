import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const LOAD = '#ff6b45'
const LOAD_DARK = '#d84f28'
const REACT = '#2e9e6b'
const INTERNAL = '#4f6df5'
const MOMENT = '#a970dd'
const OK = '#2e9e6b'
const MUTED = '#87929d'
const EDGE = '#68727e'
const INK = '#17202a'

const AX = 100
const AY = 310
const BY = 80
const CX = 420
const BEAM_Y = 64
const B2 = 60
const C2 = 420
const T_BASE = 150
const T_SCALE = 1.8
const M_BASE = 240
const M_SCALE = 0.55
const COL_X = 110
const COL_A = 330
const COL_B = 80
const COL_CUT = 205
const M_COL_BASE_X = 190
const M_COL_SCALE = 0.55

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}

const yT = (value: number) => T_BASE - value * T_SCALE
const yM = (value: number) => M_BASE - value * M_SCALE
const xBeam = (metres: number) => B2 + (metres / 6) * (C2 - B2)

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
      <text x={labelX} y={labelY} textAnchor={align} fontSize={8.8} fill={color}>
        {label}
      </text>
    </g>
  )
}

function ArrowX({
  y,
  from,
  to,
  color,
  marker,
  label,
  labelY,
}: {
  y: number
  from: number
  to: number
  color: string
  marker: string
  label: string
  labelY: number
}) {
  return (
    <g>
      <line x1={from} y1={y} x2={to} y2={y} stroke={color} strokeWidth={2.3} markerEnd={`url(#${marker})`} />
      <text x={(from + to) / 2} y={labelY} textAnchor="middle" fontSize={8.8} fill={color}>
        {label}
      </text>
    </g>
  )
}

function FixedSupport({ x, y, vertical = false }: { x: number; y: number; vertical?: boolean }) {
  if (vertical) {
    return (
      <g>
        <line x1={x + 2} y1={y - 30} x2={x + 2} y2={y + 30} stroke={EDGE} strokeWidth={3} />
        {Array.from({ length: 7 }, (_, index) => (
          <line
            key={`vs-${index}`}
            x1={x + 4}
            y1={y - 28 + index * 9}
            x2={x + 14}
            y2={y - 34 + index * 9}
            stroke={EDGE}
            strokeWidth={1.3}
          />
        ))}
      </g>
    )
  }
  return (
    <g>
      <line x1={x - 30} y1={y + 2} x2={x + 30} y2={y + 2} stroke={EDGE} strokeWidth={3} />
      {Array.from({ length: 7 }, (_, index) => (
        <line
          key={`hs-${index}`}
          x1={x - 28 + index * 9}
          y1={y + 4}
          x2={x - 34 + index * 9}
          y2={y + 14}
          stroke={EDGE}
          strokeWidth={1.3}
        />
      ))}
      <circle cx={x} cy={y} r={3.4} fill={EDGE} />
    </g>
  )
}

function MomentArc({
  x,
  y,
  radius = 22,
  reverse = false,
  label,
  labelX,
  labelY,
}: {
  x: number
  y: number
  radius?: number
  reverse?: boolean
  label: string
  labelX: number
  labelY: number
}) {
  const d = reverse
    ? `M ${x - radius} ${y - 4} A ${radius} ${radius} 0 1 0 ${x + radius} ${y - 4}`
    : `M ${x + radius} ${y - 4} A ${radius} ${radius} 0 1 1 ${x - radius} ${y - 4}`
  return (
    <g>
      <path d={d} fill="none" stroke={MOMENT} strokeWidth={1.9} markerEnd="url(#ex-ff-moment)" />
      <text x={labelX} y={labelY} textAnchor="middle" fontSize={8.5} fill={MOMENT}>
        {label}
      </text>
    </g>
  )
}

function BeamLoad({ top, bottom, from = AX, to = CX }: { top: number; bottom: number; from?: number; to?: number }) {
  const count = 13
  return (
    <g>
      <line x1={from} y1={top} x2={to} y2={top} stroke={LOAD} strokeWidth={1.3} />
      {Array.from({ length: count }, (_, index) => {
        const x = from + ((to - from) * index) / (count - 1)
        return (
          <line
            key={`q-${index}`}
            x1={x}
            y1={top}
            x2={x}
            y2={bottom}
            stroke={LOAD}
            strokeWidth={1.3}
            markerEnd="url(#ex-ff-load)"
          />
        )
      })}
      <text x={(from + to) / 2} y={top - 7} textAnchor="middle" fontSize={8.8} fill={LOAD}>
        q = 4 kN/m
      </text>
    </g>
  )
}

export function FullFrameAnimation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const reveal = playing ? smooth(sceneProgress) : 1
  const isModel = metric === 'model'
  const isReaction = metric === 'reaction'
  const isBeam = metric === 'beam'
  const isColumn = metric === 'column'
  const isNode = metric === 'node'
  const isCheck = metric === 'check'

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 370"
          role="img"
          aria-label="Rama z obciążeniem ciągłym: reakcje, wykresy belki i kolumny oraz kontrola węzła."
        >
          <title>Pełne zadanie dla ramy z obciążeniem ciągłym</title>
          <desc>Rama o wysokości 4 m i długości 6 m, obciążenie 4 kN/m, siły 12 i 10 kN oraz wykresy N, T, M.</desc>
          <defs>
            <marker
              id="ex-ff-load"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="5.2"
              markerHeight="5.2"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={LOAD} />
            </marker>
            <marker
              id="ex-ff-result"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="5.6"
              markerHeight="5.6"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={LOAD_DARK} />
            </marker>
            <marker
              id="ex-ff-react"
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
              id="ex-ff-internal"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={INTERNAL} />
            </marker>
            <marker
              id="ex-ff-moment"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="5.2"
              markerHeight="5.2"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={MOMENT} />
            </marker>
          </defs>

          {(isModel || isReaction || isCheck) && (
            <g opacity={isCheck ? 0.35 : 1}>
              <line x1={AX} y1={BY} x2={AX} y2={AY} stroke={EDGE} strokeWidth={6} />
              <line x1={AX} y1={BY} x2={CX} y2={BY} stroke={EDGE} strokeWidth={6} />
              <FixedSupport x={AX} y={AY} />
              <circle cx={AX} cy={BY} r={4.5} fill={EDGE} />
              <text x={AX - 12} y={BY - 8} textAnchor="end" fontSize={10} fontWeight={600} fill={EDGE}>
                B
              </text>
              <text x={CX + 6} y={BY - 8} fontSize={10} fontWeight={600} fill={EDGE}>
                C
              </text>
              <text x={AX - 38} y={AY - 6} textAnchor="end" fontSize={10} fontWeight={600} fill={EDGE}>
                A
              </text>
              <BeamLoad top={46} bottom={BY - 5} />
              <ArrowY x={CX} from={30} to={BY - 7} color={LOAD} marker="ex-ff-load" label="P = 12 kN" labelY={24} />
              <ArrowX
                y={BY}
                from={CX + 4}
                to={CX + 34}
                color={LOAD}
                marker="ex-ff-load"
                label="H = 10 kN"
                labelY={BY + 16}
              />
            </g>
          )}

          {isModel && (
            <g>
              <line x1={72} y1={BY} x2={72} y2={AY} stroke={MUTED} strokeWidth={1} />
              <line x1={68} y1={BY} x2={76} y2={BY} stroke={MUTED} strokeWidth={1} />
              <line x1={68} y1={AY} x2={76} y2={AY} stroke={MUTED} strokeWidth={1} />
              <text
                x={63}
                y={(BY + AY) / 2}
                textAnchor="middle"
                fontSize={8.5}
                fill={MUTED}
                transform={`rotate(-90 63 ${(BY + AY) / 2})`}
              >
                h = 4 m
              </text>
              <line x1={AX} y1={BY + 42} x2={CX} y2={BY + 42} stroke={MUTED} strokeWidth={1} />
              <line x1={AX} y1={BY + 38} x2={AX} y2={BY + 46} stroke={MUTED} strokeWidth={1} />
              <line x1={CX} y1={BY + 38} x2={CX} y2={BY + 46} stroke={MUTED} strokeWidth={1} />
              <text x={(AX + CX) / 2} y={BY + 36} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                L = 6 m
              </text>
            </g>
          )}

          {isReaction && (
            <g>
              <ArrowX
                y={AY}
                from={AX - 4}
                to={AX - 50}
                color={REACT}
                marker="ex-ff-react"
                label="A_x = 10 kN"
                labelY={AY + 18}
              />
              <ArrowY
                x={AX + 5}
                from={AY - 2}
                to={AY - 50}
                color={REACT}
                marker="ex-ff-react"
                label="A_y = 36 kN"
                labelX={AX + 12}
                labelY={AY - 36}
                align="start"
              />
              <MomentArc x={AX} y={AY} radius={26} label="M_A = 184 kN·m" labelX={AX + 48} labelY={AY - 24} />
              <ArrowY
                x={(AX + CX) / 2}
                from={36}
                to={BY - 8}
                color={LOAD_DARK}
                marker="ex-ff-result"
                label="W = 24 kN"
                labelY={30}
              />
              <text x={CX + 4} y={BY + 46} textAnchor="end" fontSize={8.5} fill={MUTED}>
                M_A = 24·3 + 12·6 + 10·4
              </text>
            </g>
          )}

          {isBeam && (
            <g>
              <line x1={B2} y1={BEAM_Y} x2={C2} y2={BEAM_Y} stroke={EDGE} strokeWidth={6} />
              <FixedSupport x={B2} y={BEAM_Y} vertical />
              <text x={B2 - 10} y={BEAM_Y - 10} textAnchor="end" fontSize={10} fontWeight={600} fill={EDGE}>
                B
              </text>
              <text x={C2 + 4} y={BEAM_Y - 10} fontSize={10} fontWeight={600} fill={EDGE}>
                C
              </text>
              <BeamLoad top={28} bottom={BEAM_Y - 5} from={B2} to={C2} />
              <ArrowY x={C2} from={14} to={BEAM_Y - 7} color={LOAD} marker="ex-ff-load" label="P = 12 kN" labelY={8} />

              <line x1={B2} y1={T_BASE} x2={C2} y2={T_BASE} stroke={MUTED} strokeWidth={1} />
              <text x={B2 - 10} y={T_BASE + 4} textAnchor="end" fontSize={11} fontWeight={700} fill={INTERNAL}>
                T
              </text>
              <motion.path
                d={`M ${B2} ${yT(36)} L ${C2} ${yT(12)}`}
                fill="none"
                stroke={INTERNAL}
                strokeWidth={2.6}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: reveal }}
              />
              <text x={B2 + 6} y={yT(36) - 8} fontSize={8.5} fill={INTERNAL}>
                36 kN
              </text>
              <text x={C2} y={yT(12) - 8} textAnchor="end" fontSize={8.5} fill={INTERNAL}>
                12 kN
              </text>
              <circle cx={xBeam(3)} cy={yT(24)} r={3.4} fill={INTERNAL} />
              <text x={xBeam(3) + 6} y={yT(24) - 7} fontSize={8.5} fill={INTERNAL}>
                T(3) = 24 kN
              </text>

              <line x1={B2} y1={M_BASE} x2={C2} y2={M_BASE} stroke={MUTED} strokeWidth={1} />
              <text x={B2 - 10} y={M_BASE + 4} textAnchor="end" fontSize={11} fontWeight={700} fill={MOMENT}>
                M
              </text>
              <motion.path
                d={`M ${B2} ${yM(-144)} Q ${xBeam(3)} ${yM(-36)} ${C2} ${yM(0)}`}
                fill="none"
                stroke={MOMENT}
                strokeWidth={2.7}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: reveal }}
              />
              <text x={B2 + 6} y={yM(-144) + 14} fontSize={8.5} fill={MOMENT}>
                −144 kN·m
              </text>
              <circle cx={xBeam(3)} cy={yM(-54)} r={3.4} fill={MOMENT} />
              <text x={xBeam(3) + 6} y={yM(-54) - 7} fontSize={8.5} fill={MOMENT}>
                −54 kN·m
              </text>
              <text x={C2} y={M_BASE - 7} textAnchor="end" fontSize={8.5} fill={MOMENT}>
                0
              </text>
              <text x={C2} y={M_BASE + 18} textAnchor="end" fontSize={8.5} fill={MUTED}>
                x [m]
              </text>
            </g>
          )}

          {isColumn && (
            <g>
              <line x1={COL_X} y1={COL_B} x2={COL_X} y2={COL_A} stroke={EDGE} strokeWidth={6} />
              <FixedSupport x={COL_X} y={COL_A} />
              <text x={COL_X - 10} y={COL_B - 8} textAnchor="end" fontSize={10} fontWeight={600} fill={EDGE}>
                B
              </text>
              <text x={COL_X - 10} y={COL_A + 20} textAnchor="end" fontSize={10} fontWeight={600} fill={EDGE}>
                A
              </text>
              <ArrowX
                y={COL_A}
                from={COL_X - 4}
                to={COL_X - 46}
                color={REACT}
                marker="ex-ff-react"
                label="A_x = 10 kN"
                labelY={COL_A + 18}
              />
              <ArrowY
                x={COL_X + 5}
                from={COL_A - 2}
                to={COL_A - 46}
                color={REACT}
                marker="ex-ff-react"
                label="A_y = 36 kN"
                labelX={COL_X + 12}
                labelY={COL_A - 32}
                align="start"
              />
              <line
                x1={COL_X - 28}
                y1={COL_CUT}
                x2={COL_X + 28}
                y2={COL_CUT}
                stroke={INTERNAL}
                strokeWidth={1.5}
                strokeDasharray="6 4"
              />
              <text x={COL_X + 34} y={COL_CUT + 4} fontSize={8.5} fill={INTERNAL}>
                y = 2 m
              </text>
              <ArrowY
                x={COL_X}
                from={COL_CUT - 34}
                to={COL_CUT - 4}
                color={INTERNAL}
                marker="ex-ff-internal"
                label="N = −36 kN"
                labelX={COL_X + 8}
                labelY={COL_CUT - 40}
                align="start"
              />
              <ArrowX
                y={COL_CUT}
                from={COL_X + 4}
                to={COL_X + 38}
                color={INTERNAL}
                marker="ex-ff-internal"
                label="T = 10 kN"
                labelY={COL_CUT - 7}
              />
              <MomentArc
                x={COL_X}
                y={COL_CUT}
                radius={19}
                label="M = 164 kN·m"
                labelX={COL_X - 42}
                labelY={COL_CUT - 26}
              />

              <line x1={M_COL_BASE_X} y1={COL_B} x2={M_COL_BASE_X} y2={COL_A} stroke={MUTED} strokeWidth={1} />
              <text x={M_COL_BASE_X} y={COL_A + 20} textAnchor="middle" fontSize={11} fontWeight={700} fill={MOMENT}>
                M
              </text>
              <motion.path
                d={`M ${M_COL_BASE_X + 184 * M_COL_SCALE} ${COL_A} L ${M_COL_BASE_X + 144 * M_COL_SCALE} ${COL_B}`}
                fill="none"
                stroke={MOMENT}
                strokeWidth={2.6}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: reveal }}
              />
              <text x={M_COL_BASE_X + 184 * M_COL_SCALE + 6} y={COL_A - 4} fontSize={8.5} fill={MOMENT}>
                184
              </text>
              <text x={M_COL_BASE_X + 144 * M_COL_SCALE + 6} y={COL_B + 4} fontSize={8.5} fill={MOMENT}>
                144
              </text>
              <circle cx={M_COL_BASE_X + 164 * M_COL_SCALE} cy={COL_CUT} r={3.4} fill={MOMENT} />
              <text x={M_COL_BASE_X + 164 * M_COL_SCALE + 6} y={COL_CUT - 7} fontSize={8.5} fill={MOMENT}>
                164
              </text>
            </g>
          )}

          {isNode && (
            <g>
              <line x1={170} y1={180} x2={410} y2={180} stroke={EDGE} strokeWidth={6} />
              <line x1={170} y1={180} x2={170} y2={340} stroke={EDGE} strokeWidth={6} />
              <circle cx={170} cy={180} r={14} fill="none" stroke={MOMENT} strokeWidth={2} />
              <line x1={192} y1={180} x2={258} y2={180} stroke={MOMENT} strokeWidth={1.5} strokeDasharray="4 3" />
              <text x={262} y={184} fontSize={8.5} fill={MOMENT}>
                M_beam = −144
              </text>
              <line x1={170} y1={202} x2={170} y2={258} stroke={MOMENT} strokeWidth={1.5} strokeDasharray="4 3" />
              <text x={178} y={272} fontSize={8.5} fill={MOMENT}>
                M_kol = +144
              </text>
              <ArrowY
                x={214}
                from={192}
                to={228}
                color={REACT}
                marker="ex-ff-react"
                label="N = 36 kN"
                labelX={224}
                labelY={214}
                align="start"
              />
              <ArrowX y={162} from={180} to={224} color={REACT} marker="ex-ff-react" label="T = 10 kN" labelY={150} />
              <text x={410} y={150} textAnchor="end" fontSize={9} fill={OK}>
                M_beam + M_kol = 0
              </text>
              <text x={410} y={166} textAnchor="end" fontSize={9} fill={OK}>
                siły N i T zmieniają role w węźle
              </text>
            </g>
          )}

          {isCheck && (
            <g>
              <line x1={AX} y1={BY + 32} x2={CX} y2={BY + 32} stroke={MUTED} strokeWidth={1} />
              <motion.path
                d={`M ${AX} ${BY + 32 + 36} L ${(AX + CX) / 2} ${BY + 32 + 13.5} L ${CX} ${BY + 32}`}
                fill="none"
                stroke={MOMENT}
                strokeWidth={2.3}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: reveal }}
              />
              <text x={AX + 4} y={BY + 84} fontSize={8.5} fill={MOMENT}>
                −144
              </text>
              <text x={(AX + CX) / 2} y={BY + 52} textAnchor="middle" fontSize={8.5} fill={MOMENT}>
                −54
              </text>
              <text x={CX} y={BY + 22} textAnchor="middle" fontSize={8.5} fill={MOMENT}>
                0
              </text>
              <line x1={AX - 44} y1={AY} x2={AX - 44} y2={BY} stroke={MUTED} strokeWidth={1} />
              <motion.path
                d={`M ${AX - 44 - 37} ${AY} L ${AX - 44 - 29} ${BY}`}
                fill="none"
                stroke={MOMENT}
                strokeWidth={2.3}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: reveal }}
              />
              <text x={AX - 82} y={AY} textAnchor="end" fontSize={8.5} fill={MOMENT}>
                184
              </text>
              <text x={AX - 70} y={BY + 4} textAnchor="end" fontSize={8.5} fill={MOMENT}>
                144
              </text>
              <text x={CX} y={BY + 102} textAnchor="end" fontSize={9} fill={OK}>
                M_C = 0, M_B^belka + M_B^kol = 0
              </text>
            </g>
          )}

          <text x="230" y="358" textAnchor="middle" fontSize={10.5} fill={INK}>
            {isBeam
              ? 'Belka: T liniowo od 36 do 12 kN, M parabola od −144 do 0'
              : isColumn
                ? 'Kolumna: N ściska, T = 10 kN, M maleje liniowo od 184 do 144'
                : isNode
                  ? 'Węzeł B domyka całe zadanie: momenty i siły znoszą się parami'
                  : isCheck
                    ? 'Warunki brzegowe i kształty wykresów potwierdzają rozwiązanie'
                    : isReaction
                      ? 'Najpierw reakcje: 10 kN w lewo, 36 kN w górę i 184 kN·m'
                      : 'Od schematu przez reakcje i przekroje do pełnych wykresów'}
          </text>
        </svg>
      </div>
    </div>
  )
}
