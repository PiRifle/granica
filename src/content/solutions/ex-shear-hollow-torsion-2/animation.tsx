import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const LOAD = '#ff6b45'
const MUTED = '#87929d'
const INK = '#17202a'
const STROKE = '#7d8fa5'
const FILL = '#eef3fa'
const SOLID = '#dfe6f2'

const CY = 145
const R_SOLID = 62
const R_TUBE = 73.1
const RI = 38.75
const X_LEFT = 135
const X_RIGHT = 325

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}

const PARTICLES = Array.from({ length: 42 }, (_, index) => {
  const angle = (index / 42) * Math.PI * 2 + (index % 5) * 0.08
  const startRatio = 0.08 + ((index * 37) % 84) / 100
  const endRatio = 0.1 + ((index * 29) % 82) / 100
  return {
    angle,
    start: RI * startRatio,
    end: RI + (R_TUBE - RI) * endRatio,
    delay: (index % 11) * 0.018,
  }
})

function TorqueArrow({ cx, cy, radius, p }: { cx: number; cy: number; radius: number; p: number }) {
  const r = radius + 15
  const startX = cx - r * 0.72
  const startY = cy - r * 0.69
  const endX = cx + r * 0.72
  const endY = cy - r * 0.69
  return (
    <g>
      <motion.path
        d={`M ${startX} ${startY} A ${r} ${r} 0 0 1 ${endX} ${endY}`}
        fill="none"
        stroke={LOAD}
        strokeWidth={2.2}
        markerEnd="url(#hst2-load)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: p, opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
      <text x={endX + 7} y={endY + 4} fontSize={9} fontWeight={600} fill={LOAD}>
        T
      </text>
    </g>
  )
}

function WeightRings({
  cx,
  cy,
  radius,
  innerRatio,
  ratios,
  p,
}: {
  cx: number
  cy: number
  radius: number
  innerRatio: number
  ratios: number[]
  p: number
}) {
  return (
    <g>
      {ratios.map((ratio, index) => {
        const weight = Math.max(ratio * ratio - innerRatio * innerRatio, 0)
        const reveal = clamp01((p - index * 0.1) / 0.45)
        return (
          <motion.circle
            key={`${cx}-${ratio}`}
            cx={cx}
            cy={cy}
            r={radius * ratio}
            fill="none"
            stroke={ACCENT}
            strokeWidth={1.2 + 4.2 * weight}
            initial={{ opacity: 0 }}
            animate={{ opacity: reveal * (0.18 + 0.5 * weight) }}
            transition={{ duration: 0.2 }}
          />
        )
      })}
    </g>
  )
}

function Profile({
  x0,
  y0,
  width,
  height,
  innerRatio,
  p,
  maxLabel,
  innerLabel,
}: {
  x0: number
  y0: number
  width: number
  height: number
  innerRatio: number
  p: number
  maxLabel: string
  innerLabel?: string
}) {
  const topX = x0 + width
  const topY = y0 - height
  const innerX = x0 + width * innerRatio
  const innerY = y0 - height * innerRatio
  const band = `M ${innerX} ${y0} L ${topX} ${y0} L ${topX} ${topY} L ${innerX} ${innerY} Z`
  const profile = `M ${innerX} ${innerY} L ${topX} ${topY}`
  return (
    <g>
      <line x1={x0} y1={y0} x2={topX + 10} y2={y0} stroke={STROKE} strokeWidth={1.1} />
      <line x1={x0} y1={y0 + 8} x2={x0} y2={topY - 12} stroke={STROKE} strokeWidth={1.1} />
      <path d={band} fill={ACCENT} fillOpacity={0.1 * p} />
      <motion.line
        x1={x0}
        y1={y0}
        x2={topX}
        y2={topY}
        stroke={MUTED}
        strokeWidth={1}
        strokeDasharray="4 4"
        initial={{ opacity: 0 }}
        animate={{ opacity: p }}
        transition={{ duration: 0.2 }}
      />
      <motion.path
        d={profile}
        fill="none"
        stroke={ACCENT}
        strokeWidth={2.3}
        markerEnd="url(#hst2-stress)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: p }}
        transition={{ duration: 0.2 }}
      />
      <line x1={topX} y1={y0} x2={topX} y2={topY - 4} stroke={MUTED} strokeWidth={1} strokeDasharray="3 3" />
      {innerRatio > 0 && (
        <>
          <line x1={innerX} y1={y0} x2={innerX} y2={innerY} stroke={LOAD} strokeWidth={1} strokeDasharray="3 3" />
          <motion.circle
            cx={innerX}
            cy={innerY}
            r={3}
            fill={LOAD}
            initial={{ scale: 0 }}
            animate={{ scale: p > 0.55 ? 1 : 0 }}
            transition={{ duration: 0.15 }}
          />
        </>
      )}
      <motion.circle
        cx={topX}
        cy={topY}
        r={3.4}
        fill={ACCENT}
        initial={{ scale: 0 }}
        animate={{ scale: p > 0.85 ? 1 : 0 }}
        transition={{ duration: 0.15 }}
      />
      <text x={topX + 4} y={topY - 6} fontSize={8.5} fontWeight={600} fill={ACCENT}>
        {maxLabel}
      </text>
      {innerLabel && (
        <text x={innerX + 3} y={innerY - 6} fontSize={8} fill={LOAD}>
          {innerLabel}
        </text>
      )}
      <text x={topX} y={y0 + 14} textAnchor="middle" fontSize={8} fill={MUTED}>
        R
      </text>
    </g>
  )
}

