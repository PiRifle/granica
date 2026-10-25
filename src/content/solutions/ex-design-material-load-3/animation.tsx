import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const LOAD = '#ff6b45'
const LIMIT = '#a970dd'
const ALLOW = '#2f7d5b'
const BAD = '#d64545'
const EDGE = '#68727e'
const MUTED = '#87929d'
const INK = '#17202a'

const AREA = 250
const RE = 235
const SAFETY = 2
const SIGMA = 160
const K = 117.5
const N_REAL = 1.469
const RE_REQUIRED = 320
const AREA_MIN = 340.4
const AREA_ADOPTED = 341
const SIGMA_ADOPTED = 117.3

const clamp01 = (value: number) => Math.max(0, Math.min(1, value))
const ease = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}
const pl = (value: number, digits = 2) => value.toFixed(digits).replace('.', ',')

function Arrow({
  x,
  from,
  to,
  amount,
  color,
  width = 2.4,
}: {
  x: number
  from: number
  to: number
  amount: number
  color: string
  width?: number
}) {
  const direction = to >= from ? 1 : -1
  const head = 9
  const base = to - direction * head
  const wing = 5
  return (
    <motion.g initial={false} animate={{ opacity: amount > 0.01 ? 1 : 0 }} transition={{ duration: 0.18 }}>
      <motion.line
        x1={x}
        y1={from}
        x2={x}
        y2={base}
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: amount }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
      />
      <motion.polygon
        points={`${x},${to} ${x - wing},${to - direction * head} ${x + wing},${to - direction * head}`}
        fill={color}
        initial={{ opacity: 0 }}
        animate={{ opacity: amount > 0.55 ? 1 : 0 }}
        transition={{ duration: 0.18 }}
      />
    </motion.g>
  )
}

