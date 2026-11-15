import type { ComponentType } from 'react'
import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import type { AluminumBeamMomentInputs } from './factory'
import { local } from '../../../components/solution-figures/shared'

const BLUE = '#4f6df5'
const LOAD = '#ff6b45'
const GREEN = '#2f7d5b'
const RED = '#d84f28'
const VIOLET = '#a970dd'
const MUTED = '#87929d'
const EDGE = '#7d8fa5'
const INK = '#17202a'
const FILL = '#eef3fa'
const SOFT = '#dfe6f2'

const S = 1.8
const OW = 80 * S
const OH = 100 * S
const IW = 68 * S
const IH = 88 * S
const CY = 170
const XR = 250

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}
const ramp = (value: number, from: number, to: number) => clamp01((value - from) / (to - from))

function Header({ title, note }: { title: string; note: string }) {
  return (
    <g>
      <text x={14} y={18} fontSize={9.5} fontWeight={700} fill={INK}>
        {title}
      </text>
      <text x={446} y={18} textAnchor="end" fontSize={8.5} fill={MUTED}>
        rura 80 × 100 · t = 6 mm
      </text>
      <text x={14} y={31} fontSize={8.5} fill={MUTED}>
        {note}
      </text>
    </g>
  )
}

function Section({
  cx = 150,
  cy = CY,
  inner = 1,
  showInner = true,
  showDims = false,
  innerLabel = false,
  motionHole = false,
  opacity = 1,
}: {
  cx?: number
  cy?: number
  inner?: number
  showInner?: boolean
  showDims?: boolean
  innerLabel?: boolean
  motionHole?: boolean
  opacity?: number
}) {
  const left = cx - OW / 2
  const top = cy - OH / 2
  const ih = IH * clamp01(inner)
  const iw = IW * clamp01(inner)
  const ix = cx - iw / 2
  const iy = cy - ih / 2
  return (
    <g opacity={opacity}>
      <rect x={left} y={top} width={OW} height={OH} fill={FILL} stroke={EDGE} strokeWidth={1.6} />
      {showInner &&
        (motionHole ? (
          <motion.rect
            initial={false}
            animate={{ x: ix, y: iy, width: iw, height: ih }}
            transition={{ duration: 0.15, ease: 'linear' }}
            fill="#ffffff"
            stroke={LOAD}
            strokeWidth={1.4}
            strokeDasharray="5 4"
          />
        ) : (
          <rect
            x={cx - IW / 2}
            y={cy - IH / 2}
            width={IW}
            height={IH}
            fill="#ffffff"
            stroke={LOAD}
            strokeWidth={1.4}
            strokeDasharray="5 4"
          />
        ))}
      {innerLabel && showInner && (
        <text x={cx} y={cy + 3} textAnchor="middle" fontSize={8.5} fill={MUTED}>
          wewn. 68 × 88
        </text>
      )}
      {showDims && (
        <g stroke={MUTED} fill={MUTED}>
          <line x1={left} y1={cy + OH / 2 + 20} x2={left + OW} y2={cy + OH / 2 + 20} strokeWidth={1} />
          <line x1={left} y1={cy + OH / 2 + 15} x2={left} y2={cy + OH / 2 + 25} strokeWidth={1} />
          <line x1={left + OW} y1={cy + OH / 2 + 15} x2={left + OW} y2={cy + OH / 2 + 25} strokeWidth={1} />
          <text x={cx} y={cy + OH / 2 + 34} textAnchor="middle" fontSize={8.5} stroke="none">
            80 mm
          </text>
          <line x1={left - 16} y1={top} x2={left - 16} y2={top + OH} strokeWidth={1} />
          <line x1={left - 21} y1={top} x2={left - 11} y2={top} strokeWidth={1} />
          <line x1={left - 21} y1={top + OH} x2={left - 11} y2={top + OH} strokeWidth={1} />
          <text x={left - 24} y={cy + 3} textAnchor="end" fontSize={8.5} stroke="none">
            100 mm
          </text>
        </g>
      )}
    </g>
  )
}

