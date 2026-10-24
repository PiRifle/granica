import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const LOAD = '#ff6b45'
const REACTION = '#2f7d5b'
const SUPPORT = '#68727e'
const MUTED = '#87929d'

const CENTER_X = 190
const TOP = 48
const NODE_B = 168
const NODE_C = 248
const HALF_AB = 39
const HALF_BC = 32
const CUT_AB = 108
const CUT_BC = 208

const clamp = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp(value)
  return t * t * (3 - 2 * t)
}
const lerp = (from: number, to: number, t: number) => from + (to - from) * t

function Support() {
  return (
    <g stroke={SUPPORT} strokeWidth={2} strokeLinecap="round">
      <line x1={CENTER_X - 64} y1={TOP} x2={CENTER_X + 64} y2={TOP} />
      {Array.from({ length: 9 }, (_, index) => {
        const x = CENTER_X - 58 + index * 14
        return <line key={index} x1={x} y1={TOP} x2={x + 8} y2={TOP - 12} strokeWidth={1.5} />
      })}
      <text x={CENTER_X + 76} y={TOP + 4} fontSize={10} fill={SUPPORT} stroke="none">
        A
      </text>
    </g>
  )
}

function Reaction({ x, y, label }: { x: number; y: number; label: string }) {
  return (
    <motion.g stroke={REACTION} fill={REACTION} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <line x1={x} y1={y} x2={x} y2={y - 30} strokeWidth={2.5} />
      <path d={`M${x - 4} ${y - 22} L${x} ${y - 31} L${x + 4} ${y - 22}`} fill="none" strokeWidth={2.5} />
      <text x={x + 8} y={y - 16} fontSize={9} stroke="none">
        {label}
      </text>
    </motion.g>
  )
}

function DownLoad({ y, label, xStart }: { y: number; label: string; xStart: number }) {
  return (
    <g stroke={LOAD} fill={LOAD}>
      <line x1={xStart} y1={y} x2={CENTER_X + 86} y2={y} strokeWidth={1.4} />
      <line x1={CENTER_X + 92} y1={y} x2={CENTER_X + 92} y2={y + 27} strokeWidth={2.5} />
      <path
        d={`M${CENTER_X + 87} ${y + 19} L${CENTER_X + 92} ${y + 28} L${CENTER_X + 97} ${y + 19}`}
        fill="none"
        strokeWidth={2.5}
      />
      <text x={CENTER_X + 100} y={y + 19} fontSize={9} stroke="none">
        {label}
      </text>
    </g>
  )
}

function NormalArrow({ cutY, label, x = CENTER_X }: { cutY: number; label: string; x?: number }) {
  return (
    <g stroke={ACCENT} fill={ACCENT}>
      <line x1={x} y1={cutY} x2={x} y2={cutY - 42} strokeWidth={2.8} />
      <path d={`M${x - 5} ${cutY - 33} L${x} ${cutY - 43} L${x + 5} ${cutY - 33}`} fill="none" strokeWidth={2.8} />
      <text x={x + 9} y={cutY - 21} fontSize={9} fontWeight={700} stroke="none">
        {label}
      </text>
    </g>
  )
}

