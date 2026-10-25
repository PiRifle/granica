import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const NORMAL = '#2f7d5b'
const TENSION = '#ff8a5c'
const WEIGHT = '#ff6b45'
const EDGE = '#68727e'
const MUTED = '#87929d'
const INK = '#17202a'
const LIGHT = '#e8eef8'

const C = { x: 190, y: 198 }
const R = 38
const N_END = { x: C.x - 52, y: C.y - 90.1 }
const N_X = { x: C.x - 52, y: C.y }
const N_Y = { x: C.x, y: C.y - 90.1 }
const T_START = { x: C.x + R, y: C.y }
const T_END = { x: 322, y: C.y }
const G_START = { x: C.x, y: C.y + R }
const G_END = { x: C.x, y: 328 }
const ANCHOR = { x: 350, y: C.y }

export function RopeContactAnimation({ index, playing, sceneProgress }: SolutionAnimationProps) {
  const grow = playing ? Math.min(1, 0.2 + sceneProgress * 1.6) : 1
  const mainOpacity = index === 5 ? 0.18 : 1
  const showReactions = index >= 1
  const showVertical = index >= 2
  const showHorizontal = index >= 3
  const showResult = index >= 4
  const showTriangle = index === 5
  const nLength = showReactions ? (index >= 2 ? 1 : grow) : 0
  const tLength = showReactions ? 1 : 0

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg viewBox="0 0 460 360" role="img" aria-label="Walec na równi utrzymywany poziomą linką">
          <title>Walec na gładkiej równi z poziomą linką</title>
          <desc>Reakcja normalna równi, napięcie poziomej linki, ciężar walca, składowe i trójkąt sił.</desc>
          <defs>
            <marker id="ex-ck-n" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0 0L10 5L0 10Z" fill={NORMAL} />
            </marker>
            <marker id="ex-ck-t" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0 0L10 5L0 10Z" fill={TENSION} />
            </marker>
            <marker id="ex-ck-g" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0 0L10 5L0 10Z" fill={WEIGHT} />
            </marker>
          </defs>

          <g opacity={mainOpacity}>
            <path d="M 38 332 L 442 108 L 442 342 L 38 342 Z" fill="#f4f6f9" stroke="none" />
            <line x1="38" y1="332" x2="442" y2="108" stroke={EDGE} strokeWidth="3" />
            <text x="230" y="330" fontSize="11" fill={MUTED}>
              α = 30°
            </text>
            <path d="M 98 311 A 34 34 0 0 1 126 298" fill="none" stroke={MUTED} strokeWidth="1.3" />

            <line x1={ANCHOR.x} y1={ANCHOR.y} x2={ANCHOR.x} y2="154" stroke={EDGE} strokeWidth="4" />
            <circle cx={ANCHOR.x} cy={ANCHOR.y} r="5" fill={EDGE} />
            <line x1={C.x} y1={C.y} x2={ANCHOR.x} y2={ANCHOR.y} stroke={EDGE} strokeWidth="2" />
            <text x={ANCHOR.x + 6} y={ANCHOR.y + 16} fontSize="10" fill={MUTED}>
              mocowanie
            </text>

            <circle cx={C.x} cy={C.y} r={R} fill={LIGHT} stroke="#4f6df5" strokeWidth="2.5" />
            <circle cx={C.x} cy={C.y} r="3" fill={INK} />
            <text x={C.x + 46} y={C.y - 6} fontSize="12" fill={INK}>
              G = 200 N
            </text>

            {showReactions && (
              <motion.line
                x1={C.x}
                y1={C.y}
                x2={C.x + (N_END.x - C.x) * nLength}
                y2={C.y + (N_END.y - C.y) * nLength}
                stroke={NORMAL}
                strokeWidth="3.6"
                markerEnd="url(#ex-ck-n)"
                initial={false}
                animate={{ opacity: showReactions ? 1 : 0 }}
              />
            )}
            {showReactions && (
              <text x={N_END.x - 6} y={N_END.y - 8} textAnchor="end" fontSize="12" fill={NORMAL}>
                N = 230,9 N
              </text>
            )}

            {showReactions && (
              <motion.line
                x1={T_START.x}
                y1={T_START.y}
                x2={T_START.x + (T_END.x - T_START.x) * tLength}
                y2={T_END.y}
                stroke={TENSION}
                strokeWidth="3.6"
                markerEnd="url(#ex-ck-t)"
                initial={false}
                animate={{ opacity: showReactions ? 1 : 0 }}
              />
            )}
            {showHorizontal && (
              <text x={T_END.x - 4} y={T_END.y - 10} textAnchor="end" fontSize="11" fill={TENSION}>
                T = 115,5 N
              </text>
            )}

            <motion.line
              x1={G_START.x}
              y1={G_START.y}
              x2={G_END.x}
              y2={G_START.y + (G_END.y - G_START.y) * (index === 0 ? grow : 1)}
              stroke={WEIGHT}
              strokeWidth="3.6"
              markerEnd="url(#ex-ck-g)"
              initial={false}
              animate={{ opacity: 1 }}
            />
            <text x={G_END.x + 10} y={G_END.y + 4} fontSize="12" fill={WEIGHT}>
              G = 200 N
            </text>

            {showVertical && (
              <g stroke={MUTED} strokeWidth="1.3" strokeDasharray="5 4" fill="none">
                <line x1={C.x} y1={C.y} x2={N_X.x} y2={C.y} />
                <line x1={N_X.x} y1={C.y} x2={N_END.x} y2={N_END.y} />
                <line x1={C.x} y1={C.y} x2={N_Y.x} y2={N_Y.y} />
              </g>
            )}
            {showVertical && (
              <g fontSize="10" fill={MUTED}>
                <text x={C.x + 5} y={(C.y + N_Y.y) / 2}>
                  Ncos30° = 200 N
                </text>
                <text x={N_X.x - 4} y={C.y + 15} textAnchor="end">
                  Nsin30°
                </text>
              </g>
            )}

            {showHorizontal && (
              <text x={C.x + 10} y={C.y + 22} fontSize="10.5" fill={TENSION}>
                T równoważy Nsin30°
              </text>
            )}

            {showResult && (
              <text x={C.x + 46} y={C.y + 18} fontSize="10.5" fill={NORMAL}>
                N/G = 1,155
              </text>
            )}
          </g>

          {showTriangle && (
            <g>
              <motion.line
                x1="170"
                y1="100"
                x2="170"
                y2="200"
                stroke={WEIGHT}
                strokeWidth="3.4"
                markerEnd="url(#ex-ck-g)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />
              <motion.line
                x1="170"
                y1="200"
                x2="112.3"
                y2="100"
                stroke={NORMAL}
                strokeWidth="3.4"
                markerEnd="url(#ex-ck-n)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />
              <motion.line
                x1="112.3"
                y1="100"
                x2="170"
                y2="100"
                stroke={TENSION}
                strokeWidth="3.4"
                markerEnd="url(#ex-ck-t)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />
              <text x="180" y="154" fontSize="12" fill={WEIGHT}>
                G = 200 N
              </text>
              <text x="106" y="154" textAnchor="end" fontSize="12" fill={NORMAL}>
                N = 230,9 N
              </text>
              <text x="141" y="90" textAnchor="middle" fontSize="12" fill={TENSION}>
                T = 115,5 N
              </text>
              <text x="230" y="330" textAnchor="middle" fontSize="12" fill={INK}>
                Trójkąt sił jest zamknięty
              </text>
            </g>
          )}

          {!showTriangle && (
            <text x="230" y="348" textAnchor="middle" fontSize="12" fill={INK}>
              {showResult ? 'N > G — linka dociska walec do równi' : 'Kierunek reakcji wynika z rodzaju więzu'}
            </text>
          )}
        </svg>
      </div>
    </div>
  )
}
