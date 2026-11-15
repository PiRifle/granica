import type { ComponentType } from 'react'
import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import type { AxialStressStateInputs } from './factory'
import { local } from '../../../components/solution-figures/shared'

const BLUE = '#4f6df5'
const ORANGE = '#ff6b45'
const GREEN = '#2f7d5b'
const PURPLE = '#a970dd'
const INK = '#17202a'
const MUTED = '#87929d'
const STROKE = '#7d8fa5'

const BAR_X0 = 48
const BAR_X1 = 228
const BAR_T = 52
const BAR_B = 96
const BAR_M = 74
const EX = 120
const EY = 200
const EH = 38
const MCX = 330
const MCY = 195
const MR = 90

const xOf = (sigma: number) => 240 + sigma * 0.36

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

function StressElement({ planeAngle, showShearLabels }: { planeAngle: number; showShearLabels: boolean }) {
  return (
    <g>
      <rect x={EX - EH} y={EY - EH} width={EH * 2} height={EH * 2} fill="#f2f6fc" stroke={STROKE} strokeWidth={1.4} />
      <line x1={EX - 50} y1={EY} x2={EX + 50} y2={EY} stroke={MUTED} strokeWidth={1} strokeDasharray="5 4" />
      <line x1={EX} y1={EY - 50} x2={EX} y2={EY + 50} stroke={MUTED} strokeWidth={1} strokeDasharray="5 4" />
      <line x1={EX - EH} y1={EY} x2={EX - 56} y2={EY} stroke={ORANGE} strokeWidth={2.2} />
      <line x1={EX + EH} y1={EY} x2={EX + 56} y2={EY} stroke={ORANGE} strokeWidth={2.2} />
      <polygon points={`${EX - 56},${EY} ${EX - 50},${EY - 4} ${EX - 50},${EY + 4}`} fill={ORANGE} />
      <polygon points={`${EX + 56},${EY} ${EX + 50},${EY - 4} ${EX + 50},${EY + 4}`} fill={ORANGE} />
      {planeAngle > 0.01 && (
        <g transform={`rotate(${planeAngle} ${EX} ${EY})`}>
          <line x1={EX} y1={EY - EH} x2={EX} y2={EY + EH} stroke={PURPLE} strokeWidth={2.2} />
        </g>
      )}
      {showShearLabels && (
        <>
          <line x1={EX} y1={EY} x2={EX + 26 * 0.707} y2={EY + 26 * 0.707} stroke={GREEN} strokeWidth={2} />
          <line x1={EX} y1={EY} x2={EX - 26 * 0.707} y2={EY + 26 * 0.707} stroke={ORANGE} strokeWidth={2} />
          <polygon points={`${EX + 18.4},${EY + 18.4} ${EX + 18},${EY + 12.6} ${EX + 12.6},${EY + 18}`} fill={GREEN} />
          <polygon points={`${EX - 18.4},${EY + 18.4} ${EX - 18},${EY + 12.6} ${EX - 12.6},${EY + 18}`} fill={ORANGE} />
        </>
      )}
      <text x={EX + 54} y={EY + 4} fontSize={9} fill={MUTED}>
        x
      </text>
      <text x={EX + 4} y={EY - 54} fontSize={9} fill={MUTED}>
        y
      </text>
    </g>
  )
}

