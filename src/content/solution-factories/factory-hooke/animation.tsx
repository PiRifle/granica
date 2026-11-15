import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const BLUE = '#4f6df5'
const ORANGE = '#ff6b45'
const GREEN = '#2f7d5b'
const VIOLET = '#a970dd'
const INK = '#17202a'
const MUTED = '#87929d'
const EDGE = '#7d8fa5'

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}
const ramp = (value: number, from: number, to: number) => smooth(clamp01((value - from) / (to - from)))

type Point = readonly [number, number]

function Arrow({
  from,
  to,
  amount,
  color,
  width = 2.2,
}: {
  from: Point
  to: Point
  amount: number
  color: string
  width?: number
}) {
  const [x1, y1] = from
  const [x2, y2] = to
  const angle = Math.atan2(y2 - y1, x2 - x1)
  const head = 7
  const wing = 3.6
  const baseX = x2 - head * Math.cos(angle)
  const baseY = y2 - head * Math.sin(angle)
  const leftX = baseX - wing * Math.sin(angle)
  const leftY = baseY + wing * Math.cos(angle)
  const rightX = baseX + wing * Math.sin(angle)
  const rightY = baseY - wing * Math.cos(angle)
  const opacity = amount > 0.01 ? 1 : 0
  return (
    <g>
      <motion.line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
        initial={false}
        animate={{ pathLength: clamp01(amount), opacity }}
      />
      <motion.polygon
        points={`${x2},${y2} ${leftX},${leftY} ${rightX},${rightY}`}
        fill={color}
        initial={false}
        animate={{ opacity: amount > 0.35 ? 1 : 0 }}
      />
    </g>
  )
}

type MatrixProps = {
  x: number
  top: number
  values: string[][]
  columnWidth?: number
  rowHeight?: number
  fontSize?: number
  color?: (row: number, column: number) => string
  weight?: (row: number, column: number) => number
  opacity?: (row: number, column: number) => number
}

function Matrix({
  x,
  top,
  values,
  columnWidth = 54,
  rowHeight = 25,
  fontSize = 10,
  color = () => INK,
  weight = () => 600,
  opacity = () => 1,
}: MatrixProps) {
  const rows = values.length
  const bracketTop = top - 12
  const bracketBottom = top + rowHeight * (rows - 1) + 6
  const left = x - 9
  const right = x + columnWidth * 3 + 2
  return (
    <g>
      <path
        d={`M ${left + 8} ${bracketTop} L ${left} ${bracketTop} L ${left} ${bracketBottom} L ${left + 8} ${bracketBottom}`}
        fill="none"
        stroke={EDGE}
        strokeWidth={1.3}
        strokeLinecap="round"
      />
      <path
        d={`M ${right - 8} ${bracketTop} L ${right} ${bracketTop} L ${right} ${bracketBottom} L ${right - 8} ${bracketBottom}`}
        fill="none"
        stroke={EDGE}
        strokeWidth={1.3}
        strokeLinecap="round"
      />
      {values.map((row, rowIndex) =>
        row.map((value, columnIndex) => (
          <motion.text
            key={`${rowIndex}-${columnIndex}`}
            x={x + columnWidth * (columnIndex + 0.5)}
            y={top + rowHeight * rowIndex}
            textAnchor="middle"
            fontSize={fontSize}
            fontWeight={weight(rowIndex, columnIndex)}
            fill={color(rowIndex, columnIndex)}
            initial={false}
            animate={{ opacity: opacity(rowIndex, columnIndex) }}
          >
            {value}
          </motion.text>
        )),
      )}
    </g>
  )
}

const CX = 106
const CY = 192
const HX = 42
const HY = 42
const HZ = 32
const DX = HZ * 0.62
const DY = -HZ * 0.52

