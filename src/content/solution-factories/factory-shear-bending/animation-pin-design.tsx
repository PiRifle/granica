import type { ComponentType } from 'react'
import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import type { PinDesignInputs } from './factory'
import { local } from '../../../components/solution-figures/shared'

const BLUE = '#4f6df5'
const LOAD = '#ff6b45'
const OK = '#2f7d5b'
const VIOLET = '#a970dd'
const PLANE = '#d94a3d'
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
const lerp = (from: number, to: number, t: number) => from + (to - from) * t

function Arrow({
  x1,
  y1,
  x2,
  y2,
  color,
  amount = 1,
  width = 2.2,
}: {
  x1: number
  y1: number
  x2: number
  y2: number
  color: string
  amount?: number
  width?: number
}) {
  const t = clamp01(amount)
  if (t < 0.03) return null
  const ex = x1 + (x2 - x1) * t
  const ey = y1 + (y2 - y1) * t
  const angle = Math.atan2(ey - y1, ex - x1)
  const head = 7.5
  const baseX = ex - head * Math.cos(angle)
  const baseY = ey - head * Math.sin(angle)
  const wing = 3.8
  const lx = baseX - wing * Math.sin(angle)
  const ly = baseY + wing * Math.cos(angle)
  const rx = baseX + wing * Math.sin(angle)
  const ry = baseY - wing * Math.cos(angle)
  return (
    <g stroke={color} fill={color}>
      <line x1={x1} y1={y1} x2={baseX} y2={baseY} strokeWidth={width} strokeLinecap="round" />
      <polygon points={`${ex},${ey} ${lx},${ly} ${rx},${ry}`} stroke="none" />
    </g>
  )
}

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

function WallPin({
  x0,
  wallTop,
  wallBottom,
  thickness,
  pinY,
  pinHeight,
  pinEnd,
  reveal = 1,
  contact = 0,
}: {
  x0: number
  wallTop: number
  wallBottom: number
  thickness: number
  pinY: number
  pinHeight: number
  pinEnd: number
  reveal?: number
  contact?: number
}) {
  const pinTop = pinY - pinHeight / 2
  const offset = thickness * 0.62
  const hatches: number[] = []
  for (let y = wallTop + offset; y <= wallBottom; y += 16) hatches.push(y)
  return (
    <g opacity={clamp01(reveal)}>
      <rect
        x={x0}
        y={wallTop}
        width={thickness}
        height={wallBottom - wallTop}
        fill="#e9eef6"
        stroke={EDGE}
        strokeWidth={1.3}
      />
      <g stroke={EDGE} strokeWidth={1} opacity={0.55}>
        {hatches.map((y) => (
          <line key={`wall-hatch-${y}`} x1={x0} y1={y} x2={x0 + thickness} y2={y - offset} />
        ))}
      </g>
      <rect
        x={x0 - 8}
        y={pinTop}
        width={pinEnd - (x0 - 8)}
        height={pinHeight}
        rx={pinHeight / 2}
        fill="#d7dee8"
        stroke="#5f6b77"
        strokeWidth={1.4}
      />
      <rect x={x0} y={pinTop} width={thickness} height={pinHeight} fill="#b9c4d3" opacity={0.78} />
      <rect x={x0} y={pinTop} width={thickness} height={pinHeight} fill="none" stroke="#8fa0b4" strokeWidth={1} />
      {contact > 0 && (
        <rect x={x0} y={pinTop} width={thickness} height={pinHeight} fill={LOAD} fillOpacity={0.3 * clamp01(contact)} />
      )}
    </g>
  )
}

