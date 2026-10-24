import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const LOAD = '#ff6b45'
const MUTED = '#87929d'

const SEGMENTS = [
  { label: '1', areaLabel: 'A₁', area: '300', height: 60 },
  { label: '2', areaLabel: 'A₂', area: '150', height: 42 },
  { label: '3', areaLabel: 'A₃', area: '250', height: 56 },
]

export function AxialSteppedBarsAnimation() {
  const centerY = 140
  const startX = 130
  const segmentWidth = 73
  const endX = startX + SEGMENTS.length * segmentWidth

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 280"
          role="img"
          aria-label="Pręt schodkowy z trzech odcinków o polach 300, 150 i 250 mm² rozciągany siłą N = 60 kN"
        >
          {SEGMENTS.map((segment, index) => {
            const x = startX + index * segmentWidth
            const y = centerY - segment.height / 2
            return (
              <g key={segment.label}>
                <rect
                  x={x}
                  y={y}
                  width={segmentWidth}
                  height={segment.height}
                  rx={3}
                  fill={ACCENT}
                  fillOpacity={index === 1 ? 0.26 : 0.16}
                  stroke={ACCENT}
                  strokeWidth={2}
                />
                <text x={x + segmentWidth / 2} y={92} textAnchor="middle" fontSize={12} fontWeight={700} fill={ACCENT}>
                  {segment.label}
                </text>
                <text x={x + segmentWidth / 2} y={192} textAnchor="middle" fontSize={10} fill={MUTED}>
                  {`${segment.areaLabel} = ${segment.area} mm²`}
                </text>
              </g>
            )
          })}

          <line
            x1={startX}
            y1={centerY}
            x2={endX}
            y2={centerY}
            stroke={ACCENT}
            strokeWidth={1.2}
            strokeDasharray="5 4"
          />

          <g stroke={LOAD} fill={LOAD}>
            <line x1={startX} y1={centerY} x2={92} y2={centerY} strokeWidth={2.5} />
            <path d="M100 134 L92 140 L100 146" fill="none" strokeWidth={2.5} />
            <text x={96} y={124} textAnchor="middle" fontSize={10} stroke="none">
              N = 60 kN
            </text>

            <line x1={endX} y1={centerY} x2={398} y2={centerY} strokeWidth={2.5} />
            <path d="M390 134 L398 140 L390 146" fill="none" strokeWidth={2.5} />
            <text x={394} y={124} textAnchor="middle" fontSize={10} stroke="none">
              N = 60 kN
            </text>
          </g>

          <text x={230} y={244} textAnchor="middle" fontSize={10} fill={MUTED}>
            Długości odcinków nie są podane
          </text>
        </svg>
      </div>
    </div>
  )
}
