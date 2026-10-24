import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local, SEGMENT_COLORS } from '../../../components/solution-figures/shared'

const TENSION = '#4f6df5'
const LOAD = '#ff6b45'
const MUTED = '#87929d'
const SUPPORT = '#68727e'
const OK = '#2f7d5b'
const LIMIT = '#a970dd'
const INK = '#17202a'

const K = 160
const DL_DOP = 0.6
const SEGMENTS = [
  { id: '1', length: 400, area: 200, n: 28, sigma: 140, deltaL: 0.28, areaReq: 175 },
  { id: '2', length: 400, area: 350, n: 18, sigma: 51.43, deltaL: 0.10286, areaReq: 112.5 },
  { id: '3', length: 400, area: 500, n: 18, sigma: 36, deltaL: 0.072, areaReq: 90 },
]
const TOTAL_DL = SEGMENTS.reduce((sum, segment) => sum + segment.deltaL, 0)
const MAX_AREA = Math.max(...SEGMENTS.map((segment) => segment.area))
const MAX_N = Math.max(...SEGMENTS.map((segment) => segment.n))

const TOP = 46
const BOTTOM = 246
const SPAN = BOTTOM - TOP
const H = SPAN / SEGMENTS.length
const CX = 130
const MAX_HALF = 32
const ELONGATION_SCALE = 100

const nodes = SEGMENTS.map((_, index) => TOP + H * index).concat(BOTTOM)
const halfWidth = (area: number) => 10 + 22 * Math.sqrt(area / MAX_AREA)

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}
const pl = (value: number) => value.toFixed(4).replace('.', ',').replace(/,?0+$/, '')

function support() {
  return (
    <g stroke={SUPPORT} strokeWidth={2} strokeLinecap="round">
      <line x1={CX - 60} y1={TOP} x2={CX + 60} y2={TOP} />
      {Array.from({ length: 9 }, (_, index) => {
        const x = CX - 52 + index * 13
        return <line key={index} x1={x} y1={TOP} x2={x - 8} y2={TOP - 12} strokeWidth={1.4} />
      })}
    </g>
  )
}

