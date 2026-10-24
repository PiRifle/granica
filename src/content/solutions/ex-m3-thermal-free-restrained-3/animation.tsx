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

const X0 = 86
const BASE = 238
const GAP = 24
const FREE = (8.4 / 3) * GAP
const SUPPORT_X = X0 + BASE + GAP
const PIPE_Y = 112
const PIPE_H = 38
const FREE_END = X0 + BASE + FREE

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

function DesignPlot({ sceneProgress, playing }: { sceneProgress: number; playing: boolean }) {
  const xOf = (deltaT: number) => 84 + (deltaT / 80) * 340
  const yOf = (sigma: number) => 54 + (Math.abs(sigma) / 140) * 184
  const reveal = playing ? smooth(sceneProgress) : 1
  const activeT = playing ? 58.3 * smooth(clamp01(sceneProgress * 1.2)) : 58.3
  const activeSigma = activeT <= 25 ? 0 : -(activeT - 25) * 2.4

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 300"
          role="img"
          aria-label="Wykres naprężenia termicznego w funkcji przyrostu temperatury. Do 25 K naprężenie jest zerowe, potem rośnie liniowo; linia dopuszczalna 80 MPa przecina wykres przy 58,3 K."
        >
          <line x1={84} y1={44} x2={84} y2={244} stroke="#c9d0d9" strokeWidth={1} />
          <line x1={84} y1={244} x2={430} y2={244} stroke="#c9d0d9" strokeWidth={1} />
          <line x1={84} y1={54} x2={430} y2={54} stroke={MUTED} strokeWidth={1} strokeDasharray="4 4" />

          <line x1={84} y1={yOf(-80)} x2={430} y2={yOf(-80)} stroke={BAD} strokeWidth={1.3} strokeDasharray="6 4" />
          <text x={426} y={yOf(-80) - 6} textAnchor="end" fontSize={9} fill={BAD}>
            σ_dop = −80 MPa
          </text>

          <motion.path
            d={`M ${xOf(0)} ${yOf(0)} L ${xOf(25)} ${yOf(0)} L ${xOf(80)} ${yOf(-132)}`}
            fill="none"
            stroke={ACCENT}
            strokeWidth={2.6}
            initial={false}
            animate={{ pathLength: reveal }}
            transition={{ duration: 0.12, ease: 'linear' }}
          />

          <line x1={xOf(25)} y1={yOf(0)} x2={xOf(25)} y2={244} stroke={MUTED} strokeWidth={1} strokeDasharray="3 3" />
          <circle cx={xOf(25)} cy={yOf(0)} r={3.5} fill={ACCENT} />
          <text x={xOf(25)} y={258} textAnchor="middle" fontSize={8.5} fill={MUTED}>
            25
          </text>
          <text x={xOf(25) + 6} y={yOf(0) + 16} fontSize={9} fill={ACCENT}>
            ΔT₁ = 25 K
          </text>

          <line
            x1={xOf(58.3)}
            y1={yOf(-80)}
            x2={xOf(58.3)}
            y2={244}
            stroke={BAD}
            strokeWidth={1}
            strokeDasharray="3 3"
          />
          <circle cx={xOf(58.3)} cy={yOf(-80)} r={4} fill={BAD} />
          <text x={xOf(58.3)} y={258} textAnchor="middle" fontSize={8.5} fill={BAD}>
            58,3
          </text>
          <text x={xOf(58.3) + 8} y={yOf(-80) + 4} fontSize={9} fontWeight={700} fill={BAD}>
            ΔT_max
          </text>

          <circle cx={xOf(70)} cy={yOf(-108)} r={4} fill={BAD} />
          <text x={xOf(70) + 8} y={yOf(-108) + 4} fontSize={9} fill={BAD}>
            ΔT = 70 K
          </text>
          <text x={xOf(70) + 8} y={yOf(-108) + 16} fontSize={8.5} fill={BAD}>
            σ = −108 MPa
          </text>

          <circle cx={xOf(activeT)} cy={yOf(activeSigma)} r={5} fill={activeT > 58.3 ? BAD : ACCENT} opacity={0.85} />

          <text x={84} y={38} textAnchor="middle" fontSize={9} fill={MUTED}>
            σ [MPa]
          </text>
          <text x={430} y={270} textAnchor="end" fontSize={9} fill={MUTED}>
            ΔT [K]
          </text>
          <text x={74} y={58} textAnchor="end" fontSize={8} fill={MUTED}>
            0
          </text>
          <text x={74} y={yOf(-80) + 3} textAnchor="end" fontSize={8} fill={BAD}>
            −80
          </text>
          <text x={74} y={yOf(-120) + 3} textAnchor="end" fontSize={8} fill={MUTED}>
            −120
          </text>
          <text x={430} y={258} textAnchor="end" fontSize={8.5} fill={MUTED}>
            80
          </text>
          <text x={16} y={286} fontSize={8.5} fill={MUTED}>
            do 25 K luz się domyka; potem naprężenie rośnie liniowo
          </text>
        </svg>
      </div>
    </div>
  )
}

