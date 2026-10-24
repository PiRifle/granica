import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const STRESS = '#ff6b45'
const MUTED = '#87929d'
const INK = '#17202a'
const OK = '#2e9e6b'
const SHEAR = '#a970dd'

const MARK_ACCENT = 'ssl2-accent'
const MARK_STRESS = 'ssl2-stress'
const MARK_SHEAR = 'ssl2-shear'
const MARK_OK = 'ssl2-ok'

const EPS_X = 336
const EPS_Y = -100.8
const GAMMA = 245.2
const PHI = 14.65
const SIGMA_I = 72.13
const SIGMA_II = -4.93
const HMH = 74.72
const TRESCA = 77.06
const RE = 235

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}

function ShaftLoads({ draw, playing }: { draw: number; playing: boolean }) {
  const y = 124
  return (
    <g>
      <rect
        x={104}
        y={y - 20}
        width={272}
        height={40}
        rx={20}
        fill={ACCENT}
        fillOpacity={0.12}
        stroke={ACCENT}
        strokeWidth={2}
      />
      <ellipse cx={104} cy={y} rx={11} ry={20} fill={ACCENT} fillOpacity={0.16} stroke={ACCENT} strokeWidth={2} />
      <ellipse cx={376} cy={y} rx={11} ry={20} fill={ACCENT} fillOpacity={0.16} stroke={ACCENT} strokeWidth={2} />

      <motion.g
        stroke={STRESS}
        strokeWidth={2.4}
        fill={STRESS}
        initial={false}
        animate={playing ? { x: [0, 4, 0] } : { x: 0 }}
        transition={{ duration: 1.4, repeat: playing ? Infinity : 0, ease: 'easeInOut' }}
      >
        <line x1={88} y1={y} x2={70} y2={y} markerEnd={`url(#${MARK_STRESS})`} />
        <line x1={392} y1={y} x2={410} y2={y} markerEnd={`url(#${MARK_STRESS})`} />
        <text x={62} y={y - 8} textAnchor="end" fontSize={9} stroke="none">
          N = 30 kN
        </text>
      </motion.g>

      <motion.g
        stroke={STRESS}
        strokeWidth={2}
        fill="none"
        initial={false}
        animate={playing ? { rotate: [0, 5, 0] } : { rotate: 0 }}
        transition={{ duration: 2.2, repeat: playing ? Infinity : 0, ease: 'easeInOut' }}
        style={{ transformOrigin: '240px 74px' }}
      >
        <path d="M212 82 Q240 62 268 82" markerEnd={`url(#${MARK_STRESS})`} />
      </motion.g>
      <text x={240} y={58} textAnchor="middle" fontSize={9} fill={STRESS}>
        M = 1,2 kN·m
      </text>

      <motion.g
        stroke={SHEAR}
        strokeWidth={2}
        fill={SHEAR}
        initial={false}
        animate={playing ? { rotate: [0, 22, 0] } : { rotate: 0 }}
        transition={{ duration: 2.4, repeat: playing ? Infinity : 0, ease: 'easeInOut' }}
        style={{ transformOrigin: '376px 124px' }}
      >
        <path d="M386 98 A 30 34 0 1 1 386 150" fill="none" markerEnd={`url(#${MARK_SHEAR})`} />
      </motion.g>
      <text x={424} y={112} textAnchor="end" fontSize={9} fill={SHEAR}>
        T = 800 N·m
      </text>

      <circle cx={240} cy={y - 20} r={4} fill={STRESS} opacity={draw} />
      <text x={250} y={y - 24} fontSize={9} fontWeight={700} fill={STRESS} opacity={draw}>
        włókno A
      </text>
      <text x={240} y={y + 42} textAnchor="middle" fontSize={8.5} fill={MUTED}>
        przekrój kołowy d = 60 mm
      </text>
    </g>
  )
}

