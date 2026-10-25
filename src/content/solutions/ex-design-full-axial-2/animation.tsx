import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local, SEGMENT_COLORS } from '../../../components/solution-figures/shared'

const TENSION = '#4f6df5'
const COMPRESSION = '#a970dd'
const LOAD = '#ff6b45'
const MUTED = '#87929d'
const SUPPORT = '#68727e'
const OK = '#2f7d5b'
const INK = '#17202a'

const SEGMENTS = [
  { id: '1', length: 300, area: 400, n: -5, sigma: -12.5, deltaL: -0.01875 },
  { id: '2', length: 500, area: 200, n: 20, sigma: 100, deltaL: 0.25 },
]
const TOTAL_DL = SEGMENTS.reduce((sum, segment) => sum + segment.deltaL, 0)
const ABS_TOTAL = SEGMENTS.reduce((sum, segment) => sum + Math.abs(segment.deltaL), 0)
const MAX_AREA = Math.max(...SEGMENTS.map((segment) => segment.area))
const MAX_ABS_N = Math.max(...SEGMENTS.map((segment) => Math.abs(segment.n)))

const TOP = 48
const BOTTOM = 270
const SPAN = BOTTOM - TOP
const LENGTHS = SEGMENTS.map((segment) => segment.length)
const TOTAL_LENGTH = LENGTHS.reduce((sum, length) => sum + length, 0)
const HEIGHTS = LENGTHS.map((length) => (length / TOTAL_LENGTH) * SPAN)
const H1 = HEIGHTS[0]
const H2 = HEIGHTS[1]
const CX = 130
const MAX_HALF = 32
const ELONGATION_SCALE = 260

const nodes = [TOP, TOP + H1, BOTTOM]
const halfWidth = (area: number) => 10 + 22 * Math.sqrt(area / MAX_AREA)

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}
const num = (value: number, digits = 3) => Number(value.toFixed(digits)).toString().replace('.', ',')

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

function barPath(points: Array<{ start: number; end: number; half: number }>) {
  const first = points[0]
  let path = `M ${CX - first.half} ${first.start} L ${CX + first.half} ${first.start}`
  for (const point of points) {
    path += ` L ${CX + point.half} ${point.end}`
  }
  for (let index = points.length - 1; index >= 0; index -= 1) {
    const point = points[index]
    path += ` L ${CX - point.half} ${point.end}`
    if (index > 0) path += ` L ${CX - point.half} ${point.start}`
  }
  return `${path} Z`
}

