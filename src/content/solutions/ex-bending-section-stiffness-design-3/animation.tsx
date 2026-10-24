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
const BEAM_Y = 74
const SPAN = X1 - X0
const bx = (position: number) => X0 + (position / 3.5) * SPAN

const SEC_X = 120
const SEC_TOP = 165
const SEC_W = 50
const SEC_SCALE = 1

const BAR_X = 190
const BAR_W = 230
const STRESS_SCALE = 0.3
const DEFLECTION_SCALE = 4.6
const F_ACTUAL = 8.57
const F_ALLOW = 10
const SIGMA_ACTUAL = 84
const SIGMA_ALLOW = 160
const I_MAX = 5e6
const I_REQ = 3.573e6

const stateLabels: Record<string, string> = {
  model: 'model i dane',
  stiffness: 'wymaganie sztywności',
  section: 'wymagana wysokość przekroju',
  deflection: 'kontrola ugięcia',
  stress: 'kontrola naprężeń i wniosek',
}

export function SectionStiffnessDesign3Animation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const draw = playing ? smooth(clamp01(sceneProgress / 0.85)) : 1

  const showSection = metric === 'model' || metric === 'section' || metric === 'stress'
  const showLimitCurve = metric === 'stiffness'
  const showDeflection = metric === 'deflection'
  const showStress = metric === 'stress'
  const showHeight = metric === 'section'

  const height = showHeight ? 80 + 20 * draw : 100
  const secH = height * SEC_SCALE
  const secBottom = SEC_TOP + secH
  const secNA = SEC_TOP + secH / 2

  const currentI = showHeight ? (50 * height ** 3) / 12 : 4.167e6
  const iPass = currentI >= I_REQ

  const deflection = showDeflection ? F_ACTUAL * draw : 0
  const limitY = BEAM_Y + F_ALLOW * DEFLECTION_SCALE
  const deflectedY = BEAM_Y + deflection * DEFLECTION_SCALE
  const deflectionPath = `M ${X0} ${BEAM_Y} Q ${(X0 + X1) / 2} ${BEAM_Y + deflection * DEFLECTION_SCALE * 2} ${X1} ${BEAM_Y}`
  const limitPath = `M ${X0} ${BEAM_Y} Q ${(X0 + X1) / 2} ${BEAM_Y + F_ALLOW * DEFLECTION_SCALE * 2} ${X1} ${BEAM_Y}`

  const arrowLevels = Array.from({ length: 9 }, (_, index) => {
    const y = SEC_TOP + 5 + index * ((secH - 10) / 8)
    const above = y < secNA
    const value = above
      ? ((secNA - y) / (secNA - SEC_TOP)) * SIGMA_ACTUAL
      : ((y - secNA) / (secBottom - secNA)) * SIGMA_ACTUAL
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
          aria-label="Belka z siłą w środku, dobór wysokości przekroju z warunku sztywności oraz kontrola ugięcia i naprężeń"
        >
          <defs>
            <marker
              id="ssd3-arrow-comp"
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
              id="ssd3-arrow-tension"
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
              id="ssd3-dim"
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
            belka swobodnie podparta · L = 3,5 m
          </text>
          <text x={14} y={34} fontSize={9} fill={MUTED}>
            P = 8 kN · E = 200 GPa · b = 50 mm
          </text>

          <g>
            {showDeflection ? (
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
                <text x={X1} y={limitY + 12} textAnchor="end" fontSize={8} fill={OK}>
                  f_dop = 10 mm
                </text>
                <line
                  x1={(X0 + X1) / 2}
                  y1={BEAM_Y}
                  x2={(X0 + X1) / 2}
                  y2={deflectedY}
                  stroke={ACCENT}
                  strokeWidth={1}
                  markerStart="url(#ssd3-dim)"
                  markerEnd="url(#ssd3-dim)"
                />
                <text x={(X0 + X1) / 2 + 5} y={(BEAM_Y + deflectedY) / 2} fontSize={9} fill={ACCENT}>
                  f = {pl(F_ACTUAL)} mm
                </text>
              </>
            ) : (
              <line x1={X0} y1={BEAM_Y} x2={X1} y2={BEAM_Y} stroke={EDGE} strokeWidth={4} strokeLinecap="round" />
            )}

            {showLimitCurve && (
              <>
                <line x1={X0} y1={BEAM_Y} x2={X1} y2={BEAM_Y} stroke={MUTED} strokeWidth={1} strokeDasharray="4 4" />
                <path
                  d={limitPath}
                  fill="none"
                  stroke={OK}
                  strokeWidth={2}
                  strokeDasharray="6 4"
                  strokeLinecap="round"
                />
                <line
                  x1={(X0 + X1) / 2}
                  y1={BEAM_Y}
                  x2={(X0 + X1) / 2}
                  y2={limitY}
                  stroke={OK}
                  strokeWidth={1}
                  markerStart="url(#ssd3-dim)"
                  markerEnd="url(#ssd3-dim)"
                />
                <text x={(X0 + X1) / 2 + 5} y={(BEAM_Y + limitY) / 2} fontSize={9} fill={OK}>
                  f_dop = 10 mm
                </text>
              </>
            )}

            <line x1={bx(1.75)} y1={BEAM_Y - 40} x2={bx(1.75)} y2={BEAM_Y - 5} stroke={LOAD} strokeWidth={2.4} />
            <path
              d={`M${bx(1.75) - 5} ${BEAM_Y - 14} L${bx(1.75)} ${BEAM_Y - 5} L${bx(1.75) + 5} ${BEAM_Y - 14}`}
              fill="none"
              stroke={LOAD}
              strokeWidth={2.4}
            />
            <text x={bx(1.75)} y={BEAM_Y - 45} textAnchor="middle" fontSize={9} fill={LOAD}>
              P = 8 kN
            </text>

            <path d={`M${X0 - 9} ${BEAM_Y + 15} L${X0} ${BEAM_Y + 2} L${X0 + 9} ${BEAM_Y + 15} Z`} fill={EDGE} />
            <path d={`M${X1 - 9} ${BEAM_Y + 15} L${X1} ${BEAM_Y + 2} L${X1 + 9} ${BEAM_Y + 15} Z`} fill={EDGE} />
            <text x={X0} y={BEAM_Y + 28} textAnchor="middle" fontSize={9} fill={EDGE}>
              A
            </text>
            <text x={X1} y={BEAM_Y + 28} textAnchor="middle" fontSize={9} fill={EDGE}>
              B
            </text>

            {!showDeflection && !showLimitCurve && (
              <>
                <line
                  x1={X0}
                  y1={BEAM_Y + 45}
                  x2={X1}
                  y2={BEAM_Y + 45}
                  stroke={MUTED}
                  strokeWidth={1}
                  markerStart="url(#ssd3-dim)"
                  markerEnd="url(#ssd3-dim)"
                />
                <text x={(X0 + X1) / 2} y={BEAM_Y + 58} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                  L = 3,5 m
                </text>
              </>
            )}
          </g>

          {showSection && (
            <g>
              <rect
                x={SEC_X}
                y={SEC_TOP}
                width={SEC_W}
                height={secH}
                rx={2}
                fill={showStress ? '#f7f2ee' : '#edf1ff'}
                stroke={metric === 'model' ? MUTED : EDGE}
                strokeWidth={1.4}
                strokeDasharray={metric === 'model' ? '5 4' : undefined}
              />
              <line
                x1={SEC_X - 12}
                y1={secNA}
                x2={SEC_X + SEC_W + 12}
                y2={secNA}
                stroke={LOAD}
                strokeWidth={1.2}
                strokeDasharray="5 4"
              />

              <line
                x1={SEC_X - 20}
                y1={SEC_TOP}
                x2={SEC_X - 20}
                y2={secBottom}
                stroke={MUTED}
                strokeWidth={1}
                markerStart="url(#ssd3-dim)"
                markerEnd="url(#ssd3-dim)"
              />
              <text
                transform={`translate(${SEC_X - 26} ${(SEC_TOP + secBottom) / 2}) rotate(-90)`}
                textAnchor="middle"
                fontSize={8.5}
                fill={showHeight ? INK : MUTED}
                fontWeight={showHeight ? 700 : 400}
              >
                {metric === 'model' ? 'h = ?' : `h = ${pl(height, 0)} mm`}
              </text>
              <line
                x1={SEC_X}
                y1={secBottom + 14}
                x2={SEC_X + SEC_W}
                y2={secBottom + 14}
                stroke={MUTED}
                strokeWidth={1}
                markerStart="url(#ssd3-dim)"
                markerEnd="url(#ssd3-dim)"
              />
              <text x={SEC_X + SEC_W / 2} y={secBottom + 27} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                b = 50 mm
              </text>

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
                          length > 8 ? (arrow.above ? 'url(#ssd3-arrow-comp)' : 'url(#ssd3-arrow-tension)') : undefined
                        }
                      />
                    )
                  })}
                  <line
                    x1={SEC_X - SIGMA_ALLOW * STRESS_SCALE}
                    y1={SEC_TOP - 6}
                    x2={SEC_X - SIGMA_ALLOW * STRESS_SCALE}
                    y2={secBottom + 6}
                    stroke={OK}
                    strokeWidth={1.2}
                    strokeDasharray="4 3"
                  />
                  <text
                    x={SEC_X - SIGMA_ALLOW * STRESS_SCALE}
                    y={SEC_TOP - 11}
                    textAnchor="middle"
                    fontSize={8}
                    fill={OK}
                  >
                    σ_dop
                  </text>
                  <text
                    x={SEC_X - SIGMA_ACTUAL * STRESS_SCALE}
                    y={SEC_TOP - 5}
                    textAnchor="middle"
                    fontSize={8}
                    fill={LOAD}
                  >
                    84 MPa
                  </text>
                  <text
                    x={SEC_X - SIGMA_ACTUAL * STRESS_SCALE}
                    y={secBottom + 18}
                    textAnchor="middle"
                    fontSize={8}
                    fill={LOAD}
                  >
                    84 MPa
                  </text>
                  <text x={SEC_X + SEC_W / 2} y={SEC_TOP - 8} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                    50 × 100 mm
                  </text>
                </g>
              )}
            </g>
          )}

          {metric === 'stiffness' && (
            <g>
              <text x={BAR_X} y={180} fontSize={9} fontWeight={700} fill={INK}>
                wymagana sztywność
              </text>
              <text x={BAR_X} y={194} fontSize={8} fill={MUTED}>
                f = P L³/(48 E I) ≤ f_dop
              </text>
              <rect x={BAR_X} y={204} width={BAR_W} height={16} rx={8} fill="#edf1f5" />
              <motion.rect
                x={BAR_X}
                y={204}
                height={16}
                rx={8}
                fill={STIFF}
                fillOpacity={0.26}
                stroke={STIFF}
                strokeWidth={1.2}
                initial={{ width: 0 }}
                animate={{ width: (I_REQ / I_MAX) * BAR_W * draw }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <text x={BAR_X} y={236} fontSize={8.5} fill={STIFF}>
                I_min = 3,573·10⁶ mm⁴
              </text>
              <text x={BAR_X} y={256} fontSize={8.5} fill={MUTED}>
                I = b h³/12 ≥ I_min
              </text>
              <text x={BAR_X} y={276} fontSize={8.5} fill={LOAD}>
                o wymiarze decyduje ugięcie, nie naprężenie
              </text>
            </g>
          )}

          {showHeight && (
            <g>
              <text x={BAR_X} y={180} fontSize={9} fontWeight={700} fill={INK}>
                wymagana wysokość
              </text>
              <text x={BAR_X} y={194} fontSize={8} fill={MUTED}>
                h ≥ ∛(12 I_min / b) = 95,0 mm
              </text>
              <rect x={BAR_X} y={204} width={BAR_W} height={16} rx={8} fill="#edf1f5" />
              <motion.rect
                x={BAR_X}
                y={204}
                height={16}
                rx={8}
                fill={iPass ? OK : BAD}
                fillOpacity={0.26}
                stroke={iPass ? OK : BAD}
                strokeWidth={1.2}
                initial={{ width: 0 }}
                animate={{ width: (currentI / I_MAX) * BAR_W }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <line
                x1={BAR_X + (I_REQ / I_MAX) * BAR_W}
                y1={198}
                x2={BAR_X + (I_REQ / I_MAX) * BAR_W}
                y2={226}
                stroke={LOAD}
                strokeWidth={1.4}
                strokeDasharray="4 3"
              />
              <text x={BAR_X + (I_REQ / I_MAX) * BAR_W} y={192} textAnchor="middle" fontSize={8} fill={LOAD}>
                I_min
              </text>
              <text x={BAR_X} y={236} fontSize={8.5} fill={MUTED}>
                h = {pl(height, 0)} mm
              </text>
              <text x={BAR_X + BAR_W} y={236} textAnchor="end" fontSize={8.5} fill={iPass ? OK : BAD}>
                I = {pl(currentI / 1e6)}·10⁶ mm⁴
              </text>
              <text x={BAR_X} y={258} fontSize={8.5} fill={iPass ? OK : LOAD}>
                {iPass ? '✓ przyjęto h = 100 mm' : 'wysokość rośnie wraz z wymaganym I'}
              </text>
              <text x={BAR_X} y={276} fontSize={8.5} fill={MUTED}>
                b = 50 mm pozostaje bez zmian
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
                f = 8,57 mm
              </text>
              <text x={BAR_X + BAR_W} y={234} textAnchor="end" fontSize={8.5} fill={OK}>
                f_dop = 10 mm
              </text>
              <text x={BAR_X} y={258} fontSize={8.5} fill={OK}>
                ✓ f ≤ f_dop — wykorzystanie 86%
              </text>
              <text x={BAR_X} y={276} fontSize={8.5} fill={MUTED}>
                I = 4,167·10⁶ mm⁴
              </text>
            </g>
          )}

          {showStress && (
            <g>
              <text x={BAR_X} y={178} fontSize={9} fontWeight={700} fill={INK}>
                porównanie wykorzystania
              </text>
              <text x={BAR_X} y={198} fontSize={8.5} fill={MUTED}>
                sztywność f / f_dop
              </text>
              <rect x={BAR_X} y={203} width={BAR_W} height={12} rx={6} fill="#edf1f5" />
              <motion.rect
                x={BAR_X}
                y={203}
                height={12}
                rx={6}
                fill={STIFF}
                fillOpacity={0.35}
                stroke={STIFF}
                strokeWidth={1}
                initial={{ width: 0 }}
                animate={{ width: BAR_W * (F_ACTUAL / F_ALLOW) * draw }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <text x={BAR_X} y={234} fontSize={8.5} fill={MUTED}>
                wytrzymałość σ / 160 MPa
              </text>
              <rect x={BAR_X} y={239} width={BAR_W} height={12} rx={6} fill="#edf1f5" />
              <motion.rect
                x={BAR_X}
                y={239}
                height={12}
                rx={6}
                fill={OK}
                fillOpacity={0.35}
                stroke={OK}
                strokeWidth={1}
                initial={{ width: 0 }}
                animate={{ width: BAR_W * (SIGMA_ACTUAL / SIGMA_ALLOW) * draw }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <line
                x1={BAR_X + BAR_W}
                y1={196}
                x2={BAR_X + BAR_W}
                y2={256}
                stroke={LOAD}
                strokeWidth={1.2}
                strokeDasharray="4 3"
              />
              <text x={BAR_X + BAR_W} y={190} textAnchor="end" fontSize={8} fill={LOAD}>
                granica 100%
              </text>
              <text x={BAR_X} y={268} fontSize={8.5} fill={LOAD}>
                decyduje sztywność: 86% wobec 53% wytrzymałości
              </text>
              <text x={BAR_X} y={284} fontSize={8.5} fill={OK}>
                σ_max = 84 MPa ≪ σ_dop
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
