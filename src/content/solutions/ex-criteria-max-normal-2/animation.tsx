import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const BLUE = '#4f6df5'
const ORANGE = '#ff6b45'
const VIOLET = '#a970dd'
const MUTED = '#87929d'
const EDGE = '#68727e'
const INK = '#17202a'
const FILL = '#f3f6fc'
const LIGHT = '#c9d0d9'

const S1 = 25
const S2 = -10
const S3 = -160
const KR = 150
const KC = 600

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}
const decimal = (value: number, digits = 1) => value.toFixed(digits).replace('.', ',')

function Arrow({
  x1,
  y1,
  x2,
  y2,
  color,
  width = 2,
  opacity = 1,
}: {
  x1: number
  y1: number
  x2: number
  y2: number
  color: string
  width?: number
  opacity?: number
}) {
  const angle = Math.atan2(y2 - y1, x2 - x1)
  const length = Math.hypot(x2 - x1, y2 - y1)
  if (length < 0.6) return null
  const head = Math.min(5.4, length * 0.55)
  const wing = Math.min(2.7, length * 0.27)
  const baseX = x2 - head * Math.cos(angle)
  const baseY = y2 - head * Math.sin(angle)
  const lx = baseX - wing * Math.sin(angle)
  const ly = baseY + wing * Math.cos(angle)
  const rx = baseX + wing * Math.sin(angle)
  const ry = baseY - wing * Math.cos(angle)
  return (
    <g stroke={color} fill={color} opacity={opacity}>
      <line x1={x1} y1={y1} x2={baseX} y2={baseY} strokeWidth={width} strokeLinecap="round" />
      <polygon points={`${x2},${y2} ${lx},${ly} ${rx},${ry}`} stroke="none" />
    </g>
  )
}

function PrincipalCube({ mode }: { mode: 'all' | 'tension' | 'compression' | 'dim' }) {
  const tension = mode === 'all' || mode === 'tension' ? 1 : mode === 'dim' ? 0.45 : 0.22
  const compression = mode === 'all' || mode === 'compression' ? 1 : mode === 'dim' ? 0.45 : 0.22
  const base = mode === 'dim' ? 0.55 : 1
  const len1 = 10 + 24 * (Math.abs(S1) / 160)
  const len2 = 10 + 24 * (Math.abs(S2) / 160)
  const len3 = 10 + 24 * (Math.abs(S3) / 160)

  return (
    <g opacity={base}>
      <rect x={68} y={131} width={88} height={88} fill={FILL} stroke={EDGE} strokeWidth={1.4} />
      <path d="M68 131 L96 107 L184 107 L156 131 Z" fill="#edf1ff" stroke={EDGE} strokeWidth={1.4} />
      <path d="M156 131 L184 107 L184 195 L156 219 Z" fill="#f7f9fe" stroke={EDGE} strokeWidth={1.4} />

      <Arrow x1={184} y1={163} x2={184 + len1} y2={163} color={BLUE} opacity={tension} />
      <text x={184 + len1 + 4} y={166} fontSize={9} fontWeight={600} fill={BLUE} opacity={tension}>
        σ1 = 25
      </text>

      <Arrow x1={126} y1={119 - len2} x2={126} y2={119} color={ORANGE} opacity={compression} />
      <text
        x={126}
        y={119 - len2 - 6}
        textAnchor="middle"
        fontSize={9}
        fontWeight={600}
        fill={ORANGE}
        opacity={compression}
      >
        σ2 = −10
      </text>

      <Arrow
        x1={95 - len3 * 0.72}
        y1={204 + len3 * 0.69}
        x2={95}
        y2={204}
        color={ORANGE}
        opacity={compression}
        width={2.2}
      />
      <text
        x={95 - len3 * 0.72 - 3}
        y={204 + len3 * 0.69 + 12}
        textAnchor="middle"
        fontSize={9}
        fontWeight={600}
        fill={ORANGE}
        opacity={compression}
      >
        σ3 = −160
      </text>
      <text x={112} y={269} textAnchor="middle" fontSize={9} fill={MUTED}>
        naprężenia główne w punkcie
      </text>
    </g>
  )
}

