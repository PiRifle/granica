import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const LOAD = '#ff6b45'
const LIMIT = '#a970dd'
const ALLOW = '#2f7d5b'
const EDGE = '#68727e'
const MUTED = '#87929d'
const INK = '#17202a'

const RE = 235
const K = 130.56
const SIGMA = 130.56
const ALLOWED_LOAD = 39.167
const STIFF_LOAD = 40
const DELTA = 0.979
const DELTA_LIMIT = 1

const clamp01 = (value: number) => Math.max(0, Math.min(1, value))
const ease = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}
const pl = (value: number, digits = 2) => value.toFixed(digits).replace('.', ',')

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
  const head = 9
  const base = to - direction * head
  const wing = 5
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
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.text>
  )
}

export function MaterialLoad1Animation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const t = playing ? clamp01(sceneProgress) : 1
  const draw = ease(t / 0.8)
  const late = ease((t - 0.35) / 0.65)

  const isModel = metric === 'model'
  const isAllowable = metric === 'allowable'
  const isStrength = metric === 'strength'
  const isStiffness = metric === 'stiffness'
  const isDecision = metric === 'decision'
  const isCheck = metric === 'check'

  const BAR = { cx: 118, top: 60, bottom: 226, half: 27 }
  const PX_PER_MM = 34
  const stretch = isStiffness ? DELTA_LIMIT * PX_PER_MM * draw : isCheck ? DELTA * PX_PER_MM : 0
  const bottomY = BAR.bottom + stretch
  const loadAmount = isModel ? draw : 1

  const G = { x: 250, w: 46, top: 62, bottom: 246, max: 260 }
  const gaugeHeight = G.bottom - G.top
  const yStress = (value: number) => G.bottom - (Math.min(value, G.max) / G.max) * gaugeHeight
  const animatedK = isAllowable ? RE + (K - RE) * draw : K
  const gaugeValue = isAllowable ? animatedK : SIGMA
  const fillTop = yStress(isCheck || isAllowable ? gaugeValue : K)

  const CAP = { x: 238, w: 190, max: 45 }
  const capX = (value: number) => CAP.x + (value / CAP.max) * CAP.w
  const axisY = isDecision ? 190 : 172

  const P = { metric: isModel ? 'P = ?' : isStiffness ? 'P = 40 kN' : 'P_dop = 39,2 kN' }

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 320"
          role="img"
          aria-label="Pręt rozciągany: dobór naprężenia dopuszczalnego, nośności z wytrzymałości i sztywności oraz kontrola końcowa"
        >
          <g stroke={EDGE} strokeWidth={2} strokeLinecap="round">
            <line x1={BAR.cx - 46} y1={BAR.top} x2={BAR.cx + 46} y2={BAR.top} />
            {Array.from({ length: 8 }, (_, index) => {
              const x = BAR.cx - 38 + index * 11
              return <line key={index} x1={x} y1={BAR.top} x2={x - 8} y2={BAR.top - 12} strokeWidth={1.4} />
            })}
          </g>

          <motion.rect
            x={BAR.cx - BAR.half}
            y={BAR.top}
            width={BAR.half * 2}
            rx={4}
            fill={isStiffness ? LIMIT : ACCENT}
            fillOpacity={0.14}
            stroke={isStiffness ? LIMIT : ACCENT}
            strokeWidth={2}
            initial={false}
            animate={{ height: bottomY - BAR.top }}
            transition={{ duration: 0.12, ease: 'linear' }}
          />

          <line x1={BAR.cx + BAR.half} y1={BAR.top + 55} x2={BAR.cx + BAR.half + 8} y2={BAR.top + 55} stroke={ACCENT} />
          <Tag x={BAR.cx + BAR.half + 12} y={BAR.top + 59} amount={1} color={ACCENT} weight={600} size={8.5}>
            A = 300 mm²
          </Tag>

          <line
            x1={BAR.cx - BAR.half - 20}
            y1={BAR.top}
            x2={BAR.cx - BAR.half - 20}
            y2={BAR.bottom}
            stroke={MUTED}
            strokeWidth={1}
          />
          <line x1={BAR.cx - BAR.half - 25} y1={BAR.top} x2={BAR.cx - BAR.half - 15} y2={BAR.top} stroke={MUTED} />
          <line
            x1={BAR.cx - BAR.half - 25}
            y1={BAR.bottom}
            x2={BAR.cx - BAR.half - 15}
            y2={BAR.bottom}
            stroke={MUTED}
          />
          <text
            transform={`translate(${BAR.cx - BAR.half - 27} ${(BAR.top + BAR.bottom) / 2}) rotate(-90)`}
            textAnchor="middle"
            fontSize={8.5}
            fill={MUTED}
          >
            L = 1500 mm
          </text>

          {(isStiffness || isCheck) && (
            <>
              <line
                x1={BAR.cx - BAR.half - 10}
                y1={BAR.bottom + DELTA_LIMIT * PX_PER_MM}
                x2={BAR.cx + BAR.half + 24}
                y2={BAR.bottom + DELTA_LIMIT * PX_PER_MM}
                stroke={ALLOW}
                strokeWidth={1.2}
                strokeDasharray="6 4"
              />
              <Tag
                x={BAR.cx + BAR.half + 28}
                y={BAR.bottom + DELTA_LIMIT * PX_PER_MM - 4}
                amount={1}
                color={ALLOW}
                size={7.5}
              >
                ΔL_dop = 1 mm
              </Tag>
              <line
                x1={BAR.cx + BAR.half + 12}
                y1={BAR.bottom}
                x2={BAR.cx + BAR.half + 12}
                y2={bottomY}
                stroke={LIMIT}
                strokeWidth={1.1}
              />
              <line
                x1={BAR.cx + BAR.half + 8}
                y1={BAR.bottom}
                x2={BAR.cx + BAR.half + 16}
                y2={BAR.bottom}
                stroke={LIMIT}
              />
              <line x1={BAR.cx + BAR.half + 8} y1={bottomY} x2={BAR.cx + BAR.half + 16} y2={bottomY} stroke={LIMIT} />
              <Tag
                x={BAR.cx + BAR.half + 18}
                y={(BAR.bottom + bottomY) / 2 + 3}
                amount={1}
                color={LIMIT}
                size={7.5}
                weight={600}
              >
                {`ΔL = ${isCheck ? pl(DELTA) : pl(DELTA_LIMIT)} mm`}
              </Tag>
            </>
          )}

          <Arrow x={BAR.cx} from={bottomY + 6} to={bottomY + 36} amount={loadAmount} color={LOAD} width={2.6} />
          <Tag x={BAR.cx + 13} y={bottomY + 31} amount={loadAmount} color={LOAD} weight={600} size={8.5}>
            {P.metric}
          </Tag>

          {isModel && (
            <g>
              <Tag x={248} y={82} amount={1} color={INK} weight={700} size={9.5}>
                dane materiału
              </Tag>
              <Tag x={248} y={102} amount={1} color={MUTED} size={8.5}>
                R_e = 235 MPa
              </Tag>
              <Tag x={248} y={118} amount={1} color={MUTED} size={8.5}>
                E = 200 GPa
              </Tag>
              <Tag x={248} y={134} amount={1} color={MUTED} size={8.5}>
                n = 1,8
              </Tag>
              <Tag x={248} y={150} amount={1} color={MUTED} size={8.5}>
                ΔL_dop = 1 mm
              </Tag>
              <Tag x={248} y={180} amount={1} color={INK} weight={600} size={9}>
                szukane:
              </Tag>
              <Tag x={248} y={198} amount={1} color={ACCENT} weight={600} size={9}>
                P_dop = ?
              </Tag>
              <Tag x={248} y={224} amount={1} color={MUTED} size={8}>
                dwa warunki: σ ≤ k oraz ΔL ≤ ΔL_dop
              </Tag>
            </g>
          )}

          {isAllowable && (
            <motion.g initial={false} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
              <Tag x={G.x + G.w / 2} y={54} amount={1} color={MUTED} anchor="middle" size={8.5} weight={600}>
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
                    <text x={G.x - 7} y={y + 3} textAnchor="end" fontSize={7.5} fill={MUTED}>
                      {tick}
                    </text>
                  </g>
                )
              })}
              <motion.rect
                x={G.x + 1}
                y={fillTop}
                width={G.w - 2}
                height={G.bottom - fillTop}
                rx={3}
                fill={ALLOW}
                fillOpacity={0.24}
                initial={false}
                animate={{ height: G.bottom - fillTop }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <line
                x1={G.x - 5}
                y1={yStress(RE)}
                x2={G.x + G.w + 5}
                y2={yStress(RE)}
                stroke={LIMIT}
                strokeWidth={1.4}
                strokeDasharray="2 4"
              />
              <Tag x={G.x + G.w + 9} y={yStress(RE) - 4} amount={1} color={LIMIT} weight={600} size={8}>
                R_e = 235
              </Tag>
              <line
                x1={G.x - 5}
                y1={yStress(animatedK)}
                x2={G.x + G.w + 5}
                y2={yStress(animatedK)}
                stroke={ALLOW}
                strokeWidth={1.8}
                strokeDasharray="5 3"
              />
              <Tag
                x={G.x + G.w + 9}
                y={yStress(animatedK) + 11}
                amount={draw > 0.25 ? 1 : 0}
                color={ALLOW}
                weight={600}
                size={8}
              >
                k = 130,56
              </Tag>
              <Tag x={G.x} y={268} amount={1} color={MUTED} size={8}>
                n = 1,8 obniża k
              </Tag>
            </motion.g>
          )}

          {(isStrength || isStiffness) && (
            <g>
              <Tag x={CAP.x} y={62} amount={1} color={INK} weight={700} size={9.5}>
                nośność pręta
              </Tag>
              <Tag x={CAP.x} y={82} amount={1} color={MUTED} size={8}>
                {isStrength ? 'warunek wytrzymałości' : 'warunek sztywności'}
              </Tag>

              <Tag x={CAP.x} y={112} amount={1} color={isStrength ? ALLOW : LIMIT} weight={600} size={8.5}>
                dopuszczalna siła
              </Tag>
              <rect
                x={CAP.x}
                y={120}
                width={CAP.w}
                height={18}
                rx={4}
                fill="#eef1f4"
                stroke="#d7dde4"
                strokeWidth={1}
              />
              <motion.rect
                x={CAP.x}
                y={120}
                height={18}
                rx={4}
                fill={isStrength ? ALLOW : LIMIT}
                fillOpacity={0.3}
                stroke={isStrength ? ALLOW : LIMIT}
                strokeWidth={1.4}
                initial={{ width: 0 }}
                animate={{ width: capX(isStrength ? ALLOWED_LOAD : STIFF_LOAD) - CAP.x }}
                transition={{ duration: 0.15, ease: 'linear' }}
              />
              <Tag x={CAP.x} y={156} amount={1} color={isStrength ? ALLOW : LIMIT} weight={700} size={10}>
                {isStrength ? '39,2 kN' : '40,0 kN'}
              </Tag>
              <Tag x={CAP.x + CAP.w} y={156} amount={1} color={MUTED} anchor="end" size={8}>
                {isStrength ? 'k = 130,56 MPa' : 'ΔL_dop = 1 mm'}
              </Tag>

              <line x1={CAP.x} y1={axisY} x2={CAP.x + CAP.w} y2={axisY} stroke={MUTED} strokeWidth={1} />
              {[0, 15, 30, 45].map((tick) => (
                <g key={tick}>
                  <line x1={capX(tick)} y1={axisY} x2={capX(tick)} y2={axisY + 4} stroke={MUTED} strokeWidth={1} />
                  <text x={capX(tick)} y={axisY + 14} textAnchor="middle" fontSize={7.5} fill={MUTED}>
                    {tick}
                  </text>
                </g>
              ))}
            </g>
          )}

          {isDecision && (
            <g>
              <Tag x={CAP.x} y={62} amount={1} color={INK} weight={700} size={9.5}>
                porównanie nośności
              </Tag>

              <Tag x={CAP.x} y={86} amount={1} color={ALLOW} weight={600} size={8}>
                wytrzymałość: 39,2 kN
              </Tag>
              <rect x={CAP.x} y={92} width={CAP.w} height={14} rx={4} fill="#eef1f4" stroke="#d7dde4" strokeWidth={1} />
              <motion.rect
                x={CAP.x}
                y={92}
                height={14}
                rx={4}
                fill={ALLOW}
                fillOpacity={0.3}
                stroke={ALLOW}
                strokeWidth={1.3}
                initial={{ width: 0 }}
                animate={{ width: capX(ALLOWED_LOAD) - CAP.x }}
                transition={{ duration: 0.15, ease: 'linear' }}
              />

              <Tag x={CAP.x} y={126} amount={1} color={LIMIT} weight={600} size={8}>
                sztywność: 40,0 kN
              </Tag>
              <rect
                x={CAP.x}
                y={132}
                width={CAP.w}
                height={14}
                rx={4}
                fill="#eef1f4"
                stroke="#d7dde4"
                strokeWidth={1}
              />
              <motion.rect
                x={CAP.x}
                y={132}
                height={14}
                rx={4}
                fill={LIMIT}
                fillOpacity={0.26}
                stroke={LIMIT}
                strokeWidth={1.3}
                initial={{ width: 0 }}
                animate={{ width: capX(STIFF_LOAD) - CAP.x }}
                transition={{ duration: 0.15, ease: 'linear' }}
              />

              <line x1={capX(ALLOWED_LOAD)} y1={86} x2={capX(ALLOWED_LOAD)} y2={162} stroke={ALLOW} strokeWidth={2} />
              <Tag x={capX(ALLOWED_LOAD)} y={178} amount={late} color={ALLOW} anchor="middle" size={8} weight={700}>
                min = 39,2 kN
              </Tag>

              <line x1={CAP.x} y1={axisY} x2={CAP.x + CAP.w} y2={axisY} stroke={MUTED} strokeWidth={1} />
              {[0, 15, 30, 45].map((tick) => (
                <g key={tick}>
                  <line x1={capX(tick)} y1={axisY} x2={capX(tick)} y2={axisY + 4} stroke={MUTED} strokeWidth={1} />
                  <text x={capX(tick)} y={axisY + 14} textAnchor="middle" fontSize={7.5} fill={MUTED}>
                    {tick}
                  </text>
                </g>
              ))}
              <Tag x={CAP.x} y={224} amount={1} color={ALLOW} weight={600} size={8}>
                decyduje wytrzymałość
              </Tag>
            </g>
          )}

          {isCheck && (
            <g>
              <Tag x={G.x + G.w / 2} y={54} amount={1} color={MUTED} anchor="middle" size={8.5} weight={600}>
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
                    <text x={G.x - 7} y={y + 3} textAnchor="end" fontSize={7.5} fill={MUTED}>
                      {tick}
                    </text>
                  </g>
                )
              })}
              <rect
                x={G.x + 1}
                y={yStress(SIGMA)}
                width={G.w - 2}
                height={G.bottom - yStress(SIGMA)}
                rx={3}
                fill={ACCENT}
                fillOpacity={0.24}
              />
              <line
                x1={G.x - 5}
                y1={yStress(RE)}
                x2={G.x + G.w + 5}
                y2={yStress(RE)}
                stroke={LIMIT}
                strokeWidth={1.4}
                strokeDasharray="2 4"
              />
              <Tag x={G.x + G.w + 9} y={yStress(RE) - 4} amount={1} color={LIMIT} weight={600} size={8}>
                R_e = 235
              </Tag>
              <line
                x1={G.x - 5}
                y1={yStress(K)}
                x2={G.x + G.w + 5}
                y2={yStress(K)}
                stroke={ALLOW}
                strokeWidth={1.8}
                strokeDasharray="5 3"
              />
              <Tag x={G.x + G.w + 9} y={yStress(K) - 4} amount={1} color={ALLOW} weight={600} size={8}>
                k = 130,56
              </Tag>
              <Tag x={G.x + G.w + 9} y={yStress(SIGMA) + 13} amount={1} color={ACCENT} weight={600} size={8}>
                σ = 130,56
              </Tag>

              <Tag x={CAP.x} y={278} amount={late} color={ALLOW} weight={600} size={8.5}>
                ✓ σ = 130,56 ≤ k = 130,56 MPa
              </Tag>
              <Tag x={CAP.x} y={296} amount={late} color={ALLOW} weight={600} size={8.5}>
                ✓ ΔL = 0,98 ≤ 1,00 mm
              </Tag>
            </g>
          )}
        </svg>
      </div>
    </div>
  )
}
