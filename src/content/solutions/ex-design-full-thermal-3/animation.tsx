import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const LOAD = '#ff6b45'
const MUTED = '#87929d'
const SUPPORT = '#68727e'
const INK = '#17202a'
const COMP = '#a970dd'
const BAD = '#d64545'
const ALU = '#2f8d6a'

const X0 = 88
const XR = 372
const BAR_Y = 132
const BAR_H = 36
const FREE = 46

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}

function HDim({ y, from, to, label, color }: { y: number; from: number; to: number; label: string; color: string }) {
  const mid = (from + to) / 2
  return (
    <g stroke={color} fill={color}>
      <line x1={from} y1={y} x2={to} y2={y} strokeWidth={1.2} />
      <line x1={from} y1={y - 4} x2={from} y2={y + 4} strokeWidth={1.2} />
      <line x1={to} y1={y - 4} x2={to} y2={y + 4} strokeWidth={1.2} />
      <text x={mid} y={y - 6} textAnchor="middle" fontSize={9} stroke="none">
        {label}
      </text>
    </g>
  )
}

function FixedSupport({ x, opacity = 1 }: { x: number; opacity?: number }) {
  const direction = x < (X0 + XR) / 2 ? -1 : 1
  return (
    <motion.g
      stroke={SUPPORT}
      strokeWidth={2}
      strokeLinecap="round"
      initial={false}
      animate={{ opacity }}
      transition={{ duration: 0.25 }}
    >
      <line x1={x} y1={BAR_Y - 22} x2={x} y2={BAR_Y + BAR_H + 22} />
      {Array.from({ length: 6 }, (_, tick) => {
        const y = BAR_Y - 16 + tick * 12
        return <line key={tick} x1={x} y1={y} x2={x + direction * 11} y2={y + 7} strokeWidth={1.3} />
      })}
    </motion.g>
  )
}

function HeatWaves({ from, to, opacity, playing }: { from: number; to: number; opacity: number; playing: boolean }) {
  const span = Math.max(24, to - from - 40)
  return (
    <motion.g
      stroke={LOAD}
      strokeWidth={1.8}
      fill="none"
      initial={false}
      animate={{ opacity }}
      transition={{ duration: 0.3 }}
    >
      {Array.from({ length: 6 }, (_, wave) => {
        const x = from + 20 + (wave * span) / 5
        return (
          <motion.path
            key={wave}
            d={`M ${x} ${BAR_Y - 9} q 8 -14 0 -23`}
            animate={playing ? { opacity: [0.35, 1, 0.35], y: [0, -3, 0] } : { opacity: 0.8 }}
            transition={{ duration: 1.7, repeat: playing ? Infinity : 0, delay: wave * 0.15 }}
          />
        )
      })}
    </motion.g>
  )
}

function CompressionArrows({
  from,
  to,
  opacity,
  marker = 'url(#thermal-limit-comp)',
}: {
  from: number
  to: number
  opacity: number
  marker?: string
}) {
  const y = BAR_Y + BAR_H / 2
  return (
    <motion.g stroke={COMP} fill={COMP} initial={false} animate={{ opacity }} transition={{ duration: 0.2 }}>
      <line x1={from + 8} y1={y} x2={from + 34} y2={y} strokeWidth={2.2} markerEnd={marker} />
      <line x1={to - 8} y1={y} x2={to - 34} y2={y} strokeWidth={2.2} markerEnd={marker} />
    </motion.g>
  )
}

