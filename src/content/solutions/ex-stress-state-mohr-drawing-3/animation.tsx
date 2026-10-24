import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const BLUE = '#4f6df5'
const GREEN = '#2e9e6b'
const ORANGE = '#ff6b45'
const VIOLET = '#a970dd'
const MUTED = '#87929d'
const EDGE = '#68727e'
const AXIS = '#c9d0d9'
const INK = '#17202a'

const OX = 170
const OY = 205
const SCALE = 2
const SIGMA_1 = 100
const SIGMA_2 = 20
const SIGMA_X = 80
const SIGMA_Y = 40
const TAU = Math.sqrt(1200)
const CENTER = 60
const RADIUS = 40
const A = 20

const xOf = (sigma: number) => OX + sigma * SCALE
const yOf = (tau: number) => OY - tau * SCALE

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}

const ORDER: Record<string, number> = {
  model: 0,
  principal: 1,
  center: 2,
  circle: 3,
  points: 4,
  angle: 5,
}

function Marker({
  x,
  y,
  color,
  label,
  dx = 8,
  dy = 4,
  reveal,
  dashed = false,
}: {
  x: number
  y: number
  color: string
  label: string
  dx?: number
  dy?: number
  reveal: number
  dashed?: boolean
}) {
  return (
    <motion.g
      initial={false}
      animate={{ opacity: reveal, scale: reveal > 0.35 ? 1 : 0.6 }}
      transition={{ duration: 0.2, ease: 'linear' }}
      style={{ transformOrigin: `${x}px ${y}px` }}
    >
      <circle cx={x} cy={y} r={3.6} fill={dashed ? '#ffffff' : color} stroke={color} strokeWidth={1.8} />
      <text x={x + dx} y={y + dy} fontSize={9} fill={color}>
        {label}
      </text>
    </motion.g>
  )
}

function StressElement({ active }: { active: boolean }) {
  const left = 34
  const right = 106
  const top = 42
  const bottom = 114
  const midX = (left + right) / 2
  const midY = (top + bottom) / 2
  return (
    <g opacity={active ? 1 : 0.9}>
      <rect
        x={left}
        y={top}
        width={right - left}
        height={bottom - top}
        fill="#f5f7fc"
        stroke={EDGE}
        strokeWidth={1.4}
      />
      <motion.g stroke={BLUE} fill={BLUE} strokeWidth={active ? 2.2 : 1.7} animate={{ opacity: active ? 1 : 0.55 }}>
        <line x1={right} y1={midY} x2={right + 26} y2={midY} />
        <path d={`M${right + 18} ${midY - 4} L${right + 27} ${midY} L${right + 18} ${midY + 4}`} fill="none" />
        <line x1={left} y1={midY} x2={left - 22} y2={midY} />
        <path d={`M${left - 14} ${midY - 4} L${left - 23} ${midY} L${left - 14} ${midY + 4}`} fill="none" />
        <text x={right + 30} y={midY + 3} fontSize={9} stroke="none">
          σ₁
        </text>
      </motion.g>
      <motion.g stroke={GREEN} fill={GREEN} strokeWidth={active ? 2.2 : 1.7} animate={{ opacity: active ? 1 : 0.55 }}>
        <line x1={midX} y1={top} x2={midX} y2={top - 22} />
        <path d={`M${midX - 4} ${top - 14} L${midX} ${top - 23} L${midX + 4} ${top - 14}`} fill="none" />
        <line x1={midX} y1={bottom} x2={midX} y2={bottom + 20} />
        <path d={`M${midX - 4} ${bottom + 12} L${midX} ${bottom + 21} L${midX + 4} ${bottom + 12}`} fill="none" />
        <text x={midX + 5} y={top - 26} fontSize={9} stroke="none">
          σ₂
        </text>
      </motion.g>
      <text x={midX} y={midY + 26} textAnchor="middle" fontSize={8} fill={MUTED}>
        osie główne
      </text>
      <circle cx={midX} cy={midY} r={2} fill={EDGE} />
    </g>
  )
}

