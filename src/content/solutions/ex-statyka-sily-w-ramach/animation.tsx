import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const LOAD = '#ff6b45'
const REACT = '#2e9e6b'
const INTERNAL = '#4f6df5'
const MOMENT = '#a970dd'
const OK = '#2e9e6b'
const MUTED = '#87929d'
const EDGE = '#68727e'
const INK = '#17202a'

const AX = 110
const AY = 292
const BX = 110
const BY = 100
const CX = 366
const CUT_BEAM = 238
const CUT_COL = 196

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
  align = 'middle',
}: {
  y: number
  from: number
  to: number
  color: string
  marker: string
  label: string
  labelY: number
  align?: 'start' | 'middle' | 'end'
}) {
  return (
    <g>
      <line x1={from} y1={y} x2={to} y2={y} stroke={color} strokeWidth={2.3} markerEnd={`url(#${marker})`} />
      <text x={(from + to) / 2} y={labelY} textAnchor={align} fontSize={8.8} fill={color}>
        {label}
      </text>
    </g>
  )
}

function Support({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <line x1={x - 30} y1={y + 2} x2={x + 30} y2={y + 2} stroke={EDGE} strokeWidth={3} />
      {Array.from({ length: 7 }, (_, index) => (
        <line
          key={`hatch-${index}`}
          x1={x - 28 + index * 9}
          y1={y + 4}
          x2={x - 34 + index * 9}
          y2={y + 14}
          stroke={EDGE}
          strokeWidth={1.3}
        />
      ))}
      <circle cx={x} cy={y} r={3.4} fill={EDGE} />
      <text x={x - 38} y={y - 6} textAnchor="end" fontSize={10} fontWeight={600} fill={EDGE}>
        A
      </text>
    </g>
  )
}

function MomentArc({
  x,
  y,
  radius = 22,
  reverse = false,
  color = MOMENT,
  marker,
  label,
  labelX,
  labelY,
}: {
  x: number
  y: number
  radius?: number
  reverse?: boolean
  color?: string
  marker: string
  label: string
  labelX: number
  labelY: number
}) {
  const d = reverse
    ? `M ${x - radius} ${y - 4} A ${radius} ${radius} 0 1 0 ${x + radius} ${y - 4}`
    : `M ${x + radius} ${y - 4} A ${radius} ${radius} 0 1 1 ${x - radius} ${y - 4}`
  return (
    <g>
      <path d={d} fill="none" stroke={color} strokeWidth={1.9} markerEnd={`url(#${marker})`} />
      <text x={labelX} y={labelY} textAnchor="middle" fontSize={8.5} fill={color}>
        {label}
      </text>
    </g>
  )
}

