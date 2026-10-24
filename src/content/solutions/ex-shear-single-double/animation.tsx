import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const LOAD = '#ff6b45'
const PLANE = '#d94a3d'
const MUTED = '#87929d'
const INK = '#17202a'
const STRESS = '#a970dd'

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}
const ramp = (value: number, from: number, to: number) => clamp01((value - from) / (to - from))
const lerp = (from: number, to: number, t: number) => from + (to - from) * t

function Arrow({
  x1,
  y1,
  x2,
  y2,
  amount,
  color,
  width = 2.4,
}: {
  x1: number
  y1: number
  x2: number
  y2: number
  amount: number
  color: string
  width?: number
}) {
  const angle = Math.atan2(y2 - y1, x2 - x1)
  const head = 8
  const wing = 4
  const baseX = x2 - head * Math.cos(angle)
  const baseY = y2 - head * Math.sin(angle)
  const leftX = baseX - wing * Math.sin(angle)
  const leftY = baseY + wing * Math.cos(angle)
  const rightX = baseX + wing * Math.sin(angle)
  const rightY = baseY - wing * Math.cos(angle)
  return (
    <motion.g initial={false} animate={{ opacity: amount > 0.01 ? 1 : 0 }}>
      <motion.line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
        initial={false}
        animate={{ pathLength: clamp01(amount) }}
      />
      <motion.polygon
        points={`${x2},${y2} ${leftX},${leftY} ${rightX},${rightY}`}
        fill={color}
        initial={false}
        animate={{ opacity: amount > 0.3 ? 1 : 0 }}
      />
    </motion.g>
  )
}

const X0 = 104
const X1 = 356
const CX = 230
const TOP = 92
const SHEAR_1 = 122
const SHEAR_2 = 152
const BOTTOM = 182
const PLATE = 30

function ShearPlane({ y, amount }: { y: number; amount: number }) {
  return (
    <motion.g initial={false} animate={{ opacity: amount }}>
      <line
        x1={X0 - 6}
        y1={y}
        x2={X1 + 6}
        y2={y}
        stroke={PLANE}
        strokeWidth={1.2}
        strokeDasharray="5 4"
        opacity={0.55}
      />
      <line x1={CX - 17} y1={y} x2={CX + 17} y2={y} stroke={PLANE} strokeWidth={3} strokeLinecap="round" />
    </motion.g>
  )
}

