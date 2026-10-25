import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const STEEL = '#4f6df5'
const VALID = '#2f7d5b'
const DANGER = '#d84f28'
const REDUNDANT = '#d8a13b'
const INK = '#17202a'
const MUTED = '#87929d'
const GRID = '#c3ccd7'

const clamp01 = (value: number) => Math.max(0, Math.min(1, value))

function Node({ x, y, label, color = INK }: { x: number; y: number; label: string; color?: string }) {
  return (
    <g>
      <circle cx={x} cy={y} r={5} fill={color === INK ? INK : '#ffffff'} stroke={color} strokeWidth={2} />
      <text x={x + 8} y={y - 7} fontSize="11" fontWeight={600} fill={color}>
        {label}
      </text>
    </g>
  )
}

function Edge({
  x1,
  y1,
  x2,
  y2,
  color = STEEL,
  width = 4.5,
  dash,
}: {
  x1: number
  y1: number
  x2: number
  y2: number
  color?: string
  width?: number
  dash?: string
}) {
  return (
    <motion.line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={color}
      strokeWidth={width}
      strokeLinecap="round"
      strokeDasharray={dash}
      initial={false}
      animate={{ opacity: 1 }}
    />
  )
}

function Badge({ tone, children }: { tone: 'ok' | 'bad' | 'warn'; children: string }) {
  const color = tone === 'ok' ? VALID : tone === 'bad' ? DANGER : REDUNDANT
  return (
    <g>
      <rect x={332} y={50} width={112} height={28} rx={14} fill={color} opacity={0.12} />
      <text x={388} y={68} textAnchor="middle" fontSize="11.5" fontWeight={700} fill={color}>
        {children}
      </text>
    </g>
  )
}

