import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const SHEAR = '#ff6b45'
const MUTED = '#87929d'
const INK = '#17202a'
const OK = '#2e9e6b'
const MOHR = '#a970dd'
const CRACK = '#d64545'

const ARROW_SHEAR = 'ss2-arrow-shear'
const ARROW_ACCENT = 'ss2-arrow-accent'

const EX = 128
const EY = 160
const HALF = 50
const SHEAR_PX = 25

const PLOT = { x: 292, y: 252, w: 124, h: 92 }
const GAMMA_MAX = 0.0015
const TAU_MAX = 45

const TAU = 32.4
const GAMMA = 0.0012
const E_MOD = 71.82
const G_MOD = 27

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}

function ShearSquare({ shear, draw, crack = false }: { shear: number; draw: number; crack?: boolean }) {
  const x0 = EX - HALF
  const x1 = EX + HALF
  const y0 = EY - HALF
  const y1 = EY + HALF
  const tl = [x0 + shear, y0]
  const tr = [x1 + shear, y0]
  const br = [x1 - shear, y1]
  const bl = [x0 - shear, y1]
  const points = [tl, tr, br, bl].map(([x, y]) => `${x},${y}`).join(' ')

  const length = Math.hypot(2 * shear, 2 * HALF)
  const ux = (2 * shear) / length
  const uy = (-2 * HALF) / length
  const radius = 25
  const arcStart = [bl[0], bl[1] - radius]
  const arcEnd = [bl[0] + radius * ux, bl[1] + radius * uy]

  return (
    <g>
      <rect
        x={x0}
        y={y0}
        width={2 * HALF}
        height={2 * HALF}
        fill="none"
        stroke={MUTED}
        strokeWidth={1.1}
        strokeDasharray="5 4"
        opacity={0.55}
      />
      <motion.polygon
        points={points}
        fill={ACCENT}
        stroke={ACCENT}
        strokeWidth={2}
        initial={false}
        animate={{ fillOpacity: 0.1 + 0.08 * draw }}
      />

      <line
        x1={EX + shear - 30}
        y1={y0 - 13}
        x2={EX + shear + 30}
        y2={y0 - 13}
        stroke={SHEAR}
        strokeWidth={2}
        markerEnd={`url(#${ARROW_SHEAR})`}
      />
      <line
        x1={EX - shear + 30}
        y1={y1 + 13}
        x2={EX - shear - 30}
        y2={y1 + 13}
        stroke={SHEAR}
        strokeWidth={2}
        markerEnd={`url(#${ARROW_SHEAR})`}
      />
      <line
        x1={x1 + 15}
        y1={EY + 28}
        x2={x1 + 15}
        y2={EY - 28}
        stroke={SHEAR}
        strokeWidth={2}
        markerEnd={`url(#${ARROW_SHEAR})`}
      />
      <line
        x1={x0 - 15}
        y1={EY - 28}
        x2={x0 - 15}
        y2={EY + 28}
        stroke={SHEAR}
        strokeWidth={2}
        markerEnd={`url(#${ARROW_SHEAR})`}
      />

      <path
        d={`M ${arcStart[0]} ${arcStart[1]} A ${radius} ${radius} 0 0 1 ${arcEnd[0]} ${arcEnd[1]}`}
        fill="none"
        stroke={SHEAR}
        strokeWidth={1.6}
      />
      <text x={bl[0] + 32} y={bl[1] - 8} fontSize={10} fontWeight={700} fill={SHEAR}>
        γ
      </text>
      <text x={EX + shear + 37} y={y0 - 16} fontSize={10} fontWeight={700} fill={SHEAR}>
        τ
      </text>

      {crack && (
        <motion.line
          x1={EX - 38}
          y1={EY + 38}
          x2={EX + 38}
          y2={EY - 38}
          stroke={CRACK}
          strokeWidth={2.6}
          strokeDasharray="6 4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: draw }}
        />
      )}
    </g>
  )
}

