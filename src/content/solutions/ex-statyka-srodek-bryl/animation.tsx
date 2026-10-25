import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const INK = '#17202a'
const AXIS = '#9aa5b1'
const ARM = '#27835a'
const CENTROID = '#27835a'
const CUT = '#d84f28'

const OX = 190
const OY = 165
const S = 2.4
const COS30 = 0.8660254

const px = (x: number, y: number) => OX + (x - y) * COS30 * S
const py = (x: number, y: number, z: number) => OY + (x + y) * 0.5 * S - z * S

type Point3 = [number, number, number]
const screen = ([x, y, z]: Point3) => ({ x: px(x, y), y: py(x, y, z) })
const polygon = (points: Point3[]) =>
  points
    .map((point) => screen(point))
    .map((p) => `${p.x},${p.y}`)
    .join(' ')

const PART_1 = { x0: 0, x1: 70, y0: 0, y1: 30, z0: 0, z1: 25 }
const PART_2 = { x0: 0, x1: 20, y0: 30, y1: 50, z0: 0, z1: 15 }
const CUT_1 = { x0: 25, x1: 35, y0: 5, y1: 25, z0: 0, z1: 25 }

const P1_CENTER = { x: 35, y: 15, z: 12.5 }
const P2_CENTER = { x: 10, y: 40, z: 7.5 }
const CUT_CENTER = { x: 30, y: 15, z: 12.5 }
const CENTER = { x: 1747500 / 53500, y: 952500 / 53500, z: 638750 / 53500 }

const center1 = screen([P1_CENTER.x, P1_CENTER.y, P1_CENTER.z])
const center2 = screen([P2_CENTER.x, P2_CENTER.y, P2_CENTER.z])
const centerCut = screen([CUT_CENTER.x, CUT_CENTER.y, CUT_CENTER.z])
const centerC = screen([CENTER.x, CENTER.y, CENTER.z])
const baseC = screen([CENTER.x, CENTER.y, 0])

function Box({
  x0,
  x1,
  y0,
  y1,
  z0,
  z1,
  top,
  left,
  right,
  stroke,
  opacity = 1,
}: {
  x0: number
  x1: number
  y0: number
  y1: number
  z0: number
  z1: number
  top: string
  left: string
  right: string
  stroke: string
  opacity?: number
}) {
  const topFace: Point3[] = [
    [x0, y0, z1],
    [x1, y0, z1],
    [x1, y1, z1],
    [x0, y1, z1],
  ]
  const leftFace: Point3[] = [
    [x0, y1, z0],
    [x1, y1, z0],
    [x1, y1, z1],
    [x0, y1, z1],
  ]
  const rightFace: Point3[] = [
    [x1, y0, z0],
    [x1, y1, z0],
    [x1, y1, z1],
    [x1, y0, z1],
  ]
  return (
    <g opacity={opacity} stroke={stroke} strokeWidth="1.3" strokeLinejoin="round">
      <polygon points={polygon(leftFace)} fill={left} />
      <polygon points={polygon(rightFace)} fill={right} />
      <polygon points={polygon(topFace)} fill={top} />
    </g>
  )
}

function WireBox({
  x0,
  x1,
  y0,
  y1,
  z0,
  z1,
  color,
}: {
  x0: number
  x1: number
  y0: number
  y1: number
  z0: number
  z1: number
  color: string
}) {
  const corners: Point3[] = [
    [x0, y0, z0],
    [x1, y0, z0],
    [x1, y1, z0],
    [x0, y1, z0],
    [x0, y0, z1],
    [x1, y0, z1],
    [x1, y1, z1],
    [x0, y1, z1],
  ]
  const edges: Array<[number, number]> = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 0],
    [4, 5],
    [5, 6],
    [6, 7],
    [7, 4],
    [0, 4],
    [1, 5],
    [2, 6],
    [3, 7],
  ]
  const topFace: Point3[] = [
    [x0, y0, z1],
    [x1, y0, z1],
    [x1, y1, z1],
    [x0, y1, z1],
  ]
  return (
    <g>
      <polygon points={polygon(topFace)} fill={color} fillOpacity="0.08" />
      {edges.map(([a, b]) => {
        const start = screen(corners[a])
        const end = screen(corners[b])
        return (
          <line
            key={`cut-${a}-${b}`}
            x1={start.x}
            y1={start.y}
            x2={end.x}
            y2={end.y}
            stroke={color}
            strokeWidth="1.2"
            strokeDasharray="4 3"
            opacity="0.85"
          />
        )
      })}
    </g>
  )
}