function Prism({ ghost = false }: { ghost?: boolean }) {
  const corner = (ix: number, iy: number, iz: number) => ({
    x: CX + ix * HX + (iz > 0 ? DX : 0),
    y: CY + iy * HY + (iz > 0 ? DY : 0),
  })
  const front = [corner(-1, -1, -1), corner(1, -1, -1), corner(1, 1, -1), corner(-1, 1, -1)]
  const top = [corner(-1, -1, -1), corner(1, -1, -1), corner(1, -1, 1), corner(-1, -1, 1)]
  const right = [corner(1, -1, -1), corner(1, 1, -1), corner(1, 1, 1), corner(1, -1, 1)]
  const hiddenBackTop = corner(-1, 1, 1)
  const hiddenLeftTop = corner(-1, -1, 1)
  const hiddenRightTop = corner(1, 1, 1)
  const points = (items: Array<{ x: number; y: number }>) => items.map((item) => `${item.x},${item.y}`).join(' ')
  if (ghost) {
    return (
      <g fill="none" stroke="#b7c0cc" strokeWidth={1.1} strokeDasharray="4 3">
        <polygon points={points(front)} />
        <polygon points={points(top)} />
        <polygon points={points(right)} />
      </g>
    )
  }
  return (
    <g stroke={EDGE} strokeWidth={1.4} strokeLinejoin="round">
      <line
        x1={hiddenBackTop.x}
        y1={hiddenBackTop.y}
        x2={hiddenLeftTop.x}
        y2={hiddenLeftTop.y}
        strokeWidth={1}
        strokeDasharray="4 3"
        opacity={0.45}
      />
      <line
        x1={hiddenBackTop.x}
        y1={hiddenBackTop.y}
        x2={hiddenRightTop.x}
        y2={hiddenRightTop.y}
        strokeWidth={1}
        strokeDasharray="4 3"
        opacity={0.45}
      />
      <polygon points={points(top)} fill="#e8eefc" />
      <polygon points={points(right)} fill="#eef3fc" />
      <polygon points={points(front)} fill="#f6f8fd" />
    </g>
  )
}

function StressCube({ amount, labels = true }: { amount: number; labels?: boolean }) {
  const sx = ramp(amount, 0.05, 0.45)
  const sy = ramp(amount, 0.2, 0.6)
  const sz = ramp(amount, 0.35, 0.75)
  const tau = ramp(amount, 0.5, 0.9)
  return (
    <g>
      <Prism />
      <Arrow from={[164, 202]} to={[204, 202]} amount={sx} color={ORANGE} />
      <Arrow from={[116, 96]} to={[116, 134]} amount={sy} color={BLUE} />
      <Arrow from={[142, 132]} to={[174, 114]} amount={sz} color={GREEN} />
      <Arrow from={[74, 168]} to={[124, 168]} amount={tau} color={VIOLET} width={1.8} />
      {labels && (
        <>
          <text x={164} y={222} fontSize={9} fontWeight={700} fill={ORANGE}>
            σ_x = 90 MPa
          </text>
          <text x={122} y={90} fontSize={9} fontWeight={700} fill={BLUE}>
            σ_y = −45 MPa
          </text>
          <text x={176} y={110} fontSize={9} fontWeight={700} fill={GREEN}>
            σ_z = 33 MPa
          </text>
          <text x={99} y={162} textAnchor="middle" fontSize={8.5} fontWeight={700} fill={VIOLET}>
            τ_xy = −25
          </text>
        </>
      )}
    </g>
  )
}

function AxisTriad() {
  return (
    <g stroke={MUTED} strokeWidth={1.1} fill={MUTED}>
      <line x1={42} y1={300} x2={76} y2={300} />
      <line x1={42} y1={300} x2={42} y2={266} />
      <line x1={42} y1={300} x2={60} y2={282} />
      <text x={80} y={303} fontSize={9} stroke="none">
        x
      </text>
      <text x={36} y={262} fontSize={9} stroke="none">
        y
      </text>
      <text x={64} y={280} fontSize={9} stroke="none">
        z
      </text>
    </g>
  )
}

const STRESS = [
  ['90', '−25', '75'],
  ['−25', '−45', '−36'],
  ['75', '−36', '33'],
]

const STRAIN = [
  ['4,5659', '−1,5854', '4,7561'],
  ['−1,5854', '−3,9951', '−2,2829'],
  ['4,7561', '−2,2829', '0,9512'],
]

const TENSOR_SHEAR = [
  ['—', '−1,5854', '4,7561'],
  ['−1,5854', '—', '−2,2829'],
  ['4,7561', '−2,2829', '—'],
]

