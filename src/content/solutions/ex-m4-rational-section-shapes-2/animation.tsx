import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const LOAD = '#ff6b45'
const MUTED = '#87929d'
const INK = '#17202a'

const CX = 200
const CY = 150
const R = 100
const INNER = R * 0.866
const SOLID_R = R * 0.5
const WALL = R - INNER

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}

const PARTICLES = Array.from({ length: 30 }, (_, index) => {
  const angle = (index / 30) * Math.PI * 2 + (index % 4) * 0.05
  const startRatio = 0.25 + ((index * 37) % 60) / 100
  const endRatio = 0.2 + ((index * 29) % 60) / 100
  return {
    angle,
    start: SOLID_R * startRatio,
    end: INNER + WALL * endRatio,
    delay: (index % 10) * 0.025,
  }
})

function Shapes({
  showSolid = true,
  solidOpacity = 0.18,
  faded = false,
}: {
  showSolid?: boolean
  solidOpacity?: number
  faded?: boolean
}) {
  return (
    <g opacity={faded ? 0.5 : 1}>
      <circle cx={CX} cy={CY} r={R} fill="#edf1fe" stroke="#7d8fa5" strokeWidth={1.6} />
      <circle cx={CX} cy={CY} r={INNER} fill="#fff" stroke="#87929d" strokeWidth={1.2} />
      {showSolid && (
        <circle
          cx={CX}
          cy={CY}
          r={SOLID_R}
          fill={ACCENT}
          fillOpacity={solidOpacity}
          stroke={ACCENT}
          strokeWidth={1.4}
        />
      )}
      <circle cx={CX} cy={CY} r={2} fill={INK} />
    </g>
  )
}

