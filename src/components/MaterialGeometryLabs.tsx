import { useState } from 'react'
import { motion } from 'motion/react'
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceArea,
  ReferenceDot,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Control, Lab, Metric, fmt } from './UI'
import { axialStrain, rectangleInertiaMM4, stressMPa } from '../lib/engineering'
import { compositeCentroidY, compositeInertiaXMM4, safetyFactor, selfWeightStressMPa } from '../lib/advanced'

const chartMargin = { top: 14, right: 18, left: 4, bottom: 26 }
const youngGPa = 200

interface TensilePoint {
  strainPerMille: number
  stress: number
}

function tensileStressMPa(strain: number, Re: number, Rm: number): number {
  const yieldStrain = axialStrain(Re, youngGPa)
  const ultimateStrain = 0.12
  const failureStrain = 0.2
  if (strain <= yieldStrain) return youngGPa * 1000 * strain
  if (strain <= ultimateStrain) {
    const progress = (strain - yieldStrain) / (ultimateStrain - yieldStrain)
    return Re + (Rm - Re) * Math.sin((progress * Math.PI) / 2)
  }
  const progress = (strain - ultimateStrain) / (failureStrain - ultimateStrain)
  return Rm - 0.25 * Rm * progress
}

export function TensileTestLab() {
  const [Re, setRe] = useState(250)
  const [Rm, setRm] = useState(400)
  const [strainPerMille, setStrainPerMille] = useState(40)
  const [maximumPerMille, setMaximumPerMille] = useState(40)
  const maximumStrain = maximumPerMille / 1000
  const currentStrain = strainPerMille / 1000
  const yieldStrain = axialStrain(Re, youngGPa)
  const maximumCurveStress = tensileStressMPa(maximumStrain, Re, Rm)
  const permanentStrain = Math.max(0, maximumStrain - maximumCurveStress / (youngGPa * 1000))
  const unloading = currentStrain < maximumStrain
  const curveStress = unloading
    ? Math.max(0, maximumCurveStress - youngGPa * 1000 * (maximumStrain - currentStrain))
    : maximumCurveStress
  const forceKN = (curveStress * 100) / 1000
  const sigma = stressMPa(forceKN, 100)
  const chartData: Array<TensilePoint & { unloadingStress?: number }> = Array.from({ length: 201 }, (_, index) => ({
    strainPerMille: index,
    stress: tensileStressMPa(index / 1000, Re, Rm),
  }))
  const unloadingData = chartData.map((point) => {
    const strain = point.strainPerMille / 1000
    const unloadingStress = maximumCurveStress - youngGPa * 1000 * (maximumStrain - strain)
    return {
      ...point,
      unloadingStress: unloading && strain >= permanentStrain && strain <= maximumStrain ? unloadingStress : null,
    }
  })
  const forceArrowLength = 25 + Math.min(60, forceKN)
  const phase = unloading
    ? 'odciążanie sprężyste'
    : maximumStrain <= yieldStrain
      ? 'zakres sprężysty'
      : maximumStrain <= 0.12
        ? 'płynięcie i umocnienie'
        : 'przewężenie'

  const changeStrain = (next: number) => {
    setStrainPerMille(next)
    if (next > maximumPerMille) setMaximumPerMille(next)
  }
  const changeRe = (next: number) => {
    setRe(next)
    if (Rm < next + 50) setRm(next + 50)
  }
  const changeRm = (next: number) => {
    setRm(next)
    if (Re > next - 50) setRe(next - 50)
  }

  return (
    <Lab
      title="Próba rozciągania i odciążenie próbki"
      instruction="Zwiększaj odkształcenie, aby przejść przez Re i Rm, a potem cofnij suwak. Model: E = 200 GPa, A = 100 mm², Rm przy ε = 120‰, zerwanie przy 200‰."
      onReset={() => {
        setRe(250)
        setRm(400)
        setStrainPerMille(40)
        setMaximumPerMille(40)
      }}
      controls={
        <>
          <Control
            label="Granica plastyczności Re"
            value={Re}
            min={150}
            max={500}
            step={10}
            unit="MPa"
            onChange={changeRe}
          />
          <Control label="Wytrzymałość Rm" value={Rm} min={300} max={600} step={10} unit="MPa" onChange={changeRm} />
          <Control
            label="Odkształcenie próbki ε"
            value={strainPerMille}
            min={0}
            max={200}
            step={1}
            unit="‰"
            onChange={changeStrain}
          />
        </>
      }
      metrics={
        <>
          <Metric label="Naprężenie σ = F/A" value={fmt(sigma)} unit="MPa" tone="accent" />
          <Metric label="Odkształcenie trwałe εp" value={fmt(permanentStrain * 1000, 2)} unit="‰" />
          <Metric label="Aktualny etap" value={phase} />
        </>
      }
      visual={
        <>
          <svg viewBox="0 0 720 135" width="100%" role="img" aria-label="Próbka rozciągana z zaznaczonym wydłużeniem">
            <title>Próbka do rozciągania</title>
            <desc>
              Siła wynika z naprężenia i pola 100 milimetrów kwadratowych. Pomarańczowa część wskazuje odkształcenie
              próbki.
            </desc>
            <defs>
              <marker
                id="tensile-arrow"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="7"
                markerHeight="7"
                orient="auto"
              >
                <path d="M0 0L10 5L0 10Z" fill="#e77451" />
              </marker>
            </defs>
            <line
              x1="95"
              y1="67"
              x2={95 - forceArrowLength}
              y2="67"
              stroke="#e77451"
              strokeWidth="3"
              markerEnd="url(#tensile-arrow)"
            />
            <line
              x1="625"
              y1="67"
              x2={625 + forceArrowLength}
              y2="67"
              stroke="#e77451"
              strokeWidth="3"
              markerEnd="url(#tensile-arrow)"
            />
            <text x={95 - forceArrowLength / 2} y="46" textAnchor="middle" fontSize="13" fill="#e77451">
              F = {fmt(forceKN)} kN
            </text>
            <text x={625 + forceArrowLength / 2} y="46" textAnchor="middle" fontSize="13" fill="#e77451">
              F
            </text>
            <path
              d="M95 47H220L265 57H455L500 47H625V87H500L455 77H265L220 87H95Z"
              fill="#dce5ec"
              stroke="#708495"
              strokeWidth="2"
            />
            <motion.rect
              x="265"
              y="57"
              height="20"
              rx="4"
              fill="#e9a38b"
              animate={{ width: 190 + currentStrain * 300 }}
              transition={{ type: 'spring', stiffness: 180, damping: 24 }}
            />
            <line x1="360" y1="99" x2="360" y2="118" stroke="#718233" strokeWidth="2" />
            <text x="360" y="130" textAnchor="middle" fontSize="12" fill="currentColor">
              ε = {fmt(currentStrain * 1000)}‰ · εmax = {fmt(maximumPerMille)}‰
            </text>
          </svg>
          <div className="lab-chart" style={{ width: '100%' }} aria-label="Inżynierska krzywa naprężenie-odkształcenie">
            <ResponsiveContainer width="100%" height={245}>
              <LineChart data={unloadingData} margin={chartMargin}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.25} />
                <XAxis
                  dataKey="strainPerMille"
                  type="number"
                  domain={[0, 200]}
                  tickFormatter={(value: number) => fmt(value, 0)}
                  label={{ value: 'ε [‰]', position: 'insideBottomRight', offset: -14 }}
                />
                <YAxis
                  width={58}
                  domain={[0, 'dataMax']}
                  tickFormatter={(value: number) => fmt(value, 0)}
                  label={{ value: 'σ [MPa]', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip
                  formatter={(value) => `${fmt(Number(value))} MPa`}
                  labelFormatter={(value) => `ε = ${fmt(Number(value))}‰`}
                />
                <ReferenceArea
                  x1={yieldStrain * 1000}
                  x2={200}
                  fill="#e9c46a"
                  fillOpacity={0.1}
                  label={{ value: 'zakres plastyczny', position: 'insideTopRight', fontSize: 11 }}
                />
                <ReferenceLine
                  y={Re}
                  stroke="#7d9b45"
                  strokeDasharray="5 4"
                  label={{ value: 'Re', position: 'insideTopLeft', fontSize: 12 }}
                />
                <ReferenceLine
                  y={Rm}
                  stroke="#d9854b"
                  strokeDasharray="5 4"
                  label={{ value: 'Rm', position: 'insideTopLeft', fontSize: 12 }}
                />
                <Line
                  type="monotone"
                  dataKey="stress"
                  name="obciążanie"
                  stroke="#4f86c6"
                  strokeWidth={3}
                  dot={false}
                  isAnimationActive={false}
                />
                <Line
                  type="linear"
                  dataKey="unloadingStress"
                  name="odciążanie"
                  stroke="#7d9b45"
                  strokeWidth={3}
                  dot={false}
                  connectNulls={false}
                  isAnimationActive={false}
                />
                <ReferenceDot x={strainPerMille} y={sigma} r={6} fill="#e77451" stroke="white" strokeWidth={2} />
                {permanentStrain > 0 && (
                  <ReferenceDot
                    x={permanentStrain * 1000}
                    y={0}
                    r={5}
                    fill="#7d9b45"
                    label={{ value: 'εp', position: 'top', fontSize: 12 }}
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </>
      }
    />
  )
}

export function SelfWeightLab() {
  const [gamma, setGamma] = useState(77)
  const [lengthMM, setLengthMM] = useState(8000)
  const [areaMM2, setAreaMM2] = useState(300)
  const chartData = Array.from({ length: 21 }, (_, index) => {
    const xMM = (lengthMM * index) / 20
    return {
      xM: xMM / 1000,
      forceKN: gamma * areaMM2 * xMM * 1e-6,
      stress: selfWeightStressMPa(gamma, xMM),
    }
  })
  const maximumForceKN = gamma * areaMM2 * lengthMM * 1e-6
  const maximumStress = selfWeightStressMPa(gamma, lengthMM)
  const rodWidth = 16 + areaMM2 / 20
  const rodHeight = 42 + ((lengthMM - 1000) / 19000) * 63
  const rodBottom = 24 + rodHeight
  const gammaColor = `hsl(${205 - ((gamma - 10) / 90) * 40} 45% 55%)`

  return (
    <Lab
      title="Pręt zawieszony: ciężar własny"
      instruction="Przekrój x mierzymy od swobodnego dolnego końca. N(x) jest masą pręta poniżej przekroju wyrażoną w kN; największe N i σ występują przy utwierdzeniu."
      onReset={() => {
        setGamma(77)
        setLengthMM(8000)
        setAreaMM2(300)
      }}
      controls={
        <>
          <Control label="Ciężar objętościowy γ" value={gamma} min={10} max={100} unit="kN/m³" onChange={setGamma} />
          <Control
            label="Długość pręta L"
            value={lengthMM}
            min={1000}
            max={20000}
            step={500}
            unit="mm"
            onChange={setLengthMM}
          />
          <Control
            label="Pole przekroju A"
            value={areaMM2}
            min={100}
            max={1000}
            step={50}
            unit="mm²"
            onChange={setAreaMM2}
          />
        </>
      }
      metrics={
        <>
          <Metric label="Siła przy utwierdzeniu N(L)" value={fmt(maximumForceKN, 2)} unit="kN" tone="accent" />
          <Metric label="Maksymalne σ(L) = γL" value={fmt(maximumStress, 3)} unit="MPa" />
          <Metric label="Naprężenie w połowie σ(L/2)" value={fmt(maximumStress / 2, 3)} unit="MPa" />
        </>
      }
      visual={
        <>
          <svg
            viewBox="0 0 720 155"
            width="100%"
            role="img"
            aria-label="Pionowy pręt utwierdzony u góry i obciążony ciężarem własnym"
          >
            <title>Ciężar własny pręta</title>
            <desc>Współrzędna x rośnie od dolnego końca do utwierdzenia. Siła w przekroju rośnie liniowo w górę.</desc>
            <line x1="85" y1="24" x2="225" y2="24" stroke="currentColor" strokeWidth="5" />
            {Array.from({ length: 8 }, (_, index) => (
              <line
                key={index}
                x1={90 + index * 18}
                y1="24"
                x2={80 + index * 18}
                y2="10"
                stroke="currentColor"
                opacity="0.45"
              />
            ))}
            <motion.rect
              x={155 - rodWidth / 2}
              y="24"
              fill={gammaColor}
              animate={{ width: rodWidth, height: rodHeight }}
              transition={{ type: 'spring', stiffness: 180, damping: 24 }}
            />
            <line
              x1="260"
              y1={rodBottom}
              x2="260"
              y2="28"
              stroke="#7d9b45"
              strokeWidth="2"
              markerEnd="url(#self-weight-axis)"
            />
            <defs>
              <marker
                id="self-weight-axis"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="7"
                markerHeight="7"
                orient="auto"
              >
                <path d="M0 0L10 5L0 10Z" fill="#7d9b45" />
              </marker>
            </defs>
            <text x="273" y="35" fontSize="13" fill="#718233">
              x = L
            </text>
            <motion.text x="273" fontSize="13" fill="#718233" animate={{ y: rodBottom + 4 }}>
              x = 0
            </motion.text>
            <text x="340" y="48" fontSize="14" fill="currentColor">
              N(x) = γ·A·x·10⁻⁶ [kN]
            </text>
            <text x="340" y="78" fontSize="14" fill="currentColor">
              σ(x) = N(x)/A = γ·x·10⁻⁶ [MPa]
            </text>
            <text x="340" y="108" fontSize="12" fill="currentColor">
              x w mm, γ w kN/m³, A w mm²
            </text>
            <text x="340" y="132" fontSize="12" fill="#e77451">
              N(L) = {fmt(maximumForceKN, 2)} kN
            </text>
            <text x="340" y="150" fontSize="12" fill="currentColor">
              γ = {gamma} kN/m³ · L = {lengthMM} mm · A = {areaMM2} mm²
            </text>
          </svg>
          <div
            className="lab-chart"
            style={{ width: '100%' }}
            aria-label="Wykres siły osiowej i naprężenia od położenia przekroju"
          >
            <ResponsiveContainer width="100%" height={210}>
              <LineChart data={chartData} margin={chartMargin}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.25} />
                <XAxis
                  dataKey="xM"
                  type="number"
                  domain={[0, 'dataMax']}
                  tickFormatter={(value: number) => fmt(value, 1)}
                  label={{ value: 'x od dolnego końca [m]', position: 'insideBottomRight', offset: -14 }}
                />
                <YAxis
                  yAxisId="force"
                  width={48}
                  tickFormatter={(value: number) => fmt(value, 1)}
                  label={{ value: 'N [kN]', angle: -90, position: 'insideLeft' }}
                />
                <YAxis
                  yAxisId="stress"
                  orientation="right"
                  width={48}
                  tickFormatter={(value: number) => fmt(value, 2)}
                  label={{ value: 'σ [MPa]', angle: 90, position: 'insideRight' }}
                />
                <Tooltip labelFormatter={(value) => `x = ${fmt(Number(value), 2)} m`} />
                <Line
                  yAxisId="force"
                  type="linear"
                  dataKey="forceKN"
                  name="N [kN]"
                  stroke="#4f86c6"
                  strokeWidth={3}
                  dot={false}
                  isAnimationActive={false}
                />
                <Line
                  yAxisId="stress"
                  type="linear"
                  dataKey="stress"
                  name="σ [MPa]"
                  stroke="#e77451"
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

export function SafetyLab() {
  const [forceKN, setForceKN] = useState(40)
  const [areaMM2, setAreaMM2] = useState(250)
  const [Re, setRe] = useState(235)
  const [requiredFactor, setRequiredFactor] = useState(1.5)
  const sigma = stressMPa(forceKN, areaMM2)
  const allowable = Re / requiredFactor
  const actualFactor = safetyFactor(Re, sigma)
  const requiredArea = (forceKN * 1000) / allowable
  const safe = sigma <= allowable
  const scaleMaxMPa = Math.max(allowable * 2, sigma * 1.15, 1)
  const gaugeWidth = Math.min(100, (sigma / scaleMaxMPa) * 100)
  const limitWidth = (allowable / scaleMaxMPa) * 100

  return (
    <Lab
      title="Warunek wytrzymałości i dobór przekroju"
      instruction="Dla zadanej granicy Re oblicz naprężenie dopuszczalne σdop = Re/n. Warunek dotyczy wyłącznie naprężenia normalnego w modelu F/A."
      onReset={() => {
        setForceKN(40)
        setAreaMM2(250)
        setRe(235)
        setRequiredFactor(1.5)
      }}
      controls={
        <>
          <Control label="Siła rozciągająca F" value={forceKN} min={1} max={100} unit="kN" onChange={setForceKN} />
          <Control
            label="Pole przekroju A"
            value={areaMM2}
            min={50}
            max={600}
            step={10}
            unit="mm²"
            onChange={setAreaMM2}
          />
          <Control label="Granica materiału Re" value={Re} min={100} max={500} step={5} unit="MPa" onChange={setRe} />
          <Control
            label="Wymagany współczynnik n"
            value={requiredFactor}
            min={1.1}
            max={3}
            step={0.1}
            unit="–"
            format={(value) => fmt(value, 1)}
            onChange={setRequiredFactor}
          />
        </>
      }
      metrics={
        <>
          <Metric label="Naprężenie rzeczywiste σ" value={fmt(sigma)} unit="MPa" tone={safe ? 'accent' : undefined} />
          <Metric label="Rzeczywiste n = Re/σ" value={fmt(actualFactor, 2)} unit="–" />
          <Metric label="Wymagane pole Amin" value={fmt(requiredArea)} unit="mm²" tone="accent" />
        </>
      }
      visual={
        <svg
          viewBox="0 0 720 320"
          width="100%"
          role="img"
          aria-label={`Porównanie naprężenia z dopuszczalnym: warunek ${safe ? 'spełniony' : 'niespełniony'}`}
        >
          <title>Ocena warunku σ ≤ Re/n</title>
          <desc>
            Niebieski pasek pokazuje naprężenie rzeczywiste, a zielona linia naprężenie dopuszczalne. Skala
            automatycznie obejmuje obie wartości.
          </desc>
          <text x="70" y="46" fontSize="17" fill="currentColor">
            σ = {fmt(sigma)} MPa
          </text>
          <text x="650" y="46" textAnchor="end" fontSize="17" fill={safe ? '#718233' : '#c45f42'}>
            {safe ? '✓ warunek spełniony' : '✕ warunek niespełniony'}
          </text>
          <rect x="70" y="78" width="580" height="52" rx="8" fill="#edf0e8" />
          <motion.rect
            x="70"
            y="78"
            height="52"
            rx="8"
            fill={safe ? '#9dbb62' : '#df8063'}
            animate={{ width: 5.8 * gaugeWidth }}
            transition={{ type: 'spring', stiffness: 150, damping: 23 }}
          />
          <line
            x1={70 + 5.8 * limitWidth}
            y1="65"
            x2={70 + 5.8 * limitWidth}
            y2="145"
            stroke="#455537"
            strokeWidth="3"
            strokeDasharray="6 4"
          />
          <text x={70 + 5.8 * limitWidth} y="164" textAnchor="middle" fontSize="13" fill="currentColor">
            σdop = {fmt(allowable)} MPa
          </text>
          <text x="70" y="190" fontSize="12" fill="currentColor">
            0
          </text>
          <text x="650" y="190" textAnchor="end" fontSize="12" fill="currentColor">
            skala: {fmt(scaleMaxMPa)} MPa
          </text>
          <rect x="70" y="215" width="580" height="72" rx="10" fill="#f0f5e7" />
          <text x="360" y="242" textAnchor="middle" fontSize="15" fill="currentColor">
            σ ≤ σdop ⇔ Re/σ ≥ n ⇔ A ≥ F·1000·n/Re
          </text>
          <text x="360" y="270" textAnchor="middle" fontSize="13" fill={safe ? '#718233' : '#c45f42'}>
            {safe
              ? `Zapas pola: ${fmt(areaMM2 - requiredArea)} mm²`
              : `Brakuje pola: ${fmt(requiredArea - areaMM2)} mm²`}
          </text>
        </svg>
      }
    />
  )
}

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