function PrincipalElement({ draw }: { draw: number }) {
  const r = 60
  const top = [EX, EY - r]
  const right = [EX + r, EY]
  const bottom = [EX, EY + r]
  const left = [EX - r, EY]
  const points = [top, right, bottom, left].map(([x, y]) => `${x},${y}`).join(' ')
  const n = 1 / Math.SQRT2
  const length = 34 * draw

  const tensionA = [EX + r / 2, EY - r / 2]
  const tensionB = [EX - r / 2, EY + r / 2]
  const compressionA = [EX - r / 2, EY - r / 2]
  const compressionB = [EX + r / 2, EY + r / 2]

  return (
    <g>
      <motion.polygon
        points={points}
        fill={MOHR}
        fillOpacity={0.13}
        stroke={MOHR}
        strokeWidth={2}
        initial={false}
        animate={{ opacity: 0.4 + 0.6 * draw }}
      />
      <line
        x1={tensionA[0]}
        y1={tensionA[1]}
        x2={tensionA[0] + length * n}
        y2={tensionA[1] - length * n}
        stroke={SHEAR}
        strokeWidth={2.2}
        markerEnd={`url(#${ARROW_SHEAR})`}
      />
      <line
        x1={tensionB[0]}
        y1={tensionB[1]}
        x2={tensionB[0] - length * n}
        y2={tensionB[1] + length * n}
        stroke={SHEAR}
        strokeWidth={2.2}
        markerEnd={`url(#${ARROW_SHEAR})`}
      />
      <line
        x1={compressionA[0] - length * n}
        y1={compressionA[1] - length * n}
        x2={compressionA[0]}
        y2={compressionA[1]}
        stroke={ACCENT}
        strokeWidth={2.2}
        markerEnd={`url(#${ARROW_ACCENT})`}
      />
      <line
        x1={compressionB[0] + length * n}
        y1={compressionB[1] + length * n}
        x2={compressionB[0]}
        y2={compressionB[1]}
        stroke={ACCENT}
        strokeWidth={2.2}
        markerEnd={`url(#${ARROW_ACCENT})`}
      />
      <text x={EX + r / 2 + 30} y={EY - r / 2 - 24} fontSize={9} fill={SHEAR}>
        σ₁ = +32,4 MPa
      </text>
      <text x={EX - r / 2 - 30} y={EY + r / 2 + 34} fontSize={9} fill={SHEAR} textAnchor="end">
        σ₁ = +32,4 MPa
      </text>
      <text x={EX - r / 2 - 28} y={EY - r / 2 - 24} fontSize={9} fill={ACCENT} textAnchor="end">
        σ₂ = −32,4 MPa
      </text>
      <text x={EX + r / 2 + 28} y={EY + r / 2 + 34} fontSize={9} fill={ACCENT}>
        σ₂ = −32,4 MPa
      </text>
      <text x={EX} y={EY + 4} textAnchor="middle" fontSize={9} fill={MUTED}>
        płaszczyzny główne
      </text>
    </g>
  )
}

