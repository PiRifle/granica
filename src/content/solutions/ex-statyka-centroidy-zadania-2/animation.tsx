import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const MATERIAL = '#dfe7ff'
const CUT = '#b56b3a'
const CUT_FILL = '#ffffff'
const AXIS = '#9aa5b1'
const MUTED = '#87929d'
const OK = '#2f7d5b'
const INK = '#17202a'
const ACCENT = '#a970dd'
const RESULT = '#ff6b45'

const CX = 185
const CY = 158
const S = 4.2
const R = 25 * S
const HALF = 10 * S
const RIGHT = 10 * S

const slotPath = `M ${CX + RIGHT} ${CY - HALF} L ${CX} ${CY - HALF} A ${HALF} ${HALF} 0 0 0 ${CX} ${CY + HALF} L ${CX + RIGHT} ${CY + HALF} Z`

const status = [
  'Koło R = 25 mm; szczelina: prostokąt 10 × 20 i półkole r = 10',
  'A_w = 357,08 mm²; A = 1606,42 mm²',
  'x_w = 333,33 / 357,08 = 0,933 mm',
  'x_C = −333,33 / 1606,42 = −0,208 mm',
  'Symetria względem osi x ⇒ y_C = 0',
  'a rośnie ⇒ x_C staje się bardziej ujemne',
]

const insetX = (mm: number) => 366 + 44 * mm

