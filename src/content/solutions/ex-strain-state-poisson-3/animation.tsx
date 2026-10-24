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
const CX = 132
const D0 = 76
const ORIGINAL_BOTTOM = 228
const STRETCH = 34
const CONTRACT = 16

const SECTION_X = 352
const SECTION_Y = 100
const SECTION_R = 36

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}

function Support({ cx, half }: { cx: number; half: number }) {
  return (
    <g stroke={SUPPORT} strokeWidth={2} strokeLinecap="round">
      <line x1={cx - half - 18} y1={TOP} x2={cx + half + 18} y2={TOP} />
      {Array.from({ length: 8 }, (_, index) => {
        const x = cx - half - 13 + index * ((half * 2 + 26) / 7)
        return <line key={index} x1={x} y1={TOP} x2={x - 6} y2={TOP - 10} strokeWidth={1.4} />
      })}
    </g>
  )
}

function Rod({
  cx,
  d0,
  contract,
  stretch,
  top,
  originalBottom,
  deform,
  color,
  showLateral,
  showAxial,
  showStress,
}: {
  cx: number
  d0: number
  contract: number
  stretch: number
  top: number
  originalBottom: number
  deform: number
  color: string
  showLateral?: boolean
  showAxial?: boolean
  showStress?: boolean
}) {
  const width = d0 - contract * deform
  const left = cx - width / 2
  const right = cx + width / 2
  const bottom = originalBottom + stretch * deform

  return (
    <g>
      <rect
        x={cx - d0 / 2}
        y={top}
        width={d0}
        height={originalBottom - top}
        rx={4}
        fill="none"
        stroke={MUTED}
        strokeWidth={1.2}
        strokeDasharray="4 4"
        opacity={0.7}
      />
      <rect
        x={left}
        y={top}
        width={width}
        height={bottom - top}
        rx={4}
        fill={showStress ? LATERAL : ACCENT}
        fillOpacity={showStress ? 0.16 : 0.13}
        stroke={showStress ? LATERAL : ACCENT}
        strokeWidth={2}
      />
      {showAxial && (
        <g stroke={ACCENT} fill={ACCENT}>
          <line
            x1={cx}
            y1={top + 16}
            x2={cx}
            y2={bottom - 8}
            strokeWidth={1.4}
            markerEnd={`url(#${color === ACCENT ? 'p3-axial' : 'p3-axial-dim'})`}
            opacity={0.8}
          />
        </g>
      )}
      {showLateral && (
        <g>
          <line
            x1={left - 14}
            y1={top + (bottom - top) / 2}
            x2={left + 8}
            y2={top + (bottom - top) / 2}
            stroke={LATERAL}
            strokeWidth={1.8}
            markerEnd="url(#p3-lateral)"
          />
          <line
            x1={right + 14}
            y1={top + (bottom - top) / 2}
            x2={right - 8}
            y2={top + (bottom - top) / 2}
            stroke={LATERAL}
            strokeWidth={1.8}
            markerEnd="url(#p3-lateral)"
          />
        </g>
      )}
      {showStress && (
        <g stroke={LATERAL} fill={LATERAL}>
          <line
            x1={cx - d0 / 2 - 14}
            y1={top + (originalBottom - top) * 0.75}
            x2={left - 2}
            y2={top + (originalBottom - top) * 0.75}
            strokeWidth={2}
            markerEnd="url(#p3-lateral)"
          />
          <line
            x1={cx + d0 / 2 + 14}
            y1={top + (originalBottom - top) * 0.75}
            x2={right + 2}
            y2={top + (originalBottom - top) * 0.75}
            strokeWidth={2}
            markerEnd="url(#p3-lateral)"
          />
        </g>
      )}
    </g>
  )
}

