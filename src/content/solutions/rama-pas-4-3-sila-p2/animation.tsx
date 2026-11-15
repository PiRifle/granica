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

const X0 = 80
const X8 = 400
const Y = 235
const S = 40
const ELBOW = { x: X0 + 2 * S, y: Y }
const TOP_LEFT = { x: X0 + 6 * S, y: Y - 3 * S }
const C = { x: X8, y: TOP_LEFT.y }
const B = { x: X8, y: Y }
const P1_POINT = { x: X0 + 4 * S, y: Y - 1.5 * S }
const P1_END = { x: P1_POINT.x + 33, y: P1_POINT.y + 44 }

export function AAngledFrameAnimation({ index, playing, sceneProgress }: SolutionAnimationProps) {
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
        <svg viewBox="0 0 460 340" role="img" aria-label="Rama z ukośnym pasem, siłą P1, P2, momentem i obciążeniem q">
          <title>Schemat 2 — rama z pochyłym pasem</title>
          <desc>
            Belka pozioma od A, pochyły pas z siłą P1 prostopadłą do niego, odcinek górny z obciążeniem q, pion z siłą
            P2 oraz reakcje A_x, A_y i B_y.
          </desc>
          <defs>
            <marker id="a2-load" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0 0L10 5L0 10Z" fill={LOAD} />
            </marker>
            <marker id="a2-moment" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0 0L10 5L0 10Z" fill={MOMENT} />
            </marker>
            <marker
              id="a2-reaction"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={REACTION} />
            </marker>
            <marker id="a2-axis" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
              <path d="M0 0L10 5L0 10Z" fill={MUTED} />
            </marker>
          </defs>

          <g stroke={MUTED} strokeWidth="1.2">
            <line x1="16" y1="28" x2="34" y2="28" markerEnd="url(#a2-axis)" />
            <line x1="16" y1="28" x2="16" y2="10" markerEnd="url(#a2-axis)" />
          </g>
          <Label x={37} y={31} size={8} color={MUTED}>
            x
          </Label>
          <Label x={10} y={13} size={8} color={MUTED}>
            y
          </Label>

          <g stroke={EDGE} strokeWidth="5" strokeLinecap="round" fill="none">
            <line x1={X0} y1={Y} x2={ELBOW.x} y2={ELBOW.y} />
            <line x1={ELBOW.x} y1={ELBOW.y} x2={TOP_LEFT.x} y2={TOP_LEFT.y} />
            <line x1={TOP_LEFT.x} y1={TOP_LEFT.y} x2={C.x} y2={C.y} />
            <line x1={C.x} y1={C.y} x2={B.x} y2={B.y} />
          </g>

          <PinSupport x={X0} y={Y} />
          <RollerSupport x={B.x} y={B.y} />
          <Label x={X0 - 10} y={Y - 10} size={10} color={INK} anchor="end">
            A
          </Label>
          <Label x={B.x + 8} y={B.y - 10} size={10} color={INK}>
            B
          </Label>
          <Label x={C.x + 6} y={C.y + 13} size={10} color={INK}>
            C
          </Label>

          <Dimension
            from={{ x: 60, y: TOP_LEFT.y }}
            to={{ x: 60, y: Y }}
            label="3 m"
            labelOffset={{ x: -18, y: 0 }}
            size={9}
          />
          <Dimension
            from={{ x: 385, y: TOP_LEFT.y }}
            to={{ x: 385, y: Y - 1.5 * S }}
            label="1,5 m"
            labelOffset={{ x: -26, y: 0 }}
            size={8}
          />
          <Dimension
            from={{ x: 385, y: Y - 1.5 * S }}
            to={{ x: 385, y: Y }}
            label="1,5 m"
            labelOffset={{ x: -26, y: 0 }}
            size={8}
          />
          <Dimension
            from={{ x: X0, y: 285 }}
            to={{ x: ELBOW.x, y: 285 }}
            label="2 m"
            labelOffset={{ x: 0, y: -6 }}
            size={9}
          />
          <Dimension
            from={{ x: ELBOW.x, y: 285 }}
            to={{ x: X0 + 4 * S, y: 285 }}
            label="2 m"
            labelOffset={{ x: 0, y: -6 }}
            size={9}
          />
          <Dimension
            from={{ x: X0 + 4 * S, y: 285 }}
            to={{ x: TOP_LEFT.x, y: 285 }}
            label="2 m"
            labelOffset={{ x: 0, y: -6 }}
            size={9}
          />
          <Dimension
            from={{ x: TOP_LEFT.x, y: 285 }}
            to={{ x: X8, y: 285 }}
            label="2 m"
            labelOffset={{ x: 0, y: -6 }}
            size={9}
          />

          {showLoads && (
            <motion.g initial={false} animate={{ opacity: reveal }} transition={{ duration: 0.25 }}>
              <motion.line
                x1={P1_POINT.x}
                y1={P1_POINT.y}
                x2={P1_END.x}
                y2={P1_END.y}
                stroke={LOAD}
                strokeWidth="3.4"
                strokeLinecap="round"
                markerEnd="url(#a2-load)"
                initial={false}
                animate={playing ? { opacity: [0.65, 1, 0.65] } : { opacity: 1 }}
                transition={playing ? { duration: 1.8, repeat: Number.POSITIVE_INFINITY } : { duration: 0.2 }}
              />
              <Label x={P1_END.x + 6} y={P1_END.y - 2} size={9} color={LOAD}>
                P₁ = {pl(config.p1, 0)} kN
              </Label>

              <line
                x1={B.x}
                y1={Y - 1.5 * S}
                x2={B.x - 50}
                y2={Y - 1.5 * S}
                stroke={LOAD}
                strokeWidth="3"
                markerEnd="url(#a2-load)"
              />
              <Label x={B.x - 56} y={Y - 1.5 * S - 8} size={9} color={LOAD} anchor="end">
                P₂ = {pl(config.p2 ?? 0, 0)} kN
              </Label>

              <g stroke={LOAD} strokeWidth="1.3">
                {Array.from({ length: 6 }, (_, step) => {
                  const x = TOP_LEFT.x + ((C.x - TOP_LEFT.x) * step) / 5
                  return (
                    <line
                      key={`q-${step}`}
                      x1={x}
                      y1={TOP_LEFT.y - 20}
                      x2={x}
                      y2={TOP_LEFT.y - 3}
                      markerEnd="url(#a2-load)"
                    />
                  )
                })}
              </g>
              <Label x={(TOP_LEFT.x + C.x) / 2} y={TOP_LEFT.y - 30} size={9} color={LOAD} anchor="middle">
                q = {pl(config.q, 1)} kN/m
              </Label>

              <motion.g
                initial={false}
                animate={playing ? { opacity: [0.7, 1, 0.7] } : { opacity: 1 }}
                transition={playing ? { duration: 2.2, repeat: Number.POSITIVE_INFINITY } : { duration: 0.2 }}
              >
                <path
                  d={`M ${ELBOW.x - 16} ${ELBOW.y - 16} A 18 18 0 1 1 ${ELBOW.x + 16} ${ELBOW.y - 14}`}
                  fill="none"
                  stroke={MOMENT}
                  strokeWidth="2"
                />
                <path
                  d={`M ${ELBOW.x + 16} ${ELBOW.y - 14} L ${ELBOW.x + 9} ${ELBOW.y - 11} L ${ELBOW.x + 15} ${ELBOW.y - 4} Z`}
                  fill={MOMENT}
                />
              </motion.g>
              <Label x={ELBOW.x - 12} y={ELBOW.y - 26} size={9} color={MOMENT} anchor="end">
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
                markerEnd="url(#a2-reaction)"
              />
              {showByValue && (
                <Label x={420} y={306} size={9} color={REACTION} anchor="middle" weight={700}>
                  B_y = {pl(By, 2)} kN
                </Label>
              )}
            </motion.g>
          )}

          {showAx && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
              <line
                x1={X0}
                y1="262"
                x2={X0 + 45}
                y2="262"
                stroke={REACTION}
                strokeWidth="3"
                markerEnd="url(#a2-reaction)"
              />
              <Label x={X0 + 51} y={266} size={9} color={REACTION} weight={700}>
                A_x = {pl(Ax, 2)} kN
              </Label>
            </motion.g>
          )}

          {showAy && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
              <line x1="60" y1="290" x2="60" y2="245" stroke={REACTION} strokeWidth="3" markerEnd="url(#a2-reaction)" />
              <Label x={8} y={304} size={9} color={REACTION} weight={700}>
                A_y = {pl(Ay, 2)} kN
              </Label>
            </motion.g>
          )}

          <text x="230" y="330" textAnchor="middle" fontSize="9" fill={showCheck ? REACTION : MUTED}>
            {showCheck ? 'Kontrola: ΣFx = 0, ΣFy = 0, ΣM(1;1) = 0' : 'Pochyły pas 4:3, pion z P₂ i odcinek górny z q'}
          </text>
        </svg>
      </div>
    </div>
  )
}
