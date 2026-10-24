import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const STRESS = '#ff6b45'
const GREEN = '#2e9e6b'
const VIOLET = '#a970dd'
const MUTED = '#87929d'
const EDGE = '#68727e'
const INK = '#17202a'
const FILL = '#eef2fb'

const SIGMA = 150
const TAU = 80
const RE = 355
const CENTER = 75
const RADIUS = 109.66
const S1 = 184.66
const S2 = -34.66
const HMH = 204.21
const TRESCA = 219.32
const N_HMH = 1.74
const N_TRESCA = 1.62

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}
const pl = (value: number, digits = 2) => value.toFixed(digits).replace('.', ',')

function Arrow({
  x1,
  y1,
  x2,
  y2,
  color,
  width = 2,
  head = 6,
  opacity = 1,
}: {
  x1: number
  y1: number
  x2: number
  y2: number
  color: string
  width?: number
  head?: number
  opacity?: number
}) {
  const angle = Math.atan2(y2 - y1, x2 - x1)
  const length = Math.hypot(x2 - x1, y2 - y1)
  if (length < 0.8) return null
  const h = Math.min(head, length * 0.6)
  const baseX = x2 - h * Math.cos(angle)
  const baseY = y2 - h * Math.sin(angle)
  const wx = 3 * Math.sin(angle)
  const wy = 3 * Math.cos(angle)
  return (
    <g stroke={color} fill={color} opacity={opacity}>
      <line x1={x1} y1={y1} x2={baseX} y2={baseY} strokeWidth={width} strokeLinecap="round" />
      <polygon points={`${x2},${y2} ${baseX - wx},${baseY + wy} ${baseX + wx},${baseY - wy}`} stroke="none" />
    </g>
  )
}

