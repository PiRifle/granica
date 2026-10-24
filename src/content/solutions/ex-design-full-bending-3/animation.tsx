import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const BLUE = '#4f6df5'
const LOAD = '#ff6b45'
const COMP = '#d84f28'
const TENS = '#2f7d5b'
const OK = '#2e9e6b'
const STIFF = '#a970dd'
const MUTED = '#87929d'
const EDGE = '#68727e'
const INK = '#17202a'
const LIGHT = '#dfe6f2'

const L = 4
const A = 2
const B = L - A
const D = 100
const K = 150
const W = 98175
const I = 4908738
const M_DOP = 14.73
const P_STRENGTH = 14.73
const P_STIFFNESS = 9.82
const P_MAX = 9.82
const SIGMA = 100
const F_DOP = 13.33
const P_SCALE_MAX = 16

const X0 = 58
const X1 = 432
const BEAM_Y = 70
const SPAN = X1 - X0
const xAt = (metres: number) => X0 + (metres / L) * SPAN

const D_SCALE = 0.42
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

function BeamRig({ y, dims = true, loadLabel = 'P = ?' }: { y: number; dims?: boolean; loadLabel?: string }) {
  return (
    <g>
      <line x1={X0} y1={y} x2={X1} y2={y} stroke={EDGE} strokeWidth={5} strokeLinecap="round" />
      <Support x={X0} y={y} label="A" />
      <Support x={X1} y={y} label="B" />
      <LoadArrow x={xAt(2)} top={y - 48} tip={y - 4} label={loadLabel} />
      {dims && (
        <>
          <Dimension x1={X0} x2={xAt(2)} y={y + 56} label="a = 2,0 m" />
          <Dimension x1={xAt(2)} x2={X1} y={y + 56} label="b = 2,0 m" />
          <Dimension x1={X0} x2={X1} y={y + 80} label="L = 4 m" />
        </>
      )}
    </g>
  )
}

function CircleSection({
  cx,
  cy,
  draw,
  stress = false,
  stressDraw = 1,
  stressLabel = '139,3 MPa',
  dimension = true,
  showDiameter = true,
}: {
  cx: number
  cy: number
  draw: number
  stress?: boolean
  stressDraw?: number
  stressLabel?: string
  dimension?: boolean
  showDiameter?: boolean
}) {
  const radius = D * D_SCALE
  const shownRadius = Math.max(1, radius * draw)
  const levels = Array.from({ length: 11 }, (_, index) => cy - radius + (2 * radius * index) / 10)
  return (
    <g>
      <motion.circle
        cx={cx}
        cy={cy}
        r={shownRadius}
        fill={LIGHT}
        fillOpacity={0.7}
        stroke={EDGE}
        strokeWidth={1.6}
        initial={false}
      />
      {stress && (
        <g>
          <line
            x1={cx - radius - 8}
            y1={cy}
            x2={cx + radius + 8}
            y2={cy}
            stroke={MUTED}
            strokeWidth={1}
            strokeDasharray="5 4"
          />
          <text x={cx + radius + 12} y={cy + 3} fontSize={8} fill={MUTED}>
            oś obojętna
          </text>
          {levels.map((level, index) => {
            const ratio = (cy - level) / radius
            if (Math.abs(ratio) < 0.12) return null
            const above = ratio > 0
            const half = Math.sqrt(Math.max(0, radius * radius - (level - cy) * (level - cy)))
            const edge = above ? cx - half : cx + half
            const length = Math.abs(ratio) * radius * 1.45 * stressDraw
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
                markerEnd={length > 7 ? (above ? 'url(#fb3-comp)' : 'url(#fb3-tens)') : undefined}
              />
            )
          })}
          <text x={cx - radius - 10} y={cy - radius - 8} fontSize={8.5} fill={COMP}>
            ściskanie
          </text>
          <text x={cx + radius + 10} y={cy + radius + 12} textAnchor="end" fontSize={8.5} fill={TENS}>
            rozciąganie
          </text>
          <text x={cx - radius - 10} y={cy - radius + 4} textAnchor="end" fontSize={8} fill={COMP}>
            {stressLabel}
          </text>
          <text x={cx + radius + 10} y={cy + radius - 2} fontSize={8} fill={TENS}>
            {stressLabel}
          </text>
        </g>
      )}
      {dimension && (
        <VerticalDimension x={cx - radius - 14} from={cy - shownRadius} to={cy + shownRadius} label="d = 100 mm" />
      )}
      {!dimension && showDiameter && (
        <text x={cx} y={cy + shownRadius + 18} textAnchor="middle" fontSize={9} fill={MUTED}>
          d = 100 mm
        </text>
      )}
    </g>
  )
}

