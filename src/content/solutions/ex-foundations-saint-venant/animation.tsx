import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const LOAD = '#ff6b45'
const MUTED = '#87929d'

export function SaintVenantExampleAnimation() {
  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 280"
          role="img"
          aria-label="Taśma stalowa o szerokości 80 mm i grubości 8 mm z otworem o średnicy 16 mm, rozciągana siłą 64 kN"
        >
          <defs>
            <marker
              id="sv1-dim"
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
              id="sv1-load"
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
            markerStart="url(#sv1-dim)"
            markerEnd="url(#sv1-dim)"
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
            markerStart="url(#sv1-dim)"
            markerEnd="url(#sv1-dim)"
          />
          <text x={402} y={142} fontSize={10} fill={MUTED}>
            b = 80 mm
          </text>

          <line x1={120} y1={138} x2={76} y2={138} stroke={LOAD} strokeWidth={2.2} markerEnd="url(#sv1-load)" />
          <line x1={330} y1={138} x2={374} y2={138} stroke={LOAD} strokeWidth={2.2} markerEnd="url(#sv1-load)" />
          <text x={96} y={158} textAnchor="middle" fontSize={10} fill={LOAD}>
            P
          </text>
          <text x={352} y={158} textAnchor="middle" fontSize={10} fill={LOAD}>
            P = 64 kN
          </text>

          <rect
            x={120}
            y={236}
            width={120}
            height={12}
            rx={2}
            fill={ACCENT}
            fillOpacity={0.18}
            stroke={ACCENT}
            strokeWidth={1.4}
          />
          <line
            x1={108}
            y1={236}
            x2={108}
            y2={248}
            stroke={MUTED}
            strokeWidth={1}
            markerStart="url(#sv1-dim)"
            markerEnd="url(#sv1-dim)"
          />
          <text x={250} y={246} fontSize={10} fill={MUTED}>
            t = 8 mm
          </text>
          <text x={180} y={226} textAnchor="middle" fontSize={9} fill={MUTED}>
            widok z boku
          </text>
        </svg>
      </div>
    </div>
  )
}
