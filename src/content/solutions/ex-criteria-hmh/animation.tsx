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

const S1 = 120
const S2 = 60
const MEAN = 60
const HMH = 103.92
const RE = 355
const N_HMH = 3.42
const TRESCA = 120
const N_TRESCA = 2.96

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

function Vessel({ pulse }: { pulse: number }) {
  const cx = 138
  const cy = 116
  const halfW = 98
  const halfH = 38
  const pressure = [0, 60, 120, 180, 240, 300].map((degrees) => {
    const angle = (degrees * Math.PI) / 180
    const inner = 8
    const outerX = halfW - 9
    const outerY = halfH - 9
    return {
      x1: cx + inner * Math.cos(angle),
      y1: cy + inner * Math.sin(angle),
      x2: cx + outerX * Math.cos(angle),
      y2: cy + outerY * Math.sin(angle),
    }
  })

  return (
    <g>
      <text x={24} y={26} fontSize={10} fontWeight={700} fill={INK}>
        zbiornik ciśnieniowy
      </text>
      <text x={24} y={41} fontSize={8.5} fill={MUTED}>
        punkt ściany A · płaski stan naprężenia
      </text>

      <rect
        x={cx - halfW}
        y={cy - halfH}
        width={halfW * 2}
        height={halfH * 2}
        rx={halfH}
        fill={FILL}
        stroke={EDGE}
        strokeWidth={1.5}
      />
      <line x1={cx} y1={cy - halfH} x2={cx} y2={cy + halfH} stroke="#d7dee7" strokeWidth={1} strokeDasharray="3 4" />

      {pressure.map((item, i) => (
        <motion.g
          key={i}
          animate={{ opacity: [0.35, 0.9, 0.35] }}
          transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.18, ease: 'easeInOut' }}
        >
          <Arrow
            x1={item.x1}
            y1={item.y1}
            x2={item.x2}
            y2={item.y2}
            color={VIOLET}
            width={1.3}
            head={4}
            opacity={0.85}
          />
        </motion.g>
      ))}

      <Arrow x1={cx - halfW - 2} y1={cy} x2={cx - halfW - 22} y2={cy} color={ACCENT} width={1.8} head={5} />
      <Arrow x1={cx + halfW + 2} y1={cy} x2={cx + halfW + 22} y2={cy} color={ACCENT} width={1.8} head={5} />
      <text x={cx} y={cy + halfH + 16} textAnchor="middle" fontSize={8.5} fill={ACCENT}>
        σz = 60 MPa
      </text>

      <Arrow x1={cx + 42} y1={cy - halfH} x2={cx + 42} y2={cy - halfH - 17} color={STRESS} width={1.8} head={5} />
      <Arrow x1={cx + 42} y1={cy + halfH} x2={cx + 42} y2={cy + halfH + 17} color={STRESS} width={1.8} head={5} />
      <text x={cx + 50} y={cy - halfH - 9} fontSize={8.5} fill={STRESS}>
        σθ = 120 MPa
      </text>

      <motion.circle
        cx={cx - 20}
        cy={cy - halfH}
        r={4.5}
        fill={STRESS}
        fillOpacity={0.25}
        stroke={STRESS}
        strokeWidth={1.4}
        animate={{ opacity: [0.55, 1, 0.55] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <circle cx={cx - 20} cy={cy - halfH} r={1.8} fill={STRESS} />
      <text x={cx - 31} y={cy - halfH - 8} fontSize={9} fontWeight={700} fill={STRESS}>
        A
      </text>

      <text x={cx} y={cy + 48} textAnchor="middle" fontSize={8} fill={VIOLET} opacity={pulse > 0.3 ? 1 : 0.5}>
        ciśnienie wewnętrzne
      </text>
    </g>
  )
}

