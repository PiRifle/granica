import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const BLUE = '#4f6df5'
const GREEN = '#2e9e6b'
const ORANGE = '#ff6b45'
const VIOLET = '#a970dd'
const MUTED = '#87929d'
const EDGE = '#68727e'
const INK = '#17202a'
const FILL = '#f3f6fc'
const LIGHT = '#c9d0d9'

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}
const rad = (degrees: number) => (degrees * Math.PI) / 180

const CX = 132
const CY = 150
const HALF = 46
const THETA_P = 71.565
const AVG = 20
const A = -40
const TAU = 30
const S1 = 70
const S2 = -30

function Arrow({
  x1,
  y1,
  x2,
  y2,
  color,
  width = 1.8,
  opacity = 1,
}: {
  x1: number
  y1: number
  x2: number
  y2: number
  color: string
  width?: number
  opacity?: number
}) {
  const angle = Math.atan2(y2 - y1, x2 - x1)
  const length = Math.hypot(x2 - x1, y2 - y1)
  if (length < 0.6) return null
  const head = Math.min(5.2, length * 0.55)
  const wing = Math.min(2.6, length * 0.26)
  const baseX = x2 - head * Math.cos(angle)
  const baseY = y2 - head * Math.sin(angle)
  const lx = baseX - wing * Math.sin(angle)
  const ly = baseY + wing * Math.cos(angle)
  const rx = baseX + wing * Math.sin(angle)
  const ry = baseY - wing * Math.cos(angle)
  return (
    <g stroke={color} fill={color} opacity={opacity}>
      <line x1={x1} y1={y1} x2={baseX} y2={baseY} strokeWidth={width} strokeLinecap="round" />
      <polygon points={`${x2},${y2} ${lx},${ly} ${rx},${ry}`} stroke="none" />
    </g>
  )
}

