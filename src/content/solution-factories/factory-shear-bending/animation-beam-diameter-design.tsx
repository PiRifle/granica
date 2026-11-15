import type { ComponentType } from 'react'
import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import type { BeamDiameterDesignInputs } from './factory'
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

const TOTAL = 6
const X0 = 48
const X1 = 428
const SPAN = X1 - X0
const BEAM_Y = 82
const XB = X0 + (1 / TOTAL) * SPAN
const XC = X0 + (4 / TOTAL) * SPAN
const XD = X1
const T_BASE = 176
const T_SCALE = 1.15
const M_BASE = 272
const M_SCALE = 1.25
const xAt = (metres: number) => X0 + (metres / TOTAL) * SPAN
const yT = (value: number) => T_BASE - value * T_SCALE
const yM = (value: number) => M_BASE - value * M_SCALE

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
        P1 = 30 kN · P2 = 40 kN
      </text>
      <text x={14} y={31} fontSize={8.5} fill={MUTED}>
        {note}
      </text>
    </g>
  )
}

function Support({ x, y, label, roller = false }: { x: number; y: number; label: string; roller?: boolean }) {
  return (
    <g>
      <polygon
        points={`${x - 9},${y + 16} ${x},${y + 2} ${x + 9},${y + 16}`}
        fill="#dfe6f2"
        stroke={EDGE}
        strokeWidth={1.3}
      />
      {roller ? (
        <>
          <line x1={x - 11} y1={y + 16} x2={x + 11} y2={y + 16} stroke={EDGE} strokeWidth={1.3} />
          <circle cx={x} cy={y + 22} r={4.5} fill="none" stroke={EDGE} strokeWidth={1.2} />
        </>
      ) : (
        <line x1={x - 11} y1={y + 16} x2={x + 11} y2={y + 16} stroke={EDGE} strokeWidth={1.3} />
      )}
      <text x={x} y={y + 34} textAnchor="middle" fontSize={9} fontWeight={700} fill={INK}>
        {label}
      </text>
    </g>
  )
}

function Load({
  x,
  label,
  amount = 1,
  textSide = 1,
}: {
  x: number
  label: string
  amount?: number
  textSide?: 1 | -1
}) {
  const t = clamp01(amount)
  return (
    <g opacity={t}>
      <line x1={x} y1={36} x2={x} y2={76} stroke={LOAD} strokeWidth={2.4} markerEnd="url(#w5bdd-load)" />
      <text
        x={x + 6 * textSide}
        y={44}
        textAnchor={textSide > 0 ? 'start' : 'end'}
        fontSize={8.5}
        fontWeight={700}
        fill={LOAD}
      >
        {label}
      </text>
    </g>
  )
}

function BeamRig({
  opacity = 1,
  loads = true,
  dims = false,
  reactions = false,
  loadAmount = 1,
}: {
  opacity?: number
  loads?: boolean
  dims?: boolean
  reactions?: boolean
  loadAmount?: number
}) {
  return (
    <g opacity={opacity}>
      <line x1={X0} y1={BEAM_Y} x2={X1} y2={BEAM_Y} stroke={EDGE} strokeWidth={4.5} strokeLinecap="round" />
      <Support x={XB} y={BEAM_Y} label="B" />
      <Support x={XD} y={BEAM_Y} label="D" roller />
      <text x={X0 - 4} y={BEAM_Y + 16} textAnchor="end" fontSize={9} fontWeight={700} fill={INK}>
        A
      </text>
      <text x={XC} y={BEAM_Y + 16} textAnchor="middle" fontSize={9} fontWeight={700} fill={INK}>
        C
      </text>
      {loads && (
        <>
          <Load x={X0} label="P1 = 30 kN" amount={loadAmount} />
          <Load x={XC} label="P2 = 40 kN" amount={loadAmount} />
        </>
      )}
      {reactions && (
        <>
          <line
            x1={XB}
            y1={BEAM_Y - 6}
            x2={XB}
            y2={BEAM_Y - 40}
            stroke={GREEN}
            strokeWidth={2.2}
            markerEnd="url(#w5bdd-react)"
          />
          <text x={XB + 7} y={44} fontSize={8.5} fontWeight={700} fill={GREEN}>
            R_B = 52 kN
          </text>
          <line
            x1={XD}
            y1={BEAM_Y - 6}
            x2={XD}
            y2={BEAM_Y - 40}
            stroke={GREEN}
            strokeWidth={2.2}
            markerEnd="url(#w5bdd-react)"
          />
          <text x={XD - 5} y={44} textAnchor="end" fontSize={8.5} fontWeight={700} fill={GREEN}>
            R_D = 18 kN
          </text>
        </>
      )}
      {dims && (
        <g stroke={MUTED} fill={MUTED}>
          <line x1={X0} y1={124} x2={XB} y2={124} strokeWidth={1} />
          <line x1={XB} y1={124} x2={XC} y2={124} strokeWidth={1} />
          <line x1={XC} y1={124} x2={XD} y2={124} strokeWidth={1} />
          {[X0, XB, XC, XD].map((x) => (
            <line key={`dim-${x}`} x1={x} y1={119} x2={x} y2={129} strokeWidth={1} />
          ))}
          <text x={(X0 + XB) / 2} y={138} textAnchor="middle" fontSize={8} stroke="none">
            1,0 m
          </text>
          <text x={(XB + XC) / 2} y={138} textAnchor="middle" fontSize={8} stroke="none">
            3,0 m
          </text>
          <text x={(XC + XD) / 2} y={138} textAnchor="middle" fontSize={8} stroke="none">
            2,0 m
          </text>
        </g>
      )}
    </g>
  )
}

