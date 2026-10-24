import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const SHEAR = '#ff6b45'
const MOHR = '#a970dd'
const OK = '#2e9e6b'
const MUTED = '#87929d'
const INK = '#17202a'
const EDGE = '#68727e'
const BAD = '#d64545'

const DOMAIN_MIN = -130
const DOMAIN_MAX = 130
const X0 = 52
const X1 = 428
const CY = 165
const SCALE = (X1 - X0) / (DOMAIN_MAX - DOMAIN_MIN)

const ARROW_ACCENT = 'stm3-arrow-accent'
const ARROW_SHEAR = 'stm3-arrow-shear'
const ARROW_MOHR = 'stm3-arrow-mohr'
const ARROW_MUTED = 'stm3-arrow-muted'

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}

const xOf = (sigma: number) => X0 + (sigma - DOMAIN_MIN) * SCALE
const yOf = (tau: number) => CY - tau * SCALE

function Axes({ ticks }: { ticks: Array<{ value: number; label: string }> }) {
  return (
    <g>
      <line x1={X0 - 16} y1={CY} x2={X1 + 12} y2={CY} stroke={MUTED} strokeWidth={1.2} />
      <line x1={X1} y1={CY} x2={X1 + 20} y2={CY} stroke={MUTED} strokeWidth={1.2} markerEnd={`url(#${ARROW_MUTED})`} />
      <text x={X1 + 20} y={CY + 15} textAnchor="end" fontSize={9} fill={MUTED}>
        σ [MPa]
      </text>
      <line x1={xOf(0)} y1={CY + 96} x2={xOf(0)} y2={CY - 96} stroke={MUTED} strokeWidth={1.1} opacity={0.55} />
      <text x={xOf(0) + 7} y={CY - 92} fontSize={9} fill={MUTED}>
        τ [MPa]
      </text>
      <line
        x1={xOf(0)}
        y1={CY - 82}
        x2={xOf(0)}
        y2={CY - 96}
        stroke={MUTED}
        strokeWidth={1.1}
        markerEnd={`url(#${ARROW_MUTED})`}
      />
      {ticks.map((tick) => (
        <g key={`${tick.value}-${tick.label}`}>
          <line x1={xOf(tick.value)} y1={CY - 4} x2={xOf(tick.value)} y2={CY + 4} stroke={MUTED} strokeWidth={1} />
          <text x={xOf(tick.value)} y={CY + 16} textAnchor="middle" fontSize={8.5} fill={MUTED}>
            {tick.label}
          </text>
        </g>
      ))}
    </g>
  )
}

function Circle({
  center,
  radius,
  draw,
  color,
  width = 2,
  dashed = false,
  delay = 0,
  opacity = 1,
}: {
  center: number
  radius: number
  draw: number
  color: string
  width?: number
  dashed?: boolean
  delay?: number
  opacity?: number
}) {
  const localDraw = clamp01((draw - delay) / Math.max(0.001, 1 - delay))
  return (
    <motion.circle
      cx={xOf(center)}
      cy={CY}
      r={radius * SCALE}
      fill="none"
      stroke={color}
      strokeWidth={width}
      strokeDasharray={dashed ? '5 4' : undefined}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: localDraw, opacity }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
    />
  )
}

function Radius({
  center,
  radius,
  draw,
  color,
  label,
  labelX,
  labelY,
}: {
  center: number
  radius: number
  draw: number
  color: string
  label: string
  labelX: number
  labelY: number
}) {
  const cx = xOf(center)
  const top = yOf(radius)
  const marker = color === SHEAR ? ARROW_SHEAR : color === MOHR ? ARROW_MOHR : ARROW_ACCENT
  return (
    <g>
      <motion.line
        x1={cx}
        y1={CY}
        x2={cx}
        y2={top}
        stroke={color}
        strokeWidth={2}
        markerEnd={`url(#${marker})`}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: draw }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
      />
      <motion.circle
        cx={cx}
        cy={top}
        r={3.6}
        fill={color}
        initial={{ scale: 0 }}
        animate={{ scale: draw > 0.72 ? 1 : 0 }}
        transition={{ type: 'spring', stiffness: 280, damping: 18 }}
      />
      <text x={labelX} y={labelY} fontSize={9.5} fontWeight={700} fill={color}>
        {label}
      </text>
    </g>
  )
}

