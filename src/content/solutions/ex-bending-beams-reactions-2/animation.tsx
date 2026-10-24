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

const X0 = 76
const X1 = 426
const SPAN = X1 - X0
const BEAM_Y = 144
const LENGTH = 2.5

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
}: {
  at: number
  length: number
  label: string
  labelY: number
  opacity: number
  color?: string
}) {
  return (
    <motion.g
      initial={false}
      animate={{ opacity }}
      transition={{ duration: 0.2, ease: 'linear' }}
      stroke={color}
      fill={color}
    >
      <line x1={at} y1={BEAM_Y - length} x2={at} y2={BEAM_Y - 7} strokeWidth={2.4} />
      <path
        d={`M${at - 5} ${BEAM_Y - 17} L${at} ${BEAM_Y - 7} L${at + 5} ${BEAM_Y - 17}`}
        fill="none"
        strokeWidth={2.4}
      />
      <text x={at} y={labelY} textAnchor="middle" fontSize={9.5} fontWeight={600} stroke="none">
        {label}
      </text>
    </motion.g>
  )
}

function UpReaction({ at, label, opacity }: { at: number; label: string; opacity: number }) {
  return (
    <motion.g
      initial={false}
      animate={{ opacity }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      stroke={REACTION}
      fill={REACTION}
    >
      <line x1={at} y1={BEAM_Y + 60} x2={at} y2={BEAM_Y + 8} strokeWidth={2.6} />
      <path
        d={`M${at - 5} ${BEAM_Y + 19} L${at} ${BEAM_Y + 7} L${at + 5} ${BEAM_Y + 19}`}
        fill="none"
        strokeWidth={2.6}
      />
      <text x={at} y={BEAM_Y + 74} textAnchor="middle" fontSize={9} fontWeight={700} stroke="none">
        {label}
      </text>
    </motion.g>
  )
}

function FixedSupport() {
  return (
    <g stroke={SUPPORT}>
      <line x1={X0} y1={BEAM_Y - 62} x2={X0} y2={BEAM_Y + 38} strokeWidth={4.5} strokeLinecap="round" />
      {Array.from({ length: 8 }, (_, tick) => {
        const y = BEAM_Y - 54 + tick * 12
        return <line key={tick} x1={X0} y1={y} x2={X0 - 12} y2={y - 8} strokeWidth={1.4} />
      })}
      <text x={X0 - 15} y={BEAM_Y + 30} textAnchor="end" fontSize={10} fontWeight={600} fill={SUPPORT} stroke="none">
        A
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

function MomentArc({
  centerX,
  centerY,
  radius,
  direction,
  color,
  opacity,
  markerId,
  dashed = false,
}: {
  centerX: number
  centerY: number
  radius: number
  direction: 'cw' | 'ccw'
  color: string
  opacity: number
  markerId: string
  dashed?: boolean
}) {
  const startX = direction === 'ccw' ? centerX + radius : centerX - radius
  const endX = direction === 'ccw' ? centerX - radius : centerX + radius
  const sweep = direction === 'ccw' ? 0 : 1
  return (
    <motion.path
      d={`M${startX} ${centerY} A${radius} ${radius} 0 0 ${sweep} ${endX} ${centerY}`}
      fill="none"
      stroke={color}
      strokeWidth={2.2}
      strokeDasharray={dashed ? '5 4' : undefined}
      markerEnd={`url(#${markerId})`}
      initial={false}
      animate={{ opacity }}
      transition={{ duration: 0.32, ease: 'easeOut' }}
    />
  )
}

export function BeamReactionsExample2Animation({ scene, index, playing, sceneProgress }: SolutionAnimationProps) {
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

  const beamReveal = modelScene && playing ? smooth(clamp(progress / 0.3)) : 1
  const supportReveal = modelFade(0.06, 0.28)
  const qLabelReveal = modelFade(0.14, 0.3)
  const pReveal = modelFade(0.42, 0.28)
  const qReveal = reveal(1)
  const rReveal = reveal(2)
  const mrReveal = reveal(3)
  const loadMomentReveal = reveal(3, 0.18, 0.4)
  const checkReveal = reveal(4)

  const showQ = index >= 1
  const showR = index >= 2
  const showMoment = index >= 3
  const showCheck = index >= 4
  const loadFocus = metric === 'load'

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 480 320"
          role="img"
          aria-label="Belka wspornikowa utwierdzona w lewym końcu, obciążona równomiernie 4 kN na metr i siłą 6 kN na swobodnym końcu; animacja pokazuje reakcję pionową w górę oraz moment reakcyjny przeciwny do ruchu wskazówek zegara"
        >
          <defs>
            <marker
              id="s2-ccw"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={MOMENT} />
            </marker>
            <marker
              id="s2-cw"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={LOAD} />
            </marker>
          </defs>

          <motion.path
            d={`M${X0} ${BEAM_Y} L${X1} ${BEAM_Y}`}
            fill="none"
            stroke={BEAM}
            strokeWidth={5}
            strokeLinecap="round"
            initial={false}
            animate={{ pathLength: beamReveal }}
            transition={{ duration: 0.12, ease: 'linear' }}
          />

          {Array.from({ length: 11 }, (_, arrowIndex) => {
            const position = (arrowIndex / 10) * LENGTH
            const px = x(position)
            const height = 22
            const arrowReveal = modelScene
              ? playing
                ? smooth(clamp((progress - 0.16 - arrowIndex * 0.016) / 0.24))
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
            x={x(1.8)}
            y={BEAM_Y - 43}
            textAnchor="middle"
            fontSize={10}
            fontWeight={600}
            fill={LOAD}
          >
            q = 4 kN/m
          </motion.text>

          <DownArrow at={X1} length={64} label="P = 6 kN" labelY={BEAM_Y - 76} opacity={pReveal} />

          {showQ && (
            <motion.g initial={false} animate={{ opacity: qReveal }} transition={{ duration: 0.3, ease: 'easeOut' }}>
              <DownArrow
                at={x(1.25)}
                length={88}
                label="Q = 10 kN"
                labelY={BEAM_Y - 100}
                opacity={loadFocus ? 1 : 0.82}
                color={RESULTANT}
              />
              <line
                x1={x(1.25)}
                y1={BEAM_Y + 1}
                x2={x(1.25)}
                y2={BEAM_Y + 22}
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
            <FixedSupport />
          </motion.g>

          {showR && <UpReaction at={X0 + 44} label="R = 16 kN" opacity={rReveal} />}

          {showMoment && (
            <motion.g initial={false} animate={{ opacity: 1 }}>
              <MomentArc
                centerX={X0 + 46}
                centerY={BEAM_Y - 58}
                radius={30}
                direction="cw"
                color={LOAD}
                opacity={loadMomentReveal * 0.68}
                markerId="s2-cw"
                dashed
              />
              <MomentArc
                centerX={X0 + 46}
                centerY={BEAM_Y - 58}
                radius={19}
                direction="ccw"
                color={MOMENT}
                opacity={mrReveal}
                markerId="s2-ccw"
              />
              <motion.text
                initial={false}
                animate={{ opacity: mrReveal }}
                x={X0 + 46}
                y={BEAM_Y - 99}
                textAnchor="middle"
                fontSize={9}
                fontWeight={700}
                fill={MOMENT}
              >
                M_R = 27,5 kN·m
              </motion.text>
              <motion.text
                initial={false}
                animate={{ opacity: loadMomentReveal }}
                x={X0 + 92}
                y={BEAM_Y - 92}
                fontSize={8}
                fill={LOAD}
              >
                M_obc
              </motion.text>
            </motion.g>
          )}

          {index === 1 ? (
            <Dimension
              from={X0}
              to={x(1.25)}
              y={BEAM_Y + 96}
              label="x_Q = 1,25 m"
              color={RESULTANT}
              opacity={qReveal}
            />
          ) : null}
          <Dimension from={X0} to={X1} y={BEAM_Y + 118} label="L = 2,5 m" />

          {showCheck && (
            <motion.g
              initial={false}
              animate={{ opacity: checkReveal }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <circle cx={405} cy={31} r={7} fill={OK} fillOpacity={0.14} stroke={OK} strokeWidth={1.4} />
              <path d="M401 31 L404 34 L409 28" fill="none" stroke={OK} strokeWidth={1.8} strokeLinecap="round" />
              <text x={391} y={27} textAnchor="end" fontSize={8.5} fontWeight={600} fill={OK}>
                ΣF_y = 0
              </text>
              <text x={391} y={39} textAnchor="end" fontSize={8.5} fontWeight={600} fill={OK}>
                ΣM_A = 0
              </text>
            </motion.g>
          )}
        </svg>
      </div>
    </div>
  )
}
