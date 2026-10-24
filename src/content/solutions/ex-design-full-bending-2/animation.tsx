import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const BLUE = '#4f6df5'
const LOAD = '#ff6b45'
const COMP = '#d84f28'
const TENS = '#2f7d5b'
const OK = '#2e9e6b'
const MUTED = '#87929d'
const EDGE = '#68727e'
const INK = '#17202a'
const LIGHT = '#dfe6f2'

const L = 4
const A = 1.4
const B = L - A
const P = 20
const R_A = 13
const R_B = 7
const M_MAX = 18.2
const W_MIN = 113750
const W_MAX = 170000
const B_MIN = 55.5
const B_ACT = 60
const H_ACT = 120
const W_ACT = 144000
const SIGMA = 126.4
const K = 160
const F_ACT = 12.8
const F_ALLOW = 16

const X0 = 58
const X1 = 432
const BEAM_Y = 70
const SPAN = X1 - X0
const xAt = (metres: number) => X0 + (metres / L) * SPAN

const M_BASE = 264
const M_HEIGHT = 56
const yM = (value: number) => M_BASE - (value / M_MAX) * M_HEIGHT

const RECT_SCALE = 0.65
const SEC_CX = 138
const SEC_CY = 196

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}
const pl = (value: number, digits = 2) => value.toFixed(digits).replace('.', ',')

const shape = (x: number) => {
  if (x <= A) return (B * x * (L * L - B * B - x * x)) / (6 * L)
  const r = L - x
  return (A * r * (L * L - A * A - r * r)) / (6 * L)
}
const shapeMax = shape(A)
const defY = (x: number, sag: number, base: number) => base + (shape(x) / shapeMax) * sag

function Support({ x, y, label }: { x: number; y: number; label: string }) {
  return (
    <g>
      <path d={`M ${x - 10} ${y + 16} L ${x} ${y + 2} L ${x + 10} ${y + 16} Z`} fill={EDGE} />
      <text x={x} y={y + 30} textAnchor="middle" fontSize={9} fill={EDGE}>
        {label}
      </text>
    </g>
  )
}

function LoadArrow({ x, top, tip, label }: { x: number; top: number; tip: number; label: string }) {
  return (
    <g>
      <line x1={x} y1={top} x2={x} y2={tip - 7} stroke={LOAD} strokeWidth={2.4} strokeLinecap="round" />
      <path
        d={`M ${x - 5} ${tip - 15} L ${x} ${tip - 6} L ${x + 5} ${tip - 15}`}
        fill="none"
        stroke={LOAD}
        strokeWidth={2.4}
      />
      <text x={x} y={top - 7} textAnchor="middle" fontSize={9} fill={LOAD}>
        {label}
      </text>
    </g>
  )
}

function ReactionArrow({ x, y, label }: { x: number; y: number; label: string }) {
  return (
    <g>
      <line x1={x} y1={y + 44} x2={x} y2={y + 8} stroke={OK} strokeWidth={2.2} strokeLinecap="round" />
      <path d={`M ${x - 4} ${y + 16} L ${x} ${y + 7} L ${x + 4} ${y + 16}`} fill="none" stroke={OK} strokeWidth={2.2} />
      <text x={x} y={y + 56} textAnchor="middle" fontSize={8.5} fill={OK}>
        {label}
      </text>
    </g>
  )
}

function Dimension({ x1, x2, y, label }: { x1: number; x2: number; y: number; label: string }) {
  return (
    <g stroke={MUTED} fill={MUTED}>
      <line x1={x1} y1={y} x2={x2} y2={y} strokeWidth={1} />
      <line x1={x1} y1={y - 4} x2={x1} y2={y + 4} strokeWidth={1} />
      <line x1={x2} y1={y - 4} x2={x2} y2={y + 4} strokeWidth={1} />
      <text x={(x1 + x2) / 2} y={y - 5} textAnchor="middle" fontSize={8.5} stroke="none">
        {label}
      </text>
    </g>
  )
}