function AxialStressStateAnimationScene({ scene, index, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const p = playing ? smooth(clamp01(sceneProgress)) : 1
  const reveal = playing ? smooth(ramp(sceneProgress, 0, 0.28)) : 1
  const labelReveal = playing ? smooth(ramp(sceneProgress, 0.68, 1)) : 1
  const planeAngle = index >= 5 ? (index === 6 ? 45 * p : 45) : 0
  const circleAngle = index === 6 ? (p * Math.PI) / 2 : Math.PI / 2
  const movingX = MCX + MR * Math.cos(circleAngle)
  const movingY = MCY - MR * Math.sin(circleAngle)

  return (
    <div className={local('figure')} data-metric={metric}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 340"
          role="img"
          aria-label="Pręt rozciągany, element naprężeń i koło Mohra dla jednoosiowego rozciągania"
        >
          <defs>
            <marker
              id="w3-axial-arrow"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill={ORANGE} />
            </marker>
          </defs>

          <rect
            x={BAR_X0}
            y={BAR_T}
            width={BAR_X1 - BAR_X0}
            height={BAR_B - BAR_T}
            fill="#dce8f7"
            stroke={BLUE}
            strokeWidth={1.4}
          />
          <line
            x1={BAR_X0}
            y1={BAR_M}
            x2={BAR_X0 - 20}
            y2={BAR_M}
            stroke={ORANGE}
            strokeWidth={2.4}
            markerEnd="url(#w3-axial-arrow)"
          />
          <line
            x1={BAR_X1}
            y1={BAR_M}
            x2={BAR_X1 + 20}
            y2={BAR_M}
            stroke={ORANGE}
            strokeWidth={2.4}
            markerEnd="url(#w3-axial-arrow)"
          />
          <text x={BAR_X0 - 16} y={64} textAnchor="middle" fontSize={9.5} fontWeight={600} fill={ORANGE}>
            P = 50 kN
          </text>
          <text x={BAR_X1 + 16} y={64} textAnchor="middle" fontSize={9.5} fontWeight={600} fill={ORANGE}>
            P = 50 kN
          </text>
          <text x={138} y={44} textAnchor="middle" fontSize={9.5} fontWeight={600} fill={INK}>
            pręt rozciągany
          </text>
          <text x={138} y={88} textAnchor="middle" fontSize={9} fill={INK}>
            A = 100 mm²
          </text>

          <g>
            <line x1={30} y1={300} x2={70} y2={300} stroke={MUTED} strokeWidth={1.2} />
            <line x1={30} y1={300} x2={30} y2={260} stroke={MUTED} strokeWidth={1.2} />
            <line x1={30} y1={300} x2={52} y2={280} stroke={MUTED} strokeWidth={1.2} />
            <text x={74} y={304} fontSize={9} fill={MUTED}>
              x
            </text>
            <text x={26} y={258} textAnchor="end" fontSize={9} fill={MUTED}>
              y
            </text>
            <text x={56} y={278} fontSize={9} fill={MUTED}>
              z
            </text>
          </g>

          <StressElement planeAngle={planeAngle} showShearLabels={index === 6} />
          <text x={EX} y={258} textAnchor="middle" fontSize={9} fontWeight={600} fill={ORANGE}>
            {index === 0 ? 'σx' : 'σx = 500 MPa'}
          </text>
          {index <= 3 && (
            <text x={EX + 56} y={180} fontSize={9} fill={MUTED}>
              σy = 0
            </text>
          )}
          {index >= 5 && (
            <text
              x={EX + 46}
              y={150}
              fontSize={9}
              fontWeight={600}
              fill={PURPLE}
              opacity={index === 6 ? labelReveal : 1}
            >
              θ = 45°
            </text>
          )}
          {index === 6 && (
            <g opacity={labelReveal}>
              <text x={EX + 46} y={184} fontSize={9} fontWeight={600} fill={GREEN}>
                σ = 250
              </text>
              <text x={EX + 46} y={222} fontSize={9} fontWeight={600} fill={ORANGE}>
                τ = 250
              </text>
            </g>
          )}

          {index <= 3 && (
            <g opacity={reveal}>
              {index === 0 && (
                <Card
                  x={250}
                  y={130}
                  width={190}
                  height={86}
                  title="Dane"
                  lines={['A = 100 mm²', 'P = 50 kN', 'rozciąganie osiowe']}
                />
              )}
              {index === 1 && (
                <Card
                  x={250}
                  y={120}
                  width={190}
                  height={104}
                  title="Naprężenie normalne"
                  lines={['σx = P / A', '= 50 000 / 100', 'σx = 500 MPa']}
                  color={ORANGE}
                />
              )}
              {index === 2 && (
                <g>
                  <rect
                    x={250}
                    y={110}
                    width={190}
                    height={150}
                    rx={8}
                    fill="#f7f9fd"
                    stroke="#d8e0ec"
                    strokeWidth={1}
                  />
                  <line x1={284} y1={152} x2={284} y2={226} stroke={INK} strokeWidth={1.2} />
                  <line x1={284} y1={152} x2={290} y2={152} stroke={INK} strokeWidth={1.2} />
                  <line x1={284} y1={226} x2={290} y2={226} stroke={INK} strokeWidth={1.2} />
                  <line x1={408} y1={152} x2={408} y2={226} stroke={INK} strokeWidth={1.2} />
                  <line x1={402} y1={152} x2={408} y2={152} stroke={INK} strokeWidth={1.2} />
                  <line x1={402} y1={226} x2={408} y2={226} stroke={INK} strokeWidth={1.2} />
                  <text x={262} y={128} fontSize={9.5} fontWeight={700} fill={BLUE}>
                    Tensor naprężeń [MPa]
                  </text>
                  <text x={300} y={166} textAnchor="middle" fontSize={10} fontWeight={600} fill={INK}>
                    500
                  </text>
                  <text x={345} y={166} textAnchor="middle" fontSize={10} fill={INK}>
                    0
                  </text>
                  <text x={390} y={166} textAnchor="middle" fontSize={10} fill={INK}>
                    0
                  </text>
                  <text x={300} y={190} textAnchor="middle" fontSize={10} fill={INK}>
                    0
                  </text>
                  <text x={345} y={190} textAnchor="middle" fontSize={10} fill={INK}>
                    0
                  </text>
                  <text x={390} y={190} textAnchor="middle" fontSize={10} fill={INK}>
                    0
                  </text>
                  <text x={300} y={214} textAnchor="middle" fontSize={10} fill={INK}>
                    0
                  </text>
                  <text x={345} y={214} textAnchor="middle" fontSize={10} fill={INK}>
                    0
                  </text>
                  <text x={390} y={214} textAnchor="middle" fontSize={10} fill={INK}>
                    0
                  </text>
                  <text x={262} y={246} fontSize={8.5} fill={MUTED}>
                    σy = σz = 0, τxy = τyz = τzx = 0
                  </text>
                </g>
              )}
              {index === 3 && (
                <Card
                  x={250}
                  y={120}
                  width={190}
                  height={110}
                  title="Naprężenia główne"
                  lines={['σ₁ = 500 MPa', 'σ₂ = σ₃ = 0 MPa', 'kierunek: oś x']}
                  color={GREEN}
                />
              )}
            </g>
          )}

          {index >= 4 && (
            <g>
              <line x1={228} y1={MCY} x2={438} y2={MCY} stroke={MUTED} strokeWidth={1.2} />
              <line x1={xOf(0)} y1={78} x2={xOf(0)} y2={315} stroke={MUTED} strokeWidth={1.1} />
              <line x1={xOf(0)} y1={191} x2={xOf(0)} y2={199} stroke={MUTED} strokeWidth={1.2} />
              <line x1={xOf(250)} y1={191} x2={xOf(250)} y2={199} stroke={MUTED} strokeWidth={1.2} />
              <line x1={xOf(500)} y1={191} x2={xOf(500)} y2={199} stroke={MUTED} strokeWidth={1.2} />
              <motion.circle
                cx={MCX}
                cy={MCY}
                r={MR}
                fill="none"
                stroke={PURPLE}
                strokeWidth={2.2}
                initial={false}
                animate={{ pathLength: p }}
                transition={{ duration: 0.2, ease: 'linear' }}
              />
              <circle cx={MCX} cy={MCY} r={4} fill={PURPLE} />
              <line x1={MCX} y1={MCY} x2={MCX} y2={MCY - MR} stroke={PURPLE} strokeWidth={1.4} strokeDasharray="5 3" />
              {index === 5 && <circle cx={MCX} cy={MCY - MR} r={4.5} fill={ORANGE} opacity={reveal} />}
              {index === 6 && (
                <motion.circle
                  cx={movingX}
                  cy={movingY}
                  r={4.5}
                  fill={GREEN}
                  initial={false}
                  animate={{ cx: movingX, cy: movingY }}
                  transition={{ duration: 0.1 }}
                />
              )}
              {index === 7 && (
                <g opacity={reveal}>
                  <circle cx={MCX} cy={MCY - MR} r={4.5} fill={ORANGE} />
                  <circle cx={MCX} cy={MCY + MR} r={4.5} fill={BLUE} />
                </g>
              )}

              <text x={246} y={86} fontSize={10} fontWeight={700} fill={MUTED}>
                τ
              </text>
              <text x={438} y={260} textAnchor="end" fontSize={9.5} fontWeight={600} fill={MUTED}>
                σ [MPa]
              </text>
              <text x={xOf(0) - 6} y={210} textAnchor="end" fontSize={8.5} fill={MUTED}>
                0
              </text>
              <text x={xOf(500) + 6} y={210} fontSize={8.5} fill={MUTED}>
                500
              </text>
              <text x={338} y={210} fontSize={9.5} fontWeight={700} fill={PURPLE}>
                C = 250
              </text>
              <text x={338} y={145} fontSize={9} fontWeight={600} fill={PURPLE}>
                R = 250
              </text>
              <text x={338} y={168} fontSize={9} fill={MUTED}>
                2θ = 90°
              </text>

              {index === 5 && (
                <text x={360} y={98} fontSize={9.5} fontWeight={700} fill={ORANGE} opacity={reveal}>
                  τmax = 250 MPa
                </text>
              )}

              {index === 6 && (
                <g>
                  <line
                    x1={MCX}
                    y1={MCY}
                    x2={movingX}
                    y2={movingY}
                    stroke={GREEN}
                    strokeWidth={1.4}
                    strokeDasharray="4 3"
                  />
                  <text x={360} y={98} fontSize={9.5} fontWeight={700} fill={ORANGE}>
                    τmax = 250 MPa
                  </text>
                </g>
              )}

              {index === 7 && (
                <g opacity={reveal}>
                  <text x={350} y={100} fontSize={9} fontWeight={600} fill={ORANGE}>
                    +45°: τ = +250
                  </text>
                  <text x={350} y={302} fontSize={9} fontWeight={600} fill={BLUE}>
                    −45°: τ = −250
                  </text>
                  <text x={230} y={325} textAnchor="middle" fontSize={9} fontWeight={600} fill={GREEN}>
                    σ₁ + σ₂ + σ₃ = 500 MPa = σx
                  </text>
                </g>
              )}
            </g>
          )}
        </svg>
      </div>
    </div>
  )
}

export function createAxialStressStateAnimation(config: AxialStressStateInputs): ComponentType<SolutionAnimationProps> {
  return function AxialStressStateAnimation(props: SolutionAnimationProps) {
    return <AxialStressStateAnimationScene {...props} />
  }
}
