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
const bx = (position: number) => X0 + (position / 4) * SPAN

const SEC_X = 105
const SEC_TOP = 160
const SEC_SCALE = 0.68
const SEC_W = 60 * SEC_SCALE

const BAR_X = 190
const BAR_W = 230
const STRESS_SCALE = 0.3
const DEFLECTION_SCALE = 3.8
const F_ALLOW = 16
const F_INITIAL = 16.53
const F_FINAL = 10.4

const W_MAX = 160000
const W_REQ = 112500
const W_ACTUAL = 144000
const I_MAX = 10e6
const I_REQ = 8.929e6
const I_INITIAL = 8.64e6
const I_FINAL = 13.72e6

const stateLabels: Record<string, string> = {
  model: 'model i dane',
  strength: 'warunek wytrzymałości',
  stiffness: 'warunek sztywności — przekrój nie spełnia',
  iteration: 'zwiększenie wysokości przekroju',
  stress: 'kontrola naprężeń',
  deflection: 'kontrola ugięcia',
}

export function SectionStiffnessDesign2Animation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const draw = playing ? smooth(clamp01(sceneProgress / 0.85)) : 1

  const isIteration = metric === 'iteration'
  const finalSection = metric === 'stress' || metric === 'deflection'
  const showSection = metric !== 'stiffness' && metric !== 'deflection'
  const showDeflectedBeam = metric === 'stiffness' || metric === 'deflection' || isIteration
  const showStress = metric === 'stress'

  const height = isIteration ? 120 + 20 * draw : finalSection ? 140 : 120
  const secH = height * SEC_SCALE
  const secBottom = SEC_TOP + secH
  const secNA = SEC_TOP + secH / 2

  const currentF = isIteration
    ? F_INITIAL - (F_INITIAL - F_FINAL) * draw
    : metric === 'deflection'
      ? F_FINAL
      : F_INITIAL
  const deflection = showDeflectedBeam ? currentF * (isIteration ? 1 : draw) : 0
  const limitY = BEAM_Y + F_ALLOW * DEFLECTION_SCALE
  const deflectedY = BEAM_Y + deflection * DEFLECTION_SCALE
  const deflectionPath = `M ${X0} ${BEAM_Y} Q ${(X0 + X1) / 2} ${BEAM_Y + deflection * DEFLECTION_SCALE * 2} ${X1} ${BEAM_Y}`

  const currentI = isIteration ? I_INITIAL + (I_FINAL - I_INITIAL) * draw : I_INITIAL
  const iPass = currentI >= I_REQ

  const arrowLevels = Array.from({ length: 9 }, (_, index) => {
    const y = SEC_TOP + 5 + index * ((secH - 10) / 8)
    const above = y < secNA
    const value = above ? ((secNA - y) / (secNA - SEC_TOP)) * 91.8 : ((y - secNA) / (secBottom - secNA)) * 91.8
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
          aria-label="Belka równomiernie obciążona, zmiana wysokości przekroju i kontrola ugięcia"
        >
          <defs>
            <marker
              id="ssd2-arrow-comp"
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
              id="ssd2-arrow-tension"
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
              id="ssd2-dim"
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
            q = 9 kN/m · E = 210 GPa · b = 60 mm
          </text>

          <g>
            {showDeflectedBeam ? (
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
                  f_dop = 16 mm
                </text>
                <line
                  x1={(X0 + X1) / 2}
                  y1={BEAM_Y}
                  x2={(X0 + X1) / 2}
                  y2={deflectedY}
                  stroke={currentF > F_ALLOW + 1e-6 ? BAD : ACCENT}
                  strokeWidth={1}
                  markerStart="url(#ssd2-dim)"
                  markerEnd="url(#ssd2-dim)"
                />
                <text
                  x={(X0 + X1) / 2 + 5}
                  y={(BEAM_Y + deflectedY) / 2}
                  fontSize={9}
                  fill={currentF > F_ALLOW + 1e-6 ? BAD : ACCENT}
                >
                  f = {pl(currentF)} mm
                </text>
              </>
            ) : (
              <line x1={X0} y1={BEAM_Y} x2={X1} y2={BEAM_Y} stroke={EDGE} strokeWidth={4} strokeLinecap="round" />
            )}

            {Array.from({ length: 9 }, (_, index) => {
              const position = (index / 8) * 4
              const x = bx(position)
              return (
                <g key={`q-${index}`} stroke={LOAD} fill={LOAD} opacity={0.85}>
                  <line x1={x} y1={BEAM_Y - 22} x2={x} y2={BEAM_Y - 5} strokeWidth={1.3} />
                  <path
                    d={`M${x - 3} ${BEAM_Y - 11} L${x} ${BEAM_Y - 4} L${x + 3} ${BEAM_Y - 11}`}
                    fill="none"
                    strokeWidth={1.3}
                  />
                </g>
              )
            })}
            <text x={(X0 + X1) / 2} y={BEAM_Y - 28} textAnchor="middle" fontSize={9} fill={LOAD}>
              q = 9 kN/m
            </text>

            <path d={`M${X0 - 9} ${BEAM_Y + 15} L${X0} ${BEAM_Y + 2} L${X0 + 9} ${BEAM_Y + 15} Z`} fill={EDGE} />
            <path d={`M${X1 - 9} ${BEAM_Y + 15} L${X1} ${BEAM_Y + 2} L${X1 + 9} ${BEAM_Y + 15} Z`} fill={EDGE} />
            <text x={X0} y={BEAM_Y + 28} textAnchor="middle" fontSize={9} fill={EDGE}>
              A
            </text>
            <text x={X1} y={BEAM_Y + 28} textAnchor="middle" fontSize={9} fill={EDGE}>
              B
            </text>

            {!showDeflectedBeam && (
              <>
                <line
                  x1={X0}
                  y1={BEAM_Y + 45}
                  x2={X1}
                  y2={BEAM_Y + 45}
                  stroke={MUTED}
                  strokeWidth={1}
                  markerStart="url(#ssd2-dim)"
                  markerEnd="url(#ssd2-dim)"
                />
                <text x={(X0 + X1) / 2} y={BEAM_Y + 58} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                  L = 4 m
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
                stroke={EDGE}
                strokeWidth={1.4}
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
                markerStart="url(#ssd2-dim)"
                markerEnd="url(#ssd2-dim)"
              />
              <text
                transform={`translate(${SEC_X - 26} ${(SEC_TOP + secBottom) / 2}) rotate(-90)`}
                textAnchor="middle"
                fontSize={8.5}
                fill={isIteration ? INK : MUTED}
                fontWeight={isIteration ? 700 : 400}
              >
                h = {pl(height, 0)} mm
              </text>
              <line
                x1={SEC_X}
                y1={secBottom + 14}
                x2={SEC_X + SEC_W}
                y2={secBottom + 14}
                stroke={MUTED}
                strokeWidth={1}
                markerStart="url(#ssd2-dim)"
                markerEnd="url(#ssd2-dim)"
              />
              <text x={SEC_X + SEC_W / 2} y={secBottom + 27} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                b = 60 mm
              </text>

              {isIteration && (
                <text x={SEC_X + SEC_W / 2} y={SEC_TOP - 7} textAnchor="middle" fontSize={8.5} fill={LOAD}>
                  h: 120 → 140 mm
                </text>
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
                          length > 8 ? (arrow.above ? 'url(#ssd2-arrow-comp)' : 'url(#ssd2-arrow-tension)') : undefined
                        }
                      />
                    )
                  })}
                  <line
                    x1={SEC_X - 160 * STRESS_SCALE}
                    y1={SEC_TOP - 6}
                    x2={SEC_X - 160 * STRESS_SCALE}
                    y2={secBottom + 6}
                    stroke={OK}
                    strokeWidth={1.2}
                    strokeDasharray="4 3"
                  />
                  <text x={SEC_X - 160 * STRESS_SCALE} y={SEC_TOP - 11} textAnchor="middle" fontSize={8} fill={OK}>
                    σ_dop
                  </text>
                  <text x={SEC_X - 91.8 * STRESS_SCALE} y={SEC_TOP - 5} textAnchor="middle" fontSize={8} fill={LOAD}>
                    91,8 MPa
                  </text>
                </g>
              )}
            </g>
          )}

          {metric === 'strength' && (
            <g>
              <text x={BAR_X} y={196} fontSize={9} fontWeight={700} fill={INK}>
                wskaźnik wytrzymałości W
              </text>
              <rect x={BAR_X} y={206} width={BAR_W} height={16} rx={8} fill="#edf1f5" />
              <motion.rect
                x={BAR_X}
                y={206}
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
                y1={200}
                x2={BAR_X + (W_REQ / W_MAX) * BAR_W}
                y2={228}
                stroke={LOAD}
                strokeWidth={1.4}
                strokeDasharray="4 3"
              />
              <text x={BAR_X + (W_REQ / W_MAX) * BAR_W} y={194} textAnchor="middle" fontSize={8} fill={LOAD}>
                W_min
              </text>
              <text x={BAR_X} y={240} fontSize={8.5} fill={MUTED}>
                W_min = 112 500 mm³
              </text>
              <text x={BAR_X + BAR_W} y={240} textAnchor="end" fontSize={8.5} fill={OK}>
                W = 144 000 mm³
              </text>
              <text x={BAR_X} y={262} fontSize={8.5} fill={OK}>
                ✓ wytrzymałość spełniona: σ = 125 MPa
              </text>
            </g>
          )}

          {metric === 'stiffness' && (
            <g>
              <text x={BAR_X} y={180} fontSize={9} fontWeight={700} fill={INK}>
                moment bezwładności I
              </text>
              <text x={BAR_X} y={194} fontSize={8} fill={MUTED}>
                przekrój 60 × 120 mm
              </text>
              <rect x={BAR_X} y={202} width={BAR_W} height={16} rx={8} fill="#edf1f5" />
              <motion.rect
                x={BAR_X}
                y={202}
                height={16}
                rx={8}
                fill={BAD}
                fillOpacity={0.25}
                stroke={BAD}
                strokeWidth={1.2}
                initial={{ width: 0 }}
                animate={{ width: (I_INITIAL / I_MAX) * BAR_W * draw }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <line
                x1={BAR_X + (I_REQ / I_MAX) * BAR_W}
                y1={196}
                x2={BAR_X + (I_REQ / I_MAX) * BAR_W}
                y2={224}
                stroke={LOAD}
                strokeWidth={1.4}
                strokeDasharray="4 3"
              />
              <text x={BAR_X + (I_REQ / I_MAX) * BAR_W} y={190} textAnchor="middle" fontSize={8} fill={LOAD}>
                I_min
              </text>
              <text x={BAR_X} y={236} fontSize={8.5} fill={MUTED}>
                I = 8,64·10⁶ mm⁴
              </text>
              <text x={BAR_X + BAR_W} y={236} textAnchor="end" fontSize={8.5} fill={BAD}>
                I_min = 8,929·10⁶ mm⁴
              </text>
              <text x={BAR_X} y={258} fontSize={8.5} fill={BAD}>
                ✗ f = 16,53 mm &gt; f_dop = 16 mm
              </text>
              <text x={BAR_X} y={274} fontSize={8.5} fill={LOAD}>
                wytrzymałość była spełniona, ale sztywność nie
              </text>
            </g>
          )}

          {isIteration && (
            <g>
              <text x={BAR_X} y={180} fontSize={9} fontWeight={700} fill={INK}>
                zwiększamy wysokość przekroju
              </text>
              <text x={BAR_X} y={194} fontSize={8} fill={MUTED}>
                b = 60 mm pozostaje bez zmian
              </text>
              <rect x={BAR_X} y={202} width={BAR_W} height={16} rx={8} fill="#edf1f5" />
              <motion.rect
                x={BAR_X}
                y={202}
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
                y1={196}
                x2={BAR_X + (I_REQ / I_MAX) * BAR_W}
                y2={224}
                stroke={LOAD}
                strokeWidth={1.4}
                strokeDasharray="4 3"
              />
              <text x={BAR_X + (I_REQ / I_MAX) * BAR_W} y={190} textAnchor="middle" fontSize={8} fill={LOAD}>
                I_min
              </text>
              <text x={BAR_X} y={236} fontSize={8.5} fill={MUTED}>
                h = {pl(height, 0)} mm
              </text>
              <text x={BAR_X + BAR_W} y={236} textAnchor="end" fontSize={8.5} fill={iPass ? OK : BAD}>
                I = {pl(currentI / 1e6)}·10⁶ mm⁴
              </text>
              <text x={BAR_X} y={258} fontSize={8.5} fill={iPass ? OK : BAD}>
                f = {pl(currentF)} mm {iPass ? '≤' : '>'} f_dop = 16 mm
              </text>
              <text x={BAR_X} y={274} fontSize={8.5} fill={iPass ? OK : LOAD}>
                {iPass ? '✓ nowy przekrój spełnia warunek sztywności' : 'zwiększanie h zmniejsza ugięcie'}
              </text>
            </g>
          )}

          {showStress && (
            <g>
              <text x={BAR_X} y={180} fontSize={9} fontWeight={700} fill={INK}>
                kontrola naprężeń · 60 × 140 mm
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
                animate={{ width: BAR_W * 0.57375 * draw }}
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
                σ_max = 91,8 MPa
              </text>
              <text x={BAR_X + BAR_W} y={224} textAnchor="end" fontSize={8.5} fill={OK}>
                σ_dop = 160 MPa
              </text>
              <text x={BAR_X} y={248} fontSize={8.5} fill={OK}>
                ✓ naprężenie ma duży zapas
              </text>
              <text x={BAR_X} y={264} fontSize={8.5} fill={MUTED}>
                W = 196 000 mm³
              </text>
            </g>
          )}

          {metric === 'deflection' && (
            <g>
              <text x={BAR_X} y={190} fontSize={9} fontWeight={700} fill={INK}>
                kontrola ugięcia · 60 × 140 mm
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
                animate={{ width: BAR_W * (F_FINAL / F_ALLOW) * draw }}
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
                f = 10,4 mm
              </text>
              <text x={BAR_X + BAR_W} y={234} textAnchor="end" fontSize={8.5} fill={OK}>
                f_dop = 16 mm
              </text>
              <text x={BAR_X} y={258} fontSize={8.5} fill={OK}>
                ✓ f ≤ f_dop — zapas około 35%
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
