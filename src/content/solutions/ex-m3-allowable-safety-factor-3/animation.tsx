import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const LOAD = '#ff6b45'
const ALLOW = '#2f7d5b'
const WARN = '#d84f28'
const LIMIT = '#a970dd'
const EDGE = '#68727e'
const MUTED = '#87929d'
const INK = '#17202a'

const RE = 235
const AREA = 500
const REQUIRED_N = 2
const ALLOWABLE = 117.5
const N_MAX = 58.75
const SIGMA_50 = 100
const N_RZ_50 = 2.35
const UTIL_50 = 0.851
const N_OVER = 70
const SIGMA_70 = 140
const N_RZ_70 = 1.68
const UTIL_70 = 1.191
const ALLOWABLE_25 = 94
const N_MAX_25 = 47

const clamp01 = (value: number) => Math.max(0, Math.min(1, value))
const ease = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}

const format = (value: number, digits = 1) => value.toFixed(digits).replace('.', ',').replace('-0,0', '0,0')

function Arrow({
  x,
  from,
  to,
  amount,
  color,
  width = 2.4,
}: {
  x: number
  from: number
  to: number
  amount: number
  color: string
  width?: number
}) {
  const direction = to >= from ? 1 : -1
  const head = 8
  const base = to - direction * head
  const wing = 4.5
  return (
    <motion.g initial={false} animate={{ opacity: amount > 0.01 ? 1 : 0 }} transition={{ duration: 0.18 }}>
      <motion.line
        x1={x}
        y1={from}
        x2={x}
        y2={base}
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: amount }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
      />
      <motion.polygon
        points={`${x},${to} ${x - wing},${to - direction * head} ${x + wing},${to - direction * head}`}
        fill={color}
        initial={{ opacity: 0 }}
        animate={{ opacity: amount > 0.55 ? 1 : 0 }}
        transition={{ duration: 0.18 }}
      />
    </motion.g>
  )
}

function Tag({
  x,
  y,
  amount,
  color,
  children,
  anchor = 'start',
  size = 9,
  weight = 400,
}: {
  x: number
  y: number
  amount: number
  color: string
  children: string
  anchor?: 'start' | 'middle' | 'end'
  size?: number
  weight?: number
}) {
  return (
    <motion.text
      x={x}
      y={y}
      textAnchor={anchor}
      fontSize={size}
      fontWeight={weight}
      fill={color}
      stroke="none"
      initial={false}
      animate={{ opacity: amount }}
      transition={{ duration: 0.22 }}
    >
      {children}
    </motion.text>
  )
}

