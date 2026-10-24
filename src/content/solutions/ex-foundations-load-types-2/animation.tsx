import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const LOAD = '#ff6b45'
const MUTED = '#87929d'
const SUPPORT = '#68727e'

export function LoadTypesExample2Animation() {
  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 280"
          role="img"
          aria-label="Belka swobodnie podparta o długości 6 m z obciążeniem równomiernym 2,4 kN/m i siłą skupioną 18 kN w środku"
        >
          <line x1={70} y1={118} x2={390} y2={118} stroke={ACCENT} strokeWidth={3} />

          <g stroke={LOAD} fill={LOAD}>
            <line x1={70} y1={74} x2={390} y2={74} strokeWidth={1.6} />
            {Array.from({ length: 11 }, (_, index) => {
              const x = 70 + index * 32
              return (
                <g key={index}>
                  <line x1={x} y1={74} x2={x} y2={110} strokeWidth={1.4} />
                  <path d={`M${x - 4} 104 L${x} 112 L${x + 4} 104`} fill="none" strokeWidth={1.4} />
                </g>
              )
            })}
            <text x={230} y={62} textAnchor="middle" fontSize={10} stroke="none">
              q = 2,4 kN/m
            </text>
          </g>

          <g stroke={LOAD} fill={LOAD}>
            <line x1={230} y1={30} x2={230} y2={110} strokeWidth={2.5} />
            <path d="M225 102 L230 110 L235 102" fill="none" strokeWidth={2.5} />
            <text x={242} y={42} fontSize={10} stroke="none">
              P = 18 kN
            </text>
          </g>

          <g stroke={SUPPORT} fill="none" strokeLinejoin="round">
            <polygon points="70,118 58,146 82,146" strokeWidth={1.6} />
            <line x1={48} y1={150} x2={92} y2={150} strokeWidth={1.4} />
            {Array.from({ length: 5 }, (_, index) => {
              const x = 52 + index * 9
              return <line key={index} x1={x} y1={150} x2={x - 7} y2={160} strokeWidth={1.2} />
            })}
          </g>
          <text x={70} y={176} textAnchor="middle" fontSize={11} fill={SUPPORT}>
            A
          </text>

          <g stroke={SUPPORT} fill="none" strokeLinejoin="round">
            <polygon points="390,118 378,146 402,146" strokeWidth={1.6} />
            <circle cx={384} cy={150} r={3.5} strokeWidth={1.3} />
            <circle cx={396} cy={150} r={3.5} strokeWidth={1.3} />
            <line x1={368} y1={158} x2={412} y2={158} strokeWidth={1.4} />
            {Array.from({ length: 5 }, (_, index) => {
              const x = 372 + index * 9
              return <line key={index} x1={x} y1={158} x2={x - 7} y2={168} strokeWidth={1.2} />
            })}
          </g>
          <text x={390} y={184} textAnchor="middle" fontSize={11} fill={SUPPORT}>
            B
          </text>

          <g stroke={MUTED} strokeWidth={1}>
            <line x1={70} y1={216} x2={390} y2={216} />
            <line x1={70} y1={210} x2={70} y2={222} />
            <line x1={390} y1={210} x2={390} y2={222} />
          </g>
          <text x={230} y={206} textAnchor="middle" fontSize={10} fill={MUTED}>
            L = 6 m
          </text>
        </svg>
      </div>
    </div>
  )
}
