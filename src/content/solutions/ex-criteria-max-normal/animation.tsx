import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const BLUE = '#4f6df5'
const ORANGE = '#ff6b45'
const GOLD = '#d8a13b'
const VIOLET = '#a970dd'
const MUTED = '#87929d'
const EDGE = '#68727e'
const INK = '#17202a'
const FILL = '#f3f6fc'
const LIGHT = '#c9d0d9'

const SX = 50
const SY = -20
const TX = 40
const C = 15
const R = 53.15
const S1 = 68.15
const S3 = -38.15
const THETA_P = 24.42

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}
const decimal = (value: number, digits = 1) => value.toFixed(digits).replace('.', ',')

function Arrow({
  x1,
  y1,
  x2,
  y2,
  color,
  width = 1.8,
  opacity = 1,
  dash,
}: {
  x1: number
  y1: number
  x2: number
  y2: number
  color: string
  width?: number
  opacity?: number
  dash?: string
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
      <line x1={x1} y1={y1} x2={baseX} y2={baseY} strokeWidth={width} strokeDasharray={dash} strokeLinecap="round" />
      <polygon points={`${x2},${y2} ${lx},${ly} ${rx},${ry}`} stroke="none" />
    </g>
  )
}

function StressElement({
  angle,
  sx,
  sy,
  tx,
  labelX,
  labelY,
  labelTau,
  showTau = true,
}: {
  angle: number
  sx: number
  sy: number
  tx: number
  labelX: string
  labelY: string
  labelTau?: string
  showTau?: boolean
}) {
  const cx = 115
  const cy = 165
  const half = 45
  const rad = (angle * Math.PI) / 180
  const ux = Math.cos(rad)
  const uy = -Math.sin(rad)
  const vx = Math.sin(rad)
  const vy = Math.cos(rad)
  const world = (dx: number, dy: number) => ({
    x: cx + ux * dx + vx * dy,
    y: cy + uy * dx + vy * dy,
  })

  const lenX = Math.abs(sx) < 0.05 ? 0 : 7 + 30 * Math.min(1, Math.abs(sx) / 80)
  const lenY = Math.abs(sy) < 0.05 ? 0 : 7 + 30 * Math.min(1, Math.abs(sy) / 80)
  const lenT = showTau && Math.abs(tx) > 0.5 ? 5 + 18 * Math.min(1, Math.abs(tx) / 40) : 0
  const signX = Math.sign(sx)
  const signY = Math.sign(sy)
  const signT = Math.sign(tx)
  const offset = 0.34 * half
  const colorX = sx >= 0 ? BLUE : ORANGE
  const colorY = sy >= 0 ? BLUE : ORANGE
  const colorT = GOLD

  const xLabel = world(half + lenX + 11, 0)
  const yLabel = world(0, -(half + lenY + 11))
  const tauLabel = world(half + 9, -offset - 3)
  const xAnchor = ux > 0.35 ? 'start' : ux < -0.35 ? 'end' : 'middle'
  const yAnchor = vx > 0.35 ? 'start' : vx < -0.35 ? 'end' : 'middle'

  return (
    <g>
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
        <g stroke={MUTED} strokeWidth={0.8} strokeDasharray="4 4" opacity={0.45}>
          <line x1={cx - half - 9} y1={cy} x2={cx + half + 9} y2={cy} />
          <line x1={cx} y1={cy - half - 9} x2={cx} y2={cy + half + 9} />
        </g>
        {lenX > 0 && (
          <>
            <Arrow x1={cx + half} y1={cy} x2={cx + half + signX * lenX} y2={cy} color={colorX} width={2.1} />
            <Arrow x1={cx - half} y1={cy} x2={cx - half - signX * lenX} y2={cy} color={colorX} width={2.1} />
          </>
        )}
        {lenY > 0 && (
          <>
            <Arrow x1={cx} y1={cy - half} x2={cx} y2={cy - half - signY * lenY} color={colorY} width={2.1} />
            <Arrow x1={cx} y1={cy + half} x2={cx} y2={cy + half + signY * lenY} color={colorY} width={2.1} />
          </>
        )}
        {lenT > 0 && (
          <>
            <Arrow
              x1={cx + half}
              y1={cy + offset}
              x2={cx + half}
              y2={cy + offset - signT * lenT}
              color={colorT}
              width={1.7}
            />
            <Arrow
              x1={cx - half}
              y1={cy - offset}
              x2={cx - half}
              y2={cy - offset + signT * lenT}
              color={colorT}
              width={1.7}
            />
            <Arrow
              x1={cx - offset}
              y1={cy - half}
              x2={cx - offset + signT * lenT}
              y2={cy - half}
              color={colorT}
              width={1.7}
            />
            <Arrow
              x1={cx + offset}
              y1={cy + half}
              x2={cx + offset - signT * lenT}
              y2={cy + half}
              color={colorT}
              width={1.7}
            />
          </>
        )}
      </g>
      <text x={xLabel.x} y={xLabel.y} textAnchor={xAnchor} fontSize={10} fontWeight={600} fill={colorX}>
        {labelX}
      </text>
      <text x={yLabel.x} y={yLabel.y} textAnchor={yAnchor} fontSize={10} fontWeight={600} fill={colorY}>
        {labelY}
      </text>
      {labelTau && lenT > 0 && (
        <text x={tauLabel.x} y={tauLabel.y} textAnchor={xAnchor} fontSize={9} fill={colorT}>
          {labelTau}
        </text>
      )}
    </g>
  )
}