function StressElement({
  cx = CX,
  cy = CY,
  half = HALF,
  angle,
  sx,
  sy,
  tx,
  max,
  tauMax,
  labelX,
  labelY,
  labelTau,
  opacity = 1,
  showAxes = true,
}: {
  cx?: number
  cy?: number
  half?: number
  angle: number
  sx: number
  sy: number
  tx: number
  max: number
  tauMax: number
  labelX: string
  labelY: string
  labelTau?: string
  opacity?: number
  showAxes?: boolean
}) {
  const angleRad = rad(angle)
  const ux = Math.cos(angleRad)
  const uy = -Math.sin(angleRad)
  const vx = -Math.sin(angleRad)
  const vy = -Math.cos(angleRad)
  const lenX = sx === 0 ? 0 : 6 + 34 * Math.min(1, Math.abs(sx) / Math.max(max, 1))
  const lenY = sy === 0 ? 0 : 6 + 34 * Math.min(1, Math.abs(sy) / Math.max(max, 1))
  const lenT = Math.abs(tx) < 0.5 ? 0 : 5 + 18 * Math.min(1, Math.abs(tx) / Math.max(tauMax, 1))
  const signX = Math.sign(sx)
  const signY = Math.sign(sy)
  const signT = Math.sign(tx)
  const offset = 0.34 * half
  const world = (dx: number, dy: number) => ({
    x: cx + ux * dx - vx * dy,
    y: cy + uy * dx - vy * dy,
  })
  const xLabelPos = world(half + lenX + 12, 0)
  const yLabelPos = world(0, -(half + lenY + 12))
  const tauLabelPos = world(half + 12, -offset)
  const xAnchor = ux > 0.35 ? 'start' : ux < -0.35 ? 'end' : 'middle'
  const yAnchor = vx > 0.35 ? 'start' : vx < -0.35 ? 'end' : 'middle'
  const tauAnchor = ux > 0.35 ? 'start' : ux < -0.35 ? 'end' : 'middle'

  return (
    <g opacity={opacity}>
      <g transform={`rotate(${-angle} ${cx} ${cy})`}>
        <rect
          x={cx - half}
          y={cy - half}
          width={half * 2}
          height={half * 2}
          rx={2}
          fill={FILL}
          stroke={EDGE}
          strokeWidth={1.4}
        />
        {showAxes && (
          <g stroke={MUTED} strokeWidth={0.8} strokeDasharray="4 4" opacity={0.55}>
            <line x1={cx - half - 8} y1={cy} x2={cx + half + 8} y2={cy} />
            <line x1={cx} y1={cy - half - 8} x2={cx} y2={cy + half + 8} />
          </g>
        )}
        {lenX > 0 && (
          <>
            <Arrow x1={cx + half} y1={cy} x2={cx + half + signX * lenX} y2={cy} color={BLUE} width={2} />
            <Arrow x1={cx - half} y1={cy} x2={cx - half - signX * lenX} y2={cy} color={BLUE} width={2} />
          </>
        )}
        {lenY > 0 && (
          <>
            <Arrow x1={cx} y1={cy - half} x2={cx} y2={cy - half - signY * lenY} color={GREEN} width={2} />
            <Arrow x1={cx} y1={cy + half} x2={cx} y2={cy + half + signY * lenY} color={GREEN} width={2} />
          </>
        )}
        {lenT > 0 && (
          <>
            <Arrow
              x1={cx + half}
              y1={cy + offset}
              x2={cx + half}
              y2={cy + offset - signT * lenT}
              color={ORANGE}
              width={1.7}
            />
            <Arrow
              x1={cx - half}
              y1={cy - offset}
              x2={cx - half}
              y2={cy - offset + signT * lenT}
              color={ORANGE}
              width={1.7}
            />
            <Arrow
              x1={cx - offset}
              y1={cy - half}
              x2={cx - offset + signT * lenT}
              y2={cy - half}
              color={ORANGE}
              width={1.7}
            />
            <Arrow
              x1={cx + offset}
              y1={cy + half}
              x2={cx + offset - signT * lenT}
              y2={cy + half}
              color={ORANGE}
              width={1.7}
            />
          </>
        )}
      </g>
      {labelX && (
        <text x={xLabelPos.x} y={xLabelPos.y} textAnchor={xAnchor} fontSize={10} fill={BLUE} fontWeight={600}>
          {labelX}
        </text>
      )}
      {labelY && (
        <text x={yLabelPos.x} y={yLabelPos.y} textAnchor={yAnchor} fontSize={10} fill={GREEN} fontWeight={600}>
          {labelY}
        </text>
      )}
      {labelTau && (
        <text x={tauLabelPos.x} y={tauLabelPos.y} textAnchor={tauAnchor} fontSize={9} fill={ORANGE}>
          {labelTau}
        </text>
      )}
    </g>
  )
}

