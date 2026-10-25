import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const NORMAL = '#2f7d5b'
const WALL = '#4f6df5'
const WEIGHT = '#ff6b45'
const EDGE = '#68727e'
const MUTED = '#87929d'
const INK = '#17202a'
const LIGHT = '#e8eef8'

const C = { x: 146, y: 232 }
const R = 34
const N1_END = { x: C.x - 35.4, y: C.y - 62.5 }
const N1_X = { x: C.x - 35.4, y: C.y }
const N1_Y = { x: C.x, y: C.y - 62.5 }
const N2_END = { x: 168, y: C.y }
const G_END = { x: C.x, y: 316 }
const SUM_END = { x: C.x, y: 132 }

export function InclineEquilibriumAnimation({ index, playing, sceneProgress }: SolutionAnimationProps) {
  const grow = playing ? Math.min(1, 0.2 + sceneProgress * 1.6) : 1
  const mainOpacity = index === 5 ? 0.18 : 1
  const showReactions = index >= 1
  const showVertical = index >= 2
  const showHorizontal = index >= 3
  const showCheck = index >= 4
  const showTriangle = index === 5
  const n1Length = showReactions ? (index >= 2 ? 1 : grow) : 0
  const n2Length = showReactions ? 1 : 0
  const gLength = index === 0 ? grow : 1

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg viewBox="0 0 460 360" role="img" aria-label="Równowaga kuli między równią pochyłą i ścianą">
          <title>Kula między równią pochyłą i pionową ścianą</title>
          <desc>Reakcja równi, reakcja ściany, ciężar kuli, ich składowe oraz zamknięty trójkąt sił.</desc>
          <defs>
            <marker id="ex-row-n1" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0 0L10 5L0 10Z" fill={NORMAL} />
            </marker>
            <marker id="ex-row-n2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0 0L10 5L0 10Z" fill={WALL} />
            </marker>
            <marker id="ex-row-g" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0 0L10 5L0 10Z" fill={WEIGHT} />
            </marker>
          </defs>

          <g opacity={mainOpacity}>
            <path d="M 40 332 L 440 108 L 440 340 L 40 340 Z" fill="#f4f6f9" stroke="none" />
            <line x1="40" y1="332" x2="440" y2="108" stroke={EDGE} strokeWidth="3" />
            <rect x="86" y="42" width="26" height="286" fill={LIGHT} stroke={EDGE} strokeWidth="2" />
            <g stroke={MUTED} strokeWidth="1.2">
              <line x1="86" y1="58" x2="72" y2="48" />
              <line x1="86" y1="86" x2="72" y2="76" />
              <line x1="86" y1="114" x2="72" y2="104" />
              <line x1="86" y1="142" x2="72" y2="132" />
              <line x1="86" y1="170" x2="72" y2="160" />
              <line x1="86" y1="198" x2="72" y2="188" />
              <line x1="86" y1="226" x2="72" y2="216" />
              <line x1="86" y1="254" x2="72" y2="244" />
              <line x1="86" y1="282" x2="72" y2="272" />
              <line x1="86" y1="310" x2="72" y2="300" />
            </g>

            <circle cx={C.x} cy={C.y} r={R} fill={LIGHT} stroke="#4f6df5" strokeWidth="2.5" />
            <circle cx={C.x} cy={C.y} r="3" fill={INK} />
            <text x="238" y="318" fontSize="11" fill={MUTED}>
              α = 30°
            </text>
            <path d="M 120 311 A 34 34 0 0 1 148 298" fill="none" stroke={MUTED} strokeWidth="1.3" />

            {showReactions && (
              <motion.line
                x1={C.x}
                y1={C.y}
                x2={C.x + (N1_END.x - C.x) * n1Length}
                y2={C.y + (N1_END.y - C.y) * n1Length}
                stroke={NORMAL}
                strokeWidth="3.6"
                markerEnd="url(#ex-row-n1)"
                initial={false}
                animate={{ opacity: showReactions ? 1 : 0 }}
              />
            )}
            {showReactions && (
              <text x={N1_END.x - 8} y={N1_END.y - 8} textAnchor="end" fontSize="12" fill={NORMAL}>
                N₁ = 115,5 N
              </text>
            )}

            {showReactions && (
              <motion.line
                x1={C.x - R}
                y1={C.y}
                x2={C.x - R + (N2_END.x - (C.x - R)) * n2Length}
                y2={C.y}
                stroke={WALL}
                strokeWidth="3.6"
                markerEnd="url(#ex-row-n2)"
                initial={false}
                animate={{ opacity: showReactions ? 1 : 0 }}
              />
            )}
            {showReactions && (
              <text x={C.x - R + 4} y={C.y + 18} fontSize="11" fill={WALL}>
                N₂
              </text>
            )}

            <motion.line
              x1={C.x}
              y1={C.y + R}
              x2={C.x}
              y2={C.y + R + (G_END.y - (C.y + R)) * gLength}
              stroke={WEIGHT}
              strokeWidth="3.6"
              markerEnd="url(#ex-row-g)"
              initial={false}
              animate={{ opacity: 1 }}
            />
            <text x={C.x + 10} y={G_END.y + 12} fontSize="12" fill={WEIGHT}>
              G = 100 N
            </text>

            {showVertical && (
              <g stroke={MUTED} strokeWidth="1.3" strokeDasharray="5 4" fill="none">
                <line x1={C.x} y1={C.y} x2={N1_X.x} y2={C.y} />
                <line x1={N1_X.x} y1={C.y} x2={N1_END.x} y2={N1_END.y} />
                <line x1={C.x} y1={C.y} x2={N1_Y.x} y2={N1_Y.y} />
              </g>
            )}
            {showVertical && (
              <g fontSize="10" fill={MUTED}>
                <text x={C.x + 5} y={(C.y + N1_Y.y) / 2}>
                  N₁cos30° = 100 N
                </text>
                <text x={N1_X.x - 4} y={C.y + 15} textAnchor="end">
                  N₁sin30°
                </text>
              </g>
            )}

            {showHorizontal && (
              <text x={C.x - R + 4} y={C.y + 31} fontSize="10.5" fill={WALL}>
                N₂ = 57,7 N
              </text>
            )}

            {showCheck && (
              <>
                <motion.line
                  x1={C.x}
                  y1={C.y}
                  x2={SUM_END.x}
                  y2={SUM_END.y}
                  stroke={NORMAL}
                  strokeWidth="2.4"
                  strokeDasharray="7 4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
                <text x={C.x + 8} y={SUM_END.y - 6} fontSize="10.5" fill={NORMAL}>
                  N₁ + N₂ równoważy G
                </text>
              </>
            )}
          </g>

          {showTriangle && (
            <g>
              <motion.line
                x1="180"
                y1="110"
                x2="180"
                y2="190"
                stroke={WEIGHT}
                strokeWidth="3.4"
                markerEnd="url(#ex-row-g)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />
              <motion.line
                x1="180"
                y1="190"
                x2="133.8"
                y2="110"
                stroke={NORMAL}
                strokeWidth="3.4"
                markerEnd="url(#ex-row-n1)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />
              <motion.line
                x1="133.8"
                y1="110"
                x2="180"
                y2="110"
                stroke={WALL}
                strokeWidth="3.4"
                markerEnd="url(#ex-row-n2)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />
              <text x="190" y="154" fontSize="12" fill={WEIGHT}>
                G = 100 N
              </text>
              <text x="128" y="154" textAnchor="end" fontSize="12" fill={NORMAL}>
                N₁ = 115,5 N
              </text>
              <text x="156" y="100" textAnchor="middle" fontSize="12" fill={WALL}>
                N₂ = 57,7 N
              </text>
              <text x="230" y="330" textAnchor="middle" fontSize="12" fill={INK}>
                Trójkąt sił zamyka się — układ jest w równowadze
              </text>
            </g>
          )}

          {!showTriangle && (
            <text x="230" y="346" textAnchor="middle" fontSize="12" fill={INK}>
              {showCheck ? 'Wypadkowa reakcji równoważy ciężar' : 'Dwie gładkie podpory, trzy siły zbieżne'}
            </text>
          )}
        </svg>
      </div>
    </div>
  )
}
