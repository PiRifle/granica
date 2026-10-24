import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const ACCENT_2 = '#ff8a5c'
const LOAD = '#ff6b45'
const MUTED = '#87929d'

export function AxialNormalStressExample2Animation() {
  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 280"
          role="img"
          aria-label="Dwa niezależne pręty rozciągane siłą 30 kN, o polach 300 mm² i 150 mm²"
        >
          <defs>
            <marker
              id="ans2-load"
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
            x={131}
            y={62}
            width={58}
            height={158}
            rx={4}
            fill={ACCENT}
            fillOpacity={0.18}
            stroke={ACCENT}
            strokeWidth={2}
          />
          <rect
            x={280}
            y={62}
            width={41}
            height={158}
            rx={4}
            fill={ACCENT_2}
            fillOpacity={0.18}
            stroke={ACCENT_2}
            strokeWidth={2}
          />

          <text x={160} y={84} textAnchor="middle" fontSize={12} fontWeight={700} fill={ACCENT}>
            1
          </text>
          <text x={300} y={84} textAnchor="middle" fontSize={12} fontWeight={700} fill={ACCENT_2}>
            2
          </text>

          <line x1={160} y1={62} x2={160} y2={34} stroke={LOAD} strokeWidth={2.5} markerEnd="url(#ans2-load)" />
          <line x1={160} y1={220} x2={160} y2={248} stroke={LOAD} strokeWidth={2.5} markerEnd="url(#ans2-load)" />
          <line x1={300} y1={62} x2={300} y2={34} stroke={LOAD} strokeWidth={2.5} markerEnd="url(#ans2-load)" />
          <line x1={300} y1={220} x2={300} y2={248} stroke={LOAD} strokeWidth={2.5} markerEnd="url(#ans2-load)" />

          <text x={160} y={24} textAnchor="middle" fontSize={11} fill={LOAD}>
            N = 30 kN
          </text>
          <text x={300} y={24} textAnchor="middle" fontSize={11} fill={LOAD}>
            N = 30 kN
          </text>
          <text x={160} y={268} textAnchor="middle" fontSize={10} fill={MUTED}>
            A₁ = 300 mm²
          </text>
          <text x={300} y={268} textAnchor="middle" fontSize={10} fill={MUTED}>
            A₂ = 150 mm²
          </text>
        </svg>
      </div>
    </div>
  )
}
