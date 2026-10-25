import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const LOAD = '#ff6b45'
const REACT = '#2e9e6b'
const INTERNAL = '#4f6df5'
const MOMENT = '#a970dd'
const MUTED = '#87929d'
const EDGE = '#68727e'
const INK = '#17202a'

const L = 8
const B_AT = 6
const X0 = 42
const X1 = 416
const BEAM_Y = 106
const SPAN = X1 - X0
const xAt = (metres: number) => X0 + (metres / L) * SPAN
const aX = xAt(0)
const bX = xAt(B_AT)
const cX = xAt(8)
const cut3 = xAt(3)
const cut7 = xAt(7)
const cutMid = xAt(4)

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
      <line x1={x} y1={from} x2={x} y2={to} stroke={color} strokeWidth={2.2} markerEnd={`url(#${marker})`} />
      <text x={labelX} y={labelY} textAnchor={align} fontSize={9} fill={color}>
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
      <line x1={from} y1={y} x2={to} y2={y} stroke={color} strokeWidth={1.8} markerEnd={`url(#${marker})`} />
      <text x={(from + to) / 2} y={labelY} textAnchor="middle" fontSize={8} fill={color}>
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

function MomentArc({
  x,
  reverse = false,
  label,
  labelX,
}: {
  x: number
  reverse?: boolean
  label: string
  labelX: number
}) {
  return (
    <g>
      <path
        d={
          reverse
            ? `M ${x - 19} ${BEAM_Y - 5} A 19 19 0 1 0 ${x + 19} ${BEAM_Y - 5}`
            : `M ${x + 19} ${BEAM_Y - 5} A 19 19 0 1 1 ${x - 19} ${BEAM_Y - 5}`
        }
        fill="none"
        stroke={MOMENT}
        strokeWidth={1.8}
        markerEnd="url(#ex-zn-moment)"
      />
      <text x={labelX} y={BEAM_Y - 32} textAnchor="middle" fontSize={8.5} fill={MOMENT}>
        {label}
      </text>
    </g>
  )
}

