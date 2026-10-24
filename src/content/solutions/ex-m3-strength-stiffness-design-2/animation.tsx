import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local, SEGMENT_COLORS } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const LOAD = '#ff6b45'
const LIMIT = '#a970dd'
const MUTED = '#87929d'
const SUPPORT = '#68727e'
const OK = '#2f7d5b'
const BAD = '#d64545'

const TOP = 62
const SEGMENT_HEIGHT = 78
const CX = 104
const DELTA_SCALE = 70

const ORIGINAL_DELTAS = [0.28, 0.103, 0.072]
const FINAL_DELTAS = [0.224, 0.103, 0.072]
const STRESSES = [140, 51.4, 36]
const FINAL_STRESSES = [112, 51.4, 36]
const NORMAL_FORCES = [28, 18, 18]

const clamp01 = (value: number) => Math.max(0, Math.min(1, value))
const easeOut = (value: number) => 1 - Math.pow(1 - clamp01(value), 3)
const pl = (value: number, digits = 1) => value.toFixed(digits).replace('.', ',')

const CHARTS = {
  x: 252,
  right: 432,
  title: 84,
}

const halfWidth = (area: number) => 6 + 32 * (area / 500)

function ChartTitle({ children }: { children: string }) {
  return (
    <text x={CHARTS.x - 8} y={CHARTS.title} fontSize={9.5} fontWeight={600} fill={SUPPORT}>
      {children}
    </text>
  )
}

