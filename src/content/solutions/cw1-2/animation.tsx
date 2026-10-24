import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local, SEGMENT_COLORS } from '../../../components/solution-figures/shared'

const TENSION = '#4f6df5'
const STRESS = '#a970dd'
const LOAD = '#ff6b45'
const MUTED = '#87929d'
const SUPPORT = '#68727e'
const AXIS = '#c9d0d9'

const SEGMENTS = [
  {
    id: 'górny',
    name: 'górny',
    shape: 'koło',
    areaLabel: '314,159',
    detail: 'L = 500 mm · d = 20 mm',
    n: 50,
    sigmaLabel: '159,15',
    sigmaValue: 159.15,
    half: 18,
  },
  {
    id: 'dolny',
    name: 'dolny',
    shape: 'kwadrat',
    areaLabel: '1600',
    detail: 'L = 200 mm · a = 40 mm',
    n: 170,
    sigmaLabel: '106,25',
    sigmaValue: 106.25,
    half: 40,
  },
]

const CX = 150
const TOP = 58
const STEP = 208
const BOTTOM = 268
const MID = [(TOP + STEP) / 2, (STEP + BOTTOM) / 2]
const AXIS_X = 300
const N_SCALE = 0.55
const SIGMA_SCALE = 0.4
const N_X = [AXIS_X + SEGMENTS[0].n * N_SCALE, AXIS_X + SEGMENTS[1].n * N_SCALE]
const SIGMA_X = [AXIS_X + SEGMENTS[0].sigmaValue * SIGMA_SCALE, AXIS_X + SEGMENTS[1].sigmaValue * SIGMA_SCALE]

const clamp = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp(value)
  return t * t * (3 - 2 * t)
}

function SegmentTag({ index, showSigma }: { index: number; showSigma: boolean }) {
  const segment = SEGMENTS[index]
  const y = MID[index]
  const x = CX + segment.half + 8
  const sub = index === 0 ? '₂' : '₁'

  return (
    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <g stroke={TENSION} fill="none" strokeWidth={1.8} strokeLinecap="round">
        <line x1={x} y1={y - 24} x2={x} y2={y + 24} />
        <path d={`M${x - 4} ${y - 16} L${x} ${y - 24} L${x + 4} ${y - 16}`} />
        <path d={`M${x - 4} ${y + 16} L${x} ${y + 24} L${x + 4} ${y + 16}`} />
      </g>
      <text x={x + 8} y={y + (showSigma ? -2 : 4)} fontSize={8.5} fontWeight={700} fill={TENSION}>
        {`N${sub} = +${segment.n} kN`}
      </text>
      {showSigma && (
        <text x={x + 8} y={y + 12} fontSize={8.5} fontWeight={700} fill={STRESS}>
          {`σ${sub} = ${segment.sigmaLabel} MPa`}
        </text>
      )}
    </motion.g>
  )
}