function JointView({
  p,
  forces = true,
  shear = true,
  final = false,
}: {
  p: number
  forces?: boolean
  shear?: boolean
  final?: boolean
}) {
  const reveal = smooth(ramp(p, 0, 0.3))
  const shearAmount = shear ? smooth(ramp(p, 0.18, 0.5)) : 0
  const forceAmount = forces ? smooth(ramp(p, 0.24, 0.6)) : 0
  const wallX = 112
  const wallThickness = 40
  const wallTop = 58
  const wallBottom = 196
  const pinY = 118
  const pinHeight = 20
  const pinEnd = 332
  const face = wallX + wallThickness
  return (
    <g>
      <WallPin
        x0={wallX}
        wallTop={wallTop}
        wallBottom={wallBottom}
        thickness={wallThickness}
        pinY={pinY}
        pinHeight={pinHeight}
        pinEnd={pinEnd}
        reveal={reveal}
      />
      <g opacity={shearAmount}>
        <line
          x1={face}
          y1={wallTop}
          x2={face}
          y2={wallBottom}
          stroke={PLANE}
          strokeWidth={1.2}
          strokeDasharray="5 4"
          opacity={0.75}
        />
        <line
          x1={face}
          y1={pinY - pinHeight / 2}
          x2={face}
          y2={pinY + pinHeight / 2}
          stroke={PLANE}
          strokeWidth={3.4}
          strokeLinecap="round"
        />
        <text x={face + 8} y={76} fontSize={8.5} fontWeight={600} fill={PLANE}>
          płaszczyzna ścinania
        </text>
      </g>
      <g opacity={forceAmount}>
        <Arrow x1={322} y1={130} x2={322} y2={190} color={LOAD} amount={forceAmount} width={2.6} />
        <text x={332} y={162} fontSize={9} fontWeight={700} fill={LOAD}>
          P = 100 kN
        </text>
      </g>
      <g opacity={reveal}>
        <text x={wallX - 6} y={84} textAnchor="end" fontSize={8.5} fill={MUTED}>
          ściana sztywna
        </text>
        <g stroke={INK} fill={INK}>
          <line x1={wallX} y1={48} x2={face} y2={48} strokeWidth={1} />
          <line x1={wallX} y1={44} x2={wallX} y2={52} strokeWidth={1} />
          <line x1={face} y1={44} x2={face} y2={52} strokeWidth={1} />
          <text x={wallX + wallThickness / 2} y={41} textAnchor="middle" fontSize={8.5} stroke="none">
            {final ? 'h = 13 mm' : 'h'}
          </text>
          <line x1={270} y1={pinY - pinHeight / 2} x2={270} y2={pinY + pinHeight / 2} strokeWidth={1} />
          <line x1={266} y1={pinY - pinHeight / 2} x2={274} y2={pinY - pinHeight / 2} strokeWidth={1} />
          <line x1={266} y1={pinY + pinHeight / 2} x2={274} y2={pinY + pinHeight / 2} strokeWidth={1} />
          <text x={270} y={100} textAnchor="middle" fontSize={8.5} stroke="none">
            {final ? 'd = 26 mm' : 'd'}
          </text>
        </g>
      </g>
    </g>
  )
}

function ModelScene({ p }: { p: number }) {
  return (
    <g>
      <Header title="SWORZEŃ W SZTYWNEJ ŚCIANIE · MODEL" note="P = 100 kN · połączenie jednocięte" />
      <JointView p={p} />
      <text x={230} y={250} textAnchor="middle" fontSize={8.5} fill={MUTED}>
        sworzeń osadzony w ścianie · obciążenie na swobodnym końcu
      </text>
      <text x={230} y={316} textAnchor="middle" fontSize={8.5} fill={MUTED}>
        jedna płaszczyzna ścinania przy ścianie
      </text>
    </g>
  )
}

