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
  const showHead = t > 0.18

  return (
    <g stroke={color} fill={color}>
      <line x1={x1} y1={y1} x2={ex} y2={ey} strokeWidth={width} strokeLinecap="round" strokeDasharray={dash} />
      {showHead && <polygon points={`${ex},${ey} ${lx},${ly} ${rx},${ry}`} stroke="none" />}
    </g>
  )
}

function Cube({ opacity = 1 }: { opacity?: number }) {
  return (
    <g opacity={opacity}>
      <path d="M128 120 L172 80 L288 80 L244 120 Z" fill="#eef2ff" stroke={EDGE} strokeWidth={1.5} />
      <path d="M244 120 L288 80 L288 196 L244 236 Z" fill="#e8edf8" stroke={EDGE} strokeWidth={1.5} />
      <rect x={128} y={120} width={116} height={116} fill="#f6f8fd" stroke={EDGE} strokeWidth={1.5} />
      <path
        d="M172 80 L172 196 L288 196"
        fill="none"
        stroke={EDGE}
        strokeWidth={1}
        strokeDasharray="4 4"
        opacity={0.4}
      />
      <circle cx={186} cy={178} r={3} fill={INK} />
      <text x={193} y={175} fontSize={8} fill={MUTED}>
        punkt
      </text>
    </g>
  )
}

const CELL = 40
const MX = 300
const MY = 76

const matrixEntries = [
  { r: 0, c: 0, symbol: 'σx', value: '−50', color: BLUE, from: { x: 266, y: 168 } },
  { r: 1, c: 1, symbol: 'σy', value: '−50', color: GREEN, from: { x: 198, y: 104 } },
  { r: 2, c: 2, symbol: 'σz', value: '−50', color: ORANGE, from: { x: 160, y: 226 } },
]

const zeroEntries = [
  { r: 0, c: 1 },
  { r: 0, c: 2 },
  { r: 1, c: 0 },
  { r: 1, c: 2 },
  { r: 2, c: 0 },
  { r: 2, c: 1 },
]

function TensorMatrix({ progress }: { progress: number }) {
  return (
    <g>
      <text x={MX + 60} y={MY - 16} textAnchor="middle" fontSize={10} fontWeight={600} fill={INK}>
        tensor naprężenia [MPa]
      </text>
      {['x', 'y', 'z'].map((label, row) => (
        <text key={label} x={MX - 18} y={MY + row * CELL + CELL / 2 + 4} textAnchor="middle" fontSize={9} fill={MUTED}>
          {label}
        </text>
      ))}
      <path
        d={`M ${MX - 7} ${MY - 3} L ${MX - 14} ${MY - 3} L ${MX - 14} ${MY + 3 * CELL + 3} L ${MX - 7} ${MY + 3 * CELL + 3}`}
        fill="none"
        stroke={EDGE}
        strokeWidth={1.4}
      />
      <path
        d={`M ${MX + 3 * CELL + 7} ${MY - 3} L ${MX + 3 * CELL + 14} ${MY - 3} L ${MX + 3 * CELL + 14} ${MY + 3 * CELL + 3} L ${MX + 3 * CELL + 7} ${MY + 3 * CELL + 3}`}
        fill="none"
        stroke={EDGE}
        strokeWidth={1.4}
      />
      {Array.from({ length: 3 }, (_, row) =>
        Array.from({ length: 3 }, (_, col) => (
          <rect
            key={`cell-${row}-${col}`}
            x={MX + col * CELL}
            y={MY + row * CELL}
            width={CELL}
            height={CELL}
            fill="#fbfcff"
            stroke="#dfe5ee"
            strokeWidth={1}
          />
        )),
      )}
      {zeroEntries.map(({ r, c }) => (
        <text
          key={`zero-${r}-${c}`}
          x={MX + c * CELL + CELL / 2}
          y={MY + r * CELL + CELL / 2 + 4}
          textAnchor="middle"
          fontSize={12}
          fill="#b5beca"
          opacity={ramp(progress, 0.45 + (r + c) * 0.03, 0.75 + (r + c) * 0.03)}
        >
          0
        </text>
      ))}
      {matrixEntries.map((entry, index) => {
        const targetX = MX + entry.c * CELL + CELL / 2
        const targetY = MY + entry.r * CELL + CELL / 2
        const dx = entry.from.x - targetX
        const dy = entry.from.y - targetY
        const move = ramp(progress, 0.1 + index * 0.12, 0.52 + index * 0.12)
        const appear = ramp(progress, 0.02, 0.12)
        return (
          <motion.g
            key={`${entry.r}-${entry.c}`}
            initial={false}
            animate={{ x: dx * (1 - move), y: dy * (1 - move), opacity: appear }}
            transition={{ duration: 0.08, ease: 'linear' }}
          >
            <rect
              x={targetX - 18}
              y={targetY - 11}
              width={36}
              height={22}
              rx={5}
              fill="#fff"
              stroke={entry.color}
              strokeWidth={1.6}
            />
            <text x={targetX} y={targetY + 2} textAnchor="middle" fontSize={9} fontWeight={600} fill={entry.color}>
              {entry.symbol}
            </text>
            <text x={targetX} y={targetY + 11} textAnchor="middle" fontSize={7} fill={MUTED}>
              {entry.value}
            </text>
          </motion.g>
        )
      })}
      <motion.text
        x={MX + 60}
        y={MY + 3 * CELL + 22}
        textAnchor="middle"
        fontSize={9}
        fill={MUTED}
        initial={false}
        animate={{ opacity: ramp(progress, 0.55, 0.85) }}
      >
        σ = −50 · I
      </motion.text>
    </g>
  )
}

