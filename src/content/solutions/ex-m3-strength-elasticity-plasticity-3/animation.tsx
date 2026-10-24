import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const ELASTIC = '#4f6df5'
const PLASTIC = '#e0793c'
const RE = '#a970dd'
const RM = '#2f7d5b'
const MUTED = '#87929d'
const INK = '#17202a'
const LOAD = '#ff6b45'

const RE_VALUE = 240
const RM_GENERIC = 290
const SIGMA_MAX = 320
const DOP_STRESS = 160
const FORCE_ELASTIC = 60
const FORCE_DOP = 40

const X0 = 228
const Y0 = 262
const CHART_W = 216
const CHART_H = 184
const EPS_MAX = 0.24
const EPS_E = 0.012
const EPS_PLATEAU = 0.035
const EPS_M = 0.15
const EPS_F = 0.235

const SAMPLE_CX = 104
const SAMPLE_TOP = 86
const SAMPLE_BASE = 244
const SAMPLE_HALF = 29

const X_RE = X0 + (EPS_E / EPS_MAX) * CHART_W
const X_M = X0 + (EPS_M / EPS_MAX) * CHART_W
const Y_RE = Y0 - (RE_VALUE / SIGMA_MAX) * CHART_H
const Y_RM = Y0 - (RM_GENERIC / SIGMA_MAX) * CHART_H
const Y_F = Y0 - ((0.82 * RM_GENERIC) / SIGMA_MAX) * CHART_H

const CURVE = `M${X0} ${Y0} L${X_RE} ${Y_RE} L${X0 + (EPS_PLATEAU / EPS_MAX) * CHART_W} ${Y_RE} C${X0 + 0.09 * (CHART_W / EPS_MAX)} ${Y_RE} ${X0 + 0.12 * (CHART_W / EPS_MAX)} ${Y_RM} ${X_M} ${Y_RM} C${X0 + 0.18 * (CHART_W / EPS_MAX)} ${Y_RM} ${X0 + 0.21 * (CHART_W / EPS_MAX)} ${Y_F} ${X0 + (EPS_F / EPS_MAX) * CHART_W} ${Y_F}`
const BRITTLE = `M${X0} ${Y0} L${X0 + (0.018 / EPS_MAX) * CHART_W} ${Y_RM} Q${X0 + (0.03 / EPS_MAX) * CHART_W} ${Y_RM + 8} ${X0 + (0.055 / EPS_MAX) * CHART_W} ${Y0 - (165 / SIGMA_MAX) * CHART_H}`

