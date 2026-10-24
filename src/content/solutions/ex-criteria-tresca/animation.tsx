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

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}

const MOHR_X0 = 178
const MOHR_X1 = 446
const DOMAIN_MIN = -15
const DOMAIN_MAX = 135
const MOHR_Y = 190
const MOHR_SCALE = (MOHR_X1 - MOHR_X0) / (DOMAIN_MAX - DOMAIN_MIN)

const mx = (value: number) => MOHR_X0 + (value - DOMAIN_MIN) * MOHR_SCALE
const mY = (value: number) => MOHR_Y - value * MOHR_SCALE

const S1 = 120
const S2 = 60
const S3 = 0
const RE = 355
const SIGMA_T = 120
const TAU_MAX = 60

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

function PrincipalElement({
  draw,
  highlight = 'none',
  showShearPlane = false,
}: {
  draw: number
  highlight?: 'none' | 'extreme'
  showShearPlane?: boolean
}) {
  const x0 = 34
  const y0 = 104
  const side = 86
  const x1 = x0 + side
  const y1 = y0 + side
  const cx = (x0 + x1) / 2
  const cy = (y0 + y1) / 2
  const len1 = (10 + 32 * Math.min(1, S1 / 120)) * draw
  const len2 = (10 + 32 * Math.min(1, S2 / 120)) * draw
  const dimS2 = highlight === 'extreme' ? 0.3 : 1

  return (
    <g>
      <motion.rect
        x={x0}
        y={y0}
        width={side}
        height={side}
        rx={3}
        fill={FILL}
        stroke={EDGE}
        strokeWidth={1.5}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.55, ease: 'easeInOut' }}
      />

      <Arrow x1={x1} y1={cy} x2={x1 + len1} y2={cy} color={BLUE} width={2.2} />
      <Arrow x1={x0} y1={cy} x2={x0 - len1} y2={cy} color={BLUE} width={2.2} />
      <Arrow x1={cx} y1={y0} x2={cx} y2={y0 - len2} color={GREEN} width={2.2} opacity={dimS2} />
      <Arrow x1={cx} y1={y1} x2={cx} y2={y1 + len2} color={GREEN} width={2.2} opacity={dimS2} />

      <text x={x1 + len1 + 3} y={cy + 3} fontSize={8.5} fontWeight={700} fill={BLUE}>
        σ₁ = 120
      </text>
      <text x={cx + 4} y={y0 - len2 - 4} fontSize={8.5} fontWeight={700} fill={GREEN} opacity={dimS2}>
        σ₂ = 60
      </text>

      <line x1={cx - 14} y1={cy + 14} x2={cx + 14} y2={cy - 14} stroke={MUTED} strokeWidth={1} strokeDasharray="2 2" />
      <circle cx={cx} cy={cy} r={2.6} fill={INK} />
      <text x={cx + 18} y={cy + 4} fontSize={8} fill={MUTED}>
        σ₃ = 0
      </text>

      {showShearPlane && (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: draw > 0.55 ? 1 : 0 }} transition={{ duration: 0.3 }}>
          <line
            x1={x0 + 12}
            y1={y1 - 12}
            x2={x1 - 12}
            y2={y0 + 12}
            stroke={ORANGE}
            strokeWidth={2.4}
            strokeDasharray="5 3"
          />
          <path d={`M ${cx - 12} ${cy + 12} A 17 17 0 0 0 ${cx + 12} ${cy - 12}`} fill="none" stroke={ORANGE} />
          <text x={cx + 6} y={cy - 12} fontSize={8.5} fontWeight={700} fill={ORANGE}>
            45°
          </text>
          <text x={x0} y={228} fontSize={8} fill={ORANGE}>
            płaszczyzna maksymalnego ścinania
          </text>
        </motion.g>
      )}

      <text x={x0} y={showShearPlane ? 242 : 232} fontSize={8} fill={MUTED}>
        σ₃ działa prostopadle do płaszczyzny
      </text>
    </g>
  )
}