function PrincipalElement({
  cx,
  cy,
  half,
  draw = 1,
  labels = 'principal',
}: {
  cx: number
  cy: number
  half: number
  draw?: number
  labels?: 'principal' | 'vessel'
}) {
  const scale = 0.29
  const ax = S1 * scale * draw
  const ay = S2 * scale * draw
  const label1 = labels === 'vessel' ? 'σθ = 120 MPa' : 'σ₁ = 120 MPa'
  const label2 = labels === 'vessel' ? 'σz = 60 MPa' : 'σ₂ = 60 MPa'

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
      <line x1={cx - half} y1={cy} x2={cx + half} y2={cy} stroke="#d7dee7" strokeWidth={0.9} strokeDasharray="3 4" />
      <line x1={cx} y1={cy - half} x2={cx} y2={cy + half} stroke="#d7dee7" strokeWidth={0.9} strokeDasharray="3 4" />

      <Arrow x1={cx + half + 2} y1={cy} x2={cx + half + 2 + ax} y2={cy} color={STRESS} width={2.2} />
      <Arrow x1={cx - half - 2} y1={cy} x2={cx - half - 2 - ax} y2={cy} color={STRESS} width={2.2} />
      <Arrow x1={cx} y1={cy - half - 2} x2={cx} y2={cy - half - 2 - ay} color={ACCENT} width={2.2} />
      <Arrow x1={cx} y1={cy + half + 2} x2={cx} y2={cy + half + 2 + ay} color={ACCENT} width={2.2} />

      <text x={cx + half + 4} y={cy + 13} fontSize={8.5} fontWeight={700} fill={STRESS}>
        {label1}
      </text>
      <text x={cx - 6} y={cy - half - 12} textAnchor="end" fontSize={8.5} fontWeight={700} fill={ACCENT}>
        {label2}
      </text>
      <text x={cx} y={cy + 4} textAnchor="middle" fontSize={9} fill={MUTED}>
        ⊙ σ₃ = 0
      </text>
      <text x={cx} y={cy + half + 28} textAnchor="middle" fontSize={8} fill={MUTED}>
        element w punkcie A
      </text>
    </g>
  )
}

function HydrostaticElement({ cx, cy, half, draw }: { cx: number; cy: number; half: number; draw: number }) {
  const arm = 15 * draw
  return (
    <g>
      <rect
        x={cx - half}
        y={cy - half}
        width={half * 2}
        height={half * 2}
        rx={3}
        fill={VIOLET}
        fillOpacity={0.08}
        stroke={VIOLET}
        strokeWidth={1.4}
      />
      <Arrow x1={cx + half + 2} y1={cy} x2={cx + half + 2 + arm} y2={cy} color={VIOLET} width={1.8} head={5} />
      <Arrow x1={cx - half - 2} y1={cy} x2={cx - half - 2 - arm} y2={cy} color={VIOLET} width={1.8} head={5} />
      <Arrow x1={cx} y1={cy - half - 2} x2={cx} y2={cy - half - 2 - arm} color={VIOLET} width={1.8} head={5} />
      <Arrow x1={cx} y1={cy + half + 2} x2={cx} y2={cy + half + 2 + arm} color={VIOLET} width={1.8} head={5} />
      <text x={cx} y={cy + 4} textAnchor="middle" fontSize={9} fontWeight={700} fill={VIOLET}>
        p
      </text>
      <text x={cx} y={cy + half + 17} textAnchor="middle" fontSize={8.5} fill={VIOLET}>
        p = {MEAN} MPa
      </text>
      <text x={cx} y={cy + half + 30} textAnchor="middle" fontSize={7.5} fill={MUTED}>
        zmiana objętości
      </text>
    </g>
  )
}

function DeviatorElement({ cx, cy, half, draw }: { cx: number; cy: number; half: number; draw: number }) {
  const arm = 17 * draw
  return (
    <g>
      <rect
        x={cx - half}
        y={cy - half}
        width={half * 2}
        height={half * 2}
        rx={3}
        fill={STRESS}
        fillOpacity={0.08}
        stroke={STRESS}
        strokeWidth={1.4}
      />
      <Arrow x1={cx + half + 2} y1={cy} x2={cx + half + 2 + arm} y2={cy} color={STRESS} width={1.9} head={5} />
      <Arrow x1={cx - half - 2} y1={cy} x2={cx - half - 2 - arm} y2={cy} color={STRESS} width={1.9} head={5} />
      <motion.circle
        cx={cx}
        cy={cy}
        r={6}
        fill="none"
        stroke={ACCENT}
        strokeWidth={1.2}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <line x1={cx - 4} y1={cy - 4} x2={cx + 4} y2={cy + 4} stroke={ACCENT} strokeWidth={1.2} />
      <line x1={cx - 4} y1={cy + 4} x2={cx + 4} y2={cy - 4} stroke={ACCENT} strokeWidth={1.2} />
      <text x={cx} y={cy + half + 17} textAnchor="middle" fontSize={8.5} fill={STRESS}>
        s = (60, 0, −60)
      </text>
      <text x={cx} y={cy + half + 30} textAnchor="middle" fontSize={7.5} fill={MUTED}>
        zmiana kształtu
      </text>
    </g>
  )
}

