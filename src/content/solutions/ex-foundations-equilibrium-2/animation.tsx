import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const LOAD = '#ff6b45'
const REACTION = '#2f7d5b'
const ACCENT = '#4f6df5'
const SUPPORT = '#68727e'
const MOMENT = '#a970dd'

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

function MomentArrow({
  cx,
  cy,
  r,
  amount,
  color = MOMENT,
  label,
  labelX,
  labelY,
}: {
  cx: number
  cy: number
  r: number
  amount: number
  color?: string
  label: string
  labelX: number
  labelY: number
}) {
  const d = `M ${cx + r} ${cy} A ${r} ${r} 0 0 0 ${cx} ${cy - r}`
  return (
    <motion.g initial={{ opacity: 0 }} animate={{ opacity: amount }} transition={{ duration: 0.2 }}>
      <motion.path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={2.4}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: amount }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      />
      <motion.polygon
        points={`${cx},${cy - r} ${cx + 9},${cy - r - 4} ${cx + 9},${cy - r + 4}`}
        fill={color}
        initial={{ opacity: 0 }}
        animate={{ opacity: amount > 0.5 ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />
      <Tag x={labelX} y={labelY} amount={amount} color={color} anchor="start">
        {label}
      </Tag>
    </motion.g>
  )
}

export function EquilibriumExample2Animation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'load'
  const t = playing ? clamp01(sceneProgress) : 1
  const show = (from: number, to: number) => ramp(t, from, to)

  const isModel = metric === 'load'
  const isComponents = metric === 'components'
  const isReaction = metric === 'reaction'
  const isMoment = metric === 'moment'
  const isCheck = metric === 'check'
  const hasComponents = isComponents || isReaction || isMoment || isCheck
  const hasReactions = isReaction || isMoment || isCheck

  const xA = 90
  const xB = 410
  const beamY = 140
  const wallX = 76

  const diagonalAmount = isModel ? show(0.05, 0.5) : hasComponents ? (isComponents ? 0.28 : 0.22) : 0
  const fxAmount = hasComponents ? (isComponents ? show(0.08, 0.45) : 1) : 0
  const fyAmount = hasComponents ? (isComponents ? show(0.32, 0.72) : 1) : 0
  const fxOpacity = fxAmount * (isMoment ? 0.4 : 1)
  const fyOpacity = fyAmount

  const axAmount = isReaction ? show(0.04, 0.28) : isMoment || isCheck ? 1 : 0
  const ayAmount = isReaction ? show(0.18, 0.44) : isMoment || isCheck ? 1 : 0
  const maAmount = isReaction ? show(0.34, 0.68) : isMoment || isCheck ? 1 : 0
  const axOpacity = axAmount * (isMoment ? 0.35 : 1)
  const ayOpacity = ayAmount * (isMoment ? 0.35 : 1)

  const dimsAmount = isModel ? show(0.42, 0.82) : hasReactions ? (isMoment ? 1 : 0.75) : 0.5
  const supportOpacity = hasReactions ? 0.45 : 1
  const checkAmount = isCheck ? show(0.3, 0.8) : 0

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 520 330"
          role="img"
          aria-label="Wspornik L = 2,4 m utwierdzony w A, z siłą na końcu B o składowych F x = 6 kN i F y = 8 kN; animacja reakcji A x, A y i momentu M A"
        >
          <motion.g
            initial={false}
            animate={{ opacity: supportOpacity }}
            transition={{ duration: 0.25 }}
            stroke={SUPPORT}
            fill={SUPPORT}
          >
            <line x1={wallX} y1={70} x2={wallX} y2={214} strokeWidth={4} />
            {Array.from({ length: 9 }, (_, index) => {
              const y = 77 + index * 16
              return <line key={index} x1={wallX} y1={y} x2={wallX - 14} y2={y - 10} strokeWidth={1.2} />
            })}
          </motion.g>

          <line x1={xA} y1={beamY} x2={xB} y2={beamY} stroke="#556273" strokeWidth={6} strokeLinecap="round" />
          <Tag x={xA + 14} y={beamY + 22} amount={1} color={SUPPORT} size={10}>
            A
          </Tag>
          <Tag x={xB - 10} y={beamY + 22} amount={1} color={SUPPORT} size={10}>
            B
          </Tag>

          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: hasComponents ? 0.35 : 0.14 }}
            transition={{ duration: 0.2 }}
          >
            <line
              x1={xB + 72}
              y1={beamY}
              x2={xB + 72}
              y2={beamY + 96}
              stroke={LOAD}
              strokeWidth={1}
              strokeDasharray="4 4"
            />
            <line
              x1={xB}
              y1={beamY + 96}
              x2={xB + 72}
              y2={beamY + 96}
              stroke={LOAD}
              strokeWidth={1}
              strokeDasharray="4 4"
            />
          </motion.g>

          <Arrow x1={xB} y1={beamY} x2={xB + 72} y2={beamY + 96} amount={diagonalAmount} color={LOAD} width={2.8} />
          <Tag x={460} y={176} amount={diagonalAmount} color={LOAD} anchor="start">
            F = 10 kN
          </Tag>

          <Arrow x1={xB} y1={beamY} x2={xB + 72} y2={beamY} amount={fxOpacity} color={LOAD} width={2.6} />
          <Tag x={xB + 36} y={beamY - 12} amount={fxOpacity} color={LOAD}>
            F_x = 6,0 kN
          </Tag>

          <Arrow x1={xB} y1={beamY} x2={xB} y2={beamY + 96} amount={fyOpacity} color={LOAD} width={2.6} />
          <Tag x={xB + 10} y={beamY + 114} amount={fyOpacity} color={LOAD} anchor="start">
            F_y = 8,0 kN
          </Tag>

          <Arrow x1={170} y1={84} x2={xA} y2={84} amount={axOpacity} color={REACTION} />
          <Tag x={130} y={72} amount={axOpacity} color={REACTION}>
            A_x = −6,0 kN
          </Tag>

          <Arrow x1={xA + 40} y1={225} x2={xA + 40} y2={beamY + 8} amount={ayOpacity} color={REACTION} />
          <Tag x={xA + 40} y={242} amount={ayOpacity} color={REACTION}>
            A_y = 8,0 kN
          </Tag>

          <MomentArrow
            cx={xA}
            cy={beamY}
            r={32}
            amount={maAmount}
            label="M_A = 19,2 kN·m"
            labelX={xA + 36}
            labelY={beamY - 44}
          />

          <Dimension x1={xA} x2={xB} y={280} label="L = 2,4 m" amount={dimsAmount} />

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
