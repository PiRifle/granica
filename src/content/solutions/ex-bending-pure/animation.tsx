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
const xAt = (ratio: number) => X0 + ratio * (X1 - X0)

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

function LoadArrow({ x, top, tip, label }: { x: number; top: number; tip: number; label: string }) {
  return (
    <g>
      <line x1={x} y1={top} x2={x} y2={tip - 7} stroke={ORANGE} strokeWidth={2.4} strokeLinecap="round" />
      <path
        d={`M ${x - 5} ${tip - 15} L ${x} ${tip - 6} L ${x + 5} ${tip - 15}`}
        fill="none"
        stroke={ORANGE}
        strokeWidth={2.4}
      />
      <text x={x} y={top - 7} textAnchor="middle" fontSize={9} fill={ORANGE}>
        {label}
      </text>
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

export function PureBendingExample1Animation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const p = playing ? smooth(sceneProgress) : 1
  const isModel = metric === 'model'
  const isForces = metric === 'forces'
  const isCurvature = metric === 'curvature'
  const isStress = metric === 'stress'
  const isCheck = metric === 'check'

  const sag = 26 * p
  const tickLevels = [0, 0.2, 0.4, 0.6, 0.8, 1]
  const shearPath = `M ${X0} 142 L ${xAt(0.25)} 142 L ${xAt(0.25)} 168 L ${xAt(0.75)} 168 L ${xAt(0.75)} 194 L ${X1} 194`
  const momentPath = `M ${X0} 268 L ${xAt(0.25)} 242 L ${xAt(0.75)} 242 L ${X1} 268`
  const stressLevels = Array.from({ length: 9 }, (_, level) => 78 + (level * 156) / 8)
  const cx = 150
  const cy = 156
  const halfHeight = 78
  const stressAxis = 320
  const stressLength = 80 * p

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 300"
          role="img"
          aria-label="Belka w czteropunktowym układzie zginania. Animacja pokazuje stały moment, stałą krzywiznę i liniowy rozkład naprężeń normalnych w przekroju."
        >
          <defs>
            <marker
              id="bp1-radius"
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
              id="bp1-y"
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
            L = 4 m · a = 1 m
          </text>
          <text x={14} y={34} fontSize={9} fill={MUTED}>
            P = 12 kN · b×h = 60×120 mm
          </text>
          <text x={14} y={48} fontSize={9} fill={MUTED}>
            E = 200 GPa
          </text>

          {isModel && (
            <g>
              <line x1={X0} y1={BEAM_Y} x2={X1} y2={BEAM_Y} stroke={EDGE} strokeWidth={5} strokeLinecap="round" />
              <Support x={X0} y={BEAM_Y} label="A" />
              <Support x={X1} y={BEAM_Y} label="B" />
              <LoadArrow x={xAt(0.25)} top={62} tip={BEAM_Y - 4} label="P = 12 kN" />
              <LoadArrow x={xAt(0.75)} top={62} tip={BEAM_Y - 4} label="P = 12 kN" />
              <Dimension x1={X0} x2={X1} y={160} label="L = 4 m" />
              <Dimension x1={X0} x2={xAt(0.25)} y={144} label="a = 1 m" />
              <Dimension x1={xAt(0.75)} x2={X1} y={144} label="a = 1 m" />

              <g>
                <rect x={360} y={186} width={50} height={100} fill={LIGHT} stroke={EDGE} strokeWidth={1.3} />
                <line x1={352} y1={236} x2={418} y2={236} stroke={INK} strokeWidth={1} strokeDasharray="5 4" />
                <text x={385} y={298} textAnchor="middle" fontSize={9} fill={MUTED}>
                  b = 60 mm
                </text>
                <text x={416} y={182} textAnchor="middle" fontSize={9} fill={MUTED}>
                  h = 120 mm
                </text>
                <line x1={383} y1={186} x2={383} y2={154} stroke={MUTED} strokeWidth={1} strokeDasharray="3 3" />
              </g>
            </g>
          )}

          {isForces && (
            <g>
              <line x1={X0} y1={86} x2={X1} y2={86} stroke={EDGE} strokeWidth={5} strokeLinecap="round" />
              <Support x={X0} y={86} label="A" />
              <Support x={X1} y={86} label="B" />
              <LoadArrow x={xAt(0.25)} top={40} tip={82} label="P = 12 kN" />
              <LoadArrow x={xAt(0.75)} top={40} tip={82} label="P = 12 kN" />

              <motion.rect
                x={xAt(0.25)}
                y={112}
                width={xAt(0.75) - xAt(0.25)}
                height={182}
                fill={GREEN}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.08 }}
                transition={{ duration: 0.4 }}
              />
              <text
                x={(xAt(0.25) + xAt(0.75)) / 2}
                y={128}
                textAnchor="middle"
                fontSize={10}
                fontWeight={600}
                fill={GREEN}
              >
                czyste zginanie
              </text>
              <text x={(xAt(0.25) + xAt(0.75)) / 2} y={144} textAnchor="middle" fontSize={9} fill={MUTED}>
                T = 0, M = const
              </text>

              <line x1={X0} y1={168} x2={X1} y2={168} stroke="#c9d0d9" strokeWidth={1} />
              <text x={18} y={146} fontSize={10} fontWeight={700} fill={BLUE}>
                T
              </text>
              <motion.path
                d={shearPath}
                fill="none"
                stroke={BLUE}
                strokeWidth={2.4}
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0.3 }}
                animate={{ pathLength: p, opacity: 1 }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <text x={(xAt(0.25) + xAt(0.75)) / 2} y={184} textAnchor="middle" fontSize={9} fill={BLUE}>
                T = 0
              </text>

              <line x1={X0} y1={268} x2={X1} y2={268} stroke="#c9d0d9" strokeWidth={1} />
              <text x={18} y={246} fontSize={10} fontWeight={700} fill={ORANGE}>
                M
              </text>
              <motion.path
                d={momentPath}
                fill="none"
                stroke={ORANGE}
                strokeWidth={2.4}
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0.3 }}
                animate={{ pathLength: p, opacity: 1 }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <text x={(xAt(0.25) + xAt(0.75)) / 2} y={232} textAnchor="middle" fontSize={9} fill={ORANGE}>
                M = 12 kN·m
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
                markerEnd="url(#bp1-radius)"
              />
              <text x={253} y={244} fontSize={9} fill={VIOLET}>
                ρ ≈ 144 m
              </text>
              <text x={66} y={238} fontSize={9} fill={MUTED}>
                stała krzywizna κ = 1/ρ
              </text>
            </g>
          )}

          {isStress && (
            <g>
              <rect
                x={cx - 42}
                y={cy - halfHeight}
                width={84}
                height={halfHeight * 2}
                fill="#eef3fa"
                stroke={EDGE}
                strokeWidth={1.4}
              />
              <line x1={cx - 58} y1={cy} x2={cx + 58} y2={cy} stroke={INK} strokeWidth={1} strokeDasharray="6 5" />
              <text x={cx - 54} y={cy - 6} fontSize={9} fill={MUTED}>
                oś obojętna
              </text>
              <line
                x1={cx + 52}
                y1={cy + 4}
                x2={cx + 52}
                y2={cy + 86}
                stroke={MUTED}
                strokeWidth={1.2}
                markerEnd="url(#bp1-y)"
              />
              <text x={cx + 58} y={cy + 84} fontSize={9} fill={MUTED}>
                y
              </text>
              <text x={cx - 54} y={cy - halfHeight - 8} fontSize={9} fill={BLUE}>
                ściskanie
              </text>
              <text x={cx - 54} y={cy + halfHeight + 16} fontSize={9} fill={ORANGE}>
                rozciąganie
              </text>

              <line
                x1={stressAxis}
                y1={cy - halfHeight - 10}
                x2={stressAxis}
                y2={cy + halfHeight + 10}
                stroke="#c9d0d9"
                strokeWidth={1}
              />
              <motion.path
                d={`M ${stressAxis} ${cy - halfHeight} L ${stressAxis - stressLength} ${cy - halfHeight} L ${stressAxis} ${cy} Z`}
                fill={BLUE}
                fillOpacity={0.16}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.35 }}
              />
              <motion.path
                d={`M ${stressAxis} ${cy} L ${stressAxis + stressLength} ${cy + halfHeight} L ${stressAxis} ${cy + halfHeight} Z`}
                fill={ORANGE}
                fillOpacity={0.16}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.35 }}
              />
              <line
                x1={stressAxis}
                y1={cy - halfHeight}
                x2={stressAxis - stressLength}
                y2={cy - halfHeight}
                stroke={BLUE}
                strokeWidth={2.2}
              />
              <line
                x1={stressAxis}
                y1={cy + halfHeight}
                x2={stressAxis + stressLength}
                y2={cy + halfHeight}
                stroke={ORANGE}
                strokeWidth={2.2}
              />
              <line
                x1={stressAxis - stressLength}
                y1={cy - halfHeight}
                x2={stressAxis + stressLength}
                y2={cy + halfHeight}
                stroke={INK}
                strokeWidth={2}
              />

              {stressLevels.map((level) => {
                const distance = cy - level
                const ratio = Math.abs(distance) / halfHeight
                const length = ratio * stressLength
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

              <text x={stressAxis - stressLength - 4} y={cy - halfHeight - 8} textAnchor="end" fontSize={9} fill={BLUE}>
                −83,3 MPa
              </text>
              <text
                x={stressAxis + stressLength + 4}
                y={cy + halfHeight + 18}
                textAnchor="start"
                fontSize={9}
                fill={ORANGE}
              >
                +83,3 MPa
              </text>
              <text x={stressAxis - 6} y={cy - 6} textAnchor="end" fontSize={9} fill={MUTED}>
                σ = 0
              </text>
              <text x={stressAxis + 8} y={cy - halfHeight - 8} fontSize={9} fill={MUTED}>
                σ = My/I
              </text>
            </g>
          )}

          {isCheck && (
            <g>
              <path
                d={`M 42 132 Q 142 ${132 + 20 * p} 242 132`}
                fill="none"
                stroke={BLUE}
                strokeWidth={3}
                strokeLinecap="round"
              />
              <path
                d={`M 42 152 Q 142 ${152 + 20 * p} 242 152`}
                fill="none"
                stroke={ORANGE}
                strokeWidth={3}
                strokeLinecap="round"
              />
              <path
                d={`M 42 142 Q 142 ${142 + 20 * p} 242 142`}
                fill="none"
                stroke={INK}
                strokeWidth={1.8}
                strokeDasharray="6 5"
              />
              <text x={42} y={118} fontSize={9} fill={BLUE}>
                skrócenie
              </text>
              <text x={42} y={176} fontSize={9} fill={ORANGE}>
                wydłużenie
              </text>

              <line x1={342} y1={82} x2={342} y2={218} stroke="#c9d0d9" strokeWidth={1} />
              <line x1={342} y1={150} x2={392} y2={150} stroke={MUTED} strokeWidth={1} strokeDasharray="4 4" />
              <path d={`M 342 82 L ${342 - 48 * p} 82 L 342 150 Z`} fill={BLUE} fillOpacity={0.14} />
              <path d={`M 342 150 L ${342 + 48 * p} 218 L 342 218 Z`} fill={ORANGE} fillOpacity={0.14} />
              <line x1={342} y1={82} x2={342 - 48 * p} y2={82} stroke={BLUE} strokeWidth={2.2} />
              <line x1={342} y1={218} x2={342 + 48 * p} y2={218} stroke={ORANGE} strokeWidth={2.2} />
              <line x1={342 - 48 * p} y1={82} x2={342 + 48 * p} y2={218} stroke={INK} strokeWidth={2} />
              <text x={342} y={70} textAnchor="middle" fontSize={9} fill={MUTED}>
                odkształcenie ε
              </text>
              <text x={342 - 54 * p} y={78} textAnchor="end" fontSize={9} fill={BLUE}>
                −4,17·10⁻⁴
              </text>
              <text x={342 + 54 * p} y={232} textAnchor="start" fontSize={9} fill={ORANGE}>
                +4,17·10⁻⁴
              </text>
              <text x={328} y={154} textAnchor="end" fontSize={9} fill={MUTED}>
                0
              </text>

              <g>
                <circle cx={412} cy={62} r={13} fill="none" stroke={GREEN} strokeWidth={2} />
                <path
                  d="M 405 62 L 410 68 L 419 56"
                  fill="none"
                  stroke={GREEN}
                  strokeWidth={2.2}
                  strokeLinecap="round"
                />
              </g>
              <text x={270} y={270} fontSize={9} fill={GREEN}>
                T = 0, ale σ_max = 83,3 MPa
              </text>
            </g>
          )}
        </svg>
      </div>
    </div>
  )
}