function DoubleShearJoint({
  planeAmount,
  forceAmount,
  showReactions = true,
  showPinDim = false,
}: {
  planeAmount: number
  forceAmount: number
  showReactions?: boolean
  showPinDim?: boolean
}) {
  return (
    <g>
      <rect x={X0} y={TOP} width={X1 - X0} height={PLATE} fill="#f2f5fa" stroke="#7d8fa5" strokeWidth={1.3} />
      <rect x={X0} y={SHEAR_1} width={X1 - X0} height={PLATE} fill="#e8edf5" stroke="#7d8fa5" strokeWidth={1.3} />
      <rect x={X0} y={SHEAR_2} width={X1 - X0} height={PLATE} fill="#f2f5fa" stroke="#7d8fa5" strokeWidth={1.3} />
      <rect
        x={CX - 11}
        y={TOP - 10}
        width={22}
        height={BOTTOM - TOP + 20}
        rx={6}
        fill="#d7dee8"
        stroke="#5f6b77"
        strokeWidth={1.4}
      />
      <ShearPlane y={SHEAR_1} amount={planeAmount} />
      <ShearPlane y={SHEAR_2} amount={planeAmount} />

      <text x={X0 + 6} y={TOP - 6} fontSize={8.5} fill={MUTED}>
        nakładka
      </text>
      <text x={X0 + 6} y={SHEAR_1 + 18} fontSize={8.5} fill={MUTED}>
        blacha środkowa
      </text>
      <text x={X0 + 6} y={BOTTOM + 12} fontSize={8.5} fill={MUTED}>
        nakładka
      </text>

      <motion.g initial={false} animate={{ opacity: forceAmount }}>
        <Arrow
          x1={X1 + 2}
          y1={SHEAR_1 + 15}
          x2={X1 + 48}
          y2={SHEAR_1 + 15}
          amount={forceAmount}
          color={LOAD}
          width={2.6}
        />
        <text x={X1 + 26} y={SHEAR_1 + 7} textAnchor="middle" fontSize={9} fontWeight={700} fill={LOAD}>
          F = 100 kN
        </text>
      </motion.g>

      {showReactions && (
        <motion.g initial={false} animate={{ opacity: forceAmount }}>
          <Arrow x1={X0 - 2} y1={TOP + 15} x2={X0 - 40} y2={TOP + 15} amount={forceAmount} color={ACCENT} width={2.2} />
          <Arrow
            x1={X0 - 2}
            y1={SHEAR_2 + 15}
            x2={X0 - 40}
            y2={SHEAR_2 + 15}
            amount={forceAmount}
            color={ACCENT}
            width={2.2}
          />
          <text x={X0 - 20} y={TOP + 8} textAnchor="middle" fontSize={8.5} fill={ACCENT}>
            F/2
          </text>
          <text x={X0 - 20} y={SHEAR_2 + 10} textAnchor="middle" fontSize={8.5} fill={ACCENT}>
            F/2
          </text>
        </motion.g>
      )}

      {planeAmount > 0.2 && (
        <g>
          <circle cx={CX + 22} cy={SHEAR_1} r={8} fill={PLANE} opacity={planeAmount} />
          <text x={CX + 22} y={SHEAR_1 + 3} textAnchor="middle" fontSize={8.5} fontWeight={700} fill="#fff">
            1
          </text>
          <circle cx={CX + 22} cy={SHEAR_2} r={8} fill={PLANE} opacity={planeAmount} />
          <text x={CX + 22} y={SHEAR_2 + 3} textAnchor="middle" fontSize={8.5} fontWeight={700} fill="#fff">
            2
          </text>
        </g>
      )}

      {showPinDim && (
        <g stroke={INK} fill={INK}>
          <line x1={CX - 11} y1={BOTTOM + 22} x2={CX + 11} y2={BOTTOM + 22} strokeWidth={1.1} />
          <line x1={CX - 11} y1={BOTTOM + 17} x2={CX - 11} y2={BOTTOM + 27} strokeWidth={1.1} />
          <line x1={CX + 11} y1={BOTTOM + 17} x2={CX + 11} y2={BOTTOM + 27} strokeWidth={1.1} />
          <text x={CX + 18} y={BOTTOM + 26} fontSize={8.5} stroke="none">
            d = 20 mm
          </text>
        </g>
      )}
    </g>
  )
}

function MiniSingleShear({ reveal }: { reveal: number }) {
  const x0 = 38
  const x1 = 200
  const cx = 119
  return (
    <motion.g initial={false} animate={{ opacity: reveal }}>
      <rect x={x0} y={88} width={x1 - x0} height={28} fill="#f2f5fa" stroke="#7d8fa5" strokeWidth={1.2} />
      <rect x={x0} y={116} width={x1 - x0} height={28} fill="#e8edf5" stroke="#7d8fa5" strokeWidth={1.2} />
      <rect x={cx - 6} y={76} width={12} height={72} rx={4} fill="#d7dee8" stroke="#5f6b77" strokeWidth={1.2} />
      <line x1={cx - 12} y1={116} x2={cx + 12} y2={116} stroke={PLANE} strokeWidth={2.6} />
      <line
        x1={x0 - 4}
        y1={116}
        x2={x1 + 4}
        y2={116}
        stroke={PLANE}
        strokeWidth={1.1}
        strokeDasharray="4 3"
        opacity={0.55}
      />
      <Arrow x1={x1 + 2} y1={102} x2={x1 + 30} y2={102} amount={reveal} color={LOAD} width={2} />
      <Arrow x1={x0 - 2} y1={130} x2={x0 - 30} y2={130} amount={reveal} color={ACCENT} width={2} />
      <text x={cx} y={168} textAnchor="middle" fontSize={9} fontWeight={700} fill={INK}>
        jednocięte
      </text>
      <circle cx={cx} cy={188} r={11} fill={PLANE} />
      <text x={cx} y={191} textAnchor="middle" fontSize={9} fontWeight={700} fill="#fff">
        1
      </text>
      <text x={cx + 18} y={191} fontSize={8.5} fill={MUTED}>
        płaszczyzna
      </text>
    </motion.g>
  )
}

