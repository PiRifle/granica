import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const LOAD = '#ff6b45'
const MUTED = '#87929d'
const EDGE = '#68727e'
const INK = '#17202a'

const TAPE = { x: 80, y: 96, w: 300, h: 88 }
const HOLE = { cx: TAPE.x + TAPE.w / 2, cy: TAPE.y + TAPE.h / 2, r: 10 }
const KT = 3

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}

function localStressRatio(x: number, y: number) {
  const dx = x - HOLE.cx
  const dy = y - HOLE.cy
  const distance = Math.hypot(dx, dy)
  const angle = Math.atan2(dy, dx)
  const angular = 0.35 + 0.65 * Math.abs(Math.cos(angle))
  const decay = Math.exp(-Math.max(0, distance - HOLE.r) / (HOLE.r * 1.25))
  return 1 + (KT - 1) * angular * decay
}

function stressColor(ratio: number) {
  const t = clamp01((ratio - 1) / (KT - 1))
  const stops = [
    [79, 109, 245],
    [255, 179, 71],
    [255, 90, 61],
  ]
  const segment = t < 0.5 ? 0 : 1
  const localT = t < 0.5 ? t * 2 : (t - 0.5) * 2
  const from = stops[segment]
  const to = stops[segment + 1]
  const channel = (index: number) => Math.round(from[index] + (to[index] - from[index]) * localT)
  return `rgb(${channel(0)}, ${channel(1)}, ${channel(2)})`
}

