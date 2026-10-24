import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const LOAD = '#ff6b45'
const MUTED = '#87929d'
const EDGE = '#68727e'
const INK = '#17202a'

const clamp01 = (value: number) => Math.max(0, Math.min(1, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}
const pl = (value: number, digits = 2) => value.toFixed(digits).replace('.', ',')

const X0 = 54
const X1 = 426
const BEAM_Y = 72
const SPAN = X1 - X0
const bx = (position: number) => X0 + (position / 2.5) * SPAN

const CX = 118
const CY = 200
const SCALE = 1.5
const D = 60
const W_VALUE = 21206
const W_SCALE_MAX = 30000
const M_VALUE = 3.18
const M_SCALE_MAX = 4.5
const P_VALUE = 5.09
const REACTION = 2.55
const K = 150

const BAR_X = 220
const BAR_W = 210

const stateLabels: Record<string, string> = {
  geometry: 'geometria przekroju',
  section: 'wskaźnik wytrzymałości',
  moment: 'dopuszczalny moment',
  load: 'dopuszczalna siła',
  check: 'kontrola wykorzystania',
}

export function SectionDimension3Animation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'geometry'
  const p = playing ? smooth(sceneProgress) : 1

  const isGeometry = metric === 'geometry'
  const isSection = metric === 'section'
  const isMoment = metric === 'moment'
  const isLoad = metric === 'load'
  const isCheck = metric === 'check'

  const dNow = isGeometry ? D * p : D
  const radius = Math.max(0, (dNow * SCALE) / 2)
  const top = CY - radius
  const bottom = CY + radius

  const momentNow = isMoment ? M_VALUE * p : isCheck ? M_VALUE : 0
  const loadNow = isLoad ? P_VALUE * p : isCheck ? P_VALUE : 0
  const arrowLength = 8 + (loadNow / P_VALUE) * 22
  const utilization = isCheck ? p : 0

  const diagramPeak = BEAM_Y + 80 - ((BEAM_Y + 80 - (BEAM_Y + 46)) * momentNow) / M_VALUE

  const stressLevels = Array.from({ length: 7 }, (_, index) => {
    const fraction = (index + 1) / 8
    const y = top + fraction * radius * 2
    const above = y < CY
    const value = (above ? (CY - y) / radius : (y - CY) / radius) * K
    return { y, above, value }
  })

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          width={480}
          height={300}
          viewBox="0 0 480 300"
          role="img"
          aria-label="Belka swobodnie podparta z przekrojem kołowym 60 mm, dopuszczalny moment i siła oraz kontrola wykorzystania"
        >
          <defs>
            <marker
              id="dsd3-arrow"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={LOAD} />
            </marker>
            <marker
              id="dsd3-dim"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={MUTED} />
            </marker>
          </defs>

          <text x={14} y={18} fontSize={10} fontWeight={700} fill={INK}>
            belka swobodnie podparta · L = 2,5 m · przekrój kołowy
          </text>
          <text x={14} y={32} fontSize={9} fill={MUTED}>
            d = 60 mm · k = 150 MPa · {stateLabels[metric] ?? 'model'}
          </text>

          <g>
            <line x1={X0} y1={BEAM_Y} x2={X1} y2={BEAM_Y} stroke={EDGE} strokeWidth={4} strokeLinecap="round" />
            <path d={`M${X0 - 9} ${BEAM_Y + 15} L${X0} ${BEAM_Y + 2} L${X0 + 9} ${BEAM_Y + 15} Z`} fill={EDGE} />
            <path d={`M${X1 - 9} ${BEAM_Y + 15} L${X1} ${BEAM_Y + 2} L${X1 + 9} ${BEAM_Y + 15} Z`} fill={EDGE} />
            <text x={X0} y={BEAM_Y + 28} textAnchor="middle" fontSize={9} fill={EDGE}>
              A
            </text>
            <text x={X1} y={BEAM_Y + 28} textAnchor="middle" fontSize={9} fill={EDGE}>
              B
            </text>

            <line
              x1={bx(1.25)}
              y1={BEAM_Y - 5 - arrowLength}
              x2={bx(1.25)}
              y2={BEAM_Y - 5}
              stroke={LOAD}
              strokeWidth={2.4}
              strokeDasharray={isCheck ? undefined : isLoad ? undefined : '4 3'}
            />
            <path
              d={`M${bx(1.25) - 5} ${BEAM_Y - 14} L${bx(1.25)} ${BEAM_Y - 5} L${bx(1.25) + 5} ${BEAM_Y - 14}`}
              fill="none"
              stroke={LOAD}
              strokeWidth={2.4}
            />
            <text x={bx(1.25) + 10} y={BEAM_Y - 22} fontSize={9} fill={LOAD}>
              {isLoad || isCheck ? `P = ${pl(loadNow)} kN` : 'P = ?'}
            </text>

            {!isMoment && (
              <>
                <line
                  x1={X0}
                  y1={BEAM_Y + 36}
                  x2={X1}
                  y2={BEAM_Y + 36}
                  stroke={MUTED}
                  strokeWidth={1}
                  markerStart="url(#dsd3-dim)"
                  markerEnd="url(#dsd3-dim)"
                />
                <text x={(X0 + X1) / 2} y={BEAM_Y + 49} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                  L = 2,5 m
                </text>
              </>
            )}
          </g>

          {isMoment && (
            <g>
              <polygon
                points={`${X0},${BEAM_Y + 80} ${(X0 + X1) / 2},${diagramPeak} ${X1},${BEAM_Y + 80}`}
                fill={ACCENT}
                fillOpacity={0.12}
                stroke={ACCENT}
                strokeWidth={1.6}
              />
              <text x={(X0 + X1) / 2} y={diagramPeak - 5} textAnchor="middle" fontSize={9} fill={ACCENT}>
                M_max = {pl(momentNow)} kN·m
              </text>
            </g>
          )}

          {(isGeometry || isSection || isLoad || isCheck) && (
            <g>
              <line
                x1={CX - radius - 10}
                y1={CY}
                x2={CX + radius + 10}
                y2={CY}
                stroke={LOAD}
                strokeWidth={1.2}
                strokeDasharray="5 4"
              />
              <motion.circle
                cx={CX}
                cy={CY}
                fill="#edf1ff"
                fillOpacity={0.85}
                stroke={isCheck ? INK : ACCENT}
                strokeWidth={1.8}
                initial={false}
                animate={{ r: radius }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              {!isCheck && (
                <>
                  <line
                    x1={CX - radius - 18}
                    y1={top}
                    x2={CX - radius - 18}
                    y2={bottom}
                    stroke={MUTED}
                    strokeWidth={1}
                    markerStart="url(#dsd3-dim)"
                    markerEnd="url(#dsd3-dim)"
                  />
                  <text
                    transform={`translate(${CX - radius - 25} ${CY}) rotate(-90)`}
                    textAnchor="middle"
                    fontSize={8.5}
                    fill={isGeometry ? INK : MUTED}
                    fontWeight={isGeometry ? 700 : 400}
                  >
                    d = {pl(dNow)} mm
                  </text>
                </>
              )}
              <text x={CX} y={CY + radius + 20} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                pełne koło
              </text>

              {isCheck &&
                stressLevels.map((arrow, index) => {
                  const length = (arrow.value / K) * 52 * p
                  return (
                    <line
                      key={`stress-${index}`}
                      x1={CX - radius}
                      y1={arrow.y}
                      x2={CX - radius - length}
                      y2={arrow.y}
                      stroke={arrow.above ? ACCENT : LOAD}
                      strokeWidth={1.5}
                      markerEnd={length > 7 ? 'url(#dsd3-arrow)' : undefined}
                    />
                  )
                })}
            </g>
          )}

          {isSection && (
            <g>
              <text x={BAR_X} y={140} fontSize={9} fontWeight={700} fill={INK}>
                wskaźnik wytrzymałości
              </text>
              <rect x={BAR_X} y={152} width={BAR_W} height={16} rx={8} fill="#edf1f5" />
              <motion.rect
                x={BAR_X}
                y={152}
                height={16}
                rx={8}
                fill={ACCENT}
                fillOpacity={0.28}
                stroke={ACCENT}
                strokeWidth={1.2}
                initial={false}
                animate={{ width: (W_VALUE / W_SCALE_MAX) * BAR_W * Math.min(1, p * 1.15) }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <text x={BAR_X} y={207} fontSize={9} fontWeight={700} fill={ACCENT}>
                W = 21 206 mm³
              </text>
              <text x={BAR_X} y={230} fontSize={8.5} fill={INK}>
                d = 60 mm
              </text>
              <text x={BAR_X} y={248} fontSize={8.5} fill={MUTED}>
                cecha przekroju niezależna od P
              </text>
              <text x={BAR_X} y={272} fontSize={8.5} fill={MUTED}>
                teraz pytamy o dopuszczalne obciążenie
              </text>
            </g>
          )}

          {isMoment && (
            <g>
              <text x={BAR_X} y={196} fontSize={9} fontWeight={700} fill={INK}>
                dopuszczalny moment
              </text>
              <rect x={BAR_X} y={208} width={BAR_W} height={16} rx={8} fill="#edf1f5" />
              <motion.rect
                x={BAR_X}
                y={208}
                height={16}
                rx={8}
                fill={ACCENT}
                fillOpacity={0.28}
                stroke={ACCENT}
                strokeWidth={1.2}
                initial={false}
                animate={{ width: (M_VALUE / M_SCALE_MAX) * BAR_W * p }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <text x={BAR_X} y={259} fontSize={9} fontWeight={700} fill={ACCENT}>
                M_max = 3 180 900 N·mm
              </text>
              <text x={BAR_X} y={278} fontSize={8.5} fill={MUTED}>
                M_max ≈ 3,18 kN·m = PL/4
              </text>
            </g>
          )}

          {isLoad && (
            <g>
              <text x={BAR_X} y={140} fontSize={9} fontWeight={700} fill={INK}>
                dopuszczalna siła
              </text>
              <text x={BAR_X} y={156} fontSize={8.5} fill={MUTED}>
                P / P_max
              </text>
              <rect x={BAR_X} y={164} width={BAR_W} height={18} rx={9} fill="#edf1f5" />
              <motion.rect
                x={BAR_X}
                y={164}
                height={18}
                rx={9}
                fill={LOAD}
                fillOpacity={0.28}
                stroke={LOAD}
                strokeWidth={1.2}
                initial={false}
                animate={{ width: (loadNow / P_VALUE) * BAR_W }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <text x={BAR_X} y={204} fontSize={9} fill={INK}>
                P_max = {pl(P_VALUE)} kN
              </text>
              <text x={BAR_X} y={246} fontSize={8.5} fill={INK}>
                R_A = R_B = {pl(REACTION)} kN
              </text>
              <text x={BAR_X} y={264} fontSize={8.5} fill={MUTED}>
                M_max = 3,18 kN·m
              </text>
              <text x={BAR_X} y={282} fontSize={8} fill={MUTED}>
                siła wyczerpuje nośność przekroju
              </text>
            </g>
          )}

          {isCheck && (
            <g>
              <text x={BAR_X} y={140} fontSize={9} fontWeight={700} fill={INK}>
                wykorzystanie przekroju
              </text>
              <text x={BAR_X} y={156} fontSize={8.5} fill={MUTED}>
                σ / k
              </text>
              <rect x={BAR_X} y={164} width={BAR_W} height={18} rx={9} fill="#edf1f5" />
              <motion.rect
                x={BAR_X}
                y={164}
                height={18}
                rx={9}
                fill={LOAD}
                fillOpacity={0.28}
                stroke={LOAD}
                strokeWidth={1.2}
                initial={false}
                animate={{ width: BAR_W * utilization }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <line x1={BAR_X + BAR_W} y1={158} x2={BAR_X + BAR_W} y2={188} stroke={LOAD} strokeWidth={1.4} />
              <text x={BAR_X + BAR_W} y={154} textAnchor="end" fontSize={8} fill={LOAD}>
                100%
              </text>
              <text x={BAR_X} y={204} fontSize={9} fill={INK}>
                σ_max = 150 MPa
              </text>
              <text x={BAR_X} y={222} fontSize={9} fill={MUTED}>
                k = 150 MPa
              </text>
              <text x={BAR_X} y={245} fontSize={10} fontWeight={700} fill={LOAD}>
                η = {pl(utilization * 100, 0)}%
              </text>
              <text x={BAR_X} y={264} fontSize={8.5} fill={LOAD}>
                brak zapasu — granica nośności
              </text>
              <text x={BAR_X} y={282} fontSize={8} fill={MUTED}>
                w projekcie zmniejsz P lub zwiększ d
              </text>
            </g>
          )}
        </svg>
      </div>
    </div>
  )
}
