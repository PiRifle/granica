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

const SIGMA = 60
const RE = 235
const N_REQ = 2
const KR = 117.5
const KR2 = 13806.25
const NORMAL2 = 3600
const SHEAR2 = 10206.25
const TAU2 = 3402.08
const TAU = 58.33
const TAU_TRESCA = 50.51

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}
const pl = (value: number, digits = 2) => value.toFixed(digits).replace('.', ',')
const thousands = (value: number) => value.toLocaleString('pl-PL').replace(/\u00a0/g, ' ')

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

function StressElement({ cx, cy, half, draw }: { cx: number; cy: number; half: number; draw: number }) {
  const sigmaArm = 34 * draw
  const tauArm = 26 * draw

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

      <Arrow x1={cx + half + 2} y1={cy} x2={cx + half + 2 + sigmaArm} y2={cy} color={STRESS} width={2.3} />
      <Arrow x1={cx - half - 2} y1={cy} x2={cx - half - 2 - sigmaArm} y2={cy} color={STRESS} width={2.3} />
      <text x={cx + half + 5} y={cy + 16} fontSize={8.5} fontWeight={700} fill={STRESS}>
        σ = {SIGMA} MPa
      </text>

      <Arrow x1={cx + half} y1={cy + 6} x2={cx + half} y2={cy + 6 - tauArm} color={VIOLET} width={2.2} opacity={0.9} />
      <text x={cx + half + 7} y={cy - half + 4} fontSize={8.5} fontWeight={700} fill={VIOLET}>
        τ = ?
      </text>
      <text x={cx} y={cy + half + 17} textAnchor="middle" fontSize={8} fill={MUTED}>
        σy = 0 · σz = 0
      </text>
    </g>
  )
}

function AllowableGauge({ progress }: { progress: number }) {
  const x = 84
  const y = 158
  const width = 356
  const max = 235
  const xOf = (value: number) => x + (value / max) * width
  const draw = smooth(progress)

  return (
    <g>
      <text x={24} y={26} fontSize={10} fontWeight={700} fill={INK}>
        naprężenie dopuszczalne
      </text>
      <text x={24} y={41} fontSize={8.5} fill={MUTED}>
        k_r = {pl(KR, 1)} MPa = R_e / n, gdzie n = 2,0
      </text>

      <line x1={x} y1={y} x2={x + width} y2={y} stroke={MUTED} strokeWidth={1.1} />
      {[0, 50, 100, 117.5, 150, 200, 235].map((tick) => (
        <g key={tick}>
          <line x1={xOf(tick)} y1={y - 5} x2={xOf(tick)} y2={y + 5} stroke={MUTED} strokeWidth={1} />
          <text x={xOf(tick)} y={y + 18} textAnchor="middle" fontSize={8} fill={MUTED}>
            {tick === 117.5 ? '117,5' : tick}
          </text>
        </g>
      ))}

      <rect x={x} y={y - 10} width={width} height={20} rx={6} fill="#edf1f5" />
      <motion.rect
        x={x}
        y={y - 10}
        height={20}
        rx={6}
        fill={GREEN}
        fillOpacity={0.24}
        stroke={GREEN}
        strokeWidth={1.2}
        initial={false}
        animate={{ width: (xOf(KR) - x) * draw }}
        transition={{ duration: 0.12, ease: 'linear' }}
      />
      <motion.rect
        x={x}
        y={y - 10}
        height={20}
        rx={6}
        fill={ACCENT}
        fillOpacity={0.18}
        initial={false}
        animate={{ width: (xOf(RE) - x) * draw }}
        transition={{ duration: 0.12, ease: 'linear' }}
      />

      <motion.g initial={false} animate={{ opacity: draw }}>
        <line x1={xOf(KR)} y1={y - 24} x2={xOf(KR)} y2={y + 8} stroke={GREEN} strokeWidth={2.4} />
        <circle cx={xOf(KR)} cy={y - 24} r={3.4} fill={GREEN} />
        <text x={xOf(KR)} y={y - 30} textAnchor="middle" fontSize={8.5} fontWeight={700} fill={GREEN}>
          k_r = {pl(KR, 1)}
        </text>
        <line x1={xOf(RE)} y1={y - 10} x2={xOf(RE)} y2={y + 12} stroke={STRESS} strokeWidth={2} />
        <text x={xOf(RE)} y={y - 16} textAnchor="middle" fontSize={8} fill={STRESS}>
          R_e = {RE}
        </text>
      </motion.g>

      <text x={x} y={y + 52} fontSize={9} fill={GREEN}>
        Poziom dopuszczalny to połowa granicy, bo wymagany zapas wynosi 2,0.
      </text>
      <text x={24} y={232} fontSize={9} fill={INK}>
        Warunek: √(60² + 3τ²) ≤ {pl(KR, 1)} MPa.
      </text>
      <text x={24} y={250} fontSize={8.8} fill={MUTED}>
        Dopiero teraz można szukać maksymalnego τ.
      </text>
    </g>
  )
}

