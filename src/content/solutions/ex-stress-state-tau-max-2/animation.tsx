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

const DOMAIN_MIN = -125
const DOMAIN_MAX = 12
const X0 = 52
const X1 = 428
const CY = 170
const SCALE = (X1 - X0) / (DOMAIN_MAX - DOMAIN_MIN)

const ARROW_ACCENT = 'stm2-arrow-accent'
const ARROW_SHEAR = 'stm2-arrow-shear'
const ARROW_MOHR = 'stm2-arrow-mohr'
const ARROW_MUTED = 'stm2-arrow-muted'

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
      <line x1={xOf(0)} y1={CY + 96} x2={xOf(0)} y2={CY - 128} stroke={MUTED} strokeWidth={1.1} opacity={0.55} />
      <text x={xOf(0) + 7} y={CY - 124} fontSize={9} fill={MUTED}>
        τ [MPa]
      </text>
      <line
        x1={xOf(0)}
        y1={CY - 114}
        x2={xOf(0)}
        y2={CY - 128}
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

function StressElement({
  draw,
  sx,
  sy,
  labelX,
  labelY,
  labelTau,
}: {
  draw: number
  sx: number
  sy: number
  labelX: string
  labelY: string
  labelTau: string
}) {
  const x0 = 94
  const y0 = 106
  const side = 116
  const x1 = x0 + side
  const y1 = y0 + side
  const cxm = (x0 + x1) / 2
  const cym = (y0 + y1) / 2
  const length = 42 * draw
  const tensionX = sx >= 0
  const tensionY = sy >= 0

  const horizontal = tensionX
    ? [x1 + 7, x1 + 7 + length, x0 - 7, x0 - 7 - length]
    : [x1 + 7 + length, x1 + 7, x0 - 7 - length, x0 - 7]
  const vertical = tensionY
    ? [y0 - 7, y0 - 7 - length, y1 + 7, y1 + 7 + length]
    : [y0 - 7 - length, y0 - 7, y1 + 7 + length, y1 + 7]

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
        x1={horizontal[0]}
        y1={cym}
        x2={horizontal[1]}
        y2={cym}
        stroke={ACCENT}
        strokeWidth={2.4}
        markerEnd={`url(#${ARROW_ACCENT})`}
      />
      <line
        x1={horizontal[2]}
        y1={cym}
        x2={horizontal[3]}
        y2={cym}
        stroke={ACCENT}
        strokeWidth={2.4}
        markerEnd={`url(#${ARROW_ACCENT})`}
      />
      <line
        x1={cxm}
        y1={vertical[0]}
        x2={cxm}
        y2={vertical[1]}
        stroke={ACCENT}
        strokeWidth={2.4}
        markerEnd={`url(#${ARROW_ACCENT})`}
      />
      <line
        x1={cxm}
        y1={vertical[2]}
        x2={cxm}
        y2={vertical[3]}
        stroke={ACCENT}
        strokeWidth={2.4}
        markerEnd={`url(#${ARROW_ACCENT})`}
      />

      <line
        x1={x1 + 15}
        y1={y1 - 18}
        x2={x1 + 15}
        y2={y0 + 18}
        stroke={SHEAR}
        strokeWidth={2.2}
        markerEnd={`url(#${ARROW_SHEAR})`}
      />
      <line
        x1={x0 - 15}
        y1={y0 + 18}
        x2={x0 - 15}
        y2={y1 - 18}
        stroke={SHEAR}
        strokeWidth={2.2}
        markerEnd={`url(#${ARROW_SHEAR})`}
      />
      <line
        x1={x0 + 18}
        y1={y0 - 15}
        x2={x1 - 18}
        y2={y0 - 15}
        stroke={SHEAR}
        strokeWidth={2.2}
        markerEnd={`url(#${ARROW_SHEAR})`}
      />
      <line
        x1={x1 - 18}
        y1={y1 + 15}
        x2={x0 + 18}
        y2={y1 + 15}
        stroke={SHEAR}
        strokeWidth={2.2}
        markerEnd={`url(#${ARROW_SHEAR})`}
      />

      <text x={x1 + 52} y={cym + 3} fontSize={10} fontWeight={700} fill={ACCENT}>
        {labelX}
      </text>
      <text x={cxm + 9} y={y0 - 50} fontSize={10} fontWeight={700} fill={ACCENT}>
        {labelY}
      </text>
      <text x={x1 + 22} y={y0 - 20} fontSize={9.5} fontWeight={700} fill={SHEAR}>
        {labelTau}
      </text>

      <g stroke={MUTED} strokeWidth={1.5} fill="none">
        <line x1={356} y1={212} x2={396} y2={212} markerEnd={`url(#${ARROW_MUTED})`} />
        <line x1={356} y1={212} x2={356} y2={172} markerEnd={`url(#${ARROW_MUTED})`} />
        <line x1={356} y1={212} x2={386} y2={182} markerEnd={`url(#${ARROW_MUTED})`} />
      </g>
      <text x={401} y={216} fontSize={9} fill={MUTED}>
        x
      </text>
      <text x={350} y={167} fontSize={9} fill={MUTED}>
        y
      </text>
      <text x={391} y={179} fontSize={9} fill={MUTED}>
        z
      </text>
      <text x={342} y={240} fontSize={9.5} fontWeight={700} fill={SHEAR}>
        σ_z = 0
      </text>
      <text x={342} y={254} fontSize={8.5} fill={MUTED}>
        trzecia oś jest zerowa
      </text>
    </g>
  )
}

