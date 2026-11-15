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

const O = { x: 215, y: 190 }
const R = 56
const RO = 84
const CONTACT = { x: 257, y: 117 }
const BLOCK = { x: 262, y: 109 }
const GUIDE_A = { x: 274, y: 88 }
const GUIDE_B = { x: 299, y: 45 }
const ROD_END = { x: 307, y: 31 }
const ROPE = { x: 159, y: 190 }
const PULLEY = { x: 110, y: 268 }
const U = { x: 0.5, y: -0.866 }

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))

const arcPath = (cx: number, cy: number, radius: number, from: number, to: number) => {
  const a = (from * Math.PI) / 180
  const b = (to * Math.PI) / 180
  return `M ${cx + radius * Math.cos(a)} ${cy + radius * Math.sin(a)} A ${radius} ${radius} 0 0 1 ${cx + radius * Math.cos(b)} ${cy + radius * Math.sin(b)}`
}

export function RodBrakePulleyAnimation({ index, playing, sceneProgress }: SolutionAnimationProps) {
  const t = playing ? clamp01(sceneProgress) : 1
  const showRadii = index >= 1
  const showRope = index >= 2
  const showFriction = index >= 3
  const showDrive = index >= 4
  const showReactions = index >= 6
  const spin = index >= 2 ? 34 * t : 0
  const rodSlide = showDrive ? 3 * Math.sin(t * Math.PI * 2) : 0
  const pulleyBob = showRope ? 3 * Math.sin(t * Math.PI * 2) : 0
  const pulse = showDrive ? 1 + 0.05 * Math.sin(t * Math.PI * 3) : 1

  const status =
    [
      'Model: bęben 1,5R, krążek ruchomy z G i pręt hamulcowy A–B',
      'Geometria: promienie 1,5R i R, kąt α = 30°, prowadnice A i B',
      'Lina przez krążek: S = G/2 = 0,55 kN i moment M_Q',
      'Tarcie T = 0,367 kN i nacisk N = 2,444 kN',
      'Pręt osiowy: P = N = 2,444 kN dociska klocek',
      'Reakcje prowadnic A i B są prostopadłe do pręta',
      'Reakcje O = (0,905; 5,050) kN, A i B domykają równowagę',
      'Kontrola: T = μN, N > 0 i zerowe reszty ΣF oraz ΣM',
    ][index] ?? ''

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 340"
          role="img"
          aria-label="Bęben 1,5R z krążkiem ruchomym i prętem hamulcowym w prowadnicach"
        >
          <title>Bęben z krążkiem ruchomym i prętem hamulcowym</title>
          <desc>
            Bęben o promieniu zewnętrznym 1,5R, lina przez krążek ruchomy z ciężarem G, pręt w prowadnicach A i B,
            tarcie T, nacisk N, siła P oraz reakcje O, A i B.
          </desc>

          <Label x={230} y={16} size={10} anchor="middle" color={MUTED}>
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
                  x2={O.x + (RO - 8) * Math.cos(rad)}
                  y2={O.y + (RO - 8) * Math.sin(rad)}
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
              <text x={234} y={96} textAnchor="end" fontSize="9" fill={MUTED}>
                1,5R
              </text>
              <line x1={O.x} y1={O.y} x2={ROPE.x} y2={ROPE.y} stroke={MUTED} strokeWidth="1.2" strokeDasharray="5 4" />
              <text x={120} y={194} textAnchor="end" fontSize="9" fill={MUTED}>
                R
              </text>
              <path d={arcPath(O.x, O.y, 50, 270, 300)} fill="none" stroke={INK} strokeWidth="1.3" />
              <Label x={234} y={82} size={10} anchor="end" color={INK}>
                α = 30°
              </Label>
            </>
          )}

          <motion.g
            initial={false}
            animate={{ x: rodSlide * U.x, y: rodSlide * U.y }}
            transition={{ type: 'spring', stiffness: 80, damping: 15 }}
          >
            <line
              x1={CONTACT.x}
              y1={CONTACT.y}
              x2={ROD_END.x}
              y2={ROD_END.y}
              stroke={WEIGHT}
              strokeWidth="5"
              strokeLinecap="round"
            />
            <g transform={`rotate(30 ${BLOCK.x} ${BLOCK.y})`}>
              <rect x={BLOCK.x - 16} y={BLOCK.y - 6} width="32" height="12" rx="3" fill={FRICTION} opacity="0.82" />
            </g>
          </motion.g>

          <circle cx={GUIDE_A.x} cy={GUIDE_A.y} r="4" fill="#f8fafd" stroke={WEIGHT} strokeWidth="2" />
          <circle cx={GUIDE_B.x} cy={GUIDE_B.y} r="4" fill="#f8fafd" stroke={WEIGHT} strokeWidth="2" />
          <Label x={296} y={72} size={10} color={INK}>
            A
          </Label>
          <Label x={270} y={50} size={10} anchor="end" color={INK}>
            B
          </Label>

          <motion.g
            initial={false}
            animate={{ scale: pulse }}
            transition={{ type: 'spring', stiffness: 60, damping: 16 }}
            style={{ transformOrigin: `${ROD_END.x}px ${ROD_END.y}px` }}
          >
            {showDrive ? (
              <Arrow from={ROD_END} to={{ x: ROD_END.x - 15, y: ROD_END.y + 26 }} color={DRIVE} width={3.8} />
            ) : (
              <text x={330} y={50} fontSize="11" fill={MUTED}>
                P = ?
              </text>
            )}
          </motion.g>
          {showDrive && (
            <Label x={330} y={50} size={10} color={DRIVE}>
              P = 2,44 kN
            </Label>
          )}

          <motion.g
            initial={false}
            animate={{ y: pulleyBob }}
            transition={{ type: 'spring', stiffness: 55, damping: 14 }}
          >
            <circle cx={PULLEY.x} cy={PULLEY.y} r="14" fill="#f8fafd" stroke={WEIGHT} strokeWidth="2.2" />
            <circle cx={PULLEY.x} cy={PULLEY.y} r="3" fill={WEIGHT} />
            <Arrow
              from={{ x: PULLEY.x, y: PULLEY.y + 14 }}
              to={{ x: PULLEY.x, y: PULLEY.y + 38 }}
              color={WEIGHT}
              width={2.4}
            />
            <Label x={PULLEY.x + 8} y={PULLEY.y + 44} size={10} color={WEIGHT}>
              G
            </Label>
          </motion.g>

          <line x1={ROPE.x} y1={ROPE.y} x2={PULLEY.x + 10} y2={PULLEY.y - 10} stroke={WEIGHT} strokeWidth="2.2" />
          <line x1={PULLEY.x - 10} y1={PULLEY.y - 10} x2="82" y2="210" stroke={WEIGHT} strokeWidth="2.2" />
          {showRope && (
            <Label x={50} y={304} size={10} color={WEIGHT}>
              S = G/2
            </Label>
          )}

          <Arrow from={{ x: O.x - 12, y: O.y }} to={{ x: O.x - 12, y: O.y + 44 }} color={WEIGHT} width={2.4} />
          <Label x={222} y={288} size={10} color={WEIGHT}>
            2G
          </Label>

          {showFriction && (
            <>
              <Arrow from={CONTACT} to={{ x: CONTACT.x + 32, y: CONTACT.y + 18 }} color={FRICTION} width={3.2} />
              <Label x={302} y={125} size={10} color={FRICTION}>
                T
              </Label>
              <Arrow from={CONTACT} to={{ x: CONTACT.x - 30, y: CONTACT.y + 52 }} color={NORMAL} width={3.2} />
              <Label x={238} y={104} size={10} color={NORMAL}>
                N
              </Label>
            </>
          )}

          {showReactions && (
            <>
              <Arrow from={O} to={{ x: O.x + 64, y: O.y }} color={NORMAL} width={2.6} />
              <Arrow from={O} to={{ x: O.x, y: O.y - 48 }} color={NORMAL} width={2.6} />
              <Arrow from={GUIDE_A} to={{ x: GUIDE_A.x + 22, y: GUIDE_A.y + 10 }} color={NORMAL} width={2.4} />
              <Arrow from={GUIDE_B} to={{ x: GUIDE_B.x - 20, y: GUIDE_B.y + 12 }} color={NORMAL} width={2.4} />
              <Label x={302} y={186} size={10} color={NORMAL}>
                O_x
              </Label>
              <Label x={190} y={100} size={10} anchor="end" color={NORMAL}>
                O_y
              </Label>
              <Label x={320} y={104} size={10} color={NORMAL}>
                A
              </Label>
              <Label x={258} y={30} size={10} color={NORMAL}>
                B
              </Label>
            </>
          )}

          {index === 7 && (
            <text x={230} y={330} textAnchor="middle" fontSize="10" fill={NORMAL}>
              T = μN = 0,367 kN; P = N, reszty równowagi ≈ 0
            </text>
          )}
        </svg>
      </div>
    </div>
  )
}
