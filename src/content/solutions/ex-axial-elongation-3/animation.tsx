import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const LOAD = '#ff6b45'
const COMPRESSION = '#d9822b'
const MUTED = '#87929d'
const SUPPORT = '#68727e'
const INK = '#17202a'

const Y = 150
const HALF = 18
const X0 = 64
const TOTAL_PX = 300
const L1 = 300
const L2_SOLVED = 600
const TOTAL = L1 + L2_SOLVED
const SCALE = TOTAL_PX / TOTAL
const XJ0 = X0 + L1 * SCALE
const XR0 = XJ0 + L2_SOLVED * SCALE
const EXAG = 140
const NET_EXAG = 500
const E1 = 0.15 * SCALE * EXAG

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}

function DimensionX({
  y,
  from,
  to,
  label,
  color,
}: {
  y: number
  from: number
  to: number
  label: string
  color: string
}) {
  const mid = (from + to) / 2
  return (
    <g stroke={color} fill={color}>
      <line x1={from} y1={y} x2={to} y2={y} strokeWidth={1.3} />
      <line x1={from} y1={y - 5} x2={from} y2={y + 5} strokeWidth={1.3} />
      <line x1={to} y1={y - 5} x2={to} y2={y + 5} strokeWidth={1.3} />
      <text x={mid} y={y + 14} textAnchor="middle" fontSize={10} stroke="none">
        {label}
      </text>
    </g>
  )
}

