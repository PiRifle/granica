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

const O = { x: 210, y: 195 }
const R = 56
const RO = 112
const CONTACT = { x: 210, y: 83 }
const BLOCK = { x: 210, y: 78 }
const A = { x: 365, y: 72 }
const B = { x: 165, y: 72 }
const ROPE = { x: 210, y: 251 }
const PULLEY = { x: 378, y: 251 }

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))

const arcPath = (cx: number, cy: number, radius: number, from: number, to: number, sweep = 1) => {
  const a = (from * Math.PI) / 180
  const b = (to * Math.PI) / 180
  return `M ${cx + radius * Math.cos(a)} ${cy + radius * Math.sin(a)} A ${radius} ${radius} 0 0 ${sweep} ${cx + radius * Math.cos(b)} ${cy + radius * Math.sin(b)}`
}

export function HorizontalLeverBrakeAnimation({ index, playing, sceneProgress }: SolutionAnimationProps) {
  const t = playing ? clamp01(sceneProgress) : 0
  const showLoad = index >= 2
  const showFriction = index >= 3
  const showDrive = index >= 4
  const showEccentric = index >= 5
  const showReactions = index >= 6
  const spin = index >= 2 ? -36 * t : 0
  const slide = showFriction ? 3 * Math.sin(t * Math.PI * 2) : 0
  const pulse = showDrive ? 1 + 0.05 * Math.sin(t * Math.PI * 3) : 1

  const status =
    [
      'Model: bęben 2R, lina Q poziomo i pozioma dźwignia nad bębnem',
      'Geometria: promienie 2R i R, ramiona a = 0,10 m i b = 0,40 m',
      'Lina Q daje moment M_Q = 15 kN·m względem O',
      'Tarcie T = 7,5 kN i nacisk N = 30 kN na górnej powierzchni',
      'Równowaga dźwigni wyznacza P = 24,90 kN pionowo w dół',
      'Grubość klocka e zmienia znak momentu tarcia T·e',
      'Reakcje O = (−22,50; 31,80) kN i A = (7,50; −5,10) kN',
      'Kontrola: T = μN, ΣF = 0, ΣM = 0 i P ma zwrot w dół',
    ][index] ?? ''

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 340"
          role="img"
          aria-label="Bęben 2R z poziomą dźwignią nad bębnem i siłą P pionowo w dół"
        >
          <title>Bęben z poziomą dźwignią i siłą P pionowo w dół</title>
          <desc>
            Bęben o promieniu zewnętrznym 2R i wewnętrznym R, lina z ciężarem Q przechodząca przez krążek stały, pozioma
            dźwignia A–B nad bębnem, klocek, tarcie T, nacisk N, siła P i reakcje O oraz A.
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

          <line
            x1={O.x}
            y1={O.y}
            x2={CONTACT.x}
            y2={CONTACT.y}
            stroke={MUTED}
            strokeWidth="1.2"
            strokeDasharray="5 4"
          />
          <text x={330} y={126} fontSize="9" fill={MUTED}>
            2R
          </text>
          <line x1={O.x} y1={O.y} x2={ROPE.x} y2={ROPE.y} stroke={MUTED} strokeWidth="1.2" strokeDasharray="5 4" />
          <text x={330} y={222} fontSize="9" fill={MUTED}>
            R
          </text>
          <Label x={324} y={90} size={9} color={INK}>
            pozioma
          </Label>

          <line x1={B.x} y1={B.y} x2={A.x} y2={A.y} stroke={WEIGHT} strokeWidth="6" strokeLinecap="round" />
          <circle cx={A.x} cy={A.y} r="7" fill="#f8fafd" stroke={WEIGHT} strokeWidth="2.4" />
          <circle cx={B.x} cy={B.y} r="3" fill={WEIGHT} />
          <Label x={360} y={60} size={10} color={INK}>
            A
          </Label>
          <Label x={158} y={60} size={10} anchor="end" color={INK}>
            B
          </Label>

          <motion.g initial={false} animate={{ x: slide }} transition={{ type: 'spring', stiffness: 75, damping: 15 }}>
            <rect x={BLOCK.x - 18} y={BLOCK.y - 6} width="36" height="12" rx="3" fill={FRICTION} opacity="0.82" />
          </motion.g>

          <motion.g
            initial={false}
            animate={{ scale: pulse }}
            transition={{ type: 'spring', stiffness: 60, damping: 16 }}
            style={{ transformOrigin: `${B.x}px ${B.y}px` }}
          >
            {showDrive ? (
              <Arrow from={B} to={{ x: B.x, y: B.y + 62 }} color={DRIVE} width={4} />
            ) : (
              <text x={166} y={54} fontSize="11" fill={MUTED}>
                P = ?
              </text>
            )}
          </motion.g>
          {showDrive && (
            <Label x={166} y={54} size={10} color={DRIVE}>
              P = 24,90 kN
            </Label>
          )}

          <Arrow from={{ x: O.x - 12, y: O.y }} to={{ x: O.x - 12, y: O.y + 46 }} color={WEIGHT} width={2.4} />
          <Label x={218} y={320} size={10} color={WEIGHT}>
            G
          </Label>

          <line x1={ROPE.x} y1={ROPE.y} x2={PULLEY.x - 16} y2={PULLEY.y} stroke={WEIGHT} strokeWidth="2.2" />
          <circle cx={PULLEY.x} cy={PULLEY.y} r="16" fill="#f8fafd" stroke={WEIGHT} strokeWidth="2.2" />
          <circle cx={PULLEY.x} cy={PULLEY.y} r="3" fill={WEIGHT} />
          <line x1={PULLEY.x} y1={PULLEY.y + 16} x2={PULLEY.x} y2="295" stroke={WEIGHT} strokeWidth="2.2" />
          <rect
            x={PULLEY.x - 12}
            y="295"
            width="24"
            height="17"
            rx="3"
            fill="#eef2fb"
            stroke={SCHEMA.member}
            strokeWidth="1.6"
          />
          <text x={PULLEY.x - 6} y="308" fontSize="9" fill={INK}>
            Q
          </text>
          <Label x={392} y={306} size={10} color={WEIGHT}>
            Q = 15 kN
          </Label>
          <Label x={330} y={242} size={10} color={WEIGHT}>
            S = 15 kN
          </Label>

          {showLoad && (
            <>
              <path d={arcPath(O.x, O.y, 78, 150, 20, 0)} fill="none" stroke={SCHEMA.moment} strokeWidth="2.4" />
              <Arrow from={{ x: 133, y: 219 }} to={{ x: 152, y: 233 }} color={SCHEMA.moment} width={2.2} />
              <Label x={330} y={150} size={10} color={SCHEMA.moment}>
                M_Q
              </Label>
            </>
          )}

          {showFriction && (
            <>
              <Arrow from={CONTACT} to={{ x: CONTACT.x + 56, y: CONTACT.y }} color={FRICTION} width={3.2} />
              <Label x={270} y={68} size={10} color={FRICTION}>
                T
              </Label>
              <Arrow from={CONTACT} to={{ x: CONTACT.x, y: CONTACT.y + 50 }} color={NORMAL} width={3.2} />
              <Label x={240} y={68} size={10} color={NORMAL}>
                N
              </Label>
            </>
          )}

          {showEccentric && (
            <Label x={330} y={110} size={9} color={FRICTION}>
              T·e
            </Label>
          )}

          {showReactions && (
            <>
              <Arrow from={O} to={{ x: 105, y: O.y }} color={NORMAL} width={2.6} />
              <Arrow from={O} to={{ x: O.x, y: 75 }} color={NORMAL} width={2.6} />
              <Arrow from={A} to={{ x: A.x + 44, y: A.y }} color={NORMAL} width={2.4} />
              <Arrow from={A} to={{ x: A.x, y: A.y + 44 }} color={NORMAL} width={2.4} />
              <Label x={94} y={190} size={10} anchor="end" color={NORMAL}>
                O_x
              </Label>
              <Label x={180} y={68} size={10} color={NORMAL}>
                O_y
              </Label>
              <Label x={412} y={76} size={10} color={NORMAL}>
                A_x
              </Label>
              <Label x={373} y={116} size={10} color={NORMAL}>
                A_y
              </Label>
            </>
          )}

          {index === 7 && (
            <text x={230} y={334} textAnchor="middle" fontSize="10" fill={NORMAL}>
              T = μN = 7,5 kN; moment T·e i reakcja A domykają ΣM_A = 0
            </text>
          )}
        </svg>
      </div>
    </div>
  )
}
