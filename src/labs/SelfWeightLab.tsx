import { useState } from 'react'
import { motion } from 'motion/react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Control, Lab, Metric, fmt } from '../components/UI'
import { selfWeightStressMPa } from '../lib/advanced'
import { chartMargin } from './MaterialGeometryLabsShared'

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
            viewBox="0 0 720 162"
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
              stroke="#3155d9"
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
                <path d="M0 0L10 5L0 10Z" fill="#3155d9" />
              </marker>
            </defs>
            <text x="273" y="35" fontSize="13" fill="#3155d9">
              x = L
            </text>
            <motion.text x="273" fontSize="13" fill="#3155d9" animate={{ y: rodBottom + 4 }}>
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
            <text x="340" y="132" fontSize="12" fill="#ff6b45">
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
              <LineChart data={chartData} margin={{ ...chartMargin, left: 14, right: 16, top: 20 }}>
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
                  width={62}
                  tickFormatter={(value: number) => fmt(value, 1)}
                  label={{ value: 'N [kN]', angle: -90, position: 'insideLeft' }}
                />
                <YAxis
                  yAxisId="stress"
                  orientation="right"
                  width={62}
                  tickFormatter={(value: number) => (value === 0 ? '' : fmt(value, 2))}
                  label={{ value: 'σ [MPa]', angle: 90, position: 'insideRight' }}
                />
                <Tooltip labelFormatter={(value) => `x = ${fmt(Number(value), 2)} m`} />
                <Line
                  yAxisId="force"
                  type="linear"
                  dataKey="forceKN"
                  name="N [kN]"
                  stroke="#4f6df5"
                  strokeWidth={3}
                  dot={false}
                  isAnimationActive={false}
                />
                <Line
                  yAxisId="stress"
                  type="linear"
                  dataKey="stress"
                  name="σ [MPa]"
                  stroke="#ff6b45"
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
