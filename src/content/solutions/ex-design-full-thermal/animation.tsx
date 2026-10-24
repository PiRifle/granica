import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const LOAD = '#ff6b45'
const MUTED = '#87929d'
const SUPPORT = '#68727e'
const INK = '#17202a'
const COMP = '#a970dd'
const TENSION = '#2f8d6a'
const BAD = '#d64545'

const X0 = 72
const XR = 388
const XC = (X0 + XR) / 2
const BAR_Y = 132
const BAR_H = 34
const FREE_EACH = 24
const FREE_TOTAL = FREE_EACH * 2
const U_PX = 7

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}

function HDim({ y, from, to, label, color }: { y: number; from: number; to: number; label: string; color: string }) {
  const mid = (from + to) / 2
  return (
    <g stroke={color} fill={color}>
      <line x1={from} y1={y} x2={to} y2={y} strokeWidth={1.2} />
      <line x1={from} y1={y - 4} x2={from} y2={y + 4} strokeWidth={1.2} />
      <line x1={to} y1={y - 4} x2={to} y2={y + 4} strokeWidth={1.2} />
      <text x={mid} y={y - 6} textAnchor="middle" fontSize={9} stroke="none">
        {label}
      </text>
    </g>
  )
}

function FixedSupport({ x, opacity = 1 }: { x: number; opacity?: number }) {
  const direction = x < XC ? -1 : 1
  return (
    <motion.g
      stroke={SUPPORT}
      strokeWidth={2}
      strokeLinecap="round"
      initial={false}
      animate={{ opacity }}
      transition={{ duration: 0.25 }}
    >
      <line x1={x} y1={BAR_Y - 22} x2={x} y2={BAR_Y + BAR_H + 22} />
      {Array.from({ length: 6 }, (_, tick) => {
        const y = BAR_Y - 16 + tick * 12
        return <line key={tick} x1={x} y1={y} x2={x + direction * 11} y2={y + 7} strokeWidth={1.3} />
      })}
    </motion.g>
  )
}

function AxialArrows({
  from,
  to,
  color,
  kind,
  opacity,
  marker,
}: {
  from: number
  to: number
  color: string
  kind: 'inward' | 'outward'
  opacity: number
  marker: string
}) {
  const y = BAR_Y + BAR_H / 2
  if (kind === 'inward') {
    return (
      <motion.g stroke={color} fill={color} initial={false} animate={{ opacity }} transition={{ duration: 0.2 }}>
        <line x1={from + 8} y1={y} x2={from + 30} y2={y} strokeWidth={2.2} markerEnd={marker} />
        <line x1={to - 8} y1={y} x2={to - 30} y2={y} strokeWidth={2.2} markerEnd={marker} />
      </motion.g>
    )
  }
  return (
    <motion.g stroke={color} fill={color} initial={false} animate={{ opacity }} transition={{ duration: 0.2 }}>
      <line x1={from + 30} y1={y} x2={from + 8} y2={y} strokeWidth={2.2} markerEnd={marker} />
      <line x1={to - 30} y1={y} x2={to - 8} y2={y} strokeWidth={2.2} markerEnd={marker} />
    </motion.g>
  )
}

function HeatWaves({ from, to, opacity, playing }: { from: number; to: number; opacity: number; playing: boolean }) {
  const span = Math.max(24, to - from - 36)
  return (
    <motion.g
      stroke={LOAD}
      strokeWidth={1.8}
      fill="none"
      initial={false}
      animate={{ opacity }}
      transition={{ duration: 0.3 }}
    >
      {Array.from({ length: 6 }, (_, wave) => {
        const x = from + 18 + (wave * span) / 5
        return (
          <motion.path
            key={wave}
            d={`M ${x} ${BAR_Y - 8} q 7 -13 0 -23`}
            animate={playing ? { opacity: [0.35, 1, 0.35], y: [0, -3, 0] } : { opacity: 0.8 }}
            transition={{ duration: 1.7, repeat: playing ? Infinity : 0, delay: wave * 0.14 }}
          />
        )
      })}
    </motion.g>
  )
}

function LoadArrow({ x }: { x: number }) {
  return (
    <g stroke={LOAD} fill={LOAD}>
      <line
        x1={x - 26}
        y1={BAR_Y - 46}
        x2={x + 26}
        y2={BAR_Y - 46}
        strokeWidth={2.2}
        markerEnd="url(#thermal-full-load)"
      />
      <line x1={x} y1={BAR_Y - 46} x2={x} y2={BAR_Y - 8} stroke={MUTED} strokeWidth={1} strokeDasharray="3 3" />
      <text x={x + 32} y={BAR_Y - 42} fontSize={10} stroke="none">
        P = 20 kN
      </text>
    </g>
  )
}