function LoadArrow({
  x,
  from,
  to,
  opacity = 1,
  color = LOAD,
}: {
  x: number
  from: number
  to: number
  opacity?: number
  color?: string
}) {
  const down = to > from
  const wing = 4.5
  const head = 8
  return (
    <motion.g
      stroke={color}
      fill={color}
      initial={false}
      animate={{ opacity }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      <line x1={x} y1={from} x2={x} y2={to - (down ? head : -head)} strokeWidth={2.3} />
      <path
        d={
          down
            ? `M${x - wing} ${to - head} L${x} ${to} L${x + wing} ${to - head}`
            : `M${x - wing} ${to + head} L${x} ${to} L${x + wing} ${to + head}`
        }
        fill="none"
        strokeWidth={2.3}
      />
    </motion.g>
  )
}

function Dimension({
  x,
  from,
  to,
  label,
  color,
  size = 8.5,
  labelY,
}: {
  x: number
  from: number
  to: number
  label: string
  color: string
  size?: number
  labelY?: number
}) {
  return (
    <g stroke={color} fill={color}>
      <line x1={x} y1={from} x2={x} y2={to} strokeWidth={1} />
      <line x1={x - 4} y1={from} x2={x + 4} y2={from} strokeWidth={1} />
      <line x1={x - 4} y1={to} x2={x + 4} y2={to} strokeWidth={1} />
      <text x={x + 6} y={labelY ?? (from + to) / 2 + 3} fontSize={size} stroke="none">
        {label}
      </text>
    </g>
  )
}

function barPath(segments: Array<{ start: number; end: number; half: number }>) {
  if (segments.length === 0) return ''
  const first = segments[0]
  let path = `M ${CX - first.half} ${first.start} L ${CX + first.half} ${first.start}`
  for (const segment of segments) {
    path += ` L ${CX + segment.half} ${segment.end}`
  }
  for (let index = segments.length - 1; index >= 0; index -= 1) {
    const segment = segments[index]
    path += ` L ${CX - segment.half} ${segment.end}`
    if (index > 0) path += ` L ${CX - segment.half} ${segment.start}`
  }
  return `${path} Z`
}

export function DesignFullAxialAnimation({ scene, index, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const progress = playing ? smooth(sceneProgress) : 1
  const raw = playing ? clamp01(sceneProgress) : 1
  const pulse = playing ? 0.7 + 0.3 * Math.sin((sceneProgress * 2.6 + index * 0.4) * Math.PI * 2) : 1

  const isModel = metric === 'model'
  const isNormal = metric === 'N'
  const isStress = metric === 'σ'
  const isArea = metric === 'A'
  const isElongation = metric === 'ΔL'
  const isCheck = metric === 'check'

  const s1 = isCheck ? progress : isElongation ? smooth(clamp01(raw / 0.55)) : 0
  const s2 = isCheck ? progress : isElongation ? smooth(clamp01((raw - 0.18) / 0.55)) : 0
  const s3 = isCheck ? progress : isElongation ? smooth(clamp01((raw - 0.36) / 0.55)) : 0
  const inc1 = SEGMENTS[0].deltaL * s1 * ELONGATION_SCALE
  const inc2 = SEGMENTS[1].deltaL * s2 * ELONGATION_SCALE
  const inc3 = SEGMENTS[2].deltaL * s3 * ELONGATION_SCALE

  const deformed = [TOP, TOP + H + inc1, TOP + H + inc1 + H + inc2]
  deformed.push(deformed[2] + H + inc3)
  const shownTotal = SEGMENTS[0].deltaL * s1 + SEGMENTS[1].deltaL * s2 + SEGMENTS[2].deltaL * s3

  const loadReveal = isModel ? smooth(clamp01(raw / 0.45)) : 1
  const diagramReveal = playing ? smooth(clamp01((sceneProgress - 0.05) / 0.8)) : 1

  const normalX = 270
  const normalScale = 110 / MAX_N
  const stressX = 260
  const stressScale = 120 / K
  const allowableX = stressX + K * stressScale
  const areaX = 260
  const areaScale = 110 / MAX_AREA
  const loadX = CX + MAX_HALF + 16
  const followsElongation = isElongation || isCheck
  const junctionY = followsElongation ? deformed[1] : nodes[1]
  const freeEndY = followsElongation ? deformed[3] : BOTTOM

  let normalPath = `M ${normalX} ${TOP}`
  for (let segmentIndex = 0; segmentIndex < SEGMENTS.length; segmentIndex += 1) {
    const width = SEGMENTS[segmentIndex].n * normalScale
    normalPath += ` L ${normalX + width} ${nodes[segmentIndex]}`
    normalPath += ` L ${normalX + width} ${nodes[segmentIndex + 1]}`
  }
  normalPath += ` L ${normalX} ${BOTTOM} Z`

  const showTotal = isElongation || isCheck

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 340"
          role="img"
          aria-label="Trójstopniowy pręt utwierdzony u góry, obciążony siłami Q i P. Animacja pokazuje siły normalne, naprężenia, wymagane pola, wydłużenie i końcową kontrolę warunków."
        >
          <defs>
            <marker id="dfa1-load" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0 0 L10 5 L0 10 Z" fill={LOAD} />
            </marker>
          </defs>

          {support()}

          <text x={8} y={20} fontSize={8.5} fill={INK}>
            E = 200 GPa, k = 160 MPa
          </text>
          <text x={8} y={34} fontSize={8.5} fill={MUTED}>
            L = 400 mm (każdy odcinek)
          </text>

          {SEGMENTS.map((segment, segmentIndex) => {
            const start = nodes[segmentIndex]
            const width = halfWidth(segment.area)
            const color = SEGMENT_COLORS[segmentIndex % SEGMENT_COLORS.length]
            const active = isStress && segmentIndex === 0
            return (
              <g key={segment.id}>
                <motion.rect
                  x={CX - width}
                  y={start}
                  width={width * 2}
                  height={H}
                  rx={3}
                  fill={color}
                  initial={false}
                  animate={{ fillOpacity: active ? 0.3 : 0.14, strokeWidth: active ? 2.6 : 1.6 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  stroke={color}
                />
                <text x={CX} y={start + H / 2 + 4} textAnchor="middle" fontSize={12} fontWeight={700} fill={color}>
                  {segment.id}
                </text>
                <text x={8} y={start + H / 2 - 2} fontSize={8.5} fill={MUTED}>
                  A{segment.id} = {segment.area} mm²
                </text>
                <text x={8} y={start + H / 2 + 10} fontSize={8} fill={MUTED}>
                  L = {segment.length} mm
                </text>
              </g>
            )
          })}

          <LoadArrow x={loadX} from={TOP} to={TOP - 30} opacity={isModel ? loadReveal : 1} color={SUPPORT} />
          <motion.text
            x={loadX + 6}
            y={TOP - 16}
            fontSize={9}
            fill={SUPPORT}
            initial={false}
            animate={{ opacity: isModel ? loadReveal : 1 }}
          >
            R = 28 kN
          </motion.text>

          <LoadArrow x={loadX} from={junctionY - 34} to={junctionY - 4} opacity={isModel ? loadReveal : 1} />
          <motion.text
            x={loadX + 7}
            y={junctionY - 16}
            fontSize={9}
            fill={LOAD}
            initial={false}
            animate={{ opacity: isModel ? loadReveal : 1 }}
          >
            Q = 10 kN
          </motion.text>

          <LoadArrow x={loadX} from={freeEndY - 34} to={freeEndY - 4} opacity={isModel ? loadReveal : 1} />
          <motion.text
            x={loadX + 7}
            y={freeEndY - 16}
            fontSize={9}
            fill={LOAD}
            initial={false}
            animate={{ opacity: isModel ? loadReveal : 1 }}
          >
            P = 18 kN
          </motion.text>

          {isModel && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} fill={MUTED}>
              <text x={330} y={TOP + 4} fontSize={9} fontWeight={600}>
                model i dane
              </text>
              <text x={330} y={TOP + 20} fontSize={8.5}>
                trzy odcinki, dwie siły
              </text>
            </motion.g>
          )}

          {isNormal && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: diagramReveal }} transition={{ duration: 0.25 }}>
              <line x1={normalX} y1={TOP - 8} x2={normalX} y2={BOTTOM + 8} stroke="#c9d0d9" strokeWidth={1} />
              <text x={normalX} y={TOP - 14} fontSize={8.5} fill={TENSION} fontWeight={600}>
                N [kN]
              </text>
              <motion.path
                d={normalPath}
                fill={TENSION}
                fillOpacity={0.16}
                stroke={TENSION}
                strokeWidth={1.8}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: diagramReveal }}
                transition={{ duration: 0.65, ease: 'easeOut' }}
              />
              {SEGMENTS.map((segment, segmentIndex) => {
                const end = normalX + segment.n * normalScale
                return (
                  <g key={`n-${segment.id}`}>
                    <line
                      x1={normalX}
                      y1={nodes[segmentIndex]}
                      x2={end}
                      y2={nodes[segmentIndex]}
                      stroke={TENSION}
                      strokeWidth={1.4}
                    />
                    <line
                      x1={normalX}
                      y1={nodes[segmentIndex + 1]}
                      x2={end}
                      y2={nodes[segmentIndex + 1]}
                      stroke={TENSION}
                      strokeWidth={1.4}
                    />
                    <line
                      x1={end}
                      y1={nodes[segmentIndex]}
                      x2={end}
                      y2={nodes[segmentIndex + 1]}
                      stroke={TENSION}
                      strokeWidth={2.2}
                    />
                    <text x={end + 5} y={nodes[segmentIndex] + H / 2 + 3} fontSize={8.5} fill={TENSION}>
                      N{segment.id} = {segment.n} kN
                    </text>
                  </g>
                )
              })}
              <motion.text
                x={normalX + SEGMENTS[0].n * normalScale + 5}
                y={nodes[1] - 5}
                fontSize={8}
                fill={LOAD}
                initial={false}
                animate={{ opacity: playing ? [0.45, 1, 0.45] : 0.9 }}
                transition={{ duration: 1.6, repeat: playing ? Infinity : 0, ease: 'easeInOut' }}
              >
                skok od Q
              </motion.text>
            </motion.g>
          )}

          {isStress && (
            <g>
              <text x={stressX} y={TOP - 14} fontSize={8.5} fill={INK} fontWeight={600}>
                σ [MPa]
              </text>
              <line x1={stressX} y1={TOP - 8} x2={stressX} y2={BOTTOM} stroke="#c9d0d9" strokeWidth={1} />
              <line
                x1={allowableX}
                y1={TOP - 8}
                x2={allowableX}
                y2={BOTTOM}
                stroke={LIMIT}
                strokeWidth={1.5}
                strokeDasharray="4 4"
              />
              <text x={allowableX + 4} y={BOTTOM + 14} fontSize={8.5} fill={LIMIT} fontWeight={600}>
                k = 160
              </text>
              {SEGMENTS.map((segment, segmentIndex) => {
                const y = nodes[segmentIndex] + H / 2
                const width = segment.sigma * stressScale * progress
                const active = segmentIndex === 0
                const color = active ? LOAD : TENSION
                return (
                  <g key={`s-${segment.id}`}>
                    <text x={stressX - 5} y={y + 3} textAnchor="end" fontSize={8.5} fill={MUTED} fontWeight={600}>
                      {segment.id}
                    </text>
                    <motion.rect
                      x={stressX}
                      y={y - 7}
                      height={14}
                      rx={3}
                      fill={color}
                      fillOpacity={active ? 0.36 : 0.2}
                      stroke={color}
                      strokeWidth={active ? 2.2 : 1.3}
                      initial={false}
                      animate={{ width }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                    />
                    <text x={stressX + 2} y={y - 10} fontSize={8.5} fill={color} fontWeight={active ? 700 : 500}>
                      σ{segment.id} = {segment.sigma.toString().replace('.', ',')} MPa
                    </text>
                  </g>
                )
              })}
              <motion.text
                x={stressX + SEGMENTS[0].sigma * stressScale + 5}
                y={nodes[0] + H / 2 - 14}
                fontSize={8}
                fill={LOAD}
                initial={false}
                animate={{ opacity: playing ? [0.5, 1, 0.5] : 1 }}
                transition={{ duration: 1.5, repeat: playing ? Infinity : 0, ease: 'easeInOut' }}
              >
                odcinek decydujący
              </motion.text>
            </g>
          )}

          {isArea && (
            <g>
              <text x={areaX} y={TOP - 14} fontSize={8.5} fill={INK} fontWeight={600}>
                pole przekroju [mm²]
              </text>
              <line x1={areaX} y1={TOP - 8} x2={areaX} y2={BOTTOM} stroke="#c9d0d9" strokeWidth={1} />
              {SEGMENTS.map((segment, segmentIndex) => {
                const y = nodes[segmentIndex] + H / 2
                const actualWidth = segment.area * areaScale
                const requiredWidth = segment.areaReq * areaScale * progress
                const active = segmentIndex === 0
                return (
                  <g key={`a-${segment.id}`}>
                    <motion.rect
                      x={areaX}
                      y={y - 8}
                      width={actualWidth}
                      height={7}
                      rx={3}
                      fill={TENSION}
                      fillOpacity={0.16}
                      stroke={TENSION}
                      strokeWidth={1.2}
                      initial={false}
                      animate={{ opacity: 0.9 }}
                    />
                    <text x={areaX + actualWidth + 4} y={y - 2} fontSize={8} fill={MUTED}>
                      A = {segment.area}
                    </text>
                    <motion.rect
                      x={areaX}
                      y={y + 2}
                      height={7}
                      rx={3}
                      fill={OK}
                      fillOpacity={active ? 0.4 : 0.22}
                      stroke={OK}
                      strokeWidth={active ? 1.8 : 1.2}
                      initial={false}
                      animate={{ width: requiredWidth }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                    />
                    <text x={areaX + requiredWidth + 4} y={y + 9} fontSize={8} fill={OK}>
                      A_req = {segment.areaReq.toString().replace('.', ',')}
                    </text>
                    {active && (
                      <motion.line
                        x1={areaX + actualWidth + 1.5}
                        y1={y - 12}
                        x2={areaX + actualWidth + 1.5}
                        y2={y + 14}
                        stroke={LOAD}
                        strokeWidth={1.2}
                        strokeDasharray="3 3"
                        initial={false}
                        animate={{ opacity: playing ? [0.45, 1, 0.45] : 1 }}
                        transition={{ duration: 1.5, repeat: playing ? Infinity : 0, ease: 'easeInOut' }}
                      />
                    )}
                  </g>
                )
              })}
              <text x={areaX} y={BOTTOM + 14} fontSize={8} fill={OK}>
                A_req = N / k
              </text>
            </g>
          )}

          {(isElongation || isCheck) && (
            <g>
              <path
                d={barPath(
                  SEGMENTS.map((_, segmentIndex) => ({
                    start: nodes[segmentIndex],
                    end: nodes[segmentIndex + 1],
                    half: halfWidth(SEGMENTS[segmentIndex].area),
                  })),
                )}
                fill="none"
                stroke={MUTED}
                strokeWidth={1.2}
                strokeDasharray="5 4"
              />
              {SEGMENTS.map((segment, segmentIndex) => {
                const start = deformed[segmentIndex]
                const end = deformed[segmentIndex + 1]
                const width = halfWidth(segment.area)
                const color = SEGMENT_COLORS[segmentIndex % SEGMENT_COLORS.length]
                return (
                  <motion.rect
                    key={`d-${segment.id}`}
                    x={CX - width}
                    y={start}
                    width={width * 2}
                    height={end - start}
                    rx={3}
                    fill={color}
                    fillOpacity={0.2}
                    stroke={color}
                    strokeWidth={1.7}
                    initial={false}
                    animate={{ y: start, height: end - start }}
                    transition={{ duration: 0.1, ease: 'linear' }}
                  />
                )
              })}

              {isElongation && (
                <>
                  <Dimension
                    x={252}
                    from={nodes[1]}
                    to={deformed[1]}
                    label={`ΔL₁ = ${pl(SEGMENTS[0].deltaL * s1)} mm`}
                    color={TENSION}
                  />
                  {s2 > 0.01 && (
                    <Dimension
                      x={266}
                      from={deformed[1] + H}
                      to={deformed[2]}
                      label={`ΔL₂ = ${pl(SEGMENTS[1].deltaL * s2)} mm`}
                      color={TENSION}
                    />
                  )}
                  {s3 > 0.01 && (
                    <Dimension
                      x={280}
                      from={deformed[2] + H}
                      to={deformed[3]}
                      label={`ΔL₃ = ${pl(SEGMENTS[2].deltaL * s3)} mm`}
                      color={TENSION}
                    />
                  )}
                </>
              )}

              {showTotal && (
                <>
                  <Dimension
                    x={300}
                    from={BOTTOM}
                    to={deformed[3]}
                    label={`ΔL = ${pl(shownTotal)} mm`}
                    color={INK}
                    size={9}
                    labelY={isCheck ? 318 : BOTTOM - 8}
                  />
                  {isCheck && (
                    <>
                      <line
                        x1={70}
                        y1={BOTTOM + DL_DOP * ELONGATION_SCALE}
                        x2={440}
                        y2={BOTTOM + DL_DOP * ELONGATION_SCALE}
                        stroke={LIMIT}
                        strokeWidth={1.4}
                        strokeDasharray="6 4"
                      />
                      <text
                        x={440}
                        y={BOTTOM + DL_DOP * ELONGATION_SCALE - 6}
                        textAnchor="end"
                        fontSize={8.5}
                        fill={LIMIT}
                      >
                        ΔL_dop = 0,6 mm
                      </text>
                    </>
                  )}
                </>
              )}
            </g>
          )}

          {isCheck && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>
              <text x={252} y={76} fontSize={8.5} fill={MUTED} fontWeight={600}>
                wykorzystanie
              </text>

              <text x={252} y={94} fontSize={8} fill={INK}>
                σ₁ / k = 87,5%
              </text>
              <rect x={252} y={100} width={170} height={9} rx={4.5} fill="#eef1f4" stroke="#d7dde4" strokeWidth={1} />
              <motion.rect
                x={252}
                y={100}
                height={9}
                rx={4.5}
                fill={OK}
                fillOpacity={0.4}
                initial={false}
                animate={{ width: 170 * (140 / K) * Math.min(1, progress + 0.001) }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <text x={252} y={124} fontSize={8} fill={MUTED}>
                140 ≤ 160 MPa
              </text>

              <text x={252} y={144} fontSize={8} fill={INK}>
                ΔL / ΔL_dop = 75,8%
              </text>
              <rect x={252} y={150} width={170} height={9} rx={4.5} fill="#eef1f4" stroke="#d7dde4" strokeWidth={1} />
              <motion.rect
                x={252}
                y={150}
                height={9}
                rx={4.5}
                fill={OK}
                fillOpacity={0.4}
                initial={false}
                animate={{ width: 170 * (TOTAL_DL / DL_DOP) * Math.min(1, progress + 0.001) }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <text x={252} y={174} fontSize={8} fill={MUTED}>
                0,455 ≤ 0,6 mm
              </text>

              <line x1={422} y1={88} x2={422} y2={166} stroke={LIMIT} strokeWidth={1.2} strokeDasharray="3 3" />
              <text x={422} y={178} textAnchor="middle" fontSize={7.5} fill={LIMIT}>
                100%
              </text>

              <motion.g
                initial={false}
                animate={{ opacity: playing ? [0.5, 1, 0.5] : 1 }}
                transition={{ duration: 1.6, repeat: playing ? Infinity : 0, ease: 'easeInOut' }}
              >
                <path
                  d="M 252 192 L 259 199 L 274 183"
                  fill="none"
                  stroke={OK}
                  strokeWidth={2.4}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <text x={280} y={196} fontSize={8.5} fill={OK} fontWeight={600}>
                  oba warunki spełnione
                </text>
              </motion.g>

              <motion.text
                x={252}
                y={218}
                fontSize={8.5}
                fill={INK}
                initial={false}
                animate={{ opacity: pulse > 0.5 ? 1 : 0.75 }}
              >
                decyduje odcinek 1
              </motion.text>
            </motion.g>
          )}

          {isElongation && (
            <text x={8} y={330} fontSize={8} fill={MUTED}>
              kształt pierwotny: linia przerywana; wydłużenie w skali poglądowej
            </text>
          )}
        </svg>
      </div>
    </div>
  )
}