export function SaintVenantExampleAnimation({
  scene,
  index,
  playing,
  stepProgress,
  sceneProgress,
}: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const reveal = smooth(sceneProgress)
  const pulse = playing ? 0.86 + 0.14 * Math.sin((sceneProgress * 3 + stepProgress + index) * Math.PI * 2) : 1
  const showField = metric === 'concentration' || metric === 'decay'
  const fieldReveal = metric === 'decay' ? 1 : reveal
  const showNominalArrows = metric === 'nominal' || metric === 'decay'
  const showConcentration = metric === 'concentration'
  const showDecay = metric === 'decay'
  const showNetSection = metric === 'section'
  const decayX = HOLE.cx + 96
  const boundaryX = HOLE.cx + (decayX - HOLE.cx) * reveal

  const cells: Array<{ key: string; x: number; y: number; fill: string; opacity: number }> = []
  if (showField) {
    for (let x = TAPE.x + 5; x < TAPE.x + TAPE.w - 3; x += 7) {
      for (let y = TAPE.y + 5; y < TAPE.y + TAPE.h - 3; y += 7) {
        const distance = Math.hypot(x - HOLE.cx, y - HOLE.cy)
        if (distance < HOLE.r + 2.5) continue
        const ratio = localStressRatio(x, y)
        const intensity = clamp01((ratio - 1) / (KT - 1))
        cells.push({
          key: `${x}-${y}`,
          x,
          y,
          fill: stressColor(ratio),
          opacity: fieldReveal * (0.12 + 0.58 * intensity),
        })
      }
    }
  }

  const uniformArrows = Array.from({ length: 7 }, (_, arrowIndex) => {
    const y = TAPE.y + 12 + arrowIndex * ((TAPE.h - 24) / 6)
    return y
  })

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 300"
          role="img"
          aria-label="Taśma o szerokości 80 mm i grubości 8 mm z otworem 16 mm, rozciągana siłą 64 kN. Animacja pokazuje pole naprężeń wokół otworu i naprężenie nominalne z dala od detalu."
        >
          <defs>
            <marker
              id="sv1-dim"
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
              id="sv1-load"
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
              id="sv1-nom"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={ACCENT} />
            </marker>
            <clipPath id="sv1-tape-clip">
              <rect x={TAPE.x} y={TAPE.y} width={TAPE.w} height={TAPE.h} rx={4} />
            </clipPath>
          </defs>

          <rect
            x={TAPE.x}
            y={TAPE.y}
            width={TAPE.w}
            height={TAPE.h}
            rx={4}
            fill={ACCENT}
            fillOpacity={0.1}
            stroke={ACCENT}
            strokeWidth={2}
          />

          <g clipPath="url(#sv1-tape-clip)">
            {cells.map((cell) => (
              <rect
                key={cell.key}
                x={cell.x - 3.4}
                y={cell.y - 3.4}
                width={6.8}
                height={6.8}
                rx={1.6}
                fill={cell.fill}
                fillOpacity={cell.opacity}
              />
            ))}
          </g>

          <circle cx={HOLE.cx} cy={HOLE.cy} r={HOLE.r} fill="#fff" stroke={EDGE} strokeWidth={1.8} />
          <motion.circle
            cx={HOLE.cx}
            cy={HOLE.cy}
            fill="none"
            stroke={LOAD}
            strokeWidth={1.6}
            animate={
              playing && showField
                ? { r: [HOLE.r + 2, HOLE.r + 10, HOLE.r + 2], opacity: [0.55, 0, 0.55] }
                : { r: HOLE.r + 2, opacity: 0 }
            }
            transition={{ duration: 2.2, repeat: playing && showField ? Infinity : 0, ease: 'easeInOut' }}
          />

          {showNetSection && (
            <g>
              <rect
                x={HOLE.cx - 3}
                y={TAPE.y}
                width={6}
                height={HOLE.cy - HOLE.r - TAPE.y}
                fill={ACCENT}
                fillOpacity={0.34}
              />
              <rect
                x={HOLE.cx - 3}
                y={HOLE.cy + HOLE.r}
                width={6}
                height={TAPE.y + TAPE.h - (HOLE.cy + HOLE.r)}
                fill={ACCENT}
                fillOpacity={0.34}
              />
              <line
                x1={HOLE.cx}
                y1={TAPE.y - 8}
                x2={HOLE.cx}
                y2={TAPE.y - 22}
                stroke={ACCENT}
                strokeWidth={1.2}
                strokeDasharray="4 3"
              />
              <text x={HOLE.cx} y={TAPE.y - 28} textAnchor="middle" fontSize={10} fill={ACCENT}>
                przekrój netto: b − d
              </text>
            </g>
          )}

          {showDecay && (
            <g>
              <motion.line
                x1={boundaryX}
                y1={TAPE.y - 8}
                x2={boundaryX}
                y2={TAPE.y + TAPE.h + 8}
                stroke={LOAD}
                strokeWidth={1.5}
                strokeDasharray="5 4"
                animate={{ x1: boundaryX, x2: boundaryX }}
                transition={{ duration: 0.2, ease: 'linear' }}
              />
              <line
                x1={HOLE.cx}
                y1={TAPE.y - 18}
                x2={decayX}
                y2={TAPE.y - 18}
                stroke={MUTED}
                strokeWidth={1}
                markerStart="url(#sv1-dim)"
                markerEnd="url(#sv1-dim)"
              />
              <text x={(HOLE.cx + decayX) / 2} y={TAPE.y - 24} textAnchor="middle" fontSize={10} fill={MUTED}>
                ≈ 3d
              </text>
              <text x={decayX + 8} y={TAPE.y + TAPE.h + 22} fontSize={9} fill={MUTED}>
                dalej: σ = N/A
              </text>
            </g>
          )}

          {showNominalArrows && (
            <g>
              {[TAPE.x + 34, TAPE.x + TAPE.w - 34].map((cutX) => (
                <g key={`nominal-${cutX}`}>
                  <line
                    x1={cutX}
                    y1={TAPE.y - 4}
                    x2={cutX}
                    y2={TAPE.y + TAPE.h + 4}
                    stroke={MUTED}
                    strokeWidth={1}
                    strokeDasharray="4 4"
                  />
                  {uniformArrows.map((y, arrowIndex) => {
                    const length = (18 + arrowIndex * 0.4) * (metric === 'decay' ? 1 : reveal)
                    const direction = cutX < HOLE.cx ? -1 : 1
                    return (
                      <line
                        key={`nom-${cutX}-${y}`}
                        x1={cutX}
                        y1={y}
                        x2={cutX + direction * length}
                        y2={y}
                        stroke={ACCENT}
                        strokeWidth={1.8}
                        markerEnd="url(#sv1-nom)"
                      />
                    )
                  })}
                </g>
              ))}
              <text x={TAPE.x + 34} y={TAPE.y + TAPE.h + 22} textAnchor="middle" fontSize={10} fill={ACCENT}>
                σ_nom
              </text>
            </g>
          )}

          {showConcentration && (
            <g>
              <line
                x1={HOLE.cx - HOLE.r}
                y1={HOLE.cy}
                x2={HOLE.cx - HOLE.r - 46 * pulse}
                y2={HOLE.cy}
                stroke={LOAD}
                strokeWidth={3}
                markerEnd="url(#sv1-load)"
              />
              <line
                x1={HOLE.cx + HOLE.r}
                y1={HOLE.cy}
                x2={HOLE.cx + HOLE.r + 46 * pulse}
                y2={HOLE.cy}
                stroke={LOAD}
                strokeWidth={3}
                markerEnd="url(#sv1-load)"
              />
              <text x={HOLE.cx - HOLE.r - 52} y={HOLE.cy - 10} textAnchor="end" fontSize={10} fill={LOAD}>
                σ_max
              </text>
              <text x={HOLE.cx + HOLE.r + 52} y={HOLE.cy - 10} fontSize={10} fill={LOAD}>
                σ_max
              </text>
              <g>
                <rect x={334} y={42} width={92} height={26} rx={13} fill="#fff3ef" stroke={LOAD} strokeWidth={1.2} />
                <text x={380} y={59} textAnchor="middle" fontSize={11} fontWeight={700} fill={LOAD}>
                  K_t ≈ 3
                </text>
              </g>
            </g>
          )}

          <g>
            <line x1={TAPE.x} y1={TAPE.y} x2={TAPE.x - 12} y2={TAPE.y} stroke={MUTED} strokeWidth={1} />
            <line
              x1={TAPE.x}
              y1={TAPE.y + TAPE.h}
              x2={TAPE.x - 12}
              y2={TAPE.y + TAPE.h}
              stroke={MUTED}
              strokeWidth={1}
            />
            <line
              x1={TAPE.x - 10}
              y1={TAPE.y}
              x2={TAPE.x - 10}
              y2={TAPE.y + TAPE.h}
              stroke={MUTED}
              strokeWidth={1}
              markerStart="url(#sv1-dim)"
              markerEnd="url(#sv1-dim)"
            />
          </g>

          <line x1={TAPE.x + TAPE.w} y1={TAPE.y} x2={TAPE.x + TAPE.w + 18} y2={TAPE.y} stroke={MUTED} strokeWidth={1} />
          <line
            x1={TAPE.x + TAPE.w}
            y1={TAPE.y + TAPE.h}
            x2={TAPE.x + TAPE.w + 18}
            y2={TAPE.y + TAPE.h}
            stroke={MUTED}
            strokeWidth={1}
          />
          <line
            x1={TAPE.x + TAPE.w + 14}
            y1={TAPE.y}
            x2={TAPE.x + TAPE.w + 14}
            y2={TAPE.y + TAPE.h}
            stroke={MUTED}
            strokeWidth={1}
            markerStart="url(#sv1-dim)"
            markerEnd="url(#sv1-dim)"
          />
          <text x={TAPE.x + TAPE.w + 14} y={TAPE.y - 10} textAnchor="middle" fontSize={10} fill={MUTED}>
            b = 80 mm
          </text>

          <line
            x1={HOLE.cx - HOLE.r + 2}
            y1={HOLE.cy}
            x2={HOLE.cx + HOLE.r - 2}
            y2={HOLE.cy}
            stroke={MUTED}
            strokeWidth={1}
            markerStart="url(#sv1-dim)"
            markerEnd="url(#sv1-dim)"
          />
          <text x={HOLE.cx} y={TAPE.y - 10} textAnchor="middle" fontSize={9} fill={MUTED}>
            d = 16 mm
          </text>

          <motion.g
            animate={playing ? { opacity: [0.72, 1, 0.72] } : { opacity: 1 }}
            transition={{ duration: 1.9, repeat: playing ? Infinity : 0, ease: 'easeInOut' }}
          >
            <line
              x1={TAPE.x - 22}
              y1={HOLE.cy}
              x2={TAPE.x - 58}
              y2={HOLE.cy}
              stroke={LOAD}
              strokeWidth={2.4}
              markerEnd="url(#sv1-load)"
            />
            <line
              x1={TAPE.x + TAPE.w + 18}
              y1={HOLE.cy}
              x2={TAPE.x + TAPE.w + 54}
              y2={HOLE.cy}
              stroke={LOAD}
              strokeWidth={2.4}
              markerEnd="url(#sv1-load)"
            />
            <text x={TAPE.x - 40} y={HOLE.cy - 12} textAnchor="middle" fontSize={10} fill={LOAD}>
              P = 64 kN
            </text>
            <text x={TAPE.x + TAPE.w + 36} y={HOLE.cy + 18} textAnchor="middle" fontSize={10} fill={LOAD}>
              P
            </text>
          </motion.g>

          <rect
            x={104}
            y={238}
            width={132}
            height={8}
            rx={2}
            fill={ACCENT}
            fillOpacity={0.18}
            stroke={ACCENT}
            strokeWidth={1.2}
          />
          <line
            x1={92}
            y1={238}
            x2={92}
            y2={246}
            stroke={MUTED}
            strokeWidth={1}
            markerStart="url(#sv1-dim)"
            markerEnd="url(#sv1-dim)"
          />
          <text x={246} y={245} fontSize={9} fill={MUTED}>
            t = 8 mm — widok z boku
          </text>
          <text x={170} y={264} textAnchor="middle" fontSize={8} fill={MUTED}>
            otwór w środku szerokości
          </text>

          <text x={30} y={28} fontSize={10} fill={INK}>
            {metric === 'model' && 'detal: otwór osiowy'}
            {metric === 'section' && 'pole czynne po odjęciu otworu'}
            {metric === 'nominal' && 'równomierny rozkład daleko od otworu'}
            {metric === 'concentration' && 'lokalny pik przy krawędzi otworu'}
            {metric === 'decay' && 'zaburzenie zanika z odległością'}
          </text>
        </svg>
      </div>
    </div>
  )
}