function MiniDoubleShear({ reveal }: { reveal: number }) {
  const x0 = 260
  const x1 = 422
  const cx = 341
  return (
    <motion.g initial={false} animate={{ opacity: reveal }}>
      <rect x={x0} y={82} width={x1 - x0} height={24} fill="#f2f5fa" stroke="#7d8fa5" strokeWidth={1.2} />
      <rect x={x0} y={106} width={x1 - x0} height={24} fill="#e8edf5" stroke="#7d8fa5" strokeWidth={1.2} />
      <rect x={x0} y={130} width={x1 - x0} height={24} fill="#f2f5fa" stroke="#7d8fa5" strokeWidth={1.2} />
      <rect x={cx - 6} y={70} width={12} height={96} rx={4} fill="#d7dee8" stroke="#5f6b77" strokeWidth={1.2} />
      <line x1={cx - 12} y1={106} x2={cx + 12} y2={106} stroke={PLANE} strokeWidth={2.6} />
      <line x1={cx - 12} y1={130} x2={cx + 12} y2={130} stroke={PLANE} strokeWidth={2.6} />
      <line
        x1={x0 - 4}
        y1={106}
        x2={x1 + 4}
        y2={106}
        stroke={PLANE}
        strokeWidth={1.1}
        strokeDasharray="4 3"
        opacity={0.55}
      />
      <line
        x1={x0 - 4}
        y1={130}
        x2={x1 + 4}
        y2={130}
        stroke={PLANE}
        strokeWidth={1.1}
        strokeDasharray="4 3"
        opacity={0.55}
      />
      <Arrow x1={x1 + 2} y1={118} x2={x1 + 30} y2={118} amount={reveal} color={LOAD} width={2} />
      <Arrow x1={x0 - 2} y1={94} x2={x0 - 28} y2={94} amount={reveal} color={ACCENT} width={1.8} />
      <Arrow x1={x0 - 2} y1={142} x2={x0 - 28} y2={142} amount={reveal} color={ACCENT} width={1.8} />
      <text x={cx} y={182} textAnchor="middle" fontSize={9} fontWeight={700} fill={INK}>
        dwucięte
      </text>
      <circle cx={cx} cy={202} r={11} fill={PLANE} />
      <text x={cx} y={205} textAnchor="middle" fontSize={9} fontWeight={700} fill="#fff">
        2
      </text>
      <text x={cx + 18} y={205} fontSize={8.5} fill={MUTED}>
        płaszczyzny
      </text>
    </motion.g>
  )
}

function AreaComparison({ reveal }: { reveal: number }) {
  const leftRadius = 50 * smooth(ramp(reveal, 0, 0.3))
  const split = smooth(ramp(reveal, 0.35, 0.85))
  const discRadius = lerp(50, 44, split)
  const cyTop = lerp(140, 105, split)
  const cyBottom = lerp(140, 185, split)
  return (
    <g>
      <motion.circle
        cx={130}
        cy={140}
        r={Math.max(1, leftRadius)}
        fill={ACCENT}
        fillOpacity={0.12}
        stroke={ACCENT}
        strokeWidth={1.8}
        initial={false}
        animate={{ r: Math.max(1, leftRadius), opacity: leftRadius > 2 ? 1 : 0 }}
      />
      <motion.text
        x={130}
        y={144}
        textAnchor="middle"
        fontSize={13}
        fontWeight={700}
        fill={ACCENT}
        initial={false}
        animate={{ opacity: leftRadius > 20 ? 1 : 0 }}
      >
        A
      </motion.text>
      <text x={130} y={214} textAnchor="middle" fontSize={9} fill={MUTED}>
        jeden przekrój
      </text>
      <text x={130} y={228} textAnchor="middle" fontSize={9} fontWeight={700} fill={INK}>
        A_s = A
      </text>

      <motion.circle
        cx={305}
        cy={cyTop}
        r={discRadius}
        fill={ACCENT}
        fillOpacity={0.12}
        stroke={ACCENT}
        strokeWidth={1.8}
        initial={false}
        animate={{ cx: 305, cy: cyTop, r: discRadius, opacity: reveal > 0.3 ? 1 : 0 }}
      />
      <motion.circle
        cx={305}
        cy={cyBottom}
        r={discRadius}
        fill={ACCENT}
        fillOpacity={0.12}
        stroke={ACCENT}
        strokeWidth={1.8}
        initial={false}
        animate={{ cx: 305, cy: cyBottom, r: discRadius, opacity: reveal > 0.3 ? 1 : 0 }}
      />
      <motion.text
        x={305}
        y={cyTop + 4}
        textAnchor="middle"
        fontSize={12}
        fontWeight={700}
        fill={ACCENT}
        initial={false}
        animate={{ opacity: reveal > 0.55 ? 1 : 0 }}
      >
        A
      </motion.text>
      <motion.text
        x={305}
        y={cyBottom + 4}
        textAnchor="middle"
        fontSize={12}
        fontWeight={700}
        fill={ACCENT}
        initial={false}
        animate={{ opacity: reveal > 0.55 ? 1 : 0 }}
      >
        A
      </motion.text>

      <motion.g initial={false} animate={{ opacity: reveal > 0.72 ? 1 : 0 }}>
        <path d="M360 88 L368 88 L368 204 L360 204" fill="none" stroke={MUTED} strokeWidth={1.1} />
        <text x={374} y={150} fontSize={10} fontWeight={700} fill={INK}>
          2A
        </text>
        <text x={356} y={240} textAnchor="middle" fontSize={9} fill={MUTED}>
          dwa przekroje
        </text>
        <text x={356} y={254} textAnchor="middle" fontSize={9} fontWeight={700} fill={INK}>
          A_s = 2A
        </text>
      </motion.g>
    </g>
  )
}

