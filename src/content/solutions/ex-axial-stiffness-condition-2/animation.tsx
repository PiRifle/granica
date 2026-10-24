import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const ALU = '#ff8a5c'
const LOAD = '#ff6b45'
const MUTED = '#87929d'
const SUPPORT = '#68727e'
const OK = '#2f7d5b'
const BAD = '#d64545'

const clamp01 = (value: number) => Math.max(0, Math.min(1, value))
const easeOut = (value: number) => 1 - Math.pow(1 - clamp01(value), 3)
const pl = (value: number, digits = 2) => value.toFixed(digits).replace('.', ',')

type SteppedBarProps = {
  centerX: number
  top: number
  baseBoundary: number
  baseBottom: number
  pxPerMm: number
  area1: number
  area2: number
  delta1: number
  delta2: number
  color1: string
  color2: string
  label1: string
  label2: string
  title: string
  titleColor: string
  referenceHalfWidth2?: number
  showForce?: boolean
  showContributions?: boolean
  showTotal?: boolean
  totalColor?: string
  totalWeight?: number
}

function SteppedBar({
  centerX,
  top,
  baseBoundary,
  baseBottom,
  pxPerMm,
  area1,
  area2,
  delta1,
  delta2,
  color1,
  color2,
  label1,
  label2,
  title,
  titleColor,
  referenceHalfWidth2,
  showForce = false,
  showContributions = false,
  showTotal = false,
  totalColor = MUTED,
  totalWeight = 600,
}: SteppedBarProps) {
  const half1 = 22 * Math.sqrt(area1 / 300)
  const half2 = 22 * Math.sqrt(area2 / 300)
  const maxHalf = Math.max(half1, half2)
  const boundaryY = baseBoundary + delta1 * pxPerMm
  const bottomY = baseBottom + (delta1 + delta2) * pxPerMm
  const total = delta1 + delta2
  const forceX = centerX - maxHalf - 22

  return (
    <g>
      <text x={centerX} y={top - 26} textAnchor="middle" fontSize={9.5} fontWeight={600} fill={titleColor}>
        {title}
      </text>

      <g stroke={SUPPORT} strokeWidth={2} strokeLinecap="round">
        <line x1={centerX - maxHalf - 18} y1={top} x2={centerX + maxHalf + 18} y2={top} />
        {Array.from({ length: 7 }, (_, tick) => {
          const x = centerX - maxHalf - 12 + tick * ((maxHalf * 2 + 24) / 6)
          return <line key={tick} x1={x} y1={top} x2={x - 8} y2={top - 12} strokeWidth={1.4} />
        })}
      </g>

      <motion.rect
        x={centerX - half1}
        y={top}
        width={half1 * 2}
        height={boundaryY - top}
        rx={3}
        fill={color1}
        fillOpacity={0.16}
        stroke={color1}
        strokeWidth={2}
        initial={false}
        animate={{ height: boundaryY - top }}
        transition={{ duration: 0.12, ease: 'linear' }}
      />
      <motion.rect
        x={centerX - half2}
        y={boundaryY}
        width={half2 * 2}
        height={bottomY - boundaryY}
        rx={3}
        fill={color2}
        fillOpacity={0.16}
        stroke={color2}
        strokeWidth={2}
        initial={false}
        animate={{ x: centerX - half2, width: half2 * 2, y: boundaryY, height: bottomY - boundaryY }}
        transition={{ duration: 0.12, ease: 'linear' }}
      />

      {referenceHalfWidth2 != null && (
        <rect
          x={centerX - referenceHalfWidth2}
          y={boundaryY}
          width={referenceHalfWidth2 * 2}
          height={bottomY - boundaryY}
          fill="none"
          stroke={MUTED}
          strokeWidth={1}
          strokeDasharray="4 4"
          opacity={0.65}
        />
      )}

      <text x={centerX} y={top + (boundaryY - top) / 2 + 3} textAnchor="middle" fontSize={8.5} fill={color1}>
        {label1}
      </text>
      <text x={centerX} y={boundaryY + (bottomY - boundaryY) / 2 + 3} textAnchor="middle" fontSize={8.5} fill={color2}>
        {label2}
      </text>

      {showForce && (
        <motion.g stroke={LOAD} fill={LOAD} initial={false} animate={{ opacity: 1 }}>
          <line x1={forceX} y1={bottomY - 34} x2={forceX} y2={bottomY - 6} strokeWidth={2} />
          <path
            d={`M${forceX - 4} ${bottomY - 14} L${forceX} ${bottomY - 6} L${forceX + 4} ${bottomY - 14}`}
            fill="none"
            strokeWidth={2}
          />
        </motion.g>
      )}
      {showForce && (
        <text x={forceX - 7} y={bottomY - 39} textAnchor="end" fontSize={8.5} fill={LOAD}>
          N = 30 kN
        </text>
      )}

      {showContributions && (
        <>
          <text x={centerX + maxHalf + 14} y={boundaryY + 3} fontSize={8.5} fill={MUTED}>
            ΔL₁ = 0,50 mm
          </text>
          <text x={centerX + maxHalf + 14} y={boundaryY + (bottomY - boundaryY) / 2 + 3} fontSize={8.5} fill={MUTED}>
            ΔL₂ = {pl(delta2, 3)} mm
          </text>
        </>
      )}

      {showTotal && (
        <text x={centerX} y={bottomY + 18} textAnchor="middle" fontSize={9} fontWeight={totalWeight} fill={totalColor}>
          ΣΔL = {pl(total, 3)} mm
        </text>
      )}
    </g>
  )
}

