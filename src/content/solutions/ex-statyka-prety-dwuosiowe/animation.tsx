import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const TENSION = '#2f7d5b'
const COMPRESSION = '#4f6df5'
const LOAD = '#ff6b45'
const EDGE = '#68727e'
const MUTED = '#87929d'
const INK = '#17202a'
const LIGHT = '#e8eef8'

const C = { x: 300, y: 220 }
const A = { x: 120, y: 220 }
const B = { x: 120, y: 40 }
const P_END = { x: C.x, y: 312 }
const BC_END = { x: C.x - 77.8, y: C.y - 77.8 }
const BC_X = { x: C.x - 77.8, y: C.y }
const AC_LEFT = { x: 220, y: C.y }
const AC_RIGHT = { x: 382, y: C.y }

export function TwoForceBarsAnimation({ index, playing, sceneProgress }: SolutionAnimationProps) {
  const grow = playing ? Math.min(1, 0.2 + sceneProgress * 1.6) : 1
  const showForces = index >= 1
  const showVertical = index >= 2
  const showHorizontal = index >= 3
  const showActual = index >= 4
  const showCheck = index >= 5
  const barACColor = showActual ? COMPRESSION : EDGE
  const barBCColor = showActual ? TENSION : EDGE
  const acEnd = showActual ? AC_RIGHT : AC_LEFT
  const forceLength = showForces ? (index >= 2 ? 1 : grow) : 0

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg viewBox="0 0 460 360" role="img" aria-label="Węzeł z dwoma prętami dwusiłowymi">
          <title>Węzeł C z prętami AC i BC</title>
          <desc>Pręty dwusiłowe, założenie rozciągania, składowe, interpretacja znaku i bilans węzła.</desc>
          <defs>
            <marker
              id="ex-pd-tension"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={TENSION} />
            </marker>
            <marker
              id="ex-pd-compression"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={COMPRESSION} />
            </marker>
            <marker
              id="ex-pd-load"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={LOAD} />
            </marker>
          </defs>

          <rect x="96" y="20" width="24" height="320" fill={LIGHT} stroke={EDGE} strokeWidth="2" />
          <g stroke={MUTED} strokeWidth="1.2">
            <line x1="96" y1="36" x2="82" y2="26" />
            <line x1="96" y1="66" x2="82" y2="56" />
            <line x1="96" y1="96" x2="82" y2="86" />
            <line x1="96" y1="126" x2="82" y2="116" />
            <line x1="96" y1="156" x2="82" y2="146" />
            <line x1="96" y1="186" x2="82" y2="176" />
            <line x1="96" y1="216" x2="82" y2="206" />
            <line x1="96" y1="246" x2="82" y2="236" />
            <line x1="96" y1="276" x2="82" y2="266" />
            <line x1="96" y1="306" x2="82" y2="296" />
          </g>

          <motion.line
            x1={A.x}
            y1={A.y}
            x2={C.x}
            y2={C.y}
            stroke={barACColor}
            strokeWidth="5"
            strokeLinecap="round"
            initial={false}
            animate={{ stroke: barACColor }}
          />
          <motion.line
            x1={B.x}
            y1={B.y}
            x2={C.x}
            y2={C.y}
            stroke={barBCColor}
            strokeWidth="5"
            strokeLinecap="round"
            initial={false}
            animate={{ stroke: barBCColor }}
          />

          <circle cx={A.x} cy={A.y} r="5" fill={EDGE} />
          <circle cx={B.x} cy={B.y} r="5" fill={EDGE} />
          <circle cx={C.x} cy={C.y} r="6" fill={INK} />
          <text x={A.x - 8} y={A.y + 20} textAnchor="end" fontSize="12" fill={INK}>
            A
          </text>
          <text x={B.x - 8} y={B.y - 6} textAnchor="end" fontSize="12" fill={INK}>
            B
          </text>
          <text x={C.x + 10} y={C.y - 8} fontSize="12" fill={INK}>
            C
          </text>
          <text x="205" y={A.y - 9} fontSize="11" fill={barACColor}>
            AC
          </text>
          <text x="196" y="120" fontSize="11" fill={barBCColor}>
            BC
          </text>

          <motion.line
            x1={C.x}
            y1={C.y + 8}
            x2={P_END.x}
            y2={C.y + 8 + (P_END.y - C.y - 8) * (index === 0 ? grow : 1)}
            stroke={LOAD}
            strokeWidth="3.6"
            markerEnd="url(#ex-pd-load)"
            initial={false}
            animate={{ opacity: 1 }}
          />
          <text x={P_END.x + 10} y={P_END.y + 4} fontSize="12" fill={LOAD}>
            P = 10 kN
          </text>

          {showForces && (
            <>
              <motion.line
                x1={C.x}
                y1={C.y}
                x2={C.x + (BC_END.x - C.x) * forceLength}
                y2={C.y + (BC_END.y - C.y) * forceLength}
                stroke={TENSION}
                strokeWidth="3.5"
                markerEnd="url(#ex-pd-tension)"
                initial={false}
                animate={{ opacity: showForces ? 1 : 0 }}
              />
              <text x={BC_END.x - 6} y={BC_END.y - 8} textAnchor="end" fontSize="11.5" fill={TENSION}>
                {showActual ? 'NBC = 14,14 kN' : 'NBC'}
              </text>

              <motion.line
                x1={C.x}
                y1={C.y}
                x2={C.x + (acEnd.x - C.x) * (showActual ? 1 : forceLength)}
                y2={C.y}
                stroke={showActual ? COMPRESSION : TENSION}
                strokeWidth="3.5"
                markerEnd={showActual ? 'url(#ex-pd-compression)' : 'url(#ex-pd-tension)'}
                initial={false}
                animate={{ opacity: showForces ? 1 : 0 }}
              />
              <text
                x={showActual ? AC_RIGHT.x + 6 : AC_LEFT.x - 6}
                y={C.y - 9}
                textAnchor={showActual ? 'start' : 'end'}
                fontSize="11.5"
                fill={showActual ? COMPRESSION : TENSION}
              >
                {showActual ? 'NAC = 10 kN' : showHorizontal ? 'NAC = −10 kN' : 'NAC'}
              </text>
            </>
          )}

          {showVertical && (
            <>
              <g stroke={MUTED} strokeWidth="1.3" strokeDasharray="5 4" fill="none">
                <line x1={C.x} y1={C.y} x2={BC_X.x} y2={C.y} />
                <line x1={BC_X.x} y1={C.y} x2={BC_END.x} y2={BC_END.y} />
              </g>
              <text x={(C.x + BC_X.x) / 2} y={C.y + 16} textAnchor="middle" fontSize="10" fill={MUTED}>
                NBCcos45° = 10 kN
              </text>
              <text x={BC_X.x - 6} y={(C.y + BC_END.y) / 2} textAnchor="end" fontSize="10" fill={MUTED}>
                NBCsin45° = 10 kN
              </text>
            </>
          )}

          {showHorizontal && !showActual && (
            <text x={AC_LEFT.x - 4} y={C.y + 18} textAnchor="end" fontSize="10.5" fill={TENSION}>
              minus → zwrot przeciwny
            </text>
          )}

          {showActual && (
            <>
              <text x={AC_RIGHT.x - 6} y={C.y + 18} textAnchor="end" fontSize="10.5" fill={COMPRESSION}>
                ściskanie — siła na węzeł w prawo
              </text>
              <text x={BC_END.x + 6} y={BC_END.y + 18} fontSize="10.5" fill={TENSION}>
                rozciąganie
              </text>
            </>
          )}

          {showCheck && (
            <>
              <circle cx="330" cy="112" r="11" fill="none" stroke={TENSION} strokeWidth="1.4" />
              <path d="M 325 112 L 329 116 L 336 107" fill="none" stroke={TENSION} strokeWidth="2" />
              <text x="348" y="108" fontSize="10.5" fill={TENSION}>
                ΣFx: 10 − 10 = 0
              </text>
              <text x="348" y="124" fontSize="10.5" fill={TENSION}>
                ΣFy: 10 − 10 = 0
              </text>
            </>
          )}

          <text x="230" y="340" textAnchor="middle" fontSize="12" fill={INK}>
            {showActual ? 'AC ściskany, BC rozciągany — znak decyduje o zwrocie' : 'Zakładamy rozciąganie obu prętów'}
          </text>
        </svg>
      </div>
    </div>
  )
}
