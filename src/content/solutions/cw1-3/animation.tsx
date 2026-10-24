import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local, SEGMENT_COLORS } from '../../../components/solution-figures/shared'

const TENSION = '#4f6df5'
const STRESS = '#a970dd'
const LOAD = '#ff6b45'
const MUTED = '#87929d'
const SUPPORT = '#68727e'
const AXIS = '#c9d0d9'

const CX = 148
const TOP = 55
const GAMMA_B = 130
const BETA_B = 205
const BOT = 315

const SEGMENTS = [
  {
    id: 'γ',
    label: 'γ',
    lengthLabel: '1 m',
    areaLabel: '500',
    areaDetail: 'A₂ = 500 mm²',
    modelDetail: 'L = 1 m · A₂ = 500 mm²',
    n: 70,
    sigmaLabel: '140',
    half: 30,
    top: TOP,
    bottom: GAMMA_B,
    mid: (TOP + GAMMA_B) / 2,
  },
  {
    id: 'β',
    label: 'β',
    lengthLabel: '1 m',
    areaLabel: '500',
    areaDetail: 'A₂ = 500 mm²',
    modelDetail: 'L = 1 m · A₂ = 500 mm²',
    n: 70,
    sigmaLabel: '140',
    half: 30,
    top: GAMMA_B,
    bottom: BETA_B,
    mid: (GAMMA_B + BETA_B) / 2,
  },
  {
    id: 'α',
    label: 'α',
    lengthLabel: '1,5 m',
    areaLabel: '200',
    areaDetail: 'A₁ = 200 mm²',
    modelDetail: 'L = 1,5 m · A₁ = 200 mm²',
    n: 30,
    sigmaLabel: '150',
    half: 19,
    top: BETA_B,
    bottom: BOT,
    mid: (BETA_B + BOT) / 2,
  },
]

const AXIS_X = 300
const N_SCALE = 0.9
const SIGMA_SCALE = 0.55
const N_X = [AXIS_X + SEGMENTS[2].n * N_SCALE, AXIS_X + SEGMENTS[0].n * N_SCALE]
const SIGMA_X = [AXIS_X + 150 * SIGMA_SCALE, AXIS_X + 140 * SIGMA_SCALE]

const clamp = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp(value)
  return t * t * (3 - 2 * t)
}

function SegmentTag({ index, showSigma }: { index: number; showSigma: boolean }) {
  const segment = SEGMENTS[index]
  const y = segment.mid
  const x = CX + segment.half + 8

  return (
    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <g stroke={TENSION} fill="none" strokeWidth={1.8} strokeLinecap="round">
        <line x1={x} y1={y - 24} x2={x} y2={y + 24} />
        <path d={`M${x - 4} ${y - 16} L${x} ${y - 24} L${x + 4} ${y - 16}`} />
        <path d={`M${x - 4} ${y + 16} L${x} ${y + 24} L${x + 4} ${y + 16}`} />
      </g>
      <text x={x + 8} y={y + (showSigma ? -2 : 4)} fontSize={8.5} fontWeight={700} fill={TENSION}>
        {`N${segment.label} = +${segment.n} kN`}
      </text>
      {showSigma && (
        <text x={x + 8} y={y + 12} fontSize={8.5} fontWeight={700} fill={STRESS}>
          {`σ${segment.label} = ${segment.sigmaLabel} MPa`}
        </text>
      )}
    </motion.g>
  )
}