export function AxialStiffnessCondition2Animation({ scene, index, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'N'
  const isModel = index === 0
  const isFix = index === 2
  const isCompare = index === 3
  const grow = isModel ? 0 : playing ? easeOut(clamp01(sceneProgress / 0.55)) : 1
  const morph = isFix ? (playing ? easeOut(clamp01((sceneProgress - 0.08) / 0.6)) : 1) : 0

  const top = 90
  const baseBoundary = 180
  const baseBottom = 270
  const pxPerMm = 65
  const limitY = baseBottom + 1.2 * pxPerMm

  const area2 = isFix ? 500 + 150 * morph : 500
  const delta1 = isModel ? 0 : isFix ? 0.5 : 0.5 * grow
  const delta2 = isCompare ? 0.659 * grow : isFix ? 0.857 + (0.659 - 0.857) * morph : 0.857 * grow
  const total = delta1 + delta2
  const totalColor = isModel ? MUTED : total > 1.2001 ? BAD : OK
  const steelDelta2 = 0.7 * grow
  const steelTotal = 0.5 * grow + steelDelta2

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 520 390"
          role="img"
          aria-label="Pręt schodkowy stal–aluminium obciążony siłą 30 kN; animacja wydłużeń obu odcinków i porównanie sumy z dopuszczalnym wydłużeniem 1,2 mm"
        >
          <text x={16} y={24} fontSize={9} fill={MUTED}>
            N = 30 kN
          </text>
          <text x={16} y={38} fontSize={9} fill={MUTED}>
            ΔL_dop = 1,2 mm
          </text>
          <text x={16} y={52} fontSize={9} fill={MUTED}>
            L₁ = L₂ = 1 m
          </text>

          {!isCompare && (
            <>
              <text x={16} y={108} fontSize={8.5} fill={ACCENT}>
                stal
              </text>
              <text x={16} y={122} fontSize={8.5} fill={MUTED}>
                A₁ = 300 mm²
              </text>
              <text x={16} y={136} fontSize={8.5} fill={MUTED}>
                E₁ = 200 GPa
              </text>
              <text x={16} y={156} fontSize={8.5} fill={ALU}>
                aluminium
              </text>
              <text x={16} y={170} fontSize={8.5} fill={MUTED}>
                A₂ = {area2.toFixed(0)} mm²
              </text>
              <text x={16} y={184} fontSize={8.5} fill={MUTED}>
                E₂ = 70 GPa
              </text>
            </>
          )}

          {!isCompare && (
            <>
              <line x1={40} y1={limitY} x2={500} y2={limitY} stroke={MUTED} strokeWidth={1.2} strokeDasharray="6 4" />
              <text x={500} y={limitY - 6} textAnchor="end" fontSize={9} fill={MUTED}>
                ΔL_dop = 1,2 mm
              </text>
              <SteppedBar
                centerX={200}
                top={top}
                baseBoundary={baseBoundary}
                baseBottom={baseBottom}
                pxPerMm={pxPerMm}
                area1={300}
                area2={area2}
                delta1={delta1}
                delta2={delta2}
                color1={ACCENT}
                color2={ALU}
                label1="stal"
                label2="aluminium"
                title={isFix ? `aluminium: A₂ = ${area2.toFixed(0)} mm²` : 'stal + aluminium'}
                titleColor={isFix ? ALU : ACCENT}
                referenceHalfWidth2={isFix ? 22 * Math.sqrt(500 / 300) : undefined}
                showForce
                showContributions
                showTotal={!isModel}
                totalColor={totalColor}
                totalWeight={metric === 'ΔL' || metric === 'A' ? 700 : 600}
              />
            </>
          )}

          {isCompare && (
            <>
              <line x1={30} y1={limitY} x2={250} y2={limitY} stroke={MUTED} strokeWidth={1.2} strokeDasharray="6 4" />
              <line x1={280} y1={limitY} x2={500} y2={limitY} stroke={MUTED} strokeWidth={1.2} strokeDasharray="6 4" />
              <text x={500} y={limitY - 6} textAnchor="end" fontSize={9} fill={MUTED}>
                limit 1,2 mm
              </text>

              <SteppedBar
                centerX={140}
                top={top}
                baseBoundary={baseBoundary}
                baseBottom={baseBottom}
                pxPerMm={pxPerMm}
                area1={300}
                area2={650}
                delta1={0.5 * grow}
                delta2={0.659 * grow}
                color1={ACCENT}
                color2={ALU}
                label1="stal"
                label2="Al"
                title="Al: A₂ = 650 mm²"
                titleColor={ALU}
                showTotal
                totalColor={OK}
                totalWeight={700}
              />
              <SteppedBar
                centerX={370}
                top={top}
                baseBoundary={baseBoundary}
                baseBottom={baseBottom}
                pxPerMm={pxPerMm}
                area1={300}
                area2={214}
                delta1={0.5 * grow}
                delta2={steelDelta2}
                color1={ACCENT}
                color2={ACCENT}
                label1="stal"
                label2="stal"
                title="stal: A₂ = 214 mm²"
                titleColor={ACCENT}
                showTotal
                totalColor={steelTotal > 1.2001 ? BAD : OK}
                totalWeight={700}
              />
            </>
          )}
        </svg>
      </div>
    </div>
  )
}