function SectionDiagram({ draw }: { draw: number }) {
  const cx = 112
  const cy = 120
  const r = 54
  const axisX = 196
  const rows = 7
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="#f5f7fc" stroke={MUTED} strokeWidth={1.5} />
      <line x1={cx - r} y1={cy} x2={cx + r} y2={cy} stroke={MUTED} strokeWidth={1} strokeDasharray="4 3" />
      <text x={cx} y={cy - r - 8} textAnchor="middle" fontSize={8} fill={MUTED}>
        przekrój A
      </text>
      <circle cx={cx} cy={cy - r} r={4} fill={STRESS} />
      <text x={cx + 8} y={cy - r + 4} fontSize={8} fill={STRESS}>
        A
      </text>

      <line x1={axisX} y1={cy - r - 4} x2={axisX} y2={cy + r + 4} stroke={MUTED} strokeWidth={1.1} />
      <text x={axisX} y={cy - r - 8} textAnchor="middle" fontSize={8} fill={MUTED}>
        σ_M
      </text>
      {Array.from({ length: rows }, (_, i) => {
        const t = i / (rows - 1)
        const gy = cy - r * 0.8 + t * 1.6 * r
        const value = (cy - gy) / (r * 0.8)
        const length = 36 * Math.abs(value) * draw
        const x2 = axisX + Math.sign(value) * length
        return (
          <line
            key={i}
            x1={axisX}
            y1={gy}
            x2={x2}
            y2={gy}
            stroke={STRESS}
            strokeWidth={1.8}
            markerEnd={`url(#${MARK_STRESS})`}
            opacity={0.85}
          />
        )
      })}
      <text x={axisX} y={cy + r + 24} textAnchor="middle" fontSize={8} fill={MUTED}>
        rozciąganie ↑ / ściskanie ↓
      </text>

      <text x={296} y={178} fontSize={9} fontWeight={700} fill={STRESS}>
        σ_x = 67,20 MPa
      </text>
      <text x={296} y={192} fontSize={9} fontWeight={700} fill={SHEAR}>
        τ = 18,86 MPa
      </text>
      <text x={296} y={206} fontSize={8} fill={MUTED}>
        σ_N 10,61 + σ_M 56,59
      </text>

      <g transform="translate(308 72)">
        <rect
          x={0}
          y={12}
          width={68}
          height={68}
          rx={4}
          fill={STRESS}
          fillOpacity={0.08}
          stroke={STRESS}
          strokeWidth={1.5}
        />
        <line
          x1={-4}
          y1={46}
          x2={-4 - 26 * draw}
          y2={46}
          stroke={STRESS}
          strokeWidth={2}
          markerEnd={`url(#${MARK_STRESS})`}
        />
        <line
          x1={72}
          y1={46}
          x2={72 + 26 * draw}
          y2={46}
          stroke={STRESS}
          strokeWidth={2}
          markerEnd={`url(#${MARK_STRESS})`}
        />
        <line
          x1={34}
          y1={8 - 20 * draw}
          x2={34}
          y2={8}
          stroke={SHEAR}
          strokeWidth={2}
          markerEnd={`url(#${MARK_SHEAR})`}
        />
        <line
          x1={34}
          y1={84 + 20 * draw}
          x2={34}
          y2={84}
          stroke={SHEAR}
          strokeWidth={2}
          markerEnd={`url(#${MARK_SHEAR})`}
        />
        <text x={34} y={-14} textAnchor="middle" fontSize={8} fill={MUTED}>
          element w punkcie A
        </text>
      </g>
    </g>
  )
}

