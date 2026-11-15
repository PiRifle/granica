import type { ComponentType } from 'react'
import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import type { RestrainedThermalInputs } from './factory'
import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const LOAD = '#ff6b45'
const STRESS = '#a970dd'
const OK = '#2f7d5b'
const MUTED = '#87929d'
const INK = '#17202a'
const GRID = '#d7dde5'
const EDGE = '#7d8fa5'

const clamp01 = (value: number) => Math.max(0, Math.min(1, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}

const BAR_X = 210
const BAR_W = 40
const TOP = 64
const BOTTOM = 286
const GHOST_EXTRA = 18

function Arrow({
  x1,
  y1,
  x2,
  y2,
  color,
  width = 2.2,
}: {
  x1: number
  y1: number
  x2: number
  y2: number
  color: string
  width?: number
}) {
  const angle = Math.atan2(y2 - y1, x2 - x1)
  const head = 8
  const wing = 4
  const baseX = x2 - head * Math.cos(angle)
  const baseY = y2 - head * Math.sin(angle)
  const leftX = baseX - wing * Math.sin(angle)
  const leftY = baseY + wing * Math.cos(angle)
  const rightX = baseX + wing * Math.sin(angle)
  const rightY = baseY - wing * Math.cos(angle)
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={width} strokeLinecap="round" />
      <polygon points={`${x2},${y2} ${leftX},${leftY} ${rightX},${rightY}`} fill={color} />
    </g>
  )
}

function Walls() {
  const topHatch = Array.from({ length: 10 }, (_, index) => 128 + index * 20)
  const bottomHatch = Array.from({ length: 10 }, (_, index) => 128 + index * 20)
  return (
    <g>
      <rect x={120} y={56} width={220} height={8} fill="#c9d3df" stroke={EDGE} strokeWidth={1.2} />
      <rect x={120} y={286} width={220} height={8} fill="#c9d3df" stroke={EDGE} strokeWidth={1.2} />
      {topHatch.map((x) => (
        <line key={`top-${x}`} x1={x} y1={56} x2={x - 9} y2={46} stroke={EDGE} strokeWidth={1.1} />
      ))}
      {bottomHatch.map((x) => (
        <line key={`bottom-${x}`} x1={x} y1={294} x2={x - 9} y2={304} stroke={EDGE} strokeWidth={1.1} />
      ))}
      <line x1={170} y1={TOP} x2={170} y2={BOTTOM} stroke={MUTED} strokeWidth={1} />
      <line x1={165} y1={TOP} x2={175} y2={TOP} stroke={MUTED} strokeWidth={1} />
      <line x1={165} y1={BOTTOM} x2={175} y2={BOTTOM} stroke={MUTED} strokeWidth={1} />
    </g>
  )
}