function MohrDiagram({
  cx,
  cy,
  scale,
  avg,
  radius,
  pointS,
  pointT,
  s1,
  s2,
  progress,
  pointLabel,
  showPoint = true,
}: {
  cx: number
  cy: number
  scale: number
  avg: number
  radius: number
  pointS: number
  pointT: number
  s1: number
  s2: number
  progress: number
  pointLabel?: string
  showPoint?: boolean
}) {
  const sx = (value: number) => cx + (value - avg) * scale
  const pointX = sx(pointS)
  const pointY = cy - pointT * scale
  const left = Math.min(sx(s2), sx(0), cx - radius) - 18
  const right = Math.max(sx(s1), sx(0), cx + radius) + 18

  return (
    <g>
      <line x1={left} y1={cy} x2={right} y2={cy} stroke={LIGHT} strokeWidth={1} />
      <line
        x1={cx}
        y1={cy - radius - 20}
        x2={cx}
        y2={cy + radius + 20}
        stroke={LIGHT}
        strokeWidth={1}
        strokeDasharray="4 4"
      />
      <text x={right + 4} y={cy - 6} fontSize={9} fill={MUTED}>
        σ
      </text>
      <text x={cx + 5} y={cy - radius - 14} fontSize={9} fill={MUTED}>
        τ
      </text>
      <motion.circle
        cx={cx}
        cy={cy}
        r={radius}
        fill="none"
        stroke={VIOLET}
        strokeWidth={2.2}
        initial={{ pathLength: 0, opacity: 0.3 }}
        animate={{ pathLength: progress, opacity: 1 }}
        transition={{ duration: 0.18, ease: 'linear' }}
      />
      <circle cx={cx} cy={cy} r={2.6} fill={INK} />
      <text x={cx + 6} y={cy + 15} fontSize={9} fill={INK}>
        C = {avg}
      </text>
      <line x1={sx(s1)} y1={cy - 5} x2={sx(s1)} y2={cy + 5} stroke={BLUE} strokeWidth={1.6} />
      <line x1={sx(s2)} y1={cy - 5} x2={sx(s2)} y2={cy + 5} stroke={ORANGE} strokeWidth={1.6} />
      <text x={sx(s1)} y={cy + 19} textAnchor="middle" fontSize={9} fill={BLUE}>
        σ₁ = {s1}
      </text>
      <text x={sx(s2)} y={cy + 19} textAnchor="middle" fontSize={9} fill={ORANGE}>
        σ₂ = {s2}
      </text>
      <line x1={sx(0)} y1={cy - 4} x2={sx(0)} y2={cy + 4} stroke={MUTED} strokeWidth={1.2} />
      <text x={sx(0)} y={cy - 9} textAnchor="middle" fontSize={8} fill={MUTED}>
        0
      </text>
      {showPoint && (
        <>
          <line x1={cx} y1={cy} x2={pointX} y2={pointY} stroke={VIOLET} strokeWidth={1.2} strokeDasharray="3 3" />
          <circle cx={pointX} cy={pointY} r={4.4} fill={VIOLET} stroke="#fff" strokeWidth={1.2} />
          {pointLabel && (
            <text x={pointX + 7} y={pointY - 7} fontSize={9} fill={VIOLET}>
              {pointLabel}
            </text>
          )}
        </>
      )}
    </g>
  )
}

function OrderAxis({
  xZero,
  y,
  scale,
  values,
  progress,
}: {
  xZero: number
  y: number
  scale: number
  values: Array<{ value: number; label: string; color: string }>
  progress: number
}) {
  const sx = (value: number) => xZero + value * scale
  const left = Math.min(...values.map((item) => sx(item.value))) - 24
  const right = Math.max(...values.map((item) => sx(item.value))) + 24
  return (
    <g>
      <line x1={left} y1={y} x2={right} y2={y} stroke={LIGHT} strokeWidth={1} />
      <text x={right + 5} y={y + 3} fontSize={9} fill={MUTED}>
        σ
      </text>
      {values.map((item, index) => {
        const x = sx(item.value)
        const labelY = y - 20 - (index % 2) * 17
        return (
          <motion.g
            key={item.label}
            initial={{ opacity: 0 }}
            animate={{ opacity: progress }}
            transition={{ duration: 0.3, delay: index * 0.08 }}
          >
            <line x1={x} y1={y} x2={x} y2={labelY + 3} stroke={item.color} strokeWidth={1.1} />
            <circle cx={x} cy={y} r={4.2} fill={item.color} />
            <text x={x} y={labelY} textAnchor="middle" fontSize={9.5} fontWeight={600} fill={item.color}>
              {item.label}
            </text>
          </motion.g>
        )
      })}
    </g>
  )
}

