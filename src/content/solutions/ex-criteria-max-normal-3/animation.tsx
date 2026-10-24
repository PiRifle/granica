import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const BLUE = '#4f6df5'
const ORANGE = '#ff6b45'
const GOLD = '#d8a13b'
const GREEN = '#2e9e6b'
const VIOLET = '#a970dd'
const MUTED = '#87929d'
const EDGE = '#68727e'
const INK = '#17202a'
const FILL = '#f3f6fc'
const LIGHT = '#c9d0d9'

const SX = 0
const SY = -40
const C = -20
const A = 20
const TAU_MAX = 92.9
const S1 = 75
const S3 = -115
const ALLOW = 75
const KC_ALLOW = 300

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
  tauUnknown = false,
}: {
  angle: number
  sx: number
  sy: number
  tx: number
  labelX: string
  labelY: string
  labelTau?: string
  tauUnknown?: boolean
}) {
  const cx = 112
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

  const lenX = Math.abs(sx) < 0.05 ? 0 : 7 + 30 * Math.min(1, Math.abs(sx) / 115)
  const lenY = Math.abs(sy) < 0.05 ? 0 : 7 + 30 * Math.min(1, Math.abs(sy) / 115)
  const lenT = tauUnknown ? 16 : Math.abs(tx) < 0.5 ? 0 : 5 + 18 * Math.min(1, Math.abs(tx) / TAU_MAX)
  const signX = Math.sign(sx)
  const signY = Math.sign(sy)
  const signT = tauUnknown ? 1 : Math.sign(tx)
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
              dash={tauUnknown ? '4 3' : undefined}
            />
            <Arrow
              x1={cx - half}
              y1={cy - offset}
              x2={cx - half}
              y2={cy - offset + signT * lenT}
              color={colorT}
              width={1.7}
              dash={tauUnknown ? '4 3' : undefined}
            />
            <Arrow
              x1={cx - offset}
              y1={cy - half}
              x2={cx - offset + signT * lenT}
              y2={cy - half}
              color={colorT}
              width={1.7}
              dash={tauUnknown ? '4 3' : undefined}
            />
            <Arrow
              x1={cx + offset}
              y1={cy + half}
              x2={cx + offset - signT * lenT}
              y2={cy + half}
              color={colorT}
              width={1.7}
              dash={tauUnknown ? '4 3' : undefined}
            />
          </>
        )}
      </g>
      {labelX && (
        <text x={xLabel.x} y={xLabel.y} textAnchor={xAnchor} fontSize={10} fontWeight={600} fill={colorX}>
          {labelX}
        </text>
      )}
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