function StressCheck({ progress, playing }: { progress: number; playing: boolean }) {
  const xOf = (value: number) => 84 + (value / 180) * 340
  const rows = [
    { label: 'σ₁', value: 86.7, text: '−86,7 MPa', color: ACCENT, y: 128 },
    { label: 'σ₂', value: 153.3, text: '−153,3 MPa', color: COMP, y: 180 },
  ]

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 300"
          role="img"
          aria-label="Kontrola naprężeń obu odcinków pręta. Odcinek CB ma naprężenie 153,3 MPa, bliżej granicy 160 MPa niż odcinek AC."
        >
          <text x={16} y={28} fontSize={10} fontWeight={700} fill={INK}>
            Kontrola wytrzymałości
          </text>
          <text x={16} y={46} fontSize={9} fill={MUTED}>
            |σ| względem k_c = 160 MPa
          </text>

          <line x1={84} y1={86} x2={84} y2={218} stroke="#c9d0d9" strokeWidth={1} />
          <line x1={84} y1={218} x2={424} y2={218} stroke="#c9d0d9" strokeWidth={1} />

          {[0, 60, 120, 180].map((tick) => (
            <g key={tick}>
              <line x1={xOf(tick)} y1={214} x2={xOf(tick)} y2={222} stroke={MUTED} strokeWidth={1} />
              <text x={xOf(tick)} y={232} textAnchor="middle" fontSize={8} fill={MUTED}>
                {tick}
              </text>
            </g>
          ))}
          <text x={424} y={248} textAnchor="end" fontSize={8.5} fill={MUTED}>
            |σ| [MPa]
          </text>

          <line x1={xOf(160)} y1={78} x2={xOf(160)} y2={218} stroke={BAD} strokeWidth={1.4} strokeDasharray="5 4" />
          <text x={xOf(160)} y={70} textAnchor="middle" fontSize={9} fontWeight={700} fill={BAD}>
            k_c = 160
          </text>

          {rows.map((row) => (
            <g key={row.label}>
              <text x={72} y={row.y + 7} textAnchor="end" fontSize={11} fontWeight={700} fill={row.color}>
                {row.label}
              </text>
              <motion.rect
                x={84}
                y={row.y}
                height={18}
                rx={4}
                fill={row.color}
                stroke={row.color}
                strokeWidth={2.4}
                initial={false}
                animate={{
                  width: Math.max(1, xOf(row.value) - 84),
                  fillOpacity: 0.22 + 0.16 * progress,
                  opacity: playing ? 0.65 + 0.35 * progress : 1,
                }}
                transition={{ duration: 0.2 }}
              />
              <text x={xOf(row.value) + 8} y={row.y + 13} fontSize={9} fontWeight={700} fill={row.color}>
                {row.text}
              </text>
            </g>
          ))}

          <text x={16} y={268} fontSize={9} fill={COMP}>
            decyduje odcinek CB: 153,3 ≤ 160 MPa
          </text>
          <text x={16} y={284} fontSize={8.5} fill={MUTED}>
            zapas względem k_c wynosi tylko około 4,2%
          </text>
        </svg>
      </div>
    </div>
  )
}

