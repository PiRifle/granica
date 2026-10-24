import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const LOAD = '#ff6b45'

export function SiUnitsExampleAnimation() {
  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg viewBox="0 0 460 280" role="img" aria-label="Pręt o polu przekroju 480 mm² rozciągany siłą 96 kN">
          <g stroke="#68727e" strokeWidth={2} strokeLinecap="round">
            <line x1={128} y1={42} x2={292} y2={42} />
            {Array.from({ length: 9 }, (_, index) => {
              const x = 136 + index * 20
              return <line key={index} x1={x} y1={42} x2={x - 8} y2={30} strokeWidth={1.5} />
            })}
          </g>

          <rect
            x={185}
            y={42}
            width={60}
            height={186}
            rx={4}
            fill={ACCENT}
            fillOpacity={0.18}
            stroke={ACCENT}
            strokeWidth={2}
          />

          <line x1={185} y1={140} x2={245} y2={140} stroke={ACCENT} strokeWidth={1.4} />
          <text x={254} y={144} fontSize={10} fill={ACCENT}>
            A = 480 mm²
          </text>

          <g stroke={LOAD} fill={LOAD}>
            <line x1={215} y1={228} x2={215} y2={266} strokeWidth={2.5} />
            <path d="M210 258 L215 266 L220 258" fill="none" strokeWidth={2.5} />
            <text x={226} y={252} fontSize={10} stroke="none">
              P = 96 kN
            </text>
          </g>
        </svg>
      </div>
    </div>
  )
}
