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
const OK = '#2e9e6b'

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}
const mix = (from: number, to: number, t: number) => from + (to - from) * t
const formatMm = (value: number) => value.toFixed(1).replace('.', ',')
const formatMPa = (value: number) => Math.round(value).toString()

const scale = 1.8
const centerX = 150
const centerY = 146
const profileX = 312
const stressScale = 60 / 140
const allowable = 140 * stressScale

function HDim({ from, to, y, label }: { from: number; to: number; y: number; label: string }) {
  return (
    <g stroke={MUTED} strokeWidth={1.1} fill={MUTED}>
      <line x1={from} y1={y} x2={to} y2={y} />
      <line x1={from} y1={y - 4} x2={from} y2={y + 4} />
      <line x1={to} y1={y - 4} x2={to} y2={y + 4} />
      <text x={(from + to) / 2} y={y + 13} textAnchor="middle" fontSize={9} stroke="none">
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

export function BendingStressNeutralAxis3Animation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'data'
  const p = playing ? clamp01(sceneProgress) : 1

  const isData = metric === 'data'
  const isRequired = metric === 'required'
  const isAdopt = metric === 'adopt'
  const isDistribution = metric === 'distribution'
  const isCheck = metric === 'check'

  const hMm = isData ? 90 : isRequired ? 95 : isAdopt ? mix(95, 100, smooth(p)) : 100
  const bMm = hMm / 2
  const hPx = hMm * scale
  const bPx = bMm * scale
  const left = centerX - bPx / 2
  const right = centerX + bPx / 2
  const top = centerY - hPx / 2
  const bottom = centerY + hPx / 2
  const cpx = hPx / 2
  const W = (bMm * hMm * hMm) / 6
  const sigmaMax = 10_000_000 / W
  const showStress = !isData
  const stressReveal = isRequired ? smooth(p) : 1
  const maxLen = sigmaMax * stressScale
  const naReveal = isData ? smooth(p) : 1
  const guideReveal = isCheck ? smooth(p) : 1
  const arrowYs = Array.from({ length: 15 }, (_, i) => top + ((bottom - top) * i) / 14)
  const allowReveal = isRequired || isCheck ? smooth(p) : 1
  const adoptTag = isAdopt ? clamp01((p - 0.82) / 0.18) : 0

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 300"
          role="img"
          aria-label="Prostokątny przekrój belki o stosunku b równym h/2. Animacja pokazuje dobór wysokości do wymaganego wskaźnika wytrzymałości, stałą oś obojętną, liniowy rozkład naprężeń i kontrolę skrajnego włókna przy naprężeniu dopuszczalnym 140 megapaskali."
        >
          <rect
            x={left}
            y={top}
            width={right - left}
            height={bottom - top}
            rx={2}
            fill={FILL}
            fillOpacity={isData ? 0.3 : 0.55}
            stroke={EDGE}
            strokeWidth={1.7}
            strokeDasharray={isData ? '6 4' : undefined}
          />

          {showStress && (
            <g>
              <rect
                x={left}
                y={top}
                width={right - left}
                height={centerY - top}
                fill={COMP}
                fillOpacity={0.1 * stressReveal}
              />
              <rect
                x={left}
                y={centerY}
                width={right - left}
                height={bottom - centerY}
                fill={TENS}
                fillOpacity={0.1 * stressReveal}
              />
            </g>
          )}

          <HDim from={left} to={right} y={bottom + 16} label={isData ? 'b = h/2' : `b = ${formatMm(bMm)} mm`} />
          <VDim x={left - 16} from={top} to={bottom} label={isData ? 'h = ?' : `h = ${formatMm(hMm)} mm`} />

          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
            <motion.line
              x1={left - 8}
              y1={centerY}
              x2={right + 8}
              y2={centerY}
              stroke={NA}
              strokeWidth={2.2}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: naReveal }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            />
            <motion.circle
              cx={centerX}
              cy={centerY}
              r={3.4}
              fill={NA}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.15, type: 'spring', stiffness: 260, damping: 18 }}
              style={{ transformOrigin: `${centerX}px ${centerY}px` }}
            />
            <text x={right + 12} y={centerY - 7} fontSize={9} fill={NA}>
              oś obojętna
            </text>
            <text x={centerX + 7} y={centerY + 13} fontSize={9} fill={NA}>
              C
            </text>
          </motion.g>

          {isData && (
            <g>
              <text x={12} y={270} fontSize={9} fill={MUTED}>
                szukamy wymiarów
              </text>
              <text x={12} y={284} fontSize={9} fill={LOAD}>
                M = 10 kN·m, σ_dop = 140 MPa
              </text>
              <text x={250} y={108} fontSize={9} fill={MUTED}>
                przekrój symetryczny:
              </text>
              <text x={250} y={122} fontSize={9} fill={MUTED}>
                oś obojętna w połowie wysokości
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
              {allowReveal > 0.01 && (
                <g opacity={allowReveal * 0.65} stroke={LOAD} strokeDasharray="4 4" strokeWidth={1.1}>
                  <line x1={profileX - allowable} y1={top - 8} x2={profileX - allowable} y2={bottom + 8} />
                  <line x1={profileX + allowable} y1={top - 8} x2={profileX + allowable} y2={bottom + 8} />
                </g>
              )}
              <motion.polygon
                points={`${profileX},${top} ${profileX - maxLen * stressReveal},${top} ${profileX},${centerY}`}
                fill={COMP}
                fillOpacity={0.13}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />
              <motion.polygon
                points={`${profileX},${centerY} ${profileX + maxLen * stressReveal},${bottom} ${profileX},${bottom}`}
                fill={TENS}
                fillOpacity={0.13}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />
              <motion.path
                d={`M ${profileX - maxLen * stressReveal} ${top} L ${profileX} ${centerY} L ${profileX + maxLen * stressReveal} ${bottom}`}
                fill="none"
                stroke={INK}
                strokeWidth={2.1}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />
              {arrowYs.map((y, i) => {
                if (Math.abs(y - centerY) < 1.5) return null
                const direction = y < centerY ? -1 : 1
                const endX = profileX + direction * (Math.abs(y - centerY) / cpx) * maxLen * stressReveal
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
              {(isRequired || isAdopt || isDistribution) && (
                <>
                  <text x={profileX - maxLen - 5} y={top - 16} textAnchor="end" fontSize={9} fill={COMP}>
                    ściskanie
                  </text>
                  <text x={profileX + maxLen + 5} y={bottom + 13} textAnchor="end" fontSize={9} fill={TENS}>
                    rozciąganie
                  </text>
                </>
              )}
              <text x={profileX - 5} y={centerY + 13} textAnchor="end" fontSize={9} fill={MUTED}>
                0
              </text>
              <text x={profileX + allowable + 4} y={top - 4} fontSize={8.5} fill={LOAD} opacity={allowReveal}>
                σ_dop = 140 MPa
              </text>
              {isRequired && (
                <>
                  <text x={profileX} y={bottom + 32} textAnchor="middle" fontSize={9} fill={INK}>
                    W_min = 71 429 mm³
                  </text>
                  <text x={profileX} y={bottom + 46} textAnchor="middle" fontSize={9} fill={ACCENT}>
                    σ = σ_dop = 140 MPa
                  </text>
                </>
              )}
              {isAdopt && (
                <>
                  <text x={profileX} y={bottom + 32} textAnchor="middle" fontSize={9} fill={ACCENT}>
                    σ_max = {formatMPa(sigmaMax)} MPa
                  </text>
                  <text x={profileX} y={bottom + 46} textAnchor="middle" fontSize={9} fill={MUTED} opacity={adoptTag}>
                    przyjęto 50 × 100 mm
                  </text>
                </>
              )}
              {isDistribution && (
                <>
                  <text x={profileX} y={bottom + 32} textAnchor="middle" fontSize={9} fill={INK}>
                    I_z = 4,167 · 10⁶ mm⁴
                  </text>
                  <text x={profileX} y={bottom + 46} textAnchor="middle" fontSize={9} fill={ACCENT}>
                    σ_max = 120 MPa
                  </text>
                </>
              )}
            </g>
          )}

          {isCheck && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <line
                x1={right}
                y1={top}
                x2={profileX - maxLen * guideReveal}
                y2={top}
                stroke={COMP}
                strokeWidth={1}
                strokeDasharray="3 3"
              />
              <line
                x1={right}
                y1={bottom}
                x2={profileX + maxLen * guideReveal}
                y2={bottom}
                stroke={TENS}
                strokeWidth={1}
                strokeDasharray="3 3"
              />
              <circle cx={profileX - maxLen * guideReveal} cy={top} r={3.4} fill={COMP} />
              <circle cx={profileX + maxLen * guideReveal} cy={bottom} r={3.4} fill={TENS} />
              <line x1={left - 6} y1={top} x2={right + 6} y2={top} stroke={COMP} strokeWidth={4} />
              <line x1={left - 6} y1={bottom} x2={right + 6} y2={bottom} stroke={TENS} strokeWidth={4} />
              <text x={profileX - maxLen - 2} y={top - 16} textAnchor="end" fontSize={9.5} fontWeight={700} fill={COMP}>
                σ_g = −120 MPa
              </text>
              <text
                x={profileX + maxLen + 2}
                y={bottom + 14}
                textAnchor="start"
                fontSize={9.5}
                fontWeight={700}
                fill={TENS}
              >
                σ_d = +120 MPa
              </text>
              <text x={profileX} y={bottom + 32} textAnchor="middle" fontSize={9.5} fontWeight={700} fill={OK}>
                σ_max = 120 MPa &lt; σ_dop = 140 MPa
              </text>
              <text x={profileX} y={bottom + 46} textAnchor="middle" fontSize={9} fill={MUTED}>
                W = 83 333 mm³ &gt; W_min = 71 429 mm³
              </text>
            </motion.g>
          )}
        </svg>
      </div>
    </div>
  )
}
