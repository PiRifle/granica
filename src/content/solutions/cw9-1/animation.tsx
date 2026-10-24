import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const BLUE = '#4f6df5'
const LOAD = '#ff6b45'
const COMP = '#d84f28'
const TENS = '#2f7d5b'
const OK = '#2e9e6b'
const VIOLET = '#a970dd'
const MUTED = '#87929d'
const EDGE = '#68727e'
const INK = '#17202a'
const FILL = '#eef3fa'

const L = 2.5
const B = 1.5
const C = 2
const X0 = 52
const X1 = 432
const BEAM_Y = 80
const X_SPAN = X1 - X0
const xAt = (metres: number) => X0 + (metres / L) * X_SPAN

const S_BASE = 178
const S_SCALE = 1.65
const M_BASE = 252
const M_SCALE = 4.4
const yS = (value: number) => S_BASE - value * S_SCALE
const yM = (value: number) => M_BASE - value * M_SCALE

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}
function Arrow({
  x1,
  y1,
  x2,
  y2,
  color,
  width = 2.2,
  amount = 1,
  dash,
}: {
  x1: number
  y1: number
  x2: number
  y2: number
  color: string
  width?: number
  amount?: number
  dash?: string
}) {
  const t = clamp01(amount)
  if (t < 0.02) return null
  const ex = x1 + (x2 - x1) * t
  const ey = y1 + (y2 - y1) * t
  const angle = Math.atan2(ey - y1, ex - x1)
  const head = 7
  const baseX = ex - head * Math.cos(angle)
  const baseY = ey - head * Math.sin(angle)
  const wing = 3.5
  const lx = baseX - wing * Math.sin(angle)
  const ly = baseY + wing * Math.cos(angle)
  const rx = baseX + wing * Math.sin(angle)
  const ry = baseY - wing * Math.cos(angle)
  return (
    <g stroke={color} fill={color}>
      <line x1={x1} y1={y1} x2={baseX} y2={baseY} strokeWidth={width} strokeLinecap="round" strokeDasharray={dash} />
      <polygon points={`${ex},${ey} ${lx},${ly} ${rx},${ry}`} stroke="none" />
    </g>
  )
}

function Support({ x, y, label, active }: { x: number; y: number; label: string; active?: boolean }) {
  return (
    <g>
      <path d={`M ${x - 10} ${y + 16} L ${x} ${y + 2} L ${x + 10} ${y + 16} Z`} fill={active ? BLUE : EDGE} />
      <text
        x={x}
        y={y + 29}
        textAnchor="middle"
        fontSize={8.5}
        fontWeight={active ? 700 : 400}
        fill={active ? BLUE : EDGE}
      >
        {label}
      </text>
    </g>
  )
}

function DistributedLoad({
  from,
  to,
  y,
  opacity = 1,
  draw = 1,
}: {
  from: number
  to: number
  y: number
  opacity?: number
  draw?: number
}) {
  const count = 8
  const top = y - 28
  return (
    <g stroke={LOAD} fill={LOAD} opacity={opacity * draw}>
      {Array.from({ length: count }, (_, index) => {
        const position = from + ((to - from) * index) / (count - 1)
        const px = xAt(position)
        return (
          <g key={`q-arrow-${index}`}>
            <line x1={px} y1={top} x2={px} y2={y - 5} strokeWidth={1.3} />
            <path d={`M ${px - 3} ${y - 10} L ${px} ${y - 4} L ${px + 3} ${y - 10}`} fill="none" strokeWidth={1.3} />
          </g>
        )
      })}
      <line x1={xAt(from)} y1={top} x2={xAt(to)} y2={top} strokeWidth={1.8} />
      <text x={xAt((from + to) / 2)} y={top - 7} textAnchor="middle" fontSize={8.5} stroke="none">
        q = 16 kN/m
      </text>
    </g>
  )
}

