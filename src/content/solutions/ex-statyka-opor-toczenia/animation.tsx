import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const DRIVE = '#ff6b45'
const FRICTION = '#4f6df5'
const NORMAL = '#27835a'
const WEIGHT = '#68727e'
const MUTED = '#9aa5b1'
const INK = '#17202a'
const DEFORM = '#b07a4f'

const GROUND = 280
const CENTER = { x: 210, y: 218 }
const RADIUS = 62

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))

const arcPath = (cx: number, cy: number, radius: number, from: number, to: number) => {
  const a = (from * Math.PI) / 180
  const b = (to * Math.PI) / 180
  return `M ${cx + radius * Math.cos(a)} ${cy + radius * Math.sin(a)} A ${radius} ${radius} 0 0 1 ${cx + radius * Math.cos(b)} ${cy + radius * Math.sin(b)}`
}

export function RollingResistanceAnimation({ index, playing, sceneProgress }: SolutionAnimationProps) {
  const t = playing ? clamp01(sceneProgress) : 1
  const showDeform = index >= 1
  const showMoment = index >= 2
  const showDrive = index >= 3
  const showCheck = index === 4
  const showIncline = index === 5
  const nX = showDeform ? CENTER.x + 15 : CENTER.x
  const pLength = showDrive ? 60 : index === 0 ? 38 : 0
  const spin = index >= 3 ? (playing ? 26 * t : 26) : 0

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg viewBox="0 0 460 340" role="img" aria-label="Walec na odkształcalnym podłożu z oporem toczenia">
          <title>Opór toczenia walca</title>
          <desc>Walec, przesunięta wypadkowa nacisku, moment oporu, siła progowa i kąt równi granicznej.</desc>
          <defs>
            <marker
              id="ex-toczenie-p"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={DRIVE} />
            </marker>
            <marker
              id="ex-toczenie-t"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={FRICTION} />
            </marker>
            <marker
              id="ex-toczenie-n"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={NORMAL} />
            </marker>
            <marker
              id="ex-toczenie-g"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={WEIGHT} />
            </marker>
            <marker
              id="ex-toczenie-m"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={WEIGHT} />
            </marker>
          </defs>

          <g opacity={showIncline ? 0.28 : 1}>
            <line x1="34" y1={GROUND} x2="432" y2={GROUND} stroke={MUTED} strokeWidth="2" />
            {Array.from({ length: 14 }, (_, i) => (
              <line
                key={`hatch-${i}`}
                x1={44 + i * 28}
                y1={GROUND}
                x2={36 + i * 28}
                y2={GROUND + 13}
                stroke={MUTED}
                strokeWidth="1.2"
              />
            ))}

            {showDeform && (
              <path
                d={`M 146 ${GROUND} Q ${CENTER.x} ${GROUND + 18} 276 ${GROUND}`}
                fill="none"
                stroke={DEFORM}
                strokeWidth="2.6"
                opacity="0.75"
              />
            )}

            <motion.g
              initial={false}
              animate={{ rotate: spin }}
              transition={{ type: 'spring', stiffness: 50, damping: 18 }}
              style={{ transformOrigin: `${CENTER.x}px ${CENTER.y}px` }}
            >
              <circle cx={CENTER.x} cy={CENTER.y} r={RADIUS} fill="#eef2fb" stroke="#4f6df5" strokeWidth="2.8" />
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
                const rad = (angle * Math.PI) / 180
                return (
                  <line
                    key={`spoke-${angle}`}
                    x1={CENTER.x + 14 * Math.cos(rad)}
                    y1={CENTER.y + 14 * Math.sin(rad)}
                    x2={CENTER.x + (RADIUS - 5) * Math.cos(rad)}
                    y2={CENTER.y + (RADIUS - 5) * Math.sin(rad)}
                    stroke="#b9c4d4"
                    strokeWidth="1.3"
                  />
                )
              })}
              <circle cx={CENTER.x} cy={CENTER.y} r="5" fill={INK} />
            </motion.g>

            <line
              x1={CENTER.x}
              y1={CENTER.y}
              x2={CENTER.x}
              y2={CENTER.y + 84}
              stroke={WEIGHT}
              strokeWidth="3.4"
              markerEnd="url(#ex-toczenie-g)"
            />
            <text x={CENTER.x - 8} y={CENTER.y + 96} textAnchor="end" fontSize="11" fill={WEIGHT}>
              G = 2 kN
            </text>

            <line
              x1={nX}
              y1={GROUND}
              x2={nX}
              y2={GROUND - 62}
              stroke={NORMAL}
              strokeWidth="3.2"
              markerEnd="url(#ex-toczenie-n)"
            />
            <text x={nX + 7} y={GROUND - 66} fontSize="11" fill={NORMAL}>
              N = 2000 N
            </text>

            {showDeform && (
              <g stroke={DEFORM} fill={DEFORM}>
                <line x1={CENTER.x} y1={GROUND + 28} x2={nX} y2={GROUND + 28} strokeWidth="1.2" />
                <line x1={CENTER.x} y1={GROUND + 23} x2={CENTER.x} y2={GROUND + 33} strokeWidth="1.2" />
                <line x1={nX} y1={GROUND + 23} x2={nX} y2={GROUND + 33} strokeWidth="1.2" />
                <text x={(CENTER.x + nX) / 2} y={GROUND + 42} textAnchor="middle" fontSize="10" stroke="none">
                  f = 0,005 m
                </text>
              </g>
            )}

            {pLength > 0 && (
              <>
                <line
                  x1={CENTER.x}
                  y1={CENTER.y}
                  x2={CENTER.x + pLength}
                  y2={CENTER.y}
                  stroke={DRIVE}
                  strokeWidth="3.8"
                  markerEnd="url(#ex-toczenie-p)"
                  opacity={showDrive ? 1 : 0.35}
                />
                <text x={CENTER.x + pLength + 8} y={CENTER.y - 6} fontSize="11" fill={DRIVE}>
                  P = {showDrive ? '40' : '?'} N
                </text>
              </>
            )}

            {showDrive && (
              <>
                <line
                  x1={CENTER.x - RADIUS + 2}
                  y1={GROUND - 5}
                  x2={CENTER.x - RADIUS - 52}
                  y2={GROUND - 5}
                  stroke={FRICTION}
                  strokeWidth="3.2"
                  markerEnd="url(#ex-toczenie-t)"
                />
                <text x={CENTER.x - RADIUS - 58} y={GROUND - 14} textAnchor="end" fontSize="11" fill={FRICTION}>
                  T = 40 N
                </text>
              </>
            )}

            {showMoment && (
              <>
                <path
                  d={arcPath(CENTER.x, CENTER.y, 36, 235, 305)}
                  fill="none"
                  stroke={WEIGHT}
                  strokeWidth="2.6"
                  markerEnd="url(#ex-toczenie-m)"
                />
                <text x={CENTER.x} y={CENTER.y - 46} textAnchor="middle" fontSize="11" fill={WEIGHT}>
                  M_t = 10 N·m
                </text>
              </>
            )}

            {index === 2 && (
              <text x="230" y="326" textAnchor="middle" fontSize="11" fill={WEIGHT}>
                Moment oporu powstaje z ramienia f, a nie z tarcia ślizgowego
              </text>
            )}
            {index === 3 && (
              <text x="230" y="326" textAnchor="middle" fontSize="11" fill={DRIVE}>
                P · r = N · f, stąd P = 40 N
              </text>
            )}
            {index === 4 && (
              <text x="230" y="326" textAnchor="middle" fontSize="11" fill={NORMAL}>
                Tarcie 40 N to zaledwie 10% granicy 400 N
              </text>
            )}
            {index === 1 && (
              <text x="230" y="326" textAnchor="middle" fontSize="11" fill={DEFORM}>
                Odkształcenie podłoża przesuwa normalną o f do przodu
              </text>
            )}
            {index === 0 && (
              <text x="230" y="326" textAnchor="middle" fontSize="11" fill={MUTED}>
                Walec, nacisk i siła pozioma przyłożona do osi
              </text>
            )}

            {showCheck && (
              <g>
                <rect x="28" y="34" width="154" height="92" rx="8" fill="#f7f9fc" stroke="#dfe6f2" />
                <text x="40" y="52" fontSize="10" fill={INK}>
                  tarcie potrzebne vs granica
                </text>
                <text x="40" y="74" fontSize="9" fill={FRICTION}>
                  T
                </text>
                <rect x="64" y="66" width="10" height="9" rx="4" fill={FRICTION} />
                <text x="80" y="74" fontSize="9" fill={FRICTION}>
                  40 N
                </text>
                <text x="40" y="98" fontSize="9" fill={NORMAL}>
                  μsN
                </text>
                <rect x="64" y="90" width="100" height="9" rx="4" fill={NORMAL} opacity="0.8" />
                <text x="168" y="98" fontSize="9" fill={NORMAL}>
                  400 N
                </text>
                <text x="40" y="118" fontSize="9" fill={NORMAL}>
                  zapas dziesięciokrotny — toczenie bez poślizgu
                </text>
              </g>
            )}
          </g>

          {showIncline && (
            <g>
              <rect x="282" y="30" width="158" height="116" rx="8" fill="#f7f9fc" stroke="#dfe6f2" />
              <text x="294" y="48" fontSize="10" fill={INK}>
                równia graniczna (kąt powiększony)
              </text>
              <line x1="294" y1="120" x2="426" y2="96" stroke={MUTED} strokeWidth="2" />
              <circle cx="360" cy="86" r="19" fill="#eef2fb" stroke="#4f6df5" strokeWidth="2" />
              <line x1="360" y1="92" x2="360" y2="109" stroke={NORMAL} strokeWidth="2" />
              <circle cx="360" cy="86" r="2" fill={INK} />
              <path d="M 308 120 A 24 24 0 0 0 317 107" fill="none" stroke={INK} strokeWidth="1.2" />
              <text x="322" y="120" fontSize="9" fill={INK}>
                α_max = 1,15°
              </text>
              <text x="300" y="138" fontSize="9" fill={WEIGHT}>
                tg α_max = f/r = 0,02
              </text>
            </g>
          )}
        </svg>
      </div>
    </div>
  )
}