function OrderedAxis({ progress }: { progress: number }) {
  const x0 = 194
  const x1 = 432
  const y = 188
  const ox = (value: number) => x0 + (value / 130) * (x1 - x0)
  const values = [
    { value: S3, label: 'σ₃ = 0', color: MUTED },
    { value: S2, label: 'σ₂ = 60', color: GREEN },
    { value: S1, label: 'σ₁ = 120', color: BLUE },
  ]

  return (
    <g>
      <text x={x0} y={78} fontSize={10} fontWeight={700} fill={INK}>
        porządek naprężeń głównych
      </text>
      <text x={x0} y={93} fontSize={8.5} fill={MUTED}>
        σ₁ ≥ σ₂ ≥ σ₃
      </text>
      <line x1={x0} y1={y} x2={x1} y2={y} stroke={MUTED} strokeWidth={1.1} />
      <Arrow x1={x1 - 8} y1={y} x2={x1 + 8} y2={y} color={MUTED} width={1} />
      <text x={x1 + 8} y={y + 14} textAnchor="end" fontSize={8} fill={MUTED}>
        σ [MPa]
      </text>
      {[0, 30, 60, 90, 120].map((tick) => (
        <g key={tick}>
          <line x1={ox(tick)} y1={y - 4} x2={ox(tick)} y2={y + 4} stroke={LIGHT} strokeWidth={1} />
          <text x={ox(tick)} y={y + 16} textAnchor="middle" fontSize={8} fill={MUTED}>
            {tick}
          </text>
        </g>
      ))}
      {values.map((item, index) => (
        <motion.g
          key={item.label}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: Math.max(0, Math.min(1, progress * 1.4 - index * 0.18)), y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <line x1={ox(item.value)} y1={y} x2={ox(item.value)} y2={y - 34 - (index % 2) * 15} stroke={item.color} />
          <circle cx={ox(item.value)} cy={y} r={4.2} fill={item.color} stroke="#fff" strokeWidth={1} />
          <text
            x={ox(item.value)}
            y={y - 40 - (index % 2) * 15}
            textAnchor="middle"
            fontSize={9.5}
            fontWeight={700}
            fill={item.color}
          >
            {item.label}
          </text>
        </motion.g>
      ))}
    </g>
  )
}

function MohrAxes({ showTicks = true }: { showTicks?: boolean }) {
  return (
    <g>
      <line x1={MOHR_X0 - 8} y1={MOHR_Y} x2={MOHR_X1 + 8} y2={MOHR_Y} stroke={MUTED} strokeWidth={1.1} />
      <Arrow x1={MOHR_X1} y1={MOHR_Y} x2={MOHR_X1 + 10} y2={MOHR_Y} color={MUTED} width={1} />
      <text x={MOHR_X1 + 10} y={MOHR_Y + 14} textAnchor="end" fontSize={8} fill={MUTED}>
        σ [MPa]
      </text>
      <line x1={mx(0)} y1={MOHR_Y + 72} x2={mx(0)} y2={MOHR_Y - 112} stroke={LIGHT} strokeWidth={1} />
      <text x={mx(0) + 5} y={MOHR_Y - 80} fontSize={8} fill={MUTED}>
        τ [MPa]
      </text>
      {showTicks &&
        [0, 60, 120].map((tick) => (
          <g key={tick}>
            <line x1={mx(tick)} y1={MOHR_Y - 4} x2={mx(tick)} y2={MOHR_Y + 4} stroke={MUTED} strokeWidth={1} />
            <text x={mx(tick)} y={MOHR_Y + 16} textAnchor="middle" fontSize={8} fill={MUTED}>
              {tick}
            </text>
          </g>
        ))}
    </g>
  )
}