export function ThermalGapDesignAnimation({ scene, index, playing, sceneProgress }: SolutionAnimationProps) {
  const mode = scene.focus?.metric ?? 'model'
  const isModel = mode === 'model'
  const isFree = mode === 'ΔL_T'
  const isGap = mode === 'gap'
  const isStress = mode === 'σ'
  const isDesign = mode === 'design'
  const isBuckling = mode === 'buckling'
  const compressed = isStress || isBuckling

  if (isDesign) return <DesignPlot sceneProgress={sceneProgress} playing={playing} />

  const grow = playing ? smooth(clamp01(sceneProgress / 0.65)) : 1
  const press = compressed ? (playing ? smooth(clamp01((sceneProgress - 0.12) / 0.55)) : 1) : 0
  const heat = isModel ? 0 : playing ? smooth(clamp01(sceneProgress * 1.5)) : 1
  const pulse = playing ? 0.68 + 0.32 * Math.sin((sceneProgress * 3 + index) * Math.PI * 2) : 1

  const ext = isModel ? 0 : isFree ? FREE * grow : isGap ? GAP * grow : GAP
  const barWidth = BASE + ext
  const barEnd = X0 + barWidth
  const gapNow = SUPPORT_X - barEnd
  const residual = Math.max(0, FREE_END - SUPPORT_X)
  const barColor = isBuckling ? BAD : compressed ? BAD : ACCENT
  const pipeOpacity = compressed ? 0.22 : 0.15
  const heatLabel = isFree || isStress ? 'ΔT = 70 K' : isGap ? 'ΔT = 25 K' : isBuckling ? 'ΔT = 70 K' : 'ΔT = ?'

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 300"
          role="img"
          aria-label="Stalowa rura z luzem 3 mm do podpory. Animacja pokazuje swobodne wydłużenie przy 70 K, zamknięcie luzu przy 25 K oraz naprężenie powstające po zablokowaniu dalszego wydłużenia."
        >
          <defs>
            <marker
              id="pipe-comp"
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

          <g stroke={SUPPORT} strokeWidth={2} strokeLinecap="round">
            <rect x={X0 - 16} y={PIPE_Y - 14} width={8} height={PIPE_H + 28} fill={SUPPORT} stroke="none" />
            {Array.from({ length: 5 }, (_, tick) => (
              <line
                key={`left-${tick}`}
                x1={X0 - 16}
                y1={PIPE_Y - 10 + tick * 11}
                x2={X0 - 25}
                y2={PIPE_Y - 5 + tick * 11}
                strokeWidth={1.3}
              />
            ))}
          </g>

          <motion.g
            stroke={SUPPORT}
            strokeWidth={2}
            strokeLinecap="round"
            initial={false}
            animate={{ opacity: isFree ? 0.3 : 1 }}
            transition={{ duration: 0.25 }}
          >
            <rect x={SUPPORT_X} y={PIPE_Y - 14} width={8} height={PIPE_H + 28} fill={SUPPORT} stroke="none" />
            {Array.from({ length: 5 }, (_, tick) => (
              <line
                key={`right-${tick}`}
                x1={SUPPORT_X + 8}
                y1={PIPE_Y - 10 + tick * 11}
                x2={SUPPORT_X + 17}
                y2={PIPE_Y - 5 + tick * 11}
                strokeWidth={1.3}
                strokeDasharray={isFree ? '3 3' : undefined}
              />
            ))}
          </motion.g>

          {isStress && (
            <rect
              x={X0}
              y={PIPE_Y}
              width={BASE + FREE}
              height={PIPE_H}
              rx={8}
              fill="none"
              stroke={MUTED}
              strokeWidth={1.2}
              strokeDasharray="5 4"
            />
          )}

          {isBuckling ? (
            <>
              <path
                d={`M ${X0} ${PIPE_Y + PIPE_H / 2} L ${SUPPORT_X} ${PIPE_Y + PIPE_H / 2}`}
                fill="none"
                stroke={MUTED}
                strokeWidth={1.2}
                strokeDasharray="4 4"
              />
              <motion.path
                d={`M ${X0} ${PIPE_Y + PIPE_H / 2} C ${X0 + BASE * 0.32} ${PIPE_Y + PIPE_H / 2 - 34 * press}, ${X0 + BASE * 0.68} ${PIPE_Y + PIPE_H / 2 - 34 * press}, ${SUPPORT_X} ${PIPE_Y + PIPE_H / 2}`}
                fill="none"
                stroke={BAD}
                strokeWidth={PIPE_H}
                strokeLinecap="round"
                initial={false}
                animate={{ opacity: 0.22 + 0.18 * press }}
                transition={{ duration: 0.2 }}
              />
              <motion.path
                d={`M ${X0} ${PIPE_Y + PIPE_H / 2} C ${X0 + BASE * 0.32} ${PIPE_Y + PIPE_H / 2 - 34 * press}, ${X0 + BASE * 0.68} ${PIPE_Y + PIPE_H / 2 - 34 * press}, ${SUPPORT_X} ${PIPE_Y + PIPE_H / 2}`}
                fill="none"
                stroke={BAD}
                strokeWidth={PIPE_H - 11}
                strokeLinecap="round"
                initial={false}
                animate={{ opacity: 0.35 + 0.25 * press }}
                transition={{ duration: 0.2 }}
              />
              <motion.g
                animate={playing ? { opacity: [0.65, 1, 0.65] } : { opacity: 1 }}
                transition={{ duration: 1.5, repeat: playing ? Infinity : 0 }}
              >
                <text x={X0 + BASE * 0.5} y={PIPE_Y - 34} textAnchor="middle" fontSize={11} fontWeight={700} fill={BAD}>
                  wyboczenie
                </text>
                <text x={X0 + BASE * 0.5} y={PIPE_Y - 20} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                  stateczność, nie tylko wytrzymałość
                </text>
              </motion.g>
            </>
          ) : (
            <>
              <rect
                x={X0}
                y={PIPE_Y}
                width={BASE}
                height={PIPE_H}
                rx={8}
                fill="none"
                stroke={MUTED}
                strokeWidth={1.2}
                strokeDasharray="4 4"
              />

              <motion.rect
                x={X0}
                y={PIPE_Y}
                width={barWidth}
                height={PIPE_H}
                rx={8}
                initial={false}
                animate={{ width: barWidth }}
                transition={{ duration: 0.12, ease: 'linear' }}
                fill={barColor}
                fillOpacity={pipeOpacity}
                stroke={barColor}
                strokeWidth={2}
              />

              <line
                x1={X0 + 8}
                y1={PIPE_Y + 9}
                x2={barEnd - 8}
                y2={PIPE_Y + 9}
                stroke={barColor}
                strokeWidth={1}
                opacity={0.45}
              />
              <line
                x1={X0 + 8}
                y1={PIPE_Y + PIPE_H - 9}
                x2={barEnd - 8}
                y2={PIPE_Y + PIPE_H - 9}
                stroke={barColor}
                strokeWidth={1}
                opacity={0.45}
              />
              <motion.ellipse
                cx={barEnd}
                cy={PIPE_Y + PIPE_H / 2}
                rx={4}
                ry={PIPE_H / 2 - 3}
                initial={false}
                animate={{ cx: barEnd }}
                transition={{ duration: 0.12, ease: 'linear' }}
                fill="none"
                stroke={barColor}
                strokeWidth={1.5}
              />

              {compressed && (
                <motion.rect
                  x={SUPPORT_X - 18}
                  y={PIPE_Y + 5}
                  width={18}
                  height={PIPE_H - 10}
                  rx={4}
                  fill={BAD}
                  initial={false}
                  animate={{ opacity: 0.14 + 0.24 * press }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </>
          )}

          <motion.g
            stroke={LOAD}
            strokeWidth={2}
            fill="none"
            initial={false}
            animate={{ opacity: heat }}
            transition={{ duration: 0.3 }}
          >
            {Array.from({ length: 6 }, (_, wave) => {
              const x = X0 + 24 + (wave * (Math.max(40, barWidth) - 48)) / 5
              return (
                <motion.path
                  key={wave}
                  d={`M ${x} ${PIPE_Y - 9} q 8 -14 0 -24`}
                  animate={playing ? { opacity: [0.35, 1, 0.35], y: [0, -3, 0] } : { opacity: 0.8 }}
                  transition={{ duration: 1.7, repeat: playing ? Infinity : 0, delay: wave * 0.15 }}
                />
              )
            })}
          </motion.g>

          <text x={16} y={28} fontSize={9} fill={INK}>
            L = 10 m
          </text>
          <text x={16} y={42} fontSize={8.5} fill={MUTED}>
            α = 12·10⁻⁶ 1/K
          </text>
          <text x={16} y={56} fontSize={8.5} fill={MUTED}>
            E = 200 GPa
          </text>
          <text x={16} y={70} fontSize={8.5} fill={MUTED}>
            s = 3 mm
          </text>
          <text x={16} y={84} fontSize={8.5} fill={MUTED}>
            σ_dop = 80 MPa
          </text>

          <text x={444} y={28} textAnchor="end" fontSize={10} fontWeight={700} fill={heat > 0.05 ? LOAD : MUTED}>
            {heatLabel}
          </text>

          {isFree && ext > 0.5 && (
            <HDim y={PIPE_Y + PIPE_H + 46} from={X0 + BASE} to={X0 + BASE + ext} label="ΔL_T = 8,4 mm" color={LOAD} />
          )}

          {isGap && ext > 0.5 && (
            <HDim
              y={PIPE_Y + PIPE_H + 46}
              from={X0 + BASE}
              to={barEnd}
              label={gapNow > 1 ? 'luz → 0' : 'ΔL = 3 mm'}
              color={ACCENT}
            />
          )}

          {isStress && residual > 1 && (
            <HDim y={PIPE_Y + PIPE_H + 64} from={SUPPORT_X} to={FREE_END} label="zablokowane 5,4 mm" color={BAD} />
          )}

          {gapNow > 1 && <HDim y={PIPE_Y + PIPE_H + 24} from={barEnd} to={SUPPORT_X} label="s = 3 mm" color={MUTED} />}

          {isGap && gapNow <= 1 && (
            <g stroke={SUPPORT} strokeWidth={2}>
              <line x1={SUPPORT_X - 12} y1={PIPE_Y + PIPE_H + 15} x2={SUPPORT_X + 12} y2={PIPE_Y + PIPE_H + 15} />
              <line x1={SUPPORT_X - 12} y1={PIPE_Y + PIPE_H + 21} x2={SUPPORT_X + 12} y2={PIPE_Y + PIPE_H + 21} />
              <text x={SUPPORT_X} y={PIPE_Y + PIPE_H + 37} textAnchor="middle" fontSize={9} fill={MUTED} stroke="none">
                kontakt
              </text>
            </g>
          )}

          {compressed && !isBuckling && (
            <motion.g
              stroke={BAD}
              fill={BAD}
              markerEnd="url(#pipe-comp)"
              initial={false}
              animate={{ opacity: press * (playing ? pulse : 1) }}
              transition={{ duration: 0.2 }}
            >
              <line x1={X0 + 10} y1={PIPE_Y + PIPE_H / 2} x2={X0 + 42} y2={PIPE_Y + PIPE_H / 2} strokeWidth={2.2} />
              <line
                x1={SUPPORT_X - 10}
                y1={PIPE_Y + PIPE_H / 2}
                x2={SUPPORT_X - 42}
                y2={PIPE_Y + PIPE_H / 2}
                strokeWidth={2.2}
              />
            </motion.g>
          )}

          {isGap && (
            <text x={X0 + 14} y={PIPE_Y + 24} fontSize={10} fill={ACCENT}>
              ΔT₁ = 25 K, σ = 0
            </text>
          )}

          {isFree && (
            <text x={X0 + 14} y={PIPE_Y + 24} fontSize={10} fontWeight={700} fill={ACCENT}>
              σ = 0
            </text>
          )}

          {isStress && (
            <>
              <motion.g
                animate={playing ? { opacity: [0.7, 1, 0.7] } : { opacity: 1 }}
                transition={{ duration: 1.4, repeat: playing ? Infinity : 0, ease: 'easeInOut' }}
              >
                <text x={X0 + 14} y={PIPE_Y + 24} fontSize={12} fontWeight={700} fill={BAD}>
                  σ = −108 MPa
                </text>
                <text x={X0 + 14} y={PIPE_Y + 37} fontSize={8} fill={BAD}>
                  przekracza σ_dop = 80 MPa
                </text>
              </motion.g>

              <g>
                <line x1={412} y1={84} x2={412} y2={212} stroke="#c9d0d9" strokeWidth={1} />
                {[0, -80, -120].map((value) => {
                  const y = 84 + (Math.abs(value) / 120) * 128
                  return (
                    <g key={value}>
                      <line x1={408} y1={y} x2={416} y2={y} stroke={MUTED} strokeWidth={1} />
                      <text x={420} y={y + 3} fontSize={8} fill={value === -80 ? BAD : MUTED}>
                        {value === 0 ? '0' : `${value}`}
                      </text>
                    </g>
                  )
                })}
                <text x={412} y={74} textAnchor="middle" fontSize={8} fill={MUTED}>
                  σ [MPa]
                </text>
                <motion.g initial={false} animate={{ opacity: press }} transition={{ duration: 0.2 }}>
                  <line
                    x1={402}
                    y1={84 + (80 / 120) * 128}
                    x2={422}
                    y2={84 + (80 / 120) * 128}
                    stroke={BAD}
                    strokeWidth={1.5}
                    strokeDasharray="3 3"
                  />
                  <line
                    x1={402}
                    y1={84 + (108 / 120) * 128}
                    x2={422}
                    y2={84 + (108 / 120) * 128}
                    stroke={BAD}
                    strokeWidth={2.4}
                  />
                  <text
                    x={398}
                    y={84 + (108 / 120) * 128 + 3}
                    textAnchor="end"
                    fontSize={8}
                    fontWeight={700}
                    fill={BAD}
                  >
                    −108
                  </text>
                </motion.g>
              </g>
            </>
          )}

          <text x={16} y={286} fontSize={8.5} fill={MUTED}>
            {isModel
              ? 'przed ogrzaniem: luz s = 3 mm, σ_dop = 80 MPa'
              : isFree
                ? 'myślowo bez podpory: pełne wydłużenie swobodne przy 70 K'
                : isGap
                  ? 'przy 25 K rura dotyka podpory, ale naprężenie jest jeszcze zerowe'
                  : isStress
                    ? 'po zamknięciu luzu to samo ΔT = 70 K daje już ściskanie'
                    : 'smukła rura może wyboczyć się przed osiągnięciem σ_dop'}
          </text>
        </svg>
      </div>
    </div>
  )
}
