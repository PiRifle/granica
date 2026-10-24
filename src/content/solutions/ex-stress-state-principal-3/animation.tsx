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

const CX = 140
const CY = 150
const HALF = 46
const THETA_P = 50.77
const AVG = 30
const A = -10
const TAU = 48.99
const S1 = 80
const S2 = -20

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

function TracePanel({ xZero, y, scale, progress }: { xZero: number; y: number; scale: number; progress: number }) {
  const sx = (value: number) => xZero + value * scale
  const x0 = sx(0)
  const xx = sx(20)
  const xa = sx(30)
  const xy = sx(20 + 20 * progress)
  const left = x0 - 20
  const right = sx(48) + 20
  return (
    <g>
      <line x1={left} y1={y} x2={right} y2={y} stroke={LIGHT} strokeWidth={1} />
      <text x={right + 4} y={y - 6} fontSize={9} fill={MUTED}>
        σ
      </text>
      <line x1={x0} y1={y - 5} x2={x0} y2={y + 5} stroke={MUTED} strokeWidth={1.2} />
      <text x={x0} y={y + 18} textAnchor="middle" fontSize={8.5} fill={MUTED}>
        0
      </text>
      <line x1={xx} y1={y - 5} x2={xx} y2={y + 5} stroke={BLUE} strokeWidth={1.6} />
      <circle cx={xx} cy={y} r={3.6} fill={BLUE} />
      <text x={xx} y={y + 32} textAnchor="middle" fontSize={9} fill={BLUE}>
        σx = 20
      </text>
      <line x1={xa} y1={y - 26} x2={xa} y2={y + 8} stroke={VIOLET} strokeWidth={1.1} strokeDasharray="4 3" />
      <text x={xa} y={y - 32} textAnchor="middle" fontSize={9} fill={VIOLET}>
        σavg = 30
      </text>
      <line x1={xa} y1={y - 14} x2={xy} y2={y - 14} stroke={GREEN} strokeWidth={1.4} />
      <line x1={xa} y1={y - 14} x2={xx} y2={y - 14} stroke={BLUE} strokeWidth={1.4} />
      <line x1={xy} y1={y - 18} x2={xy} y2={y - 10} stroke={GREEN} strokeWidth={1.4} />
      <line x1={xx} y1={y - 18} x2={xx} y2={y - 10} stroke={BLUE} strokeWidth={1.4} />
      <circle cx={xy} cy={y} r={3.6} fill={GREEN} opacity={0.35 + 0.65 * progress} />
      <text x={xy} y={y + 18} textAnchor="middle" fontSize={9} fill={GREEN} opacity={0.35 + 0.65 * progress}>
        {progress > 0.08 ? `σy = ${(20 + 20 * progress).toFixed(0)}` : 'σy = ?'}
      </text>
      <text x={(xx + xy) / 2} y={y - 52} textAnchor="middle" fontSize={8.5} fill={MUTED}>
        przedział symetryczny względem średniej
      </text>
    </g>
  )
}

function RadiusPanel({
  originX,
  originY,
  scale,
  progress,
}: {
  originX: number
  originY: number
  scale: number
  progress: number
}) {
  const ax = originX - 10 * scale
  const topY = originY - TAU * scale * progress
  const midX = (originX + ax) / 2
  const midY = (originY + topY) / 2
  return (
    <g>
      <line x1={originX} y1={originY} x2={ax} y2={originY} stroke={BLUE} strokeWidth={2.2} />
      <line x1={ax} y1={originY} x2={ax} y2={topY} stroke={ORANGE} strokeWidth={2.2} />
      <line x1={originX} y1={originY} x2={ax} y2={topY} stroke={VIOLET} strokeWidth={2.4} />
      <path
        d={`M ${ax} ${originY - 10} L ${ax + 10} ${originY - 10} L ${ax + 10} ${originY}`}
        fill="none"
        stroke={EDGE}
        strokeWidth={1}
      />
      <circle cx={originX} cy={originY} r={3} fill={INK} />
      <text x={midX} y={originY + 18} textAnchor="middle" fontSize={9} fill={BLUE}>
        |a| = 10 MPa
      </text>
      <text x={ax - 6} y={midY} textAnchor="end" fontSize={9} fill={ORANGE}>
        |τ| = 48,99
      </text>
      <text x={midX + 8} y={midY - 8} fontSize={9} fill={VIOLET} opacity={progress > 0.85 ? 1 : 0}>
        R = 50 MPa
      </text>
      <text x={originX + 6} y={originY + 15} fontSize={8.5} fill={MUTED}>
        σavg
      </text>
    </g>
  )
}

