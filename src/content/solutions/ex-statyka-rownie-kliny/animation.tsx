import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const WALL = '#68727e'
const LADDER = '#4f6df5'
const WEIGHT = '#ff6b45'
const NORMAL = '#27835a'
const FRICTION = '#9a5bd6'
const MUTED = '#9aa5b1'
const INK = '#17202a'

const WALL_X = 270
const GROUND_Y = 282
const LADDER_LENGTH = 280

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))

export function LadderFrictionAnimation({ index, playing, sceneProgress }: SolutionAnimationProps) {
  const t = playing ? clamp01(sceneProgress) : 1
  const footX = index === 5 ? 130 - 30 * t : 130
  const horizontal = WALL_X - footX
  const topY = GROUND_Y - Math.sqrt(LADDER_LENGTH * LADDER_LENGTH - horizontal * horizontal)
  const top = { x: WALL_X, y: topY }
  const foot = { x: footX, y: GROUND_Y }
  const middle = { x: (foot.x + top.x) / 2, y: (foot.y + top.y) / 2 }
  const showNA = index >= 1
  const showNB = index >= 2
  const showT = index >= 3
  const showGauge = index >= 4
  const available = index === 5 ? 75 : 90
  const angle = Math.atan2(top.y - foot.y, top.x - foot.x)

  const nBEnd = { x: top.x - 46, y: top.y }
  const nAEnd = { x: foot.x, y: foot.y - 64 }
  const tEnd = { x: foot.x + 46, y: foot.y - 2 }
  const wEnd = { x: middle.x, y: middle.y + 66 }

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg viewBox="0 0 460 340" role="img" aria-label="Drabina oparta o gładką ścianę z tarciem w podłodze">
          <title>Drabina oparta o ścianę</title>
          <desc>
            Drabina pod kątem 60 stopni, ciężar, reakcja ściany, normalna i tarcie w podłodze oraz zapas tarcia.
          </desc>
          <defs>
            <marker
              id="ex-drabina-w"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={WEIGHT} />
            </marker>
            <marker
              id="ex-drabina-na"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={NORMAL} />
            </marker>
            <marker
              id="ex-drabina-nb"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={NORMAL} />
            </marker>
            <marker
              id="ex-drabina-t"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={FRICTION} />
            </marker>
          </defs>

          <line x1="36" y1={GROUND_Y} x2="440" y2={GROUND_Y} stroke={MUTED} strokeWidth="2" />
          {Array.from({ length: 15 }, (_, i) => (
            <line
              key={`hatch-${i}`}
              x1={44 + i * 27}
              y1={GROUND_Y}
              x2={36 + i * 27}
              y2={GROUND_Y + 13}
              stroke={MUTED}
              strokeWidth="1.2"
            />
          ))}

          <line x1={WALL_X} y1="22" x2={WALL_X} y2={GROUND_Y} stroke={WALL} strokeWidth="5" />
          {Array.from({ length: 11 }, (_, i) => (
            <line
              key={`wall-${i}`}
              x1={WALL_X}
              y1={34 + i * 23}
              x2={WALL_X + 12}
              y2={26 + i * 23}
              stroke={MUTED}
              strokeWidth="1.1"
            />
          ))}

          <motion.line
            x1={foot.x}
            y1={foot.y}
            x2={top.x}
            y2={top.y}
            stroke={LADDER}
            strokeWidth="6"
            strokeLinecap="round"
            initial={false}
            animate={{ x1: foot.x, y1: foot.y, x2: top.x, y2: top.y }}
          />
          {[0.2, 0.38, 0.56, 0.74].map((ratio) => {
            const px = foot.x + (top.x - foot.x) * ratio
            const py = foot.y + (top.y - foot.y) * ratio
            const nx = Math.sin(angle) * 10
            const ny = Math.cos(angle) * 10
            return (
              <line
                key={`rung-${ratio}`}
                x1={px - nx}
                y1={py - ny}
                x2={px + nx}
                y2={py + ny}
                stroke={LADDER}
                strokeWidth="2"
                opacity="0.75"
              />
            )
          })}

          <path
            d={`M ${foot.x + 52} ${foot.y} A 52 52 0 0 0 ${foot.x + 52 * Math.cos(angle)} ${foot.y + 52 * Math.sin(angle)}`}
            fill="none"
            stroke={INK}
            strokeWidth="1.4"
          />
          <text x={foot.x + 58} y={foot.y - 10} fontSize="11" fill={INK}>
            {index === 5 ? 'α maleje' : 'α = 60°'}
          </text>

          {showNB && (
            <>
              <line
                x1={top.x}
                y1={top.y}
                x2={nBEnd.x}
                y2={nBEnd.y}
                stroke={NORMAL}
                strokeWidth="3.4"
                markerEnd="url(#ex-drabina-nb)"
              />
              <text x={nBEnd.x - 6} y={nBEnd.y - 8} textAnchor="end" fontSize="11" fill={NORMAL}>
                N_B = 86,6 N
              </text>
            </>
          )}

          {showNA && (
            <>
              <line
                x1={foot.x}
                y1={foot.y}
                x2={nAEnd.x}
                y2={nAEnd.y}
                stroke={NORMAL}
                strokeWidth="3.4"
                markerEnd="url(#ex-drabina-na)"
              />
              <text x={nAEnd.x - 8} y={nAEnd.y + 4} textAnchor="end" fontSize="11" fill={NORMAL}>
                N_A = 300 N
              </text>
            </>
          )}

          {showT && (
            <>
              <line
                x1={foot.x}
                y1={foot.y - 4}
                x2={tEnd.x}
                y2={tEnd.y}
                stroke={FRICTION}
                strokeWidth="3.4"
                markerEnd="url(#ex-drabina-t)"
              />
              <text x={tEnd.x + 4} y={tEnd.y + 16} fontSize="11" fill={FRICTION}>
                T_A = 86,6 N
              </text>
            </>
          )}

          <line
            x1={middle.x}
            y1={middle.y}
            x2={wEnd.x}
            y2={wEnd.y}
            stroke={WEIGHT}
            strokeWidth="3.6"
            markerEnd="url(#ex-drabina-w)"
          />
          <text x={wEnd.x + 8} y={wEnd.y + 2} fontSize="11" fill={WEIGHT}>
            W = 300 N
          </text>

          {index >= 2 && (
            <g stroke={MUTED} strokeWidth="1.1" strokeDasharray="5 4" fill="none">
              <line x1={foot.x} y1={foot.y} x2={middle.x} y2={foot.y} />
              <line x1={middle.x} y1={foot.y} x2={middle.x} y2={middle.y} />
              <line x1={foot.x} y1={foot.y} x2={foot.x} y2={top.y} />
              <line x1={foot.x} y1={top.y} x2={top.x} y2={top.y} />
            </g>
          )}

          {showGauge && (
            <g>
              <rect x="26" y="34" width="142" height="112" rx="8" fill="#f7f9fc" stroke="#dfe6f2" />
              <text x="40" y="52" fontSize="10" fill={INK}>
                tarcie w podłodze [N]
              </text>
              <text x="40" y="76" fontSize="9" fill={FRICTION}>
                potrzebne
              </text>
              <rect x="96" y="68" width="52" height="9" rx="4" fill={FRICTION} opacity="0.85" />
              <text x="152" y="76" fontSize="9" fill={FRICTION}>
                86,6
              </text>
              <text x="40" y="104" fontSize="9" fill={available >= 86.6 ? NORMAL : WEIGHT}>
                dostępne
              </text>
              <rect
                x="96"
                y="96"
                width={(available / 100) * 56}
                height="9"
                rx="4"
                fill={available >= 86.6 ? NORMAL : WEIGHT}
                opacity="0.85"
              />
              <text x="154" y="104" fontSize="9" fill={available >= 86.6 ? NORMAL : WEIGHT}>
                {available}
              </text>
              <text x="40" y="130" fontSize="9" fill={available >= 86.6 ? NORMAL : WEIGHT}>
                {available >= 86.6 ? 'zapas ≈ 3,4 N — stoi' : 'brakuje 11,6 N — poślizg'}
              </text>
            </g>
          )}

          {index === 5 && (
            <g stroke={WEIGHT} strokeWidth="1.8" strokeLinecap="round" opacity="0.8">
              <line x1={foot.x - 18} y1={foot.y - 26} x2={foot.x - 2} y2={foot.y - 26} />
              <line x1={foot.x - 24} y1={foot.y - 38} x2={foot.x - 4} y2={foot.y - 38} />
            </g>
          )}

          {index === 1 && (
            <text x="230" y="328" textAnchor="middle" fontSize="11" fill={NORMAL}>
              Normalna podłogi równoważy ciężar drabiny
            </text>
          )}
          {index === 2 && (
            <text x="230" y="328" textAnchor="middle" fontSize="11" fill={NORMAL}>
              Momenty względem stopy: ciężar kontra reakcja ściany
            </text>
          )}
          {index === 3 && (
            <text x="230" y="328" textAnchor="middle" fontSize="11" fill={FRICTION}>
              Tarcie potrzebne wynika z równowagi poziomej
            </text>
          )}
          {index === 4 && (
            <text x="230" y="328" textAnchor="middle" fontSize="11" fill={NORMAL}>
              86,6 N ≤ 90 N — drabina stoi
            </text>
          )}
          {index === 5 && (
            <text x="230" y="328" textAnchor="middle" fontSize="11" fill={WEIGHT}>
              75 N &lt; 86,6 N — stopa odjeżdża od ściany
            </text>
          )}
          {index === 0 && (
            <text x="230" y="328" textAnchor="middle" fontSize="11" fill={MUTED}>
              Gładka ściana daje tylko poziomą reakcję N_B
            </text>
          )}
        </svg>
      </div>
    </div>
  )
}
