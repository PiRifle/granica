import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const STEEL = '#4f6df5'
const ALU = '#ff8a5c'
const LOAD = '#ff6b45'
const SUPPORT = '#68727e'
const MUTED = '#87929d'

const TOP = 62
const BASE = 138
const BOTTOM = TOP + BASE
const HALF = 30
const SCALE = 9
const STEEL_CX = 150
const ALU_CX = 320
const STEEL_DELTA = 0.75 * SCALE
const ALU_DELTA = 2.14 * SCALE

const clamp = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp(value)
  return t * t * (3 - 2 * t)
}

function Support({ cx }: { cx: number }) {
  return (
    <g stroke={SUPPORT} strokeWidth={2} strokeLinecap="round">
      <line x1={cx - HALF - 18} y1={TOP} x2={cx + HALF + 18} y2={TOP} />
      {Array.from({ length: 7 }, (_, index) => {
        const x = cx - HALF - 13 + index * ((HALF * 2 + 26) / 6)
        return <line key={index} x1={x} y1={TOP} x2={x - 7} y2={TOP - 11} strokeWidth={1.5} />
      })}
    </g>
  )
}

function DeltaBracket({
  cx,
  stretch,
  label,
  color,
  show,
}: {
  cx: number
  stretch: number
  label: string
  color: string
  show: boolean
}) {
  const x = cx + HALF + 12
  const bottom = BOTTOM + stretch
  return (
    <motion.g initial={{ opacity: 0 }} animate={{ opacity: show && stretch > 0.5 ? 1 : 0 }}>
      <line x1={x} y1={BOTTOM} x2={x} y2={bottom} stroke={color} strokeWidth={1.3} />
      <line x1={x - 5} y1={BOTTOM} x2={x + 5} y2={BOTTOM} stroke={color} strokeWidth={1.3} />
      <line x1={x - 5} y1={bottom} x2={x + 5} y2={bottom} stroke={color} strokeWidth={1.3} />
      <text x={x + 7} y={bottom + 13} fontSize={8.5} fontWeight={700} fill={color}>
        {label}
      </text>
    </motion.g>
  )
}

