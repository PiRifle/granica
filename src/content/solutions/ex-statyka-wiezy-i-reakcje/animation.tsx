import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const LOAD = '#ff6b45'
const REACTION = '#27835a'
const EDGE = '#68727e'
const MUTED = '#87929d'
const INK = '#17202a'

const A = { x: 80, y: 200 }
const B = { x: 360, y: 200 }
const P = { x: 290, y: 200 }
const trackFrom = { x: 308, y: 230 }
const trackTo = { x: 412, y: 170 }
const rbEnd = { x: B.x - 51.95, y: B.y - 90 }
const raEnd = { x: A.x + 51.96, y: A.y - 30 }

const clamp01 = (value: number) => Math.max(0, Math.min(1, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}

const captions = [
  'Tor podpory B nachylony pod kątem 30°',
  'Reakcja R_B prostopadła do toru, kąt 120°',
  'Moment względem A wyznacza R_B',
  'R_B = 6√3 ≈ 10,39 kN',
  'A_x = 5,20 kN w prawo, A_y = 3 kN w górę',
  'R_A = 6 kN pod kątem 30°; kontrola ΣM_B = 0',
]

export function SupportReactionsAnimation({ index, playing, sceneProgress }: SolutionAnimationProps) {
  const showRB = index >= 1
  const showMoment = index >= 2
  const showRBValue = index >= 3
  const showA = index >= 4
  const showResultant = index >= 5
  const raGrow = showResultant ? (playing ? 0.4 + 0.6 * smooth(sceneProgress) : 1) : 0
  const raTip = { x: A.x + (raEnd.x - A.x) * raGrow, y: A.y + (raEnd.y - A.y) * raGrow }
  const summary = captions[Math.min(index, captions.length - 1)]

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg viewBox="0 0 460 340" role="img" aria-label="Belka na pochyłym torze i reakcje podpór">
          <title>Reakcje belki na pochyłym torze</title>
          <desc>
            Belka 4 metry, siła 12 kN, reakcja podpory przesuwnej prostopadła do toru nachylonego pod kątem 30 stopni.
          </desc>
          <defs>
            <marker
              id="ex-wiez-load"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={LOAD} />
            </marker>
            <marker
              id="ex-wiez-react"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={REACTION} />
            </marker>
            <marker
              id="ex-wiez-arc"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={MUTED} />
            </marker>
          </defs>

          <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke={EDGE} strokeWidth="5" strokeLinecap="round" />
          <line x1={trackFrom.x} y1={trackFrom.y} x2={trackTo.x} y2={trackTo.y} stroke={EDGE} strokeWidth="2.4" />

          <g>
            <path d={`M ${A.x - 12} ${A.y + 14} L ${A.x} ${A.y} L ${A.x + 12} ${A.y + 14} Z`} fill={EDGE} />
            {Array.from({ length: 6 }, (_, i) => {
              const x = A.x - 10 + i * 4
              return <line key={i} x1={x} y1={A.y + 14} x2={x - 5} y2={A.y + 22} stroke={EDGE} strokeWidth="1.2" />
            })}
            <text x={A.x - 18} y={A.y - 6} fontSize="10" fill={EDGE}>
              A
            </text>
          </g>

          <g>
            <path d="M 355 219 L 379 205 L 360 200 Z" fill={EDGE} />
            <circle cx="355" cy="219" r="3.2" fill={EDGE} />
            <circle cx="379" cy="205" r="3.2" fill={EDGE} />
            <text x={B.x + 10} y={B.y - 12} fontSize="10" fill={EDGE}>
              B
            </text>
          </g>

          <g fill="none" stroke={MUTED} strokeWidth="1.4">
            <path
              d={`M ${B.x + 40} ${B.y} A 40 40 0 0 0 ${B.x + 40 * Math.cos((30 * Math.PI) / 180)} ${B.y - 40 * Math.sin((30 * Math.PI) / 180)}`}
            />
            <text x={B.x + 44} y={B.y - 14} fontSize="9" fill={MUTED} stroke="none">
              30°
            </text>
          </g>

          <line
            x1={P.x}
            y1="122"
            x2={P.x}
            y2={P.y - 6}
            stroke={LOAD}
            strokeWidth="2.6"
            markerEnd="url(#ex-wiez-load)"
          />
          <text x={P.x - 6} y="116" textAnchor="middle" fontSize="10" fill={LOAD}>
            P = 12 kN
          </text>

          {showRB && (
            <g>
              <line
                x1={B.x}
                y1={B.y}
                x2={rbEnd.x}
                y2={rbEnd.y}
                stroke={REACTION}
                strokeWidth="2.8"
                markerEnd="url(#ex-wiez-react)"
              />
              <line
                x1={B.x}
                y1={B.y}
                x2={rbEnd.x}
                y2={B.y}
                stroke={REACTION}
                strokeWidth="1.3"
                strokeDasharray="5 4"
                opacity="0.75"
              />
              <line
                x1={B.x}
                y1={B.y}
                x2={B.x}
                y2={rbEnd.y}
                stroke={REACTION}
                strokeWidth="1.3"
                strokeDasharray="5 4"
                opacity="0.75"
              />
              <text x={rbEnd.x - 6} y={rbEnd.y - 10} fontSize="9.5" fill={REACTION}>
                {showRBValue ? 'R_B = 10,39 kN' : 'R_B'}
              </text>
              <text x={B.x - 24} y={B.y + 16} textAnchor="end" fontSize="9" fill={REACTION}>
                R_Bx
              </text>
              <text x={B.x + 6} y={B.y - 54} fontSize="9" fill={REACTION}>
                R_By
              </text>
              <g fill="none" stroke={REACTION} strokeWidth="1.3" opacity="0.8">
                <path
                  d={`M ${B.x + 46} ${B.y} A 46 46 0 0 0 ${B.x + 46 * Math.cos((120 * Math.PI) / 180)} ${B.y - 46 * Math.sin((120 * Math.PI) / 180)}`}
                />
                <text x={B.x + 20} y={B.y - 48} fontSize="9" fill={REACTION} stroke="none">
                  120°
                </text>
              </g>
            </g>
          )}

          {showMoment && (
            <g>
              <path
                d={`M ${A.x + 28} ${A.y} A 28 28 0 0 0 ${A.x} ${A.y - 28}`}
                fill="none"
                stroke={MUTED}
                strokeWidth="1.5"
                markerEnd="url(#ex-wiez-arc)"
              />
              <text x={A.x + 34} y={A.y - 18} fontSize="9" fill={MUTED}>
                ΣM_A
              </text>
            </g>
          )}

          {showA && (
            <g>
              <line
                x1={A.x}
                y1={A.y + 28}
                x2={A.x + 52}
                y2={A.y + 28}
                stroke={REACTION}
                strokeWidth="2.4"
                markerEnd="url(#ex-wiez-react)"
              />
              <text x={A.x + 26} y={A.y + 20} textAnchor="middle" fontSize="9" fill={REACTION}>
                A_x = 5,20 kN
              </text>
              <line
                x1={A.x}
                y1={A.y + 54}
                x2={A.x}
                y2={A.y + 28}
                stroke={REACTION}
                strokeWidth="2.4"
                markerEnd="url(#ex-wiez-react)"
              />
              <text x={A.x + 6} y={A.y + 50} fontSize="9" fill={REACTION}>
                A_y = 3 kN
              </text>
            </g>
          )}

          {showResultant && (
            <g>
              <line
                x1={A.x}
                y1={A.y}
                x2={raTip.x}
                y2={raTip.y}
                stroke={REACTION}
                strokeWidth="3.2"
                markerEnd="url(#ex-wiez-react)"
              />
              <text x={raEnd.x + 6} y={raEnd.y - 8} fontSize="9.5" fill={REACTION}>
                R_A = 6 kN
              </text>
              <path
                d={`M ${A.x + 30} ${A.y} A 30 30 0 0 0 ${A.x + 30 * Math.cos((30 * Math.PI) / 180)} ${A.y - 30 * Math.sin((30 * Math.PI) / 180)}`}
                fill="none"
                stroke={REACTION}
                strokeWidth="1.3"
                opacity="0.75"
              />
              <text x={A.x + 36} y={A.y - 16} fontSize="9" fill={REACTION}>
                30°
              </text>
              <path
                d={`M ${B.x - 28} ${B.y} A 28 28 0 0 1 ${B.x} ${B.y - 28}`}
                fill="none"
                stroke={REACTION}
                strokeWidth="1.5"
              />
              <text x={B.x - 40} y={B.y - 20} fontSize="9" fill={REACTION}>
                ΣM_B = 0
              </text>
            </g>
          )}

          <g stroke={MUTED} fill={MUTED}>
            <line x1={A.x} y1="278" x2={B.x} y2="278" strokeWidth="1" />
            <line x1={A.x} y1="274" x2={A.x} y2="282" strokeWidth="1" />
            <line x1={B.x} y1="274" x2={B.x} y2="282" strokeWidth="1" />
            <text x={(A.x + B.x) / 2} y="272" textAnchor="middle" fontSize="8.5" stroke="none">
              4 m
            </text>
            <line x1={A.x} y1="302" x2={P.x} y2="302" strokeWidth="1" />
            <line x1={A.x} y1="298" x2={A.x} y2="306" strokeWidth="1" />
            <line x1={P.x} y1="298" x2={P.x} y2="306" strokeWidth="1" />
            <text x={(A.x + P.x) / 2} y="314" textAnchor="middle" fontSize="8.5" stroke="none">
              3 m
            </text>
          </g>

          <text x="230" y="332" textAnchor="middle" fontSize="12" fill={INK}>
            {summary}
          </text>
        </svg>
      </div>
    </div>
  )
}
