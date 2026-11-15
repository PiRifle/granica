import type { ComponentType } from 'react'
import type { SolutionAnimationProps } from '../../../types'
import type { TeeCentroidInputs } from './factory'
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
const XC = 152.4
const FL = 120
const FR = 184.8
const WL = 148.8
const WR = 156
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

function DimensionV({
  x,
  y1,
  y2,
  label,
  labelX,
  labelY,
  anchor = 'end',
}: {
  x: number
  y1: number
  y2: number
  label: string
  labelX: number
  labelY: number
  anchor?: 'start' | 'middle' | 'end'
}) {
  return (
    <g>
      <line x1={x} y1={y1} x2={x} y2={y2} stroke={STROKE} strokeWidth={1} />
      <line x1={x - 5} y1={y1} x2={x + 5} y2={y1} stroke={STROKE} strokeWidth={1} />
      <line x1={x - 5} y1={y2} x2={x + 5} y2={y2} stroke={STROKE} strokeWidth={1} />
      <text x={labelX} y={labelY} textAnchor={anchor} fontSize={9} fill={INK}>
        {label}
      </text>
    </g>
  )
}

function TeeCentroidAnimationScene({ scene, index, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const p = playing ? smooth(clamp01(sceneProgress)) : 1
  const reveal = playing ? smooth(ramp(sceneProgress, 0, 0.28)) : 1
  const split = index === 1 ? 8 * p : 0
  const balanceTilt = index === 6 ? (1 - p) * 4 : 0

  return (
    <div className={local('figure')} data-metric={metric}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 340"
          role="img"
          aria-label="Przekrój teowy z podziałem na pas i środnik, środkami ciężkości części i osią centralną"
        >
          <g>
            {index === 1 ? (
              <>
                <g transform={`translate(${-split} 0)`}>
                  <rect x={FL} y={TOP} width={FR - FL} height={14.4} fill="#dce8f7" stroke={BLUE} strokeWidth={1.4} />
                </g>
                <g transform={`translate(${split} 0)`}>
                  <rect
                    x={WL}
                    y={64.4}
                    width={WR - WL}
                    height={201.6}
                    fill="#ffe7de"
                    stroke={ORANGE}
                    strokeWidth={1.4}
                  />
                </g>
              </>
            ) : (
              <>
                <rect x={FL} y={TOP} width={FR - FL} height={14.4} fill="#dce8f7" stroke={BLUE} strokeWidth={1.4} />
                <rect x={WL} y={64.4} width={WR - WL} height={201.6} fill="#ffe7de" stroke={ORANGE} strokeWidth={1.4} />
              </>
            )}
          </g>

          {index !== 1 && (
            <line
              x1={XC}
              y1={TOP - 8}
              x2={XC}
              y2={BOT + 12}
              stroke={MUTED}
              strokeWidth={1}
              strokeDasharray="5 4"
              opacity={0.7}
            />
          )}

          {index === 0 && (
            <g opacity={reveal}>
              <line x1={FL} y1={34} x2={FR} y2={34} stroke={STROKE} strokeWidth={1} />
              <line x1={FL} y1={29} x2={FL} y2={39} stroke={STROKE} strokeWidth={1} />
              <line x1={FR} y1={29} x2={FR} y2={39} stroke={STROKE} strokeWidth={1} />
              <DimensionV x={108} y1={TOP} y2={64.4} label="2,0" labelX={100} labelY={60} />
              <DimensionV x={196} y1={64.4} y2={BOT} label="28,0" labelX={204} labelY={168} anchor="start" />
              <DimensionV x={76} y1={TOP} y2={BOT} label="30,0" labelX={68} labelY={160} />
              <line x1={WL} y1={280} x2={WR} y2={280} stroke={STROKE} strokeWidth={1} />
              <line x1={WL} y1={275} x2={WL} y2={285} stroke={STROKE} strokeWidth={1} />
              <line x1={WR} y1={275} x2={WR} y2={285} stroke={STROKE} strokeWidth={1} />
              <line x1={186} y1={62} x2={200} y2={70} stroke={STROKE} strokeWidth={1} />
              <line x1={158} y1={124} x2={200} y2={124} stroke={STROKE} strokeWidth={1} />
              <text x={XC} y={26} textAnchor="middle" fontSize={10} fontWeight={600} fill={INK}>
                9,0 cm
              </text>
              <text x={XC} y={296} textAnchor="middle" fontSize={9} fill={INK}>
                1,0 cm
              </text>
              <text x={158} y={46} fontSize={10} fontWeight={600} fill={MUTED}>
                z
              </text>
              <text x={204} y={72} fontSize={9} fill={INK}>
                pas 9×2
              </text>
              <text x={204} y={124} fontSize={9} fill={INK}>
                środnik 1×28
              </text>
            </g>
          )}

          {index === 1 && (
            <g opacity={reveal}>
              <text x={108} y={58} textAnchor="end" fontSize={9.5} fontWeight={600} fill={BLUE}>
                pas
              </text>
              <text x={200} y={124} fontSize={9.5} fontWeight={600} fill={ORANGE}>
                środnik
              </text>
              <Card
                x={250}
                y={55}
                width={190}
                height={88}
                title="Pola części"
                lines={['A₁ = 9,0 · 2,0 = 18 cm²', 'A₂ = 1,0 · 28,0 = 28 cm²', 'A = 18 + 28 = 46 cm²']}
              />
            </g>
          )}

          {index === 2 && (
            <g opacity={reveal}>
              <line x1={158} y1={57} x2={188} y2={54} stroke={GREEN} strokeWidth={1} />
              <line x1={158} y1={166} x2={188} y2={176} stroke={GREEN} strokeWidth={1} />
              <circle cx={XC} cy={Y1} r={4.5} fill={GREEN} />
              <circle cx={XC} cy={Y2} r={4.5} fill={GREEN} />
              <text x={192} y={56} fontSize={9.5} fontWeight={700} fill={GREEN}>
                C₁ z₁ = 1,0
              </text>
              <text x={192} y={180} fontSize={9.5} fontWeight={700} fill={GREEN}>
                C₂ z₂ = 16,0
              </text>
              <text x={160} y={42} fontSize={9} fill={MUTED}>
                z↓
              </text>
              <Card
                x={250}
                y={70}
                width={192}
                height={96}
                title="Środki części"
                lines={['z₁ = 1,0 cm', 'z₂ = 2,0 + 14,0 = 16,0 cm', 'y₁ = y₂ = 0']}
                color={GREEN}
              />
            </g>
          )}

          {index === 3 && (
            <g opacity={reveal}>
              <circle cx={XC} cy={Y1} r={4} fill={GREEN} />
              <circle cx={XC} cy={Y2} r={4} fill={GREEN} />
              <rect x={255} y={198} width={160} height={10} rx={3} fill="#e9eef6" />
              <rect x={255} y={198} width={(160 * 18) / 466} height={10} rx={3} fill={ORANGE} />
              <rect x={255} y={228} width={160} height={10} rx={3} fill="#e9eef6" />
              <rect x={255} y={228} width={(160 * 448) / 466} height={10} rx={3} fill={BLUE} />
              <Card
                x={245}
                y={50}
                width={195}
                height={116}
                title="Pierwszy moment pola"
                lines={[
                  'A₁z₁ = 18 · 1,0 = 18 cm³',
                  'A₂z₂ = 28 · 16,0 = 448 cm³',
                  'ΣA_i z_i = 466 cm³',
                  'ΣA_i = 46 cm²',
                ]}
              />
              <text x={255} y={192} fontSize={8.5} fill={INK}>
                A₁z₁ = 18 cm³
              </text>
              <text x={255} y={222} fontSize={8.5} fill={INK}>
                A₂z₂ = 448 cm³
              </text>
              <text x={255} y={256} fontSize={8.5} fill={MUTED}>
                suma = 466 cm³
              </text>
            </g>
          )}

          {index === 4 && (
            <g opacity={reveal}>
              <DimensionV x={108} y1={TOP} y2={CY} label="10,13" labelX={100} labelY={84} />
              <line x1={XC + 7} y1={CY - 2} x2={188} y2={116} stroke={GREEN} strokeWidth={1} />
              <circle cx={XC} cy={CY} r={5.5} fill={GREEN} stroke="#fff" strokeWidth={1.5} />
              <text x={192} y={116} fontSize={10} fontWeight={700} fill={GREEN}>
                C (0; 10,13)
              </text>
              <Card
                x={245}
                y={170}
                width={195}
                height={100}
                title="Środek ciężkości"
                lines={['z_C = 466 / 46 = 10,1304 cm', '≈ 10,13 cm od góry', 'y_C = 0 (symetria)']}
                color={GREEN}
              />
            </g>
          )}

          {index === 5 && (
            <g opacity={reveal}>
              <line x1={95} y1={CY} x2={220} y2={CY} stroke={BLUE} strokeWidth={1.6} strokeDasharray="7 4" />
              <circle cx={XC} cy={CY} r={5.5} fill={GREEN} stroke="#fff" strokeWidth={1.5} />
              <text x={224} y={CY + 4} fontSize={10} fontWeight={700} fill={BLUE}>
                y₀
              </text>
              <text x={158} y={44} fontSize={10} fontWeight={700} fill={BLUE}>
                z₀
              </text>
              <text x={164} y={CY - 7} fontSize={10} fontWeight={700} fill={GREEN}>
                C
              </text>
            </g>
          )}

          {index === 6 && (
            <g opacity={reveal}>
              <line x1={112} y1={Y1} x2={112} y2={Y2} stroke={STROKE} strokeWidth={1} />
              <line x1={107} y1={Y1} x2={117} y2={Y1} stroke={STROKE} strokeWidth={1} />
              <line x1={107} y1={CY} x2={117} y2={CY} stroke={STROKE} strokeWidth={1} />
              <line x1={107} y1={Y2} x2={117} y2={Y2} stroke={STROKE} strokeWidth={1} />
              <line x1={95} y1={CY} x2={220} y2={CY} stroke={BLUE} strokeWidth={1.6} strokeDasharray="7 4" />
              <circle cx={XC} cy={Y1} r={4} fill={GREEN} />
              <circle cx={XC} cy={Y2} r={4} fill={GREEN} />
              <circle cx={XC} cy={CY} r={6} fill={GREEN} stroke="#fff" strokeWidth={1.6} />
              <text x={224} y={CY + 4} fontSize={10} fontWeight={700} fill={BLUE}>
                y₀
              </text>
              <text x={164} y={CY - 7} fontSize={10} fontWeight={700} fill={GREEN}>
                C
              </text>
              <text x={106} y={88} textAnchor="end" fontSize={9} fontWeight={600} fill={BLUE}>
                9,13
              </text>
              <text x={106} y={148} textAnchor="end" fontSize={9} fontWeight={600} fill={ORANGE}>
                5,87
              </text>
              <Card
                x={245}
                y={50}
                width={195}
                height={110}
                title="Kontrola pierwszego momentu"
                lines={[
                  '18 · (−9,1304) = −164,35',
                  '28 · (5,8696) = +164,35',
                  'suma ≈ 0 cm³',
                  'oś y₀ przechodzi przez C',
                ]}
              />
              <g transform={`rotate(${balanceTilt} 330 236)`}>
                <line x1={252} y1={236} x2={388} y2={236} stroke={INK} strokeWidth={2} />
                <circle cx={260} cy={236} r={9} fill={BLUE} />
                <circle cx={375} cy={236} r={10} fill={ORANGE} />
                <text x={260} y={218} textAnchor="middle" fontSize={8.5} fontWeight={600} fill={INK}>
                  A₁ = 18
                </text>
                <text x={375} y={214} textAnchor="middle" fontSize={8.5} fontWeight={600} fill={INK}>
                  A₂ = 28
                </text>
                <text x={295} y={232} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                  9,13
                </text>
                <text x={352} y={232} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                  5,87
                </text>
              </g>
              <polygon points="322,248 338,248 330,236" fill={MUTED} />
              <text x={330} y={278} textAnchor="middle" fontSize={9} fontWeight={600} fill={GREEN}>
                Σ A_i (z_i − z_C) = 0
              </text>
            </g>
          )}
        </svg>
      </div>
    </div>
  )
}

export function createTeeCentroidAnimation(config: TeeCentroidInputs): ComponentType<SolutionAnimationProps> {
  return function TeeCentroidAnimation(props: SolutionAnimationProps) {
    return <TeeCentroidAnimationScene {...props} />
  }
}
