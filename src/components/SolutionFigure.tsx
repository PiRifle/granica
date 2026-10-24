import { motion } from 'motion/react'
import type {
  AxialFigure,
  AxialSegment,
  BeamFigure,
  CubeFigure,
  RosetteFigure,
  SectionFigure,
  SolutionFigure,
  SolutionScene,
} from '../types'
import styles from './SolutionFigure.module.css'

const local = (...values: Array<string | false | null | undefined>) =>
  values
    .filter(Boolean)
    .join(' ')
    .split(/\s+/)
    .filter(Boolean)
    .map((name) => styles[name] ?? name)
    .join(' ')

const numberFormat = new Intl.NumberFormat('pl-PL', { maximumSignificantDigits: 6 })
const formatNumber = (value?: number) => (value == null || Number.isNaN(value) ? '—' : numberFormat.format(value))

const SEGMENT_COLORS = ['#4f6df5', '#ff8a5c', '#5bb98c', '#a970dd', '#d8a13b']

export interface Focus {
  metric?: string
  segment?: string
}

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .replace(/\\alpha/g, 'α')
    .replace(/\\beta/g, 'β')
    .replace(/\\gamma/g, 'γ')
    .replace(/\\varepsilon/g, 'ε')
    .replace(/\\sigma/g, 'σ')
}

