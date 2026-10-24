import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const LOAD = '#ff6b45'
const MUTED = '#87929d'
const INK = '#17202a'
const FILL = '#dfe6f2'
const EDGE = '#7d8fa5'

const OX = 80
const OY = 250
const SCALE = 1
const B = 240
const H = 180

const px = (x: number) => OX + x * SCALE
const py = (y: number) => OY - y * SCALE

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}

const TRIANGLE = `M ${px(0)} ${py(0)} L ${px(B)} ${py(0)} L ${px(0)} ${py(H)} Z`

const STRIPS = Array.from({ length: 9 }, (_, index) => {
  const y0 = index * 20
  const y1 = y0 + 20
  const w0 = B * (1 - y0 / H)
  const w1 = B * (1 - y1 / H)
  const dy = y1 - y0
  const area = ((w0 + w1) / 2) * dy
  const cx = (w0 * w0 + w0 * w1 + w1 * w1) / (3 * (w0 + w1))
  const cy = y0 + (dy * (w0 + 2 * w1)) / (3 * (w0 + w1))
  return { index, y0, y1, w0, w1, area, cx, cy }
})

function partialCentroid(reveal: number) {
  let weight = 0
  let sx = 0
  let sy = 0
  for (const strip of STRIPS) {
    const share = clamp01(reveal * STRIPS.length - strip.index)
    if (share <= 0) continue
    const area = strip.area * share
    weight += area
    sx += area * strip.cx
    sy += area * strip.cy
  }
  if (weight === 0) return { x: STRIPS[0].cx, y: STRIPS[0].cy }
  return { x: sx / weight, y: sy / weight }
}

function HDim({ from, to, y, label }: { from: number; to: number; y: number; label: string }) {
  return (
    <g stroke={MUTED} strokeWidth={1.2} fill={MUTED}>
      <line x1={from} y1={y} x2={to} y2={y} />
      <line x1={from} y1={y - 5} x2={from} y2={y + 5} />
      <line x1={to} y1={y - 5} x2={to} y2={y + 5} />
      <text x={(from + to) / 2} y={y - 6} textAnchor="middle" fontSize={9} stroke="none">
        {label}
      </text>
    </g>
  )
}

function VDim({ x, from, to, label }: { x: number; from: number; to: number; label: string }) {
  return (
    <g stroke={MUTED} strokeWidth={1.2} fill={MUTED}>
      <line x1={x} y1={from} x2={x} y2={to} />
      <line x1={x - 5} y1={from} x2={x + 5} y2={from} />
      <line x1={x - 5} y1={to} x2={x + 5} y2={to} />
      <text
        x={x - 7}
        y={(from + to) / 2}
        textAnchor="middle"
        fontSize={9}
        stroke="none"
        transform={`rotate(-90 ${x - 7} ${(from + to) / 2})`}
      >
        {label}
      </text>
    </g>
  )
}

