import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const STRESS = '#ff6b45'
const MUTED = '#87929d'
const INK = '#17202a'
const OK = '#2e9e6b'
const MOHR = '#a970dd'

const MARK_STRAIN = 'ssl3-strain'
const MARK_STRESS = 'ssl3-stress'
const MARK_OK = 'ssl3-ok'

const EPS1 = 500
const EPS2 = -200
const SIGMA1 = 96.7
const SIGMA2 = -10.99
const HMH = 102.64
const TRESCA = 107.69
const RE = 235
const N_REQ = 2.0
const N_HMH = 2.29
const N_T = 2.18

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}

function StrainElement({ draw, dim = false }: { draw: number; dim?: boolean }) {
  const cx = 108
  const cy = 116
  const half = 40
  const dx = 15 * draw
  const dy = -6 * draw
  const left = cx - half - dx
  const right = cx + half + dx
  const top = cy - half - dy
  const bottom = cy + half + dy
  const arrow = 24 * draw

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
      <motion.rect
        x={left}
        y={top}
        width={2 * (half + dx)}
        height={2 * (half + dy)}
        rx={4}
        fill={ACCENT}
        fillOpacity={0.13}
        stroke={ACCENT}
        strokeWidth={2}
        initial={false}
        animate={{ fillOpacity: 0.1 + 0.06 * draw }}
      />

      <line
        x1={right + 4}
        y1={cy}
        x2={right + 4 + arrow}
        y2={cy}
        stroke={ACCENT}
        strokeWidth={2}
        markerEnd={`url(#${MARK_STRAIN})`}
      />
      <line
        x1={left - 4}
        y1={cy}
        x2={left - 4 - arrow}
        y2={cy}
        stroke={ACCENT}
        strokeWidth={2}
        markerEnd={`url(#${MARK_STRAIN})`}
      />
      <line
        x1={cx}
        y1={top - 4 - arrow}
        x2={cx}
        y2={top - 4}
        stroke={ACCENT}
        strokeWidth={2}
        markerEnd={`url(#${MARK_STRAIN})`}
      />
      <line
        x1={cx}
        y1={bottom + 4 + arrow}
        x2={cx}
        y2={bottom + 4}
        stroke={ACCENT}
        strokeWidth={2}
        markerEnd={`url(#${MARK_STRAIN})`}
      />

      <text x={right + 9} y={cy - 7} fontSize={9} fontWeight={700} fill={ACCENT}>
        ε₁ = {EPS1} με
      </text>
      <text x={cx + 6} y={top - 8} fontSize={9} fontWeight={700} fill={ACCENT}>
        ε₂ = −200 με
      </text>
      <text x={cx} y={cy + 4} textAnchor="middle" fontSize={8} fill={MUTED}>
        pomiar
      </text>
    </g>
  )
}

function GhostStressElement({ label = 'σ = ?' }: { label?: string }) {
  const cx = 356
  const cy = 116
  const half = 42
  return (
    <g>
      <rect
        x={cx - half}
        y={cy - half}
        width={2 * half}
        height={2 * half}
        rx={4}
        fill={MUTED}
        fillOpacity={0.05}
        stroke={MUTED}
        strokeWidth={1.3}
        strokeDasharray="5 4"
      />
      <text x={cx} y={cy + 4} textAnchor="middle" fontSize={11} fill={MUTED}>
        {label}
      </text>
      <text x={cx} y={cy + half + 18} textAnchor="middle" fontSize={8} fill={MUTED}>
        naprężenie z modelu
      </text>
    </g>
  )
}