function ShearPanel({
  xZero,
  y,
  scale,
  values,
  progress,
}: {
  xZero: number
  y: number
  scale: number
  values: [number, number, number]
  progress: number
}) {
  const [high, middle, low] = values
  const sx = (value: number) => xZero + value * scale
  const circles = [
    { a: high, b: middle, color: BLUE, width: 1.5, dash: '5 4', label: 'R płaskie' },
    { a: middle, b: low, color: GREEN, width: 1.5, dash: '5 4', label: '' },
    { a: high, b: low, color: ORANGE, width: 2.6, dash: undefined, label: 'τ max' },
  ]
  const left = sx(low) - 20
  const right = sx(high) + 20

  return (
    <g>
      <line x1={left} y1={y} x2={right} y2={y} stroke={LIGHT} strokeWidth={1} />
      {circles.map((item, index) => {
        const center = (item.a + item.b) / 2
        const radius = (Math.abs(item.a - item.b) / 2) * scale
        return (
          <motion.circle
            key={`${item.a}-${item.b}`}
            cx={sx(center)}
            cy={y}
            r={radius}
            fill="none"
            stroke={item.color}
            strokeWidth={item.width}
            strokeDasharray={item.dash}
            initial={{ pathLength: 0, opacity: 0.25 }}
            animate={{ pathLength: progress, opacity: 1 }}
            transition={{ duration: 0.2, ease: 'linear', delay: index * 0.05 }}
          />
        )
      })}
      <line
        x1={sx((high + low) / 2)}
        y1={y}
        x2={sx((high + low) / 2)}
        y2={y - ((high - low) / 2) * scale}
        stroke={ORANGE}
        strokeWidth={1.2}
        strokeDasharray="3 3"
      />
      <text
        x={sx((high + low) / 2)}
        y={y - ((high - low) / 2) * scale - 7}
        textAnchor="middle"
        fontSize={9.5}
        fontWeight={600}
        fill={ORANGE}
      >
        τ max = {(high - low) / 2} MPa
      </text>
      <text
        x={sx((high + middle) / 2)}
        y={y - ((high - middle) / 2) * scale + 14}
        textAnchor="middle"
        fontSize={9}
        fill={BLUE}
      >
        R = {(high - middle) / 2} MPa
      </text>
      {[
        { value: high, label: 'σI', color: BLUE },
        { value: middle, label: 'σII', color: MUTED },
        { value: low, label: 'σIII', color: ORANGE },
      ].map((item, index) => {
        const x = sx(item.value)
        const labelY = y + 20 + (index % 2) * 15
        return (
          <g key={item.label}>
            <line x1={x} y1={y} x2={x} y2={labelY - 10} stroke={item.color} strokeWidth={1.1} />
            <circle cx={x} cy={y} r={3.6} fill={item.color} />
            <text x={x} y={labelY} textAnchor="middle" fontSize={9} fill={item.color}>
              {item.label} = {item.value}
            </text>
          </g>
        )
      })}
    </g>
  )
}

