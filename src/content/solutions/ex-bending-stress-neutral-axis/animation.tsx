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

const left = 74
const right = 166
const top = 54
const bottom = 238
const cx = (left + right) / 2
const naY = (top + bottom) / 2
const profileX = 312
const stressHalf = 92
const probeY = naY + 40 * 1.15

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

function CurvatureView({ p }: { p: number }) {
  const sag = 34 * p
  const naPath = `M 74 150 Q 230 ${150 + sag} 386 150`
  const topPath = `M 74 100 Q 230 ${100 + sag} 386 100`
  const bottomPath = `M 74 200 Q 230 ${200 + sag} 386 200`
  const rightAngle = (-Math.atan2(sag, 156) * 180) / Math.PI
  const leftAngle = (Math.atan2(sag, 156) * 180) / Math.PI
  return (
    <g>
      <path d={topPath} fill="none" stroke={COMP} strokeWidth={7} strokeLinecap="round" opacity={0.72} />
      <path d={bottomPath} fill="none" stroke={TENS} strokeWidth={7} strokeLinecap="round" opacity={0.72} />
      <path d={naPath} fill="none" stroke={NA} strokeWidth={2} strokeDasharray="7 5" />
      <line
        x1={74}
        y1={100}
        x2={74}
        y2={200}
        stroke={EDGE}
        strokeWidth={1.8}
        transform={`rotate(${leftAngle} 74 150)`}
      />
      <line
        x1={386}
        y1={100}
        x2={386}
        y2={200}
        stroke={EDGE}
        strokeWidth={1.8}
        transform={`rotate(${rightAngle} 386 150)`}
      />
      <text x={80} y={86} fontSize={9.5} fill={COMP}>
        górne włókno: skrócenie, ε &lt; 0
      </text>
      <text x={80} y={240} fontSize={9.5} fill={TENS}>
        dolne włókno: wydłużenie, ε &gt; 0
      </text>
      <text x={230} y={174} textAnchor="middle" fontSize={9} fill={NA}>
        oś obojętna: długość bez zmian
      </text>
      <text x={230} y={264} textAnchor="middle" fontSize={9.5} fill={INK}>
        κ = M/(E I_z) = 1,465 · 10⁻⁶ mm⁻¹
      </text>
      <text x={230} y={278} textAnchor="middle" fontSize={9.5} fill={MUTED}>
        ρ ≈ 683 m, ε_max = 1,17 · 10⁻⁴
      </text>
      {p > 0.05 && (
        <g stroke={LOAD} fill={LOAD} opacity={Math.min(1, p * 2)}>
          <line x1={230} y1={30} x2={230} y2={82} strokeWidth={1.8} />
          <polygon points="230,88 225,78 235,78" stroke="none" />
          <text x={240} y={54} fontSize={9.5} stroke="none">
            M = 8 kN·m
          </text>
        </g>
      )}
    </g>
  )
}