function BudgetBar({ progress }: { progress: number }) {
  const x = 80
  const y = 132
  const width = 360
  const total = KR2
  const normalW = (NORMAL2 / total) * width
  const shearW = (SHEAR2 / total) * width
  const draw = smooth(progress)
  const normalDraw = smooth(clamp01(progress / 0.55))
  const shearDraw = smooth(clamp01((progress - 0.28) / 0.62))

  return (
    <g>
      <text x={24} y={26} fontSize={10} fontWeight={700} fill={INK}>
        budżet energii HMH
      </text>
      <text x={24} y={41} fontSize={8.5} fill={MUTED}>
        σHMH² ≤ k_r² = 117,5² = {thousands(KR2)} MPa²
      </text>

      <rect x={x} y={y} width={width} height={30} rx={5} fill="#edf1f5" />
      <motion.rect
        x={x}
        y={y}
        height={30}
        fill={ACCENT}
        fillOpacity={0.26}
        stroke={ACCENT}
        strokeWidth={1.1}
        initial={false}
        animate={{ width: normalW * normalDraw }}
        transition={{ duration: 0.12, ease: 'linear' }}
      />
      <motion.rect
        x={x + normalW}
        y={y}
        height={30}
        fill={STRESS}
        fillOpacity={0.24}
        stroke={STRESS}
        strokeWidth={1.1}
        initial={false}
        animate={{ width: shearW * shearDraw }}
        transition={{ duration: 0.12, ease: 'linear' }}
      />

      <text x={x + normalW / 2} y={y - 8} textAnchor="middle" fontSize={8.5} fontWeight={700} fill={ACCENT}>
        60² = 3 600
      </text>
      <text x={x + normalW + shearW / 2} y={y - 8} textAnchor="middle" fontSize={8.5} fontWeight={700} fill={STRESS}>
        3τ² ≤ 10 206,25
      </text>
      <text x={x + width} y={y + 46} textAnchor="end" fontSize={8.5} fill={MUTED}>
        cały dopuszczalny budżet
      </text>

      <motion.g initial={false} animate={{ opacity: smooth(clamp01((progress - 0.4) / 0.4)) }}>
        <text x={x} y={y + 76} fontSize={9} fill={INK}>
          Człon normalny zajmuje 3 600 z {thousands(KR2)} MPa².
        </text>
        <text x={x} y={y + 94} fontSize={9} fill={INK}>
          Na ścinanie zostaje 3τ² ≤ 10 206,25 MPa².
        </text>
        <text x={x} y={y + 112} fontSize={8.5} fill={MUTED}>
          To nie jest granica materiału, lecz budżet wynikający z przyjętego zapasu.
        </text>
      </motion.g>

      <text x={24} y={278} fontSize={8.5} fill={MUTED}>
        Większe τ zwiększa tylko część dewiatorową, nie zmieniając σ.
      </text>
    </g>
  )
}

