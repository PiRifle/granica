import { useState } from 'react'
import { motion } from 'motion/react'
import { Control, Lab, Metric, fmt } from '../components/UI'
import { stressMPa } from '../lib/engineering'
import { spring } from './FundamentalsLabsShared'

export function SectionsLab() {
  const [lengthMM, setLengthMM] = useState(1200)
  const [forceKN, setForceKN] = useState(18)
  const [sectionMM, setSectionMM] = useState(450)
  const [areaMM2, setAreaMM2] = useState(180)
  const normalKN = forceKN
  const sigmaMPa = stressMPa(normalKN, areaMM2)
  const cutX = 110 + (sectionMM / lengthMM) * 430
  const barHeight = 30 + (areaMM2 / 500) * 36
  const barY = 102 - barHeight / 2
  const detailHeight = barHeight * 0.88
  const detailY = 269 - detailHeight / 2
  const forceArrowLength = 45 + (forceKN / 40) * 70
  const reactionArrowLength = 28 + (forceKN / 40) * 37
  const normalArrowLength = 32 + (forceKN / 40) * 36
  const updateLength = (next: number) => {
    setLengthMM(next)
    setSectionMM((current) => Math.min(current, next - 50))
  }

  return (
    <Lab
      title="Metoda przekrojów: siła normalna N"
      instruction="Przesuń myślowy przekrój w rozciąganym pręcie. Odseparowana lewa część pozostaje w równowadze, więc N równoważy reakcję utwierdzenia."
      onReset={() => {
        setLengthMM(1200)
        setForceKN(18)
        setSectionMM(450)
        setAreaMM2(180)
      }}
      controls={
        <>
          <Control
            label="Długość pręta L"
            value={lengthMM}
            min={500}
            max={2000}
            step={50}
            unit="mm"
            onChange={updateLength}
          />
          <Control
            label="Położenie przekroju x"
            value={sectionMM}
            min={50}
            max={lengthMM - 50}
            step={10}
            unit="mm"
            onChange={setSectionMM}
          />
          <Control label="Siła osiowa P" value={forceKN} min={1} max={40} unit="kN" onChange={setForceKN} />
          <Control
            label="Pole przekroju A"
            value={areaMM2}
            min={50}
            max={500}
            step={10}
            unit="mm²"
            onChange={setAreaMM2}
          />
        </>
      }
      metrics={
        <>
          <Metric label="Siła wewnętrzna N" value={fmt(normalKN, 2)} unit="kN" tone="accent" />
          <Metric label="Naprężenie średnie σ = N/A" value={fmt(sigmaMPa, 2)} unit="MPa" />
          <Metric label="Położenie przekroju x/L" value={fmt(sectionMM / lengthMM, 2)} unit="—" />
        </>
      }
      visual={
        <svg
          viewBox="0 0 720 370"
          width="100%"
          role="img"
          aria-label="Pręt z ruchomym przekrojem oraz odseparowana część z siłą normalną"
        >
          <title>Metoda przekrojów w pręcie osiowo rozciąganym</title>
          <desc>Górny rysunek pokazuje miejsce przecięcia, a dolny równowagę lewej części pręta.</desc>
          <defs>
            <marker
              id="fund-sections-force"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill="#ff6b45" />
            </marker>
            <marker
              id="fund-sections-normal"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill="#4f6df5" />
            </marker>
          </defs>
          <text x="360" y="27" textAnchor="middle" fontSize="16" fill="currentColor">
            1. Wybierz przekrój w odległości x od utwierdzenia
          </text>
          <path d="M65 55L90 80V125L65 150Z" fill="currentColor" opacity="0.3" />
          <line x1="90" y1="48" x2="90" y2="148" stroke="currentColor" strokeWidth="5" />
          <motion.rect
            x="110"
            width="430"
            rx="4"
            fill="#4f6df5"
            opacity="0.8"
            animate={{ y: barY, height: barHeight }}
            transition={spring}
          />
          <line x1="90" y1="102" x2="110" y2="102" stroke="currentColor" strokeWidth="5" />
          <motion.g animate={{ x: cutX }} transition={spring}>
            <line x1="0" y1="53" x2="0" y2="151" stroke="#e0a14b" strokeWidth="3" strokeDasharray="6 4" />
            <text x="0" y="46" textAnchor="middle" fontSize="14" fill="#e0a14b">
              przekrój x
            </text>
          </motion.g>
          <line
            x1="550"
            y1="102"
            x2={550 + forceArrowLength}
            y2="102"
            stroke="#ff6b45"
            strokeWidth="4"
            markerEnd="url(#fund-sections-force)"
          />
          <text x={550 + forceArrowLength / 2} y="83" textAnchor="middle" fontSize="15" fill="#ff6b45">
            P = {forceKN} kN
          </text>
          <line x1="110" y1="163" x2={cutX} y2="163" stroke="currentColor" />
          <line x1="110" y1="156" x2="110" y2="170" stroke="currentColor" />
          <motion.line
            x1={cutX}
            x2={cutX}
            y1="156"
            y2="170"
            animate={{ x1: cutX, x2: cutX }}
            stroke="currentColor"
            transition={spring}
          />
          <text x={(110 + cutX) / 2} y="184" textAnchor="middle" fontSize="13" fill="currentColor">
            x = {sectionMM} mm
          </text>
          <text x="360" y="218" textAnchor="middle" fontSize="16" fill="currentColor">
            2. Odsłoń siłę N i zapisz równowagę lewej części
          </text>
          <motion.rect
            x="110"
            rx="4"
            fill="#4f6df5"
            opacity="0.45"
            animate={{ width: cutX - 110, y: detailY, height: detailHeight }}
            transition={spring}
          />
          <line x1="90" y1="238" x2="90" y2="302" stroke="currentColor" strokeWidth="5" />
          <line
            x1="104"
            y1="269"
            x2={104 - reactionArrowLength}
            y2="269"
            stroke="#ff6b45"
            strokeWidth="3"
            markerEnd="url(#fund-sections-force)"
          />
          <text x={104 - reactionArrowLength / 2} y="253" textAnchor="middle" fontSize="14" fill="#ff6b45">
            R = P
          </text>
          <motion.g animate={{ x: cutX }} transition={spring}>
            <line x1="0" y1="240" x2="0" y2="298" stroke="#e0a14b" strokeWidth="3" />
            <line
              x1="6"
              y1="269"
              x2={6 + normalArrowLength}
              y2="269"
              stroke="#4f6df5"
              strokeWidth="4"
              markerEnd="url(#fund-sections-normal)"
            />
            <text x={6 + normalArrowLength / 2} y="253" textAnchor="middle" fontSize="14" fill="#4f6df5">
              N = {fmt(normalKN, 1)} kN
            </text>
          </motion.g>
          <text x="360" y="328" textAnchor="middle" fontSize="15" fill="currentColor">
            ΣFx = 0: N − P = 0 → N = P = {fmt(normalKN, 2)} kN
          </text>
          <text x="360" y="352" textAnchor="middle" fontSize="13" fill="currentColor">
            Dla każdego x wewnątrz tego pręta N jest stałe; dodatnie N oznacza rozciąganie.
          </text>
        </svg>
      }
    />
  )
}