function ReverseElement({ draw }: { draw: number }) {
  const x0 = 82
  const y0 = 102
  const side = 118
  const x1 = x0 + side
  const y1 = y0 + side
  const cxm = (x0 + x1) / 2
  const cym = (y0 + y1) / 2
  const length = 38 * draw

  return (
    <g>
      <motion.rect
        x={x0}
        y={y0}
        width={side}
        height={side}
        fill={ACCENT}
        fillOpacity={0.07}
        stroke={EDGE}
        strokeWidth={1.6}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      />
      <line
        x1={x1 + 7}
        y1={cym}
        x2={x1 + 7 + length}
        y2={cym}
        stroke={ACCENT}
        strokeWidth={2.4}
        markerEnd={`url(#${ARROW_ACCENT})`}
      />
      <line
        x1={x0 - 7}
        y1={cym}
        x2={x0 - 7 - length}
        y2={cym}
        stroke={ACCENT}
        strokeWidth={2.4}
        markerEnd={`url(#${ARROW_ACCENT})`}
      />
      <line
        x1={cxm}
        y1={y0 - 7}
        x2={cxm}
        y2={y0 - 7 - length}
        stroke={MUTED}
        strokeWidth={2}
        strokeDasharray="5 4"
        markerEnd={`url(#${ARROW_MUTED})`}
      />
      <line
        x1={cxm}
        y1={y1 + 7}
        x2={cxm}
        y2={y1 + 7 + length}
        stroke={MUTED}
        strokeWidth={2}
        strokeDasharray="5 4"
        markerEnd={`url(#${ARROW_MUTED})`}
      />
      <line
        x1={x1 + 15}
        y1={y1 - 18}
        x2={x1 + 15}
        y2={y0 + 18}
        stroke={MUTED}
        strokeWidth={2}
        strokeDasharray="5 4"
        markerEnd={`url(#${ARROW_MUTED})`}
      />
      <line
        x1={x0 - 15}
        y1={y0 + 18}
        x2={x0 - 15}
        y2={y1 - 18}
        stroke={MUTED}
        strokeWidth={2}
        strokeDasharray="5 4"
        markerEnd={`url(#${ARROW_MUTED})`}
      />

      <text x={x1 + 50} y={cym + 3} fontSize={10} fontWeight={700} fill={ACCENT}>
        σ_x = 104 MPa
      </text>
      <text x={cxm + 8} y={y0 - 50} fontSize={10} fontWeight={700} fill={MUTED}>
        σ_y = ?
      </text>
      <text x={x1 + 22} y={y0 - 20} fontSize={9.5} fontWeight={700} fill={MUTED}>
        |τ_xy| = ?
      </text>

      <text x={16} y={24} fontSize={10.5} fontWeight={700} fill={INK}>
        zadanie odwrotne: od wyniku do danych
      </text>
      <text x={16} y={39} fontSize={8.5} fill={MUTED}>
        R = 40 MPa · τ_abs = 60 MPa · σ_x = 104 MPa
      </text>

      <text x={294} y={62} fontSize={9} fontWeight={700} fill={INK}>
        znane parametry koła
      </text>
      <line x1={292} y1={246} x2={412} y2={246} stroke={MUTED} strokeWidth={1.2} />
      <motion.rect
        x={314}
        y={246 - 80 * draw}
        width={26}
        height={80 * draw}
        fill={MOHR}
        fillOpacity={0.8}
        initial={{ height: 0 }}
        animate={{ height: 80 * draw, y: 246 - 80 * draw }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
      <motion.rect
        x={374}
        y={246 - 120 * draw}
        width={26}
        height={120 * draw}
        fill={SHEAR}
        fillOpacity={0.85}
        initial={{ height: 0 }}
        animate={{ height: 120 * draw, y: 246 - 120 * draw }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
      <text x={327} y={160} textAnchor="middle" fontSize={9} fontWeight={700} fill={MOHR}>
        R
      </text>
      <text x={327} y={174} textAnchor="middle" fontSize={8.5} fill={MUTED}>
        40
      </text>
      <text x={387} y={120} textAnchor="middle" fontSize={9} fontWeight={700} fill={SHEAR}>
        τ_abs
      </text>
      <text x={387} y={134} textAnchor="middle" fontSize={8.5} fill={MUTED}>
        60
      </text>
      <text x={294} y={266} fontSize={8.5} fontWeight={700} fill={SHEAR}>
        τ_abs &gt; R ⇒ zero jest skrajne
      </text>
    </g>
  )
}

function AverageState({ draw }: { draw: number }) {
  const cx = 80
  const r = 40
  const a = 24
  const tau = 32
  const left = cx - a
  const right = cx + a
  const upper = yOf(tau)
  const lower = yOf(-tau)
  const line = (value: number) => xOf(value)

  return (
    <g>
      <Circle center={cx} radius={r} draw={draw} color={MOHR} width={2.2} />
      <line x1={line(left)} y1={CY} x2={line(left)} y2={upper} stroke={MUTED} strokeWidth={1.1} strokeDasharray="4 3" />
      <line x1={line(left)} y1={CY} x2={line(left)} y2={lower} stroke={MUTED} strokeWidth={1.1} strokeDasharray="4 3" />
      <line
        x1={line(right)}
        y1={CY}
        x2={line(right)}
        y2={upper}
        stroke={MUTED}
        strokeWidth={1.1}
        strokeDasharray="4 3"
      />
      <line
        x1={line(right)}
        y1={CY}
        x2={line(right)}
        y2={lower}
        stroke={MUTED}
        strokeWidth={1.1}
        strokeDasharray="4 3"
      />
      <circle cx={line(left)} cy={upper} r={3.4} fill={ACCENT} />
      <circle cx={line(left)} cy={lower} r={3.4} fill={ACCENT} />
      <circle cx={line(right)} cy={upper} r={3.4} fill={ACCENT} />
      <circle cx={line(right)} cy={lower} r={3.4} fill={ACCENT} />
      <circle cx={line(cx)} cy={CY} r={3.6} fill={INK} />
      <circle cx={line(left)} cy={CY} r={3.2} fill={ACCENT} />
      <circle cx={line(right)} cy={CY} r={3.2} fill={ACCENT} />
      <text x={line(left)} y={CY + 32} textAnchor="middle" fontSize={9} fontWeight={700} fill={ACCENT}>
        σ_y = 56
      </text>
      <text x={line(cx)} y={CY - 12} textAnchor="middle" fontSize={9} fill={INK}>
        σ_avg = 80
      </text>
      <text x={line(right)} y={CY + 32} textAnchor="middle" fontSize={9} fontWeight={700} fill={ACCENT}>
        σ_x = 104
      </text>
      <line x1={line(cx)} y1={CY + 42} x2={line(right)} y2={CY + 42} stroke={OK} strokeWidth={1.2} />
      <line x1={line(cx)} y1={CY + 38} x2={line(cx)} y2={CY + 46} stroke={OK} strokeWidth={1.2} />
      <line x1={line(right)} y1={CY + 38} x2={line(right)} y2={CY + 46} stroke={OK} strokeWidth={1.2} />
      <text x={(line(cx) + line(right)) / 2} y={CY + 57} textAnchor="middle" fontSize={8.5} fill={OK}>
        a = 24
      </text>
      <text x={16} y={282} fontSize={8.5} fill={MUTED}>
        Punkty σ_x i σ_y leżą na kole, bo na tych ściankach działa także τ_xy.
      </text>
    </g>
  )
}

function RadiusTriangle({ draw }: { draw: number }) {
  const scale = 3.1
  const origin = { x: 172, y: 230 }
  const horizontal = { x: origin.x + 24 * scale, y: origin.y }
  const vertical = { x: origin.x, y: origin.y - 32 * scale }

  return (
    <g>
      <motion.path
        d={`M ${origin.x} ${origin.y} L ${horizontal.x} ${horizontal.y}`}
        fill="none"
        stroke={ACCENT}
        strokeWidth={2.4}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: draw }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
      <motion.path
        d={`M ${horizontal.x} ${horizontal.y} L ${vertical.x} ${vertical.y}`}
        fill="none"
        stroke={MOHR}
        strokeWidth={2.8}
        markerEnd={`url(#${ARROW_MOHR})`}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: draw }}
        transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
      />
      <motion.path
        d={`M ${vertical.x} ${vertical.y} L ${origin.x} ${origin.y}`}
        fill="none"
        stroke={SHEAR}
        strokeWidth={2.4}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: draw }}
        transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
      />
      <path
        d={`M ${origin.x + 14} ${origin.y} L ${origin.x + 14} ${origin.y - 14} L ${origin.x} ${origin.y - 14}`}
        fill="none"
        stroke={MUTED}
        strokeWidth={1.1}
      />
      <text
        x={(origin.x + horizontal.x) / 2}
        y={origin.y + 20}
        textAnchor="middle"
        fontSize={9.5}
        fontWeight={700}
        fill={ACCENT}
      >
        a = 24 MPa
      </text>
      <text
        x={origin.x - 8}
        y={(origin.y + vertical.y) / 2}
        textAnchor="end"
        fontSize={9.5}
        fontWeight={700}
        fill={SHEAR}
      >
        |τ_xy| = 32
      </text>
      <text
        x={(origin.x + horizontal.x) / 2 + 16}
        y={(origin.y + vertical.y) / 2 - 8}
        fontSize={9.5}
        fontWeight={700}
        fill={MOHR}
      >
        R = 40
      </text>
      <text x={16} y={24} fontSize={10.5} fontWeight={700} fill={INK}>
        trójkąt promienia koła
      </text>
      <text x={16} y={39} fontSize={8.5} fill={MUTED}>
        40² = 24² + 32²
      </text>
      <text x={16} y={282} fontSize={8.5} fill={MUTED}>
        Znana jest wartość bezwzględna τ_xy; znak zależy od przyjętego zwrotu osi.
      </text>
    </g>
  )
}

