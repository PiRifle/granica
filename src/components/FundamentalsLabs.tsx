import { useState } from 'react'
import { motion } from 'motion/react'
import { CartesianGrid, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Control, Lab, Metric, Segmented, fmt } from './UI'
import { stressMPa } from '../lib/engineering'

const chartMargin = { top: 12, right: 18, left: 4, bottom: 24 }
const spring = { type: 'spring' as const, stiffness: 170, damping: 24 }

export function UnitsLab() {
  const [forceKN, setForceKN] = useState(12)
  const [sigmaMPa, setSigmaMPa] = useState(80)
  const forceN = forceKN * 1000
  const sigmaNMM2 = sigmaMPa
  const sigmaKNCM2 = sigmaMPa / 10
  const forcePointerX = 90 + (forceKN / 100) * 540
  const stressPointerX = 90 + (sigmaMPa / 500) * 540

  return (
    <Lab
      title="Jednostki siły i naprężenia"
      instruction="Przesuwaj wielkości i odczytuj równoważne wartości na podziałkach. Przeliczenie jednostek nie zmienia fizycznej wielkości."
      onReset={() => {
        setForceKN(12)
        setSigmaMPa(80)
      }}
      controls={
        <>
          <Control label="Siła F" value={forceKN} min={0} max={100} unit="kN" onChange={setForceKN} />
          <Control label="Naprężenie σ" value={sigmaMPa} min={0} max={500} step={5} unit="MPa" onChange={setSigmaMPa} />
        </>
      }
      metrics={
        <>
          <Metric label="Siła F" value={fmt(forceN, 0)} unit="N" tone="accent" />
          <Metric label="Naprężenie σ" value={fmt(sigmaNMM2, 2)} unit="N/mm²" />
          <Metric label="Naprężenie σ" value={fmt(sigmaKNCM2, 2)} unit="kN/cm²" />
        </>
      }
      visual={
        <svg
          viewBox="0 0 720 330"
          width="100%"
          role="img"
          aria-label="Podziałki przeliczania kiloniutonów na niutony oraz megapaskali na inne jednostki naprężenia"
        >
          <title>Wspólne podziałki jednostek</title>
          <desc>Górna podziałka przedstawia siłę, a dolna naprężenie. Wskaźniki pokazują bieżące wartości.</desc>
          <text x="90" y="38" fontSize="17" fill="currentColor">
            Siła: 1 kN = 1000 N
          </text>
          <text x="630" y="38" textAnchor="end" fontSize="16" fill="#e76f51">
            F = {fmt(forceKN, 0)} kN = {fmt(forceN, 0)} N
          </text>
          <line x1="90" y1="82" x2="630" y2="82" stroke="currentColor" strokeWidth="3" />
          {Array.from({ length: 5 }, (_, index) => {
            const value = index * 25
            const x = 90 + (value / 100) * 540
            return (
              <g key={value}>
                <line x1={x} y1="72" x2={x} y2="93" stroke="currentColor" strokeWidth="2" />
                <text x={x} y="113" textAnchor="middle" fontSize="12" fill="currentColor">
                  {value} kN
                </text>
                <text x={x} y="131" textAnchor="middle" fontSize="11" fill="currentColor" opacity="0.7">
                  {fmt(value * 1000, 0)} N
                </text>
              </g>
            )
          })}
          <motion.g animate={{ x: forcePointerX }} transition={spring}>
            <line x1="0" y1="52" x2="0" y2="96" stroke="#e76f51" strokeWidth="3" />
            <path d="M-7 48L0 58L7 48Z" fill="#e76f51" />
          </motion.g>
          <text x="90" y="177" fontSize="17" fill="currentColor">
            Naprężenie: 1 MPa = 1 N/mm² = 0,1 kN/cm²
          </text>
          <text x="630" y="177" textAnchor="end" fontSize="16" fill="#4f86c6">
            σ = {fmt(sigmaMPa, 0)} MPa
          </text>
          <line x1="90" y1="221" x2="630" y2="221" stroke="currentColor" strokeWidth="3" />
          {Array.from({ length: 6 }, (_, index) => {
            const value = index * 100
            const x = 90 + (value / 500) * 540
            return (
              <g key={value}>
                <line x1={x} y1="211" x2={x} y2="232" stroke="currentColor" strokeWidth="2" />
                <text x={x} y="252" textAnchor="middle" fontSize="12" fill="currentColor">
                  {value} MPa
                </text>
                <text x={x} y="270" textAnchor="middle" fontSize="11" fill="currentColor" opacity="0.7">
                  {fmt(value / 10, 0)} kN/cm²
                </text>
              </g>
            )
          })}
          <motion.g animate={{ x: stressPointerX }} transition={spring}>
            <line x1="0" y1="191" x2="0" y2="235" stroke="#4f86c6" strokeWidth="3" />
            <path d="M-7 187L0 197L7 187Z" fill="#4f86c6" />
          </motion.g>
          <text x="360" y="310" textAnchor="middle" fontSize="14" fill="currentColor">
            MPa i N/mm² mają tę samą wartość liczbową; kN/cm² jest 10 razy mniejszą liczbą.
          </text>
        </svg>
      }
    />
  )
}

