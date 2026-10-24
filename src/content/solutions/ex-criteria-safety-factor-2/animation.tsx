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
const FORCE = 50
const RE = 235
const E = 200
const N_REQ = 1.5
const SIGMA = 125
const K = 156.7
const N_RZ = 1.88
const AREA_MIN = 500
const DELTA_1 = 0.625
const DELTA_3 = 1.875
const DELTA_LIMIT = 1.5

const clamp01 = (value: number) => Math.max(0, Math.min(1, value))
const ease = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}
const pl = (value: number, digits = 2) => value.toFixed(digits).replace('.', ',')
const decimal = (value: number, digits = 3) => value.toFixed(digits).replace('.', ',')

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

export function SafetyFactor2Animation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const t = playing ? clamp01(sceneProgress) : 1
  const reveal = ease(t)
  const revealLate = ease((t - 0.45) / 0.55)

  const isModel = metric === 'model'
  const isStress = metric === 'stress'
  const isFactor = metric === 'factor'
  const isCheck = metric === 'check'
  const isStiffness = metric === 'stiffness'
  const isArea = metric === 'area'

  const BAR = { cx: 84, top: 68, bottom: 248, half: 30 }
  const G = { x: 244, w: 56, top: 74, bottom: 256, max: 280 }
  const gaugeHeight = G.bottom - G.top
  const yStress = (value: number) => G.bottom - (Math.min(value, G.max) / G.max) * gaugeHeight

  const showGauge = !isFactor && !isStiffness && !isArea
  const showLines = isStress || isCheck
  const fillValue = isStress ? SIGMA * reveal : isCheck ? SIGMA : 0
  const fillTop = yStress(fillValue)
  const fillColor = ALLOW
  const loadAmount = isModel ? ease(t / 0.5) : 1

  const ratioX = 204
  const ratioWidth = 236
  const sigmaUnit = ratioWidth / N_RZ
  const partialWidth = ratioWidth - sigmaUnit
  const scaleMin = 1.2
  const scaleMax = 2.2
  const factorX = (value: number) => ratioX + ((value - scaleMin) / (scaleMax - scaleMin)) * 226
  const nRzX = factorX(N_RZ)
  const nReqX = factorX(N_REQ)

  const barScale = 55
  const barTop = 82
  const barWidth = 26
  const leftX = 130
  const rightX = 290
  const leftBottom = barTop + 1 * barScale
  const rightBottom = barTop + 3 * barScale
  const deltaScale = 30
  const leftDelta = DELTA_1 * deltaScale
  const rightDelta = DELTA_3 * deltaScale
  const limitDelta = DELTA_LIMIT * deltaScale

  const areaWidth = (AREA / 700) * 220
  const areaMinWidth = (AREA_MIN / 700) * 220

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 340"
          role="img"
          aria-label="Pręt o polu 400 mm² rozciągany siłą 50 kN; animacja naprężenia 125 MPa, zapasu 1,88, sprawdzenia wytrzymałości i wydłużenia dla długości 1 m oraz 3 m"
        >
          <Tag x={12} y={18} amount={1} color={INK} weight={700} size={10}>
            pręt rozciągany · A = 400 mm²
          </Tag>
          <Tag x={12} y={33} amount={1} color={MUTED} size={8.5}>
            F = 50 kN · R_e = 235 MPa · E = 200 GPa · n_wym = 1,5
          </Tag>

          {!isStiffness && (
            <g>
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

              <Arrow
                x={BAR.cx}
                from={BAR.bottom + 8}
                to={BAR.bottom + 50}
                amount={loadAmount}
                color={LOAD}
                width={2.6}
              />
              <Tag x={BAR.cx + 12} y={BAR.bottom + 42} amount={loadAmount} color={LOAD} weight={600} size={8.5}>
                F = 50 kN
              </Tag>
            </g>
          )}

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

              {showLines && (
                <motion.rect
                  x={G.x + 1}
                  y={fillTop}
                  width={G.w - 2}
                  height={G.bottom - fillTop}
                  rx={3}
                  fill={fillColor}
                  fillOpacity={0.24}
                  initial={false}
                  animate={{ y: fillTop, height: G.bottom - fillTop }}
                  transition={{ duration: 0.12, ease: 'linear' }}
                />
              )}
              {showLines && (
                <line x1={G.x + 1} y1={fillTop} x2={G.x + G.w - 1} y2={fillTop} stroke={fillColor} strokeWidth={2.2} />
              )}

              {showLines && (
                <g>
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
                    k = 156,7
                  </Tag>

                  <Tag x={G.x + G.w + 9} y={fillTop + 13} amount={1} color={ALLOW} weight={700} size={8.5}>
                    σ = 125
                  </Tag>
                </g>
              )}
            </motion.g>
          )}

          {isFactor && (
            <g>
              <Tag x={ratioX} y={70} amount={1} color={INK} weight={700} size={9.5}>
                zapas = granica / naprężenie
              </Tag>

              <Tag x={ratioX} y={96} amount={1} color={LIMIT} weight={600} size={8}>
                R_e = 235 MPa
              </Tag>
              <rect x={ratioX} y={102} width={ratioWidth} height={15} rx={3} fill={LIMIT} fillOpacity={0.18} />
              <motion.rect
                x={ratioX}
                y={102}
                height={15}
                rx={3}
                fill={LIMIT}
                fillOpacity={0.38}
                stroke={LIMIT}
                strokeWidth={1.2}
                initial={{ width: 0 }}
                animate={{ width: ratioWidth * reveal }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />

              <Tag x={ratioX} y={144} amount={1} color={ACCENT} weight={600} size={8}>
                σ = 125 MPa
              </Tag>
              <motion.rect
                x={ratioX}
                y={150}
                height={15}
                rx={3}
                fill={ACCENT}
                fillOpacity={0.3}
                stroke={ACCENT}
                strokeWidth={1.2}
                initial={{ width: 0 }}
                animate={{ width: sigmaUnit * reveal }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <motion.rect
                x={ratioX + sigmaUnit}
                y={150}
                height={15}
                rx={3}
                fill={ACCENT}
                fillOpacity={0.14}
                stroke={ACCENT}
                strokeWidth={1}
                strokeDasharray="4 3"
                initial={{ width: 0 }}
                animate={{ width: partialWidth * revealLate }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <Tag x={ratioX + sigmaUnit / 2} y={187} amount={reveal} color={ACCENT} anchor="middle" size={7.5}>
                1 · σ
              </Tag>
              <Tag
                x={ratioX + sigmaUnit + partialWidth / 2}
                y={187}
                amount={revealLate}
                color={ACCENT}
                anchor="middle"
                size={7.5}
              >
                0,88 · σ
              </Tag>

              <Tag x={ratioX} y={224} amount={1} color={MUTED} weight={600} size={8}>
                skala zapasu n
              </Tag>
              <rect x={ratioX} y={234} width={226} height={8} rx={4} fill="#eef1f4" stroke="#d7dde4" strokeWidth={1} />
              <motion.rect
                x={ratioX}
                y={234}
                height={8}
                rx={4}
                fill={ALLOW}
                fillOpacity={0.38}
                initial={{ width: 0 }}
                animate={{ width: (nRzX - ratioX) * reveal }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              {[1.2, 1.5, 1.8, 2.2].map((tick) => (
                <g key={tick}>
                  <line x1={factorX(tick)} y1={230} x2={factorX(tick)} y2={246} stroke={MUTED} strokeWidth={1} />
                  <text x={factorX(tick)} y={258} textAnchor="middle" fontSize={7.5} fill={MUTED}>
                    {pl(tick, 1)}
                  </text>
                </g>
              ))}
              <line x1={nReqX} y1={226} x2={nReqX} y2={250} stroke={LOAD} strokeWidth={1.5} strokeDasharray="4 3" />
              <Tag x={nReqX} y={220} amount={1} color={LOAD} anchor="middle" size={7.5} weight={600}>
                n_wym
              </Tag>
              <line x1={nRzX} y1={228} x2={nRzX} y2={252} stroke={ALLOW} strokeWidth={2.2} />
              <Tag x={nRzX} y={270} amount={reveal} color={ALLOW} anchor="middle" size={8} weight={700}>
                n_rz = 1,88
              </Tag>
            </g>
          )}

          {isCheck && (
            <g>
              <motion.circle
                cx={ratioX + 13}
                cy={292}
                r={13}
                fill={ALLOW}
                fillOpacity={0.1}
                stroke={ALLOW}
                strokeWidth={1.8}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: reveal > 0.2 ? 1 : 0, opacity: reveal > 0.2 ? 1 : 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
              <motion.path
                d={`M ${ratioX + 6} 292 L ${ratioX + 11} 297 L ${ratioX + 20} 285`}
                fill="none"
                stroke={ALLOW}
                strokeWidth={2.4}
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: reveal > 0.35 ? 1 : 0, opacity: reveal > 0.35 ? 1 : 0 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
              />
              <Tag x={ratioX + 34} y={290} amount={reveal > 0.35 ? 1 : 0} color={ALLOW} weight={700} size={10}>
                SPEŁNIA
              </Tag>
              <Tag x={ratioX + 34} y={306} amount={reveal > 0.35 ? 1 : 0} color={MUTED} size={8}>
                n_rz = 1,88 ≥ n_wym = 1,5
              </Tag>
              <Tag x={ratioX} y={326} amount={reveal > 0.5 ? 1 : 0} color={MUTED} size={7.5}>
                to warunek wytrzymałości; sztywność sprawdzasz osobno
              </Tag>
            </g>
          )}

          {isStiffness && (
            <g>
              <Tag x={12} y={58} amount={1} color={INK} weight={700} size={9.5}>
                wydłużenie tego samego pręta przy dwóch długościach
              </Tag>
              <Tag x={12} y={74} amount={1} color={MUTED} size={8}>
                σ = 125 MPa i zapas 1,88 nie zależą od długości
              </Tag>

              {[
                { x: leftX, bottom: leftBottom, delta: leftDelta, color: ALLOW, label: 'L = 1 m' },
                { x: rightX, bottom: rightBottom, delta: rightDelta, color: BAD, label: 'L = 3 m' },
              ].map((bar) => {
                const amount = ease(t)
                const limitY = bar.bottom + limitDelta
                return (
                  <g key={bar.label}>
                    <rect
                      x={bar.x}
                      y={barTop}
                      width={barWidth}
                      height={bar.bottom - barTop}
                      rx={3}
                      fill={ACCENT}
                      fillOpacity={0.15}
                      stroke={ACCENT}
                      strokeWidth={2}
                    />
                    <motion.rect
                      x={bar.x}
                      y={bar.bottom}
                      width={barWidth}
                      rx={3}
                      fill={bar.color}
                      fillOpacity={0.28}
                      stroke={bar.color}
                      strokeWidth={1.5}
                      initial={{ height: 0 }}
                      animate={{ height: bar.delta * amount }}
                      transition={{ duration: 0.12, ease: 'linear' }}
                    />
                    <line
                      x1={bar.x - 4}
                      y1={bar.bottom}
                      x2={bar.x + barWidth + 4}
                      y2={bar.bottom}
                      stroke={MUTED}
                      strokeWidth={1}
                      strokeDasharray="4 3"
                    />
                    <line
                      x1={bar.x - 4}
                      y1={limitY}
                      x2={bar.x + barWidth + 4}
                      y2={limitY}
                      stroke={LOAD}
                      strokeWidth={1.4}
                      strokeDasharray="5 3"
                    />
                    <Tag x={bar.x + barWidth + 7} y={96} amount={1} color={INK} size={8.5} weight={600}>
                      {bar.label}
                    </Tag>
                  </g>
                )
              })}

              <Tag x={leftX - 10} y={leftBottom + 8} amount={reveal} color={ALLOW} anchor="end" size={8} weight={600}>
                ΔL = 0,625 mm
              </Tag>
              <Tag x={leftX + barWidth + 10} y={leftBottom + limitDelta + 4} amount={reveal} color={LOAD} size={7.5}>
                limit 1,5 mm
              </Tag>
              <Tag
                x={leftX + barWidth / 2}
                y={leftBottom + leftDelta + 18}
                amount={reveal}
                color={ALLOW}
                anchor="middle"
                size={8}
              >
                w limicie
              </Tag>

              <Tag x={rightX + barWidth + 10} y={rightBottom + 8} amount={reveal} color={BAD} size={8} weight={600}>
                ΔL = 1,875 mm
              </Tag>
              <Tag x={rightX + barWidth + 10} y={rightBottom + limitDelta + 4} amount={reveal} color={LOAD} size={7.5}>
                limit 1,5 mm
              </Tag>
              <Tag
                x={rightX + barWidth / 2}
                y={rightBottom + rightDelta + 12}
                amount={revealLate > 0.35 ? 1 : 0}
                color={BAD}
                anchor="middle"
                size={8}
                weight={700}
              >
                przekroczone
              </Tag>

              <Tag x={12} y={334} amount={revealLate > 0.45 ? 1 : 0} color={INK} size={8}>
                ten sam materiał i przekrój, inna długość → inny warunek sztywności
              </Tag>
            </g>
          )}

          {isArea && (
            <g>
              <Tag x={204} y={70} amount={1} color={INK} weight={700} size={9.5}>
                wymagane pole przy ΔL_dop = 1,5 mm
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
                A_min = 500
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
              <Tag x={204 + areaWidth + 6} y={198} amount={revealLate > 0.3 ? 1 : 0} color={BAD} size={8} weight={600}>
                brakuje 100 mm²
              </Tag>

              <Tag x={204} y={226} amount={reveal > 0.4 ? 1 : 0} color={ALLOW} size={8}>
                wytrzymałość: σ = 125 &lt; k = 156,7 MPa
              </Tag>
              <Tag x={204} y={246} amount={revealLate > 0.4 ? 1 : 0} color={BAD} size={8}>
                sztywność: A = 400 &lt; A_min = 500 mm²
              </Tag>
              <Tag x={204} y={274} amount={revealLate > 0.55 ? 1 : 0} color={INK} size={8}>
                po powiększeniu: ΔL = 1,5 mm, σ = 100 MPa
              </Tag>
              <Tag x={204} y={294} amount={revealLate > 0.65 ? 1 : 0} color={MUTED} size={7.5}>
                zapas wytrzymałości nadal 2,35
              </Tag>
            </g>
          )}
        </svg>
      </div>
    </div>
  )
}
