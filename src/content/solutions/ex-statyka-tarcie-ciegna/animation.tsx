import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const ROPE = '#4f6df5'
const TENSION = '#27835a'
const FRICTION = '#ff6b45'
const DRUM = '#68727e'
const MUTED = '#9aa5b1'
const INK = '#17202a'

const CENTER = { x: 220, y: 155 }
const RADIUS = 62
const START = { x: CENTER.x - RADIUS, y: CENTER.y }
const END = { x: CENTER.x, y: CENTER.y + RADIUS }
const ARC = `M ${START.x} ${START.y} A ${RADIUS} ${RADIUS} 0 1 1 ${END.x} ${END.y}`

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))

export function RopeFrictionAnimation({ index, playing, sceneProgress }: SolutionAnimationProps) {
  const t = playing ? clamp01(sceneProgress) : 1
  const showArc = index >= 1
  const showElement = index === 2
  const showGraph = index >= 3
  const showResult = index >= 4
  const t2Length = showResult ? 60 + 38 * t : index >= 1 ? 70 : 55
  const t2End = { x: END.x + t2Length, y: END.y }
  const elementAngle = -Math.PI / 4
  const elementPoint = {
    x: CENTER.x + RADIUS * Math.cos(elementAngle),
    y: CENTER.y + RADIUS * Math.sin(elementAngle),
  }
  const radial = { x: Math.cos(elementAngle), y: Math.sin(elementAngle) }
  const tangent = { x: -Math.sin(elementAngle), y: Math.cos(elementAngle) }

  const curve = Array.from({ length: 25 }, (_, i) => {
    const theta = (i / 24) * 1.5 * Math.PI
    const ratio = Math.exp(0.3 * theta)
    return {
      x: 324 + (theta / (1.5 * Math.PI)) * 96,
      y: 128 - (ratio / 4.5) * 64,
    }
  })
  const curvePath = curve.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
  const markerPoint = { x: 324 + 96, y: 128 - (4.11 / 4.5) * 64 }

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg viewBox="0 0 460 340" role="img" aria-label="Lina owinięta wokół walca z napięciami po obu stronach">
          <title>Tarcie liny na walcu</title>
          <desc>Lina opasująca walec na kącie trzech czwartych obrotu, napięcia T1 i T2 oraz wzór Eulera.</desc>
          <defs>
            <marker
              id="ex-ciegna-t1"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={TENSION} />
            </marker>
            <marker
              id="ex-ciegna-t2"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={TENSION} />
            </marker>
            <marker
              id="ex-ciegna-dn"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={FRICTION} />
            </marker>
            <marker
              id="ex-ciegna-dt"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={ROPE} />
            </marker>
          </defs>

          <circle cx={CENTER.x} cy={CENTER.y} r={RADIUS} fill="#eef2fb" stroke={DRUM} strokeWidth="3" />
          <circle cx={CENTER.x} cy={CENTER.y} r="20" fill="#f7f9fc" stroke={DRUM} strokeWidth="2" />
          {[0, 60, 120, 180, 240, 300].map((angle) => {
            const rad = (angle * Math.PI) / 180
            return (
              <line
                key={`spoke-${angle}`}
                x1={CENTER.x + 20 * Math.cos(rad)}
                y1={CENTER.y + 20 * Math.sin(rad)}
                x2={CENTER.x + (RADIUS - 4) * Math.cos(rad)}
                y2={CENTER.y + (RADIUS - 4) * Math.sin(rad)}
                stroke="#c9d3e2"
                strokeWidth="1.2"
              />
            )
          })}
          <circle cx={CENTER.x} cy={CENTER.y} r="3" fill={INK} />

          <path d={ARC} fill="none" stroke={ROPE} strokeWidth="6" strokeLinecap="round" opacity="0.35" />
          {showArc && (
            <motion.path
              d={ARC}
              fill="none"
              stroke={ROPE}
              strokeWidth="6"
              strokeLinecap="round"
              initial={false}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          )}

          <line x1={START.x} y1={START.y} x2={START.x} y2={START.y - 76} stroke={ROPE} strokeWidth="5" />
          <line x1={END.x} y1={END.y} x2={END.x + 40} y2={END.y} stroke={ROPE} strokeWidth="5" />

          <line
            x1={START.x}
            y1={START.y - 58}
            x2={START.x}
            y2={START.y - 102}
            stroke={TENSION}
            strokeWidth="3.6"
            markerEnd="url(#ex-ciegna-t1)"
          />
          <text x={START.x - 10} y={START.y - 110} textAnchor="end" fontSize="12" fill={TENSION}>
            T₁ = 200 N
          </text>

          <line
            x1={END.x + 30}
            y1={END.y}
            x2={t2End.x}
            y2={t2End.y}
            stroke={TENSION}
            strokeWidth="4"
            markerEnd="url(#ex-ciegna-t2)"
          />
          <text x={t2End.x + 4} y={t2End.y - 8} fontSize="12" fill={TENSION}>
            {showResult ? 'T₂ = 822 N' : 'T₂ = ?'}
          </text>

          {showArc && (
            <text x={CENTER.x + 8} y={CENTER.y + 92} fontSize="11" fill={ROPE}>
              θ = 4,712 rad
            </text>
          )}

          {showElement && (
            <g>
              <path
                d={`M ${CENTER.x + RADIUS * Math.cos(elementAngle - 0.22)} ${CENTER.y + RADIUS * Math.sin(elementAngle - 0.22)} A ${RADIUS} ${RADIUS} 0 0 1 ${CENTER.x + RADIUS * Math.cos(elementAngle + 0.22)} ${CENTER.y + RADIUS * Math.sin(elementAngle + 0.22)}`}
                fill="none"
                stroke={FRICTION}
                strokeWidth="9"
                strokeLinecap="round"
              />
              <line
                x1={elementPoint.x}
                y1={elementPoint.y}
                x2={elementPoint.x + radial.x * 30}
                y2={elementPoint.y + radial.y * 30}
                stroke={FRICTION}
                strokeWidth="2.4"
                markerEnd="url(#ex-ciegna-dn)"
              />
              <line
                x1={elementPoint.x}
                y1={elementPoint.y}
                x2={elementPoint.x + tangent.x * 34}
                y2={elementPoint.y + tangent.y * 34}
                stroke={ROPE}
                strokeWidth="2.4"
                markerEnd="url(#ex-ciegna-dt)"
              />
              <text x={elementPoint.x + 8} y={elementPoint.y - 10} fontSize="10" fill={FRICTION}>
                ΔN
              </text>
              <text x={elementPoint.x + 22} y={elementPoint.y + 26} fontSize="10" fill={ROPE}>
                ΔT
              </text>
            </g>
          )}

          {showElement && (
            <g>
              <rect x="306" y="30" width="132" height="96" rx="8" fill="#f7f9fc" stroke="#dfe6f2" />
              <text x="318" y="49" fontSize="10" fill={INK}>
                mały wycinek liny
              </text>
              <text x="318" y="70" fontSize="11" fill={FRICTION}>
                ΔT = μs ΔN
              </text>
              <text x="318" y="90" fontSize="11" fill={ROPE}>
                ΔN ≈ T Δθ
              </text>
              <text x="318" y="112" fontSize="9" fill={MUTED}>
                im większe T, tym większe tarcie
              </text>
            </g>
          )}

          {showGraph && (
            <g>
              <rect x="306" y="30" width="132" height="112" rx="8" fill="#f7f9fc" stroke="#dfe6f2" />
              <text x="318" y="48" fontSize="10" fill={INK}>
                T₂/T₁ = e^(μsθ)
              </text>
              <line x1="324" y1="128" x2="424" y2="128" stroke={MUTED} strokeWidth="1" />
              <line x1="324" y1="128" x2="324" y2="56" stroke={MUTED} strokeWidth="1" />
              <motion.path
                d={curvePath}
                fill="none"
                stroke={ROPE}
                strokeWidth="2.2"
                initial={false}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
              {showResult && (
                <>
                  <circle cx={markerPoint.x} cy={markerPoint.y} r="3" fill={FRICTION} />
                  <text x={markerPoint.x - 4} y={markerPoint.y - 8} textAnchor="end" fontSize="9" fill={FRICTION}>
                    4,11
                  </text>
                </>
              )}
              <text x="374" y="142" textAnchor="middle" fontSize="9" fill={MUTED}>
                kąt opasania θ
              </text>
            </g>
          )}

          {index === 3 && (
            <text x="230" y="322" textAnchor="middle" fontSize="11" fill={ROPE}>
              Wzrost napięcia jest proporcjonalny do chwilowego T
            </text>
          )}
          {index === 4 && (
            <text x="230" y="322" textAnchor="middle" fontSize="11" fill={TENSION}>
              μsθ = 1,414, więc T₂ = 200 · 4,11 ≈ 822 N
            </text>
          )}
          {index === 5 && (
            <text x="230" y="322" textAnchor="middle" fontSize="11" fill={TENSION}>
              822 / 4,11 ≈ 200 N — kontrola odwrotna się zgadza
            </text>
          )}
          {index === 1 && (
            <text x="230" y="322" textAnchor="middle" fontSize="11" fill={ROPE}>
              Trzy czwarte obrotu to 270°, czyli 1,5π radiana
            </text>
          )}
          {index === 0 && (
            <text x="230" y="322" textAnchor="middle" fontSize="11" fill={MUTED}>
              Tarcie rozkłada się na całym łuku styku liny z walcem
            </text>
          )}
        </svg>
      </div>
    </div>
  )
}