function NeutralAxis({ cx = 150, cy = CY, width = 210 }: { cx?: number; cy?: number; width?: number }) {
  return (
    <g>
      <line
        x1={cx - width / 2}
        y1={cy}
        x2={cx + width / 2}
        y2={cy}
        stroke={VIOLET}
        strokeWidth={1.2}
        strokeDasharray="6 4"
      />
      <text x={cx - width / 2 + 4} y={cy - 6} fontSize={8.5} fill={VIOLET}>
        oś obojętna x
      </text>
    </g>
  )
}

function ModelScene({ p }: { p: number }) {
  const draw = smooth(p)
  const momentDraw = ramp(p, 0.15, 0.55)
  return (
    <g>
      <Header
        title="PRĘT ALUMINIOWY · CZYSTE ZGINANIE"
        note="moment M działa w płaszczyźnie pionowej; oś zginania x jest pozioma"
      />
      <g opacity={0.35 + 0.65 * draw}>
        <polygon points="68,206 358,166 358,184 68,224" fill={SOFT} stroke={EDGE} strokeWidth={1.4} />
        <polygon points="68,206 86,214 86,232 68,224" fill="#d3dceb" stroke={EDGE} strokeWidth={1.2} />
        <polygon points="358,166 376,174 376,192 358,184" fill="#d3dceb" stroke={EDGE} strokeWidth={1.2} />
        <line x1="68" y1="215" x2="358" y2="175" stroke="#b7c3d3" strokeWidth={1} strokeDasharray="6 5" />
        <line x1="60" y1="190" x2="60" y2="238" stroke={EDGE} strokeWidth={2.4} />
        <line x1="84" y1="198" x2="84" y2="246" stroke={EDGE} strokeWidth={2.4} />
        <text x={72} y={252} textAnchor="middle" fontSize={8.5} fontWeight={700} fill={EDGE}>
          przekrój
        </text>
      </g>
      <motion.path
        d="M 332 146 Q 386 168 338 190"
        fill="none"
        stroke={VIOLET}
        strokeWidth={2.2}
        markerEnd="url(#w5abm-moment)"
        initial={false}
        animate={{ pathLength: momentDraw }}
        transition={{ duration: 0.15, ease: 'linear' }}
      />
      <text x={396} y={158} fontSize={10} fontWeight={700} fill={VIOLET}>
        M
      </text>
      <motion.path
        d="M 118 196 Q 64 174 112 152"
        fill="none"
        stroke={VIOLET}
        strokeWidth={2.2}
        markerEnd="url(#w5abm-moment)"
        initial={false}
        animate={{ pathLength: momentDraw }}
        transition={{ duration: 0.15, ease: 'linear' }}
      />
      <text x={58} y={146} textAnchor="end" fontSize={10} fontWeight={700} fill={VIOLET}>
        M
      </text>
      <text x={230} y={280} textAnchor="middle" fontSize={9} fill={MUTED}>
        Moment M wywołuje naprężenia normalne σ = M·y / I_x
      </text>
    </g>
  )
}

