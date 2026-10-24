import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const LOAD = '#ff6b45'
const VIOLET = '#a970dd'
const GREEN = '#2e9e6b'
const MUTED = '#87929d'
const EDGE = '#68727e'
const INK = '#17202a'
const LIGHT = '#eef2fb'

const AXIS_Y = 158
const SCALE = 1.7
const SX = (value: number) => 246 + (value + 15) * SCALE
const SY = (value: number) => AXIS_Y - value * SCALE

const SIGMA_X = 67.2
const TAU = 18.86
const AVG = SIGMA_X / 2
const RADIUS = Math.sqrt(AVG ** 2 + TAU ** 2)
const S1 = AVG + RADIUS
const S2 = AVG - RADIUS
const HMH = Math.sqrt(SIGMA_X ** 2 + 3 * TAU ** 2)
const TRESCA = 2 * RADIUS
const N_HMH = 235 / HMH
const N_TRESCA = 235 / TRESCA

const CX = 113
const CY = 210
const SEC_R = 38
const A_ANGLE = (-55 * Math.PI) / 180
const AX = CX + SEC_R * Math.cos(A_ANGLE)
const AY = CY + SEC_R * Math.sin(A_ANGLE)

const clamp01 = (value: number) => Math.max(0, Math.min(1, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}
const pl = (value: number, digits = 2) => value.toFixed(digits).replace('.', ',')

function SafetyBars({ progress }: { progress: number }) {
  const track = 200
  const scale = track / 3.5
  return (
    <g>
      <text x={250} y={72} fontSize={9.5} fontWeight={700} fill={INK}>
        zapas bezpieczeństwa n = R_e / σ_zred
      </text>

      <text x={250} y={102} fontSize={9} fill={ACCENT}>
        HMH
      </text>
      <text x={450} y={102} textAnchor="end" fontSize={9} fill={ACCENT}>
        n = {pl(N_HMH)}
      </text>
      <rect x={250} y={108} width={track} height={15} rx={7.5} fill="#edf1f5" />
      <motion.rect
        x={250}
        y={108}
        height={15}
        rx={7.5}
        fill={ACCENT}
        fillOpacity={0.3}
        stroke={ACCENT}
        strokeWidth={1.1}
        initial={false}
        animate={{ width: N_HMH * scale * progress }}
        transition={{ duration: 0.12, ease: 'linear' }}
      />

      <text x={250} y={146} fontSize={9} fill={LOAD}>
        Tresca
      </text>
      <text x={450} y={146} textAnchor="end" fontSize={9} fontWeight={700} fill={LOAD}>
        n = {pl(N_TRESCA)}
      </text>
      <rect x={250} y={152} width={track} height={15} rx={7.5} fill="#edf1f5" />
      <motion.rect
        x={250}
        y={152}
        height={15}
        rx={7.5}
        fill={LOAD}
        fillOpacity={0.32}
        stroke={LOAD}
        strokeWidth={1.3}
        initial={false}
        animate={{ width: N_TRESCA * scale * progress }}
        transition={{ duration: 0.12, ease: 'linear' }}
      />

      <line x1={250} y1={184} x2={450} y2={184} stroke="#dde3ea" strokeWidth={1} />
      <text x={250} y={204} fontSize={10} fontWeight={700} fill={INK}>
        miarodajna: n = {pl(N_TRESCA)}
      </text>
      <text x={250} y={220} fontSize={8.5} fill={MUTED}>
        mniejszy zapas decyduje o bezpieczeństwie
      </text>
      <text x={250} y={238} fontSize={8.5} fill={MUTED}>
        Treska jest bardziej konserwatywna niż HMH
      </text>
      <text x={250} y={258} fontSize={8.5} fill={LOAD}>
        nadal sprawdź ugięcie i kąt skręcenia
      </text>
    </g>
  )
}

export function MohrInterpretationExample1Animation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const progress = playing ? smooth(sceneProgress) : 1

  const isModel = metric === 'model'
  const isState = metric === 'state'
  const isPrincipal = metric === 'principal'
  const isCriteria = metric === 'criteria'
  const isDecision = metric === 'decision'
  const showCircle = !isModel && !isDecision
  const circleProgress = isState ? progress : 1
  const pointProgress = isState ? progress : 1

  const circumference = 2 * Math.PI * RADIUS * SCALE
  const alphaStart = Math.atan2(-TAU, RADIUS)
  const arcR = 25
  const arcStartX = SX(AVG) + arcR * Math.cos(alphaStart)
  const arcStartY = AXIS_Y + arcR * Math.sin(alphaStart)
  const arcEndX = SX(AVG) + arcR
  const arcEndY = AXIS_Y

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 480 300"
          role="img"
          aria-label="Pręt kołowy pod złożonym obciążeniem oraz koło Mohra. Animacja pokazuje punkt naprężenia, naprężenia główne, maksymalne ścinanie i współczynniki bezpieczeństwa."
        >
          <defs>
            <marker
              id="mohr1-load"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={LOAD} />
            </marker>
            <marker
              id="mohr1-violet"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={VIOLET} />
            </marker>
            <marker
              id="mohr1-accent"
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

          <text x={14} y={20} fontSize={10} fontWeight={700} fill={INK}>
            pręt kołowy · d = 60 mm
          </text>
          <text x={14} y={34} fontSize={8.5} fill={MUTED}>
            N = 30 kN · M = 1,2 kN·m
          </text>
          <text x={14} y={48} fontSize={8.5} fill={MUTED}>
            T = 800 N·m · R_e = 235 MPa
          </text>

          {isState ? (
            <g>
              <rect x={78} y={170} width={62} height={62} rx={4} fill={LIGHT} stroke={EDGE} strokeWidth={1.4} />
              <line x1={78} y1={201} x2={140} y2={201} stroke={MUTED} strokeWidth={0.8} strokeDasharray="3 3" />
              <line x1={109} y1={170} x2={109} y2={232} stroke={MUTED} strokeWidth={0.8} strokeDasharray="3 3" />
              <line x1={140} y1={190} x2={188} y2={190} stroke={LOAD} strokeWidth={2} markerEnd="url(#mohr1-load)" />
              <text x={146} y={183} fontSize={9} fill={LOAD}>
                σx = {pl(SIGMA_X)}
              </text>
              <line
                x1={137}
                y1={225}
                x2={137}
                y2={178}
                stroke={VIOLET}
                strokeWidth={2}
                markerEnd="url(#mohr1-violet)"
              />
              <text x={145} y={216} fontSize={9} fill={VIOLET}>
                τ = {pl(TAU)}
              </text>
              <text x={80} y={250} fontSize={8.5} fill={MUTED}>
                σy = 0 · σz = 0
              </text>
              <circle cx={109} cy={201} r={3} fill={INK} />
            </g>
          ) : (
            <g>
              <text x={14} y={68} fontSize={8.5} fill={isModel ? INK : MUTED}>
                punkt A na obwodzie przekroju
              </text>
              <circle cx={CX} cy={CY} r={SEC_R} fill={LIGHT} stroke={EDGE} strokeWidth={1.4} />
              <line x1={CX - SEC_R} y1={CY} x2={CX + SEC_R} y2={CY} stroke={MUTED} strokeWidth={0.8} />
              <line x1={CX} y1={CY - SEC_R} x2={CX} y2={CY + SEC_R} stroke={MUTED} strokeWidth={0.8} />
              <text x={CX} y={CY + SEC_R + 14} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                przekrój
              </text>
              <motion.circle
                cx={AX}
                cy={AY}
                r={5}
                fill={LOAD}
                fillOpacity={0.25}
                stroke={LOAD}
                strokeWidth={1.2}
                animate={{ opacity: playing ? [0.45, 1, 0.45] : 1 }}
                transition={{ duration: 1.6, repeat: playing ? Infinity : 0, ease: 'easeInOut' }}
              />
              <circle cx={AX} cy={AY} r={2.4} fill={LOAD} />
              <text x={AX + 8} y={AY - 4} fontSize={9} fontWeight={700} fill={LOAD}>
                A
              </text>
            </g>
          )}

          {isModel && (
            <g>
              <rect x={95} y={78} width={36} height={70} rx={4} fill={LIGHT} stroke={EDGE} strokeWidth={1.4} />
              <line x1={CX} y1={78} x2={CX} y2={148} stroke={ACCENT} strokeWidth={0.8} strokeDasharray="3 3" />
              <line x1={CX} y1={72} x2={CX} y2={54} stroke={LOAD} strokeWidth={2.2} markerEnd="url(#mohr1-load)" />
              <text x={CX + 8} y={64} fontSize={9} fill={LOAD}>
                N
              </text>
              <path
                d="M 94 92 C 76 82, 76 108, 94 100"
                fill="none"
                stroke={VIOLET}
                strokeWidth={1.8}
                markerEnd="url(#mohr1-violet)"
              />
              <text x={66} y={96} fontSize={9} fill={VIOLET}>
                M
              </text>
              <path
                d="M 133 116 C 153 108, 153 138, 133 130"
                fill="none"
                stroke={LOAD}
                strokeWidth={1.8}
                markerEnd="url(#mohr1-load)"
              />
              <text x={156} y={128} fontSize={9} fill={LOAD}>
                T
              </text>
              <text x={142} y={94} fontSize={8} fill={MUTED}>
                obciążenie
              </text>
            </g>
          )}

          {!isDecision && (
            <g>
              <line x1={238} y1={AXIS_Y} x2={460} y2={AXIS_Y} stroke={MUTED} strokeWidth={1} />
              <line x1={SX(0)} y1={56} x2={SX(0)} y2={252} stroke={MUTED} strokeWidth={1} />
              <line x1={SX(0) - 4} y1={AXIS_Y} x2={SX(0) + 4} y2={AXIS_Y} stroke={MUTED} strokeWidth={1} />
              <text x={458} y={AXIS_Y - 7} textAnchor="end" fontSize={8.5} fill={MUTED}>
                σ [MPa]
              </text>
              <text x={SX(0) + 6} y={66} fontSize={8.5} fill={MUTED}>
                τ [MPa]
              </text>
            </g>
          )}

          {isModel && (
            <g>
              <text x={354} y={116} textAnchor="middle" fontSize={9} fill={MUTED}>
                koło Mohra
              </text>
              <text x={354} y={132} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                powstanie z punktu X(σx, τ)
              </text>
              <motion.circle
                cx={SX(AVG)}
                cy={AXIS_Y}
                r={RADIUS * SCALE}
                fill="none"
                stroke={MUTED}
                strokeWidth={1.2}
                strokeDasharray="4 5"
                animate={{ opacity: playing ? [0.18, 0.35, 0.18] : 0.28 }}
                transition={{ duration: 1.8, repeat: playing ? Infinity : 0, ease: 'easeInOut' }}
              />
            </g>
          )}

          {showCircle && (
            <g>
              <motion.circle
                cx={SX(AVG)}
                cy={AXIS_Y}
                r={RADIUS * SCALE}
                fill={ACCENT}
                fillOpacity={0.05}
                stroke={ACCENT}
                strokeWidth={2}
                strokeDasharray={circumference}
                initial={false}
                animate={{ strokeDashoffset: circumference * (1 - circleProgress) }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <circle cx={SX(AVG)} cy={AXIS_Y} r={2.6} fill={EDGE} />

              {isState && (
                <g>
                  <line x1={SX(AVG)} y1={AXIS_Y} x2={SX(SIGMA_X)} y2={SY(TAU)} stroke={ACCENT} strokeWidth={1.5} />
                  <line
                    x1={SX(SIGMA_X)}
                    y1={SY(TAU)}
                    x2={SX(SIGMA_X)}
                    y2={AXIS_Y}
                    stroke={MUTED}
                    strokeWidth={1}
                    strokeDasharray="3 3"
                  />
                  <line
                    x1={SX(0)}
                    y1={SY(TAU)}
                    x2={SX(SIGMA_X)}
                    y2={SY(TAU)}
                    stroke={MUTED}
                    strokeWidth={1}
                    strokeDasharray="3 3"
                  />
                  <motion.circle
                    cx={SX(SIGMA_X)}
                    cy={SY(TAU)}
                    r={4.5}
                    fill={LOAD}
                    animate={{ opacity: pointProgress }}
                    initial={false}
                    transition={{ duration: 0.1 }}
                  />
                  <text x={SX(SIGMA_X) + 8} y={SY(TAU) - 4} fontSize={9} fontWeight={700} fill={LOAD}>
                    X(σx, τ)
                  </text>
                  <text x={SX(SIGMA_X)} y={AXIS_Y + 14} textAnchor="middle" fontSize={8.5} fill={LOAD}>
                    σx = {pl(SIGMA_X)}
                  </text>
                  <text x={SX(0) + 5} y={SY(TAU) + 3} fontSize={8.5} fill={MUTED}>
                    τ
                  </text>
                  <circle cx={SX(SIGMA_X)} cy={SY(-TAU)} r={3} fill={ACCENT} opacity={0.6} />
                  <text x={SX(AVG)} y={AXIS_Y - 8} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                    σavg
                  </text>
                </g>
              )}

              {isPrincipal && (
                <g>
                  <circle cx={SX(SIGMA_X)} cy={SY(TAU)} r={3} fill={LOAD} opacity={0.7} />
                  <text x={SX(SIGMA_X) + 6} y={SY(TAU) - 4} fontSize={8} fill={LOAD}>
                    X
                  </text>
                  <line
                    x1={SX(AVG)}
                    y1={AXIS_Y}
                    x2={SX(S1)}
                    y2={AXIS_Y}
                    stroke={ACCENT}
                    strokeWidth={2.2}
                    markerEnd="url(#mohr1-accent)"
                  />
                  <text x={(SX(AVG) + SX(S1)) / 2} y={AXIS_Y - 10} textAnchor="middle" fontSize={8.5} fill={ACCENT}>
                    R = {pl(RADIUS)}
                  </text>
                  <path
                    d={`M ${arcStartX} ${arcStartY} A ${arcR} ${arcR} 0 0 1 ${arcEndX} ${arcEndY}`}
                    fill="none"
                    stroke={VIOLET}
                    strokeWidth={1.3}
                  />
                  <text x={arcEndX + 4} y={arcStartY - 3} fontSize={8} fill={VIOLET}>
                    2α
                  </text>
                  <line x1={SX(S2)} y1={AXIS_Y - 5} x2={SX(S2)} y2={AXIS_Y + 5} stroke={EDGE} strokeWidth={1.4} />
                  <line x1={SX(S1)} y1={AXIS_Y - 5} x2={SX(S1)} y2={AXIS_Y + 5} stroke={EDGE} strokeWidth={1.4} />
                  <text x={SX(S2)} y={AXIS_Y + 18} textAnchor="middle" fontSize={8} fill={EDGE}>
                    σ2 = {pl(S2)}
                  </text>
                  <text x={SX(S1)} y={AXIS_Y + 18} textAnchor="middle" fontSize={8} fill={EDGE}>
                    σ1 = {pl(S1)}
                  </text>
                  <text x={SX(AVG)} y={AXIS_Y + 32} textAnchor="middle" fontSize={8} fill={MUTED}>
                    σavg = {pl(AVG)}
                  </text>
                </g>
              )}

              {isCriteria && (
                <g>
                  <line x1={SX(AVG)} y1={SY(RADIUS)} x2={SX(AVG)} y2={SY(-RADIUS)} stroke={LOAD} strokeWidth={2.2} />
                  <text x={SX(AVG) + 6} y={SY(RADIUS) + 3} fontSize={8.5} fill={LOAD}>
                    τmax = {pl(RADIUS)}
                  </text>
                  <line x1={SX(S2)} y1={AXIS_Y + 5} x2={SX(S1)} y2={AXIS_Y + 5} stroke={LOAD} strokeWidth={2.6} />
                  <text x={SX(AVG)} y={AXIS_Y - 6} textAnchor="middle" fontSize={8.5} fontWeight={700} fill={LOAD}>
                    2R = {pl(TRESCA)} MPa
                  </text>
                  <line x1={SX(HMH)} y1={AXIS_Y - 5} x2={SX(HMH)} y2={AXIS_Y + 5} stroke={GREEN} strokeWidth={2} />
                  <motion.circle
                    cx={SX(HMH)}
                    cy={AXIS_Y}
                    r={4}
                    fill={GREEN}
                    animate={{ opacity: playing ? [0.5, 1, 0.5] : 1 }}
                    transition={{ duration: 1.5, repeat: playing ? Infinity : 0, ease: 'easeInOut' }}
                  />
                  <text x={SX(HMH)} y={AXIS_Y + 42} textAnchor="middle" fontSize={8.5} fill={GREEN}>
                    σHMH = {pl(HMH)}
                  </text>
                  <text x={250} y={82} fontSize={8.5} fill={MUTED}>
                    Treska patrzy na średnicę, HMH na energię postaciową
                  </text>
                </g>
              )}
            </g>
          )}

          {isDecision && <SafetyBars progress={progress} />}

          <text x={466} y={292} textAnchor="end" fontSize={8} fill={MUTED}>
            {isModel
              ? 'model i dane'
              : isState
                ? 'odczyt σ i τ'
                : isPrincipal
                  ? 'punkty główne'
                  : isCriteria
                    ? 'ścinanie i hipotezy'
                    : 'decyzja projektowa'}
          </text>
        </svg>
      </div>
    </div>
  )
}