function Axis() {
  return (
    <g>
      <line x1={62} y1={CY} x2={438} y2={CY} stroke={LOAD} strokeWidth={1.3} strokeDasharray="6 4" />
      <text x={64} y={CY - 7} fontSize={8.5} fill={LOAD}>
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
            markerEnd={`url(#rs2-arrow-${ratio < 0 ? 'c' : 't'})`}
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

export function RationalSectionShapes2Animation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const p = playing ? smooth(sceneProgress) : 1
  const isModel = metric === 'model'
  const isGeometry = metric === 'geometry'
  const isDistribution = metric === 'distribution'
  const isInertia = metric === 'Ix'
  const isStress = metric === 'stress'
  const isLimits = metric === 'limits'

  const title =
    metric === 'model'
      ? 'ten sam materiał'
      : metric === 'geometry'
        ? 'rura przy stałym polu'
        : metric === 'distribution'
          ? 'materiał przesunięty od osi'
          : metric === 'Ix'
            ? 'moment bezwładności'
            : metric === 'stress'
              ? 'wskaźnik W i naprężenia'
              : 'granice kształtu'

  const note =
    metric === 'model'
      ? 'pręt pełny i rura mają identyczne pole A, ale inny rozkład materiału'
      : metric === 'geometry'
        ? 'warunek równego pola wyznacza średnicę wewnętrzną i grubość ścianki'
        : metric === 'distribution'
          ? 'pole pozostaje stałe, a średnia odległość materiału od osi rośnie'
          : metric === 'Ix'
            ? 'promień bezwładności i = √(I/A) rury jest znacznie większy'
            : metric === 'stress'
              ? 'W rośnie wolniej niż I, bo rośnie też odległość skrajnego włókna c'
              : 'większa średnica poprawia I i W, ale zwiększa gabaryt i ryzyko wyboczenia'

  const ripple0 = ripplePath(INNER, 2.6, 0)
  const ripple1 = ripplePath(INNER, 2.6, Math.PI)
  const ripple2 = ripplePath(INNER, 2.6, Math.PI * 2)
  const solidGyration = Math.sqrt(625)
  const tubeGyration = Math.sqrt(4374)

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 300"
          role="img"
          aria-label="Porównanie pręta pełnego o średnicy 100 mm i rury o średnicy 200 mm przy tym samym polu przekroju. Animacja pokazuje przesunięcie materiału od osi, wzrost momentu bezwładności i granice cienkiej ścianki."
        >
          <defs>
            <marker
              id="rs2-arrow-c"
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
              id="rs2-arrow-t"
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
            <motion.g
              initial={{ opacity: 0, scale: 0.93 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              style={{ transformOrigin: `${CX}px ${CY}px` }}
            >
              <Shapes />
            </motion.g>
          )}

          {isGeometry && (
            <>
              <circle cx={CX} cy={CY} r={R} fill="#edf1fe" stroke="#7d8fa5" strokeWidth={1.6} />
              <motion.circle
                cx={CX}
                cy={CY}
                r={INNER}
                fill="#fff"
                stroke="#87929d"
                strokeWidth={1.2}
                initial={{ scale: 0 }}
                animate={{ scale: playing ? Math.max(0.001, p) : 1 }}
                transition={{ duration: 0.45 }}
                style={{ transformOrigin: `${CX}px ${CY}px` }}
              />
              <motion.circle
                cx={CX}
                cy={CY}
                r={(R + INNER) / 2}
                fill="none"
                stroke={ACCENT}
                strokeWidth={WALL}
                initial={{ opacity: 0 }}
                animate={{ opacity: playing ? smooth((sceneProgress - 0.35) / 0.4) * 0.42 : 0.42 }}
                transition={{ duration: 0.3 }}
              />
              <line x1={CX - INNER} y1={CY + 36} x2={CX + INNER} y2={CY + 36} stroke={MUTED} strokeWidth={1.1} />
              <line x1={CX - INNER} y1={CY + 32} x2={CX - INNER} y2={CY + 40} stroke={MUTED} />
              <line x1={CX + INNER} y1={CY + 32} x2={CX + INNER} y2={CY + 40} stroke={MUTED} />
              <text x={CX} y={CY + 52} textAnchor="middle" fontSize={8.5} fill={INK}>
                d ≈ 173,2 mm
              </text>
              <line x1={CX + R * 0.97} y1={CY - 22} x2={CX + 128} y2={CY - 48} stroke={MUTED} strokeWidth={1} />
              <text x={CX + 132} y={CY - 48} fontSize={8.5} fill={INK}>
                t ≈ 13,4 mm
              </text>
              <circle cx={CX} cy={CY} r={2} fill={INK} />
            </>
          )}

          {(isDistribution || isInertia || isStress) && (
            <Shapes showSolid={isDistribution} solidOpacity={isDistribution ? 0.12 : 0.18} />
          )}

          {isLimits && <circle cx={CX} cy={CY} r={R} fill="#edf1fe" stroke="#7d8fa5" strokeWidth={1.6} />}

          {isDistribution && (
            <>
              <circle cx={CX} cy={CY} r={SOLID_R} fill="none" stroke={ACCENT} strokeWidth={1.1} strokeDasharray="4 4" />
              {PARTICLES.map((particle, index) => {
                const move = smooth(clamp01((p - particle.delay) / 0.72))
                const radius = particle.start + (particle.end - particle.start) * move
                const x = CX + radius * Math.cos(particle.angle)
                const y = CY + radius * Math.sin(particle.angle)
                return <circle key={index} cx={x} cy={y} r={2.4} fill={ACCENT} opacity={0.78} />
              })}
              <text x={CX} y={CY + 22} textAnchor="middle" fontSize={8} fill={MUTED}>
                ten sam materiał
              </text>
              <text x={CX} y={CY + 36} textAnchor="middle" fontSize={8} fill={MUTED}>
                A = const
              </text>
            </>
          )}

          {isInertia && (
            <>
              <WeightRings p={p} />
              <motion.circle
                cx={CX}
                cy={CY}
                r={solidGyration}
                fill="none"
                stroke={MUTED}
                strokeWidth={1.5}
                strokeDasharray="4 4"
                initial={{ scale: 0 }}
                animate={{ scale: playing ? Math.max(0.001, p) : 1 }}
                transition={{ duration: 0.4 }}
                style={{ transformOrigin: `${CX}px ${CY}px` }}
              />
              <motion.circle
                cx={CX}
                cy={CY}
                r={tubeGyration}
                fill="none"
                stroke={ACCENT}
                strokeWidth={1.8}
                strokeDasharray="5 4"
                initial={{ scale: 0 }}
                animate={{ scale: playing ? Math.max(0.001, p) : 1 }}
                transition={{ duration: 0.5, delay: 0.08 }}
                style={{ transformOrigin: `${CX}px ${CY}px` }}
              />
              <text x={CX - 44} y={CY - 30} fontSize={8} fill={MUTED}>
                pręt: i = 25 mm
              </text>
              <text x={CX - 18} y={CY - 76} fontSize={8.5} fill={ACCENT}>
                rura: i ≈ 66,1 mm
              </text>
              <text x={CX + 56} y={CY + 100} fontSize={8.5} fill={ACCENT}>
                I_r/I_p ≈ 7
              </text>
              <text x={CX + 8} y={CY - 54} fontSize={8} fill={ACCENT}>
                r² dA
              </text>
            </>
          )}

          {isStress && (
            <>
              <circle cx={CX} cy={CY} r={SOLID_R} fill="none" stroke={MUTED} strokeWidth={1.1} strokeDasharray="4 4" />
              <text x={CX} y={CY + 64} textAnchor="middle" fontSize={8} fill={MUTED}>
                pręt: c_p = 50 mm
              </text>
              <StressProfile x0={CX + R + 15} max={55} p={p} />
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
                c_r = 100
              </text>
              <text x={CX + R + 15} y={CY - R - 18} fontSize={8.5} fill={INK}>
                W_r ≈ 343,6·10³ mm³
              </text>
            </>
          )}

          {isLimits && (
            <>
              <circle
                cx={CX}
                cy={CY}
                r={R + 8}
                fill="none"
                stroke={LOAD}
                strokeWidth={1.3}
                strokeDasharray="6 5"
                opacity={0.65}
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
              <line x1={CX + R + 2} y1={CY - 8} x2={CX + R + 34} y2={CY - 34} stroke={LOAD} strokeWidth={1} />
              <text x={CX + R + 36} y={CY - 34} fontSize={8.5} fill={LOAD}>
                większy gabaryt
              </text>
              <text x={CX} y={CY + 64} textAnchor="middle" fontSize={8.5} fill={LOAD}>
                możliwe lokalne wyboczenie ścianki
              </text>
            </>
          )}

          <text x={CX} y={26} textAnchor="middle" fontSize={10} fontWeight={700} fill={INK}>
            {title}
          </text>
          <text x={CX} y={42} textAnchor="middle" fontSize={8.5} fill={MUTED}>
            {isGeometry ? 'D = 200 mm, A = 7854 mm²' : 'D_p = 100 mm, D_r = 200 mm, A = 7854 mm²'}
          </text>

          {isModel && (
            <>
              <text x={CX} y={CY + 22} textAnchor="middle" fontSize={8.5} fill={ACCENT}>
                pręt pełny
              </text>
              <text x={CX} y={CY + 36} textAnchor="middle" fontSize={8} fill={MUTED}>
                D = 100 mm
              </text>
            </>
          )}

          <text x={CX} y={270} textAnchor="middle" fontSize={8.5} fill={INK}>
            {isGeometry
              ? 'd ≈ 173,2 mm, t ≈ 13,4 mm'
              : isInertia
                ? 'I_p = 4,909·10⁶ mm⁴  →  I_r ≈ 34,36·10⁶ mm⁴'
                : isStress
                  ? 'W_p ≈ 98,2·10³ mm³  →  W_r ≈ 343,6·10³ mm³'
                  : isLimits
                    ? 'D/t ≈ 14,9; I_y = I_x ≈ 34,36·10⁶ mm⁴'
                    : 'A_p = A_r = 7854 mm²'}
          </text>

          <text x={230} y={290} textAnchor="middle" fontSize={8} fill={MUTED}>
            {note}
          </text>
        </svg>
      </div>
    </div>
  )
}
