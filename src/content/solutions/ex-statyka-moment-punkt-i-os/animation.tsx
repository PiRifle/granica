import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const R_COLOR = '#4f6df5'
const FORCE = '#ff6b45'
const M_X = '#4f6df5'
const M_Y = '#ff8a5c'
const M_Z = '#a970dd'
const RESULT = '#27835a'
const EDGE = '#68727e'
const MUTED = '#87929d'
const INK = '#17202a'
const AXIS = '#9aa5b1'

const O = { x: 92, y: 270 }
const ex = { x: 30, y: 0 }
const ey = { x: -13, y: -22 }
const ez = { x: 0, y: -30 }
const point = (x: number, y: number, z: number) => ({
  x: O.x + x * ex.x + y * ey.x + z * ez.x,
  y: O.y + x * ex.y + y * ey.y + z * ez.y,
})
const A = point(2, 3, 0)
const FEnd = point(6, 1, 6)
const B = point(1, 1, 0)
const axisEnd = point(3, 3, 0)
const projectionEnd = { x: O.x + 41.5, y: O.y - 53.8 }

const M0 = { x: 300, y: 195 }
const mxEnd = { x: M0.x + 50.4, y: M0.y }
const myEnd = { x: M0.x + 14.4, y: M0.y + 24.5 }
const mzEnd = { x: M0.x, y: M0.y + 44.8 }
const mEnd = { x: M0.x + 64.8, y: M0.y + 69.3 }

