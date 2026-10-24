import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const LOAD = '#ff6b45'
const PLANE = '#d84f28'
const STRESS = '#a970dd'
const MUTED = '#87929d'
const EDGE = '#68727e'
const INK = '#17202a'

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}

const pinCx = 208
const pinW = 20
const planeY = 109
const panelCx = 390
const panelCy = 112
const panelR = 43

export function ShearTechnicalExample1Animation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const p = playing ? smooth(sceneProgress) : 1

  const isModel = metric === 'model'
  const isPlane = metric === 'plane'
  const isArea = metric === 'area'
  const isStress = metric === 'stress'
  const isCheck = metric === 'check'

  const loadAmount = isModel ? smooth(clamp01(p / 0.65)) : 1
  const planeDraw = isPlane ? p : 1
  const areaAmount = isArea ? p : 1
  const stressAmount = isStress ? p : isCheck ? 1 : 0
  const slip = isCheck ? 7 * p : 0
  const gamma = isCheck ? 13 * p : 0

  const topShift = -slip
  const bottomShift = slip
  const planeX1 = 136 + (isCheck ? slip : 0)
  const planeX2 = 288 - (isCheck ? slip : 0)
  const planeRight = planeX1 + (planeX2 - planeX1) * planeDraw

  const pinTopShift = -slip * 0.7
  const pinBottomShift = slip * 0.7
  const pinPoints = [
    `${pinCx - pinW / 2 + pinTopShift},66`,
    `${pinCx + pinW / 2 + pinTopShift},66`,
    `${pinCx + pinW / 2 + pinTopShift},${planeY}`,
    `${pinCx + pinW / 2 + pinBottomShift},${planeY}`,
    `${pinCx + pinW / 2 + pinBottomShift},158`,
    `${pinCx - pinW / 2 + pinBottomShift},158`,
    `${pinCx - pinW / 2 + pinBottomShift},${planeY}`,
    `${pinCx - pinW / 2 + pinTopShift},${planeY}`,
  ].join(' ')

  const showPlane = !isModel
  const showSection = !isCheck
  const showArea = isArea || isStress
  const fillTop = panelCy + panelR - 2 * panelR * areaAmount
  const panelTitle = isArea ? 'pole ścinane A' : isStress ? 'rozkład τ w przekroju' : 'przekrój sworznia'
  const note = isModel
    ? 'dwie blachy, jeden sworzeń, jedna płaszczyzna styku'
    : isPlane
      ? 'sworzeń jest przecięty tylko raz: n = 1'
      : isArea
        ? 'pole ścinane to przekrój poprzeczny, nie powierzchnia boczna'
        : isStress
          ? 'siła przechodzi przez cały przekrój; τ_sr = F/A'
          : 'odkształcenie styczne i lokalne spiętrzenia przy krawędziach'

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 300"
          role="img"
          aria-label="Połączenie jednocięte: dwie blachy i sworzeń o średnicy 20 milimetrów przenoszący siłę 30 kiloniutonów. Animacja pokazuje płaszczyznę ścinania, pole przekroju, rozkład naprężenia stycznego i odkształcenie sworznia."
        >
          <defs>
            <marker
              id="sht1-load"
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
              id="sht1-stress"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={STRESS} />
            </marker>
            <marker
              id="sht1-plane"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={PLANE} />
            </marker>
            <clipPath id="sht1-area-clip">
              <circle cx={panelCx} cy={panelCy} r={panelR - 2} />
            </clipPath>
          </defs>

          <motion.g
            animate={playing ? { opacity: [0.78, 1, 0.78] } : { opacity: 1 }}
            transition={{ duration: 1.8, repeat: playing ? Infinity : 0, ease: 'easeInOut' }}
          >
            <rect
              x={56 + topShift}
              y={82}
              width={232}
              height={26}
              rx={3}
              fill={ACCENT}
              fillOpacity={0.17}
              stroke={ACCENT}
              strokeWidth={1.8}
            />
            <rect
              x={136 + bottomShift}
              y={110}
              width={176}
              height={26}
              rx={3}
              fill={ACCENT}
              fillOpacity={0.1}
              stroke={ACCENT}
              strokeWidth={1.8}
            />
          </motion.g>

          <polygon points={pinPoints} fill="#cfd8e6" stroke={EDGE} strokeWidth={1.6} />

          {isCheck && (
            <>
              <ellipse cx={pinCx - 12} cy={planeY - 2} rx={7} ry={9} fill={PLANE} opacity={0.18 + 0.24 * p} />
              <ellipse cx={pinCx + 12} cy={planeY + 2} rx={7} ry={9} fill={PLANE} opacity={0.18 + 0.24 * p} />
            </>
          )}

          {showPlane && (
            <g>
              <line
                x1={planeX1}
                y1={planeY}
                x2={planeRight}
                y2={planeY}
                stroke={PLANE}
                strokeWidth={7}
                strokeOpacity={0.14}
                strokeLinecap="round"
              />
              <line
                x1={planeX1}
                y1={planeY}
                x2={planeRight}
                y2={planeY}
                stroke={PLANE}
                strokeWidth={2.6}
                strokeLinecap="round"
              />
              <line x1={planeRight} y1={planeY - 6} x2={planeRight} y2={planeY + 6} stroke={PLANE} strokeWidth={1.6} />
            </g>
          )}

          <g opacity={loadAmount > 0.02 ? 1 : 0}>
            <line
              x1={56 + topShift}
              y1={95}
              x2={56 + topShift - 38 * loadAmount}
              y2={95}
              stroke={LOAD}
              strokeWidth={2.6}
              markerEnd="url(#sht1-load)"
            />
            <line
              x1={312 + bottomShift}
              y1={123}
              x2={312 + bottomShift + 38 * loadAmount}
              y2={123}
              stroke={LOAD}
              strokeWidth={2.6}
              markerEnd="url(#sht1-load)"
            />
            <text x={20} y={82} fontSize={10} fontWeight={700} fill={LOAD}>
              F = 30 kN
            </text>
            <text x={300} y={150} fontSize={10} fontWeight={700} fill={LOAD}>
              F = 30 kN
            </text>
          </g>

          <text x={pinCx + 16} y={172} fontSize={9} fill={EDGE}>
            sworzeń ∅20
          </text>

          {isPlane && (
            <g opacity={p}>
              <line
                x1={286}
                y1={98}
                x2={planeRight}
                y2={planeY - 2}
                stroke={PLANE}
                strokeWidth={1}
                strokeDasharray="3 3"
              />
              <text x={290} y={92} fontSize={9} fontWeight={700} fill={PLANE}>
                płaszczyzna
              </text>
              <text x={290} y={103} fontSize={9} fill={PLANE}>
                ścinania (1)
              </text>
            </g>
          )}

          {isModel && (
            <text x={20} y={190} fontSize={9} fill={MUTED}>
              blacha górna ↔ blacha dolna
            </text>
          )}

          {showSection && (
            <g>
              {!isModel && (
                <line
                  x1={pinCx + 12}
                  y1={planeY}
                  x2={panelCx - panelR - 6}
                  y2={panelCy}
                  stroke={MUTED}
                  strokeWidth={1}
                  strokeDasharray="3 4"
                />
              )}
              <text x={panelCx} y={52} textAnchor="middle" fontSize={9} fill={isStress ? STRESS : MUTED}>
                {panelTitle}
              </text>
              <circle
                cx={panelCx}
                cy={panelCy}
                r={panelR}
                fill="#f2f5fa"
                stroke={isStress ? STRESS : EDGE}
                strokeWidth={1.8}
              />
              {showArea && (
                <g clipPath="url(#sht1-area-clip)">
                  <rect
                    x={panelCx - panelR}
                    y={fillTop}
                    width={panelR * 2}
                    height={panelCy + panelR - fillTop}
                    fill={STRESS}
                    fillOpacity={0.24}
                  />
                  {Array.from({ length: 6 }, (_, hatch) => {
                    const y = panelCy - panelR + 12 + hatch * 13
                    return y > fillTop ? (
                      <line
                        key={hatch}
                        x1={panelCx - panelR}
                        y1={y}
                        x2={panelCx + panelR}
                        y2={y + 10}
                        stroke={STRESS}
                        strokeWidth={0.8}
                        strokeOpacity={0.4}
                      />
                    ) : null
                  })}
                </g>
              )}
              <line
                x1={panelCx - panelR}
                y1={panelCy}
                x2={panelCx + panelR}
                y2={panelCy}
                stroke={MUTED}
                strokeWidth={1}
                strokeDasharray="4 3"
              />
              <line
                x1={panelCx - panelR - 4}
                y1={panelCy}
                x2={panelCx - panelR + 4}
                y2={panelCy}
                stroke={MUTED}
                strokeWidth={1}
              />
              <line
                x1={panelCx + panelR - 4}
                y1={panelCy}
                x2={panelCx + panelR + 4}
                y2={panelCy}
                stroke={MUTED}
                strokeWidth={1}
              />
              <text x={panelCx} y={panelCy + panelR + 16} textAnchor="middle" fontSize={9} fill={MUTED}>
                d = 20 mm
              </text>

              {isStress && (
                <g opacity={stressAmount > 0.02 ? 1 : 0}>
                  {[-26, -13, 0, 13, 26].map((offset) => {
                    const chord = Math.sqrt(panelR * panelR - offset * offset) - 8
                    return (
                      <line
                        key={offset}
                        x1={panelCx - chord}
                        y1={panelCy + offset}
                        x2={panelCx - chord + chord * 2 * stressAmount}
                        y2={panelCy + offset}
                        stroke={STRESS}
                        strokeWidth={1.8}
                        markerEnd="url(#sht1-stress)"
                      />
                    )
                  })}
                  <text
                    x={panelCx}
                    y={panelCy - panelR - 8}
                    textAnchor="middle"
                    fontSize={10}
                    fontWeight={700}
                    fill={STRESS}
                  >
                    τ_sr = 95,5 MPa
                  </text>
                  <text x={panelCx} y={panelCy + panelR + 30} textAnchor="middle" fontSize={8} fill={MUTED}>
                    równomiernie w modelu
                  </text>
                </g>
              )}
            </g>
          )}

          {isCheck && (
            <g>
              <text x={panelCx} y={52} textAnchor="middle" fontSize={9} fill={STRESS}>
                element materiału przy płaszczyźnie
              </text>
              <rect
                x={360}
                y={82}
                width={58}
                height={58}
                fill="none"
                stroke={MUTED}
                strokeWidth={1}
                strokeDasharray="4 3"
              />
              <polygon
                points={`${360 + gamma},82 ${418 + gamma},82 ${418},140 ${360},140`}
                fill={STRESS}
                fillOpacity={0.16}
                stroke={STRESS}
                strokeWidth={1.8}
              />
              <line
                x1={366 + gamma}
                y1={82}
                x2={404 + gamma}
                y2={82}
                stroke={STRESS}
                strokeWidth={1.8}
                markerEnd="url(#sht1-stress)"
              />
              <line
                x1={412}
                y1={140}
                x2={374}
                y2={140}
                stroke={STRESS}
                strokeWidth={1.8}
                markerEnd="url(#sht1-stress)"
              />
              <text x={404 + gamma} y={74} textAnchor="middle" fontSize={9} fill={STRESS}>
                τ
              </text>
              <text x={424} y={116} fontSize={9} fill={STRESS}>
                γ
              </text>
              <text x={389} y={162} textAnchor="middle" fontSize={9} fontWeight={700} fill={STRESS}>
                τ_sr = 95,5 MPa
              </text>
              <text x={389} y={176} textAnchor="middle" fontSize={8} fill={MUTED}>
                lokalnie więcej
              </text>
              <text x={20} y={190} fontSize={9} fill={PLANE}>
                spiętrzenia przy krawędziach blach
              </text>
            </g>
          )}

          <text x={20} y={286} fontSize={9} fill={INK}>
            {note}
          </text>
        </svg>
      </div>
    </div>
  )
}
