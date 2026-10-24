import { local } from '../../../components/solution-figures/shared'

const BEAM = '#556273'
const LOAD = '#ff6b45'
const SUPPORT = '#68727e'
const REACTION = '#2f7d5b'
const MUTED = '#87929d'

export function SupportsReactionsExample3Animation() {
  const x0 = 60
  const x1 = 400
  const beamY = 132
  const loadX = 280

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 280"
          role="img"
          aria-label="Belka swobodnie podparta o długości 4 m z siłą 20 kN w nieznanej odległości a od podpory A oraz zadaną reakcją 15 kN w podporze B"
        >
          <line x1={x0} y1={beamY} x2={x1} y2={beamY} stroke={BEAM} strokeWidth={5} strokeLinecap="round" />

          <g stroke={LOAD} fill={LOAD}>
            <line x1={loadX} y1={44} x2={loadX} y2={beamY - 7} strokeWidth={2.6} />
            <path
              d={`M${loadX - 5} ${beamY - 15} L${loadX} ${beamY - 6} L${loadX + 5} ${beamY - 15}`}
              fill="none"
              strokeWidth={2.6}
            />
            <text x={loadX} y={34} textAnchor="middle" fontSize={10} stroke="none" fill={LOAD}>
              P = 20 kN
            </text>
          </g>

          <g stroke={REACTION} fill={REACTION}>
            <line x1={x1} y1={124} x2={x1} y2={86} strokeWidth={2.4} />
            <path d={`M${x1 - 5} 94 L${x1} 85 L${x1 + 5} 94`} fill="none" strokeWidth={2.4} />
            <text x={x1} y={74} textAnchor="middle" fontSize={10} stroke="none" fill={REACTION}>
              R_B = 15 kN
            </text>
          </g>

          <g stroke={SUPPORT} fill={SUPPORT}>
            <path d="M50 150 L60 134 L70 150 Z" />
            <line x1={48} y1={150} x2={72} y2={150} strokeWidth={1.2} />
            <text x={60} y={172} textAnchor="middle" fontSize={10} stroke="none" fill={SUPPORT}>
              A
            </text>

            <path d="M390 148 L400 134 L410 148 Z" />
            <circle cx={394} cy={153} r={2.8} />
            <circle cx={406} cy={153} r={2.8} />
            <line x1={388} y1={160} x2={412} y2={160} strokeWidth={1.2} />
            <text x={400} y={174} textAnchor="middle" fontSize={10} stroke="none" fill={SUPPORT}>
              B
            </text>
          </g>

          <g stroke={MUTED} fill={MUTED}>
            <line x1={x0} y1={196} x2={loadX} y2={196} strokeWidth={1.2} />
            <line x1={x0} y1={190} x2={x0} y2={202} strokeWidth={1.2} />
            <line x1={loadX} y1={190} x2={loadX} y2={202} strokeWidth={1.2} />
            <text x={(x0 + loadX) / 2} y={190} textAnchor="middle" fontSize={10} stroke="none" fill={MUTED}>
              a = ?
            </text>

            <line x1={x0} y1={226} x2={x1} y2={226} strokeWidth={1.2} />
            <line x1={x0} y1={220} x2={x0} y2={232} strokeWidth={1.2} />
            <line x1={x1} y1={220} x2={x1} y2={232} strokeWidth={1.2} />
            <text x={(x0 + x1) / 2} y={246} textAnchor="middle" fontSize={10} stroke="none" fill={MUTED}>
              L = 4 m
            </text>
          </g>
        </svg>
      </div>
    </div>
  )
}