function PlaneNormal({ progress }: { progress: number }) {
  const ox = 290
  const oy = 168
  const nx = 0.6
  const ny = 0.8
  const tipX = ox + 78 * nx
  const tipY = oy - 78 * ny
  const draw = ramp(progress, 0.08, 0.38)

  return (
    <g>
      <text x={16} y={24} fontSize={9} fill={MUTED}>
        dowolna płaszczyzna · normalna n = (0,6; 0,8; 0)
      </text>
      <line x1={ox - 80 * ny} y1={oy - 80 * nx} x2={ox + 80 * ny} y2={oy + 80 * nx} stroke={EDGE} strokeWidth={2} />
      <line x1={ox} y1={oy} x2={ox + 80} y2={oy} stroke={MUTED} strokeWidth={1} strokeDasharray="4 4" />
      <text x={ox + 84} y={oy + 3} fontSize={9} fill={MUTED}>
        x
      </text>
      <path
        d={`M ${ox + 34} ${oy} A 34 34 0 0 0 ${ox + 34 * nx} ${oy - 34 * ny}`}
        fill="none"
        stroke={MUTED}
        strokeWidth={1}
      />
      <text x={ox + 40} y={oy - 14} fontSize={9} fill={MUTED}>
        53,1°
      </text>
      <Arrow x1={ox} y1={oy} x2={tipX} y2={tipY} amount={draw} color={BLUE} width={2.6} />
      <motion.text
        x={tipX + 6}
        y={tipY - 5}
        fontSize={9.5}
        fontWeight={600}
        fill={BLUE}
        initial={false}
        animate={{ opacity: draw }}
      >
        n
      </motion.text>
      <motion.g initial={false} animate={{ opacity: ramp(progress, 0.38, 0.72) }}>
        <line x1={tipX} y1={tipY} x2={tipX} y2={oy} stroke={BLUE} strokeWidth={1} strokeDasharray="3 3" />
        <line x1={ox} y1={oy} x2={tipX} y2={oy} stroke={BLUE} strokeWidth={1} strokeDasharray="3 3" />
        <text x={(ox + tipX) / 2} y={oy + 13} textAnchor="middle" fontSize={8.5} fill={BLUE}>
          0,6
        </text>
        <text x={tipX + 4} y={(tipY + oy) / 2} fontSize={8.5} fill={BLUE}>
          0,8
        </text>
      </motion.g>
      <text x={20} y={274} fontSize={9} fill={MUTED}>
        każda płaszczyzna ma inną normalną, ale ten sam tensor
      </text>
    </g>
  )
}