function PrincipalAxis() {
  const x0 = 250
  const width = 150
  const y = 162
  const sx = (value: number) => x0 + ((value + 170) / 210) * width
  const markers = [
    { value: S3, label: 'σ3 = −160', color: ORANGE, above: true },
    { value: S2, label: 'σ2 = −10', color: MUTED, above: false },
    { value: S1, label: 'σ1 = 25', color: BLUE, above: true },
  ]
  return (
    <g>
      <text x={x0} y={82} fontSize={9} fill={MUTED}>
        porządek naprężeń głównych
      </text>
      <line x1={x0 - 4} y1={y} x2={x0 + width + 8} y2={y} stroke={LIGHT} strokeWidth={1.2} />
      <text x={x0 + width + 12} y={y + 3} fontSize={9} fill={MUTED}>
        σ
      </text>
      {markers.map((item) => {
        const x = sx(item.value)
        return (
          <g key={item.label}>
            <line x1={x} y1={y - 5} x2={x} y2={item.above ? y - 13 : y + 13} stroke={item.color} strokeWidth={1.2} />
            <circle cx={x} cy={y} r={3.8} fill={item.color} />
            <text
              x={x}
              y={item.above ? y - 18 : y + 26}
              textAnchor="middle"
              fontSize={9}
              fontWeight={600}
              fill={item.color}
            >
              {item.label}
            </text>
          </g>
        )
      })}
      <text x={x0} y={215} fontSize={9} fill={MUTED}>
        σ3 ≤ σ2 ≤ σ1
      </text>
      <text x={x0} y={232} fontSize={9} fill={MUTED}>
        σ2 i σ3 są ściskające
      </text>
    </g>
  )
}

function Gauge({
  y,
  label,
  actual,
  limit,
  safety,
  color,
  progress,
  active,
}: {
  y: number
  label: string
  actual: number
  limit: number
  safety: string
  color: string
  progress: number
  active: boolean
}) {
  const x = 240
  const width = 158
  const ratio = Math.min(1, actual / limit)
  const fillWidth = width * ratio * progress
  return (
    <g opacity={active ? 1 : 0.35}>
      <text x={x} y={y - 17} fontSize={9.5} fontWeight={600} fill={color}>
        {label}
      </text>
      <text x={x + width} y={y - 17} textAnchor="end" fontSize={9} fill={color}>
        n = {safety}
      </text>
      <rect x={x} y={y} width={width} height={13} rx={4} fill="#eef1f6" />
      <rect x={x} y={y} width={fillWidth} height={13} rx={4} fill={color} />
      <line
        x1={x + width}
        y1={y - 4}
        x2={x + width}
        y2={y + 17}
        stroke={color}
        strokeWidth={1.2}
        strokeDasharray="3 3"
      />
      <text x={x} y={y + 27} fontSize={8.5} fill={MUTED}>
        {actual} MPa
      </text>
      <text x={x + width} y={y + 27} textAnchor="end" fontSize={8.5} fill={MUTED}>
        granica {limit} MPa
      </text>
    </g>
  )
}

function ThresholdChart({ progress }: { progress: number }) {
  const x0 = 250
  const x1 = 442
  const y0 = 250
  const y1 = 96
  const maxSigma = 80
  const maxN = 7
  const sx = (value: number) => x0 + (value / maxSigma) * (x1 - x0)
  const sy = (value: number) => y0 - (Math.min(maxN, value) / maxN) * (y0 - y1)
  const currentSigma = S1 + (40 - S1) * progress
  const currentN = KR / currentSigma
  const currentX = sx(currentSigma)
  const currentY = sy(currentN)
  const crossX = sx(40)
  const crossY = sy(KC / Math.abs(S3))
  const curve = Array.from({ length: 31 }, (_, index) => {
    const sigma = 23 + (index / 30) * 57
    return `${index === 0 ? 'M' : 'L'}${sx(sigma).toFixed(1)} ${sy(KR / sigma).toFixed(1)}`
  }).join(' ')

  return (
    <g>
      <text x={x0} y={82} fontSize={9} fill={MUTED}>
        zapas w zależności od σ1
      </text>
      <line x1={x0} y1={y0} x2={x1 + 6} y2={y0} stroke={LIGHT} strokeWidth={1.2} />
      <line x1={x0} y1={y0} x2={x0} y2={y1 - 4} stroke={LIGHT} strokeWidth={1.2} />
      <text x={x1 + 10} y={y0 + 3} fontSize={9} fill={MUTED}>
        σ1
      </text>
      <text x={x0 - 12} y={y1} fontSize={9} fill={MUTED}>
        n
      </text>

      <path d={curve} fill="none" stroke={BLUE} strokeWidth={2} />
      <line x1={x0} y1={crossY} x2={x1} y2={crossY} stroke={ORANGE} strokeWidth={1.6} strokeDasharray="5 4" />
      <motion.circle
        cx={currentX}
        cy={currentY}
        r={4.2}
        fill={VIOLET}
        stroke="#fff"
        strokeWidth={1.2}
        initial={false}
        animate={{ cx: currentX, cy: currentY }}
        transition={{ duration: 0.12, ease: 'linear' }}
      />
      <line x1={crossX} y1={crossY} x2={crossX} y2={y0} stroke={MUTED} strokeWidth={1} strokeDasharray="3 3" />
      <circle cx={crossX} cy={crossY} r={3.6} fill={INK} />
      <text x={crossX} y={y0 + 16} textAnchor="middle" fontSize={9} fontWeight={600} fill={INK}>
        σ1 = 40
      </text>
      <text x={currentX + 7} y={currentY - 7} fontSize={9} fill={VIOLET}>
        {decimal(currentN, 2)}
      </text>
      <text x={x0 + 8} y={crossY - 6} fontSize={8.5} fill={ORANGE}>
        n_c = 3,75
      </text>
      <text x={x0} y={275} fontSize={8.5} fill={BLUE}>
        n_t = kr / σ1
      </text>
      <text x={x0 + 94} y={275} fontSize={8.5} fill={ORANGE}>
        n_c = const.
      </text>
      <text x={x0} y={290} fontSize={8.5} fill={MUTED}>
        przecięcie wyznacza próg σ1 = 40 MPa
      </text>
    </g>
  )
}

