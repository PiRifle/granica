import { motion } from 'motion/react'
import type { ComponentType } from 'react'
import {
  ThreeSolutionScene,
  type ThreeLabel,
  type ThreePrimitive,
} from '../../../components/solution-figures/ThreeSolutionScene'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'
import {
  THREE_COLORS,
  ThreeBadge,
  ThreeStatus,
  move,
  pointLabel,
  v,
} from '../../../components/solution-figures/three-statics'
import { deriveBendingTorsion, exampleBendingTorsionInputs, pl, plGroup, type BendingTorsionInputs } from './factory'

const BLUE = '#4f6df5'
const LOAD = '#ff6b45'
const GREEN = '#2f7d5b'
const VIOLET = '#a970dd'
const MUTED = '#87929d'
const EDGE = '#7d8fa5'
const INK = '#17202a'
const FILL = '#eef3fa'

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}
const ramp = (value: number, from: number, to: number) => clamp01((value - from) / (to - from))

export function createBendingTorsionAnimation(inputs: BendingTorsionInputs): ComponentType<SolutionAnimationProps> {
  const derived = deriveBendingTorsion(inputs)
  const f0 = (value: number) => pl(value, 0)
  const f1 = (value: number) => pl(value, 1)
  const f2 = (value: number) => pl(value, 2)
  const f3 = (value: number) => pl(value, 3)
  const f4 = (value: number) => pl(value, 4)

  const O = v(0, 0, 0)
  const B_POINT = v(inputs.b, 0, 0)
  const C_POINT = v(inputs.b, inputs.a, 0)
  const FORCE_END = move(C_POINT, [0, 0, -1], 0.3)
  const A_HIGHLIGHT = v(0.06, 0, 0)

  const pipePrimitives = (): ThreePrimitive[] => [
    { kind: 'box', at: v(-0.035, 0, 0), size: [0.07, 0.32, 0.32], color: '#aab4bf' },
    { kind: 'rod', from: O, to: B_POINT, radius: 0.022, color: THREE_COLORS.member },
    { kind: 'rod', from: B_POINT, to: C_POINT, radius: 0.022, color: THREE_COLORS.member },
    { kind: 'sphere', at: O, radius: 0.036, color: THREE_COLORS.ink },
    { kind: 'sphere', at: B_POINT, radius: 0.03, color: THREE_COLORS.ink },
    { kind: 'sphere', at: C_POINT, radius: 0.03, color: THREE_COLORS.load },
    {
      kind: 'arrow',
      from: C_POINT,
      to: FORCE_END,
      color: THREE_COLORS.load,
      radius: 0.016,
      pulse: true,
      visibleAt: 0,
    },
    {
      kind: 'line',
      points: [v(0, 0, -0.09), v(inputs.b, 0, -0.09)],
      color: THREE_COLORS.muted,
      dashed: true,
      visibleAt: 0,
      hideAt: 2,
    },
    {
      kind: 'line',
      points: [v(inputs.b, 0, -0.09), v(inputs.b, inputs.a, -0.09)],
      color: THREE_COLORS.muted,
      dashed: true,
      visibleAt: 0,
      hideAt: 2,
    },
    {
      kind: 'line',
      points: [move(O, [0, 0, 0.06], 1), move(B_POINT, [0, 0, 0.06], 1)],
      color: THREE_COLORS.moment,
      dashed: true,
      visibleAt: 1,
      hideAt: 2,
    },
    {
      kind: 'line',
      points: [move(B_POINT, [0, 0, 0.06], 1), move(C_POINT, [0, 0, 0.06], 1)],
      color: THREE_COLORS.moment,
      dashed: true,
      visibleAt: 1,
      hideAt: 2,
    },
    {
      kind: 'arrow',
      from: O,
      to: C_POINT,
      color: THREE_COLORS.vector,
      radius: 0.008,
      visibleAt: 1,
      hideAt: 2,
    },
    {
      kind: 'sphere',
      at: A_HIGHLIGHT,
      radius: 0.055,
      color: THREE_COLORS.load,
      visibleAt: 7,
      pulse: true,
    },
    {
      kind: 'ring',
      at: A_HIGHLIGHT,
      radius: 0.07,
      tube: 0.011,
      axis: [1, 0, 0],
      color: THREE_COLORS.moment,
      visibleAt: 7,
    },
    {
      kind: 'ring',
      at: A_HIGHLIGHT,
      radius: 0.105,
      tube: 0.011,
      axis: [0, 1, 0],
      color: THREE_COLORS.vector,
      visibleAt: 7,
    },
  ]

  const threeLabels: ThreeLabel[] = [
    pointLabel('a', 'A', O, [-14, 16]),
    pointLabel('b', 'B', B_POINT, [-2, -16]),
    pointLabel('c', 'C', C_POINT, [10, -8]),
    {
      id: 'p',
      text: `P = ${f0(inputs.p)} kN`,
      at: FORCE_END,
      offset: [10, 8],
      size: 9.5,
      color: THREE_COLORS.load,
    },
    {
      id: 'dim-b',
      text: `b = ${f1(inputs.b)} m`,
      at: v(inputs.b / 2, 0, -0.09),
      offset: [0, -14],
      size: 9,
      anchor: 'middle',
      color: THREE_COLORS.muted,
      hideAt: 2,
    },
    {
      id: 'dim-a',
      text: `a = ${f1(inputs.a)} m`,
      at: v(inputs.b, inputs.a / 2, -0.09),
      offset: [14, 0],
      size: 9,
      color: THREE_COLORS.muted,
      hideAt: 2,
    },
    {
      id: 'arm-b',
      text: 'b — ramię zginania',
      at: v(inputs.b / 2, 0, 0.06),
      offset: [0, -14],
      size: 8.5,
      anchor: 'middle',
      color: THREE_COLORS.moment,
      visibleAt: 1,
      hideAt: 2,
    },
    {
      id: 'arm-a',
      text: 'a — skręcanie',
      at: C_POINT,
      offset: [10, 14],
      anchor: 'start',
      size: 8.5,
      color: THREE_COLORS.moment,
      visibleAt: 1,
      hideAt: 2,
    },
    {
      id: 'moment-g',
      text: `M_g = ${f2(derived.mg)} kN·m`,
      at: move(A_HIGHLIGHT, [0, 0, -0.15], 1),
      offset: [-10, 8],
      anchor: 'end',
      size: 8.5,
      color: THREE_COLORS.vector,
      visibleAt: 7,
    },
    {
      id: 'moment-s',
      text: `M_s = ${f2(derived.ms)} kN·m`,
      at: move(A_HIGHLIGHT, [0, 0, 0.17], 1),
      offset: [-10, -4],
      anchor: 'end',
      size: 8.5,
      color: THREE_COLORS.moment,
      visibleAt: 7,
    },
  ]

  const status = [
    `Rura L utwierdzona w A; siła P = ${f0(inputs.p)} kN w C`,
    'Ramię b daje zginanie, ramię a daje skręcanie',
    `M_g = ${f2(derived.mg)} kN·m oraz M_s = ${f2(derived.ms)} kN·m`,
    'Wykresy momentów wzdłuż obu odcinków rury',
    `M_eq = ${f4(derived.meq)} kN·m według hipotezy HMH`,
    `d_min = ${f2(derived.dMin)} mm, przyjęto d = ${f0(inputs.d)} mm`,
    `Sprawdzenie: σ_HMH = ${derived.sigmaHmhText} MPa < ${f0(inputs.kg)} MPa`,
    'Przekrój krytyczny A: M_g i M_s są największe',
    `Warunek HMH spełniony z zapasem ${derived.marginText}%`,
  ]

  function PipeThree(props: SolutionAnimationProps) {
    const { index } = props
    return (
      <ThreeSolutionScene
        {...props}
        label="Rura w kształcie litery L utwierdzona w A z pionową siłą P przyłożoną w C; widok 3D momentów zginających i skręcających."
        primitives={pipePrimitives()}
        labels={threeLabels}
        camera={{ position: [1.05, -1.25, 0.95], target: [0.27, 0.12, -0.02], viewSize: 1.05 }}
      >
        {index === 1 && (
          <ThreeBadge
            title="przeniesienie siły"
            value="M_g = P·b,  M_s = P·a"
            note={`b = ${f1(inputs.b)} m · a = ${f1(inputs.a)} m`}
            x={286}
            y={44}
            width={160}
            color={THREE_COLORS.moment}
          />
        )}
        {index >= 7 && (
          <ThreeBadge
            title="przekrój krytyczny A"
            value={`M_eq = ${f4(derived.meq)} kN·m`}
            note={`d = ${f0(inputs.d)} mm`}
            x={286}
            y={44}
            width={160}
            color={THREE_COLORS.load}
          />
        )}
        <ThreeStatus>{status[Math.min(index, status.length - 1)]}</ThreeStatus>
      </ThreeSolutionScene>
    )
  }

  function Header({ title, note }: { title: string; note: string }) {
    return (
      <g>
        <text x={14} y={18} fontSize={9.5} fontWeight={700} fill={INK}>
          {title}
        </text>
        <text x={446} y={18} textAnchor="end" fontSize={8.5} fill={MUTED}>
          {`rura L · k_g = ${f0(inputs.kg)} MPa`}
        </text>
        <text x={14} y={31} fontSize={8.5} fill={MUTED}>
          {note}
        </text>
      </g>
    )
  }

  function PlanScene({ p }: { p: number }) {
    const draw = smooth(p)
    const ax = 70
    const ay = 208
    const bx = 232
    const by = 208
    const cx = 232
    const cy = 128
    return (
      <g>
        <Header
          title="PRZENIESIENIE SIŁY DO PRZEKROJU A"
          note="widok z góry: AB wzdłuż x, BC wzdłuż z; siła P działa pionowo w dół"
        />
        <motion.g initial={false} animate={{ opacity: draw }}>
          <line x1={ax} y1={ay} x2={bx} y2={by} stroke={EDGE} strokeWidth={5} strokeLinecap="round" />
          <line x1={bx} y1={by} x2={cx} y2={cy} stroke={EDGE} strokeWidth={5} strokeLinecap="round" />
          <line x1={ax - 10} y1={ay - 14} x2={ax - 10} y2={ay + 14} stroke={EDGE} strokeWidth={2.4} />
          <circle cx={ax} cy={ay} r={4} fill={INK} />
          <circle cx={bx} cy={by} r={4} fill={INK} />
          <circle cx={cx} cy={cy} r={6} fill="#fff" stroke={LOAD} strokeWidth={1.8} />
          <line x1={cx - 4} y1={cy - 4} x2={cx + 4} y2={cy + 4} stroke={LOAD} strokeWidth={1.4} />
          <line x1={cx - 4} y1={cy + 4} x2={cx + 4} y2={cy - 4} stroke={LOAD} strokeWidth={1.4} />
          <text x={ax - 16} y={ay + 4} textAnchor="end" fontSize={9} fontWeight={700} fill={INK}>
            A
          </text>
          <text x={bx + 8} y={by + 16} fontSize={9} fontWeight={700} fill={INK}>
            B
          </text>
          <text x={cx + 12} y={cy - 6} fontSize={9} fontWeight={700} fill={LOAD}>
            C
          </text>
          <text x={cx - 12} y={cy - 8} textAnchor="end" fontSize={8} fill={LOAD}>
            {`P = ${f0(inputs.p)} kN`}
          </text>
          <line x1={ax} y1={ay + 20} x2={bx} y2={by + 20} stroke={MUTED} strokeWidth={1} />
          <line x1={ax} y1={ay + 15} x2={ax} y2={ay + 25} stroke={MUTED} strokeWidth={1} />
          <line x1={bx} y1={by + 15} x2={bx} y2={by + 25} stroke={MUTED} strokeWidth={1} />
          <text x={(ax + bx) / 2} y={ay + 34} textAnchor="middle" fontSize={8.5} fill={MUTED}>
            {`b = ${f1(inputs.b)} m`}
          </text>
          <line x1={cx + 16} y1={cy} x2={cx + 16} y2={by} stroke={MUTED} strokeWidth={1} />
          <line x1={cx + 11} y1={cy} x2={cx + 21} y2={cy} stroke={MUTED} strokeWidth={1} />
          <line x1={cx + 11} y1={by} x2={cx + 21} y2={by} stroke={MUTED} strokeWidth={1} />
          <text x={cx + 20} y={(cy + by) / 2 + 3} fontSize={8.5} fill={MUTED}>
            {`a = ${f1(inputs.a)} m`}
          </text>
          <path
            d={`M ${ax + 26} ${ay - 16} Q ${ax + 46} ${ay - 32} ${ax + 66} ${ay - 16}`}
            fill="none"
            stroke={VIOLET}
            strokeWidth={2}
            markerEnd="url(#w5bth-moment)"
          />
          <text x={ax + 46} y={ay - 38} textAnchor="middle" fontSize={8.5} fill={VIOLET}>
            M_s
          </text>
        </motion.g>
        <motion.g initial={false} animate={{ opacity: smooth(ramp(p, 0.3, 0.8)) }}>
          <text x={276} y={92} fontSize={8.5} fill={INK}>
            M_g = P · b
          </text>
          <text x={276} y={110} fontSize={8.5} fill={INK}>
            {`= ${f0(inputs.p)} · ${f1(inputs.b)} = ${f2(derived.mg)} kN·m`}
          </text>
          <text x={276} y={140} fontSize={8.5} fill={VIOLET}>
            M_s = P · a
          </text>
          <text x={276} y={158} fontSize={8.5} fill={VIOLET}>
            {`= ${f0(inputs.p)} · ${f1(inputs.a)} = ${f2(derived.ms)} kN·m`}
          </text>
          <text x={276} y={190} fontSize={8.5} fill={MUTED}>
            Pionowa siła P:
          </text>
          <text x={276} y={208} fontSize={8.5} fill={MUTED}>
            zginanie ramieniem b,
          </text>
          <text x={276} y={226} fontSize={8.5} fill={MUTED}>
            skręcanie ramieniem a.
          </text>
        </motion.g>
        <text x={32} y={304} fontSize={8.5} fill={MUTED}>
          {`M_g = ${f2(derived.mg)} kN·m w utwierdzeniu A`}
        </text>
      </g>
    )
  }

  function DiagramsScene({ p }: { p: number }) {
    const draw = smooth(p)
    const abx0 = 62
    const abx1 = 230
    const bcx0 = 292
    const bcx1 = 430
    const mgBase = 154
    const msBase = 242
    const mgScale = 42
    return (
      <g>
        <Header
          title="WYKRESY MOMENTÓW WZDŁUŻ RURY"
          note="na odcinku AB jednocześnie zginanie i skręcanie; na BC tylko zginanie"
        />
        <text x={22} y={mgBase - 4} fontSize={9} fontWeight={700} fill={BLUE}>
          M_g
        </text>
        <text x={22} y={msBase - 4} fontSize={9} fontWeight={700} fill={VIOLET}>
          M_s
        </text>
        <line x1={abx0 - 6} y1={mgBase} x2={abx1 + 6} y2={mgBase} stroke="#c9d0d9" strokeWidth={1} />
        <line x1={abx0 - 6} y1={msBase} x2={abx1 + 6} y2={msBase} stroke="#c9d0d9" strokeWidth={1} />
        <polygon
          points={`${abx0},${mgBase} ${abx0},${mgBase - mgScale} ${abx1},${mgBase}`}
          fill={BLUE}
          fillOpacity={0.16}
        />
        <motion.path
          d={`M ${abx0} ${mgBase - mgScale} L ${abx1} ${mgBase}`}
          fill="none"
          stroke={BLUE}
          strokeWidth={2.3}
          initial={false}
          animate={{ pathLength: draw }}
          transition={{ duration: 0.15, ease: 'linear' }}
        />
        <text x={abx0 + 4} y={mgBase - mgScale - 6} fontSize={8.5} fontWeight={700} fill={BLUE}>
          {f2(derived.mg)}
        </text>
        <text x={abx1 - 4} y={mgBase - 6} textAnchor="end" fontSize={8.5} fill={BLUE}>
          0
        </text>
        <rect
          x={abx0}
          y={msBase - (derived.ms / derived.mg) * mgScale}
          width={abx1 - abx0}
          height={(derived.ms / derived.mg) * mgScale}
          fill={VIOLET}
          fillOpacity={0.16}
          stroke={VIOLET}
          strokeWidth={2}
        />
        <text
          x={(abx0 + abx1) / 2}
          y={msBase - (derived.ms / derived.mg) * mgScale - 6}
          textAnchor="middle"
          fontSize={8.5}
          fontWeight={700}
          fill={VIOLET}
        >
          {f2(derived.ms)}
        </text>
        <text x={abx0 - 4} y={mgBase + 14} fontSize={8} fill={MUTED}>
          A
        </text>
        <text x={abx1 + 4} y={mgBase + 14} fontSize={8} fill={MUTED}>
          B
        </text>
        <text x={bcx0 - 4} y={mgBase + 14} fontSize={8} fill={MUTED}>
          B
        </text>
        <text x={bcx1 + 2} y={mgBase + 14} fontSize={8} fill={MUTED}>
          C
        </text>
        <text x={(bcx0 + bcx1) / 2} y={mgBase - 46} textAnchor="middle" fontSize={8.5} fontWeight={700} fill={BLUE}>
          M_g na BC
        </text>
        <line x1={bcx0 - 6} y1={mgBase} x2={bcx1 + 6} y2={mgBase} stroke="#c9d0d9" strokeWidth={1} />
        <polygon
          points={`${bcx0},${mgBase} ${bcx0},${mgBase - (derived.ms / derived.mg) * mgScale} ${bcx1},${mgBase}`}
          fill={BLUE}
          fillOpacity={0.16}
        />
        <motion.path
          d={`M ${bcx0} ${mgBase - (derived.ms / derived.mg) * mgScale} L ${bcx1} ${mgBase}`}
          fill="none"
          stroke={BLUE}
          strokeWidth={2.3}
          initial={false}
          animate={{ pathLength: draw }}
          transition={{ duration: 0.15, ease: 'linear' }}
        />
        <text
          x={bcx0 + 4}
          y={mgBase - (derived.ms / derived.mg) * mgScale - 6}
          fontSize={8.5}
          fontWeight={700}
          fill={BLUE}
        >
          {f2(derived.ms)}
        </text>
        <text x={bcx1 - 4} y={mgBase - 6} textAnchor="end" fontSize={8.5} fill={BLUE}>
          0
        </text>
        <text x={32} y={286} fontSize={8.5} fill={MUTED}>
          {`Na AB: M_g = P·b = ${f2(derived.mg)} kN·m, M_s = P·a = ${f2(derived.ms)} kN·m.`}
        </text>
        <text x={32} y={304} fontSize={8.5} fill={MUTED}>
          {`Na BC: M_s = 0, a M_g maleje od ${f2(derived.ms)} kN·m do zera.`}
        </text>
      </g>
    )
  }

  function HmhScene({ p }: { p: number }) {
    const draw = smooth(p)
    const originX = 84
    const originY = 238
    const mgLen = 118
    const msLen = Math.sqrt(0.75) * (derived.ms / derived.mg) * mgLen
    return (
      <g>
        <Header
          title="MOMENT ZASTĘPCZY WEDŁUG HMH"
          note="hipoteza maksymalnego naprężenia stycznego łączy zginanie i skręcanie"
        />
        <motion.g initial={false} animate={{ opacity: draw }}>
          <line
            x1={originX}
            y1={originY}
            x2={originX + mgLen}
            y2={originY}
            stroke={BLUE}
            strokeWidth={2.2}
            markerEnd="url(#w5bth-vector)"
          />
          <line
            x1={originX}
            y1={originY}
            x2={originX}
            y2={originY - msLen}
            stroke={VIOLET}
            strokeWidth={2.2}
            markerEnd="url(#w5bth-moment)"
          />
          <line
            x1={originX + mgLen}
            y1={originY}
            x2={originX + mgLen}
            y2={originY - msLen}
            stroke={MUTED}
            strokeWidth={1}
            strokeDasharray="4 3"
          />
          <line
            x1={originX}
            y1={originY - msLen}
            x2={originX + mgLen}
            y2={originY - msLen}
            stroke={MUTED}
            strokeWidth={1}
            strokeDasharray="4 3"
          />
          <line
            x1={originX}
            y1={originY}
            x2={originX + mgLen}
            y2={originY - msLen}
            stroke={GREEN}
            strokeWidth={2.6}
            markerEnd="url(#w5bth-result)"
          />
          <text
            x={originX + mgLen / 2}
            y={originY + 16}
            textAnchor="middle"
            fontSize={8.5}
            fontWeight={700}
            fill={BLUE}
          >
            {`M_g = ${f2(derived.mg)}`}
          </text>
          <text x={originX - 6} y={originY - msLen / 2} textAnchor="end" fontSize={8.5} fontWeight={700} fill={VIOLET}>
            {f3(Math.sqrt(0.75) * (derived.ms / derived.mg))}
          </text>
          <text
            x={originX + mgLen - 4}
            y={originY - msLen - 8}
            textAnchor="end"
            fontSize={9}
            fontWeight={700}
            fill={GREEN}
          >
            {`M_eq = ${f4(derived.meq)}`}
          </text>
        </motion.g>
        <motion.g initial={false} animate={{ opacity: smooth(ramp(p, 0.25, 0.7)) }}>
          <text x={250} y={92} fontSize={8.5} fill={INK}>
            M_eq = √(M_g² + 0,75·M_s²)
          </text>
          <text x={250} y={114} fontSize={8.5} fill={MUTED}>
            {`= √(${f2(derived.mg)}² + 0,75·${f2(derived.ms)}²)`}
          </text>
          <text x={250} y={136} fontSize={8.5} fill={MUTED}>
            {`= √(${f4(derived.mg ** 2 + 0.75 * derived.ms ** 2)})`}
          </text>
          <text x={250} y={162} fontSize={9} fontWeight={700} fill={GREEN}>
            {`M_eq = ${f4(derived.meq)} kN·m`}
          </text>
          <text x={250} y={184} fontSize={8.5} fill={MUTED}>
            {`= ${plGroup(derived.meqNmm, 0)} N·mm`}
          </text>
        </motion.g>
        <text x={32} y={300} fontSize={8.5} fill={MUTED}>
          Składnik 0,75·M_s² wynika z hipotezy HMH.
        </text>
      </g>
    )
  }

  function DesignScene({ p }: { p: number }) {
    const draw = smooth(p)
    return (
      <g>
        <Header title="DOBÓR ŚREDNICY" note="moment zastępczy podstawiamy do warunku jak przy czystym zginaniu" />
        <motion.g initial={false} animate={{ opacity: draw }}>
          <circle cx={130} cy={172} r={68} fill={FILL} stroke={EDGE} strokeWidth={1.6} />
          <line x1={62} y1={172} x2={198} y2={172} stroke={MUTED} strokeWidth={1} strokeDasharray="5 4" />
          <line x1={56} y1={172} x2={68} y2={172} stroke={MUTED} strokeWidth={1} />
          <line x1={192} y1={172} x2={204} y2={172} stroke={MUTED} strokeWidth={1} />
          <text x={130} y={94} textAnchor="middle" fontSize={9} fontWeight={700} fill={BLUE}>
            {`d = ${f0(inputs.d)} mm`}
          </text>
          <text x={130} y={254} textAnchor="middle" fontSize={8.5} fill={MUTED}>
            przekrój pełny kołowy
          </text>
        </motion.g>
        <motion.g initial={false} animate={{ opacity: smooth(ramp(p, 0.2, 0.65)) }}>
          <text x={228} y={92} fontSize={8.5} fill={INK}>
            d ≥ ∛(32·M_eq / (π·k_g))
          </text>
          <text x={228} y={114} fontSize={8.5} fill={MUTED}>
            {`= ∛(32·${plGroup(derived.meqNmm, 0)} / (π·${f0(inputs.kg)}))`}
          </text>
          <text x={228} y={136} fontSize={8.5} fill={MUTED}>
            {`= ∛(${inputs.underRadical})`}
          </text>
          <text x={228} y={162} fontSize={9} fontWeight={700} fill={GREEN}>
            {`d_min = ${f2(derived.dMin)} mm`}
          </text>
          <text x={228} y={190} fontSize={10} fontWeight={700} fill={BLUE}>
            {`przyjmujemy d = ${f0(inputs.d)} mm`}
          </text>
        </motion.g>
        <motion.g initial={false} animate={{ opacity: smooth(ramp(p, 0.55, 0.85)) }}>
          <line x1={70} y1={288} x2={392} y2={288} stroke="#d7dde5" strokeWidth={1.2} />
          {[30, 35, 40, 45, 50].map((value) => {
            const x = 70 + ((value - 30) / 20) * 322
            return (
              <g key={`d-scale-${value}`}>
                <line x1={x} y1={284} x2={x} y2={292} stroke={MUTED} strokeWidth={1} />
                <text x={x} y={302} textAnchor="middle" fontSize={8} fill={MUTED}>
                  {value}
                </text>
              </g>
            )
          })}
          <circle cx={70 + ((derived.dMin - 30) / 20) * 322} cy={288} r={3.4} fill={GREEN} />
          <circle cx={70 + ((inputs.d - 30) / 20) * 322} cy={288} r={3.4} fill={BLUE} />
          <text x={70 + ((derived.dMin - 30) / 20) * 322 - 4} y={278} textAnchor="end" fontSize={8} fill={GREEN}>
            {f2(derived.dMin)}
          </text>
        </motion.g>
      </g>
    )
  }

  function StressScene({ p }: { p: number }) {
    const draw = smooth(p)
    const ratio = derived.hmhRatio
    return (
      <g>
        <Header
          title={`SPRAWDZENIE NAPRĘŻEŃ PRZY d = ${f0(inputs.d)} mm`}
          note="osobno naprężenie normalne, styczne i zastępcze według HMH"
        />
        <motion.g initial={false} animate={{ opacity: draw }}>
          <circle cx={120} cy={160} r={60} fill={FILL} stroke={EDGE} strokeWidth={1.6} />
          <line x1={60} y1={160} x2={180} y2={160} stroke={MUTED} strokeWidth={1} strokeDasharray="5 4" />
          <text x={120} y={88} textAnchor="middle" fontSize={9} fontWeight={700} fill={BLUE}>
            {`d = ${f0(inputs.d)} mm`}
          </text>
          <text x={120} y={236} textAnchor="middle" fontSize={8.5} fill={MUTED}>
            σ i τ w skrajnym włóknie
          </text>
        </motion.g>
        <motion.g initial={false} animate={{ opacity: smooth(ramp(p, 0.15, 0.6)) }}>
          <text x={208} y={92} fontSize={8.5} fill={INK}>
            {`σ = 32·M_g / (πd³) = ${f2(derived.sigma)} MPa`}
          </text>
          <text x={208} y={116} fontSize={8.5} fill={INK}>
            {`τ = 16·M_s / (πd³) = ${f2(derived.tau)} MPa`}
          </text>
          <text x={208} y={144} fontSize={8.5} fill={GREEN}>
            σ_HMH = √(σ² + 3τ²)
          </text>
          <text x={208} y={166} fontSize={8.5} fill={MUTED}>
            {`= √(${f2(derived.sigma)}² + 3·${f2(derived.tau)}²)`}
          </text>
          <text x={208} y={192} fontSize={9.5} fontWeight={700} fill={GREEN}>
            {`σ_HMH = ${derived.sigmaHmhText} MPa`}
          </text>
          <text x={208} y={214} fontSize={8.5} fill={GREEN}>
            {`${derived.sigmaHmhText} MPa < ${f0(inputs.kg)} MPa`}
          </text>
        </motion.g>
        <rect x={208} y={238} width={190} height={14} rx={7} fill="#edf1f5" />
        <motion.rect
          x={208}
          y={238}
          height={14}
          rx={7}
          fill={GREEN}
          fillOpacity={0.35}
          stroke={GREEN}
          strokeWidth={1.1}
          initial={false}
          animate={{ width: 190 * ratio * draw }}
          transition={{ duration: 0.15, ease: 'linear' }}
        />
        <line x1={208 + 190} y1={232} x2={208 + 190} y2={258} stroke={LOAD} strokeWidth={1.2} strokeDasharray="4 3" />
        <text x={208} y={270} fontSize={8} fill={MUTED}>
          0 MPa
        </text>
        <text x={208 + 190} y={270} textAnchor="end" fontSize={8} fill={LOAD}>
          {`k_g = ${f0(inputs.kg)} MPa`}
        </text>
        <text x={32} y={300} fontSize={8.5} fill={MUTED}>
          {`Przy d = ${f2(derived.dMin)} mm naprężenie zastępcze byłoby równe ${f0(inputs.kg)} MPa.`}
        </text>
      </g>
    )
  }

  function CheckScene({ p }: { p: number }) {
    const draw = smooth(p)
    return (
      <g>
        <Header
          title="KONTROLA KOŃCOWA"
          note={`średnica ${f0(inputs.d)} mm spełnia warunek HMH z zapasem ${derived.marginText}%`}
        />
        <motion.g initial={false} animate={{ opacity: draw }}>
          <rect x={36} y={58} width={388} height={238} rx={10} fill="#f5faf7" stroke={GREEN} strokeWidth={1.2} />
          <text x={56} y={84} fontSize={9.5} fontWeight={700} fill={INK}>
            zestawienie wyników
          </text>
          <text x={56} y={112} fontSize={8.5} fill={MUTED}>
            {`M_g = ${f2(derived.mg)} kN·m · M_s = ${f2(derived.ms)} kN·m`}
          </text>
          <text x={56} y={134} fontSize={8.5} fill={MUTED}>
            {`M_eq = ${f4(derived.meq)} kN·m`}
          </text>
          <text x={56} y={156} fontSize={8.5} fill={MUTED}>
            {`d_min = ${f2(derived.dMin)} mm → d = ${f0(inputs.d)} mm`}
          </text>
          <text x={56} y={178} fontSize={8.5} fill={MUTED}>
            {`σ = ${f2(derived.sigma)} MPa · τ = ${f2(derived.tau)} MPa`}
          </text>
          <text x={56} y={204} fontSize={9} fontWeight={700} fill={GREEN}>
            {`σ_HMH = ${derived.sigmaHmhText} MPa < k_g = ${f0(inputs.kg)} MPa`}
          </text>
          <text x={56} y={230} fontSize={8.5} fill={MUTED}>
            {`Zapas: (${f0(inputs.kg)} − ${derived.sigmaHmhText}) / ${f0(inputs.kg)} ≈ ${derived.marginText}%`}
          </text>
          <text x={56} y={256} fontSize={8.5} fill={MUTED}>
            Jednostki: N·mm / mm³ = N/mm² = MPa
          </text>
          <text x={56} y={280} fontSize={9.5} fontWeight={700} fill={GREEN}>
            Warunek HMH jest spełniony
          </text>
        </motion.g>
        <text x={32} y={318} fontSize={8.5} fill={MUTED}>
          Przekrój krytyczny to utwierdzenie A.
        </text>
      </g>
    )
  }

  return function BendingTorsionHmhAnimation(props: SolutionAnimationProps) {
    const { scene, index, playing, sceneProgress } = props
    const metric = scene.focus?.metric ?? 'model'
    const p = playing ? smooth(sceneProgress) : 1

    if (metric === 'model' || metric === 'transfer' || metric === 'critical') {
      return <PipeThree {...props} />
    }

    const content =
      metric === 'plan' ? (
        <PlanScene p={p} />
      ) : metric === 'diagrams' ? (
        <DiagramsScene p={p} />
      ) : metric === 'hmh' ? (
        <HmhScene p={p} />
      ) : metric === 'design' ? (
        <DesignScene p={p} />
      ) : metric === 'stress' ? (
        <StressScene p={p} />
      ) : (
        <CheckScene p={p} />
      )

    return (
      <div className={local('figure')}>
        <div className={local('figure-canvas')}>
          <svg
            viewBox="0 0 460 340"
            role="img"
            aria-label="Rura L zginana i skręcana: przeniesienie siły, wykresy momentów, moment zastępczy HMH, dobór średnicy i sprawdzenie naprężeń."
          >
            <defs>
              <marker
                id="w5bth-moment"
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
                id="w5bth-vector"
                viewBox="0 0 10 10"
                refX={8}
                refY={5}
                markerWidth={5}
                markerHeight={5}
                orient="auto"
              >
                <path d="M0 0 L10 5 L0 10 Z" fill={BLUE} />
              </marker>
              <marker
                id="w5bth-result"
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
}

export const BendingTorsionExampleAnimation = createBendingTorsionAnimation(exampleBendingTorsionInputs)