function EnergyBars({ progress }: { progress: number }) {
  const x = 158
  const track = 278
  const max = 14400
  const rows = [
    { label: '(σ₁ − σ₂)²', value: 3600, color: ACCENT, y: 84 },
    { label: '(σ₂ − σ₃)²', value: 3600, color: GREEN, y: 120 },
    { label: '(σ₃ − σ₁)²', value: 14400, color: STRESS, y: 156 },
  ]

  return (
    <g>
      <text x={24} y={26} fontSize={10} fontWeight={700} fill={INK}>
        energia zmiany postaci
      </text>
      <text x={24} y={41} fontSize={8.5} fill={MUTED}>
        niezmiennik HMH z różnic naprężeń głównych
      </text>

      {rows.map((row, i) => {
        const localProgress = smooth(clamp01((progress - i * 0.16) / 0.58))
        const width = (row.value / max) * track * localProgress
        return (
          <g key={row.label}>
            <text x={x - 10} y={row.y + 14} textAnchor="end" fontSize={9} fill={INK}>
              {row.label}
            </text>
            <rect x={x} y={row.y} width={track} height={21} rx={4} fill="#edf1f5" />
            <motion.rect
              x={x}
              y={row.y}
              height={21}
              rx={4}
              fill={row.color}
              fillOpacity={0.28}
              stroke={row.color}
              strokeWidth={1.1}
              initial={false}
              animate={{ width }}
              transition={{ duration: 0.12, ease: 'linear' }}
            />
            <text x={x + track - 6} y={row.y + 14} textAnchor="end" fontSize={8.5} fontWeight={700} fill={INK}>
              {row.value.toLocaleString('pl-PL').replace(/\u00a0/g, ' ')} MPa²
            </text>
          </g>
        )
      })}

      <motion.g initial={false} animate={{ opacity: smooth(clamp01((progress - 0.45) / 0.4)) }}>
        <line x1={x} y1={202} x2={x + track} y2={202} stroke={MUTED} strokeWidth={1} />
        <text x={x} y={222} fontSize={9} fill={INK}>
          suma różnic kwadratów = 21 600 MPa²
        </text>
        <text x={x} y={240} fontSize={9.5} fontWeight={700} fill={INK}>
          σHMH² = ½ · 21 600 = 10 800 MPa²
        </text>
        <text x={x} y={258} fontSize={8.5} fill={MUTED}>
          zmiana wspólnego poziomu naprężeń nie zmienia różnic
        </text>
      </motion.g>
    </g>
  )
}