function CurvePlot({ progress }: { progress: number }) {
  const plotX = 82
  const plotY = 230
  const plotW = 356
  const plotH = 166
  const tauMaxPlot = 80
  const hmhMaxPlot = 140
  const xOf = (tau: number) => plotX + (tau / tauMaxPlot) * plotW
  const yOf = (hmh: number) => plotY + 18 - (hmh / hmhMaxPlot) * plotH
  const draw = smooth(progress)
  const tauNow = TAU * draw
  const hmhNow = Math.sqrt(NORMAL2 + 3 * tauNow ** 2)
  const path = Array.from({ length: 61 }, (_, i) => {
    const tau = (i / 60) * tauMaxPlot
    return `${i === 0 ? 'M' : 'L'} ${xOf(tau)} ${yOf(Math.sqrt(NORMAL2 + 3 * tau ** 2))}`
  }).join(' ')

  return (
    <g>
      <text x={24} y={26} fontSize={10} fontWeight={700} fill={INK}>
        rozwiązanie warunku HMH
      </text>
      <text x={24} y={41} fontSize={8.5} fill={MUTED}>
        σHMH(τ) = √(60² + 3τ²) przecina poziom dopuszczalny
      </text>

      <line x1={plotX} y1={plotY + 18} x2={plotX + plotW + 6} y2={plotY + 18} stroke={MUTED} strokeWidth={1.1} />
      <line x1={plotX} y1={plotY + 26} x2={plotX} y2={plotY + 18 - plotH - 6} stroke={MUTED} strokeWidth={1.1} />
      <text x={plotX + plotW + 8} y={plotY + 14} textAnchor="end" fontSize={8.5} fill={MUTED}>
        τ [MPa]
      </text>
      <text x={plotX - 6} y={plotY + 18 - plotH - 2} textAnchor="end" fontSize={8.5} fill={MUTED}>
        σHMH [MPa]
      </text>

      {[0, 40, 80].map((tick) => (
        <g key={tick}>
          <line x1={xOf(tick)} y1={plotY + 18} x2={xOf(tick)} y2={plotY + 24} stroke={MUTED} strokeWidth={1} />
          <text x={xOf(tick)} y={plotY + 34} textAnchor="middle" fontSize={8} fill={MUTED}>
            {tick}
          </text>
        </g>
      ))}
      {[0, 60, 117.5, 140].map((tick) => (
        <g key={tick}>
          <line x1={plotX - 4} y1={yOf(tick)} x2={plotX} y2={yOf(tick)} stroke={MUTED} strokeWidth={1} />
          <text x={plotX - 7} y={yOf(tick) + 3} textAnchor="end" fontSize={8} fill={MUTED}>
            {tick === 117.5 ? '117,5' : tick}
          </text>
        </g>
      ))}

      <line
        x1={plotX}
        y1={yOf(KR)}
        x2={plotX + plotW}
        y2={yOf(KR)}
        stroke={GREEN}
        strokeWidth={1.6}
        strokeDasharray="4 4"
      />
      <text x={plotX + plotW - 4} y={yOf(KR) - 6} textAnchor="end" fontSize={8.5} fontWeight={700} fill={GREEN}>
        k_r = {pl(KR, 1)} MPa
      </text>

      <motion.path
        d={path}
        fill="none"
        stroke={ACCENT}
        strokeWidth={2.3}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: draw }}
        transition={{ duration: 0.12, ease: 'linear' }}
      />

      <line
        x1={xOf(TAU)}
        y1={yOf(KR)}
        x2={xOf(TAU)}
        y2={plotY + 18}
        stroke={STRESS}
        strokeWidth={1.4}
        strokeDasharray="3 3"
        opacity={draw}
      />
      <motion.circle
        cx={xOf(tauNow)}
        cy={yOf(hmhNow)}
        r={4.5}
        fill={STRESS}
        initial={false}
        animate={{ cx: xOf(tauNow), cy: yOf(hmhNow) }}
        transition={{ duration: 0.1, ease: 'linear' }}
      />
      <text x={xOf(TAU) + 6} y={plotY + 10} fontSize={8.5} fontWeight={700} fill={STRESS} opacity={draw}>
        τ = {pl(TAU, 1)} MPa
      </text>
      <text x={xOf(TAU) + 6} y={yOf(KR) - 6} fontSize={8} fill={STRESS} opacity={draw}>
        σHMH = k_r
      </text>

      <text x={24} y={278} fontSize={8.5} fill={MUTED}>
        Punkt przecięcia wyznacza maksymalne dopuszczalne τ.
      </text>
    </g>
  )
}

