import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const ACCENT_DARK = '#3f5fe0'
const LOAD = '#ff6b45'
const MUTED = '#87929d'

export function SiUnitsExample2Animation() {
  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 280"
          role="img"
          aria-label="Taśma stalowa 250 na 12 mm o długości 2,5 m rozciągana siłą 150 kN"
        >
          <g stroke="#68727e" strokeWidth={2} strokeLinecap="round">
            <line x1={150} y1={42} x2={290} y2={42} />
            {Array.from({ length: 8 }, (_, index) => {
              const x = 158 + index * 19
              return <line key={index} x1={x} y1={42} x2={x - 8} y2={30} strokeWidth={1.5} />
            })}
          </g>

          <line x1={146} y1={42} x2={146} y2={218} stroke={MUTED} strokeWidth={1} strokeDasharray="4 4" />
          <text x={138} y={134} textAnchor="end" fontSize={10} fill={MUTED}>
            L = 2500 mm
          </text>

          <polygon
            points="160,42 178,26 288,26 270,42"
            fill="#7d92f7"
            stroke={ACCENT}
            strokeWidth={1.2}
            opacity={0.55}
          />
          <polygon
            points="270,42 288,26 288,202 270,218"
            fill={ACCENT_DARK}
            stroke={ACCENT_DARK}
            strokeWidth={1.2}
            opacity={0.45}
          />
          <rect
            x={160}
            y={42}
            width={110}
            height={176}
            fill={ACCENT}
            fillOpacity={0.18}
            stroke={ACCENT}
            strokeWidth={2}
          />
          <line x1={160} y1={218} x2={270} y2={218} stroke={ACCENT_DARK} strokeWidth={1.2} />

          <text x={224} y={18} textAnchor="middle" fontSize={10} fill={MUTED}>
            b = 250 mm
          </text>
          <text x={296} y={34} fontSize={9} fill={MUTED}>
            t = 12 mm
          </text>

          <g stroke={LOAD} fill={LOAD}>
            <line x1={215} y1={218} x2={215} y2={258} strokeWidth={2.5} />
            <path d="M210 250 L215 258 L220 250" fill="none" strokeWidth={2.5} />
            <text x={226} y={244} fontSize={10} stroke="none">
              P = 150 kN
            </text>
          </g>

          <rect
            x={330}
            y={198}
            width={100}
            height={8}
            fill={ACCENT}
            fillOpacity={0.2}
            stroke={ACCENT}
            strokeWidth={1.2}
          />
          <text x={330} y={192} fontSize={9} fill={MUTED}>
            przekrój 250 × 12
          </text>
        </svg>
      </div>
    </div>
  )
}
