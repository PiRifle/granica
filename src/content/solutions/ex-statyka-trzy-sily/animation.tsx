import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const CABLE = '#ff8a5c'
const LOAD = '#ff6b45'
const REACTION = '#2f7d5b'
const MOMENT = '#a970dd'
const EDGE = '#68727e'
const MUTED = '#87929d'
const INK = '#17202a'
const LIGHT = '#e8eef8'

const A = { x: 90, y: 150 }
const B = { x: 300, y: 150 }
const P = { x: 160, y: 150 }
const D = { x: 340, y: 80.7 }
const E = { x: 160, y: 392 }
const FOOT = { x: 247.5, y: 240.9 }
const S_SCALE = 50
const P_SCALE = 18
const R_SCALE = 30
const S_LENGTH = 2.31 * S_SCALE
const S_END = {
  x: B.x + S_LENGTH * Math.cos((60 * Math.PI) / 180),
  y: B.y - S_LENGTH * Math.sin((60 * Math.PI) / 180),
}
const AX_END = { x: A.x - 1.1547 * R_SCALE, y: A.y }
const AY_END = { x: A.x, y: A.y - 4 * R_SCALE }
const RA_END = { x: A.x - 1.1547 * R_SCALE, y: A.y - 4 * R_SCALE }

export function ThreeForcesAnimation({ index, playing, sceneProgress }: SolutionAnimationProps) {
  const grow = playing ? Math.min(1, 0.2 + sceneProgress * 1.6) : 1
  const showMoment = index >= 1
  const showCable = index >= 1
  const showComponents = index >= 3
  const showResultant = index >= 4
  const showConcurrency = index === 5
  const cableLength = showCable ? (index >= 2 ? 1 : grow) : 0
  const loadLength = index === 0 ? grow : 1
  const reactionLength = showComponents ? 1 : 0

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg viewBox="0 0 460 440" role="img" aria-label="Równowaga trzech sił na belce zawieszonej na linie">
          <title>Belka na przegubie i linie</title>
          <desc>Belka, obciążenie, siła w linie, składowe reakcji przegubu, wypadkowa reakcja i punkt zbiegu.</desc>
          <defs>
            <marker
              id="ex-3s-load"
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
              id="ex-3s-cable"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={CABLE} />
            </marker>
            <marker id="ex-3s-r" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0 0L10 5L0 10Z" fill={REACTION} />
            </marker>
            <marker id="ex-3s-m" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0 0L10 5L0 10Z" fill={MOMENT} />
            </marker>
          </defs>

          <g stroke={EDGE} strokeWidth="2">
            <line x1="70" y1="36" x2="70" y2="292" />
            <line x1="70" y1="56" x2="54" y2="44" />
            <line x1="70" y1="86" x2="54" y2="74" />
            <line x1="70" y1="116" x2="54" y2="104" />
            <line x1="70" y1="146" x2="54" y2="134" />
            <line x1="70" y1="176" x2="54" y2="164" />
            <line x1="70" y1="206" x2="54" y2="194" />
            <line x1="70" y1="236" x2="54" y2="224" />
            <line x1="70" y1="266" x2="54" y2="254" />
          </g>

          <rect x={A.x - 9} y={A.y - 7} width="18" height="14" rx="3" fill={LIGHT} stroke={EDGE} strokeWidth="2" />
          <circle cx={A.x} cy={A.y} r="4" fill={EDGE} />
          <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke={EDGE} strokeWidth="6" strokeLinecap="round" />
          <line x1={B.x} y1={B.y} x2={D.x} y2={D.y} stroke={CABLE} strokeWidth="2.4" />
          <text x={D.x + 6} y={D.y - 4} fontSize="11" fill={CABLE}>
            D
          </text>
          <text x={A.x + 4} y={A.y + 24} fontSize="12" fill={INK}>
            A
          </text>
          <text x={B.x + 4} y={B.y + 24} fontSize="12" fill={INK}>
            B
          </text>

          <line x1={A.x} y1={A.y + 30} x2={P.x} y2={A.y + 30} stroke={MUTED} strokeWidth="1" />
          <line x1={A.x} y1={A.y + 25} x2={A.x} y2={A.y + 35} stroke={MUTED} strokeWidth="1" />
          <line x1={P.x} y1={A.y + 25} x2={P.x} y2={A.y + 35} stroke={MUTED} strokeWidth="1" />
          <text x={(A.x + P.x) / 2} y={A.y + 24} textAnchor="middle" fontSize="10" fill={MUTED}>
            a = 1 m
          </text>
          <line x1={A.x} y1={A.y + 52} x2={B.x} y2={A.y + 52} stroke={MUTED} strokeWidth="1" />
          <line x1={A.x} y1={A.y + 47} x2={A.x} y2={A.y + 57} stroke={MUTED} strokeWidth="1" />
          <line x1={B.x} y1={A.y + 47} x2={B.x} y2={A.y + 57} stroke={MUTED} strokeWidth="1" />
          <text x={(A.x + B.x) / 2} y={A.y + 48} textAnchor="middle" fontSize="10" fill={MUTED}>
            l = 3 m
          </text>

          <motion.line
            x1={P.x}
            y1={P.y - 50}
            x2={P.x}
            y2={P.y - 50 + (50 + 6 * P_SCALE) * loadLength}
            stroke={LOAD}
            strokeWidth="3.6"
            markerEnd="url(#ex-3s-load)"
            initial={false}
            animate={{ opacity: 1 }}
          />
          <text x={P.x + 10} y={P.y - 42} fontSize="12" fill={LOAD}>
            P = 6 kN
          </text>

          {showMoment && (
            <>
              <g stroke={MOMENT} strokeWidth="1.4" strokeDasharray="6 4" fill="none">
                <line x1={A.x} y1={A.y} x2={FOOT.x} y2={FOOT.y} />
                <line x1={B.x} y1={B.y} x2={FOOT.x} y2={FOOT.y} />
              </g>
              <circle cx={A.x} cy={A.y} r="12" fill="none" stroke={MOMENT} strokeWidth="1.6" />
              <path
                d={`M ${A.x + 12} ${A.y} A 12 12 0 0 1 ${A.x + 6} ${A.y + 10}`}
                fill="none"
                stroke={MOMENT}
                strokeWidth="1.6"
              />
              <text x={(A.x + FOOT.x) / 2 - 26} y={(A.y + FOOT.y) / 2 + 4} fontSize="10.5" fill={MOMENT}>
                l sin60° = 2,60 m
              </text>
              <path
                d={`M ${FOOT.x - 9} ${FOOT.y + 3} L ${FOOT.x - 3} ${FOOT.y - 6} L ${FOOT.x + 8} ${FOOT.y - 1}`}
                fill="none"
                stroke={MOMENT}
                strokeWidth="1.2"
              />
            </>
          )}

          {showCable && (
            <motion.line
              x1={B.x}
              y1={B.y}
              x2={B.x + (S_END.x - B.x) * cableLength}
              y2={B.y + (S_END.y - B.y) * cableLength}
              stroke={CABLE}
              strokeWidth="3.8"
              markerEnd="url(#ex-3s-cable)"
              initial={false}
              animate={{ opacity: showCable ? 1 : 0 }}
            />
          )}
          {showCable && (
            <text x={S_END.x + 6} y={S_END.y - 4} fontSize="12" fill={CABLE}>
              S = 2,31 kN
            </text>
          )}

          {showComponents && (
            <>
              <motion.line
                x1={A.x}
                y1={A.y}
                x2={AX_END.x}
                y2={AX_END.y}
                stroke={REACTION}
                strokeWidth="3.2"
                markerEnd="url(#ex-3s-r)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />
              <motion.line
                x1={A.x}
                y1={A.y}
                x2={AY_END.x}
                y2={AY_END.y}
                stroke={REACTION}
                strokeWidth="3.2"
                markerEnd="url(#ex-3s-r)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />
              <text x={AX_END.x + 20} y={A.y + 18} textAnchor="start" fontSize="10.5" fill={REACTION}>
                Ax = 1,15 kN
              </text>
              <text x={A.x + 8} y={AY_END.y + 2} fontSize="10.5" fill={REACTION}>
                Ay = 4,00 kN
              </text>
            </>
          )}

          {showResultant && (
            <>
              <motion.line
                x1={A.x}
                y1={A.y}
                x2={RA_END.x}
                y2={RA_END.y}
                stroke={REACTION}
                strokeWidth="4.4"
                markerEnd="url(#ex-3s-r)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />
              <text x={RA_END.x + 8} y={RA_END.y - 6} textAnchor="start" fontSize="12" fill={REACTION}>
                RA = 4,16 kN
              </text>
              <path
                d={`M ${A.x - 44} ${A.y} A 44 44 0 0 1 ${A.x - 44 * Math.cos((73.9 * Math.PI) / 180)} ${A.y - 44 * Math.sin((73.9 * Math.PI) / 180)}`}
                fill="none"
                stroke={REACTION}
                strokeWidth="1.6"
              />
              <text x={A.x - 66} y={A.y - 12} fontSize="10.5" fill={REACTION}>
                73,9°
              </text>
            </>
          )}

          {showConcurrency && (
            <>
              <g stroke={MUTED} strokeWidth="1.3" strokeDasharray="6 4" fill="none">
                <line x1={P.x} y1={P.y} x2={E.x} y2={E.y} />
                <line x1={B.x} y1={B.y} x2={E.x} y2={E.y} />
                <line x1={A.x} y1={A.y} x2={E.x} y2={E.y} />
              </g>
              <circle cx={E.x} cy={E.y} r="4" fill={MOMENT} />
              <text x={E.x + 10} y={E.y + 6} fontSize="12" fill={MOMENT}>
                E = (1; −3,46) m
              </text>
              <text x="230" y="426" textAnchor="middle" fontSize="12" fill={MOMENT}>
                Trzy proste działania przecinają się w E
              </text>
            </>
          )}

          {!showConcurrency && (
            <text x="230" y="426" textAnchor="middle" fontSize="12" fill={INK}>
              {showResultant ? 'Składowe reakcji składają się w RA' : 'Moment względem A eliminuje reakcję przegubu'}
            </text>
          )}
        </svg>
      </div>
    </div>
  )
}