export function FrameForcesAnimation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const reveal = playing ? smooth(sceneProgress) : 1
  const isModel = metric === 'model'
  const isReaction = metric === 'reaction'
  const isBeam = metric === 'beam'
  const isColumn = metric === 'column'
  const isNode = metric === 'node'
  const isDiagrams = metric === 'diagrams'
  const beamOpacity = isColumn ? 0.3 : isDiagrams ? 0.4 : 1
  const columnOpacity = isBeam ? 0.3 : isDiagrams ? 0.4 : 1

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 350"
          role="img"
          aria-label="Rama L: kolumna utwierdzona, belka, reakcje, przekroje, węzeł i wykresy momentu."
        >
          <title>Siły wewnętrzne w ramie L</title>
          <desc>Rama o wysokości 3 m i długości 4 m, obciążona siłami 8 i 6 kN w końcu belki.</desc>
          <defs>
            <marker
              id="ex-fr-load"
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
              id="ex-fr-react"
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
              id="ex-fr-internal"
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
              id="ex-fr-moment"
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

          <line x1={AX} y1={BY} x2={AX} y2={AY} stroke={EDGE} strokeWidth={6} opacity={columnOpacity} />
          <line x1={BX} y1={BY} x2={CX} y2={BY} stroke={EDGE} strokeWidth={6} opacity={beamOpacity} />
          {isReaction && (
            <g>
              <line x1={AX} y1={BY} x2={AX} y2={AY} stroke={EDGE} strokeWidth={6} />
              <line x1={BX} y1={BY} x2={CX} y2={BY} stroke={EDGE} strokeWidth={6} />
            </g>
          )}
          <Support x={AX} y={AY} />
          <circle cx={BX} cy={BY} r={4.5} fill={EDGE} />
          <text x={BX - 12} y={BY - 8} textAnchor="end" fontSize={10} fontWeight={600} fill={EDGE}>
            B
          </text>
          <text x={CX + 8} y={BY - 8} fontSize={10} fontWeight={600} fill={EDGE}>
            C
          </text>

          <line x1={CX} y1={BY - 46} x2={CX} y2={BY - 7} stroke={LOAD} strokeWidth={2.5} markerEnd="url(#ex-fr-load)" />
          <text x={CX} y={BY - 54} textAnchor="middle" fontSize={9} fontWeight={600} fill={LOAD}>
            P = 8 kN
          </text>
          <line x1={CX + 5} y1={BY} x2={CX + 43} y2={BY} stroke={LOAD} strokeWidth={2.5} markerEnd="url(#ex-fr-load)" />
          <text x={CX + 24} y={BY + 16} textAnchor="middle" fontSize={9} fontWeight={600} fill={LOAD}>
            H = 6 kN
          </text>

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
                h = 3 m
              </text>
              <line x1={BX} y1={BY + 46} x2={CX} y2={BY + 46} stroke={MUTED} strokeWidth={1} />
              <line x1={BX} y1={BY + 42} x2={BX} y2={BY + 50} stroke={MUTED} strokeWidth={1} />
              <line x1={CX} y1={BY + 42} x2={CX} y2={BY + 50} stroke={MUTED} strokeWidth={1} />
              <text x={(BX + CX) / 2} y={BY + 40} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                L = 4 m
              </text>
            </g>
          )}

          {isReaction && (
            <g>
              <ArrowX
                y={AY}
                from={AX - 4}
                to={AX - 48}
                color={REACT}
                marker="ex-fr-react"
                label="A_x = 6 kN"
                labelY={AY + 18}
              />
              <ArrowY
                x={AX + 5}
                from={AY - 2}
                to={AY - 48}
                color={REACT}
                marker="ex-fr-react"
                label="A_y = 8 kN"
                labelX={AX + 12}
                labelY={AY - 34}
                align="start"
              />
              <MomentArc
                x={AX}
                y={AY}
                radius={25}
                marker="ex-fr-moment"
                label="M_A = 50 kN·m"
                labelX={AX + 44}
                labelY={AY - 22}
              />
              <text x={CX + 4} y={BY + 42} textAnchor="end" fontSize={8.5} fill={MUTED}>
                M_A = 8·4 + 6·3
              </text>
            </g>
          )}

          {isBeam && (
            <g>
              <line x1={BX} y1={BY} x2={CUT_BEAM} y2={BY} stroke={EDGE} strokeWidth={6} opacity={0.25} />
              <line x1={CUT_BEAM} y1={BY} x2={CX} y2={BY} stroke={INTERNAL} strokeWidth={5} />
              <line
                x1={CUT_BEAM}
                y1={BY - 34}
                x2={CUT_BEAM}
                y2={BY + 36}
                stroke={INTERNAL}
                strokeWidth={1.6}
                strokeDasharray="6 4"
              />
              <text x={CUT_BEAM} y={BY - 40} textAnchor="middle" fontSize={8.5} fill={INTERNAL}>
                x = 2 m
              </text>
              <ArrowX
                y={BY}
                from={CUT_BEAM + 12}
                to={CUT_BEAM + 46}
                color={INTERNAL}
                marker="ex-fr-internal"
                label="N = −6 kN"
                labelY={BY - 10}
              />
              <ArrowY
                x={CUT_BEAM + 5}
                from={BY + 10}
                to={BY - 32}
                color={INTERNAL}
                marker="ex-fr-internal"
                label="T = 8 kN"
                labelX={CUT_BEAM + 12}
                labelY={BY + 48}
                align="start"
              />
              <MomentArc
                x={CUT_BEAM}
                y={BY}
                radius={20}
                reverse
                marker="ex-fr-moment"
                label="M = −16 kN·m"
                labelX={CUT_BEAM + 4}
                labelY={BY - 30}
              />
              <line x1={CUT_BEAM} y1={BY + 48} x2={CX} y2={BY + 48} stroke={MUTED} strokeWidth={1} />
              <line x1={CUT_BEAM} y1={BY + 44} x2={CUT_BEAM} y2={BY + 52} stroke={MUTED} strokeWidth={1} />
              <line x1={CX} y1={BY + 44} x2={CX} y2={BY + 52} stroke={MUTED} strokeWidth={1} />
              <text x={(CUT_BEAM + CX) / 2} y={BY + 42} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                2 m
              </text>
            </g>
          )}

          {isColumn && (
            <g>
              <line x1={AX} y1={AY} x2={AX} y2={CUT_COL} stroke={INTERNAL} strokeWidth={5} />
              <line x1={AX} y1={CUT_COL} x2={AX} y2={BY} stroke={EDGE} strokeWidth={6} opacity={0.25} />
              <line
                x1={AX - 30}
                y1={CUT_COL}
                x2={AX + 30}
                y2={CUT_COL}
                stroke={INTERNAL}
                strokeWidth={1.6}
                strokeDasharray="6 4"
              />
              <text x={AX + 36} y={CUT_COL + 4} fontSize={8.5} fill={INTERNAL}>
                y = 1,5 m
              </text>
              <ArrowY
                x={AX}
                from={CUT_COL + 10}
                to={CUT_COL + 44}
                color={INTERNAL}
                marker="ex-fr-internal"
                label="N = −8 kN"
                labelX={AX + 8}
                labelY={CUT_COL + 58}
                align="start"
              />
              <ArrowX
                y={CUT_COL}
                from={AX + 6}
                to={AX + 44}
                color={INTERNAL}
                marker="ex-fr-internal"
                label="T = 6 kN"
                labelY={CUT_COL - 8}
              />
              <MomentArc
                x={AX}
                y={CUT_COL}
                radius={20}
                marker="ex-fr-moment"
                label="M = 41 kN·m"
                labelX={AX - 42}
                labelY={CUT_COL - 28}
              />
              <line x1={AX - 20} y1={AY - 7} x2={AX - 20} y2={CUT_COL} stroke={MUTED} strokeWidth={1} />
              <text
                x={AX - 26}
                y={(AY + CUT_COL) / 2}
                textAnchor="middle"
                fontSize={8.5}
                fill={MUTED}
                transform={`rotate(-90 ${AX - 26} ${(AY + CUT_COL) / 2})`}
              >
                1,5 m
              </text>
            </g>
          )}

          {isNode && (
            <g>
              <circle cx={BX} cy={BY} r={13} fill="none" stroke={MOMENT} strokeWidth={2} />
              <line x1={BX + 20} y1={BY} x2={BX + 76} y2={BY} stroke={MOMENT} strokeWidth={1.5} strokeDasharray="4 3" />
              <text x={BX + 78} y={BY + 4} fontSize={8.5} fill={MOMENT}>
                belka: −32
              </text>
              <line x1={BX} y1={BY + 20} x2={BX} y2={BY + 62} stroke={MOMENT} strokeWidth={1.5} strokeDasharray="4 3" />
              <text x={BX + 6} y={BY + 74} fontSize={8.5} fill={MOMENT}>
                kolumna: +32
              </text>
              <ArrowY
                x={BX + 36}
                from={BY + 16}
                to={BY + 48}
                color={REACT}
                marker="ex-fr-react"
                label="P = 8 kN"
                labelX={BX + 44}
                labelY={BY + 42}
                align="start"
              />
              <ArrowX
                y={BY + 12}
                from={BX + 4}
                to={BX + 46}
                color={REACT}
                marker="ex-fr-react"
                label="H = 6 kN"
                labelY={BY + 2}
              />
              <text x={CX} y={BY + 82} textAnchor="end" fontSize={9} fill={OK}>
                ΣM_B = 0 → M_beam = −M_kol
              </text>
            </g>
          )}

          {isDiagrams && (
            <g>
              <line x1={BX} y1={BY + 26} x2={CX} y2={BY + 26} stroke={MUTED} strokeWidth={1} />
              <motion.path
                d={`M ${BX} ${BY + 26 + 32 * 1.5} L ${CX} ${BY + 26}`}
                fill="none"
                stroke={MOMENT}
                strokeWidth={2.4}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: reveal }}
              />
              <text x={BX + 4} y={BY + 88} fontSize={8.5} fill={MOMENT}>
                M −32 kN·m
              </text>
              <text x={CX} y={BY + 16} textAnchor="middle" fontSize={8.5} fill={MOMENT}>
                0
              </text>
              <line x1={AX - 38} y1={AY} x2={AX - 38} y2={BY} stroke={MUTED} strokeWidth={1} />
              <motion.path
                d={`M ${AX - 38 - 40} ${AY} L ${AX - 38 - 25.6} ${BY}`}
                fill="none"
                stroke={MOMENT}
                strokeWidth={2.4}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: reveal }}
              />
              <text x={AX - 82} y={AY + 16} textAnchor="end" fontSize={8.5} fill={MOMENT}>
                50 kN·m
              </text>
              <text x={AX - 60} y={BY + 16} textAnchor="end" fontSize={8.5} fill={MOMENT}>
                32
              </text>
              <text x={CX - 8} y={BY + 92} textAnchor="end" fontSize={8.5} fill={INTERNAL}>
                T_belka = 8 kN
              </text>
              <text x={AX + 8} y={BY + 18} fontSize={8.5} fill={INTERNAL}>
                T_kol = 6 kN
              </text>
            </g>
          )}

          <text x="230" y="336" textAnchor="middle" fontSize={10.5} fill={INK}>
            {isNode
              ? 'Węzeł sztywny przenosi moment i zamienia siły między belką a kolumną'
              : isDiagrams
                ? 'W belce M liniowo od −32 do 0, w kolumnie od 50 do 32 kN·m'
                : isColumn
                  ? 'W kolumnie pionowa siła to N, a pozioma to T'
                  : isBeam
                    ? 'W belce pozioma siła to N, a pionowa to T'
                    : 'Lokalny układ osi i konwencja znaków obowiązują w każdym pręcie'}
          </text>
        </svg>
      </div>
    </div>
  )
}
