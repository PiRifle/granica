import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const BLUE = '#4f6df5'
const GREEN = '#2e9e6b'
const ORANGE = '#ff6b45'
const VIOLET = '#a970dd'
const MUTED = '#87929d'
const EDGE = '#68727e'
const INK = '#17202a'

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}
const ramp = (value: number, from: number, to: number) => smooth(clamp01((value - from) / (to - from)))

const CX = 150
const CY = 172
const HX = 54
const HY = 52
const HZ = 40
const GAIN_X = 700
const GAIN_Y = 1000
const GAIN_Z = 1400

const EPS_X = 0.0005
const EPS_Y = -0.00015
const EPS_Z = -0.00015
const SIGMA_X = 100
const EPS_R = 0.000325

interface Pt {
  x: number
  y: number
}

function prismGeometry(fx: number, fy: number, fz: number) {
  const hx = HX * fx
  const hy = HY * fy
  const hz = HZ * fz
  const dx = hz * 0.62
  const dy = -hz * 0.52
  const corner = (ix: number, iy: number, iz: number): Pt => ({
    x: CX + ix * hx + (iz > 0 ? dx : 0),
    y: CY + iy * hy + (iz > 0 ? dy : 0),
  })
  return {
    front: [corner(-1, -1, -1), corner(1, -1, -1), corner(1, 1, -1), corner(-1, 1, -1)],
    top: [corner(-1, -1, -1), corner(1, -1, -1), corner(1, -1, 1), corner(-1, -1, 1)],
    right: [corner(1, -1, -1), corner(1, 1, -1), corner(1, 1, 1), corner(1, -1, 1)],
    hidden: [corner(-1, 1, 1), corner(-1, -1, 1), corner(1, 1, 1)],
  }
}

const points = (items: Pt[]) => items.map((item) => `${item.x},${item.y}`).join(' ')

function Prism({ fx = 1, fy = 1, fz = 1, ghost = false }: { fx?: number; fy?: number; fz?: number; ghost?: boolean }) {
  const geometry = prismGeometry(fx, fy, fz)
  if (ghost) {
    return (
      <g fill="none" stroke="#b7c0cc" strokeWidth={1.1} strokeDasharray="4 3">
        <polygon points={points(geometry.front)} />
        <polygon points={points(geometry.top)} />
        <polygon points={points(geometry.right)} />
      </g>
    )
  }
  return (
    <g stroke={EDGE} strokeWidth={1.4} strokeLinejoin="round">
      <line
        x1={geometry.hidden[0].x}
        y1={geometry.hidden[0].y}
        x2={geometry.hidden[1].x}
        y2={geometry.hidden[1].y}
        strokeWidth={1}
        strokeDasharray="4 3"
        opacity={0.45}
      />
      <line
        x1={geometry.hidden[0].x}
        y1={geometry.hidden[0].y}
        x2={geometry.hidden[2].x}
        y2={geometry.hidden[2].y}
        strokeWidth={1}
        strokeDasharray="4 3"
        opacity={0.45}
      />
      <polygon points={points(geometry.top)} fill="#e8eefc" />
      <polygon points={points(geometry.right)} fill="#eef3fc" />
      <polygon points={points(geometry.front)} fill="#f6f8fd" />
    </g>
  )
}

function Arrow({
  x1,
  y1,
  x2,
  y2,
  amount,
  color,
  width = 2.4,
  dash,
}: {
  x1: number
  y1: number
  x2: number
  y2: number
  amount: number
  color: string
  width?: number
  dash?: string
}) {
  const t = clamp01(amount)
  if (t < 0.01) return null
  const ex = x1 + (x2 - x1) * t
  const ey = y1 + (y2 - y1) * t
  const angle = Math.atan2(ey - y1, ex - x1)
  const head = 8
  const baseX = ex - head * Math.cos(angle)
  const baseY = ey - head * Math.sin(angle)
  const wing = 4
  const lx = baseX - wing * Math.sin(angle)
  const ly = baseY + wing * Math.cos(angle)
  const rx = baseX + wing * Math.sin(angle)
  const ry = baseY - wing * Math.cos(angle)
  return (
    <g stroke={color} fill={color}>
      <line x1={x1} y1={y1} x2={ex} y2={ey} strokeWidth={width} strokeLinecap="round" strokeDasharray={dash} />
      {t > 0.2 && <polygon points={`${ex},${ey} ${lx},${ly} ${rx},${ry}`} stroke="none" />}
    </g>
  )
}

