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

const CY = 148
const R = 80
const RI = 50

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}

function TorqueArrow({ cx, cy, radius, p }: { cx: number; cy: number; radius: number; p: number }) {
  const r = radius + 18
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
        strokeWidth={2.4}
        markerEnd="url(#hst1-load)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: p, opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
      <text x={endX + 10} y={endY + 4} fontSize={9.5} fontWeight={600} fill={LOAD}>
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
  ghostRatio,
  ghostLabel,
}: {
  x0: number
  y0: number
  width: number
  height: number
  innerRatio: number
  p: number
  maxLabel: string
  innerLabel?: string
  ghostRatio?: number
  ghostLabel?: string
}) {
  const topX = x0 + width
  const topY = y0 - height
  const innerX = x0 + width * innerRatio
  const innerY = y0 - height * innerRatio
  const band = `M ${innerX} ${y0} L ${topX} ${y0} L ${topX} ${topY} L ${innerX} ${innerY} Z`
  const dashed = `M ${x0} ${y0} L ${topX} ${topY}`
  const solid = `M ${innerX} ${innerY} L ${topX} ${topY}`
  return (
    <g>
      <line x1={x0} y1={y0} x2={topX + 12} y2={y0} stroke={STROKE} strokeWidth={1.1} />
      <line x1={x0} y1={y0 + 8} x2={x0} y2={topY - 10} stroke={STROKE} strokeWidth={1.1} />
      <path d={band} fill={ACCENT} fillOpacity={0.1 * p} />
      <motion.path
        d={dashed}
        fill="none"
        stroke={MUTED}
        strokeWidth={1.1}
        strokeDasharray="4 4"
        initial={{ opacity: 0 }}
        animate={{ opacity: p }}
        transition={{ duration: 0.2 }}
      />
      <motion.path
        d={solid}
        fill="none"
        stroke={ACCENT}
        strokeWidth={2.4}
        markerEnd="url(#hst1-stress)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: p }}
        transition={{ duration: 0.2 }}
      />
      {ghostRatio != null && (
        <motion.line
          x1={x0}
          y1={y0}
          x2={topX}
          y2={y0 - height * ghostRatio}
          stroke={LOAD}
          strokeWidth={1.4}
          strokeDasharray="5 4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 * p }}
          transition={{ duration: 0.2 }}
        />
      )}
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
      {ghostLabel && (
        <text x={topX - 2} y={y0 - height * (ghostRatio ?? 0) - 6} textAnchor="end" fontSize={8} fill={LOAD}>
          {ghostLabel}
        </text>
      )}
      <text x={x0 - 4} y={y0 + 14} textAnchor="middle" fontSize={8} fill={MUTED}>
        0
      </text>
      <text x={topX} y={y0 + 14} textAnchor="middle" fontSize={8} fill={MUTED}>
        D/2
      </text>
    </g>
  )
}