export function TrussRigidityAnimation({ index, playing, sceneProgress }: SolutionAnimationProps) {
  const progress = playing ? clamp01(sceneProgress) : 1
  const shear = index === 2 ? 16 + progress * 38 : 0

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg viewBox="0 0 460 320" role="img" aria-label="Geometryczna niezmienność kratownic">
          <title>Geometryczna niezmienność kratownic</title>
          <desc>Trójkąt, kwadraty z przekątnymi i bez, czworościan oraz pułapka prętów współbieżnych.</desc>
          <defs>
            <marker
              id="ex-inv-rot"
              viewBox="0 0 10 10"
              refX="7"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={DANGER} />
            </marker>
          </defs>

          {index === 0 && (
            <motion.g initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <Edge x1={150} y1={240} x2={310} y2={240} />
              <Edge x1={150} y1={240} x2={230} y2={135} />
              <Edge x1={310} y1={240} x2={230} y2={135} />
              <Node x={150} y={240} label="A" />
              <Node x={310} y={240} label="B" />
              <Node x={230} y={135} label="C" />
              <text x={230} y={215} textAnchor="middle" fontSize="11" fill={MUTED}>
                każdy kolejny węzeł wymaga dwóch prętów
              </text>
              <Badge tone="ok">w=3, p=3, n=0</Badge>
            </motion.g>
          )}

          {index === 1 && (
            <motion.g
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <Edge x1={160} y1={115} x2={300} y2={115} />
              <Edge x1={300} y1={115} x2={300} y2={235} />
              <Edge x1={300} y1={235} x2={160} y2={235} />
              <Edge x1={160} y1={235} x2={160} y2={115} />
              <Edge x1={160} y1={115} x2={300} y2={235} color={VALID} width={5.5} />
              <Node x={160} y={115} label="A" />
              <Node x={300} y={115} label="B" />
              <Node x={300} y={235} label="C" />
              <Node x={160} y={235} label="D" />
              <text x={230} y={135} textAnchor="middle" fontSize="10.5" fill={VALID}>
                przekątna zamyka dwa trójkąty
              </text>
              <Badge tone="ok">w=4, p=5, n=0</Badge>
            </motion.g>
          )}

          {index === 2 && (
            <motion.g initial={false} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
              <g stroke={GRID} strokeWidth={1.3} strokeDasharray="5 5" fill="none">
                <line x1={160} y1={115} x2={300} y2={115} />
                <line x1={300} y1={115} x2={300} y2={235} />
                <line x1={300} y1={235} x2={160} y2={235} />
                <line x1={160} y1={235} x2={160} y2={115} />
              </g>
              <Edge x1={160 + shear} y1={115} x2={300 + shear} y2={115} color={DANGER} />
              <Edge x1={300 + shear} y1={115} x2={300} y2={235} color={DANGER} />
              <Edge x1={300} y1={235} x2={160} y2={235} color={DANGER} />
              <Edge x1={160} y1={235} x2={160 + shear} y2={115} color={DANGER} />
              <Node x={160 + shear} y={115} label="A" color={DANGER} />
              <Node x={300 + shear} y={115} label="B" color={DANGER} />
              <Node x={300} y={235} label="C" color={DANGER} />
              <Node x={160} y={235} label="D" color={DANGER} />
              <path
                d={`M ${160 + shear / 2} ${112} A 28 28 0 0 1 ${300 - 18 + shear / 2} ${128}`}
                fill="none"
                stroke={DANGER}
                strokeWidth={1.6}
                strokeDasharray="4 4"
              />
              <text x={232} y={100} textAnchor="middle" fontSize="11" fill={DANGER}>
                kąty się zmieniają — brak przekątnej
              </text>
              <Badge tone="bad">w=4, p=4, n=−1</Badge>
            </motion.g>
          )}

          {index === 3 && (
            <motion.g
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <Edge x1={160} y1={115} x2={300} y2={115} />
              <Edge x1={300} y1={115} x2={300} y2={235} />
              <Edge x1={300} y1={235} x2={160} y2={235} />
              <Edge x1={160} y1={235} x2={160} y2={115} />
              <Edge x1={160} y1={115} x2={300} y2={235} color={VALID} width={5} />
              <Edge x1={300} y1={115} x2={160} y2={235} color={REDUNDANT} width={5.5} dash="8 5" />
              <Node x={160} y={115} label="A" />
              <Node x={300} y={115} label="B" />
              <Node x={300} y={235} label="C" />
              <Node x={160} y={235} label="D" />
              <text x={230} y={190} textAnchor="middle" fontSize="10.5" fill={REDUNDANT}>
                druga przekątna to pręt nadmiarowy
              </text>
              <Badge tone="warn">w=4, p=6, n=+1</Badge>
            </motion.g>
          )}

          {index === 4 && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
              <Edge x1={150} y1={240} x2={310} y2={240} />
              <Edge x1={150} y1={240} x2={230} y2={190} />
              <Edge x1={310} y1={240} x2={230} y2={190} />
              <Edge x1={150} y1={240} x2={230} y2={105} color={STEEL} />
              <Edge x1={310} y1={240} x2={230} y2={105} color={STEEL} />
              <Edge x1={230} y1={190} x2={230} y2={105} color={VALID} />
              <Node x={150} y={240} label="A" />
              <Node x={310} y={240} label="B" />
              <Node x={230} y={190} label="C" />
              <Node x={230} y={105} label="D" />
              <text x={230} y={84} textAnchor="middle" fontSize="11" fill={VALID}>
                czworościan: 4 węzły, 6 krawędzi
              </text>
              <Badge tone="ok">w=4, p=6, n=0</Badge>
            </motion.g>
          )}

          {index === 5 && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
              <Edge x1={95} y1={115} x2={95} y2={235} />
              <Edge x1={95} y1={115} x2={150} y2={175} />
              <Edge x1={95} y1={235} x2={150} y2={175} />
              <Edge x1={365} y1={115} x2={365} y2={235} />
              <Edge x1={365} y1={115} x2={310} y2={175} />
              <Edge x1={365} y1={235} x2={310} y2={175} />
              <Edge x1={95} y1={115} x2={365} y2={235} color={DANGER} width={4} dash="7 5" />
              <Edge x1={95} y1={235} x2={365} y2={115} color={DANGER} width={4} dash="7 5" />
              <Edge x1={150} y1={175} x2={310} y2={175} color={DANGER} width={4} dash="7 5" />
              <circle cx={230} cy={175} r={18} fill="none" stroke={DANGER} strokeWidth={1.6} strokeDasharray="4 4" />
              <path
                d="M 246 162 A 22 22 0 0 1 248 188"
                fill="none"
                stroke={DANGER}
                strokeWidth={2}
                markerEnd="url(#ex-inv-rot)"
              />
              <circle cx={230} cy={175} r={4} fill={DANGER} />
              <text x={230} y={156} textAnchor="middle" fontSize="10" fill={DANGER}>
                punkt zbiegu
              </text>
              <Node x={95} y={115} label="A" />
              <Node x={95} y={235} label="B" />
              <Node x={150} y={175} label="C" />
              <Node x={365} y={115} label="D" />
              <Node x={365} y={235} label="E" />
              <Node x={310} y={175} label="F" />
              <text x={230} y={262} textAnchor="middle" fontSize="10.5" fill={DANGER}>
                trzy łączniki współbieżne pozwalają na obrót części
              </text>
              <Badge tone="bad">w=6, p=9, n=0</Badge>
            </motion.g>
          )}

          <text x="230" y="292" textAnchor="middle" fontSize="11.5" fill={INK}>
            {index === 0 && 'Trójkąt jest sztywny bez dodatkowych prętów'}
            {index === 1 && 'Jedna przekątna wystarcza do sztywności kwadratu'}
            {index === 2 && 'Cztery boki bez przekątnej tworzą mechanizm'}
            {index === 3 && 'Dwie przekątne dają sztywność z nadmiarem'}
            {index === 4 && 'W przestrzeni bazą jest czworościan'}
            {index === 5 && 'Zgodny bilans prętów nie gwarantuje sztywności'}
          </text>
        </svg>
      </div>
    </div>
  )
}