function AxisTriad() {
  const origin = { x: 48, y: 300 }
  return (
    <g stroke={AXIS} strokeWidth="1.2" fill="none">
      <line x1={origin.x} y1={origin.y} x2={origin.x + 30} y2={origin.y + 15} />
      <line x1={origin.x} y1={origin.y} x2={origin.x - 30} y2={origin.y + 15} />
      <line x1={origin.x} y1={origin.y} x2={origin.x} y2={origin.y - 38} />
      <text x={origin.x + 34} y={origin.y + 18} fontSize="9" fill={INK} stroke="none">
        x
      </text>
      <text x={origin.x - 39} y={origin.y + 18} fontSize="9" fill={INK} stroke="none">
        y
      </text>
      <text x={origin.x + 4} y={origin.y - 42} fontSize="9" fill={INK} stroke="none">
        z
      </text>
    </g>
  )
}

function PartLabel({
  x,
  y,
  text,
  color = INK,
  anchor = 'start' as const,
}: {
  x: number
  y: number
  text: string
  color?: string
  anchor?: 'start' | 'end' | 'middle'
}) {
  return (
    <text x={x} y={y} textAnchor={anchor} fontSize="9.5" fill={color}>
      {text}
    </text>
  )
}

export function SolidCentroidAnimation({ index, playing, sceneProgress }: SolutionAnimationProps) {
  const p = playing ? Math.min(1, Math.max(0, sceneProgress)) : 1
  const draw = Math.min(1, 0.3 + p * 1.2)
  const showVolumes = index >= 1
  const showArmsX = index === 2
  const showArmsY = index === 3
  const showArmsZ = index === 4
  const showCentroid = index >= 5

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg viewBox="0 0 460 340" role="img" aria-label="Centroid bryły złożonej z prostopadłościanów">
          <title>Centroid bryły z wycięciem</title>
          <desc>Dwa prostopadłościany, prostopadłościenne wycięcie, objętości, momenty i centroid w przestrzeni.</desc>

          <AxisTriad />

          <motion.g initial={{ opacity: 0 }} animate={{ opacity: draw }} transition={{ duration: 0.2 }}>
            <Box
              {...PART_1}
              top="#b9c8f5"
              left="#8ea3e0"
              right="#6e86cf"
              stroke="#4f6df5"
              opacity={showArmsX || showArmsY || showArmsZ ? 0.55 : 1}
            />
            <WireBox {...CUT_1} color={CUT} />
            <Box {...PART_2} top="#ffd2ba" left="#f0a884" right="#dc8a64" stroke="#e07a4f" />
          </motion.g>

          <PartLabel x={312} y={172} text="1: 70 × 30 × 25 cm" />
          <PartLabel x={78} y={264} text="2: 20 × 20 × 15 cm" color="#c25a2f" />
          <PartLabel x={312} y={224} text="3: wycięcie" color={CUT} />
          <PartLabel x={312} y={238} text="10 × 20 × 25 cm" color={CUT} />

          {showVolumes && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <PartLabel x={312} y={186} text="V₁ = 52 500 cm³" color="#3155d9" />
              <PartLabel x={78} y={278} text="V₂ = 6 000 cm³" color="#c25a2f" />
              <PartLabel x={318} y={252} text="V₃ = −5 000 cm³" color={CUT} />
              <PartLabel x={312} y={200} text="V = 53 500 cm³" color={INK} />
            </motion.g>
          )}

          {showArmsX && (
            <g>
              {[
                { center: center1, x: P1_CENTER.x, z: P1_CENTER.z, y: P1_CENTER.y, label: 'x₁ = 35', cut: false },
                { center: center2, x: P2_CENTER.x, z: P2_CENTER.z, y: P2_CENTER.y, label: 'x₂ = 10', cut: false },
                { center: centerCut, x: CUT_CENTER.x, z: CUT_CENTER.z, y: CUT_CENTER.y, label: 'x₃ = 30', cut: true },
              ].map((item) => {
                const target = screen([0, item.y, item.z])
                return (
                  <g key={item.label}>
                    <motion.line
                      x1={item.center.x}
                      y1={item.center.y}
                      x2={target.x}
                      y2={target.y}
                      stroke={ARM}
                      strokeWidth="1.4"
                      strokeDasharray="5 3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <circle cx={item.center.x} cy={item.center.y} r="2.6" fill={ARM} />
                    <PartLabel
                      x={(item.center.x + target.x) / 2 - (item.cut ? 6 : 0)}
                      y={(item.center.y + target.y) / 2 + (item.cut ? 11 : -5)}
                      text={item.label}
                      color={ARM}
                      anchor={item.cut ? 'end' : 'middle'}
                    />
                  </g>
                )
              })}
              <PartLabel x={312} y={186} text="Q_yz = 1 747 500 cm⁴" color={ARM} />
              <PartLabel x={312} y={200} text="x_C = 32,66 cm" color={ARM} />
            </g>
          )}

          {showArmsY && (
            <g>
              {[
                { center: center1, x: P1_CENTER.x, y: P1_CENTER.y, z: P1_CENTER.z, label: 'y₁ = 15', cut: false },
                { center: center2, x: P2_CENTER.x, y: P2_CENTER.y, z: P2_CENTER.z, label: 'y₂ = 40', cut: false },
                { center: centerCut, x: CUT_CENTER.x, y: CUT_CENTER.y, z: CUT_CENTER.z, label: 'y₃ = 15', cut: true },
              ].map((item) => {
                const target = screen([item.x, 0, item.z])
                return (
                  <g key={item.label}>
                    <motion.line
                      x1={item.center.x}
                      y1={item.center.y}
                      x2={target.x}
                      y2={target.y}
                      stroke={ARM}
                      strokeWidth="1.4"
                      strokeDasharray="5 3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <circle cx={item.center.x} cy={item.center.y} r="2.6" fill={ARM} />
                    <PartLabel
                      x={(item.center.x + target.x) / 2 + (item.cut ? -6 : 4)}
                      y={(item.center.y + target.y) / 2 + (item.cut ? 9 : 0)}
                      text={item.label}
                      color={ARM}
                      anchor={item.cut ? 'end' : 'start'}
                    />
                  </g>
                )
              })}
              <PartLabel x={312} y={186} text="Q_zx = 952 500 cm⁴" color={ARM} />
              <PartLabel x={312} y={200} text="y_C = 17,80 cm" color={ARM} />
            </g>
          )}

          {showArmsZ && (
            <g>
              {[
                { center: center1, x: P1_CENTER.x, y: P1_CENTER.y, z: P1_CENTER.z, label: 'z₁ = 12,5', cut: false },
                { center: center2, x: P2_CENTER.x, y: P2_CENTER.y, z: P2_CENTER.z, label: 'z₂ = 7,5', cut: false },
                { center: centerCut, x: CUT_CENTER.x, y: CUT_CENTER.y, z: CUT_CENTER.z, label: 'z₃ = 12,5', cut: true },
              ].map((item) => {
                const target = screen([item.x, item.y, 0])
                return (
                  <g key={item.label}>
                    <motion.line
                      x1={item.center.x}
                      y1={item.center.y}
                      x2={target.x}
                      y2={target.y}
                      stroke={ARM}
                      strokeWidth="1.4"
                      strokeDasharray="5 3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <circle cx={item.center.x} cy={item.center.y} r="2.6" fill={ARM} />
                    <PartLabel
                      x={item.center.x + 6}
                      y={(item.center.y + target.y) / 2 + (item.cut ? 11 : 0)}
                      text={item.label}
                      color={ARM}
                      anchor="start"
                    />
                  </g>
                )
              })}
              <PartLabel x={312} y={186} text="Q_xy = 638 750 cm⁴" color={ARM} />
              <PartLabel x={312} y={200} text="z_C = 11,94 cm" color={ARM} />
            </g>
          )}

          {showCentroid && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>
              <line
                x1={centerC.x}
                y1={centerC.y}
                x2={baseC.x}
                y2={baseC.y}
                stroke={CENTROID}
                strokeWidth="1.4"
                strokeDasharray="5 3"
              />
              <line x1={baseC.x - 8} y1={baseC.y} x2={baseC.x + 8} y2={baseC.y} stroke={CENTROID} strokeWidth="1.4" />
              <motion.circle
                cx={centerC.x}
                cy={centerC.y}
                r="6"
                fill="#fff"
                stroke={CENTROID}
                strokeWidth="2.4"
                animate={{ scale: playing ? [1, 1.25, 1] : 1 }}
                transition={{ duration: 1.4, repeat: playing ? Infinity : 0 }}
                style={{ transformOrigin: `${centerC.x}px ${centerC.y}px` }}
              />
              <text x={centerC.x + 14} y={centerC.y - 9} fontSize="11" fontWeight="700" fill={CENTROID}>
                C = (32,66; 17,80; 11,94) cm
              </text>
              <text x={centerC.x + 14} y={centerC.y + 6} fontSize="9" fill={CENTROID}>
                rzut na podstawę: (32,66; 17,80) cm
              </text>
              <PartLabel
                x={230}
                y={316}
                text="0 ≤ x_C ≤ 70, 0 ≤ y_C ≤ 50, 0 ≤ z_C ≤ 25"
                color={CENTROID}
                anchor="middle"
              />
            </motion.g>
          )}

          <text x="230" y="330" textAnchor="middle" fontSize="10" fill={INK}>
            {showCentroid
              ? 'Każda współrzędna ma własny moment statyczny objętości'
              : showArmsX || showArmsY || showArmsZ
                ? 'Wycięcie odejmujemy jako objętość ujemną, ale jego współrzędne zachowują znak położenia'
                : 'Centroid bryły jednorodnej zależy tylko od jej kształtu'}
          </text>
        </svg>
      </div>
    </div>
  )
}
