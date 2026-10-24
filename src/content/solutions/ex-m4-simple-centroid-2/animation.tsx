import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const LOAD = '#ff6b45'
const MUTED = '#87929d'
const INK = '#17202a'
const FILL = '#e7edf6'
const EDGE = '#7d8fa5'

const OX = 230
const OY = 250
const SCALE = 1.9
const R = 60
const RPX = R * SCALE
const Y_C = (4 * R) / (3 * Math.PI)

const QX = 150
const QY = 250
const QSCALE = 1.5
const QR = 80
const Q_C = (4 * QR) / (3 * Math.PI)

const px = (x: number) => OX + x * SCALE
const py = (y: number) => OY - y * SCALE
const qx = (x: number) => QX + x * QSCALE
const qy = (y: number) => QY - y * QSCALE

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}
const lerp = (from: number, to: number, t: number) => from + (to - from) * t

const SEMI = `M ${px(-R)} ${py(0)} A ${RPX} ${RPX} 0 0 1 ${px(R)} ${py(0)} Z`

const STRIPS = Array.from({ length: 12 }, (_, index) => {
  const y0 = index * 5
  const y1 = y0 + 5
  const h0 = Math.sqrt(R * R - y0 * y0)
  const h1 = Math.sqrt(R * R - y1 * y1)
  const area = (h0 + h1) * 5
  const cy = y0 + (5 * (h0 + 2 * h1)) / (3 * (h0 + h1 || 1))
  return { index, y0, y1, h0, h1, area, cy }
})

function partialCentroid(reveal: number) {
  let weight = 0
  let sy = 0
  for (const strip of STRIPS) {
    const share = clamp01(reveal * STRIPS.length - strip.index)
    if (share <= 0) continue
    const area = strip.area * share
    weight += area
    sy += area * strip.cy
  }
  if (weight === 0) return STRIPS[0].cy
  return sy / weight
}

function HDim({ from, to, y, label }: { from: number; to: number; y: number; label: string }) {
  return (
    <g stroke={MUTED} strokeWidth={1.2} fill={MUTED}>
      <line x1={from} y1={y} x2={to} y2={y} />
      <line x1={from} y1={y - 5} x2={from} y2={y + 5} />
      <line x1={to} y1={y - 5} x2={to} y2={y + 5} />
      <text x={(from + to) / 2} y={y - 6} textAnchor="middle" fontSize={9} stroke="none">
        {label}
      </text>
    </g>
  )
}

function QuarterCircle() {
  const k = 0.5523
  const path = [
    `M ${qx(QR)} ${qy(0)}`,
    `C ${qx(QR)} ${qy(QR * k)} ${qx(QR * k)} ${qy(QR)} ${qx(0)} ${qy(QR)}`,
    'Z',
  ].join(' ')

  return (
    <g>
      <g stroke={MUTED} strokeWidth={1.1} fill="none">
        <line x1={qx(-6)} y1={qy(0)} x2={qx(92)} y2={qy(0)} />
        <line x1={qx(0)} y1={qy(-6)} x2={qx(0)} y2={qy(92)} />
      </g>
      <text x={qx(92)} y={qy(0) + 14} fontSize={9} fill={MUTED}>
        x
      </text>
      <text x={qx(0) - 12} y={qy(92)} fontSize={9} fill={MUTED}>
        y
      </text>

      <path d={path} fill={FILL} fillOpacity={0.65} stroke={EDGE} strokeWidth={1.6} />
      <line x1={qx(0)} y1={qy(0)} x2={qx(QR)} y2={qy(QR)} stroke={MUTED} strokeWidth={1.2} strokeDasharray="5 4" />
      <text x={qx(QR) - 6} y={qy(QR) + 12} textAnchor="end" fontSize={8.5} fill={MUTED}>
        oś symetrii
      </text>

      <HDim from={qx(0)} to={qx(QR)} y={qy(0) + 22} label="r = 80 mm" />

      <line x1={qx(Q_C)} y1={qy(Q_C)} x2={qx(Q_C)} y2={qy(0)} stroke={ACCENT} strokeWidth={1} strokeDasharray="4 4" />
      <line x1={qx(Q_C)} y1={qy(Q_C)} x2={qx(0)} y2={qy(Q_C)} stroke={ACCENT} strokeWidth={1} strokeDasharray="4 4" />
      <circle cx={qx(Q_C)} cy={qy(Q_C)} r={4.5} fill={INK} stroke="#fff" strokeWidth={1.4} />
      <text x={qx(Q_C) + 9} y={qy(Q_C) - 8} fontSize={10} fontWeight={700} fill={INK}>
        C
      </text>
      <text x={qx(Q_C) + 9} y={qy(Q_C) + 5} fontSize={9} fill={INK}>
        (33,95; 33,95) mm
      </text>
    </g>
  )
}

