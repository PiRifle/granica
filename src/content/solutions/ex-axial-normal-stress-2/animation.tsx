import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const LOAD = '#ff6b45'
const STRESS = '#a970dd'
const MUTED = '#87929d'
const OK = '#2e9e6b'
const BAD = '#d94f3d'

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}

const ROD_TOP = 58
const ROD_BOTTOM = 212
const CUT_Y = 134

const RODS = [
  { cx: 134, half: 26, area: 300, sigma: 100, label: '1' },
  { cx: 310, half: 18.4, area: 150, sigma: 200, label: '2' },
]

export function NormalStressExample2Animation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const progress = smooth(playing ? sceneProgress : 1)
  const focused = metric === 'sigma1' ? 1 : metric === 'sigma2' ? 2 : 0
  const check = metric === 'check'
  const showArrows = (rod: number) => check || focused === rod
  const dimmed = (rod: number) => focused !== 0 && focused !== rod

  const sigmaMax = 220
  const gaugeX = (value: number) => 70 + (value / sigmaMax) * 350

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 330"
          role="img"
          aria-label="Dwa niezależne pręty rozciągane tą samą siłą 30 kiloniutonów. Pierwszy ma pole 300 milimetrów kwadratowych i naprężenie 100 megapaskali, drugi pole 150 milimetrów kwadratowych i naprężenie 200 megapaskali. Animacja porównuje oba pręty i warunek naprężenia dopuszczalnego 160 megapaskali."
        >
          <defs>
            <marker
              id="ans2-load"
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
              id="ans2-stress"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={STRESS} />
            </marker>
            <marker
              id="ans2-dim"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={MUTED} />
            </marker>
            <marker
              id="ans2-ok"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={OK} />
            </marker>
            <marker
              id="ans2-bad"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={BAD} />
            </marker>
          </defs>

          {RODS.map((rod, rodIndex) => {
            const rodNumber = rodIndex + 1
            const accent = check ? (rodNumber === 1 ? OK : BAD) : ACCENT
            const arrows = showArrows(rodNumber)
            const arrowLength = (rodIndex === 0 ? 20 : 40) * progress

            return (
              <motion.g
                key={rod.label}
                initial={false}
                animate={{ opacity: dimmed(rodNumber) ? 0.32 : 1 }}
                transition={{ duration: 0.3 }}
              >
                <motion.rect
                  x={rod.cx - rod.half}
                  y={ROD_TOP}
                  width={rod.half * 2}
                  height={ROD_BOTTOM - ROD_TOP}
                  rx={4}
                  fill={accent}
                  fillOpacity={0.14}
                  stroke={accent}
                  strokeWidth={focused === rodNumber || check ? 2.8 : 2}
                  animate={{ fillOpacity: focused === rodNumber || check ? 0.2 : 0.12 }}
                  transition={{ duration: 0.3 }}
                />

                <line
                  x1={rod.cx - rod.half - 16}
                  y1={ROD_TOP}
                  x2={rod.cx + rod.half + 16}
                  y2={ROD_TOP}
                  stroke={MUTED}
                  strokeWidth={1}
                />
                <line
                  x1={rod.cx - rod.half - 16}
                  y1={ROD_BOTTOM}
                  x2={rod.cx + rod.half + 16}
                  y2={ROD_BOTTOM}
                  stroke={MUTED}
                  strokeWidth={1}
                />
                <line
                  x1={rod.cx - rod.half - 10}
                  y1={ROD_TOP}
                  x2={rod.cx - rod.half - 10}
                  y2={ROD_BOTTOM}
                  stroke={MUTED}
                  strokeWidth={1}
                  markerStart="url(#ans2-dim)"
                  markerEnd="url(#ans2-dim)"
                />

                <motion.g
                  animate={playing ? { opacity: [0.7, 1, 0.7] } : { opacity: 1 }}
                  transition={{ duration: 1.9, repeat: playing ? Infinity : 0, ease: 'easeInOut' }}
                >
                  <line
                    x1={rod.cx}
                    y1={ROD_TOP - 12}
                    x2={rod.cx}
                    y2={ROD_TOP - 42}
                    stroke={LOAD}
                    strokeWidth={2.4}
                    markerEnd="url(#ans2-load)"
                  />
                  <line
                    x1={rod.cx}
                    y1={ROD_BOTTOM + 12}
                    x2={rod.cx}
                    y2={ROD_BOTTOM + 42}
                    stroke={LOAD}
                    strokeWidth={2.4}
                    markerEnd="url(#ans2-load)"
                  />
                  <text x={rod.cx} y={ROD_TOP - 48} textAnchor="middle" fontSize={10} fill={LOAD}>
                    N = 30 kN
                  </text>
                </motion.g>

                <text x={rod.cx} y={ROD_BOTTOM + 56} textAnchor="middle" fontSize={9.5} fill={MUTED}>
                  A{rodNumber === 1 ? '₁' : '₂'} = {rod.area} mm²
                </text>

                {(metric === 'N' || showArrows(rodNumber)) && (
                  <g>
                    <line
                      x1={rod.cx - rod.half - 12}
                      y1={CUT_Y}
                      x2={rod.cx + rod.half + 12}
                      y2={CUT_Y}
                      stroke={arrows ? STRESS : LOAD}
                      strokeWidth={1.3}
                      strokeDasharray="4 3"
                    />

                    {arrows &&
                      [-0.7, -0.35, 0, 0.35, 0.7].map((offset) => (
                        <line
                          key={offset}
                          x1={rod.cx + offset * rod.half}
                          y1={CUT_Y + 3}
                          x2={rod.cx + offset * rod.half}
                          y2={CUT_Y + 3 + arrowLength}
                          stroke={check ? accent : STRESS}
                          strokeWidth={1.7}
                          markerEnd={
                            check ? (rodNumber === 1 ? 'url(#ans2-ok)' : 'url(#ans2-bad)') : 'url(#ans2-stress)'
                          }
                        />
                      ))}

                    {metric === 'N' && (
                      <text x={rod.cx} y={CUT_Y - 9} textAnchor="middle" fontSize={9} fill={LOAD}>
                        N = +30 kN
                      </text>
                    )}
                  </g>
                )}

                {arrows && !check && (
                  <text
                    x={rod.cx}
                    y={CUT_Y + (rodIndex === 0 ? 20 : 40) + 20}
                    textAnchor="middle"
                    fontSize={10}
                    fontWeight={700}
                    fill={rodIndex === 0 ? ACCENT : LOAD}
                  >
                    σ{rodNumber === 1 ? '₁' : '₂'} = {rod.sigma} MPa
                  </text>
                )}

                {check && (
                  <text
                    x={rod.cx}
                    y={CUT_Y + (rodIndex === 0 ? 20 : 40) + 20}
                    textAnchor="middle"
                    fontSize={9.5}
                    fontWeight={700}
                    fill={rodNumber === 1 ? OK : BAD}
                  >
                    {rod.sigma} MPa — {rodNumber === 1 ? 'OK' : 'przekroczenie'}
                  </text>
                )}
              </motion.g>
            )
          })}

          {check && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
              <line x1={70} y1={296} x2={420} y2={296} stroke="#c9d0d9" strokeWidth={1.2} />
              {[0, 100, 160, 200].map((value) => (
                <g key={value}>
                  <line
                    x1={gaugeX(value)}
                    y1={291}
                    x2={gaugeX(value)}
                    y2={301}
                    stroke={value === 160 ? LOAD : '#c9d0d9'}
                    strokeWidth={value === 160 ? 1.5 : 1}
                    strokeDasharray={value === 160 ? '3 3' : undefined}
                  />
                  <text x={gaugeX(value)} y={314} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                    {value}
                  </text>
                </g>
              ))}
              <text x={420} y={326} textAnchor="end" fontSize={8.5} fill={MUTED}>
                σ [MPa]
              </text>

              <line
                x1={gaugeX(160)}
                y1={286}
                x2={gaugeX(160)}
                y2={308}
                stroke={LOAD}
                strokeWidth={1.4}
                strokeDasharray="3 3"
              />
              <text x={gaugeX(160)} y={280} textAnchor="middle" fontSize={8.5} fill={LOAD}>
                σdop = 160
              </text>

              <circle cx={gaugeX(100)} cy={296} r={4} fill={OK} />
              <circle cx={gaugeX(200)} cy={296} r={4} fill={BAD} />
              <text x={gaugeX(100)} y={288} textAnchor="middle" fontSize={9} fontWeight={700} fill={OK}>
                σ₁
              </text>
              <text x={gaugeX(200)} y={288} textAnchor="middle" fontSize={9} fontWeight={700} fill={BAD}>
                σ₂
              </text>
            </motion.g>
          )}

          <text x={12} y={28} fontSize={9.5} fill={MUTED}>
            {metric === 'model' && 'dwa pręty, ta sama siła'}
            {metric === 'N' && 'jednakowa siła N'}
            {metric === 'sigma1' && 'pręt 1 — większe pole'}
            {metric === 'sigma2' && 'pręt 2 — mniejsze pole'}
            {metric === 'check' && 'warunek σ'}
          </text>
        </svg>
      </div>
    </div>
  )
}
