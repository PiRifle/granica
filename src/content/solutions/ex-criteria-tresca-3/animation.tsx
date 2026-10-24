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
const LIGHT = '#d7dce3'
const OK = '#2e9e6b'

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}

const SIGMA = 50
const ALLOW = 140
const TAU_LIMIT = 65.4
const S1 = 95.02
const S2 = -45.02
const S3 = 0
const TAU_MAX = (S1 - S2) / 2
const TAU_HMH = 75.5

const GX0 = 64
const GX1 = 436
const GY0 = 246
const GY1 = 52
const TAU_DOMAIN = 90
const SIGMA_DOMAIN = 200

const gx = (tau: number) => GX0 + (tau / TAU_DOMAIN) * (GX1 - GX0)
const gy = (value: number) => GY0 - (value / SIGMA_DOMAIN) * (GY0 - GY1)

function sigmaT(tau: number) {
  return Math.sqrt(SIGMA * SIGMA + 4 * tau * tau)
}

const MX0 = 186
const MX1 = 446
const DMIN = -60
const DMAX = 115
const MY = 184
const MSCALE = (MX1 - MX0) / (DMAX - DMIN)
const mx = (value: number) => MX0 + (value - DMIN) * MSCALE
const mY = (value: number) => MY - value * MSCALE

