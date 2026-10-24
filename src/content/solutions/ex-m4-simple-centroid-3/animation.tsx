import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const LOAD = '#ff6b45'
const MUTED = '#87929d'
const INK = '#17202a'
const FILL = '#dfe6f2'
const EDGE = '#7d8fa5'

const OX = 105
const OY = 250
const SCALE = 1.5
const B = 90
const H = 120

const px = (x: number) => OX + x * SCALE
const py = (y: number) => OY - y * SCALE

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}
const lerp = (from: number, to: number, t: number) => from + (to - from) * t

const triangle = (h: number) => `M ${px(0)} ${py(0)} L ${px(B)} ${py(0)} L ${px(0)} ${py(h)} Z`

const STRIPS = Array.from({ length: 6 }, (_, index) => {
  const y0 = index * 20
  const y1 = y0 + 20
  const w0 = B * (1 - y0 / H)
  const w1 = B * (1 - y1 / H)
  return { index, y0, y1, w0, w1 }
})

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

export function SimpleCentroidInverseAnimation({
  scene,
  index: sceneIndex,
  playing,
  sceneProgress,
}: SolutionAnimationProps) {
  const metric = scene.focus?.metric
  const index =
    metric === 'requirement'
      ? 0
      : metric === 'inverse'
        ? 1
        : metric === 'strips'
          ? 2
          : metric === 'medians'
            ? 3
            : metric === 'centroid'
              ? 4
              : metric === 'check'
                ? 5
                : sceneIndex
  const p = playing ? clamp01(sceneProgress) : 1
  const draw = playing ? smooth(p / 0.6) : 1
  const hAnim = playing ? lerp(60, H, smooth((p - 0.08) / 0.72)) : H
  const stripReveal = playing ? smooth((p - 0.05) / 0.6) : 1
  const medianReveal = playing ? smooth((p - 0.08) / 0.7) : 1
  const axisReveal = playing ? smooth((p - 0.06) / 0.58) : 1
  const checkReveal = playing ? smooth((p - 0.12) / 0.55) : 1
  const height = index === 0 ? 60 : index === 1 ? hAnim : H
  const centroidY = height / 3

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 300"
          role="img"
          aria-label="Trójkąt wspornikowy o podstawie 90 mm. Animacja pokazuje wymagane położenie środka ciężkości 40 mm od podstawy, dobór wysokości 120 mm, pasy, środkowe i wynik."
        >
          <g stroke={MUTED} strokeWidth={1.1} fill="none">
            <line x1={px(-8)} y1={py(0)} x2={px(100)} y2={py(0)} />
            <line x1={px(0)} y1={py(-8)} x2={px(0)} y2={py(128)} />
          </g>
          <text x={px(100)} y={py(0) + 14} fontSize={9} fill={MUTED}>
            x
          </text>
          <text x={px(0) - 12} y={py(128)} fontSize={9} fill={MUTED}>
            y
          </text>
          <text x={px(0) - 12} y={py(0) + 14} fontSize={9} fill={MUTED}>
            O
          </text>

          {index === 0 && (
            <>
              <path d={triangle(H)} fill="none" stroke={EDGE} strokeWidth={1} strokeDasharray="5 4" opacity={0.45} />
              <path d={triangle(60)} fill={FILL} fillOpacity={0.65} stroke={EDGE} strokeWidth={1.6} />
              <HDim from={px(0)} to={px(B)} y={py(0) + 22} label="b = 90 mm" />
              <VDim x={px(0) - 26} from={py(0)} to={py(H)} label="h = ?" />
              <motion.line
                x1={px(-12)}
                y1={py(40)}
                x2={px(100)}
                y2={py(40)}
                stroke={LOAD}
                strokeWidth={1.8}
                strokeDasharray="6 4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: draw }}
                transition={{ duration: 0.1, ease: 'linear' }}
              />
              <text x={px(100) + 6} y={py(40) + 3} fontSize={9} fill={LOAD}>
                y_C = 40 mm
              </text>
              <motion.circle
                cx={px(B / 3)}
                cy={py(20)}
                r={4}
                fill={INK}
                stroke="#fff"
                strokeWidth={1.2}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.25, type: 'spring', stiffness: 260, damping: 18 }}
                style={{ transformOrigin: `${px(B / 3)}px ${py(20)}px` }}
              />
              <text x={px(B / 3) + 8} y={py(20) - 7} fontSize={9} fill={MUTED}>
                stan wyjściowy
              </text>
            </>
          )}

          {index === 1 && (
            <>
              <path d={triangle(hAnim)} fill={FILL} fillOpacity={0.55} stroke={EDGE} strokeWidth={1.6} />
              <line
                x1={px(-12)}
                y1={py(40)}
                x2={px(100)}
                y2={py(40)}
                stroke={LOAD}
                strokeWidth={1.8}
                strokeDasharray="6 4"
              />
              <text x={px(100) + 6} y={py(40) + 3} fontSize={9} fill={LOAD}>
                y_C = 40 mm
              </text>
              <VDim x={px(0) - 26} from={py(0)} to={py(hAnim)} label="h" />
              <motion.circle
                cx={px(B / 3)}
                cy={py(centroidY)}
                r={4.6}
                fill={INK}
                stroke="#fff"
                strokeWidth={1.4}
                initial={false}
                animate={{ scale: smooth((p - 0.1) / 0.3) > 0.2 ? 1 : 0.7 }}
                style={{ transformOrigin: `${px(B / 3)}px ${py(centroidY)}px` }}
              />
              <text x={px(B / 3) + 9} y={py(centroidY) - 8} fontSize={10} fontWeight={700} fill={INK}>
                C
              </text>
              <text x={px(B / 3) + 9} y={py(centroidY) + 5} fontSize={8.5} fill={MUTED}>
                y_C = h/3
              </text>
            </>
          )}

          {index === 2 && (
            <>
              <path d={triangle(H)} fill={FILL} fillOpacity={0.22} stroke={EDGE} strokeWidth={1.6} />
              {STRIPS.map((strip) => {
                const reveal = playing ? smooth(stripReveal * STRIPS.length - strip.index) : 1
                const highlight = strip.index === 2
                const points = `${px(0)},${py(strip.y0)} ${px(strip.w0)},${py(strip.y0)} ${px(strip.w1)},${py(strip.y1)} ${px(0)},${py(strip.y1)}`
                return (
                  <motion.polygon
                    key={strip.index}
                    points={points}
                    fill={highlight ? ACCENT : FILL}
                    fillOpacity={highlight ? 0.24 : 0.55}
                    stroke={highlight ? ACCENT : EDGE}
                    strokeWidth={highlight ? 1.4 : 0.7}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: reveal }}
                  />
                )
              })}
              <line
                x1={px(B / 3)}
                y1={py(0)}
                x2={px(B / 3)}
                y2={py(40)}
                stroke={ACCENT}
                strokeWidth={1.6}
                strokeDasharray="5 4"
              />
              <circle cx={px(B / 3)} cy={py(40)} r={4.4} fill={INK} stroke="#fff" strokeWidth={1.4} />
              <text x={px(B / 3) + 9} y={py(40) - 8} fontSize={10} fontWeight={700} fill={INK}>
                C
              </text>
              <text x={px(B / 3) + 9} y={py(40) + 5} fontSize={8.5} fill={ACCENT}>
                x_C = 30 mm
              </text>
            </>
          )}

          {index === 3 && (
            <>
              <path d={triangle(H)} fill={FILL} fillOpacity={0.5} stroke={EDGE} strokeWidth={1.6} />
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
                <text x={px(B / 3) + 9} y={py(H / 3) - 8} fontSize={10} fontWeight={700} fill={INK}>
                  C
                </text>
              </motion.g>
            </>
          )}

          {index === 4 && (
            <>
              <path d={triangle(H)} fill={FILL} fillOpacity={0.4} stroke={EDGE} strokeWidth={1.6} />
              <motion.line
                x1={px(0)}
                y1={py(40)}
                x2={px(B)}
                y2={py(40)}
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
                animate={{ pathLength: playing ? smooth((p - 0.22) / 0.5) : 1 }}
                transition={{ duration: 0.1, ease: 'linear' }}
              />
              <text x={px(B) + 3} y={py(40) - 7} fontSize={9} fill={LOAD}>
                x_C
              </text>
              <text x={px(B / 3) + 7} y={py(H) + 2} fontSize={9} fill={ACCENT}>
                y_C
              </text>

              <line x1={55} y1={290} x2={55} y2={py(40)} stroke={MUTED} strokeWidth={1.1} />
              <line x1={50} y1={290} x2={60} y2={290} stroke={MUTED} strokeWidth={1.1} />
              <line x1={50} y1={py(0)} x2={60} y2={py(0)} stroke={MUTED} strokeWidth={1.1} />
              <line x1={50} y1={py(40)} x2={60} y2={py(40)} stroke={MUTED} strokeWidth={1.1} />
              <path d="M 49 272 L 61 268 L 49 264" fill="none" stroke={MUTED} strokeWidth={1} />
              <text x={48} y={py(20) + 3} textAnchor="end" fontSize={8.5} fill={MUTED}>
                40 mm
              </text>
              <text x={48} y={278} textAnchor="end" fontSize={8.5} fill={MUTED}>
                200 mm
              </text>
              <text x={62} y={py(40) - 5} fontSize={8.5} fill={INK}>
                240 mm
              </text>
              <line x1={px(B / 3)} y1={py(40)} x2={55} y2={py(40)} stroke={INK} strokeWidth={1} strokeDasharray="4 4" />
              <circle cx={px(B / 3)} cy={py(40)} r={4.5} fill={INK} stroke="#fff" strokeWidth={1.4} />
              <text x={px(B / 3) + 9} y={py(40) - 8} fontSize={10} fontWeight={700} fill={INK}>
                C
              </text>
            </>
          )}

          {index === 5 && (
            <>
              <path d={triangle(H)} fill={FILL} fillOpacity={0.5} stroke={EDGE} strokeWidth={1.6} />
              <motion.line
                x1={px(-10)}
                y1={py(40)}
                x2={px(100)}
                y2={py(40)}
                stroke={ACCENT}
                strokeWidth={2.2}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: draw }}
                transition={{ duration: 0.1, ease: 'linear' }}
              />
              <motion.line
                x1={px(-10)}
                y1={py(60)}
                x2={px(100)}
                y2={py(60)}
                stroke={LOAD}
                strokeWidth={1.8}
                strokeDasharray="6 4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: checkReveal }}
                transition={{ duration: 0.1, ease: 'linear' }}
              />
              <text x={px(100) + 6} y={py(40) + 3} fontSize={9} fill={ACCENT}>
                y_C = h/3 = 40 mm
              </text>
              <text x={px(100) + 6} y={py(60) + 3} fontSize={9} fill={LOAD}>
                h/2 = 60 mm
              </text>
              <circle cx={px(B / 3)} cy={py(40)} r={4.6} fill={INK} stroke="#fff" strokeWidth={1.4} />
              <text x={px(B / 3) + 9} y={py(40) - 8} fontSize={10} fontWeight={700} fill={INK}>
                C
              </text>
              <text x={px(B / 3) + 26} y={py(50)} fontSize={10} fontWeight={700} fill={LOAD}>
                ≠
              </text>
            </>
          )}
        </svg>
      </div>
    </div>
  )
}