function TauGammaPlot({ draw, measured = false }: { draw: number; measured?: boolean }) {
  const px = PLOT.x + (GAMMA / GAMMA_MAX) * PLOT.w
  const py = PLOT.y - (TAU / TAU_MAX) * PLOT.h

  return (
    <g>
      <text x={PLOT.x} y={PLOT.y - PLOT.h - 27} fontSize={9.5} fontWeight={700} fill={INK}>
        {measured ? 'pomiar odkształcenia' : 'prawo Hooke’a dla ścinania'}
      </text>
      <line x1={PLOT.x} y1={PLOT.y} x2={PLOT.x + PLOT.w + 8} y2={PLOT.y} stroke={MUTED} strokeWidth={1.2} />
      <line x1={PLOT.x} y1={PLOT.y} x2={PLOT.x} y2={PLOT.y - PLOT.h - 8} stroke={MUTED} strokeWidth={1.2} />
      <text x={PLOT.x + PLOT.w / 2} y={PLOT.y + 14} textAnchor="middle" fontSize={8} fill={MUTED}>
        γ [rad]
      </text>
      <text
        x={PLOT.x - 8}
        y={PLOT.y - PLOT.h / 2}
        textAnchor="middle"
        fontSize={8}
        fill={MUTED}
        transform={`rotate(-90 ${PLOT.x - 8} ${PLOT.y - PLOT.h / 2})`}
      >
        τ [MPa]
      </text>

      <line
        x1={px}
        y1={PLOT.y}
        x2={px}
        y2={PLOT.y - PLOT.h}
        stroke={SHEAR}
        strokeWidth={1.4}
        strokeDasharray="4 4"
        opacity={0.85 * draw}
      />
      <text x={px - 6} y={PLOT.y - 8} textAnchor="end" fontSize={8} fill={SHEAR}>
        γ = 0,0012 rad
      </text>

      {!measured && (
        <>
          <motion.line
            x1={PLOT.x}
            y1={PLOT.y}
            x2={px}
            y2={py}
            stroke={ACCENT}
            strokeWidth={2.2}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: draw }}
          />
          <line
            x1={PLOT.x}
            y1={PLOT.y}
            x2={px}
            y2={PLOT.y}
            stroke={MUTED}
            strokeWidth={1}
            strokeDasharray="3 3"
            opacity={0.75 * draw}
          />
          <line
            x1={px}
            y1={PLOT.y}
            x2={px}
            y2={py}
            stroke={MUTED}
            strokeWidth={1}
            strokeDasharray="3 3"
            opacity={0.75 * draw}
          />
          <motion.circle
            cx={px}
            cy={py}
            r={4}
            fill={ACCENT}
            initial={{ opacity: 0 }}
            animate={{ opacity: draw > 0.55 ? 1 : 0 }}
          />
          <text x={px - 8} y={py - 5} textAnchor="end" fontSize={8.5} fontWeight={700} fill={ACCENT}>
            τ = 32,4 MPa
          </text>
          <text x={px - 8} y={py + 9} textAnchor="end" fontSize={8} fill={MUTED}>
            nachylenie G = 27 GPa
          </text>
        </>
      )}
    </g>
  )
}

function MaterialBars({ draw }: { draw: number }) {
  const width = 116
  return (
    <g>
      <text x={PLOT.x} y={62} fontSize={9.5} fontWeight={700} fill={INK}>
        stałe materiału
      </text>
      <text x={PLOT.x} y={82} fontSize={8.5} fill={MUTED}>
        E = 71,82 GPa
      </text>
      <rect x={PLOT.x} y={88} width={width} height={8} rx={4} fill={MUTED} fillOpacity={0.2} />
      <motion.rect
        x={PLOT.x}
        y={88}
        height={8}
        rx={4}
        fill={ACCENT}
        initial={{ width: 0 }}
        animate={{ width: width * draw }}
      />
      <text x={PLOT.x} y={122} fontSize={8.5} fill={MUTED}>
        G = 27 GPa
      </text>
      <rect x={PLOT.x} y={128} width={width} height={8} rx={4} fill={MUTED} fillOpacity={0.2} />
      <motion.rect
        x={PLOT.x}
        y={128}
        height={8}
        rx={4}
        fill={SHEAR}
        initial={{ width: 0 }}
        animate={{ width: width * (G_MOD / E_MOD) * draw }}
      />
      <text x={PLOT.x} y={160} fontSize={9} fill={INK}>
        E = 2G(1 + ν)
      </text>
      <text x={PLOT.x} y={176} fontSize={8.5} fill={MUTED}>
        2 · 27 · 1,33 = 71,82 GPa
      </text>
      <text x={PLOT.x} y={192} fontSize={8.5} fill={OK}>
        typowe dla stopów aluminium
      </text>
      <text x={PLOT.x} y={208} fontSize={8} fill={MUTED}>
        G ≈ 0,376 E
      </text>
    </g>
  )
}