export function SlotCentroidAnimation({ index }: SolutionAnimationProps) {
  const showAreas = index >= 1
  const showCut = index >= 2
  const showNet = index >= 3
  const showSymmetry = index >= 4
  const showVariants = index >= 5

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg viewBox="0 0 460 340" role="img" aria-label="Centroid koła ze szczeliną prostokątno-półkolistą">
          <title>Koło ze szczeliną i jego centroid</title>
          <desc>Koło R = 25 mm, szczelina z prostokąta i półkola, pola, momenty i centroid.</desc>
          <defs>
            <mask id="ex-cen2-mask">
              <rect x="0" y="0" width="460" height="340" fill="black" />
              <circle cx={CX} cy={CY} r={R} fill="white" />
              <path d={slotPath} fill="black" />
            </mask>
            <marker
              id="ex-cen2-arrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={OK} />
            </marker>
          </defs>

          <circle cx={CX} cy={CY} r={R} fill={MATERIAL} mask="url(#ex-cen2-mask)" />
          <path d={slotPath} fill={CUT_FILL} stroke={CUT} strokeWidth="1.5" strokeLinejoin="round" />

          <line
            x1={CX - R - 22}
            y1={CY}
            x2={CX + R + 8}
            y2={CY}
            stroke={showSymmetry ? OK : AXIS}
            strokeWidth={showSymmetry ? 2 : 1.2}
            strokeDasharray="5 4"
          />
          <line
            x1={CX}
            y1={CY - R - 22}
            x2={CX}
            y2={CY + R + 22}
            stroke={AXIS}
            strokeWidth="1.2"
            strokeDasharray="5 4"
          />
          <g fontSize="12" fill={INK}>
            <text x={CX + R + 2} y={CY - 8}>
              x
            </text>
            <text x={CX + 7} y={CY - R - 14}>
              y
            </text>
            <text x={CX - 14} y={CY + 18}>
              O
            </text>
          </g>

          <g stroke={MUTED} strokeWidth="1" fill={MUTED}>
            <line x1={CX} y1={CY - 44} x2={CX - 74} y2={CY - 74} />
            <text x={CX - 112} y={CY - 96} fontSize="10.5">
              R = 25
            </text>
            <line x1={CX} y1={CY - HALF - 18} x2={CX + RIGHT} y2={CY - HALF - 18} />
            <line x1={CX} y1={CY - HALF - 22} x2={CX} y2={CY - HALF - 14} />
            <line x1={CX + RIGHT} y1={CY - HALF - 22} x2={CX + RIGHT} y2={CY - HALF - 14} />
            <text x={CX + RIGHT / 2} y={CY - HALF - 24} textAnchor="middle" fontSize="10.5">
              a = 10
            </text>
            <line x1={CX + RIGHT + 20} y1={CY - HALF} x2={CX + RIGHT + 20} y2={CY + HALF} />
            <line x1={CX + RIGHT + 16} y1={CY - HALF} x2={CX + RIGHT + 24} y2={CY - HALF} />
            <line x1={CX + RIGHT + 16} y1={CY + HALF} x2={CX + RIGHT + 24} y2={CY + HALF} />
            <text x={CX + RIGHT + 28} y={CY + 3} fontSize="10.5">
              20
            </text>
            <line x1={CX} y1={CY + 58} x2={CX - HALF} y2={CY + 58} />
            <text x={CX - HALF / 2} y={CY + 70} textAnchor="middle" fontSize="10.5">
              r = 10
            </text>
          </g>

          {showAreas && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
              <text x={CX + RIGHT / 2} y={CY - 22} textAnchor="middle" fontSize="10" fontWeight="700" fill={CUT}>
                200
              </text>
              <text x={CX - 26} y={CY - 22} textAnchor="middle" fontSize="10" fontWeight="700" fill={CUT}>
                157,08
              </text>
              <rect x="24" y="274" width="176" height="38" rx="8" fill="#fdf2ec" stroke={RESULT} strokeWidth="1.1" />
              <text x="112" y="289" textAnchor="middle" fontSize="9.5" fill={RESULT}>
                A_w = 357,08 mm²
              </text>
              <text x="112" y="304" textAnchor="middle" fontSize="10" fontWeight="700" fill={RESULT}>
                A = 1606,42 mm²
              </text>
            </motion.g>
          )}

          {showCut && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
              <circle cx={CX + 5 * S} cy={CY} r="4" fill={ACCENT} />
              <circle cx={CX - 4.244 * S} cy={CY} r="4" fill={ACCENT} />
              <text x={CX + 5 * S + 7} y={CY - 12} fontSize="9.5" fill={ACCENT}>
                (5; 0)
              </text>
              <text x={CX - 4.244 * S - 7} y={CY - 12} textAnchor="end" fontSize="9.5" fill={ACCENT}>
                (−4,244; 0)
              </text>
              {index === 2 && (
                <>
                  <rect
                    x="304"
                    y="36"
                    width="144"
                    height="42"
                    rx="8"
                    fill="#f6f0fb"
                    stroke={ACCENT}
                    strokeWidth="1.1"
                  />
                  <text x="376" y="52" textAnchor="middle" fontSize="9.5" fill={MUTED}>
                    centroid wycięcia
                  </text>
                  <text x="376" y="68" textAnchor="middle" fontSize="11" fontWeight="700" fill={ACCENT}>
                    x_w = 0,933 mm
                  </text>
                </>
              )}
            </motion.g>
          )}

          {showNet && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
              <line x1={CX - 2} y1={CY} x2={CX - 24} y2={CY + 20} stroke={RESULT} strokeWidth="1.3" />
              <circle cx={CX - 1} cy={CY} r="4" fill={RESULT} />
              <text x={CX - 44} y={CY + 33} fontSize="12" fontWeight="700" fill={RESULT}>
                C
              </text>
              {(index === 3 || index >= 5) && (
                <>
                  <rect
                    x="304"
                    y="84"
                    width="144"
                    height="42"
                    rx="8"
                    fill="#fdf2ec"
                    stroke={RESULT}
                    strokeWidth="1.1"
                  />
                  <text x="376" y="100" textAnchor="middle" fontSize="9.5" fill={MUTED}>
                    pole netto i moment
                  </text>
                  <text x="376" y="116" textAnchor="middle" fontSize="11" fontWeight="700" fill={RESULT}>
                    x_C = −0,208 mm
                  </text>
                </>
              )}
            </motion.g>
          )}

          {showSymmetry && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
              <text x={CX + 48} y={CY - 8} fontSize="10.5" fontWeight="700" fill={OK}>
                oś symetrii
              </text>
              {index === 4 && (
                <>
                  <rect x="304" y="132" width="144" height="38" rx="8" fill="#eef7f1" stroke={OK} strokeWidth="1.1" />
                  <text x="376" y="148" textAnchor="middle" fontSize="9.5" fill={MUTED}>
                    moment względem osi x
                  </text>
                  <text x="376" y="163" textAnchor="middle" fontSize="11" fontWeight="700" fill={OK}>
                    Qx = 0 ⇒ y_C = 0
                  </text>
                </>
              )}
            </motion.g>
          )}

          {(showNet || showVariants) && (
            <g>
              <rect
                x="306"
                y="206"
                width="142"
                height="112"
                rx="10"
                fill="#f8fafc"
                stroke="#d7dde5"
                strokeWidth="1.2"
              />
              <text x="377" y="222" textAnchor="middle" fontSize="9.5" fill={MUTED}>
                powiększenie x [mm]
              </text>
              <line x1="314" y1="268" x2="440" y2="268" stroke={AXIS} strokeWidth="1.2" />
              {[-1, 0, 1].map((tick) => (
                <g key={tick}>
                  <line x1={insetX(tick)} y1="263" x2={insetX(tick)} y2="273" stroke={AXIS} strokeWidth="1" />
                  <text x={insetX(tick)} y="284" textAnchor="middle" fontSize="8.5" fill={MUTED}>
                    {tick}
                  </text>
                </g>
              ))}
              <line
                x1={insetX(0)}
                y1="244"
                x2={insetX(0)}
                y2="292"
                stroke={MUTED}
                strokeWidth="1"
                strokeDasharray="4 3"
              />
              {showCut && (
                <g>
                  <line x1={insetX(0.933)} y1="252" x2={insetX(0.933)} y2="268" stroke={ACCENT} strokeWidth="1.2" />
                  <circle cx={insetX(0.933)} cy="268" r="3.6" fill={ACCENT} />
                  <text x={insetX(0.933)} y="248" textAnchor="middle" fontSize="8.5" fill={ACCENT}>
                    x_w
                  </text>
                </g>
              )}
              {showNet && (
                <g>
                  <line x1={insetX(-0.208)} y1="260" x2={insetX(-0.208)} y2="276" stroke={RESULT} strokeWidth="1.2" />
                  <circle cx={insetX(-0.208)} cy="268" r="3.6" fill={RESULT} />
                  <text x={insetX(-0.208)} y="294" textAnchor="middle" fontSize="8.5" fill={RESULT}>
                    C
                  </text>
                </g>
              )}
              {showVariants && (
                <g>
                  <circle cx={insetX(-0.494)} cy="268" r="2.8" fill={RESULT} opacity="0.75" />
                  <circle cx={insetX(-1.051)} cy="268" r="2.8" fill={RESULT} opacity="0.55" />
                  <line
                    x1={insetX(-0.208)}
                    y1="304"
                    x2={insetX(-1.051)}
                    y2="304"
                    stroke={OK}
                    strokeWidth="1.4"
                    markerEnd="url(#ex-cen2-arrow)"
                  />
                  <text x={insetX(-0.63)} y="300" textAnchor="middle" fontSize="8.5" fill={OK}>
                    a rośnie
                  </text>
                </g>
              )}
            </g>
          )}

          <text x="230" y="328" textAnchor="middle" fontSize="12" fill={INK}>
            {status[index]}
          </text>
        </svg>
      </div>
    </div>
  )
}
