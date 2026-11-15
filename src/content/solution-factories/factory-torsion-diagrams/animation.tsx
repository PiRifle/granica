import { motion } from 'motion/react'
import type { ComponentType } from 'react'
import {
  ThreeSolutionScene,
  type ThreeLabel,
  type ThreePrimitive,
} from '../../../components/solution-figures/ThreeSolutionScene'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'
import { THREE_COLORS, ThreeStatus, v } from '../../../components/solution-figures/three-statics'
import { deriveTorsionDiagrams, exampleTorsionDiagramsInputs, pl, plGroup, type TorsionDiagramsInputs } from './factory'

const BLUE = '#4f6df5'
const LOAD = '#ff6b45'
const OK = '#2f7d5b'
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

const MINUS = '−'

function plSign(value: number, digits: number): string {
  const text = pl(Math.abs(value), digits)
  return `${value < 0 ? MINUS : '+'}${text}`
}

function plMinus(value: number, digits: number): string {
  const text = pl(Math.abs(value), digits)
  return value < 0 ? `${MINUS}${text}` : text
}

const X0 = 50
const X1 = 410
const SEG = (X1 - X0) / 4
const stationX = (index: number) => X0 + index * SEG

function Header({ title, note }: { title: string; note: string }) {
  return (
    <g>
      <text x={14} y={18} fontSize={9.5} fontWeight={700} fill={INK}>
        {title}
      </text>
      <text x={446} y={18} textAnchor="end" fontSize={8.5} fill={MUTED}>
        {note}
      </text>
    </g>
  )
}

