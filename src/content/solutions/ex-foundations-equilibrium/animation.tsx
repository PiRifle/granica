import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const LOAD = '#ff6b45'
const REACTION = '#2f7d5b'
const ACCENT = '#4f6df5'
const SUPPORT = '#68727e'
const MUTED = '#87929d'

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

export function EquilibriumExampleAnimation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'load'
  const t = playing ? clamp01(sceneProgress) : 1
  const show = (from: number, to: number) => ramp(t, from, to)

  const isModel = metric === 'load'
  const isFreeBody = metric === 'reaction'
  const isHorizontal = metric === 'horizontal'
  const isMoment = metric === 'moment'
  const isCheck = metric === 'check'
  const isResultant = isMoment || isCheck
  const hasReactions = isFreeBody || isMoment || isCheck

  const xA = 60
  const xB = 460
  const beamY = 130
  const xP = 300
  const xQ = 260
  const xRA = 28
  const xRB = 492

  const qAmount = isModel ? show(0.05, 0.32) : 1
  const pAmount = isModel ? show(0.2, 0.48) : 1
  const hAmount = isModel ? show(0.36, 0.64) : 1
  const dimsAmount = isHorizontal || isCheck ? 0 : isModel ? show(0.52, 0.9) : 0.85

  const axAmount = isHorizontal ? show(0.05, 0.4) : isFreeBody ? show(0.04, 0.28) : hasReactions ? 1 : 0
  const raAmount = isFreeBody ? show(0.2, 0.46) : isMoment || isCheck ? 1 : 0
  const rbAmount = isFreeBody ? show(0.36, 0.62) : isMoment || isCheck ? 1 : 0
  const resultantAmount = isResultant ? show(0.04, 0.38) : 0
  const balanceAmount = isHorizontal ? show(0.12, 0.72) : 0
  const checkAmount = isCheck ? show(0.35, 0.85) : 0

  const supportOpacity = isModel ? 1 : isHorizontal ? 0.35 : 0.45
  const qOpacity = qAmount * (isResultant ? 1 - 0.75 * resultantAmount : isHorizontal ? 0.25 : 1)
  const hOpacity = hAmount * (isHorizontal ? 1 : isMoment || isCheck ? 0.35 : 1)
  const pOpacity = pAmount * (isHorizontal ? 0.3 : 1)

  const distributedX = Array.from({ length: 11 }, (_, index) => xA + (index * (xB - xA)) / 10)

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 520 350"
          role="img"
          aria-label="Belka swobodnie podparta L = 5 m z siłą P = 12 kN, obciążeniem q = 6 kN/m i siłą poziomą H = 5 kN; animacja reakcji A x, R A i R B"
        >
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: qOpacity }}
            transition={{ duration: 0.2 }}
            stroke={LOAD}
            fill={LOAD}
          >
            <line x1={xA} y1={78} x2={xB} y2={78} strokeWidth={2} />
            {distributedX.map((x, index) => (
              <g key={index}>
                <line x1={x} y1={78} x2={x} y2={112} strokeWidth={1.3} />
                <path d={`M${x - 3} 113 L${x} 120 L${x + 3} 113 Z`} stroke="none" />
              </g>
            ))}
          </motion.g>
          <Tag x={150} y={66} amount={qOpacity} color={LOAD}>
            q = 6,0 kN/m
          </Tag>

          <Arrow x1={xP} y1={54} x2={xP} y2={122} amount={pOpacity} color={LOAD} width={2.8} />
          <Tag x={xP + 8} y={42} amount={pOpacity} color={LOAD} anchor="start">
            P = 12 kN
          </Tag>

          <Arrow x1={516} y1={beamY} x2={464} y2={beamY} amount={hOpacity} color={LOAD} width={2.6} />
          <Tag x={514} y={118} amount={hOpacity} color={LOAD} anchor="end">
            H = 5,0 kN
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

          <Arrow x1={xQ} y1={62} x2={xQ} y2={122} amount={resultantAmount} color={LOAD} width={2.8} />
          <Tag x={xQ - 30} y={50} amount={resultantAmount} color={LOAD}>
            Q = 30,0 kN
          </Tag>

          <Arrow x1={xRA} y1={205} x2={xRA} y2={beamY + 8} amount={raAmount} color={REACTION} />
          <Tag x={6} y={220} amount={raAmount} color={REACTION} anchor="start">
            R_A = 19,8 kN
          </Tag>

          <Arrow x1={xRB} y1={205} x2={xRB} y2={beamY + 8} amount={rbAmount} color={REACTION} />
          <Tag x={514} y={220} amount={rbAmount} color={REACTION} anchor="end">
            R_B = 22,2 kN
          </Tag>

          <Arrow x1={8} y1={beamY} x2={xA - 8} y2={beamY} amount={axAmount} color={REACTION} />
          <Tag x={8} y={116} amount={axAmount} color={REACTION} anchor="start">
            A_x = 5,0 kN
          </Tag>

          <Dimension x1={xA} x2={xP} y={270} label="a = 3,0 m" amount={dimsAmount} />
          <Dimension x1={xA} x2={xB} y={310} label="L = 5,0 m" amount={dimsAmount} />

          <motion.g initial={{ opacity: 0 }} animate={{ opacity: isHorizontal ? 1 : 0 }} transition={{ duration: 0.2 }}>
            <Arrow x1={150} y1={215} x2={250} y2={215} amount={balanceAmount} color={REACTION} />
            <Arrow x1={430} y1={215} x2={330} y2={215} amount={balanceAmount} color={LOAD} />
            <line x1={290} y1={195} x2={290} y2={235} stroke={MUTED} strokeWidth={1.2} strokeDasharray="4 4" />
            <Tag x={200} y={203} amount={balanceAmount} color={REACTION}>
              A_x = 5,0 kN
            </Tag>
            <Tag x={380} y={203} amount={balanceAmount} color={LOAD}>
              H = 5,0 kN
            </Tag>
            <Tag x={290} y={250} amount={balanceAmount} color={MUTED}>
              ΣF_x = 0
            </Tag>
          </motion.g>

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
