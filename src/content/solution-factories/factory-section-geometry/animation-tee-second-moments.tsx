import type { ComponentType } from 'react'
import type { SolutionAnimationProps } from '../../../types'
import type { TeeSecondMomentsInputs } from './factory'
import { local } from '../../../components/solution-figures/shared'

const BLUE = '#4f6df5'
const ORANGE = '#ff6b45'
const GREEN = '#2f7d5b'
const INK = '#17202a'
const MUTED = '#87929d'
const STROKE = '#7d8fa5'

const S = 7.2
const TOP = 50
const BOT = 266
const XC = 140
const FL = 107.6
const FR = 172.4
const WL = 136.4
const WR = 143.6
const CY = TOP + 10.1304 * S
const Y1 = TOP + 1 * S
const Y2 = TOP + 16 * S

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}
const ramp = (value: number, from: number, to: number) => clamp01((value - from) / (to - from))

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

function TeeSecondMomentsAnimationScene({ scene, index, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'axes'
  const p = playing ? smooth(clamp01(sceneProgress)) : 1
  const reveal = playing ? smooth(ramp(sceneProgress, 0, 0.28)) : 1

  return (
    <div className={local('figure')} data-metric={metric}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 340"
          role="img"
          aria-label="Przekrój teowy z osiami centralnymi y0 i z0 oraz objaśnieniem centralnych momentów bezwładności"
        >
          <rect x={FL} y={TOP} width={FR - FL} height={14.4} fill="#dce8f7" stroke={BLUE} strokeWidth={1.4} />
          <rect x={WL} y={64.4} width={WR - WL} height={201.6} fill="#ffe7de" stroke={ORANGE} strokeWidth={1.4} />

          <line x1={78} y1={CY} x2={210} y2={CY} stroke={BLUE} strokeWidth={1.6} strokeDasharray="7 4" />
          <line x1={XC} y1={38} x2={XC} y2={280} stroke={BLUE} strokeWidth={1.6} strokeDasharray="7 4" />
          <text x={214} y={CY + 4} fontSize={10} fontWeight={700} fill={BLUE}>
            y₀
          </text>
          <text x={146} y={284} fontSize={10} fontWeight={700} fill={BLUE}>
            z₀
          </text>

          {index === 0 && (
            <g opacity={reveal}>
              <line x1={92} y1={58} x2={106} y2={57} stroke={STROKE} strokeWidth={1} />
              <line x1={100} y1={152} x2={136} y2={160} stroke={STROKE} strokeWidth={1} />
              <circle cx={XC} cy={Y1} r={4} fill={GREEN} />
              <circle cx={XC} cy={Y2} r={4} fill={GREEN} />
              <circle cx={XC} cy={CY} r={5.5} fill={GREEN} stroke="#fff" strokeWidth={1.5} />
              <text x={148} y={Y1 + 4} fontSize={9.5} fontWeight={700} fill={GREEN}>
                C₁
              </text>
              <text x={148} y={Y2 + 4} fontSize={9.5} fontWeight={700} fill={GREEN}>
                C₂
              </text>
              <text x={148} y={CY - 6} fontSize={10} fontWeight={700} fill={GREEN}>
                C
              </text>
              <text x={40} y={58} fontSize={9} fill={INK}>
                pas 9×2
              </text>
              <text x={38} y={150} fontSize={9} fill={INK}>
                środnik 1×28
              </text>
              <Card
                x={250}
                y={48}
                width={190}
                height={104}
                title="Dane przekroju"
                lines={['pas: 9 × 2 cm', 'środnik: 1 × 28 cm', 'H = 30 cm, A = 46 cm²', 'z_C = 10,1304 cm od góry']}
                color={GREEN}
              />
            </g>
          )}

          {index === 1 && (
            <g opacity={reveal}>
              <rect x={FL} y={Y1 - 6} width={FR - FL} height={12} fill={ORANGE} opacity={0.2} />
              <rect x={WL} y={Y2 - 5} width={WR - WL} height={10} fill={ORANGE} opacity={0.28} />
              <line x1={98} y1={Y1} x2={98} y2={Y2} stroke={STROKE} strokeWidth={1} />
              <line x1={93} y1={Y1} x2={103} y2={Y1} stroke={STROKE} strokeWidth={1} />
              <line x1={93} y1={CY} x2={103} y2={CY} stroke={STROKE} strokeWidth={1} />
              <line x1={93} y1={Y2} x2={103} y2={Y2} stroke={STROKE} strokeWidth={1} />
              <circle cx={XC} cy={Y1} r={4} fill={GREEN} />
              <circle cx={XC} cy={Y2} r={4} fill={GREEN} />
              <circle cx={XC} cy={CY} r={5} fill={GREEN} stroke="#fff" strokeWidth={1.4} />
              <text x={92} y={92} textAnchor="end" fontSize={9} fontWeight={600} fill={BLUE}>
                d₁ = 9,13
              </text>
              <text x={92} y={148} textAnchor="end" fontSize={9} fontWeight={600} fill={ORANGE}>
                d₂ = 5,87
              </text>
              <Card
                x={246}
                y={48}
                width={196}
                height={110}
                title="Twierdzenie Steinera"
                lines={['I = I₀ + A d²', 'd — odległość od osi centralnej', 'składnik A d² zawsze dodatni']}
              />
            </g>
          )}

          {index === 2 && (
            <g opacity={reveal}>
              <circle cx={XC} cy={CY} r={5} fill={GREEN} stroke="#fff" strokeWidth={1.4} />
              <Card
                x={246}
                y={44}
                width={196}
                height={130}
                title="Momenty własne części"
                lines={[
                  'pas — y₀: 9·2³/12 = 6,00',
                  'pas — z₀: 2·9³/12 = 121,50',
                  'środnik — y₀: 1·28³/12 = 1829,33',
                  'środnik — z₀: 28·1³/12 = 2,33',
                ]}
              />
            </g>
          )}

          {index === 3 && (
            <g opacity={reveal}>
              <rect x={FL} y={Y1 - 6} width={FR - FL} height={12} fill={ORANGE} opacity={0.2} />
              <rect x={WL} y={Y2 - 5} width={WR - WL} height={10} fill={ORANGE} opacity={0.28} />
              <line x1={98} y1={Y1} x2={98} y2={Y2} stroke={STROKE} strokeWidth={1} />
              <line x1={93} y1={Y1} x2={103} y2={Y1} stroke={STROKE} strokeWidth={1} />
              <line x1={93} y1={CY} x2={103} y2={CY} stroke={STROKE} strokeWidth={1} />
              <line x1={93} y1={Y2} x2={103} y2={Y2} stroke={STROKE} strokeWidth={1} />
              <circle cx={XC} cy={Y1} r={4} fill={GREEN} />
              <circle cx={XC} cy={Y2} r={4} fill={GREEN} />
              <circle cx={XC} cy={CY} r={5} fill={GREEN} stroke="#fff" strokeWidth={1.4} />
              <text x={92} y={92} textAnchor="end" fontSize={9} fontWeight={600} fill={BLUE}>
                d₁ = 9,13
              </text>
              <text x={92} y={148} textAnchor="end" fontSize={9} fontWeight={600} fill={ORANGE}>
                d₂ = 5,87
              </text>
              <Card
                x={246}
                y={44}
                width={196}
                height={112}
                title="Składniki Steinera I_y0"
                lines={[
                  'A₁d₁² = 18·9,1304² = 1500,57',
                  'A₂d₂² = 28·5,8696² = 964,65',
                  'd₁, d₂ — odległości pionowe od y₀',
                ]}
              />
            </g>
          )}

          {index === 4 && (
            <g opacity={reveal}>
              <circle cx={XC} cy={CY} r={5} fill={GREEN} stroke="#fff" strokeWidth={1.4} />
              <Card
                x={246}
                y={44}
                width={196}
                height={126}
                title="Wynik I_y0"
                lines={[
                  '6,00 + 1829,33 = 1835,33',
                  '1500,57 + 964,65 = 2465,22',
                  'I_y0 = 1835,33 + 2465,22',
                  'I_y0 = 4300,55 cm⁴',
                ]}
                color={ORANGE}
              />
              <text x={344} y={190} textAnchor="middle" fontSize={11} fontWeight={700} fill={ORANGE}>
                I_y0 ≈ 4300,6 cm⁴
              </text>
            </g>
          )}

          {index === 5 && (
            <g opacity={reveal}>
              <rect x={122} y={TOP} width={6} height={14.4} fill={BLUE} opacity={0.5} />
              <line x1={125} y1={42} x2={XC} y2={42} stroke={BLUE} strokeWidth={1.2} />
              <text x={131} y={36} textAnchor="middle" fontSize={9.5} fontWeight={700} fill={BLUE}>
                y
              </text>
              <circle cx={XC} cy={CY} r={5} fill={GREEN} stroke="#fff" strokeWidth={1.4} />
              <Card
                x={246}
                y={44}
                width={196}
                height={118}
                title="I_z0 — odległości poziome"
                lines={['C₁ i C₂ leżą na osi z₀', 'y₁ = y₂ = 0 → Steiner = 0', 'I_z0 = I⁰(pas) + I⁰(środnik)']}
                color={BLUE}
              />
            </g>
          )}

          {index === 6 && (
            <g opacity={reveal}>
              <circle cx={XC} cy={CY} r={5} fill={GREEN} stroke="#fff" strokeWidth={1.4} />
              <Card
                x={246}
                y={44}
                width={196}
                height={112}
                title="Wynik I_z0"
                lines={['I_z0 = 121,50 + 2,33', 'I_z0 = 123,83 cm⁴', 'oś pionowa z₀']}
                color={BLUE}
              />
              <text x={344} y={185} textAnchor="middle" fontSize={11} fontWeight={700} fill={BLUE}>
                I_z0 ≈ 123,8 cm⁴
              </text>
            </g>
          )}

          {index === 7 && (
            <g opacity={reveal}>
              <rect x={252} y={88} width={170} height={18} rx={4} fill="#e9eef6" />
              <rect x={252} y={88} width={170 * p} height={18} rx={4} fill={ORANGE} />
              <rect x={252} y={130} width={170} height={18} rx={4} fill="#e9eef6" />
              <rect x={252} y={130} width={((170 * 123.83) / 4300.55) * p} height={18} rx={4} fill={BLUE} />
              <circle cx={XC} cy={CY} r={5} fill={GREEN} stroke="#fff" strokeWidth={1.4} />
              <text x={252} y={66} fontSize={10} fontWeight={700} fill={INK}>
                Porównanie momentów
              </text>
              <text x={252} y={82} fontSize={9} fill={INK}>
                I_y0 = 4300,55 cm⁴
              </text>
              <text x={252} y={124} fontSize={9} fill={INK}>
                I_z0 = 123,83 cm⁴
              </text>
              <text x={252} y={178} fontSize={10} fontWeight={700} fill={GREEN}>
                I_y0 / I_z0 ≈ 34,7
              </text>
              <text x={252} y={196} fontSize={9} fill={MUTED}>
                większy opór względem osi poziomej
              </text>
            </g>
          )}
        </svg>
      </div>
    </div>
  )
}

export function createTeeSecondMomentsAnimation(config: TeeSecondMomentsInputs): ComponentType<SolutionAnimationProps> {
  return function TeeSecondMomentsAnimation(props: SolutionAnimationProps) {
    return <TeeSecondMomentsAnimationScene {...props} />
  }
}
