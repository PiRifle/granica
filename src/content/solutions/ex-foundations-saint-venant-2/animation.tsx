import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const LOAD = '#ff6b45'
const MUTED = '#87929d'
const EDGE = '#68727e'
const PLATE = '#d9dee4'

export function SaintVenantExample2Animation() {
  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 280"
          role="img"
          aria-label="Okrągły pręt o średnicy 30 mm rozciągany siłą 50 kN przez sworzeń w uchwycie"
        >
          <defs>
            <marker
              id="sv2-dim"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={MUTED} />
            </marker>
            <marker
              id="sv2-load"
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

          <rect x={178} y={54} width={20} height={56} rx={3} fill={PLATE} stroke={EDGE} strokeWidth={1.5} />
          <rect x={262} y={54} width={20} height={56} rx={3} fill={PLATE} stroke={EDGE} strokeWidth={1.5} />

          <rect
            x={202}
            y={70}
            width={56}
            height={140}
            fill={ACCENT}
            fillOpacity={0.18}
            stroke={ACCENT}
            strokeWidth={2}
          />
          <ellipse cx={230} cy={70} rx={28} ry={7} fill={ACCENT} fillOpacity={0.18} stroke={ACCENT} strokeWidth={2} />
          <ellipse cx={230} cy={210} rx={28} ry={7} fill={ACCENT} fillOpacity={0.18} stroke={ACCENT} strokeWidth={2} />

          <line x1={170} y1={86} x2={290} y2={86} stroke={EDGE} strokeWidth={7} strokeLinecap="round" />

          <line
            x1={202}
            y1={156}
            x2={258}
            y2={156}
            stroke={MUTED}
            strokeWidth={1}
            markerStart="url(#sv2-dim)"
            markerEnd="url(#sv2-dim)"
          />
          <text x={268} y={160} fontSize={10} fill={MUTED}>
            d = 30 mm
          </text>

          <line x1={230} y1={210} x2={230} y2={252} stroke={LOAD} strokeWidth={2.4} markerEnd="url(#sv2-load)" />
          <text x={242} y={246} fontSize={10} fill={LOAD}>
            P = 50 kN
          </text>

          <line x1={286} y1={78} x2={314} y2={64} stroke={MUTED} strokeWidth={1} />
          <text x={318} y={62} fontSize={9} fill={MUTED}>
            sworzeń / uchwyt
          </text>
          <text x={150} y={150} textAnchor="end" fontSize={9} fill={MUTED}>
            pręt okrągły
          </text>
        </svg>
      </div>
    </div>
  )
}
