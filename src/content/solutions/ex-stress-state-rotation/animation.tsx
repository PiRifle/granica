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
const LIGHT = '#dfe6f2'

const CX = 200
const CY = 150
const HALF = 46
const DX = 28
const DY = 18
const RAD = Math.PI / 180

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}

const stressLength = (value: number) => (Math.abs(value) < 0.1 ? 0 : Math.min(72, 14 + Math.abs(value) * 0.42))

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
  const scale = 1.5
  const sigmaN = 125.98
  const sigmaT = 34.02
  const sigmaX = 120
  const sigmaY = 40
  const total = 160
  const barHeight = 13

  return (
    <g>
      <text x={x - 8} y={269} textAnchor="end" fontSize={9} fill={MUTED}>
        σn + σt
      </text>
      <rect x={x} y={260} width={total * scale} height={barHeight} fill="#eef2f8" stroke="#c9d0d9" />
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
        σn
      </text>
      <text x={x + sigmaN * scale + 6} y={269} fontSize={8.5} fill="#ffffff" fontWeight={600}>
        σt
      </text>
      <text x={x + total * scale + 8} y={269} fontSize={9} fill={INK}>
        160 MPa
      </text>

      <text x={x - 8} y={297} textAnchor="end" fontSize={9} fill={MUTED}>
        σx + σy
      </text>
      <rect x={x} y={288} width={total * scale} height={barHeight} fill="#eef2f8" stroke="#c9d0d9" />
      <motion.rect
        x={x}
        y={288}
        height={barHeight}
        fill={BLUE}
        fillOpacity={0.45}
        initial={{ width: 0 }}
        animate={{ width: sigmaX * scale * progress }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      />
      <motion.rect
        x={x + sigmaX * scale}
        y={288}
        height={barHeight}
        fill={GREEN}
        fillOpacity={0.45}
        initial={{ width: 0 }}
        animate={{ width: sigmaY * scale * progress }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      />
      <text x={x + 8} y={297} fontSize={8.5} fill={INK} fontWeight={600}>
        σx
      </text>
      <text x={x + sigmaX * scale + 6} y={297} fontSize={8.5} fill={INK} fontWeight={600}>
        σy
      </text>
      <text x={x + total * scale + 8} y={297} fontSize={9} fill={INK}>
        160 MPa
      </text>
    </g>
  )
}

export function StressRotationExample1Animation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const p = playing ? smooth(sceneProgress) : 1
  const target = 30 * RAD
  const rotated = metric !== 'model'
  const angle = metric === 'rotate' ? target * p : rotated ? target : 0
  const cos = Math.cos(angle)
  const sin = Math.sin(angle)
  const n = [cos, -sin] as const
  const t = [-sin, -cos] as const

  const rightFace = [CX + HALF * cos, CY - HALF * sin] as const
  const topFace = [CX - HALF * sin, CY - HALF * cos] as const
  const planeStart = [CX - t[0] * 96, CY - t[1] * 96] as const
  const planeEnd = [CX + t[0] * 96, CY + t[1] * 96] as const

  const sigmaN = 125.98
  const sigmaT = 34.02
  const tauNT = -19.64
  const sigmaX = 120
  const sigmaY = 40
  const tauXY = 30
  const amp = metric === 'components' ? p : 1
  const showComponents = metric === 'components' || metric === 'check'
  const liveSigma = 80 + 40 * Math.cos(2 * angle) + tauXY * Math.sin(2 * angle)
  const liveSigmaT = 80 - 40 * Math.cos(2 * angle) - tauXY * Math.sin(2 * angle)
  const liveTau = -40 * Math.sin(2 * angle) + tauXY * Math.cos(2 * angle)

  const arcEnd = [CX + 36 * cos, CY - 36 * sin] as const

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 480 330"
          role="img"
          aria-label="Element naprężenia obracany w płaszczyźnie xy o kąt 30 stopni. Animacja pokazuje płaszczyznę przekroju, kierunki n i t oraz zmieniające się składowe naprężenia."
        >
          <defs>
            <marker
              id="ssr1-arc"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={VIOLET} />
            </marker>
          </defs>

          <text x={14} y={22} fontSize={9.5} fill={MUTED}>
            σx = 120 MPa · σy = 40 MPa · τxy = 30 MPa
          </text>
          <text x={14} y={38} fontSize={9.5} fill={VIOLET} fontWeight={600}>
            θ = 30°
          </text>

          <Cube opacity={showComponents || metric === 'check' ? 0.45 : 1} />

          {(metric === 'rotate' || metric === 'decompose') && (
            <g>
              <line
                x1={CX - 100}
                y1={CY}
                x2={CX + 100}
                y2={CY}
                stroke={MUTED}
                strokeWidth={1}
                strokeDasharray="4 3"
                markerEnd="url(#ssr1-arc)"
              />
              <line
                x1={CX}
                y1={CY}
                x2={CX}
                y2={CY - 100}
                stroke={MUTED}
                strokeWidth={1}
                strokeDasharray="4 3"
                markerEnd="url(#ssr1-arc)"
              />
              <text x={CX + 106} y={CY + 4} fontSize={9} fill={MUTED}>
                x
              </text>
              <text x={CX + 5} y={CY - 106} fontSize={9} fill={MUTED}>
                y
              </text>
            </g>
          )}

          {rotated && (
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
              <Arrow x={CX} y={CY} ux={n[0]} uy={n[1]} length={64} color={VIOLET} width={2} label="n" />
              {metric === 'rotate' && (
                <g>
                  <path
                    d={`M ${CX + 36} ${CY} A 36 36 0 0 0 ${arcEnd[0]} ${arcEnd[1]}`}
                    fill="none"
                    stroke={VIOLET}
                    strokeWidth={1.5}
                  />
                  <text x={CX + 43} y={CY - 17} fontSize={10} fontWeight={600} fill={VIOLET}>
                    θ
                  </text>
                </g>
              )}
              {metric !== 'rotate' && (
                <polygon
                  points={[
                    [CX - HALF * cos - HALF * sin, CY + HALF * sin - HALF * cos],
                    [CX + HALF * cos - HALF * sin, CY + HALF * sin - HALF * cos],
                    [CX + HALF * cos + HALF * sin, CY + HALF * sin + HALF * cos],
                    [CX - HALF * cos + HALF * sin, CY + HALF * sin + HALF * cos],
                  ]
                    .map((point) => point.join(','))
                    .join(' ')}
                  fill="none"
                  stroke={VIOLET}
                  strokeWidth={1.2}
                  strokeDasharray="5 4"
                  opacity={0.8}
                />
              )}
            </g>
          )}

          {metric === 'model' && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <Arrow
                x={rightFace[0]}
                y={rightFace[1]}
                ux={1}
                uy={0}
                length={stressLength(sigmaX)}
                color={BLUE}
                label="σx"
                labelDy={-6}
              />
              <Arrow
                x={topFace[0]}
                y={topFace[1]}
                ux={0}
                uy={-1}
                length={stressLength(sigmaY)}
                color={GREEN}
                label="σy"
                labelDx={10}
              />
              <Arrow
                x={rightFace[0] + n[0] * 10}
                y={rightFace[1] + n[1] * 10}
                ux={t[0]}
                uy={t[1]}
                length={stressLength(tauXY)}
                color={ORANGE}
                label="τxy"
                labelDx={8}
                labelDy={4}
              />
              <Arrow
                x={topFace[0] + t[0] * 10}
                y={topFace[1] + t[1] * 10}
                ux={n[0]}
                uy={n[1]}
                length={stressLength(tauXY)}
                color={ORANGE}
                label="τxy"
                labelDy={-8}
              />
            </motion.g>
          )}

          {metric === 'rotate' && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
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
                width={1.8}
                label="σt(θ)"
                labelDx={-5}
                labelDy={-5}
                labelAnchor="end"
              />
            </motion.g>
          )}

          {showComponents && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <Arrow
                x={rightFace[0]}
                y={rightFace[1]}
                ux={n[0]}
                uy={n[1]}
                length={stressLength(sigmaN) * amp}
                color={BLUE}
                width={2.6}
                label="σn"
                labelDx={8}
                labelDy={-4}
                labelAnchor="start"
              />
              <Arrow
                x={rightFace[0] + n[0] * 12}
                y={rightFace[1] + n[1] * 12}
                ux={-t[0]}
                uy={-t[1]}
                length={stressLength(tauNT) * amp}
                color={ORANGE}
                label="τnt"
                labelDx={7}
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
                width={2.4}
                label="σt"
                labelDx={-5}
                labelDy={-5}
                labelAnchor="end"
              />
              <Arrow
                x={topFace[0] + t[0] * 12}
                y={topFace[1] + t[1] * 12}
                ux={n[0]}
                uy={n[1]}
                length={stressLength(tauNT) * amp}
                color={ORANGE}
                label=""
              />
              <text
                x={planeEnd[0] + 6}
                y={planeEnd[1] + 4}
                fontSize={8.5}
                fill={VIOLET}
                transform={`rotate(${-angle / RAD} ${planeEnd[0] + 6} ${planeEnd[1] + 4})`}
              >
                przekrój n
              </text>
            </motion.g>
          )}

          {metric === 'decompose' && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
              <line x1={126} y1={282} x2={318} y2={282} stroke="#c9d0d9" strokeWidth={1.3} />
              {[40, 80, 120].map((value) => {
                const px = 100 + value * 1.6
                return (
                  <g key={value}>
                    <line x1={px} y1={276} x2={px} y2={288} stroke={MUTED} strokeWidth={1.2} />
                    <circle cx={px} cy={282} r={3} fill={value === 80 ? VIOLET : BLUE} />
                    <text x={px} y={300} textAnchor="middle" fontSize={9} fill={MUTED}>
                      {value}
                    </text>
                  </g>
                )
              })}
              <line x1={228} y1={276} x2={292} y2={276} stroke={ORANGE} strokeWidth={1.4} />
              <line x1={228} y1={270} x2={228} y2={282} stroke={ORANGE} strokeWidth={1.2} />
              <line x1={292} y1={270} x2={292} y2={282} stroke={ORANGE} strokeWidth={1.2} />
              <text x={260} y={268} textAnchor="middle" fontSize={9} fill={ORANGE}>
                a = 40 MPa
              </text>
              <text x={228} y={316} textAnchor="middle" fontSize={9} fill={VIOLET} fontWeight={600}>
                σavg = 80 MPa
              </text>
            </motion.g>
          )}

          {metric === 'check' && <InvariantBars progress={p} />}
        </svg>
      </div>
    </div>
  )
}
