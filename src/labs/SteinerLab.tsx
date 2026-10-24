import { useState } from 'react'
import { motion } from 'motion/react'
import { Control, Lab, Metric, fmt } from '../components/UI'
import { rectangleInertiaMM4 } from '../lib/engineering'
import { compositeInertiaXMM4 } from '../lib/advanced'

export function SteinerLab() {
  const [widthMM, setWidthMM] = useState(120)
  const [heightMM, setHeightMM] = useState(40)
  const [distanceMM, setDistanceMM] = useState(100)
  const areaMM2 = widthMM * heightMM
  const ownInertia = rectangleInertiaMM4(widthMM, heightMM)
  const parallelAxisTerm = areaMM2 * distanceMM ** 2
  const totalInertia = compositeInertiaXMM4([{ areaMM2, yMM: distanceMM, ownIXMM4: ownInertia }], 0)
  const scale = Math.min(310 / widthMM, 150 / (distanceMM + heightMM / 2))
  const centerX = 315
  const axisY = 255
  const rectangleY = axisY - (distanceMM + heightMM / 2) * scale
  const ownShare = (ownInertia / totalInertia) * 100

  return (
    <Lab
      title="Twierdzenie Steinera: oś równoległa"
      instruction="Oś x₀ przechodzi pod prostokątem, a oś xC przez jego środek. Odległość d mierzymy między środkiem prostokąta a osią x₀; obie osie są równoległe."
      onReset={() => {
        setWidthMM(120)
        setHeightMM(40)
        setDistanceMM(100)
      }}
      controls={
        <>
          <Control label="Szerokość b" value={widthMM} min={40} max={200} step={10} unit="mm" onChange={setWidthMM} />
          <Control label="Wysokość h" value={heightMM} min={20} max={100} step={5} unit="mm" onChange={setHeightMM} />
          <Control
            label="Odległość osi d"
            value={distanceMM}
            min={0}
            max={200}
            step={5}
            unit="mm"
            onChange={setDistanceMM}
          />
        </>
      }
      metrics={
        <>
          <Metric label="Własny moment I₀ = bh³/12" value={fmt(ownInertia / 1e6, 3)} unit="10⁶ mm⁴" />
          <Metric label="Wkład przesunięcia Ad²" value={fmt(parallelAxisTerm / 1e6, 3)} unit="10⁶ mm⁴" />
          <Metric label="Razem I = I₀ + Ad²" value={fmt(totalInertia / 1e6, 3)} unit="10⁶ mm⁴" tone="accent" />
        </>
      }
      visual={
        <svg
          viewBox="0 0 720 320"
          width="100%"
          role="img"
          aria-label={`Prostokąt oddalony od osi o ${distanceMM} milimetrów, moment bezwładności ${fmt(totalInertia / 1e6, 3)} razy 10 do szóstej milimetrów do czwartej`}
        >
          <title>Rozbicie momentu bezwładności według Steinera</title>
          <desc>
            Niebieski prostokąt ma własną oś xC. Wymiar d łączy ją z równoległą osią x₀. Pasek obok pokazuje udział obu
            składników wzoru.
          </desc>
          <line x1="65" y1={axisY} x2="570" y2={axisY} stroke="#354025" strokeWidth="2.5" />
          <text x="575" y={axisY + 5} fontSize="15" fill="currentColor">
            x₀
          </text>
          <line
            x1="65"
            y1={rectangleY}
            x2="570"
            y2={rectangleY}
            stroke="#7d9b45"
            strokeWidth="2"
            strokeDasharray="7 5"
          />
          <text x="575" y={rectangleY + 5} fontSize="15" fill="#718233">
            xC
          </text>
          <motion.rect
            x={centerX - (widthMM * scale) / 2}
            y={rectangleY - (heightMM * scale) / 2}
            width={widthMM * scale}
            height={Math.max(3, heightMM * scale)}
            fill="#86a9c2"
            fillOpacity="0.75"
            stroke="#4f7897"
            strokeWidth="2"
            animate={{
              x: centerX - (widthMM * scale) / 2,
              y: rectangleY - (heightMM * scale) / 2,
              width: widthMM * scale,
              height: Math.max(3, heightMM * scale),
            }}
            transition={{ type: 'spring', stiffness: 160, damping: 24 }}
          />
          <line
            x1={centerX - (widthMM * scale) / 2}
            y1={rectangleY + (heightMM * scale) / 2 + 14}
            x2={centerX + (widthMM * scale) / 2}
            y2={rectangleY + (heightMM * scale) / 2 + 14}
            stroke="currentColor"
          />
          <text
            x={centerX}
            y={rectangleY + (heightMM * scale) / 2 + 31}
            textAnchor="middle"
            fontSize="12"
            fill="currentColor"
          >
            b = {widthMM} mm
          </text>
          <line x1="100" y1={axisY} x2="100" y2={rectangleY} stroke="#e77451" strokeWidth="2" />
          <line x1="91" y1={axisY} x2="109" y2={axisY} stroke="#e77451" strokeWidth="2" />
          <line x1="91" y1={rectangleY} x2="109" y2={rectangleY} stroke="#e77451" strokeWidth="2" />
          <text x="113" y={(axisY + rectangleY) / 2 + 5} fontSize="14" fill="#d36343">
            d = {distanceMM} mm
          </text>
          <text x="135" y={rectangleY + 5} fontSize="12" fill="currentColor">
            h = {heightMM} mm
          </text>
          <rect x="630" y="45" width="35" height="210" rx="6" fill="#edf0e8" />
          <motion.rect
            x="630"
            y={255 - (210 * ownShare) / 100}
            width="35"
            height={(210 * ownShare) / 100}
            fill="#86a9c2"
            animate={{ y: 255 - (210 * ownShare) / 100, height: (210 * ownShare) / 100 }}
          />
          <motion.rect
            x="630"
            y="45"
            width="35"
            height={(210 * parallelAxisTerm) / totalInertia}
            fill="#9dbb62"
            animate={{ height: (210 * parallelAxisTerm) / totalInertia }}
          />
          <text x="648" y="275" textAnchor="middle" fontSize="12" fill="currentColor">
            100% I
          </text>
          <text x="615" y="53" textAnchor="end" fontSize="12" fill="#718233">
            Ad²
          </text>
          <text x="615" y="245" textAnchor="end" fontSize="12" fill="#4f7897">
            I₀
          </text>
          <text x="360" y="309" textAnchor="middle" fontSize="13" fill="currentColor">
            A = {fmt(areaMM2)} mm² · Ad² stanowi {fmt(100 - ownShare, 1)}% całkowitego I
          </text>
        </svg>
      }
    />
  )
}
