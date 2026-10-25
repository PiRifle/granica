import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const INK = '#17202a'
const MUTED = '#87929d'
const AXIS = '#9aa5b1'
const MATERIAL = '#4f6df5'
const CUT = '#d84f28'
const ARM = '#a970dd'
const CENTROID = '#27835a'
const SPHERE = '#2e9e6b'

const CX = 230
const CY = 175
const SCALE = 4.8
const R = 25 * SCALE
const HALF_R = 10 * SCALE

const sx = (x: number) => CX + x * SCALE
const sy = (y: number) => CY - y * SCALE

const RECT_CENTROID = { x: sx(7.5), y: sy(5) }
const HALF_CENTROID = { x: sx(-4.24), y: sy(0) }
const CENTROID_POINT = { x: sx(-0.277), y: sy(-0.453) }

const halfDisc = `M ${CX} ${CY - HALF_R} A ${HALF_R} ${HALF_R} 0 0 0 ${CX} ${CY + HALF_R} Z`

const INSET_ORIGIN = { x: 64, y: 63 }
const INSET_SCALE = 20
const insetCentroid = {
  x: INSET_ORIGIN.x - 0.277 * INSET_SCALE,
  y: INSET_ORIGIN.y + 0.453 * INSET_SCALE,
}

export function CircleCutoutsAnimation({ index, playing, sceneProgress }: SolutionAnimationProps) {
  const p = playing ? Math.min(1, Math.max(0, sceneProgress)) : 1
  const draw = Math.min(1, 0.3 + p * 1.2)
  const showAreas = index >= 1
  const showMomentY = index === 2
  const showMomentX = index === 3
  const showCentroid = index >= 4
  const showPappus = index >= 5

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg viewBox="0 0 460 340" role="img" aria-label="Centroid koła z prostokątnym i półkolistym wycięciem">
          <title>Koło z wycięciami</title>
          <desc>Koło, dwa wycięcia jako pola ujemne, ramiona momentów, centroid i kontrola Pappusa.</desc>
          <defs>
            <pattern
              id="ex-centroidy-hatch"
              width="7"
              height="7"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(45)"
            >
              <line x1="0" y1="0" x2="0" y2="7" stroke={CUT} strokeWidth="1.1" opacity="0.55" />
            </pattern>
          </defs>

          <line x1="65" y1={CY} x2="405" y2={CY} stroke={AXIS} strokeWidth="1.3" />
          <line x1={CX} y1="22" x2={CX} y2="315" stroke={AXIS} strokeWidth="1.3" />
          <text x="392" y={CY - 8} fontSize="11" fill={INK}>
            x
          </text>
          <text x={CX + 8} y="34" fontSize="11" fill={INK}>
            y
          </text>

          <motion.circle
            cx={CX}
            cy={CY}
            r={R * draw}
            fill={MATERIAL}
            fillOpacity="0.1"
            stroke={MATERIAL}
            strokeWidth="2.2"
            initial={false}
          />

          <motion.g initial={{ opacity: 0 }} animate={{ opacity: draw }} transition={{ duration: 0.2 }}>
            <rect
              x={CX}
              y={sy(10)}
              width={15 * SCALE}
              height={10 * SCALE}
              fill="url(#ex-centroidy-hatch)"
              stroke={CUT}
              strokeWidth="1.8"
            />
            <path d={halfDisc} fill="url(#ex-centroidy-hatch)" stroke={CUT} strokeWidth="1.8" />
          </motion.g>

          <text x="450" y="52" textAnchor="end" fontSize="9.5" fill={MATERIAL}>
            materiał: koło R = 25 mm
          </text>
          <text x="326" y="136" fontSize="9.5" fill={CUT}>
            wycięcie 1
          </text>
          <text x="326" y="150" fontSize="9" fill={CUT}>
            15 × 10 mm
          </text>
          <text x="18" y="142" fontSize="9.5" fill={CUT}>
            wycięcie 2
          </text>
          <text x="18" y="156" fontSize="9" fill={CUT}>
            półkole r = 10 mm
          </text>
          <line x1="74" y1="152" x2="204" y2="190" stroke={CUT} strokeWidth="0.9" strokeDasharray="3 3" opacity="0.7" />

          <g stroke={MUTED} fill={MUTED}>
            <line x1={CX} y1={CY + 22} x2={sx(25)} y2={CY + 22} strokeWidth="1" />
            <line x1={CX} y1={CY + 18} x2={CX} y2={CY + 26} strokeWidth="1" />
            <line x1={sx(25)} y1={CY + 18} x2={sx(25)} y2={CY + 26} strokeWidth="1" />
            <text x={sx(12.5)} y={CY + 36} textAnchor="middle" fontSize="9" stroke="none">
              R = 25 mm
            </text>
          </g>

          {showAreas && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <text x={CX} y="52" textAnchor="middle" fontSize="10" fontWeight="700" fill={MATERIAL}>
                A₁ = 1963,50 mm²
              </text>
              <text
                x={RECT_CENTROID.x}
                y={RECT_CENTROID.y + 3}
                textAnchor="middle"
                fontSize="9.5"
                fontWeight="700"
                fill={CUT}
              >
                A₂ = −150
              </text>
              <text
                x={HALF_CENTROID.x - 6}
                y={HALF_CENTROID.y - 8}
                textAnchor="end"
                fontSize="9.5"
                fontWeight="700"
                fill={CUT}
              >
                A₃ = −157,08
              </text>
            </motion.g>
          )}

          {showMomentY && (
            <g>
              <motion.line
                x1={CX}
                y1={RECT_CENTROID.y}
                x2={RECT_CENTROID.x}
                y2={RECT_CENTROID.y}
                stroke={ARM}
                strokeWidth="1.3"
                strokeDasharray="4 3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />
              <motion.line
                x1={CX}
                y1={HALF_CENTROID.y}
                x2={HALF_CENTROID.x}
                y2={HALF_CENTROID.y}
                stroke={ARM}
                strokeWidth="1.3"
                strokeDasharray="4 3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />
              <text x={RECT_CENTROID.x + 5} y={RECT_CENTROID.y - 7} fontSize="9" fill={ARM}>
                x₂ = +7,5
              </text>
              <text x={HALF_CENTROID.x - 5} y={HALF_CENTROID.y - 7} textAnchor="end" fontSize="9" fill={ARM}>
                x₃ = −4,24
              </text>
              <line x1={CX} y1={CY + 58} x2={sx(-3)} y2={CY + 58} stroke={ARM} strokeWidth="1.2" />
              <text x={sx(-1.5)} y={CY + 70} textAnchor="middle" fontSize="9" fill={ARM}>
                x_C &lt; 0
              </text>
            </g>
          )}

          {showMomentX && (
            <g>
              <motion.line
                x1={RECT_CENTROID.x}
                y1={CY}
                x2={RECT_CENTROID.x}
                y2={RECT_CENTROID.y}
                stroke={ARM}
                strokeWidth="1.3"
                strokeDasharray="4 3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />
              <text x={RECT_CENTROID.x + 5} y={(CY + RECT_CENTROID.y) / 2} fontSize="9" fill={ARM}>
                y₂ = +5
              </text>
              <text x={HALF_CENTROID.x - 5} y={HALF_CENTROID.y - 8} textAnchor="end" fontSize="9" fill={ARM}>
                y₃ = 0
              </text>
              <line x1={CX + 6} y1={CY} x2={CX + 6} y2={CY + 34} stroke={ARM} strokeWidth="1.2" />
              <text x={CX + 12} y={CY + 36} fontSize="9" fill={ARM}>
                y_C &lt; 0
              </text>
            </g>
          )}

          {showCentroid && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>
              <circle
                cx={CENTROID_POINT.x}
                cy={CENTROID_POINT.y}
                r="4"
                fill="#fff"
                stroke={CENTROID}
                strokeWidth="2.2"
              />
              <line
                x1={CENTROID_POINT.x - 10}
                y1={CENTROID_POINT.y}
                x2={CENTROID_POINT.x + 10}
                y2={CENTROID_POINT.y}
                stroke={CENTROID}
                strokeWidth="1.3"
              />
              <line
                x1={CENTROID_POINT.x}
                y1={CENTROID_POINT.y - 10}
                x2={CENTROID_POINT.x}
                y2={CENTROID_POINT.y + 10}
                stroke={CENTROID}
                strokeWidth="1.3"
              />
              <line
                x1={CENTROID_POINT.x}
                y1={CENTROID_POINT.y}
                x2="136"
                y2="116"
                stroke={CENTROID}
                strokeWidth="1"
                strokeDasharray="3 3"
              />
              <text x="308" y="298" fontSize="9" fill={CENTROID}>
                C — patrz powiększenie
              </text>
            </motion.g>
          )}

          {showCentroid && (
            <g>
              <rect x="18" y="18" width="92" height="98" rx="7" fill="#fff" stroke="#cfd6de" strokeWidth="1.2" />
              <text x="64" y="31" textAnchor="middle" fontSize="7.5" fill={MUTED}>
                powiększenie okolic O (×20)
              </text>
              <line
                x1={INSET_ORIGIN.x - 30}
                y1={INSET_ORIGIN.y}
                x2={INSET_ORIGIN.x + 30}
                y2={INSET_ORIGIN.y}
                stroke={AXIS}
                strokeWidth="0.9"
              />
              <line
                x1={INSET_ORIGIN.x}
                y1={INSET_ORIGIN.y - 30}
                x2={INSET_ORIGIN.x}
                y2={INSET_ORIGIN.y + 30}
                stroke={AXIS}
                strokeWidth="0.9"
              />
              <circle cx={INSET_ORIGIN.x} cy={INSET_ORIGIN.y} r="2.6" fill="none" stroke={MUTED} strokeWidth="1" />
              <circle cx={insetCentroid.x} cy={insetCentroid.y} r="3" fill="#fff" stroke={CENTROID} strokeWidth="1.8" />
              <line
                x1={insetCentroid.x - 6}
                y1={insetCentroid.y}
                x2={insetCentroid.x + 6}
                y2={insetCentroid.y}
                stroke={CENTROID}
                strokeWidth="1"
              />
              <line
                x1={insetCentroid.x}
                y1={insetCentroid.y - 6}
                x2={insetCentroid.x}
                y2={insetCentroid.y + 6}
                stroke={CENTROID}
                strokeWidth="1"
              />
              <text x="64" y="106" textAnchor="middle" fontSize="7.5" fill={CENTROID}>
                C = (−0,277; −0,453) mm
              </text>
            </g>
          )}

          {showPappus && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>
              <circle cx="65" cy="240" r="38" fill={SPHERE} fillOpacity="0.1" stroke={SPHERE} strokeWidth="1.4" />
              <ellipse cx="65" cy="240" rx="38" ry="11" fill="none" stroke={SPHERE} strokeWidth="0.9" opacity="0.6" />
              <ellipse cx="65" cy="240" rx="12" ry="38" fill="none" stroke={SPHERE} strokeWidth="0.9" opacity="0.6" />
              <motion.ellipse
                cx="65"
                cy="240"
                rx="5"
                ry="38"
                fill="none"
                stroke={SPHERE}
                strokeWidth="1"
                strokeDasharray="3 3"
                animate={{ rotate: playing ? 360 : 0 }}
                transition={{ duration: 5, repeat: playing ? Infinity : 0, ease: 'linear' }}
                style={{ transformOrigin: '65px 240px' }}
              />
              <text x="65" y="290" textAnchor="middle" fontSize="8.5" fill={SPHERE}>
                kula r = 10 mm
              </text>
              <text x="65" y="304" textAnchor="middle" fontSize="8.5" fill={SPHERE}>
                V = 4 188,8 mm³
              </text>
              <line
                x1="216"
                y1="177"
                x2="110"
                y2="240"
                stroke={SPHERE}
                strokeWidth="1"
                strokeDasharray="3 3"
                opacity="0.7"
              />
            </motion.g>
          )}

          <text x="230" y="330" textAnchor="middle" fontSize="10" fill={INK}>
            {showPappus
              ? 'Pappus: obrót półkola r = 10 mm wokół średnicy daje kulę'
              : showCentroid
                ? 'Wycięcia odejmujemy, a ich współrzędne zachowują znak położenia'
                : 'Pola wycięć są ujemne, współrzędne ich środków — dodatnie lub ujemne'}
          </text>
        </svg>
      </div>
    </div>
  )
}
