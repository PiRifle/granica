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
const X1 = 434
const D_MAX = 90
const xOf = (value: number) => X0 + (value / D_MAX) * (X1 - X0)

const D_STRENGTH = 62.91
const D_STIFFNESS = 70.05
const D_CHOSEN = 75
const PHI_LIMIT = 1.2
const PHI_CHOSEN = 0.913
const TAU_CHOSEN = 26.6

const clamp01 = (value: number) => Math.max(0, Math.min(1, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}
const fmt = (value: number) => value.toFixed(2).replace('.', ',')

export function ShaftDesignAnimation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const isModel = metric === 'model'
  const isStrength = metric === 'strength'
  const isStiffness = metric === 'stiffness'
  const isGoverning = metric === 'governing'
  const isCheck = metric === 'check'
  const p = playing ? smooth(sceneProgress) : 1

  const dNow = isModel
    ? 0
    : isStrength
      ? D_STRENGTH * p
      : isStiffness
        ? D_STRENGTH + (D_STIFFNESS - D_STRENGTH) * p
        : isGoverning
          ? D_STIFFNESS + (D_CHOSEN - D_STIFFNESS) * p
          : D_CHOSEN

  const strengthBar = isStrength ? D_STRENGTH * p : isModel ? 0 : D_STRENGTH
  const stiffnessBar = isStiffness ? D_STIFFNESS * p : isModel || isStrength ? 0 : D_STIFFNESS
  const chosenReveal = isGoverning ? p : isCheck ? 1 : 0
  const gaugeReveal = isCheck ? p : 0

  const phiNow = isModel
    ? 0
    : isStrength
      ? 1.844 * p
      : isStiffness
        ? 1.844 - (1.844 - PHI_LIMIT) * p
        : isGoverning
          ? PHI_LIMIT - (PHI_LIMIT - PHI_CHOSEN) * p
          : PHI_CHOSEN
  const theta = isModel ? 0 : Math.min(42, (phiNow / PHI_LIMIT) * 24)
  const thetaRad = (theta * Math.PI) / 180
  const phiColor = isCheck ? OK : phiNow > PHI_LIMIT + 0.02 ? BAD : phiNow > PHI_LIMIT - 0.02 ? STIFFNESS : OK

  const radius = isModel ? 30 : 9 + (dNow / D_MAX) * 38
  const currentColor = isStrength ? STRENGTH : isStiffness ? STIFFNESS : isGoverning || isCheck ? OK : INK
  const note = isStrength
    ? 'Przy d = 62,91 mm naprężenie osiąga wartość dopuszczalną.'
    : isStiffness
      ? 'Sztywność wymaga większej średnicy niż wytrzymałość.'
      : isGoverning
        ? 'Wybieramy większą wartość i zaokrąglamy do 75 mm.'
        : isCheck
          ? 'Oba warunki są spełnione dla d = 75 mm.'
          : 'Średnica jest jeszcze niewiadoma.'

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 300"
          role="img"
          aria-label="Wał skręcany: porównanie wymaganej średnicy z warunku wytrzymałości i sztywności oraz sprawdzenie średnicy 75 mm"
        >
          <text x={14} y={22} fontSize={9} fill={MUTED}>
            T = 2,2 kN·m
          </text>
          <text x={14} y={36} fontSize={9} fill={MUTED}>
            L = 1800 mm
          </text>
          <text x={14} y={50} fontSize={9} fill={MUTED}>
            G = 80 GPa
          </text>
          <text x={14} y={64} fontSize={9} fill={MUTED}>
            τ_dop = 45 MPa
          </text>
          <text x={14} y={78} fontSize={9} fill={MUTED}>
            φ_dop = 1,2°
          </text>

          <rect x={132} y={38} width={302} height={24} rx={4} fill="#dfe6f2" stroke="#7d8fa5" strokeWidth={1.2} />
          <line x1={132} y1={44} x2={434} y2={44} stroke="#aab6c4" strokeWidth={1} strokeDasharray="5 5" />

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
          {!isModel && (
            <text x={400} y={24} textAnchor="middle" fontSize={9} fill={phiColor}>
              φ = {fmt(phiNow)}°
            </text>
          )}

          <line
            x1={76 - radius}
            y1={142}
            x2={76 + radius}
            y2={142}
            stroke={currentColor}
            strokeWidth={1}
            strokeDasharray="4 4"
          />
          <motion.circle
            cx={76}
            cy={142}
            fill="#f2f5fa"
            fillOpacity={0.8}
            stroke={currentColor}
            initial={false}
            animate={{ r: radius, stroke: currentColor }}
            transition={{ duration: 0.12, ease: 'linear' }}
            strokeWidth={1.8}
            strokeDasharray={isModel ? '5 4' : undefined}
          />
          <text x={76} y={146} textAnchor="middle" fontSize={9} fill={INK}>
            {isModel ? 'd = ?' : `d = ${fmt(dNow)}`}
          </text>
          <text x={76} y={194} textAnchor="middle" fontSize={8.5} fill={currentColor}>
            średnica wału
          </text>

          <text x={X0} y={110} fontSize={8.5} fill={STRENGTH}>
            warunek wytrzymałości
          </text>
          {strengthBar > 0.1 && (
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
                {fmt(strengthBar)} mm
              </text>
            </>
          )}

          <text x={X0} y={136} fontSize={8.5} fill={STIFFNESS}>
            warunek sztywności
          </text>
          {stiffnessBar > 0.1 && (
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
                {fmt(stiffnessBar)} mm
              </text>
            </>
          )}

          <line x1={X0} y1={170} x2={X1} y2={170} stroke="#c9d0d9" strokeWidth={1} />
          {[0, 30, 60, 90].map((tick) => (
            <g key={tick}>
              <line x1={xOf(tick)} y1={166} x2={xOf(tick)} y2={174} stroke="#c9d0d9" strokeWidth={1} />
              <text x={xOf(tick)} y={184} textAnchor="middle" fontSize={8} fill={MUTED}>
                {tick}
              </text>
            </g>
          ))}
          <text x={X1} y={196} textAnchor="end" fontSize={8.5} fill={MUTED}>
            d [mm]
          </text>

          {!isModel && <circle cx={xOf(dNow)} cy={170} r={4} fill={currentColor} stroke="#fff" strokeWidth={1} />}

          {chosenReveal > 0.01 && (
            <g opacity={chosenReveal}>
              <line
                x1={xOf(D_CHOSEN)}
                y1={100}
                x2={xOf(D_CHOSEN)}
                y2={170}
                stroke={OK}
                strokeWidth={1.4}
                strokeDasharray="5 4"
              />
              <text x={xOf(D_CHOSEN)} y={98} textAnchor="middle" fontSize={8.5} fontWeight={700} fill={OK}>
                75 mm
              </text>
            </g>
          )}

          {!isCheck && (
            <text x={X0} y={214} fontSize={8.5} fill={isModel ? MUTED : currentColor}>
              {note}
            </text>
          )}

          {isCheck && (
            <motion.g initial={false} animate={{ opacity: gaugeReveal }} transition={{ duration: 0.2 }}>
              <text x={X0} y={212} fontSize={8.5} fill={OK}>
                τ_max = 26,6 MPa ≤ 45 MPa
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
                animate={{ width: 270 * (TAU_CHOSEN / 45) }}
                transition={{ duration: 0.2, ease: 'linear' }}
              />
              <text x={X0} y={238} fontSize={8.5} fill={OK}>
                φ = 0,913° ≤ 1,2°
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
                animate={{ width: 270 * (PHI_CHOSEN / PHI_LIMIT) }}
                transition={{ duration: 0.2, ease: 'linear' }}
              />
              <text x={X0} y={266} fontSize={8.5} fontWeight={700} fill={OK}>
                ✓ oba warunki spełnione
              </text>
            </motion.g>
          )}
        </svg>
      </div>
    </div>
  )
}
