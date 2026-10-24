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
const HX = 56
const HY = 54
const HZ = 44
const PLATE_Z = 0.55
const GAIN_X = 620
const GAIN_Y = 900
const GAIN_Z = 1400

const SIGMA_X = 120
const EPS_X = 0.0006
const EPS_Y = -0.00018
const EPS_Z = -0.00018
const EPS_R = 0.00039

interface Pt {
  x: number
  y: number
}

function prismGeometry(fx: number, fy: number, fz: number) {
  const hx = HX * fx
  const hy = HY * fy
  const hz = HZ * fz * PLATE_Z
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

function StressScene({ p }: { p: number }) {
  return (
    <g>
      <Header
        title="PŁASKI STAN NAPRĘŻENIA · σz = 0"
        note="cienka blacha: naprężenia w płaszczyźnie, brak naprężenia normalnego do powierzchni"
      />
      <Prism />
      <Arrow x1={CX + HX + 3} y1={CY} x2={CX + HX + 52} y2={CY} amount={ramp(p, 0.06, 0.42)} color={BLUE} width={2.8} />
      <motion.text
        x={CX + HX + 57}
        y={CY + 3}
        fontSize={10}
        fontWeight={600}
        fill={BLUE}
        initial={false}
        animate={{ opacity: ramp(p, 0.26, 0.5) }}
      >
        σx = {SIGMA_X} MPa
      </motion.text>
      <motion.g initial={false} animate={{ opacity: ramp(p, 0.46, 0.68) }}>
        <text x={CX + 10} y={CY - HY - 16} fontSize={9} fill={MUTED}>
          σz = 0
        </text>
        <text x={CX - HX - 12} y={CY - 6} textAnchor="end" fontSize={9} fill={MUTED}>
          σy = 0
        </text>
      </motion.g>
      <Axes />
    </g>
  )
}

function StrainXScene({ p }: { p: number }) {
  const a = ramp(p, 0.06, 0.7)
  const fx = 1 + EPS_X * GAIN_X * a
  return (
    <g>
      <Header title="ODKSZTAŁCENIE W KIERUNKU x" note="deformacja pokazana poglądowo, nie w skali" />
      <Prism ghost />
      <Prism fx={fx} />
      <Arrow
        x1={CX + HX * fx + 3}
        y1={CY}
        x2={CX + HX * fx + 42}
        y2={CY}
        amount={ramp(p, 0.3, 0.58)}
        color={BLUE}
        width={2.6}
      />
      <motion.text
        x={CX + HX * fx + 24}
        y={CY - 12}
        fontSize={10}
        fontWeight={600}
        fill={BLUE}
        initial={false}
        animate={{ opacity: ramp(p, 0.46, 0.68) }}
      >
        εx = +600 με
      </motion.text>
      <text x={CX} y={CY + HY + 38} textAnchor="middle" fontSize={9} fill={MUTED}>
        σx = 120 MPa → εx = σx/E = 600 με
      </text>
      <Axes />
    </g>
  )
}

function CouplingScene({ p }: { p: number }) {
  const a = ramp(p, 0.05, 0.74)
  const fx = 1 + EPS_X * GAIN_X * a
  const fy = 1 + EPS_Y * GAIN_Y * a
  const fz = 1 + EPS_Z * GAIN_Z * a
  return (
    <g>
      <Header title="EFEKT POISSONA · skurcz w y i z" note="σy i σz są zerowe, ale odkształcenia poprzeczne nie są" />
      <Prism ghost />
      <Prism fx={fx} fy={fy} fz={fz} />
      <motion.text
        x={CX + HX * fx + 18}
        y={CY - 14}
        fontSize={9.5}
        fontWeight={600}
        fill={BLUE}
        initial={false}
        animate={{ opacity: ramp(p, 0.24, 0.46) }}
      >
        εx = +600 με
      </motion.text>
      <motion.text
        x={CX - HX * fx - 8}
        y={CY - HY * fy - 14}
        textAnchor="end"
        fontSize={9.5}
        fontWeight={600}
        fill={GREEN}
        initial={false}
        animate={{ opacity: ramp(p, 0.42, 0.64) }}
      >
        εy = −180 με
      </motion.text>
      <motion.text
        x={CX + 18}
        y={CY - HY * fy - 28}
        fontSize={9.5}
        fontWeight={600}
        fill={ORANGE}
        initial={false}
        animate={{ opacity: ramp(p, 0.58, 0.8) }}
      >
        εz = −180 με
      </motion.text>
      <motion.g initial={false} animate={{ opacity: ramp(p, 0.7, 0.9) }}>
        <Arrow x1={CX - HX * fx - 4} y1={CY} x2={CX - HX * fx - 24} y2={CY} amount={1} color={GREEN} width={2} />
        <Arrow
          x1={CX - 16}
          y1={CY - HY * fy - 4}
          x2={CX - 16}
          y2={CY - HY * fy - 22}
          amount={1}
          color={GREEN}
          width={2}
        />
      </motion.g>
      <text x={CX} y={CY + HY + 38} textAnchor="middle" fontSize={9} fill={MUTED}>
        εy = εz = −νσx/E = −180 με
      </text>
      <Axes />
    </g>
  )
}

function CheckScene({ p }: { p: number }) {
  const a = ramp(p, 0.05, 0.68)
  const fx = 1 + EPS_X * GAIN_X * a
  const fy = 1 + EPS_Y * GAIN_Y * a
  const fz = 1 + EPS_Z * GAIN_Z * a
  const showCompare = ramp(p, 0.46, 0.76)
  const originalThickness = 44
  const actualThickness = originalThickness * (1 + EPS_Z * GAIN_Z * a)
  return (
    <g>
      <Header
        title="PŁASKI STAN NAPRĘŻENIA ≠ PŁASKI STAN ODKSZTAŁCENIA"
        note="εz = 0 byłoby błędem: grubość blachy rzeczywiście się zmienia"
      />
      <Prism ghost />
      <Prism fx={fx} fy={fy} fz={fz} />
      <motion.text
        x={CX + HX * fx + 18}
        y={CY - 8}
        fontSize={9}
        fill={MUTED}
        initial={false}
        animate={{ opacity: ramp(p, 0.24, 0.46) }}
      >
        σz = 0
      </motion.text>
      <motion.g initial={false} animate={{ opacity: showCompare }}>
        <text x={394} y={204} textAnchor="middle" fontSize={8.5} fontWeight={600} fill={INK}>
          grubość
        </text>
        <rect
          x={366}
          y={212}
          width={originalThickness}
          height={34}
          fill="none"
          stroke={MUTED}
          strokeWidth={1.2}
          strokeDasharray="4 3"
        />
        <rect x={366} y={212} width={actualThickness} height={34} fill="#e8eefc" stroke={EDGE} strokeWidth={1.2} />
        <text x={366} y={260} fontSize={8} fill={MUTED}>
          εz = 0
        </text>
        <text x={366} y={272} fontSize={8} fill={ORANGE}>
          εz = −180 με
        </text>
        <text x={428} y={231} textAnchor="middle" fontSize={8} fontWeight={600} fill={ORANGE}>
          błąd 180 με
        </text>
      </motion.g>
      <text x={CX} y={CY + HY + 38} textAnchor="middle" fontSize={8.5} fill={MUTED}>
        σz = 0 nie oznacza εz = 0
      </text>
      <Axes />
    </g>
  )
}

function MohrScene({ p }: { p: number }) {
  const scale = 0.15
  const mx = 360
  const my = 150
  const radius = EPS_R * 1e6 * scale
  const angle = ramp(p, 0.06, 0.62)
  const showPoints = ramp(p, 0.5, 0.76)
  const leftX = mx - radius
  const rightX = mx + radius
  return (
    <g>
      <Header title="KOŁO MOHRA · brak ścinania" note="osie x i y są już kierunkami głównymi" />
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
      <line x1={mx - 70} y1={my} x2={mx + 64} y2={my} stroke={MUTED} strokeWidth={1} />
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
          εI = 600
        </text>
        <text x={leftX} y={my - 9} textAnchor="middle" fontSize={8.5} fontWeight={600} fill={ORANGE}>
          εII = −180
        </text>
      </motion.g>
      <text x={mx} y={my + 72} textAnchor="middle" fontSize={8.5} fill={MUTED}>
        εsr = 210 με · R = 390 με
      </text>
    </g>
  )
}

export function GeneralHookeExample2Animation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'stress'
  const p = playing ? smooth(sceneProgress) : 1

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 300"
          role="img"
          aria-label="Cienka blacha w płaskim stanie naprężenia: rozciąganie w kierunku x, skurcz Poissona w y i z, porównanie grubości oraz koło Mohra odkształceń."
        >
          {metric === 'stress' && <StressScene p={p} />}
          {metric === 'strain-x' && <StrainXScene p={p} />}
          {metric === 'coupling' && <CouplingScene p={p} />}
          {metric === 'check' && <CheckScene p={p} />}
          {metric === 'principal' && <MohrScene p={p} />}
        </svg>
      </div>
    </div>
  )
}
