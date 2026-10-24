import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const TENSION = '#ff6b45'
const MODULUS = '#a970dd'
const EDGE = '#68727e'
const MUTED = '#87929d'
const INK = '#17202a'

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}

const CY = 128
const R = 52
const INNER_R = (100 / 120) * R
const TOP = CY - R
const BOTTOM = CY + R
const SOLID_CX = 128
const TUBE_CX = 318

const SOLID_STRESS = 47.2
const TUBE_STRESS = 91.1
const TUBE_ARROW = 32
const SOLID_ARROW = (SOLID_STRESS / TUBE_STRESS) * TUBE_ARROW

const W_MAX = 180
const W_BAR_MAX = 210

const levels = Array.from({ length: 7 }, (_, index) => TOP + 8 + index * ((BOTTOM - TOP - 16) / 6))

export function SectionModulusExample2Animation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const draw = playing ? smooth(sceneProgress) : 1

  const showC = metric !== 'model'
  const showI = metric === 'I' || metric === 'W' || metric === 'stress' || metric === 'result'
  const showW = metric === 'W'
  const showStress = metric === 'stress' || metric === 'result'
  const showArea = metric === 'result'

  const solidArrow = SOLID_ARROW * draw
  const tubeArrow = TUBE_ARROW * draw
  const solidW = (169.6 / W_MAX) * W_BAR_MAX
  const tubeW = (87.8 / W_MAX) * W_BAR_MAX

  const stressArrows = (cx: number, maxLength: number) =>
    levels.map((y, index) => {
      const above = y < CY
      const amount = clamp01((draw - index * 0.04) / 0.7)
      const ratio = above ? (CY - y) / R : (y - CY) / R
      const length = maxLength * ratio * amount
      return (
        <line
          key={`${cx}-${index}`}
          x1={cx}
          y1={y}
          x2={above ? cx - length : cx + length}
          y2={y}
          stroke={above ? ACCENT : TENSION}
          strokeWidth={1.4}
        />
      )
    })

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          width={460}
          height={300}
          viewBox="0 0 460 300"
          role="img"
          aria-label="Porównanie pełnego pręta i rury o tej samej średnicy zewnętrznej. Animacja pokazuje wspólną odległość skrajnego włókna, różne momenty bezwładności, wskaźniki wytrzymałości i rozkłady naprężeń."
        >
          <defs>
            <marker
              id="m4s2-dim"
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
            D = 120 mm
          </text>
          <text x={12} y={37} fontSize={9} fill={MUTED}>
            rura: d = 100 mm
          </text>
          {(showStress || metric === 'model') && (
            <text x={12} y={52} fontSize={9} fill={TENSION}>
              M = 8 kN·m
            </text>
          )}

          <g>
            <circle cx={SOLID_CX} cy={CY} r={R} fill="#edf1ff" stroke={EDGE} strokeWidth={1.6} />
          </g>

          <g>
            <circle cx={TUBE_CX} cy={CY} r={R} fill="#edf1ff" stroke={EDGE} strokeWidth={1.6} />
            <circle cx={TUBE_CX} cy={CY} r={INNER_R} fill="#ffffff" stroke={EDGE} strokeWidth={1.4} />
            {showI && (
              <motion.circle
                cx={TUBE_CX}
                cy={CY}
                r={INNER_R}
                fill={TENSION}
                initial={false}
                animate={{ fillOpacity: 0.26 * (1 - draw) }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              />
            )}
            <text x={TUBE_CX} y={CY + R + 16} textAnchor="middle" fontSize={9} fill={MUTED}>
              rura
            </text>
            {showI && (
              <motion.text
                x={TUBE_CX}
                y={CY - R - 8}
                textAnchor="middle"
                fontSize={8}
                fill={TENSION}
                initial={false}
                animate={{ opacity: draw < 0.82 ? 0.9 : 0 }}
                transition={{ duration: 0.2 }}
              >
                odejmujemy jądro
              </motion.text>
            )}
          </g>

          <text x={SOLID_CX} y={CY + R + 16} textAnchor="middle" fontSize={9} fill={MUTED}>
            pręt pełny
          </text>

          {[SOLID_CX, TUBE_CX].map((cx) => (
            <line
              key={`na-${cx}`}
              x1={cx - R - 8}
              y1={CY}
              x2={cx + R + 8}
              y2={CY}
              stroke={TENSION}
              strokeWidth={1.6}
              strokeDasharray="5 4"
            />
          ))}

          {showC && (
            <g>
              {[SOLID_CX, TUBE_CX].map((cx) => (
                <g key={`c-${cx}`}>
                  <line
                    x1={cx - R - 16}
                    y1={CY}
                    x2={cx - R - 16}
                    y2={CY - R * draw}
                    stroke={MUTED}
                    strokeWidth={1.2}
                    markerEnd="url(#m4s2-dim)"
                  />
                  <motion.text
                    x={cx - R - 20}
                    y={(CY + TOP) / 2 + 3}
                    textAnchor="end"
                    fontSize={8.5}
                    fill={INK}
                    initial={false}
                    animate={{ opacity: draw > 0.5 ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    c = 60
                  </motion.text>
                </g>
              ))}
              <text x={(SOLID_CX + TUBE_CX) / 2} y={TOP - 14} textAnchor="middle" fontSize={8} fill={MUTED}>
                ta sama odległość skrajnego włókna
              </text>
            </g>
          )}

          {showStress && (
            <g>
              <motion.path
                d={`M ${SOLID_CX} ${CY} L ${SOLID_CX - solidArrow} ${TOP} L ${SOLID_CX} ${TOP} Z`}
                fill={ACCENT}
                fillOpacity={0.14}
                stroke={ACCENT}
                strokeWidth={1.3}
                initial={{ pathLength: 0, opacity: 0.2 }}
                animate={{ pathLength: draw, opacity: 1 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              />
              <motion.path
                d={`M ${SOLID_CX} ${CY} L ${SOLID_CX + solidArrow} ${BOTTOM} L ${SOLID_CX} ${BOTTOM} Z`}
                fill={TENSION}
                fillOpacity={0.14}
                stroke={TENSION}
                strokeWidth={1.3}
                initial={{ pathLength: 0, opacity: 0.2 }}
                animate={{ pathLength: draw, opacity: 1 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              />
              <motion.path
                d={`M ${TUBE_CX} ${CY} L ${TUBE_CX - tubeArrow} ${TOP} L ${TUBE_CX} ${TOP} Z`}
                fill={ACCENT}
                fillOpacity={0.14}
                stroke={ACCENT}
                strokeWidth={1.3}
                initial={{ pathLength: 0, opacity: 0.2 }}
                animate={{ pathLength: draw, opacity: 1 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              />
              <motion.path
                d={`M ${TUBE_CX} ${CY} L ${TUBE_CX + tubeArrow} ${BOTTOM} L ${TUBE_CX} ${BOTTOM} Z`}
                fill={TENSION}
                fillOpacity={0.14}
                stroke={TENSION}
                strokeWidth={1.3}
                initial={{ pathLength: 0, opacity: 0.2 }}
                animate={{ pathLength: draw, opacity: 1 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              />
              {stressArrows(SOLID_CX, SOLID_ARROW)}
              {stressArrows(TUBE_CX, TUBE_ARROW)}

              <circle cx={TUBE_CX} cy={CY} r={INNER_R} fill="#ffffff" stroke={EDGE} strokeWidth={1.4} />
              <line
                x1={TUBE_CX - R - 8}
                y1={CY}
                x2={TUBE_CX + R + 8}
                y2={CY}
                stroke={TENSION}
                strokeWidth={1.6}
                strokeDasharray="5 4"
              />

              {metric === 'stress' && (
                <motion.g initial={false} animate={{ opacity: draw > 0.55 ? 1 : 0 }} transition={{ duration: 0.2 }}>
                  <text x={SOLID_CX} y={BOTTOM + 34} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                    σ_s,max ≈ 47,2 MPa
                  </text>
                  <text x={TUBE_CX} y={BOTTOM + 34} textAnchor="middle" fontSize={8.5} fill={TENSION}>
                    σ_r,max ≈ 91,1 MPa
                  </text>
                </motion.g>
              )}
            </g>
          )}

          {showW && (
            <g>
              <text x={100} y={218} fontSize={8.5} fill={INK}>
                pręt pełny: W_s = 169,6·10³ mm³
              </text>
              <motion.rect
                x={100}
                y={224}
                height={12}
                rx={4}
                fill={MODULUS}
                fillOpacity={0.28}
                stroke={MODULUS}
                strokeWidth={1.3}
                initial={{ width: 0 }}
                animate={{ width: solidW * draw }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              />
              <text x={100} y={256} fontSize={8.5} fill={INK}>
                rura: W_r = 87,8·10³ mm³
              </text>
              <motion.rect
                x={100}
                y={262}
                height={12}
                rx={4}
                fill={MODULUS}
                fillOpacity={0.28}
                stroke={MODULUS}
                strokeWidth={1.3}
                initial={{ width: 0 }}
                animate={{ width: tubeW * draw }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              />
              <text x={100} y={288} fontSize={8} fill={MUTED}>
                to samo c, więc W jest proporcjonalne do I
              </text>
            </g>
          )}

          {showArea && (
            <motion.g initial={false} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
              <text x={SOLID_CX} y={BOTTOM + 34} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                A_s ≈ 11 310 mm²
              </text>
              <text x={TUBE_CX} y={BOTTOM + 34} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                A_r ≈ 3456 mm²
              </text>
              <text x={230} y={242} textAnchor="middle" fontSize={9} fill={INK}>
                ten sam D i ten sam M
              </text>
              <text x={230} y={258} textAnchor="middle" fontSize={9} fill={TENSION}>
                rura: mniej materiału, mniejsza nośność bezwzględna
              </text>
            </motion.g>
          )}

          {metric === 'model' && (
            <text x={230} y={242} textAnchor="middle" fontSize={9} fill={INK}>
              oba przekroje mają tę samą średnicę zewnętrzną D
            </text>
          )}
          {metric === 'c' && (
            <text x={230} y={242} textAnchor="middle" fontSize={9} fill={INK}>
              c = D/2 = 60 mm dla obu przekrojów
            </text>
          )}
          {metric === 'I' && (
            <text x={230} y={242} textAnchor="middle" fontSize={9} fill={INK}>
              rura to pełny okrąg minus jądro o średnicy d
            </text>
          )}
          {metric === 'stress' && (
            <text x={230} y={260} textAnchor="middle" fontSize={9} fill={INK}>
              przy tym samym M decyduje wskaźnik W = I/c
            </text>
          )}
        </svg>
      </div>
    </div>
  )
}
