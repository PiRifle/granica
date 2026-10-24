import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const LATERAL = '#ff6b45'
const MUTED = '#87929d'
const INK = '#17202a'
const OK = '#2e9e6b'

const FRONT_X = 88
const FRONT_Y = 104
const W0 = 190
const H0 = 78
const DX0 = 34
const DY0 = -25

const ZOOM_X = 360
const ZOOM_W = 62
const ZOOM_CY = 132
const ZOOM_H0 = 92

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}

type Point = [number, number]

const polygon = (points: Point[]) => points.map(([x, y]) => `${x},${y}`).join(' ')

function boxPoints(w: number, h: number, dx: number, dy: number) {
  const a: Point = [FRONT_X, FRONT_Y]
  const b: Point = [FRONT_X + w, FRONT_Y]
  const c: Point = [FRONT_X + w, FRONT_Y + h]
  const d: Point = [FRONT_X, FRONT_Y + h]
  const av: Point = [a[0] + dx, a[1] + dy]
  const bv: Point = [b[0] + dx, b[1] + dy]
  const cv: Point = [c[0] + dx, c[1] + dy]
  const dv: Point = [d[0] + dx, d[1] + dy]
  return {
    front: polygon([a, b, c, d]),
    top: polygon([a, b, bv, av]),
    side: polygon([b, c, cv, bv]),
    backLeft: polygon([av, bv, cv, dv]),
  }
}

