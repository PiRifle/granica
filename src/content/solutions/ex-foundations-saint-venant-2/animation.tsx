import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const LOAD = '#ff6b45'
const MUTED = '#87929d'
const EDGE = '#68727e'
const PLATE = '#d9dee4'
const INK = '#17202a'

const ROD = { x: 206, y: 84, w: 48, h: 176 }
const PIN = { x: 230, y: 96 }
const KT_LOCAL = 3.2

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}

function rodStressRatio(x: number, y: number) {
  const dx = (x - PIN.x) * 0.72
  const dy = y - PIN.y
  const distance = Math.hypot(dx, dy)
  const angle = Math.atan2(dy, dx)
  const angular = 0.5 + 0.5 * Math.abs(Math.sin(angle))
  const decay = Math.exp(-Math.max(0, distance - 16) / 54)
  return 1 + (KT_LOCAL - 1) * angular * decay
}

function stressColor(ratio: number) {
  const t = clamp01((ratio - 1) / (KT_LOCAL - 1))
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

export function SaintVenantExample2Animation({
  scene,
  index,
  playing,
  stepProgress,
  sceneProgress,
}: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const reveal = smooth(sceneProgress)
  const pulse = playing ? 0.86 + 0.14 * Math.sin((sceneProgress * 3 + stepProgress + index) * Math.PI * 2) : 1
  const showField = metric === 'disturbance' || metric === 'decay'
  const showNominalArrows = metric === 'nominal' || metric === 'decay'
  const showSection = metric === 'section'
  const showDisturbance = metric === 'disturbance'
  const showDecay = metric === 'decay'
  const zoneEnd = PIN.y + 104
  const boundaryY = PIN.y + 104 * reveal

  const cells: Array<{ key: string; x: number; y: number; fill: string; opacity: number }> = []
  if (showField) {
    for (let x = ROD.x + 4; x < ROD.x + ROD.w - 2; x += 5) {
      for (let y = ROD.y + 4; y < ROD.y + ROD.h - 2; y += 6) {
        const ratio = rodStressRatio(x, y)
        const intensity = clamp01((ratio - 1) / (KT_LOCAL - 1))
        cells.push({
          key: `${x}-${y}`,
          x,
          y,
          fill: stressColor(ratio),
          opacity: (metric === 'disturbance' ? reveal : 1) * (0.12 + 0.62 * intensity),
        })
      }
    }
  }

  const nominalColumns = Array.from({ length: 6 }, (_, columnIndex) => ROD.x + 7 + columnIndex * 7)
  const nominalTop = metric === 'decay' ? 208 : 172

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 300"
          role="img"
          aria-label="Okrągły pręt o średnicy 30 mm rozciągany siłą 50 kN przez sworzeń w uchwycie. Animacja pokazuje zaburzenie przy uchwycie i równomierne naprężenie nominalne z dala od niego."
        >
          <defs>
            <marker
              id="sv2-dim"
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
              id="sv2-load"
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
              id="sv2-nom"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={ACCENT} />
            </marker>
            <clipPath id="sv2-rod-clip">
              <rect x={ROD.x} y={ROD.y} width={ROD.w} height={ROD.h} rx={3} />
            </clipPath>
          </defs>

          <rect x={174} y={46} width={32} height={62} rx={3} fill={PLATE} stroke={EDGE} strokeWidth={1.4} />
          <rect x={254} y={46} width={32} height={62} rx={3} fill={PLATE} stroke={EDGE} strokeWidth={1.4} />

          <rect
            x={ROD.x}
            y={ROD.y}
            width={ROD.w}
            height={ROD.h}
            rx={3}
            fill={ACCENT}
            fillOpacity={0.12}
            stroke={ACCENT}
            strokeWidth={2}
          />

          <g clipPath="url(#sv2-rod-clip)">
            {cells.map((cell) => (
              <rect
                key={cell.key}
                x={cell.x - 2.4}
                y={cell.y - 2.8}
                width={4.8}
                height={5.6}
                fill={cell.fill}
                fillOpacity={cell.opacity}
              />
            ))}
          </g>

          <motion.g
            animate={playing ? { opacity: [0.72, 1, 0.72] } : { opacity: 1 }}
            transition={{ duration: 1.9, repeat: playing ? Infinity : 0, ease: 'easeInOut' }}
          >
            <line x1={172} y1={PIN.y} x2={288} y2={PIN.y} stroke={EDGE} strokeWidth={8} strokeLinecap="round" />
            <line x1={172} y1={PIN.y} x2={288} y2={PIN.y} stroke="#aeb6bf" strokeWidth={2} strokeLinecap="round" />
            <line
              x1={ROD.x + ROD.w / 2}
              y1={ROD.y + ROD.h}
              x2={ROD.x + ROD.w / 2}
              y2={ROD.y + ROD.h + 30}
              stroke={LOAD}
              strokeWidth={2.6}
              markerEnd="url(#sv2-load)"
            />
            <text x={ROD.x + ROD.w / 2 + 10} y={ROD.y + ROD.h + 26} fontSize={10} fill={LOAD}>
              P = 50 kN
            </text>
          </motion.g>

          <rect x={ROD.x + ROD.w / 2 - 3} y={PIN.y - 2} width={6} height={8} rx={1} fill={LOAD} fillOpacity={0.65} />

          {showSection && (
            <g>
              <line
                x1={ROD.x}
                y1={196}
                x2={ROD.x + ROD.w}
                y2={196}
                stroke={MUTED}
                strokeWidth={1}
                strokeDasharray="4 3"
              />
              <circle cx={362} cy={112} r={28} fill={ACCENT} fillOpacity={0.12} stroke={ACCENT} strokeWidth={1.8} />
              <line
                x1={334}
                y1={112}
                x2={390}
                y2={112}
                stroke={MUTED}
                strokeWidth={1}
                markerStart="url(#sv2-dim)"
                markerEnd="url(#sv2-dim)"
              />
              <line
                x1={ROD.x + ROD.w}
                y1={196}
                x2={332}
                y2={126}
                stroke={MUTED}
                strokeWidth={1}
                strokeDasharray="4 3"
              />
              <text x={362} y={154} textAnchor="middle" fontSize={9} fill={MUTED}>
                d = 30 mm
              </text>
              <text x={362} y={168} textAnchor="middle" fontSize={9} fill={ACCENT}>
                A = πd² / 4
              </text>
            </g>
          )}

          {showNominalArrows && (
            <g>
              <line
                x1={ROD.x - 8}
                y1={nominalTop}
                x2={ROD.x + ROD.w + 8}
                y2={nominalTop}
                stroke={MUTED}
                strokeWidth={1}
                strokeDasharray="4 4"
              />
              {nominalColumns.map((x) => {
                const length = metric === 'decay' ? 22 : 30 * reveal
                return (
                  <line
                    key={`nom-${x}`}
                    x1={x}
                    y1={nominalTop}
                    x2={x}
                    y2={nominalTop + length}
                    stroke={ACCENT}
                    strokeWidth={1.8}
                    markerEnd="url(#sv2-nom)"
                  />
                )
              })}
              <text x={ROD.x + ROD.w + 12} y={nominalTop + 34} fontSize={10} fill={ACCENT}>
                σ_nom
              </text>
              <text x={ROD.x + ROD.w + 12} y={nominalTop + 48} fontSize={8} fill={MUTED}>
                równomiernie
              </text>
            </g>
          )}

          {(showDisturbance || showDecay) && (
            <g>
              <line
                x1={298}
                y1={PIN.y}
                x2={298}
                y2={showDecay ? zoneEnd : PIN.y + 104 * reveal}
                stroke={LOAD}
                strokeWidth={1.4}
                strokeDasharray="5 4"
              />
              <line x1={294} y1={PIN.y} x2={304} y2={PIN.y} stroke={LOAD} strokeWidth={1.2} />
              <line
                x1={294}
                y1={showDecay ? zoneEnd : PIN.y + 104 * reveal}
                x2={304}
                y2={showDecay ? zoneEnd : PIN.y + 104 * reveal}
                stroke={LOAD}
                strokeWidth={1.2}
              />
              <text x={310} y={PIN.y + 34} fontSize={9} fill={LOAD}>
                strefa zaburzeń
              </text>
              <text x={310} y={PIN.y + 48} fontSize={9} fill={LOAD}>
                ≈ 2d–3d
              </text>
            </g>
          )}

          {showDisturbance && (
            <g>
              <circle cx={PIN.x} cy={PIN.y} r={4 + 2 * pulse} fill={LOAD} fillOpacity={0.8} />
              <text x={310} y={PIN.y - 4} fontSize={9} fill={MUTED}>
                kontakt sworznia
              </text>
              <line x1={PIN.x + 24} y1={PIN.y - 4} x2={306} y2={PIN.y - 8} stroke={MUTED} strokeWidth={1} />
            </g>
          )}

          {showDecay && (
            <g>
              <motion.line
                x1={ROD.x - 8}
                y1={boundaryY}
                x2={ROD.x + ROD.w + 8}
                y2={boundaryY}
                stroke={ACCENT}
                strokeWidth={1.5}
                strokeDasharray="5 4"
                animate={{ y1: boundaryY, y2: boundaryY }}
                transition={{ duration: 0.2, ease: 'linear' }}
              />
              <text x={ROD.x + ROD.w + 12} y={boundaryY + 4} fontSize={9} fill={ACCENT}>
                σ = N/A
              </text>
            </g>
          )}

          <line x1={ROD.x} y1={ROD.y + ROD.h - 26} x2={ROD.x} y2={ROD.y + ROD.h - 18} stroke={MUTED} strokeWidth={1} />
          <line
            x1={ROD.x + ROD.w}
            y1={ROD.y + ROD.h - 26}
            x2={ROD.x + ROD.w}
            y2={ROD.y + ROD.h - 18}
            stroke={MUTED}
            strokeWidth={1}
          />
          <line
            x1={ROD.x}
            y1={ROD.y + ROD.h - 22}
            x2={ROD.x + ROD.w}
            y2={ROD.y + ROD.h - 22}
            stroke={MUTED}
            strokeWidth={1}
            markerStart="url(#sv2-dim)"
            markerEnd="url(#sv2-dim)"
          />
          <text x={ROD.x + ROD.w / 2} y={ROD.y + ROD.h - 30} textAnchor="middle" fontSize={9} fill={MUTED}>
            d = 30 mm
          </text>

          <text x={30} y={28} fontSize={10} fill={INK}>
            {metric === 'model' && 'pręt okrągły w uchwycie'}
            {metric === 'section' && 'pole przekroju kołowego'}
            {metric === 'nominal' && 'naprężenie średnie daleko od uchwytu'}
            {metric === 'disturbance' && 'lokalne zaburzenie przy sworzniu'}
            {metric === 'decay' && 'poza strefą zaburzeń: σ = N/A'}
          </text>
        </svg>
      </div>
    </div>
  )
}