function MomentLoad({ x, y, opacity = 1 }: { x: number; y: number; opacity?: number }) {
  return (
    <g opacity={opacity}>
      <path
        d={`M ${x - 17} ${y - 22} Q ${x} ${y - 48} ${x + 17} ${y - 22}`}
        fill="none"
        stroke={VIOLET}
        strokeWidth={2.2}
        markerEnd="url(#cw91-moment)"
      />
      <text x={x + 22} y={y - 6} fontSize={8.5} fontWeight={600} fill={VIOLET}>
        8 kNm
      </text>
    </g>
  )
}

function PointLoad({ x, y, opacity = 1 }: { x: number; y: number; opacity?: number }) {
  return (
    <g opacity={opacity}>
      <line x1={x} y1={y - 52} x2={x} y2={y - 6} stroke={LOAD} strokeWidth={2.4} />
      <path
        d={`M ${x - 5} ${y - 15} L ${x} ${y - 6} L ${x + 5} ${y - 15}`}
        fill="none"
        stroke={LOAD}
        strokeWidth={2.4}
      />
      <text x={x - 5} y={y - 56} textAnchor="end" fontSize={8.5} fontWeight={600} fill={LOAD}>
        P = 12 kN
      </text>
    </g>
  )
}

function Reaction({ x, y, label, draw = 1 }: { x: number; y: number; label: string; draw?: number }) {
  return (
    <g opacity={draw}>
      <line x1={x} y1={y + 44} x2={x} y2={y + 8} stroke={OK} strokeWidth={2.2} />
      <path d={`M ${x - 4} ${y + 16} L ${x} ${y + 7} L ${x + 4} ${y + 16}`} fill="none" stroke={OK} strokeWidth={2.2} />
      <text x={x} y={y + 57} textAnchor="middle" fontSize={8.5} fontWeight={600} fill={OK}>
        {label}
      </text>
    </g>
  )
}

function Dimension({ x1, x2, y, label }: { x1: number; x2: number; y: number; label: string }) {
  return (
    <g stroke={MUTED} fill={MUTED}>
      <line x1={x1} y1={y} x2={x2} y2={y} strokeWidth={1} />
      <line x1={x1} y1={y - 4} x2={x1} y2={y + 4} strokeWidth={1} />
      <line x1={x2} y1={y - 4} x2={x2} y2={y + 4} strokeWidth={1} />
      <text x={(x1 + x2) / 2} y={y + 12} textAnchor="middle" fontSize={8} stroke="none">
        {label}
      </text>
    </g>
  )
}

function Resultant({ draw = 1 }: { draw?: number }) {
  const x = xAt(0.75)
  return (
    <g opacity={draw}>
      <Arrow x1={x} y1={BEAM_Y - 42} x2={x} y2={BEAM_Y - 6} color={COMP} width={2.8} amount={draw} />
      <text x={x + 8} y={BEAM_Y + 16} fontSize={8.5} fontWeight={600} fill={COMP}>
        Q = 24 kN
      </text>
      <text x={x + 8} y={BEAM_Y + 28} fontSize={8} fill={MUTED}>
        x = 0,75 m
      </text>
    </g>
  )
}

