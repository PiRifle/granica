import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const LOAD = '#ff6b45'
const MUTED = '#87929d'
const SUPPORT = '#68727e'

export function AxialElongationExampleAnimation() {
  const axis = 230
  const top = 44
  const joint = 164
  const bottom = 244
  const supportLeft = 158
  const supportRight = 302

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 300"
          role="img"
          aria-label="Pręt schodkowy utwierdzony u góry: odcinek 1 ma L1 = 1,2 m i A1 = 240 mm², odcinek 2 ma L2 = 0,8 m i A2 = 120 mm², E = 200 GPa, rozciągany siłą N = 24 kN"
        >
          <g stroke={SUPPORT} strokeWidth={2} strokeLinecap="round">
            <line x1={supportLeft} y1={top} x2={supportRight} y2={top} />
            {Array.from({ length: 8 }, (_, index) => {
              const x = supportLeft + 10 + index * 19
              return <line key={index} x1={x} y1={top} x2={x - 9} y2={top - 12} strokeWidth={1.5} />
            })}
          </g>

          <rect
            x={axis - 36}
            y={top}
            width={72}
            height={joint - top}
            fill={ACCENT}
            fillOpacity={0.18}
            stroke={ACCENT}
            strokeWidth={2}
          />
          <rect
            x={axis - 24}
            y={joint}
            width={48}
            height={bottom - joint}
            fill={ACCENT}
            fillOpacity={0.18}
            stroke={ACCENT}
            strokeWidth={2}
          />

          <text x={axis} y={(top + joint) / 2 + 4} textAnchor="middle" fontSize={12} fill={ACCENT}>
            1
          </text>
          <text x={axis} y={(joint + bottom) / 2 + 4} textAnchor="middle" fontSize={12} fill={ACCENT}>
            2
          </text>

          <g stroke={MUTED} strokeWidth={1.1}>
            <line x1={126} y1={top} x2={126} y2={joint} />
            <line x1={120} y1={top} x2={132} y2={top} />
            <line x1={120} y1={joint} x2={132} y2={joint} />
            <line x1={126} y1={joint} x2={126} y2={bottom} />
            <line x1={120} y1={bottom} x2={132} y2={bottom} />
          </g>
          <text x={116} y={(top + joint) / 2 + 4} textAnchor="end" fontSize={10} fill={MUTED}>
            L₁ = 1,2 m
          </text>
          <text x={116} y={(joint + bottom) / 2 + 4} textAnchor="end" fontSize={10} fill={MUTED}>
            L₂ = 0,8 m
          </text>

          <text x={310} y={(top + joint) / 2 + 4} fontSize={10} fill={ACCENT}>
            A₁ = 240 mm²
          </text>
          <text x={310} y={(joint + bottom) / 2 + 4} fontSize={10} fill={ACCENT}>
            A₂ = 120 mm²
          </text>
          <text x={310} y={bottom - 4} fontSize={10} fill={MUTED}>
            E = 200 GPa
          </text>

          <g stroke={LOAD} fill={LOAD}>
            <line x1={axis} y1={bottom} x2={axis} y2={286} strokeWidth={2.6} />
            <path d={`M${axis - 5} 276 L${axis} 286 L${axis + 5} 276`} fill="none" strokeWidth={2.6} />
            <text x={axis + 12} y={280} fontSize={10} stroke="none">
              N = 24 kN
            </text>
          </g>
        </svg>
      </div>
    </div>
  )
}
