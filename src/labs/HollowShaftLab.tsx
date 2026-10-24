import { useState } from 'react'
import { motion } from 'motion/react'
import { Control, Lab, Metric, fmt } from '../components/UI'
import { hollowTorsionShearMPa } from '../lib/advanced'
import { torsionShearMPa } from '../lib/engineering'

const CENTER_Y = 150
const PLOT_BASE_Y = 392
const PLOT_MAX_HEIGHT = 58
const SPOKE_COUNT = 12
const SPRING = { type: 'spring', stiffness: 160, damping: 23 } as const

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
  const spinDuration = Math.min(45, Math.max(5, 20000 / torqueNM))
  const plotScale = PLOT_MAX_HEIGHT / Math.max(tauSolidMPa, tauHollowMPa)
  const solidPlotHeight = tauSolidMPa * plotScale
  const hollowPlotHeight = tauHollowMPa * plotScale
  const spokes = Array.from({ length: SPOKE_COUNT }, (_, index) => (index * 2 * Math.PI) / SPOKE_COUNT)
  const torqueArc = (cx: number) =>
    `M${cx - outerRadius} ${CENTER_Y - outerRadius * 0.66} A${outerRadius} ${outerRadius} 0 0 1 ${cx + outerRadius * 0.66} ${CENTER_Y - outerRadius}`
  const spokeLines = (cx: number, startRadius: number) =>
    spokes.map((angle) => (
      <line
        key={angle}
        x1={cx + Math.cos(angle) * startRadius}
        y1={CENTER_Y + Math.sin(angle) * startRadius}
        x2={cx + Math.cos(angle) * (outerRadius - 5)}
        y2={CENTER_Y + Math.sin(angle) * (outerRadius - 5)}
        stroke="#4f6df5"
        strokeWidth="2"
        opacity="0.55"
        markerEnd="url(#hollow-spoke-arrow)"
      />
    ))
  const stressPlot = (cx: number, innerPlotRadius: number, plotHeight: number) => {
    const innerPlotHeight = (plotHeight * innerPlotRadius) / outerRadius
    const tipX = cx + outerRadius
    const tipY = PLOT_BASE_Y - plotHeight
    const filledPath =
      innerPlotRadius > 0.5
        ? `M${cx + innerPlotRadius} ${PLOT_BASE_Y}L${tipX} ${PLOT_BASE_Y}L${tipX} ${tipY}L${cx + innerPlotRadius} ${PLOT_BASE_Y - innerPlotHeight}Z`
        : `M${cx} ${PLOT_BASE_Y}L${tipX} ${PLOT_BASE_Y}L${tipX} ${tipY}Z`
    const slopePath =
      innerPlotRadius > 0.5
        ? `M${cx + innerPlotRadius} ${PLOT_BASE_Y - innerPlotHeight}L${tipX} ${tipY}`
        : `M${cx} ${PLOT_BASE_Y}L${tipX} ${tipY}`
    const axisTipX = cx + outerRadius + 34
    return (
      <g key={cx}>
        <text x={cx} y="318" textAnchor="middle" fontSize="13" fill="currentColor">
          Rozkład τ(r) = τmax·r/R
        </text>
        <line
          x1={cx}
          y1={PLOT_BASE_Y}
          x2={axisTipX}
          y2={PLOT_BASE_Y}
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.7"
        />
        <path d={`M${axisTipX} ${PLOT_BASE_Y}l-9 -4v8z`} fill="currentColor" opacity="0.7" />
        <text x={axisTipX + 8} y={PLOT_BASE_Y + 4} fontSize="12" fill="currentColor">
          r
        </text>
        <motion.path
          d={filledPath}
          animate={{ d: filledPath }}
          transition={SPRING}
          fill="url(#hollow-tau-plot)"
          stroke="none"
        />
        <motion.path
          d={slopePath}
          animate={{ d: slopePath }}
          transition={SPRING}
          fill="none"
          stroke="#ff6b45"
          strokeWidth="2.5"
          markerEnd="url(#hollow-shaft-arrow)"
        />
        {innerPlotRadius > 0.5 && (
          <>
            <motion.path
              d={`M${cx} ${PLOT_BASE_Y}L${cx + innerPlotRadius} ${PLOT_BASE_Y - innerPlotHeight}`}
              animate={{ d: `M${cx} ${PLOT_BASE_Y}L${cx + innerPlotRadius} ${PLOT_BASE_Y - innerPlotHeight}` }}
              transition={SPRING}
              fill="none"
              stroke="#4f6df5"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            <motion.line
              x1={cx + innerPlotRadius}
              y1={PLOT_BASE_Y}
              x2={cx + innerPlotRadius}
              y2={PLOT_BASE_Y - innerPlotHeight}
              animate={{
                x1: cx + innerPlotRadius,
                x2: cx + innerPlotRadius,
                y2: PLOT_BASE_Y - innerPlotHeight,
              }}
              transition={SPRING}
              stroke="#4f6df5"
              strokeWidth="1.5"
              strokeDasharray="3 3"
              opacity="0.7"
            />
            <text
              x={cx + innerPlotRadius / 2}
              y={PLOT_BASE_Y - innerPlotHeight / 2 - 8}
              textAnchor="middle"
              fontSize="11"
              fill="#4f6df5"
            >
              brak materiału
            </text>
          </>
        )}
        <text x={cx} y={PLOT_BASE_Y + 17} textAnchor="middle" fontSize="11" fill="currentColor">
          r = 0
        </text>
        <text x={tipX} y={PLOT_BASE_Y + 17} textAnchor="middle" fontSize="11" fill="currentColor">
          r = R
        </text>
        <text x={tipX + 6} y={tipY + 4} fontSize="12" fill="#ff6b45">
          τmax
        </text>
      </g>
    )
  }

  const changeOuterD = (value: number) => {
    setOuterDMM(value)
    setInnerDMM((current) => Math.min(current, value - 5))
  }

  return (
    <Lab
      title="Wał pełny i rura o tej samej średnicy"
      instruction="Porównaj przekroje o identycznym D przy tym samym momencie T. Wykresy τ(r) pod przekrojami pokazują, że otwór usuwa materiał o małym naprężeniu, więc τmax w rurze rośnie tylko nieznacznie."
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
          viewBox="0 0 720 460"
          width="100%"
          role="img"
          aria-label="Porównanie rozkładu naprężeń stycznych w wale pełnym i w rurze"
        >
          <title>Rozkład naprężeń stycznych przy skręcaniu przekroju pełnego i rurowego</title>
          <desc>
            Naprężenie styczne rośnie liniowo od zera w środku do τmax na obwodzie. Otwór w rurze usuwa rdzeń o małym
            naprężeniu, dlatego rura przenosi moment prawie tak skutecznie jak wał pełny.
          </desc>
          <defs>
            <radialGradient id="hollow-solid-stress">
              <stop stopColor="#4f6df5" stopOpacity="0.12" />
              <stop offset="1" stopColor="#ff6b45" stopOpacity="0.9" />
            </radialGradient>
            <radialGradient id="hollow-tube-stress">
              <stop stopColor="#4f6df5" stopOpacity="0.2" />
              <stop offset="1" stopColor="#ff6b45" stopOpacity="0.95" />
            </radialGradient>
            <linearGradient id="hollow-tau-plot" x1="0" y1="1" x2="0" y2="0">
              <stop stopColor="#4f6df5" stopOpacity="0.15" />
              <stop offset="1" stopColor="#ff6b45" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="hollow-tau-legend" x1="0" y1="0" x2="1" y2="0">
              <stop stopColor="#4f6df5" stopOpacity="0.3" />
              <stop offset="1" stopColor="#ff6b45" stopOpacity="0.9" />
            </linearGradient>
            <marker
              id="hollow-shaft-arrow"
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
              id="hollow-spoke-arrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10z" fill="#4f6df5" />
            </marker>
          </defs>
          <text x="190" y="22" textAnchor="middle" fontSize="17" fill="currentColor">
            Wał pełny
          </text>
          <text x="530" y="22" textAnchor="middle" fontSize="17" fill="currentColor">
            Rura
          </text>
          <motion.circle
            cx="190"
            cy={CENTER_Y}
            fill="url(#hollow-solid-stress)"
            stroke="currentColor"
            strokeWidth="2"
            animate={{ r: outerRadius }}
            transition={SPRING}
          />
          <motion.circle
            cx="530"
            cy={CENTER_Y}
            fill="url(#hollow-tube-stress)"
            stroke="currentColor"
            strokeWidth="2"
            animate={{ r: outerRadius }}
            transition={SPRING}
          />
          <motion.circle
            cx="530"
            cy={CENTER_Y}
            fill="var(--bg, #17202a)"
            stroke="currentColor"
            strokeWidth="2"
            animate={{ r: Math.max(0.5, innerRadius) }}
            transition={SPRING}
          />
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ duration: spinDuration, ease: 'linear', repeat: Infinity }}
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          >
            {spokeLines(190, 8)}
          </motion.g>
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ duration: spinDuration, ease: 'linear', repeat: Infinity }}
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          >
            {spokeLines(530, innerDMM > 0 ? innerRadius + 2 : 8)}
          </motion.g>
          {innerDMM > 0 && (
            <motion.circle
              cx="190"
              cy={CENTER_Y}
              fill="none"
              stroke="#4f6df5"
              strokeWidth="1.5"
              strokeDasharray="5 4"
              animate={{ r: Math.max(2, innerRadius) }}
              transition={SPRING}
            />
          )}
          <circle cx="190" cy={CENTER_Y} r="4" fill="currentColor" />
          <circle cx="530" cy={CENTER_Y} r="3" fill="currentColor" />
          <text x="200" y={CENTER_Y - 10} fontSize="12" fill="#4f6df5">
            τ = 0
          </text>
          {innerRadius >= 14 && (
            <text x="530" y={CENTER_Y + 4} textAnchor="middle" fontSize="12" fill="currentColor" opacity="0.75">
              otwór
            </text>
          )}
          {innerDMM > 0 && innerRadius >= 26 && (
            <text x="190" y={CENTER_Y + innerRadius - 8} textAnchor="middle" fontSize="11" fill="#4f6df5">
              małe τ
            </text>
          )}
          <circle cx={190 + outerRadius} cy={CENTER_Y} r="4" fill="#ff6b45" />
          <circle cx={530 + outerRadius} cy={CENTER_Y} r="4" fill="#ff6b45" />
          <text x={190 + outerRadius + 8} y={CENTER_Y + 4} fontSize="13" fill="#ff6b45">
            τmax
          </text>
          <text x={530 + outerRadius + 8} y={CENTER_Y + 4} fontSize="13" fill="#ff6b45">
            τmax
          </text>
          <motion.path
            d={torqueArc(190)}
            fill="none"
            stroke="#ff6b45"
            strokeWidth={torqueStroke}
            markerEnd="url(#hollow-shaft-arrow)"
            animate={{ d: torqueArc(190) }}
          />
          <motion.path
            d={torqueArc(530)}
            fill="none"
            stroke="#ff6b45"
            strokeWidth={torqueStroke}
            markerEnd="url(#hollow-shaft-arrow)"
            animate={{ d: torqueArc(530) }}
          />
          <text x="190" y={CENTER_Y - outerRadius - 12} textAnchor="middle" fontSize="14" fill="#ff6b45">
            T = {torqueNM} N·m
          </text>
          <text x="530" y={CENTER_Y - outerRadius - 12} textAnchor="middle" fontSize="14" fill="#ff6b45">
            T = {torqueNM} N·m
          </text>
          <line x1={190 - outerRadius - 8} y1="260" x2={190 + outerRadius + 8} y2="260" stroke="currentColor" />
          <line x1={530 - outerRadius - 8} y1="260" x2={530 + outerRadius + 8} y2="260" stroke="currentColor" />
          <text x="190" y="278" textAnchor="middle" fontSize="14" fill="currentColor">
            D = {outerDMM} mm
          </text>
          <text x="530" y="278" textAnchor="middle" fontSize="14" fill="currentColor">
            D = {outerDMM} mm · d = {innerDMM} mm
          </text>
          <text x="190" y="299" textAnchor="middle" fontSize="14" fill="currentColor">
            A = {fmt(solidAreaMM2)} mm²
          </text>
          <text x="530" y="299" textAnchor="middle" fontSize="14" fill="currentColor">
            A = {fmt(hollowAreaMM2)} mm²
          </text>
          {stressPlot(190, 0, solidPlotHeight)}
          {stressPlot(530, innerRadius, hollowPlotHeight)}
          <rect x="30" y="428" width="64" height="12" rx="6" fill="url(#hollow-tau-legend)" />
          <text x="102" y="438" fontSize="12" fill="currentColor">
            τ rośnie liniowo od środka
          </text>
          <line
            x1="272"
            y1="434"
            x2="302"
            y2="434"
            stroke="#4f6df5"
            strokeWidth="2"
            markerEnd="url(#hollow-spoke-arrow)"
          />
          <text x="310" y="438" fontSize="12" fill="currentColor">
            τ styczne do obwodu
          </text>
          <circle cx="478" cy="434" r="8" fill="none" stroke="#4f6df5" strokeWidth="1.5" strokeDasharray="4 3" />
          <text x="492" y="438" fontSize="12" fill="currentColor">
            rdzeń o małym τ — usuwany w rurze
          </text>
        </svg>
      }
    />
  )
}