function BeamRig({
  draw = 1,
  reactions = false,
  resultant = false,
  showDims = false,
  highlight,
  loadOpacity = 1,
  pointOpacity = 1,
  cutAt,
}: {
  draw?: number
  reactions?: boolean
  resultant?: boolean
  showDims?: boolean
  highlight?: [number, number]
  loadOpacity?: number
  pointOpacity?: number
  cutAt?: number
}) {
  return (
    <g>
      {highlight && (
        <rect
          x={xAt(highlight[0])}
          y={BEAM_Y - 18}
          width={xAt(highlight[1]) - xAt(highlight[0])}
          height={36}
          rx={4}
          fill={BLUE}
          fillOpacity={0.09 * draw}
          stroke={BLUE}
          strokeWidth={1}
          strokeDasharray="4 3"
        />
      )}
      <line x1={X0} y1={BEAM_Y} x2={X1} y2={BEAM_Y} stroke={EDGE} strokeWidth={5} strokeLinecap="round" />
      <Support x={X0} y={BEAM_Y} label="A" active={reactions} />
      <Support x={xAt(C)} y={BEAM_Y} label="C" active={reactions} />
      <text x={xAt(B)} y={BEAM_Y + 14} textAnchor="middle" fontSize={8.5} fontWeight={600} fill={INK}>
        B
      </text>
      <text x={xAt(L)} y={BEAM_Y + 14} textAnchor="middle" fontSize={8.5} fontWeight={600} fill={INK}>
        D
      </text>
      <DistributedLoad from={0} to={B} y={BEAM_Y} opacity={loadOpacity} draw={draw} />
      <MomentLoad x={xAt(B)} y={BEAM_Y} opacity={pointOpacity * draw} />
      <PointLoad x={xAt(L)} y={BEAM_Y} opacity={pointOpacity * draw} />
      {resultant && <Resultant draw={draw} />}
      {reactions && (
        <g>
          <Reaction x={X0 + 20} y={BEAM_Y} label="R_A = 8 kN" draw={draw} />
          <Reaction x={xAt(C) - 20} y={BEAM_Y} label="R_C = 28 kN" draw={draw} />
        </g>
      )}
      {showDims && (
        <g>
          <Dimension x1={X0} x2={xAt(B)} y={BEAM_Y + 52} label="1,5 m" />
          <Dimension x1={xAt(B)} x2={xAt(C)} y={BEAM_Y + 52} label="0,5 m" />
          <Dimension x1={xAt(C)} x2={X1} y={BEAM_Y + 52} label="0,5 m" />
          <text x={X0} y={BEAM_Y + 78} fontSize={8} fill={MUTED}>
            x = 0
          </text>
          <text x={xAt(B)} y={BEAM_Y + 78} textAnchor="middle" fontSize={8} fill={MUTED}>
            x = 1,5 m
          </text>
          <text x={xAt(C)} y={BEAM_Y + 78} textAnchor="middle" fontSize={8} fill={MUTED}>
            x = 2,0 m
          </text>
          <text x={X1} y={BEAM_Y + 78} textAnchor="middle" fontSize={8} fill={MUTED}>
            x = 2,5 m
          </text>
        </g>
      )}
      {cutAt != null && (
        <g>
          <line
            x1={xAt(cutAt)}
            y1={BEAM_Y - 10}
            x2={xAt(cutAt)}
            y2={S_BASE + 20}
            stroke={LOAD}
            strokeWidth={1}
            strokeDasharray="4 3"
            opacity={0.75}
          />
          <circle cx={xAt(cutAt)} cy={BEAM_Y} r={3.2} fill={LOAD} />
        </g>
      )}
    </g>
  )
}

function DiagramBase({ kind }: { kind: 'shear' | 'moment' }) {
  const base = kind === 'shear' ? S_BASE : M_BASE
  return (
    <g>
      <line x1={X0} y1={base} x2={X1 + 6} y2={base} stroke="#c9d0d9" strokeWidth={1} />
      <text x={16} y={base - 16} fontSize={10} fontWeight={700} fill={kind === 'shear' ? BLUE : LOAD}>
        {kind === 'shear' ? 'T' : 'M'}
      </text>
      <text x={X1 + 9} y={base + 3} fontSize={8} fill={MUTED}>
        x
      </text>
    </g>
  )
}

function DiagramPath({ d, draw, color }: { d: string; draw: number; color: string }) {
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={2.6}
      strokeLinejoin="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: draw }}
      transition={{ duration: 0.12, ease: 'linear' }}
    />
  )
}

function Marker({
  x,
  y,
  text,
  color,
  anchor = 'middle',
  dx = 0,
  dy = -6,
  show = 1,
}: {
  x: number
  y: number
  text: string
  color: string
  anchor?: 'start' | 'middle' | 'end'
  dx?: number
  dy?: number
  show?: number
}) {
  return (
    <motion.g initial={false} animate={{ opacity: show }} transition={{ duration: 0.15 }}>
      <circle cx={x} cy={y} r={3} fill={color} />
      <text x={x + dx} y={y + dy} textAnchor={anchor} fontSize={8.5} fontWeight={600} fill={color}>
        {text}
      </text>
    </motion.g>
  )
}