function PrincipalPlaneElement({ draw }: { draw: number }) {
  const cx = 146
  const cy = 168
  const half = 60
  const top = cy - half
  const bottom = cy + half
  const left = cx - half
  const right = cx + half
  const length = 44 * draw
  const diagonalStart = { x: cx - 48, y: cy + 48 }
  const diagonalEnd = { x: cx + 48, y: cy - 48 }

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
        strokeWidth={1.4}
      />
      <line x1={left - 34} y1={cy} x2={right + 34} y2={cy} stroke={ACCENT} strokeWidth={1.4} strokeDasharray="5 4" />
      <line x1={cx} y1={top - 34} x2={cx} y2={bottom + 34} stroke={ACCENT} strokeWidth={1.4} strokeDasharray="5 4" />
      <line
        x1={cx}
        y1={top + 4}
        x2={cx}
        y2={top + 4 + length}
        stroke={ACCENT}
        strokeWidth={2.4}
        markerEnd={`url(#${ARROW_ACCENT})`}
      />
      <line
        x1={cx}
        y1={bottom - 4}
        x2={cx}
        y2={bottom - 4 - length}
        stroke={ACCENT}
        strokeWidth={2.4}
        markerEnd={`url(#${ARROW_ACCENT})`}
      />
      <motion.line
        x1={diagonalStart.x}
        y1={diagonalStart.y}
        x2={diagonalEnd.x}
        y2={diagonalEnd.y}
        stroke={SHEAR}
        strokeWidth={3}
        markerStart={`url(#${ARROW_SHEAR})`}
        markerEnd={`url(#${ARROW_SHEAR})`}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: draw }}
        transition={{ duration: 0.7, ease: 'easeInOut' }}
      />
      <path d={`M ${cx} ${cy - 20} A 20 20 0 0 1 ${cx + 20} ${cy}`} fill="none" stroke={OK} strokeWidth={1.5} />
      <text x={cx + 24} y={cy - 22} fontSize={9} fontWeight={700} fill={OK}>
        45°
      </text>
      <text x={cx + 56} y={cy - 62} fontSize={9.5} fontWeight={700} fill={SHEAR}>
        τ_abs = 56,21 MPa
      </text>
      <text x={right + 18} y={cy + 4} fontSize={8.5} fill={MUTED}>
        σ_I = 0
      </text>
      <text x={cx - 56} y={cy + 76} fontSize={9} fill={ACCENT}>
        σ_III = −112,43
      </text>
      <circle cx={cx} cy={cy} r={3.2} fill={MUTED} />
      <text x={cx + 9} y={cy + 16} fontSize={8.5} fill={MUTED}>
        σ_II = −27,57
      </text>
      <text x={cx - 52} y={cy - 72} textAnchor="middle" fontSize={9} fill={INK}>
        σ_n = −56,21 MPa
      </text>
      <text x={16} y={282} fontSize={8.5} fill={MUTED}>
        Ujemne σ_n oznacza ściskanie na płaszczyźnie maksymalnego ścinania.
      </text>
    </g>
  )
}

