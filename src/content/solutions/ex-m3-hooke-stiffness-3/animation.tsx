import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const LOAD = '#ff6b45'
const MUTED = '#87929d'
const SUPPORT = '#68727e'
const OK = '#2f7d5b'
const BAD = '#d64545'
const INK = '#17202a'

const CX = 175
const TOP = 60
const BASE = 142
const BOTTOM = TOP + BASE
const PX_PER_MM = 38
const LIMIT = 1.5
const LIMIT_Y = BOTTOM + LIMIT * PX_PER_MM
const AREA_TRIAL = 250
const AREA_MIN = 400
const AREA_SENS = 600

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}
const pl = (value: number) => value.toFixed(2).replace('.', ',')

function Support({ cx, half }: { cx: number; half: number }) {
  return (
    <g stroke={SUPPORT} strokeWidth={2} strokeLinecap="round">
      <line x1={cx - half - 18} y1={TOP} x2={cx + half + 18} y2={TOP} />
      {Array.from({ length: 7 }, (_, index) => {
        const x = cx - half - 12 + index * ((half * 2 + 24) / 6)
        return <line key={index} x1={x} y1={TOP} x2={x - 7} y2={TOP - 11} strokeWidth={1.4} />
      })}
    </g>
  )
}

function DeltaBracket({
  x,
  from,
  to,
  label,
  color,
  opacity,
}: {
  x: number
  from: number
  to: number
  label: string
  color: string
  opacity: number
}) {
  return (
    <motion.g initial={false} animate={{ opacity }} transition={{ duration: 0.3 }}>
      <line x1={x} y1={from} x2={x} y2={to} stroke={color} strokeWidth={1.3} />
      <line x1={x - 5} y1={from} x2={x + 5} y2={from} stroke={color} strokeWidth={1.3} />
      <line x1={x - 5} y1={to} x2={x + 5} y2={to} stroke={color} strokeWidth={1.3} />
      <text x={x + 7} y={(from + to) / 2 + 3} fontSize={8.5} fontWeight={700} fill={color}>
        {label}
      </text>
    </motion.g>
  )
}