function Scanner({ x, from, to, draw }: { x: number; from: number; to: number; draw: number }) {
  return (
    <line x1={x} y1={from} x2={x} y2={to} stroke={LOAD} strokeWidth={1} strokeDasharray="3 3" opacity={0.65 * draw} />
  )
}

const momentAB = Array.from({ length: 41 }, (_, index) => {
  const x = (index / 40) * B
  return [x, 8 * x - 8 * x * x] as [number, number]
})

const toPath = (points: Array<[number, number]>, yMap: (value: number) => number) =>
  points
    .map(([x, value], index) => `${index === 0 ? 'M' : 'L'} ${xAt(x).toFixed(1)} ${yMap(value).toFixed(1)}`)
    .join(' ')

const shearAB = `M ${xAt(0)} ${yS(8)} L ${xAt(B)} ${yS(-16)}`
const shearFull = `M ${xAt(0)} ${yS(8)} L ${xAt(B)} ${yS(-16)} L ${xAt(C)} ${yS(-16)} L ${xAt(C)} ${yS(12)} L ${xAt(L)} ${yS(12)}`
const shearCD = `M ${xAt(C)} ${yS(12)} L ${xAt(L)} ${yS(12)}`
const momentABPath = toPath(momentAB, yM)
const momentFullPath = `${momentABPath} L ${xAt(B)} ${yM(2)} L ${xAt(C)} ${yM(-6)} L ${xAt(L)} ${yM(0)}`
const momentCD = `M ${xAt(C)} ${yM(-6)} L ${xAt(L)} ${yM(0)}`

function ModelScene({ p }: { p: number }) {
  return (
    <g>
      <Header title="BELKA Z PRZEWIESZENIEM · MODEL" note="q = 16 kN/m · M_B = 8 kNm · P = 12 kN · podpory A i C" />
      <BeamRig draw={smooth(p)} showDims pointOpacity={0.85} />
      <text x={X0} y={BEAM_Y + 96} fontSize={8.5} fill={MUTED}>
        dodatni moment gnący: ugięcie brzusznikiem w dół
      </text>
      <text x={X1} y={BEAM_Y + 96} textAnchor="end" fontSize={8.5} fill={MUTED}>
        oś x od A w prawo
      </text>
    </g>
  )
}

function LoadScene({ p }: { p: number }) {
  const draw = smooth(p)
  return (
    <g>
      <Header title="OBCIĄŻENIE ZASTĘPCZE · WYPADKOWA q" note="q × 1,5 m → Q = 24 kN w środku odcinka" />
      <BeamRig draw={draw} resultant loadOpacity={0.38} pointOpacity={0.45} showDims />
      <text x={xAt(0.75)} y={BEAM_Y + 96} textAnchor="middle" fontSize={8.5} fill={COMP}>
        wypadkowa działa w x = 0,75 m
      </text>
    </g>
  )
}

function ReactionScene({ p }: { p: number }) {
  const draw = smooth(p)
  return (
    <g>
      <Header title="RÓWNOWAGA · REAKCJE PODPÓR" note="R_A = 8 kN i R_C = 28 kN działają w górę" />
      <BeamRig draw={draw} reactions loadOpacity={0.55} pointOpacity={0.7} />
      <text x={X0} y={BEAM_Y + 82} fontSize={8.5} fill={MUTED}>
        ΣM_A = 0 wyznacza R_C
      </text>
      <text x={X1} y={BEAM_Y + 82} textAnchor="end" fontSize={8.5} fill={MUTED}>
        ΣF_y = 0 daje R_A
      </text>
    </g>
  )
}

