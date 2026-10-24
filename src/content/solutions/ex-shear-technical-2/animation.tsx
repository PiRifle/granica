import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const LOAD = '#ff6b45'
const GLUE = '#d84f28'
const STRESS = '#a970dd'
const MUTED = '#87929d'
const EDGE = '#68727e'
const INK = '#17202a'

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}

const upper = { x: 54, y: 100, w: 232, h: 28 }
const lower = { x: 174, y: 132, w: 232, h: 28 }
const overlapX1 = 174
const overlapX2 = 286
const glueY = 130

export function ShearTechnicalExample2Animation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const p = playing ? smooth(sceneProgress) : 1

  const isModel = metric === 'model'
  const isPlane = metric === 'plane'
  const isArea = metric === 'area'
  const isTransfer = metric === 'transfer'
  const isEccentric = metric === 'eccentric'
  const isCheck = metric === 'check'

  const loadAmount = isModel ? smooth(clamp01(p / 0.65)) : 1
  const planeAmount = isPlane ? p : 1
  const areaAmount = isArea ? p : 1
  const slip = isCheck ? 9 * p : 0
  const upperShift = -slip
  const lowerShift = slip

  const transferArrows = [182, 200, 218, 236, 254, 272]
  const peel = 12 * p

  const plan = { x: 130, y: 82, w: 180, h: 60 }
  const planFill = plan.w * areaAmount
  const note = isModel
    ? 'dwie deski zakładkowe, obciążenie rozciągające F'
    : isPlane
      ? 'ścinanie odbywa się w płaszczyźnie spoiny, nie w desce'
      : isArea
        ? 'pole ścinane: długość spoiny razy jej szerokość'
        : isTransfer
          ? 'siła przechodzi z jednej deski do drugiej przez całą spoinę'
          : isEccentric
            ? 'mimośród obciążenia wywołuje dodatkowy moment i odrywanie końców'
            : 'odkształcenie postaciowe kleju; wynik porównaj z wytrzymałością kleju'

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 300"
          role="img"
          aria-label="Złącze klejowe zakładkowe o długości spoiny 150 milimetrów i szerokości 50 milimetrów, przenoszące siłę 18 kiloniutonów. Animacja pokazuje płaszczyznę ścinania, pole spoiny, przenoszenie siły, mimośród oraz odkształcenie kleju."
        >
          <defs>
            <marker
              id="sht2-load"
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
              id="sht2-glue"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={GLUE} />
            </marker>
            <marker
              id="sht2-stress"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={STRESS} />
            </marker>
          </defs>

          {isArea ? (
            <g>
              <text x={16} y={64} fontSize={9} fontWeight={700} fill={EDGE}>
                widok z góry na spoinę
              </text>

              <rect
                x={46}
                y={plan.y}
                width={84}
                height={plan.h}
                fill={ACCENT}
                fillOpacity={0.12}
                stroke={ACCENT}
                strokeWidth={1.5}
              />
              <rect
                x={310}
                y={plan.y}
                width={84}
                height={plan.h}
                fill={ACCENT}
                fillOpacity={0.12}
                stroke={ACCENT}
                strokeWidth={1.5}
              />
              <rect
                x={plan.x}
                y={plan.y}
                width={plan.w}
                height={plan.h}
                fill="#f2f5fa"
                stroke={EDGE}
                strokeWidth={1.5}
              />
              <rect x={plan.x} y={plan.y} width={planFill} height={plan.h} fill={GLUE} fillOpacity={0.24} />
              {Array.from({ length: 10 }, (_, hatch) => {
                const x = plan.x + 10 + hatch * 17
                return x <= plan.x + planFill ? (
                  <line
                    key={hatch}
                    x1={x}
                    y1={plan.y}
                    x2={x - 8}
                    y2={plan.y + plan.h}
                    stroke={GLUE}
                    strokeWidth={0.8}
                    strokeOpacity={0.45}
                  />
                ) : null
              })}
              <rect x={plan.x} y={plan.y} width={plan.w} height={plan.h} fill="none" stroke={EDGE} strokeWidth={1.5} />

              <line
                x1={46}
                y1={112}
                x2={46 - 34 * loadAmount}
                y2={112}
                stroke={LOAD}
                strokeWidth={2.4}
                markerEnd="url(#sht2-load)"
                opacity={loadAmount > 0.02 ? 1 : 0}
              />
              <line
                x1={394}
                y1={112}
                x2={394 + 34 * loadAmount}
                y2={112}
                stroke={LOAD}
                strokeWidth={2.4}
                markerEnd="url(#sht2-load)"
                opacity={loadAmount > 0.02 ? 1 : 0}
              />

              <line x1={plan.x} y1={160} x2={plan.x + plan.w} y2={160} stroke={MUTED} strokeWidth={1} />
              <line x1={plan.x} y1={154} x2={plan.x} y2={166} stroke={MUTED} strokeWidth={1} />
              <line x1={plan.x + plan.w} y1={154} x2={plan.x + plan.w} y2={166} stroke={MUTED} strokeWidth={1} />
              <text x={plan.x + plan.w / 2} y={176} textAnchor="middle" fontSize={9} fill={MUTED}>
                l = 150 mm
              </text>
              <line x1={326} y1={plan.y} x2={326} y2={plan.y + plan.h} stroke={MUTED} strokeWidth={1} />
              <line x1={320} y1={plan.y} x2={332} y2={plan.y} stroke={MUTED} strokeWidth={1} />
              <line x1={320} y1={plan.y + plan.h} x2={332} y2={plan.y + plan.h} stroke={MUTED} strokeWidth={1} />
              <text x={336} y={plan.y + plan.h / 2 + 3} fontSize={9} fill={MUTED}>
                b = 50 mm
              </text>

              <text
                x={plan.x + plan.w / 2}
                y={plan.y + plan.h / 2 + 4}
                textAnchor="middle"
                fontSize={11}
                fontWeight={700}
                fill={GLUE}
              >
                A_s = 7 500 mm²
              </text>
              <text x={16} y={208} fontSize={9} fill={MUTED}>
                spoina 150 × 50; grubość deski nie wchodzi do pola
              </text>
              <text x={16} y={224} fontSize={9} fill={INK}>
                siła 18 kN jest przenoszona przez całą powierzchnię spoiny
              </text>
            </g>
          ) : (
            <g>
              <motion.g
                animate={playing ? { opacity: [0.8, 1, 0.8] } : { opacity: 1 }}
                transition={{ duration: 1.8, repeat: playing ? Infinity : 0, ease: 'easeInOut' }}
              >
                <rect
                  x={upper.x + upperShift}
                  y={upper.y}
                  width={upper.w}
                  height={upper.h}
                  rx={2}
                  fill={ACCENT}
                  fillOpacity={0.16}
                  stroke={ACCENT}
                  strokeWidth={1.8}
                />
                <rect
                  x={lower.x + lowerShift}
                  y={lower.y}
                  width={lower.w}
                  height={lower.h}
                  rx={2}
                  fill={ACCENT}
                  fillOpacity={0.1}
                  stroke={ACCENT}
                  strokeWidth={1.8}
                />
              </motion.g>

              {isCheck ? (
                <g>
                  <polygon
                    points={`${overlapX1 + lowerShift},132 ${overlapX2 + lowerShift},132 ${overlapX2 + upperShift},128 ${overlapX1 + upperShift},128`}
                    fill={GLUE}
                    fillOpacity={0.3}
                    stroke={GLUE}
                    strokeWidth={1.6}
                  />
                  {Array.from({ length: 8 }, (_, hatch) => {
                    const x = overlapX1 + 8 + hatch * 15
                    return (
                      <line
                        key={hatch}
                        x1={x + lowerShift}
                        y1={132}
                        x2={x + upperShift}
                        y2={128}
                        stroke={GLUE}
                        strokeWidth={0.9}
                        strokeOpacity={0.6}
                      />
                    )
                  })}
                </g>
              ) : (
                <rect x={overlapX1} y={128} width={overlapX2 - overlapX1} height={4} fill={GLUE} fillOpacity={0.75} />
              )}

              {!isModel && (
                <g>
                  <line
                    x1={overlapX1}
                    y1={glueY}
                    x2={overlapX1 + (overlapX2 - overlapX1) * planeAmount}
                    y2={glueY}
                    stroke={GLUE}
                    strokeWidth={6}
                    strokeOpacity={0.14}
                    strokeLinecap="round"
                  />
                  <line
                    x1={overlapX1}
                    y1={glueY}
                    x2={overlapX1 + (overlapX2 - overlapX1) * planeAmount}
                    y2={glueY}
                    stroke={GLUE}
                    strokeWidth={2.4}
                    strokeLinecap="round"
                  />
                </g>
              )}

              <g opacity={loadAmount > 0.02 ? 1 : 0}>
                <line
                  x1={upper.x + upperShift}
                  y1={114}
                  x2={upper.x + upperShift - 36 * loadAmount}
                  y2={114}
                  stroke={LOAD}
                  strokeWidth={2.5}
                  markerEnd="url(#sht2-load)"
                />
                <line
                  x1={lower.x + lower.w + lowerShift}
                  y1={146}
                  x2={lower.x + lower.w + lowerShift + 36 * loadAmount}
                  y2={146}
                  stroke={LOAD}
                  strokeWidth={2.5}
                  markerEnd="url(#sht2-load)"
                />
                <text x={18} y={100} fontSize={10} fontWeight={700} fill={LOAD}>
                  F = 18 kN
                </text>
                <text x={444} y={164} textAnchor="end" fontSize={10} fontWeight={700} fill={LOAD}>
                  F = 18 kN
                </text>
              </g>

              <line x1={overlapX1} y1={186} x2={overlapX2} y2={186} stroke={MUTED} strokeWidth={1} />
              <line x1={overlapX1} y1={180} x2={overlapX1} y2={192} stroke={MUTED} strokeWidth={1} />
              <line x1={overlapX2} y1={180} x2={overlapX2} y2={192} stroke={MUTED} strokeWidth={1} />
              <text x={(overlapX1 + overlapX2) / 2} y={202} textAnchor="middle" fontSize={9} fill={MUTED}>
                l = 150 mm
              </text>

              {isPlane && (
                <g opacity={p}>
                  <line
                    x1={300}
                    y1={86}
                    x2={overlapX2}
                    y2={glueY - 2}
                    stroke={GLUE}
                    strokeWidth={1}
                    strokeDasharray="3 3"
                  />
                  <text x={300} y={78} fontSize={9} fontWeight={700} fill={GLUE}>
                    płaszczyzna ścinania
                  </text>
                  <text x={300} y={90} fontSize={9} fill={GLUE}>
                    = powierzchnia spoiny
                  </text>
                  <text x={300} y={102} fontSize={9} fill={MUTED}>
                    jeden styk: n = 1
                  </text>
                </g>
              )}

              {isTransfer && (
                <g>
                  <text x={16} y={76} fontSize={9} fontWeight={700} fill={STRESS}>
                    przenoszenie siły przez spoinę
                  </text>
                  {transferArrows.map((x, arrow) => {
                    const amount = smooth(clamp01((p - arrow * 0.07) / 0.5))
                    return (
                      <g key={x} opacity={amount > 0.02 ? 1 : 0}>
                        <line
                          x1={x}
                          y1={122}
                          x2={x + 16 * amount}
                          y2={122}
                          stroke={STRESS}
                          strokeWidth={1.6}
                          markerEnd="url(#sht2-stress)"
                        />
                        <line
                          x1={x}
                          y1={138}
                          x2={x - 16 * amount}
                          y2={138}
                          stroke={STRESS}
                          strokeWidth={1.6}
                          markerEnd="url(#sht2-stress)"
                        />
                      </g>
                    )
                  })}
                  <text x={300} y={116} fontSize={9} fill={STRESS}>
                    τ_sr = 2,4 MPa
                  </text>
                  <text x={300} y={130} fontSize={8} fill={MUTED}>
                    rozkład równomierny
                  </text>
                </g>
              )}

              {isEccentric && (
                <g>
                  <line x1={32} y1={114} x2={428} y2={114} stroke={MUTED} strokeWidth={1} strokeDasharray="5 4" />
                  <line x1={32} y1={146} x2={428} y2={146} stroke={MUTED} strokeWidth={1} strokeDasharray="5 4" />
                  <line x1={332} y1={114} x2={332} y2={146} stroke={LOAD} strokeWidth={1.2} />
                  <line x1={326} y1={114} x2={338} y2={114} stroke={LOAD} strokeWidth={1.2} />
                  <line x1={326} y1={146} x2={338} y2={146} stroke={LOAD} strokeWidth={1.2} />
                  <text x={340} y={133} fontSize={9} fill={LOAD}>
                    e
                  </text>
                  <text x={240} y={76} fontSize={9} fontWeight={700} fill={LOAD}>
                    M = F · e
                  </text>
                  <polygon
                    points={`${overlapX2},128 ${overlapX2 - peel},128 ${overlapX2},${128 - peel * 0.85}`}
                    fill={GLUE}
                    fillOpacity={0.35}
                  />
                  <polygon
                    points={`${overlapX1},132 ${overlapX1 + peel},132 ${overlapX1},${132 + peel * 0.85}`}
                    fill={GLUE}
                    fillOpacity={0.35}
                  />
                  <text x={16} y={176} fontSize={9} fill={MUTED}>
                    osie desek nie pokrywają się; końce spoiny pracują na odrywanie
                  </text>
                </g>
              )}

              {isCheck && (
                <g>
                  <line
                    x1={250}
                    y1={98}
                    x2={244 + upperShift}
                    y2={126}
                    stroke={GLUE}
                    strokeWidth={1}
                    strokeDasharray="3 3"
                  />
                  <text x={254} y={94} fontSize={9} fontWeight={700} fill={GLUE}>
                    γ
                  </text>
                  <text x={300} y={112} fontSize={10} fontWeight={700} fill={STRESS}>
                    τ_sr = 2,4 MPa
                  </text>
                  <text x={300} y={126} fontSize={8} fill={MUTED}>
                    porównaj z wytrzymałością kleju
                  </text>
                </g>
              )}
            </g>
          )}

          <text x={16} y={286} fontSize={9} fill={INK}>
            {note}
          </text>
        </svg>
      </div>
    </div>
  )
}
