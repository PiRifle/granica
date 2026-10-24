import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const LOAD = '#ff6b45'
const MUTED = '#87929d'

export function AxialHookeLawExample1Animation() {
  const x = 195
  const width = 56
  const top = 62
  const bottom = 212
  const center = x + width / 2

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 280"
          role="img"
          aria-label="Pręt stalowy o długości 2 m, module Younga 200 GPa i naprężeniu rozciągającym 150 MPa"
        >
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
            {[0, 1, 2].map((index) => {
              const arrowX = x + 13 + index * 15
              return (
                <g key={index}>
                  <line x1={arrowX} y1={top - 8} x2={arrowX} y2={top - 34} strokeWidth={2} />
                  <path
                    d={`M${arrowX - 4} ${top - 26} L${arrowX} ${top - 34} L${arrowX + 4} ${top - 26}`}
                    fill="none"
                    strokeWidth={2}
                  />
                  <line x1={arrowX} y1={bottom + 8} x2={arrowX} y2={bottom + 34} strokeWidth={2} />
                  <path
                    d={`M${arrowX - 4} ${bottom + 26} L${arrowX} ${bottom + 34} L${arrowX + 4} ${bottom + 26}`}
                    fill="none"
                    strokeWidth={2}
                  />
                </g>
              )
            })}
          </g>
          <text x={center} y={top - 48} textAnchor="middle" fontSize={11} fill={LOAD}>
            σ = 150 MPa
          </text>

          <g stroke={MUTED} strokeWidth={1}>
            <line x1={330} y1={top} x2={330} y2={bottom} />
            <line x1={324} y1={top} x2={336} y2={top} />
            <line x1={324} y1={bottom} x2={336} y2={bottom} />
          </g>
          <text x={342} y={center + 4} fontSize={11} fill={MUTED}>
            L = 2 m
          </text>

          <text x={170} y={center + 4} textAnchor="end" fontSize={11} fill={MUTED}>
            E = 200 GPa
          </text>
        </svg>
      </div>
    </div>
  )
}