function ShearScene({ p }: { p: number }) {
  const draw = smooth(p)
  const scan = 0.02 + 1.45 * draw
  return (
    <g>
      <Header title="SIŁA POPRZECZNA NA AB" note="T maleje liniowo i przechodzi przez zero w x = 0,5 m" />
      <BeamRig draw={0.6} cutAt={scan} loadOpacity={0.5} pointOpacity={0.55} />
      <DiagramBase kind="shear" />
      <DiagramPath d={shearAB} draw={draw} color={BLUE} />
      <Scanner x={xAt(scan)} from={BEAM_Y} to={S_BASE} draw={draw} />
      <Marker x={xAt(0)} y={yS(8)} text="+8" color={BLUE} dx={3} dy={-7} show={draw > 0.1 ? 1 : 0} />
      <Marker x={xAt(B)} y={yS(-16)} text="−16" color={BLUE} dx={4} dy={12} show={draw > 0.65 ? 1 : 0} />
      <Marker x={xAt(0.5)} y={yS(0)} text="T = 0" color={OK} dy={-8} show={draw > 0.35 ? 1 : 0} />
      <text x={X0} y={S_BASE + 18} fontSize={8.5} fill={MUTED}>
        T(x) = 8 − 16x kN
      </text>
      <text x={X1} y={S_BASE + 18} textAnchor="end" fontSize={8.5} fill={BLUE}>
        zero w x = 0,5 m
      </text>
    </g>
  )
}

function MomentScene({ p }: { p: number }) {
  const draw = smooth(p)
  const scan = 0.02 + 1.45 * draw
  return (
    <g>
      <Header title="MOMENT GNĄCY NA AB" note="parabola od 0 przez +2 kNm do −6 kNm przed B" />
      <BeamRig draw={0.6} cutAt={scan} loadOpacity={0.5} pointOpacity={0.55} />
      <DiagramBase kind="moment" />
      <DiagramPath d={momentABPath} draw={draw} color={LOAD} />
      <Scanner x={xAt(scan)} from={BEAM_Y} to={M_BASE} draw={draw} />
      <Marker x={xAt(0.5)} y={yM(2)} text="+2" color={OK} dy={-8} show={draw > 0.4 ? 1 : 0} />
      <Marker x={xAt(B)} y={yM(-6)} text="−6" color={LOAD} dx={4} dy={-8} show={draw > 0.75 ? 1 : 0} />
      <text x={X0} y={M_BASE + 18} fontSize={8.5} fill={MUTED}>
        M(x) = 8x − 8x² kNm
      </text>
      <text x={X1} y={M_BASE + 18} textAnchor="end" fontSize={8.5} fill={OK}>
        maksimum +2 kNm przy T = 0
      </text>
    </g>
  )
}

function JumpScene({ p }: { p: number }) {
  const draw = smooth(p)
  return (
    <g>
      <Header title="SKOK MOMENTU W B I ODCINEK BC" note="moment skupiony 8 kNm zmienia M, ale nie zmienia T" />
      <BeamRig draw={0.55} loadOpacity={0.45} pointOpacity={0.6} />
      <DiagramBase kind="shear" />
      <DiagramPath d={shearFull} draw={draw} color={BLUE} />
      <DiagramBase kind="moment" />
      <DiagramPath d={momentFullPath} draw={draw} color={LOAD} />
      <line
        x1={xAt(B)}
        y1={BEAM_Y}
        x2={xAt(B)}
        y2={M_BASE + 8}
        stroke={VIOLET}
        strokeWidth={1.2}
        strokeDasharray="4 3"
        opacity={draw}
      />
      <Marker
        x={xAt(B)}
        y={yM(-6)}
        text="M(1,5⁻) = −6"
        color={LOAD}
        anchor="end"
        dx={-8}
        dy={12}
        show={draw > 0.5 ? 1 : 0}
      />
      <Marker x={xAt(B)} y={yM(2)} text="M(1,5⁺) = +2" color={OK} dx={8} dy={-8} show={draw > 0.65 ? 1 : 0} />
      <Marker x={xAt(C)} y={yS(-16)} text="T = −16" color={BLUE} dx={6} dy={12} show={draw > 0.8 ? 1 : 0} />
      <text x={X0} y={M_BASE + 18} fontSize={8.5} fill={MUTED}>
        na BC: T = −16 kN, M zmienia się liniowo
      </text>
    </g>
  )
}