export function PrincipalExample1Animation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'given'
  const p = playing ? smooth(sceneProgress) : 1
  const isRotate = metric === 'rotate'
  const angle = isRotate ? THETA_P * p : metric === 'order' || metric === 'shear' ? THETA_P : 0
  const theta = rad(2 * angle)
  const sxCurrent = AVG + A * Math.cos(theta) + TAU * Math.sin(theta)
  const syCurrent = AVG - A * Math.cos(theta) - TAU * Math.sin(theta)
  const tauCurrent = -A * Math.sin(theta) + TAU * Math.cos(theta)
  const principalShown = isRotate && p > 0.86
  const labelX =
    metric === 'mohr'
      ? ''
      : principalShown
        ? 'σ₁ = 70 MPa'
        : isRotate
          ? `σx′ = ${sxCurrent.toFixed(0)}`
          : metric === 'order' || metric === 'shear'
            ? 'σ₁ = 70 MPa'
            : 'σx = −20 MPa'
  const labelY =
    metric === 'mohr'
      ? ''
      : principalShown
        ? 'σ₂ = −30 MPa'
        : isRotate
          ? `σy′ = ${syCurrent.toFixed(0)}`
          : metric === 'order' || metric === 'shear'
            ? 'σ₂ = −30 MPa'
            : 'σy = 60 MPa'
  const labelTau = isRotate
    ? Math.abs(tauCurrent) > 1.5
      ? `τ = ${tauCurrent.toFixed(0)} MPa`
      : undefined
    : metric === 'given'
      ? 'τxy = 30 MPa'
      : undefined

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 300"
          role="img"
          aria-label="Element naprężenia obracany do kierunków głównych. Animacja pokazuje zanik ścinania i pojawienie się naprężeń głównych 70 i minus 30 megapaskala."
        >
          <text x={14} y={22} fontSize={9} fill={MUTED}>
            σx = −20 MPa · σy = 60 MPa · τxy = 30 MPa · σz = 0
          </text>

          <StressElement
            angle={angle}
            sx={isRotate ? sxCurrent : metric === 'given' || metric === 'mohr' ? -20 : S1}
            sy={isRotate ? syCurrent : metric === 'given' || metric === 'mohr' ? 60 : S2}
            tx={isRotate ? tauCurrent : metric === 'given' || metric === 'mohr' ? 30 : 0}
            max={70}
            tauMax={30}
            labelX={metric === 'shear' ? '' : labelX}
            labelY={metric === 'shear' ? '' : labelY}
            labelTau={labelTau}
            opacity={metric === 'shear' ? 0.75 : 1}
          />

          <line x1={CX} y1={CY} x2={CX + 42} y2={CY + 34} stroke={VIOLET} strokeWidth={1.4} strokeDasharray="4 3" />
          <text x={CX + 47} y={CY + 38} fontSize={9} fill={VIOLET}>
            z
          </text>
          <text x={CX + 47} y={CY + 51} fontSize={8.5} fill={MUTED}>
            σz = 0
          </text>

          {metric === 'given' && (
            <g>
              <line x1={252} y1={170} x2={435} y2={170} stroke={LIGHT} strokeWidth={1} />
              <line x1={345} y1={96} x2={345} y2={244} stroke={LIGHT} strokeWidth={1} strokeDasharray="4 4" />
              <text x={440} y={164} fontSize={9} fill={MUTED}>
                σ
              </text>
              <text x={350} y={100} fontSize={9} fill={MUTED}>
                τ
              </text>
              <line x1={345} y1={170} x2={323} y2={137} stroke={VIOLET} strokeWidth={1.2} strokeDasharray="3 3" />
              <circle cx={323} cy={137} r={4.6} fill={VIOLET} stroke="#fff" strokeWidth={1.2} />
              <text x={330} y={130} fontSize={9} fill={VIOLET}>
                P (−20; 30)
              </text>
              <text x={270} y={216} fontSize={9} fill={MUTED}>
                punkt stanu w płaszczyźnie σ–τ
              </text>
            </g>
          )}

          {metric === 'mohr' && (
            <g>
              <MohrDiagram
                cx={340}
                cy={150}
                scale={1.2}
                avg={AVG}
                radius={50 * 1.2}
                pointS={-20}
                pointT={30}
                s1={S1}
                s2={S2}
                progress={p}
                pointLabel="P"
              />
              <text x={262} y={238} fontSize={9} fill={MUTED}>
                R = 50 MPa, a = −40 MPa
              </text>
            </g>
          )}

          {isRotate && (
            <g>
              <MohrDiagram
                cx={340}
                cy={150}
                scale={0.95}
                avg={AVG}
                radius={50 * 0.95}
                pointS={sxCurrent}
                pointT={tauCurrent}
                s1={S1}
                s2={S2}
                progress={1}
                showPoint
              />
              <text x={340} y={246} textAnchor="middle" fontSize={9} fill={MUTED}>
                punkt przesuwa się po kole, aż τ = 0
              </text>
              <text x={CX} y={CY + 94} textAnchor="middle" fontSize={9} fill={MUTED}>
                θp = 71,6°
              </text>
            </g>
          )}

          {metric === 'order' && (
            <g>
              <OrderAxis
                xZero={338}
                y={170}
                scale={1.15}
                values={[
                  { value: S1, label: 'σI = 70', color: BLUE },
                  { value: 0, label: 'σII = 0', color: MUTED },
                  { value: S2, label: 'σIII = −30', color: ORANGE },
                ]}
                progress={p}
              />
              <text x={340} y={244} textAnchor="middle" fontSize={9} fill={MUTED}>
                zero jest naprężeniem pośrednim
              </text>
            </g>
          )}

          {metric === 'shear' && (
            <g>
              <ShearPanel xZero={345} y={150} scale={1.05} values={[S1, 0, S2]} progress={p} />
              <text x={345} y={252} textAnchor="middle" fontSize={9} fill={MUTED}>
                największe koło obejmuje σIII i σI
              </text>
            </g>
          )}
        </svg>
      </div>
    </div>
  )
}
