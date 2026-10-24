import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const LOAD = '#ff6b45'
const REACTION = '#2f7d5b'
const ACCENT = '#4f6df5'
const SUPPORT = '#68727e'

const clamp01 = (value: number) => Math.max(0, Math.min(1, value))
const ramp = (value: number, from: number, to: number) => clamp01((value - from) / (to - from))

function Arrow({
  x1,
  y1,
  x2,
  y2,
  amount,
  color,
  width = 2.4,
}: {
  x1: number
  y1: number
  x2: number
  y2: number
  amount: number
  color: string
  width?: number
}) {
  const angle = Math.atan2(y2 - y1, x2 - x1)
  const head = 9
  const wing = 4.5
  const baseX = x2 - head * Math.cos(angle)
  const baseY = y2 - head * Math.sin(angle)
  const leftX = baseX - wing * Math.sin(angle)
  const leftY = baseY + wing * Math.cos(angle)
  const rightX = baseX + wing * Math.sin(angle)
  const rightY = baseY - wing * Math.cos(angle)
  return (
    <motion.g initial={{ opacity: 0 }} animate={{ opacity: amount > 0.01 ? 1 : 0 }} transition={{ duration: 0.18 }}>
      <motion.line
        x1={x1}
        y1={y1}
        x2={baseX}
        y2={baseY}
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: amount }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
      />
      <motion.polygon
        points={`${x2},${y2} ${leftX},${leftY} ${rightX},${rightY}`}
        fill={color}
        initial={{ opacity: 0 }}
        animate={{ opacity: amount > 0.35 ? 1 : 0 }}
        transition={{ duration: 0.18 }}
      />
    </motion.g>
  )
}

function Dimension({
  x1,
  x2,
  y,
  label,
  amount,
  color = ACCENT,
}: {
  x1: number
  x2: number
  y: number
  label: string
  amount: number
  color?: string
}) {
  const mid = (x1 + x2) / 2
  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: amount }}
      transition={{ duration: 0.25 }}
      stroke={color}
      fill={color}
    >
      <line x1={x1} y1={y} x2={x2} y2={y} strokeWidth={1.2} />
      <line x1={x1} y1={y - 5} x2={x1} y2={y + 5} strokeWidth={1.2} />
      <line x1={x2} y1={y - 5} x2={x2} y2={y + 5} strokeWidth={1.2} />
      <text x={mid} y={y + 14} textAnchor="middle" fontSize={9.5} stroke="none">
        {label}
      </text>
    </motion.g>
  )
}

function Tag({
  x,
  y,
  amount,
  color,
  children,
  anchor = 'middle',
  size = 10,
}: {
  x: number
  y: number
  amount: number
  color: string
  children: string
  anchor?: 'start' | 'middle' | 'end'
  size?: number
}) {
  return (
    <motion.text
      x={x}
      y={y}
      textAnchor={anchor}
      fontSize={size}
      fill={color}
      stroke="none"
      initial={{ opacity: 0 }}
      animate={{ opacity: amount }}
      transition={{ duration: 0.22 }}
    >
      {children}
    </motion.text>
  )
}

