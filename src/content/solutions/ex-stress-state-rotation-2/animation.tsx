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

const stressLength = (value: number) => (Math.abs(value) < 0.1 ? 0 : Math.min(76, 16 + Math.abs(value) * 0.95))

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
      <line x1={x} y1={y} x2={tx} y2={ty} stroke={color} strokeWidth={width} strokeLinecap="round" />
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

function MiniElement({
  cx,
  cy,
  half,
  angle,
  mode,
  label,
  sub,
}: {
  cx: number
  cy: number
  half: number
  angle: number
  mode: 'shear' | 'normal'
  label: string
  sub: string
}) {
  const cos = Math.cos(angle)
  const sin = Math.sin(angle)
  const n = [cos, -sin] as const
  const t = [-sin, -cos] as const
  const right = [cx + half * cos, cy - half * sin] as const
  const top = [cx - half * sin, cy - half * cos] as const
  const corners = [
    [cx - half * cos - half * sin, cy + half * sin - half * cos],
    [cx + half * cos - half * sin, cy + half * sin - half * cos],
    [cx + half * cos + half * sin, cy + half * sin + half * cos],
    [cx - half * cos + half * sin, cy + half * sin + half * cos],
  ]
    .map((point) => point.join(','))
    .join(' ')

  return (
    <g>
      <polygon points={corners} fill="#f7f9fd" stroke={EDGE} strokeWidth={1.3} />
      {mode === 'shear' ? (
        <g>
          <Arrow
            x={right[0]}
            y={right[1]}
            ux={t[0]}
            uy={t[1]}
            length={25}
            color={ORANGE}
            width={2.2}
            label="τ"
            labelDx={9}
            labelDy={1}
            labelAnchor="start"
          />
          <Arrow
            x={top[0]}
            y={top[1]}
            ux={n[0]}
            uy={n[1]}
            length={25}
            color={ORANGE}
            width={2.2}
            label="τ"
            labelDy={-7}
          />
        </g>
      ) : (
        <g>
          <Arrow
            x={right[0]}
            y={right[1]}
            ux={n[0]}
            uy={n[1]}
            length={26}
            color={BLUE}
            width={2.2}
            label="+50"
            labelDx={8}
            labelAnchor="start"
          />
          <Arrow
            x={top[0] + t[0] * 26}
            y={top[1] + t[1] * 26}
            ux={-t[0]}
            uy={-t[1]}
            length={26}
            color={GREEN}
            width={2.2}
            label="−50"
            labelDx={-6}
            labelDy={-6}
            labelAnchor="end"
          />
        </g>
      )}
      <text x={cx} y={cy + half + 30} textAnchor="middle" fontSize={10} fontWeight={600} fill={INK}>
        {label}
      </text>
      <text x={cx} y={cy + half + 44} textAnchor="middle" fontSize={9} fill={MUTED}>
        {sub}
      </text>
    </g>
  )
}

