import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const LOAD = '#ff6b45'
const OK = '#2e9e6b'
const MUTED = '#87929d'
const EDGE = '#68727e'
const INK = '#17202a'

const clamp01 = (value: number) => Math.max(0, Math.min(1, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}
const pl = (value: number, digits = 1) => value.toFixed(digits).replace('.', ',')

const X0 = 54
const X1 = 426
const BEAM_Y = 72
const SPAN = X1 - X0
const bx = (position: number) => X0 + (position / 2) * SPAN

const CX = 120
const CY = 185
const SCALE = 1.3
const B_MIN = 38.3
const B_CHOSEN = 40
const H_CHOSEN = 80
const W_MIN = 37500
const W_ACTUAL = 42667
const W_MAX = 50000
const SIGMA = 140.6
const K = 160
const A_RECT = 3200
const A_CIRCLE = 4500
const D_CIRCLE = 75.7

const BAR_X = 220
const BAR_W = 210

const stateLabels: Record<string, string> = {
  load: 'model i obciążenie',
  required: 'wymagany wskaźnik',
  selection: 'przyjęty przekrój',
  stress: 'kontrola naprężeń',
  shape: 'porównanie kształtów',
}

export function SectionDimension2Animation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'load'
  const p = playing ? smooth(sceneProgress) : 1

  const isLoad = metric === 'load'
  const isRequired = metric === 'required'
  const isSelection = metric === 'selection'
  const isStress = metric === 'stress'
  const isShape = metric === 'shape'
  const showSection = isRequired || isSelection || isStress

  const bNow = isRequired ? B_MIN * p : isSelection ? B_MIN + (B_CHOSEN - B_MIN) * p : B_CHOSEN
  const hNow = bNow * 2
  const width = bNow * SCALE
  const height = hNow * SCALE
  const left = CX - width / 2
  const top = CY - height / 2
  const bottom = CY + height / 2

  const utilization = isStress ? (SIGMA / K) * p : 0
  const diagramPeak = 152 - (152 - 120) * (isLoad ? p : 0)
  const wAxis = (value: number) => BAR_X + (value / W_MAX) * BAR_W

  const stressLevels = Array.from({ length: 7 }, (_, index) => {
    const fraction = (index + 1) / 8
    const y = top + fraction * height
    const above = y < CY
    const value = (above ? (CY - y) / (height / 2) : (y - CY) / (height / 2)) * SIGMA
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
          aria-label="Belka swobodnie podparta, dobór prostokątnego przekroju h=2b, kontrola naprężeń i porównanie z kołem"
        >
          <defs>
            <marker
              id="dsd2-arrow"
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
              id="dsd2-dim"
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
            belka swobodnie podparta · L = 2 m · h = 2b
          </text>
          <text x={14} y={32} fontSize={9} fill={MUTED}>
            P = 12 kN · k = 160 MPa · {stateLabels[metric] ?? 'model'}
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

            <line x1={bx(1)} y1={BEAM_Y - 22} x2={bx(1)} y2={BEAM_Y - 5} stroke={LOAD} strokeWidth={2.4} />
            <path
              d={`M${bx(1) - 5} ${BEAM_Y - 14} L${bx(1)} ${BEAM_Y - 5} L${bx(1) + 5} ${BEAM_Y - 14}`}
              fill="none"
              stroke={LOAD}
              strokeWidth={2.4}
            />
            <text x={bx(1)} y={BEAM_Y - 27} textAnchor="middle" fontSize={9} fill={LOAD}>
              P = 12 kN
            </text>

            {!isLoad && (
              <>
                <line
                  x1={X0}
                  y1={BEAM_Y + 36}
                  x2={X1}
                  y2={BEAM_Y + 36}
                  stroke={MUTED}
                  strokeWidth={1}
                  markerStart="url(#dsd2-dim)"
                  markerEnd="url(#dsd2-dim)"
                />
                <text x={(X0 + X1) / 2} y={BEAM_Y + 49} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                  L = 2 m
                </text>
              </>
            )}
          </g>

          {isLoad && (
            <g>
              <polygon
                points={`${X0},${BEAM_Y + 88} ${(X0 + X1) / 2},${diagramPeak} ${X1},${BEAM_Y + 88}`}
                fill={ACCENT}
                fillOpacity={0.12}
                stroke={ACCENT}
                strokeWidth={1.6}
              />
              <text x={(X0 + X1) / 2} y={diagramPeak - 5} textAnchor="middle" fontSize={9} fill={ACCENT}>
                M_max = 6 kN·m
              </text>
              <text x={X0} y={BEAM_Y + 103} fontSize={8.5} fill={MUTED}>
                moment maksymalny w środku rozpiętości
              </text>
            </g>
          )}

          {showSection && (
            <g>
              <line
                x1={left - 10}
                y1={CY}
                x2={left + width + 10}
                y2={CY}
                stroke={LOAD}
                strokeWidth={1.2}
                strokeDasharray="5 4"
              />
              <motion.rect
                x={left}
                y={top}
                rx={2}
                fill="#edf1ff"
                fillOpacity={0.9}
                stroke={isStress ? INK : ACCENT}
                strokeWidth={1.8}
                initial={false}
                animate={{ width, height }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <line
                x1={left - 18}
                y1={top}
                x2={left - 18}
                y2={bottom}
                stroke={MUTED}
                strokeWidth={1}
                markerStart="url(#dsd2-dim)"
                markerEnd="url(#dsd2-dim)"
              />
              <text
                transform={`translate(${left - 25} ${CY}) rotate(-90)`}
                textAnchor="middle"
                fontSize={8.5}
                fill={isSelection ? INK : MUTED}
                fontWeight={isSelection ? 700 : 400}
              >
                h = {pl(hNow)} mm
              </text>
              <line
                x1={left}
                y1={bottom + 16}
                x2={left + width}
                y2={bottom + 16}
                stroke={MUTED}
                strokeWidth={1}
                markerStart="url(#dsd2-dim)"
                markerEnd="url(#dsd2-dim)"
              />
              <text x={CX} y={bottom + 30} textAnchor="middle" fontSize={8.5} fill={isSelection ? INK : MUTED}>
                b = {pl(bNow)} mm
              </text>

              {isStress &&
                stressLevels.map((arrow, index) => {
                  const length = (arrow.value / K) * 62 * p
                  return (
                    <line
                      key={`stress-${index}`}
                      x1={left + width}
                      y1={arrow.y}
                      x2={left + width + length}
                      y2={arrow.y}
                      stroke={arrow.above ? ACCENT : LOAD}
                      strokeWidth={1.5}
                      markerEnd={length > 7 ? 'url(#dsd2-arrow)' : undefined}
                    />
                  )
                })}
            </g>
          )}

          {isRequired && (
            <g>
              <text x={BAR_X} y={140} fontSize={9} fontWeight={700} fill={INK}>
                wymagany wskaźnik przekroju
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
                animate={{ width: wAxis(W_MIN * Math.min(1, p * 1.15)) - BAR_X }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <line
                x1={wAxis(W_MIN)}
                y1={146}
                x2={wAxis(W_MIN)}
                y2={174}
                stroke={LOAD}
                strokeWidth={1.4}
                strokeDasharray="4 3"
              />
              <text x={wAxis(W_MIN)} y={140} textAnchor="middle" fontSize={8} fill={LOAD}>
                W_min
              </text>
              <text x={BAR_X} y={207} fontSize={9} fontWeight={700} fill={ACCENT}>
                W_min = 37 500 mm³
              </text>
              <text x={BAR_X} y={232} fontSize={9} fontWeight={700} fill={LOAD}>
                b_min ≈ 38,3 mm
              </text>
              <text x={BAR_X} y={255} fontSize={8.5} fill={MUTED}>
                potęga zależy od kształtu przekroju
              </text>
            </g>
          )}

          {isSelection && (
            <g>
              <text x={BAR_X} y={140} fontSize={9} fontWeight={700} fill={INK}>
                przyjęty przekrój 40 × 80 mm
              </text>
              <rect x={BAR_X} y={152} width={BAR_W} height={16} rx={8} fill="#edf1f5" />
              <motion.rect
                x={BAR_X}
                y={152}
                height={16}
                rx={8}
                fill={OK}
                fillOpacity={0.28}
                stroke={OK}
                strokeWidth={1.2}
                initial={false}
                animate={{ width: wAxis(W_MIN + (W_ACTUAL - W_MIN) * p) - BAR_X }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <line
                x1={wAxis(W_MIN)}
                y1={146}
                x2={wAxis(W_MIN)}
                y2={174}
                stroke={LOAD}
                strokeWidth={1.4}
                strokeDasharray="4 3"
              />
              <text x={wAxis(W_MIN)} y={140} textAnchor="middle" fontSize={8} fill={LOAD}>
                W_min
              </text>
              <text x={BAR_X} y={207} fontSize={9} fontWeight={700} fill={OK}>
                W = 42 667 mm³ ≥ 37 500 mm³
              </text>
              <text x={BAR_X} y={232} fontSize={8.5} fill={INK}>
                b = 40 mm
              </text>
              <text x={BAR_X} y={250} fontSize={8.5} fill={INK}>
                h = 2b = 80 mm
              </text>
              <text x={BAR_X} y={272} fontSize={8.5} fill={MUTED}>
                wymiar zaokrąglony w górę
              </text>
            </g>
          )}

          {isStress && (
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
                fill={OK}
                fillOpacity={0.3}
                stroke={OK}
                strokeWidth={1.2}
                initial={false}
                animate={{ width: BAR_W * utilization }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <line x1={BAR_X + BAR_W} y1={158} x2={BAR_X + BAR_W} y2={188} stroke={OK} strokeWidth={1.4} />
              <text x={BAR_X + BAR_W} y={154} textAnchor="end" fontSize={8} fill={OK}>
                100%
              </text>
              <text x={BAR_X} y={204} fontSize={9} fill={INK}>
                σ_max = {pl(SIGMA)} MPa
              </text>
              <text x={BAR_X} y={222} fontSize={9} fill={MUTED}>
                k = 160 MPa
              </text>
              <text x={BAR_X} y={245} fontSize={10} fontWeight={700} fill={OK}>
                η = {pl((SIGMA / K) * 100)}% ≤ 100%
              </text>
              <text x={BAR_X} y={264} fontSize={8.5} fill={OK}>
                warunek wytrzymałości spełniony
              </text>
              <text x={BAR_X} y={281} fontSize={8} fill={MUTED}>
                W = 42 667 mm³
              </text>
            </g>
          )}

          {isShape && (
            <g>
              <text x={14} y={124} fontSize={9} fontWeight={700} fill={INK}>
                ten sam wskaźnik W = 42 667 mm³, inne pole przekroju
              </text>

              <rect
                x={79}
                y={CY - (H_CHOSEN * SCALE) / 2}
                width={B_CHOSEN * SCALE}
                height={H_CHOSEN * SCALE}
                rx={2}
                fill="#edf1ff"
                stroke={ACCENT}
                strokeWidth={1.8}
              />
              <line
                x1={79 - 8}
                y1={CY}
                x2={79 + B_CHOSEN * SCALE + 8}
                y2={CY}
                stroke={LOAD}
                strokeWidth={1.1}
                strokeDasharray="5 4"
              />
              <text x={105} y={262} textAnchor="middle" fontSize={8.5} fill={INK}>
                prostokąt 40 × 80
              </text>
              <text x={105} y={276} textAnchor="middle" fontSize={8.5} fontWeight={700} fill={ACCENT}>
                A = {A_RECT.toLocaleString('pl-PL')} mm²
              </text>

              <circle
                cx={300}
                cy={CY}
                r={(D_CIRCLE * SCALE) / 2}
                fill="#f7f2ee"
                fillOpacity={0.7}
                stroke={LOAD}
                strokeWidth={1.8}
              />
              <line
                x1={300 - (D_CIRCLE * SCALE) / 2 - 8}
                y1={CY}
                x2={300 + (D_CIRCLE * SCALE) / 2 + 8}
                y2={CY}
                stroke={LOAD}
                strokeWidth={1.1}
                strokeDasharray="5 4"
              />
              <text x={300} y={262} textAnchor="middle" fontSize={8.5} fill={INK}>
                koło ∅75,7 mm
              </text>
              <text x={300} y={276} textAnchor="middle" fontSize={8.5} fontWeight={700} fill={LOAD}>
                A = {A_CIRCLE.toLocaleString('pl-PL')} mm²
              </text>

              <text x={215} y={294} textAnchor="middle" fontSize={8.5} fill={OK}>
                prostokąt jest lżejszy przy tym samym W
              </text>
            </g>
          )}
        </svg>
      </div>
    </div>
  )
}
