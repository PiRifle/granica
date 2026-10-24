import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const ACCENT_2 = '#5bb98c'
const LOAD = '#ff6b45'
const MUTED = '#87929d'

export function MethodOfSectionsExample2Animation() {
  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 280"
          role="img"
          aria-label="Pionowy pręt utwierdzony u góry, odcinek AB o długości 1,2 m i polu 300 mm², odcinek BC o długości 0,8 m i polu 200 mm², siły 15 kN w B i 10 kN w C"
        >
          <g stroke="#68727e" strokeWidth={2} strokeLinecap="round">
            <line x1={176} y1={42} x2={254} y2={42} />
            {Array.from({ length: 8 }, (_, index) => {
              const x = 184 + index * 10
              return <line key={index} x1={x} y1={42} x2={x - 8} y2={30} strokeWidth={1.3} />
            })}
          </g>
          <text x={215} y={22} textAnchor="middle" fontSize={10} fill={MUTED}>
            A — utwierdzenie
          </text>

          <rect
            x={189}
            y={48}
            width={52}
            height={104}
            fill={ACCENT}
            fillOpacity={0.18}
            stroke={ACCENT}
            strokeWidth={2}
          />
          <rect
            x={196}
            y={152}
            width={38}
            height={68}
            fill={ACCENT_2}
            fillOpacity={0.18}
            stroke={ACCENT_2}
            strokeWidth={2}
          />

          <text x={215} y={112} textAnchor="middle" fontSize={12} fill={ACCENT}>
            AB
          </text>
          <text x={215} y={196} textAnchor="middle" fontSize={12} fill={ACCENT_2}>
            BC
          </text>
          <text x={244} y={148} fontSize={9} fill={MUTED}>
            B
          </text>
          <text x={238} y={238} fontSize={9} fill={MUTED}>
            C
          </text>

          <g stroke={MUTED} strokeWidth={1.2} strokeDasharray="4 3">
            <line x1={241} y1={100} x2={286} y2={100} />
            <line x1={234} y1={186} x2={286} y2={186} />
          </g>
          <g fontSize={10} fill={MUTED}>
            <text x={292} y={84}>
              AB
            </text>
            <text x={292} y={98}>
              L = 1,2 m
            </text>
            <text x={292} y={112}>
              A = 300 mm²
            </text>
            <text x={292} y={170}>
              BC
            </text>
            <text x={292} y={184}>
              L = 0,8 m
            </text>
            <text x={292} y={198}>
              A = 200 mm²
            </text>
          </g>

          <g stroke={LOAD} fill={LOAD}>
            <line x1={189} y1={152} x2={132} y2={152} strokeWidth={1.4} />
            <line x1={132} y1={152} x2={132} y2={194} strokeWidth={2.5} />
            <path d="M127 186 L132 194 L137 186" fill="none" strokeWidth={2.5} />
            <text x={124} y={180} textAnchor="end" fontSize={11} stroke="none">
              15 kN
            </text>

            <line x1={196} y1={220} x2={132} y2={220} strokeWidth={1.4} />
            <line x1={132} y1={220} x2={132} y2={262} strokeWidth={2.5} />
            <path d="M127 254 L132 262 L137 254" fill="none" strokeWidth={2.5} />
            <text x={124} y={250} textAnchor="end" fontSize={11} stroke="none">
              10 kN
            </text>
          </g>
        </svg>
      </div>
    </div>
  )
}