function MohrPanel({ angle, showCircle, progress }: { angle: number; showCircle: boolean; progress: number }) {
  const zeroX = 348
  const axisY = 178
  const scale = 1.25
  const sx = (value: number) => zeroX + value * scale
  const centerX = sx(C)
  const radius = R * scale
  const phi = (2 * (THETA_P - angle) * Math.PI) / 180
  const pointX = sx(C + R * Math.cos(phi))
  const pointY = axisY - R * Math.sin(phi) * scale

  return (
    <g>
      <line x1={288} y1={axisY} x2={448} y2={axisY} stroke={LIGHT} strokeWidth={1} />
      <line x1={zeroX} y1={96} x2={zeroX} y2={250} stroke={LIGHT} strokeWidth={1} strokeDasharray="4 4" />
      <text x={451} y={axisY - 6} fontSize={9} fill={MUTED}>
        σ
      </text>
      <text x={zeroX + 5} y={100} fontSize={9} fill={MUTED}>
        τ
      </text>
      <line x1={sx(0)} y1={axisY - 4} x2={sx(0)} y2={axisY + 4} stroke={MUTED} strokeWidth={1.2} />
      <text x={sx(0)} y={axisY - 8} textAnchor="middle" fontSize={8} fill={MUTED}>
        0
      </text>

      {showCircle && (
        <>
          <motion.circle
            cx={centerX}
            cy={axisY}
            r={radius}
            fill="none"
            stroke={VIOLET}
            strokeWidth={2}
            initial={{ pathLength: 0, opacity: 0.3 }}
            animate={{ pathLength: progress, opacity: 1 }}
            transition={{ duration: 0.18, ease: 'linear' }}
          />
          <circle cx={centerX} cy={axisY} r={2.5} fill={INK} />
          <text x={centerX - 4} y={axisY + 16} textAnchor="middle" fontSize={9} fill={INK}>
            C = 15
          </text>
          <line x1={sx(S1)} y1={axisY - 5} x2={sx(S1)} y2={axisY + 5} stroke={BLUE} strokeWidth={1.8} />
          <line x1={sx(S3)} y1={axisY - 5} x2={sx(S3)} y2={axisY + 5} stroke={ORANGE} strokeWidth={1.8} />
          <text x={sx(S1)} y={axisY + 20} textAnchor="middle" fontSize={9} fontWeight={600} fill={BLUE}>
            σ1 = 68,15
          </text>
          <text x={sx(S3)} y={axisY + 20} textAnchor="middle" fontSize={9} fontWeight={600} fill={ORANGE}>
            σ3 = −38,15
          </text>
        </>
      )}

      <circle cx={pointX} cy={pointY} r={4.2} fill={VIOLET} stroke="#fff" strokeWidth={1.2} />
      <text
        x={pointX + (showCircle ? -6 : 8)}
        y={pointY - 8}
        textAnchor={showCircle ? 'end' : 'start'}
        fontSize={9}
        fill={VIOLET}
      >
        {showCircle ? 'punkt stanu' : 'X (50, 40)'}
      </text>
    </g>
  )
}

