import { useState } from 'react'
import { motion } from 'motion/react'
import { CartesianGrid, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Control, Lab, Metric, Segmented, fmt } from '../components/UI'
import { stressMPa } from '../lib/engineering'
import { chartMargin, spring, SegmentCount, steppedParts } from './FundamentalsLabsShared'

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
                <path d="M0 0L10 5L0 10Z" fill="#ff6b45" />
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
                    animate={{ height }}
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
              stroke="#ff6b45"
              strokeWidth="3"
              markerEnd="url(#fund-stepped-force)"
            />
            <text x={172 + qArrowLength / 2} y="91" textAnchor="middle" fontSize="14" fill="#ff6b45">
              Q = {forceQ} kN
            </text>
            <line
              x1={endX + 8}
              y1="110"
              x2={endX + 8 + pArrowLength}
              y2="110"
              stroke="#ff6b45"
              strokeWidth="4"
              markerEnd="url(#fund-stepped-force)"
            />
            <text x={endX + 8 + pArrowLength / 2} y="91" textAnchor="middle" fontSize="14" fill="#ff6b45">
              P = {forceP} kN
            </text>
            <line
              x1="84"
              y1="110"
              x2={84 - rArrowLength}
              y2="110"
              stroke="#ff6b45"
              strokeWidth="3"
              markerEnd="url(#fund-stepped-force)"
            />
            <text x={84 - rArrowLength / 2} y="91" textAnchor="middle" fontSize="14" fill="#ff6b45">
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
            <text x="360" y="268" textAnchor="middle" fontSize="13" fill="currentColor">
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
                  stroke="#4f6df5"
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