export function inferFocus(scene: SolutionScene, figure: SolutionFigure): Focus {
  const text = normalizeText(`${scene.title} ${scene.narration} ${scene.formula ?? ''}`)
  const title = normalizeText(scene.title)

  if (figure.kind === 'axial') {
    const hasThermal = figure.segments.some((segment) => segment.freeDeltaL != null)
    const metricFrom = (value: string) => {
      if (/αδt/.test(value) || (/α/.test(value) && /delta|δt/.test(value))) return 'αΔT'
      if (hasThermal && /swobod|termiczn|składow|l_t/.test(value)) return 'ΔL_T'
      if (/wydłuż|przemieszcz|delta\s*l|δl|Δl/.test(value)) return 'ΔL'
      if (/odkształ|epsilon|ε/.test(value)) return 'ε'
      if (/napręż|sigma|σ/.test(value)) return 'σ'
      if (/pole|pola|mm²|cm²|a_1|a₁/.test(value)) return 'A'
      if (/reakcj|metoda przekroj|wykres n|równowag|n_|n\(/.test(value)) return 'N'
      return undefined
    }
    const metric = metricFrom(title) ?? metricFrom(text)

    const mentioned = figure.segments.filter(
      (segment) =>
        text.includes(segment.id.toLowerCase()) ||
        text.includes(segment.label.toLowerCase()) ||
        text.includes(segment.label.replace(/[ąę]/g, '').toLowerCase()),
    )
    let segment: string | undefined
    if (mentioned.length === 1) segment = mentioned[0].id
    else if (/doln/.test(title)) segment = figure.segments[figure.segments.length - 1]?.id
    else if (/górn/.test(title)) segment = figure.segments[0]?.id
    else if (/środk/.test(title) && figure.segments.length >= 3) segment = figure.segments[1]?.id
    return { metric, segment }
  }

  if (figure.kind === 'beam') {
    let metric: string | undefined
    if (/reakcj/.test(title)) metric = 'reaction'
    else if (/wskaźnik|średnic|dobór|warunek|wytrzymałości/.test(title)) metric = 'design'
    else if (/moment/.test(title)) metric = 'M'
    else if (/poprzecz|siła t|t\(x\)|tnąc/.test(title)) metric = 'T'
    else if (/obciąż|wypadkow/.test(title)) metric = 'load'
    else if (/r_|reakcj/.test(text)) metric = 'reaction'
    else if (/t_|t\(|poprzecz/.test(text)) metric = 'T'
    else if (/m_|m\(|moment/.test(text)) metric = 'M'
    return { metric }
  }

  if (figure.kind === 'section') {
    let metric: string | undefined
    if (/moment względem osi y|i_y|oś y|osi y/.test(title)) metric = 'Iy'
    else if (/moment względem osi x|i_x|steiner|przenieś moment|zsumuj moment względem osi x/.test(title)) metric = 'Ix'
    else if (/środek ciężkości|centroid|y_c|centroidy/.test(title)) metric = 'centroid'
    else if (/pole|pola/.test(title)) metric = 'section'
    else if (/zinterpret/.test(title)) metric = 'centroid'
    else if (/i_y/.test(text)) metric = 'Iy'
    else if (/i_x|steiner/.test(text)) metric = 'Ix'
    else if (/y_c|centroid/.test(text)) metric = 'centroid'
    else if (/a_g|a_s|a_d|pole|a=/.test(text)) metric = 'section'
    return { metric }
  }

  if (figure.kind === 'cube') {
    let metric: string | undefined
    if (/warunk|więz|brzeg/.test(title)) metric = 'constraints'
    else if (/objętoś/.test(title)) metric = 'volume'
    else if (/napręż|nacisk|sigma|σ/.test(title)) metric = 'stress'
    else if (/odkształ|epsilon|ε/.test(title)) metric = 'strain'
    else if (/objętoś|delta v|Δv|θ/.test(text)) metric = 'volume'
    else if (/odkształ|epsilon|varepsilon|ε/.test(text)) metric = 'strain'
    else if (/napręż|sigma|σ|nacisk/.test(text)) metric = 'stress'
    return { metric }
  }

  let metric: string | undefined
  if (/postaciow/.test(title)) metric = 'shear'
  else if (/kierunk|kąt|φ/.test(title)) metric = 'angle'
  else if (/napręż|sigma|σ/.test(title)) metric = 'stress'
  else if (/główne/.test(title)) metric = 'principal'
  else if (/środek|promień|koło/.test(title)) metric = 'mohr'
  else if (/odczyty|przypisz|osie|pomiar/.test(title)) metric = 'gauges'
  else if (/r_ε|ε_sr|ε_\{?sr/.test(text)) metric = 'mohr'
  else if (/postaciow|gamma|γ/.test(text)) metric = 'shear'
  else if (/kierunk|kąt|φ|angle/.test(text)) metric = 'angle'
  else if (/napręż|sigma|σ/.test(text)) metric = 'stress'
  else if (/główne|principal/.test(text)) metric = 'principal'
  return { metric }
}

const FOCUS_DEFAULTS: Record<SolutionFigure['kind'], string> = {
  axial: 'N',
  beam: 'M',
  section: 'section',
  cube: 'constraints',
  rosette: 'gauges',
}

export function resolveFocus(scene: SolutionScene, figure: SolutionFigure): Focus {
  const inferred = inferFocus(scene, figure)
  return {
    metric: scene.focus?.metric ?? inferred.metric ?? FOCUS_DEFAULTS[figure.kind],
    segment: scene.focus?.segment ?? inferred.segment,
  }
}

const METRIC_DEFS = [
  { key: 'N', label: 'N', get: (segment: AxialSegment) => segment.n },
  { key: 'σ', label: 'σ', get: (segment: AxialSegment) => segment.sigma },
  { key: 'ε', label: 'ε', get: (segment: AxialSegment) => segment.epsilon },
  { key: 'ΔL', label: 'ΔL', get: (segment: AxialSegment) => segment.deltaL },
  { key: 'ΔL_T', label: 'ΔL_T', get: (segment: AxialSegment) => segment.freeDeltaL },
  { key: 'αΔT', label: 'αΔT', get: (segment: AxialSegment) => segment.thermalStrain },
  { key: 'A', label: 'A', get: (segment: AxialSegment) => segment.area },
] as const

function AxialView({
  figure,
  scene,
  focus: suppliedFocus,
  animationKey,
  progress = 1,
}: {
  figure: AxialFigure
  scene: SolutionScene
  focus?: Focus
  animationKey?: string
  progress?: number
}) {
  const focus = suppliedFocus ?? resolveFocus(scene, figure)
  const requested = focus.metric === 'reaction' || focus.metric === 'load' ? 'N' : focus.metric
  const available = METRIC_DEFS.filter((definition) =>
    figure.segments.some((segment) => definition.get(segment) != null),
  )
  const metric = available.find((definition) => definition.key === requested) ?? available[0] ?? METRIC_DEFS[0]
  const unit =
    figure.units?.[metric.key] ??
    (metric.key === 'N'
      ? 'kN'
      : metric.key === 'σ'
        ? 'MPa'
        : metric.key === 'A'
          ? 'mm²'
          : metric.key === 'ΔL' || metric.key === 'ΔL_T'
            ? 'mm'
            : '–')

  const chart = { top: 32, bottom: 252, centerX: 188 }
  const usable = chart.bottom - chart.top
  const rawHeights = figure.segments.map(
    (segment) => (segment.length / figure.segments.reduce((sum, item) => sum + item.length, 0)) * usable,
  )
  const scale = Math.min(1, usable / rawHeights.reduce((sum, value) => sum + Math.max(value, 30), 0))
  const heights = rawHeights.map((value) => Math.max(value, 30) * scale)
  const nodes = [chart.top]
  for (const height of heights) nodes.push(nodes[nodes.length - 1] + height)

  const maxArea = Math.max(...figure.segments.map((segment) => segment.area ?? 1), 1)
  const halfWidths = figure.segments.map((segment) => 14 + 46 * Math.sqrt((segment.area ?? maxArea) / maxArea))
  const maxHalfWidth = Math.max(...halfWidths)
  const activeSegment = focus.segment
  const activeHeight = figure.segments.findIndex((segment) => segment.id === activeSegment)

  const support = (y: number, direction: 'top' | 'bottom') => {
    const sign = direction === 'top' ? -1 : 1
    return (
      <g key={`${direction}-${y}`} stroke="#68727e" strokeWidth={2} strokeLinecap="round">
        <line x1={chart.centerX - maxHalfWidth - 18} y1={y} x2={chart.centerX + maxHalfWidth + 18} y2={y} />
        {Array.from({ length: 9 }, (_, index) => {
          const x = chart.centerX - maxHalfWidth - 12 + index * ((maxHalfWidth * 2 + 24) / 8)
          return <line key={index} x1={x} y1={y} x2={x + sign * 8} y2={y + sign * 12} strokeWidth={1.5} />
        })}
      </g>
    )
  }

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 280"
          role="img"
          aria-label={`Pręt podzielony na ${figure.segments.length} odcinków z wykresem ${metric.label}`}
        >
          {figure.top === 'fixed' && support(chart.top, 'top')}
          {figure.top === 'gap' && (
            <text x={chart.centerX} y={chart.top - 10} textAnchor="middle" fontSize={10} fill="#87929d">
              luz a
            </text>
          )}
          {figure.bottom === 'fixed' && support(nodes[nodes.length - 1], 'bottom')}
          {figure.bottom === 'gap' && (
            <g stroke="#87929d" strokeWidth={1.5} strokeDasharray="4 4">
              <line
                x1={chart.centerX - 60}
                y1={nodes[nodes.length - 1] + 14}
                x2={chart.centerX + 60}
                y2={nodes[nodes.length - 1] + 14}
              />
              <line
                x1={chart.centerX - 60}
                y1={nodes[nodes.length - 1] + 22}
                x2={chart.centerX + 60}
                y2={nodes[nodes.length - 1] + 22}
              />
            </g>
          )}

          {figure.segments.map((segment, index) => {
            const y = nodes[index]
            const height = heights[index]
            const color = SEGMENT_COLORS[index % SEGMENT_COLORS.length]
            const active = index === activeHeight
            const width = halfWidths[index] * 2
            return (
              <g key={segment.id}>
                <motion.rect
                  x={chart.centerX - halfWidths[index]}
                  y={y}
                  width={width}
                  height={height}
                  rx={4}
                  fill={color}
                  initial={false}
                  animate={{
                    fillOpacity: active ? 0.32 : index % 2 === 0 ? 0.12 : 0.2,
                    strokeWidth: active ? 3 : 1.6,
                  }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  stroke={color}
                />
                {active && (
                  <motion.rect
                    key={`outline-${animationKey}-${segment.id}`}
                    x={chart.centerX - halfWidths[index]}
                    y={y}
                    width={width}
                    height={height}
                    rx={4}
                    fill="none"
                    stroke={color}
                    strokeWidth={2}
                    initial={{ pathLength: 0, opacity: 0.4 }}
                    animate={{ pathLength: progress, opacity: 1 }}
                    transition={{ pathLength: { duration: 0.12, ease: 'linear' }, opacity: { duration: 0.3 } }}
                  />
                )}
                <text
                  x={chart.centerX - halfWidths[index] - 10}
                  y={y + height / 2 + 4}
                  textAnchor="end"
                  fontSize={12}
                  fontWeight={700}
                  fill={color}
                >
                  {segment.label}
                </text>
                <text x={chart.centerX + maxHalfWidth + 16} y={y + height / 2 - 2} fontSize={9} fill="#87929d">
                  L = {formatNumber(segment.length)}
                </text>
                {segment.area != null && (
                  <text x={chart.centerX + maxHalfWidth + 16} y={y + height / 2 + 11} fontSize={9} fill="#87929d">
                    A = {formatNumber(segment.area)}
                  </text>
                )}
              </g>
            )
          })}

          {(figure.loads ?? []).map((load, index) => {
            const y = nodes[load.node] ?? chart.top
            const direction = load.direction ?? 'down'
            const x = chart.centerX + maxHalfWidth + 66 + (index % 2) * 0
            const start = direction === 'down' ? y - 38 : y + 38
            const end = direction === 'down' ? y - 6 : y + 6
            return (
              <g key={`${load.node}-${load.label}`} stroke="#ff6b45" fill="#ff6b45">
                <line x1={x} y1={start} x2={x} y2={end} strokeWidth={2.5} />
                <path
                  d={
                    direction === 'down'
                      ? `M${x - 5} ${end - 8} L${x} ${end} L${x + 5} ${end - 8}`
                      : `M${x - 5} ${end + 8} L${x} ${end} L${x + 5} ${end + 8}`
                  }
                  fill="none"
                  strokeWidth={2.5}
                />
                <text x={x + 8} y={(start + end) / 2 + 4} fontSize={10} stroke="none">
                  {load.label}
                </text>
              </g>
            )
          })}
        </svg>
        <div className={local('lookup')}>
          <div className={local('lookup-head')}>
            <span>{metric.label}</span>
            <span>[{unit}]</span>
          </div>
          {figure.segments.map((segment, index) => (
            <div key={segment.id} className={local('lookup-row', segment.id === activeSegment && 'active')}>
              <span className={local('swatch')} style={{ background: SEGMENT_COLORS[index % SEGMENT_COLORS.length] }} />
              <span className={local('lookup-label')}>{segment.label}</span>
              <strong>{formatNumber(metric.get(segment))}</strong>
            </div>
          ))}
        </div>
      </div>
      {figure.note && <p className={local('note')}>{figure.note}</p>}
    </div>
  )
}

const BEAM_BANDS = [
  { key: 'shear' as const, label: 'T', baseline: 178, height: 34, color: '#4f6df5' },
  { key: 'moment' as const, label: 'M', baseline: 276, height: 34, color: '#ff6b45' },
]

function BeamView({
  figure,
  scene,
  focus: suppliedFocus,
  animationKey,
  progress = 1,
}: {
  figure: BeamFigure
  scene: SolutionScene
  focus?: Focus
  animationKey?: string
  progress?: number
}) {
  const focus = suppliedFocus ?? resolveFocus(scene, figure)
  const activeBand = focus.metric === 'T' ? 'shear' : focus.metric === 'M' ? 'moment' : null
  const x = (value: number) => 55 + (value / figure.length) * 380
  const beamY = 82
  const maxDistributed = Math.max(...(figure.distributed ?? []).flatMap((item) => [item.start, item.end]), 1)

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg viewBox="0 0 480 320" role="img" aria-label="Schemat belki z wykresami siły poprzecznej i momentu gnącego">
          <line
            x1={x(0)}
            y1={beamY}
            x2={x(figure.length)}
            y2={beamY}
            stroke="#556273"
            strokeWidth={5}
            strokeLinecap="round"
          />

          {(figure.distributed ?? []).map((load, loadIndex) => {
            const count = 9
            return (
              <g key={`distributed-${loadIndex}`} stroke="#ff8a5c" fill="#ff8a5c">
                {Array.from({ length: count }, (_, index) => {
                  const ratio = index / (count - 1)
                  const position = load.from + ratio * (load.to - load.from)
                  const intensity = load.start + ratio * (load.end - load.start)
                  const height = 7 + (intensity / maxDistributed) * 26
                  const px = x(position)
                  return (
                    <g key={index}>
                      <line x1={px} y1={beamY - height} x2={px} y2={beamY - 5} strokeWidth={1.4} />
                      <path
                        d={`M${px - 3} ${beamY - 10} L${px} ${beamY - 4} L${px + 3} ${beamY - 10}`}
                        fill="none"
                        strokeWidth={1.4}
                      />
                    </g>
                  )
                })}
                <line
                  x1={x(load.from)}
                  y1={beamY - (7 + (load.start / maxDistributed) * 26)}
                  x2={x(load.to)}
                  y2={beamY - (7 + (load.end / maxDistributed) * 26)}
                  strokeWidth={2}
                />
                <text x={x((load.from + load.to) / 2)} y={beamY - 42} textAnchor="middle" fontSize={9} stroke="none">
                  {load.label}
                </text>
              </g>
            )
          })}

          {(figure.pointLoads ?? []).map((load) => (
            <g key={`load-${load.at}-${load.label}`} stroke="#ff6b45" fill="#ff6b45">
              <line x1={x(load.at)} y1={beamY - 44} x2={x(load.at)} y2={beamY - 7} strokeWidth={2.6} />
              <path
                d={`M${x(load.at) - 5} ${beamY - 15} L${x(load.at)} ${beamY - 6} L${x(load.at) + 5} ${beamY - 15}`}
                fill="none"
                strokeWidth={2.6}
              />
              <text x={x(load.at)} y={beamY - 50} textAnchor="middle" fontSize={10} stroke="none">
                {load.label}
              </text>
            </g>
          ))}

          {(figure.moments ?? []).map((moment) => (
            <g key={`moment-${moment.at}-${moment.label}`} stroke="#a970dd" fill="#a970dd">
              <path
                d={`M${x(moment.at) - 14} ${beamY - 18} A16 16 0 1 1 ${x(moment.at) + 14} ${beamY - 18}`}
                fill="none"
                strokeWidth={2.4}
              />
              <path
                d={`M${x(moment.at) + 9} ${beamY - 28} L${x(moment.at) + 16} ${beamY - 18} L${x(moment.at) + 5} ${beamY - 15}`}
                strokeWidth={2.4}
              />
              <text x={x(moment.at)} y={beamY - 40} textAnchor="middle" fontSize={10} stroke="none">
                {moment.label}
              </text>
            </g>
          ))}

          {figure.supports.map((support) => (
            <g key={`support-${support.at}-${support.label}`}>
              <path
                d={`M${x(support.at) - 10} ${beamY + 16} L${x(support.at)} ${beamY + 2} L${x(support.at) + 10} ${beamY + 16} Z`}
                fill="#68727e"
              />
              <text x={x(support.at)} y={beamY + 30} textAnchor="middle" fontSize={10} fill="#68727e">
                {support.label}
              </text>
            </g>
          ))}

          {BEAM_BANDS.map((band) => {
            const lines = (band.key === 'shear' ? figure.shear : figure.moment) ?? []
            if (lines.length === 0) return null
            const allValues = lines.flat().map(([, value]) => value)
            const maxAbs = Math.max(...allValues.map(Math.abs), 1)
            const active = activeBand === band.key
            const y = (value: number) => band.baseline - (value / maxAbs) * band.height
            return (
              <g key={band.key} opacity={activeBand && !active ? 0.38 : 1}>
                <line x1={55} y1={band.baseline} x2={440} y2={band.baseline} stroke="#c9d0d9" strokeWidth={1} />
                <text x={20} y={band.baseline - band.height - 8} fontSize={10} fontWeight={700} fill={band.color}>
                  {band.label}
                </text>
                {lines.map((line, lineIndex) => {
                  const points = line.map(([position, value]) => `${x(position)},${y(value)}`).join(' ')
                  return (
                    <motion.polyline
                      key={`${band.key}-${lineIndex}-${animationKey}`}
                      points={points}
                      fill="none"
                      stroke={band.color}
                      initial={{ pathLength: 0, opacity: 0.3 }}
                      animate={{ pathLength: active ? progress : 1, opacity: 1 }}
                      transition={{ pathLength: { duration: 0.12, ease: 'linear' }, opacity: { duration: 0.3 } }}
                      strokeWidth={active ? 3 : 2}
                      strokeLinejoin="round"
                    />
                  )
                })}
                {(figure.markers ?? [])
                  .filter((marker) => marker.diagram === band.key)
                  .map((marker, markerIndex) => (
                    <motion.g
                      key={`${band.key}-${markerIndex}-${animationKey}`}
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.45, duration: 0.3 }}
                      style={{ transformOrigin: `${x(marker.x)}px ${y(marker.y)}px` }}
                    >
                      <circle cx={x(marker.x)} cy={y(marker.y)} r={3} fill={band.color} />
                      <text x={x(marker.x) + 6} y={y(marker.y) - 5} fontSize={8.5} fill={band.color}>
                        {marker.text}
                      </text>
                    </motion.g>
                  ))}
              </g>
            )
          })}
        </svg>
        <ValueLookup values={figure.values} focus={focus.metric} />
      </div>
      {figure.note && <p className={local('note')}>{figure.note}</p>}
    </div>
  )
}

function ValueLookup({
  values,
  focus,
}: {
  values?: Array<{ label: string; value: string; focus?: string }>
  focus?: string
}) {
  if (!values || values.length === 0) return null
  return (
    <div className={local('lookup')}>
      {values.map((item) => (
        <div
          key={`${item.label}-${item.value}`}
          className={local('lookup-row value', item.focus === focus && 'active')}
        >
          <span className={local('lookup-label')}>{item.label}</span>
          <strong>{item.value}</strong>
        </div>
      ))}
    </div>
  )
}

function SectionView({
  figure,
  scene,
  focus: suppliedFocus,
  animationKey,
  progress = 1,
}: {
  figure: SectionFigure
  scene: SolutionScene
  focus?: Focus
  animationKey?: string
  progress?: number
}) {
  const focus = suppliedFocus ?? resolveFocus(scene, figure)
  const pad = 40
  const canvas = { width: 460, height: 300 }
  const drawing = { width: 340, height: 196 }
  const scale = Math.min(drawing.width / figure.width, drawing.height / figure.height)
  const offsetX = (canvas.width - figure.width * scale) / 2
  const offsetY = 36
  const px = (value: number) => offsetX + value * scale
  const py = (value: number) => offsetY + (figure.height - value) * scale
  const centroidActive = focus.metric === 'centroid'
  const ixActive = focus.metric === 'Ix'
  const iyActive = focus.metric === 'Iy'

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg viewBox="0 0 460 300" role="img" aria-label="Przekrój poprzeczny z osią centralną i wymiarami">
          {figure.parts.map((part, index) => (
            <g key={`part-${index}`}>
              <rect
                x={px(part.x)}
                y={py(part.y + part.height)}
                width={part.width * scale}
                height={part.height * scale}
                fill={part.tone === 'accent' ? '#edf1ff' : part.tone === 'solid' ? '#dfe6f2' : '#f2f5fa'}
                stroke="#7d8fa5"
                strokeWidth={1.4}
              />
              {part.label && part.width * scale > 40 && part.height * scale > 8 && (
                <text
                  x={px(part.x + part.width / 2)}
                  y={py(part.y + part.height / 2) + 3}
                  textAnchor="middle"
                  fontSize={9}
                  fill="#7d8fa5"
                >
                  {part.label}
                </text>
              )}
            </g>
          ))}
          {(figure.holes ?? []).map((hole, index) => (
            <g key={`hole-${index}`}>
              <circle
                cx={px(hole.cx)}
                cy={py(hole.cy)}
                r={hole.r * scale}
                fill="#fff"
                stroke="#87929d"
                strokeWidth={1.3}
              />
              {hole.label && (
                <text x={px(hole.cx)} y={py(hole.cy) + 3} textAnchor="middle" fontSize={8} fill="#87929d">
                  {hole.label}
                </text>
              )}
            </g>
          ))}

          {figure.centroid && (
            <motion.g key={`centroid-${focus.metric}`}>
              <motion.line
                x1={px(0)}
                x2={px(figure.width)}
                stroke={centroidActive || ixActive ? '#ff6b45' : '#b7c0cb'}
                strokeWidth={centroidActive || ixActive ? 2.2 : 1.2}
                strokeDasharray={centroidActive || ixActive ? undefined : '6 4'}
                initial={{ y1: py(0), y2: py(0), opacity: 0.3, pathLength: 0 }}
                animate={{
                  y1: py(figure.centroid.y),
                  y2: py(figure.centroid.y),
                  opacity: 1,
                  pathLength: centroidActive || ixActive ? progress : 1,
                }}
                transition={{
                  default: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
                  pathLength: { duration: 0.12, ease: 'linear' },
                }}
              />
              <motion.line
                y1={py(0)}
                y2={py(figure.height)}
                stroke={centroidActive || iyActive ? '#4f6df5' : '#b7c0cb'}
                strokeWidth={centroidActive || iyActive ? 2.2 : 1.2}
                strokeDasharray={centroidActive || iyActive ? undefined : '6 4'}
                initial={{ x1: px(0), x2: px(0), opacity: 0.3, pathLength: 0 }}
                animate={{
                  x1: px(figure.centroid.x),
                  x2: px(figure.centroid.x),
                  opacity: 1,
                  pathLength: centroidActive || iyActive ? progress : 1,
                }}
                transition={{
                  default: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
                  pathLength: { duration: 0.12, ease: 'linear' },
                }}
              />
              <motion.circle
                cx={px(figure.centroid.x)}
                cy={py(figure.centroid.y)}
                r={4}
                fill="#17202a"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.25, type: 'spring', stiffness: 260, damping: 18 }}
                style={{ transformOrigin: `${px(figure.centroid.x)}px ${py(figure.centroid.y)}px` }}
              />
              <text x={px(figure.centroid.x) + 8} y={py(figure.centroid.y) - 8} fontSize={9} fill="#17202a">
                C
              </text>
            </motion.g>
          )}
        </svg>
        <ValueLookup values={figure.values} focus={focus.metric} />
      </div>
      {figure.note && <p className={local('note')}>{figure.note}</p>}
    </div>
  )
}

