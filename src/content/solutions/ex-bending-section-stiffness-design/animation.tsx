import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const LOAD = '#ff6b45'
const STIFF = '#a970dd'
const OK = '#2e9e6b'
const BAD = '#d64545'
const MUTED = '#87929d'
const EDGE = '#68727e'
const INK = '#17202a'

const clamp01 = (value: number) => Math.max(0, Math.min(1, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}
const pl = (value: number, digits = 2) => value.toFixed(digits).replace('.', ',')

const X0 = 54
const X1 = 426
const BEAM_Y = 72
const SPAN = X1 - X0
const bx = (position: number) => X0 + (position / 4) * SPAN

const SEC_X = 120
const SEC_TOP = 165
const SEC_SCALE = 0.85
const SEC_W = 50 * SEC_SCALE
const SEC_H = 100 * SEC_SCALE
const SEC_BOTTOM = SEC_TOP + SEC_H
const SEC_NA = SEC_TOP + SEC_H / 2

const W_MAX = 90000
const W_REQ = 62500
const W_ACTUAL = 83333
const I_MAX = 4.5e6
const I_REQ = 3.968e6
const I_ACTUAL = 4.167e6

const BAR_X = 205
const BAR_W = 210
const STRESS_SCALE = 0.3
const DEFLECTION_SCALE = 4.6
const F_ACTUAL = 15.24
const F_ALLOW = 16

const stateLabels: Record<string, string> = {
  model: 'model i dane',
  strength: 'warunek wytrzymałości',
  stiffness: 'warunek sztywności',
  governing: 'decyduje sztywność',
  stress: 'kontrola naprężeń',
  deflection: 'kontrola ugięcia',
}

export function SectionStiffnessDesign1Animation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const draw = playing ? smooth(clamp01(sceneProgress / 0.8)) : 1

  const showStress = metric === 'stress'
  const showDeflection = metric === 'deflection'
  const showW = metric === 'strength'
  const showI = metric === 'stiffness'
  const showGoverning = metric === 'governing'
  const sectionVisible = !showDeflection

  const deflection = showDeflection ? F_ACTUAL * draw : 0
  const limitY = BEAM_Y + F_ALLOW * DEFLECTION_SCALE
  const deflectedY = BEAM_Y + deflection * DEFLECTION_SCALE
  const deflectionPath = `M ${X0} ${BEAM_Y} Q ${(X0 + X1) / 2} ${BEAM_Y + deflection * DEFLECTION_SCALE * 2} ${X1} ${BEAM_Y}`

  const arrowLevels = Array.from({ length: 9 }, (_, index) => {
    const y = SEC_TOP + 5 + index * ((SEC_H - 10) / 8)
    const above = y < SEC_NA
    const value = above ? ((SEC_NA - y) / (SEC_NA - SEC_TOP)) * 120 : ((y - SEC_NA) / (SEC_BOTTOM - SEC_NA)) * 120
    return { y, above, value }
  })

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          width={480}
          height={300}
          viewBox="0 0 480 300"
          role="img"
          aria-label="Belka swobodnie podparta z siłą w środku, przekrój prostokątny i porównanie warunków wytrzymałości oraz sztywności"
        >
          <defs>
            <marker
              id="ssd1-arrow-comp"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={ACCENT} />
            </marker>
            <marker
              id="ssd1-arrow-tension"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={LOAD} />
            </marker>
            <marker
              id="ssd1-dim"
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

          <text x={14} y={20} fontSize={10} fontWeight={700} fill={INK}>
            belka swobodnie podparta · L = 4 m
          </text>
          <text x={14} y={34} fontSize={9} fill={MUTED}>
            P = 10 kN · E = 210 GPa · 50 × 100 mm
          </text>

          <g>
            {!showDeflection && (
              <line x1={X0} y1={BEAM_Y} x2={X1} y2={BEAM_Y} stroke={EDGE} strokeWidth={4} strokeLinecap="round" />
            )}
            <path d={`M${X0 - 9} ${BEAM_Y + 15} L${X0} ${BEAM_Y + 2} L${X0 + 9} ${BEAM_Y + 15} Z`} fill={EDGE} />
            <path d={`M${X1 - 9} ${BEAM_Y + 15} L${X1} ${BEAM_Y + 2} L${X1 + 9} ${BEAM_Y + 15} Z`} fill={EDGE} />
            <text x={X0} y={BEAM_Y + 28} textAnchor="middle" fontSize={9} fill={EDGE}>
              A
            </text>
            <text x={X1} y={BEAM_Y + 28} textAnchor="middle" fontSize={9} fill={EDGE}>
              B
            </text>

            <line x1={bx(2)} y1={BEAM_Y - 40} x2={bx(2)} y2={BEAM_Y - 5} stroke={LOAD} strokeWidth={2.4} />
            <path
              d={`M${bx(2) - 5} ${BEAM_Y - 14} L${bx(2)} ${BEAM_Y - 5} L${bx(2) + 5} ${BEAM_Y - 14}`}
              fill="none"
              stroke={LOAD}
              strokeWidth={2.4}
            />
            <text x={bx(2)} y={BEAM_Y - 45} textAnchor="middle" fontSize={9} fill={LOAD}>
              P = 10 kN
            </text>

            {!showDeflection && (
              <>
                <line
                  x1={X0}
                  y1={BEAM_Y + 45}
                  x2={X1}
                  y2={BEAM_Y + 45}
                  stroke={MUTED}
                  strokeWidth={1}
                  markerStart="url(#ssd1-dim)"
                  markerEnd="url(#ssd1-dim)"
                />
                <text x={(X0 + X1) / 2} y={BEAM_Y + 60} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                  L = 4 m
                </text>
              </>
            )}
          </g>

          {showDeflection && (
            <>
              <line x1={X0} y1={BEAM_Y} x2={X1} y2={BEAM_Y} stroke={MUTED} strokeWidth={1} strokeDasharray="4 4" />
              <motion.path
                d={deflectionPath}
                fill="none"
                stroke={ACCENT}
                strokeWidth={4}
                strokeLinecap="round"
                initial={false}
                animate={{ d: deflectionPath }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <line x1={X0} y1={limitY} x2={X1} y2={limitY} stroke={OK} strokeWidth={1.2} strokeDasharray="6 4" />
              <text x={X1} y={limitY - 5} textAnchor="end" fontSize={8} fill={OK}>
                f_dop = 16 mm
              </text>
              <line
                x1={(X0 + X1) / 2}
                y1={BEAM_Y}
                x2={(X0 + X1) / 2}
                y2={deflectedY}
                stroke={ACCENT}
                strokeWidth={1}
                markerStart="url(#ssd1-dim)"
                markerEnd="url(#ssd1-dim)"
              />
              <text x={(X0 + X1) / 2 + 5} y={(BEAM_Y + deflectedY) / 2} fontSize={9} fill={ACCENT}>
                f = {pl(deflection)} mm
              </text>
            </>
          )}

          {metric === 'strength' && (
            <text x={bx(2)} y={BEAM_Y + 64} textAnchor="middle" fontSize={9} fill={LOAD}>
              M_max = 10 kN·m
            </text>
          )}

          {sectionVisible && (
            <g>
              <rect
                x={SEC_X}
                y={SEC_TOP}
                width={SEC_W}
                height={SEC_H}
                rx={2}
                fill="#edf1ff"
                stroke={EDGE}
                strokeWidth={1.4}
              />
              <line
                x1={SEC_X - 12}
                y1={SEC_NA}
                x2={SEC_X + SEC_W + 12}
                y2={SEC_NA}
                stroke={LOAD}
                strokeWidth={1.2}
                strokeDasharray="5 4"
              />
              <text x={SEC_X + SEC_W + 16} y={SEC_NA + 3} fontSize={8} fill={LOAD}>
                oś obojętna
              </text>

              {metric === 'model' && (
                <g>
                  <line
                    x1={SEC_X - 20}
                    y1={SEC_TOP}
                    x2={SEC_X - 20}
                    y2={SEC_BOTTOM}
                    stroke={MUTED}
                    strokeWidth={1}
                    markerStart="url(#ssd1-dim)"
                    markerEnd="url(#ssd1-dim)"
                  />
                  <text
                    transform={`translate(${SEC_X - 26} ${(SEC_TOP + SEC_BOTTOM) / 2}) rotate(-90)`}
                    textAnchor="middle"
                    fontSize={8.5}
                    fill={MUTED}
                  >
                    h = 100 mm
                  </text>
                  <line
                    x1={SEC_X}
                    y1={SEC_BOTTOM + 14}
                    x2={SEC_X + SEC_W}
                    y2={SEC_BOTTOM + 14}
                    stroke={MUTED}
                    strokeWidth={1}
                    markerStart="url(#ssd1-dim)"
                    markerEnd="url(#ssd1-dim)"
                  />
                  <text x={SEC_X + SEC_W / 2} y={SEC_BOTTOM + 27} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                    b = 50 mm
                  </text>
                </g>
              )}

              {showStress && (
                <g>
                  {arrowLevels.map((arrow, index) => {
                    const length = arrow.value * STRESS_SCALE * draw
                    return (
                      <line
                        key={`arrow-${index}`}
                        x1={SEC_X}
                        y1={arrow.y}
                        x2={SEC_X - length}
                        y2={arrow.y}
                        stroke={arrow.above ? ACCENT : LOAD}
                        strokeWidth={1.5}
                        markerEnd={
                          length > 8 ? (arrow.above ? 'url(#ssd1-arrow-comp)' : 'url(#ssd1-arrow-tension)') : undefined
                        }
                      />
                    )
                  })}
                  <line
                    x1={SEC_X - 160 * STRESS_SCALE}
                    y1={SEC_TOP - 6}
                    x2={SEC_X - 160 * STRESS_SCALE}
                    y2={SEC_BOTTOM + 6}
                    stroke={OK}
                    strokeWidth={1.2}
                    strokeDasharray="4 3"
                  />
                  <text x={SEC_X - 160 * STRESS_SCALE} y={SEC_TOP - 11} textAnchor="middle" fontSize={8} fill={OK}>
                    σ_dop
                  </text>
                  <text x={SEC_X - 120 * STRESS_SCALE} y={SEC_TOP - 5} textAnchor="middle" fontSize={8} fill={LOAD}>
                    120 MPa
                  </text>
                  <text x={SEC_X - 120 * STRESS_SCALE} y={SEC_BOTTOM + 18} textAnchor="middle" fontSize={8} fill={LOAD}>
                    120 MPa
                  </text>
                  <text x={SEC_X + SEC_W / 2} y={SEC_BOTTOM + 16} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                    50 × 100 mm
                  </text>
                </g>
              )}
            </g>
          )}

          {showW && (
            <g>
              <text x={BAR_X} y={180} fontSize={9} fontWeight={700} fill={INK}>
                wskaźnik wytrzymałości W
              </text>
              <rect x={BAR_X} y={190} width={BAR_W} height={16} rx={8} fill="#edf1f5" />
              <motion.rect
                x={BAR_X}
                y={190}
                height={16}
                rx={8}
                fill={OK}
                fillOpacity={0.3}
                stroke={OK}
                strokeWidth={1.2}
                initial={{ width: 0 }}
                animate={{ width: (W_ACTUAL / W_MAX) * BAR_W * draw }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <line
                x1={BAR_X + (W_REQ / W_MAX) * BAR_W}
                y1={184}
                x2={BAR_X + (W_REQ / W_MAX) * BAR_W}
                y2={212}
                stroke={LOAD}
                strokeWidth={1.4}
                strokeDasharray="4 3"
              />
              <text x={BAR_X + (W_REQ / W_MAX) * BAR_W} y={178} textAnchor="middle" fontSize={8} fill={LOAD}>
                W_min
              </text>
              <text x={BAR_X} y={224} fontSize={8.5} fill={MUTED}>
                W_min = 62 500 mm³
              </text>
              <text x={BAR_X + BAR_W} y={224} textAnchor="end" fontSize={8.5} fill={OK}>
                W = 83 333 mm³
              </text>
              <text x={BAR_X} y={248} fontSize={8.5} fill={OK}>
                ✓ W ≥ W_min — warunek spełniony
              </text>
            </g>
          )}

          {showI && (
            <g>
              <text x={BAR_X} y={180} fontSize={9} fontWeight={700} fill={INK}>
                moment bezwładności I
              </text>
              <rect x={BAR_X} y={190} width={BAR_W} height={16} rx={8} fill="#edf1f5" />
              <motion.rect
                x={BAR_X}
                y={190}
                height={16}
                rx={8}
                fill={STIFF}
                fillOpacity={0.26}
                stroke={STIFF}
                strokeWidth={1.2}
                initial={{ width: 0 }}
                animate={{ width: (I_ACTUAL / I_MAX) * BAR_W * draw }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <line
                x1={BAR_X + (I_REQ / I_MAX) * BAR_W}
                y1={184}
                x2={BAR_X + (I_REQ / I_MAX) * BAR_W}
                y2={212}
                stroke={LOAD}
                strokeWidth={1.4}
                strokeDasharray="4 3"
              />
              <text x={BAR_X + (I_REQ / I_MAX) * BAR_W} y={178} textAnchor="middle" fontSize={8} fill={LOAD}>
                I_min
              </text>
              <text x={BAR_X} y={224} fontSize={8.5} fill={MUTED}>
                I_min = 3,968·10⁶ mm⁴
              </text>
              <text x={BAR_X + BAR_W} y={224} textAnchor="end" fontSize={8.5} fill={STIFF}>
                I = 4,167·10⁶ mm⁴
              </text>
              <text x={BAR_X} y={248} fontSize={8.5} fill={STIFF}>
                zapas tylko około 5% — warunek jest blisko granicy
              </text>
            </g>
          )}

          {showGoverning && (
            <g>
              <text x={BAR_X} y={180} fontSize={9} fontWeight={700} fill={INK}>
                wykorzystanie warunków
              </text>
              <text x={BAR_X} y={207} fontSize={8.5} fill={MUTED}>
                wytrzymałość σ / σ_dop
              </text>
              <rect x={BAR_X} y={212} width={BAR_W} height={12} rx={6} fill="#edf1f5" />
              <motion.rect
                x={BAR_X}
                y={212}
                height={12}
                rx={6}
                fill={OK}
                fillOpacity={0.35}
                stroke={OK}
                strokeWidth={1}
                initial={{ width: 0 }}
                animate={{ width: BAR_W * 0.75 * draw }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <text x={BAR_X} y={240} fontSize={8.5} fill={MUTED}>
                sztywność f / f_dop
              </text>
              <rect x={BAR_X} y={245} width={BAR_W} height={12} rx={6} fill="#edf1f5" />
              <motion.rect
                x={BAR_X}
                y={245}
                height={12}
                rx={6}
                fill={STIFF}
                fillOpacity={0.35}
                stroke={STIFF}
                strokeWidth={1}
                initial={{ width: 0 }}
                animate={{ width: BAR_W * 0.9525 * draw }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <line
                x1={BAR_X + BAR_W}
                y1={205}
                x2={BAR_X + BAR_W}
                y2={262}
                stroke={LOAD}
                strokeWidth={1.2}
                strokeDasharray="4 3"
              />
              <text x={BAR_X + BAR_W} y={200} textAnchor="end" fontSize={8} fill={LOAD}>
                granica 100%
              </text>
              <text x={BAR_X} y={275} fontSize={8.5} fill={LOAD}>
                decyduje sztywność: 95% wobec 75% wytrzymałości
              </text>
            </g>
          )}

          {showStress && (
            <g>
              <text x={BAR_X} y={180} fontSize={9} fontWeight={700} fill={INK}>
                kontrola naprężeń
              </text>
              <rect x={BAR_X} y={190} width={BAR_W} height={16} rx={8} fill="#edf1f5" />
              <motion.rect
                x={BAR_X}
                y={190}
                height={16}
                rx={8}
                fill={OK}
                fillOpacity={0.3}
                stroke={OK}
                strokeWidth={1.2}
                initial={{ width: 0 }}
                animate={{ width: BAR_W * 0.75 * draw }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <line
                x1={BAR_X + BAR_W}
                y1={184}
                x2={BAR_X + BAR_W}
                y2={212}
                stroke={OK}
                strokeWidth={1.2}
                strokeDasharray="4 3"
              />
              <text x={BAR_X} y={224} fontSize={8.5} fill={MUTED}>
                σ_max = 120 MPa
              </text>
              <text x={BAR_X + BAR_W} y={224} textAnchor="end" fontSize={8.5} fill={OK}>
                σ_dop = 160 MPa
              </text>
              <text x={BAR_X} y={248} fontSize={8.5} fill={OK}>
                ✓ σ_max ≤ σ_dop — zapas 25%
              </text>
            </g>
          )}

          {showDeflection && (
            <g>
              <text x={BAR_X} y={190} fontSize={9} fontWeight={700} fill={INK}>
                kontrola ugięcia
              </text>
              <rect x={BAR_X} y={200} width={BAR_W} height={16} rx={8} fill="#edf1f5" />
              <motion.rect
                x={BAR_X}
                y={200}
                height={16}
                rx={8}
                fill={OK}
                fillOpacity={0.3}
                stroke={OK}
                strokeWidth={1.2}
                initial={{ width: 0 }}
                animate={{ width: BAR_W * (F_ACTUAL / F_ALLOW) * draw }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <line
                x1={BAR_X + BAR_W}
                y1={194}
                x2={BAR_X + BAR_W}
                y2={222}
                stroke={OK}
                strokeWidth={1.2}
                strokeDasharray="4 3"
              />
              <text x={BAR_X} y={234} fontSize={8.5} fill={MUTED}>
                f = 15,24 mm
              </text>
              <text x={BAR_X + BAR_W} y={234} textAnchor="end" fontSize={8.5} fill={OK}>
                f_dop = 16 mm
              </text>
              <text x={BAR_X} y={258} fontSize={8.5} fill={OK}>
                ✓ f ≤ f_dop — zapas 0,76 mm
              </text>
            </g>
          )}

          <text x={466} y={20} textAnchor="end" fontSize={8.5} fill={MUTED}>
            {stateLabels[metric] ?? 'model i dane'}
          </text>
        </svg>
      </div>
    </div>
  )
}