const clamp01 = (value: number) => Math.max(0, Math.min(1, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}

const captions = [
  'Punkt A, wektor r i siła F w przestrzeni',
  'Składowe momentu: 18, −12, −16 kN·m',
  'Wektor M_O i moduł 26,9 kN·m',
  'Moment względem osi z: M_z = −16 kN·m',
  'Rzut momentu na oś OB: 4,24 kN·m',
  'Varignon: suma momentów składowych = M_O',
]

export function MomentPointAxisAnimation({ index, playing, sceneProgress }: SolutionAnimationProps) {
  const showComponents = index >= 1
  const showMoment = index >= 2
  const showAxis = index >= 4
  const showCheck = index >= 5
  const componentFade = index === 3 ? 0.32 : 1
  const mProgress = showMoment ? (playing && index === 2 ? 0.3 + 0.7 * smooth(sceneProgress) : 1) : 0
  const mTip = { x: M0.x + (mEnd.x - M0.x) * mProgress, y: M0.y + (mEnd.y - M0.y) * mProgress }
  const projectionProgress = showAxis ? (playing && index === 4 ? 0.35 + 0.65 * smooth(sceneProgress) : 1) : 0
  const projectionTip = {
    x: O.x + (projectionEnd.x - O.x) * projectionProgress,
    y: O.y + (projectionEnd.y - O.y) * projectionProgress,
  }
  const summary = captions[Math.min(index, captions.length - 1)]

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg viewBox="0 0 460 340" role="img" aria-label="Moment siły względem punktu i osi w przestrzeni">
          <title>Moment względem punktu i osi</title>
          <desc>Siła 4, minus 2, 6 kN w punkcie 2, 3, 0 m; moment 18, minus 12, minus 16 kN metr i rzut na oś OB.</desc>
          <defs>
            <marker id="ex-mom-r" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0 0L10 5L0 10Z" fill={R_COLOR} />
            </marker>
            <marker id="ex-mom-f" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0 0L10 5L0 10Z" fill={FORCE} />
            </marker>
            <marker id="ex-mom-mx" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
              <path d="M0 0L10 5L0 10Z" fill={M_X} />
            </marker>
            <marker id="ex-mom-my" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
              <path d="M0 0L10 5L0 10Z" fill={M_Y} />
            </marker>
            <marker id="ex-mom-mz" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
              <path d="M0 0L10 5L0 10Z" fill={M_Z} />
            </marker>
            <marker id="ex-mom-m" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0 0L10 5L0 10Z" fill={RESULT} />
            </marker>
            <marker
              id="ex-mom-arc"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={M_Z} />
            </marker>
          </defs>

          <line x1={O.x} y1={O.y} x2="252" y2={O.y} stroke={AXIS} strokeWidth="1.4" />
          <line x1={O.x} y1={O.y} x2="27" y2="160" stroke={AXIS} strokeWidth="1.4" />
          <line x1={O.x} y1={O.y} x2={O.x} y2="90" stroke={AXIS} strokeWidth="1.4" />
          <text x="256" y="266" fontSize="11" fill={INK}>
            x
          </text>
          <text x="19" y="155" fontSize="11" fill={INK}>
            y
          </text>
          <text x={O.x + 7} y="86" fontSize="11" fill={INK}>
            z
          </text>
          <text x={O.x - 15} y={O.y + 17} fontSize="11" fill={INK}>
            O
          </text>

          <line x1={O.x} y1={O.y} x2={A.x} y2={A.y} stroke={R_COLOR} strokeWidth="2.4" markerEnd="url(#ex-mom-r)" />
          <text x={(O.x + A.x) / 2 - 12} y={(O.y + A.y) / 2 + 6} fontSize="10" fill={R_COLOR}>
            r
          </text>
          <circle cx={A.x} cy={A.y} r="3.6" fill={INK} />
          <text x={A.x - 6} y={A.y - 8} fontSize="9.5" fill={INK}>
            A(2, 3, 0)
          </text>

          <line x1={A.x} y1={A.y} x2={FEnd.x} y2={FEnd.y} stroke={FORCE} strokeWidth="3" markerEnd="url(#ex-mom-f)" />
          <text x={FEnd.x + 6} y={FEnd.y - 4} fontSize="10" fill={FORCE}>
            F = (4, −2, 6)
          </text>

          {index === 3 && (
            <g>
              <path
                d={`M ${O.x - 22} 240 A 22 8 0 1 0 ${O.x + 22} 240`}
                fill="none"
                stroke={M_Z}
                strokeWidth="1.6"
                markerEnd="url(#ex-mom-arc)"
                opacity="0.9"
              />
              <text x={O.x + 26} y="244" fontSize="9.5" fill={M_Z}>
                M_z = −16
              </text>
            </g>
          )}

          {showAxis && (
            <g>
              <line
                x1={O.x}
                y1={O.y}
                x2={axisEnd.x}
                y2={axisEnd.y}
                stroke={EDGE}
                strokeWidth="1.6"
                strokeDasharray="6 4"
              />
              <circle cx={B.x} cy={B.y} r="3" fill={EDGE} />
              <text x={B.x + 6} y={B.y + 14} fontSize="9.5" fill={EDGE}>
                B(1, 1, 0)
              </text>
              <text x={axisEnd.x + 4} y={axisEnd.y - 4} fontSize="9" fill={EDGE}>
                oś OB
              </text>
              <line
                x1={O.x}
                y1={O.y}
                x2={projectionTip.x}
                y2={projectionTip.y}
                stroke={RESULT}
                strokeWidth="3.2"
                markerEnd="url(#ex-mom-m)"
              />
              <text x={projectionEnd.x + 14} y={projectionEnd.y + 24} fontSize="9.5" fill={RESULT}>
                M_OB = 4,24 kN·m
              </text>
            </g>
          )}

          {showComponents && (
            <g>
              <rect x="268" y="160" width="172" height="164" rx="8" fill="#f7f8fa" stroke="#d7dde5" />
              <text x="278" y="176" fontSize="9" fill={MUTED}>
                MOMENT M_O — POWIĘKSZENIE
              </text>
              <line x1={M0.x} y1={M0.y} x2={M0.x + 8} y2={M0.y} stroke={AXIS} strokeWidth="1" />
              <line x1={M0.x} y1={M0.y} x2={M0.x} y2={M0.y - 8} stroke={AXIS} strokeWidth="1" />

              <motion.g initial={false} animate={{ opacity: componentFade }} transition={{ duration: 0.3 }}>
                <line
                  x1={M0.x}
                  y1={M0.y}
                  x2={mxEnd.x}
                  y2={mxEnd.y}
                  stroke={M_X}
                  strokeWidth="2.4"
                  markerEnd="url(#ex-mom-mx)"
                />
                <line
                  x1={M0.x}
                  y1={M0.y}
                  x2={myEnd.x}
                  y2={myEnd.y}
                  stroke={M_Y}
                  strokeWidth="2.4"
                  markerEnd="url(#ex-mom-my)"
                />
              </motion.g>
              <motion.g
                initial={false}
                animate={{ opacity: index === 3 ? 1 : componentFade }}
                transition={{ duration: 0.3 }}
              >
                <line
                  x1={M0.x}
                  y1={M0.y}
                  x2={mzEnd.x}
                  y2={mzEnd.y}
                  stroke={M_Z}
                  strokeWidth="2.4"
                  markerEnd="url(#ex-mom-mz)"
                />
              </motion.g>

              <text x={mxEnd.x + 3} y={mxEnd.y - 4} fontSize="9" fill={M_X}>
                18
              </text>
              <text x={myEnd.x + 3} y={myEnd.y + 4} fontSize="9" fill={M_Y}>
                −12
              </text>
              <text x={mzEnd.x + 4} y={mzEnd.y + 3} fontSize="9" fill={M_Z}>
                −16
              </text>

              {showMoment && (
                <g>
                  <line
                    x1={M0.x}
                    y1={M0.y}
                    x2={mTip.x}
                    y2={mTip.y}
                    stroke={RESULT}
                    strokeWidth="2.8"
                    markerEnd="url(#ex-mom-m)"
                  />
                  <text x={mEnd.x + 3} y={mEnd.y + 3} fontSize="10" fill={RESULT}>
                    M_O
                  </text>
                </g>
              )}

              {showCheck && (
                <g>
                  <text x="278" y="308" fontSize="9" fill={RESULT}>
                    suma składowych = M_O
                  </text>
                  <circle cx="416" cy="304" r="9" fill={RESULT} opacity="0.15" />
                  <path d="M 411 304 L 415 308 L 422 299" fill="none" stroke={RESULT} strokeWidth="1.7" />
                </g>
              )}
            </g>
          )}

          <text x="230" y="332" textAnchor="middle" fontSize="12" fill={INK}>
            {summary}
          </text>
        </svg>
      </div>
    </div>
  )
}
