import { motion } from 'motion/react'
import type { ComponentType } from 'react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'
import {
  ThreeSolutionScene,
  type ThreeLabel,
  type ThreePrimitive,
} from '../../../components/solution-figures/ThreeSolutionScene'
import {
  THREE_COLORS,
  ThreeStatus,
  axisLabels,
  axisSystem,
  v,
} from '../../../components/solution-figures/three-statics'
import {
  deriveConfinedCompression,
  exampleConfinedCompressionInputs,
  pl,
  plGroup,
  scientific,
  type ConfinedCompressionInputs,
} from './factory'

const BLUE = '#4f6df5'
const ORANGE = '#ff6b45'
const GREEN = '#2f7d5b'
const INK = '#17202a'
const MUTED = '#87929d'
const EDGE = '#7d8fa5'

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}
const ramp = (value: number, from: number, to: number) => smooth(clamp01((value - from) / (to - from)))

const O = v(0, 0, 0)
const AXIS_ORIGIN = v(-2.6, -2.0, -0.4)

const primitives: ThreePrimitive[] = [
  { kind: 'box', at: O, size: [4, 3, 0.5], color: '#dbe7f6', opacity: 0.96 },
  { kind: 'box', at: v(0, 0, 0.31), size: [5.2, 4.2, 0.12], color: '#c6d2e0', opacity: 0.28, visibleAt: 0, hideAt: 5 },
  { kind: 'box', at: v(0, 0, -0.31), size: [5.2, 4.2, 0.12], color: '#c6d2e0', opacity: 0.28, visibleAt: 0, hideAt: 5 },
  ...axisSystem(AXIS_ORIGIN, [1.1, 1.1, 1.1], 1),
  { kind: 'arrow', from: v(3.05, 0, 0), to: v(2.02, 0, 0), color: THREE_COLORS.load, radius: 0.055, pulse: true },
  { kind: 'arrow', from: v(-3.05, 0, 0), to: v(-2.02, 0, 0), color: THREE_COLORS.load, radius: 0.055, pulse: true },
  { kind: 'arrow', from: v(0, 2.4, 0), to: v(0, 1.52, 0), color: THREE_COLORS.load, radius: 0.055, pulse: true },
  { kind: 'arrow', from: v(0, -2.4, 0), to: v(0, -1.52, 0), color: THREE_COLORS.load, radius: 0.055, pulse: true },
  {
    kind: 'plate',
    points: [v(2.02, -1.5, -0.25), v(2.02, 1.5, -0.25), v(2.02, 1.5, 0.25), v(2.02, -1.5, 0.25)],
    color: THREE_COLORS.load,
    opacity: 0.22,
    visibleAt: 2,
  },
  {
    kind: 'plate',
    points: [v(-2, 1.52, -0.25), v(2, 1.52, -0.25), v(2, 1.52, 0.25), v(-2, 1.52, 0.25)],
    color: THREE_COLORS.load,
    opacity: 0.22,
    visibleAt: 3,
  },
  {
    kind: 'plate',
    points: [v(-2.02, -1.5, -0.25), v(-2.02, 1.5, -0.25), v(-2.02, 1.5, 0.25), v(-2.02, -1.5, 0.25)],
    color: THREE_COLORS.load,
    opacity: 0.22,
    visibleAt: 2,
  },
  {
    kind: 'plate',
    points: [v(-2, -1.52, -0.25), v(2, -1.52, -0.25), v(2, -1.52, 0.25), v(-2, -1.52, 0.25)],
    color: THREE_COLORS.load,
    opacity: 0.22,
    visibleAt: 3,
  },
  {
    kind: 'arrow',
    from: v(2.5, 0.85, 0.15),
    to: v(2.03, 0.85, 0.15),
    color: BLUE,
    radius: 0.026,
    visibleAt: 2,
    hideAt: 3,
  },
  {
    kind: 'arrow',
    from: v(2.5, -0.85, 0.15),
    to: v(2.03, -0.85, 0.15),
    color: BLUE,
    radius: 0.026,
    visibleAt: 2,
    hideAt: 3,
  },
  {
    kind: 'arrow',
    from: v(1.2, 1.95, 0.15),
    to: v(1.2, 1.53, 0.15),
    color: GREEN,
    radius: 0.026,
    visibleAt: 3,
    hideAt: 4,
  },
  {
    kind: 'arrow',
    from: v(-1.2, 1.95, 0.15),
    to: v(-1.2, 1.53, 0.15),
    color: GREEN,
    radius: 0.026,
    visibleAt: 3,
    hideAt: 4,
  },
  {
    kind: 'line',
    points: [v(1.7, 1.35, -0.5), v(1.7, 1.35, 0.5)],
    dashed: true,
    color: THREE_COLORS.ok,
    visibleAt: 4,
    hideAt: 5,
  },
  {
    kind: 'line',
    points: [v(1.7, -1.35, -0.5), v(1.7, -1.35, 0.5)],
    dashed: true,
    color: THREE_COLORS.ok,
    visibleAt: 4,
    hideAt: 5,
  },
  {
    kind: 'arrow',
    from: v(0, 0, 0.62),
    to: v(0, 0, 0.28),
    color: THREE_COLORS.ok,
    radius: 0.04,
    pulse: true,
    visibleAt: 5,
    hideAt: 6,
  },
  {
    kind: 'arrow',
    from: v(0, 0, -0.62),
    to: v(0, 0, -0.28),
    color: THREE_COLORS.ok,
    radius: 0.04,
    pulse: true,
    visibleAt: 5,
    hideAt: 6,
  },
]

