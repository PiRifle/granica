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

const CX = 205
const CY = 145
const R = 82
const RI = 68.6

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}

function TorqueArrow({ cx, cy, radius, p }: { cx: number; cy: number; radius: number; p: number }) {
  const r = radius + 16
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
        strokeWidth={2.3}
        markerEnd="url(#hst3-load)"
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
      <line x1={x0} y1={y0} x2={topX + 12} y2={y0} stroke={STROKE} strokeWidth={1.1} />
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
        strokeWidth={2.4}
        markerEnd="url(#hst3-stress)"
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
        D/2
      </text>
    </g>
  )
}

function ripplePath(cx: number, radius: number, amplitude: number, phase: number) {
  const points = 72
  return `${Array.from({ length: points }, (_, index) => {
    const angle = (index / points) * Math.PI * 2
    const r = radius + amplitude * Math.sin(8 * angle + phase)
    const x = cx + r * Math.cos(angle)
    const y = CY + r * Math.sin(angle)
    return `${index === 0 ? 'M' : 'L'} ${x} ${y}`
  }).join(' ')} Z`
}

export function HollowTorsionDesignAnimation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const p = playing ? smooth(sceneProgress) : 1
  const isModel = metric === 'model'
  const isDesign = metric === 'design'
  const isGeometry = metric === 'geometry'
  const isCheck = metric === 'check'
  const isLimits = metric === 'limits'

  const hole = RI * smooth(p)
  const markerY = 235 - (100000 / 120000) * 140
  const ripple0 = ripplePath(330, 50.2, 1.5, 0)
  const ripple1 = ripplePath(330, 50.2, 1.5, Math.PI)
  const ripple2 = ripplePath(330, 50.2, 1.5, Math.PI * 2)

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 300"
          role="img"
          aria-label="Projektowanie rury o średnicy zewnętrznej 100 mm na moment 4 kN m i naprężenie dopuszczalne 40 MPa. Animacja pokazuje wymagany wskaźnik, wydrążenie rdzenia, rozkład naprężeń i oszczędność materiału."
        >
          <defs>
            <marker id="hst3-load" viewBox="0 0 10 10" refX={8} refY={5} markerWidth={6} markerHeight={6} orient="auto">
              <path d="M0 0 L10 5 L0 10 Z" fill={LOAD} />
            </marker>
            <marker
              id="hst3-stress"
              viewBox="0 0 10 10"
              refX={8}
              refY={5}
              markerWidth={5}
              markerHeight={5}
              orient="auto"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={ACCENT} />
            </marker>
            <pattern id="hst3-core" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="7" stroke={LOAD} strokeWidth="2" opacity="0.55" />
            </pattern>
          </defs>

          {isModel && (
            <motion.g
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45 }}
              style={{ transformOrigin: `${CX}px ${CY}px` }}
            >
              <circle cx={CX} cy={CY} r={R} fill={FILL} stroke={STROKE} strokeWidth={1.7} />
              <circle cx={CX} cy={CY} r={R * 0.62} fill="none" stroke={LOAD} strokeWidth={1.4} strokeDasharray="6 5" />
              <circle cx={CX} cy={CY} r={2.5} fill={INK} />
              <TorqueArrow cx={CX} cy={CY} radius={R} p={p} />
              <line x1={CX - R} y1={44} x2={CX + R} y2={44} stroke={MUTED} strokeWidth={1.1} />
              <line x1={CX - R} y1={38} x2={CX - R} y2={50} stroke={MUTED} strokeWidth={1.1} />
              <line x1={CX + R} y1={38} x2={CX + R} y2={50} stroke={MUTED} strokeWidth={1.1} />
              <text x={CX} y={36} textAnchor="middle" fontSize={9.5} fontWeight={600} fill={INK}>
                D = 100 mm
              </text>
              <text x={CX} y={CY + 5} textAnchor="middle" fontSize={9} fill={LOAD}>
                d = ?
              </text>
              <text x={CX + R * 0.72} y={CY + 52} textAnchor="middle" fontSize={8.5} fill={LOAD}>
                t = ?
              </text>
              <text x={CX} y={264} textAnchor="middle" fontSize={9} fill={MUTED}>
                T = 4,0 kN·m, τ_dop = 40 MPa
              </text>
            </motion.g>
          )}

          {isDesign && (
            <>
              <circle cx={145} cy={CY} r={72} fill={FILL} stroke={STROKE} strokeWidth={1.6} />
              <circle cx={145} cy={CY} r={52} fill="none" stroke={LOAD} strokeWidth={1.4} strokeDasharray="6 5" />
              <circle cx={145} cy={CY} r={2.3} fill={INK} />
              <text x={145} y={44} textAnchor="middle" fontSize={9.5} fontWeight={600} fill={INK}>
                D = 100 mm
              </text>
              <text x={145} y={266} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                średnica zewnętrzna ustalona
              </text>
              <line x1={345} y1={235} x2={345} y2={95} stroke={STROKE} strokeWidth={1.1} />
              <line x1={341} y1={235} x2={349} y2={235} stroke={STROKE} strokeWidth={1.1} />
              <line x1={341} y1={95} x2={349} y2={95} stroke={STROKE} strokeWidth={1.1} />
              <motion.line
                x1={345}
                y1={235}
                x2={345}
                y2={235}
                stroke={ACCENT}
                strokeWidth={8}
                strokeLinecap="round"
                initial={false}
                animate={{ y2: playing ? 235 - (235 - markerY) * smooth(p) : markerY }}
                transition={{ duration: 0.2 }}
                opacity={0.35}
              />
              <motion.line
                x1={341}
                y1={markerY}
                x2={349}
                y2={markerY}
                stroke={LOAD}
                strokeWidth={1.8}
                initial={{ opacity: 0 }}
                animate={{ opacity: p > 0.72 ? 1 : 0 }}
                transition={{ duration: 0.2 }}
              />
              <text x={356} y={markerY - 6} fontSize={8.5} fontWeight={600} fill={LOAD}>
                W_o,min = 100 000 mm³
              </text>
              <text x={356} y={222} fontSize={8} fill={MUTED}>
                0
              </text>
              <text x={356} y={100} fontSize={8} fill={MUTED}>
                W_o
              </text>
              <text x={145} y={CY + 4} textAnchor="middle" fontSize={8.5} fill={LOAD}>
                dobierz ściankę
              </text>
              <text x={230} y={286} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                warunek wytrzymałości wyznacza wymagany wskaźnik
              </text>
            </>
          )}

          {isGeometry && (
            <>
              <circle cx={210} cy={CY} r={R} fill={SOLID} stroke={STROKE} strokeWidth={1.7} />
              <motion.circle cx={210} cy={CY} r={hole} fill="#fff" stroke={STROKE} strokeWidth={1.4} initial={false} />
              <motion.circle
                cx={210}
                cy={CY}
                r={RI}
                fill="url(#hst3-core)"
                stroke={LOAD}
                strokeWidth={1.3}
                strokeDasharray="5 4"
                initial={false}
                animate={{ opacity: 0.65 * (1 - smooth(p)) }}
                transition={{ duration: 0.15 }}
              />
              <circle cx={210} cy={CY} r={2.4} fill={INK} />
              <line x1={210 - R} y1={44} x2={210 + R} y2={44} stroke={MUTED} strokeWidth={1.1} />
              <line x1={210 - R} y1={38} x2={210 - R} y2={50} stroke={MUTED} strokeWidth={1.1} />
              <line x1={210 + R} y1={38} x2={210 + R} y2={50} stroke={MUTED} strokeWidth={1.1} />
              <text x={210} y={36} textAnchor="middle" fontSize={9.5} fontWeight={600} fill={INK}>
                D = 100 mm
              </text>
              <line x1={210 - RI} y1={244} x2={210 + RI} y2={244} stroke={LOAD} strokeWidth={1.2} />
              <line x1={210 - RI} y1={238} x2={210 - RI} y2={250} stroke={LOAD} strokeWidth={1.2} />
              <line x1={210 + RI} y1={238} x2={210 + RI} y2={250} stroke={LOAD} strokeWidth={1.2} />
              <text x={210} y={262} textAnchor="middle" fontSize={9} fill={LOAD}>
                d = 83,70 mm
              </text>
              <text x={210} y={282} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                t = (100 − 83,70)/2 = 8,15 mm
              </text>
            </>
          )}

          {isCheck && (
            <>
              <circle cx={135} cy={CY} r={75} fill={FILL} stroke={STROKE} strokeWidth={1.6} />
              <circle cx={135} cy={CY} r={62.8} fill="#fff" stroke={STROKE} strokeWidth={1.3} />
              <circle cx={135} cy={CY} r={2.4} fill={INK} />
              <line x1={58} y1={CY} x2={211} y2={CY} stroke={LOAD} strokeWidth={1.1} strokeDasharray="5 4" />
              <motion.circle
                cx={210}
                cy={CY}
                r={6}
                fill="none"
                stroke={LOAD}
                strokeWidth={1.8}
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: p > 0.55 ? 1 : 0.6, opacity: p > 0.55 ? 1 : 0 }}
                transition={{ duration: 0.2 }}
                style={{ transformOrigin: `210px ${CY}px` }}
              />
              <text x={135} y={44} textAnchor="middle" fontSize={9} fill={INK}>
                rura ∅100/∅83,70
              </text>
              <text x={135} y={266} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                W_o = 99 982 mm³
              </text>
              <Profile
                x0={250}
                y0={240}
                width={95}
                height={95}
                innerRatio={RI / R}
                p={p}
                maxLabel="τ_max = 40,0 MPa"
                innerLabel="33,5 MPa"
              />
              <motion.line
                x1={250}
                y1={145}
                x2={457}
                y2={145}
                stroke={LOAD}
                strokeWidth={1.3}
                strokeDasharray="6 4"
                initial={{ opacity: 0 }}
                animate={{ opacity: p > 0.82 ? 0.9 : 0 }}
                transition={{ duration: 0.2 }}
              />
              <text x={252} y={140} fontSize={8.2} fill={LOAD}>
                τ_dop = 40 MPa
              </text>
              <text x={250} y={274} fontSize={8.5} fill={MUTED}>
                naprężenie sięga granicy dopuszczalnej
              </text>
            </>
          )}

          {isLimits && (
            <>
              <motion.g initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
                <circle cx={135} cy={CY} r={60} fill={SOLID} stroke={STROKE} strokeWidth={1.5} />
                <text x={135} y={52} textAnchor="middle" fontSize={9.5} fontWeight={600} fill={INK}>
                  wał pełny ∅100
                </text>
                <text x={135} y={266} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                  A_0 = 7 854 mm²
                </text>
              </motion.g>
              <motion.g
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.08 }}
              >
                <circle cx={330} cy={CY} r={60} fill={FILL} stroke={STROKE} strokeWidth={1.5} />
                {p > 0.52 ? (
                  <motion.path
                    d={ripple0}
                    fill="#fff"
                    stroke={STROKE}
                    strokeWidth={1.2}
                    initial={false}
                    animate={playing ? { d: [ripple0, ripple1, ripple2] } : { d: ripple0 }}
                    transition={{ duration: 2.4, repeat: playing ? Infinity : 0, ease: 'easeInOut' }}
                  />
                ) : (
                  <circle cx={330} cy={CY} r={50.2} fill="#fff" stroke={STROKE} strokeWidth={1.2} />
                )}
                <motion.circle
                  cx={330}
                  cy={CY}
                  r={50.2}
                  fill="url(#hst3-core)"
                  stroke={LOAD}
                  strokeWidth={1.3}
                  strokeDasharray="5 4"
                  initial={false}
                  animate={{ opacity: 0.6 * (1 - smooth(p)) }}
                  transition={{ duration: 0.2 }}
                />
                <text x={330} y={52} textAnchor="middle" fontSize={9.5} fontWeight={600} fill={INK}>
                  rura ∅100/∅83,70
                </text>
                <text x={330} y={266} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                  A ≈ 2 352 mm²
                </text>
                <text x={330} y={CY + 4} textAnchor="middle" fontSize={8.5} fontWeight={600} fill={LOAD}>
                  rdzeń usunięty
                </text>
                <line x1={330 + 50.2} y1={CY} x2={330 + 60} y2={CY} stroke={LOAD} strokeWidth={2.4} />
                <text x={330 + 18} y={CY - 10} fontSize={8} fill={LOAD}>
                  t = 8,15
                </text>
              </motion.g>
              <motion.text
                x={230}
                y={286}
                textAnchor="middle"
                fontSize={9.5}
                fontWeight={600}
                fill={LOAD}
                initial={{ opacity: 0 }}
                animate={{ opacity: p > 0.65 ? 1 : 0 }}
                transition={{ duration: 0.2 }}
              >
                −70% materiału, ale cienka ścianka wymaga kontroli stateczności
              </motion.text>
            </>
          )}
        </svg>
      </div>
    </div>
  )
}