export function StressRotationExample2Animation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const p = playing ? smooth(sceneProgress) : 1
  const target = 45 * RAD
  const angle = metric === 'rotate' ? target * p : metric === 'model' ? 0 : target
  const cos = Math.cos(angle)
  const sin = Math.sin(angle)
  const n = [cos, -sin] as const
  const t = [-sin, -cos] as const

  const rightFace = [CX + HALF * cos, CY - HALF * sin] as const
  const topFace = [CX - HALF * sin, CY - HALF * cos] as const
  const planeStart = [CX - t[0] * 100, CY - t[1] * 100] as const
  const planeEnd = [CX + t[0] * 100, CY + t[1] * 100] as const
  const arcEnd = [CX + 38 * cos, CY - 38 * sin] as const

  const tauXY = 50
  const sigmaN = 50
  const sigmaT = -50
  const amp = metric === 'components' ? p : 1
  const isMohr = metric === 'mohr'
  const isCheck = metric === 'check'
  const showCube = !isMohr && !isCheck
  const showComponents = metric === 'components'
  const liveSigma = sigmaN * Math.sin(2 * angle)
  const liveTau = sigmaN * Math.cos(2 * angle)

  const mohrCx = 265
  const mohrCy = 162
  const mohrScale = 1.25
  const mohrR = sigmaN * mohrScale
  const thetaMohr = target * p
  const sigmaPoint = sigmaN * Math.sin(2 * thetaMohr)
  const tauPoint = sigmaN * Math.cos(2 * thetaMohr)

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 480 330"
          role="img"
          aria-label="Czyste ścinanie o τxy równym 50 megapaskali. Animacja pokazuje obrót przekroju o 45 stopni, przejście ścinania w rozciąganie i ściskanie oraz punkt na kole Mohra."
        >
          <defs>
            <marker
              id="ssr2-axis"
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
            σx = σy = 0 · τxy = 50 MPa
          </text>
          <text x={14} y={38} fontSize={9.5} fill={VIOLET} fontWeight={600}>
            θ = 45°
          </text>

          {showCube && <Cube opacity={showComponents ? 0.45 : 1} />}

          {showCube && (metric === 'rotate' || metric === 'components') && (
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
              <Arrow x={CX} y={CY} ux={n[0]} uy={n[1]} length={62} color={VIOLET} label="n" />
              <Arrow x={CX} y={CY} ux={t[0]} uy={t[1]} length={62} color={VIOLET} label="t" labelDx={2} labelDy={8} />
              {metric === 'rotate' && (
                <g>
                  <path
                    d={`M ${CX + 38} ${CY} A 38 38 0 0 0 ${arcEnd[0]} ${arcEnd[1]}`}
                    fill="none"
                    stroke={VIOLET}
                    strokeWidth={1.5}
                  />
                  <text x={CX + 45} y={CY - 18} fontSize={10} fontWeight={600} fill={VIOLET}>
                    θ
                  </text>
                </g>
              )}
            </g>
          )}

          {metric === 'model' && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>
              <Arrow
                x={rightFace[0] + n[0] * 11}
                y={rightFace[1] + n[1] * 11}
                ux={t[0]}
                uy={t[1]}
                length={stressLength(tauXY)}
                color={ORANGE}
                width={2.4}
                label="τxy"
                labelDx={8}
                labelDy={3}
                labelAnchor="start"
              />
              <Arrow
                x={topFace[0] + t[0] * 11}
                y={topFace[1] + t[1] * 11}
                ux={n[0]}
                uy={n[1]}
                length={stressLength(tauXY)}
                color={ORANGE}
                width={2.4}
                label="τxy"
                labelDy={-8}
              />
              <text x={rightFace[0] + 8} y={rightFace[1] + 18} fontSize={9} fill={MUTED}>
                σx = 0
              </text>
              <text x={topFace[0] - 10} y={topFace[1] - 8} textAnchor="end" fontSize={9} fill={MUTED}>
                σy = 0
              </text>
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
                width={2.6}
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
                x={topFace[0] + (liveSigma >= 0 ? -t[0] : t[0]) * stressLength(liveSigma)}
                y={topFace[1] + (liveSigma >= 0 ? -t[1] : t[1]) * stressLength(liveSigma)}
                ux={liveSigma >= 0 ? -t[0] : t[0]}
                uy={liveSigma >= 0 ? -t[1] : t[1]}
                length={stressLength(liveSigma)}
                color={GREEN}
                width={2}
                label="σt(θ)"
                labelDx={-5}
                labelDy={-5}
                labelAnchor="end"
              />
            </motion.g>
          )}

          {showComponents && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>
              <Arrow
                x={rightFace[0]}
                y={rightFace[1]}
                ux={n[0]}
                uy={n[1]}
                length={stressLength(sigmaN) * amp}
                color={BLUE}
                width={2.8}
                label="σn = +50"
                labelDx={7}
                labelDy={-4}
                labelAnchor="start"
              />
              <Arrow
                x={topFace[0] + t[0] * stressLength(Math.abs(sigmaT)) * amp}
                y={topFace[1] + t[1] * stressLength(Math.abs(sigmaT)) * amp}
                ux={-t[0]}
                uy={-t[1]}
                length={stressLength(Math.abs(sigmaT)) * amp}
                color={GREEN}
                width={2.8}
                label="σt = −50"
                labelDx={-7}
                labelDy={-6}
                labelAnchor="end"
              />
              <text x={CX + 12} y={CY + 6} fontSize={9.5} fill={ORANGE} fontWeight={600}>
                τnt = 0
              </text>
            </motion.g>
          )}

          {isMohr && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>
              <line
                x1={mohrCx - mohrR - 34}
                y1={mohrCy}
                x2={mohrCx + mohrR + 34}
                y2={mohrCy}
                stroke={MUTED}
                strokeWidth={1}
                markerEnd="url(#ssr2-axis)"
              />
              <line
                x1={mohrCx}
                y1={mohrCy + mohrR + 26}
                x2={mohrCx}
                y2={mohrCy - mohrR - 26}
                stroke={MUTED}
                strokeWidth={1}
                markerEnd="url(#ssr2-axis)"
              />
              <text x={mohrCx + mohrR + 38} y={mohrCy + 4} fontSize={9} fill={MUTED}>
                σ
              </text>
              <text x={mohrCx + 6} y={mohrCy - mohrR - 30} fontSize={9} fill={MUTED}>
                τ
              </text>
              <circle cx={mohrCx} cy={mohrCy} r={mohrR} fill="none" stroke={VIOLET} strokeWidth={1.8} />
              <circle cx={mohrCx} cy={mohrCy} r={2.5} fill={MUTED} />
              <text x={mohrCx - 6} y={mohrCy + 15} textAnchor="end" fontSize={8.5} fill={MUTED}>
                C = 0
              </text>
              <line
                x1={mohrCx}
                y1={mohrCy}
                x2={mohrCx + sigmaPoint * mohrScale}
                y2={mohrCy - tauPoint * mohrScale}
                stroke={ORANGE}
                strokeWidth={1.6}
              />
              <circle cx={mohrCx} cy={mohrCy - mohrR} r={4} fill={BLUE} fillOpacity={0.4} />
              <circle cx={mohrCx + mohrR} cy={mohrCy} r={4} fill={GREEN} fillOpacity={0.4} />
              <text x={mohrCx + 6} y={mohrCy - mohrR - 8} fontSize={8.5} fill={BLUE}>
                θ = 0: (0, 50)
              </text>
              <text x={mohrCx + mohrR + 4} y={mohrCy - 8} fontSize={8.5} fill={GREEN}>
                θ = 45°: (50, 0)
              </text>
              <motion.circle
                cx={mohrCx + sigmaPoint * mohrScale}
                cy={mohrCy - tauPoint * mohrScale}
                r={5.5}
                fill={ORANGE}
                initial={false}
                animate={{ cx: mohrCx + sigmaPoint * mohrScale, cy: mohrCy - tauPoint * mohrScale }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <text x={mohrCx - 4} y={mohrCy + mohrR + 22} textAnchor="middle" fontSize={9} fill={MUTED}>
                R = 50 MPa
              </text>
            </motion.g>
          )}

          {isCheck && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
              <MiniElement cx={140} cy={132} half={32} angle={0} mode="shear" label="θ = 0°" sub="tylko ścinanie" />
              <MiniElement
                cx={345}
                cy={132}
                half={32}
                angle={45 * RAD}
                mode="normal"
                label="θ = 45°"
                sub="rozciąganie i ściskanie"
              />
              <line x1={235} y1={92} x2={250} y2={162} stroke={VIOLET} strokeWidth={1.4} strokeDasharray="5 4" />
              <text x={240} y={78} textAnchor="middle" fontSize={9} fill={VIOLET}>
                ten sam stan
              </text>
            </motion.g>
          )}
        </svg>
      </div>
    </div>
  )
}