function MeasuredStrainElement({ draw, dim = false }: { draw: number; dim?: boolean }) {
  const cx = 126
  const cy = 116
  const half = 44
  const dx = 8 * draw
  const dy = 4 * draw
  const shear = 6 * draw
  const x0 = cx - half - dx
  const x1 = cx + half + dx
  const y0 = cy - half + dy
  const y1 = cy + half - dy
  const points = [
    [x0 + shear, y0],
    [x1 + shear, y0],
    [x1 - shear, y1],
    [x0 - shear, y1],
  ]
    .map(([x, y]) => `${x},${y}`)
    .join(' ')

  return (
    <g opacity={dim ? 0.5 : 1}>
      <rect
        x={cx - half}
        y={cy - half}
        width={2 * half}
        height={2 * half}
        fill="none"
        stroke={MUTED}
        strokeWidth={1.1}
        strokeDasharray="4 4"
        opacity={0.7}
      />
      <motion.polygon
        points={points}
        fill={ACCENT}
        fillOpacity={0.13}
        stroke={ACCENT}
        strokeWidth={2}
        initial={false}
        animate={{ fillOpacity: 0.1 + 0.06 * draw }}
      />
      <line
        x1={x1 + shear}
        y1={cy}
        x2={x1 + shear + 20 * draw}
        y2={cy}
        stroke={ACCENT}
        strokeWidth={2}
        markerEnd={`url(#${MARK_ACCENT})`}
      />
      <line
        x1={x0 - shear}
        y1={cy}
        x2={x0 - shear - 20 * draw}
        y2={cy}
        stroke={ACCENT}
        strokeWidth={2}
        markerEnd={`url(#${MARK_ACCENT})`}
      />
      <line
        x1={cx}
        y1={y0 - 4}
        x2={cx}
        y2={y0 - 4 - 20 * draw}
        stroke={ACCENT}
        strokeWidth={2}
        markerEnd={`url(#${MARK_ACCENT})`}
      />
      <line
        x1={cx}
        y1={y1 + 4}
        x2={cx}
        y2={y1 + 4 + 20 * draw}
        stroke={ACCENT}
        strokeWidth={2}
        markerEnd={`url(#${MARK_ACCENT})`}
      />
      <text x={x1 + shear + 6} y={cy - 7} fontSize={8.5} fontWeight={700} fill={ACCENT}>
        ε_x = {EPS_X} με
      </text>
      <text x={cx + 6} y={y0 - 8} fontSize={8.5} fontWeight={700} fill={ACCENT}>
        ε_y = −100,8 με
      </text>
      <text x={cx} y={cy + 4} textAnchor="middle" fontSize={8} fill={MUTED}>
        γ_xy = {GAMMA} μrad
      </text>
    </g>
  )
}

function PrincipalAxes({ draw }: { draw: number }) {
  const cx = 126
  const cy = 116
  const angle = (-PHI * Math.PI) / 180
  const length = 66 * draw
  return (
    <g>
      <line
        x1={cx - 66}
        y1={cy}
        x2={cx + 66}
        y2={cy}
        stroke={MUTED}
        strokeWidth={1}
        strokeDasharray="3 3"
        opacity={0.6}
      />
      <line
        x1={cx}
        y1={cy - 66}
        x2={cx}
        y2={cy + 66}
        stroke={MUTED}
        strokeWidth={1}
        strokeDasharray="3 3"
        opacity={0.6}
      />
      <motion.line
        x1={cx - length * Math.cos(angle)}
        y1={cy + length * Math.sin(angle)}
        x2={cx + length * Math.cos(angle)}
        y2={cy - length * Math.sin(angle)}
        stroke={SHEAR}
        strokeWidth={2.2}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: draw }}
      />
      <text
        x={cx + length * Math.cos(angle) + 4}
        y={cy - length * Math.sin(angle) - 4}
        fontSize={8}
        fontWeight={700}
        fill={SHEAR}
      >
        I
      </text>
      <text
        x={cx - length * Math.cos(angle) - 10}
        y={cy + length * Math.sin(angle) + 10}
        fontSize={8}
        fontWeight={700}
        fill={SHEAR}
      >
        II
      </text>
      <text x={cx} y={cy + 82} textAnchor="middle" fontSize={8.5} fill={MUTED}>
        φ_I = {PHI.toLocaleString('pl-PL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}°
      </text>
    </g>
  )
}

