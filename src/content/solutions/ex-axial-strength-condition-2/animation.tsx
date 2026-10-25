import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const SECOND = '#ff8a5c'
const LOAD = '#ff6b45'
const ALLOW = '#2f7d5b'
const WARN = '#d84f28'
const LIMIT = '#a970dd'
const EDGE = '#68727e'
const MUTED = '#87929d'
const INK = '#17202a'

const RE = 235
const ALLOWABLE = 156.7
const STRESS_1 = 150
const STRESS_2 = 180
const ADOPTED_STRESS = 150

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

export function AxialStrengthCondition2Animation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const t = playing ? clamp01(sceneProgress) : 1
  const reveal = ease(t)

  const isModel = metric === 'model'
  const isStress = metric === 'stress'
  const isArea = metric === 'area'
  const isCheck = metric === 'check'
  const showGauges = !isModel

  const BAR = { cx: 106, top: 52, step: 152, bottom: 268 }
  const HALF_1 = 36
  const HALF_2 = 28
  const HALF_2_ADOPTED = HALF_2 * Math.sqrt(300 / 250)
  const G1 = { x: 262, w: 34, top: 70, bottom: 268, max: 250 }
  const G2 = { x: 310, w: 34, top: 70, bottom: 268, max: 250 }
  const gaugeHeight = G1.bottom - G1.top
  const yStress = (value: number, gauge: typeof G1) =>
    gauge.bottom - (Math.min(value, gauge.max) / gauge.max) * gaugeHeight

  const half2 = isArea ? HALF_2 + (HALF_2_ADOPTED - HALF_2) * reveal : isCheck ? HALF_2_ADOPTED : HALF_2
  const stress2 = isArea ? STRESS_2 + (ADOPTED_STRESS - STRESS_2) * reveal : isCheck ? ADOPTED_STRESS : STRESS_2
  const fill1 = isStress ? STRESS_1 * reveal : STRESS_1
  const fill2 = isStress ? stress2 * reveal : stress2
  const allowY = yStress(ALLOWABLE, G1)
  const limitY = yStress(RE, G1)
  const color2 = fill2 > ALLOWABLE + 0.4 ? WARN : ACCENT
  const safe2 = fill2 <= ALLOWABLE + 0.4

  const stepLoad = isModel ? ease(t / 0.55) : 1
  const criticalAmount = isStress ? (safe2 ? 0 : reveal) : 0

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 320"
          role="img"
          aria-label="Pręt schodkowy z dwóch odcinków o polach 400 mm² i 250 mm²; animacja naprężeń 150 MPa i 180 MPa względem naprężenia dopuszczalnego 156,7 MPa oraz poszerzenia dolnego odcinka do 300 mm²"
        >
          <g stroke={EDGE} strokeWidth={2} strokeLinecap="round">
            <line x1={BAR.cx - 56} y1={BAR.top} x2={BAR.cx + 56} y2={BAR.top} />
            {Array.from({ length: 11 }, (_, index) => {
              const x = BAR.cx - 48 + index * 10
              return <line key={index} x1={x} y1={BAR.top} x2={x - 8} y2={BAR.top - 12} strokeWidth={1.4} />
            })}
          </g>

          <rect
            x={BAR.cx - HALF_1}
            y={BAR.top}
            width={HALF_1 * 2}
            height={BAR.step - BAR.top}
            rx={4}
            fill={ACCENT}
            fillOpacity={0.14}
            stroke={ACCENT}
            strokeWidth={2}
          />
          <motion.rect
            x={BAR.cx - half2}
            y={BAR.step}
            width={half2 * 2}
            height={BAR.bottom - BAR.step}
            rx={4}
            fill={SECOND}
            fillOpacity={0.14}
            stroke={SECOND}
            strokeWidth={2}
            initial={false}
            animate={{ width: half2 * 2 }}
            transition={{ duration: 0.12, ease: 'linear' }}
          />

          <Tag x={BAR.cx - HALF_1 - 10} y={90} amount={1} color={ACCENT} anchor="end" weight={600}>
            A₁ = 400 mm²
          </Tag>
          <Tag x={BAR.cx + HALF_1 + 10} y={90} amount={1} color={ACCENT} weight={600}>
            N₁ = 60 kN
          </Tag>
          <Tag x={BAR.cx - half2 - 10} y={204} amount={1} color={SECOND} anchor="end" weight={600}>
            {isArea || isCheck ? 'A₂ = 300 mm²' : 'A₂ = 250 mm²'}
          </Tag>
          <Tag x={BAR.cx + half2 + 10} y={204} amount={1} color={SECOND} weight={600}>
            N₂ = 45 kN
          </Tag>

          {isArea && (
            <Tag x={BAR.cx - half2 - 10} y={222} amount={reveal > 0.25 ? 1 : 0} color={ALLOW} anchor="end" size={8}>
              A₂,min = 287,2
            </Tag>
          )}

          <Arrow x={176} from={160} to={196} amount={stepLoad} color={LOAD} width={2.2} />
          <Tag x={184} y={180} amount={stepLoad} color={LOAD} size={8}>
            15 kN
          </Tag>
          <Arrow x={BAR.cx} from={274} to={308} amount={1} color={LOAD} width={2.4} />
          <Tag x={BAR.cx + 12} y={296} amount={1} color={LOAD} size={8}>
            45 kN
          </Tag>

          {isModel && (
            <g>
              <Tag x={262} y={76} amount={1} color={INK} weight={600}>
                stal: Rₑ = 235 MPa
              </Tag>
              <Tag x={262} y={92} amount={1} color={MUTED}>
                wymagany zapas: n = 1,5
              </Tag>
              <Tag x={262} y={108} amount={1} color={ALLOW} weight={600}>
                σdop = 156,7 MPa
              </Tag>
              <Tag x={262} y={132} amount={1} color={MUTED} size={8}>
                dwa odcinki, dwa pola
              </Tag>
            </g>
          )}

          {showGauges && (
            <motion.g initial={false} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
              <Tag x={G1.x + 32} y={50} amount={1} color={MUTED} anchor="middle" size={8.5} weight={600}>
                σ [MPa]
              </Tag>

              {[G1, G2].map((gauge, gaugeIndex) => (
                <g key={gaugeIndex}>
                  <rect
                    x={gauge.x}
                    y={gauge.top}
                    width={gauge.w}
                    height={gaugeHeight}
                    rx={4}
                    fill="#eef1f4"
                    stroke="#d7dde4"
                    strokeWidth={1}
                  />
                  <Tag
                    x={gauge.x + gauge.w / 2}
                    y={64}
                    amount={1}
                    color={gaugeIndex === 0 ? ACCENT : SECOND}
                    anchor="middle"
                    weight={700}
                    size={10}
                  >
                    {gaugeIndex === 0 ? '1' : '2'}
                  </Tag>
                </g>
              ))}

              {[0, 100, 200].map((tick) => {
                const y = yStress(tick, G1)
                return (
                  <g key={tick}>
                    <line x1={G1.x - 4} y1={y} x2={G1.x} y2={y} stroke={MUTED} strokeWidth={1} />
                    <text x={G1.x - 7} y={y + 3} textAnchor="end" fontSize={8} fill={MUTED}>
                      {tick}
                    </text>
                  </g>
                )
              })}

              <motion.rect
                x={G1.x + 1}
                y={yStress(fill1, G1)}
                width={G1.w - 2}
                height={G1.bottom - yStress(fill1, G1)}
                rx={3}
                fill={ACCENT}
                fillOpacity={0.24}
                initial={false}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
              <line
                x1={G1.x + 1}
                y1={yStress(fill1, G1)}
                x2={G1.x + G1.w - 1}
                y2={yStress(fill1, G1)}
                stroke={ACCENT}
                strokeWidth={2}
              />

              <motion.rect
                x={G2.x + 1}
                y={yStress(fill2, G2)}
                width={G2.w - 2}
                height={G2.bottom - yStress(fill2, G2)}
                rx={3}
                fill={color2}
                fillOpacity={0.24}
                initial={false}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
              <line
                x1={G2.x + 1}
                y1={yStress(fill2, G2)}
                x2={G2.x + G2.w - 1}
                y2={yStress(fill2, G2)}
                stroke={color2}
                strokeWidth={2}
              />

              <line
                x1={G1.x - 5}
                y1={limitY}
                x2={G2.x + G2.w + 5}
                y2={limitY}
                stroke={LIMIT}
                strokeWidth={1.3}
                strokeDasharray="2 4"
              />
              <Tag x={G2.x + G2.w + 9} y={limitY - 4} amount={1} color={LIMIT} weight={600}>
                Rₑ = 235 MPa
              </Tag>

              <line
                x1={G1.x - 5}
                y1={allowY}
                x2={G2.x + G2.w + 5}
                y2={allowY}
                stroke={ALLOW}
                strokeWidth={1.8}
                strokeDasharray="5 3"
              />
              <Tag x={G2.x + G2.w + 9} y={allowY - 5} amount={1} color={ALLOW} weight={600}>
                σdop = 156,7
              </Tag>

              <Tag x={G1.x + G1.w / 2} y={284} amount={1} color={ACCENT} anchor="middle" size={8.5} weight={600}>
                σ₁ = 150
              </Tag>
              <Tag x={G2.x + G2.w / 2} y={284} amount={1} color={color2} anchor="middle" size={8.5} weight={600}>
                {`σ₂ = ${Math.round(fill2)}`}
              </Tag>

              {criticalAmount > 0 && (
                <Tag x={G2.x + G2.w + 9} y={188} amount={criticalAmount} color={WARN} size={8} weight={600}>
                  odcinek krytyczny
                </Tag>
              )}

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
                  <Tag x={G2.x + G2.w + 9} y={232} amount={reveal > 0.45 ? 1 : 0} color={ALLOW} size={8} weight={600}>
                    nrz = 1,567 ≥ 1,5
                  </Tag>
                </g>
              )}
            </motion.g>
          )}
        </svg>
      </div>
    </div>
  )
}