function DiagramAxes({ kind }: { kind: 'shear' | 'moment' }) {
  const base = kind === 'shear' ? T_BASE : M_BASE
  return (
    <g>
      <line x1={X0 - 6} y1={base} x2={X1 + 6} y2={base} stroke="#c9d0d9" strokeWidth={1} />
      <text x={20} y={base - 8} fontSize={10} fontWeight={700} fill={kind === 'shear' ? BLUE : LOAD}>
        {kind === 'shear' ? 'T' : 'M'}
      </text>
      <text x={X1 + 9} y={base + 3} fontSize={8} fill={MUTED}>
        x
      </text>
    </g>
  )
}

const shearPath = [
  [0, -30],
  [1, -30],
  [1, 22],
  [4, 22],
  [4, -18],
  [6, -18],
  [6, 0],
] as const

const momentPath = [
  [0, 0],
  [1, -30],
  [4, 36],
  [6, 0],
] as const

const toPath = (points: readonly (readonly [number, number])[], yMap: (value: number) => number) =>
  points
    .map(([x, value], index) => `${index === 0 ? 'M' : 'L'} ${xAt(x).toFixed(1)} ${yMap(value).toFixed(1)}`)
    .join(' ')

const shearLine = toPath(shearPath, yT)
const shearFill = `M ${xAt(0)} ${T_BASE} ${shearLine.slice(1)} L ${xAt(6)} ${T_BASE} Z`
const momentLine = toPath(momentPath, yM)
const momentFill = `M ${xAt(0)} ${M_BASE} ${momentLine.slice(1)} L ${xAt(6)} ${M_BASE} Z`

function Marker({
  x,
  y,
  text,
  color,
  anchor = 'middle',
  dx = 0,
  dy = -6,
  opacity = 1,
}: {
  x: number
  y: number
  text: string
  color: string
  anchor?: 'start' | 'middle' | 'end'
  dx?: number
  dy?: number
  opacity?: number
}) {
  return (
    <g opacity={opacity}>
      <circle cx={x} cy={y} r={2.8} fill={color} />
      <text x={x + dx} y={y + dy} textAnchor={anchor} fontSize={8.5} fontWeight={700} fill={color}>
        {text}
      </text>
    </g>
  )
}

function ModelScene({ p }: { p: number }) {
  const draw = smooth(p)
  return (
    <g>
      <Header
        title="BELKA Z PRZEWIESZENIEM · MODEL"
        note="A — swobodny koniec, B — podpora, C — obciążenie, D — podpora"
      />
      <BeamRig opacity={0.4 + 0.6 * draw} dims loadAmount={ramp(p, 0.1, 0.45)} />
      <text x={32} y={300} fontSize={8.5} fill={MUTED}>
        P1 = 30 kN w A, P2 = 40 kN w C; podpory B i D utrzymują belkę.
      </text>
      <text x={446} y={300} textAnchor="end" fontSize={8.5} fill={MUTED}>
        przewieszenie AB = 1,0 m
      </text>
    </g>
  )
}

