import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const LOAD = '#ff6b45'
const MUTED = '#87929d'

export function AxialStiffnessCondition3Animation() {
  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 280"
          role="img"
          aria-label="Jednorodny pręt o długości 2,5 m i polu 250 mm², utwierdzony górą i rozciągany siłą 30 kN, o szukanym module Younga"
        >
          <g stroke="#68727e" strokeWidth={2} strokeLinecap="round">
            <line x1={150} y1={42} x2={286} y2={42} />
            {Array.from({ length: 8 }, (_, index) => {
              const x = 158 + index * 19
              return <line key={index} x1={x} y1={42} x2={x - 8} y2={30} strokeWidth={1.5} />
            })}
          </g>

          <rect
            x={196}
            y={42}
            width={44}
            height={176}
            rx={4}
            fill={ACCENT}
            fillOpacity={0.18}
            stroke={ACCENT}
            strokeWidth={2}
          />

          <g stroke={MUTED} strokeWidth={1}>
            <line x1={140} y1={42} x2={140} y2={218} />
            <line x1={134} y1={42} x2={146} y2={42} />
            <line x1={134} y1={218} x2={146} y2={218} />
          </g>
          <text x={130} y={134} textAnchor="end" fontSize={10} fill={MUTED}>
            L = 2,5 m
          </text>

          <line x1={196} y1={120} x2={240} y2={120} stroke={ACCENT} strokeWidth={1.4} />
          <text x={250} y={118} fontSize={10} fill={ACCENT}>
            A = 250 mm²
          </text>
          <text x={250} y={132} fontSize={9} fill={MUTED}>
            E = ?
          </text>

          <g stroke={LOAD} fill={LOAD}>
            <line x1={218} y1={218} x2={218} y2={258} strokeWidth={2.5} />
            <path d="M213 250 L218 258 L223 250" fill="none" strokeWidth={2.5} />
            <text x={230} y={244} fontSize={10} stroke="none">
              N = 30 kN
            </text>
          </g>
        </svg>
      </div>
    </div>
  )
}