function StressElement({ draw }: { draw: number }) {
  const cx = 356
  const cy = 116
  const half = 42
  const scale = 58 / SIGMA1
  const sx = SIGMA1 * scale * draw
  const sy = Math.abs(SIGMA2) * scale * draw
  const tension = SIGMA2 >= 0

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
        y1={tension ? cy - half - 4 : cy - half - 4 - sy}
        x2={cx}
        y2={tension ? cy - half - 4 - sy : cy - half - 4}
        stroke={STRESS}
        strokeWidth={2.2}
        markerEnd={`url(#${MARK_STRESS})`}
      />
      <line
        x1={cx}
        y1={tension ? cy + half + 4 : cy + half + 4 + sy}
        x2={cx}
        y2={tension ? cy + half + 4 + sy : cy + half + 4}
        stroke={STRESS}
        strokeWidth={2.2}
        markerEnd={`url(#${MARK_STRESS})`}
      />

      <text x={cx - half - 6} y={cy - 8} textAnchor="end" fontSize={9} fontWeight={700} fill={STRESS}>
        σ_I = {SIGMA1.toLocaleString('pl-PL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MPa
      </text>
      <text x={cx + 6} y={cy - half - 10} fontSize={9} fontWeight={700} fill={STRESS}>
        σ_II = −{Math.abs(SIGMA2).toLocaleString('pl-PL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MPa
      </text>
      <text x={cx} y={cy + 4} textAnchor="middle" fontSize={8} fill={MUTED}>
        naprężenie
      </text>
    </g>
  )
}

function HookeLink({ draw, playing, showCoefficient }: { draw: number; playing: boolean; showCoefficient: boolean }) {
  const x1 = 206
  const x2 = 300
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
      <text x={(x1 + x2) / 2} y={86} textAnchor="middle" fontSize={9} fontWeight={700} fill={OK}>
        prawo Hooke’a
      </text>
      <text x={(x1 + x2) / 2} y={99} textAnchor="middle" fontSize={8} fill={MUTED}>
        ε → σ
      </text>
      {showCoefficient && (
        <>
          <text x={(x1 + x2) / 2} y={142} textAnchor="middle" fontSize={8.5} fill={INK}>
            E/(1−ν²) = 219 780 MPa
          </text>
          <text x={(x1 + x2) / 2} y={155} textAnchor="middle" fontSize={8} fill={MUTED}>
            E = 200 GPa, ν = 0,30
          </text>
        </>
      )}
    </g>
  )
}

function MohrCircle({ draw }: { draw: number }) {
  const cx = 350
  const cy = 118
  const r = 64
  return (
    <g>
      <text x={cx} y={32} textAnchor="middle" fontSize={9} fontWeight={700} fill={MOHR}>
        koło Mohra odkształceń
      </text>
      <line x1={cx - r - 18} y1={cy} x2={cx + r + 18} y2={cy} stroke={MUTED} strokeWidth={1.1} />
      <line x1={cx} y1={cy - r - 14} x2={cx} y2={cy + r + 14} stroke={MUTED} strokeWidth={1.1} />
      <motion.circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke={MOHR}
        strokeWidth={2.2}
        initial={{ pathLength: 0, opacity: 0.35 }}
        animate={{ pathLength: draw, opacity: 1 }}
        transition={{ duration: 0.12, ease: 'linear' }}
      />
      <line x1={cx} y1={cy} x2={cx + r} y2={cy} stroke={MOHR} strokeWidth={1.4} strokeDasharray="4 3" />
      <circle cx={cx} cy={cy} r={3} fill={INK} />
      <circle cx={cx + r} cy={cy} r={3.6} fill={STRESS} />
      <circle cx={cx - r} cy={cy} r={3.6} fill={ACCENT} />
      <text x={cx} y={cy - 7} textAnchor="middle" fontSize={8} fill={INK}>
        150 με
      </text>
      <text x={cx + r} y={cy - 10} textAnchor="middle" fontSize={8} fill={STRESS}>
        ε_I = 500
      </text>
      <text x={cx - r} y={cy - 10} textAnchor="middle" fontSize={8} fill={ACCENT}>
        ε_II = −200
      </text>
      <text x={cx + r / 2} y={cy + 14} textAnchor="middle" fontSize={8} fill={MOHR}>
        R_ε = 350 με
      </text>
      <text x={cx} y={cy + r + 28} textAnchor="middle" fontSize={8.5} fill={MUTED}>
        γ_xy = 0, więc φ = 0°
      </text>
    </g>
  )
}

function EquivalentGauge({ progress }: { progress: number }) {
  const x = 86
  const y = 254
  const w = 300
  const xOf = (value: number) => x + (value / RE) * w
  return (
    <g>
      <text x={x} y={y - 30} fontSize={8.5} fontWeight={700} fill={INK}>
        naprężenie zredukowane względem R_e
      </text>
      <line x1={x} y1={y} x2={x + w} y2={y} stroke={MUTED} strokeWidth={1.1} />
      <line x1={xOf(RE)} y1={y - 12} x2={xOf(RE)} y2={y + 10} stroke={OK} strokeWidth={1.6} strokeDasharray="3 3" />
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
        <line x1={xOf(HMH)} y1={y - 12} x2={xOf(HMH)} y2={y + 6} stroke={ACCENT} strokeWidth={2.2} />
        <circle cx={xOf(HMH)} cy={y - 12} r={3} fill={ACCENT} />
        <text x={xOf(HMH)} y={y - 17} textAnchor="middle" fontSize={8} fontWeight={700} fill={ACCENT}>
          HMH 102,64
        </text>
        <line x1={xOf(TRESCA)} y1={y + 5} x2={xOf(TRESCA)} y2={y + 15} stroke={STRESS} strokeWidth={2.2} />
        <circle cx={xOf(TRESCA)} cy={y + 15} r={3} fill={STRESS} />
        <text x={xOf(TRESCA)} y={y + 27} textAnchor="middle" fontSize={8} fontWeight={700} fill={STRESS}>
          Tresca 107,69
        </text>
      </motion.g>
      <text x={x} y={y + 15} fontSize={8} fill={MUTED}>
        0
      </text>
    </g>
  )
}

function SafetyGauge({ progress }: { progress: number }) {
  const x = 86
  const y = 254
  const w = 300
  const max = 3
  const xOf = (value: number) => x + (value / max) * w
  const passed = N_T >= N_REQ
  return (
    <g>
      <text x={x} y={y - 30} fontSize={8.5} fontWeight={700} fill={INK}>
        współczynnik bezpieczeństwa n = R_e / σ_red
      </text>
      <line x1={x} y1={y} x2={x + w} y2={y} stroke={MUTED} strokeWidth={1.1} />
      <line
        x1={xOf(N_REQ)}
        y1={y - 14}
        x2={xOf(N_REQ)}
        y2={y + 12}
        stroke={passed ? OK : STRESS}
        strokeWidth={1.8}
        strokeDasharray="4 3"
      />
      <text x={xOf(N_REQ) - 4} y={y - 18} textAnchor="end" fontSize={8} fill={passed ? OK : STRESS}>
        n_wym = 2,0
      </text>
      <motion.rect
        x={x}
        y={y - 5}
        height={10}
        rx={3}
        fill={OK}
        fillOpacity={0.28}
        initial={false}
        animate={{ width: (xOf(N_T) - x) * progress }}
        transition={{ duration: 0.12, ease: 'linear' }}
      />
      <motion.g initial={false} animate={{ opacity: progress }} transition={{ duration: 0.15 }}>
        <line x1={xOf(N_HMH)} y1={y - 12} x2={xOf(N_HMH)} y2={y + 4} stroke={ACCENT} strokeWidth={2.2} />
        <circle cx={xOf(N_HMH)} cy={y - 12} r={3} fill={ACCENT} />
        <text x={xOf(N_HMH)} y={y - 17} textAnchor="middle" fontSize={8} fontWeight={700} fill={ACCENT}>
          n_HMH 2,29
        </text>
        <line x1={xOf(N_T)} y1={y + 4} x2={xOf(N_T)} y2={y + 16} stroke={STRESS} strokeWidth={2.2} />
        <circle cx={xOf(N_T)} cy={y + 16} r={3} fill={STRESS} />
        <text x={xOf(N_T)} y={y + 28} textAnchor="middle" fontSize={8} fontWeight={700} fill={STRESS}>
          n_T 2,18
        </text>
      </motion.g>
      <text x={x} y={y + 15} fontSize={8} fill={MUTED}>
        0
      </text>
      <text x={x + w} y={y + 15} textAnchor="end" fontSize={8} fill={MUTED}>
        3
      </text>
    </g>
  )
}

export function StrainStressLinkExample3Animation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'strain'
  const p = playing ? clamp01(sceneProgress) : 1
  const draw = smooth(clamp01(p / 0.55))
  const linkDraw = smooth(clamp01((p - 0.12) / 0.6))
  const gaugeDraw = smooth(clamp01((p - 0.2) / 0.55))

  const showMohr = metric === 'mohr'
  const showLink = metric !== 'strain' && metric !== 'mohr'
  const showStress = metric === 'stress' || metric === 'equivalent' || metric === 'check'
  const showGhost = !showStress && !showMohr
  const showHooke = metric === 'hooke'
  const showEquivalent = metric === 'equivalent'
  const showCheck = metric === 'check'

  const note =
    metric === 'strain'
      ? 'Ten sam materiał, ale odkształcenie drugiego kierunku jest ujemne.'
      : metric === 'mohr'
        ? 'Koło jest szersze, bo ε_I i ε_II mają przeciwne znaki.'
        : metric === 'hooke'
          ? 'Model materiału zamienia oba odkształcenia główne na naprężenia.'
          : metric === 'stress'
            ? 'σ_II jest ściskające, więc znak ma znaczenie przy hipotezach.'
            : metric === 'equivalent'
              ? 'Tresca jest większa od HMH, bo naprężenia mają przeciwne znaki.'
              : 'Oba zapasy przekraczają n_wym = 2,0, ale margines jest niewielki.'

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 300"
          role="img"
          aria-label="Pomiar odkształceń głównych o przeciwnych znakach, przejście przez prawo Hooke’a do naprężeń głównych oraz kontrola warunku wytrzymałości"
        >
          <defs>
            <marker
              id={MARK_STRAIN}
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
            od pomiaru do warunku wytrzymałości
          </text>
          <text x={16} y={38} fontSize={8.5} fill={MUTED}>
            ε_I = 500 με · ε_II = −200 με · E = 200 GPa · ν = 0,30
          </text>

          <StrainElement draw={draw} dim={showStress} />
          {showMohr ? <MohrCircle draw={gaugeDraw} /> : null}
          {showGhost ? <GhostStressElement /> : null}
          {showStress ? <StressElement draw={draw} /> : null}
          {showLink ? <HookeLink draw={linkDraw} playing={playing} showCoefficient={showHooke} /> : null}

          {showEquivalent ? <EquivalentGauge progress={gaugeDraw} /> : null}
          {showCheck ? <SafetyGauge progress={gaugeDraw} /> : null}

          <text x={16} y={288} fontSize={8.5} fill={metric === 'check' ? OK : MUTED}>
            {note}
          </text>
        </svg>
      </div>
    </div>
  )
}
