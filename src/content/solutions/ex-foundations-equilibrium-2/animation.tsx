import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const LOAD = '#ff6b45'
const SUPPORT = '#68727e'

export function EquilibriumExample2Animation() {
  const beamY = 140
  const xA = 55
  const xB = 430

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 500 280"
          role="img"
          aria-label="Wspornik L = 2,4 m utwierdzony w A, z siłą na końcu B o składowych Fx = 6 kN i Fy = 8 kN"
        >
          <g stroke={SUPPORT} strokeWidth={2} strokeLinecap="round">
            <line x1={xA} y1={95} x2={xA} y2={185} />
            {Array.from({ length: 7 }, (_, index) => {
              const y = 100 + index * 14
              return <line key={index} x1={xA} y1={y} x2={xA - 13} y2={y - 12} strokeWidth={1.5} />
            })}
          </g>

          <line x1={xA} y1={beamY} x2={xB} y2={beamY} stroke="#556273" strokeWidth={6} strokeLinecap="round" />

          <g stroke={LOAD} fill={LOAD}>
            <line x1={xB} y1={beamY} x2={478} y2={beamY} strokeWidth={2.6} />
            <path d={`M468 ${beamY - 5} L478 ${beamY} L468 ${beamY + 5}`} fill="none" strokeWidth={2.6} />
            <text x={454} y={beamY - 12} textAnchor="middle" fontSize={11} stroke="none">
              F_x = 6 kN
            </text>

            <line x1={xB} y1={beamY} x2={xB} y2={204} strokeWidth={2.6} />
            <path d={`M${xB - 5} 194 L${xB} 204 L${xB + 5} 194`} fill="none" strokeWidth={2.6} />
            <text x={xB + 12} y={190} fontSize={11} stroke="none">
              F_y = 8 kN
            </text>
          </g>

          <text x={xA + 16} y={beamY + 36} textAnchor="middle" fontSize={11} fill={SUPPORT}>
            A
          </text>
          <text x={xB - 12} y={beamY + 22} textAnchor="middle" fontSize={11} fill={SUPPORT}>
            B
          </text>

          <g stroke={ACCENT} fill={ACCENT}>
            <line x1={xA} y1={232} x2={xB} y2={232} strokeWidth={1.4} />
            <line x1={xA} y1={226} x2={xA} y2={238} strokeWidth={1.4} />
            <line x1={xB} y1={226} x2={xB} y2={238} strokeWidth={1.4} />
            <text x={(xA + xB) / 2} y={252} textAnchor="middle" fontSize={11} stroke="none">
              L = 2,4 m
            </text>
          </g>
        </svg>
      </div>
    </div>
  )
}
