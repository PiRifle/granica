import type { ComponentType } from 'react'
import type { SolutionAnimationProps } from '../../../types'
import type { SteppedAluminumInputs } from './factory'
import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const LOAD = '#ff6b45'
const OK = '#2f7d5b'
const MUTED = '#87929d'
const INK = '#17202a'
const EDGE = '#7d8fa5'

const CX = 230
const LOWER_X = 208
const LOWER_W = 44
const UPPER_X = 221
const UPPER_W = 18
const A_Y = 300
const B_Y = 190
const C_Y = 110
const QX = 275

const clamp01 = (value: number) => Math.max(0, Math.min(1, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}
const ramp = (value: number, from: number, to: number) => clamp01((value - from) / (to - from))
const lerp = (from: number, to: number, t: number) => from + (to - from) * t

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

function SteppedAluminumAnimationScene({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const p = playing ? sceneProgress : 1
  const reveal = smooth(ramp(p, 0, 0.3))
  const forceReveal = smooth(ramp(p, 0.05, 0.3))
  const textReveal = smooth(ramp(p, 0.2, 0.5))
  const cutP = smooth(ramp(p, 0.1, 0.4))
  const compatP = smooth(ramp(p, 0.25, 0.6))
  const stressP = smooth(ramp(p, 0.6, 0.9))
  const resultReveal = smooth(ramp(p, 0.6, 0.85))
  const showQ = metric !== 'upper'
  const showDiameters = metric !== 'areas'
  const qValue = metric === 'solve' || metric === 'stress' || metric === 'check'
  const cutY = metric === 'upper' ? lerp(C_Y + 16, B_Y - 10, cutP) : lerp(B_Y + 14, A_Y - 30, cutP)

  const lowerOpacity = metric === 'lower' ? 0.3 : 0.14
  const upperOpacity = metric === 'upper' ? 0.3 : 0.14

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 340"
          role="img"
          aria-label="Stopniowany pręt aluminiowy utwierdzony w A, siły P i Q, przekroje, przemieszczenia i naprężenia"
        >
          <g opacity={reveal}>
            <rect x={190} y={300} width={80} height={5} fill="#c9d3df" stroke={EDGE} strokeWidth={1.1} />
            {Array.from({ length: 6 }, (_, index) => 198 + index * 14).map((x) => (
              <line key={`base-${x}`} x1={x} y1={305} x2={x - 7} y2={314} stroke={EDGE} strokeWidth={1} />
            ))}

            <rect
              x={LOWER_X}
              y={B_Y}
              width={LOWER_W}
              height={A_Y - B_Y}
              fill={ACCENT}
              fillOpacity={lowerOpacity}
              stroke={ACCENT}
              strokeWidth={1.5}
            />
            <rect
              x={UPPER_X}
              y={C_Y}
              width={UPPER_W}
              height={B_Y - C_Y}
              fill={ACCENT}
              fillOpacity={upperOpacity}
              stroke={ACCENT}
              strokeWidth={1.5}
            />

            {metric === 'stress' && (
              <g opacity={stressP}>
                <rect
                  x={LOWER_X}
                  y={B_Y}
                  width={LOWER_W}
                  height={A_Y - B_Y}
                  fill={LOAD}
                  fillOpacity={0.26}
                  stroke={LOAD}
                  strokeWidth={1.5}
                />
                <rect
                  x={UPPER_X}
                  y={C_Y}
                  width={UPPER_W}
                  height={B_Y - C_Y}
                  fill={OK}
                  fillOpacity={0.26}
                  stroke={OK}
                  strokeWidth={1.5}
                />
              </g>
            )}

            <g opacity={forceReveal}>
              <Arrow x1={CX} y1={C_Y - 4} x2={CX} y2={C_Y - 30} color={LOAD} width={2.4} />
              {showQ && <Arrow x1={QX} y1={B_Y - 10} x2={QX} y2={B_Y + 30} color={LOAD} width={2.4} />}
            </g>

            {metric === 'upper' && (
              <g opacity={cutP}>
                <line x1={212} y1={cutY} x2={252} y2={cutY} stroke={LOAD} strokeWidth={1.5} strokeDasharray="5 3" />
                <Arrow x1={252} y1={cutY - 16} x2={252} y2={cutY + 6} color={OK} width={2} />
              </g>
            )}

            {metric === 'lower' && (
              <g opacity={cutP}>
                <line x1={212} y1={cutY} x2={252} y2={cutY} stroke={LOAD} strokeWidth={1.5} strokeDasharray="5 3" />
                <Arrow x1={258} y1={cutY - 10} x2={258} y2={cutY + 12} color={LOAD} width={2} />
              </g>
            )}

            {metric === 'compatibility' && (
              <g>
                <line
                  x1={330}
                  y1={C_Y - 20}
                  x2={330}
                  y2={lerp(C_Y - 20, A_Y + 6, compatP)}
                  stroke={MUTED}
                  strokeWidth={1}
                  strokeDasharray="5 4"
                />
                <line x1={325} y1={C_Y - 20} x2={335} y2={C_Y - 20} stroke={MUTED} strokeWidth={1} opacity={compatP} />
                <line x1={325} y1={A_Y + 6} x2={335} y2={A_Y + 6} stroke={MUTED} strokeWidth={1} opacity={compatP} />
              </g>
            )}

            <line x1={180} y1={B_Y} x2={180} y2={A_Y} stroke={MUTED} strokeWidth={1} />
            <line x1={175} y1={B_Y} x2={185} y2={B_Y} stroke={MUTED} strokeWidth={1} />
            <line x1={175} y1={A_Y} x2={185} y2={A_Y} stroke={MUTED} strokeWidth={1} />
            <line x1={180} y1={C_Y} x2={180} y2={B_Y} stroke={MUTED} strokeWidth={1} />
            <line x1={175} y1={C_Y} x2={185} y2={C_Y} stroke={MUTED} strokeWidth={1} />

            <text x={230} y={22} textAnchor="middle" fontSize={10} fontWeight={700} fill={INK}>
              Stopniowany pręt aluminiowy
            </text>
            <text x={CX} y={104} textAnchor="middle" fontSize={9} fontWeight={700} fill={INK}>
              C
            </text>
            <text x={198} y={194} textAnchor="end" fontSize={9} fontWeight={700} fill={INK}>
              B
            </text>
            <text x={CX} y={332} textAnchor="middle" fontSize={9} fontWeight={700} fill={INK}>
              A
            </text>
            <text x={240} y={78} fontSize={9} fontWeight={700} fill={LOAD} opacity={forceReveal}>
              P = 5 kN
            </text>

            {showQ && (
              <text
                x={QX + 7}
                y={172}
                fontSize={9}
                fontWeight={700}
                fill={LOAD}
                opacity={qValue ? resultReveal : forceReveal}
              >
                {qValue ? 'Q = 41 kN' : 'Q'}
              </text>
            )}

            <text x={174} y={248} textAnchor="end" fontSize={9} fontWeight={700} fill={INK}>
              l₁ = 0,5 m
            </text>
            <text x={174} y={154} textAnchor="end" fontSize={9} fontWeight={700} fill={INK}>
              l₂ = 0,4 m
            </text>

            {showDiameters && (
              <g opacity={textReveal}>
                <text x={262} y={290} fontSize={9} fill={MUTED}>
                  d₁ = 60 mm
                </text>
                <text x={250} y={150} fontSize={9} fill={MUTED}>
                  d₂ = 20 mm
                </text>
              </g>
            )}

            {metric === 'areas' && (
              <g opacity={textReveal}>
                <text x={290} y={130} fontSize={9} fontWeight={700} fill={ACCENT}>
                  A₁ = 2827 mm²
                </text>
                <text x={290} y={148} fontSize={9} fontWeight={700} fill={ACCENT}>
                  A₂ = 314 mm²
                </text>
                <text x={290} y={166} fontSize={9} fill={INK}>
                  E = 70 GPa = 70 000 MPa
                </text>
                <text x={290} y={184} fontSize={9} fill={INK}>
                  P = 5 kN
                </text>
              </g>
            )}

            {metric === 'upper' && (
              <g opacity={textReveal}>
                <text x={262} y={184} fontSize={9} fontWeight={700} fill={OK}>
                  N₂ = +P = +5 kN
                </text>
                <text x={262} y={202} fontSize={9} fill={MUTED}>
                  rozciąganie górnej części
                </text>
              </g>
            )}

            {metric === 'lower' && (
              <g opacity={textReveal}>
                <text x={280} y={196} fontSize={9} fontWeight={700} fill={LOAD}>
                  N₁ = P − Q
                </text>
                <text x={280} y={214} fontSize={9} fill={MUTED}>
                  znak zależy od Q
                </text>
              </g>
            )}

            {metric === 'compatibility' && (
              <g opacity={compatP}>
                <text x={260} y={220} fontSize={9} fontWeight={700} fill={INK}>
                  δ_C = δ₁ + δ₂ = 0
                </text>
                <text x={260} y={240} fontSize={9} fill={MUTED}>
                  δ₁ = N₁l₁ / (EA₁)
                </text>
                <text x={260} y={260} fontSize={9} fill={MUTED}>
                  δ₂ = N₂l₂ / (EA₂)
                </text>
              </g>
            )}

            {metric === 'solve' && (
              <g>
                <text x={280} y={240} fontSize={9} fill={INK} opacity={textReveal}>
                  Q = P[1 + (l₂/l₁)(A₁/A₂)]
                </text>
                <text x={280} y={260} fontSize={9} fontWeight={700} fill={LOAD} opacity={resultReveal}>
                  = 5·(1 + 7,2) = 41 kN
                </text>
              </g>
            )}

            {metric === 'stress' && (
              <g opacity={stressP}>
                <text x={270} y={230} fontSize={9} fontWeight={700} fill={LOAD}>
                  σ₁ = −12,73 MPa
                </text>
                <text x={250} y={135} fontSize={9} fontWeight={700} fill={OK}>
                  σ₂ = +15,92 MPa
                </text>
              </g>
            )}

            {metric === 'check' && (
              <g opacity={resultReveal}>
                <text x={260} y={230} fontSize={9.5} fontWeight={700} fill={OK}>
                  δ_C = 0 — punkt C nie rusza się
                </text>
                <text x={260} y={250} fontSize={9} fill={MUTED}>
                  dół ściskany, góra rozciągana
                </text>
              </g>
            )}
          </g>
        </svg>
      </div>
    </div>
  )
}

export function createSteppedAluminumAnimation(config: SteppedAluminumInputs): ComponentType<SolutionAnimationProps> {
  return function SteppedAluminumAnimation(props: SolutionAnimationProps) {
    return <SteppedAluminumAnimationScene {...props} />
  }
}
