import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const LOAD = '#ff6b45'
const PLANE = '#d94a3d'
const MUTED = '#87929d'
const INK = '#17202a'
const LIMIT = '#2f7d5b'
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

function DoubleShearJoint({ planeAmount = 1 }: { planeAmount?: number }) {
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
      {[SHEAR_1, SHEAR_2].map((y) => (
        <motion.g key={y} initial={false} animate={{ opacity: planeAmount }}>
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
          <line x1={CX - 15} y1={y} x2={CX + 15} y2={y} stroke={PLANE} strokeWidth={2.8} strokeLinecap="round" />
        </motion.g>
      ))}
      <Arrow x1={X1 + 2} y1={SHEAR_1 + 15} x2={X1 + 46} y2={SHEAR_1 + 15} amount={1} color={LOAD} width={2.6} />
      <text x={X1 + 24} y={SHEAR_1 + 7} textAnchor="middle" fontSize={9} fontWeight={700} fill={LOAD}>
        F = 90 kN
      </text>
      <Arrow x1={X0 - 2} y1={TOP + 15} x2={X0 - 38} y2={TOP + 15} amount={1} color={ACCENT} width={2} />
      <Arrow x1={X0 - 2} y1={SHEAR_2 + 15} x2={X0 - 38} y2={SHEAR_2 + 15} amount={1} color={ACCENT} width={2} />
      <text x={X0 - 20} y={TOP + 8} textAnchor="middle" fontSize={8.5} fill={ACCENT}>
        F/2
      </text>
      <text x={X0 - 20} y={SHEAR_2 + 10} textAnchor="middle" fontSize={8.5} fill={ACCENT}>
        F/2
      </text>
      <text x={X0 + 6} y={TOP - 6} fontSize={8.5} fill={MUTED}>
        nakładka
      </text>
      <text x={X0 + 6} y={SHEAR_1 + 18} fontSize={8.5} fill={MUTED}>
        blacha środkowa
      </text>
      <text x={X0 + 6} y={BOTTOM + 12} fontSize={8.5} fill={MUTED}>
        nakładka
      </text>
    </g>
  )
}

function RequiredArea({ progress }: { progress: number }) {
  const fill = smooth(ramp(progress, 0.05, 0.82))
  const areaWidth = 200 * fill
  return (
    <g>
      <text x={230} y={38} textAnchor="middle" fontSize={10} fill={INK}>
        wymagane łączne pole ścinania
      </text>
      <Arrow x1={64} y1={145} x2={124} y2={145} amount={smooth(ramp(progress, 0, 0.35))} color={LOAD} width={2.8} />
      <text x={94} y={134} textAnchor="middle" fontSize={9} fontWeight={700} fill={LOAD}>
        F = 90 kN
      </text>
      <rect
        x={130}
        y={105}
        width={200}
        height={80}
        rx={4}
        fill="none"
        stroke={ACCENT}
        strokeWidth={1.4}
        strokeDasharray="6 4"
      />
      <motion.rect
        x={130}
        y={105}
        height={80}
        rx={4}
        fill={ACCENT}
        fillOpacity={0.14}
        initial={false}
        animate={{ width: Math.max(1, areaWidth), opacity: fill > 0.02 ? 1 : 0 }}
      />
      <motion.text
        x={230}
        y={150}
        textAnchor="middle"
        fontSize={12}
        fontWeight={700}
        fill={ACCENT}
        initial={false}
        animate={{ opacity: fill > 0.4 ? 1 : 0 }}
      >
        A_s,min
      </motion.text>
      <text x={230} y={202} textAnchor="middle" fontSize={9} fill={MUTED}>
        pole potrzebne, by nie przekroczyć τ_dop
      </text>
      <line x1={360} y1={95} x2={360} y2={195} stroke={LIMIT} strokeWidth={1.4} />
      <line x1={354} y1={95} x2={366} y2={95} stroke={LIMIT} strokeWidth={1.4} />
      <text x={370} y={99} fontSize={8.5} fill={LIMIT}>
        τ_dop = 120 MPa
      </text>
      <text x={230} y={236} textAnchor="middle" fontSize={10} fontWeight={700} fill={INK}>
        to jeszcze pole całkowite
      </text>
      <text x={230} y={254} textAnchor="middle" fontSize={9} fill={MUTED}>
        dopiero potem dzielimy je na płaszczyzny
      </text>
    </g>
  )
}