function DataScene({ p }: { p: number }) {
  const reveal = smooth(ramp(p, 0, 0.3))
  const cards = [
    { x: 40, y: 58, label: 'siła przenoszona', value: 'P = 100 kN' },
    { x: 240, y: 58, label: 'ścinanie dopuszczalne', value: 'k_s = 200 MPa' },
    { x: 40, y: 118, label: 'docisk dopuszczalny', value: 'k_t = 100 MPa' },
    { x: 240, y: 118, label: 'szukane wymiary', value: 'd [mm], h [mm]' },
  ]
  return (
    <g>
      <Header title="DANE, JEDNOSTKI I SZUKANE" note="jedna jednostka: niuton i milimetr" />
      <g opacity={reveal}>
        {cards.map((card) => (
          <g key={card.label}>
            <rect
              x={card.x}
              y={card.y}
              width={180}
              height={48}
              rx={8}
              fill="#f2f5fa"
              stroke="#d7dee8"
              strokeWidth={1.1}
            />
            <text x={card.x + 12} y={card.y + 20} fontSize={8.5} fill={MUTED}>
              {card.label}
            </text>
            <text x={card.x + 12} y={card.y + 38} fontSize={10} fontWeight={700} fill={INK}>
              {card.value}
            </text>
          </g>
        ))}
        <rect x={40} y={196} width={380} height={54} rx={8} fill={FILL} stroke="#d7dee8" strokeWidth={1.1} />
        <text x={52} y={216} fontSize={9} fontWeight={600} fill={INK}>
          100 kN = 100 000 N
        </text>
        <text x={52} y={234} fontSize={9} fill={INK}>
          1 MPa = 1 N/mm² — naprężeń nie przeliczamy
        </text>
      </g>
      <text x={230} y={286} textAnchor="middle" fontSize={8.5} fill={MUTED}>
        wszystkie wymiary liczymy w milimetrach
      </text>
    </g>
  )
}

function ShearScene({ p }: { p: number }) {
  const reveal = smooth(ramp(p, 0, 0.28))
  const plane = smooth(ramp(p, 0.12, 0.45))
  const circle = smooth(ramp(p, 0.4, 0.75))
  const wallX = 120
  const wallThickness = 40
  const wallTop = 64
  const wallBottom = 196
  const pinY = 116
  const pinHeight = 20
  const pinEnd = 330
  const face = wallX + wallThickness
  return (
    <g>
      <Header title="JEDNA PŁASZCZYZNA ŚCINANIA" note="V = P · pole przekroju A = πd²/4" />
      <g opacity={reveal}>
        <WallPin
          x0={wallX}
          wallTop={wallTop}
          wallBottom={wallBottom}
          thickness={wallThickness}
          pinY={pinY}
          pinHeight={pinHeight}
          pinEnd={pinEnd}
          reveal={reveal}
        />
        <Arrow x1={320} y1={128} x2={320} y2={172} color={LOAD} amount={reveal} width={2.4} />
        <text x={328} y={150} fontSize={9} fontWeight={700} fill={LOAD}>
          P
        </text>
        <text x={wallX - 6} y={86} textAnchor="end" fontSize={8.5} fill={MUTED}>
          ściana
        </text>
        <g stroke={INK} fill={INK}>
          <line x1={wallX} y1={54} x2={face} y2={54} strokeWidth={1} />
          <line x1={wallX} y1={50} x2={wallX} y2={58} strokeWidth={1} />
          <line x1={face} y1={50} x2={face} y2={58} strokeWidth={1} />
          <text x={wallX + wallThickness / 2} y={47} textAnchor="middle" fontSize={8.5} stroke="none">
            h
          </text>
        </g>
      </g>
      <g opacity={plane}>
        <line
          x1={face}
          y1={wallTop}
          x2={face}
          y2={wallBottom}
          stroke={PLANE}
          strokeWidth={1.2}
          strokeDasharray="5 4"
          opacity={0.75}
        />
        <line
          x1={face}
          y1={pinY - pinHeight / 2}
          x2={face}
          y2={pinY + pinHeight / 2}
          stroke={PLANE}
          strokeWidth={3.4}
          strokeLinecap="round"
        />
        <text x={face + 8} y={80} fontSize={8.5} fontWeight={600} fill={PLANE}>
          płaszczyzna ścinania
        </text>
      </g>
      <g opacity={circle}>
        <Arrow x1={220} y1={138} x2={220} y2={214} color={MUTED} amount={circle} width={1.4} />
        <text x={230} y={182} fontSize={8.5} fill={MUTED}>
          przekrój A
        </text>
        <circle cx={220} cy={262} r={36} fill={BLUE} fillOpacity={0.12} stroke={BLUE} strokeWidth={1.8} />
        <line x1={184} y1={262} x2={256} y2={262} stroke={BLUE} strokeWidth={1} strokeDasharray="4 3" />
        <text x={220} y={257} textAnchor="middle" fontSize={12} fontWeight={700} fill={BLUE}>
          A
        </text>
        <text x={262} y={266} fontSize={8.5} fill={BLUE}>
          d
        </text>
        <text x={268} y={248} fontSize={9} fontWeight={600} fill={INK}>
          A = πd²/4
        </text>
        <text x={268} y={266} fontSize={9} fill={MUTED}>
          V = P
        </text>
      </g>
      <text x={230} y={326} textAnchor="middle" fontSize={8.5} fill={MUTED}>
        płaszczyzna ścinania leży przy ścianie, prostopadle do osi sworznia
      </text>
    </g>
  )
}