function Tag({
  x,
  y,
  amount,
  color,
  children,
  anchor = 'start',
  size = 9,
  weight = 400,
}: {
  x: number
  y: number
  amount: number
  color: string
  children: string
  anchor?: 'start' | 'middle' | 'end'
  size?: number
  weight?: number
}) {
  return (
    <motion.text
      x={x}
      y={y}
      textAnchor={anchor}
      fontSize={size}
      fontWeight={weight}
      fill={color}
      stroke="none"
      initial={false}
      animate={{ opacity: amount }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.text>
  )
}

const halfArea = (area: number) => 10 + (area / AREA_ADOPTED) * 24

export function MaterialLoad3Animation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const t = playing ? clamp01(sceneProgress) : 1
  const draw = ease(t / 0.8)
  const late = ease((t - 0.35) / 0.65)

  const isModel = metric === 'model'
  const isStress = metric === 'stress'
  const isSafety = metric === 'safety'
  const isMaterial = metric === 'material'
  const isSection = metric === 'section'
  const isCheck = metric === 'check'

  const BAR = { cx: 118, top: 62, bottom: 230 }
  const shownArea = isSection ? AREA + (AREA_ADOPTED - AREA) * draw : isCheck ? AREA_ADOPTED : AREA
  const half = halfArea(shownArea)
  const barColor = isCheck ? ALLOW : ACCENT

  const G = { x: 246, w: 52, top: 64, bottom: 248, max: 350 }
  const gaugeHeight = G.bottom - G.top
  const yStress = (value: number) => G.bottom - (Math.min(value, G.max) / G.max) * gaugeHeight
  const gaugeValue = isStress ? SIGMA : isCheck ? SIGMA_ADOPTED : 0
  const gaugeColor = isStress ? BAD : ALLOW

  const FACTOR = { x: 238, w: 190, min: 0, max: 2.6 }
  const factorX = (value: number) => FACTOR.x + ((value - FACTOR.min) / (FACTOR.max - FACTOR.min)) * FACTOR.w

  const MATERIAL = { x: 238, w: 184, max: 350 }
  const materialX = (value: number) => MATERIAL.x + (value / MATERIAL.max) * MATERIAL.w

  const AREA_AXIS = { x: 238, w: 184, max: 400 }
  const areaX = (value: number) => AREA_AXIS.x + (value / AREA_AXIS.max) * AREA_AXIS.w

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 320"
          role="img"
          aria-label="Sprawdzenie pręta o polu 250 mm²: naprężenie 160 MPa, zapas 1,47, wymagana granica 320 MPa i dobór pola 341 mm²"
        >
          <g stroke={EDGE} strokeWidth={2} strokeLinecap="round">
            <line x1={BAR.cx - half - 18} y1={BAR.top} x2={BAR.cx + half + 18} y2={BAR.top} />
            {Array.from({ length: 7 }, (_, index) => {
              const x = BAR.cx - half - 12 + index * ((half * 2 + 24) / 6)
              return <line key={index} x1={x} y1={BAR.top} x2={x - 8} y2={BAR.top - 12} strokeWidth={1.4} />
            })}
          </g>

          <motion.rect
            x={BAR.cx - half}
            y={BAR.top}
            width={half * 2}
            height={BAR.bottom - BAR.top}
            rx={4}
            fill={barColor}
            fillOpacity={0.15}
            stroke={barColor}
            strokeWidth={2}
            initial={false}
            animate={{ width: half * 2 }}
            transition={{ duration: 0.12, ease: 'linear' }}
          />

          <Tag x={BAR.cx + half + 9} y={BAR.top + 18} amount={1} color={barColor} weight={600} size={8.5}>
            {`A = ${isSection ? pl(shownArea, 0) : isCheck ? AREA_ADOPTED : AREA} mm²`}
          </Tag>

          <Arrow x={BAR.cx} from={BAR.bottom + 6} to={BAR.bottom + 40} amount={draw} color={LOAD} width={2.6} />
          <Tag x={BAR.cx + 12} y={BAR.bottom + 35} amount={draw} color={LOAD} weight={600} size={8.5}>
            P = 40 kN
          </Tag>

          {isModel && (
            <g>
              <Tag x={238} y={82} amount={1} color={INK} weight={700} size={9.5}>
                dane i pytanie
              </Tag>
              <Tag x={238} y={104} amount={1} color={MUTED} size={8.5}>
                R_e = 235 MPa
              </Tag>
              <Tag x={238} y={122} amount={1} color={MUTED} size={8.5}>
                n_wym = 2
              </Tag>
              <Tag x={238} y={140} amount={1} color={MUTED} size={8.5}>
                A = 250 mm²
              </Tag>
              <Tag x={238} y={158} amount={1} color={MUTED} size={8.5}>
                P = 40 kN
              </Tag>
              <Tag x={238} y={188} amount={1} color={INK} weight={600} size={9}>
                szukane:
              </Tag>
              <Tag x={238} y={208} amount={1} color={BAD} weight={700} size={9.5}>
                czy materiał wystarcza?
              </Tag>
            </g>
          )}

          {(isStress || isCheck) && (
            <g>
              <Tag x={G.x + G.w / 2} y={56} amount={1} color={MUTED} anchor="middle" size={8.5} weight={600}>
                σ [MPa]
              </Tag>
              <rect
                x={G.x}
                y={G.top}
                width={G.w}
                height={gaugeHeight}
                rx={4}
                fill="#eef1f4"
                stroke="#d7dde4"
                strokeWidth={1}
              />
              {[0, 100, 200, 300].map((tick) => {
                const y = yStress(tick)
                return (
                  <g key={tick}>
                    <line x1={G.x - 4} y1={y} x2={G.x} y2={y} stroke={MUTED} strokeWidth={1} />
                    <text x={G.x - 7} y={y + 3} textAnchor="end" fontSize={7.5} fill={MUTED}>
                      {tick}
                    </text>
                  </g>
                )
              })}

              <motion.rect
                x={G.x + 1}
                y={yStress(gaugeValue)}
                width={G.w - 2}
                height={G.bottom - yStress(gaugeValue)}
                rx={3}
                fill={gaugeColor}
                fillOpacity={0.24}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
              <line
                x1={G.x - 5}
                y1={yStress(RE)}
                x2={G.x + G.w + 5}
                y2={yStress(RE)}
                stroke={LIMIT}
                strokeWidth={1.4}
                strokeDasharray="2 4"
              />
              <Tag x={G.x + G.w + 9} y={yStress(RE) - 4} amount={1} color={LIMIT} weight={600} size={8}>
                R_e = 235
              </Tag>
              <line
                x1={G.x - 5}
                y1={yStress(K)}
                x2={G.x + G.w + 5}
                y2={yStress(K)}
                stroke={ALLOW}
                strokeWidth={1.8}
                strokeDasharray="5 3"
              />
              <Tag x={G.x + G.w + 9} y={yStress(K) - 4} amount={1} color={ALLOW} weight={600} size={8}>
                k = 117,5
              </Tag>

              {isStress && (
                <>
                  <Tag x={G.x} y={272} amount={late} color={BAD} weight={600} size={8}>
                    σ = 160 MPa &gt; k = 117,5 MPa
                  </Tag>
                  <Tag x={G.x} y={290} amount={late} color={MUTED} size={8}>
                    zapas jest zbyt mały
                  </Tag>
                </>
              )}
            </g>
          )}

          {isSafety && (
            <g>
              <Tag x={FACTOR.x} y={68} amount={1} color={INK} weight={700} size={9.5}>
                rzeczywisty zapas
              </Tag>
              <Tag x={FACTOR.x} y={90} amount={1} color={MUTED} size={8.5}>
                porównanie z wymaganym n = 2
              </Tag>

              <Tag x={FACTOR.x} y={124} amount={1} color={BAD} weight={700} size={10}>
                n = 1,47
              </Tag>
              <Tag x={FACTOR.x + FACTOR.w} y={124} amount={1} color={ALLOW} anchor="end" size={8.5} weight={600}>
                n_wym = 2
              </Tag>

              <rect
                x={FACTOR.x}
                y={136}
                width={FACTOR.w}
                height={12}
                rx={6}
                fill="#eef1f4"
                stroke="#d7dde4"
                strokeWidth={1}
              />
              <motion.rect
                x={FACTOR.x}
                y={136}
                height={12}
                rx={6}
                fill={BAD}
                fillOpacity={0.4}
                initial={{ width: 0 }}
                animate={{ width: factorX(N_REAL) - FACTOR.x }}
                transition={{ duration: 0.15, ease: 'linear' }}
              />
              {[0, 1, 2].map((tick) => (
                <g key={tick}>
                  <line x1={factorX(tick)} y1={150} x2={factorX(tick)} y2={158} stroke={MUTED} strokeWidth={1} />
                  <text x={factorX(tick)} y={168} textAnchor="middle" fontSize={7.5} fill={MUTED}>
                    {tick}
                  </text>
                </g>
              ))}
              <line x1={factorX(N_REAL)} y1={130} x2={factorX(N_REAL)} y2={162} stroke={BAD} strokeWidth={2.2} />
              <line
                x1={factorX(SAFETY)}
                y1={130}
                x2={factorX(SAFETY)}
                y2={162}
                stroke={ALLOW}
                strokeWidth={1.6}
                strokeDasharray="4 3"
              />
              <Tag x={FACTOR.x} y={202} amount={late} color={BAD} weight={600} size={8.5}>
                n = 1,47 &lt; n_wym = 2
              </Tag>
              <Tag x={FACTOR.x} y={220} amount={late} color={MUTED} size={8}>
                dostępna stal jest niewystarczająca
              </Tag>
            </g>
          )}

          {isMaterial && (
            <g>
              <Tag x={MATERIAL.x} y={68} amount={1} color={INK} weight={700} size={9.5}>
                wymagana granica materiału
              </Tag>
              <Tag x={MATERIAL.x} y={90} amount={1} color={MUTED} size={8.5}>
                wymagane R_e = 320 MPa
              </Tag>

              <Tag x={MATERIAL.x} y={122} amount={1} color={LIMIT} weight={600} size={8}>
                dostępne R_e = 235 MPa
              </Tag>
              <rect
                x={MATERIAL.x}
                y={130}
                width={MATERIAL.w}
                height={18}
                rx={4}
                fill="#eef1f4"
                stroke="#d7dde4"
                strokeWidth={1}
              />
              <motion.rect
                x={MATERIAL.x}
                y={130}
                height={18}
                rx={4}
                fill={LIMIT}
                fillOpacity={0.26}
                stroke={LIMIT}
                strokeWidth={1.3}
                initial={{ width: 0 }}
                animate={{ width: materialX(RE) - MATERIAL.x }}
                transition={{ duration: 0.15, ease: 'linear' }}
              />
              <line
                x1={materialX(RE_REQUIRED)}
                y1={124}
                x2={materialX(RE_REQUIRED)}
                y2={158}
                stroke={BAD}
                strokeWidth={2}
              />
              <Tag x={materialX(RE_REQUIRED)} y={116} amount={late} color={BAD} anchor="middle" size={8} weight={700}>
                320 MPa
              </Tag>
              <Tag x={MATERIAL.x} y={178} amount={late} color={BAD} weight={600} size={8.5}>
                brakuje 85 MPa
              </Tag>
              <Tag x={MATERIAL.x} y={196} amount={late} color={MUTED} size={8}>
                trzeba wybrać stal o wyższej granicy
              </Tag>

              <line x1={MATERIAL.x} y1={222} x2={MATERIAL.x + MATERIAL.w} y2={222} stroke={MUTED} strokeWidth={1} />
              {[0, 100, 200, 300].map((tick) => (
                <g key={tick}>
                  <line x1={materialX(tick)} y1={222} x2={materialX(tick)} y2={226} stroke={MUTED} strokeWidth={1} />
                  <text x={materialX(tick)} y={236} textAnchor="middle" fontSize={7.5} fill={MUTED}>
                    {tick}
                  </text>
                </g>
              ))}
            </g>
          )}

          {isSection && (
            <g>
              <Tag x={AREA_AXIS.x} y={68} amount={1} color={INK} weight={700} size={9.5}>
                nowe pole przekroju
              </Tag>
              <Tag x={AREA_AXIS.x} y={90} amount={1} color={MUTED} size={8.5}>
                wymagane pole A_min ≈ 340,4 mm²
              </Tag>

              <Tag x={AREA_AXIS.x} y={122} amount={1} color={ACCENT} weight={600} size={8}>
                obecne A = 250 mm²
              </Tag>
              <rect
                x={AREA_AXIS.x}
                y={130}
                width={AREA_AXIS.w}
                height={18}
                rx={4}
                fill="#eef1f4"
                stroke="#d7dde4"
                strokeWidth={1}
              />
              <motion.rect
                x={AREA_AXIS.x}
                y={130}
                height={18}
                rx={4}
                fill={ACCENT}
                fillOpacity={0.24}
                stroke={ACCENT}
                strokeWidth={1.3}
                initial={{ width: 0 }}
                animate={{ width: areaX(AREA) - AREA_AXIS.x }}
                transition={{ duration: 0.15, ease: 'linear' }}
              />
              <line x1={areaX(AREA_MIN)} y1={124} x2={areaX(AREA_MIN)} y2={158} stroke={ALLOW} strokeWidth={2} />
              <Tag x={areaX(AREA_MIN)} y={116} amount={late} color={ALLOW} anchor="middle" size={8} weight={700}>
                A_min ≈ 340,4
              </Tag>
              <Tag x={AREA_AXIS.x} y={178} amount={late} color={ALLOW} weight={600} size={8.5}>
                przyjęto A = 341 mm²
              </Tag>

              <line x1={AREA_AXIS.x} y1={204} x2={AREA_AXIS.x + AREA_AXIS.w} y2={204} stroke={MUTED} strokeWidth={1} />
              {[0, 100, 200, 300, 400].map((tick) => (
                <g key={tick}>
                  <line x1={areaX(tick)} y1={204} x2={areaX(tick)} y2={208} stroke={MUTED} strokeWidth={1} />
                  <text x={areaX(tick)} y={218} textAnchor="middle" fontSize={7.5} fill={MUTED}>
                    {tick}
                  </text>
                </g>
              ))}
              <Tag x={AREA_AXIS.x} y={244} amount={late} color={MUTED} size={8}>
                wzrost pola o około 36%
              </Tag>
            </g>
          )}

          {isCheck && (
            <g>
              <Tag x={G.x} y={272} amount={late} color={ALLOW} weight={600} size={8}>
                ✓ σ = 117,3 ≤ k = 117,5 MPa
              </Tag>
              <Tag x={G.x} y={290} amount={late} color={ALLOW} weight={600} size={8}>
                ✓ n = 235/117,3 ≈ 2,00 ≥ 2
              </Tag>
            </g>
          )}
        </svg>
      </div>
    </div>
  )
}