function ComparisonBars() {
  const x = 250
  const width = 150
  const maxN = 4.2
  const rows = [
    { label: 'maks. normalne', value: 3.75, color: ORANGE, y: 140, text: 'n = 3,75' },
    { label: 'HMH', value: 3.53, color: VIOLET, y: 205, text: 'n = 3,53' },
  ]
  const shortest = Math.min(...rows.map((row) => row.value))
  const shortestX = x + (shortest / maxN) * width

  return (
    <g>
      <text x={x} y={82} fontSize={9} fill={MUTED}>
        porównanie modeli
      </text>
      {rows.map((row) => {
        const length = (row.value / maxN) * width
        return (
          <g key={row.label}>
            <text x={x} y={row.y - 14} fontSize={9.5} fontWeight={600} fill={row.color}>
              {row.label}
            </text>
            <text x={x + width} y={row.y - 14} textAnchor="end" fontSize={9} fill={row.color}>
              {row.text}
            </text>
            <rect x={x} y={row.y} width={width} height={14} rx={4} fill="#eef1f6" />
            <rect x={x} y={row.y} width={length} height={14} rx={4} fill={row.color} />
            <line x1={x + width} y1={row.y - 4} x2={x + width} y2={row.y + 18} stroke={MUTED} strokeWidth={1} />
          </g>
        )
      })}
      <line x1={shortestX} y1={120} x2={shortestX} y2={232} stroke={VIOLET} strokeWidth={1} strokeDasharray="4 4" />
      <text x={shortestX - 5} y={250} textAnchor="end" fontSize={8.5} fill={VIOLET}>
        mniejszy zapas
      </text>
      <text x={x} y={270} fontSize={8.5} fill={MUTED}>
        σ_HMH = 170,2 MPa
      </text>
      <text x={x} y={285} fontSize={8.5} fill={MUTED}>
        różnica wyników jest niewielka
      </text>
    </g>
  )
}

export function MaxNormalExample2Animation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'state'
  const p = playing ? smooth(sceneProgress) : 1
  const cubeMode =
    metric === 'state' ? 'all' : metric === 'tension' ? 'tension' : metric === 'compression' ? 'compression' : 'dim'

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 300"
          role="img"
          aria-label="Przestrzenny stan naprężeń głównych i sprawdzenie hipotezy maksimum normalnego dla żeliwnego elementu"
        >
          <text x={14} y={20} fontSize={9} fill={MUTED}>
            σ1 = 25 MPa · σ2 = −10 MPa · σ3 = −160 MPa
          </text>
          <text x={14} y={34} fontSize={9} fill={MUTED}>
            kr = 150 MPa · kc = 600 MPa
          </text>

          <PrincipalCube mode={cubeMode} />

          {metric === 'state' && <PrincipalAxis />}

          {(metric === 'tension' || metric === 'compression') && (
            <g>
              <text x={240} y={82} fontSize={9} fill={MUTED}>
                sprawdzenie kryterium
              </text>
              <Gauge
                y={128}
                label="rozciąganie: σ1"
                actual={S1}
                limit={KR}
                safety="6,0"
                color={BLUE}
                progress={p}
                active={metric === 'tension'}
              />
              <Gauge
                y={205}
                label="ściskanie: |σ3|"
                actual={Math.abs(S3)}
                limit={KC}
                safety="3,75"
                color={ORANGE}
                progress={p}
                active={metric === 'compression'}
              />
              {metric === 'compression' && (
                <g>
                  <circle cx={245} cy={250} r={3} fill={ORANGE} />
                  <text x={253} y={253} fontSize={9} fontWeight={600} fill={INK}>
                    o wyniku decyduje ściskanie
                  </text>
                </g>
              )}
            </g>
          )}

          {metric === 'threshold' && <ThresholdChart progress={p} />}
          {metric === 'compare' && <ComparisonBars />}
        </svg>
      </div>
    </div>
  )
}