export function PoissonExample2Animation({ scene, index, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const p = playing ? clamp01(sceneProgress) : 1
  const deform = smooth(p)

  const w = W0 * (1 + 0.12 * deform)
  const h = H0 * (1 + 0.06 * deform)
  const dx = DX0 * (1 - 0.3 * deform)
  const dy = DY0 * (1 - 0.3 * deform)
  const thickness = ZOOM_H0 * (1 - 0.3 * deform)

  const original = boxPoints(W0, H0, DX0, DY0)
  const deformed = boxPoints(w, h, dx, dy)
  const bottomEdge = FRONT_Y + h
  const midX = FRONT_X + w / 2
  const midY = FRONT_Y + h / 2

  const showStress = metric === 'stress' || metric === 'check'
  const showStrain = metric === 'model' || metric === 'sum' || metric === 'ratio'
  const showThicknessDetail = metric === 'ratio' || metric === 'thickness' || metric === 'check'

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 300"
          role="img"
          aria-label="Stalowa blacha w płaskim stanie naprężenia. Animacja pokazuje jednoczesne rozciąganie w płaszczyźnie i powiększony poglądowo skurcz grubości."
        >
          <defs>
            <marker
              id="p2-strain"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={ACCENT} />
            </marker>
            <marker
              id="p2-stress"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={LATERAL} />
            </marker>
          </defs>

          <text x={14} y={18} fontSize={10.5} fontWeight={700} fill={INK}>
            blacha: płaski stan naprężenia
          </text>
          <text x={14} y={33} fontSize={8.5} fill={MUTED}>
            σ_z = 0 · ε_x = 800 με · ε_y = 400 με · ν = 0,30
          </text>

          <polygon
            points={original.top}
            fill="none"
            stroke={MUTED}
            strokeWidth={1.1}
            strokeDasharray="4 4"
            opacity={0.7}
          />
          <polygon
            points={original.side}
            fill="none"
            stroke={MUTED}
            strokeWidth={1.1}
            strokeDasharray="4 4"
            opacity={0.7}
          />
          <polygon
            points={original.front}
            fill="none"
            stroke={MUTED}
            strokeWidth={1.1}
            strokeDasharray="4 4"
            opacity={0.7}
          />

          <polygon points={deformed.top} fill={ACCENT} fillOpacity={0.06} stroke={ACCENT} strokeWidth={1.4} />
          <polygon
            points={deformed.side}
            fill={showThicknessDetail ? LATERAL : ACCENT}
            fillOpacity={0.12}
            stroke={showThicknessDetail ? LATERAL : ACCENT}
            strokeWidth={1.4}
          />
          <polygon
            points={deformed.front}
            fill={ACCENT}
            fillOpacity={showStress ? 0.1 : 0.16}
            stroke={ACCENT}
            strokeWidth={2}
          />

          <text x={FRONT_X + 8} y={FRONT_Y + 18} fontSize={8.5} fill={MUTED}>
            płaszczyzna x–y
          </text>
          <text
            x={FRONT_X + w + dx + 8}
            y={FRONT_Y + dy + 14}
            fontSize={8.5}
            fill={showThicknessDetail ? LATERAL : MUTED}
          >
            grubość z
          </text>

          {showStress && (
            <g stroke={LATERAL} fill={LATERAL}>
              <line
                x1={midX - 32}
                y1={bottomEdge + 18}
                x2={midX + 32}
                y2={bottomEdge + 18}
                strokeWidth={2}
                markerEnd="url(#p2-stress)"
              />
              <text x={midX - 42} y={bottomEdge + 14} fontSize={9} stroke="none">
                σ_x
              </text>
              <line
                x1={FRONT_X - 18}
                y1={midY - 26}
                x2={FRONT_X - 18}
                y2={midY + 26}
                strokeWidth={2}
                markerEnd="url(#p2-stress)"
              />
              <text x={FRONT_X - 24} y={midY - 32} fontSize={9} textAnchor="end" stroke="none">
                σ_y
              </text>
              <text x={FRONT_X + 8} y={bottomEdge - 8} fontSize={8.5} stroke="none" fill={LATERAL}>
                σ_z = 0 na swobodnych powierzchniach
              </text>
              {metric === 'check' && (
                <>
                  <text x={midX + 40} y={bottomEdge + 14} fontSize={8.5} stroke="none" fill={LATERAL}>
                    202,20 MPa
                  </text>
                  <text x={FRONT_X - 24} y={midY + 36} fontSize={8.5} textAnchor="end" stroke="none" fill={LATERAL}>
                    140,66 MPa
                  </text>
                </>
              )}
            </g>
          )}

          {showStrain && (
            <g stroke={ACCENT} fill={ACCENT}>
              <line
                x1={midX - 26}
                y1={bottomEdge + 18}
                x2={midX + 26}
                y2={bottomEdge + 18}
                strokeWidth={1.8}
                markerEnd="url(#p2-strain)"
              />
              <text x={midX - 38} y={bottomEdge + 14} fontSize={9} stroke="none">
                ε_x = 800 με
              </text>
              <line
                x1={FRONT_X - 18}
                y1={midY - 22}
                x2={FRONT_X - 18}
                y2={midY + 22}
                strokeWidth={1.8}
                markerEnd="url(#p2-strain)"
              />
              <text x={FRONT_X - 24} y={midY - 28} fontSize={9} textAnchor="end" stroke="none">
                ε_y = 400 με
              </text>
              {metric === 'sum' && (
                <text
                  x={midX}
                  y={bottomEdge + 38}
                  textAnchor="middle"
                  fontSize={9}
                  fontWeight={700}
                  fill={OK}
                  stroke="none"
                >
                  ε_x + ε_y = 1200 με
                </text>
              )}
            </g>
          )}

          <text x={ZOOM_X + ZOOM_W / 2} y={72} textAnchor="middle" fontSize={9} fill={MUTED}>
            przekrój przez grubość
          </text>
          <rect
            x={ZOOM_X}
            y={ZOOM_CY - ZOOM_H0 / 2}
            width={ZOOM_W}
            height={ZOOM_H0}
            rx={3}
            fill="none"
            stroke={MUTED}
            strokeWidth={1.2}
            strokeDasharray="4 4"
          />
          <motion.rect
            x={ZOOM_X}
            y={ZOOM_CY - thickness / 2}
            width={ZOOM_W}
            height={thickness}
            rx={3}
            fill={LATERAL}
            fillOpacity={0.14}
            stroke={LATERAL}
            strokeWidth={2}
            initial={false}
            animate={{ y: ZOOM_CY - thickness / 2, height: thickness }}
            transition={{ duration: 0.12, ease: 'linear' }}
          />
          <line
            x1={ZOOM_X + ZOOM_W + 8}
            y1={ZOOM_CY - ZOOM_H0 / 2}
            x2={ZOOM_X + ZOOM_W + 8}
            y2={ZOOM_CY + ZOOM_H0 / 2}
            stroke={MUTED}
            strokeWidth={1.1}
          />
          <line
            x1={ZOOM_X + ZOOM_W + 3}
            y1={ZOOM_CY - ZOOM_H0 / 2}
            x2={ZOOM_X + ZOOM_W + 13}
            y2={ZOOM_CY - ZOOM_H0 / 2}
            stroke={MUTED}
            strokeWidth={1.1}
          />
          <line
            x1={ZOOM_X + ZOOM_W + 3}
            y1={ZOOM_CY + ZOOM_H0 / 2}
            x2={ZOOM_X + ZOOM_W + 13}
            y2={ZOOM_CY + ZOOM_H0 / 2}
            stroke={MUTED}
            strokeWidth={1.1}
          />
          <text x={ZOOM_X + ZOOM_W + 16} y={ZOOM_CY + 3} fontSize={8} fill={MUTED}>
            z
          </text>
          <text x={ZOOM_X + ZOOM_W / 2} y={ZOOM_CY + ZOOM_H0 / 2 + 16} textAnchor="middle" fontSize={8.5} fill={MUTED}>
            σ_z = 0
          </text>

          {showThicknessDetail && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <line
                x1={ZOOM_X - 8}
                y1={ZOOM_CY - ZOOM_H0 / 2}
                x2={ZOOM_X - 8}
                y2={ZOOM_CY + ZOOM_H0 / 2}
                stroke={MUTED}
                strokeWidth={1}
                strokeDasharray="3 3"
              />
              <line
                x1={ZOOM_X - 12}
                y1={ZOOM_CY - thickness / 2}
                x2={ZOOM_X + ZOOM_W + 2}
                y2={ZOOM_CY - thickness / 2}
                stroke={LATERAL}
                strokeWidth={1.1}
              />
              <line
                x1={ZOOM_X - 12}
                y1={ZOOM_CY + thickness / 2}
                x2={ZOOM_X + ZOOM_W + 2}
                y2={ZOOM_CY + thickness / 2}
                stroke={LATERAL}
                strokeWidth={1.1}
              />
              <text x={ZOOM_X + ZOOM_W / 2} y={214} textAnchor="middle" fontSize={9} fontWeight={700} fill={LATERAL}>
                {metric === 'ratio' ? 'ν/(1−ν) = 0,4286' : 'ε_z ≈ −514 με'}
              </text>
            </motion.g>
          )}

          {metric === 'check' && (
            <text x={ZOOM_X + ZOOM_W / 2} y={230} textAnchor="middle" fontSize={8.5} fill={OK}>
              ε_z ujemne mimo ε_x, ε_y &gt; 0
            </text>
          )}

          <text x={14} y={288} fontSize={8.5} fill={MUTED}>
            rozciąganie w płaszczyźnie i skurcz grubości pokazano w skali poglądowej
          </text>
        </svg>
      </div>
    </div>
  )
}
