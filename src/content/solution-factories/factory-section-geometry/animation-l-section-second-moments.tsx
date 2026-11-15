import type { ComponentType } from 'react'
import type { SolutionAnimationProps } from '../../../types'
import type { LSectionSecondMomentsInputs } from './factory'
import { local } from '../../../components/solution-figures/shared'

const BLUE = '#4f6df5'
const ORANGE = '#ff6b45'
const GREEN = '#2f7d5b'
const INK = '#17202a'
const MUTED = '#87929d'
const STROKE = '#7d8fa5'

const A = 22
const OX = 90
const OY = 286
const LEG_R = 112
const FOOT_R = 200
const FOOT_T = 264
const TOP = 110
const CX = OX + (4 * A) / 3
const CY = OY - (17 * A) / 6
const C1X = OX + A / 2
const C1Y = OY - 4.5 * A
const C2X = OX + 2.5 * A
const C2Y = OY - 0.5 * A
const L_PATH = `M ${OX} ${OY} L ${FOOT_R} ${OY} L ${FOOT_R} ${FOOT_T} L ${LEG_R} ${FOOT_T} L ${LEG_R} ${TOP} L ${OX} ${TOP} Z`

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

function LSectionSecondMomentsAnimationScene({ scene, index, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const p = playing ? smooth(clamp01(sceneProgress)) : 1
  const reveal = playing ? smooth(ramp(sceneProgress, 0, 0.28)) : 1
  const split = index === 1 ? 1 : 0

  return (
    <div className={local('figure')} data-metric={metric}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 340"
          role="img"
          aria-label="Przekrój L z podziałem na prostokąty, środkiem ciężkości i osiami centralnymi"
        >
          {index === 1 ? (
            <>
              <g transform={`translate(${-5 * p} ${-4 * p})`}>
                <rect
                  x={OX}
                  y={TOP}
                  width={LEG_R - OX}
                  height={FOOT_T - TOP}
                  fill="#dce8f7"
                  stroke={BLUE}
                  strokeWidth={1.5}
                />
              </g>
              <g transform={`translate(${6 * p} ${4 * p})`}>
                <rect
                  x={OX}
                  y={FOOT_T}
                  width={FOOT_R - OX}
                  height={A}
                  fill="#ffe7de"
                  stroke={ORANGE}
                  strokeWidth={1.5}
                />
              </g>
            </>
          ) : (
            <path d={L_PATH} fill="#dce8f7" stroke={BLUE} strokeWidth={1.6} />
          )}

          {index === 0 && (
            <g opacity={reveal}>
              <line x1={72} y1={OY} x2={232} y2={OY} stroke={STROKE} strokeWidth={1.2} />
              <line x1={OX} y1={300} x2={OX} y2={96} stroke={STROKE} strokeWidth={1.2} />
              <line x1={OX} y1={94} x2={OX} y2={84} stroke={STROKE} strokeWidth={1.2} />
              <line x1={64} y1={TOP} x2={64} y2={OY} stroke={STROKE} strokeWidth={1} />
              <line x1={59} y1={TOP} x2={69} y2={TOP} stroke={STROKE} strokeWidth={1} />
              <line x1={59} y1={OY} x2={69} y2={OY} stroke={STROKE} strokeWidth={1} />
              <line x1={OX} y1={302} x2={FOOT_R} y2={302} stroke={STROKE} strokeWidth={1} />
              <line x1={OX} y1={297} x2={OX} y2={307} stroke={STROKE} strokeWidth={1} />
              <line x1={FOOT_R} y1={297} x2={FOOT_R} y2={307} stroke={STROKE} strokeWidth={1} />
              <line x1={OX} y1={100} x2={LEG_R} y2={100} stroke={STROKE} strokeWidth={1} />
              <line x1={OX} y1={95} x2={OX} y2={105} stroke={STROKE} strokeWidth={1} />
              <line x1={LEG_R} y1={95} x2={LEG_R} y2={105} stroke={STROKE} strokeWidth={1} />
              <line x1={214} y1={FOOT_T} x2={214} y2={OY} stroke={STROKE} strokeWidth={1} />
              <line x1={209} y1={FOOT_T} x2={219} y2={FOOT_T} stroke={STROKE} strokeWidth={1} />
              <line x1={209} y1={OY} x2={219} y2={OY} stroke={STROKE} strokeWidth={1} />
              <text x={58} y={200} textAnchor="end" fontSize={9.5} fontWeight={600} fill={INK}>
                8a
              </text>
              <text x={145} y={314} textAnchor="middle" fontSize={9.5} fontWeight={600} fill={INK}>
                5a
              </text>
              <text x={101} y={94} textAnchor="middle" fontSize={9.5} fontWeight={600} fill={INK}>
                a
              </text>
              <text x={220} y={278} fontSize={9.5} fontWeight={600} fill={INK}>
                a
              </text>
              <text x={236} y={290} fontSize={10} fontWeight={700} fill={MUTED}>
                x
              </text>
              <text x={84} y={92} textAnchor="end" fontSize={10} fontWeight={700} fill={MUTED}>
                y
              </text>
              <text x={82} y={300} textAnchor="end" fontSize={10} fontWeight={700} fill={INK}>
                O
              </text>
            </g>
          )}

          {index >= 2 && (
            <g opacity={reveal}>
              <line x1={60} y1={CY} x2={230} y2={CY} stroke={GREEN} strokeWidth={1.4} strokeDasharray="7 4" />
              <line x1={CX} y1={95} x2={CX} y2={310} stroke={GREEN} strokeWidth={1.4} strokeDasharray="7 4" />
              <text x={64} y={218} fontSize={9.5} fontWeight={700} fill={GREEN}>
                x_c
              </text>
              <text x={130} y={306} fontSize={9.5} fontWeight={700} fill={GREEN}>
                y_c
              </text>
            </g>
          )}

          {index === 1 && (
            <g opacity={reveal}>
              <line x1={112} y1={180} x2={126} y2={172} stroke={STROKE} strokeWidth={1} />
              <line x1={145} y1={254} x2={148} y2={266} stroke={STROKE} strokeWidth={1} />
              <text x={130} y={170} fontSize={9.5} fontWeight={600} fill={BLUE}>
                7a × a, A₁ = 7a²
              </text>
              <text x={140} y={250} fontSize={9.5} fontWeight={600} fill={ORANGE}>
                5a × a, A₂ = 5a²
              </text>
              <Card
                x={250}
                y={60}
                width={190}
                height={90}
                title="Pola części"
                lines={['A₁ = 7a · a = 7a²', 'A₂ = 5a · a = 5a²', 'A = 12a²']}
              />
            </g>
          )}

          {index === 2 && (
            <g opacity={reveal}>
              <line x1={106} y1={185} x2={126} y2={182} stroke={GREEN} strokeWidth={1} />
              <line x1={150} y1={272} x2={206} y2={260} stroke={GREEN} strokeWidth={1} />
              <circle cx={C1X} cy={C1Y} r={4} fill={GREEN} />
              <circle cx={C2X} cy={C2Y} r={4} fill={GREEN} />
              <circle cx={CX} cy={CY} r={5.5} fill={GREEN} stroke="#fff" strokeWidth={1.5} />
              <text x={130} y={180} fontSize={9.5} fontWeight={700} fill={GREEN}>
                C₁ (a/2; 4,5a)
              </text>
              <text x={210} y={258} fontSize={9.5} fontWeight={700} fill={GREEN}>
                C₂ (2,5a; 0,5a)
              </text>
              <text x={130} y={242} fontSize={9.5} fontWeight={700} fill={GREEN}>
                C (4a/3; 17a/6)
              </text>
              <Card
                x={250}
                y={50}
                width={190}
                height={100}
                title="Środek ciężkości"
                lines={['x_C = 4a/3 ≈ 1,333a', 'y_C = 17a/6 ≈ 2,833a', 'A = 12a²']}
                color={GREEN}
              />
            </g>
          )}

          {index === 3 && (
            <g opacity={reveal}>
              <rect x={OX} y={C1Y - 5} width={A} height={10} fill={BLUE} opacity={0.22} />
              <rect x={OX} y={C2Y - 5} width={FOOT_R - OX} height={10} fill={ORANGE} opacity={0.22} />
              <line x1={60} y1={C1Y} x2={60} y2={C2Y} stroke={STROKE} strokeWidth={1} />
              <line x1={55} y1={C1Y} x2={65} y2={C1Y} stroke={STROKE} strokeWidth={1} />
              <line x1={55} y1={CY} x2={65} y2={CY} stroke={STROKE} strokeWidth={1} />
              <line x1={55} y1={C2Y} x2={65} y2={C2Y} stroke={STROKE} strokeWidth={1} />
              <circle cx={C1X} cy={C1Y} r={4} fill={GREEN} />
              <circle cx={C2X} cy={C2Y} r={4} fill={GREEN} />
              <circle cx={CX} cy={CY} r={5} fill={GREEN} stroke="#fff" strokeWidth={1.4} />
              <text x={54} y={203} textAnchor="end" fontSize={9} fontWeight={600} fill={BLUE}>
                5a/3
              </text>
              <text x={54} y={255} textAnchor="end" fontSize={9} fontWeight={600} fill={ORANGE}>
                7a/3
              </text>
              <Card
                x={250}
                y={44}
                width={195}
                height={130}
                title="I_x względem x_c"
                lines={[
                  'I_x = Σ [I⁰ + A d_y²]',
                  'pas: 343a⁴/12 + 175a⁴/9',
                  'stopa: 5a⁴/12 + 245a⁴/9',
                  'd_y1 = 5a/3, d_y2 = 7a/3',
                ]}
              />
            </g>
          )}

          {index === 4 && (
            <g opacity={reveal}>
              <line x1={60} y1={C1Y} x2={60} y2={C2Y} stroke={STROKE} strokeWidth={1} />
              <line x1={55} y1={C1Y} x2={65} y2={C1Y} stroke={STROKE} strokeWidth={1} />
              <line x1={55} y1={CY} x2={65} y2={CY} stroke={STROKE} strokeWidth={1} />
              <line x1={55} y1={C2Y} x2={65} y2={C2Y} stroke={STROKE} strokeWidth={1} />
              <circle cx={CX} cy={CY} r={5} fill={GREEN} stroke="#fff" strokeWidth={1.4} />
              <text x={54} y={203} textAnchor="end" fontSize={9} fontWeight={600} fill={BLUE}>
                5a/3
              </text>
              <text x={54} y={255} textAnchor="end" fontSize={9} fontWeight={600} fill={ORANGE}>
                7a/3
              </text>
              <Card
                x={250}
                y={44}
                width={195}
                height={126}
                title="Wynik I_x"
                lines={['343/12 + 175/9 = 48,03', '5/12 + 245/9 = 27,64', 'I_x = 227a⁴/3', 'I_x ≈ 75,67a⁴']}
                color={ORANGE}
              />
              <text x={347} y={190} textAnchor="middle" fontSize={11} fontWeight={700} fill={ORANGE}>
                I_x = 227a⁴/3 ≈ 75,67a⁴
              </text>
            </g>
          )}

          {index === 5 && (
            <g opacity={reveal}>
              <line x1={C1X} y1={100} x2={C2X} y2={100} stroke={STROKE} strokeWidth={1} />
              <line x1={C1X} y1={95} x2={C1X} y2={105} stroke={STROKE} strokeWidth={1} />
              <line x1={CX} y1={95} x2={CX} y2={105} stroke={STROKE} strokeWidth={1} />
              <line x1={C2X} y1={95} x2={C2X} y2={105} stroke={STROKE} strokeWidth={1} />
              <circle cx={C1X} cy={C1Y} r={4} fill={GREEN} />
              <circle cx={C2X} cy={C2Y} r={4} fill={GREEN} />
              <circle cx={CX} cy={CY} r={5} fill={GREEN} stroke="#fff" strokeWidth={1.4} />
              <text x={101} y={92} textAnchor="middle" fontSize={9} fontWeight={600} fill={BLUE}>
                5a/6
              </text>
              <text x={145} y={92} textAnchor="middle" fontSize={9} fontWeight={600} fill={ORANGE}>
                7a/6
              </text>
              <Card
                x={250}
                y={40}
                width={195}
                height={150}
                title="I_y względem y_c"
                lines={[
                  'I_y = Σ [I⁰ + A d_x²]',
                  'pas: 7a⁴/12 + 175a⁴/36',
                  'stopa: 125a⁴/12 + 245a⁴/36',
                  'd_x1 = 5a/6, d_x2 = 7a/6',
                  'I_y = 68a⁴/3 ≈ 22,67a⁴',
                ]}
                color={BLUE}
              />
              <text x={347} y={215} textAnchor="middle" fontSize={11} fontWeight={700} fill={BLUE}>
                I_y ≈ 22,67a⁴
              </text>
            </g>
          )}

          {index === 6 && (
            <g opacity={reveal}>
              <line x1={CX} y1={CY} x2={C1X} y2={C1Y} stroke={MUTED} strokeWidth={1} strokeDasharray="4 3" />
              <line x1={CX} y1={CY} x2={C2X} y2={C2Y} stroke={MUTED} strokeWidth={1} strokeDasharray="4 3" />
              <circle cx={C1X} cy={C1Y} r={4} fill={GREEN} />
              <circle cx={C2X} cy={C2Y} r={4} fill={GREEN} />
              <circle cx={CX} cy={CY} r={5} fill={GREEN} stroke="#fff" strokeWidth={1.4} />
              <Card
                x={250}
                y={44}
                width={195}
                height={150}
                title="Moment I_xy względem osi centralnych"
                lines={[
                  'I_xy = Σ A d_x d_y',
                  'pas: 7(−5/6)(5/3)a⁴ = −175a⁴/18',
                  'stopa: 5(7/6)(−7/3)a⁴ = −245a⁴/18',
                  'I_xy = −70a⁴/3 ≈ −23,33a⁴',
                ]}
                color={ORANGE}
              />
              <text x={347} y={215} textAnchor="middle" fontSize={11} fontWeight={700} fill={ORANGE}>
                I_xy ≈ −23,33a⁴
              </text>
            </g>
          )}

          {index === 7 && (
            <g opacity={reveal}>
              <line x1={72} y1={OY} x2={232} y2={OY} stroke={STROKE} strokeWidth={1.1} />
              <line x1={OX} y1={300} x2={OX} y2={96} stroke={STROKE} strokeWidth={1.1} />
              <line x1={OX} y1={94} x2={OX} y2={84} stroke={STROKE} strokeWidth={1.1} />
              <circle cx={CX} cy={CY} r={5} fill={GREEN} stroke="#fff" strokeWidth={1.4} />
              <text x={236} y={290} fontSize={10} fontWeight={700} fill={MUTED}>
                x
              </text>
              <text x={84} y={92} textAnchor="end" fontSize={10} fontWeight={700} fill={MUTED}>
                y
              </text>
              <text x={82} y={300} textAnchor="end" fontSize={10} fontWeight={700} fill={INK}>
                O
              </text>
              <Card
                x={246}
                y={40}
                width={199}
                height={170}
                title="Kontrola względem osi O"
                lines={[
                  'I_x^O = (517−1)a⁴/3 = 516a⁴/3 = 172a⁴',
                  'I_y^O = (133−1)a⁴/3 = 132a⁴/3 = 44a⁴',
                  'I_xy^O = 22a⁴',
                  'I_x = 516/3 − 12(17/6)² = 227/3',
                  'I_y = 132/3 − 12(4/3)² = 68/3',
                  'I_xy = 22 − 12(4/3)(17/6) = −70/3',
                  'I₁ ≈ 84,48a⁴, I₂ ≈ 13,86a⁴',
                ]}
                color={GREEN}
              />
              <text x={246} y={232} fontSize={10} fontWeight={700} fill={GREEN}>
                kontrola się zgadza
              </text>
            </g>
          )}
        </svg>
      </div>
    </div>
  )
}

export function createLSectionSecondMomentsAnimation(
  config: LSectionSecondMomentsInputs,
): ComponentType<SolutionAnimationProps> {
  return function LSectionSecondMomentsAnimation(props: SolutionAnimationProps) {
    return <LSectionSecondMomentsAnimationScene {...props} />
  }
}
