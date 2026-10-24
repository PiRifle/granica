import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const ALU = '#ff8a5c'
const STEEL = '#4f6df5'
const LOAD = '#ff6b45'
const MUTED = '#87929d'
const SUPPORT = '#68727e'
const INK = '#17202a'

const TOP = 66
const BASE = 140
const BOTTOM = TOP + BASE
const PX_PER_MM = 16
const DL_ALU = 1.28 * PX_PER_MM
const DL_STEEL = 0.45 * PX_PER_MM
const DL_THICK = 0.32 * PX_PER_MM

const MAIN_CX = 164
const MAIN_HALF = 30

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}

function Support({ cx, half }: { cx: number; half: number }) {
  return (
    <g stroke={SUPPORT} strokeWidth={2} strokeLinecap="round">
      <line x1={cx - half - 18} y1={TOP} x2={cx + half + 18} y2={TOP} />
      {Array.from({ length: 7 }, (_, index) => {
        const x = cx - half - 12 + index * ((half * 2 + 24) / 6)
        return <line key={index} x1={x} y1={TOP} x2={x - 7} y2={TOP - 11} strokeWidth={1.4} />
      })}
    </g>
  )
}

function DeltaBracket({
  x,
  from,
  to,
  label,
  color,
  opacity,
}: {
  x: number
  from: number
  to: number
  label: string
  color: string
  opacity: number
}) {
  return (
    <motion.g initial={false} animate={{ opacity }} transition={{ duration: 0.3 }}>
      <line x1={x} y1={from} x2={x} y2={to} stroke={color} strokeWidth={1.3} />
      <line x1={x - 5} y1={from} x2={x + 5} y2={from} stroke={color} strokeWidth={1.3} />
      <line x1={x - 5} y1={to} x2={x + 5} y2={to} stroke={color} strokeWidth={1.3} />
      <text x={x + 7} y={(from + to) / 2 + 3} fontSize={8.5} fontWeight={700} fill={color}>
        {label}
      </text>
    </motion.g>
  )
}

function LoadArrow({ x, y, show }: { x: number; y: number; show: number }) {
  return (
    <motion.g initial={false} animate={{ opacity: show }} transition={{ duration: 0.25 }}>
      <g stroke={LOAD} fill={LOAD}>
        <line x1={x} y1={y + 6} x2={x} y2={y + 32} strokeWidth={2.3} />
        <path d={`M${x - 5} ${y + 24} L${x} ${y + 33} L${x + 5} ${y + 24}`} fill="none" strokeWidth={2.3} />
      </g>
      <text x={x + 8} y={y + 26} fontSize={9} fill={LOAD}>
        N
      </text>
    </motion.g>
  )
}

