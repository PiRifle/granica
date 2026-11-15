import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'
import {
  Arrow,
  Beam,
  Dimension,
  Label,
  PinSupport,
  RollerSupport,
  SCHEMA,
  revealAt,
} from '../../../components/solution-figures/statics-schematic'
import { pl } from '../../solution-factories/core/source-task'

const P = 20
const L = 4
const ALPHA = 60
const COS = Math.cos((ALPHA * Math.PI) / 180)
const SIN = Math.sin((ALPHA * Math.PI) / 180)
const AX = -P * COS
const BY = (P * SIN) / 2
const AY = BY

const A = { x: 100, y: 205 }
const B = { x: 380, y: 205 }
const M = { x: 240, y: 205 }
const TAIL = { x: M.x - 64 * COS, y: M.y - 64 * SIN }
const PX_END = { x: TAIL.x + 64 * COS, y: TAIL.y }

export function SkewLoadBeamAnimation({ index, playing, sceneProgress }: SolutionAnimationProps) {
  const reveal = revealAt(playing, sceneProgress)
  const showLoad = index >= 1
  const showComponents = index === 1 || index === 2 || index >= 6
  const showDims = index >= 2
  const showBy = index >= 3
  const showReactions = index >= 4
  const showCheck = index >= 7

  const loadMotion = playing
    ? { opacity: [0.68, 1, 0.68], transition: { duration: 1.9, repeat: Number.POSITIVE_INFINITY } }
    : { opacity: 1 }

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg viewBox="0 0 460 340" role="img" aria-label="Belka na przegubie i rolce obciążona ukośną siłą P">
          <title>Belka AB z ukośną siłą P</title>
          <desc>
            Pozioma belka o długości L na przegubie A i rolce B. Siła P działa w połowie długości pod kątem alfa do
            belki. Ukazane są składowe P, wymiary oraz reakcje A_x, A_y i B_y.
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

          <Beam x1={A.x} x2={B.x} y={A.y} height={13} />
          <PinSupport x={A.x} y={A.y} />
          <RollerSupport x={B.x} y={B.y} />
          <Label x={A.x - 4} y={A.y - 12} size={10.5} color={SCHEMA.ink} anchor="end">
            A
          </Label>
          <Label x={B.x + 4} y={B.y - 12} size={10.5} color={SCHEMA.ink}>
            B
          </Label>

          {showDims && (
            <motion.g initial={false} animate={{ opacity: reveal }} transition={{ duration: 0.25 }}>
              <Dimension
                from={{ x: A.x, y: 252 }}
                to={{ x: M.x, y: 252 }}
                label="L/2 = 2 m"
                labelOffset={{ x: 0, y: -6 }}
              />
              <Dimension
                from={{ x: A.x, y: 276 }}
                to={{ x: B.x, y: 276 }}
                label="L = 4 m"
                labelOffset={{ x: 0, y: -6 }}
              />
            </motion.g>
          )}

          {showLoad && (
            <motion.g initial={false} animate={loadMotion}>
              <Arrow from={TAIL} to={M} color={SCHEMA.load} width={3.6} />
              <path
                d={`M ${M.x - 38} ${M.y} A 38 38 0 0 1 ${M.x - 19} ${M.y - 32.9}`}
                fill="none"
                stroke={SCHEMA.load}
                strokeWidth={1.4}
              />
              <Label x={M.x - 31} y={M.y - 17} size={10} color={SCHEMA.load}>
                α
              </Label>
              <Label x={TAIL.x - 24} y={TAIL.y - 24} size={10} color={SCHEMA.load} anchor="end">
                P = 20 kN
              </Label>
            </motion.g>
          )}

          {showLoad && showComponents && (
            <motion.g initial={false} animate={{ opacity: reveal }} transition={{ duration: 0.25 }}>
              <line
                x1={TAIL.x}
                y1={TAIL.y}
                x2={PX_END.x}
                y2={PX_END.y}
                stroke={SCHEMA.load}
                strokeWidth={1.2}
                strokeDasharray="5 4"
              />
              <line
                x1={PX_END.x}
                y1={PX_END.y}
                x2={M.x}
                y2={M.y - 10}
                stroke={SCHEMA.load}
                strokeWidth={1.2}
                strokeDasharray="5 4"
              />
              <Label x={(TAIL.x + PX_END.x) / 2} y={TAIL.y - 6} size={9} color={SCHEMA.load} anchor="middle">
                P_x = {pl(P * COS, 1)} kN
              </Label>
              <Label x={M.x + 10} y={M.y - 18} size={9} color={SCHEMA.load}>
                P_y = −{pl(P * SIN, 1)} kN
              </Label>
            </motion.g>
          )}

          {showBy && (
            <motion.g initial={false} animate={{ opacity: reveal }} transition={{ duration: 0.25 }}>
              <Arrow from={{ x: B.x, y: B.y }} to={{ x: B.x, y: B.y - 56 }} color={SCHEMA.reaction} width={3.2} />
              <Label x={B.x - 8} y={B.y - 64} size={9.5} color={SCHEMA.reaction} anchor="end" weight={700}>
                B_y = {pl(BY, 2)} kN
              </Label>
              <path
                d={`M ${A.x} ${A.y - 26} A 26 26 0 0 1 ${A.x + 26} ${A.y}`}
                fill="none"
                stroke={SCHEMA.moment}
                strokeWidth={1.4}
              />
              <Label x={A.x + 30} y={A.y - 18} size={9} color={SCHEMA.moment}>
                ΣM_A
              </Label>
            </motion.g>
          )}

          {showReactions && (
            <motion.g initial={false} animate={{ opacity: reveal }} transition={{ duration: 0.25 }}>
              <Arrow from={{ x: A.x, y: A.y }} to={{ x: A.x - 50, y: A.y }} color={SCHEMA.reaction} width={3.2} />
              <Label x={8} y={A.y - 9} size={9.5} color={SCHEMA.reaction} weight={700}>
                A_x = −{pl(Math.abs(AX), 2)} kN
              </Label>
              <Arrow from={{ x: A.x, y: A.y }} to={{ x: A.x, y: A.y - 56 }} color={SCHEMA.reaction} width={3.2} />
              <Label x={A.x + 8} y={A.y - 44} size={9.5} color={SCHEMA.reaction} weight={700}>
                A_y = {pl(AY, 2)} kN
              </Label>
            </motion.g>
          )}

          <text x="230" y="326" textAnchor="middle" fontSize="9.5" fill={showCheck ? SCHEMA.reaction : SCHEMA.muted}>
            {showCheck
              ? 'Kontrola: ΣF_x = 0, ΣF_y = 0, ΣM_B = −A_y·L + P·sinα·L/2 = 0'
              : showReactions
                ? 'A_x równoważy poziomą składową P; A_y i B_y dzielą pionową składową po połowie'
                : showBy
                  ? 'Moment względem A eliminuje A_x i A_y i wyznacza B_y'
                  : showLoad
                    ? 'P rozkładamy na P_x = P·cosα i P_y = −P·sinα'
                    : 'Belka AB: przegub A, rolka B, siła P w połowie długości'}
          </text>
        </svg>
      </div>
    </div>
  )
}