function Arrow({
  x1,
  y1,
  x2,
  y2,
  color,
  width = 2,
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
  if (length < 0.8) return null
  const head = Math.min(6, length * 0.65)
  const wing = Math.min(3, length * 0.32)
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

function StressElement({ draw, faded = false }: { draw: number; faded?: boolean }) {
  const x0 = 38
  const y0 = 98
  const side = 94
  const x1 = x0 + side
  const y1 = y0 + side
  const cx = (x0 + x1) / 2
  const cy = (y0 + y1) / 2
  const lenX = 26 * draw
  const lenT = 8 + 18 * draw
  const opacity = faded ? 0.45 : 1

  return (
    <g opacity={opacity}>
      <rect x={x0} y={y0} width={side} height={side} rx={3} fill={FILL} stroke={EDGE} strokeWidth={1.5} />

      <Arrow x1={x1} y1={cy} x2={x1 + lenX} y2={cy} color={BLUE} width={2.2} />
      <Arrow x1={x0} y1={cy} x2={x0 - lenX} y2={cy} color={BLUE} width={2.2} />
      <Arrow x1={x1 + 9} y1={y1 - 20} x2={x1 + 9} y2={y1 - 20 - lenT} color={ORANGE} width={1.9} />
      <Arrow x1={x0 - 9} y1={y0 + 20} x2={x0 - 9} y2={y0 + 20 + lenT} color={ORANGE} width={1.9} />
      <Arrow x1={x0 + 20} y1={y0 - 9} x2={x0 + 20 + lenT} y2={y0 - 9} color={ORANGE} width={1.9} />
      <Arrow x1={x1 - 20} y1={y1 + 9} x2={x1 - 20 - lenT} y2={y1 + 9} color={ORANGE} width={1.9} />

      <text x={x1 + lenX + 3} y={cy + 3} fontSize={9} fontWeight={700} fill={BLUE}>
        σ = 50 MPa
      </text>
      <text x={x1 - 2} y={y0 - 16} fontSize={9} fontWeight={700} fill={ORANGE}>
        τ = ?
      </text>
      <text x={x0} y={y1 + 46} fontSize={8} fill={MUTED}>
        τ rośnie, aż σ_T osiągnie wartość dopuszczalną
      </text>
    </g>
  )
}

function LimitGauge({ progress }: { progress: number }) {
  const gx0 = 292
  const gx1 = 360
  const top = 74
  const bottom = 244
  const yOf = (value: number) => bottom - (value / 160) * (bottom - top)
  const allowY = yOf(ALLOW)

  return (
    <g>
      <text x={196} y={78} fontSize={10} fontWeight={700} fill={INK}>
        granica dopuszczalna
      </text>
      <text x={196} y={93} fontSize={8.5} fill={MUTED}>
        σ_T,dop = 140 MPa
      </text>
      <rect x={gx0} y={allowY} width={gx1 - gx0} height={bottom - allowY} rx={4} fill={OK} fillOpacity={0.08} />
      <line x1={gx0} y1={bottom} x2={gx1} y2={bottom} stroke={MUTED} strokeWidth={1.1} />
      <line x1={gx0} y1={bottom} x2={gx0} y2={top} stroke={MUTED} strokeWidth={1.1} />
      <line x1={gx0 - 4} y1={allowY} x2={gx1 + 4} y2={allowY} stroke={ORANGE} strokeWidth={1.8} strokeDasharray="5 4" />
      <text x={gx1 + 7} y={allowY + 3} fontSize={8.5} fontWeight={700} fill={ORANGE}>
        140
      </text>
      {[0, 50, 100, 160].map((tick) => (
        <g key={tick}>
          <line x1={gx0 - 4} y1={yOf(tick)} x2={gx0 + 4} y2={yOf(tick)} stroke={MUTED} strokeWidth={1} />
          <text x={gx0 - 7} y={yOf(tick) + 3} textAnchor="end" fontSize={8} fill={MUTED}>
            {tick}
          </text>
        </g>
      ))}
      <text x={gx0 - 34} y={top - 8} fontSize={8} fill={MUTED}>
        σ_T
      </text>

      <motion.g
        initial={{ opacity: 0.4 }}
        animate={{ opacity: 0.4 + 0.6 * Math.min(1, progress * 2) }}
        transition={{ duration: 0.25 }}
      >
        <line
          x1={gx0 + 34}
          y1={bottom}
          x2={gx0 + 34}
          y2={yOf(112)}
          stroke={VIOLET}
          strokeWidth={1.4}
          strokeDasharray="4 4"
        />
        <circle cx={gx0 + 34} cy={yOf(112)} r={4.2} fill={VIOLET} />
        <text x={gx0 + 44} y={yOf(112) + 4} fontSize={9} fontWeight={700} fill={VIOLET}>
          σ_T = ?
        </text>
      </motion.g>
      <text x={196} y={266} fontSize={8.5} fill={MUTED}>
        Nie znamy jeszcze τ, ale znamy limit naprężenia zredukowanego.
      </text>
    </g>
  )
}

function curvePath(tauEnd: number) {
  const steps = Math.max(2, Math.ceil((tauEnd / TAU_DOMAIN) * 90))
  const points: string[] = []
  for (let index = 0; index <= steps; index += 1) {
    const tau = (tauEnd * index) / steps
    points.push(`${gx(tau)} ${gy(sigmaT(tau))}`)
  }
  return points.length > 1 ? `M ${points.join(' L ')}` : ''
}

function ConditionChart({ draw }: { draw: number }) {
  const tauCurrent = TAU_LIMIT * draw
  const sigmaCurrent = sigmaT(tauCurrent)
  const showLimit = draw > 0.72

  return (
    <g>
      <text x={16} y={22} fontSize={10} fontWeight={700} fill={INK}>
        warunek Tresca: σ_T rośnie z τ
      </text>
      <text x={16} y={37} fontSize={8.5} fill={MUTED}>
        σ = 50 MPa · σ_T,dop = 140 MPa
      </text>

      <line x1={GX0 - 10} y1={GY0} x2={GX1 + 8} y2={GY0} stroke={MUTED} strokeWidth={1.1} />
      <line x1={GX0} y1={GY0 + 8} x2={GX0} y2={GY1 - 12} stroke={MUTED} strokeWidth={1.1} />
      <text x={GX1 + 8} y={GY0 + 14} textAnchor="end" fontSize={8} fill={MUTED}>
        τ [MPa]
      </text>
      <text x={GX0 + 4} y={GY1 - 4} fontSize={8} fill={MUTED}>
        σ_T [MPa]
      </text>

      {[0, 30, 60, 90].map((tick) => (
        <g key={`tau-${tick}`}>
          <line x1={gx(tick)} y1={GY0 - 4} x2={gx(tick)} y2={GY0 + 4} stroke={MUTED} strokeWidth={1} />
          <text x={gx(tick)} y={GY0 + 16} textAnchor="middle" fontSize={8} fill={MUTED}>
            {tick}
          </text>
        </g>
      ))}
      {[0, 50, 100, 140, 200].map((tick) => (
        <g key={`sigma-${tick}`}>
          <line x1={GX0 - 4} y1={gy(tick)} x2={GX0 + 4} y2={gy(tick)} stroke={MUTED} strokeWidth={1} />
          <text x={GX0 - 7} y={gy(tick) + 3} textAnchor="end" fontSize={8} fill={MUTED}>
            {tick}
          </text>
        </g>
      ))}

      <line x1={GX0} y1={gy(ALLOW)} x2={GX1} y2={gy(ALLOW)} stroke={ORANGE} strokeWidth={1.7} strokeDasharray="6 4" />
      <text x={GX1 - 4} y={gy(ALLOW) - 6} textAnchor="end" fontSize={8.5} fontWeight={700} fill={ORANGE}>
        σ_T,dop = 140 MPa
      </text>

      <path d={curvePath(tauCurrent)} fill="none" stroke={BLUE} strokeWidth={2.8} strokeLinecap="round" />
      <circle cx={gx(tauCurrent)} cy={gy(sigmaCurrent)} r={4.5} fill={BLUE} stroke="#fff" strokeWidth={1.2} />
      <text x={gx(tauCurrent) + 8} y={gy(sigmaCurrent) - 8} fontSize={8.5} fontWeight={700} fill={BLUE}>
        σ_T(τ)
      </text>

      {showLimit && (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
          <line x1={gx(TAU_LIMIT)} y1={GY0} x2={gx(TAU_LIMIT)} y2={gy(ALLOW)} stroke={VIOLET} strokeDasharray="4 4" />
          <line x1={GX0} y1={gy(ALLOW)} x2={gx(TAU_LIMIT)} y2={gy(ALLOW)} stroke={VIOLET} strokeDasharray="4 4" />
          <circle cx={gx(TAU_LIMIT)} cy={gy(ALLOW)} r={4.8} fill={ORANGE} stroke="#fff" strokeWidth={1.2} />
          <text x={gx(TAU_LIMIT)} y={GY0 + 30} textAnchor="middle" fontSize={9} fontWeight={700} fill={VIOLET}>
            τ = 65,4
          </text>
        </motion.g>
      )}

      <text x={GX0} y={278} fontSize={8.5} fill={MUTED}>
        Krzywa przecina limit przy τ = 65,4 MPa; większe τ przekracza σ_T,dop.
      </text>
    </g>
  )
}

function MohrAxes() {
  return (
    <g>
      <line x1={MX0 - 8} y1={MY} x2={MX1 + 8} y2={MY} stroke={MUTED} strokeWidth={1.1} />
      <Arrow x1={MX1} y1={MY} x2={MX1 + 10} y2={MY} color={MUTED} width={1} />
      <text x={MX1 + 10} y={MY + 14} textAnchor="end" fontSize={8} fill={MUTED}>
        σ [MPa]
      </text>
      <line x1={mx(0)} y1={MY + 70} x2={mx(0)} y2={MY - 118} stroke={LIGHT} strokeWidth={1} />
      <text x={mx(0) + 5} y={MY - 116} fontSize={8} fill={MUTED}>
        τ
      </text>
      {[-60, -30, 0, 30, 60, 90].map((tick) => (
        <g key={tick}>
          <line x1={mx(tick)} y1={MY - 4} x2={mx(tick)} y2={MY + 4} stroke={MUTED} strokeWidth={1} />
          <text x={mx(tick)} y={MY + 16} textAnchor="middle" fontSize={8} fill={MUTED}>
            {tick}
          </text>
        </g>
      ))}
    </g>
  )
}

function Circle({
  center,
  radius,
  draw,
  color,
  dashed = false,
  width = 2.2,
  opacity = 1,
}: {
  center: number
  radius: number
  draw: number
  color: string
  dashed?: boolean
  width?: number
  opacity?: number
}) {
  return (
    <motion.circle
      cx={mx(center)}
      cy={MY}
      r={radius * MSCALE}
      fill="none"
      stroke={color}
      strokeWidth={width}
      strokeDasharray={dashed ? '6 5' : undefined}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: draw, opacity }}
      transition={{ duration: 0.55, ease: 'easeInOut' }}
    />
  )
}

