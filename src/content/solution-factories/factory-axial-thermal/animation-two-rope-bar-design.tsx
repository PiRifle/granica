import type { ComponentType } from 'react'
import type { SolutionAnimationProps } from '../../../types'
import type { TwoRopeBarDesignInputs } from './factory'
import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const BRONZE = '#a970dd'
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

const AX = 110
const BX = 380
const BAR_Y = 200
const BAR_H = 22
const BRONZE_TOP = 80
const STEEL_TOP = 110

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

function barPolygon(ax: number, ay: number, bx: number, by: number, half: number) {
  const dx = bx - ax
  const dy = by - ay
  const length = Math.hypot(dx, dy)
  const nx = -dy / length
  const ny = dx / length
  const points = [
    [ax + nx * half, ay + ny * half],
    [bx + nx * half, by + ny * half],
    [bx - nx * half, by - ny * half],
    [ax - nx * half, ay - ny * half],
  ]
  return points.map(([x, y]) => `${x},${y}`).join(' ')
}

function Ceilings() {
  return (
    <g>
      <rect x={75} y={78} width={70} height={6} fill="#c9d3df" stroke={EDGE} strokeWidth={1.1} />
      <rect x={345} y={108} width={70} height={6} fill="#c9d3df" stroke={EDGE} strokeWidth={1.1} />
      {Array.from({ length: 5 }, (_, index) => 82 + index * 15).map((x) => (
        <line key={`b-${x}`} x1={x} y1={78} x2={x - 7} y2={70} stroke={EDGE} strokeWidth={1} />
      ))}
      {Array.from({ length: 5 }, (_, index) => 352 + index * 15).map((x) => (
        <line key={`s-${x}`} x1={x} y1={108} x2={x - 7} y2={100} stroke={EDGE} strokeWidth={1} />
      ))}
    </g>
  )
}

