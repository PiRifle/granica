import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const LOAD = '#ff6b45'
const SUPPORT = '#68727e'
const MUTED = '#87929d'

export function AxialForceDiagramsAnimation() {
  const barY = 55
  const barHeight = 20
  const nodes = [50, 163, 277, 390]
  const zeroY = 200
  const scale = 5

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 280"
          role="img"
          aria-label="Pręt utwierdzony lewym końcem z siłami 20 kN w prawo, 10 kN w lewo i 5 kN w prawo oraz wykresem N"
        >
          <g stroke={SUPPORT} strokeWidth={2} strokeLinecap="round">
            <line x1={50} y1={38} x2={50} y2={92} />
            {[0, 1, 2, 3].map((index) => {
              const y = 44 + index * 14
              return <line key={index} x1={50} y1={y} x2={42} y2={y - 10} strokeWidth={1.5} />
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
            <text
              key={index}
              x={(nodes[index] + nodes[index + 1]) / 2}
              y={barY + barHeight + 17}
              textAnchor="middle"
              fontSize={11}
              fontWeight={700}
              fill={ACCENT}
            >
              {index + 1}
            </text>
          ))}

          <g stroke={LOAD} fill={LOAD}>
            <line x1={163} y1={barY} x2={163} y2={35} strokeWidth={1.5} />
            <line x1={163} y1={35} x2={203} y2={35} strokeWidth={2.5} />
            <path d="M195 30 L203 35 L195 40" fill="none" strokeWidth={2.5} />
            <text x={167} y={27} fontSize={10} stroke="none">
              20 kN
            </text>

            <line x1={277} y1={barY + barHeight} x2={277} y2={100} strokeWidth={1.5} />
            <line x1={277} y1={100} x2={237} y2={100} strokeWidth={2.5} />
            <path d="M245 95 L237 100 L245 105" fill="none" strokeWidth={2.5} />
            <text x={232} y={114} fontSize={10} stroke="none">
              10 kN
            </text>

            <line x1={390} y1={barY} x2={390} y2={35} strokeWidth={1.5} />
            <line x1={390} y1={35} x2={428} y2={35} strokeWidth={2.5} />
            <path d="M420 30 L428 35 L420 40" fill="none" strokeWidth={2.5} />
            <text x={382} y={27} fontSize={10} stroke="none">
              5 kN
            </text>
          </g>

          <g stroke={MUTED} strokeWidth={1}>
            <line x1={nodes[0]} y1={zeroY} x2={404} y2={zeroY} />
            <line x1={404} y1={zeroY} x2={397} y2={zeroY - 4} />
            <line x1={404} y1={zeroY} x2={397} y2={zeroY + 4} />
          </g>
          <text x={409} y={zeroY + 4} fontSize={11} fill={MUTED}>
            x
          </text>
          <text x={42} y={zeroY + 4} textAnchor="end" fontSize={10} fill={MUTED}>
            0
          </text>

          <g stroke={ACCENT} strokeWidth={2.5} strokeLinejoin="round">
            <line x1={nodes[0]} y1={zeroY - 15 * scale} x2={nodes[1]} y2={zeroY - 15 * scale} />
            <line x1={nodes[1]} y1={zeroY - 15 * scale} x2={nodes[1]} y2={zeroY + 5 * scale} />
            <line x1={nodes[1]} y1={zeroY + 5 * scale} x2={nodes[2]} y2={zeroY + 5 * scale} />
            <line x1={nodes[2]} y1={zeroY + 5 * scale} x2={nodes[2]} y2={zeroY - 5 * scale} />
            <line x1={nodes[2]} y1={zeroY - 5 * scale} x2={nodes[3]} y2={zeroY - 5 * scale} />
          </g>

          <text x={nodes[0] + 8} y={zeroY - 15 * scale - 7} fontSize={10} fill={ACCENT}>
            +15 kN
          </text>
          <text x={nodes[1] + 9} y={zeroY + 5 * scale + 14} fontSize={10} fill={ACCENT}>
            −5 kN
          </text>
          <text x={nodes[2] + 8} y={zeroY - 5 * scale - 7} fontSize={10} fill={ACCENT}>
            +5 kN
          </text>

          <text x={409} y={zeroY - 20} fontSize={11} fill={ACCENT}>
            N
          </text>
        </svg>
      </div>
    </div>
  )
}
