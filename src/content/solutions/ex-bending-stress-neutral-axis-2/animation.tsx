import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const INK = '#17202a'
const EDGE = '#7d8fa5'
const FILL = '#dfe6f2'
const ACCENT = '#4f6df5'
const LOAD = '#ff6b45'
const COMP = '#d84f28'
const TENS = '#2f7d5b'
const NA = '#7b61ff'
const MUTED = '#87929d'

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}
const mix = (from: number, to: number, t: number) => from + (to - from) * t
const formatMm = (value: number) => value.toFixed(2).replace('.', ',')

const scale = 1.8
const left = 60
const right = 240
const top = 54
const bottom = top + 100 * scale
const centerX = 150
const flangeBottom = top + 20 * scale
const webLeft = centerX - (20 * scale) / 2
const webRight = centerX + (20 * scale) / 2
const midY = top + 50 * scale
const naY = top + 32.22 * scale
const profileX = 312
const profileMax = 70
const profileSlope = profileMax / (bottom - naY)

function HDim({
  from,
  to,
  y,
  label,
  below = true,
}: {
  from: number
  to: number
  y: number
  label: string
  below?: boolean
}) {
  return (
    <g stroke={MUTED} strokeWidth={1.1} fill={MUTED}>
      <line x1={from} y1={y} x2={to} y2={y} />
      <line x1={from} y1={y - 4} x2={from} y2={y + 4} />
      <line x1={to} y1={y - 4} x2={to} y2={y + 4} />
      <text x={(from + to) / 2} y={below ? y + 13 : y - 6} textAnchor="middle" fontSize={9} stroke="none">
        {label}
      </text>
    </g>
  )
}

function VDim({
  x,
  from,
  to,
  label,
  color = MUTED,
}: {
  x: number
  from: number
  to: number
  label: string
  color?: string
}) {
  const mid = (from + to) / 2
  return (
    <g stroke={color} strokeWidth={1.1} fill={color}>
      <line x1={x} y1={from} x2={x} y2={to} />
      <line x1={x - 4} y1={from} x2={x + 4} y2={from} />
      <line x1={x - 4} y1={to} x2={x + 4} y2={to} />
      <text x={x - 7} y={mid} textAnchor="middle" fontSize={9} stroke="none" transform={`rotate(-90 ${x - 7} ${mid})`}>
        {label}
      </text>
    </g>
  )
}

function Arrow({
  x1,
  y1,
  x2,
  y2,
  color,
  width = 1.5,
}: {
  x1: number
  y1: number
  x2: number
  y2: number
  color: string
  width?: number
}) {
  const angle = Math.atan2(y2 - y1, x2 - x1)
  const length = Math.hypot(x2 - x1, y2 - y1)
  const head = Math.min(4.6, length * 0.45)
  const wing = Math.min(2.4, length * 0.24)
  const baseX = x2 - head * Math.cos(angle)
  const baseY = y2 - head * Math.sin(angle)
  const lx = baseX - wing * Math.sin(angle)
  const ly = baseY + wing * Math.cos(angle)
  const rx = baseX + wing * Math.sin(angle)
  const ry = baseY - wing * Math.cos(angle)
  return (
    <g stroke={color} fill={color}>
      <line x1={x1} y1={y1} x2={baseX} y2={baseY} strokeWidth={width} strokeLinecap="round" />
      <polygon points={`${x2},${y2} ${lx},${ly} ${rx},${ry}`} stroke="none" />
    </g>
  )
}

