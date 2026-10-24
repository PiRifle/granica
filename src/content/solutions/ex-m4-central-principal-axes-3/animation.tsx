import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const SECTION = '#e3eaf3'
const EDGE = '#7d8fa5'
const AXIS = '#6d7a88'
const MUTED = '#9aa5b1'
const I1 = '#d84f28'
const I2 = '#4f6df5'
const ANGLE = '#2e9e6b'
const INK = '#17202a'

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}
const rad = (degrees: number) => (degrees * Math.PI) / 180

const SCALE = 1.5
const CX = 230
const CY = 150
const AXIS_LENGTH = 102
const THETA_1 = 37.8
const CENTROID = { u: 32.727, v: 29.364 }
const RAW_SECTION: Array<[number, number]> = [
  [0, 0],
  [90, 0],
  [90, 26],
  [30, 26],
  [30, 80],
  [0, 80],
]

const screenPoint = (u: number, v: number, degrees = THETA_1) => ({
  x: CX + SCALE * (u * Math.cos(rad(degrees)) - v * Math.sin(rad(degrees))),
  y: CY - SCALE * (u * Math.sin(rad(degrees)) + v * Math.cos(rad(degrees))),
})

const section = RAW_SECTION.map(([u, v]) => screenPoint(u - CENTROID.u, v - CENTROID.v))
  .map(({ x, y }) => `${x.toFixed(1)},${y.toFixed(1)}`)
  .join(' ')

const point = (degrees: number, length = AXIS_LENGTH) => ({
  x: CX + length * Math.cos(rad(degrees)),
  y: CY - length * Math.sin(rad(degrees)),
})

const arcPath = (start: number, end: number, radius: number) => {
  const a = point(start, radius)
  const b = point(end, radius)
  const large = Math.abs(end - start) > 180 ? 1 : 0
  const sweep = end > start ? 0 : 1
  return `M${a.x} ${a.y} A${radius} ${radius} 0 ${large} ${sweep} ${b.x} ${b.y}`
}

const IxAt = (degrees: number) => 30 + 5 * Math.cos(rad(2 * degrees)) + 19.36 * Math.sin(rad(2 * degrees))

