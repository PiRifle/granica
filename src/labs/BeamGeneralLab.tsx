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
import { Control, Lab, Metric, fmt } from '../components/UI'
import { chartMargin } from './ShearBeamLabsShared'

export function BeamGeneralLab() {
  const [forceKN, setForceKN] = useState(20)
  const [distanceAMM, setDistanceAMM] = useState(1400)
  const lengthMM = 4000
  const distanceBMM = lengthMM - distanceAMM
  const reactionAKN = (forceKN * distanceBMM) / lengthMM
  const reactionBKN = (forceKN * distanceAMM) / lengthMM
  const maxMomentKNM = (reactionAKN * distanceAMM) / 1000
  const loadX = 100 + (distanceAMM / lengthMM) * 520
  const loadStroke = 3 + forceKN / 12
  const reactionStroke = 2 + Math.max(reactionAKN, reactionBKN) / 12
  const diagramData = [
    { xM: 0, shearKN: reactionAKN, momentKNM: 0 },
    { xM: distanceAMM / 1000, shearKN: reactionAKN, momentKNM: maxMomentKNM },
    { xM: distanceAMM / 1000, shearKN: -reactionBKN, momentKNM: maxMomentKNM },
    { xM: lengthMM / 1000, shearKN: -reactionBKN, momentKNM: 0 },
  ]

  return (
    <Lab
      title="Belka swobodnie podparta: siła w dowolnym miejscu"
      instruction="Przesuwaj siłę P względem podpór. Dla stałej rozpiętości L = 4 m reakcje wynikają z równowagi, a największy moment występuje pod siłą: Mmax = RA·a."
      onReset={() => {
        setForceKN(20)
        setDistanceAMM(1400)
      }}
      controls={
        <>
          <Control label="Siła skupiona P" value={forceKN} min={5} max={50} step={5} unit="kN" onChange={setForceKN} />
          <Control
            label="Odległość od podpory A: a"
            value={distanceAMM}
            min={400}
            max={3600}
            step={100}
            unit="mm"
            onChange={setDistanceAMM}
          />
        </>
      }
      metrics={
        <>
          <Metric label="Reakcja RA = P(L−a)/L" value={fmt(reactionAKN, 2)} unit="kN" />
          <Metric label="Reakcja RB = Pa/L" value={fmt(reactionBKN, 2)} unit="kN" />
          <Metric label="Mmax = RA·a" value={fmt(maxMomentKNM, 2)} unit="kN·m" tone="accent" />
        </>
      }
      visual={
        <>
          <svg
            viewBox="0 0 720 255"
            width="100%"
            role="img"
            aria-label="Belka o rozpiętości cztery metry z siłą w odległości a od lewej podpory"
          >
            <title>Schemat belki z reakcjami</title>
            <desc>
              Siła P działa w odległości a od podpory A. Reakcje RA i RB oraz wymiary a i L są podane w kiloniutonach i
              milimetrach.
            </desc>
            <defs>
              <marker
                id="general-beam-force"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="7"
                markerHeight="7"
                orient="auto"
              >
                <path d="M0 0L10 5L0 10z" fill="#e76f51" />
              </marker>
              <marker
                id="general-beam-reaction"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="7"
                markerHeight="7"
                orient="auto"
              >
                <path d="M0 0L10 5L0 10z" fill="#2a9d8f" />
              </marker>
            </defs>
            <line x1="100" y1="125" x2="620" y2="125" stroke="currentColor" strokeWidth="9" strokeLinecap="round" />
            <path d="M78 158L100 132L122 158Z M598 158L620 132L642 158Z" fill="currentColor" opacity="0.4" />
            <circle cx="620" cy="151" r="7" fill="currentColor" opacity="0.45" />
            <motion.g animate={{ x: loadX - 360 }} transition={{ type: 'spring', stiffness: 180, damping: 24 }}>
              <line
                x1="360"
                y1="35"
                x2="360"
                y2="113"
                stroke="#e76f51"
                strokeWidth={loadStroke}
                markerEnd="url(#general-beam-force)"
              />
              <text x="375" y="57" fontSize="15" fill="#e76f51">
                P = {forceKN} kN
              </text>
            </motion.g>
            <line
              x1="100"
              y1="202"
              x2="100"
              y2="169"
              stroke="#2a9d8f"
              strokeWidth={reactionStroke}
              markerEnd="url(#general-beam-reaction)"
            />
            <line
              x1="620"
              y1="202"
              x2="620"
              y2="169"
              stroke="#2a9d8f"
              strokeWidth={reactionStroke}
              markerEnd="url(#general-beam-reaction)"
            />
            <text x="100" y="224" textAnchor="middle" fontSize="14" fill="#2a9d8f">
              RA = {fmt(reactionAKN, 2)} kN
            </text>
            <text x="620" y="224" textAnchor="middle" fontSize="14" fill="#2a9d8f">
              RB = {fmt(reactionBKN, 2)} kN
            </text>
            <text x="82" y="118" textAnchor="end" fontSize="15" fill="currentColor">
              A
            </text>
            <text x="638" y="118" fontSize="15" fill="currentColor">
              B
            </text>
            <line x1="100" y1="180" x2={loadX} y2="180" stroke="currentColor" strokeDasharray="4 3" />
            <text x={(100 + loadX) / 2} y="173" textAnchor="middle" fontSize="13" fill="currentColor">
              a = {distanceAMM} mm
            </text>
            <text x="360" y="249" textAnchor="middle" fontSize="13" fill="currentColor">
              L = {lengthMM} mm · b = L−a = {distanceBMM} mm
            </text>
          </svg>
          <div className="lab-chart" aria-label="Wykres siły tnącej T w kiloniutonach">
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
                <ReferenceLine x={distanceAMM / 1000} stroke="currentColor" strokeDasharray="4 4" opacity={0.35} />
                <Line
                  type="linear"
                  dataKey="shearKN"
                  name="T [kN]"
                  stroke="#e9a23b"
                  strokeWidth={3}
                  dot={false}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="lab-chart" aria-label="Wykres momentu zginającego M w kiloniutonometrach">
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
                <ReferenceDot
                  x={distanceAMM / 1000}
                  y={maxMomentKNM}
                  r={5}
                  fill="#e76f51"
                  stroke="white"
                  strokeWidth={2}
                />
                <Line
                  type="linear"
                  dataKey="momentKNM"
                  name="M [kN·m]"
                  stroke="#4f86c6"
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