export function ReactionsLab() {
  const [lengthMM, setLengthMM] = useState(4000)
  const [forceKN, setForceKN] = useState(20)
  const [positionMM, setPositionMM] = useState(1200)
  const rightKN = (forceKN * positionMM) / lengthMM
  const leftKN = forceKN - rightKN
  const maxMomentKNM = (forceKN * positionMM * (lengthMM - positionMM)) / lengthMM / 1000
  const forceX = 100 + (positionMM / lengthMM) * 500
  const updateLength = (next: number) => {
    setLengthMM(next)
    setPositionMM((current) => Math.min(current, next - 100))
  }

  return (
    <Lab
      title="Reakcje belki z równowagi momentów"
      instruction="Przesuwaj siłę P wzdłuż belki. Reakcję RB wyznaczamy z sumy momentów względem A, a RA z równowagi sił pionowych."
      onReset={() => {
        setLengthMM(4000)
        setForceKN(20)
        setPositionMM(1200)
      }}
      controls={
        <>
          <Control
            label="Rozpiętość L"
            value={lengthMM}
            min={1000}
            max={8000}
            step={100}
            unit="mm"
            onChange={updateLength}
          />
          <Control label="Siła skupiona P" value={forceKN} min={1} max={50} unit="kN" onChange={setForceKN} />
          <Control
            label="Położenie siły a"
            value={positionMM}
            min={100}
            max={lengthMM - 100}
            step={100}
            unit="mm"
            onChange={setPositionMM}
          />
        </>
      }
      metrics={
        <>
          <Metric label="Reakcja RA = P − RB" value={fmt(leftKN, 2)} unit="kN" tone="accent" />
          <Metric label="Reakcja RB = P·a/L" value={fmt(rightKN, 2)} unit="kN" />
          <Metric label="Moment pod siłą Mmax" value={fmt(maxMomentKNM, 2)} unit="kN·m" />
        </>
      }
      visual={
        <svg
          viewBox="0 0 720 330"
          width="100%"
          role="img"
          aria-label="Belka swobodnie podparta z siłą w dowolnym położeniu i reakcjami podpór"
        >
          <title>Równowaga belki swobodnie podpartej</title>
          <desc>Reakcje zmieniają się wraz z położeniem siły. Wymiary a i L-a opisują odległości od podpór.</desc>
          <defs>
            <marker
              id="fund-reactions-force"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill="#e76f51" />
            </marker>
            <marker
              id="fund-reactions-support"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill="#2a9d8f" />
            </marker>
          </defs>
          <text x="360" y="28" textAnchor="middle" fontSize="16" fill="currentColor">
            ΣMₐ = 0: RB·L − P·a = 0
          </text>
          <line x1="100" y1="135" x2="600" y2="135" stroke="currentColor" strokeWidth="9" strokeLinecap="round" />
          <path d="M78 169L100 143L122 169Z M578 169L600 143L622 169Z" fill="currentColor" opacity="0.35" />
          <circle cx="590" cy="174" r="6" fill="currentColor" opacity="0.45" />
          <circle cx="610" cy="174" r="6" fill="currentColor" opacity="0.45" />
          <motion.g animate={{ x: forceX }} transition={spring}>
            <line
              x1="0"
              y1="50"
              x2="0"
              y2="124"
              stroke="#e76f51"
              strokeWidth="4"
              markerEnd="url(#fund-reactions-force)"
            />
            <text x="10" y="69" fontSize="15" fill="#e76f51">
              P = {forceKN} kN
            </text>
          </motion.g>
          <line
            x1="100"
            y1="229"
            x2="100"
            y2="183"
            stroke="#2a9d8f"
            strokeWidth={2 + (leftKN / forceKN) * 2}
            markerEnd="url(#fund-reactions-support)"
          />
          <line
            x1="600"
            y1="229"
            x2="600"
            y2="183"
            stroke="#2a9d8f"
            strokeWidth={2 + (rightKN / forceKN) * 2}
            markerEnd="url(#fund-reactions-support)"
          />
          <text x="72" y="218" textAnchor="end" fontSize="14" fill="#2a9d8f">
            RA = {fmt(leftKN, 2)} kN
          </text>
          <text x="628" y="218" fontSize="14" fill="#2a9d8f">
            RB = {fmt(rightKN, 2)} kN
          </text>
          <text x="83" y="196" fontSize="14" fill="currentColor">
            A
          </text>
          <text x="613" y="196" fontSize="14" fill="currentColor">
            B
          </text>
          <line x1="100" y1="264" x2={forceX} y2="264" stroke="currentColor" />
          <line x1={forceX} y1="264" x2="600" y2="264" stroke="currentColor" />
          <line x1="100" y1="255" x2="100" y2="273" stroke="currentColor" />
          <motion.line
            x1={forceX}
            x2={forceX}
            y1="255"
            y2="273"
            animate={{ x1: forceX, x2: forceX }}
            stroke="currentColor"
            transition={spring}
          />
          <line x1="600" y1="255" x2="600" y2="273" stroke="currentColor" />
          <text x={(100 + forceX) / 2} y="288" textAnchor="middle" fontSize="13" fill="currentColor">
            a = {positionMM} mm
          </text>
          <text x={(forceX + 600) / 2} y="288" textAnchor="middle" fontSize="13" fill="currentColor">
            L − a = {lengthMM - positionMM} mm
          </text>
          <text x="360" y="316" textAnchor="middle" fontSize="14" fill="currentColor">
            ΣFy = 0: RA + RB − P = 0 · Mmax = RA·a = RB·(L−a)
          </text>
        </svg>
      }
    />
  )
}

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
              <path d="M0 0L10 5L0 10Z" fill="#e76f51" />
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
              <path d="M0 0L10 5L0 10Z" fill="#4f86c6" />
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
            fill="#4f86c6"
            opacity="0.8"
            animate={{ y: barY, height: barHeight }}
            transition={spring}
          />
          <line x1="90" y1="102" x2="110" y2="102" stroke="currentColor" strokeWidth="5" />
          <motion.g animate={{ x: cutX }} transition={spring}>
            <line x1="0" y1="53" x2="0" y2="151" stroke="#e9a23b" strokeWidth="3" strokeDasharray="6 4" />
            <text x="0" y="46" textAnchor="middle" fontSize="14" fill="#e9a23b">
              przekrój x
            </text>
          </motion.g>
          <line
            x1="550"
            y1="102"
            x2={550 + forceArrowLength}
            y2="102"
            stroke="#e76f51"
            strokeWidth="4"
            markerEnd="url(#fund-sections-force)"
          />
          <text x={550 + forceArrowLength / 2} y="83" textAnchor="middle" fontSize="15" fill="#e76f51">
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
            fill="#4f86c6"
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
            stroke="#e76f51"
            strokeWidth="3"
            markerEnd="url(#fund-sections-force)"
          />
          <text x={104 - reactionArrowLength / 2} y="253" textAnchor="middle" fontSize="14" fill="#e76f51">
            R = P
          </text>
          <motion.g animate={{ x: cutX }} transition={spring}>
            <line x1="0" y1="240" x2="0" y2="298" stroke="#e9a23b" strokeWidth="3" />
            <line
              x1="6"
              y1="269"
              x2={6 + normalArrowLength}
              y2="269"
              stroke="#4f86c6"
              strokeWidth="4"
              markerEnd="url(#fund-sections-normal)"
            />
            <text x={6 + normalArrowLength / 2} y="253" textAnchor="middle" fontSize="14" fill="#4f86c6">
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