function DiameterScene({ p }: { p: number }) {
  const grow = smooth(ramp(p, 0, 0.5))
  const radius = lerp(28, 52, grow)
  const showReq = smooth(ramp(p, 0.5, 0.72))
  const showAdopt = smooth(ramp(p, 0.7, 0.88))
  const x = (value: number) => 60 + ((value - 20) / 10) * 360
  return (
    <g>
      <Header title="DOBÓR ŚREDNICY SWORZNIA" note="warunek ścinania: τ ≤ k_s" />
      <circle cx={150} cy={148} r={radius} fill={BLUE} fillOpacity={0.1} stroke={BLUE} strokeWidth={1.8} />
      <line x1={150 - radius} y1={148} x2={150 + radius} y2={148} stroke={BLUE} strokeWidth={1} strokeDasharray="4 3" />
      <text x={150 + radius + 8} y={152} fontSize={9} fill={BLUE}>
        d
      </text>
      <g stroke={INK} fill={INK}>
        <line x1={150 - radius} y1={214} x2={150 + radius} y2={214} strokeWidth={1} />
        <line x1={150 - radius} y1={209} x2={150 - radius} y2={219} strokeWidth={1} />
        <line x1={150 + radius} y1={209} x2={150 + radius} y2={219} strokeWidth={1} />
        <text x={150} y={234} textAnchor="middle" fontSize={9} stroke="none">
          d = 26 mm
        </text>
      </g>
      <g opacity={showReq}>
        <text x={330} y={140} fontSize={9} fontWeight={600} fill={LOAD}>
          d ≥ 25,23 mm
        </text>
      </g>
      <g opacity={showAdopt}>
        <text x={330} y={160} fontSize={9} fontWeight={700} fill={OK}>
          → d = 26 mm
        </text>
      </g>
      <line x1={60} y1={286} x2={420} y2={286} stroke={MUTED} strokeWidth={1} />
      {[20, 25.231, 26, 30].map((value) => {
        const cx = x(value)
        return <line key={value} x1={cx} y1={281} x2={cx} y2={291} stroke={MUTED} strokeWidth={1} />
      })}
      <circle cx={x(25.231)} cy={286} r={3.2} fill={LOAD} />
      <circle cx={x(26)} cy={286} r={4} fill={OK} />
      <text x={60} y={306} textAnchor="middle" fontSize={8.5} fill={MUTED}>
        20
      </text>
      <text x={420} y={306} textAnchor="middle" fontSize={8.5} fill={MUTED}>
        30
      </text>
      <text x={x(25.231) - 4} y={276} textAnchor="end" fontSize={8.5} fontWeight={600} fill={LOAD}>
        25,23
      </text>
      <text x={x(26) + 4} y={306} fontSize={8.5} fontWeight={600} fill={OK}>
        26
      </text>
      <text x={230} y={328} textAnchor="middle" fontSize={8.5} fill={MUTED}>
        zaokrąglenie w górę do pełnego milimetra
      </text>
    </g>
  )
}