function CubeView({
  figure,
  scene,
  focus: suppliedFocus,
  animationKey,
  progress = 1,
}: {
  figure: CubeFigure
  scene: SolutionScene
  focus?: Focus
  animationKey?: string
  progress?: number
}) {
  const focus = suppliedFocus ?? resolveFocus(scene, figure)
  const stressActive = focus.metric === 'stress' || focus.metric === 'constraints'
  const strainActive = focus.metric === 'strain'
  const compressed = strainActive || focus.metric === 'volume'

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg viewBox="0 0 460 300" role="img" aria-label="Element sześcienny z naprężeniami i odkształceniami">
          <motion.g
            stroke="#87929d"
            strokeWidth={1.6}
            fill="none"
            animate={{ scaleY: compressed ? 1 + (figure.strains?.z ?? 0) * 110 * progress : 1 }}
            transition={{ scaleY: { duration: 0.15, ease: 'linear' } }}
            style={{ transformOrigin: '225px 246px' }}
          >
            <rect x={160} y={116} width={130} height={130} fill="#f5f7fc" />
            <path d="M160 116 L200 82 L330 82 L290 116" fill="#edf1ff" />
            <path d="M290 116 L330 82 L330 212 L290 246" fill="#f5f7fc" />
          </motion.g>

          {figure.stresses.z != null && (
            <g stroke={stressActive ? '#ff6b45' : '#c9a79d'} fill={stressActive ? '#ff6b45' : '#c9a79d'}>
              <motion.line
                x1={250}
                y1={102}
                x2={250}
                y2={52}
                strokeWidth={2.6}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: progress }}
                transition={{ pathLength: { duration: 0.12, ease: 'linear' } }}
              />
              <path d="M244 60 L250 50 L256 60" fill="none" strokeWidth={2.6} />
              <text x={260} y={64} fontSize={11} stroke="none">
                σz = {formatNumber(figure.stresses.z)} MPa
              </text>
            </g>
          )}
          {figure.stresses.x != null && (
            <g stroke={stressActive ? '#4f6df5' : '#a9b7cc'} fill={stressActive ? '#4f6df5' : '#a9b7cc'}>
              <motion.line
                x1={242}
                y1={192}
                x2={154}
                y2={192}
                strokeWidth={2.4}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: progress }}
                transition={{ pathLength: { duration: 0.12, ease: 'linear' } }}
              />
              <path d="M164 186 L152 192 L164 198" fill="none" strokeWidth={2.4} />
              <text x={156} y={184} fontSize={10} stroke="none">
                σx = {formatNumber(figure.stresses.x)}
              </text>
            </g>
          )}
          {figure.stresses.y != null && (
            <g stroke={stressActive ? '#5bb98c' : '#a9c4b5'} fill={stressActive ? '#5bb98c' : '#a9c4b5'}>
              <motion.line
                x1={188}
                y1={224}
                x2={188}
                y2={148}
                strokeWidth={2.4}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: progress }}
                transition={{ pathLength: { duration: 0.12, ease: 'linear' } }}
              />
              <path d="M182 158 L188 146 L194 158" fill="none" strokeWidth={2.4} />
              <text x={196} y={156} fontSize={10} stroke="none">
                σy = {formatNumber(figure.stresses.y)}
              </text>
            </g>
          )}

          {strainActive && figure.strains?.z != null && (
            <text x={250} y={266} textAnchor="middle" fontSize={9} fill="#4f6df5">
              εz = {formatNumber(figure.strains.z)}
              {figure.strains.x != null ? ` · εx = ${formatNumber(figure.strains.x)}` : ''}
              {figure.strains.y != null ? ` · εy = ${formatNumber(figure.strains.y)}` : ''}
            </text>
          )}
        </svg>
        <ValueLookup values={figure.values} focus={focus.metric} />
      </div>
      {figure.note && <p className={local('note')}>{figure.note}</p>}
    </div>
  )
}