function GeometryScene({ p }: { p: number }) {
  const inner = 0.25 + 0.75 * smooth(ramp(p, 0, 0.45))
  const dims = smooth(ramp(p, 0.25, 0.65))
  return (
    <g>
      <Header title="PRZEKRÓJ PROSTOKĄTNY RUROWY" note="szerokość 80 mm, wysokość 100 mm, ścianka t = 6 mm" />
      <Section inner={inner} motionHole innerLabel showDims={dims > 0.5} />
      <g opacity={smooth(ramp(p, 0.35, 0.75))}>
        <text x={XR} y={98} fontSize={8.5} fontWeight={700} fill={INK}>
          wymiary zewnętrzne
        </text>
        <text x={XR} y={114} fontSize={8.5} fill={MUTED}>
          80 mm × 100 mm
        </text>
        <text x={XR} y={140} fontSize={8.5} fontWeight={700} fill={INK}>
          wymiary wewnętrzne
        </text>
        <text x={XR} y={156} fontSize={8.5} fill={MUTED}>
          68 mm × 88 mm
        </text>
        <text x={XR} y={182} fontSize={8.5} fill={LOAD}>
          t = 6 mm
        </text>
        <text x={XR} y={210} fontSize={8.5} fill={VIOLET}>
          zginanie względem osi x
        </text>
        <text x={XR} y={226} fontSize={8} fill={MUTED}>
          (oś pozioma, h = 100 mm)
        </text>
      </g>
      <text x={32} y={300} fontSize={8.5} fill={MUTED}>
        b_i = 80 − 2·6 = 68 mm
      </text>
      <text x={32} y={316} fontSize={8.5} fill={MUTED}>
        h_i = 100 − 2·6 = 88 mm
      </text>
    </g>
  )
}

function InertiaScene({ p }: { p: number }) {
  const inner = smooth(ramp(p, 0.05, 0.45))
  const textIn = smooth(ramp(p, 0.3, 0.7))
  return (
    <g>
      <Header
        title="MOMENT BEZWŁADNOŚCI · ODEJMOWANIE OTWORU"
        note="najpierw pełny prostokąt, potem odejmujemy pustkę"
      />
      <Section inner={inner} motionHole />
      <text x={150} y={270} textAnchor="middle" fontSize={8.5} fill={LOAD} opacity={textIn}>
        − pustka 68 × 88 mm
      </text>
      <g opacity={textIn}>
        <text x={XR} y={96} fontSize={8.5} fill={GREEN}>
          I₁ = 80·100³ / 12
        </text>
        <text x={XR} y={112} fontSize={8.5} fill={GREEN}>
          = 6 666 667 mm⁴
        </text>
        <text x={XR} y={134} fontSize={8.5} fill={LOAD}>
          I₂ = 68·88³ / 12
        </text>
        <text x={XR} y={150} fontSize={8.5} fill={LOAD}>
          = 3 861 675 mm⁴
        </text>
        <text x={XR} y={176} fontSize={8.5} fontWeight={700} fill={INK}>
          I_x = I₁ − I₂
        </text>
        <text x={XR} y={192} fontSize={9} fontWeight={700} fill={BLUE}>
          = 2 804 992 mm⁴
        </text>
        <text x={XR} y={208} fontSize={8.5} fill={MUTED}>
          ≈ 280,50 cm⁴
        </text>
      </g>
      <text x={32} y={300} fontSize={8.5} fill={MUTED}>
        I_x = (b·h³ − b_i·h_i³) / 12
      </text>
    </g>
  )
}

function WxScene({ p }: { p: number }) {
  const draw = smooth(p)
  return (
    <g>
      <Header title="WSKAŹNIK WYTRZYMAŁOŚCI PRZEKROJU" note="najdalsze włókno leży w odległości c = h/2 od osi" />
      <Section inner={1} showInner />
      <NeutralAxis cx={150} width={250} />
      <g opacity={draw}>
        <text x={XR} y={98} fontSize={8.5} fill={INK}>
          c = h / 2 = 100 / 2
        </text>
        <text x={XR} y={114} fontSize={9} fontWeight={700} fill={GREEN}>
          c = 50 mm
        </text>
        <text x={XR} y={140} fontSize={8.5} fill={INK}>
          W_x = I_x / c
        </text>
        <text x={XR} y={156} fontSize={8.5} fill={MUTED}>
          = 2 804 992 / 50
        </text>
        <text x={XR} y={172} fontSize={9} fontWeight={700} fill={BLUE}>
          = 56 099,84 mm³
        </text>
        <text x={XR} y={188} fontSize={9} fontWeight={700} fill={BLUE}>
          ≈ 56,10 cm³
        </text>
        <text x={XR} y={214} fontSize={8} fill={MUTED}>
          (włókno górne i dolne)
        </text>
      </g>
      <text x={32} y={300} fontSize={8.5} fill={MUTED}>
        W_x = I_x / (h/2)
      </text>
    </g>
  )
}