function ForceSplit({ reveal }: { reveal: number }) {
  const splitAmount = smooth(ramp(reveal, 0.15, 0.65))
  return (
    <g>
      <rect x={100} y={116} width={260} height={48} rx={4} fill="#e8edf5" stroke="#7d8fa5" strokeWidth={1.4} />
      <line x1={96} y1={116} x2={364} y2={116} stroke={PLANE} strokeWidth={2.2} />
      <line x1={96} y1={164} x2={364} y2={164} stroke={PLANE} strokeWidth={2.2} />
      <line x1={230} y1={104} x2={230} y2={176} stroke="#9aa5b1" strokeWidth={1} strokeDasharray="4 3" />
      <text x={230} y={144} textAnchor="middle" fontSize={9} fill={MUTED}>
        blacha środkowa
      </text>
      <text x={230} y={96} textAnchor="middle" fontSize={9} fill={MUTED}>
        górna płaszczyzna
      </text>
      <text x={230} y={182} textAnchor="middle" fontSize={9} fill={MUTED}>
        dolna płaszczyzna
      </text>

      <Arrow x1={362} y1={140} x2={414} y2={140} amount={smooth(ramp(reveal, 0, 0.3))} color={LOAD} width={2.8} />
      <text x={388} y={132} textAnchor="middle" fontSize={9} fontWeight={700} fill={LOAD}>
        F = 100 kN
      </text>

      <Arrow x1={300} y1={128} x2={244} y2={128} amount={splitAmount} color={PLANE} width={2.6} />
      <Arrow x1={300} y1={152} x2={244} y2={152} amount={splitAmount} color={PLANE} width={2.6} />
      <motion.text
        x={272}
        y={121}
        textAnchor="middle"
        fontSize={9}
        fontWeight={700}
        fill={PLANE}
        initial={false}
        animate={{ opacity: splitAmount > 0.4 ? 1 : 0 }}
      >
        F_p = 50 kN
      </motion.text>
      <motion.text
        x={272}
        y={171}
        textAnchor="middle"
        fontSize={9}
        fontWeight={700}
        fill={PLANE}
        initial={false}
        animate={{ opacity: splitAmount > 0.4 ? 1 : 0 }}
      >
        F_p = 50 kN
      </motion.text>

      <motion.text
        x={230}
        y={220}
        textAnchor="middle"
        fontSize={9.5}
        fill={MUTED}
        initial={false}
        animate={{ opacity: splitAmount > 0.6 ? 1 : 0 }}
      >
        dwie płaszczyzny → połowa siły na każdą
      </motion.text>
    </g>
  )
}

