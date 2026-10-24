import { local } from '../../../components/solution-figures/shared'

const BEAM = '#556273'
const LOAD = '#ff6b45'
const DISTRIBUTED = '#ff8a5c'
const SUPPORT = '#68727e'
const MUTED = '#87929d'

export function SupportsReactionsExampleAnimation() {
  const x0 = 60
  const x1 = 410
  const beamY = 132
  const loadX = 200
  const distributedTop = 82
  const arrowCount = 12
  const arrows = Array.from({ length: arrowCount }, (_, index) => x0 + (index * (x1 - x0)) / (arrowCount - 1))

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 280"
          role="img"
          aria-label="Belka swobodnie podparta o długości 5 m z obciążeniem równomiernym 4 kN/m i siłą 30 kN w odległości 2 m od podpory A"
        >
          <line x1={x0} y1={beamY} x2={x1} y2={beamY} stroke={BEAM} strokeWidth={5} strokeLinecap="round" />

          <g stroke={DISTRIBUTED} fill={DISTRIBUTED}>
            <line x1={x0} y1={distributedTop} x2={x1} y2={distributedTop} strokeWidth={2} />
            {arrows.map((x, index) => (
              <g key={index}>
                <line x1={x} y1={distributedTop} x2={x} y2={beamY - 6} strokeWidth={1.4} />
                <path
                  d={`M${x - 3} ${beamY - 12} L${x} ${beamY - 5} L${x + 3} ${beamY - 12}`}
                  fill="none"
                  strokeWidth={1.4}
                />
              </g>
            ))}
            <text x={300} y={70} textAnchor="middle" fontSize={10} stroke="none" fill={DISTRIBUTED}>
              q = 4 kN/m
            </text>
          </g>

          <g stroke={LOAD} fill={LOAD}>
            <line x1={loadX} y1={42} x2={loadX} y2={beamY - 7} strokeWidth={2.6} />
            <path
              d={`M${loadX - 5} ${beamY - 15} L${loadX} ${beamY - 6} L${loadX + 5} ${beamY - 15}`}
              fill="none"
              strokeWidth={2.6}
            />
            <text x={loadX} y={32} textAnchor="middle" fontSize={10} stroke="none" fill={LOAD}>
              P = 30 kN
            </text>
          </g>

          <g stroke={SUPPORT} fill={SUPPORT}>
            <path d="M50 150 L60 134 L70 150 Z" />
            <line x1={48} y1={150} x2={72} y2={150} strokeWidth={1.2} />
            <text x={60} y={172} textAnchor="middle" fontSize={10} stroke="none" fill={SUPPORT}>
              A
            </text>

            <path d="M400 148 L410 134 L420 148 Z" />
            <circle cx={404} cy={153} r={2.8} />
            <circle cx={416} cy={153} r={2.8} />
            <line x1={398} y1={160} x2={422} y2={160} strokeWidth={1.2} />
            <text x={410} y={174} textAnchor="middle" fontSize={10} stroke="none" fill={SUPPORT}>
              B
            </text>
          </g>

          <g stroke={MUTED} fill={MUTED}>
            <line x1={x0} y1={194} x2={loadX} y2={194} strokeWidth={1.2} />
            <line x1={x0} y1={188} x2={x0} y2={200} strokeWidth={1.2} />
            <line x1={loadX} y1={188} x2={loadX} y2={200} strokeWidth={1.2} />
            <text x={(x0 + loadX) / 2} y={188} textAnchor="middle" fontSize={10} stroke="none" fill={MUTED}>
              a = 2 m
            </text>

            <line x1={x0} y1={224} x2={x1} y2={224} strokeWidth={1.2} />
            <line x1={x0} y1={218} x2={x0} y2={230} strokeWidth={1.2} />
            <line x1={x1} y1={218} x2={x1} y2={230} strokeWidth={1.2} />
            <text x={(x0 + x1) / 2} y={246} textAnchor="middle" fontSize={10} stroke="none" fill={MUTED}>
              L = 5 m
            </text>
          </g>
        </svg>
      </div>
    </div>
  )
}