function AllowableScene({ p }: { p: number }) {
  const fill = smooth(ramp(p, 0.1, 0.55))
  const limit = smooth(ramp(p, 0.35, 0.75))
  const x0 = 60
  const x1 = 400
  const span = x1 - x0
  const xAt = (value: number) => x0 + (value / 400) * span
  return (
    <g>
      <Header
        title="NAPRĘŻENIE DOPUSZCZALNE"
        note="granica plastyczności R_e podzielona przez współczynnik bezpieczeństwa n"
      />
      <text x={230} y={78} textAnchor="middle" fontSize={9} fontWeight={700} fill={INK}>
        σ_dop = R_e / n
      </text>
      <rect x={x0} y={146} width={span} height={20} rx={9} fill="#edf1f5" stroke="#d7dde5" strokeWidth={1} />
      <motion.rect
        x={x0}
        y={146}
        height={20}
        rx={9}
        fill={GREEN}
        fillOpacity={0.28}
        stroke={GREEN}
        strokeWidth={1.2}
        initial={false}
        animate={{ width: span * (133.333 / 400) * fill }}
        transition={{ duration: 0.15, ease: 'linear' }}
      />
      <line x1={xAt(133.333)} y1={138} x2={xAt(133.333)} y2={176} stroke={GREEN} strokeWidth={1.6} />
      <line x1={xAt(400)} y1={138} x2={xAt(400)} y2={176} stroke={RED} strokeWidth={1.6} />
      <text x={xAt(133.333)} y={128} textAnchor="middle" fontSize={8.5} fontWeight={700} fill={GREEN}>
        σ_dop = 133,33 MPa
      </text>
      <text x={xAt(400)} y={128} textAnchor="end" fontSize={8.5} fontWeight={700} fill={RED}>
        R_e = 400 MPa
      </text>
      {[0, 100, 200, 300, 400].map((tick) => (
        <g key={`tick-${tick}`}>
          <line x1={xAt(tick)} y1={176} x2={xAt(tick)} y2={182} stroke={MUTED} strokeWidth={1} />
          <text x={xAt(tick)} y={194} textAnchor="middle" fontSize={8} fill={MUTED}>
            {tick}
          </text>
        </g>
      ))}
      <text x={230} y={210} textAnchor="middle" fontSize={8} fill={MUTED}>
        naprężenie [MPa]
      </text>
      <g opacity={limit}>
        <text x={230} y={232} textAnchor="middle" fontSize={9} fill={INK}>
          n = 3
        </text>
        <text x={230} y={258} textAnchor="middle" fontSize={10} fontWeight={700} fill={GREEN}>
          σ_dop = 400 / 3 = 133,33 MPa
        </text>
        <text x={230} y={280} textAnchor="middle" fontSize={8.5} fill={MUTED}>
          σ_dop = 133,33 N/mm²
        </text>
      </g>
      <text x={32} y={314} fontSize={8.5} fill={MUTED}>
        Założenie: materiał sprężysty, bezpieczny zapas n = 3.
      </text>
    </g>
  )
}

