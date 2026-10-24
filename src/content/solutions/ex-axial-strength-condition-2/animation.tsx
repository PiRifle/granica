import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const SECOND = '#ff8a5c'

export function AxialStrengthCondition2Animation() {
  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 280"
          role="img"
          aria-label="Pręt schodkowy z dwóch odcinków: N1 60 kN, A1 400 mm² oraz N2 45 kN, A2 250 mm²"
        >
          <g stroke="#68727e" strokeWidth={2} strokeLinecap="round">
            <line x1={105} y1={38} x2={285} y2={38} />
            {Array.from({ length: 10 }, (_, index) => {
              const x = 113 + index * 18
              return <line key={index} x1={x} y1={38} x2={x - 8} y2={26} strokeWidth={1.5} />
            })}
          </g>

          <rect
            x={140}
            y={38}
            width={86}
            height={88}
            rx={4}
            fill={ACCENT}
            fillOpacity={0.18}
            stroke={ACCENT}
            strokeWidth={2}
          />
          <rect
            x={152}
            y={126}
            width={62}
            height={100}
            rx={4}
            fill={SECOND}
            fillOpacity={0.18}
            stroke={SECOND}
            strokeWidth={2}
          />

          <text x={132} y={76} textAnchor="end" fontSize={11} fontWeight={700} fill={ACCENT}>
            1
          </text>
          <text x={132} y={91} textAnchor="end" fontSize={9} fill="#68727e">
            A₁ = 400 mm²
          </text>
          <text x={236} y={76} fontSize={9} fill="#68727e">
            N₁ = 60 kN
          </text>

          <text x={144} y={168} textAnchor="end" fontSize={11} fontWeight={700} fill={SECOND}>
            2
          </text>
          <text x={144} y={183} textAnchor="end" fontSize={9} fill="#68727e">
            A₂ = 250 mm²
          </text>
          <text x={224} y={168} fontSize={9} fill="#68727e">
            N₂ = 45 kN
          </text>

          <text x={230} y={256} textAnchor="middle" fontSize={10} fill="#68727e">
            Re = 235 MPa · n = 1,5
          </text>
        </svg>
      </div>
    </div>
  )
}
