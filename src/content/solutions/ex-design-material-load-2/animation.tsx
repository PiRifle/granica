import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const STEEL = '#4f6df5'
const ALU = '#2f9e8f'
const LOAD = '#ff6b45'
const LIMIT = '#a970dd'
const ALLOW = '#2f7d5b'
const EDGE = '#68727e'
const MUTED = '#87929d'
const INK = '#17202a'

const STEEL_AREA = 160
const ALU_AREA = 360
const STEEL_STRENGTH_AREA = 159.6
const STEEL_STIFF_AREA = 125
const ALU_STRENGTH_AREA = 312.5
const ALU_STIFF_AREA = 357.1
const STEEL_DELTA = 0.9375
const ALU_DELTA = 1.1905
const DELTA_LIMIT = 1.2
const STEEL_MASS = 1.51
const ALU_MASS = 1.17

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

const halfArea = (area: number) => 10 + (area / 360) * 30
const sectionSide = (area: number) => Math.sqrt(area) * 2.1

export function MaterialLoad2Animation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const t = playing ? clamp01(sceneProgress) : 1
  const draw = ease(t / 0.8)
  const late = ease((t - 0.35) / 0.65)

  const isModel = metric === 'model'
  const isSteel = metric === 'steel'
  const isAluminium = metric === 'aluminium'
  const isCompare = metric === 'compare'
  const isCheck = metric === 'check'

  const singleBar = !isCompare && !isCheck
  const BAR = { cx: 138, top: 68, bottom: 228 }
  const area = isSteel
    ? 120 + (STEEL_AREA - 120) * draw
    : isAluminium
      ? STEEL_AREA + (ALU_AREA - STEEL_AREA) * draw
      : 120
  const half = halfArea(area)
  const barColor = isSteel ? STEEL : isAluminium ? ALU : EDGE
  const materialName = isSteel ? 'stal' : isAluminium ? 'aluminium' : 'materiał ?'

  const REQ = { x: 238, w: 178, max: 380, top: 100, bottom: 154 }
  const reqX = (value: number) => REQ.x + (value / REQ.max) * REQ.w
  const strengthArea = isSteel ? STEEL_STRENGTH_AREA : ALU_STRENGTH_AREA
  const stiffnessArea = isSteel ? STEEL_STIFF_AREA : ALU_STIFF_AREA
  const adoptedArea = isSteel ? STEEL_AREA : ALU_AREA
  const adoptedColor = isSteel ? STEEL : ALU

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 320"
          role="img"
          aria-label="Porównanie pręta stalowego i aluminiowego: wymagane pole przekroju, decydujący warunek, masa oraz kontrola naprężenia i wydłużenia"
        >
          <Tag x={12} y={18} amount={1} color={INK} weight={700} size={10}>
            ten sam pręt · dwa materiały
          </Tag>
          <Tag x={12} y={33} amount={1} color={MUTED} size={8.5}>
            P = 25 kN · L = 1200 mm · n = 1,5 · ΔL_dop = 1,2 mm
          </Tag>

          {singleBar && (
            <>
              <g stroke={EDGE} strokeWidth={2} strokeLinecap="round">
                <line x1={BAR.cx - half - 18} y1={BAR.top} x2={BAR.cx + half + 18} y2={BAR.top} />
                {Array.from({ length: 7 }, (_, index) => {
                  const x = BAR.cx - half - 12 + index * ((half * 2 + 24) / 6)
                  return <line key={index} x1={x} y1={BAR.top} x2={x - 8} y2={BAR.top - 12} strokeWidth={1.4} />
                })}
              </g>

              <motion.rect
                x={BAR.cx - half}
                y={BAR.top}
                width={half * 2}
                height={BAR.bottom - BAR.top}
                rx={4}
                fill={barColor}
                fillOpacity={0.15}
                stroke={barColor}
                strokeWidth={2}
                initial={false}
                animate={{ width: half * 2 }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />

              <Tag x={BAR.cx + half + 10} y={BAR.top + 18} amount={1} color={barColor} weight={600} size={8.5}>
                {isModel ? 'A = ?' : `A = ${adoptedArea} mm²`}
              </Tag>
              <Tag x={BAR.cx + half + 10} y={BAR.top + 34} amount={1} color={MUTED} size={8}>
                {materialName}
              </Tag>

              <line x1={BAR.cx - 44} y1={BAR.top} x2={BAR.cx - 44} y2={BAR.bottom} stroke={MUTED} strokeWidth={1} />
              <line x1={BAR.cx - 49} y1={BAR.top} x2={BAR.cx - 39} y2={BAR.top} stroke={MUTED} />
              <line x1={BAR.cx - 49} y1={BAR.bottom} x2={BAR.cx - 39} y2={BAR.bottom} stroke={MUTED} />
              <text
                transform={`translate(${BAR.cx - 51} ${(BAR.top + BAR.bottom) / 2}) rotate(-90)`}
                textAnchor="middle"
                fontSize={8}
                fill={MUTED}
              >
                L = 1200 mm
              </text>

              <Arrow x={BAR.cx} from={BAR.bottom + 6} to={BAR.bottom + 38} amount={draw} color={LOAD} width={2.6} />
              <Tag x={BAR.cx + 12} y={BAR.bottom + 34} amount={draw} color={LOAD} weight={600} size={8.5}>
                P = 25 kN
              </Tag>
            </>
          )}

          {isModel && (
            <g>
              <Tag x={238} y={82} amount={1} color={INK} weight={700} size={9.5}>
                wybór materiału
              </Tag>
              <Tag x={238} y={104} amount={1} color={STEEL} weight={600} size={8.5}>
                stal: R_e = 235 MPa, E = 200 GPa
              </Tag>
              <Tag x={238} y={122} amount={1} color={ALU} weight={600} size={8.5}>
                aluminium: R_e = 120 MPa, E = 70 GPa
              </Tag>
              <Tag x={238} y={148} amount={1} color={MUTED} size={8.5}>
                trzeba dobrać pole przekroju
              </Tag>
              <Tag x={238} y={166} amount={1} color={MUTED} size={8.5}>
                i sprawdzić wydłużenie
              </Tag>
              <Tag x={238} y={198} amount={1} color={INK} weight={600} size={9}>
                szukane: A oraz masa
              </Tag>
            </g>
          )}

          {(isSteel || isAluminium) && (
            <g>
              <Tag x={REQ.x} y={64} amount={1} color={INK} weight={700} size={9.5}>
                wymagane pole [mm²]
              </Tag>
              <Tag x={REQ.x} y={84} amount={1} color={MUTED} size={8}>
                {`k = ${isSteel ? '156,7' : '80,0'} MPa`}
              </Tag>

              <Tag x={REQ.x} y={106} amount={1} color={ALLOW} weight={600} size={8}>
                {`wytrzymałość: ${pl(strengthArea, 1)}`}
              </Tag>
              <rect
                x={REQ.x}
                y={112}
                width={REQ.w}
                height={14}
                rx={4}
                fill="#eef1f4"
                stroke="#d7dde4"
                strokeWidth={1}
              />
              <motion.rect
                x={REQ.x}
                y={112}
                height={14}
                rx={4}
                fill={ALLOW}
                fillOpacity={0.28}
                stroke={ALLOW}
                strokeWidth={1.2}
                initial={{ width: 0 }}
                animate={{ width: reqX(strengthArea) - REQ.x }}
                transition={{ duration: 0.15, ease: 'linear' }}
              />

              <Tag x={REQ.x} y={146} amount={1} color={LIMIT} weight={600} size={8}>
                {`sztywność: ${pl(stiffnessArea, 1)}`}
              </Tag>
              <rect
                x={REQ.x}
                y={152}
                width={REQ.w}
                height={14}
                rx={4}
                fill="#eef1f4"
                stroke="#d7dde4"
                strokeWidth={1}
              />
              <motion.rect
                x={REQ.x}
                y={152}
                height={14}
                rx={4}
                fill={LIMIT}
                fillOpacity={0.26}
                stroke={LIMIT}
                strokeWidth={1.2}
                initial={{ width: 0 }}
                animate={{ width: reqX(stiffnessArea) - REQ.x }}
                transition={{ duration: 0.15, ease: 'linear' }}
              />

              <line
                x1={reqX(adoptedArea)}
                y1={100}
                x2={reqX(adoptedArea)}
                y2={176}
                stroke={adoptedColor}
                strokeWidth={2}
              />
              <Tag
                x={reqX(adoptedArea)}
                y={192}
                amount={late}
                color={adoptedColor}
                anchor="middle"
                size={8}
                weight={700}
              >
                {`A = ${adoptedArea}`}
              </Tag>
              <Tag x={REQ.x} y={216} amount={1} color={adoptedColor} weight={600} size={8.5}>
                {isSteel ? 'decyduje wytrzymałość' : 'decyduje sztywność'}
              </Tag>
              <Tag x={REQ.x} y={234} amount={1} color={MUTED} size={7.5}>
                {isSteel ? '160 mm² > 159,6 mm² oraz > 125 mm²' : '360 mm² > 357,1 mm² oraz > 312,5 mm²'}
              </Tag>
            </g>
          )}

          {isCompare && (
            <g>
              {[
                {
                  cx: 118,
                  name: 'stal',
                  color: STEEL,
                  area: STEEL_AREA,
                  mass: STEEL_MASS,
                  note: 'mniejszy przekrój',
                },
                {
                  cx: 330,
                  name: 'aluminium',
                  color: ALU,
                  area: ALU_AREA,
                  mass: ALU_MASS,
                  note: 'większy przekrój',
                },
              ].map((item) => {
                const side = sectionSide(item.area)
                const massHeight = item.mass * 52
                return (
                  <g key={item.name}>
                    <Tag x={item.cx} y={78} amount={1} color={item.color} anchor="middle" size={9.5} weight={700}>
                      {item.name}
                    </Tag>
                    <rect
                      x={item.cx - side / 2}
                      y={96}
                      width={side}
                      height={side}
                      rx={3}
                      fill={item.color}
                      fillOpacity={0.16}
                      stroke={item.color}
                      strokeWidth={2}
                    />
                    <Tag x={item.cx} y={152} amount={1} color={MUTED} anchor="middle" size={8}>
                      {item.note}
                    </Tag>
                    <Tag x={item.cx} y={168} amount={1} color={item.color} anchor="middle" size={8.5} weight={600}>
                      {`A = ${item.area} mm²`}
                    </Tag>

                    <rect
                      x={item.cx - 15}
                      y={284 - massHeight}
                      width={30}
                      height={massHeight}
                      rx={3}
                      fill={item.color}
                      fillOpacity={0.26}
                      stroke={item.color}
                      strokeWidth={1.4}
                    />
                    <Tag
                      x={item.cx}
                      y={284 - massHeight - 6}
                      amount={1}
                      color={item.color}
                      anchor="middle"
                      size={8.5}
                      weight={700}
                    >
                      {`${pl(item.mass)} kg`}
                    </Tag>
                    <line x1={item.cx - 34} y1={284} x2={item.cx + 34} y2={284} stroke={MUTED} strokeWidth={1} />
                  </g>
                )
              })}
              <Tag x={230} y={306} amount={late} color={ALU} anchor="middle" size={8.5} weight={600}>
                aluminium jest lżejsze mimo większego pola
              </Tag>
            </g>
          )}

          {isCheck && (
            <g>
              <Tag x={120} y={62} amount={1} color={STEEL} anchor="middle" size={9.5} weight={700}>
                stal · A = 160 mm²
              </Tag>
              <Tag x={330} y={62} amount={1} color={ALU} anchor="middle" size={9.5} weight={700}>
                aluminium · A = 360 mm²
              </Tag>

              <line x1={54} y1={178} x2={408} y2={178} stroke={MUTED} strokeWidth={1} strokeDasharray="4 3" />
              <line
                x1={54}
                y1={178 + DELTA_LIMIT * 40}
                x2={408}
                y2={178 + DELTA_LIMIT * 40}
                stroke={ALLOW}
                strokeWidth={1.2}
                strokeDasharray="6 4"
              />
              <Tag x={216} y={221} amount={1} color={ALLOW} anchor="middle" size={7.5}>
                ΔL_dop = 1,2 mm
              </Tag>

              {[
                {
                  cx: 120,
                  color: STEEL,
                  area: STEEL_AREA,
                  delta: STEEL_DELTA,
                },
                {
                  cx: 330,
                  color: ALU,
                  area: ALU_AREA,
                  delta: ALU_DELTA,
                },
              ].map((item) => {
                const halfWidth = halfArea(item.area)
                const bottom = 178 + item.delta * 40 * draw
                return (
                  <g key={item.cx}>
                    <rect
                      x={item.cx - halfWidth}
                      y={78}
                      width={halfWidth * 2}
                      height={bottom - 78}
                      rx={4}
                      fill={item.color}
                      fillOpacity={0.15}
                      stroke={item.color}
                      strokeWidth={2}
                    />
                    <Tag x={item.cx + halfWidth + 7} y={(178 + bottom) / 2} amount={1} color={item.color} size={8}>
                      {`ΔL = ${pl(item.delta)} mm`}
                    </Tag>
                  </g>
                )
              })}

              <Tag x={54} y={248} amount={late} color={ALLOW} weight={600} size={7.5}>
                ✓ σ = 156,3 ≤ k = 156,7 MPa
              </Tag>
              <Tag x={54} y={264} amount={late} color={ALLOW} weight={600} size={7.5}>
                ✓ ΔL = 0,94 ≤ 1,20 mm
              </Tag>
              <Tag x={262} y={248} amount={late} color={ALLOW} weight={600} size={7.5}>
                ✓ σ = 69,4 ≤ k = 80,0 MPa
              </Tag>
              <Tag x={262} y={264} amount={late} color={ALU} weight={600} size={7.5}>
                ✓ ΔL = 1,19 ≤ 1,20 mm
              </Tag>
              <Tag x={230} y={290} amount={late} color={MUTED} anchor="middle" size={7.5}>
                aluminium prawie wykorzystuje limit wydłużenia
              </Tag>
            </g>
          )}
        </svg>
      </div>
    </div>
  )
}