function StressScene({ p }: { p: number }) {
  const entry = (row: number, column: number) =>
    ramp(p, 0.1 + (row * 3 + column) * 0.045, 0.3 + (row * 3 + column) * 0.045)
  return (
    <>
      <text x={230} y={28} textAnchor="middle" fontSize={11} fontWeight={700} fill={INK}>
        Stan naprężenia w punkcie
      </text>
      <StressCube amount={p} />
      <AxisTriad />
      <text x={250} y={64} fontSize={10} fontWeight={700} fill={INK}>
        σ_ij [MPa]
      </text>
      <Matrix
        x={250}
        top={102}
        values={STRESS}
        opacity={entry}
        color={(row, column) => (row === column ? BLUE : VIOLET)}
      />
      <text x={250} y={232} fontSize={8.5} fontWeight={700} fill={MUTED}>
        POZOSTAŁE SKŁADOWE STYCZNE
      </text>
      <text x={250} y={254} fontSize={9.5} fontWeight={600} fill={VIOLET}>
        τ_xz = 75 MPa
      </text>
      <text x={250} y={276} fontSize={9.5} fontWeight={600} fill={VIOLET}>
        τ_yz = −36 MPa
      </text>
      <text x={250} y={298} fontSize={9} fill={MUTED}>
        τ_xy = −25 MPa — strzałka na ścianie
      </text>
    </>
  )
}

function MaterialScene({ p }: { p: number }) {
  return (
    <>
      <text x={230} y={30} textAnchor="middle" fontSize={11} fontWeight={700} fill={INK}>
        Dane materiałowe
      </text>
      <Prism ghost />
      <text x={106} y={258} textAnchor="middle" fontSize={9} fill={MUTED}>
        element materialny
      </text>
      <line x1={188} y1={84} x2={188} y2={236} stroke="#d7dde5" strokeWidth={1.1} />
      <motion.g initial={false} animate={{ opacity: ramp(p, 0.1, 0.4) }}>
        <text x={204} y={112} fontSize={12} fontWeight={700} fill={BLUE}>
          E = 205 GPa
        </text>
        <text x={204} y={144} fontSize={12} fontWeight={700} fill={BLUE}>
          E = 205 000 MPa
        </text>
        <text x={204} y={166} fontSize={8.5} fill={MUTED}>
          1 GPa = 1 000 MPa
        </text>
        <text x={204} y={200} fontSize={12} fontWeight={700} fill={GREEN}>
          ν = 0,30
        </text>
        <text x={204} y={228} fontSize={8.5} fill={MUTED}>
          stal · izotropia · liniowa sprężystość
        </text>
      </motion.g>
      <text x={230} y={308} textAnchor="middle" fontSize={9} fill={MUTED}>
        Do wzorów wstawiamy E i ν w spójnych jednostkach.
      </text>
    </>
  )
}

function HookeScene({ p }: { p: number }) {
  const rows = [
    { y: 96, color: BLUE, text: 'ε_x = [ σ_x − ν(σ_y + σ_z) ] / E' },
    { y: 158, color: GREEN, text: 'ε_y = [ σ_y − ν(σ_z + σ_x) ] / E' },
    { y: 220, color: ORANGE, text: 'ε_z = [ σ_z − ν(σ_x + σ_y) ] / E' },
  ]
  return (
    <>
      <text x={230} y={32} textAnchor="middle" fontSize={11} fontWeight={700} fill={INK}>
        Uogólnione prawo Hooke’a
      </text>
      <text x={230} y={56} textAnchor="middle" fontSize={9} fill={MUTED}>
        trzy odkształcenia normalne
      </text>
      {rows.map((row, rowIndex) => (
        <motion.g
          key={row.text}
          initial={false}
          animate={{ opacity: ramp(p, 0.12 + rowIndex * 0.18, 0.38 + rowIndex * 0.18) }}
        >
          <circle cx={82} cy={row.y - 4} r={4} fill={row.color} />
          <text x={230} y={row.y} textAnchor="middle" fontSize={12} fontWeight={600} fill={row.color}>
            {row.text}
          </text>
        </motion.g>
      ))}
      <line x1={44} y1={124} x2={416} y2={124} stroke="#dde3ec" strokeWidth={1} />
      <line x1={44} y1={186} x2={416} y2={186} stroke="#dde3ec" strokeWidth={1} />
      <text x={230} y={280} textAnchor="middle" fontSize={9.5} fill={MUTED}>
        Naprężenia styczne nie wchodzą do ε_x, ε_y ani ε_z.
      </text>
    </>
  )
}