function ReactionScene({ p }: { p: number }) {
  const draw = smooth(p)
  return (
    <g>
      <Header
        title="RÓWNOWAGA · REAKCJE PODPÓR"
        note="suma momentów względem B daje R_D, a suma sił pionowych daje R_B"
      />
      <BeamRig opacity={0.55} loadAmount={0.55} reactions dims={false} />
      <motion.g initial={false} animate={{ opacity: draw }}>
        <rect x={40} y={214} width={380} height={76} rx={8} fill="#f5faf7" stroke={GREEN} strokeWidth={1.1} />
        <text x={58} y={238} fontSize={8.5} fill={GREEN}>
          ΣM_B: R_D·5 = P2·3 − P1·1
        </text>
        <text x={58} y={256} fontSize={8.5} fill={GREEN}>
          R_D = (120 − 30)/5 = 18 kN
        </text>
        <text x={58} y={276} fontSize={8.5} fill={GREEN}>
          R_B = 30 + 40 − 18 = 52 kN
        </text>
      </motion.g>
      <text x={32} y={318} fontSize={8.5} fill={MUTED}>
        Obie reakcje są dodatnie, więc działają w górę.
      </text>
    </g>
  )
}

function ShearScene({ p }: { p: number }) {
  const draw = smooth(p)
  return (
    <g>
      <Header title="WYKRES SIŁY POPRZECZNEJ T" note="skoki w B i C odpowiadają reakcji oraz obciążeniu skupionemu" />
      <BeamRig opacity={0.35} loads={false} />
      <DiagramAxes kind="shear" />
      <motion.path d={shearFill} fill={BLUE} fillOpacity={0.16} initial={false} animate={{ opacity: draw }} />
      <motion.path
        d={shearLine}
        fill="none"
        stroke={BLUE}
        strokeWidth={2.4}
        strokeLinejoin="round"
        initial={false}
        animate={{ pathLength: draw }}
        transition={{ duration: 0.15, ease: 'linear' }}
      />
      <Marker x={xAt(0)} y={yT(-30)} text="−30" color={BLUE} dx={4} dy={12} opacity={draw > 0.15 ? 1 : 0} />
      <Marker x={xAt(1)} y={yT(22)} text="+22" color={BLUE} dx={6} dy={-8} opacity={draw > 0.45 ? 1 : 0} />
      <Marker x={xAt(1)} y={yT(-30)} text="−30" color={BLUE} dx={-4} dy={12} opacity={draw > 0.45 ? 1 : 0} />
      <Marker x={xAt(4)} y={yT(-18)} text="−18" color={BLUE} dx={6} dy={12} opacity={draw > 0.75 ? 1 : 0} />
      <Marker x={xAt(6)} y={yT(0)} text="0" color={MUTED} dx={4} dy={-7} opacity={draw > 0.9 ? 1 : 0} />
      <text x={X0 + 4} y={T_BASE + 22} fontSize={8.5} fill={MUTED}>
        T [kN]
      </text>
    </g>
  )
}

function MomentScene({ p }: { p: number }) {
  const draw = smooth(p)
  return (
    <g>
      <Header
        title="WYKRES MOMENTU GNĄCEGO M"
        note="odcinek AB daje −30 kN·m w B, a przęsło BC rośnie do +36 kN·m w C"
      />
      <BeamRig opacity={0.35} loads={false} />
      <DiagramAxes kind="moment" />
      <motion.path d={momentFill} fill={LOAD} fillOpacity={0.16} initial={false} animate={{ opacity: draw }} />
      <motion.path
        d={momentLine}
        fill="none"
        stroke={LOAD}
        strokeWidth={2.4}
        strokeLinejoin="round"
        initial={false}
        animate={{ pathLength: draw }}
        transition={{ duration: 0.15, ease: 'linear' }}
      />
      <Marker x={xAt(0)} y={yM(0)} text="0" color={MUTED} dx={-4} dy={-7} opacity={draw > 0.15 ? 1 : 0} />
      <Marker x={xAt(1)} y={yM(-30)} text="−30" color={LOAD} dx={4} dy={-8} opacity={draw > 0.45 ? 1 : 0} />
      <Marker x={xAt(4)} y={yM(36)} text="+36" color={LOAD} dx={4} dy={-8} opacity={draw > 0.75 ? 1 : 0} />
      <Marker x={xAt(6)} y={yM(0)} text="0" color={MUTED} dx={4} dy={-7} opacity={draw > 0.9 ? 1 : 0} />
      <text x={X0 + 4} y={M_BASE + 22} fontSize={8.5} fill={MUTED}>
        M [kN·m]
      </text>
    </g>
  )
}

