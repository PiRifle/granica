import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const TENSION = '#2f7d5b'
const WEIGHT = '#ff6b45'
const LINE = '#68727e'
const MUTED = '#9aa5b1'
const INK = '#17202a'

const CENTER = { x: 230, y: 218 }
const BALL = 22
const TOP = 44
const ARROW = 70
const TIP_UP = CENTER.y - BALL - ARROW
const TIP_DOWN = CENTER.y + BALL + ARROW

export function PointMassAnimation({ index, playing, sceneProgress }: SolutionAnimationProps) {
  const grow = playing ? Math.min(1, 0.2 + sceneProgress * 1.7) : 1
  const showWeight = index >= 1
  const showTension = index >= 2
  const showBalance = index >= 3
  const showCheck = index >= 4
  const weightLength = showWeight ? ARROW * (index === 1 ? grow : 1) : 0
  const tensionLength = showTension ? ARROW * (index === 2 ? grow : 1) : 0

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg viewBox="0 0 460 360" role="img" aria-label="Równowaga kuli zawieszonej na lince">
          <title>Punkt materialny zawieszony na lince</title>
          <desc>Kula, jej ciężar, napięcie liny i warunek równowagi pionowej.</desc>
          <defs>
            <marker id="ex-pm-t" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0 0L10 5L0 10Z" fill={TENSION} />
            </marker>
            <marker id="ex-pm-g" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0 0L10 5L0 10Z" fill={WEIGHT} />
            </marker>
          </defs>

          <g stroke={LINE} strokeWidth="2">
            <line x1="122" y1={TOP} x2="338" y2={TOP} />
            <line x1="132" y1={TOP} x2="118" y2={TOP - 12} />
            <line x1="152" y1={TOP} x2="138" y2={TOP - 12} />
            <line x1="172" y1={TOP} x2="158" y2={TOP - 12} />
            <line x1="192" y1={TOP} x2="178" y2={TOP - 12} />
            <line x1="212" y1={TOP} x2="198" y2={TOP - 12} />
            <line x1="232" y1={TOP} x2="218" y2={TOP - 12} />
            <line x1="252" y1={TOP} x2="238" y2={TOP - 12} />
            <line x1="272" y1={TOP} x2="258" y2={TOP - 12} />
            <line x1="292" y1={TOP} x2="278" y2={TOP - 12} />
            <line x1="312" y1={TOP} x2="298" y2={TOP - 12} />
            <line x1="332" y1={TOP} x2="318" y2={TOP - 12} />
          </g>

          <line x1={CENTER.x} y1={TOP} x2={CENTER.x} y2={CENTER.y - BALL} stroke={LINE} strokeWidth="2.4" />

          <circle cx={CENTER.x} cy={CENTER.y} r={BALL} fill="#e8eef8" stroke="#4f6df5" strokeWidth="2.5" />
          <circle cx={CENTER.x} cy={CENTER.y} r="3" fill={INK} />
          <text x={CENTER.x + 34} y={CENTER.y + 4} fontSize="13" fill={INK}>
            m = 5 kg
          </text>
          <text x={CENTER.x + 34} y={CENTER.y + 21} fontSize="11" fill={MUTED}>
            punkt materialny
          </text>

          {showWeight && (
            <>
              <motion.line
                x1={CENTER.x}
                y1={CENTER.y + BALL}
                x2={CENTER.x}
                y2={CENTER.y + BALL + weightLength}
                stroke={WEIGHT}
                strokeWidth="4"
                markerEnd="url(#ex-pm-g)"
                initial={false}
                animate={{ opacity: showWeight ? 1 : 0, y2: CENTER.y + BALL + weightLength }}
              />
              <text x={CENTER.x + 12} y={CENTER.y + BALL + weightLength + 6} fontSize="12" fill={WEIGHT}>
                G = 49,05 N
              </text>
            </>
          )}

          {showTension && (
            <>
              <motion.line
                x1={CENTER.x}
                y1={CENTER.y - BALL}
                x2={CENTER.x}
                y2={CENTER.y - BALL - tensionLength}
                stroke={TENSION}
                strokeWidth="4"
                markerEnd="url(#ex-pm-t)"
                initial={false}
                animate={{ opacity: showTension ? 1 : 0, y2: CENTER.y - BALL - tensionLength }}
              />
              <text
                x={CENTER.x - 12}
                y={CENTER.y - BALL - tensionLength - 8}
                textAnchor="end"
                fontSize="12"
                fill={TENSION}
              >
                T
              </text>
            </>
          )}

          {showBalance && (
            <>
              <line
                x1={CENTER.x - 72}
                y1={CENTER.y}
                x2={CENTER.x + 72}
                y2={CENTER.y}
                stroke={MUTED}
                strokeWidth="1.2"
                strokeDasharray="5 4"
              />
              <motion.text
                x="230"
                y="338"
                textAnchor="middle"
                fontSize="12"
                fill={TENSION}
                initial={false}
                animate={{ opacity: showBalance ? 1 : 0 }}
              >
                T = G — siły równe i przeciwne
              </motion.text>
            </>
          )}

          {showCheck && (
            <>
              <g stroke={TENSION} strokeWidth="1.4" fill="none">
                <line x1="366" y1={TIP_UP} x2="382" y2={TIP_UP} />
                <line x1="374" y1={TIP_UP} x2="374" y2={TIP_DOWN} />
                <line x1="366" y1={TIP_DOWN} x2="382" y2={TIP_DOWN} />
              </g>
              <text
                x="392"
                y={(TIP_UP + TIP_DOWN) / 2}
                fontSize="11"
                fill={TENSION}
                transform={`rotate(-90 392 ${(TIP_UP + TIP_DOWN) / 2})`}
                textAnchor="middle"
              >
                49,05 N
              </text>
              <text x="230" y="354" textAnchor="middle" fontSize="11" fill={MUTED}>
                kg · m/s² = N
              </text>
            </>
          )}

          {!showBalance && (
            <text x="230" y="338" textAnchor="middle" fontSize="12" fill={MUTED}>
              {index === 0
                ? 'Ciało zastąpione punktem materialnym'
                : showTension
                  ? 'Dwie siły na izolowanym punkcie'
                  : 'Ciężar działa pionowo w dół'}
            </text>
          )}
        </svg>
      </div>
    </div>
  )
}