export function BendingStressNeutralAxisAnimation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const p = playing ? clamp01(sceneProgress) : 1

  const isModel = metric === 'model'
  const isNeutral = metric === 'neutral-axis'
  const isStress = metric === 'stress'
  const isExtremes = metric === 'extremes'
  const isMiddle = metric === 'middle'
  const isCurvature = metric === 'curvature'

  const showNA = !isModel && !isCurvature
  const showStress = isStress || isExtremes || isMiddle
  const showExtremeGuide = isExtremes || isMiddle
  const naReveal = isNeutral ? smooth(p) : 1
  const stressReveal = isStress ? smooth(p) : 1
  const guideReveal = isExtremes ? smooth(p) : 1
  const probeReveal = isMiddle ? smooth(p) : 1
  const arrowYs = Array.from({ length: 15 }, (_, i) => top + ((bottom - top) * i) / 14)

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 300"
          role="img"
          aria-label="Prostokątny przekrój belki 80 na 160 milimetrów. Animacja pokazuje oś obojętną przez środek ciężkości, liniowy rozkład naprężeń, ściskanie u góry i rozciąganie u dołu oraz sprawdzenie skrajnych włókien."
        >
          {isCurvature ? (
            <CurvatureView p={p} />
          ) : (
            <>
              <rect
                x={left}
                y={top}
                width={right - left}
                height={bottom - top}
                rx={2}
                fill={FILL}
                fillOpacity={isModel ? 0.6 : 0.42}
                stroke={EDGE}
                strokeWidth={1.7}
              />

              {showStress && (
                <g>
                  <rect
                    x={left}
                    y={top}
                    width={right - left}
                    height={naY - top}
                    fill={COMP}
                    fillOpacity={0.1 * stressReveal}
                  />
                  <rect
                    x={left}
                    y={naY}
                    width={right - left}
                    height={bottom - naY}
                    fill={TENS}
                    fillOpacity={0.1 * stressReveal}
                  />
                </g>
              )}

              <HDim from={left} to={right} y={bottom + 22} label="b = 80 mm" />
              <VDim x={left - 16} from={top} to={bottom} label="h = 160 mm" />

              {isModel && (
                <g>
                  <path d="M 62 44 C 78 24, 162 24, 178 44" fill="none" stroke={LOAD} strokeWidth={1.7} />
                  <polygon points="180,48 170,44 174,36" fill={LOAD} />
                  <text x={120} y={22} textAnchor="middle" fontSize={10} fill={LOAD}>
                    M = 8 kN·m
                  </text>
                  <text x={12} y={270} fontSize={9} fill={MUTED}>
                    E = 200 GPa
                  </text>
                  <text x={12} y={284} fontSize={9} fill={MUTED}>
                    czyste zginanie
                  </text>
                </g>
              )}

              {showNA && (
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
                  <motion.line
                    x1={left - 8}
                    y1={naY}
                    x2={right + 8}
                    y2={naY}
                    stroke={NA}
                    strokeWidth={2.2}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: naReveal }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                  />
                  <motion.circle
                    cx={cx}
                    cy={naY}
                    r={3.4}
                    fill={NA}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.15, type: 'spring', stiffness: 260, damping: 18 }}
                    style={{ transformOrigin: `${cx}px ${naY}px` }}
                  />
                  <text x={right + 12} y={isNeutral ? naY + 18 : naY - 7} fontSize={9} fill={NA}>
                    oś obojętna
                  </text>
                  <text x={cx + 7} y={naY + 13} fontSize={9} fill={NA}>
                    C
                  </text>
                  {isNeutral && <VDim x={right + 24} from={top} to={naY} label="c = 80 mm" color={NA} />}
                </motion.g>
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
                    points={`${profileX},${top} ${profileX - stressHalf * stressReveal},${top} ${profileX},${naY}`}
                    fill={COMP}
                    fillOpacity={0.13}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  />
                  <motion.polygon
                    points={`${profileX},${naY} ${profileX + stressHalf * stressReveal},${bottom} ${profileX},${bottom}`}
                    fill={TENS}
                    fillOpacity={0.13}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  />
                  <motion.path
                    d={`M ${profileX - stressHalf * stressReveal} ${top} L ${profileX} ${naY} L ${profileX + stressHalf * stressReveal} ${bottom}`}
                    fill="none"
                    stroke={INK}
                    strokeWidth={2.1}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  />
                  {arrowYs.map((y, i) => {
                    if (Math.abs(y - naY) < 1.5) return null
                    const direction = y < naY ? -1 : 1
                    const endX = profileX + direction * Math.abs(y - naY) * stressReveal
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
                  {(isStress || isMiddle) && (
                    <>
                      <text x={profileX - stressHalf - 5} y={top - 4} textAnchor="end" fontSize={9} fill={COMP}>
                        ściskanie
                      </text>
                      <text x={profileX + stressHalf + 5} y={bottom + 13} textAnchor="end" fontSize={9} fill={TENS}>
                        rozciąganie
                      </text>
                    </>
                  )}
                  <text x={profileX - 5} y={naY + 13} textAnchor="end" fontSize={9} fill={MUTED}>
                    0
                  </text>
                  {isStress && (
                    <text x={profileX} y={bottom + 32} textAnchor="middle" fontSize={9} fill={ACCENT}>
                      σ rośnie liniowo od zera
                    </text>
                  )}
                </g>
              )}

              {showExtremeGuide && (
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <line
                    x1={right}
                    y1={top}
                    x2={profileX - stressHalf * guideReveal}
                    y2={top}
                    stroke={COMP}
                    strokeWidth={1}
                    strokeDasharray="3 3"
                  />
                  <line
                    x1={right}
                    y1={bottom}
                    x2={profileX + stressHalf * guideReveal}
                    y2={bottom}
                    stroke={TENS}
                    strokeWidth={1}
                    strokeDasharray="3 3"
                  />
                  <circle cx={profileX - stressHalf * guideReveal} cy={top} r={3.4} fill={COMP} />
                  <circle cx={profileX + stressHalf * guideReveal} cy={bottom} r={3.4} fill={TENS} />
                  {isExtremes && (
                    <>
                      <line x1={left - 6} y1={top} x2={right + 6} y2={top} stroke={COMP} strokeWidth={4} />
                      <line x1={left - 6} y1={bottom} x2={right + 6} y2={bottom} stroke={TENS} strokeWidth={4} />
                      <text
                        x={profileX - stressHalf - 2}
                        y={top - 4}
                        textAnchor="end"
                        fontSize={9.5}
                        fontWeight={700}
                        fill={COMP}
                      >
                        σ_g = −23,4 MPa
                      </text>
                      <text
                        x={profileX + stressHalf + 2}
                        y={bottom + 14}
                        textAnchor="end"
                        fontSize={9.5}
                        fontWeight={700}
                        fill={TENS}
                      >
                        σ_d = +23,4 MPa
                      </text>
                      <text x={profileX} y={bottom + 34} textAnchor="middle" fontSize={9} fill={INK}>
                        W_z = 341 333 mm³
                      </text>
                      <text x={profileX} y={bottom + 48} textAnchor="middle" fontSize={9} fill={MUTED}>
                        oba skrajne włókna decydują
                      </text>
                    </>
                  )}
                </motion.g>
              )}

              {isMiddle && (
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <line
                    x1={right}
                    y1={probeY}
                    x2={profileX + 40 * 1.15 * probeReveal}
                    y2={probeY}
                    stroke={ACCENT}
                    strokeWidth={1.2}
                    strokeDasharray="3 3"
                  />
                  <VLine x={right + 12} from={naY} to={probeY} label="y = 40 mm" />
                  <circle cx={profileX + 40 * 1.15 * probeReveal} cy={probeY} r={3.6} fill={ACCENT} />
                  <text x={profileX + 40 * 1.15 + 6} y={probeY - 7} fontSize={9.5} fill={ACCENT}>
                    σ = +11,72 MPa
                  </text>
                  <text x={profileX} y={bottom + 34} textAnchor="middle" fontSize={9} fill={MUTED}>
                    połowa odległości → połowa naprężenia
                  </text>
                </motion.g>
              )}
            </>
          )}
        </svg>
      </div>
    </div>
  )
}

function VLine({ x, from, to, label }: { x: number; from: number; to: number; label: string }) {
  const mid = (from + to) / 2
  return (
    <g stroke={ACCENT} strokeWidth={1.1} fill={ACCENT}>
      <line x1={x} y1={from} x2={x} y2={to} />
      <line x1={x - 4} y1={from} x2={x + 4} y2={from} />
      <line x1={x - 4} y1={to} x2={x + 4} y2={to} />
      <text x={x + 9} y={mid} textAnchor="middle" fontSize={9} stroke="none" transform={`rotate(-90 ${x + 9} ${mid})`}>
        {label}
      </text>
    </g>
  )
}
