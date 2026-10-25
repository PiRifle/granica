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
const OK = '#2e9e6b'

const CX = 128
const CY = 178
const W = 96
const H = 96
const DX = 34
const DY = -30
const EXAG = 140
const VOL_EXAG = 130

const EPS_X = 0.00075
const EPS_Y = -0.000225
const EPS_Z = -0.000225
const THETA = 0.0003
const P = 50
const STRAIN = 0.0003

type Point = [number, number]

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}
const mid = (a: Point, b: Point): Point => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]
const pts = (points: Point[]) => points.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ')

function geometry(sx: number, sy: number, sz: number) {
  const w = W * sx
  const h = H * sz
  const dx = DX * sy
  const dy = DY * sy
  const front: Point[] = [
    [CX - w / 2, CY + h / 2],
    [CX + w / 2, CY + h / 2],
    [CX + w / 2, CY - h / 2],
    [CX - w / 2, CY - h / 2],
  ]
  const back = front.map(([x, y]) => [x + dx, y + dy] as Point)
  return {
    front,
    back,
    top: [front[3], front[2], back[2], back[3]] as Point[],
    right: [front[1], front[2], back[2], back[1]] as Point[],
    w,
    h,
    dx,
    dy,
  }
}

function Cube({ sx, sy, sz }: { sx: number; sy: number; sz: number }) {
  const g = geometry(sx, sy, sz)
  const o = geometry(1, 1, 1)
  const bottom = mid(g.front[0], g.front[1])
  const left = mid(g.front[0], g.front[3])
  const depth = mid(g.front[1], g.back[1])

  return (
    <g>
      <polygon points={pts(o.top)} fill="none" stroke={MUTED} strokeWidth={1} strokeDasharray="5 4" opacity={0.5} />
      <polygon points={pts(o.right)} fill="none" stroke={MUTED} strokeWidth={1} strokeDasharray="5 4" opacity={0.5} />
      <polygon points={pts(o.front)} fill="none" stroke={MUTED} strokeWidth={1} strokeDasharray="5 4" opacity={0.65} />

      <polygon points={pts(g.top)} fill="#eef2ff" stroke={EDGE} strokeWidth={1.3} />
      <polygon points={pts(g.right)} fill="#e8edf8" stroke={EDGE} strokeWidth={1.3} />
      <polygon points={pts(g.front)} fill="#f6f8fd" stroke={EDGE} strokeWidth={1.6} />

      <line
        x1={g.front[0][0]}
        y1={g.front[0][1]}
        x2={g.front[1][0]}
        y2={g.front[1][1]}
        stroke={BLUE}
        strokeWidth={2.2}
      />
      <line
        x1={g.front[0][0]}
        y1={g.front[0][1]}
        x2={g.front[3][0]}
        y2={g.front[3][1]}
        stroke={ORANGE}
        strokeWidth={2.2}
      />
      <line
        x1={g.front[1][0]}
        y1={g.front[1][1]}
        x2={g.back[1][0]}
        y2={g.back[1][1]}
        stroke={GREEN}
        strokeWidth={2.2}
      />

      <text x={bottom[0]} y={bottom[1] + 13} textAnchor="middle" fontSize={8.5} fontWeight={600} fill={BLUE}>
        x
      </text>
      <text x={left[0] - 8} y={left[1] + 3} textAnchor="end" fontSize={8.5} fontWeight={600} fill={ORANGE}>
        z
      </text>
      <text x={depth[0] + 6} y={depth[1] - 3} fontSize={8.5} fontWeight={600} fill={GREEN}>
        y
      </text>
    </g>
  )
}

function Arrow({
  x1,
  y1,
  x2,
  y2,
  marker,
  amount = 1,
  width = 2.4,
}: {
  x1: number
  y1: number
  x2: number
  y2: number
  marker: string
  amount?: number
  width?: number
}) {
  const t = clamp01(amount)
  if (t < 0.02) return null
  const ex = x1 + (x2 - x1) * t
  const ey = y1 + (y2 - y1) * t
  return (
    <line
      x1={x1}
      y1={y1}
      x2={ex}
      y2={ey}
      stroke={marker === 'sv2-blue' ? BLUE : marker === 'sv2-orange' ? ORANGE : GREEN}
      strokeWidth={width}
      strokeLinecap="round"
      markerEnd={`url(#${marker})`}
    />
  )
}

