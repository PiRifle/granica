import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const LOAD = '#ff6b45'
const STIFF = '#a970dd'
const OK = '#2e9e6b'
const MUTED = '#87929d'
const EDGE = '#68727e'
const INK = '#17202a'

const X0 = 62
const X1 = 300
const CY = 112
const SEC_X = 382
const SEC_Y = 106
const SEC_R = 36

const D_STRENGTH = 51.4
const D_STIFFNESS = 51.5
const D_SOLID = 55
const D_TUBE = 56
const D_HOLE = 34
const PHI_DOP = 1.5
const PHI_SOLID = 1.15
const PHI_TUBE = 1.24

const clamp01 = (value: number) => Math.max(0, Math.min(1, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}
const lerp = (from: number, to: number, t: number) => from + (to - from) * t
const pl = (value: number, digits = 2) => value.toFixed(digits).replace('.', ',')

function Shaft({
  radius,
  twist,
  hollow,
  innerRatio,
  support,
}: {
  radius: number
  twist: number
  hollow?: boolean
  innerRatio?: number
  support?: boolean
}) {
  const rx = radius * 0.26
  const helix = Array.from({ length: 3 }, (_, lineIndex) => {
    const offset = (lineIndex * Math.PI * 2) / 3
    const points: string[] = []
    for (let step = 0; step <= 30; step += 1) {
      const t = step / 30
      const angle = offset + twist * t
      const x = X0 + (X1 - X0) * t + rx * 0.36 * Math.sin(angle)
      const y = CY - radius * 0.72 * Math.cos(angle)
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
  const markerX = X1 + rx * Math.sin(twist)
  const markerY = CY - radius * Math.cos(twist)

  return (
    <g>
      {support && (
        <g stroke={EDGE} strokeWidth={1.6}>
          <line x1={X0} y1={CY - radius - 8} x2={X0} y2={CY + radius + 8} />
          {Array.from({ length: 7 }, (_, index) => {
            const y = CY - radius + index * ((2 * radius) / 6)
            return <line key={`hatch-${index}`} x1={X0} y1={y} x2={X0 - 9} y2={y - 8} strokeWidth={1.1} />
          })}
        </g>
      )}

      <path
        d={`M ${X0} ${CY - radius} L ${X1} ${CY - radius} L ${X1} ${CY + radius} L ${X0} ${CY + radius} Z`}
        fill="#eef3fa"
        stroke={EDGE}
        strokeWidth={1.3}
      />
      {hollow && (
        <>
          <line
            x1={X0}
            y1={CY - radius * (innerRatio ?? 0)}
            x2={X1}
            y2={CY - radius * (innerRatio ?? 0)}
            stroke={MUTED}
            strokeWidth={1}
            strokeDasharray="5 4"
          />
          <line
            x1={X0}
            y1={CY + radius * (innerRatio ?? 0)}
            x2={X1}
            y2={CY + radius * (innerRatio ?? 0)}
            stroke={MUTED}
            strokeWidth={1}
            strokeDasharray="5 4"
          />
        </>
      )}
      {helix}
      <ellipse cx={X1} cy={CY} rx={rx} ry={radius} fill="#f8fbff" fillOpacity={0.92} stroke={EDGE} strokeWidth={1.3} />
      {hollow && innerRatio != null && (
        <ellipse
          cx={X1}
          cy={CY}
          rx={rx * innerRatio}
          ry={radius * innerRatio}
          fill="#ffffff"
          stroke={MUTED}
          strokeWidth={1.1}
        />
      )}
      <line x1={X1} y1={CY - radius} x2={X1} y2={CY} stroke={MUTED} strokeWidth={0.8} strokeDasharray="2 3" />
      <line x1={X1} y1={CY} x2={markerX} y2={markerY} stroke={LOAD} strokeWidth={2.2} strokeLinecap="round" />
      <circle cx={markerX} cy={markerY} r={2.5} fill={LOAD} />
      <text x={X1} y={CY + radius + 18} textAnchor="middle" fontSize={8.5} fill={EDGE}>
        {support ? 'A' : 'B'}
      </text>
    </g>
  )
}

function TorqueArrow({ radius, p }: { radius: number; p: number }) {
  const r = radius + 26
  const y = CY - r * 0.56
  const path = `M ${X1 - r * 0.84} ${y} A ${r} ${r} 0 0 1 ${X1 + r * 0.84} ${y}`
  return (
    <g>
      <motion.path
        d={path}
        fill="none"
        stroke={LOAD}
        strokeWidth={2.3}
        markerEnd="url(#dft1-torque)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: p, opacity: 1 }}
        transition={{ duration: 0.16, ease: 'linear' }}
      />
      <text x={X1} y={y - 10} textAnchor="middle" fontSize={10} fontWeight={600} fill={LOAD}>
        T
      </text>
    </g>
  )
}

function Section({
  cx,
  cy,
  radius,
  innerRatio = 0,
  stress,
  p,
  label,
}: {
  cx: number
  cy: number
  radius: number
  innerRatio?: number
  stress?: boolean
  p: number
  label: string
}) {
  const rings =
    innerRatio > 0
      ? [0, 0.33, 0.66, 1].map((fraction) => innerRatio + (1 - innerRatio) * fraction)
      : [0.25, 0.5, 0.75, 1]
  const inner = radius * innerRatio
  return (
    <g>
      <circle cx={cx} cy={cy} r={radius} fill="#f0f4fa" stroke={EDGE} strokeWidth={1.5} />
      {stress &&
        rings.map((fraction, index) => (
          <circle
            key={`ring-${index}`}
            cx={cx}
            cy={cy}
            r={radius * fraction}
            fill="none"
            stroke={ACCENT}
            strokeWidth={1}
            strokeOpacity={0.16 + fraction * 0.28}
          />
        ))}
      {stress &&
        Array.from({ length: 8 }, (_, index) => {
          const angle = (index * Math.PI) / 4
          const px = cx + radius * Math.cos(angle)
          const py = cy + radius * Math.sin(angle)
          const length = 7 + 6 * p
          const tx = -Math.sin(angle) * length
          const ty = Math.cos(angle) * length
          return (
            <line
              key={`tau-${index}`}
              x1={px - tx * 0.25}
              y1={py - ty * 0.25}
              x2={px + tx}
              y2={py + ty}
              stroke={ACCENT}
              strokeWidth={1.7}
              markerEnd="url(#dft1-stress)"
            />
          )
        })}
      {innerRatio > 0 && (
        <>
          <circle cx={cx} cy={cy} r={inner} fill="#ffffff" stroke={MUTED} strokeWidth={1.2} />
          <line
            x1={cx - radius - 6}
            y1={cy}
            x2={cx + radius + 6}
            y2={cy}
            stroke={MUTED}
            strokeWidth={0.8}
            strokeDasharray="3 3"
          />
          <line
            x1={cx}
            y1={cy - radius - 6}
            x2={cx}
            y2={cy + radius + 6}
            stroke={MUTED}
            strokeWidth={0.8}
            strokeDasharray="3 3"
          />
        </>
      )}
      <circle cx={cx} cy={cy} r={2} fill={INK} />
      {stress && (
        <text x={cx + radius + 10} y={cy - radius + 4} fontSize={8.5} fill={ACCENT}>
          τ_max
        </text>
      )}
      <text x={cx} y={cy + radius + 17} textAnchor="middle" fontSize={8.5} fill={MUTED}>
        {label}
      </text>
    </g>
  )
}

function DiameterGauge({
  min,
  max,
  ticks,
  value,
  required,
  secondary,
  label,
  unit = 'd',
}: {
  min: number
  max: number
  ticks: number[]
  value: number
  required: number
  secondary?: number
  label: string
  unit?: string
}) {
  const x0 = 96
  const x1 = 430
  const y = 250
  const sx = (number: number) => x0 + ((number - min) / (max - min)) * (x1 - x0)
  return (
    <g>
      <text x={x0} y={y - 44} fontSize={9} fill={INK}>
        {label}
      </text>
      <line x1={x0} y1={y} x2={x1} y2={y} stroke="#c9d0d9" strokeWidth={1.2} />
      {ticks.map((tick) => (
        <g key={`tick-${tick}`}>
          <line x1={sx(tick)} y1={y - 5} x2={sx(tick)} y2={y + 5} stroke="#c9d0d9" strokeWidth={1} />
          <text x={sx(tick)} y={y + 17} textAnchor="middle" fontSize={8} fill={MUTED}>
            {tick}
          </text>
        </g>
      ))}
      <line
        x1={x0}
        y1={y - 13}
        x2={sx(value)}
        y2={y - 13}
        stroke={ACCENT}
        strokeWidth={5}
        strokeLinecap="round"
        strokeOpacity={0.25}
      />
      {secondary != null && (
        <g>
          <line
            x1={sx(secondary)}
            y1={y - 23}
            x2={sx(secondary)}
            y2={y + 8}
            stroke={MUTED}
            strokeWidth={1.2}
            strokeDasharray="4 3"
          />
          <text x={sx(secondary) - 4} y={y - 17} textAnchor="end" fontSize={8} fill={MUTED}>
            {pl(secondary, 1)}
          </text>
        </g>
      )}
      <motion.line
        x1={sx(required)}
        y1={y - 25}
        x2={sx(required)}
        y2={y + 8}
        stroke={LOAD}
        strokeWidth={1.6}
        initial={false}
        animate={{ x1: sx(required), x2: sx(required) }}
        transition={{ duration: 0.12 }}
      />
      <text x={sx(required)} y={y - 30} textAnchor="middle" fontSize={8.5} fill={LOAD}>
        {unit} ≥ {pl(required, 1)} mm
      </text>
      <circle cx={sx(value)} cy={y} r={4.5} fill={ACCENT} stroke="#ffffff" strokeWidth={1.2} />
      <text x={x1} y={y + 31} textAnchor="end" fontSize={8} fill={MUTED}>
        {unit} [mm]
      </text>
    </g>
  )
}

function UtilBars({
  items,
  title,
  p,
}: {
  items: Array<{ label: string; ratio: number; value: string; color: string }>
  title: string
  p: number
}) {
  const x0 = 88
  const barWidth = 326
  return (
    <g>
      <text x={x0} y={206} fontSize={9.5} fontWeight={600} fill={INK}>
        {title}
      </text>
      {items.map((item, index) => {
        const y = 224 + index * 30
        return (
          <g key={item.label}>
            <text x={x0} y={y - 5} fontSize={8.5} fill={item.color}>
              {item.label}
            </text>
            <rect x={x0} y={y} width={barWidth} height={10} rx={5} fill="#e8ecf2" />
            <motion.rect
              x={x0}
              y={y}
              height={10}
              rx={5}
              fill={item.color}
              initial={false}
              animate={{ width: barWidth * item.ratio * p }}
              transition={{ duration: 0.16, ease: 'linear' }}
            />
            <text x={x0 + barWidth * item.ratio + 6} y={y + 9} fontSize={8.5} fill={item.color}>
              {item.value}
            </text>
            <text x={x0 + barWidth + 10} y={y + 9} fontSize={8} fontWeight={700} fill={OK}>
              OK
            </text>
          </g>
        )
      })}
    </g>
  )
}

function AreaBars({ solidRatio, tubeRatio, p }: { solidRatio: number; tubeRatio: number; p: number }) {
  const x0 = 96
  const width = 300
  return (
    <g>
      <text x={x0} y={208} fontSize={9} fontWeight={600} fill={INK}>
        pole przekroju przy zbliżonej pracy
      </text>
      <text x={x0} y={228} fontSize={8.5} fill={EDGE}>
        wał pełny ∅55
      </text>
      <motion.rect
        x={x0}
        y={234}
        height={11}
        rx={5}
        fill={EDGE}
        fillOpacity={0.55}
        initial={false}
        animate={{ width: width * solidRatio * p }}
        transition={{ duration: 0.16, ease: 'linear' }}
      />
      <text x={x0 + width * solidRatio + 6} y={243} fontSize={8.5} fill={EDGE}>
        2376 mm²
      </text>
      <text x={x0} y={257} fontSize={8.5} fill={ACCENT}>
        rura ∅56/∅34
      </text>
      <motion.rect
        x={x0}
        y={263}
        height={11}
        rx={5}
        fill={ACCENT}
        fillOpacity={0.55}
        initial={false}
        animate={{ width: width * tubeRatio * p }}
        transition={{ duration: 0.16, ease: 'linear' }}
      />
      <text x={x0 + width * tubeRatio + 6} y={272} fontSize={8.5} fill={ACCENT}>
        1555 mm²
      </text>
      <text x={x0 + width + 8} y={272} textAnchor="end" fontSize={9} fontWeight={700} fill={OK}>
        −35%
      </text>
    </g>
  )
}

export function FullTorsion1Animation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const p = playing ? smooth(sceneProgress) : 1

  const isModel = metric === 'model'
  const isStrength = metric === 'strength'
  const isStiffness = metric === 'stiffness'
  const isCheck = metric === 'check'
  const isHollow = metric === 'hollow'
  const isCompare = metric === 'compare'

  const diameter = isModel
    ? 52
    : isStrength
      ? lerp(45, D_STRENGTH, p)
      : isStiffness
        ? lerp(45, D_STIFFNESS, p)
        : isHollow
          ? D_TUBE
          : D_SOLID
  const radius = 12 + (diameter - 45) * 1.36
  const innerRatio = isHollow ? lerp(0.28, D_HOLE / D_TUBE, p) : 0

  const twist = isModel ? 0.2 * p : isStiffness ? 0.72 * p : isCheck ? 0.54 : isHollow ? 0.58 : isStrength ? 0.2 * p : 0

  const readout = isStrength
    ? ['d_req = 51,4 mm', 'W_o,min = 26 667 mm³']
    : isStiffness
      ? ['d_req = 51,5 mm', 'J_o,min = 687 500 mm⁴']
      : isCheck
        ? ['d = 55 mm', 'φ = 1,15° ≤ 1,5°']
        : isHollow
          ? ['rura ∅56/∅34', 'φ = 1,24° ≤ 1,5°']
          : isCompare
            ? ['wał pełny ↔ rura', 'ten sam T, inna masa']
            : ['d = ?', 'szukamy średnicy']

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          width={460}
          height={300}
          viewBox="0 0 460 300"
          role="img"
          aria-label="Wał skręcany: moment, skręcanie, dobór średnicy oraz porównanie wału pełnego i rury"
        >
          <defs>
            <marker
              id="dft1-torque"
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
              id="dft1-stress"
              viewBox="0 0 10 10"
              refX={8}
              refY={5}
              markerWidth={4.5}
              markerHeight={4.5}
              orient="auto"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={ACCENT} />
            </marker>
            <marker
              id="dft1-dim"
              viewBox="0 0 10 10"
              refX={8}
              refY={5}
              markerWidth={5}
              markerHeight={5}
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={MUTED} />
            </marker>
          </defs>

          <text x={14} y={18} fontSize={10} fontWeight={700} fill={INK}>
            wał skręcany · dobór przekroju
          </text>
          <text x={14} y={32} fontSize={9} fill={MUTED}>
            T = 1200 N·m · L = 1200 mm · G = 80 GPa
          </text>
          <text x={14} y={46} fontSize={9} fill={MUTED}>
            τ_dop = 45 MPa · φ_dop = 1,5° · α = 0,6
          </text>
          <text x={446} y={18} textAnchor="end" fontSize={9} fontWeight={600} fill={ACCENT}>
            {readout[0]}
          </text>
          <text x={446} y={32} textAnchor="end" fontSize={8.5} fill={MUTED}>
            {readout[1]}
          </text>

          {isCompare ? (
            <g>
              <Section cx={150} cy={112} radius={30} stress p={p} label="wał pełny ∅55" />
              <Section cx={316} cy={112} radius={31} innerRatio={D_HOLE / D_TUBE} stress p={p} label="rura ∅56/∅34" />
              <text x={150} y={179} textAnchor="middle" fontSize={8.2} fill={EDGE}>
                τ = 36,7 MPa · φ = 1,15°
              </text>
              <text x={316} y={179} textAnchor="middle" fontSize={8.2} fill={ACCENT}>
                τ = 40,3 MPa · φ = 1,24°
              </text>
              <AreaBars solidRatio={1} tubeRatio={1555 / 2376} p={p} />
            </g>
          ) : (
            <g>
              <Shaft radius={radius} twist={twist} hollow={isHollow} innerRatio={innerRatio} support />
              <TorqueArrow radius={radius} p={p} />

              <line
                x1={X0}
                y1={CY + radius + 30}
                x2={X1}
                y2={CY + radius + 30}
                stroke={MUTED}
                strokeWidth={1}
                markerStart="url(#dft1-dim)"
                markerEnd="url(#dft1-dim)"
              />
              <text x={(X0 + X1) / 2} y={CY + radius + 43} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                L = 1200 mm
              </text>

              <Section
                cx={SEC_X}
                cy={SEC_Y}
                radius={SEC_R}
                innerRatio={innerRatio}
                stress={isStrength || isCheck || isHollow}
                p={p}
                label={isHollow ? 'rura ∅56/∅34' : isModel ? 'przekrój pełny · d = ?' : `d = ${pl(diameter, 1)} mm`}
              />

              {isStrength && (
                <DiameterGauge
                  min={45}
                  max={60}
                  ticks={[45, 50, 55, 60]}
                  value={diameter}
                  required={D_STRENGTH}
                  label="średnica z warunku wytrzymałości"
                />
              )}
              {isStiffness && (
                <DiameterGauge
                  min={45}
                  max={60}
                  ticks={[45, 50, 55, 60]}
                  value={diameter}
                  required={D_STIFFNESS}
                  secondary={D_STRENGTH}
                  label="średnica z warunku sztywności"
                />
              )}
              {isHollow && (
                <DiameterGauge
                  min={50}
                  max={62}
                  ticks={[50, 55, 60]}
                  value={D_TUBE}
                  required={53.8}
                  label="średnica zewnętrzna rury"
                  unit="D"
                />
              )}
              {isCheck && (
                <UtilBars
                  p={p}
                  title="kontrola wału pełnego po przyjęciu d = 55 mm"
                  items={[
                    { label: 'naprężenie τ_max / τ_dop', ratio: 36.7 / 45, value: '82%', color: ACCENT },
                    { label: 'kąt φ / φ_dop', ratio: PHI_SOLID / PHI_DOP, value: '77%', color: STIFF },
                  ]}
                />
              )}
              {isModel && (
                <text x={230} y={252} textAnchor="middle" fontSize={9} fill={MUTED}>
                  ten sam moment T i długość L · szukamy d oraz D/d
                </text>
              )}
            </g>
          )}
        </svg>
      </div>
    </div>
  )
}
