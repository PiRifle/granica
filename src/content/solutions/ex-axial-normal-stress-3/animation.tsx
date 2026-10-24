import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const LOAD = '#ff6b45'
const MUTED = '#87929d'

export function AxialNormalStressExample3Animation() {
  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 280"
          role="img"
          aria-label="Pręt o przekroju kołowym rozciągany siłą 72 kN, naprężenie dopuszczalne 120 MPa"
        >
          <defs>
            <marker
              id="ans3-load"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={LOAD} />
            </marker>
          </defs>

          <rect
            x={168}
            y={54}
            width={64}
            height={172}
            rx={4}
            fill={ACCENT}
            fillOpacity={0.18}
            stroke={ACCENT}
            strokeWidth={2}
          />
          <line x1={200} y1={54} x2={200} y2={226} stroke={ACCENT} strokeWidth={1} strokeDasharray="5 5" />

          <line x1={200} y1={54} x2={200} y2={26} stroke={LOAD} strokeWidth={2.5} markerEnd="url(#ans3-load)" />
          <line x1={200} y1={226} x2={200} y2={254} stroke={LOAD} strokeWidth={2.5} markerEnd="url(#ans3-load)" />
          <text x={200} y={18} textAnchor="middle" fontSize={11} fill={LOAD}>
            N = 72 kN
          </text>
          <text x={200} y={270} textAnchor="middle" fontSize={11} fill={LOAD}>
            N = 72 kN
          </text>

          <line x1={264} y1={140} x2={310} y2={140} stroke={MUTED} strokeWidth={1} strokeDasharray="4 4" />
          <circle cx={344} cy={140} r={34} fill={ACCENT} fillOpacity={0.12} stroke={ACCENT} strokeWidth={2} />
          <text x={344} y={144} textAnchor="middle" fontSize={11} fill={ACCENT}>
            d = ?
          </text>
          <text x={344} y={196} textAnchor="middle" fontSize={10} fill={MUTED}>
            przekrój kołowy
          </text>
          <text x={344} y={212} textAnchor="middle" fontSize={10} fill={MUTED}>
            σ
            <tspan dy={3} fontSize={7}>
              dop
            </tspan>
            <tspan dy={-3}> = 120 MPa</tspan>
          </text>
        </svg>
      </div>
    </div>
  )
}
