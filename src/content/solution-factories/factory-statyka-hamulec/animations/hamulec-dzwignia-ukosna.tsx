import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../../types'
import { local } from '../../../../components/solution-figures/shared'
import { Arrow, Label, SCHEMA } from '../../../../components/solution-figures/statics-schematic'

const DRIVE = SCHEMA.load
const FRICTION = SCHEMA.member
const NORMAL = SCHEMA.reaction
const WEIGHT = SCHEMA.edge
const MUTED = SCHEMA.muted
const INK = SCHEMA.ink

const O = { x: 275, y: 175 }
const R = 54
const RO = 108
const CONTACT = { x: 199, y: 99 }
const BLOCK = { x: 194, y: 94 }
const A = { x: 135, y: 162 }
const P_POINT = { x: 167, y: 130 }
const ROPE = { x: 221, y: 175 }
const U = { x: 0.707, y: -0.707 }

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))

const arcPath = (cx: number, cy: number, radius: number, from: number, to: number, sweep = 1) => {
  const a = (from * Math.PI) / 180
  const b = (to * Math.PI) / 180
  return `M ${cx + radius * Math.cos(a)} ${cy + radius * Math.sin(a)} A ${radius} ${radius} 0 0 ${sweep} ${cx + radius * Math.cos(b)} ${cy + radius * Math.sin(b)}`
}

