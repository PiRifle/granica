import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const BLUE = '#4f6df5'
const ORANGE = '#ff6b45'
const VIOLET = '#a970dd'
const GREEN = '#2e9e6b'
const MUTED = '#87929d'
const EDGE = '#68727e'
const INK = '#17202a'
const LIGHT = '#dfe6f2'

const X0 = 60
const X1 = 430
const BEAM_Y = 112

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}

const quadraticPoint = (t: number, sag: number) => {
  const x = (1 - t) * (1 - t) * 55 + 2 * (1 - t) * t * 245 + t * t * 435
  const y = (1 - t) * (1 - t) * 140 + 2 * (1 - t) * t * (140 + sag) + t * t * 140
  return [x, y] as const
}

const quadraticTangent = (t: number, sag: number) => {
  const dx = 2 * (1 - t) * (245 - 55) + 2 * t * (435 - 245)
  const dy = 2 * (1 - t) * sag + 2 * t * -sag
  return [dx, dy] as const
}

function Support({ x, y, label }: { x: number; y: number; label: string }) {
  return (
    <g>
      <path d={`M ${x - 10} ${y + 16} L ${x} ${y + 2} L ${x + 10} ${y + 16} Z`} fill={EDGE} />
      <text x={x} y={y + 30} textAnchor="middle" fontSize={9} fill={EDGE}>
        {label}
      </text>
    </g>
  )
}

function EndMoment({ x, y, label, direction }: { x: number; y: number; label: string; direction: 1 | -1 }) {
  return (
    <g stroke={VIOLET} fill={VIOLET}>
      <path
        d={`M ${x - direction * 20} ${y - 18} A 19 19 0 1 ${direction > 0 ? 1 : 0} ${x + direction * 20} ${y - 18}`}
        fill="none"
        strokeWidth={2.2}
      />
      <path
        d={`M ${x + direction * 12} ${y - 28} L ${x + direction * 21} ${y - 18} L ${x + direction * 10} ${y - 14}`}
        strokeWidth={2.2}
      />
      {label && (
        <text x={x} y={y - 46} textAnchor="middle" fontSize={9} stroke="none">
          {label}
        </text>
      )}
    </g>
  )
}

function Dimension({ x1, x2, y, label }: { x1: number; x2: number; y: number; label: string }) {
  return (
    <g stroke={MUTED} fill={MUTED}>
      <line x1={x1} y1={y} x2={x2} y2={y} strokeWidth={1} />
      <line x1={x1} y1={y - 4} x2={x1} y2={y + 4} strokeWidth={1} />
      <line x1={x2} y1={y - 4} x2={x2} y2={y + 4} strokeWidth={1} />
      <text x={(x1 + x2) / 2} y={y - 5} textAnchor="middle" fontSize={9} stroke="none">
        {label}
      </text>
    </g>
  )
}

