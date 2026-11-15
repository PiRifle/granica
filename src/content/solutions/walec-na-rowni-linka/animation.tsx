import { useId } from 'react'
import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'
import { pl } from '../../solution-factories/core/source-task'
import { SCHEMA, revealAt } from '../../../components/solution-figures/statics-schematic'

const G = 100
const ALPHA = 30
const RAD = (ALPHA * Math.PI) / 180
const T = G * Math.sin(RAD)
const N = G * Math.cos(RAD)

const R = 45
const P0 = { x: 80, y: 274 }
const P3 = { x: 410, y: 83 }
const C = { x: 237.5, y: 131 }
const P = { x: C.x + R * Math.sin(RAD), y: C.y + R * Math.cos(RAD) }
const NORMAL = { x: -Math.sin(RAD), y: -Math.cos(RAD) }
const SLOPE = { x: Math.cos(RAD), y: -Math.sin(RAD) }
const N_END = { x: P.x + 78 * NORMAL.x, y: P.y + 78 * NORMAL.y }
const T_END = { x: C.x + 95 * SLOPE.x, y: C.y + 95 * SLOPE.y }

const LOAD = SCHEMA.load
const REACTION = SCHEMA.reaction
const INK = SCHEMA.ink
const MUTED = SCHEMA.muted
const EDGE = SCHEMA.edge
const OK = '#2f7d5b'

export function SolutionAnimation({ index, playing, sceneProgress }: SolutionAnimationProps) {
  const id = useId().replace(/[:]/g, '')
  const loadId = `f3-load-${id}`
  const reactionId = `f3-reaction-${id}`
  const ropeId = `f3-rope-${id}`
  const reveal = revealAt(playing, sceneProgress)
  const showLoads = index >= 1
  const showRope = index >= 2
  const showTValue = index >= 4
  const showNValue = index >= 5
  const showCheck = index >= 7

  const status =
    [
      `Walec na gładkiej równi o kącie α = ${ALPHA}°; ciężar G = ${G} N, linka równoległa do równi`,
      `Reakcja równi N jest prostopadła do powierzchni, ciężar G działa pionowo w dół`,
      `Napięcie linki T działa wzdłuż równi, w górę zbocza; linka jest równoległa do powierzchni`,
      `Rozkład ciężaru: G sinα = ${pl(T)} N wzdłuż równi, G cosα = ${pl(N)} N prostopadle do równi`,
      `ΣF_∥ = 0: T = G sinα = ${pl(T)} N — linka przejmuje składową równoległą`,
      `ΣF_⊥ = 0: N = G cosα = ${pl(N)} N — równia przejmuje składową prostopadłą`,
      `T > 0 — linka jest naprężona; N > 0 — walec nie traci kontaktu z równią`,
      `Kontrola w układzie x–y: ΣF_x ≈ 0 i ΣF_y ≈ 0 po podstawieniu T i N`,
    ][index] ?? ''

  const hatch = Array.from({ length: 17 }, (_, step) => {
    const t = (step + 0.5) / 17
    const surface = { x: P0.x + (P3.x - P0.x) * t, y: P0.y + (P3.y - P0.y) * t }
    return {
      x1: surface.x,
      y1: surface.y,
      x2: surface.x + 12 * Math.sin(RAD),
      y2: surface.y + 12 * Math.cos(RAD),
    }
  })

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg viewBox="0 0 460 340" role="img" aria-label="Walec na równi z linką równoległą do równi">
          <title>Walec na gładkiej równi</title>
          <desc>
            Walec o ciężarze 100 N na równi o kącie 30°, reakcja normalna N, napięcie linki T równoległe do równi oraz
            składowe ciężaru wzdłuż i prostopadle do zbocza.
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
            <marker id={ropeId} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0 0L10 5L0 10Z" fill={SCHEMA.tension} />
            </marker>
          </defs>

          <g stroke={EDGE} strokeWidth="3" strokeLinecap="round">
            <line x1={P0.x} y1={P0.y} x2={P3.x} y2={P3.y} />
          </g>
          <g stroke={EDGE} strokeWidth="1.1" opacity="0.45">
            {hatch.map((line, step) => (
              <line key={`hatch-${step}`} x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2} />
            ))}
          </g>

          <g stroke={MUTED} strokeWidth="1">
            <line x1={P0.x} y1={P0.y} x2="235" y2={P0.y} strokeDasharray="5 4" />
            <path d={`M 128 ${P0.y} A 48 48 0 0 0 121.57 250`} fill="none" stroke={MUTED} />
          </g>

          <circle cx={C.x} cy={C.y} r={R} fill="#dfe7ff" stroke={EDGE} strokeWidth="1.8" />
          <line x1={C.x} y1={C.y} x2={P.x} y2={P.y} stroke={MUTED} strokeWidth="1" strokeDasharray="4 3" />
          <circle cx={C.x} cy={C.y} r="3" fill={EDGE} />

          {showLoads && (
            <motion.g initial={false} animate={{ opacity: reveal }} transition={{ duration: 0.25 }}>
              <motion.line
                x1={C.x}
                y1={C.y}
                x2={C.x}
                y2="205"
                stroke={LOAD}
                strokeWidth="3.2"
                strokeLinecap="round"
                markerEnd={`url(#${loadId})`}
                initial={false}
                animate={playing ? { opacity: [0.65, 1, 0.65] } : { opacity: 1 }}
                transition={playing ? { duration: 1.8, repeat: Number.POSITIVE_INFINITY } : { duration: 0.2 }}
              />
              <motion.line
                x1={P.x}
                y1={P.y}
                x2={N_END.x}
                y2={N_END.y}
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

          {showRope && (
            <motion.line
              x1={C.x}
              y1={C.y}
              x2={T_END.x}
              y2={T_END.y}
              stroke={SCHEMA.tension}
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeDasharray="9 5"
              markerEnd={`url(#${ropeId})`}
              initial={false}
              animate={playing ? { strokeDashoffset: [0, -28] } : { strokeDashoffset: 0 }}
              transition={
                playing ? { duration: 1.4, repeat: Number.POSITIVE_INFINITY, ease: 'linear' } : { duration: 0.2 }
              }
            />
          )}

          <g fontSize="9.5" fill={MUTED}>
            <text x="140" y="266">
              α = {ALPHA}°
            </text>
            <text x={C.x + 8} y={C.y + 14}>
              O
            </text>
          </g>

          {showLoads && (
            <g fontSize="9.5" fontWeight="600">
              <text x={C.x + 10} y="200" fill={LOAD}>
                G = {G} N
              </text>
              <text x="215" y="96" textAnchor="end" fill={REACTION}>
                {showNValue ? `N = ${pl(N)} N` : 'N'}
              </text>
            </g>
          )}

          {showRope && (
            <text x={T_END.x + 6} y={T_END.y - 5} fill={SCHEMA.tension} fontSize="9.5" fontWeight="600">
              {showTValue ? `T = ${pl(T)} N` : 'T'}
            </text>
          )}

          {index === 3 && (
            <text x="16" y="30" fill={SCHEMA.accent} fontSize="9" fontWeight="600">
              G sinα = {pl(T)} N, G cosα = {pl(N)} N
            </text>
          )}
          {index === 6 && (
            <text x="16" y="30" fill={SCHEMA.accent} fontSize="9" fontWeight="600">
              Linka naprężona, walec pozostaje w kontakcie z równią
            </text>
          )}
          {showCheck && (
            <text x="16" y="30" fill={OK} fontSize="9" fontWeight="600">
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
