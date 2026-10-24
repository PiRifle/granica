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
const DEFORM = 540
const SHEAR = 26000

const SIGMA_X = 80
const SIGMA_Y = 40
const SIGMA_Z = -20
const TAU_XY = 30
const EPS_X = 0.00037
const EPS_Y = 0.00011
const EPS_Z = -0.00028
const GAMMA_XY = 0.00039
const EPS_AVG = 0.00024
const EPS_R = 0.00023436
const PHI = 28.155

interface Pt {
  x: number
  y: number
}

function prismGeometry(fx: number, fy: number, fz: number, shear = 0) {
  const hx = HX * fx
  const hy = HY * fy
  const hz = HZ * fz
  const dx = hz * 0.62
  const dy = -hz * 0.52
  const corner = (ix: number, iy: number, iz: number): Pt => {
    const baseY = CY + iy * hy + (iz > 0 ? dy : 0)
    const baseX = CX + ix * hx + (iz > 0 ? dx : 0)
    return { x: baseX + (shear * (CY - baseY)) / (2 * HY), y: baseY }
  }
  return {
    front: [corner(-1, -1, -1), corner(1, -1, -1), corner(1, 1, -1), corner(-1, 1, -1)],
    top: [corner(-1, -1, -1), corner(1, -1, -1), corner(1, -1, 1), corner(-1, -1, 1)],
    right: [corner(1, -1, -1), corner(1, 1, -1), corner(1, 1, 1), corner(1, -1, 1)],
    hidden: [corner(-1, 1, 1), corner(-1, -1, 1), corner(1, 1, 1)],
  }
}

const points = (items: Pt[]) => items.map((item) => `${item.x},${item.y}`).join(' ')

function Prism({
  fx = 1,
  fy = 1,
  fz = 1,
  shear = 0,
  ghost = false,
}: {
  fx?: number
  fy?: number
  fz?: number
  shear?: number
  ghost?: boolean
}) {
  const geometry = prismGeometry(fx, fy, fz, shear)
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
  opacity = 1,
}: {
  x1: number
  y1: number
  x2: number
  y2: number
  amount: number
  color: string
  width?: number
  dash?: string
  opacity?: number
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
    <g stroke={color} fill={color} opacity={opacity}>
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
        title="STAN NAPRĘŻENIA · σx, σy, σz, τxy"
        note="dodatnie naprężenie normalne rozciąga ścianę, ujemne ściska"
      />
      <Prism />
      <Arrow x1={CX + HX + 3} y1={CY} x2={CX + HX + 48} y2={CY} amount={ramp(p, 0.04, 0.34)} color={BLUE} width={2.8} />
      <motion.text
        x={CX + HX + 53}
        y={CY + 3}
        fontSize={9.5}
        fontWeight={600}
        fill={BLUE}
        initial={false}
        animate={{ opacity: ramp(p, 0.22, 0.44) }}
      >
        σx = {SIGMA_X}
      </motion.text>
      <Arrow
        x1={CX - 10}
        y1={CY - HY - 3}
        x2={CX - 10}
        y2={CY - HY - 44}
        amount={ramp(p, 0.2, 0.5)}
        color={GREEN}
        width={2.8}
      />
      <motion.text
        x={CX - 4}
        y={CY - HY - 48}
        fontSize={9.5}
        fontWeight={600}
        fill={GREEN}
        initial={false}
        animate={{ opacity: ramp(p, 0.36, 0.58) }}
      >
        σy = {SIGMA_Y}
      </motion.text>
      <Arrow
        x1={CX + 12}
        y1={CY - HY + 4}
        x2={CX + 34}
        y2={CY - HY - 16}
        amount={ramp(p, 0.38, 0.66)}
        color={ORANGE}
        width={2.8}
      />
      <motion.text
        x={CX + 39}
        y={CY - HY - 12}
        fontSize={9.5}
        fontWeight={600}
        fill={ORANGE}
        initial={false}
        animate={{ opacity: ramp(p, 0.52, 0.74) }}
      >
        σz = −{Math.abs(SIGMA_Z)}
      </motion.text>
      <Arrow
        x1={CX + HX + 12}
        y1={CY + 30}
        x2={CX + HX + 12}
        y2={CY - 30}
        amount={ramp(p, 0.54, 0.84)}
        color={VIOLET}
        width={2.6}
      />
      <motion.text
        x={CX + HX + 17}
        y={CY + 45}
        fontSize={9.5}
        fontWeight={600}
        fill={VIOLET}
        initial={false}
        animate={{ opacity: ramp(p, 0.68, 0.9) }}
      >
        τxy = {TAU_XY}
      </motion.text>
      <Axes />
    </g>
  )
}