function OverhangScene({ p }: { p: number }) {
  const draw = smooth(p)
  return (
    <g>
      <Header title="PRZEWIESZENIE CD" note="w C reakcja 28 kN zmienia T z −16 na +12 kN" />
      <BeamRig draw={0.55} highlight={[C, L]} loadOpacity={0.35} pointOpacity={0.85} />
      <DiagramBase kind="shear" />
      <motion.path d={shearFull} fill="none" stroke={BLUE} strokeWidth={2} opacity={0.18} />
      <DiagramPath d={shearCD} draw={draw} color={BLUE} />
      <DiagramBase kind="moment" />
      <motion.path d={momentFullPath} fill="none" stroke={LOAD} strokeWidth={2} opacity={0.18} />
      <DiagramPath d={momentCD} draw={draw} color={LOAD} />
      <Marker x={xAt(C)} y={yS(12)} text="+12" color={BLUE} dx={6} dy={-8} show={draw > 0.35 ? 1 : 0} />
      <Marker x={xAt(C)} y={yM(-6)} text="−6" color={LOAD} dx={6} dy={-8} show={draw > 0.35 ? 1 : 0} />
      <Marker x={xAt(L)} y={yM(0)} text="0" color={MUTED} dx={4} dy={-7} show={draw > 0.65 ? 1 : 0} />
      <text x={xAt((C + L) / 2)} y={BEAM_Y + 46} textAnchor="middle" fontSize={8.5} fontWeight={600} fill={BLUE}>
        CD: T = +12 kN, M rośnie do 0
      </text>
    </g>
  )
}

function MaxMomentScene({ p }: { p: number }) {
  const draw = smooth(p)
  return (
    <g>
      <Header title="NAJWIĘKSZY MOMENT · |M|max" note="największa wartość bezwzględna to 6 kNm" />
      <BeamRig draw={0.45} loadOpacity={0.35} pointOpacity={0.55} />
      <DiagramBase kind="shear" />
      <DiagramPath d={shearFull} draw={draw} color={BLUE} />
      <DiagramBase kind="moment" />
      <DiagramPath d={momentFullPath} draw={draw} color={LOAD} />
      <line
        x1={X0}
        y1={yM(-6)}
        x2={X1}
        y2={yM(-6)}
        stroke={LOAD}
        strokeWidth={1}
        strokeDasharray="4 3"
        opacity={0.55 * draw}
      />
      <Marker x={xAt(B)} y={yM(-6)} text="−6" color={LOAD} dx={-4} dy={-8} show={draw > 0.55 ? 1 : 0} />
      <Marker x={xAt(C)} y={yM(-6)} text="−6" color={LOAD} dx={4} dy={-8} show={draw > 0.65 ? 1 : 0} />
      <Marker x={xAt(0.5)} y={yM(2)} text="+2" color={OK} dx={0} dy={-8} show={draw > 0.5 ? 1 : 0} />
      <text x={X1} y={yM(-6) - 6} textAnchor="end" fontSize={9} fontWeight={700} fill={LOAD}>
        |M|max = 6 kNm
      </text>
    </g>
  )
}

function IBeam({
  cx,
  top,
  height,
  width,
  flange,
  web,
  draw,
}: {
  cx: number
  top: number
  height: number
  width: number
  flange: number
  web: number
  draw: number
}) {
  const bottom = top + height
  const mid = top + height / 2
  const levels = Array.from({ length: 11 }, (_, index) => top + (height * index) / 10)
  return (
    <g>
      <rect x={cx - width / 2} y={top} width={width} height={flange} fill={FILL} stroke={EDGE} strokeWidth={1.5} />
      <rect
        x={cx - web / 2}
        y={top + flange}
        width={web}
        height={height - 2 * flange}
        fill={FILL}
        stroke={EDGE}
        strokeWidth={1.5}
      />
      <rect
        x={cx - width / 2}
        y={bottom - flange}
        width={width}
        height={flange}
        fill={FILL}
        stroke={EDGE}
        strokeWidth={1.5}
      />
      <line
        x1={cx - width / 2 - 12}
        y1={mid}
        x2={cx + width / 2 + 12}
        y2={mid}
        stroke={VIOLET}
        strokeWidth={1.2}
        strokeDasharray="5 4"
      />
      <text x={cx + width / 2 + 16} y={mid + 3} fontSize={8} fill={VIOLET}>
        oś obojętna
      </text>
      {levels.map((y, index) => {
        const ratio = (mid - y) / (height / 2)
        if (Math.abs(ratio) < 0.12) return null
        const length = Math.abs(ratio) * 28 * draw
        const above = ratio > 0
        const startX = above ? cx - width / 2 : cx + width / 2
        const endX = above ? startX - length : startX + length
        return (
          <line
            key={`stress-${index}`}
            x1={startX}
            y1={y}
            x2={endX}
            y2={y}
            stroke={above ? COMP : TENS}
            strokeWidth={1.5}
            markerEnd={length > 7 ? (above ? 'url(#cw91-comp)' : 'url(#cw91-tens)') : undefined}
          />
        )
      })}
      <text x={cx} y={top - 9} textAnchor="middle" fontSize={9} fontWeight={700} fill={COMP}>
        σmax = 73,3 MPa
      </text>
      <text x={cx} y={bottom + 17} textAnchor="middle" fontSize={9} fontWeight={700} fill={TENS}>
        σmax = 73,3 MPa
      </text>
      <text x={cx} y={bottom + 30} textAnchor="middle" fontSize={8} fill={MUTED}>
        dwuteownik I 140
      </text>
    </g>
  )
}

