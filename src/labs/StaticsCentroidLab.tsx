import { useState } from 'react'
import { Control, Lab, Metric, fmt } from '../components/UI'
import { polygonCentroid } from '../lib/statics'
import { staticsColors } from './StaticsLabsShared'

export function StaticsCentroidLab() {
  const [widthMM, setWidthMM] = useState(200)
  const [heightMM, setHeightMM] = useState(140)
  const [holeRadiusMM, setHoleRadiusMM] = useState(30)
  const [holeXMM, setHoleXMM] = useState(115)
  const [holeYMM, setHoleYMM] = useState(95)

  const rectangleArea = widthMM * heightMM
  const holeArea = Math.PI * holeRadiusMM ** 2
  const centroid = polygonCentroid([
    { area: rectangleArea, x: widthMM / 2, y: heightMM / 2 },
    { area: holeArea, x: holeXMM, y: holeYMM, negative: true },
  ])
  const netArea = rectangleArea - holeArea
  const scale = Math.min(400 / widthMM, 210 / heightMM)
  const originX = 160
  const originY = 278
  const svgX = (x: number) => originX + x * scale
  const svgY = (y: number) => originY - y * scale

  return (
    <Lab
      title="Środek ciężkości figury z otworem"
      instruction="Prostokąt z otworem traktujemy jako figurę złożoną: pole otworu odejmujemy. Współrzędne środka ciężkości to suma momentów statycznych pól podzielona przez pole wypadkowe. Przesuwaj otwór i obserwuj wędrówkę środka."
      onReset={() => {
        setWidthMM(200)
        setHeightMM(140)
        setHoleRadiusMM(30)
        setHoleXMM(115)
        setHoleYMM(95)
      }}
      controls={
        <>
          <Control label="Szerokość b" value={widthMM} min={80} max={260} step={10} unit="mm" onChange={setWidthMM} />
          <Control label="Wysokość h" value={heightMM} min={60} max={220} step={10} unit="mm" onChange={setHeightMM} />
          <Control label="Promień otworu r" value={holeRadiusMM} min={5} max={55} step={5} unit="mm" onChange={setHoleRadiusMM} />
          <Control label="Środek otworu x_o" value={holeXMM} min={holeRadiusMM} max={widthMM - holeRadiusMM} step={5} unit="mm" onChange={setHoleXMM} />
          <Control label="Środek otworu y_o" value={holeYMM} min={holeRadiusMM} max={heightMM - holeRadiusMM} step={5} unit="mm" onChange={setHoleYMM} />
        </>
      }
      metrics={
        <>
          <Metric label="Pole wypadkowe" value={fmt(netArea, 0)} unit="mm²" />
          <Metric label="Środek x_C" value={fmt(centroid.x, 1)} unit="mm" tone="accent" />
          <Metric label="Środek y_C" value={fmt(centroid.y, 1)} unit="mm" tone="accent" />
          <Metric label="Moment statyczny Sx" value={fmt(netArea * centroid.y, 0)} unit="mm³" />
        </>
      }
      visual={
        <svg viewBox="0 0 720 330" width="100%" role="img" aria-label="Prostokąt z otworem i środkiem ciężkości">
          <title>Środek ciężkości figury z otworem</title>
          <desc>Prostokąt z kołowym otworem, osie odniesienia i wyznaczony środek ciężkości.</desc>
          <line x1={originX - 40} y1={originY} x2={originX + widthMM * scale + 30} y2={originY} stroke={staticsColors.axis} strokeWidth="1.5" />
          <line x1={originX} y1={originY + 24} x2={originX} y2={originY - heightMM * scale - 20} stroke={staticsColors.axis} strokeWidth="1.5" />
          <text x={originX - 12} y={originY + 18} textAnchor="end" fontSize="12" fill="currentColor">
            y
          </text>
          <text x={originX + widthMM * scale + 38} y={originY - 6} fontSize="12" fill="currentColor">
            x
          </text>
          <rect
            x={originX}
            y={svgY(heightMM)}
            width={widthMM * scale}
            height={heightMM * scale}
            fill="currentColor"
            opacity="0.16"
            stroke="currentColor"
            strokeWidth="2.5"
          />
          <circle
            cx={svgX(holeXMM)}
            cy={svgY(holeYMM)}
            r={holeRadiusMM * scale}
            fill="#fbf7f3"
            stroke={staticsColors.compression}
            strokeWidth="2"
          />
          <line x1={svgX(centroid.x)} y1={svgY(0)} x2={svgX(centroid.x)} y2={svgY(heightMM)} stroke={staticsColors.reaction} strokeWidth="2" strokeDasharray="5 4" />
          <line x1={svgX(0)} y1={svgY(centroid.y)} x2={svgX(widthMM)} y2={svgY(centroid.y)} stroke={staticsColors.reaction} strokeWidth="2" strokeDasharray="5 4" />
          <circle cx={svgX(centroid.x)} cy={svgY(centroid.y)} r="6" fill={staticsColors.reaction} />
          <text x={svgX(centroid.x) + 10} y={svgY(centroid.y) - 10} fontSize="13" fill={staticsColors.reaction}>
            C ({fmt(centroid.x, 1)}; {fmt(centroid.y, 1)})
          </text>
          <text x={originX + (widthMM * scale) / 2} y={originY + 22} textAnchor="middle" fontSize="12" fill="currentColor">
            b = {widthMM} mm
          </text>
          <text x={originX - 14} y={svgY(heightMM / 2)} textAnchor="end" fontSize="12" fill="currentColor">
            h = {heightMM}
          </text>
          <text x="360" y="320" textAnchor="middle" fontSize="13" fill="currentColor">
            x_C = Σ(Aᵢxᵢ)/ΣAᵢ, y_C = Σ(Aᵢyᵢ)/ΣAᵢ; pole otworu wchodzi ze znakiem minus.
          </text>
        </svg>
      }
    />
  )
}
