import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const LOAD = '#ff6b45'
const MUTED = '#87929d'

export function LoadTypesExample3Animation() {
  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 280"
          role="img"
          aria-label="Pionowa stalowa linka obciążona wyłącznie ciężarem własnym, o nieznanej długości L"
        >
          <g stroke="#68727e" strokeWidth={2} strokeLinecap="round">
            <line x1={190} y1={40} x2={270} y2={40} />
            {Array.from({ length: 5 }, (_, index) => {
              const x = 198 + index * 18
              return <line key={index} x1={x} y1={40} x2={x - 8} y2={28} strokeWidth={1.5} />
            })}
          </g>

          <rect
            x={224}
            y={40}
            width={12}
            height={190}
            fill={ACCENT}
            fillOpacity={0.2}
            stroke={ACCENT}
            strokeWidth={1.8}
          />

          <line x1={206} y1={40} x2={206} y2={230} stroke={MUTED} strokeWidth={1} strokeDasharray="4 4" />
          <text x={198} y={138} textAnchor="end" fontSize={10} fill={MUTED}>
            L = ?
          </text>

          <g stroke={LOAD} fill={LOAD}>
            {[70, 105, 140, 175, 210].map((y) => (
              <g key={y}>
                <line x1={244} y1={y - 10} x2={244} y2={y + 4} strokeWidth={1.6} />
                <path d={`M240 ${y} L244 ${y + 6} L248 ${y}`} fill="none" strokeWidth={1.6} />
              </g>
            ))}
            <text x={256} y={146} fontSize={10} stroke="none">
              ciężar własny
            </text>
          </g>

          <text x={300} y={200} fontSize={10} fill={MUTED}>
            γ = 77 kN/m³
          </text>
          <text x={300} y={216} fontSize={10} fill={MUTED}>
            σ_dop = 120 MPa
          </text>
        </svg>
      </div>
    </div>
  )
}
