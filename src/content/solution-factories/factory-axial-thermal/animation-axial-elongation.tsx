import type { ComponentType } from 'react'
import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import type { AxialElongationInputs } from './factory'
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
const ramp = (value: number, from: number, to: number) => clamp01((value - from) / (to - from))
const lerp = (from: number, to: number, t: number) => from + (to - from) * t

const X0 = 78
const X1 = 382
const BAR_TOP = 150
const BAR_H = 30
const TOTAL_LENGTH = 600
const SPAN = X1 - X0

const SEGMENTS = [
  { id: '1', length: 100, n: 5000, deltaL: 0.055556, label: 'AB' },
  { id: '2', length: 300, n: 2000, deltaL: 0.066667, label: 'BC' },
  { id: '3', length: 200, n: 12000, deltaL: 0.266667, label: 'CD' },
]

const NODES = [X0]
for (const segment of SEGMENTS) {
  NODES.push(NODES[NODES.length - 1] + (segment.length / TOTAL_LENGTH) * SPAN)
}
const MID = SEGMENTS.map((_, index) => (NODES[index] + NODES[index + 1]) / 2)
const WIDTHS = SEGMENTS.map((_, index) => NODES[index + 1] - NODES[index])

const ELONGATION_STRETCH = 90
const STACK_SCALE = 300 / 0.388889
const normalBarHeight = (n: number) => Math.max(12, (n / 1000) * 3.8)

function Arrow({
  x1,
  y1,
  x2,
  y2,
  color,
  width = 2.2,
  opacity = 1,
}: {
  x1: number
  y1: number
  x2: number
  y2: number
  color: string
  width?: number
  opacity?: number
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
    <g opacity={opacity}>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={width} strokeLinecap="round" />
      <polygon points={`${x2},${y2} ${leftX},${leftY} ${rightX},${rightY}`} fill={color} />
    </g>
  )
}

function DimensionLine({ from, to, y }: { from: number; to: number; y: number }) {
  return (
    <g stroke={MUTED} strokeWidth={1}>
      <line x1={from} y1={y} x2={to} y2={y} />
      <line x1={from} y1={y - 4} x2={from} y2={y + 4} />
      <line x1={to} y1={y - 4} x2={to} y2={y + 4} />
    </g>
  )
}

