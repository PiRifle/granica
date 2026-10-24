import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const LOAD = '#ff6b45'
const LIMIT = '#a970dd'
const ALLOW = '#2f7d5b'
const BAD = '#d64545'
const EDGE = '#68727e'
const MUTED = '#87929d'
const INK = '#17202a'

const AREA = 400
const FORCE = 60
const N_REQ = 2
const SIGMA = 150
const RE_REQ = 300
const RE_235 = 235
const RE_355 = 355
const K_235 = 117.5
const N_235 = 1.57
const N_355 = 2.37
const AREA_MIN = 510.6

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

export function SafetyFactor3Animation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const t = playing ? clamp01(sceneProgress) : 1
  const reveal = ease(t)
  const revealLate = ease((t - 0.45) / 0.55)

  const isModel = metric === 'model'
  const isStress = metric === 'stress'
  const isLimit = metric === 'limit'
  const isCheck = metric === 'check'
  const isArea = metric === 'area'

  const BAR = { cx: 84, top: 68, bottom: 248, half: 30 }
  const G = { x: 244, w: 56, top: 74, bottom: 256, max: 380 }
  const gaugeHeight = G.bottom - G.top
  const yStress = (value: number) => G.bottom - (Math.min(value, G.max) / G.max) * gaugeHeight

  const showGauge = isModel || isStress || isLimit
  const showFill = isStress || isLimit
  const fillTop = yStress(SIGMA)
  const loadAmount = isModel ? ease(t / 0.5) : 1

  const ratioX = 204
  const ratioWidth = 226
  const ratioMin = 1
  const ratioMax = 2.6
  const factorX = (value: number) => ratioX + ((value - ratioMin) / (ratioMax - ratioMin)) * ratioWidth
  const n235X = factorX(N_235)
  const n355X = factorX(N_355)
  const nReqX = factorX(N_REQ)

  const areaWidth = (AREA / 600) * 220
  const areaMinWidth = (AREA_MIN / 600) * 220

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 340"
          role="img"
          aria-label="Pręt o polu 400 mm² rozciągany siłą 60 kN; animacja naprężenia 150 MPa, wymaganej granicy 300 MPa oraz zapasu dla stali 235 MPa i 355 MPa"
        >
          <Tag x={12} y={18} amount={1} color={INK} weight={700} size={10}>
            pręt rozciągany · A = 400 mm²
          </Tag>
          <Tag x={12} y={33} amount={1} color={MUTED} size={8.5}>
            F = 60 kN · n_wym = 2,0 · σ = 150 MPa
          </Tag>

          <g stroke={EDGE} strokeWidth={2} strokeLinecap="round">
            <line x1={BAR.cx - BAR.half - 16} y1={BAR.top} x2={BAR.cx + BAR.half + 16} y2={BAR.top} />
            {Array.from({ length: 8 }, (_, index) => {
              const x = BAR.cx - BAR.half - 12 + index * 8
              return <line key={index} x1={x} y1={BAR.top} x2={x - 7} y2={BAR.top - 11} strokeWidth={1.4} />
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
          <line
            x1={BAR.cx + BAR.half}
            y1={BAR.top + 112}
            x2={BAR.cx + BAR.half + 9}
            y2={BAR.top + 112}
            stroke={ACCENT}
            strokeWidth={1.2}
          />
          <Tag x={BAR.cx + BAR.half + 13} y={BAR.top + 116} amount={1} color={ACCENT} weight={600} size={8.5}>
            A = 400 mm²
          </Tag>

          <Arrow x={BAR.cx} from={BAR.bottom + 8} to={BAR.bottom + 50} amount={loadAmount} color={LOAD} width={2.6} />
          <Tag x={BAR.cx + 12} y={BAR.bottom + 42} amount={loadAmount} color={LOAD} weight={600} size={8.5}>
            F = 60 kN
          </Tag>

          {showGauge && (
            <motion.g initial={false} animate={{ opacity: isModel ? 0.3 : 1 }} transition={{ duration: 0.25 }}>
              <Tag x={G.x + G.w / 2} y={62} amount={1} color={MUTED} anchor="middle" size={8.5} weight={600}>
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
              {[0, 150, 300].map((tick) => {
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

              {isLimit && (
                <motion.rect
                  x={G.x + 1}
                  y={yStress(RE_REQ)}
                  width={G.w - 2}
                  height={fillTop - yStress(RE_REQ)}
                  rx={3}
                  fill={LIMIT}
                  fillOpacity={0.09}
                  initial={false}
                  animate={{ opacity: reveal > 0.35 ? 1 : 0 }}
                  transition={{ duration: 0.25 }}
                />
              )}

              {showFill && (
                <motion.rect
                  x={G.x + 1}
                  y={fillTop}
                  width={G.w - 2}
                  height={G.bottom - fillTop}
                  rx={3}
                  fill={ACCENT}
                  fillOpacity={0.24}
                  initial={false}
                  animate={{ y: fillTop, height: G.bottom - fillTop }}
                  transition={{ duration: 0.12, ease: 'linear' }}
                />
              )}
              {showFill && (
                <line x1={G.x + 1} y1={fillTop} x2={G.x + G.w - 1} y2={fillTop} stroke={ACCENT} strokeWidth={2.2} />
              )}
              {showFill && (
                <Tag x={G.x + G.w + 9} y={fillTop + 13} amount={1} color={ACCENT} weight={700} size={8.5}>
                  σ = 150
                </Tag>
              )}

              {isLimit && (
                <g>
                  <line
                    x1={G.x - 5}
                    y1={yStress(RE_235)}
                    x2={G.x + G.w + 5}
                    y2={yStress(RE_235)}
                    stroke={MUTED}
                    strokeWidth={1.2}
                    strokeDasharray="3 4"
                  />
                  <Tag
                    x={G.x + G.w + 9}
                    y={yStress(RE_235) - 3}
                    amount={reveal > 0.25 ? 1 : 0}
                    color={MUTED}
                    size={7.5}
                  >
                    stal 235
                  </Tag>

                  <line
                    x1={G.x - 5}
                    y1={yStress(RE_355)}
                    x2={G.x + G.w + 5}
                    y2={yStress(RE_355)}
                    stroke={ALLOW}
                    strokeWidth={1.2}
                    strokeDasharray="3 4"
                  />
                  <Tag
                    x={G.x + G.w + 9}
                    y={yStress(RE_355) - 3}
                    amount={reveal > 0.25 ? 1 : 0}
                    color={ALLOW}
                    size={7.5}
                  >
                    stal 355
                  </Tag>

                  <motion.line
                    x1={G.x - 5}
                    y1={yStress(RE_REQ)}
                    x2={G.x + G.w + 5}
                    y2={yStress(RE_REQ)}
                    stroke={LIMIT}
                    strokeWidth={2}
                    strokeDasharray="5 3"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: reveal }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                  />
                  <Tag
                    x={G.x + G.w + 9}
                    y={yStress(RE_REQ) - 4}
                    amount={reveal > 0.3 ? 1 : 0}
                    color={LIMIT}
                    weight={700}
                    size={8}
                  >
                    R_e,req = 300
                  </Tag>
                </g>
              )}
            </motion.g>
          )}

          {isCheck && (
            <g>
              <Tag x={ratioX} y={70} amount={1} color={INK} weight={700} size={9.5}>
                zapas n = R_e / σ
              </Tag>

              <Tag x={ratioX} y={102} amount={1} color={MUTED} size={8}>
                stal 235 MPa
              </Tag>
              <rect
                x={ratioX}
                y={110}
                width={ratioWidth}
                height={13}
                rx={3}
                fill="#eef1f4"
                stroke="#d7dde4"
                strokeWidth={1}
              />
              <motion.rect
                x={ratioX}
                y={110}
                height={13}
                rx={3}
                fill={BAD}
                fillOpacity={0.24}
                stroke={BAD}
                strokeWidth={1.2}
                initial={{ width: 0 }}
                animate={{ width: (n235X - ratioX) * reveal }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <line x1={n235X} y1={106} x2={n235X} y2={127} stroke={BAD} strokeWidth={2} />
              <Tag x={n235X - 5} y={139} amount={reveal} color={BAD} anchor="end" size={8} weight={700}>
                n = 1,57
              </Tag>
              <motion.path
                d={`M ${n235X + 8} 110 L ${n235X + 15} 117 M ${n235X + 15} 110 L ${n235X + 8} 117`}
                fill="none"
                stroke={BAD}
                strokeWidth={1.8}
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: reveal > 0.4 ? 1 : 0, opacity: reveal > 0.4 ? 1 : 0 }}
                transition={{ duration: 0.25 }}
              />

              <Tag x={ratioX} y={162} amount={1} color={MUTED} size={8}>
                stal 355 MPa
              </Tag>
              <rect
                x={ratioX}
                y={170}
                width={ratioWidth}
                height={13}
                rx={3}
                fill="#eef1f4"
                stroke="#d7dde4"
                strokeWidth={1}
              />
              <motion.rect
                x={ratioX}
                y={170}
                height={13}
                rx={3}
                fill={ALLOW}
                fillOpacity={0.24}
                stroke={ALLOW}
                strokeWidth={1.2}
                initial={{ width: 0 }}
                animate={{ width: (n355X - ratioX) * reveal }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <line x1={n355X} y1={166} x2={n355X} y2={187} stroke={ALLOW} strokeWidth={2} />
              <Tag x={n355X - 5} y={199} amount={reveal} color={ALLOW} anchor="end" size={8} weight={700}>
                n = 2,37
              </Tag>
              <motion.path
                d={`M ${n355X + 7} 177 L ${n355X + 12} 182 L ${n355X + 21} 169`}
                fill="none"
                stroke={ALLOW}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: reveal > 0.4 ? 1 : 0, opacity: reveal > 0.4 ? 1 : 0 }}
                transition={{ duration: 0.25 }}
              />

              <line x1={nReqX} y1={104} x2={nReqX} y2={190} stroke={LOAD} strokeWidth={1.6} strokeDasharray="5 3" />
              <Tag x={nReqX} y={98} amount={1} color={LOAD} anchor="middle" size={7.5} weight={600}>
                n_wym = 2
              </Tag>

              {[1, 1.5, 2, 2.5].map((tick) => (
                <g key={tick}>
                  <line x1={factorX(tick)} y1={198} x2={factorX(tick)} y2={212} stroke={MUTED} strokeWidth={1} />
                  <text x={factorX(tick)} y={224} textAnchor="middle" fontSize={7.5} fill={MUTED}>
                    {pl(tick, 1)}
                  </text>
                </g>
              ))}
              <line x1={ratioX} y1={205} x2={ratioX + ratioWidth} y2={205} stroke={MUTED} strokeWidth={1} />

              <Tag x={ratioX} y={252} amount={revealLate > 0.35 ? 1 : 0} color={BAD} size={8}>
                235/150 = 1,57 &lt; 2 → nie spełnia
              </Tag>
              <Tag x={ratioX} y={272} amount={revealLate > 0.55 ? 1 : 0} color={ALLOW} size={8}>
                355/150 = 2,37 ≥ 2 → spełnia
              </Tag>
            </g>
          )}

          {isArea && (
            <g>
              <Tag x={204} y={70} amount={1} color={INK} weight={700} size={9.5}>
                pole przekroju dla stali 235 MPa
              </Tag>
              <Tag x={204} y={94} amount={1} color={MUTED} size={8}>
                A = 400
              </Tag>
              <rect
                x={204}
                y={100}
                width={areaWidth}
                height={15}
                rx={3}
                fill={ACCENT}
                fillOpacity={0.24}
                stroke={ACCENT}
                strokeWidth={1.3}
              />
              <Tag x={204} y={138} amount={1} color={ALLOW} size={8}>
                A_min = 510,6
              </Tag>
              <motion.rect
                x={204}
                y={144}
                height={15}
                rx={3}
                fill={ALLOW}
                fillOpacity={0.22}
                stroke={ALLOW}
                strokeWidth={1.5}
                initial={{ width: 0 }}
                animate={{ width: areaMinWidth * reveal }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <line
                x1={204 + areaMinWidth}
                y1={96}
                x2={204 + areaMinWidth}
                y2={166}
                stroke={ALLOW}
                strokeWidth={1.3}
                strokeDasharray="4 3"
              />
              <line x1={204 + areaWidth} y1={96} x2={204 + areaWidth} y2={166} stroke={ACCENT} strokeWidth={1.3} />
              <Tag x={204 + areaWidth + 6} y={196} amount={revealLate > 0.3 ? 1 : 0} color={BAD} size={8} weight={600}>
                brakuje 110,6 mm²
              </Tag>
              <Tag x={204} y={222} amount={reveal > 0.4 ? 1 : 0} color={ALLOW} size={8}>
                k = 235/2 = 117,5 MPa &lt; σ = 150 MPa
              </Tag>
              <Tag x={204} y={244} amount={revealLate > 0.4 ? 1 : 0} color={INK} size={8}>
                droga 1: stal 355 MPa, A = 400, n = 2,37
              </Tag>
              <Tag x={204} y={264} amount={revealLate > 0.55 ? 1 : 0} color={INK} size={8}>
                droga 2: stal 235 MPa, A_min = 510,6 mm²
              </Tag>
              <Tag x={204} y={292} amount={revealLate > 0.65 ? 1 : 0} color={MUTED} size={7.5}>
                60 000 / 510,6 = 117,5 MPa → n = 2
              </Tag>
            </g>
          )}
        </svg>
      </div>
    </div>
  )
}