function MohrCircle({
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
      cy={MOHR_Y}
      r={radius * MOHR_SCALE}
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

function StressMarkers({ metric }: { metric: string }) {
  const items = [
    { value: S1, label: 'σ₁ = 120', color: BLUE },
    { value: S2, label: 'σ₂ = 60', color: GREEN },
    { value: S3, label: 'σ₃ = 0', color: MUTED },
  ]
  return (
    <g>
      {items.map((item) => {
        const active = metric === 'tresca' ? item.value === S1 || item.value === S3 : true
        const color = metric === 'tresca' && active ? ORANGE : item.color
        return (
          <g key={item.value}>
            <circle cx={mx(item.value)} cy={MOHR_Y} r={4} fill={color} stroke="#fff" strokeWidth={1} />
            {!(metric === 'tresca' && item.value === S2) && (
              <text
                x={mx(item.value)}
                y={MOHR_Y + 32}
                textAnchor="middle"
                fontSize={8.5}
                fontWeight={active ? 700 : 400}
                fill={color}
                opacity={metric === 'tresca' && !active ? 0.45 : 1}
              >
                {item.label}
              </text>
            )}
          </g>
        )
      })}
    </g>
  )
}

function MohrScene({ metric, draw }: { metric: string; draw: number }) {
  const circleDraw = clamp01((draw - 0.05) / 0.95)
  const highlightLargest = metric === 'maxshear' || metric === 'tresca'
  const others = highlightLargest ? 0.24 : 0.8

  return (
    <g>
      <text x={MOHR_X0} y={78} fontSize={10} fontWeight={700} fill={INK}>
        {metric === 'circles'
          ? 'trzy koła Mohra'
          : metric === 'maxshear'
            ? 'promień największego koła'
            : 'średnica największego koła'}
      </text>
      <text x={MOHR_X0} y={93} fontSize={8.5} fill={MUTED}>
        pary (1,2), (2,3) i (3,1)
      </text>
      <MohrAxes />
      <MohrCircle
        center={(S1 + S2) / 2}
        radius={(S1 - S2) / 2}
        draw={circleDraw}
        color={BLUE}
        dashed
        width={1.6}
        opacity={others}
      />
      <MohrCircle
        center={(S2 + S3) / 2}
        radius={(S2 - S3) / 2}
        draw={circleDraw}
        color={GREEN}
        dashed
        width={1.6}
        opacity={others}
      />
      <MohrCircle
        center={(S1 + S3) / 2}
        radius={(S1 - S3) / 2}
        draw={circleDraw}
        color={ORANGE}
        width={2.7}
        opacity={1}
      />
      <StressMarkers metric={metric} />

      {metric === 'circles' && (
        <g fontSize={8} textAnchor="middle">
          <text x={mx(90)} y={mY(30) - 5} fill={BLUE}>
            1–2
          </text>
          <text x={mx(30)} y={mY(30) - 5} fill={GREEN}>
            2–3
          </text>
          <text x={mx(60)} y={mY(60) - 6} fill={ORANGE}>
            1–3
          </text>
          <text x={MOHR_X0} y={252} fontSize={8.5} fill={MUTED}>
            Największe jest koło pary (1,3), bo różnica 120 − 0 jest największa.
          </text>
        </g>
      )}

      {metric === 'maxshear' && (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: draw > 0.55 ? 1 : 0 }} transition={{ duration: 0.3 }}>
          <circle cx={mx(60)} cy={MOHR_Y} r={3.4} fill={INK} />
          <text x={mx(60) - 4} y={MOHR_Y + 32} textAnchor="end" fontSize={8.5} fill={INK}>
            C = 60
          </text>
          <line
            x1={mx(60)}
            y1={MOHR_Y}
            x2={mx(60)}
            y2={mY(TAU_MAX)}
            stroke={VIOLET}
            strokeWidth={2.2}
            markerEnd="url(#tresca1-arrow-violet)"
          />
          <text x={mx(60) + 6} y={mY(TAU_MAX) + 16} fontSize={9} fontWeight={700} fill={VIOLET}>
            τ_max = 60 MPa
          </text>
          <text x={MOHR_X0} y={252} fontSize={8.5} fill={ORANGE}>
            Promień koła (1,3) to maksymalne ścinanie w punkcie.
          </text>
        </motion.g>
      )}

      {metric === 'tresca' && (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: draw > 0.5 ? 1 : 0 }} transition={{ duration: 0.3 }}>
          <line
            x1={mx(S3)}
            y1={MOHR_Y}
            x2={mx(S1)}
            y2={MOHR_Y}
            stroke={ORANGE}
            strokeWidth={3}
            markerStart="url(#tresca1-arrow-orange-start)"
            markerEnd="url(#tresca1-arrow-orange)"
          />
          <text x={mx((S1 + S3) / 2)} y={MOHR_Y + 50} textAnchor="middle" fontSize={9} fontWeight={700} fill={ORANGE}>
            σ_T = 120 MPa = 2τ_max
          </text>
          <text x={MOHR_X0} y={252} fontSize={8.5} fill={MUTED}>
            Średnica największego koła jest równa naprężeniu zredukowanemu.
          </text>
        </motion.g>
      )}
    </g>
  )
}

