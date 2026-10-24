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

const OX = 190
const OY = 205
const SCALE = 1.5
const SIGMA_X = 90
const SIGMA_Y = 30
const TAU = 40
const CENTER = 60
const RADIUS = 50
const SIGMA_1 = 110
const SIGMA_2 = 10
const A = 30

const xOf = (sigma: number) => OX + sigma * SCALE
const yOf = (tau: number) => OY - tau * SCALE

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}

const ORDER: Record<string, number> = {
  model: 0,
  points: 1,
  center: 2,
  circle: 3,
  principal: 4,
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
}: {
  x: number
  y: number
  color: string
  label: string
  dx?: number
  dy?: number
  reveal: number
}) {
  return (
    <motion.g
      initial={false}
      animate={{ opacity: reveal, scale: reveal > 0.35 ? 1 : 0.6 }}
      transition={{ duration: 0.2, ease: 'linear' }}
      style={{ transformOrigin: `${x}px ${y}px` }}
    >
      <circle cx={x} cy={y} r={3.6} fill={color} />
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
          σx
        </text>
      </motion.g>
      <motion.g stroke={GREEN} fill={GREEN} strokeWidth={active ? 2.2 : 1.7} animate={{ opacity: active ? 1 : 0.55 }}>
        <line x1={midX} y1={top} x2={midX} y2={top - 22} />
        <path d={`M${midX - 4} ${top - 14} L${midX} ${top - 23} L${midX + 4} ${top - 14}`} fill="none" />
        <line x1={midX} y1={bottom} x2={midX} y2={bottom + 20} />
        <path d={`M${midX - 4} ${bottom + 12} L${midX} ${bottom + 21} L${midX + 4} ${bottom + 12}`} fill="none" />
        <text x={midX + 5} y={top - 26} fontSize={9} stroke="none">
          σy
        </text>
      </motion.g>
      <motion.g stroke={ORANGE} fill={ORANGE} strokeWidth={active ? 2.2 : 1.7} animate={{ opacity: active ? 1 : 0.55 }}>
        <line x1={left + 18} y1={top} x2={right - 18} y2={top} />
        <path d={`M${right - 26} ${top - 4} L${right - 17} ${top} L${right - 26} ${top + 4}`} fill="none" />
        <line x1={right - 18} y1={bottom} x2={left + 18} y2={bottom} />
        <path d={`M${left + 26} ${bottom - 4} L${left + 17} ${bottom} L${left + 26} ${bottom + 4}`} fill="none" />
        <text x={right - 30} y={top - 7} fontSize={9} stroke="none">
          τxy
        </text>
      </motion.g>
      <circle cx={midX} cy={midY} r={2} fill={EDGE} />
    </g>
  )
}

function DataPanel() {
  return (
    <g fontSize={9}>
      <text x={12} y={158} fill={MUTED}>
        dane
      </text>
      <text x={12} y={172} fill={BLUE}>
        σx = 90 MPa
      </text>
      <text x={12} y={186} fill={GREEN}>
        σy = 30 MPa
      </text>
      <text x={12} y={200} fill={ORANGE}>
        τxy = 40 MPa
      </text>
    </g>
  )
}