function VerticalDimension({
  x,
  from,
  to,
  label,
  color = MUTED,
}: {
  x: number
  from: number
  to: number
  label: string
  color?: string
}) {
  const middle = (from + to) / 2
  return (
    <g stroke={color} fill={color}>
      <line x1={x} y1={from} x2={x} y2={to} strokeWidth={1} />
      <line x1={x - 4} y1={from} x2={x + 4} y2={from} strokeWidth={1} />
      <line x1={x - 4} y1={to} x2={x + 4} y2={to} strokeWidth={1} />
      <text
        x={x - 6}
        y={middle}
        textAnchor="middle"
        fontSize={8.5}
        stroke="none"
        transform={`rotate(-90 ${x - 6} ${middle})`}
      >
        {label}
      </text>
    </g>
  )
}

function BeamRig({ y, reactions = false, dims = true }: { y: number; reactions?: boolean; dims?: boolean }) {
  const dimY = reactions ? y + 78 : y + 56
  return (
    <g>
      <line x1={X0} y1={y} x2={X1} y2={y} stroke={EDGE} strokeWidth={5} strokeLinecap="round" />
      <Support x={X0} y={y} label="A" />
      <Support x={X1} y={y} label="B" />
      <LoadArrow x={xAt(A)} top={y - 48} tip={y - 4} label={`P = ${P} kN`} />
      {reactions && (
        <>
          <ReactionArrow x={X0 + 20} y={y} label={`R_A = ${R_A} kN`} />
          <ReactionArrow x={X1 - 20} y={y} label={`R_B = ${R_B} kN`} />
        </>
      )}
      {dims && (
        <>
          <Dimension x1={X0} x2={xAt(A)} y={dimY} label="a = 1,4 m" />
          <Dimension x1={xAt(A)} x2={X1} y={dimY} label="b = 2,6 m" />
          <Dimension x1={X0} x2={X1} y={dimY + 24} label="L = 4 m" />
        </>
      )}
    </g>
  )
}

function WBar({ x, y, width, draw, actual }: { x: number; y: number; width: number; draw: number; actual: boolean }) {
  const target = actual ? W_ACT : W_MIN
  const marker = (W_MIN / W_MAX) * width
  return (
    <g>
      <text x={x} y={y - 26} fontSize={9} fontWeight={700} fill={INK}>
        {actual ? 'wskaźnik wytrzymałości po doborze' : 'wymagany wskaźnik wytrzymałości'}
      </text>
      <rect x={x} y={y - 10} width={width} height={16} rx={8} fill="#edf1f5" />
      <motion.rect
        x={x}
        y={y - 10}
        height={16}
        rx={8}
        fill={actual ? OK : LOAD}
        fillOpacity={0.28}
        stroke={actual ? OK : LOAD}
        strokeWidth={1.2}
        initial={{ width: 0 }}
        animate={{ width: (target / W_MAX) * width * draw }}
        transition={{ duration: 0.12, ease: 'linear' }}
      />
      <line
        x1={x + marker}
        y1={y - 16}
        x2={x + marker}
        y2={y + 12}
        stroke={LOAD}
        strokeWidth={1.4}
        strokeDasharray="4 3"
      />
      <text x={x + marker} y={y - 20} textAnchor="middle" fontSize={8} fill={LOAD}>
        W_min
      </text>
      <text x={x} y={y + 24} fontSize={8.5} fill={MUTED}>
        W_min = 113 750 mm³
      </text>
      <text x={x + width} y={y + 24} textAnchor="end" fontSize={8.5} fill={actual ? OK : LOAD}>
        {actual ? 'W = 144 000 mm³' : 'W ≥ W_min'}
      </text>
      {actual && (
        <text x={x} y={y + 42} fontSize={8.5} fill={OK}>
          ✓ W ≥ W_min — warunek wytrzymałości spełniony
        </text>
      )}
    </g>
  )
}

