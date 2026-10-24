import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const LOAD = '#ff6b45'
const GREEN = '#2e9e6b'
const BAD = '#d64545'
const MUTED = '#87929d'
const EDGE = '#68727e'
const INK = '#17202a'
const LIGHT = '#eef2f7'

const PX0 = 22
const PX1 = 238
const PY0 = 76
const PY1 = 232
const HX = 130
const HY = 154
const HR = 28

const SIGMA_NOM = 120
const K_T = 3
const SIGMA_MAX = SIGMA_NOM * K_T
const RE = 235
const N_NOM = RE / SIGMA_NOM
const N_LOC = RE / SIGMA_MAX

const MOHR_SCALE = 0.5
const MOHR_AXIS_X = 250
const MOHR_AXIS_Y = 150
const MOHS = (value: number) => MOHR_AXIS_X + value * MOHR_SCALE

const clamp01 = (value: number) => Math.max(0, Math.min(1, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}
const pl = (value: number, digits = 2) => value.toFixed(digits).replace('.', ',')

const PLOT_X0 = 250
const PLOT_X1 = 458
const PLOT_Y0 = 66
const PLOT_Y1 = 245
const plotY = (value: number) => PLOT_Y1 - (value / 400) * (PLOT_Y1 - PLOT_Y0)

function FieldLines() {
  const lines = [96, 110, 124, 138, 154, 170, 186, 200, 214]
  return (
    <g stroke={MUTED} strokeWidth={0.9} opacity={0.55}>
      {lines.map((y) => {
        const dy = Math.abs(y - HY)
        const halfChord = dy < HR ? Math.sqrt(HR * HR - dy * dy) : 0
        const gap = halfChord > 0 ? HX + halfChord + 3 : HX
        const gapL = halfChord > 0 ? HX - halfChord - 3 : HX
        return (
          <g key={y}>
            <line x1={PX0 + 3} y1={y} x2={gapL} y2={y} />
            <line x1={gap} y1={y} x2={PX1 - 3} y2={y} />
          </g>
        )
      })}
    </g>
  )
}

function HotSpot({ x, y, playing }: { x: number; y: number; playing: boolean }) {
  return (
    <motion.g
      animate={{ opacity: playing ? [0.55, 1, 0.55] : 1 }}
      transition={{ duration: 1.5, repeat: playing ? Infinity : 0, ease: 'easeInOut' }}
    >
      <circle cx={x} cy={y} r={9} fill={LOAD} fillOpacity={0.16} />
      <circle cx={x} cy={y} r={4} fill={LOAD} />
    </motion.g>
  )
}

function CompareBars({ progress }: { progress: number }) {
  const track = 200
  const perRe = track / 1.6
  const nomW = (SIGMA_NOM / RE) * perRe
  const locW = (SIGMA_MAX / RE) * perRe
  const boundary = perRe

  return (
    <g>
      <text x={250} y={72} fontSize={9.5} fontWeight={700} fill={INK}>
        wykorzystanie granicy R_e = 235 MPa
      </text>

      <text x={250} y={100} fontSize={8.5} fill={GREEN}>
        nominalnie: 120 MPa
      </text>
      <rect x={250} y={106} width={track} height={15} rx={7.5} fill="#edf1f5" />
      <motion.rect
        x={250}
        y={106}
        height={15}
        rx={7.5}
        fill={GREEN}
        fillOpacity={0.32}
        stroke={GREEN}
        strokeWidth={1.1}
        initial={false}
        animate={{ width: nomW * progress }}
        transition={{ duration: 0.12, ease: 'linear' }}
      />
      <text x={250 + nomW + 7} y={118} fontSize={8.5} fill={GREEN}>
        0,51 R_e
      </text>

      <text x={250} y={144} fontSize={8.5} fill={BAD}>
        lokalnie przy otworze: 360 MPa
      </text>
      <rect x={250} y={150} width={track} height={15} rx={7.5} fill="#edf1f5" />
      <motion.rect
        x={250}
        y={150}
        height={15}
        rx={7.5}
        fill={BAD}
        fillOpacity={0.3}
        stroke={BAD}
        strokeWidth={1.2}
        initial={false}
        animate={{ width: Math.min(track, locW * progress) }}
        transition={{ duration: 0.12, ease: 'linear' }}
      />
      <text x={450} y={146} textAnchor="end" fontSize={8.5} fill={BAD}>
        1,53 R_e
      </text>

      <line
        x1={250 + boundary}
        y1={96}
        x2={250 + boundary}
        y2={172}
        stroke={EDGE}
        strokeWidth={1.3}
        strokeDasharray="5 4"
      />
      <text x={250 + boundary} y={90} textAnchor="middle" fontSize={8} fill={EDGE}>
        R_e
      </text>

      <line x1={250} y1={190} x2={450} y2={190} stroke="#dde3ea" strokeWidth={1} />
      <text x={250} y={210} fontSize={9.5} fill={GREEN}>
        n_nom = 235/120 ≈ {pl(N_NOM)}
      </text>
      <text x={250} y={228} fontSize={9.5} fill={BAD}>
        n_lok = 235/360 ≈ {pl(N_LOC)}
      </text>
      <text x={250} y={250} fontSize={8.5} fill={BAD}>
        nominalny zapas nie opisuje strefy karbu
      </text>
    </g>
  )
}

function LocalSafety({ progress }: { progress: number }) {
  const track = 200
  const maxN = 2.5
  const marker = 250 + (Math.min(N_LOC, maxN) / maxN) * track
  const boundary = 250 + (1 / maxN) * track

  return (
    <g>
      <text x={250} y={78} fontSize={9.5} fontWeight={700} fill={INK}>
        lokalna ocena wytężenia
      </text>
      <text x={250} y={112} fontSize={11} fontWeight={700} fill={BAD}>
        n_lok = 235/360 ≈ {pl(N_LOC)}
      </text>
      <rect x={250} y={130} width={track} height={16} rx={8} fill="#edf1f5" />
      <motion.rect
        x={250}
        y={130}
        height={16}
        rx={8}
        fill={BAD}
        fillOpacity={0.28}
        stroke={BAD}
        strokeWidth={1.2}
        initial={false}
        animate={{ width: (Math.min(N_LOC, maxN) / maxN) * track * progress }}
        transition={{ duration: 0.12, ease: 'linear' }}
      />
      <line x1={boundary} y1={124} x2={boundary} y2={152} stroke={EDGE} strokeWidth={1.3} strokeDasharray="5 4" />
      <text x={boundary} y={118} textAnchor="middle" fontSize={8} fill={EDGE}>
        n = 1
      </text>
      <motion.circle
        cx={marker}
        cy={138}
        r={5}
        fill={BAD}
        animate={{ opacity: progress > 0.55 ? 1 : 0.35 }}
        transition={{ duration: 0.2 }}
      />

      <text x={250} y={176} fontSize={8.5} fill={BAD}>
        lokalne uplastycznienie przy otworze
      </text>
      <text x={250} y={194} fontSize={8.5} fill={MUTED}>
        przy obciążeniu cyklicznym inicjuje pęknięcie
      </text>
      <text x={250} y={212} fontSize={8.5} fill={MUTED}>
        zmęczeniowe, mimo nominalnego zapasu
      </text>
      <line x1={250} y1={228} x2={450} y2={228} stroke="#dde3ea" strokeWidth={1} />
      <text x={250} y={248} fontSize={8.5} fill={INK}>
        decyduje geometria i koncentracja naprężeń
      </text>
    </g>
  )
}

export function MohrInterpretationExample2Animation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const progress = playing ? smooth(sceneProgress) : 1

  const isModel = metric === 'model'
  const isField = metric === 'field'
  const isCircle = metric === 'circle'
  const isCompare = metric === 'compare'
  const isDecision = metric === 'decision'
  const showHotSpots = isField || isCircle || isCompare || isDecision

  const peak = SIGMA_NOM + (SIGMA_MAX - SIGMA_NOM) * progress
  const peakY = plotY(peak)
  const nominalY = plotY(SIGMA_NOM)
  const reY = plotY(RE)
  const holeLeft = 300
  const holeRight = 316
  const plotPath = `M ${PLOT_X0} ${nominalY} L 270 ${nominalY} C 282 ${nominalY} 290 ${peakY} ${holeLeft} ${peakY} L ${holeLeft} ${PLOT_Y1} L ${holeRight} ${PLOT_Y1} L ${holeRight} ${peakY} C 326 ${peakY} 334 ${nominalY} 346 ${nominalY} L ${PLOT_X1} ${nominalY}`

  const localRadius = 180 * MOHR_SCALE * progress
  const localCenter = MOHS(180)

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 480 300"
          role="img"
          aria-label="Blacha z otworem kołowym pod rozciąganiem. Animacja pokazuje koncentrację naprężeń przy otworze, lokalne koło Mohra i porównanie z granicą plastyczności."
        >
          <defs>
            <marker
              id="mohr2-load"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={LOAD} />
            </marker>
            <marker
              id="mohr2-edge"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={MUTED} />
            </marker>
            <clipPath id="mohr2-plate">
              <rect x={PX0} y={PY0} width={PX1 - PX0} height={PY1 - PY0} rx={4} />
            </clipPath>
          </defs>

          <text x={14} y={20} fontSize={10} fontWeight={700} fill={INK}>
            blacha z otworem · rozciąganie
          </text>
          <text x={14} y={34} fontSize={8.5} fill={MUTED}>
            σ_nom = 120 MPa · R_e = 235 MPa
          </text>
          <text x={14} y={48} fontSize={8.5} fill={MUTED}>
            otwór kołowy · k_t ≈ 3
          </text>

          <g>
            <rect
              x={PX0}
              y={PY0}
              width={PX1 - PX0}
              height={PY1 - PY0}
              rx={4}
              fill={LIGHT}
              stroke={EDGE}
              strokeWidth={1.4}
            />
            <g clipPath="url(#mohr2-plate)">
              {isModel || isField ? <FieldLines /> : null}
              {isField && (
                <g>
                  <motion.ellipse
                    cx={HX}
                    cy={HY}
                    rx={42}
                    ry={46}
                    fill="none"
                    stroke={LOAD}
                    strokeWidth={1.4}
                    initial={false}
                    animate={{ opacity: 0.22 * progress }}
                  />
                  <motion.ellipse
                    cx={HX}
                    cy={HY}
                    rx={58}
                    ry={62}
                    fill="none"
                    stroke={LOAD}
                    strokeWidth={1.2}
                    initial={false}
                    animate={{ opacity: 0.16 * progress }}
                  />
                  <motion.ellipse
                    cx={HX}
                    cy={HY}
                    rx={74}
                    ry={78}
                    fill="none"
                    stroke={LOAD}
                    strokeWidth={1}
                    initial={false}
                    animate={{ opacity: 0.1 * progress }}
                  />
                </g>
              )}
            </g>
            <circle cx={HX} cy={HY} r={HR} fill="#ffffff" stroke={EDGE} strokeWidth={1.4} />

            {isField && (
              <g>
                <line
                  x1={HX - 18}
                  y1={HY - HR}
                  x2={HX + 18}
                  y2={HY - HR}
                  stroke={LOAD}
                  strokeWidth={2}
                  markerEnd="url(#mohr2-load)"
                />
                <line
                  x1={HX + 18}
                  y1={HY + HR}
                  x2={HX - 18}
                  y2={HY + HR}
                  stroke={LOAD}
                  strokeWidth={2}
                  markerEnd="url(#mohr2-load)"
                />
              </g>
            )}

            {showHotSpots && (
              <g>
                <HotSpot x={HX} y={HY - HR} playing={playing} />
                <HotSpot x={HX} y={HY + HR} playing={playing} />
                <text x={HX + 12} y={HY - HR - 10} fontSize={8.5} fontWeight={700} fill={LOAD}>
                  σmax = 360 MPa
                </text>
              </g>
            )}

            {isDecision && (
              <g>
                <motion.ellipse
                  cx={HX}
                  cy={HY - HR}
                  rx={18}
                  ry={9}
                  fill={LOAD}
                  fillOpacity={0.28}
                  stroke={LOAD}
                  strokeWidth={1}
                  animate={{ opacity: playing ? [0.45, 0.9, 0.45] : 0.75 }}
                  transition={{ duration: 1.5, repeat: playing ? Infinity : 0, ease: 'easeInOut' }}
                />
                <motion.ellipse
                  cx={HX}
                  cy={HY + HR}
                  rx={18}
                  ry={9}
                  fill={LOAD}
                  fillOpacity={0.28}
                  stroke={LOAD}
                  strokeWidth={1}
                  animate={{ opacity: playing ? [0.45, 0.9, 0.45] : 0.75 }}
                  transition={{ duration: 1.5, repeat: playing ? Infinity : 0, ease: 'easeInOut' }}
                />
                <text x={HX + 26} y={HY - HR + 3} fontSize={8} fill={LOAD}>
                  strefa plastyczna
                </text>
              </g>
            )}

            <line x1={8} y1={HY} x2={PX0 - 2} y2={HY} stroke={LOAD} strokeWidth={2.2} markerEnd="url(#mohr2-load)" />
            <line x1={252} y1={HY} x2={PX1 + 2} y2={HY} stroke={LOAD} strokeWidth={2.2} markerEnd="url(#mohr2-load)" />
            <text x={(PX0 + PX1) / 2} y={PY0 - 12} textAnchor="middle" fontSize={9} fill={LOAD}>
              σ_nom = 120 MPa
            </text>
          </g>

          {isModel && (
            <g>
              <line x1={246} y1={MOHR_AXIS_Y} x2={460} y2={MOHR_AXIS_Y} stroke={MUTED} strokeWidth={1} />
              <line x1={MOHS(0)} y1={56} x2={MOHS(0)} y2={254} stroke={MUTED} strokeWidth={1} />
              <text x={458} y={MOHR_AXIS_Y - 7} textAnchor="end" fontSize={8.5} fill={MUTED}>
                σ [MPa]
              </text>
              <text x={MOHS(0) + 6} y={66} fontSize={8.5} fill={MUTED}>
                τ [MPa]
              </text>
              <circle
                cx={MOHS(60)}
                cy={MOHR_AXIS_Y}
                r={60 * MOHR_SCALE}
                fill="none"
                stroke={MUTED}
                strokeWidth={1.4}
                strokeDasharray="5 4"
              />
              <circle cx={MOHS(120)} cy={MOHR_AXIS_Y} r={3} fill={EDGE} />
              <text x={MOHS(120)} y={MOHR_AXIS_Y + 18} textAnchor="middle" fontSize={8.5} fill={EDGE}>
                σ = 120 MPa
              </text>
              <text x={340} y={82} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                nominalny stan jednoosiowy
              </text>
            </g>
          )}

          {isField && (
            <g>
              <text x={250} y={56} fontSize={9} fontWeight={700} fill={INK}>
                rozkład σ wzdłuż blachy
              </text>
              <line x1={PLOT_X0} y1={PLOT_Y1} x2={PLOT_X1} y2={PLOT_Y1} stroke={MUTED} strokeWidth={1} />
              <line x1={PLOT_X0} y1={PLOT_Y0} x2={PLOT_X0} y2={PLOT_Y1} stroke={MUTED} strokeWidth={1} />
              <line
                x1={PLOT_X0}
                y1={nominalY}
                x2={PLOT_X1}
                y2={nominalY}
                stroke={MUTED}
                strokeWidth={1}
                strokeDasharray="5 4"
              />
              <text x={PLOT_X0 + 4} y={nominalY - 5} fontSize={8} fill={MUTED}>
                120 MPa
              </text>
              <line x1={PLOT_X0} y1={reY} x2={PLOT_X1} y2={reY} stroke={GREEN} strokeWidth={1} strokeDasharray="5 4" />
              <text x={PLOT_X1 - 2} y={reY - 5} textAnchor="end" fontSize={8} fill={GREEN}>
                R_e = 235 MPa
              </text>
              <motion.path
                d={plotPath}
                fill="none"
                stroke={LOAD}
                strokeWidth={2.2}
                strokeLinejoin="round"
                initial={false}
                animate={{ opacity: 1 }}
              />
              <motion.circle
                cx={holeLeft}
                cy={peakY}
                r={4}
                fill={LOAD}
                animate={{ opacity: playing ? [0.55, 1, 0.55] : 1 }}
                transition={{ duration: 1.4, repeat: playing ? Infinity : 0, ease: 'easeInOut' }}
              />
              <text x={holeLeft - 4} y={peakY - 9} textAnchor="end" fontSize={8.5} fontWeight={700} fill={LOAD}>
                {pl(peak, 0)} MPa
              </text>
              <text x={PLOT_X1} y={PLOT_Y1 + 14} textAnchor="end" fontSize={8} fill={MUTED}>
                położenie w blasze
              </text>
              <text x={PLOT_X0 - 4} y={PLOT_Y0 - 2} textAnchor="end" fontSize={8} fill={MUTED}>
                σ
              </text>
            </g>
          )}

          {isCircle && (
            <g>
              <line x1={246} y1={MOHR_AXIS_Y} x2={460} y2={MOHR_AXIS_Y} stroke={MUTED} strokeWidth={1} />
              <line x1={MOHS(0)} y1={56} x2={MOHS(0)} y2={254} stroke={MUTED} strokeWidth={1} />
              <text x={458} y={MOHR_AXIS_Y - 7} textAnchor="end" fontSize={8.5} fill={MUTED}>
                σ [MPa]
              </text>
              <text x={MOHS(0) + 6} y={66} fontSize={8.5} fill={MUTED}>
                τ [MPa]
              </text>

              <circle
                cx={MOHS(60)}
                cy={MOHR_AXIS_Y}
                r={60 * MOHR_SCALE}
                fill="none"
                stroke={MUTED}
                strokeWidth={1.2}
                strokeDasharray="5 4"
              />
              <text x={MOHS(60)} y={MOHR_AXIS_Y - 42} textAnchor="middle" fontSize={8} fill={MUTED}>
                nominalny
              </text>

              <circle
                cx={localCenter}
                cy={MOHR_AXIS_Y}
                r={localRadius}
                fill={LOAD}
                fillOpacity={0.06}
                stroke={LOAD}
                strokeWidth={2}
              />
              <circle cx={localCenter} cy={MOHR_AXIS_Y} r={2.6} fill={EDGE} />
              <line
                x1={localCenter}
                y1={MOHR_AXIS_Y}
                x2={MOHS(360)}
                y2={MOHR_AXIS_Y}
                stroke={ACCENT}
                strokeWidth={1.8}
              />
              <line
                x1={localCenter}
                y1={MOHR_AXIS_Y}
                x2={localCenter}
                y2={MOHR_AXIS_Y - localRadius}
                stroke={LOAD}
                strokeWidth={1.8}
              />
              <line
                x1={MOHS(360)}
                y1={MOHR_AXIS_Y - 5}
                x2={MOHS(360)}
                y2={MOHR_AXIS_Y + 5}
                stroke={EDGE}
                strokeWidth={1.4}
              />
              <text x={MOHS(360)} y={MOHR_AXIS_Y + 18} textAnchor="middle" fontSize={8.5} fill={EDGE}>
                σ1 = 360
              </text>
              <text x={localCenter} y={MOHR_AXIS_Y - 7} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                σavg = 180
              </text>
              <text x={localCenter + 6} y={MOHR_AXIS_Y - localRadius + 12} fontSize={8.5} fill={LOAD}>
                τmax = 180
              </text>
              <text x={MOHS(0) + 5} y={MOHR_AXIS_Y + 16} fontSize={8} fill={MUTED}>
                σ2 = σ3 = 0
              </text>
              <text x={250} y={82} fontSize={8.5} fill={MUTED}>
                lokalny stan jednoosiowy: σ1 = 360 MPa
              </text>
            </g>
          )}

          {isCompare && <CompareBars progress={progress} />}
          {isDecision && <LocalSafety progress={progress} />}

          <text x={466} y={292} textAnchor="end" fontSize={8} fill={MUTED}>
            {isModel
              ? 'model i dane'
              : isField
                ? 'pole naprężeń przy otworze'
                : isCircle
                  ? 'lokalne koło Mohra'
                  : isCompare
                    ? 'porównanie z R_e'
                    : 'wniosek inżynierski'}
          </text>
        </svg>
      </div>
    </div>
  )
}
