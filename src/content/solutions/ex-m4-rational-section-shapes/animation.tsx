import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const LOAD = '#ff6b45'
const MUTED = '#87929d'
const INK = '#17202a'

const LEFT = 125
const RIGHT = 325
const CY = 152
const R = 72
const INNER = R * 0.9
const PX_PER_MM = R / 50

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}

function Shape({ x, tube, faded = false }: { x: number; tube: boolean; faded?: boolean }) {
  return (
    <g opacity={faded ? 0.45 : 1}>
      <circle cx={x} cy={CY} r={R} fill={tube ? '#e8edfc' : '#f2f5fa'} stroke="#7d8fa5" strokeWidth={1.6} />
      {tube && <circle cx={x} cy={CY} r={INNER} fill="#fff" stroke="#87929d" strokeWidth={1.2} />}
      <circle cx={x} cy={CY} r={2} fill={INK} />
    </g>
  )
}

function Axis() {
  return (
    <g>
      <line x1={42} y1={CY} x2={418} y2={CY} stroke={LOAD} strokeWidth={1.3} strokeDasharray="6 4" />
      <text x={44} y={CY - 7} fontSize={8.5} fill={LOAD}>
        oś obojętna
      </text>
    </g>
  )
}

function WeightRings({ x, tube, p }: { x: number; tube: boolean; p: number }) {
  const ratios = tube ? [0.86, 0.91, 0.96, 0.995] : [0.2, 0.4, 0.6, 0.8, 0.98]
  return (
    <g>
      {ratios.map((ratio, index) => {
        const weight = ratio * ratio
        const reveal = clamp01((p - index * 0.08) / 0.4)
        return (
          <motion.circle
            key={`${tube ? 't' : 's'}-${ratio}`}
            cx={x}
            cy={CY}
            r={R * ratio}
            fill="none"
            stroke={ACCENT}
            strokeWidth={1 + 4 * weight}
            initial={{ opacity: 0 }}
            animate={{ opacity: reveal * (0.16 + 0.5 * weight) }}
            transition={{ duration: 0.2 }}
          />
        )
      })}
    </g>
  )
}

function StressArrows({ x, tube, max, p }: { x: number; tube: boolean; max: number; p: number }) {
  const rows = tube ? [-0.95, -0.88, 0.88, 0.95] : [-0.84, -0.56, -0.28, 0.28, 0.56, 0.84]
  return (
    <g>
      <line x1={x} y1={CY - R - 4} x2={x} y2={CY + R + 4} stroke="#c9d0d9" strokeWidth={1} />
      {rows.map((ratio, index) => {
        const y = CY + ratio * R
        const length = max * Math.abs(ratio)
        const reveal = clamp01((p - index * 0.04) / 0.5)
        const color = ratio < 0 ? ACCENT : LOAD
        return (
          <motion.line
            key={ratio}
            x1={x}
            y1={y}
            x2={x}
            y2={y}
            stroke={color}
            strokeWidth={1.8}
            markerEnd={`url(#rs1-arrow-${ratio < 0 ? 'c' : 't'})`}
            initial={{ x2: x }}
            animate={{ x2: x + length * reveal }}
            transition={{ duration: 0.15 }}
          />
        )
      })}
      <text x={x + 3} y={CY - R - 8} fontSize={8.5} fill={MUTED}>
        σ(y)
      </text>
    </g>
  )
}

function CDimension({ x, label }: { x: number; label: string }) {
  const middle = CY - R / 2
  return (
    <g stroke={MUTED} fill={MUTED}>
      <line x1={x} y1={CY} x2={x} y2={CY - R} strokeWidth={1.1} />
      <line x1={x - 4} y1={CY} x2={x + 4} y2={CY} strokeWidth={1.1} />
      <line x1={x - 4} y1={CY - R} x2={x + 4} y2={CY - R} strokeWidth={1.1} />
      <text
        x={x - 4}
        y={middle}
        textAnchor="middle"
        fontSize={8}
        stroke="none"
        transform={`rotate(-90 ${x - 4} ${middle})`}
      >
        {label}
      </text>
    </g>
  )
}

