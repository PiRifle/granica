import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const SUPPORT = '#68727e'
const MUTED = '#87929d'

export function AxialForceDiagrams3Animation() {
  const nodes = [60, 170, 280, 390]
  const barY = 55
  const barHeight = 18
  const zeroY = 215
  const scale = 4.5

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 280"
          role="img"
          aria-label="Pręt utwierdzony lewym końcem z trzema odcinkami po 0,5 m i wykresem N o stopniach +12, −8 i +4 kN"
        >
          <g stroke={SUPPORT} strokeWidth={2} strokeLinecap="round">
            <line x1={nodes[0]} y1={35} x2={nodes[0]} y2={89} />
            {[0, 1, 2, 3].map((index) => {
              const y = 41 + index * 14
              return <line key={index} x1={nodes[0]} y1={y} x2={nodes[0] - 8} y2={y - 10} strokeWidth={1.5} />
            })}
          </g>

          <rect
            x={nodes[0]}
            y={barY}
            width={nodes[3] - nodes[0]}
            height={barHeight}
            rx={4}
            fill={ACCENT}
            fillOpacity={0.16}
            stroke={ACCENT}
            strokeWidth={2}
          />

          {[0, 1, 2].map((index) => (
            <g key={index}>
              <text
                x={(nodes[index] + nodes[index + 1]) / 2}
                y={barY + barHeight / 2 + 4}
                textAnchor="middle"
                fontSize={11}
                fontWeight={700}
                fill={ACCENT}
              >
                {index + 1}
              </text>
              <line x1={nodes[index]} y1={98} x2={nodes[index + 1]} y2={98} stroke={MUTED} strokeWidth={1} />
              <line x1={nodes[index]} y1={92} x2={nodes[index]} y2={104} stroke={MUTED} strokeWidth={1} />
              <line x1={nodes[index + 1]} y1={92} x2={nodes[index + 1]} y2={104} stroke={MUTED} strokeWidth={1} />
              <text x={(nodes[index] + nodes[index + 1]) / 2} y={116} textAnchor="middle" fontSize={10} fill={MUTED}>
                0,5 m
              </text>
            </g>
          ))}

          <g stroke={MUTED} strokeWidth={1}>
            <line x1={nodes[0]} y1={zeroY} x2={404} y2={zeroY} />
            <line x1={404} y1={zeroY} x2={397} y2={zeroY - 4} />
            <line x1={404} y1={zeroY} x2={397} y2={zeroY + 4} />
          </g>
          <text x={409} y={zeroY + 4} fontSize={11} fill={MUTED}>
            x
          </text>
          <text x={nodes[0] - 8} y={zeroY + 4} textAnchor="end" fontSize={10} fill={MUTED}>
            0
          </text>

          <g stroke={ACCENT} strokeWidth={2.5} strokeLinejoin="round">
            <line x1={nodes[0]} y1={zeroY - 12 * scale} x2={nodes[1]} y2={zeroY - 12 * scale} />
            <line x1={nodes[1]} y1={zeroY - 12 * scale} x2={nodes[1]} y2={zeroY + 8 * scale} />
            <line x1={nodes[1]} y1={zeroY + 8 * scale} x2={nodes[2]} y2={zeroY + 8 * scale} />
            <line x1={nodes[2]} y1={zeroY + 8 * scale} x2={nodes[2]} y2={zeroY - 4 * scale} />
            <line x1={nodes[2]} y1={zeroY - 4 * scale} x2={nodes[3]} y2={zeroY - 4 * scale} />
          </g>

          <text x={nodes[0] + 8} y={zeroY - 12 * scale - 7} fontSize={10} fill={ACCENT}>
            +12 kN
          </text>
          <text x={nodes[1] + 9} y={zeroY + 8 * scale + 14} fontSize={10} fill={ACCENT}>
            −8 kN
          </text>
          <text x={nodes[2] + 8} y={zeroY - 4 * scale - 7} fontSize={10} fill={ACCENT}>
            +4 kN
          </text>

          <text x={409} y={zeroY - 20} fontSize={11} fill={ACCENT}>
            N
          </text>
        </svg>
      </div>
    </div>
  )
}
