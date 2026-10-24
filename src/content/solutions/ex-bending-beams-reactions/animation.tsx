import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const BEAM = '#556273'
const LOAD = '#ff6b45'
const RESULTANT = '#d84f28'
const REACTION = '#2f7d5b'
const SUPPORT = '#68727e'
const MOMENT = '#a970dd'
const MUTED = '#87929d'
const OK = '#2f7d5b'

const X0 = 68
const X1 = 436
const SPAN = X1 - X0
const BEAM_Y = 140
const LENGTH = 6

const x = (value: number) => X0 + (value / LENGTH) * SPAN
const clamp = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp(value)
  return t * t * (3 - 2 * t)
}

function DownArrow({
  at,
  length,
  label,
  labelY,
  opacity,
  color = LOAD,
  dashed = false,
}: {
  at: number
  length: number
  label: string
  labelY: number
  opacity: number
  color?: string
  dashed?: boolean
}) {
  return (
    <motion.g
      initial={false}
      animate={{ opacity }}
      transition={{ duration: 0.2, ease: 'linear' }}
      stroke={color}
      fill={color}
    >
      <line
        x1={at}
        y1={BEAM_Y - length}
        x2={at}
        y2={BEAM_Y - 7}
        strokeWidth={2.4}
        strokeDasharray={dashed ? '5 4' : undefined}
      />
      {!dashed && (
        <path
          d={`M${at - 5} ${BEAM_Y - 17} L${at} ${BEAM_Y - 7} L${at + 5} ${BEAM_Y - 17}`}
          fill="none"
          strokeWidth={2.4}
        />
      )}
      <text x={at} y={labelY} textAnchor="middle" fontSize={9.5} fontWeight={600} stroke="none">
        {label}
      </text>
    </motion.g>
  )
}

