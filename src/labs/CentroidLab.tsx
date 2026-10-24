import { useState } from 'react'
import { motion } from 'motion/react'
import { Control, Formula, Lab, Metric, fmt } from '../components/UI'
import { compositeCentroidY } from '../lib/advanced'

export function CentroidLab() {
  const [bottomWidthMM, setBottomWidthMM] = useState(160)
  const [webHeightMM, setWebHeightMM] = useState(120)
  const [topWidthMM, setTopWidthMM] = useState(80)
  const [thicknessMM, setThicknessMM] = useState(20)
  const parts = [
    { name: 'półka dolna', widthMM: bottomWidthMM, heightMM: thicknessMM, bottomMM: 0, color: '#4f6df5' },
    { name: 'środnik', widthMM: thicknessMM, heightMM: webHeightMM, bottomMM: thicknessMM, color: '#27835a' },
    {
      name: 'półka górna',
      widthMM: topWidthMM,
      heightMM: thicknessMM,
      bottomMM: thicknessMM + webHeightMM,
      color: '#ff6b45',
    },
  ].map((part) => ({
    ...part,
    areaMM2: part.widthMM * part.heightMM,
    yMM: part.bottomMM + part.heightMM / 2,
  }))
  const centroidY = compositeCentroidY(parts)
  const totalArea = parts.reduce((sum, part) => sum + part.areaMM2, 0)
  const firstMoment = parts.reduce((sum, part) => sum + part.areaMM2 * part.yMM, 0)
  const totalHeightMM = 2 * thicknessMM + webHeightMM
  const maxWidthMM = Math.max(bottomWidthMM, topWidthMM, thicknessMM)
  const scale = Math.min(265 / maxWidthMM, 245 / totalHeightMM)
  const centerX = 200
  const originY = 300
  const axisX = 45
  const svgY = (yMM: number) => originY - yMM * scale

  return (
    <Lab
      title="Środek ciężkości przekroju złożonego"
      instruction="Przekrój rozbijamy na trzy prostokąty: półkę dolną (1), środnik (2) i półkę górną (3). Każda część ma pole Aᵢ i własny środek Cᵢ na wysokości yᵢ nad osią odniesienia x₀. Środek ciężkości całego przekroju to średnia ważona tych położeń — wagami są pola."
      onReset={() => {
        setBottomWidthMM(160)
        setWebHeightMM(120)
        setTopWidthMM(80)
        setThicknessMM(20)
      }}
      controls={
        <>
          <Control
            label="Szerokość półki dolnej b₁"
            value={bottomWidthMM}
            min={80}
            max={240}
            step={10}
            unit="mm"
            onChange={setBottomWidthMM}
          />
          <Control
            label="Wysokość środnika h"
            value={webHeightMM}
            min={60}
            max={200}
            step={10}
            unit="mm"
            onChange={setWebHeightMM}
          />
          <Control
            label="Szerokość półki górnej b₃"
            value={topWidthMM}
            min={40}
            max={160}
            step={10}
            unit="mm"
            onChange={setTopWidthMM}
          />
          <Control
            label="Grubość ścianki t"
            value={thicknessMM}
            min={10}
            max={40}
            step={5}
            unit="mm"
            onChange={setThicknessMM}
          />
        </>
      }
      metrics={
        <>
          <Metric label="Pole całkowite ΣAᵢ" value={fmt(totalArea)} unit="mm²" />
          <Metric label="Moment statyczny S = ΣAᵢ·yᵢ" value={fmt(firstMoment / 1000, 1)} unit="10³ mm³" />
          <Metric label="Środek ciężkości ȳ = S / ΣAᵢ" value={fmt(centroidY, 1)} unit="mm" tone="accent" />
        </>
      }
      visual={
        <>
          <svg
            viewBox="0 0 720 360"
            width="100%"
            role="img"
            aria-label={`Przekrój złożony z trzech prostokątów, środek ciężkości na wysokości ${fmt(centroidY, 1)} milimetrów nad dolną krawędzią`}
          >
            <title>Metoda części składowych</title>
            <desc>
              Po lewej przekrój podzielony na ponumerowane prostokąty z zaznaczonymi środkami C₁, C₂, C₃ i osią
              odniesienia x₀ na dolnej krawędzi. Po prawej tabela liczy średnią ważoną: suma pól, suma iloczynów Aᵢ·yᵢ i
              wynik ȳ.
            </desc>
            <line x1="30" y1={originY} x2="355" y2={originY} stroke="currentColor" strokeWidth="1.5" />
            <text x="355" y={originY - 7} textAnchor="end" fontSize="13" fill="currentColor">
              x₀
            </text>
            <text x={centerX} y={originY + 18} textAnchor="middle" fontSize="11" fill="currentColor">
              oś odniesienia x₀ (dolna krawędź)
            </text>
            <line x1={axisX} y1={originY} x2={axisX} y2="30" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            <text x={axisX} y="22" textAnchor="middle" fontSize="13" fill="currentColor">
              y
            </text>
            <text x={axisX - 6} y={originY + 14} textAnchor="end" fontSize="11" fill="currentColor">
              0
            </text>
            <line
              x1={centerX}
              y1="34"
              x2={centerX}
              y2={originY}
              stroke="currentColor"
              strokeDasharray="5 4"
              opacity="0.3"
            />
            <text x={centerX + 7} y="42" fontSize="10" fill="currentColor" opacity="0.7">
              oś symetrii: x̄ = 0
            </text>
            {parts.map((part, index) => {
              const left = centerX - (part.widthMM * scale) / 2
              const top = svgY(part.bottomMM + part.heightMM)
              const centroidSvgY = svgY(part.yMM)
              return (
                <g key={part.name}>
                  <motion.rect
                    animate={{
                      x: left,
                      y: top,
                      width: part.widthMM * scale,
                      height: part.heightMM * scale,
                    }}
                    transition={{ type: 'spring', stiffness: 150, damping: 24 }}
                    fill={part.color}
                    fillOpacity="0.75"
                    stroke={part.color}
                    strokeWidth="2"
                  />
                  <motion.text
                    animate={{ x: left + 12, y: centroidSvgY + 5 }}
                    transition={{ type: 'spring', stiffness: 150, damping: 24 }}
                    fontSize="15"
                    fontWeight="700"
                    fill="#fff"
                  >
                    {index + 1}
                  </motion.text>
                  <motion.line
                    x1={axisX + 3}
                    x2={left - 5}
                    stroke={part.color}
                    strokeDasharray="4 3"
                    animate={{ y1: centroidSvgY, y2: centroidSvgY }}
                    transition={{ type: 'spring', stiffness: 150, damping: 24 }}
                  />
                  <motion.text
                    x={axisX - 6}
                    textAnchor="end"
                    fontSize="11"
                    fill={part.color}
                    animate={{ y: centroidSvgY + 4 }}
                    transition={{ type: 'spring', stiffness: 150, damping: 24 }}
                  >
                    y{index + 1}
                  </motion.text>
                  <motion.g
                    animate={{ x: centerX, y: centroidSvgY }}
                    transition={{ type: 'spring', stiffness: 150, damping: 24 }}
                  >
                    <circle r="4.5" fill="#fff" stroke="#17202a" strokeWidth="2" />
                    <text x="13" y="-8" fontSize="11" fontWeight="600" fill="#17202a">
                      C{index + 1}
                    </text>
                  </motion.g>
                </g>
              )
            })}
            <motion.line
              x1={axisX}
              x2="355"
              stroke="#c65c43"
              strokeWidth="1.5"
              strokeDasharray="6 4"
              animate={{ y1: svgY(centroidY), y2: svgY(centroidY) }}
              transition={{ type: 'spring', stiffness: 150, damping: 24 }}
            />
            <motion.text
              x="353"
              textAnchor="end"
              fontSize="12"
              fontWeight="600"
              fill="#c65c43"
              animate={{ y: svgY(centroidY) - 6 }}
              transition={{ type: 'spring', stiffness: 150, damping: 24 }}
            >
              ȳ = {fmt(centroidY, 1)} mm
            </motion.text>
            <motion.g
              animate={{ x: centerX, y: svgY(centroidY) }}
              transition={{ type: 'spring', stiffness: 150, damping: 24 }}
            >
              <circle r="9" fill="#fff" stroke="#c65c43" strokeWidth="3" />
              <line x1="-15" x2="15" stroke="#c65c43" strokeWidth="2.5" />
              <line y1="-15" y2="15" stroke="#c65c43" strokeWidth="2.5" />
            </motion.g>
            <text x="30" y="346" fontSize="11" fill="currentColor">
              C₁, C₂, C₃ – środki części składowych · ✛ – środek ciężkości C całego przekroju
            </text>
            <text x="395" y="34" fontSize="13" fontWeight="600" fill="currentColor">
              Rachunek krok po kroku
            </text>
            <text x="395" y="54" fontSize="11" fill="currentColor" opacity="0.75">
              1. Pole Aᵢ każdej części i położenie yᵢ jej środka
            </text>
            <text x="395" y="74" fontSize="11" fill="currentColor" opacity="0.75">
              część
            </text>
            <text x="522" y="74" textAnchor="end" fontSize="11" fill="currentColor" opacity="0.75">
              Aᵢ [mm²]
            </text>
            <text x="598" y="74" textAnchor="end" fontSize="11" fill="currentColor" opacity="0.75">
              yᵢ [mm]
            </text>
            <text x="702" y="74" textAnchor="end" fontSize="11" fill="currentColor" opacity="0.75">
              Aᵢ·yᵢ [10³ mm³]
            </text>
            {parts.map((part, index) => (
              <g key={part.name}>
                <rect x="395" y={87 + index * 24} width="10" height="10" fill={part.color} />
                <text x="411" y={96 + index * 24} fontSize="12" fill="currentColor">
                  {index + 1} {part.name}
                </text>
                <text x="522" y={96 + index * 24} textAnchor="end" fontSize="12" fill="currentColor">
                  {fmt(part.areaMM2)}
                </text>
                <text x="598" y={96 + index * 24} textAnchor="end" fontSize="12" fill="currentColor">
                  {fmt(part.yMM, 1)}
                </text>
                <text x="702" y={96 + index * 24} textAnchor="end" fontSize="12" fill="currentColor">
                  {fmt((part.areaMM2 * part.yMM) / 1000, 1)}
                </text>
              </g>
            ))}
            <line x1="395" y1="166" x2="702" y2="166" stroke="currentColor" opacity="0.3" />
            <text x="395" y="184" fontSize="12" fontWeight="600" fill="currentColor">
              2. Sumy
            </text>
            <text x="522" y="184" textAnchor="end" fontSize="12" fontWeight="600" fill="currentColor">
              {fmt(totalArea)}
            </text>
            <text x="702" y="184" textAnchor="end" fontSize="12" fontWeight="600" fill="currentColor">
              {fmt(firstMoment / 1000, 1)}
            </text>
            <rect x="390" y="196" width="317" height="48" rx="6" fill="#fff" stroke="#c65c43" strokeWidth="1.5" />
            <text x="400" y="215" fontSize="12" fontWeight="600" fill="#c65c43">
              3. Średnia ważona: ȳ = S / ΣAᵢ
            </text>
            <text x="400" y="233" fontSize="11" fill="#c65c43">
              ȳ = {fmt(firstMoment)} / {fmt(totalArea)} = {fmt(centroidY, 1)} mm
            </text>
            <text x="395" y="268" fontSize="11" fill="currentColor" opacity="0.75">
              Większe pole = większa waga, więc ȳ przesuwa się
            </text>
            <text x="395" y="284" fontSize="11" fill="currentColor" opacity="0.75">
              w stronę masywniejszej części przekroju.
            </text>
          </svg>
          <div style={{ width: '100%' }}>
            <Formula note="Oś odniesienia x₀ przechodzi przez dolną krawędź przekroju. Położenie w poziomie wynika z symetrii: x̄ = 0.">
              {'\\bar{y} = \\frac{S}{\\sum A_i} = \\frac{\\sum A_i \\cdot y_i}{\\sum A_i}'}
            </Formula>
          </div>
        </>
      }
    />
  )
}
