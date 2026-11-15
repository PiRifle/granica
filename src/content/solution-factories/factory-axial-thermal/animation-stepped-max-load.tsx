import { motion } from 'motion/react'
import type { ComponentType } from 'react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'
import { deriveSteppedMaxLoad, pl, type SteppedMaxLoadInputs } from './factory'

const LOAD = '#ff6b45'
const MUTED = '#87929d'
const INK = '#17202a'
const EDGE = '#7d8fa5'
const SUPPORT = '#68727e'
const STEEL = '#4f6df5'
const LIMIT = '#a970dd'

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}
const ramp = (value: number, from: number, to: number) => clamp01((value - from) / (to - from))
const lerp = (from: number, to: number, t: number) => from + (to - from) * t

const X0 = 60
const X1 = 410
const BAR_Y = 128
const HALF = 16

export function createSteppedMaxLoadAnimation(inputs: SteppedMaxLoadInputs): ComponentType<SolutionAnimationProps> {
  const derived = deriveSteppedMaxLoad(inputs)
  const segments = inputs.segments
  const totalLength = segments.reduce((sum, segment) => sum + segment.length, 0)
  const boundaries = [X0]
  let running = 0
  for (const segment of segments) {
    running += segment.length
    boundaries.push(X0 + (running / totalLength) * (X1 - X0))
  }
  const mid = boundaries.map((value, index) =>
    index < boundaries.length - 1 ? (value + boundaries[index + 1]) / 2 : value,
  )
  const dopText = `σ_dop: ${segments.map((segment) => `${segment.label} ${pl(segment.sigmaDop, 0)} MPa`).join(' · ')}`
  const strengthRows = segments.map((segment) => ({
    color: segment.color,
    text: `${segment.label}: ${segment.nLabel.replace('−', '')} / ${pl(segment.area, 0)} ≤ ${pl(segment.sigmaDop, 0)} MPa`,
  }))
  const pMaxText = `P_max = ${pl(derived.pMax, 0)} kN`
  const governing = segments[derived.governingIndex]
  const usageRows = segments.map((segment) => {
    const stress = (segment.magnitude * derived.pMax * 1000) / segment.area
    const usage = (stress / segment.sigmaDop) * 100
    return {
      y: 0,
      label: `${segment.label} ${pl(segment.magnitude * derived.pMax, 0)}/${pl(segment.sigmaDop, 0)}`,
      ratio: stress / segment.sigmaDop,
      color: segment.color,
      value: `${pl(usage, Number.isInteger(usage) ? 0 : 1)}%`,
    }
  })

  function Arrow({
    x1,
    x2,
    y,
    amount,
    color,
    width = 2.4,
  }: {
    x1: number
    x2: number
    y: number
    amount: number
    color: string
    width?: number
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
          strokeWidth={width}
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
      </motion.g>
    )
  }

  function Rod({ highlight = -1, dim = false }: { highlight?: number; dim?: boolean }) {
    return (
      <g>
        <g stroke={SUPPORT} strokeWidth={2} strokeLinecap="round">
          <line x1={X0} y1={BAR_Y - 36} x2={X0} y2={BAR_Y + 36} />
          {Array.from({ length: 7 }, (_, tick) => {
            const y = BAR_Y - 28 + tick * (56 / 6)
            return <line key={tick} x1={X0} y1={y} x2={X0 - 11} y2={y - 9} strokeWidth={1.3} />
          })}
        </g>
        {segments.map((segment, index) => {
          const active = highlight === index
          const muted = dim && highlight >= 0 && !active
          return (
            <rect
              key={segment.id}
              x={boundaries[index]}
              y={BAR_Y - HALF}
              width={boundaries[index + 1] - boundaries[index]}
              height={HALF * 2}
              fill={segment.color}
              fillOpacity={muted ? 0.1 : active ? 0.38 : 0.24}
              stroke={segment.color}
              strokeWidth={active ? 2.6 : 1.4}
              strokeOpacity={muted ? 0.45 : 1}
            />
          )
        })}
        {boundaries.slice(1, -1).map((x) => (
          <line key={x} x1={x} y1={BAR_Y - HALF} x2={x} y2={BAR_Y + HALF} stroke={EDGE} strokeWidth={1.2} />
        ))}
      </g>
    )
  }

  function Loads({ reveal }: { reveal: number }) {
    return (
      <motion.g initial={false} animate={{ opacity: reveal }}>
        <line x1={boundaries[1]} y1={88} x2={boundaries[1]} y2={BAR_Y - HALF} stroke={LOAD} strokeWidth={1.2} />
        <Arrow x1={boundaries[1]} x2={boundaries[1] - 42} y={88} amount={reveal} color={LOAD} width={2.2} />
        <text x={boundaries[1] - 21} y={76} textAnchor="middle" fontSize={9.5} fontWeight={700} fill={LOAD}>
          {inputs.loadLabels[0]}
        </text>

        <line x1={boundaries[2]} y1={88} x2={boundaries[2]} y2={BAR_Y - HALF} stroke={LOAD} strokeWidth={1.2} />
        <Arrow x1={boundaries[2]} x2={boundaries[2] + 42} y={88} amount={reveal} color={LOAD} width={2.2} />
        <text x={boundaries[2] + 21} y={70} textAnchor="middle" fontSize={9.5} fontWeight={700} fill={LOAD}>
          {inputs.loadLabels[1]}
        </text>

        <line x1={X1} y1={88} x2={X1} y2={BAR_Y - HALF} stroke={LOAD} strokeWidth={1.2} />
        <Arrow x1={X1} x2={X1 - 34} y={88} amount={reveal} color={LOAD} width={2.2} />
        <text x={X1 - 38} y={100} textAnchor="middle" fontSize={9.5} fontWeight={700} fill={LOAD}>
          {inputs.loadLabels[2]}
        </text>
      </motion.g>
    )
  }

  function Labels({ reveal }: { reveal: number }) {
    return (
      <motion.g initial={false} animate={{ opacity: reveal }}>
        {segments.map((segment, index) => (
          <g key={segment.id}>
            <text x={mid[index]} y={164} textAnchor="middle" fontSize={9} fontWeight={700} fill={segment.color}>
              {`${segment.label} · ${segment.length.toFixed(1).replace('.', ',')} m`}
            </text>
            <text x={mid[index]} y={180} textAnchor="middle" fontSize={8.5} fill={MUTED}>
              {`A = ${pl(segment.area, 0)} mm²`}
            </text>
          </g>
        ))}
      </motion.g>
    )
  }

  function CutScene({ index, p, withDiagram = false }: { index: number; p: number; withDiagram?: boolean }) {
    const cut = lerp(boundaries[index], mid[index], smooth(ramp(p, 0.05, 0.5)))
    const segment = segments[index]
    const reveal = smooth(ramp(p, 0.1, 0.5))
    const tag = smooth(ramp(p, 0.4, 0.8))
    return (
      <g>
        <Rod highlight={index} dim />
        <motion.g initial={false} animate={{ opacity: reveal }}>
          <line x1={cut} y1={64} x2={cut} y2={180} stroke={segment.color} strokeWidth={1.6} strokeDasharray="6 4" />
          <text x={cut} y={56} textAnchor="middle" fontSize={9} fill={segment.color}>
            przekrój
          </text>
          <Arrow x1={cut} x2={cut + 44} y={100} amount={reveal} color={segment.color} width={2.2} />
          <text x={cut + 22} y={92} textAnchor="middle" fontSize={9} fontWeight={700} fill={segment.color}>
            N
          </text>
        </motion.g>
        <motion.g initial={false} animate={{ opacity: tag }}>
          <rect
            x={mid[index] - 80}
            y={186}
            width={160}
            height={30}
            rx={6}
            fill={segment.color}
            fillOpacity={0.12}
            stroke={segment.color}
            strokeWidth={1.3}
          />
          <text x={mid[index]} y={206} textAnchor="middle" fontSize={10} fontWeight={700} fill={segment.color}>
            {`N = ${segment.nLabel} (ściskanie)`}
          </text>
        </motion.g>
        {withDiagram && <NormalDiagram p={p} />}
      </g>
    )
  }

  function NormalDiagram({ p }: { p: number }) {
    const zero = 242
    const scale = 16
    const reveal = smooth(ramp(p, 0.35, 0.85))
    return (
      <motion.g initial={false} animate={{ opacity: reveal }}>
        <line x1={X0} y1={zero} x2={X1} y2={zero} stroke={INK} strokeWidth={1.1} strokeDasharray="4 3" />
        <text x={46} y={zero + 4} textAnchor="start" fontSize={9} fill={MUTED}>
          N
        </text>
        {segments.map((segment, index) => {
          const height = segment.magnitude * scale * reveal
          const x = boundaries[index] + 3
          const width = boundaries[index + 1] - boundaries[index] - 6
          return (
            <g key={segment.id}>
              <rect
                x={x}
                y={zero}
                width={width}
                height={Math.max(1, height)}
                fill={segment.color}
                fillOpacity={0.2}
                stroke={segment.color}
                strokeWidth={1.2}
              />
              <text
                x={mid[index]}
                y={zero + height + 12}
                textAnchor="middle"
                fontSize={9.5}
                fontWeight={700}
                fill={segment.color}
              >
                {segment.nLabel}
              </text>
            </g>
          )
        })}
        <text x={X1} y={332} textAnchor="end" fontSize={8.5} fill={MUTED}>
          N &lt; 0 — ściskanie
        </text>
      </motion.g>
    )
  }

  function StrengthScene({ p }: { p: number }) {
    const rows = strengthRows.map((row, index) => ({ ...row, y: 62 + index * 58 }))
    return (
      <g>
        <text x={230} y={38} textAnchor="middle" fontSize={10} fill={INK}>
          warunek wytrzymałości w każdym odcinku
        </text>
        {rows.map((row, index) => {
          const reveal = smooth(ramp(p, index * 0.16, 0.32 + index * 0.16))
          return (
            <motion.g key={row.text} initial={false} animate={{ opacity: reveal }}>
              <rect
                x={82}
                y={row.y}
                width={296}
                height={38}
                rx={7}
                fill={row.color}
                fillOpacity={0.1}
                stroke={row.color}
                strokeWidth={1.2}
              />
              <text x={230} y={row.y + 24} textAnchor="middle" fontSize={10.5} fontWeight={700} fill={row.color}>
                {row.text}
              </text>
            </motion.g>
          )
        })}
        <motion.text
          x={230}
          y={246}
          textAnchor="middle"
          fontSize={9}
          fill={MUTED}
          initial={false}
          animate={{ opacity: smooth(ramp(p, 0.55, 0.9)) }}
        >
          naprężenie to wartość bezwzględna siły osiowej podzielona przez pole
        </motion.text>
      </g>
    )
  }

  function LimitBars({ p, isGoverning }: { p: number; isGoverning: boolean }) {
    const start = 130
    const scale = 6
    const reveal = smooth(ramp(p, 0.1, 0.7))
    const guide = smooth(ramp(p, 0.55, 0.9))
    return (
      <g>
        <text x={230} y={40} textAnchor="middle" fontSize={10} fill={INK}>
          {isGoverning ? 'najmniejsza granica decyduje o sile P_max' : 'graniczna siła P dla każdego materiału'}
        </text>
        {segments.map((segment, index) => {
          const rowY = 84 + index * 62
          const width = segment.limit * scale * reveal
          const active = isGoverning && index === derived.governingIndex
          return (
            <g key={segment.id}>
              <text x={start - 10} y={rowY + 17} textAnchor="end" fontSize={9.5} fontWeight={700} fill={segment.color}>
                {segment.label}
              </text>
              <rect
                x={start}
                y={rowY}
                width={Math.max(1, width)}
                height={24}
                rx={3}
                fill={segment.color}
                fillOpacity={active ? 0.44 : 0.2}
                stroke={segment.color}
                strokeWidth={active ? 2.6 : 1.3}
              />
              <text
                x={start + Math.max(1, width) + 8}
                y={rowY + 17}
                textAnchor="start"
                fontSize={9.5}
                fontWeight={700}
                fill={segment.color}
              >
                {`${pl(segment.limit, 0)} kN`}
              </text>
            </g>
          )
        })}
        <line x1={start} y1={64} x2={start} y2={250} stroke={EDGE} strokeWidth={1.1} />
        <text x={start} y={266} textAnchor="middle" fontSize={9} fill={MUTED}>
          P [kN]
        </text>
        {isGoverning && (
          <motion.g initial={false} animate={{ opacity: guide }}>
            <line
              x1={start + governing.limit * scale}
              y1={62}
              x2={start + governing.limit * scale}
              y2={252}
              stroke={governing.color}
              strokeWidth={1.6}
              strokeDasharray="5 4"
            />
            <text
              x={start + governing.limit * scale}
              y={58}
              textAnchor="middle"
              fontSize={10}
              fontWeight={700}
              fill={governing.color}
            >
              {pMaxText}
            </text>
            <text x={356} y={58} textAnchor="start" fontSize={9} fill={governing.color}>
              {`decyduje ${governing.label}`}
            </text>
          </motion.g>
        )}
      </g>
    )
  }

  function CheckScene({ p }: { p: number }) {
    const start = 160
    const maxWidth = 200
    const reveal = smooth(ramp(p, 0.1, 0.7))
    const rows = usageRows.map((row, index) => ({ ...row, y: 82 + index * 60 }))
    return (
      <g>
        <text x={230} y={44} textAnchor="middle" fontSize={10} fill={INK}>
          {`wykorzystanie naprężeń przy P = ${pl(derived.pMax, 0)} kN`}
        </text>
        {rows.map((row, index) => {
          const width = maxWidth * row.ratio * reveal
          return (
            <g key={row.label}>
              <text x={start - 10} y={row.y + 16} textAnchor="end" fontSize={9} fontWeight={700} fill={row.color}>
                {row.label}
              </text>
              <rect
                x={start}
                y={row.y}
                width={maxWidth}
                height={22}
                rx={3}
                fill={row.color}
                fillOpacity={0.08}
                stroke={row.color}
                strokeWidth={1}
                strokeOpacity={0.4}
              />
              <rect
                x={start}
                y={row.y}
                width={Math.max(1, width)}
                height={22}
                rx={3}
                fill={row.color}
                fillOpacity={index === derived.governingIndex ? 0.46 : 0.3}
                stroke={row.color}
                strokeWidth={index === derived.governingIndex ? 1.8 : 1.2}
              />
              <text
                x={start + Math.max(1, width) + 7}
                y={row.y + 16}
                textAnchor="start"
                fontSize={9}
                fontWeight={700}
                fill={row.color}
              >
                {row.value}
              </text>
            </g>
          )
        })}
        <motion.text
          x={230}
          y={254}
          textAnchor="middle"
          fontSize={9.5}
          fontWeight={700}
          fill={governing.color}
          initial={false}
          animate={{ opacity: smooth(ramp(p, 0.5, 0.9)) }}
        >
          {`σ_${governing.id} = ${pl(governing.sigmaDop, 0)} MPa = σ_dop — ${governing.label} jest na granicy`}
        </motion.text>
      </g>
    )
  }

  function EquilibriumScene({ p }: { p: number }) {
    return (
      <g>
        <Rod />
        <Loads reveal={1} />
        <motion.g initial={false} animate={{ opacity: smooth(ramp(p, 0.1, 0.45)) }}>
          <line x1={X0} y1={168} x2={X0} y2={186} stroke={SUPPORT} strokeWidth={1.2} />
          <Arrow x1={X0} x2={X0 + 40} y={168} amount={1} color={STEEL} width={2.4} />
          <text x={X0 + 20} y={188} textAnchor="middle" fontSize={9.5} fontWeight={700} fill={STEEL}>
            {inputs.reactionLabel}
          </text>
        </motion.g>
        <motion.g initial={false} animate={{ opacity: smooth(ramp(p, 0.4, 0.85)) }}>
          <text x={230} y={216} textAnchor="middle" fontSize={10} fontWeight={700} fill={INK}>
            ΣF_x = −4P + P − 2P + R = 0
          </text>
          <text x={230} y={238} textAnchor="middle" fontSize={10} fontWeight={700} fill={STEEL}>
            {inputs.reactionLine}
          </text>
          <text x={230} y={258} textAnchor="middle" fontSize={9} fill={MUTED}>
            znak dodatni potwierdza kierunek reakcji
          </text>
        </motion.g>
      </g>
    )
  }

  return function SteppedMaxLoadAnimation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
    const metric = scene.focus?.metric ?? 'model'
    const p = playing ? clamp01(sceneProgress) : 1
    const reveal = smooth(ramp(p, 0, 0.35))

    return (
      <div className={local('figure')}>
        <div className={local('figure-canvas')}>
          <svg
            viewBox="0 0 460 340"
            role="img"
            aria-label="Pręt stal–aluminium–brąz utwierdzony na lewym końcu, z siłami 4P, P i 2P; przekroje, siły osiowe, granice wytrzymałości i dobór maksymalnej siły P"
          >
            {(metric === 'model' ||
              ['equilibrium', 'bronze', 'alu', 'steel', 'strength', 'limits', 'govern', 'check'].indexOf(metric) <
                0) && (
              <g>
                <Rod />
                <text x={X0} y={30} fontSize={9} fill={MUTED}>
                  {dopText}
                </text>
                <text x={230} y={46} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                  {inputs.directionsNote}
                </text>
                <Loads reveal={reveal} />
                <Labels reveal={smooth(ramp(p, 0.2, 0.6))} />
              </g>
            )}

            {metric === 'equilibrium' && <EquilibriumScene p={p} />}
            {metric === 'bronze' && <CutScene index={2} p={p} />}
            {metric === 'alu' && <CutScene index={1} p={p} />}
            {metric === 'steel' && <CutScene index={0} p={p} withDiagram />}
            {metric === 'strength' && <StrengthScene p={p} />}
            {metric === 'limits' && <LimitBars p={p} isGoverning={false} />}
            {metric === 'govern' && <LimitBars p={p} isGoverning />}
            {metric === 'check' && <CheckScene p={p} />}

            {metric === 'limits' && (
              <text x={230} y={310} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                na razie trzy osobne granice — wybór jeszcze nie jest rozstrzygnięty
              </text>
            )}
            {metric === 'govern' && (
              <text x={230} y={310} textAnchor="middle" fontSize={9} fill={LIMIT}>
                {`najmniejsza wartość ${pl(derived.pMax, 0)} kN jest bezpieczna dla wszystkich odcinków`}
              </text>
            )}
          </svg>
        </div>
      </div>
    )
  }
}