function MaterialPlot({
  mode,
  progress,
  playing,
}: {
  mode: 'steel' | 'materials'
  progress: number
  playing: boolean
}) {
  const reveal = playing ? progress : 1
  const xOf = (deltaT: number) => 88 + (deltaT / 110) * 330
  const yOf = (sigma: number) => 244 - (sigma / 270) * 200
  const limit = 160

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 300"
          role="img"
          aria-label={
            mode === 'steel'
              ? 'Wykres naprężenia ściskającego w funkcji temperatury dla stali. Linia przecina dopuszczalne 160 MPa przy 66,7 K.'
              : 'Porównanie stali i aluminium. Przy tym samym limicie 160 MPa stal osiąga go przy 66,7 K, a aluminium przy 99,4 K.'
          }
        >
          <line x1={88} y1={40} x2={88} y2={244} stroke="#c9d0d9" strokeWidth={1} />
          <line x1={88} y1={244} x2={424} y2={244} stroke="#c9d0d9" strokeWidth={1} />

          {[0, 80, 160, 240].map((tick) => (
            <g key={tick}>
              <line x1={84} y1={yOf(tick)} x2={88} y2={yOf(tick)} stroke={MUTED} strokeWidth={1} />
              <text x={78} y={yOf(tick) + 3} textAnchor="end" fontSize={8} fill={MUTED}>
                {tick}
              </text>
            </g>
          ))}
          <text x={88} y={52} textAnchor="middle" fontSize={8.5} fill={MUTED}>
            |σ| [MPa]
          </text>

          <line x1={88} y1={yOf(limit)} x2={424} y2={yOf(limit)} stroke={BAD} strokeWidth={1.4} strokeDasharray="5 4" />
          <text x={92} y={yOf(limit) - 6} fontSize={9} fontWeight={700} fill={BAD}>
            k_c = 160 MPa
          </text>

          <motion.path
            d={`M ${xOf(0)} ${yOf(0)} L ${xOf(80)} ${yOf(192)}`}
            fill="none"
            stroke={ACCENT}
            strokeWidth={2.6}
            initial={false}
            animate={{ pathLength: reveal }}
            transition={{ duration: 0.12, ease: 'linear' }}
          />
          <text x={xOf(80) + 4} y={yOf(192) + 4} fontSize={8.5} fill={ACCENT}>
            stal
          </text>

          {mode === 'materials' && (
            <>
              <motion.path
                d={`M ${xOf(0)} ${yOf(0)} L ${xOf(110)} ${yOf(177.1)}`}
                fill="none"
                stroke={ALU}
                strokeWidth={2.6}
                initial={false}
                animate={{ pathLength: reveal }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <text x={xOf(110) - 4} y={yOf(177.1) + 4} textAnchor="end" fontSize={8.5} fill={ALU}>
                aluminium
              </text>
            </>
          )}

          <circle cx={xOf(66.7)} cy={yOf(limit)} r={4} fill={BAD} />
          <line
            x1={xOf(66.7)}
            y1={yOf(limit)}
            x2={xOf(66.7)}
            y2={244}
            stroke={BAD}
            strokeWidth={1}
            strokeDasharray="3 3"
          />
          <text x={xOf(66.7)} y={258} textAnchor="middle" fontSize={8.5} fill={BAD}>
            66,7
          </text>
          <text x={xOf(66.7) + 6} y={yOf(limit) - 8} fontSize={9} fontWeight={700} fill={BAD}>
            ΔT_max
          </text>

          {mode === 'materials' && (
            <>
              <circle cx={xOf(99.4)} cy={yOf(limit)} r={4} fill={ALU} />
              <line
                x1={xOf(99.4)}
                y1={yOf(limit)}
                x2={xOf(99.4)}
                y2={244}
                stroke={ALU}
                strokeWidth={1}
                strokeDasharray="3 3"
              />
              <text x={xOf(99.4)} y={258} textAnchor="middle" fontSize={8.5} fill={ALU}>
                99,4
              </text>
            </>
          )}

          {[0, 50, 100].map((tick) => (
            <g key={tick}>
              <line x1={xOf(tick)} y1={244} x2={xOf(tick)} y2={250} stroke={MUTED} strokeWidth={1} />
              <text x={xOf(tick)} y={270} textAnchor="middle" fontSize={8} fill={MUTED}>
                {tick}
              </text>
            </g>
          ))}
          <text x={424} y={270} textAnchor="end" fontSize={8.5} fill={MUTED}>
            ΔT [K]
          </text>

          <text x={16} y={24} fontSize={9} fontWeight={700} fill={INK}>
            {mode === 'steel' ? 'Granica naprężenia dla stali' : 'Stal i aluminium przy k_c = 160 MPa'}
          </text>
          <text x={16} y={40} fontSize={8.5} fill={MUTED}>
            {mode === 'steel' ? 'nachylenie Eα = 2,4 MPa/K' : 'decyduje iloczyn Eα, nie samo α'}
          </text>
          <text x={16} y={286} fontSize={8.5} fill={MUTED}>
            {mode === 'steel'
              ? 'przy 66,7 K naprężenie osiąga k_c; powyżej przekracza limit'
              : 'aluminium ma większe α, ale mniejsze E, więc jego limit jest wyższy'}
          </text>
        </svg>
      </div>
    </div>
  )
}