function EquivalentGauge({ progress }: { progress: number }) {
  const x = 80
  const y = 166
  const width = 360
  const max = 140
  const xOf = (value: number) => x + (value / max) * width
  const draw = smooth(progress)

  return (
    <g>
      <text x={24} y={26} fontSize={10} fontWeight={700} fill={INK}>
        naprężenie zredukowane HMH
      </text>
      <text x={24} y={41} fontSize={8.5} fill={MUTED}>
        √(10 800) = {pl(HMH)} MPa
      </text>
      <text x={456} y={26} textAnchor="end" fontSize={8.5} fill={GREEN}>
        R_e = {RE} MPa
      </text>
      <text x={456} y={40} textAnchor="end" fontSize={8} fill={MUTED}>
        granica poza skalą
      </text>

      <line x1={x} y1={y} x2={x + width} y2={y} stroke={MUTED} strokeWidth={1.1} />
      {[0, 60, 120, 140].map((tick) => (
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
        <line x1={xOf(HMH)} y1={y - 22} x2={xOf(HMH)} y2={y + 8} stroke={ACCENT} strokeWidth={2.4} />
        <circle cx={xOf(HMH)} cy={y - 22} r={3.4} fill={ACCENT} />
        <text x={xOf(HMH)} y={y - 28} textAnchor="middle" fontSize={8.5} fontWeight={700} fill={ACCENT}>
          HMH {pl(HMH)}
        </text>

        <line x1={xOf(S1)} y1={y - 8} x2={xOf(S1)} y2={y + 12} stroke={STRESS} strokeWidth={2} />
        <text x={xOf(S1)} y={y - 14} textAnchor="middle" fontSize={8} fill={STRESS}>
          σ₁ = {S1}
        </text>

        <line x1={xOf(S2)} y1={y - 8} x2={xOf(S2)} y2={y + 12} stroke={EDGE} strokeWidth={1.6} strokeDasharray="3 3" />
        <text x={xOf(S2)} y={y + 30} textAnchor="middle" fontSize={8} fill={EDGE}>
          σ₂ = {S2}
        </text>
      </motion.g>

      <text x={24} y={232} fontSize={8.8} fill={MUTED}>
        HMH leży między σ₂ i σ₁, bo stan ma udział hydrostatyczny.
      </text>
      <text x={24} y={250} fontSize={8.8} fill={MUTED}>
        To nie jest pojedyncza składowa, lecz miara energii zmiany postaci.
      </text>
    </g>
  )
}

function SafetyGauge({ progress }: { progress: number }) {
  const x = 96
  const y = 124
  const width = 348
  const max = 4
  const xOf = (value: number) => x + (value / max) * width
  const draw = smooth(progress)

  return (
    <g>
      <text x={24} y={26} fontSize={10} fontWeight={700} fill={INK}>
        sprawdzenie bezpieczeństwa
      </text>
      <text x={24} y={41} fontSize={8.5} fill={MUTED}>
        n = R_e / σHMH
      </text>

      <line x1={x} y1={y + 14} x2={x + width} y2={y + 14} stroke={MUTED} strokeWidth={1.1} />
      <line x1={xOf(1)} y1={y - 2} x2={xOf(1)} y2={y + 28} stroke={GREEN} strokeWidth={1.6} strokeDasharray="3 3" />
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

      <text x={24} y={240} fontSize={9} fill={INK}>
        n_HMH = {pl(N_HMH)}
      </text>
      <text x={24} y={257} fontSize={9} fill={STRESS}>
        n_Tresca = {pl(N_TRESCA)} przy σ_T = {TRESCA} MPa
      </text>
      <text x={24} y={274} fontSize={8.5} fill={GREEN}>
        Oba zapasy większe od 1 — element jest bezpieczny.
      </text>
    </g>
  )
}

export function HmhExample1Animation({ scene, index, playing, stepProgress, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const progress = playing ? smooth(sceneProgress) : 1
  const pulse = playing ? 0.55 + 0.45 * Math.sin((sceneProgress * 2 + stepProgress + index) * Math.PI * 2) : 1

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 480 300"
          role="img"
          aria-label="Cienkościenny zbiornik ciśnieniowy, rozkład naprężenia na część hydrostatyczną i dewiatorową, energia zmiany postaci, naprężenie HMH oraz współczynnik bezpieczeństwa."
        >
          {metric === 'model' && (
            <>
              <Vessel pulse={pulse} />
              <PrincipalElement cx={368} cy={138} half={40} draw={progress} labels="vessel" />
              <text x={24} y={276} fontSize={8.5} fill={MUTED}>
                Naprężenie obwodowe jest dwa razy większe od wzdłużnego.
              </text>
            </>
          )}

          {metric === 'state' && (
            <>
              <text x={24} y={26} fontSize={10} fontWeight={700} fill={INK}>
                rozkład stanu naprężenia
              </text>
              <text x={24} y={41} fontSize={8.5} fill={MUTED}>
                średnia p oraz dewiator s opisują różne części energii
              </text>

              <PrincipalElement cx={112} cy={152} half={34} draw={progress} />
              <Arrow x1={192} y1={152} x2={226} y2={152} color={MUTED} width={1.6} head={6} />
              <text x={209} y={142} textAnchor="middle" fontSize={7.5} fill={MUTED}>
                rozkład
              </text>

              <HydrostaticElement cx={282} cy={148} half={28} draw={progress} />
              <DeviatorElement cx={408} cy={148} half={28} draw={progress} />

              <text x={24} y={250} fontSize={9} fill={INK}>
                p = (120 + 60 + 0) / 3 = {MEAN} MPa
              </text>
              <text x={24} y={268} fontSize={8.8} fill={MUTED}>
                Część hydrostatyczna nie zmienia postaci; dewiator odpowiada za uplastycznienie.
              </text>
            </>
          )}

          {metric === 'energy' && <EnergyBars progress={progress} />}
          {metric === 'equivalent' && <EquivalentGauge progress={progress} />}
          {metric === 'check' && <SafetyGauge progress={progress} />}

          <text x={456} y={292} textAnchor="end" fontSize={8} fill={MUTED}>
            {metric === 'model'
              ? 'model i dane'
              : metric === 'state'
                ? 'część objętościowa i dewiator'
                : metric === 'energy'
                  ? 'niezmiennik energii'
                  : metric === 'equivalent'
                    ? 'naprężenie równoważne'
                    : 'kontrola zapasu'}
          </text>
        </svg>
      </div>
    </div>
  )
}
