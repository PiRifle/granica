import { useState } from 'react'
import { motion } from 'motion/react'
import { Control, Formula, Lab, Metric, fmt } from '../components/UI'
import { rectangleInertiaMM4 } from '../lib/engineering'
import { compositeInertiaXMM4 } from '../lib/advanced'

const spring = { type: 'spring', stiffness: 160, damping: 24 } as const

export function SteinerLab() {
  const [widthMM, setWidthMM] = useState(120)
  const [heightMM, setHeightMM] = useState(40)
  const [distanceMM, setDistanceMM] = useState(100)
  const areaMM2 = widthMM * heightMM
  const ownInertia = rectangleInertiaMM4(widthMM, heightMM)
  const parallelAxisTerm = areaMM2 * distanceMM ** 2
  const totalInertia = compositeInertiaXMM4([{ areaMM2, yMM: distanceMM, ownIXMM4: ownInertia }], 0)
  const scale = Math.min(
    310 / widthMM,
    218 / (distanceMM + heightMM / 2),
    distanceMM < heightMM / 2 ? 45 / (heightMM / 2 - distanceMM) : Number.POSITIVE_INFINITY,
  )
  const centerX = 315
  const axisY = 255
  const rectW = widthMM * scale
  const rectH = heightMM * scale
  const rectX = centerX - rectW / 2
  const ownAxisY = axisY - distanceMM * scale
  const rectTop = ownAxisY - rectH / 2
  const rectBottom = ownAxisY + rectH / 2
  const widthBelow = distanceMM >= heightMM / 2
  const widthLineY = widthBelow ? rectBottom + 14 : rectTop - 12
  const widthTextY = widthBelow ? rectBottom + 30 : rectTop - 24
  const heightLineX = rectX + rectW + 16
  const distanceTextY = distanceMM === 0 ? axisY - 9 : (axisY + ownAxisY) / 2 + 5
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
        <>
          <svg
            viewBox="0 0 720 320"
            width="100%"
            role="img"
            aria-label={`Prostokąt ze środkiem ciężkości oddalonym od osi o ${distanceMM} milimetrów, moment bezwładności ${fmt(totalInertia / 1e6, 3)} razy 10 do szóstej milimetrów do czwartej`}
          >
            <title>Rozbicie momentu bezwładności według Steinera</title>
            <desc>
              Niebieski prostokąt ma własną oś xC przechodzącą przez środek ciężkości. Wymiar d łączy ją z równoległą
              osią x₀. Pasek obok pokazuje udział obu składników wzoru.
            </desc>
            <line x1="65" y1={axisY} x2="570" y2={axisY} stroke="#17202a" strokeWidth="2.5" />
            <text x="575" y={axisY + 5} fontSize="15" fill="currentColor">
              x₀
            </text>
            <motion.line
              x1="65"
              x2="570"
              y1={ownAxisY}
              y2={ownAxisY}
              stroke="#3155d9"
              strokeWidth="2"
              strokeDasharray="7 5"
              animate={{ y1: ownAxisY, y2: ownAxisY }}
              transition={spring}
            />
            {distanceMM > 10 && (
              <text x="575" y={ownAxisY + 5} fontSize="15" fill="#3155d9">
                xC
              </text>
            )}
            <motion.rect
              x={rectX}
              y={rectTop}
              width={rectW}
              height={rectH}
              fill="#8fa4f8"
              fillOpacity="0.75"
              stroke="#3155d9"
              strokeWidth="2"
              animate={{ width: rectW, height: rectH }}
              transition={spring}
            />
            <motion.line
              x1={rectX}
              x2={rectX + rectW}
              y1={widthLineY}
              y2={widthLineY}
              stroke="currentColor"
              animate={{ x1: rectX, x2: rectX + rectW, y1: widthLineY, y2: widthLineY }}
              transition={spring}
            />
            <motion.text
              x={centerX}
              y={widthTextY}
              textAnchor="middle"
              fontSize="12"
              fill="currentColor"
              animate={{}}
              transition={spring}
            >
              b = {widthMM} mm
            </motion.text>
            <motion.line
              x1={heightLineX}
              x2={heightLineX}
              y1={rectTop}
              y2={rectBottom}
              stroke="currentColor"
              animate={{ x1: heightLineX, x2: heightLineX, y1: rectTop, y2: rectBottom }}
              transition={spring}
            />
            <motion.line
              x1={heightLineX - 4}
              x2={heightLineX + 4}
              y1={rectTop}
              y2={rectTop}
              stroke="currentColor"
              animate={{ x1: heightLineX - 4, x2: heightLineX + 4, y1: rectTop, y2: rectTop }}
              transition={spring}
            />
            <motion.line
              x1={heightLineX - 4}
              x2={heightLineX + 4}
              y1={rectBottom}
              y2={rectBottom}
              stroke="currentColor"
              animate={{ x1: heightLineX - 4, x2: heightLineX + 4, y1: rectBottom, y2: rectBottom }}
              transition={spring}
            />
            <motion.text
              x={heightLineX + 9}
              y={ownAxisY + 4}
              fontSize="12"
              fill="currentColor"
              animate={{}}
              transition={spring}
            >
              h = {heightMM} mm
            </motion.text>
            <motion.line
              x1="100"
              x2="100"
              y1={axisY}
              y2={ownAxisY}
              stroke="#ff6b45"
              strokeWidth="2"
              animate={{ y2: ownAxisY }}
              transition={spring}
            />
            <line x1="91" y1={axisY} x2="109" y2={axisY} stroke="#ff6b45" strokeWidth="2" />
            <motion.line
              x1="91"
              x2="109"
              y1={ownAxisY}
              y2={ownAxisY}
              stroke="#ff6b45"
              strokeWidth="2"
              animate={{ y1: ownAxisY, y2: ownAxisY }}
              transition={spring}
            />
            <motion.text x="113" y={distanceTextY} fontSize="14" fill="#c65c43" animate={{}} transition={spring}>
              d = {distanceMM} mm
            </motion.text>
            <rect x="630" y="45" width="35" height="210" rx="6" fill="#edf1ff" />
            <motion.rect
              x="630"
              y={255 - (210 * ownShare) / 100}
              width="35"
              height={(210 * ownShare) / 100}
              fill="#8fa4f8"
              animate={{ height: (210 * ownShare) / 100 }}
              transition={spring}
            />
            <motion.rect
              x="630"
              y="45"
              width="35"
              height={(210 * parallelAxisTerm) / totalInertia}
              fill="#4f6df5"
              animate={{ height: (210 * parallelAxisTerm) / totalInertia }}
              transition={spring}
            />
            <text x="648" y="275" textAnchor="middle" fontSize="12" fill="currentColor">
              100% I
            </text>
            <text x="615" y="53" textAnchor="end" fontSize="12" fill="#3155d9">
              Ad²
            </text>
            <text x="615" y="245" textAnchor="end" fontSize="12" fill="#3155d9">
              I₀
            </text>
            <text x="360" y="309" textAnchor="middle" fontSize="13" fill="currentColor">
              A = {fmt(areaMM2)} mm² · Ad² stanowi {fmt(100 - ownShare, 1)}% całkowitego I
            </text>
          </svg>
          <Formula note="Oś x₀ jest równoległa do osi własnej xC przechodzącej przez środek ciężkości. Składnik A·d² rośnie z kwadratem odległości, więc nawet niewielkie odsunięcie osi mocno zwiększa moment bezwładności — dlatego półki kształtowników umieszcza się daleko od osi obojętnej.">
            {'I_{x_0} = I_{x_C} + A\\,d^2 = \\frac{b\\,h^3}{12} + b\\,h\\,d^2'}
          </Formula>
        </>
      }
    />
  )
}
