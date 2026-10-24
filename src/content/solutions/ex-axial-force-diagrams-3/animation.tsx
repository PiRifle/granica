import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const TENSION = '#4f6df5'
const COMPRESSION = '#d84f28'
const LOAD = '#ff6b45'
const SUPPORT = '#68727e'
const MUTED = '#87929d'

const X0 = 64
const X1 = 440
const SPAN = X1 - X0
const XS = [X0, X0 + SPAN / 3, X0 + (SPAN * 2) / 3, X1]
const BAR_Y = 88
const UNIFORM_H = 16
const N_Y = 210
const N_SCALE = 5.4
const AREAS = [100, 66.7, 33.3]
const HEIGHTS = AREAS.map((area) => 14 + 0.24 * area)

const clamp = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp(value)
  return t * t * (3 - 2 * t)
}
const yN = (value: number) => N_Y - value * N_SCALE
const midpoint = (segment: number) => (XS[segment - 1] + XS[segment]) / 2

function AxialLoad({ x, direction, label }: { x: number; direction: 1 | -1; label: string }) {
  const y = 30
  const end = x + direction * 38
  return (
    <g stroke={LOAD} fill={LOAD}>
      <line x1={x} y1={y} x2={end} y2={y} strokeWidth={2.4} />
      <path
        d={
          direction > 0
            ? `M${end - 8} ${y - 5} L${end} ${y} L${end - 8} ${y + 5}`
            : `M${end + 8} ${y - 5} L${end} ${y} L${end + 8} ${y + 5}`
        }
        fill="none"
        strokeWidth={2.4}
      />
      <text x={(x + end) / 2} y={y - 8} textAnchor="middle" fontSize={9.5} stroke="none">
        {label}
      </text>
    </g>
  )
}