export function HookeLawExample2Animation({ scene, index, playing, sceneProgress }: SolutionAnimationProps) {
  const p = playing ? clamp(sceneProgress) : 1
  const segment = scene.focus?.segment
  const metric = scene.focus?.metric
  const stretchT = index === 0 ? 0 : smooth((p - 0.08) / 0.84)
  const steelStretch = STEEL_DELTA * stretchT
  const aluStretch = ALU_DELTA * stretchT
  const steelBottom = BOTTOM + steelStretch
  const aluBottom = BOTTOM + aluStretch
  const loadAmount = index === 0 ? smooth(p / 0.72) : 1
  const steelDim = segment === 'a'
  const aluDim = segment === 's'
  const showSteelDelta = index >= 1 && segment !== 'a'
  const showAluDelta = index >= 2 && segment !== 's'
  const metricActive = metric === 'σ' || metric === 'ε' || metric === 'ΔL'

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 280"
          role="img"
          aria-label="Dwa pręty obok siebie, stalowy i aluminiowy, rozciągane tą samą siłą 20 kN; aluminium wydłuża się bardziej"
        >
          <text x={230} y={17} textAnchor="middle" fontSize={9.5} fill={MUTED}>
            N = 20 kN · A = 200 mm² · σ = 100 MPa
          </text>

          <text x={STEEL_CX} y={36} textAnchor="middle" fontSize={11} fontWeight={700} fill={STEEL}>
            stal
          </text>
          <text x={STEEL_CX} y={48} textAnchor="middle" fontSize={8.5} fill={MUTED}>
            E_s = 200 GPa
          </text>
          <text x={ALU_CX} y={36} textAnchor="middle" fontSize={11} fontWeight={700} fill={ALU}>
            aluminium
          </text>
          <text x={ALU_CX} y={48} textAnchor="middle" fontSize={8.5} fill={MUTED}>
            E_a = 70 GPa
          </text>

          <Support cx={STEEL_CX} />
          <Support cx={ALU_CX} />

          <g stroke={MUTED} strokeWidth={1.2} fill="none">
            <line x1={70} y1={TOP} x2={70} y2={BOTTOM} />
            <line x1={65} y1={TOP} x2={75} y2={TOP} />
            <line x1={65} y1={BOTTOM} x2={75} y2={BOTTOM} />
            <text
              x={62}
              y={TOP + BASE / 2}
              textAnchor="middle"
              fontSize={9}
              fill={MUTED}
              stroke="none"
              transform={`rotate(-90 62 ${TOP + BASE / 2})`}
            >
              L₀ = 1,5 m
            </text>
          </g>

          <motion.rect
            x={STEEL_CX - HALF}
            y={TOP}
            width={HALF * 2}
            height={BASE + steelStretch}
            rx={4}
            fill={STEEL}
            initial={false}
            animate={{
              height: BASE + steelStretch,
              fillOpacity: steelDim ? 0.1 : metricActive ? 0.24 : 0.16,
              strokeWidth: steelDim ? 1.6 : 2.6,
            }}
            transition={{ duration: 0.12, ease: 'linear' }}
            stroke={STEEL}
          />

          <motion.rect
            x={ALU_CX - HALF}
            y={TOP}
            width={HALF * 2}
            height={BASE + aluStretch}
            rx={4}
            fill={ALU}
            initial={false}
            animate={{
              height: BASE + aluStretch,
              fillOpacity: aluDim ? 0.1 : metricActive ? 0.24 : 0.16,
              strokeWidth: aluDim ? 1.6 : 2.6,
            }}
            transition={{ duration: 0.12, ease: 'linear' }}
            stroke={ALU}
          />

          <motion.line
            x1={STEEL_CX - HALF - 6}
            y1={BOTTOM}
            x2={STEEL_CX + HALF + 6}
            y2={BOTTOM}
            stroke={MUTED}
            strokeWidth={1.2}
            strokeDasharray="4 4"
            initial={false}
            animate={{ opacity: steelStretch > 0.5 ? 0.9 : 0 }}
          />
          <motion.line
            x1={ALU_CX - HALF - 6}
            y1={BOTTOM}
            x2={ALU_CX + HALF + 6}
            y2={BOTTOM}
            stroke={MUTED}
            strokeWidth={1.2}
            strokeDasharray="4 4"
            initial={false}
            animate={{ opacity: aluStretch > 0.5 ? 0.9 : 0 }}
          />

          <text x={STEEL_CX} y={TOP + 30} textAnchor="middle" fontSize={8.5} fill={STEEL}>
            A = 200 mm²
          </text>
          <text x={STEEL_CX} y={TOP + 46} textAnchor="middle" fontSize={8.5} fill={STEEL}>
            σ = 100 MPa
          </text>
          <text x={ALU_CX} y={TOP + 30} textAnchor="middle" fontSize={8.5} fill={ALU}>
            A = 200 mm²
          </text>
          <text x={ALU_CX} y={TOP + 46} textAnchor="middle" fontSize={8.5} fill={ALU}>
            σ = 100 MPa
          </text>

          <DeltaBracket
            cx={STEEL_CX}
            stretch={steelStretch}
            label="ΔL_s = 0,75 mm"
            color={STEEL}
            show={showSteelDelta}
          />
          <DeltaBracket cx={ALU_CX} stretch={aluStretch} label="ΔL_a ≈ 2,14 mm" color={ALU} show={showAluDelta} />

          <motion.g initial={{ opacity: 0 }} animate={{ opacity: loadAmount }} stroke={LOAD} fill={LOAD}>
            <line x1={STEEL_CX} y1={steelBottom + 6} x2={STEEL_CX} y2={steelBottom + 32} strokeWidth={2.4} />
            <path
              d={`M${STEEL_CX - 5} ${steelBottom + 25} L${STEEL_CX} ${steelBottom + 33} L${STEEL_CX + 5} ${
                steelBottom + 25
              }`}
              fill="none"
              strokeWidth={2.4}
            />
            <text x={STEEL_CX + 8} y={steelBottom + 24} fontSize={9} stroke="none">
              N
            </text>

            <line x1={ALU_CX} y1={aluBottom + 6} x2={ALU_CX} y2={aluBottom + 32} strokeWidth={2.4} />
            <path
              d={`M${ALU_CX - 5} ${aluBottom + 25} L${ALU_CX} ${aluBottom + 33} L${ALU_CX + 5} ${aluBottom + 25}`}
              fill="none"
              strokeWidth={2.4}
            />
            <text x={ALU_CX + 8} y={aluBottom + 24} fontSize={9} stroke="none">
              N
            </text>
          </motion.g>

          <text x={230} y={272} textAnchor="middle" fontSize={8} fill={MUTED}>
            schemat: wydłużenia pokazano w powiększeniu
          </text>
        </svg>
      </div>
    </div>
  )
}
