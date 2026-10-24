import { motion } from 'motion/react'
import type { CubeFigure, SolutionScene } from '../../types'
import { resolveFocus, type Focus } from './focus'
import { formatNumber, local } from './shared'
import { ValueLookup } from './ValueLookup'

export function CubeView({
  figure,
  scene,
  focus: suppliedFocus,
  animationKey,
  progress = 1,
  revealedFocus,
  sceneIndex = 0,
  revealedMath = '',
}: {
  figure: CubeFigure
  scene: SolutionScene
  focus?: Focus
  animationKey?: string
  progress?: number
  revealedFocus?: string[]
  sceneIndex?: number
  revealedMath?: string
}) {
  const focus = suppliedFocus ?? resolveFocus(scene, figure)
  const stressActive = focus.metric === 'stress' || focus.metric === 'constraints'
  const strainActive = focus.metric === 'strain'
  const compressed = strainActive || focus.metric === 'volume'

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg viewBox="0 0 460 300" role="img" aria-label="Element sześcienny z naprężeniami i odkształceniami">
          <motion.g
            stroke="#87929d"
            strokeWidth={1.6}
            fill="none"
            animate={{ scaleY: compressed ? 1 + (figure.strains?.z ?? 0) * 110 * progress : 1 }}
            transition={{ scaleY: { duration: 0.15, ease: 'linear' } }}
            style={{ transformOrigin: '225px 246px' }}
          >
            <rect x={160} y={116} width={130} height={130} fill="#f5f7fc" />
            <path d="M160 116 L200 82 L330 82 L290 116" fill="#edf1ff" />
            <path d="M290 116 L330 82 L330 212 L290 246" fill="#f5f7fc" />
          </motion.g>

          {figure.stresses.z != null && (
            <g stroke={stressActive ? '#ff6b45' : '#c9a79d'} fill={stressActive ? '#ff6b45' : '#c9a79d'}>
              <motion.line
                x1={250}
                y1={102}
                x2={250}
                y2={52}
                strokeWidth={2.6}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: progress }}
                transition={{ pathLength: { duration: 0.12, ease: 'linear' } }}
              />
              <path d="M244 60 L250 50 L256 60" fill="none" strokeWidth={2.6} />
              <text x={260} y={64} fontSize={11} stroke="none">
                σz = {formatNumber(figure.stresses.z)} MPa
              </text>
            </g>
          )}
          {figure.stresses.x != null && (
            <g stroke={stressActive ? '#4f6df5' : '#a9b7cc'} fill={stressActive ? '#4f6df5' : '#a9b7cc'}>
              <motion.line
                x1={242}
                y1={192}
                x2={154}
                y2={192}
                strokeWidth={2.4}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: progress }}
                transition={{ pathLength: { duration: 0.12, ease: 'linear' } }}
              />
              <path d="M164 186 L152 192 L164 198" fill="none" strokeWidth={2.4} />
              <text x={156} y={184} fontSize={10} stroke="none">
                σx = {formatNumber(figure.stresses.x)}
              </text>
            </g>
          )}
          {figure.stresses.y != null && (
            <g stroke={stressActive ? '#5bb98c' : '#a9c4b5'} fill={stressActive ? '#5bb98c' : '#a9c4b5'}>
              <motion.line
                x1={188}
                y1={224}
                x2={188}
                y2={148}
                strokeWidth={2.4}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: progress }}
                transition={{ pathLength: { duration: 0.12, ease: 'linear' } }}
              />
              <path d="M182 158 L188 146 L194 158" fill="none" strokeWidth={2.4} />
              <text x={196} y={156} fontSize={10} stroke="none">
                σy = {formatNumber(figure.stresses.y)}
              </text>
            </g>
          )}

          {strainActive && figure.strains?.z != null && (
            <text x={250} y={266} textAnchor="middle" fontSize={9} fill="#4f6df5">
              εz = {formatNumber(figure.strains.z)}
              {figure.strains.x != null ? ` · εx = ${formatNumber(figure.strains.x)}` : ''}
              {figure.strains.y != null ? ` · εy = ${formatNumber(figure.strains.y)}` : ''}
            </text>
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