export function HookeStiffness3Animation({ scene, index, playing, sceneProgress }: SolutionAnimationProps) {
  const p = playing ? clamp01(sceneProgress) : 1
  const metric = scene.focus?.metric ?? 'N'
  const loadT = index === 0 ? smooth(p / 0.65) : 1
  const morph = index === 1 ? (playing ? smooth((p - 0.08) / 0.72) : 1) : 0
  const sens = index === 4 ? (playing ? smooth((p - 0.08) / 0.72) : 1) : 0
  const sectionT = index === 2 ? (playing ? smooth((p - 0.05) / 0.6) : 1) : 1
  const checkT = index === 3 ? (playing ? smooth((p - 0.1) / 0.6) : 1) : 1

  const area =
    index === 1
      ? AREA_TRIAL + (AREA_MIN - AREA_TRIAL) * morph
      : index === 4
        ? AREA_MIN + (AREA_SENS - AREA_MIN) * sens
        : index === 0
          ? AREA_TRIAL
          : AREA_MIN
  const limitMm = index === 4 ? LIMIT - 0.5 * sens : LIMIT
  const delta = index === 0 ? 0 : index === 1 ? 2.4 - 0.9 * morph : index === 4 ? LIMIT - 0.5 * sens : LIMIT

  const halfWidth = 25.5 * Math.sqrt(area / AREA_TRIAL)
  const leftEdge = CX - halfWidth
  const rightEdge = CX + halfWidth
  const limitY = BOTTOM + limitMm * PX_PER_MM
  const bottom = BOTTOM + delta * PX_PER_MM
  const over = delta > limitMm + 0.02
  const color = index === 0 ? ACCENT : over ? BAD : OK

  const circleCx = 330
  const circleCy = 145
  const circleR = 46

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 350"
          role="img"
          aria-label="Stalowy pręt o długości 3 m rozciągany siłą 40 kN; animacja doboru minimalnego pola przekroju 400 mm² przy dopuszczalnym wydłużeniu 1,5 mm"
        >
          <Support cx={CX} half={halfWidth} />

          <g fill={MUTED} fontSize={9}>
            <text x={14} y={86}>
              N = 40 kN
            </text>
            <text x={14} y={100}>
              L = 3 m
            </text>
            <text x={14} y={114}>
              E = 200 GPa
            </text>
            <text x={14} y={128}>
              ΔL_dop = {index === 4 ? pl(limitMm) : '1,5'} mm
            </text>
          </g>

          <g stroke={MUTED} strokeWidth={1.2} fill="none">
            <line x1={116} y1={TOP} x2={116} y2={BOTTOM} />
            <line x1={111} y1={TOP} x2={121} y2={TOP} />
            <line x1={111} y1={BOTTOM} x2={121} y2={BOTTOM} />
            <text
              x={108}
              y={TOP + BASE / 2}
              textAnchor="middle"
              fontSize={9}
              fill={MUTED}
              stroke="none"
              transform={`rotate(-90 108 ${TOP + BASE / 2})`}
            >
              L = 3 m
            </text>
          </g>

          <line
            x1={leftEdge - 8}
            y1={BOTTOM}
            x2={rightEdge + 8}
            y2={BOTTOM}
            stroke={MUTED}
            strokeWidth={1.1}
            strokeDasharray="4 4"
            opacity={0.65}
          />

          <motion.rect
            x={leftEdge}
            y={TOP}
            width={halfWidth * 2}
            height={bottom - TOP}
            rx={4}
            fill={color}
            initial={false}
            animate={{
              x: leftEdge,
              width: halfWidth * 2,
              height: bottom - TOP,
              fill: color,
              stroke: color,
              fillOpacity: metric === 'A' || metric === 'σ' || metric === 'ΔL' ? 0.2 : 0.14,
              strokeWidth: metric === 'A' || metric === 'σ' || metric === 'ΔL' ? 2.6 : 2,
            }}
            transition={{ duration: 0.12, ease: 'linear' }}
          />

          <text x={CX} y={TOP + 26} textAnchor="middle" fontSize={9.5} fontWeight={700} fill={color}>
            {index === 0 ? 'A = ?' : `A = ${Math.round(area)} mm²`}
          </text>
          <text x={CX} y={TOP + 40} textAnchor="middle" fontSize={8.5} fill={MUTED}>
            E = 200 GPa
          </text>

          <line x1={38} y1={limitY} x2={448} y2={limitY} stroke={MUTED} strokeWidth={1.2} strokeDasharray="6 4" />
          <text x={448} y={limitY - 6} textAnchor="end" fontSize={8.5} fill={MUTED}>
            ΔL_dop = {pl(limitMm)} mm
          </text>

          {index >= 1 && (
            <>
              <line x1={310} y1={BOTTOM} x2={310} y2={limitY} stroke={MUTED} strokeWidth={1} />
              <line x1={305} y1={BOTTOM} x2={315} y2={BOTTOM} stroke={MUTED} strokeWidth={1} />
              <line x1={305} y1={limitY} x2={315} y2={limitY} stroke={MUTED} strokeWidth={1} />
              <text
                x={302}
                y={(BOTTOM + limitY) / 2}
                textAnchor="middle"
                fontSize={8}
                fill={MUTED}
                transform={`rotate(-90 302 ${(BOTTOM + limitY) / 2})`}
              >
                limit
              </text>
              <DeltaBracket
                x={rightEdge + 18}
                from={BOTTOM}
                to={bottom}
                label={`ΔL = ${pl(delta)} mm`}
                color={color}
                opacity={index === 1 ? 0.35 + 0.65 * morph : 1}
              />
            </>
          )}

          {index === 1 && (
            <motion.g initial={false} animate={{ opacity: 1 }}>
              <text x={220} y={160} fontSize={9} fontWeight={700} fill={over ? BAD : OK}>
                {over ? 'przekrój zbyt mały' : '✓ ΔL = ΔL_dop'}
              </text>
              <text x={220} y={174} fontSize={8.5} fill={MUTED}>
                zwiększamy A do 400 mm²
              </text>
            </motion.g>
          )}

          {index === 2 && (
            <motion.g initial={false} animate={{ opacity: 1 }}>
              <motion.circle
                cx={circleCx}
                cy={circleCy}
                r={circleR * sectionT}
                fill={ACCENT}
                fillOpacity={0.13}
                stroke={ACCENT}
                strokeWidth={2.2}
              />
              <motion.line
                x1={circleCx - circleR * sectionT}
                y1={circleCy}
                x2={circleCx + circleR * sectionT}
                y2={circleCy}
                stroke={ACCENT}
                strokeWidth={1.3}
              />
              <motion.line
                x1={circleCx - circleR * sectionT}
                y1={circleCy - 5}
                x2={circleCx - circleR * sectionT}
                y2={circleCy + 5}
                stroke={ACCENT}
                strokeWidth={1.3}
              />
              <motion.line
                x1={circleCx + circleR * sectionT}
                y1={circleCy - 5}
                x2={circleCx + circleR * sectionT}
                y2={circleCy + 5}
                stroke={ACCENT}
                strokeWidth={1.3}
              />
              <text x={circleCx} y={circleCy + circleR + 20} textAnchor="middle" fontSize={9.5} fill={ACCENT}>
                d ≈ 22,6 mm
              </text>
              <text
                x={circleCx}
                y={circleCy + circleR + 35}
                textAnchor="middle"
                fontSize={9}
                fontWeight={700}
                fill={INK}
              >
                A_min = 400 mm²
              </text>
            </motion.g>
          )}

          {index === 3 && (
            <>
              <motion.g initial={false} animate={{ opacity: checkT }} transition={{ duration: 0.25 }}>
                <line
                  x1={CX - halfWidth - 10}
                  y1={TOP + 88}
                  x2={CX + halfWidth + 10}
                  y2={TOP + 88}
                  stroke={OK}
                  strokeWidth={1.3}
                  strokeDasharray="3 3"
                />
                {Array.from({ length: 5 }, (_, arrow) => {
                  const x = CX - halfWidth + 8 + arrow * ((halfWidth * 2 - 16) / 4)
                  return (
                    <g key={arrow} stroke={OK} fill={OK}>
                      <line x1={x} y1={TOP + 94} x2={x} y2={TOP + 112} strokeWidth={1.8} />
                      <path d={`M${x - 3.5} ${TOP + 107} L${x} ${TOP + 113} L${x + 3.5} ${TOP + 107}`} fill="none" />
                    </g>
                  )
                })}
              </motion.g>
              <text x={rightEdge + 22} y={TOP + 72} fontSize={9.5} fontWeight={700} fill={OK}>
                σ = 100 MPa
              </text>
              <text x={rightEdge + 22} y={TOP + 86} fontSize={8.5} fill={MUTED}>
                ε = 0,0005
              </text>
              <text x={rightEdge + 22} y={TOP + 100} fontSize={8.5} fill={MUTED}>
                ΔL = 1,5 mm
              </text>

              <text x={250} y={316} fontSize={8.5} fill={MUTED}>
                σ [MPa]
              </text>
              <line x1={250} y1={328} x2={430} y2={328} stroke={MUTED} strokeWidth={1.2} />
              <motion.rect
                x={250}
                y={323}
                height={8}
                fill={OK}
                fillOpacity={0.7}
                initial={false}
                animate={{ width: (180 * 100) / 250 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              />
              <line
                x1={250 + (180 * 235) / 250}
                y1={318}
                x2={250 + (180 * 235) / 250}
                y2={334}
                stroke={OK}
                strokeWidth={1.4}
                strokeDasharray="3 3"
              />
              <text x={250 + (180 * 100) / 250} y={344} textAnchor="middle" fontSize={8} fill={OK}>
                100
              </text>
              <text x={250 + (180 * 235) / 250} y={344} textAnchor="middle" fontSize={8} fill={OK}>
                235
              </text>
            </>
          )}

          {index === 4 && (
            <motion.g initial={false} animate={{ opacity: 1 }}>
              <text x={14} y={278} fontSize={9} fontWeight={700} fill={OK}>
                ΔL_dop: 1,5 → 1,0 mm
              </text>
              <text x={14} y={294} fontSize={8.5} fill={MUTED}>
                A: 400 → 600 mm²
              </text>
              <text x={14} y={310} fontSize={8.5} fill={MUTED}>
                ΔL: 1,5 → 1,0 mm
              </text>
            </motion.g>
          )}

          <motion.g initial={false} animate={{ opacity: loadT }} transition={{ duration: 0.25 }}>
            <g stroke={LOAD} fill={LOAD}>
              <line
                x1={CX}
                y1={(index === 0 ? BOTTOM : bottom) + 7}
                x2={CX}
                y2={(index === 0 ? BOTTOM : bottom) + 34}
                strokeWidth={2.3}
              />
              <path
                d={`M${CX - 5} ${(index === 0 ? BOTTOM : bottom) + 26} L${CX} ${(index === 0 ? BOTTOM : bottom) + 35} L${CX + 5} ${
                  (index === 0 ? BOTTOM : bottom) + 26
                }`}
                fill="none"
                strokeWidth={2.3}
              />
            </g>
            <text x={CX + 9} y={(index === 0 ? BOTTOM : bottom) + 27} fontSize={9.5} fill={LOAD}>
              N = 40 kN
            </text>
          </motion.g>

          <text x={14} y={340} fontSize={8} fill={MUTED}>
            {index === 0 ? 'pole przekroju nie jest jeszcze znane' : 'wydłużenie pokazano w powiększeniu'}
          </text>
        </svg>
      </div>
    </div>
  )
}