export function SteppedBarStressAnimation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const focusId = scene.focus?.segment
  const activeIndex = focusId ? SEGMENTS.findIndex((segment) => segment.id === focusId) : -1
  const draw = playing ? smooth(clamp(sceneProgress / 0.6)) : 1

  const isModel = metric === 'model'
  const isReaction = metric === 'R'
  const isN = metric === 'N'
  const isStress = metric === 'σ' || metric === 'σmax'
  const isArea = metric === 'A'

  const upperRevealN = isN ? (activeIndex === 0 ? draw : activeIndex === 1 ? 1 : 1) : 0
  const jumpRevealN = isN ? (activeIndex === 0 ? 0 : activeIndex === 1 ? draw : 1) : 0
  const lowerRevealN = isN ? (activeIndex === 0 ? 0 : activeIndex === 1 ? draw : 1) : 0
  const upperRevealS = isStress ? (activeIndex === 0 ? draw : activeIndex === 1 ? 1 : 1) : 0
  const jumpRevealS = isStress ? (activeIndex === 0 ? 0 : activeIndex === 1 ? draw : 1) : 0
  const lowerRevealS = isStress ? (activeIndex === 0 ? 0 : activeIndex === 1 ? draw : 1) : 0

  const nUpperPath = `M${AXIS_X} ${TOP} L${N_X[0]} ${TOP} L${N_X[0]} ${STEP}`
  const nJumpPath = `M${N_X[0]} ${STEP} L${N_X[1]} ${STEP}`
  const nLowerPath = `M${N_X[1]} ${STEP} L${N_X[1]} ${BOTTOM} L${AXIS_X} ${BOTTOM}`
  const sigmaUpperPath = `M${AXIS_X} ${TOP} L${SIGMA_X[0]} ${TOP} L${SIGMA_X[0]} ${STEP}`
  const sigmaJumpPath = `M${SIGMA_X[0]} ${STEP} L${SIGMA_X[1]} ${STEP}`
  const sigmaLowerPath = `M${SIGMA_X[1]} ${STEP} L${SIGMA_X[1]} ${BOTTOM} L${AXIS_X} ${BOTTOM}`

  const tagIndices = [0, 1].filter((index) => {
    if (isN) return (index === 0 ? upperRevealN : lowerRevealN) > 0.45
    if (isStress) return (index === 0 ? upperRevealS : lowerRevealS) > 0.45
    return false
  })

  const detailFor = (index: number) => {
    if (isArea || isStress) return `A = ${SEGMENTS[index].areaLabel} mm²`
    if (isModel) return SEGMENTS[index].detail
    return null
  }

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 500 340"
          role="img"
          aria-label="Pręt stopniowany utwierdzony u dołu: górny odcinek kołowy o średnicy 20 milimetrów i dolny kwadratowy o boku 40 milimetrów, obciążony siłą 50 kiloniutonów na końcu i dwiema siłami po 60 kiloniutonów na stopniu; animacja pokazuje siły osiowe i naprężenia w obu odcinkach"
        >
          <g stroke={SUPPORT} strokeWidth={2} strokeLinecap="round">
            <line x1={CX - 58} y1={BOTTOM} x2={CX + 58} y2={BOTTOM} />
            {Array.from({ length: 9 }, (_, tick) => {
              const x = CX - 52 + tick * (104 / 8)
              return <line key={tick} x1={x} y1={BOTTOM} x2={x - 8} y2={BOTTOM + 11} strokeWidth={1.4} />
            })}
          </g>

          {SEGMENTS.map((segment, index) => {
            const active = index === activeIndex
            const y = index === 0 ? TOP : STEP
            const height = index === 0 ? STEP - TOP : BOTTOM - STEP
            const color = SEGMENT_COLORS[index % SEGMENT_COLORS.length]
            return (
              <g key={segment.id}>
                <motion.rect
                  x={CX - segment.half}
                  y={y}
                  width={segment.half * 2}
                  height={height}
                  rx={3}
                  fill={color}
                  stroke={color}
                  initial={false}
                  animate={{ fillOpacity: active ? 0.32 : 0.14, strokeWidth: active ? 3 : 1.6 }}
                  transition={{ duration: 0.28, ease: 'easeOut' }}
                />
                <text
                  x={CX - segment.half - 9}
                  y={MID[index] - 2}
                  textAnchor="end"
                  fontSize={9}
                  fontWeight={700}
                  fill={color}
                >
                  {`${segment.name} · ${segment.shape}`}
                </text>
                {detailFor(index) && (
                  <motion.text
                    x={CX - segment.half - 9}
                    y={MID[index] + 11}
                    textAnchor="end"
                    fontSize={8.5}
                    fill={MUTED}
                    initial={false}
                    animate={{ opacity: 1 }}
                  >
                    {detailFor(index)}
                  </motion.text>
                )}
              </g>
            )
          })}

          <motion.g
            stroke={LOAD}
            fill={LOAD}
            animate={playing ? { opacity: [0.78, 1, 0.78] } : { opacity: 1 }}
            transition={{ duration: 1.8, repeat: playing ? Infinity : 0, ease: 'easeInOut' }}
          >
            <line x1={CX} y1={TOP - 46} x2={CX} y2={TOP - 6} strokeWidth={2.6} />
            <path d={`M${CX - 5} ${TOP - 14} L${CX} ${TOP - 6} L${CX + 5} ${TOP - 14}`} fill="none" strokeWidth={2.6} />
            <text x={CX + 9} y={TOP - 28} fontSize={9} fontWeight={700} stroke="none">
              P₂ = 50 kN
            </text>

            <line x1={CX - 29} y1={STEP - 42} x2={CX - 29} y2={STEP - 4} strokeWidth={2.4} />
            <path
              d={`M${CX - 34} ${STEP - 12} L${CX - 29} ${STEP - 4} L${CX - 24} ${STEP - 12}`}
              fill="none"
              strokeWidth={2.4}
            />
            <line x1={CX + 29} y1={STEP - 42} x2={CX + 29} y2={STEP - 4} strokeWidth={2.4} />
            <path
              d={`M${CX + 24} ${STEP - 12} L${CX + 29} ${STEP - 4} L${CX + 34} ${STEP - 12}`}
              fill="none"
              strokeWidth={2.4}
            />
            <text x={CX - 35} y={STEP - 48} textAnchor="end" fontSize={8.5} fontWeight={600} stroke="none">
              P₁ = 60 kN
            </text>
            <text x={CX + 35} y={STEP - 48} textAnchor="start" fontSize={8.5} fontWeight={600} stroke="none">
              P₁ = 60 kN
            </text>
          </motion.g>

          {isReaction && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: draw }}
              transition={{ duration: 0.3 }}
              stroke={SUPPORT}
              fill={SUPPORT}
            >
              <line x1={CX} y1={BOTTOM + 58} x2={CX} y2={BOTTOM + 16} strokeWidth={2.6} />
              <path
                d={`M${CX - 5} ${BOTTOM + 24} L${CX} ${BOTTOM + 16} L${CX + 5} ${BOTTOM + 24}`}
                fill="none"
                strokeWidth={2.6}
              />
              <text x={CX + 10} y={BOTTOM + 38} fontSize={9} fontWeight={700} stroke="none">
                R = 170 kN
              </text>
            </motion.g>
          )}

          {metric === 'σmax' && (
            <motion.text
              x={CX + 10}
              y={BOTTOM + 30}
              fontSize={9}
              fontWeight={700}
              fill={SUPPORT}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35 }}
            >
              N₁ = R = 170 kN
            </motion.text>
          )}

          {(isN || isStress) && activeIndex >= 0 && (
            <line
              x1={CX - SEGMENTS[activeIndex].half - 16}
              y1={MID[activeIndex]}
              x2={CX + SEGMENTS[activeIndex].half + 2}
              y2={MID[activeIndex]}
              stroke={MUTED}
              strokeWidth={1}
              strokeDasharray="4 4"
              opacity={0.6}
            />
          )}

          {tagIndices.map((index) => (
            <SegmentTag key={`tag-${SEGMENTS[index].id}`} index={index} showSigma={isStress} />
          ))}

          {(isN || isStress) && (
            <g>
              <line x1={AXIS_X} y1={TOP - 8} x2={AXIS_X} y2={BOTTOM + 8} stroke={AXIS} strokeWidth={1.2} />
              <line x1={AXIS_X} y1={TOP - 8} x2={AXIS_X + 18} y2={TOP - 8} stroke={AXIS} strokeWidth={1.2} />
              <path
                d={`M${AXIS_X + 10} ${TOP - 12} L${AXIS_X + 18} ${TOP - 8} L${AXIS_X + 10} ${TOP - 4}`}
                fill="none"
                stroke={AXIS}
                strokeWidth={1.2}
              />
              <text x={AXIS_X + 24} y={TOP - 6} fontSize={9} fontWeight={700} fill={MUTED}>
                {isN ? 'N [kN]' : 'σ [MPa]'}
              </text>
              <text x={AXIS_X} y={BOTTOM + 20} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                0
              </text>
              <text x={AXIS_X - 10} y={BOTTOM + 4} textAnchor="end" fontSize={8.5} fill={MUTED}>
                x
              </text>
            </g>
          )}

          {isN && (
            <g fill="none" strokeLinecap="round" strokeLinejoin="round">
              <motion.path
                d={nUpperPath}
                stroke={TENSION}
                strokeWidth={3}
                initial={false}
                animate={{ pathLength: upperRevealN }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <motion.path
                d={nJumpPath}
                stroke={TENSION}
                strokeWidth={3}
                initial={false}
                animate={{ pathLength: jumpRevealN }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <motion.path
                d={nLowerPath}
                stroke={TENSION}
                strokeWidth={3}
                initial={false}
                animate={{ pathLength: lowerRevealN }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <motion.text
                x={N_X[0] + 6}
                y={MID[0] + 3}
                fontSize={9}
                fontWeight={700}
                fill={TENSION}
                initial={false}
                animate={{ opacity: upperRevealN > 0.4 ? 1 : 0 }}
              >
                +50 kN
              </motion.text>
              <motion.text
                x={N_X[1] + 6}
                y={MID[1] + 3}
                fontSize={9}
                fontWeight={700}
                fill={TENSION}
                initial={false}
                animate={{ opacity: lowerRevealN > 0.4 ? 1 : 0 }}
              >
                +170 kN
              </motion.text>
              <motion.text
                x={N_X[1] + 8}
                y={STEP - 10}
                fontSize={8.5}
                fontWeight={600}
                fill={TENSION}
                initial={false}
                animate={{ opacity: jumpRevealN > 0.4 ? 1 : 0 }}
              >
                skok +120 kN
              </motion.text>
            </g>
          )}

          {isStress && (
            <g fill="none" strokeLinecap="round" strokeLinejoin="round">
              <motion.path
                d={sigmaUpperPath}
                stroke={STRESS}
                strokeWidth={3}
                initial={false}
                animate={{ pathLength: upperRevealS }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <motion.path
                d={sigmaJumpPath}
                stroke={STRESS}
                strokeWidth={3}
                initial={false}
                animate={{ pathLength: jumpRevealS }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <motion.path
                d={sigmaLowerPath}
                stroke={STRESS}
                strokeWidth={3}
                initial={false}
                animate={{ pathLength: lowerRevealS }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <motion.text
                x={SIGMA_X[0] + 6}
                y={MID[0] + 3}
                fontSize={8.5}
                fontWeight={700}
                fill={STRESS}
                initial={false}
                animate={{ opacity: upperRevealS > 0.4 ? 1 : 0 }}
              >
                σ₂ = 159,15 MPa
              </motion.text>
              <motion.text
                x={SIGMA_X[1] + 6}
                y={MID[1] + 3}
                fontSize={8.5}
                fontWeight={700}
                fill={STRESS}
                initial={false}
                animate={{ opacity: lowerRevealS > 0.4 ? 1 : 0 }}
              >
                σ₁ = 106,25 MPa
              </motion.text>
              <motion.text
                x={SIGMA_X[0] + 8}
                y={STEP - 10}
                fontSize={8.5}
                fontWeight={600}
                fill={STRESS}
                initial={false}
                animate={{ opacity: jumpRevealS > 0.4 ? 1 : 0 }}
              >
                σ maleje na stopniu
              </motion.text>
              {metric === 'σmax' && (
                <motion.circle
                  cx={SIGMA_X[0]}
                  cy={MID[0]}
                  r={4}
                  fill={STRESS}
                  stroke="none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.35 }}
                />
              )}
            </g>
          )}
        </svg>
      </div>
      <p className={local('note')}>Szerokość pręta jest proporcjonalna do pierwiastka z pola przekroju.</p>
    </div>
  )
}
