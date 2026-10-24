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

const RE = 235
const N_REQ = 2
const TAU = 60
const TAU_HMH = 67.8
const TAU_T = 58.75
const N_HMH = 2.26
const N_T = 1.96

const TAU_LO = 50
const TAU_HI = 75
const N_LO = 1.85
const N_HI = 2.35
const HMH_EQ = 103.92
const TRESCA_EQ = 120
const SIG_DOP = 117.5
const CMP_LO = 90
const CMP_HI = 130

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

function ShearElement({ tauLabel, opacity = 1 }: { tauLabel: string; opacity?: number }) {
  const cx = 102
  const cy = 106
  const half = 38
  const len = 22
  const offset = 15
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
      <Arrow x1={cx + half} y1={cy + offset} x2={cx + half} y2={cy + offset - len} color={ORANGE} width={1.8} />
      <Arrow x1={cx - half} y1={cy - offset} x2={cx - half} y2={cy - offset + len} color={ORANGE} width={1.8} />
      <Arrow x1={cx - offset} y1={cy - half} x2={cx - offset + len} y2={cy - half} color={ORANGE} width={1.8} />
      <Arrow x1={cx + offset} y1={cy + half} x2={cx + offset - len} y2={cy + half} color={ORANGE} width={1.8} />
      <text x={cx + half + 8} y={cy - 6} fontSize={9.5} fill={ORANGE} fontWeight={600}>
        {tauLabel}
      </text>
      <text x={cx - half - 8} y={cy + 4} textAnchor="end" fontSize={9} fill={MUTED}>
        σ = 0
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
  label,
  labelY,
}: {
  x1: number
  x2: number
  y: number
  color: string
  amount: number
  width?: number
  label?: string
  labelY?: number
}) {
  const left = Math.min(x1, x2)
  const right = Math.max(x1, x2)
  return (
    <motion.g initial={false} animate={{ opacity: amount }} transition={{ duration: 0.25 }}>
      <line x1={left} y1={y} x2={right} y2={y} stroke={color} strokeWidth={width} strokeLinecap="round" />
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
  const low = -75
  const high = 75
  const xOf = (value: number) => left + ((value - low) / (high - low)) * (right - left)
  const x1 = xOf(60)
  const x2 = xOf(0)
  const x3 = xOf(-60)
  const isHmh = metric === 'hmh'
  const isTresca = metric === 'tresca'
  const isCompare = metric === 'compare'
  const isCheck = metric === 'check'
  const showValues = isCompare || isCheck
  const blueAmount = isHmh ? smooth(p) : isCompare || isCheck ? 0.4 : 0
  const orangeAmount = isTresca ? smooth(p) : isCompare || isCheck ? 0.8 : 0
  const symbol = showValues ? '60' : 'τ'

  return (
    <g>
      <text x={left} y={46} fontSize={9} fill={MUTED} fontWeight={600}>
        naprężenia główne przy czystym ścinaniu
      </text>
      <text x={right} y={46} textAnchor="end" fontSize={8.5} fill={MUTED}>
        σI = +τ, σIII = −τ
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
        {`σI = +${symbol}`}
      </text>
      <line x1={x2} y1={y + 7} x2={x2} y2={130} stroke={MUTED} strokeWidth={0.9} strokeDasharray="2 3" />
      <text x={x2} y={142} textAnchor="middle" fontSize={9} fill={MUTED} fontWeight={600}>
        σII = 0
      </text>
      <line x1={x3} y1={y + 7} x2={x3} y2={145} stroke={ORANGE} strokeWidth={0.9} strokeDasharray="2 3" />
      <text x={x3} y={157} textAnchor="middle" fontSize={9} fill={ORANGE} fontWeight={600}>
        {`σIII = −${symbol}`}
      </text>

      <Span
        x1={x3}
        x2={x1}
        y={166}
        color={ORANGE}
        amount={orangeAmount}
        width={3}
        label={isTresca ? 'σT = 2τ' : undefined}
        labelY={181}
      />
      <Span x1={x1} x2={x2} y={176} color={BLUE} amount={blueAmount} width={1.8} />
      <Span x1={x2} x2={x3} y={184} color={BLUE} amount={blueAmount} width={1.8} />
      <Span x1={x3} x2={x1} y={192} color={BLUE} amount={blueAmount} width={2.2} />
      {blueAmount > 0.01 && (
        <motion.text
          x={left}
          y={206}
          fontSize={8.5}
          fill={BLUE}
          initial={false}
          animate={{ opacity: blueAmount }}
          transition={{ duration: 0.25 }}
        >
          HMH: √3·τ z trzech różnic
        </motion.text>
      )}
    </g>
  )
}

export function CriteriaComparison3Animation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'state'
  const p = playing ? smooth(sceneProgress) : 1
  const isState = metric === 'state'
  const isHmh = metric === 'hmh'
  const isTresca = metric === 'tresca'
  const isCompare = metric === 'compare'
  const isCheck = metric === 'check'

  const left = 52
  const right = 432
  const y = 252
  const xOfTau = (value: number) => left + ((value - TAU_LO) / (TAU_HI - TAU_LO)) * (right - left)
  const xOfN = (value: number) => left + ((value - N_LO) / (N_HI - N_LO)) * (right - left)
  const xOfSigma = (value: number) => left + ((value - CMP_LO) / (CMP_HI - CMP_LO)) * (right - left)

  const hmhAmount = isHmh ? smooth(p) : isTresca ? 1 : 0
  const trescaAmount = isTresca ? smooth(p) : 0
  const nAmount = isCheck ? smooth(p) : 0
  const nHmhValue = mix(N_LO, N_HMH, smooth(clamp01(p * 1.15)))
  const nTValue = mix(N_LO, N_T, smooth(clamp01((p - 0.18) * 1.35)))
  const nHmhX = xOfN(nHmhValue)
  const nTX = xOfN(nTValue)
  const nReqX = xOfN(N_REQ)

  const hmhX = xOfTau(TAU_HMH)
  const trescaX = xOfTau(TAU_T)
  const hmhEqAmount = isCompare ? smooth(p) : 0
  const tEqAmount = isCompare ? smooth(clamp01((p - 0.2) * 1.25)) : 0
  const hmhEqX = xOfSigma(mix(CMP_LO, HMH_EQ, hmhEqAmount))
  const tEqX = xOfSigma(mix(CMP_LO, TRESCA_EQ, tEqAmount))
  const limitX = xOfSigma(SIG_DOP)

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 320"
          role="img"
          aria-label="Zadanie odwrotne przy czystym ścinaniu: dopuszczalne tau 67,8 megapaskala według HMH i 58,75 megapaskala według Tresca; przy tau 60 naprężenia zredukowane wynoszą 103,9 i 120 megapaskala, więc decyduje Tresca."
        >
          <text x={12} y={22} fontSize={9.5} fill={INK} fontWeight={600}>
            czyste ścinanie: od zapasu do dopuszczalnego τ
          </text>
          <text x={12} y={36} fontSize={8.5} fill={MUTED}>
            {`Rₑ = ${RE} MPa · n_wym = ${N_REQ} · σ = 0`}
          </text>

          <ShearElement tauLabel={showTauLabel(metric)} opacity={isState ? 1 : 0.82} />
          <text x={102} y={166} textAnchor="middle" fontSize={8.5} fill={MUTED}>
            τ działa na czterech ściankach
          </text>

          <PrincipalAxis metric={metric} p={p} />

          <text x={12} y={212} fontSize={9.5} fill={INK} fontWeight={600}>
            {isCheck
              ? 'wymagany zapas n_wym = 2'
              : isState
                ? 'szukamy dopuszczalnego τ'
                : isCompare
                  ? 'σred przy τ = 60 MPa'
                  : 'dopuszczalne τ przy n_wym = 2'}
          </text>
          <text x={432} y={212} textAnchor="end" fontSize={8.5} fill={MUTED}>
            {isCheck || isCompare ? '' : 'wspólna granica Rₑ'}
          </text>

          {isState && (
            <g>
              <line x1={left} y1={y} x2={right} y2={y} stroke={LIGHT} strokeWidth={1.2} />
              {[0, 20, 40, 60, 80].map((tick) => {
                const x = left + (tick / 80) * (right - left)
                return (
                  <g key={tick}>
                    <line x1={x} y1={y} x2={x} y2={y + 4} stroke={MUTED} strokeWidth={1} />
                    <text x={x} y={y + 16} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                      {tick}
                    </text>
                  </g>
                )
              })}
              <text x={(left + right) / 2} y={y - 14} textAnchor="middle" fontSize={9} fill={MUTED} fontWeight={600}>
                τdop = ?
              </text>
            </g>
          )}

          {(isHmh || isTresca) && (
            <g>
              <line x1={left} y1={y} x2={right} y2={y} stroke={LIGHT} strokeWidth={1.2} />
              {[50, 60, 70].map((tick) => {
                const x = xOfTau(tick)
                return (
                  <g key={tick}>
                    <line x1={x} y1={y} x2={x} y2={y + 4} stroke={MUTED} strokeWidth={1} />
                    <text x={x} y={y + 16} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                      {tick}
                    </text>
                  </g>
                )
              })}

              {hmhAmount > 0.01 && (
                <motion.g initial={false} animate={{ opacity: hmhAmount }} transition={{ duration: 0.25 }}>
                  <line x1={hmhX} y1={222} x2={hmhX} y2={300} stroke={BLUE} strokeWidth={1.4} strokeDasharray="5 3" />
                  <text x={hmhX} y={216} textAnchor="middle" fontSize={8.5} fill={BLUE} fontWeight={600}>
                    {`HMH ${fmt(TAU_HMH, 1)}`}
                  </text>
                </motion.g>
              )}

              {trescaAmount > 0.01 && (
                <motion.g initial={false} animate={{ opacity: trescaAmount }} transition={{ duration: 0.25 }}>
                  <line
                    x1={trescaX}
                    y1={222}
                    x2={trescaX}
                    y2={300}
                    stroke={ORANGE}
                    strokeWidth={1.4}
                    strokeDasharray="5 3"
                  />
                  <text x={trescaX} y={300} textAnchor="middle" fontSize={8.5} fill={ORANGE} fontWeight={600}>
                    {`Tresca ${fmt(TAU_T, 2)}`}
                  </text>
                </motion.g>
              )}
            </g>
          )}

          {isCompare && (
            <g>
              <line x1={left} y1={y} x2={right} y2={y} stroke={LIGHT} strokeWidth={1.2} />
              <text x={left} y={y + 14} fontSize={8.5} fill={MUTED}>
                {`${CMP_LO} MPa`}
              </text>
              <text x={right} y={y + 14} textAnchor="end" fontSize={8.5} fill={MUTED}>
                {`${CMP_HI} MPa`}
              </text>
              <motion.g initial={false} animate={{ opacity: smooth(p) }} transition={{ duration: 0.25 }}>
                <rect x={limitX} y={238} width={right - limitX} height={28} fill={RED} fillOpacity={0.08} />
                <line x1={limitX} y1={220} x2={limitX} y2={300} stroke={RED} strokeWidth={1.4} strokeDasharray="5 3" />
                <text x={limitX} y={216} textAnchor="middle" fontSize={8.5} fill={RED} fontWeight={600}>
                  {`σdop ${fmt(SIG_DOP, 1)}`}
                </text>
                <text x={(limitX + right) / 2} y={234} textAnchor="middle" fontSize={8} fill={RED} fontWeight={600}>
                  poza granicą
                </text>

                {hmhEqAmount > 0.01 && (
                  <g>
                    <line x1={hmhEqX} y1={y} x2={hmhEqX} y2={228} stroke={BLUE} strokeWidth={1.4} />
                    <circle cx={hmhEqX} cy={224} r={4.6} fill={BLUE} />
                    <text x={hmhEqX} y={214} textAnchor="middle" fontSize={8.5} fill={BLUE} fontWeight={600}>
                      {`HMH ${fmt(mix(CMP_LO, HMH_EQ, hmhEqAmount), 1)}`}
                    </text>
                    <text x={hmhEqX + 8} y={228} fontSize={10} fill={GREEN} fontWeight={700}>
                      ✓
                    </text>
                  </g>
                )}

                {tEqAmount > 0.01 && (
                  <g>
                    <line x1={tEqX} y1={y} x2={tEqX} y2={276} stroke={ORANGE} strokeWidth={1.4} />
                    <circle cx={tEqX} cy={280} r={4.6} fill={ORANGE} />
                    <text x={tEqX} y={296} textAnchor="middle" fontSize={8.5} fill={ORANGE} fontWeight={600}>
                      {`Tresca ${fmt(mix(CMP_LO, TRESCA_EQ, tEqAmount), 1)}`}
                    </text>
                    <text x={tEqX + 8} y={284} fontSize={10} fill={RED} fontWeight={700}>
                      ×
                    </text>
                  </g>
                )}

                <motion.text
                  x={52}
                  y={312}
                  fontSize={8.5}
                  fill={ORANGE}
                  fontWeight={700}
                  initial={false}
                  animate={{ opacity: smooth(clamp01((p - 0.5) / 0.5)) }}
                  transition={{ duration: 0.22 }}
                >
                  Tresca przekracza σdop → decyduje
                </motion.text>
              </motion.g>
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
                  <line
                    x1={nReqX}
                    y1={218}
                    x2={nReqX}
                    y2={300}
                    stroke={MUTED}
                    strokeWidth={1.3}
                    strokeDasharray="5 4"
                  />
                  <text x={nReqX + 6} y={244} textAnchor="start" fontSize={8.5} fill={MUTED} fontWeight={600}>
                    n_wym = 2
                  </text>
                  <line x1={nTX} y1={y} x2={nTX} y2={276} stroke={RED} strokeWidth={1.4} />
                  <circle cx={nTX} cy={280} r={4.6} fill={RED} />
                  <text x={nTX} y={296} textAnchor="middle" fontSize={8.5} fill={RED} fontWeight={600}>
                    {`Tresca ${fmt(nTValue, 2)}`}
                  </text>
                  <line x1={nHmhX} y1={y} x2={nHmhX} y2={228} stroke={BLUE} strokeWidth={1.4} />
                  <circle cx={nHmhX} cy={224} r={4.6} fill={BLUE} />
                  <text x={nHmhX} y={214} textAnchor="middle" fontSize={8.5} fill={BLUE} fontWeight={600}>
                    {`HMH ${fmt(nHmhValue, 2)}`}
                  </text>
                  <text x={52} y={312} fontSize={8.5} fill={RED} fontWeight={700}>
                    Tresca nie spełnia wymaganego zapasu
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

function showTauLabel(metric: string) {
  return metric === 'compare' || metric === 'check' ? `τ = ${TAU}` : 'τ = ?'
}