export function TauMaxExample2Animation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'data'
  const p = playing ? smooth(sceneProgress) : 1
  const draw = clamp01(p)
  const circleDraw = clamp01((draw - 0.08) / 0.92)
  const iCenter = -70
  const iRadius = 42.43
  const absCenter = -56.21
  const absRadius = 56.21

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 300"
          role="img"
          aria-label="Ściskany stan naprężenia minus 40, minus 100 i 30 MPa, koło Mohra oraz absolutne maksimum ścinania 56,21 MPa."
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

          {metric === 'data' ? (
            <g>
              <text x={16} y={24} fontSize={10.5} fontWeight={700} fill={INK}>
                ściskanie ze ścinaniem
              </text>
              <text x={16} y={39} fontSize={8.5} fill={MUTED}>
                σ_x = −40 MPa · σ_y = −100 MPa · τ_xy = 30 MPa
              </text>
              <StressElement
                draw={draw}
                sx={-40}
                sy={-100}
                labelX="σ_x = −40 MPa"
                labelY="σ_y = −100 MPa"
                labelTau="τ_xy = 30 MPa"
              />
              <text x={16} y={282} fontSize={8.5} fill={MUTED}>
                Obie ścianki normalne są ściskane, a dodatkowo działają naprężenia styczne.
              </text>
            </g>
          ) : null}

          {metric !== 'data' ? (
            <g>
              <text x={16} y={22} fontSize={10.5} fontWeight={700} fill={INK}>
                {metric === 'circle'
                  ? 'koło Mohra dla dwóch naprężeń ściskających'
                  : metric === 'inplane'
                    ? 'płaskie maksimum ścinania'
                    : metric === 'absolute'
                      ? 'trzy koła Mohra'
                      : metric === 'directions'
                        ? 'płaszczyzna absolutnego maksimum'
                        : 'płaskie i absolutne maksimum'}
              </text>
              <text x={16} y={37} fontSize={8.5} fill={MUTED}>
                σ_x = −40 · σ_y = −100 · τ_xy = 30 · σ_z = 0 MPa
              </text>
              {metric !== 'directions' ? (
                <Axes
                  ticks={
                    metric === 'circle' || metric === 'absolute'
                      ? [{ value: -70, label: '−70' }]
                      : metric === 'result'
                        ? []
                        : [
                            { value: -112.43, label: '−112,4' },
                            { value: -70, label: '−70' },
                            { value: -27.57, label: '−27,6' },
                          ]
                  }
                />
              ) : null}
            </g>
          ) : null}

          {metric === 'circle' ? (
            <g>
              <Circle center={iCenter} radius={iRadius} draw={circleDraw} color={MOHR} width={2.4} />
              <Radius
                center={iCenter}
                radius={iRadius}
                draw={circleDraw}
                color={MOHR}
                label="R = 42,43 MPa"
                labelX={xOf(iCenter) + 8}
                labelY={yOf(iRadius) + 4}
              />
              <circle cx={xOf(iCenter)} cy={CY} r={3.4} fill={INK} />
              <text x={xOf(iCenter)} y={CY + 32} textAnchor="middle" fontSize={9} fill={INK}>
                C = −70
              </text>
              <circle cx={xOf(-27.57)} cy={CY} r={3.4} fill={ACCENT} />
              <circle cx={xOf(-112.43)} cy={CY} r={3.4} fill={ACCENT} />
              <circle cx={xOf(0)} cy={CY} r={3.4} fill={SHEAR} />
              <text x={xOf(-27.57)} y={CY - 12} textAnchor="middle" fontSize={9} fontWeight={700} fill={ACCENT}>
                −27,57
              </text>
              <text x={xOf(-112.43)} y={CY - 12} textAnchor="middle" fontSize={9} fontWeight={700} fill={ACCENT}>
                −112,43
              </text>
              <text x={xOf(0)} y={CY + 32} textAnchor="middle" fontSize={9} fontWeight={700} fill={SHEAR}>
                0
              </text>
              <text x={16} y={282} fontSize={8.5} fill={SHEAR}>
                Zero leży na prawo od przedziału −112,43…−27,57 MPa.
              </text>
            </g>
          ) : null}

          {metric === 'inplane' ? (
            <g>
              <Circle center={iCenter} radius={iRadius} draw={circleDraw} color={MOHR} width={2.4} />
              <Radius
                center={iCenter}
                radius={iRadius}
                draw={circleDraw}
                color={SHEAR}
                label="τ_max^(xy) = R = 42,43 MPa"
                labelX={xOf(iCenter) + 8}
                labelY={yOf(iRadius) + 4}
              />
              <circle cx={xOf(iCenter)} cy={CY} r={3.4} fill={INK} />
              <path
                d={`M ${xOf(iCenter) + 34} ${CY} A 34 34 0 0 0 ${xOf(iCenter)} ${CY - 34}`}
                fill="none"
                stroke={OK}
                strokeWidth={1.6}
              />
              <text x={xOf(iCenter) + 42} y={CY - 34} fontSize={8.5} fill={OK}>
                2θ = 90°
              </text>
              <text x={16} y={282} fontSize={8.5} fill={MUTED}>
                W materiale płaszczyzna τ_max leży pod kątem 45° do kierunku głównego.
              </text>
              <text x={xOf(iCenter) + 8} y={248} fontSize={9} fontWeight={700} fill={OK}>
                θ_s = θ_p ± 45°
              </text>
            </g>
          ) : null}

          {metric === 'absolute' ? (
            <g>
              <Circle center={iCenter} radius={iRadius} draw={circleDraw} color={MUTED} width={1.5} dashed delay={0} />
              <Circle center={-13.79} radius={13.79} draw={circleDraw} color={MUTED} width={1.5} delay={0.1} />
              <Circle center={absCenter} radius={absRadius} draw={circleDraw} color={SHEAR} width={2.6} delay={0.22} />
              <Radius
                center={absCenter}
                radius={absRadius}
                draw={circleDraw}
                color={SHEAR}
                label="R_I,III = 56,21 MPa"
                labelX={xOf(absCenter) + 9}
                labelY={yOf(absRadius) + 4}
              />
              <circle cx={xOf(0)} cy={CY} r={3.4} fill={SHEAR} />
              <circle cx={xOf(-27.57)} cy={CY} r={3.4} fill={ACCENT} />
              <circle cx={xOf(-112.43)} cy={CY} r={3.4} fill={ACCENT} />
              <text x={xOf(0)} y={CY - 12} textAnchor="middle" fontSize={9.5} fontWeight={700} fill={SHEAR}>
                0
              </text>
              <text x={xOf(-27.57)} y={CY - 12} textAnchor="middle" fontSize={9} fill={ACCENT}>
                −27,57
              </text>
              <text x={xOf(-112.43)} y={CY - 12} textAnchor="middle" fontSize={9} fill={ACCENT}>
                −112,43
              </text>
              <text x={xOf(absCenter)} y={CY + 32} textAnchor="middle" fontSize={9} fill={MUTED}>
                C = −56,21
              </text>
              <text x={16} y={282} fontSize={8.5} fill={SHEAR}>
                Największa różnica to 0 − (−112,43) = 112,43 MPa.
              </text>
            </g>
          ) : null}

          {metric === 'directions' ? (
            <g>
              <PrincipalPlaneElement draw={draw} />
            </g>
          ) : null}

          {metric === 'result' ? (
            <g>
              <Circle center={iCenter} radius={iRadius} draw={circleDraw} color={MOHR} width={2.2} delay={0} />
              <Circle center={absCenter} radius={absRadius} draw={circleDraw} color={SHEAR} width={2.2} delay={0.16} />
              <Radius
                center={absCenter}
                radius={absRadius}
                draw={circleDraw}
                color={SHEAR}
                label="τ_abs = 56,21"
                labelX={xOf(absCenter) + 8}
                labelY={yOf(absRadius) + 16}
              />
              <text x={xOf(absCenter) + 8} y={yOf(absRadius) + 28} fontSize={8.5} fill={SHEAR}>
                +13,79 MPa
              </text>
              <circle cx={xOf(-112.43)} cy={CY} r={3.6} fill={ACCENT} />
              <circle cx={xOf(-27.57)} cy={CY} r={3.2} fill={MOHR} />
              <circle cx={xOf(0)} cy={CY} r={3.2} fill={SHEAR} />
              <text x={xOf(-112.43)} y={CY + 32} textAnchor="middle" fontSize={8.5} fill={ACCENT}>
                −112,43
              </text>
              <text x={xOf(-27.57)} y={CY + 32} textAnchor="middle" fontSize={8.5} fill={MOHR}>
                −27,57
              </text>
              <text x={xOf(0)} y={CY + 32} textAnchor="middle" fontSize={8.5} fill={SHEAR}>
                0
              </text>
              <text x={208} y={252} fontSize={9} fill={MUTED}>
                R = 42,43 MPa · τ_abs = 56,21 MPa
              </text>
              <text x={208} y={267} fontSize={9} fontWeight={700} fill={SHEAR}>
                różnica 13,79 MPa, czyli 32,5%
              </text>
              <text x={16} y={282} fontSize={8.5} fill={MUTED}>
                Wspólny koniec −112,43; zero wydłuża średnicę koła absolutnego.
              </text>
            </g>
          ) : null}
        </svg>
      </div>
    </div>
  )
}