export function BendingStressNeutralAxis2Animation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'section'
  const p = playing ? clamp01(sceneProgress) : 1

  const isSection = metric === 'section'
  const isCentroid = metric === 'centroid'
  const isDistances = metric === 'distances'
  const isStress = metric === 'stress'
  const isExtremes = metric === 'extremes'

  const showNA = !isSection
  const showStress = isStress || isExtremes
  const naCurrentY = isCentroid ? mix(midY, naY, smooth(p)) : naY
  const cgCurrent = isCentroid ? mix(50, 32.22, smooth(p)) : 32.22
  const stressReveal = isStress ? smooth(p) : 1
  const guideReveal = isExtremes ? smooth(p) : 1
  const arrowYs = Array.from({ length: 15 }, (_, i) => top + ((bottom - top) * i) / 14)

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 300"
          role="img"
          aria-label="Przekrój teowy z półką 100 na 20 milimetrów i środnikiem 20 na 80 milimetrów. Animacja pokazuje środek ciężkości, przesuniętą oś obojętną, liniowy rozkład naprężeń oraz większe naprężenie w dolnym włóknie."
        >
          <defs>
            <clipPath id="bs2-section">
              <rect x={left} y={top} width={right - left} height={flangeBottom - top} />
              <rect x={webLeft} y={flangeBottom} width={webRight - webLeft} height={bottom - flangeBottom} />
            </clipPath>
          </defs>

          <rect
            x={left}
            y={top}
            width={right - left}
            height={flangeBottom - top}
            fill={FILL}
            fillOpacity={0.65}
            stroke={EDGE}
            strokeWidth={1.7}
          />
          <rect
            x={webLeft}
            y={flangeBottom}
            width={webRight - webLeft}
            height={bottom - flangeBottom}
            fill={FILL}
            fillOpacity={0.65}
            stroke={EDGE}
            strokeWidth={1.7}
          />

          {showStress && (
            <g clipPath="url(#bs2-section)">
              <rect
                x={left}
                y={top}
                width={right - left}
                height={naY - top}
                fill={COMP}
                fillOpacity={0.12 * stressReveal}
              />
              <rect
                x={left}
                y={naY}
                width={right - left}
                height={bottom - naY}
                fill={TENS}
                fillOpacity={0.12 * stressReveal}
              />
            </g>
          )}

          {(isSection || isCentroid) && <HDim from={left} to={right} y={top - 14} label="b = 100 mm" below={false} />}
          {(isSection || isDistances) && <VDim x={left - 16} from={top} to={bottom} label="h = 100 mm" />}

          {isSection && (
            <g>
              <text x={250} y={68} fontSize={9} fill={MUTED}>
                półka 100 × 20
              </text>
              <text x={250} y={166} fontSize={9} fill={MUTED}>
                środnik 20 × 80
              </text>
              <text x={12} y={270} fontSize={9} fill={MUTED}>
                czyste zginanie
              </text>
              <text x={12} y={284} fontSize={9} fill={LOAD}>
                M = 5 kN·m
              </text>
            </g>
          )}

          {isCentroid && (
            <g>
              <circle cx={centerX} cy={top + 10 * scale} r={3.2} fill={ACCENT} />
              <circle cx={centerX} cy={flangeBottom + 40 * scale} r={3.2} fill={ACCENT} />
              <text x={centerX + 7} y={top + 10 * scale + 3} fontSize={9} fill={ACCENT}>
                C₁
              </text>
              <text x={centerX + 7} y={flangeBottom + 40 * scale + 3} fontSize={9} fill={ACCENT}>
                C₂
              </text>
              <text x={250} y={62} fontSize={9} fill={ACCENT}>
                A₁ = 2000 mm², y₁ = 10 mm
              </text>
              <text x={250} y={76} fontSize={9} fill={ACCENT}>
                A₂ = 1600 mm², y₂ = 60 mm
              </text>
              <text x={250} y={90} fontSize={9} fill={INK}>
                ȳ = 32,22 mm od góry
              </text>
            </g>
          )}

          {isCentroid && (
            <g stroke={MUTED} fill={MUTED} opacity={0.65}>
              <line x1={left - 8} y1={midY} x2={right + 8} y2={midY} strokeWidth={1} strokeDasharray="4 4" />
              <text x={left - 6} y={midY - 4} textAnchor="end" fontSize={8.5} stroke="none">
                h/2
              </text>
            </g>
          )}

          {showNA && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
              <line x1={left - 8} y1={naCurrentY} x2={right + 8} y2={naCurrentY} stroke={NA} strokeWidth={2.2} />
              <motion.circle
                cx={centerX}
                cy={naCurrentY}
                r={3.4}
                fill={NA}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.15, type: 'spring', stiffness: 260, damping: 18 }}
                style={{ transformOrigin: `${centerX}px ${naCurrentY}px` }}
              />
              <text x={right + 12} y={naCurrentY - 7} fontSize={9} fill={NA}>
                oś obojętna
              </text>
              <text x={centerX + (isCentroid ? -15 : 7)} y={naCurrentY + 13} fontSize={9} fill={NA}>
                C
              </text>
              {(isCentroid || isDistances) && (
                <VDim x={left - 32} from={top} to={naCurrentY} label={`c_g = ${formatMm(cgCurrent)} mm`} color={NA} />
              )}
            </motion.g>
          )}

          {isDistances && (
            <g>
              <VDim x={right + 22} from={naY} to={bottom} label="c_d = 67,78 mm" color={TENS} />
              <text x={274} y={200} fontSize={9} fill={COMP}>
                górna półka bliżej osi
              </text>
              <text x={274} y={216} fontSize={9} fill={TENS}>
                dolne włókno dalej od osi
              </text>
            </g>
          )}

          {showStress && (
            <g>
              <line
                x1={profileX}
                y1={top - 12}
                x2={profileX}
                y2={bottom + 12}
                stroke="#c9d0d9"
                strokeWidth={1}
                strokeDasharray="4 4"
              />
              <motion.polygon
                points={`${profileX},${top} ${profileX - (naY - top) * profileSlope * stressReveal},${top} ${profileX},${naY}`}
                fill={COMP}
                fillOpacity={0.13}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />
              <motion.polygon
                points={`${profileX},${naY} ${profileX + (bottom - naY) * profileSlope * stressReveal},${bottom} ${profileX},${bottom}`}
                fill={TENS}
                fillOpacity={0.13}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />
              <motion.path
                d={`M ${profileX - (naY - top) * profileSlope * stressReveal} ${top} L ${profileX} ${naY} L ${profileX + (bottom - naY) * profileSlope * stressReveal} ${bottom}`}
                fill="none"
                stroke={INK}
                strokeWidth={2.1}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />
              {arrowYs.map((y, i) => {
                if (Math.abs(y - naY) < 1.5) return null
                const direction = y < naY ? -1 : 1
                const endX = profileX + direction * Math.abs(y - naY) * profileSlope * stressReveal
                return (
                  <Arrow
                    key={i}
                    x1={profileX}
                    y1={y}
                    x2={endX}
                    y2={y}
                    color={direction < 0 ? COMP : TENS}
                    width={1.4}
                  />
                )
              })}
              <text x={profileX} y={top - 18} textAnchor="middle" fontSize={9} fill={INK}>
                σ(y) = M y / I_z
              </text>
              {isStress && (
                <>
                  <text
                    x={profileX - (naY - top) * profileSlope - 5}
                    y={top - 4}
                    textAnchor="end"
                    fontSize={9}
                    fill={COMP}
                  >
                    ściskanie
                  </text>
                  <text x={profileX + profileMax + 5} y={bottom + 13} textAnchor="end" fontSize={9} fill={TENS}>
                    rozciąganie
                  </text>
                </>
              )}
              <text x={profileX - 5} y={naY + 13} textAnchor="end" fontSize={9} fill={MUTED}>
                0
              </text>
              {isStress && (
                <text x={profileX} y={bottom + 32} textAnchor="middle" fontSize={9} fill={ACCENT}>
                  I_z = 3,142 · 10⁶ mm⁴
                </text>
              )}
            </g>
          )}

          {isExtremes && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <line
                x1={right}
                y1={top}
                x2={profileX - (naY - top) * profileSlope * guideReveal}
                y2={top}
                stroke={COMP}
                strokeWidth={1}
                strokeDasharray="3 3"
              />
              <line
                x1={webRight}
                y1={bottom}
                x2={profileX + (bottom - naY) * profileSlope * guideReveal}
                y2={bottom}
                stroke={TENS}
                strokeWidth={1}
                strokeDasharray="3 3"
              />
              <circle cx={profileX - (naY - top) * profileSlope * guideReveal} cy={top} r={3.4} fill={COMP} />
              <circle cx={profileX + (bottom - naY) * profileSlope * guideReveal} cy={bottom} r={3.4} fill={TENS} />
              <line x1={left - 6} y1={top} x2={right + 6} y2={top} stroke={COMP} strokeWidth={4} />
              <line x1={webLeft - 6} y1={bottom} x2={webRight + 6} y2={bottom} stroke={TENS} strokeWidth={4} />
              <text
                x={profileX - (naY - top) * profileSlope - 2}
                y={top - 4}
                textAnchor="end"
                fontSize={9.5}
                fontWeight={700}
                fill={COMP}
              >
                σ_g = −51,3 MPa
              </text>
              <text
                x={profileX + (bottom - naY) * profileSlope + 2}
                y={bottom + 14}
                textAnchor="start"
                fontSize={9.5}
                fontWeight={700}
                fill={TENS}
              >
                σ_d = +107,9 MPa
              </text>
              <text x={profileX} y={bottom + 34} textAnchor="middle" fontSize={9.5} fontWeight={700} fill={TENS}>
                decyduje dolne włókno
              </text>
              <text x={profileX} y={bottom + 48} textAnchor="middle" fontSize={9} fill={MUTED}>
                mimo szerszej górnej półki
              </text>
            </motion.g>
          )}
        </svg>
      </div>
    </div>
  )
}
