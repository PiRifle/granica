import { useState } from 'react'
import { Control, Lab, Metric, fmt } from '../components/UI'
import { rectangleInertiaMM4 } from '../lib/engineering'

export function SectionLab() {
  const [widthMM, setWidthMM] = useState(100)
  const [heightMM, setHeightMM] = useState(240)
  const inertia = rectangleInertiaMM4(widthMM, heightMM)
  const referenceInertia = rectangleInertiaMM4(widthMM, 200)
  const flangeMM = Math.max(6, heightMM * 0.08)
  const webMM = Math.max(5, widthMM * 0.12)
  const iInertia =
    rectangleInertiaMM4(widthMM, heightMM) - rectangleInertiaMM4(widthMM - webMM, heightMM - 2 * flangeMM)
  const scale = Math.min(150 / widthMM, 210 / heightMM)
  const drawnWidth = widthMM * scale
  const drawnHeight = heightMM * scale
  const drawnWeb = webMM * scale
  const drawnFlange = flangeMM * scale
  const rectangleX = 170 - drawnWidth / 2
  const rectangleY = 145 - drawnHeight / 2
  const iX = 520 - drawnWidth / 2
  const iY = 145 - drawnHeight / 2
  const iPath = [
    `M ${iX} ${iY}`,
    `h ${drawnWidth} v ${drawnFlange} h ${-(drawnWidth - drawnWeb) / 2}`,
    `v ${drawnHeight - 2 * drawnFlange} h ${(drawnWidth - drawnWeb) / 2}`,
    `v ${drawnFlange} h ${-drawnWidth} v ${-drawnFlange}`,
    `h ${(drawnWidth - drawnWeb) / 2} v ${-(drawnHeight - 2 * drawnFlange)}`,
    `h ${-(drawnWidth - drawnWeb) / 2} Z`,
  ].join(' ')

  return (
    <Lab
      title="Moment bezwładności przekroju"
      instruction="Zmieniaj szerokość b i wysokość h. Oś obojętna przechodzi przez środek; porównanie dwuteownika ma te same wymiary zewnętrzne b × h."
      onReset={() => {
        setWidthMM(100)
        setHeightMM(240)
      }}
      controls={
        <>
          <Control label="Szerokość b" value={widthMM} min={40} max={200} step={5} unit="mm" onChange={setWidthMM} />
          <Control label="Wysokość h" value={heightMM} min={80} max={400} step={10} unit="mm" onChange={setHeightMM} />
        </>
      }
      metrics={
        <>
          <Metric label="Ix prostokąta" value={fmt(inertia / 10_000, 1)} unit="cm⁴" tone="accent" />
          <Metric label="Ix / Ix przy h = 200 mm" value={fmt(inertia / referenceInertia, 2)} unit="×" />
          <Metric label="Przewaga nad dwuteownikiem" value={fmt(inertia / iInertia, 2)} unit="×" />
        </>
      }
      visual={
        <svg
          viewBox="0 0 700 330"
          width="100%"
          role="img"
          aria-label="Porównanie prostokąta i dwuteownika o tych samych wymiarach zewnętrznych"
        >
          <title>Przekroje i osie obojętne</title>
          <desc>Wysokość wpływa na moment bezwładności w trzeciej potędze, a szerokość liniowo.</desc>
          <text x="170" y="25" textAnchor="middle" fontSize="16" fill="currentColor">
            Prostokąt
          </text>
          <text x="520" y="25" textAnchor="middle" fontSize="16" fill="currentColor">
            Dwuteownik
          </text>
          <rect x={rectangleX} y={rectangleY} width={drawnWidth} height={drawnHeight} fill="#4f86c6" opacity="0.8" />
          <path d={iPath} fill="#e9a23b" opacity="0.9" />
          <line
            x1={rectangleX - 18}
            y1="145"
            x2={rectangleX + drawnWidth + 18}
            y2="145"
            stroke="white"
            strokeWidth="2"
            strokeDasharray="7 4"
          />
          <line
            x1={iX - 18}
            y1="145"
            x2={iX + drawnWidth + 18}
            y2="145"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="7 4"
          />
          <text x={rectangleX + drawnWidth + 23} y="150" fontSize="13" fill="currentColor">
            x
          </text>
          <text x={iX + drawnWidth + 23} y="150" fontSize="13" fill="currentColor">
            x
          </text>
          <line x1={rectangleX} y1="275" x2={rectangleX + drawnWidth} y2="275" stroke="currentColor" />
          <line x1={rectangleX} y1="267" x2={rectangleX} y2="282" stroke="currentColor" />
          <line x1={rectangleX + drawnWidth} y1="267" x2={rectangleX + drawnWidth} y2="282" stroke="currentColor" />
          <text x="170" y="298" textAnchor="middle" fontSize="14" fill="currentColor">
            b = {widthMM} mm
          </text>
          <line
            x1={rectangleX - 18}
            y1={rectangleY}
            x2={rectangleX - 18}
            y2={rectangleY + drawnHeight}
            stroke="currentColor"
          />
          <text x={rectangleX - 26} y="145" textAnchor="end" fontSize="14" fill="currentColor">
            h = {heightMM} mm
          </text>
          <text x="520" y="282" textAnchor="middle" fontSize="13" fill="currentColor">
            półki {fmt(flangeMM)} mm · środnik {fmt(webMM)} mm
          </text>
          <text x="350" y="323" textAnchor="middle" fontSize="15" fill="currentColor">
            Ix = b·h³/12 · przy b = const: Ix ∝ h³
          </text>
        </svg>
      }
    />
  )
}