function MohrScene({ draw }: { draw: number }) {
  const first = clamp01(draw / 0.8)
  const second = clamp01((draw - 0.12) / 0.8)
  const third = clamp01((draw - 0.24) / 0.76)

  return (
    <g>
      <text x={16} y={22} fontSize={10} fontWeight={700} fill={INK}>
        maksymalne ścinanie przy granicy Tresca
      </text>
      <text x={16} y={37} fontSize={8.5} fill={MUTED}>
        σ₁ = 95,02 · σ₂ = −45,02 · σ₃ = 0 MPa
      </text>
      <g opacity={0.5}>
        <StressElement draw={1} faded />
      </g>
      <text x={MX0} y={78} fontSize={10} fontWeight={700} fill={INK}>
        trzy koła przy τ = 65,4 MPa
      </text>
      <text x={MX0} y={93} fontSize={8.5} fill={MUTED}>
        największe koło obejmuje σ₁ i σ₂
      </text>
      <MohrAxes />

      <Circle
        center={(S1 + S3) / 2}
        radius={(S1 - S3) / 2}
        draw={first}
        color={BLUE}
        dashed
        width={1.5}
        opacity={0.55}
      />
      <Circle
        center={(S2 + S3) / 2}
        radius={(S2 - S3) / 2}
        draw={second}
        color={GREEN}
        dashed
        width={1.5}
        opacity={0.55}
      />
      <Circle center={(S1 + S2) / 2} radius={TAU_MAX} draw={third} color={ORANGE} width={2.7} opacity={1} />

      {[
        { value: S1, label: 'σ₁ = 95,02', color: BLUE },
        { value: S2, label: 'σ₂ = −45,02', color: GREEN },
        { value: S3, label: 'σ₃ = 0', color: MUTED },
      ].map((item, index) => (
        <g key={item.value}>
          <circle cx={mx(item.value)} cy={MY} r={4} fill={item.color} stroke="#fff" strokeWidth={1} />
          <text
            x={mx(item.value)}
            y={MY + 32 + (index % 2) * 13}
            textAnchor="middle"
            fontSize={8.5}
            fontWeight={item.value === S2 || item.value === S1 ? 700 : 400}
            fill={item.color}
          >
            {item.label}
          </text>
        </g>
      ))}

      <motion.g initial={{ opacity: 0 }} animate={{ opacity: draw > 0.55 ? 1 : 0 }} transition={{ duration: 0.3 }}>
        <circle cx={mx((S1 + S2) / 2)} cy={MY} r={3.2} fill={INK} />
        <line
          x1={mx((S1 + S2) / 2)}
          y1={MY}
          x2={mx((S1 + S2) / 2)}
          y2={mY(TAU_MAX)}
          stroke={VIOLET}
          strokeWidth={2.1}
          markerEnd="url(#tresca3-arrow-violet)"
        />
        <text x={mx((S1 + S2) / 2) + 6} y={mY(TAU_MAX) + 34} fontSize={8.5} fontWeight={700} fill={VIOLET}>
          τ_max = 70,02 MPa
        </text>
      </motion.g>

      <text x={MX0} y={270} fontSize={8.5} fill={MUTED}>
        σ_T = 2τ_max = 140 MPa, czyli dokładnie tyle, ile dopuszcza limit.
      </text>
    </g>
  )
}

