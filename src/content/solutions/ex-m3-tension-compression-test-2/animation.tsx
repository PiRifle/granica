import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const LOAD = '#ff6b45'
const MUTED = '#87929d'
const EDGE = '#68727e'
const INK = '#17202a'
const YIELD = '#d8a13b'
const ULTIMATE = '#a970dd'
const BAD = '#d64545'

const CHART = { x0: 236, x1: 446, y0: 252, yTop: 46, maxStress: 500 }
const CX = 108
const TOP = 74
const BASE = 118
const HALF = 19
const GRIP = 24

const RE = 235
const RM = 400
const E = 200000

const TARGET = { sigma: 200, eps: 0.001 }
const TARGET2 = { sigma: 400, epsPred: 0.002, epsActual: 0.12 }

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}
const pl = (value: number, digits = 2) => value.toFixed(digits).replace('.', ',')

function stressAt(epsMille: number) {
  const ey = (RE / E) * 1000
  if (epsMille <= ey) return E * (epsMille / 1000)
  if (epsMille <= 8) return RE + ((epsMille - ey) / (8 - ey)) * 5
  if (epsMille <= 120) {
    const t = (epsMille - 8) / 112
    return 240 + (RM - 240) * Math.pow(t, 0.55)
  }
  const t = (epsMille - 120) / 80
  return RM - 80 * Math.pow(clamp01(t), 0.9)
}

function stretchFor(epsMille: number) {
  return 25 * Math.pow(clamp01(epsMille / 120), 0.32)
}

function neckFor(epsMille: number) {
  return 0.6 * Math.pow(clamp01((epsMille - 108) / 92), 0.35)
}

