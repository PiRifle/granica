import { useState } from 'react'
import { motion } from 'motion/react'
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceDot,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Control, Lab, Metric, Segmented, fmt } from './UI'
import {
  axialStrain,
  bendingStressMPa,
  circleSectionModulusMM3,
  constrainedThermalStressMPa,
  elongationMM,
  mohrCircle,
  momentAtKNM,
  rectangleInertiaMM4,
  shearAtKN,
  simplySupportedCenterLoad,
  stressMPa,
  thermalStrain,
  torsionAngleDeg,
  torsionShearMPa,
} from '../lib/engineering'

const chartMargin = { top: 12, right: 18, left: 4, bottom: 24 }

export function StressLab() {
  const [forceKN, setForceKN] = useState(12)
  const [areaMM2, setAreaMM2] = useState(200)
  const sigma = stressMPa(forceKN, areaMM2)
  const forceKNPerCM2 = forceKN * 100 / areaMM2
  const intensity = Math.min(1, sigma / 400)
  const rodHeight = 44 + areaMM2 / 500 * 42
  const color = `hsl(${210 - intensity * 210} 78% 52%)`
  const level = sigma < 100 ? 'niski' : sigma < 250 ? 'umiarkowany' : 'wysoki'
  const arrowLength = 45 + forceKN / 30 * 65

  return <Lab
    title="Naprężenie normalne w pręcie"
    instruction="Zmień siłę i pole przekroju. Jednakowe σ oznacza równomierny rozkład na przekroju; poziom obciążenia nie jest oceną nośności bez danych materiału."
    onReset={() => { setForceKN(12); setAreaMM2(200) }}
    controls={<>
      <Control label="Siła osiowa F" value={forceKN} min={2} max={30} unit="kN" onChange={setForceKN} />
      <Control label="Pole przekroju A" value={areaMM2} min={50} max={500} step={10} unit="mm²" onChange={setAreaMM2} />
    </>}
    metrics={<>
      <Metric label="Naprężenie σ = F/A" value={fmt(sigma)} unit="MPa" tone="accent" />
      <Metric label="Równoważnie" value={fmt(forceKNPerCM2, 2)} unit="kN/cm²" />
      <Metric label="Względny poziom σ" value={level} />
    </>}
    visual={<svg viewBox="0 0 720 320" width="100%" role="img" aria-label="Pręt rozciągany siłami z rozkładem naprężenia">
      <title>Rozkład naprężenia normalnego</title>
      <desc>Kolor i nasycenie cząstek rosną wraz z naprężeniem. Strzałki pokazują rozciąganie.</desc>
      <defs>
        <marker id="stress-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#e76f51" />
        </marker>
      </defs>
      <text x="360" y="28" textAnchor="middle" fontSize="16" fill="currentColor">σ = F/A = const na przekroju</text>
      <motion.g animate={{ x: [-5, -11, -5] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>
        <line x1="174" y1="160" x2={174 - arrowLength} y2="160" stroke="#e76f51" strokeWidth="3" markerEnd="url(#stress-arrow)" />
        <text x={174 - arrowLength / 2} y="140" textAnchor="middle" fontSize="16" fill="#e76f51">F = {forceKN} kN</text>
      </motion.g>
      <motion.g animate={{ x: [5, 11, 5] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>
        <line x1="546" y1="160" x2={546 + arrowLength} y2="160" stroke="#e76f51" strokeWidth="3" markerEnd="url(#stress-arrow)" />
        <text x={546 + arrowLength / 2} y="140" textAnchor="middle" fontSize="16" fill="#e76f51">F = {forceKN} kN</text>
      </motion.g>
      <motion.rect x="180" width="360" rx="5" animate={{ y: 160 - rodHeight / 2, height: rodHeight, fill: color }} transition={{ type: 'spring', stiffness: 170, damping: 25 }} />
      {Array.from({ length: 48 }, (_, index) => {
        const column = index % 12
        const row = Math.floor(index / 12)
        return <motion.circle
          key={index}
          cx={198 + column * 29.5}
          r={2.4 + intensity * 1.8}
          fill="white"
          animate={{ cy: 160 - rodHeight * 0.32 + row * rodHeight * 0.213, opacity: 0.28 + intensity * 0.65 }}
          transition={{ type: 'spring', stiffness: 170, damping: 25 }}
        />
      })}
      <line x1="360" y1={160 - rodHeight / 2 - 13} x2="360" y2={160 + rodHeight / 2 + 13} stroke="currentColor" strokeDasharray="4 4" opacity="0.45" />
      <text x="372" y={160 - rodHeight / 2 - 18} fontSize="13" fill="currentColor">przekrój A = {areaMM2} mm²</text>
      <rect x="210" y="258" width="300" height="10" rx="5" fill="url(#stress-legend)" />
      <defs><linearGradient id="stress-legend"><stop stopColor="hsl(210 78% 52%)" /><stop offset="1" stopColor="hsl(0 78% 52%)" /></linearGradient></defs>
      <text x="210" y="288" fontSize="13" fill="currentColor">mniejsze σ</text>
      <text x="510" y="288" textAnchor="end" fontSize="13" fill="currentColor">większe σ</text>
      <text x="360" y="310" textAnchor="middle" fontSize="12" fill="currentColor">1 MPa = 1 N/mm² = 0,1 kN/cm²</text>
    </svg>}
  />
}

const materials = {
  steel: { label: 'Stal', youngGPa: 200 },
  aluminium: { label: 'Aluminium', youngGPa: 70 },
  wood: { label: 'Drewno', youngGPa: 12 },
} as const

type MaterialKey = keyof typeof materials

export function HookeLab() {
  const [forceKN, setForceKN] = useState(8)
  const [areaMM2, setAreaMM2] = useState(160)
  const [material, setMaterial] = useState<MaterialKey>('steel')
  const youngGPa = materials[material].youngGPa
  const sigma = stressMPa(forceKN, areaMM2)
  const strain = axialStrain(sigma, youngGPa)
  const deltaL = elongationMM(forceKN, 1000, areaMM2, youngGPa)
  const visualScale = Math.min(4, 48 / Math.max(deltaL, 0.0001))
  const visualDelta = deltaL * visualScale
  const maxStrain = Math.max(0.004, strain * 1.2)
  const forceArrowLength = 55 + forceKN / 20 * 85
  const chartData = Array.from({ length: 31 }, (_, index) => {
    const currentStrain = maxStrain * index / 30
    return {
      strainPerMille: currentStrain * 1000,
      stress: currentStrain * youngGPa * 1000,
    }
  })

  return <Lab
    title="Prawo Hooke’a: stal, aluminium i drewno"
    instruction="Dobierz materiał i obciążenie. Nachylenie prostej σ–ε to moduł Younga E; obliczenia dla pręta o długości L = 1000 mm."
    onReset={() => { setForceKN(8); setAreaMM2(160); setMaterial('steel') }}
    controls={<>
      <Control label="Siła F" value={forceKN} min={1} max={20} unit="kN" onChange={setForceKN} />
      <Control label="Pole przekroju A" value={areaMM2} min={50} max={400} step={10} unit="mm²" onChange={setAreaMM2} />
      <Segmented label="Materiał i moduł E" value={material} onChange={setMaterial} options={[
        { value: 'steel', label: 'Stal · 200 GPa' },
        { value: 'aluminium', label: 'Al · 70 GPa' },
        { value: 'wood', label: 'Drewno · 12 GPa' },
      ]} />
    </>}
    metrics={<>
      <Metric label="Wydłużenie ΔL" value={fmt(deltaL, 3)} unit="mm" tone="accent" />
      <Metric label="Odkształcenie ε" value={fmt(strain * 1000, 3)} unit="‰" />
      <Metric label="Naprężenie σ" value={fmt(sigma)} unit="MPa" />
    </>}
    visual={<>
      <svg viewBox="0 0 720 190" width="100%" role="img" aria-label="Wydłużenie pręta zgodnie z prawem Hooke’a">
        <title>Wydłużenie pręta</title>
        <defs><marker id="hooke-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="#e76f51" /></marker></defs>
        <path d="M105 50L130 85L105 120Z" fill="currentColor" opacity="0.25" />
        <line x1="130" y1="42" x2="130" y2="128" stroke="currentColor" strokeWidth="4" />
        <line x1="130" y1="135" x2={430 + visualDelta} y2="135" stroke="currentColor" strokeDasharray="5 5" opacity="0.45" />
        <motion.rect x="130" y="70" height="40" rx="4" fill="#4f86c6" animate={{ width: 300 + visualDelta }} transition={{ type: 'spring', stiffness: 170, damping: 25 }} />
        <motion.g animate={{ x: visualDelta }} transition={{ type: 'spring', stiffness: 170, damping: 25 }}>
          <line x1="430" y1="90" x2={430 + forceArrowLength} y2="90" stroke="#e76f51" strokeWidth="3" markerEnd="url(#hooke-arrow)" />
          <text x={430 + forceArrowLength / 2} y="72" textAnchor="middle" fill="#e76f51" fontSize="15">F = {fmt(forceKN, 1)} kN</text>
        </motion.g>
        <line x1="130" y1="145" x2="430" y2="145" stroke="currentColor" opacity="0.45" />
        <text x="280" y="164" textAnchor="middle" fontSize="13" fill="currentColor">L = 1000 mm</text>
        <motion.line x1="430" x2="430" y1="145" y2="145" animate={{ x1: 430, x2: 430 + visualDelta, y1: 145, y2: 145 }} stroke="#2a9d8f" strokeWidth="3" />
        <text x="575" y="124" fontSize="13" fill="currentColor">ΔL = {fmt(deltaL, 3)} mm</text>
        <text x="575" y="145" fontSize="12" fill="currentColor">rysunek: ×{fmt(visualScale, 2)}</text>
      </svg>
      <div className="lab-chart" aria-label="Wykres zależności naprężenia od odkształcenia">
        <ResponsiveContainer width="100%" height={230}>
          <LineChart data={chartData} margin={chartMargin}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.25} />
            <XAxis dataKey="strainPerMille" type="number" domain={[0, 'dataMax']} tickFormatter={(value: number) => fmt(value, 1)} label={{ value: 'ε [‰]', position: 'insideBottomRight', offset: -12 }} />
            <YAxis width={62} tickFormatter={(value: number) => fmt(value, 0)} label={{ value: 'σ [MPa]', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Line type="linear" dataKey="stress" name={`σ [MPa], ${materials[material].label}`} stroke="#4f86c6" strokeWidth={3} dot={false} isAnimationActive={false} />
            <ReferenceDot x={strain * 1000} y={sigma} r={6} fill="#e76f51" stroke="white" strokeWidth={2} label={{ value: 'stan bieżący', position: 'top', fontSize: 12 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>}
  />
}

type ThermalMode = 'free' | 'fixed'

export function ThermalLab() {
  const [mode, setMode] = useState<ThermalMode>('free')
  const [deltaT, setDeltaT] = useState(60)
  const [lengthMM, setLengthMM] = useState(1500)
  const alpha = 12e-6
  const youngGPa = 200
  const freeDeltaMM = thermalStrain(alpha, deltaT) * lengthMM
  const geometricDeltaMM = mode === 'free' ? freeDeltaMM : 0
  const sigma = mode === 'fixed' ? constrainedThermalStressMPa(alpha, deltaT, youngGPa) : 0
  const visualScale = mode === 'free' ? Math.min(2, 50 / Math.max(Math.abs(freeDeltaMM), 0.001)) : 1
  const visualDelta = geometricDeltaMM * visualScale
  const temperatureHue = 210 - (deltaT + 50) / 200 * 210
  const temperatureColor = `hsl(${temperatureHue} 78% 52%)`
  const barWidth = 300 + (lengthMM - 500) / 2500 * 240
  const rightX = 110 + barWidth
  const freeRightX = rightX + visualDelta
  const midX = (110 + freeRightX) / 2
  const initialMidX = 110 + barWidth / 2
  const thermalArrowLength = 15 + Math.min(45, Math.abs(sigma) / 300 * 45)

  return <Lab
    title="Odkształcenia i naprężenia termiczne"
    instruction="Zmień temperaturę stalowego pręta. Porównaj swobodny ruch końców z pełnym zablokowaniem; α = 12·10⁻⁶/K, E = 200 GPa."
    onReset={() => { setMode('free'); setDeltaT(60); setLengthMM(1500) }}
    controls={<>
      <Segmented label="Warunek podparcia" value={mode} onChange={setMode} options={[
        { value: 'free', label: 'Swobodny' },
        { value: 'fixed', label: 'Zablokowany' },
      ]} />
      <Control label="Przyrost temperatury ΔT" value={deltaT} min={-50} max={150} step={5} unit="°C" onChange={setDeltaT} />
      <Control label="Długość początkowa L" value={lengthMM} min={500} max={3000} step={100} unit="mm" onChange={setLengthMM} />
    </>}
    metrics={<>
      <Metric label="ΔL geometryczne" value={fmt(geometricDeltaMM, 3)} unit="mm" tone="accent" />
      <Metric label="Naprężenie termiczne σ" value={fmt(sigma)} unit="MPa" />
      <Metric label="Odkształcenie αΔT" value={fmt(thermalStrain(alpha, deltaT) * 1000, 3)} unit="‰" />
    </>}
    visual={<svg viewBox="0 0 720 320" width="100%" role="img" aria-label={mode === 'free' ? 'Swobodna zmiana długości pręta' : 'Pręt zablokowany między podporami'}>
      <title>{mode === 'free' ? 'Swobodna deformacja termiczna' : 'Zablokowana deformacja termiczna'}</title>
      <defs>
        <linearGradient id="thermal-bar"><stop stopColor={temperatureColor} stopOpacity="0.65" /><stop offset="0.5" stopColor={temperatureColor} /><stop offset="1" stopColor={temperatureColor} stopOpacity="0.65" /></linearGradient>
        <marker id="thermal-reaction" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="#e76f51" /></marker>
      </defs>
      <text x="90" y="35" fontSize="13" fill="currentColor">ΔT = −50 °C</text>
      <text x="630" y="35" textAnchor="end" fontSize="13" fill="currentColor">ΔT = +150 °C</text>
      <rect x="90" y="45" width="540" height="10" rx="5" fill="url(#thermal-legend)" />
      <defs><linearGradient id="thermal-legend"><stop stopColor="hsl(210 78% 52%)" /><stop offset="0.5" stopColor="hsl(52 78% 52%)" /><stop offset="1" stopColor="hsl(0 78% 52%)" /></linearGradient></defs>
      <line x1={90 + (deltaT + 50) / 200 * 540} y1="40" x2={90 + (deltaT + 50) / 200 * 540} y2="62" stroke="currentColor" strokeWidth="3" />
      <text x="360" y="82" textAnchor="middle" fontSize="15" fill={temperatureColor}>Aktualnie: ΔT = {deltaT} °C</text>
      <line x1="110" y1="200" x2={rightX} y2="200" stroke="currentColor" strokeDasharray="6 5" opacity="0.35" />
      <text x={initialMidX} y="220" textAnchor="middle" fontSize="12" fill="currentColor">długość początkowa L = {lengthMM} mm</text>
      <path d="M85 120L110 155L85 190Z" fill="currentColor" opacity="0.35" />
      <line x1="110" y1="110" x2="110" y2="200" stroke="currentColor" strokeWidth="5" />
      <motion.rect x="110" y="125" height="55" rx="4" fill="url(#thermal-bar)" animate={{ width: barWidth + visualDelta }} transition={{ type: 'spring', stiffness: 160, damping: 24 }} />
      {mode === 'fixed' ? <>
        <line x1={rightX} y1="110" x2={rightX} y2="200" stroke="currentColor" strokeWidth="5" />
        <path d={`M${rightX + 25} 120 L${rightX} 155 L${rightX + 25} 190 Z`} fill="currentColor" opacity="0.35" />
        <line x1={103 - thermalArrowLength} y1="152" x2="103" y2="152" stroke="#e76f51" strokeWidth="3" markerEnd="url(#thermal-reaction)" />
        <line x1={rightX + 7 + thermalArrowLength} y1="152" x2={rightX + 7} y2="152" stroke="#e76f51" strokeWidth="3" markerEnd="url(#thermal-reaction)" />
        <text x={midX} y="115" textAnchor="middle" fontSize="14" fill="#e76f51">Reakcje podpór równoważą siłę termiczną</text>
      </> : <motion.g animate={{ x: visualDelta }} transition={{ type: 'spring', stiffness: 160, damping: 24 }}>
        <line x1={rightX} y1="120" x2={rightX} y2="194" stroke="#2a9d8f" strokeWidth="3" strokeDasharray="4 3" />
        <text x={rightX} y="108" textAnchor="middle" fontSize="13" fill="#2a9d8f">koniec swobodny</text>
      </motion.g>}
      <line x1="110" y1="239" x2={freeRightX} y2="239" stroke="#2a9d8f" strokeWidth="2" />
      <text x={midX} y="260" textAnchor="middle" fontSize="14" fill="currentColor">
        {mode === 'free' ? `Swobodnie: ΔL = αΔTL = ${fmt(freeDeltaMM, 3)} mm, σ = 0` : 'Zablokowanie: ΔL geometryczne = 0'}
      </text>
      <text x="360" y="286" textAnchor="middle" fontSize="14" fill="currentColor">
        {mode === 'free' ? `Skala zmiany długości na rysunku ×${fmt(visualScale, 2)}` : `Odkształcenie całkowite = 0, więc σ = −EαΔT = ${fmt(sigma)} MPa`}
      </text>
      <text x="360" y="307" textAnchor="middle" fontSize="12" fill="currentColor">Dodatnie σ: rozciąganie · ujemne σ: ściskanie</text>
    </svg>}
  />
}

export function SectionLab() {
  const [widthMM, setWidthMM] = useState(100)
  const [heightMM, setHeightMM] = useState(240)
  const inertia = rectangleInertiaMM4(widthMM, heightMM)
  const referenceInertia = rectangleInertiaMM4(widthMM, 200)
  const flangeMM = Math.max(6, heightMM * 0.08)
  const webMM = Math.max(5, widthMM * 0.12)
  const iInertia = rectangleInertiaMM4(widthMM, heightMM) - rectangleInertiaMM4(widthMM - webMM, heightMM - 2 * flangeMM)
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

  return <Lab
    title="Moment bezwładności przekroju"
    instruction="Zmieniaj szerokość b i wysokość h. Oś obojętna przechodzi przez środek; porównanie dwuteownika ma te same wymiary zewnętrzne b × h."
    onReset={() => { setWidthMM(100); setHeightMM(240) }}
    controls={<>
      <Control label="Szerokość b" value={widthMM} min={40} max={200} step={5} unit="mm" onChange={setWidthMM} />
      <Control label="Wysokość h" value={heightMM} min={80} max={400} step={10} unit="mm" onChange={setHeightMM} />
    </>}
    metrics={<>
      <Metric label="Ix prostokąta" value={fmt(inertia / 10_000, 1)} unit="cm⁴" tone="accent" />
      <Metric label="Ix / Ix przy h = 200 mm" value={fmt(inertia / referenceInertia, 2)} unit="×" />
      <Metric label="Przewaga nad dwuteownikiem" value={fmt(inertia / iInertia, 2)} unit="×" />
    </>}
    visual={<svg viewBox="0 0 700 330" width="100%" role="img" aria-label="Porównanie prostokąta i dwuteownika o tych samych wymiarach zewnętrznych">
      <title>Przekroje i osie obojętne</title>
      <desc>Wysokość wpływa na moment bezwładności w trzeciej potędze, a szerokość liniowo.</desc>
      <text x="170" y="25" textAnchor="middle" fontSize="16" fill="currentColor">Prostokąt</text>
      <text x="520" y="25" textAnchor="middle" fontSize="16" fill="currentColor">Dwuteownik</text>
      <rect x={rectangleX} y={rectangleY} width={drawnWidth} height={drawnHeight} fill="#4f86c6" opacity="0.8" />
      <path d={iPath} fill="#e9a23b" opacity="0.9" />
      <line x1={rectangleX - 18} y1="145" x2={rectangleX + drawnWidth + 18} y2="145" stroke="white" strokeWidth="2" strokeDasharray="7 4" />
      <line x1={iX - 18} y1="145" x2={iX + drawnWidth + 18} y2="145" stroke="currentColor" strokeWidth="2" strokeDasharray="7 4" />
      <text x={rectangleX + drawnWidth + 23} y="150" fontSize="13" fill="currentColor">x</text>
      <text x={iX + drawnWidth + 23} y="150" fontSize="13" fill="currentColor">x</text>
      <line x1={rectangleX} y1="275" x2={rectangleX + drawnWidth} y2="275" stroke="currentColor" />
      <line x1={rectangleX} y1="267" x2={rectangleX} y2="282" stroke="currentColor" />
      <line x1={rectangleX + drawnWidth} y1="267" x2={rectangleX + drawnWidth} y2="282" stroke="currentColor" />
      <text x="170" y="298" textAnchor="middle" fontSize="14" fill="currentColor">b = {widthMM} mm</text>
      <line x1={rectangleX - 18} y1={rectangleY} x2={rectangleX - 18} y2={rectangleY + drawnHeight} stroke="currentColor" />
      <text x={rectangleX - 26} y="145" textAnchor="end" fontSize="14" fill="currentColor">h = {heightMM} mm</text>
      <text x="520" y="282" textAnchor="middle" fontSize="13" fill="currentColor">półki {fmt(flangeMM)} mm · środnik {fmt(webMM)} mm</text>
      <text x="350" y="323" textAnchor="middle" fontSize="15" fill="currentColor">Ix = b·h³/12 · przy b = const: Ix ∝ h³</text>
    </svg>}
  />
}

export function TorsionLab() {
  const [torqueNM, setTorqueNM] = useState(600)
  const [diameterMM, setDiameterMM] = useState(60)
  const [lengthMM, setLengthMM] = useState(800)
  const shearModulusGPa = 80
  const tauMax = torsionShearMPa(torqueNM, diameterMM)
  const angleDeg = torsionAngleDeg(torqueNM, lengthMM, diameterMM, shearModulusGPa)
  const displayAngle = Math.min(60, angleDeg)
  const wave = Math.min(48, displayAngle * 0.8)
  const twistPath = `M 130 155 C 215 ${155 - wave}, 335 ${155 + wave}, 430 155`
  const intensity = Math.min(1, tauMax / 250)
  const halfHeight = 30 + (diameterMM - 20) / 80 * 60
  const circleR = 45 + (diameterMM - 20) / 80 * 45
  const torqueStroke = 2 + torqueNM / 1000
  const tauArc = `M${620 - circleR} ${165 - circleR * 0.7} A${circleR} ${circleR} 0 0 1 ${620 + circleR * 0.7} ${165 - circleR}`

  return <Lab
    title="Skręcanie wału kołowego"
    instruction="Reguluj moment, średnicę i długość wału. Naprężenie styczne rośnie liniowo od środka do zewnętrznego włókna; G = 80 GPa."
    onReset={() => { setTorqueNM(600); setDiameterMM(60); setLengthMM(800) }}
    controls={<>
      <Control label="Moment skręcający T" value={torqueNM} min={0} max={2000} step={50} unit="N·m" onChange={setTorqueNM} />
      <Control label="Średnica d" value={diameterMM} min={20} max={100} step={5} unit="mm" onChange={setDiameterMM} />
      <Control label="Długość L" value={lengthMM} min={200} max={1500} step={50} unit="mm" onChange={setLengthMM} />
    </>}
    metrics={<>
      <Metric label="Maksymalne τ na obwodzie" value={fmt(tauMax)} unit="MPa" tone="accent" />
      <Metric label="Kąt skręcenia φ" value={fmt(angleDeg, 2)} unit="°" />
      <Metric label="Kąt φ" value={fmt(angleDeg * Math.PI / 180, 3)} unit="rad" />
    </>}
    visual={<svg viewBox="0 0 760 330" width="100%" role="img" aria-label="Skręcany walec i przekrój kołowy z rozkładem naprężeń stycznych">
      <title>Skręcanie wału</title>
      <desc>Linia na walcu pokazuje kierunek skręcenia. Kolor przekroju nasyca się wraz z maksymalnym naprężeniem.</desc>
      <defs>
        <linearGradient id="shaft-fill" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#a8c5df" /><stop offset="0.45" stopColor="#4f86c6" /><stop offset="1" stopColor="#285a88" /></linearGradient>
        <radialGradient id="torsion-tau"><stop stopColor="#457b9d" stopOpacity="0.25" /><stop offset="1" stopColor={`hsl(${205 - intensity * 205} 80% 52%)`} stopOpacity="0.95" /></radialGradient>
        <marker id="torsion-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="#e76f51" /></marker>
      </defs>
      <text x="280" y="30" textAnchor="middle" fontSize="16" fill="currentColor">Wał: d = {diameterMM} mm, L = {lengthMM} mm</text>
      <path d="M105 70L130 95V215L105 240Z" fill="currentColor" opacity="0.25" />
      <motion.rect x="130" width="300" fill="url(#shaft-fill)" animate={{ y: 155 - halfHeight, height: 2 * halfHeight }} />
      <motion.ellipse cx="130" cy="155" rx="22" fill="#729fc7" animate={{ ry: halfHeight }} />
      <motion.ellipse cx="430" cy="155" rx="22" fill="#376f9f" animate={{ ry: halfHeight }} />
      <path d="M130 155H430" stroke="white" strokeDasharray="4 4" opacity="0.35" />
      <motion.path d={twistPath} animate={{ d: twistPath }} fill="none" stroke="#ffe66d" strokeWidth="4" strokeLinecap="round" transition={{ type: 'spring', stiffness: 130, damping: 22 }} />
      <motion.path d="M405 65C445 40 490 65 475 105" fill="none" stroke="#e76f51" strokeWidth={torqueStroke} markerEnd="url(#torsion-arrow)" animate={{ strokeWidth: torqueStroke }} />
      <text x="470" y="48" fontSize="15" fill="#e76f51">T = {torqueNM} N·m</text>
      <line x1="130" y1="251" x2="430" y2="251" stroke="currentColor" />
      <line x1="130" y1="243" x2="130" y2="259" stroke="currentColor" />
      <line x1="430" y1="243" x2="430" y2="259" stroke="currentColor" />
      <text x="280" y="275" textAnchor="middle" fontSize="13" fill="currentColor">L = {lengthMM} mm</text>
      <text x="280" y="302" textAnchor="middle" fontSize="12" fill="currentColor">Linia skręcenia: wizualizacja do 60° · φ wyniku: {fmt(angleDeg, 2)}°</text>
      <text x="620" y="65" textAnchor="middle" fontSize="15" fill="currentColor">Przekrój: τ(r) = τmax·r/R</text>
      <motion.circle cx="620" cy="165" fill="url(#torsion-tau)" stroke="currentColor" strokeWidth="2" animate={{ r: circleR }} />
      {Array.from({ length: 8 }, (_, index) => {
        const angle = index * Math.PI / 4
        return <line key={index} x1="620" y1="165" x2={620 + Math.cos(angle) * (circleR - 4)} y2={165 + Math.sin(angle) * (circleR - 4)} stroke="white" strokeOpacity="0.5" strokeWidth={1 + intensity * 1.5} />
      })}
      <circle cx="620" cy="165" r="4" fill="white" />
      <motion.path d={tauArc} animate={{ d: tauArc }} fill="none" stroke="#e76f51" strokeWidth="3" markerEnd="url(#torsion-arrow)" />
      <text x="620" y="268" textAnchor="middle" fontSize="13" fill="currentColor">τ = 0 w środku · τmax na obwodzie</text>
    </svg>}
  />
}

export function BendingLab() {
  const [forceKN, setForceKN] = useState(12)
  const [lengthMM, setLengthMM] = useState(3000)
  const [diameterMM, setDiameterMM] = useState(80)
  const beam = simplySupportedCenterLoad(forceKN, lengthMM)
  const sectionModulus = circleSectionModulusMM3(diameterMM)
  const sigmaMax = bendingStressMPa(beam.maxMomentKNM, sectionModulus)
  const span = 240 + (lengthMM - 1000) / 5000 * 280
  const beamLeft = 290 - span / 2
  const beamRight = 290 + span / 2
  const sectionR = 40 + (diameterMM - 30) / 120 * 35
  const forceStroke = 2 + forceKN / 12
  const reactionStroke = 2 + beam.reactionsKN.left / 12
  const diagramData = Array.from({ length: 21 }, (_, index) => {
    const xMM = lengthMM * index / 20
    return {
      xM: xMM / 1000,
      shearKN: shearAtKN(xMM, forceKN, lengthMM),
      momentKNM: momentAtKNM(xMM, forceKN, lengthMM),
    }
  })

  return <Lab
    title="Zginanie belki swobodnie podpartej"
    instruction="Siła P działa w połowie rozpiętości L. Śledź siłę tnącą T(x), moment M(x) i naprężenie w kołowym przekroju belki."
    onReset={() => { setForceKN(12); setLengthMM(3000); setDiameterMM(80) }}
    controls={<>
      <Control label="Siła skupiona P" value={forceKN} min={1} max={40} unit="kN" onChange={setForceKN} />
      <Control label="Rozpiętość L" value={lengthMM} min={1000} max={6000} step={100} unit="mm" onChange={setLengthMM} />
      <Control label="Średnica przekroju d" value={diameterMM} min={30} max={150} step={5} unit="mm" onChange={setDiameterMM} />
    </>}
    metrics={<>
      <Metric label="Maksymalny moment Mmax" value={fmt(beam.maxMomentKNM, 2)} unit="kN·m" tone="accent" />
      <Metric label="Maksymalne naprężenie σmax" value={fmt(sigmaMax)} unit="MPa" />
      <Metric label="Reakcja RA = RB" value={fmt(beam.reactionsKN.left, 2)} unit="kN" />
    </>}
    visual={<>
      <svg viewBox="0 0 720 245" width="100%" role="img" aria-label="Belka z siłą w środku, reakcjami i kołowym przekrojem">
        <title>Schemat belki i przekrój zginany</title>
        <defs>
          <marker id="bending-force" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="#e76f51" /></marker>
          <marker id="bending-reaction" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="#2a9d8f" /></marker>
          <linearGradient id="bending-section" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#4f86c6" /><stop offset="0.48" stopColor="#4f86c6" stopOpacity="0.15" /><stop offset="0.52" stopColor="#e76f51" stopOpacity="0.15" /><stop offset="1" stopColor="#e76f51" /></linearGradient>
        </defs>
        <line x1={beamLeft} y1="130" x2={beamRight} y2="130" stroke="currentColor" strokeWidth="9" strokeLinecap="round" />
        <path d={`M${beamLeft - 20} 162 L${beamLeft} 137 L${beamLeft + 20} 162 Z M${beamRight - 20} 162 L${beamRight} 137 L${beamRight + 20} 162 Z`} fill="currentColor" opacity="0.4" />
        <line x1="290" y1="40" x2="290" y2="119" stroke="#e76f51" strokeWidth={forceStroke} markerEnd="url(#bending-force)" />
        <text x="305" y="63" fontSize="15" fill="#e76f51">P = {forceKN} kN</text>
        <line x1={beamLeft} y1="211" x2={beamLeft} y2="176" stroke="#2a9d8f" strokeWidth={reactionStroke} markerEnd="url(#bending-reaction)" />
        <line x1={beamRight} y1="211" x2={beamRight} y2="176" stroke="#2a9d8f" strokeWidth={reactionStroke} markerEnd="url(#bending-reaction)" />
        <text x={beamLeft - 32} y="215" fontSize="13" fill="#2a9d8f">RA</text>
        <text x={beamRight + 13} y="215" fontSize="13" fill="#2a9d8f">RB</text>
        <text x="290" y="158" textAnchor="middle" fontSize="13" fill="currentColor">L = {lengthMM} mm</text>
        <motion.circle cx="625" cy="126" fill="url(#bending-section)" stroke="currentColor" strokeWidth="2" animate={{ r: sectionR }} transition={{ type: 'spring', stiffness: 160, damping: 23 }} />
        <line x1={625 - sectionR - 8} y1="126" x2={625 + sectionR + 8} y2="126" stroke="currentColor" strokeDasharray="6 4" />
        <text x="625" y={126 - sectionR - 10} textAnchor="middle" fontSize="13" fill="#4f86c6">ściskanie (−σ)</text>
        <text x="625" y={126 + sectionR + 18} textAnchor="middle" fontSize="13" fill="#e76f51">rozciąganie (+σ)</text>
        <text x="625" y={126 + sectionR + 34} textAnchor="middle" fontSize="12" fill="currentColor">oś obojętna: σ = 0 · d = {diameterMM} mm</text>
      </svg>
      <div className="lab-chart" aria-label="Wykres siły tnącej wzdłuż belki">
        <ResponsiveContainer width="100%" height={190}>
          <LineChart data={diagramData} margin={chartMargin}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.25} />
            <XAxis dataKey="xM" type="number" domain={[0, lengthMM / 1000]} tickFormatter={(value: number) => fmt(value, 1)} label={{ value: 'x [m]', position: 'insideBottomRight', offset: -12 }} />
            <YAxis width={52} domain={[-forceKN, forceKN]} tickFormatter={(value: number) => fmt(value, 0)} label={{ value: 'T [kN]', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <ReferenceLine y={0} stroke="currentColor" opacity={0.45} />
            <ReferenceLine x={lengthMM / 2000} stroke="currentColor" strokeDasharray="4 4" opacity={0.35} />
            <Line type="linear" dataKey="shearKN" name="T [kN]" stroke="#e9a23b" strokeWidth={3} dot={false} isAnimationActive={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="lab-chart" aria-label="Wykres momentu zginającego wzdłuż belki">
        <ResponsiveContainer width="100%" height={190}>
          <LineChart data={diagramData} margin={chartMargin}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.25} />
            <XAxis dataKey="xM" type="number" domain={[0, lengthMM / 1000]} tickFormatter={(value: number) => fmt(value, 1)} label={{ value: 'x [m]', position: 'insideBottomRight', offset: -12 }} />
            <YAxis width={52} domain={[0, 'auto']} tickFormatter={(value: number) => fmt(value, 0)} label={{ value: 'M [kN·m]', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <ReferenceLine y={0} stroke="currentColor" opacity={0.45} />
            <Line type="linear" dataKey="momentKNM" name="M [kN·m]" stroke="#4f86c6" strokeWidth={3} dot={false} isAnimationActive={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>}
  />
}

export function MohrLab() {
  const [sigmaX, setSigmaX] = useState(80)
  const [sigmaY, setSigmaY] = useState(20)
  const [tauXY, setTauXY] = useState(40)
  const circle = mohrCircle(sigmaX, sigmaY, tauXY)
  const padding = Math.max(10, circle.radiusMPa * 0.25)
  const minSigma = Math.min(0, circle.sigma2MPa) - padding
  const maxSigma = Math.max(0, circle.sigma1MPa) + padding
  const maxTau = Math.max(10, circle.radiusMPa * 1.25)
  const scale = Math.min(560 / (maxSigma - minSigma), 120 / maxTau)
  const originX = 80 - minSigma * scale
  const originY = 155
  const centerX = originX + circle.centerMPa * scale
  const radius = Math.max(1.5, circle.radiusMPa * scale)
  const pointAX = originX + sigmaX * scale
  const pointAY = originY - tauXY * scale
  const pointBX = originX + sigmaY * scale
  const pointBY = originY + tauXY * scale
  const sigma1X = originX + circle.sigma1MPa * scale
  const sigma2X = originX + circle.sigma2MPa * scale
  const sigmaTicks = Array.from({ length: 5 }, (_, index) => minSigma + (maxSigma - minSigma) * index / 4)

  return <Lab
    title="Koło Mohra dla stanu płaskiego"
    instruction="Ustaw σx, σy i τxy. Koło pokazuje wszystkie orientacje przekroju; przecięcia z osią σ wyznaczają naprężenia główne."
    onReset={() => { setSigmaX(80); setSigmaY(20); setTauXY(40) }}
    controls={<>
      <Control label="Naprężenie normalne σx" value={sigmaX} min={-50} max={150} step={5} unit="MPa" onChange={setSigmaX} />
      <Control label="Naprężenie normalne σy" value={sigmaY} min={-100} max={100} step={5} unit="MPa" onChange={setSigmaY} />
      <Control label="Naprężenie styczne τxy" value={tauXY} min={0} max={100} step={5} unit="MPa" onChange={setTauXY} />
    </>}
    metrics={<>
      <Metric label="Naprężenie główne σ₁" value={fmt(circle.sigma1MPa)} unit="MPa" tone="accent" />
      <Metric label="Naprężenie główne σ₂" value={fmt(circle.sigma2MPa)} unit="MPa" />
      <Metric label="Maksymalne τmax = R" value={fmt(circle.maxShearMPa)} unit="MPa" />
    </>}
    visual={<svg viewBox="0 0 720 330" width="100%" role="img" aria-label="Koło Mohra na osiach naprężenia normalnego i stycznego">
      <title>Koło Mohra</title>
      <desc>Punkty A i B odpowiadają stanom na przekrojach x i y. C jest środkiem, a R promieniem koła.</desc>
      <line x1="65" y1={originY} x2="680" y2={originY} stroke="currentColor" strokeWidth="1.5" />
      <line x1={originX} y1="25" x2={originX} y2="285" stroke="currentColor" strokeWidth="1.5" />
      <path d="M680 155l-10-5v10z" fill="currentColor" />
      <path d={`M${originX} 25l-5 10h10z`} fill="currentColor" />
      <text x="687" y="160" fontSize="16" fill="currentColor">σ</text>
      <text x={originX + 9} y="32" fontSize="16" fill="currentColor">τ</text>
      {sigmaTicks.map((tick, index) => <g key={index}>
        <line x1={originX + tick * scale} y1={originY - 4} x2={originX + tick * scale} y2={originY + 4} stroke="currentColor" opacity="0.55" />
        <text x={originX + tick * scale} y={originY + 21} textAnchor="middle" fontSize="11" fill="currentColor">{fmt(tick, 0)}</text>
      </g>)}
      {[-maxTau, maxTau].map((tick) => <g key={tick}>
        <line x1={originX - 4} y1={originY - tick * scale} x2={originX + 4} y2={originY - tick * scale} stroke="currentColor" opacity="0.55" />
        <text x={originX - 9} y={originY - tick * scale + 4} textAnchor="end" fontSize="11" fill="currentColor">{fmt(tick, 0)}</text>
      </g>)}
      <motion.circle cx={centerX} cy={originY} r={radius} animate={{ cx: centerX, cy: originY, r: radius }} fill="#4f86c6" fillOpacity="0.12" stroke="#4f86c6" strokeWidth="3" transition={{ type: 'spring', stiffness: 150, damping: 24 }} />
      <motion.line x1={centerX} y1={originY} x2={pointAX} y2={pointAY} animate={{ x1: centerX, y1: originY, x2: pointAX, y2: pointAY }} stroke="#e9a23b" strokeWidth="2" strokeDasharray="5 4" transition={{ type: 'spring', stiffness: 150, damping: 24 }} />
      <motion.line x1={pointAX} y1={pointAY} x2={pointBX} y2={pointBY} animate={{ x1: pointAX, y1: pointAY, x2: pointBX, y2: pointBY }} stroke="currentColor" strokeOpacity="0.3" transition={{ type: 'spring', stiffness: 150, damping: 24 }} />
      <motion.circle r="6" fill="#e76f51" animate={{ cx: pointAX, cy: pointAY }} transition={{ type: 'spring', stiffness: 150, damping: 24 }} />
      <motion.circle r="6" fill="#e9a23b" animate={{ cx: pointBX, cy: pointBY }} transition={{ type: 'spring', stiffness: 150, damping: 24 }} />
      <motion.circle r="5" fill="currentColor" animate={{ cx: centerX, cy: originY }} transition={{ type: 'spring', stiffness: 150, damping: 24 }} />
      <circle cx={sigma1X} cy={originY} r="5" fill="#2a9d8f" />
      <circle cx={sigma2X} cy={originY} r="5" fill="#2a9d8f" />
      <text x={pointAX + 9} y={pointAY - 9} fontSize="13" fill="#e76f51">A(σx, τxy)</text>
      <text x={pointBX + 9} y={pointBY + 17} fontSize="13" fill="#e9a23b">B(σy, −τxy)</text>
      <text x={centerX} y={originY - 11} textAnchor="middle" fontSize="13" fill="currentColor">C = {fmt(circle.centerMPa)} MPa</text>
      <text x={(centerX + pointAX) / 2} y={(originY + pointAY) / 2 - 8} textAnchor="middle" fontSize="13" fill="#e9a23b">R = {fmt(circle.radiusMPa)} MPa</text>
      <text x={sigma1X} y={originY - 12} textAnchor="middle" fontSize="13" fill="#2a9d8f">σ₁</text>
      <text x={sigma2X} y={originY - 12} textAnchor="middle" fontSize="13" fill="#2a9d8f">σ₂</text>
      <text x="360" y="315" textAnchor="middle" fontSize="12" fill="currentColor">σ [MPa] · τ [MPa] · wspólna skala osi; dodatnie τ powyżej osi σ</text>
    </svg>}
  />
}