export function SimpleCentroidTriangleAnimation({
  scene,
  index: sceneIndex,
  playing,
  sceneProgress,
}: SolutionAnimationProps) {
  const metric = scene.focus?.metric
  const index =
    metric === 'axes'
      ? 0
      : metric === 'strips'
        ? 1
        : metric === 'parts'
          ? 2
          : metric === 'medians'
            ? 3
            : metric === 'centroid'
              ? 4
              : sceneIndex
  const p = playing ? clamp01(sceneProgress) : 1
  const draw = playing ? smooth(p / 0.6) : 1
  const stripReveal = playing ? smooth((p - 0.05) / 0.6) : 1
  const partReveal = playing ? smooth((p - 0.05) / 0.55) : 1
  const medianReveal = playing ? smooth((p - 0.08) / 0.7) : 1
  const axisReveal = playing ? smooth((p - 0.05) / 0.55) : 1
  const centroid = partialCentroid(partReveal)
  const showStrips = index === 1 || index === 2

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 300"
          role="img"
          aria-label="Trójkąt prostokątny 240 na 180 mm. Animacja pokazuje osie, poziome pasy, ich środki, środkowe i wyznaczony środek ciężkości."
        >
          <defs>
            <marker
              id="c1-axis"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={MUTED} />
            </marker>
          </defs>

          <g stroke={MUTED} strokeWidth={1.1} fill="none" opacity={0.9}>
            <line x1={px(-8)} y1={py(0)} x2={px(252)} y2={py(0)} markerEnd="url(#c1-axis)" />
            <line x1={px(0)} y1={py(-8)} x2={px(0)} y2={py(188)} markerEnd="url(#c1-axis)" />
          </g>
          <text x={px(252)} y={py(0) + 14} fontSize={9} fill={MUTED}>
            x
          </text>
          <text x={px(0) - 12} y={py(188)} fontSize={9} fill={MUTED}>
            y
          </text>
          <text x={px(0) - 12} y={py(0) + 14} fontSize={9} fill={MUTED}>
            O
          </text>

          <path d={TRIANGLE} fill={FILL} fillOpacity={showStrips ? 0.22 : 0.5} stroke="none" />
          <path d={TRIANGLE} fill="none" stroke={EDGE} strokeWidth={1.6} />
          {index === 0 && (
            <motion.path
              d={TRIANGLE}
              fill="none"
              stroke={ACCENT}
              strokeWidth={2.4}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: draw }}
              transition={{ duration: 0.1, ease: 'linear' }}
            />
          )}

          {index === 0 && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: smooth(draw) }}>
              <HDim from={px(0)} to={px(B)} y={py(0) + 22} label="b = 240 mm" />
              <VDim x={px(0) - 26} from={py(0)} to={py(H)} label="h = 180 mm" />
              <path
                d={`M ${px(0)} ${py(12)} L ${px(12)} ${py(12)} L ${px(12)} ${py(0)}`}
                fill="none"
                stroke={MUTED}
                strokeWidth={1.1}
              />
            </motion.g>
          )}

          {(index === 1 || index === 2) &&
            STRIPS.map((strip) => {
              const reveal = playing ? smooth(stripReveal * STRIPS.length - strip.index) : 1
              const highlight = index === 1 && strip.index === 4
              const points = `${px(0)},${py(strip.y0)} ${px(strip.w0)},${py(strip.y0)} ${px(strip.w1)},${py(strip.y1)} ${px(0)},${py(strip.y1)}`
              return (
                <g key={strip.index}>
                  <motion.polygon
                    points={points}
                    fill={highlight ? ACCENT : FILL}
                    fillOpacity={highlight ? 0.22 : 0.55}
                    stroke={highlight ? ACCENT : EDGE}
                    strokeWidth={highlight ? 1.5 : 0.7}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: reveal }}
                  />
                  {highlight && (
                    <motion.g initial={{ opacity: 0 }} animate={{ opacity: reveal }}>
                      <line
                        x1={px(strip.w0)}
                        y1={py((strip.y0 + strip.y1) / 2)}
                        x2={px(strip.w0) + 24}
                        y2={py((strip.y0 + strip.y1) / 2)}
                        stroke={ACCENT}
                        strokeWidth={1}
                      />
                      <text x={px(strip.w0) + 27} y={py((strip.y0 + strip.y1) / 2) + 3} fontSize={9} fill={ACCENT}>
                        b(y)
                      </text>
                    </motion.g>
                  )}
                </g>
              )
            })}

          {index === 2 && (
            <>
              {STRIPS.map((strip) => {
                const reveal = playing ? smooth(partReveal * STRIPS.length - strip.index) : 1
                return (
                  <motion.circle
                    key={`part-${strip.index}`}
                    cx={px(strip.cx)}
                    cy={py(strip.cy)}
                    r={2.6}
                    fill={ACCENT}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: reveal }}
                  />
                )
              })}
              <line
                x1={px(0)}
                y1={py(centroid.y)}
                x2={px(centroid.x)}
                y2={py(centroid.y)}
                stroke={MUTED}
                strokeWidth={1}
                strokeDasharray="4 4"
              />
              <line
                x1={px(centroid.x)}
                y1={py(0)}
                x2={px(centroid.x)}
                y2={py(centroid.y)}
                stroke={MUTED}
                strokeWidth={1}
                strokeDasharray="4 4"
              />
              <motion.circle
                cx={px(centroid.x)}
                cy={py(centroid.y)}
                r={4.5}
                fill={INK}
                stroke="#fff"
                strokeWidth={1.4}
                initial={false}
                animate={{ scale: partReveal > 0.75 ? 1 : 0.7 }}
                style={{ transformOrigin: `${px(centroid.x)}px ${py(centroid.y)}px` }}
              />
              {partReveal > 0.7 && (
                <motion.text
                  x={px(B / 3) + 9}
                  y={py(H / 3) - 9}
                  fontSize={10}
                  fontWeight={700}
                  fill={INK}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  C
                </motion.text>
              )}
            </>
          )}

          {index === 3 && (
            <>
              {[
                { from: { x: 0, y: 0 }, to: { x: B / 2, y: H / 2 } },
                { from: { x: B, y: 0 }, to: { x: 0, y: H / 2 } },
                { from: { x: 0, y: H }, to: { x: B / 2, y: 0 } },
              ].map((median, medianIndex) => {
                const reveal = playing ? clamp01(medianReveal * 3 - medianIndex) : 1
                return (
                  <motion.line
                    key={medianIndex}
                    x1={px(median.from.x)}
                    y1={py(median.from.y)}
                    x2={px(median.to.x)}
                    y2={py(median.to.y)}
                    stroke={ACCENT}
                    strokeWidth={1.8}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: reveal }}
                    transition={{ duration: 0.1, ease: 'linear' }}
                  />
                )
              })}
              {[
                { x: B / 2, y: 0 },
                { x: B / 2, y: H / 2 },
                { x: 0, y: H / 2 },
              ].map((midpoint, midpointIndex) => (
                <motion.circle
                  key={`mid-${midpointIndex}`}
                  cx={px(midpoint.x)}
                  cy={py(midpoint.y)}
                  r={3}
                  fill="#fff"
                  stroke={ACCENT}
                  strokeWidth={1.4}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: medianReveal > 0.2 ? 1 : 0 }}
                />
              ))}
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: medianReveal > 0.65 ? 1 : 0 }}>
                <circle cx={px(B / 3)} cy={py(H / 3)} r={4.5} fill={INK} stroke="#fff" strokeWidth={1.4} />
                <text x={px(B / 3) + 9} y={py(H / 3) - 9} fontSize={10} fontWeight={700} fill={INK}>
                  C
                </text>
              </motion.g>
            </>
          )}

          {index === 4 && (
            <>
              <motion.line
                x1={px(0)}
                y1={py(H / 3)}
                x2={px(B)}
                y2={py(H / 3)}
                stroke={LOAD}
                strokeWidth={2.2}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: axisReveal }}
                transition={{ duration: 0.1, ease: 'linear' }}
              />
              <motion.line
                x1={px(B / 3)}
                y1={py(0)}
                x2={px(B / 3)}
                y2={py(H)}
                stroke={ACCENT}
                strokeWidth={2.2}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: playing ? smooth((p - 0.15) / 0.55) : 1 }}
                transition={{ duration: 0.1, ease: 'linear' }}
              />
              <text x={px(B) + 3} y={py(H / 3) - 7} fontSize={9} fill={LOAD}>
                x_C
              </text>
              <text x={px(B / 3) + 7} y={py(H) + 2} fontSize={9} fill={ACCENT}>
                y_C
              </text>
              <HDim from={px(0)} to={px(B / 3)} y={py(0) + 22} label="b/3 = 80 mm" />
              <VDim x={px(0) - 26} from={py(0)} to={py(H / 3)} label="h/3 = 60 mm" />
              <circle cx={px(B / 3)} cy={py(H / 3)} r={4.5} fill={INK} stroke="#fff" strokeWidth={1.4} />
              <motion.circle
                cx={px(B / 3)}
                cy={py(H / 3)}
                r={11}
                fill="none"
                stroke={INK}
                strokeWidth={1}
                initial={{ opacity: 0 }}
                animate={{ opacity: playing ? [0.15, 0.55, 0.15] : 0.3 }}
                transition={{ duration: 2.2, repeat: playing ? Infinity : 0, ease: 'easeInOut' }}
              />
              <text x={px(B / 3) + 9} y={py(H / 3) - 9} fontSize={10} fontWeight={700} fill={INK}>
                C
              </text>
            </>
          )}
        </svg>
      </div>
    </div>
  )
}