function MohrPanel({
  tau,
  showCircle,
  showLimit,
  progress,
  unknown = false,
}: {
  tau: number
  showCircle: boolean
  showLimit: boolean
  progress: number
  unknown?: boolean
}) {
  const zeroX = 330
  const axisY = 180
  const scale = 1
  const sx = (value: number) => zeroX + value * scale
  const radius = Math.sqrt(400 + tau * tau)
  const centerX = sx(C)
  const pointX = sx(SX)
  const pointY = axisY - tau * scale
  const limitX = sx(ALLOW)

  return (
    <g>
      <line x1={202} y1={axisY} x2={450} y2={axisY} stroke={LIGHT} strokeWidth={1.2} />
      <line x1={zeroX} y1={72} x2={zeroX} y2={258} stroke={LIGHT} strokeWidth={1} strokeDasharray="4 4" />
      <text x={452} y={axisY - 6} fontSize={9} fill={MUTED}>
        σ
      </text>
      <text x={zeroX + 5} y={78} fontSize={9} fill={MUTED}>
        τ
      </text>
      <line x1={sx(0)} y1={axisY - 4} x2={sx(0)} y2={axisY + 4} stroke={MUTED} strokeWidth={1.2} />
      <text x={sx(0)} y={axisY + 14} textAnchor="middle" fontSize={8} fill={MUTED}>
        0
      </text>

      <line x1={sx(C)} y1={axisY - 5} x2={sx(C)} y2={axisY + 5} stroke={INK} strokeWidth={1.4} />
      <text x={sx(C) - 2} y={axisY + 16} textAnchor="middle" fontSize={9} fill={INK}>
        C = −20
      </text>

      {showLimit && (
        <g>
          <motion.line
            x1={limitX}
            y1={72}
            x2={limitX}
            y2={258}
            stroke={GREEN}
            strokeWidth={1.6}
            strokeDasharray="6 4"
            initial={false}
            animate={{ y2: 72 + 186 * progress }}
            transition={{ duration: 0.18, ease: 'linear' }}
          />
          <text x={limitX + 4} y={84} fontSize={8.5} fill={GREEN}>
            σdop = 75
          </text>
        </g>
      )}

      {showCircle && (
        <>
          <circle cx={centerX} cy={axisY} r={radius} fill="none" stroke={VIOLET} strokeWidth={2} />
          <line
            x1={centerX}
            y1={axisY}
            x2={pointX}
            y2={pointY}
            stroke={VIOLET}
            strokeWidth={1.2}
            strokeDasharray="3 3"
          />
          <line
            x1={sx(S1)}
            y1={axisY - 5}
            x2={sx(S1)}
            y2={axisY + 5}
            stroke={BLUE}
            strokeWidth={1.8}
            opacity={showLimit ? 1 : 0.55}
          />
          <line
            x1={sx(S3)}
            y1={axisY - 5}
            x2={sx(S3)}
            y2={axisY + 5}
            stroke={ORANGE}
            strokeWidth={1.8}
            opacity={showLimit ? 1 : 0.55}
          />
          {showLimit && (
            <>
              <text x={sx(S1)} y={axisY + 20} textAnchor="middle" fontSize={9} fontWeight={600} fill={BLUE}>
                σ1 = 75
              </text>
              <text x={sx(S3)} y={axisY + 20} textAnchor="middle" fontSize={9} fontWeight={600} fill={ORANGE}>
                σ3 = −115
              </text>
              <circle cx={limitX} cy={axisY} r={4} fill={GREEN} stroke="#fff" strokeWidth={1.2} />
              <text x={limitX - 6} y={axisY - 9} textAnchor="end" fontSize={8.5} fill={GREEN}>
                styk
              </text>
            </>
          )}
        </>
      )}

      <circle cx={pointX} cy={pointY} r={4.2} fill={VIOLET} stroke="#fff" strokeWidth={1.2} />
      <text x={pointX + 8} y={pointY - 8} fontSize={9} fill={VIOLET}>
        {tau > 0.5 ? `(0; ${decimal(tau)})` : 'τ = ?'}
      </text>
      <text x={202} y={250} fontSize={8.5} fill={MUTED}>
        {unknown ? 'τ jest niewiadome' : progress < 0.02 ? 'brak ścinania — tylko σy' : `R = ${decimal(radius)} MPa`}
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
  const x = 240
  const width = 158
  const ratio = Math.min(1, actual / limit)
  const fillWidth = width * ratio * progress
  return (
    <g opacity={active ? 1 : 0.4}>
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
        {actual} MPa
      </text>
      <text x={x + width} y={y + 27} textAnchor="end" fontSize={8.5} fill={MUTED}>
        granica {limit} MPa
      </text>
    </g>
  )
}

export function MaxNormalExample3Animation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'state'
  const p = playing ? smooth(sceneProgress) : 1
  const tau = metric === 'state' ? 0 : metric === 'mohr' ? TAU_MAX * p : TAU_MAX
  const angle = (Math.atan2(2 * tau, SX - SY) * 180) / Math.PI / 2
  const rad = (2 * angle * Math.PI) / 180
  const sxCurrent = C + A * Math.cos(rad) + tau * Math.sin(rad)
  const syCurrent = C - A * Math.cos(rad) - tau * Math.sin(rad)
  const tauCurrent = -A * Math.sin(rad) + tau * Math.cos(rad)
  const settled = metric === 'limit' || metric === 'check'

  const labelX = metric === 'state' ? '' : settled ? 'σ1 = 75' : `σx′ = ${decimal(sxCurrent)}`
  const labelY = metric === 'state' ? 'σy = −40' : settled ? 'σ3 = −115' : `σy′ = ${decimal(syCurrent)}`
  const labelTau =
    metric === 'state'
      ? 'τ = ?'
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
          aria-label="Wpływ ścinania na naprężenia główne i wyznaczenie maksymalnego τxy dla kryterium maksimum normalnego"
        >
          <text x={14} y={20} fontSize={9} fill={MUTED}>
            σx = 0 · σy = −40 MPa · kr = 150 MPa
          </text>
          <text x={14} y={34} fontSize={9} fill={MUTED}>
            n = 2,0 · σdop = kr/n = 75 MPa
          </text>

          <StressElement
            angle={angle}
            sx={metric === 'state' ? SX : settled ? S1 : sxCurrent}
            sy={metric === 'state' ? SY : settled ? S3 : syCurrent}
            tx={metric === 'state' ? 0 : settled ? 0 : tauCurrent}
            labelX={labelX}
            labelY={labelY}
            labelTau={labelTau}
            tauUnknown={metric === 'state'}
          />

          {metric === 'state' && (
            <g>
              <text x={202} y={92} fontSize={9} fill={MUTED}>
                stan naprężenia i granica
              </text>
              <MohrPanel tau={0} showCircle={false} showLimit={true} progress={1} unknown />
              <text x={202} y={272} fontSize={8.5} fill={MUTED}>
                szukamy największego τ, przy którym σ1 osiąga 75 MPa
              </text>
            </g>
          )}

          {metric === 'mohr' && <MohrPanel tau={tau} showCircle={true} showLimit={false} progress={p} />}

          {metric === 'limit' && (
            <g>
              <MohrPanel tau={TAU_MAX} showCircle={true} showLimit={true} progress={p} />
              <text x={202} y={272} fontSize={8.5} fill={MUTED}>
                koło styka się z granicą przy σ1 = 75 MPa
              </text>
            </g>
          )}

          {metric === 'check' && (
            <g>
              <text x={240} y={82} fontSize={9} fill={MUTED}>
                sprawdzenie przy τ_max
              </text>
              <Gauge
                y={128}
                label="rozciąganie: σ1"
                actual={ALLOW}
                limit={ALLOW}
                safety="2,0"
                color={BLUE}
                progress={p}
                active={true}
              />
              <Gauge
                y={205}
                label="ściskanie: |σ3|"
                actual={Math.abs(S3)}
                limit={KC_ALLOW}
                safety="5,22"
                color={ORANGE}
                progress={p}
                active={true}
              />
              <circle cx={245} cy={250} r={3} fill={BLUE} />
              <text x={253} y={253} fontSize={9} fontWeight={600} fill={INK}>
                decyduje rozciąganie — granica osiągnięta
              </text>
              <text x={240} y={279} fontSize={8.5} fill={MUTED}>
                kc = 600 MPa, więc kc/n = 300 MPa
              </text>
            </g>
          )}
        </svg>
      </div>
    </div>
  )
}