function CheckPanel({ progress }: { progress: number }) {
  const x = 96
  const y = 100
  const width = 344
  const maxN = 2.5
  const xOfN = (value: number) => x + (value / maxN) * width
  const draw = smooth(progress)

  const tauY = 196
  const tauMax = 70
  const xOfTau = (value: number) => x + (value / tauMax) * width

  return (
    <g>
      <text x={24} y={26} fontSize={10} fontWeight={700} fill={INK}>
        sprawdzenie bezpieczeństwa
      </text>
      <text x={24} y={41} fontSize={8.5} fill={MUTED}>
        n = R_e / σHMH oraz porównanie z Trescą
      </text>

      <text x={x} y={y - 30} fontSize={9} fill={GREEN}>
        HMH: n = 2,00
      </text>
      <rect x={x} y={y - 18} width={width} height={20} rx={5} fill="#edf1f5" />
      <motion.rect
        x={x}
        y={y - 18}
        height={20}
        rx={5}
        fill={GREEN}
        fillOpacity={0.27}
        stroke={GREEN}
        strokeWidth={1.2}
        initial={false}
        animate={{ width: (xOfN(N_REQ) - x) * draw }}
        transition={{ duration: 0.12, ease: 'linear' }}
      />
      <line
        x1={xOfN(N_REQ)}
        y1={y - 26}
        x2={xOfN(N_REQ)}
        y2={y + 10}
        stroke={GREEN}
        strokeWidth={2}
        strokeDasharray="3 3"
      />
      <text x={xOfN(N_REQ)} y={y - 30} textAnchor="middle" fontSize={8} fill={GREEN}>
        n_wym = 2,0
      </text>
      <text x={x} y={y + 18} fontSize={8.5} fill={GREEN}>
        Warunek spełniony z równością — to jest rozwiązanie graniczne.
      </text>

      <line x1={x} y1={tauY} x2={x + width} y2={tauY} stroke={MUTED} strokeWidth={1.1} />
      <text x={x} y={tauY - 22} fontSize={9} fill={ACCENT}>
        τ_dop według HMH = {pl(TAU, 1)} MPa
      </text>
      <rect x={x} y={tauY - 12} width={width} height={18} rx={5} fill="#edf1f5" />
      <motion.rect
        x={x}
        y={tauY - 12}
        height={18}
        rx={5}
        fill={ACCENT}
        fillOpacity={0.28}
        stroke={ACCENT}
        strokeWidth={1.1}
        initial={false}
        animate={{ width: (xOfTau(TAU) - x) * draw }}
        transition={{ duration: 0.12, ease: 'linear' }}
      />
      <line x1={xOfTau(TAU)} y1={tauY - 16} x2={xOfTau(TAU)} y2={tauY + 8} stroke={ACCENT} strokeWidth={2} />
      <text x={xOfTau(TAU)} y={tauY - 17} textAnchor="middle" fontSize={8} fontWeight={700} fill={ACCENT}>
        {pl(TAU, 1)}
      </text>

      <text x={x} y={tauY + 26} fontSize={9} fill={STRESS}>
        τ_dop według Treski = {pl(TAU_TRESCA, 1)} MPa
      </text>
      <motion.rect
        x={x}
        y={tauY + 34}
        height={18}
        rx={5}
        fill={STRESS}
        fillOpacity={0.23}
        stroke={STRESS}
        strokeWidth={1.1}
        initial={false}
        animate={{ width: (xOfTau(TAU_TRESCA) - x) * draw }}
        transition={{ duration: 0.12, ease: 'linear' }}
      />
      <line
        x1={xOfTau(TAU_TRESCA)}
        y1={tauY + 30}
        x2={xOfTau(TAU_TRESCA)}
        y2={tauY + 56}
        stroke={STRESS}
        strokeWidth={2}
      />
      <text x={xOfTau(TAU_TRESCA)} y={tauY + 68} textAnchor="middle" fontSize={8} fontWeight={700} fill={STRESS}>
        {pl(TAU_TRESCA, 1)}
      </text>

      <text x={24} y={280} fontSize={8.5} fill={MUTED}>
        Tresca dopuszcza mniejsze τ, więc jest bardziej zachowawcza.
      </text>
    </g>
  )
}

