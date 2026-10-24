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

const RE_VALUE = 235
const RM_VALUE = 370
const SIGMA_MAX = 430
const WORK_STRESS = 150
const REDUCED_STRESS = 300
const FORCE = 18

const X0 = 228
const Y0 = 262
const CHART_W = 216
const CHART_H = 184
const EPS_MAX = 0.24
const EPS_E = 0.012
const EPS_PLATEAU = 0.03
const EPS_M = 0.15
const EPS_F = 0.235

const SAMPLE_CX = 104
const SAMPLE_TOP = 86
const SAMPLE_BASE = 244
const MAX_HALF = 30

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

export function StrengthElasticityPlasticity2Animation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const p = playing ? clamp01(sceneProgress) : 1

  const isModel = metric === 'model'
  const isElastic = metric === 'elastic'
  const isLimits = metric === 'limits'
  const isArea = metric === 'area'
  const isPlastic = metric === 'plastic'

  const shrink = isArea ? easeOut(clamp01(p / 0.75)) : 0
  const area = isArea ? 120 - 60 * shrink : isPlastic ? 60 : 120

  let stress = WORK_STRESS
  if (isElastic) {
    if (p < 0.42) stress = WORK_STRESS * easeOut(p / 0.42)
    else if (p < 0.62) stress = WORK_STRESS
    else stress = WORK_STRESS * (1 - easeOut((p - 0.62) / 0.38))
  } else if (isArea) {
    stress = 18000 / area
  } else if (isPlastic) {
    stress = REDUCED_STRESS * (1 - easeOut(clamp01((p - 0.28) / 0.72)))
  }

  const residual = isPlastic ? plasticStrain(REDUCED_STRESS) : 0
  const currentStrain = isPlastic ? residual + (stress / RE_VALUE) * EPS_E : stressToStrain(stress)
  const peakStress = isElastic ? WORK_STRESS : isPlastic ? REDUCED_STRESS : stress
  const peakX = xForStrain(stressToStrain(peakStress))
  const peakY = yForStress(peakStress)
  const currentX = xForStrain(currentStrain)
  const currentY = yForStress(stress)
  const residualX = xForStrain(residual)
  const areaFraction = area / 120
  const half = MAX_HALF * Math.pow(areaFraction, 0.7)

  const traceTarget = isLimits || isArea ? 1 : isPlastic ? 0.95 : isModel ? 0.32 : 0.38
  const trace = playing ? traceTarget * smooth(clamp01(p / 0.7)) : traceTarget
  const stretched = 56 * Math.pow(clamp01(currentStrain / EPS_M), 0.7)
  const sampleBottom = SAMPLE_BASE + stretched
  const plasticState = isPlastic || (isArea && stress > RE_VALUE + 0.5)
  const stateColor = plasticState ? PLASTIC : ELASTIC
  const showUnloading = isElastic && p > 0.62
  const showPlasticUnload = isPlastic && p > 0.28
  const force = stress > 0.5 ? FORCE : 0

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 480 360"
          role="img"
          aria-label="Próbka stalowa o polu 120 milimetrów kwadratowych i krzywa materiału. Animacja pokazuje stan sprężysty przy 150 megapaskalach, granice 235 i 370 megapaskali, wzrost naprężenia do 300 megapaskali po zmniejszeniu pola oraz odkształcenie trwałe po odciążeniu."
        >
          <text x={10} y={18} fontSize={9.5} fontWeight={600} fill={INK}>
            N = 18 kN · S₀ = {Math.round(area)} mm²
          </text>
          <text x={10} y={32} fontSize={9} fill={MUTED}>
            R_e = 235 MPa · R_m = 370 MPa
          </text>
          <text x={10} y={46} fontSize={8.5} fill={MUTED}>
            ta sama siła, zmienne pole przekroju
          </text>

          {isArea && (
            <rect
              x={SAMPLE_CX - MAX_HALF}
              y={SAMPLE_TOP}
              width={MAX_HALF * 2}
              height={SAMPLE_BASE - SAMPLE_TOP}
              rx={3}
              fill="none"
              stroke={MUTED}
              strokeWidth={1}
              strokeDasharray="3 3"
              opacity={0.7}
            />
          )}

          <g stroke="#68727e" fill="#68727e">
            <rect x={SAMPLE_CX - half - 10} y={SAMPLE_TOP - 8} width={(half + 10) * 2} height={8} rx={1} />
            <rect x={SAMPLE_CX - half - 10} y={sampleBottom} width={(half + 10) * 2} height={8} rx={1} />
          </g>

          <motion.rect
            x={SAMPLE_CX - half}
            y={SAMPLE_TOP}
            width={half * 2}
            height={sampleBottom - SAMPLE_TOP}
            rx={3}
            fill={stateColor}
            fillOpacity={0.16}
            stroke={stateColor}
            strokeWidth={2}
            initial={false}
            animate={{
              x: SAMPLE_CX - half,
              width: half * 2,
              height: sampleBottom - SAMPLE_TOP,
              fill: stateColor,
              stroke: stateColor,
            }}
            transition={{ duration: 0.12, ease: 'linear' }}
          />

          <line
            x1={SAMPLE_CX - MAX_HALF - 8}
            y1={SAMPLE_BASE}
            x2={SAMPLE_CX + MAX_HALF + 8}
            y2={SAMPLE_BASE}
            stroke={MUTED}
            strokeWidth={1.1}
            strokeDasharray="4 4"
          />

          <text x={SAMPLE_CX} y={SAMPLE_TOP - 18} textAnchor="middle" fontSize={8.5} fontWeight={600} fill={stateColor}>
            S = {Math.round(area)} mm²
          </text>

          {isArea && (
            <motion.g initial={false} animate={{ opacity: clamp01(shrink * 1.3) }}>
              <text
                x={SAMPLE_CX}
                y={SAMPLE_TOP + 20}
                textAnchor="middle"
                fontSize={8.5}
                fontWeight={600}
                fill={PLASTIC}
              >
                S₀: 120 → 60 mm²
              </text>
            </motion.g>
          )}

          {showPlasticUnload && (
            <motion.g initial={false} animate={{ opacity: clamp01((p - 0.35) / 0.2) }}>
              <line
                x1={SAMPLE_CX + half + 12}
                y1={SAMPLE_BASE}
                x2={SAMPLE_CX + half + 12}
                y2={sampleBottom}
                stroke={PLASTIC}
                strokeWidth={1.3}
              />
              <line
                x1={SAMPLE_CX + half + 7}
                y1={SAMPLE_BASE}
                x2={SAMPLE_CX + half + 17}
                y2={SAMPLE_BASE}
                stroke={PLASTIC}
              />
              <line
                x1={SAMPLE_CX + half + 7}
                y1={sampleBottom}
                x2={SAMPLE_CX + half + 17}
                y2={sampleBottom}
                stroke={PLASTIC}
              />
              <text x={SAMPLE_CX + half + 21} y={(SAMPLE_BASE + sampleBottom) / 2 + 3} fontSize={8} fill={PLASTIC}>
                trwałe
              </text>
            </motion.g>
          )}

          <motion.g initial={false} animate={{ opacity: force > 0 ? 1 : 0 }} stroke={LOAD} fill={LOAD}>
            <line x1={SAMPLE_CX} y1={sampleBottom + 12} x2={SAMPLE_CX} y2={sampleBottom + 42} strokeWidth={2.4} />
            <path
              d={`M${SAMPLE_CX - 5} ${sampleBottom + 34} L${SAMPLE_CX} ${sampleBottom + 43} L${SAMPLE_CX + 5} ${sampleBottom + 34}`}
              fill="none"
              strokeWidth={2.4}
            />
            <text x={SAMPLE_CX + 9} y={sampleBottom + 34} fontSize={9} stroke="none">
              N = {pl(force, 0)} kN
            </text>
          </motion.g>

          <text x={10} y={330} fontSize={9} fontWeight={600} fill={stateColor}>
            {plasticState ? 'stan plastyczny' : 'stan sprężysty'}
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
            stroke={stateColor}
            strokeWidth={2.6}
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: trace }}
            transition={{ duration: 0.12, ease: 'linear' }}
          />

          <line x1={X0} y1={Y_RE} x2={X0 + CHART_W} y2={Y_RE} stroke={RE} strokeWidth={1.2} strokeDasharray="5 4" />
          <line x1={X0} y1={Y_RM} x2={X0 + CHART_W} y2={Y_RM} stroke={RM} strokeWidth={1.2} strokeDasharray="5 4" />
          <text x={X0 + 3} y={Y_RE - 5} fontSize={8.5} fontWeight={600} fill={RE}>
            R_e = 235 MPa
          </text>
          <text x={X0 + CHART_W - 2} y={Y_RM - 6} textAnchor="end" fontSize={8.5} fontWeight={600} fill={RM}>
            R_m = 370 MPa
          </text>
          <circle cx={X_RE} cy={Y_RE} r={4} fill={RE} />
          <circle cx={X_M} cy={Y_RM} r={4} fill={RM} />

          {isLimits && (
            <g>
              <text x={X0} y={Y0 + 24} fontSize={8.5} fontWeight={600} fill={RE}>
                F_e = 28,2 kN
              </text>
              <text x={X0 + 86} y={Y0 + 24} fontSize={8.5} fontWeight={600} fill={RM}>
                F_m = 44,4 kN
              </text>
              <text x={X0} y={Y0 + 38} fontSize={8} fill={MUTED}>
                granice odnosimy do S₀ = 120 mm²
              </text>
            </g>
          )}

          {(isModel || isElastic || isLimits || isArea || isPlastic) && stress > 0.5 && (
            <g>
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
            </g>
          )}

          {isElastic && (
            <g>
              <line
                x1={X0}
                y1={Y_RE}
                x2={X0}
                y2={yForStress(WORK_STRESS)}
                stroke={MUTED}
                strokeWidth={1}
                strokeDasharray="3 3"
              />
              <text x={X0 + 8} y={(Y_RE + yForStress(WORK_STRESS)) / 2 + 3} fontSize={8} fill={MUTED}>
                zapas 85 MPa
              </text>
            </g>
          )}

          {showUnloading && (
            <g>
              <line
                x1={peakX}
                y1={peakY}
                x2={currentX}
                y2={currentY}
                stroke={ELASTIC}
                strokeWidth={1.4}
                strokeDasharray="5 4"
              />
              <line x1={X0} y1={Y0 + 18} x2={peakX} y2={Y0 + 18} stroke={ELASTIC} strokeWidth={1.3} />
              <line x1={X0} y1={Y0 + 13} x2={X0} y2={Y0 + 23} stroke={ELASTIC} />
              <line x1={peakX} y1={Y0 + 13} x2={peakX} y2={Y0 + 23} stroke={ELASTIC} />
              <text x={(X0 + peakX) / 2} y={Y0 + 32} textAnchor="middle" fontSize={8.5} fontWeight={600} fill={ELASTIC}>
                ε_e
              </text>
              <text x={X0} y={Y0 + 52} fontSize={8.5} fontWeight={600} fill={ELASTIC}>
                po odciążeniu ε = 0, ε_p = 0
              </text>
            </g>
          )}

          {showPlasticUnload && (
            <g>
              <line
                x1={peakX}
                y1={peakY}
                x2={currentX}
                y2={currentY}
                stroke={PLASTIC}
                strokeWidth={1.4}
                strokeDasharray="5 4"
              />
              <circle cx={residualX} cy={Y0} r={4} fill={PLASTIC} />
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
              <line x1={residualX} y1={Y0 + 44} x2={peakX} y2={Y0 + 44} stroke={ELASTIC} strokeWidth={1.3} />
              <line x1={residualX} y1={Y0 + 39} x2={residualX} y2={Y0 + 49} stroke={ELASTIC} />
              <line x1={peakX} y1={Y0 + 39} x2={peakX} y2={Y0 + 49} stroke={ELASTIC} />
              <text
                x={(residualX + peakX) / 2}
                y={Y0 + 58}
                textAnchor="middle"
                fontSize={8.5}
                fontWeight={600}
                fill={ELASTIC}
              >
                ε_e
              </text>
              <text x={X0} y={Y0 + 76} fontSize={8.5} fontWeight={600} fill={PLASTIC}>
                300 MPa &lt; R_m = 370 MPa
              </text>
            </g>
          )}

          {isArea && (
            <text x={X0} y={Y0 + 24} fontSize={8.5} fontWeight={600} fill={plasticState ? PLASTIC : ELASTIC}>
              {plasticState ? 'przekroczono R_e — odkształcenie trwałe' : 'jeszcze zakres sprężysty'}
            </text>
          )}
        </svg>
      </div>
    </div>
  )
}