function Axes() {
  return (
    <g>
      <Arrow x1={62} y1={264} x2={96} y2={264} amount={1} color={BLUE} width={1.4} />
      <text x={100} y={267} fontSize={9} fill={BLUE}>
        x
      </text>
      <Arrow x1={62} y1={264} x2={62} y2={230} amount={1} color={GREEN} width={1.4} />
      <text x={66} y={230} fontSize={9} fill={GREEN}>
        y
      </text>
      <Arrow x1={62} y1={264} x2={83} y2={248} amount={1} color={ORANGE} width={1.4} />
      <text x={87} y={248} fontSize={9} fill={ORANGE}>
        z
      </text>
    </g>
  )
}

function Header({ title, note }: { title: string; note?: string }) {
  return (
    <g>
      <text x={16} y={22} fontSize={9} fontWeight={600} fill={INK}>
        {title}
      </text>
      <text x={444} y={22} textAnchor="end" fontSize={8.5} fill={MUTED}>
        E = 200 GPa · ν = 0,30
      </text>
      {note && (
        <text x={16} y={288} fontSize={8.5} fill={MUTED}>
          {note}
        </text>
      )}
    </g>
  )
}

function GaugeScene({ p }: { p: number }) {
  const showX = ramp(p, 0.12, 0.42)
  const showY = ramp(p, 0.4, 0.7)
  return (
    <g>
      <Header title="POMIAR · tensometry wzdłuż x i y" note="tensometr mierzy odkształcenie, a nie naprężenie" />
      <Prism />
      <motion.g initial={false} animate={{ opacity: showX }}>
        <rect x={CX - 22} y={CY + HY - 16} width={44} height={8} rx={2} fill={BLUE} />
        <text x={CX + 27} y={CY + HY - 8} fontSize={8.5} fontWeight={600} fill={BLUE}>
          0° · εx = 500 με
        </text>
      </motion.g>
      <motion.g initial={false} animate={{ opacity: showY }}>
        <rect x={CX - HX + 12} y={CY - 22} width={8} height={44} rx={2} fill={GREEN} />
        <text x={CX - HX + 8} y={CY + 4} textAnchor="end" fontSize={8.5} fontWeight={600} fill={GREEN}>
          90° · εy = −150 με
        </text>
      </motion.g>
      <text x={CX} y={CY + HY + 44} textAnchor="middle" fontSize={8.5} fill={MUTED}>
        dwa odczyty wystarczą do sprawdzenia hipotezy jednoosiowości
      </text>
      <Axes />
    </g>
  )
}

function StressScene({ p }: { p: number }) {
  const a = ramp(p, 0.06, 0.68)
  const fx = 1 + EPS_X * GAIN_X * a
  return (
    <g>
      <Header title="ODWRÓCENIE PRAWA HOOKE’A · σx z pomiaru" note="w stanie jednoosiowym σx = E εx" />
      <Prism ghost />
      <Prism fx={fx} />
      <Arrow
        x1={CX + HX * fx + 3}
        y1={CY}
        x2={CX + HX * fx + 48}
        y2={CY}
        amount={ramp(p, 0.24, 0.52)}
        color={BLUE}
        width={2.8}
      />
      <motion.text
        x={CX + HX * fx + 53}
        y={CY + 3}
        fontSize={10}
        fontWeight={600}
        fill={BLUE}
        initial={false}
        animate={{ opacity: ramp(p, 0.4, 0.64) }}
      >
        σx = {SIGMA_X} MPa
      </motion.text>
      <motion.text
        x={CX + HX * fx + 30}
        y={CY - 14}
        fontSize={9}
        fill={MUTED}
        initial={false}
        animate={{ opacity: ramp(p, 0.54, 0.74) }}
      >
        εx = 500 με
      </motion.text>
      <text x={CX} y={CY + HY + 38} textAnchor="middle" fontSize={9} fill={MUTED}>
        σx = E εx = 200 000 · 0,0005 = 100 MPa
      </text>
      <Axes />
    </g>
  )
}

function CouplingScene({ p }: { p: number }) {
  const a = ramp(p, 0.05, 0.72)
  const fx = 1 + EPS_X * GAIN_X * a
  const fy = 1 + EPS_Y * GAIN_Y * a
  const fz = 1 + EPS_Z * GAIN_Z * a
  const showCheck = ramp(p, 0.5, 0.78)
  return (
    <g>
      <Header title="TEST POISSONA · przewidywanie εy" note="εy = −ν εx niezależnie od tego, czy σy jest znane" />
      <Prism ghost />
      <Prism fx={fx} fy={fy} fz={fz} />
      <motion.text
        x={CX + HX * fx + 30}
        y={CY - 10}
        fontSize={9.5}
        fontWeight={600}
        fill={BLUE}
        initial={false}
        animate={{ opacity: ramp(p, 0.24, 0.46) }}
      >
        εx = 500 με
      </motion.text>
      <motion.text
        x={CX - HX * fx - 8}
        y={CY + 4}
        textAnchor="end"
        fontSize={9.5}
        fontWeight={600}
        fill={GREEN}
        initial={false}
        animate={{ opacity: ramp(p, 0.4, 0.62) }}
      >
        εy = −150 με
      </motion.text>
      <motion.g initial={false} animate={{ opacity: showCheck }}>
        <text x={CX} y={CY + HY + 34} textAnchor="middle" fontSize={9.5} fontWeight={600} fill={GREEN}>
          −ν εx = −0,30 · 500 = −150 με ✓
        </text>
        <text x={CX} y={CY + HY + 50} textAnchor="middle" fontSize={8.5} fill={MUTED}>
          zgodne ze zmierzonym εy
        </text>
      </motion.g>
      <Axes />
    </g>
  )
}

