import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const LOAD = '#ff6b45'
const MUTED = '#87929d'
const SUPPORT = '#68727e'

export function AxialHookeLawExample3Animation() {
  const x = 195
  const width = 56
  const top = 58
  const bottom = 194
  const center = x + width / 2
  const allowed = bottom + 16

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 280"
          role="img"
          aria-label="Pręt stalowy o długości 2 m, polu 250 mm² i module 200 GPa, z dopuszczalnym wydłużeniem 1,5 mm i nieznaną siłą"
        >
          <g stroke={SUPPORT} strokeWidth={1.5}>
            <line x1={x - 14} y1={top} x2={x + width + 14} y2={top} />
            {Array.from({ length: 6 }, (_, index) => {
              const hatchX = x - 12 + (index * (width + 24)) / 5
              return <line key={index} x1={hatchX} y1={top} x2={hatchX - 7} y2={top - 12} />
            })}
          </g>

          <rect
            x={x}
            y={top}
            width={width}
            height={bottom - top}
            rx={4}
            fill={ACCENT}
            fillOpacity={0.18}
            stroke={ACCENT}
            strokeWidth={2}
          />

          <line
            x1={x}
            y1={allowed}
            x2={x + width}
            y2={allowed}
            stroke={ACCENT}
            strokeWidth={1.4}
            strokeDasharray="5 4"
          />
          <line x1={x} y1={bottom} x2={x} y2={allowed} stroke={ACCENT} strokeWidth={1.2} strokeDasharray="3 3" />
          <line
            x1={x + width}
            y1={bottom}
            x2={x + width}
            y2={allowed}
            stroke={ACCENT}
            strokeWidth={1.2}
            strokeDasharray="3 3"
          />

          <g stroke={LOAD} fill={LOAD}>
            <line x1={center} y1={allowed + 8} x2={center} y2={allowed + 40} strokeWidth={2.4} />
            <path
              d={`M${center - 5} ${allowed + 31} L${center} ${allowed + 40} L${center + 5} ${allowed + 31}`}
              fill="none"
              strokeWidth={2.4}
            />
          </g>
          <text x={center + 12} y={allowed + 36} fontSize={11} fill={LOAD}>
            N = ?
          </text>

          <g stroke={MUTED} strokeWidth={1}>
            <line x1={330} y1={top} x2={330} y2={bottom} />
            <line x1={324} y1={top} x2={336} y2={top} />
            <line x1={324} y1={bottom} x2={336} y2={bottom} />
          </g>
          <text x={342} y={(top + bottom) / 2 + 4} fontSize={11} fill={MUTED}>
            L = 2 m
          </text>

          <g stroke={MUTED} strokeWidth={1}>
            <line x1={296} y1={bottom} x2={296} y2={allowed} />
            <line x1={290} y1={bottom} x2={302} y2={bottom} />
            <line x1={290} y1={allowed} x2={302} y2={allowed} />
          </g>
          <text x={306} y={allowed + 4} fontSize={10} fill={MUTED}>
            ΔL_dop = 1,5 mm
          </text>

          <text x={170} y={(top + bottom) / 2 - 6} textAnchor="end" fontSize={11} fill={MUTED}>
            E = 200 GPa
          </text>
          <text x={170} y={(top + bottom) / 2 + 12} textAnchor="end" fontSize={11} fill={MUTED}>
            A = 250 mm²
          </text>
        </svg>
      </div>
    </div>
  )
}
