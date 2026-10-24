import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const LOAD = '#ff6b45'
const MUTED = '#87929d'

export function SiUnitsExample3Animation() {
  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg viewBox="0 0 460 280" role="img" aria-label="Okrągły pręt o średnicy 32 mm rozciągany siłą 120 kN">
          <g stroke="#68727e" strokeWidth={2} strokeLinecap="round">
            <line x1={150} y1={46} x2={290} y2={46} />
            {Array.from({ length: 8 }, (_, index) => {
              const x = 158 + index * 19
              return <line key={index} x1={x} y1={46} x2={x - 8} y2={34} strokeWidth={1.5} />
            })}
          </g>

          <rect
            x={180}
            y={54}
            width={72}
            height={164}
            fill={ACCENT}
            fillOpacity={0.18}
            stroke={ACCENT}
            strokeWidth={2}
          />
          <ellipse cx={216} cy={54} rx={36} ry={8} fill="#e8edff" stroke={ACCENT} strokeWidth={1.5} />
          <ellipse cx={216} cy={218} rx={36} ry={8} fill="#e8edff" stroke={ACCENT} strokeWidth={1.5} />
          <text x={216} y={138} textAnchor="middle" fontSize={10} fill={ACCENT}>
            d = 32 mm
          </text>

          <g stroke={LOAD} fill={LOAD}>
            <line x1={216} y1={226} x2={216} y2={264} strokeWidth={2.5} />
            <path d="M211 256 L216 264 L221 256" fill="none" strokeWidth={2.5} />
            <text x={227} y={250} fontSize={10} stroke="none">
              P = 120 kN
            </text>
          </g>

          <circle cx={340} cy={196} r={30} fill={ACCENT} fillOpacity={0.14} stroke={ACCENT} strokeWidth={1.3} />
          <line x1={340} y1={166} x2={340} y2={226} stroke={MUTED} strokeWidth={1.2} />
          <text x={346} y={198} fontSize={8} fill={MUTED}>
            d
          </text>
        </svg>
      </div>
    </div>
  )
}
