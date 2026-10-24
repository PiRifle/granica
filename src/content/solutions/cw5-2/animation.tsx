import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const HOT = '#ff6b45'
const GREEN = '#2f7d5b'
const MUTED = '#87929d'
const INK = '#17202a'
const LINE = '#c9d0d9'
const STROKE = '#7d8fa5'

const SCALE = 17
const DRAW_X = 55
const DRAW_TOP = 32
const SECTION_HEIGHT = 15
const px = (x: number) => DRAW_X + x * SCALE
const py = (y: number) => DRAW_TOP + (SECTION_HEIGHT - y) * SCALE

const CX = 5
const CY = 8.2539
const TY = 7.26
const LY = 11.23
const LX = 2.13
const A_T = 20.9
const A_L = 3.49
const I_XT = 178.2
const I_YL = 6.43
const I_YT = 87.9

const AD_T = A_T * (TY - CY) ** 2
const AD_L = 2 * A_L * (LY - CY) ** 2
const IX = I_XT + AD_T + 2 * I_YL + AD_L
const IY_T = I_YT
const IY = IY_T + 2 * I_YL + 2 * A_L * LX ** 2

const BAR_BASE = 270
const BAR_MAX_HEIGHT = 140
const BAR_X_1 = 375
const BAR_X_2 = 435
const BAR_WIDTH = 40

const STAGES: Record<string, number> = {
  model: 0,
  'part-centroids': 1,
  centroid: 2,
  'steiner-x': 3,
  ix: 4,
  iy: 5,
  result: 6,
}

const NOTES: Record<string, string> = {
  model: 'Przekrój złożony: teownik T 100×100 i dwa symetryczne kątowniki L 45×45×4.',
  'part-centroids': 'Każdy profil ma własny środek ciężkości; oś y pokrywa się z osią symetrii.',
  centroid: 'Wspólny centroid leży na osi symetrii, więc x_C = 0.',
  'steiner-x': 'Oś własna części przesuwa się do wspólnej osi x_C, a składnik AΔy² rośnie z kwadratem odległości.',
  ix: 'Moment I_xc jest stały; o wielkości I_x decydują przede wszystkim składniki AΔy².',
  iy: 'Dla osi y osie pionowe kątowników przesuwają się o 2,13 cm do osi symetrii.',
  result: 'Osi x i y są centralnymi osiami głównymi, bo y jest osią symetrii i I_xy = 0.',
}

const PARTS = [
  { x: 0, y: 9, width: 10, height: 1, fill: '#f2f5fa' },
  { x: 4.6, y: 0, width: 0.8, height: 9, fill: '#edf1ff' },
  { x: 4.1, y: 10, width: 0.4, height: 4.5, fill: '#dfe6f2' },
  { x: 0.9, y: 10, width: 3.6, height: 0.4, fill: '#dfe6f2' },
  { x: 5.5, y: 10, width: 0.4, height: 4.5, fill: '#dfe6f2' },
  { x: 5.5, y: 10, width: 3.6, height: 0.4, fill: '#dfe6f2' },
]

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}
const fmt = (value: number, digits = 2) => value.toFixed(digits).replace('.', ',').replace('-', '−')

function VDimension({
  x,
  from,
  to,
  label,
  color = HOT,
  opacity = 1,
}: {
  x: number
  from: number
  to: number
  label: string
  color?: string
  opacity?: number
}) {
  return (
    <motion.g initial={false} animate={{ opacity }} transition={{ duration: 0.3 }} stroke={color} fill={color}>
      <line x1={x} y1={from} x2={x} y2={to} strokeWidth={1.1} />
      <line x1={x - 4} y1={from} x2={x + 4} y2={from} strokeWidth={1.1} />
      <line x1={x - 4} y1={to} x2={x + 4} y2={to} strokeWidth={1.1} />
      <text x={x + 6} y={(from + to) / 2 + 3} fontSize={8.5} stroke="none">
        {label}
      </text>
    </motion.g>
  )
}

function Legend({ x, y, items }: { x: number; y: number; items: Array<{ color: string; label: string }> }) {
  return (
    <g>
      {items.map((item, index) => (
        <g key={item.label}>
          <rect
            x={x}
            y={y + index * 13}
            width={8}
            height={8}
            fill={item.color}
            fillOpacity={0.22}
            stroke={item.color}
            strokeWidth={1}
          />
          <text x={x + 12} y={y + index * 13 + 7} fontSize={8} fill={MUTED}>
            {item.label}
          </text>
        </g>
      ))}
    </g>
  )
}

