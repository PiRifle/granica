import { useState } from 'react'
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

const failureStrain = 0.2
const ultimateStrain = 0.12
const specimenCenterX = 380
const specimenCenterY = 82
const gripWidth = 150
const taperWidth = 42
const gripHalfHeight = 27
const gaugeHalfHeight = 10
const gaugeLengthBase = 200
const maxElongation = 50
const maxArrowLength = 36

const leftGripPath = [
  `M0 ${-gripHalfHeight}`,
  `H${gripWidth}`,
  `L${gripWidth + taperWidth} ${-gaugeHalfHeight}`,
  `V${gaugeHalfHeight}`,
  `L${gripWidth} ${gripHalfHeight}`,
  `H0`,
  'Z',
].join(' ')

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
  const fullyUnloaded = unloading && currentStrain <= permanentStrain + 1e-9
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
      unloadingStress:
        unloading && !fullyUnloaded && strain >= permanentStrain && strain <= maximumStrain ? unloadingStress : null,
    }
  })
  const forceArrowLength = 16 + Math.min(maxArrowLength - 16, forceKN * 0.7)
  const phase = fullyUnloaded
    ? 'po odciążeniu — εp trwałe'
    : unloading
      ? 'odciążanie sprężyste'
      : maximumStrain <= yieldStrain
        ? 'zakres sprężysty'
        : maximumStrain <= ultimateStrain
          ? 'płynięcie i umocnienie'
          : 'przewężenie'
  const visibleStrain = Math.max(currentStrain, permanentStrain)
  const strainRatio = Math.min(1, Math.max(0, visibleStrain / failureStrain))
  const elongation = gaugeLengthBase + maxElongation * strainRatio
  const neckProgress = Math.min(1, Math.max(0, (maximumStrain - ultimateStrain) / (failureStrain - ultimateStrain)))
  const neckHalfHeight = gaugeHalfHeight - 5 * neckProgress
  const gaugeStart = specimenCenterX - elongation / 2
  const gaugeEnd = specimenCenterX + elongation / 2
  const leftGripX = gaugeStart - taperWidth - gripWidth
  const rightGripX = gaugeEnd + taperWidth + gripWidth
  const gaugePath = [
    `M${gaugeStart} ${specimenCenterY - gaugeHalfHeight}`,
    `Q${specimenCenterX} ${specimenCenterY - neckHalfHeight} ${gaugeEnd} ${specimenCenterY - gaugeHalfHeight}`,
    `L${gaugeEnd} ${specimenCenterY + gaugeHalfHeight}`,
    `Q${specimenCenterX} ${specimenCenterY + neckHalfHeight} ${gaugeStart} ${specimenCenterY + gaugeHalfHeight}`,
    'Z',
  ].join(' ')

  const changeStrain = (next: number) => {
    const residualPerMille = Math.max(0, Math.floor(permanentStrain * 1000))
    const clamped = next < maximumPerMille ? Math.max(next, residualPerMille) : next
    setStrainPerMille(clamped)
    if (clamped > maximumPerMille) setMaximumPerMille(clamped)
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
      instruction="Zwiększaj odkształcenie, aby przejść przez Re i Rm, a potem cofnij suwak. Model: E = 200 GPa, A = 100 mm², Rm przy ε = 120‰, maksymalne przewężenie przy ε = 200‰. Po odciążeniu pozostaje odkształcenie trwałe εp; sprężysty powrót jest na wykresie bardzo krótki. Uchwyty zachowują wymiary, wydłuża się tylko odcinek pomiarowy."
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
          <Metric label="Siła F" value={fmt(forceKN)} unit="kN" />
          <Metric label="Odkształcenie trwałe εp" value={fmt(permanentStrain * 1000, 2)} unit="‰" />
          <Metric label="Aktualny etap" value={phase} />
        </>
      }
      visual={
        <>
          <svg
            viewBox="0 0 760 170"
            width="100%"
            role="img"
            aria-label="Próbka rozciągana: stałe uchwyty, wydłużany odcinek pomiarowy i przewężenie"
          >
            <title>Próbka do rozciągania</title>
            <desc>
              Uchwyty zachowują stałą długość i wysokość, a wydłuża się tylko cienki odcinek pomiarowy. Po przekroczeniu
              Rm pojawia się przewężenie. Siła F wynika z naprężenia i pola przekroju 100 mm².
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
                <path d="M0 0L10 5L0 10Z" fill="#ff6b45" />
              </marker>
            </defs>
            <rect
              x={specimenCenterX - gaugeLengthBase / 2}
              y={specimenCenterY - gaugeHalfHeight}
              width={gaugeLengthBase}
              height={gaugeHalfHeight * 2}
              fill="none"
              stroke="#9aa7b4"
              strokeDasharray="4 4"
              opacity="0.7"
            />
            <g transform={`translate(${leftGripX} ${specimenCenterY})`}>
              <path d={leftGripPath} fill="#c9d6e1" stroke="#708495" strokeWidth="2" />
            </g>
            <g transform={`translate(${rightGripX} ${specimenCenterY}) scale(-1 1)`}>
              <path d={leftGripPath} fill="#c9d6e1" stroke="#708495" strokeWidth="2" />
            </g>
            <path d={gaugePath} fill="#dce5ec" stroke="#708495" strokeWidth="2" />
            <text
              x={leftGripX + gripWidth / 2}
              y={specimenCenterY - gripHalfHeight - 9}
              textAnchor="middle"
              fontSize="11"
              fill="currentColor"
              opacity="0.75"
            >
              uchwyt — stałe wymiary
            </text>
            <text
              x={specimenCenterX}
              y={specimenCenterY - gaugeHalfHeight - 9}
              textAnchor="middle"
              fontSize="11"
              fill="currentColor"
              opacity="0.75"
            >
              odcinek pomiarowy
            </text>
            {neckProgress > 0.08 && (
              <text
                x={specimenCenterX}
                y={specimenCenterY + gaugeHalfHeight + 17}
                textAnchor="middle"
                fontSize="11"
                fill="#c65c43"
                opacity={0.55 + 0.45 * neckProgress}
              >
                przewężenie
              </text>
            )}
            {forceKN > 0.05 && (
              <>
                <line
                  x1={leftGripX - 8}
                  y1={specimenCenterY}
                  x2={leftGripX - 8 - forceArrowLength}
                  y2={specimenCenterY}
                  stroke="#ff6b45"
                  strokeWidth="3"
                  markerEnd="url(#tensile-arrow)"
                />
                <line
                  x1={rightGripX + 8}
                  y1={specimenCenterY}
                  x2={rightGripX + 8 + forceArrowLength}
                  y2={specimenCenterY}
                  stroke="#ff6b45"
                  strokeWidth="3"
                  markerEnd="url(#tensile-arrow)"
                />
                <text
                  x={leftGripX - 8 - forceArrowLength}
                  y={specimenCenterY - 13}
                  textAnchor="start"
                  fontSize="12"
                  fill="#ff6b45"
                >
                  F = {fmt(forceKN)} kN
                </text>
                <text
                  x={rightGripX + 8 + forceArrowLength}
                  y={specimenCenterY - 13}
                  textAnchor="end"
                  fontSize="12"
                  fill="#ff6b45"
                >
                  F = {fmt(forceKN)} kN
                </text>
              </>
            )}
            <line x1={gaugeStart} y1={144} x2={gaugeEnd} y2={144} stroke="#3155d9" strokeWidth="2" />
            <line x1={gaugeStart} y1={138} x2={gaugeStart} y2={150} stroke="#3155d9" strokeWidth="2" />
            <line x1={gaugeEnd} y1={138} x2={gaugeEnd} y2={150} stroke="#3155d9" strokeWidth="2" />
            <line
              x1={specimenCenterX - gaugeLengthBase / 2}
              y1={144}
              x2={gaugeStart}
              y2={144}
              stroke="#27835a"
              strokeWidth="3"
            />
            <line
              x1={gaugeEnd}
              y1={144}
              x2={specimenCenterX + gaugeLengthBase / 2}
              y2={144}
              stroke="#27835a"
              strokeWidth="3"
            />
            <text x={specimenCenterX} y={160} textAnchor="middle" fontSize="12" fill="currentColor">
              ε = {fmt(currentStrain * 1000)}‰ · εmax = {fmt(maximumPerMille)}‰ · wydłużenie odcinka pomiarowego
            </text>
          </svg>
          <div className="lab-chart" style={{ width: '100%' }} aria-label="Inżynierska krzywa naprężenie-odkształcenie">
            <ResponsiveContainer width="100%" height={245}>
              <LineChart data={unloadingData} margin={{ ...chartMargin, left: 14, top: 20, right: 24 }}>
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
                  fill="#e0a14b"
                  fillOpacity={0.1}
                  label={{ value: 'zakres plastyczny', position: 'insideTopRight', fontSize: 11 }}
                />
                <ReferenceLine
                  y={Re}
                  stroke="#3155d9"
                  strokeDasharray="5 4"
                  label={{ value: 'Re', position: 'insideTopLeft', fontSize: 12 }}
                />
                <ReferenceLine
                  y={Rm}
                  stroke="#ff6b45"
                  strokeDasharray="5 4"
                  label={{ value: 'Rm', position: 'insideTopLeft', fontSize: 12 }}
                />
                <Line
                  type="monotone"
                  dataKey="stress"
                  name="obciążanie"
                  stroke="#4f6df5"
                  strokeWidth={3}
                  dot={false}
                  isAnimationActive={false}
                />
                <Line
                  type="linear"
                  dataKey="unloadingStress"
                  name="odciążanie sprężyste"
                  stroke="#3155d9"
                  strokeWidth={3}
                  strokeDasharray="5 4"
                  dot={false}
                  connectNulls={false}
                  isAnimationActive={false}
                />
                <ReferenceDot x={strainPerMille} y={sigma} r={6} fill="#ff6b45" stroke="white" strokeWidth={2} />
                {permanentStrain > 0 && (
                  <ReferenceDot
                    x={permanentStrain * 1000}
                    y={0}
                    r={5}
                    fill="#3155d9"
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