function BearingScene({ p }: { p: number }) {
  const reveal = smooth(ramp(p, 0, 0.28))
  const contact = smooth(ramp(p, 0.2, 0.5))
  const unroll = smooth(ramp(p, 0.45, 0.78))
  const wallX = 70
  const wallThickness = 40
  const wallTop = 64
  const wallBottom = 196
  const pinY = 116
  const pinHeight = 20
  const pinEnd = 320
  const face = wallX + wallThickness
  return (
    <g>
      <Header title="DOCISK · POLE RZUTU STYKU" note="A₁ = π · d · h" />
      <g opacity={reveal}>
        <WallPin
          x0={wallX}
          wallTop={wallTop}
          wallBottom={wallBottom}
          thickness={wallThickness}
          pinY={pinY}
          pinHeight={pinHeight}
          pinEnd={pinEnd}
          reveal={reveal}
          contact={contact}
        />
        <Arrow x1={310} y1={128} x2={310} y2={180} color={LOAD} amount={reveal} width={2.5} />
        <text x={320} y={154} fontSize={9} fontWeight={700} fill={LOAD}>
          P = 100 kN
        </text>
        <text x={wallX - 6} y={86} textAnchor="end" fontSize={8.5} fill={MUTED}>
          ściana
        </text>
        <g stroke={INK} fill={INK}>
          <line x1={wallX} y1={54} x2={face} y2={54} strokeWidth={1} />
          <line x1={wallX} y1={50} x2={wallX} y2={58} strokeWidth={1} />
          <line x1={face} y1={50} x2={face} y2={58} strokeWidth={1} />
          <text x={wallX + wallThickness / 2} y={47} textAnchor="middle" fontSize={8.5} stroke="none">
            h
          </text>
        </g>
      </g>
      <g opacity={contact}>
        <line
          x1={face}
          y1={wallTop}
          x2={face}
          y2={wallBottom}
          stroke={PLANE}
          strokeWidth={1.2}
          strokeDasharray="5 4"
          opacity={0.75}
        />
        <line
          x1={face}
          y1={pinY - pinHeight / 2}
          x2={face}
          y2={pinY + pinHeight / 2}
          stroke={PLANE}
          strokeWidth={3.4}
          strokeLinecap="round"
        />
        <text x={face + 8} y={80} fontSize={8.5} fontWeight={600} fill={PLANE}>
          płaszczyzna przy ścianie
        </text>
        <text x={126} y={150} fontSize={8.5} fontWeight={600} fill={LOAD}>
          styk sworznia z otworem ściany
        </text>
      </g>
      <g opacity={unroll}>
        <rect
          x={250}
          y={206}
          width={170}
          height={50}
          rx={3}
          fill={BLUE}
          fillOpacity={0.12}
          stroke={BLUE}
          strokeWidth={1.6}
        />
        <text x={335} y={270} textAnchor="middle" fontSize={9} fontWeight={600} fill={BLUE}>
          πd
        </text>
        <text x={424} y={231} textAnchor="end" fontSize={9} fontWeight={600} fill={BLUE}>
          h
        </text>
        <text x={250} y={292} fontSize={9} fontWeight={700} fill={INK}>
          A₁ = π · d · h
        </text>
        <text x={60} y={292} fontSize={8.5} fill={MUTED}>
          rozwinięcie powierzchni styku
        </text>
      </g>
      <text x={230} y={326} textAnchor="middle" fontSize={8.5} fill={MUTED}>
        pole docisku rośnie z obwodem sworznia i grubością ściany
      </text>
    </g>
  )
}