function FixedBarScene({ mode, progress, playing }: { mode: 'model' | 'ramp'; progress: number; playing: boolean }) {
  const isRamp = mode === 'ramp'
  const deltaT = 66.7 * progress
  const sigma = 160 * progress
  const ghostEnd = XR + FREE * (isRamp ? progress : 0)
  const heat = isRamp ? (playing ? smooth(clamp01(progress * 1.2)) : 1) : 0
  const pulse = playing ? 0.68 + 0.32 * Math.sin(progress * 5 * Math.PI * 2) : 1

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 300"
          role="img"
          aria-label="Pręt idealnie zablokowany. Animacja pokazuje, że swobodne wydłużenie termiczne jest blokowane, a naprężenie ściskające rośnie proporcjonalnie do temperatury."
        >
          <defs>
            <marker
              id="thermal-limit-comp"
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

          <FixedSupport x={X0} />
          <FixedSupport x={XR} />

          <rect
            x={X0}
            y={BAR_Y}
            width={XR - X0}
            height={BAR_H}
            rx={4}
            fill="none"
            stroke={MUTED}
            strokeWidth={1.2}
            strokeDasharray="4 4"
          />

          {isRamp && (
            <motion.rect
              x={X0}
              y={BAR_Y}
              height={BAR_H}
              rx={4}
              initial={false}
              animate={{ width: Math.max(1, ghostEnd - X0) }}
              transition={{ duration: 0.12, ease: 'linear' }}
              fill="none"
              stroke={MUTED}
              strokeWidth={1.2}
              strokeDasharray="5 5"
              opacity={0.8}
            />
          )}

          <motion.rect
            x={X0}
            y={BAR_Y}
            width={XR - X0}
            height={BAR_H}
            rx={4}
            fill={isRamp ? BAD : ACCENT}
            initial={false}
            animate={{ fillOpacity: isRamp ? 0.12 + 0.2 * progress : 0.16 }}
            transition={{ duration: 0.2 }}
            stroke={isRamp ? BAD : ACCENT}
            strokeWidth={2}
          />

          {isRamp && (
            <>
              <HeatWaves from={X0} to={XR} opacity={heat} playing={playing} />
              <CompressionArrows from={X0} to={XR} opacity={progress * (playing ? pulse : 1)} />
              <HDim y={BAR_Y + BAR_H + 42} from={XR} to={ghostEnd} label="zablokowane ΔL_T" color={COMP} />
              <text x={X0 + 10} y={BAR_Y + BAR_H + 18} fontSize={11} fontWeight={700} fill={BAD}>
                σ = −{sigma.toFixed(1).replace('.', ',')} MPa
              </text>
              <text x={X0 + 10} y={BAR_Y + BAR_H + 64} fontSize={9} fill={COMP}>
                swobodne wydłużenie rośnie, ale ΔL = 0
              </text>
            </>
          )}

          {!isRamp && (
            <text x={X0} y={BAR_Y + BAR_H + 42} fontSize={9} fill={MUTED}>
              oba końce nieruchome; szukamy ΔT_max dla |σ| = k_c
            </text>
          )}

          <text x={16} y={22} fontSize={9} fill={INK}>
            E = 200 GPa, α = 12·10⁻⁶ 1/K
          </text>
          <text x={16} y={36} fontSize={8.5} fill={MUTED}>
            k_c = 160 MPa, L i A nie zmieniają σ
          </text>
          <text x={444} y={22} textAnchor="end" fontSize={10} fontWeight={700} fill={heat > 0.05 ? LOAD : MUTED}>
            {isRamp ? `ΔT = ${deltaT.toFixed(1).replace('.', ',')} K` : 'ΔT = ?'}
          </text>
          <text x={444} y={38} textAnchor="end" fontSize={8.5} fill={MUTED}>
            pręt stalowy
          </text>
          <text x={16} y={288} fontSize={8.5} fill={MUTED}>
            {isRamp ? 'naprężenie rośnie liniowo: |σ| = EαΔT' : 'przed ogrzaniem: pręt idealnie zablokowany'}
          </text>
        </svg>
      </div>
    </div>
  )
}

