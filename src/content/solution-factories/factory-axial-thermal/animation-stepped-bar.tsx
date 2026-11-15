import { motion } from 'motion/react'
import type { ComponentType } from 'react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'
import { deriveSteppedBar, pl, type SteppedBarInputs } from './factory'

const LOAD = '#ff6b45'
const MUTED = '#87929d'
const INK = '#17202a'
const EDGE = '#7d8fa5'
const SUPPORT = '#68727e'
const STEEL = '#4f6df5'
const OK_TEXT = '#2f7d5b'

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}
const ramp = (value: number, from: number, to: number) => clamp01((value - from) / (to - from))
const lerp = (from: number, to: number, t: number) => from + (to - from) * t

const X0 = 64
const X1 = 398
const BAR_Y = 132
const HALF = 17

export function createSteppedBarAnimation(inputs: SteppedBarInputs): ComponentType<SolutionAnimationProps> {
  const derived = deriveSteppedBar(inputs)
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
  const anchorIndex = 2
  const modelText = `P = ${pl(inputs.p, 0)} N, każdy odcinek A = ${pl(inputs.area, 0)} mm²`
  const areaText = `A = ${pl(inputs.area, 0)} mm²`
  const areaLongText = `A = ${pl(inputs.area, 0)} mm² w każdym odcinku`
  const stressTexts = derived.stresses.map((stress) => `${pl(stress, 0)} MPa`)
  const sigmaList = derived.stresses.map((stress) => pl(stress, 0)).join(' : ')
  const ratio = (() => {
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b))
    const divisor = derived.stresses.reduce((acc, value) => gcd(acc, Math.round(value)))
    return derived.stresses.map((value) => pl(value / divisor, 0)).join(' : ')
  })()

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
          <line x1={X1} y1={BAR_Y - 40} x2={X1} y2={BAR_Y + 40} />
          {Array.from({ length: 7 }, (_, tick) => {
            const y = BAR_Y - 32 + tick * (64 / 6)
            return <line key={tick} x1={X1} y1={y} x2={X1 + 11} y2={y - 9} strokeWidth={1.3} />
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
        <text x={(X0 + X1) / 2} y={BAR_Y + 5} textAnchor="middle" fontSize={9.5} fontWeight={700} fill={INK}>
          pręt wielomateriałowy
        </text>
      </g>
    )
  }

  function Loads({ reveal, anchored = true }: { reveal: number; anchored?: boolean }) {
    return (
      <motion.g initial={false} animate={{ opacity: reveal }}>
        <Arrow x1={X0} x2={X0 - 42} y={BAR_Y} amount={reveal} color={LOAD} width={2.6} />
        <text x={43} y={BAR_Y - 22} textAnchor="middle" fontSize={9.5} fontWeight={700} fill={LOAD}>
          {inputs.leftLoadLabel}
        </text>
        {anchored && (
          <line
            x1={boundaries[anchorIndex]}
            y1={BAR_Y - 38}
            x2={boundaries[anchorIndex]}
            y2={BAR_Y - HALF}
            stroke={LOAD}
            strokeWidth={1.2}
          />
        )}
        <Arrow
          x1={boundaries[anchorIndex]}
          x2={boundaries[anchorIndex] + 40}
          y={BAR_Y - 38}
          amount={reveal}
          color={LOAD}
          width={2.2}
        />
        <text
          x={boundaries[anchorIndex] + 20}
          y={BAR_Y - 50}
          textAnchor="middle"
          fontSize={9.5}
          fontWeight={700}
          fill={LOAD}
        >
          {inputs.midLoadLabel}
        </text>
      </motion.g>
    )
  }

  function ResultTag({ index, reveal }: { index: number; reveal: number }) {
    const segment = segments[index]
    const cx = mid[index]
    return (
      <motion.g initial={false} animate={{ opacity: reveal }}>
        <rect
          x={cx - 84}
          y={176}
          width={168}
          height={30}
          rx={6}
          fill={segment.color}
          fillOpacity={0.12}
          stroke={segment.color}
          strokeWidth={1.3}
        />
        <text x={cx} y={196} textAnchor="middle" fontSize={10} fontWeight={700} fill={segment.color}>
          {`N = ${segment.tagged} (rozciąganie)`}
        </text>
      </motion.g>
    )
  }

  function CutScene({ index, p }: { index: number; p: number }) {
    const cut = lerp(boundaries[index], mid[index], smooth(ramp(p, 0.05, 0.5)))
    const segment = segments[index]
    const reveal = smooth(ramp(p, 0.1, 0.5))
    const tag = smooth(ramp(p, 0.4, 0.8))
    return (
      <g>
        <Rod highlight={index} dim />
        <motion.g initial={false} animate={{ opacity: reveal }}>
          <line x1={cut} y1={68} x2={cut} y2={168} stroke={segment.color} strokeWidth={1.6} strokeDasharray="6 4" />
          <text x={cut} y={60} textAnchor="middle" fontSize={9} fill={segment.color}>
            przekrój
          </text>
          <Arrow x1={cut} x2={cut + 42} y={106} amount={reveal} color={segment.color} width={2.2} />
          <text x={cut + 21} y={98} textAnchor="middle" fontSize={9} fontWeight={700} fill={segment.color}>
            N
          </text>
        </motion.g>
        <ResultTag index={index} reveal={tag} />
      </g>
    )
  }

  function Labels({ reveal }: { reveal: number }) {
    return (
      <motion.g initial={false} animate={{ opacity: reveal }}>
        {segments.map((segment, index) => (
          <text
            key={segment.id}
            x={mid[index]}
            y={176}
            textAnchor="middle"
            fontSize={9}
            fontWeight={700}
            fill={segment.color}
          >
            {`${segment.label} · ${segment.length.toFixed(1).replace('.', ',')} m`}
          </text>
        ))}
        <text x={mid[0]} y={192} textAnchor="middle" fontSize={8.5} fill={MUTED}>
          {areaText}
        </text>
      </motion.g>
    )
  }

  function StressBars({ p }: { p: number }) {
    const zero = 250
    const scale = 70 / derived.maxStress
    const reveal = smooth(ramp(p, 0.1, 0.65))
    return (
      <g>
        <line x1={X0} y1={zero} x2={X1} y2={zero} stroke={INK} strokeWidth={1.1} />
        <text x={X0} y={zero + 16} fontSize={9} fill={MUTED}>
          σ [MPa]
        </text>
        <text x={X0} y={30} fontSize={9.5} fill={MUTED}>
          {areaLongText}
        </text>
        {segments.map((segment, index) => {
          const height = (segment.n / inputs.area) * scale * reveal
          const width = 30
          const x = mid[index] - width / 2
          return (
            <g key={segment.id}>
              <rect
                x={x}
                y={zero - height}
                width={width}
                height={Math.max(1, height)}
                rx={2}
                fill={segment.color}
                fillOpacity={0.3}
                stroke={segment.color}
                strokeWidth={1.4}
              />
              <text
                x={mid[index]}
                y={zero - height - 7}
                textAnchor="middle"
                fontSize={9.5}
                fontWeight={700}
                fill={segment.color}
              >
                {stressTexts[index]}
              </text>
            </g>
          )
        })}
        <text x={X0} y={zero + 32} fontSize={8.5} fill={MUTED}>
          wszystkie naprężenia są rozciągające
        </text>
      </g>
    )
  }

  function NormalDiagram({ p }: { p: number }) {
    const zero = 288
    const scale = 60 / derived.maxN
    const reveal = smooth(ramp(p, 0.1, 0.7))
    return (
      <g>
        <line x1={X0} y1={zero} x2={X1} y2={zero} stroke={INK} strokeWidth={1.1} />
        <text x={X0} y={zero + 15} fontSize={9} fill={MUTED}>
          N [N]
        </text>
        {segments.map((segment, index) => {
          const height = segment.n * scale * reveal
          const x = boundaries[index] + 3
          const width = boundaries[index + 1] - boundaries[index] - 6
          return (
            <g key={segment.id}>
              <rect
                x={x}
                y={zero - height}
                width={width}
                height={Math.max(1, height)}
                fill={segment.color}
                fillOpacity={0.24}
                stroke={segment.color}
                strokeWidth={1.3}
              />
              <text
                x={mid[index]}
                y={zero - height - 7}
                textAnchor="middle"
                fontSize={9.5}
                fontWeight={700}
                fill={segment.color}
              >
                {`+${pl(segment.n, 0)} N`}
              </text>
            </g>
          )
        })}
        <text x={X1} y={zero + 15} textAnchor="end" fontSize={8.5} fill={MUTED}>
          rozciąganie dodatnie
        </text>
      </g>
    )
  }

  function Reaction({ reveal, x, y, label }: { reveal: number; x: number; y: number; label: string }) {
    return (
      <motion.g initial={false} animate={{ opacity: reveal }}>
        <line x1={X1} y1={y} x2={X1} y2={y + 18} stroke={SUPPORT} strokeWidth={1.2} />
        <Arrow x1={X1} x2={x} y={y} amount={reveal} color={STEEL} width={2.4} />
        <text x={X1 + 24} y={y - 8} textAnchor="middle" fontSize={9.5} fontWeight={700} fill={STEEL}>
          {label}
        </text>
      </motion.g>
    )
  }

  return function SteppedBarAnimation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
    const metric = scene.focus?.metric ?? 'model'
    const p = playing ? clamp01(sceneProgress) : 1
    const reveal = smooth(ramp(p, 0, 0.35))

    return (
      <div className={local('figure')}>
        <div className={local('figure-canvas')}>
          <svg
            viewBox="0 0 460 340"
            role="img"
            aria-label="Pręt z odcinków stal, aluminium i brąz, utwierdzony na prawym końcu, z siłami 4P i P; przekroje, siły osiowe i naprężenia"
          >
            {(metric === 'model' ||
              ['equilibrium', 'steel', 'alu', 'bronze', 'stress', 'diagram', 'check'].indexOf(metric) < 0) && (
              <g>
                <Rod />
                <text x={X0} y={30} fontSize={9.5} fill={MUTED}>
                  {modelText}
                </text>
                <Loads reveal={reveal} />
                <Labels reveal={smooth(ramp(p, 0.2, 0.6))} />
              </g>
            )}

            {metric === 'equilibrium' && (
              <g>
                <Rod />
                <Loads reveal={1} />
                <Reaction reveal={smooth(ramp(p, 0.1, 0.45))} x={432} y={94} label={inputs.reactionLabel} />
                <motion.g initial={false} animate={{ opacity: smooth(ramp(p, 0.4, 0.85)) }}>
                  <text x={230} y={206} textAnchor="middle" fontSize={10} fontWeight={700} fill={INK}>
                    ΣF_x = −4P + P + R = 0
                  </text>
                  <text x={230} y={228} textAnchor="middle" fontSize={10} fontWeight={700} fill={STEEL}>
                    {`R = 4P − P = 3P = ${pl(derived.reactionN, 0)} N`}
                  </text>
                  <text x={230} y={248} textAnchor="middle" fontSize={9} fill={MUTED}>
                    reakcja ściany działa w prawo
                  </text>
                </motion.g>
              </g>
            )}

            {metric === 'steel' && <CutScene index={0} p={p} />}
            {metric === 'alu' && <CutScene index={1} p={p} />}
            {metric === 'bronze' && <CutScene index={2} p={p} />}
            {metric === 'stress' && <StressBars p={p} />}
            {metric === 'diagram' && (
              <g>
                <Rod />
                <NormalDiagram p={p} />
              </g>
            )}

            {metric === 'check' && (
              <g>
                <Rod />
                <Loads reveal={1} />
                <Reaction reveal={smooth(ramp(p, 0.1, 0.45))} x={432} y={94} label="R = 3P" />
                <motion.g initial={false} animate={{ opacity: smooth(ramp(p, 0.35, 0.85)) }}>
                  <text x={230} y={204} textAnchor="middle" fontSize={10} fontWeight={700} fill={INK}>
                    ΣF_x = −4P + P + 3P = 0
                  </text>
                  <text x={230} y={226} textAnchor="middle" fontSize={9.5} fontWeight={700} fill={OK_TEXT}>
                    {`σ_st : σ_al : σ_br = ${sigmaList} = ${ratio}`}
                  </text>
                  <text x={230} y={248} textAnchor="middle" fontSize={9} fill={MUTED}>
                    brąz jest słabiej obciążony, bo siła P działa przeciwnie do 4P
                  </text>
                </motion.g>
              </g>
            )}
          </svg>
        </div>
      </div>
    )
  }
}