function PlaneTraction({ progress }: { progress: number }) {
  const ox = 290
  const oy = 168
  const nx = 0.6
  const ny = 0.8
  const nX = ox + 72 * nx
  const nY = oy - 72 * ny
  const tX = ox - 42
  const tY = oy + 56
  const showN = ramp(progress, 0.05, 0.3)
  const showT = ramp(progress, 0.25, 0.62)

  return (
    <g>
      <text x={16} y={24} fontSize={9} fill={MUTED}>
        T = −50 n · wektor trakcji przeciwny do normalnej
      </text>
      <line x1={ox - 80 * ny} y1={oy - 80 * nx} x2={ox + 80 * ny} y2={oy + 80 * nx} stroke={EDGE} strokeWidth={2} />
      <Arrow x1={ox} y1={oy} x2={nX} y2={nY} amount={showN} color={BLUE} width={2.6} />
      <text x={nX + 5} y={nY - 5} fontSize={9.5} fontWeight={600} fill={BLUE}>
        n
      </text>
      <Arrow x1={ox} y1={oy} x2={tX} y2={tY} amount={showT} color={ORANGE} width={2.8} />
      <text x={tX - 6} y={tY + 14} textAnchor="end" fontSize={9.5} fontWeight={600} fill={ORANGE}>
        T
      </text>
      <motion.line
        x1={nX}
        y1={nY}
        x2={tX}
        y2={tY}
        stroke={MUTED}
        strokeWidth={1}
        strokeDasharray="3 4"
        initial={false}
        animate={{ opacity: ramp(progress, 0.55, 0.82) }}
      />
      <text x={20} y={274} fontSize={9} fill={MUTED}>
        T jest równoległa do n, ale ma przeciwny zwrot
      </text>
    </g>
  )
}

function PlaneComponents({ progress }: { progress: number }) {
  const ox = 290
  const oy = 168
  const nx = 0.6
  const ny = 0.8
  const nX = ox + 62 * nx
  const nY = oy - 62 * ny
  const tX = ox - 42
  const tY = oy + 56
  const show = ramp(progress, 0.06, 0.4)
  const zero = ramp(progress, 0.45, 0.78)

  return (
    <g>
      <text x={16} y={24} fontSize={9} fill={MUTED}>
        σn = −50 MPa · τ = 0 MPa
      </text>
      <line x1={ox - 80 * ny} y1={oy - 80 * nx} x2={ox + 80 * ny} y2={oy + 80 * nx} stroke={EDGE} strokeWidth={2} />
      <Arrow x1={ox} y1={oy} x2={nX} y2={nY} amount={show} color={MUTED} width={1.3} dash="4 4" />
      <Arrow x1={ox} y1={oy} x2={tX} y2={tY} amount={show} color={ORANGE} width={2.8} />
      <text x={tX - 6} y={tY + 14} textAnchor="end" fontSize={9} fontWeight={600} fill={ORANGE}>
        σn = −50
      </text>
      <motion.g initial={false} animate={{ opacity: zero }}>
        <circle cx={ox} cy={oy} r={7} fill="none" stroke={VIOLET} strokeWidth={1.6} />
        <text x={ox + 12} y={oy + 4} fontSize={9} fontWeight={600} fill={VIOLET}>
          τ = 0
        </text>
      </motion.g>
      <text x={20} y={274} fontSize={9} fill={MUTED}>
        cała trakcja leży na kierunku normalnej — brak części stycznej
      </text>
    </g>
  )
}

function PlaneCheck({ progress }: { progress: number }) {
  const ox = 340
  const oy = 180
  const nx = 0.6
  const ny = 0.8
  const nX = ox + 80 * nx
  const nY = oy - 80 * ny
  const tX = ox - 48
  const tY = oy + 64
  const draw = ramp(progress, 0.08, 0.6)

  return (
    <g>
      <text x={16} y={24} fontSize={9} fill={MUTED}>
        kontrola: n = (0,6; 0,8; 0) · T = (−30; −40; 0) MPa
      </text>
      <Arrow x1={ox} y1={oy} x2={nX} y2={nY} amount={draw} color={BLUE} width={2.4} />
      <text x={nX + 5} y={nY - 5} fontSize={9} fontWeight={600} fill={BLUE}>
        n
      </text>
      <Arrow x1={ox} y1={oy} x2={tX} y2={tY} amount={draw} color={ORANGE} width={2.8} />
      <motion.g initial={false} animate={{ opacity: draw }}>
        <line x1={ox} y1={oy} x2={tX} y2={oy} stroke={ORANGE} strokeWidth={1.2} strokeDasharray="4 3" />
        <line x1={tX} y1={oy} x2={tX} y2={tY} stroke={ORANGE} strokeWidth={1.2} strokeDasharray="4 3" />
        <text x={(ox + tX) / 2} y={oy + 13} textAnchor="middle" fontSize={9} fill={ORANGE}>
          30
        </text>
        <text x={tX - 5} y={(oy + tY) / 2} textAnchor="end" fontSize={9} fill={ORANGE}>
          40
        </text>
        <text x={(ox + tX) / 2 - 10} y={(oy + tY) / 2} textAnchor="middle" fontSize={9} fontWeight={600} fill={ORANGE}>
          50
        </text>
      </motion.g>
      <text x={20} y={274} fontSize={9} fill={MUTED}>
        trójkąt 30–40–50: długość trakcji wynosi 50 MPa
      </text>
    </g>
  )
}

