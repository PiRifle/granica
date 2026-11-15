import { motion } from 'motion/react'
import type { ComponentType } from 'react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'
import { deriveHollowTube, pl, type HollowTubeInputs } from './factory'

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}
const ramp = (value: number, from: number, to: number) => clamp01((value - from) / (to - from))

const ACCENT = '#4f6df5'
const LOAD = '#ff6b45'
const OK = '#2f7d5b'
const LIMIT = '#a970dd'
const MUTED = '#87929d'
const INK = '#17202a'
const EDGE = '#7d8fa5'
const HOLE = '#eef3fa'

export function createHollowTubeAnimation(inputs: HollowTubeInputs): ComponentType<SolutionAnimationProps> {
  const derived = deriveHollowTube(inputs)
  const forceLabel = `P = ${pl(inputs.p, 0)} kN`
  const forceFullLabel = `P = ${pl(inputs.p, 0)} kN = ${pl(derived.force, 0)} N`
  const dLabel = `d = ${pl(inputs.d, 0)} mm`
  const dopLabel = `σ_dop = ${pl(inputs.sigmaDop, 0)} MPa = ${pl(inputs.sigmaDop, 0)} N/mm²`

  function ForceArrow({
    x1,
    x2,
    y,
    amount,
    label,
    labelY,
    color = LOAD,
  }: {
    x1: number
    x2: number
    y: number
    amount: number
    label: string
    labelY: number
    color?: string
  }) {
    const dir = x2 > x1 ? 1 : -1
    const head = 9
    const base = x2 - dir * head
    return (
      <motion.g initial={false} animate={{ opacity: amount }}>
        <motion.line
          x1={x1}
          y1={y}
          x2={x2}
          y2={y}
          stroke={color}
          strokeWidth={2.6}
          strokeLinecap="round"
          initial={false}
          animate={{ pathLength: clamp01(amount) }}
        />
        <motion.polygon
          points={`${x2},${y} ${base},${y - 4.5} ${base},${y + 4.5}`}
          fill={color}
          initial={false}
          animate={{ opacity: amount > 0.4 ? 1 : 0 }}
        />
        <text x={(x1 + x2) / 2} y={labelY} textAnchor="middle" fontSize={9.5} fontWeight={700} fill={color}>
          {label}
        </text>
      </motion.g>
    )
  }

  function Tube({
    reveal,
    cx = 200,
    cy = 158,
    ro = 82,
    ri = 68,
    dLabelText = `d = ${pl(inputs.d, 0)} mm`,
    DLabel = 'D = ?',
    showLoads = false,
    showDims = true,
  }: {
    reveal: number
    cx?: number
    cy?: number
    ro?: number
    ri?: number
    dLabelText?: string
    DLabel?: string
    showLoads?: boolean
    showDims?: boolean
  }) {
    const grow = smooth(ramp(reveal, 0, 0.55))
    const shownOuter = Math.max(2, ro * grow)
    const shownInner = Math.max(1, ri * grow)
    const labels = smooth(ramp(reveal, 0.3, 0.7))
    const dDimY = cy - ri - 32
    const dLabelY = dDimY - 10
    const DDimY = cy + ro + 22
    const DLabelY = DDimY + 16
    return (
      <g>
        <motion.circle
          cx={cx}
          cy={cy}
          r={shownOuter}
          fill={ACCENT}
          fillOpacity={0.14}
          stroke={ACCENT}
          strokeWidth={2}
          initial={false}
          animate={{ r: shownOuter, opacity: grow > 0.05 ? 1 : 0 }}
        />
        <motion.circle
          cx={cx}
          cy={cy}
          r={shownInner}
          fill={HOLE}
          stroke={ACCENT}
          strokeWidth={1.3}
          strokeDasharray="4 3"
          initial={false}
          animate={{ r: shownInner, opacity: grow > 0.1 ? 1 : 0 }}
        />
        {showDims && (
          <motion.g initial={false} animate={{ opacity: labels }} stroke={EDGE} fill={EDGE}>
            <line x1={cx - ri} y1={dDimY} x2={cx + ri} y2={dDimY} strokeWidth={1.1} />
            <line x1={cx - ri} y1={dDimY - 4} x2={cx - ri} y2={dDimY + 4} strokeWidth={1.1} />
            <line x1={cx + ri} y1={dDimY - 4} x2={cx + ri} y2={dDimY + 4} strokeWidth={1.1} />
            <line x1={cx - ro} y1={DDimY} x2={cx + ro} y2={DDimY} strokeWidth={1.1} />
            <line x1={cx - ro} y1={DDimY - 4} x2={cx - ro} y2={DDimY + 4} strokeWidth={1.1} />
            <line x1={cx + ro} y1={DDimY - 4} x2={cx + ro} y2={DDimY + 4} strokeWidth={1.1} />
            <text x={cx} y={dLabelY} textAnchor="middle" fontSize={9.5} fill={INK} stroke="none">
              {dLabelText}
            </text>
            <text x={cx} y={DLabelY} textAnchor="middle" fontSize={10} fontWeight={700} fill={ACCENT} stroke="none">
              {DLabel}
            </text>
          </motion.g>
        )}
        {showLoads && (
          <motion.g initial={false} animate={{ opacity: labels }}>
            <ForceArrow x1={cx - ro - 2} x2={cx - ro - 62} y={cy} amount={labels} label={forceLabel} labelY={cy - 12} />
            <ForceArrow x1={cx + ro + 2} x2={cx + ro + 62} y={cy} amount={labels} label={forceLabel} labelY={cy - 12} />
          </motion.g>
        )}
      </g>
    )
  }

  function ModelScene({ p }: { p: number }) {
    const reveal = smooth(ramp(p, 0, 0.55))
    return (
      <g>
        <Tube reveal={reveal} showLoads />
        <motion.text
          x={200}
          y={316}
          textAnchor="middle"
          fontSize={9}
          fill={MUTED}
          initial={false}
          animate={{ opacity: reveal > 0.6 ? 1 : 0 }}
        >
          rura rozciągana siłą osiową P
        </motion.text>
      </g>
    )
  }

  function DataScene({ p }: { p: number }) {
    const rows = [
      { y: 74, text: forceFullLabel, color: LOAD },
      { y: 128, text: dopLabel, color: LIMIT },
      { y: 182, text: `${dLabel} (bez zmiany jednostki)`, color: ACCENT },
    ]
    return (
      <g>
        {rows.map((row, index) => {
          const reveal = smooth(ramp(p, index * 0.16, 0.32 + index * 0.16))
          return (
            <motion.g key={row.text} initial={false} animate={{ opacity: reveal }}>
              <rect
                x={66}
                y={row.y}
                width={328}
                height={40}
                rx={8}
                fill={row.color}
                fillOpacity={0.1}
                stroke={row.color}
                strokeWidth={1.3}
              />
              <text x={230} y={row.y + 25} textAnchor="middle" fontSize={11} fontWeight={700} fill={row.color}>
                {row.text}
              </text>
            </motion.g>
          )
        })}
        <motion.g initial={false} animate={{ opacity: smooth(ramp(p, 0.55, 0.9)) }}>
          <text x={230} y={256} textAnchor="middle" fontSize={9.5} fill={MUTED}>
            1 kN = 1000 N
          </text>
          <text x={230} y={276} textAnchor="middle" fontSize={9.5} fill={MUTED}>
            1 MPa = 1 N/mm²
          </text>
        </motion.g>
      </g>
    )
  }

  function AreaScene({ p }: { p: number }) {
    const grow = smooth(ramp(p, 0, 0.4))
    const hole = smooth(ramp(p, 0.28, 0.7))
    const labels = smooth(ramp(p, 0.45, 0.9))
    return (
      <g>
        <motion.circle
          cx={116}
          cy={194}
          r={54 * grow}
          fill={ACCENT}
          fillOpacity={0.18}
          stroke={ACCENT}
          strokeWidth={1.8}
          initial={false}
          animate={{ r: 54 * grow }}
        />
        <text x={116} y={199} textAnchor="middle" fontSize={16} fontWeight={700} fill={ACCENT}>
          D
        </text>
        <motion.circle
          cx={344}
          cy={194}
          r={45 * hole}
          fill={HOLE}
          stroke={LOAD}
          strokeWidth={1.4}
          strokeDasharray="4 3"
          initial={false}
          animate={{ r: 45 * hole }}
        />
        <text x={344} y={199} textAnchor="middle" fontSize={16} fontWeight={700} fill={LOAD}>
          d
        </text>
        <text x={230} y={202} textAnchor="middle" fontSize={22} fontWeight={700} fill={MUTED}>
          −
        </text>
        <motion.g initial={false} animate={{ opacity: labels }}>
          <text x={116} y={112} textAnchor="middle" fontSize={10} fontWeight={700} fill={ACCENT}>
            A_z = πD²/4
          </text>
          <text x={344} y={112} textAnchor="middle" fontSize={10} fontWeight={700} fill={LOAD}>
            A_w = πd²/4
          </text>
          <text x={230} y={286} textAnchor="middle" fontSize={11} fontWeight={700} fill={INK}>
            A = A_z − A_w = π(D² − d²)/4
          </text>
        </motion.g>
      </g>
    )
  }

  function ConditionScene({ p }: { p: number }) {
    const areaReq = pl(derived.areaRequired, 1)
    const boxes = [
      { y: 50, text: 'σ = P/A ≤ σ_dop', color: LIMIT },
      { y: 108, text: `A ≥ P/σ_dop = ${areaReq} mm²`, color: ACCENT },
      { y: 166, text: `π(D² − d²)/4 ≥ ${areaReq} mm²`, color: ACCENT },
      { y: 224, text: `D² ≥ 4·${areaReq}/π + ${pl(inputs.d, 0)}²`, color: OK },
    ]
    return (
      <g>
        {boxes.map((box, index) => {
          const reveal = smooth(ramp(p, index * 0.14, 0.28 + index * 0.14))
          return (
            <motion.g key={box.text} initial={false} animate={{ opacity: reveal }}>
              <rect
                x={92}
                y={box.y}
                width={276}
                height={36}
                rx={7}
                fill={box.color}
                fillOpacity={0.09}
                stroke={box.color}
                strokeWidth={1.2}
              />
              <text x={230} y={box.y + 23} textAnchor="middle" fontSize={10} fontWeight={700} fill={box.color}>
                {box.text}
              </text>
              {index < boxes.length - 1 && (
                <g stroke={MUTED} fill={MUTED}>
                  <line x1={230} y1={box.y + 36} x2={230} y2={box.y + 52} strokeWidth={1.2} />
                  <polygon points={`230,${box.y + 58} 226,${box.y + 50} 234,${box.y + 50}`} stroke="none" />
                </g>
              )}
            </motion.g>
          )
        })}
      </g>
    )
  }

  function DiameterScene({ p }: { p: number }) {
    const axis = smooth(ramp(p, 0, 0.3))
    const required = smooth(ramp(p, 0.22, 0.55))
    const adopt = smooth(ramp(p, 0.5, 0.85))
    const y = 210
    const xOf = (D: number) => 70 + (D - inputs.d) * 13.2
    const ticks = [100, 105, 110, 115, 120, 125]
    return (
      <g>
        <motion.g initial={false} animate={{ opacity: axis }}>
          <line x1={70} y1={y} x2={400} y2={y} stroke={INK} strokeWidth={1.4} />
          {ticks.map((D) => (
            <g key={D} stroke={EDGE}>
              <line x1={xOf(D)} y1={y - 5} x2={xOf(D)} y2={y + 5} strokeWidth={1.1} />
              <text x={xOf(D)} y={y + 20} textAnchor="middle" fontSize={8.5} fill={MUTED} stroke="none">
                {D}
              </text>
            </g>
          ))}
          <text x={400} y={y + 42} textAnchor="end" fontSize={9} fill={MUTED}>
            D [mm]
          </text>
        </motion.g>
        <motion.g initial={false} animate={{ opacity: required }}>
          <line
            x1={xOf(derived.dRequired)}
            y1={y}
            x2={xOf(derived.dRequired)}
            y2={148}
            stroke={LOAD}
            strokeWidth={2}
            strokeDasharray="5 4"
          />
          <text x={xOf(derived.dRequired)} y={140} textAnchor="middle" fontSize={10} fontWeight={700} fill={LOAD}>
            {`D ≥ ${pl(derived.dRequired, 2)} mm`}
          </text>
          <text x={230} y={72} textAnchor="middle" fontSize={10} fill={INK}>
            {`pierwiastek daje ${pl(derived.dRequired, 2)} mm`}
          </text>
        </motion.g>
        <motion.g initial={false} animate={{ opacity: adopt }}>
          <circle cx={xOf(derived.dAdopted)} cy={y} r={4} fill={OK} />
          <line x1={xOf(derived.dAdopted)} y1={236} x2={xOf(derived.dAdopted)} y2={252} stroke={OK} strokeWidth={2.2} />
          <text x={xOf(derived.dAdopted)} y={270} textAnchor="middle" fontSize={10} fontWeight={700} fill={OK}>
            {`przyjęto D = ${pl(derived.dAdopted, 0)} mm`}
          </text>
          <text x={230} y={104} textAnchor="middle" fontSize={9.5} fill={MUTED}>
            zaokrąglenie w górę do pełnych milimetrów
          </text>
        </motion.g>
      </g>
    )
  }

  function CheckScene({ p }: { p: number }) {
    const limit = smooth(ramp(p, 0, 0.35))
    const actual = smooth(ramp(p, 0.2, 0.7))
    const note = smooth(ramp(p, 0.55, 0.9))
    const start = 110
    const maxWidth = 280
    const actualWidth = maxWidth * (derived.sigma / inputs.sigmaDop) * actual
    return (
      <g>
        <text x={230} y={48} textAnchor="middle" fontSize={10} fill={INK}>
          naprężenie rzeczywiste a naprężenie dopuszczalne
        </text>
        <motion.g initial={false} animate={{ opacity: limit }}>
          <rect x={start} y={108} width={maxWidth} height={28} rx={4} fill={LIMIT} fillOpacity={0.16} stroke={LIMIT} />
          <text x={start - 6} y={126} textAnchor="end" fontSize={9.5} fontWeight={700} fill={LIMIT}>
            σ_dop
          </text>
          <text x={start + maxWidth - 8} y={126} textAnchor="end" fontSize={9.5} fontWeight={700} fill={LIMIT}>
            {`${pl(inputs.sigmaDop, 0)} MPa`}
          </text>
        </motion.g>
        <motion.g initial={false} animate={{ opacity: actual }}>
          <rect
            x={start}
            y={170}
            width={Math.max(1, actualWidth)}
            height={28}
            rx={4}
            fill={OK}
            fillOpacity={0.22}
            stroke={OK}
          />
          <text x={start - 6} y={188} textAnchor="end" fontSize={9.5} fontWeight={700} fill={OK}>
            σ
          </text>
          <text
            x={start + Math.max(1, actualWidth) - 8}
            y={188}
            textAnchor="end"
            fontSize={9.5}
            fontWeight={700}
            fill={OK}
          >
            {`${pl(derived.sigma, 2)} MPa`}
          </text>
        </motion.g>
        <motion.g initial={false} animate={{ opacity: note }}>
          <text x={230} y={232} textAnchor="middle" fontSize={10} fontWeight={700} fill={OK}>
            {`σ = ${pl(derived.force, 0)} / ${pl(derived.area, 2)} = ${pl(derived.sigma, 2)} MPa < ${pl(inputs.sigmaDop, 0)} MPa`}
          </text>
          <text x={230} y={254} textAnchor="middle" fontSize={9.5} fill={MUTED}>
            {`zapas względem σ_dop wynosi około ${pl((1 - derived.sigma / inputs.sigmaDop) * 100, 1)}%`}
          </text>
        </motion.g>
      </g>
    )
  }

  function WallScene({ p }: { p: number }) {
    const reveal = smooth(ramp(p, 0, 0.5))
    const callout = smooth(ramp(p, 0.35, 0.75))
    const note = smooth(ramp(p, 0.55, 0.9))
    const cx = 180
    const cy = 170
    return (
      <g>
        <Tube reveal={reveal} cx={cx} cy={cy} dLabelText={dLabel} DLabel={`D = ${pl(derived.dAdopted, 0)} mm`} />
        <motion.g initial={false} animate={{ opacity: callout }}>
          <line x1={cx + 68} y1={cy} x2={cx + 82} y2={cy} stroke={OK} strokeWidth={6} strokeLinecap="round" />
          <line x1={cx + 82} y1={cy} x2={322} y2={116} stroke={OK} strokeWidth={1.4} />
          <text x={330} y={108} textAnchor="start" fontSize={10} fontWeight={700} fill={OK}>
            {`t = ${pl(derived.wall, 0)} mm`}
          </text>
          <text x={330} y={126} textAnchor="start" fontSize={9} fill={MUTED}>
            grubość ścianki
          </text>
        </motion.g>
        <motion.g initial={false} animate={{ opacity: note }}>
          <text x={cx} y={312} textAnchor="middle" fontSize={10} fontWeight={700} fill={OK}>
            {`σ = ${pl(derived.sigma, 2)} MPa < ${pl(inputs.sigmaDop, 0)} MPa`}
          </text>
        </motion.g>
      </g>
    )
  }

  return function HollowTubeAnimation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
    const metric = scene.focus?.metric ?? 'model'
    const p = playing ? clamp01(sceneProgress) : 1

    return (
      <div className={local('figure')}>
        <div className={local('figure-canvas')}>
          <svg
            viewBox="0 0 460 340"
            role="img"
            aria-label="Rura rozciągana siłą osiową: przekrój pierścieniowy, wymiary średnic, warunek wytrzymałości i dobór średnicy zewnętrznej"
          >
            {(metric === 'model' || ['data', 'area', 'condition', 'diameter', 'check', 'wall'].indexOf(metric) < 0) && (
              <ModelScene p={p} />
            )}
            {metric === 'data' && <DataScene p={p} />}
            {metric === 'area' && <AreaScene p={p} />}
            {metric === 'condition' && <ConditionScene p={p} />}
            {metric === 'diameter' && <DiameterScene p={p} />}
            {metric === 'check' && <CheckScene p={p} />}
            {metric === 'wall' && <WallScene p={p} />}
          </svg>
        </div>
      </div>
    )
  }
}