function CheckBar({
  x,
  y,
  width,
  ratio,
  draw,
  title,
  left,
  right,
  note,
}: {
  x: number
  y: number
  width: number
  ratio: number
  draw: number
  title: string
  left: string
  right: string
  note: string
}) {
  return (
    <g>
      <text x={x} y={y - 30} fontSize={9} fontWeight={700} fill={INK}>
        {title}
      </text>
      <rect x={x} y={y - 12} width={width} height={16} rx={8} fill="#edf1f5" />
      <motion.rect
        x={x}
        y={y - 12}
        height={16}
        rx={8}
        fill={OK}
        fillOpacity={0.3}
        stroke={OK}
        strokeWidth={1.2}
        initial={{ width: 0 }}
        animate={{ width: width * ratio * draw }}
        transition={{ duration: 0.12, ease: 'linear' }}
      />
      <line x1={x + width} y1={y - 18} x2={x + width} y2={y + 10} stroke={OK} strokeWidth={1.2} strokeDasharray="4 3" />
      <text x={x} y={y + 22} fontSize={8.5} fill={MUTED}>
        {left}
      </text>
      <text x={x + width} y={y + 22} textAnchor="end" fontSize={8.5} fill={OK}>
        {right}
      </text>
      <text x={x} y={y + 40} fontSize={8.5} fill={OK}>
        {note}
      </text>
    </g>
  )
}

function RectSection({
  cx,
  cy,
  b,
  h,
  draw,
  stress = false,
  stressDraw = 1,
  undecided = false,
  showHeight = true,
  showWidth = true,
}: {
  cx: number
  cy: number
  b: number
  h: number
  draw: number
  stress?: boolean
  stressDraw?: number
  undecided?: boolean
  showHeight?: boolean
  showWidth?: boolean
}) {
  const halfWidth = (b * RECT_SCALE) / 2
  const halfHeight = (h * RECT_SCALE) / 2
  const width = Math.max(2, 2 * halfWidth * draw)
  const height = Math.max(2, 2 * halfHeight * draw)
  const left = cx - width / 2
  const top = cy - height / 2
  const levels = Array.from({ length: 11 }, (_, index) => cy - halfHeight + (2 * halfHeight * index) / 10)
  return (
    <g>
      <rect
        x={left}
        y={top}
        width={width}
        height={height}
        rx={2}
        fill={LIGHT}
        fillOpacity={0.7}
        stroke={undecided ? MUTED : EDGE}
        strokeWidth={1.6}
        strokeDasharray={undecided ? '6 4' : undefined}
      />
      {stress && (
        <g>
          <line
            x1={cx - halfWidth - 8}
            y1={cy}
            x2={cx + halfWidth + 8}
            y2={cy}
            stroke={MUTED}
            strokeWidth={1}
            strokeDasharray="5 4"
          />
          <text x={cx + halfWidth + 12} y={cy + 3} fontSize={8} fill={MUTED}>
            oś obojętna
          </text>
          {levels.map((level, index) => {
            const ratio = (cy - level) / halfHeight
            if (Math.abs(ratio) < 0.12) return null
            const above = ratio > 0
            const edge = above ? cx - halfWidth : cx + halfWidth
            const length = Math.abs(ratio) * halfWidth * 1.35 * stressDraw
            const end = edge + (above ? -length : length)
            return (
              <line
                key={`stress-${index}`}
                x1={edge}
                y1={level}
                x2={end}
                y2={level}
                stroke={above ? COMP : TENS}
                strokeWidth={1.5}
                markerEnd={length > 7 ? (above ? 'url(#fb2-comp)' : 'url(#fb2-tens)') : undefined}
              />
            )
          })}
          <text x={cx - halfWidth - 10} y={cy - halfHeight - 8} fontSize={8.5} fill={COMP}>
            ściskanie
          </text>
          <text x={cx + halfWidth + 10} y={cy + halfHeight + 12} textAnchor="end" fontSize={8.5} fill={TENS}>
            rozciąganie
          </text>
          <text x={cx - halfWidth - 10} y={cy - halfHeight + 4} textAnchor="end" fontSize={8} fill={COMP}>
            126,4 MPa
          </text>
          <text x={cx + halfWidth + 10} y={cy + halfHeight - 2} fontSize={8} fill={TENS}>
            126,4 MPa
          </text>
        </g>
      )}
      {showWidth && (
        <Dimension
          x1={cx - halfWidth}
          x2={cx + halfWidth}
          y={cy + halfHeight + 18}
          label={undecided ? 'b = ?' : `b = ${pl(b, Number.isInteger(b) ? 0 : 1)} mm`}
        />
      )}
      {showHeight && (
        <VerticalDimension
          x={cx - halfWidth - 14}
          from={cy - halfHeight}
          to={cy + halfHeight}
          label={undecided ? 'h = 2b' : `h = ${pl(h, 0)} mm`}
        />
      )}
    </g>
  )
}