function ExScene({ p }: { p: number }) {
  return (
    <>
      <text x={230} y={32} textAnchor="middle" fontSize={11} fontWeight={700} fill={INK}>
        Obliczenie ε_x
      </text>
      <text x={42} y={82} fontSize={9} fontWeight={700} fill={INK}>
        σ_ij [MPa]
      </text>
      <Matrix
        x={42}
        top={106}
        values={STRESS}
        columnWidth={36}
        rowHeight={22}
        fontSize={8.5}
        color={(row, column) => (row === 0 && column === 0 ? BLUE : INK)}
        weight={(row, column) => (row === 0 && column === 0 ? 800 : 500)}
      />
      <text x={178} y={76} fontSize={9} fontWeight={700} fill={MUTED}>
        KROK PO KROKU
      </text>
      <motion.g initial={false} animate={{ opacity: ramp(p, 0.08, 0.34) }}>
        <text x={178} y={108} fontSize={9.5} fill={INK}>
          σ_y + σ_z = −45 + 33 = −12 MPa
        </text>
        <text x={178} y={138} fontSize={9.5} fill={INK}>
          σ_x − ν(σ_y + σ_z) = 90 − 0,3·(−12)
        </text>
        <text x={178} y={164} fontSize={9.5} fill={INK}>
          = 90 + 3,6 = 93,6 MPa
        </text>
      </motion.g>
      <line x1={178} y1={182} x2={440} y2={182} stroke="#dde3ec" strokeWidth={1} />
      <motion.g initial={false} animate={{ opacity: ramp(p, 0.48, 0.78) }}>
        <text x={178} y={208} fontSize={9.5} fill={INK}>
          ε_x = 93,6 / 205 000
        </text>
        <text x={178} y={236} fontSize={12} fontWeight={800} fill={BLUE}>
          ε_x = 4,5659·10⁻⁴
        </text>
      </motion.g>
    </>
  )
}

function EyzScene({ p }: { p: number }) {
  return (
    <>
      <text x={230} y={32} textAnchor="middle" fontSize={11} fontWeight={700} fill={INK}>
        Obliczenie ε_y i ε_z
      </text>
      <text x={42} y={82} fontSize={9} fontWeight={700} fill={INK}>
        σ_ij [MPa]
      </text>
      <Matrix
        x={42}
        top={106}
        values={STRESS}
        columnWidth={36}
        rowHeight={22}
        fontSize={8.5}
        color={(row, column) => (row === 1 && column === 1 ? GREEN : row === 2 && column === 2 ? ORANGE : INK)}
        weight={(row, column) => (row === column ? 800 : 500)}
      />
      <motion.g initial={false} animate={{ opacity: ramp(p, 0.1, 0.4) }}>
        <text x={176} y={74} fontSize={9.5} fontWeight={700} fill={GREEN}>
          Oś y
        </text>
        <text x={176} y={100} fontSize={9} fill={INK}>
          σ_z + σ_x = 33 + 90 = 123 MPa
        </text>
        <text x={176} y={124} fontSize={9} fill={INK}>
          σ_y − ν(...) = −45 − 36,9 = −81,9 MPa
        </text>
        <text x={176} y={150} fontSize={10} fontWeight={800} fill={GREEN}>
          ε_y = −3,9951·10⁻⁴
        </text>
      </motion.g>
      <motion.g initial={false} animate={{ opacity: ramp(p, 0.48, 0.8) }}>
        <text x={176} y={190} fontSize={9.5} fontWeight={700} fill={ORANGE}>
          Oś z
        </text>
        <text x={176} y={216} fontSize={9} fill={INK}>
          σ_x + σ_y = 90 − 45 = 45 MPa
        </text>
        <text x={176} y={240} fontSize={9} fill={INK}>
          σ_z − ν(...) = 33 − 13,5 = 19,5 MPa
        </text>
        <text x={176} y={266} fontSize={10} fontWeight={800} fill={ORANGE}>
          ε_z = 9,5122·10⁻⁵
        </text>
      </motion.g>
      <text x={230} y={308} textAnchor="middle" fontSize={9} fill={MUTED}>
        ε_y &lt; 0 — ściskanie, ε_z &gt; 0 — rozciąganie
      </text>
    </>
  )
}

