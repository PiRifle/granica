import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const LOAD = '#ff6b45'
const MUTED = '#87929d'
const SUPPORT = '#68727e'

const SEGMENTS = [
  { label: '1', areaLabel: 'A₁', area: '500', x: 95, width: 145, height: 68 },
  { label: '2', areaLabel: 'A₂', area: '150', x: 240, width: 120, height: 37 },
]

export function AxialSteppedBars2Animation() {
  const centerY = 140
  const endX = 360

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 280"
          role="img"
          aria-label="Pręt schodkowy utwierdzony lewym końcem: odcinek 1 o polu 500 mm² i odcinek 2 o polu 150 mm², obciążony siłami P = 30 kN i Q = 20 kN w prawo"
        >
          <g stroke={SUPPORT} strokeWidth={2} strokeLinecap="round">
            <line x1={90} y1={78} x2={90} y2={202} />
            {Array.from({ length: 6 }, (_, index) => {
              const y = 88 + index * 22
              return <line key={index} x1={90} y1={y} x2={76} y2={y - 12} strokeWidth={1.5} />
            })}
          </g>

          {SEGMENTS.map((segment, index) => {
            const y = centerY - segment.height / 2
            return (
              <g key={segment.label}>
                <rect
                  x={segment.x}
                  y={y}
                  width={segment.width}
                  height={segment.height}
                  rx={3}
                  fill={ACCENT}
                  fillOpacity={index === 0 ? 0.16 : 0.26}
                  stroke={ACCENT}
                  strokeWidth={2}
                />
                <text
                  x={segment.x + segment.width / 2}
                  y={index === 0 ? 96 : 112}
                  textAnchor="middle"
                  fontSize={12}
                  fontWeight={700}
                  fill={ACCENT}
                >
                  {segment.label}
                </text>
                <text
                  x={segment.x + segment.width / 2}
                  y={centerY + segment.height / 2 + 18}
                  textAnchor="middle"
                  fontSize={10}
                  fill={MUTED}
                >
                  {`${segment.areaLabel} = ${segment.area} mm²`}
                </text>
              </g>
            )
          })}

          <line x1={95} y1={centerY} x2={endX} y2={centerY} stroke={ACCENT} strokeWidth={1.2} strokeDasharray="5 4" />

          <g stroke={LOAD} fill={LOAD}>
            <line x1={240} y1={92} x2={288} y2={92} strokeWidth={2.5} />
            <path d="M280 86 L288 92 L280 98" fill="none" strokeWidth={2.5} />
            <line x1={240} y1={106} x2={240} y2={92} strokeWidth={1.2} strokeDasharray="3 3" />
            <text x={248} y={82} fontSize={10} stroke="none">
              Q = 20 kN
            </text>

            <line x1={endX} y1={centerY} x2={405} y2={centerY} strokeWidth={2.5} />
            <path d="M397 134 L405 140 L397 146" fill="none" strokeWidth={2.5} />
            <text x={368} y={128} fontSize={10} stroke="none">
              P = 30 kN
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