function UtilizationBar({ draw }: { draw: number }) {
  const x = 246
  const y = 100
  const width = 190
  const ratio = 73.3 / 100
  return (
    <g>
      <text x={x} y={y - 24} fontSize={9} fontWeight={700} fill={INK}>
        kontrola naprężeń
      </text>
      <rect x={x} y={y - 10} width={width} height={16} rx={8} fill="#edf1f5" />
      <motion.rect
        x={x}
        y={y - 10}
        height={16}
        rx={8}
        fill={OK}
        fillOpacity={0.3}
        stroke={OK}
        strokeWidth={1.2}
        initial={{ width: 0 }}
        animate={{ width: width * ratio * draw }}
        transition={{ duration: 0.12, ease: 'linear' }}
      />
      <line
        x1={x + width * ratio}
        y1={y - 16}
        x2={x + width * ratio}
        y2={y + 12}
        stroke={OK}
        strokeWidth={1.2}
        strokeDasharray="4 3"
      />
      <line
        x1={x + width}
        y1={y - 16}
        x2={x + width}
        y2={y + 12}
        stroke={LOAD}
        strokeWidth={1.2}
        strokeDasharray="4 3"
      />
      <text x={x} y={y + 24} fontSize={8.5} fill={MUTED}>
        σmax = 73,3 MPa
      </text>
      <text x={x + width} y={y + 24} textAnchor="end" fontSize={8.5} fill={LOAD}>
        k_g = 100 MPa
      </text>
      <text x={x} y={y + 44} fontSize={8.5} fill={OK}>
        ✓ σmax &lt; k_g — zapas 26,7%
      </text>
      <text x={x} y={y + 64} fontSize={8.5} fill={MUTED}>
        σmax = M / W_y = 6·10⁶ / 81,9·10³
      </text>
    </g>
  )
}

function DesignScene({ p }: { p: number }) {
  const draw = smooth(p)
  return (
    <g>
      <Header title="DWUTEOWNIK I 140 · SPRAWDZENIE" note="W_y = 81,9 cm³ · k_g = 100 MPa · |M|max = 6 kNm" />
      <IBeam cx={112} top={58} height={174} width={84} flange={13} web={8} draw={draw} />
      <UtilizationBar draw={draw} />
    </g>
  )
}