export function TensileTestExample2Animation({ scene, index, playing, sceneProgress }: SolutionAnimationProps) {
  const p = playing ? clamp01(sceneProgress) : 1
  const metric = scene.focus?.metric ?? 'A'
  const stages = ['rest', 'elastic', 'strain', 'plastic', 'ultimate', 'compare'] as const
  const stage = stages[Math.min(index, stages.length - 1)] ?? 'rest'
  const isPlastic = stage === 'plastic'
  const isUltimate = stage === 'ultimate'
  const isCompare = stage === 'compare'
  const lateStage = isUltimate || isCompare

  const lateEps = isUltimate
    ? TARGET.eps * 1000 + (TARGET2.epsActual * 1000 - TARGET.eps * 1000) * smooth(p)
    : TARGET2.epsActual * 1000
  const eps = stage === 'rest' ? 0 : isPlastic ? 20 : lateStage ? lateEps : TARGET.eps * 1000
  const sigma = stressAt(eps)
  const stretch = stretchFor(eps)
  const neck = lateStage ? neckFor(eps) : 0
  const bottom = TOP + BASE + stretch
  const gripBottom = bottom + GRIP
  const crack = isUltimate ? clamp01((eps - 190) / 10) : 0

  const xMax = stage === 'rest' || stage === 'elastic' || stage === 'strain' ? 2.5 : isPlastic ? 20 : 200
  const curveEnd = stage === 'rest' ? 0 : isPlastic ? 20 : isUltimate ? eps : isCompare ? 200 : eps
  const draw = isUltimate ? 1 : playing ? smooth(clamp01(p / 0.62)) : 1
  const loadReveal = smooth(clamp01(p / 0.35))

  const full = xMax >= 100
  const xFor = (value: number) => CHART.x0 + clamp01(value / xMax) * (CHART.x1 - CHART.x0)
  const yFor = (value: number) => CHART.y0 - (value / CHART.maxStress) * (CHART.y0 - CHART.yTop)

  const curve = (end: number) => {
    if (end <= 0) return ''
    const steps = 90
    const points: string[] = []
    for (let step = 0; step <= steps; step += 1) {
      const current = (step / steps) * end
      const x = xFor(current)
      const y = yFor(stressAt(current))
      points.push(`${step === 0 ? 'M' : 'L'}${x.toFixed(2)} ${y.toFixed(2)}`)
    }
    return points.join(' ')
  }

  const ghost = curve(xMax)
  const active = curve(curveEnd)

  const markerEps = isPlastic ? 2 : lateStage ? eps : TARGET.eps * 1000
  const markerSigma = isPlastic ? stressAt(2) : lateStage ? sigma : TARGET.sigma
  const markerX = xFor(markerEps)
  const markerY = yFor(markerSigma)
  const markerVisible = stage !== 'rest' && p > 0.22
  const showPredicted = isPlastic || isUltimate || isCompare
  const predX = xFor(TARGET2.epsPred * 1000)
  const predY = yFor(TARGET2.sigma)
  const elasticX = xFor(TARGET.eps * 1000)
  const elasticY = yFor(TARGET.sigma)

  const waist = HALF * (1 - 0.62 * clamp01(neck))
  const mid = TOP + (bottom - TOP) / 2
  const gaugePath = `M${CX - HALF} ${TOP}
    C${CX - HALF} ${TOP + BASE * 0.28} ${CX - waist} ${mid - BASE * 0.12} ${CX - waist} ${mid}
    C${CX - waist} ${mid + BASE * 0.12} ${CX - HALF} ${bottom - BASE * 0.28} ${CX - HALF} ${bottom}
    L${CX + HALF} ${bottom}
    C${CX + HALF} ${bottom - BASE * 0.28} ${CX + waist} ${mid + BASE * 0.12} ${CX + waist} ${mid}
    C${CX + waist} ${mid - BASE * 0.12} ${CX + HALF} ${TOP + BASE * 0.28} ${CX + HALF} ${TOP}
    Z`

  const stateLabel =
    stage === 'rest'
      ? 'próbka nieobciążona'
      : isPlastic
        ? 'płynięcie'
        : lateStage
          ? eps < 118
            ? 'umocnienie'
            : 'przewężenie'
          : 'zakres sprężysty'

  const xTicks = full ? [0, 50, 100, 150, 200] : xMax === 20 ? [0, 10, 20] : [0, 1, 2]

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 300"
          role="img"
          aria-label="Płaska próbka stalowa rozciągana siłą 10 kN i rozwijająca się krzywa naprężenie–odkształcenie: sprężystość, płynięcie, umocnienie i przewężenie"
        >
          <defs>
            <marker id="tc1-load" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0 0 L10 5 L0 10 Z" fill={LOAD} />
            </marker>
            <marker
              id="tc1-dim"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={MUTED} />
            </marker>
          </defs>

          <text x={14} y={20} fontSize={9} fontWeight={700} fill={INK}>
            PRÓBKA ROZCIĄGANA
          </text>
          <text x={CHART.x0} y={20} fontSize={9} fontWeight={700} fill={INK}>
            KRZYWA σ–ε
          </text>
          <text x={CHART.x1} y={20} textAnchor="end" fontSize={8.5} fill={MUTED}>
            etap: {stateLabel}
          </text>

          <g stroke={EDGE} strokeWidth={2} strokeLinecap="round">
            <line x1={CX - 30} y1={TOP - GRIP} x2={CX + 30} y2={TOP - GRIP} />
            {Array.from({ length: 6 }, (_, tick) => {
              const x = CX - 26 + tick * 10.4
              return <line key={tick} x1={x} y1={TOP - GRIP} x2={x - 7} y2={TOP - GRIP - 10} strokeWidth={1.3} />
            })}
          </g>
          <rect
            x={CX - 30}
            y={TOP - GRIP}
            width={60}
            height={GRIP}
            rx={3}
            fill="#dfe5ea"
            stroke={EDGE}
            strokeWidth={1.4}
          />
          <rect x={CX - 30} y={bottom} width={60} height={GRIP} rx={3} fill="#dfe5ea" stroke={EDGE} strokeWidth={1.4} />

          <path d={gaugePath} fill={ACCENT} fillOpacity={0.14} stroke={ACCENT} strokeWidth={2} />

          <line
            x1={CX - HALF - 20}
            y1={TOP}
            x2={CX - HALF - 20}
            y2={TOP + BASE}
            stroke={MUTED}
            strokeWidth={1}
            markerStart="url(#tc1-dim)"
            markerEnd="url(#tc1-dim)"
          />
          <text
            transform={`translate(${CX - HALF - 27} ${TOP + BASE / 2}) rotate(-90)`}
            textAnchor="middle"
            fontSize={8.5}
            fill={MUTED}
          >
            L₀ = 50 mm
          </text>

          <line
            x1={CX - HALF}
            y1={TOP + 10}
            x2={CX + HALF}
            y2={TOP + 10}
            stroke={MUTED}
            strokeWidth={1}
            markerStart="url(#tc1-dim)"
            markerEnd="url(#tc1-dim)"
          />
          <text x={CX + HALF + 7} y={TOP + 13} fontSize={8.5} fill={MUTED}>
            b = 12,5 mm
          </text>

          <line
            x1={CX - HALF - 13}
            y1={TOP + BASE}
            x2={CX + HALF + 13}
            y2={TOP + BASE}
            stroke={MUTED}
            strokeWidth={1}
            strokeDasharray="3 3"
            opacity={0.7}
          />

          <g>
            <rect
              x={18}
              y={252}
              width={36}
              height={11}
              rx={1.5}
              fill={ACCENT}
              fillOpacity={0.16}
              stroke={ACCENT}
              strokeWidth={1.2}
            />
            <text x={18} y={246} fontSize={7.5} fill={MUTED}>
              przekrój
            </text>
            <text x={18} y={275} fontSize={7.5} fill={MUTED}>
              b × t = 12,5 × 4 mm
            </text>
          </g>

          <motion.g animate={{ opacity: loadReveal }} initial={false}>
            <line
              x1={CX}
              y1={gripBottom + 5}
              x2={CX}
              y2={gripBottom + 31}
              stroke={LOAD}
              strokeWidth={2.4}
              markerEnd="url(#tc1-load)"
            />
            <text x={CX + 8} y={gripBottom + 27} fontSize={8.5} fill={LOAD} fontWeight={metric === 'N' ? 700 : 500}>
              N = 10 kN
            </text>
          </motion.g>

          {metric === 'ε' && stage !== 'rest' && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: p > 0.3 ? 1 : 0 }}>
              <line
                x1={CX + HALF + 12}
                y1={TOP + BASE}
                x2={CX + HALF + 12}
                y2={bottom}
                stroke={ACCENT}
                strokeWidth={1.2}
              />
              <line
                x1={CX + HALF + 8}
                y1={TOP + BASE}
                x2={CX + HALF + 16}
                y2={TOP + BASE}
                stroke={ACCENT}
                strokeWidth={1.2}
              />
              <line x1={CX + HALF + 8} y1={bottom} x2={CX + HALF + 16} y2={bottom} stroke={ACCENT} strokeWidth={1.2} />
              <text x={CX + HALF + 20} y={bottom - 18} fontSize={8.5} fill={ACCENT} fontWeight={700}>
                ΔL = 0,05 mm
              </text>
              <text x={CX + HALF + 20} y={bottom - 7} fontSize={8} fill={ACCENT}>
                ε = 0,001 (0,1%)
              </text>
            </motion.g>
          )}

          {crack > 0 && (
            <motion.path
              d={`M${CX - HALF + 4} ${mid} l6 -5 l6 10 l6 -10 l6 6 l6 -1`}
              fill="none"
              stroke={INK}
              strokeWidth={1.6}
              initial={false}
              animate={{ opacity: crack }}
            />
          )}

          <line x1={CHART.x0} y1={CHART.y0} x2={CHART.x1} y2={CHART.y0} stroke={MUTED} strokeWidth={1.2} />
          <line x1={CHART.x0} y1={CHART.y0} x2={CHART.x0} y2={CHART.yTop} stroke={MUTED} strokeWidth={1.2} />
          <text x={CHART.x0 - 6} y={CHART.yTop - 2} textAnchor="end" fontSize={8.5} fill={MUTED}>
            σ [MPa]
          </text>
          <text x={CHART.x1} y={CHART.y0 - 6} textAnchor="end" fontSize={8.5} fill={MUTED}>
            ε [‰]
          </text>

          {[RE, RM].map((value, tick) => (
            <g key={`y-${value}`}>
              <line
                x1={CHART.x0}
                y1={yFor(value)}
                x2={CHART.x1}
                y2={yFor(value)}
                stroke={MUTED}
                strokeWidth={0.8}
                strokeDasharray="4 4"
                opacity={0.7}
              />
              <text
                x={CHART.x0 - 5}
                y={yFor(value) + 3}
                textAnchor="end"
                fontSize={7.5}
                fill={tick === 0 ? YIELD : ULTIMATE}
              >
                {value === RE ? '235 = Re' : '400 = Rm'}
              </text>
            </g>
          ))}
          <text x={CHART.x0 - 5} y={CHART.y0 + 3} textAnchor="end" fontSize={7.5} fill={MUTED}>
            0
          </text>

          {xTicks.map((tick) => (
            <g key={`x-${tick}`}>
              <line x1={xFor(tick)} y1={CHART.y0} x2={xFor(tick)} y2={CHART.y0 + 4} stroke={MUTED} strokeWidth={0.9} />
              <text x={xFor(tick)} y={CHART.y0 + 13} textAnchor="middle" fontSize={7.5} fill={MUTED}>
                {tick}
              </text>
            </g>
          ))}

          <path d={ghost} fill="none" stroke={MUTED} strokeWidth={1} opacity={0.2} />
          {active && (
            <motion.path
              d={active}
              fill="none"
              stroke={lateStage ? ULTIMATE : ACCENT}
              strokeWidth={2.4}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: draw }}
              transition={{ duration: 0.25, ease: 'linear' }}
            />
          )}

          {showPredicted && (
            <g>
              <line
                x1={CHART.x0}
                y1={CHART.y0}
                x2={predX}
                y2={predY}
                stroke={BAD}
                strokeWidth={1.3}
                strokeDasharray="4 4"
              />
              <line x1={predX - 4} y1={predY - 4} x2={predX + 4} y2={predY + 4} stroke={BAD} strokeWidth={1.6} />
              <line x1={predX - 4} y1={predY + 4} x2={predX + 4} y2={predY - 4} stroke={BAD} strokeWidth={1.6} />
              <text x={predX + 7} y={predY - 6} fontSize={7.5} fill={BAD}>
                ε = 0,002 z liniowego wzoru
              </text>
              <text x={predX + 7} y={predY + 7} fontSize={7.5} fill={BAD}>
                400 MPa — poza krzywą
              </text>
            </g>
          )}

          {isPlastic && (
            <g>
              <circle cx={markerX} cy={markerY} r={4} fill={YIELD} />
              <text x={markerX + 6} y={markerY + 12} fontSize={7.5} fill={YIELD}>
                Re = 235
              </text>
            </g>
          )}

          {isCompare && (
            <g>
              <circle cx={elasticX} cy={elasticY} r={4} fill={ACCENT} />
              <text x={elasticX + 7} y={elasticY + 12} fontSize={7.5} fill={ACCENT}>
                200 MPa — A₀ = 50 mm²
              </text>
            </g>
          )}

          {markerVisible && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
              {!full && (
                <>
                  <line
                    x1={CHART.x0}
                    y1={markerY}
                    x2={markerX}
                    y2={markerY}
                    stroke={ACCENT}
                    strokeWidth={0.8}
                    strokeDasharray="3 3"
                    opacity={0.6}
                  />
                  <line
                    x1={markerX}
                    y1={CHART.y0}
                    x2={markerX}
                    y2={markerY}
                    stroke={ACCENT}
                    strokeWidth={0.8}
                    strokeDasharray="3 3"
                    opacity={0.6}
                  />
                </>
              )}
              <circle
                cx={markerX}
                cy={markerY}
                r={5}
                fill="#fff"
                stroke={lateStage ? ULTIMATE : ACCENT}
                strokeWidth={2.2}
              />
              {(stage === 'elastic' || stage === 'strain' || lateStage) && (
                <text
                  x={markerX + 8}
                  y={markerY - 5}
                  fontSize={8}
                  fontWeight={700}
                  fill={lateStage ? ULTIMATE : ACCENT}
                >
                  {stage === 'elastic' ? 'σ = 200' : stage === 'strain' ? 'ε = 0,001' : `σ = ${pl(sigma, 0)} MPa`}
                </text>
              )}
            </motion.g>
          )}

          {stage === 'elastic' && (
            <text x={CHART.x0 + 5} y={CHART.yTop + 10} fontSize={8} fill={ACCENT}>
              punkt w zakresie sprężystym
            </text>
          )}
          {stage === 'strain' && (
            <text x={CHART.x0 + 5} y={CHART.yTop + 10} fontSize={8} fill={ACCENT}>
              ε = 0,001 — punkt pomiarowy
            </text>
          )}
          {isPlastic && (
            <text x={CHART.x0 + 5} y={CHART.yTop + 10} fontSize={8} fill={YIELD}>
              400 MPa &gt; Re — materiał płynie
            </text>
          )}
          {lateStage && (
            <text x={CHART.x0 + 5} y={CHART.yTop + 10} fontSize={8} fill={ULTIMATE}>
              {isUltimate
                ? `punkt: σ = ${pl(sigma, 0)} MPa, ε = ${pl(eps, 1)}‰`
                : 'ta sama krzywa σ–ε dla obu pól przekroju'}
            </text>
          )}
        </svg>
      </div>
      <p className={local('note')}>
        Model i dane: b = 12,5 mm, t = 4 mm, A₀ = 50 mm², L₀ = 50 mm, N = 10 kN. Skala wydłużenia na rysunku jest
        powiększona.
      </p>
    </div>
  )
}