function RosetteGauges({ draw }: { draw: number }) {
  const cx = 340
  const cy = 116
  const r = 52
  const gauges = [
    { angle: 0, label: '0°', value: '336 με', color: ACCENT },
    { angle: 45, label: '45°', value: '240,2 με', color: SHEAR },
    { angle: 90, label: '90°', value: '−100,8 με', color: STRESS },
  ]
  return (
    <g>
      <circle cx={cx} cy={cy} r={r + 8} fill="#f5f7fc" stroke="#d3d9e0" strokeWidth={1.2} />
      <text x={cx} y={cy - r - 20} textAnchor="middle" fontSize={9} fontWeight={700} fill={INK}>
        pomiar rozety
      </text>
      {gauges.map((gauge) => {
        const angle = (gauge.angle * Math.PI) / 180
        const ex = cx + Math.cos(angle) * r
        const ey = cy - Math.sin(angle) * r
        return (
          <g key={gauge.label}>
            <motion.line
              x1={cx}
              y1={cy}
              x2={ex}
              y2={ey}
              stroke={gauge.color}
              strokeWidth={2.2}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: draw }}
              transition={{ duration: 0.12, ease: 'linear' }}
            />
            <circle cx={ex} cy={ey} r={3} fill={gauge.color} />
            <text
              x={ex + (gauge.angle === 0 ? 7 : gauge.angle === 90 ? 0 : 6)}
              y={ey + (gauge.angle === 0 ? 4 : gauge.angle === 90 ? -6 : 0)}
              textAnchor={gauge.angle === 90 ? 'middle' : 'start'}
              fontSize={8}
              fill={gauge.color}
            >
              {gauge.label}: {gauge.value}
            </text>
          </g>
        )
      })}
      <text x={cx} y={cy + r + 26} textAnchor="middle" fontSize={8.5} fill={MUTED}>
        γ_xy = 245,2 μrad
      </text>
    </g>
  )
}

function MohrCircle({ draw }: { draw: number }) {
  const cx = 340
  const cy = 116
  const r = 64
  return (
    <g>
      <text x={cx} y={32} textAnchor="middle" fontSize={9} fontWeight={700} fill={SHEAR}>
        koło Mohra odkształceń
      </text>
      <line x1={cx - r - 20} y1={cy} x2={cx + r + 20} y2={cy} stroke={MUTED} strokeWidth={1.1} />
      <line x1={cx} y1={cy - r - 14} x2={cx} y2={cy + r + 14} stroke={MUTED} strokeWidth={1.1} />
      <motion.circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke={SHEAR}
        strokeWidth={2.2}
        initial={{ pathLength: 0, opacity: 0.35 }}
        animate={{ pathLength: draw, opacity: 1 }}
        transition={{ duration: 0.12, ease: 'linear' }}
      />
      <circle cx={cx} cy={cy} r={3} fill={INK} />
      <circle cx={cx + r} cy={cy} r={3.6} fill={STRESS} />
      <circle cx={cx - r} cy={cy} r={3.6} fill={ACCENT} />
      <text x={cx} y={cy - 7} textAnchor="middle" fontSize={8} fill={INK}>
        117,6 με
      </text>
      <text x={cx + r} y={cy - 10} textAnchor="middle" fontSize={8} fill={STRESS}>
        ε_I = 368,07
      </text>
      <text x={cx - r} y={cy - 10} textAnchor="middle" fontSize={8} fill={ACCENT}>
        ε_II = −132,87
      </text>
      <text x={cx + r / 2} y={cy + 14} textAnchor="middle" fontSize={8} fill={SHEAR}>
        R_ε = 250,47 με
      </text>
      <text x={cx} y={cy + r + 28} textAnchor="middle" fontSize={8.5} fill={MUTED}>
        φ_I = 14,65°
      </text>
    </g>
  )
}

function HookeLink({ draw, playing }: { draw: number; playing: boolean }) {
  const x1 = 196
  const x2 = 294
  const y = 116
  return (
    <g>
      <motion.line
        x1={x1}
        y1={y}
        x2={x2}
        y2={y}
        stroke={OK}
        strokeWidth={2.4}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: draw }}
        transition={{ duration: 0.12, ease: 'linear' }}
        markerEnd={`url(#${MARK_OK})`}
      />
      {[0, 1, 2].map((i) => (
        <motion.circle
          key={i}
          cy={y}
          r={2.6}
          fill={OK}
          initial={false}
          animate={
            playing ? { cx: [x1, x2], opacity: [0, 1, 0] } : { cx: x1 + (x2 - x1) * ((i + 1) / 4), opacity: 0.85 }
          }
          transition={
            playing ? { duration: 1.3, repeat: Infinity, delay: i * 0.32, ease: 'linear' } : { duration: 0.2 }
          }
          style={{ display: draw > 0.2 ? 'inline' : 'none' }}
        />
      ))}
      <text x={(x1 + x2) / 2} y={84} textAnchor="middle" fontSize={9} fontWeight={700} fill={OK}>
        prawo Hooke’a
      </text>
      <text x={(x1 + x2) / 2} y={97} textAnchor="middle" fontSize={8} fill={MUTED}>
        ε → σ
      </text>
      <text x={(x1 + x2) / 2} y={142} textAnchor="middle" fontSize={8} fill={INK}>
        E/(1−ν²) = 219 780 MPa
      </text>
      <text x={(x1 + x2) / 2} y={155} textAnchor="middle" fontSize={8} fill={MUTED}>
        E = 200 GPa, ν = 0,30
      </text>
    </g>
  )
}

