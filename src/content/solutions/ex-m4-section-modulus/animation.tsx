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

const SCALE = 1.55
const SECTION = {
  x: 76,
  top: 56,
  width: 120,
  height: 120,
}
const BOTTOM = SECTION.top + SECTION.height * SCALE
const RIGHT = SECTION.x + SECTION.width * SCALE
const NA = SECTION.top + 37.27 * SCALE
const WEB_X = SECTION.x + 50 * SCALE
const WEB_W = 20 * SCALE
const FLANGE_H = 20 * SCALE

const AXIS_X = 320
const STRESS_SCALE = 0.64
const SIGMA_D = 145.8
const SIGMA_G = 65.7
const ALLOW = 160
const BOTTOM_X = AXIS_X + SIGMA_D * STRESS_SCALE
const TOP_X = AXIS_X - SIGMA_G * STRESS_SCALE
const ALLOW_X = AXIS_X + ALLOW * STRESS_SCALE

const W_MAX = 160
const W_BAR_MAX = 118

const C_DISTANCE = BOTTOM - NA
const G_DISTANCE = NA - SECTION.top

export function SectionModulusExample1Animation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const draw = playing ? smooth(sceneProgress) : 1

  const showC = metric !== 'model'
  const showStress = metric === 'stress' || metric === 'check' || metric === 'result'
  const showW = metric === 'W'
  const showCheck = metric === 'check' || metric === 'result'

  const cg = G_DISTANCE * draw
  const cd = C_DISTANCE * draw

  const cBarD = (82.73 / 90) * W_BAR_MAX
  const cBarG = (37.27 / 90) * W_BAR_MAX
  const wBarD = (68.6 / W_MAX) * W_BAR_MAX
  const wBarG = (152.2 / W_MAX) * W_BAR_MAX

  const arrowLevels = Array.from({ length: 9 }, (_, index) => {
    const y = SECTION.top + 8 + index * ((BOTTOM - SECTION.top - 16) / 8)
    const above = y < NA
    const value = above ? ((NA - y) / (NA - SECTION.top)) * SIGMA_G : ((y - NA) / (BOTTOM - NA)) * SIGMA_D
    return { y, above, value }
  })

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          width={460}
          height={300}
          viewBox="0 0 460 300"
          role="img"
          aria-label="Teownik z osią obojętną, odległościami skrajnych włókien i liniowym rozkładem naprężeń zginających"
        >
          <defs>
            <marker
              id="m4s1-dim"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={MUTED} />
            </marker>
            <marker
              id="m4s1-stress"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={TENSION} />
            </marker>
            <marker
              id="m4s1-comp"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={ACCENT} />
            </marker>
          </defs>

          <text x={12} y={22} fontSize={10} fontWeight={600} fill={INK}>
            teownik 120 × 120 mm
          </text>
          <text x={12} y={37} fontSize={9} fill={MUTED}>
            I_x = 5,674·10⁶ mm⁴
          </text>

          {showStress &&
            [SECTION.top, NA, BOTTOM].map((y) => (
              <line
                key={`guide-${y}`}
                x1={RIGHT + 4}
                y1={y}
                x2={AXIS_X - 4}
                y2={y}
                stroke="#c9d0d9"
                strokeWidth={1}
                strokeDasharray="4 4"
              />
            ))}

          <g>
            <rect
              x={WEB_X}
              y={SECTION.top + FLANGE_H}
              width={WEB_W}
              height={SECTION.height * SCALE - FLANGE_H}
              fill="#edf1ff"
              stroke={EDGE}
              strokeWidth={1.4}
            />
            <rect
              x={SECTION.x}
              y={SECTION.top}
              width={SECTION.width * SCALE}
              height={FLANGE_H}
              fill="#f2f5fa"
              stroke={EDGE}
              strokeWidth={1.4}
            />
            <text x={SECTION.x + 8} y={SECTION.top + 14} fontSize={8} fill={MUTED}>
              półka
            </text>
            <text x={WEB_X + WEB_W + 6} y={BOTTOM - 8} fontSize={8} fill={MUTED}>
              środnik
            </text>
          </g>

          <motion.line
            x1={SECTION.x - 14}
            y1={NA}
            x2={RIGHT + 14}
            y2={NA}
            stroke={TENSION}
            strokeWidth={2}
            initial={{ pathLength: 0, opacity: 0.3 }}
            animate={{ pathLength: draw, opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
          <text x={RIGHT + 16} y={NA - 5} fontSize={8.5} fill={TENSION}>
            oś obojętna
          </text>

          <motion.g initial={false} animate={{ opacity: showC ? 1 : 0 }} transition={{ duration: 0.25 }}>
            <line
              x1={SECTION.x - 58}
              y1={SECTION.top}
              x2={SECTION.x}
              y2={SECTION.top}
              stroke="#d7dde4"
              strokeWidth={1}
            />
            <line x1={SECTION.x - 58} y1={BOTTOM} x2={SECTION.x} y2={BOTTOM} stroke="#d7dde4" strokeWidth={1} />
            <line x1={SECTION.x - 58} y1={NA} x2={SECTION.x} y2={NA} stroke="#e4c9bf" strokeWidth={1} />
            <line
              x1={SECTION.x - 44}
              y1={NA}
              x2={SECTION.x - 44}
              y2={NA - cg}
              stroke={MUTED}
              strokeWidth={1.2}
              markerEnd="url(#m4s1-dim)"
            />
            <line
              x1={SECTION.x - 44}
              y1={NA}
              x2={SECTION.x - 44}
              y2={NA + cd}
              stroke={MUTED}
              strokeWidth={1.2}
              markerEnd="url(#m4s1-dim)"
            />
            <motion.g initial={false} animate={{ opacity: draw > 0.55 ? 1 : 0 }} transition={{ duration: 0.2 }}>
              <text x={SECTION.x - 49} y={(SECTION.top + NA) / 2 - 3} textAnchor="end" fontSize={8.5} fill={MUTED}>
                c_g
              </text>
              <text x={SECTION.x - 49} y={(SECTION.top + NA) / 2 + 8} textAnchor="end" fontSize={9} fill={INK}>
                37,27
              </text>
              <text x={SECTION.x - 49} y={(NA + BOTTOM) / 2 - 3} textAnchor="end" fontSize={8.5} fill={MUTED}>
                c_d
              </text>
              <text x={SECTION.x - 49} y={(NA + BOTTOM) / 2 + 8} textAnchor="end" fontSize={9} fill={INK}>
                82,73
              </text>
              <text x={SECTION.x - 49} y={(NA + BOTTOM) / 2 + 19} textAnchor="end" fontSize={8} fill={MUTED}>
                mm
              </text>
            </motion.g>
          </motion.g>

          {showStress && (
            <g>
              <text x={AXIS_X} y={48} textAnchor="middle" fontSize={9} fill={MUTED}>
                rozkład σ
              </text>
              <line x1={AXIS_X} y1={SECTION.top} x2={AXIS_X} y2={BOTTOM} stroke={EDGE} strokeWidth={1.3} />
              <motion.path
                d={`M ${AXIS_X} ${NA} L ${TOP_X} ${SECTION.top} L ${AXIS_X} ${SECTION.top} Z`}
                fill={ACCENT}
                fillOpacity={0.16}
                stroke={ACCENT}
                strokeWidth={1.6}
                initial={{ pathLength: 0, opacity: 0.2 }}
                animate={{ pathLength: draw, opacity: 1 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
              />
              <motion.path
                d={`M ${AXIS_X} ${NA} L ${BOTTOM_X} ${BOTTOM} L ${AXIS_X} ${BOTTOM} Z`}
                fill={TENSION}
                fillOpacity={0.16}
                stroke={TENSION}
                strokeWidth={1.6}
                initial={{ pathLength: 0, opacity: 0.2 }}
                animate={{ pathLength: draw, opacity: 1 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
              />

              {arrowLevels.map((arrow, index) => {
                const amount = clamp01((draw - index * 0.035) / 0.65)
                const length = arrow.value * STRESS_SCALE * amount
                const x2 = arrow.above ? AXIS_X - length : AXIS_X + length
                return (
                  <line
                    key={`arrow-${index}`}
                    x1={AXIS_X}
                    y1={arrow.y}
                    x2={x2}
                    y2={arrow.y}
                    stroke={arrow.above ? ACCENT : TENSION}
                    strokeWidth={1.5}
                    markerEnd={amount > 0.55 ? (arrow.above ? 'url(#m4s1-comp)' : 'url(#m4s1-stress)') : undefined}
                  />
                )
              })}

              <motion.g initial={false} animate={{ opacity: draw > 0.55 ? 1 : 0 }} transition={{ duration: 0.2 }}>
                <text x={TOP_X - 2} y={SECTION.top - 5} textAnchor="end" fontSize={8.5} fill={ACCENT}>
                  65,7 MPa
                </text>
                <text x={BOTTOM_X} y={BOTTOM + 20} textAnchor="middle" fontSize={8.5} fill={TENSION}>
                  145,8 MPa
                </text>
                <text x={AXIS_X - 4} y={BOTTOM + 16} textAnchor="end" fontSize={8} fill={MUTED}>
                  zero
                </text>
              </motion.g>

              {showCheck && (
                <motion.g initial={false} animate={{ opacity: draw > 0.5 ? 1 : 0 }} transition={{ duration: 0.2 }}>
                  <line
                    x1={ALLOW_X}
                    y1={SECTION.top - 8}
                    x2={ALLOW_X}
                    y2={BOTTOM + 8}
                    stroke={OK}
                    strokeWidth={1.3}
                    strokeDasharray="4 3"
                  />
                  <text x={ALLOW_X + 3} y={SECTION.top - 12} fontSize={8} fill={OK}>
                    σ_dop
                  </text>
                </motion.g>
              )}

              {metric === 'result' && (
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15, duration: 0.3 }}>
                  <motion.circle
                    cx={BOTTOM_X}
                    cy={BOTTOM}
                    r={5}
                    fill={TENSION}
                    animate={playing ? { scale: [0.8, 1.25, 0.8], opacity: [0.5, 1, 0.5] } : { scale: 1, opacity: 1 }}
                    transition={{ duration: 1.6, repeat: playing ? Infinity : 0, ease: 'easeInOut' }}
                    style={{ transformOrigin: `${BOTTOM_X}px ${BOTTOM}px` }}
                  />
                </motion.g>
              )}
            </g>
          )}

          {showW && (
            <g>
              <text x={280} y={50} fontSize={10} fontWeight={600} fill={MODULUS}>
                W = I / c
              </text>
              <text x={280} y={64} fontSize={8} fill={MUTED}>
                ta sama wartość I, różne c
              </text>

              <text x={280} y={92} fontSize={8.5} fill={INK}>
                dolna krawędź
              </text>
              <text x={280} y={104} fontSize={8} fill={MUTED}>
                c_d = 82,73 mm
              </text>
              <rect x={280} y={108} width={cBarD * draw} height={6} rx={3} fill={MUTED} fillOpacity={0.4} />
              <text x={280} y={128} fontSize={8} fill={MODULUS}>
                W_d = 68,6·10³ mm³
              </text>
              <motion.rect
                x={280}
                y={132}
                height={10}
                rx={4}
                fill={MODULUS}
                fillOpacity={0.3}
                stroke={MODULUS}
                strokeWidth={1.2}
                initial={{ width: 0 }}
                animate={{ width: wBarD * draw }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              />

              <text x={280} y={168} fontSize={8.5} fill={INK}>
                górna krawędź
              </text>
              <text x={280} y={180} fontSize={8} fill={MUTED}>
                c_g = 37,27 mm
              </text>
              <rect x={280} y={184} width={cBarG * draw} height={6} rx={3} fill={MUTED} fillOpacity={0.4} />
              <text x={280} y={204} fontSize={8} fill={MODULUS}>
                W_g = 152,2·10³ mm³
              </text>
              <motion.rect
                x={280}
                y={208}
                height={10}
                rx={4}
                fill={MODULUS}
                fillOpacity={0.3}
                stroke={MODULUS}
                strokeWidth={1.2}
                initial={{ width: 0 }}
                animate={{ width: wBarG * draw }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              />

              <text x={280} y={240} fontSize={8} fill={MUTED}>
                większa odległość c daje mniejszy W
              </text>
              <text x={280} y={254} fontSize={8} fill={MUTED}>
                i większe naprężenie przy tym samym M
              </text>
            </g>
          )}

          {metric === 'model' && (
            <text x={12} y={276} fontSize={9} fill={INK}>
              oś obojętna przechodzi przez środek ciężkości przekroju
            </text>
          )}
          {metric === 'c' && (
            <text x={12} y={276} fontSize={9} fill={INK}>
              dolna krawędź leży dalej od osi niż górna
            </text>
          )}
          {metric === 'stress' && (
            <text x={12} y={276} fontSize={9} fill={INK}>
              naprężenie rośnie liniowo od zera na osi obojętnej
            </text>
          )}
          {metric === 'W' && (
            <text x={12} y={276} fontSize={9} fill={INK}>
              mniejszy wskaźnik W odpowiada stronie krytycznej
            </text>
          )}
          {metric === 'check' && (
            <text x={12} y={276} fontSize={9} fill={OK}>
              σ_d = 145,8 MPa &lt; σ_dop = 160 MPa
            </text>
          )}
          {metric === 'result' && (
            <text x={12} y={276} fontSize={9} fill={TENSION}>
              decyduje dolna krawędź: większe c, mniejsze W, większe σ
            </text>
          )}
        </svg>
      </div>
    </div>
  )
}