function CompactCheckCircles({ draw }: { draw: number }) {
  const miniMin = -10
  const miniMax = 130
  const miniX0 = 36
  const miniX1 = 252
  const miniScale = (miniX1 - miniX0) / (miniMax - miniMin)
  const mx = (value: number) => miniX0 + (value - miniMin) * miniScale
  const mcy = 166
  const planeR = 40 * miniScale
  const absR = 60 * miniScale

  return (
    <g>
      <line x1={miniX0 - 10} y1={mcy} x2={miniX1 + 10} y2={mcy} stroke={MUTED} strokeWidth={1.1} />
      <line x1={mx(0)} y1={mcy + 12} x2={mx(0)} y2={mcy - 106} stroke={MUTED} strokeWidth={1} opacity={0.55} />
      <motion.circle
        cx={mx(80)}
        cy={mcy}
        r={planeR}
        fill="none"
        stroke={MOHR}
        strokeWidth={2}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: draw }}
        transition={{ duration: 0.65, ease: 'easeInOut' }}
      />
      <motion.circle
        cx={mx(60)}
        cy={mcy}
        r={absR}
        fill="none"
        stroke={SHEAR}
        strokeWidth={2.4}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: draw }}
        transition={{ duration: 0.75, delay: 0.12, ease: 'easeInOut' }}
      />
      <circle cx={mx(120)} cy={mcy} r={3.2} fill={ACCENT} />
      <circle cx={mx(40)} cy={mcy} r={3.2} fill={MOHR} />
      <circle cx={mx(0)} cy={mcy} r={3.2} fill={SHEAR} />
      <text x={mx(0)} y={mcy + 18} textAnchor="middle" fontSize={8} fill={SHEAR}>
        0
      </text>
      <text x={mx(40)} y={mcy + 18} textAnchor="middle" fontSize={8} fill={MOHR}>
        40
      </text>
      <text x={mx(120)} y={mcy + 18} textAnchor="middle" fontSize={8} fill={ACCENT}>
        120
      </text>
      <text x={mx(80)} y={mcy + 31} textAnchor="middle" fontSize={8} fill={MUTED}>
        R = 40
      </text>
      <text x={mx(60)} y={mcy - absR - 8} textAnchor="middle" fontSize={9} fontWeight={700} fill={SHEAR}>
        τ_abs = 60
      </text>
    </g>
  )
}