function GapBarScene({ progress, playing }: { progress: number; playing: boolean }) {
  const x0 = 86
  const base = 220
  const gap = 44
  const supportX = x0 + base + gap
  const ext = gap * progress
  const barEnd = x0 + base + ext
  const gapNow = supportX - barEnd
  const heat = playing ? smooth(clamp01(progress * 1.2)) : 1
  const direction = -1

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 300"
          role="img"
          aria-label="Pręt z luzem dobranym do swobodnego wydłużenia przy 80 K. Luz 1,44 mm domyka się dokładnie wtedy, gdy pręt dotyka podpory, więc naprężenie pozostaje zerowe."
        >
          <g stroke={SUPPORT} strokeWidth={2} strokeLinecap="round">
            <line x1={x0} y1={BAR_Y - 22} x2={x0} y2={BAR_Y + BAR_H + 22} />
            {Array.from({ length: 6 }, (_, tick) => {
              const y = BAR_Y - 16 + tick * 12
              return <line key={`l-${tick}`} x1={x0} y1={y} x2={x0 + direction * 11} y2={y + 7} strokeWidth={1.3} />
            })}
            <rect x={supportX - 4} y={BAR_Y - 14} width={8} height={BAR_H + 28} fill={SUPPORT} stroke="none" />
            {Array.from({ length: 5 }, (_, tick) => {
              const y = BAR_Y - 10 + tick * 11
              return <line key={`r-${tick}`} x1={supportX + 4} y1={y} x2={supportX + 13} y2={y + 5} strokeWidth={1.3} />
            })}
          </g>

          <rect
            x={x0}
            y={BAR_Y}
            width={base}
            height={BAR_H}
            rx={4}
            fill="none"
            stroke={MUTED}
            strokeWidth={1.2}
            strokeDasharray="4 4"
          />

          <motion.rect
            x={x0}
            y={BAR_Y}
            height={BAR_H}
            rx={4}
            initial={false}
            animate={{ width: Math.max(1, base + ext) }}
            transition={{ duration: 0.12, ease: 'linear' }}
            fill={ACCENT}
            fillOpacity={0.16}
            stroke={ACCENT}
            strokeWidth={2}
          />

          <g stroke={LOAD} strokeWidth={1.8} fill="none" opacity={heat}>
            {Array.from({ length: 6 }, (_, wave) => {
              const x = x0 + 20 + (wave * (base + ext - 40)) / 5
              return <path key={wave} d={`M ${x} ${BAR_Y - 9} q 8 -14 0 -23`} />
            })}
          </g>

          {gapNow > 1 ? (
            <HDim y={BAR_Y + BAR_H + 22} from={barEnd} to={supportX} label="g = 1,44 mm" color={MUTED} />
          ) : (
            <g stroke={SUPPORT} strokeWidth={2}>
              <line x1={supportX - 12} y1={BAR_Y + BAR_H + 14} x2={supportX + 12} y2={BAR_Y + BAR_H + 14} />
              <line x1={supportX - 12} y1={BAR_Y + BAR_H + 20} x2={supportX + 12} y2={BAR_Y + BAR_H + 20} />
              <text x={supportX} y={BAR_Y + BAR_H + 36} textAnchor="middle" fontSize={9} fill={MUTED} stroke="none">
                kontakt bez ściskania
              </text>
            </g>
          )}

          <HDim y={BAR_Y + BAR_H + 58} from={x0 + base} to={barEnd} label="ΔL_T = 1,44 mm" color={LOAD} />

          <text x={x0 + 10} y={BAR_Y + BAR_H + 18} fontSize={11} fontWeight={700} fill={ACCENT}>
            σ = 0
          </text>
          <text x={16} y={22} fontSize={9} fill={INK}>
            ΔT = 80 K, L = 1500 mm
          </text>
          <text x={16} y={36} fontSize={8.5} fill={MUTED}>
            α = 12·10⁻⁶ 1/K
          </text>
          <text x={444} y={22} textAnchor="end" fontSize={10} fontWeight={700} fill={heat > 0.05 ? LOAD : MUTED}>
            luz zamiast większego przekroju
          </text>
          <text x={16} y={288} fontSize={8.5} fill={MUTED}>
            g = αΔT L; luz dobrany do wydłużenia usuwa naprężenie przy tej temperaturze
          </text>
        </svg>
      </div>
    </div>
  )
}