function CouplingScene({ p }: { p: number }) {
  const a1 = ramp(p, 0.02, 0.3)
  const a2 = ramp(p, 0.34, 0.62)
  const a3 = ramp(p, 0.66, 0.96)
  const ex = 0.0004 * a1 - 0.00006 * a2 + 0.00003 * a3
  const ey = -0.00012 * a1 + 0.0002 * a2 + 0.00003 * a3
  const ez = -0.00012 * a1 - 0.00006 * a2 - 0.0001 * a3
  const phase = p < 0.33 ? 'x' : p < 0.66 ? 'y' : 'z'
  const message =
    phase === 'x'
      ? 'σx: +400 με w x, −120 με w y i z'
      : phase === 'y'
        ? 'σy: +200 με w y, −60 με w x i z'
        : 'σz: −100 με w z, +30 με w x i y'
  const color = phase === 'x' ? BLUE : phase === 'y' ? GREEN : ORANGE

  return (
    <g>
      <Header title="SPRZĘŻENIE · jedna oś zmienia trzy odkształcenia" />
      <Prism ghost fx={1} fy={1} fz={1} />
      <Prism fx={1 + ex * DEFORM} fy={1 + ey * DEFORM} fz={1 + ez * DEFORM} />
      <motion.text
        x={CX}
        y={CY + HY + 38}
        textAnchor="middle"
        fontSize={9}
        fontWeight={600}
        fill={color}
        initial={false}
        animate={{ opacity: ramp(p, 0.04, 0.2) }}
      >
        {message}
      </motion.text>
      <g opacity={phase === 'x' ? 0.95 : 0.22}>
        <Arrow
          x1={CX + HX + 3}
          y1={CY}
          x2={CX + HX + 44}
          y2={CY}
          amount={ramp(p, 0.02, 0.2)}
          color={BLUE}
          width={2.8}
        />
        <text x={CX + HX + 48} y={CY + 3} fontSize={9} fontWeight={600} fill={BLUE}>
          σx
        </text>
      </g>
      <g opacity={phase === 'y' ? 0.95 : 0.22}>
        <Arrow
          x1={CX - 10}
          y1={CY - HY - 3}
          x2={CX - 10}
          y2={CY - HY - 40}
          amount={ramp(p, 0.34, 0.52)}
          color={GREEN}
          width={2.8}
        />
        <text x={CX - 4} y={CY - HY - 44} fontSize={9} fontWeight={600} fill={GREEN}>
          σy
        </text>
      </g>
      <g opacity={phase === 'z' ? 0.95 : 0.22}>
        <Arrow
          x1={CX + 12}
          y1={CY - HY + 4}
          x2={CX + 34}
          y2={CY - HY - 16}
          amount={ramp(p, 0.66, 0.84)}
          color={ORANGE}
          width={2.8}
        />
        <text x={CX + 39} y={CY - HY - 12} fontSize={9} fontWeight={600} fill={ORANGE}>
          σz
        </text>
      </g>
      <Axes />
    </g>
  )
}

function StrainScene({ p }: { p: number }) {
  const a = ramp(p, 0.04, 0.72)
  const fx = 1 + EPS_X * DEFORM * a
  const fy = 1 + EPS_Y * DEFORM * a
  const fz = 1 + EPS_Z * DEFORM * a
  return (
    <g>
      <Header
        title="DEFORMACJA 3D · wszystkie osie naraz"
        note="εx i εy są dodatnie, εz ujemne — element wydłuża się i jednocześnie maleje na grubości"
      />
      <Prism ghost />
      <Prism fx={fx} fy={fy} fz={fz} />
      <motion.text
        x={CX + HX * fx + 30}
        y={CY + HY * fy - 6}
        fontSize={9.5}
        fontWeight={600}
        fill={BLUE}
        initial={false}
        animate={{ opacity: ramp(p, 0.28, 0.5) }}
      >
        εx = 370 με
      </motion.text>
      <motion.text
        x={CX - HX * fx - 8}
        y={CY - HY * fy - 14}
        textAnchor="end"
        fontSize={9.5}
        fontWeight={600}
        fill={GREEN}
        initial={false}
        animate={{ opacity: ramp(p, 0.44, 0.66) }}
      >
        εy = 110 με
      </motion.text>
      <motion.text
        x={CX + 20}
        y={CY - HY * fy - 26}
        fontSize={9.5}
        fontWeight={600}
        fill={ORANGE}
        initial={false}
        animate={{ opacity: ramp(p, 0.6, 0.82) }}
      >
        εz = −280 με
      </motion.text>
      <text x={CX} y={CY + HY + 38} textAnchor="middle" fontSize={8.5} fill={MUTED}>
        linia przerywana: stan nieodkształcony
      </text>
      <Axes />
    </g>
  )
}

