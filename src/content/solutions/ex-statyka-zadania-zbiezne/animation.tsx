import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const BAR = '#ff8a5c'
const LOAD = '#ff6b45'
const REACTION = '#2f7d5b'
const MOMENT = '#a970dd'
const EDGE = '#68727e'
const MUTED = '#87929d'
const INK = '#17202a'
const LIGHT = '#e8eef8'

const A = { x: 130, y: 130 }
const B = { x: 330, y: 130 }
const P = { x: 230, y: 130 }
const D = { x: 400, y: 60 }
const E = { x: 230, y: 230 }
const S_SCALE = 5.8
const R_SCALE = 4.5
const S_END = {
  x: B.x + 16.97 * S_SCALE * Math.cos((45 * Math.PI) / 180),
  y: B.y - 16.97 * S_SCALE * Math.sin((45 * Math.PI) / 180),
}
const AX_END = { x: A.x - 12 * R_SCALE, y: A.y }
const AY_END = { x: A.x, y: A.y - 12 * R_SCALE }
const RA_END = { x: A.x - 12 * R_SCALE, y: A.y - 12 * R_SCALE }

export function FullConcurrentTaskAnimation({ index, playing, sceneProgress }: SolutionAnimationProps) {
  const grow = playing ? Math.min(1, 0.2 + sceneProgress * 1.6) : 1
  const showMoment = index >= 1
  const showBar = index >= 1
  const showComponents = index >= 3
  const showResultant = index >= 4
  const showConcurrency = index === 5
  const barLength = showBar ? (index >= 2 ? 1 : grow) : 0
  const reactionLength = showComponents ? 1 : 0

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg viewBox="0 0 460 360" role="img" aria-label="Belka z przegubem i prętem dwusiłowym">
          <title>Belka AB z prętem BD</title>
          <desc>Belka, obciążenie, pręt dwusiłowy, składowe reakcji, wypadkowa reakcja i punkt zbiegu trzech sił.</desc>
          <defs>
            <marker
              id="ex-fc-load"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={LOAD} />
            </marker>
            <marker id="ex-fc-bar" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0 0L10 5L0 10Z" fill={BAR} />
            </marker>
            <marker id="ex-fc-r" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0 0L10 5L0 10Z" fill={REACTION} />
            </marker>
            <marker id="ex-fc-m" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0 0L10 5L0 10Z" fill={MOMENT} />
            </marker>
          </defs>

          <g stroke={EDGE} strokeWidth="2">
            <line x1="60" y1="24" x2="60" y2="286" />
            <line x1="60" y1="44" x2="44" y2="32" />
            <line x1="60" y1="74" x2="44" y2="62" />
            <line x1="60" y1="104" x2="44" y2="92" />
            <line x1="60" y1="134" x2="44" y2="122" />
            <line x1="60" y1="164" x2="44" y2="152" />
            <line x1="60" y1="194" x2="44" y2="182" />
            <line x1="60" y1="224" x2="44" y2="212" />
            <line x1="60" y1="254" x2="44" y2="242" />
          </g>

          <rect x={A.x - 9} y={A.y - 7} width="18" height="14" rx="3" fill={LIGHT} stroke={EDGE} strokeWidth="2" />
          <circle cx={A.x} cy={A.y} r="4" fill={EDGE} />
          <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke={EDGE} strokeWidth="6" strokeLinecap="round" />
          <line x1={B.x} y1={B.y} x2={D.x} y2={D.y} stroke={BAR} strokeWidth="2.6" />
          <text x={D.x + 6} y={D.y - 2} fontSize="11" fill={BAR}>
            D
          </text>
          <text x={A.x + 4} y={A.y + 24} fontSize="12" fill={INK}>
            A
          </text>
          <text x={B.x + 4} y={B.y + 24} fontSize="12" fill={INK}>
            B
          </text>
          <text x={(B.x + D.x) / 2 + 8} y={(B.y + D.y) / 2 - 4} fontSize="10.5" fill={BAR}>
            BD
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
            L = 2 m
          </text>

          <motion.line
            x1={P.x}
            y1={P.y - 56}
            x2={P.x}
            y2={P.y - 56 + 56 * (index === 0 ? grow : 1)}
            stroke={LOAD}
            strokeWidth="3.6"
            markerEnd="url(#ex-fc-load)"
            initial={false}
            animate={{ opacity: 1 }}
          />
          <text x={P.x + 10} y={P.y - 48} fontSize="12" fill={LOAD}>
            P = 24 kN
          </text>

          {showMoment && (
            <>
              <g stroke={MOMENT} strokeWidth="1.4" strokeDasharray="6 4" fill="none">
                <line x1={A.x} y1={A.y} x2={E.x} y2={E.y} />
                <line x1={B.x} y1={B.y} x2={E.x} y2={E.y} />
              </g>
              <circle cx={A.x} cy={A.y} r="12" fill="none" stroke={MOMENT} strokeWidth="1.6" />
              <path
                d={`M ${A.x + 12} ${A.y} A 12 12 0 0 1 ${A.x + 6} ${A.y + 10}`}
                fill="none"
                stroke={MOMENT}
                strokeWidth="1.6"
              />
              <text x={(A.x + E.x) / 2 + 8} y={(A.y + E.y) / 2 - 6} fontSize="10.5" fill={MOMENT}>
                L sin45° = 1,41 m
              </text>
            </>
          )}

          {showBar && (
            <motion.line
              x1={B.x}
              y1={B.y}
              x2={B.x + (S_END.x - B.x) * barLength}
              y2={B.y + (S_END.y - B.y) * barLength}
              stroke={BAR}
              strokeWidth="3.8"
              markerEnd="url(#ex-fc-bar)"
              initial={false}
              animate={{ opacity: showBar ? 1 : 0 }}
            />
          )}
          {showBar && (
            <text x={S_END.x - 4} y={S_END.y - 10} textAnchor="end" fontSize="12" fill={BAR}>
              S = 16,97 kN
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
                markerEnd="url(#ex-fc-r)"
                initial={{ opacity: 0 }}
                animate={{ opacity: reactionLength }}
              />
              <motion.line
                x1={A.x}
                y1={A.y}
                x2={AY_END.x}
                y2={AY_END.y}
                stroke={REACTION}
                strokeWidth="3.2"
                markerEnd="url(#ex-fc-r)"
                initial={{ opacity: 0 }}
                animate={{ opacity: reactionLength }}
              />
              <text x={AX_END.x + 20} y={A.y + 18} textAnchor="start" fontSize="10.5" fill={REACTION}>
                Ax = 12,0 kN
              </text>
              <text x={A.x + 8} y={AY_END.y + 2} fontSize="10.5" fill={REACTION}>
                Ay = 12,0 kN
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
                markerEnd="url(#ex-fc-r)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />
              <text x={RA_END.x + 8} y={RA_END.y - 6} textAnchor="start" fontSize="12" fill={REACTION}>
                RA = 16,97 kN
              </text>
              <path
                d={`M ${A.x - 40} ${A.y} A 40 40 0 0 1 ${A.x - 40 * Math.cos((45 * Math.PI) / 180)} ${A.y - 40 * Math.sin((45 * Math.PI) / 180)}`}
                fill="none"
                stroke={REACTION}
                strokeWidth="1.6"
              />
              <text x={A.x - 60} y={A.y - 10} fontSize="10.5" fill={REACTION}>
                45°
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
                E = (1; −1) m
              </text>
              <text x="230" y="334" textAnchor="middle" fontSize="12" fill={MOMENT}>
                Proste P, BD i AE przecinają się w E
              </text>
            </>
          )}

          {!showConcurrency && (
            <text x="230" y="334" textAnchor="middle" fontSize="12" fill={INK}>
              {showResultant ? 'Reakcja RA symetryczna do kierunku pręta' : 'Moment względem A daje siłę w pręcie'}
            </text>
          )}
        </svg>
      </div>
    </div>
  )
}