function MomentScene({ p }: { p: number }) {
  const draw = smooth(p)
  return (
    <g>
      <Header title="MAKSYMALNY DOPUSZCZALNY MOMENT" note="warunek wytrzymałości σ_max ≤ σ_dop rozwiązany względem M" />
      <motion.g initial={false} animate={{ opacity: draw }}>
        <rect x={40} y={62} width={380} height={214} rx={10} fill="#f5f8fd" stroke={BLUE} strokeWidth={1.2} />
        <text x={62} y={90} fontSize={9.5} fontWeight={700} fill={INK}>
          warunek wytrzymałości
        </text>
        <text x={62} y={120} fontSize={9} fill={MUTED}>
          σ_dop = 133,333 MPa
        </text>
        <text x={62} y={144} fontSize={9} fill={MUTED}>
          W_x = 56 099,84 mm³
        </text>
        <text x={62} y={174} fontSize={9} fill={INK}>
          M_max = σ_dop · W_x
        </text>
        <text x={62} y={198} fontSize={9} fill={INK}>
          M_max = 133,333 · 56 099,84
        </text>
        <text x={62} y={222} fontSize={9} fill={INK}>
          M_max = 7 479 979 N·mm
        </text>
        <text x={62} y={256} fontSize={14} fontWeight={700} fill={BLUE}>
          M_max = 7,48 kN·m
        </text>
      </motion.g>
      <text x={230} y={308} textAnchor="middle" fontSize={8.5} fill={MUTED}>
        Moment większy od 7,48 kN·m przekroczyłby naprężenie dopuszczalne.
      </text>
    </g>
  )
}

function StressScene({ p }: { p: number }) {
  const draw = smooth(p)
  const cx = 112
  const axisX = 252
  const top = 80
  const bottom = 260
  const maxLen = 70
  const levels = [-0.92, -0.62, -0.3, 0, 0.3, 0.62, 0.92]
  return (
    <g>
      <Header title="ROZKŁAD NAPRĘŻEŃ W PRZEKROJU" note="naprężenie zmienia się liniowo od zera na osi obojętnej" />
      <Section cx={cx} inner={1} showInner />
      <line x1={38} y1={CY} x2={axisX} y2={CY} stroke={VIOLET} strokeWidth={1.2} strokeDasharray="6 4" />
      <text x={cx} y={70} textAnchor="middle" fontSize={8.5} fontWeight={700} fill={RED}>
        ściskanie
      </text>
      <text x={cx} y={280} textAnchor="middle" fontSize={8.5} fontWeight={700} fill={GREEN}>
        rozciąganie
      </text>
      <text x={188} y={184} fontSize={8.5} fill={VIOLET}>
        oś obojętna
      </text>
      <polygon points={`${axisX},${CY} ${axisX},${top} ${axisX - maxLen},${top}`} fill={RED} fillOpacity={0.14} />
      <polygon
        points={`${axisX},${CY} ${axisX},${bottom} ${axisX + maxLen},${bottom}`}
        fill={GREEN}
        fillOpacity={0.14}
      />
      <line x1={axisX} y1={top} x2={axisX} y2={bottom} stroke={INK} strokeWidth={1.2} />
      {levels.map((ratio, index) => {
        if (Math.abs(ratio) < 0.05) return null
        const y = CY + ratio * (OH / 2)
        const length = Math.abs(ratio) * maxLen * draw
        const compression = ratio < 0
        return (
          <line
            key={`stress-${index}`}
            x1={axisX}
            y1={y}
            x2={compression ? axisX - length : axisX + length}
            y2={y}
            stroke={compression ? RED : GREEN}
            strokeWidth={1.6}
            markerEnd={length > 8 ? `url(#w5abm-${compression ? 'comp' : 'tens'})` : undefined}
          />
        )
      })}
      <motion.g initial={false} animate={{ opacity: smooth(ramp(p, 0.35, 0.8)) }}>
        <text x={axisX - 6} y={top - 6} textAnchor="end" fontSize={9} fontWeight={700} fill={RED}>
          −133,33 MPa
        </text>
        <text x={axisX + 6} y={bottom + 14} fontSize={9} fontWeight={700} fill={GREEN}>
          +133,33 MPa
        </text>
      </motion.g>
      <text x={axisX} y={296} textAnchor="middle" fontSize={8.5} fill={MUTED}>
        σ(y) = M·y / I_x
      </text>
      <text x={32} y={314} fontSize={8.5} fill={MUTED}>
        znak dodatni: rozciąganie dolnych włókien
      </text>
    </g>
  )
}

