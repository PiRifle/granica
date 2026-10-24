import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const LOAD = '#ff6b45'
const STRESS = '#a970dd'
const MUTED = '#87929d'
const EDGE = '#68727e'
const OK = '#2e9e6b'
const INK = '#17202a'

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}

export function NormalStressExample1Animation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const progress = smooth(playing ? sceneProgress : 1)

  const top = 56
  const bottom0 = 216
  const cx = 168
  const half = 19
  const stretchTarget = 16
  const elongation =
    metric === 'elongation' ? stretchTarget * progress : metric === 'sigma' || metric === 'result' ? stretchTarget : 0
  const bottom = bottom0 + elongation
  const loadStart = bottom + 14
  const loadEnd = bottom + 54
  const cutY = 140
  const showStress = metric === 'sigma' || metric === 'result'

  const panelX = 300
  const panelTop = 94
  const panelBottom = 210
  const arrowLength = (panelBottom - panelTop) * 0.32

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 300"
          role="img"
          aria-label="Pręt o polu 250 milimetrów kwadratowych rozciągany siłą 50 kiloniutonów. Animacja pokazuje siłę osiową, wydłużenie pręta i równomierny rozkład naprężenia 200 megapaskali w przekroju."
        >
          <defs>
            <marker
              id="ans1-dim"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={MUTED} />
            </marker>
            <marker
              id="ans1-load"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={LOAD} />
            </marker>
            <marker
              id="ans1-stress"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={STRESS} />
            </marker>
          </defs>

          <g stroke={EDGE} strokeWidth={2} strokeLinecap="round">
            <line x1={cx - half - 18} y1={top} x2={cx + half + 18} y2={top} />
            {Array.from({ length: 7 }, (_, tick) => {
              const x = cx - half - 14 + tick * ((half * 2 + 28) / 6)
              return <line key={tick} x1={x} y1={top} x2={x - 7} y2={top - 10} strokeWidth={1.4} />
            })}
          </g>

          <motion.rect
            x={cx - half}
            y={top}
            width={half * 2}
            height={bottom - top}
            rx={4}
            fill={showStress ? STRESS : ACCENT}
            initial={false}
            animate={{ height: bottom - top, fillOpacity: showStress ? 0.3 : 0.17 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            stroke={showStress ? STRESS : ACCENT}
            strokeWidth={2}
          />

          {metric === 'elongation' && (
            <g>
              <line
                x1={cx - half - 8}
                y1={bottom0}
                x2={cx + half + 8}
                y2={bottom0}
                stroke={MUTED}
                strokeWidth={1.2}
                strokeDasharray="4 4"
              />
              {[1 / 3, 2 / 3].map((fraction) => (
                <g key={fraction}>
                  <line
                    x1={cx - half}
                    y1={top + (bottom0 - top) * fraction}
                    x2={cx + half}
                    y2={top + (bottom0 - top) * fraction}
                    stroke={MUTED}
                    strokeWidth={1}
                    strokeDasharray="3 3"
                  />
                  <line
                    x1={cx - half}
                    y1={top + (bottom - top) * fraction}
                    x2={cx + half}
                    y2={top + (bottom - top) * fraction}
                    stroke="#ffffff"
                    strokeWidth={1.4}
                    strokeOpacity={0.8}
                  />
                </g>
              ))}
            </g>
          )}

          <line
            x1={cx - half - 24}
            y1={top}
            x2={cx - half - 24}
            y2={bottom0}
            stroke={MUTED}
            strokeWidth={1}
            markerStart="url(#ans1-dim)"
            markerEnd="url(#ans1-dim)"
          />
          <text x={cx - half - 32} y={(top + bottom0) / 2} textAnchor="middle" fontSize={9} fill={MUTED}>
            L
          </text>

          {metric === 'elongation' && (
            <g>
              <line
                x1={cx + half + 34}
                y1={bottom0}
                x2={cx + half + 34}
                y2={bottom}
                stroke={LOAD}
                strokeWidth={1.4}
                markerStart="url(#ans1-load)"
                markerEnd="url(#ans1-load)"
              />
              <text x={cx + half + 42} y={(bottom0 + bottom) / 2 + 3} fontSize={9} fill={LOAD}>
                ΔL
              </text>
            </g>
          )}

          <text x={12} y={top + 18} fontSize={9} fill={MUTED}>
            A = 250 mm²
          </text>

          {metric === 'N' && (
            <g>
              <line
                x1={cx - half - 10}
                y1={cutY}
                x2={cx + half + 10}
                y2={cutY}
                stroke={LOAD}
                strokeWidth={1.4}
                strokeDasharray="4 4"
              />
              <text x={cx} y={cutY - 8} textAnchor="middle" fontSize={9} fill={LOAD}>
                przekrój
              </text>
              <text x={cx + half + 14} y={cutY + 4} fontSize={9} fill={LOAD}>
                N = +50 kN
              </text>

              <g opacity={progress}>
                <line x1={300} y1={top} x2={300} y2={bottom0} stroke="#c9d0d9" strokeWidth={1} />
                <line x1={300} y1={bottom0} x2={414} y2={bottom0} stroke="#c9d0d9" strokeWidth={1} />
                <rect x={300} y={top} width={78 * progress} height={bottom0 - top} fill={ACCENT} fillOpacity={0.13} />
                <line
                  x1={300 + 78 * progress}
                  y1={top}
                  x2={300 + 78 * progress}
                  y2={bottom0}
                  stroke={ACCENT}
                  strokeWidth={2}
                />
                <text x={12} y={top - 2} fontSize={9} fill={MUTED}>
                  N(x)
                </text>
                <text x={300 - 6} y={bottom0 + 12} textAnchor="end" fontSize={9} fill={MUTED}>
                  0
                </text>
                <text x={300 + 78} y={top - 6} textAnchor="middle" fontSize={9} fill={ACCENT}>
                  +50 kN
                </text>
              </g>
            </g>
          )}

          {showStress && (
            <g>
              <line
                x1={cx + half + 8}
                y1={cutY}
                x2={panelX - 6}
                y2={cutY}
                stroke={MUTED}
                strokeWidth={1}
                strokeDasharray="3 3"
              />
              <text x={panelX} y={panelTop - 16} fontSize={9} fill={STRESS}>
                rozkład σ w przekroju
              </text>
              <line x1={panelX} y1={panelTop} x2={panelX} y2={panelBottom} stroke={EDGE} strokeWidth={1.5} />
              {Array.from({ length: 7 }, (_, arrow) => {
                const y = panelTop + 8 + arrow * ((panelBottom - panelTop - 16) / 6)
                return (
                  <line
                    key={arrow}
                    x1={panelX + 2}
                    y1={y}
                    x2={panelX + 2 + arrowLength * progress}
                    y2={y}
                    stroke={STRESS}
                    strokeWidth={1.8}
                    markerEnd="url(#ans1-stress)"
                  />
                )
              })}
              <line
                x1={panelX + 2 + arrowLength * progress}
                y1={panelTop}
                x2={panelX + 2 + arrowLength * progress}
                y2={panelBottom}
                stroke={STRESS}
                strokeWidth={1.2}
                strokeDasharray="4 3"
              />
              <text x={panelX} y={panelBottom + 18} fontSize={10} fontWeight={700} fill={STRESS}>
                σ = 200 MPa
              </text>
              <text x={panelX} y={panelBottom + 31} fontSize={9} fill={MUTED}>
                jednakowo w każdym punkcie
              </text>
            </g>
          )}

          {metric === 'result' && (
            <g>
              <line x1={300} y1={248} x2={412} y2={248} stroke="#c9d0d9" strokeWidth={1.2} />
              <line
                x1={300 + (200 / 240) * 112}
                y1={242}
                x2={300 + (200 / 240) * 112}
                y2={254}
                stroke="#c9d0d9"
                strokeWidth={1}
              />
              <line
                x1={300 + (235 / 240) * 112}
                y1={240}
                x2={300 + (235 / 240) * 112}
                y2={256}
                stroke={LOAD}
                strokeWidth={1.4}
                strokeDasharray="3 3"
              />
              <motion.circle
                cx={300 + (200 / 240) * 112}
                cy={248}
                r={4}
                fill={OK}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <text x={300 + (200 / 240) * 112} y={240} textAnchor="end" fontSize={9} fill={OK}>
                200 MPa
              </text>
              <text x={300 + (235 / 240) * 112} y={268} textAnchor="middle" fontSize={8} fill={LOAD}>
                235 MPa
              </text>
              <text x={300} y={284} fontSize={9} fill={MUTED}>
                zapas niewielki
              </text>
            </g>
          )}

          <motion.g
            animate={playing ? { opacity: [0.72, 1, 0.72] } : { opacity: 1 }}
            transition={{ duration: 1.9, repeat: playing ? Infinity : 0, ease: 'easeInOut' }}
          >
            <line
              x1={cx}
              y1={loadStart}
              x2={cx}
              y2={loadEnd}
              stroke={LOAD}
              strokeWidth={2.6}
              markerEnd="url(#ans1-load)"
            />
            <text x={cx + 10} y={(loadStart + loadEnd) / 2 + 3} fontSize={10} fill={LOAD}>
              N = 50 kN
            </text>
          </motion.g>

          <text x={12} y={284} fontSize={9} fill={INK}>
            {metric === 'model' && 'pręt utwierdzony, obciążony osiowo'}
            {metric === 'N' && 'siła osiowa stała na długości'}
            {metric === 'elongation' && 'przekroje pozostają płaskie'}
            {metric === 'sigma' && 'naprężenie rozciągające σ = N/A'}
            {metric === 'result' && 'σ = +200 MPa, rozciąganie'}
          </text>
        </svg>
      </div>
    </div>
  )
}
