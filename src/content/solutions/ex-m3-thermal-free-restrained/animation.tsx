import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const LOAD = '#ff6b45'
const MUTED = '#87929d'
const SUPPORT = '#68727e'
const INK = '#17202a'
const COMP = '#a970dd'

const X0 = 92
const BASE = 232
const GAP = 24
const FREE = (3.36 / 2) * GAP
const SUPPORT_X = X0 + BASE + GAP
const BAR_Y = 112
const BAR_H = 36

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

export function ThermalRailAnimation({ scene, index, playing, sceneProgress }: SolutionAnimationProps) {
  const mode = scene.focus?.metric ?? 'model'
  const isModel = mode === 'model'
  const isFree = mode === 'ΔL_T'
  const isGap = mode === 'gap'
  const isStrain = mode === 'ε'
  const isStress = mode === 'σ'
  const isCheck = mode === 'check'
  const compressed = isStrain || isStress || isCheck

  const grow = playing ? smooth(clamp01(sceneProgress / 0.65)) : 1
  const press = playing ? smooth(clamp01((sceneProgress - 0.12) / 0.55)) : 1
  const gaugeProgress = playing ? smooth(clamp01((sceneProgress - 0.25) / 0.5)) : 1
  const pulse = playing ? 0.68 + 0.32 * Math.sin((sceneProgress * 3 + index) * Math.PI * 2) : 1
  const heat = isModel ? 0 : playing ? smooth(clamp01(sceneProgress * 1.5)) : 1

  const ext = isModel ? 0 : isFree ? FREE * grow : isGap ? GAP * grow : GAP
  const barWidth = BASE + ext
  const barEnd = X0 + barWidth
  const gapNow = SUPPORT_X - barEnd
  const freeEnd = X0 + BASE + FREE
  const residual = Math.max(0, freeEnd - SUPPORT_X)

  const barColor = compressed ? COMP : ACCENT
  const compressionOpacity = isStress || isCheck ? press : isStrain ? press * 0.75 : 0

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 300"
          role="img"
          aria-label="Stalowa szyna z luzem 2 mm do podpory. Animacja pokazuje najpierw swobodne wydłużenie termiczne, potem zamknięcie luzu i ściskanie wywołane tym samym przyrostem temperatury."
        >
          <defs>
            <marker
              id="rail-comp"
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
            <rect x={X0 - 16} y={BAR_Y - 12} width={8} height={BAR_H + 24} fill={SUPPORT} stroke="none" />
            {Array.from({ length: 5 }, (_, tick) => (
              <line
                key={`left-${tick}`}
                x1={X0 - 16}
                y1={BAR_Y - 8 + tick * 10}
                x2={X0 - 25}
                y2={BAR_Y - 3 + tick * 10}
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
            <rect x={SUPPORT_X} y={BAR_Y - 12} width={8} height={BAR_H + 24} fill={SUPPORT} stroke="none" />
            {Array.from({ length: 5 }, (_, tick) => (
              <line
                key={`right-${tick}`}
                x1={SUPPORT_X + 8}
                y1={BAR_Y - 8 + tick * 10}
                x2={SUPPORT_X + 17}
                y2={BAR_Y - 3 + tick * 10}
                strokeWidth={1.3}
                strokeDasharray={isFree ? '3 3' : undefined}
              />
            ))}
          </motion.g>

          {compressed && (
            <rect
              x={X0}
              y={BAR_Y}
              width={BASE + FREE}
              height={BAR_H}
              rx={4}
              fill="none"
              stroke={MUTED}
              strokeWidth={1.2}
              strokeDasharray="5 4"
            />
          )}

          <rect
            x={X0}
            y={BAR_Y}
            width={BASE}
            height={BAR_H}
            rx={4}
            fill="none"
            stroke={MUTED}
            strokeWidth={1.2}
            strokeDasharray="4 4"
          />

          <motion.rect
            x={X0}
            y={BAR_Y}
            width={barWidth}
            height={BAR_H}
            rx={4}
            initial={false}
            animate={{ width: barWidth }}
            transition={{ duration: 0.12, ease: 'linear' }}
            fill={barColor}
            fillOpacity={compressed ? 0.2 : 0.16}
            stroke={barColor}
            strokeWidth={2}
          />

          {compressed && (
            <motion.rect
              x={SUPPORT_X - 18}
              y={BAR_Y + 4}
              width={18}
              height={BAR_H - 8}
              rx={3}
              fill={COMP}
              initial={false}
              animate={{ opacity: 0.12 + 0.22 * compressionOpacity }}
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
            {Array.from({ length: 6 }, (_, wave) => {
              const x = X0 + 22 + (wave * (barWidth - 44)) / 5
              return (
                <motion.path
                  key={wave}
                  d={`M ${x} ${BAR_Y - 8} q 8 -14 0 -24`}
                  animate={playing ? { opacity: [0.35, 1, 0.35], y: [0, -3, 0] } : { opacity: 0.8 }}
                  transition={{ duration: 1.7, repeat: playing ? Infinity : 0, delay: wave * 0.16 }}
                />
              )
            })}
          </motion.g>

          <text x={16} y={26} fontSize={9} fill={INK}>
            L = 8 m
          </text>
          <text x={16} y={40} fontSize={9} fill={MUTED}>
            A = 600 mm²
          </text>
          <text x={16} y={54} fontSize={9} fill={MUTED}>
            E = 200 GPa
          </text>
          <text x={16} y={68} fontSize={9} fill={MUTED}>
            α = 12·10⁻⁶ 1/K
          </text>

          <text x={444} y={26} textAnchor="end" fontSize={10} fontWeight={700} fill={heat > 0.05 ? LOAD : MUTED}>
            {isModel ? 'ΔT = 0' : 'ΔT = 35 K'}
          </text>
          <text x={444} y={42} textAnchor="end" fontSize={9} fill={MUTED}>
            s = 2 mm
          </text>

          {isFree && ext > 0.5 && (
            <HDim y={BAR_Y + BAR_H + 52} from={X0 + BASE} to={X0 + BASE + ext} label="ΔL_T = 3,36 mm" color={LOAD} />
          )}

          {!isFree && !isModel && ext > 0.5 && (
            <HDim y={BAR_Y + BAR_H + 52} from={X0 + BASE} to={barEnd} label="ΔL = 2 mm" color={ACCENT} />
          )}

          {compressed && residual > 1 && (
            <HDim y={BAR_Y + BAR_H + 70} from={SUPPORT_X} to={freeEnd} label="zablokowane 1,36 mm" color={COMP} />
          )}

          {gapNow > 1 && <HDim y={BAR_Y + BAR_H + 22} from={barEnd} to={SUPPORT_X} label="s = 2 mm" color={MUTED} />}

          {!isFree && gapNow <= 1 && (
            <g stroke={SUPPORT} strokeWidth={2}>
              <line x1={SUPPORT_X - 12} y1={BAR_Y + BAR_H + 14} x2={SUPPORT_X + 12} y2={BAR_Y + BAR_H + 14} />
              <line x1={SUPPORT_X - 12} y1={BAR_Y + BAR_H + 20} x2={SUPPORT_X + 12} y2={BAR_Y + BAR_H + 20} />
              <text x={SUPPORT_X} y={BAR_Y + BAR_H + 36} textAnchor="middle" fontSize={9} fill={MUTED} stroke="none">
                kontakt
              </text>
            </g>
          )}

          {compressed && (
            <motion.g
              stroke={COMP}
              fill={COMP}
              markerEnd="url(#rail-comp)"
              initial={false}
              animate={{ opacity: isStress || isCheck ? press * (playing ? pulse : 1) : 0.55 }}
              transition={{ duration: 0.25 }}
            >
              <line x1={X0 + 10} y1={BAR_Y + BAR_H / 2} x2={X0 + 40} y2={BAR_Y + BAR_H / 2} strokeWidth={2.2} />
              <line
                x1={SUPPORT_X - 10}
                y1={BAR_Y + BAR_H / 2}
                x2={SUPPORT_X - 40}
                y2={BAR_Y + BAR_H / 2}
                strokeWidth={2.2}
              />
            </motion.g>
          )}

          {isStrain && (
            <>
              <text x={X0 + 14} y={BAR_Y + BAR_H + 18} fontSize={9} fill={COMP}>
                ε_m = −0,00017
              </text>
              <text x={X0 + 14} y={BAR_Y + BAR_H + 31} fontSize={8} fill={MUTED}>
                skrócenie mechaniczne
              </text>
            </>
          )}

          {isStress && (
            <motion.g
              animate={playing ? { opacity: [0.7, 1, 0.7] } : { opacity: 1 }}
              transition={{ duration: 1.4, repeat: playing ? Infinity : 0, ease: 'easeInOut' }}
            >
              <text x={X0 + 14} y={BAR_Y + BAR_H + 18} fontSize={12} fontWeight={700} fill={COMP}>
                σ = −34 MPa
              </text>
              <text x={X0 + 14} y={BAR_Y + BAR_H + 31} fontSize={8} fill={MUTED}>
                ściskanie
              </text>
            </motion.g>
          )}

          {isFree && (
            <text x={X0 + 14} y={BAR_Y + BAR_H + 19} fontSize={11} fontWeight={700} fill={ACCENT}>
              σ = 0
            </text>
          )}

          {isGap && (
            <text x={X0 + 14} y={BAR_Y + BAR_H + 19} fontSize={10} fill={INK}>
              luz zamknięty, σ ≈ 0
            </text>
          )}

          {isCheck && (
            <>
              <text x={X0 + 14} y={BAR_Y + BAR_H + 18} fontSize={9} fill={COMP}>
                R = 20,4 kN
              </text>
              <text x={X0 + 14} y={BAR_Y + BAR_H + 31} fontSize={8} fill={MUTED}>
                bez luzu: σ = −84 MPa
              </text>
              <g>
                <line x1={402} y1={84} x2={402} y2={210} stroke="#c9d0d9" strokeWidth={1} />
                {[0, -50, -100].map((value) => {
                  const y = 84 + (Math.abs(value) / 100) * 126
                  return (
                    <g key={value}>
                      <line x1={398} y1={y} x2={406} y2={y} stroke={MUTED} strokeWidth={1} />
                      <text x={410} y={y + 3} fontSize={8} fill={MUTED}>
                        {value === 0 ? '0' : `${value}`}
                      </text>
                    </g>
                  )
                })}
                <text x={402} y={72} textAnchor="middle" fontSize={8} fill={MUTED}>
                  σ [MPa]
                </text>
                <motion.g initial={false} animate={{ opacity: gaugeProgress }} transition={{ duration: 0.2 }}>
                  {[
                    { value: -34, label: '−34', color: COMP },
                    { value: -84, label: '−84', color: MUTED },
                  ].map((mark) => {
                    const y = 84 + (Math.abs(mark.value) / 100) * 126
                    return (
                      <g key={mark.value}>
                        <line
                          x1={396}
                          y1={y}
                          x2={408}
                          y2={y}
                          stroke={mark.color}
                          strokeWidth={mark.value === -34 ? 2.4 : 1.2}
                          strokeDasharray={mark.value === -34 ? undefined : '3 3'}
                        />
                        <text
                          x={392}
                          y={y + 3}
                          textAnchor="end"
                          fontSize={8}
                          fontWeight={mark.value === -34 ? 700 : 400}
                          fill={mark.color}
                        >
                          {mark.label}
                        </text>
                      </g>
                    )
                  })}
                </motion.g>
              </g>
            </>
          )}

          <motion.g
            animate={playing ? { opacity: [0.5, 1, 0.5] } : { opacity: 0.8 }}
            transition={{ duration: 1.8, repeat: playing ? Infinity : 0 }}
          >
            <text x={16} y={286} fontSize={8.5} fill={MUTED}>
              {isModel
                ? 'przed ogrzaniem: luz s = 2 mm'
                : isFree
                  ? 'myślowo bez podpory: wydłużenie swobodne'
                  : 'ten sam ΔT = 35 K, ale podpora ogranicza wydłużenie'}
            </text>
          </motion.g>
        </svg>
      </div>
    </div>
  )
}