export function RationalSectionShapesAnimation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const p = playing ? smooth(sceneProgress) : 1
  const isModel = metric === 'model'
  const isDistribution = metric === 'distribution'
  const isArea = metric === 'area'
  const isInertia = metric === 'Ix'
  const isStress = metric === 'stress'
  const isEfficiency = metric === 'efficiency'

  const note =
    metric === 'model'
      ? 'wspólna średnica zewnętrzna i wspólna oś obojętna'
      : metric === 'distribution'
        ? 'ciemniejsze pierścienie oznaczają większy wkład r² dA'
        : metric === 'area'
          ? 'rdzeń o d = 90 mm to około 81% pola przekroju pełnego'
          : metric === 'Ix'
            ? 'materiał przy osi ma mały wkład; rura zachowuje materiał na obrzeżu'
            : metric === 'stress'
              ? 'M = 5 kN·m; naprężenie rośnie liniowo od osi obojętnej'
              : 'i = √(I/A) — promień bezwładności równoważnego materiału'

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 300"
          role="img"
          aria-label="Porównanie pełnego przekroju kołowego i rury o tej samej średnicy zewnętrznej. Animacja pokazuje rozkład materiału, pola, moment bezwładności i naprężenia względem osi obojętnej."
        >
          <defs>
            <marker
              id="rs1-arrow-c"
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
              id="rs1-arrow-t"
              viewBox="0 0 10 10"
              refX={8}
              refY={5}
              markerWidth={5}
              markerHeight={5}
              orient="auto"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={LOAD} />
            </marker>
            <pattern id="rs1-core" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="8" stroke={LOAD} strokeWidth="2" opacity="0.45" />
            </pattern>
          </defs>

          <Axis />

          <motion.g
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45 }}
            style={{ transformOrigin: `${LEFT}px ${CY}px` }}
          >
            <Shape x={LEFT} tube={false} />
          </motion.g>
          <motion.g
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, delay: 0.08 }}
            style={{ transformOrigin: `${RIGHT}px ${CY}px` }}
          >
            <Shape x={RIGHT} tube />
          </motion.g>

          {(isDistribution || isInertia) && (
            <>
              <WeightRings x={LEFT} tube={false} p={p} />
              <WeightRings x={RIGHT} tube p={p} />
              <text x={LEFT} y={CY + 26} textAnchor="middle" fontSize={8} fill={MUTED}>
                mały r
              </text>
              <text x={LEFT + 42} y={CY - 44} textAnchor="middle" fontSize={8} fill={MUTED}>
                duże r
              </text>
              <text x={RIGHT} y={CY + 26} textAnchor="middle" fontSize={8} fill={MUTED}>
                tylko pierścień
              </text>
            </>
          )}

          {isArea && (
            <>
              <motion.circle
                cx={LEFT}
                cy={CY}
                r={INNER}
                fill="url(#rs1-core)"
                stroke={LOAD}
                strokeWidth={1.5}
                strokeDasharray="5 4"
                initial={{ opacity: 0, scale: 1.12 }}
                animate={{ opacity: playing ? smooth(sceneProgress / 0.45) : 1, scale: 1 }}
                transition={{ duration: 0.35 }}
                style={{ transformOrigin: `${LEFT}px ${CY}px` }}
              />
              <text x={LEFT} y={CY + 22} textAnchor="middle" fontSize={8.5} fill={LOAD}>
                rdzeń usunięty
              </text>
              <motion.circle
                cx={RIGHT}
                cy={CY}
                r={(R + INNER) / 2}
                fill="none"
                stroke={ACCENT}
                strokeWidth={9}
                initial={{ opacity: 0 }}
                animate={{ opacity: playing ? smooth(sceneProgress / 0.5) * 0.38 : 0.38 }}
                transition={{ duration: 0.3 }}
              />
            </>
          )}

          {isInertia && (
            <>
              <line
                x1={RIGHT}
                y1={CY}
                x2={RIGHT + R * 0.98}
                y2={CY - R * 0.98}
                stroke={ACCENT}
                strokeWidth={1.4}
                markerEnd="url(#rs1-arrow-c)"
              />
              <text x={RIGHT + 30} y={CY - 44} fontSize={8.5} fill={ACCENT}>
                r² dA
              </text>
              <text x={LEFT} y={CY - 40} textAnchor="middle" fontSize={8} fill={MUTED}>
                mały wkład
              </text>
            </>
          )}

          {isStress && (
            <>
              <StressArrows x={LEFT} tube={false} max={30} p={p} />
              <StressArrows x={RIGHT} tube max={44} p={p} />
            </>
          )}

          {isEfficiency && (
            <>
              <motion.circle
                cx={LEFT}
                cy={CY}
                r={Math.sqrt(625) * PX_PER_MM}
                fill="none"
                stroke={ACCENT}
                strokeWidth={1.6}
                strokeDasharray="5 4"
                initial={{ scale: 0 }}
                animate={{ scale: playing ? Math.max(0.001, p) : 1 }}
                transition={{ duration: 0.45 }}
                style={{ transformOrigin: `${LEFT}px ${CY}px` }}
              />
              <motion.circle
                cx={RIGHT}
                cy={CY}
                r={Math.sqrt(1131) * PX_PER_MM}
                fill="none"
                stroke={ACCENT}
                strokeWidth={1.6}
                strokeDasharray="5 4"
                initial={{ scale: 0 }}
                animate={{ scale: playing ? Math.max(0.001, p) : 1 }}
                transition={{ duration: 0.45, delay: 0.1 }}
                style={{ transformOrigin: `${RIGHT}px ${CY}px` }}
              />
              <text x={LEFT} y={CY - 42} textAnchor="middle" fontSize={8.5} fill={ACCENT}>
                i_p = 25 mm
              </text>
              <text x={RIGHT} y={CY - 56} textAnchor="middle" fontSize={8.5} fill={ACCENT}>
                i_r = 33,6 mm
              </text>
            </>
          )}

          {isModel && (
            <>
              <CDimension x={LEFT - R - 10} label="c = 50" />
              <CDimension x={RIGHT + R + 10} label="c = 50" />
            </>
          )}

          <text x={LEFT} y={42} textAnchor="middle" fontSize={10} fontWeight={700} fill={INK}>
            przekrój pełny
          </text>
          <text x={LEFT} y={57} textAnchor="middle" fontSize={8.5} fill={MUTED}>
            D = 100 mm
          </text>
          <text x={RIGHT} y={42} textAnchor="middle" fontSize={10} fontWeight={700} fill={INK}>
            rura
          </text>
          <text x={RIGHT} y={57} textAnchor="middle" fontSize={8.5} fill={MUTED}>
            D = 100 mm, d = 90 mm
          </text>

          {isArea && (
            <>
              <text x={LEFT} y={242} textAnchor="middle" fontSize={8.5} fill={INK}>
                A_p = 7854 mm²
              </text>
              <text x={RIGHT} y={242} textAnchor="middle" fontSize={8.5} fill={INK}>
                A_r = 1492 mm²
              </text>
            </>
          )}

          {isInertia && (
            <>
              <text x={LEFT} y={242} textAnchor="middle" fontSize={8.5} fill={INK}>
                I_p = 4,909·10⁶ mm⁴
              </text>
              <text x={RIGHT} y={242} textAnchor="middle" fontSize={8.5} fill={INK}>
                I_r = 1,688·10⁶ mm⁴
              </text>
            </>
          )}

          {isStress && (
            <>
              <text x={LEFT} y={242} textAnchor="middle" fontSize={8.5} fill={INK}>
                σ_p ≈ 50,9 MPa
              </text>
              <text x={RIGHT} y={242} textAnchor="middle" fontSize={8.5} fill={INK}>
                σ_r ≈ 148,1 MPa
              </text>
            </>
          )}

          {isEfficiency && (
            <>
              <text x={LEFT} y={242} textAnchor="middle" fontSize={8.5} fill={INK}>
                I/A = 625 mm²
              </text>
              <text x={RIGHT} y={242} textAnchor="middle" fontSize={8.5} fill={INK}>
                I/A ≈ 1131 mm²
              </text>
            </>
          )}

          {isModel && (
            <>
              <text x={LEFT} y={242} textAnchor="middle" fontSize={8.5} fill={INK}>
                c = 50 mm
              </text>
              <text x={RIGHT} y={242} textAnchor="middle" fontSize={8.5} fill={INK}>
                ścianka t = 5 mm
              </text>
            </>
          )}

          <text x={LEFT} y={260} textAnchor="middle" fontSize={8.5} fill={MUTED}>
            pełny
          </text>
          <text x={RIGHT} y={260} textAnchor="middle" fontSize={8.5} fill={MUTED}>
            rurowy
          </text>

          <text x={230} y={286} textAnchor="middle" fontSize={8} fill={MUTED}>
            {note}
          </text>
        </svg>
      </div>
    </div>
  )
}
