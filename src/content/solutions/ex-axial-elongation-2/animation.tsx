import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const LOAD = '#ff6b45'
const MUTED = '#87929d'
const SUPPORT = '#68727e'

export function AxialElongation2ExampleAnimation() {
  const axis = 232
  const top = 44
  const bottom = 252
  const arrowX = 206

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 300"
          role="img"
          aria-label="Pionowo zawieszona stalowa lina o długości L = 30 m, średnicy 20 mm, obciążona tylko ciężarem własnym; E = 200 GPa, γ = 7,7·10⁻⁵ N/mm³"
        >
          <g stroke={SUPPORT} strokeWidth={2} strokeLinecap="round">
            <line x1={196} y1={top} x2={268} y2={top} />
            {Array.from({ length: 7 }, (_, index) => {
              const x = 204 + index * 10
              return <line key={index} x1={x} y1={top} x2={x - 9} y2={top - 12} strokeWidth={1.5} />
            })}
          </g>

          <rect
            x={axis - 8}
            y={top}
            width={16}
            height={bottom - top}
            fill={ACCENT}
            fillOpacity={0.2}
            stroke={ACCENT}
            strokeWidth={2}
          />

          <g stroke={LOAD} fill={LOAD}>
            {Array.from({ length: 8 }, (_, index) => {
              const y = 66 + index * 24
              return (
                <g key={index}>
                  <line x1={axis - 8} y1={y} x2={arrowX} y2={y} strokeWidth={1.2} />
                  <line x1={arrowX} y1={y} x2={arrowX} y2={y + 16} strokeWidth={1.6} />
                  <path
                    d={`M${arrowX - 4} ${y + 10} L${arrowX} ${y + 16} L${arrowX + 4} ${y + 10}`}
                    fill="none"
                    strokeWidth={1.6}
                  />
                </g>
              )
            })}
            <text x={arrowX} y={56} textAnchor="middle" fontSize={10} stroke="none">
              γ
            </text>
          </g>

          <g stroke={MUTED} strokeWidth={1.1}>
            <line x1={286} y1={top} x2={286} y2={bottom} />
            <line x1={280} y1={top} x2={292} y2={top} />
            <line x1={280} y1={bottom} x2={292} y2={bottom} />
          </g>
          <text x={296} y={(top + bottom) / 2 + 4} fontSize={10} fill={MUTED}>
            L = 30 m
          </text>

          <text x={332} y={86} fontSize={10} fill={ACCENT}>
            d = 20 mm
          </text>
          <text x={332} y={104} fontSize={10} fill={ACCENT}>
            A ≈ 314 mm²
          </text>
          <text x={332} y={142} fontSize={10} fill={MUTED}>
            E = 200 GPa
          </text>
          <text x={332} y={184} fontSize={10} fill={MUTED}>
            γ = 7,7·10⁻⁵ N/mm³
          </text>
          <text x={332} y={218} fontSize={10} fill={MUTED}>
            tylko ciężar własny
          </text>
        </svg>
      </div>
    </div>
  )
}