export function PureBendingExample2Animation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const p = playing ? smooth(sceneProgress) : 1
  const isModel = metric === 'model'
  const isForces = metric === 'forces'
  const isCurvature = metric === 'curvature'
  const isStress = metric === 'stress'
  const isRotate = metric === 'rotate'

  const sag = 24 * p
  const tickLevels = [0, 0.2, 0.4, 0.6, 0.8, 1]
  const sectionCx = 150
  const sectionCy = 156
  const sectionWidth = 70
  const sectionHeight = 140
  const stressAxis = 320
  const stressLevels = Array.from({ length: 9 }, (_, level) => 86 + (level * 140) / 8)
  const rotateAngle = 90 * p
  const rotateStress = 96 + 96 * p
  const rotatePeak = 34 + 34 * p

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 300"
          role="img"
          aria-label="Belka obciążona momentami na końcach. Animacja pokazuje stały moment, stałą krzywiznę, liniowy rozkład naprężeń oraz wpływ obrotu przekroju o 90 stopni."
        >
          <defs>
            <marker
              id="bp2-radius"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={VIOLET} />
            </marker>
            <marker
              id="bp2-y"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={MUTED} />
            </marker>
          </defs>

          <text x={14} y={20} fontSize={9} fill={MUTED}>
            M = 8 kN·m · L = 4 m
          </text>
          <text x={14} y={34} fontSize={9} fill={MUTED}>
            b×h = 50×100 mm
          </text>
          <text x={14} y={48} fontSize={9} fill={MUTED}>
            E = 210 GPa
          </text>

          {isModel && (
            <g>
              <line x1={X0} y1={BEAM_Y} x2={X1} y2={BEAM_Y} stroke={EDGE} strokeWidth={5} strokeLinecap="round" />
              <Support x={X0} y={BEAM_Y} label="A" />
              <Support x={X1} y={BEAM_Y} label="B" />
              <EndMoment x={X0} y={BEAM_Y} label="M = 8 kN·m" direction={1} />
              <EndMoment x={X1} y={BEAM_Y} label="M = 8 kN·m" direction={-1} />
              <Dimension x1={X0} x2={X1} y={166} label="L = 4 m" />
              <text x={245} y={196} textAnchor="middle" fontSize={9} fill={MUTED}>
                brak sił poprzecznych: R_A = R_B = 0
              </text>
              <g>
                <rect x={362} y={194} width={50} height={100} fill={LIGHT} stroke={EDGE} strokeWidth={1.3} />
                <line x1={354} y1={244} x2={420} y2={244} stroke={INK} strokeWidth={1} strokeDasharray="5 4" />
                <text x={387} y={290} textAnchor="middle" fontSize={9} fill={MUTED}>
                  b = 50 mm
                </text>
                <text x={417} y={190} textAnchor="middle" fontSize={9} fill={MUTED}>
                  h = 100 mm
                </text>
              </g>
            </g>
          )}

          {isForces && (
            <g>
              <line x1={X0} y1={86} x2={X1} y2={86} stroke={EDGE} strokeWidth={5} strokeLinecap="round" />
              <Support x={X0} y={86} label="A" />
              <Support x={X1} y={86} label="B" />
              <EndMoment x={X0} y={86} label="" direction={1} />
              <EndMoment x={X1} y={86} label="" direction={-1} />

              <motion.rect
                x={X0}
                y={110}
                width={X1 - X0}
                height={184}
                fill={GREEN}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.07 }}
                transition={{ duration: 0.4 }}
              />
              <text x={245} y={126} textAnchor="middle" fontSize={10} fontWeight={600} fill={GREEN}>
                czyste zginanie na całej długości
              </text>

              <line x1={X0} y1={168} x2={X1} y2={168} stroke="#c9d0d9" strokeWidth={1} />
              <text x={18} y={146} fontSize={10} fontWeight={700} fill={BLUE}>
                T
              </text>
              <motion.path
                d={`M ${X0} 168 L ${X1} 168`}
                fill="none"
                stroke={BLUE}
                strokeWidth={2.6}
                initial={{ pathLength: 0, opacity: 0.3 }}
                animate={{ pathLength: p, opacity: 1 }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <text x={245} y={158} textAnchor="middle" fontSize={9} fill={BLUE}>
                T = 0
              </text>

              <line x1={X0} y1={268} x2={X1} y2={268} stroke="#c9d0d9" strokeWidth={1} />
              <text x={18} y={246} fontSize={10} fontWeight={700} fill={ORANGE}>
                M
              </text>
              <motion.path
                d={`M ${X0} 268 L ${X0} 242 L ${X1} 242`}
                fill="none"
                stroke={ORANGE}
                strokeWidth={2.6}
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0.3 }}
                animate={{ pathLength: p, opacity: 1 }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <text x={245} y={232} textAnchor="middle" fontSize={9} fill={ORANGE}>
                M = 8 kN·m
              </text>
            </g>
          )}

          {isCurvature && (
            <g>
              <line x1={55} y1={140} x2={435} y2={140} stroke="#c9d0d9" strokeDasharray="6 5" strokeWidth={1} />
              <path
                d={`M 55 128 Q 245 ${128 + sag} 435 128`}
                fill="none"
                stroke={BLUE}
                strokeWidth={3}
                strokeLinecap="round"
              />
              <path
                d={`M 55 152 Q 245 ${152 + sag} 435 152`}
                fill="none"
                stroke={ORANGE}
                strokeWidth={3}
                strokeLinecap="round"
              />
              <path
                d={`M 55 140 Q 245 ${140 + sag} 435 140`}
                fill="none"
                stroke={INK}
                strokeWidth={2.2}
                strokeDasharray="6 5"
              />
              {tickLevels.map((t) => {
                const [px, py] = quadraticPoint(t, sag)
                const [tx, ty] = quadraticTangent(t, sag)
                const length = Math.hypot(tx, ty)
                const nx = -ty / length
                const ny = tx / length
                return (
                  <line
                    key={t}
                    x1={px - nx * 13}
                    y1={py - ny * 13}
                    x2={px + nx * 13}
                    y2={py + ny * 13}
                    stroke={EDGE}
                    strokeWidth={2}
                    opacity={0.35 + 0.65 * p}
                  />
                )
              })}
              <text x={355} y={112} fontSize={9} fill={BLUE}>
                góra – ściskanie
              </text>
              <text x={355} y={188} fontSize={9} fill={ORANGE}>
                dół – rozciąganie
              </text>
              <line
                x1={245}
                y1={140 + sag}
                x2={245}
                y2={252}
                stroke={VIOLET}
                strokeWidth={1.3}
                strokeDasharray="4 4"
                markerEnd="url(#bp2-radius)"
              />
              <text x={253} y={244} fontSize={9} fill={VIOLET}>
                ρ ≈ 109 m
              </text>
              <text x={66} y={238} fontSize={9} fill={MUTED}>
                stała krzywizna κ = 1/ρ
              </text>
            </g>
          )}

          {isStress && (
            <g>
              <rect
                x={sectionCx - sectionWidth / 2}
                y={sectionCy - sectionHeight / 2}
                width={sectionWidth}
                height={sectionHeight}
                fill="#eef3fa"
                stroke={EDGE}
                strokeWidth={1.4}
              />
              <line
                x1={sectionCx - 58}
                y1={sectionCy}
                x2={sectionCx + 58}
                y2={sectionCy}
                stroke={INK}
                strokeWidth={1}
                strokeDasharray="6 5"
              />
              <text x={sectionCx - 54} y={sectionCy - 6} fontSize={9} fill={MUTED}>
                oś obojętna
              </text>
              <line
                x1={sectionCx + 26}
                y1={sectionCy + 4}
                x2={sectionCx + 26}
                y2={sectionCy + 82}
                stroke={MUTED}
                strokeWidth={1.2}
                markerEnd="url(#bp2-y)"
              />
              <text x={sectionCx + 32} y={sectionCy + 80} fontSize={9} fill={MUTED}>
                y
              </text>
              <text x={sectionCx - 54} y={sectionCy - sectionHeight / 2 - 8} fontSize={9} fill={BLUE}>
                ściskanie
              </text>
              <text x={sectionCx - 54} y={sectionCy + sectionHeight / 2 + 16} fontSize={9} fill={ORANGE}>
                rozciąganie
              </text>

              <line
                x1={stressAxis}
                y1={sectionCy - sectionHeight / 2 - 10}
                x2={stressAxis}
                y2={sectionCy + sectionHeight / 2 + 10}
                stroke="#c9d0d9"
                strokeWidth={1}
              />
              <motion.path
                d={`M ${stressAxis} ${sectionCy - sectionHeight / 2} L ${stressAxis - 72 * p} ${sectionCy - sectionHeight / 2} L ${stressAxis} ${sectionCy} Z`}
                fill={BLUE}
                fillOpacity={0.16}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.35 }}
              />
              <motion.path
                d={`M ${stressAxis} ${sectionCy} L ${stressAxis + 72 * p} ${sectionCy + sectionHeight / 2} L ${stressAxis} ${sectionCy + sectionHeight / 2} Z`}
                fill={ORANGE}
                fillOpacity={0.16}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.35 }}
              />
              <line
                x1={stressAxis}
                y1={sectionCy - sectionHeight / 2}
                x2={stressAxis - 72 * p}
                y2={sectionCy - sectionHeight / 2}
                stroke={BLUE}
                strokeWidth={2.2}
              />
              <line
                x1={stressAxis}
                y1={sectionCy + sectionHeight / 2}
                x2={stressAxis + 72 * p}
                y2={sectionCy + sectionHeight / 2}
                stroke={ORANGE}
                strokeWidth={2.2}
              />
              <line
                x1={stressAxis - 72 * p}
                y1={sectionCy - sectionHeight / 2}
                x2={stressAxis + 72 * p}
                y2={sectionCy + sectionHeight / 2}
                stroke={INK}
                strokeWidth={2}
              />

              {stressLevels.map((level) => {
                const distance = sectionCy - level
                const ratio = Math.abs(distance) / (sectionHeight / 2)
                const length = ratio * 72 * p
                if (length < 2) return null
                const tension = distance < 0
                const tip = tension ? stressAxis + length : stressAxis - length
                const color = tension ? ORANGE : BLUE
                return (
                  <g key={level}>
                    <line x1={stressAxis} y1={level} x2={tip} y2={level} stroke={color} strokeWidth={1.5} />
                    <path
                      d={
                        tension
                          ? `M ${tip} ${level} L ${tip - 7} ${level - 3} L ${tip - 7} ${level + 3} Z`
                          : `M ${tip} ${level} L ${tip + 7} ${level - 3} L ${tip + 7} ${level + 3} Z`
                      }
                      fill={color}
                    />
                  </g>
                )
              })}

              <text x={stressAxis - 76} y={sectionCy - sectionHeight / 2 - 8} textAnchor="end" fontSize={9} fill={BLUE}>
                −96 MPa
              </text>
              <text
                x={stressAxis + 76}
                y={sectionCy + sectionHeight / 2 + 18}
                textAnchor="start"
                fontSize={9}
                fill={ORANGE}
              >
                +96 MPa
              </text>
              <text x={stressAxis - 6} y={sectionCy - 6} textAnchor="end" fontSize={9} fill={MUTED}>
                σ = 0
              </text>
              <text x={stressAxis + 8} y={sectionCy - sectionHeight / 2 - 8} fontSize={9} fill={MUTED}>
                σ = My/I
              </text>
            </g>
          )}

          {isRotate && (
            <g>
              <text x={245} y={64} textAnchor="middle" fontSize={10} fontWeight={600} fill={VIOLET}>
                ten sam moment, inna orientacja przekroju
              </text>

              <rect
                x={sectionCx - sectionWidth / 2}
                y={sectionCy - sectionHeight / 2}
                width={sectionWidth}
                height={sectionHeight}
                fill="none"
                stroke={MUTED}
                strokeWidth={1.2}
                strokeDasharray="5 4"
              />
              <g transform={`rotate(${rotateAngle} ${sectionCx} ${sectionCy})`}>
                <rect
                  x={sectionCx - sectionWidth / 2}
                  y={sectionCy - sectionHeight / 2}
                  width={sectionWidth}
                  height={sectionHeight}
                  fill={LIGHT}
                  fillOpacity={0.85}
                  stroke={EDGE}
                  strokeWidth={1.6}
                />
                <line
                  x1={sectionCx - sectionWidth / 2}
                  y1={sectionCy}
                  x2={sectionCx + sectionWidth / 2}
                  y2={sectionCy}
                  stroke={INK}
                  strokeWidth={1}
                  strokeDasharray="5 4"
                />
              </g>
              <circle cx={sectionCx} cy={sectionCy} r={3} fill={INK} />
              <text x={sectionCx} y={84} textAnchor="middle" fontSize={9} fill={MUTED}>
                obrót {Math.round(rotateAngle)}°
              </text>
              <text x={sectionCx} y={276} textAnchor="middle" fontSize={9} fill={MUTED}>
                {p < 0.5 ? 'b×h = 50×100 mm' : 'b×h = 100×50 mm'}
              </text>

              <line x1={stressAxis} y1={86} x2={stressAxis} y2={226} stroke="#c9d0d9" strokeWidth={1} />
              <path
                d={`M ${stressAxis} 86 L ${stressAxis - rotatePeak} 86 L ${stressAxis} 156 Z`}
                fill={BLUE}
                fillOpacity={0.16}
              />
              <path
                d={`M ${stressAxis} 156 L ${stressAxis + rotatePeak} 226 L ${stressAxis} 226 Z`}
                fill={ORANGE}
                fillOpacity={0.16}
              />
              <line x1={stressAxis} y1={86} x2={stressAxis - rotatePeak} y2={86} stroke={BLUE} strokeWidth={2.2} />
              <line x1={stressAxis} y1={226} x2={stressAxis + rotatePeak} y2={226} stroke={ORANGE} strokeWidth={2.2} />
              <line
                x1={stressAxis - rotatePeak}
                y1={86}
                x2={stressAxis + rotatePeak}
                y2={226}
                stroke={INK}
                strokeWidth={2}
              />
              <text x={stressAxis} y={82} textAnchor="middle" fontSize={9} fill={MUTED}>
                σ_max = {Math.round(rotateStress)} MPa
              </text>
              <text x={stressAxis - rotatePeak - 6} y={82} textAnchor="end" fontSize={9} fill={BLUE}>
                ściskanie
              </text>
              <text x={stressAxis + rotatePeak + 6} y={232} textAnchor="start" fontSize={9} fill={ORANGE}>
                rozciąganie
              </text>
              <text x={stressAxis} y={252} textAnchor="middle" fontSize={9} fill={VIOLET}>
                ρ ≈ 109 m → 27 m
              </text>
            </g>
          )}
        </svg>
      </div>
    </div>
  )
}
