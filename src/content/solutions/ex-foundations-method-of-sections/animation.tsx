import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const LOAD = '#ff6b45'
const REACTION = '#2f7d5b'
const MOMENT = '#a970dd'
const SUPPORT = '#68727e'
const MUTED = '#87929d'

const BEAM_Y = 92
const X0 = 50
const X1 = 420
const SPAN = X1 - X0
const LENGTH = 6
const X1_M = 1
const X2_M = 4
const P_AT = 2

const clamp = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp(value)
  return t * t * (3 - 2 * t)
}
const lerp = (from: number, to: number, t: number) => from + (to - from) * t
const xAt = (meters: number) => X0 + (meters / LENGTH) * SPAN

function Dimension({ from, to, y, label }: { from: number; to: number; y: number; label: string }) {
  return (
    <g stroke={MUTED} strokeWidth={1.2} fill="none">
      <line x1={xAt(from)} y1={y} x2={xAt(to)} y2={y} />
      <line x1={xAt(from)} y1={y - 6} x2={xAt(from)} y2={y + 6} />
      <line x1={xAt(to)} y1={y - 6} x2={xAt(to)} y2={y + 6} />
      <text x={(xAt(from) + xAt(to)) / 2} y={y + 14} textAnchor="middle" fontSize={9} fill={MUTED} stroke="none">
        {label}
      </text>
    </g>
  )
}

function ReactionArrow({ at, label, xOffset }: { at: number; label: string; xOffset: number }) {
  const x = xAt(at) + xOffset
  return (
    <motion.g stroke={REACTION} fill={REACTION} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <line x1={x} y1={BEAM_Y + 54} x2={x} y2={BEAM_Y + 12} strokeWidth={2.4} />
      <path d={`M${x - 4} ${BEAM_Y + 20} L${x} ${BEAM_Y + 9} L${x + 4} ${BEAM_Y + 20}`} fill="none" strokeWidth={2.4} />
      <text x={x} y={BEAM_Y + 68} textAnchor="middle" fontSize={8.5} stroke="none">
        {label}
      </text>
    </motion.g>
  )
}

function VerticalForce({ x, direction, label }: { x: number; direction: 'down' | 'up'; label: string }) {
  const start = BEAM_Y + 42
  const end = start + 46
  const from = direction === 'down' ? start : end
  const to = direction === 'down' ? end : start
  return (
    <g stroke={ACCENT} fill={ACCENT}>
      <line x1={x} y1={from} x2={x} y2={to} strokeWidth={2.6} />
      <path
        d={
          direction === 'down'
            ? `M${x - 4} ${to - 8} L${x} ${to} L${x + 4} ${to - 8}`
            : `M${x - 4} ${to + 8} L${x} ${to} L${x + 4} ${to + 8}`
        }
        fill="none"
        strokeWidth={2.6}
      />
      <text x={x + 9} y={(from + to) / 2 + 4} fontSize={9} stroke="none">
        {label}
      </text>
    </g>
  )
}

function MomentSymbol({ x, label }: { x: number; label: string }) {
  const cy = BEAM_Y + 22
  return (
    <g stroke={MOMENT} fill={MOMENT}>
      <path d={`M${x - 16} ${cy} A 16 16 0 1 1 ${x + 16} ${cy}`} fill="none" strokeWidth={2.2} />
      <path d={`M${x + 11} ${cy - 8} L${x + 17} ${cy} L${x + 11} ${cy + 8}`} fill="none" strokeWidth={2.2} />
      <text x={x + 24} y={cy + 4} fontSize={9} stroke="none">
        {label}
      </text>
    </g>
  )
}

function CutLine({ x, label }: { x: number; label: string }) {
  return (
    <g>
      <line
        x1={x}
        y1={40}
        x2={x}
        y2={BEAM_Y + 34}
        stroke={ACCENT}
        strokeWidth={1.6}
        strokeDasharray="5 4"
        opacity={0.9}
      />
      <text x={x} y={24} textAnchor="middle" fontSize={9} fontWeight={700} fill={ACCENT}>
        {label}
      </text>
    </g>
  )
}