function CheckScene({ p }: { p: number }) {
  const draw = smooth(p)
  return (
    <g>
      <Header title="KONTROLA JEDNOSTEK I WYNIKU" note="spójność: N·mm / mm³ = N/mm² = MPa" />
      <motion.g initial={false} animate={{ opacity: draw }}>
        <rect x={36} y={56} width={388} height={238} rx={10} fill="#f5faf7" stroke={GREEN} strokeWidth={1.2} />
        <text x={56} y={82} fontSize={9.5} fontWeight={700} fill={INK}>
          zestawienie
        </text>
        <text x={56} y={110} fontSize={8.5} fill={MUTED}>
          I_x = 2 804 992 mm⁴ = 280,50 cm⁴
        </text>
        <text x={56} y={132} fontSize={8.5} fill={MUTED}>
          W_x = 56 099,84 mm³ = 56,10 cm³
        </text>
        <text x={56} y={154} fontSize={8.5} fill={MUTED}>
          σ_dop = 133,33 MPa = 133,33 N/mm²
        </text>
        <text x={56} y={182} fontSize={8.5} fill={INK}>
          M_max = 133,33 N/mm² · 56 099,84 mm³
        </text>
        <text x={56} y={204} fontSize={8.5} fill={INK}>
          M_max = 7 479 979 N·mm = 7,48 kN·m
        </text>
        <text x={56} y={236} fontSize={9} fill={GREEN}>
          σ_max = M_max / W_x = 133,33 MPa
        </text>
        <text x={56} y={258} fontSize={9.5} fontWeight={700} fill={GREEN}>
          σ_max ≤ σ_dop — warunek spełniony
        </text>
        <text x={56} y={280} fontSize={8.5} fill={MUTED}>
          przekrój pracuje w zakresie sprężystym
        </text>
      </motion.g>
    </g>
  )
}

function AluminumBeamMomentAnimationScene({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const p = playing ? smooth(sceneProgress) : 1

  const content =
    metric === 'section' ? (
      <GeometryScene p={p} />
    ) : metric === 'subtraction' ? (
      <InertiaScene p={p} />
    ) : metric === 'wx' ? (
      <WxScene p={p} />
    ) : metric === 'allowable' ? (
      <AllowableScene p={p} />
    ) : metric === 'moment' ? (
      <MomentScene p={p} />
    ) : metric === 'stress' ? (
      <StressScene p={p} />
    ) : metric === 'check' ? (
      <CheckScene p={p} />
    ) : (
      <ModelScene p={p} />
    )

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 340"
          role="img"
          aria-label="Pręt aluminiowy o przekroju prostokątnym rurowym: wymiary, moment bezwładności, wskaźnik wytrzymałości, naprężenie dopuszczalne, maksymalny moment i rozkład naprężeń."
        >
          <defs>
            <marker
              id="w5abm-moment"
              viewBox="0 0 10 10"
              refX={8}
              refY={5}
              markerWidth={5}
              markerHeight={5}
              orient="auto"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={VIOLET} />
            </marker>
            <marker
              id="w5abm-comp"
              viewBox="0 0 10 10"
              refX={9}
              refY={5}
              markerWidth={5}
              markerHeight={5}
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={RED} />
            </marker>
            <marker
              id="w5abm-tens"
              viewBox="0 0 10 10"
              refX={9}
              refY={5}
              markerWidth={5}
              markerHeight={5}
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={GREEN} />
            </marker>
          </defs>
          {content}
        </svg>
      </div>
    </div>
  )
}

export function createAluminumBeamMomentAnimation(
  config: AluminumBeamMomentInputs,
): ComponentType<SolutionAnimationProps> {
  return function AluminumBeamMomentAnimation(props: SolutionAnimationProps) {
    return <AluminumBeamMomentAnimationScene {...props} />
  }
}
