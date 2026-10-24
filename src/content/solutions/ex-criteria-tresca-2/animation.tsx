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
const WARN = '#c65c43'

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}

const SX = 90
const SY = 30
const TXY = 20
const C = 60
const R = 36.0555
const S1 = 96.0555
const S2 = 23.9445
const S3 = 0

const MOHR_X0 = 190
const MOHR_X1 = 446
const DOMAIN_MIN = -12
const DOMAIN_MAX = 108
const MOHR_Y = 184
const MOHR_SCALE = (MOHR_X1 - MOHR_X0) / (DOMAIN_MAX - DOMAIN_MIN)

const mx = (value: number) => MOHR_X0 + (value - DOMAIN_MIN) * MOHR_SCALE
const mY = (value: number) => MOHR_Y - value * MOHR_SCALE

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
  const x0 = 36
  const y0 = 100
  const side = 86
  const x1 = x0 + side
  const y1 = y0 + side
  const cx = (x0 + x1) / 2
  const cy = (y0 + y1) / 2
  const lenX = 26 * draw
  const lenY = 18 * draw
  const lenT = 14 * draw
  const opacity = faded ? 0.45 : 1

  return (
    <g opacity={opacity}>
      <rect x={x0} y={y0} width={side} height={side} rx={3} fill={FILL} stroke={EDGE} strokeWidth={1.5} />

      <Arrow x1={x1} y1={cy} x2={x1 + lenX} y2={cy} color={BLUE} width={2.2} />
      <Arrow x1={x0} y1={cy} x2={x0 - lenX} y2={cy} color={BLUE} width={2.2} />
      <Arrow x1={cx} y1={y0} x2={cx} y2={y0 - lenY} color={GREEN} width={2.2} />
      <Arrow x1={cx} y1={y1} x2={cx} y2={y1 + lenY} color={GREEN} width={2.2} />

      <Arrow x1={x1 + 8} y1={y1 - 20} x2={x1 + 8} y2={y1 - 20 - lenT} color={ORANGE} width={1.8} />
      <Arrow x1={x0 - 8} y1={y0 + 20} x2={x0 - 8} y2={y0 + 20 + lenT} color={ORANGE} width={1.8} />
      <Arrow x1={x0 + 20} y1={y0 - 8} x2={x0 + 20 + lenT} y2={y0 - 8} color={ORANGE} width={1.8} />
      <Arrow x1={x1 - 20} y1={y1 + 8} x2={x1 - 20 - lenT} y2={y1 + 8} color={ORANGE} width={1.8} />

      <text x={x1 + lenX + 3} y={cy - 5} fontSize={8.5} fontWeight={700} fill={BLUE}>
        σ_x = 90
      </text>
      <text x={cx + 5} y={y0 - lenY - 4} fontSize={8.5} fontWeight={700} fill={GREEN}>
        σ_y = 30
      </text>
      <text x={x1 - 2} y={y0 - 14} fontSize={8.5} fontWeight={700} fill={ORANGE}>
        τ_xy = 20
      </text>
      <text x={x0} y={y1 + 38} fontSize={8} fill={MUTED}>
        σ_z = 0 — płaski stan naprężenia
      </text>
    </g>
  )
}

function AxesTriad() {
  return (
    <g>
      <text x={MOHR_X0} y={78} fontSize={10} fontWeight={700} fill={INK}>
        orientacja blachy
      </text>
      <text x={MOHR_X0} y={93} fontSize={8.5} fill={MUTED}>
        płaszczyzna xy, kierunek z jest wolny
      </text>
      <line x1={280} y1={200} x2={390} y2={200} stroke={BLUE} strokeWidth={1.4} markerEnd="url(#tresca2-arrow-blue)" />
      <line x1={280} y1={200} x2={280} y2={98} stroke={GREEN} strokeWidth={1.4} markerEnd="url(#tresca2-arrow-green)" />
      <line
        x1={280}
        y1={200}
        x2={356}
        y2={162}
        stroke={MUTED}
        strokeWidth={1.2}
        strokeDasharray="4 4"
        markerEnd="url(#tresca2-arrow-muted)"
      />
      <text x={394} y={204} fontSize={9} fill={BLUE}>
        x
      </text>
      <text x={274} y={94} fontSize={9} fill={GREEN}>
        y
      </text>
      <text x={360} y={158} fontSize={9} fill={MUTED}>
        z, σ_z = 0
      </text>
      <path d="M 286 182 A 20 20 0 0 0 306 200" fill="none" stroke={LIGHT} strokeWidth={1.2} />
      <text x={310} y={190} fontSize={8} fill={MUTED}>
        x–y
      </text>
      <text x={MOHR_X0} y={252} fontSize={8.5} fill={MUTED}>
        Trzecia oś nie znika: jej naprężenie główne wynosi zero.
      </text>
    </g>
  )
}