function StrainZScene({ p }: { p: number }) {
  const a = ramp(p, 0.06, 0.7)
  const fx = 1 + EPS_X * GAIN_X * a
  const fy = 1 + EPS_Y * GAIN_Y * a
  const fz = 1 + EPS_Z * GAIN_Z * a
  const geometry = prismGeometry(fx, fy, fz)
  const original = prismGeometry(1, 1, 1)
  const frontTop = geometry.front[0]
  const frontTopOriginal = original.front[0]
  const backTop = geometry.top[2]
  const backTopOriginal = original.top[2]
  return (
    <g>
      <Header title="ODKSZTAŁCENIE GRUBOŚCI · εz" note="σz = 0, ale εz = −150 με" />
      <Prism ghost />
      <Prism fx={fx} fy={fy} fz={fz} />
      <motion.g initial={false} animate={{ opacity: ramp(p, 0.42, 0.68) }}>
        <line x1={frontTop.x} y1={frontTop.y - 28} x2={backTop.x} y2={backTop.y - 28} stroke={ORANGE} strokeWidth={2} />
        <line
          x1={frontTopOriginal.x}
          y1={frontTopOriginal.y - 38}
          x2={backTopOriginal.x}
          y2={backTopOriginal.y - 38}
          stroke={MUTED}
          strokeWidth={1.2}
          strokeDasharray="4 3"
        />
        <text x={backTop.x + 6} y={backTop.y - 26} fontSize={9} fontWeight={600} fill={ORANGE}>
          εz = −150 με
        </text>
        <text x={backTopOriginal.x + 6} y={backTopOriginal.y - 40} fontSize={8} fill={MUTED}>
          εz = 0
        </text>
      </motion.g>
      <text x={CX} y={CY + HY + 38} textAnchor="middle" fontSize={9} fill={MUTED}>
        grubość maleje mimo zerowego naprężenia w kierunku z
      </text>
      <Axes />
    </g>
  )
}

function MohrScene({ p }: { p: number }) {
  const scale = 0.16
  const mx = 360
  const my = 150
  const radius = EPS_R * 1e6 * scale
  const angle = ramp(p, 0.06, 0.62)
  const showPoints = ramp(p, 0.5, 0.76)
  const leftX = mx - radius
  const rightX = mx + radius
  return (
    <g>
      <Header title="KOŁO MOHRA · wartości główne" note="x i y są kierunkami głównymi, bo γxy = 0" />
      <g>
        <rect x={92} y={118} width={66} height={66} rx={2} fill="#f6f8fd" stroke={EDGE} strokeWidth={1.4} />
        <Arrow x1={125} y1={151} x2={174} y2={151} amount={angle} color={BLUE} width={2.4} />
        <Arrow x1={125} y1={151} x2={125} y2={181} amount={angle * 0.7} color={ORANGE} width={1.8} />
        <text x={150} y={145} textAnchor="middle" fontSize={8.5} fontWeight={600} fill={BLUE}>
          εI
        </text>
        <text x={132} y={180} fontSize={8.5} fontWeight={600} fill={ORANGE}>
          εII
        </text>
        <text x={125} y={112} textAnchor="middle" fontSize={8.5} fill={MUTED}>
          φ = 0°
        </text>
      </g>
      <line x1={mx - 66} y1={my} x2={mx + 64} y2={my} stroke={MUTED} strokeWidth={1} />
      <text x={mx + 66} y={my + 3} fontSize={8.5} fill={MUTED}>
        ε
      </text>
      <motion.circle
        cx={mx}
        cy={my}
        r={radius}
        fill="none"
        stroke={VIOLET}
        strokeWidth={2}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: angle }}
        transition={{ pathLength: { duration: 0.12, ease: 'linear' } }}
      />
      <motion.g initial={false} animate={{ opacity: showPoints }}>
        <circle cx={leftX} cy={my} r={3.4} fill={ORANGE} />
        <circle cx={rightX} cy={my} r={3.4} fill={BLUE} />
        <text x={rightX} y={my - 9} textAnchor="middle" fontSize={8.5} fontWeight={600} fill={BLUE}>
          εI = 500
        </text>
        <text x={leftX} y={my - 9} textAnchor="middle" fontSize={8.5} fontWeight={600} fill={ORANGE}>
          εII = −150
        </text>
      </motion.g>
      <text x={mx} y={my + 72} textAnchor="middle" fontSize={8.5} fill={MUTED}>
        εsr = 175 με · R = 325 με
      </text>
    </g>
  )
}

