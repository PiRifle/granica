import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { formatNumber, local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const WEB = '#ff8a5c'
const BOTTOM = '#5bb98c'
const HOLE = '#d64545'
const AXIS = '#a970dd'
const MUTED = '#87929d'
const EDGE = '#68727e'
const INK = '#17202a'
const GRID = '#d7dde5'

const SCALE = 0.5
const X0 = 40
const Y0 = 290
const SEC_W = 300 * SCALE
const XC = X0 + SEC_W / 2
const YC = Y0 - 215.385587 * SCALE
const HOLE_R = 15 * SCALE
const CHART_X = 246
const CHART_W = 190
const CENTROID_Y = 215.385587

const PARTS = [
  {
    id: 'g',
    short: 'g',
    label: 'pas górny',
    x: 0,
    y: 100,
    w: 300,
    h: 300,
    area: 90000,
    yc: 250,
    xc: 150,
    ownIx: 675000000,
    ad2Ix: 107834182.209,
    ownIy: 675000000,
    ad2Iy: 0,
    color: ACCENT,
  },
  {
    id: 's',
    short: 's',
    label: 'środnik',
    x: 135,
    y: 50,
    w: 30,
    h: 50,
    area: 1500,
    yc: 75,
    xc: 150,
    ownIx: 312500,
    ad2Ix: 29562169.6,
    ownIy: 112500,
    ad2Iy: 0,
    color: WEB,
  },
  {
    id: 'd',
    short: 'd',
    label: 'pas dolny',
    x: 0,
    y: 0,
    w: 300,
    h: 50,
    area: 15000,
    yc: 25,
    xc: 150,
    ownIx: 3125000,
    ad2Ix: 543700076.657,
    ownIy: 112500000,
    ad2Iy: 0,
    color: BOTTOM,
  },
] as const

const HOLES = [
  { cx: 50, cy: 250, r: 15 },
  { cx: 250, cy: 250, r: 15 },
] as const

const HOLE_OWN = 79521.564
const HOLE_AD2_IX = 1693855.373
const HOLE_AD2_IY = 14137166.941
const HOLE_TERM_IX = HOLE_OWN + HOLE_AD2_IX
const HOLE_TERM_IY = HOLE_OWN + HOLE_AD2_IY
const HOLE_AREA_TOTAL = 1413.716694
const SUM_IX_PARTS = PARTS.reduce((sum, part) => sum + part.ownIx + part.ad2Ix, 0)
const SUM_IY_PARTS = PARTS.reduce((sum, part) => sum + part.ownIy + part.ad2Iy, 0)
const SUM_IX = SUM_IX_PARTS - HOLE_TERM_IX
const SUM_IY = SUM_IY_PARTS - HOLE_TERM_IY

const clamp01 = (value: number) => Math.max(0, Math.min(1, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}
const sx = (value: number) => X0 + value * SCALE
const sy = (value: number) => Y0 - value * SCALE
const sw = (value: number) => value * SCALE
const sh = (value: number) => value * SCALE
const pl = (value: number, digits = 1) => value.toFixed(digits).replace('.', ',')
const chartValue = (value: number) => {
  const scaled = value / 1e6
  return `${scaled.toFixed(scaled < 10 ? 2 : 1).replace('.', ',')}·10⁶`
}
const finalValue = (value: number) => {
  if (value >= 1e9) return `${(value / 1e9).toFixed(5).replace('.', ',')}·10⁹`
  return `${(value / 1e8).toFixed(4).replace('.', ',')}·10⁸`
}

function SectionDrawing({
  reveal = 1,
  holesReveal = 1,
  activeId,
  showDimensions = false,
  showCentroids = false,
  axisMode = 'bottom',
  axisY = YC,
  subtraction = false,
}: {
  reveal?: number
  holesReveal?: number
  activeId?: string
  showDimensions?: boolean
  showCentroids?: boolean
  axisMode?: 'bottom' | 'central' | 'moving' | 'none'
  axisY?: number
  subtraction?: boolean
}) {
  const partReveal = (index: number) => smooth(clamp01((reveal - index * 0.13) / 0.4))
  const holeRadius = HOLE_R * smooth(holesReveal)
  const top = sy(400)

  return (
    <g>
      {PARTS.map((part, index) => {
        const progress = partReveal(index)
        const active = activeId === part.id
        return (
          <g key={part.id} opacity={0.4 + 0.6 * progress}>
            <rect
              x={sx(part.x)}
              y={sy(part.y + part.h)}
              width={sw(part.w)}
              height={sh(part.h)}
              rx={2}
              fill={part.color}
              fillOpacity={active ? 0.32 : 0.14}
              stroke={part.color}
              strokeWidth={active ? 2.3 : 1.2}
            />
            {showDimensions && part.id === 'g' && (
              <text x={sx(150)} y={sy(250) + 3} textAnchor="middle" fontSize={8} fill={part.color}>
                pas górny
              </text>
            )}
            {showDimensions && part.id === 's' && (
              <text x={sx(165) + 5} y={sy(75) + 3} fontSize={7.5} fill={part.color}>
                środnik
              </text>
            )}
            {showDimensions && part.id === 'd' && (
              <text x={sx(150)} y={sy(25) + 3} textAnchor="middle" fontSize={8} fill={part.color}>
                pas dolny
              </text>
            )}
          </g>
        )
      })}

      {HOLES.map((hole, index) => (
        <g key={`hole-${index}`}>
          <circle
            cx={sx(hole.cx)}
            cy={sy(hole.cy)}
            r={holeRadius}
            fill="#fff"
            stroke={subtraction ? HOLE : EDGE}
            strokeWidth={subtraction ? 1.8 : 1.1}
            strokeDasharray={subtraction ? '4 3' : undefined}
          />
          {subtraction && holeRadius > 1 && (
            <>
              <text x={sx(hole.cx)} y={sy(hole.cy) + 3} textAnchor="middle" fontSize={8} fontWeight={700} fill={HOLE}>
                −
              </text>
              <circle
                cx={sx(hole.cx)}
                cy={sy(hole.cy)}
                r={HOLE_R + 4}
                fill="none"
                stroke={HOLE}
                strokeWidth={1}
                strokeDasharray="3 3"
              />
            </>
          )}
        </g>
      ))}

      {showCentroids &&
        PARTS.map((part) => {
          const active = activeId === part.id
          return (
            <g key={`centroid-${part.id}`}>
              <circle
                cx={sx(part.xc)}
                cy={sy(part.yc)}
                r={active ? 4.2 : 2.8}
                fill={part.color}
                stroke="#fff"
                strokeWidth={1}
              />
              <text x={sx(part.xc) + 6} y={sy(part.yc) - 5} fontSize={7.5} fontWeight={600} fill={part.color}>
                {part.short}
              </text>
            </g>
          )
        })}

      {showDimensions && (
        <g stroke={MUTED} fill={MUTED}>
          <line x1={X0} y1={top - 18} x2={X0 + SEC_W} y2={top - 18} strokeWidth={1} />
          <line x1={X0} y1={top - 24} x2={X0} y2={top - 12} strokeWidth={1} />
          <line x1={X0 + SEC_W} y1={top - 24} x2={X0 + SEC_W} y2={top - 12} strokeWidth={1} />
          <text x={XC} y={top - 24} textAnchor="middle" fontSize={8.5} stroke="none">
            a = 300 mm
          </text>

          <line x1={22} y1={Y0} x2={22} y2={top} strokeWidth={1} />
          <line x1={16} y1={Y0} x2={28} y2={Y0} strokeWidth={1} />
          <line x1={16} y1={top} x2={28} y2={top} strokeWidth={1} />
          <text
            transform={`translate(14 ${(Y0 + top) / 2}) rotate(-90)`}
            textAnchor="middle"
            fontSize={8.5}
            stroke="none"
          >
            h = 400 mm
          </text>

          <line x1={X0 + SEC_W + 18} y1={sy(400)} x2={X0 + SEC_W + 18} y2={sy(100)} strokeWidth={1} />
          <line x1={X0 + SEC_W + 12} y1={sy(400)} x2={X0 + SEC_W + 24} y2={sy(400)} strokeWidth={1} />
          <line x1={X0 + SEC_W + 12} y1={sy(100)} x2={X0 + SEC_W + 24} y2={sy(100)} strokeWidth={1} />
          <text x={X0 + SEC_W + 24} y={sy(250)} fontSize={8} stroke="none">
            b = 300
          </text>

          <line x1={X0 + SEC_W + 18} y1={sy(50)} x2={X0 + SEC_W + 18} y2={Y0} strokeWidth={1} />
          <line x1={X0 + SEC_W + 12} y1={sy(50)} x2={X0 + SEC_W + 24} y2={sy(50)} strokeWidth={1} />
          <line x1={X0 + SEC_W + 12} y1={Y0} x2={X0 + SEC_W + 24} y2={Y0} strokeWidth={1} />
          <text x={X0 + SEC_W + 24} y={sy(25)} fontSize={8} stroke="none">
            e = 50
          </text>

          <line x1={sx(135)} y1={236} x2={sx(165)} y2={236} strokeWidth={1} />
          <line x1={sx(135)} y1={232} x2={sx(135)} y2={240} strokeWidth={1} />
          <line x1={sx(165)} y1={232} x2={sx(165)} y2={240} strokeWidth={1} />
          <text x={sx(150)} y={230} textAnchor="middle" fontSize={7.5} stroke="none">
            c = 30
          </text>
        </g>
      )}

      {showDimensions && (
        <g>
          <text x={sx(50)} y={sy(250) - 12} textAnchor="middle" fontSize={7.5} fill={HOLE}>
            ∅30
          </text>
          <text x={XC + 26} y={top - 4} fontSize={7} fill={MUTED}>
            oś symetrii
          </text>
        </g>
      )}

      {axisMode !== 'none' && (
        <g>
          <line x1={XC} y1={top - 10} x2={XC} y2={Y0 + 16} stroke={MUTED} strokeWidth={1} strokeDasharray="5 4" />
          <text x={XC + 5} y={top - 14} fontSize={8.5} fontWeight={600} fill={MUTED}>
            y
          </text>
        </g>
      )}

      {axisMode === 'bottom' && (
        <g>
          <line x1={X0 - 16} y1={Y0} x2={X0 + SEC_W + 16} y2={Y0} stroke={INK} strokeWidth={1.4} />
          <text x={X0 + SEC_W + 20} y={Y0 + 4} fontSize={8.5} fontWeight={600} fill={INK}>
            x
          </text>
        </g>
      )}

      {(axisMode === 'central' || axisMode === 'moving') && (
        <g>
          <line
            x1={X0 - 16}
            y1={axisY}
            x2={X0 + SEC_W + 16}
            y2={axisY}
            stroke={AXIS}
            strokeWidth={1.9}
            strokeDasharray={axisMode === 'moving' ? '6 4' : undefined}
          />
          <text x={X0 + SEC_W + 20} y={axisY + 4} fontSize={8.5} fontWeight={600} fill={AXIS}>
            {axisMode === 'moving' ? 'x' : 'x_C'}
          </text>
        </g>
      )}
    </g>
  )
}

type ContributionRow = {
  id: string
  label: string
  own: number
  ad2: number
  color: string
  negative?: boolean
}

const IX_ROWS: ContributionRow[] = [
  { id: 'g', label: 'pas górny', own: PARTS[0].ownIx, ad2: PARTS[0].ad2Ix, color: PARTS[0].color },
  { id: 's', label: 'środnik', own: PARTS[1].ownIx, ad2: PARTS[1].ad2Ix, color: PARTS[1].color },
  { id: 'd', label: 'pas dolny', own: PARTS[2].ownIx, ad2: PARTS[2].ad2Ix, color: PARTS[2].color },
  { id: 'h', label: 'otwory', own: HOLE_OWN, ad2: HOLE_AD2_IX, color: HOLE, negative: true },
]

const IY_ROWS: ContributionRow[] = [
  { id: 'g', label: 'pas górny', own: PARTS[0].ownIy, ad2: PARTS[0].ad2Iy, color: PARTS[0].color },
  { id: 's', label: 'środnik', own: PARTS[1].ownIy, ad2: PARTS[1].ad2Iy, color: PARTS[1].color },
  { id: 'd', label: 'pas dolny', own: PARTS[2].ownIy, ad2: PARTS[2].ad2Iy, color: PARTS[2].color },
  { id: 'h', label: 'otwory', own: HOLE_OWN, ad2: HOLE_AD2_IY, color: HOLE, negative: true },
]

function ContributionChart({ mode, reveal, activeIndex }: { mode: 'Ix' | 'Iy'; reveal: number; activeIndex: number }) {
  const rows = mode === 'Ix' ? IX_ROWS : IY_ROWS
  const maximum = mode === 'Ix' ? SUM_IX_PARTS : SUM_IY_PARTS
  const scale = CHART_W / maximum

  return (
    <g>
      <text x={CHART_X} y={64} fontSize={9} fontWeight={700} fill={INK}>
        udział w {mode === 'Ix' ? 'I_x' : 'I_y'}
      </text>
      <text x={CHART_X} y={76} fontSize={7.5} fill={MUTED}>
        ciemny: bh³/12, jasny: A·d²
      </text>
      {rows.map((row, index) => {
        const rowProgress = smooth(clamp01((reveal - index * 0.14) / 0.4))
        const ownWidth = row.own * scale * rowProgress
        const shiftWidth = row.ad2 * scale * rowProgress
        const displayWidth = Math.max(1.2, ownWidth) + (shiftWidth > 0 ? Math.max(1, shiftWidth) : 0)
        const y = 92 + index * 40
        const active = activeIndex === index
        return (
          <g key={row.id}>
            {active && (
              <rect
                x={CHART_X - 6}
                y={y - 14}
                width={CHART_W + 12}
                height={28}
                rx={5}
                fill={row.color}
                fillOpacity={0.08}
              />
            )}
            <text x={CHART_X} y={y - 4} fontSize={8.5} fontWeight={active ? 700 : 500} fill={active ? INK : MUTED}>
              {row.label}
            </text>
            <rect x={CHART_X} y={y} width={CHART_W} height={9} rx={4.5} fill="#eef1f4" stroke={GRID} strokeWidth={1} />
            <rect
              x={CHART_X}
              y={y}
              width={ownWidth > 0 ? Math.max(1.2, ownWidth) : 0}
              height={9}
              rx={4.5}
              fill={row.color}
              fillOpacity={0.8}
            />
            {shiftWidth > 0 && (
              <rect
                x={CHART_X + Math.max(1.2, ownWidth)}
                y={y}
                width={Math.max(1, shiftWidth)}
                height={9}
                rx={4.5}
                fill={row.color}
                fillOpacity={0.35}
              />
            )}
            <text
              x={CHART_X + displayWidth + 6}
              y={y + 8}
              fontSize={8}
              fill={row.negative ? HOLE : row.color}
              opacity={rowProgress}
            >
              {row.negative ? '−' : ''}
              {chartValue(row.own + row.ad2)}
            </text>
          </g>
        )
      })}
    </g>
  )
}

const IX_SUM_ROWS = [
  { id: 'g', label: 'pas górny', value: PARTS[0].ownIx + PARTS[0].ad2Ix, color: PARTS[0].color },
  { id: 's', label: 'środnik', value: PARTS[1].ownIx + PARTS[1].ad2Ix, color: PARTS[1].color },
  { id: 'd', label: 'pas dolny', value: PARTS[2].ownIx + PARTS[2].ad2Ix, color: PARTS[2].color },
]

const IY_SUM_ROWS = [
  { id: 'g', label: 'pas górny', value: PARTS[0].ownIy + PARTS[0].ad2Iy, color: PARTS[0].color },
  { id: 's', label: 'środnik', value: PARTS[1].ownIy + PARTS[1].ad2Iy, color: PARTS[1].color },
  { id: 'd', label: 'pas dolny', value: PARTS[2].ownIy + PARTS[2].ad2Iy, color: PARTS[2].color },
]

function SumChart({ mode, progress }: { mode: 'Ix' | 'Iy'; progress: number }) {
  const rows = mode === 'Ix' ? IX_SUM_ROWS : IY_SUM_ROWS
  const positive = mode === 'Ix' ? SUM_IX_PARTS : SUM_IY_PARTS
  const hole = mode === 'Ix' ? HOLE_TERM_IX : HOLE_TERM_IY
  const final = mode === 'Ix' ? SUM_IX : SUM_IY
  const scale = CHART_W / positive
  const reveal = [
    smooth(clamp01(progress / 0.22)),
    smooth(clamp01((progress - 0.16) / 0.22)),
    smooth(clamp01((progress - 0.38) / 0.22)),
    smooth(clamp01((progress - 0.62) / 0.18)),
  ]
  let cursor = 0
  const segments = rows.map((row, index) => {
    const x = CHART_X + cursor
    const width = row.value * scale * reveal[index]
    cursor += width
    return { ...row, x, width }
  })
  const finalX = CHART_X + final * scale
  const holeWidth = hole * scale * reveal[3]
  const finalReveal = smooth(clamp01((progress - 0.52) / 0.36))

  return (
    <g>
      <text x={CHART_X} y={64} fontSize={9} fontWeight={700} fill={INK}>
        suma momentów
      </text>
      <text x={CHART_X} y={76} fontSize={7.5} fill={MUTED}>
        części dodatnie, na końcu ubytek otworów
      </text>
      <rect x={CHART_X} y={102} width={CHART_W} height={18} rx={9} fill="#eef1f4" stroke={GRID} strokeWidth={1} />
      {segments.map((segment) => (
        <rect
          key={segment.id}
          x={segment.x}
          y={102}
          width={segment.width > 0 ? Math.max(1, segment.width) : 0}
          height={18}
          rx={4}
          fill={segment.color}
          fillOpacity={0.72}
        />
      ))}
      {holeWidth > 0.01 && (
        <rect
          x={finalX}
          y={102}
          width={Math.max(1.4, holeWidth)}
          height={18}
          rx={3}
          fill={HOLE}
          fillOpacity={0.55}
          stroke={HOLE}
          strokeWidth={1}
          strokeDasharray="3 2"
        />
      )}
      <g opacity={finalReveal}>
        <line x1={finalX} y1={94} x2={finalX} y2={130} stroke={INK} strokeWidth={1.2} strokeDasharray="4 3" />
        <text x={finalX} y={86} textAnchor="middle" fontSize={8.5} fontWeight={700} fill={INK}>
          {mode === 'Ix' ? 'I_x' : 'I_y'} = {finalValue(final)} mm⁴
        </text>
      </g>
      <text x={CHART_X} y={142} fontSize={7.5} fill={MUTED} opacity={reveal[3]}>
        otwory: −{chartValue(hole)} mm⁴
      </text>
      <text x={CHART_X} y={158} fontSize={7.5} fill={MUTED} opacity={finalReveal}>
        wynik po odjęciu: {finalValue(final)} mm⁴
      </text>
      <line x1={finalX} y1={170} x2={finalX} y2={186} stroke={AXIS} strokeWidth={1.2} strokeDasharray="3 3" />
      <text x={CHART_X} y={202} fontSize={8} fill={INK}>
        oś centralna przechodzi przez y_C = 215,386 mm
      </text>
    </g>
  )
}

function BeamInterpretation({ progress }: { progress: number }) {
  const sag = 24 * smooth(progress)
  const beamLeft = 54
  const beamRight = 446
  const beamY = 96
  const beamPath = `M ${beamLeft} ${beamY} Q 250 ${beamY + sag * 2} ${beamRight} ${beamY}`
  const sectionY = 158
  const sectionScale = 0.15
  const neutralInGroup = (400 - CENTROID_Y) * sectionScale

  return (
    <g>
      <text x={18} y={22} fontSize={9} fontWeight={700} fill={INK}>
        zginanie belki względem osi x
      </text>
      <text x={18} y={36} fontSize={8} fill={MUTED}>
        większe I_x oznacza mniejsze naprężenie i mniejsze ugięcie
      </text>

      <line x1={beamLeft} y1={beamY} x2={beamRight} y2={beamY} stroke={GRID} strokeWidth={1} strokeDasharray="4 4" />
      <motion.path
        d={beamPath}
        fill="none"
        stroke={ACCENT}
        strokeWidth={4}
        strokeLinecap="round"
        initial={false}
        animate={{ d: beamPath }}
        transition={{ duration: 0.1, ease: 'linear' }}
      />
      <path
        d={`M${beamLeft - 10} ${beamY + 16} L${beamLeft} ${beamY + 2} L${beamLeft + 10} ${beamY + 16} Z`}
        fill={EDGE}
      />
      <path
        d={`M${beamRight - 10} ${beamY + 16} L${beamRight} ${beamY + 2} L${beamRight + 10} ${beamY + 16} Z`}
        fill={EDGE}
      />
      <text x={beamLeft} y={beamY + 30} textAnchor="middle" fontSize={8} fill={EDGE}>
        A
      </text>
      <text x={beamRight} y={beamY + 30} textAnchor="middle" fontSize={8} fill={EDGE}>
        B
      </text>

      <line x1={250} y1={beamY - 38} x2={250} y2={beamY - 8} stroke={WEB} strokeWidth={2.4} />
      <path d={`M245 ${beamY - 18} L250 ${beamY - 8} L255 ${beamY - 18}`} fill="none" stroke={WEB} strokeWidth={2.4} />
      <text x={250} y={beamY - 44} textAnchor="middle" fontSize={8.5} fill={WEB}>
        P
      </text>
      <line x1={250} y1={beamY} x2={250} y2={beamY + sag} stroke={ACCENT} strokeWidth={1} strokeDasharray="3 3" />
      <text x={256} y={beamY + sag + 3} fontSize={8} fill={ACCENT}>
        ugięcie f
      </text>

      <g transform={`translate(338 ${sectionY})`}>
        <rect x={0} y={0} width={36} height={45} fill="none" stroke={EDGE} strokeWidth={1.2} />
        <rect x={14} y={45} width={8} height={7.5} fill="none" stroke={EDGE} strokeWidth={1.2} />
        <rect x={0} y={52.5} width={36} height={7.5} fill="none" stroke={EDGE} strokeWidth={1.2} />
        <circle cx={6} cy={22.5} r={1.8} fill="#fff" stroke={EDGE} strokeWidth={0.9} />
        <circle cx={30} cy={22.5} r={1.8} fill="#fff" stroke={EDGE} strokeWidth={0.9} />
        <line
          x1={-10}
          y1={neutralInGroup}
          x2={46}
          y2={neutralInGroup}
          stroke={AXIS}
          strokeWidth={1.5}
          strokeDasharray="4 3"
        />
        {[6, 14, 22, 30, 38, 46, 54].map((offset, index) => {
          const length = 2 + Math.abs(offset - neutralInGroup) * 0.22
          const color = offset < neutralInGroup ? ACCENT : BOTTOM
          return (
            <g key={`stress-${index}`}>
              <line x1={-4} y1={offset} x2={-4 - length} y2={offset} stroke={color} strokeWidth={1.1} />
              <line x1={40} y1={offset} x2={40 + length} y2={offset} stroke={color} strokeWidth={1.1} />
            </g>
          )
        })}
      </g>
      <text x={338} y={238} textAnchor="middle" fontSize={7.5} fill={MUTED}>
        rozkład σ w przekroju
      </text>
      <text x={338} y={252} textAnchor="middle" fontSize={8} fill={INK}>
        σ = M·y / I_x
      </text>
      <text x={338} y={268} textAnchor="middle" fontSize={8} fill={INK}>
        sztywność: E·I_x
      </text>
      <text x={250} y={300} textAnchor="middle" fontSize={8.5} fontWeight={600} fill={ACCENT}>
        I_x &gt; I_y, więc zginanie względem osi x jest korzystniejsze
      </text>
    </g>
  )
}

function AreaChart({ reveal }: { reveal: number }) {
  const rows = [
    { id: 'g', label: 'pas górny', value: PARTS[0].area, color: PARTS[0].color, negative: false },
    { id: 's', label: 'środnik', value: PARTS[1].area, color: PARTS[1].color, negative: false },
    { id: 'd', label: 'pas dolny', value: PARTS[2].area, color: PARTS[2].color, negative: false },
    { id: 'h', label: 'otwory', value: -HOLE_AREA_TOTAL, color: HOLE, negative: true },
  ]
  const max = Math.sqrt(PARTS[0].area)

  return (
    <g>
      <text x={CHART_X} y={64} fontSize={9} fontWeight={700} fill={INK}>
        pola części
      </text>
      <text x={CHART_X} y={76} fontSize={7.5} fill={MUTED}>
        szerokość ∝ √A
      </text>
      {rows.map((row, index) => {
        const magnitude = Math.abs(row.value)
        const width = (Math.sqrt(magnitude) / max) * CHART_W * smooth(clamp01((reveal - index * 0.12) / 0.4))
        const y = 92 + index * 34
        return (
          <g key={row.id}>
            <text x={CHART_X} y={y - 4} fontSize={8.5} fill={MUTED}>
              {row.label}
            </text>
            <rect x={CHART_X} y={y} width={CHART_W} height={8} rx={4} fill="#eef1f4" stroke={GRID} strokeWidth={1} />
            <rect
              x={CHART_X}
              y={y}
              width={width}
              height={8}
              rx={4}
              fill={row.color}
              fillOpacity={row.negative ? 0.55 : 0.7}
              stroke={row.negative ? HOLE : row.color}
              strokeWidth={row.negative ? 1 : 0}
              strokeDasharray={row.negative ? '3 2' : undefined}
            />
            <text x={CHART_X + width + 6} y={y + 7} fontSize={8} fill={row.negative ? HOLE : row.color}>
              {row.negative ? '−' : ''}
              {formatNumber(magnitude)}
            </text>
          </g>
        )
      })}
      <text x={CHART_X} y={232} fontSize={8} fill={INK}>
        A netto = A_g + A_s + A_d − A_o
      </text>
      <text x={CHART_X} y={248} fontSize={9} fontWeight={700} fill={INK}>
        A = 105 086,28 mm²
      </text>
    </g>
  )
}

function CentroidAxis({ progress }: { progress: number }) {
  const axisX = 300
  const top = sy(400)
  const bottom = Y0
  const markerY = bottom - (bottom - YC) * smooth(progress)
  const dots = [
    { part: PARTS[0], y: sy(250), r: 8 },
    { part: PARTS[1], y: sy(75), r: 4.5 },
    { part: PARTS[2], y: sy(25), r: 6 },
  ]

  return (
    <g>
      <text x={CHART_X} y={64} fontSize={9} fontWeight={700} fill={INK}>
        położenie środka ciężkości
      </text>
      <text x={CHART_X} y={76} fontSize={7.5} fill={MUTED}>
        y mierzone od dolnej krawędzi
      </text>
      <line x1={axisX} y1={top - 12} x2={axisX} y2={bottom + 8} stroke={GRID} strokeWidth={1.2} />
      {[0, 100, 200, 300, 400].map((value) => (
        <g key={value}>
          <line x1={axisX - 5} y1={sy(value)} x2={axisX + 5} y2={sy(value)} stroke={MUTED} strokeWidth={1} />
          <text x={axisX + 9} y={sy(value) + 3} fontSize={7.5} fill={MUTED}>
            {value}
          </text>
        </g>
      ))}
      {dots.map((dot) => (
        <circle key={dot.part.id} cx={axisX - 18} cy={dot.y} r={dot.r} fill={dot.part.color} fillOpacity={0.75} />
      ))}
      <line
        x1={CHART_X}
        y1={markerY}
        x2={axisX + 60}
        y2={markerY}
        stroke={AXIS}
        strokeWidth={1.8}
        strokeDasharray="5 4"
      />
      <circle cx={axisX - 18} cy={markerY} r={5} fill={AXIS} stroke="#fff" strokeWidth={1} />
      <text x={CHART_X} y={markerY - 6} fontSize={8.5} fontWeight={700} fill={AXIS}>
        y_C = 215,386 mm
      </text>
      <text x={CHART_X} y={270} fontSize={8} fill={INK}>
        wynik jest średnią ważoną pól
      </text>
      <text x={CHART_X} y={286} fontSize={7.5} fill={MUTED}>
        duże pole pasa górnego przesuwa C w górę
      </text>
    </g>
  )
}

export function SectionCentroidMomentsAnimation({ scene, index, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const raw = playing ? clamp01(sceneProgress) : 1
  const progress = playing ? smooth(raw) : 1
  const pulse = playing ? 0.74 + 0.26 * Math.sin((sceneProgress * 2.4 + index * 0.35) * Math.PI * 2) : 1

  const isModel = metric === 'model'
  const isParts = metric === 'section'
  const isCentroid = metric === 'centroid'
  const isIx = metric === 'Ix'
  const isIxSum = metric === 'Ix-sum'
  const isIy = metric === 'Iy'
  const isIySum = metric === 'Iy-sum'
  const isInterpret = metric === 'interpret'

  const activeIndex = playing && (isParts || isIx || isIy) ? Math.min(3, Math.floor(raw * 4)) : -1
  const activePart = activeIndex >= 0 && activeIndex < 3 ? PARTS[activeIndex] : null
  const activeHole = activeIndex === 3
  const axisY = isCentroid ? Y0 - (Y0 - YC) * progress : YC

  if (isInterpret) {
    return (
      <div className={local('figure')}>
        <div className={local('figure-canvas')}>
          <svg
            viewBox="0 0 500 320"
            role="img"
            aria-label="Belka zginana względem poziomej osi centralnej; przekrój z osią obojętną i rozkładem naprężeń"
          >
            <BeamInterpretation progress={progress} />
          </svg>
        </div>
      </div>
    )
  }

  const targetY = activeHole ? 250 : (activePart?.yc ?? 250)
  const ixTargetX = activeHole ? sx(50) : activePart?.id === 's' ? XC : X0 + SEC_W - 16
  const ixValue = Math.abs(targetY - CENTROID_Y)
  const yAxes = sy(targetY)
  const yCentral = sy(YC)

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 500 320"
          role="img"
          aria-label="Przekrój złożony z pasa górnego, środnika i pasa dolnego oraz dwoma otworami. Animacja pokazuje pola części, środek ciężkości, momenty bezwładności I_x i I_y oraz zastosowanie w zginaniu belki."
        >
          <SectionDrawing
            reveal={isModel || isParts ? progress : 1}
            holesReveal={isModel || isParts ? smooth(clamp01((raw - (isModel ? 0.52 : 0.58)) / 0.28)) : 1}
            activeId={activePart?.id}
            showDimensions={isModel}
            showCentroids={isCentroid || isIy}
            axisMode={isModel || isParts ? 'bottom' : isCentroid ? 'moving' : 'central'}
            axisY={axisY}
            subtraction={isParts}
          />

          {isModel && (
            <g>
              <text x={CHART_X} y={106} fontSize={9} fontWeight={700} fill={INK}>
                model i dane
              </text>
              <text x={CHART_X} y={126} fontSize={8.5} fill={MUTED}>
                pas górny: 300 × 300
              </text>
              <text x={CHART_X} y={142} fontSize={8.5} fill={MUTED}>
                środnik: 30 × 50
              </text>
              <text x={CHART_X} y={158} fontSize={8.5} fill={MUTED}>
                pas dolny: 300 × 50
              </text>
              <text x={CHART_X} y={174} fontSize={8.5} fill={MUTED}>
                otwory: 2 × ∅30
              </text>
              <text x={CHART_X} y={196} fontSize={8.5} fontWeight={600} fill={AXIS}>
                x_C = 0 z symetrii
              </text>
              <text x={CHART_X} y={212} fontSize={8} fill={MUTED}>
                oś y zaczepiona na dolnej krawędzi
              </text>
            </g>
          )}

          {isParts && <AreaChart reveal={progress} />}

          {isCentroid && <CentroidAxis progress={progress} />}

          {(isIx || isIy) && (
            <ContributionChart mode={isIx ? 'Ix' : 'Iy'} reveal={progress} activeIndex={activeIndex} />
          )}

          {isIxSum && <SumChart mode="Ix" progress={progress} />}
          {isIySum && <SumChart mode="Iy" progress={progress} />}

          {isIx && (activePart || activeHole) && (
            <g>
              <line
                x1={ixTargetX}
                y1={yAxes}
                x2={ixTargetX}
                y2={yCentral}
                stroke={WEB}
                strokeWidth={1.5}
                strokeDasharray="4 3"
              />
              <line x1={ixTargetX - 5} y1={yAxes} x2={ixTargetX + 5} y2={yAxes} stroke={WEB} strokeWidth={1.2} />
              <line x1={ixTargetX - 5} y1={yCentral} x2={ixTargetX + 5} y2={yCentral} stroke={WEB} strokeWidth={1.2} />
              <text x={ixTargetX + 8} y={(yAxes + yCentral) / 2 + 3} fontSize={8} fontWeight={600} fill={WEB}>
                d = {pl(ixValue)} mm
              </text>
            </g>
          )}

          {isIy && (
            <g>
              <line
                x1={XC}
                y1={sy(250)}
                x2={sx(50)}
                y2={sy(250)}
                stroke={ACCENT}
                strokeWidth={1.4}
                strokeDasharray="4 3"
              />
              <line
                x1={XC}
                y1={sy(250)}
                x2={sx(250)}
                y2={sy(250)}
                stroke={ACCENT}
                strokeWidth={1.4}
                strokeDasharray="4 3"
              />
              <line x1={sx(50)} y1={sy(250) - 4} x2={sx(50)} y2={sy(250) + 4} stroke={ACCENT} strokeWidth={1.2} />
              <line x1={sx(250)} y1={sy(250) - 4} x2={sx(250)} y2={sy(250) + 4} stroke={ACCENT} strokeWidth={1.2} />
              <text
                x={(XC + sx(50)) / 2}
                y={sy(250) + 14}
                textAnchor="middle"
                fontSize={8}
                fontWeight={600}
                fill={ACCENT}
              >
                100 mm
              </text>
              <text
                x={(XC + sx(250)) / 2}
                y={sy(250) + 14}
                textAnchor="middle"
                fontSize={8}
                fontWeight={600}
                fill={ACCENT}
              >
                100 mm
              </text>
              <text x={198} y={225} fontSize={7.5} fill={MUTED}>
                d = 0 dla prostokątów
              </text>
            </g>
          )}

          {(isIx || isIy) && (
            <motion.text
              x={CHART_X}
              y={286}
              fontSize={8}
              fill={isIx ? WEB : ACCENT}
              initial={false}
              animate={{ opacity: playing ? [0.5, 1, 0.5] : 1 }}
              transition={{ duration: 1.6, repeat: playing ? Infinity : 0, ease: 'easeInOut' }}
            >
              {isIx ? 'd od osi x decyduje o A·d²' : 'boczne położenie otworów wnosi A·d²'}
            </motion.text>
          )}

          {(isIxSum || isIySum) && (
            <motion.text
              x={250}
              y={300}
              textAnchor="middle"
              fontSize={8.5}
              fontWeight={600}
              fill={pulse > 0.5 ? INK : MUTED}
            >
              {isIxSum ? 'I_x jest większy, bo materiał leży daleko od osi x' : 'I_y jest mniejszy przez wkład otworów'}
            </motion.text>
          )}
        </svg>
      </div>
    </div>
  )
}
