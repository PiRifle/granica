import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'
import { config, values } from './task'
import { pl } from '../../solution-factories/core/source-task'
import { Dimension, Label, PinSupport, RollerSupport, SCHEMA, revealAt } from '../../../components/solution-figures/statics-schematic'

const [Ax, Ay, By] = values

const LOAD = SCHEMA.load
const MOMENT = SCHEMA.moment
const REACTION = SCHEMA.reaction
const INK = SCHEMA.ink
const MUTED = SCHEMA.muted
const EDGE = SCHEMA.edge

const X0 = 100
const X6 = 400
const Y = 240
const S = 50
const TOP = Y - 3.5 * S
const ELBOW = { x: X0 + 5 * S, y: Y - 2 * S }
const C = { x: X6, y: Y - 2 * S }
const B = { x: X6, y: Y }
const P1_POINT = { x: X0 + 4.6 * S, y: TOP + (ELBOW.y - TOP) * 0.92 }
const P1_END = { x: P1_POINT.x - 15, y: P1_POINT.y + 49 }

const AxLabel = `A_x = −${pl(Math.abs(Ax), 2)} kN`
const AyLabel = `A_y = −${pl(Math.abs(Ay), 2)} kN`
const ByLabel = `B_y = ${pl(By, 2)} kN`