export function HollowTorsionAnimation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const p = playing ? smooth(sceneProgress) : 1
  const isModel = metric === 'model'
  const isCore = metric === 'core'
  const isStress = metric === 'stress'
  const isCheck = metric === 'check'
  const isEfficiency = metric === 'efficiency'

  const holeRadius = isCore ? RI * smooth(p) : RI

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 300"
          role="img"
          aria-label="Wał rurowy o średnicach 80 i 50 mm. Animacja pokazuje wydrążenie rdzenia, liniowy rozkład naprężeń stycznych oraz oszczędność materiału."
        >
          <defs>
            <marker id="hst1-load" viewBox="0 0 10 10" refX={8} refY={5} markerWidth={6} markerHeight={6} orient="auto">
              <path d="M0 0 L10 5 L0 10 Z" fill={LOAD} />
            </marker>
            <marker
              id="hst1-stress"
              viewBox="0 0 10 10"
              refX={8}
              refY={5}
              markerWidth={5}
              markerHeight={5}
              orient="auto"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={ACCENT} />
            </marker>
            <pattern id="hst1-core" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="7" stroke={LOAD} strokeWidth="2" opacity="0.55" />
            </pattern>
          </defs>

          {isModel && (
            <motion.g
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45 }}
              style={{ transformOrigin: `200px ${CY}px` }}
            >
              <circle cx={200} cy={CY} r={R} fill={FILL} stroke={STROKE} strokeWidth={1.7} />
              <circle cx={200} cy={CY} r={RI} fill="#fff" stroke={STROKE} strokeWidth={1.4} />
              <line x1={64} y1={CY} x2={336} y2={CY} stroke={LOAD} strokeWidth={1.2} strokeDasharray="6 5" />
              <line x1={200} y1={CY - R - 26} x2={200} y2={CY + R + 26} stroke="#c9d0d9" strokeWidth={1} />
              <TorqueArrow cx={200} cy={CY} radius={R} p={p} />
              <line x1={200 - R} y1={46} x2={200 + R} y2={46} stroke={MUTED} strokeWidth={1.1} />
              <line x1={200 - R} y1={40} x2={200 - R} y2={52} stroke={MUTED} strokeWidth={1.1} />
              <line x1={200 + R} y1={40} x2={200 + R} y2={52} stroke={MUTED} strokeWidth={1.1} />
              <text x={200} y={38} textAnchor="middle" fontSize={9.5} fontWeight={600} fill={INK}>
                D = 80 mm
              </text>
              <line x1={200 - RI} y1={244} x2={200 + RI} y2={244} stroke={MUTED} strokeWidth={1.1} />
              <line x1={200 - RI} y1={238} x2={200 - RI} y2={250} stroke={MUTED} strokeWidth={1.1} />
              <line x1={200 + RI} y1={238} x2={200 + RI} y2={250} stroke={MUTED} strokeWidth={1.1} />
              <text x={200} y={262} textAnchor="middle" fontSize={9.5} fill={INK}>
                d = 50 mm
              </text>
              <circle cx={200} cy={CY} r={2.6} fill={INK} />
              <text x={208} y={CY - 6} fontSize={8.5} fill={MUTED}>
                oś
              </text>
            </motion.g>
          )}

          {isCore && (
            <g>
              <circle cx={200} cy={CY} r={R} fill={SOLID} stroke={STROKE} strokeWidth={1.7} />
              <motion.circle
                cx={200}
                cy={CY}
                r={holeRadius}
                fill="#fff"
                stroke={STROKE}
                strokeWidth={1.4}
                initial={false}
              />
              <motion.circle
                cx={200}
                cy={CY}
                r={RI}
                fill="url(#hst1-core)"
                stroke={LOAD}
                strokeWidth={1.3}
                strokeDasharray="5 4"
                initial={false}
                animate={{ opacity: 0.8 * (1 - smooth(p)) }}
                transition={{ duration: 0.15 }}
              />
              <text x={200} y={CY + 4} textAnchor="middle" fontSize={9.5} fontWeight={600} fill={LOAD}>
                rdzeń ∅50
              </text>
              <line x1={200 - R} y1={46} x2={200 + R} y2={46} stroke={MUTED} strokeWidth={1.1} />
              <line x1={200 - R} y1={40} x2={200 - R} y2={52} stroke={MUTED} strokeWidth={1.1} />
              <line x1={200 + R} y1={40} x2={200 + R} y2={52} stroke={MUTED} strokeWidth={1.1} />
              <text x={200} y={38} textAnchor="middle" fontSize={9.5} fontWeight={600} fill={INK}>
                D = 80 mm
              </text>
              <line x1={200 - RI} y1={244} x2={200 + RI} y2={244} stroke={LOAD} strokeWidth={1.2} />
              <line x1={200 - RI} y1={238} x2={200 - RI} y2={250} stroke={LOAD} strokeWidth={1.2} />
              <line x1={200 + RI} y1={238} x2={200 + RI} y2={250} stroke={LOAD} strokeWidth={1.2} />
              <text x={200} y={262} textAnchor="middle" fontSize={9.5} fill={LOAD}>
                d = 50 mm
              </text>
              <text x={200} y={282} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                J_o = J_D − J_d
              </text>
            </g>
          )}

          {isStress && (
            <>
              <circle cx={125} cy={CY} r={68} fill={FILL} stroke={STROKE} strokeWidth={1.6} />
              <circle cx={125} cy={CY} r={42.5} fill="#fff" stroke={STROKE} strokeWidth={1.3} />
              <circle cx={125} cy={CY} r={2.4} fill={INK} />
              <line x1={54} y1={CY} x2={196} y2={CY} stroke={LOAD} strokeWidth={1.1} strokeDasharray="5 4" />
              <TorqueArrow cx={125} cy={CY} radius={68} p={p} />
              <text x={125} y={38} textAnchor="middle" fontSize={9} fill={INK}>
                rura ∅80/∅50
              </text>
              <text x={125} y={268} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                materiał tylko w pierścieniu
              </text>
              <Profile
                x0={250}
                y0={240}
                width={95}
                height={95}
                innerRatio={RI / R}
                p={p}
                maxLabel="τ_max = 29,4 MPa"
                innerLabel="τ(d/2) = 18,4 MPa"
              />
              <text x={250} y={274} fontSize={8.5} fill={MUTED}>
                τ(r) = T·r/J_o rośnie liniowo z r
              </text>
            </>
          )}

          {isCheck && (
            <>
              <circle cx={125} cy={CY} r={68} fill={FILL} stroke={STROKE} strokeWidth={1.6} />
              <circle cx={125} cy={CY} r={42.5} fill="#fff" stroke={STROKE} strokeWidth={1.3} />
              <circle cx={125} cy={CY} r={2.4} fill={INK} />
              <line x1={54} y1={CY} x2={196} y2={CY} stroke={LOAD} strokeWidth={1.1} strokeDasharray="5 4" />
              <motion.circle
                cx={193}
                cy={CY}
                r={6}
                fill="none"
                stroke={LOAD}
                strokeWidth={1.8}
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: p > 0.4 ? 1 : 0.6, opacity: p > 0.4 ? 1 : 0 }}
                transition={{ duration: 0.2 }}
                style={{ transformOrigin: `193px ${CY}px` }}
              />
              <text x={125} y={38} textAnchor="middle" fontSize={9} fill={INK}>
                punkt maksymalnego naprężenia
              </text>
              <text x={125} y={268} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                W_o = J_o/(D/2) = 85 191 mm³
              </text>
              <Profile
                x0={250}
                y0={240}
                width={95}
                height={95}
                innerRatio={RI / R}
                p={p}
                maxLabel="τ_max = 29,4 MPa"
                ghostRatio={24.9 / 29.4}
                ghostLabel="wał pełny 24,9"
              />
              <text x={250} y={274} fontSize={8.5} fill={MUTED}>
                przy tej samej średnicy rura jest słabsza
              </text>
            </>
          )}

          {isEfficiency && (
            <>
              <motion.g initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
                <circle cx={128} cy={CY} r={58} fill={SOLID} stroke={STROKE} strokeWidth={1.5} />
                <text x={128} y={50} textAnchor="middle" fontSize={9.5} fontWeight={600} fill={INK}>
                  wał pełny ∅80
                </text>
                <text x={128} y={270} textAnchor="middle" fontSize={9} fill={MUTED}>
                  A_0 = 5 027 mm²
                </text>
              </motion.g>
              <motion.g
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.08 }}
              >
                <circle cx={330} cy={CY} r={58} fill={FILL} stroke={STROKE} strokeWidth={1.5} />
                <motion.circle
                  cx={330}
                  cy={CY}
                  r={36.25}
                  fill="url(#hst1-core)"
                  stroke={LOAD}
                  strokeWidth={1.3}
                  strokeDasharray="5 4"
                  initial={false}
                  animate={{ opacity: 0.75 * p }}
                  transition={{ duration: 0.2 }}
                />
                <text x={330} y={50} textAnchor="middle" fontSize={9.5} fontWeight={600} fill={INK}>
                  rura ∅80/∅50
                </text>
                <text x={330} y={270} textAnchor="middle" fontSize={9} fill={MUTED}>
                  A = 3 063 mm²
                </text>
                <text x={330} y={CY + 4} textAnchor="middle" fontSize={8.5} fontWeight={600} fill={LOAD}>
                  rdzeń usunięty
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
                mniej materiału o 39%
              </motion.text>
            </>
          )}
        </svg>
      </div>
    </div>
  )
}