export function HollowTorsionEqualMassAnimation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const p = playing ? smooth(sceneProgress) : 1
  const isModel = metric === 'model'
  const isGeometry = metric === 'geometry'
  const isInertia = metric === 'inertia'
  const isStress = metric === 'stress'
  const isLimits = metric === 'limits'

  const outer = R_SOLID + (R_TUBE - R_SOLID) * p
  const core = RI * p

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 300"
          role="img"
          aria-label="Porównanie wału pełnego o średnicy 80 mm i rury o średnicy wewnętrznej 50 mm przy tej samej masie. Animacja pokazuje przeniesienie materiału z rdzenia na obrzeże, rozkład naprężeń i większy gabaryt rury."
        >
          <defs>
            <marker id="hst2-load" viewBox="0 0 10 10" refX={8} refY={5} markerWidth={6} markerHeight={6} orient="auto">
              <path d="M0 0 L10 5 L0 10 Z" fill={LOAD} />
            </marker>
            <marker
              id="hst2-stress"
              viewBox="0 0 10 10"
              refX={8}
              refY={5}
              markerWidth={5}
              markerHeight={5}
              orient="auto"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={ACCENT} />
            </marker>
            <pattern id="hst2-core" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="7" stroke={LOAD} strokeWidth="2" opacity="0.55" />
            </pattern>
          </defs>

          {isModel && (
            <>
              <motion.g
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45 }}
                style={{ transformOrigin: `${X_LEFT}px ${CY}px` }}
              >
                <circle cx={X_LEFT} cy={CY} r={R_SOLID} fill={SOLID} stroke={STROKE} strokeWidth={1.6} />
                <circle cx={X_LEFT} cy={CY} r={2.4} fill={INK} />
                <TorqueArrow cx={X_LEFT} cy={CY} radius={R_SOLID} p={p} />
                <text x={X_LEFT} y={52} textAnchor="middle" fontSize={9.5} fontWeight={600} fill={INK}>
                  wał pełny ∅80
                </text>
                <text x={X_LEFT} y={264} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                  A_0 = 5 027 mm²
                </text>
              </motion.g>
              <motion.g
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45, delay: 0.08 }}
                style={{ transformOrigin: `${X_RIGHT}px ${CY}px` }}
              >
                <circle cx={X_RIGHT} cy={CY} r={R_TUBE} fill={FILL} stroke={STROKE} strokeWidth={1.6} />
                <circle cx={X_RIGHT} cy={CY} r={RI} fill="#fff" stroke={STROKE} strokeWidth={1.3} />
                <circle cx={X_RIGHT} cy={CY} r={2.4} fill={INK} />
                <TorqueArrow cx={X_RIGHT} cy={CY} radius={R_TUBE} p={p} />
                <text x={X_RIGHT} y={46} textAnchor="middle" fontSize={9.5} fontWeight={600} fill={INK}>
                  rura d = 50 mm
                </text>
                <text x={X_RIGHT} y={264} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                  D = ? przy tym samym polu
                </text>
              </motion.g>
              <motion.text
                x={230}
                y={286}
                textAnchor="middle"
                fontSize={9}
                fontWeight={600}
                fill={ACCENT}
                initial={{ opacity: 0 }}
                animate={{ opacity: p > 0.55 ? 1 : 0 }}
                transition={{ duration: 0.2 }}
              >
                ten sam materiał: A = A_0
              </motion.text>
            </>
          )}

          {isGeometry && (
            <>
              <circle cx={210} cy={CY} r={outer} fill={SOLID} stroke={STROKE} strokeWidth={1.7} />
              <motion.circle cx={210} cy={CY} r={core} fill="#fff" stroke={STROKE} strokeWidth={1.4} initial={false} />
              <circle cx={210} cy={CY} r={2.4} fill={INK} />
              {PARTICLES.map((particle, index) => {
                const move = smooth(clamp01((p - particle.delay) / 0.72))
                const radius = particle.start + (particle.end - particle.start) * move
                const x = 210 + radius * Math.cos(particle.angle)
                const y = CY + radius * Math.sin(particle.angle)
                return <circle key={index} cx={x} cy={y} r={2.3} fill={ACCENT} opacity={0.78} />
              })}
              <motion.circle
                cx={210}
                cy={CY}
                r={RI}
                fill="url(#hst2-core)"
                stroke={LOAD}
                strokeWidth={1.3}
                strokeDasharray="5 4"
                initial={false}
                animate={{ opacity: 0.55 * (1 - p) }}
                transition={{ duration: 0.15 }}
              />
              <text x={210} y={CY + 4} textAnchor="middle" fontSize={8.5} fontWeight={600} fill={LOAD}>
                rdzeń → obrzeże
              </text>
              <line x1={210 - R_TUBE} y1={44} x2={210 + R_TUBE} y2={44} stroke={MUTED} strokeWidth={1.1} />
              <line x1={210 - R_TUBE} y1={38} x2={210 - R_TUBE} y2={50} stroke={MUTED} strokeWidth={1.1} />
              <line x1={210 + R_TUBE} y1={38} x2={210 + R_TUBE} y2={50} stroke={MUTED} strokeWidth={1.1} />
              <text x={210} y={36} textAnchor="middle" fontSize={9.5} fontWeight={600} fill={INK}>
                D_rury = 94,34 mm
              </text>
              <line x1={210 - RI} y1={244} x2={210 + RI} y2={244} stroke={LOAD} strokeWidth={1.1} />
              <line x1={210 - RI} y1={238} x2={210 - RI} y2={250} stroke={LOAD} strokeWidth={1.1} />
              <line x1={210 + RI} y1={238} x2={210 + RI} y2={250} stroke={LOAD} strokeWidth={1.1} />
              <text x={210} y={262} textAnchor="middle" fontSize={9} fill={LOAD}>
                d = 50 mm, t = 22,17 mm
              </text>
              <text x={210} y={282} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                materiał z rdzenia przenosimy na obrzeże
              </text>
            </>
          )}

          {isInertia && (
            <>
              <circle cx={X_LEFT} cy={CY} r={R_SOLID} fill={SOLID} stroke={STROKE} strokeWidth={1.5} />
              <circle cx={X_RIGHT} cy={CY} r={R_TUBE} fill={FILL} stroke={STROKE} strokeWidth={1.5} />
              <circle cx={X_RIGHT} cy={CY} r={RI} fill="#fff" stroke={STROKE} strokeWidth={1.2} />
              <WeightRings
                cx={X_LEFT}
                cy={CY}
                radius={R_SOLID}
                innerRatio={0}
                ratios={[0.22, 0.4, 0.58, 0.76, 0.96]}
                p={p}
              />
              <WeightRings
                cx={X_RIGHT}
                cy={CY}
                radius={R_TUBE}
                innerRatio={RI / R_TUBE}
                ratios={[0.78, 0.86, 0.93, 0.99]}
                p={p}
              />
              <circle cx={X_LEFT} cy={CY} r={2.4} fill={INK} />
              <circle cx={X_RIGHT} cy={CY} r={2.4} fill={INK} />
              <text x={X_LEFT} y={52} textAnchor="middle" fontSize={9.5} fontWeight={600} fill={INK}>
                wał pełny
              </text>
              <text x={X_RIGHT} y={46} textAnchor="middle" fontSize={9.5} fontWeight={600} fill={INK}>
                rura
              </text>
              <text x={X_LEFT} y={264} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                J = 4,02·10⁶ mm⁴
              </text>
              <text x={X_RIGHT} y={264} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                J = 7,16·10⁶ mm⁴
              </text>
              <text x={230} y={284} textAnchor="middle" fontSize={8.5} fill={ACCENT}>
                pierścienie: większe r² i większy wkład do J
              </text>
            </>
          )}

          {isStress && (
            <>
              <text x={142} y={56} textAnchor="middle" fontSize={9.5} fontWeight={600} fill={INK}>
                wał pełny ∅80
              </text>
              <text x={337} y={56} textAnchor="middle" fontSize={9.5} fontWeight={600} fill={INK}>
                rura ∅94,34/∅50
              </text>
              <Profile x0={95} y0={240} width={95} height={100} innerRatio={0} p={p} maxLabel="24,9 MPa" />
              <Profile
                x0={290}
                y0={240}
                width={95}
                height={66.5}
                innerRatio={RI / R_TUBE}
                p={p}
                maxLabel="16,5 MPa"
                innerLabel="8,7 MPa"
              />
              <motion.text
                x={230}
                y={280}
                textAnchor="middle"
                fontSize={9.5}
                fontWeight={600}
                fill={LOAD}
                initial={{ opacity: 0 }}
                animate={{ opacity: p > 0.7 ? 1 : 0 }}
                transition={{ duration: 0.2 }}
              >
                przy tej samej masie naprężenie mniejsze o 34%
              </motion.text>
            </>
          )}

          {isLimits && (
            <>
              <circle cx={230} cy={CY} r={R_TUBE} fill={FILL} stroke={STROKE} strokeWidth={1.6} />
              <circle cx={230} cy={CY} r={RI} fill="#fff" stroke={STROKE} strokeWidth={1.2} />
              <motion.circle
                cx={230}
                cy={CY}
                r={R_SOLID}
                fill="none"
                stroke={MUTED}
                strokeWidth={1.5}
                strokeDasharray="5 4"
                initial={{ scale: 0 }}
                animate={{ scale: playing ? Math.max(0.001, p) : 1 }}
                transition={{ duration: 0.35 }}
                style={{ transformOrigin: `230px ${CY}px` }}
              />
              <circle cx={230} cy={CY} r={2.4} fill={INK} />
              <line x1={230 - R_TUBE} y1={40} x2={230 + R_TUBE} y2={40} stroke={MUTED} strokeWidth={1.1} />
              <line x1={230 - R_TUBE} y1={34} x2={230 - R_TUBE} y2={46} stroke={MUTED} strokeWidth={1.1} />
              <line x1={230 + R_TUBE} y1={34} x2={230 + R_TUBE} y2={46} stroke={MUTED} strokeWidth={1.1} />
              <text x={230} y={32} textAnchor="middle" fontSize={9} fontWeight={600} fill={INK}>
                D_rury = 94,34 mm
              </text>
              <line x1={230 - R_SOLID} y1={246} x2={230 + R_SOLID} y2={246} stroke={MUTED} strokeWidth={1.1} />
              <line x1={230 - R_SOLID} y1={240} x2={230 - R_SOLID} y2={252} stroke={MUTED} strokeWidth={1.1} />
              <line x1={230 + R_SOLID} y1={240} x2={230 + R_SOLID} y2={252} stroke={MUTED} strokeWidth={1.1} />
              <text x={230} y={264} textAnchor="middle" fontSize={9} fill={MUTED}>
                D_wału = 80 mm
              </text>
              <text x={230} y={284} textAnchor="middle" fontSize={8.5} fill={LOAD}>
                ten sam materiał, większy gabaryt zewnętrzny
              </text>
              <line
                x1={230 + RI * Math.cos(-0.7)}
                y1={CY + RI * Math.sin(-0.7)}
                x2={230 + R_TUBE * Math.cos(-0.7)}
                y2={CY + R_TUBE * Math.sin(-0.7)}
                stroke={LOAD}
                strokeWidth={2.2}
              />
              <text x={318} y={104} fontSize={8.5} fill={LOAD}>
                t = 22,17 mm
              </text>
            </>
          )}
        </svg>
      </div>
    </div>
  )
}