const clamp01 = (value: number) => Math.max(0, Math.min(1, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}
const easeOut = (value: number) => 1 - Math.pow(1 - clamp01(value), 3)
const pl = (value: number, digits = 1) => value.toFixed(digits).replace('.', ',')

const xForStrain = (strain: number) => X0 + clamp01(strain / EPS_MAX) * CHART_W
const yForStress = (stress: number) => Y0 - clamp01(stress / SIGMA_MAX) * CHART_H

function stressToStrain(stress: number) {
  if (stress <= RE_VALUE) return (stress / RE_VALUE) * EPS_E
  const fraction = clamp01((stress - RE_VALUE) / (RM_GENERIC - RE_VALUE))
  return EPS_PLATEAU + fraction * (EPS_M - EPS_PLATEAU)
}

export function StrengthElasticityPlasticity3Animation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'given'
  const p = playing ? clamp01(sceneProgress) : 1

  const isGiven = metric === 'given'
  const isRe = metric === 'Re'
  const isService = metric === 'service'
  const isCheck = metric === 'check'
  const isBrittle = metric === 'brittle'

  let stress = 0
  if (isRe) stress = RE_VALUE * easeOut(clamp01(p / 0.75))
  else if (isService) stress = DOP_STRESS * easeOut(clamp01(p / 0.55))
  else if (isCheck) {
    if (p < 0.45) stress = DOP_STRESS * easeOut(p / 0.45)
    else if (p < 0.65) stress = DOP_STRESS
    else stress = DOP_STRESS * (1 - easeOut((p - 0.65) / 0.35))
  }

  const forced = isGiven || isRe ? FORCE_ELASTIC : isService || isCheck ? FORCE_DOP : 0
  const currentStrain = stressToStrain(stress)
  const currentX = xForStrain(currentStrain)
  const currentY = yForStress(stress)
  const peakX = xForStrain((DOP_STRESS / RE_VALUE) * EPS_E)
  const peakY = yForStress(DOP_STRESS)

  const traceTarget = isBrittle ? 1 : isGiven ? 0.24 : isRe ? 0.4 : 0.36
  const trace = isBrittle ? 1 : playing ? traceTarget * smooth(clamp01(p / 0.7)) : traceTarget
  const stretched = 56 * Math.pow(clamp01(currentStrain / EPS_M), 0.7)
  const sampleBottom = SAMPLE_BASE + stretched
  const isPlastic = stress > RE_VALUE + 0.5
  const stateColor = isPlastic ? PLASTIC : ELASTIC
  const showMargin = isService || isCheck
  const showUnload = isCheck && p > 0.65
  const forceVisible = isCheck && stress < 0.5 ? 0 : forced

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 480 360"
          role="img"
          aria-label="Próbka stalowa o polu 250 milimetrów kwadratowych. Animacja pokazuje wyznaczenie granicy plastyczności 240 megapaskali z siły 60 kiloniutonów, naprężenie dopuszczalne 160 megapaskali, siłę dopuszczalną 40 kiloniutonów oraz kontrast z materiałem kruchym, w którym decyduje wytrzymałość R_m."
        >
          <text x={10} y={18} fontSize={9.5} fontWeight={600} fill={INK}>
            S₀ = 250 mm² · F_e = 60 kN
          </text>
          <text x={10} y={32} fontSize={9} fill={MUTED}>
            {isGiven ? 'szukamy R_e = ?' : 'R_e = 240 MPa'}
          </text>
          <text x={10} y={46} fontSize={8.5} fill={MUTED}>
            {isBrittle
              ? 'materiał kruchy: decyduje R_m'
              : isGiven || isRe
                ? 'próba rozciągania'
                : 'σ_dop = 160 MPa · n = 1,5'}
          </text>

          <text x={SAMPLE_CX} y={SAMPLE_TOP - 20} textAnchor="middle" fontSize={8.5} fontWeight={600} fill={stateColor}>
            S₀ = 250 mm²
          </text>

          <g stroke="#68727e" fill="#68727e">
            <rect
              x={SAMPLE_CX - SAMPLE_HALF - 12}
              y={SAMPLE_TOP - 8}
              width={(SAMPLE_HALF + 12) * 2}
              height={8}
              rx={1}
            />
            <rect x={SAMPLE_CX - SAMPLE_HALF - 12} y={sampleBottom} width={(SAMPLE_HALF + 12) * 2} height={8} rx={1} />
          </g>

          <motion.rect
            x={SAMPLE_CX - SAMPLE_HALF}
            y={SAMPLE_TOP}
            width={SAMPLE_HALF * 2}
            height={sampleBottom - SAMPLE_TOP}
            rx={3}
            fill={stateColor}
            fillOpacity={0.16}
            stroke={stateColor}
            strokeWidth={2}
            initial={false}
            animate={{ height: sampleBottom - SAMPLE_TOP, fill: stateColor, stroke: stateColor }}
            transition={{ duration: 0.12, ease: 'linear' }}
          />

          <line
            x1={SAMPLE_CX - SAMPLE_HALF - 8}
            y1={SAMPLE_BASE}
            x2={SAMPLE_CX + SAMPLE_HALF + 8}
            y2={SAMPLE_BASE}
            stroke={MUTED}
            strokeWidth={1.1}
            strokeDasharray="4 4"
          />

          <motion.g initial={false} animate={{ opacity: forceVisible > 0 ? 1 : 0 }} stroke={LOAD} fill={LOAD}>
            <line x1={SAMPLE_CX} y1={sampleBottom + 12} x2={SAMPLE_CX} y2={sampleBottom + 42} strokeWidth={2.4} />
            <path
              d={`M${SAMPLE_CX - 5} ${sampleBottom + 34} L${SAMPLE_CX} ${sampleBottom + 43} L${SAMPLE_CX + 5} ${sampleBottom + 34}`}
              fill="none"
              strokeWidth={2.4}
            />
            <text x={SAMPLE_CX + 9} y={sampleBottom + 34} fontSize={9} stroke="none">
              {isGiven || isRe ? 'F_e' : 'N_dop'} = {forced} kN
            </text>
          </motion.g>

          {isCheck && (
            <text x={SAMPLE_CX} y={SAMPLE_BASE + 62} textAnchor="middle" fontSize={8.5} fontWeight={600} fill={MUTED}>
              S₀,min = N_dop·n/R_e = 250 mm²
            </text>
          )}

          <text x={10} y={330} fontSize={9} fontWeight={600} fill={stateColor}>
            {isBrittle ? 'inny mechanizm zniszczenia' : isPlastic ? 'stan plastyczny' : 'stan sprężysty'}
          </text>

          <text x={X0} y={68} fontSize={9} fontWeight={600} fill={MUTED}>
            σ [MPa]
          </text>
          <line x1={X0} y1={Y0} x2={X0 + CHART_W} y2={Y0} stroke={MUTED} strokeWidth={1} />
          <line x1={X0} y1={Y0} x2={X0} y2={78} stroke={MUTED} strokeWidth={1} />
          <text x={X0 + CHART_W + 4} y={Y0 + 4} fontSize={9} fill={MUTED}>
            ε
          </text>

          <path d={CURVE} fill="none" stroke="#c9d0d9" strokeWidth={2} opacity={isBrittle ? 0.45 : 1} />

          {!isBrittle && (
            <motion.path
              d={CURVE}
              fill="none"
              stroke={stateColor}
              strokeWidth={2.6}
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: trace }}
              transition={{ duration: 0.12, ease: 'linear' }}
            />
          )}

          <line
            x1={X0}
            y1={Y_RE}
            x2={X0 + CHART_W}
            y2={Y_RE}
            stroke={RE}
            strokeWidth={1.2}
            strokeDasharray="5 4"
            opacity={isGiven || isBrittle ? 0 : 1}
          />
          <text
            x={X0 + 3}
            y={Y_RE - 5}
            fontSize={8.5}
            fontWeight={600}
            fill={RE}
            opacity={isGiven ? 0 : isBrittle ? 0.5 : 1}
          >
            R_e = 240 MPa
          </text>
          <circle cx={X_RE} cy={Y_RE} r={4} fill={RE} opacity={isGiven ? 0 : isBrittle ? 0.4 : 1} />

          {(isGiven || isRe || isService || isCheck) && stress > 0.5 && (
            <motion.g initial={false} animate={{ opacity: 1 }}>
              <circle cx={currentX} cy={currentY} r={5} fill={stateColor} />
              <circle
                cx={currentX}
                cy={currentY}
                r={8.5}
                fill="none"
                stroke={stateColor}
                strokeWidth={1.2}
                opacity={0.45}
              />
              <text x={currentX + 10} y={currentY - 9} fontSize={8.5} fontWeight={600} fill={stateColor}>
                {pl(stress, 0)} MPa
              </text>
            </motion.g>
          )}

          {isGiven && (
            <text x={X_RE + 8} y={Y_RE + 16} fontSize={8.5} fontWeight={600} fill={MUTED}>
              R_e = ?
            </text>
          )}

          {showMargin && (
            <g>
              <line
                x1={X0 + CHART_W + 11}
                y1={Y_RE}
                x2={X0 + CHART_W + 11}
                y2={Y0 - (DOP_STRESS / SIGMA_MAX) * CHART_H}
                stroke={MUTED}
                strokeWidth={1.2}
              />
              <line x1={X0 + CHART_W + 7} y1={Y_RE} x2={X0 + CHART_W + 15} y2={Y_RE} stroke={MUTED} />
              <line
                x1={X0 + CHART_W + 7}
                y1={Y0 - (DOP_STRESS / SIGMA_MAX) * CHART_H}
                x2={X0 + CHART_W + 15}
                y2={Y0 - (DOP_STRESS / SIGMA_MAX) * CHART_H}
                stroke={MUTED}
              />
              <text
                transform={`translate(${X0 + CHART_W + 21} ${(Y_RE + Y0 - (DOP_STRESS / SIGMA_MAX) * CHART_H) / 2}) rotate(-90)`}
                textAnchor="middle"
                fontSize={8}
                fill={MUTED}
              >
                zapas 80 MPa · n = 1,5
              </text>
            </g>
          )}

          {showUnload && (
            <motion.g initial={false} animate={{ opacity: clamp01((p - 0.66) / 0.18) }}>
              <line x1={peakX} y1={peakY} x2={X0} y2={Y0} stroke={ELASTIC} strokeWidth={1.4} strokeDasharray="5 4" />
              <line x1={X0} y1={Y0 + 18} x2={peakX} y2={Y0 + 18} stroke={ELASTIC} strokeWidth={1.3} />
              <line x1={X0} y1={Y0 + 13} x2={X0} y2={Y0 + 23} stroke={ELASTIC} />
              <line x1={peakX} y1={Y0 + 13} x2={peakX} y2={Y0 + 23} stroke={ELASTIC} />
              <text x={(X0 + peakX) / 2} y={Y0 + 32} textAnchor="middle" fontSize={8.5} fontWeight={600} fill={ELASTIC}>
                ε_e
              </text>
              <text x={X0} y={Y0 + 52} fontSize={8.5} fontWeight={600} fill={ELASTIC}>
                po odciążeniu ε = 0 — brak odkształcenia trwałego
              </text>
            </motion.g>
          )}

          {isBrittle && (
            <>
              <motion.path
                d={BRITTLE}
                fill="none"
                stroke={PLASTIC}
                strokeWidth={2.6}
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: playing ? smooth(clamp01(p / 0.8)) : 1 }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <circle cx={X0 + (0.018 / EPS_MAX) * CHART_W} cy={Y_RM} r={4} fill={RM} />
              <text x={X0 + (0.018 / EPS_MAX) * CHART_W + 8} y={Y_RM - 6} fontSize={8.5} fontWeight={600} fill={RM}>
                R_m
              </text>
              <text
                x={X0 + (0.055 / EPS_MAX) * CHART_W + 6}
                y={Y0 - (165 / SIGMA_MAX) * CHART_H + 3}
                fontSize={8}
                fill={PLASTIC}
              >
                pękanie
              </text>
              <text x={X0} y={Y0 + 24} fontSize={8.5} fontWeight={600} fill={PLASTIC}>
                brak plateau: o nośności decyduje R_m
              </text>
              <text x={X0} y={Y0 + 38} fontSize={8} fill={MUTED}>
                schemat poglądowy materiału kruchego
              </text>
            </>
          )}

          {isService && (
            <text x={X0} y={Y0 + 24} fontSize={8.5} fontWeight={600} fill={ELASTIC}>
              160 MPa &lt; R_e = 240 MPa
            </text>
          )}
        </svg>
      </div>
    </div>
  )
}
