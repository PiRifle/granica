import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const LOAD = '#ff6b45'
const OK = '#2e9e6b'
const MUTED = '#87929d'
const EDGE = '#68727e'
const INK = '#17202a'

const clamp01 = (value: number) => Math.max(0, Math.min(1, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}
const pl = (value: number, digits = 1) => value.toFixed(digits).replace('.', ',')

const X0 = 54
const X1 = 426
const BEAM_Y = 72
const SPAN = X1 - X0
const bx = (position: number) => X0 + (position / 3) * SPAN

const CX = 118
const CY = 190
const SCALE = 1.25
const D_MIN = 86.8
const D_CHOSEN = 90
const W_MIN = 64285.7
const W_MAX = 95000
const W_ACTUAL = 71569
const SIGMA = 125.8
const K = 140
const F = 10.5
const F_ALLOW = 12

const BAR_X = 220
const BAR_W = 210

const stateLabels: Record<string, string> = {
  load: 'model i obciążenie',
  required: 'wymagany wskaźnik',
  dimension: 'dobór średnicy',
  stress: 'kontrola naprężeń',
  stiffness: 'kontrola ugięcia',
}

export function SectionDimension1Animation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'load'
  const p = playing ? smooth(sceneProgress) : 1

  const isLoad = metric === 'load'
  const isRequired = metric === 'required'
  const isDimension = metric === 'dimension'
  const isStress = metric === 'stress'
  const isStiffness = metric === 'stiffness'
  const showSection = !isLoad && !isStiffness

  const dNow = isRequired ? D_MIN * p : isDimension ? D_MIN + (D_CHOSEN - D_MIN) * p : D_CHOSEN
  const radius = Math.max(0, (dNow * SCALE) / 2)
  const sectionTop = CY - radius
  const sectionBottom = CY + radius
  const utilization = isStress ? (SIGMA / K) * p : 0
  const deflection = isStiffness ? F * p : 0

  const diagramPeak = 150 - (150 - 118) * (isLoad ? p : 0)
  const deflectionLimitY = BEAM_Y + 46
  const deflectionY = BEAM_Y + (deflection / F_ALLOW) * 46
  const deflectionPath = `M ${X0} ${BEAM_Y} C ${X0 + SPAN * 0.25} ${BEAM_Y + deflection * 3.7}, ${X0 + SPAN * 0.75} ${BEAM_Y + deflection * 3.7}, ${X1} ${BEAM_Y}`

  const dAxisX = (value: number) => BAR_X + ((value - 60) / 40) * BAR_W
  const wAxisX = (value: number) => BAR_X + (value / W_MAX) * BAR_W

  const stressLevels = Array.from({ length: 7 }, (_, index) => {
    const fraction = (index + 1) / 8
    const y = sectionTop + fraction * radius * 2
    const above = y < CY
    const value = (above ? (CY - y) / radius : (y - CY) / radius) * SIGMA
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
          aria-label="Belka swobodnie podparta, dobór średnicy kołowego przekroju i kontrola naprężeń oraz ugięcia"
        >
          <defs>
            <marker
              id="dsd1-arrow"
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
              id="dsd1-dim"
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

          <text x={14} y={18} fontSize={10} fontWeight={700} fill={INK}>
            belka swobodnie podparta · L = 3 m
          </text>
          <text x={14} y={32} fontSize={9} fill={MUTED}>
            P = 12 kN · k = 140 MPa · E = 200 GPa · {stateLabels[metric] ?? 'model'}
          </text>

          <g>
            {isStiffness && (
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
                <line
                  x1={X0}
                  y1={deflectionLimitY}
                  x2={X1}
                  y2={deflectionLimitY}
                  stroke={OK}
                  strokeWidth={1.2}
                  strokeDasharray="6 4"
                />
                <text x={X1} y={deflectionLimitY - 5} textAnchor="end" fontSize={8} fill={OK}>
                  f_dop = 12 mm
                </text>
                <line
                  x1={(X0 + X1) / 2}
                  y1={BEAM_Y}
                  x2={(X0 + X1) / 2}
                  y2={deflectionY}
                  stroke={ACCENT}
                  strokeWidth={1}
                  markerStart="url(#dsd1-dim)"
                  markerEnd="url(#dsd1-dim)"
                />
                <text x={(X0 + X1) / 2 + 5} y={(BEAM_Y + deflectionY) / 2} fontSize={9} fill={ACCENT}>
                  f = {pl(deflection)} mm
                </text>
              </>
            )}

            {!isStiffness && (
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

            <line x1={bx(1.5)} y1={BEAM_Y - 22} x2={bx(1.5)} y2={BEAM_Y - 5} stroke={LOAD} strokeWidth={2.4} />
            <path
              d={`M${bx(1.5) - 5} ${BEAM_Y - 14} L${bx(1.5)} ${BEAM_Y - 5} L${bx(1.5) + 5} ${BEAM_Y - 14}`}
              fill="none"
              stroke={LOAD}
              strokeWidth={2.4}
            />
            <text x={bx(1.5)} y={BEAM_Y - 27} textAnchor="middle" fontSize={9} fill={LOAD}>
              P = 12 kN
            </text>

            {!isStiffness && !isLoad && (
              <>
                <line
                  x1={X0}
                  y1={BEAM_Y + 36}
                  x2={X1}
                  y2={BEAM_Y + 36}
                  stroke={MUTED}
                  strokeWidth={1}
                  markerStart="url(#dsd1-dim)"
                  markerEnd="url(#dsd1-dim)"
                />
                <text x={(X0 + X1) / 2} y={BEAM_Y + 49} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                  L = 3 m
                </text>
              </>
            )}
          </g>

          {isLoad && (
            <g>
              <polygon
                points={`${X0},${BEAM_Y + 88} ${(X0 + X1) / 2},${diagramPeak} ${X1},${BEAM_Y + 88}`}
                fill={ACCENT}
                fillOpacity={0.12}
                stroke={ACCENT}
                strokeWidth={1.6}
              />
              <text x={(X0 + X1) / 2} y={diagramPeak - 5} textAnchor="middle" fontSize={9} fill={ACCENT}>
                M_max = 9 kN·m
              </text>
              <text x={X0} y={BEAM_Y + 103} fontSize={8.5} fill={MUTED}>
                moment maksymalny w środku rozpiętości
              </text>
            </g>
          )}

          {showSection && (
            <g>
              <line
                x1={CX - radius - 10}
                y1={CY}
                x2={CX + radius + 10}
                y2={CY}
                stroke={LOAD}
                strokeWidth={1.2}
                strokeDasharray="5 4"
              />
              <motion.circle
                cx={CX}
                cy={CY}
                fill="#edf1ff"
                fillOpacity={0.85}
                stroke={isStress ? INK : ACCENT}
                strokeWidth={1.8}
                initial={false}
                animate={{ r: radius }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              {!isStress && (
                <>
                  <line
                    x1={CX - radius - 18}
                    y1={sectionTop}
                    x2={CX - radius - 18}
                    y2={sectionBottom}
                    stroke={MUTED}
                    strokeWidth={1}
                    markerStart="url(#dsd1-dim)"
                    markerEnd="url(#dsd1-dim)"
                  />
                  <text
                    transform={`translate(${CX - radius - 25} ${CY}) rotate(-90)`}
                    textAnchor="middle"
                    fontSize={8.5}
                    fill={isDimension ? INK : MUTED}
                    fontWeight={isDimension ? 700 : 400}
                  >
                    d = {pl(dNow)} mm
                  </text>
                </>
              )}
              <text x={CX} y={CY + radius + 20} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                pełne koło
              </text>

              {isStress &&
                stressLevels.map((arrow, index) => {
                  const length = (arrow.value / K) * 52 * p
                  return (
                    <line
                      key={`stress-${index}`}
                      x1={CX - radius}
                      y1={arrow.y}
                      x2={CX - radius - length}
                      y2={arrow.y}
                      stroke={arrow.above ? ACCENT : LOAD}
                      strokeWidth={1.5}
                      markerEnd={length > 7 ? 'url(#dsd1-arrow)' : undefined}
                    />
                  )
                })}
            </g>
          )}

          {isRequired && (
            <g>
              <text x={BAR_X} y={140} fontSize={9} fontWeight={700} fill={INK}>
                wymagany wskaźnik przekroju
              </text>
              <rect x={BAR_X} y={152} width={BAR_W} height={16} rx={8} fill="#edf1f5" />
              <motion.rect
                x={BAR_X}
                y={152}
                height={16}
                rx={8}
                fill={ACCENT}
                fillOpacity={0.28}
                stroke={ACCENT}
                strokeWidth={1.2}
                initial={false}
                animate={{ width: wAxisX(W_MIN * Math.min(1, p * 1.15)) - BAR_X }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <line
                x1={wAxisX(W_MIN)}
                y1={146}
                x2={wAxisX(W_MIN)}
                y2={174}
                stroke={LOAD}
                strokeWidth={1.4}
                strokeDasharray="4 3"
              />
              <text x={wAxisX(W_MIN)} y={140} textAnchor="middle" fontSize={8} fill={LOAD}>
                W_min
              </text>
              <text x={BAR_X} y={207} fontSize={9} fontWeight={700} fill={ACCENT}>
                W_min = 64 286 mm³
              </text>
              <text x={BAR_X} y={229} fontSize={8.5} fill={INK}>
                dla koła: d_min ≈ 86,8 mm
              </text>
              <text x={BAR_X} y={249} fontSize={8.5} fill={MUTED}>
                wskaźnik to jeszcze nie wymiar
              </text>
            </g>
          )}

          {isDimension && (
            <g>
              <text x={BAR_X} y={140} fontSize={9} fontWeight={700} fill={INK}>
                dobór z szeregu wymiarów
              </text>
              <line x1={BAR_X} y1={174} x2={BAR_X + BAR_W} y2={174} stroke="#c9d0d9" strokeWidth={1} />
              {[60, 70, 80, 90, 100].map((tick) => (
                <g key={tick}>
                  <line x1={dAxisX(tick)} y1={170} x2={dAxisX(tick)} y2={178} stroke="#c9d0d9" strokeWidth={1} />
                  <text x={dAxisX(tick)} y={190} textAnchor="middle" fontSize={8} fill={MUTED}>
                    {tick}
                  </text>
                </g>
              ))}
              <text x={BAR_X + BAR_W} y={204} textAnchor="end" fontSize={8.5} fill={MUTED}>
                d [mm]
              </text>
              <line
                x1={dAxisX(D_MIN)}
                y1={162}
                x2={dAxisX(D_MIN)}
                y2={174}
                stroke={LOAD}
                strokeWidth={1.4}
                strokeDasharray="4 3"
              />
              <text x={dAxisX(D_MIN)} y={156} textAnchor="middle" fontSize={8} fill={LOAD}>
                86,8
              </text>
              <motion.circle
                cx={dAxisX(dNow)}
                cy={174}
                r={4}
                fill={OK}
                stroke="#fff"
                strokeWidth={1}
                initial={false}
                animate={{ cx: dAxisX(dNow) }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <text x={dAxisX(D_CHOSEN)} y={218} textAnchor="middle" fontSize={9} fontWeight={700} fill={OK}>
                d = 90 mm
              </text>
              <text x={BAR_X} y={240} fontSize={8.5} fill={MUTED}>
                najmniejszy wymiar nie mniejszy od 86,8 mm
              </text>
              <text x={BAR_X} y={257} fontSize={8.5} fill={OK}>
                W = 71 569 mm³
              </text>
            </g>
          )}

          {isStress && (
            <g>
              <text x={BAR_X} y={140} fontSize={9} fontWeight={700} fill={INK}>
                wykorzystanie przekroju
              </text>
              <text x={BAR_X} y={156} fontSize={8.5} fill={MUTED}>
                σ / k
              </text>
              <rect x={BAR_X} y={164} width={BAR_W} height={18} rx={9} fill="#edf1f5" />
              <motion.rect
                x={BAR_X}
                y={164}
                height={18}
                rx={9}
                fill={OK}
                fillOpacity={0.3}
                stroke={OK}
                strokeWidth={1.2}
                initial={false}
                animate={{ width: BAR_W * utilization }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <line x1={BAR_X + BAR_W} y1={158} x2={BAR_X + BAR_W} y2={188} stroke={OK} strokeWidth={1.4} />
              <text x={BAR_X + BAR_W} y={154} textAnchor="end" fontSize={8} fill={OK}>
                100%
              </text>
              <text x={BAR_X} y={204} fontSize={9} fill={INK}>
                σ_max = {pl(SIGMA)} MPa
              </text>
              <text x={BAR_X} y={222} fontSize={9} fill={MUTED}>
                k = 140 MPa
              </text>
              <text x={BAR_X} y={245} fontSize={10} fontWeight={700} fill={OK}>
                η = {pl((SIGMA / K) * 100)}% ≤ 100%
              </text>
              <text x={BAR_X} y={264} fontSize={8.5} fill={OK}>
                warunek wytrzymałości spełniony
              </text>
              <text x={BAR_X} y={281} fontSize={8} fill={MUTED}>
                W = {W_ACTUAL.toLocaleString('pl-PL')} mm³
              </text>
            </g>
          )}

          {isStiffness && (
            <g>
              <text x={BAR_X} y={150} fontSize={9} fontWeight={700} fill={INK}>
                kontrola ugięcia
              </text>
              <rect x={BAR_X} y={163} width={BAR_W} height={18} rx={9} fill="#edf1f5" />
              <motion.rect
                x={BAR_X}
                y={163}
                height={18}
                rx={9}
                fill={ACCENT}
                fillOpacity={0.25}
                stroke={ACCENT}
                strokeWidth={1.2}
                initial={false}
                animate={{ width: BAR_W * (deflection / F_ALLOW) }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <line x1={BAR_X + BAR_W} y1={157} x2={BAR_X + BAR_W} y2={187} stroke={OK} strokeWidth={1.4} />
              <text x={BAR_X + BAR_W} y={153} textAnchor="end" fontSize={8} fill={OK}>
                f_dop
              </text>
              <text x={BAR_X} y={204} fontSize={9} fill={ACCENT}>
                f = {pl(deflection)} mm
              </text>
              <text x={BAR_X} y={222} fontSize={9} fill={MUTED}>
                f_dop = L/250 = 12 mm
              </text>
              <text x={BAR_X} y={247} fontSize={10} fontWeight={700} fill={OK}>
                f ≤ f_dop
              </text>
              <text x={BAR_X} y={266} fontSize={8.5} fill={MUTED}>
                sztywność również spełniona
              </text>
              <text x={BAR_X} y={283} fontSize={8.5} fill={MUTED}>
                decyduje wytrzymałość
              </text>
            </g>
          )}
        </svg>
      </div>
    </div>
  )
}
