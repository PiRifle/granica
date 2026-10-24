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
  const head = 7
  const wing = 3.6
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

const X0 = 60
const X1 = 380
const TOP = 100
const SHEAR_1 = 128
const SHEAR_2 = 156
const BOTTOM = 184
const PINS = [116, 192, 268, 344]
const PIN_W = 16

function JointBase({ faded = false }: { faded?: boolean }) {
  return (
    <g opacity={faded ? 0.45 : 1}>
      <rect x={X0} y={TOP} width={X1 - X0} height={28} fill="#f2f5fa" stroke="#7d8fa5" strokeWidth={1.2} />
      <rect x={X0} y={SHEAR_1} width={X1 - X0} height={28} fill="#e8edf5" stroke="#7d8fa5" strokeWidth={1.2} />
      <rect x={X0} y={SHEAR_2} width={X1 - X0} height={28} fill="#f2f5fa" stroke="#7d8fa5" strokeWidth={1.2} />
      {PINS.map((cx) => (
        <rect
          key={cx}
          x={cx - PIN_W / 2}
          y={TOP - 9}
          width={PIN_W}
          height={BOTTOM - TOP + 18}
          rx={4}
          fill="#d7dee8"
          stroke="#5f6b77"
          strokeWidth={1.1}
        />
      ))}
      <line
        x1={X0 - 4}
        y1={SHEAR_1}
        x2={X1 + 4}
        y2={SHEAR_1}
        stroke={PLANE}
        strokeWidth={1}
        strokeDasharray="5 4"
        opacity={0.35}
      />
      <line
        x1={X0 - 4}
        y1={SHEAR_2}
        x2={X1 + 4}
        y2={SHEAR_2}
        stroke={PLANE}
        strokeWidth={1}
        strokeDasharray="5 4"
        opacity={0.35}
      />
    </g>
  )
}

function PlaneCount({ progress }: { progress: number }) {
  return (
    <g>
      {PINS.map((cx, pinIndex) =>
        [SHEAR_1, SHEAR_2].map((y, planeIndex) => {
          const order = pinIndex * 2 + planeIndex
          const reveal = smooth(ramp(progress, 0.06 + order * 0.095, 0.2 + order * 0.095))
          return (
            <motion.g key={`${cx}-${y}`} initial={false} animate={{ opacity: reveal }}>
              <line
                x1={cx - PIN_W / 2 - 7}
                y1={y}
                x2={cx + PIN_W / 2 + 7}
                y2={y}
                stroke={PLANE}
                strokeWidth={2.6}
                strokeLinecap="round"
              />
              <motion.circle
                cx={cx + PIN_W / 2 + 13}
                cy={y}
                r={6.5}
                fill={PLANE}
                initial={false}
                animate={{ scale: reveal > 0.55 ? 1 : 0.3 }}
                style={{ transformOrigin: `${cx + PIN_W / 2 + 13}px ${y}px` }}
              />
              <text x={cx + PIN_W / 2 + 13} y={y + 2.6} textAnchor="middle" fontSize={7} fontWeight={700} fill="#fff">
                {order + 1}
              </text>
            </motion.g>
          )
        }),
      )}
      <text x={230} y={42} textAnchor="middle" fontSize={10} fill={INK}>
        każdy nit jest przecięty w dwóch miejscach
      </text>
      <text x={230} y={62} textAnchor="middle" fontSize={9.5} fill={MUTED}>
        m = 4 nity, n = 2 cięcia na nit
      </text>
      <motion.g initial={false} animate={{ opacity: progress > 0.75 ? 1 : 0.25 }}>
        <text x={230} y={238} textAnchor="middle" fontSize={11} fontWeight={700} fill={PLANE}>
          osiem płaszczyzn ścinania
        </text>
      </motion.g>
    </g>
  )
}

