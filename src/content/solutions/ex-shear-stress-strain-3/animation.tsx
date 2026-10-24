import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const SHEAR = '#ff6b45'
const MUTED = '#87929d'
const INK = '#17202a'
const OK = '#2e9e6b'
const MOHR = '#a970dd'

const ARROW_SHEAR = 'ss3-arrow-shear'
const ARROW_ACCENT = 'ss3-arrow-accent'

const EX = 128
const EY = 160
const HALF = 50
const SHEAR_PX = 26

const PLOT = { x: 292, y: 252, w: 124, h: 92 }
const GAMMA_MAX = 0.0012
const TAU_MAX = 90

const TAU = 72
const GAMMA = 0.0009

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}

function ShearSquare({ shear, draw }: { shear: number; draw: number }) {
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
      <text x={EX} y={EY + 4} textAnchor="middle" fontSize={9} fill={MUTED}>
        element
      </text>
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
        σ₁ = +72 MPa
      </text>
      <text x={EX - r / 2 - 30} y={EY + r / 2 + 34} fontSize={9} fill={SHEAR} textAnchor="end">
        σ₁ = +72 MPa
      </text>
      <text x={EX - r / 2 - 28} y={EY - r / 2 - 24} fontSize={9} fill={ACCENT} textAnchor="end">
        σ₂ = −72 MPa
      </text>
      <text x={EX + r / 2 + 28} y={EY + r / 2 + 34} fontSize={9} fill={ACCENT}>
        σ₂ = −72 MPa
      </text>
      <text x={EX} y={EY + 4} textAnchor="middle" fontSize={9} fill={MUTED}>
        płaszczyzny główne
      </text>
    </g>
  )
}

function TauGammaPlot({ draw, showLine = false }: { draw: number; showLine?: boolean }) {
  const px = PLOT.x + (GAMMA / GAMMA_MAX) * PLOT.w
  const py = PLOT.y - (TAU / TAU_MAX) * PLOT.h

  return (
    <g>
      <text x={PLOT.x} y={PLOT.y - PLOT.h - 27} fontSize={9.5} fontWeight={700} fill={INK}>
        {showLine ? 'moduł ścinania z nachylenia' : 'punkt pomiarowy'}
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

      {showLine && (
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
      )}
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
        animate={{ opacity: draw > 0.5 ? 1 : 0 }}
      />
      <text x={px - 8} y={py - 5} textAnchor="end" fontSize={8.5} fontWeight={700} fill={ACCENT}>
        τ = 72 MPa
      </text>
      <text x={px - 8} y={py + 9} textAnchor="end" fontSize={8} fill={MUTED}>
        γ = 0,0009 rad
      </text>
      {showLine && (
        <>
          <text x={PLOT.x + 9} y={PLOT.y - PLOT.h * 0.56} fontSize={8.5} fill={MUTED}>
            nachylenie G
          </text>
        </>
      )}
    </g>
  )
}

function NuCurve({ draw }: { draw: number }) {
  const x0 = 300
  const x1 = 432
  const y0 = 230
  const y1 = 70
  const ratioMin = 0.32
  const ratioMax = 0.51
  const point = (nu: number) => {
    const ratio = 1 / (2 * (1 + nu))
    return {
      x: x0 + (nu / 0.5) * (x1 - x0),
      y: y0 - ((ratio - ratioMin) / (ratioMax - ratioMin)) * (y0 - y1),
    }
  }
  const curve = Array.from({ length: 41 }, (_, index) => {
    const nu = (index / 40) * 0.5
    const p = point(nu)
    return `${index === 0 ? 'M' : 'L'} ${p.x} ${p.y}`
  }).join(' ')
  const at03 = point(0.3)
  const at0 = point(0)
  const at05 = point(0.5)

  return (
    <g>
      <text x={x0} y={54} fontSize={9.5} fontWeight={700} fill={INK}>
        stosunek G/E zależy od ν
      </text>
      <line x1={x0} y1={y0} x2={x1 + 8} y2={y0} stroke={MUTED} strokeWidth={1.1} />
      <line x1={x0} y1={y1} x2={x0} y2={y0 + 6} stroke={MUTED} strokeWidth={1.1} />
      <text x={(x0 + x1) / 2} y={y0 + 15} textAnchor="middle" fontSize={8} fill={MUTED}>
        ν
      </text>
      <text
        x={x0 - 8}
        y={(y0 + y1) / 2}
        textAnchor="middle"
        fontSize={8}
        fill={MUTED}
        transform={`rotate(-90 ${x0 - 8} ${(y0 + y1) / 2})`}
      >
        G/E
      </text>
      <motion.path
        d={curve}
        fill="none"
        stroke={MOHR}
        strokeWidth={2.2}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: draw }}
      />
      <circle cx={at0.x} cy={at0.y} r={3} fill={MUTED} />
      <circle cx={at05.x} cy={at05.y} r={3} fill={MUTED} />
      <motion.circle
        cx={at03.x}
        cy={at03.y}
        r={5}
        fill={ACCENT}
        initial={{ opacity: 0 }}
        animate={{ opacity: draw > 0.45 ? 1 : 0 }}
      />
      <text x={at0.x + 3} y={at0.y - 8} fontSize={7.5} fill={MUTED}>
        ν = 0 → 1/2
      </text>
      <text x={at05.x - 3} y={at05.y + 14} textAnchor="end" fontSize={7.5} fill={MUTED}>
        ν → 0,5 → 1/3
      </text>
      <text x={at03.x - 7} y={at03.y - 9} textAnchor="end" fontSize={8} fill={ACCENT}>
        0,385
      </text>
      <text x={x0} y={y0 + 34} fontSize={7.5} fill={MUTED}>
        G = E / [2(1 + ν)]
      </text>
    </g>
  )
}