function StressPlanes({ reveal }: { reveal: number }) {
  const discIn = smooth(ramp(reveal, 0, 0.45))
  const ghostIn = smooth(ramp(reveal, 0.4, 0.8))
  return (
    <g>
      {[130, 245].map((cx, index) => (
        <g key={cx}>
          <motion.circle
            cx={cx}
            cy={128}
            r={45}
            fill="#f5f7fc"
            stroke={STRESS}
            strokeWidth={1.8}
            initial={false}
            animate={{ opacity: discIn }}
          />
          {[-24, -12, 0, 12, 24].map((offset) => (
            <Arrow
              key={offset}
              x1={cx - 28}
              y1={128 + offset}
              x2={cx + 30}
              y2={128 + offset}
              amount={discIn}
              color={STRESS}
              width={1.4}
            />
          ))}
          <text x={cx} y={190} textAnchor="middle" fontSize={8.5} fill={MUTED}>
            płaszczyzna {index + 1}
          </text>
        </g>
      ))}
      <motion.text
        x={188}
        y={214}
        textAnchor="middle"
        fontSize={10}
        fontWeight={700}
        fill={STRESS}
        initial={false}
        animate={{ opacity: discIn > 0.5 ? 1 : 0 }}
      >
        τ_sr = 159 MPa na każdej płaszczyźnie
      </motion.text>

      <motion.g initial={false} animate={{ opacity: ghostIn }}>
        <circle cx={378} cy={128} r={50} fill="none" stroke={MUTED} strokeWidth={1.3} strokeDasharray="6 4" />
        <line x1={352} y1={128} x2={404} y2={128} stroke={MUTED} strokeWidth={1} strokeDasharray="4 3" />
        <text x={378} y={120} textAnchor="middle" fontSize={9} fontWeight={700} fill={MUTED}>
          jednocięte
        </text>
        <text x={378} y={140} textAnchor="middle" fontSize={8.5} fill={MUTED}>
          τ = 318 MPa
        </text>
        <text x={378} y={196} textAnchor="middle" fontSize={8} fill={MUTED}>
          n = 1
        </text>
      </motion.g>
    </g>
  )
}

export function ShearSingleDoubleAnimation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const p = playing ? sceneProgress : 1

  const planeAmount = smooth(ramp(p, 0.18, 0.7))
  const forceAmount = smooth(ramp(p, 0, 0.35))
  const compareAmount = smooth(ramp(p, 0.1, 0.6))

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 300"
          role="img"
          aria-label="Połączenie sworzniowe: model trzech blach, dwie płaszczyzny ścinania, pola przekroju i podział siły"
        >
          {metric === 'model' && (
            <>
              <DoubleShearJoint planeAmount={planeAmount} forceAmount={forceAmount} showPinDim />
              <text x={230} y={286} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                trzy blachy, jeden sworzeń, dwa styki przenoszące siłę
              </text>
            </>
          )}

          {metric === 'planes' && (
            <>
              <text x={230} y={30} textAnchor="middle" fontSize={10} fill={INK}>
                liczba przecięć sworznia, nie liczba blach
              </text>
              <MiniSingleShear reveal={compareAmount} />
              <MiniDoubleShear reveal={smooth(ramp(p, 0.35, 0.85))} />
              <motion.text
                x={230}
                y={248}
                textAnchor="middle"
                fontSize={9.5}
                fill={MUTED}
                initial={false}
                animate={{ opacity: compareAmount > 0.5 ? 1 : 0 }}
              >
                dwa styki = dwie płaszczyzny = dwa przekroje do policzenia
              </motion.text>
              <motion.text
                x={230}
                y={268}
                textAnchor="middle"
                fontSize={10}
                fontWeight={700}
                fill={PLANE}
                initial={false}
                animate={{ opacity: compareAmount > 0.5 ? 1 : 0 }}
              >
                n = 2
              </motion.text>
            </>
          )}

          {metric === 'area' && (
            <>
              <text x={230} y={30} textAnchor="middle" fontSize={10} fill={INK}>
                pole jednego przekroju i łączne pole ścinania
              </text>
              <AreaComparison reveal={p} />
              <text x={230} y={286} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                pole A każdego przekroju; przy dwóch cięciach A_s = 2A
              </text>
            </>
          )}

          {metric === 'stress' && (
            <>
              <text x={230} y={30} textAnchor="middle" fontSize={10} fill={INK}>
                to samo F działa na dwa przekroje zamiast jednego
              </text>
              <StressPlanes reveal={p} />
            </>
          )}

          {metric === 'load' && <ForceSplit reveal={p} />}

          {metric !== 'model' &&
            metric !== 'load' &&
            metric !== 'planes' &&
            metric !== 'area' &&
            metric !== 'stress' && <DoubleShearJoint planeAmount={planeAmount} forceAmount={forceAmount} />}
        </svg>
      </div>
    </div>
  )
}