function AreaDiscs({ progress }: { progress: number }) {
  return (
    <g>
      {Array.from({ length: 8 }, (_, index) => {
        const cx = 80 + (index % 4) * 95
        const cy = index < 4 ? 105 : 190
        const reveal = smooth(ramp(progress, 0.05 + index * 0.085, 0.22 + index * 0.085))
        return (
          <motion.g
            key={index}
            initial={false}
            animate={{ opacity: reveal }}
            style={{ transformOrigin: `${cx}px ${cy}px` }}
          >
            <motion.circle
              cx={cx}
              cy={cy}
              r={30}
              fill={ACCENT}
              fillOpacity={0.12}
              stroke={ACCENT}
              strokeWidth={1.6}
              initial={false}
              animate={{ scale: reveal > 0.3 ? 1 : 0.4 }}
              style={{ transformOrigin: `${cx}px ${cy}px` }}
            />
            <text x={cx} y={cy + 4} textAnchor="middle" fontSize={12} fontWeight={700} fill={ACCENT}>
              A
            </text>
          </motion.g>
        )
      })}
      <text x={230} y={44} textAnchor="middle" fontSize={10} fill={INK}>
        jedno pole A na każdy z ośmiu przekrojów
      </text>
      <motion.g initial={false} animate={{ opacity: progress > 0.72 ? 1 : 0.3 }}>
        <path d="M56 244 L56 252 L404 252 L404 244" fill="none" stroke={MUTED} strokeWidth={1.2} />
        <text x={230} y={270} textAnchor="middle" fontSize={10} fontWeight={700} fill={INK}>
          A_s = 8A
        </text>
        <text x={230} y={286} textAnchor="middle" fontSize={8.5} fill={MUTED}>
          osiem pól trafia do mianownika wzoru
        </text>
      </motion.g>
    </g>
  )
}

function LoadSplit({ progress }: { progress: number }) {
  const perPin = smooth(ramp(progress, 0.1, 0.55))
  const perPlane = smooth(ramp(progress, 0.5, 0.9))
  return (
    <>
      <JointBase />
      <Arrow
        x1={X1 + 2}
        y1={SHEAR_1 + 14}
        x2={X1 + 46}
        y2={SHEAR_1 + 14}
        amount={smooth(ramp(progress, 0, 0.3))}
        color={LOAD}
        width={2.6}
      />
      <text x={X1 + 24} y={SHEAR_1 + 6} textAnchor="middle" fontSize={9} fontWeight={700} fill={LOAD}>
        F = 180 kN
      </text>

      {PINS.map((cx) => (
        <motion.g key={cx} initial={false} animate={{ opacity: perPin }}>
          <Arrow x1={cx - 22} y1={78} x2={cx + 22} y2={78} amount={perPin} color={LOAD} width={2.1} />
          <text x={cx} y={68} textAnchor="middle" fontSize={8.5} fill={LOAD}>
            45 kN
          </text>
        </motion.g>
      ))}

      <motion.g initial={false} animate={{ opacity: perPlane }}>
        <Arrow x1={126} y1={SHEAR_1} x2={154} y2={SHEAR_1} amount={perPlane} color={PLANE} width={2.2} />
        <Arrow x1={126} y1={SHEAR_2} x2={154} y2={SHEAR_2} amount={perPlane} color={PLANE} width={2.2} />
        <text x={158} y={SHEAR_1 - 5} fontSize={8} fill={PLANE}>
          F/8
        </text>
        <text x={158} y={SHEAR_2 + 12} fontSize={8} fill={PLANE}>
          F/8
        </text>
      </motion.g>

      <text x={230} y={224} textAnchor="middle" fontSize={9.5} fill={MUTED}>
        siła całkowita → 4 nity → 8 płaszczyzn
      </text>
      <text x={230} y={244} textAnchor="middle" fontSize={9.5} fontWeight={700} fill={INK}>
        22,5 kN na każdą z ośmiu płaszczyzn
      </text>
    </>
  )
}