export function createTorsionDiagramsAnimation(inputs: TorsionDiagramsInputs): ComponentType<SolutionAnimationProps> {
  const derived = deriveTorsionDiagrams(inputs)
  const f0 = (value: number) => pl(value, 0)
  const f1 = (value: number) => pl(value, 1)
  const f2 = (value: number) => pl(value, 2)
  const f4 = (value: number) => pl(value, 4)
  const f5 = (value: number) => pl(value, 5)
  const j0Text = plGroup(derived.j0, 0)
  const w0Text = plGroup(derived.w0, 1)
  const momentTexts = inputs.applied.map((entry) => `${entry.label} = ${f0(entry.moment)}`)
  const momentTextsFull = inputs.applied.map((entry) => `${entry.label} = ${f0(entry.moment)} kN·m`)
  const internalSigns = derived.internal.map((moment) => (moment < 0 ? MINUS : '+'))
  const torquePath = derived.internal
    .map((moment, index) => {
      const y = 236 - moment * 9
      return `L ${stationX(index)} ${y} L ${stationX(index + 1)} ${y}`
    })
    .join(' ')
  const equilibriumLine = inputs.applied
    .map(
      (entry, index) =>
        `${entry.sign < 0 ? MINUS : '+'}${f0(index === inputs.balancingIndex ? derived.balancing : entry.moment)}`,
    )
    .join(' ')
  const balanceSum = inputs.applied
    .filter((_, index) => index !== inputs.balancingIndex)
    .map((entry) => f0(entry.moment))
    .join(' + ')
  const twistSum = derived.twists.map((twist) => plMinus(twist, 5)).join(' + ')

  function ShaftSchematic() {
    return (
      <g>
        <rect x={X0} y={84} width={X1 - X0} height={12} rx={3} fill="#dce8f7" stroke={EDGE} strokeWidth={1.2} />
        {inputs.stations.map((_, index) => (
          <line
            key={`tick-${index}`}
            x1={stationX(index)}
            y1={78}
            x2={stationX(index)}
            y2={102}
            stroke={EDGE}
            strokeWidth={index === 0 || index === inputs.stations.length - 1 ? 1.6 : 1}
          />
        ))}
        {inputs.applied.map((entry, index) => (
          <g key={entry.label}>
            <path
              d={
                entry.sign > 0
                  ? `M ${stationX(index) - 12} 72 Q ${stationX(index)} 52 ${stationX(index) + 12} 72`
                  : `M ${stationX(index) + 12} 72 Q ${stationX(index)} 52 ${stationX(index) - 12} 72`
              }
              fill="none"
              stroke={VIOLET}
              strokeWidth={1.7}
              markerEnd={entry.sign > 0 ? 'url(#w4t-mr)' : 'url(#w4t-ml)'}
            />
            <text x={stationX(index)} y={44} textAnchor="middle" fontSize={8.5} fontWeight={600} fill={VIOLET}>
              {momentTexts[index]}
            </text>
          </g>
        ))}
        {['A', 'B', 'C', 'D', 'E'].map((letter, index) => (
          <text key={letter} x={stationX(index)} y={112} textAnchor="middle" fontSize={9} fontWeight={700} fill={INK}>
            {letter}
          </text>
        ))}
      </g>
    )
  }

  function DiagramAxis({ label, baseline }: { label: string; baseline: number }) {
    return (
      <g>
        <line x1={X0} y1={baseline} x2={X1 + 20} y2={baseline} stroke="#c9d0d9" strokeWidth={1} />
        <text x={14} y={baseline - 84} fontSize={10} fontWeight={700} fill={INK}>
          {label}
        </text>
        <text x={X1 + 24} y={baseline + 3} fontSize={8} fill={MUTED}>
          0
        </text>
      </g>
    )
  }

  function TorqueScene({ p }: { p: number }) {
    const draw = smooth(ramp(p, 0, 0.75))
    const show = (threshold: number) => (p > threshold ? 1 : 0)
    return (
      <g>
        <Header title="WYKRES MOMENTU SKRĘCAJĄCEGO" note="momenty wewnętrzne [kN·m]" />
        <ShaftSchematic />
        <DiagramAxis label="M_s" baseline={236} />
        <motion.path
          d={`M ${X0} 236 ${torquePath} L ${X1} 236`}
          fill="none"
          stroke={BLUE}
          strokeWidth={2.6}
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: draw }}
          transition={{ duration: 0.12, ease: 'linear' }}
        />
        {derived.internal.map((moment, index) => (
          <g key={`${moment}-${index}`} opacity={show(0.2 + index * 0.18)}>
            <circle cx={stationX(index) + SEG / 2} cy={236 - moment * 9} r={3} fill={BLUE} />
            <text
              x={stationX(index) + SEG / 2}
              y={236 - moment * 9 - (moment > 0 ? 8 : -16)}
              textAnchor="middle"
              fontSize={9}
              fontWeight={700}
              fill={moment > 0 ? BLUE : LOAD}
            >
              {`${internalSigns[index]}${f0(Math.abs(moment))}`}
            </text>
          </g>
        ))}
        <text x={230} y={316} textAnchor="middle" fontSize={8.5} fill={MUTED}>
          {`skoki: ${derived.internal.map((moment, index) => `${internalSigns[index]}${f0(Math.abs(moment))}`).join(' → ')} → 0 kN·m`}
        </text>
      </g>
    )
  }

  function SectionScene({ p }: { p: number }) {
    const reveal = smooth(ramp(p, 0, 0.3))
    return (
      <g>
        <Header title="PRZEKRÓJ KOŁOWY WAŁU" note={`d = ${f0(inputs.d)} mm · π bez zaokrąglania`} />
        <ShaftSchematic />
        <g opacity={reveal}>
          <circle cx={128} cy={216} r={52} fill={BLUE} fillOpacity={0.1} stroke={BLUE} strokeWidth={1.8} />
          <line x1={76} y1={216} x2={180} y2={216} stroke={BLUE} strokeWidth={1} strokeDasharray="4 3" />
          <text x={128} y={211} textAnchor="middle" fontSize={9} fill={MUTED}>
            oś
          </text>
          <g stroke={INK} fill={INK}>
            <line x1={76} y1={286} x2={180} y2={286} strokeWidth={1} />
            <line x1={76} y1={281} x2={76} y2={291} strokeWidth={1} />
            <line x1={180} y1={281} x2={180} y2={291} strokeWidth={1} />
            <text x={128} y={302} textAnchor="middle" fontSize={9} stroke="none">
              {`d = ${f0(inputs.d)} mm`}
            </text>
          </g>
          <text x={128} y={322} textAnchor="middle" fontSize={8.5} fill={MUTED}>
            przekrój pełny
          </text>
          <rect x={240} y={150} width={200} height={60} rx={8} fill={FILL} stroke="#d7dee8" strokeWidth={1.1} />
          <text x={252} y={172} fontSize={8} fill={MUTED}>
            biegunowy moment bezwładności
          </text>
          <text x={252} y={194} fontSize={9.5} fontWeight={700} fill={BLUE}>
            {`J₀ = ${j0Text} mm⁴`}
          </text>
          <rect x={240} y={222} width={200} height={60} rx={8} fill={FILL} stroke="#d7dee8" strokeWidth={1.1} />
          <text x={252} y={244} fontSize={8} fill={MUTED}>
            wskaźnik wytrzymałości
          </text>
          <text x={252} y={266} fontSize={9.5} fontWeight={700} fill={BLUE}>
            {`W₀ = ${w0Text} mm³`}
          </text>
          <text x={240} y={302} fontSize={8.5} fill={MUTED}>
            J₀ = πd⁴/32
          </text>
          <text x={240} y={320} fontSize={8.5} fill={MUTED}>
            W₀ = πd³/16
          </text>
        </g>
      </g>
    )
  }

  const STRESS_BASE = 300
  const STRESS_SCALE = 0.18

  function StressBars({ draw, values = 'above' }: { draw: number; values?: 'above' | 'inside' }) {
    return (
      <g>
        {derived.stresses.map((stress, index) => {
          const cx = X0 + (index + 0.5) * SEG
          const height = stress * STRESS_SCALE * draw
          const top = STRESS_BASE - height
          const color = index === 0 ? OK : LOAD
          const label = f1(stress)
          return (
            <g key={`${stress}-${index}`}>
              <rect
                x={cx - 31}
                y={top}
                width={62}
                height={height}
                rx={3}
                fill={color}
                fillOpacity={0.22}
                stroke={color}
                strokeWidth={1.3}
              />
              {values === 'above' ? (
                <text x={cx} y={top - 8} textAnchor="middle" fontSize={9} fontWeight={700} fill={color}>
                  {label}
                </text>
              ) : (
                <text x={cx} y={top + 16} textAnchor="middle" fontSize={9} fontWeight={700} fill={color}>
                  {label}
                </text>
              )}
            </g>
          )
        })}
      </g>
    )
  }

  function StressScene({ p }: { p: number }) {
    const draw = smooth(ramp(p, 0, 0.6))
    return (
      <g>
        <Header title="NAPREŻENIA STYCZNE W ODCINKACH" note="τ = |M_s| / W₀ · [MPa]" />
        <ShaftSchematic />
        <DiagramAxis label="τ" baseline={STRESS_BASE} />
        <StressBars draw={draw} />
        <text x={50} y={316} fontSize={8.5} fill={MUTED}>
          {`W₀ = ${w0Text} mm³`}
        </text>
        <text x={410} y={316} textAnchor="end" fontSize={8.5} fill={MUTED}>
          decyduje odcinek drugi
        </text>
      </g>
    )
  }

  function StrengthScene({ p }: { p: number }) {
    const draw = smooth(ramp(p, 0, 0.55))
    const limit = STRESS_BASE - inputs.ks * STRESS_SCALE
    const showMax = smooth(ramp(p, 0.5, 0.75))
    return (
      <g>
        <Header
          title="WARUNEK WYTRZYMAŁOŚCI"
          note={`k_s = ${f0(inputs.ks)} MPa · τmax = ${f1(derived.maxStress)} MPa`}
        />
        <ShaftSchematic />
        <DiagramAxis label="τ" baseline={STRESS_BASE} />
        <StressBars draw={draw} values="inside" />
        <line x1={X0} y1={limit} x2={X1 + 20} y2={limit} stroke={LOAD} strokeWidth={1.3} strokeDasharray="6 4" />
        <g opacity={showMax}>
          <text x={X0 + 1.5 * SEG} y={150} textAnchor="middle" fontSize={9.5} fontWeight={700} fill={LOAD}>
            {`τmax = ${f1(derived.maxStress)} MPa`}
          </text>
        </g>
        <line x1={X0} y1={322} x2={X0 + 18} y2={322} stroke={LOAD} strokeWidth={1.3} strokeDasharray="4 3" />
        <text x={X0 + 24} y={325} fontSize={8.5} fill={LOAD}>
          {`k_s = ${f0(inputs.ks)} MPa`}
        </text>
        <text x={X1} y={325} textAnchor="end" fontSize={8.5} fontWeight={700} fill={LOAD}>
          {`${f1(derived.maxStress)} > ${f0(inputs.ks)} MPa — warunek nie jest spełniony`}
        </text>
      </g>
    )
  }

  function TwistScene({ p }: { p: number }) {
    const reveal = smooth(ramp(p, 0, 0.35))
    return (
      <g>
        <Header title="PRZYROSTY KĄTA SKRĘCENIA" note="θ = M_s · l / (G · J₀)" />
        <ShaftSchematic />
        <text x={230} y={134} textAnchor="middle" fontSize={8.5} fill={MUTED}>
          {`l = ${f1(inputs.segmentLength)} m · G = ${plGroup(inputs.shearModulus / 1000)} GPa · J₀ = ${j0Text} mm⁴`}
        </text>
        <g opacity={reveal}>
          {derived.twists.map((twist, index) => {
            const x = 28 + index * 103
            const color = twist < 0 ? LOAD : OK
            return (
              <g key={`twist-${index}`}>
                <rect x={x} y={150} width={94} height={108} rx={8} fill={FILL} stroke="#d7dee8" strokeWidth={1.1} />
                <text x={x + 47} y={174} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                  {`odcinek ${index + 1}`}
                </text>
                <text x={x + 47} y={204} textAnchor="middle" fontSize={8.5} fontWeight={700} fill={color}>
                  {plSign(twist, 5)}
                </text>
                <text x={x + 47} y={220} textAnchor="middle" fontSize={8} fill={color}>
                  rad
                </text>
                <text x={x + 47} y={242} textAnchor="middle" fontSize={9.5} fontWeight={700} fill={color}>
                  {`${plSign(derived.twistDegrees[index], 2)}°`}
                </text>
              </g>
            )
          })}
          <text x={230} y={288} textAnchor="middle" fontSize={9} fill={INK}>
            θ_i = M_si · l / (G · J₀)
          </text>
          <text x={230} y={310} textAnchor="middle" fontSize={8.5} fill={MUTED}>
            pierwszy odcinek skręca w przeciwnym kierunku
          </text>
        </g>
      </g>
    )
  }

  function CumulativeScene({ p }: { p: number }) {
    const draw = smooth(ramp(p, 0, 0.75))
    const y = (value: number) => 280 - value * 700
    const points: Array<[number, number]> = derived.cumulative.map((value, index) => [stationX(index), value])
    const path = points.map(([x, value], index) => `${index === 0 ? 'M' : 'L'} ${x} ${y(value).toFixed(1)}`).join(' ')
    return (
      <g>
        <Header title="SUMARYCZNY KĄT SKRĘCENIA" note="φ = Σθ_i · [rad]" />
        <ShaftSchematic />
        <line x1={X0} y1={280} x2={X1 + 20} y2={280} stroke="#c9d0d9" strokeWidth={1} />
        <line x1={X0} y1={150} x2={X0} y2={292} stroke="#c9d0d9" strokeWidth={1} />
        <text x={14} y={148} fontSize={10} fontWeight={700} fill={INK}>
          φ
        </text>
        <motion.path
          d={path}
          fill="none"
          stroke={BLUE}
          strokeWidth={2.6}
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: draw }}
          transition={{ duration: 0.12, ease: 'linear' }}
        />
        {points.map(([x, value], index) => (
          <circle key={index} cx={x} cy={y(value)} r={3} fill={BLUE} opacity={draw > index * 0.16 ? 1 : 0} />
        ))}
        <text x={stationX(1)} y={306} textAnchor="middle" fontSize={8.5} fill={LOAD}>
          {`${plMinus(derived.cumulative[1], 4)} rad`}
        </text>
        <text x={X1} y={146} textAnchor="end" fontSize={9} fontWeight={700} fill={OK}>
          {`φ = ${f4(derived.totalTwist)} rad = ${f2(derived.totalDegrees)}°`}
        </text>
        <text x={230} y={330} textAnchor="middle" fontSize={8.5} fill={MUTED}>
          {`suma rośnie od 0 do ${f2(derived.totalDegrees)}° na prawym końcu`}
        </text>
      </g>
    )
  }

  function CheckScene({ p }: { p: number }) {
    const reveal = smooth(ramp(p, 0, 0.3))
    return (
      <g>
        <Header title="KONTROLA OBLICZEŃ" note="równowaga · jednostki · wniosek" />
        <ShaftSchematic />
        <text x={40} y={130} fontSize={9} fontWeight={700} fill={INK}>
          równowaga i jednostki
        </text>
        <g opacity={reveal}>
          <rect x={40} y={140} width={380} height={158} rx={8} fill={FILL} stroke="#d7dee8" strokeWidth={1.1} />
          <text x={52} y={168} fontSize={9} fill={INK}>
            {`1. ΣM_x: ${equilibriumLine} = 0`}
          </text>
          <text x={52} y={194} fontSize={9} fill={INK}>
            {`2. po ostatnim momencie: M_s${derived.internal.length} − ${inputs.applied[inputs.applied.length - 1].label} = ${f0(Math.abs(derived.internal[derived.internal.length - 1]))} − ${f0(inputs.applied[inputs.applied.length - 1].moment)} = 0`}
          </text>
          <text x={52} y={220} fontSize={9} fill={INK}>
            {`3. suma kątów: ${twistSum}`}
          </text>
          <text x={52} y={246} fontSize={9} fill={INK}>
            {`4. φ = ${f5(derived.totalTwist)} rad = ${f2(derived.totalDegrees)}°`}
          </text>
          <text x={52} y={272} fontSize={9} fill={INK}>
            5. kN·m = 10⁶ N·mm; MPa = N/mm²; rad = 1
          </text>
        </g>
        <text x={230} y={326} textAnchor="middle" fontSize={8.5} fontWeight={600} fill={LOAD}>
          warunek τmax ≤ k_s nie jest spełniony — przekrój jest za mały
        </text>
      </g>
    )
  }

  function Shaft3D({ index, playing, sceneProgress }: SolutionAnimationProps) {
    const stationPositions = inputs.stations
    const primitives3d: ThreePrimitive[] = [
      ...stationPositions.slice(0, -1).map((start, segment) => ({
        kind: 'rod' as const,
        from: v(start, 0, 0),
        to: v(stationPositions[segment + 1], 0, 0),
        radius: 0.028,
        color: segment % 2 === 0 ? '#8fa1b8' : '#adbccd',
      })),
      ...stationPositions.slice(1, -1).map((x) => ({
        kind: 'ring' as const,
        at: v(x, 0, 0),
        radius: 0.034,
        tube: 0.006,
        axis: v(1, 0, 0),
        color: THREE_COLORS.edge,
      })),
      ...[stationPositions[0], stationPositions[stationPositions.length - 1]].map((x) => ({
        kind: 'ring' as const,
        at: v(x, 0, 0),
        radius: 0.068,
        tube: 0.02,
        axis: v(1, 0, 0),
        color: THREE_COLORS.support,
      })),
      ...stationPositions.map((x) => ({
        kind: 'ring' as const,
        at: v(x, 0, 0),
        radius: 0.073,
        tube: 0.006,
        axis: v(1, 0, 0),
        color: THREE_COLORS.moment,
      })),
      ...stationPositions.map((x, station) => {
        const sign = inputs.applied[station].sign
        return {
          kind: 'arrow' as const,
          from: sign > 0 ? v(x, -0.088, 0) : v(x, -0.088, -0.11),
          to: sign > 0 ? v(x, -0.088, -0.11) : v(x, -0.088, 0),
          color: THREE_COLORS.moment,
          radius: 0.01,
          pulse: true,
        }
      }),
    ]

    const labels3d: ThreeLabel[] = [
      ...['A', 'B', 'C', 'D', 'E'].map((text, station) => ({
        id: `shaft-station-${station}`,
        text,
        at: v(stationPositions[station], 0, 0),
        offset: [0, 24] as const,
        size: 10,
        weight: 700,
      })),
      ...stationPositions.slice(0, -1).map((start, segment) => ({
        id: `shaft-dim-${segment}`,
        text: pl(inputs.segmentLength, 1),
        at: v((start + stationPositions[segment + 1]) / 2, 0, 0),
        offset: [0, 42] as const,
        color: THREE_COLORS.muted,
        size: 8,
        anchor: 'middle' as const,
      })),
      ...inputs.applied.map((entry, station) => ({
        id: `shaft-moment-${station}`,
        text: station === inputs.balancingIndex && index === 0 ? `${entry.label} = ?` : momentTextsFull[station],
        at: v(stationPositions[station], 0, 0),
        offset: [0, station % 2 === 0 ? -46 : -66] as const,
        anchor: 'middle' as const,
        color: THREE_COLORS.moment,
        size: 9,
        weight: 600,
      })),
      {
        id: 'shaft-x',
        text: 'x',
        at: v(stationPositions[stationPositions.length - 1] + 0.06, 0, 0),
        offset: [16, 4] as const,
        color: THREE_COLORS.muted,
        size: 10,
      },
    ]

    return (
      <ThreeSolutionScene
        label="Wał czterosegmentowy z łożyskami i momentami zewnętrznymi"
        primitives={primitives3d}
        labels={labels3d}
        camera={{ position: [0.4, -2.3, 1.15], target: [0.4, 0, 0], viewSize: 1.15 }}
        index={index}
        playing={playing}
        sceneProgress={sceneProgress}
      >
        <ThreeStatus>
          {index === 0
            ? `cztery odcinki po ${pl(inputs.segmentLength, 1)} m · łożyska nie przenoszą skręcania`
            : `ΣM_x = 0 daje ${momentTextsFull[inputs.balancingIndex]} kN·m`}
        </ThreeStatus>
        {index >= 1 && (
          <g>
            <rect
              x={282}
              y={232}
              width={168}
              height={72}
              rx={8}
              fill="#f4f0fb"
              stroke={THREE_COLORS.moment}
              strokeWidth={1.1}
            />
            <text x={292} y={250} fontSize={8.5} fontWeight={700} fill={THREE_COLORS.moment}>
              równowaga momentów
            </text>
            <text x={292} y={268} fontSize={8} fill={THREE_COLORS.moment}>
              {`${inputs.applied.map((entry, i) => `${i === inputs.balancingIndex ? entry.label : `${entry.sign < 0 ? MINUS : '+'}${entry.label}`}`).join(' + ')} = 0`}
            </text>
            <text x={292} y={286} fontSize={8} fill={THREE_COLORS.moment}>
              {`${inputs.applied[inputs.balancingIndex].label} = ${balanceSum} = ${f0(derived.balancing)} kN·m`}
            </text>
          </g>
        )}
      </ThreeSolutionScene>
    )
  }

  return function ShaftTorsionAnimation(props: SolutionAnimationProps) {
    const { scene, index, playing, sceneProgress } = props
    const metric = scene.focus?.metric ?? 'model'
    const p = playing ? smooth(sceneProgress) : 1

    if (metric === 'model' || metric === 'equilibrium') {
      return <Shaft3D {...props} />
    }

    const content =
      metric === 'torque' ? (
        <TorqueScene p={p} />
      ) : metric === 'section' ? (
        <SectionScene p={p} />
      ) : metric === 'stress' ? (
        <StressScene p={p} />
      ) : metric === 'strength' ? (
        <StrengthScene p={p} />
      ) : metric === 'twist' ? (
        <TwistScene p={p} />
      ) : metric === 'cumulative' ? (
        <CumulativeScene p={p} />
      ) : (
        <CheckScene p={p} />
      )

    return (
      <div className={local('figure')}>
        <div className={local('figure-canvas')}>
          <svg
            viewBox="0 0 460 340"
            role="img"
            aria-label="Wał skręcany czterosegmentowy: schemat, wykres momentu skręcającego, naprężenia styczne, przyrosty kąta i sumaryczny kąt skręcenia"
          >
            <defs>
              <marker id="w4t-mr" viewBox="0 0 10 10" refX={8} refY={5} markerWidth={5} markerHeight={5} orient="auto">
                <path d="M0 0 L10 5 L0 10 Z" fill={VIOLET} />
              </marker>
              <marker id="w4t-ml" viewBox="0 0 10 10" refX={8} refY={5} markerWidth={5} markerHeight={5} orient="auto">
                <path d="M10 0 L0 5 L10 10 Z" fill={VIOLET} />
              </marker>
            </defs>
            {content}
          </svg>
        </div>
      </div>
    )
  }
}

export const TorsionDiagramsExampleAnimation = createTorsionDiagramsAnimation(exampleTorsionDiagramsInputs)
