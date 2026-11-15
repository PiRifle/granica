import { motion } from 'motion/react'
import type { ComponentType } from 'react'
import {
  ThreeSolutionScene,
  type ThreeLabel,
  type ThreePrimitive,
} from '../../../components/solution-figures/ThreeSolutionScene'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'
import {
  THREE_COLORS,
  ThreeBadge,
  ThreeStatus,
  axisLabels,
  axisSystem,
  pointLabel,
  v,
} from '../../../components/solution-figures/three-statics'
import { derivePrincipalStress, examplePrincipalStressInputs, pl, type PrincipalStressInputs } from './factory'

const BLUE = '#4f6df5'
const ORANGE = '#ff6b45'
const GREEN = '#2f7d5b'
const PURPLE = '#a970dd'
const RED = '#d94a3d'
const INK = '#17202a'
const MUTED = '#87929d'
const STROKE = '#7d8fa5'

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}
const ramp = (value: number, from: number, to: number) => clamp01((value - from) / (to - from))

const CRITICAL = v(0.17, 0.13, 0.28)

const primitives: ThreePrimitive[] = [
  {
    kind: 'rod',
    from: v(-0.95, 0, 0),
    to: v(-0.33, 0, 0),
    radius: 0.16,
    color: THREE_COLORS.member,
  },
  {
    kind: 'rod',
    from: v(0.33, 0, 0),
    to: v(0.95, 0, 0),
    radius: 0.16,
    color: THREE_COLORS.member,
  },
  {
    kind: 'disc',
    at: v(-0.95, 0, 0),
    radius: 0.29,
    thickness: 0.08,
    axis: [1, 0, 0],
    color: THREE_COLORS.pale,
  },
  {
    kind: 'disc',
    at: v(0.95, 0, 0),
    radius: 0.29,
    thickness: 0.08,
    axis: [1, 0, 0],
    color: THREE_COLORS.pale,
  },
  { kind: 'sphere', at: v(0, 0, 0), radius: 0.34, color: THREE_COLORS.material },
  {
    kind: 'rod',
    from: v(0, 0, 0.3),
    to: v(0, 0, 0.58),
    radius: 0.11,
    color: THREE_COLORS.member,
  },
  {
    kind: 'disc',
    at: v(0, 0, 0.58),
    radius: 0.18,
    thickness: 0.06,
    axis: [0, 0, 1],
    color: THREE_COLORS.pale,
  },
  {
    kind: 'ring',
    at: v(0, 0, 0.68),
    radius: 0.22,
    tube: 0.028,
    axis: [0, 0, 1],
    color: THREE_COLORS.moment,
  },
  { kind: 'sphere', at: CRITICAL, radius: 0.05, color: THREE_COLORS.load, pulse: true },
  ...axisSystem(v(0, 0, 0), [1.15, 0.85, 1.0]),
]

const labels: ThreeLabel[] = [
  ...axisLabels(v(0, 0, 0), [1.15, 0.85, 1.0]),
  {
    id: 'flange',
    text: 'kołnierz',
    at: v(-0.95, 0, 0),
    offset: [-10, 16],
    size: 9,
    anchor: 'end',
    color: THREE_COLORS.muted,
  },
  {
    id: 'body',
    text: 'korpus',
    at: v(0, 0, 0),
    offset: [-24, 28],
    size: 9,
    color: THREE_COLORS.muted,
  },
  {
    id: 'neck',
    text: 'szyjka',
    at: v(0, 0, 0.5),
    offset: [12, -4],
    size: 9,
    color: THREE_COLORS.muted,
  },
  {
    id: 'critical',
    text: 'punkt krytyczny',
    at: CRITICAL,
    offset: [12, -14],
    size: 9.5,
    weight: 700,
    color: THREE_COLORS.load,
  },
  pointLabel('o', 'O', v(0, 0, 0), [-12, 18]),
]

function Card({
  x,
  y,
  width,
  height,
  title,
  lines,
  color = BLUE,
}: {
  x: number
  y: number
  width: number
  height: number
  title: string
  lines: string[]
  color?: string
}) {
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} rx={8} fill="#f7f9fd" stroke="#d8e0ec" strokeWidth={1} />
      <text x={x + 12} y={y + 18} fontSize={9.5} fontWeight={700} fill={color}>
        {title}
      </text>
      {lines.map((line, lineIndex) => (
        <text key={line} x={x + 12} y={y + 38 + lineIndex * 17} fontSize={9} fill={INK}>
          {line}
        </text>
      ))}
    </g>
  )
}

