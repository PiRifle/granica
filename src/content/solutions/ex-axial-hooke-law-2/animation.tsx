import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const LOAD = '#ff6b45'
const MUTED = '#87929d'
const SUPPORT = '#68727e'

interface RodProps {
  x: number
  top: number
  bottom: number
  width: number
  material: string
  modulus: string
}

function Rod({ x, top, bottom, width, material, modulus }: RodProps) {
  const center = x + width / 2
  return (
    <g>
      <g stroke={SUPPORT} strokeWidth={1.5}>
        <line x1={x - 12} y1={top} x2={x + width + 12} y2={top} />
        {Array.from({ length: 6 }, (_, index) => {
          const hatchX = x - 10 + (index * (width + 20)) / 5
          return <line key={index} x1={hatchX} y1={top} x2={hatchX - 7} y2={top - 12} />
        })}
      </g>

      <rect
        x={x}
        y={top}
        width={width}
        height={bottom - top}
        rx={4}
        fill={ACCENT}
        fillOpacity={0.18}
        stroke={ACCENT}
        strokeWidth={2}
      />

      <g stroke={LOAD} fill={LOAD}>
        <line x1={center} y1={bottom + 6} x2={center} y2={bottom + 40} strokeWidth={2.4} />
        <path
          d={`M${center - 5} ${bottom + 31} L${center} ${bottom + 40} L${center + 5} ${bottom + 31}`}
          fill="none"
          strokeWidth={2.4}
        />
      </g>
      <text x={center} y={bottom + 56} textAnchor="middle" fontSize={10} fill={LOAD}>
        N = 20 kN
      </text>

      <text x={center} y={bottom + 78} textAnchor="middle" fontSize={11} fill={SUPPORT}>
        {material}
      </text>
      <text x={center} y={bottom + 94} textAnchor="middle" fontSize={10} fill={MUTED}>
        {modulus}
      </text>

      <text x={x + width + 12} y={(top + bottom) / 2 + 4} fontSize={10} fill={MUTED}>
        A = 200 mm²
      </text>
    </g>
  )
}

export function AxialHookeLawExample2Animation() {
  const top = 62
  const bottom = 196
  const width = 50

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 520 300"
          role="img"
          aria-label="Dwa pręty o długości 1,5 m i polu 200 mm², stalowy i aluminiowy, rozciągane siłą 20 kN"
        >
          <Rod x={140} top={top} bottom={bottom} width={width} material="stal" modulus="E = 200 GPa" />
          <Rod x={350} top={top} bottom={bottom} width={width} material="aluminium" modulus="E = 70 GPa" />

          <g stroke={MUTED} strokeWidth={1}>
            <line x1={84} y1={top} x2={84} y2={bottom} />
            <line x1={78} y1={top} x2={90} y2={top} />
            <line x1={78} y1={bottom} x2={90} y2={bottom} />
          </g>
          <text x={72} y={(top + bottom) / 2 + 4} textAnchor="end" fontSize={11} fill={MUTED}>
            L = 1,5 m
          </text>
        </svg>
      </div>
    </div>
  )
}