function PrincipalDirection({ draw }: { draw: number }) {
  const cx = 348
  const cy = 160
  const half = 54
  const top = cy - half
  const bottom = cy + half
  const left = cx - half
  const right = cx + half
  const length = 40 * draw
  const diagonalStart = { x: cx - 42, y: cy + 42 }
  const diagonalEnd = { x: cx + 42, y: cy - 42 }

  return (
    <g>
      <rect
        x={left}
        y={top}
        width={2 * half}
        height={2 * half}
        fill={ACCENT}
        fillOpacity={0.05}
        stroke={EDGE}
        strokeWidth={1.3}
      />
      <line x1={left - 26} y1={cy} x2={right + 26} y2={cy} stroke={ACCENT} strokeWidth={1.3} strokeDasharray="5 4" />
      <line x1={cx} y1={top - 24} x2={cx} y2={bottom + 24} stroke={ACCENT} strokeWidth={1.3} strokeDasharray="5 4" />
      <line
        x1={right + 5}
        y1={cy}
        x2={right + 5 + length}
        y2={cy}
        stroke={ACCENT}
        strokeWidth={2.3}
        markerEnd={`url(#${ARROW_ACCENT})`}
      />
      <line
        x1={left - 5}
        y1={cy}
        x2={left - 5 - length}
        y2={cy}
        stroke={ACCENT}
        strokeWidth={2.3}
        markerEnd={`url(#${ARROW_ACCENT})`}
      />
      <motion.line
        x1={diagonalStart.x}
        y1={diagonalStart.y}
        x2={diagonalEnd.x}
        y2={diagonalEnd.y}
        stroke={SHEAR}
        strokeWidth={2.8}
        markerStart={`url(#${ARROW_SHEAR})`}
        markerEnd={`url(#${ARROW_SHEAR})`}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: draw }}
        transition={{ duration: 0.7, ease: 'easeInOut' }}
      />
      <path d={`M ${cx} ${cy - 18} A 18 18 0 0 1 ${cx + 18} ${cy}`} fill="none" stroke={OK} strokeWidth={1.4} />
      <text x={cx + 21} y={cy - 20} fontSize={8.5} fontWeight={700} fill={OK}>
        45°
      </text>
      <text x={cx} y={cy - half - 40} textAnchor="middle" fontSize={9} fill={ACCENT}>
        σ_I = 120 MPa
      </text>
      <text x={cx + 60} y={cy + 44} fontSize={8.5} fill={MUTED}>
        σ_III = 0
      </text>
      <circle cx={cx} cy={cy} r={3} fill={MUTED} />
      <text x={cx + 7} y={cy - 10} fontSize={8} fill={MUTED}>
        σ_II = 40
      </text>
      <text x={cx + 12} y={cy + 62} fontSize={8.5} fontWeight={700} fill={SHEAR}>
        τ_abs = 60 MPa
      </text>
      <text x={cx - 8} y={cy + 76} textAnchor="middle" fontSize={8.5} fill={INK}>
        σ_n = 60 MPa
      </text>
    </g>
  )
}