export function createPrincipalStressAnimation(inputs: PrincipalStressInputs): ComponentType<SolutionAnimationProps> {
  const derived = derivePrincipalStress(inputs)
  const xOf = (sigma: number) => 90 + sigma * 1.15
  const MCY = 195
  const CX12 = xOf(derived.sr)
  const R12 = derived.radius * 1.15
  const CX13 = xOf(derived.tauMax)
  const R13 = derived.tauMax * 1.15
  const CX23 = xOf((derived.sigma2 + derived.sigma3) / 2)
  const R23 = ((derived.sigma2 - derived.sigma3) / 2) * 1.15
  const S1 = xOf(derived.sigma1)
  const S2 = xOf(derived.sigma2)
  const S3 = xOf(derived.sigma3)
  const ALLOW = xOf(inputs.kg)
  const EX = 110
  const EY = 160
  const f2 = (value: number) => pl(value, 2)
  const f0 = (value: number) => pl(value, 0)

  function StressElement() {
    return (
      <g>
        <rect x={EX - 40} y={EY - 40} width={80} height={80} fill="#f2f6fc" stroke={STROKE} strokeWidth={1.4} />
        <line x1={EX - 40} y1={EY} x2={EX - 58} y2={EY} stroke={ORANGE} strokeWidth={2.2} />
        <polygon points={`${EX - 58},${EY} ${EX - 52},${EY - 4} ${EX - 52},${EY + 4}`} fill={ORANGE} />
        <line x1={EX + 40} y1={EY} x2={EX + 58} y2={EY} stroke={ORANGE} strokeWidth={2.2} />
        <polygon points={`${EX + 58},${EY} ${EX + 52},${EY - 4} ${EX + 52},${EY + 4}`} fill={ORANGE} />
        <line x1={EX} y1={EY - 40} x2={EX} y2={EY - 58} stroke={GREEN} strokeWidth={2.2} />
        <polygon points={`${EX},${EY - 58} ${EX - 4},${EY - 52} ${EX + 4},${EY - 52}`} fill={GREEN} />
        <line x1={EX} y1={EY + 40} x2={EX} y2={EY + 58} stroke={GREEN} strokeWidth={2.2} />
        <polygon points={`${EX},${EY + 58} ${EX - 4},${EY + 52} ${EX + 4},${EY + 52}`} fill={GREEN} />
        <line x1={EX + 32} y1={EY + 16} x2={EX + 32} y2={EY - 16} stroke={PURPLE} strokeWidth={1.8} />
        <polygon points={`${EX + 32},${EY - 20} ${EX + 28.5},${EY - 14} ${EX + 35.5},${EY - 14}`} fill={PURPLE} />
        <line x1={EX - 16} y1={EY - 32} x2={EX + 16} y2={EY - 32} stroke={PURPLE} strokeWidth={1.8} />
        <polygon points={`${EX + 20},${EY - 32} ${EX + 14},${EY - 36} ${EX + 14},${EY - 28}`} fill={PURPLE} />
        <text x={EX + 62} y={EY - 10} fontSize={9} fontWeight={600} fill={ORANGE}>
          σx = {f0(inputs.sigmaX)}
        </text>
        <text x={EX} y={EY - 66} textAnchor="middle" fontSize={9} fontWeight={600} fill={GREEN}>
          σy = {f0(inputs.sigmaY)}
        </text>
        <text x={EX + 48} y={EY + 20} fontSize={9} fontWeight={600} fill={PURPLE}>
          τxy = {f0(inputs.tauXY)}
        </text>
      </g>
    )
  }

  return function ValvePrincipalStressAnimation({ scene, index, playing, sceneProgress }: SolutionAnimationProps) {
    const metric = scene.focus?.metric ?? 'model'
    const p = playing ? smooth(clamp01(sceneProgress)) : 1
    const reveal = playing ? smooth(ramp(sceneProgress, 0, 0.28)) : 1

    if (index === 0) {
      return (
        <ThreeSolutionScene
          index={index}
          playing={playing}
          sceneProgress={sceneProgress}
          label="Uproszczony model 3D korpusu zaworu DN50 z zaznaczonym punktem krytycznym"
          primitives={primitives}
          labels={labels}
          camera={{ position: [1.9, -2.3, 1.4], target: [0, 0, 0.05], viewSize: 2.5 }}
        >
          <ThreeBadge
            x={14}
            y={42}
            width={168}
            title="DN50"
            value={`k_g = ${f0(inputs.kg)} MPa`}
            note="punkt krytyczny"
          />
          <ThreeStatus>Korpus zaworu DN50 — punkt krytyczny na ściance</ThreeStatus>
        </ThreeSolutionScene>
      )
    }

    if (index <= 2) {
      return (
        <div className={local('figure')} data-metric={metric}>
          <div className={local('figure-canvas')}>
            <svg
              viewBox="0 0 460 340"
              role="img"
              aria-label="Element naprężeń w punkcie krytycznym korpusu zaworu oraz tensor i wzory transformacji"
            >
              <StressElement />
              {index === 1 && (
                <g opacity={reveal}>
                  <rect
                    x={250}
                    y={60}
                    width={190}
                    height={170}
                    rx={8}
                    fill="#f7f9fd"
                    stroke="#d8e0ec"
                    strokeWidth={1}
                  />
                  <line x1={284} y1={100} x2={284} y2={174} stroke={INK} strokeWidth={1.2} />
                  <line x1={284} y1={100} x2={290} y2={100} stroke={INK} strokeWidth={1.2} />
                  <line x1={284} y1={174} x2={290} y2={174} stroke={INK} strokeWidth={1.2} />
                  <line x1={408} y1={100} x2={408} y2={174} stroke={INK} strokeWidth={1.2} />
                  <line x1={402} y1={100} x2={408} y2={100} stroke={INK} strokeWidth={1.2} />
                  <line x1={402} y1={174} x2={408} y2={174} stroke={INK} strokeWidth={1.2} />
                  <text x={262} y={78} fontSize={9.5} fontWeight={700} fill={BLUE}>
                    Tensor [MPa]
                  </text>
                  <text x={300} y={116} textAnchor="middle" fontSize={10} fontWeight={600} fill={INK}>
                    {f0(inputs.sigmaX)}
                  </text>
                  <text x={345} y={116} textAnchor="middle" fontSize={10} fill={INK}>
                    {f0(inputs.tauXY)}
                  </text>
                  <text x={390} y={116} textAnchor="middle" fontSize={10} fill={INK}>
                    0
                  </text>
                  <text x={300} y={140} textAnchor="middle" fontSize={10} fill={INK}>
                    {f0(inputs.tauXY)}
                  </text>
                  <text x={345} y={140} textAnchor="middle" fontSize={10} fontWeight={600} fill={INK}>
                    {f0(inputs.sigmaY)}
                  </text>
                  <text x={390} y={140} textAnchor="middle" fontSize={10} fill={INK}>
                    0
                  </text>
                  <text x={300} y={164} textAnchor="middle" fontSize={10} fill={INK}>
                    0
                  </text>
                  <text x={345} y={164} textAnchor="middle" fontSize={10} fill={INK}>
                    0
                  </text>
                  <text x={390} y={164} textAnchor="middle" fontSize={10} fill={INK}>
                    0
                  </text>
                  <text x={262} y={198} fontSize={8.5} fill={MUTED}>
                    σz = 0, τyz = τzx = 0
                  </text>
                </g>
              )}
              {index === 2 && (
                <g opacity={reveal}>
                  <Card
                    x={250}
                    y={60}
                    width={190}
                    height={150}
                    title="Transformacja płaska"
                    lines={['σ_śr = (σx + σy) / 2', 'R = √(((σx−σy)/2)² + τxy²)', 'σ1,2 = σ_śr ± R']}
                  />
                </g>
              )}
            </svg>
          </div>
        </div>
      )
    }

    const showPrincipal = index >= 4
    const showThreeCircles = index >= 5
    const showAllowed = index >= 6

    return (
      <div className={local('figure')} data-metric={metric}>
        <div className={local('figure-canvas')}>
          <svg
            viewBox="0 0 460 340"
            role="img"
            aria-label="Koło Mohra dla płaskiego stanu naprężenia w korpusie zaworu z naprężeniami głównymi"
          >
            <line x1={80} y1={MCY} x2={365} y2={MCY} stroke={MUTED} strokeWidth={1.2} />
            <line x1={90} y1={65} x2={90} y2={330} stroke={MUTED} strokeWidth={1.1} />
            <line x1={S3} y1={191} x2={S3} y2={199} stroke={MUTED} strokeWidth={1.2} />
            <line x1={xOf(100)} y1={191} x2={xOf(100)} y2={199} stroke={MUTED} strokeWidth={1.2} />
            <line x1={xOf(200)} y1={191} x2={xOf(200)} y2={199} stroke={MUTED} strokeWidth={1.2} />

            <motion.circle
              cx={CX12}
              cy={MCY}
              r={R12}
              fill="none"
              stroke={PURPLE}
              strokeWidth={2.2}
              initial={false}
              animate={{ pathLength: p }}
              transition={{ duration: 0.2, ease: 'linear' }}
            />
            <line x1={CX12} y1={MCY} x2={CX12} y2={MCY - R12} stroke={PURPLE} strokeWidth={1.2} strokeDasharray="5 3" />
            <circle cx={CX12} cy={MCY} r={4} fill={PURPLE} />
            <circle cx={S1} cy={MCY} r={3.5} fill={PURPLE} />
            <circle cx={S2} cy={MCY} r={3.5} fill={PURPLE} />

            {showThreeCircles && (
              <g opacity={reveal}>
                <circle
                  cx={CX13}
                  cy={MCY}
                  r={R13}
                  fill="none"
                  stroke={ORANGE}
                  strokeWidth={1.8}
                  strokeDasharray="6 4"
                />
                <circle cx={CX23} cy={MCY} r={R23} fill="none" stroke={GREEN} strokeWidth={1.6} strokeDasharray="5 4" />
                <circle cx={CX13} cy={MCY - R13} r={3.5} fill={ORANGE} />
                <circle cx={S3} cy={MCY} r={3.5} fill={MUTED} />
              </g>
            )}

            {showAllowed && (
              <line
                x1={ALLOW}
                y1={140}
                x2={ALLOW}
                y2={320}
                stroke={RED}
                strokeWidth={1.6}
                strokeDasharray="6 4"
                opacity={reveal}
              />
            )}

            {index === 6 && (
              <rect
                x={330}
                y={40}
                width={118}
                height={92}
                rx={8}
                fill="#fdf4f2"
                stroke={RED}
                strokeWidth={1.2}
                opacity={reveal}
              />
            )}

            <text x={96} y={78} fontSize={10} fontWeight={700} fill={MUTED}>
              τ
            </text>
            <text x={350} y={214} fontSize={9.5} fontWeight={600} fill={MUTED}>
              σ [MPa]
            </text>
            <text x={86} y={210} textAnchor="end" fontSize={8.5} fill={MUTED}>
              0
            </text>
            <text x={xOf(100)} y={210} textAnchor="middle" fontSize={8.5} fill={MUTED}>
              100
            </text>
            <text x={xOf(200) - 6} y={210} textAnchor="end" fontSize={8.5} fill={MUTED}>
              200
            </text>
            <text x={CX12} y={210} textAnchor="middle" fontSize={9} fontWeight={700} fill={PURPLE}>
              {f0(derived.sr)}
            </text>
            <text x={CX12 + 8} y={150} fontSize={9} fontWeight={600} fill={PURPLE}>
              R = {f2(derived.radius)}
            </text>

            {showPrincipal && (
              <g opacity={reveal}>
                <text x={S1 + 6} y={190} fontSize={9.5} fontWeight={700} fill={PURPLE}>
                  σ₁ = {f2(derived.sigma1)}
                </text>
                <text x={S2 - 6} y={185} textAnchor="end" fontSize={9.5} fontWeight={700} fill={PURPLE}>
                  σ₂ = {f2(derived.sigma2)}
                </text>
              </g>
            )}

            {showThreeCircles && (
              <g opacity={reveal}>
                <text x={S3 - 8} y={180} textAnchor="end" fontSize={9.5} fontWeight={700} fill={MUTED}>
                  σ₃ = {f0(derived.sigma3)}
                </text>
                <text x={CX13 + 8} y={66} fontSize={9.5} fontWeight={700} fill={ORANGE}>
                  τmax = {f2(derived.tauMax)}
                </text>
              </g>
            )}

            {showAllowed && (
              <text x={326} y={250} fontSize={9} fontWeight={600} fill={RED} opacity={reveal}>
                k_g = {f0(inputs.kg)} MPa
              </text>
            )}

            {index === 6 && (
              <g opacity={reveal}>
                <text x={342} y={58} fontSize={10} fontWeight={700} fill={RED}>
                  σ₁ &gt; k_g
                </text>
                <text x={342} y={78} fontSize={9} fill={INK}>
                  {f2(derived.sigma1)} &gt; {f0(inputs.kg)}
                </text>
                <text x={342} y={96} fontSize={9} fill={INK}>
                  warunek nie jest
                </text>
                <text x={342} y={114} fontSize={9} fontWeight={700} fill={RED}>
                  spełniony
                </text>
              </g>
            )}

            {index === 7 && (
              <text x={230} y={330} textAnchor="middle" fontSize={9} fontWeight={600} fill={GREEN} opacity={reveal}>
                σ₁ + σ₂ + σ₃ = {f0(derived.sum)} MPa = σx + σy
              </text>
            )}
          </svg>
        </div>
      </div>
    )
  }
}

export const PrincipalStressExampleAnimation = createPrincipalStressAnimation(examplePrincipalStressInputs)
