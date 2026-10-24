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
import { hollowTorsionShearMPa, shearBearingMPa, stressTransform } from '../lib/advanced'
import { mohrCircle, torsionShearMPa } from '../lib/engineering'

const chartMargin = { top: 12, right: 18, left: 4, bottom: 24 }

type ShearMode = 'single' | 'double'

export function ShearJointLab() {
  const [forceKN, setForceKN] = useState(40)
  const [diameterMM, setDiameterMM] = useState(16)
  const [mode, setMode] = useState<ShearMode>('single')
  const shearPlanes = mode === 'single' ? 1 : 2
  const areaMM2 = (Math.PI * diameterMM ** 2) / 4
  const tauMPa = shearBearingMPa(forceKN, shearPlanes, areaMM2)
  const forcePerPlaneKN = forceKN / shearPlanes
  const rivetWidth = 10 + diameterMM * 0.65
  const forceStroke = 3 + forceKN / 25

  return (
    <Lab
      title="Ścinanie nitu: jedno- i dwucięcie"
      instruction="Zmień siłę, średnicę nitu i liczbę płaszczyzn ścinania. Średnie naprężenie styczne τ = F/(n·A); bez granicy materiału nie oceniamy bezpieczeństwa połączenia."
      onReset={() => {
        setForceKN(40)
        setDiameterMM(16)
        setMode('single')
      }}
      controls={
        <>
          <Segmented
            label="Rodzaj połączenia"
            value={mode}
            onChange={setMode}
            options={[
              { value: 'single', label: 'Jednocięcie · n = 1' },
              { value: 'double', label: 'Dwucięcie · n = 2' },
            ]}
          />
          <Control label="Siła F" value={forceKN} min={5} max={100} step={5} unit="kN" onChange={setForceKN} />
          <Control label="Średnica nitu d" value={diameterMM} min={8} max={30} unit="mm" onChange={setDiameterMM} />
        </>
      }
      metrics={
        <>
          <Metric label="Średnie naprężenie τ" value={fmt(tauMPa)} unit="MPa" tone="accent" />
          <Metric label="Siła na płaszczyznę F/n" value={fmt(forcePerPlaneKN)} unit="kN" />
          <Metric label="Pole przekroju nitu A" value={fmt(areaMM2)} unit="mm²" />
        </>
      }
      visual={
        <svg
          viewBox="0 0 720 340"
          width="100%"
          role="img"
          aria-label={mode === 'single' ? 'Nit ścinany w jednej płaszczyźnie' : 'Nit ścinany w dwóch płaszczyznach'}
        >
          <title>{mode === 'single' ? 'Połączenie jednocięte' : 'Połączenie dwucięte'}</title>
          <desc>
            Nit o średnicy d przenosi siłę F przez jedną lub dwie zaznaczone płaszczyzny ścinania. Pole jednego
            przekroju wynosi pi d kwadrat przez cztery.
          </desc>
          <defs>
            <marker
              id="shear-joint-force"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10z" fill="#e76f51" />
            </marker>
            <linearGradient id="shear-joint-rivet" x1="0" y1="0" x2="1" y2="0">
              <stop stopColor="#596775" />
              <stop offset="0.5" stopColor="#c5d0d9" />
              <stop offset="1" stopColor="#596775" />
            </linearGradient>
          </defs>
          <text x="360" y="28" textAnchor="middle" fontSize="16" fill="currentColor">
            {mode === 'single' ? 'Jedna płaszczyzna ścinania' : 'Dwie płaszczyzny ścinania'} · A = πd²/4
          </text>
          {mode === 'single' ? (
            <>
              <rect x="105" y="105" width="310" height="65" rx="4" fill="#4f86c6" opacity="0.82" />
              <rect x="305" y="170" width="310" height="65" rx="4" fill="#e9a23b" opacity="0.82" />
              <line
                x1="105"
                y1="137"
                x2="42"
                y2="137"
                stroke="#e76f51"
                strokeWidth={forceStroke}
                markerEnd="url(#shear-joint-force)"
              />
              <line
                x1="615"
                y1="202"
                x2="678"
                y2="202"
                stroke="#e76f51"
                strokeWidth={forceStroke}
                markerEnd="url(#shear-joint-force)"
              />
              <text x="70" y="120" textAnchor="middle" fontSize="15" fill="#e76f51">
                F
              </text>
              <text x="650" y="185" textAnchor="middle" fontSize="15" fill="#e76f51">
                F
              </text>
              <motion.line
                x1="285"
                x2="435"
                y1="170"
                y2="170"
                stroke="#e76f51"
                strokeWidth="3"
                strokeDasharray="7 5"
                animate={{ opacity: [0.45, 1, 0.45] }}
                transition={{ duration: 1.8, repeat: Infinity }}
              />
              <text x="448" y="175" fontSize="14" fill="#e76f51">
                płaszczyzna 1
              </text>
            </>
          ) : (
            <>
              <rect x="105" y="85" width="510" height="48" rx="4" fill="#4f86c6" opacity="0.78" />
              <rect x="185" y="133" width="350" height="74" rx="4" fill="#e9a23b" opacity="0.85" />
              <rect x="105" y="207" width="510" height="48" rx="4" fill="#4f86c6" opacity="0.78" />
              <line
                x1="105"
                y1="109"
                x2="42"
                y2="109"
                stroke="#e76f51"
                strokeWidth={forceStroke}
                markerEnd="url(#shear-joint-force)"
              />
              <line
                x1="105"
                y1="231"
                x2="42"
                y2="231"
                stroke="#e76f51"
                strokeWidth={forceStroke}
                markerEnd="url(#shear-joint-force)"
              />
              <line
                x1="535"
                y1="170"
                x2="678"
                y2="170"
                stroke="#e76f51"
                strokeWidth={forceStroke}
                markerEnd="url(#shear-joint-force)"
              />
              <text x="70" y="92" textAnchor="middle" fontSize="15" fill="#e76f51">
                F/2
              </text>
              <text x="70" y="260" textAnchor="middle" fontSize="15" fill="#e76f51">
                F/2
              </text>
              <text x="645" y="151" textAnchor="middle" fontSize="15" fill="#e76f51">
                F
              </text>
              {[133, 207].map((y, index) => (
                <g key={y}>
                  <motion.line
                    x1="285"
                    x2="435"
                    y1={y}
                    y2={y}
                    stroke="#e76f51"
                    strokeWidth="3"
                    strokeDasharray="7 5"
                    animate={{ opacity: [0.45, 1, 0.45] }}
                    transition={{ duration: 1.8, repeat: Infinity, delay: index * 0.25 }}
                  />
                  <text x="448" y={y + 5} fontSize="14" fill="#e76f51">
                    płaszczyzna {index + 1}
                  </text>
                </g>
              ))}
            </>
          )}
          <motion.rect
            x={360 - rivetWidth / 2}
            y={mode === 'single' ? 88 : 68}
            height={mode === 'single' ? 164 : 204}
            rx={rivetWidth / 2}
            fill="url(#shear-joint-rivet)"
            stroke="currentColor"
            strokeWidth="1.5"
            animate={{ width: rivetWidth, x: 360 - rivetWidth / 2 }}
            transition={{ type: 'spring', stiffness: 180, damping: 24 }}
          />
          <line
            x1="360"
            y1={mode === 'single' ? 76 : 56}
            x2="360"
            y2={mode === 'single' ? 263 : 283}
            stroke="white"
            strokeDasharray="4 4"
            opacity="0.55"
          />
          <text x="360" y="302" textAnchor="middle" fontSize="15" fill="currentColor">
            d = {diameterMM} mm · F = {forceKN} kN · n = {shearPlanes}
          </text>
          <text x="360" y="326" textAnchor="middle" fontSize="13" fill="currentColor">
            τ = {fmt(tauMPa)} MPa = {fmt(tauMPa)} N/mm²
          </text>
        </svg>
      }
    />
  )
}

