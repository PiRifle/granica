import { motion } from 'motion/react'
import type { SectionFigure, SolutionScene } from '../../types'
import { resolveFocus, type Focus } from './focus'
import { formatNumber, local } from './shared'
import { ValueLookup } from './ValueLookup'

export function SectionView({
  figure,
  scene,
  focus: suppliedFocus,
  animationKey,
  progress = 1,
  revealedFocus,
  sceneIndex = 0,
  revealedMath = '',
}: {
  figure: SectionFigure
  scene: SolutionScene
  focus?: Focus
  animationKey?: string
  progress?: number
  revealedFocus?: string[]
  sceneIndex?: number
  revealedMath?: string
}) {
  const focus = suppliedFocus ?? resolveFocus(scene, figure)
  const pad = 40
  const canvas = { width: 460, height: 300 }
  const drawing = { width: 340, height: 196 }
  const scale = Math.min(drawing.width / figure.width, drawing.height / figure.height)
  const offsetX = (canvas.width - figure.width * scale) / 2
  const offsetY = 36
  const px = (value: number) => offsetX + value * scale
  const py = (value: number) => offsetY + (figure.height - value) * scale
  const centroidActive = focus.metric === 'centroid'
  const ixActive = focus.metric === 'Ix'
  const iyActive = focus.metric === 'Iy'

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg viewBox="0 0 460 300" role="img" aria-label="Przekrój poprzeczny z osią centralną i wymiarami">
          {figure.parts.map((part, index) => (
            <g key={`part-${index}`}>
              <rect
                x={px(part.x)}
                y={py(part.y + part.height)}
                width={part.width * scale}
                height={part.height * scale}
                fill={part.tone === 'accent' ? '#edf1ff' : part.tone === 'solid' ? '#dfe6f2' : '#f2f5fa'}
                stroke="#7d8fa5"
                strokeWidth={1.4}
              />
              {part.label && part.width * scale > 40 && part.height * scale > 8 && (
                <text
                  x={px(part.x + part.width / 2)}
                  y={py(part.y + part.height / 2) + 3}
                  textAnchor="middle"
                  fontSize={9}
                  fill="#7d8fa5"
                >
                  {part.label}
                </text>
              )}
            </g>
          ))}
          {(figure.holes ?? []).map((hole, index) => (
            <g key={`hole-${index}`}>
              <circle
                cx={px(hole.cx)}
                cy={py(hole.cy)}
                r={hole.r * scale}
                fill="#fff"
                stroke="#87929d"
                strokeWidth={1.3}
              />
              {hole.label && (
                <text x={px(hole.cx)} y={py(hole.cy) + 3} textAnchor="middle" fontSize={8} fill="#87929d">
                  {hole.label}
                </text>
              )}
            </g>
          ))}

          {figure.centroid && (
            <motion.g key={`centroid-${focus.metric}`}>
              <motion.line
                x1={px(0)}
                x2={px(figure.width)}
                stroke={centroidActive || ixActive ? '#ff6b45' : '#b7c0cb'}
                strokeWidth={centroidActive || ixActive ? 2.2 : 1.2}
                strokeDasharray={centroidActive || ixActive ? undefined : '6 4'}
                initial={{ y1: py(0), y2: py(0), opacity: 0.3, pathLength: 0 }}
                animate={{
                  y1: py(figure.centroid.y),
                  y2: py(figure.centroid.y),
                  opacity: 1,
                  pathLength: centroidActive || ixActive ? progress : 1,
                }}
                transition={{
                  default: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
                  pathLength: { duration: 0.12, ease: 'linear' },
                }}
              />
              <motion.line
                y1={py(0)}
                y2={py(figure.height)}
                stroke={centroidActive || iyActive ? '#4f6df5' : '#b7c0cb'}
                strokeWidth={centroidActive || iyActive ? 2.2 : 1.2}
                strokeDasharray={centroidActive || iyActive ? undefined : '6 4'}
                initial={{ x1: px(0), x2: px(0), opacity: 0.3, pathLength: 0 }}
                animate={{
                  x1: px(figure.centroid.x),
                  x2: px(figure.centroid.x),
                  opacity: 1,
                  pathLength: centroidActive || iyActive ? progress : 1,
                }}
                transition={{
                  default: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
                  pathLength: { duration: 0.12, ease: 'linear' },
                }}
              />
              <motion.circle
                cx={px(figure.centroid.x)}
                cy={py(figure.centroid.y)}
                r={4}
                fill="#17202a"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.25, type: 'spring', stiffness: 260, damping: 18 }}
                style={{ transformOrigin: `${px(figure.centroid.x)}px ${py(figure.centroid.y)}px` }}
              />
              <text x={px(figure.centroid.x) + 8} y={py(figure.centroid.y) - 8} fontSize={9} fill="#17202a">
                C
              </text>
            </motion.g>
          )}
        </svg>
        <ValueLookup
          values={figure.values}
          focus={focus.metric}
          revealed={revealedFocus}
          sceneIndex={sceneIndex}
          revealedMath={revealedMath}
        />
      </div>
      {figure.note && <p className={local('note')}>{figure.note}</p>}
    </div>
  )
}