export function AngledLeverBrakeAnimation({ index, playing, sceneProgress }: SolutionAnimationProps) {
  const t = playing ? clamp01(sceneProgress) : 1
  const showRadii = index >= 1
  const showLoad = index >= 2
  const showFriction = index >= 3
  const showDrive = index >= 4
  const showEccentric = index >= 5
  const showReactions = index >= 6
  const spin = index >= 2 ? 42 * t : 0
  const slide = showFriction ? 3 * Math.sin(t * Math.PI * 2) : 0
  const pulse = showDrive ? 1 + 0.05 * Math.sin(t * Math.PI * 3) : 1

  const status =
    [
      'Model: bęben 2R, lina Q i dźwignia pod kątem α = 45°',
      'Geometria: promienie 2R i R, ramię a = 0,45 m, mimośród e',
      'Lina Q daje moment M_Q = 14 kN·m względem O',
      'Tarcie T = 7 kN i nacisk N = 35 kN na klocek',
      'Siła P pod kątem 2α = 90° do dźwigni: P = 65,33 kN',
      'Mimośród e daje dodatkowy moment tarcia T·e',
      'Reakcje O = (−29,70; 35,10) kN i A = (−16,50; 26,40) kN',
      'Kontrola: T = μN = 7 kN, znaki P, O i A są poprawne',
    ][index] ?? ''

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 340"
          role="img"
          aria-label="Bęben 2R z dźwignią pod kątem 45 stopni i siłą P pod kątem 90 stopni"
        >
          <title>Bęben z dźwignią pod kątem α i siłą P pod kątem 2α</title>
          <desc>
            Bęben o promieniu zewnętrznym 2R i wewnętrznym R, lina z ciężarem Q, dźwignia A–B pod kątem α, klocek,
            tarcie T, nacisk N, siła P pod kątem 2α i reakcje O oraz A.
          </desc>

          <Label x={230} y={24} size={10} anchor="middle" color={MUTED}>
            {status}
          </Label>

          <circle cx={O.x} cy={O.y} r={RO} fill="#eef2fb" stroke={SCHEMA.member} strokeWidth="2.6" />
          <circle cx={O.x} cy={O.y} r={R} fill="#f8fafd" stroke={WEIGHT} strokeWidth="2" />
          <motion.g
            initial={false}
            animate={{ rotate: spin }}
            transition={{ type: 'spring', stiffness: 45, damping: 18 }}
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          >
            {[0, 60, 120, 180, 240, 300].map((angle) => {
              const rad = (angle * Math.PI) / 180
              return (
                <line
                  key={angle}
                  x1={O.x + 8 * Math.cos(rad)}
                  y1={O.y + 8 * Math.sin(rad)}
                  x2={O.x + (RO - 10) * Math.cos(rad)}
                  y2={O.y + (RO - 10) * Math.sin(rad)}
                  stroke="#c9d3e2"
                  strokeWidth="1.1"
                />
              )
            })}
          </motion.g>

          <circle cx={O.x} cy={O.y} r="4.5" fill={INK} />

          {showRadii && (
            <>
              <line
                x1={O.x}
                y1={O.y}
                x2={CONTACT.x}
                y2={CONTACT.y}
                stroke={MUTED}
                strokeWidth="1.2"
                strokeDasharray="5 4"
              />
              <line x1={O.x} y1={O.y} x2={ROPE.x} y2={ROPE.y} stroke={MUTED} strokeWidth="1.2" strokeDasharray="5 4" />
              <path d={arcPath(A.x, A.y, 46, -45, 0)} fill="none" stroke={INK} strokeWidth="1.3" />
              <Label x={125} y={142} size={10} anchor="end" color={INK}>
                α = 45°
              </Label>
            </>
          )}

          <line x1={ROPE.x} y1={ROPE.y} x2={ROPE.x} y2="276" stroke={WEIGHT} strokeWidth="2.2" />
          <rect
            x={ROPE.x - 12}
            y="276"
            width="24"
            height="17"
            rx="3"
            fill="#eef2fb"
            stroke={SCHEMA.member}
            strokeWidth="1.6"
          />
          <text x={ROPE.x - 6} y="289" fontSize="9" fill={INK}>
            Q
          </text>
          <Label x={235} y={296} size={10} color={WEIGHT}>
            Q = 14 kN
          </Label>

          {showLoad && (
            <>
              <path d={arcPath(O.x, O.y, 78, 255, 195, 0)} fill="none" stroke={SCHEMA.moment} strokeWidth="2.4" />
              <Arrow from={{ x: 231, y: 245 }} to={{ x: 243, y: 250 }} color={SCHEMA.moment} width={2.2} />
              <Label x={162} y={230} size={10} anchor="end" color={SCHEMA.moment}>
                M_Q
              </Label>
            </>
          )}

          <motion.g
            initial={false}
            animate={{ x: slide * U.x, y: slide * U.y }}
            transition={{ type: 'spring', stiffness: 75, damping: 15 }}
          >
            <g transform={`rotate(-45 ${BLOCK.x} ${BLOCK.y})`}>
              <rect x={BLOCK.x - 16} y={BLOCK.y - 6} width="32" height="12" rx="3" fill={FRICTION} opacity="0.82" />
            </g>
          </motion.g>

          <line x1={A.x} y1={A.y} x2={CONTACT.x} y2={CONTACT.y} stroke={WEIGHT} strokeWidth="6" strokeLinecap="round" />
          <circle cx={A.x} cy={A.y} r="7" fill="#f8fafd" stroke={WEIGHT} strokeWidth="2.4" />
          <circle cx={P_POINT.x} cy={P_POINT.y} r="3" fill={WEIGHT} />
          <Label x={126} y={176} size={10} anchor="end" color={INK}>
            A
          </Label>
          <Label x={185} y={58} size={10} color={INK}>
            B
          </Label>

          <motion.g
            initial={false}
            animate={{ scale: pulse }}
            transition={{ type: 'spring', stiffness: 60, damping: 16 }}
            style={{ transformOrigin: `${P_POINT.x}px ${P_POINT.y}px` }}
          >
            {showDrive ? (
              <Arrow from={P_POINT} to={{ x: P_POINT.x + 26, y: P_POINT.y + 26 }} color={DRIVE} width={3.8} />
            ) : (
              <text x={158} y={100} textAnchor="end" fontSize="11" fill={MUTED}>
                P = ?
              </text>
            )}
          </motion.g>
          {showDrive && (
            <Label x={158} y={100} size={10} anchor="end" color={DRIVE}>
              P = 65,33 kN
            </Label>
          )}

          <Arrow from={{ x: O.x, y: O.y }} to={{ x: O.x, y: O.y + 42 }} color={WEIGHT} width={2.4} />
          <Label x={300} y={294} size={10} color={WEIGHT}>
            G
          </Label>

          {showFriction && (
            <>
              <Arrow from={CONTACT} to={{ x: CONTACT.x + 34, y: CONTACT.y - 34 }} color={FRICTION} width={3.2} />
              <Label x={240} y={58} size={10} color={FRICTION}>
                T
              </Label>
              <Arrow from={CONTACT} to={{ x: CONTACT.x + 20, y: CONTACT.y + 20 }} color={NORMAL} width={3.2} />
              <Label x={215} y={58} size={10} color={NORMAL}>
                N
              </Label>
            </>
          )}

          {showEccentric && (
            <Label x={260} y={58} size={9} color={FRICTION}>
              T·e
            </Label>
          )}

          {showReactions && (
            <>
              <Arrow from={O} to={{ x: O.x - 105, y: O.y }} color={NORMAL} width={2.6} />
              <Arrow from={O} to={{ x: O.x, y: O.y - 105 }} color={NORMAL} width={2.6} />
              <Arrow from={A} to={{ x: A.x - 40, y: A.y }} color={NORMAL} width={2.4} />
              <Arrow from={A} to={{ x: A.x, y: A.y - 42 }} color={NORMAL} width={2.4} />
              <Label x={164} y={170} size={10} anchor="end" color={NORMAL}>
                O_x
              </Label>
              <Label x={280} y={60} size={10} color={NORMAL}>
                O_y
              </Label>
              <Label x={90} y={166} size={10} anchor="end" color={NORMAL}>
                A_x
              </Label>
              <Label x={128} y={116} size={10} anchor="end" color={NORMAL}>
                A_y
              </Label>
            </>
          )}

          {index === 7 && (
            <text x={230} y={330} textAnchor="middle" fontSize="10" fill={NORMAL}>
              T = μN = 7 kN; moment tarcia T·e zgadza się z ΣM_A = 0
            </text>
          )}
        </svg>
      </div>
    </div>
  )
}
