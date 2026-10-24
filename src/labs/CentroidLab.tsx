import { useState } from 'react'
import { motion } from 'motion/react'
import { Control, Lab, Metric, fmt } from '../components/UI'
import { compositeCentroidY } from '../lib/advanced'

export function CentroidLab() {
  const [widthScale, setWidthScale] = useState(1)
  const [heightScale, setHeightScale] = useState(1)
  const [gapMM, setGapMM] = useState(40)
  const [liftMM, setLiftMM] = useState(30)
  const baseWidth = 240 * widthScale
  const baseHeight = 40 * heightScale
  const stemWidth = 40 * widthScale
  const stemHeight = 160 * heightScale
  const parts = [
    { areaMM2: baseWidth * baseHeight, yMM: baseHeight / 2 },
    { areaMM2: stemWidth * stemHeight, yMM: baseHeight + liftMM + stemHeight / 2 },
    { areaMM2: stemWidth * stemHeight, yMM: baseHeight + liftMM + stemHeight / 2 },
  ]
  const centroidY = compositeCentroidY(parts)
  const totalArea = parts.reduce((sum, part) => sum + part.areaMM2, 0)
  const firstMoment = parts.reduce((sum, part) => sum + part.areaMM2 * part.yMM, 0)
  const rectangles = [
    { x: 0, y: baseHeight / 2, width: baseWidth, height: baseHeight, color: '#9dbb62', label: '1' },
    {
      x: -baseWidth / 2 - gapMM - stemWidth / 2,
      y: baseHeight + liftMM + stemHeight / 2,
      width: stemWidth,
      height: stemHeight,
      color: '#86a9c2',
      label: '2',
    },
    {
      x: baseWidth / 2 + gapMM + stemWidth / 2,
      y: baseHeight + liftMM + stemHeight / 2,
      width: stemWidth,
      height: stemHeight,
      color: '#e6a087',
      label: '3',
    },
  ]
  const minX = Math.min(...rectangles.map((rect) => rect.x - rect.width / 2))
  const maxX = Math.max(...rectangles.map((rect) => rect.x + rect.width / 2))
  const maxY = baseHeight + liftMM + stemHeight
  const scale = Math.min(550 / (maxX - minX), 220 / maxY)
  const originX = 360 - ((minX + maxX) / 2) * scale
  const originY = 275
  const svgX = (x: number) => originX + x * scale
  const svgY = (y: number) => originY - y * scale

  return (
    <Lab
      title="Środek ciężkości przekroju złożonego"
      instruction="Trzy prostokąty tworzą symetryczny przekrój. Skale wymiarów działają na wszystkie części; odstęp i wyniesienie zmieniają położenie prostokątów bocznych."
      onReset={() => {
        setWidthScale(1)
        setHeightScale(1)
        setGapMM(40)
        setLiftMM(30)
      }}
      controls={
        <>
          <Control
            label="Skala szerokości"
            value={widthScale}
            min={0.6}
            max={1.4}
            step={0.1}
            unit="×"
            format={(value) => fmt(value, 1)}
            onChange={setWidthScale}
          />
          <Control
            label="Skala wysokości"
            value={heightScale}
            min={0.6}
            max={1.4}
            step={0.1}
            unit="×"
            format={(value) => fmt(value, 1)}
            onChange={setHeightScale}
          />
          <Control
            label="Odstęp bocznych części"
            value={gapMM}
            min={0}
            max={100}
            step={5}
            unit="mm"
            onChange={setGapMM}
          />
          <Control
            label="Wyniesienie części bocznych"
            value={liftMM}
            min={0}
            max={100}
            step={5}
            unit="mm"
            onChange={setLiftMM}
          />
        </>
      }
      metrics={
        <>
          <Metric label="Pole całkowite A" value={fmt(totalArea)} unit="mm²" />
          <Metric label="Moment statyczny Sy" value={fmt(firstMoment / 1000, 1)} unit="10³ mm³" />
          <Metric label="Położenie środka yC" value={fmt(centroidY, 2)} unit="mm" tone="accent" />
        </>
      }
      visual={
        <svg
          viewBox="0 0 720 320"
          width="100%"
          role="img"
          aria-label={`Trzy prostokąty ze środkiem ciężkości na wysokości ${fmt(centroidY, 2)} milimetrów`}
        >
          <title>Metoda prostokątów składowych</title>
          <desc>
            Początek osi y znajduje się na dolnej krawędzi podstawy. Środek ciężkości jest sumą iloczynów pól i położeń
            podzieloną przez pole całkowite.
          </desc>
          <line x1="45" y1={originY} x2="675" y2={originY} stroke="currentColor" strokeWidth="1.5" />
          <line x1={originX} y1="28" x2={originX} y2="298" stroke="currentColor" strokeDasharray="5 4" opacity="0.45" />
          <text x="665" y={originY - 9} textAnchor="end" fontSize="13" fill="currentColor">
            x [mm]
          </text>
          <text x={originX + 10} y="40" fontSize="13" fill="currentColor">
            y [mm]
          </text>
          <text x={originX + 9} y={originY + 19} fontSize="12" fill="currentColor">
            0
          </text>
          {rectangles.map((rect) => (
            <motion.g
              key={rect.label}
              animate={{ x: svgX(rect.x), y: svgY(rect.y) }}
              transition={{ type: 'spring', stiffness: 150, damping: 24 }}
            >
              <motion.rect
                x={(-rect.width * scale) / 2}
                y={(-rect.height * scale) / 2}
                width={rect.width * scale}
                height={rect.height * scale}
                fill={rect.color}
                fillOpacity="0.75"
                stroke={rect.color}
                strokeWidth="2"
              />
              <circle r="4" fill="#354025" />
              <text y="5" textAnchor="middle" fontSize="13" fill="#354025">
                {rect.label}
              </text>
            </motion.g>
          ))}
          <motion.g
            animate={{ x: originX, y: svgY(centroidY) }}
            transition={{ type: 'spring', stiffness: 150, damping: 24 }}
          >
            <circle r="9" fill="#fff" stroke="#d36343" strokeWidth="3" />
            <line x1="-14" x2="14" stroke="#d36343" strokeWidth="2" />
            <line y1="-14" y2="14" stroke="#d36343" strokeWidth="2" />
          </motion.g>
          <motion.line
            x1="50"
            x2={originX - 18}
            y1={svgY(centroidY)}
            y2={svgY(centroidY)}
            stroke="#d36343"
            strokeDasharray="4 3"
            animate={{ y1: svgY(centroidY), y2: svgY(centroidY) }}
          />
          <motion.text x="48" y={svgY(centroidY) - 8} fontSize="13" fill="#c45f42" animate={{ y: svgY(centroidY) - 8 }}>
            yC = {fmt(centroidY, 1)} mm
          </motion.text>
          <text x="360" y="313" textAnchor="middle" fontSize="13" fill="currentColor">
            yC = Σ(Aᵢ·yᵢ) / ΣAᵢ · xC = 0 z symetrii
          </text>
        </svg>
      }
    />
  )
}
