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
const X5 = 360
const Y = 235
const S = 52
const TOP = Y - 3 * S
const C = { x: X5, y: TOP }
const B = { x: X5, y: Y }
const P1_X = X0 + S
const P2_END = { x: C.x - 30, y: C.y + 52 }
const MOMENT_X = X0 + 4.2 * S

export function ARectFrameAnimation({ index, playing, sceneProgress }: SolutionAnimationProps) {
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
          aria-label="Rama prostokątna z obciążeniem q, siłami P1 i P2 oraz momentem"
        >
          <title>Schemat 3 — rama prostokątna 5 × 3 m</title>
          <desc>
            Lewy pion z obciążeniem q, górny pas z siłą P1 i momentem, prawy pion z siłą P2 pod kątem 60 stopni oraz
            reakcje A_x, A_y i B_y.
          </desc>
          <defs>
            <marker id="a3-load" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0 0L10 5L0 10Z" fill={LOAD} />
            </marker>
            <marker id="a3-moment" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0 0L10 5L0 10Z" fill={MOMENT} />
            </marker>
            <marker
              id="a3-reaction"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={REACTION} />
            </marker>
            <marker id="a3-axis" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
              <path d="M0 0L10 5L0 10Z" fill={MUTED} />
            </marker>
          </defs>

          <g stroke={MUTED} strokeWidth="1.2">
            <line x1="16" y1="28" x2="34" y2="28" markerEnd="url(#a3-axis)" />
            <line x1="16" y1="28" x2="16" y2="10" markerEnd="url(#a3-axis)" />
          </g>
          <Label x={37} y={31} size={8} color={MUTED}>
            x
          </Label>
          <Label x={10} y={13} size={8} color={MUTED}>
            y
          </Label>

          <g stroke={EDGE} strokeWidth="5" strokeLinecap="round" fill="none">
            <line x1={X0} y1={Y} x2={X0} y2={TOP} />
            <line x1={X0} y1={TOP} x2={C.x} y2={C.y} />
            <line x1={C.x} y1={C.y} x2={B.x} y2={B.y} />
          </g>

          <PinSupport x={X0} y={Y} />
          <RollerSupport x={B.x} y={B.y} />
          <Label x={X0 + 9} y={Y - 7} size={10} color={INK}>
            A
          </Label>
          <Label x={B.x + 8} y={B.y - 10} size={10} color={INK}>
            B
          </Label>
          <Label x={C.x + 7} y={C.y - 10} size={10} color={INK}>
            C
          </Label>

          <Dimension
            from={{ x: 70, y: TOP }}
            to={{ x: 70, y: Y }}
            label="3 m"
            labelOffset={{ x: -24, y: 0 }}
            size={9}
          />
          <Dimension
            from={{ x: X0, y: 285 }}
            to={{ x: X5, y: 285 }}
            label="5 m"
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
                      x1="80"
                      y1={y}
                      x2="98"
                      y2={y}
                      markerEnd="url(#a3-load)"
                      opacity={0.55 + step * 0.04}
                    />
                  )
                })}
              </g>
              <Label x={70} y={64} size={9} color={LOAD}>
                q = {pl(config.q, 1)} kN/m
              </Label>

              <motion.line
                x1={P1_X}
                y1="45"
                x2={P1_X}
                y2={TOP - 2}
                stroke={LOAD}
                strokeWidth="3.4"
                strokeLinecap="round"
                markerEnd="url(#a3-load)"
                initial={false}
                animate={playing ? { opacity: [0.65, 1, 0.65] } : { opacity: 1 }}
                transition={playing ? { duration: 1.8, repeat: Number.POSITIVE_INFINITY } : { duration: 0.2 }}
              />
              <Label x={P1_X + 10} y={50} size={9} color={LOAD}>
                P₁ = {pl(config.p1, 0)} kN
              </Label>

              <motion.line
                x1={C.x}
                y1={C.y}
                x2={P2_END.x}
                y2={P2_END.y}
                stroke={LOAD}
                strokeWidth="3.2"
                strokeLinecap="round"
                markerEnd="url(#a3-load)"
                initial={false}
                animate={playing ? { opacity: [0.65, 1, 0.65] } : { opacity: 1 }}
                transition={playing ? { duration: 2, repeat: Number.POSITIVE_INFINITY } : { duration: 0.2 }}
              />
              <Label x={P2_END.x - 6} y={P2_END.y + 14} size={9} color={LOAD} anchor="end">
                P₂ = {pl(config.p2 ?? 0, 0)} kN
              </Label>
              <Label x={318} y={106} size={8} color={LOAD} anchor="end">
                60°
              </Label>

              <motion.g
                initial={false}
                animate={playing ? { opacity: [0.7, 1, 0.7] } : { opacity: 1 }}
                transition={playing ? { duration: 2.2, repeat: Number.POSITIVE_INFINITY } : { duration: 0.2 }}
              >
                <path
                  d={`M ${MOMENT_X - 18} ${TOP - 2} A 18 18 0 1 1 ${MOMENT_X + 16} ${TOP + 8}`}
                  fill="none"
                  stroke={MOMENT}
                  strokeWidth="2"
                />
                <path
                  d={`M ${MOMENT_X + 16} ${TOP + 8} L ${MOMENT_X + 9} ${TOP + 5} L ${MOMENT_X + 14} ${TOP - 2} Z`}
                  fill={MOMENT}
                />
              </motion.g>
              <Label x={MOMENT_X} y={TOP - 26} size={9} color={MOMENT} anchor="middle">
                M = {pl(config.moment, 0)} kN·m
              </Label>
            </motion.g>
          )}

          {showBy && (
            <motion.g initial={false} animate={{ opacity: reveal }} transition={{ duration: 0.25 }}>
              <line
                x1="380"
                y1="290"
                x2="380"
                y2="245"
                stroke={REACTION}
                strokeWidth="3"
                markerEnd="url(#a3-reaction)"
              />
              {showByValue && (
                <Label x={380} y={306} size={9} color={REACTION} anchor="middle" weight={700}>
                  B_y = {pl(By, 2)} kN
                </Label>
              )}
            </motion.g>
          )}

          {showAx && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
              <line
                x1={X0}
                y1="215"
                x2={X0 + 38}
                y2="215"
                stroke={REACTION}
                strokeWidth="3"
                markerEnd="url(#a3-reaction)"
              />
              <Label x={X0 + 44} y={219} size={9} color={REACTION} weight={700}>
                A_x = {pl(Ax, 2)} kN
              </Label>
            </motion.g>
          )}

          {showAy && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
              <line x1="76" y1="290" x2="76" y2="245" stroke={REACTION} strokeWidth="3" markerEnd="url(#a3-reaction)" />
              <Label x={8} y={304} size={9} color={REACTION} weight={700}>
                A_y = {pl(Ay, 2)} kN
              </Label>
            </motion.g>
          )}

          <text x="230" y="330" textAnchor="middle" fontSize="9" fill={showCheck ? REACTION : MUTED}>
            {showCheck
              ? 'Kontrola: ΣFx = 0, ΣFy = 0, ΣM(1;1) = 0'
              : 'Rama 5 × 3 m: q na pionie, P₁ na pasie, P₂ pod 60°'}
          </text>
        </svg>
      </div>
    </div>
  )
}