export function HookeStiffness2Animation({ scene, index, playing, sceneProgress }: SolutionAnimationProps) {
  const p = playing ? clamp01(sceneProgress) : 1
  const metric = scene.focus?.metric ?? 'N'

  const mainStretch = index === 3 ? DL_ALU * (playing ? smooth((p - 0.05) / 0.7) : 1) : 0
  const mainBottom = BOTTOM + mainStretch
  const mainLoad = index === 0 ? smooth(p / 0.65) : 1
  const circleT = index === 1 ? (playing ? smooth((p - 0.05) / 0.6) : 1) : 1
  const stressT = index === 2 ? (playing ? smooth(p / 0.5) : 1) : 1
  const compareT = index === 4 ? (playing ? smooth((p - 0.05) / 0.7) : 1) : 1
  const morph = index === 5 ? (playing ? smooth((p - 0.1) / 0.65) : 1) : 0

  const circleCx = 326
  const circleCy = 144
  const circleR = 52
  const thickHalf = 26 + 26 * morph
  const thickStretch = DL_THICK + (DL_ALU - DL_THICK) * (1 - morph)
  const thickBottom = BOTTOM + thickStretch
  const originalBottom = BOTTOM + DL_ALU

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 330"
          role="img"
          aria-label="Aluminiowy pręt kołowy rozciągany siłą 12 kN; animacja przekroju, naprężenia, odkształcenia, wydłużenia oraz porównania ze stalą i z grubszym prętem"
        >
          {index === 4 ? (
            <>
              <text x={230} y={22} textAnchor="middle" fontSize={9} fill={MUTED}>
                to samo N, A i L — zmienia się tylko materiał
              </text>
              <text x={150} y={42} textAnchor="middle" fontSize={10.5} fontWeight={700} fill={STEEL}>
                stal
              </text>
              <text x={150} y={55} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                E_s = 200 GPa
              </text>
              <text x={315} y={42} textAnchor="middle" fontSize={10.5} fontWeight={700} fill={ALU}>
                aluminium
              </text>
              <text x={315} y={55} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                E_a = 70 GPa
              </text>

              <Support cx={150} half={28} />
              <Support cx={315} half={28} />

              <line
                x1={150 - 36}
                y1={BOTTOM}
                x2={150 + 36}
                y2={BOTTOM}
                stroke={MUTED}
                strokeWidth={1.1}
                strokeDasharray="4 4"
                opacity={compareT > 0.2 ? 0.9 : 0}
              />
              <line
                x1={315 - 36}
                y1={BOTTOM}
                x2={315 + 36}
                y2={BOTTOM}
                stroke={MUTED}
                strokeWidth={1.1}
                strokeDasharray="4 4"
                opacity={compareT > 0.2 ? 0.9 : 0}
              />

              <motion.rect
                x={150 - 28}
                y={TOP}
                width={56}
                height={BASE + DL_STEEL * compareT}
                rx={4}
                fill={STEEL}
                fillOpacity={0.18}
                stroke={STEEL}
                strokeWidth={2}
              />
              <motion.rect
                x={315 - 28}
                y={TOP}
                width={56}
                height={BASE + DL_ALU * compareT}
                rx={4}
                fill={ALU}
                fillOpacity={0.18}
                stroke={ALU}
                strokeWidth={2}
              />

              <text x={150} y={TOP + 24} textAnchor="middle" fontSize={8.5} fill={STEEL}>
                σ = 59,7 MPa
              </text>
              <text x={315} y={TOP + 24} textAnchor="middle" fontSize={8.5} fill={ALU}>
                σ = 59,7 MPa
              </text>

              <DeltaBracket
                x={150 + 36}
                from={BOTTOM}
                to={BOTTOM + DL_STEEL * compareT}
                label="ΔL_s ≈ 0,45 mm"
                color={STEEL}
                opacity={compareT}
              />
              <DeltaBracket
                x={315 + 36}
                from={BOTTOM}
                to={BOTTOM + DL_ALU * compareT}
                label="ΔL_a ≈ 1,28 mm"
                color={ALU}
                opacity={compareT}
              />

              <text x={232} y={190} textAnchor="middle" fontSize={9} fontWeight={700} fill={ALU}>
                ×2,86
              </text>

              <LoadArrow x={150} y={BOTTOM + DL_STEEL * compareT} show={1} />
              <LoadArrow x={315} y={BOTTOM + DL_ALU * compareT} show={1} />
            </>
          ) : index === 5 ? (
            <>
              <text x={230} y={22} textAnchor="middle" fontSize={9} fill={MUTED}>
                ta sama siła, ta sama długość, inna średnica
              </text>
              <text x={140} y={43} textAnchor="middle" fontSize={10} fontWeight={700} fill={ALU}>
                d = 16 mm
              </text>
              <text x={305} y={43} textAnchor="middle" fontSize={10} fontWeight={700} fill={ALU}>
                d = 32 mm
              </text>
              <text x={140} y={57} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                A ≈ 201 mm²
              </text>
              <text x={305} y={57} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                A ≈ 804 mm²
              </text>

              <Support cx={140} half={26} />
              <Support cx={305} half={thickHalf} />

              <line
                x1={140 - 34}
                y1={BOTTOM}
                x2={140 + 34}
                y2={BOTTOM}
                stroke={MUTED}
                strokeWidth={1.1}
                strokeDasharray="4 4"
              />
              <line
                x1={305 - thickHalf - 8}
                y1={BOTTOM}
                x2={305 + thickHalf + 8}
                y2={BOTTOM}
                stroke={MUTED}
                strokeWidth={1.1}
                strokeDasharray="4 4"
              />

              <rect
                x={140 - 26}
                y={TOP}
                width={52}
                height={originalBottom - TOP}
                rx={4}
                fill={ALU}
                fillOpacity={0.18}
                stroke={ALU}
                strokeWidth={2}
              />
              <motion.rect
                x={305 - thickHalf}
                y={TOP}
                width={thickHalf * 2}
                height={thickBottom - TOP}
                rx={4}
                fill={ALU}
                fillOpacity={0.18}
                stroke={ALU}
                strokeWidth={2}
                initial={false}
                animate={{ x: 305 - thickHalf, width: thickHalf * 2, height: thickBottom - TOP }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />

              <DeltaBracket
                x={140 + 36}
                from={BOTTOM}
                to={originalBottom}
                label="ΔL ≈ 1,28 mm"
                color={ALU}
                opacity={1}
              />
              <DeltaBracket
                x={305 + thickHalf + 8}
                from={BOTTOM}
                to={thickBottom}
                label="ΔL ≈ 0,32 mm"
                color={ALU}
                opacity={morph}
              />

              <text x={305} y={BOTTOM + 54} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                k ×4, masa ×4
              </text>

              <LoadArrow x={140} y={originalBottom} show={1} />
              <LoadArrow x={305} y={thickBottom} show={1} />
            </>
          ) : (
            <>
              <Support cx={MAIN_CX} half={MAIN_HALF} />

              <g fill={MUTED} fontSize={9}>
                <text x={14} y={86}>
                  N = 12 kN
                </text>
                <text x={14} y={100}>
                  L = 1,5 m
                </text>
                <text x={14} y={114}>
                  d = 16 mm
                </text>
                <text x={14} y={128}>
                  E = 70 GPa
                </text>
              </g>

              <g stroke={MUTED} strokeWidth={1.2} fill="none">
                <line x1={116} y1={TOP} x2={116} y2={BOTTOM} />
                <line x1={111} y1={TOP} x2={121} y2={TOP} />
                <line x1={111} y1={BOTTOM} x2={121} y2={BOTTOM} />
                <text
                  x={108}
                  y={TOP + BASE / 2}
                  textAnchor="middle"
                  fontSize={9}
                  fill={MUTED}
                  stroke="none"
                  transform={`rotate(-90 108 ${TOP + BASE / 2})`}
                >
                  L = 1,5 m
                </text>
              </g>

              <line
                x1={MAIN_CX - MAIN_HALF - 8}
                y1={BOTTOM}
                x2={MAIN_CX + MAIN_HALF + 8}
                y2={BOTTOM}
                stroke={MUTED}
                strokeWidth={1.2}
                strokeDasharray="4 4"
                opacity={mainStretch > 0.5 ? 0.9 : 0.45}
              />

              <motion.rect
                x={MAIN_CX - MAIN_HALF}
                y={TOP}
                width={MAIN_HALF * 2}
                height={mainBottom - TOP}
                rx={4}
                fill={ALU}
                initial={false}
                animate={{
                  height: mainBottom - TOP,
                  fillOpacity: metric === 'σ' || metric === 'ε' || metric === 'ΔL' ? 0.22 : 0.16,
                  strokeWidth: metric === 'σ' || metric === 'ε' || metric === 'ΔL' ? 2.6 : 2,
                }}
                transition={{ duration: 0.12, ease: 'linear' }}
                stroke={ALU}
              />

              <text x={MAIN_CX} y={TOP + 30} textAnchor="middle" fontSize={9.5} fontWeight={700} fill={ALU}>
                A ≈ 201 mm²
              </text>
              <text x={MAIN_CX} y={TOP + 44} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                E = 70 GPa
              </text>

              {index === 0 && (
                <motion.g initial={false} animate={{ opacity: 1 }}>
                  <circle cx={340} cy={128} r={27} fill={ALU} fillOpacity={0.14} stroke={ALU} strokeWidth={2} />
                  <line x1={340 - 27} y1={128} x2={340 + 27} y2={128} stroke={ALU} strokeWidth={1.2} />
                  <line x1={340 - 27} y1={123} x2={340 - 27} y2={133} stroke={ALU} strokeWidth={1.2} />
                  <line x1={340 + 27} y1={123} x2={340 + 27} y2={133} stroke={ALU} strokeWidth={1.2} />
                  <text x={340} y={168} textAnchor="middle" fontSize={9} fill={ALU}>
                    d = 16 mm
                  </text>
                  <text x={340} y={100} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                    przekrój
                  </text>
                </motion.g>
              )}

              {index === 1 && (
                <motion.g initial={false} animate={{ opacity: 1 }}>
                  <motion.circle
                    cx={circleCx}
                    cy={circleCy}
                    r={circleR * circleT}
                    fill={ALU}
                    fillOpacity={0.13}
                    stroke={ALU}
                    strokeWidth={2.2}
                  />
                  <motion.line
                    x1={circleCx - circleR * circleT}
                    y1={circleCy}
                    x2={circleCx + circleR * circleT}
                    y2={circleCy}
                    stroke={ALU}
                    strokeWidth={1.3}
                  />
                  <motion.line
                    x1={circleCx - circleR * circleT}
                    y1={circleCy - 5}
                    x2={circleCx - circleR * circleT}
                    y2={circleCy + 5}
                    stroke={ALU}
                    strokeWidth={1.3}
                  />
                  <motion.line
                    x1={circleCx + circleR * circleT}
                    y1={circleCy - 5}
                    x2={circleCx + circleR * circleT}
                    y2={circleCy + 5}
                    stroke={ALU}
                    strokeWidth={1.3}
                  />
                  <text x={circleCx} y={circleCy + circleR + 20} textAnchor="middle" fontSize={9.5} fill={ALU}>
                    d = 16 mm
                  </text>
                  <text
                    x={circleCx}
                    y={circleCy + circleR + 35}
                    textAnchor="middle"
                    fontSize={9}
                    fontWeight={700}
                    fill={INK}
                  >
                    A = πd²/4 ≈ 201,06 mm²
                  </text>
                </motion.g>
              )}

              {index === 2 && (
                <>
                  <motion.g initial={false} animate={{ opacity: stressT }} transition={{ duration: 0.25 }}>
                    <line
                      x1={MAIN_CX - MAIN_HALF - 10}
                      y1={TOP + 72}
                      x2={MAIN_CX + MAIN_HALF + 10}
                      y2={TOP + 72}
                      stroke={ALU}
                      strokeWidth={1.3}
                      strokeDasharray="3 3"
                    />
                    {Array.from({ length: 5 }, (_, arrow) => {
                      const x = MAIN_CX - MAIN_HALF + 8 + arrow * ((MAIN_HALF * 2 - 16) / 4)
                      return (
                        <g key={arrow} stroke={ALU} fill={ALU}>
                          <line x1={x} y1={TOP + 78} x2={x} y2={TOP + 96} strokeWidth={1.8} />
                          <path d={`M${x - 3.5} ${TOP + 91} L${x} ${TOP + 97} L${x + 3.5} ${TOP + 91}`} fill="none" />
                        </g>
                      )
                    })}
                  </motion.g>
                  <motion.g initial={false} animate={{ opacity: stressT }} transition={{ duration: 0.25 }}>
                    <circle cx={334} cy={146} r={42} fill={ALU} fillOpacity={0.14} stroke={ALU} strokeWidth={2.2} />
                    <text x={334} y={144} textAnchor="middle" fontSize={13} fontWeight={700} fill={ALU}>
                      σ
                    </text>
                    <text x={334} y={160} textAnchor="middle" fontSize={9} fill={ALU}>
                      59,7 MPa
                    </text>
                    <text x={334} y={205} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                      naprężenie równomierne
                    </text>
                  </motion.g>
                  <text x={MAIN_CX} y={TOP + 118} textAnchor="middle" fontSize={9} fontWeight={700} fill={ALU}>
                    σ = N/A ≈ 59,68 MPa
                  </text>
                </>
              )}

              {index === 3 && (
                <>
                  <text x={MAIN_CX + MAIN_HALF + 22} y={TOP + 40} fontSize={10} fontWeight={700} fill={ALU}>
                    ε ≈ 0,000853
                  </text>
                  <text x={MAIN_CX + MAIN_HALF + 22} y={TOP + 54} fontSize={8.5} fill={MUTED}>
                    σ/E = 59,68/70 000
                  </text>
                  <DeltaBracket
                    x={MAIN_CX + MAIN_HALF + 22}
                    from={BOTTOM}
                    to={mainBottom}
                    label="ΔL ≈ 1,28 mm"
                    color={ALU}
                    opacity={playing ? smooth((p - 0.1) / 0.65) : 1}
                  />
                  <text x={MAIN_CX} y={TOP + 118} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                    wydłużenie w powiększeniu
                  </text>
                </>
              )}

              {index <= 3 && <LoadArrow x={MAIN_CX} y={mainBottom} show={mainLoad} />}
            </>
          )}

          <text x={14} y={318} fontSize={8} fill={MUTED}>
            {index >= 3 ? 'wydłużenia pokazano w skali poglądowej' : 'schemat pręta i przekroju w skali poglądowej'}
          </text>
        </svg>
      </div>
    </div>
  )
}
