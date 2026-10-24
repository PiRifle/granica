import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const LOAD = '#ff6b45'
const MUTED = '#87929d'
const SUPPORT = '#68727e'

export function AxialElongation3ExampleAnimation() {
  const beamY = 140
  const xA = 64
  const xJoint = 200
  const xB = 400

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 500 280"
          role="img"
          aria-label="Poziomy pręt utwierdzony w lewej ścianie: odcinek 1 ma L1 = 300 mm, odcinek 2 ma nieznaną długość L2, oba A = 200 mm² i E = 200 GPa; w połączeniu działa Q = 30 kN w prawo, a na prawym końcu P = 10 kN w lewo"
        >
          <g stroke={SUPPORT} strokeWidth={2} strokeLinecap="round">
            <line x1={xA} y1={96} x2={xA} y2={184} />
            {Array.from({ length: 7 }, (_, index) => {
              const y = 102 + index * 13
              return <line key={index} x1={xA} y1={y} x2={xA - 13} y2={y - 11} strokeWidth={1.5} />
            })}
          </g>

          <rect
            x={xA}
            y={beamY - 9}
            width={xJoint - xA}
            height={18}
            fill={ACCENT}
            fillOpacity={0.18}
            stroke={ACCENT}
            strokeWidth={2}
          />
          <rect
            x={xJoint}
            y={beamY - 9}
            width={xB - xJoint}
            height={18}
            fill={ACCENT}
            fillOpacity={0.18}
            stroke={ACCENT}
            strokeWidth={2}
          />

          <text x={(xA + xJoint) / 2} y={beamY - 18} textAnchor="middle" fontSize={12} fill={ACCENT}>
            1
          </text>
          <text x={(xJoint + xB) / 2} y={beamY - 18} textAnchor="middle" fontSize={12} fill={ACCENT}>
            2
          </text>

          <text x={xA + 6} y={62} fontSize={10} fill={MUTED}>
            A = 200 mm², E = 200 GPa
          </text>

          <g stroke={LOAD} fill={LOAD}>
            <circle cx={xJoint} cy={beamY} r={3.5} stroke="none" />
            <line x1={xJoint} y1={beamY - 9} x2={xJoint} y2={84} strokeWidth={1.6} />
            <line x1={xJoint} y1={84} x2={xJoint + 74} y2={84} strokeWidth={2.6} />
            <path d={`M${xJoint + 64} 79 L${xJoint + 74} 84 L${xJoint + 64} 89`} fill="none" strokeWidth={2.6} />
            <text x={xJoint + 40} y={74} textAnchor="middle" fontSize={10} stroke="none">
              Q = 30 kN
            </text>
          </g>

          <g stroke={LOAD} fill={LOAD}>
            <line x1={476} y1={beamY} x2={xB + 2} y2={beamY} strokeWidth={2.6} />
            <path
              d={`M${xB + 12} ${beamY - 5} L${xB + 2} ${beamY} L${xB + 12} ${beamY + 5}`}
              fill="none"
              strokeWidth={2.6}
            />
            <text x={430} y={beamY - 12} textAnchor="middle" fontSize={10} stroke="none">
              P = 10 kN
            </text>
          </g>

          <text x={xB} y={beamY + 30} textAnchor="middle" fontSize={10} fill={MUTED}>
            swobodny koniec
          </text>

          <g stroke={MUTED} strokeWidth={1.1}>
            <line x1={xA} y1={200} x2={xJoint} y2={200} />
            <line x1={xA} y1={194} x2={xA} y2={206} />
            <line x1={xJoint} y1={194} x2={xJoint} y2={206} />
            <line x1={xJoint} y1={200} x2={xB} y2={200} />
            <line x1={xB} y1={194} x2={xB} y2={206} />
          </g>
          <text x={(xA + xJoint) / 2} y={220} textAnchor="middle" fontSize={10} fill={MUTED}>
            L₁ = 300 mm
          </text>
          <text x={(xJoint + xB) / 2} y={220} textAnchor="middle" fontSize={10} fill={MUTED}>
            L₂ = ?
          </text>
        </svg>
      </div>
    </div>
  )
}