export function StrengthStiffnessDesign2Animation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const raw = playing ? clamp01(sceneProgress) : 1
  const grow = easeOut(raw / 0.7)
  const isModel = metric === 'model'
  const isStress = metric === 'σ'
  const isDelta = metric === 'ΔL'
  const isStrength = metric === 'Aσ'
  const isStiffness = metric === 'Aδ'
  const isCheck = metric === 'check'

  const area1 =
    isModel || isStress || isDelta ? 200 : isStrength ? 200 + 33.3 * grow : isStiffness ? 233.3 + 16.7 * grow : 250
  const areas = [area1, 350, 500]
  const halves = areas.map(halfWidth)

  const activeDeltas = isDelta ? ORIGINAL_DELTAS : isCheck ? FINAL_DELTAS : [0, 0, 0]
  const stretch = isDelta || isCheck ? grow : 0
  const heights = activeDeltas.map((delta) => SEGMENT_HEIGHT + delta * DELTA_SCALE * stretch)
  const y0 = TOP
  const y1 = y0 + heights[0]
  const y2 = y1 + heights[1]
  const y3 = y2 + heights[2]
  const mids = [y0 + heights[0] / 2, y1 + heights[1] / 2, y2 + heights[2] / 2]

  const stressGrow = isStress ? grow : 1
  const deltaGrow = isDelta ? grow : 1
  const strengthGrow = isStrength ? grow : 1
  const stiffnessGrow = isStiffness ? grow : 1
  const checkGrow = isCheck ? grow : 0

  const panelX = CHARTS.x
  const panelWidth = CHARTS.right - CHARTS.x
  const stressScale = 150
  const stressAllowX = panelX + (120 / stressScale) * panelWidth
  const elongationScale = 0.5
  const elongationLimitX = panelX + (0.4 / elongationScale) * panelWidth
  const areaScale = 300

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 480 360"
          role="img"
          aria-label="Schodkowy pręt o trzech odcinkach po 400 mm, z siłami 28, 18 i 18 kN. Animacja pokazuje naprężenia, sumę wydłużeń oraz dobór pola pierwszego odcinka z warunku wytrzymałości i sztywności."
        >
          <text x={10} y={20} fontSize={9} fill={MUTED}>
            A₁ = 200 · A₂ = 350 · A₃ = 500 mm²
          </text>
          <text x={10} y={34} fontSize={9} fill={MUTED}>
            P = 18 kN · Q = 10 kN · 3 × 400 mm
          </text>
          <text x={10} y={48} fontSize={9} fill={MUTED}>
            σ_dop = 120 MPa · ΔL_dop = 0,40 mm
          </text>

          <g stroke={SUPPORT} strokeWidth={2} strokeLinecap="round">
            <line x1={CX - halves[0] - 16} y1={y0} x2={CX + halves[0] + 16} y2={y0} />
            {Array.from({ length: 7 }, (_, tick) => {
              const x = CX - halves[0] - 12 + tick * ((halves[0] * 2 + 24) / 6)
              return <line key={tick} x1={x} y1={y0} x2={x - 8} y2={y0 - 12} strokeWidth={1.3} />
            })}
          </g>

          {areas.map((area, index) => {
            const segmentTop = [y0, y1, y2][index]
            const half = halves[index]
            const color = index === 0 && isStress ? BAD : SEGMENT_COLORS[index]
            return (
              <g key={index}>
                <rect
                  x={CX - half}
                  y={segmentTop}
                  width={half * 2}
                  height={heights[index]}
                  fill={color}
                  fillOpacity={index === 0 ? 0.2 : 0.14}
                  stroke={color}
                  strokeWidth={1.8}
                />
                <text x={CX} y={mids[index] + 3} textAnchor="middle" fontSize={8} fill={color}>
                  {index === 0 ? `A₁=${Math.round(area)}` : index === 1 ? 'A₂=350' : 'A₃=500'}
                </text>
                <text
                  x={CX - half - 8}
                  y={mids[index] + 3}
                  textAnchor="end"
                  fontSize={8}
                  fill={index === 0 && isStress ? BAD : MUTED}
                >
                  {index === 0 ? `N₁=${NORMAL_FORCES[index]} kN` : `N${index + 1}=${NORMAL_FORCES[index]} kN`}
                </text>
              </g>
            )
          })}

          <g stroke={LOAD} fill={LOAD}>
            <line
              x1={CX + Math.max(halves[0], halves[1]) + 18}
              y1={y1 - 30}
              x2={CX + Math.max(halves[0], halves[1]) + 18}
              y2={y1 - 5}
              strokeWidth={2}
            />
            <path
              d={`M${CX + Math.max(halves[0], halves[1]) + 13.5} ${y1 - 13} L${CX + Math.max(halves[0], halves[1]) + 18} ${y1 - 5} L${CX + Math.max(halves[0], halves[1]) + 22.5} ${y1 - 13}`}
              fill="none"
              strokeWidth={2}
            />
            <text x={CX + Math.max(halves[0], halves[1]) + 24} y={y1 - 36} fontSize={8.5}>
              Q = 10 kN
            </text>

            <line x1={CX + halves[2] + 18} y1={y3 - 30} x2={CX + halves[2] + 18} y2={y3 - 5} strokeWidth={2} />
            <path
              d={`M${CX + halves[2] + 13.5} ${y3 - 13} L${CX + halves[2] + 18} ${y3 - 5} L${CX + halves[2] + 22.5} ${y3 - 13}`}
              fill="none"
              strokeWidth={2}
            />
            <text x={CX + halves[2] + 24} y={y3 - 36} fontSize={8.5}>
              P = 18 kN
            </text>
          </g>

          <motion.g
            key={metric}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {isModel && (
              <>
                <ChartTitle>Siły normalne N [kN]</ChartTitle>
                <line x1={panelX} y1={214} x2={CHARTS.right} y2={214} stroke={MUTED} strokeWidth={1} />
                {NORMAL_FORCES.map((force, index) => {
                  const barY = 112 + index * 36
                  const color = SEGMENT_COLORS[index]
                  const width = (force / 30) * panelWidth * grow
                  return (
                    <g key={index}>
                      <rect x={panelX} y={barY} width={panelWidth} height={18} rx={2} fill={MUTED} opacity={0.08} />
                      <rect x={panelX} y={barY} width={width} height={18} rx={2} fill={color} opacity={0.62} />
                      <text x={panelX - 7} y={barY + 13} textAnchor="end" fontSize={8} fill={MUTED}>
                        N{index + 1}
                      </text>
                      <text x={panelX + width + 5} y={barY + 13} fontSize={8} fill={color}>
                        {force} kN
                      </text>
                    </g>
                  )
                })}
                <text x={panelX} y={240} fontSize={8.5} fill={MUTED}>
                  Odcinek 1 przenosi P + Q = 28 kN.
                </text>
                <text x={panelX} y={256} fontSize={8.5} fill={MUTED}>
                  Odcinki 2 i 3 przenoszą tylko P = 18 kN.
                </text>
              </>
            )}

            {isStress && (
              <>
                <ChartTitle>Naprężenia w odcinkach [MPa]</ChartTitle>
                <line
                  x1={stressAllowX}
                  y1={100}
                  x2={stressAllowX}
                  y2={216}
                  stroke={LIMIT}
                  strokeWidth={1}
                  strokeDasharray="5 4"
                />
                <text x={stressAllowX + 4} y={104} fontSize={8} fill={LIMIT}>
                  σ_dop = 120
                </text>
                {STRESSES.map((stress, index) => {
                  const barY = 112 + index * 36
                  const color = stress > 120 ? BAD : SEGMENT_COLORS[index]
                  const width = (stress / stressScale) * panelWidth * stressGrow
                  return (
                    <g key={index}>
                      <rect x={panelX} y={barY} width={panelWidth} height={18} rx={2} fill={MUTED} opacity={0.08} />
                      <rect x={panelX} y={barY} width={width} height={18} rx={2} fill={color} opacity={0.66} />
                      <text x={panelX - 7} y={barY + 13} textAnchor="end" fontSize={8} fill={MUTED}>
                        σ{['₁', '₂', '₃'][index]}
                      </text>
                      <text x={panelX + width + 5} y={barY + 13} fontSize={8} fill={color}>
                        {pl(stress)} MPa
                      </text>
                    </g>
                  )
                })}
                <text x={panelX} y={232} fontSize={8.5} fontWeight={600} fill={BAD}>
                  σ₁ = 140 MPa &gt; 120 MPa
                </text>
                <text x={panelX} y={248} fontSize={8.5} fill={MUTED}>
                  Najbardziej wytężony jest odcinek 1.
                </text>
              </>
            )}

            {isDelta && (
              <>
                <ChartTitle>Udziały w wydłużeniu [mm]</ChartTitle>
                <line
                  x1={elongationLimitX}
                  y1={100}
                  x2={elongationLimitX}
                  y2={184}
                  stroke={LIMIT}
                  strokeWidth={1}
                  strokeDasharray="5 4"
                />
                <text x={elongationLimitX + 4} y={104} fontSize={8} fill={LIMIT}>
                  ΔL_dop = 0,40
                </text>
                {ORIGINAL_DELTAS.map((delta, index) => {
                  const start = ORIGINAL_DELTAS.slice(0, index).reduce((sum, value) => sum + value, 0)
                  const x = panelX + (start / elongationScale) * panelWidth * deltaGrow
                  const width = (delta / elongationScale) * panelWidth * deltaGrow
                  return (
                    <g key={index}>
                      <rect x={x} y={120} width={width} height={26} fill={SEGMENT_COLORS[index]} opacity={0.66} />
                      <text x={x + width / 2} y={164} textAnchor="middle" fontSize={7.5} fill={MUTED}>
                        {pl(delta, 3)}
                      </text>
                    </g>
                  )
                })}
                <rect
                  x={panelX}
                  y={120}
                  width={panelWidth}
                  height={26}
                  rx={2}
                  fill="none"
                  stroke={MUTED}
                  strokeWidth={0.8}
                  opacity={0.5}
                />
                <text x={panelX} y={190} fontSize={8.5} fontWeight={600} fill={BAD}>
                  ΔL = 0,455 mm &gt; 0,40 mm
                </text>
                <text x={panelX} y={206} fontSize={8.5} fill={MUTED}>
                  Największy udział ma odcinek 1: 0,280 mm.
                </text>
              </>
            )}

            {isStrength && (
              <>
                <ChartTitle>Pole odcinka 1 [mm²]</ChartTitle>
                <line x1={panelX} y1={214} x2={CHARTS.right} y2={214} stroke={MUTED} strokeWidth={1} />
                {[
                  { label: 'A₁', value: area1, color: SEGMENT_COLORS[0], factor: 1 },
                  { label: 'A₁σ', value: 233.3, color: ACCENT, factor: strengthGrow },
                ].map((bar, index) => {
                  const barY = 112 + index * 40
                  const width = (bar.value / areaScale) * panelWidth * bar.factor
                  return (
                    <g key={bar.label}>
                      <rect x={panelX} y={barY} width={panelWidth} height={18} rx={2} fill={MUTED} opacity={0.08} />
                      <rect x={panelX} y={barY} width={width} height={18} rx={2} fill={bar.color} opacity={0.66} />
                      <text x={panelX - 7} y={barY + 13} textAnchor="end" fontSize={8} fill={MUTED}>
                        {bar.label}
                      </text>
                      <text x={panelX + width + 5} y={barY + 13} fontSize={8} fill={bar.color}>
                        {pl(bar.value)} mm²
                      </text>
                    </g>
                  )
                })}
                <text x={panelX} y={216} fontSize={8.5} fontWeight={600} fill={ACCENT}>
                  A₁σ = 28 000 / 120 = 233,3 mm²
                </text>
                <text x={panelX} y={232} fontSize={8.5} fill={MUTED}>
                  Wytrzymałość wymaga powiększenia odcinka 1.
                </text>
              </>
            )}

            {isStiffness && (
              <>
                <ChartTitle>Pole odcinka 1 [mm²]</ChartTitle>
                <line x1={panelX} y1={232} x2={CHARTS.right} y2={232} stroke={MUTED} strokeWidth={1} />
                {[
                  { label: 'A₁', value: area1, color: OK, factor: 1 },
                  { label: 'A₁σ', value: 233.3, color: ACCENT, factor: 1 },
                  { label: 'A₁δ', value: 248.9, color: LIMIT, factor: stiffnessGrow },
                ].map((bar, index) => {
                  const barY = 104 + index * 40
                  const width = (bar.value / areaScale) * panelWidth * bar.factor
                  return (
                    <g key={bar.label}>
                      <rect x={panelX} y={barY} width={panelWidth} height={18} rx={2} fill={MUTED} opacity={0.08} />
                      <rect x={panelX} y={barY} width={width} height={18} rx={2} fill={bar.color} opacity={0.66} />
                      <text x={panelX - 7} y={barY + 13} textAnchor="end" fontSize={8} fill={MUTED}>
                        {bar.label}
                      </text>
                      <text x={panelX + width + 5} y={barY + 13} fontSize={8} fill={bar.color}>
                        {pl(bar.value)} mm²
                      </text>
                    </g>
                  )
                })}
                <text x={panelX} y={248} fontSize={8.5} fontWeight={600} fill={LIMIT}>
                  A₁δ = 248,9 mm² &gt; 233,3 mm²
                </text>
                <text x={panelX} y={264} fontSize={8.5} fill={OK}>
                  decyduje sztywność, przyjmujemy A₁ = 250 mm²
                </text>
              </>
            )}

            {isCheck && (
              <>
                <ChartTitle>Sprawdzenie końcowe</ChartTitle>
                <text x={panelX} y={112} fontSize={8.5} fontWeight={600} fill={OK}>
                  σ₁ = 112 MPa ≤ 120 MPa
                </text>
                <rect x={panelX} y={120} width={panelWidth} height={10} rx={2} fill={MUTED} opacity={0.16} />
                <rect
                  x={panelX}
                  y={120}
                  width={(FINAL_STRESSES[0] / 130) * panelWidth * checkGrow}
                  height={10}
                  rx={2}
                  fill={OK}
                  opacity={0.7}
                />
                <line
                  x1={panelX + (120 / 130) * panelWidth}
                  y1={117}
                  x2={panelX + (120 / 130) * panelWidth}
                  y2={133}
                  stroke={LIMIT}
                  strokeWidth={1.4}
                />
                <text x={panelX} y={158} fontSize={8.5} fontWeight={600} fill={OK}>
                  ΔL = 0,400 mm ≤ 0,40 mm
                </text>
                <rect x={panelX} y={166} width={panelWidth} height={10} rx={2} fill={MUTED} opacity={0.16} />
                <rect
                  x={panelX}
                  y={166}
                  width={(0.4 / 0.45) * panelWidth * checkGrow}
                  height={10}
                  rx={2}
                  fill={OK}
                  opacity={0.7}
                />
                <line
                  x1={panelX + (0.4 / 0.45) * panelWidth}
                  y1={163}
                  x2={panelX + (0.4 / 0.45) * panelWidth}
                  y2={179}
                  stroke={LIMIT}
                  strokeWidth={1.4}
                />
                <text x={panelX} y={204} fontSize={8.5} fill={MUTED}>
                  0,224 + 0,103 + 0,072 ≈ 0,400 mm
                </text>
                <text x={panelX} y={228} fontSize={8.5} fontWeight={600} fill={OK}>
                  ✓ oba warunki spełnione po korekcie
                </text>
              </>
            )}
          </motion.g>
        </svg>
      </div>
    </div>
  )
}
