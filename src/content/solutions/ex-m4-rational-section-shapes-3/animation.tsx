import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const LOAD = '#ff6b45'
const MUTED = '#87929d'
const INK = '#17202a'

const CX = 205
const CY = 150
const R = 90
const INNER = R * (58.22 / 63.25)
const WALL = R - INNER
const SOLID_R = Math.sqrt(2000 / Math.PI) * (R / 63.25)

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}

function Ring({ faded = false }: { faded?: boolean }) {
  return (
    <g opacity={faded ? 0.5 : 1}>
      <circle cx={CX} cy={CY} r={R} fill="#e8edfc" stroke="#7d8fa5" strokeWidth={1.6} />
      <circle cx={CX} cy={CY} r={INNER} fill="#fff" stroke="#87929d" strokeWidth={1.2} />
      <circle cx={CX} cy={CY} r={2} fill={INK} />
    </g>
  )
}

function Axis() {
  return (
    <g>
      <line x1={70} y1={CY} x2={430} y2={CY} stroke={LOAD} strokeWidth={1.3} strokeDasharray="6 4" />
      <text x={72} y={CY - 7} fontSize={8.5} fill={LOAD}>
        oś obojętna
      </text>
    </g>
  )
}

function WeightRings({ p }: { p: number }) {
  const ratios = [0.88, 0.93, 0.98]
  return (
    <g>
      {ratios.map((ratio, index) => {
        const weight = ratio * ratio
        const reveal = clamp01((p - index * 0.12) / 0.45)
        return (
          <motion.circle
            key={ratio}
            cx={CX}
            cy={CY}
            r={R * ratio}
            fill="none"
            stroke={ACCENT}
            strokeWidth={1.5 + 4 * weight}
            initial={{ opacity: 0 }}
            animate={{ opacity: reveal * (0.2 + 0.45 * weight) }}
            transition={{ duration: 0.2 }}
          />
        )
      })}
    </g>
  )
}

function StressProfile({ x0, max, p }: { x0: number; max: number; p: number }) {
  const rows = [-1, -0.75, -0.5, -0.25, 0.25, 0.5, 0.75, 1]
  return (
    <g>
      <path d={`M ${x0} ${CY} L ${x0 + max} ${CY - R} L ${x0} ${CY - R} Z`} fill={ACCENT} fillOpacity={0.1} />
      <path d={`M ${x0} ${CY} L ${x0 + max} ${CY + R} L ${x0} ${CY + R} Z`} fill={LOAD} fillOpacity={0.1} />
      <line x1={x0} y1={CY - R} x2={x0} y2={CY + R} stroke={MUTED} strokeWidth={1} />
      {rows.map((ratio, index) => {
        const y = CY + ratio * R
        const length = max * Math.abs(ratio)
        const reveal = clamp01((p - index * 0.035) / 0.5)
        const color = ratio < 0 ? ACCENT : LOAD
        return (
          <motion.line
            key={ratio}
            x1={x0}
            y1={y}
            x2={x0}
            y2={y}
            stroke={color}
            strokeWidth={1.7}
            markerEnd={`url(#rs3-arrow-${ratio < 0 ? 'c' : 't'})`}
            initial={{ x2: x0 }}
            animate={{ x2: x0 + length * reveal }}
            transition={{ duration: 0.15 }}
          />
        )
      })}
      <text x={x0 + 2} y={CY - R - 8} fontSize={8.5} fill={MUTED}>
        σ(y)
      </text>
    </g>
  )
}

function ripplePath(radius: number, amplitude: number, phase: number) {
  const points = 72
  return `${Array.from({ length: points }, (_, index) => {
    const angle = (index / points) * Math.PI * 2
    const r = radius + amplitude * Math.sin(8 * angle + phase)
    const x = CX + r * Math.cos(angle)
    const y = CY + r * Math.sin(angle)
    return `${index === 0 ? 'M' : 'L'} ${x} ${y}`
  }).join(' ')} Z`
}

