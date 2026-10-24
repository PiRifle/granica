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

const S0 = 80
const RE_VALUE = 300
const RM_VALUE = 450
const SIGMA_MAX = 520

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
const SAMPLE_HALF = 21

const X_RE = X0 + (EPS_E / EPS_MAX) * CHART_W
const X_M = X0 + (EPS_M / EPS_MAX) * CHART_W
const Y_RE = Y0 - (RE_VALUE / SIGMA_MAX) * CHART_H
const Y_RM = Y0 - (RM_VALUE / SIGMA_MAX) * CHART_H
const Y_F = Y0 - ((0.82 * RM_VALUE) / SIGMA_MAX) * CHART_H

const CURVE = `M${X0} ${Y0} L${X_RE} ${Y_RE} L${X0 + (EPS_PLATEAU / EPS_MAX) * CHART_W} ${Y_RE} C${X0 + 0.09 * (CHART_W / EPS_MAX)} ${Y_RE} ${X0 + 0.12 * (CHART_W / EPS_MAX)} ${Y_RM} ${X_M} ${Y_RM} C${X0 + 0.18 * (CHART_W / EPS_MAX)} ${Y_RM} ${X0 + 0.21 * (CHART_W / EPS_MAX)} ${Y_F} ${X0 + (EPS_F / EPS_MAX) * CHART_W} ${Y_F}`

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
  const fraction = clamp01((stress - RE_VALUE) / (RM_VALUE - RE_VALUE))
  return EPS_PLATEAU + fraction * (EPS_M - EPS_PLATEAU)
}

function plasticStrain(stress: number) {
  return Math.max(0, stressToStrain(stress) - (stress / RE_VALUE) * EPS_E)
}