function TensionArrows({ sx, sy, sz, draw }: { sx: number; sy: number; sz: number; draw: number }) {
  const g = geometry(sx, sy, sz)
  const left = g.front[0][0]
  const right = g.front[1][0]
  const top = g.front[3][1]
  const yMid = CY + g.h * 0.1

  return (
    <g>
      <Arrow x1={left - 8} y1={yMid} x2={left - 46} y2={yMid} marker="sv2-blue" amount={draw} />
      <Arrow x1={right + 8} y1={yMid} x2={right + 46} y2={yMid} marker="sv2-blue" amount={draw} />
      <text x={left - 46} y={yMid - 6} fontSize={8.5} fill={BLUE}>
        σx = 150
      </text>
      <text x={right + 46} y={yMid - 6} textAnchor="end" fontSize={8.5} fill={BLUE}>
        σx = 150
      </text>
      <text x={left - 8} y={top - 12} textAnchor="end" fontSize={8.5} fill={MUTED}>
        σz = 0
      </text>
      <text x={right + 8} y={top + 12} fontSize={8.5} fill={MUTED}>
        σy = 0
      </text>
    </g>
  )
}

function StrainLabels({ sx, sy, sz, draw }: { sx: number; sy: number; sz: number; draw: number }) {
  const g = geometry(sx, sy, sz)
  const bottom = mid(g.front[0], g.front[1])
  const left = mid(g.front[0], g.front[3])
  const depth = mid(g.front[1], g.back[1])
  const opacity = 0.35 + 0.65 * draw

  return (
    <g opacity={opacity}>
      <text x={bottom[0]} y={bottom[1] + 25} textAnchor="middle" fontSize={8.5} fill={BLUE}>
        εx = 750 με
      </text>
      <text x={left[0] - 7} y={left[1] + 22} textAnchor="end" fontSize={8.5} fill={ORANGE}>
        εz = −225 με
      </text>
      <text x={depth[0] + 6} y={depth[1] + 11} fontSize={8.5} fill={GREEN}>
        εy = −225 με
      </text>
    </g>
  )
}

function PanelTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <g>
      <text x={252} y={50} fontSize={10} fontWeight={700} fill={INK}>
        {title}
      </text>
      <text x={252} y={64} fontSize={8} fill={MUTED}>
        {subtitle}
      </text>
    </g>
  )
}

function TraceBars({ draw }: { draw: number }) {
  const rows = [
    { label: 'εx', value: EPS_X, display: '750 με', color: BLUE, y: 86 },
    { label: 'εy', value: EPS_Y, display: '−225 με', color: GREEN, y: 116 },
    { label: 'εz', value: EPS_Z, display: '−225 με', color: ORANGE, y: 146 },
  ]
  const zeroX = 338
  const span = 76
  const max = 0.00075
  const totalY = 190

  return (
    <g>
      <PanelTitle title="ślad tensora" subtitle="suma trzech odkształceń normalnych" />
      <line x1={zeroX} y1={74} x2={zeroX} y2={214} stroke={MUTED} strokeWidth={1} opacity={0.7} />
      {rows.map((row) => {
        const width = (Math.abs(row.value) / max) * span * draw
        const x = row.value < 0 ? zeroX - width : zeroX
        return (
          <g key={row.label}>
            <text x={252} y={row.y + 12} fontSize={9} fontWeight={600} fill={row.color}>
              {row.label}
            </text>
            <motion.rect
              x={x}
              y={row.y}
              width={width}
              height={16}
              rx={3}
              fill={row.color}
              initial={false}
              animate={{ x, width }}
              transition={{ duration: 0.12, ease: 'linear' }}
              opacity={0.85}
            />
            <text
              x={row.value < 0 ? x - 5 : x + width + 5}
              y={row.y + 12}
              textAnchor={row.value < 0 ? 'end' : 'start'}
              fontSize={8.5}
              fill={MUTED}
            >
              {row.display}
            </text>
          </g>
        )
      })}
      <line x1={252} y1={172} x2={438} y2={172} stroke={EDGE} strokeWidth={1} opacity={0.35} />
      <text x={252} y={totalY + 12} fontSize={9} fontWeight={700} fill={VIOLET}>
        θ
      </text>
      <motion.rect
        x={zeroX}
        y={totalY}
        width={(THETA / max) * span * draw}
        height={16}
        rx={3}
        fill={VIOLET}
        initial={false}
        animate={{ width: (THETA / max) * span * draw }}
        transition={{ duration: 0.12, ease: 'linear' }}
        opacity={0.9}
      />
      <text x={zeroX + (THETA / max) * span * draw + 5} y={totalY + 12} fontSize={8.5} fill={VIOLET}>
        300 με
      </text>
    </g>
  )
}

