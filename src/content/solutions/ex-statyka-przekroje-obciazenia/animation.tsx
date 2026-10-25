import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const LOAD = '#ff6b45'
const LOAD_DARK = '#d84f28'
const REACT = '#2e9e6b'
const INTERNAL = '#4f6df5'
const MOMENT = '#a970dd'
const MUTED = '#87929d'
const EDGE = '#68727e'
const INK = '#17202a'

const L = 6
const LOAD_END = 3
const X0 = 58
const X1 = 418
const BEAM_Y = 102
const LOAD_TOP = 58
const SPAN = X1 - X0
const xAt = (metres: number) => X0 + (metres / L) * SPAN
const cut2 = xAt(2)
const cut45 = xAt(4.5)

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
  width = 2.3,
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
  width?: number
}) {
  return (
    <g>
      <line x1={x} y1={from} x2={x} y2={to} stroke={color} strokeWidth={width} markerEnd={`url(#${marker})`} />
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

function DistributedLoad({ activeTo, fadedFrom }: { activeTo: number; fadedFrom?: number }) {
  const arrows = Array.from({ length: 13 }, (_, index) => (index / 12) * LOAD_END)
  return (
    <g>
      <line x1={xAt(0)} y1={LOAD_TOP} x2={xAt(LOAD_END)} y2={LOAD_TOP} stroke={LOAD} strokeWidth={1.3} />
      {arrows.map((metres, index) => {
        const x = xAt(metres)
        const active = metres <= activeTo + 1e-6
        const faded = fadedFrom != null && metres > fadedFrom + 1e-6
        return (
          <line
            key={`load-${index}`}
            x1={x}
            y1={LOAD_TOP}
            x2={x}
            y2={BEAM_Y - 5}
            stroke={faded ? MUTED : LOAD}
            strokeWidth={faded ? 1 : 1.5}
            markerEnd={faded ? undefined : 'url(#ex-po-load)'}
            opacity={faded ? 0.35 : active ? 1 : 0.28}
          />
        )
      })}
      <text x={xAt(LOAD_END) + 6} y={LOAD_TOP + 4} fontSize={8.5} fill={LOAD_DARK}>
        q = 4 kN/m
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
            ? `M ${x - 20} ${BEAM_Y - 4} A 20 20 0 1 0 ${x + 20} ${BEAM_Y - 4}`
            : `M ${x + 20} ${BEAM_Y - 4} A 20 20 0 1 1 ${x - 20} ${BEAM_Y - 4}`
        }
        fill="none"
        stroke={MOMENT}
        strokeWidth={1.9}
        markerEnd="url(#ex-po-moment)"
      />
      <text x={labelX} y={BEAM_Y - 34} textAnchor="middle" fontSize={8.5} fill={MOMENT}>
        {label}
      </text>
    </g>
  )
}

export function PartialLoadAnimation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const reveal = playing ? smooth(sceneProgress) : 1
  const isModel = metric === 'model'
  const isReaction = metric === 'reaction'
  const isPartial = metric === 'partial'
  const isInternal = metric === 'internal'
  const isOutside = metric === 'outside'
  const isCheck = metric === 'check'
  const cut = isOutside || isCheck ? cut45 : cut2
  const showCut = isPartial || isInternal || isOutside || isCheck
  const activeLoadTo = isPartial || isInternal ? 2 : LOAD_END
  const fadedFrom = isPartial || isInternal ? 2 : undefined

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 320"
          role="img"
          aria-label="Belka z obciążeniem ciągłym na części rozpiętości, wypadkowa częściowa i siły wewnętrzne."
        >
          <title>Przekroje przy obciążeniu ciągłym</title>
          <desc>Belka 6 m, obciążenie 4 kN/m na odcinku 3 m, przekroje w 2 m i 4,5 m.</desc>
          <defs>
            <marker
              id="ex-po-load"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="5.4"
              markerHeight="5.4"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={LOAD} />
            </marker>
            <marker
              id="ex-po-result"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={LOAD_DARK} />
            </marker>
            <marker
              id="ex-po-react"
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
              id="ex-po-internal"
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
              id="ex-po-moment"
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

          <line x1={X0} y1={BEAM_Y} x2={X1} y2={BEAM_Y} stroke={EDGE} strokeWidth={5} />
          <Support x={X0} label="A" />
          <Support x={X1} label="B" roller />

          <DistributedLoad activeTo={activeLoadTo} fadedFrom={fadedFrom} />

          {(isReaction || isModel) && (
            <ArrowY
              x={xAt(1.5)}
              from={34}
              to={BEAM_Y - 9}
              color={LOAD_DARK}
              marker="ex-po-result"
              label={isReaction ? 'W = 12 kN' : 'W'}
              labelY={28}
              width={3}
            />
          )}

          {(isPartial || isInternal) && (
            <ArrowY
              x={xAt(1)}
              from={34}
              to={BEAM_Y - 9}
              color={LOAD_DARK}
              marker="ex-po-result"
              label="W = 8 kN"
              labelY={28}
              width={3}
            />
          )}

          {isOutside && (
            <ArrowY
              x={xAt(1.5)}
              from={34}
              to={BEAM_Y - 9}
              color={LOAD_DARK}
              marker="ex-po-result"
              label="W = 12 kN"
              labelY={28}
              width={3}
            />
          )}

          <g>
            <ArrowY
              x={X0 + 15}
              from={BEAM_Y + 56}
              to={BEAM_Y + 6}
              color={REACT}
              marker="ex-po-react"
              label={isReaction ? 'R_A = 9 kN' : 'R_A'}
              labelY={BEAM_Y + 70}
            />
            <ArrowY
              x={X1 - 15}
              from={BEAM_Y + 56}
              to={BEAM_Y + 6}
              color={REACT}
              marker="ex-po-react"
              label={isReaction || isCheck ? 'R_B = 3 kN' : 'R_B'}
              labelY={BEAM_Y + 70}
            />
          </g>

          {showCut && (
            <motion.g initial={false} animate={{ opacity: 1 }}>
              <line
                x1={cut}
                y1={42}
                x2={cut}
                y2={BEAM_Y + 32}
                stroke={INTERNAL}
                strokeWidth={1.6}
                strokeDasharray="6 4"
              />
              <text x={cut} y={36} textAnchor="middle" fontSize={8.5} fill={INTERNAL}>
                {isOutside || isCheck ? 'x = 4,5 m' : 'x = 2 m'}
              </text>
              <circle cx={cut} cy={BEAM_Y} r={4} fill={INTERNAL} />
            </motion.g>
          )}

          {isInternal && (
            <g>
              <ArrowY
                x={cut + 5}
                from={BEAM_Y - 8}
                to={BEAM_Y + 34}
                color={INTERNAL}
                marker="ex-po-internal"
                label="T = 1 kN"
                labelX={cut + 12}
                labelY={BEAM_Y + 48}
                align="start"
              />
              <MomentArc x={cut} label="M = 10 kN·m" labelX={cut + 6} />
              <Dimension x1={X0} x2={xAt(1)} y={BEAM_Y + 92} label="1 m" />
              <Dimension x1={X0} x2={cut} y={BEAM_Y + 116} label="2 m" />
            </g>
          )}

          {isPartial && (
            <g>
              <Dimension x1={X0} x2={xAt(1)} y={BEAM_Y + 92} label="x/2 = 1 m" />
              <Dimension x1={X0} x2={cut} y={BEAM_Y + 116} label="x = 2 m" />
              <text x={cut + 12} y={BEAM_Y + 46} fontSize={8.5} fill={MUTED}>
                tylko fragment obciążenia po lewej
              </text>
            </g>
          )}

          {isOutside && (
            <g>
              <ArrowY
                x={cut - 5}
                from={BEAM_Y + 8}
                to={BEAM_Y - 34}
                color={INTERNAL}
                marker="ex-po-internal"
                label="T = −3 kN"
                labelX={cut + 8}
                labelY={BEAM_Y + 48}
                align="start"
              />
              <MomentArc x={cut} label="M = 4,5 kN·m" labelX={cut + 6} />
              <Dimension x1={X0} x2={X1} y={BEAM_Y + 96} label="L = 6 m" />
            </g>
          )}

          {isCheck && (
            <g>
              <line x1={cut} y1={BEAM_Y} x2={X1} y2={BEAM_Y} stroke={REACT} strokeWidth={3} opacity={0.35} />
              <ArrowY
                x={cut - 5}
                from={BEAM_Y - 34}
                to={BEAM_Y + 8}
                color={INTERNAL}
                marker="ex-po-internal"
                label="T = −3 kN"
                labelX={cut + 8}
                labelY={BEAM_Y + 48}
                align="start"
              />
              <MomentArc x={cut} reverse label="M = 4,5 kN·m" labelX={cut + 8} />
              <Dimension x1={cut} x2={X1} y={BEAM_Y + 92} label="1,5 m" />
              <text x={cut + 12} y={BEAM_Y + 68} fontSize={8.5} fill={REACT}>
                prawa część bez obciążenia
              </text>
            </g>
          )}

          {isModel && (
            <g>
              <Dimension x1={X0} x2={xAt(LOAD_END)} y={BEAM_Y + 82} label="3 m" />
              <Dimension x1={xAt(LOAD_END)} x2={X1} y={BEAM_Y + 106} label="3 m" />
              <text x={X1} y={BEAM_Y + 130} textAnchor="end" fontSize={8.5} fill={MUTED}>
                poza tym odcinkiem q = 0
              </text>
            </g>
          )}

          {isReaction && (
            <g>
              <Dimension x1={X0} x2={xAt(1.5)} y={BEAM_Y + 92} label="1,5 m" />
              <Dimension x1={X0} x2={X1} y={BEAM_Y + 116} label="6 m" />
            </g>
          )}

          <motion.text
            x="230"
            y="308"
            textAnchor="middle"
            fontSize={10.5}
            fill={INK}
            initial={false}
            animate={{ opacity: 1 }}
          >
            {isCheck
              ? 'Kontrola z prawej: M = 3·1,5 = 4,5 kN·m'
              : isPartial
                ? 'Cięcie przechodzi przez obciążenie — bierzemy tylko jego lewą część'
                : isOutside
                  ? 'Poza obciążeniem cała wypadkowa leży po lewej stronie'
                  : 'Wypadkowa zastępuje wyłącznie rozkład po wybranej stronie przekroju'}
          </motion.text>
          <motion.line
            x1={X0}
            y1={BEAM_Y}
            x2={X1}
            y2={BEAM_Y}
            stroke={INTERNAL}
            strokeWidth={1}
            initial={false}
            animate={{ opacity: (isInternal || isOutside || isCheck) && reveal > 0 ? 0.18 : 0 }}
          />
        </svg>
      </div>
    </div>
  )
}