type ConfinedLabels = ThreeLabel[]

function buildLabels(
  inputs: ConfinedCompressionInputs,
  d: ReturnType<typeof deriveConfinedCompression>,
): ConfinedLabels {
  const f0 = (value: number) => pl(value, 0)
  const f2 = (value: number) => pl(value, 2)
  return [
    ...axisLabels(AXIS_ORIGIN, [1.1, 1.1, 1.1], 1),
    {
      id: 'a',
      text: `a = ${f0(inputs.a)} mm`,
      at: v(0, -1.5, 0.25),
      offset: [0, 38],
      anchor: 'middle',
      size: 9,
      color: THREE_COLORS.ink,
    },
    {
      id: 'b',
      text: `b = ${f0(inputs.b)} mm`,
      at: v(-2, 0.75, 0.25),
      offset: [-16, -18],
      anchor: 'end',
      size: 9,
      color: THREE_COLORS.ink,
    },
    {
      id: 'g',
      text: `g = ${f0(inputs.g)} mm`,
      at: v(-2, 1.5, 0.25),
      offset: [8, -12],
      size: 9,
      color: THREE_COLORS.ink,
    },
    {
      id: 'px',
      text: `P = ${f0(inputs.p)} kN`,
      at: v(3.05, 0, 0),
      offset: [8, 6],
      size: 10,
      color: THREE_COLORS.load,
    },
    {
      id: 'py',
      text: `P = ${f0(inputs.p)} kN`,
      at: v(0, 2.4, 0),
      offset: [8, -6],
      size: 10,
      color: THREE_COLORS.load,
    },
    {
      id: 'sx',
      text: `σ_x = ${f2(d.sigmaX)} MPa`,
      at: v(2.02, 0.85, 0.15),
      offset: [10, 12],
      size: 9,
      color: BLUE,
      visibleAt: 2,
      hideAt: 3,
    },
    {
      id: 'sy',
      text: `σ_y = ${f2(d.sigmaY)} MPa`,
      at: v(1.2, 1.53, 0.15),
      offset: [10, 14],
      size: 9,
      color: GREEN,
      visibleAt: 3,
      hideAt: 4,
    },
    {
      id: 'wall',
      text: 'ściana sztywna',
      at: v(-2.7, 2.2, 0.31),
      offset: [8, -4],
      size: 9,
      color: THREE_COLORS.muted,
      visibleAt: 0,
      hideAt: 5,
    },
    {
      id: 'constraint',
      text: 'ε_z = 0',
      at: v(1.7, 1.35, 0.1),
      offset: [-6, 18],
      anchor: 'end',
      size: 10,
      color: THREE_COLORS.ok,
      visibleAt: 4,
      hideAt: 5,
    },
    {
      id: 'sz',
      text: `σ_z = ${f2(d.sigmaZ)} MPa`,
      at: v(0, 0, 0.28),
      offset: [10, 10],
      size: 10,
      color: THREE_COLORS.ok,
      visibleAt: 5,
      hideAt: 6,
    },
  ]
}