export function StrengthElasticityPlasticityAnimation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const p = playing ? clamp01(sceneProgress) : 1

  const isModel = metric === 'model'
  const isRe = metric === 'Re'
  const isRm = metric === 'Rm'
  const isUnload = metric === 'unload'
  const isCompare = metric === 'compare'

  const stress = isModel
    ? 0
    : isRe
      ? RE_VALUE * easeOut(clamp01(p / 0.75))
      : isRm
        ? RM_VALUE * easeOut(clamp01(p / 0.8))
        : isUnload
          ? 410
          : RM_VALUE
  const unload = isUnload ? easeOut(clamp01((p - 0.28) / 0.72)) : 0
  const loadedStrain = stressToStrain(stress)
  const currentStrain = loadedStrain - unload * ((stress / RE_VALUE) * EPS_E)

  const loadX = xForStrain(loadedStrain)
  const loadY = yForStress(stress)
  const residualX = xForStrain(plasticStrain(stress))
  const currentX = xForStrain(currentStrain)
  const displayStress = stress * (1 - unload)
  const currentY = yForStress(displayStress)

  const traceTarget = isModel ? 0.2 : isRe ? 0.38 : isRm ? 0.82 : isUnload ? 0.72 : 1
  const trace = isUnload ? traceTarget : playing ? traceTarget * smooth(clamp01(p / 0.7)) : traceTarget
  const stretched = 56 * Math.pow(clamp01(currentStrain / EPS_M), 0.7)
  const sampleBottom = SAMPLE_BASE + stretched
  const isPlastic = currentStrain > EPS_E * 1.08
  const stateColor = isPlastic ? PLASTIC : ELASTIC
  const visibleRe = !isModel || isCompare
  const visibleRm = !isModel || isCompare
  const showResidual = unload > 0.02 && isUnload
  const force = (displayStress * S0) / 1000

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 480 360"
          role="img"
          aria-label="Próbka stalowa o polu 80 milimetrów kwadratowych i krzywa materiału. Animacja pokazuje granicę plastyczności 300 megapaskali, wytrzymałość 450 megapaskali oraz odciążenie z odkształceniem trwałym."
        >
          <text x={10} y={18} fontSize={9.5} fontWeight={600} fill={INK}>
            S₀ = 80 mm²
          </text>
          <text x={10} y={32} fontSize={9} fill={MUTED}>
            R_e = 300 MPa · R_m = 450 MPa
          </text>
          <text x={10} y={46} fontSize={8.5} fill={MUTED}>
            próba rozciągania · stan jednoosiowy
          </text>

          <text x={SAMPLE_CX} y={SAMPLE_TOP - 12} textAnchor="middle" fontSize={9} fontWeight={600} fill={stateColor}>
            próbka
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
            animate={{
              height: sampleBottom - SAMPLE_TOP,
              fill: stateColor,
              stroke: stateColor,
            }}
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

          {showResidual && (
            <motion.g initial={false} animate={{ opacity: clamp01((unload - 0.15) / 0.35) }}>
              <line
                x1={SAMPLE_CX + SAMPLE_HALF + 14}
                y1={SAMPLE_BASE}
                x2={SAMPLE_CX + SAMPLE_HALF + 14}
                y2={sampleBottom}
                stroke={PLASTIC}
                strokeWidth={1.3}
              />
              <line
                x1={SAMPLE_CX + SAMPLE_HALF + 9}
                y1={SAMPLE_BASE}
                x2={SAMPLE_CX + SAMPLE_HALF + 19}
                y2={SAMPLE_BASE}
                stroke={PLASTIC}
              />
              <line
                x1={SAMPLE_CX + SAMPLE_HALF + 9}
                y1={sampleBottom}
                x2={SAMPLE_CX + SAMPLE_HALF + 19}
                y2={sampleBottom}
                stroke={PLASTIC}
              />
              <text
                x={SAMPLE_CX + SAMPLE_HALF + 23}
                y={(SAMPLE_BASE + sampleBottom) / 2 + 3}
                fontSize={8.5}
                fontWeight={600}
                fill={PLASTIC}
              >
                trwałe
              </text>
            </motion.g>
          )}

          <motion.g initial={false} animate={{ opacity: displayStress > 0.5 ? 1 : 0 }} stroke={LOAD} fill={LOAD}>
            <line x1={SAMPLE_CX} y1={sampleBottom + 12} x2={SAMPLE_CX} y2={sampleBottom + 42} strokeWidth={2.4} />
            <path
              d={`M${SAMPLE_CX - 5} ${sampleBottom + 34} L${SAMPLE_CX} ${sampleBottom + 43} L${SAMPLE_CX + 5} ${sampleBottom + 34}`}
              fill="none"
              strokeWidth={2.4}
            />
            <text x={SAMPLE_CX + 9} y={sampleBottom + 34} fontSize={9} stroke="none">
              F = {pl(force)} kN
            </text>
          </motion.g>

          <text x={10} y={330} fontSize={9} fontWeight={600} fill={stateColor}>
            {isPlastic ? 'stan plastyczny' : 'stan sprężysty'}
          </text>

          <text x={X0} y={68} fontSize={9} fontWeight={600} fill={MUTED}>
            σ [MPa]
          </text>
          <line x1={X0} y1={Y0} x2={X0 + CHART_W} y2={Y0} stroke={MUTED} strokeWidth={1} />
          <line x1={X0} y1={Y0} x2={X0} y2={78} stroke={MUTED} strokeWidth={1} />
          <text x={X0 + CHART_W + 4} y={Y0 + 4} fontSize={9} fill={MUTED}>
            ε
          </text>

          <path d={CURVE} fill="none" stroke="#c9d0d9" strokeWidth={2} />

          <motion.path
            d={CURVE}
            fill="none"
            stroke={isPlastic ? PLASTIC : ELASTIC}
            strokeWidth={2.6}
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: trace }}
            transition={{ duration: 0.12, ease: 'linear' }}
          />

          <line
            x1={X0}
            y1={Y_RE}
            x2={X0 + CHART_W}
            y2={Y_RE}
            stroke={RE}
            strokeWidth={1.2}
            strokeDasharray="5 4"
            opacity={visibleRe ? 1 : 0.35}
          />
          <line
            x1={X0}
            y1={Y_RM}
            x2={X0 + CHART_W}
            y2={Y_RM}
            stroke={RM}
            strokeWidth={1.2}
            strokeDasharray="5 4"
            opacity={visibleRm ? 1 : 0.35}
          />
          <text x={X0 + 3} y={Y_RE - 5} fontSize={8.5} fontWeight={600} fill={RE} opacity={visibleRe ? 1 : 0.5}>
            R_e = 300 MPa
          </text>
          <text
            x={X0 + CHART_W - 2}
            y={Y_RM - 6}
            textAnchor="end"
            fontSize={8.5}
            fontWeight={600}
            fill={RM}
            opacity={visibleRm ? 1 : 0.5}
          >
            R_m = 450 MPa
          </text>

          <circle cx={X_RE} cy={Y_RE} r={4} fill={RE} opacity={visibleRe ? 1 : 0.35} />
          <circle cx={X_M} cy={Y_RM} r={4} fill={RM} opacity={visibleRm ? 1 : 0.35} />

          {isCompare && (
            <g>
              <line
                x1={X0 + CHART_W + 11}
                y1={Y_RE}
                x2={X0 + CHART_W + 11}
                y2={Y_RM}
                stroke={MUTED}
                strokeWidth={1.2}
              />
              <line x1={X0 + CHART_W + 7} y1={Y_RE} x2={X0 + CHART_W + 15} y2={Y_RE} stroke={MUTED} />
              <line x1={X0 + CHART_W + 7} y1={Y_RM} x2={X0 + CHART_W + 15} y2={Y_RM} stroke={MUTED} />
              <text
                transform={`translate(${X0 + CHART_W + 20} ${(Y_RE + Y_RM) / 2}) rotate(-90)`}
                textAnchor="middle"
                fontSize={8}
                fill={MUTED}
              >
                Δσ = 150 MPa
              </text>
            </g>
          )}

          {stress > 0.5 && (
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
                {pl(displayStress, 0)} MPa
              </text>
            </motion.g>
          )}

          {isUnload && unload > 0.01 && (
            <g>
              <line
                x1={loadX}
                y1={loadY}
                x2={currentX}
                y2={currentY}
                stroke={PLASTIC}
                strokeWidth={1.5}
                strokeDasharray="5 4"
              />
              <line
                x1={residualX}
                y1={Y0}
                x2={currentX}
                y2={currentY}
                stroke={ELASTIC}
                strokeWidth={1.3}
                strokeDasharray="3 3"
                opacity={0.8}
              />
              <circle cx={residualX} cy={Y0} r={4} fill={PLASTIC} />
            </g>
          )}

          {isUnload && unload > 0.05 && (
            <motion.g initial={false} animate={{ opacity: clamp01((unload - 0.05) / 0.25) }}>
              <line x1={X0} y1={Y0 + 18} x2={residualX} y2={Y0 + 18} stroke={PLASTIC} strokeWidth={1.3} />
              <line x1={X0} y1={Y0 + 13} x2={X0} y2={Y0 + 23} stroke={PLASTIC} />
              <line x1={residualX} y1={Y0 + 13} x2={residualX} y2={Y0 + 23} stroke={PLASTIC} />
              <text
                x={(X0 + residualX) / 2}
                y={Y0 + 32}
                textAnchor="middle"
                fontSize={8.5}
                fontWeight={600}
                fill={PLASTIC}
              >
                ε_p
              </text>

              <line x1={residualX} y1={Y0 + 44} x2={loadX} y2={Y0 + 44} stroke={ELASTIC} strokeWidth={1.3} />
              <line x1={residualX} y1={Y0 + 39} x2={residualX} y2={Y0 + 49} stroke={ELASTIC} />
              <line x1={loadX} y1={Y0 + 39} x2={loadX} y2={Y0 + 49} stroke={ELASTIC} />
              <text
                x={(residualX + loadX) / 2}
                y={Y0 + 58}
                textAnchor="middle"
                fontSize={8.5}
                fontWeight={600}
                fill={ELASTIC}
              >
                ε_e
              </text>
              <text x={X0} y={Y0 + 78} fontSize={8.5} fill={MUTED}>
                odciążenie równoległe do początkowego odcinka
              </text>
            </motion.g>
          )}

          {isCompare && (
            <text x={X0} y={Y0 + 24} fontSize={8.5} fontWeight={600} fill={INK}>
              R_m/R_e = 1,5 · do projektu zwykle R_e
            </text>
          )}
        </svg>
      </div>
    </div>
  )
}