export function SignConventionAnimation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const reveal = playing ? smooth(sceneProgress) : 1
  const isModel = metric === 'model'
  const isReaction = metric === 'reaction'
  const isConvention = metric === 'convention'
  const isSection3 = metric === 'section3'
  const isSection7 = metric === 'section7'
  const isControl = metric === 'control'
  const showReactions = !isModel && !isConvention
  const gap = isConvention ? 9 : 0

  const leftEnd = isConvention ? cutMid - gap : isSection7 || isControl ? cut7 : isSection3 ? cut3 : X1
  const rightStart = isConvention ? cutMid + gap : isSection3 ? cut3 : X0

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 320"
          role="img"
          aria-label="Belka z przewieszeniem, reakcje, konwencja znaków i moment nad podporą B."
        >
          <title>Znaki N, T i M dla belki z przewieszeniem</title>
          <desc>Belka o długości 8 m z podporami w 0 i 6 m, siłą 10 kN na końcu oraz wykresem momentu.</desc>
          <defs>
            <marker
              id="ex-zn-load"
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
              id="ex-zn-react"
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
              id="ex-zn-internal"
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
              id="ex-zn-moment"
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

          <line x1={X0} y1={BEAM_Y} x2={leftEnd} y2={BEAM_Y} stroke={EDGE} strokeWidth={5} />
          <line
            x1={rightStart}
            y1={BEAM_Y}
            x2={X1}
            y2={BEAM_Y}
            stroke={EDGE}
            strokeWidth={5}
            opacity={isSection3 ? 0.28 : isSection7 ? 1 : isConvention ? 1 : 1}
          />
          <Support x={aX} label="A" />
          <Support x={bX} label="B" roller />

          <motion.g initial={false} animate={{ opacity: 1 }}>
            <line
              x1={cX}
              y1={46}
              x2={cX}
              y2={BEAM_Y - 8}
              stroke={LOAD}
              strokeWidth={2.5}
              markerEnd="url(#ex-zn-load)"
            />
            <text x={cX} y={40} textAnchor="middle" fontSize={9.5} fontWeight={600} fill={LOAD}>
              P = 10 kN
            </text>
          </motion.g>

          {showReactions && (
            <g>
              <ArrowY
                x={aX + 15}
                from={BEAM_Y + 6}
                to={BEAM_Y + 54}
                color={REACT}
                marker="ex-zn-react"
                label={isModel ? 'A_y' : 'A_y = −3,33 kN'}
                labelY={BEAM_Y + 68}
              />
              <ArrowY
                x={bX - 15}
                from={BEAM_Y + 54}
                to={BEAM_Y + 6}
                color={REACT}
                marker="ex-zn-react"
                label={isModel ? 'R_B' : 'R_B = 13,33 kN'}
                labelY={BEAM_Y + 68}
              />
            </g>
          )}

          {isReaction && (
            <g>
              <text x={X1} y={BEAM_Y + 84} textAnchor="end" fontSize={9} fill={MUTED}>
                A_y założone w górę → wynik −3,33 kN, czyli zwrot w dół
              </text>
              <text x={X1} y={BEAM_Y + 102} textAnchor="end" fontSize={9} fill={MUTED}>
                R_B·6 = 10·8
              </text>
            </g>
          )}

          {isConvention && (
            <g>
              <line
                x1={cutMid - gap}
                y1={BEAM_Y - 12}
                x2={cutMid - gap}
                y2={BEAM_Y + 12}
                stroke={EDGE}
                strokeWidth={2}
              />
              <line
                x1={cutMid + gap}
                y1={BEAM_Y - 12}
                x2={cutMid + gap}
                y2={BEAM_Y + 12}
                stroke={EDGE}
                strokeWidth={2}
              />
              <ArrowX
                y={BEAM_Y - 32}
                from={cutMid - gap}
                to={cutMid - gap + 34}
                color={INTERNAL}
                marker="ex-zn-internal"
                label="N"
                labelY={BEAM_Y - 38}
              />
              <ArrowY
                x={cutMid - gap}
                from={BEAM_Y - 6}
                to={BEAM_Y + 34}
                color={INTERNAL}
                marker="ex-zn-internal"
                label="T"
                labelX={cutMid - gap - 5}
                labelY={BEAM_Y + 50}
                align="end"
              />
              <MomentArc x={cutMid - gap} label="M" labelX={cutMid - gap - 26} />
              <ArrowX
                y={BEAM_Y - 32}
                from={cutMid + gap}
                to={cutMid + gap - 34}
                color={INTERNAL}
                marker="ex-zn-internal"
                label="N"
                labelY={BEAM_Y - 38}
              />
              <ArrowY
                x={cutMid + gap}
                from={BEAM_Y + 34}
                to={BEAM_Y - 6}
                color={INTERNAL}
                marker="ex-zn-internal"
                label="T"
                labelX={cutMid + gap + 5}
                labelY={BEAM_Y + 50}
                align="start"
              />
              <MomentArc x={cutMid + gap} reverse label="M" labelX={cutMid + gap + 26} />
              <text x={cutMid - gap - 8} y={BEAM_Y + 76} textAnchor="middle" fontSize={8.5} fill={EDGE}>
                lewa część
              </text>
              <text x={cutMid + gap + 8} y={BEAM_Y + 76} textAnchor="middle" fontSize={8.5} fill={EDGE}>
                prawa część
              </text>
            </g>
          )}

          {isSection3 && (
            <g>
              <line
                x1={cut3}
                y1={44}
                x2={cut3}
                y2={BEAM_Y + 34}
                stroke={INTERNAL}
                strokeWidth={1.5}
                strokeDasharray="6 4"
              />
              <text x={cut3} y={38} textAnchor="middle" fontSize={8.5} fill={INTERNAL}>
                x = 3 m
              </text>
              <ArrowY
                x={cut3 + 5}
                from={BEAM_Y + 34}
                to={BEAM_Y - 8}
                color={INTERNAL}
                marker="ex-zn-internal"
                label="T = −3,33 kN"
                labelX={cut3 + 12}
                labelY={BEAM_Y + 48}
                align="start"
              />
              <MomentArc x={cut3} reverse label="M = −10 kN·m" labelX={cut3 + 4} />
              <text x={cut3 + 12} y={BEAM_Y + 66} fontSize={8.5} fill={REACT}>
                na lewo tylko A_y
              </text>
            </g>
          )}

          {isSection7 && (
            <g>
              <line
                x1={cut7}
                y1={44}
                x2={cut7}
                y2={BEAM_Y + 34}
                stroke={INTERNAL}
                strokeWidth={1.5}
                strokeDasharray="6 4"
              />
              <text x={cut7} y={38} textAnchor="middle" fontSize={8.5} fill={INTERNAL}>
                x = 7 m
              </text>
              <ArrowY
                x={cut7 - 5}
                from={BEAM_Y + 8}
                to={BEAM_Y - 34}
                color={INTERNAL}
                marker="ex-zn-internal"
                label="T = 10 kN"
                labelX={cut7 + 8}
                labelY={BEAM_Y + 50}
                align="start"
              />
              <MomentArc x={cut7} reverse label="M = −10 kN·m" labelX={cut7 - 6} />
              <Dimension x1={cut7} x2={cX} y={BEAM_Y + 44} label="1 m" />
              <text x={cut7 + 12} y={BEAM_Y + 66} fontSize={8.5} fill={REACT}>
                prawa część: tylko P
              </text>
            </g>
          )}

          {isModel && (
            <g>
              <Dimension x1={aX} x2={bX} y={BEAM_Y + 82} label="6 m" />
              <Dimension x1={bX} x2={cX} y={BEAM_Y + 106} label="2 m" />
              <text x={cX} y={BEAM_Y + 130} textAnchor="end" fontSize={8.5} fill={MUTED}>
                przewieszenie
              </text>
            </g>
          )}

          {isControl && (
            <g>
              <line x1={X0} y1={226} x2={X1} y2={226} stroke={MUTED} strokeWidth={1.3} />
              <path
                d={`M ${aX} 226 L ${bX} 288 L ${cX} 226`}
                fill="none"
                stroke={MOMENT}
                strokeWidth={2.4}
                strokeLinejoin="round"
                markerEnd="url(#ex-zn-moment)"
                opacity={0.35 + 0.65 * reveal}
              />
              <line x1={bX} y1={226} x2={bX} y2={288} stroke={MOMENT} strokeWidth={1.2} strokeDasharray="4 3" />
              <circle cx={bX} cy={288} r={3.4} fill={MOMENT} />
              <text x={bX - 8} y={302} textAnchor="end" fontSize={9} fontWeight={600} fill={MOMENT}>
                M_B = −20 kN·m
              </text>
              <text x={xAt(7) + 6} y={262} fontSize={8.5} fill={MOMENT}>
                −10
              </text>
              <text x={aX - 4} y={242} textAnchor="end" fontSize={8.5} fill={MUTED}>
                0
              </text>
              <text x={cX + 2} y={242} fontSize={8.5} fill={MUTED}>
                0
              </text>
              <text x={X1} y={316} textAnchor="end" fontSize={9} fill={INK}>
                wykres M: dodatni „uśmiech”, ujemny „smutek”
              </text>
            </g>
          )}

          <text x="230" y="308" textAnchor="middle" fontSize={10.5} fill={INK}>
            {isModel
              ? 'Przewieszenie zmienia znak momentu nad podporą B'
              : isControl
                ? 'Moment nad B jest ujemny, choć obciążenie działa w dół'
                : isConvention
                  ? 'Ta sama konwencja, dwa różne zwroty na ścianach cięcia'
                  : 'Ujemna reakcja lub moment to informacja o zwrocie, nie błąd'}
          </text>
        </svg>
      </div>
    </div>
  )
}
