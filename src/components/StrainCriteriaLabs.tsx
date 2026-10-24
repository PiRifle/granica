import { useState } from 'react'
import { motion } from 'motion/react'
import { Bar, BarChart, CartesianGrid, Cell, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Control, Lab, Metric, Segmented, fmt } from './UI'
import { rectangularRosette, safetyFactor, trescaPlaneMPa, vonMisesPlaneMPa } from '../lib/advanced'
import { bendingStressMPa, circleSectionModulusMM3, stressMPa, torsionShearMPa } from '../lib/engineering'

const rosetteMaterials = {
  steel: { label: 'Stal', youngGPa: 200, poisson: 0.3 },
  aluminium: { label: 'Aluminium', youngGPa: 70, poisson: 0.33 },
  brass: { label: 'Mosiądz', youngGPa: 100, poisson: 0.34 },
} as const

type RosetteMaterial = keyof typeof rosetteMaterials

export function RosetteLab() {
  const [e0Micro, setE0Micro] = useState(400)
  const [e45Micro, setE45Micro] = useState(250)
  const [e90Micro, setE90Micro] = useState(-100)
  const [material, setMaterial] = useState<RosetteMaterial>('steel')
  const { youngGPa, poisson } = rosetteMaterials[material]
  const rosette = rectangularRosette(e0Micro / 1e6, e45Micro / 1e6, e90Micro / 1e6)
  const youngMPa = youngGPa * 1000
  const denominator = 1 - poisson ** 2
  const sigma1 = (youngMPa * (rosette.principal1 + poisson * rosette.principal2)) / denominator
  const sigma2 = (youngMPa * (rosette.principal2 + poisson * rosette.principal1)) / denominator
  const principalScale = Math.max(Math.abs(sigma1), Math.abs(sigma2), 1)
  const p1Half = 28 + (Math.abs(sigma1) / principalScale) * 72
  const p2Half = 28 + (Math.abs(sigma2) / principalScale) * 72
  const gauges = [
    { angle: 0, value: e0Micro, color: '#4f86c6', label: 'ε₀' },
    { angle: 45, value: e45Micro, color: '#e9a23b', label: 'ε₄₅' },
    { angle: 90, value: e90Micro, color: '#2a9d8f', label: 'ε₉₀' },
  ]

  return (
    <Lab
      title="Prostokątna rozeta tensometryczna"
      instruction="Wprowadź odczyty trzech czujników i wybierz E oraz ν materiału. Naprężenia główne wyznaczono dla płaskiego stanu naprężenia (σz = 0), a nie płaskiego stanu odkształcenia."
      onReset={() => {
        setE0Micro(400)
        setE45Micro(250)
        setE90Micro(-100)
        setMaterial('steel')
      }}
      controls={
        <>
          <Control
            label="Odczyt czujnika ε₀"
            value={e0Micro}
            min={-1000}
            max={1000}
            step={10}
            unit="µε"
            onChange={setE0Micro}
          />
          <Control
            label="Odczyt czujnika ε₄₅"
            value={e45Micro}
            min={-1000}
            max={1000}
            step={10}
            unit="µε"
            onChange={setE45Micro}
          />
          <Control
            label="Odczyt czujnika ε₉₀"
            value={e90Micro}
            min={-1000}
            max={1000}
            step={10}
            unit="µε"
            onChange={setE90Micro}
          />
          <Segmented
            label="Materiał: E / ν"
            value={material}
            onChange={setMaterial}
            options={[
              { value: 'steel', label: 'Stal · 200 / 0,30' },
              { value: 'aluminium', label: 'Al · 70 / 0,33' },
              { value: 'brass', label: 'Mosiądz · 100 / 0,34' },
            ]}
          />
        </>
      }
      metrics={
        <>
          <Metric label="Odkształcenie główne ε₁" value={fmt(rosette.principal1 * 1e6, 1)} unit="µε" tone="accent" />
          <Metric label="Odkształcenie główne ε₂" value={fmt(rosette.principal2 * 1e6, 1)} unit="µε" />
          <Metric label="Naprężenie główne σ₁" value={fmt(sigma1, 1)} unit="MPa" tone="accent" />
          <Metric label="Naprężenie główne σ₂" value={fmt(sigma2, 1)} unit="MPa" />
        </>
      }
      visual={
        <svg
          viewBox="0 0 760 350"
          width="100%"
          role="img"
          aria-label="Trzy czujniki rozety i obrócone kierunki odkształceń głównych"
        >
          <title>Rozeta 0°, 45°, 90° i kierunki główne</title>
          <desc>
            Odczyty są podane w mikroodkształceniach. Kąt alfa wyznacza kierunek epsilon jeden od osi x, przeciwnie do
            ruchu wskazówek zegara.
          </desc>
          <defs>
            <marker
              id="rosette-principal-arrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0L10 5L0 10Z" fill="#e76f51" />
            </marker>
          </defs>
          <text x="200" y="28" textAnchor="middle" fontSize="16" fill="currentColor">
            Czujniki: 0° / 45° / 90°
          </text>
          <text x="555" y="28" textAnchor="middle" fontSize="16" fill="currentColor">
            Kierunki główne
          </text>
          <line x1="75" y1="170" x2="325" y2="170" stroke="currentColor" strokeDasharray="5 5" opacity="0.3" />
          <line x1="200" y1="50" x2="200" y2="290" stroke="currentColor" strokeDasharray="5 5" opacity="0.3" />
          {gauges.map((gauge) => (
            <g key={gauge.angle} transform={`rotate(${-gauge.angle} 200 170)`}>
              <motion.g animate={{ opacity: 0.55 + Math.min(Math.abs(gauge.value) / 1000, 1) * 0.45 }}>
                <rect x="125" y="150" width="150" height="40" rx="5" fill="none" stroke={gauge.color} strokeWidth="2" />
                <path
                  d="M140 158H260M140 170H260M140 182H260"
                  stroke={gauge.color}
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <path d="M125 160H105V145M125 180H105V195" fill="none" stroke={gauge.color} strokeWidth="2" />
              </motion.g>
            </g>
          ))}
          <circle cx="200" cy="170" r="7" fill="currentColor" />
          <text x="200" y="218" textAnchor="middle" fontSize="14" fill="#4f86c6">
            ε₀ = {e0Micro} µε
          </text>
          <text x="77" y="74" textAnchor="middle" fontSize="14" fill="#e9a23b">
            ε₄₅ = {e45Micro} µε
          </text>
          <text x="315" y="78" textAnchor="middle" fontSize="14" fill="#2a9d8f">
            ε₉₀ = {e90Micro} µε
          </text>
          <text x="329" y="175" fontSize="14" fill="currentColor">
            x (0°)
          </text>
          <text x="208" y="52" fontSize="14" fill="currentColor">
            y (90°)
          </text>
          <line x1="440" y1="170" x2="680" y2="170" stroke="currentColor" strokeDasharray="5 5" opacity="0.35" />
          <line x1="555" y1="60" x2="555" y2="280" stroke="currentColor" strokeDasharray="5 5" opacity="0.35" />
          <motion.g
            animate={{ rotate: -rosette.angleDeg }}
            transition={{ type: 'spring', stiffness: 150, damping: 22 }}
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          >
            <rect
              x="505"
              y="120"
              width="100"
              height="100"
              fill="#4f86c6"
              fillOpacity="0.1"
              stroke="currentColor"
              strokeWidth="2"
            />
            <line
              x1={555 - p1Half}
              y1="170"
              x2={555 + p1Half}
              y2="170"
              stroke="#e76f51"
              strokeWidth="3"
              markerStart="url(#rosette-principal-arrow)"
              markerEnd="url(#rosette-principal-arrow)"
            />
            <line
              x1="555"
              y1={170 - p2Half}
              x2="555"
              y2={170 + p2Half}
              stroke="#e9a23b"
              strokeWidth="3"
              markerStart="url(#rosette-principal-arrow)"
              markerEnd="url(#rosette-principal-arrow)"
            />
            <text x={555 + p1Half + 8} y="175" fontSize="15" fill="#e76f51">
              1
            </text>
            <text x="560" y={170 - p2Half - 6} fontSize="15" fill="#e9a23b">
              2
            </text>
          </motion.g>
          <path d="M615 170A60 60 0 0 0 555 110" fill="none" stroke="currentColor" opacity="0.45" />
          <text x="555" y="302" textAnchor="middle" fontSize="14" fill="currentColor">
            α = {fmt(rosette.angleDeg, 1)}° od osi x do kierunku 1
          </text>
          <text x="200" y="325" textAnchor="middle" fontSize="13" fill="currentColor">
            γxy = 2ε₄₅ − ε₀ − ε₉₀ = {fmt(rosette.gammaXY * 1e6, 1)} µε
          </text>
          <text x="555" y="325" textAnchor="middle" fontSize="13" fill="currentColor">
            E = {youngGPa} GPa · ν = {fmt(poisson, 2)} · σz = 0
          </text>
          <text x="380" y="346" textAnchor="middle" fontSize="12" fill="currentColor">
            1 µε = 10⁻⁶ · dodatnie ε: wydłużenie · ujemne ε: skrócenie
          </text>
        </svg>
      }
    />
  )
}