function MohrCircle({ draw, highlight = false }: { draw: number; highlight?: boolean }) {
  const cx = 362
  const cy = 158
  const r = 50
  return (
    <g>
      <text x={cx} y={56} textAnchor="middle" fontSize={9.5} fontWeight={700} fill={INK}>
        koło Mohra
      </text>
      <line x1={cx - r - 18} y1={cy} x2={cx + r + 18} y2={cy} stroke={MUTED} strokeWidth={1.2} />
      <line x1={cx} y1={cy - r - 18} x2={cx} y2={cy + r + 18} stroke={MUTED} strokeWidth={1.2} />
      <text x={cx + r + 16} y={cy - 5} textAnchor="end" fontSize={8} fill={MUTED}>
        σ
      </text>
      <text x={cx + 5} y={cy - r - 10} fontSize={8} fill={MUTED}>
        τ
      </text>
      <motion.circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke={MOHR}
        strokeWidth={2}
        initial={{ pathLength: 0, opacity: 0.3 }}
        animate={{ pathLength: draw, opacity: 1 }}
      />
      <circle cx={cx} cy={cy - r} r={3.5} fill={SHEAR} />
      <circle cx={cx} cy={cy + r} r={3.5} fill={SHEAR} />
      <circle cx={cx + r} cy={cy} r={highlight ? 5 : 3.5} fill={highlight ? CRACK : ACCENT} />
      <circle cx={cx - r} cy={cy} r={3.5} fill={ACCENT} />
      <text x={cx + 7} y={cy - r + 4} fontSize={8} fill={SHEAR}>
        +τ
      </text>
      <text x={cx + 7} y={cy + r - 1} fontSize={8} fill={SHEAR}>
        −τ
      </text>
      <text x={cx + r + 2} y={cy - 5} fontSize={8} fill={highlight ? CRACK : ACCENT} textAnchor="end">
        σ₁ = +32,4
      </text>
      <text x={cx - r - 2} y={cy - 5} fontSize={8} fill={ACCENT} textAnchor="end">
        σ₂ = −32,4
      </text>
      <circle cx={cx} cy={cy} r={3} fill={MUTED} />
      <text x={cx} y={cy + r + 17} textAnchor="middle" fontSize={8} fill={MUTED}>
        C = 0, R = τ
      </text>
      <text x={cx} y={cy + r + 31} textAnchor="middle" fontSize={8} fill={highlight ? CRACK : MUTED}>
        {highlight ? 'sprawdź σ₁, nie tylko τ' : 'kąt 90° na kole = 45° w materiale'}
      </text>
    </g>
  )
}

function LimitPlot({ draw }: { draw: number }) {
  const kneeX = PLOT.x + (0.0013 / GAMMA_MAX) * PLOT.w
  const kneeY = PLOT.y - (37 / TAU_MAX) * PLOT.h
  const endX = PLOT.x + PLOT.w
  const endY = PLOT.y - (41 / TAU_MAX) * PLOT.h
  const px = PLOT.x + (GAMMA / GAMMA_MAX) * PLOT.w
  const py = PLOT.y - (TAU / TAU_MAX) * PLOT.h

  return (
    <g>
      <text x={PLOT.x} y={PLOT.y - PLOT.h - 27} fontSize={9.5} fontWeight={700} fill={INK}>
        zakres sprężysty
      </text>
      <line x1={PLOT.x} y1={PLOT.y} x2={PLOT.x + PLOT.w + 8} y2={PLOT.y} stroke={MUTED} strokeWidth={1.2} />
      <line x1={PLOT.x} y1={PLOT.y} x2={PLOT.x} y2={PLOT.y - PLOT.h - 8} stroke={MUTED} strokeWidth={1.2} />
      <motion.line
        x1={PLOT.x}
        y1={PLOT.y}
        x2={kneeX}
        y2={kneeY}
        stroke={ACCENT}
        strokeWidth={2.2}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: draw }}
      />
      <motion.path
        d={`M ${kneeX} ${kneeY} Q ${(kneeX + endX) / 2 + 8} ${kneeY - 5} ${endX} ${endY}`}
        fill="none"
        stroke={SHEAR}
        strokeWidth={2.2}
        strokeDasharray="5 4"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: draw }}
      />
      <line
        x1={PLOT.x}
        y1={kneeY}
        x2={endX}
        y2={kneeY}
        stroke={SHEAR}
        strokeWidth={1}
        strokeDasharray="3 3"
        opacity={0.6}
      />
      <circle cx={px} cy={py} r={4} fill={ACCENT} />
      <text x={px + 7} y={py + 3} fontSize={8.5} fontWeight={700} fill={ACCENT}>
        τ = 32,4
      </text>
      <text x={PLOT.x + PLOT.w / 2} y={PLOT.y + 14} textAnchor="middle" fontSize={8} fill={MUTED}>
        γ [rad]
      </text>
      <text
        x={PLOT.x - 8}
        y={PLOT.y - PLOT.h / 2}
        textAnchor="middle"
        fontSize={8}
        fill={MUTED}
        transform={`rotate(-90 ${PLOT.x - 8} ${PLOT.y - PLOT.h / 2})`}
      >
        τ [MPa]
      </text>
      <text x={PLOT.x + 10} y={PLOT.y - PLOT.h * 0.42} fontSize={8} fill={ACCENT}>
        τ = Gγ
      </text>
      <text x={kneeX + 8} y={kneeY + 22} fontSize={8} fill={SHEAR}>
        płynięcie
      </text>
      <text x={PLOT.x} y={276} fontSize={8} fill={MUTED}>
        po przekroczeniu granicy plastyczności wzór przestaje obowiązywać
      </text>
    </g>
  )
}

