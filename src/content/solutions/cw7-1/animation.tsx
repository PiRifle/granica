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
const FRONT = '#f6f8fd'
const TOP = '#e8eefc'
const RIGHT = '#eef3fc'

const CX = 150
const CY = 160
const W = 112
const H = 108
const DX = 44
const DY = -30
const EPS_Z = -0.000445055
const EXAG = 560

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}
const ramp = (value: number, from: number, to: number) => smooth(clamp01((value - from) / (to - from)))
type Pt = [number, number]

const pts = (items: Pt[]) => items.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ')

function geometry(fx = 1, fz = 1, fy = 1, cx = CX, cy = CY) {
  const w = W * fx
  const h = H * fz
  const dx = DX * fy
  const dy = DY * fy
  const front: Pt[] = [
    [cx - w / 2, cy + h / 2],
    [cx + w / 2, cy + h / 2],
    [cx + w / 2, cy - h / 2],
    [cx - w / 2, cy - h / 2],
  ]
  const back = front.map(([x, y]) => [x + dx, y + dy] as Pt)
  return {
    front,
    back,
    top: [front[3], front[2], back[2], back[3]] as Pt[],
    right: [front[1], front[2], back[2], back[1]] as Pt[],
    frontTop: [(front[3][0] + front[2][0]) / 2, (front[3][1] + front[2][1]) / 2] as Pt,
    frontBottom: [(front[0][0] + front[1][0]) / 2, (front[0][1] + front[1][1]) / 2] as Pt,
  }
}

function Cube3D({
  fx = 1,
  fz = 1,
  fy = 1,
  cx = CX,
  cy = CY,
  ghost = false,
  draw = 1,
  accent,
}: {
  fx?: number
  fz?: number
  fy?: number
  cx?: number
  cy?: number
  ghost?: boolean
  draw?: number
  accent?: string
}) {
  const g = geometry(fx, fz, fy, cx, cy)
  if (ghost) {
    return (
      <g fill="none" stroke={accent ?? MUTED} strokeWidth={1.2} strokeDasharray="5 4" opacity={0.75 * draw}>
        <polygon points={pts(g.front)} />
        <polygon points={pts(g.top)} />
        <polygon points={pts(g.right)} />
      </g>
    )
  }
  return (
    <g stroke={EDGE} strokeWidth={1.4} strokeLinejoin="round">
      <line
        x1={g.back[3][0]}
        y1={g.back[3][1]}
        x2={g.back[0][0]}
        y2={g.back[0][1]}
        strokeWidth={1}
        strokeDasharray="4 3"
        opacity={0.4}
      />
      <polygon points={pts(g.top)} fill={TOP} />
      <polygon points={pts(g.right)} fill={RIGHT} />
      <polygon points={pts(g.front)} fill={FRONT} />
      {accent && <polygon points={pts(g.front)} fill="none" stroke={accent} strokeWidth={1.8} />}
    </g>
  )
}

function Walls({
  fx = 1,
  fz = 1,
  fy = 1,
  cx = CX,
  cy = CY,
  draw = 1,
  accent,
  labels = false,
}: {
  fx?: number
  fz?: number
  fy?: number
  cx?: number
  cy?: number
  draw?: number
  accent?: string
  labels?: boolean
}) {
  const g = geometry(fx, fz, fy, cx, cy)
  const left = g.front[0][0]
  const right = g.front[1][0]
  const top = g.front[3][1]
  const bottom = g.front[0][1]
  return (
    <g opacity={draw}>
      <polygon
        points={`${g.back[0][0] - 16},${g.back[0][1] + 10} ${g.back[1][0] + 16},${g.back[0][1] + 10} ${
          g.back[1][0] + 16
        },${g.back[3][1] - 10} ${g.back[0][0] - 16},${g.back[3][1] - 10}`}
        fill="url(#cw71-hatch)"
        stroke={accent ?? EDGE}
        strokeWidth={1.2}
      />
      <rect
        x={left - 18}
        y={top - 10}
        width={16}
        height={bottom - top + 20}
        fill="url(#cw71-hatch)"
        stroke={accent ?? EDGE}
        strokeWidth={1.2}
      />
      <rect
        x={right + 2}
        y={top - 10}
        width={16}
        height={bottom - top + 20}
        fill="url(#cw71-hatch)"
        stroke={accent ?? EDGE}
        strokeWidth={1.2}
      />
      <rect
        x={left - 22}
        y={bottom}
        width={right - left + 44}
        height={11}
        fill="url(#cw71-hatch)"
        stroke={accent ?? EDGE}
        strokeWidth={1.2}
      />
      {labels && (
        <g fontSize={8} fill={MUTED} stroke="none">
          <text x={left - 24} y={top + 4} textAnchor="end">
            ścianka x
          </text>
          <text x={right + 26} y={bottom - 4}>
            ścianka x
          </text>
          <text x={g.back[1][0] + 20} y={g.back[3][1] - 16}>
            ścianka y
          </text>
        </g>
      )}
    </g>
  )
}

