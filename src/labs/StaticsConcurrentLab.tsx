import { useState } from 'react'
import { Control, Lab, Metric, fmt } from '../components/UI'
import { addVectors2, angle2Deg, magnitude2, resultantConcurrent, vector2 } from '../lib/statics'
import { staticsColors, staticsMarker } from './StaticsLabsShared'

const origin = { x: 240, y: 170 }
const vectorHalfExtent = 145
const polygonCenter = { x: 240, y: 435 }
const polygonRegion = { width: 420, height: 136 }

const palette = [staticsColors.force, staticsColors.tension, staticsColors.compression] as const

export function StaticsConcurrentLab() {
  const [magnitudes, setMagnitudes] = useState([18, 14, 10])
  const [angles, setAngles] = useState([20, 130, 250])

  const vectors = magnitudes.map((value, index) => vector2(value, angles[index] ?? 0))
  const resultant = resultantConcurrent(
    magnitudes.map((magnitude, index) => ({ magnitude, angleDeg: angles[index] ?? 0 })),
  )
  const equilibrium = { x: -resultant.x, y: -resultant.y }
  const resultantMagnitude = magnitude2(resultant)
  const scale = Math.min(7, vectorHalfExtent / Math.max(resultantMagnitude, ...magnitudes, 1))
  const endpoint = (vector: { x: number; y: number }) => ({
    x: origin.x + vector.x * scale,
    y: origin.y - vector.y * scale,
  })
  const polygon = vectors.reduce<Array<{ x: number; y: number }>>(
    (points, vector) => {
      const last = points[points.length - 1] ?? { x: 0, y: 0 }
      return [...points, addVectors2([last, vector])]
    },
    [{ x: 0, y: 0 }],
  )
  const polygonXs = polygon.map((point) => point.x)
  const polygonYs = polygon.map((point) => point.y)
  const polygonMinX = Math.min(...polygonXs)
  const polygonMaxX = Math.max(...polygonXs)
  const polygonMinY = Math.min(...polygonYs)
  const polygonMaxY = Math.max(...polygonYs)
  const polygonWidth = Math.max(polygonMaxX - polygonMinX, 1)
  const polygonHeight = Math.max(polygonMaxY - polygonMinY, 1)
  const idealPolygonScale = Math.min(12, polygonRegion.width / polygonWidth, polygonRegion.height / polygonHeight)
  const polygonGridKN = Math.max(5, Math.round(40 / idealPolygonScale / 5) * 5)
  const polygonScale = Math.min(
    12,
    polygonRegion.width / (polygonWidth + polygonGridKN),
    polygonRegion.height / (polygonHeight + polygonGridKN),
  )
  const polygonGridStep = polygonGridKN * polygonScale
  const polygonGridOrigin = polygonCenter
  const centeredPolygonOffset = {
    x: polygonCenter.x - ((polygonMinX + polygonMaxX) / 2) * polygonScale,
    y: polygonCenter.y + ((polygonMinY + polygonMaxY) / 2) * polygonScale,
  }
  const polygonOffset = {
    x:
      polygonGridOrigin.x +
      Math.round((centeredPolygonOffset.x - polygonGridOrigin.x) / polygonGridStep) * polygonGridStep,
    y:
      polygonGridOrigin.y +
      Math.round((centeredPolygonOffset.y - polygonGridOrigin.y) / polygonGridStep) * polygonGridStep,
  }
  const polygonPoint = (point: { x: number; y: number }) => ({
    x: polygonOffset.x + point.x * polygonScale,
    y: polygonOffset.y - point.y * polygonScale,
  })

  const vectorGridKN = Math.max(5, Math.round(60 / scale / 5) * 5)
  const vectorGridStep = vectorGridKN * scale
  const vectorGridLines: Array<{ x1: number; y1: number; x2: number; y2: number }> = []
  const polygonGridLines: Array<{ x1: number; y1: number; x2: number; y2: number }> = []
  for (let index = -24; index <= 24; index += 1) {
    if (index !== 0) {
      const vectorX = origin.x + index * vectorGridStep
      const vectorY = origin.y + index * vectorGridStep
      vectorGridLines.push({ x1: vectorX, y1: 25, x2: vectorX, y2: 335 })
      vectorGridLines.push({ x1: 20, y1: vectorY, x2: 460, y2: vectorY })
    }
    const polygonX = polygonGridOrigin.x + index * polygonGridStep
    const polygonY = polygonGridOrigin.y - index * polygonGridStep
    polygonGridLines.push({ x1: polygonX, y1: 367, x2: polygonX, y2: 503 })
    polygonGridLines.push({ x1: 20, y1: polygonY, x2: 460, y2: polygonY })
  }

  const update = (list: number[], setter: (value: number[]) => void, index: number, value: number) => {
    setter(list.map((item, itemIndex) => (itemIndex === index ? value : item)))
  }

  return (
    <Lab
      title="Płaski zbieżny układ sił: wypadkowa i równowaga"
      instruction="Trzy siły działają w jednym punkcie. Wypadkowa jest sumą wektorową; siła równoważąca ma ten sam kierunek co wypadkowa, ale przeciwny zwrot. Sprawdź, kiedy wypadkowa znika."
      onReset={() => {
        setMagnitudes([18, 14, 10])
        setAngles([20, 130, 250])
      }}
      controls={
        <>
          {magnitudes.map((value, index) => (
            <Control
              key={`m-${index}`}
              label={`Moduł F${index + 1}`}
              value={value}
              min={2}
              max={30}
              unit="kN"
              onChange={(next) => update(magnitudes, setMagnitudes, index, next)}
            />
          ))}
          {angles.map((value, index) => (
            <Control
              key={`a-${index}`}
              label={`Kąt F${index + 1}`}
              value={value}
              min={0}
              max={355}
              step={5}
              unit="°"
              onChange={(next) => update(angles, setAngles, index, next)}
            />
          ))}
        </>
      }
      metrics={
        <>
          <Metric label="Wypadkowa R" value={fmt(resultantMagnitude, 2)} unit="kN" tone="accent" />
          <Metric label="Kierunek R" value={fmt(angle2Deg(resultant), 1)} unit="°" />
          <Metric label="Siła równoważąca" value={fmt(resultantMagnitude, 2)} unit="kN, przeciwny zwrot" />
        </>
      }
      visual={
        <svg
          viewBox="0 0 480 526"
          width="100%"
          style={{ width: '100%', height: '100%', maxHeight: 'none' }}
          role="img"
          aria-label="Zbieżny układ trzech sił i wypadkowa"
        >
          <title>Zbieżny układ sił</title>
          <desc>Trzy siły zaczepione w jednym punkcie, ich wypadkowa oraz wielobok sił.</desc>
          <defs>
            {staticsMarker('conc-0', palette[0])}
            {staticsMarker('conc-1', palette[1])}
            {staticsMarker('conc-2', palette[2])}
            {staticsMarker('conc-result', staticsColors.reaction)}
            <clipPath id="conc-vector-region">
              <rect x="20" y="25" width="440" height="310" />
            </clipPath>
            <clipPath id="conc-polygon-region">
              <rect x="20" y="367" width="440" height="136" />
            </clipPath>
          </defs>
          <g clipPath="url(#conc-vector-region)" stroke={staticsColors.axis} strokeWidth="1" opacity="0.28">
            {vectorGridLines.map((line, index) => (
              <line key={`vector-grid-${index}`} {...line} />
            ))}
          </g>
          <line x1="20" y1={origin.y} x2="460" y2={origin.y} stroke={staticsColors.axis} strokeWidth="1" />
          <line x1={origin.x} y1="20" x2={origin.x} y2="335" stroke={staticsColors.axis} strokeWidth="1" />
          {vectors.map((vector, index) => {
            const tip = endpoint(vector)
            return (
              <g key={`vector-${index}`}>
                <line
                  x1={origin.x}
                  y1={origin.y}
                  x2={tip.x}
                  y2={tip.y}
                  stroke={palette[index]}
                  strokeWidth="4"
                  markerEnd={`url(#conc-${index})`}
                />
                <text x={tip.x + 6} y={tip.y - 6} fontSize="13" fill={palette[index]}>
                  F{index + 1}
                </text>
              </g>
            )
          })}
          <line
            x1={origin.x}
            y1={origin.y}
            x2={endpoint(resultant).x}
            y2={endpoint(resultant).y}
            stroke={staticsColors.reaction}
            strokeWidth="4.5"
            strokeDasharray="9 5"
            markerEnd="url(#conc-result)"
          />
          <text
            x={endpoint(resultant).x + 8}
            y={endpoint(resultant).y + 18}
            fontSize="14"
            fill={staticsColors.reaction}
          >
            R
          </text>
          <circle cx={origin.x} cy={origin.y} r="5" fill="currentColor" />
          <text x={origin.x - 14} y={origin.y + 20} fontSize="13" fill="currentColor">
            O
          </text>

          <g>
            <line x1="38" y1="318" x2={38 + 10 * scale} y2="318" stroke={staticsColors.neutral} strokeWidth="2" />
            <line x1="38" y1="314" x2="38" y2="322" stroke={staticsColors.neutral} strokeWidth="2" />
            <line
              x1={38 + 10 * scale}
              y1="314"
              x2={38 + 10 * scale}
              y2="322"
              stroke={staticsColors.neutral}
              strokeWidth="2"
            />
            <text x={46 + 10 * scale} y="322" fontSize="12" fill={staticsColors.neutral}>
              10 kN
            </text>
          </g>

          <text x={polygonCenter.x} y="340" textAnchor="middle" fontSize="14" fill="currentColor">
            Wielobok sił
          </text>
          <g clipPath="url(#conc-polygon-region)" stroke={staticsColors.axis} strokeWidth="1" opacity="0.28">
            {polygonGridLines.map((line, index) => (
              <line key={`polygon-grid-${index}`} {...line} />
            ))}
          </g>
          <g>
            <line
              x1="38"
              y1="492"
              x2={38 + 10 * polygonScale}
              y2="492"
              stroke={staticsColors.neutral}
              strokeWidth="2"
            />
            <line x1="38" y1="488" x2="38" y2="496" stroke={staticsColors.neutral} strokeWidth="2" />
            <line
              x1={38 + 10 * polygonScale}
              y1="488"
              x2={38 + 10 * polygonScale}
              y2="496"
              stroke={staticsColors.neutral}
              strokeWidth="2"
            />
            <text x={46 + 10 * polygonScale} y="496" fontSize="12" fill={staticsColors.neutral}>
              10 kN
            </text>
          </g>
          {polygon.slice(0, -1).map((point, index) => {
            const next = polygon[index + 1]
            const start = polygonPoint(point)
            const end = polygonPoint(next)
            return (
              <line
                key={`poly-${index}`}
                x1={start.x}
                y1={start.y}
                x2={end.x}
                y2={end.y}
                stroke={palette[index]}
                strokeWidth="3.5"
                markerEnd={`url(#conc-${index})`}
              />
            )
          })}
          <line
            x1={polygonPoint(polygon[0]).x}
            y1={polygonPoint(polygon[0]).y}
            x2={polygonPoint(resultant).x}
            y2={polygonPoint(resultant).y}
            stroke={staticsColors.reaction}
            strokeWidth="3"
            strokeDasharray="7 4"
          />
          <circle cx={polygonPoint(polygon[0]).x} cy={polygonPoint(polygon[0]).y} r="4" fill="currentColor" />
          <text x="240" y="510" textAnchor="middle" fontSize="12.5" fill="currentColor">
            R = √(ΣFx² + ΣFy²)
          </text>
          <text x="240" y="521" textAnchor="middle" fontSize="12.5" fill="currentColor">
            Równowaga wymaga R = 0, czyli zamkniętego wieloboku sił.
          </text>
        </svg>
      }
    />
  )
}
