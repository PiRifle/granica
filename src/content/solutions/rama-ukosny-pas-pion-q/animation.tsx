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
const X6 = 388
const Y = 240
const S = 48
const C = { x: X0 + 2 * S, y: Y - 1.5 * S }
const TOP = { x: X6, y: Y - 3 * S }
const B = { x: X6, y: Y }
const P1_X = X0 + S
const MOMENT_POINT = { x: X0 + 4 * S, y: Y - 2.25 * S }

export function ASlopedFrameAnimation({ index, playing, sceneProgress }: SolutionAnimationProps) {
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
        <svg
          viewBox="0 0 460 340"
          role="img"
          aria-label="Rama z ukośnym pasem, pionem z obciążeniem q, siłą P1 i momentem"
        >
          <title>Schemat 4 — rama z ukośnym pasem i pionem obciążonym q</title>
          <desc>
            Pozioma belka od A, krótki pion, ukośny pas z momentem, prawy pion obciążony poziomo siłą q oraz reakcje
            A_x, A_y i B_y.
          </desc>
          <defs>
            <marker id="a4-load" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0 0L10 5L0 10Z" fill={LOAD} />
            </marker>
            <marker id="a4-moment" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0 0L10 5L0 10Z" fill={MOMENT} />
            </marker>
            <marker
              id="a4-reaction"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={REACTION} />
            </marker>
            <marker id="a4-axis" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
              <path d="M0 0L10 5L0 10Z" fill={MUTED} />
            </marker>
          </defs>

          <g stroke={MUTED} strokeWidth="1.2">
            <line x1="16" y1="28" x2="34" y2="28" markerEnd="url(#a4-axis)" />
            <line x1="16" y1="28" x2="16" y2="10" markerEnd="url(#a4-axis)" />
          </g>
          <Label x={37} y={31} size={8} color={MUTED}>
            x
          </Label>
          <Label x={10} y={13} size={8} color={MUTED}>
            y
          </Label>

          <g stroke={EDGE} strokeWidth="5" strokeLinecap="round" fill="none">
            <line x1={X0} y1={Y} x2={C.x} y2={Y} />
            <line x1={C.x} y1={Y} x2={C.x} y2={C.y} />
            <line x1={C.x} y1={C.y} x2={TOP.x} y2={TOP.y} />
            <line x1={TOP.x} y1={TOP.y} x2={B.x} y2={B.y} />
          </g>

          <PinSupport x={X0} y={Y} />
          <RollerSupport x={B.x} y={B.y} />
          <Label x={X0 + 9} y={Y - 10} size={10} color={INK}>
            A
          </Label>
          <Label x={B.x + 8} y={B.y - 10} size={10} color={INK}>
            B
          </Label>
          <Label x={C.x - 10} y={C.y - 8} size={10} color={INK} anchor="end">
            C
          </Label>

          <Dimension
            from={{ x: 420, y: TOP.y }}
            to={{ x: 420, y: Y }}
            label="3 m"
            labelOffset={{ x: 14, y: 0 }}
            size={8}
          />
          <Dimension
            from={{ x: X0, y: 285 }}
            to={{ x: P1_X, y: 285 }}
            label="1 m"
            labelOffset={{ x: 0, y: -6 }}
            size={9}
          />
          <Dimension
            from={{ x: P1_X, y: 285 }}
            to={{ x: C.x, y: 285 }}
            label="1 m"
            labelOffset={{ x: 0, y: -6 }}
            size={9}
          />
          <Dimension
            from={{ x: C.x, y: 285 }}
            to={{ x: X6, y: 285 }}
            label="4 m"
            labelOffset={{ x: 0, y: -6 }}
            size={9}
          />

          {showLoads && (
            <motion.g initial={false} animate={{ opacity: reveal }} transition={{ duration: 0.25 }}>
              <motion.line
                x1={P1_X}
                y1="205"
                x2={P1_X}
                y2={Y - 2}
                stroke={LOAD}
                strokeWidth="3.4"
                strokeLinecap="round"
                markerEnd="url(#a4-load)"
                initial={false}
                animate={playing ? { opacity: [0.65, 1, 0.65] } : { opacity: 1 }}
                transition={playing ? { duration: 1.8, repeat: Number.POSITIVE_INFINITY } : { duration: 0.2 }}
              />
              <Label x={P1_X - 10} y={198} size={9} color={LOAD} anchor="end">
                P₁ = {pl(config.p1, 0)} kN
              </Label>

              <g stroke={LOAD} strokeWidth="1.4">
                {Array.from({ length: 10 }, (_, step) => {
                  const y = TOP.y + ((Y - TOP.y) * step) / 9
                  return (
                    <line
                      key={`q-${step}`}
                      x1="370"
                      y1={y}
                      x2="386"
                      y2={y}
                      markerEnd="url(#a4-load)"
                      opacity={0.55 + step * 0.04}
                    />
                  )
                })}
              </g>
              <Label x={434} y={88} size={9} color={LOAD} anchor="end">
                q = {pl(config.q, 1)} kN/m
              </Label>

              <motion.g
                initial={false}
                animate={playing ? { opacity: [0.7, 1, 0.7] } : { opacity: 1 }}
                transition={playing ? { duration: 2.2, repeat: Number.POSITIVE_INFINITY } : { duration: 0.2 }}
              >
                <path
                  d={`M ${MOMENT_POINT.x - 15} ${MOMENT_POINT.y + 8} A 17 17 0 1 1 ${MOMENT_POINT.x + 15} ${MOMENT_POINT.y - 4}`}
                  fill="none"
                  stroke={MOMENT}
                  strokeWidth="2"
                />
                <path
                  d={`M ${MOMENT_POINT.x + 15} ${MOMENT_POINT.y - 4} L ${MOMENT_POINT.x + 8} ${MOMENT_POINT.y - 8} L ${MOMENT_POINT.x + 13} ${MOMENT_POINT.y - 15} Z`}
                  fill={MOMENT}
                />
              </motion.g>
              <Label x={MOMENT_POINT.x} y={MOMENT_POINT.y - 24} size={9} color={MOMENT} anchor="middle">
                M = {pl(config.moment, 0)} kN·m
              </Label>
            </motion.g>
          )}

          {showBy && (
            <motion.g initial={false} animate={{ opacity: reveal }} transition={{ duration: 0.25 }}>
              <line
                x1="412"
                y1="290"
                x2="412"
                y2="245"
                stroke={REACTION}
                strokeWidth="3"
                markerEnd="url(#a4-reaction)"
              />
              {showByValue && (
                <Label x={412} y={306} size={9} color={REACTION} anchor="middle" weight={700}>
                  B_y = {pl(By, 2)} kN
                </Label>
              )}
            </motion.g>
          )}

          {showAx && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
              <line
                x1={X0}
                y1="258"
                x2={X0 + 45}
                y2="258"
                stroke={REACTION}
                strokeWidth="3"
                markerEnd="url(#a4-reaction)"
              />
              <Label x={X0 + 18} y={252} size={9} color={REACTION} weight={700}>
                A_x = {pl(Ax, 2)} kN
              </Label>
            </motion.g>
          )}

          {showAy && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
              <line x1="76" y1="290" x2="76" y2="245" stroke={REACTION} strokeWidth="3" markerEnd="url(#a4-reaction)" />
              <Label x={8} y={304} size={9} color={REACTION} weight={700}>
                A_y = {pl(Ay, 2)} kN
              </Label>
            </motion.g>
          )}

          <text x="230" y="330" textAnchor="middle" fontSize="9" fill={showCheck ? REACTION : MUTED}>
            {showCheck
              ? 'Kontrola: ΣFx = 0, ΣFy = 0, ΣM(1;1) = 0'
              : 'Belka z pionem C, ukośnym pasem i pionem q przy B'}
          </text>
        </svg>
      </div>
    </div>
  )
}
