import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const DRIVE = '#ff6b45'
const FRICTION = '#4f6df5'
const NORMAL = '#27835a'
const WEIGHT = '#68727e'
const MUTED = '#9aa5b1'

const GROUND = 282
const BOX = { x: 150, y: 88, w: 110, h: 194 }
const CENTER_X = BOX.x + BOX.w / 2
const EDGE_X = BOX.x + BOX.w
const P_Y = 146

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))

export function SlipTippingAnimation({ index, playing, sceneProgress }: SolutionAnimationProps) {
  const t = playing ? clamp01(sceneProgress) : 1
  const pValue = [0, 160, 100, 100, 100, 80][index] ?? 0
  const pLength = pValue * 0.7 * (index === 0 ? 0 : t)
  const offset = [0, 0, 55, 55, 55, 0][index] ?? 0
  const nX = CENTER_X + offset
  const tLength = [0, 112, 70, 70, 70, 56][index] ?? 0
  const showFriction = index >= 1
  const showShift = index >= 2
  const showTip = index >= 3
  const showTilt = index === 4
  const slip = index === 5
  const bodyX = slip ? 12 : 0
  const tilt = showTilt ? 6 : 0
  const pStart = EDGE_X + bodyX
  const pEnd = pStart + pLength
  const tStart = CENTER_X + bodyX
  const tEnd = tStart - tLength

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg viewBox="0 0 460 340" role="img" aria-label="Szafa pchana poziomo, progi poślizgu i wywrotu">
          <title>Poślizg i wywrot szafy</title>
          <desc>Szafa z siłą P na wysokości h, przesuwająca się normalna, próg poślizgu i próg wywrotu.</desc>
          <defs>
            <marker
              id="ex-wywrot-p"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={DRIVE} />
            </marker>
            <marker
              id="ex-wywrot-t"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={FRICTION} />
            </marker>
            <marker
              id="ex-wywrot-n"
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
              id="ex-wywrot-w"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={WEIGHT} />
            </marker>
          </defs>

          <line x1="36" y1={GROUND} x2="432" y2={GROUND} stroke={MUTED} strokeWidth="2" />
          {Array.from({ length: 14 }, (_, i) => (
            <line
              key={`hatch-${i}`}
              x1={44 + i * 28}
              y1={GROUND}
              x2={36 + i * 28}
              y2={GROUND + 13}
              stroke={MUTED}
              strokeWidth="1.2"
            />
          ))}

          <motion.g
            initial={false}
            animate={{ x: bodyX, rotate: tilt }}
            transition={{ type: 'spring', stiffness: 80, damping: 16 }}
            style={{ transformOrigin: `${EDGE_X}px ${GROUND}px` }}
          >
            <rect
              x={BOX.x}
              y={BOX.y}
              width={BOX.w}
              height={BOX.h}
              rx="4"
              fill="#eef2fb"
              stroke="#4f6df5"
              strokeWidth="2.4"
            />
            <line
              x1={CENTER_X}
              y1={BOX.y + 22}
              x2={CENTER_X}
              y2={BOX.y + 168}
              stroke="#b9c4d4"
              strokeWidth="1.2"
              strokeDasharray="5 5"
            />
            <rect x={BOX.x + 20} y={BOX.y + 50} width={BOX.w - 40} height="52" rx="3" fill="#f7f9fc" stroke="#c9d3e2" />
            <rect
              x={BOX.x + 20}
              y={BOX.y + 116}
              width={BOX.w - 40}
              height="52"
              rx="3"
              fill="#f7f9fc"
              stroke="#c9d3e2"
            />
          </motion.g>

          <line
            x1={CENTER_X}
            y1={BOX.y + 96}
            x2={CENTER_X}
            y2={BOX.y + 166}
            stroke={WEIGHT}
            strokeWidth="3.5"
            markerEnd="url(#ex-wywrot-w)"
          />
          <text x={CENTER_X + 10} y={BOX.y + 178} fontSize="11" fill={WEIGHT}>
            W = 400 N
          </text>

          <line
            x1={nX}
            y1={GROUND}
            x2={nX}
            y2={GROUND - 56}
            stroke={NORMAL}
            strokeWidth="3.2"
            markerEnd="url(#ex-wywrot-n)"
          />
          <text x={nX + 7} y={GROUND - 60} fontSize="11" fill={NORMAL}>
            N = 400 N
          </text>

          {showFriction && (
            <>
              <line
                x1={tStart}
                y1={GROUND - 6}
                x2={tEnd}
                y2={GROUND - 6}
                stroke={FRICTION}
                strokeWidth="3.4"
                markerEnd="url(#ex-wywrot-t)"
              />
              <text x={tEnd - 6} y={GROUND - 14} textAnchor="end" fontSize="11" fill={FRICTION}>
                T = {slip ? '80' : index === 1 ? '160' : '100'} N
              </text>
            </>
          )}

          <line
            x1={pStart}
            y1={P_Y}
            x2={pEnd}
            y2={P_Y}
            stroke={DRIVE}
            strokeWidth="3.8"
            markerEnd="url(#ex-wywrot-p)"
            opacity={index === 0 ? 0.2 : 1}
          />
          <text x={pEnd + 8} y={P_Y + 4} fontSize="11" fill={DRIVE}>
            {pValue > 0 ? `P = ${pValue} N` : 'P'}
          </text>

          <g stroke={MUTED} fill={MUTED}>
            <line x1={BOX.x} y1={GROUND + 26} x2={EDGE_X} y2={GROUND + 26} strokeWidth="1" />
            <line x1={BOX.x} y1={GROUND + 21} x2={BOX.x} y2={GROUND + 31} strokeWidth="1" />
            <line x1={EDGE_X} y1={GROUND + 21} x2={EDGE_X} y2={GROUND + 31} strokeWidth="1" />
            <text x={CENTER_X} y={GROUND + 20} textAnchor="middle" fontSize="9" stroke="none">
              d = 0,60 m
            </text>
            <line x1={BOX.x - 22} y1={GROUND} x2={BOX.x - 22} y2={P_Y} strokeWidth="1" />
            <line x1={BOX.x - 27} y1={GROUND} x2={BOX.x - 17} y2={GROUND} strokeWidth="1" />
            <line x1={BOX.x - 27} y1={P_Y} x2={BOX.x - 17} y2={P_Y} strokeWidth="1" />
            <text
              x={BOX.x - 28}
              y={(GROUND + P_Y) / 2}
              textAnchor="middle"
              fontSize="9"
              stroke="none"
              transform={`rotate(-90 ${BOX.x - 28} ${(GROUND + P_Y) / 2})`}
            >
              h = 1,20 m
            </text>
          </g>

          {showShift && (
            <>
              <line
                x1={CENTER_X}
                y1={GROUND + 4}
                x2={CENTER_X}
                y2={GROUND - 20}
                stroke={MUTED}
                strokeWidth="1.2"
                strokeDasharray="4 3"
              />
              <line
                x1={nX}
                y1={GROUND + 4}
                x2={nX}
                y2={GROUND - 20}
                stroke={NORMAL}
                strokeWidth="1.2"
                strokeDasharray="4 3"
              />
              <text x={(CENTER_X + nX) / 2} y={GROUND - 22} textAnchor="middle" fontSize="10" fill={NORMAL}>
                x = 0,30 m
              </text>
            </>
          )}

          {showTip && (
            <>
              <line
                x1={EDGE_X}
                y1={GROUND}
                x2={EDGE_X}
                y2={BOX.y - 10}
                stroke={DRIVE}
                strokeWidth="1.2"
                strokeDasharray="5 4"
                opacity="0.6"
              />
              <path
                d={`M ${EDGE_X + 54} ${BOX.y + 10} A 54 54 0 0 0 ${EDGE_X + 14} ${BOX.y - 20}`}
                fill="none"
                stroke={DRIVE}
                strokeWidth="2.4"
                markerEnd="url(#ex-wywrot-p)"
              />
              <text x={EDGE_X + 58} y={BOX.y + 4} fontSize="10" fill={DRIVE}>
                obrót wokół krawędzi
              </text>
            </>
          )}

          {index === 2 && (
            <text x="230" y="328" textAnchor="middle" fontSize="11" fill={NORMAL}>
              Normalna ucieka do przedniej krawędzi wraz ze wzrostem P
            </text>
          )}
          {index === 3 && (
            <text x="230" y="328" textAnchor="middle" fontSize="11" fill={DRIVE}>
              W granicy wywrotu N działa w krawędzi, a T = P
            </text>
          )}
          {index === 4 && (
            <text x="230" y="328" textAnchor="middle" fontSize="11" fill={DRIVE}>
              100 N &lt; 160 N — wywrot następuje przed poślizgiem
            </text>
          )}
          {index === 5 && (
            <text x="230" y="328" textAnchor="middle" fontSize="11" fill={FRICTION}>
              μs = 0,20: poślizg przy 80 N wyprzedza wywrot przy 100 N
            </text>
          )}
          {index === 1 && (
            <text x="230" y="328" textAnchor="middle" fontSize="11" fill={FRICTION}>
              Próg poślizgu: T = μsN = 160 N
            </text>
          )}
          {index === 0 && (
            <text x="230" y="328" textAnchor="middle" fontSize="11" fill={MUTED}>
              Dwa niezależne progi: siłowy poślizg i momentowy wywrot
            </text>
          )}
        </svg>
      </div>
    </div>
  )
}