export function HollowShaftLab() {
  const [torqueNM, setTorqueNM] = useState(1000)
  const [outerDMM, setOuterDMM] = useState(80)
  const [innerDMM, setInnerDMM] = useState(40)
  const tauHollowMPa = hollowTorsionShearMPa(torqueNM, outerDMM, innerDMM)
  const tauSolidMPa = torsionShearMPa(torqueNM, outerDMM)
  const solidAreaMM2 = (Math.PI * outerDMM ** 2) / 4
  const hollowAreaMM2 = (Math.PI * (outerDMM ** 2 - innerDMM ** 2)) / 4
  const areaSavingPercent = 100 * (1 - hollowAreaMM2 / solidAreaMM2)
  const outerRadius = 50 + ((outerDMM - 40) / 80) * 42
  const innerRadius = (outerRadius * innerDMM) / outerDMM
  const torqueStroke = 2 + torqueNM / 1000
  const torqueArc = (cx: number) =>
    `M${cx - outerRadius} ${155 - outerRadius * 0.66} A${outerRadius} ${outerRadius} 0 0 1 ${cx + outerRadius * 0.66} ${155 - outerRadius}`

  const changeOuterD = (value: number) => {
    setOuterDMM(value)
    setInnerDMM((current) => Math.min(current, value - 5))
  }

  return (
    <Lab
      title="Wał pełny i rura o tej samej średnicy"
      instruction="Porównaj przekroje o identycznym D przy tym samym momencie T. Usunięcie środka zmniejsza pole, ale zwiększa maksymalne τ na zewnętrznym obwodzie."
      onReset={() => {
        setTorqueNM(1000)
        setOuterDMM(80)
        setInnerDMM(40)
      }}
      controls={
        <>
          <Control
            label="Moment skręcający T"
            value={torqueNM}
            min={100}
            max={3000}
            step={100}
            unit="N·m"
            onChange={setTorqueNM}
          />
          <Control
            label="Średnica zewnętrzna D"
            value={outerDMM}
            min={40}
            max={120}
            step={5}
            unit="mm"
            onChange={changeOuterD}
          />
          <Control
            label="Średnica wewnętrzna d"
            value={innerDMM}
            min={0}
            max={outerDMM - 5}
            step={5}
            unit="mm"
            onChange={setInnerDMM}
          />
        </>
      }
      metrics={
        <>
          <Metric label="τmax w rurze" value={fmt(tauHollowMPa)} unit="MPa" tone="accent" />
          <Metric label="τmax w wale pełnym" value={fmt(tauSolidMPa)} unit="MPa" />
          <Metric label="Oszczędność pola" value={fmt(areaSavingPercent)} unit="%" />
        </>
      }
      visual={
        <svg
          viewBox="0 0 720 355"
          width="100%"
          role="img"
          aria-label="Porównanie wału pełnego i rury poddanego skręcaniu"
        >
          <title>Skręcanie przekroju pełnego i rurowego</title>
          <desc>
            Oba przekroje mają średnicę zewnętrzną D i przenoszą moment T. Rura ma otwór o średnicy d, mniejsze pole i
            większe maksymalne naprężenie styczne.
          </desc>
          <defs>
            <radialGradient id="hollow-solid-stress">
              <stop stopColor="#4f86c6" stopOpacity="0.12" />
              <stop offset="1" stopColor="#e76f51" stopOpacity="0.9" />
            </radialGradient>
            <radialGradient id="hollow-tube-stress">
              <stop stopColor="#4f86c6" stopOpacity="0.2" />
              <stop offset="1" stopColor="#e76f51" stopOpacity="0.95" />
            </radialGradient>
            <marker
              id="hollow-shaft-arrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10z" fill="#e76f51" />
            </marker>
          </defs>
          <text x="190" y="32" textAnchor="middle" fontSize="17" fill="currentColor">
            Wał pełny
          </text>
          <text x="530" y="32" textAnchor="middle" fontSize="17" fill="currentColor">
            Rura
          </text>
          <motion.circle
            cx="190"
            cy="155"
            fill="url(#hollow-solid-stress)"
            stroke="currentColor"
            strokeWidth="2"
            animate={{ r: outerRadius }}
            transition={{ type: 'spring', stiffness: 160, damping: 23 }}
          />
          <motion.circle
            cx="530"
            cy="155"
            fill="url(#hollow-tube-stress)"
            stroke="currentColor"
            strokeWidth="2"
            animate={{ r: outerRadius }}
            transition={{ type: 'spring', stiffness: 160, damping: 23 }}
          />
          <motion.circle
            cx="530"
            cy="155"
            fill="var(--bg, #17212b)"
            stroke="currentColor"
            strokeWidth="2"
            animate={{ r: Math.max(0.5, innerRadius) }}
            transition={{ type: 'spring', stiffness: 160, damping: 23 }}
          />
          <circle cx="190" cy="155" r="4" fill="currentColor" />
          <circle cx="530" cy="155" r="3" fill="currentColor" />
          <motion.path
            d={torqueArc(190)}
            fill="none"
            stroke="#e76f51"
            strokeWidth={torqueStroke}
            markerEnd="url(#hollow-shaft-arrow)"
            animate={{ d: torqueArc(190) }}
          />
          <motion.path
            d={torqueArc(530)}
            fill="none"
            stroke="#e76f51"
            strokeWidth={torqueStroke}
            markerEnd="url(#hollow-shaft-arrow)"
            animate={{ d: torqueArc(530) }}
          />
          <text x="190" y={155 - outerRadius - 12} textAnchor="middle" fontSize="14" fill="#e76f51">
            T = {torqueNM} N·m
          </text>
          <text x="530" y={155 - outerRadius - 12} textAnchor="middle" fontSize="14" fill="#e76f51">
            T = {torqueNM} N·m
          </text>
          <line x1={190 - outerRadius - 8} y1="259" x2={190 + outerRadius + 8} y2="259" stroke="currentColor" />
          <line x1={530 - outerRadius - 8} y1="259" x2={530 + outerRadius + 8} y2="259" stroke="currentColor" />
          <text x="190" y="280" textAnchor="middle" fontSize="14" fill="currentColor">
            D = {outerDMM} mm
          </text>
          <text x="530" y="280" textAnchor="middle" fontSize="14" fill="currentColor">
            D = {outerDMM} mm · d = {innerDMM} mm
          </text>
          <text x="190" y="308" textAnchor="middle" fontSize="14" fill="currentColor">
            A = {fmt(solidAreaMM2)} mm²
          </text>
          <text x="530" y="308" textAnchor="middle" fontSize="14" fill="currentColor">
            A = {fmt(hollowAreaMM2)} mm²
          </text>
          <text x="190" y="334" textAnchor="middle" fontSize="14" fill="#e76f51">
            τmax = {fmt(tauSolidMPa)} MPa
          </text>
          <text x="530" y="334" textAnchor="middle" fontSize="14" fill="#e76f51">
            τmax = {fmt(tauHollowMPa)} MPa
          </text>
        </svg>
      }
    />
  )
}

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