function StressElement({ draw }: { draw: number }) {
  const cx = 356
  const cy = 116
  const half = 42
  const scale = 56 / SIGMA_I
  const sx = SIGMA_I * scale * draw
  const sy = Math.abs(SIGMA_II) * scale * draw
  return (
    <g>
      <rect
        x={cx - half}
        y={cy - half}
        width={2 * half}
        height={2 * half}
        rx={4}
        fill={STRESS}
        fillOpacity={0.1}
        stroke={STRESS}
        strokeWidth={2}
      />
      <line
        x1={cx + half + 4}
        y1={cy}
        x2={cx + half + 4 + sx}
        y2={cy}
        stroke={STRESS}
        strokeWidth={2.2}
        markerEnd={`url(#${MARK_STRESS})`}
      />
      <line
        x1={cx - half - 4}
        y1={cy}
        x2={cx - half - 4 - sx}
        y2={cy}
        stroke={STRESS}
        strokeWidth={2.2}
        markerEnd={`url(#${MARK_STRESS})`}
      />
      <line
        x1={cx}
        y1={cy - half - 4 - sy}
        x2={cx}
        y2={cy - half - 4}
        stroke={STRESS}
        strokeWidth={2.2}
        markerEnd={`url(#${MARK_STRESS})`}
      />
      <line
        x1={cx}
        y1={cy + half + 4 + sy}
        x2={cx}
        y2={cy + half + 4}
        stroke={STRESS}
        strokeWidth={2.2}
        markerEnd={`url(#${MARK_STRESS})`}
      />
      <text x={cx - half - 6} y={cy - 8} textAnchor="end" fontSize={9} fontWeight={700} fill={STRESS}>
        σ_I = 72,13 MPa
      </text>
      <text x={cx + 6} y={cy - half - 10} fontSize={9} fontWeight={700} fill={STRESS}>
        σ_II = −4,93 MPa
      </text>
      <text x={cx} y={cy + 4} textAnchor="middle" fontSize={8} fill={MUTED}>
        naprężenie
      </text>
    </g>
  )
}

function CheckGauge({ progress }: { progress: number }) {
  const x = 72
  const y = 238
  const w = 316
  const xOf = (value: number) => x + (value / RE) * w
  return (
    <g>
      <text x={x} y={y - 30} fontSize={8.5} fontWeight={700} fill={INK}>
        naprężenia zredukowane względem R_e
      </text>
      <line x1={x} y1={y} x2={x + w} y2={y} stroke={MUTED} strokeWidth={1.1} />
      <line x1={xOf(RE)} y1={y - 12} x2={xOf(RE)} y2={y + 12} stroke={OK} strokeWidth={1.6} strokeDasharray="3 3" />
      <text x={xOf(RE)} y={y - 16} textAnchor="end" fontSize={8} fill={OK}>
        R_e = 235 MPa
      </text>
      <motion.rect
        x={x}
        y={y - 5}
        height={10}
        rx={3}
        fill={ACCENT}
        fillOpacity={0.35}
        initial={false}
        animate={{ width: (xOf(HMH) - x) * progress }}
        transition={{ duration: 0.12, ease: 'linear' }}
      />
      <motion.g initial={false} animate={{ opacity: progress }} transition={{ duration: 0.15 }}>
        <line x1={xOf(HMH)} y1={y - 12} x2={xOf(HMH)} y2={y + 4} stroke={ACCENT} strokeWidth={2.2} />
        <circle cx={xOf(HMH)} cy={y - 12} r={3} fill={ACCENT} />
        <text x={xOf(HMH) - 4} y={y - 17} textAnchor="end" fontSize={8} fontWeight={700} fill={ACCENT}>
          HMH 74,72
        </text>
        <line x1={xOf(TRESCA)} y1={y + 4} x2={xOf(TRESCA)} y2={y + 16} stroke={STRESS} strokeWidth={2.2} />
        <circle cx={xOf(TRESCA)} cy={y + 16} r={3} fill={STRESS} />
        <text x={xOf(TRESCA) + 4} y={y + 27} fontSize={8} fontWeight={700} fill={STRESS}>
          Tresca 77,06
        </text>
      </motion.g>
      <text x={x} y={y + 16} fontSize={8} fill={MUTED}>
        0
      </text>
      <motion.g initial={false} animate={{ opacity: progress }}>
        <text x={x + w / 2} y={y + 44} textAnchor="middle" fontSize={9} fontWeight={700} fill={OK}>
          n_HMH = 3,15 · n_T = 3,05 &gt; 1
        </text>
      </motion.g>
    </g>
  )
}

