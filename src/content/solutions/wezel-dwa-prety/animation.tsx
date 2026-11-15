import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'
import { Arrow, Label, SCHEMA, revealAt } from '../../../components/solution-figures/statics-schematic'
import { pl } from '../../solution-factories/core/source-task'

const P1 = 12
const P2 = 6
const ALPHA = 75
const BETA = 60

const WALL_X = 80
const TOP_PIN = { x: WALL_X, y: 80 }
const BOTTOM_PIN = { x: WALL_X, y: 270 }
const NODE = { x: 305, y: 140 }
const S1 = 18.94
const S2 = -14.196

const S1_END = {
  x: NODE.x - 70 * Math.sin((ALPHA * Math.PI) / 180),
  y: NODE.y - 70 * Math.cos((ALPHA * Math.PI) / 180),
}
const S2_END = { x: NODE.x + 70 * Math.sin((BETA * Math.PI) / 180), y: NODE.y - 70 * Math.cos((BETA * Math.PI) / 180) }

export function TwoBarJointAnimation({ index, playing, sceneProgress }: SolutionAnimationProps) {
  const reveal = revealAt(playing, sceneProgress)
  const showLoads = index >= 1
  const showAngles = index >= 2
  const showRodForces = index >= 3
  const showSigns = index >= 5
  const showCheck = index >= 7

  const loadMotion = playing
    ? { opacity: [0.68, 1, 0.68], transition: { duration: 1.9, repeat: Number.POSITIVE_INFINITY } }
    : { opacity: 1 }

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg viewBox="0 0 460 340" role="img" aria-label="Dwa pręty zamocowane do ściany i połączone w węźle">
          <title>Węzeł dwóch prętów z obciążeniami P1 i P2</title>
          <desc>
            Dwa nieważkie pręty są zamocowane przegubowo do pionowej ściany i spotykają się w węźle. W węźle działają
            obciążenia P1 w dół i P2 w prawo. Kąty alfa i beta są mierzone od ściany. Pokazano siły S1 i S2 w prętach.
          </desc>

          <g stroke={SCHEMA.muted} strokeWidth={1.1}>
            <line x1="18" y1="34" x2="38" y2="34" />
            <line x1="18" y1="34" x2="18" y2="14" />
          </g>
          <Label x={42} y={37} size={8} color={SCHEMA.muted}>
            x
          </Label>
          <Label x={11} y={16} size={8} color={SCHEMA.muted}>
            y
          </Label>

          <line x1={WALL_X} y1="58" x2={WALL_X} y2="292" stroke={SCHEMA.edge} strokeWidth={3} />
          {Array.from({ length: 13 }, (_, step) => (
            <line
              key={step}
              x1={WALL_X}
              y1={64 + step * 18}
              x2={WALL_X - 12}
              y2={72 + step * 18}
              stroke={SCHEMA.edge}
              strokeWidth={1.1}
              opacity={0.65}
            />
          ))}
          <Label x={74} y={54} size={8.5} color={SCHEMA.muted} anchor="end">
            ściana
          </Label>

          <line x1={TOP_PIN.x} y1={TOP_PIN.y} x2={NODE.x} y2={NODE.y} stroke={SCHEMA.edge} strokeWidth={3.2} />
          <line x1={BOTTOM_PIN.x} y1={BOTTOM_PIN.y} x2={NODE.x} y2={NODE.y} stroke={SCHEMA.edge} strokeWidth={3.2} />
          <circle cx={TOP_PIN.x} cy={TOP_PIN.y} r="4.5" fill={SCHEMA.ink} />
          <circle cx={BOTTOM_PIN.x} cy={BOTTOM_PIN.y} r="4.5" fill={SCHEMA.ink} />
          <circle cx={NODE.x} cy={NODE.y} r="4.6" fill={SCHEMA.ink} />
          <Label x={315} y={158} size={9.5} color={SCHEMA.ink}>
            W
          </Label>

          {showAngles && (
            <motion.g initial={false} animate={{ opacity: reveal }} transition={{ duration: 0.25 }}>
              <path
                d={`M ${WALL_X + 34.8} ${TOP_PIN.y + 9.3} A 36 36 0 0 1 ${WALL_X} ${TOP_PIN.y + 36}`}
                fill="none"
                stroke={SCHEMA.muted}
                strokeWidth={1.4}
              />
              <Label x={106} y={114} size={10} color={SCHEMA.muted}>
                α = 75°
              </Label>
              <path
                d={`M ${WALL_X} ${BOTTOM_PIN.y - 36} A 36 36 0 0 1 ${WALL_X + 31.2} ${BOTTOM_PIN.y - 18}`}
                fill="none"
                stroke={SCHEMA.muted}
                strokeWidth={1.4}
              />
              <Label x={102} y={244} size={10} color={SCHEMA.muted}>
                β = 60°
              </Label>
            </motion.g>
          )}

          {showLoads && (
            <motion.g initial={false} animate={loadMotion}>
              <Arrow from={NODE} to={{ x: NODE.x, y: 220 }} color={SCHEMA.load} width={3.4} />
              <Label x={315} y={192} size={10} color={SCHEMA.load}>
                P₁ = 12 kN
              </Label>
              <Arrow from={NODE} to={{ x: 388, y: NODE.y }} color={SCHEMA.load} width={3.4} />
              <Label x={340} y={NODE.y + 16} size={10} color={SCHEMA.load}>
                P₂ = 6 kN
              </Label>
            </motion.g>
          )}

          {showRodForces && (
            <motion.g initial={false} animate={{ opacity: reveal }} transition={{ duration: 0.25 }}>
              <Arrow from={NODE} to={S1_END} color={SCHEMA.tension} width={3.2} />
              <Label x={S1_END.x - 4} y={S1_END.y + 18} size={9.5} color={SCHEMA.tension} anchor="end" weight={700}>
                S₁ = {pl(S1, 2)} kN
              </Label>
              <Arrow from={NODE} to={S2_END} color={SCHEMA.compression} width={3.2} />
              <Label x={S2_END.x + 4} y={S2_END.y - 8} size={9.5} color={SCHEMA.compression} weight={700}>
                S₂ = −{pl(Math.abs(S2), 2)} kN
              </Label>
            </motion.g>
          )}

          <text x="230" y="326" textAnchor="middle" fontSize="9.5" fill={showCheck ? SCHEMA.reaction : SCHEMA.muted}>
            {showCheck
              ? 'Kontrola: ΣF_x = 0, ΣF_y = 0; S₂ < 0 oznacza ściskanie'
              : showSigns
                ? 'S₁ > 0 — pręt rozciągany; S₂ < 0 — pręt ściskany'
                : showRodForces
                  ? 'Rzuty sił w węźle dają układ dwóch równań na S₁ i S₂'
                  : showLoads
                    ? 'P₁ działa w dół, P₂ w prawo; węzeł jest zbieżny'
                    : 'Dwa pręty do węzła W; kąty α i β mierzone od pionowej ściany'}
          </text>
        </svg>
      </div>
    </div>
  )
}
