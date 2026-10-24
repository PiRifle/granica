import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const LOAD = '#ff6b45'
const LIMIT = '#a970dd'
const MUTED = '#87929d'
const SUPPORT = '#68727e'
const OK = '#2f7d5b'

const X0 = 210
const X1 = 450
const Y_BASE = 280
const Y_TOP = 86
const L_MAX = 4500
const N_MAX = 120
const N_STRENGTH = 75
const L_CRITICAL = 2666.7
const SIGMA_LIMIT = 150
const SIGMA_FINAL = 133.3

const ROD_CX = 110
const ROD_HALF = 18

const clamp01 = (value: number) => Math.max(0, Math.min(1, value))
const easeOut = (value: number) => 1 - Math.pow(1 - clamp01(value), 3)
const pl = (value: number, digits = 1) => value.toFixed(digits).replace('.', ',')

const lx = (length: number) => X0 + (Math.max(0, Math.min(L_MAX, length)) / L_MAX) * (X1 - X0)
const ny = (force: number) => Y_BASE - (Math.max(0, Math.min(N_MAX, force)) / N_MAX) * (Y_BASE - Y_TOP)
const nStiffness = (length: number) => 200000 / length

const curveSamples = Array.from({ length: 41 }, (_, index) => {
  const length = 1700 + (index / 40) * (L_MAX - 1700)
  return [lx(length), ny(nStiffness(length))] as const
})
const curvePath = curveSamples.map(([x, y], index) => `${index === 0 ? 'M' : 'L'}${x} ${y}`).join(' ')

