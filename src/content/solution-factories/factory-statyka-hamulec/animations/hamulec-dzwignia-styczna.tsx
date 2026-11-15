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

const O = { x: 220, y: 160 }
const R = 60
const RO = 120
const CONTACT = { x: 280, y: 264 }
const BLOCK = { x: 286, y: 268 }
const A = { x: 218, y: 307 }
const B = { x: 322, y: 247 }
const ROPE = { x: 160, y: 160 }
const U = { x: 0.866, y: -0.5 }
const NORMAL_DIR = { x: -0.5, y: -0.866 }
const FRICTION_DIR = { x: -0.866, y: 0.5 }

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))

const arcPath = (cx: number, cy: number, radius: number, from: number, to: number, sweep = 1) => {
  const a = (from * Math.PI) / 180
  const b = (to * Math.PI) / 180
  return `M ${cx + radius * Math.cos(a)} ${cy + radius * Math.sin(a)} A ${radius} ${radius} 0 0 ${sweep} ${cx + radius * Math.cos(b)} ${cy + radius * Math.sin(b)}`
}

export function DrumLeverBrakeAnimation({ index, playing, sceneProgress }: SolutionAnimationProps) {
  const t = playing ? clamp01(sceneProgress) : 1
  const showRadii = index >= 1
  const showLoad = index >= 2
  const showFriction = index >= 3
  const showDrive = index >= 4
  const showEccentric = index >= 5
  const showReactions = index >= 6
  const spin = index >= 2 ? -38 * t : 0
  const slide = showFriction ? 3 * Math.sin(t * Math.PI * 2) : 0
  const pulse = showDrive ? 1 + 0.045 * Math.sin(t * Math.PI * 3) : 1

  const status =
    [
      'Model: bęben 2R, lina z Q, klocek i dźwignia A–B',
      'Geometria: promienie 2R i R, ramiona a = 0,20 m, b = 0,10 m',
      'Lina Q daje moment M_Q = 10 kN·m względem O',
      'Stan graniczny: T = μN = 5 kN, nacisk N = 50 kN',
      'Równowaga dźwigni wyznacza siłę P = 39,26 kN',
      'Mimośród e dodaje moment tarcia T·e na dźwigni',
      'Reakcje O = (29,33; −29,80) kN i A = (−29,33; 1,54) kN',
      'Kontrola: ΣF = 0, ΣM = 0, T = μN i P ma zwrot zgodny z rysunkiem',
    ][index] ?? ''

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 340"
          role="img"
          aria-label="Hamulec klockowy: bęben 2R, lina Q i dźwignia styczna z siłą P"
        >
          <title>Bęben 2R z liną i dźwignią hamulcową</title>
          <desc>
            Bęben o promieniu zewnętrznym 2R i wewnętrznym R, lina z ciężarem Q, klocek na dźwigni A–B, tarcie T, nacisk
            N, siła P i reakcje O oraz A.
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
              <text x={346} y={120} fontSize="9" fill={MUTED}>
                2R
              </text>
              <line x1={O.x} y1={O.y} x2={ROPE.x} y2={ROPE.y} stroke={MUTED} strokeWidth="1.2" strokeDasharray="5 4" />
              <text x={O.x - 36} y={O.y - 8} fontSize="9" fill={MUTED}>
                R
              </text>
              <path d={arcPath(O.x, O.y, 54, 60, 90)} fill="none" stroke={INK} strokeWidth="1.3" />
              <line x1={O.x} y1={O.y} x2={305} y2={307} stroke={MUTED} strokeWidth="1" strokeDasharray="4 4" />
              <Label x={346} y={286} size={10} color={INK}>
                α
              </Label>
            </>
          )}

          <line x1={ROPE.x} y1={ROPE.y} x2={ROPE.x} y2="270" stroke={WEIGHT} strokeWidth="2.2" />
          <rect
            x={ROPE.x - 12}
            y="270"
            width="24"
            height="17"
            rx="3"
            fill="#eef2fb"
            stroke={SCHEMA.member}
            strokeWidth="1.6"
          />
          <text x={ROPE.x - 6} y="283" fontSize="9" fill={INK}>
            Q
          </text>
          <Label x={150} y={294} size={10} anchor="end" color={WEIGHT}>
            Q = 10 kN
          </Label>

          {showLoad && (
            <>
              <path d={arcPath(O.x, O.y, 82, 130, 20, 0)} fill="none" stroke={SCHEMA.moment} strokeWidth="2.4" />
              <Arrow from={{ x: 226, y: 244 }} to={{ x: 254, y: 236 }} color={SCHEMA.moment} width={2.2} />
              <Label x={250} y={60} size={10} color={SCHEMA.moment}>
                M_Q
              </Label>
            </>
          )}

          <motion.g
            initial={false}
            animate={{ x: slide * U.x, y: slide * U.y }}
            transition={{ type: 'spring', stiffness: 75, damping: 15 }}
          >
            <g transform={`rotate(-30 ${BLOCK.x} ${BLOCK.y})`}>
              <rect x={BLOCK.x - 17} y={BLOCK.y - 6} width="34" height="12" rx="3" fill={FRICTION} opacity="0.82" />
            </g>
          </motion.g>

          <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke={WEIGHT} strokeWidth="6" strokeLinecap="round" />
          <circle cx={A.x} cy={A.y} r="7" fill="#f8fafd" stroke={WEIGHT} strokeWidth="2.4" />
          <circle cx={B.x} cy={B.y} r="3" fill={WEIGHT} />
          <Label x={196} y={290} size={10} anchor="end" color={INK}>
            A
          </Label>
          <Label x={348} y={248} size={10} color={INK}>
            B
          </Label>

          <motion.g
            initial={false}
            animate={{ scale: pulse }}
            transition={{ type: 'spring', stiffness: 60, damping: 16 }}
            style={{ transformOrigin: `${B.x}px ${B.y}px` }}
          >
            {showDrive ? (
              <Arrow from={B} to={{ x: B.x, y: B.y - 62 }} color={DRIVE} width={4} />
            ) : (
              <text x={346} y={184} fontSize="11" fill={MUTED}>
                P = ?
              </text>
            )}
          </motion.g>
          {showDrive && (
            <Label x={346} y={184} size={10} color={DRIVE}>
              P = 39,26 kN
            </Label>
          )}

          <line
            x1={O.x - 10}
            y1={O.y}
            x2={O.x - 10}
            y2={O.y + 40}
            stroke={WEIGHT}
            strokeWidth="2.4"
            markerEnd="url(#c1-g)"
          />
          <defs>
            <marker id="c1-g" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0 0L10 5L0 10Z" fill={WEIGHT} />
            </marker>
          </defs>
          <Label x={222} y={292} size={10} color={WEIGHT}>
            G
          </Label>

          {showFriction && (
            <>
              <Arrow from={CONTACT} to={{ x: CONTACT.x - 34, y: CONTACT.y + 20 }} color={FRICTION} width={3.2} />
              <Label x={290} y={310} size={10} color={FRICTION}>
                T
              </Label>
              <Arrow
                from={CONTACT}
                to={{ x: CONTACT.x + 34 * NORMAL_DIR.x, y: CONTACT.y + 58 * NORMAL_DIR.y }}
                color={NORMAL}
                width={3.2}
              />
              <Label x={300} y={296} size={10} color={NORMAL}>
                N
              </Label>
              <line
                x1={BLOCK.x + 22}
                y1={BLOCK.y - 12}
                x2={BLOCK.x + 50}
                y2={BLOCK.y - 22}
                stroke={FRICTION}
                strokeWidth="1"
                strokeDasharray="4 3"
              />
            </>
          )}

          {showEccentric && (
            <Label x={330} y={320} size={9} color={FRICTION}>
              T·e
            </Label>
          )}

          {showReactions && (
            <>
              <Arrow from={O} to={{ x: O.x + 112, y: O.y }} color={NORMAL} width={2.6} />
              <Arrow from={{ x: O.x + 6, y: O.y }} to={{ x: O.x + 6, y: O.y + 54 }} color={NORMAL} width={2.6} />
              <Arrow from={A} to={{ x: A.x - 42, y: A.y }} color={NORMAL} width={2.4} />
              <Arrow from={A} to={{ x: A.x, y: A.y - 34 }} color={NORMAL} width={2.4} />
              <Label x={346} y={156} size={10} color={NORMAL}>
                O_x
              </Label>
              <Label x={258} y={306} size={10} color={NORMAL}>
                O_y
              </Label>
              <Label x={168} y={312} size={10} anchor="end" color={NORMAL}>
                A_x
              </Label>
              <Label x={226} y={318} size={10} color={NORMAL}>
                A_y
              </Label>
            </>
          )}

          {index === 7 && (
            <text x={230} y={334} textAnchor="middle" fontSize="10" fill={NORMAL}>
              T = μN = 5 kN; reszty ΣF i ΣM są zerowe
            </text>
          )}
        </svg>
      </div>
    </div>
  )
}
