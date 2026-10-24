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
import { Control, Lab, Metric, fmt } from '../components/UI'
import { axialStrain, stressMPa } from '../lib/engineering'
import { chartMargin, youngGPa, TensilePoint, tensileStressMPa } from './MaterialGeometryLabsShared'

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