export function StressTensorExample2Animation({ scene, playing, sceneProgress, index }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const p = playing ? smooth(sceneProgress) : 1
  const pulse = playing ? 0.65 + 0.35 * Math.sin((sceneProgress * 3 + index) * Math.PI * 2) : 1

  const isModel = metric === 'model'
  const isTensor = metric === 'tensor'
  const isPlane = metric === 'plane'
  const isTraction = metric === 'traction'
  const isComponents = metric === 'components'
  const isCheck = metric === 'check'

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 300"
          role="img"
          aria-label="Stan hydrostatyczny: jednakowe ściskanie 50 megapaskali w trzech prostopadłych kierunkach, tensor diagonalny oraz trakcja zawsze prostopadła do płaszczyzny i skierowana do wnętrza materiału."
        >
          <text x={16} y={24} fontSize={9} fill={MUTED}>
            σx = σy = σz = −50 MPa · τxy = τyz = τzx = 0
          </text>

          {isModel && (
            <g>
              <Cube />
              <Arrow x1={322} y1={168} x2={264} y2={168} amount={ramp(p, 0.05, 0.35)} color={BLUE} width={2.8} />
              <Arrow x1={198} y1={54} x2={198} y2={104} amount={ramp(p, 0.18, 0.48)} color={GREEN} width={2.8} />
              <Arrow x1={148} y1={226} x2={182} y2={196} amount={ramp(p, 0.32, 0.62)} color={ORANGE} width={2.8} />
              <motion.g initial={false} animate={{ opacity: ramp(p, 0.24, 0.5) }}>
                <text x={286} y={160} fontSize={9} fontWeight={600} fill={BLUE}>
                  σx = −50
                </text>
                <text x={206} y={72} fontSize={9} fontWeight={600} fill={GREEN}>
                  σy = −50
                </text>
                <text x={116} y={246} fontSize={9} fontWeight={600} fill={ORANGE}>
                  σz = −50
                </text>
              </motion.g>
              <motion.circle
                cx={186}
                cy={178}
                r={7}
                fill="none"
                stroke={INK}
                strokeWidth={1.2}
                initial={false}
                animate={{ opacity: playing ? [0.25, pulse, 0.25] : 0.4 }}
                transition={{ duration: 1.6, repeat: playing ? Infinity : 0, ease: 'easeInOut' }}
              />
              <text x={20} y={274} fontSize={9} fill={MUTED}>
                ciśnienie hydrostatyczne: wszystkie ścianki ściskane jednakowo
              </text>
            </g>
          )}

          {isTensor && (
            <g>
              <Cube opacity={0.55} />
              <motion.g initial={false} animate={{ opacity: ramp(p, 0.04, 0.24) }}>
                <text x={142} y={112} fontSize={9} fontWeight={600} fill={BLUE}>
                  σx
                </text>
                <text x={250} y={108} fontSize={9} fontWeight={600} fill={GREEN}>
                  σy
                </text>
                <text x={152} y={248} fontSize={9} fontWeight={600} fill={ORANGE}>
                  σz
                </text>
                <text x={150} y={266} fontSize={9} fill={MUTED}>
                  brak wyróżnionego kierunku
                </text>
              </motion.g>
              <TensorMatrix progress={p} />
            </g>
          )}

          {isPlane && <PlaneNormal progress={p} />}
          {isTraction && <PlaneTraction progress={p} />}
          {isComponents && <PlaneComponents progress={p} />}
          {isCheck && <PlaneCheck progress={p} />}

          {isTensor && (
            <text x={20} y={286} fontSize={9} fill={MUTED}>
              tensor jest wielokrotnością macierzy jednostkowej
            </text>
          )}
        </svg>
      </div>
    </div>
  )
}
