import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const LOAD = '#ff6b45'
const MUTED = '#87929d'
const SUPPORT = '#68727e'
const INK = '#17202a'
const COMP = '#a970dd'

const CX = 188
const TOP = 48
const H1 = 95
const H2 = 95
const W1 = 38
const W2 = 27
const FREE = 28
const FREE_EACH = FREE / 2
const BOTTOM = TOP + H1 + H2
const JUNCTION = TOP + H1
const FREE_BOTTOM = BOTTOM + FREE

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}

function VDim({ x, from, to, label, color }: { x: number; from: number; to: number; label: string; color: string }) {
  const mid = (from + to) / 2
  return (
    <g stroke={color} fill={color}>
      <line x1={x} y1={from} x2={x} y2={to} strokeWidth={1.2} />
      <line x1={x - 4} y1={from} x2={x + 4} y2={from} strokeWidth={1.2} />
      <line x1={x - 4} y1={to} x2={x + 4} y2={to} strokeWidth={1.2} />
      <text x={x + 7} y={mid + 3} fontSize={9} stroke="none">
        {label}
      </text>
    </g>
  )
}

function Thermometer({ heat }: { heat: number }) {
  const x = 420
  const top = 76
  const bottom = 210
  const inner = bottom - top - 8
  return (
    <g>
      <rect x={x} y={top} width={12} height={bottom - top} rx={6} fill="#eef1f4" stroke="#c9d0d9" />
      <motion.rect
        x={x + 2}
        y={bottom - 4 - inner * heat}
        width={8}
        height={Math.max(1, inner * heat)}
        rx={4}
        fill={LOAD}
        initial={false}
        animate={{ y: bottom - 4 - inner * heat, height: Math.max(1, inner * heat) }}
        transition={{ duration: 0.2 }}
      />
      <circle cx={x + 6} cy={bottom + 2} r={7} fill={LOAD} opacity={0.25 + 0.75 * heat} />
      <text x={x + 6} y={top - 14} textAnchor="middle" fontSize={9} fill={heat > 0.05 ? LOAD : MUTED}>
        {heat > 0.05 ? '50 K' : '0 K'}
      </text>
      <text x={x + 6} y={bottom + 24} textAnchor="middle" fontSize={8} fill={MUTED}>
        ΔT
      </text>
    </g>
  )
}