function DeflectionCurve({ draw }: { draw: number }) {
  const xC = xAt(C)
  const sag = 18 * draw
  const over = 26 * draw
  return (
    <g>
      <line x1={X0} y1={BEAM_Y} x2={X1} y2={BEAM_Y} stroke={MUTED} strokeWidth={1} strokeDasharray="5 4" />
      <path
        d={`M ${X0} ${BEAM_Y} Q ${(X0 + xC) / 2} ${BEAM_Y + sag} ${xC} ${BEAM_Y} Q ${(xC + X1) / 2} ${
          BEAM_Y + over * 0.5
        } ${X1} ${BEAM_Y + over}`}
        fill="none"
        stroke={BLUE}
        strokeWidth={3}
        strokeLinecap="round"
      />
      <line
        x1={(X0 + xC) / 2}
        y1={BEAM_Y}
        x2={(X0 + xC) / 2}
        y2={BEAM_Y + sag}
        stroke={BLUE}
        strokeWidth={1}
        strokeDasharray="3 3"
      />
      <text x={(X0 + xC) / 2 + 6} y={BEAM_Y + sag + 12} fontSize={8.5} fontWeight={600} fill={BLUE}>
        f
      </text>
      <text x={X1} y={BEAM_Y + over + 16} textAnchor="end" fontSize={8.5} fill={MUTED}>
        koniec D
      </text>
      <text x={X0} y={BEAM_Y + 94} fontSize={8.5} fill={MUTED}>
        EI w″ = −M(x)
      </text>
      <text x={X1} y={BEAM_Y + 94} textAnchor="end" fontSize={8.5} fill={OK}>
        kontrola: f_max ≤ f_dop
      </text>
    </g>
  )
}

function DeflectionScene({ p }: { p: number }) {
  const draw = smooth(p)
  return (
    <g>
      <Header
        title="KONTROLA SZTYWNOŚCI · UGIĘCIE"
        note="kształt linii ugięcia wynika z M(x); strzałka jest powiększona"
      />
      <BeamRig draw={0.4} loadOpacity={0.3} pointOpacity={0.45} />
      <DeflectionCurve draw={draw} />
      <text x={(X0 + X1) / 2} y={BEAM_Y + 112} textAnchor="middle" fontSize={8.5} fill={MUTED}>
        w tym zadaniu o doborze przekroju decyduje warunek naprężeń
      </text>
    </g>
  )
}

function Header({ title, note }: { title: string; note?: string }) {
  return (
    <g>
      <text x={14} y={18} fontSize={9.5} fontWeight={700} fill={INK}>
        {title}
      </text>
      <text x={446} y={18} textAnchor="end" fontSize={8.5} fill={MUTED}>
        I 140 · k_g = 100 MPa
      </text>
      <text x={14} y={31} fontSize={8.5} fill={MUTED}>
        {note ?? 'q = 16 kN/m · M_B = 8 kNm · P = 12 kN'}
      </text>
    </g>
  )
}

export function BeamOverhangDesignAnimation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const p = playing ? smooth(sceneProgress) : 1

  const content =
    metric === 'load' ? (
      <LoadScene p={p} />
    ) : metric === 'reaction' ? (
      <ReactionScene p={p} />
    ) : metric === 'shear' ? (
      <ShearScene p={p} />
    ) : metric === 'moment' ? (
      <MomentScene p={p} />
    ) : metric === 'jump' ? (
      <JumpScene p={p} />
    ) : metric === 'overhang' ? (
      <OverhangScene p={p} />
    ) : metric === 'max-moment' ? (
      <MaxMomentScene p={p} />
    ) : metric === 'design' ? (
      <DesignScene p={p} />
    ) : metric === 'deflection' ? (
      <DeflectionScene p={p} />
    ) : (
      <ModelScene p={p} />
    )

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 300"
          role="img"
          aria-label="Belka z przewieszeniem: obciążenie, reakcje, wykresy siły poprzecznej i momentu, dobór dwuteownika I 140 oraz kontrola naprężeń i ugięcia."
        >
          <defs>
            <marker
              id="cw91-moment"
              viewBox="0 0 10 10"
              refX={8}
              refY={5}
              markerWidth={5}
              markerHeight={5}
              orient="auto"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={VIOLET} />
            </marker>
            <marker
              id="cw91-comp"
              viewBox="0 0 10 10"
              refX={9}
              refY={5}
              markerWidth={5}
              markerHeight={5}
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={COMP} />
            </marker>
            <marker
              id="cw91-tens"
              viewBox="0 0 10 10"
              refX={9}
              refY={5}
              markerWidth={5}
              markerHeight={5}
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={TENS} />
            </marker>
          </defs>
          {content}
        </svg>
      </div>
    </div>
  )
}