export function ThreeSegmentForceAnimation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const focusId = scene.focus?.segment
  const activeIndex = focusId ? SEGMENTS.findIndex((segment) => segment.id === focusId) : -1
  const draw = playing ? smooth(clamp(sceneProgress / 0.6)) : 1

  const isModel = metric === 'model'
  const isReaction = metric === 'R'
  const isN = metric === 'N'
  const isStress = metric === 'σ' || metric === 'σmax'
  const isArea = metric === 'A'
  const showReactionCheck = (isN && !focusId) || metric === 'σmax'

  const nAlphaReveal = isN ? (activeIndex === 2 ? draw : activeIndex === 1 || activeIndex === 0 ? 1 : 1) : 0
  const nBetaReveal = isN ? (activeIndex === 1 ? draw : activeIndex === 0 ? 1 : activeIndex === 2 ? 0 : 1) : 0
  const nGammaReveal = isN ? (activeIndex === 0 ? draw : activeIndex === 1 || activeIndex === 2 ? 0 : 1) : 0
  const sAlphaReveal = isStress ? (activeIndex === 2 ? draw : 1) : 0
  const sBetaReveal = isStress ? (activeIndex === 1 ? draw : activeIndex === 2 ? 0 : 1) : 0
  const sGammaReveal = isStress ? (activeIndex === 1 ? draw : activeIndex === 2 ? 0 : 1) : 0

  const nAlphaPath = `M${AXIS_X} ${BOT} L${N_X[0]} ${BOT} L${N_X[0]} ${BETA_B}`
  const nBetaPath = `M${N_X[0]} ${BETA_B} L${N_X[1]} ${BETA_B} L${N_X[1]} ${GAMMA_B}`
  const nGammaPath = `M${N_X[1]} ${GAMMA_B} L${N_X[1]} ${TOP} L${AXIS_X} ${TOP}`
  const sAlphaPath = `M${AXIS_X} ${BOT} L${SIGMA_X[0]} ${BOT} L${SIGMA_X[0]} ${BETA_B}`
  const sBetaPath = `M${SIGMA_X[0]} ${BETA_B} L${SIGMA_X[1]} ${BETA_B} L${SIGMA_X[1]} ${GAMMA_B}`
  const sGammaPath = `M${SIGMA_X[1]} ${GAMMA_B} L${SIGMA_X[1]} ${TOP} L${AXIS_X} ${TOP}`

  const tagIndices = [0, 1, 2].filter((index) => {
    if (isN) {
      if (index === 0) return nGammaReveal > 0.45
      if (index === 1) return nBetaReveal > 0.45
      return nAlphaReveal > 0.45
    }
    if (isStress) {
      if (index === 0) return sGammaReveal > 0.45
      if (index === 1) return sBetaReveal > 0.45
      return sAlphaReveal > 0.45
    }
    return false
  })

  const detailFor = (segment: (typeof SEGMENTS)[number]) => {
    if (isArea || isStress) return segment.areaDetail
    if (isModel) return segment.modelDetail
    return null
  }

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 500 370"
          role="img"
          aria-label="Pręt utwierdzony u góry z odcinkami alfa, beta i gamma; odcinek alfa ma mniejsze pole przekroju, a siły 30 i 40 kiloniutonów działają u dołu i na granicy alfa-beta; animacja buduje wykres siły osiowej odcinkami"
        >
          <g stroke={SUPPORT} strokeWidth={2} strokeLinecap="round">
            <line x1={CX - 50} y1={TOP} x2={CX + 50} y2={TOP} />
            {Array.from({ length: 9 }, (_, tick) => {
              const x = CX - 44 + tick * (88 / 8)
              return <line key={tick} x1={x} y1={TOP} x2={x + 8} y2={TOP - 11} strokeWidth={1.4} />
            })}
          </g>

          {SEGMENTS.map((segment, index) => {
            const active = index === activeIndex
            const color = segment.id === 'α' ? SEGMENT_COLORS[0] : SEGMENT_COLORS[1]
            return (
              <g key={segment.id}>
                <motion.rect
                  x={CX - segment.half}
                  y={segment.top}
                  width={segment.half * 2}
                  height={segment.bottom - segment.top}
                  rx={3}
                  fill={color}
                  stroke={color}
                  initial={false}
                  animate={{ fillOpacity: active ? 0.34 : 0.15, strokeWidth: active ? 3 : 1.6 }}
                  transition={{ duration: 0.28, ease: 'easeOut' }}
                />
                <text x={CX} y={segment.mid + 4} textAnchor="middle" fontSize={13} fontWeight={700} fill={color}>
                  {segment.label}
                </text>
                <line
                  x1={CX - segment.half}
                  y1={segment.top}
                  x2={CX + segment.half}
                  y2={segment.top}
                  stroke={color}
                  strokeWidth={1}
                  opacity={0.4}
                />
                <text
                  x={CX - segment.half - 9}
                  y={segment.mid - 2}
                  textAnchor="end"
                  fontSize={9}
                  fontWeight={700}
                  fill={color}
                >
                  {`${segment.label} · ${segment.lengthLabel}`}
                </text>
                {detailFor(segment) && (
                  <motion.text
                    x={CX - segment.half - 9}
                    y={segment.mid + 11}
                    textAnchor="end"
                    fontSize={8.5}
                    fill={MUTED}
                    initial={false}
                    animate={{ opacity: 1 }}
                  >
                    {detailFor(segment)}
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
            <line x1={CX + 122} y1={BETA_B - 42} x2={CX + 122} y2={BETA_B - 6} strokeWidth={2.4} />
            <path
              d={`M${CX + 117} ${BETA_B - 12} L${CX + 122} ${BETA_B - 6} L${CX + 127} ${BETA_B - 12}`}
              fill="none"
              strokeWidth={2.4}
            />
            <line
              x1={CX + SEGMENTS[1].half}
              y1={BETA_B}
              x2={CX + 122}
              y2={BETA_B}
              strokeWidth={1}
              strokeDasharray="3 3"
            />
            <text x={CX + 118} y={BETA_B + 16} textAnchor="end" fontSize={9} fontWeight={700} stroke="none">
              P₂ = 40 kN
            </text>

            <line x1={CX} y1={BOT + 40} x2={CX} y2={BOT + 6} strokeWidth={2.6} />
            <path d={`M${CX - 5} ${BOT + 14} L${CX} ${BOT + 6} L${CX + 5} ${BOT + 14}`} fill="none" strokeWidth={2.6} />
            <text x={CX + 10} y={BOT + 28} fontSize={9} fontWeight={700} stroke="none">
              P₁ = 30 kN
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
              <line x1={CX} y1={TOP - 44} x2={CX} y2={TOP - 14} strokeWidth={2.6} />
              <path
                d={`M${CX - 5} ${TOP - 22} L${CX} ${TOP - 14} L${CX + 5} ${TOP - 22}`}
                fill="none"
                strokeWidth={2.6}
              />
              <text x={CX + 10} y={TOP - 28} fontSize={9} fontWeight={700} stroke="none">
                R = 70 kN
              </text>
            </motion.g>
          )}

          {(isN || isStress) && activeIndex >= 0 && (
            <line
              x1={CX - SEGMENTS[activeIndex].half - 16}
              y1={SEGMENTS[activeIndex].mid}
              x2={CX + SEGMENTS[activeIndex].half + 2}
              y2={SEGMENTS[activeIndex].mid}
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
              <line x1={AXIS_X} y1={TOP - 8} x2={AXIS_X} y2={BOT + 8} stroke={AXIS} strokeWidth={1.2} />
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
              <text x={AXIS_X} y={BOT + 20} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                0
              </text>
              <text x={AXIS_X - 10} y={BOT + 4} textAnchor="end" fontSize={8.5} fill={MUTED}>
                x
              </text>
            </g>
          )}

          {isN && (
            <g fill="none" strokeLinecap="round" strokeLinejoin="round">
              <motion.path
                d={nAlphaPath}
                stroke={TENSION}
                strokeWidth={3}
                initial={false}
                animate={{ pathLength: nAlphaReveal }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <motion.path
                d={nBetaPath}
                stroke={TENSION}
                strokeWidth={3}
                initial={false}
                animate={{ pathLength: nBetaReveal }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <motion.path
                d={nGammaPath}
                stroke={TENSION}
                strokeWidth={3}
                initial={false}
                animate={{ pathLength: nGammaReveal }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <motion.text
                x={N_X[0] + 6}
                y={SEGMENTS[2].mid + 3}
                fontSize={9}
                fontWeight={700}
                fill={TENSION}
                initial={false}
                animate={{ opacity: nAlphaReveal > 0.4 ? 1 : 0 }}
              >
                +30 kN
              </motion.text>
              <motion.text
                x={N_X[1] + 6}
                y={SEGMENTS[1].mid + 3}
                fontSize={9}
                fontWeight={700}
                fill={TENSION}
                initial={false}
                animate={{ opacity: nBetaReveal > 0.4 ? 1 : 0 }}
              >
                +70 kN
              </motion.text>
              <motion.text
                x={N_X[1] + 6}
                y={SEGMENTS[0].mid + 3}
                fontSize={9}
                fontWeight={700}
                fill={TENSION}
                initial={false}
                animate={{ opacity: nGammaReveal > 0.4 ? 1 : 0 }}
              >
                +70 kN
              </motion.text>
              <motion.text
                x={N_X[1] + 10}
                y={BETA_B - 12}
                fontSize={8.5}
                fontWeight={600}
                fill={TENSION}
                initial={false}
                animate={{ opacity: nBetaReveal > 0.4 ? 1 : 0 }}
              >
                skok +40 kN
              </motion.text>
              <motion.text
                x={N_X[1] + 6}
                y={GAMMA_B - 7}
                fontSize={8.5}
                fontWeight={600}
                fill={TENSION}
                initial={false}
                animate={{ opacity: nGammaReveal > 0.4 ? 1 : 0 }}
              >
                bez skoku
              </motion.text>
            </g>
          )}

          {isStress && (
            <g fill="none" strokeLinecap="round" strokeLinejoin="round">
              <motion.path
                d={sAlphaPath}
                stroke={STRESS}
                strokeWidth={3}
                initial={false}
                animate={{ pathLength: sAlphaReveal }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <motion.path
                d={sBetaPath}
                stroke={STRESS}
                strokeWidth={3}
                initial={false}
                animate={{ pathLength: sBetaReveal }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <motion.path
                d={sGammaPath}
                stroke={STRESS}
                strokeWidth={3}
                initial={false}
                animate={{ pathLength: sGammaReveal }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <motion.text
                x={SIGMA_X[0] + 6}
                y={SEGMENTS[2].mid + 3}
                fontSize={8.5}
                fontWeight={700}
                fill={STRESS}
                initial={false}
                animate={{ opacity: sAlphaReveal > 0.4 ? 1 : 0 }}
              >
                σα = 150 MPa
              </motion.text>
              <motion.text
                x={SIGMA_X[1] + 6}
                y={SEGMENTS[1].mid + 3}
                fontSize={8.5}
                fontWeight={700}
                fill={STRESS}
                initial={false}
                animate={{ opacity: sBetaReveal > 0.4 ? 1 : 0 }}
              >
                σβ = 140 MPa
              </motion.text>
              <motion.text
                x={SIGMA_X[1] + 6}
                y={SEGMENTS[0].mid + 3}
                fontSize={8.5}
                fontWeight={700}
                fill={STRESS}
                initial={false}
                animate={{ opacity: sGammaReveal > 0.4 ? 1 : 0 }}
              >
                σγ = 140 MPa
              </motion.text>
              <motion.text
                x={SIGMA_X[1] + 10}
                y={BETA_B - 12}
                fontSize={8.5}
                fontWeight={600}
                fill={STRESS}
                initial={false}
                animate={{ opacity: sBetaReveal > 0.4 ? 1 : 0 }}
              >
                σ: 150 → 140 MPa
              </motion.text>
              <motion.text
                x={SIGMA_X[1] + 6}
                y={GAMMA_B - 7}
                fontSize={8.5}
                fontWeight={600}
                fill={STRESS}
                initial={false}
                animate={{ opacity: sGammaReveal > 0.4 ? 1 : 0 }}
              >
                bez skoku
              </motion.text>
              {metric === 'σmax' && (
                <motion.circle
                  cx={SIGMA_X[0]}
                  cy={SEGMENTS[2].mid}
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

          {showReactionCheck && (
            <motion.text
              x={10}
              y={TOP + 22}
              fontSize={8.5}
              fontWeight={700}
              fill={SUPPORT}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35 }}
            >
              Nγ = R = 70 kN
            </motion.text>
          )}
        </svg>
      </div>
      <p className={local('note')}>Długości i pola są pokazane w skali schematycznej.</p>
    </div>
  )
}