export function MohrDrawingExample1Animation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const p = playing ? smooth(sceneProgress) : 1
  const stage = ORDER[metric] ?? 0
  const at = (elementStage: number) => (stage > elementStage ? 1 : stage === elementStage ? p : 0)

  const lineup = at(1)
  const centerP = at(2)
  const circleP = at(3)
  const principalP = at(4)
  const angleP = at(5)

  const xX = xOf(SIGMA_X)
  const yX = yOf(TAU)
  const xY = xOf(SIGMA_Y)
  const yY = yOf(-TAU)
  const xC = xOf(CENTER)
  const xFoot = xOf(SIGMA_X)
  const x1 = xOf(SIGMA_1)
  const x2 = xOf(SIGMA_2)
  const topX = xC
  const topY = yOf(RADIUS)
  const bottomY = yOf(-RADIUS)
  const angleRadius = 62
  const angle = Math.atan2(TAU, A)
  const arcEndX = xC + Math.cos(angle) * angleRadius
  const arcEndY = OY - Math.sin(angle) * angleRadius
  const arcLabelX = xC + Math.cos(angle / 2) * (angleRadius + 14)
  const arcLabelY = OY - Math.sin(angle / 2) * (angleRadius + 14)

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 300"
          role="img"
          aria-label="Koło Mohra dla σx = 90 MPa, σy = 30 MPa i τxy = 40 MPa. Animacja pokazuje punkty X i Y, środek, promień, okrąg, przecięcia z osią i kąt kierunku głównego."
        >
          <defs>
            <marker
              id="mohr1-axis"
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
          <DataPanel />

          <g stroke={AXIS} strokeWidth={1}>
            <line x1={145} y1={OY} x2={448} y2={OY} markerEnd="url(#mohr1-axis)" />
            <line x1={OX} y1={128} x2={OX} y2={288} markerEnd="url(#mohr1-axis)" />
          </g>
          <text x={450} y={OY - 6} textAnchor="end" fontSize={10} fill={MUTED}>
            σ
          </text>
          <text x={OX + 6} y={132} fontSize={10} fill={MUTED}>
            τ
          </text>

          <motion.path
            d={`M${xX} ${yX} L${xY} ${yY}`}
            fill="none"
            stroke={VIOLET}
            strokeWidth={1.6}
            strokeDasharray="5 4"
            initial={false}
            animate={{ opacity: lineup > 0 ? 0.9 : 0, pathLength: lineup }}
            transition={{ duration: 0.18, ease: 'linear' }}
          />

          <Marker x={xX} y={yX} color={BLUE} label="X" dx={8} dy={15} reveal={clamp01(lineup * 2)} />
          <Marker x={xY} y={yY} color={GREEN} label="Y" dx={-16} dy={13} reveal={clamp01(lineup * 2 - 1)} />

          <Marker x={xC} y={OY} color={INK} label="C" dx={-5} dy={16} reveal={centerP} />

          <motion.path
            d={`M${xC} ${OY} L${xX} ${yX}`}
            fill="none"
            stroke={VIOLET}
            strokeWidth={2.4}
            initial={false}
            animate={{ pathLength: centerP, opacity: centerP > 0 ? 1 : 0 }}
            transition={{ duration: 0.18, ease: 'linear' }}
          />
          <motion.g
            fill="none"
            stroke={MUTED}
            strokeWidth={1.2}
            strokeDasharray="4 3"
            initial={false}
            animate={{ opacity: centerP > 0 ? 1 : 0 }}
          >
            <line x1={xC} y1={OY} x2={xFoot} y2={OY} />
            <line x1={xFoot} y1={OY} x2={xX} y2={yX} />
            <text x={(xC + xFoot) / 2} y={OY + 14} textAnchor="middle" fontSize={9} fill={MUTED} stroke="none">
              a = 30
            </text>
            <text x={xFoot + 5} y={(OY + yX) / 2} fontSize={9} fill={MUTED} stroke="none">
              τ = 40
            </text>
          </motion.g>
          <motion.text
            initial={false}
            animate={{ opacity: centerP }}
            x={(xC + xX) / 2 - 38}
            y={(OY + yX) / 2 - 10}
            fontSize={9}
            fill={VIOLET}
          >
            R = 50 MPa
          </motion.text>

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

          <Marker x={x2} y={OY} color={GREEN} label="σ₂=10" dx={-30} dy={-8} reveal={principalP} />
          <Marker x={x1} y={OY} color={BLUE} label="σ₁=110" dx={5} dy={-8} reveal={principalP} />
          <text x={xC} y={OY - 8} textAnchor="middle" fontSize={9} fill={INK} opacity={principalP}>
            C = 60 MPa
          </text>

          <motion.g initial={false} animate={{ opacity: angleP }}>
            <line x1={xC} y1={OY} x2={topX} y2={topY} stroke={ORANGE} strokeWidth={1.6} strokeDasharray="4 3" />
            <line
              x1={xC}
              y1={OY}
              x2={topX}
              y2={bottomY}
              stroke={ORANGE}
              strokeWidth={1.2}
              strokeDasharray="3 4"
              opacity={0.6}
            />
            <circle cx={topX} cy={topY} r={3.4} fill={ORANGE} />
            <text x={topX + 7} y={topY + 2} fontSize={9} fill={ORANGE}>
              τmax = 50 MPa
            </text>
            <text x={topX + 7} y={topY + 14} fontSize={9} fill={MUTED}>
              przy σ = 60 MPa
            </text>
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
              2θp = 53,13°
            </text>
            <text x={xC + 8} y={OY + 32} fontSize={9} fill={ORANGE}>
              θp ≈ 26,57°
            </text>
          </motion.g>

          <text x={OX + 8} y={288} fontSize={8} fill={MUTED}>
            obie osie w tej samej skali
          </text>
          <text x={445} y={286} textAnchor="end" fontSize={8} fill={MUTED}>
            {metric === 'model' ? 'najpierw dane' : ''}
          </text>
        </svg>
      </div>
    </div>
  )
}
