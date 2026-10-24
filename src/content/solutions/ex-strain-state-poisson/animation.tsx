import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const LATERAL = '#ff6b45'
const MUTED = '#87929d'
const INK = '#17202a'
const OK = '#2e9e6b'
const SUPPORT = '#68727e'

const TOP = 64
const CX = 146
const D0 = 96
const ORIGINAL_BOTTOM = 242
const STRETCH = 44
const CONTRACT = 16

const SECTION_X = 358
const SECTION_Y = 88
const SECTION_R = 38

const BAR_X = 292
const BAR_MAX = 116

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}

function Support() {
  return (
    <g stroke={SUPPORT} strokeWidth={2} strokeLinecap="round">
      <line x1={CX - D0 / 2 - 24} y1={TOP} x2={CX + D0 / 2 + 24} y2={TOP} />
      {Array.from({ length: 10 }, (_, index) => {
        const x = CX - D0 / 2 - 18 + index * ((D0 + 36) / 9)
        return <line key={index} x1={x} y1={TOP} x2={x - 7} y2={TOP - 11} strokeWidth={1.4} />
      })}
    </g>
  )
}

export function PoissonExample1Animation({ scene, index, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const p = playing ? clamp01(sceneProgress) : 1
  const deform = smooth(p)
  const pulse = playing ? 0.55 + 0.45 * Math.sin((sceneProgress * 3 + index) * Math.PI * 2) : 1

  const width = D0 - CONTRACT * deform
  const left = CX - width / 2
  const right = CX + width / 2
  const bottom = ORIGINAL_BOTTOM + STRETCH * deform
  const radius = SECTION_R - 7 * deform

  const showStrain = metric === 'strain' || metric === 'check'
  const showDiameter = metric === 'diameter' || metric === 'final'
  const showStress = metric === 'stress'

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 300"
          role="img"
          aria-label="Stalowy pręt rozciągany osiowo. Animacja pokazuje wydłużenie pręta i jednoczesny, powiększony poglądowo skurcz średnicy."
        >
          <defs>
            <marker
              id="p1-load"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={LATERAL} />
            </marker>
            <marker
              id="p1-strain"
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
              id="p1-lateral"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={LATERAL} />
            </marker>
          </defs>

          <text x={14} y={18} fontSize={10.5} fontWeight={700} fill={INK}>
            pręt pod obciążeniem osiowym
          </text>
          <text x={14} y={33} fontSize={8.5} fill={MUTED}>
            E = 200 GPa · ν = 0,30 · d₀ = 16 mm
          </text>

          <Support />

          <rect
            x={CX - D0 / 2}
            y={TOP}
            width={D0}
            height={ORIGINAL_BOTTOM - TOP}
            rx={5}
            fill="none"
            stroke={MUTED}
            strokeWidth={1.3}
            strokeDasharray="5 4"
            opacity={0.7}
          />
          <motion.rect
            x={left}
            y={TOP}
            width={width}
            height={bottom - TOP}
            rx={5}
            fill={showStress ? LATERAL : ACCENT}
            fillOpacity={showStress ? 0.16 : 0.13}
            stroke={showStress ? LATERAL : ACCENT}
            strokeWidth={2}
            initial={false}
            animate={{ opacity: 1 }}
          />

          <g stroke={MUTED} strokeWidth={1.2} fill="none">
            <line x1={CX - D0 / 2 - 26} y1={TOP} x2={CX - D0 / 2 - 26} y2={ORIGINAL_BOTTOM} />
            <line x1={CX - D0 / 2 - 31} y1={TOP} x2={CX - D0 / 2 - 21} y2={TOP} />
            <line x1={CX - D0 / 2 - 31} y1={ORIGINAL_BOTTOM} x2={CX - D0 / 2 - 21} y2={ORIGINAL_BOTTOM} />
            <text
              x={CX - D0 / 2 - 34}
              y={(TOP + ORIGINAL_BOTTOM) / 2}
              textAnchor="middle"
              fontSize={9}
              fill={MUTED}
              stroke="none"
              transform={`rotate(-90 ${CX - D0 / 2 - 34} ${(TOP + ORIGINAL_BOTTOM) / 2})`}
            >
              L₀
            </text>
          </g>

          <motion.g
            animate={playing ? { opacity: [0.7, 1, 0.7] } : { opacity: 1 }}
            transition={{ duration: 1.8, repeat: playing ? Infinity : 0, ease: 'easeInOut' }}
          >
            <line
              x1={CX}
              y1={bottom + 6}
              x2={CX}
              y2={bottom + 38}
              stroke={LATERAL}
              strokeWidth={2.4}
              markerEnd="url(#p1-load)"
            />
            <text x={CX + 8} y={bottom + 30} fontSize={9.5} fill={LATERAL}>
              {showStress ? 'σ_x = 180 MPa' : 'obciążenie osiowe'}
            </text>
          </motion.g>

          {(metric === 'model' || showStrain) && (
            <g fill={ACCENT} stroke={ACCENT}>
              <line
                x1={left + 8}
                y1={bottom - 24}
                x2={right - 8}
                y2={bottom - 24}
                stroke={LATERAL}
                strokeWidth={1.2}
                opacity={0.5}
                strokeDasharray="3 3"
              />
              <line
                x1={CX}
                y1={TOP + 18}
                x2={CX}
                y2={bottom - 8}
                strokeWidth={1.4}
                markerEnd="url(#p1-strain)"
                opacity={0.75}
              />
              <text x={CX + 7} y={TOP + 30} fontSize={9.5} fontWeight={700} fill={ACCENT} stroke="none">
                ε_x = +900 με
              </text>
            </g>
          )}

          {(showStrain || metric === 'model') && (
            <g>
              <line
                x1={left - 14}
                y1={TOP + 74}
                x2={left + 8}
                y2={TOP + 74}
                stroke={LATERAL}
                strokeWidth={1.8}
                markerEnd="url(#p1-lateral)"
              />
              <line
                x1={right + 14}
                y1={TOP + 74}
                x2={right - 8}
                y2={TOP + 74}
                stroke={LATERAL}
                strokeWidth={1.8}
                markerEnd="url(#p1-lateral)"
              />
              <text x={CX - D0 / 2 - 48} y={TOP + 62} fontSize={8.5} fill={LATERAL}>
                ε_y = −270 με
              </text>
            </g>
          )}

          {showStress && (
            <g stroke={LATERAL} fill={LATERAL}>
              <line
                x1={CX - D0 / 2 - 16}
                y1={TOP + 82}
                x2={left - 2}
                y2={TOP + 82}
                strokeWidth={2}
                markerEnd="url(#p1-lateral)"
              />
              <line
                x1={CX + D0 / 2 + 16}
                y1={TOP + 82}
                x2={right + 2}
                y2={TOP + 82}
                strokeWidth={2}
                markerEnd="url(#p1-lateral)"
              />
              <text x={CX} y={TOP + 118} textAnchor="middle" fontSize={9} fill={LATERAL} stroke="none">
                naprężenie osiowe, brak σ_y
              </text>
            </g>
          )}

          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: showDiameter ? 1 : 0.72 }}
            transition={{ duration: 0.3 }}
          >
            <text x={SECTION_X} y={SECTION_Y - SECTION_R - 14} textAnchor="middle" fontSize={9} fill={MUTED}>
              przekrój poprzeczny (powiększony)
            </text>
            <circle
              cx={SECTION_X}
              cy={SECTION_Y}
              r={SECTION_R}
              fill="none"
              stroke={MUTED}
              strokeWidth={1.3}
              strokeDasharray="4 4"
            />
            <motion.circle
              cx={SECTION_X}
              cy={SECTION_Y}
              r={radius}
              fill={LATERAL}
              fillOpacity={0.12}
              stroke={LATERAL}
              strokeWidth={1.8}
              initial={false}
              animate={{ r: radius }}
              transition={{ duration: 0.12, ease: 'linear' }}
            />
            <line
              x1={SECTION_X - SECTION_R}
              y1={SECTION_Y + SECTION_R + 12}
              x2={SECTION_X + SECTION_R}
              y2={SECTION_Y + SECTION_R + 12}
              stroke={MUTED}
              strokeWidth={1.1}
            />
            <line
              x1={SECTION_X - SECTION_R}
              y1={SECTION_Y + SECTION_R + 7}
              x2={SECTION_X - SECTION_R}
              y2={SECTION_Y + SECTION_R + 17}
              stroke={MUTED}
              strokeWidth={1.1}
            />
            <line
              x1={SECTION_X + SECTION_R}
              y1={SECTION_Y + SECTION_R + 7}
              x2={SECTION_X + SECTION_R}
              y2={SECTION_Y + SECTION_R + 17}
              stroke={MUTED}
              strokeWidth={1.1}
            />
            <text x={SECTION_X} y={SECTION_Y + SECTION_R + 27} textAnchor="middle" fontSize={8.5} fill={MUTED}>
              d₀ = 16 mm
            </text>
            {showDiameter && (
              <>
                <line
                  x1={SECTION_X - radius}
                  y1={SECTION_Y - SECTION_R - 2}
                  x2={SECTION_X + radius}
                  y2={SECTION_Y - SECTION_R - 2}
                  stroke={LATERAL}
                  strokeWidth={1.2}
                />
                <text x={SECTION_X} y={SECTION_Y - SECTION_R - 6} textAnchor="middle" fontSize={8.5} fill={LATERAL}>
                  {metric === 'final' ? 'd = 15,99568 mm' : 'Δd = −0,00432 mm'}
                </text>
              </>
            )}
          </motion.g>

          {(showStrain || metric === 'check') && (
            <g>
              <text x={BAR_X} y={170} fontSize={9} fontWeight={700} fill={INK}>
                stosunek odkształceń
              </text>
              <rect x={BAR_X} y={178} width={BAR_MAX} height={8} rx={4} fill={MUTED} fillOpacity={0.16} />
              <motion.rect
                x={BAR_X}
                y={178}
                height={8}
                rx={4}
                fill={ACCENT}
                initial={false}
                animate={{ width: BAR_MAX * deform }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <text x={BAR_X} y={198} fontSize={8} fill={ACCENT}>
                ε_x = 900 με
              </text>
              <rect x={BAR_X} y={206} width={BAR_MAX} height={8} rx={4} fill={MUTED} fillOpacity={0.16} />
              <motion.rect
                x={BAR_X}
                y={206}
                height={8}
                rx={4}
                fill={LATERAL}
                initial={false}
                animate={{ width: BAR_MAX * 0.3 * deform }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <text x={BAR_X} y={226} fontSize={8} fill={LATERAL}>
                ε_y = −270 με
              </text>
              <text x={BAR_X} y={244} fontSize={9} fontWeight={700} fill={OK}>
                ε_y / ε_x = −0,30 = −ν
              </text>
            </g>
          )}

          <motion.g
            animate={playing ? { opacity: [0.35, pulse, 0.35] } : { opacity: 0.55 }}
            transition={{ duration: 1.6, repeat: playing ? Infinity : 0, ease: 'easeInOut' }}
          >
            <rect
              x={left - 3}
              y={TOP + 68}
              width={width + 6}
              height={12}
              rx={5}
              fill="none"
              stroke={showStrain ? LATERAL : 'transparent'}
              strokeWidth={1.4}
            />
          </motion.g>

          <text x={14} y={288} fontSize={8.5} fill={MUTED}>
            wydłużenie i skurcz średnicy pokazano w skali poglądowej; kierunki poprzeczne y i z są równoważne
          </text>
        </svg>
      </div>
    </div>
  )
}