export function StrengthStiffnessDesign3Animation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const raw = playing ? clamp01(sceneProgress) : 1
  const grow = easeOut(raw / 0.7)
  const isModel = metric === 'model'
  const isStrength = metric === 'Nσ'
  const isStiffness = metric === 'Nδ'
  const isCritical = metric === 'L*'
  const isExamples = metric === 'examples'
  const isCheck = metric === 'check'

  const currentLength = isCritical ? L_CRITICAL : isExamples ? 2000 + 2000 * grow : 3000
  const rodHeight = 70 + (currentLength / L_MAX) * 190
  const rodBottom = Y_TOP + rodHeight
  const currentForce = isExamples
    ? Math.min(N_STRENGTH, nStiffness(currentLength))
    : isCheck || isStiffness
      ? nStiffness(3000)
      : isStrength || isCritical
        ? N_STRENGTH
        : 0

  const strengthGrow = isModel ? 0 : isStrength ? grow : 1
  const strengthX2 = X0 + (X1 - X0) * strengthGrow
  const stiffnessGrow = isStiffness ? grow : isModel || isStrength ? 0 : 1
  const criticalOpacity = isCritical ? grow : isExamples || isCheck ? 0.8 : 0
  const regionOpacity = isCritical ? grow * 0.9 : isExamples || isCheck ? 0.55 : 0
  const exampleOpacity = isExamples ? grow : 0
  const checkGrow = isCheck ? grow : 0

  const criticalX = lx(L_CRITICAL)
  const criticalY = ny(N_STRENGTH)
  const exampleExp = currentLength / 1000

  const rodLabel = isModel ? 'L = ?' : isCritical ? 'L* = 2,67 m' : `L = ${pl(exampleExp)} m`
  const forceLabel = isModel
    ? 'N = ?'
    : isExamples
      ? `N = ${pl(currentForce)} kN`
      : isCheck || isStiffness
        ? 'N = 66,7 kN'
        : 'N ≤ 75 kN'

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 480 360"
          role="img"
          aria-label="Pręt o polu 500 mm² i zmiennej długości. Wykres porównuje stałą granicę wytrzymałości 75 kN z malejącą granicą sztywności oraz pokazuje długość krytyczną 2667 mm."
        >
          <text x={10} y={20} fontSize={9} fill={MUTED}>
            A = 500 mm² · E = 200 GPa
          </text>
          <text x={10} y={34} fontSize={9} fill={MUTED}>
            σ_dop = 150 MPa · ΔL_dop = 2 mm
          </text>

          <g stroke={SUPPORT} strokeWidth={2} strokeLinecap="round">
            <line x1={ROD_CX - ROD_HALF - 16} y1={Y_TOP} x2={ROD_CX + ROD_HALF + 16} y2={Y_TOP} />
            {Array.from({ length: 6 }, (_, tick) => {
              const x = ROD_CX - ROD_HALF - 12 + tick * ((ROD_HALF * 2 + 24) / 5)
              return <line key={tick} x1={x} y1={Y_TOP} x2={x - 8} y2={Y_TOP - 12} strokeWidth={1.3} />
            })}
          </g>

          <motion.rect
            x={ROD_CX - ROD_HALF}
            y={Y_TOP}
            width={ROD_HALF * 2}
            height={rodHeight}
            rx={2}
            fill={ACCENT}
            fillOpacity={0.15}
            stroke={ACCENT}
            strokeWidth={2}
            initial={false}
            animate={{ height: rodHeight }}
            transition={{ duration: 0.14, ease: 'linear' }}
          />
          <text x={ROD_CX} y={Y_TOP + 17} textAnchor="middle" fontSize={8.5} fontWeight={600} fill={ACCENT}>
            A = 500 mm²
          </text>

          <line x1={62} y1={Y_TOP} x2={62} y2={rodBottom} stroke={MUTED} strokeWidth={1} />
          <line x1={57} y1={Y_TOP} x2={67} y2={Y_TOP} stroke={MUTED} strokeWidth={1} />
          <line x1={57} y1={rodBottom} x2={67} y2={rodBottom} stroke={MUTED} strokeWidth={1} />
          <text
            transform={`translate(52 ${(Y_TOP + rodBottom) / 2}) rotate(-90)`}
            textAnchor="middle"
            fontSize={8.5}
            fontWeight={isModel || isCritical ? 700 : 500}
            fill={MUTED}
          >
            {rodLabel}
          </text>

          <g stroke={LOAD} fill={LOAD}>
            <line
              x1={ROD_CX + ROD_HALF + 18}
              y1={rodBottom - 32}
              x2={ROD_CX + ROD_HALF + 18}
              y2={rodBottom - 6}
              strokeWidth={2.2}
            />
            <path
              d={`M${ROD_CX + ROD_HALF + 13.5} ${rodBottom - 14} L${ROD_CX + ROD_HALF + 18} ${rodBottom - 6} L${ROD_CX + ROD_HALF + 22.5} ${rodBottom - 14}`}
              fill="none"
              strokeWidth={2.2}
            />
            <text x={ROD_CX + ROD_HALF + 24} y={rodBottom - 38} fontSize={8.5}>
              {forceLabel}
            </text>
          </g>

          <text x={X0} y={44} fontSize={9.5} fontWeight={600} fill={SUPPORT}>
            Nośność N w funkcji długości L
          </text>

          {regionOpacity > 0 && (
            <g opacity={regionOpacity}>
              <rect x={X0} y={Y_TOP} width={criticalX - X0} height={Y_BASE - Y_TOP} fill={ACCENT} opacity={0.06} />
              <rect
                x={criticalX}
                y={Y_TOP}
                width={X1 - criticalX}
                height={Y_BASE - Y_TOP}
                fill={LIMIT}
                opacity={0.08}
              />
              <text x={X0 + 6} y={Y_TOP + 14} fontSize={7.5} fill={ACCENT}>
                decyduje wytrzymałość
              </text>
              <text x={X1 - 6} y={Y_TOP + 14} textAnchor="end" fontSize={7.5} fill={LIMIT}>
                decyduje sztywność
              </text>
            </g>
          )}

          <line x1={X0} y1={Y_BASE} x2={X1} y2={Y_BASE} stroke={MUTED} strokeWidth={1} />
          <line x1={X0} y1={Y_TOP} x2={X0} y2={Y_BASE} stroke={MUTED} strokeWidth={1} />

          {[0, 50, 75, 100].map((force) => (
            <g key={force}>
              <line x1={X0 - 4} y1={ny(force)} x2={X0} y2={ny(force)} stroke={MUTED} strokeWidth={1} />
              <text x={X0 - 7} y={ny(force) + 3} textAnchor="end" fontSize={7.5} fill={force === 75 ? ACCENT : MUTED}>
                {force}
              </text>
            </g>
          ))}

          {[0, 1000, 2000, 3000, 4000].map((length) => (
            <g key={length}>
              <line x1={lx(length)} y1={Y_BASE} x2={lx(length)} y2={Y_BASE + 4} stroke={MUTED} strokeWidth={1} />
              <text x={lx(length)} y={Y_BASE + 15} textAnchor="middle" fontSize={7.5} fill={MUTED}>
                {length}
              </text>
            </g>
          ))}
          <text x={X1} y={Y_BASE + 30} textAnchor="end" fontSize={7.5} fill={MUTED}>
            L [mm]
          </text>
          <text
            transform={`translate(${X0 - 26} ${(Y_TOP + Y_BASE) / 2}) rotate(-90)`}
            textAnchor="middle"
            fontSize={7.5}
            fill={MUTED}
          >
            N [kN]
          </text>

          <line x1={X0} y1={ny(N_STRENGTH)} x2={strengthX2} y2={ny(N_STRENGTH)} stroke={ACCENT} strokeWidth={2.2} />
          {strengthGrow > 0.25 && (
            <text x={X1 - 4} y={ny(N_STRENGTH) - 6} textAnchor="end" fontSize={8.5} fontWeight={600} fill={ACCENT}>
              Nσ = 75 kN
            </text>
          )}

          {stiffnessGrow > 0 && (
            <>
              <motion.path
                d={curvePath}
                fill="none"
                stroke={LIMIT}
                strokeWidth={2.2}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: stiffnessGrow }}
                transition={{ duration: 0.2, ease: 'linear' }}
              />
              <text x={X1 - 4} y={ny(45) + 14} textAnchor="end" fontSize={8.5} fontWeight={600} fill={LIMIT}>
                Nδ(L) = 200 000 / L
              </text>
            </>
          )}

          {criticalOpacity > 0 && (
            <g opacity={criticalOpacity}>
              <line
                x1={criticalX}
                y1={criticalY}
                x2={criticalX}
                y2={Y_BASE}
                stroke={LIMIT}
                strokeWidth={1}
                strokeDasharray="4 4"
              />
              <line
                x1={X0}
                y1={criticalY}
                x2={criticalX}
                y2={criticalY}
                stroke={LIMIT}
                strokeWidth={1}
                strokeDasharray="4 4"
              />
              <circle cx={criticalX} cy={criticalY} r={4} fill={LIMIT} />
              <text x={criticalX - 8} y={criticalY - 8} textAnchor="end" fontSize={8.5} fontWeight={600} fill={LIMIT}>
                L* = 2667 mm
              </text>
            </g>
          )}

          {isStiffness && (
            <g>
              <circle cx={lx(3000)} cy={ny(nStiffness(3000))} r={4} fill={LOAD} />
              <line
                x1={lx(3000)}
                y1={ny(nStiffness(3000))}
                x2={lx(3000)}
                y2={Y_BASE}
                stroke={LOAD}
                strokeWidth={1}
                strokeDasharray="4 4"
              />
              <text x={lx(3000) + 7} y={ny(nStiffness(3000)) - 7} fontSize={8.5} fontWeight={600} fill={LOAD}>
                L = 3 m → 66,7 kN
              </text>
            </g>
          )}

          {isExamples && (
            <g opacity={exampleOpacity}>
              <circle cx={lx(2000)} cy={ny(75)} r={4} fill={ACCENT} />
              <text x={lx(2000) - 7} y={ny(75) - 8} textAnchor="end" fontSize={8} fill={ACCENT}>
                2 m → 75 kN
              </text>
              <circle cx={lx(4000)} cy={ny(50)} r={4} fill={LIMIT} />
              <text x={lx(4000) - 7} y={ny(50) - 8} textAnchor="end" fontSize={8} fill={LIMIT}>
                4 m → 50 kN
              </text>
            </g>
          )}

          {isCheck && (
            <>
              <g>
                <circle cx={lx(3000)} cy={ny(66.7)} r={4} fill={OK} />
                <line
                  x1={lx(3000)}
                  y1={ny(66.7)}
                  x2={lx(3000)}
                  y2={Y_BASE}
                  stroke={OK}
                  strokeWidth={1}
                  strokeDasharray="4 4"
                />
              </g>
              <text x={10} y={316} fontSize={8.5} fontWeight={600} fill={OK}>
                σ = 133,3 MPa ≤ 150 MPa
              </text>
              <rect x={10} y={322} width={170} height={8} rx={2} fill={MUTED} opacity={0.16} />
              <rect
                x={10}
                y={322}
                width={((170 * SIGMA_FINAL) / SIGMA_LIMIT) * checkGrow}
                height={8}
                rx={2}
                fill={OK}
                opacity={0.7}
              />
              <line x1={180} y1={319} x2={180} y2={333} stroke={LIMIT} strokeWidth={1.4} />

              <text x={10} y={344} fontSize={8.5} fontWeight={600} fill={OK}>
                ΔL ≈ 2,0 mm ≤ 2 mm
              </text>
              <rect x={10} y={350} width={170} height={8} rx={2} fill={MUTED} opacity={0.16} />
              <rect x={10} y={350} width={170 * checkGrow} height={8} rx={2} fill={OK} opacity={0.7} />
              <line x1={180} y1={347} x2={180} y2={359} stroke={LIMIT} strokeWidth={1.4} />
            </>
          )}
        </svg>
      </div>
    </div>
  )
}
