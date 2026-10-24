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
const xAt = (ratio: number) => X0 + ratio * (X1 - X0)
const LOAD_RATIO = 0.683 / 3
const LOAD_LEFT = xAt(LOAD_RATIO)
const LOAD_RIGHT = xAt(1 - LOAD_RATIO)

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

export function PureBendingExample3Animation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const p = playing ? smooth(sceneProgress) : 1
  const isModel = metric === 'model'
  const isStrength = metric === 'strength'
  const isLayout = metric === 'layout'
  const isCurvature = metric === 'curvature'
  const isCheck = metric === 'check'

  const sag = 24 * p
  const tickLevels = [0, 0.2, 0.4, 0.6, 0.8, 1]
  const sectionCx = 150
  const sectionCy = 156
  const sectionWidth = 56
  const sectionHeight = 112
  const stressAxis = 320
  const stressLevels = Array.from({ length: 9 }, (_, level) => 100 + (level * 112) / 8)
  const momentPath = `M ${X0} 282 L ${LOAD_LEFT} 252 L ${LOAD_RIGHT} 252 L ${X1} 282`

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 300"
          role="img"
          aria-label="Czteropunktowy układ zginania o rozpiętości 3 metrów. Animacja pokazuje nośność przekroju 40 na 80 milimetrów, położenie sił, krzywiznę oraz kontrolę stanu granicznego przy naprężeniu 160 megapaskali."
        >
          <defs>
            <marker
              id="bp3-radius"
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
              id="bp3-y"
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
            L = 3 m · P = 10 kN
          </text>
          <text x={14} y={34} fontSize={9} fill={MUTED}>
            a = 0,683 m · b×h = 40×80 mm
          </text>
          <text x={14} y={48} fontSize={9} fill={MUTED}>
            E = 200 GPa · σ_dop = 160 MPa
          </text>

          {isModel && (
            <g>
              <line x1={X0} y1={112} x2={X1} y2={112} stroke={EDGE} strokeWidth={5} strokeLinecap="round" />
              <Support x={X0} y={112} label="A" />
              <Support x={X1} y={112} label="B" />
              <LoadArrow x={LOAD_LEFT} top={64} tip={108} label="P = 10 kN" />
              <LoadArrow x={LOAD_RIGHT} top={64} tip={108} label="P = 10 kN" />
              <Dimension x1={X0} x2={X1} y={166} label="L = 3 m" />
              <Dimension x1={X0} x2={LOAD_LEFT} y={150} label="a = 0,683 m" />
              <Dimension x1={LOAD_RIGHT} x2={X1} y={150} label="a = 0,683 m" />

              <g>
                <rect x={364} y={196} width={44} height={88} fill={LIGHT} stroke={EDGE} strokeWidth={1.3} />
                <line x1={356} y1={240} x2={416} y2={240} stroke={INK} strokeWidth={1} strokeDasharray="5 4" />
                <text x={386} y={294} textAnchor="middle" fontSize={9} fill={MUTED}>
                  b = 40 mm
                </text>
                <text x={414} y={192} textAnchor="middle" fontSize={9} fill={MUTED}>
                  h = 80 mm
                </text>
              </g>
            </g>
          )}

          {isStrength && (
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
                x1={sectionCx - 50}
                y1={sectionCy}
                x2={sectionCx + 50}
                y2={sectionCy}
                stroke={INK}
                strokeWidth={1}
                strokeDasharray="6 5"
              />
              <text x={sectionCx - 46} y={sectionCy - 6} fontSize={9} fill={MUTED}>
                oś obojętna
              </text>
              <line
                x1={sectionCx + 24}
                y1={sectionCy + 4}
                x2={sectionCx + 24}
                y2={sectionCy + 76}
                stroke={MUTED}
                strokeWidth={1.2}
                markerEnd="url(#bp3-y)"
              />
              <text x={sectionCx + 30} y={sectionCy + 74} fontSize={9} fill={MUTED}>
                y
              </text>

              <line
                x1={stressAxis}
                y1={sectionCy - sectionHeight / 2 - 10}
                x2={stressAxis}
                y2={sectionCy + sectionHeight / 2 + 10}
                stroke="#c9d0d9"
                strokeWidth={1}
              />
              <line
                x1={stressAxis - 68}
                y1={sectionCy - sectionHeight / 2}
                x2={stressAxis + 68}
                y2={sectionCy + sectionHeight / 2}
                stroke={GREEN}
                strokeWidth={1.6}
                strokeDasharray="6 4"
              />
              <motion.path
                d={`M ${stressAxis} ${sectionCy - sectionHeight / 2} L ${stressAxis - 68 * p} ${sectionCy - sectionHeight / 2} L ${stressAxis} ${sectionCy} Z`}
                fill={BLUE}
                fillOpacity={0.16}
              />
              <motion.path
                d={`M ${stressAxis} ${sectionCy} L ${stressAxis + 68 * p} ${sectionCy + sectionHeight / 2} L ${stressAxis} ${sectionCy + sectionHeight / 2} Z`}
                fill={ORANGE}
                fillOpacity={0.16}
              />
              <line
                x1={stressAxis}
                y1={sectionCy - sectionHeight / 2}
                x2={stressAxis - 68 * p}
                y2={sectionCy - sectionHeight / 2}
                stroke={BLUE}
                strokeWidth={2.2}
              />
              <line
                x1={stressAxis}
                y1={sectionCy + sectionHeight / 2}
                x2={stressAxis + 68 * p}
                y2={sectionCy + sectionHeight / 2}
                stroke={ORANGE}
                strokeWidth={2.2}
              />
              <line
                x1={stressAxis - 68 * p}
                y1={sectionCy - sectionHeight / 2}
                x2={stressAxis + 68 * p}
                y2={sectionCy + sectionHeight / 2}
                stroke={INK}
                strokeWidth={2}
              />

              {stressLevels.map((level) => {
                const distance = sectionCy - level
                const ratio = Math.abs(distance) / (sectionHeight / 2)
                const length = ratio * 68 * p
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

              <text x={stressAxis - 72} y={sectionCy - sectionHeight / 2 - 8} textAnchor="end" fontSize={9} fill={BLUE}>
                −160 MPa
              </text>
              <text
                x={stressAxis + 72}
                y={sectionCy + sectionHeight / 2 + 18}
                textAnchor="start"
                fontSize={9}
                fill={ORANGE}
              >
                +160 MPa
              </text>
              <text x={stressAxis - 6} y={sectionCy - 6} textAnchor="end" fontSize={9} fill={MUTED}>
                σ = 0
              </text>
              <text x={stressAxis + 8} y={sectionCy - sectionHeight / 2 - 8} fontSize={9} fill={GREEN}>
                granica σ_dop
              </text>
              <text x={46} y={90} fontSize={10} fontWeight={600} fill={INK}>
                nośność przekroju
              </text>
              <text x={46} y={250} fontSize={9} fill={VIOLET}>
                M_max = 6,83 kN·m
              </text>
            </g>
          )}

          {isLayout && (
            <g>
              <line x1={X0} y1={110} x2={X1} y2={110} stroke={EDGE} strokeWidth={5} strokeLinecap="round" />
              <Support x={X0} y={110} label="A" />
              <Support x={X1} y={110} label="B" />
              <LoadArrow x={LOAD_LEFT} top={64} tip={106} label="P = 10 kN" />
              <LoadArrow x={LOAD_RIGHT} top={64} tip={106} label="P = 10 kN" />
              <Dimension x1={X0} x2={LOAD_LEFT} y={150} label="a = 0,683 m" />
              <Dimension x1={LOAD_RIGHT} x2={X1} y={150} label="a = 0,683 m" />
              <Dimension x1={X0} x2={X1} y={168} label="L = 3 m" />
              <Dimension x1={LOAD_LEFT} x2={LOAD_RIGHT} y={186} label="L − 2a = 1,63 m" />

              <motion.rect
                x={LOAD_LEFT}
                y={198}
                width={LOAD_RIGHT - LOAD_LEFT}
                height={96}
                fill={GREEN}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.08 }}
                transition={{ duration: 0.4 }}
              />
              <text
                x={(LOAD_LEFT + LOAD_RIGHT) / 2}
                y={214}
                textAnchor="middle"
                fontSize={10}
                fontWeight={600}
                fill={GREEN}
              >
                czyste zginanie
              </text>
              <text x={(LOAD_LEFT + LOAD_RIGHT) / 2} y={230} textAnchor="middle" fontSize={9} fill={GREEN}>
                T = 0
              </text>

              <line x1={X0} y1={282} x2={X1} y2={282} stroke="#c9d0d9" strokeWidth={1} />
              <text x={18} y={258} fontSize={10} fontWeight={700} fill={ORANGE}>
                M
              </text>
              <motion.path
                d={momentPath}
                fill="none"
                stroke={ORANGE}
                strokeWidth={2.6}
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0.3 }}
                animate={{ pathLength: p, opacity: 1 }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <text x={(LOAD_LEFT + LOAD_RIGHT) / 2} y={244} textAnchor="middle" fontSize={9} fill={ORANGE}>
                M_max = 6,83 kN·m
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
              <text x={348} y={112} fontSize={9} fill={BLUE}>
                góra: ε ≈ −8·10⁻⁴
              </text>
              <text x={348} y={188} fontSize={9} fill={ORANGE}>
                dół: ε ≈ +8·10⁻⁴
              </text>
              <line
                x1={245}
                y1={140 + sag}
                x2={245}
                y2={252}
                stroke={VIOLET}
                strokeWidth={1.3}
                strokeDasharray="4 4"
                markerEnd="url(#bp3-radius)"
              />
              <text x={253} y={244} fontSize={9} fill={VIOLET}>
                ρ ≈ 50 m
              </text>
              <text x={66} y={238} fontSize={9} fill={MUTED}>
                stała krzywizna κ = 1/ρ
              </text>
            </g>
          )}

          {isCheck && (
            <g>
              <rect x={92} y={100} width={56} height={112} fill="#eef3fa" stroke={EDGE} strokeWidth={1.4} />
              <line x1={82} y1={156} x2={158} y2={156} stroke={INK} strokeWidth={1} strokeDasharray="5 4" />
              <text x={78} y={90} fontSize={9} fill={MUTED}>
                σ_max = 160 MPa
              </text>

              <line x1={210} y1={92} x2={210} y2={220} stroke="#c9d0d9" strokeWidth={1} />
              <path d={`M 210 100 L ${210 - 50 * p} 100 L 210 156 Z`} fill={BLUE} fillOpacity={0.14} />
              <path d={`M 210 156 L ${210 + 50 * p} 212 L 210 212 Z`} fill={ORANGE} fillOpacity={0.14} />
              <line x1={210} y1={100} x2={210 - 50 * p} y2={100} stroke={BLUE} strokeWidth={2.2} />
              <line x1={210} y1={212} x2={210 + 50 * p} y2={212} stroke={ORANGE} strokeWidth={2.2} />
              <line x1={210 - 50 * p} y1={100} x2={210 + 50 * p} y2={212} stroke={INK} strokeWidth={2} />
              <text x={210} y={238} textAnchor="middle" fontSize={9} fill={MUTED}>
                σ = M y / I
              </text>

              <text x={300} y={96} fontSize={9} fill={MUTED}>
                wykorzystanie nośności
              </text>
              <rect x={300} y={112} width={140} height={18} rx={9} fill="#eef1f4" />
              <motion.rect
                x={300}
                y={112}
                width={140 * p}
                height={18}
                rx={9}
                fill={GREEN}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.9 }}
              />
              <text x={370} y={125} textAnchor="middle" fontSize={9} fill={p > 0.55 ? '#ffffff' : INK}>
                {Math.round(100 * p)}%
              </text>
              <text x={300} y={150} fontSize={9} fill={MUTED}>
                σ_max = σ_dop
              </text>
              <text x={300} y={164} fontSize={9} fill={MUTED}>
                ε = 8·10⁻⁴
              </text>
              <text x={300} y={178} fontSize={9} fill={MUTED}>
                ρ ≈ 50 m
              </text>

              <g>
                <circle cx={416} cy={60} r={13} fill="none" stroke={GREEN} strokeWidth={2} />
                <path
                  d="M 409 60 L 414 66 L 423 54"
                  fill="none"
                  stroke={GREEN}
                  strokeWidth={2.2}
                  strokeLinecap="round"
                />
              </g>
              <text x={230} y={270} textAnchor="middle" fontSize={9} fill={GREEN}>
                naprężenie, odkształcenie i krzywizna są spójne
              </text>
            </g>
          )}
        </svg>
      </div>
    </div>
  )
}
