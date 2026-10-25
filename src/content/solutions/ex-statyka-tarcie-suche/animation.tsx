import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const DRIVE = '#ff6b45'
const FRICTION = '#4f6df5'
const NORMAL = '#27835a'
const WEIGHT = '#68727e'
const MUTED = '#9aa5b1'
const INK = '#17202a'

const GROUND_Y = 258
const BOX = { x: 158, y: 188, w: 132, h: 70 }

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))

export function DryFrictionAnimation({ index, playing, sceneProgress }: SolutionAnimationProps) {
  const t = playing ? clamp01(sceneProgress) : 1
  const pValue = [20, 20, 30, 30, 25, 20][index] ?? 20
  const tValue = [0, 20, 30, 25, 25, 20][index] ?? 0
  const offset = index === 3 ? 14 * t : index === 4 ? 26 : 0
  const pLength = pValue * 1.8
  const tLength = tValue * 1.8
  const showFriction = index >= 1
  const showLimit = index >= 2
  const showKinetic = index >= 3
  const showChart = index === 5
  const boxCenter = BOX.x + BOX.w / 2 + offset

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg viewBox="0 0 460 340" role="img" aria-label="Skrzynia na poziomej podłodze z siłą napędową i tarciem">
          <title>Tarcie suche skrzyni</title>
          <desc>Skrzynia, siła napędowa, tarcie statyczne i kinetyczne oraz porównanie progów.</desc>
          <defs>
            <marker
              id="ex-suche-p"
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
              id="ex-suche-t"
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
              id="ex-suche-n"
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
              id="ex-suche-g"
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

          <line x1="40" y1={GROUND_Y} x2="430" y2={GROUND_Y} stroke={MUTED} strokeWidth="2" />
          {Array.from({ length: 14 }, (_, i) => (
            <line
              key={`hatch-${i}`}
              x1={46 + i * 28}
              y1={GROUND_Y}
              x2={38 + i * 28}
              y2={GROUND_Y + 14}
              stroke={MUTED}
              strokeWidth="1.2"
            />
          ))}

          {index === 3 && (
            <g stroke={MUTED} strokeWidth="1.6" strokeLinecap="round" opacity="0.7">
              <line x1={BOX.x - 24} y1={BOX.y + 20} x2={BOX.x - 4} y2={BOX.y + 20} />
              <line x1={BOX.x - 32} y1={BOX.y + 46} x2={BOX.x - 8} y2={BOX.y + 46} />
            </g>
          )}

          <motion.g initial={false} animate={{ x: offset }} transition={{ type: 'spring', stiffness: 80, damping: 15 }}>
            <rect
              x={BOX.x}
              y={BOX.y}
              width={BOX.w}
              height={BOX.h}
              rx="6"
              fill="#eef2fb"
              stroke="#4f6df5"
              strokeWidth="2.4"
            />
            <text x={BOX.x + BOX.w / 2} y={BOX.y + 30} textAnchor="middle" fontSize="12" fill={INK}>
              G = 100 N
            </text>
            <text x={BOX.x + BOX.w / 2} y={BOX.y + 50} textAnchor="middle" fontSize="10" fill={MUTED}>
              μs = 0,30 · μk = 0,25
            </text>
          </motion.g>

          <line
            x1={boxCenter}
            y1={GROUND_Y}
            x2={boxCenter}
            y2={GROUND_Y - 54}
            stroke={NORMAL}
            strokeWidth="3"
            markerEnd="url(#ex-suche-n)"
          />
          <text x={boxCenter + 8} y={GROUND_Y - 58} fontSize="11" fill={NORMAL}>
            N = 100 N
          </text>

          <line
            x1={boxCenter + 6}
            y1={BOX.y + 34}
            x2={boxCenter + 6}
            y2={BOX.y + 96}
            stroke={WEIGHT}
            strokeWidth="3"
            markerEnd="url(#ex-suche-g)"
          />
          <text x={boxCenter + 14} y={BOX.y + 104} fontSize="11" fill={WEIGHT}>
            G
          </text>

          <line
            x1={BOX.x + BOX.w + offset}
            y1={BOX.y + 38}
            x2={BOX.x + BOX.w + offset + pLength}
            y2={BOX.y + 38}
            stroke={DRIVE}
            strokeWidth="3.5"
            markerEnd="url(#ex-suche-p)"
          />
          <text x={BOX.x + BOX.w + offset + pLength + 8} y={BOX.y + 34} fontSize="11" fill={DRIVE}>
            P = {pValue} N
          </text>

          {showFriction && (
            <>
              <line
                x1={BOX.x + offset}
                y1={BOX.y + 52}
                x2={BOX.x + offset - tLength}
                y2={BOX.y + 52}
                stroke={FRICTION}
                strokeWidth="3.5"
                markerEnd="url(#ex-suche-t)"
              />
              <text x={BOX.x + offset - tLength - 8} y={BOX.y + 74} textAnchor="end" fontSize="11" fill={FRICTION}>
                T = {tValue} N
              </text>
            </>
          )}

          {showLimit && (
            <g>
              <line
                x1={BOX.x + offset - 62}
                y1={BOX.y + 52}
                x2={BOX.x + offset - 62}
                y2={BOX.y + 26}
                stroke={FRICTION}
                strokeWidth="1.3"
                strokeDasharray="4 3"
                opacity="0.8"
              />
              <text x={BOX.x + offset - 66} y={BOX.y + 20} textAnchor="end" fontSize="10" fill={FRICTION}>
                T_max = 30 N
              </text>
            </g>
          )}

          {showKinetic && index < 5 && (
            <text x={BOX.x + 10} y={GROUND_Y - 8} fontSize="10" fill={index === 3 ? DRIVE : NORMAL}>
              {index === 3 ? 'poślizg: tarcie spada do 25 N' : 'ruch jednostajny: P = T_k = 25 N'}
            </text>
          )}

          {showChart && (
            <g>
              <rect x="28" y="30" width="126" height="112" rx="8" fill="#f7f9fc" stroke="#dfe6f2" />
              <text x="42" y="48" fontSize="10" fill={INK}>
                porównanie T [N]
              </text>
              {[
                { label: 'T_max', value: 30, color: FRICTION, y: 66 },
                { label: 'T_k', value: 25, color: NORMAL, y: 88 },
                { label: 'T(20)', value: 20, color: MUTED, y: 110 },
              ].map((bar) => (
                <g key={bar.label}>
                  <text x="42" y={bar.y + 8} fontSize="9" fill={bar.color}>
                    {bar.label}
                  </text>
                  <rect
                    x="78"
                    y={bar.y}
                    width={(bar.value / 30) * 62}
                    height="9"
                    rx="4"
                    fill={bar.color}
                    opacity="0.8"
                  />
                  <text x="146" y={bar.y + 8} fontSize="9" fill={bar.color}>
                    {bar.value}
                  </text>
                </g>
              ))}
              <text x="91" y="134" textAnchor="middle" fontSize="9" fill={NORMAL}>
                20 &lt; 30 — spoczynek
              </text>
            </g>
          )}

          {index === 0 && (
            <text x="230" y="326" textAnchor="middle" fontSize="11" fill={MUTED}>
              Tarcie T dopasowuje się do siły P, ale tylko do granicy μsN
            </text>
          )}
          {index === 4 && (
            <text x="230" y="326" textAnchor="middle" fontSize="11" fill={NORMAL}>
              Poślizg jednostajny wymaga tylko P = T_k
            </text>
          )}
          {index === 3 && (
            <text x="230" y="326" textAnchor="middle" fontSize="11" fill={DRIVE}>
              T_k = 25 N &lt; T_max = 30 N — stąd „kopniak” przy ruszaniu
            </text>
          )}
        </svg>
      </div>
    </div>
  )
}