function MaxScene({ p }: { p: number }) {
  const draw = smooth(p)
  return (
    <g>
      <Header title="NAJWIĘKSZY MOMENT BEZWZGLĘDNY" note="porównujemy −30 kN·m w B z +36 kN·m w C" />
      <BeamRig opacity={0.3} loads={false} />
      <DiagramAxes kind="shear" />
      <path d={shearFill} fill={BLUE} fillOpacity={0.08} />
      <path d={shearLine} fill="none" stroke={BLUE} strokeWidth={1.4} opacity={0.35} />
      <DiagramAxes kind="moment" />
      <path d={momentFill} fill={LOAD} fillOpacity={0.08} />
      <path d={momentLine} fill="none" stroke={LOAD} strokeWidth={1.4} opacity={0.35} />
      <line
        x1={xAt(4)}
        y1={yM(36)}
        x2={xAt(4)}
        y2={M_BASE + 10}
        stroke={LOAD}
        strokeWidth={1}
        strokeDasharray="4 3"
        opacity={draw}
      />
      <Marker x={xAt(1)} y={yM(-30)} text="−30" color={LOAD} dx={-4} dy={-8} opacity={draw > 0.4 ? 1 : 0} />
      <Marker x={xAt(4)} y={yM(36)} text="+36" color={LOAD} dx={4} dy={-8} opacity={draw > 0.6 ? 1 : 0} />
      <motion.g initial={false} animate={{ opacity: draw }}>
        <text x={xAt(4) + 8} y={yM(36) + 18} fontSize={9} fontWeight={700} fill={LOAD}>
          |M|max = 36 kN·m
        </text>
        <text x={32} y={M_BASE + 42} fontSize={8.5} fill={MUTED}>
          Wartość bezwzględna decyduje o naprężeniu: |−30| &lt; |+36|.
        </text>
      </motion.g>
    </g>
  )
}

function SectionCircle({
  cx,
  cy,
  radius,
  diameter,
  unknown = false,
  opacity = 1,
}: {
  cx: number
  cy: number
  radius: number
  diameter: string
  unknown?: boolean
  opacity?: number
}) {
  return (
    <g opacity={opacity}>
      <circle cx={cx} cy={cy} r={radius} fill={FILL} stroke={EDGE} strokeWidth={1.6} />
      <line x1={cx - radius} y1={cy} x2={cx + radius} y2={cy} stroke={MUTED} strokeWidth={1} strokeDasharray="5 4" />
      <line x1={cx - radius - 6} y1={cy} x2={cx - radius + 6} y2={cy} stroke={MUTED} strokeWidth={1} />
      <line x1={cx + radius - 6} y1={cy} x2={cx + radius + 6} y2={cy} stroke={MUTED} strokeWidth={1} />
      <text x={cx} y={cy - radius - 10} textAnchor="middle" fontSize={9} fontWeight={700} fill={unknown ? LOAD : BLUE}>
        {diameter}
      </text>
      <text x={cx} y={cy + radius + 18} textAnchor="middle" fontSize={8.5} fill={MUTED}>
        przekrój pełny kołowy
      </text>
    </g>
  )
}

function SectionScene({ p }: { p: number }) {
  const draw = smooth(p)
  return (
    <g>
      <Header
        title="PRZEKRÓJ PEŁNY KOŁOWY"
        note="wskaźnik wytrzymałości przekroju kołowego zależy od średnicy w trzeciej potędze"
      />
      <SectionCircle cx={138} cy={170} radius={72} diameter="d = ?" unknown />
      <motion.g initial={false} animate={{ opacity: draw }}>
        <text x={244} y={92} fontSize={8.5} fill={INK}>
          W_z = π d³ / 32
        </text>
        <text x={244} y={116} fontSize={8.5} fill={INK}>
          σ_max = M / W_z ≤ k_g
        </text>
        <text x={244} y={148} fontSize={8.5} fill={MUTED}>
          |M|max = 36,0 kN·m
        </text>
        <text x={244} y={170} fontSize={8.5} fill={MUTED}>
          k_g = 300 MPa
        </text>
        <text x={244} y={202} fontSize={9} fontWeight={700} fill={LOAD}>
          szukane: d
        </text>
      </motion.g>
      <text x={32} y={306} fontSize={8.5} fill={MUTED}>
        Warunek: 32·|M| / (π d³) ≤ k_g
      </text>
    </g>
  )
}