function AxialElongationAnimationScene({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const p = playing ? smooth(clamp01(sceneProgress)) : 1

  const sectionIndex = metric === 'section1' ? 0 : metric === 'section2' ? 1 : metric === 'section3' ? 2 : -1
  const activeIndex = sectionIndex >= 0 ? sectionIndex : -1

  const cutX =
    sectionIndex >= 0
      ? lerp(
          NODES[sectionIndex] + 0.18 * WIDTHS[sectionIndex],
          NODES[sectionIndex + 1] - 0.18 * WIDTHS[sectionIndex],
          p,
        )
      : NODES[1]

  const stackHeights = SEGMENTS.map((segment) => segment.deltaL * STACK_SCALE)
  const stackX = [X0]
  for (const height of stackHeights) {
    stackX.push(stackX[stackX.length - 1] + height)
  }

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 340"
          role="img"
          aria-label="Pręt aluminiowy z trzema odcinkami, czterema siłami, przekrojami, wykresem siły podłużnej i paskiem wydłużeń"
        >
          <text x={230} y={22} textAnchor="middle" fontSize={10} fontWeight={700} fill={INK}>
            Pręt aluminiowy: trzy odcinki, cztery siły
          </text>

          {SEGMENTS.map((segment, index) => {
            const active = index === activeIndex
            return (
              <rect
                key={`bar-${segment.id}`}
                x={NODES[index]}
                y={BAR_TOP}
                width={WIDTHS[index]}
                height={BAR_H}
                fill={ACCENT}
                fillOpacity={active ? 0.3 : 0.13}
                stroke={ACCENT}
                strokeWidth={active ? 2 : 1.4}
              />
            )
          })}

          {sectionIndex >= 0 && (
            <motion.rect
              x={NODES[sectionIndex]}
              y={BAR_TOP}
              height={BAR_H}
              rx={2}
              fill={LOAD}
              fillOpacity={0.2}
              stroke={LOAD}
              strokeWidth={1}
              strokeDasharray="4 3"
              initial={false}
              animate={{ width: WIDTHS[sectionIndex] + SEGMENTS[sectionIndex].deltaL * ELONGATION_STRETCH * p }}
              transition={{ duration: 0.15, ease: 'linear' }}
            />
          )}

          <Arrow x1={X0} y1={126} x2={X0 - 40} y2={126} color={LOAD} />
          <Arrow x1={NODES[1]} y1={140} x2={NODES[1] + 48} y2={140} color={LOAD} />
          <Arrow x1={NODES[2]} y1={126} x2={NODES[2] - 48} y2={126} color={LOAD} />
          <Arrow x1={X1} y1={140} x2={X1 + 40} y2={140} color={LOAD} />

          {sectionIndex >= 0 && (
            <g>
              <line x1={cutX} y1={BAR_TOP - 14} x2={cutX} y2={BAR_TOP - 1} stroke={LOAD} strokeWidth={2} />
              <line
                x1={cutX}
                y1={BAR_TOP + BAR_H + 1}
                x2={cutX}
                y2={BAR_TOP + BAR_H + 14}
                stroke={LOAD}
                strokeWidth={2}
              />
              <polygon
                points={`${cutX},${BAR_TOP + BAR_H / 2 + 9} ${cutX - 4},${BAR_TOP + BAR_H / 2 + 2} ${cutX + 4},${BAR_TOP + BAR_H / 2 + 2}`}
                fill={LOAD}
              />
            </g>
          )}

          <DimensionLine from={X0} to={NODES[1]} y={204} />
          <DimensionLine from={NODES[1]} to={NODES[2]} y={204} />
          <DimensionLine from={NODES[2]} to={NODES[3]} y={204} />

          {metric === 'normal' && (
            <g>
              <line x1={60} y1={322} x2={404} y2={322} stroke={EDGE} strokeWidth={1.2} />
              {SEGMENTS.map((segment, index) => {
                const height = normalBarHeight(segment.n)
                const top = 322 - height
                return (
                  <rect
                    key={`nbar-${segment.id}`}
                    x={NODES[index] + 4}
                    y={top}
                    width={WIDTHS[index] - 8}
                    height={Math.max(1, height)}
                    fill={ACCENT}
                    fillOpacity={0.2}
                    stroke={ACCENT}
                    strokeWidth={1.3}
                  />
                )
              })}
            </g>
          )}

          {metric === 'check' && (
            <g>
              <rect x={X0} y={282} width={302} height={20} rx={4} fill="#f2f5fa" stroke={GRID} strokeWidth={1} />
              {SEGMENTS.map((segment, index) => (
                <rect
                  key={`stack-${segment.id}`}
                  x={stackX[index]}
                  y={282}
                  width={stackHeights[index]}
                  height={20}
                  fill={index === 0 ? ACCENT : index === 1 ? LOAD : OK}
                  fillOpacity={0.28}
                  stroke={index === 0 ? ACCENT : index === 1 ? LOAD : OK}
                  strokeWidth={1.2}
                />
              ))}
            </g>
          )}

          {SEGMENTS.map((segment, index) => (
            <text
              key={`seg-${segment.id}`}
              x={MID[index]}
              y={BAR_TOP + 19}
              textAnchor="middle"
              fontSize={11}
              fontWeight={700}
              fill={ACCENT}
            >
              {segment.id}
            </text>
          ))}

          <text x={X0 - 20} y={114} textAnchor="middle" fontSize={9} fontWeight={700} fill={LOAD}>
            P₁ = 5 kN
          </text>
          <text x={NODES[1] + 24} y={132} textAnchor="middle" fontSize={9} fontWeight={700} fill={LOAD}>
            P₂ = 3 kN
          </text>
          <text x={NODES[2] - 24} y={114} textAnchor="middle" fontSize={9} fontWeight={700} fill={LOAD}>
            P₃ = 10 kN
          </text>
          <text x={X1 + 20} y={132} textAnchor="middle" fontSize={9} fontWeight={700} fill={LOAD}>
            P₄ = 12 kN
          </text>

          <text x={MID[0]} y={218} textAnchor="middle" fontSize={8.5} fill={MUTED}>
            100 mm
          </text>
          <text x={MID[1]} y={218} textAnchor="middle" fontSize={8.5} fill={MUTED}>
            300 mm
          </text>
          <text x={MID[2]} y={218} textAnchor="middle" fontSize={8.5} fill={MUTED}>
            200 mm
          </text>

          <text x={40} y={236} fontSize={8.5} fill={MUTED}>
            x [mm]
          </text>
          <text x={X0} y={236} textAnchor="middle" fontSize={8.5} fill={MUTED}>
            0
          </text>
          <text x={NODES[1]} y={236} textAnchor="middle" fontSize={8.5} fill={MUTED}>
            100
          </text>
          <text x={NODES[2]} y={236} textAnchor="middle" fontSize={8.5} fill={MUTED}>
            400
          </text>
          <text x={NODES[3]} y={236} textAnchor="middle" fontSize={8.5} fill={MUTED}>
            600
          </text>

          {metric === 'data' && (
            <g>
              <text x={50} y={270} fontSize={9} fill={INK}>
                E = 75 GPa = 75 000 MPa, A = 120 mm²
              </text>
              <text x={50} y={288} fontSize={9} fill={INK}>
                L₁ = 100 mm, L₂ = 300 mm, L₃ = 200 mm
              </text>
              <text x={50} y={306} fontSize={9} fill={INK}>
                rozciąganie: N &gt; 0, ściskanie: N &lt; 0
              </text>
              <text x={50} y={324} fontSize={9} fill={INK}>
                P₁ = 5 kN, P₂ = 3 kN, P₃ = 10 kN, P₄ = 12 kN
              </text>
            </g>
          )}

          {metric === 'equilibrium' && (
            <g>
              <text x={230} y={276} textAnchor="middle" fontSize={10} fontWeight={700} fill={INK}>
                −P₁ + P₂ − P₃ + P₄ = 0
              </text>
              <text x={230} y={298} textAnchor="middle" fontSize={9} fill={MUTED}>
                −5 kN + 3 kN − 10 kN + 12 kN = 0
              </text>
            </g>
          )}

          {sectionIndex >= 0 && (
            <g>
              <text x={50} y={266} fontSize={10} fontWeight={700} fill={ACCENT}>
                N{sectionIndex + 1} = +{SEGMENTS[sectionIndex].n} N (rozciąganie)
              </text>
              <text x={50} y={286} fontSize={9} fill={INK}>
                ΔL{sectionIndex + 1} = {SEGMENTS[sectionIndex].deltaL.toFixed(4).replace('.', ',')} mm
              </text>
            </g>
          )}

          {metric === 'normal' && (
            <g>
              <text x={230} y={252} textAnchor="middle" fontSize={9} fontWeight={700} fill={INK}>
                ΣΔL = 0,0556 + 0,0667 + 0,2667 = 0,3889 mm
              </text>
              {SEGMENTS.map((segment, index) => {
                const height = normalBarHeight(segment.n)
                return (
                  <text
                    key={`nlabel-${segment.id}`}
                    x={MID[index]}
                    y={322 - height - 6}
                    textAnchor="middle"
                    fontSize={8.5}
                    fontWeight={700}
                    fill={ACCENT}
                  >
                    N{index + 1} = {segment.n / 1000} kN
                  </text>
                )
              })}
              <text x={48} y={300} fontSize={8.5} fill={MUTED}>
                N [kN]
              </text>
            </g>
          )}

          {metric === 'check' && (
            <g>
              <text x={230} y={262} textAnchor="middle" fontSize={9} fontWeight={700} fill={INK}>
                ΔL = 0,3889 mm (wydłużenie)
              </text>
              <text x={MID[0]} y={296} textAnchor="middle" fontSize={8} fill={ACCENT}>
                ΔL₁
              </text>
              <text x={(stackX[1] + stackX[2]) / 2} y={296} textAnchor="middle" fontSize={8} fill={LOAD}>
                ΔL₂
              </text>
              <text x={(stackX[2] + stackX[3]) / 2} y={296} textAnchor="middle" fontSize={8} fill={OK}>
                ΔL₃
              </text>
              <text x={MID[0]} y={318} textAnchor="middle" fontSize={8.5} fill={INK}>
                0,0556
              </text>
              <text x={stackX[1] + stackHeights[1] / 2} y={318} textAnchor="middle" fontSize={8.5} fill={INK}>
                0,0667
              </text>
              <text x={stackX[2] + stackHeights[2] / 2} y={318} textAnchor="middle" fontSize={8.5} fill={INK}>
                0,2667
              </text>
              <text x={230} y={336} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                N·mm / (MPa·mm²) = mm; ΔL &gt; 0 oznacza wydłużenie
              </text>
            </g>
          )}
        </svg>
      </div>
    </div>
  )
}

export function createAxialElongationAnimation(config: AxialElongationInputs): ComponentType<SolutionAnimationProps> {
  return function AxialElongationAnimation(props: SolutionAnimationProps) {
    return <AxialElongationAnimationScene {...props} />
  }
}
