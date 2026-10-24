import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const LOAD = '#ff6b45'

export function AxialStrengthConditionAnimation() {
  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 280"
          role="img"
          aria-label="Pręt o polu przekroju 600 mm² rozciągany siłą 90 kN, stal Re 235 MPa, n 1,5"
        >
          <g stroke="#68727e" strokeWidth={2} strokeLinecap="round">
            <line x1={120} y1={44} x2={300} y2={44} />
            {Array.from({ length: 9 }, (_, index) => {
              const x = 128 + index * 20
              return <line key={index} x1={x} y1={44} x2={x - 8} y2={32} strokeWidth={1.5} />
            })}
          </g>

          <rect
            x={175}
            y={44}
            width={70}
            height={180}
            rx={4}
            fill={ACCENT}
            fillOpacity={0.18}
            stroke={ACCENT}
            strokeWidth={2}
          />

          <line x1={175} y1={134} x2={245} y2={134} stroke={ACCENT} strokeWidth={1.4} />
          <text x={254} y={138} fontSize={10} fill={ACCENT}>
            A = 600 mm²
          </text>

          <g stroke={LOAD} fill={LOAD}>
            <line x1={210} y1={230} x2={210} y2={266} strokeWidth={2.5} />
            <path d="M205 258 L210 266 L215 258" fill="none" strokeWidth={2.5} />
            <text x={222} y={252} fontSize={10} stroke="none">
              N = 90 kN
            </text>
          </g>

          <text x={286} y={70} fontSize={10} fill="#68727e">
            Re = 235 MPa
          </text>
          <text x={286} y={84} fontSize={10} fill="#68727e">
            n = 1,5
          </text>
        </svg>
      </div>
    </div>
  )
}
