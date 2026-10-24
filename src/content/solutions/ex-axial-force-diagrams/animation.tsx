import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const TENSION = '#4f6df5'
const COMPRESSION = '#d84f28'
const LOAD = '#ff6b45'
const SUPPORT = '#68727e'
const MUTED = '#87929d'

const X0 = 62
const X1 = 438
const SPAN = X1 - X0
const XS = [X0, X0 + SPAN / 3, X0 + (SPAN * 2) / 3, X1]
const BAR_Y = 82
const BAR_H = 18
const N_Y = 214
const N_SCALE = 6

const clamp = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp(value)
  return t * t * (3 - 2 * t)
}
const yN = (value: number) => N_Y - value * N_SCALE
const midpoint = (segment: number) => (XS[segment - 1] + XS[segment]) / 2

function HorizontalLoad({ x, direction, label }: { x: number; direction: 1 | -1; label: string }) {
  const y = BAR_Y - 36
  const end = x + direction * 38
  return (
    <g stroke={LOAD} fill={LOAD}>
      <line x1={x} y1={BAR_Y - 9} x2={x} y2={y + 2} strokeWidth={1} opacity={0.5} />
      <line x1={x} y1={y} x2={end} y2={y} strokeWidth={2.6} />
      <path
        d={
          direction > 0
            ? `M${end - 8} ${y - 5} L${end} ${y} L${end - 8} ${y + 5}`
            : `M${end + 8} ${y - 5} L${end} ${y} L${end + 8} ${y + 5}`
        }
        fill="none"
        strokeWidth={2.6}
      />
      <text x={(x + end) / 2} y={y - 8} textAnchor="middle" fontSize={10} stroke="none">
        {label}
      </text>
    </g>
  )
}

function CutLine({ x, label }: { x: number; label: string }) {
  return (
    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <line
        x1={x}
        y1={BAR_Y - 18}
        x2={x}
        y2={N_Y + 18}
        stroke={ACCENT}
        strokeWidth={1.4}
        strokeDasharray="5 4"
        opacity={0.72}
      />
      <text x={x + 5} y={BAR_Y - 23} fontSize={8.5} fontWeight={700} fill={ACCENT}>
        {label}
      </text>
    </motion.g>
  )
}

