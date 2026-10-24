import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const BLUE = '#4f6df5'
const ORANGE = '#ff6b45'
const GREEN = '#2e9e6b'
const RED = '#d84f28'
const MUTED = '#87929d'
const EDGE = '#68727e'
const INK = '#17202a'
const LIGHT = '#c9d0d9'
const FILL = '#f3f6fc'

const SIGMA_1 = 250
const SIGMA_2 = 125
const SIGMA_3 = 0
const RE = 355
const HMH = 216.51
const TRESCA = 250
const N_HMH = 1.64
const N_T = 1.42

const CMP_LO = 200
const CMP_HI = 265
const N_LO = 1.3
const N_HI = 1.75

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}
const mix = (from: number, to: number, amount: number) => from + (to - from) * clamp01(amount)
const fmt = (value: number, digits = 1) => value.toFixed(digits).replace('.', ',')

function Arrow({
  x1,
  y1,
  x2,
  y2,
  color,
  width = 1.9,
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
  if (length < 0.6) return null
  const head = Math.min(5.4, length * 0.55)
  const wing = Math.min(2.7, length * 0.26)
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

function StressElement({
  sx,
  sy,
  labelX,
  labelY,
  opacity = 1,
}: {
  sx: number
  sy: number
  labelX: string
  labelY: string
  opacity?: number
}) {
  const cx = 102
  const cy = 112
  const half = 38
  const lenX = 7 + 25 * Math.min(1, Math.abs(sx) / 250)
  const lenY = 7 + 25 * Math.min(1, Math.abs(sy) / 250)
  return (
    <g opacity={opacity}>
      <rect
        x={cx - half}
        y={cy - half}
        width={half * 2}
        height={half * 2}
        rx={3}
        fill={FILL}
        stroke={EDGE}
        strokeWidth={1.4}
      />
      <g stroke={MUTED} strokeWidth={0.8} strokeDasharray="4 4" opacity={0.5}>
        <line x1={cx - half - 10} y1={cy} x2={cx + half + 10} y2={cy} />
        <line x1={cx} y1={cy - half - 10} x2={cx} y2={cy + half + 10} />
      </g>
      <Arrow x1={cx + half} y1={cy} x2={cx + half + lenX} y2={cy} color={BLUE} />
      <Arrow x1={cx - half} y1={cy} x2={cx - half - lenX} y2={cy} color={BLUE} />
      <Arrow x1={cx} y1={cy - half} x2={cx} y2={cy - half - lenY} color={GREEN} />
      <Arrow x1={cx} y1={cy + half} x2={cx} y2={cy + half + lenY} color={GREEN} />
      <text x={cx + half + lenX + 8} y={cy + 4} fontSize={9.5} fill={BLUE} fontWeight={600}>
        {labelX}
      </text>
      <text x={cx} y={cy - half - lenY - 7} textAnchor="middle" fontSize={9.5} fill={GREEN} fontWeight={600}>
        {labelY}
      </text>
    </g>
  )
}

function Span({
  x1,
  x2,
  y,
  color,
  amount,
  width = 2.4,
  dashed = false,
  label,
  labelY,
}: {
  x1: number
  x2: number
  y: number
  color: string
  amount: number
  width?: number
  dashed?: boolean
  label?: string
  labelY?: number
}) {
  const left = Math.min(x1, x2)
  const right = Math.max(x1, x2)
  return (
    <motion.g initial={false} animate={{ opacity: amount }} transition={{ duration: 0.25 }}>
      <line
        x1={left}
        y1={y}
        x2={right}
        y2={y}
        stroke={color}
        strokeWidth={width}
        strokeDasharray={dashed ? '4 4' : undefined}
        strokeLinecap="round"
      />
      <line x1={left} y1={y - 4} x2={left} y2={y + 4} stroke={color} strokeWidth={width} />
      <line x1={right} y1={y - 4} x2={right} y2={y + 4} stroke={color} strokeWidth={width} />
      {label && (
        <text
          x={(left + right) / 2}
          y={labelY ?? y + 12}
          textAnchor="middle"
          fontSize={8.5}
          fill={color}
          fontWeight={600}
        >
          {label}
        </text>
      )}
    </motion.g>
  )
}

function PrincipalAxis({ metric, p }: { metric: string; p: number }) {
  const left = 252
  const right = 442
  const y = 104
  const low = -25
  const high = 285
  const xOf = (value: number) => left + ((value - low) / (high - low)) * (right - left)
  const x1 = xOf(SIGMA_1)
  const x2 = xOf(SIGMA_2)
  const x3 = xOf(SIGMA_3)
  const isHmh = metric === 'hmh'
  const isTresca = metric === 'tresca'
  const isCompare = metric === 'compare'
  const isCheck = metric === 'check'
  const isOrder = metric === 'order'
  const blueAmount = isHmh ? smooth(p) : isCompare || isCheck ? 0.55 : isTresca ? 0.22 : 0
  const orangeAmount = isTresca ? smooth(p) : isCompare || isCheck ? 1 : 0
  const wrongAmount = isOrder ? smooth(p) : 0

  return (
    <g>
      <text x={left} y={46} fontSize={9} fill={MUTED} fontWeight={600}>
        naprężenia główne w ściance
      </text>
      <text x={right} y={46} textAnchor="end" fontSize={8.5} fill={MUTED}>
        σI ≥ σII ≥ σIII
      </text>
      <line x1={left} y1={y} x2={right} y2={y} stroke={LIGHT} strokeWidth={1.2} />
      <text x={right + 4} y={y + 3} fontSize={9} fill={MUTED}>
        σ
      </text>
      <circle cx={x1} cy={y} r={4.4} fill={BLUE} />
      <circle cx={x2} cy={y} r={4.4} fill={MUTED} />
      <circle cx={x3} cy={y} r={4.4} fill={ORANGE} />
      <line x1={x1} y1={y - 7} x2={x1} y2={72} stroke={BLUE} strokeWidth={0.9} strokeDasharray="2 3" />
      <text x={x1} y={64} textAnchor="middle" fontSize={9} fill={BLUE} fontWeight={600}>
        σI 250
      </text>
      <line x1={x2} y1={y + 7} x2={x2} y2={118} stroke={MUTED} strokeWidth={0.9} strokeDasharray="2 3" />
      <text x={x2 + 4} y={124} fontSize={9} fill={MUTED} fontWeight={600}>
        σII 125
      </text>
      <line x1={x3} y1={y + 7} x2={x3} y2={128} stroke={ORANGE} strokeWidth={0.9} strokeDasharray="2 3" />
      <text x={x3 - 4} y={136} textAnchor="end" fontSize={9} fill={ORANGE} fontWeight={600}>
        σIII 0
      </text>

      {isOrder && (
        <motion.g initial={false} animate={{ opacity: wrongAmount }} transition={{ duration: 0.25 }}>
          <circle cx={x3} cy={y} r={9} fill="none" stroke={ORANGE} strokeWidth={1.6} />
          <text x={x3} y={y - 16} textAnchor="middle" fontSize={8.5} fill={ORANGE} fontWeight={600}>
            najmniejsze
          </text>
          <Span
            x1={x2}
            x2={x1}
            y={172}
            color={RED}
            amount={wrongAmount}
            width={2}
            dashed
            label="pominięte zero → 125 MPa"
            labelY={186}
          />
          <text x={(x1 + x2) / 2} y={166} textAnchor="middle" fontSize={10} fill={RED} fontWeight={700}>
            ×
          </text>
        </motion.g>
      )}

      <Span
        x1={x3}
        x2={x1}
        y={156}
        color={ORANGE}
        amount={orangeAmount}
        width={3}
        label="σT = σI − σIII"
        labelY={148}
      />
      <Span x1={x1} x2={x2} y={166} color={BLUE} amount={blueAmount} width={2} />
      <Span x1={x2} x2={x3} y={174} color={BLUE} amount={blueAmount} width={2} />
      <Span x1={x3} x2={x1} y={182} color={BLUE} amount={blueAmount} width={2.6} />
      {blueAmount > 0.01 && (
        <motion.text
          x={left}
          y={198}
          fontSize={8.5}
          fill={BLUE}
          initial={false}
          animate={{ opacity: blueAmount }}
          transition={{ duration: 0.25 }}
        >
          HMH: ½(ΔI² + ΔII² + ΔIII²)
        </motion.text>
      )}
    </g>
  )
}

function Ruler() {
  const left = 52
  const right = 432
  const y = 252
  return (
    <g>
      <line x1={left} y1={y} x2={right} y2={y} stroke={LIGHT} strokeWidth={1.2} />
      <text x={left} y={y + 14} fontSize={8.5} fill={MUTED}>
        {`${CMP_LO} MPa`}
      </text>
      <text x={right} y={y + 14} textAnchor="end" fontSize={8.5} fill={MUTED}>
        {`${CMP_HI} MPa`}
      </text>
    </g>
  )
}

export function CriteriaComparison2Animation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'state'
  const p = playing ? smooth(sceneProgress) : 1
  const isState = metric === 'state'
  const isOrder = metric === 'order'
  const isHmh = metric === 'hmh'
  const isTresca = metric === 'tresca'
  const isCompare = metric === 'compare'
  const isCheck = metric === 'check'

  const left = 52
  const right = 432
  const y = 252
  const xOf = (value: number) => left + ((value - CMP_LO) / (CMP_HI - CMP_LO)) * (right - left)
  const xOfN = (value: number) => left + ((value - N_LO) / (N_HI - N_LO)) * (right - left)

  const hmhAmount = isHmh ? smooth(p) : isTresca || isCompare ? 1 : 0
  const trescaAmount = isTresca ? smooth(p) : isCompare ? 1 : 0
  const hmhValue = mix(CMP_LO, HMH, hmhAmount)
  const trescaValue = mix(CMP_LO, TRESCA, trescaAmount)
  const hmhX = xOf(hmhValue)
  const trescaX = xOf(trescaValue)
  const bracketAmount = isCompare ? smooth(clamp01((p - 0.45) / 0.55)) : 0
  const nAmount = isCheck ? smooth(p) : 0
  const nHmhValue = mix(N_LO, N_HMH, smooth(clamp01(p * 1.15)))
  const nTValue = mix(N_LO, N_T, smooth(clamp01((p - 0.18) * 1.35)))
  const nHmhX = xOfN(nHmhValue)
  const nTX = xOfN(nTValue)
  const showRuler = isHmh || isTresca || isCompare

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 320"
          role="img"
          aria-label="Zbiornik cylindryczny: porównanie naprężeń zredukowanych HMH 216,5 megapaskala i Tresca 250 megapaskala oraz decydującej hipotezy Tresca."
        >
          <text x={12} y={22} fontSize={9.5} fill={INK} fontWeight={600}>
            cienkościenny zbiornik, ten sam punkt
          </text>
          <text x={12} y={36} fontSize={8.5} fill={MUTED}>
            {`σ1 = ${SIGMA_1} MPa · σ2 = ${SIGMA_2} MPa · σ3 = ${SIGMA_3} · Rₑ = ${RE} MPa`}
          </text>

          <StressElement
            sx={SIGMA_1}
            sy={SIGMA_2}
            labelX="σθ = 250"
            labelY="σz = 125"
            opacity={isState || isOrder ? 1 : 0.82}
          />
          <text x={102} y={178} textAnchor="middle" fontSize={8.5} fill={MUTED}>
            σr ≈ 0 na powierzchni
          </text>

          <PrincipalAxis metric={metric} p={p} />

          <text x={12} y={212} fontSize={9.5} fill={INK} fontWeight={600}>
            {isCheck
              ? 'kontrola zapasu n = Rₑ / σred'
              : isState || isOrder
                ? 'ta sama granica, ten sam punkt'
                : 'wspólna skala naprężeń zredukowanych'}
          </text>
          <text x={432} y={212} textAnchor="end" fontSize={8.5} fill={MUTED}>
            {isCheck ? 'oba zapasy > 1' : `Rₑ = ${RE} MPa`}
          </text>

          {(isState || isOrder) && (
            <g>
              <line x1={52} y1={y} x2={432} y2={y} stroke={LIGHT} strokeWidth={1.2} strokeDasharray="5 4" />
              <text x={52} y={y + 14} fontSize={8.5} fill={MUTED}>
                σred = ?
              </text>
              <text x={432} y={y + 14} textAnchor="end" fontSize={8.5} fill={MUTED}>
                {`Rₑ = ${RE} MPa`}
              </text>
            </g>
          )}

          {showRuler && (
            <g>
              <Ruler />
              {hmhAmount > 0.01 && (
                <g>
                  <line x1={hmhX} y1={y} x2={hmhX} y2={228} stroke={BLUE} strokeWidth={1.4} />
                  <circle cx={hmhX} cy={224} r={4.6} fill={BLUE} />
                  <text x={hmhX} y={214} textAnchor="middle" fontSize={8.5} fill={BLUE} fontWeight={600}>
                    {`HMH ${fmt(hmhValue, 2)}`}
                  </text>
                </g>
              )}
              {trescaAmount > 0.01 && (
                <g>
                  <line x1={trescaX} y1={y} x2={trescaX} y2={276} stroke={ORANGE} strokeWidth={1.4} />
                  <circle cx={trescaX} cy={280} r={4.6} fill={ORANGE} />
                  <text x={trescaX} y={296} textAnchor="middle" fontSize={8.5} fill={ORANGE} fontWeight={600}>
                    {`Tresca ${fmt(trescaValue, 2)}`}
                  </text>
                </g>
              )}
              {bracketAmount > 0.01 && (
                <motion.g initial={false} animate={{ opacity: bracketAmount }} transition={{ duration: 0.22 }}>
                  <line x1={hmhX} y1={300} x2={trescaX} y2={300} stroke={ORANGE} strokeWidth={1.2} />
                  <line x1={hmhX} y1={296} x2={hmhX} y2={304} stroke={ORANGE} strokeWidth={1.2} />
                  <line x1={trescaX} y1={296} x2={trescaX} y2={304} stroke={ORANGE} strokeWidth={1.2} />
                  <text
                    x={(hmhX + trescaX) / 2}
                    y={310}
                    textAnchor="middle"
                    fontSize={8}
                    fill={ORANGE}
                    fontWeight={600}
                  >
                    {`Δ = ${fmt(TRESCA - HMH, 1)} MPa (${fmt(((TRESCA - HMH) / HMH) * 100, 1)}%)`}
                  </text>
                  <text x={52} y={306} fontSize={8.5} fill={ORANGE} fontWeight={600}>
                    decyduje Tresca
                  </text>
                </motion.g>
              )}
            </g>
          )}

          {isCheck && (
            <g>
              <line x1={left} y1={y} x2={right} y2={y} stroke={LIGHT} strokeWidth={1.2} />
              <text x={left} y={y + 14} fontSize={8.5} fill={MUTED}>
                {`n = ${fmt(N_LO, 2)}`}
              </text>
              <text x={right} y={y + 14} textAnchor="end" fontSize={8.5} fill={MUTED}>
                {`n = ${fmt(N_HI, 2)}`}
              </text>
              {nAmount > 0.01 && (
                <g>
                  <line x1={nTX} y1={y} x2={nTX} y2={276} stroke={ORANGE} strokeWidth={1.4} />
                  <circle cx={nTX} cy={280} r={4.6} fill={ORANGE} />
                  <text x={nTX} y={296} textAnchor="middle" fontSize={8.5} fill={ORANGE} fontWeight={600}>
                    {`Tresca nT ${fmt(nTValue, 2)}`}
                  </text>
                  <line x1={nHmhX} y1={y} x2={nHmhX} y2={228} stroke={BLUE} strokeWidth={1.4} />
                  <circle cx={nHmhX} cy={224} r={4.6} fill={BLUE} />
                  <text x={nHmhX} y={214} textAnchor="middle" fontSize={8.5} fill={BLUE} fontWeight={600}>
                    {`HMH n ${fmt(nHmhValue, 2)}`}
                  </text>
                  <text x={52} y={306} fontSize={8.5} fill={ORANGE} fontWeight={600}>
                    mniejszy zapas → decyduje Tresca
                  </text>
                </g>
              )}
            </g>
          )}
        </svg>
      </div>
    </div>
  )
}
