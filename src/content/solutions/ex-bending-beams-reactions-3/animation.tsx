import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const BEAM = '#556273'
const LOAD = '#ff6b45'
const REACTION = '#2f7d5b'
const SUPPORT = '#68727e'
const MUTED = '#87929d'
const OK = '#2f7d5b'

const X0 = 68
const X1 = 432
const SPAN = X1 - X0
const BEAM_Y = 140
const LENGTH = 8

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
  dashed = false,
}: {
  at: number
  length: number
  label: string
  labelY: number
  opacity: number
  dashed?: boolean
}) {
  return (
    <motion.g
      initial={false}
      animate={{ opacity }}
      transition={{ duration: 0.22, ease: 'linear' }}
      stroke={LOAD}
      fill={LOAD}
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

export function BeamReactionsExample3Animation({ scene, index, playing, sceneProgress }: SolutionAnimationProps) {
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
  const reactionReveal = modelFade(0.16, 0.34)
  const unknownReveal = modelFade(0.42, 0.3)
  const pValueReveal = reveal(1)
  const positionReveal = reveal(2)
  const checkReveal = reveal(3)

  const moveProgress = index >= 3 ? 1 : index === 2 ? (playing ? smooth(progress) : 1) : 0
  const loadPosition = 4 - 2 * moveProgress
  const loadAt = x(loadPosition)
  const showPValue = index >= 1
  const showADimension = index >= 1
  const showCheck = index >= 3
  const loadFocus = metric === 'load'

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 480 320"
          role="img"
          aria-label="Belka swobodnie podparta o długości 8 metrów z znanymi reakcjami 30 kN i 10 kN; animacja odtwarza siłę 40 kN i jej położenie 2 metry od lewej podpory"
        >
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

          <motion.g
            initial={false}
            animate={{ opacity: supportReveal }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <PinSupport at={X0} label="A" />
            <RollerSupport at={X1} label="B" />
          </motion.g>

          <UpReaction at={X0 - 26} label="R_A = 30 kN" labelX={42} opacity={reactionReveal} />
          <UpReaction at={X1 + 26} label="R_B = 10 kN" labelX={470} labelAnchor="end" opacity={reactionReveal} />

          {modelScene && (
            <motion.g initial={false} animate={{ opacity: unknownReveal }}>
              <DownArrow at={x(4)} length={66} label="P = ?, a = ?" labelY={BEAM_Y - 76} opacity={1} dashed />
            </motion.g>
          )}

          {showPValue && (
            <motion.g
              initial={false}
              animate={{ opacity: pValueReveal }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <DownArrow
                at={loadAt}
                length={70}
                label="P = 40 kN"
                labelY={BEAM_Y - 80}
                opacity={loadFocus ? 1 : 0.86}
              />
              <line
                x1={loadAt}
                y1={BEAM_Y + 1}
                x2={loadAt}
                y2={BEAM_Y + 22}
                stroke={LOAD}
                strokeWidth={1}
                strokeDasharray="3 3"
              />
            </motion.g>
          )}

          {showADimension && (
            <Dimension
              from={X0}
              to={loadAt}
              y={BEAM_Y + 86}
              label={index >= 3 || moveProgress > 0.8 ? 'a = 2 m' : 'a = ?'}
              color={LOAD}
              opacity={index === 2 ? positionReveal : 1}
            />
          )}
          <Dimension from={X0} to={X1} y={BEAM_Y + 116} label="L = 8 m" />

          {showCheck && (
            <motion.g
              initial={false}
              animate={{ opacity: checkReveal }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <circle cx={399} cy={31} r={7} fill={OK} fillOpacity={0.14} stroke={OK} strokeWidth={1.4} />
              <path d="M395 31 L398 34 L403 28" fill="none" stroke={OK} strokeWidth={1.8} strokeLinecap="round" />
              <text x={385} y={27} textAnchor="end" fontSize={8.5} fontWeight={600} fill={OK}>
                ΣF_y = 0
              </text>
              <text x={385} y={39} textAnchor="end" fontSize={8.5} fontWeight={600} fill={OK}>
                ΣM_B = 0
              </text>
            </motion.g>
          )}
        </svg>
      </div>
    </div>
  )
}
