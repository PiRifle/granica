import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const LOAD = '#ff6b45'
const MUTED = '#87929d'

export function AxialNormalStressExampleAnimation() {
  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg viewBox="0 0 460 280" role="img" aria-label="Pręt o polu przekroju 250 mm² rozciągany osiową siłą 50 kN">
          <defs>
            <marker
              id="ans1-load"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={LOAD} />
            </marker>
            <marker
              id="ans1-dim"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={MUTED} />
            </marker>
          </defs>

          <rect
            x={193}
            y={54}
            width={64}
            height={172}
            rx={4}
            fill={ACCENT}
            fillOpacity={0.18}
            stroke={ACCENT}
            strokeWidth={2}
          />
          <line x1={225} y1={54} x2={225} y2={226} stroke={ACCENT} strokeWidth={1} strokeDasharray="5 5" />

          <line x1={225} y1={54} x2={225} y2={26} stroke={LOAD} strokeWidth={2.5} markerEnd="url(#ans1-load)" />
          <line x1={225} y1={226} x2={225} y2={254} stroke={LOAD} strokeWidth={2.5} markerEnd="url(#ans1-load)" />
          <text x={225} y={18} textAnchor="middle" fontSize={11} fill={LOAD}>
            N = 50 kN
          </text>
          <text x={225} y={270} textAnchor="middle" fontSize={11} fill={LOAD}>
            N = 50 kN
          </text>

          <line
            x1={193}
            y1={140}
            x2={257}
            y2={140}
            stroke={MUTED}
            strokeWidth={1}
            markerStart="url(#ans1-dim)"
            markerEnd="url(#ans1-dim)"
          />
          <text x={266} y={144} fontSize={11} fill={MUTED}>
            A = 250 mm²
          </text>
        </svg>
      </div>
    </div>
  )
}
