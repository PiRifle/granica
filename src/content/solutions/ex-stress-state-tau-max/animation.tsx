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

const DOMAIN_MIN = -20
const DOMAIN_MAX = 130
const X0 = 52
const X1 = 428
const CY = 168
const SCALE = (X1 - X0) / (DOMAIN_MAX - DOMAIN_MIN)

const ARROW_ACCENT = 'stm1-arrow-accent'
const ARROW_SHEAR = 'stm1-arrow-shear'
const ARROW_MOHR = 'stm1-arrow-mohr'
const ARROW_MUTED = 'stm1-arrow-muted'

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
      <line x1={xOf(0)} y1={CY + 92} x2={xOf(0)} y2={CY - 122} stroke={MUTED} strokeWidth={1.1} opacity={0.55} />
      <text x={xOf(0) + 7} y={CY - 118} fontSize={9} fill={MUTED}>
        τ [MPa]
      </text>
      <line
        x1={xOf(0)}
        y1={CY - 108}
        x2={xOf(0)}
        y2={CY - 122}
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

      <text x={x1 + 54} y={cym + 3} fontSize={10} fontWeight={700} fill={ACCENT}>
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

export function TauMaxExample1Animation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'data'
  const p = playing ? smooth(sceneProgress) : 1
  const draw = clamp01(p)
  const circleDraw = clamp01((draw - 0.08) / 0.92)
  const iCenter = 60
  const iRadius = 50
  const absCenter = 55
  const absRadius = 55

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 300"
          role="img"
          aria-label="Płaski stan naprężenia 90, 30 i 40 MPa, koło Mohra oraz porównanie płaskiego i absolutnego maksimum ścinania."
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
                płaski stan naprężenia
              </text>
              <text x={16} y={39} fontSize={8.5} fill={MUTED}>
                σ_x = 90 MPa · σ_y = 30 MPa · τ_xy = 40 MPa
              </text>
              <StressElement
                draw={draw}
                sx={90}
                sy={30}
                labelX="σ_x = 90 MPa"
                labelY="σ_y = 30 MPa"
                labelTau="τ_xy = 40 MPa"
              />
              <text x={16} y={282} fontSize={8.5} fill={MUTED}>
                Dodatnia wartość oznacza rozciąganie na danej ściance.
              </text>
            </g>
          ) : null}

          {metric !== 'data' ? (
            <g>
              <text x={16} y={22} fontSize={10.5} fontWeight={700} fill={INK}>
                {metric === 'circle'
                  ? 'koło Mohra w płaszczyźnie xy'
                  : metric === 'inplane'
                    ? 'płaskie maksimum ścinania'
                    : metric === 'absolute'
                      ? 'trzy koła Mohra'
                      : metric === 'directions'
                        ? 'płaszczyzna absolutnego maksimum'
                        : 'płaskie i absolutne maksimum'}
              </text>
              <text x={16} y={37} fontSize={8.5} fill={MUTED}>
                σ_x = 90 · σ_y = 30 · τ_xy = 40 · σ_z = 0 MPa
              </text>
              {metric !== 'directions' ? (
                <Axes
                  ticks={
                    metric === 'circle' || metric === 'absolute'
                      ? [
                          { value: 0, label: '0' },
                          { value: 60, label: '60' },
                        ]
                      : metric === 'result'
                        ? []
                        : [
                            { value: 0, label: '0' },
                            { value: 10, label: '10' },
                            { value: 60, label: '60' },
                            { value: 110, label: '110' },
                          ]
                  }
                />
              ) : null}
            </g>
          ) : null}

          {metric === 'circle' ? (
            <g>
              <Circle center={iCenter} radius={iRadius} draw={circleDraw} color={MOHR} width={2.4} delay={0} />
              <Radius
                center={iCenter}
                radius={iRadius}
                draw={circleDraw}
                color={MOHR}
                label="R = 50 MPa"
                labelX={xOf(iCenter) + 8}
                labelY={yOf(iRadius) + 12}
              />
              <circle cx={xOf(iCenter)} cy={CY} r={3.4} fill={INK} />
              <text x={xOf(iCenter)} y={CY + 32} textAnchor="middle" fontSize={9} fill={INK}>
                C = 60
              </text>
              <circle cx={xOf(110)} cy={CY} r={3.4} fill={ACCENT} />
              <circle cx={xOf(10)} cy={CY} r={3.4} fill={ACCENT} />
              <circle cx={xOf(0)} cy={CY} r={3.4} fill={SHEAR} />
              <text x={xOf(110)} y={CY - 12} textAnchor="middle" fontSize={9.5} fontWeight={700} fill={ACCENT}>
                σ₁ = 110
              </text>
              <text x={xOf(10)} y={CY - 12} textAnchor="middle" fontSize={9.5} fontWeight={700} fill={ACCENT}>
                σ₂ = 10
              </text>
              <text x={228} y={282} fontSize={8.5} fill={SHEAR}>
                zero leży poza przedziałem 10…110 MPa
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
                label="τ_max^(xy) = R = 50 MPa"
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
              <text x={xOf(iCenter) + 8} y={246} fontSize={9} fontWeight={700} fill={OK}>
                θ_s = θ_p ± 45°
              </text>
            </g>
          ) : null}

          {metric === 'absolute' ? (
            <g>
              <Circle center={iCenter} radius={iRadius} draw={circleDraw} color={MUTED} width={1.5} dashed delay={0} />
              <Circle center={5} radius={5} draw={circleDraw} color={MUTED} width={1.5} delay={0.12} />
              <Circle center={absCenter} radius={absRadius} draw={circleDraw} color={SHEAR} width={2.6} delay={0.24} />
              <Radius
                center={absCenter}
                radius={absRadius}
                draw={circleDraw}
                color={SHEAR}
                label="R_I,III = 55 MPa"
                labelX={xOf(absCenter) + 8}
                labelY={yOf(absRadius) + 4}
              />
              <circle cx={xOf(110)} cy={CY} r={3.4} fill={ACCENT} />
              <circle cx={xOf(10)} cy={CY} r={3.4} fill={ACCENT} />
              <circle cx={xOf(0)} cy={CY} r={3.4} fill={SHEAR} />
              <text x={xOf(110)} y={CY - 12} textAnchor="middle" fontSize={9.5} fontWeight={700} fill={ACCENT}>
                110
              </text>
              <text x={xOf(10)} y={CY - 12} textAnchor="middle" fontSize={9} fill={ACCENT}>
                10
              </text>
              <text x={xOf(absCenter)} y={CY + 32} textAnchor="middle" fontSize={9} fill={MUTED}>
                C = 55
              </text>
              <text x={16} y={282} fontSize={8.5} fill={SHEAR}>
                Największe koło obejmuje σ_I = 110 i σ_III = 0, a nie σ_II = 10.
              </text>
            </g>
          ) : null}

          {metric === 'directions' ? (
            <g>
              <rect
                x={102}
                y={118}
                width={100}
                height={100}
                fill={ACCENT}
                fillOpacity={0.05}
                stroke={EDGE}
                strokeWidth={1.4}
              />
              <line x1={72} y1={168} x2={232} y2={168} stroke={ACCENT} strokeWidth={1.6} strokeDasharray="5 4" />
              <line x1={152} y1={88} x2={152} y2={248} stroke={ACCENT} strokeWidth={1.6} strokeDasharray="5 4" />
              <motion.line
                x1={102}
                y1={218}
                x2={202}
                y2={118}
                stroke={SHEAR}
                strokeWidth={3}
                markerStart={`url(#${ARROW_SHEAR})`}
                markerEnd={`url(#${ARROW_SHEAR})`}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: draw }}
                transition={{ duration: 0.7, ease: 'easeInOut' }}
              />
              <path d="M 152 188 A 20 20 0 0 0 172 168" fill="none" stroke={OK} strokeWidth={1.5} />
              <text x={176} y={191} fontSize={9} fontWeight={700} fill={OK}>
                45°
              </text>
              <text x={205} y={112} fontSize={9.5} fontWeight={700} fill={SHEAR}>
                τ_abs = 55 MPa
              </text>
              <text x={80} y={244} fontSize={9} fill={ACCENT}>
                σ_I = 110
              </text>
              <text x={152} y={82} textAnchor="middle" fontSize={9} fill={ACCENT}>
                σ_III = 0
              </text>
              <circle cx={152} cy={168} r={3.2} fill={MUTED} />
              <text x={160} y={164} fontSize={8.5} fill={MUTED}>
                σ_II = 10 (poza płaszczyzną)
              </text>
              <text x={152} y={270} textAnchor="middle" fontSize={9} fill={INK}>
                σ_n = (110 + 0)/2 = 55 MPa
              </text>
              <text x={16} y={282} fontSize={8.5} fill={MUTED}>
                Płaszczyzna jest nachylona pod 45° do σ_I i σ_III.
              </text>
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
                label="τ_abs = 55"
                labelX={xOf(absCenter) - 7}
                labelY={yOf(absRadius) + 16}
              />
              <text x={xOf(absCenter) - 7} y={yOf(absRadius) + 28} textAnchor="end" fontSize={8.5} fill={SHEAR}>
                +5 MPa
              </text>
              <circle cx={xOf(110)} cy={CY} r={3.6} fill={ACCENT} />
              <circle cx={xOf(10)} cy={CY} r={3.2} fill={MOHR} />
              <circle cx={xOf(0)} cy={CY} r={3.2} fill={SHEAR} />
              <text x={xOf(110)} y={CY + 32} textAnchor="middle" fontSize={9.5} fontWeight={700} fill={ACCENT}>
                110
              </text>
              <text x={xOf(10)} y={CY + 32} textAnchor="middle" fontSize={8.5} fill={MOHR}>
                10
              </text>
              <text x={xOf(0)} y={CY + 32} textAnchor="middle" fontSize={8.5} fill={SHEAR}>
                0
              </text>
              <text x={222} y={250} fontSize={9} fill={MUTED}>
                R = 50 MPa · τ_abs = 55 MPa
              </text>
              <text x={222} y={265} fontSize={9} fontWeight={700} fill={SHEAR}>
                różnica 5 MPa, czyli 9,1%
              </text>
              <text x={16} y={282} fontSize={8.5} fill={MUTED}>
                Wspólny koniec 110; zero wydłuża średnicę koła absolutnego.
              </text>
            </g>
          ) : null}
        </svg>
      </div>
    </div>
  )
}