function ShearScene({ p }: { p: number }) {
  const rows = [
    { y: 112, label: 'γ_xy =', value: '−25/78 846,15 = −3,1707·10⁻⁴', color: VIOLET },
    { y: 146, label: 'γ_xz =', value: '75/78 846,15 = 9,5122·10⁻⁴', color: BLUE },
    { y: 180, label: 'γ_yz =', value: '−36/78 846,15 = −4,5659·10⁻⁴', color: ORANGE },
  ]
  return (
    <>
      <text x={230} y={32} textAnchor="middle" fontSize={11} fontWeight={700} fill={INK}>
        Moduł ścinania G
      </text>
      <text x={40} y={72} fontSize={9} fontWeight={700} fill={MUTED}>
        Z danych materiałowych
      </text>
      <motion.g initial={false} animate={{ opacity: ramp(p, 0.1, 0.42) }}>
        <text x={40} y={102} fontSize={10} fill={INK}>
          G = E / [2(1 + ν)]
        </text>
        <text x={40} y={128} fontSize={10} fill={INK}>
          G = 205 000 / (2·1,30)
        </text>
        <text x={40} y={154} fontSize={10} fill={INK}>
          G = 205 000 / 2,6
        </text>
        <text x={40} y={184} fontSize={11} fontWeight={800} fill={GREEN}>
          G = 78 846,15 MPa
        </text>
      </motion.g>
      <line x1={196} y1={70} x2={196} y2={206} stroke="#d7dde5" strokeWidth={1.1} />
      <text x={212} y={72} fontSize={9} fontWeight={700} fill={MUTED}>
        Odkształcenia postaciowe
      </text>
      {rows.map((row, rowIndex) => (
        <motion.g
          key={row.label}
          initial={false}
          animate={{ opacity: ramp(p, 0.2 + rowIndex * 0.14, 0.44 + rowIndex * 0.14) }}
        >
          <text x={212} y={row.y} fontSize={9.5} fontWeight={700} fill={row.color}>
            {row.label}
          </text>
          <text x={262} y={row.y} fontSize={9} fill={INK}>
            {row.value}
          </text>
        </motion.g>
      ))}
      <text x={322} y={228} textAnchor="middle" fontSize={9} fill={MUTED}>
        γ ma ten sam znak co τ, a G jest dodatnie.
      </text>
    </>
  )
}

function ConventionScene({ p }: { p: number }) {
  const entry = (row: number, column: number) =>
    ramp(p, 0.12 + (row * 3 + column) * 0.04, 0.34 + (row * 3 + column) * 0.04)
  const vector = [
    { y: 116, label: 'γ_xy =', value: '−3,1707' },
    { y: 148, label: 'γ_xz =', value: '9,5122' },
    { y: 180, label: 'γ_yz =', value: '−4,5659' },
  ]
  return (
    <>
      <text x={230} y={32} textAnchor="middle" fontSize={11} fontWeight={700} fill={INK}>
        Dwie konwencje zapisu ścinania
      </text>
      <text x={96} y={72} textAnchor="middle" fontSize={9} fontWeight={700} fill={ORANGE}>
        wektor inżynierski γ ·10⁻⁴
      </text>
      {vector.map((row, rowIndex) => (
        <motion.g
          key={row.label}
          initial={false}
          animate={{ opacity: ramp(p, 0.12 + rowIndex * 0.1, 0.34 + rowIndex * 0.1) }}
        >
          <text x={48} y={row.y} fontSize={9.5} fontWeight={700} fill={ORANGE}>
            {row.label}
          </text>
          <text x={108} y={row.y} fontSize={9.5} fontWeight={700} fill={INK}>
            {row.value}
          </text>
        </motion.g>
      ))}
      <text x={337} y={72} textAnchor="middle" fontSize={9} fontWeight={700} fill={VIOLET}>
        tensor ε ·10⁻⁴
      </text>
      <Matrix
        x={276}
        top={104}
        values={TENSOR_SHEAR}
        columnWidth={42}
        rowHeight={24}
        fontSize={8.5}
        opacity={entry}
        color={() => VIOLET}
      />
      <Arrow from={[168, 148]} to={[246, 148]} amount={ramp(p, 0.5, 0.85)} color={GREEN} width={2} />
      <text x={207} y={140} textAnchor="middle" fontSize={10} fontWeight={800} fill={GREEN}>
        ÷ 2
      </text>
      <text x={230} y={262} textAnchor="middle" fontSize={9.5} fill={INK}>
        ε_ij = γ_ij / 2 dla i ≠ j; na przekątnej pozostają ε_x, ε_y, ε_z.
      </text>
      <text x={230} y={288} textAnchor="middle" fontSize={9} fill={MUTED}>
        Dzięki temu ε_ij = ε_ji — tensor jest symetryczny.
      </text>
    </>
  )
}