function RestrainedThermalAnimationScene({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const p = playing ? smooth(clamp01(sceneProgress)) : 1

  const showGhost = metric === 'free' || metric === 'compatibility' || metric === 'hooke' || metric === 'solve'
  const ghostExtra = showGhost ? GHOST_EXTRA * p : 0
  const ghostBottom = BOTTOM + ghostExtra
  const showStress = metric === 'stress'

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 340"
          role="img"
          aria-label="Pręt stalowy między dwiema sztywnymi ścianami, swobodne wydłużenie termiczne i naprężenie ściskające"
        >
          <Walls />
          <rect
            x={BAR_X}
            y={TOP}
            width={BAR_W}
            height={BOTTOM - TOP}
            fill={ACCENT}
            fillOpacity={0.14}
            stroke={ACCENT}
            strokeWidth={1.6}
          />

          {showGhost && (
            <motion.rect
              x={BAR_X}
              y={TOP}
              width={BAR_W}
              height={BOTTOM - TOP + ghostExtra}
              fill="none"
              stroke={LOAD}
              strokeWidth={1.6}
              strokeDasharray="6 4"
              initial={false}
              animate={{ height: BOTTOM - TOP + ghostExtra }}
              transition={{ duration: 0.15, ease: 'linear' }}
            />
          )}

          {metric === 'free' && (
            <g>
              <line x1={275} y1={BOTTOM} x2={275} y2={ghostBottom} stroke={LOAD} strokeWidth={1.1} />
              <line x1={270} y1={BOTTOM} x2={280} y2={BOTTOM} stroke={LOAD} strokeWidth={1.1} />
              <line x1={270} y1={ghostBottom} x2={280} y2={ghostBottom} stroke={LOAD} strokeWidth={1.1} />
            </g>
          )}

          {showStress && (
            <g>
              <rect
                x={300}
                y={80}
                width={32}
                height={190}
                rx={3}
                fill={STRESS}
                fillOpacity={0.16}
                stroke={STRESS}
                strokeWidth={1.4}
              />
              <Arrow x1={316} y1={68} x2={316} y2={78} color={STRESS} width={1.8} />
              <Arrow x1={316} y1={282} x2={316} y2={272} color={STRESS} width={1.8} />
            </g>
          )}

          {metric === 'check' && (
            <g>
              <Arrow x1={BAR_X + BAR_W / 2} y1={46} x2={BAR_X + BAR_W / 2} y2={60} color={LOAD} width={2} />
              <Arrow x1={BAR_X + BAR_W / 2} y1={304} x2={BAR_X + BAR_W / 2} y2={290} color={LOAD} width={2} />
            </g>
          )}

          <text x={230} y={22} textAnchor="middle" fontSize={10} fontWeight={700} fill={INK}>
            Pręt między sztywnymi przegrodami
          </text>
          <text x={340} y={48} fontSize={8.5} fill={MUTED}>
            ściana sztywna
          </text>
          <text x={340} y={274} fontSize={8.5} fill={MUTED}>
            ściana sztywna
          </text>
          <text x={164} y={179} textAnchor="end" fontSize={9} fontWeight={700} fill={INK}>
            L₀ = 600 mm
          </text>

          {metric === 'free' && (
            <text x={282} y={322} fontSize={8.5} fontWeight={700} fill={LOAD}>
              ΔL_T = 0,702 mm
            </text>
          )}

          {metric === 'compatibility' && (
            <g>
              <text x={230} y={318} textAnchor="middle" fontSize={10} fontWeight={700} fill={INK}>
                ΔL_T + ΔL_σ = 0
              </text>
              <text x={230} y={335} textAnchor="middle" fontSize={9} fill={MUTED}>
                ΔL_σ = −0,702 mm
              </text>
            </g>
          )}

          {metric === 'hooke' && (
            <g>
              <text x={230} y={318} textAnchor="middle" fontSize={10} fontWeight={700} fill={INK}>
                ΔL_σ = σ L₀ / E
              </text>
              <text x={230} y={335} textAnchor="middle" fontSize={9} fill={MUTED}>
                naprężenie ściskające skraca pręt
              </text>
            </g>
          )}

          {metric === 'solve' && (
            <g>
              <text x={230} y={318} textAnchor="middle" fontSize={10} fontWeight={700} fill={INK}>
                σ = −E α ΔT
              </text>
              <text x={230} y={335} textAnchor="middle" fontSize={9} fill={MUTED}>
                wynik nie zależy od L₀
              </text>
            </g>
          )}

          {metric === 'stress' && (
            <g>
              <text x={344} y={160} fontSize={10} fontWeight={700} fill={STRESS}>
                σ = −234 MPa
              </text>
              <text x={344} y={180} fontSize={9} fill={STRESS}>
                ściskanie
              </text>
              <text x={230} y={318} textAnchor="middle" fontSize={9} fill={INK}>
                σ = −200000 · 1,17·10⁻⁵ · 100 = −234 MPa
              </text>
            </g>
          )}

          {metric === 'check' && (
            <g>
              <text x={230} y={318} textAnchor="middle" fontSize={9.5} fontWeight={700} fill={OK}>
                L = L₀ = 600 mm (bez zmiany)
              </text>
              <text x={230} y={335} textAnchor="middle" fontSize={9} fill={MUTED}>
                reakcja ścian: 234 N/mm², ściskanie
              </text>
            </g>
          )}
        </svg>
      </div>
    </div>
  )
}

export function createRestrainedThermalAnimation(
  config: RestrainedThermalInputs,
): ComponentType<SolutionAnimationProps> {
  return function RestrainedThermalAnimation(props: SolutionAnimationProps) {
    return <RestrainedThermalAnimationScene {...props} />
  }
}