function DesignScene({ p }: { p: number }) {
  const draw = smooth(p)
  const reveal = smooth(ramp(p, 0.55, 0.85))
  return (
    <g>
      <Header
        title="DOBÓR ŚREDNICY Z WARUNKU WYTRZYMAŁOŚCI"
        note="przekształcamy warunek względem d i zaokrąglamy w górę"
      />
      <SectionCircle cx={132} cy={170} radius={70} diameter="d = 107 mm" opacity={0.55 + 0.45 * draw} />
      <motion.g initial={false} animate={{ opacity: draw }}>
        <text x={234} y={90} fontSize={8.5} fill={INK}>
          d ≥ ∛(32·|M|max / (π·k_g))
        </text>
        <text x={234} y={114} fontSize={8.5} fill={MUTED}>
          = ∛(32·36·10⁶ / (π·300))
        </text>
        <text x={234} y={138} fontSize={8.5} fill={MUTED}>
          = ∛(1 222 309)
        </text>
        <text x={234} y={164} fontSize={9} fontWeight={700} fill={GREEN}>
          d_min = 106,92 mm
        </text>
        <text x={234} y={196} fontSize={10} fontWeight={700} fill={BLUE}>
          przyjmujemy d = 107 mm
        </text>
        <text x={234} y={218} fontSize={8.5} fill={MUTED}>
          praktycznie 110 mm
        </text>
      </motion.g>
      <motion.g initial={false} animate={{ opacity: reveal }}>
        <line x1={70} y1={286} x2={392} y2={286} stroke="#d7dde5" strokeWidth={1.2} />
        {[100, 105, 110, 115, 120].map((value) => {
          const x = 70 + ((value - 100) / 20) * 322
          return (
            <g key={`scale-${value}`}>
              <line x1={x} y1={282} x2={x} y2={290} stroke={MUTED} strokeWidth={1} />
              <text x={x} y={300} textAnchor="middle" fontSize={8} fill={MUTED}>
                {value}
              </text>
            </g>
          )
        })}
        <circle cx={70 + ((106.92 - 100) / 20) * 322} cy={286} r={3.4} fill={GREEN} />
        <circle cx={70 + ((110 - 100) / 20) * 322} cy={286} r={3.4} fill={BLUE} />
        <text x={70 + ((106.92 - 100) / 20) * 322 - 4} y={276} textAnchor="end" fontSize={8} fill={GREEN}>
          106,92
        </text>
        <text x={70 + ((110 - 100) / 20) * 322 + 4} y={276} fontSize={8} fill={BLUE}>
          110
        </text>
      </motion.g>
    </g>
  )
}

function CheckScene({ p }: { p: number }) {
  const draw = smooth(p)
  const ratio = 299.33 / 300
  return (
    <g>
      <Header
        title="SPRAWDZENIE NAPRĘŻENIA PRZY d = 107 mm"
        note="przyjęta średnica musi spełniać warunek z niewielkim zapasem"
      />
      <SectionCircle cx={128} cy={158} radius={62} diameter="d = 107 mm" opacity={0.95} />
      <motion.g initial={false} animate={{ opacity: draw }}>
        <text x={232} y={82} fontSize={8.5} fill={INK}>
          σ = 32·M / (π d³)
        </text>
        <text x={232} y={104} fontSize={8.5} fill={MUTED}>
          = 32·36·10⁶ / (π·107³)
        </text>
        <text x={232} y={128} fontSize={9} fontWeight={700} fill={GREEN}>
          σ = 299,3 MPa
        </text>
        <text x={232} y={150} fontSize={8.5} fill={GREEN}>
          299,3 MPa &lt; 300 MPa
        </text>
        <text x={232} y={174} fontSize={8.5} fill={MUTED}>
          zapas tylko 0,2%
        </text>
        <text x={232} y={196} fontSize={8.5} fill={MUTED}>
          dla d = 110 mm: 275,5 MPa
        </text>
      </motion.g>
      <rect x={232} y={218} width={176} height={14} rx={7} fill="#edf1f5" />
      <motion.rect
        x={232}
        y={218}
        height={14}
        rx={7}
        fill={GREEN}
        fillOpacity={0.35}
        stroke={GREEN}
        strokeWidth={1.1}
        initial={false}
        animate={{ width: 176 * ratio * draw }}
        transition={{ duration: 0.15, ease: 'linear' }}
      />
      <line x1={232 + 176} y1={212} x2={232 + 176} y2={238} stroke={RED} strokeWidth={1.2} strokeDasharray="4 3" />
      <text x={232} y={250} fontSize={8} fill={MUTED}>
        0 MPa
      </text>
      <text x={232 + 176} y={250} textAnchor="end" fontSize={8} fill={RED}>
        k_g = 300 MPa
      </text>
      <text x={32} y={288} fontSize={8.5} fill={MUTED}>
        σ = 32·36·10⁶ / (π·107³) = 299,33 MPa
      </text>
      <text x={32} y={306} fontSize={8.5} fill={GREEN}>
        Warunek spełniony, ale zaleca się większy zapas.
      </text>
    </g>
  )
}

