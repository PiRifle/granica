import { motion } from 'motion/react'
import type { RosetteFigure, SolutionScene } from '../../types'
import { resolveFocus, type Focus } from './focus'
import { formatNumber, local } from './shared'

export function RosetteView({
  figure,
  scene,
  focus: suppliedFocus,
  animationKey,
  progress = 1,
  revealedFocus,
  sceneIndex = 0,
  revealedMath = '',
}: {
  figure: RosetteFigure
  scene: SolutionScene
  focus?: Focus
  animationKey?: string
  progress?: number
  revealedFocus?: string[]
  sceneIndex?: number
  revealedMath?: string
}) {
  const focus = suppliedFocus ?? resolveFocus(scene, figure)
  const principalActive = focus.metric === 'principal' || focus.metric === 'angle' || focus.metric === 'mohr'
  const centerX = 132
  const centerY = 148
  const radius = 78

  const mohrScale = figure.mohr
    ? 68 / Math.max(figure.mohr.radius, Math.abs(figure.mohr.center) + figure.mohr.radius, 1e-12)
    : 1
  const mohrCenterX = figure.mohr ? 350 + figure.mohr.center * mohrScale : 350
  const mohrRadius = figure.mohr ? figure.mohr.radius * mohrScale : 0

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg viewBox="0 0 460 300" role="img" aria-label="Rozeta tensometryczna i koło Mohra odkształceń">
          <circle cx={centerX} cy={centerY} r={radius} fill="#f5f7fc" stroke="#d3d9e0" strokeWidth={1.5} />
          {figure.gauges.map((gauge) => {
            const angle = (gauge.angle * Math.PI) / 180
            const endX = centerX + Math.cos(angle) * radius
            const endY = centerY - Math.sin(angle) * radius
            const active = focus.metric === 'gauges'
            return (
              <g key={gauge.label}>
                <motion.line
                  key={`gauge-${gauge.label}-${focus.metric}`}
                  x1={centerX}
                  y1={centerY}
                  x2={endX}
                  y2={endY}
                  stroke={active ? '#4f6df5' : '#87929d'}
                  strokeWidth={active ? 3 : 2}
                  initial={{ pathLength: 0, opacity: 0.4 }}
                  animate={{ pathLength: active ? progress : 1, opacity: 1 }}
                  transition={{ pathLength: { duration: 0.12, ease: 'linear' }, opacity: { duration: 0.3 } }}
                />
                <circle cx={endX} cy={endY} r={3.5} fill="#4f6df5" />
                <text
                  x={endX + 7}
                  y={endY + (Math.abs(gauge.angle) < 1 ? 4 : gauge.angle === 90 ? -6 : 0)}
                  fontSize={9}
                  fill="#4f6df5"
                >
                  {gauge.label}: {gauge.display}
                </text>
              </g>
            )
          })}
          {figure.mohr?.angle != null && (
            <motion.line
              key={`principal-${focus.metric}`}
              x1={centerX}
              y1={centerY}
              x2={centerX + Math.cos((-figure.mohr.angle * Math.PI) / 180) * radius}
              y2={centerY + Math.sin((-figure.mohr.angle * Math.PI) / 180) * radius}
              stroke="#ff6b45"
              strokeWidth={2}
              initial={{ pathLength: 0, opacity: 0.3 }}
              animate={{ pathLength: principalActive ? progress : 1, opacity: 1 }}
              transition={{ pathLength: { duration: 0.12, ease: 'linear' }, opacity: { duration: 0.3 } }}
            />
          )}
          <text x={centerX} y={252} textAnchor="middle" fontSize={9} fill="#87929d">
            rozeta 0° / 45° / 90°
          </text>

          {figure.mohr && (
            <g>
              <line x1={60} y1={centerY} x2={440} y2={centerY} stroke="#c9d0d9" strokeWidth={1} />
              <motion.circle
                key={`mohr-${animationKey}-${focus.metric}`}
                cx={mohrCenterX}
                cy={centerY}
                r={Math.abs(mohrRadius)}
                fill="none"
                stroke={principalActive ? '#ff6b45' : '#9aa7b5'}
                strokeWidth={principalActive ? 2.6 : 1.8}
                initial={{ pathLength: 0, opacity: 0.35 }}
                animate={{ pathLength: principalActive ? progress : 1, opacity: 1 }}
                transition={{ pathLength: { duration: 0.12, ease: 'linear' }, opacity: { duration: 0.3 } }}
              />
              <line
                x1={mohrCenterX - Math.abs(mohrRadius)}
                y1={centerY}
                x2={mohrCenterX + Math.abs(mohrRadius)}
                y2={centerY}
                stroke="#4f6df5"
                strokeWidth={2}
              />
              <motion.circle
                cx={350 + figure.mohr.left * mohrScale}
                cy={centerY}
                r={3.5}
                fill="#4f6df5"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.45, type: 'spring', stiffness: 260, damping: 18 }}
              />
              <motion.circle
                cx={350 + figure.mohr.right * mohrScale}
                cy={centerY}
                r={3.5}
                fill="#ff6b45"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.55, type: 'spring', stiffness: 260, damping: 18 }}
              />
              <text x={460} y={22} textAnchor="end" fontSize={9} fill="#87929d">
                koło Mohra
              </text>
            </g>
          )}
        </svg>
      </div>
      {figure.note && <p className={local('note')}>{figure.note}</p>}
    </div>
  )
}