function StressComparison({ progress }: { progress: number }) {
  const leftIn = smooth(ramp(progress, 0, 0.55))
  const rightIn = smooth(ramp(progress, 0.45, 0.9))
  return (
    <g>
      <text x={230} y={34} textAnchor="middle" fontSize={10} fill={INK}>
        te same nity, dwa razy więcej płaszczyzn
      </text>
      <text x={140} y={58} textAnchor="middle" fontSize={9} fontWeight={700} fill={ACCENT}>
        dwucięte: 8 płaszczyzn
      </text>
      <motion.g initial={false} animate={{ opacity: leftIn }}>
        {Array.from({ length: 8 }, (_, index) => {
          const cx = 56 + (index % 4) * 48
          const cy = index < 4 ? 86 : 146
          return (
            <g key={`d-${index}`}>
              <circle cx={cx} cy={cy} r={21} fill={ACCENT} fillOpacity={0.13} stroke={ACCENT} strokeWidth={1.4} />
              {[-10, 0, 10].map((offset) => (
                <line
                  key={offset}
                  x1={cx - 11}
                  y1={cy + offset}
                  x2={cx + 11}
                  y2={cy + offset}
                  stroke={STRESS}
                  strokeWidth={1.1}
                />
              ))}
            </g>
          )
        })}
        <text x={140} y={186} textAnchor="middle" fontSize={9} fontWeight={700} fill={INK}>
          A_s = 8A
        </text>
        <text x={140} y={200} textAnchor="middle" fontSize={9} fill={STRESS}>
          τ_sr = 88,4 MPa
        </text>
      </motion.g>

      <line x1={248} y1={64} x2={248} y2={212} stroke="#d3d9e0" strokeWidth={1} strokeDasharray="4 4" />
      <text x={368} y={58} textAnchor="middle" fontSize={9} fontWeight={700} fill={MUTED}>
        jednocięte: 4 płaszczyzny
      </text>
      <motion.g initial={false} animate={{ opacity: rightIn }}>
        {Array.from({ length: 4 }, (_, index) => {
          const cx = 298 + index * 46
          return (
            <g key={`s-${index}`}>
              <circle cx={cx} cy={112} r={19} fill="none" stroke={MUTED} strokeWidth={1.3} strokeDasharray="4 3" />
              {[-8, 0, 8].map((offset) => (
                <line
                  key={offset}
                  x1={cx - 10}
                  y1={112 + offset}
                  x2={cx + 10}
                  y2={112 + offset}
                  stroke={MUTED}
                  strokeWidth={1}
                />
              ))}
            </g>
          )
        })}
        <text x={368} y={148} textAnchor="middle" fontSize={9} fontWeight={700} fill={MUTED}>
          A_s = 4A
        </text>
        <text x={368} y={162} textAnchor="middle" fontSize={9} fill={MUTED}>
          τ = 176,8 MPa
        </text>
      </motion.g>

      <text x={230} y={236} textAnchor="middle" fontSize={9.5} fill={MUTED}>
        dwa razy więcej płaszczyzn → połowa naprężenia
      </text>
    </g>
  )
}

