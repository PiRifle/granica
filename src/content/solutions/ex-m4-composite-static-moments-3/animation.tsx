import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const METRICS = ['model', 'areas', 'plate-moment', 'balance', 'solve', 'check'] as const
type Metric = (typeof METRICS)[number]

const AXIS = '#b7c0cb'
const MUTED = '#87929d'
const INK = '#17202a'
const PLATE = '#4f6df5'
const HOLE = '#ff8a5c'
const TARGET = '#ff6b45'
const NET = '#a970dd'
const CHECK = '#2f9e6d'
const EDGE = '#68727e'

const PLATE_WIDTH = 200
const PLATE_HEIGHT = 120
const HOLE_RADIUS = 30
const HOLE_AREA = 2827.43
const NET_AREA = 21172.57
const PLATE_MOMENT = 2400000
const TARGET_CENTROID = 95
const TARGET_HOLE = 137.4
const ALTERNATE_HOLE = 174.9

const SCALE = 1.35
const OX = 60
const OY = 230
const px = (value: number) => OX + value * SCALE
const py = (value: number) => OY - value * SCALE

const GAUGE_ZERO = 150
const GAUGE_WIDTH = 220

const clamp = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp(value)
  return t * t * (3 - 2 * t)
}

export function CompositeStaticMoments3Animation({ scene, index, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const metricIndex = METRICS.indexOf(metric as Metric)
  const stage = metricIndex >= 0 ? metricIndex : Math.min(index, METRICS.length - 1)
  const reveal = playing ? smooth(sceneProgress) : 1

  const holeX = stage >= 5 ? TARGET_HOLE : stage === 4 ? 100 + (TARGET_HOLE - 100) * reveal : 100
  const activeHole = stage >= 4 ? holeX : stage >= 3 ? TARGET_HOLE : 100
  const holeMoment = HOLE_AREA * activeHole
  const netMoment = PLATE_MOMENT - holeMoment
  const netX = netMoment / NET_AREA

  const plateBar = GAUGE_WIDTH * (stage === 2 ? reveal : 1)
  const holeBar = (GAUGE_WIDTH * holeMoment) / PLATE_MOMENT
  const netBar = (GAUGE_WIDTH * netMoment) / PLATE_MOMENT
  const solved = stage >= 4 && reveal > 0.82

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 300"
          role="img"
          aria-label="Płyta 200 na 120 mm z kołowym otworem o średnicy 60 mm. Animacja pokazuje pole dodatnie i ujemne, odejmowanie momentu otworu oraz przesuwanie otworu tak, aby środek ciężkości wypadł 95 mm od lewej krawędzi."
        >
          <defs>
            <marker
              id="m4s3-axis"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={AXIS} />
            </marker>
            <marker
              id="m4s3-arm"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={PLATE} />
            </marker>
          </defs>

          <motion.rect
            x={px(0)}
            y={py(PLATE_HEIGHT)}
            width={PLATE_WIDTH * SCALE}
            height={PLATE_HEIGHT * SCALE}
            rx={2}
            fill={PLATE}
            fillOpacity={0.12}
            stroke={PLATE}
            strokeWidth={1.8}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />

          <circle
            cx={px(holeX)}
            cy={py(60)}
            r={HOLE_RADIUS * SCALE}
            fill="#fff"
            stroke={stage === 0 ? MUTED : EDGE}
            strokeWidth={1.6}
            strokeDasharray={stage === 0 ? '5 4' : undefined}
          />

          <line
            x1={px(0)}
            y1={py(60)}
            x2={px(PLATE_WIDTH)}
            y2={py(60)}
            stroke={AXIS}
            strokeWidth={1}
            strokeDasharray="5 4"
            opacity={stage <= 2 ? 0.9 : 0.35}
          />
          <text x={px(PLATE_WIDTH) + 8} y={py(60) + 3} fontSize={8.5} fill={MUTED} opacity={stage <= 2 ? 1 : 0.4}>
            oś symetrii
          </text>

          <g>
            <motion.line
              x1={px(0) - 12}
              y1={py(0)}
              x2={px(PLATE_WIDTH) + 24}
              y2={py(0)}
              stroke={AXIS}
              strokeWidth={1.4}
              markerEnd="url(#m4s3-axis)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.line
              x1={px(0)}
              y1={py(0) + 10}
              x2={px(0)}
              y2={py(PLATE_HEIGHT) - 22}
              stroke={AXIS}
              strokeWidth={1.4}
              markerEnd="url(#m4s3-axis)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            />
            <text x={px(PLATE_WIDTH) + 28} y={py(0) + 4} fontSize={11} fill={MUTED}>
              x
            </text>
            <text x={px(0) - 13} y={py(PLATE_HEIGHT) - 26} fontSize={11} fill={MUTED}>
              y
            </text>
            <text x={px(0) - 9} y={py(0) + 14} fontSize={10} fill={MUTED}>
              O
            </text>
          </g>

          <g opacity={stage <= 1 ? 0.9 : 0.12}>
            <line x1={px(0)} y1={py(0) + 30} x2={px(PLATE_WIDTH)} y2={py(0) + 30} stroke={MUTED} strokeWidth={1} />
            <line x1={px(0)} y1={py(0) + 25} x2={px(0)} y2={py(0) + 35} stroke={MUTED} strokeWidth={1} />
            <line
              x1={px(PLATE_WIDTH)}
              y1={py(0) + 25}
              x2={px(PLATE_WIDTH)}
              y2={py(0) + 35}
              stroke={MUTED}
              strokeWidth={1}
            />
            <text x={(px(0) + px(PLATE_WIDTH)) / 2} y={py(0) + 44} textAnchor="middle" fontSize={9} fill={MUTED}>
              200 mm
            </text>

            <line x1={px(0) - 26} y1={py(0)} x2={px(0) - 26} y2={py(PLATE_HEIGHT)} stroke={MUTED} strokeWidth={1} />
            <line x1={px(0) - 31} y1={py(0)} x2={px(0) - 21} y2={py(0)} stroke={MUTED} strokeWidth={1} />
            <line
              x1={px(0) - 31}
              y1={py(PLATE_HEIGHT)}
              x2={px(0) - 21}
              y2={py(PLATE_HEIGHT)}
              stroke={MUTED}
              strokeWidth={1}
            />
            <text x={px(0) - 31} y={(py(0) + py(PLATE_HEIGHT)) / 2 + 3} textAnchor="end" fontSize={9} fill={MUTED}>
              120
            </text>
          </g>

          <motion.line
            x1={px(TARGET_CENTROID)}
            y1={20}
            x2={px(TARGET_CENTROID)}
            y2={py(0) + 10}
            stroke={TARGET}
            strokeWidth={1.5}
            strokeDasharray="5 4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          />
          <text x={px(TARGET_CENTROID)} y={14} textAnchor="middle" fontSize={9} fontWeight={700} fill={TARGET}>
            xC = 95
          </text>

          {stage === 0 && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35, duration: 0.4 }}>
              <text x={px(100)} y={py(60) + 4} textAnchor="middle" fontSize={10} fontWeight={700} fill={MUTED}>
                xh = ?
              </text>
              <text x={px(100)} y={py(60) + 18} textAnchor="middle" fontSize={8} fill={MUTED}>
                ∅60
              </text>
            </motion.g>
          )}

          <motion.g initial={{ opacity: 0 }} animate={{ opacity: stage >= 1 ? 1 : 0 }} transition={{ duration: 0.4 }}>
            <text x={px(12)} y={py(108)} fontSize={9} fontWeight={600} fill={PLATE}>
              + płyta 200 × 120
            </text>
            <text x={px(12)} y={py(96)} fontSize={9} fontWeight={600} fill={PLATE}>
              Ap = 24 000 mm²
            </text>
            <text x={px(holeX) + HOLE_RADIUS * SCALE + 10} y={py(60) + 3} fontSize={9} fontWeight={600} fill={HOLE}>
              − Ah = 2827,43 mm²
            </text>
            <text x={px(holeX)} y={py(78)} textAnchor="middle" fontSize={15} fontWeight={700} fill={HOLE}>
              −
            </text>
          </motion.g>

          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: stage >= 1 ? 1 : 0 }}
            transition={{ delay: 0.12, duration: 0.4 }}
          >
            <circle cx={px(100)} cy={py(60)} r={4} fill="#fff" stroke={PLATE} strokeWidth={1.6} />
            <text x={px(100) + 7} y={py(60) - 7} fontSize={9} fontWeight={700} fill={PLATE}>
              P
            </text>
          </motion.g>

          {stage >= 2 && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>
              <motion.line
                x1={px(0)}
                y1={py(60)}
                x2={px(100)}
                y2={py(60)}
                stroke={PLATE}
                strokeWidth={2.2}
                markerEnd="url(#m4s3-arm)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              />
              <text x={px(50)} y={py(60) - 9} textAnchor="middle" fontSize={9} fontWeight={700} fill={PLATE}>
                xp = 100 mm
              </text>
            </motion.g>
          )}

          {stage >= 2 && (
            <g>
              <line x1={GAUGE_ZERO} y1={238} x2={GAUGE_ZERO} y2={292} stroke={MUTED} strokeWidth={1} />
              <text x={GAUGE_ZERO - 4} y={294} textAnchor="end" fontSize={8} fill={MUTED}>
                0
              </text>

              <motion.rect
                x={GAUGE_ZERO}
                y={246}
                height={6}
                rx={2}
                width={plateBar}
                fill={PLATE}
                initial={false}
                animate={{ width: plateBar }}
                transition={{ duration: 0.15, ease: 'linear' }}
              />
              <text x={GAUGE_ZERO + 4} y={242} fontSize={8} fontWeight={600} fill={PLATE}>
                Syp = Ap · xp
              </text>
              {stage === 3 && (
                <text x={GAUGE_ZERO + 190} y={242} textAnchor="end" fontSize={8} fill={MUTED}>
                  warunek docelowy
                </text>
              )}

              {stage >= 3 && (
                <g>
                  <motion.rect
                    x={GAUGE_ZERO - holeBar}
                    y={262}
                    width={holeBar}
                    height={6}
                    rx={2}
                    fill={HOLE}
                    initial={false}
                    animate={{ width: holeBar }}
                    transition={{ duration: 0.15, ease: 'linear' }}
                  />
                  <text x={GAUGE_ZERO + 4} y={258} fontSize={8} fontWeight={600} fill={HOLE}>
                    − Ah · xh
                  </text>

                  <motion.rect
                    x={GAUGE_ZERO}
                    y={278}
                    height={6}
                    rx={2}
                    width={netBar}
                    fill={NET}
                    initial={false}
                    animate={{ width: netBar }}
                    transition={{ duration: 0.15, ease: 'linear' }}
                  />
                  <text x={GAUGE_ZERO + 4} y={274} fontSize={8} fontWeight={600} fill={NET}>
                    Sy = A · xC
                  </text>
                </g>
              )}
            </g>
          )}

          {(stage === 4 || stage === 5) && (
            <g>
              <line x1={px(0)} y1={py(15)} x2={px(holeX)} y2={py(15)} stroke={HOLE} strokeWidth={1.2} />
              <line x1={px(0)} y1={py(15) - 4} x2={px(0)} y2={py(15) + 4} stroke={HOLE} strokeWidth={1.2} />
              <line x1={px(holeX)} y1={py(15) - 4} x2={px(holeX)} y2={py(15) + 4} stroke={HOLE} strokeWidth={1.2} />
              <text
                x={(px(0) + px(holeX)) / 2}
                y={py(15) + 12}
                textAnchor="middle"
                fontSize={9}
                fontWeight={700}
                fill={HOLE}
              >
                {solved ? 'xh = 137,4 mm' : 'xh = ?'}
              </text>
            </g>
          )}

          {stage >= 4 && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>
              <circle cx={px(netX)} cy={py(60)} r={4.2} fill={TARGET} stroke="#fff" strokeWidth={1.1} />
              <text x={px(netX) - 8} y={py(60) + 14} textAnchor="end" fontSize={9.5} fontWeight={700} fill={TARGET}>
                C
              </text>
              <text x={px(100) + 5} y={py(60) + 16} fontSize={8} fill={PLATE}>
                xp = 100
              </text>
            </motion.g>
          )}

          {stage >= 5 && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45 }}>
              <line x1={px(107.4)} y1={50} x2={px(167.4)} y2={50} stroke={CHECK} strokeWidth={1.3} />
              <line x1={px(107.4)} y1={45} x2={px(107.4)} y2={55} stroke={CHECK} strokeWidth={1.3} />
              <line x1={px(167.4)} y1={45} x2={px(167.4)} y2={55} stroke={CHECK} strokeWidth={1.3} />
              <text x={px(137.4)} y={42} textAnchor="middle" fontSize={8.5} fontWeight={600} fill={CHECK}>
                107,4 … 167,4 mm
              </text>
              <text x={px(167.4) + 9} y={54} fontSize={13} fontWeight={700} fill={CHECK}>
                ✓
              </text>

              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: reveal > 0.55 ? 0.42 : 0 }}
                transition={{ duration: 0.5 }}
              >
                <circle
                  cx={px(ALTERNATE_HOLE)}
                  cy={py(60)}
                  r={HOLE_RADIUS * SCALE}
                  fill="none"
                  stroke="#d84f28"
                  strokeWidth={1.4}
                  strokeDasharray="5 4"
                />
                <text x={px(PLATE_WIDTH) + 10} y={82} fontSize={8.5} fontWeight={600} fill="#d84f28">
                  xC = 90 → poza płytą
                </text>
              </motion.g>
            </motion.g>
          )}

          <text x={12} y={22} fontSize={9} fill={MUTED}>
            płyta 200 × 120
          </text>
          <text x={12} y={35} fontSize={9} fill={MUTED}>
            otwór ∅60
          </text>
          <text x={12} y={48} fontSize={9} fill={MUTED}>
            xC = 95 mm
          </text>
        </svg>
      </div>
    </div>
  )
}
