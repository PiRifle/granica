import { useState } from 'react'
import { motion } from 'motion/react'
import { CartesianGrid, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Control, Lab, Metric, fmt } from '../components/UI'
import {
  bendingStressMPa,
  circleSectionModulusMM3,
  momentAtKNM,
  shearAtKN,
  simplySupportedCenterLoad,
} from '../lib/engineering'
import { chartMargin } from './LabsShared'

export function BendingLab() {
  const [forceKN, setForceKN] = useState(12)
  const [lengthMM, setLengthMM] = useState(3000)
  const [diameterMM, setDiameterMM] = useState(80)
  const beam = simplySupportedCenterLoad(forceKN, lengthMM)
  const sectionModulus = circleSectionModulusMM3(diameterMM)
  const sigmaMax = bendingStressMPa(beam.maxMomentKNM, sectionModulus)
  const span = 240 + ((lengthMM - 1000) / 5000) * 280
  const beamLeft = 290 - span / 2
  const beamRight = 290 + span / 2
  const sectionR = 40 + ((diameterMM - 30) / 120) * 35
  const forceStroke = 2 + forceKN / 12
  const reactionStroke = 2 + beam.reactionsKN.left / 12
  const diagramData = Array.from({ length: 21 }, (_, index) => {
    const xMM = (lengthMM * index) / 20
    return {
      xM: xMM / 1000,
      shearKN: shearAtKN(xMM, forceKN, lengthMM),
      momentKNM: momentAtKNM(xMM, forceKN, lengthMM),
    }
  })

  return (
    <Lab
      title="Zginanie belki swobodnie podpartej"
      instruction="Siła P działa w połowie rozpiętości L. Śledź siłę tnącą T(x), moment M(x) i naprężenie w kołowym przekroju belki."
      onReset={() => {
        setForceKN(12)
        setLengthMM(3000)
        setDiameterMM(80)
      }}
      controls={
        <>
          <Control label="Siła skupiona P" value={forceKN} min={1} max={40} unit="kN" onChange={setForceKN} />
          <Control
            label="Rozpiętość L"
            value={lengthMM}
            min={1000}
            max={6000}
            step={100}
            unit="mm"
            onChange={setLengthMM}
          />
          <Control
            label="Średnica przekroju d"
            value={diameterMM}
            min={30}
            max={150}
            step={5}
            unit="mm"
            onChange={setDiameterMM}
          />
        </>
      }
      metrics={
        <>
          <Metric label="Maksymalny moment Mmax" value={fmt(beam.maxMomentKNM, 2)} unit="kN·m" tone="accent" />
          <Metric label="Maksymalne naprężenie σmax" value={fmt(sigmaMax)} unit="MPa" />
          <Metric label="Reakcja RA = RB" value={fmt(beam.reactionsKN.left, 2)} unit="kN" />
        </>
      }
      visual={
        <>
          <svg
            viewBox="0 0 720 245"
            width="100%"
            role="img"
            aria-label="Belka z siłą w środku, reakcjami i kołowym przekrojem"
          >
            <title>Schemat belki i przekrój zginany</title>
            <defs>
              <marker
                id="bending-force"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="7"
                markerHeight="7"
                orient="auto"
              >
                <path d="M0 0L10 5L0 10z" fill="#ff6b45" />
              </marker>
              <marker
                id="bending-reaction"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="7"
                markerHeight="7"
                orient="auto"
              >
                <path d="M0 0L10 5L0 10z" fill="#27835a" />
              </marker>
              <linearGradient id="bending-section" x1="0" y1="0" x2="0" y2="1">
                <stop stopColor="#4f6df5" />
                <stop offset="0.48" stopColor="#4f6df5" stopOpacity="0.15" />
                <stop offset="0.52" stopColor="#ff6b45" stopOpacity="0.15" />
                <stop offset="1" stopColor="#ff6b45" />
              </linearGradient>
            </defs>
            <line
              x1={beamLeft}
              y1="130"
              x2={beamRight}
              y2="130"
              stroke="currentColor"
              strokeWidth="9"
              strokeLinecap="round"
            />
            <path
              d={`M${beamLeft - 20} 162 L${beamLeft} 137 L${beamLeft + 20} 162 Z M${beamRight - 20} 162 L${beamRight} 137 L${beamRight + 20} 162 Z`}
              fill="currentColor"
              opacity="0.4"
            />
            <line
              x1="290"
              y1="40"
              x2="290"
              y2="119"
              stroke="#ff6b45"
              strokeWidth={forceStroke}
              markerEnd="url(#bending-force)"
            />
            <text x="305" y="63" fontSize="15" fill="#ff6b45">
              P = {forceKN} kN
            </text>
            <line
              x1={beamLeft}
              y1="211"
              x2={beamLeft}
              y2="176"
              stroke="#27835a"
              strokeWidth={reactionStroke}
              markerEnd="url(#bending-reaction)"
            />
            <line
              x1={beamRight}
              y1="211"
              x2={beamRight}
              y2="176"
              stroke="#27835a"
              strokeWidth={reactionStroke}
              markerEnd="url(#bending-reaction)"
            />
            <text x={beamLeft - 32} y="215" fontSize="13" fill="#27835a">
              RA
            </text>
            <text x={beamRight + 13} y="215" fontSize="13" fill="#27835a">
              RB
            </text>
            <text x="290" y="158" textAnchor="middle" fontSize="13" fill="currentColor">
              L = {lengthMM} mm
            </text>
            <motion.circle
              cx="625"
              cy="126"
              fill="url(#bending-section)"
              stroke="currentColor"
              strokeWidth="2"
              animate={{ r: sectionR }}
              transition={{ type: 'spring', stiffness: 160, damping: 23 }}
            />
            <line
              x1={625 - sectionR - 8}
              y1="126"
              x2={625 + sectionR + 8}
              y2="126"
              stroke="currentColor"
              strokeDasharray="6 4"
            />
            <text x="625" y={126 - sectionR - 10} textAnchor="middle" fontSize="13" fill="#4f6df5">
              ściskanie (−σ)
            </text>
            <text x="625" y={126 + sectionR + 18} textAnchor="middle" fontSize="13" fill="#ff6b45">
              rozciąganie (+σ)
            </text>
            <text x="625" y={126 + sectionR + 34} textAnchor="middle" fontSize="12" fill="currentColor">
              oś obojętna: σ = 0 · d = {diameterMM} mm
            </text>
          </svg>
          <div className="lab-chart" aria-label="Wykres siły tnącej wzdłuż belki">
            <ResponsiveContainer width="100%" height={190}>
              <LineChart data={diagramData} margin={chartMargin}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.25} />
                <XAxis
                  dataKey="xM"
                  type="number"
                  domain={[0, lengthMM / 1000]}
                  tickFormatter={(value: number) => fmt(value, 1)}
                  label={{ value: 'x [m]', position: 'insideBottomRight', offset: -12 }}
                />
                <YAxis
                  width={52}
                  domain={[-forceKN, forceKN]}
                  tickFormatter={(value: number) => fmt(value, 0)}
                  label={{ value: 'T [kN]', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip />
                <ReferenceLine y={0} stroke="currentColor" opacity={0.45} />
                <ReferenceLine x={lengthMM / 2000} stroke="currentColor" strokeDasharray="4 4" opacity={0.35} />
                <Line
                  type="linear"
                  dataKey="shearKN"
                  name="T [kN]"
                  stroke="#e0a14b"
                  strokeWidth={3}
                  dot={false}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="lab-chart" aria-label="Wykres momentu zginającego wzdłuż belki">
            <ResponsiveContainer width="100%" height={190}>
              <LineChart data={diagramData} margin={chartMargin}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.25} />
                <XAxis
                  dataKey="xM"
                  type="number"
                  domain={[0, lengthMM / 1000]}
                  tickFormatter={(value: number) => fmt(value, 1)}
                  label={{ value: 'x [m]', position: 'insideBottomRight', offset: -12 }}
                />
                <YAxis
                  width={52}
                  domain={[0, 'auto']}
                  tickFormatter={(value: number) => fmt(value, 0)}
                  label={{ value: 'M [kN·m]', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip />
                <ReferenceLine y={0} stroke="currentColor" opacity={0.45} />
                <Line
                  type="linear"
                  dataKey="momentKNM"
                  name="M [kN·m]"
                  stroke="#4f6df5"
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