export function PrincipalExample3Animation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'principal'
  const p = playing ? smooth(sceneProgress) : 1
  const isRotate = metric === 'rotate'
  const angle = isRotate ? THETA_P * p : 0
  const theta = rad(2 * angle)
  const sxCurrent = AVG + A * Math.cos(theta) + TAU * Math.sin(theta)
  const syCurrent = AVG - A * Math.cos(theta) - TAU * Math.sin(theta)
  const tauCurrent = -A * Math.sin(theta) + TAU * Math.cos(theta)
  const principalShown = isRotate && p > 0.86

  const signElements = [
    { cx: 105, cy: 146, tx: TAU, sign: 1 },
    { cx: 255, cy: 146, tx: -TAU, sign: -1 },
  ]

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 300"
          role="img"
          aria-label="Zadanie odwrotne: znane naprężenia główne 80 i minus 20 megapaskala. Animacja odtwarza średnią, składową sigma y i ścinanie, a następnie obraca element do kierunków głównych."
        >
          <text x={14} y={22} fontSize={9} fill={MUTED}>
            σ1 = 80 MPa · σ2 = −20 MPa · σx = 20 MPa
          </text>

          {metric !== 'sign' && (
            <StressElement
              angle={angle}
              sx={metric === 'trace' ? 20 : isRotate ? sxCurrent : S1}
              sy={metric === 'trace' ? 0 : isRotate ? syCurrent : S2}
              tx={metric === 'trace' ? 0 : isRotate ? tauCurrent : 0}
              max={80}
              tauMax={TAU}
              labelX={
                isRotate
                  ? principalShown
                    ? 'σ₁ = 80 MPa'
                    : `σx′ = ${sxCurrent.toFixed(0)} MPa`
                  : metric === 'trace'
                    ? 'σx = 20 MPa'
                    : 'σ₁ = 80 MPa'
              }
              labelY={
                isRotate
                  ? principalShown
                    ? 'σ₂ = −20 MPa'
                    : `σy′ = ${syCurrent.toFixed(0)} MPa`
                  : metric === 'trace'
                    ? 'σy = ?'
                    : 'σ₂ = −20 MPa'
              }
              labelTau={
                isRotate ? (Math.abs(tauCurrent) > 1.5 ? `τ = ${tauCurrent.toFixed(0)} MPa` : undefined) : undefined
              }
            />
          )}

          {metric !== 'sign' && (
            <g>
              <line x1={CX} y1={CY} x2={CX + 42} y2={CY + 34} stroke={VIOLET} strokeWidth={1.4} strokeDasharray="4 3" />
              <text x={CX + 47} y={CY + 38} fontSize={9} fill={VIOLET}>
                z
              </text>
              <text x={CX + 47} y={CY + 51} fontSize={8.5} fill={MUTED}>
                σz = 0
              </text>
            </g>
          )}

          {metric === 'principal' && (
            <g>
              <OrderAxis
                xZero={300}
                y={200}
                scale={0.95}
                values={[
                  { value: S1, label: 'σI = 80', color: BLUE },
                  { value: 0, label: 'σII = 0', color: MUTED },
                  { value: S2, label: 'σIII = −20', color: ORANGE },
                ]}
                progress={p}
              />
              <text x={345} y={250} textAnchor="middle" fontSize={9} fill={MUTED}>
                τ = 0 na obu płaszczyznach głównych
              </text>
            </g>
          )}

          {metric === 'trace' && (
            <g>
              <TracePanel xZero={265} y={192} scale={2.2} progress={p} />
              <text x={338} y={108} textAnchor="middle" fontSize={9} fill={MUTED}>
                σy wynika z niezmiennika śladu
              </text>
            </g>
          )}

          {metric === 'radius' && (
            <g>
              <RadiusPanel originX={330} originY={226} scale={2} progress={p} />
              <text x={330} y={274} textAnchor="middle" fontSize={9} fill={MUTED}>
                trójkąt promienia: R² = a² + τ²
              </text>
            </g>
          )}

          {isRotate && (
            <g>
              <MohrDiagram
                cx={330}
                cy={150}
                scale={1}
                avg={AVG}
                radius={50}
                pointS={sxCurrent}
                pointT={tauCurrent}
                s1={S1}
                s2={S2}
                progress={1}
                showPoint
              />
              <text x={330} y={246} textAnchor="middle" fontSize={9} fill={MUTED}>
                punkt wraca na oś σ, gdy τ = 0
              </text>
              <text x={CX} y={CY + 94} textAnchor="middle" fontSize={9} fill={MUTED}>
                θp = 50,8°
              </text>
            </g>
          )}

          {metric === 'sign' && (
            <g>
              {signElements.map((item) => {
                const axisAngle = item.sign * THETA_P
                const dirX = Math.cos(rad(axisAngle))
                const dirY = -Math.sin(rad(axisAngle))
                return (
                  <g key={item.sign}>
                    <StressElement
                      cx={item.cx}
                      cy={item.cy}
                      half={32}
                      angle={0}
                      sx={20}
                      sy={40}
                      tx={item.tx}
                      max={80}
                      tauMax={TAU}
                      labelX="σx = 20 MPa"
                      labelY=""
                      showAxes={false}
                    />
                    <text x={item.cx} y={212} textAnchor="middle" fontSize={9} fill={ORANGE}>
                      τ = {item.sign > 0 ? '+' : '−'}48,99 MPa
                    </text>
                    <line
                      x1={item.cx - dirX * 58}
                      y1={item.cy + dirY * 58}
                      x2={item.cx + dirX * 58}
                      y2={item.cy + dirY * 58}
                      stroke={VIOLET}
                      strokeWidth={1.4}
                      strokeDasharray="5 4"
                    />
                    <text x={item.cx + dirX * 66} y={item.cy + dirY * 66} fontSize={9} fill={VIOLET}>
                      oś 1
                    </text>
                  </g>
                )
              })}
              <text x={180} y={244} textAnchor="middle" fontSize={9} fill={MUTED}>
                oba znaki τ dają ten sam zestaw σ1 = 80 i σ2 = −20 MPa
              </text>
            </g>
          )}
        </svg>
      </div>
    </div>
  )
}