export function PoissonExample3Animation({ scene, index, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const p = playing ? clamp01(sceneProgress) : 1
  const deform = smooth(p)
  const pulse = playing ? 0.55 + 0.45 * Math.sin((sceneProgress * 3 + index) * Math.PI * 2) : 1

  const radius = SECTION_R - 7 * deform
  const isCheck = metric === 'check'

  const mainBottom = ORIGINAL_BOTTOM + STRETCH * deform
  const mainWidth = D0 - CONTRACT * deform
  const mainLeft = CX - mainWidth / 2

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 300"
          role="img"
          aria-label="Wałek o średnicy 10 mm. Animacja pokazuje skurcz średnicy do dopuszczalnego limitu 2 mikrometrów i odpowiadające mu wydłużenie osiowe."
        >
          <defs>
            <marker
              id="p3-lateral"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={LATERAL} />
            </marker>
            <marker
              id="p3-axial"
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
              id="p3-axial-dim"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={ACCENT} />
            </marker>
          </defs>

          <text x={14} y={18} fontSize={10.5} fontWeight={700} fill={INK}>
            wałek: limit zmiany średnicy
          </text>
          <text x={14} y={33} fontSize={8.5} fill={MUTED}>
            d₀ = 10 mm · |Δd| ≤ 0,002 mm · ν = 0,30
          </text>

          {isCheck ? (
            <g>
              <text x={108} y={54} textAnchor="middle" fontSize={9.5} fontWeight={700} fill={LATERAL}>
                limit 2 μm
              </text>
              <text x={272} y={54} textAnchor="middle" fontSize={9.5} fontWeight={700} fill={OK}>
                limit 0,2 μm
              </text>
              <Support cx={108} half={26} />
              <Support cx={272} half={26} />
              <Rod
                cx={108}
                d0={52}
                contract={13}
                stretch={30}
                top={TOP}
                originalBottom={200}
                deform={deform}
                color={LATERAL}
                showLateral
                showStress
              />
              <Rod
                cx={272}
                d0={52}
                contract={1.3}
                stretch={3}
                top={TOP}
                originalBottom={200}
                deform={deform}
                color={OK}
                showLateral
                showStress
              />
              <text x={108} y={236} textAnchor="middle" fontSize={8.5} fill={LATERAL}>
                Δd = 2 μm
              </text>
              <text x={108} y={250} textAnchor="middle" fontSize={8.5} fontWeight={700} fill={LATERAL}>
                σ = 133,41 MPa
              </text>
              <text x={272} y={236} textAnchor="middle" fontSize={8.5} fill={OK}>
                Δd = 0,2 μm
              </text>
              <text x={272} y={250} textAnchor="middle" fontSize={8.5} fontWeight={700} fill={OK}>
                σ = 13,34 MPa
              </text>
              <text x={190} y={278} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                dziesięciokrotnie mniejsza zmiana średnicy daje dziesięciokrotnie mniejsze naprężenie
              </text>
            </g>
          ) : (
            <g>
              <Support cx={CX} half={D0 / 2} />
              <Rod
                cx={CX}
                d0={D0}
                contract={CONTRACT}
                stretch={STRETCH}
                top={TOP}
                originalBottom={ORIGINAL_BOTTOM}
                deform={deform}
                color={ACCENT}
                showLateral={metric === 'lateral' || metric === 'model'}
                showAxial={metric === 'axial' || metric === 'model'}
                showStress={metric === 'stress'}
              />

              <g stroke={MUTED} strokeWidth={1.2} fill="none">
                <line x1={CX - D0 / 2 - 24} y1={TOP} x2={CX - D0 / 2 - 24} y2={ORIGINAL_BOTTOM} />
                <line x1={CX - D0 / 2 - 29} y1={TOP} x2={CX - D0 / 2 - 19} y2={TOP} />
                <line x1={CX - D0 / 2 - 29} y1={ORIGINAL_BOTTOM} x2={CX - D0 / 2 - 19} y2={ORIGINAL_BOTTOM} />
                <text
                  x={CX - D0 / 2 - 32}
                  y={(TOP + ORIGINAL_BOTTOM) / 2}
                  textAnchor="middle"
                  fontSize={9}
                  fill={MUTED}
                  stroke="none"
                  transform={`rotate(-90 ${CX - D0 / 2 - 32} ${(TOP + ORIGINAL_BOTTOM) / 2})`}
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
                  y1={mainBottom + 6}
                  x2={CX}
                  y2={mainBottom + 26}
                  stroke={LATERAL}
                  strokeWidth={2.4}
                  markerEnd="url(#p3-lateral)"
                />
              </motion.g>

              {metric === 'stress' && (
                <text x={CX + 8} y={mainBottom + 28} fontSize={9.5} fill={LATERAL}>
                  σ = 133,41 MPa
                </text>
              )}

              {metric === 'axial' && (
                <>
                  <line
                    x1={CX + 26}
                    y1={ORIGINAL_BOTTOM}
                    x2={CX + 26}
                    y2={mainBottom}
                    stroke={ACCENT}
                    strokeWidth={1.2}
                  />
                  <text x={CX + 32} y={(ORIGINAL_BOTTOM + mainBottom) / 2 + 3} fontSize={8.5} fill={ACCENT}>
                    ΔL
                  </text>
                  <text x={CX + 10} y={TOP + 34} fontSize={9} fontWeight={700} fill={ACCENT}>
                    ε_osi = 667 με
                  </text>
                </>
              )}

              {metric === 'lateral' && (
                <text x={mainLeft - 18} y={TOP + 78} textAnchor="end" fontSize={8.5} fill={LATERAL}>
                  |ε_poprz| = 200 με
                </text>
              )}

              <text x={SECTION_X} y={SECTION_Y - SECTION_R - 16} textAnchor="middle" fontSize={9} fill={MUTED}>
                przekrój (powiększony)
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
              <circle
                cx={SECTION_X}
                cy={SECTION_Y}
                r={SECTION_R - 4}
                fill="none"
                stroke={LATERAL}
                strokeWidth={8}
                opacity={0.16}
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
                y1={SECTION_Y + SECTION_R + 14}
                x2={SECTION_X + SECTION_R}
                y2={SECTION_Y + SECTION_R + 14}
                stroke={MUTED}
                strokeWidth={1.1}
              />
              <text x={SECTION_X} y={SECTION_Y + SECTION_R + 28} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                d₀ = 10 mm
              </text>

              <motion.g
                animate={playing ? { opacity: [0.35, pulse, 0.35] } : { opacity: 0.55 }}
                transition={{ duration: 1.6, repeat: playing ? Infinity : 0, ease: 'easeInOut' }}
              >
                <circle
                  cx={SECTION_X}
                  cy={SECTION_Y}
                  r={SECTION_R - 4}
                  fill="none"
                  stroke={LATERAL}
                  strokeWidth={1.4}
                  strokeDasharray="3 3"
                />
              </motion.g>

              <text x={SECTION_X} y={SECTION_Y + SECTION_R + 44} textAnchor="middle" fontSize={8} fill={LATERAL}>
                strefa |Δd| ≤ 0,002 mm
              </text>
            </g>
          )}

          <text x={14} y={296} fontSize={8.5} fill={MUTED}>
            skurcz średnicy i wydłużenie osiowe są powiększone poglądowo
          </text>
        </svg>
      </div>
    </div>
  )
}