function TermBar({
  x,
  value,
  max,
  color,
  label,
  valueLabel,
}: {
  x: number
  value: number
  max: number
  color: string
  label: string
  valueLabel: string
}) {
  const height = max > 0 ? (value / max) * 108 : 0
  return (
    <g>
      <line x1={x - 8} y1={BAR_BASE + 2} x2={x + BAR_WIDTH + 8} y2={BAR_BASE + 2} stroke={LINE} strokeWidth={1} />
      <motion.rect
        x={x}
        width={BAR_WIDTH}
        fill={color}
        fillOpacity={0.2}
        stroke={color}
        strokeWidth={1.3}
        initial={false}
        animate={{ y: BAR_BASE - height, height: Math.max(height, 0.5) }}
        transition={{ duration: 0.12, ease: 'linear' }}
      />
      <text
        x={x + BAR_WIDTH / 2}
        y={BAR_BASE - height - 6}
        textAnchor="middle"
        fontSize={8.5}
        fontWeight={700}
        fill={color}
      >
        {valueLabel}
      </text>
      <text x={x + BAR_WIDTH / 2} y={BAR_BASE + 16} textAnchor="middle" fontSize={9} fill={MUTED}>
        {label}
      </text>
    </g>
  )
}

function StackedBar({
  x,
  max,
  parts,
  label,
}: {
  x: number
  max: number
  parts: Array<{ value: number; color: string; label?: string }>
  label: string
}) {
  const scale = BAR_MAX_HEIGHT / max
  let cursor = BAR_BASE
  return (
    <g>
      {parts.map((part, index) => {
        const height = part.value * scale
        const y = cursor - height
        cursor = y
        return (
          <g key={index}>
            <motion.rect
              x={x}
              width={BAR_WIDTH}
              fill={part.color}
              fillOpacity={0.2}
              stroke={part.color}
              strokeWidth={1.2}
              initial={false}
              animate={{ y, height: Math.max(height, 0.5) }}
              transition={{ duration: 0.12, ease: 'linear' }}
            />
            {part.label && height >= 12 && (
              <text x={x + BAR_WIDTH / 2} y={y + height / 2 + 3} textAnchor="middle" fontSize={7.5} fill={part.color}>
                {part.label}
              </text>
            )}
          </g>
        )
      })}
      <text x={x + BAR_WIDTH / 2} y={BAR_BASE + 16} textAnchor="middle" fontSize={9} fill={INK}>
        {label}
      </text>
    </g>
  )
}