function VolumeGauge({ draw }: { draw: number }) {
  const scale = 1 + THETA * VOL_EXAG * draw
  const side = 92 * scale
  const base = 92
  const cx = 344
  const cy = 144

  return (
    <g>
      <PanelTitle title="zmiana objętości" subtitle="wydłużenie osiowe przewyższa skurcz poprzeczny" />
      <rect
        x={cx - base / 2}
        y={cy - base / 2}
        width={base}
        height={base}
        fill="none"
        stroke={MUTED}
        strokeWidth={1.2}
        strokeDasharray="5 4"
      />
      <motion.rect
        x={cx - side / 2}
        y={cy - side / 2}
        width={side}
        height={side}
        rx={2}
        fill={BLUE}
        fillOpacity={0.13}
        stroke={BLUE}
        strokeWidth={2}
        initial={false}
        animate={{ width: side, height: side }}
        transition={{ duration: 0.12, ease: 'linear' }}
      />
      <text x={cx - base / 2 - 6} y={cy - base / 2 - 5} textAnchor="end" fontSize={8.5} fill={MUTED}>
        V₀
      </text>
      <text x={cx + side / 2 + 5} y={cy - side / 2 - 5} fontSize={8.5} fill={BLUE}>
        V
      </text>
      <text x={cx} y={cy + base / 2 + 22} textAnchor="middle" fontSize={9} fontWeight={600} fill={BLUE}>
        ΔV/V₀ = +0,0003
      </text>
      <text x={cx} y={cy + base / 2 + 34} textAnchor="middle" fontSize={8} fill={MUTED}>
        czyli +0,03 %
      </text>
      <text x={cx} y={cy + base / 2 + 49} textAnchor="middle" fontSize={7.5} fill={MUTED}>
        zmiana na rysunku powiększona
      </text>
    </g>
  )
}

function BulkPlot({ draw }: { draw: number }) {
  const plot = { x: 288, y: 208, w: 142, h: 106 }
  const strainMax = 0.0006
  const pMax = 120
  const px = plot.x + (STRAIN / strainMax) * plot.w
  const py = plot.y - (P / pMax) * plot.h

  return (
    <g>
      <PanelTitle title="kontrola przez moduł K" subtitle="średnie naprężenie rozciągające" />
      <line x1={plot.x} y1={plot.y} x2={plot.x + plot.w + 6} y2={plot.y} stroke={MUTED} strokeWidth={1.1} />
      <line x1={plot.x} y1={plot.y} x2={plot.x} y2={plot.y - plot.h - 6} stroke={MUTED} strokeWidth={1.1} />
      {[0, 0.2, 0.4, 0.6].map((tick) => (
        <g key={`tick-${tick}`}>
          <line
            x1={plot.x + (tick / 0.6) * plot.w}
            y1={plot.y}
            x2={plot.x + (tick / 0.6) * plot.w}
            y2={plot.y + 4}
            stroke={MUTED}
            strokeWidth={1}
          />
          <text x={plot.x + (tick / 0.6) * plot.w} y={plot.y + 14} textAnchor="middle" fontSize={7.5} fill={MUTED}>
            {tick.toFixed(1)}
          </text>
        </g>
      ))}
      {[0, 50, 100].map((tick) => (
        <g key={`p-tick-${tick}`}>
          <line
            x1={plot.x - 4}
            y1={plot.y - (tick / pMax) * plot.h}
            x2={plot.x}
            y2={plot.y - (tick / pMax) * plot.h}
            stroke={MUTED}
            strokeWidth={1}
          />
          <text x={plot.x - 7} y={plot.y - (tick / pMax) * plot.h + 3} textAnchor="end" fontSize={7.5} fill={MUTED}>
            {tick}
          </text>
        </g>
      ))}
      <text x={plot.x + plot.w / 2} y={plot.y + 28} textAnchor="middle" fontSize={8} fill={MUTED}>
        ΔV/V₀ [10⁻³]
      </text>
      <text
        x={plot.x - 24}
        y={plot.y - plot.h / 2}
        textAnchor="middle"
        fontSize={8}
        fill={MUTED}
        transform={`rotate(-90 ${plot.x - 24} ${plot.y - plot.h / 2})`}
      >
        |p| [MPa]
      </text>
      <motion.line
        x1={plot.x}
        y1={plot.y}
        x2={px}
        y2={py}
        stroke={VIOLET}
        strokeWidth={2.4}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: draw }}
        transition={{ duration: 0.15, ease: 'linear' }}
      />
      <line
        x1={px}
        y1={plot.y}
        x2={px}
        y2={py}
        stroke={MUTED}
        strokeWidth={1}
        strokeDasharray="3 3"
        opacity={0.7 * draw}
      />
      <line
        x1={plot.x}
        y1={py}
        x2={px}
        y2={py}
        stroke={MUTED}
        strokeWidth={1}
        strokeDasharray="3 3"
        opacity={0.7 * draw}
      />
      <motion.circle
        cx={px}
        cy={py}
        r={4}
        fill={VIOLET}
        initial={{ opacity: 0 }}
        animate={{ opacity: draw > 0.55 ? 1 : 0 }}
      />
      <text x={px + 7} y={py - 5} fontSize={8.5} fontWeight={600} fill={VIOLET}>
        |p| = 50 MPa
      </text>
      <text x={px + 7} y={py + 8} fontSize={8} fill={MUTED}>
        0,30·10⁻³
      </text>
      <text x={plot.x + 34} y={plot.y - 45} fontSize={9} fontWeight={700} fill={VIOLET}>
        K
      </text>
    </g>
  )
}