function SafetyCheck({ progress }: { progress: number }) {
  const x0 = 62
  const x1 = 416
  const scale = (x1 - x0) / RE
  const demandTresca = SIGMA_T * scale * progress
  const demandHmh = 103.9 * scale * progress
  const reX = x0 + RE * scale

  return (
    <g>
      <text x={16} y={22} fontSize={10} fontWeight={700} fill={INK}>
        sprawdzenie zapasu bezpieczeństwa
      </text>
      <text x={16} y={37} fontSize={8.5} fill={MUTED}>
        naprężenie zredukowane wobec granicy plastyczności
      </text>

      <text x={x0} y={86} fontSize={9} fontWeight={700} fill={ORANGE}>
        Tresca: σ_T = 120 MPa
      </text>
      <rect x={x0} y={94} width={x1 - x0} height={22} rx={4} fill="#eef1f5" />
      <motion.rect
        x={x0}
        y={94}
        width={demandTresca}
        height={22}
        rx={4}
        fill={ORANGE}
        fillOpacity={0.82}
        initial={{ width: 0 }}
        animate={{ width: demandTresca }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      />
      <text x={x0 + demandTresca + 6} y={109} fontSize={8.5} fill={ORANGE}>
        120
      </text>

      <text x={x0} y={142} fontSize={9} fontWeight={700} fill={BLUE}>
        HMH: σ = 103,9 MPa
      </text>
      <rect x={x0} y={150} width={x1 - x0} height={16} rx={4} fill="#eef1f5" />
      <motion.rect
        x={x0}
        y={150}
        width={demandHmh}
        height={16}
        rx={4}
        fill={BLUE}
        fillOpacity={0.55}
        initial={{ width: 0 }}
        animate={{ width: demandHmh }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      />
      <text x={x0 + demandHmh + 6} y={162} fontSize={8.5} fill={BLUE}>
        103,9
      </text>

      <line x1={reX} y1={82} x2={reX} y2={176} stroke={INK} strokeWidth={1.4} strokeDasharray="4 3" />
      <text x={reX - 4} y={78} textAnchor="end" fontSize={8.5} fontWeight={700} fill={INK}>
        R_e = 355 MPa
      </text>

      <line x1={x0 + demandTresca} y1={196} x2={reX} y2={196} stroke={MUTED} strokeWidth={1} />
      <line x1={x0 + demandTresca} y1={191} x2={x0 + demandTresca} y2={201} stroke={MUTED} strokeWidth={1} />
      <line x1={reX} y1={191} x2={reX} y2={201} stroke={MUTED} strokeWidth={1} />
      <text x={(x0 + demandTresca + reX) / 2} y={214} textAnchor="middle" fontSize={9} fontWeight={700} fill={MUTED}>
        zapas 235 MPa
      </text>

      <text x={x0} y={240} fontSize={9} fill={ORANGE}>
        n = R_e / σ_T = 355 / 120 = 2,96
      </text>
      <text x={x0} y={258} fontSize={9} fill={BLUE}>
        n_HMH = 355 / 103,9 = 3,42
      </text>
      <text x={x1} y={276} textAnchor="end" fontSize={8} fill={MUTED}>
        większe σ_T → mniejszy zapas, więc Tresca jest zachowawcza
      </text>
    </g>
  )
}

export function TrescaExample1Animation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'state'
  const p = playing ? smooth(sceneProgress) : 1
  const draw = clamp01(p)

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 300"
          role="img"
          aria-label="Element z naprężeniami głównymi 120, 60 i 0 MPa, trzy koła Mohra, maksymalne ścinanie 60 MPa oraz zapas bezpieczeństwa 2,96."
        >
          <defs>
            <marker
              id="tresca1-arrow-orange"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={ORANGE} />
            </marker>
            <marker
              id="tresca1-arrow-orange-start"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={ORANGE} />
            </marker>
            <marker
              id="tresca1-arrow-violet"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={VIOLET} />
            </marker>
            <marker
              id="tresca1-arrow-muted"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={MUTED} />
            </marker>
          </defs>

          {metric === 'state' && (
            <g>
              <text x={16} y={22} fontSize={10} fontWeight={700} fill={INK}>
                stan naprężenia w ścianie zbiornika
              </text>
              <text x={16} y={37} fontSize={8.5} fill={MUTED}>
                σ_θ = 120 MPa · σ_z = 60 MPa · σ_r = 0
              </text>
              <PrincipalElement draw={draw} />
              <OrderedAxis progress={draw} />
              <text x={16} y={276} fontSize={8.5} fill={MUTED}>
                Naprężenie promieniowe jest trzecim naprężeniem głównym i wynosi zero.
              </text>
            </g>
          )}

          {(metric === 'circles' || metric === 'maxshear' || metric === 'tresca') && (
            <g>
              <text x={16} y={22} fontSize={10} fontWeight={700} fill={INK}>
                {metric === 'circles' ? 'trzy pary naprężeń' : metric === 'maxshear' ? 'maksymalne ścinanie' : 'Tresca'}
              </text>
              <text x={16} y={37} fontSize={8.5} fill={MUTED}>
                σ₁ = 120 · σ₂ = 60 · σ₃ = 0 MPa
              </text>
              <g opacity={metric === 'circles' ? 1 : 0.55}>
                <PrincipalElement
                  draw={1}
                  highlight={metric === 'tresca' ? 'extreme' : 'none'}
                  showShearPlane={metric === 'maxshear'}
                />
              </g>
              <MohrScene metric={metric} draw={draw} />
            </g>
          )}

          {metric === 'check' && <SafetyCheck progress={draw} />}
        </svg>
      </div>
    </div>
  )
}