export function RationalSectionShapes3Animation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const p = playing ? smooth(sceneProgress) : 1
  const isModel = metric === 'model'
  const isDistribution = metric === 'distribution'
  const isRadius = metric === 'radius'
  const isWall = metric === 'wall'
  const isStress = metric === 'stress'
  const isCheck = metric === 'check'

  const title =
    metric === 'model'
      ? 'A = 2000 mm², I/A = 2000 mm²'
      : metric === 'distribution'
        ? 'materiał przy promieniu R'
        : metric === 'radius'
          ? 'promień z wymaganego I/A'
          : metric === 'wall'
            ? 'grubość ścianki z pola'
            : metric === 'stress'
              ? 'sprawdzenie I i W'
              : 'kontrola założeń'

  const note =
    metric === 'model'
      ? 'pole i wymagana efektywność są dane; szukamy promienia i grubości ścianki'
      : metric === 'distribution'
        ? 'ten sam materiał na większym promieniu daje większy moment bezwładności'
        : metric === 'radius'
          ? 'wymagane I/A wyznacza promień rury, a nie grubość ścianki'
          : metric === 'wall'
            ? 'przy dużym promieniu wymagane pole daje cienką ściankę'
            : metric === 'stress'
              ? 'naprężenie rośnie liniowo od osi do zewnętrznej ścianki'
              : 'wynik geometryczny trzeba sprawdzić pod kątem stateczności i technologii'

  const radiusAngle = -0.55
  const radiusEndX = CX + R * Math.cos(radiusAngle)
  const radiusEndY = CY + R * Math.sin(radiusAngle)
  const wallAngle = -0.62
  const wallOuterX = CX + R * Math.cos(wallAngle)
  const wallOuterY = CY + R * Math.sin(wallAngle)
  const wallInnerX = CX + INNER * Math.cos(wallAngle)
  const wallInnerY = CY + INNER * Math.sin(wallAngle)
  const ripple0 = ripplePath(INNER, 2.6, 0)
  const ripple1 = ripplePath(INNER, 2.6, Math.PI)
  const ripple2 = ripplePath(INNER, 2.6, Math.PI * 2)

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 300"
          role="img"
          aria-label="Cienkościenna rura o zadanym polu 2000 mm kwadratowych i wymaganym stosunku I/A równym 2000 mm kwadratowych. Animacja pokazuje dobór promienia, grubości ścianki oraz rozkład materiału i naprężeń względem osi obojętnej."
        >
          <defs>
            <marker
              id="rs3-arrow-c"
              viewBox="0 0 10 10"
              refX={8}
              refY={5}
              markerWidth={5}
              markerHeight={5}
              orient="auto"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={ACCENT} />
            </marker>
            <marker
              id="rs3-arrow-t"
              viewBox="0 0 10 10"
              refX={8}
              refY={5}
              markerWidth={5}
              markerHeight={5}
              orient="auto"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={LOAD} />
            </marker>
          </defs>

          <Axis />

          {isModel && (
            <>
              <motion.g
                initial={{ opacity: 0, scale: 0.93 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                style={{ transformOrigin: `${CX}px ${CY}px` }}
              >
                <Ring />
              </motion.g>
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: playing ? smooth((sceneProgress - 0.2) / 0.5) : 1 }}
                transition={{ duration: 0.3 }}
              >
                <line
                  x1={CX}
                  y1={CY}
                  x2={radiusEndX}
                  y2={radiusEndY}
                  stroke={ACCENT}
                  strokeWidth={1.4}
                  strokeDasharray="5 4"
                  markerEnd="url(#rs3-arrow-c)"
                />
                <text x={radiusEndX + 6} y={radiusEndY - 4} fontSize={8.5} fill={ACCENT}>
                  R = ?
                </text>
                <text x={CX + R * 0.82} y={CY + 8} fontSize={8.5} fill={LOAD}>
                  t = ?
                </text>
              </motion.g>
            </>
          )}

          {isDistribution && (
            <>
              <Ring />
              <WeightRings p={p} />
              <motion.circle
                cx={CX}
                cy={CY}
                r={SOLID_R}
                fill="none"
                stroke={MUTED}
                strokeWidth={1.4}
                strokeDasharray="4 4"
                initial={{ scale: 0 }}
                animate={{ scale: playing ? Math.max(0.001, p) : 1 }}
                transition={{ duration: 0.4 }}
                style={{ transformOrigin: `${CX}px ${CY}px` }}
              />
              <line
                x1={CX}
                y1={CY}
                x2={CX + R * 0.92 * Math.cos(-1.15)}
                y2={CY + R * 0.92 * Math.sin(-1.15)}
                stroke={ACCENT}
                strokeWidth={1.4}
                markerEnd="url(#rs3-arrow-c)"
              />
              <text x={CX - 6} y={CY - R * 0.78} fontSize={8.5} fill={ACCENT}>
                r ≈ R
              </text>
              <text x={CX} y={CY + 19} textAnchor="middle" fontSize={7.5} fill={MUTED}>
                ten sam materiał
              </text>
              <text x={CX} y={CY + 31} textAnchor="middle" fontSize={7.5} fill={MUTED}>
                A = 2000 mm²
              </text>
            </>
          )}

          {isRadius && (
            <>
              <Ring />
              <motion.line
                x1={CX}
                y1={CY}
                x2={CX}
                y2={CY}
                stroke={ACCENT}
                strokeWidth={1.6}
                markerEnd="url(#rs3-arrow-c)"
                initial={false}
                animate={{
                  x2: playing ? CX + (radiusEndX - CX) * p : radiusEndX,
                  y2: playing ? CY + (radiusEndY - CY) * p : radiusEndY,
                }}
                transition={{ duration: 0.1 }}
              />
              <motion.line
                x1={CX}
                y1={55}
                x2={CX}
                y2={55}
                stroke={MUTED}
                strokeWidth={1.1}
                initial={false}
                animate={{
                  x1: CX - R * (playing ? p : 1),
                  x2: CX + R * (playing ? p : 1),
                }}
                transition={{ duration: 0.1 }}
              />
              <line x1={CX - R} y1={51} x2={CX - R} y2={59} stroke={MUTED} strokeWidth={1.1} />
              <line x1={CX + R} y1={51} x2={CX + R} y2={59} stroke={MUTED} strokeWidth={1.1} />
              <text x={CX} y={49} textAnchor="middle" fontSize={8.5} fill={INK}>
                D ≈ 126,5 mm
              </text>
              <text x={radiusEndX + 7} y={radiusEndY - 5} fontSize={8.5} fill={ACCENT}>
                R ≈ 63,25 mm
              </text>
            </>
          )}

          {isWall && (
            <>
              <Ring />
              <motion.circle
                cx={CX}
                cy={CY}
                r={(R + INNER) / 2}
                fill="none"
                stroke={ACCENT}
                strokeWidth={0}
                initial={{ strokeWidth: 0 }}
                animate={{ strokeWidth: playing ? WALL * smooth((sceneProgress - 0.1) / 0.5) : WALL }}
                transition={{ duration: 0.3 }}
                opacity={0.5}
              />
              <line x1={wallOuterX} y1={wallOuterY} x2={wallInnerX} y2={wallInnerY} stroke={LOAD} strokeWidth={2.2} />
              <line
                x1={wallOuterX + 4}
                y1={wallOuterY}
                x2={wallOuterX - 4}
                y2={wallOuterY}
                stroke={LOAD}
                strokeWidth={1.2}
              />
              <line
                x1={wallInnerX + 4}
                y1={wallInnerY}
                x2={wallInnerX - 4}
                y2={wallInnerY}
                stroke={LOAD}
                strokeWidth={1.2}
              />
              <text x={wallOuterX + 10} y={wallOuterY - 6} fontSize={8.5} fill={LOAD}>
                t ≈ 5,03 mm
              </text>
              <text x={CX} y={CY + 19} textAnchor="middle" fontSize={7.5} fill={MUTED}>
                A ≈ 2πRt
              </text>
            </>
          )}

          {isStress && (
            <>
              <Ring />
              <StressProfile x0={CX + R + 18} max={55} p={p} />
              <line x1={435} y1={CY} x2={435} y2={CY - R} stroke={MUTED} strokeWidth={1.1} />
              <line x1={431} y1={CY} x2={439} y2={CY} stroke={MUTED} strokeWidth={1.1} />
              <line x1={431} y1={CY - R} x2={439} y2={CY - R} stroke={MUTED} strokeWidth={1.1} />
              <text
                x={426}
                y={CY - R / 2}
                textAnchor="middle"
                fontSize={8}
                fill={MUTED}
                transform={`rotate(-90 426 ${CY - R / 2})`}
              >
                c = R ≈ 63,25
              </text>
              <text x={CX + R + 18} y={CY - R - 10} fontSize={8.5} fill={INK}>
                W ≈ 63,2·10³ mm³
              </text>
            </>
          )}

          {isCheck && (
            <>
              <circle cx={CX} cy={CY} r={R} fill="#e8edfc" stroke="#7d8fa5" strokeWidth={1.6} />
              <circle
                cx={CX}
                cy={CY}
                r={R + 9}
                fill="none"
                stroke={LOAD}
                strokeWidth={1.3}
                strokeDasharray="6 5"
                opacity={0.6}
              />
              <motion.path
                d={ripple0}
                fill="#fff"
                stroke="#87929d"
                strokeWidth={1.2}
                initial={false}
                animate={playing ? { d: [ripple0, ripple1, ripple2] } : { d: ripple0 }}
                transition={{ duration: 2.4, repeat: playing ? Infinity : 0, ease: 'easeInOut' }}
              />
              <motion.circle
                cx={CX}
                cy={CY}
                r={SOLID_R}
                fill="none"
                stroke={MUTED}
                strokeWidth={1.2}
                strokeDasharray="4 4"
                initial={{ scale: 0 }}
                animate={{ scale: playing ? Math.max(0.001, p) : 1 }}
                transition={{ duration: 0.4 }}
                style={{ transformOrigin: `${CX}px ${CY}px` }}
              />
              <text x={CX} y={CY + 18} textAnchor="middle" fontSize={7.5} fill={MUTED}>
                ten sam materiał
              </text>
              <text x={CX} y={CY + 30} textAnchor="middle" fontSize={7.5} fill={MUTED}>
                A = 2000 mm²
              </text>
              <line x1={CX + R + 4} y1={CY - 10} x2={CX + R + 34} y2={CY - 38} stroke={LOAD} strokeWidth={1} />
              <text x={CX + R + 36} y={CY - 38} fontSize={8.5} fill={LOAD}>
                większy gabaryt
              </text>
              <text x={CX} y={CY + 64} textAnchor="middle" fontSize={8.5} fill={LOAD}>
                możliwe lokalne wyboczenie ścianki
              </text>
            </>
          )}

          <text x={CX} y={24} textAnchor="middle" fontSize={10} fontWeight={700} fill={INK}>
            {title}
          </text>
          {isModel ? (
            <text x={CX} y={38} textAnchor="middle" fontSize={8.5} fill={MUTED}>
              szukane: R oraz t
            </text>
          ) : (
            <text x={CX} y={38} textAnchor="middle" fontSize={8.5} fill={MUTED}>
              A = 2000 mm², I = 4,0·10⁶ mm⁴
            </text>
          )}

          <text x={CX} y={272} textAnchor="middle" fontSize={8.5} fill={INK}>
            {isRadius
              ? 'R ≈ 63,25 mm, D ≈ 126,5 mm'
              : isWall
                ? 't ≈ 5,03 mm'
                : isStress
                  ? 'I ≈ 4,0·10⁶ mm⁴, W ≈ 63,2·10³ mm³'
                  : isCheck
                    ? 'D/t ≈ 25; I_y = I_x ≈ 4,0·10⁶ mm⁴'
                    : isDistribution
                      ? 'I/A ≈ R²/2'
                      : 'szukane: R oraz t'}
          </text>

          <text x={230} y={290} textAnchor="middle" fontSize={8} fill={MUTED}>
            {note}
          </text>
        </svg>
      </div>
    </div>
  )
}
