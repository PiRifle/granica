import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const STRENGTH = '#4f6df5'
const STIFFNESS = '#ff8a5c'
const LOAD = '#ff6b45'
const MUTED = '#87929d'
const INK = '#17202a'
const OK = '#2f7d5b'
const BAD = '#d64545'

const X0 = 150
const X1 = 420
const T_MAX_SCALE = 4
const xOf = (value: number) => X0 + (value / T_MAX_SCALE) * (X1 - X0)

const T_STRENGTH = 3.63
const T_STIFFNESS = 2.28
const TAU_LIMIT = 40
const TAU_AT_MAX = 25.1

const clamp01 = (value: number) => Math.max(0, Math.min(1, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}
const fmt = (value: number) => value.toFixed(2).replace('.', ',')

export function ShaftCapacityAnimation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const isModel = metric === 'model'
  const isGeometry = metric === 'geometry'
  const isStrength = metric === 'strength'
  const isStiffness = metric === 'stiffness'
  const isCheck = metric === 'check'
  const p = playing ? smooth(sceneProgress) : 1

  const tNow = isStrength ? T_STRENGTH * p : isStiffness ? T_STIFFNESS * p : isCheck ? T_STIFFNESS : 0
  const strengthBar = isStrength ? T_STRENGTH * p : isModel || isGeometry ? 0 : T_STRENGTH
  const stiffnessBar = isStiffness ? T_STIFFNESS * p : isModel || isGeometry || isStrength ? 0 : T_STIFFNESS
  const safeReveal = isCheck ? p : 0

  const phiDeg = tNow > 0 ? tNow / 2.281 : 0
  const theta = Math.min(45, phiDeg * 28)
  const thetaRad = (theta * Math.PI) / 180
  const phiColor = isCheck ? OK : phiDeg > 1.02 ? BAD : phiDeg > 0.99 ? STIFFNESS : MUTED
  const currentColor = isStrength ? STRENGTH : isStiffness ? STIFFNESS : isCheck ? OK : INK
  const note = isStrength
    ? 'Przy 3,63 kN·m kąt przekracza 1°.'
    : isStiffness
      ? 'Sztywność daje tylko 2,28 kN·m.'
      : isCheck
        ? 'Decyduje mniejsza nośność. Przy 2,28 kN·m kąt osiąga 1°, a naprężenie 25,1 MPa.'
        : isGeometry
          ? 'Geometria pierścienia wyznacza J_o i W_o.'
          : 'Istniejący wał rurowy: D = 90 mm, d = 70 mm.'

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 300"
          role="img"
          aria-label="Istniejący wał rurowy: porównanie dopuszczalnego momentu z warunku wytrzymałości i sztywności oraz sprawdzenie momentu 2,28 kN·m"
        >
          <text x={14} y={20} fontSize={9} fill={MUTED}>
            D = 90 mm
          </text>
          <text x={14} y={33} fontSize={9} fill={MUTED}>
            d = 70 mm
          </text>
          <text x={14} y={46} fontSize={9} fill={MUTED}>
            L = 2500 mm
          </text>
          <text x={14} y={59} fontSize={9} fill={MUTED}>
            G = 80 GPa
          </text>
          <text x={14} y={72} fontSize={9} fill={MUTED}>
            τ_dop = 40 MPa
          </text>
          <text x={14} y={85} fontSize={9} fill={MUTED}>
            φ_dop = 1°
          </text>
          <text x={14} y={98} fontSize={9} fill={INK}>
            T = ?
          </text>

          <rect x={132} y={38} width={302} height={24} rx={4} fill="#e8edfc" stroke="#7d8fa5" strokeWidth={1.2} />
          <line x1={132} y1={45} x2={434} y2={45} stroke="#aab6c4" strokeWidth={1} strokeDasharray="5 5" />
          <line x1={132} y1={55} x2={434} y2={55} stroke="#aab6c4" strokeWidth={1} strokeDasharray="5 5" />

          <path d="M132 31 A19 19 0 1 1 132 69" fill="none" stroke={LOAD} strokeWidth={1.6} />
          <path d="M132 69 l-5 -3 l5 -4 z" fill={LOAD} />
          <text x={104} y={26} fontSize={9} fill={LOAD}>
            T
          </text>
          <path d="M434 69 A19 19 0 1 1 434 31" fill="none" stroke={LOAD} strokeWidth={1.6} />
          <path d="M434 31 l5 3 l-5 4 z" fill={LOAD} />
          <text x={440} y={80} fontSize={9} fill={LOAD}>
            T
          </text>

          <line x1={434} y1={38} x2={434} y2={62} stroke="#7d8fa5" strokeWidth={1.2} />
          <line x1={434} y1={50} x2={434} y2={32} stroke={MUTED} strokeWidth={1} strokeDasharray="3 3" />
          <motion.line
            x1={434}
            y1={50}
            x2={434 - 16 * Math.sin(thetaRad)}
            y2={50 - 16 * Math.cos(thetaRad)}
            stroke={phiColor}
            strokeWidth={2.2}
            initial={false}
            animate={{
              x2: 434 - 16 * Math.sin(thetaRad),
              y2: 50 - 16 * Math.cos(thetaRad),
              stroke: phiColor,
            }}
            transition={{ duration: 0.12, ease: 'linear' }}
          />
          {tNow > 0 && (
            <>
              <text x={398} y={22} textAnchor="middle" fontSize={9} fill={phiColor}>
                φ = {fmt(phiDeg)}°
              </text>
              <text x={398} y={34} textAnchor="middle" fontSize={9} fill={currentColor}>
                T = {fmt(tNow)} kN·m
              </text>
            </>
          )}

          <circle cx={78} cy={146} r={45} fill="#e8edfc" fillOpacity={0.85} stroke="#7d8fa5" strokeWidth={1.8} />
          <circle cx={78} cy={146} r={35} fill="#fff" stroke="#87929d" strokeWidth={1.1} />
          <line x1={78} y1={101} x2={78} y2={191} stroke={MUTED} strokeWidth={0.8} strokeDasharray="3 3" />
          <line x1={78} y1={146} x2={78} y2={111} stroke={STRENGTH} strokeWidth={1.4} />
          <line
            x1={78}
            y1={146}
            x2={78 + 35 * Math.cos(-0.6)}
            y2={146 + 35 * Math.sin(-0.6)}
            stroke={STIFFNESS}
            strokeWidth={1.4}
          />
          {isGeometry && (
            <motion.circle
              cx={78}
              cy={146}
              r={40}
              fill="none"
              stroke={STIFFNESS}
              strokeWidth={5}
              strokeOpacity={0.45}
              initial={false}
              animate={{ opacity: p }}
              transition={{ duration: 0.2, ease: 'linear' }}
            />
          )}
          <text x={78} y={204} textAnchor="middle" fontSize={8.5} fill={INK}>
            rura ∅90/∅70
          </text>
          {isGeometry && (
            <text x={78} y={217} textAnchor="middle" fontSize={8.5} fill={MUTED}>
              ścianka t = 10 mm
            </text>
          )}

          <text x={X0} y={110} fontSize={8.5} fill={STRENGTH}>
            nośność z wytrzymałości
          </text>
          {strengthBar > 0.01 && (
            <>
              <motion.rect
                x={X0}
                y={114}
                height={12}
                rx={3}
                fill={STRENGTH}
                fillOpacity={0.2}
                stroke={STRENGTH}
                strokeWidth={1.2}
                initial={false}
                animate={{ width: xOf(strengthBar) - X0 }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <text x={xOf(strengthBar) + 4} y={123} fontSize={8.5} fill={STRENGTH}>
                {fmt(strengthBar)} kN·m
              </text>
            </>
          )}

          <text x={X0} y={136} fontSize={8.5} fill={STIFFNESS}>
            nośność ze sztywności
          </text>
          {stiffnessBar > 0.01 && (
            <>
              <motion.rect
                x={X0}
                y={140}
                height={12}
                rx={3}
                fill={STIFFNESS}
                fillOpacity={0.2}
                stroke={STIFFNESS}
                strokeWidth={1.2}
                initial={false}
                animate={{ width: xOf(stiffnessBar) - X0 }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <text x={xOf(stiffnessBar) + 4} y={149} fontSize={8.5} fill={STIFFNESS}>
                {fmt(stiffnessBar)} kN·m
              </text>
            </>
          )}

          <line x1={X0} y1={170} x2={X1} y2={170} stroke="#c9d0d9" strokeWidth={1} />
          {[0, 1, 2, 3, 4].map((tick) => (
            <g key={tick}>
              <line x1={xOf(tick)} y1={166} x2={xOf(tick)} y2={174} stroke="#c9d0d9" strokeWidth={1} />
              <text x={xOf(tick)} y={184} textAnchor="middle" fontSize={8} fill={MUTED}>
                {tick}
              </text>
            </g>
          ))}
          <text x={X1} y={196} textAnchor="end" fontSize={8.5} fill={MUTED}>
            T [kN·m]
          </text>

          {tNow > 0 && <circle cx={xOf(tNow)} cy={170} r={4} fill={currentColor} stroke="#fff" strokeWidth={1} />}

          {safeReveal > 0.01 && (
            <g opacity={safeReveal}>
              <rect
                x={xOf(T_STIFFNESS)}
                y={104}
                width={X1 - xOf(T_STIFFNESS)}
                height={62}
                fill={BAD}
                fillOpacity={0.06}
              />
              <line
                x1={xOf(T_STIFFNESS)}
                y1={100}
                x2={xOf(T_STIFFNESS)}
                y2={170}
                stroke={OK}
                strokeWidth={1.4}
                strokeDasharray="5 4"
              />
              <text x={xOf(T_STIFFNESS)} y={98} textAnchor="middle" fontSize={8.5} fontWeight={700} fill={OK}>
                T_max = 2,28
              </text>
              <text x={X1 - 4} y={165} textAnchor="end" fontSize={8.5} fill={BAD}>
                poza zakresem
              </text>
            </g>
          )}

          {!isCheck && (
            <text x={X0} y={214} fontSize={8.5} fill={isModel || isGeometry ? MUTED : currentColor}>
              {note}
            </text>
          )}

          {isCheck && (
            <motion.g initial={false} animate={{ opacity: p }} transition={{ duration: 0.2 }}>
              <text x={X0} y={212} fontSize={8.5} fill={OK}>
                τ = 25,1 MPa ≤ 40 MPa
              </text>
              <rect x={X0} y={216} width={270} height={7} rx={3} fill="#eef1f4" />
              <motion.rect
                x={X0}
                y={216}
                height={7}
                rx={3}
                fill={STRENGTH}
                fillOpacity={0.8}
                initial={false}
                animate={{ width: 270 * (TAU_AT_MAX / TAU_LIMIT) }}
                transition={{ duration: 0.2, ease: 'linear' }}
              />
              <text x={X0} y={238} fontSize={8.5} fill={STIFFNESS}>
                φ = 1,0° = φ_dop — decyduje sztywność
              </text>
              <rect x={X0} y={242} width={270} height={7} rx={3} fill="#eef1f4" />
              <motion.rect
                x={X0}
                y={242}
                height={7}
                rx={3}
                fill={STIFFNESS}
                fillOpacity={0.9}
                initial={false}
                animate={{ width: 270 }}
                transition={{ duration: 0.2, ease: 'linear' }}
              />
              <text x={X0} y={266} fontSize={8.5} fontWeight={700} fill={OK}>
                ✓ moment 2,28 kN·m jest bezpieczny
              </text>
            </motion.g>
          )}
        </svg>
      </div>
    </div>
  )
}
