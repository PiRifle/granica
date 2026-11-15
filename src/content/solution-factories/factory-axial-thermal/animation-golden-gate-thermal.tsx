import type { ComponentType, ReactNode } from 'react'
import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import type { GoldenGateThermalInputs } from './factory'
import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const LOAD = '#ff6b45'
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

const HANGERS = [
  { x: 150, y: 100.7 },
  { x: 190, y: 115.5 },
  { x: 230, y: 120.5 },
  { x: 270, y: 115.5 },
  { x: 310, y: 100.7 },
]

function Arrow({
  x1,
  y1,
  x2,
  y2,
  color,
  width = 2,
}: {
  x1: number
  y1: number
  x2: number
  y2: number
  color: string
  width?: number
}) {
  const angle = Math.atan2(y2 - y1, x2 - x1)
  const head = 7
  const wing = 3.5
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

function Bridge() {
  return (
    <g>
      <rect x={60} y={190} width={340} height={12} rx={2} fill="#dfe6f2" stroke={EDGE} strokeWidth={1.3} />
      <rect x={107} y={76} width={6} height={114} fill="#c9d3df" stroke={EDGE} strokeWidth={1.1} />
      <rect x={347} y={76} width={6} height={114} fill="#c9d3df" stroke={EDGE} strokeWidth={1.1} />
      <path d="M 60 150 L 110 76 Q 230 165 350 76 L 400 150" fill="none" stroke={EDGE} strokeWidth={1.5} />
      <line x1={60} y1={150} x2={60} y2={190} stroke={EDGE} strokeWidth={1.1} />
      <line x1={400} y1={150} x2={400} y2={190} stroke={EDGE} strokeWidth={1.1} />
      {HANGERS.map((hanger) => (
        <line key={hanger.x} x1={hanger.x} y1={hanger.y} x2={hanger.x} y2={190} stroke={EDGE} strokeWidth={0.9} />
      ))}
      <line x1={60} y1={240} x2={400} y2={240} stroke={MUTED} strokeWidth={1} />
      <line x1={60} y1={235} x2={60} y2={245} stroke={MUTED} strokeWidth={1} />
      <line x1={400} y1={235} x2={400} y2={245} stroke={MUTED} strokeWidth={1} />
    </g>
  )
}

function Card({ children }: { children: ReactNode }) {
  return (
    <g>
      <rect x={50} y={272} width={360} height={56} rx={6} fill="#f5f7fc" stroke={GRID} strokeWidth={1} />
      {children}
    </g>
  )
}

function GoldenGateThermalAnimationScene({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const p = playing ? smooth(clamp01(sceneProgress)) : 1

  const showExpandCard = metric === 'numeric' || metric === 'check'
  const expansion = 18 * p
  const expandEnd = 390 + expansion
  const cardColor = metric === 'check' ? OK : LOAD

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 340"
          role="img"
          aria-label="Most wiszący o przęśle 1280 metrów, wydłużenie termiczne stali oraz szczelina dylatacyjna"
        >
          <Bridge />

          <text x={230} y={22} textAnchor="middle" fontSize={10} fontWeight={700} fill={INK}>
            Golden Gate — wydłużenie termiczne przęsła
          </text>
          <text x={230} y={216} textAnchor="middle" fontSize={8.5} fill={MUTED}>
            przęsło główne
          </text>
          <text x={230} y={258} textAnchor="middle" fontSize={9} fontWeight={700} fill={INK}>
            L = 1280 m
          </text>

          {metric === 'model' && (
            <g>
              <text x={230} y={298} textAnchor="middle" fontSize={9.5} fill={INK}>
                stalowa konstrukcja nagrzewa się od 0 °C do 40 °C
              </text>
              <text x={230} y={318} textAnchor="middle" fontSize={9} fill={MUTED}>
                wydłużenie jest swobodne, więc nie powstają naprężenia
              </text>
            </g>
          )}

          {metric === 'data' && (
            <g>
              <text x={230} y={296} textAnchor="middle" fontSize={10} fontWeight={700} fill={INK}>
                α = 1,17·10⁻⁵ 1/K, ΔT = 40 K
              </text>
              <text x={230} y={318} textAnchor="middle" fontSize={9} fill={MUTED}>
                L = 1280 m, 1 K = 1 °C
              </text>
            </g>
          )}

          {metric === 'strain' && (
            <Card>
              <rect
                x={90}
                y={303}
                width={280}
                height={7}
                rx={3}
                fill={ACCENT}
                fillOpacity={0.18}
                stroke={ACCENT}
                strokeWidth={1.2}
              />
              <Arrow x1={90} y1={306} x2={74} y2={306} color={ACCENT} />
              <Arrow x1={370} y1={306} x2={386} y2={306} color={ACCENT} />
              <text x={230} y={291} textAnchor="middle" fontSize={10} fontWeight={700} fill={ACCENT}>
                ε_T = αΔT = 4,68·10⁻⁴
              </text>
              <text x={230} y={322} textAnchor="middle" fontSize={9} fill={MUTED}>
                ΔT = 40 K
              </text>
            </Card>
          )}

          {metric === 'formula' && (
            <g>
              <text x={230} y={296} textAnchor="middle" fontSize={11} fontWeight={700} fill={INK}>
                ΔL = α · L · ΔT
              </text>
              <text x={230} y={318} textAnchor="middle" fontSize={9} fill={MUTED}>
                odkształcenie termiczne razy długość początkowa
              </text>
            </g>
          )}

          {showExpandCard && (
            <Card>
              <line x1={90} y1={303} x2={390} y2={303} stroke={MUTED} strokeWidth={1.2} strokeDasharray="5 4" />
              <motion.rect
                x={90}
                y={300}
                height={7}
                rx={3}
                fill={cardColor}
                fillOpacity={0.22}
                stroke={cardColor}
                strokeWidth={1.2}
                initial={false}
                animate={{ width: 300 + expansion }}
                transition={{ duration: 0.15, ease: 'linear' }}
              />
              <Arrow x1={90} y1={296} x2={74} y2={296} color={cardColor} />
              <Arrow x1={390} y1={296} x2={405} y2={296} color={cardColor} />
              <line x1={expandEnd} y1={295} x2={expandEnd} y2={311} stroke={cardColor} strokeWidth={1.4} />
              <text x={230} y={289} textAnchor="middle" fontSize={9.5} fontWeight={700} fill={cardColor}>
                {metric === 'check' ? 'σ = 0, N = 0' : 'ΔL = 0,59904 m ≈ 599 mm'}
              </text>
              <text x={230} y={322} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                {metric === 'check' ? 'swobodne wydłużenie bez więzów' : 'L = 1280 m, ΔT = 40 K'}
              </text>
            </Card>
          )}

          {metric === 'joint' && (
            <Card>
              <rect x={80} y={301} width={120} height={12} rx={2} fill="#dfe6f2" stroke={EDGE} strokeWidth={1.2} />
              <rect x={228} y={301} width={152} height={12} rx={2} fill="#dfe6f2" stroke={EDGE} strokeWidth={1.2} />
              <line x1={200} y1={291} x2={228} y2={291} stroke={LOAD} strokeWidth={1.2} />
              <line x1={200} y1={286} x2={200} y2={296} stroke={LOAD} strokeWidth={1.2} />
              <line x1={228} y1={286} x2={228} y2={296} stroke={LOAD} strokeWidth={1.2} />
              <Arrow x1={200} y1={307} x2={212} y2={307} color={LOAD} />
              <Arrow x1={228} y1={307} x2={216} y2={307} color={LOAD} />
              <text x={214} y={282} textAnchor="middle" fontSize={8.5} fontWeight={700} fill={LOAD}>
                ≈ 0,60 m
              </text>
              <text x={230} y={324} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                dylatacja pozwala przęsłu swobodnie się wydłużyć
              </text>
            </Card>
          )}
        </svg>
      </div>
    </div>
  )
}

export function createGoldenGateThermalAnimation(
  config: GoldenGateThermalInputs,
): ComponentType<SolutionAnimationProps> {
  return function GoldenGateThermalAnimation(props: SolutionAnimationProps) {
    return <GoldenGateThermalAnimationScene {...props} />
  }
}