export function SteinerCompositeAnimation({ scene, index, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const stage = STAGES[metric] ?? 0
  const p = playing ? smooth(sceneProgress) : 1
  const at = (step: number) => (stage > step ? 1 : stage === step ? p : 0)

  const shift = stage === 3 ? smooth(clamp01((p - 0.1) / 0.75)) : stage > 3 ? 1 : 0
  const horizontalShift = stage === 5 ? smooth(clamp01((p - 0.1) / 0.75)) : stage > 5 ? 1 : 0

  const axisT = TY + (CY - TY) * shift
  const axisL = LY + (CY - LY) * shift
  const dyT = axisT - CY
  const dyL = axisL - CY
  const termT = A_T * dyT ** 2
  const termL = 2 * A_L * dyL ** 2
  const termMax = Math.max(AD_T, AD_L, 0.0001)

  const leftAxis = CX - LX * (1 - horizontalShift)
  const rightAxis = CX + LX * (1 - horizontalShift)

  const centroidP = at(2)
  const angleP = at(1)
  const steinerP = at(3)
  const resultP = at(6)

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 500 330"
          role="img"
          aria-label="Przekrój złożony z teownika i dwóch kątowników. Animacja pokazuje centroidy profili, wspólną oś centralną oraz przesunięcie osi i składnik A delta y kwadrat."
        >
          {PARTS.map((part, partIndex) => (
            <rect
              key={partIndex}
              x={px(part.x)}
              y={py(part.y + part.height)}
              width={part.width * SCALE}
              height={part.height * SCALE}
              fill={part.fill}
              stroke={STROKE}
              strokeWidth={1.3}
            />
          ))}

          <text x={px(5)} y={14} textAnchor="middle" fontSize={8.5} fill={MUTED}>
            T 100×100 + 2×L 45×45×4
          </text>

          <motion.g initial={false} animate={{ opacity: at(0) }} transition={{ duration: 0.3 }}>
            <line x1={px(-0.4)} y1={py(0)} x2={px(10.4)} y2={py(0)} stroke={MUTED} strokeWidth={1.1} />
            <line x1={px(-0.4)} y1={py(0) - 4} x2={px(-0.4)} y2={py(0) + 4} stroke={MUTED} strokeWidth={1.1} />
            <line x1={px(10.4)} y1={py(0) - 4} x2={px(10.4)} y2={py(0) + 4} stroke={MUTED} strokeWidth={1.1} />
            <text x={px(10.4) + 6} y={py(0) + 3} fontSize={9} fill={MUTED}>
              x
            </text>
            <line x1={px(5)} y1={py(-0.4)} x2={px(5)} y2={py(15.2)} stroke={ACCENT} strokeWidth={1.5} />
            <text x={px(5) + 6} y={py(15.2) + 3} fontSize={9} fill={ACCENT}>
              y
            </text>
          </motion.g>

          <line
            x1={px(5)}
            y1={py(0)}
            x2={px(5)}
            y2={py(14.8)}
            stroke={ACCENT}
            strokeWidth={1.2}
            strokeDasharray="5 4"
            opacity={0.65}
          />

          <motion.g initial={false} animate={{ opacity: angleP }} transition={{ duration: 0.3 }}>
            {stage <= 2 && (
              <>
                <line
                  x1={px(0)}
                  y1={py(TY)}
                  x2={px(10)}
                  y2={py(TY)}
                  stroke={GREEN}
                  strokeWidth={1.3}
                  strokeDasharray="5 4"
                />
                <line
                  x1={px(0)}
                  y1={py(LY)}
                  x2={px(10)}
                  y2={py(LY)}
                  stroke={HOT}
                  strokeWidth={1.3}
                  strokeDasharray="5 4"
                />
              </>
            )}
            <circle cx={px(5)} cy={py(TY)} r={3.3} fill={GREEN} />
            <circle cx={px(5 - LX)} cy={py(LY)} r={3.3} fill={HOT} />
            <circle cx={px(5 + LX)} cy={py(LY)} r={3.3} fill={HOT} />
            <text x={px(5) + 7} y={py(TY) - 6} fontSize={8.5} fill={GREEN}>
              C_T
            </text>
            <text x={px(5 - LX) - 7} y={py(LY) - 7} textAnchor="end" fontSize={8.5} fill={HOT}>
              C_L
            </text>
            <text x={px(5 + LX) + 7} y={py(LY) - 7} fontSize={8.5} fill={HOT}>
              C_L
            </text>
          </motion.g>

          {stage === 1 && (
            <>
              <VDimension x={236} from={py(0)} to={py(TY)} label={`y_T = ${fmt(TY)}`} color={GREEN} opacity={at(1)} />
              <VDimension x={266} from={py(0)} to={py(LY)} label={`y_L = ${fmt(LY)}`} color={HOT} opacity={at(1)} />
              <text x={px(5)} y={py(14.8) - 10} textAnchor="middle" fontSize={8.5} fill={HOT}>
                x_L = ±{fmt(LX)} cm
              </text>
            </>
          )}

          <motion.g initial={false} animate={{ opacity: centroidP }} transition={{ duration: 0.3 }}>
            <line x1={px(-0.4)} y1={py(CY)} x2={px(10.4)} y2={py(CY)} stroke={HOT} strokeWidth={2.2} />
            <circle cx={px(5)} cy={py(CY)} r={4} fill={INK} />
            <text x={px(5) + 7} y={py(CY) - 7} fontSize={9} fill={INK}>
              C
            </text>
            <text x={px(-0.4) - 4} y={py(CY) - 6} textAnchor="end" fontSize={8.5} fill={HOT}>
              x_C
            </text>
          </motion.g>

          {stage === 3 && (
            <>
              <motion.line
                x1={px(0)}
                x2={px(10)}
                stroke={GREEN}
                strokeWidth={1.8}
                strokeDasharray="5 4"
                initial={false}
                animate={{ y1: py(axisT), y2: py(axisT) }}
                transition={{ duration: 0.1, ease: 'linear' }}
              />
              <motion.line
                x1={px(0)}
                x2={px(10)}
                stroke={HOT}
                strokeWidth={1.8}
                strokeDasharray="5 4"
                initial={false}
                animate={{ y1: py(axisL), y2: py(axisL) }}
                transition={{ duration: 0.1, ease: 'linear' }}
              />
              <VDimension
                x={236}
                from={py(CY)}
                to={py(TY)}
                label={`${fmt(Math.abs(TY - CY), 4)} cm`}
                color={GREEN}
                opacity={steinerP}
              />
              <VDimension
                x={266}
                from={py(CY)}
                to={py(LY)}
                label={`${fmt(Math.abs(LY - CY), 4)} cm`}
                color={HOT}
                opacity={steinerP}
              />
              <text x={px(5)} y={py(14.8) - 10} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                Δy_T i Δy_L
              </text>
            </>
          )}

          {stage === 5 && (
            <>
              <motion.line
                y1={py(0)}
                y2={py(14.8)}
                stroke={HOT}
                strokeWidth={1.8}
                strokeDasharray="5 4"
                initial={false}
                animate={{ x1: px(leftAxis), x2: px(leftAxis) }}
                transition={{ duration: 0.1, ease: 'linear' }}
              />
              <motion.line
                y1={py(0)}
                y2={py(14.8)}
                stroke={HOT}
                strokeWidth={1.8}
                strokeDasharray="5 4"
                initial={false}
                animate={{ x1: px(rightAxis), x2: px(rightAxis) }}
                transition={{ duration: 0.1, ease: 'linear' }}
              />
              <line
                x1={px(leftAxis)}
                y1={py(14.8) - 5}
                x2={px(rightAxis)}
                y2={py(14.8) - 5}
                stroke={HOT}
                strokeWidth={1.1}
              />
              <text x={px(CX)} y={py(14.8) - 12} textAnchor="middle" fontSize={8.5} fill={HOT}>
                x_L = {fmt(LX)} cm → 0
              </text>
            </>
          )}

          {stage === 3 && (
            <>
              <text x={410} y={40} textAnchor="middle" fontSize={9} fill={MUTED}>
                AΔy² [cm⁴]
              </text>
              <TermBar x={BAR_X_1} value={termT} max={termMax} color={GREEN} label="T" valueLabel={fmt(termT)} />
              <TermBar x={BAR_X_2} value={termL} max={termMax} color={HOT} label="2×L" valueLabel={fmt(termL)} />
            </>
          )}

          {stage === 4 && (
            <>
              <text x={410} y={36} textAnchor="middle" fontSize={9} fill={MUTED}>
                I_x — składniki
              </text>
              <Legend
                x={320}
                y={48}
                items={[
                  { color: GREEN, label: 'I_xc' },
                  { color: HOT, label: 'AΔy²' },
                ]}
              />
              <StackedBar
                x={BAR_X_1}
                max={IX}
                label="T"
                parts={[
                  { value: I_XT, color: GREEN, label: 'I_xc' },
                  { value: AD_T, color: HOT, label: 'AΔy²' },
                ]}
              />
              <StackedBar
                x={BAR_X_2}
                max={IX}
                label="2×L"
                parts={[
                  { value: 2 * I_YL, color: GREEN },
                  { value: AD_L, color: HOT },
                ]}
              />
            </>
          )}

          {stage === 5 && (
            <>
              <text x={410} y={36} textAnchor="middle" fontSize={9} fill={MUTED}>
                I_y — składniki
              </text>
              <Legend
                x={320}
                y={48}
                items={[
                  { color: GREEN, label: 'I_yc' },
                  { color: HOT, label: 'A x_L²' },
                ]}
              />
              <StackedBar x={BAR_X_1} max={IY} label="T" parts={[{ value: IY_T, color: GREEN }]} />
              <StackedBar
                x={BAR_X_2}
                max={IY}
                label="2×L"
                parts={[
                  { value: 2 * I_YL, color: GREEN },
                  { value: 2 * A_L * LX ** 2, color: HOT, label: 'A x_L²' },
                ]}
              />
            </>
          )}

          {stage === 6 && (
            <motion.g initial={false} animate={{ opacity: resultP }} transition={{ duration: 0.35 }}>
              <line x1={365} y1={205} x2={460} y2={205} stroke={ACCENT} strokeWidth={1.8} />
              <line x1={412} y1={158} x2={412} y2={252} stroke={ACCENT} strokeWidth={1.8} />
              <text x={466} y={209} fontSize={9} fill={ACCENT}>
                x
              </text>
              <text x={417} y={154} fontSize={9} fill={ACCENT}>
                y
              </text>
              <text x={412} y={270} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                osie główne
              </text>
              <text x={412} y={284} textAnchor="middle" fontSize={8.5} fill={GREEN}>
                I_xy = 0
              </text>
            </motion.g>
          )}

          <text x={12} y={316} fontSize={8} fill={MUTED}>
            {index + 1}. {scene.title}
          </text>
        </svg>
      </div>
      <p className={local('note')}>{NOTES[metric] ?? NOTES.model}</p>
    </div>
  )
}