export function SaintVenantLab() {
  const [forceKN, setForceKN] = useState(24)
  const [areaMM2, setAreaMM2] = useState(400)
  const [distanceMM, setDistanceMM] = useState(60)
  const nominalMPa = stressMPa(forceKN, areaMM2)
  const sideMM = Math.sqrt(areaMM2)
  const concentration = Math.exp(-distanceMM / (0.75 * sideMM))
  const rawProfile = Array.from({ length: 17 }, (_, index) => {
    const y = -1 + index / 8
    return 1 + 4 * concentration * Math.exp(-4 * y ** 2)
  })
  const profileMean = rawProfile.reduce((sum, value) => sum + value, 0) / rawProfile.length
  const profile = rawProfile.map((value) => (value / profileMean) * nominalMPa)
  const modelMaxMPa = Math.max(...profile)
  const uniformity = (nominalMPa / modelMaxMPa) * 100
  const sectionX = 400 - (distanceMM / 600) * 280
  const forceArrowLength = 40 + (forceKN / 50) * 45

  return (
    <Lab
      title="Zasada de Saint-Venanta"
      instruction="Oddalaj przekrój od miejsca przyłożenia siły. Animowany profil wygładza się, a naprężenie średnie pozostaje równe P/A."
      onReset={() => {
        setForceKN(24)
        setAreaMM2(400)
        setDistanceMM(60)
      }}
      controls={
        <>
          <Control label="Siła osiowa P" value={forceKN} min={5} max={50} unit="kN" onChange={setForceKN} />
          <Control
            label="Pole przekroju A"
            value={areaMM2}
            min={100}
            max={900}
            step={50}
            unit="mm²"
            onChange={setAreaMM2}
          />
          <Control
            label="Odległość od obciążonego końca x"
            value={distanceMM}
            min={0}
            max={600}
            step={10}
            unit="mm"
            onChange={setDistanceMM}
          />
        </>
      }
      metrics={
        <>
          <Metric label="Naprężenie średnie P/A" value={fmt(nominalMPa, 2)} unit="MPa" tone="accent" />
          <Metric label="Maksimum profilu modelu" value={fmt(modelMaxMPa, 2)} unit="MPa" />
          <Metric label="Równomierność σśr/σmax" value={fmt(uniformity, 1)} unit="%" />
        </>
      }
      visual={
        <svg
          viewBox="0 0 720 370"
          width="100%"
          role="img"
          aria-label="Model wygładzania rozkładu naprężeń wraz ze wzrostem odległości od siły skupionej"
        >
          <title>Ilustracja zasady de Saint-Venanta</title>
          <desc>
            Blisko obciążonego końca profil jest nierównomierny, a dalej zbliża się do prostokątnego. Jest to jakościowy
            model, nie dokładne rozwiązanie sprężyste.
          </desc>
          <defs>
            <marker
              id="fund-saint-force"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill="#e76f51" />
            </marker>
          </defs>
          <text x="550" y="31" textAnchor="middle" fontSize="15" fill="currentColor">
            Profil σ na przekroju [MPa]
          </text>
          <line x1="460" y1="54" x2="460" y2="215" stroke="currentColor" strokeWidth="2" />
          <line x1="482" y1="54" x2="482" y2="215" stroke="#2a9d8f" strokeDasharray="4 4" />
          <text x="482" y="48" textAnchor="middle" fontSize="11" fill="#2a9d8f">
            σśr
          </text>
          {profile.map((value, index) => (
            <motion.rect
              key={index}
              x="461"
              y={62 + index * 9}
              height="7"
              rx="2"
              fill={index > 5 && index < 11 ? '#e76f51' : '#4f86c6'}
              opacity={0.55 + (value / modelMaxMPa) * 0.4}
              animate={{ width: Math.max(1, (value / nominalMPa) * 22) }}
              transition={spring}
            />
          ))}
          <text x="550" y="234" textAnchor="middle" fontSize="12" fill="currentColor">
            środek przekroju · skala pozioma: 22 px = σśr
          </text>
          <path d="M75 224L100 249V294L75 319Z" fill="currentColor" opacity="0.3" />
          <line x1="100" y1="218" x2="100" y2="318" stroke="currentColor" strokeWidth="5" />
          <rect x="100" y="249" width="300" height="45" rx="3" fill="#4f86c6" opacity="0.55" />
          <line
            x1="400"
            y1="271"
            x2={400 + forceArrowLength}
            y2="271"
            stroke="#e76f51"
            strokeWidth="4"
            markerEnd="url(#fund-saint-force)"
          />
          <text x={400 + forceArrowLength / 2} y="254" textAnchor="middle" fontSize="14" fill="#e76f51">
            P = {forceKN} kN
          </text>
          <motion.g animate={{ x: sectionX }} transition={spring}>
            <line x1="0" y1="232" x2="0" y2="311" stroke="#e9a23b" strokeWidth="3" strokeDasharray="5 4" />
            <text x="0" y="226" textAnchor="middle" fontSize="13" fill="#e9a23b">
              badany przekrój
            </text>
          </motion.g>
          <line x1={sectionX} y1="327" x2="400" y2="327" stroke="currentColor" />
          <motion.line
            x1={sectionX}
            x2={sectionX}
            y1="319"
            y2="335"
            animate={{ x1: sectionX, x2: sectionX }}
            stroke="currentColor"
            transition={spring}
          />
          <line x1="400" y1="319" x2="400" y2="335" stroke="currentColor" />
          <text x={(sectionX + 400) / 2} y="349" textAnchor="middle" fontSize="13" fill="currentColor">
            x = {distanceMM} mm
          </text>
          <text x="220" y="366" textAnchor="middle" fontSize="12" fill="currentColor">
            b = √A = {fmt(sideMM, 1)} mm · odległość na rysunku w skali suwaka
          </text>
          <text x="545" y="272" textAnchor="middle" fontSize="12" fill="currentColor">
            Model ilustracyjny: przy idealnej
          </text>
          <text x="545" y="290" textAnchor="middle" fontSize="12" fill="currentColor">
            sile punktowej nie opisuje pola
          </text>
          <text x="545" y="308" textAnchor="middle" fontSize="12" fill="currentColor">
            naprężeń dokładnie przy końcu.
          </text>
        </svg>
      }
    />
  )
}