function ShearScene({ p }: { p: number }) {
  const a = ramp(p, 0.08, 0.72)
  const shear = GAMMA_XY * SHEAR * a
  const geometry = prismGeometry(1, 1, 1, shear)
  const bottom = geometry.front[3]
  const top = geometry.front[0]
  const right = geometry.front[2]
  const unit = (from: Pt, to: Pt) => {
    const length = Math.hypot(to.x - from.x, to.y - from.y) || 1
    return { x: (to.x - from.x) / length, y: (to.y - from.y) / length }
  }
  const u = unit(bottom, right)
  const v = unit(bottom, top)
  const s = 10
  const rightAngle = `${bottom.x + u.x * s},${bottom.y + u.y * s} ${bottom.x + u.x * s + v.x * s},${
    bottom.y + u.y * s + v.y * s
  } ${bottom.x + v.x * s},${bottom.y + v.y * s}`

  return (
    <g>
      <Header
        title="ŚCINANIE · τxy wywołuje tylko γxy"
        note="w materiale izotropowym ścinanie nie sprzęga się z odkształceniami liniowymi"
      />
      <Prism ghost />
      <Prism shear={shear} />
      <motion.polyline
        points={rightAngle}
        fill="none"
        stroke={VIOLET}
        strokeWidth={1.6}
        initial={false}
        animate={{ opacity: ramp(p, 0.3, 0.5) }}
      />
      <Arrow
        x1={CX + HX + 4}
        y1={CY + 24}
        x2={CX + HX + 4}
        y2={CY - 32}
        amount={ramp(p, 0.12, 0.42)}
        color={VIOLET}
        width={2.6}
      />
      <motion.text
        x={CX + HX + 9}
        y={CY + 10}
        fontSize={9.5}
        fontWeight={600}
        fill={VIOLET}
        initial={false}
        animate={{ opacity: ramp(p, 0.26, 0.48) }}
      >
        τxy = 30 MPa
      </motion.text>
      <motion.text
        x={CX}
        y={CY + HY + 38}
        textAnchor="middle"
        fontSize={9.5}
        fontWeight={600}
        fill={VIOLET}
        initial={false}
        animate={{ opacity: ramp(p, 0.5, 0.72) }}
      >
        γxy = 390 μrad · G = 76 923 MPa
      </motion.text>
      <Axes />
    </g>
  )
}

