import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const MUTED = '#87929d'

export function SaintVenantExample3Animation() {
  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 280"
          role="img"
          aria-label="Taśma stalowa o szerokości 80 mm i grubości 6 mm z otworem o średnicy 16 mm, Kt około 3, naprężenie maksymalne 360 MPa"
        >
          <defs>
            <marker
              id="sv3-dim"
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

          <text x={225} y={52} textAnchor="middle" fontSize={10} fill={MUTED}>
            K_t ≈ 3
          </text>
          <text x={225} y={68} textAnchor="middle" fontSize={10} fill={MUTED}>
            σ_max = 360 MPa
          </text>
          <line x1={225} y1={74} x2={225} y2={86} stroke={MUTED} strokeWidth={1} />

          <rect
            x={120}
            y={88}
            width={210}
            height={100}
            rx={4}
            fill={ACCENT}
            fillOpacity={0.18}
            stroke={ACCENT}
            strokeWidth={2}
          />
          <circle cx={225} cy={138} r={10} fill="#fff" stroke={ACCENT} strokeWidth={2} />
          <line
            x1={213}
            y1={138}
            x2={237}
            y2={138}
            stroke={MUTED}
            strokeWidth={1.4}
            markerStart="url(#sv3-dim)"
            markerEnd="url(#sv3-dim)"
          />
          <text x={225} y={120} textAnchor="middle" fontSize={9} fill={MUTED}>
            d = 16 mm
          </text>

          <line x1={334} y1={88} x2={394} y2={88} stroke={MUTED} strokeWidth={1} />
          <line x1={334} y1={188} x2={394} y2={188} stroke={MUTED} strokeWidth={1} />
          <line
            x1={390}
            y1={88}
            x2={390}
            y2={188}
            stroke={MUTED}
            strokeWidth={1}
            markerStart="url(#sv3-dim)"
            markerEnd="url(#sv3-dim)"
          />
          <text x={402} y={142} fontSize={10} fill={MUTED}>
            b = 80 mm
          </text>

          <rect
            x={120}
            y={238}
            width={120}
            height={9}
            rx={2}
            fill={ACCENT}
            fillOpacity={0.18}
            stroke={ACCENT}
            strokeWidth={1.4}
          />
          <line
            x1={108}
            y1={238}
            x2={108}
            y2={247}
            stroke={MUTED}
            strokeWidth={1}
            markerStart="url(#sv3-dim)"
            markerEnd="url(#sv3-dim)"
          />
          <text x={250} y={246} fontSize={10} fill={MUTED}>
            t = 6 mm
          </text>
          <text x={180} y={226} textAnchor="middle" fontSize={9} fill={MUTED}>
            widok z boku
          </text>
        </svg>
      </div>
    </div>
  )
}
