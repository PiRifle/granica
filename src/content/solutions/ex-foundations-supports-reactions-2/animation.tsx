import { local } from '../../../components/solution-figures/shared'

const BEAM = '#556273'
const LOAD = '#ff6b45'
const DISTRIBUTED = '#ff8a5c'
const SUPPORT = '#68727e'
const MUTED = '#87929d'

export function SupportsReactionsExample2Animation() {
  const x0 = 90
  const x1 = 390
  const beamY = 130
  const distributedTop = 82
  const arrowCount = 10
  const arrows = Array.from({ length: arrowCount }, (_, index) => x0 + (index * (x1 - x0)) / (arrowCount - 1))

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 280"
          role="img"
          aria-label="Wspornik utwierdzony w punkcie A o długości 2,5 m z obciążeniem równomiernym 3 kN/m i siłą 8 kN na swobodnym końcu"
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
            <text x={250} y={70} textAnchor="middle" fontSize={10} stroke="none" fill={DISTRIBUTED}>
              q = 3 kN/m
            </text>
          </g>

          <g stroke={LOAD} fill={LOAD}>
            <line x1={x1} y1={46} x2={x1} y2={beamY - 7} strokeWidth={2.6} />
            <path
              d={`M${x1 - 5} ${beamY - 15} L${x1} ${beamY - 6} L${x1 + 5} ${beamY - 15}`}
              fill="none"
              strokeWidth={2.6}
            />
            <text x={x1} y={36} textAnchor="middle" fontSize={10} stroke="none" fill={LOAD}>
              P = 8 kN
            </text>
          </g>

          <g stroke={SUPPORT} fill={SUPPORT}>
            <line x1={x0} y1={88} x2={x0} y2={172} strokeWidth={3.5} strokeLinecap="round" />
            {Array.from({ length: 8 }, (_, index) => {
              const y = 96 + index * 11
              return <line key={index} x1={x0} y1={y} x2={x0 - 12} y2={y - 10} strokeWidth={1.4} />
            })}
            <text x={x0 - 18} y={192} textAnchor="middle" fontSize={10} stroke="none" fill={SUPPORT}>
              A
            </text>
          </g>

          <g stroke={MUTED} fill={MUTED}>
            <line x1={x0} y1={220} x2={x1} y2={220} strokeWidth={1.2} />
            <line x1={x0} y1={214} x2={x0} y2={226} strokeWidth={1.2} />
            <line x1={x1} y1={214} x2={x1} y2={226} strokeWidth={1.2} />
            <text x={(x0 + x1) / 2} y={240} textAnchor="middle" fontSize={10} stroke="none" fill={MUTED}>
              L = 2,5 m
            </text>
          </g>
        </svg>
      </div>
    </div>
  )
}