function MohrCircle({ draw }: { draw: number }) {
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
      <circle cx={cx + r} cy={cy} r={3.5} fill={ACCENT} />
      <circle cx={cx - r} cy={cy} r={3.5} fill={ACCENT} />
      <text x={cx + 7} y={cy - r + 4} fontSize={8} fill={SHEAR}>
        +τ
      </text>
      <text x={cx + 7} y={cy + r - 1} fontSize={8} fill={SHEAR}>
        −τ
      </text>
      <text x={cx + r + 2} y={cy - 5} fontSize={8} fill={ACCENT} textAnchor="end">
        σ₁ = +72
      </text>
      <text x={cx - r - 2} y={cy - 5} fontSize={8} fill={ACCENT} textAnchor="end">
        σ₂ = −72
      </text>
      <circle cx={cx} cy={cy} r={3} fill={MUTED} />
      <text x={cx} y={cy + r + 17} textAnchor="middle" fontSize={8} fill={MUTED}>
        C = 0, R = τ
      </text>
      <text x={cx} y={cy + r + 31} textAnchor="middle" fontSize={8} fill={MUTED}>
        kąt 90° na kole = 45° w materiale
      </text>
    </g>
  )
}

export function ShearStressStrainExample3Animation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const p = playing ? clamp01(sceneProgress) : 1
  const draw = smooth(p)
  const shear = SHEAR_PX * smooth(Math.min(1, p * 1.35))

  const note =
    metric === 'E'
      ? 'Dla metali ν ≈ 0,25–0,35, więc G jest około 2,5–2,7 razy mniejsze od E.'
      : metric === 'principal'
        ? 'Naprężenia główne ±72 MPa działają na płaszczyznach obróconych o 45°.'
        : metric === 'check'
          ? 'Wynik G = 80 GPa jest typowy dla stali; jednostki są spójne.'
          : metric === 'G'
            ? 'Nachylenie prostej τ(γ) to moduł ścinania G.'
            : 'Z pomiaru τ i γ wyznaczamy najpierw G, a potem E.'

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 320"
          role="img"
          aria-label="Element ścinany, wykres tau-gamma, zależność G/E od liczby Poissona i koło Mohra"
        >
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
            pomiar τ i γ
          </text>
          <text x={12} y={35} fontSize={8.5} fill={MUTED}>
            τ = 72 MPa · γ = 0,0009 rad · ν = 0,3
          </text>

          {metric === 'principal' ? <PrincipalElement draw={draw} /> : null}
          {metric !== 'principal' ? <ShearSquare shear={shear} draw={draw} /> : null}

          {metric === 'model' && (
            <text x={EX} y={EY + 78} textAnchor="middle" fontSize={8.5} fill={MUTED}>
              dwa zmierzone parametry wyznaczają nachylenie τ(γ)
            </text>
          )}
          {metric === 'check' && (
            <text x={EX} y={EY + 78} textAnchor="middle" fontSize={8.5} fill={OK}>
              G = 80 GPa — typowa stal
            </text>
          )}

          {metric === 'E' ? <NuCurve draw={draw} /> : null}
          {metric === 'principal' ? <MohrCircle draw={draw} /> : null}
          {metric !== 'E' && metric !== 'principal' ? <TauGammaPlot draw={draw} showLine={metric !== 'model'} /> : null}

          <text x={12} y={304} fontSize={8.5} fill={metric === 'check' ? OK : MUTED}>
            {note}
          </text>
        </svg>
      </div>
    </div>
  )
}