function PlaneSplit({ progress }: { progress: number }) {
  const leftIn = smooth(ramp(progress, 0, 0.28))
  const split = smooth(ramp(progress, 0.32, 0.88))
  const radius = lerp(56, 40, split)
  const cxLeft = lerp(325, 278, split)
  const cxRight = lerp(325, 372, split)
  return (
    <g>
      <text x={230} y={36} textAnchor="middle" fontSize={10} fill={INK}>
        to samo pole A_s można rozłożyć na jedną lub dwie płaszczyzny
      </text>

      <motion.g initial={false} animate={{ opacity: leftIn }}>
        <circle
          cx={120}
          cy={142}
          r={54}
          fill={MUTED}
          fillOpacity={0.07}
          stroke={MUTED}
          strokeWidth={1.4}
          strokeDasharray="6 4"
        />
        <text x={120} y={147} textAnchor="middle" fontSize={12} fontWeight={700} fill={MUTED}>
          A
        </text>
        <text x={120} y={212} textAnchor="middle" fontSize={9} fontWeight={700} fill={MUTED}>
          jednocięte
        </text>
        <text x={120} y={226} textAnchor="middle" fontSize={9} fill={MUTED}>
          n = 1, A_s = A
        </text>
        <text x={120} y={242} textAnchor="middle" fontSize={8.5} fill={MUTED}>
          całe pole na jednym przekroju
        </text>
      </motion.g>

      <motion.g initial={false} animate={{ opacity: smooth(ramp(progress, 0.25, 0.55)) }}>
        <motion.circle
          cx={cxLeft}
          cy={142}
          fill={ACCENT}
          fillOpacity={0.12}
          stroke={ACCENT}
          strokeWidth={1.8}
          initial={false}
          animate={{ cx: cxLeft, r: radius }}
        />
        <motion.circle
          cx={cxRight}
          cy={142}
          fill={ACCENT}
          fillOpacity={0.12}
          stroke={ACCENT}
          strokeWidth={1.8}
          initial={false}
          animate={{ cx: cxRight, r: radius }}
        />
        <text x={cxLeft} y={146} textAnchor="middle" fontSize={11} fontWeight={700} fill={ACCENT}>
          A
        </text>
        <text x={cxRight} y={146} textAnchor="middle" fontSize={11} fontWeight={700} fill={ACCENT}>
          A
        </text>
        <text x={325} y={212} textAnchor="middle" fontSize={9} fontWeight={700} fill={ACCENT}>
          dwucięte
        </text>
        <text x={325} y={226} textAnchor="middle" fontSize={9} fill={ACCENT}>
          n = 2, A_s = 2A
        </text>
        <text x={325} y={242} textAnchor="middle" fontSize={8.5} fill={MUTED}>
          połowa pola na każdym przekroju
        </text>
      </motion.g>

      <motion.g initial={false} animate={{ opacity: split > 0.6 ? 1 : 0 }}>
        <text x={325} y={76} textAnchor="middle" fontSize={8.5} fill={MUTED}>
          A ≥ 375 mm²
        </text>
        <text x={325} y={90} textAnchor="middle" fontSize={8.5} fill={MUTED}>
          na każdą płaszczyznę
        </text>
      </motion.g>
    </g>
  )
}

function RequiredDiameter({ progress }: { progress: number }) {
  const grow = smooth(ramp(progress, 0.08, 0.86))
  const radius = lerp(20, 64, grow)
  return (
    <g>
      <text x={230} y={34} textAnchor="middle" fontSize={10} fill={INK}>
        z pola przekroju wyznaczamy średnicę
      </text>
      <motion.circle
        cx={230}
        cy={136}
        fill={ACCENT}
        fillOpacity={0.12}
        stroke={ACCENT}
        strokeWidth={2}
        initial={false}
        animate={{ r: radius }}
      />
      <line x1={230} y1={64} x2={230} y2={208} stroke="#c9d0d9" strokeWidth={1} strokeDasharray="5 4" />
      <line
        x1={230 - radius}
        y1={136}
        x2={230 + radius}
        y2={136}
        stroke="#c9d0d9"
        strokeWidth={1}
        strokeDasharray="5 4"
      />
      <motion.text
        x={230}
        y={140}
        textAnchor="middle"
        fontSize={12}
        fontWeight={700}
        fill={ACCENT}
        initial={false}
        animate={{ opacity: grow > 0.4 ? 1 : 0 }}
      >
        A
      </motion.text>

      <g stroke={INK} fill={INK}>
        <line x1={230 - radius} y1={224} x2={230 + radius} y2={224} strokeWidth={1.1} />
        <line x1={230 - radius} y1={218} x2={230 - radius} y2={230} strokeWidth={1.1} />
        <line x1={230 + radius} y1={218} x2={230 + radius} y2={230} strokeWidth={1.1} />
        <motion.text
          x={230}
          y={244}
          textAnchor="middle"
          fontSize={10}
          fontWeight={700}
          stroke="none"
          initial={false}
          animate={{ opacity: grow > 0.7 ? 1 : 0 }}
        >
          d_min = 21,85 mm
        </motion.text>
      </g>

      <text x={230} y={272} textAnchor="middle" fontSize={9} fill={MUTED}>
        pole jednego przekroju A
      </text>
      <text x={230} y={290} textAnchor="middle" fontSize={8.5} fill={MUTED}>
        wymagane A ≥ 375 mm²
      </text>
    </g>
  )
}