function HeightScene({ p }: { p: number }) {
  const grow = smooth(ramp(p, 0, 0.5))
  const thickness = lerp(38, 70, grow)
  const wallX = 190
  const wallTop = 70
  const wallBottom = 220
  const pinY = 136
  const pinHeight = 20
  const pinEnd = 356
  const showReq = smooth(ramp(p, 0.5, 0.72))
  const showAdopt = smooth(ramp(p, 0.7, 0.88))
  const x = (value: number) => 60 + ((value - 8) / 8) * 360
  const face = wallX + thickness
  return (
    <g>
      <Header title="DOBÓR GRUBOŚCI ŚCIANY" note="przy d = 26 mm · warunek docisku" />
      <WallPin
        x0={wallX}
        wallTop={wallTop}
        wallBottom={wallBottom}
        thickness={thickness}
        pinY={pinY}
        pinHeight={pinHeight}
        pinEnd={pinEnd}
        reveal={grow}
      />
      <line
        x1={face}
        y1={wallTop}
        x2={face}
        y2={wallBottom}
        stroke={PLANE}
        strokeWidth={1.2}
        strokeDasharray="5 4"
        opacity={0.75}
      />
      <line
        x1={face}
        y1={pinY - pinHeight / 2}
        x2={face}
        y2={pinY + pinHeight / 2}
        stroke={PLANE}
        strokeWidth={3.4}
        strokeLinecap="round"
      />
      <Arrow x1={346} y1={148} x2={346} y2={208} color={LOAD} amount={grow} width={2.5} />
      <text x={356} y={174} fontSize={9} fontWeight={700} fill={LOAD}>
        P = 100 kN
      </text>
      <text x={184} y={150} textAnchor="end" fontSize={8.5} fill={MUTED}>
        ściana
      </text>
      <text x={300} y={76} fontSize={8.5} fill={MUTED}>
        rosnąca grubość h
      </text>
      <g opacity={showReq}>
        <text x={300} y={96} fontSize={9} fontWeight={600} fill={LOAD}>
          h ≥ 12,24 mm
        </text>
      </g>
      <g opacity={showAdopt}>
        <text x={300} y={114} fontSize={9} fontWeight={700} fill={OK}>
          → h = 13 mm
        </text>
      </g>
      <g stroke={INK} fill={INK}>
        <line x1={wallX} y1={240} x2={face} y2={240} strokeWidth={1} />
        <line x1={wallX} y1={236} x2={wallX} y2={244} strokeWidth={1} />
        <line x1={face} y1={236} x2={face} y2={244} strokeWidth={1} />
        <text x={wallX + thickness / 2} y={254} textAnchor="middle" fontSize={9} stroke="none">
          h
        </text>
      </g>
      <line x1={60} y1={292} x2={420} y2={292} stroke={MUTED} strokeWidth={1} />
      {[8, 12.2427, 13, 16].map((value) => {
        const cx = x(value)
        return <line key={value} x1={cx} y1={287} x2={cx} y2={297} stroke={MUTED} strokeWidth={1} />
      })}
      <circle cx={x(12.2427)} cy={292} r={3.2} fill={LOAD} />
      <circle cx={x(13)} cy={292} r={4} fill={OK} />
      <text x={60} y={312} textAnchor="middle" fontSize={8.5} fill={MUTED}>
        8
      </text>
      <text x={420} y={312} textAnchor="middle" fontSize={8.5} fill={MUTED}>
        16
      </text>
      <text x={x(12.2427) - 4} y={282} textAnchor="end" fontSize={8.5} fontWeight={600} fill={LOAD}>
        12,24
      </text>
      <text x={x(13) + 4} y={312} fontSize={8.5} fontWeight={600} fill={OK}>
        13
      </text>
      <text x={230} y={330} textAnchor="middle" fontSize={8.5} fill={MUTED}>
        grubsza ściana zwiększa pole docisku
      </text>
    </g>
  )
}

function CompareScene({ p }: { p: number }) {
  const draw = smooth(ramp(p, 0, 0.55))
  const bars = [
    { y: 92, value: 188.35, limit: 200, label: 'τ = 188,35 MPa', limitLabel: 'k_s = 200 MPa', color: LOAD },
    { y: 150, value: 94.17, limit: 100, label: 'σ_b = 94,17 MPa', limitLabel: 'k_t = 100 MPa', color: OK },
  ]
  return (
    <g>
      <Header title="ZNACZENIE ZNAKÓW I JEDNOSTEK" note="oba naprężenia dodatnie · MPa = N/mm²" />
      <text x={230} y={58} textAnchor="middle" fontSize={9} fontWeight={600} fill={INK}>
        przyjęto d = 26 mm, h = 13 mm
      </text>
      {bars.map((bar) => {
        const ratio = bar.value / bar.limit
        return (
          <g key={bar.label}>
            <text x={60} y={bar.y} fontSize={9} fontWeight={600} fill={bar.color}>
              {bar.label}
            </text>
            <text x={430} y={bar.y} textAnchor="end" fontSize={8.5} fill={MUTED}>
              {bar.limitLabel}
            </text>
            <rect x={60} y={bar.y + 8} width={340} height={18} rx={6} fill="#edf1f5" />
            <rect
              x={60}
              y={bar.y + 8}
              width={340 * ratio * draw}
              height={18}
              rx={6}
              fill={bar.color}
              fillOpacity={0.22}
              stroke={bar.color}
              strokeWidth={1.2}
            />
            <text x={70} y={bar.y + 22} fontSize={8.5} fontWeight={700} fill={bar.color}>
              94,2% wykorzystania
            </text>
          </g>
        )
      })}
      <text x={230} y={204} textAnchor="middle" fontSize={9} fill={INK}>
        oba naprężenia są mniejsze od dopuszczalnych
      </text>
      <rect x={60} y={220} width={340} height={64} rx={8} fill={FILL} stroke="#d7dee8" strokeWidth={1.1} />
      <text x={72} y={242} fontSize={9} fill={INK}>
        zapas: (200 − 188,35) / 200 ≈ 5,8%
      </text>
      <text x={72} y={262} fontSize={9} fill={INK}>
        jednostki: 1 MPa = 1 N/mm²; τ i σ_b dodatnie
      </text>
      <text x={230} y={306} textAnchor="middle" fontSize={8.5} fill={MUTED}>
        wykorzystanie materiału ≈ 94,2% w obu warunkach
      </text>
    </g>
  )
}