type MatrixProps = {
  x: number
  top: number
  values: string[][]
  columnWidth?: number
  rowHeight?: number
  fontSize?: number
  color?: (row: number, column: number) => string
  weight?: (row: number, column: number) => number
  opacity?: (row: number, column: number) => number
}

function Matrix({
  x,
  top,
  values,
  columnWidth = 60,
  rowHeight = 30,
  fontSize = 12,
  color = () => INK,
  weight = () => 700,
  opacity = () => 1,
}: MatrixProps) {
  const rows = values.length
  const bracketTop = top - 13
  const bracketBottom = top + rowHeight * (rows - 1) + 7
  const left = x - 9
  const right = x + columnWidth * 3 + 2
  return (
    <g>
      <path
        d={`M ${left + 8} ${bracketTop} L ${left} ${bracketTop} L ${left} ${bracketBottom} L ${left + 8} ${bracketBottom}`}
        fill="none"
        stroke={EDGE}
        strokeWidth={1.3}
        strokeLinecap="round"
      />
      <path
        d={`M ${right - 8} ${bracketTop} L ${right} ${bracketTop} L ${right} ${bracketBottom} L ${right - 8} ${bracketBottom}`}
        fill="none"
        stroke={EDGE}
        strokeWidth={1.3}
        strokeLinecap="round"
      />
      {values.map((row, rowIndex) =>
        row.map((value, columnIndex) => (
          <motion.text
            key={`${rowIndex}-${columnIndex}`}
            x={x + columnWidth * (columnIndex + 0.5)}
            y={top + rowHeight * rowIndex}
            textAnchor="middle"
            fontSize={fontSize}
            fontWeight={weight(rowIndex, columnIndex)}
            fill={color(rowIndex, columnIndex)}
            initial={false}
            animate={{ opacity: opacity(rowIndex, columnIndex) }}
          >
            {value}
          </motion.text>
        )),
      )}
    </g>
  )
}