function Gauge({
  y,
  label,
  actual,
  limit,
  safety,
  color,
  progress,
  active,
}: {
  y: number
  label: string
  actual: number
  limit: number
  safety: string
  color: string
  progress: number
  active: boolean
}) {
  const x = 246
  const width = 150
  const ratio = Math.min(1, actual / limit)
  const fillWidth = width * ratio * progress
  return (
    <g opacity={active ? 1 : 0.38}>
      <text x={x} y={y - 17} fontSize={9.5} fontWeight={600} fill={color}>
        {label}
      </text>
      <text x={x + width} y={y - 17} textAnchor="end" fontSize={9} fill={color}>
        n = {safety}
      </text>
      <rect x={x} y={y} width={width} height={13} rx={4} fill="#eef1f6" />
      <rect x={x} y={y} width={fillWidth} height={13} rx={4} fill={color} />
      <line
        x1={x + width}
        y1={y - 4}
        x2={x + width}
        y2={y + 17}
        stroke={color}
        strokeWidth={1.2}
        strokeDasharray="3 3"
      />
      <text x={x} y={y + 27} fontSize={8.5} fill={MUTED}>
        {decimal(actual, 2)} MPa
      </text>
      <text x={x + width} y={y + 27} textAnchor="end" fontSize={8.5} fill={MUTED}>
        granica {limit} MPa
      </text>
    </g>
  )
}

export function MaxNormalExample1Animation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'state'
  const p = playing ? smooth(sceneProgress) : 1
  const isPrincipal = metric !== 'state'
  const angle = metric === 'principal' ? THETA_P * p : isPrincipal ? THETA_P : 0
  const rad = (2 * angle * Math.PI) / 180
  const a = (SX - SY) / 2
  const sxCurrent = C + a * Math.cos(rad) + TX * Math.sin(rad)
  const syCurrent = C - a * Math.cos(rad) - TX * Math.sin(rad)
  const tauCurrent = -a * Math.sin(rad) + TX * Math.cos(rad)
  const settled = metric !== 'principal' || p > 0.95
  const showChecks = metric === 'tension' || metric === 'compression' || metric === 'compare'

  const elementSx = metric === 'state' ? SX : settled ? S1 : sxCurrent
  const elementSy = metric === 'state' ? SY : settled ? S3 : syCurrent
  const elementTau = metric === 'state' ? TX : settled ? 0 : tauCurrent

  const labelX = metric === 'state' ? 'σx = 50' : settled ? 'σ1 = 68,15' : `σx′ = ${decimal(sxCurrent)}`
  const labelY = metric === 'state' ? 'σy = −20' : settled ? 'σ3 = −38,15' : `σy′ = ${decimal(syCurrent)}`
  const labelTau =
    metric === 'state'
      ? 'τxy = 40'
      : settled
        ? undefined
        : Math.abs(tauCurrent) > 1.5
          ? `τ′ = ${decimal(tauCurrent)}`
          : undefined

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 300"
          role="img"
          aria-label="Stan naprężenia, koło Mohra i sprawdzenie warunku maksimum normalnego dla żeliwnej płyty"
        >
          <text x={14} y={20} fontSize={9} fill={MUTED}>
            σx = 50 MPa · σy = −20 MPa · τxy = 40 MPa
          </text>
          <text x={14} y={34} fontSize={9} fill={MUTED}>
            kr = 80 MPa · kc = 200 MPa · σz = 0
          </text>

          {(metric === 'state' || metric === 'principal') && (
            <MohrPanel angle={angle} showCircle={metric === 'principal'} progress={p} />
          )}

          {showChecks && (
            <g>
              <text x={246} y={80} fontSize={9} fill={MUTED}>
                sprawdzenie kryterium
              </text>
              <Gauge
                y={125}
                label="rozciąganie: σ1"
                actual={S1}
                limit={80}
                safety="1,17"
                color={BLUE}
                progress={p}
                active={metric === 'tension' || metric === 'compare'}
              />
              <Gauge
                y={205}
                label="ściskanie: |σ3|"
                actual={Math.abs(S3)}
                limit={200}
                safety="5,24"
                color={ORANGE}
                progress={p}
                active={metric === 'compression' || metric === 'compare'}
              />
              {metric === 'compare' && (
                <g>
                  <circle cx={251} cy={251} r={3.2} fill={BLUE} />
                  <text x={260} y={254} fontSize={9} fontWeight={600} fill={INK}>
                    decyduje rozciąganie — mniejszy zapas
                  </text>
                </g>
              )}
            </g>
          )}

          <StressElement
            angle={angle}
            sx={elementSx}
            sy={elementSy}
            tx={elementTau}
            labelX={labelX}
            labelY={labelY}
            labelTau={labelTau}
            showTau={metric !== 'compare'}
          />

          <text x={115} y={253} textAnchor="middle" fontSize={9} fill={MUTED}>
            {metric === 'state' ? 'stan naprężenia w punkcie' : 'element w kierunkach głównych'}
          </text>
          {isPrincipal && (
            <text x={115} y={267} textAnchor="middle" fontSize={8.5} fill={MUTED}>
              σ2 = 0 (poza płaszczyzną)
            </text>
          )}
        </svg>
      </div>
    </div>
  )
}