function DataPanel({ showSolved }: { showSolved: boolean }) {
  return (
    <g fontSize={9}>
      <text x={12} y={158} fill={MUTED}>
        dane
      </text>
      <text x={12} y={172} fill={BLUE}>
        σ₁ = 100 MPa
      </text>
      <text x={12} y={186} fill={GREEN}>
        σ₂ = 20 MPa
      </text>
      <text x={12} y={200} fill={ORANGE}>
        σx = 80 MPa
      </text>
      <motion.g initial={false} animate={{ opacity: showSolved ? 1 : 0 }} fontSize={9}>
        <text x={12} y={218} fill={VIOLET}>
          σy = 40 MPa
        </text>
        <text x={12} y={232} fill={VIOLET}>
          |τxy| = 34,64 MPa
        </text>
      </motion.g>
    </g>
  )
}

export function MohrDrawingExample3Animation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const p = playing ? smooth(sceneProgress) : 1
  const stage = ORDER[metric] ?? 0
  const at = (elementStage: number) => (stage > elementStage ? 1 : stage === elementStage ? p : 0)

  const principalP = at(1)
  const centerP = at(2)
  const circleP = at(3)
  const pointP = at(4)
  const angleP = at(5)

  const x1 = xOf(SIGMA_1)
  const x2 = xOf(SIGMA_2)
  const xC = xOf(CENTER)
  const xX = xOf(SIGMA_X)
  const yX = yOf(TAU)
  const xY = xOf(SIGMA_Y)
  const yY = yOf(-TAU)
  const xFoot = xOf(SIGMA_X)
  const angleRadius = 54
  const angle = Math.atan2(TAU, A)
  const arcEndX = xC + Math.cos(angle) * angleRadius
  const arcEndY = OY - Math.sin(angle) * angleRadius
  const arcLabelX = xC + Math.cos(angle / 2) * (angleRadius + 16)
  const arcLabelY = OY - Math.sin(angle / 2) * (angleRadius + 16)

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 300"
          role="img"
          aria-label="Zadanie odwrotne koła Mohra: znane σ1 = 100 MPa, σ2 = 20 MPa i σx = 80 MPa. Animacja odtwarza środek, promień, okrąg, punkt X oraz kąt 30 stopni."
        >
          <defs>
            <marker
              id="mohr3-axis"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={MUTED} />
            </marker>
          </defs>

          <StressElement active={metric === 'model'} />
          <DataPanel showSolved={stage >= 4} />

          <g stroke={AXIS} strokeWidth={1}>
            <line x1={150} y1={OY} x2={448} y2={OY} markerEnd="url(#mohr3-axis)" />
            <line x1={OX} y1={122} x2={OX} y2={288} markerEnd="url(#mohr3-axis)" />
          </g>
          <text x={450} y={OY - 6} textAnchor="end" fontSize={10} fill={MUTED}>
            σ
          </text>
          <text x={OX + 6} y={126} fontSize={10} fill={MUTED}>
            τ
          </text>

          <motion.path
            d={`M${x2} ${OY} L${x1} ${OY}`}
            fill="none"
            stroke={VIOLET}
            strokeWidth={1.6}
            strokeDasharray="5 4"
            initial={false}
            animate={{ opacity: principalP, pathLength: principalP }}
            transition={{ duration: 0.18, ease: 'linear' }}
          />
          <Marker x={x2} y={OY} color={GREEN} label="σ₂=20" dx={-34} dy={-9} reveal={principalP} />
          <Marker x={x1} y={OY} color={BLUE} label="σ₁=100" dx={6} dy={-9} reveal={clamp01(principalP * 1.4 - 0.4)} />

          <Marker x={xC} y={OY} color={INK} label="C" dx={-4} dy={16} reveal={centerP} />

          <motion.g initial={false} animate={{ opacity: centerP }}>
            <motion.path
              d={`M${xC} ${OY} L${x1} ${OY}`}
              fill="none"
              stroke={VIOLET}
              strokeWidth={2.4}
              initial={false}
              animate={{ pathLength: centerP }}
              transition={{ duration: 0.18, ease: 'linear' }}
            />
            <text x={(xC + x1) / 2} y={OY - 8} textAnchor="middle" fontSize={9} fill={VIOLET}>
              R = 40 MPa
            </text>
          </motion.g>

          <motion.circle
            cx={xC}
            cy={OY}
            r={RADIUS * SCALE}
            fill="none"
            stroke={BLUE}
            strokeWidth={2.4}
            initial={false}
            animate={{ pathLength: circleP, opacity: circleP > 0 ? 1 : 0 }}
            transition={{ duration: 0.18, ease: 'linear' }}
          />

          <motion.path
            d={`M${xX} ${yX} L${xY} ${yY}`}
            fill="none"
            stroke={VIOLET}
            strokeWidth={1.5}
            strokeDasharray="5 4"
            initial={false}
            animate={{ opacity: pointP > 0 ? 0.9 : 0, pathLength: pointP }}
            transition={{ duration: 0.18, ease: 'linear' }}
          />
          <Marker x={xX} y={yX} color={BLUE} label="X=(80;34,64)" dx={8} dy={-6} reveal={pointP} />
          <Marker
            x={xY}
            y={yY}
            color={GREEN}
            label="Y=(40;−34,64)"
            dx={-84}
            dy={3}
            reveal={clamp01(pointP * 1.4 - 0.4)}
          />
          <Marker
            x={xOf(SIGMA_X)}
            y={yOf(-TAU)}
            color={MUTED}
            label="X′ — znak τ"
            dx={7}
            dy={13}
            reveal={clamp01(pointP * 1.3 - 0.3)}
            dashed
          />

          <motion.g
            fill="none"
            stroke={MUTED}
            strokeWidth={1.2}
            strokeDasharray="4 3"
            initial={false}
            animate={{ opacity: pointP > 0 ? 1 : 0 }}
          >
            <line x1={xC} y1={OY} x2={xFoot} y2={OY} />
            <line x1={xFoot} y1={OY} x2={xX} y2={yX} />
            <text x={(xC + xFoot) / 2} y={OY + 14} textAnchor="middle" fontSize={9} fill={MUTED} stroke="none">
              a = 20
            </text>
            <text x={xFoot + 5} y={(OY + yX) / 2} fontSize={9} fill={MUTED} stroke="none">
              τ = 34,64
            </text>
          </motion.g>

          <motion.g initial={false} animate={{ opacity: angleP }}>
            <motion.path
              d={`M${xC + angleRadius} ${OY} A ${angleRadius} ${angleRadius} 0 0 0 ${arcEndX} ${arcEndY}`}
              fill="none"
              stroke={ORANGE}
              strokeWidth={2}
              initial={false}
              animate={{ pathLength: angleP }}
              transition={{ duration: 0.18, ease: 'linear' }}
            />
            <text x={arcLabelX} y={arcLabelY} fontSize={9} fill={ORANGE}>
              2θp = 60°
            </text>
            <text x={xC + 8} y={OY + 32} fontSize={9} fill={ORANGE}>
              θp = 30°
            </text>
            <text x={12} y={256} fontSize={9} fill={MUTED}>
              dla −τxy: θp = −30°
            </text>
          </motion.g>

          <text x={445} y={118} textAnchor="end" fontSize={8} fill={MUTED}>
            obie osie w tej samej skali
          </text>
          <text x={445} y={282} textAnchor="end" fontSize={8} fill={MUTED}>
            {metric === 'model' ? 'zadanie odwrotne: od σ₁, σ₂ do X' : ''}
          </text>
        </svg>
      </div>
    </div>
  )
}
