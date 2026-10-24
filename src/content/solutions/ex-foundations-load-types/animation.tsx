import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const LOAD = '#ff6b45'
const MUTED = '#87929d'

export function LoadTypesExampleAnimation() {
  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 280"
          role="img"
          aria-label="Pionowy stalowy pręt o polu przekroju 500 mm² i długości 2,5 m obciążony ciężarem własnym"
        >
          <g stroke="#68727e" strokeWidth={2} strokeLinecap="round">
            <line x1={165} y1={40} x2={295} y2={40} />
            {Array.from({ length: 7 }, (_, index) => {
              const x = 173 + index * 20
              return <line key={index} x1={x} y1={40} x2={x - 8} y2={28} strokeWidth={1.5} />
            })}
          </g>

          <rect
            x={210}
            y={40}
            width={40}
            height={190}
            fill={ACCENT}
            fillOpacity={0.18}
            stroke={ACCENT}
            strokeWidth={2}
          />

          <line x1={186} y1={40} x2={186} y2={230} stroke={MUTED} strokeWidth={1} strokeDasharray="4 4" />
          <text x={178} y={138} textAnchor="end" fontSize={10} fill={MUTED}>
            L = 2,5 m
          </text>

          <line x1={210} y1={132} x2={250} y2={132} stroke={ACCENT} strokeWidth={1.4} />
          <text x={258} y={136} fontSize={10} fill={ACCENT}>
            A = 500 mm²
          </text>

          <g stroke={LOAD} fill={LOAD}>
            {[76, 112, 148, 184, 220].map((y) => (
              <g key={y}>
                <line x1={268} y1={y - 10} x2={268} y2={y + 4} strokeWidth={1.6} />
                <path d={`M264 ${y} L268 ${y + 6} L272 ${y}`} fill="none" strokeWidth={1.6} />
              </g>
            ))}
            <text x={278} y={150} fontSize={10} stroke="none">
              ciężar własny
            </text>
          </g>

          <text x={300} y={206} fontSize={10} fill={MUTED}>
            ρ = 7850 kg/m³
          </text>
          <text x={300} y={222} fontSize={10} fill={MUTED}>
            g = 9,81 m/s²
          </text>
        </svg>
      </div>
    </div>
  )
}
