import { useId } from 'react'
import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'
import { pl } from '../core/source-task'
import { SCHEMA, revealAt } from '../../../components/solution-figures/statics-schematic'

const G = 600
const L = 2
const ALPHA = 30
const RAD = (ALPHA * Math.PI) / 180
const N = (G * Math.tan(RAD)) / 2
const AX = N
const AY = G

const S = 105
const A = { x: 150, y: 270 }
const B = { x: A.x + L * Math.sin(RAD) * S, y: A.y - L * Math.cos(RAD) * S }
const M = { x: (A.x + B.x) / 2, y: (A.y + B.y) / 2 }
const LOAD = SCHEMA.load
const REACTION = SCHEMA.reaction
const INK = SCHEMA.ink
const MUTED = SCHEMA.muted
const EDGE = SCHEMA.edge
const OK = '#2f7d5b'

export function SolutionAnimation({ index, playing, sceneProgress }: SolutionAnimationProps) {
  const id = useId().replace(/[:]/g, '')
  const loadId = `f1-load-${id}`
  const reactionId = `f1-reaction-${id}`
  const reveal = revealAt(playing, sceneProgress)
  const showLoads = index >= 1
  const showNValue = index >= 3
  const showAx = index >= 4
  const showAy = index >= 5
  const showCheck = index >= 7
  const alphaDir = { x: (A.x - B.x) / (L * S), y: (A.y - B.y) / (L * S) }
  const alphaEnd = {
    x: B.x + 34 * alphaDir.x,
    y: B.y + 34 * alphaDir.y,
  }
  const alphaStart = { x: B.x, y: B.y + 34 }

  const status =
    [
      `Pręt L = ${L} m oparty dolnym końcem A o przegub i górnym B o pionową ścianę; α = ${ALPHA}°`,
      `Ciężar G = ${G} N w połowie długości, reakcja ściany N prostopadła do ściany (w lewo)`,
      `Ramiona względem A: N ma L cosα = ${pl(L * Math.cos(RAD))} m, G ma (L/2) sinα = ${pl((L / 2) * Math.sin(RAD))} m`,
      `ΣM_A = 0: N·${pl(L * Math.cos(RAD))} = ${G}·${pl((L / 2) * Math.sin(RAD))} ⇒ N = ${pl(N)} N`,
      `ΣF_x = 0: A_x = N = ${pl(AX)} N — reakcja przegubu w prawo`,
      `ΣF_y = 0: A_y = G = ${pl(AY)} N — reakcja przegubu do góry`,
      `Znaki: N w lewo, A_x w prawo, A_y do góry; wszystkie wartości dodatnie w przyjętych zwrotach`,
      `Kontrola ΣM_B = 0: A_x i A_y oraz G dają moment wypadkowy ≈ 0`,
    ][index] ?? ''

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg viewBox="0 0 460 340" role="img" aria-label="Pręt oparty o ścianę — ciężar i reakcje">
          <title>Pręt AB oparty o pionową ścianę</title>
          <desc>
            Pręt o długości 2 m pod kątem 30° do ściany, ciężar 600 N w połowie długości, reakcja ściany N oraz składowe
            reakcji przegubu A_x i A_y.
          </desc>
          <defs>
            <marker id={loadId} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0 0L10 5L0 10Z" fill={LOAD} />
            </marker>
            <marker
              id={reactionId}
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={REACTION} />
            </marker>
          </defs>

          <g stroke={EDGE} strokeWidth="3">
            <line x1={B.x} y1="35" x2={B.x} y2="270" />
            {Array.from({ length: 9 }, (_, step) => {
              const y = 45 + step * 26
              return (
                <line key={`wall-${step}`} x1={B.x} y1={y} x2={B.x + 11} y2={y + 8} strokeWidth="1.2" opacity="0.7" />
              )
            })}
            <line x1="80" y1="270" x2="430" y2="270" />
            {Array.from({ length: 11 }, (_, step) => {
              const x = 90 + step * 33
              return <line key={`ground-${step}`} x1={x} y1="270" x2={x - 8} y2="278" strokeWidth="1.2" opacity="0.7" />
            })}
          </g>

          <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke={EDGE} strokeWidth="5" strokeLinecap="round" />

          <g stroke={SCHEMA.support} fill="none" strokeWidth="1.8" strokeLinejoin="round">
            <path d={`M ${A.x - 11} ${A.y + 18} L ${A.x} ${A.y} L ${A.x + 11} ${A.y + 18} Z`} />
            <line x1={A.x - 15} y1={A.y + 18} x2={A.x + 15} y2={A.y + 18} />
            <line x1={A.x - 15} y1={A.y + 18} x2={A.x - 24} y2={A.y + 27} strokeWidth="1.1" />
            <line x1={A.x - 7} y1={A.y + 18} x2={A.x - 16} y2={A.y + 27} strokeWidth="1.1" />
            <line x1={A.x + 1} y1={A.y + 18} x2={A.x - 8} y2={A.y + 27} strokeWidth="1.1" />
            <line x1={A.x + 9} y1={A.y + 18} x2={A.x} y2={A.y + 27} strokeWidth="1.1" />
          </g>

          <g stroke={MUTED} strokeWidth="1">
            <line x1="70" y1={B.y} x2="70" y2={A.y} />
            <line x1="66" y1={B.y} x2="74" y2={B.y} />
            <line x1="66" y1={A.y} x2="74" y2={A.y} />
            <line x1="150" y1="300" x2={B.x} y2="300" />
            <line x1="150" y1="296" x2="150" y2="304" />
            <line x1={B.x} y1="296" x2={B.x} y2="304" />
            <path
              d={`M ${alphaStart.x} ${alphaStart.y} A 34 34 0 0 1 ${alphaEnd.x} ${alphaEnd.y}`}
              fill="none"
              stroke={MUTED}
            />
          </g>

          {showLoads && (
            <motion.g initial={false} animate={{ opacity: reveal }} transition={{ duration: 0.25 }}>
              <motion.line
                x1={M.x}
                y1={M.y}
                x2={M.x}
                y2="245"
                stroke={LOAD}
                strokeWidth="3.4"
                strokeLinecap="round"
                markerEnd={`url(#${loadId})`}
                initial={false}
                animate={playing ? { opacity: [0.65, 1, 0.65] } : { opacity: 1 }}
                transition={playing ? { duration: 1.8, repeat: Number.POSITIVE_INFINITY } : { duration: 0.2 }}
              />
              <motion.line
                x1={B.x}
                y1={B.y}
                x2="205"
                y2={B.y}
                stroke={REACTION}
                strokeWidth="3.2"
                strokeLinecap="round"
                markerEnd={`url(#${reactionId})`}
                initial={false}
                animate={{ opacity: 1 }}
              />
            </motion.g>
          )}

          {showAx && (
            <motion.line
              x1={A.x}
              y1={A.y}
              x2="210"
              y2={A.y}
              stroke={REACTION}
              strokeWidth="3.2"
              strokeLinecap="round"
              markerEnd={`url(#${reactionId})`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
            />
          )}

          {showAy && (
            <motion.line
              x1={A.x}
              y1={A.y}
              x2={A.x}
              y2="213"
              stroke={REACTION}
              strokeWidth="3.2"
              strokeLinecap="round"
              markerEnd={`url(#${reactionId})`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
            />
          )}

          <g fontSize="10" fill={INK} fontWeight="600">
            <text x={A.x - 8} y={A.y + 38} textAnchor="end" fontSize="11">
              A
            </text>
            <text x={B.x + 8} y={B.y - 6} fontSize="11">
              B
            </text>
          </g>

          <g fontSize="9.5" fill={MUTED}>
            <text x="80" y={182}>
              L cosα = {pl(L * Math.cos(RAD))} m
            </text>
            <text x={B.x / 2 + A.x / 2 - 8} y="296" textAnchor="middle">
              L sinα = {pl(L * Math.sin(RAD))} m
            </text>
            <text x="140" y="226" textAnchor="end">
              L = {L} m
            </text>
            <text x={alphaEnd.x - 8} y={alphaEnd.y + 22} textAnchor="end">
              α = {ALPHA}°
            </text>
          </g>

          {showLoads && (
            <g fontSize="9.5" fontWeight="600">
              <text x={M.x + 10} y="240" fill={LOAD}>
                G = {G} N
              </text>
              <text x="200" y="80" textAnchor="end" fill={REACTION}>
                {showNValue ? `N = ${pl(N)} N` : 'N'}
              </text>
            </g>
          )}

          {showAx && (
            <text x="214" y="264" fill={REACTION} fontSize="9.5" fontWeight="600">
              A_x = {pl(AX)} N
            </text>
          )}

          {showAy && (
            <text x={A.x + 10} y="208" fill={REACTION} fontSize="9.5" fontWeight="600">
              A_y = {pl(AY)} N
            </text>
          )}

          {index === 2 && (
            <text x="16" y="36" fill={SCHEMA.accent} fontSize="9" fontWeight="600">
              ΣM_A = 0: N·L cosα − G·(L/2) sinα = 0
            </text>
          )}
          {index === 4 && (
            <text x="16" y="36" fill={SCHEMA.accent} fontSize="9" fontWeight="600">
              ΣF_x = 0: A_x − N = 0 ⇒ A_x = N
            </text>
          )}
          {index === 6 && (
            <text x="16" y="36" fill={SCHEMA.accent} fontSize="9" fontWeight="600">
              N w lewo, A_x w prawo, A_y do góry
            </text>
          )}
          {showCheck && (
            <text x="16" y="36" fill={OK} fontSize="9" fontWeight="600">
              Kontrola: ΣM_B = 0 z udziałem A_x, A_y i G
            </text>
          )}

          <text x="230" y="328" textAnchor="middle" fontSize="9.3" fill={showCheck ? OK : INK}>
            {status}
          </text>
        </svg>
      </div>
    </div>
  )
}