function SafetyCheck({ progress }: { progress: number }) {
  const x0 = 68
  const x1 = 420
  const scale = (x1 - x0) / 90
  const trescaWidth = TAU_LIMIT * scale * progress
  const hmhWidth = TAU_HMH * scale * progress

  return (
    <g>
      <text x={16} y={22} fontSize={10} fontWeight={700} fill={INK}>
        granica Tresca i porównanie z HMH
      </text>
      <text x={16} y={37} fontSize={8.5} fill={MUTED}>
        dopuszczalne σ_T = 140 MPa przy σ = 50 MPa
      </text>

      <text x={x0} y={88} fontSize={9} fontWeight={700} fill={ORANGE}>
        Tresca: τ_dop = 65,4 MPa
      </text>
      <rect x={x0} y={96} width={x1 - x0} height={22} rx={4} fill="#eef1f5" />
      <motion.rect
        x={x0}
        y={96}
        width={trescaWidth}
        height={22}
        rx={4}
        fill={ORANGE}
        fillOpacity={0.85}
        initial={{ width: 0 }}
        animate={{ width: trescaWidth }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      />
      <text x={x0 + trescaWidth + 6} y={111} fontSize={8.5} fontWeight={700} fill={ORANGE}>
        65,4
      </text>

      <text x={x0} y={144} fontSize={9} fontWeight={700} fill={BLUE}>
        HMH: τ_dop = 75,5 MPa
      </text>
      <rect x={x0} y={152} width={x1 - x0} height={22} rx={4} fill="#eef1f5" />
      <motion.rect
        x={x0}
        y={152}
        width={hmhWidth}
        height={22}
        rx={4}
        fill={BLUE}
        fillOpacity={0.55}
        initial={{ width: 0 }}
        animate={{ width: hmhWidth }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      />
      <text x={x0 + hmhWidth + 6} y={167} fontSize={8.5} fontWeight={700} fill={BLUE}>
        75,5
      </text>

      <line
        x1={x0 + TAU_LIMIT * scale}
        y1={82}
        x2={x0 + TAU_LIMIT * scale}
        y2={196}
        stroke={ORANGE}
        strokeWidth={1.4}
        strokeDasharray="4 3"
      />
      <text x={x0 + TAU_LIMIT * scale - 4} y={78} textAnchor="end" fontSize={8.5} fontWeight={700} fill={ORANGE}>
        granica Tresca
      </text>

      <text x={x0} y={218} fontSize={9} fill={MUTED}>
        Przy τ = 65,4 MPa: σ_T = 140 MPa, a HMH daje tylko 123,8 MPa.
      </text>
      <text x={x0} y={236} fontSize={9} fill={MUTED}>
        Wykorzystanie granicy: Tresca 100%, HMH 88,4%.
      </text>
      <text x={x0} y={258} fontSize={9} fontWeight={700} fill={ORANGE}>
        Tresca jest około 1,15 razy bardziej restrykcyjna.
      </text>
      <text x={x0} y={278} fontSize={8} fill={MUTED}>
        Większe dopuszczalne τ według HMH nie jest błędem — to inny model.
      </text>
    </g>
  )
}

export function TrescaExample3Animation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'state'
  const p = playing ? smooth(sceneProgress) : 1
  const draw = clamp01(p)

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 300"
          role="img"
          aria-label="Element rozciągany naprężeniem 50 MPa i ścinany zmiennym naprężeniem do 65,4 MPa. Krzywa Tresca przecina limit 140 MPa, a trzy koła Mohra dają maksymalne ścinanie 70,02 MPa."
        >
          <defs>
            <marker
              id="tresca3-arrow-muted"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={MUTED} />
            </marker>
            <marker
              id="tresca3-arrow-violet"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={VIOLET} />
            </marker>
          </defs>

          {metric === 'state' && (
            <g>
              <text x={16} y={22} fontSize={10} fontWeight={700} fill={INK}>
                rozciąganie i ścinanie w punkcie
              </text>
              <text x={16} y={37} fontSize={8.5} fill={MUTED}>
                σ = 50 MPa · σ_T,dop = 140 MPa · szukane τ
              </text>
              <StressElement draw={draw} />
              <LimitGauge progress={draw} />
              <text x={16} y={284} fontSize={8.5} fill={MUTED}>
                Szukamy największego τ, przy którym σ_T nie przekracza limitu.
              </text>
            </g>
          )}

          {metric === 'condition' && <ConditionChart draw={draw} />}
          {metric === 'maxshear' && <MohrScene draw={draw} />}
          {metric === 'check' && <SafetyCheck progress={draw} />}
        </svg>
      </div>
    </div>
  )
}