function Arrow({
  x1,
  y1,
  x2,
  y2,
  amount = 1,
  color,
  width = 2.3,
  dash,
}: {
  x1: number
  y1: number
  x2: number
  y2: number
  amount?: number
  color: string
  width?: number
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
  const wing = 3.6
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

function Header({ title, note }: { title: string; note?: string }) {
  return (
    <g>
      <text x={14} y={18} fontSize={9.5} fontWeight={700} fill={INK}>
        {title}
      </text>
      <text x={446} y={18} textAnchor="end" fontSize={8.5} fill={MUTED}>
        a = 10 mm · P = 5 kN
      </text>
      <text x={14} y={31} fontSize={8.5} fill={MUTED}>
        {note ?? 'E = 70 GPa · ν = 0,35 · brak tarcia'}
      </text>
    </g>
  )
}

function ConstraintsScene({ p }: { p: number }) {
  const draw = ramp(p, 0.05, 0.55)
  const g = geometry()
  return (
    <g>
      <Header title="SZEŚCIAN W SZTYWNYM WYCIĘCIU" note="ścianki blokują x i y, siła ściska w kierunku z" />
      <Walls draw={draw} labels />
      <Cube3D />
      <Arrow
        x1={g.frontTop[0]}
        y1={g.frontTop[1] - 48}
        x2={g.frontTop[0]}
        y2={g.frontTop[1] - 5}
        amount={ramp(p, 0.12, 0.48)}
        color={ORANGE}
        width={2.6}
      />
      <text x={g.frontTop[0] + 8} y={g.frontTop[1] - 50} fontSize={9} fontWeight={600} fill={ORANGE}>
        P = 5 kN
      </text>
      <motion.g initial={false} animate={{ opacity: ramp(p, 0.35, 0.65) }}>
        <text x={CX} y={CY + H / 2 + 42} textAnchor="middle" fontSize={9.5} fontWeight={600} fill={BLUE}>
          εx = εy = 0
        </text>
        <text x={CX} y={CY + H / 2 + 57} textAnchor="middle" fontSize={8.5} fill={MUTED}>
          gładkie ścianki: τxy = τyz = τzx = 0
        </text>
      </motion.g>
      <text x={CX} y={CY - H / 2 - 12} textAnchor="middle" fontSize={8.5} fill={MUTED}>
        a = 10 mm
      </text>
    </g>
  )
}

function StressScene({ p }: { p: number }) {
  const draw = smooth(p)
  const shrink = 1 - 0.035 * draw
  const g = geometry(1, shrink, 1)
  const top = g.front[3][1]
  const bottom = g.front[0][1]
  return (
    <g>
      <Header title="NAPREŻENIE PIONOWE · σz" note="siła P działa na pole a²; ściskanie ma znak ujemny" />
      <Walls draw={0.45} />
      <Cube3D fz={shrink} accent={ORANGE} />
      {[-1, 0, 1].map((offset) => {
        const x = CX + offset * 28
        return (
          <g key={`top-${offset}`}>
            <Arrow
              x1={x}
              y1={top - 26}
              x2={x}
              y2={top - 4}
              amount={ramp(p, 0.06 + offset * 0.04, 0.45 + offset * 0.04)}
              color={ORANGE}
              width={2.2}
            />
            <Arrow
              x1={x}
              y1={bottom + 26}
              x2={x}
              y2={bottom + 4}
              amount={ramp(p, 0.3 + offset * 0.04, 0.72 + offset * 0.04)}
              color={ORANGE}
              width={2.2}
            />
          </g>
        )
      })}
      <motion.text
        initial={false}
        animate={{ opacity: ramp(p, 0.35, 0.65) }}
        x={CX}
        y={top - 36}
        textAnchor="middle"
        fontSize={10}
        fontWeight={700}
        fill={ORANGE}
      >
        σz = −50 MPa
      </motion.text>
      <motion.text
        initial={false}
        animate={{ opacity: ramp(p, 0.55, 0.85) }}
        x={CX}
        y={bottom + 44}
        textAnchor="middle"
        fontSize={8.5}
        fill={MUTED}
      >
        σz = −P/a² = −5 000/100 MPa
      </motion.text>
    </g>
  )
}

function HookeScene({ p }: { p: number }) {
  const free = ramp(p, 0.02, 0.38)
  const constrained = ramp(p, 0.4, 0.72)
  const walls = ramp(p, 0.46, 0.78)
  const g = geometry()
  return (
    <g>
      <Header
        title="EFEKT POISSONA I REAKCJA ŚCIANEK"
        note="swobodny sześcian rozszerza się w x i y; wycięcie tego zabrania"
      />
      <Cube3D ghost fx={1 + 0.13 * free} fy={1 + 0.13 * free} fz={1 - 0.12 * free} accent={GREEN} draw={free} />
      <Walls draw={walls} />
      <Cube3D fz={1 - 0.035 * constrained} accent={BLUE} />
      <Arrow
        x1={g.frontTop[0]}
        y1={g.frontTop[1] - 40}
        x2={g.frontTop[0]}
        y2={g.frontTop[1] - 5}
        amount={ramp(p, 0.08, 0.4)}
        color={ORANGE}
        width={2.4}
      />
      <text x={g.frontTop[0] + 8} y={g.frontTop[1] - 42} fontSize={9} fontWeight={600} fill={ORANGE}>
        σz
      </text>
      <Arrow
        x1={g.front[0][0] - 38}
        y1={g.front[0][1] - 24}
        x2={g.front[0][0] - 4}
        y2={g.front[0][1] - 24}
        amount={walls}
        color={BLUE}
        width={2.4}
      />
      <Arrow
        x1={g.front[1][0] + 38}
        y1={g.front[0][1] - 24}
        x2={g.front[1][0] + 4}
        y2={g.front[0][1] - 24}
        amount={walls}
        color={BLUE}
        width={2.4}
      />
      <motion.text initial={false} animate={{ opacity: free }} x={CX + 92} y={CY - 42} fontSize={8.5} fill={GREEN}>
        swobodnie: εx &gt; 0
      </motion.text>
      <motion.text
        initial={false}
        animate={{ opacity: constrained }}
        x={CX - 40}
        y={CY + 66}
        textAnchor="end"
        fontSize={8.5}
        fill={BLUE}
      >
        w wycięciu: εx = 0
      </motion.text>
      <motion.text
        initial={false}
        animate={{ opacity: ramp(p, 0.6, 0.9) }}
        x={CX}
        y={CY + H / 2 + 48}
        textAnchor="middle"
        fontSize={8.5}
        fill={MUTED}
      >
        ścianki wywierają nacisk σx = σy, bo nie pozwalają na poprzeczne rozszerzenie
      </motion.text>
    </g>
  )
}

function LateralScene({ p }: { p: number }) {
  const draw = smooth(p)
  const g = geometry()
  return (
    <g>
      <Header title="NACISKI ŚCIANEK · σx = σy" note="zerowe εx i εy wymagają niezerowych naprężeń poziomych" />
      <Walls draw={0.6} accent={BLUE} />
      <Cube3D fz={1 - 0.025 * draw} accent={BLUE} />
      <Arrow
        x1={g.front[0][0] - 44}
        y1={CY - 8}
        x2={g.front[0][0] - 4}
        y2={CY - 8}
        amount={ramp(p, 0.06, 0.42)}
        color={BLUE}
        width={2.8}
      />
      <Arrow
        x1={g.front[1][0] + 44}
        y1={CY - 8}
        x2={g.front[1][0] + 4}
        y2={CY - 8}
        amount={ramp(p, 0.16, 0.52)}
        color={BLUE}
        width={2.8}
      />
      <Arrow
        x1={g.back[0][0] + 10}
        y1={g.back[0][1] + 14}
        x2={g.front[0][0] + 10}
        y2={g.front[0][1] + 14}
        amount={ramp(p, 0.03, 0.88)}
        color={GREEN}
        width={2.6}
      />
      <motion.g initial={false} animate={{ opacity: ramp(p, 0.42, 0.72) }}>
        <text x={CX} y={CY - H / 2 - 22} textAnchor="middle" fontSize={10} fontWeight={700} fill={BLUE}>
          σx = σy = −26,923 MPa
        </text>
      </motion.g>
      <text x={CX} y={CY + H / 2 + 40} textAnchor="middle" fontSize={8.5} fill={MUTED}>
        σx = σy = ν/(1 − ν) · σz
      </text>
    </g>
  )
}

function StrainScene({ p }: { p: number }) {
  const draw = ramp(p, 0.04, 0.8)
  const shrink = 1 + EPS_Z * EXAG * draw
  return (
    <g>
      <Header
        title="DEFORMACJA · skrócenie tylko w kierunku z"
        note="boki x i y zachowują długość, bo są zablokowane"
      />
      <Cube3D ghost draw={draw} />
      <Walls draw={0.35} />
      <Cube3D fz={shrink} accent={BLUE} />
      <Arrow
        x1={CX + W / 2 + 20}
        y1={CY - H / 2}
        x2={CX + W / 2 + 20}
        y2={CY - (H * shrink) / 2}
        amount={draw}
        color={BLUE}
        width={1.6}
        dash="4 3"
      />
      <motion.g initial={false} animate={{ opacity: ramp(p, 0.35, 0.68) }}>
        <text x={CX} y={CY + H / 2 + 42} textAnchor="middle" fontSize={9.5} fontWeight={700} fill={BLUE}>
          εz = −4,45055·10⁻⁴ = −445,055 μɛ
        </text>
        <text x={CX} y={CY + H / 2 + 57} textAnchor="middle" fontSize={8.5} fill={MUTED}>
          εx = εy = 0 · skrócenie pionowe a|εz| = 0,00445 mm
        </text>
      </motion.g>
    </g>
  )
}

function TensorScene({ p }: { p: number }) {
  const draw = ramp(p, 0.04, 0.75)
  const shrink = 1 + EPS_Z * EXAG * draw
  const g = geometry(1, shrink, 1)
  return (
    <g>
      <Header title="PEŁNY STAN ODKSZTAŁCENIA" note="naprężenia styczne są zerowe, więc tensor jest diagonalny" />
      <Cube3D ghost draw={draw} />
      <Cube3D fz={shrink} accent={VIOLET} />
      <text x={g.front[3][0] - 8} y={(g.front[3][1] + g.front[0][1]) / 2} textAnchor="end" fontSize={8.5} fill={BLUE}>
        εx = 0
      </text>
      <text x={g.back[1][0] + 8} y={g.back[1][1] - 4} fontSize={8.5} fill={GREEN}>
        εy = 0
      </text>
      <text x={g.front[3][0] + 10} y={g.front[3][1] - 8} fontSize={8.5} fill={ORANGE}>
        εz = −445 μɛ
      </text>
      <g transform="translate(296 92)">
        <text x={0} y={0} fontSize={8.5} fill={MUTED}>
          tensor ε [μɛ]
        </text>
        <path d="M 0 10 l -5 0 l 0 60 l 5 0" fill="none" stroke={EDGE} strokeWidth={1.1} />
        <path d="M 82 10 l 5 0 l 0 60 l -5 0" fill="none" stroke={EDGE} strokeWidth={1.1} />
        {[
          ['0', '0', '0'],
          ['0', '0', '0'],
          ['0', '0', '−445'],
        ].map((row, rowIndex) =>
          row.map((value, colIndex) => (
            <text
              key={`${rowIndex}-${colIndex}`}
              x={12 + colIndex * 26}
              y={25 + rowIndex * 18}
              fontSize={9}
              fontWeight={rowIndex === 2 && colIndex === 2 ? 700 : 400}
              fill={rowIndex === 2 && colIndex === 2 ? ORANGE : MUTED}
            >
              {value}
            </text>
          )),
        )}
      </g>
      <text x={CX} y={CY + H / 2 + 42} textAnchor="middle" fontSize={8.5} fill={MUTED}>
        tylko składowa εz jest niezerowa
      </text>
    </g>
  )
}

function VolumetricScene({ p }: { p: number }) {
  const draw = ramp(p, 0.05, 0.8)
  const shrink = 1 + EPS_Z * EXAG * draw
  const zeroX = 342
  const span = 70
  const max = 0.0006
  const rows = [
    { label: 'εx', value: 0, color: BLUE, y: 106 },
    { label: 'εy', value: 0, color: GREEN, y: 130 },
    { label: 'εz', value: EPS_Z, color: ORANGE, y: 154 },
  ]
  const width = (Math.abs(EPS_Z) / max) * span * draw
  return (
    <g>
      <Header title="ODKSZTAŁCENIE OBJĘTOŚCIOWE · θ" note="θ jest sumą trzech odkształceń normalnych" />
      <Cube3D ghost draw={draw} cx={112} cy={160} />
      <Cube3D fz={shrink} accent={VIOLET} cx={112} cy={160} />
      <text x={14} y={78} fontSize={8.5} fill={MUTED}>
        θ = εx + εy + εz
      </text>
      <line x1={zeroX} y1={92} x2={zeroX} y2={230} stroke={MUTED} strokeWidth={1} opacity={0.7} />
      {rows.map((row) => {
        const barWidth = (Math.abs(row.value) / max) * span * draw
        const x = row.value < 0 ? zeroX - barWidth : zeroX
        return (
          <g key={row.label}>
            <text x={250} y={row.y + 12} fontSize={9} fontWeight={600} fill={row.color}>
              {row.label}
            </text>
            <motion.rect
              x={x}
              y={row.y}
              width={barWidth}
              height={16}
              rx={3}
              fill={row.color}
              initial={false}
              animate={{ x, width: barWidth }}
              transition={{ duration: 0.12, ease: 'linear' }}
              opacity={0.8}
            />
            <text
              x={row.value < 0 ? x - 5 : x + 5}
              y={row.y + 12}
              textAnchor={row.value < 0 ? 'end' : 'start'}
              fontSize={8.5}
              fill={MUTED}
            >
              {row.value === 0 ? '0' : '−445 μɛ'}
            </text>
          </g>
        )
      })}
      <line x1={250} y1={178} x2={438} y2={178} stroke={EDGE} strokeWidth={1} opacity={0.35} />
      <text x={250} y={206} fontSize={9} fontWeight={700} fill={VIOLET}>
        θ
      </text>
      <motion.rect
        x={zeroX - width}
        y={194}
        width={width}
        height={16}
        rx={3}
        fill={VIOLET}
        initial={false}
        animate={{ x: zeroX - width, width }}
        transition={{ duration: 0.12, ease: 'linear' }}
        opacity={0.9}
      />
      <text x={zeroX - width - 5} y={206} textAnchor="end" fontSize={8.5} fill={VIOLET}>
        −445 μɛ
      </text>
    </g>
  )
}

function VolumeChangeScene({ p }: { p: number }) {
  const draw = ramp(p, 0.04, 0.8)
  const shrink = 1 + EPS_Z * EXAG * draw
  const original = geometry()
  const deformed = geometry(1, shrink, 1)
  return (
    <g>
      <Header title="ZMIANA OBJĘTOŚCI · ΔV" note="V = V₀(1 + θ); objętość maleje mimo zablokowania x i y" />
      <Cube3D ghost draw={draw} />
      <Cube3D fz={shrink} accent={VIOLET} />
      <text x={original.front[3][0] - 8} y={original.front[3][1] - 8} textAnchor="end" fontSize={8.5} fill={MUTED}>
        V₀
      </text>
      <text x={deformed.front[3][0] + 8} y={deformed.front[3][1] - 8} fontSize={8.5} fill={VIOLET}>
        V
      </text>
      <Arrow
        x1={CX + W / 2 + 24}
        y1={original.front[3][1]}
        x2={CX + W / 2 + 24}
        y2={deformed.front[3][1]}
        amount={draw}
        color={VIOLET}
        width={1.8}
        dash="4 3"
      />
      <motion.g initial={false} animate={{ opacity: ramp(p, 0.4, 0.72) }}>
        <text x={CX} y={CY + H / 2 + 44} textAnchor="middle" fontSize={10} fontWeight={700} fill={VIOLET}>
          ΔV = −0,445055 mm³
        </text>
        <text x={CX} y={CY + H / 2 + 59} textAnchor="middle" fontSize={8.5} fill={MUTED}>
          θ = ΔV/V₀ = −4,45055·10⁻⁴
        </text>
      </motion.g>
    </g>
  )
}

function ResultScene({ p }: { p: number }) {
  const draw = ramp(p, 0.05, 0.75)
  const shrink = 1 + EPS_Z * EXAG * draw
  return (
    <g>
      <Header title="SWOBODNIE CZY W WYCIĘCIU?" note="więzy zmieniają stan naprężenia i odkształcenia" />
      <Cube3D ghost draw={draw} cx={104} cy={148} />
      <Cube3D fx={1 + 0.12 * draw} fy={1 + 0.12 * draw} fz={shrink} accent={GREEN} cx={104} cy={148} />
      <text x={104} y={220} textAnchor="middle" fontSize={9} fontWeight={600} fill={GREEN}>
        swobodnie
      </text>
      <text x={104} y={234} textAnchor="middle" fontSize={8.5} fill={MUTED}>
        εx = εy &gt; 0
      </text>
      <Walls cx={344} cy={148} draw={draw} />
      <Cube3D fz={shrink} accent={BLUE} cx={344} cy={148} />
      <text x={344} y={220} textAnchor="middle" fontSize={9} fontWeight={600} fill={BLUE}>
        w wycięciu
      </text>
      <text x={344} y={234} textAnchor="middle" fontSize={8.5} fill={MUTED}>
        εx = εy = 0
      </text>
      <motion.g initial={false} animate={{ opacity: ramp(p, 0.55, 0.88) }}>
        <text x={230} y={266} textAnchor="middle" fontSize={9.5} fontWeight={700} fill={INK}>
          εz = −4,45055·10⁻⁴ · ΔV = −0,445055 mm³
        </text>
        <text x={230} y={281} textAnchor="middle" fontSize={8.5} fill={MUTED}>
          zerowe εx i εy wyznaczają σx i σy, a nie zniknięcie naprężeń
        </text>
      </motion.g>
    </g>
  )
}

export function ConstrainedCubeAnimation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'constraints'
  const p = playing ? smooth(sceneProgress) : 1

  const content =
    metric === 'stress' ? (
      <StressScene p={p} />
    ) : metric === 'hooke' ? (
      <HookeScene p={p} />
    ) : metric === 'lateral' ? (
      <LateralScene p={p} />
    ) : metric === 'strain' ? (
      <StrainScene p={p} />
    ) : metric === 'tensor' ? (
      <TensorScene p={p} />
    ) : metric === 'volumetric' ? (
      <VolumetricScene p={p} />
    ) : metric === 'volume-change' ? (
      <VolumeChangeScene p={p} />
    ) : metric === 'result' ? (
      <ResultScene p={p} />
    ) : (
      <ConstraintsScene p={p} />
    )

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 310"
          role="img"
          aria-label="Sześcian aluminiowy w sztywnym wycięciu: blokada odkształceń w x i y, naprężenia ściskające, skrócenie pionowe i zmiana objętości."
        >
          <defs>
            <pattern id="cw71-hatch" patternUnits="userSpaceOnUse" width="7" height="7" patternTransform="rotate(45)">
              <rect width="7" height="7" fill="#e5e9ef" />
              <line x1="0" y1="0" x2="0" y2="7" stroke="#b7c0cc" strokeWidth="1.2" />
            </pattern>
          </defs>
          {content}
        </svg>
      </div>
    </div>
  )
}