function Axes({ metric }: { metric: string }) {
  return (
    <g>
      <line x1={MOHR_X0 - 8} y1={MOHR_Y} x2={MOHR_X1 + 8} y2={MOHR_Y} stroke={MUTED} strokeWidth={1.1} />
      <Arrow x1={MOHR_X1} y1={MOHR_Y} x2={MOHR_X1 + 10} y2={MOHR_Y} color={MUTED} width={1} />
      <text x={MOHR_X1 + 10} y={MOHR_Y + 14} textAnchor="end" fontSize={8} fill={MUTED}>
        σ [MPa]
      </text>
      <line x1={mx(0)} y1={MOHR_Y + 72} x2={mx(0)} y2={MOHR_Y - 118} stroke={LIGHT} strokeWidth={1} />
      <text x={mx(0) + 5} y={MOHR_Y - 116} fontSize={8} fill={MUTED}>
        τ
      </text>
      {[0, 30, 60, 90].map((tick) => (
        <g key={tick}>
          <line x1={mx(tick)} y1={MOHR_Y - 4} x2={mx(tick)} y2={MOHR_Y + 4} stroke={MUTED} strokeWidth={1} />
          <text x={mx(tick)} y={MOHR_Y + 16} textAnchor="middle" fontSize={8} fill={MUTED}>
            {tick}
          </text>
        </g>
      ))}
      {metric === 'circle' && (
        <>
          <circle cx={mx(SX)} cy={mY(TXY)} r={4.4} fill={VIOLET} stroke="#fff" strokeWidth={1.2} />
          <line x1={mx(C)} y1={MOHR_Y} x2={mx(SX)} y2={mY(TXY)} stroke={VIOLET} strokeWidth={1} strokeDasharray="3 3" />
          <text x={mx(SX) + 7} y={mY(TXY) - 7} fontSize={8.5} fill={VIOLET}>
            P (90; 20)
          </text>
        </>
      )}
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

function PrincipalMarkers({ metric }: { metric: string }) {
  const items = [
    { value: S1, label: 'σ₁ = 96,06', color: BLUE },
    { value: S2, label: 'σ₂ = 23,94', color: GREEN },
    { value: S3, label: 'σ₃ = 0', color: MUTED },
  ]
  return (
    <g>
      {items.map((item, index) => {
        const emphasized = metric === 'tresca' ? item.value === S1 || item.value === S3 : true
        return (
          <g key={item.value} opacity={metric === 'tresca' && !emphasized ? 0.4 : 1}>
            <circle cx={mx(item.value)} cy={MOHR_Y} r={4} fill={item.color} stroke="#fff" strokeWidth={1} />
            {!(metric === 'tresca' && item.value === S2) && (
              <text
                x={mx(item.value)}
                y={MOHR_Y + 32 + (index % 2) * 13}
                textAnchor="middle"
                fontSize={8.5}
                fontWeight={emphasized ? 700 : 400}
                fill={item.color}
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

function CircleScene({ metric, draw }: { metric: string; draw: number }) {
  const first = clamp01(draw / 0.8)
  const second = clamp01((draw - 0.12) / 0.8)
  const third = clamp01((draw - 0.24) / 0.76)
  const showThree = metric === 'three' || metric === 'tresca'

  if (metric === 'circle') {
    return (
      <g>
        <text x={MOHR_X0} y={78} fontSize={10} fontWeight={700} fill={INK}>
          koło Mohra w płaszczyźnie xy
        </text>
        <text x={MOHR_X0} y={93} fontSize={8.5} fill={MUTED}>
          środek C i promień R
        </text>
        <Axes metric={metric} />
        <Circle center={C} radius={R} draw={first} color={VIOLET} width={2.5} />
        <line x1={mx(C)} y1={MOHR_Y} x2={mx(C)} y2={mY(R)} stroke={VIOLET} strokeWidth={1.8} />
        <text x={mx(C) + 6} y={mY(R) + 15} fontSize={8.5} fontWeight={700} fill={VIOLET}>
          R = 36,06 MPa
        </text>
        <circle cx={mx(C)} cy={MOHR_Y} r={3.2} fill={INK} />
        <text x={mx(C)} y={MOHR_Y + 32} textAnchor="middle" fontSize={8.5} fill={INK}>
          C = 60
        </text>
        <PrincipalMarkers metric={metric} />
        <text x={mx(0)} y={MOHR_Y - 10} textAnchor="middle" fontSize={8} fill={MUTED}>
          0
        </text>
        <text x={MOHR_X0} y={252} fontSize={8.5} fill={MUTED}>
          Zero leży poza kołem xy, bo σ₂ = 23,94 MPa &gt; 0.
        </text>
      </g>
    )
  }

  return (
    <g>
      <text x={MOHR_X0} y={78} fontSize={10} fontWeight={700} fill={INK}>
        {metric === 'three' ? 'trzy koła Mohra' : 'największa różnica'}
      </text>
      <text x={MOHR_X0} y={93} fontSize={8.5} fill={MUTED}>
        {metric === 'three' ? 'pary (1,2), (2,3) i (3,1)' : 'σ₁ − σ₃, a nie σ₁ − σ₂'}
      </text>
      <Axes metric={metric} />
      <Circle
        center={(S1 + S2) / 2}
        radius={(S1 - S2) / 2}
        draw={first}
        color={showThree ? VIOLET : MUTED}
        dashed
        width={1.6}
        opacity={showThree ? 0.8 : 0.2}
      />
      <Circle
        center={(S2 + S3) / 2}
        radius={(S2 - S3) / 2}
        draw={second}
        color={showThree ? GREEN : MUTED}
        dashed
        width={1.6}
        opacity={showThree ? 0.8 : 0.2}
      />
      <Circle center={(S1 + S3) / 2} radius={(S1 - S3) / 2} draw={third} color={ORANGE} width={2.7} opacity={1} />
      <PrincipalMarkers metric={metric} />

      {metric === 'three' && (
        <g fontSize={8} textAnchor="middle">
          <text x={mx(C)} y={mY(R) - 5} fill={VIOLET}>
            1–2
          </text>
          <text x={mx((S2 + S3) / 2)} y={mY((S2 - S3) / 2) - 5} fill={GREEN}>
            2–3
          </text>
          <text x={mx((S1 + S3) / 2)} y={mY((S1 - S3) / 2) - 6} fill={ORANGE}>
            1–3
          </text>
          <text x={MOHR_X0} y={268} fontSize={8.5} fill={MUTED}>
            Największe koło obejmuje σ₁ i zero, a nie σ₁ i σ₂.
          </text>
        </g>
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
            markerStart="url(#tresca2-arrow-orange-start)"
            markerEnd="url(#tresca2-arrow-orange)"
          />
          <text x={mx((S1 + S3) / 2)} y={MOHR_Y + 54} textAnchor="middle" fontSize={9} fontWeight={700} fill={ORANGE}>
            σ_T = 96,06 MPa
          </text>

          <line x1={mx(S2)} y1={MOHR_Y - 22} x2={mx(S1)} y2={MOHR_Y - 22} stroke={WARN} strokeWidth={2} />
          <line x1={mx(S2)} y1={MOHR_Y - 27} x2={mx(S2)} y2={MOHR_Y - 17} stroke={WARN} strokeWidth={1.2} />
          <line x1={mx(S1)} y1={MOHR_Y - 27} x2={mx(S1)} y2={MOHR_Y - 17} stroke={WARN} strokeWidth={1.2} />
          <text x={mx((S1 + S2) / 2)} y={MOHR_Y - 30} textAnchor="middle" fontSize={8.5} fontWeight={700} fill={WARN}>
            σ₁ − σ₂ = 72,12 — za mało
          </text>
          <text x={MOHR_X0} y={252} fontSize={8.5} fill={WARN}>
            Różnica dwóch dodatnich naprężeń pomija decydujące zero.
          </text>
        </motion.g>
      )}
    </g>
  )
}

function DifferenceCheck({ progress }: { progress: number }) {
  const x0 = 68
  const x1 = 418
  const max = S1
  const scale = (x1 - x0) / max
  const rows = [
    { y: 104, label: '|σ₁ − σ₂|', value: S1 - S2, color: VIOLET, max: false },
    { y: 152, label: '|σ₂ − σ₃|', value: S2 - S3, color: GREEN, max: false },
    { y: 200, label: '|σ₃ − σ₁|', value: S1 - S3, color: ORANGE, max: true },
  ]

  return (
    <g>
      <text x={16} y={22} fontSize={10} fontWeight={700} fill={INK}>
        kontrola przez trzy różnice
      </text>
      <text x={16} y={37} fontSize={8.5} fill={MUTED}>
        wybieramy największą z trzech wartości
      </text>
      {rows.map((row) => {
        const width = row.value * scale * progress
        return (
          <g key={row.label}>
            <text x={x0} y={row.y - 7} fontSize={8.5} fontWeight={700} fill={row.color}>
              {row.label}
            </text>
            <rect x={x0} y={row.y} width={x1 - x0} height={22} rx={4} fill="#eef1f5" />
            <motion.rect
              x={x0}
              y={row.y}
              width={width}
              height={22}
              rx={4}
              fill={row.color}
              fillOpacity={row.max ? 0.9 : 0.6}
              initial={{ width: 0 }}
              animate={{ width }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />
            <text x={x0 + width + 6} y={row.y + 15} fontSize={8.5} fontWeight={row.max ? 700 : 400} fill={row.color}>
              {row.value.toFixed(2).replace('.', ',')}
            </text>
          </g>
        )
      })}
      <line
        x1={x0 + S1 * scale}
        y1={88}
        x2={x0 + S1 * scale}
        y2={238}
        stroke={ORANGE}
        strokeWidth={1.3}
        strokeDasharray="4 3"
      />
      <text x={x0 + S1 * scale - 4} y={84} textAnchor="end" fontSize={8.5} fontWeight={700} fill={ORANGE}>
        największa = σ_T
      </text>
      <text x={x0} y={266} fontSize={9} fontWeight={700} fill={ORANGE}>
        σ_T = 96,06 MPa, a nie 72,12 MPa
      </text>
      <text x={x0} y={282} fontSize={8} fill={MUTED}>
        Największa różnica zawsze zawiera najmniejsze naprężenie, tutaj zero.
      </text>
    </g>
  )
}

export function TrescaExample2Animation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'state'
  const p = playing ? smooth(sceneProgress) : 1
  const draw = clamp01(p)

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 300"
          role="img"
          aria-label="Płaski stan naprężenia 90, 30 i 20 MPa, koło Mohra oraz trzy koła z zerem jako najmniejszym naprężeniem głównym. Wynik Tresca 96,06 MPa."
        >
          <defs>
            <marker
              id="tresca2-arrow-blue"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={BLUE} />
            </marker>
            <marker
              id="tresca2-arrow-green"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={GREEN} />
            </marker>
            <marker
              id="tresca2-arrow-muted"
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
              id="tresca2-arrow-orange"
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
              id="tresca2-arrow-orange-start"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={ORANGE} />
            </marker>
          </defs>

          {metric === 'state' && (
            <g>
              <text x={16} y={22} fontSize={10} fontWeight={700} fill={INK}>
                płaski stan naprężenia w blasze
              </text>
              <text x={16} y={37} fontSize={8.5} fill={MUTED}>
                σ_x = 90 · σ_y = 30 · τ_xy = 20 MPa
              </text>
              <StressElement draw={draw} />
              <AxesTriad />
              <text x={16} y={276} fontSize={8.5} fill={MUTED}>
                Oba naprężenia normalne są dodatnie, więc zero będzie najmniejszym naprężeniem głównym.
              </text>
            </g>
          )}

          {metric !== 'state' && metric !== 'check' && (
            <g>
              <text x={16} y={22} fontSize={10} fontWeight={700} fill={INK}>
                {metric === 'circle' ? 'koło xy' : metric === 'three' ? 'trzy koła' : 'Tresca'}
              </text>
              <text x={16} y={37} fontSize={8.5} fill={MUTED}>
                σ_x = 90 · σ_y = 30 · τ_xy = 20 · σ_z = 0 MPa
              </text>
              <StressElement draw={1} faded />
              <CircleScene metric={metric} draw={draw} />
            </g>
          )}

          {metric === 'check' && <DifferenceCheck progress={draw} />}
        </svg>
      </div>
    </div>
  )
}