export function StrainStressLinkExample2Animation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'loads'
  const p = playing ? clamp01(sceneProgress) : 1
  const draw = smooth(clamp01(p / 0.6))
  const linkDraw = smooth(clamp01((p - 0.12) / 0.6))
  const gaugeDraw = smooth(clamp01((p - 0.2) / 0.55))

  const showLoads = metric === 'loads'
  const showSection = metric === 'section'
  const showStrain = metric === 'strain'
  const showPrincipal = metric === 'principal'
  const showStress = metric === 'stress'
  const showCheck = metric === 'check'

  const note =
    metric === 'loads'
      ? 'N, M i T działają jednocześnie na to samo włókno.'
      : metric === 'section'
        ? 'Naprężenie normalne sumuje się z zginaniem, a skręcanie daje τ.'
        : metric === 'strain'
          ? 'Tensometry rejestrują ε_x, ε_y oraz γ_xy, a nie naprężenia.'
          : metric === 'principal'
            ? 'Kierunki główne są obrócone o 14,65° względem osi pomiaru.'
            : metric === 'stress'
              ? 'Odwrócone prawo Hooke’a daje σ_I i σ_II z odkształceń głównych.'
              : 'Tresca jest tu bardziej konserwatywna niż HMH.'

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 300"
          role="img"
          aria-label="Pręt kołowy obciążony siłą osiową, momentem gnącym i skręcającym. Animacja prowadzi od obciążeń przez naprężenia i pomiar odkształceń do naprężeń głównych i kontroli bezpieczeństwa"
        >
          <defs>
            <marker
              id={MARK_ACCENT}
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={ACCENT} />
            </marker>
            <marker
              id={MARK_STRESS}
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={STRESS} />
            </marker>
            <marker
              id={MARK_SHEAR}
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={SHEAR} />
            </marker>
            <marker
              id={MARK_OK}
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={OK} />
            </marker>
          </defs>

          <text x={16} y={22} fontSize={10} fontWeight={600} fill={INK}>
            obciążenie złożone: N + M + T
          </text>
          <text x={16} y={38} fontSize={8.5} fill={MUTED}>
            d = 60 mm · N = 30 kN · M = 1,2 kN·m · T = 800 N·m · R_e = 235 MPa
          </text>

          {showLoads ? <ShaftLoads draw={draw} playing={playing} /> : null}
          {showSection ? <SectionDiagram draw={draw} /> : null}

          {(showStrain || showPrincipal) && <MeasuredStrainElement draw={draw} dim={showPrincipal} />}
          {showStrain ? <RosetteGauges draw={gaugeDraw} /> : null}
          {showPrincipal ? (
            <>
              <PrincipalAxes draw={draw} />
              <MohrCircle draw={gaugeDraw} />
            </>
          ) : null}

          {showStress ? (
            <>
              <MeasuredStrainElement draw={draw} />
              <PrincipalAxes draw={draw} />
              <HookeLink draw={linkDraw} playing={playing} />
              <StressElement draw={draw} />
            </>
          ) : null}

          {showCheck ? <CheckGauge progress={gaugeDraw} /> : null}

          <text x={16} y={288} fontSize={8.5} fill={metric === 'check' ? OK : MUTED}>
            {note}
          </text>
        </svg>
      </div>
    </div>
  )
}
