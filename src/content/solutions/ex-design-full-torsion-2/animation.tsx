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

const SOLID_X = 136
const TUBE_X = 322
const ROW_Y = 118
const R_SOLID = 27.5
const R_TUBE = 35
const R_HOLE = 21.65

const A_SOLID = 2376
const A_TUBE = 2376
const J_SOLID = 898360
const J_TUBE = 2010000
const W_SOLID = 32668
const W_TUBE = 57500
const PHI_DOP = 1.5
const PHI_SOLID = 1.15
const PHI_TUBE = 0.512
const TAU_SOLID = 36.7
const TAU_TUBE = 20.9

const clamp01 = (value: number) => Math.max(0, Math.min(1, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}
const lerp = (from: number, to: number, t: number) => from + (to - from) * t
const pl = (value: number, digits = 1) => value.toFixed(digits).replace('.', ',')

function Section({
  cx,
  radius,
  holeRadius,
  stress,
  angle,
  p,
  label,
  sub,
  dashedHole,
  tone = ACCENT,
}: {
  cx: number
  radius: number
  holeRadius: number
  stress?: boolean
  angle: number
  p: number
  label: string
  sub: string
  dashedHole?: boolean
  tone?: string
}) {
  const markerX = cx + radius * Math.sin(angle)
  const markerY = ROW_Y - radius * Math.cos(angle)
  return (
    <g>
      <circle cx={cx} cy={ROW_Y} r={radius} fill="#f0f4fa" stroke={EDGE} strokeWidth={1.5} />
      {stress &&
        [0.25, 0.5, 0.75, 1].map((fraction, index) => (
          <circle
            key={`ring-${index}`}
            cx={cx}
            cy={ROW_Y}
            r={radius * fraction}
            fill="none"
            stroke={tone}
            strokeWidth={1}
            strokeOpacity={0.15 + fraction * 0.3}
          />
        ))}
      {stress &&
        Array.from({ length: 8 }, (_, index) => {
          const a = (index * Math.PI) / 4
          const px = cx + radius * Math.cos(a)
          const py = ROW_Y + radius * Math.sin(a)
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
              stroke={tone}
              strokeWidth={1.6}
              markerEnd="url(#dft2-stress)"
            />
          )
        })}
      {holeRadius > 0 &&
        (dashedHole ? (
          <circle
            cx={cx}
            cy={ROW_Y}
            r={holeRadius}
            fill="#ffffff"
            fillOpacity={0.6}
            stroke={MUTED}
            strokeWidth={1.2}
            strokeDasharray="5 4"
          />
        ) : (
          <circle cx={cx} cy={ROW_Y} r={holeRadius} fill="#ffffff" stroke={MUTED} strokeWidth={1.2} />
        ))}
      <line x1={cx} y1={ROW_Y - radius} x2={cx} y2={ROW_Y} stroke={MUTED} strokeWidth={0.7} strokeDasharray="2 3" />
      <line x1={cx} y1={ROW_Y} x2={markerX} y2={markerY} stroke={LOAD} strokeWidth={2.1} strokeLinecap="round" />
      <circle cx={markerX} cy={markerY} r={2.4} fill={LOAD} />
      <line
        x1={cx - radius - 4}
        y1={ROW_Y}
        x2={cx + radius + 4}
        y2={ROW_Y}
        stroke={MUTED}
        strokeWidth={0.8}
        strokeDasharray="3 3"
      />
      <line
        x1={cx}
        y1={ROW_Y - radius - 4}
        x2={cx}
        y2={ROW_Y + radius + 4}
        stroke={MUTED}
        strokeWidth={0.8}
        strokeDasharray="3 3"
      />
      <circle cx={cx} cy={ROW_Y} r={2} fill={INK} />
      <text x={cx} y={ROW_Y + radius + 18} textAnchor="middle" fontSize={9} fontWeight={600} fill={tone}>
        {label}
      </text>
      <text x={cx} y={ROW_Y + radius + 31} textAnchor="middle" fontSize={8.5} fill={MUTED}>
        {sub}
      </text>
    </g>
  )
}

function TorqueRing({ cx, radius, p }: { cx: number; radius: number; p: number }) {
  const r = radius + 13
  const start = -2.35
  const end = 1.25
  const x1 = cx + r * Math.cos(start)
  const y1 = ROW_Y + r * Math.sin(start)
  const x2 = cx + r * Math.cos(end)
  const y2 = ROW_Y + r * Math.sin(end)
  return (
    <g>
      <motion.path
        d={`M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`}
        fill="none"
        stroke={LOAD}
        strokeWidth={2}
        markerEnd="url(#dft2-torque)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: p, opacity: 1 }}
        transition={{ duration: 0.16, ease: 'linear' }}
      />
      <text x={cx + r + 8} y={ROW_Y - r + 4} fontSize={9} fontWeight={600} fill={LOAD}>
        T
      </text>
    </g>
  )
}

