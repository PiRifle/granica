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
const MY = 80

const matrixEntries = [
  { r: 0, c: 0, symbol: 'σx', value: '80', color: BLUE, from: { x: 256, y: 196 } },
  { r: 0, c: 1, symbol: 'τyx', value: '25', color: VIOLET, from: { x: 190, y: 110 } },
  { r: 1, c: 0, symbol: 'τxy', value: '25', color: VIOLET, from: { x: 256, y: 196 } },
  { r: 1, c: 1, symbol: 'σy', value: '−20', color: GREEN, from: { x: 190, y: 110 } },
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
      <text x={MX + 60} y={MY - 26} textAnchor="middle" fontSize={10} fontWeight={600} fill={INK}>
        składanie tensora z trakcji
      </text>
      <text x={MX + CELL / 2} y={MY - 8} textAnchor="middle" fontSize={8} fill={BLUE}>
        T(x)
      </text>
      <text x={MX + CELL + CELL / 2} y={MY - 8} textAnchor="middle" fontSize={8} fill={GREEN}>
        T(y)
      </text>
      <text x={MX + 2 * CELL + CELL / 2} y={MY - 8} textAnchor="middle" fontSize={8} fill={MUTED}>
        0
      </text>
      {['x', 'y', 'z'].map((label, row) => (
        <text key={label} x={MX - 18} y={MY + row * CELL + CELL / 2 + 4} textAnchor="middle" fontSize={9} fill={MUTED}>
          {label}
        </text>
      ))}
      <motion.rect
        x={MX}
        y={MY}
        width={CELL}
        height={2 * CELL}
        fill={BLUE}
        fillOpacity={0.07}
        initial={false}
        animate={{ opacity: ramp(progress, 0.02, 0.24) }}
      />
      <motion.rect
        x={MX + CELL}
        y={MY}
        width={CELL}
        height={2 * CELL}
        fill={GREEN}
        fillOpacity={0.07}
        initial={false}
        animate={{ opacity: ramp(progress, 0.16, 0.38) }}
      />
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
            fill="none"
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
          opacity={ramp(progress, 0.5 + (r + c) * 0.03, 0.8 + (r + c) * 0.03)}
        >
          0
        </text>
      ))}
      {matrixEntries.map((entry, index) => {
        const targetX = MX + entry.c * CELL + CELL / 2
        const targetY = MY + entry.r * CELL + CELL / 2
        const dx = entry.from.x - targetX
        const dy = entry.from.y - targetY
        const move = ramp(progress, 0.08 + index * 0.11, 0.5 + index * 0.11)
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
        y={MY + 3 * CELL + 20}
        textAnchor="middle"
        fontSize={9}
        fill={MUTED}
        initial={false}
        animate={{ opacity: ramp(progress, 0.6, 0.88) }}
      >
        τxy = τyx = 25 MPa
      </motion.text>
    </g>
  )
}

function PlaneNormal({ progress }: { progress: number }) {
  const ox = 270
  const oy = 210
  const nx = 0.6
  const ny = 0.8
  const tipX = ox + 72 * nx
  const tipY = oy - 72 * ny
  const draw = ramp(progress, 0.08, 0.38)

  return (
    <g>
      <text x={16} y={24} fontSize={9} fill={MUTED}>
        normalna n = (0,6; 0,8; 0) · kąt 53,1° od osi x
      </text>
      <line x1={ox - 80 * ny} y1={oy - 80 * nx} x2={ox + 80 * ny} y2={oy + 80 * nx} stroke={EDGE} strokeWidth={2} />
      <line x1={ox} y1={oy} x2={ox + 84} y2={oy} stroke={MUTED} strokeWidth={1} strokeDasharray="4 4" />
      <text x={ox + 88} y={oy + 3} fontSize={9} fill={MUTED}>
        x
      </text>
      <path
        d={`M ${ox + 34} ${oy} A 34 34 0 0 0 ${ox + 34 * nx} ${oy - 34 * ny}`}
        fill="none"
        stroke={MUTED}
        strokeWidth={1}
      />
      <text x={ox + 40} y={oy - 16} fontSize={9} fill={MUTED}>
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
        normalna jest jednostkowa: 0,6² + 0,8² = 1
      </text>
    </g>
  )
}

function PlaneTraction({ progress }: { progress: number }) {
  const ox = 250
  const oy = 210
  const nx = 0.6
  const ny = 0.8
  const nX = ox + 55 * nx
  const nY = oy - 55 * ny
  const tX = ox + 68
  const tY = oy - 1
  const showN = ramp(progress, 0.04, 0.28)
  const showT = ramp(progress, 0.22, 0.6)

  return (
    <g>
      <text x={16} y={24} fontSize={9} fill={MUTED}>
        trakcja z pełnego tensora: T = (68; −1; 0) MPa
      </text>
      <line x1={ox - 80 * ny} y1={oy - 80 * nx} x2={ox + 80 * ny} y2={oy + 80 * nx} stroke={EDGE} strokeWidth={2} />
      <Arrow x1={ox} y1={oy} x2={nX} y2={nY} amount={showN} color={MUTED} width={1.4} dash="4 4" />
      <text x={nX + 4} y={nY - 4} fontSize={9} fill={MUTED}>
        n
      </text>
      <Arrow x1={ox} y1={oy} x2={tX} y2={tY} amount={showT} color={ORANGE} width={2.8} />
      <text x={tX + 5} y={tY - 5} fontSize={9.5} fontWeight={600} fill={ORANGE}>
        T
      </text>
      <motion.g initial={false} animate={{ opacity: ramp(progress, 0.55, 0.82) }}>
        <line x1={ox} y1={oy} x2={tX} y2={oy} stroke={ORANGE} strokeWidth={1} strokeDasharray="4 3" />
        <line x1={tX} y1={oy} x2={tX} y2={tY} stroke={ORANGE} strokeWidth={1} strokeDasharray="4 3" />
        <text x={(ox + tX) / 2} y={oy + 13} textAnchor="middle" fontSize={8.5} fill={ORANGE}>
          68
        </text>
      </motion.g>
      <text x={20} y={274} fontSize={9} fill={MUTED}>
        składowa Ty ≈ −1 MPa jest prawie zerowa, ale nie znika
      </text>
    </g>
  )
}

function PlaneDecomposition({ progress }: { progress: number }) {
  const ox = 250
  const oy = 210
  const nx = 0.6
  const ny = 0.8
  const pX = ox + 40 * nx
  const pY = oy - 40 * ny
  const tX = ox + 68
  const tY = oy - 1
  const nxTip = ox + 54 * nx
  const nyTip = oy - 54 * ny
  const qX = ox + (tX - pX)
  const qY = oy + (tY - pY)
  const show = ramp(progress, 0.06, 0.42)
  const decompose = ramp(progress, 0.4, 0.8)

  return (
    <g>
      <text x={16} y={24} fontSize={9} fill={MUTED}>
        rozkład trakcji: σn = 40 MPa · τ = 55 MPa
      </text>
      <line x1={ox - 80 * ny} y1={oy - 80 * nx} x2={ox + 80 * ny} y2={oy + 80 * nx} stroke={EDGE} strokeWidth={2} />
      <Arrow x1={ox} y1={oy} x2={nxTip} y2={nyTip} amount={show} color={MUTED} width={1.3} dash="4 4" />
      <text x={nxTip + 4} y={nyTip - 4} fontSize={9} fill={MUTED}>
        n
      </text>
      <Arrow x1={ox} y1={oy} x2={tX} y2={tY} amount={show} color={ORANGE} width={2.8} />
      <text x={tX + 5} y={tY - 5} fontSize={9.5} fontWeight={600} fill={ORANGE}>
        T
      </text>
      <Arrow x1={ox} y1={oy} x2={pX} y2={pY} amount={decompose} color={BLUE} width={2.6} />
      <text x={(ox + pX) / 2 - 6} y={(oy + pY) / 2 - 7} fontSize={9} fontWeight={600} fill={BLUE}>
        σn = 40
      </text>
      <Arrow x1={pX} y1={pY} x2={tX} y2={tY} amount={decompose} color={VIOLET} width={2.6} />
      <text x={(pX + tX) / 2 + 4} y={(pY + tY) / 2 + 12} fontSize={9} fontWeight={600} fill={VIOLET}>
        τ = 55
      </text>
      <motion.g initial={false} animate={{ opacity: decompose }}>
        <line x1={ox} y1={oy} x2={qX} y2={qY} stroke={VIOLET} strokeWidth={1} strokeDasharray="4 3" />
        <line x1={qX} y1={qY} x2={tX} y2={tY} stroke={VIOLET} strokeWidth={1} strokeDasharray="4 3" />
      </motion.g>
      <text x={20} y={274} fontSize={9} fill={MUTED}>
        duża składowa styczna: τ = 55 MPa, większa niż σn = 40 MPa
      </text>
    </g>
  )
}

function PlaneCheck({ progress }: { progress: number }) {
  const ox = 220
  const oy = 240
  const s = 1.5
  const nx = 0.6
  const ny = 0.8
  const pX = ox + 40 * nx * s
  const pY = oy - 40 * ny * s
  const tX = ox + 68 * s
  const tY = oy - 1 * s
  const draw = ramp(progress, 0.08, 0.62)

  return (
    <g>
      <text x={16} y={24} fontSize={9} fill={MUTED}>
        pełny tensor: σn = 40 MPa, τ = 55 MPa
      </text>
      <text x={16} y={40} fontSize={9} fill={MUTED}>
        sama σx = 80 MPa nie opisuje tej płaszczyzny
      </text>
      <Arrow x1={ox} y1={oy} x2={tX} y2={tY} amount={draw} color={ORANGE} width={2.8} />
      <Arrow x1={ox} y1={oy} x2={pX} y2={pY} amount={draw} color={BLUE} width={2.6} />
      <Arrow x1={pX} y1={pY} x2={tX} y2={tY} amount={draw} color={VIOLET} width={2.6} />
      <motion.path
        d={`M ${pX - 10} ${pY} L ${pX - 10} ${pY + 10} L ${pX} ${pY + 10}`}
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
          σn = 40
        </text>
        <text x={(pX + tX) / 2 + 16} y={(pY + tY) / 2 + 2} fontSize={9.5} fontWeight={600} fill={VIOLET}>
          τ = 55
        </text>
        <text x={(ox + tX) / 2 - 4} y={(oy + tY) / 2 - 12} fontSize={9.5} fontWeight={600} fill={ORANGE}>
          |T| ≈ 68
        </text>
      </motion.g>
      <text x={20} y={274} fontSize={9} fill={MUTED}>
        kontrola: 40² + 55² = 68² ≈ 4625 MPa²
      </text>
    </g>
  )
}

export function StressTensorExample3Animation({ scene, playing, sceneProgress, index }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const p = playing ? smooth(sceneProgress) : 1
  const pulse = playing ? 0.65 + 0.35 * Math.sin((sceneProgress * 3 + index) * Math.PI * 2) : 1

  const isModel = metric === 'model'
  const isTensor = metric === 'tensor'
  const isPlane = metric === 'plane'
  const isTraction = metric === 'traction'
  const isDecomposition = metric === 'decomposition'
  const isCheck = metric === 'check'

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 300"
          role="img"
          aria-label="Odtwarzanie tensora naprężenia z trakcji na dwóch prostopadłych ściankach. Animacja pokazuje trakcje, składanie macierzy, normalną płaszczyzny oraz rozkład trakcji na naprężenie normalne 40 megapaskali i styczne 55 megapaskali."
        >
          {(isModel || isTensor) && (
            <text x={16} y={24} fontSize={9} fill={MUTED}>
              T(x) = (80; 25; 0) MPa · T(y) = (25; −20; 0) MPa
            </text>
          )}

          {isModel && (
            <g>
              <Cube />
              <Arrow x1={256} y1={196} x2={322} y2={196} amount={ramp(p, 0.05, 0.32)} color={BLUE} width={2.6} />
              <Arrow x1={256} y1={196} x2={256} y2={152} amount={ramp(p, 0.18, 0.44)} color={VIOLET} width={2.4} />
              <Arrow x1={256} y1={196} x2={322} y2={152} amount={ramp(p, 0.34, 0.64)} color={ORANGE} width={2.8} />
              <motion.g initial={false} animate={{ opacity: ramp(p, 0.24, 0.5) }}>
                <text x={300} y={210} fontSize={8.5} fill={BLUE}>
                  σx = 80
                </text>
                <text x={246} y={174} textAnchor="end" fontSize={8.5} fill={VIOLET}>
                  τxy = 25
                </text>
                <text x={326} y={148} fontSize={9} fontWeight={600} fill={ORANGE}>
                  T(x)
                </text>
              </motion.g>
              <Arrow x1={190} y1={110} x2={236} y2={110} amount={ramp(p, 0.36, 0.62)} color={VIOLET} width={2.4} />
              <Arrow x1={190} y1={110} x2={190} y2={140} amount={ramp(p, 0.46, 0.7)} color={GREEN} width={2.6} />
              <Arrow x1={190} y1={110} x2={236} y2={140} amount={ramp(p, 0.58, 0.84)} color={ORANGE} width={2.8} />
              <motion.g initial={false} animate={{ opacity: ramp(p, 0.5, 0.76) }}>
                <text x={214} y={104} textAnchor="middle" fontSize={8.5} fill={VIOLET}>
                  τyx = 25
                </text>
                <text x={176} y={134} textAnchor="end" fontSize={8.5} fill={GREEN}>
                  σy = −20
                </text>
                <text x={242} y={148} fontSize={9} fontWeight={600} fill={ORANGE}>
                  T(y)
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
                dwie trakcje na prostopadłych ściankach wystarczą w stanie płaskim
              </text>
            </g>
          )}

          {isTensor && (
            <g>
              <Cube opacity={0.5} />
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
              </motion.g>
              <TensorMatrix progress={p} />
            </g>
          )}

          {isPlane && <PlaneNormal progress={p} />}
          {isTraction && <PlaneTraction progress={p} />}
          {isDecomposition && <PlaneDecomposition progress={p} />}
          {isCheck && <PlaneCheck progress={p} />}

          {isTensor && (
            <text x={20} y={286} fontSize={9} fill={MUTED}>
              trzecia kolumna jest zerowa, bo stan jest płaski
            </text>
          )}
        </svg>
      </div>
    </div>
  )
}
