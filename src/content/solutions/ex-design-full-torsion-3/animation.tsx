import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const LOAD = '#ff6b45'
const STIFF = '#a970dd'
const BAD = '#d64545'
const MUTED = '#87929d'
const EDGE = '#68727e'
const INK = '#17202a'

const X0 = 62
const X1 = 300
const CY = 112
const SEC_X = 382
const SEC_Y = 106
const SEC_R = 38
const INNER_RATIO = 50 / 80

const T_STRENGTH = 3.41
const T_STIFFNESS = 6.34
const PHI_AT_MAX = 1.07
const PHI_DOP = 2

const clamp01 = (value: number) => Math.max(0, Math.min(1, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}
const pl = (value: number, digits = 2) => value.toFixed(digits).replace('.', ',')

function Shaft({
  x0,
  x1,
  cy,
  radius,
  twist,
  innerRatio,
  support,
  kind,
}: {
  x0: number
  x1: number
  cy: number
  radius: number
  twist: number
  innerRatio?: number
  support?: boolean
  kind: 'solid' | 'hollow'
}) {
  const rx = radius * 0.26
  const helix = Array.from({ length: 3 }, (_, lineIndex) => {
    const offset = (lineIndex * Math.PI * 2) / 3
    const points: string[] = []
    for (let step = 0; step <= 30; step += 1) {
      const t = step / 30
      const angle = offset + twist * t
      const x = x0 + (x1 - x0) * t + rx * 0.36 * Math.sin(angle)
      const y = cy - radius * 0.72 * Math.cos(angle)
      points.push(`${x.toFixed(1)},${y.toFixed(1)}`)
    }
    return (
      <polyline
        key={`helix-${lineIndex}`}
        points={points.join(' ')}
        fill="none"
        stroke={ACCENT}
        strokeOpacity={0.22}
        strokeWidth={1.1}
      />
    )
  })
  const markerX = x1 + rx * Math.sin(twist)
  const markerY = cy - radius * Math.cos(twist)

  return (
    <g>
      {support && (
        <g stroke={EDGE} strokeWidth={1.6}>
          <line x1={x0} y1={cy - radius - 7} x2={x0} y2={cy + radius + 7} />
          {Array.from({ length: 6 }, (_, index) => {
            const y = cy - radius + index * ((2 * radius) / 5)
            return <line key={`hatch-${index}`} x1={x0} y1={y} x2={x0 - 8} y2={y - 7} strokeWidth={1.1} />
          })}
        </g>
      )}
      <path
        d={`M ${x0} ${cy - radius} L ${x1} ${cy - radius} L ${x1} ${cy + radius} L ${x0} ${cy + radius} Z`}
        fill="#eef3fa"
        stroke={EDGE}
        strokeWidth={1.3}
      />
      {kind === 'hollow' && innerRatio != null && (
        <>
          <line
            x1={x0}
            y1={cy - radius * innerRatio}
            x2={x1}
            y2={cy - radius * innerRatio}
            stroke={MUTED}
            strokeWidth={1}
            strokeDasharray="5 4"
          />
          <line
            x1={x0}
            y1={cy + radius * innerRatio}
            x2={x1}
            y2={cy + radius * innerRatio}
            stroke={MUTED}
            strokeWidth={1}
            strokeDasharray="5 4"
          />
        </>
      )}
      {helix}
      <ellipse cx={x1} cy={cy} rx={rx} ry={radius} fill="#f8fbff" fillOpacity={0.92} stroke={EDGE} strokeWidth={1.3} />
      {kind === 'hollow' && innerRatio != null && (
        <ellipse
          cx={x1}
          cy={cy}
          rx={rx * innerRatio}
          ry={radius * innerRatio}
          fill="#ffffff"
          stroke={MUTED}
          strokeWidth={1.1}
        />
      )}
      <line x1={x1} y1={cy - radius} x2={x1} y2={cy} stroke={MUTED} strokeWidth={0.8} strokeDasharray="2 3" />
      <line x1={x1} y1={cy} x2={markerX} y2={markerY} stroke={LOAD} strokeWidth={2.2} strokeLinecap="round" />
      <circle cx={markerX} cy={markerY} r={2.4} fill={LOAD} />
    </g>
  )
}

function TorqueArrow({ x, cy, radius, p }: { x: number; cy: number; radius: number; p: number }) {
  const r = radius + 24
  const y = cy - r * 0.58
  return (
    <g>
      <motion.path
        d={`M ${x - r * 0.84} ${y} A ${r} ${r} 0 0 1 ${x + r * 0.84} ${y}`}
        fill="none"
        stroke={LOAD}
        strokeWidth={2.2}
        markerEnd="url(#dft3-torque)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: p, opacity: 1 }}
        transition={{ duration: 0.16, ease: 'linear' }}
      />
      <text x={x} y={y - 9} textAnchor="middle" fontSize={10} fontWeight={600} fill={LOAD}>
        T
      </text>
    </g>
  )
}

function Section({ stress, p }: { stress: boolean; p: number }) {
  const inner = SEC_R * INNER_RATIO
  return (
    <g>
      <circle cx={SEC_X} cy={SEC_Y} r={SEC_R} fill="#f0f4fa" stroke={EDGE} strokeWidth={1.5} />
      {stress &&
        [0, 0.33, 0.66, 1].map((fraction, index) => {
          const r = inner + (SEC_R - inner) * fraction
          return (
            <circle
              key={`ring-${index}`}
              cx={SEC_X}
              cy={SEC_Y}
              r={r}
              fill="none"
              stroke={ACCENT}
              strokeWidth={1}
              strokeOpacity={0.14 + fraction * 0.3}
            />
          )
        })}
      {stress &&
        Array.from({ length: 10 }, (_, index) => {
          const a = (index * Math.PI) / 5
          const px = SEC_X + SEC_R * Math.cos(a)
          const py = SEC_Y + SEC_R * Math.sin(a)
          const length = 6 + 5 * p
          const tx = -Math.sin(a) * length
          const ty = Math.cos(a) * length
          return (
            <line
              key={`tau-${index}`}
              x1={px - tx * 0.25}
              y1={py - ty * 0.25}
              x2={px + tx}
              y2={py + ty}
              stroke={ACCENT}
              strokeWidth={1.7}
              markerEnd="url(#dft3-stress)"
            />
          )
        })}
      <circle cx={SEC_X} cy={SEC_Y} r={inner} fill="#ffffff" stroke={MUTED} strokeWidth={1.2} />
      <line
        x1={SEC_X - SEC_R - 5}
        y1={SEC_Y}
        x2={SEC_X + SEC_R + 5}
        y2={SEC_Y}
        stroke={MUTED}
        strokeWidth={0.8}
        strokeDasharray="3 3"
      />
      <line
        x1={SEC_X}
        y1={SEC_Y - SEC_R - 5}
        x2={SEC_X}
        y2={SEC_Y + SEC_R + 5}
        stroke={MUTED}
        strokeWidth={0.8}
        strokeDasharray="3 3"
      />
      <circle cx={SEC_X} cy={SEC_Y} r={2} fill={INK} />
      {stress && (
        <text x={SEC_X + SEC_R + 9} y={SEC_Y - SEC_R + 4} fontSize={8.5} fill={ACCENT}>
          τ_max
        </text>
      )}
      <text x={SEC_X} y={SEC_Y + SEC_R + 17} textAnchor="middle" fontSize={9} fontWeight={600} fill={ACCENT}>
        rura ∅80/∅50
      </text>
      <text x={SEC_X} y={SEC_Y + SEC_R + 30} textAnchor="middle" fontSize={8.3} fill={MUTED}>
        ścianka 15 mm
      </text>
    </g>
  )
}

function StressProfile() {
  const xr0 = 120
  const xr1 = 390
  const rMax = 45
  const yBase = 272
  const yMax = 55
  const sx = (r: number) => xr0 + (r / rMax) * (xr1 - xr0)
  const sy = (tau: number) => yBase - (tau / 45) * yMax
  const wallFrom = sx(25)
  const wallTo = sx(40)
  return (
    <g>
      <text x={96} y={208} fontSize={9} fontWeight={600} fill={INK}>
        rozkład τ w ściance rury
      </text>
      <line x1={xr0} y1={yBase} x2={xr1 + 6} y2={yBase} stroke={MUTED} strokeWidth={1} />
      <line x1={xr0} y1={yBase} x2={xr0} y2={yBase - yMax - 6} stroke={MUTED} strokeWidth={1} />
      <polygon
        points={`${wallFrom},${yBase} ${wallTo},${yBase} ${wallTo},${sy(40)} ${wallFrom},${sy(25)}`}
        fill={ACCENT}
        fillOpacity={0.14}
      />
      <line x1={xr0} y1={sy(0)} x2={sx(25)} y2={sy(25)} stroke={MUTED} strokeWidth={1.5} strokeDasharray="5 4" />
      <line x1={sx(25)} y1={sy(25)} x2={wallTo} y2={sy(40)} stroke={ACCENT} strokeWidth={2.4} />
      <line x1={wallFrom} y1={yBase} x2={wallFrom} y2={sy(25)} stroke={LOAD} strokeWidth={1} strokeDasharray="3 3" />
      <line x1={wallTo} y1={yBase} x2={wallTo} y2={sy(40)} stroke={LOAD} strokeWidth={1} strokeDasharray="3 3" />
      <circle cx={wallFrom} cy={sy(25)} r={3} fill={LOAD} />
      <circle cx={wallTo} cy={sy(40)} r={3.4} fill={ACCENT} />
      <text x={sx(12)} y={yBase + 13} textAnchor="middle" fontSize={8} fill={MUTED}>
        rdzeń
      </text>
      <text x={(wallFrom + wallTo) / 2} y={yBase + 13} textAnchor="middle" fontSize={8} fill={ACCENT}>
        ścianka 25 → 40 mm
      </text>
      <text x={wallTo + 4} y={sy(40) - 5} fontSize={8.3} fontWeight={600} fill={ACCENT}>
        τ_max = 40 MPa
      </text>
      <text x={xr0 - 4} y={sy(0) + 3} textAnchor="end" fontSize={8} fill={MUTED}>
        0
      </text>
      <text x={xr0 - 4} y={sy(40) + 3} textAnchor="end" fontSize={8} fill={MUTED}>
        40
      </text>
      <text x={xr0 - 16} y={sy(40) - 6} fontSize={7.5} fill={MUTED}>
        MPa
      </text>
      <text x={xr1} y={yBase + 13} textAnchor="end" fontSize={8} fill={MUTED}>
        r [mm]
      </text>
    </g>
  )
}

function TorqueCapacity({ capacity, color, label, p }: { capacity: number; color: string; label: string; p: number }) {
  const x0 = 96
  const x1 = 430
  const y = 252
  const maxT = 7
  const sx = (value: number) => x0 + (value / maxT) * (x1 - x0)
  return (
    <g>
      <text x={x0} y={y - 46} fontSize={9} fontWeight={600} fill={INK}>
        {label}
      </text>
      <rect x={x0} y={y - 7} width={x1 - x0} height={14} rx={7} fill="#f4e9e6" />
      <rect x={x0} y={y - 7} width={x1 - x0} height={14} rx={7} fill={BAD} fillOpacity={0.12} />
      <motion.rect
        x={x0}
        y={y - 7}
        height={14}
        rx={7}
        fill={color}
        fillOpacity={0.45}
        initial={false}
        animate={{ width: (sx(capacity) - x0) * p }}
        transition={{ duration: 0.16, ease: 'linear' }}
      />
      <line x1={sx(capacity)} y1={y - 20} x2={sx(capacity)} y2={y + 13} stroke={color} strokeWidth={1.8} />
      <text x={sx(capacity)} y={y - 25} textAnchor="middle" fontSize={9} fontWeight={600} fill={color}>
        T ≤ {pl(capacity)} kN·m
      </text>
      <text x={x0} y={y + 20} fontSize={8} fill={MUTED}>
        0
      </text>
      <text x={sx(2)} y={y + 20} textAnchor="middle" fontSize={8} fill={MUTED}>
        2
      </text>
      <text x={sx(4)} y={y + 20} textAnchor="middle" fontSize={8} fill={MUTED}>
        4
      </text>
      <text x={sx(6)} y={y + 20} textAnchor="middle" fontSize={8} fill={MUTED}>
        6
      </text>
      <text x={x1} y={y + 20} textAnchor="end" fontSize={8} fill={MUTED}>
        T [kN·m]
      </text>
    </g>
  )
}

function UtilBars({ p }: { p: number }) {
  const x0 = 96
  const width = 300
  const rows = [
    { label: 'wytrzymałość: τ / τ_dop', ratio: 1, display: '40 / 40 MPa', color: ACCENT },
    { label: 'sztywność: φ / φ_dop', ratio: PHI_AT_MAX / PHI_DOP, display: '1,07° / 2°', color: STIFF },
  ]
  return (
    <g>
      <text x={x0} y={208} fontSize={9} fontWeight={600} fill={INK}>
        T_max = 3,41 kN·m — decyduje wytrzymałość
      </text>
      {rows.map((row, index) => {
        const y = 226 + index * 32
        return (
          <g key={row.label}>
            <text x={x0} y={y - 5} fontSize={8.5} fill={row.color}>
              {row.label}
            </text>
            <rect x={x0} y={y} width={width} height={11} rx={5.5} fill="#e8ecf2" />
            <motion.rect
              x={x0}
              y={y}
              height={11}
              rx={5.5}
              fill={row.color}
              fillOpacity={0.6}
              initial={false}
              animate={{ width: width * row.ratio * p }}
              transition={{ duration: 0.16, ease: 'linear' }}
            />
            <text x={x0 + width * row.ratio + 7} y={y + 9} fontSize={8.3} fill={row.color}>
              {row.display}
            </text>
          </g>
        )
      })}
    </g>
  )
}

function AngleBars({ p }: { p: number }) {
  const x0 = 96
  const width = 300
  const maxRatio = 1.15
  const rows = [
    { label: 'L = 1500 mm', ratio: 1.07 / PHI_DOP, display: 'φ = 1,07°', color: ACCENT },
    { label: 'L = 3000 mm', ratio: 2.14 / PHI_DOP, display: 'φ = 2,14° > 2°', color: BAD },
  ]
  const limitX = x0 + (width * 1) / maxRatio
  return (
    <g>
      <text x={x0} y={208} fontSize={9} fontWeight={600} fill={INK}>
        ten sam τ i D, dwa razy dłuższa rura
      </text>
      {rows.map((row, index) => {
        const y = 226 + index * 32
        const barWidth = Math.min(width, (row.ratio / maxRatio) * width) * p
        return (
          <g key={row.label}>
            <text x={x0} y={y - 5} fontSize={8.5} fill={row.color}>
              {row.label}
            </text>
            <rect x={x0} y={y} width={width} height={11} rx={5.5} fill="#e8ecf2" />
            <motion.rect
              x={x0}
              y={y}
              height={11}
              rx={5.5}
              fill={row.color}
              fillOpacity={0.55}
              initial={false}
              animate={{ width: barWidth }}
              transition={{ duration: 0.16, ease: 'linear' }}
            />
            <text x={x0 + barWidth + 7} y={y + 9} fontSize={8.3} fill={row.color}>
              {row.display}
            </text>
          </g>
        )
      })}
      <line x1={limitX} y1={218} x2={limitX} y2={282} stroke={BAD} strokeWidth={1.4} strokeDasharray="5 3" />
      <text x={limitX} y={286} textAnchor="middle" fontSize={8} fill={BAD}>
        φ_dop = 2°
      </text>
    </g>
  )
}

export function FullTorsion3Animation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const p = playing ? smooth(sceneProgress) : 1

  const isModel = metric === 'model'
  const isSection = metric === 'section'
  const isStrength = metric === 'strength'
  const isStiffness = metric === 'stiffness'
  const isCheck = metric === 'check'
  const isInsight = metric === 'insight'

  const twist = isModel
    ? 0.16 * p
    : isSection
      ? 0.12 * p
      : isStrength
        ? 0.36 * p
        : isStiffness
          ? 0.72 * p
          : isCheck
            ? 0.37 * p
            : 0.2 * p

  const readout = isSection
    ? ['J_o = 3 407 625 mm⁴', 'W_o = 85 191 mm³']
    : isStrength
      ? ['T ≤ 3,41 kN·m', 'decyduje τ_dop']
      : isStiffness
        ? ['T ≤ 6,34 kN·m', 'warunek luźniejszy']
        : isCheck
          ? ['T_max = 3,41 kN·m', 'φ = 1,07° < 2°']
          : isInsight
            ? ['φ = 2τL/(GD)', 'kąt rośnie z L/D']
            : ['T = ?', 'szukany moment']

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          width={460}
          height={300}
          viewBox="0 0 460 300"
          role="img"
          aria-label="Rura skręcana o średnicach 80 i 50 milimetrów; animacja rozkładu naprężeń, nośności z wytrzymałości i sztywności oraz kąta skręcenia"
        >
          <defs>
            <marker
              id="dft3-torque"
              viewBox="0 0 10 10"
              refX={8}
              refY={5}
              markerWidth={5}
              markerHeight={5}
              orient="auto"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={LOAD} />
            </marker>
            <marker
              id="dft3-stress"
              viewBox="0 0 10 10"
              refX={8}
              refY={5}
              markerWidth={4.5}
              markerHeight={4.5}
              orient="auto"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={ACCENT} />
            </marker>
          </defs>

          <text x={14} y={18} fontSize={10} fontWeight={700} fill={INK}>
            rura skręcana · z geometrii do momentu
          </text>
          <text x={14} y={32} fontSize={9} fill={MUTED}>
            D = 80 mm · d = 50 mm · L = 1500 mm
          </text>
          <text x={14} y={46} fontSize={9} fill={MUTED}>
            G = 80 GPa · τ_dop = 40 MPa · φ_dop = 2°
          </text>
          <text x={446} y={18} textAnchor="end" fontSize={8.5} fontWeight={600} fill={ACCENT}>
            {readout[0]}
          </text>
          <text x={446} y={32} textAnchor="end" fontSize={8.5} fill={MUTED}>
            {readout[1]}
          </text>

          {isInsight ? (
            <g>
              <Shaft
                x0={62}
                x1={200}
                cy={82}
                radius={13}
                twist={0.34 * p}
                innerRatio={INNER_RATIO}
                support
                kind="hollow"
              />
              <TorqueArrow x={200} cy={82} radius={13} p={p} />
              <text x={240} y={78} fontSize={8.8} fontWeight={600} fill={ACCENT}>
                L = 1500 mm
              </text>
              <text x={240} y={91} fontSize={8.5} fill={MUTED}>
                φ = 1,07°
              </text>

              <Shaft
                x0={62}
                x1={338}
                cy={142}
                radius={13}
                twist={0.68 * p}
                innerRatio={INNER_RATIO}
                support
                kind="hollow"
              />
              <TorqueArrow x={338} cy={142} radius={13} p={p} />
              <text x={378} y={138} fontSize={8.8} fontWeight={600} fill={BAD}>
                L = 3000 mm
              </text>
              <text x={378} y={151} fontSize={8.5} fill={MUTED}>
                φ = 2,14°
              </text>

              <AngleBars p={p} />
            </g>
          ) : (
            <g>
              <Shaft x0={X0} x1={X1} cy={CY} radius={26} twist={twist} innerRatio={INNER_RATIO} support kind="hollow" />
              <TorqueArrow x={X1} cy={CY} radius={26} p={p} />

              <line x1={X0} y1={CY + 44} x2={X1} y2={CY + 44} stroke={MUTED} strokeWidth={1} />
              <text x={(X0 + X1) / 2} y={CY + 57} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                L = 1500 mm
              </text>

              {isModel && (
                <text x={(X0 + X1) / 2} y={214} textAnchor="middle" fontSize={9} fill={MUTED}>
                  znamy D, d i L — szukamy dopuszczalnego T
                </text>
              )}

              <Section stress={isSection || isStrength || isCheck} p={p} />

              {isSection && <StressProfile />}
              {isStrength && (
                <TorqueCapacity capacity={T_STRENGTH} color={ACCENT} label="nośność z warunku wytrzymałości" p={p} />
              )}
              {isStiffness && (
                <TorqueCapacity capacity={T_STIFFNESS} color={STIFF} label="nośność z warunku sztywności" p={p} />
              )}
              {isCheck && <UtilBars p={p} />}
            </g>
          )}
        </svg>
      </div>
    </div>
  )
}
