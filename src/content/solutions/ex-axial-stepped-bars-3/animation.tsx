import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const COMPRESSION = '#c2415d'
const MUTED = '#87929d'

const SEGMENTS = [
  { label: '1', diameterLabel: 'd₁', forceLabel: 'N₁', force: '+45 kN', state: 'rozciąganie', color: ACCENT },
  { label: '2', diameterLabel: 'd₂', forceLabel: 'N₂', force: '+30 kN', state: 'rozciąganie', color: ACCENT },
  { label: '3', diameterLabel: 'd₃', forceLabel: 'N₃', force: '−20 kN', state: 'ściskanie', color: COMPRESSION },
]

export function AxialSteppedBars3Animation() {
  const centerY = 140
  const startX = 110
  const segmentWidth = 100

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 280"
          role="img"
          aria-label="Pręt schodkowy z trzech odcinków o przekrojach kołowych; siły osiowe N₁ = +45 kN, N₂ = +30 kN i N₃ = −20 kN; średnice do wyznaczenia"
        >
          {SEGMENTS.map((segment, index) => {
            const x = startX + index * segmentWidth
            const circleX = x + segmentWidth / 2
            return (
              <g key={segment.label}>
                <text x={circleX} y={30} textAnchor="middle" fontSize={10} fill={segment.color}>
                  {`${segment.diameterLabel} = ?`}
                </text>
                <circle
                  cx={circleX}
                  cy={58}
                  r={15}
                  fill={segment.color}
                  fillOpacity={0.14}
                  stroke={segment.color}
                  strokeWidth={1.6}
                />
                <text x={circleX} y={63} textAnchor="middle" fontSize={12} fill={segment.color}>
                  ?
                </text>

                <rect
                  x={x}
                  y={centerY - 25}
                  width={segmentWidth}
                  height={50}
                  rx={3}
                  fill={segment.color}
                  fillOpacity={index === 2 ? 0.22 : 0.16}
                  stroke={segment.color}
                  strokeWidth={2}
                />
                <text
                  x={circleX}
                  y={centerY + 5}
                  textAnchor="middle"
                  fontSize={13}
                  fontWeight={700}
                  fill={segment.color}
                >
                  {segment.label}
                </text>

                <text x={circleX} y={185} textAnchor="middle" fontSize={11} fill={segment.color}>
                  {`${segment.forceLabel} = ${segment.force}`}
                </text>
                <text x={circleX} y={202} textAnchor="middle" fontSize={9} fill={MUTED}>
                  {segment.state}
                </text>
              </g>
            )
          })}

          <text x={230} y={242} textAnchor="middle" fontSize={10} fill={MUTED}>
            Długości nie są podane; przekroje kołowe — średnice do wyznaczenia
          </text>
        </svg>
      </div>
    </div>
  )
}