function SummaryScene({ p }: { p: number }) {
  const draw = smooth(p)
  return (
    <g>
      <Header title="INTERPRETACJA WYNIKU" note="o doborze średnicy decyduje moment w punkcie C, a nie reakcje" />
      <motion.g initial={false} animate={{ opacity: draw }}>
        <rect x={36} y={58} width={388} height={232} rx={10} fill="#f5f8fd" stroke={BLUE} strokeWidth={1.2} />
        <text x={56} y={84} fontSize={9.5} fontWeight={700} fill={INK}>
          przebieg wykresu momentu
        </text>
        <text x={56} y={112} fontSize={8.5} fill={MUTED}>
          A: M = 0
        </text>
        <text x={56} y={134} fontSize={8.5} fill={LOAD}>
          B: M = −30 kN·m (przewieszenie)
        </text>
        <text x={56} y={156} fontSize={8.5} fill={LOAD}>
          C: M = +36 kN·m (przęsło BC)
        </text>
        <text x={56} y={178} fontSize={8.5} fill={MUTED}>
          D: M = 0
        </text>
        <text x={56} y={210} fontSize={9} fontWeight={700} fill={BLUE}>
          |M|max = 36 kN·m w C
        </text>
        <text x={56} y={236} fontSize={8.5} fill={MUTED}>
          W_z = π·107³/32 = 120,26 cm³
        </text>
        <text x={56} y={258} fontSize={8.5} fill={MUTED}>
          σ = 299,33 MPa ≤ k_g = 300 MPa
        </text>
        <text x={56} y={282} fontSize={9} fontWeight={700} fill={GREEN}>
          d = 107 mm — warunek spełniony
        </text>
      </motion.g>
      <text x={32} y={318} fontSize={8.5} fill={MUTED}>
        W praktyce stosuje się d = 110 mm, aby zwiększyć zapas.
      </text>
    </g>
  )
}

function BeamDiameterDesignAnimationScene({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const p = playing ? smooth(sceneProgress) : 1

  const content =
    metric === 'reaction' ? (
      <ReactionScene p={p} />
    ) : metric === 'shear' ? (
      <ShearScene p={p} />
    ) : metric === 'moment' ? (
      <MomentScene p={p} />
    ) : metric === 'max-moment' ? (
      <MaxScene p={p} />
    ) : metric === 'section' ? (
      <SectionScene p={p} />
    ) : metric === 'design' ? (
      <DesignScene p={p} />
    ) : metric === 'check' ? (
      <CheckScene p={p} />
    ) : metric === 'summary' ? (
      <SummaryScene p={p} />
    ) : (
      <ModelScene p={p} />
    )

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 340"
          role="img"
          aria-label="Belka z przewieszeniem A-B-C-D: model, reakcje, wykresy siły poprzecznej i momentu, dobór średnicy pełnego przekroju kołowego oraz sprawdzenie naprężenia."
        >
          <defs>
            <marker
              id="w5bdd-load"
              viewBox="0 0 10 10"
              refX={8}
              refY={5}
              markerWidth={5.5}
              markerHeight={5.5}
              orient="auto"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={LOAD} />
            </marker>
            <marker
              id="w5bdd-react"
              viewBox="0 0 10 10"
              refX={8}
              refY={5}
              markerWidth={5}
              markerHeight={5}
              orient="auto"
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

export function createBeamDiameterDesignAnimation(
  config: BeamDiameterDesignInputs,
): ComponentType<SolutionAnimationProps> {
  return function BeamDiameterDesignAnimation(props: SolutionAnimationProps) {
    return <BeamDiameterDesignAnimationScene {...props} />
  }
}
