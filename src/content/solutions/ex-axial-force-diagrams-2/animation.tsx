import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const LOAD = '#ff6b45'
const SUPPORT = '#68727e'
const MUTED = '#87929d'

export function AxialForceDiagrams2Animation() {
  const xStart = 60
  const xEnd = 390
  const barY = 65
  const barHeight = 18
  const zeroY = 235
  const scale = 4

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 280"
          role="img"
          aria-label="Pręt utwierdzony lewym końcem o długości 2 m, obciążony rozłożonym q = 8 kN/m i siłą P = 6 kN na końcu"
        >
          <g stroke={SUPPORT} strokeWidth={2} strokeLinecap="round">
            <line x1={xStart} y1={45} x2={xStart} y2={95} />
            {[0, 1, 2, 3].map((index) => {
              const y = 51 + index * 14
              return <line key={index} x1={xStart} y1={y} x2={xStart - 8} y2={y - 10} strokeWidth={1.5} />
            })}
          </g>

          <rect
            x={xStart}
            y={barY}
            width={xEnd - xStart}
            height={barHeight}
            rx={4}
            fill={ACCENT}
            fillOpacity={0.16}
            stroke={ACCENT}
            strokeWidth={2}
          />

          <g stroke={LOAD} fill={LOAD}>
            {Array.from({ length: 8 }, (_, index) => {
              const x = 70 + index * 40
              return (
                <g key={index}>
                  <line x1={x} y1={42} x2={x + 22} y2={42} strokeWidth={1.8} />
                  <path d={`M${x + 16} 38 L${x + 22} 42 L${x + 16} 46`} fill="none" strokeWidth={1.8} />
                </g>
              )
            })}
            <line x1={xStart} y1={28} x2={xEnd} y2={28} strokeWidth={1} />
            <line x1={xStart} y1={24} x2={xStart} y2={32} strokeWidth={1} />
            <line x1={xEnd} y1={24} x2={xEnd} y2={32} strokeWidth={1} />
            <text x={(xStart + xEnd) / 2} y={21} textAnchor="middle" fontSize={10} stroke="none">
              q = 8 kN/m
            </text>

            <line x1={xEnd} y1={barY + barHeight / 2} x2={428} y2={barY + barHeight / 2} strokeWidth={2.5} />
            <path
              d={`M420 ${barY + barHeight / 2 - 5} L428 ${barY + barHeight / 2} L420 ${barY + barHeight / 2 + 5}`}
              fill="none"
              strokeWidth={2.5}
            />
            <text x={xEnd - 8} y={barY - 8} textAnchor="end" fontSize={10} stroke="none">
              P = 6 kN
            </text>
          </g>

          <g stroke={MUTED} strokeWidth={1}>
            <line x1={xStart} y1={112} x2={xEnd} y2={112} />
            <line x1={xStart} y1={106} x2={xStart} y2={118} />
            <line x1={xEnd} y1={106} x2={xEnd} y2={118} />
          </g>
          <text x={(xStart + xEnd) / 2} y={128} textAnchor="middle" fontSize={11} fill={MUTED}>
            L = 2 m
          </text>

          <polygon
            points={`${xStart},${zeroY} ${xStart},${zeroY - 22 * scale} ${xEnd},${zeroY - 6 * scale} ${xEnd},${zeroY}`}
            fill={ACCENT}
            fillOpacity={0.1}
          />
          <line
            x1={xStart}
            y1={zeroY - 22 * scale}
            x2={xEnd}
            y2={zeroY - 6 * scale}
            stroke={ACCENT}
            strokeWidth={2.5}
          />
          <line x1={xStart} y1={zeroY} x2={xStart} y2={zeroY - 22 * scale} stroke={ACCENT} strokeWidth={1.5} />
          <line x1={xEnd} y1={zeroY} x2={xEnd} y2={zeroY - 6 * scale} stroke={ACCENT} strokeWidth={1.5} />

          <g stroke={MUTED} strokeWidth={1}>
            <line x1={xStart} y1={zeroY} x2={404} y2={zeroY} />
            <line x1={404} y1={zeroY} x2={397} y2={zeroY - 4} />
            <line x1={404} y1={zeroY} x2={397} y2={zeroY + 4} />
          </g>
          <text x={409} y={zeroY + 4} fontSize={11} fill={MUTED}>
            x
          </text>

          <text x={xStart - 6} y={zeroY - 22 * scale + 4} textAnchor="end" fontSize={10} fill={ACCENT}>
            22 kN
          </text>
          <text x={xEnd + 7} y={zeroY - 6 * scale + 4} fontSize={10} fill={ACCENT}>
            6 kN
          </text>
          <text x={409} y={zeroY - 20} fontSize={11} fill={ACCENT}>
            N
          </text>
        </svg>
      </div>
    </div>
  )
}
