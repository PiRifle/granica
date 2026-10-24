import { useState } from 'react'
import { motion } from 'motion/react'
import { Bar, BarChart, CartesianGrid, Cell, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Control, Formula, Lab, Metric, Segmented, fmt } from '../components/UI'
import { safetyFactor, trescaPlaneMPa, vonMisesPlaneMPa } from '../lib/advanced'
import { bendingStressMPa, circleSectionModulusMM3, stressMPa, torsionShearMPa } from '../lib/engineering'
import { combinedDiameterMM } from './StrainCriteriaLabsShared'

type SectionView = 'axial' | 'bending' | 'torsion' | 'combined'

const cxS = 585
const cyS = 185
const rS = 95
const colorN = '#ff6b45'
const colorM = '#4f6df5'
const colorT = '#e0a14b'
const colorSum = '#27835a'
const spring = { type: 'spring' as const, stiffness: 220, damping: 26 }

export function CombinedLab() {
  const [forceKN, setForceKN] = useState(30)
  const [momentKNM, setMomentKNM] = useState(1.2)
  const [torqueNM, setTorqueNM] = useState(800)
  const [yieldMPa, setYieldMPa] = useState(235)
  const [view, setView] = useState<SectionView>('combined')
  const areaMM2 = (Math.PI * combinedDiameterMM ** 2) / 4
  const sectionModulusMM3 = circleSectionModulusMM3(combinedDiameterMM)
  const polarModulusMM3 = 2 * sectionModulusMM3
  const axialMPa = stressMPa(forceKN, areaMM2)
  const bendingMPa = bendingStressMPa(momentKNM, sectionModulusMM3)
  const sigmaX = Math.abs(axialMPa) + bendingMPa
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
  const chartMax = Math.max(yieldMPa, vonMises, tresca, 1) * 1.12
  const chartData = [
    { name: 'HMH', stress: vonMises, color: '#4f6df5' },
    { name: 'Tresca', stress: tresca, color: '#e0a14b' },
  ]
  const torqueDirection = torqueNM < 0 ? -1 : 1
  const forceLen = 28 + Math.min(46, Math.abs(forceKN) / 2)
  const tauLen = 24 + Math.min(46, (Math.abs(torqueNM) / 2000) * 46)
  const bendArrowLen = 18 + Math.min(44, bendingMPa / 4)
  const axialDotR = 4 + Math.min(5, Math.abs(axialMPa) / 6)
  const critTop = axialMPa >= 0
  const critY = critTop ? cyS - rS : cyS + rS
  const sigmaTop = axialMPa + bendingMPa
  const sigmaBottom = axialMPa - bendingMPa
  const torsionArrows = [
    { r: rS, angles: [20, 110, 200, 290] },
    { r: 62, angles: [65, 245] },
    { r: 33, angles: [155, 335] },
  ].flatMap(({ r, angles }) => angles.map((angle) => ({ r, angle })))
  const viewNames: Record<SectionView, string> = {
    axial: 'σN — rozciąganie / ściskanie',
    bending: 'σM — zginanie',
    torsion: 'τ — skręcanie',
    combined: 'superpozycja: σN + σM oraz τ',
  }

  return (
    <Lab
      title="Pręt kołowy: rozciąganie, zginanie i skręcanie"
      instruction={`Wałek kołowy d = ${combinedDiameterMM} mm przenosi jednocześnie siłę osiową N, moment gnący M i moment skręcający T. Wybierz widok przekroju, aby zobaczyć każdą składową naprężenia osobno i ich superpozycję. Punkt krytyczny A leży na obwodzie tam, gdzie |σN| + σM jest największe; n = Re/σzred.`}
      onReset={() => {
        setForceKN(30)
        setMomentKNM(1.2)
        setTorqueNM(800)
        setYieldMPa(235)
        setView('combined')
      }}
      controls={
        <>
          <Segmented
            label="Widok przekroju"
            value={view}
            onChange={setView}
            options={[
              { value: 'axial', label: 'σN' },
              { value: 'bending', label: 'σM' },
              { value: 'torsion', label: 'τ' },
              { value: 'combined', label: 'Σ superpozycja' },
            ]}
          />
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
          <Metric label="σN = N/A" value={fmt(axialMPa, 1)} unit="MPa" />
          <Metric label="σM = M/W" value={fmt(bendingMPa, 1)} unit="MPa" />
          <Metric label="τ = T/Wp" value={fmt(tau, 1)} unit="MPa" />
          <Metric label="HMH: σzred" value={fmt(vonMises, 1)} unit="MPa" tone="accent" />
          <Metric label="HMH: n = Re/σzred" value={Number.isFinite(vonMisesSafety) ? fmt(vonMisesSafety, 2) : '∞'} />
          <Metric label="Tresca: σzred" value={fmt(tresca, 1)} unit="MPa" tone="accent" />
          <Metric label="Tresca: n = Re/σzred" value={Number.isFinite(trescaSafety) ? fmt(trescaSafety, 2) : '∞'} />
        </>
      }
      visual={
        <>
          <svg
            viewBox="0 0 760 470"
            width="100%"
            role="img"
            aria-label="Obciążony wałek kołowy i przekrój ze składowymi naprężeń oraz punktem krytycznym A"
          >
            <title>Stan obciążenia wałka i składowe naprężeń w przekroju</title>
            <desc>
              Na wałku zaznaczono siłę osiową N oraz momenty M i T. W przekroju kołowym można przełączać widok: σN
              równomierne od N, liniowy gradient σM od zginania, styczne τ od skręcania oraz superpozycję z punktem
              krytycznym A, w którym naprężenia się sumują.
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
                <path d="M0 0L10 5L0 10Z" fill="#ff6b45" />
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
                <path d="M0 0L10 5L0 10Z" fill="#4f6df5" />
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
                <path d="M0 0L10 5L0 10Z" fill="#e0a14b" />
              </marker>
              <marker
                id="combined-sum-arrow"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto"
              >
                <path d="M0 0L10 5L0 10Z" fill="#27835a" />
              </marker>
              <linearGradient id="combined-section-fill" x1="0" y1="0" x2="0" y2="1">
                <stop stopColor="#4f6df5" stopOpacity="0.9" />
                <stop offset="0.5" stopColor="#ffffff" stopOpacity="0.12" />
                <stop offset="1" stopColor="#ff6b45" stopOpacity="0.85" />
              </linearGradient>
            </defs>
            <text x="220" y="27" textAnchor="middle" fontSize="16" fill="currentColor">
              Obciążenie wałka
            </text>
            <text x="585" y="27" textAnchor="middle" fontSize="16" fill="currentColor">
              Przekrój: {viewNames[view]}
            </text>
            <path d="M78 113L98 133V207L78 227Z" fill="currentColor" opacity="0.28" />
            <line x1="98" y1="105" x2="98" y2="225" stroke="currentColor" strokeWidth="4" />
            <rect
              x="98"
              y="137"
              width="270"
              height="66"
              rx="4"
              fill="#8fa4f8"
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
                    stroke="#ff6b45"
                    strokeWidth="3"
                    markerEnd="url(#combined-force-arrow)"
                  />
                  <line
                    x1="375"
                    y1="170"
                    x2={375 + forceLen}
                    y2="170"
                    stroke="#ff6b45"
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
                    stroke="#ff6b45"
                    strokeWidth="3"
                    markerEnd="url(#combined-force-arrow)"
                  />
                  <line
                    x1={375 + forceLen}
                    y1="170"
                    x2="375"
                    y2="170"
                    stroke="#ff6b45"
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
              stroke="#4f6df5"
              strokeWidth="3"
              markerEnd="url(#combined-moment-arrow)"
            />
            <text x="31" y="95" fontSize="14" fill="#4f6df5">
              M = {fmt(momentKNM, 1)} kN·m
            </text>
            <motion.path
              d={torqueDirection > 0 ? 'M330 105C380 70 430 100 402 130' : 'M402 130C430 100 380 70 330 105'}
              animate={{ opacity: torqueNM === 0 ? 0.2 : 1 }}
              fill="none"
              stroke="#e0a14b"
              strokeWidth="3"
              markerEnd="url(#combined-tau-arrow)"
            />
            <text x="341" y="86" fontSize="14" fill="#e0a14b">
              T = {torqueNM} N·m
            </text>
            <text x="220" y="244" textAnchor="middle" fontSize="13" fill="currentColor">
              A = πd²/4 = {fmt(areaMM2, 0)} mm²
            </text>
            <text x="220" y="266" textAnchor="middle" fontSize="13" fill="currentColor">
              W = πd³/32 · Wp = 2W = {fmt(polarModulusMM3, 0)} mm³
            </text>
            <text x="220" y="288" textAnchor="middle" fontSize="13" fill="currentColor">
              σN = {fmt(axialMPa, 1)} MPa · σM = {fmt(bendingMPa, 1)} MPa · τ = {fmt(tau, 1)} MPa
            </text>
            {view === 'axial' && (
              <>
                <motion.circle
                  cx={cxS}
                  cy={cyS}
                  r={rS}
                  fill={colorN}
                  stroke="currentColor"
                  strokeWidth="2"
                  animate={{ opacity: 0.22 + Math.min(Math.abs(axialMPa) / 50, 0.4) }}
                  transition={spring}
                />
                {[-52, 0, 52].flatMap((dx) =>
                  [-52, 0, 52].map((dy) => (
                    <g key={`${dx}:${dy}`}>
                      {axialMPa >= 0 ? (
                        <>
                          <circle
                            cx={cxS + dx}
                            cy={cyS + dy}
                            r={axialDotR}
                            fill="none"
                            stroke={colorN}
                            strokeWidth="2.5"
                          />
                          <circle cx={cxS + dx} cy={cyS + dy} r={axialDotR * 0.35} fill={colorN} />
                        </>
                      ) : (
                        <>
                          <line
                            x1={cxS + dx - axialDotR}
                            y1={cyS + dy - axialDotR}
                            x2={cxS + dx + axialDotR}
                            y2={cyS + dy + axialDotR}
                            stroke={colorN}
                            strokeWidth="2.5"
                          />
                          <line
                            x1={cxS + dx - axialDotR}
                            y1={cyS + dy + axialDotR}
                            x2={cxS + dx + axialDotR}
                            y2={cyS + dy - axialDotR}
                            stroke={colorN}
                            strokeWidth="2.5"
                          />
                        </>
                      )}
                    </g>
                  )),
                )}
                <text x={cxS} y={cyS + rS + 26} textAnchor="middle" fontSize="13" fill="currentColor">
                  σN = N/A = {fmt(axialMPa, 1)} MPa — stałe w całym przekroju
                </text>
                <text x={cxS} y={cyS + rS + 46} textAnchor="middle" fontSize="12" fill="currentColor" opacity="0.8">
                  {axialMPa >= 0 ? '⊙ wektor „z rysunku" — rozciąganie' : '⊗ wektor „w rysunek" — ściskanie'}
                </text>
              </>
            )}
            {view === 'bending' && (
              <>
                <circle
                  cx={cxS}
                  cy={cyS}
                  r={rS}
                  fill="url(#combined-section-fill)"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <line
                  x1={cxS - rS - 10}
                  y1={cyS}
                  x2={cxS + rS + 10}
                  y2={cyS}
                  stroke="currentColor"
                  strokeDasharray="5 4"
                  opacity="0.5"
                />
                <text x="752" y={cyS + 16} textAnchor="end" fontSize="11" fill="currentColor" opacity="0.8">
                  oś obojętna
                </text>
                {[-72, -48, -24, 24, 48, 72].map((dy) => {
                  const len = (Math.abs(dy) / 72) * bendArrowLen
                  const tension = dy < 0
                  return (
                    <motion.line
                      key={dy}
                      x1={cxS}
                      y1={cyS + dy}
                      stroke={tension ? colorM : colorN}
                      strokeWidth="3"
                      markerEnd={tension ? 'url(#combined-moment-arrow)' : 'url(#combined-force-arrow)'}
                      animate={{ x2: tension ? cxS - len : cxS + len, y2: cyS + dy }}
                      transition={spring}
                    />
                  )
                })}
                <text x={cxS - bendArrowLen - 8} y={cyS - 66} textAnchor="end" fontSize="12" fill={colorM}>
                  σM = M/W
                </text>
                <text x={cxS + bendArrowLen + 8} y={cyS + 76} fontSize="12" fill={colorN}>
                  −σM (ściskanie)
                </text>
                <text x={cxS} y={cyS + rS + 26} textAnchor="middle" fontSize="13" fill="currentColor">
                  σM = M/W = {fmt(bendingMPa, 1)} MPa — liniowy po wysokości
                </text>
                <text x={cxS} y={cyS + rS + 46} textAnchor="middle" fontSize="12" fill="currentColor" opacity="0.8">
                  maksimum na skrajnych włóknach, zero na osi obojętnej
                </text>
              </>
            )}
            {view === 'torsion' && (
              <>
                <circle
                  cx={cxS}
                  cy={cyS}
                  r={rS}
                  fill={colorT}
                  fillOpacity="0.1"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                {[33, 62].map((r) => (
                  <circle
                    key={r}
                    cx={cxS}
                    cy={cyS}
                    r={r}
                    fill="none"
                    stroke={colorT}
                    strokeDasharray="4 4"
                    opacity="0.45"
                  />
                ))}
                {torsionArrows.map((arrow) => {
                  const rad = (arrow.angle * Math.PI) / 180
                  const px = cxS + arrow.r * Math.cos(rad)
                  const py = cyS + arrow.r * Math.sin(rad)
                  const tx = -Math.sin(rad) * torqueDirection
                  const ty = Math.cos(rad) * torqueDirection
                  const len = ((tauLen * arrow.r) / rS) * 0.5
                  return (
                    <motion.line
                      key={`${arrow.r}:${arrow.angle}`}
                      stroke={colorT}
                      strokeWidth="3"
                      markerEnd="url(#combined-tau-arrow)"
                      animate={{ x1: px - tx * len, y1: py - ty * len, x2: px + tx * len, y2: py + ty * len }}
                      transition={spring}
                    />
                  )
                })}
                <text x={cxS} y={cyS + rS + 26} textAnchor="middle" fontSize="13" fill="currentColor">
                  τ(ρ) = T·ρ/Ip — rośnie liniowo z promieniem
                </text>
                <text x={cxS} y={cyS + rS + 46} textAnchor="middle" fontSize="12" fill="currentColor" opacity="0.8">
                  τmax = T/Wp = {fmt(tau, 1)} MPa na obwodzie
                </text>
              </>
            )}
            {view === 'combined' && (
              <>
                <motion.circle
                  cx={cxS}
                  cy={cyS}
                  r={rS}
                  fill="url(#combined-section-fill)"
                  stroke="currentColor"
                  strokeWidth="2"
                  animate={{ opacity: 0.7 + Math.min(Math.abs(sigmaX) / 500, 0.3) }}
                  transition={spring}
                />
                <line
                  x1={cxS - rS - 10}
                  y1={cyS}
                  x2={cxS + rS + 10}
                  y2={cyS}
                  stroke="currentColor"
                  strokeDasharray="5 4"
                  opacity="0.5"
                />
                {[
                  { y: cyS - 70, value: sigmaTop },
                  { y: cyS + 70, value: sigmaBottom },
                ].map(({ y, value }) => {
                  const len = 12 + Math.min(48, Math.abs(value) / 4)
                  return (
                    <motion.line
                      key={y}
                      x1={cxS}
                      y1={y}
                      stroke={colorSum}
                      strokeWidth="3.5"
                      markerEnd="url(#combined-sum-arrow)"
                      animate={{ x2: value >= 0 ? cxS - len : cxS + len, y2: y }}
                      transition={spring}
                    />
                  )
                })}
                <text x="752" y={cyS - 64} textAnchor="end" fontSize="11" fill={colorSum}>
                  σ(góra) = σN + σM = {fmt(sigmaTop, 1)} MPa
                </text>
                <text x="752" y={cyS + 72} textAnchor="end" fontSize="11" fill={colorSum}>
                  σ(dół) = σN − σM = {fmt(sigmaBottom, 1)} MPa
                </text>
                <motion.line
                  y1={critY}
                  y2={critY}
                  stroke={colorT}
                  strokeWidth="4"
                  markerEnd="url(#combined-tau-arrow)"
                  animate={{ x1: cxS - (torqueDirection * tauLen) / 2, x2: cxS + (torqueDirection * tauLen) / 2 }}
                  transition={spring}
                />
                <circle className="lab-pulse" cx={cxS} cy={critY} r="8" fill={colorN} stroke="white" strokeWidth="2" />
                <text x={cxS + 16} y={critY - 4} fontSize="13" fontWeight="bold" fill={colorN}>
                  punkt krytyczny A
                </text>
                <text x={cxS} y={cyS + rS + 26} textAnchor="middle" fontSize="13" fill="currentColor">
                  σx(A) = |σN| + σM = {fmt(sigmaX, 1)} MPa
                </text>
                <text x={cxS} y={cyS + rS + 46} textAnchor="middle" fontSize="13" fill={colorT}>
                  τ(A) = T/Wp = {fmt(tau, 1)} MPa
                </text>
              </>
            )}
            {view !== 'combined' && (
              <>
                <circle cx={cxS} cy={critY} r="5" fill={colorN} stroke="white" strokeWidth="1.5" opacity="0.9" />
                <text x={cxS + 12} y={critTop ? critY - 6 : critY + 16} fontSize="12" fill={colorN}>
                  A
                </text>
              </>
            )}
            <text x="70" y="352" fontSize="13" fontWeight="bold" fill="currentColor">
              Legenda:
            </text>
            <line x1="70" y1="370" x2="98" y2="370" stroke={colorN} strokeWidth="4" />
            <text x="106" y="374" fontSize="12" fill="currentColor">
              N → σN = N/A — równomierne
            </text>
            <line x1="400" y1="370" x2="428" y2="370" stroke={colorM} strokeWidth="4" />
            <text x="436" y="374" fontSize="12" fill="currentColor">
              M → σM = M/W — liniowe po wysokości
            </text>
            <line x1="70" y1="396" x2="98" y2="396" stroke={colorT} strokeWidth="4" />
            <text x="106" y="400" fontSize="12" fill="currentColor">
              T → τ = T/Wp — styczne do obwodu
            </text>
            <circle cx="412" cy="392" r="6" fill={colorN} stroke="white" strokeWidth="1.5" />
            <text x="426" y="400" fontSize="12" fill="currentColor">
              punkt krytyczny A — tu σN i σM się sumują
            </text>
            <text x="380" y="452" textAnchor="middle" fontSize="12" fill="currentColor">
              {comparison} Re = {yieldMPa} MPa.
            </text>
          </svg>
          <Formula
            compact
            note={`Podstawienie: σx = ${fmt(sigmaX, 1)} MPa, τ = ${fmt(tau, 1)} MPa → HMH: ${fmt(vonMises, 1)} MPa, Tresca: ${fmt(tresca, 1)} MPa.`}
          >
            {
              '\\sigma_{zred}^{HMH} = \\sqrt{\\sigma_x^2 + 3\\tau^2} \\qquad \\sigma_{zred}^{T} = \\sqrt{\\sigma_x^2 + 4\\tau^2}'
            }
          </Formula>
          <div
            className="lab-chart"
            style={{ width: '100%' }}
            aria-label="Porównanie naprężeń zredukowanych HMH i Tresca z granicą plastyczności"
          >
            <ResponsiveContainer width="100%" height={210}>
              <BarChart data={chartData} margin={{ top: 24, right: 20, left: 14, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.25} />
                <XAxis dataKey="name" />
                <YAxis
                  width={58}
                  domain={[0, chartMax]}
                  tickFormatter={(value: number) => fmt(value, 0)}
                  label={{ value: 'σ [MPa]', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip />
                <ReferenceLine
                  y={yieldMPa}
                  stroke="#ff6b45"
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