export function ShearStressStrainExample2Animation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const p = playing ? clamp01(sceneProgress) : 1
  const draw = smooth(p)
  const shear = SHEAR_PX * smooth(Math.min(1, p * 1.35))

  const note =
    metric === 'brittle'
      ? 'Materiał kruchy może pęknąć prostopadle do σ₁, mimo że na ściankach widać tylko τ.'
      : metric === 'limit'
        ? 'Punkt leży jeszcze w zakresie sprężystym; po przekroczeniu granicy wykres się zakrzywia.'
        : metric === 'principal'
          ? 'Naprężenia główne są równe ±τ i działają pod kątem 45° do płaszczyzn ścinania.'
          : metric === 'E'
            ? 'Moduł Younga wynika z G i ν; otrzymujemy typową wartość dla aluminium.'
            : 'Odkształcenie jest bezwymiarowe, a kąt γ na rysunku jest powiększony.'

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg viewBox="0 0 460 320" role="img" aria-label="Element z aluminium ścinany, wykres tau-gamma i koło Mohra">
          <defs>
            <marker
              id={ARROW_SHEAR}
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={SHEAR} />
            </marker>
            <marker
              id={ARROW_ACCENT}
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={ACCENT} />
            </marker>
          </defs>

          <text x={12} y={20} fontSize={10} fontWeight={600} fill={INK}>
            element z aluminium
          </text>
          <text x={12} y={35} fontSize={8.5} fill={MUTED}>
            G = 27 GPa · ν = 0,33 · γ = 0,0012 rad
          </text>

          {metric === 'principal' ? <PrincipalElement draw={draw} /> : null}
          {metric !== 'principal' ? <ShearSquare shear={shear} draw={draw} crack={metric === 'brittle'} /> : null}

          {metric === 'model' && (
            <text x={EX} y={EY + 78} textAnchor="middle" fontSize={8.5} fill={MUTED}>
              zmierzony kąt γ opisuje odkształcenie materiału
            </text>
          )}
          {metric === 'brittle' && (
            <text x={EX} y={EY + 78} textAnchor="middle" fontSize={8.5} fill={CRACK}>
              pęknięcie ≈ 45° do płaszczyzny ścinania
            </text>
          )}

          {metric === 'E' ? <MaterialBars draw={draw} /> : null}
          {metric === 'principal' || metric === 'brittle' ? (
            <MohrCircle draw={draw} highlight={metric === 'brittle'} />
          ) : null}
          {metric === 'limit' ? <LimitPlot draw={draw} /> : null}
          {metric !== 'E' && metric !== 'principal' && metric !== 'brittle' && metric !== 'limit' ? (
            <TauGammaPlot draw={draw} measured={metric === 'model'} />
          ) : null}

          <text x={12} y={304} fontSize={8.5} fill={metric === 'brittle' ? CRACK : metric === 'limit' ? OK : MUTED}>
            {note}
          </text>
        </svg>
      </div>
    </div>
  )
}
