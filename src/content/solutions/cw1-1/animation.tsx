import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const TENSION = '#4f6df5'
const LOAD = '#ff6b45'
const MUTED = '#87929d'
const SUPPORT = '#68727e'
const OK = '#2f7d5b'
const LIMIT = '#a970dd'
const INK = '#17202a'
const GRID = '#d7dde5'

const K = 100
const A = 1000
const DL_DOP = 0.12
const TOTAL_DL = 0.08
const TOTAL_LENGTH = 400

const SEGMENTS = [
  { id: 'g', label: 'górny', length: 100, n: 80, sigma: 80, deltaL: 0.04, areaReq: 800 },
  { id: 's', label: 'środkowy', length: 100, n: 40, sigma: 40, deltaL: 0.02, areaReq: 400 },
  { id: 'd', label: 'dolny', length: 200, n: 20, sigma: 20, deltaL: 0.02, areaReq: 200 },
]

const CX = 118
const TOP = 42
const SPAN = 240
const BOTTOM = TOP + SPAN
const HALF = 20
const ELONGATION_SCALE = 500
const NODES = [TOP]
for (const segment of SEGMENTS) {
  NODES.push(NODES[NODES.length - 1] + (segment.length / TOTAL_LENGTH) * SPAN)
}

const clamp01 = (value: number) => Math.max(0, Math.min(1, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}
const pl = (value: number, digits = 3) => value.toFixed(digits).replace('.', ',')
const mid = (index: number) => (NODES[index] + NODES[index + 1]) / 2

function support() {
  return (
    <g stroke={SUPPORT} strokeWidth={2} strokeLinecap="round">
      <line x1={CX - 54} y1={TOP} x2={CX + 54} y2={TOP} />
      {Array.from({ length: 8 }, (_, index) => {
        const x = CX - 46 + index * 13
        return <line key={index} x1={x} y1={TOP} x2={x - 8} y2={TOP - 12} strokeWidth={1.4} />
      })}
    </g>
  )
}

function Dimension({
  x,
  from,
  to,
  label,
  color = MUTED,
  anchor = 'end',
}: {
  x: number
  from: number
  to: number
  label: string
  color?: string
  anchor?: 'start' | 'end' | 'middle'
}) {
  return (
    <g stroke={color} fill={color}>
      <line x1={x} y1={from} x2={x} y2={to} strokeWidth={1} />
      <line x1={x - 4} y1={from} x2={x + 4} y2={from} strokeWidth={1} />
      <line x1={x - 4} y1={to} x2={x + 4} y2={to} strokeWidth={1} />
      <text
        x={anchor === 'end' ? x - 6 : anchor === 'start' ? x + 6 : x}
        y={(from + to) / 2 + 3}
        textAnchor={anchor}
        fontSize={8.5}
        stroke="none"
      >
        {label}
      </text>
    </g>
  )
}

function LoadArrow({ x, y, label, opacity = 1 }: { x: number; y: number; label: string; opacity?: number }) {
  return (
    <motion.g initial={false} animate={{ opacity }} transition={{ duration: 0.25 }}>
      <line x1={x} y1={y - 32} x2={x} y2={y - 5} stroke={LOAD} strokeWidth={2.2} />
      <path
        d={`M${x - 4.5} ${y - 13} L${x} ${y - 4} L${x + 4.5} ${y - 13}`}
        fill="none"
        stroke={LOAD}
        strokeWidth={2.2}
      />
      <text x={x + 6} y={y - 19} fontSize={8.5} fill={LOAD}>
        {label}
      </text>
    </motion.g>
  )
}

function barPath(nodes: number[]) {
  let path = `M ${CX - HALF} ${nodes[0]} L ${CX + HALF} ${nodes[0]}`
  for (let index = 0; index < SEGMENTS.length; index += 1) {
    path += ` L ${CX + HALF} ${nodes[index + 1]}`
  }
  for (let index = SEGMENTS.length - 1; index >= 0; index -= 1) {
    path += ` L ${CX - HALF} ${nodes[index + 1]}`
    if (index > 0) path += ` L ${CX - HALF} ${nodes[index]}`
  }
  return `${path} Z`
}

function normalPath() {
  const x = 250
  const scale = 104 / 80
  let path = `M ${x} ${TOP} L ${x + SEGMENTS[0].n * scale} ${TOP}`
  for (let index = 0; index < SEGMENTS.length; index += 1) {
    path += ` L ${x + SEGMENTS[index].n * scale} ${NODES[index + 1]}`
    if (index < SEGMENTS.length - 1) {
      path += ` L ${x + SEGMENTS[index + 1].n * scale} ${NODES[index + 1]}`
    }
  }
  return `${path} L ${x} ${BOTTOM} Z`
}

export function AxialDesignThreeForcesAnimation({ scene, index, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const raw = playing ? clamp01(sceneProgress) : 1
  const progress = playing ? smooth(raw) : 1
  const pulse = playing ? 0.72 + 0.28 * Math.sin((sceneProgress * 2.4 + index * 0.35) * Math.PI * 2) : 1

  const isModel = metric === 'model'
  const isNormal = metric === 'N'
  const isStress = metric === 'σ'
  const isArea = metric === 'A'
  const isElongation = metric === 'ΔL'
  const isCheck = metric === 'check'

  const loadReveal = isModel ? smooth(clamp01(raw / 0.45)) : 1
  const diagramReveal = isNormal ? smooth(clamp01((raw - 0.05) / 0.75)) : 1

  const s1 = isElongation ? smooth(clamp01(raw / 0.45)) : isCheck ? progress : 0
  const s2 = isElongation ? smooth(clamp01((raw - 0.18) / 0.5)) : isCheck ? progress : 0
  const s3 = isElongation ? smooth(clamp01((raw - 0.36) / 0.5)) : isCheck ? progress : 0
  const inc1 = SEGMENTS[0].deltaL * s1 * ELONGATION_SCALE
  const inc2 = SEGMENTS[1].deltaL * s2 * ELONGATION_SCALE
  const inc3 = SEGMENTS[2].deltaL * s3 * ELONGATION_SCALE
  const deformed = [TOP, NODES[1] + inc1, NODES[2] + inc1 + inc2, NODES[3] + inc1 + inc2 + inc3]
  const shownTotal = SEGMENTS[0].deltaL * s1 + SEGMENTS[1].deltaL * s2 + SEGMENTS[2].deltaL * s3

  const cutY = TOP + raw * SPAN
  const cutIndex = cutY <= NODES[1] ? 0 : cutY <= NODES[2] ? 1 : 2
  const cutStart = cutIndex === 0 ? TOP : NODES[cutIndex]
  const cutEnd = NODES[cutIndex + 1]
  const cutProgress = cutEnd > cutStart ? (cutY - cutStart) / (cutEnd - cutStart) : 0
  const activeNode = cutY <= NODES[1] ? NODES[0] : cutY <= NODES[2] ? NODES[1] : NODES[2]
  const activeN = cutY <= NODES[1] ? SEGMENTS[0].n : cutY <= NODES[2] ? SEGMENTS[1].n : SEGMENTS[2].n
  const activeCut = activeNode + (NODES[cutIndex + 1] - activeNode) * cutProgress

  const stressX = 250
  const stressScale = 104 / K
  const limitX = stressX + K * stressScale
  const areaX = 250
  const areaScale = 104 / A
  const normalX = 250
  const normalScale = 104 / 80

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 480 350"
          role="img"
          aria-label="Pręt utwierdzony u góry z trzema siłami: model, wykres siły podłużnej, naprężenia, dobór pola, wydłużenie i kontrola warunków"
        >
          {support()}

          <text x={8} y={12} fontSize={8.5} fill={INK}>
            P = 20 kN, 2P = 40 kN · A = 1000 mm²
          </text>
          <text x={8} y={25} fontSize={8.5} fill={MUTED}>
            E = 200 GPa · k = 100 MPa · ΔL_dop = 0,12 mm
          </text>

          {!isElongation &&
            !isCheck &&
            SEGMENTS.map((segment, segmentIndex) => (
              <g key={segment.id}>
                <rect
                  x={CX - HALF}
                  y={NODES[segmentIndex]}
                  width={HALF * 2}
                  height={NODES[segmentIndex + 1] - NODES[segmentIndex]}
                  rx={3}
                  fill={TENSION}
                  fillOpacity={isNormal && segmentIndex === cutIndex ? 0.24 : 0.11}
                  stroke={TENSION}
                  strokeWidth={isNormal && segmentIndex === cutIndex ? 2.2 : 1.4}
                />
                <text
                  x={CX}
                  y={mid(segmentIndex) + 4}
                  textAnchor="middle"
                  fontSize={12}
                  fontWeight={700}
                  fill={TENSION}
                >
                  {segment.id}
                </text>
              </g>
            ))}
          {SEGMENTS.map((segment, segmentIndex) => (
            <Dimension
              key={`dim-${segment.id}`}
              x={84}
              from={NODES[segmentIndex]}
              to={NODES[segmentIndex + 1]}
              label={`${segment.length} mm`}
            />
          ))}

          <LoadArrow x={CX + 36} y={NODES[1]} label="2P = 40 kN" opacity={loadReveal} />
          <LoadArrow x={CX + 36} y={NODES[2]} label="P = 20 kN" opacity={loadReveal} />
          <LoadArrow x={CX + 36} y={NODES[3]} label="P = 20 kN" opacity={loadReveal} />

          {isModel && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <text x={250} y={TOP + 8} fontSize={9} fontWeight={700} fill={INK}>
                model i dane
              </text>
              <text x={250} y={TOP + 24} fontSize={8.5} fill={MUTED}>
                trzy odcinki o stałym polu
              </text>
              <text x={250} y={TOP + 40} fontSize={8.5} fill={MUTED}>
                utwierdzenie u góry, swobodny dół
              </text>
            </motion.g>
          )}

          {isNormal && (
            <g>
              <line x1={normalX} y1={TOP - 8} x2={normalX} y2={BOTTOM + 8} stroke={GRID} strokeWidth={1} />
              <text x={normalX} y={TOP - 14} fontSize={8.5} fontWeight={700} fill={TENSION}>
                N [kN]
              </text>
              <motion.path
                d={normalPath()}
                fill={TENSION}
                fillOpacity={0.16}
                stroke={TENSION}
                strokeWidth={1.8}
                initial={false}
                animate={{ pathLength: diagramReveal }}
                transition={{ duration: 0.2, ease: 'linear' }}
              />
              {SEGMENTS.map((segment, segmentIndex) => {
                const width = segment.n * normalScale
                return (
                  <g key={`n-${segment.id}`}>
                    <line
                      x1={normalX + width}
                      y1={NODES[segmentIndex]}
                      x2={normalX + width}
                      y2={NODES[segmentIndex + 1]}
                      stroke={TENSION}
                      strokeWidth={2.4}
                    />
                    <text x={normalX + width + 5} y={mid(segmentIndex) + 3} fontSize={8.5} fill={TENSION}>
                      N{segment.id} = {segment.n} kN
                    </text>
                  </g>
                )
              })}
              {playing && (
                <>
                  <line
                    x1={CX - HALF - 14}
                    y1={activeCut}
                    x2={normalX + activeN * normalScale}
                    y2={activeCut}
                    stroke={LOAD}
                    strokeWidth={1.2}
                    strokeDasharray="4 3"
                  />
                  <circle cx={CX} cy={activeCut} r={3.2} fill={LOAD} />
                  <text x={normalX - 6} y={activeCut - 6} textAnchor="end" fontSize={8.5} fontWeight={700} fill={LOAD}>
                    N = {activeN} kN
                  </text>
                </>
              )}
              <motion.text
                x={normalX + SEGMENTS[0].n * normalScale + 5}
                y={NODES[1] - 6}
                fontSize={8}
                fill={LOAD}
                initial={false}
                animate={{ opacity: playing ? [0.45, 1, 0.45] : 0.9 }}
                transition={{ duration: 1.5, repeat: playing ? Infinity : 0, ease: 'easeInOut' }}
              >
                skok 40 kN
              </motion.text>
            </g>
          )}

          {isStress && (
            <g>
              <line x1={stressX} y1={TOP - 8} x2={stressX} y2={BOTTOM + 8} stroke={GRID} strokeWidth={1} />
              <text x={stressX} y={TOP - 14} fontSize={8.5} fontWeight={700} fill={INK}>
                σ [MPa]
              </text>
              <line
                x1={limitX}
                y1={TOP - 8}
                x2={limitX}
                y2={BOTTOM + 8}
                stroke={LIMIT}
                strokeWidth={1.5}
                strokeDasharray="4 4"
              />
              <text x={limitX + 4} y={BOTTOM + 20} fontSize={8.5} fontWeight={600} fill={LIMIT}>
                k = 100
              </text>
              {SEGMENTS.map((segment, segmentIndex) => {
                const y = mid(segmentIndex)
                const width = segment.sigma * stressScale * progress
                const active = segmentIndex === 0
                const color = active ? LOAD : TENSION
                return (
                  <g key={`s-${segment.id}`}>
                    <text x={stressX - 5} y={y + 3} textAnchor="end" fontSize={8.5} fontWeight={600} fill={MUTED}>
                      {segment.id}
                    </text>
                    <motion.rect
                      x={stressX}
                      y={y - 7}
                      height={14}
                      rx={3}
                      fill={color}
                      fillOpacity={active ? 0.34 : 0.18}
                      stroke={color}
                      strokeWidth={active ? 2.2 : 1.3}
                      initial={false}
                      animate={{ width }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                    />
                    <text x={stressX + 3} y={y - 10} fontSize={8.5} fill={color} fontWeight={active ? 700 : 500}>
                      σ{segment.id} = {segment.sigma} MPa
                    </text>
                  </g>
                )
              })}
              <motion.text
                x={stressX + SEGMENTS[0].sigma * stressScale + 7}
                y={mid(0) - 16}
                fontSize={8}
                fill={LOAD}
                initial={false}
                animate={{ opacity: playing ? [0.5, 1, 0.5] : 1 }}
                transition={{ duration: 1.5, repeat: playing ? Infinity : 0, ease: 'easeInOut' }}
              >
                maksimum
              </motion.text>
            </g>
          )}

          {isArea && (
            <g>
              <text x={areaX} y={TOP - 14} fontSize={8.5} fontWeight={700} fill={INK}>
                pole przekroju [mm²]
              </text>
              <rect
                x={areaX}
                y={TOP - 6}
                width={A * areaScale}
                height={BOTTOM - TOP + 12}
                rx={3}
                fill={TENSION}
                fillOpacity={0.08}
                stroke={TENSION}
                strokeWidth={1.2}
              />
              <text x={areaX + A * areaScale + 5} y={TOP + 2} fontSize={8.5} fill={MUTED}>
                A = 1000
              </text>
              {SEGMENTS.map((segment, segmentIndex) => {
                const y = mid(segmentIndex)
                const width = segment.areaReq * areaScale * progress
                const active = segmentIndex === 0
                return (
                  <g key={`a-${segment.id}`}>
                    <motion.rect
                      x={areaX}
                      y={y - 7}
                      height={14}
                      rx={3}
                      fill={OK}
                      fillOpacity={active ? 0.4 : 0.22}
                      stroke={OK}
                      strokeWidth={active ? 1.9 : 1.2}
                      initial={false}
                      animate={{ width }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                    />
                    <text
                      x={areaX + A * areaScale + 8}
                      y={y + 3}
                      fontSize={8.5}
                      fill={OK}
                      fontWeight={active ? 700 : 500}
                    >
                      A_req = {segment.areaReq}
                    </text>
                  </g>
                )
              })}
              <text x={areaX} y={BOTTOM + 20} fontSize={8.5} fill={OK}>
                A_req = N / k
              </text>
            </g>
          )}

          {(isElongation || isCheck) && (
            <g>
              <path d={barPath(NODES)} fill="none" stroke={MUTED} strokeWidth={1.2} strokeDasharray="5 4" />
              <motion.rect
                x={CX - HALF}
                width={HALF * 2}
                rx={3}
                fill={TENSION}
                fillOpacity={0.18}
                stroke={TENSION}
                strokeWidth={1.6}
                initial={false}
                animate={{ y: TOP, height: deformed[3] - TOP }}
                transition={{ duration: 0.1, ease: 'linear' }}
              />
              {SEGMENTS.map((segment, segmentIndex) => (
                <text
                  key={`deformed-label-${segment.id}`}
                  x={CX}
                  y={(deformed[segmentIndex] + deformed[segmentIndex + 1]) / 2 + 4}
                  textAnchor="middle"
                  fontSize={12}
                  fontWeight={700}
                  fill={TENSION}
                >
                  {segment.id}
                </text>
              ))}

              {isElongation && (
                <>
                  <Dimension
                    x={166}
                    from={NODES[1]}
                    to={deformed[1]}
                    label={`ΔL₁ = ${pl(SEGMENTS[0].deltaL * s1)} mm`}
                    color={TENSION}
                    anchor="start"
                  />
                  {s2 > 0.01 && (
                    <Dimension
                      x={184}
                      from={NODES[2] + inc1}
                      to={deformed[2]}
                      label={`ΔL₂ = ${pl(SEGMENTS[1].deltaL * s2)} mm`}
                      color={TENSION}
                      anchor="start"
                    />
                  )}
                  {s3 > 0.01 && (
                    <Dimension
                      x={202}
                      from={NODES[3] + inc1 + inc2}
                      to={deformed[3]}
                      label={`ΔL₃ = ${pl(SEGMENTS[2].deltaL * s3)} mm`}
                      color={TENSION}
                      anchor="start"
                    />
                  )}
                  <Dimension
                    x={222}
                    from={BOTTOM}
                    to={deformed[3]}
                    label={`ΔL = ${pl(shownTotal)} mm`}
                    color={INK}
                    anchor="start"
                  />
                  <line
                    x1={60}
                    y1={BOTTOM + DL_DOP * ELONGATION_SCALE}
                    x2={450}
                    y2={BOTTOM + DL_DOP * ELONGATION_SCALE}
                    stroke={LIMIT}
                    strokeWidth={1.4}
                    strokeDasharray="6 4"
                  />
                  <text x={450} y={BOTTOM + DL_DOP * ELONGATION_SCALE - 6} textAnchor="end" fontSize={8.5} fill={LIMIT}>
                    ΔL_dop = 0,12 mm
                  </text>
                  <text x={8} y={338} fontSize={8} fill={MUTED}>
                    kształt pierwotny: linia przerywana; wydłużenie w skali poglądowej
                  </text>
                </>
              )}
            </g>
          )}

          {isCheck && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>
              <text x={250} y={TOP + 8} fontSize={9} fontWeight={700} fill={INK}>
                kontrola projektu
              </text>
              <text x={250} y={TOP + 28} fontSize={8.5} fill={INK}>
                σ_max / k = 80,0%
              </text>
              <rect x={250} y={TOP + 34} width={170} height={9} rx={4.5} fill="#eef1f4" stroke={GRID} strokeWidth={1} />
              <motion.rect
                x={250}
                y={TOP + 34}
                height={9}
                rx={4.5}
                fill={OK}
                fillOpacity={0.42}
                initial={false}
                animate={{ width: 170 * (80 / K) * Math.min(1, progress + 0.001) }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <text x={250} y={TOP + 58} fontSize={8} fill={MUTED}>
                80 ≤ 100 MPa
              </text>

              <text x={250} y={TOP + 82} fontSize={8.5} fill={INK}>
                ΔL / ΔL_dop = 66,7%
              </text>
              <rect x={250} y={TOP + 88} width={170} height={9} rx={4.5} fill="#eef1f4" stroke={GRID} strokeWidth={1} />
              <motion.rect
                x={250}
                y={TOP + 88}
                height={9}
                rx={4.5}
                fill={OK}
                fillOpacity={0.42}
                initial={false}
                animate={{ width: 170 * (TOTAL_DL / DL_DOP) * Math.min(1, progress + 0.001) }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <text x={250} y={TOP + 112} fontSize={8} fill={MUTED}>
                0,08 ≤ 0,12 mm
              </text>

              <line
                x1={420}
                y1={TOP + 22}
                x2={420}
                y2={TOP + 108}
                stroke={LIMIT}
                strokeWidth={1.2}
                strokeDasharray="3 3"
              />
              <text x={420} y={TOP + 122} textAnchor="middle" fontSize={7.5} fill={LIMIT}>
                100%
              </text>

              <motion.g
                initial={false}
                animate={{ opacity: playing ? [0.5, 1, 0.5] : 1 }}
                transition={{ duration: 1.6, repeat: playing ? Infinity : 0, ease: 'easeInOut' }}
              >
                <path
                  d={`M 250 ${TOP + 140} L 257 ${TOP + 147} L 272 ${TOP + 131}`}
                  fill="none"
                  stroke={OK}
                  strokeWidth={2.4}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <text x={279} y={TOP + 144} fontSize={8.5} fontWeight={600} fill={OK}>
                  oba warunki spełnione
                </text>
              </motion.g>

              <motion.text
                x={250}
                y={TOP + 166}
                fontSize={8.5}
                fill={INK}
                initial={false}
                animate={{ opacity: pulse > 0.5 ? 1 : 0.75 }}
              >
                decyduje wytrzymałość
              </motion.text>
            </motion.g>
          )}
        </svg>
      </div>
    </div>
  )
}