function BucklingScene({ progress, playing }: { progress: number; playing: boolean }) {
  const mid = (X0 + XR) / 2
  const bow = 34 * progress
  const path = `M ${X0} ${BAR_Y + BAR_H / 2} C ${X0 + (XR - X0) * 0.32} ${BAR_Y + BAR_H / 2 - bow}, ${X0 + (XR - X0) * 0.68} ${BAR_Y + BAR_H / 2 - bow}, ${XR} ${BAR_Y + BAR_H / 2}`
  const pulse = playing ? 0.7 + 0.3 * Math.sin(progress * 4 * Math.PI * 2) : 1

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 300"
          role="img"
          aria-label="Ściskany pręt zablokowany na obu końcach wygina się w wyboczeniu. Stateczność może decydować o dopuszczalnej temperaturze wcześniej niż naprężenie 160 MPa."
        >
          <defs>
            <marker
              id="thermal-limit-buckling"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={BAD} />
            </marker>
          </defs>

          <FixedSupport x={X0} />
          <FixedSupport x={XR} />

          <path
            d={`M ${X0} ${BAR_Y + BAR_H / 2} L ${XR} ${BAR_Y + BAR_H / 2}`}
            fill="none"
            stroke={MUTED}
            strokeWidth={1.2}
            strokeDasharray="4 4"
          />

          <motion.path
            d={path}
            fill="none"
            stroke={BAD}
            strokeWidth={BAR_H}
            strokeLinecap="round"
            initial={false}
            animate={{ opacity: 0.16 + 0.16 * progress }}
            transition={{ duration: 0.15 }}
          />
          <motion.path
            d={path}
            fill="none"
            stroke={BAD}
            strokeWidth={BAR_H - 11}
            strokeLinecap="round"
            initial={false}
            animate={{ opacity: 0.28 + 0.28 * progress }}
            transition={{ duration: 0.15 }}
          />

          <motion.g
            stroke={BAD}
            fill={BAD}
            initial={false}
            animate={{ opacity: progress * pulse }}
            transition={{ duration: 0.2 }}
          >
            <line
              x1={X0 + 10}
              y1={BAR_Y + BAR_H / 2}
              x2={X0 + 40}
              y2={BAR_Y + BAR_H / 2}
              strokeWidth={2.2}
              markerEnd="url(#thermal-limit-buckling)"
            />
            <line
              x1={XR - 10}
              y1={BAR_Y + BAR_H / 2}
              x2={XR - 40}
              y2={BAR_Y + BAR_H / 2}
              strokeWidth={2.2}
              markerEnd="url(#thermal-limit-buckling)"
            />
          </motion.g>

          <motion.g
            animate={playing ? { opacity: [0.65, 1, 0.65] } : { opacity: 1 }}
            transition={{ duration: 1.5, repeat: playing ? Infinity : 0 }}
          >
            <text x={mid} y={BAR_Y - 48} textAnchor="middle" fontSize={12} fontWeight={700} fill={BAD}>
              wyboczenie
            </text>
            <text x={mid} y={BAR_Y - 32} textAnchor="middle" fontSize={8.5} fill={MUTED}>
              stateczność, nie tylko wytrzymałość
            </text>
          </motion.g>

          <text x={16} y={22} fontSize={9} fill={INK}>
            k_c = 160 MPa
          </text>
          <text x={16} y={36} fontSize={8.5} fill={MUTED}>
            smukły pręt ściskany
          </text>
          <text x={16} y={288} fontSize={8.5} fill={MUTED}>
            sprawdź wyboczenie; może wystąpić przed osiągnięciem σ = 160 MPa
          </text>
        </svg>
      </div>
    </div>
  )
}

export function ThermalLimitDesignAnimation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const mode = scene.focus?.metric ?? 'model'
  const progress = playing ? smooth(sceneProgress) : 1

  if (mode === 'limit') return <MaterialPlot mode="steel" progress={progress} playing={playing} />
  if (mode === 'materials') return <MaterialPlot mode="materials" progress={progress} playing={playing} />
  if (mode === 'gap') return <GapBarScene progress={progress} playing={playing} />
  if (mode === 'buckling') return <BucklingScene progress={progress} playing={playing} />
  return <FixedBarScene mode={mode === 'ramp' ? 'ramp' : 'model'} progress={progress} playing={playing} />
}