function TwoRopeBarDesignAnimationScene({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const p = playing ? smooth(clamp01(sceneProgress)) : 1

  const elongationScene = metric === 'bronze-elongation' || metric === 'steel-elongation'
  const compare = metric === 'compare'
  const dropA = metric === 'bronze-elongation' ? 12 * p : 0
  const dropB = metric === 'steel-elongation' ? 6 * p : 0
  const aY = BAR_Y + dropA
  const bY = BAR_Y + dropB

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 340"
          role="img"
          aria-label="Pręt zawieszony na dwóch linach, ciężar, dobór przekrojów i wydłużenia liny brązowej oraz stalowej"
        >
          <Ceilings />
          <line
            x1={AX}
            y1={BRONZE_TOP}
            x2={AX}
            y2={aY}
            stroke={BRONZE}
            strokeWidth={metric === 'bronze-area' ? 4 : 3}
          />
          <line x1={BX} y1={STEEL_TOP} x2={BX} y2={bY} stroke={ACCENT} strokeWidth={metric === 'steel-area' ? 4 : 3} />

          {!elongationScene && (
            <rect x={100} y={BAR_Y} width={290} height={BAR_H} rx={3} fill="#dfe6f2" stroke={EDGE} strokeWidth={1.3} />
          )}
          {elongationScene && (
            <polygon points={barPolygon(AX, aY, BX, bY, BAR_H / 2)} fill="#dfe6f2" stroke={EDGE} strokeWidth={1.3} />
          )}

          {!elongationScene && !compare && (
            <g>
              <Arrow x1={245} y1={BAR_Y + BAR_H} x2={245} y2={BAR_Y + BAR_H + 28} color={LOAD} width={2.4} />
              <line x1={AX} y1={280} x2={BX} y2={280} stroke={MUTED} strokeWidth={1} />
              <line x1={AX} y1={275} x2={AX} y2={285} stroke={MUTED} strokeWidth={1} />
              <line x1={BX} y1={275} x2={BX} y2={285} stroke={MUTED} strokeWidth={1} />
            </g>
          )}

          {metric === 'load' && (
            <g>
              <Arrow x1={AX + 14} y1={196} x2={AX + 14} y2={172} color={OK} width={2} />
              <Arrow x1={BX - 14} y1={196} x2={BX - 14} y2={172} color={OK} width={2} />
            </g>
          )}

          {metric === 'bronze-elongation' && (
            <g>
              <line x1={90} y1={BAR_Y} x2={90} y2={aY} stroke={BRONZE} strokeWidth={1.1} />
              <line x1={85} y1={BAR_Y} x2={95} y2={BAR_Y} stroke={BRONZE} strokeWidth={1.1} />
              <line x1={85} y1={aY} x2={95} y2={aY} stroke={BRONZE} strokeWidth={1.1} />
            </g>
          )}

          {metric === 'steel-elongation' && (
            <g>
              <line x1={400} y1={BAR_Y} x2={400} y2={bY} stroke={ACCENT} strokeWidth={1.1} />
              <line x1={395} y1={BAR_Y} x2={405} y2={BAR_Y} stroke={ACCENT} strokeWidth={1.1} />
              <line x1={395} y1={bY} x2={405} y2={bY} stroke={ACCENT} strokeWidth={1.1} />
            </g>
          )}

          {compare && (
            <g>
              <rect
                x={140}
                y={274}
                width={90}
                height={12}
                rx={3}
                fill={BRONZE}
                fillOpacity={0.3}
                stroke={BRONZE}
                strokeWidth={1.2}
              />
              <rect
                x={140}
                y={298}
                width={54}
                height={12}
                rx={3}
                fill={ACCENT}
                fillOpacity={0.3}
                stroke={ACCENT}
                strokeWidth={1.2}
              />
              <line x1={140} y1={268} x2={140} y2={314} stroke={MUTED} strokeWidth={1} />
            </g>
          )}

          <text x={230} y={22} textAnchor="middle" fontSize={10} fontWeight={700} fill={INK}>
            Pręt 800 kg na dwóch linach
          </text>
          <text x={95} y={125} textAnchor="end" fontSize={8.5} fontWeight={700} fill={BRONZE}>
            L₁ = 4 m
          </text>
          <text x={95} y={145} textAnchor="end" fontSize={8.5} fill={MUTED}>
            lina brązowa
          </text>
          <text x={430} y={150} textAnchor="end" fontSize={8.5} fontWeight={700} fill={ACCENT}>
            L₂ = 3 m
          </text>
          <text x={455} y={170} textAnchor="end" fontSize={8.5} fill={MUTED}>
            lina stalowa
          </text>

          <text x={96} y={194} textAnchor="end" fontSize={9} fontWeight={700} fill={INK}>
            A
          </text>
          <text x={394} y={194} fontSize={9} fontWeight={700} fill={INK}>
            B
          </text>

          {!elongationScene && !compare && (
            <g>
              <text x={252} y={264} fontSize={9} fontWeight={700} fill={LOAD}>
                W = 7848 N
              </text>
              <text x={230} y={296} textAnchor="middle" fontSize={9} fill={MUTED}>
                L = 10 m
              </text>
            </g>
          )}

          {metric === 'load' && (
            <g>
              <text x={130} y={164} fontSize={8.5} fontWeight={700} fill={OK}>
                N_b = 3924 N
              </text>
              <text x={330} y={182} textAnchor="end" fontSize={8.5} fontWeight={700} fill={OK}>
                N_st = 3924 N
              </text>
            </g>
          )}

          {metric === 'bronze-area' && (
            <text x={230} y={320} textAnchor="middle" fontSize={9.5} fontWeight={700} fill={BRONZE}>
              A_b ≥ 3924 / 90 = 43,6 mm²
            </text>
          )}

          {metric === 'steel-area' && (
            <text x={230} y={320} textAnchor="middle" fontSize={9.5} fontWeight={700} fill={ACCENT}>
              A_st ≥ 3924 / 120 = 32,7 mm²
            </text>
          )}

          {metric === 'check' && (
            <g>
              <text x={230} y={314} textAnchor="middle" fontSize={9} fill={INK}>
                A_b = 44 mm² → σ_b = 89,2 MPa &lt; 90 MPa
              </text>
              <text x={230} y={332} textAnchor="middle" fontSize={9} fill={INK}>
                A_st = 33 mm² → σ_st = 118,9 MPa &lt; 120 MPa
              </text>
            </g>
          )}

          {metric === 'bronze-elongation' && (
            <g>
              <text x={100} y={172} textAnchor="end" fontSize={8.5} fontWeight={700} fill={BRONZE}>
                ΔL_b = 3,00 mm
              </text>
              <text x={230} y={302} textAnchor="middle" fontSize={9.5} fontWeight={700} fill={BRONZE}>
                wydłużenie liny brązowej
              </text>
              <text x={230} y={322} textAnchor="middle" fontSize={9} fill={MUTED}>
                ΔL_b = 3924·4000 / (120000·43,6) = 3,00 mm
              </text>
            </g>
          )}

          {metric === 'steel-elongation' && (
            <g>
              <text x={370} y={172} textAnchor="end" fontSize={8.5} fontWeight={700} fill={ACCENT}>
                ΔL_st = 1,80 mm
              </text>
              <text x={230} y={302} textAnchor="middle" fontSize={9.5} fontWeight={700} fill={ACCENT}>
                wydłużenie liny stalowej
              </text>
              <text x={230} y={322} textAnchor="middle" fontSize={9} fill={MUTED}>
                ΔL_st = 3924·3000 / (200000·32,7) = 1,80 mm
              </text>
            </g>
          )}

          {compare && (
            <g>
              <text x={230} y={258} textAnchor="middle" fontSize={9.5} fontWeight={700} fill={INK}>
                porównanie wydłużeń
              </text>
              <text x={132} y={283} textAnchor="end" fontSize={8.5} fill={BRONZE}>
                brąz
              </text>
              <text x={132} y={307} textAnchor="end" fontSize={8.5} fill={ACCENT}>
                stal
              </text>
              <text x={238} y={283} fontSize={8.5} fontWeight={700} fill={BRONZE}>
                3,00 mm
              </text>
              <text x={202} y={307} fontSize={8.5} fontWeight={700} fill={ACCENT}>
                1,80 mm
              </text>
              <text x={230} y={334} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                dłuższa lina brązowa wydłuża się bardziej
              </text>
            </g>
          )}
        </svg>
      </div>
    </div>
  )
}

export function createTwoRopeBarDesignAnimation(config: TwoRopeBarDesignInputs): ComponentType<SolutionAnimationProps> {
  return function TwoRopeBarDesignAnimation(props: SolutionAnimationProps) {
    return <TwoRopeBarDesignAnimationScene {...props} />
  }
}