export function StressTransformLab() {
  const [sigmaXMPa, setSigmaXMPa] = useState(80)
  const [sigmaYMPa, setSigmaYMPa] = useState(20)
  const [tauXYMPa, setTauXYMPa] = useState(40)
  const [thetaDeg, setThetaDeg] = useState(30)
  const transformed = stressTransform(sigmaXMPa, sigmaYMPa, tauXYMPa, thetaDeg)
  const circle = mohrCircle(sigmaXMPa, sigmaYMPa, tauXYMPa)
  const padding = Math.max(10, circle.radiusMPa * 0.25)
  const minSigma = Math.min(0, circle.sigma2MPa) - padding
  const maxSigma = Math.max(0, circle.sigma1MPa) + padding
  const maxTau = Math.max(10, circle.radiusMPa * 1.3, Math.abs(transformed.tauNT) * 1.1)
  const scale = Math.min(300 / (maxSigma - minSigma), 125 / maxTau)
  const originX = 405 - minSigma * scale
  const originY = 190
  const centerX = originX + circle.centerMPa * scale
  const radius = Math.max(1.5, circle.radiusMPa * scale)
  const pointNX = originX + transformed.sigmaN * scale
  const pointNY = originY - transformed.tauNT * scale
  const sxHalf = 18 + Math.min(55, Math.abs(sigmaXMPa) * 0.42)
  const syHalf = 18 + Math.min(55, Math.abs(sigmaYMPa) * 0.42)
  const tauHalf = 14 + Math.min(46, Math.abs(tauXYMPa) * 0.42)
  const sxSign = sigmaXMPa < 0 ? -1 : 1
  const sySign = sigmaYMPa < 0 ? -1 : 1
  const tauSign = tauXYMPa < 0 ? -1 : 1

  return (
    <Lab
      title="Transformacja naprężeń i koło Mohra"
      instruction="Obracaj element o kąt θ. Funkcja stressTransform wyznacza σn, σt i τnt, a punkt N na kole Mohra odpowiada obrotowi przekroju o θ — na kole jest to 2θ."
      onReset={() => {
        setSigmaXMPa(80)
        setSigmaYMPa(20)
        setTauXYMPa(40)
        setThetaDeg(30)
      }}
      controls={
        <>
          <Control
            label="Naprężenie σx"
            value={sigmaXMPa}
            min={-100}
            max={150}
            step={5}
            unit="MPa"
            onChange={setSigmaXMPa}
          />
          <Control
            label="Naprężenie σy"
            value={sigmaYMPa}
            min={-100}
            max={150}
            step={5}
            unit="MPa"
            onChange={setSigmaYMPa}
          />
          <Control
            label="Naprężenie τxy"
            value={tauXYMPa}
            min={-100}
            max={100}
            step={5}
            unit="MPa"
            onChange={setTauXYMPa}
          />
          <Control
            label="Obrót elementu θ"
            value={thetaDeg}
            min={-90}
            max={90}
            step={5}
            unit="°"
            onChange={setThetaDeg}
          />
        </>
      }
      metrics={
        <>
          <Metric label="Naprężenie normalne σn" value={fmt(transformed.sigmaN)} unit="MPa" tone="accent" />
          <Metric label="Naprężenie normalne σt" value={fmt(transformed.sigmaT)} unit="MPa" />
          <Metric label="Naprężenie styczne τnt" value={fmt(transformed.tauNT)} unit="MPa" />
        </>
      }
      visual={
        <svg
          viewBox="0 0 760 390"
          width="100%"
          role="img"
          aria-label="Obrócony element naprężeniowy i odpowiadający mu punkt na kole Mohra"
        >
          <title>Transformacja płaskiego stanu naprężenia</title>
          <desc>
            Po lewej element obrócony o theta stopni z osiami n i t. Po prawej koło Mohra w megapaskalach z punktem N o
            współrzędnych sigma n i tau nt.
          </desc>
          <defs>
            <marker
              id="transform-normal-arrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10z" fill="#e76f51" />
            </marker>
            <marker
              id="transform-axis-arrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10z" fill="currentColor" />
            </marker>
            <marker
              id="transform-shear-arrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10z" fill="#e9a23b" />
            </marker>
          </defs>
          <text x="170" y="28" textAnchor="middle" fontSize="16" fill="currentColor">
            Element po obrocie o θ = {thetaDeg}°
          </text>
          <text x="555" y="28" textAnchor="middle" fontSize="16" fill="currentColor">
            Koło Mohra [MPa]
          </text>
          <line x1="65" y1="180" x2="275" y2="180" stroke="currentColor" strokeDasharray="5 5" opacity="0.35" />
          <line x1="170" y1="75" x2="170" y2="285" stroke="currentColor" strokeDasharray="5 5" opacity="0.35" />
          <text x="280" y="185" fontSize="13" fill="currentColor" opacity="0.65">
            x
          </text>
          <text x="176" y="72" fontSize="13" fill="currentColor" opacity="0.65">
            y
          </text>
          <motion.g
            style={{ transformOrigin: '170px 180px' }}
            animate={{ rotate: thetaDeg }}
            transition={{ type: 'spring', stiffness: 150, damping: 22 }}
          >
            <rect
              x="105"
              y="115"
              width="130"
              height="130"
              fill="#4f86c6"
              fillOpacity="0.14"
              stroke="#4f86c6"
              strokeWidth="3"
            />
            <line
              x1="105"
              y1="180"
              x2={105 - sxSign * sxHalf}
              y2="180"
              stroke="#e76f51"
              strokeWidth="3"
              markerEnd="url(#transform-normal-arrow)"
            />
            <line
              x1="235"
              y1="180"
              x2={235 + sxSign * sxHalf}
              y2="180"
              stroke="#e76f51"
              strokeWidth="3"
              markerEnd="url(#transform-normal-arrow)"
            />
            <line
              x1="170"
              y1="115"
              x2="170"
              y2={115 - sySign * syHalf}
              stroke="#e9a23b"
              strokeWidth="3"
              markerEnd="url(#transform-normal-arrow)"
            />
            <line
              x1="170"
              y1="245"
              x2="170"
              y2={245 + sySign * syHalf}
              stroke="#e9a23b"
              strokeWidth="3"
              markerEnd="url(#transform-normal-arrow)"
            />
            <line
              x1={170 - (tauSign * tauHalf) / 2}
              y1="121"
              x2={170 + (tauSign * tauHalf) / 2}
              y2="121"
              stroke="#e9a23b"
              strokeWidth="2.5"
              markerEnd="url(#transform-shear-arrow)"
            />
            <line
              x1={170 + (tauSign * tauHalf) / 2}
              y1="239"
              x2={170 - (tauSign * tauHalf) / 2}
              y2="239"
              stroke="#e9a23b"
              strokeWidth="2.5"
              markerEnd="url(#transform-shear-arrow)"
            />
            <text
              x={170 - sxSign * (sxHalf + 8)}
              y="176"
              fontSize="12"
              fill="#e76f51"
              textAnchor={sxSign > 0 ? 'end' : 'start'}
            >
              σx
            </text>
            <text x="178" y={115 - sySign * (syHalf + 6)} fontSize="12" fill="#e9a23b">
              σy
            </text>
            <text x={170 + tauSign * (tauHalf / 2 + 6)} y="112" fontSize="12" fill="#e9a23b">
              τ
            </text>
            <line
              x1="170"
              y1="180"
              x2="305"
              y2="180"
              stroke="currentColor"
              strokeWidth="1.5"
              markerEnd="url(#transform-axis-arrow)"
            />
            <line
              x1="170"
              y1="180"
              x2="170"
              y2="45"
              stroke="currentColor"
              strokeWidth="1.5"
              markerEnd="url(#transform-axis-arrow)"
            />
            <text x="310" y="185" fontSize="15" fill="currentColor">
              n
            </text>
            <text x="176" y="43" fontSize="15" fill="currentColor">
              t
            </text>
          </motion.g>
          <text x="170" y="318" textAnchor="middle" fontSize="14" fill="#e76f51">
            σn = {fmt(transformed.sigmaN)} MPa
          </text>
          <text x="170" y="341" textAnchor="middle" fontSize="14" fill="#e9a23b">
            σt = {fmt(transformed.sigmaT)} MPa
          </text>
          <text x="170" y="364" textAnchor="middle" fontSize="14" fill="currentColor">
            τnt = {fmt(transformed.tauNT)} MPa
          </text>
          <line x1="390" y1={originY} x2="730" y2={originY} stroke="currentColor" strokeWidth="1.5" />
          <line x1={originX} y1="48" x2={originX} y2="326" stroke="currentColor" strokeWidth="1.5" />
          <path d="M730 190l-10-5v10z" fill="currentColor" />
          <path d={`M${originX} 48l-5 10h10z`} fill="currentColor" />
          <text x="738" y="195" fontSize="16" fill="currentColor">
            σ
          </text>
          <text x={originX + 9} y="55" fontSize="16" fill="currentColor">
            τ
          </text>
          <text x="724" y={originY + 22} textAnchor="end" fontSize="11" fill="currentColor">
            0
          </text>
          <motion.circle
            cy={originY}
            fill="#4f86c6"
            fillOpacity="0.12"
            stroke="#4f86c6"
            strokeWidth="3"
            animate={{ cx: centerX, r: radius }}
            transition={{ type: 'spring', stiffness: 150, damping: 23 }}
          />
          <motion.line
            y1={originY}
            stroke="#e9a23b"
            strokeWidth="2"
            strokeDasharray="5 4"
            animate={{ x1: centerX, x2: pointNX, y2: pointNY }}
            transition={{ type: 'spring', stiffness: 150, damping: 23 }}
          />
          <motion.circle
            r="6"
            fill="#e76f51"
            stroke="white"
            strokeWidth="1.5"
            animate={{ cx: pointNX, cy: pointNY }}
            transition={{ type: 'spring', stiffness: 150, damping: 23 }}
          />
          <circle cx={originX + circle.sigma1MPa * scale} cy={originY} r="4" fill="#2a9d8f" />
          <circle cx={originX + circle.sigma2MPa * scale} cy={originY} r="4" fill="#2a9d8f" />
          <text
            x={originX + circle.sigma1MPa * scale}
            y={originY + 20}
            textAnchor="middle"
            fontSize="12"
            fill="#2a9d8f"
          >
            σ₁
          </text>
          <text
            x={originX + circle.sigma2MPa * scale}
            y={originY + 20}
            textAnchor="middle"
            fontSize="12"
            fill="#2a9d8f"
          >
            σ₂
          </text>
          <text x={centerX} y={originY + 18} textAnchor="middle" fontSize="12" fill="currentColor">
            C = {fmt(circle.centerMPa)}
          </text>
          <text x={pointNX} y={pointNY - 12} textAnchor="middle" fontSize="13" fill="#e76f51">
            N(σn, τnt)
          </text>
          <text x="555" y="347" textAnchor="middle" fontSize="13" fill="currentColor">
            R = τmax = {fmt(circle.radiusMPa)} MPa
          </text>
          <text x="555" y="370" textAnchor="middle" fontSize="12" fill="currentColor">
            σn + σt = σx + σy = {fmt(sigmaXMPa + sigmaYMPa)} MPa
          </text>
        </svg>
      }
    />
  )
}
