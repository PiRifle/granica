import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const BLUE = '#4f6df5'
const ORANGE = '#ff6b45'
const VIOLET = '#a970dd'
const GREEN = '#2e9e6b'
const MUTED = '#87929d'
const EDGE = '#68727e'
const INK = '#17202a'

const CX = 205
const CY = 150
const HALF = 48
const DX = 28
const DY = 18
const RAD = Math.PI / 180

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}

const stressLength = (value: number) => (Math.abs(value) < 0.1 ? 0 : Math.min(76, 14 + Math.abs(value) * 0.75))

function Arrow({
  x,
  y,
  ux,
  uy,
  length,
  color,
  width = 2,
  label,
  labelDx = 0,
  labelDy = 0,
  labelAnchor = 'middle',
  dashed = false,
}: {
  x: number
  y: number
  ux: number
  uy: number
  length: number
  color: string
  width?: number
  label?: string
  labelDx?: number
  labelDy?: number
  labelAnchor?: 'start' | 'middle' | 'end'
  dashed?: boolean
}) {
  if (length <= 1) return null
  const len = Math.min(length, 190)
  const tx = x + ux * len
  const ty = y + uy * len
  const px = -uy
  const py = ux
  const head = Math.min(9, len * 0.45)
  const bx = tx - ux * head
  const by = ty - uy * head
  return (
    <g>
      <line
        x1={x}
        y1={y}
        x2={tx}
        y2={ty}
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
        strokeDasharray={dashed ? '5 4' : undefined}
      />
      {len > 6 && (
        <path
          d={`M ${bx + px * head * 0.55} ${by + py * head * 0.55} L ${tx} ${ty} L ${bx - px * head * 0.55} ${by - py * head * 0.55}`}
          fill="none"
          stroke={color}
          strokeWidth={width}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
      {label && (
        <text
          x={tx + ux * 9 + labelDx}
          y={ty + uy * 9 + labelDy}
          textAnchor={labelAnchor}
          fontSize={9.5}
          fontWeight={600}
          fill={color}
        >
          {label}
        </text>
      )}
    </g>
  )
}

function Cube({ opacity = 1 }: { opacity?: number }) {
  const tl = [CX - HALF, CY - HALF]
  const tr = [CX + HALF, CY - HALF]
  const br = [CX + HALF, CY + HALF]
  const bl = [CX - HALF, CY + HALF]
  const top = (point: number[]) => `${point[0] + DX},${point[1] - DY}`

  return (
    <g opacity={opacity}>
      <polygon
        points={`${tl[0]},${tl[1]} ${top(tl)} ${top(tr)} ${tr[0]},${tr[1]}`}
        fill="#edf1ff"
        stroke={EDGE}
        strokeWidth={1.3}
      />
      <polygon
        points={`${tr[0]},${tr[1]} ${top(tr)} ${top(br)} ${br[0]},${br[1]}`}
        fill="#e6ecf7"
        stroke={EDGE}
        strokeWidth={1.3}
      />
      <polygon
        points={`${tl[0]},${tl[1]} ${tr[0]},${tr[1]} ${br[0]},${br[1]} ${bl[0]},${bl[1]}`}
        fill="#f7f9fd"
        stroke={EDGE}
        strokeWidth={1.5}
      />
    </g>
  )
}

function InvariantBars({ progress }: { progress: number }) {
  const x = 100
  const scale = 2.4
  const sigmaN = 70
  const sigmaT = 10
  const total = 80
  const barHeight = 13
  const width = total * scale

  return (
    <g>
      <text x={x - 8} y={269} textAnchor="end" fontSize={9} fill={MUTED}>
        σn + σt
      </text>
      <rect x={x} y={260} width={width} height={barHeight} fill="#eef2f8" stroke="#c9d0d9" />
      <motion.rect
        x={x}
        y={260}
        height={barHeight}
        fill={BLUE}
        fillOpacity={0.75}
        initial={{ width: 0 }}
        animate={{ width: sigmaN * scale * progress }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      />
      <motion.rect
        x={x + sigmaN * scale}
        y={260}
        height={barHeight}
        fill={GREEN}
        fillOpacity={0.75}
        initial={{ width: 0 }}
        animate={{ width: sigmaT * scale * progress }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      />
      <text x={x + 8} y={269} fontSize={8.5} fill="#ffffff" fontWeight={600}>
        70
      </text>
      <text x={x + sigmaN * scale + 5} y={269} fontSize={8.5} fill="#ffffff" fontWeight={600}>
        10
      </text>
      <text x={x + width + 8} y={269} fontSize={9} fill={INK}>
        80 MPa
      </text>

      <text x={x - 8} y={297} textAnchor="end" fontSize={9} fill={MUTED}>
        σx + σy
      </text>
      <rect x={x} y={288} width={width} height={barHeight} fill="#eef2f8" stroke="#c9d0d9" />
      <motion.rect
        x={x}
        y={288}
        height={barHeight}
        fill={BLUE}
        fillOpacity={0.45}
        initial={{ width: 0 }}
        animate={{ width: total * scale * progress }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      />
      <text x={x + 8} y={297} fontSize={8.5} fill={INK} fontWeight={600}>
        σx = 80
      </text>
      <text x={x + width - 8} y={297} textAnchor="end" fontSize={8.5} fill={INK} fontWeight={600}>
        σy = 0
      </text>
      <text x={x + width + 8} y={297} fontSize={9} fill={INK}>
        80 MPa
      </text>
    </g>
  )
}

export function StressRotationExample3Animation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const p = playing ? smooth(sceneProgress) : 1
  const target = 45 * RAD
  const angle = metric === 'rotate' ? target * p : metric === 'solve' || metric === 'model' ? 0 : target
  const cos = Math.cos(angle)
  const sin = Math.sin(angle)
  const n = [cos, -sin] as const
  const t = [-sin, -cos] as const

  const rightFace = [CX + HALF * cos, CY - HALF * sin] as const
  const topFace = [CX - HALF * sin, CY - HALF * cos] as const
  const planeStart = [CX - t[0] * 100, CY - t[1] * 100] as const
  const planeEnd = [CX + t[0] * 100, CY + t[1] * 100] as const
  const arcEnd = [CX + 38 * cos, CY - 38 * sin] as const

  const sigmaN = 70
  const sigmaT = 10
  const tauNT = -40
  const sigmaX = 80
  const tauXY = 30
  const amp = metric === 'components' ? p : 1
  const liveSigma = 40 + 40 * Math.cos(2 * angle) + tauXY * Math.sin(2 * angle)
  const liveSigmaT = 40 - 40 * Math.cos(2 * angle) - tauXY * Math.sin(2 * angle)
  const liveTau = -40 * Math.sin(2 * angle) + tauXY * Math.cos(2 * angle)

  const measurement45 = [CX + 108 * Math.SQRT1_2, CY - 108 * Math.SQRT1_2] as const
  const sigmaYLength = metric === 'solve' ? 34 * (1 - p) : 0

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 480 330"
          role="img"
          aria-label="Odtwarzanie stanu naprężenia z dwóch pomiarów pod kątem 0 i 45 stopni. Animacja pokazuje obrót przekroju, wyznaczenie σy równego zero oraz kontrolę sumy naprężeń normalnych."
        >
          <defs>
            <marker
              id="ssr3-axis"
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

          <text x={14} y={22} fontSize={9.5} fill={MUTED}>
            θ = 0°: σ = 80 MPa, τ = 30 MPa
          </text>
          <text x={14} y={38} fontSize={9.5} fill={MUTED}>
            θ = 45°: σ = 70 MPa
          </text>

          <Cube opacity={metric === 'components' || metric === 'check' ? 0.45 : 1} />

          {(metric === 'model' || metric === 'rotate') && (
            <g>
              <line
                x1={CX}
                y1={CY}
                x2={CX + 108}
                y2={CY}
                stroke={VIOLET}
                strokeWidth={1.4}
                strokeDasharray="6 4"
                markerEnd="url(#ssr3-axis)"
              />
              <line
                x1={CX}
                y1={CY}
                x2={measurement45[0]}
                y2={measurement45[1]}
                stroke={VIOLET}
                strokeWidth={1.4}
                strokeDasharray="6 4"
                markerEnd="url(#ssr3-axis)"
              />
              <text x={CX + 114} y={CY + 18} fontSize={8.5} fill={VIOLET}>
                pomiar 0°
              </text>
              <text x={measurement45[0] + 6} y={measurement45[1] - 4} fontSize={8.5} fill={VIOLET}>
                pomiar 45°
              </text>
            </g>
          )}

          {metric === 'rotate' && (
            <g>
              <line
                x1={planeStart[0]}
                y1={planeStart[1]}
                x2={planeEnd[0]}
                y2={planeEnd[1]}
                stroke={VIOLET}
                strokeWidth={2}
                strokeDasharray="7 5"
              />
              <Arrow x={CX} y={CY} ux={n[0]} uy={n[1]} length={60} color={VIOLET} label="n" />
              <path
                d={`M ${CX + 38} ${CY} A 38 38 0 0 0 ${arcEnd[0]} ${arcEnd[1]}`}
                fill="none"
                stroke={VIOLET}
                strokeWidth={1.5}
              />
              <text x={CX + 45} y={CY - 18} fontSize={10} fontWeight={600} fill={VIOLET}>
                θ
              </text>
              <Arrow
                x={rightFace[0]}
                y={rightFace[1]}
                ux={n[0]}
                uy={n[1]}
                length={stressLength(liveSigma)}
                color={BLUE}
                width={2.5}
                label="σn(θ)"
                labelDx={7}
                labelDy={-4}
                labelAnchor="start"
              />
              <Arrow
                x={rightFace[0] + n[0] * 12}
                y={rightFace[1] + n[1] * 12}
                ux={liveTau >= 0 ? t[0] : -t[0]}
                uy={liveTau >= 0 ? t[1] : -t[1]}
                length={stressLength(liveTau)}
                color={ORANGE}
                width={2.4}
                label="τnt(θ)"
                labelDx={7}
                labelDy={8}
                labelAnchor="start"
              />
              <Arrow
                x={topFace[0]}
                y={topFace[1]}
                ux={t[0]}
                uy={t[1]}
                length={stressLength(liveSigmaT)}
                color={GREEN}
                width={2}
                label="σt(θ)"
                labelDx={-5}
                labelDy={-5}
                labelAnchor="end"
              />
            </g>
          )}

          {(metric === 'model' || metric === 'solve') && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>
              <Arrow
                x={rightFace[0]}
                y={rightFace[1]}
                ux={1}
                uy={0}
                length={stressLength(sigmaX)}
                color={BLUE}
                label="σx = 80"
                labelDy={-6}
              />
              <Arrow
                x={rightFace[0] + 11}
                y={rightFace[1]}
                ux={t[0]}
                uy={t[1]}
                length={stressLength(tauXY)}
                color={ORANGE}
                label="τxy = 30"
                labelDx={8}
                labelDy={2}
                labelAnchor="start"
              />
              {metric === 'model' ? (
                <g>
                  <Arrow
                    x={topFace[0]}
                    y={topFace[1]}
                    ux={t[0]}
                    uy={t[1]}
                    length={42}
                    color={MUTED}
                    dashed
                    label="σy = ?"
                    labelDx={10}
                  />
                  <Arrow
                    x={topFace[0] + t[0] * 11}
                    y={topFace[1] + t[1] * 11}
                    ux={n[0]}
                    uy={n[1]}
                    length={stressLength(tauXY)}
                    color={ORANGE}
                  />
                </g>
              ) : (
                <g>
                  <Arrow x={topFace[0]} y={topFace[1]} ux={t[0]} uy={t[1]} length={sigmaYLength} color={MUTED} dashed />
                  <text x={topFace[0] + 10} y={topFace[1] - 18} fontSize={10} fontWeight={600} fill={GREEN}>
                    σy → 0
                  </text>
                  <text x={CX + 12} y={CY + 168} textAnchor="middle" fontSize={9.5} fill={VIOLET}>
                    pomiar 45°: σ = 70 MPa
                  </text>
                </g>
              )}
            </motion.g>
          )}

          {metric === 'components' && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>
              <Arrow
                x={rightFace[0]}
                y={rightFace[1]}
                ux={n[0]}
                uy={n[1]}
                length={stressLength(sigmaN) * amp}
                color={BLUE}
                width={2.6}
                label="σn = 70"
                labelDx={8}
                labelDy={-4}
                labelAnchor="start"
              />
              <Arrow
                x={rightFace[0] + n[0] * 12}
                y={rightFace[1] + n[1] * 12}
                ux={-t[0]}
                uy={-t[1]}
                length={stressLength(Math.abs(tauNT)) * amp}
                color={ORANGE}
                width={2.4}
                label="τnt = −40"
                labelDx={8}
                labelDy={8}
                labelAnchor="start"
              />
              <Arrow
                x={topFace[0]}
                y={topFace[1]}
                ux={t[0]}
                uy={t[1]}
                length={stressLength(sigmaT) * amp}
                color={GREEN}
                width={2.2}
                label="σt = 10"
                labelDx={-6}
                labelDy={-5}
                labelAnchor="end"
              />
              <text x={measurement45[0] - 6} y={measurement45[1] + 14} textAnchor="middle" fontSize={8.5} fill={VIOLET}>
                σ(45°) = 70
              </text>
            </motion.g>
          )}

          {metric === 'check' && <InvariantBars progress={p} />}
        </svg>
      </div>
    </div>
  )
}