function CheckScene({ p }: { p: number }) {
  const a = ramp(p, 0.05, 0.62)
  const actualX = 1 + EPS_X * 0.6 * a
  const actualY = 1 + EPS_Y * 1.4 * a
  const hypotheticalY = 1 + 0.00015 * 1.4 * a
  const half = 34
  const leftCx = 122
  const rightCx = 300
  const cy = 168
  const showAlt = ramp(p, 0.4, 0.72)
  const showSum = ramp(p, 0.62, 0.86)
  return (
    <g>
      <Header title="SPRAWDZENIE ZAŁOŻENIA JEDNOOSIOWEGO" />
      <g>
        <rect
          x={leftCx - half * actualX}
          y={cy - half * actualY}
          width={half * 2 * actualX}
          height={half * 2 * actualY}
          rx={2}
          fill="#eaf8f1"
          stroke={GREEN}
          strokeWidth={1.6}
        />
        <Arrow
          x1={leftCx + half * actualX}
          y1={cy}
          x2={leftCx + half * actualX + 20}
          y2={cy}
          amount={a}
          color={BLUE}
          width={2}
        />
        <Arrow
          x1={leftCx}
          y1={cy - half * actualY}
          x2={leftCx}
          y2={cy - half * actualY - 20}
          amount={a}
          color={GREEN}
          width={2}
        />
        <text x={leftCx} y={cy - half * actualY - 27} textAnchor="middle" fontSize={8.5} fontWeight={600} fill={GREEN}>
          εy = −150 με ✓
        </text>
        <text x={leftCx} y={cy + half + 22} textAnchor="middle" fontSize={8.5} fill={GREEN}>
          stan jednoosiowy
        </text>
      </g>
      <motion.g initial={false} animate={{ opacity: showAlt }}>
        <rect
          x={rightCx - half * actualX}
          y={cy - half * hypotheticalY}
          width={half * 2 * actualX}
          height={half * 2 * hypotheticalY}
          rx={2}
          fill="#fff4ef"
          stroke={ORANGE}
          strokeWidth={1.4}
          strokeDasharray="5 3"
        />
        <Arrow
          x1={rightCx - half * actualX - 4}
          y1={cy - half * hypotheticalY}
          x2={rightCx - half * actualX - 4}
          y2={cy - half * hypotheticalY - 18}
          amount={showAlt}
          color={ORANGE}
          width={2}
        />
        <text
          x={rightCx}
          y={cy - half * hypotheticalY - 25}
          textAnchor="middle"
          fontSize={8.5}
          fontWeight={600}
          fill={ORANGE}
        >
          εy &gt; 0 ✕
        </text>
        <text x={rightCx} y={cy + half + 22} textAnchor="middle" fontSize={8.5} fill={ORANGE}>
          hipoteza fałszywa
        </text>
      </motion.g>
      <motion.g initial={false} animate={{ opacity: showSum }}>
        <text x={224} y={272} textAnchor="middle" fontSize={9.5} fontWeight={600} fill={INK}>
          εx + εy + εz = 500 − 150 − 150 = 200 με
        </text>
        <text x={224} y={288} textAnchor="middle" fontSize={8.5} fill={MUTED}>
          objętość rośnie; dodatnie εy wymagałoby σy ≠ 0 lub wpływu termicznego
        </text>
      </motion.g>
    </g>
  )
}

export function GeneralHookeExample3Animation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'gauges'
  const p = playing ? smooth(sceneProgress) : 1

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 300"
          role="img"
          aria-label="Element z tensometrami: odwrócenie prawa Hooke’a, test efektu Poissona, odkształcenie grubości, koło Mohra oraz sprawdzenie założenia jednoosiowości."
        >
          {metric === 'gauges' && <GaugeScene p={p} />}
          {metric === 'stress' && <StressScene p={p} />}
          {metric === 'coupling' && <CouplingScene p={p} />}
          {metric === 'strain-z' && <StrainZScene p={p} />}
          {metric === 'principal' && <MohrScene p={p} />}
          {metric === 'check' && <CheckScene p={p} />}
        </svg>
      </div>
    </div>
  )
}