function UpReaction({
  at,
  label,
  labelX,
  labelAnchor = 'middle',
  opacity,
}: {
  at: number
  label: string
  labelX: number
  labelAnchor?: 'start' | 'middle' | 'end'
  opacity: number
}) {
  return (
    <motion.g
      initial={false}
      animate={{ opacity }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      stroke={REACTION}
      fill={REACTION}
    >
      <line x1={at} y1={BEAM_Y + 52} x2={at} y2={BEAM_Y + 8} strokeWidth={2.6} />
      <path
        d={`M${at - 5} ${BEAM_Y + 19} L${at} ${BEAM_Y + 7} L${at + 5} ${BEAM_Y + 19}`}
        fill="none"
        strokeWidth={2.6}
      />
      <text x={labelX} y={BEAM_Y + 66} textAnchor={labelAnchor} fontSize={9} fontWeight={700} stroke="none">
        {label}
      </text>
    </motion.g>
  )
}

function PinSupport({ at, label }: { at: number; label: string }) {
  return (
    <g>
      <path d={`M${at - 10} ${BEAM_Y + 18} L${at} ${BEAM_Y + 2} L${at + 10} ${BEAM_Y + 18} Z`} fill={SUPPORT} />
      <circle cx={at} cy={BEAM_Y + 2} r={2.6} fill="#fff" stroke={SUPPORT} strokeWidth={1.6} />
      <line x1={at - 14} y1={BEAM_Y + 19} x2={at + 14} y2={BEAM_Y + 19} stroke={SUPPORT} strokeWidth={1.4} />
      <text x={at} y={BEAM_Y + 34} textAnchor="middle" fontSize={10} fontWeight={600} fill={SUPPORT}>
        {label}
      </text>
    </g>
  )
}

function RollerSupport({ at, label }: { at: number; label: string }) {
  return (
    <g>
      <path d={`M${at - 10} ${BEAM_Y + 14} L${at} ${BEAM_Y + 2} L${at + 10} ${BEAM_Y + 14} Z`} fill={SUPPORT} />
      <circle cx={at - 5} cy={BEAM_Y + 18} r={3} fill="#fff" stroke={SUPPORT} strokeWidth={1.5} />
      <circle cx={at + 5} cy={BEAM_Y + 18} r={3} fill="#fff" stroke={SUPPORT} strokeWidth={1.5} />
      <line x1={at - 14} y1={BEAM_Y + 23} x2={at + 14} y2={BEAM_Y + 23} stroke={SUPPORT} strokeWidth={1.4} />
      <text x={at} y={BEAM_Y + 37} textAnchor="middle" fontSize={10} fontWeight={600} fill={SUPPORT}>
        {label}
      </text>
    </g>
  )
}

function Dimension({
  from,
  to,
  y,
  label,
  color = MUTED,
  opacity = 1,
}: {
  from: number
  to: number
  y: number
  label: string
  color?: string
  opacity?: number
}) {
  return (
    <motion.g initial={false} animate={{ opacity }} stroke={color} fill={color}>
      <line x1={from} y1={y} x2={to} y2={y} strokeWidth={1.2} />
      <line x1={from} y1={y - 5} x2={from} y2={y + 5} strokeWidth={1.2} />
      <line x1={to} y1={y - 5} x2={to} y2={y + 5} strokeWidth={1.2} />
      <text x={(from + to) / 2} y={y + 13} textAnchor="middle" fontSize={9} stroke="none">
        {label}
      </text>
    </motion.g>
  )
}

export function BeamReactionsExample1Animation({ scene, index, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const progress = playing ? clamp(sceneProgress) : 1
  const modelScene = index === 0

  const modelFade = (start: number, duration = 0.28) =>
    modelScene ? (playing ? smooth(clamp((progress - start) / duration)) : 1) : 1

  const reveal = (sceneIndex: number, delay = 0.06, duration = 0.46) => {
    if (index > sceneIndex) return 1
    if (index < sceneIndex) return 0
    return playing ? smooth(clamp((progress - delay) / duration)) : 1
  }

  const beamReveal = modelScene && playing ? smooth(clamp(progress / 0.32)) : 1
  const supportReveal = modelFade(0.08, 0.3)
  const qLabelReveal = modelFade(0.16, 0.3)
  const pReveal = modelFade(0.44, 0.28)
  const qReveal = reveal(1)
  const rbReveal = reveal(2)
  const raReveal = reveal(3)
  const checkReveal = reveal(4)
  const momentReveal = reveal(4, 0.2, 0.42)

  const showQ = index >= 1
  const showRB = index >= 2
  const showRA = index >= 3
  const showCheck = index >= 4
  const showADimension = index === 0 || index >= 2
  const loadFocus = metric === 'load'

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 480 320"
          role="img"
          aria-label="Belka swobodnie podparta o długości 6 metrów z obciążeniem ciągłym 2 kN na metr i siłą 24 kN w odległości 4 metrów od lewej podpory; animacja pokazuje podpory, obciążenia, wypadkową oraz reakcje w górę"
        >
          <motion.path
            d={`M${x(0)} ${BEAM_Y} L${x(LENGTH)} ${BEAM_Y}`}
            fill="none"
            stroke={BEAM}
            strokeWidth={5}
            strokeLinecap="round"
            initial={false}
            animate={{ pathLength: beamReveal }}
            transition={{ duration: 0.12, ease: 'linear' }}
          />

          {Array.from({ length: 13 }, (_, arrowIndex) => {
            const position = (arrowIndex / 12) * LENGTH
            const px = x(position)
            const height = 24
            const arrowReveal = modelScene
              ? playing
                ? smooth(clamp((progress - 0.18 - arrowIndex * 0.014) / 0.24))
                : 1
              : 1
            return (
              <motion.g
                key={`q-${arrowIndex}`}
                initial={false}
                animate={{ opacity: (loadFocus ? 0.85 : 0.68) * arrowReveal }}
                transition={{ duration: 0.18, ease: 'linear' }}
                stroke={LOAD}
                fill={LOAD}
              >
                <line x1={px} y1={BEAM_Y - height - 7} x2={px} y2={BEAM_Y - 5} strokeWidth={1.5} />
                <path
                  d={`M${px - 3} ${BEAM_Y - 13} L${px} ${BEAM_Y - 5} L${px + 3} ${BEAM_Y - 13}`}
                  fill="none"
                  strokeWidth={1.5}
                />
              </motion.g>
            )
          })}

          <motion.text
            initial={false}
            animate={{ opacity: qLabelReveal }}
            x={x(2.7)}
            y={BEAM_Y - 46}
            textAnchor="middle"
            fontSize={10}
            fontWeight={600}
            fill={LOAD}
          >
            q = 2 kN/m
          </motion.text>

          <DownArrow at={x(4)} length={66} label="P = 24 kN" labelY={BEAM_Y - 76} opacity={pReveal} />

          {showQ && (
            <motion.g initial={false} animate={{ opacity: qReveal }} transition={{ duration: 0.3, ease: 'easeOut' }}>
              <DownArrow
                at={x(3)}
                length={92}
                label="Q = 12 kN"
                labelY={BEAM_Y - 104}
                opacity={loadFocus ? 1 : 0.82}
                color={RESULTANT}
              />
              <line
                x1={x(3)}
                y1={BEAM_Y + 1}
                x2={x(3)}
                y2={BEAM_Y + 18}
                stroke={RESULTANT}
                strokeWidth={1}
                strokeDasharray="3 3"
              />
            </motion.g>
          )}

          <motion.g
            initial={false}
            animate={{ opacity: supportReveal }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <PinSupport at={x(0)} label="A" />
            <RollerSupport at={x(6)} label="B" />
          </motion.g>

          {showRB && (
            <UpReaction at={x(6) + 26} label="R_B = 22 kN" labelX={470} labelAnchor="end" opacity={rbReveal} />
          )}
          {showRA && <UpReaction at={x(0) - 26} label="R_A = 14 kN" labelX={42} opacity={raReveal} />}

          {index === 1 ? (
            <Dimension from={x(0)} to={x(3)} y={BEAM_Y + 86} label="x_Q = 3 m" color={RESULTANT} opacity={qReveal} />
          ) : showADimension ? (
            <Dimension from={x(0)} to={x(4)} y={BEAM_Y + 86} label="a = 4 m" />
          ) : null}
          <Dimension from={x(0)} to={x(6)} y={BEAM_Y + 116} label="L = 6 m" />

          {showCheck && (
            <motion.g initial={false} animate={{ opacity: momentReveal }} stroke={MOMENT} fill={MOMENT}>
              <path
                d={`M${x(4) - 14} ${BEAM_Y - 18} A16 16 0 1 1 ${x(4) + 14} ${BEAM_Y - 18}`}
                fill="none"
                strokeWidth={2.2}
              />
              <path
                d={`M${x(4) + 8} ${BEAM_Y - 28} L${x(4) + 16} ${BEAM_Y - 18} L${x(4) + 4} ${BEAM_Y - 15}`}
                strokeWidth={2.2}
              />
              <text x={x(4)} y={BEAM_Y - 39} textAnchor="middle" fontSize={9} fontWeight={700} stroke="none">
                M = 40 kN·m
              </text>
            </motion.g>
          )}

          {showCheck && (
            <motion.g
              initial={false}
              animate={{ opacity: checkReveal }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <circle cx={395} cy={31} r={7} fill={OK} fillOpacity={0.14} stroke={OK} strokeWidth={1.4} />
              <path d="M391 31 L394 34 L399 28" fill="none" stroke={OK} strokeWidth={1.8} strokeLinecap="round" />
              <text x={381} y={27} textAnchor="end" fontSize={8.5} fontWeight={600} fill={OK}>
                ΣF_y = 0
              </text>
              <text x={381} y={39} textAnchor="end" fontSize={8.5} fontWeight={600} fill={OK}>
                ΣM_B = 0
              </text>
            </motion.g>
          )}
        </svg>
      </div>
    </div>
  )
}