export function createConfinedCompressionAnimation(
  inputs: ConfinedCompressionInputs,
): ComponentType<SolutionAnimationProps> {
  const derived = deriveConfinedCompression(inputs)
  const f0 = (value: number) => pl(value, 0)
  const f2 = (value: number) => pl(value, 2)
  const labels = buildLabels(inputs, derived)
  const stressMatrix = [
    [f2(derived.sigmaX), '0', '0'],
    ['0', f2(derived.sigmaY), '0'],
    ['0', '0', f2(derived.sigmaZ)],
  ]
  const status = [
    'Prostopadłościan między dwiema sztywnymi ścianami',
    `a = ${f0(inputs.a)} mm (x), b = ${f0(inputs.b)} mm (y), g = ${f0(inputs.g)} mm (z)`,
    `A_x = b·g = ${plGroup(derived.areaX)} mm² → σ_x = ${f2(derived.sigmaX)} MPa`,
    `A_y = a·g = ${plGroup(derived.areaY)} mm² → σ_y = ${f2(derived.sigmaY)} MPa`,
    'Ściany blokują zmianę grubości: ε_z = 0',
    `σ_z = ν(σ_x + σ_y) = ${f2(derived.sigmaZ)} MPa (ściskanie)`,
  ]

  function TensorScene({ p }: { p: number }) {
    const entry = (row: number, column: number) =>
      ramp(p, 0.08 + (row * 3 + column) * 0.04, 0.28 + (row * 3 + column) * 0.04)
    return (
      <>
        <text x={230} y={40} textAnchor="middle" fontSize={11} fontWeight={700} fill={INK}>
          Tensor naprężenia σ_ij [MPa]
        </text>
        <Matrix
          x={150}
          top={112}
          values={stressMatrix}
          opacity={entry}
          color={(row, column) => (row === column ? ORANGE : MUTED)}
        />
        <text x={230} y={226} textAnchor="middle" fontSize={10} fontWeight={700} fill={ORANGE}>
          σ_x, σ_y, σ_z &lt; 0 — wszystkie składowe są ściskające
        </text>
        <text x={230} y={254} textAnchor="middle" fontSize={9} fill={MUTED}>
          Poza przekątną: brak naprężeń stycznych.
        </text>
        <text x={230} y={296} textAnchor="middle" fontSize={9.5} fill={INK}>
          Umowa: rozciąganie dodatnie, ściskanie ujemne.
        </text>
      </>
    )
  }

  function CheckScene({ p }: { p: number }) {
    return (
      <>
        <text x={230} y={32} textAnchor="middle" fontSize={11} fontWeight={700} fill={INK}>
          Kontrola ε_z i interpretacja znaków
        </text>
        <text x={40} y={82} fontSize={9} fontWeight={700} fill={INK}>
          σ_ij [MPa]
        </text>
        <Matrix
          x={40}
          top={106}
          values={stressMatrix}
          columnWidth={42}
          rowHeight={24}
          fontSize={8.8}
          color={(row, column) => (row === column ? ORANGE : MUTED)}
        />
        <motion.g initial={false} animate={{ opacity: ramp(p, 0.1, 0.42) }}>
          <text x={186} y={82} fontSize={9} fontWeight={700} fill={MUTED}>
            KONTROLA ε_z
          </text>
          <text x={186} y={110} fontSize={9} fill={INK}>
            ε_z = [σ_z − ν(σ_x + σ_y)] / E
          </text>
          <text x={186} y={136} fontSize={9} fill={INK}>
            {`= [${f2(derived.sigmaZ)} − ${f2(inputs.nu)}·(${f2(derived.sigmaX + derived.sigmaY)})] / E`}
          </text>
          <text x={186} y={162} fontSize={9} fill={INK}>
            {`= [${f2(derived.sigmaZ)} + ${f2(-inputs.nu * (derived.sigmaX + derived.sigmaY))}] / E = 0 ✓`}
          </text>
        </motion.g>
        <motion.g initial={false} animate={{ opacity: ramp(p, 0.48, 0.82) }}>
          <text x={186} y={198} fontSize={9} fontWeight={700} fill={MUTED}>
            INTERPRETACJA ZNAKÓW
          </text>
          <text x={186} y={224} fontSize={9} fill={INK}>
            σ_x, σ_y, σ_z &lt; 0 → element jest ściskany
          </text>
          <text x={186} y={250} fontSize={9} fill={INK}>
            σ_z to reakcja ścian, nie obciążenie P
          </text>
          <text x={186} y={284} fontSize={10} fontWeight={700} fill={GREEN}>
            {`σ_z = ${f2(derived.sigmaZ)} MPa, nie +${f2(-derived.sigmaZ)}`}
          </text>
        </motion.g>
        <text x={230} y={318} textAnchor="middle" fontSize={9} fill={MUTED}>
          Jedna umowa znaków obowiązuje w całym zadaniu.
        </text>
      </>
    )
  }

  function StrainScene({ p }: { p: number }) {
    const eGrouped = plGroup(inputs.e)
    return (
      <>
        <text x={230} y={32} textAnchor="middle" fontSize={11} fontWeight={700} fill={INK}>
          Odkształcenia przy E = {plGroup(inputs.e / 1000)} GPa
        </text>
        <motion.g initial={false} animate={{ opacity: ramp(p, 0.1, 0.42) }}>
          <text x={40} y={82} fontSize={9} fontWeight={700} fill={MUTED}>
            OŚ X
          </text>
          <text x={40} y={110} fontSize={9.5} fill={INK}>
            {`ε_x = [${f2(derived.sigmaX)} − ${f2(inputs.nu)}·(${f2(derived.sigmaY)} − ${f2(-derived.sigmaZ)})] / ${eGrouped}`}
          </text>
          <text x={40} y={138} fontSize={9.5} fill={INK}>
            {`ε_x = (${f2(derived.sigmaX)} + ${f2(-inputs.nu * (derived.sigmaY + derived.sigmaZ))}) / ${eGrouped} = ${scientific(derived.epsX)}`}
          </text>
        </motion.g>
        <motion.g initial={false} animate={{ opacity: ramp(p, 0.46, 0.78) }}>
          <text x={40} y={178} fontSize={9} fontWeight={700} fill={MUTED}>
            OŚ Y
          </text>
          <text x={40} y={206} fontSize={9.5} fill={INK}>
            {`ε_y = [${f2(derived.sigmaY)} − ${f2(inputs.nu)}·(${f2(derived.sigmaX)} − ${f2(-derived.sigmaZ)})] / ${eGrouped}`}
          </text>
          <text x={40} y={234} fontSize={9.5} fill={INK}>
            {`ε_y = (${f2(derived.sigmaY)} + ${f2(-inputs.nu * (derived.sigmaX + derived.sigmaZ))}) / ${eGrouped} = ${scientific(derived.epsY)}`}
          </text>
        </motion.g>
        <text x={40} y={268} fontSize={9.5} fill={GREEN}>
          ε_z = 0 — ściany blokują zmianę wymiaru a.
        </text>
        <text x={40} y={292} fontSize={9} fill={MUTED}>
          E = {plGroup(inputs.e / 1000)} GPa przyjęto jako typowe dla stali.
        </text>
        <text x={40} y={316} fontSize={9} fill={INK}>
          ε_x, ε_y &lt; 0 — ściskanie w obu kierunkach.
        </text>
      </>
    )
  }

  const SVG_LABEL = 'Prostopadłościan między sztywnymi ścianami: stan naprężenia i odkształcenia'

  function SvgScene({ metric, p }: { metric: string; p: number }) {
    return (
      <div className={local('figure')}>
        <div className={local('figure-canvas')}>
          <svg viewBox="0 0 460 340" role="img" aria-label={SVG_LABEL}>
            {metric === 'check' ? (
              <CheckScene p={p} />
            ) : metric === 'strain' ? (
              <StrainScene p={p} />
            ) : (
              <TensorScene p={p} />
            )}
          </svg>
        </div>
      </div>
    )
  }

  const THREE_METRICS = new Set(['model', 'data', 'sx', 'sy', 'constraint', 'sz'])

  return function ConfinedCuboidAnimation({ scene, index, playing, sceneProgress }: SolutionAnimationProps) {
    const metric = scene.focus?.metric ?? 'model'
    const p = playing ? sceneProgress : 1

    if (THREE_METRICS.has(metric)) {
      const active = Math.min(status.length - 1, Math.max(0, index))
      return (
        <ThreeSolutionScene
          label="Prostopadłościan między sztywnymi ścianami z dwiema siłami ściskającymi"
          primitives={primitives}
          labels={labels}
          camera={{ position: [7, -8, 6], target: [0, 0, 0], viewSize: 6.2 }}
          index={index}
          playing={playing}
          sceneProgress={sceneProgress}
        >
          <ThreeStatus>{status[active]}</ThreeStatus>
        </ThreeSolutionScene>
      )
    }

    return <SvgScene metric={metric} p={p} />
  }
}

export const ConfinedCompressionExampleAnimation = createConfinedCompressionAnimation(exampleConfinedCompressionInputs)