export function EquilibriumExample3Animation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'load'
  const t = playing ? clamp01(sceneProgress) : 1
  const show = (from: number, to: number) => ramp(t, from, to)

  const isModel = metric === 'load'
  const isMoment = metric === 'moment'
  const isResultant = metric === 'resultant'
  const isReaction = metric === 'reaction'
  const isCheck = metric === 'check'
  const hasReactions = isReaction || isCheck

  const xA = 60
  const xB = 460
  const beamY = 130
  const xP = 210
  const xQ = 260
  const xRA = 28
  const xRB = 492

  const qAmount = isModel ? show(0.05, 0.32) : 1
  const pAmount = isModel ? show(0.18, 0.45) : 1
  const rbAmount = isModel ? show(0.34, 0.64) : 1
  const resultantAmount = isResultant ? show(0.04, 0.4) : hasReactions ? 1 : 0
  const raAmount = isReaction ? show(0.06, 0.5) : isCheck ? 1 : 0
  const checkAmount = isCheck ? show(0.35, 0.85) : 0

  const showResultant = isResultant || hasReactions
  const qKnown = !isModel && (!isMoment || t > 0.55)
  const qUnknownAmount = qKnown ? 0 : qAmount
  const qKnownAmount = qKnown ? (showResultant ? 0.3 : 1) : 0
  const qOpacity = qAmount * (showResultant ? 1 - 0.75 * resultantAmount : 1)

  const dimsOpacity = isModel ? 1 : isCheck ? 0.6 : 0.9
  const aAmount = isModel ? show(0.48, 0.84) : dimsOpacity
  const lAmount = isModel ? show(0.52, 0.88) : dimsOpacity
  const xqAmount = isModel ? 0 : isMoment ? show(0.4, 0.85) : dimsOpacity
  const supportOpacity = isModel ? 1 : 0.6

  const distributedX = Array.from({ length: 11 }, (_, index) => xA + (index * (xB - xA)) / 10)

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 520 350"
          role="img"
          aria-label="Belka swobodnie podparta L = 4 m z siłą P = 8 kN, nieznanym obciążeniem q i zadaną reakcją R B = 14 kN; animacja wyznaczania q, R A i kontroli równowagi"
        >
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: qOpacity }}
            transition={{ duration: 0.2 }}
            stroke={LOAD}
            fill={LOAD}
          >
            <line x1={xA} y1={76} x2={xB} y2={76} strokeWidth={2} />
            {distributedX.map((x, index) => (
              <g key={index}>
                <line x1={x} y1={76} x2={x} y2={110} strokeWidth={1.3} />
                <path d={`M${x - 3} 111 L${x} 118 L${x + 3} 111 Z`} stroke="none" />
              </g>
            ))}
          </motion.g>
          <Tag x={150} y={64} amount={qUnknownAmount} color={LOAD}>
            q = ?
          </Tag>
          <Tag x={150} y={64} amount={qKnownAmount} color={LOAD}>
            q = 5,5 kN/m
          </Tag>

          <Arrow x1={xP} y1={50} x2={xP} y2={122} amount={pAmount} color={LOAD} width={2.8} />
          <Tag x={xP - 8} y={38} amount={pAmount} color={LOAD} anchor="end">
            P = 8 kN
          </Tag>

          <line x1={xA} y1={beamY} x2={xB} y2={beamY} stroke="#556273" strokeWidth={6} strokeLinecap="round" />

          <motion.g
            initial={false}
            animate={{ opacity: supportOpacity }}
            transition={{ duration: 0.25 }}
            fill={SUPPORT}
            stroke={SUPPORT}
          >
            <path d={`M${xA - 10} ${beamY + 18} L${xA} ${beamY + 2} L${xA + 10} ${beamY + 18} Z`} />
            <line x1={xA - 17} y1={beamY + 19} x2={xA + 17} y2={beamY + 19} strokeWidth={2} />
            <path d={`M${xB - 10} ${beamY + 18} L${xB} ${beamY + 2} L${xB + 10} ${beamY + 18} Z`} />
            <circle cx={xB - 5} cy={beamY + 23} r={2.6} />
            <circle cx={xB + 5} cy={beamY + 23} r={2.6} />
            <line x1={xB - 17} y1={beamY + 28} x2={xB + 17} y2={beamY + 28} strokeWidth={2} />
            <text x={xA} y={beamY + 45} textAnchor="middle" fontSize={10} stroke="none">
              A
            </text>
            <text x={xB} y={beamY + 45} textAnchor="middle" fontSize={10} stroke="none">
              B
            </text>
          </motion.g>

          <Arrow x1={xQ} y1={58} x2={xQ} y2={122} amount={resultantAmount} color={LOAD} width={2.8} />
          <Tag x={xQ + 10} y={46} amount={resultantAmount} color={LOAD} anchor="start">
            Q = 22,0 kN
          </Tag>

          <Arrow x1={xRA} y1={205} x2={xRA} y2={beamY + 8} amount={raAmount} color={REACTION} />
          <Tag x={6} y={220} amount={raAmount} color={REACTION} anchor="start">
            R_A = 16,0 kN
          </Tag>

          <Arrow x1={xRB} y1={205} x2={xRB} y2={beamY + 8} amount={rbAmount} color={REACTION} />
          <Tag x={514} y={220} amount={rbAmount} color={REACTION} anchor="end">
            R_B = 14,0 kN
          </Tag>

          <Dimension x1={xA} x2={xP} y={255} label="a = 1,5 m" amount={aAmount} />
          <Dimension x1={xA} x2={xQ} y={285} label="x_Q = 2,0 m" amount={xqAmount} />
          <Dimension x1={xA} x2={xB} y={315} label="L = 4,0 m" amount={lAmount} />

          <motion.circle
            cx={486}
            cy={42}
            r={17}
            fill="none"
            stroke={REACTION}
            strokeWidth={2}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: checkAmount, opacity: checkAmount }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
          <motion.path
            d="M 477 42 L 483 48 L 496 34"
            fill="none"
            stroke={REACTION}
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: checkAmount, opacity: checkAmount }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          />
          <Tag x={486} y={70} amount={checkAmount} color={REACTION} size={9}>
            kontrola
          </Tag>
        </svg>
      </div>
    </div>
  )
}
