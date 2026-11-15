import { useId } from 'react'
import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'
import { pl } from '../../solution-factories/core/source-task'
import { SCHEMA, revealAt } from '../../../components/solution-figures/statics-schematic'

const G = 900
const ALPHA = 20
const BETA = 70
const RAD_A = (ALPHA * Math.PI) / 180
const RAD_B = (BETA * Math.PI) / 180
const N1 = (G * Math.sin(RAD_B)) / (Math.cos(RAD_A) * Math.sin(RAD_B) + Math.sin(RAD_A) * Math.cos(RAD_B))
const N2 = (N1 * Math.sin(RAD_A)) / Math.sin(RAD_B)

const R = 62
const C = { x: 230, y: 150 }
const N1_DIR = { x: Math.sin(RAD_A), y: -Math.cos(RAD_A) }
const N2_DIR = { x: -Math.sin(RAD_B), y: -Math.cos(RAD_B) }
const T1 = { x: Math.cos(RAD_A), y: Math.sin(RAD_A) }
const T2 = { x: -Math.cos(RAD_B), y: Math.sin(RAD_B) }
const P1 = { x: C.x - R * N1_DIR.x, y: C.y - R * N1_DIR.y }
const P2 = { x: C.x - R * N2_DIR.x, y: C.y - R * N2_DIR.y }
const V = { x: P1.x + R * T1.x, y: P1.y + R * T1.y }
const LEFT_END = { x: P1.x - 200 * T1.x, y: P1.y - 200 * T1.y }
const RIGHT_END = { x: V.x - 215 * T2.x, y: V.y - 215 * T2.y }

const LOAD = SCHEMA.load
const REACTION = SCHEMA.reaction
const INK = SCHEMA.ink
const MUTED = SCHEMA.muted
const EDGE = SCHEMA.edge
const OK = '#2f7d5b'