function LoadLimit({
  x,
  y,
  width,
  draw,
  mode,
}: {
  x: number
  y: number
  width: number
  draw: number
  mode: 'strength' | 'stiffness' | 'both'
}) {
  const strengthX = x + (P_STRENGTH / P_SCALE_MAX) * width
  const stiffnessX = x + (P_STIFFNESS / P_SCALE_MAX) * width
  const chosen = mode === 'strength' ? P_STRENGTH : mode === 'stiffness' ? P_STIFFNESS : P_MAX
  const showStrength = mode === 'strength' || mode === 'both'
  const showStiffness = mode === 'stiffness' || mode === 'both'
  return (
    <g>
      <text x={x} y={y - 34} fontSize={9} fontWeight={700} fill={INK}>
        {mode === 'both' ? 'porównanie dopuszczalnego obciążenia' : 'granica dopuszczalnego obciążenia'}
      </text>
      <rect x={x} y={y - 10} width={width} height={16} rx={8} fill="#edf1f5" />
      <motion.rect
        x={x}
        y={y - 10}
        height={16}
        rx={8}
        fill={mode === 'strength' ? OK : STIFF}
        fillOpacity={0.28}
        stroke={mode === 'strength' ? OK : STIFF}
        strokeWidth={1.2}
        initial={{ width: 0 }}
        animate={{ width: (chosen / P_SCALE_MAX) * width * draw }}
        transition={{ duration: 0.12, ease: 'linear' }}
      />
      {showStrength && (
        <>
          <line
            x1={strengthX}
            y1={y - 18}
            x2={strengthX}
            y2={y + 12}
            stroke={OK}
            strokeWidth={1.4}
            strokeDasharray="4 3"
          />
          <text x={strengthX} y={y - 20} textAnchor="middle" fontSize={8} fill={OK}>
            14,73
          </text>
          <text x={strengthX} y={y + 24} textAnchor="middle" fontSize={8} fill={OK}>
            wytrzymałość
          </text>
        </>
      )}
      {showStiffness && (
        <>
          <line
            x1={stiffnessX}
            y1={y - 18}
            x2={stiffnessX}
            y2={y + 12}
            stroke={STIFF}
            strokeWidth={1.4}
            strokeDasharray="4 3"
          />
          <text x={stiffnessX} y={y - 20} textAnchor="middle" fontSize={8} fill={STIFF}>
            9,82
          </text>
          <text x={stiffnessX} y={y + 24} textAnchor="middle" fontSize={8} fill={STIFF}>
            sztywność
          </text>
        </>
      )}
      {[0, 4, 8, 12, 16].map((tick) => (
        <text
          key={tick}
          x={x + (tick / P_SCALE_MAX) * width}
          y={y + 42}
          textAnchor="middle"
          fontSize={7.5}
          fill={MUTED}
        >
          {tick}
        </text>
      ))}
      <text x={x + width} y={y + 56} textAnchor="end" fontSize={8} fill={MUTED}>
        P [kN]
      </text>
      <text x={x} y={y + 56} fontSize={8.5} fill={mode === 'strength' ? OK : STIFF}>
        {mode === 'strength'
          ? 'P ≤ 14,73 kN — dopuszcza wytrzymałość'
          : mode === 'stiffness'
            ? 'P ≤ 9,82 kN — dopuszcza sztywność'
            : 'P_max = 9,82 kN — decyduje mniejsza wartość'}
      </text>
    </g>
  )
}