function Bars({
  items,
  title,
  max,
  note,
  p,
}: {
  items: Array<{ label: string; value: number; display: string; color: string; dashed?: boolean }>
  title: string
  max: number
  note?: string
  p: number
}) {
  const x0 = 96
  const width = 280
  return (
    <g>
      <text x={x0} y={208} fontSize={9} fontWeight={600} fill={INK}>
        {title}
      </text>
      {items.map((item, index) => {
        const y = 220 + index * 28
        const barWidth = (item.value / max) * width * p
        return (
          <g key={item.label}>
            <text x={x0} y={y - 4} fontSize={8.3} fill={item.color}>
              {item.label}
            </text>
            {item.dashed ? (
              <rect
                x={x0}
                y={y}
                width={barWidth}
                height={10}
                rx={5}
                fill="none"
                stroke={item.color}
                strokeWidth={1.2}
                strokeDasharray="5 4"
              />
            ) : (
              <motion.rect
                x={x0}
                y={y}
                height={10}
                rx={5}
                fill={item.color}
                fillOpacity={0.55}
                initial={false}
                animate={{ width: barWidth }}
                transition={{ duration: 0.16, ease: 'linear' }}
              />
            )}
            <text x={x0 + barWidth + 6} y={y + 9} fontSize={8.3} fill={item.color}>
              {item.display}
            </text>
          </g>
        )
      })}
      {note && (
        <text x={x0 + width} y={286} textAnchor="end" fontSize={8.5} fontWeight={600} fill={OK}>
          {note}
        </text>
      )}
    </g>
  )
}

function UtilBars({ p }: { p: number }) {
  const x0 = 96
  const width = 300
  const rows = [
    { label: 'wał pełny · τ / τ_dop', ratio: TAU_SOLID / 45, display: '82%', color: EDGE },
    { label: 'wał pełny · φ / φ_dop', ratio: PHI_SOLID / PHI_DOP, display: '77%', color: EDGE },
    { label: 'rura · τ / τ_dop', ratio: TAU_TUBE / 45, display: '46%', color: ACCENT },
    { label: 'rura · φ / φ_dop', ratio: PHI_TUBE / PHI_DOP, display: '34%', color: ACCENT },
  ]
  return (
    <g>
      <text x={x0} y={204} fontSize={9} fontWeight={600} fill={INK}>
        ta sama masa, ten sam moment — wykorzystanie warunków
      </text>
      {rows.map((row, index) => {
        const y = 214 + index * 20
        return (
          <g key={row.label}>
            <text x={x0} y={y - 4} fontSize={7.8} fill={row.color}>
              {row.label}
            </text>
            <rect x={x0} y={y} width={width} height={8} rx={4} fill="#e8ecf2" />
            <motion.rect
              x={x0}
              y={y}
              height={8}
              rx={4}
              fill={row.color}
              fillOpacity={0.6}
              initial={false}
              animate={{ width: width * row.ratio * p }}
              transition={{ duration: 0.16, ease: 'linear' }}
            />
            <text x={x0 + width + 7} y={y + 7.5} fontSize={8} fontWeight={600} fill={row.color}>
              {row.display}
            </text>
          </g>
        )
      })}
    </g>
  )
}