export function TauMaxExample3Animation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'data'
  const p = playing ? smooth(sceneProgress) : 1
  const draw = clamp01(p)
  const circleDraw = clamp01((draw - 0.08) / 0.92)

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 300"
          role="img"
          aria-label="Zadanie odwrotne: z promienia 40 MPa i absolutnego maksimum 60 MPa odtworzenie stanu naprężenia i sprawdzenie wariantu."
        >
          <defs>
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
              id={ARROW_MOHR}
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={MOHR} />
            </marker>
            <marker
              id={ARROW_MUTED}
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={MUTED} />
            </marker>
          </defs>

          {metric === 'data' ? <ReverseElement draw={draw} /> : null}

          {metric !== 'data' && metric !== 'average' && metric !== 'triangle' && metric !== 'check' ? (
            <g>
              <text x={16} y={22} fontSize={10.5} fontWeight={700} fill={INK}>
                {metric === 'principal'
                  ? 'odtworzone naprężenia główne'
                  : 'wariant ściskający jest niezgodny z pomiarem'}
              </text>
              <text x={16} y={37} fontSize={8.5} fill={MUTED}>
                σ_x = 104 MPa · R = 40 MPa · τ_abs = 60 MPa
              </text>
              <Axes
                ticks={
                  metric === 'principal'
                    ? []
                    : [
                        { value: -120, label: '−120' },
                        { value: -40, label: '−40' },
                        { value: 0, label: '0' },
                        { value: 104, label: '104' },
                      ]
                }
              />
            </g>
          ) : null}

          {metric === 'principal' ? (
            <g>
              <Circle center={80} radius={40} draw={circleDraw} color={MOHR} width={2.2} delay={0} />
              <Circle center={60} radius={60} draw={circleDraw} color={SHEAR} width={2.6} delay={0.18} />
              <Radius
                center={60}
                radius={60}
                draw={circleDraw}
                color={SHEAR}
                label="τ_abs = 60 MPa"
                labelX={xOf(60) + 8}
                labelY={yOf(60) + 4}
              />
              <circle cx={xOf(0)} cy={CY} r={3.6} fill={SHEAR} />
              <circle cx={xOf(40)} cy={CY} r={3.4} fill={MOHR} />
              <circle cx={xOf(120)} cy={CY} r={3.6} fill={ACCENT} />
              <circle cx={xOf(80)} cy={CY} r={3.2} fill={INK} />
              <text x={xOf(0)} y={CY + 32} textAnchor="middle" fontSize={9.5} fontWeight={700} fill={SHEAR}>
                0
              </text>
              <text x={xOf(40)} y={CY + 32} textAnchor="middle" fontSize={9} fontWeight={700} fill={MOHR}>
                40
              </text>
              <text x={xOf(120)} y={CY + 32} textAnchor="middle" fontSize={9.5} fontWeight={700} fill={ACCENT}>
                120
              </text>
              <text x={xOf(80)} y={CY - 12} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                C = 80
              </text>
              <text x={xOf(60)} y={CY + 50} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                C_abs = 60
              </text>
              <text x={16} y={282} fontSize={8.5} fill={SHEAR}>
                Większe τ_abs niż R oznacza, że zero jest naprężeniem skrajnym.
              </text>
            </g>
          ) : null}

          {metric === 'average' ? (
            <g>
              <text x={16} y={22} fontSize={10.5} fontWeight={700} fill={INK}>
                środek koła i odtworzenie σ_y
              </text>
              <text x={16} y={37} fontSize={8.5} fill={MUTED}>
                σ_x = 104 MPa · σ_avg = 80 MPa · R = 40 MPa
              </text>
              <Axes ticks={[]} />
              <AverageState draw={draw} />
            </g>
          ) : null}

          {metric === 'triangle' ? <RadiusTriangle draw={draw} /> : null}

          {metric === 'check' ? (
            <g>
              <text x={16} y={22} fontSize={10.5} fontWeight={700} fill={INK}>
                sprawdzenie i kierunek maksimum
              </text>
              <text x={16} y={37} fontSize={8.5} fill={MUTED}>
                40² = 24² + 32² · τ_abs = (120 − 0)/2 = 60 MPa
              </text>
              <CompactCheckCircles draw={circleDraw} />
              <PrincipalDirection draw={draw} />
              <text x={16} y={282} fontSize={8.5} fill={MUTED}>
                Płaszczyzna absolutnego maksimum leży pod 45° do σ_I i σ_III.
              </text>
            </g>
          ) : null}

          {metric === 'reject' ? (
            <g>
              <Circle
                center={-60}
                radius={60}
                draw={circleDraw}
                color={BAD}
                width={2.2}
                dashed
                delay={0}
                opacity={0.75}
              />
              <Circle
                center={-80}
                radius={40}
                draw={circleDraw}
                color={BAD}
                width={1.6}
                dashed
                delay={0.1}
                opacity={0.6}
              />
              <Circle
                center={-20}
                radius={20}
                draw={circleDraw}
                color={BAD}
                width={1.6}
                dashed
                delay={0.2}
                opacity={0.6}
              />
              <motion.g
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: draw > 0.55 ? 1 : 0, scale: draw > 0.55 ? 1 : 0.7 }}
                transition={{ type: 'spring', stiffness: 280, damping: 18 }}
                style={{ transformOrigin: `${xOf(-60)}px ${CY}px` }}
              >
                <line x1={xOf(-60) - 12} y1={CY - 12} x2={xOf(-60) + 12} y2={CY + 12} stroke={BAD} strokeWidth={2.6} />
                <line x1={xOf(-60) + 12} y1={CY - 12} x2={xOf(-60) - 12} y2={CY + 12} stroke={BAD} strokeWidth={2.6} />
              </motion.g>
              <line
                x1={xOf(104)}
                y1={CY - 96}
                x2={xOf(104)}
                y2={CY + 32}
                stroke={OK}
                strokeWidth={1.6}
                strokeDasharray="4 3"
              />
              <circle cx={xOf(104)} cy={CY} r={4} fill={OK} />
              <text x={xOf(104)} y={CY - 104} textAnchor="middle" fontSize={9.5} fontWeight={700} fill={OK}>
                σ_x = 104
              </text>
              <line x1={xOf(-120)} y1={CY + 42} x2={xOf(-40)} y2={CY + 42} stroke={BAD} strokeWidth={1.4} />
              <line x1={xOf(-120)} y1={CY + 38} x2={xOf(-120)} y2={CY + 46} stroke={BAD} strokeWidth={1.4} />
              <line x1={xOf(-40)} y1={CY + 38} x2={xOf(-40)} y2={CY + 46} stroke={BAD} strokeWidth={1.4} />
              <text x={(xOf(-120) + xOf(-40)) / 2} y={CY + 57} textAnchor="middle" fontSize={8.5} fill={BAD}>
                przedział σ płaskich
              </text>
              <text x={xOf(104) - 8} y={CY - 74} textAnchor="end" fontSize={9} fontWeight={700} fill={OK}>
                104 ∉ [−120, −40]
              </text>
              <text x={16} y={282} fontSize={8.5} fill={MUTED}>
                Pomiar σ_x leży poza przedziałem możliwym dla wariantu ściskającego.
              </text>
            </g>
          ) : null}
        </svg>
      </div>
    </div>
  )
}