export function FullBendingDesign3Animation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const p = playing ? clamp01(sceneProgress) : 1
  const draw = smooth(p)

  const isModel = metric === 'model'
  const isSection = metric === 'section'
  const isStrength = metric === 'strength'
  const isStiffness = metric === 'stiffness'
  const isGoverning = metric === 'governing'
  const isCheck = metric === 'check'

  const deflectedPath = (sag: number, base: number) =>
    Array.from({ length: 81 }, (_, index) => {
      const metres = (index / 80) * L
      return `${index === 0 ? 'M' : 'L'} ${xAt(metres)} ${defY(metres, sag * draw, base)}`
    }).join(' ')

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 300"
          role="img"
          aria-label="Wariant odwrotny: znany przekrój kołowy i dobór dopuszczalnego obciążenia belki. Animacja pokazuje właściwości przekroju, granicę wytrzymałości, granicę sztywności oraz decydującą kontrolę."
        >
          <defs>
            <marker
              id="fb3-comp"
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
              id="fb3-tens"
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
                k = 150 MPa
              </text>
              <text x={14} y={212} fontSize={9} fill={MUTED}>
                E = 200 GPa
              </text>
              <text x={14} y={228} fontSize={9} fill={MUTED}>
                f_dop = L/300 = 13,33 mm
              </text>
              <CircleSection cx={372} cy={200} draw={1} dimension={false} />
              <text x={372} y={278} textAnchor="middle" fontSize={9} fill={MUTED}>
                przekrój kołowy
              </text>
            </g>
          )}

          {isSection && (
            <g>
              <CircleSection cx={SEC_CX} cy={SEC_CY} draw={draw} />
              <text x={SEC_CX} y={SEC_CY + 78} textAnchor="middle" fontSize={9} fill={MUTED}>
                pełne koło
              </text>
              <text x={236} y={158} fontSize={9} fontWeight={700} fill={INK}>
                dwie wielkości, dwa warunki
              </text>
              <text x={236} y={184} fontSize={8.5} fill={BLUE}>
                W = πd³/32 ≈ 98 175 mm³
              </text>
              <text x={236} y={200} fontSize={8.5} fill={MUTED}>
                W decyduje o naprężeniach
              </text>
              <text x={236} y={228} fontSize={8.5} fill={STIFF}>
                I = πd⁴/64 ≈ 4,91·10⁶ mm⁴
              </text>
              <text x={236} y={244} fontSize={8.5} fill={MUTED}>
                I decyduje o ugięciu
              </text>
            </g>
          )}

          {isStrength && (
            <g>
              <CircleSection
                cx={SEC_CX}
                cy={SEC_CY}
                draw={1}
                stress
                stressDraw={draw}
                stressLabel="150 MPa"
                dimension={false}
              />
              <text x={SEC_CX} y={SEC_CY + 78} textAnchor="middle" fontSize={9} fill={MUTED}>
                σ = k = 150 MPa
              </text>
              <LoadLimit x={236} y={190} width={180} draw={draw} mode="strength" />
              <text x={236} y={112} fontSize={8.5} fill={MUTED}>
                M_dop = k W = 14,73 kN·m
              </text>
            </g>
          )}

          {isStiffness && (
            <g>
              <line x1={X0} y1={78} x2={X1} y2={78} stroke="#c9d0d9" strokeWidth={1} strokeDasharray="6 5" />
              <Support x={X0} y={78} label="A" />
              <Support x={X1} y={78} label="B" />
              <LoadArrow x={xAt(2)} top={30} tip={74} label="P = 9,82 kN" />
              <path d={deflectedPath(30, 78)} fill="none" stroke={BLUE} strokeWidth={3} strokeLinecap="round" />
              <line x1={X0} y1={108} x2={X1} y2={108} stroke={STIFF} strokeWidth={1.2} strokeDasharray="6 4" />
              <text x={X1} y={104} textAnchor="end" fontSize={8.5} fill={STIFF}>
                f_dop = 13,33 mm
              </text>
              <line x1={xAt(2)} y1={78} x2={xAt(2)} y2={defY(2, 30 * draw, 78)} stroke={BLUE} strokeWidth={1} />
              <text x={xAt(2) + 8} y={100} fontSize={9} fill={BLUE}>
                f = 13,33 mm
              </text>
              <LoadLimit x={120} y={216} width={260} draw={draw} mode="stiffness" />
            </g>
          )}

          {isGoverning && (
            <g>
              <line x1={X0} y1={78} x2={X1} y2={78} stroke="#c9d0d9" strokeWidth={1} strokeDasharray="6 5" />
              <Support x={X0} y={78} label="A" />
              <Support x={X1} y={78} label="B" />
              <LoadArrow x={xAt(2)} top={30} tip={74} label="P_max = 9,82 kN" />
              <path d={deflectedPath(24, 78)} fill="none" stroke={BLUE} strokeWidth={3} strokeLinecap="round" />
              <text x={230} y={138} textAnchor="middle" fontSize={9} fill={INK}>
                mniejsza granica wyznacza P_max
              </text>
              <LoadLimit x={100} y={210} width={290} draw={draw} mode="both" />
            </g>
          )}

          {isCheck && (
            <g>
              <line x1={X0} y1={70} x2={X1} y2={70} stroke="#c9d0d9" strokeWidth={1} strokeDasharray="6 5" />
              <Support x={X0} y={70} label="A" />
              <Support x={X1} y={70} label="B" />
              <LoadArrow x={xAt(2)} top={22} tip={66} label="P_max = 9,82 kN" />
              <path d={deflectedPath(30, 70)} fill="none" stroke={BLUE} strokeWidth={3} strokeLinecap="round" />
              <line x1={X0} y1={100} x2={X1} y2={100} stroke={STIFF} strokeWidth={1.2} strokeDasharray="6 4" />
              <text x={X1} y={96} textAnchor="end" fontSize={8.5} fill={STIFF}>
                f = 13,33 mm = f_dop
              </text>
              <CircleSection
                cx={114}
                cy={204}
                draw={1}
                stress
                stressDraw={draw}
                stressLabel="100 MPa"
                dimension={false}
                showDiameter={false}
              />
              <text x={230} y={180} fontSize={9} fill={COMP}>
                σ = 100 MPa &lt; 150 MPa
              </text>
              <text x={230} y={198} fontSize={9} fill={OK}>
                ✓ wytrzymałość spełniona
              </text>
              <text x={230} y={222} fontSize={9} fill={STIFF}>
                f = 13,33 mm = f_dop
              </text>
              <text x={230} y={240} fontSize={9} fill={STIFF}>
                decyduje sztywność
              </text>
              <text x={268} y={286} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                M_max = P L/4 = 9,82 kN·m
              </text>
            </g>
          )}

          <text x={446} y={20} textAnchor="end" fontSize={8.5} fill={MUTED}>
            {isModel
              ? 'model i dane'
              : isSection
                ? 'właściwości przekroju'
                : isStrength
                  ? 'granica wytrzymałości'
                  : isStiffness
                    ? 'granica sztywności'
                    : isGoverning
                      ? 'decyduje sztywność'
                      : 'kontrola końcowa'}
          </text>
        </svg>
      </div>
    </div>
  )
}