export function AxialForceDiagramAnimation({ scene, index, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'N'
  const draw = playing ? smooth(clamp(sceneProgress / 0.55)) : 1
  const reveal = playing ? smooth(clamp(sceneProgress / 0.72)) : 1
  const focusSegment = scene.focus?.segment
  const activeSegment = focusSegment === '1' ? 1 : focusSegment === '2' ? 2 : focusSegment === '3' ? 3 : null
  const show3 = index >= 1
  const show2 = index >= 2
  const show1 = index >= 3
  const cutX = activeSegment != null ? midpoint(activeSegment) : X0
  const path3 = `M${XS[3]} ${N_Y} L${XS[3]} ${yN(5)} L${XS[2]} ${yN(5)}`
  const path2 = `M${XS[2]} ${yN(5)} L${XS[2]} ${yN(-5)} L${XS[1]} ${yN(-5)}`
  const path1 = `M${XS[1]} ${yN(-5)} L${XS[1]} ${yN(15)} L${XS[0]} ${yN(15)}`
  const strokeWidth = metric === 'N' ? 3 : 2.4
  const labelOpacity = (active: boolean) => (active ? reveal : 1)

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 480 300"
          role="img"
          aria-label="Pręt utwierdzony z siłami 20, 10 i 5 kN oraz wykresem siły osiowej N rysowanym od wolnego końca"
        >
          <line x1={X0} y1={BAR_Y - 30} x2={X0} y2={BAR_Y + 30} stroke={SUPPORT} strokeWidth={2.6} />
          {Array.from({ length: 7 }, (_, i) => (
            <line
              key={i}
              x1={X0}
              y1={BAR_Y - 24 + i * 8}
              x2={X0 - 14}
              y2={BAR_Y - 30 + i * 8}
              stroke={SUPPORT}
              strokeWidth={1.4}
            />
          ))}
          <text x={X0 - 20} y={BAR_Y + 4} textAnchor="end" fontSize={10} fill={SUPPORT}>
            A
          </text>

          <rect
            x={X0}
            y={BAR_Y - BAR_H / 2}
            width={SPAN}
            height={BAR_H}
            rx={3}
            fill={ACCENT}
            fillOpacity={0.12}
            stroke={ACCENT}
            strokeWidth={2}
          />
          {[1, 2].map((boundary) => (
            <line
              key={boundary}
              x1={XS[boundary]}
              y1={BAR_Y - BAR_H / 2}
              x2={XS[boundary]}
              y2={BAR_Y + BAR_H / 2}
              stroke={ACCENT}
              strokeWidth={1}
              opacity={0.45}
            />
          ))}
          {[1, 2, 3].map((segment) => (
            <text
              key={segment}
              x={midpoint(segment)}
              y={BAR_Y + 1}
              textAnchor="middle"
              fontSize={9}
              fontWeight={700}
              fill={ACCENT}
            >
              {segment}
            </text>
          ))}

          <HorizontalLoad x={XS[1]} direction={1} label="20 kN" />
          <HorizontalLoad x={XS[2]} direction={-1} label="10 kN" />
          <HorizontalLoad x={XS[3]} direction={1} label="5 kN" />

          {activeSegment != null && <CutLine x={cutX} label={`przekrój ${activeSegment}`} />}

          {[XS[1], XS[2], XS[3]].map((x) => (
            <line
              key={x}
              x1={x}
              y1={BAR_Y + 12}
              x2={x}
              y2={N_Y}
              stroke={MUTED}
              strokeWidth={1}
              strokeDasharray="3 4"
              opacity={0.24}
            />
          ))}

          <line x1={X0 - 16} y1={N_Y + 40} x2={X0 - 16} y2={118} stroke={MUTED} strokeWidth={1.2} />
          <path d={`M${X0 - 20} 126 L${X0 - 16} 116 L${X0 - 12} 126`} fill="none" stroke={MUTED} strokeWidth={1.2} />
          <line x1={X0 - 16} y1={N_Y} x2={X1 + 14} y2={N_Y} stroke={MUTED} strokeWidth={1.2} />
          <path
            d={`M${X1 + 6} ${N_Y - 4} L${X1 + 16} ${N_Y} L${X1 + 6} ${N_Y + 4}`}
            fill="none"
            stroke={MUTED}
            strokeWidth={1.2}
          />
          <text x={X0 - 22} y={112} textAnchor="end" fontSize={10} fontWeight={700} fill={MUTED}>
            N
          </text>
          <text x={X1 + 20} y={N_Y + 4} fontSize={10} fill={MUTED}>
            x
          </text>
          <text x={X0 - 16} y={N_Y + 15} textAnchor="middle" fontSize={9} fill={MUTED}>
            0
          </text>

          <motion.path
            d={path3}
            fill="none"
            stroke={TENSION}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
            strokeLinecap="round"
            initial={false}
            animate={{ pathLength: show3 ? (activeSegment === 3 ? draw : 1) : 0 }}
            transition={{ duration: 0.12, ease: 'linear' }}
          />
          <motion.path
            d={path2}
            fill="none"
            stroke={COMPRESSION}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
            strokeLinecap="round"
            initial={false}
            animate={{ pathLength: show2 ? (activeSegment === 2 ? draw : 1) : 0 }}
            transition={{ duration: 0.12, ease: 'linear' }}
          />
          <motion.path
            d={path1}
            fill="none"
            stroke={TENSION}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
            strokeLinecap="round"
            initial={false}
            animate={{ pathLength: show1 ? (activeSegment === 1 ? draw : 1) : 0 }}
            transition={{ duration: 0.12, ease: 'linear' }}
          />

          {show3 && (
            <motion.text
              x={midpoint(3)}
              y={yN(5) - 9}
              textAnchor="middle"
              fontSize={10}
              fontWeight={700}
              fill={TENSION}
              initial={false}
              animate={{ opacity: labelOpacity(activeSegment === 3) }}
            >
              +5 kN
            </motion.text>
          )}
          {show2 && (
            <motion.text
              x={midpoint(2)}
              y={yN(-5) + 18}
              textAnchor="middle"
              fontSize={10}
              fontWeight={700}
              fill={COMPRESSION}
              initial={false}
              animate={{ opacity: labelOpacity(activeSegment === 2) }}
            >
              −5 kN
            </motion.text>
          )}
          {show1 && (
            <motion.text
              x={midpoint(1)}
              y={yN(15) - 9}
              textAnchor="middle"
              fontSize={10}
              fontWeight={700}
              fill={TENSION}
              initial={false}
              animate={{ opacity: labelOpacity(activeSegment === 1) }}
            >
              +15 kN
            </motion.text>
          )}

          {index === 4 && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
              <line x1={X0} y1={BAR_Y - 58} x2={X0 - 38} y2={BAR_Y - 58} stroke={SUPPORT} strokeWidth={2.2} />
              <path
                d={`M${X0 - 30} ${BAR_Y - 63} L${X0 - 39} ${BAR_Y - 58} L${X0 - 30} ${BAR_Y - 53}`}
                fill="none"
                stroke={SUPPORT}
                strokeWidth={2.2}
              />
              <text x={X0 + 4} y={BAR_Y - 64} fontSize={9} fontWeight={700} fill={SUPPORT}>
                R_A = 15 kN
              </text>
            </motion.g>
          )}

          {index === 4 && (
            <text x={X0 + 4} y={N_Y + 34} fontSize={8.5} fill={MUTED}>
              skoki N w miejscach sił skupionych
            </text>
          )}
        </svg>
      </div>
    </div>
  )
}