type SegmentCount = '2' | '3'

const steppedParts = [
  { lengthMM: 400, areaMM2: 200, color: '#4f86c6' },
  { lengthMM: 400, areaMM2: 350, color: '#2a9d8f' },
  { lengthMM: 400, areaMM2: 500, color: '#e9a23b' },
] as const

export function SteppedBarLab() {
  const [count, setCount] = useState<SegmentCount>('3')
  const [forceP, setForceP] = useState(18)
  const [forceQ, setForceQ] = useState(10)
  const segments = steppedParts.slice(0, Number(count)).map((part, index) => {
    const normalKN = forceP + (index === 0 ? forceQ : 0)
    return {
      ...part,
      index,
      startMM: index * part.lengthMM,
      endMM: (index + 1) * part.lengthMM,
      normalKN,
      sigmaMPa: stressMPa(normalKN, part.areaMM2),
    }
  })
  const reactionKN = forceP + forceQ
  const maxNormalKN = Math.max(...segments.map((segment) => Math.abs(segment.normalKN)))
  const critical = segments.reduce((current, segment) =>
    Math.abs(segment.sigmaMPa) > Math.abs(current.sigmaMPa) ? segment : current,
  )
  const diagramData = segments.flatMap((segment) => [
    { xM: segment.startMM / 1000, normalKN: segment.normalKN, sigmaMPa: segment.sigmaMPa },
    { xM: segment.endMM / 1000, normalKN: segment.normalKN, sigmaMPa: segment.sigmaMPa },
  ])
  const endX = 90 + segments.length * 150
  const pArrowLength = 30 + (forceP / 40) * 45
  const qArrowLength = 20 + (forceQ / 30) * 45
  const rArrowLength = 30 + (reactionKN / 70) * 45

  return (
    <Lab
      title="Pręt schodkowy: wykresy N i σ"
      instruction="Wybierz dwa lub trzy odcinki i zmień siły P oraz Q. Siła Q działa na pierwszym połączeniu, dlatego N zmienia się skokowo; pola A są różne."
      onReset={() => {
        setCount('3')
        setForceP(18)
        setForceQ(10)
      }}
      controls={
        <>
          <Segmented
            label="Liczba odcinków"
            value={count}
            onChange={setCount}
            options={[
              { value: '2', label: '2 odcinki' },
              { value: '3', label: '3 odcinki' },
            ]}
          />
          <Control label="Siła na końcu P" value={forceP} min={1} max={40} unit="kN" onChange={setForceP} />
          <Control label="Siła na połączeniu Q" value={forceQ} min={0} max={30} unit="kN" onChange={setForceQ} />
        </>
      }
      metrics={
        <>
          <Metric label="Reakcja utwierdzenia R = P + Q" value={fmt(reactionKN, 2)} unit="kN" tone="accent" />
          <Metric label="Największe |N|" value={fmt(maxNormalKN, 2)} unit="kN" />
          <Metric
            label={`Największe |σ| · odcinek ${critical.index + 1}`}
            value={fmt(critical.sigmaMPa, 2)}
            unit="MPa"
          />
        </>
      }
      visual={
        <>
          <svg
            viewBox="0 0 720 280"
            width="100%"
            role="img"
            aria-label="Utwierdzony pręt schodkowy z dwiema siłami osiowymi i oznaczonymi polami przekrojów"
          >
            <title>Schemat pręta schodkowego</title>
            <desc>
              Każdy odcinek ma długość 400 milimetrów. Siła P działa na swobodnym końcu, a Q na pierwszym połączeniu.
            </desc>
            <defs>
              <marker
                id="fund-stepped-force"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="7"
                markerHeight="7"
                orient="auto"
              >
                <path d="M0 0L10 5L0 10Z" fill="#e76f51" />
              </marker>
            </defs>
            <text x="360" y="28" textAnchor="middle" fontSize="15" fill="currentColor">
              Odcinki: L₁ = L₂ = L₃ = 400 mm · A₁ = 200, A₂ = 350, A₃ = 500 mm²
            </text>
            <path d="M65 61L90 86V139L65 164Z" fill="currentColor" opacity="0.3" />
            <line x1="90" y1="54" x2="90" y2="164" stroke="currentColor" strokeWidth="5" />
            {segments.map((segment) => {
              const x = 90 + segment.index * 150
              const height = 34 + segment.areaMM2 / 12
              return (
                <g key={segment.index}>
                  <motion.rect
                    x={x}
                    y={110 - height / 2}
                    width="150"
                    rx="3"
                    fill={segment.color}
                    opacity="0.8"
                    animate={{ height, y: 110 - height / 2 }}
                    transition={spring}
                  />
                  <text
                    x={x + 75}
                    y={176 + (segment.index % 2) * 17}
                    textAnchor="middle"
                    fontSize="12"
                    fill="currentColor"
                  >
                    {segment.index + 1}: A = {segment.areaMM2} mm²
                  </text>
                  <text x={x + 75} y="60" textAnchor="middle" fontSize="12" fill="currentColor">
                    N = {fmt(segment.normalKN, 1)} kN
                  </text>
                </g>
              )
            })}
            <line
              x1="172"
              y1="110"
              x2={172 + qArrowLength}
              y2="110"
              stroke="#e76f51"
              strokeWidth="3"
              markerEnd="url(#fund-stepped-force)"
            />
            <text x={172 + qArrowLength / 2} y="91" textAnchor="middle" fontSize="14" fill="#e76f51">
              Q = {forceQ} kN
            </text>
            <line
              x1={endX + 8}
              y1="110"
              x2={endX + 8 + pArrowLength}
              y2="110"
              stroke="#e76f51"
              strokeWidth="4"
              markerEnd="url(#fund-stepped-force)"
            />
            <text x={endX + 8 + pArrowLength / 2} y="91" textAnchor="middle" fontSize="14" fill="#e76f51">
              P = {forceP} kN
            </text>
            <line
              x1="84"
              y1="110"
              x2={84 - rArrowLength}
              y2="110"
              stroke="#e76f51"
              strokeWidth="3"
              markerEnd="url(#fund-stepped-force)"
            />
            <text x={84 - rArrowLength / 2} y="91" textAnchor="middle" fontSize="14" fill="#e76f51">
              R = {fmt(reactionKN, 1)} kN
            </text>
            {segments.map((segment) => (
              <g key={`dimension-${segment.index}`}>
                <line
                  x1={90 + segment.index * 150}
                  y1="224"
                  x2={240 + segment.index * 150}
                  y2="224"
                  stroke="currentColor"
                />
                <line
                  x1={90 + segment.index * 150}
                  y1="217"
                  x2={90 + segment.index * 150}
                  y2="231"
                  stroke="currentColor"
                />
                <text x={165 + segment.index * 150} y="247" textAnchor="middle" fontSize="12" fill="currentColor">
                  400 mm
                </text>
              </g>
            ))}
            <line x1={endX} y1="217" x2={endX} y2="231" stroke="currentColor" />
            <text x="360" y="272" textAnchor="middle" fontSize="13" fill="currentColor">
              W każdym odcinku: σᵢ = Nᵢ/Aᵢ · skok N występuje tam, gdzie przyłożono siłę Q.
            </text>
          </svg>
          <div className="lab-chart" aria-label="Wykres siły normalnej w pręcie schodkowym">
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={diagramData} margin={chartMargin}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.25} />
                <XAxis
                  dataKey="xM"
                  type="number"
                  domain={[0, segments.length * 0.4]}
                  ticks={Array.from({ length: segments.length + 1 }, (_, index) => index * 0.4)}
                  tickFormatter={(value: number) => fmt(value, 1)}
                  label={{ value: 'x [m]', position: 'insideBottomRight', offset: -12 }}
                />
                <YAxis
                  width={58}
                  domain={[0, 'auto']}
                  tickFormatter={(value: number) => fmt(value, 0)}
                  label={{ value: 'N [kN]', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip />
                <ReferenceLine y={0} stroke="currentColor" opacity={0.45} />
                <Line
                  type="linear"
                  dataKey="normalKN"
                  name="N [kN]"
                  stroke="#4f86c6"
                  strokeWidth={3}
                  dot={false}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="lab-chart" aria-label="Wykres naprężenia normalnego w pręcie schodkowym">
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={diagramData} margin={chartMargin}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.25} />
                <XAxis
                  dataKey="xM"
                  type="number"
                  domain={[0, segments.length * 0.4]}
                  ticks={Array.from({ length: segments.length + 1 }, (_, index) => index * 0.4)}
                  tickFormatter={(value: number) => fmt(value, 1)}
                  label={{ value: 'x [m]', position: 'insideBottomRight', offset: -12 }}
                />
                <YAxis
                  width={58}
                  domain={[0, 'auto']}
                  tickFormatter={(value: number) => fmt(value, 0)}
                  label={{ value: 'σ [MPa]', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip />
                <ReferenceLine y={0} stroke="currentColor" opacity={0.45} />
                <Line
                  type="linear"
                  dataKey="sigmaMPa"
                  name="σ [MPa]"
                  stroke="#e76f51"
                  strokeWidth={3}
                  dot={false}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </>
      }
    />
  )
}