export function AFrameReactionsAnimation({ index, playing, sceneProgress }: SolutionAnimationProps) {
  const reveal = revealAt(playing, sceneProgress)
  const showLoads = index >= 1
  const showBy = index >= 3
  const showByValue = index >= 4
  const showAx = index >= 5
  const showAy = index >= 5
  const showCheck = index >= 7

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg viewBox="0 0 460 340" role="img" aria-label="Rama z obciążeniem ciągłym, siłą P1 i momentem">
          <title>Schemat 1 — rama z przegubem A i rolką B</title>
          <desc>
            Lewy pion obciążony poziomo siłą q, pochyły pas z siłą P1 prostopadłą do pasa, moment przy C oraz reakcje
            A_x, A_y i B_y.
          </desc>
          <defs>
            <marker id="a1-load" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0 0L10 5L0 10Z" fill={LOAD} />
            </marker>
            <marker id="a1-moment" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0 0L10 5L0 10Z" fill={MOMENT} />
            </marker>
            <marker
              id="a1-reaction"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={REACTION} />
            </marker>
            <marker id="a1-axis" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
              <path d="M0 0L10 5L0 10Z" fill={MUTED} />
            </marker>
          </defs>

          <g stroke={MUTED} strokeWidth="1.2">
            <line x1="16" y1="28" x2="34" y2="28" markerEnd="url(#a1-axis)" />
            <line x1="16" y1="28" x2="16" y2="10" markerEnd="url(#a1-axis)" />
          </g>
          <Label x={37} y={31} size={8} color={MUTED}>
            x
          </Label>
          <Label x={10} y={13} size={8} color={MUTED}>
            y
          </Label>

          <g stroke={EDGE} strokeWidth="5" strokeLinecap="round" fill="none">
            <line x1={X0} y1={Y} x2={X0} y2={TOP} />
            <line x1={X0} y1={TOP} x2={ELBOW.x} y2={ELBOW.y} />
            <line x1={ELBOW.x} y1={ELBOW.y} x2={C.x} y2={C.y} />
            <line x1={C.x} y1={C.y} x2={B.x} y2={B.y} />
          </g>

          <PinSupport x={X0} y={Y} />
          <RollerSupport x={B.x} y={B.y} />
          <Label x={X0 + 9} y={Y - 10} size={10} color={INK}>
            A
          </Label>
          <Label x={B.x - 9} y={B.y - 10} size={10} color={INK} anchor="end">
            B
          </Label>
          <Label x={C.x + 8} y={C.y + 34} size={10} color={INK}>
            C
          </Label>

          <Dimension
            from={{ x: 70, y: TOP }}
            to={{ x: 70, y: Y }}
            label="3,5 m"
            labelOffset={{ x: -24, y: 0 }}
            size={9}
          />
          <Dimension
            from={{ x: 430, y: C.y }}
            to={{ x: 430, y: Y }}
            label="2 m"
            labelOffset={{ x: 14, y: 0 }}
            size={8}
          />
          <Dimension
            from={{ x: X0, y: 285 }}
            to={{ x: X0 + 4 * S, y: 285 }}
            label="4 m"
            labelOffset={{ x: 0, y: -6 }}
            size={9}
          />
          <Dimension
            from={{ x: X0 + 4 * S, y: 285 }}
            to={{ x: ELBOW.x, y: 285 }}
            label="1 m"
            labelOffset={{ x: 0, y: -6 }}
            size={9}
          />
          <Dimension
            from={{ x: ELBOW.x, y: 285 }}
            to={{ x: X6, y: 285 }}
            label="1 m"
            labelOffset={{ x: 0, y: -6 }}
            size={9}
          />

          {showLoads && (
            <motion.g initial={false} animate={{ opacity: reveal }} transition={{ duration: 0.25 }}>
              <g stroke={LOAD} strokeWidth="1.4">
                {Array.from({ length: 10 }, (_, step) => {
                  const y = TOP + ((Y - TOP) * step) / 9
                  return (
                    <line
                      key={`q-${step}`}
                      x1="78"
                      y1={y}
                      x2="98"
                      y2={y}
                      markerEnd="url(#a1-load)"
                      opacity={0.55 + step * 0.04}
                    />
                  )
                })}
              </g>
              <Label x={94} y={48} size={9} color={LOAD}>
                q = {pl(config.q, 1)} kN/m
              </Label>

              <motion.line
                x1={P1_POINT.x}
                y1={P1_POINT.y}
                x2={P1_END.x}
                y2={P1_END.y}
                stroke={LOAD}
                strokeWidth="3.4"
                strokeLinecap="round"
                markerEnd="url(#a1-load)"
                initial={false}
                animate={playing ? { opacity: [0.65, 1, 0.65] } : { opacity: 1 }}
                transition={playing ? { duration: 1.8, repeat: Number.POSITIVE_INFINITY } : { duration: 0.2 }}
              />
              <Label x={P1_END.x - 6} y={P1_END.y + 16} size={9} color={LOAD} anchor="end">
                P₁ = {pl(config.p1, 0)} kN
              </Label>

              <motion.g
                initial={false}
                animate={playing ? { opacity: [0.7, 1, 0.7] } : { opacity: 1 }}
                transition={playing ? { duration: 2.2, repeat: Number.POSITIVE_INFINITY } : { duration: 0.2 }}
              >
                <path
                  d={`M ${C.x - 18} ${C.y - 12} A 18 18 0 1 1 ${C.x - 10} ${C.y + 15}`}
                  fill="none"
                  stroke={MOMENT}
                  strokeWidth="2"
                />
                <path
                  d={`M ${C.x - 10} ${C.y + 15} L ${C.x - 18} ${C.y + 13} L ${C.x - 13} ${C.y + 22} Z`}
                  fill={MOMENT}
                />
              </motion.g>
              <Label x={C.x - 4} y={C.y - 24} size={9} color={MOMENT} anchor="end">
                M = {pl(config.moment, 0)} kN·m
              </Label>
            </motion.g>
          )}

          {showBy && (
            <motion.g initial={false} animate={{ opacity: reveal }} transition={{ duration: 0.25 }}>
              <line
                x1="420"
                y1="290"
                x2="420"
                y2="245"
                stroke={REACTION}
                strokeWidth="3"
                markerEnd="url(#a1-reaction)"
              />
              {showByValue && (
                <Label x={420} y={306} size={9} color={REACTION} anchor="middle" weight={700}>
                  {ByLabel}
                </Label>
              )}
            </motion.g>
          )}

          {showAx && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
              <line x1={X0} y1="258" x2="55" y2="258" stroke={REACTION} strokeWidth="3" markerEnd="url(#a1-reaction)" />
              <Label x={8} y={250} size={9} color={REACTION} weight={700}>
                {AxLabel}
              </Label>
            </motion.g>
          )}

          {showAy && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
              <line x1={X0} y1="205" x2={X0} y2="237" stroke={REACTION} strokeWidth="3" markerEnd="url(#a1-reaction)" />
              <Label x={X0 + 10} y={197} size={9} color={REACTION} weight={700}>
                {AyLabel}
              </Label>
            </motion.g>
          )}

          <text x="230" y="330" textAnchor="middle" fontSize="9" fill={showCheck ? REACTION : MUTED}>
            {showCheck ? 'Kontrola: ΣFx = 0, ΣFy = 0, ΣM(1;1) = 0' : 'Rama: pion q, pochyły pas P₁, moment M i rolka B'}
          </text>
        </svg>
      </div>
    </div>
  )
}