function UnevenDistribution({ progress }: { progress: number }) {
  const shares = [72, 58, 45, 34]
  const pulse = 0.8 + 0.2 * Math.sin(progress * Math.PI * 4)
  return (
    <>
      <JointBase faded />
      <text x={230} y={38} textAnchor="middle" fontSize={10} fill={INK}>
        rzeczywisty podział nie musi być równy
      </text>
      <text x={230} y={56} textAnchor="middle" fontSize={9} fill={MUTED}>
        model obliczeniowy zakłada F/m na nit
      </text>
      <line x1={64} y1={58} x2={396} y2={58} stroke="#d3d9e0" strokeWidth={1} strokeDasharray="4 4" />
      {PINS.map((cx, index) => {
        const length = shares[index]
        const y = 72 + index * 6
        return (
          <motion.g
            key={cx}
            initial={false}
            animate={{ opacity: smooth(ramp(progress, index * 0.13, index * 0.13 + 0.35)) }}
          >
            <line
              x1={cx - 28}
              y1={y}
              x2={cx - 28 + length}
              y2={y}
              stroke={LOAD}
              strokeWidth={3}
              strokeLinecap="round"
            />
            <polygon
              points={`${cx - 28 + length},${y} ${cx - 34 + length},${y - 4} ${cx - 34 + length},${y + 4}`}
              fill={LOAD}
            />
            <text x={cx - 33} y={y + 3} textAnchor="end" fontSize={8} fill={MUTED}>
              {index + 1}
            </text>
          </motion.g>
        )
      })}
      <motion.g initial={false} animate={{ opacity: smooth(ramp(progress, 0.4, 0.9)) }}>
        <text x={230} y={216} textAnchor="middle" fontSize={9.5} fontWeight={700} fill={LOAD} opacity={pulse}>
          pierwszy rząd przenosi więcej
        </text>
        <text x={230} y={236} textAnchor="middle" fontSize={9} fill={MUTED}>
          dlatego potrzebny jest zapas bezpieczeństwa
        </text>
      </motion.g>
      <text x={230} y={270} textAnchor="middle" fontSize={8.5} fill={MUTED}>
        długość strzałki = udział nitu w przenoszeniu siły
      </text>
    </>
  )
}

export function ShearMultiRivetAnimation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const p = playing ? sceneProgress : 1
  const modelIn = smooth(ramp(p, 0, 0.4))

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 300"
          role="img"
          aria-label="Połączenie czterech nitów dwuciętych: liczenie płaszczyzn, pól ścinania, podział siły i naprężenie"
        >
          {metric === 'model' && (
            <>
              <JointBase />
              <Arrow
                x1={X1 + 2}
                y1={SHEAR_1 + 14}
                x2={X1 + 46}
                y2={SHEAR_1 + 14}
                amount={modelIn}
                color={LOAD}
                width={2.6}
              />
              <text x={X1 + 24} y={SHEAR_1 + 6} textAnchor="middle" fontSize={9} fontWeight={700} fill={LOAD}>
                F = 180 kN
              </text>
              <Arrow x1={X0 - 2} y1={TOP + 14} x2={X0 - 38} y2={TOP + 14} amount={modelIn} color={ACCENT} width={2} />
              <Arrow
                x1={X0 - 2}
                y1={SHEAR_2 + 14}
                x2={X0 - 38}
                y2={SHEAR_2 + 14}
                amount={modelIn}
                color={ACCENT}
                width={2}
              />
              <text x={X0 - 20} y={TOP + 7} textAnchor="middle" fontSize={8.5} fill={ACCENT}>
                F/2
              </text>
              <text x={X0 - 20} y={SHEAR_2 + 9} textAnchor="middle" fontSize={8.5} fill={ACCENT}>
                F/2
              </text>
              <text x={230} y={218} textAnchor="middle" fontSize={9.5} fill={MUTED}>
                cztery nity, każdy przez trzy blachy
              </text>
              <text x={230} y={238} textAnchor="middle" fontSize={9.5} fontWeight={700} fill={INK}>
                m = 4, n = 2, d = 18 mm
              </text>
            </>
          )}

          {metric === 'planes' && (
            <>
              <JointBase faded />
              <PlaneCount progress={p} />
            </>
          )}

          {metric === 'area' && <AreaDiscs progress={p} />}

          {metric === 'load' && <LoadSplit progress={p} />}

          {metric === 'stress' && <StressComparison progress={p} />}

          {metric === 'distribution' && <UnevenDistribution progress={p} />}

          {!['model', 'planes', 'area', 'load', 'stress', 'distribution'].includes(metric) && (
            <>
              <JointBase />
              <text x={230} y={230} textAnchor="middle" fontSize={9.5} fill={MUTED}>
                cztery nity dwucięte = osiem płaszczyzn ścinania
              </text>
            </>
          )}
        </svg>
      </div>
    </div>
  )
}