function CheckScene({ p }: { p: number }) {
  const reveal = smooth(ramp(p, 0, 0.3))
  const cards = [
    { x: 24, y: 212, label: 'pole ścinania', value: 'A = 530,93 mm²' },
    { x: 238, y: 212, label: 'naprężenie ścinające', value: 'τ = 188,35 MPa < 200' },
    { x: 24, y: 264, label: 'pole docisku', value: 'A₁ = 1061,86 mm²' },
    { x: 238, y: 264, label: 'naprężenie dociskowe', value: 'σ_b = 94,17 MPa < 100' },
  ]
  return (
    <g>
      <Header title="KONTROLA · d = 26 mm, h = 13 mm" note="A = 530,93 mm² · A₁ = 1061,86 mm²" />
      <JointView p={p} final />
      <g opacity={reveal}>
        {cards.map((card) => (
          <g key={card.label}>
            <rect
              x={card.x}
              y={card.y}
              width={198}
              height={46}
              rx={8}
              fill="#f2f5fa"
              stroke="#d7dee8"
              strokeWidth={1.1}
            />
            <text x={card.x + 12} y={card.y + 18} fontSize={8} fill={MUTED}>
              {card.label}
            </text>
            <text x={card.x + 12} y={card.y + 36} fontSize={9.5} fontWeight={700} fill={INK}>
              {card.value}
            </text>
          </g>
        ))}
      </g>
      <text x={230} y={330} textAnchor="middle" fontSize={8.5} fill={OK}>
        zapas ≈ 5,8% — dobrane wymiary są poprawne
      </text>
    </g>
  )
}

function PinDesignAnimationScene({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const p = playing ? smooth(sceneProgress) : 1

  const content =
    metric === 'data' ? (
      <DataScene p={p} />
    ) : metric === 'shear' ? (
      <ShearScene p={p} />
    ) : metric === 'diameter' ? (
      <DiameterScene p={p} />
    ) : metric === 'bearing' ? (
      <BearingScene p={p} />
    ) : metric === 'height' ? (
      <HeightScene p={p} />
    ) : metric === 'compare' ? (
      <CompareScene p={p} />
    ) : metric === 'check' ? (
      <CheckScene p={p} />
    ) : (
      <ModelScene p={p} />
    )

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 340"
          role="img"
          aria-label="Sworzeń osadzony w sztywnej ścianie o grubości h, obciążony siłą P na swobodnym końcu: jedna płaszczyzna ścinania przy ścianie, dobór średnicy i grubości oraz kontrola naprężeń"
        >
          {content}
        </svg>
      </div>
    </div>
  )
}

export function createPinDesignAnimation(config: PinDesignInputs): ComponentType<SolutionAnimationProps> {
  return function PinDesignAnimation(props: SolutionAnimationProps) {
    return <PinDesignAnimationScene {...props} />
  }
}