function StressCheck({ progress }: { progress: number }) {
  const fill = smooth(ramp(progress, 0.08, 0.82))
  const ratio = 118.38 / 120
  const barHeight = 150 * ratio * fill
  return (
    <g>
      <text x={230} y={34} textAnchor="middle" fontSize={10} fill={INK}>
        dobrana średnica 22 mm i kontrola naprężenia
      </text>

      {[82, 172].map((cx, index) => (
        <g key={cx}>
          <circle cx={cx} cy={128} r={38} fill="#f5f7fc" stroke={STRESS} strokeWidth={1.6} />
          {[-16, -8, 0, 8, 16].map((offset) => (
            <line
              key={offset}
              x1={cx - 27}
              y1={128 + offset}
              x2={cx + 27}
              y2={128 + offset}
              stroke={STRESS}
              strokeWidth={1.3}
            />
          ))}
          <text x={cx} y={132} textAnchor="middle" fontSize={10} fontWeight={700} fill={STRESS}>
            A
          </text>
          <text x={cx} y={184} textAnchor="middle" fontSize={8} fill={MUTED}>
            płaszczyzna {index + 1}
          </text>
        </g>
      ))}
      <text x={127} y={218} textAnchor="middle" fontSize={9} fontWeight={700} fill={INK}>
        2A = 760,27 mm²
      </text>
      <text x={127} y={234} textAnchor="middle" fontSize={9} fill={MUTED}>
        d = 22 mm, A = 380,13 mm²
      </text>

      <rect x={330} y={70} width={44} height={150} rx={3} fill="#f2f5fa" stroke="#aeb8c4" strokeWidth={1.2} />
      <motion.rect
        x={330}
        width={44}
        rx={3}
        fill={STRESS}
        fillOpacity={0.55}
        initial={false}
        animate={{ y: 220 - barHeight, height: Math.max(1, barHeight) }}
      />
      <line x1={324} y1={70} x2={380} y2={70} stroke={PLANE} strokeWidth={1.8} />
      <text x={388} y={73} fontSize={8.5} fill={PLANE}>
        τ_dop
      </text>
      <text x={352} y={62} textAnchor="middle" fontSize={8.5} fill={MUTED}>
        MPa
      </text>
      <motion.text
        x={352}
        y={88}
        textAnchor="middle"
        fontSize={8.5}
        fontWeight={700}
        fill="#fff"
        initial={false}
        animate={{ opacity: fill > 0.8 ? 1 : 0 }}
      >
        118,4
      </motion.text>
      <text x={352} y={236} textAnchor="middle" fontSize={9} fill={MUTED}>
        τ_sr
      </text>
      <text x={352} y={252} textAnchor="middle" fontSize={9} fontWeight={700} fill={LIMIT}>
        &lt; 120 MPa
      </text>

      <text x={230} y={292} textAnchor="middle" fontSize={9} fill={MUTED}>
        warunek wytrzymałości jest spełniony
      </text>
    </g>
  )
}

export function ShearDesignAnimation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const p = playing ? sceneProgress : 1

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 300"
          role="img"
          aria-label="Projektowanie sworznia dwuciętego: model, wymagane pole, podział na dwie płaszczyzny, średnica i kontrola naprężenia"
        >
          {metric === 'model' && (
            <>
              <DoubleShearJoint planeAmount={smooth(ramp(p, 0.2, 0.75))} />
              <motion.text
                x={CX + 22}
                y={TOP - 4}
                fontSize={13}
                fontWeight={700}
                fill={PLANE}
                initial={false}
                animate={{ opacity: playing ? [0.4, 1, 0.4] : 1 }}
                transition={{ duration: 1.8, repeat: playing ? Infinity : 0, ease: 'easeInOut' }}
              >
                d = ?
              </motion.text>
              <text x={230} y={222} textAnchor="middle" fontSize={9.5} fontWeight={700} fill={LOAD}>
                τ_dop = 120 MPa
              </text>
              <text x={230} y={240} textAnchor="middle" fontSize={9} fill={MUTED}>
                sworzeń dwucięty, dwie płaszczyzny ścinania
              </text>
              <text x={230} y={258} textAnchor="middle" fontSize={9} fill={MUTED}>
                szukamy średnicy d, nie naprężenia
              </text>
            </>
          )}

          {metric === 'area' && <RequiredArea progress={p} />}

          {metric === 'planes' && <PlaneSplit progress={p} />}

          {metric === 'diameter' && <RequiredDiameter progress={p} />}

          {metric === 'check' && <StressCheck progress={p} />}

          {!['model', 'area', 'planes', 'diameter', 'check'].includes(metric) && (
            <>
              <DoubleShearJoint />
              <text x={230} y={230} textAnchor="middle" fontSize={9.5} fill={MUTED}>
                n = 2, więc A_s = 2A
              </text>
            </>
          )}
        </svg>
      </div>
    </div>
  )
}
