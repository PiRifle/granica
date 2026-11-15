import type { ComponentType } from 'react'
import type { SolutionAnimationProps } from '../../../types'
import type { RopeBarStressInputs } from './factory'
import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const LOAD = '#ff6b45'
const OK = '#2f7d5b'
const STRESS = '#a970dd'
const MUTED = '#87929d'
const INK = '#17202a'
const GRID = '#d7dde5'
const EDGE = '#7d8fa5'

const AX = 80
const BX = 230
const CX = 380
const BAR_TOP = 234
const BAR_BOTTOM = 246
const DY = 80
const PULLEY_R = 11

const clamp01 = (value: number) => Math.max(0, Math.min(1, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}
const ramp = (value: number, from: number, to: number) => clamp01((value - from) / (to - from))

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

function RopeBarStressAnimationScene({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const p = playing ? sceneProgress : 1
  const reveal = smooth(ramp(p, 0, 0.3))
  const forceReveal = smooth(ramp(p, 0.02, 0.3))
  const geomTextReveal = smooth(ramp(p, 0.2, 0.5))
  const sectionP = smooth(ramp(p, 0.15, 0.35))
  const stressP = smooth(ramp(p, 0.25, 0.6))
  const resultReveal = smooth(ramp(p, 0.6, 0.85))
  const showFbd = metric === 'fbd' || metric === 'solve' || metric === 'check'
  const showDims =
    metric === 'model' || metric === 'geometry' || metric === 'fbd' || metric === 'moment' || metric === 'solve'
  const showSection = metric === 'stress' || metric === 'interpret'

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 340"
          role="img"
          aria-label="Pręt ABC z przegubem C i liną przez bloczek D, siły, momenty, przekrój liny i naprężenie"
        >
          <g opacity={reveal}>
            <rect x={200} y={52} width={60} height={6} fill="#c9d3df" stroke={EDGE} strokeWidth={1.1} />
            {Array.from({ length: 4 }, (_, index) => 206 + index * 15).map((x) => (
              <line key={`ceil-${x}`} x1={x} y1={52} x2={x - 7} y2={44} stroke={EDGE} strokeWidth={1} />
            ))}
            <line x1={BX} y1={58} x2={BX} y2={DY - PULLEY_R} stroke={EDGE} strokeWidth={2} />

            {metric === 'geometry' && (
              <polygon
                points={`${AX},${BAR_TOP} ${BX},${BAR_TOP} ${BX},${DY}`}
                fill={OK}
                fillOpacity={0.12}
                stroke={OK}
                strokeWidth={1.1}
                strokeDasharray="5 3"
              />
            )}

            <line x1={AX} y1={BAR_TOP} x2={BX} y2={DY} stroke={EDGE} strokeWidth={2.4} />
            <line x1={BX} y1={DY} x2={BX} y2={BAR_TOP} stroke={EDGE} strokeWidth={2.4} />
            <circle cx={BX} cy={DY} r={PULLEY_R} fill="#f2f5fa" stroke={EDGE} strokeWidth={1.6} />
            <circle cx={BX} cy={DY} r={2.5} fill={EDGE} />

            <rect
              x={AX}
              y={BAR_TOP}
              width={CX - AX}
              height={BAR_BOTTOM - BAR_TOP}
              rx={2}
              fill="#dfe6f2"
              stroke={EDGE}
              strokeWidth={1.4}
            />
            <polygon
              points={`${CX},${BAR_BOTTOM} ${CX - 12},${BAR_BOTTOM + 18} ${CX + 12},${BAR_BOTTOM + 18}`}
              fill="#c9d3df"
              stroke={EDGE}
              strokeWidth={1.2}
            />
            <line x1={CX - 18} y1={BAR_BOTTOM + 18} x2={CX + 18} y2={BAR_BOTTOM + 18} stroke={EDGE} strokeWidth={2} />

            <Arrow x1={BX} y1={BAR_BOTTOM} x2={BX} y2={BAR_BOTTOM + 38} color={LOAD} width={2.4} />

            {showFbd && (
              <g opacity={forceReveal}>
                <Arrow x1={AX + 16} y1={BAR_TOP - 12} x2={AX + 43} y2={BAR_TOP - 41} color={OK} width={2.2} />
                <Arrow x1={BX + 14} y1={BAR_TOP - 6} x2={BX + 14} y2={BAR_TOP - 42} color={OK} width={2.2} />
                <Arrow x1={CX + 8} y1={BAR_TOP} x2={CX + 40} y2={BAR_TOP} color={STRESS} width={2} />
                <Arrow x1={CX} y1={BAR_TOP - 6} x2={CX} y2={BAR_TOP - 34} color={STRESS} width={2} />
              </g>
            )}

            {metric === 'moment' && (
              <g opacity={forceReveal}>
                <Arrow x1={AX} y1={BAR_TOP} x2={AX} y2={BAR_TOP - 44} color={LOAD} width={2.4} />
                <line
                  x1={AX}
                  y1={BAR_TOP + 22}
                  x2={AX + (CX - AX) * forceReveal}
                  y2={BAR_TOP + 22}
                  stroke={ACCENT}
                  strokeWidth={1.2}
                  strokeDasharray="5 3"
                />
                <line
                  x1={CX}
                  y1={BAR_TOP}
                  x2={CX}
                  y2={BAR_TOP + 22}
                  stroke={ACCENT}
                  strokeWidth={1}
                  strokeDasharray="4 3"
                />
              </g>
            )}

            {showSection && (
              <g>
                <circle
                  cx={310}
                  cy={145}
                  r={32 * sectionP}
                  fill={STRESS}
                  fillOpacity={0.14}
                  stroke={STRESS}
                  strokeWidth={1.7}
                />
                <line
                  x1={310 - 22 * sectionP}
                  y1={145 - 22 * sectionP}
                  x2={310 + 22 * sectionP}
                  y2={145 + 22 * sectionP}
                  stroke={STRESS}
                  strokeWidth={1.1}
                  strokeDasharray="4 3"
                />
                <g opacity={stressP}>
                  <Arrow x1={294} y1={137} x2={324} y2={137} color={STRESS} width={1.2} />
                  <Arrow x1={294} y1={145} x2={324} y2={145} color={STRESS} width={1.2} />
                  <Arrow x1={294} y1={153} x2={324} y2={153} color={STRESS} width={1.2} />
                </g>
              </g>
            )}

            {showDims && (
              <g>
                <line x1={AX} y1={300} x2={CX} y2={300} stroke={MUTED} strokeWidth={1} />
                <line x1={AX} y1={295} x2={AX} y2={305} stroke={MUTED} strokeWidth={1} />
                <line x1={BX} y1={295} x2={BX} y2={305} stroke={MUTED} strokeWidth={1} />
                <line x1={CX} y1={295} x2={CX} y2={305} stroke={MUTED} strokeWidth={1} />
                <line x1={250} y1={DY} x2={250} y2={BAR_TOP} stroke={MUTED} strokeWidth={1} />
                <line x1={245} y1={DY} x2={255} y2={DY} stroke={MUTED} strokeWidth={1} />
                <line x1={245} y1={BAR_TOP} x2={255} y2={BAR_TOP} stroke={MUTED} strokeWidth={1} />
              </g>
            )}

            <text x={230} y={22} textAnchor="middle" fontSize={10} fontWeight={700} fill={INK}>
              Pręt ABC 3000 kg — lina przez bloczek
            </text>
            <text x={BX + 14} y={76} fontSize={9} fontWeight={700} fill={INK}>
              D
            </text>
            <text x={72} y={230} textAnchor="end" fontSize={9} fontWeight={700} fill={INK}>
              A
            </text>
            <text x={222} y={228} textAnchor="end" fontSize={9} fontWeight={700} fill={INK}>
              B
            </text>
            <text x={388} y={230} fontSize={9} fontWeight={700} fill={INK}>
              C
            </text>

            <text x={242} y={266} fontSize={9} fontWeight={700} fill={LOAD}>
              W = 29,43 kN
            </text>

            {showDims && (
              <g>
                <text x={155} y={316} textAnchor="middle" fontSize={9} fill={MUTED}>
                  5 m
                </text>
                <text x={305} y={316} textAnchor="middle" fontSize={9} fill={MUTED}>
                  5 m
                </text>
                <text x={256} y={160} fontSize={9} fill={MUTED}>
                  3 m
                </text>
              </g>
            )}

            {metric === 'geometry' && (
              <g opacity={geomTextReveal}>
                <text x={270} y={110} fontSize={9} fontWeight={700} fill={OK}>
                  AD = 5,831 m
                </text>
                <text x={270} y={128} fontSize={9} fill={INK}>
                  sin θ = 3/5,831 = 0,5145
                </text>
                <text x={270} y={146} fontSize={9} fill={INK}>
                  cos θ = 5/5,831 = 0,8575
                </text>
              </g>
            )}

            {metric === 'fbd' && (
              <g opacity={forceReveal}>
                <text x={132} y={200} fontSize={9} fontWeight={700} fill={OK}>
                  S
                </text>
                <text x={248} y={210} fontSize={9} fontWeight={700} fill={OK}>
                  S
                </text>
                <text x={403} y={230} fontSize={8.5} fontWeight={700} fill={STRESS}>
                  C_x
                </text>
                <text x={386} y={208} fontSize={8.5} fontWeight={700} fill={STRESS}>
                  C_y
                </text>
              </g>
            )}

            {metric === 'moment' && (
              <g opacity={forceReveal}>
                <text x={86} y={206} fontSize={8.5} fontWeight={700} fill={LOAD}>
                  S_y
                </text>
                <text x={(AX + CX) / 2} y={290} textAnchor="middle" fontSize={8.5} fill={ACCENT}>
                  ramię 10 m
                </text>
              </g>
            )}

            {metric === 'solve' && (
              <text x={300} y={112} fontSize={11} fontWeight={700} fill={OK} opacity={resultReveal}>
                S = 14,50 kN
              </text>
            )}

            {showSection && (
              <g>
                <g opacity={geomTextReveal}>
                  <text x={310} y={196} textAnchor="middle" fontSize={9} fontWeight={700} fill={STRESS}>
                    d = 12 mm
                  </text>
                  <text x={310} y={214} textAnchor="middle" fontSize={9} fill={INK}>
                    A = 113,10 mm²
                  </text>
                </g>
                <text
                  x={310}
                  y={232}
                  textAnchor="middle"
                  fontSize={10}
                  fontWeight={700}
                  fill={STRESS}
                  opacity={resultReveal}
                >
                  σ = 128,25 MPa
                </text>
              </g>
            )}

            {metric === 'check' && (
              <g opacity={resultReveal}>
                <text x={230} y={300} textAnchor="middle" fontSize={9.5} fontWeight={700} fill={INK}>
                  ΣF_x = 0, ΣF_y = 0 — układ zamknięty
                </text>
                <text x={230} y={322} textAnchor="middle" fontSize={9} fill={MUTED}>
                  reakcje C_x i C_y wynikają z równowagi
                </text>
              </g>
            )}

            {metric === 'interpret' && (
              <g opacity={resultReveal}>
                <text x={230} y={302} textAnchor="middle" fontSize={9.5} fontWeight={700} fill={OK}>
                  128,25 MPa &lt; typowe 150–200 MPa
                </text>
                <text x={230} y={322} textAnchor="middle" fontSize={9} fill={MUTED}>
                  przyjęto g = 9,81 m/s²
                </text>
              </g>
            )}
          </g>
        </svg>
      </div>
    </div>
  )
}

export function createRopeBarStressAnimation(config: RopeBarStressInputs): ComponentType<SolutionAnimationProps> {
  return function RopeBarStressAnimation(props: SolutionAnimationProps) {
    return <RopeBarStressAnimationScene {...props} />
  }
}
