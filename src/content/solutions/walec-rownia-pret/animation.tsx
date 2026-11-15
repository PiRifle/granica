import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'
import { Arrow, Label, SCHEMA, revealAt } from '../../../components/solution-figures/statics-schematic'
import { pl } from '../../solution-factories/core/source-task'

const G = 20
const ALPHA = 30
const BETA = 30
const N = (G * Math.cos((ALPHA * Math.PI) / 180)) / Math.sin(((ALPHA + BETA) * Math.PI) / 180)
const S = (G * Math.sin((ALPHA * Math.PI) / 180)) / Math.sin(((ALPHA + BETA) * Math.PI) / 180)

const R = 52
const L = { x: 60, y: 300 }
const RAMP_END = { x: 330, y: 144.3 }
const CONTACT = { x: 200, y: 219.2 }
const CENTER = { x: 174, y: 174.2 }
const PIN = { x: 312.6, y: 94.2 }

const NORMAL = { x: -Math.sin((ALPHA * Math.PI) / 180), y: -Math.cos((ALPHA * Math.PI) / 180) }
const ROD = { x: Math.cos((BETA * Math.PI) / 180), y: -Math.sin((BETA * Math.PI) / 180) }

const N_END = { x: CONTACT.x + 70 * NORMAL.x, y: CONTACT.y + 70 * NORMAL.y }
const S_END = { x: CENTER.x + 80 * ROD.x, y: CENTER.y + 80 * ROD.y }

export function CylinderRampRodAnimation({ index, playing, sceneProgress }: SolutionAnimationProps) {
  const reveal = revealAt(playing, sceneProgress)
  const showWeight = index >= 1
  const showAngles = index >= 2
  const showForces = index >= 4
  const showSigns = index >= 5
  const showCheck = index >= 7

  const loadMotion = playing
    ? { opacity: [0.68, 1, 0.68], transition: { duration: 1.9, repeat: Number.POSITIVE_INFINITY } }
    : { opacity: 1 }

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 340"
          role="img"
          aria-label="Walec na równi pochyłej połączony prętem z nieruchomym punktem"
        >
          <title>Walec na równi z prętem dwusiłowym</title>
          <desc>
            Jednorodny walec leży na gładkiej równi o kącie alfa. Pręt dwusiłowy pod kątem beta łączy środek walca z
            nieruchomym przegubem. Pokazano ciężar G, reakcję równi N i siłę w pręcie S.
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

          <line x1={L.x} y1={L.y} x2={RAMP_END.x} y2={RAMP_END.y} stroke={SCHEMA.edge} strokeWidth={3} />
          <line x1={RAMP_END.x} y1={RAMP_END.y} x2={RAMP_END.x} y2={L.y} stroke={SCHEMA.edge} strokeWidth={2.4} />
          <line x1="40" y1={L.y} x2="390" y2={L.y} stroke={SCHEMA.edge} strokeWidth={3} />
          {Array.from({ length: 14 }, (_, step) => (
            <line
              key={step}
              x1={52 + step * 24}
              y1={L.y}
              x2={44 + step * 24}
              y2={L.y + 12}
              stroke={SCHEMA.edge}
              strokeWidth={1.1}
              opacity={0.65}
            />
          ))}

          <circle cx={CENTER.x} cy={CENTER.y} r={R} fill="#f6f9fd" stroke={SCHEMA.edge} strokeWidth={2.6} />
          <line x1={CENTER.x} y1={CENTER.y} x2={PIN.x} y2={PIN.y} stroke={SCHEMA.edge} strokeWidth={5} />
          <circle cx={CENTER.x} cy={CENTER.y} r="4.2" fill={SCHEMA.ink} />
          <circle cx={PIN.x} cy={PIN.y} r="5" fill="#ffffff" stroke={SCHEMA.edge} strokeWidth={2.4} />
          <line x1="303.6" y1="78.6" x2="321.6" y2="109.8" stroke={SCHEMA.edge} strokeWidth={2.4} />
          {Array.from({ length: 4 }, (_, step) => {
            const x = 306 + step * 4
            const y = 83 + step * 7
            return (
              <line
                key={step}
                x1={x}
                y1={y}
                x2={x + 8}
                y2={y - 4}
                stroke={SCHEMA.edge}
                strokeWidth={1.1}
                opacity={0.65}
              />
            )
          })}

          {showWeight && (
            <motion.g initial={false} animate={loadMotion}>
              <Arrow from={CENTER} to={{ x: CENTER.x, y: 248 }} color={SCHEMA.load} width={3.4} />
              <Label x={200} y={262} size={10} color={SCHEMA.load} anchor="middle">
                G = 20 N
              </Label>
            </motion.g>
          )}

          {showAngles && (
            <motion.g initial={false} animate={{ opacity: reveal }} transition={{ duration: 0.25 }}>
              <path
                d={`M ${L.x + 50} ${L.y} A 50 50 0 0 0 ${L.x + 43.3} ${L.y - 25}`}
                fill="none"
                stroke={SCHEMA.muted}
                strokeWidth={1.4}
              />
              <Label x={116} y={291} size={10} color={SCHEMA.muted}>
                α = 30°
              </Label>
              <line
                x1={PIN.x}
                y1={PIN.y}
                x2="255"
                y2={PIN.y}
                stroke={SCHEMA.muted}
                strokeWidth={1.1}
                strokeDasharray="5 4"
              />
              <path
                d={`M ${PIN.x - 24.2} ${PIN.y + 14} A 28 28 0 0 1 ${PIN.x - 28} ${PIN.y}`}
                fill="none"
                stroke={SCHEMA.muted}
                strokeWidth={1.4}
              />
              <Label x={264} y={84} size={10} color={SCHEMA.muted}>
                β = 30°
              </Label>
            </motion.g>
          )}

          {showForces && (
            <motion.g initial={false} animate={{ opacity: reveal }} transition={{ duration: 0.25 }}>
              <Arrow from={CONTACT} to={N_END} color={SCHEMA.reaction} width={3.4} />
              <Label x={116} y={176} size={9.5} color={SCHEMA.reaction} anchor="end" weight={700}>
                N = {pl(N, 2)} N
              </Label>
              <Arrow from={CENTER} to={S_END} color={SCHEMA.member} width={3.4} />
              <Label x={250} y={126} size={9.5} color={SCHEMA.member} weight={700}>
                S = {pl(S, 2)} N
              </Label>
            </motion.g>
          )}

          <text x="230" y="326" textAnchor="middle" fontSize="9.5" fill={showCheck ? SCHEMA.reaction : SCHEMA.muted}>
            {showCheck
              ? 'Kontrola: −N·sinα + S·cosβ = 0 oraz N·cosα + S·sinβ = G'
              : showSigns
                ? 'S > 0 — pręt rozciągany; N > 0 — walec pozostaje na równi'
                : showForces
                  ? 'Rzuty na osie x i y dają układ równań na N i S'
                  : showAngles
                    ? 'Kąt α opisuje równię, β — nachylenie pręta do poziomu'
                    : showWeight
                      ? 'Ciężar G działa pionowo w środku walca'
                      : 'Walec na gładkiej równi, pręt dwusiłowy do nieruchomego przegubu'}
          </text>
        </svg>
      </div>
    </div>
  )
}