export function AxialForceInverseAnimation({ scene, index, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'N'
  const draw = playing ? smooth(clamp(sceneProgress / 0.55)) : 1
  const reveal = playing ? smooth(clamp(sceneProgress / 0.7)) : 1
  const stepped = index >= 3
  const showN3 = true
  const showN2 = index >= 1
  const showN1 = index >= 2
  const path3 = `M${XS[3]} ${N_Y} L${XS[3]} ${yN(4)} L${XS[2]} ${yN(4)}`
  const path2 = `M${XS[2]} ${yN(4)} L${XS[2]} ${yN(-8)} L${XS[1]} ${yN(-8)}`
  const path1 = `M${XS[1]} ${yN(-8)} L${XS[1]} ${yN(12)} L${XS[0]} ${yN(12)}`
  const n3Opacity = index === 0 ? reveal : 1
  const n2Opacity = index === 1 ? reveal : 1
  const n1Opacity = index === 2 ? reveal : 1

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 480 300"
          role="img"
          aria-label="Pręt trójodcinkowy z odtworzonymi siłami 4, 12 i 20 kN oraz wykresem N odtwarzanym od wolnego końca"
        >
          <line x1={X0} y1={BAR_Y - 30} x2={X0} y2={BAR_Y + 30} stroke={SUPPORT} strokeWidth={2.6} />
          {Array.from({ length: 7 }, (_, i) => (
            <line
              key={i}
              x1={X0}
              y1={BAR_Y - 24 + i * 8}
              x2={X0 - 14}
              y2={BAR_Y - 30 + i * 8}
              stroke={SUPPORT}
              strokeWidth={1.4}
            />
          ))}
          <text x={X0 - 20} y={BAR_Y + 4} textAnchor="end" fontSize={10} fill={SUPPORT}>
            A
          </text>

          {!stepped && (
            <motion.rect
              x={X0}
              y={BAR_Y - UNIFORM_H / 2}
              width={SPAN}
              height={UNIFORM_H}
              rx={3}
              fill={ACCENT}
              fillOpacity={0.13}
              stroke={ACCENT}
              strokeWidth={2}
              initial={false}
              animate={{ opacity: 1 }}
            />
          )}
          {!stepped &&
            [1, 2].map((boundary) => (
              <line
                key={boundary}
                x1={XS[boundary]}
                y1={BAR_Y - UNIFORM_H / 2}
                x2={XS[boundary]}
                y2={BAR_Y + UNIFORM_H / 2}
                stroke={ACCENT}
                strokeWidth={1}
                opacity={0.4}
              />
            ))}

          {stepped &&
            [0, 1, 2].map((segment) => (
              <motion.rect
                key={segment}
                x={XS[segment]}
                width={XS[segment + 1] - XS[segment]}
                rx={2}
                fill={ACCENT}
                fillOpacity={metric === 'A' ? 0.18 : segment === 1 && index === 4 ? 0.23 : 0.14}
                stroke={ACCENT}
                strokeWidth={2}
                initial={playing && index === 3 ? { y: BAR_Y - UNIFORM_H / 2, height: UNIFORM_H } : false}
                animate={{ y: BAR_Y - HEIGHTS[segment] / 2, height: HEIGHTS[segment] }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              />
            ))}

          {[1, 2, 3].map((segment) => (
            <g key={segment}>
              <text x={midpoint(segment)} y={50} textAnchor="middle" fontSize={9} fontWeight={700} fill={ACCENT}>
                {segment}
              </text>
              <text x={midpoint(segment)} y={62} textAnchor="middle" fontSize={8} fill={MUTED}>
                0,5 m
              </text>
            </g>
          ))}

          <motion.g initial={false} animate={{ opacity: index === 0 ? reveal : 1 }}>
            <AxialLoad x={XS[3]} direction={1} label="4 kN" />
          </motion.g>
          {showN2 && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>
              <AxialLoad x={XS[2]} direction={-1} label="12 kN" />
            </motion.g>
          )}
          {showN1 && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>
              <AxialLoad x={XS[1]} direction={1} label="20 kN" />
              <line x1={X0} y1={30} x2={X0 - 38} y2={30} stroke={SUPPORT} strokeWidth={2.2} />
              <path d={`M${X0 - 30} 25 L${X0 - 39} 30 L${X0 - 30} 35`} fill="none" stroke={SUPPORT} strokeWidth={2.2} />
              <text x={X0 + 4} y={24} fontSize={9} fontWeight={700} fill={SUPPORT}>
                R_A = 12 kN
              </text>
            </motion.g>
          )}

          {stepped &&
            AREAS.map((area, segment) => (
              <motion.text
                key={segment}
                x={midpoint(segment + 1)}
                y={124}
                textAnchor="middle"
                fontSize={9}
                fontWeight={700}
                fill={ACCENT}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.15 + segment * 0.08 }}
              >
                A = {area.toLocaleString('pl-PL')} mm²
              </motion.text>
            ))}

          {index === 4 && (
            <motion.text
              x={midpoint(2)}
              y={138}
              textAnchor="middle"
              fontSize={8.5}
              fontWeight={700}
              fill={COMPRESSION}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              ściskanie — sprawdź wyboczenie
            </motion.text>
          )}

          <line x1={X0 - 16} y1={N_Y + 40} x2={X0 - 16} y2={136} stroke={MUTED} strokeWidth={1.2} />
          <path d={`M${X0 - 20} 144 L${X0 - 16} 134 L${X0 - 12} 144`} fill="none" stroke={MUTED} strokeWidth={1.2} />
          <line x1={X0 - 16} y1={N_Y} x2={X1 + 14} y2={N_Y} stroke={MUTED} strokeWidth={1.2} />
          <path
            d={`M${X1 + 6} ${N_Y - 4} L${X1 + 16} ${N_Y} L${X1 + 6} ${N_Y + 4}`}
            fill="none"
            stroke={MUTED}
            strokeWidth={1.2}
          />
          <text x={X0 - 22} y={130} textAnchor="end" fontSize={10} fontWeight={700} fill={MUTED}>
            N
          </text>
          <text x={X1 + 20} y={N_Y + 4} fontSize={10} fill={MUTED}>
            x
          </text>
          <text x={X0 - 16} y={N_Y + 15} textAnchor="middle" fontSize={9} fill={MUTED}>
            0
          </text>
          {[1, 2, 3].map((boundary) => (
            <line
              key={boundary}
              x1={XS[boundary]}
              y1={132}
              x2={XS[boundary]}
              y2={N_Y}
              stroke={MUTED}
              strokeWidth={1}
              strokeDasharray="3 4"
              opacity={0.18}
            />
          ))}

          <motion.path
            d={path3}
            fill="none"
            stroke={TENSION}
            strokeWidth={3}
            strokeLinejoin="round"
            strokeLinecap="round"
            initial={false}
            animate={{ pathLength: index === 0 ? draw : 1 }}
            transition={{ duration: 0.12, ease: 'linear' }}
          />
          <motion.path
            d={path2}
            fill="none"
            stroke={COMPRESSION}
            strokeWidth={3}
            strokeLinejoin="round"
            strokeLinecap="round"
            initial={false}
            animate={{ pathLength: index === 0 ? 0 : index === 1 ? draw : 1 }}
            transition={{ duration: 0.12, ease: 'linear' }}
          />
          <motion.path
            d={path1}
            fill="none"
            stroke={TENSION}
            strokeWidth={3}
            strokeLinejoin="round"
            strokeLinecap="round"
            initial={false}
            animate={{ pathLength: index < 2 ? 0 : index === 2 ? draw : 1 }}
            transition={{ duration: 0.12, ease: 'linear' }}
          />

          {showN3 && (
            <motion.text
              x={midpoint(3)}
              y={yN(4) - 9}
              textAnchor="middle"
              fontSize={10}
              fontWeight={700}
              fill={TENSION}
              initial={false}
              animate={{ opacity: n3Opacity }}
            >
              +4 kN
            </motion.text>
          )}
          {showN2 && (
            <motion.text
              x={midpoint(2)}
              y={yN(-8) + 18}
              textAnchor="middle"
              fontSize={10}
              fontWeight={700}
              fill={COMPRESSION}
              initial={false}
              animate={{ opacity: n2Opacity }}
            >
              −8 kN
            </motion.text>
          )}
          {showN1 && (
            <motion.text
              x={midpoint(1)}
              y={yN(12) - 9}
              textAnchor="middle"
              fontSize={10}
              fontWeight={700}
              fill={TENSION}
              initial={false}
              animate={{ opacity: n1Opacity }}
            >
              +12 kN
            </motion.text>
          )}

          {index === 1 && (
            <motion.text
              x={XS[2] + 6}
              y={(yN(4) + yN(-8)) / 2 + 4}
              fontSize={8.5}
              fill={COMPRESSION}
              initial={{ opacity: 0 }}
              animate={{ opacity: reveal }}
            >
              skok 12 kN
            </motion.text>
          )}
          {index === 2 && (
            <motion.text
              x={XS[1] + 6}
              y={(yN(12) + yN(-8)) / 2 + 4}
              fontSize={8.5}
              fill={ACCENT}
              initial={{ opacity: 0 }}
              animate={{ opacity: reveal }}
            >
              skok 20 kN
            </motion.text>
          )}
        </svg>
      </div>
    </div>
  )
}