function CompareBars({ draw }: { draw: number }) {
  const x0 = 286
  const maxWidth = 132
  const rows = [
    { label: 'εx — wydłużenie', value: 750, color: BLUE, y: 96 },
    { label: 'θ — dylatacja', value: 300, color: VIOLET, y: 150 },
  ]

  return (
    <g>
      <PanelTitle title="długość a objętość" subtitle="dylatacja to nie to samo co wydłużenie" />
      {rows.map((row) => {
        const width = (row.value / 750) * maxWidth * draw
        return (
          <g key={row.label}>
            <text x={252} y={row.y - 7} fontSize={8.5} fill={row.color}>
              {row.label}
            </text>
            <motion.rect
              x={x0}
              y={row.y}
              width={width}
              height={18}
              rx={3}
              fill={row.color}
              initial={false}
              animate={{ width }}
              transition={{ duration: 0.12, ease: 'linear' }}
              opacity={0.85}
            />
            <text x={x0 + width + 5} y={row.y + 13} fontSize={8.5} fill={MUTED}>
              {row.value} με
            </text>
          </g>
        )
      })}
      <line x1={252} y1={198} x2={438} y2={198} stroke={EDGE} strokeWidth={1} opacity={0.35} />
      <text x={252} y={218} fontSize={8.5} fill={MUTED}>
        750 − 225 − 225 = 300 με
      </text>
      <text x={252} y={234} fontSize={8} fill={MUTED}>
        dwie średnie kurczą się, ale objętość rośnie
      </text>
      <motion.circle
        cx={410}
        cy={82}
        r={13}
        fill={OK}
        fillOpacity={0.12}
        stroke={OK}
        strokeWidth={1.5}
        initial={{ opacity: 0 }}
        animate={{ opacity: draw > 0.5 ? 1 : 0 }}
      />
      <motion.path
        d="M 404 82 L 409 87 L 417 77"
        fill="none"
        stroke={OK}
        strokeWidth={2.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: draw }}
      />
    </g>
  )
}

export function StrainStateVolumeExample2Animation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const p = playing ? clamp01(sceneProgress) : 1
  const draw = smooth(p)
  const deform = metric === 'model' ? 0 : smooth(clamp01((p - 0.05) / 0.6))
  const sx = 1 + EPS_X * EXAG * deform
  const sy = 1 + EPS_Y * EXAG * deform
  const sz = 1 + EPS_Z * EXAG * deform

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg viewBox="0 0 460 320" role="img" aria-label="Kostka rozciągana jednoosiowo i jej ślad odkształcenia">
          <defs>
            <marker
              id="sv2-blue"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={BLUE} />
            </marker>
            <marker
              id="sv2-orange"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={ORANGE} />
            </marker>
            <marker
              id="sv2-green"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={GREEN} />
            </marker>
          </defs>

          <text x={12} y={20} fontSize={10} fontWeight={700} fill={INK}>
            rozciąganie jednoosiowe
          </text>
          <text x={12} y={35} fontSize={8.5} fill={MUTED}>
            σx = 150 MPa · σy = σz = 0 · E = 200 GPa · ν = 0,30
          </text>

          <Cube sx={sx} sy={sy} sz={sz} />

          {metric === 'model' && <TensionArrows sx={sx} sy={sy} sz={sz} draw={draw} />}
          {metric === 'strain' && <StrainLabels sx={sx} sy={sy} sz={sz} draw={draw} />}
          {metric === 'trace' && <TraceBars draw={draw} />}
          {metric === 'volume' && <VolumeGauge draw={draw} />}
          {metric === 'bulk' && <BulkPlot draw={draw} />}
          {metric === 'check' && <CompareBars draw={draw} />}

          <text x={12} y={302} fontSize={8} fill={MUTED}>
            {metric === 'model'
              ? 'wydłużenie w kierunku x i swobodny skurcz poprzeczny'
              : metric === 'strain'
                ? 'jedna krawędź się wydłuża, dwie pozostałe się skracają'
                : metric === 'trace'
                  ? 'dodatni ślad oznacza wzrost objętości'
                  : metric === 'volume'
                    ? 'objętość rośnie, mimo ujemnych odkształceń poprzecznych'
                    : metric === 'check'
                      ? 'zmiana długości jest większa niż względna zmiana objętości'
                      : 'odkształcenia na rysunku są powiększone'}
          </text>
        </svg>
      </div>
    </div>
  )
}