export function FullTorsion2Animation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const p = playing ? smooth(sceneProgress) : 1

  const isModel = metric === 'model'
  const isGeometry = metric === 'geometry'
  const isInertia = metric === 'inertia'
  const isCheck = metric === 'check'
  const isTradeoff = metric === 'tradeoff'

  const holeDiameter = isGeometry ? lerp(0, 43.3, p) : isModel ? 0 : 43.3
  const holeRadius = (holeDiameter / 70) * R_TUBE

  const solidAngle = isCheck ? 0.55 * p : isModel ? 0.18 * p : isInertia ? 0.32 * p : isGeometry ? 0.16 * p : 0.32 * p
  const tubeAngle = isCheck ? 0.24 * p : isModel ? 0.08 * p : isInertia ? 0.14 * p : isGeometry ? 0.06 * p : 0.14 * p

  const readout = isGeometry
    ? ['d = 43,3 mm', 'A = 2376 mm²']
    : isInertia
      ? ['J_o rury = 2,01·10⁶ mm⁴', 'J_o wału = 898 360 mm⁴']
      : isCheck
        ? ['τ: 20,9 vs 36,7 MPa', 'φ: 0,512° vs 1,15°']
        : isTradeoff
          ? ['W_o: 57 500 vs 32 668', 'cena: większe ∅70']
          : ['A_rury = A_wału', 'szukamy d rury']

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          width={460}
          height={300}
          viewBox="0 0 460 300"
          role="img"
          aria-label="Porównanie wału pełnego o średnicy 55 milimetrów i rury o średnicy zewnętrznej 70 milimetrów przy tej samej masie; animacja otworu, momentu bezwładności, naprężeń i kąta skręcenia"
        >
          <defs>
            <marker
              id="dft2-stress"
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
              id="dft2-torque"
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

          <text x={14} y={18} fontSize={10} fontWeight={700} fill={INK}>
            ta sama masa · ten sam moment
          </text>
          <text x={14} y={32} fontSize={9} fill={MUTED}>
            wał ∅55 · rura ∅70 · T = 1200 N·m · L = 1200 mm
          </text>
          <text x={14} y={46} fontSize={9} fill={MUTED}>
            G = 80 GPa · τ_dop = 45 MPa · φ_dop = 1,5°
          </text>
          <text x={446} y={18} textAnchor="end" fontSize={8.5} fontWeight={600} fill={ACCENT}>
            {readout[0]}
          </text>
          <text x={446} y={32} textAnchor="end" fontSize={8.5} fill={MUTED}>
            {readout[1]}
          </text>

          <Section
            cx={SOLID_X}
            radius={R_SOLID}
            holeRadius={0}
            angle={solidAngle}
            p={p}
            stress={isCheck}
            label="wał pełny ∅55"
            sub={`φ = ${pl(PHI_SOLID, 2)}°`}
            tone={EDGE}
          />
          <Section
            cx={TUBE_X}
            radius={R_TUBE}
            holeRadius={isModel ? R_HOLE * 0.7 : holeRadius}
            dashedHole={isModel}
            angle={tubeAngle}
            p={p}
            stress={isCheck}
            label={isModel ? 'rura ∅70 · d = ?' : 'rura ∅70/∅43,3'}
            sub={isModel ? 'szukana średnica wewnętrzna' : `φ = ${pl(PHI_TUBE, 3)}°`}
          />
          <TorqueRing cx={TUBE_X} radius={R_TUBE} p={p} />

          {isModel && (
            <Bars
              p={p}
              title="równa masa: pola przekrojów muszą być równe"
              max={A_SOLID}
              items={[
                { label: 'wał pełny', value: A_SOLID, display: '2376 mm²', color: EDGE },
                {
                  label: 'rura — średnica wewnętrzna do wyznaczenia',
                  value: A_SOLID,
                  display: '= 2376 mm²',
                  color: ACCENT,
                  dashed: true,
                },
              ]}
            />
          )}
          {isGeometry && (
            <Bars
              p={p}
              title="otwór dobrany z równości pól"
              max={A_SOLID}
              items={[
                { label: 'wał pełny', value: A_SOLID, display: '2376 mm²', color: EDGE },
                { label: 'rura ∅70/∅43,3', value: A_TUBE, display: '2376 mm²', color: ACCENT },
              ]}
              note="masa bez zmian"
            />
          )}
          {isInertia && (
            <Bars
              p={p}
              title="biegunowy moment bezwładności"
              max={J_TUBE}
              items={[
                { label: 'wał pełny', value: J_SOLID, display: '898 360 mm⁴', color: EDGE },
                { label: 'rura', value: J_TUBE, display: '2 010 000 mm⁴', color: ACCENT },
              ]}
              note="2,24× większy J_o"
            />
          )}
          {isCheck && <UtilBars p={p} />}
          {isTradeoff && (
            <Bars
              p={p}
              title="wskaźnik wytrzymałości a średnica zewnętrzna"
              max={W_TUBE}
              items={[
                { label: 'wał pełny ∅55', value: W_SOLID, display: '32 668 mm³', color: EDGE },
                { label: 'rura ∅70/∅43,3', value: W_TUBE, display: '57 500 mm³', color: ACCENT },
              ]}
              note="większe D zajmuje więcej miejsca"
            />
          )}

          {isTradeoff && (
            <g>
              <circle
                cx={TUBE_X}
                cy={ROW_Y}
                r={R_TUBE + 7}
                fill="none"
                stroke={LOAD}
                strokeWidth={1.1}
                strokeDasharray="6 4"
              />
              <text x={TUBE_X} y={ROW_Y - R_TUBE - 12} textAnchor="middle" fontSize={8.5} fill={LOAD}>
                gabaryt ∅70
              </text>
            </g>
          )}
        </svg>
      </div>
    </div>
  )
}
