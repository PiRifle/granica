import { local } from '../../../components/solution-figures/shared'

const BEAM = '#556273'
const LOAD = '#ff6b45'
const SUPPORT = '#68727e'
const MUTED = '#87929d'

export function Ideal3Animation() {
  const beamY = 150
  const xA = 70
  const xB = 400
  const loadHeight = 82

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 280"
          role="img"
          aria-label="Belka swobodnie podparta o długości L = 6 m z obciążeniem trójkątnym o nieznanym maksimum q₀"
        >
          <g stroke={LOAD} fill={LOAD}>
            <line x1={xA} y1={beamY - 10} x2={xB} y2={beamY - 10 - loadHeight} strokeWidth={2} />
            {Array.from({ length: 11 }, (_, index) => {
              const ratio = index / 10
              const x = xA + ratio * (xB - xA)
              const height = 10 + ratio * loadHeight
              return (
                <g key={index}>
                  <line x1={x} y1={beamY - height} x2={x} y2={beamY - 8} strokeWidth={1.4} />
                  <path
                    d={`M${x - 4} ${beamY - 16} L${x} ${beamY - 8} L${x + 4} ${beamY - 16}`}
                    fill="none"
                    strokeWidth={1.4}
                  />
                </g>
              )
            })}
            <text x={xB} y={beamY - loadHeight - 20} textAnchor="middle" fontSize={11} stroke="none">
              q₀ = ?
            </text>
          </g>

          <line x1={xA} y1={beamY} x2={xB} y2={beamY} stroke={BEAM} strokeWidth={5} strokeLinecap="round" />

          <g fill={SUPPORT}>
            <path d={`M${xA - 11} ${beamY + 19} L${xA} ${beamY + 2} L${xA + 11} ${beamY + 19} Z`} />
            <line x1={xA - 18} y1={beamY + 20} x2={xA + 18} y2={beamY + 20} stroke={SUPPORT} strokeWidth={2} />
            <path d={`M${xB - 11} ${beamY + 19} L${xB} ${beamY + 2} L${xB + 11} ${beamY + 19} Z`} />
            <circle cx={xB - 6} cy={beamY + 24} r={3} />
            <circle cx={xB + 6} cy={beamY + 24} r={3} />
            <line x1={xB - 18} y1={beamY + 29} x2={xB + 18} y2={beamY + 29} stroke={SUPPORT} strokeWidth={2} />
          </g>
          <text x={xA} y={beamY + 45} textAnchor="middle" fontSize={11} fill={SUPPORT}>
            A
          </text>
          <text x={xB} y={beamY + 45} textAnchor="middle" fontSize={11} fill={SUPPORT}>
            B
          </text>

          <g stroke={MUTED} strokeWidth={1}>
            <line x1={xA} y1={232} x2={xB} y2={232} />
            <line x1={xA} y1={226} x2={xA} y2={238} />
            <line x1={xB} y1={226} x2={xB} y2={238} />
          </g>
          <text x={(xA + xB) / 2} y={252} textAnchor="middle" fontSize={11} fill={MUTED}>
            L = 6 m
          </text>
        </svg>
      </div>
    </div>
  )
}