export function AxialCompensationAnimation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const progress = playing ? smooth(sceneProgress) : 1

  const isModel = metric === 'model'
  const isNormal = metric === 'N'
  const isInverse = metric === 'inverse'
  const isElongation = metric === 'ΔL'
  const isVariants = metric === 'variants'
  const isStress = metric === 'σ'

  const l2 = isVariants ? 500 + 200 * progress : L2_SOLVED
  const l2px = l2 * SCALE
  const xrUndeformed = XJ0 + l2px
  const d2 = -0.00025 * l2
  const e2 = d2 * SCALE * EXAG
  const net = 0.15 + d2
  const netPx = net * SCALE * NET_EXAG

  let a1 = 0
  let a2 = 0
  if (isElongation) {
    a1 = progress
    a2 = progress
  } else if (isStress) {
    a1 = 1
    a2 = 1
  } else if (isVariants) {
    a1 = 1
  }

  const junction = XJ0 + E1 * a1
  const right = isVariants ? xrUndeformed + netPx : junction + l2px + e2 * a2
  const rightIfSegment2Undeformed = junction + l2px
  const showRegions = isNormal || isElongation || isVariants || isStress || isInverse

  const netColor = net > 0.001 ? ACCENT : net < -0.001 ? COMPRESSION : '#2f7d5b'
  const netLabel = net > 0.001 ? 'ΔL wyp > 0' : net < -0.001 ? 'ΔL wyp < 0' : 'ΔL wyp = 0'

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 300"
          role="img"
          aria-label="Poziomy pręt o dwóch odcinkach jednakowego pola, utwierdzony lewym końcem. Animacja pokazuje wydłużenie pierwszego odcinka i skrócenie drugiego względem pierwotnego kształtu zaznaczonego linią przerywaną."
        >
          <defs>
            <marker
              id="ax3-load"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={LOAD} />
            </marker>
          </defs>

          <g stroke={SUPPORT} strokeWidth={2} strokeLinecap="round">
            <line x1={X0} y1={Y - HALF - 22} x2={X0} y2={Y + HALF + 22} />
            {Array.from({ length: 9 }, (_, tick) => {
              const y = Y - HALF - 16 + tick * 8
              return <line key={tick} x1={X0} y1={y} x2={X0 - 11} y2={y + 7} strokeWidth={1.4} />
            })}
          </g>

          <rect
            x={X0}
            y={Y - HALF}
            width={Math.max(1, xrUndeformed - X0)}
            height={HALF * 2}
            fill="none"
            stroke={MUTED}
            strokeWidth={1.4}
            strokeDasharray="5 4"
          />
          <rect
            x={X0}
            y={Y - HALF}
            width={Math.max(1, right - X0)}
            height={HALF * 2}
            rx={2}
            fill={ACCENT}
            fillOpacity={0.1}
            stroke={ACCENT}
            strokeWidth={2}
          />

          {showRegions && (
            <>
              <rect
                x={X0}
                y={Y - HALF}
                width={Math.max(1, junction - X0)}
                height={HALF * 2}
                fill={ACCENT}
                fillOpacity={0.12}
              />
              <rect
                x={junction}
                y={Y - HALF}
                width={Math.max(1, right - junction)}
                height={HALF * 2}
                fill={COMPRESSION}
                fillOpacity={0.14}
              />
            </>
          )}

          <line x1={junction} y1={Y - HALF} x2={junction} y2={Y + HALF} stroke={INK} strokeWidth={1.2} opacity={0.45} />
          {isElongation && Math.abs(junction - XJ0) > 1 && (
            <line
              x1={XJ0}
              y1={Y - HALF - 6}
              x2={XJ0}
              y2={Y + HALF + 6}
              stroke={MUTED}
              strokeWidth={1}
              strokeDasharray="4 4"
            />
          )}

          <g fill={LOAD} stroke={LOAD}>
            <line
              x1={junction - 2}
              y1={Y - HALF - 26}
              x2={junction + 30}
              y2={Y - HALF - 26}
              strokeWidth={2.2}
              markerEnd="url(#ax3-load)"
            />
            <line
              x1={junction}
              y1={Y - HALF}
              x2={junction}
              y2={Y - HALF - 26}
              stroke={MUTED}
              strokeWidth={1}
              strokeDasharray="3 3"
            />
            <text x={junction + 34} y={Y - HALF - 22} fontSize={10} stroke="none">
              Q = 30 kN
            </text>

            <line
              x1={right + 30}
              y1={Y - HALF - 26}
              x2={right + 2}
              y2={Y - HALF - 26}
              strokeWidth={2.2}
              markerEnd="url(#ax3-load)"
            />
            <line
              x1={right}
              y1={Y - HALF}
              x2={right}
              y2={Y - HALF - 26}
              stroke={MUTED}
              strokeWidth={1}
              strokeDasharray="3 3"
            />
            <text x={right + 4} y={Y - HALF - 34} textAnchor="end" fontSize={10} stroke="none">
              P = 10 kN
            </text>
          </g>

          {(isNormal || isInverse) && (
            <>
              <text x={(X0 + junction) / 2} y={Y - HALF - 8} textAnchor="middle" fontSize={9} fill={ACCENT}>
                N₁ = +20 kN
              </text>
              <text x={(junction + right) / 2} y={Y - HALF - 8} textAnchor="middle" fontSize={9} fill={COMPRESSION}>
                N₂ = −10 kN
              </text>
            </>
          )}

          {(isElongation || isStress) && (
            <>
              <text x={(X0 + junction) / 2} y={Y - HALF - 8} textAnchor="middle" fontSize={9} fill={ACCENT}>
                rozciąganie
              </text>
              <text x={(junction + right) / 2} y={Y - HALF - 8} textAnchor="middle" fontSize={9} fill={COMPRESSION}>
                ściskanie
              </text>
            </>
          )}

          {isStress && (
            <>
              <text x={(X0 + junction) / 2} y={Y + HALF + 32} textAnchor="middle" fontSize={9} fill={ACCENT}>
                σ₁ &gt; 0
              </text>
              <text x={(junction + right) / 2} y={Y + HALF + 32} textAnchor="middle" fontSize={9} fill={COMPRESSION}>
                σ₂ &lt; 0
              </text>
              <text x={(X0 + right) / 2} y={Y + HALF + 54} textAnchor="middle" fontSize={9} fill={MUTED}>
                oba odcinki w zakresie sprężystym
              </text>
            </>
          )}

          {!isStress && <DimensionX y={Y + HALF + 22} from={X0} to={XJ0} label="L₁ = 300 mm" color={MUTED} />}

          {isModel && (
            <g stroke={MUTED} fill={MUTED}>
              <line x1={XJ0} y1={Y + HALF + 46} x2={XR0} y2={Y + HALF + 46} strokeWidth={1.2} strokeDasharray="4 4" />
              <line x1={XJ0} y1={Y + HALF + 41} x2={XJ0} y2={Y + HALF + 51} strokeWidth={1.2} />
              <line x1={XR0} y1={Y + HALF + 41} x2={XR0} y2={Y + HALF + 51} strokeWidth={1.2} />
              <text x={(XJ0 + XR0) / 2} y={Y + HALF + 60} textAnchor="middle" fontSize={10} stroke="none">
                L₂ = ?
              </text>
            </g>
          )}

          {isInverse && (
            <DimensionX
              y={Y + HALF + 46}
              from={XJ0}
              to={XJ0 + (XR0 - XJ0) * progress}
              label={progress > 0.55 ? 'L₂ = 600 mm' : 'L₂ = ?'}
              color={ACCENT}
            />
          )}

          {isElongation && (
            <>
              <DimensionX y={Y + HALF + 42} from={XJ0} to={junction} label="ΔL₁" color={ACCENT} />
              <DimensionX
                y={Y + HALF + 66}
                from={right}
                to={rightIfSegment2Undeformed}
                label="ΔL₂ (skrócenie)"
                color={COMPRESSION}
              />
              <text x={X0 + 4} y={Y + HALF + 92} fontSize={9} fill={MUTED}>
                ΔL = ΔL₁ + ΔL₂ = 0
              </text>
            </>
          )}

          {isVariants && (
            <>
              <DimensionX
                y={Y + HALF + 46}
                from={XJ0}
                to={xrUndeformed}
                label={`L₂ ≈ ${Math.round(l2)} mm`}
                color={MUTED}
              />
              <DimensionX y={Y + HALF + 72} from={xrUndeformed} to={right} label={netLabel} color={netColor} />
              <text x={(X0 + right) / 2} y={Y + HALF + 96} textAnchor="middle" fontSize={9} fill={MUTED}>
                L₂ = 500 mm → 700 mm; zerowe wydłużenie przy 600 mm
              </text>
            </>
          )}

          <text x={12} y={30} fontSize={9} fill={MUTED}>
            A = 200 mm², E = 200 GPa
          </text>
          <text x={12} y={46} fontSize={9} fill={MUTED}>
            pierwotny kształt: linia przerywana
          </text>
        </svg>
      </div>
    </div>
  )
}