function RosetteView({
  figure,
  scene,
  focus: suppliedFocus,
  animationKey,
  progress = 1,
}: {
  figure: RosetteFigure
  scene: SolutionScene
  focus?: Focus
  animationKey?: string
  progress?: number
}) {
  const focus = suppliedFocus ?? resolveFocus(scene, figure)
  const principalActive = focus.metric === 'principal' || focus.metric === 'angle' || focus.metric === 'mohr'
  const centerX = 132
  const centerY = 148
  const radius = 78

  const mohrScale = figure.mohr
    ? 68 / Math.max(figure.mohr.radius, Math.abs(figure.mohr.center) + figure.mohr.radius, 1e-12)
    : 1
  const mohrCenterX = figure.mohr ? 350 + figure.mohr.center * mohrScale : 350
  const mohrRadius = figure.mohr ? figure.mohr.radius * mohrScale : 0

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg viewBox="0 0 460 300" role="img" aria-label="Rozeta tensometryczna i koło Mohra odkształceń">
          <circle cx={centerX} cy={centerY} r={radius} fill="#f5f7fc" stroke="#d3d9e0" strokeWidth={1.5} />
          {figure.gauges.map((gauge) => {
            const angle = (gauge.angle * Math.PI) / 180
            const endX = centerX + Math.cos(angle) * radius
            const endY = centerY - Math.sin(angle) * radius
            const active = focus.metric === 'gauges'
            return (
              <g key={gauge.label}>
                <motion.line
                  key={`gauge-${gauge.label}-${focus.metric}`}
                  x1={centerX}
                  y1={centerY}
                  x2={endX}
                  y2={endY}
                  stroke={active ? '#4f6df5' : '#87929d'}
                  strokeWidth={active ? 3 : 2}
                  initial={{ pathLength: 0, opacity: 0.4 }}
                  animate={{ pathLength: active ? progress : 1, opacity: 1 }}
                  transition={{ pathLength: { duration: 0.12, ease: 'linear' }, opacity: { duration: 0.3 } }}
                />
                <circle cx={endX} cy={endY} r={3.5} fill="#4f6df5" />
                <text
                  x={endX + 7}
                  y={endY + (Math.abs(gauge.angle) < 1 ? 4 : gauge.angle === 90 ? -6 : 0)}
                  fontSize={9}
                  fill="#4f6df5"
                >
                  {gauge.label}: {gauge.display}
                </text>
              </g>
            )
          })}
          {figure.mohr?.angle != null && (
            <motion.line
              key={`principal-${focus.metric}`}
              x1={centerX}
              y1={centerY}
              x2={centerX + Math.cos((-figure.mohr.angle * Math.PI) / 180) * radius}
              y2={centerY + Math.sin((-figure.mohr.angle * Math.PI) / 180) * radius}
              stroke="#ff6b45"
              strokeWidth={2}
              initial={{ pathLength: 0, opacity: 0.3 }}
              animate={{ pathLength: principalActive ? progress : 1, opacity: 1 }}
              transition={{ pathLength: { duration: 0.12, ease: 'linear' }, opacity: { duration: 0.3 } }}
            />
          )}
          <text x={centerX} y={252} textAnchor="middle" fontSize={9} fill="#87929d">
            rozeta 0° / 45° / 90°
          </text>

          {figure.mohr && (
            <g>
              <line x1={60} y1={centerY} x2={440} y2={centerY} stroke="#c9d0d9" strokeWidth={1} />
              <motion.circle
                key={`mohr-${animationKey}-${focus.metric}`}
                cx={mohrCenterX}
                cy={centerY}
                r={Math.abs(mohrRadius)}
                fill="none"
                stroke={principalActive ? '#ff6b45' : '#9aa7b5'}
                strokeWidth={principalActive ? 2.6 : 1.8}
                initial={{ pathLength: 0, opacity: 0.35 }}
                animate={{ pathLength: principalActive ? progress : 1, opacity: 1 }}
                transition={{ pathLength: { duration: 0.12, ease: 'linear' }, opacity: { duration: 0.3 } }}
              />
              <line
                x1={mohrCenterX - Math.abs(mohrRadius)}
                y1={centerY}
                x2={mohrCenterX + Math.abs(mohrRadius)}
                y2={centerY}
                stroke="#4f6df5"
                strokeWidth={2}
              />
              <motion.circle
                cx={350 + figure.mohr.left * mohrScale}
                cy={centerY}
                r={3.5}
                fill="#4f6df5"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.45, type: 'spring', stiffness: 260, damping: 18 }}
              />
              <motion.circle
                cx={350 + figure.mohr.right * mohrScale}
                cy={centerY}
                r={3.5}
                fill="#ff6b45"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.55, type: 'spring', stiffness: 260, damping: 18 }}
              />
              <text x={460} y={22} textAnchor="end" fontSize={9} fill="#87929d">
                koło Mohra
              </text>
            </g>
          )}
        </svg>
        <ValueLookup values={figure.values} focus={focus.metric} />
      </div>
      {figure.note && <p className={local('note')}>{figure.note}</p>}
    </div>
  )
}

export function SolutionFigureView({
  figure,
  scene,
  focus,
  animationKey,
  progress = 1,
}: {
  figure: SolutionFigure
  scene: SolutionScene
  focus?: Focus
  animationKey?: string
  progress?: number
}) {
  switch (figure.kind) {
    case 'axial':
      return <AxialView figure={figure} scene={scene} focus={focus} animationKey={animationKey} progress={progress} />
    case 'beam':
      return <BeamView figure={figure} scene={scene} focus={focus} animationKey={animationKey} progress={progress} />
    case 'section':
      return <SectionView figure={figure} scene={scene} focus={focus} animationKey={animationKey} progress={progress} />
    case 'cube':
      return <CubeView figure={figure} scene={scene} focus={focus} animationKey={animationKey} progress={progress} />
    case 'rosette':
      return <RosetteView figure={figure} scene={scene} focus={focus} animationKey={animationKey} progress={progress} />
    default:
      return null
  }
}