export function SimpleCentroidSemicircleAnimation({
  scene,
  index: sceneIndex,
  playing,
  sceneProgress,
}: SolutionAnimationProps) {
  const metric = scene.focus?.metric
  const index =
    metric === 'axes'
      ? 0
      : metric === 'symmetry'
        ? 1
        : metric === 'strips'
          ? 2
          : metric === 'parts'
            ? 3
            : metric === 'centroid'
              ? 4
              : metric === 'quarter'
                ? 5
                : sceneIndex
  const p = playing ? clamp01(sceneProgress) : 1
  const draw = playing ? smooth(p / 0.6) : 1
  const stripReveal = playing ? smooth((p - 0.05) / 0.62) : 1
  const partReveal = playing ? smooth((p - 0.08) / 0.62) : 1
  const markerY = playing ? lerp(partialCentroid(partReveal), Y_C, smooth((p - 0.62) / 0.3)) : Y_C
  const showStrips = index === 2 || index === 3

  if (index === 5) {
    return (
      <div className={local('figure')}>
        <div className={local('figure-canvas')}>
          <svg
            viewBox="0 0 460 300"
            role="img"
            aria-label="Ćwiartka koła o promieniu 80 mm z osią symetrii i środkiem ciężkości w punkcie (33,95; 33,95) mm."
          >
            <QuarterCircle />
          </svg>
        </div>
      </div>
    )
  }

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 300"
          role="img"
          aria-label="Półkole o promieniu 60 mm. Animacja pokazuje oś symetrii, pionowe pasy, ich środki i środek ciężkości."
        >
          <g stroke={MUTED} strokeWidth={1.1} fill="none">
            <line x1={px(-70)} y1={py(0)} x2={px(70)} y2={py(0)} />
            <line x1={px(0)} y1={py(-8)} x2={px(0)} y2={py(68)} />
          </g>
          <text x={px(70)} y={py(0) + 14} fontSize={9} fill={MUTED}>
            x
          </text>
          <text x={px(0) - 12} y={py(68)} fontSize={9} fill={MUTED}>
            y
          </text>
          <text x={px(0) - 12} y={py(0) + 14} fontSize={9} fill={MUTED}>
            O
          </text>

          <path d={SEMI} fill={FILL} fillOpacity={showStrips ? 0.3 : 0.65} stroke="none" />
          <path d={SEMI} fill="none" stroke={EDGE} strokeWidth={1.6} />
          {index === 0 && (
            <>
              <motion.path
                d={SEMI}
                fill="none"
                stroke={ACCENT}
                strokeWidth={2.4}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: draw }}
                transition={{ duration: 0.1, ease: 'linear' }}
              />
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: smooth(draw) }}>
                <HDim from={px(0)} to={px(R)} y={py(0) + 22} label="r = 60 mm" />
                <HDim from={px(-R)} to={px(R)} y={py(0) + 38} label="d = 120 mm" />
              </motion.g>
            </>
          )}

          {index === 1 && (
            <>
              <motion.line
                x1={px(0)}
                y1={py(-4)}
                x2={px(0)}
                y2={py(66)}
                stroke={ACCENT}
                strokeWidth={2}
                strokeDasharray="7 5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: draw }}
                transition={{ duration: 0.1, ease: 'linear' }}
              />
              {[20, 40].map((y, pairIndex) => {
                const half = Math.sqrt(R * R - y * y)
                const reveal = playing ? smooth((p - 0.25 - pairIndex * 0.12) / 0.32) : 1
                return (
                  <g key={y}>
                    <motion.line
                      x1={px(-half)}
                      y1={py(y)}
                      x2={px(half)}
                      y2={py(y)}
                      stroke={MUTED}
                      strokeWidth={1}
                      strokeDasharray="4 4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: reveal }}
                    />
                    <motion.circle
                      cx={px(-half)}
                      cy={py(y)}
                      r={2.6}
                      fill={LOAD}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: reveal }}
                    />
                    <motion.circle
                      cx={px(half)}
                      cy={py(y)}
                      r={2.6}
                      fill={LOAD}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: reveal }}
                    />
                  </g>
                )
              })}
              <text x={px(0) + 8} y={py(12)} fontSize={9} fill={ACCENT}>
                x_C = 0
              </text>
              <text x={px(0) + 8} y={py(62)} fontSize={9} fill={MUTED}>
                oś symetrii
              </text>
            </>
          )}

          {showStrips &&
            STRIPS.map((strip) => {
              const reveal = playing ? smooth(stripReveal * STRIPS.length - strip.index) : 1
              const highlight = index === 2 && strip.index === 6
              const points = `${px(-strip.h0)},${py(strip.y0)} ${px(strip.h0)},${py(strip.y0)} ${px(strip.h1)},${py(strip.y1)} ${px(-strip.h1)},${py(strip.y1)}`
              return (
                <g key={strip.index}>
                  <motion.polygon
                    points={points}
                    fill={highlight ? ACCENT : FILL}
                    fillOpacity={highlight ? 0.24 : 0.6}
                    stroke={highlight ? ACCENT : EDGE}
                    strokeWidth={highlight ? 1.4 : 0.6}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: reveal }}
                  />
                  {highlight && (
                    <motion.g initial={{ opacity: 0 }} animate={{ opacity: reveal }}>
                      <line
                        x1={px(strip.h0)}
                        y1={py((strip.y0 + strip.y1) / 2)}
                        x2={px(strip.h0) + 26}
                        y2={py((strip.y0 + strip.y1) / 2)}
                        stroke={ACCENT}
                        strokeWidth={1}
                      />
                      <text x={px(strip.h0) + 29} y={py((strip.y0 + strip.y1) / 2) + 3} fontSize={9} fill={ACCENT}>
                        2√(r² − y²)
                      </text>
                    </motion.g>
                  )}
                </g>
              )
            })}

          {index === 3 && (
            <>
              {STRIPS.map((strip) => {
                const reveal = playing ? smooth(partReveal * STRIPS.length - strip.index) : 1
                return (
                  <motion.circle
                    key={`part-${strip.index}`}
                    cx={px(0)}
                    cy={py(strip.cy)}
                    r={2.6}
                    fill={ACCENT}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: reveal }}
                  />
                )
              })}
              <line
                x1={px(0)}
                y1={py(0)}
                x2={px(0)}
                y2={py(markerY)}
                stroke={MUTED}
                strokeWidth={1}
                strokeDasharray="4 4"
              />
              <motion.circle
                cx={px(0)}
                cy={py(markerY)}
                r={4.6}
                fill={INK}
                stroke="#fff"
                strokeWidth={1.4}
                initial={false}
                animate={{ scale: partReveal > 0.6 ? 1 : 0.7 }}
                style={{ transformOrigin: `${px(0)}px ${py(markerY)}px` }}
              />
              <text x={px(0) + 9} y={py(markerY) - 8} fontSize={10} fontWeight={700} fill={INK}>
                C
              </text>
              <text x={px(0) + 9} y={py(markerY) + 5} fontSize={8.5} fill={MUTED}>
                wypadkowa środków pasów
              </text>
            </>
          )}

          {index === 4 && (
            <>
              {[R / 3, R / 2].map((y, lineIndex) => (
                <g key={y}>
                  <motion.line
                    x1={px(-R)}
                    y1={py(y)}
                    x2={px(R)}
                    y2={py(y)}
                    stroke={MUTED}
                    strokeWidth={1}
                    strokeDasharray="5 4"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: playing ? smooth((p - 0.08 - lineIndex * 0.08) / 0.5) : 1 }}
                    transition={{ duration: 0.1, ease: 'linear' }}
                  />
                  <text x={px(R) + 6} y={py(y) + 3} fontSize={8.5} fill={MUTED}>
                    {lineIndex === 0 ? 'r/3 = 20 mm' : 'r/2 = 30 mm'}
                  </text>
                </g>
              ))}
              <motion.line
                x1={px(-R)}
                y1={py(Y_C)}
                x2={px(R)}
                y2={py(Y_C)}
                stroke={LOAD}
                strokeWidth={1.8}
                strokeDasharray="6 4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: playing ? smooth((p - 0.28) / 0.5) : 1 }}
                transition={{ duration: 0.1, ease: 'linear' }}
              />
              <text x={px(-R) + 4} y={py(Y_C) - 7} fontSize={9} fill={LOAD}>
                y_C = 25,46 mm
              </text>
              <motion.circle
                cx={px(0)}
                cy={py(Y_C)}
                r={4.6}
                fill={INK}
                stroke="#fff"
                strokeWidth={1.4}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.35, type: 'spring', stiffness: 260, damping: 18 }}
                style={{ transformOrigin: `${px(0)}px ${py(Y_C)}px` }}
              />
              <motion.circle
                cx={px(0)}
                cy={py(Y_C)}
                r={11}
                fill="none"
                stroke={INK}
                strokeWidth={1}
                initial={{ opacity: 0 }}
                animate={{ opacity: playing ? [0.15, 0.55, 0.15] : 0.3 }}
                transition={{ duration: 2.2, repeat: playing ? Infinity : 0, ease: 'easeInOut' }}
              />
              <text x={px(0) + 9} y={py(Y_C) - 8} fontSize={10} fontWeight={700} fill={INK}>
                C
              </text>
            </>
          )}
        </svg>
      </div>
    </div>
  )
}
