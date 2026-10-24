import { local } from '../../../components/solution-figures/shared'

const STEEL = '#4f6df5'
const ALUMINIUM = '#5bb98c'
const LOAD = '#ff6b45'
const MUTED = '#87929d'

export function AxialStiffnessCondition2Animation() {
  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 280"
          role="img"
          aria-label="Pręt dwuodcinkowy utwierdzony górą: stalowy odcinek o długości 1 m i polu 300 mm² oraz aluminiowy o długości 1 m i polu 500 mm², rozciągany siłą 30 kN"
        >
          <g stroke="#68727e" strokeWidth={2} strokeLinecap="round">
            <line x1={150} y1={42} x2={286} y2={42} />
            {Array.from({ length: 8 }, (_, index) => {
              const x = 158 + index * 19
              return <line key={index} x1={x} y1={42} x2={x - 8} y2={30} strokeWidth={1.5} />
            })}
          </g>

          <rect
            x={192}
            y={42}
            width={48}
            height={88}
            rx={3}
            fill={STEEL}
            fillOpacity={0.18}
            stroke={STEEL}
            strokeWidth={2}
          />
          <rect
            x={184}
            y={130}
            width={64}
            height={88}
            rx={3}
            fill={ALUMINIUM}
            fillOpacity={0.18}
            stroke={ALUMINIUM}
            strokeWidth={2}
          />

          <g stroke={MUTED} strokeWidth={1}>
            <line x1={140} y1={42} x2={140} y2={218} />
            <line x1={134} y1={42} x2={146} y2={42} />
            <line x1={134} y1={130} x2={146} y2={130} />
            <line x1={134} y1={218} x2={146} y2={218} />
          </g>
          <text x={130} y={90} textAnchor="end" fontSize={10} fill={MUTED}>
            L₁ = 1 m
          </text>
          <text x={130} y={178} textAnchor="end" fontSize={10} fill={MUTED}>
            L₂ = 1 m
          </text>

          <text x={262} y={72} fontSize={11} fontWeight={700} fill={STEEL}>
            stal
          </text>
          <text x={262} y={87} fontSize={9} fill={MUTED}>
            A₁ = 300 mm²
          </text>
          <text x={262} y={100} fontSize={9} fill={MUTED}>
            E₁ = 200 GPa
          </text>

          <text x={262} y={154} fontSize={11} fontWeight={700} fill={ALUMINIUM}>
            aluminium
          </text>
          <text x={262} y={169} fontSize={9} fill={MUTED}>
            A₂ = 500 mm²
          </text>
          <text x={262} y={182} fontSize={9} fill={MUTED}>
            E₂ = 70 GPa
          </text>

          <g stroke={LOAD} fill={LOAD}>
            <line x1={216} y1={218} x2={216} y2={258} strokeWidth={2.5} />
            <path d="M211 250 L216 258 L221 250" fill="none" strokeWidth={2.5} />
            <text x={228} y={244} fontSize={10} stroke="none">
              N = 30 kN
            </text>
          </g>
        </svg>
      </div>
    </div>
  )
}
