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
  { r: 0, c: 0, symbol: 'σx', value: '120', color: BLUE, from: { x: 262, y: 168 } },
  { r: 0, c: 1, symbol: 'τxy', value: '30', color: VIOLET, from: { x: 268, y: 206 } },
  { r: 1, c: 0, symbol: 'τxy', value: '30', color: VIOLET, from: { x: 258, y: 206 } },
  { r: 1, c: 1, symbol: 'σy', value: '40', color: GREEN, from: { x: 198, y: 112 } },
]

const zeroEntries = [
  { r: 0, c: 2 },
  { r: 1, c: 2 },
  { r: 2, c: 0 },
  { r: 2, c: 1 },
  { r: 2, c: 2 },
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
          opacity={ramp(progress, 0.55 + (r + c) * 0.03, 0.8 + (r + c) * 0.03)}
        >
          0
        </text>
      ))}
      {matrixEntries.map((entry, index) => {
        const targetX = MX + entry.c * CELL + CELL / 2
        const targetY = MY + entry.r * CELL + CELL / 2
        const dx = entry.from.x - targetX
        const dy = entry.from.y - targetY
        const move = ramp(progress, 0.12 + index * 0.1, 0.56 + index * 0.1)
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
    </g>
  )
}

function PlaneNormal({ progress }: { progress: number }) {
  const ox = 270
  const oy = 215
  const nx = Math.cos(Math.PI / 6)
  const ny = Math.sin(Math.PI / 6)
  const tipX = ox + 65 * nx
  const tipY = oy - 65 * ny
  const show = ramp(progress, 0.08, 0.35)

  return (
    <g>
      <text x={16} y={24} fontSize={9} fill={MUTED}>
        płaski stan naprężenia · σz = τxz = τyz = 0
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
      <text x={ox + 38} y={oy - 12} fontSize={9} fill={MUTED}>
        30°
      </text>
      <Arrow x1={ox} y1={oy} x2={tipX} y2={tipY} amount={show} color={BLUE} width={2.6} />
      <motion.text
        x={tipX + 6}
        y={tipY - 5}
        fontSize={9.5}
        fontWeight={600}
        fill={BLUE}
        initial={false}
        animate={{ opacity: show }}
      >
        n
      </motion.text>
      <motion.g initial={false} animate={{ opacity: ramp(progress, 0.36, 0.7) }}>
        <line x1={tipX} y1={tipY} x2={tipX} y2={oy} stroke={BLUE} strokeWidth={1} strokeDasharray="3 3" />
        <line x1={ox} y1={oy} x2={tipX} y2={oy} stroke={BLUE} strokeWidth={1} strokeDasharray="3 3" />
        <text x={(ox + tipX) / 2} y={oy + 13} textAnchor="middle" fontSize={8.5} fill={BLUE}>
          cos 30°
        </text>
        <text x={tipX + 4} y={(tipY + oy) / 2} fontSize={8.5} fill={BLUE}>
          sin 30°
        </text>
      </motion.g>
      <text x={20} y={274} fontSize={9} fill={MUTED}>
        normalna n = (cos 30°, sin 30°, 0)
      </text>
    </g>
  )
}

function PlaneTraction({ progress }: { progress: number }) {
  const ox = 250
  const oy = 220
  const s = 0.8
  const nx = Math.cos(Math.PI / 6)
  const ny = Math.sin(Math.PI / 6)
  const pX = ox + 125.98 * nx * s
  const pY = oy - 125.98 * ny * s
  const tX = ox + 118.92 * s
  const tY = oy - 45.98 * s
  const nX = ox + 50 * nx
  const nY = oy - 50 * ny
  const showNormal = ramp(progress, 0.04, 0.24)
  const showTraction = ramp(progress, 0.16, 0.44)
  const showComponents = ramp(progress, 0.42, 0.8)

  return (
    <g>
      <text x={16} y={24} fontSize={9} fill={MUTED}>
        T = σ n · rozkład na normalną i styczną
      </text>
      <line x1={ox - 80 * ny} y1={oy - 80 * nx} x2={ox + 80 * ny} y2={oy + 80 * nx} stroke={EDGE} strokeWidth={2} />
      <Arrow x1={ox} y1={oy} x2={nX} y2={nY} amount={showNormal} color={MUTED} width={1.4} dash="4 4" />
      <text x={nX + 4} y={nY - 4} fontSize={9} fill={MUTED}>
        n
      </text>
      <Arrow x1={ox} y1={oy} x2={tX} y2={tY} amount={showTraction} color={ORANGE} width={2.8} />
      <text x={tX + 5} y={tY + 2} fontSize={9.5} fontWeight={600} fill={ORANGE}>
        T
      </text>
      <Arrow x1={ox} y1={oy} x2={pX} y2={pY} amount={showComponents} color={BLUE} width={2.6} />
      <text x={(ox + pX) / 2 - 10} y={(oy + pY) / 2 - 7} fontSize={9} fontWeight={600} fill={BLUE}>
        σn
      </text>
      <Arrow x1={pX} y1={pY} x2={tX} y2={tY} amount={showComponents} color={VIOLET} width={2.6} />
      <text x={tX - 2} y={tY - 8} fontSize={9} fontWeight={600} fill={VIOLET}>
        τ
      </text>
      <motion.g initial={false} animate={{ opacity: showComponents }}>
        <line
          x1={ox}
          y1={oy}
          x2={ox + (tX - pX)}
          y2={oy + (tY - pY)}
          stroke={VIOLET}
          strokeWidth={1}
          strokeDasharray="4 3"
        />
        <line
          x1={ox + (tX - pX)}
          y1={oy + (tY - pY)}
          x2={tX}
          y2={tY}
          stroke={VIOLET}
          strokeWidth={1}
          strokeDasharray="4 3"
        />
      </motion.g>
      <text x={16} y={274} fontSize={9} fill={MUTED}>
        σn ≈ 125,98 MPa · τ ≈ 19,6 MPa
      </text>
    </g>
  )
}

function PlaneCheck({ progress }: { progress: number }) {
  const ox = 220
  const oy = 245
  const s = 1
  const nx = Math.cos(Math.PI / 6)
  const ny = Math.sin(Math.PI / 6)
  const pX = ox + 125.98 * nx * s
  const pY = oy - 125.98 * ny * s
  const tX = ox + 118.92 * s
  const tY = oy - 45.98 * s
  const draw = ramp(progress, 0.08, 0.62)

  return (
    <g>
      <text x={16} y={24} fontSize={9} fill={MUTED}>
        kontrola: σn² + τ² = |T|²
      </text>
      <Arrow x1={ox} y1={oy} x2={tX} y2={tY} amount={draw} color={ORANGE} width={2.8} />
      <Arrow x1={ox} y1={oy} x2={pX} y2={pY} amount={draw} color={BLUE} width={2.6} />
      <Arrow x1={pX} y1={pY} x2={tX} y2={tY} amount={draw} color={VIOLET} width={2.6} />
      <motion.path
        d={`M ${pX - 9} ${pY} L ${pX - 9} ${pY + 9} L ${pX} ${pY + 9}`}
        fill="none"
        stroke={INK}
        strokeWidth={1.2}
        initial={false}
        animate={{ opacity: draw }}
      />
      <motion.g initial={false} animate={{ opacity: draw }}>
        <text
          x={(ox + pX) / 2 - 2}
          y={(oy + pY) / 2 + 14}
          textAnchor="middle"
          fontSize={9.5}
          fontWeight={600}
          fill={BLUE}
        >
          σn ≈ 126 MPa
        </text>
        <text x={(pX + tX) / 2 + 16} y={(pY + tY) / 2 + 2} fontSize={9.5} fontWeight={600} fill={VIOLET}>
          τ ≈ 19,6
        </text>
        <text x={(ox + tX) / 2 - 6} y={(oy + tY) / 2 - 10} fontSize={9.5} fontWeight={600} fill={ORANGE}>
          |T| ≈ 127,5 MPa
        </text>
      </motion.g>
      <text x={16} y={274} fontSize={9} fill={MUTED}>
        trójkąt prostokątny: przeciwprostokątna to długość trakcji
      </text>
    </g>
  )
}

export function StressTensorExample1Animation({ scene, playing, sceneProgress, index }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const p = playing ? smooth(sceneProgress) : 1
  const pulse = playing ? 0.65 + 0.35 * Math.sin((sceneProgress * 3 + index) * Math.PI * 2) : 1

  const isModel = metric === 'model'
  const isTensor = metric === 'tensor'
  const isPlane = metric === 'plane'
  const isTraction = metric === 'traction'
  const isCheck = metric === 'check'

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 300"
          role="img"
          aria-label="Kostka naprężeń w punkcie: składowe sigma x, sigma y i tau xy, ich zapis w tensorze oraz trakcja na płaszczyźnie nachylonej pod kątem 30 stopni."
        >
          <text x={16} y={24} fontSize={9} fill={MUTED}>
            σx = 120 MPa · σy = 40 MPa · τxy = 30 MPa
          </text>

          {isModel && (
            <g>
              <Cube />
              <Arrow x1={262} y1={168} x2={322} y2={168} amount={ramp(p, 0.05, 0.38)} color={BLUE} width={2.8} />
              <motion.text
                x={288}
                y={160}
                fontSize={10}
                fontWeight={600}
                fill={BLUE}
                initial={false}
                animate={{ opacity: ramp(p, 0.22, 0.46) }}
              >
                σx = 120
              </motion.text>
              <Arrow x1={280} y1={208} x2={280} y2={136} amount={ramp(p, 0.24, 0.56)} color={VIOLET} width={2.6} />
              <motion.text
                x={286}
                y={132}
                fontSize={10}
                fontWeight={600}
                fill={VIOLET}
                initial={false}
                animate={{ opacity: ramp(p, 0.4, 0.64) }}
              >
                τxy = 30
              </motion.text>
              <Arrow x1={198} y1={104} x2={198} y2={54} amount={ramp(p, 0.42, 0.74)} color={GREEN} width={2.8} />
              <motion.text
                x={206}
                y={58}
                fontSize={10}
                fontWeight={600}
                fill={GREEN}
                initial={false}
                animate={{ opacity: ramp(p, 0.58, 0.82) }}
              >
                σy = 40
              </motion.text>
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
                naprężenia normalne prostopadłe do ścian, styczne w płaszczyźnie ściany
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
                <text x={292} y={214} fontSize={9} fontWeight={600} fill={VIOLET}>
                  τxy
                </text>
                <text x={150} y={258} fontSize={9} fill={MUTED}>
                  τxz = τyz = σz = 0
                </text>
              </motion.g>
              <TensorMatrix progress={p} />
            </g>
          )}

          {isPlane && <PlaneNormal progress={p} />}
          {isTraction && <PlaneTraction progress={p} />}
          {isCheck && <PlaneCheck progress={p} />}

          {isTensor && (
            <text x={20} y={274} fontSize={9} fill={MUTED}>
              symetria: τxy = τyx, więc sześć niezależnych składowych
            </text>
          )}
        </svg>
      </div>
    </div>
  )
}