function MohrScene({ p }: { p: number }) {
  const scale = 0.18
  const mx = 360
  const my = 150
  const radius = EPS_R * 1e6 * scale
  const angle = ramp(p, 0.06, 0.62)
  const showPoints = ramp(p, 0.52, 0.78)
  const pointX = mx + (EPS_X * 1e6 - EPS_AVG * 1e6) * scale
  const pointY = my - ((GAMMA_XY * 1e6) / 2) * scale
  const leftX = mx - radius
  const rightX = mx + radius

  return (
    <g>
      <Header title="KOŁO MOHRA · εI, εII" note="trzecia wartość główna to εz = −280 με" />
      <g>
        <rect x={92} y={112} width={72} height={72} rx={2} fill="#f6f8fd" stroke={EDGE} strokeWidth={1.4} />
        <g transform={`rotate(${-PHI * angle} 128 148)`}>
          <rect x={94} y={114} width={68} height={68} rx={2} fill="none" stroke={INK} strokeWidth={1.4} />
          <Arrow x1={128} y1={148} x2={182} y2={148} amount={angle} color={BLUE} width={2.4} />
          <Arrow x1={128} y1={148} x2={128} y2={184} amount={angle * 0.75} color={ORANGE} width={1.8} />
          <text x={150} y={142} textAnchor="middle" fontSize={8.5} fontWeight={600} fill={BLUE}>
            εI
          </text>
          <text x={136} y={178} fontSize={8.5} fontWeight={600} fill={ORANGE}>
            εII
          </text>
        </g>
        <path d="M 158 148 A 30 30 0 0 0 154 128" fill="none" stroke={MUTED} strokeWidth={1} />
        <text x={160} y={132} fontSize={8.5} fill={MUTED}>
          φ = 28,155°
        </text>
      </g>
      <line x1={mx - 62} y1={my} x2={mx + 62} y2={my} stroke={MUTED} strokeWidth={1} />
      <text x={mx + 64} y={my + 3} fontSize={8.5} fill={MUTED}>
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
      <line x1={mx} y1={my - 42} x2={mx} y2={my + 42} stroke={MUTED} strokeWidth={1} strokeDasharray="3 3" />
      <motion.g initial={false} animate={{ opacity: showPoints }}>
        <line x1={mx} y1={my} x2={pointX} y2={pointY} stroke={BLUE} strokeWidth={1.4} strokeDasharray="3 2" />
        <circle cx={pointX} cy={pointY} r={3.4} fill={BLUE} />
        <circle cx={rightX} cy={my} r={3.4} fill={BLUE} />
        <circle cx={leftX} cy={my} r={3.4} fill={ORANGE} />
        <text x={rightX} y={my - 9} textAnchor="middle" fontSize={8.5} fontWeight={600} fill={BLUE}>
          εI = 474
        </text>
        <text x={leftX} y={my - 9} textAnchor="middle" fontSize={8.5} fontWeight={600} fill={ORANGE}>
          εII = 5,6
        </text>
      </motion.g>
      <text x={mx} y={my + 58} textAnchor="middle" fontSize={8.5} fill={MUTED}>
        εsr = 240 με · R = 234,36 με
      </text>
    </g>
  )
}

function VolumeScene({ p }: { p: number }) {
  const a = ramp(p, 0.06, 0.62)
  const fx = 1 + EPS_X * DEFORM * a
  const fy = 1 + EPS_Y * DEFORM * a
  const fz = 1 + EPS_Z * DEFORM * a
  const grow = ramp(p, 0.52, 0.78)
  return (
    <g>
      <Header title="KONTROLA · θ = ΔV/V₀" note="objętość rośnie, chociaż σz jest ściskające" />
      <Prism ghost />
      <Prism fx={fx} fy={fy} fz={fz} />
      <Arrow x1={CX + HX * fx + 4} y1={CY} x2={CX + HX * fx + 30} y2={CY} amount={grow} color={BLUE} width={2.2} />
      <Arrow x1={CX} y1={CY - HY * fy - 4} x2={CX} y2={CY - HY * fy - 28} amount={grow} color={GREEN} width={2.2} />
      <Arrow
        x1={CX + 24}
        y1={CY - HY * fy + 2}
        x2={CX + 8}
        y2={CY - HY * fy - 18}
        amount={grow}
        color={ORANGE}
        width={2.2}
      />
      <motion.g initial={false} animate={{ opacity: ramp(p, 0.3, 0.55) }}>
        <text x={CX} y={CY + HY + 38} textAnchor="middle" fontSize={9.5} fontWeight={600} fill={INK}>
          θ = 370 + 110 − 280 = 200 με
        </text>
      </motion.g>
      <motion.g initial={false} animate={{ opacity: ramp(p, 0.62, 0.86) }}>
        <text x={CX} y={CY + HY + 54} textAnchor="middle" fontSize={9} fill={BLUE}>
          ΔV/V₀ ≈ +0,02%
        </text>
      </motion.g>
      <Axes />
    </g>
  )
}

export function GeneralHookeExample1Animation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'stress'
  const p = playing ? smooth(sceneProgress) : 1

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 300"
          role="img"
          aria-label="Element trójosiowy z naprężeniami sigma x, sigma y, sigma z i tau xy, animacją odkształceń w trzech osiach, ścinaniem oraz kołem Mohra odkształceń."
        >
          {metric === 'stress' && <StressScene p={p} />}
          {metric === 'coupling' && <CouplingScene p={p} />}
          {metric === 'strain' && <StrainScene p={p} />}
          {metric === 'shear' && <ShearScene p={p} />}
          {metric === 'principal' && <MohrScene p={p} />}
          {metric === 'volume' && <VolumeScene p={p} />}
        </svg>
      </div>
    </div>
  )
}