export function FullBendingDesign2Animation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const p = playing ? clamp01(sceneProgress) : 1
  const draw = smooth(p)
  const pathDraw = smooth(p / 0.82)

  const isModel = metric === 'model'
  const isMoment = metric === 'moment'
  const isStrength = metric === 'strength'
  const isSection = metric === 'section'
  const isStress = metric === 'stress'
  const isDeflection = metric === 'deflection'

  const deflectedPath = Array.from({ length: 81 }, (_, index) => {
    const metres = (index / 80) * L
    return `${index === 0 ? 'M' : 'L'} ${xAt(metres)} ${defY(metres, 36 * draw, 96)}`
  }).join(' ')
  const momentPath = `M ${xAt(0)} ${M_BASE} L ${xAt(A)} ${yM(M_MAX)} L ${xAt(L)} ${M_BASE}`
  const limitSag = 36 * (F_ALLOW / F_ACT)
  const bShown = isStrength ? B_MIN : B_ACT
  const hShown = 2 * bShown

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 300"
          role="img"
          aria-label="Pełne zadanie doboru belki o przekroju prostokątnym: schemat, moment, wymagany wskaźnik, przekrój 60 na 120 milimetrów, kontrola naprężeń i ugięcia."
        >
          <defs>
            <marker
              id="fb2-comp"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={COMP} />
            </marker>
            <marker
              id="fb2-tens"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={TENS} />
            </marker>
          </defs>

          {isModel && (
            <g>
              <BeamRig y={BEAM_Y} />
              <text x={14} y={196} fontSize={9} fill={MUTED}>
                k = 160 MPa
              </text>
              <text x={14} y={212} fontSize={9} fill={MUTED}>
                E = 200 GPa
              </text>
              <text x={14} y={228} fontSize={9} fill={MUTED}>
                f_dop = L/250 = 16 mm
              </text>
              <RectSection cx={372} cy={196} b={B_ACT} h={H_ACT} draw={1} undecided />
              <text x={372} y={272} textAnchor="middle" fontSize={9} fill={MUTED}>
                przekrój prostokątny, h = 2b
              </text>
            </g>
          )}

          {isMoment && (
            <g>
              <BeamRig y={BEAM_Y} reactions />
              <line x1={X0} y1={M_BASE} x2={X1 + 10} y2={M_BASE} stroke="#c9d0d9" strokeWidth={1} />
              <text x={16} y={M_BASE - M_HEIGHT + 18} fontSize={10} fontWeight={700} fill={LOAD}>
                M
              </text>
              <motion.path
                d={momentPath}
                fill="none"
                stroke={LOAD}
                strokeWidth={2.8}
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: pathDraw }}
                transition={{ duration: 0.1, ease: 'linear' }}
              />
              <line
                x1={xAt(A)}
                y1={BEAM_Y + 4}
                x2={xAt(A)}
                y2={yM(M_MAX)}
                stroke={LOAD}
                strokeWidth={1}
                strokeDasharray="4 4"
                opacity={0.55}
              />
              <motion.circle
                cx={xAt(A)}
                cy={yM(M_MAX)}
                r={4}
                fill={LOAD}
                initial={{ opacity: 0 }}
                animate={{ opacity: pathDraw > 0.95 ? 1 : 0 }}
                transition={{ duration: 0.2 }}
              />
              <text x={xAt(A) + 8} y={yM(M_MAX) - 6} fontSize={9.5} fontWeight={700} fill={LOAD}>
                M_max = 18,2 kN·m
              </text>
              <text x={X0 - 8} y={M_BASE + 4} textAnchor="end" fontSize={8.5} fill={MUTED}>
                0
              </text>
              <text x={X1} y={M_BASE + 14} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                x
              </text>
            </g>
          )}

          {isStrength && (
            <g>
              <RectSection cx={SEC_CX} cy={SEC_CY} b={bShown} h={hShown} draw={smooth(0.35 + 0.65 * draw)} />
              <text x={SEC_CX} y={SEC_CY + 86} textAnchor="middle" fontSize={9} fill={MUTED}>
                b_min = 55,5 mm
              </text>
              <text x={SEC_CX} y={SEC_CY - 78} textAnchor="middle" fontSize={9} fill={INK}>
                szerokość z warunku wytrzymałości
              </text>
              <WBar x={236} y={190} width={180} draw={draw} actual={false} />
              <text x={236} y={252} fontSize={8.5} fill={MUTED}>
                b_min = ∛(3W_min/2) ≈ 55,5 mm
              </text>
            </g>
          )}

          {isSection && (
            <g>
              <RectSection cx={SEC_CX} cy={SEC_CY} b={B_ACT} h={H_ACT} draw={draw} />
              <text x={SEC_CX} y={SEC_CY + 86} textAnchor="middle" fontSize={9} fill={MUTED}>
                I = 8,64·10⁶ mm⁴
              </text>
              <text x={SEC_CX} y={SEC_CY - 78} textAnchor="middle" fontSize={9} fill={INK}>
                przyjęty przekrój
              </text>
              <WBar x={236} y={190} width={180} draw={draw} actual />
            </g>
          )}

          {isStress && (
            <g>
              <RectSection
                cx={SEC_CX}
                cy={SEC_CY}
                b={B_ACT}
                h={H_ACT}
                draw={1}
                stress
                stressDraw={draw}
                showHeight={false}
              />
              <text x={SEC_CX} y={SEC_CY + 86} textAnchor="middle" fontSize={9} fill={MUTED}>
                60 × 120 mm
              </text>
              <CheckBar
                x={236}
                y={190}
                width={180}
                ratio={SIGMA / K}
                draw={draw}
                title="kontrola naprężeń"
                left="σ_max = 126,4 MPa"
                right="k = 160 MPa"
                note="✓ σ_max ≤ k — zapas około 21%"
              />
            </g>
          )}

          {isDeflection && (
            <g>
              <line x1={X0} y1={96} x2={X1} y2={96} stroke="#c9d0d9" strokeWidth={1} strokeDasharray="6 5" />
              <Support x={X0} y={96} label="A" />
              <Support x={X1} y={96} label="B" />
              <LoadArrow x={xAt(A)} top={48} tip={92} label={`P = ${P} kN`} />
              <path d={deflectedPath} fill="none" stroke={BLUE} strokeWidth={3} strokeLinecap="round" />
              <line
                x1={X0}
                y1={96 + limitSag}
                x2={X1}
                y2={96 + limitSag}
                stroke={OK}
                strokeWidth={1.2}
                strokeDasharray="6 4"
              />
              <line x1={xAt(A)} y1={96} x2={xAt(A)} y2={defY(A, 36 * draw, 96)} stroke={BLUE} strokeWidth={1} />
              <text x={xAt(A) + 8} y={96 + 22} fontSize={9} fill={BLUE}>
                f = 12,8 mm
              </text>
              <text x={X1} y={96 + limitSag - 6} textAnchor="end" fontSize={8.5} fill={OK}>
                f_dop = 16 mm
              </text>
              <text x={230} y={176} textAnchor="middle" fontSize={9} fill={INK}>
                prostokąt 60 × 120 mm jest sztywniejszy od koła ∅110 mm
              </text>
              <text x={230} y={192} textAnchor="middle" fontSize={8.5} fill={OK}>
                ✓ f ≤ f_dop — zapas 3,2 mm
              </text>
            </g>
          )}

          <text x={446} y={20} textAnchor="end" fontSize={8.5} fill={MUTED}>
            {isModel
              ? 'model i dane'
              : isMoment
                ? 'reakcje i moment'
                : isStrength
                  ? 'warunek wytrzymałości'
                  : isSection
                    ? 'dobór przekroju'
                    : isStress
                      ? 'kontrola naprężeń'
                      : 'kontrola ugięcia'}
          </text>
        </svg>
      </div>
    </div>
  )
}