export function SolutionAnimation({ index, playing, sceneProgress }: SolutionAnimationProps) {
  const id = useId().replace(/[:]/g, '')
  const loadId = `f2-load-${id}`
  const reactionId = `f2-reaction-${id}`
  const reveal = revealAt(playing, sceneProgress)
  const showLoads = index >= 1
  const showN1Value = index >= 4
  const showN2Value = index >= 5
  const showCheck = index >= 7
  const n1End = { x: P1.x + 78 * N1_DIR.x, y: P1.y + 78 * N1_DIR.y }
  const n2End = { x: P2.x + 78 * N2_DIR.x, y: P2.y + 78 * N2_DIR.y }

  const status =
    [
      `Tarcza między ściankami: α = ${ALPHA}°, β = ${BETA}°, ciężar G = ${G} N, styki gładkie`,
      `Reakcje normalne: N₁ prostopadła do lewej ścianki, N₂ prostopadła do prawej ścianki`,
      `Kierunki normalnych: N₁ pod kątem ${90 - ALPHA}° do +x, N₂ pod kątem ${90 + BETA}° do +x`,
      `ΣF_x = 0: N₁ sinα − N₂ sinβ = 0; ΣF_y = 0: N₁ cosα + N₂ cosβ = G`,
      `N₁ = ${pl(N1)} N — lewa ścianka odpycha tarczę`,
      `N₂ = ${pl(N2)} N — prawa ścianka odpycha tarczę`,
      `N₁ > N₂, bo sinβ > sinα; obie reakcje są dodatnie, tarcza nie traci kontaktu`,
      `Kontrola: ΣF_x ≈ 0 i ΣF_y ≈ 0 po podstawieniu N₁ i N₂`,
    ][index] ?? ''

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg viewBox="0 0 460 340" role="img" aria-label="Tarcza między dwiema gładkimi ściankami">
          <title>Tarcza w klinie dwóch ścianek</title>
          <desc>
            Tarcza o ciężarze 900 N oparta o dwie gładkie ścianki nachylone pod kątami 20° i 70°, reakcje normalne N₁ i
            N₂ oraz kąty nachylenia ścianek.
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

          <g stroke={EDGE} strokeWidth="4" strokeLinecap="round">
            <line x1={LEFT_END.x} y1={LEFT_END.y} x2={V.x} y2={V.y} />
            <line x1={V.x} y1={V.y} x2={RIGHT_END.x} y2={RIGHT_END.y} />
          </g>
          <g stroke={EDGE} strokeWidth="1.1" opacity="0.45">
            <line x1={LEFT_END.x} y1={LEFT_END.y} x2={V.x - 4} y2={V.y - 2} />
            <line x1={V.x + 2} y1={V.y - 4} x2={RIGHT_END.x} y2={RIGHT_END.y} />
          </g>

          <circle cx={C.x} cy={C.y} r={R} fill="#dfe7ff" stroke={EDGE} strokeWidth="1.8" />
          <circle cx={C.x} cy={C.y} r="3" fill={EDGE} />

          <g stroke={MUTED} strokeWidth="1" strokeDasharray="5 4">
            <line x1={V.x - 48} y1={V.y} x2={V.x + 54} y2={V.y} />
          </g>
          <path
            d={`M ${V.x - 36} ${V.y} A 36 36 0 0 1 ${V.x - 33.829} ${V.y - 12.311}`}
            fill="none"
            stroke={MUTED}
            strokeWidth="1.2"
          />
          <path
            d={`M ${V.x + 36} ${V.y} A 36 36 0 0 0 ${V.x + 12.311} ${V.y - 33.829}`}
            fill="none"
            stroke={MUTED}
            strokeWidth="1.2"
          />

          {showLoads && (
            <motion.g initial={false} animate={{ opacity: reveal }} transition={{ duration: 0.25 }}>
              <motion.line
                x1={C.x}
                y1={C.y}
                x2={C.x}
                y2="220"
                stroke={LOAD}
                strokeWidth="3.2"
                strokeLinecap="round"
                markerEnd={`url(#${loadId})`}
                initial={false}
                animate={playing ? { opacity: [0.65, 1, 0.65] } : { opacity: 1 }}
                transition={playing ? { duration: 1.8, repeat: Number.POSITIVE_INFINITY } : { duration: 0.2 }}
              />
              <motion.line
                x1={P1.x}
                y1={P1.y}
                x2={n1End.x}
                y2={n1End.y}
                stroke={REACTION}
                strokeWidth="3"
                strokeLinecap="round"
                markerEnd={`url(#${reactionId})`}
                initial={false}
                animate={playing ? { opacity: [0.6, 1, 0.6] } : { opacity: 1 }}
                transition={playing ? { duration: 2, repeat: Number.POSITIVE_INFINITY } : { duration: 0.2 }}
              />
              <motion.line
                x1={P2.x}
                y1={P2.y}
                x2={n2End.x}
                y2={n2End.y}
                stroke={REACTION}
                strokeWidth="3"
                strokeLinecap="round"
                markerEnd={`url(#${reactionId})`}
                initial={false}
                animate={playing ? { opacity: [0.6, 1, 0.6] } : { opacity: 1 }}
                transition={playing ? { duration: 2, repeat: Number.POSITIVE_INFINITY } : { duration: 0.2 }}
              />
            </motion.g>
          )}

          <g fontSize="9.5" fill={MUTED}>
            <text x={V.x - 50} y={V.y + 13} textAnchor="end">
              α = {ALPHA}°
            </text>
            <text x={V.x + 45} y={V.y - 27}>
              β = {BETA}°
            </text>
            <text x={C.x + 6} y={C.y + 14}>
              O
            </text>
          </g>

          {showLoads && (
            <g fontSize="9.5" fontWeight="600">
              <text x="190" y="224" textAnchor="end" fill={REACTION}>
                {showN1Value ? `N₁ = ${pl(N1)} N` : 'N₁'}
              </text>
              <text x="302" y="186" fill={REACTION}>
                {showN2Value ? `N₂ = ${pl(N2)} N` : 'N₂'}
              </text>
              <text x={C.x + 8} y="214" fill={LOAD}>
                G = {G} N
              </text>
            </g>
          )}

          {index === 3 && (
            <g fontSize="9" fill={SCHEMA.accent} fontWeight="600">
              <text x="16" y="28">
                ΣF_x = N₁ sinα − N₂ sinβ = 0
              </text>
              <text x="16" y="44">
                ΣF_y = N₁ cosα + N₂ cosβ − G = 0
              </text>
            </g>
          )}
          {index === 6 && (
            <text x="16" y="28" fill={SCHEMA.accent} fontSize="9" fontWeight="600">
              N₁/N₂ = sinβ/sinα = {pl(Math.sin(RAD_B) / Math.sin(RAD_A))}
            </text>
          )}
          {showCheck && (
            <text x="16" y="28" fill={OK} fontSize="9" fontWeight="600">
              Kontrola: ΣF_x ≈ 0, ΣF_y ≈ 0
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