export function MethodOfSectionsBeamAnimation({ scene, index, playing, sceneProgress }: SolutionAnimationProps) {
  const p = playing ? sceneProgress : 1
  const focus = scene.focus?.metric
  const cutProgress = smooth(p / 0.38)
  const cutMeters =
    index === 2
      ? lerp(0, X1_M, cutProgress)
      : index === 3
        ? lerp(X1_M, X2_M, cutProgress)
        : index === 4
          ? X2_M
          : index === 5
            ? X1_M
            : X1_M
  const cutX = xAt(cutMeters)
  const reveal = playing ? p : 1
  const showN = (index === 2 || index === 3 || index === 5) && reveal > 0.42
  const showV = (index === 2 || index === 3 || index === 5) && reveal > 0.58
  const showM = (index === 2 || index === 3 || index === 5) && reveal > 0.74
  const showRightCheck = index === 4 && reveal > 0.35
  const showRightMoment = index === 4 && reveal > 0.55
  const showSummarySecond = index === 5 && reveal > 0.55
  const atFirstCut = index !== 3
  const cutValue = {
    v: atFirstCut ? 16 : -8,
    vLabel: atFirstCut ? 'V = +16 kN' : 'V = −8 kN',
    mLabel: 'M = +16 kN·m',
  }
  const loadEmphasis = focus === 'load' ? 1 : 0.78

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 280"
          role="img"
          aria-label="Belka swobodnie podparta z przekrojami w x = 1 m i x = 4 m oraz siłami wewnętrznymi N, V i M"
        >
          <line
            x1={X0 - 10}
            y1={BEAM_Y}
            x2={X1 + 10}
            y2={BEAM_Y}
            stroke="#556273"
            strokeWidth={5}
            strokeLinecap="round"
          />

          {(index === 2 || index === 3 || index === 5) && (
            <motion.line
              x1={X0}
              y1={BEAM_Y}
              x2={cutX}
              y2={BEAM_Y}
              stroke={ACCENT}
              strokeWidth={7}
              strokeLinecap="round"
              initial={false}
              animate={{ opacity: 0.9 }}
            />
          )}

          <g stroke={SUPPORT} fill={SUPPORT}>
            <path d={`M${xAt(0) - 11} ${BEAM_Y + 18} L${xAt(0)} ${BEAM_Y + 3} L${xAt(0) + 11} ${BEAM_Y + 18} Z`} />
            <line x1={xAt(0) - 16} y1={BEAM_Y + 18} x2={xAt(0) + 16} y2={BEAM_Y + 18} strokeWidth={1.5} />
            <path d={`M${xAt(6) - 11} ${BEAM_Y + 18} L${xAt(6)} ${BEAM_Y + 3} L${xAt(6) + 11} ${BEAM_Y + 18} Z`} />
            <line x1={xAt(6) - 16} y1={BEAM_Y + 18} x2={xAt(6) + 16} y2={BEAM_Y + 18} strokeWidth={1.5} />
            <text x={xAt(0)} y={BEAM_Y + 31} textAnchor="middle" fontSize={10} fill={SUPPORT} stroke="none">
              A
            </text>
            <text x={xAt(6)} y={BEAM_Y + 31} textAnchor="middle" fontSize={10} fill={SUPPORT} stroke="none">
              B
            </text>
          </g>

          <motion.g stroke={LOAD} fill={LOAD} initial={false} animate={{ opacity: loadEmphasis }}>
            <line x1={xAt(P_AT)} y1={BEAM_Y - 46} x2={xAt(P_AT)} y2={BEAM_Y - 8} strokeWidth={2.6} />
            <path
              d={`M${xAt(P_AT) - 5} ${BEAM_Y - 16} L${xAt(P_AT)} ${BEAM_Y - 7} L${xAt(P_AT) + 5} ${BEAM_Y - 16}`}
              fill="none"
              strokeWidth={2.6}
            />
            <text x={xAt(P_AT)} y={BEAM_Y - 52} textAnchor="middle" fontSize={10} stroke="none">
              P = 24 kN
            </text>
          </motion.g>

          {(index === 0 || index === 1) && (
            <>
              <Dimension from={0} to={6} y={BEAM_Y + 92} label="L = 6 m" />
              <Dimension from={0} to={P_AT} y={BEAM_Y + 118} label="a = 2 m" />
            </>
          )}

          {(index === 1 || index === 2 || index === 3 || index === 5) && (
            <ReactionArrow at={0} xOffset={-18} label="R_A = 16 kN" />
          )}
          {(index === 1 || index === 4 || index === 5) && <ReactionArrow at={6} xOffset={12} label="R_B = 8 kN" />}

          {index === 2 && <CutLine x={cutX} label="x = 1 m" />}
          {index === 3 && <CutLine x={cutX} label="x = 4 m" />}
          {index === 4 && <CutLine x={cutX} label="x = 4 m" />}
          {index === 5 && (
            <>
              <CutLine x={xAt(X1_M)} label="x = 1 m" />
              {showSummarySecond && <CutLine x={xAt(X2_M)} label="x = 4 m" />}
            </>
          )}

          {(index === 2 || index === 3) && (
            <>
              <motion.g initial={false} animate={{ opacity: showN ? 1 : 0 }}>
                <text x={cutX - 8} y={BEAM_Y - 20} textAnchor="end" fontSize={9} fontWeight={700} fill={ACCENT}>
                  N = 0
                </text>
              </motion.g>
              <motion.g initial={false} animate={{ opacity: showV ? 1 : 0 }}>
                <VerticalForce x={cutX} direction={cutValue.v > 0 ? 'down' : 'up'} label={cutValue.vLabel} />
              </motion.g>
              <motion.g initial={false} animate={{ opacity: showM ? 1 : 0 }}>
                <MomentSymbol x={cutX} label={cutValue.mLabel} />
              </motion.g>
              <text x={X0 + 8} y={BEAM_Y - 18} fontSize={8.5} fill={MUTED}>
                część lewa
              </text>
            </>
          )}

          {index === 4 && (
            <>
              <motion.line
                x1={cutX}
                y1={BEAM_Y}
                x2={X1}
                y2={BEAM_Y}
                stroke={REACTION}
                strokeWidth={7}
                strokeLinecap="round"
                initial={{ opacity: 0 }}
                animate={{ opacity: showRightCheck ? 0.85 : 0 }}
              />
              <motion.text
                x={X1 - 8}
                y={BEAM_Y - 18}
                textAnchor="end"
                fontSize={8.5}
                fill={MUTED}
                initial={{ opacity: 0 }}
                animate={{ opacity: showRightCheck ? 1 : 0 }}
              >
                część prawa
              </motion.text>
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: showRightCheck ? 1 : 0 }}>
                <Dimension from={4} to={6} y={BEAM_Y + 74} label="2 m" />
              </motion.g>
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: showRightMoment ? 1 : 0 }}>
                <MomentSymbol x={cutX} label="M = +16 kN·m" />
                <text x={cutX - 8} y={BEAM_Y - 20} textAnchor="end" fontSize={9} fontWeight={700} fill={ACCENT}>
                  N = 0
                </text>
              </motion.g>
            </>
          )}

          {index === 5 && (
            <>
              <motion.g initial={false} animate={{ opacity: 1 }}>
                <text x={xAt(X1_M) - 8} y={BEAM_Y - 20} textAnchor="end" fontSize={9} fontWeight={700} fill={ACCENT}>
                  N = 0
                </text>
                <VerticalForce x={xAt(X1_M)} direction="down" label="V = +16 kN" />
                <MomentSymbol x={xAt(X1_M)} label="M = +16 kN·m" />
              </motion.g>
              <motion.g initial={false} animate={{ opacity: showSummarySecond ? 1 : 0 }}>
                <text x={xAt(X2_M) - 8} y={BEAM_Y - 20} textAnchor="end" fontSize={9} fontWeight={700} fill={ACCENT}>
                  N = 0
                </text>
                <VerticalForce x={xAt(X2_M)} direction="up" label="V = −8 kN" />
                <MomentSymbol x={xAt(X2_M)} label="M = +16 kN·m" />
              </motion.g>
              <text x={230} y={250} textAnchor="middle" fontSize={9} fill={MUTED}>
                N = 0 w całej belce; V zmienia znak pod siłą P
              </text>
            </>
          )}
        </svg>
      </div>
    </div>
  )
}
