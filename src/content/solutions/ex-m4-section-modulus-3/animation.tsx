import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const TENSION = '#ff6b45'
const MODULUS = '#a970dd'
const EDGE = '#68727e'
const MUTED = '#87929d'
const INK = '#17202a'
const OK = '#2e9e6b'

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}
const decimal = (value: number) => value.toFixed(1).replace('.', ',')

const SCALE = 1.05
const SINGLE_TOP = 64
const SINGLE_CX = 138
const SINGLE_B = 80
const AXIS_X = 300
const STRESS_SCALE = 0.45

const PRIMARY = { cx: 100, h: 120 }
const VARIANT = { cx: 318, h: 100 }

export function SectionModulusExample3Animation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const draw = playing ? smooth(sceneProgress) : 1

  const singleHeight =
    metric === 'height' ? 100 + (118.6 - 100) * draw : metric === 'model' || metric === 'stress' ? 110 : 120
  const singleW = SINGLE_B * SCALE
  const singleX = SINGLE_CX - singleW / 2
  const singleBottom = SINGLE_TOP + singleHeight * SCALE
  const singleNA = (SINGLE_TOP + singleBottom) / 2
  const singleCDistance = singleHeight / 2
  const cLabel = `${decimal(singleCDistance)} mm`

  const showStress = metric === 'stress' || metric === 'height' || metric === 'check'
  const stressValue = metric === 'check' ? 156.25 : 160
  const edgeLength = stressValue * STRESS_SCALE
  const allowLength = 160 * STRESS_SCALE

  const showVariant = metric === 'variant' || metric === 'result'
  const variantWidthMm = metric === 'variant' ? 80 + (112.5 - 80) * draw : 112.5
  const primaryW = 80 * SCALE
  const primaryHeight = PRIMARY.h * SCALE
  const primaryTop = 140 - primaryHeight / 2
  const primaryBottom = 140 + primaryHeight / 2
  const variantW = variantWidthMm * SCALE
  const variantHeight = VARIANT.h * SCALE
  const variantTop = 140 - variantHeight / 2
  const variantBottom = 140 + variantHeight / 2
  const variantLeft = VARIANT.cx - variantW / 2
  const variantRight = VARIANT.cx + variantW / 2

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          width={460}
          height={300}
          viewBox="0 0 460 300"
          role="img"
          aria-label="Prostokąt 80 na 120 milimetrów dobierany do momentu 30 kiloniutometrów. Animacja pokazuje oś obojętną, odległość skrajnego włókna, wymaganą wysokość oraz rozkład naprężeń przy naprężeniu dopuszczalnym 160 megapaskali."
        >
          <defs>
            <marker
              id="m4s3-dim"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={MUTED} />
            </marker>
          </defs>

          <text x={12} y={22} fontSize={10} fontWeight={600} fill={INK}>
            |M_x| = 30 kN·m
          </text>
          <text x={12} y={37} fontSize={9} fill={MUTED}>
            σ_dop = 160 MPa
          </text>
          <text x={12} y={52} fontSize={9} fill={MUTED}>
            b = 80 mm
          </text>

          {!showVariant && (
            <g>
              <text x={12} y={68} fontSize={8.5} fill={TENSION}>
                {metric === 'height' ? `h = ${decimal(singleHeight)} mm` : metric === 'check' ? 'h = 120 mm' : 'h = ?'}
              </text>

              <line
                x1={singleX}
                y1={SINGLE_TOP}
                x2={singleX + singleW}
                y2={SINGLE_TOP}
                stroke={EDGE}
                strokeWidth={1.4}
              />
              <line
                x1={singleX}
                y1={singleBottom}
                x2={singleX + singleW}
                y2={singleBottom}
                stroke={EDGE}
                strokeWidth={1.4}
              />
              <line x1={singleX} y1={SINGLE_TOP} x2={singleX} y2={singleBottom} stroke={EDGE} strokeWidth={1.4} />
              <line
                x1={singleX + singleW}
                y1={SINGLE_TOP}
                x2={singleX + singleW}
                y2={singleBottom}
                stroke={EDGE}
                strokeWidth={1.4}
              />

              <motion.line
                x1={singleX - 12}
                y1={singleNA}
                x2={singleX + singleW + 12}
                y2={singleNA}
                stroke={TENSION}
                strokeWidth={1.8}
                strokeDasharray="5 4"
                initial={{ pathLength: 0, opacity: 0.3 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
              <text x={singleX + singleW + 15} y={singleNA - 5} fontSize={8} fill={TENSION}>
                oś obojętna
              </text>

              <line
                x1={singleX - 18}
                y1={singleNA}
                x2={singleX - 18}
                y2={singleNA - (singleNA - SINGLE_TOP) * draw}
                stroke={MUTED}
                strokeWidth={1.1}
                markerEnd="url(#m4s3-dim)"
              />
              <line
                x1={singleX - 18}
                y1={singleNA}
                x2={singleX - 18}
                y2={singleNA + (singleBottom - singleNA) * draw}
                stroke={MUTED}
                strokeWidth={1.1}
                markerEnd="url(#m4s3-dim)"
              />
              <motion.g initial={false} animate={{ opacity: draw > 0.5 ? 1 : 0.35 }} transition={{ duration: 0.2 }}>
                <text x={singleX - 24} y={(SINGLE_TOP + singleNA) / 2 + 3} textAnchor="end" fontSize={8.5} fill={INK}>
                  c = h/2
                </text>
                {metric !== 'model' && metric !== 'stress' && (
                  <text
                    x={singleX - 24}
                    y={(SINGLE_TOP + singleNA) / 2 + 14}
                    textAnchor="end"
                    fontSize={8}
                    fill={MUTED}
                  >
                    {cLabel}
                  </text>
                )}
              </motion.g>

              <line
                x1={singleX}
                y1={singleBottom + 16}
                x2={singleX + singleW}
                y2={singleBottom + 16}
                stroke={MUTED}
                strokeWidth={1.1}
                markerStart="url(#m4s3-dim)"
                markerEnd="url(#m4s3-dim)"
              />
              <text x={SINGLE_CX} y={singleBottom + 28} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                b = 80 mm
              </text>
            </g>
          )}

          {showStress && !showVariant && (
            <g>
              <text x={AXIS_X} y={48} textAnchor="middle" fontSize={9} fill={MUTED}>
                rozkład σ
              </text>
              {[SINGLE_TOP, singleNA, singleBottom].map((y) => (
                <line
                  key={`guide-${y}`}
                  x1={singleX + singleW + 3}
                  y1={y}
                  x2={AXIS_X - 4}
                  y2={y}
                  stroke="#c9d0d9"
                  strokeWidth={1}
                  strokeDasharray="4 4"
                />
              ))}
              <line x1={AXIS_X} y1={SINGLE_TOP} x2={AXIS_X} y2={singleBottom} stroke={EDGE} strokeWidth={1.3} />
              <motion.path
                d={`M ${AXIS_X} ${singleNA} L ${AXIS_X - edgeLength} ${SINGLE_TOP} L ${AXIS_X} ${SINGLE_TOP} Z`}
                fill={ACCENT}
                fillOpacity={0.15}
                stroke={ACCENT}
                strokeWidth={1.5}
                initial={{ pathLength: 0, opacity: 0.2 }}
                animate={{ pathLength: draw, opacity: 1 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              />
              <motion.path
                d={`M ${AXIS_X} ${singleNA} L ${AXIS_X + edgeLength} ${singleBottom} L ${AXIS_X} ${singleBottom} Z`}
                fill={TENSION}
                fillOpacity={0.15}
                stroke={TENSION}
                strokeWidth={1.5}
                initial={{ pathLength: 0, opacity: 0.2 }}
                animate={{ pathLength: draw, opacity: 1 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              />

              {[0, 1, 2, 3, 4, 5, 6].map((index) => {
                const y = SINGLE_TOP + 8 + index * ((singleBottom - SINGLE_TOP - 16) / 6)
                const above = y < singleNA
                const ratio = above
                  ? (singleNA - y) / (singleNA - SINGLE_TOP)
                  : (y - singleNA) / (singleBottom - singleNA)
                const amount = clamp01((draw - index * 0.035) / 0.7)
                const length = edgeLength * ratio * amount
                return (
                  <line
                    key={`arrow-${index}`}
                    x1={AXIS_X}
                    y1={y}
                    x2={above ? AXIS_X - length : AXIS_X + length}
                    y2={y}
                    stroke={above ? ACCENT : TENSION}
                    strokeWidth={1.4}
                  />
                )
              })}

              <motion.g initial={false} animate={{ opacity: draw > 0.55 ? 1 : 0 }} transition={{ duration: 0.2 }}>
                <text
                  x={AXIS_X - edgeLength - 2}
                  y={SINGLE_TOP - 5}
                  textAnchor="end"
                  fontSize={8.5}
                  fill={metric === 'check' ? ACCENT : MUTED}
                >
                  {metric === 'check' ? '156,25 MPa' : 'σ_dop = 160 MPa'}
                </text>
                <text x={AXIS_X + edgeLength} y={singleBottom + 20} textAnchor="middle" fontSize={8.5} fill={TENSION}>
                  {metric === 'check' ? '156,25 MPa' : 'σ_dop = 160 MPa'}
                </text>
                <text x={AXIS_X - 4} y={singleBottom + 16} textAnchor="end" fontSize={8} fill={MUTED}>
                  zero
                </text>
              </motion.g>

              {metric === 'check' && (
                <motion.g initial={false} animate={{ opacity: draw > 0.5 ? 1 : 0 }} transition={{ duration: 0.2 }}>
                  <line
                    x1={AXIS_X + allowLength}
                    y1={SINGLE_TOP - 8}
                    x2={AXIS_X + allowLength}
                    y2={singleBottom + 8}
                    stroke={OK}
                    strokeWidth={1.3}
                    strokeDasharray="4 3"
                  />
                  <text x={AXIS_X + allowLength + 3} y={SINGLE_TOP - 12} fontSize={8} fill={OK}>
                    σ_dop
                  </text>
                </motion.g>
              )}
            </g>
          )}

          {showVariant && (
            <g>
              <line x1={42} y1={140} x2={442} y2={140} stroke={TENSION} strokeWidth={1.6} strokeDasharray="5 4" />

              <g>
                <rect
                  x={PRIMARY.cx - primaryW / 2}
                  y={primaryTop}
                  width={primaryW}
                  height={primaryHeight}
                  fill="#edf1ff"
                  stroke={EDGE}
                  strokeWidth={1.5}
                />
                <line
                  x1={PRIMARY.cx - primaryW / 2 - 10}
                  y1={140}
                  x2={PRIMARY.cx - primaryW / 2 - 10}
                  y2={primaryTop}
                  stroke={MUTED}
                  strokeWidth={1.1}
                  markerEnd="url(#m4s3-dim)"
                />
                <text
                  x={PRIMARY.cx - primaryW / 2 - 14}
                  y={(140 + primaryTop) / 2 + 3}
                  textAnchor="end"
                  fontSize={8}
                  fill={INK}
                >
                  c = 60
                </text>
                <line
                  x1={PRIMARY.cx - primaryW / 2}
                  y1={primaryBottom + 14}
                  x2={PRIMARY.cx + primaryW / 2}
                  y2={primaryBottom + 14}
                  stroke={MUTED}
                  strokeWidth={1}
                  markerStart="url(#m4s3-dim)"
                  markerEnd="url(#m4s3-dim)"
                />
                <text x={PRIMARY.cx} y={primaryBottom + 27} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                  80 × 120
                </text>
                {showVariant && metric === 'result' && (
                  <text x={PRIMARY.cx} y={primaryBottom + 42} textAnchor="middle" fontSize={8.5} fill={INK}>
                    A = 9600 mm²
                  </text>
                )}
              </g>

              <g>
                <rect
                  x={variantLeft}
                  y={variantTop}
                  width={variantW}
                  height={variantHeight}
                  fill="#e3ebff"
                  fillOpacity={metric === 'result' ? 0.85 : 0.65}
                  stroke={EDGE}
                  strokeWidth={1.5}
                />
                <line
                  x1={variantRight + 10}
                  y1={140}
                  x2={variantRight + 10}
                  y2={variantTop}
                  stroke={MUTED}
                  strokeWidth={1.1}
                  markerEnd="url(#m4s3-dim)"
                />
                <text x={variantRight + 14} y={(140 + variantTop) / 2 + 3} fontSize={8} fill={INK}>
                  c = 50
                </text>
                <line
                  x1={variantLeft}
                  y1={variantBottom + 14}
                  x2={variantRight}
                  y2={variantBottom + 14}
                  stroke={MUTED}
                  strokeWidth={1}
                  markerStart="url(#m4s3-dim)"
                  markerEnd="url(#m4s3-dim)"
                />
                <text x={VARIANT.cx} y={variantBottom + 27} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                  {decimal(variantWidthMm)} × 100
                </text>
                {metric === 'result' && (
                  <text x={VARIANT.cx} y={variantBottom + 42} textAnchor="middle" fontSize={8.5} fill={INK}>
                    A = 11 250 mm²
                  </text>
                )}
              </g>

              {metric === 'variant' && (
                <motion.g initial={false} animate={{ opacity: draw > 0.65 ? 1 : 0.35 }} transition={{ duration: 0.2 }}>
                  <text x={230} y={232} textAnchor="middle" fontSize={9} fill={MODULUS}>
                    to samo W, inny podział wymiarów
                  </text>
                  <text x={230} y={248} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                    mniejsza wysokość wymaga większej szerokości
                  </text>
                </motion.g>
              )}

              {metric === 'result' && (
                <g>
                  <text x={230} y={266} textAnchor="middle" fontSize={9} fill={MODULUS}>
                    ten sam wskaźnik W ≈ 187 500 mm³
                  </text>
                  <text x={230} y={281} textAnchor="middle" fontSize={8.5} fill={TENSION}>
                    wariant 112,5 × 100 zużywa więcej materiału
                  </text>
                </g>
              )}
            </g>
          )}

          {metric === 'model' && (
            <text x={230} y={276} textAnchor="middle" fontSize={9} fill={INK}>
              szerokość jest ograniczona, szukamy minimalnej wysokości
            </text>
          )}
          {metric === 'stress' && (
            <text x={230} y={276} textAnchor="middle" fontSize={9} fill={INK}>
              naprężenie rośnie liniowo od zera na osi do σ_dop na krawędzi
            </text>
          )}
          {metric === 'height' && (
            <text x={230} y={276} textAnchor="middle" fontSize={9} fill={OK}>
              przy h = 118,6 mm naprężenie osiąga wartość dopuszczalną
            </text>
          )}
          {metric === 'check' && (
            <text x={230} y={276} textAnchor="middle" fontSize={9} fill={OK}>
              σ = 156,25 MPa &lt; σ_dop = 160 MPa
            </text>
          )}
        </svg>
      </div>
    </div>
  )
}