export function SteppedThermalRestraintAnimation({ scene, index, playing, sceneProgress }: SolutionAnimationProps) {
  const mode = scene.focus?.metric ?? 'model'
  const isModel = mode === 'model'
  const isFree = mode === 'ΔL_T'
  const isRestraint = mode === 'restraint'
  const isN = mode === 'N'
  const isStress = mode === 'σ'
  const isCheck = mode === 'check'
  const compressed = isRestraint || isN || isStress || isCheck
  const activeSegment = scene.focus?.segment ?? (isStress ? '2' : undefined)

  const grow = isFree && playing ? smooth(clamp01(sceneProgress / 0.65)) : isFree ? 1 : 0
  const press = compressed ? (playing ? smooth(clamp01((sceneProgress - 0.12) / 0.55)) : 1) : 0
  const heat = isModel ? 0 : playing ? smooth(clamp01(sceneProgress * 1.5)) : 1
  const pulse = playing ? 0.68 + 0.32 * Math.sin((sceneProgress * 3 + index) * Math.PI * 2) : 1

  const junction = JUNCTION + (isFree ? FREE_EACH * grow : 0)
  const bottom = junction + H2 + (isFree ? FREE_EACH * grow : 0)
  const barColor = compressed ? COMP : ACCENT

  const originalPath = `M ${CX - W1} ${TOP} L ${CX + W1} ${TOP} L ${CX + W1} ${JUNCTION} L ${CX + W2} ${JUNCTION} L ${CX + W2} ${BOTTOM} L ${CX - W2} ${BOTTOM} L ${CX - W2} ${JUNCTION} L ${CX - W1} ${JUNCTION} Z`
  const freePath = `M ${CX - W1} ${TOP} L ${CX + W1} ${TOP} L ${CX + W1} ${JUNCTION + FREE_EACH} L ${CX + W2} ${JUNCTION + FREE_EACH} L ${CX + W2} ${FREE_BOTTOM} L ${CX - W2} ${FREE_BOTTOM} L ${CX - W2} ${JUNCTION + FREE_EACH} L ${CX - W1} ${JUNCTION + FREE_EACH} Z`
  const barPath = `M ${CX - W1} ${TOP} L ${CX + W1} ${TOP} L ${CX + W1} ${junction} L ${CX + W2} ${junction} L ${CX + W2} ${bottom} L ${CX - W2} ${bottom} L ${CX - W2} ${junction} L ${CX - W1} ${junction} Z`

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 300"
          role="img"
          aria-label="Schodkowy pręt utwierdzony na obu końcach. Animacja pokazuje swobodne wydłużenie termiczne, a następnie to samo ogrzanie przy nieruchomych podporach i powstające naprężenie ściskające."
        >
          <defs>
            <marker
              id="stepped-thermal-comp"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={COMP} />
            </marker>
          </defs>

          <g stroke={SUPPORT} strokeWidth={2} strokeLinecap="round">
            <line x1={CX - W1 - 20} y1={TOP} x2={CX + W1 + 20} y2={TOP} />
            {Array.from({ length: 11 }, (_, tick) => {
              const x = CX - W1 - 14 + tick * ((W1 * 2 + 28) / 10)
              return <line key={tick} x1={x} y1={TOP} x2={x - 7} y2={TOP - 11} strokeWidth={1.4} />
            })}
          </g>

          <motion.g
            stroke={SUPPORT}
            strokeWidth={2}
            strokeLinecap="round"
            initial={false}
            animate={{ opacity: isFree ? 0.3 : 1 }}
            transition={{ duration: 0.25 }}
          >
            <line x1={CX - W2 - 20} y1={BOTTOM} x2={CX + W2 + 20} y2={BOTTOM} />
            {Array.from({ length: 9 }, (_, tick) => {
              const x = CX - W2 - 14 + tick * ((W2 * 2 + 28) / 8)
              return (
                <line
                  key={tick}
                  x1={x}
                  y1={BOTTOM}
                  x2={x + 7}
                  y2={BOTTOM + 11}
                  strokeWidth={1.4}
                  strokeDasharray={isFree ? '3 3' : undefined}
                />
              )
            })}
          </motion.g>

          <path d={originalPath} fill="none" stroke={MUTED} strokeWidth={1.2} strokeDasharray="4 4" />

          {compressed && (
            <motion.path
              d={freePath}
              fill="none"
              stroke={MUTED}
              strokeWidth={1.2}
              strokeDasharray="5 4"
              initial={false}
              animate={{ opacity: 0.25 + 0.55 * press }}
              transition={{ duration: 0.2 }}
            />
          )}

          <motion.path
            d={barPath}
            fill={barColor}
            stroke={barColor}
            strokeWidth={2}
            initial={false}
            animate={{ fillOpacity: compressed ? 0.06 + 0.18 * press : 0.16 }}
            transition={{ duration: 0.2 }}
          />

          {isStress && activeSegment && (
            <motion.rect
              x={activeSegment === '1' ? CX - W1 : CX - W2}
              y={activeSegment === '1' ? TOP : JUNCTION}
              width={activeSegment === '1' ? W1 * 2 : W2 * 2}
              height={activeSegment === '1' ? JUNCTION - TOP : BOTTOM - JUNCTION}
              fill={COMP}
              initial={false}
              animate={{ opacity: 0.1 + 0.16 * press }}
              transition={{ duration: 0.2 }}
            />
          )}

          <motion.g
            stroke={LOAD}
            strokeWidth={2}
            fill="none"
            initial={false}
            animate={{ opacity: heat }}
            transition={{ duration: 0.3 }}
          >
            {Array.from({ length: 5 }, (_, wave) => {
              const y = TOP + 18 + wave * ((bottom - TOP - 36) / 4)
              return (
                <motion.path
                  key={wave}
                  d={`M ${CX + W2 + 18} ${y} q 12 -7 24 0`}
                  animate={playing ? { opacity: [0.35, 1, 0.35], x: [0, 3, 0] } : { opacity: 0.8 }}
                  transition={{ duration: 1.7, repeat: playing ? Infinity : 0, delay: wave * 0.14 }}
                />
              )
            })}
          </motion.g>

          <text x={16} y={34} fontSize={9} fill={INK}>
            L₁ = 500 mm
          </text>
          <text x={16} y={48} fontSize={9} fill={MUTED}>
            A₁ = 400 mm²
          </text>
          <text x={16} y={65} fontSize={9} fill={INK}>
            L₂ = 500 mm
          </text>
          <text x={16} y={79} fontSize={9} fill={MUTED}>
            A₂ = 250 mm²
          </text>
          <text x={16} y={96} fontSize={8.5} fill={MUTED}>
            E = 200 GPa
          </text>
          <text x={16} y={109} fontSize={8.5} fill={MUTED}>
            α = 12·10⁻⁶ 1/K
          </text>

          <text x={16} y={140} fontSize={8} fill={MUTED}>
            górny: A₁
          </text>
          <text x={16} y={205} fontSize={8} fill={MUTED}>
            dolny: A₂
          </text>

          <Thermometer heat={heat} />

          {isFree && (
            <>
              <VDim x={CX + W2 + 42} from={BOTTOM} to={FREE_BOTTOM} label="ΔL_T = 0,6 mm" color={LOAD} />
              <text x={CX - W2} y={BOTTOM + 34} fontSize={11} fontWeight={700} fill={ACCENT}>
                σ = 0
              </text>
            </>
          )}

          {compressed && (
            <>
              <VDim x={CX + W2 + 42} from={BOTTOM} to={FREE_BOTTOM} label="0,6 mm" color={MUTED} />
              <text x={CX - W2} y={FREE_BOTTOM + 24} fontSize={9} fill={MUTED}>
                swobodny koniec bez podpory
              </text>
            </>
          )}

          {isRestraint && (
            <>
              <text x={CX - W2} y={BOTTOM + 32} fontSize={11} fontWeight={700} fill={COMP}>
                ΔL = 0
              </text>
              <text x={CX - W2} y={BOTTOM + 46} fontSize={9} fill={COMP}>
                podpory ściskają pręt
              </text>
            </>
          )}

          {isN && (
            <motion.g
              stroke={COMP}
              fill={COMP}
              markerEnd="url(#stepped-thermal-comp)"
              initial={false}
              animate={{ opacity: press * (playing ? pulse : 1) }}
              transition={{ duration: 0.2 }}
            >
              <line x1={CX} y1={TOP + 6} x2={CX} y2={TOP + 34} strokeWidth={2.2} />
              <line x1={CX} y1={BOTTOM - 6} x2={CX} y2={BOTTOM - 34} strokeWidth={2.2} />
              <text x={CX + 12} y={TOP + 30} fontSize={10} stroke="none">
                N = −36,9 kN
              </text>
            </motion.g>
          )}

          {isStress && (
            <>
              <text
                x={CX + W1 + 16}
                y={TOP + 36}
                fontSize={10}
                fontWeight={700}
                fill={activeSegment === '1' ? COMP : MUTED}
              >
                σ₁ = −92,3 MPa
              </text>
              <text
                x={CX + W2 + 16}
                y={JUNCTION + 48}
                fontSize={10}
                fontWeight={activeSegment === '2' ? 700 : 400}
                fill={activeSegment === '2' ? COMP : MUTED}
              >
                σ₂ = −147,7 MPa
              </text>
              <text x={CX + W2 + 16} y={JUNCTION + 62} fontSize={8.5} fill={COMP}>
                cieńszy odcinek bardziej wytężony
              </text>
            </>
          )}

          {isCheck && (
            <>
              <text x={CX - W2} y={BOTTOM + 32} fontSize={9} fill={COMP}>
                skrócenia: 0,231 + 0,369 = 0,6 mm
              </text>
              <text x={CX - W2} y={BOTTOM + 46} fontSize={8.5} fill={MUTED}>
                całkowita długość bez zmian
              </text>
            </>
          )}

          <text x={16} y={296} fontSize={8} fill={MUTED}>
            {isModel
              ? 'przed ogrzaniem: oba końce nieruchome'
              : isFree
                ? 'myślowo bez dolnej podpory: swobodne wydłużenie'
                : 'ten sam ΔT = 50 K, ale całkowita długość pozostaje stała'}
          </text>
        </svg>
      </div>
    </div>
  )
}