export function AllowableSafetyFactor3Animation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const t = playing ? clamp01(sceneProgress) : 1
  const reveal = ease(t)

  const isModel = metric === 'model'
  const isAllowable = metric === 'allowable'
  const isCapacity = metric === 'capacity'
  const isCheck = metric === 'check'
  const isOverload = metric === 'overload'
  const isInfluence = metric === 'influence'

  const BAR = { cx: 108, top: 68, bottom: 240, half: 28 }
  const G = { x: 284, w: 48, top: 68, bottom: 240, max: 250 }
  const gaugeHeight = G.bottom - G.top
  const yStress = (value: number) => G.bottom - (Math.min(value, G.max) / G.max) * gaugeHeight

  const showGauge = true
  const showLimit = !isModel
  const showAllowable = !isModel
  const showFill = !isModel

  const allowableValue = isAllowable
    ? RE + (ALLOWABLE - RE) * reveal
    : isInfluence
      ? ALLOWABLE + (ALLOWABLE_25 - ALLOWABLE) * reveal
      : ALLOWABLE
  const stressValue = isModel
    ? 0
    : isAllowable
      ? ALLOWABLE * reveal
      : isCapacity
        ? allowableValue * reveal
        : isCheck
          ? SIGMA_50
          : isOverload
            ? SIGMA_70
            : isInfluence
              ? allowableValue
              : 0
  const fillTop = yStress(stressValue)
  const fillColor = isOverload ? WARN : isCheck || isCapacity || isInfluence || isAllowable ? ALLOW : ACCENT
  const limitY = yStress(RE)
  const allowY = yStress(allowableValue)

  const forceValue = isModel
    ? 0
    : isCheck
      ? 50
      : isOverload
        ? N_OVER
        : isCapacity
          ? N_MAX
          : isInfluence
            ? N_MAX + (N_MAX_25 - N_MAX) * reveal
            : 0
  const forceLength = isModel ? 16 : 12 + (Math.min(forceValue, 80) / 80) * 38
  const forceAmount = isModel ? ease(t / 0.5) : 1
  const formatForce = (value: number) => (Number.isInteger(value) ? `${value}` : value.toFixed(2).replace('.', ','))
  const forceLabel = isModel
    ? 'N = ?'
    : isCapacity || isInfluence
      ? `Nmax = ${formatForce(forceValue)} kN`
      : `N = ${formatForce(forceValue)} kN`

  const utilValue = isCheck ? UTIL_50 : isOverload ? UTIL_70 : isCapacity || isInfluence ? 1 : 0
  const utilFill = Math.min(utilValue, 1)
  const utilColor = utilValue > 1.001 ? WARN : ALLOW
  const utilLabel = `${Math.round(utilValue * 100)}%`

  const factorMin = 1.5
  const factorMax = 3
  const factorX = (value: number) => 250 + ((value - factorMin) / (factorMax - factorMin)) * 180
  const factorValue = isOverload ? N_RZ_70 : N_RZ_50
  const factorFill = factorX(factorValue) - 250

  const showFactor = isCheck || isOverload
  const showUtil = isCapacity || isCheck || isOverload || isInfluence

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 320"
          role="img"
          aria-label="Istniejący pręt o polu 500 mm²; animacja naprężenia dopuszczalnego, nośności 58,75 kN, kontroli przy 50 kN i 70 kN oraz wpływu wymaganego zapasu"
        >
          <g stroke={EDGE} strokeWidth={2} strokeLinecap="round">
            <line x1={BAR.cx - 46} y1={BAR.top} x2={BAR.cx + 46} y2={BAR.top} />
            {Array.from({ length: 9 }, (_, index) => {
              const x = BAR.cx - 38 + index * 9.5
              return <line key={index} x1={x} y1={BAR.top} x2={x - 8} y2={BAR.top - 12} strokeWidth={1.4} />
            })}
          </g>

          <rect
            x={BAR.cx - BAR.half}
            y={BAR.top}
            width={BAR.half * 2}
            height={BAR.bottom - BAR.top}
            rx={4}
            fill={ACCENT}
            fillOpacity={0.14}
            stroke={ACCENT}
            strokeWidth={2}
          />

          <line x1={BAR.cx + BAR.half} y1={104} x2={BAR.cx + BAR.half + 8} y2={104} stroke={ACCENT} strokeWidth={1.2} />
          <Tag x={BAR.cx + BAR.half + 12} y={108} amount={1} color={ACCENT} weight={600}>
            A = 500 mm²
          </Tag>

          <Arrow
            x={BAR.cx}
            from={246}
            to={246 + forceLength}
            amount={forceAmount}
            color={isOverload ? WARN : LOAD}
            width={2.6}
          />
          <Tag
            x={BAR.cx + 14}
            y={246 + forceLength / 2 + 4}
            amount={forceAmount}
            color={isOverload ? WARN : LOAD}
            weight={600}
          >
            {forceLabel}
          </Tag>

          <Tag x={10} y={34} amount={1} color={INK} weight={600}>
            stal: Rₑ = 235 MPa
          </Tag>
          <Tag x={10} y={50} amount={1} color={MUTED}>
            {isInfluence ? 'n: 2 → 2,5' : 'wymagany zapas: n = 2'}
          </Tag>

          {showGauge && (
            <motion.g initial={false} animate={{ opacity: isModel ? 0.35 : 1 }} transition={{ duration: 0.25 }}>
              <Tag x={G.x + G.w / 2} y={56} amount={1} color={MUTED} anchor="middle" size={8.5} weight={600}>
                σ [MPa]
              </Tag>
              <rect
                x={G.x}
                y={G.top}
                width={G.w}
                height={gaugeHeight}
                rx={4}
                fill="#eef1f4"
                stroke="#d7dde4"
                strokeWidth={1}
              />
              {[0, 100, 200].map((tick) => {
                const y = yStress(tick)
                return (
                  <g key={tick}>
                    <line x1={G.x - 4} y1={y} x2={G.x} y2={y} stroke={MUTED} strokeWidth={1} />
                    <text x={G.x - 7} y={y + 3} textAnchor="end" fontSize={8} fill={MUTED}>
                      {tick}
                    </text>
                  </g>
                )
              })}

              {showFill && (
                <motion.rect
                  x={G.x + 1}
                  y={fillTop}
                  width={G.w - 2}
                  height={G.bottom - fillTop}
                  rx={3}
                  fill={fillColor}
                  fillOpacity={0.24}
                  initial={false}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}
              {showFill && (
                <line x1={G.x + 1} y1={fillTop} x2={G.x + G.w - 1} y2={fillTop} stroke={fillColor} strokeWidth={2.2} />
              )}

              {showLimit && (
                <g>
                  <line
                    x1={G.x - 5}
                    y1={limitY}
                    x2={G.x + G.w + 5}
                    y2={limitY}
                    stroke={LIMIT}
                    strokeWidth={1.4}
                    strokeDasharray="2 4"
                  />
                  <Tag x={G.x + G.w + 9} y={limitY - 4} amount={1} color={LIMIT} weight={600}>
                    Rₑ = 235 MPa
                  </Tag>
                </g>
              )}

              {showAllowable && (
                <g>
                  <line
                    x1={G.x - 5}
                    y1={allowY}
                    x2={G.x + G.w + 5}
                    y2={allowY}
                    stroke={ALLOW}
                    strokeWidth={1.8}
                    strokeDasharray="5 3"
                  />
                  <Tag
                    x={G.x + G.w + 9}
                    y={isOverload ? allowY + 12 : allowY - 7}
                    amount={isAllowable ? (reveal > 0.35 ? 1 : 0) : 1}
                    color={ALLOW}
                    weight={600}
                  >
                    {`σdop = ${format(allowableValue)} MPa`}
                  </Tag>
                </g>
              )}

              {(isCapacity || isCheck || isOverload || isInfluence) && (
                <Tag
                  x={G.x + G.w + 9}
                  y={isOverload ? fillTop - 7 : fillTop + 12}
                  amount={1}
                  color={fillColor}
                  weight={600}
                >
                  {isCapacity || isInfluence ? 'σ = σdop' : `σ = ${format(stressValue, 0)} MPa`}
                </Tag>
              )}

              {isInfluence && reveal > 0.5 && (
                <Tag x={G.x + G.w + 9} y={fillTop + 26} amount={reveal > 0.5 ? 1 : 0} color={MUTED} size={8}>
                  mniejsze n → niższa nośność
                </Tag>
              )}
            </motion.g>
          )}

          {showUtil && (
            <g>
              <Tag x={G.x} y={254} amount={1} color={MUTED} size={8}>
                wykorzystanie σ / σdop
              </Tag>
              <Tag x={430} y={254} amount={1} color={utilColor} anchor="end" size={8} weight={600}>
                {utilLabel}
              </Tag>
              <rect x={G.x} y={260} width={146} height={8} rx={4} fill="#eef1f4" stroke="#d7dde4" strokeWidth={1} />
              <motion.rect
                x={G.x}
                y={260}
                height={8}
                rx={4}
                fill={utilColor}
                fillOpacity={0.35}
                initial={{ width: 0 }}
                animate={{ width: 146 * utilFill * reveal }}
                transition={{ duration: 0.14, ease: 'linear' }}
              />
              <line
                x1={G.x + 146}
                y1={257}
                x2={G.x + 146}
                y2={271}
                stroke={LOAD}
                strokeWidth={1.4}
                strokeDasharray="3 3"
              />
            </g>
          )}

          {showFactor && (
            <g>
              <Tag x={250} y={286} amount={1} color={MUTED} size={8}>
                współczynnik zapasu
              </Tag>
              <Tag x={430} y={286} amount={1} color={isOverload ? WARN : ALLOW} anchor="end" size={8} weight={600}>
                {`nrz = ${format(factorValue, 2)}`}
              </Tag>
              <rect x={250} y={292} width={180} height={8} rx={4} fill="#eef1f4" stroke="#d7dde4" strokeWidth={1} />
              <motion.rect
                x={250}
                y={292}
                height={8}
                rx={4}
                fill={isOverload ? WARN : ALLOW}
                fillOpacity={0.35}
                initial={{ width: 0 }}
                animate={{ width: factorFill * reveal }}
                transition={{ duration: 0.14, ease: 'linear' }}
              />
              <line
                x1={factorX(REQUIRED_N)}
                y1={287}
                x2={factorX(REQUIRED_N)}
                y2={305}
                stroke={LOAD}
                strokeWidth={1.6}
                strokeDasharray="4 3"
              />
              <line
                x1={factorX(factorValue)}
                y1={286}
                x2={factorX(factorValue)}
                y2={306}
                stroke={isOverload ? WARN : ALLOW}
                strokeWidth={2}
              />
              <Tag x={250} y={314} amount={1} color={MUTED} size={7.5}>
                1,5
              </Tag>
              <Tag x={430} y={314} amount={1} color={MUTED} anchor="end" size={7.5}>
                3,0
              </Tag>
              <Tag x={factorX(REQUIRED_N)} y={314} amount={1} color={LOAD} anchor="middle" size={7.5}>
                n = 2
              </Tag>

              {isCheck && (
                <g>
                  <motion.circle
                    cx={430}
                    cy={214}
                    r={14}
                    fill="none"
                    stroke={ALLOW}
                    strokeWidth={2}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: reveal > 0.3 ? 1 : 0, opacity: reveal > 0.3 ? 1 : 0 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                  />
                  <motion.path
                    d="M 423 214 L 428 219 L 438 208"
                    fill="none"
                    stroke={ALLOW}
                    strokeWidth={2.6}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: reveal > 0.45 ? 1 : 0, opacity: reveal > 0.45 ? 1 : 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  />
                  <Tag
                    x={455}
                    y={238}
                    amount={reveal > 0.45 ? 1 : 0}
                    color={ALLOW}
                    anchor="end"
                    size={7.5}
                    weight={600}
                  >
                    zapas spełniony
                  </Tag>
                </g>
              )}

              {isOverload && (
                <g>
                  <motion.path
                    d="M 423 207 L 437 221 M 437 207 L 423 221"
                    fill="none"
                    stroke={WARN}
                    strokeWidth={2.4}
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: reveal > 0.3 ? 1 : 0, opacity: reveal > 0.3 ? 1 : 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  />
                  <Tag x={455} y={238} amount={reveal > 0.35 ? 1 : 0} color={WARN} anchor="end" size={7.5} weight={600}>
                    zapas za mały
                  </Tag>
                </g>
              )}
            </g>
          )}

          {isModel && (
            <Tag x={10} y={302} amount={1} color={MUTED} size={8}>
              szukamy maksymalnej siły roboczej
            </Tag>
          )}
          {isCapacity && (
            <Tag x={10} y={302} amount={reveal > 0.35 ? 1 : 0} color={ALLOW} size={8} weight={600}>
              Nmax odpowiada σdop
            </Tag>
          )}
          {isCheck && (
            <Tag x={10} y={302} amount={reveal > 0.35 ? 1 : 0} color={ALLOW} size={8} weight={600}>
              σ &lt; σdop, zapas większy od wymaganego
            </Tag>
          )}
          {isOverload && (
            <Tag x={10} y={302} amount={reveal > 0.35 ? 1 : 0} color={WARN} size={8} weight={600}>
              σ &lt; Rₑ, ale σ &gt; σdop
            </Tag>
          )}
          {isInfluence && (
            <Tag x={10} y={302} amount={reveal > 0.35 ? 1 : 0} color={ALLOW} size={8} weight={600}>
              większy zapas → mniejsza nośność
            </Tag>
          )}
        </svg>
      </div>
    </div>
  )
}