export function ThermalMechanicalBarAnimation({ scene, index, playing, sceneProgress }: SolutionAnimationProps) {
  const mode = scene.focus?.metric ?? 'model'
  const progress = playing ? smooth(sceneProgress) : 1
  const isModel = mode === 'model'
  const isFree = mode === 'free'
  const isRestraint = mode === 'restraint'
  const isMechanical = mode === 'mechanical'
  const isCombined = mode === 'combined'
  const isCheck = mode === 'check'
  const compressed = isRestraint || isCombined
  const thermal = isModel || isFree || isRestraint || isCombined
  const heat = isModel ? 0 : thermal ? (playing ? smooth(clamp01(sceneProgress * 1.7)) : 1) : 0
  const pulse = playing ? 0.68 + 0.32 * Math.sin((sceneProgress * 3 + index) * Math.PI * 2) : 1

  if (isCheck) return <StressCheck progress={progress} playing={playing} />

  const shifted = isMechanical || isCombined
  const c = isFree ? XC + FREE_EACH * progress : shifted ? XC + U_PX * progress : XC
  const rightEnd = isFree ? XR + FREE_TOTAL * progress : XR
  const leftWidth = c - X0
  const rightWidth = rightEnd - c
  const leftColor = isMechanical ? TENSION : isFree || isModel ? ACCENT : COMP
  const rightColor = isMechanical ? COMP : isFree || isModel ? ACCENT : COMP
  const showP = isModel || isMechanical || isCombined
  const heatLabel = isMechanical || isModel ? 'ΔT = 0' : 'ΔT = 50 K'
  const segmentText = (x1: number, x2: number, label: string) => (
    <text x={(x1 + x2) / 2} y={BAR_Y + BAR_H / 2 + 4} textAnchor="middle" fontSize={10} fontWeight={700} fill={INK}>
      {label}
    </text>
  )

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 300"
          role="img"
          aria-label="Pręt A-C-B utwierdzony na obu końcach, z siłą P w punkcie C. Animacja pokazuje swobodne wydłużenie termiczne, zablokowanie, samo obciążenie mechaniczne i sumę obu wpływów."
        >
          <defs>
            <marker
              id="thermal-full-comp"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={COMP} />
            </marker>
            <marker
              id="thermal-full-tension"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={TENSION} />
            </marker>
            <marker
              id="thermal-full-load"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={LOAD} />
            </marker>
          </defs>

          <FixedSupport x={X0} />
          <FixedSupport x={XR} opacity={isFree ? 0.28 : 1} />

          <rect
            x={X0}
            y={BAR_Y}
            width={XR - X0}
            height={BAR_H}
            rx={4}
            fill="none"
            stroke={MUTED}
            strokeWidth={1.2}
            strokeDasharray="4 4"
          />

          {(isRestraint || isCombined) && (
            <rect
              x={X0}
              y={BAR_Y}
              width={XR - X0 + FREE_TOTAL}
              height={BAR_H}
              rx={4}
              fill="none"
              stroke={MUTED}
              strokeWidth={1.1}
              strokeDasharray="5 5"
              opacity={0.7}
            />
          )}

          <motion.rect
            x={X0}
            y={BAR_Y}
            height={BAR_H}
            rx={4}
            initial={false}
            animate={{ width: Math.max(1, leftWidth) }}
            transition={{ duration: 0.12, ease: 'linear' }}
            fill={leftColor}
            fillOpacity={compressed ? 0.14 + 0.12 * progress : 0.16}
            stroke={leftColor}
            strokeWidth={isCombined ? 2.4 : 2}
          />
          <motion.rect
            x={c}
            y={BAR_Y}
            height={BAR_H}
            rx={4}
            initial={false}
            animate={{ x: c, width: Math.max(1, rightWidth) }}
            transition={{ duration: 0.12, ease: 'linear' }}
            fill={rightColor}
            fillOpacity={isCombined ? 0.22 : compressed ? 0.16 : 0.16}
            stroke={rightColor}
            strokeWidth={isCombined ? 2.8 : 2}
          />

          <line x1={c} y1={BAR_Y - 4} x2={c} y2={BAR_Y + BAR_H + 4} stroke={INK} strokeWidth={1.1} opacity={0.5} />
          {segmentText(X0, c, 'AC')}
          {segmentText(c, rightEnd, 'CB')}

          <HeatWaves from={X0} to={rightEnd} opacity={heat} playing={playing} />
          {showP && <LoadArrow x={c} />}

          {isFree && (
            <>
              <HDim y={BAR_Y + BAR_H + 40} from={XC} to={c} label="ΔL_T = 0,6 mm" color={LOAD} />
              <HDim y={BAR_Y + BAR_H + 40} from={XR} to={rightEnd} label="ΔL_T = 0,6 mm" color={LOAD} />
              <text x={X0} y={BAR_Y + BAR_H + 66} fontSize={10} fontWeight={700} fill={ACCENT}>
                swobodnie: σ = 0, razem 1,2 mm
              </text>
            </>
          )}

          {isRestraint && (
            <>
              <AxialArrows
                from={X0}
                to={c}
                color={COMP}
                kind="inward"
                opacity={progress * (playing ? pulse : 1)}
                marker="url(#thermal-full-comp)"
              />
              <AxialArrows
                from={c}
                to={XR}
                color={COMP}
                kind="inward"
                opacity={progress * (playing ? pulse : 1)}
                marker="url(#thermal-full-comp)"
              />
              <text x={X0 + 10} y={BAR_Y + BAR_H + 18} fontSize={9} fill={COMP}>
                N_T = −36 kN
              </text>
              <text x={c + 10} y={BAR_Y + BAR_H + 18} fontSize={9} fill={COMP}>
                N_T = −36 kN
              </text>
              <HDim y={BAR_Y + BAR_H + 42} from={XR} to={XR + FREE_TOTAL} label="zablokowane 1,2 mm" color={COMP} />
              <text x={X0} y={BAR_Y + BAR_H + 66} fontSize={10} fontWeight={700} fill={COMP}>
                ΔL = 0, σ = −120 MPa w obu odcinkach
              </text>
            </>
          )}

          {isMechanical && (
            <>
              <AxialArrows
                from={X0}
                to={c}
                color={TENSION}
                kind="outward"
                opacity={progress}
                marker="url(#thermal-full-tension)"
              />
              <AxialArrows
                from={c}
                to={XR}
                color={COMP}
                kind="inward"
                opacity={progress * (playing ? pulse : 1)}
                marker="url(#thermal-full-comp)"
              />
              <text x={X0 + 10} y={BAR_Y + BAR_H + 18} fontSize={9} fill={TENSION}>
                N₁ = +10 kN (rozciąganie)
              </text>
              <text x={c + 10} y={BAR_Y + BAR_H + 18} fontSize={9} fill={COMP}>
                N₂ = −10 kN (ściskanie)
              </text>
              <HDim y={BAR_Y + BAR_H + 42} from={XC} to={c} label="u = 0,1667 mm" color={TENSION} />
              <text x={X0} y={BAR_Y + BAR_H + 66} fontSize={9} fill={MUTED}>
                tylko siła P: punkt C przesuwa się w prawo
              </text>
            </>
          )}

          {isCombined && (
            <>
              <AxialArrows
                from={X0}
                to={c}
                color={COMP}
                kind="inward"
                opacity={0.65 + 0.35 * progress}
                marker="url(#thermal-full-comp)"
              />
              <AxialArrows
                from={c}
                to={XR}
                color={COMP}
                kind="inward"
                opacity={progress * (playing ? pulse : 1)}
                marker="url(#thermal-full-comp)"
              />
              <text x={X0 + 10} y={BAR_Y + BAR_H + 18} fontSize={9} fill={COMP}>
                N₁ = −26 kN
              </text>
              <text x={c + 10} y={BAR_Y + BAR_H + 18} fontSize={9} fontWeight={700} fill={BAD}>
                N₂ = −46 kN
              </text>
              <HDim y={BAR_Y + BAR_H + 42} from={XC} to={c} label="u = 0,1667 mm" color={MUTED} />
              <text x={X0} y={BAR_Y + BAR_H + 66} fontSize={9} fill={COMP}>
                oba odcinki ściskane; decyduje CB
              </text>
            </>
          )}

          {isModel && (
            <text x={X0} y={BAR_Y + BAR_H + 44} fontSize={9} fill={MUTED}>
              oba końce nieruchome; szukamy N₁, N₂ i u w punkcie C
            </text>
          )}

          <text x={16} y={22} fontSize={9} fill={INK}>
            L₁ = L₂ = 1000 mm
          </text>
          <text x={16} y={36} fontSize={8.5} fill={MUTED}>
            A = 300 mm², E = 200 GPa
          </text>
          <text x={16} y={50} fontSize={8.5} fill={MUTED}>
            α = 12·10⁻⁶ 1/K, k_c = 160 MPa
          </text>
          <text x={444} y={22} textAnchor="end" fontSize={10} fontWeight={700} fill={heat > 0.05 ? LOAD : MUTED}>
            {heatLabel}
          </text>
          <text x={444} y={38} textAnchor="end" fontSize={8.5} fill={MUTED}>
            P = 20 kN w prawo
          </text>
          <text x={16} y={288} fontSize={8.5} fill={MUTED}>
            {isModel
              ? 'przed ogrzaniem: P działa w punkcie C'
              : isFree
                ? 'myślowo zdejmujemy prawą podporę: wydłużenie bez naprężenia'
                : isRestraint
                  ? 'ten sam ΔT = 50 K, ale oba końce są nieruchome'
                  : isMechanical
                    ? 'sama siła P przy ΔT = 0'
                    : 'suma: temperatura daje ściskanie, siła P różnicuje oba odcinki'}
          </text>
        </svg>
      </div>
    </div>
  )
}