export function MethodOfSectionsSteppedBarAnimation({ scene, index, playing, sceneProgress }: SolutionAnimationProps) {
  const p = playing ? sceneProgress : 1
  const reveal = playing ? p : 1
  const focusSegment = scene.focus?.segment
  const cutScene = index === 2 || index === 3
  const cutProgress = smooth(p / 0.38)
  const cutY =
    index === 2 ? lerp(NODE_B, CUT_BC, cutProgress) : index === 3 ? lerp(NODE_B, CUT_AB, cutProgress) : CUT_AB
  const showNbc = (index === 2 && reveal > 0.42) || (index === 4 && reveal > 0.42)
  const showNab = (index === 3 && reveal > 0.42) || (index === 4 && reveal > 0.55)
  const showReaction = index === 1 || index === 4
  const areaActive = (segment: string) =>
    index === 4 ? focusSegment === segment : focusSegment === segment && reveal > 0.62
  const abAreaColor = areaActive('ab') ? ACCENT : MUTED
  const bcAreaColor = areaActive('bc') ? ACCENT : MUTED

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 280"
          role="img"
          aria-label="Pionowy pręt schodkowy AB–BC z siłami 15 kN i 10 kN oraz przekrojami pokazującymi siły normalne"
        >
          <Support />

          <rect
            x={CENTER_X - HALF_AB}
            y={TOP}
            width={HALF_AB * 2}
            height={NODE_B - TOP}
            rx={3}
            fill={ACCENT}
            fillOpacity={0.12}
            stroke={ACCENT}
            strokeWidth={2}
          />
          <rect
            x={CENTER_X - HALF_BC}
            y={NODE_B}
            width={HALF_BC * 2}
            height={NODE_C - NODE_B}
            rx={3}
            fill={ACCENT}
            fillOpacity={0.2}
            stroke={ACCENT}
            strokeWidth={2}
          />

          {cutScene && (
            <>
              {cutY < NODE_B && (
                <rect
                  x={CENTER_X - HALF_AB}
                  y={cutY}
                  width={HALF_AB * 2}
                  height={NODE_B - cutY}
                  fill={ACCENT}
                  fillOpacity={0.24}
                />
              )}
              <rect
                x={CENTER_X - HALF_BC}
                y={Math.max(cutY, NODE_B)}
                width={HALF_BC * 2}
                height={NODE_C - Math.max(cutY, NODE_B)}
                fill={ACCENT}
                fillOpacity={0.24}
              />
              <line
                x1={CENTER_X - 62}
                y1={cutY}
                x2={CENTER_X + 62}
                y2={cutY}
                stroke={ACCENT}
                strokeWidth={1.8}
                strokeDasharray="5 4"
              />
              <text x={CENTER_X + 66} y={cutY + 4} textAnchor="start" fontSize={9} fontWeight={700} fill={ACCENT}>
                przekrój
              </text>
            </>
          )}

          {index === 4 && (
            <>
              <line
                x1={CENTER_X - 62}
                y1={CUT_AB}
                x2={CENTER_X + 62}
                y2={CUT_AB}
                stroke={ACCENT}
                strokeWidth={1.6}
                strokeDasharray="5 4"
              />
              <line
                x1={CENTER_X - 62}
                y1={CUT_BC}
                x2={CENTER_X + 62}
                y2={CUT_BC}
                stroke={ACCENT}
                strokeWidth={1.6}
                strokeDasharray="5 4"
              />
            </>
          )}

          <text x={CENTER_X - 58} y={TOP + 36} textAnchor="end" fontSize={10} fontWeight={700} fill={ACCENT}>
            AB
          </text>
          <text x={CENTER_X - 58} y={TOP + 50} textAnchor="end" fontSize={9} fill={MUTED}>
            1,2 m
          </text>
          <text
            x={CENTER_X - 58}
            y={TOP + 64}
            textAnchor="end"
            fontSize={9}
            fill={abAreaColor}
            fontWeight={areaActive('ab') ? 700 : 400}
          >
            A = 300 mm²
          </text>

          <text x={CENTER_X - 52} y={NODE_B + 22} textAnchor="end" fontSize={10} fontWeight={700} fill={ACCENT}>
            BC
          </text>
          <text x={CENTER_X - 52} y={NODE_B + 36} textAnchor="end" fontSize={9} fill={MUTED}>
            0,8 m
          </text>
          <text
            x={CENTER_X - 52}
            y={NODE_B + 50}
            textAnchor="end"
            fontSize={9}
            fill={bcAreaColor}
            fontWeight={areaActive('bc') ? 700 : 400}
          >
            A = 200 mm²
          </text>

          <DownLoad y={NODE_B} label="15 kN" xStart={CENTER_X + HALF_AB + 4} />
          <DownLoad y={NODE_C} label="10 kN" xStart={CENTER_X + HALF_BC + 4} />

          {showReaction && <Reaction x={CENTER_X} y={TOP - 2} label="R_A = 25 kN" />}

          {index === 2 && (
            <motion.g initial={false} animate={{ opacity: showNbc ? 1 : 0 }}>
              <NormalArrow cutY={cutY} label="N(BC) = 10 kN" />
            </motion.g>
          )}
          {index === 3 && (
            <motion.g initial={false} animate={{ opacity: showNab ? 1 : 0 }}>
              <NormalArrow cutY={cutY} label="N(AB) = 25 kN" />
            </motion.g>
          )}
          {index === 4 && (
            <>
              <motion.g initial={false} animate={{ opacity: showNab ? 1 : 0 }}>
                <NormalArrow cutY={CUT_AB} label="N(AB) = 25 kN" />
              </motion.g>
              <motion.g initial={false} animate={{ opacity: showNbc ? 1 : 0 }}>
                <NormalArrow cutY={CUT_BC} label="N(BC) = 10 kN" />
              </motion.g>
            </>
          )}

          {cutScene && (
            <text x={CENTER_X + 68} y={NODE_C - 8} fontSize={8.5} fill={MUTED}>
              część dolna w równowadze
            </text>
          )}
        </svg>
      </div>
    </div>
  )
}