const combinedDiameterMM = 60

export function CombinedLab() {
  const [forceKN, setForceKN] = useState(30)
  const [momentKNM, setMomentKNM] = useState(1.2)
  const [torqueNM, setTorqueNM] = useState(800)
  const [yieldMPa, setYieldMPa] = useState(235)
  const areaMM2 = (Math.PI * combinedDiameterMM ** 2) / 4
  const sectionModulusMM3 = circleSectionModulusMM3(combinedDiameterMM)
  const polarModulusMM3 = 2 * sectionModulusMM3
  const axialMPa = stressMPa(forceKN, areaMM2)
  const bendingMPa = bendingStressMPa(momentKNM, sectionModulusMM3)
  const sigmaX = axialMPa + bendingMPa
  const tau = torsionShearMPa(torqueNM, combinedDiameterMM)
  const vonMises = vonMisesPlaneMPa(sigmaX, 0, tau)
  const tresca = trescaPlaneMPa(sigmaX, 0, tau)
  const vonMisesSafety = vonMises > 0 ? safetyFactor(yieldMPa, vonMises) : Number.POSITIVE_INFINITY
  const trescaSafety = tresca > 0 ? safetyFactor(yieldMPa, tresca) : Number.POSITIVE_INFINITY
  const comparison =
    trescaSafety < vonMisesSafety
      ? 'Tresca daje mniejsze n — ostrzejsza ocena dla tego stanu.'
      : Math.abs(trescaSafety - vonMisesSafety) < 0.005
        ? 'Obie hipotezy dają tutaj zgodny współczynnik n.'
        : 'HMH daje mniejsze n dla tego stanu.'
  const chartData = [
    { name: 'HMH', stress: vonMises, color: '#4f86c6' },
    { name: 'Tresca', stress: tresca, color: '#e9a23b' },
  ]
  const torqueDirection = torqueNM < 0 ? -1 : 1
  const forceLen = 28 + Math.min(46, Math.abs(forceKN) / 2)
  const momentLen = 18 + (momentKNM / 4) * 52
  const tauLen = 24 + Math.min(46, (Math.abs(torqueNM) / 2000) * 46)

  return (
    <Lab
      title="Pręt kołowy: rozciąganie, zginanie i skręcanie"
      instruction={`Badamy włókno A na obwodzie pełnego pręta d = ${combinedDiameterMM} mm, gdzie σx = N/A + M/W. Znak N rozróżnia rozciąganie i ściskanie; n = Re/σzred obliczono dopiero po zadaniu granicy plastyczności Re.`}
      onReset={() => {
        setForceKN(30)
        setMomentKNM(1.2)
        setTorqueNM(800)
        setYieldMPa(235)
      }}
      controls={
        <>
          <Control label="Siła osiowa N" value={forceKN} min={-80} max={80} step={5} unit="kN" onChange={setForceKN} />
          <Control
            label="Moment gnący M"
            value={momentKNM}
            min={0}
            max={4}
            step={0.1}
            unit="kN·m"
            onChange={setMomentKNM}
          />
          <Control
            label="Moment skręcający T"
            value={torqueNM}
            min={-2000}
            max={2000}
            step={100}
            unit="N·m"
            onChange={setTorqueNM}
          />
          <Control
            label="Granica plastyczności Re"
            value={yieldMPa}
            min={100}
            max={500}
            step={5}
            unit="MPa"
            onChange={setYieldMPa}
          />
        </>
      }
      metrics={
        <>
          <Metric label="HMH: σzred" value={fmt(vonMises, 1)} unit="MPa" tone="accent" />
          <Metric label="HMH: n = Re/σzred" value={Number.isFinite(vonMisesSafety) ? fmt(vonMisesSafety, 2) : '∞'} />
          <Metric label="Tresca: σzred" value={fmt(tresca, 1)} unit="MPa" tone="accent" />
          <Metric label="Tresca: n = Re/σzred" value={Number.isFinite(trescaSafety) ? fmt(trescaSafety, 2) : '∞'} />
        </>
      }
      visual={
        <>
          <svg
            viewBox="0 0 760 350"
            width="100%"
            role="img"
            aria-label="Obciążony pręt i przekrój kołowy z wektorami naprężeń we włóknie A"
          >
            <title>Stan obciążenia i naprężenia we włóknie A</title>
            <desc>
              Na pręcie zaznaczono siłę osiową N oraz momenty M i T. W przekroju kołowym pokazano gradient od zginania i
              styczny wektor tau. Włókno A ma naprężenie sigma x równe N przez A plus M przez W.
            </desc>
            <defs>
              <marker
                id="combined-force-arrow"
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
                id="combined-moment-arrow"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto"
              >
                <path d="M0 0L10 5L0 10Z" fill="#4f86c6" />
              </marker>
              <marker
                id="combined-tau-arrow"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto"
              >
                <path d="M0 0L10 5L0 10Z" fill="#e9a23b" />
              </marker>
              <linearGradient id="combined-section-fill" x1="0" y1="0" x2="0" y2="1">
                <stop stopColor="#4f86c6" stopOpacity="0.9" />
                <stop offset="0.5" stopColor="#ffffff" stopOpacity="0.12" />
                <stop offset="1" stopColor="#e76f51" stopOpacity="0.85" />
              </linearGradient>
            </defs>
            <text x="220" y="27" textAnchor="middle" fontSize="16" fill="currentColor">
              Obciążenie pręta
            </text>
            <text x="585" y="27" textAnchor="middle" fontSize="16" fill="currentColor">
              Przekrój i włókno A
            </text>
            <path d="M78 113L98 133V207L78 227Z" fill="currentColor" opacity="0.28" />
            <line x1="98" y1="105" x2="98" y2="225" stroke="currentColor" strokeWidth="4" />
            <rect
              x="98"
              y="137"
              width="270"
              height="66"
              rx="4"
              fill="#729fc7"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <line x1="98" y1="170" x2="383" y2="170" stroke="white" strokeDasharray="5 4" opacity="0.6" />
            <motion.g animate={{ opacity: forceKN === 0 ? 0.2 : 1 }}>
              {forceKN >= 0 ? (
                <>
                  <line
                    x1="91"
                    y1="170"
                    x2={91 - forceLen}
                    y2="170"
                    stroke="#e76f51"
                    strokeWidth="3"
                    markerEnd="url(#combined-force-arrow)"
                  />
                  <line
                    x1="375"
                    y1="170"
                    x2={375 + forceLen}
                    y2="170"
                    stroke="#e76f51"
                    strokeWidth="3"
                    markerEnd="url(#combined-force-arrow)"
                  />
                </>
              ) : (
                <>
                  <line
                    x1={91 - forceLen}
                    y1="170"
                    x2="91"
                    y2="170"
                    stroke="#e76f51"
                    strokeWidth="3"
                    markerEnd="url(#combined-force-arrow)"
                  />
                  <line
                    x1={375 + forceLen}
                    y1="170"
                    x2="375"
                    y2="170"
                    stroke="#e76f51"
                    strokeWidth="3"
                    markerEnd="url(#combined-force-arrow)"
                  />
                </>
              )}
            </motion.g>
            <text x="225" y="163" textAnchor="middle" fontSize="14" fill="white">
              N = {forceKN} kN
            </text>
            <path
              d="M70 105C25 75 35 45 85 52"
              fill="none"
              stroke="#4f86c6"
              strokeWidth="3"
              markerEnd="url(#combined-moment-arrow)"
            />
            <text x="31" y="95" fontSize="14" fill="#4f86c6">
              M = {fmt(momentKNM, 1)} kN·m
            </text>
            <motion.path
              d={torqueDirection > 0 ? 'M330 105C380 70 430 100 402 130' : 'M402 130C430 100 380 70 330 105'}
              animate={{ opacity: torqueNM === 0 ? 0.2 : 1 }}
              fill="none"
              stroke="#e9a23b"
              strokeWidth="3"
              markerEnd="url(#combined-tau-arrow)"
            />
            <text x="341" y="86" fontSize="14" fill="#e9a23b">
              T = {torqueNM} N·m
            </text>
            <text x="220" y="244" textAnchor="middle" fontSize="13" fill="currentColor">
              A = πd²/4 = {fmt(areaMM2, 0)} mm²
            </text>
            <text x="220" y="266" textAnchor="middle" fontSize="13" fill="currentColor">
              W = πd³/32 · Wp = 2W = {fmt(polarModulusMM3, 0)} mm³
            </text>
            <text x="220" y="288" textAnchor="middle" fontSize="13" fill="currentColor">
              σN = {fmt(axialMPa, 1)} MPa · σM = {fmt(bendingMPa, 1)} MPa
            </text>
            <motion.circle
              cx="585"
              cy="165"
              r="100"
              fill="url(#combined-section-fill)"
              stroke="currentColor"
              strokeWidth="2"
              animate={{ opacity: 0.7 + Math.min(Math.abs(sigmaX) / 500, 0.3) }}
            />
            <line x1="475" y1="165" x2="695" y2="165" stroke="currentColor" strokeDasharray="5 4" opacity="0.5" />
            <circle cx="585" cy="65" r="6" fill="#e76f51" stroke="white" strokeWidth="2" />
            <text x="600" y="57" fontSize="15" fill="#e76f51">
              A
            </text>
            <motion.line
              x1={585 - torqueDirection * tauLen}
              y1="65"
              x2={585 + torqueDirection * tauLen}
              y2="65"
              animate={{ opacity: torqueNM === 0 ? 0.15 : 1 }}
              stroke="#e9a23b"
              strokeWidth="4"
              markerEnd="url(#combined-tau-arrow)"
            />
            <motion.line
              x1="585"
              y1="88"
              x2={585 - momentLen}
              y2="88"
              stroke="#4f86c6"
              strokeWidth="3"
              markerEnd="url(#combined-moment-arrow)"
              animate={{ x2: 585 - momentLen }}
            />
            <text x={585 - momentLen - 4} y="83" textAnchor="end" fontSize="12" fill="#4f86c6">
              σM
            </text>
            <text x="585" y="105" textAnchor="middle" fontSize="13" fill="currentColor">
              τ = T/Wp
            </text>
            <text x="585" y="125" textAnchor="middle" fontSize="13" fill="currentColor">
              gradient: M
            </text>
            <text x="585" y="214" textAnchor="middle" fontSize="13" fill="currentColor">
              N: σN równomierne
            </text>
            <text x="585" y="286" textAnchor="middle" fontSize="14" fill="currentColor">
              σx(A) = {fmt(sigmaX, 1)} MPa
            </text>
            <text x="585" y="308" textAnchor="middle" fontSize="14" fill="#e9a23b">
              τ(A) = {fmt(tau, 1)} MPa
            </text>
            <text x="380" y="336" textAnchor="middle" fontSize="12" fill="currentColor">
              {comparison} Re = {yieldMPa} MPa.
            </text>
          </svg>
          <div
            className="lab-chart"
            aria-label="Porównanie naprężeń zredukowanych HMH i Tresca z granicą plastyczności"
          >
            <ResponsiveContainer width="100%" height={210}>
              <BarChart data={chartData} margin={{ top: 24, right: 20, left: 8, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.25} />
                <XAxis dataKey="name" />
                <YAxis
                  width={58}
                  domain={[0, 'auto']}
                  tickFormatter={(value: number) => fmt(value, 0)}
                  label={{ value: 'σ [MPa]', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip />
                <ReferenceLine
                  y={yieldMPa}
                  stroke="#e76f51"
                  strokeDasharray="5 4"
                  label={{ value: `Re = ${yieldMPa} MPa`, position: 'insideTopRight', fontSize: 12 }}
                />
                <Bar dataKey="stress" name="σ zredukowana [MPa]" radius={[5, 5, 0, 0]} isAnimationActive={false}>
                  {chartData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      }
    />
  )
}
