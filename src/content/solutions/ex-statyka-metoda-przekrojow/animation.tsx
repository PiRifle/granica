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
const LIGHT = '#dfe6f2'

const L = 6
const A = 2
const CUT = 3
const X0 = 58
const X1 = 418
const BEAM_Y = 108
const SPAN = X1 - X0
const xAt = (metres: number) => X0 + (metres / L) * SPAN
const cutX = xAt(CUT)
const loadX = xAt(A)

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
      <path d={`M ${x - 11} ${BEAM_Y + 17} L ${x} ${BEAM_Y + 3} L ${x + 11} ${BEAM_Y + 17} Z`} fill={EDGE} />
      {roller && (
        <g fill={EDGE}>
          <circle cx={x - 5} cy={BEAM_Y + 22} r={3} />
          <circle cx={x + 5} cy={BEAM_Y + 22} r={3} />
        </g>
      )}
      <text x={x} y={BEAM_Y + 40} textAnchor="middle" fontSize={10} fontWeight={600} fill={EDGE}>
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

export function MethodOfSectionsAnimation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const reveal = playing ? smooth(sceneProgress) : 1
  const isModel = metric === 'model'
  const isReaction = metric === 'reaction'
  const isCut = metric === 'cut' || metric === 'T' || metric === 'M'
  const isCheck = metric === 'check'
  const showReactions = !isModel
  const showCut = isCut || isCheck
  const showLoad = !isCheck
  const leftOpacity = isCheck ? 0.25 : 1
  const rightOpacity = isCheck ? 1 : showCut ? 0.3 : 1

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 320"
          role="img"
          aria-label="Metoda przekrojów: belka, reakcje, cięcie w x równym 3 m, siła tnąca i moment zginający."
        >
          <title>Metoda przekrojów dla belki z siłą skupioną</title>
          <desc>Belka o rozpiętości 6 m, reakcje 8 i 4 kN, przekrój w x = 3 m i kontrola z prawej strony.</desc>
          <defs>
            <marker
              id="ex-mp-load"
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
              id="ex-mp-react"
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
              id="ex-mp-internal"
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
              id="ex-mp-moment"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="5.5"
              markerHeight="5.5"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={MOMENT} />
            </marker>
          </defs>

          <line
            x1={X0}
            y1={BEAM_Y}
            x2={showCut ? cutX : X1}
            y2={BEAM_Y}
            stroke={EDGE}
            strokeWidth={5}
            opacity={leftOpacity}
          />
          <line x1={cutX} y1={BEAM_Y} x2={X1} y2={BEAM_Y} stroke={EDGE} strokeWidth={5} opacity={rightOpacity} />
          <Support x={X0} label="A" />
          <Support x={X1} label="B" roller />

          {showLoad && (
            <motion.g initial={false} animate={{ opacity: 1 }}>
              <line
                x1={loadX}
                y1={48}
                x2={loadX}
                y2={BEAM_Y - 8}
                stroke={LOAD}
                strokeWidth={2.6}
                markerEnd="url(#ex-mp-load)"
              />
              <text x={loadX} y={42} textAnchor="middle" fontSize={9.5} fontWeight={600} fill={LOAD}>
                P = 12 kN
              </text>
            </motion.g>
          )}

          {showReactions && (
            <g>
              <ArrowY
                x={X0 + 16}
                from={BEAM_Y + 54}
                to={BEAM_Y + 6}
                color={REACT}
                marker="ex-mp-react"
                label="R_A = 8 kN"
                labelY={BEAM_Y + 68}
              />
              <ArrowY
                x={X1 - 16}
                from={BEAM_Y + 54}
                to={BEAM_Y + 6}
                color={REACT}
                marker="ex-mp-react"
                label="R_B = 4 kN"
                labelY={BEAM_Y + 68}
              />
            </g>
          )}

          {showCut && (
            <motion.g initial={false} animate={{ opacity: 1 }}>
              <line
                x1={cutX}
                y1={46}
                x2={cutX}
                y2={BEAM_Y + 32}
                stroke={isCheck ? MUTED : INTERNAL}
                strokeWidth={1.6}
                strokeDasharray="6 4"
              />
              <text x={cutX} y={40} textAnchor="middle" fontSize={8.5} fill={isCheck ? MUTED : INTERNAL}>
                przekrój x = 3 m
              </text>
            </motion.g>
          )}

          {isCut && (
            <g>
              <line
                x1={cutX - 9}
                y1={BEAM_Y - 14}
                x2={cutX + 9}
                y2={BEAM_Y - 14}
                stroke={INTERNAL}
                strokeWidth={2}
                markerEnd="url(#ex-mp-internal)"
                opacity={0.55}
              />
              <text x={cutX + 14} y={BEAM_Y - 18} fontSize={8.5} fill={INTERNAL}>
                N = 0
              </text>
              <ArrowY
                x={cutX + 5}
                from={BEAM_Y - 8}
                to={BEAM_Y + 34}
                color={INTERNAL}
                marker="ex-mp-internal"
                label={metric === 'T' || metric === 'M' ? 'T = −4 kN' : 'T'}
                labelX={cutX + 12}
                labelY={BEAM_Y + 48}
                align="start"
              />
              <motion.path
                d={`M ${cutX + 22} ${BEAM_Y - 4} A 22 22 0 1 1 ${cutX - 22} ${BEAM_Y - 4}`}
                fill="none"
                stroke={MOMENT}
                strokeWidth={2}
                markerEnd="url(#ex-mp-moment)"
                initial={false}
                animate={{ opacity: metric === 'M' ? 1 : 0.45 }}
              />
              <text x={cutX + 28} y={BEAM_Y - 28} fontSize={8.5} fill={MOMENT}>
                M = 12 kN·m
              </text>
            </g>
          )}

          {isCheck && (
            <g>
              <ArrowY
                x={cutX - 5}
                from={BEAM_Y + 8}
                to={BEAM_Y - 34}
                color={INTERNAL}
                marker="ex-mp-internal"
                label="T = −4 kN"
                labelX={cutX + 8}
                labelY={BEAM_Y + 48}
                align="start"
              />
              <motion.path
                d={`M ${cutX - 22} ${BEAM_Y - 4} A 22 22 0 1 0 ${cutX + 22} ${BEAM_Y - 4}`}
                fill="none"
                stroke={MOMENT}
                strokeWidth={2}
                markerEnd="url(#ex-mp-moment)"
              />
              <text x={cutX + 28} y={BEAM_Y - 28} fontSize={8.5} fill={MOMENT}>
                M = 12 kN·m
              </text>
              <text x={cutX + 14} y={BEAM_Y + 74} fontSize={9} fill={REACT}>
                prawa część: tylko R_B
              </text>
            </g>
          )}

          {isModel && (
            <g>
              <Dimension x1={X0} x2={loadX} y={BEAM_Y + 84} label="a = 2 m" />
              <Dimension x1={loadX} x2={cutX} y={BEAM_Y + 108} label="1 m" />
              <Dimension x1={X0} x2={X1} y={BEAM_Y + 132} label="L = 6 m" />
            </g>
          )}

          {isReaction && (
            <g>
              <Dimension x1={X0} x2={loadX} y={BEAM_Y + 92} label="a = 2 m" />
              <Dimension x1={loadX} x2={X1} y={BEAM_Y + 116} label="L − a = 4 m" />
            </g>
          )}

          {metric === 'T' && (
            <g stroke={LOAD} strokeWidth={1.4} fill="none">
              <path d={`M ${X0 + 30} ${BEAM_Y + 34} L ${X0 + 30} ${BEAM_Y + 12}`} markerEnd="url(#ex-mp-load)" />
              <path d={`M ${loadX} ${BEAM_Y - 6} L ${loadX} ${BEAM_Y + 30}`} markerEnd="url(#ex-mp-load)" />
            </g>
          )}

          {metric === 'M' && (
            <g>
              <Dimension x1={X0 + 18} x2={cutX} y={BEAM_Y + 88} label="3 m" />
              <Dimension x1={loadX} x2={cutX} y={BEAM_Y + 88} label="1 m" />
              <text x={X1} y={BEAM_Y + 104} textAnchor="end" fontSize={8.5} fill={MOMENT}>
                M = R_A·3 − P·1
              </text>
            </g>
          )}

          {isCheck && (
            <g>
              <Dimension x1={cutX} x2={X1} y={BEAM_Y + 92} label="3 m" />
              <text x={cutX + 4} y={BEAM_Y + 118} fontSize={8.5} fill={REACT}>
                M = 4·3 = 12 kN·m
              </text>
            </g>
          )}

          <text x="230" y="308" textAnchor="middle" fontSize={10.5} fill={INK}>
            {isCheck
              ? 'Kontrola: lewa i prawa strona cięcia dają ten sam wynik'
              : isModel
                ? 'Najpierw reakcje, potem cięcie i równowaga odciętej części'
                : 'Dodatnie N, T, M rysujemy na ścianie cięcia'}
          </text>

          <motion.circle
            cx={cutX}
            cy={BEAM_Y}
            r={4}
            fill={INTERNAL}
            initial={false}
            animate={{ opacity: showCut ? 1 : 0 }}
          />
          <motion.line
            x1={loadX}
            y1={BEAM_Y - 2}
            x2={loadX}
            y2={BEAM_Y + 2}
            stroke={LOAD}
            strokeWidth={2}
            initial={false}
            animate={{ opacity: showLoad ? reveal : 0 }}
          />
        </svg>
      </div>
    </div>
  )
}
