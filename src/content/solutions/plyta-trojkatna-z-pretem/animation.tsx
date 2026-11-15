import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'
import { Arrow, Dimension, Label, PinSupport, SCHEMA, revealAt } from '../../../components/solution-figures/statics-schematic'
import { pl } from '../../solution-factories/core/source-task'

const L = 2
const P = 48
const H = L / 2
const S = -2 * P
const AX = -S
const AY = P

const A = { x: 160, y: 250 }
const TOP = { x: 160, y: 145 }
const V = { x: 360, y: 250 }
const WALL_PIN = { x: 78, y: 145 }

export function TriangularPlateAnimation({ index, playing, sceneProgress }: SolutionAnimationProps) {
  const reveal = revealAt(playing, sceneProgress)
  const showLoad = index >= 1
  const showDims = index >= 2
  const showMoment = index >= 3
  const showRodForce = index >= 4
  const showReactions = index >= 5
  const showCheck = index >= 7

  const loadMotion = playing
    ? { opacity: [0.68, 1, 0.68], transition: { duration: 1.9, repeat: Number.POSITIVE_INFINITY } }
    : { opacity: 1 }

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg viewBox="0 0 460 340" role="img" aria-label="Trójkątna płyta na przegubie i poziomym pręcie">
          <title>Trójkątna płyta AVT z prętem poziomym</title>
          <desc>
            Trójkątna płyta o podstawie L i wysokości L/2 jest podparta przegubem w A i poziomym prętem w górnym węźle.
            W prawym węźle działa pionowa siła P. Pokazano reakcje A_x, A_y oraz siłę S w pręcie.
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

          <g stroke={SCHEMA.edge} strokeWidth={3.4} strokeLinecap="round" fill="none">
            <line x1={TOP.x} y1={TOP.y} x2={V.x} y2={V.y} />
            <line x1={V.x} y1={V.y} x2={A.x} y2={A.y} />
            <line x1={A.x} y1={A.y} x2={TOP.x} y2={TOP.y} />
          </g>
          <line x1="70" y1="100" x2="70" y2="190" stroke={SCHEMA.edge} strokeWidth={3} />
          {Array.from({ length: 9 }, (_, step) => (
            <line
              key={step}
              x1="70"
              y1={104 + step * 10}
              x2="58"
              y2={112 + step * 10}
              stroke={SCHEMA.edge}
              strokeWidth={1.1}
              opacity={0.65}
            />
          ))}
          <line x1={WALL_PIN.x} y1={WALL_PIN.y} x2={TOP.x} y2={TOP.y} stroke={SCHEMA.edge} strokeWidth={4.4} />
          <circle cx={WALL_PIN.x} cy={WALL_PIN.y} r="4" fill={SCHEMA.edge} />
          <circle cx={TOP.x} cy={TOP.y} r="4.5" fill={SCHEMA.ink} />

          <PinSupport x={A.x} y={A.y} />
          <Label x={142} y={270} size={10.5} color={SCHEMA.ink} anchor="end">
            A
          </Label>
          <Label x={168} y={141} size={10.5} color={SCHEMA.ink}>
            T
          </Label>
          <Label x={352} y={268} size={10.5} color={SCHEMA.ink} anchor="end">
            V
          </Label>
          <Label x={64} y={94} size={8.5} color={SCHEMA.muted} anchor="end">
            ściana
          </Label>

          {showDims && (
            <motion.g initial={false} animate={{ opacity: reveal }} transition={{ duration: 0.25 }}>
              <Dimension
                from={{ x: 130, y: TOP.y }}
                to={{ x: 130, y: A.y }}
                label="L/2 = 1 m"
                offset={14}
                labelOffset={{ x: 0, y: -60 }}
                size={9}
              />
              <Dimension
                from={{ x: A.x, y: 288 }}
                to={{ x: V.x, y: 288 }}
                label="L = 2 m"
                labelOffset={{ x: 0, y: -6 }}
              />
            </motion.g>
          )}

          {showLoad && (
            <motion.g initial={false} animate={loadMotion}>
              <Arrow from={{ x: V.x, y: V.y }} to={{ x: V.x, y: 312 }} color={SCHEMA.load} width={3.4} />
              <Label x={370} y={294} size={10} color={SCHEMA.load}>
                P = 48 kN
              </Label>
            </motion.g>
          )}

          {showMoment && (
            <motion.g initial={false} animate={{ opacity: reveal }} transition={{ duration: 0.25 }}>
              <path
                d={`M ${A.x} ${A.y - 26} A 26 26 0 0 1 ${A.x + 26} ${A.y}`}
                fill="none"
                stroke={SCHEMA.moment}
                strokeWidth={1.4}
              />
              <Label x={196} y={220} size={9} color={SCHEMA.moment}>
                ΣM_A
              </Label>
            </motion.g>
          )}

          {showRodForce && (
            <motion.g initial={false} animate={{ opacity: reveal }} transition={{ duration: 0.25 }}>
              <Arrow from={TOP} to={{ x: 96, y: 145 }} color={SCHEMA.tension} width={3.4} />
              <Label x={96} y={120} size={9.5} color={SCHEMA.tension} weight={700}>
                S = {pl(Math.abs(S), 2)} kN
              </Label>
            </motion.g>
          )}

          {showReactions && (
            <motion.g initial={false} animate={{ opacity: reveal }} transition={{ duration: 0.25 }}>
              <Arrow from={A} to={{ x: 214, y: A.y }} color={SCHEMA.reaction} width={3.2} />
              <Label x={168} y={240} size={9.5} color={SCHEMA.reaction} weight={700}>
                A_x = {pl(AX, 2)} kN
              </Label>
              <Arrow from={A} to={{ x: A.x, y: 198 }} color={SCHEMA.reaction} width={3.2} />
              <Label x={168} y={194} size={9.5} color={SCHEMA.reaction} weight={700}>
                A_y = {pl(AY, 2)} kN
              </Label>
            </motion.g>
          )}

          <text x="230" y="326" textAnchor="middle" fontSize="9.5" fill={showCheck ? SCHEMA.reaction : SCHEMA.muted}>
            {showCheck
              ? 'Kontrola: ΣM_T = A_x·L/2 − P·L = 0 oraz ΣF_x = 0, ΣF_y = 0'
              : showReactions
                ? 'S ujemne w równaniu oznacza zwrot w lewo; pręt jest rozciągany'
                : showRodForce
                  ? 'Moment względem A: S·L/2 = P·L, więc |S| = 2P'
                  : showLoad
                    ? 'Siła P działa pionowo w prawym węźle V'
                    : 'Płyta AVT: przegub A, poziomy pręt w T, siła P w V'}
          </text>
        </svg>
      </div>
    </div>
  )
}
