import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const LOAD = '#ff6b45'
const LIMIT = '#a970dd'
const MUTED = '#87929d'
const SUPPORT = '#68727e'
const OK = '#2f7d5b'
const BAD = '#d64545'

const TOP = 70
const BASE = 250
const CX = 108
const PX_PER_MM = 38
const LIMIT_DELTA = 1.2

const CHART_X = 214
const CHART_BASE = 258
const CHART_HEIGHT = 150
const AREA_SCALE = 750
const BAR_WIDTH = 32
const BAR_X = [226, 292, 358] as const

const A_STRENGTH = 375
const A_STIFFNESS = 625
const A_CHOSEN = 706.9
const SIGMA = 84.9
const SIGMA_DOP = 160

const clamp01 = (value: number) => Math.max(0, Math.min(1, value))
const easeOut = (value: number) => 1 - Math.pow(1 - clamp01(value), 3)
const pl = (value: number, digits = 1) => value.toFixed(digits).replace('.', ',')
const barTop = (value: number) => CHART_BASE - (value / AREA_SCALE) * CHART_HEIGHT

export function StrengthStiffnessDesignAnimation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const raw = playing ? clamp01(sceneProgress) : 1
  const grow = easeOut(raw / 0.68)
  const isModel = metric === 'model'
  const isStrength = metric === 'Aσ'
  const isStiffness = metric === 'Aδ'
  const isGovern = metric === 'A'
  const isStress = metric === 'σ'
  const isDelta = metric === 'ΔL'
  const afterChoice = isGovern || isStress || isDelta

  const area = isModel
    ? 0
    : isStrength
      ? A_STRENGTH
      : isStiffness
        ? A_STRENGTH + (A_STIFFNESS - A_STRENGTH) * grow
        : afterChoice
          ? isGovern
            ? A_STIFFNESS + (A_CHOSEN - A_STIFFNESS) * grow
            : A_CHOSEN
          : 0

  const delta = isModel
    ? 0
    : isStrength
      ? 2.0 * grow
      : isStiffness
        ? 2.0 - 0.8 * grow
        : isGovern
          ? LIMIT_DELTA - 0.14 * grow
          : isStress
            ? 1.06
            : isDelta
              ? 1.06 * grow
              : 0
  const over = delta > LIMIT_DELTA + 0.001
  const color = over ? BAD : isStress || isDelta || (isGovern && delta < 1.1) ? OK : ACCENT
  const halfWidth = isModel ? 10 : 8 + 20 * Math.sqrt(area / A_CHOSEN)
  const leftEdge = CX - halfWidth
  const rightEdge = CX + halfWidth
  const bottomY = BASE + delta * PX_PER_MM
  const limitY = BASE + LIMIT_DELTA * PX_PER_MM

  const strengthFactor = isModel ? 0 : isStrength ? grow : 1
  const stiffnessFactor = isModel || isStrength ? 0 : isStiffness ? grow : 1
  const chosenFactor = afterChoice ? (isGovern ? grow : 1) : 0

  const stressGrow = isStress ? easeOut(raw / 0.7) : 0
  const gaugeWidth = 194

  const rodLabel = isModel
    ? 'A = ?'
    : isStrength
      ? `Aσ ≥ ${Math.round(area)} mm²`
      : isStiffness
        ? `Aδ ≥ ${Math.round(area)} mm²`
        : `A = ${pl(A_CHOSEN)} mm²`

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 480 360"
          role="img"
          aria-label="Pręt o stałym przekroju pod obciążeniem 60 kN. Animacja porównuje wymagane pole z warunku wytrzymałości 375 mm² i sztywności 625 mm², pokazuje dobór średnicy 30 mm oraz sprawdzenie naprężenia i wydłużenia."
        >
          <text x={10} y={20} fontSize={9} fill={MUTED}>
            N = 60 kN · L = 2,5 m
          </text>
          <text x={10} y={34} fontSize={9} fill={MUTED}>
            E = 200 GPa
          </text>
          <text x={10} y={48} fontSize={9} fill={MUTED}>
            σ_dop = 160 MPa · ΔL_dop = 1,2 mm
          </text>

          <g stroke={SUPPORT} strokeWidth={2} strokeLinecap="round">
            <line x1={leftEdge - 16} y1={TOP} x2={rightEdge + 16} y2={TOP} />
            {Array.from({ length: 7 }, (_, tick) => {
              const x = leftEdge - 12 + tick * ((halfWidth * 2 + 24) / 6)
              return <line key={tick} x1={x} y1={TOP} x2={x - 8} y2={TOP - 12} strokeWidth={1.3} />
            })}
          </g>

          <rect
            x={leftEdge}
            y={TOP}
            width={halfWidth * 2}
            height={BASE - TOP}
            rx={2}
            fill="none"
            stroke={MUTED}
            strokeWidth={1}
            strokeDasharray="3 3"
            opacity={0.7}
          />
          <motion.rect
            x={leftEdge}
            y={TOP}
            width={halfWidth * 2}
            height={bottomY - TOP}
            rx={2}
            fill={color}
            fillOpacity={0.15}
            stroke={color}
            strokeWidth={2}
            initial={false}
            animate={{ x: leftEdge, width: halfWidth * 2, height: bottomY - TOP, fill: color, stroke: color }}
            transition={{ duration: 0.12, ease: 'linear' }}
          />

          <text x={CX} y={TOP + 17} textAnchor="middle" fontSize={8.5} fontWeight={600} fill={color}>
            {rodLabel}
          </text>

          <line
            x1={leftEdge - 12}
            y1={BASE}
            x2={rightEdge + 12}
            y2={BASE}
            stroke={MUTED}
            strokeWidth={1}
            strokeDasharray="3 3"
            opacity={0.7}
          />
          <line
            x1={leftEdge - 18}
            y1={limitY}
            x2={rightEdge + 24}
            y2={limitY}
            stroke={LIMIT}
            strokeWidth={1.2}
            strokeDasharray="6 4"
          />
          <text x={rightEdge + 28} y={limitY + 3} fontSize={8.5} fill={LIMIT}>
            ΔL_dop = 1,2 mm
          </text>

          {!isModel && (
            <>
              <line x1={54} y1={BASE} x2={54} y2={bottomY} stroke={color} strokeWidth={1} />
              <line x1={49} y1={BASE} x2={59} y2={BASE} stroke={color} strokeWidth={1} />
              <line x1={49} y1={bottomY} x2={59} y2={bottomY} stroke={color} strokeWidth={1} />
              <text
                transform={`translate(44 ${(BASE + bottomY) / 2}) rotate(-90)`}
                textAnchor="middle"
                fontSize={8.5}
                fontWeight={isDelta ? 700 : 500}
                fill={color}
              >
                ΔL = {pl(delta, 2)} mm
              </text>
            </>
          )}

          <g stroke={LOAD} fill={LOAD}>
            <line x1={rightEdge + 22} y1={bottomY - 34} x2={rightEdge + 22} y2={bottomY - 8} strokeWidth={2.2} />
            <path
              d={`M${rightEdge + 17.5} ${bottomY - 16} L${rightEdge + 22} ${bottomY - 8} L${rightEdge + 26.5} ${bottomY - 16}`}
              fill="none"
              strokeWidth={2.2}
            />
            <text x={rightEdge + 28} y={bottomY - 40} fontSize={9}>
              N = 60 kN
            </text>
          </g>

          <text x={CHART_X} y={84} fontSize={9.5} fontWeight={600} fill={SUPPORT}>
            Wymagane pole przekroju
          </text>

          <line x1={CHART_X} y1={CHART_BASE} x2={440} y2={CHART_BASE} stroke={MUTED} strokeWidth={1} />
          <line x1={CHART_X} y1={barTop(AREA_SCALE)} x2={CHART_X} y2={CHART_BASE} stroke={MUTED} strokeWidth={1} />
          {[0, 250, 500, 750].map((value) => (
            <g key={value}>
              <line
                x1={CHART_X - 4}
                y1={barTop(value)}
                x2={CHART_X}
                y2={barTop(value)}
                stroke={MUTED}
                strokeWidth={1}
              />
              <text x={CHART_X - 7} y={barTop(value) + 3} textAnchor="end" fontSize={7.5} fill={MUTED}>
                {value}
              </text>
            </g>
          ))}

          {!isModel && (
            <>
              <line
                x1={222}
                y1={barTop(A_STIFFNESS)}
                x2={402}
                y2={barTop(A_STIFFNESS)}
                stroke={LIMIT}
                strokeWidth={1}
                strokeDasharray="5 4"
              />
              <text x={222} y={barTop(A_STIFFNESS) - 5} fontSize={8} fill={LIMIT}>
                Aδ = 625 mm²
              </text>
            </>
          )}

          <g>
            <rect
              x={BAR_X[0]}
              y={barTop(A_STRENGTH * strengthFactor)}
              width={BAR_WIDTH}
              height={(A_STRENGTH * strengthFactor * CHART_HEIGHT) / AREA_SCALE}
              fill={ACCENT}
              fillOpacity={0.72}
            />
            {strengthFactor > 0.3 && (
              <text
                x={BAR_X[0] + BAR_WIDTH / 2}
                y={barTop(A_STRENGTH * strengthFactor) - 5}
                textAnchor="middle"
                fontSize={8}
                fill={ACCENT}
              >
                {A_STRENGTH}
              </text>
            )}
            <text x={BAR_X[0] + BAR_WIDTH / 2} y={CHART_BASE + 14} textAnchor="middle" fontSize={8.5} fill={MUTED}>
              Aσ
            </text>
          </g>

          <g>
            <rect
              x={BAR_X[1]}
              y={barTop(A_STIFFNESS * stiffnessFactor)}
              width={BAR_WIDTH}
              height={(A_STIFFNESS * stiffnessFactor * CHART_HEIGHT) / AREA_SCALE}
              fill={LIMIT}
              fillOpacity={0.72}
            />
            {stiffnessFactor > 0.3 && (
              <text
                x={BAR_X[1] + BAR_WIDTH / 2}
                y={barTop(A_STIFFNESS * stiffnessFactor) - 5}
                textAnchor="middle"
                fontSize={8}
                fill={LIMIT}
              >
                {A_STIFFNESS}
              </text>
            )}
            <text x={BAR_X[1] + BAR_WIDTH / 2} y={CHART_BASE + 14} textAnchor="middle" fontSize={8.5} fill={MUTED}>
              Aδ
            </text>
          </g>

          <g>
            <rect
              x={BAR_X[2]}
              y={barTop(A_CHOSEN * chosenFactor)}
              width={BAR_WIDTH}
              height={(A_CHOSEN * chosenFactor * CHART_HEIGHT) / AREA_SCALE}
              fill={OK}
              fillOpacity={0.72}
            />
            {chosenFactor > 0.3 && (
              <text
                x={BAR_X[2] + BAR_WIDTH / 2}
                y={barTop(A_CHOSEN * chosenFactor) - 5}
                textAnchor="middle"
                fontSize={8}
                fill={OK}
              >
                {pl(A_CHOSEN)}
              </text>
            )}
            <text x={BAR_X[2] + BAR_WIDTH / 2} y={CHART_BASE + 14} textAnchor="middle" fontSize={8.5} fill={MUTED}>
              A
            </text>
          </g>

          {isGovern && (
            <text x={CHART_X} y={104} fontSize={8.5} fontWeight={600} fill={OK}>
              decyduje sztywność · d_min = 28,2 → d = 30 mm
            </text>
          )}

          {isStress && (
            <>
              <text x={CHART_X} y={306} fontSize={8.5} fontWeight={600} fill={OK}>
                σ = 84,9 MPa ≤ σ_dop = 160 MPa
              </text>
              <rect x={226} y={316} width={gaugeWidth} height={10} rx={2} fill={MUTED} opacity={0.16} />
              <rect
                x={226}
                y={316}
                width={((gaugeWidth * SIGMA) / SIGMA_DOP) * stressGrow}
                height={10}
                rx={2}
                fill={OK}
                opacity={0.7}
              />
              <line x1={226 + gaugeWidth} y1={313} x2={226 + gaugeWidth} y2={329} stroke={LIMIT} strokeWidth={1.5} />
              <text x={226 + gaugeWidth} y={342} textAnchor="end" fontSize={8} fill={LIMIT}>
                σ_dop = 160 MPa
              </text>
              <text x={CHART_X} y={348} fontSize={8.5} fill={OK}>
                ✓ wytrzymałość zachowana
              </text>
            </>
          )}

          {isDelta && (
            <>
              <text x={CHART_X} y={306} fontSize={8.5} fill={OK}>
                ✓ σ = 84,9 MPa ≤ 160 MPa
              </text>
              <text x={CHART_X} y={322} fontSize={8.5} fill={OK}>
                ✓ ΔL = 1,06 mm ≤ 1,2 mm
              </text>
              <text x={CHART_X} y={342} fontSize={8.5} fontWeight={600} fill={OK}>
                oba warunki spełnione
              </text>
            </>
          )}
        </svg>
      </div>
    </div>
  )
}
