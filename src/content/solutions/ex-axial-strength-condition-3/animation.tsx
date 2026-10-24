import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const LOAD = '#ff6b45'
const ALLOW = '#2f7d5b'
const LIMIT = '#a970dd'
const EDGE = '#68727e'
const MUTED = '#87929d'
const INK = '#17202a'

const RE = 235
const AREA = 500
const INVERSE_FORCE = 60
const INVERSE_AREA_MIN = 510.6
const INVERSE_AREA = 550
const INVERSE_STRESS = 109.1
const INVERSE_N = 2
const INVERSE_N_RZ = 2.15

const clamp01 = (value: number) => Math.max(0, Math.min(1, value))
const ease = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}

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

export function AxialStrengthCondition3Animation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const t = playing ? clamp01(sceneProgress) : 1
  const reveal = ease(t)

  const isModel = metric === 'model'
  const isCapacity = metric === 'capacity'
  const isInfluence = metric === 'influence'
  const isArea = metric === 'area'
  const isCheck = metric === 'check'
  const showGauge = !isArea

  const BAR = { cx: 118, top: 58, bottom: 252, half: 28 }
  const HALF_INVERSE = BAR.half * Math.sqrt(INVERSE_AREA / AREA)
  const G = { x: 292, w: 48, top: 58, bottom: 252, max: 250 }
  const gaugeHeight = G.bottom - G.top
  const yStress = (value: number) => G.bottom - (Math.min(value, G.max) / G.max) * gaugeHeight

  const nValue = isInfluence ? 2.5 + (1.5 - 2.5) * reveal : isArea || isCheck ? INVERSE_N : 2.5
  const allowable = RE / nValue
  const capacity = (allowable * AREA) / 1000
  const forceValue = isModel ? 0 : isArea || isCheck ? INVERSE_FORCE : capacity
  const workingStress = isCheck ? INVERSE_STRESS : 0
  const half = isArea ? BAR.half + (HALF_INVERSE - BAR.half) * reveal : isCheck ? HALF_INVERSE : BAR.half

  const fillValue = isCheck ? workingStress : isCapacity ? allowable * reveal : isInfluence ? allowable : 0
  const fillTop = yStress(fillValue)
  const allowY = yStress(allowable)
  const limitY = yStress(RE)
  const fillColor = isCheck ? ACCENT : ALLOW

  const arrowLength = forceValue > 0 ? 16 + (forceValue / 80) * 32 : 12
  const forceAmount = isModel ? ease(t / 0.5) : isCapacity ? reveal : 1
  const forceLabel = isModel
    ? 'N = ?'
    : isArea || isCheck
      ? 'N = 60 kN'
      : `N_max = ${capacity.toFixed(1).replace('.', ',')} kN`

  const areaAxisMin = 480
  const areaAxisMax = 570
  const areaX = 264
  const areaW = 164
  const areaBaseline = 205
  const areaWidth = (value: number) => ((value - areaAxisMin) / (areaAxisMax - areaAxisMin)) * areaW
  const aminWidth = areaWidth(INVERSE_AREA_MIN)
  const adoptedWidth = areaWidth(INVERSE_AREA)
  const aminX = areaX + aminWidth

  const factorMin = 1.8
  const factorMax = 2.3
  const factorX = (value: number) => 250 + ((value - factorMin) / (factorMax - factorMin)) * 180
  const factorFill = factorX(INVERSE_N_RZ) - 250

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 320"
          role="img"
          aria-label="Jeden pręt o stałym polu 500 mm²; animacja naprężenia dopuszczalnego, nośności 47 kN, wpływu współczynnika bezpieczeństwa, doboru pola 550 mm² i kontroli zapasu"
        >
          <g stroke={EDGE} strokeWidth={2} strokeLinecap="round">
            <line x1={BAR.cx - 46} y1={BAR.top} x2={BAR.cx + 46} y2={BAR.top} />
            {Array.from({ length: 9 }, (_, index) => {
              const x = BAR.cx - 38 + index * 9.5
              return <line key={index} x1={x} y1={BAR.top} x2={x - 8} y2={BAR.top - 12} strokeWidth={1.4} />
            })}
          </g>

          <motion.rect
            x={BAR.cx - half}
            y={BAR.top}
            width={half * 2}
            height={BAR.bottom - BAR.top}
            rx={4}
            fill={ACCENT}
            fillOpacity={0.14}
            stroke={ACCENT}
            strokeWidth={2}
            initial={false}
            animate={{ x: BAR.cx - half, width: half * 2 }}
            transition={{ duration: 0.12, ease: 'linear' }}
          />

          <line x1={BAR.cx + half} y1={104} x2={BAR.cx + half + 8} y2={104} stroke={ACCENT} strokeWidth={1.2} />
          <Tag x={BAR.cx + half + 12} y={108} amount={1} color={ACCENT} weight={600}>
            {isArea || isCheck ? 'A = 550 mm²' : 'A = 500 mm²'}
          </Tag>

          <Arrow x={BAR.cx} from={258} to={258 + arrowLength} amount={forceAmount} color={LOAD} width={2.6} />
          <Tag x={BAR.cx + 14} y={258 + arrowLength / 2 + 4} amount={forceAmount} color={LOAD} weight={600}>
            {forceLabel}
          </Tag>

          <Tag x={10} y={54} amount={1} color={INK} weight={600}>
            stal: Rₑ = 235 MPa
          </Tag>
          <Tag x={10} y={70} amount={1} color={MUTED}>
            {isInfluence ? 'n: 2,5 → 1,5' : isArea || isCheck ? 'wymagany zapas: n = 2' : 'wymagany zapas: n = 2,5'}
          </Tag>

          {showGauge && (
            <motion.g initial={false} animate={{ opacity: isModel ? 0.38 : 1 }} transition={{ duration: 0.25 }}>
              <Tag x={G.x + G.w / 2} y={48} amount={1} color={MUTED} anchor="middle" size={8.5} weight={600}>
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

              {(isCapacity || isInfluence || isCheck) && (
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
              {(isCapacity || isInfluence || isCheck) && (
                <line x1={G.x + 1} y1={fillTop} x2={G.x + G.w - 1} y2={fillTop} stroke={fillColor} strokeWidth={2.2} />
              )}

              {(isCapacity || isInfluence || isCheck) && (
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

              {(isCapacity || isInfluence || isCheck) && (
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
                  <Tag x={G.x + G.w + 9} y={allowY - 7} amount={1} color={ALLOW} weight={600}>
                    {`σdop = ${allowable.toFixed(1).replace('.', ',')} MPa`}
                  </Tag>
                </g>
              )}

              {isCheck && (
                <Tag x={G.x + G.w + 9} y={fillTop + 12} amount={1} color={ACCENT} weight={600}>
                  σ = 109,1 MPa
                </Tag>
              )}

              {isInfluence && (
                <Tag x={G.x + G.w + 9} y={220} amount={1} color={MUTED} size={8}>
                  n maleje → σdop rośnie
                </Tag>
              )}
            </motion.g>
          )}

          {isArea && (
            <g>
              <Tag x={areaX} y={62} amount={1} color={MUTED} weight={600} size={8.5}>
                pole przekroju [mm²]
              </Tag>
              <Tag x={areaX} y={96} amount={1} color={MUTED} size={8}>
                Amin = 510,6
              </Tag>
              <Tag x={areaX} y={140} amount={1} color={ACCENT} size={8}>
                A = 550
              </Tag>

              <motion.rect
                x={areaX}
                y={102}
                height={20}
                rx={4}
                fill={ALLOW}
                fillOpacity={0.28}
                stroke={ALLOW}
                strokeWidth={1.5}
                initial={{ width: 0 }}
                animate={{ width: aminWidth * reveal }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <motion.rect
                x={areaX}
                y={146}
                width={adoptedWidth}
                height={20}
                rx={4}
                fill={ACCENT}
                fillOpacity={0.24}
                stroke={ACCENT}
                strokeWidth={1.5}
                initial={false}
                animate={{ opacity: reveal > 0.35 ? 1 : 0 }}
                transition={{ duration: 0.25 }}
              />

              <line x1={aminX} y1={92} x2={aminX} y2={214} stroke={ALLOW} strokeWidth={1.4} strokeDasharray="4 3" />
              <line x1={areaX} y1={areaBaseline} x2={areaX + areaW} y2={areaBaseline} stroke={MUTED} strokeWidth={1} />
              <text x={areaX} y={areaBaseline + 12} textAnchor="middle" fontSize={8} fill={MUTED}>
                480
              </text>
              <text x={areaX + areaW} y={areaBaseline + 12} textAnchor="middle" fontSize={8} fill={MUTED}>
                570
              </text>

              <motion.g initial={false} animate={{ opacity: reveal > 0.55 ? 1 : 0 }} transition={{ duration: 0.25 }}>
                <path
                  d={`M ${areaX + 2} 232 L ${areaX + 8} 238 L ${areaX + 20} 226`}
                  fill="none"
                  stroke={ALLOW}
                  strokeWidth={2.4}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <Tag x={areaX + 26} y={236} amount={reveal > 0.55 ? 1 : 0} color={ALLOW} size={8.5} weight={600}>
                  A ≥ Amin
                </Tag>
              </motion.g>
            </g>
          )}

          {isCheck && (
            <g>
              <Tag x={250} y={284} amount={1} color={MUTED} size={8}>
                współczynnik zapasu
              </Tag>
              <rect x={250} y={293} width={180} height={10} rx={5} fill="#eef1f4" stroke="#d7dde4" strokeWidth={1} />
              <motion.rect
                x={250}
                y={293}
                height={10}
                rx={5}
                fill={ALLOW}
                fillOpacity={0.35}
                initial={{ width: 0 }}
                animate={{ width: factorFill * reveal }}
                transition={{ duration: 0.14, ease: 'linear' }}
              />
              <line
                x1={factorX(INVERSE_N)}
                y1={288}
                x2={factorX(INVERSE_N)}
                y2={308}
                stroke={LOAD}
                strokeWidth={1.6}
                strokeDasharray="4 3"
              />
              <line
                x1={factorX(INVERSE_N_RZ)}
                y1={287}
                x2={factorX(INVERSE_N_RZ)}
                y2={309}
                stroke={ALLOW}
                strokeWidth={2}
              />
              <Tag x={250} y={318} amount={1} color={MUTED} size={7.5}>
                1,8
              </Tag>
              <Tag x={430} y={318} amount={1} color={MUTED} anchor="end" size={7.5}>
                2,3
              </Tag>

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
              <Tag x={430} y={238} amount={reveal > 0.45 ? 1 : 0} color={ALLOW} anchor="middle" size={8} weight={600}>
                nrz = 2,15
              </Tag>
            </g>
          )}
        </svg>
      </div>
    </div>
  )
}