export function DesignFullAxial2Animation({ scene, index, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const raw = playing ? clamp01(sceneProgress) : 1
  const progress = playing ? smooth(raw) : 1
  const diagramReveal = playing ? smooth(clamp01((sceneProgress - 0.05) / 0.8)) : 1
  const pulse = playing ? 0.7 + 0.3 * Math.sin((sceneProgress * 2.6 + index * 0.4) * Math.PI * 2) : 1

  const isModel = metric === 'model'
  const isNormal = metric === 'N'
  const isStress = metric === 'σ'
  const isElongation = metric === 'ΔL'
  const isCheck = metric === 'check'

  const s1 = isCheck ? progress : isElongation ? smooth(clamp01(raw / 0.55)) : 0
  const s2 = isCheck ? progress : isElongation ? smooth(clamp01((raw - 0.2) / 0.55)) : 0
  const inc1 = SEGMENTS[0].deltaL * s1 * ELONGATION_SCALE
  const inc2 = SEGMENTS[1].deltaL * s2 * ELONGATION_SCALE
  const deformed = [TOP, TOP + H1 + inc1, TOP + H1 + inc1 + H2 + inc2]
  const shownTotal = SEGMENTS[0].deltaL * s1 + SEGMENTS[1].deltaL * s2

  const loadReveal = isModel ? smooth(clamp01(raw / 0.45)) : 1
  const loadX = CX + MAX_HALF + 16
  const followsElongation = isElongation || isCheck
  const junctionY = followsElongation ? deformed[1] : nodes[1]
  const freeEndY = followsElongation ? deformed[2] : BOTTOM

  const normalAxis = 290
  const normalScale = 90 / MAX_ABS_N
  const stressAxis = 290
  const stressScale = 100 / 100

  const signedWidth = (TOTAL_DL / ABS_TOTAL) * 110
  const absWidth = 110

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 350"
          role="img"
          aria-label="Dwustopniowy pręt utwierdzony u góry. Siła Q działa w górę na połączeniu, a P w dół na swobodnym końcu. Animacja pokazuje ściskanie i rozciąganie, naprężenia, wydłużenie oraz bilans znaków."
        >
          {support()}

          <text x={8} y={20} fontSize={8.5} fill={INK}>
            E = 200 GPa, P = 20 kN, Q = 25 kN
          </text>
          <text x={8} y={34} fontSize={8.5} fill={MUTED}>
            L₁ = 300 mm, L₂ = 500 mm
          </text>

          {SEGMENTS.map((segment, segmentIndex) => {
            const start = nodes[segmentIndex]
            const height = HEIGHTS[segmentIndex]
            const width = halfWidth(segment.area)
            const color = SEGMENT_COLORS[segmentIndex % SEGMENT_COLORS.length]
            const active = isStress && segmentIndex === 1
            return (
              <g key={segment.id}>
                <motion.rect
                  x={CX - width}
                  y={start}
                  width={width * 2}
                  height={height}
                  rx={3}
                  fill={color}
                  initial={false}
                  animate={{ fillOpacity: active ? 0.3 : 0.14, strokeWidth: active ? 2.6 : 1.6 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  stroke={color}
                />
                <text x={CX} y={start + height / 2 + 4} textAnchor="middle" fontSize={12} fontWeight={700} fill={color}>
                  {segment.id}
                </text>
                <text x={8} y={start + height / 2 - 2} fontSize={8.5} fill={MUTED}>
                  A{segment.id} = {segment.area} mm²
                </text>
                <text x={8} y={start + height / 2 + 10} fontSize={8} fill={MUTED}>
                  L{segment.id} = {segment.length} mm
                </text>
              </g>
            )
          })}

          <LoadArrow x={CX} from={TOP - 32} to={TOP - 4} opacity={isModel ? loadReveal : 1} color={SUPPORT} />
          <motion.text
            x={CX + 7}
            y={TOP - 18}
            fontSize={9}
            fill={SUPPORT}
            initial={false}
            animate={{ opacity: isModel ? loadReveal : 1 }}
          >
            R = 5 kN
          </motion.text>

          <LoadArrow x={loadX} from={junctionY + 34} to={junctionY + 4} opacity={isModel ? loadReveal : 1} />
          <motion.text
            x={loadX + 7}
            y={junctionY + 22}
            fontSize={9}
            fill={LOAD}
            initial={false}
            animate={{ opacity: isModel ? loadReveal : 1 }}
          >
            Q = 25 kN ↑
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
            P = 20 kN ↓
          </motion.text>

          {isModel && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} fill={MUTED}>
              <text x={330} y={TOP + 4} fontSize={9} fontWeight={600}>
                model i dane
              </text>
              <text x={330} y={TOP + 20} fontSize={8.5}>
                Q ściska odcinek 1
              </text>
              <text x={330} y={TOP + 34} fontSize={8.5}>
                P rozciąga odcinek 2
              </text>
            </motion.g>
          )}

          {isNormal && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: diagramReveal }} transition={{ duration: 0.25 }}>
              <line x1={normalAxis} y1={TOP - 8} x2={normalAxis} y2={BOTTOM + 8} stroke="#c9d0d9" strokeWidth={1} />
              <text x={normalAxis} y={TOP - 14} fontSize={8.5} fill={INK} fontWeight={600}>
                N [kN]
              </text>
              {SEGMENTS.map((segment, segmentIndex) => {
                const width = Math.abs(segment.n) * normalScale * diagramReveal
                const right = segment.n >= 0
                const color = right ? TENSION : COMPRESSION
                const x = right ? normalAxis : normalAxis - width
                const labelX = right ? normalAxis + width + 5 : normalAxis - width - 5
                return (
                  <g key={`n-${segment.id}`}>
                    <motion.rect
                      x={x}
                      y={nodes[segmentIndex]}
                      height={HEIGHTS[segmentIndex]}
                      fill={color}
                      fillOpacity={0.22}
                      stroke={color}
                      strokeWidth={1.6}
                      initial={false}
                      animate={{ width }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                    />
                    <text
                      x={labelX}
                      y={nodes[segmentIndex] + HEIGHTS[segmentIndex] / 2 + 3}
                      textAnchor={right ? 'start' : 'end'}
                      fontSize={8.5}
                      fill={color}
                      fontWeight={600}
                    >
                      {segmentIndex === 0 ? 'N₁ = −5 kN' : 'N₂ = +20 kN'}
                    </text>
                  </g>
                )
              })}
              <line
                x1={normalAxis - Math.abs(SEGMENTS[0].n) * normalScale}
                y1={nodes[1]}
                x2={normalAxis + SEGMENTS[1].n * normalScale}
                y2={nodes[1]}
                stroke={LOAD}
                strokeWidth={1.1}
                strokeDasharray="3 3"
              />
              <text x={normalAxis + 4} y={nodes[1] - 6} fontSize={8} fill={LOAD}>
                skok 25 kN
              </text>
              <text x={normalAxis + 5} y={BOTTOM + 20} fontSize={7.5} fill={COMPRESSION}>
                ściskanie
              </text>
              <text
                x={normalAxis + SEGMENTS[1].n * normalScale}
                y={BOTTOM + 20}
                textAnchor="end"
                fontSize={7.5}
                fill={TENSION}
              >
                rozciąganie
              </text>
            </motion.g>
          )}

          {isStress && (
            <g>
              <text x={stressAxis} y={TOP - 14} fontSize={8.5} fill={INK} fontWeight={600}>
                σ [MPa]
              </text>
              <line x1={stressAxis} y1={TOP - 8} x2={stressAxis} y2={BOTTOM} stroke="#c9d0d9" strokeWidth={1} />
              {SEGMENTS.map((segment, segmentIndex) => {
                const y = nodes[segmentIndex] + HEIGHTS[segmentIndex] / 2
                const width = Math.abs(segment.sigma) * stressScale * progress
                const right = segment.sigma >= 0
                const color = right ? TENSION : COMPRESSION
                const x = right ? stressAxis : stressAxis - width
                const labelX = right ? stressAxis + width + 5 : stressAxis - width - 5
                const active = segmentIndex === 1
                return (
                  <g key={`s-${segment.id}`}>
                    <motion.rect
                      x={x}
                      y={y - 7}
                      height={14}
                      rx={3}
                      fill={color}
                      fillOpacity={active ? 0.38 : 0.2}
                      stroke={color}
                      strokeWidth={active ? 2.2 : 1.3}
                      initial={false}
                      animate={{ width }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                    />
                    <text
                      x={labelX}
                      y={y + 3}
                      textAnchor={right ? 'start' : 'end'}
                      fontSize={8.5}
                      fill={color}
                      fontWeight={active ? 700 : 500}
                    >
                      {segmentIndex === 0 ? 'σ₁ = −12,5 MPa' : 'σ₂ = 100 MPa'}
                    </text>
                  </g>
                )
              })}
              <motion.text
                x={stressAxis + 5}
                y={nodes[1] - 10}
                fontSize={8}
                fill={LOAD}
                initial={false}
                animate={{ opacity: playing ? [0.5, 1, 0.5] : 1 }}
                transition={{ duration: 1.5, repeat: playing ? Infinity : 0, ease: 'easeInOut' }}
              >
                |σ| decyduje, nie sam znak
              </motion.text>
              <text x={stressAxis} y={BOTTOM + 20} fontSize={8} fill={MUTED}>
                odcinek 2: większe |N| i mniejsze A
              </text>
            </g>
          )}

          {(isElongation || isCheck) && (
            <g>
              <path
                d={barPath(
                  SEGMENTS.map((segment, segmentIndex) => ({
                    start: nodes[segmentIndex],
                    end: nodes[segmentIndex + 1],
                    half: halfWidth(segment.area),
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
                    animate={{ height: end - start }}
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
                    label={`ΔL₁ = ${num(SEGMENTS[0].deltaL * s1, 5)} mm`}
                    color={COMPRESSION}
                  />
                  {s2 > 0.01 && (
                    <Dimension
                      x={266}
                      from={deformed[1] + H2}
                      to={deformed[2]}
                      label={`ΔL₂ = ${num(SEGMENTS[1].deltaL * s2, 3)} mm`}
                      color={TENSION}
                    />
                  )}
                </>
              )}

              <Dimension
                x={286}
                from={BOTTOM}
                to={deformed[2]}
                label={`ΔL = ${num(shownTotal, 3)} mm`}
                color={INK}
                size={9}
                labelY={isCheck ? 322 : BOTTOM - 8}
              />
            </g>
          )}

          {isCheck && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>
              <text x={252} y={76} fontSize={8.5} fill={MUTED} fontWeight={600}>
                bilans wydłużeń
              </text>

              <text x={252} y={94} fontSize={8} fill={INK}>
                suma ze znakami: ΔL = 0,231 mm
              </text>
              <rect x={252} y={100} width={110} height={9} rx={4.5} fill="#eef1f4" stroke="#d7dde4" strokeWidth={1} />
              <motion.rect
                x={252}
                y={100}
                height={9}
                rx={4.5}
                fill={OK}
                fillOpacity={0.4}
                initial={false}
                animate={{ width: signedWidth * Math.min(1, progress + 0.001) }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <line x1={252 + signedWidth} y1={96} x2={252 + signedWidth} y2={113} stroke={OK} strokeWidth={1.4} />

              <text x={252} y={134} fontSize={8} fill={MUTED}>
                suma wartości bezwzględnych: 0,269 mm
              </text>
              <rect x={252} y={140} width={110} height={9} rx={4.5} fill="#eef1f4" stroke="#d7dde4" strokeWidth={1} />
              <motion.rect
                x={252}
                y={140}
                height={9}
                rx={4.5}
                fill={COMPRESSION}
                fillOpacity={0.28}
                initial={false}
                animate={{ width: absWidth * Math.min(1, progress + 0.001) }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <line x1={252 + absWidth} y1={136} x2={252 + absWidth} y2={153} stroke={COMPRESSION} strokeWidth={1.4} />

              <text x={252} y={172} fontSize={8} fill={COMPRESSION}>
                odcinek 1 skraca się o 0,01875 mm
              </text>
              <text x={252} y={186} fontSize={8} fill={TENSION}>
                odcinek 2 wydłuża się o 0,250 mm
              </text>
              <text x={252} y={206} fontSize={8.5} fill={INK} fontWeight={600}>
                decyduje |σ| = 100 MPa w odcinku 2
              </text>
              <text x={252} y={222} fontSize={8} fill={MUTED}>
                ściskanie: σ₁ = −12,5 MPa
              </text>

              <motion.g
                initial={false}
                animate={{ opacity: playing ? [0.5, 1, 0.5] : 1 }}
                transition={{ duration: 1.6, repeat: playing ? Infinity : 0, ease: 'easeInOut' }}
              >
                <path
                  d="M 252 236 L 259 243 L 274 227"
                  fill="none"
                  stroke={OK}
                  strokeWidth={2.4}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <text x={280} y={240} fontSize={8.5} fill={OK} fontWeight={600}>
                  znak odcinka 1 zmniejsza sumę
                </text>
              </motion.g>

              <motion.text
                x={252}
                y={262}
                fontSize={8.5}
                fill={INK}
                initial={false}
                animate={{ opacity: pulse > 0.5 ? 1 : 0.75 }}
              >
                cały pręt wydłuża się netto
              </motion.text>
            </motion.g>
          )}

          {(isElongation || isCheck) && (
            <text x={8} y={338} fontSize={8} fill={MUTED}>
              kształt pierwotny: linia przerywana; wydłużenie w skali poglądowej
            </text>
          )}
        </svg>
      </div>
    </div>
  )
}
