import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const LOAD = '#ff6b45'
const SUPPORT = '#68727e'

export function EquilibriumExample3Animation() {
  const beamY = 160
  const xA = 60
  const xB = 420
  const xP = 195

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 500 300"
          role="img"
          aria-label="Belka swobodnie podparta L = 4 m z siłą P = 8 kN w odległości 1,5 m i nieznanym obciążeniem q"
        >
          <g stroke={LOAD} fill={LOAD}>
            <line x1={xA} y1={108} x2={xB} y2={108} strokeWidth={2} />
            {Array.from({ length: 9 }, (_, index) => {
              const x = xA + (index * (xB - xA)) / 8
              return (
                <g key={index}>
                  <line x1={x} y1={108} x2={x} y2={beamY - 8} strokeWidth={1.4} />
                  <path
                    d={`M${x - 3} ${beamY - 16} L${x} ${beamY - 8} L${x + 3} ${beamY - 16}`}
                    fill="none"
                    strokeWidth={1.4}
                  />
                </g>
              )
            })}
            <text x={130} y={94} textAnchor="middle" fontSize={11} stroke="none">
              q = ?
            </text>

            <line x1={xP} y1={58} x2={xP} y2={beamY - 8} strokeWidth={2.8} />
            <path
              d={`M${xP - 5} ${beamY - 16} L${xP} ${beamY - 7} L${xP + 5} ${beamY - 16}`}
              fill="none"
              strokeWidth={2.8}
            />
            <text x={xP} y={46} textAnchor="middle" fontSize={11} stroke="none">
              P = 8 kN
            </text>
          </g>

          <line x1={xA} y1={beamY} x2={xB} y2={beamY} stroke="#556273" strokeWidth={6} strokeLinecap="round" />

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

          <g stroke={ACCENT} fill={ACCENT}>
            <line x1={xA} y1={218} x2={xP} y2={218} strokeWidth={1.4} />
            <line x1={xA} y1={212} x2={xA} y2={224} strokeWidth={1.4} />
            <line x1={xP} y1={212} x2={xP} y2={224} strokeWidth={1.4} />
            <text x={(xA + xP) / 2} y={236} textAnchor="middle" fontSize={11} stroke="none">
              a = 1,5 m
            </text>

            <line x1={xA} y1={258} x2={xB} y2={258} strokeWidth={1.4} />
            <line x1={xA} y1={252} x2={xA} y2={264} strokeWidth={1.4} />
            <line x1={xB} y1={252} x2={xB} y2={264} strokeWidth={1.4} />
            <text x={(xA + xB) / 2} y={278} textAnchor="middle" fontSize={11} stroke="none">
              L = 4,0 m
            </text>
          </g>
        </svg>
      </div>
    </div>
  )
}