function TensorScene({ p }: { p: number }) {
  const entry = (row: number, column: number) =>
    ramp(p, 0.08 + (row * 3 + column) * 0.035, 0.26 + (row * 3 + column) * 0.035)
  return (
    <>
      <text x={240} y={42} textAnchor="middle" fontSize={11} fontWeight={700} fill={INK}>
        Tensor odkształcenia ε_ij ·10⁻⁴
      </text>
      <Matrix
        x={150}
        top={108}
        values={STRAIN}
        columnWidth={62}
        rowHeight={30}
        fontSize={12.5}
        opacity={entry}
        color={(row, column) => (row === column ? BLUE : VIOLET)}
        weight={() => 700}
      />
      <text x={240} y={214} textAnchor="middle" fontSize={9.5} fill={INK}>
        ε_ji = ε_ij — macierz symetryczna
      </text>
      <text x={240} y={242} textAnchor="middle" fontSize={9} fill={MUTED}>
        jednostka: 1 (bezwymiarowe), zapis ·10⁻⁴ to mnożnik
      </text>
      <circle cx={150} cy={284} r={4} fill={BLUE} />
      <text x={162} y={287} fontSize={9} fill={INK}>
        ε_x, ε_y, ε_z — normalne
      </text>
      <circle cx={300} cy={284} r={4} fill={VIOLET} />
      <text x={312} y={287} fontSize={9} fill={INK}>
        ε_ij — styczne
      </text>
    </>
  )
}

function CheckScene({ p }: { p: number }) {
  return (
    <>
      <text x={230} y={32} textAnchor="middle" fontSize={11} fontWeight={700} fill={INK}>
        Kontrola symetrii i jednostek
      </text>
      <text x={40} y={82} fontSize={9} fontWeight={700} fill={INK}>
        ε_ij ·10⁻⁴
      </text>
      <Matrix
        x={40}
        top={106}
        values={STRAIN}
        columnWidth={42}
        rowHeight={24}
        fontSize={8.8}
        color={(row, column) => (row === column ? BLUE : VIOLET)}
        weight={() => 600}
      />
      <motion.g initial={false} animate={{ opacity: ramp(p, 0.1, 0.42) }}>
        <text x={186} y={82} fontSize={9} fontWeight={700} fill={MUTED}>
          PARY SYMETRYCZNE
        </text>
        <text x={186} y={108} fontSize={9} fill={INK}>
          ε_xy = ε_yx = −1,5854·10⁻⁴
        </text>
        <text x={186} y={132} fontSize={9} fill={INK}>
          ε_xz = ε_zx = 4,7561·10⁻⁴
        </text>
        <text x={186} y={156} fontSize={9} fill={INK}>
          ε_yz = ε_zy = −2,2829·10⁻⁴
        </text>
      </motion.g>
      <motion.g initial={false} animate={{ opacity: ramp(p, 0.46, 0.8) }}>
        <text x={186} y={194} fontSize={9} fontWeight={700} fill={MUTED}>
          ŚLAD TENSORA
        </text>
        <text x={186} y={220} fontSize={9} fill={INK}>
          θ = 4,5659 − 3,9951 + 0,9512
        </text>
        <text x={186} y={244} fontSize={10.5} fontWeight={800} fill={GREEN}>
          θ = 1,5220·10⁻⁴
        </text>
        <text x={186} y={278} fontSize={9} fill={INK}>
          kontrola: 0,4·78 / 205 000 = 1,5220·10⁻⁴
        </text>
      </motion.g>
      <text x={230} y={314} textAnchor="middle" fontSize={9} fill={MUTED}>
        ε jest bezwymiarowe; ·10⁻⁴ to mnożnik, nie jednostka.
      </text>
    </>
  )
}

export function StrainTensorAnimation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'stress'
  const p = playing ? sceneProgress : 1

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 340"
          role="img"
          aria-label="Tensor odkształcenia obliczony z tensora naprężenia za pomocą uogólnionego prawa Hooke’a"
        >
          {metric === 'stress' && <StressScene p={p} />}
          {metric === 'material' && <MaterialScene p={p} />}
          {metric === 'hooke' && <HookeScene p={p} />}
          {metric === 'ex' && <ExScene p={p} />}
          {metric === 'eyz' && <EyzScene p={p} />}
          {metric === 'shear' && <ShearScene p={p} />}
          {metric === 'convention' && <ConventionScene p={p} />}
          {metric === 'tensor' && <TensorScene p={p} />}
          {metric === 'check' && <CheckScene p={p} />}
          {metric !== 'stress' &&
            metric !== 'material' &&
            metric !== 'hooke' &&
            metric !== 'ex' &&
            metric !== 'eyz' &&
            metric !== 'shear' &&
            metric !== 'convention' &&
            metric !== 'tensor' &&
            metric !== 'check' && <StressScene p={p} />}
        </svg>
      </div>
    </div>
  )
}
