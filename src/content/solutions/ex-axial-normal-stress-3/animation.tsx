import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const LOAD = '#ff6b45'
const STRESS = '#a970dd'
const MUTED = '#87929d'
const EDGE = '#68727e'
const OK = '#2e9e6b'
const BAD = '#d94f3d'
const INK = '#17202a'

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}

const BAR = { cx: 148, top: 58, bottom: 224 }
const SECTION = { cx: 342, cy: 138 }

export function NormalStressExample3Animation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const progress = smooth(playing ? sceneProgress : 1)

  const targetDiameter =
    metric === 'model' ? 24 : metric === 'chosen' || metric === 'check' || metric === 'compression' ? 28 : 27.6
  const barWidth = metric === 'model' ? 34 : metric === 'area' ? 34 + 7.4 * progress : targetDiameter * 1.5

  const sectionRadius =
    metric === 'model' ? 48 : metric === 'area' ? 40 + 15.2 * progress : metric === 'diameter' ? 55.2 : 56
  const compression = metric === 'compression'
  const showGauge = metric === 'check'

  const gaugeX = (value: number) => 250 + (value / 130) * 180
  const dLabel = metric === 'model' || metric === 'area' ? 'd = ?' : metric === 'diameter' ? 'd ≈ 27,6 mm' : 'd = 28 mm'
  const showBar = metric !== 'chosen'
  const sectionCx = metric === 'chosen' ? 230 : SECTION.cx
  const sectionCy = metric === 'chosen' ? 158 : SECTION.cy
  const sectionR = metric === 'chosen' ? 82 : sectionRadius

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 320"
          role="img"
          aria-label="Pręt kołowy rozciągany siłą 72 kiloniutonów. Animacja pokazuje nieznaną średnicę, minimalne pole 600 milimetrów kwadratowych, dobór średnicy 28 milimetrów i kontrolę naprężenia 116,9 megapaskali przy wartości dopuszczalnej 120 megapaskali."
        >
          <defs>
            <marker
              id="ans3-load"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={LOAD} />
            </marker>
            <marker
              id="ans3-dim"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={MUTED} />
            </marker>
          </defs>

          {showBar && (
            <>
              <g stroke={EDGE} strokeWidth={2} strokeLinecap="round">
                <line x1={BAR.cx - barWidth / 2 - 18} y1={BAR.top} x2={BAR.cx + barWidth / 2 + 18} y2={BAR.top} />
                {Array.from({ length: 6 }, (_, tick) => {
                  const x = BAR.cx - barWidth / 2 - 13 + tick * ((barWidth + 26) / 5)
                  return <line key={tick} x1={x} y1={BAR.top} x2={x - 7} y2={BAR.top - 10} strokeWidth={1.4} />
                })}
              </g>

              <motion.rect
                x={BAR.cx - barWidth / 2}
                y={BAR.top}
                width={barWidth}
                height={BAR.bottom - BAR.top}
                rx={4}
                fill={metric === 'check' || compression ? STRESS : ACCENT}
                fillOpacity={metric === 'check' ? 0.26 : 0.16}
                stroke={metric === 'check' || compression ? STRESS : ACCENT}
                strokeWidth={2}
                strokeDasharray={metric === 'model' ? '6 5' : undefined}
                animate={{ width: barWidth }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              />
              <ellipse
                cx={BAR.cx}
                cy={BAR.bottom}
                rx={barWidth / 2}
                ry={barWidth / 7}
                fill="none"
                stroke={metric === 'check' || compression ? STRESS : ACCENT}
                strokeWidth={1.6}
              />

              {metric === 'compression' && (
                <motion.path
                  d={`M ${BAR.cx - barWidth / 2} ${BAR.top + 6} Q ${BAR.cx - barWidth / 2 - 34} ${(BAR.top + BAR.bottom) / 2} ${BAR.cx - barWidth / 2} ${BAR.bottom - 6}`}
                  fill="none"
                  stroke={BAD}
                  strokeWidth={1.6}
                  strokeDasharray="5 4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.85 }}
                  transition={{ duration: 0.4 }}
                />
              )}

              {metric === 'compression' && (
                <text
                  x={BAR.cx - barWidth / 2 - 40}
                  y={(BAR.top + BAR.bottom) / 2 + 4}
                  textAnchor="end"
                  fontSize={8.5}
                  fill={BAD}
                >
                  możliwe
                </text>
              )}
              {metric === 'compression' && (
                <text
                  x={BAR.cx - barWidth / 2 - 40}
                  y={(BAR.top + BAR.bottom) / 2 + 16}
                  textAnchor="end"
                  fontSize={8.5}
                  fill={BAD}
                >
                  wyboczenie
                </text>
              )}

              <g opacity={metric === 'diameter' ? progress : 1}>
                <line
                  x1={BAR.cx - barWidth / 2}
                  y1={BAR.top + 34}
                  x2={BAR.cx + barWidth / 2}
                  y2={BAR.top + 34}
                  stroke={MUTED}
                  strokeWidth={1}
                  markerStart="url(#ans3-dim)"
                  markerEnd="url(#ans3-dim)"
                />
                <text x={BAR.cx} y={BAR.top + 26} textAnchor="middle" fontSize={9} fill={MUTED}>
                  {dLabel}
                </text>
              </g>

              <text x={BAR.cx - barWidth / 2 - 16} y={BAR.top + 58} textAnchor="end" fontSize={9} fill={MUTED}>
                {compression ? 'N < 0' : 'N > 0'}
              </text>

              <motion.g
                animate={playing ? { opacity: [0.72, 1, 0.72] } : { opacity: 1 }}
                transition={{ duration: 1.9, repeat: playing ? Infinity : 0, ease: 'easeInOut' }}
              >
                {compression ? (
                  <>
                    <line
                      x1={BAR.cx}
                      y1={BAR.bottom + 56}
                      x2={BAR.cx}
                      y2={BAR.bottom + 14}
                      stroke={LOAD}
                      strokeWidth={2.6}
                      markerEnd="url(#ans3-load)"
                    />
                    <text x={BAR.cx + 10} y={BAR.bottom + 38} fontSize={10} fill={LOAD}>
                      N = −72 kN
                    </text>
                  </>
                ) : (
                  <>
                    <line
                      x1={BAR.cx}
                      y1={BAR.bottom + 14}
                      x2={BAR.cx}
                      y2={BAR.bottom + 56}
                      stroke={LOAD}
                      strokeWidth={2.6}
                      markerEnd="url(#ans3-load)"
                    />
                    <text x={BAR.cx + 10} y={BAR.bottom + 38} fontSize={10} fill={LOAD}>
                      N = 72 kN
                    </text>
                  </>
                )}
              </motion.g>

              <text x={12} y={BAR.top + 20} fontSize={9} fill={MUTED}>
                σdop = 120 MPa
              </text>
            </>
          )}
          <text x={sectionCx} y={sectionCy - sectionR - 12} textAnchor="middle" fontSize={9} fill={MUTED}>
            przekrój kołowy
          </text>

          <motion.circle
            cx={sectionCx}
            cy={sectionCy}
            r={sectionR}
            fill={metric === 'check' || compression ? STRESS : ACCENT}
            initial={false}
            animate={{ r: sectionR, fillOpacity: metric === 'check' ? 0.24 : 0.1 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            stroke={metric === 'check' || compression ? STRESS : ACCENT}
            strokeWidth={2}
            strokeDasharray={metric === 'model' ? '6 5' : undefined}
          />

          {metric === 'model' && (
            <text x={sectionCx} y={sectionCy + 5} textAnchor="middle" fontSize={16} fontWeight={700} fill={ACCENT}>
              d = ?
            </text>
          )}

          {metric === 'area' && (
            <g>
              <text x={sectionCx} y={sectionCy - 2} textAnchor="middle" fontSize={11} fontWeight={700} fill={ACCENT}>
                A_min
              </text>
              <text x={sectionCx} y={sectionCy + 14} textAnchor="middle" fontSize={11} fill={ACCENT}>
                600 mm²
              </text>
            </g>
          )}

          {(metric === 'diameter' || metric === 'chosen' || metric === 'check') && (
            <g>
              <line
                x1={sectionCx - sectionR * progress}
                y1={sectionCy}
                x2={sectionCx + sectionR * progress}
                y2={sectionCy}
                stroke={MUTED}
                strokeWidth={1.2}
                markerStart="url(#ans3-dim)"
                markerEnd="url(#ans3-dim)"
              />
              <text x={sectionCx} y={sectionCy - 8} textAnchor="middle" fontSize={10} fill={MUTED}>
                {metric === 'diameter' ? 'd ≈ 27,6 mm' : 'd = 28 mm'}
              </text>
            </g>
          )}

          {metric === 'chosen' && (
            <text
              x={sectionCx}
              y={sectionCy + sectionR + 20}
              textAnchor="middle"
              fontSize={10}
              fontWeight={700}
              fill={ACCENT}
            >
              A ≈ 615,8 mm²
            </text>
          )}

          {metric === 'check' && (
            <text
              x={sectionCx}
              y={sectionCy + sectionR + 20}
              textAnchor="middle"
              fontSize={11}
              fontWeight={700}
              fill={STRESS}
            >
              σ = 116,9 MPa
            </text>
          )}

          {metric === 'compression' && (
            <g>
              <text x={sectionCx} y={sectionCy - 2} textAnchor="middle" fontSize={10} fontWeight={700} fill={STRESS}>
                σ = −116,9 MPa
              </text>
              <text x={sectionCx} y={sectionCy + 14} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                ten sam przekrój
              </text>
            </g>
          )}

          {showGauge && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
              <line x1={250} y1={252} x2={430} y2={252} stroke="#c9d0d9" strokeWidth={1.2} />
              <line
                x1={gaugeX(120)}
                y1={244}
                x2={gaugeX(120)}
                y2={260}
                stroke={LOAD}
                strokeWidth={1.5}
                strokeDasharray="3 3"
              />
              <text x={gaugeX(120)} y={230} textAnchor="middle" fontSize={8.5} fill={LOAD}>
                σdop = 120
              </text>

              <circle cx={gaugeX(116.9)} cy={252} r={4} fill={OK} />
              <text x={gaugeX(116.9) - 6} y={244} textAnchor="end" fontSize={8.5} fill={OK}>
                116,9
              </text>

              <circle cx={gaugeX(125.7)} cy={252} r={4} fill="none" stroke={BAD} strokeWidth={1.6} />
              <text x={gaugeX(125.7)} y={270} textAnchor="middle" fontSize={8.5} fill={BAD}>
                125,7 (d = 27)
              </text>

              <text x={250} y={270} fontSize={8.5} fill={MUTED}>
                0
              </text>
              <text x={430} y={286} textAnchor="end" fontSize={8.5} fill={MUTED}>
                σ [MPa]
              </text>
            </motion.g>
          )}

          <text x={12} y={310} fontSize={9} fill={INK}>
            {metric === 'model' && 'średnica niewiadoma, siła i σdop dane'}
            {metric === 'area' && 'najpierw minimalne pole przekroju'}
            {metric === 'diameter' && 'z pola wynika średnica teoretyczna'}
            {metric === 'chosen' && 'przyjęto średnicę znormalizowaną'}
            {metric === 'check' && 'ponowna kontrola po zaokrągleniu'}
            {metric === 'compression' && 'ściskanie wymaga sprawdzenia wyboczenia'}
          </text>
        </svg>
      </div>
    </div>
  )
}