export function InversePrincipalAxesAnimation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'given'
  const progress = smooth(playing ? sceneProgress : 1)
  const rotating = metric === 'rotate'
  const principal = metric === 'principal' || metric === 'result'
  const angle = rotating ? THETA_1 * progress : principal ? THETA_1 : 0
  const showRotated = rotating || principal
  const p1 = point(angle)
  const p2 = point(angle - 90)
  const p1Back = point(angle + 180)
  const p2Back = point(angle + 90)

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 300"
          role="img"
          aria-label="Schematyczny przekrój niesymetryczny. Animacja pokazuje odtworzenie momentu Iy i momentu dewiacyjnego, a następnie obrót układu o kąt 37,8 stopnia do osi głównych z momentami I1 i I2."
        >
          <motion.polygon
            points={section}
            fill={SECTION}
            stroke={EDGE}
            strokeWidth={1.6}
            initial={{ opacity: 0.3 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
          <text x={14} y={286} fontSize={9} fill={MUTED}>
            kształt schematyczny — dane są momentami bezwładności
          </text>

          <g
            stroke={AXIS}
            strokeWidth={showRotated ? 1.2 : 1.7}
            strokeDasharray={showRotated ? '5 4' : undefined}
            opacity={showRotated ? 0.45 : 0.9}
          >
            <line x1={CX - AXIS_LENGTH} y1={CY} x2={CX + AXIS_LENGTH} y2={CY} />
            <line x1={CX} y1={CY - AXIS_LENGTH} x2={CX} y2={CY + AXIS_LENGTH} />
          </g>

          {!showRotated && (
            <g fontSize={10} fill={AXIS}>
              <text x={CX + AXIS_LENGTH + 5} y={CY + 3}>
                x
              </text>
              <text x={CX + 5} y={CY - AXIS_LENGTH - 5}>
                y
              </text>
            </g>
          )}

          {metric === 'given' && (
            <g fontSize={10} fill={INK}>
              <text x={14} y={24}>
                I₁ = 50·10⁶ mm⁴
              </text>
              <text x={14} y={39}>
                I₂ = 10·10⁶ mm⁴
              </text>
              <text x={14} y={54}>
                I_x = 35·10⁶ mm⁴
              </text>
              <text x={14} y={72} fontSize={9} fill={MUTED}>
                szukamy I_y, I_xy i kąta θ
              </text>
            </g>
          )}

          {metric === 'sum' && (
            <g>
              <text x={14} y={24} fontSize={10} fill={INK}>
                I_y = 25·10⁶ mm⁴
              </text>
              <text x={CX + AXIS_LENGTH - 2} y={CY - 10} textAnchor="end" fontSize={9} fill={INK}>
                I_x = 35·10⁶
              </text>
              <text x={CX + 8} y={CY - AXIS_LENGTH + 2} fontSize={9} fill={INK}>
                I_y = 25·10⁶
              </text>
            </g>
          )}

          {metric === 'Ixy' && (
            <g>
              <text x={14} y={24} fontSize={10} fill={INK}>
                |I_xy| = 19,36·10⁶ mm⁴
              </text>
              <text x={14} y={39} fontSize={9} fill={MUTED}>
                znak zależy od kierunku obrotu
              </text>
              <path
                d={`M${CX - 30} ${CY + 30} A38 38 0 0 1 ${CX + 30} ${CY + 30}`}
                fill="none"
                stroke={ANGLE}
                strokeWidth={1.5}
                strokeDasharray="4 3"
              />
              <text x={CX} y={CY + 52} textAnchor="middle" fontSize={9} fill={ANGLE}>
                sprzężenie osi x i y
              </text>
            </g>
          )}

          {rotating && (
            <g>
              <line
                x1={point(THETA_1 + 180).x}
                y1={point(THETA_1 + 180).y}
                x2={point(THETA_1).x}
                y2={point(THETA_1).y}
                stroke={I1}
                strokeWidth={1.3}
                strokeDasharray="5 4"
                opacity={0.35}
              />
              <text x={point(THETA_1).x + 6} y={point(THETA_1).y - 6} fontSize={9} fill={I1} opacity={0.5}>
                cel: I₁
              </text>
              <text x={14} y={24} fontSize={10} fill={INK}>
                I_x′ ≈ {IxAt(angle).toFixed(1)}·10⁶ mm⁴
              </text>
            </g>
          )}

          {showRotated && (
            <g>
              <line
                x1={p1Back.x}
                y1={p1Back.y}
                x2={p1.x}
                y2={p1.y}
                stroke={I1}
                strokeWidth={2.6}
                strokeLinecap="round"
              />
              <line
                x1={p2Back.x}
                y1={p2Back.y}
                x2={p2.x}
                y2={p2.y}
                stroke={I2}
                strokeWidth={2.6}
                strokeLinecap="round"
              />
              <circle cx={CX} cy={CY} r={4.5} fill={INK} />

              {angle > 2 && (
                <g>
                  <path d={arcPath(0, angle, 46)} fill="none" stroke={ANGLE} strokeWidth={1.6} />
                  <text
                    x={point(angle / 2, 64).x}
                    y={point(angle / 2, 64).y}
                    fontSize={10}
                    fill={ANGLE}
                    textAnchor="middle"
                  >
                    θ = {angle.toFixed(1)}°
                  </text>
                </g>
              )}

              {!principal && (
                <g fontSize={10} fill={INK}>
                  <text x={p1.x + 6} y={p1.y - 6}>
                    x′
                  </text>
                  <text x={p2.x + 6} y={p2.y + 12}>
                    y′
                  </text>
                </g>
              )}

              {principal && (
                <motion.g
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.35 }}
                  fontSize={10}
                >
                  {metric === 'principal' && (
                    <text x={14} y={24} fill={I1} fontWeight={600}>
                      θ = 37,8°, I_xy = 0
                    </text>
                  )}
                  <text x={p1.x + 7} y={p1.y - 7} fill={I1} fontWeight={600}>
                    x₁ (I₁)
                  </text>
                  <text x={p1.x + 7} y={p1.y + 8} fill={I1} fontSize={9}>
                    50·10⁶ mm⁴
                  </text>
                  <text x={p2.x + 7} y={p2.y + 13} fill={I2} fontWeight={600}>
                    x₂ (I₂)
                  </text>
                  <text x={p2.x + 7} y={p2.y + 28} fill={I2} fontSize={9}>
                    10·10⁶ mm⁴
                  </text>
                </motion.g>
              )}

              {metric === 'result' && (
                <g>
                  <line
                    x1={point(-THETA_1 + 180).x}
                    y1={point(-THETA_1 + 180).y}
                    x2={point(-THETA_1).x}
                    y2={point(-THETA_1).y}
                    stroke={MUTED}
                    strokeWidth={1.2}
                    strokeDasharray="4 4"
                    opacity={0.55}
                  />
                  <line
                    x1={point(-THETA_1 + 90).x}
                    y1={point(-THETA_1 + 90).y}
                    x2={point(-THETA_1 - 90).x}
                    y2={point(-THETA_1 - 90).y}
                    stroke={MUTED}
                    strokeWidth={1.2}
                    strokeDasharray="4 4"
                    opacity={0.55}
                  />
                  <text x={point(-THETA_1).x + 6} y={point(-THETA_1).y + 14} fontSize={8} fill={MUTED}>
                    wariant +I_xy
                  </text>
                  <text x={14} y={24} fontSize={9} fill={MUTED}>
                    znak I_xy wybiera kierunek obrotu
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