export function HmhExample3Animation({ scene, index, playing, stepProgress, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const progress = playing ? smooth(sceneProgress) : 1
  const pulse = playing ? 0.55 + 0.45 * Math.sin((sceneProgress * 2 + stepProgress + index) * Math.PI * 2) : 1

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 480 300"
          role="img"
          aria-label="Element rozciągany i ścinany, naprężenie dopuszczalne, budżet energii HMH, wykres rozwiązania oraz sprawdzenie zapasu i porównanie z Trescą."
        >
          {metric === 'model' && (
            <>
              <text x={24} y={26} fontSize={10} fontWeight={700} fill={INK}>
                element pod złożonym stanem naprężenia
              </text>
              <text x={24} y={41} fontSize={8.5} fill={MUTED}>
                σ = {SIGMA} MPa · σy = 0 · R_e = {RE} MPa · n_wym = {N_REQ},0
              </text>

              <StressElement cx={138} cy={158} half={42} draw={progress} />

              <text x={276} y={112} fontSize={9} fill={INK}>
                szukane:
              </text>
              <text x={276} y={130} fontSize={9.5} fontWeight={700} fill={VIOLET}>
                τ_dop = ?
              </text>
              <text x={276} y={154} fontSize={8.5} fill={MUTED}>
                Warunek: σHMH ≤ k_r
              </text>
              <text x={276} y={172} fontSize={8.5} fill={MUTED}>
                k_r = R_e / n = {pl(KR, 1)} MPa
              </text>

              <motion.circle
                cx={276}
                cy={198}
                r={5}
                fill="none"
                stroke={VIOLET}
                strokeWidth={1.2}
                animate={{ opacity: playing ? [0.35, pulse, 0.35] : 0.7 }}
                transition={{ duration: 1.8, repeat: playing ? Infinity : 0, ease: 'easeInOut' }}
              />
              <text x={286} y={202} fontSize={8.5} fill={VIOLET}>
                naprężenie styczne rośnie
              </text>

              <text x={24} y={264} fontSize={8.8} fill={MUTED}>
                Znane σ zajmuje część dopuszczalnego budżetu, więc τ musi się zmieścić w reszcie.
              </text>
              <text x={24} y={281} fontSize={8.8} fill={MUTED}>
                Hipoteza HMH wiąże oba naprężenia przez energię zmiany postaci.
              </text>
            </>
          )}

          {metric === 'allowable' && <AllowableGauge progress={progress} />}
          {metric === 'energy' && <BudgetBar progress={progress} />}
          {metric === 'solve' && <CurvePlot progress={progress} />}
          {metric === 'check' && <CheckPanel progress={progress} />}

          <text x={456} y={292} textAnchor="end" fontSize={8} fill={MUTED}>
            {metric === 'model'
              ? 'model i dane'
              : metric === 'allowable'
                ? 'poziom dopuszczalny'
                : metric === 'energy'
                  ? 'budżet energii'
                  : metric === 'solve'
                    ? 'rozwiązanie warunku'
                    : 'kontrola zapasu'}
          </text>
        </svg>
      </div>
    </div>
  )
}
