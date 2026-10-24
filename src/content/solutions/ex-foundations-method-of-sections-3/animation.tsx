import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const LOAD = '#ff6b45'
const MUTED = '#87929d'

export function MethodOfSectionsExample3Animation() {
  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 280"
          role="img"
          aria-label="Belka swobodnie podparta o długości 5 m z siłą P w odległości 2 m, przekrojem x = 1 m i zmierzonym momentem 12 kN·m"
        >
          <rect
            x={70}
            y={124}
            width={320}
            height={14}
            rx={2}
            fill={ACCENT}
            fillOpacity={0.18}
            stroke={ACCENT}
            strokeWidth={2}
          />

          <g stroke={MUTED} strokeWidth={1.6} fill={MUTED}>
            <polygon points="70,138 56,160 84,160" fill={MUTED} fillOpacity={0.18} />
            <polygon points="390,138 376,160 404,160" fill={MUTED} fillOpacity={0.18} />
            <line x1={54} y1={160} x2={86} y2={160} />
            <line x1={374} y1={160} x2={406} y2={160} />
            <line x1={62} y1={160} x2={56} y2={168} strokeWidth={1} />
            <line x1={72} y1={160} x2={66} y2={168} strokeWidth={1} />
            <line x1={382} y1={160} x2={376} y2={168} strokeWidth={1} />
            <line x1={392} y1={160} x2={386} y2={168} strokeWidth={1} />
          </g>
          <text x={70} y={180} textAnchor="middle" fontSize={11} fill={MUTED}>
            A
          </text>
          <text x={390} y={180} textAnchor="middle" fontSize={11} fill={MUTED}>
            B
          </text>

          <g stroke={MUTED} strokeWidth={1.3} strokeDasharray="4 4">
            <line x1={134} y1={104} x2={134} y2={150} />
          </g>
          <text x={134} y={96} textAnchor="middle" fontSize={10} fill={MUTED}>
            x = 1 m
          </text>
          <text x={134} y={82} textAnchor="middle" fontSize={10} fill={ACCENT}>
            M = 12 kN·m
          </text>

          <g stroke={LOAD} fill={LOAD}>
            <line x1={198} y1={56} x2={198} y2={122} strokeWidth={2.5} />
            <path d="M193 114 L198 122 L203 114" fill="none" strokeWidth={2.5} />
            <text x={207} y={70} fontSize={11} stroke="none">
              P
            </text>
          </g>

          <g stroke={MUTED} strokeWidth={1.2}>
            <line x1={70} y1={200} x2={198} y2={200} />
            <line x1={70} y1={195} x2={70} y2={205} />
            <line x1={198} y1={195} x2={198} y2={205} />
            <line x1={70} y1={236} x2={390} y2={236} />
            <line x1={70} y1={231} x2={70} y2={241} />
            <line x1={390} y1={231} x2={390} y2={241} />
          </g>
          <text x={134} y={194} textAnchor="middle" fontSize={10} fill={MUTED}>
            a = 2 m
          </text>
          <text x={230} y={230} textAnchor="middle" fontSize={10} fill={MUTED}>
            L = 5 m
          </text>
        </svg>
      </div>
    </div>
  )
}