function ShaftModel({ draw }: { draw: number }) {
  const cx = 112
  const cy = 156
  const r = 45
  const angle = (-52 * Math.PI) / 180
  const ax = cx + r * Math.cos(angle)
  const ay = cy + r * Math.sin(angle)

  return (
    <g>
      <text x={24} y={26} fontSize={10} fontWeight={700} fill={INK}>
        wał zginany i skręcany
      </text>
      <text x={24} y={41} fontSize={8.5} fill={MUTED}>
        punkt A na powierzchni · R_e = {RE} MPa
      </text>

      <circle cx={cx} cy={cy} r={r} fill={FILL} stroke={EDGE} strokeWidth={1.5} />
      <line x1={cx - r} y1={cy} x2={cx + r} y2={cy} stroke="#d7dee7" strokeWidth={0.9} strokeDasharray="3 4" />
      <line x1={cx} y1={cy - r} x2={cx} y2={cy + r} stroke="#d7dee7" strokeWidth={0.9} strokeDasharray="3 4" />

      <motion.g
        animate={{ opacity: [0.55, 1, 0.55] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <motion.circle
          cx={ax}
          cy={ay}
          r={5}
          fill={STRESS}
          fillOpacity={0.25}
          stroke={STRESS}
          strokeWidth={1.3}
          initial={false}
          animate={{ scale: 0.6 + 0.4 * draw }}
          style={{ transformOrigin: `${ax}px ${ay}px` }}
        />
      </motion.g>
      <circle cx={ax} cy={ay} r={1.9} fill={STRESS} />
      <text x={ax + 8} y={ay - 5} fontSize={9} fontWeight={700} fill={STRESS}>
        A
      </text>

      <path
        d={`M ${cx - 20} ${cy - 62} A 27 27 0 0 1 ${cx + 12} ${cy - 68}`}
        fill="none"
        stroke={ACCENT}
        strokeWidth={1.8}
      />
      <Arrow x1={cx + 12} y1={cy - 68} x2={cx + 8} y2={cy - 66} color={ACCENT} width={1.8} head={5} />
      <text x={cx - 22} y={cy - 72} fontSize={9} fill={ACCENT}>
        M
      </text>

      <path
        d={`M ${cx + r + 14} ${cy - 17} A 26 26 0 1 1 ${cx + r + 14} ${cy + 17}`}
        fill="none"
        stroke={VIOLET}
        strokeWidth={1.8}
      />
      <Arrow x1={cx + r + 14} y1={cy + 17} x2={cx + r + 12} y2={cy + 12} color={VIOLET} width={1.8} head={5} />
      <text x={cx + r + 23} y={cy + 4} fontSize={9} fill={VIOLET}>
        T
      </text>

      <text x={cx} y={cy + r + 16} textAnchor="middle" fontSize={8} fill={MUTED}>
        przekrój kołowy
      </text>
    </g>
  )
}

function SurfaceElement({ cx, cy, half, draw }: { cx: number; cy: number; half: number; draw: number }) {
  const sx = 34 * draw
  const tx = 26 * draw

  return (
    <g>
      <rect
        x={cx - half}
        y={cy - half}
        width={half * 2}
        height={half * 2}
        rx={3}
        fill={FILL}
        stroke={EDGE}
        strokeWidth={1.5}
      />
      <line
        x1={cx - half}
        y1={cy + half}
        x2={cx + half}
        y2={cy + half}
        stroke={MUTED}
        strokeWidth={1}
        strokeDasharray="3 4"
      />

      <Arrow x1={cx + half + 2} y1={cy - 8} x2={cx + half + 2 + sx} y2={cy - 8} color={STRESS} width={2.3} />
      <Arrow x1={cx - half - 2} y1={cy - 8} x2={cx - half - 2 - sx} y2={cy - 8} color={STRESS} width={2.3} />
      <text x={cx + half + 5} y={cy + 8} fontSize={8.5} fontWeight={700} fill={STRESS}>
        σ = {SIGMA} MPa
      </text>

      <Arrow x1={cx + half} y1={cy + 6} x2={cx + half} y2={cy + 6 - tx} color={VIOLET} width={2.3} />
      <text x={cx + half + 6} y={cy + half - 4} fontSize={8.5} fontWeight={700} fill={VIOLET}>
        τ = {TAU} MPa
      </text>
      <text x={cx} y={cy + half + 17} textAnchor="middle" fontSize={8} fill={MUTED}>
        σy = 0 · σz = 0
      </text>
    </g>
  )
}

function MohrCircle({ progress }: { progress: number }) {
  const scale = 1
  const axisY = 162
  const xOf = (value: number) => 148 + (value + 60) * scale
  const yOf = (value: number) => axisY - value * scale
  const cx = xOf(CENTER)
  const radius = RADIUS * scale
  const circumference = 2 * Math.PI * radius
  const draw = smooth(progress)

  return (
    <g>
      <text x={24} y={26} fontSize={10} fontWeight={700} fill={INK}>
        koło Mohra dla punktu A
      </text>
      <text x={24} y={41} fontSize={8.5} fill={MUTED}>
        σ = 150 MPa, τ = 80 MPa, σ_y = 0
      </text>

      <line x1={120} y1={axisY} x2={450} y2={axisY} stroke={MUTED} strokeWidth={1.1} />
      <line x1={xOf(0)} y1={40} x2={xOf(0)} y2={282} stroke={MUTED} strokeWidth={1} />
      <text x={444} y={axisY - 8} textAnchor="end" fontSize={8.5} fill={MUTED}>
        σ [MPa]
      </text>
      <text x={xOf(0) + 6} y={50} fontSize={8.5} fill={MUTED}>
        τ [MPa]
      </text>

      <motion.circle
        cx={cx}
        cy={axisY}
        r={radius}
        fill={ACCENT}
        fillOpacity={0.05}
        stroke={ACCENT}
        strokeWidth={2.1}
        strokeDasharray={circumference}
        initial={false}
        animate={{ strokeDashoffset: circumference * (1 - draw) }}
        transition={{ duration: 0.12, ease: 'linear' }}
      />
      <circle cx={cx} cy={axisY} r={2.8} fill={EDGE} />
      <text x={cx} y={axisY - 8} textAnchor="middle" fontSize={8} fill={EDGE}>
        C = {CENTER}
      </text>

      <line x1={cx} y1={axisY} x2={xOf(SIGMA)} y2={yOf(TAU)} stroke={ACCENT} strokeWidth={1.5} />
      <line
        x1={xOf(SIGMA)}
        y1={yOf(TAU)}
        x2={xOf(SIGMA)}
        y2={axisY}
        stroke={MUTED}
        strokeWidth={1}
        strokeDasharray="3 3"
      />
      <line
        x1={xOf(0)}
        y1={yOf(TAU)}
        x2={xOf(SIGMA)}
        y2={yOf(TAU)}
        stroke={MUTED}
        strokeWidth={1}
        strokeDasharray="3 3"
      />
      <motion.circle
        cx={xOf(SIGMA)}
        cy={yOf(TAU)}
        r={4.5}
        fill={STRESS}
        initial={false}
        animate={{ opacity: draw }}
        transition={{ duration: 0.12 }}
      />
      <text x={xOf(SIGMA) + 8} y={yOf(TAU) - 5} fontSize={9} fontWeight={700} fill={STRESS}>
        X(150, 80)
      </text>

      <motion.g initial={false} animate={{ opacity: draw }}>
        <line x1={xOf(S2)} y1={axisY - 6} x2={xOf(S2)} y2={axisY + 7} stroke={EDGE} strokeWidth={1.8} />
        <line x1={xOf(S1)} y1={axisY - 6} x2={xOf(S1)} y2={axisY + 7} stroke={EDGE} strokeWidth={1.8} />
        <line x1={xOf(0)} y1={axisY - 6} x2={xOf(0)} y2={axisY + 7} stroke={VIOLET} strokeWidth={1.8} />
        <text x={xOf(S2)} y={axisY + 21} textAnchor="middle" fontSize={8} fill={EDGE}>
          σ₂ = {pl(S2, 1)}
        </text>
        <text x={xOf(0)} y={axisY + 34} textAnchor="middle" fontSize={8} fill={VIOLET}>
          σ₃ = 0
        </text>
        <text x={xOf(S1)} y={axisY + 21} textAnchor="middle" fontSize={8} fill={EDGE}>
          σ₁ = {pl(S1, 1)}
        </text>
      </motion.g>

      <text x={cx + radius * 0.33} y={axisY - 12} textAnchor="middle" fontSize={8.5} fontWeight={700} fill={ACCENT}>
        R = {pl(RADIUS, 1)}
      </text>
      <text x={24} y={278} fontSize={8.5} fill={MUTED}>
        Największy promień to maksymalne ścinanie; σ₃ = 0, bo stan jest płaski.
      </text>
    </g>
  )
}

function EnergyBars({ progress }: { progress: number }) {
  const x = 164
  const track = 276
  const max = 22500
  const rows = [
    { label: 'σ² = 150²', value: 22500, color: ACCENT, y: 88 },
    { label: '3τ² = 3·80²', value: 19200, color: STRESS, y: 126 },
  ]

  return (
    <g>
      <text x={24} y={26} fontSize={10} fontWeight={700} fill={INK}>
        energia zmiany postaci
      </text>
      <text x={24} y={41} fontSize={8.5} fill={MUTED}>
        płaski stan naprężenia: σHMH² = σ² + 3τ²
      </text>

      {rows.map((row, i) => {
        const localProgress = smooth(clamp01((progress - i * 0.18) / 0.6))
        const width = (row.value / max) * track * localProgress
        return (
          <g key={row.label}>
            <text x={x - 10} y={row.y + 15} textAnchor="end" fontSize={9} fill={INK}>
              {row.label}
            </text>
            <rect x={x} y={row.y} width={track} height={22} rx={4} fill="#edf1f5" />
            <motion.rect
              x={x}
              y={row.y}
              height={22}
              rx={4}
              fill={row.color}
              fillOpacity={0.28}
              stroke={row.color}
              strokeWidth={1.1}
              initial={false}
              animate={{ width }}
              transition={{ duration: 0.12, ease: 'linear' }}
            />
            <text x={x + track - 6} y={row.y + 15} textAnchor="end" fontSize={8.5} fontWeight={700} fill={INK}>
              {row.value.toLocaleString('pl-PL').replace(/\u00a0/g, ' ')} MPa²
            </text>
          </g>
        )
      })}

      <motion.g initial={false} animate={{ opacity: smooth(clamp01((progress - 0.4) / 0.4)) }}>
        <line x1={x} y1={178} x2={x + track} y2={178} stroke={MUTED} strokeWidth={1} />
        <text x={x} y={198} fontSize={9} fill={INK}>
          22 500 + 19 200 = 41 700 MPa²
        </text>
        <text x={x} y={217} fontSize={9.5} fontWeight={700} fill={INK}>
          σHMH = √41 700 = {pl(HMH, 1)} MPa
        </text>
        <text x={x} y={236} fontSize={8.5} fill={MUTED}>
          Ścinanie wnosi 46% energii, dlatego nie wolno pominąć czynnika 3.
        </text>
      </motion.g>

      <text x={24} y={270} fontSize={8.5} fill={MUTED}>
        HMH jest funkcją kwadratową, więc znak τ nie zmienia wyniku.
      </text>
    </g>
  )
}

function EquivalentGauge({ progress }: { progress: number }) {
  const x = 82
  const y = 170
  const width = 362
  const max = 220
  const xOf = (value: number) => x + (value / max) * width
  const draw = smooth(progress)

  return (
    <g>
      <text x={24} y={26} fontSize={10} fontWeight={700} fill={INK}>
        naprężenie zredukowane HMH
      </text>
      <text x={24} y={41} fontSize={8.5} fill={MUTED}>
        √(22 500 + 19 200) = {pl(HMH, 1)} MPa
      </text>
      <text x={456} y={26} textAnchor="end" fontSize={8.5} fill={GREEN}>
        R_e = {RE} MPa
      </text>
      <text x={456} y={40} textAnchor="end" fontSize={8} fill={MUTED}>
        granica poza skalą
      </text>

      <line x1={x} y1={y} x2={x + width} y2={y} stroke={MUTED} strokeWidth={1.1} />
      {[0, 75, 150, 200, 220].map((tick) => (
        <g key={tick}>
          <line x1={xOf(tick)} y1={y - 5} x2={xOf(tick)} y2={y + 5} stroke={MUTED} strokeWidth={1} />
          <text x={xOf(tick)} y={y + 18} textAnchor="middle" fontSize={8} fill={MUTED}>
            {tick}
          </text>
        </g>
      ))}

      <rect x={x} y={y - 10} width={width} height={20} rx={6} fill="#edf1f5" />
      <motion.rect
        x={x}
        y={y - 10}
        height={20}
        rx={6}
        fill={ACCENT}
        fillOpacity={0.28}
        stroke={ACCENT}
        strokeWidth={1.2}
        initial={false}
        animate={{ width: (xOf(HMH) - x) * draw }}
        transition={{ duration: 0.12, ease: 'linear' }}
      />

      <motion.g initial={false} animate={{ opacity: draw }}>
        <line x1={xOf(HMH)} y1={y - 24} x2={xOf(HMH)} y2={y + 8} stroke={ACCENT} strokeWidth={2.4} />
        <circle cx={xOf(HMH)} cy={y - 24} r={3.4} fill={ACCENT} />
        <text x={xOf(HMH)} y={y - 30} textAnchor="middle" fontSize={8.5} fontWeight={700} fill={ACCENT}>
          HMH {pl(HMH, 1)}
        </text>

        <line x1={xOf(SIGMA)} y1={y - 8} x2={xOf(SIGMA)} y2={y + 12} stroke={STRESS} strokeWidth={1.8} />
        <text x={xOf(SIGMA)} y={y - 14} textAnchor="middle" fontSize={8} fill={STRESS}>
          σ = {SIGMA}
        </text>

        <line x1={xOf(S1)} y1={y - 8} x2={xOf(S1)} y2={y + 12} stroke={VIOLET} strokeWidth={1.8} />
        <text x={xOf(S1)} y={y + 30} textAnchor="middle" fontSize={8} fill={VIOLET}>
          σ₁ = {pl(S1, 1)}
        </text>
      </motion.g>

      <text x={24} y={232} fontSize={8.8} fill={MUTED}>
        HMH = {pl(HMH, 1)} MPa jest większe od σ₁ = {pl(S1, 1)} MPa.
      </text>
      <text x={24} y={250} fontSize={8.8} fill={MUTED}>
        To nie błąd: energia zmiany postaci obejmuje wszystkie trzy kierunki.
      </text>
      <text x={24} y={268} fontSize={8.8} fill={MUTED}>
        Dlatego HMH nie jest po prostu największym naprężeniem.
      </text>
    </g>
  )
}

function SafetyGauge({ progress }: { progress: number }) {
  const x = 96
  const y = 128
  const width = 348
  const max = 2.5
  const xOf = (value: number) => x + (value / max) * width
  const draw = smooth(progress)

  return (
    <g>
      <text x={24} y={26} fontSize={10} fontWeight={700} fill={INK}>
        sprawdzenie bezpieczeństwa
      </text>
      <text x={24} y={41} fontSize={8.5} fill={MUTED}>
        n = R_e / σ_zred
      </text>

      <line x1={x} y1={y + 14} x2={x + width} y2={y + 14} stroke={MUTED} strokeWidth={1.1} />
      <line x1={xOf(1)} y1={y - 2} x2={xOf(1)} y2={y + 30} stroke={GREEN} strokeWidth={1.6} strokeDasharray="3 3" />
      <text x={xOf(1)} y={y - 8} textAnchor="middle" fontSize={8} fill={GREEN}>
        n = 1
      </text>

      <text x={x} y={y - 26} fontSize={9} fill={ACCENT}>
        HMH: n = {pl(N_HMH)}
      </text>
      <rect x={x} y={y - 18} width={width} height={18} rx={5} fill="#edf1f5" />
      <motion.rect
        x={x}
        y={y - 18}
        height={18}
        rx={5}
        fill={ACCENT}
        fillOpacity={0.3}
        stroke={ACCENT}
        strokeWidth={1.2}
        initial={false}
        animate={{ width: (xOf(N_HMH) - x) * draw }}
        transition={{ duration: 0.12, ease: 'linear' }}
      />
      <motion.g initial={false} animate={{ opacity: draw }}>
        <line x1={xOf(N_HMH)} y1={y - 22} x2={xOf(N_HMH)} y2={y - 8} stroke={ACCENT} strokeWidth={2} />
        <text x={xOf(N_HMH)} y={y - 26} textAnchor="middle" fontSize={8} fontWeight={700} fill={ACCENT}>
          {pl(N_HMH)}
        </text>
      </motion.g>

      <text x={x} y={y + 54} fontSize={9} fill={STRESS}>
        Tresca: n = {pl(N_TRESCA)}
      </text>
      <rect x={x} y={y + 62} width={width} height={18} rx={5} fill="#edf1f5" />
      <motion.rect
        x={x}
        y={y + 62}
        height={18}
        rx={5}
        fill={STRESS}
        fillOpacity={0.25}
        stroke={STRESS}
        strokeWidth={1.2}
        initial={false}
        animate={{ width: (xOf(N_TRESCA) - x) * draw }}
        transition={{ duration: 0.12, ease: 'linear' }}
      />
      <motion.g initial={false} animate={{ opacity: draw }}>
        <line x1={xOf(N_TRESCA)} y1={y + 58} x2={xOf(N_TRESCA)} y2={y + 84} stroke={STRESS} strokeWidth={2} />
        <text x={xOf(N_TRESCA)} y={y + 96} textAnchor="middle" fontSize={8} fontWeight={700} fill={STRESS}>
          {pl(N_TRESCA)}
        </text>
      </motion.g>

      <text x={24} y={240} fontSize={9} fill={ACCENT}>
        n_HMH = {pl(N_HMH)}
      </text>
      <text x={24} y={257} fontSize={9} fill={STRESS}>
        n_Tresca = {pl(N_TRESCA)} przy σ_T = {pl(TRESCA, 1)} MPa
      </text>
      <text x={24} y={274} fontSize={8.5} fill={GREEN}>
        Oba zapasy większe od 1 — element jest bezpieczny.
      </text>
    </g>
  )
}

export function HmhExample2Animation({ scene, index, playing, stepProgress, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const progress = playing ? smooth(sceneProgress) : 1
  const pulse = playing ? 0.55 + 0.45 * Math.sin((sceneProgress * 2 + stepProgress + index) * Math.PI * 2) : 1

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 480 300"
          role="img"
          aria-label="Wał zginany i skręcany, koło Mohra, energia zmiany postaci, naprężenie HMH i współczynnik bezpieczeństwa."
        >
          {metric === 'model' && (
            <>
              <ShaftModel draw={progress} />
              <text x={296} y={70} fontSize={8.5} fill={STRESS}>
                punkt A
              </text>
              <SurfaceElement cx={372} cy={160} half={38} draw={progress} />
              <text x={24} y={278} fontSize={8.5} fill={MUTED}>
                σ od zginania i τ od skręcania działają jednocześnie w tym samym punkcie.
              </text>
            </>
          )}

          {metric === 'principal' && <MohrCircle progress={progress} />}
          {metric === 'energy' && <EnergyBars progress={progress} />}
          {metric === 'equivalent' && <EquivalentGauge progress={progress} />}
          {metric === 'check' && <SafetyGauge progress={progress} />}

          <motion.circle
            cx={464}
            cy={16}
            r={3}
            fill={STRESS}
            animate={{ opacity: playing ? [0.3, pulse, 0.3] : 0.8 }}
            transition={{ duration: 1.8, repeat: playing ? Infinity : 0, ease: 'easeInOut' }}
          />

          <text x={456} y={292} textAnchor="end" fontSize={8} fill={MUTED}>
            {metric === 'model'
              ? 'model i dane'
              : metric === 'principal'
                ? 'naprężenia główne z koła Mohra'
                : metric === 'energy'
                  ? 'składniki energii'
                  : metric === 'equivalent'
                    ? 'naprężenie równoważne'
                    : 'kontrola zapasu'}
          </text>
        </svg>
      </div>
    </div>
  )
}
