import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const LOAD = '#ff6b45'
const PLANE = '#d84f28'
const STRESS = '#a970dd'
const OK = '#2e9e6b'
const MUTED = '#87929d'
const EDGE = '#68727e'
const INK = '#17202a'

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}

const pinCx = 168
const pinW = 20
const planeY = 112
const panelCx = 366
const panelCy = 118
const pxPerMm = 1.8
const radiusFor = (diameter: number) => diameter * pxPerMm

export function ShearTechnicalExample3Animation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const p = playing ? smooth(sceneProgress) : 1

  const isModel = metric === 'model'
  const isLimit = metric === 'limit'
  const isArea = metric === 'area'
  const isDiameter = metric === 'diameter'
  const isSelect = metric === 'select'
  const isCheck = metric === 'check'

  const loadAmount = isModel ? smooth(clamp01(p / 0.65)) : 1
  const planeAmount = isLimit ? p : 1
  const slip = isCheck ? 5 * p : 0
  const topShift = -slip
  const bottomShift = slip

  let diameter = 30
  if (isModel) diameter = 24
  else if (isLimit) diameter = 27
  else if (isArea) diameter = 28.2
  else if (isDiameter) diameter = 20 + 8.2 * p
  else if (isSelect) diameter = 28.2 + 1.8 * p

  const radius = radiusFor(diameter)
  const showPlane = !isModel
  const planeX1 = 106 + (isCheck ? slip : 0)
  const planeX2 = 240 - (isCheck ? slip : 0)
  const planeRight = planeX1 + (planeX2 - planeX1) * planeAmount

  const showFill = !isModel && !isLimit
  const fillAmount = isArea ? p : 1
  const stressAmount = isLimit || isCheck ? p : 0
  const stressColor = isLimit ? PLANE : STRESS

  const pinTopShift = -slip * 0.7
  const pinBottomShift = slip * 0.7
  const pinPoints = [
    `${pinCx - pinW / 2 + pinTopShift},70`,
    `${pinCx + pinW / 2 + pinTopShift},70`,
    `${pinCx + pinW / 2 + pinTopShift},${planeY}`,
    `${pinCx + pinW / 2 + pinBottomShift},${planeY}`,
    `${pinCx + pinW / 2 + pinBottomShift},156`,
    `${pinCx - pinW / 2 + pinBottomShift},156`,
    `${pinCx - pinW / 2 + pinBottomShift},${planeY}`,
    `${pinCx - pinW / 2 + pinTopShift},${planeY}`,
  ].join(' ')

  const panelTitle = isModel
    ? 'przekrój sworznia'
    : isLimit
      ? 'stan graniczny: τ = τ_dop'
      : isArea
        ? 'wymagane pole ścinane'
        : isDiameter
          ? 'średnica minimalna'
          : isSelect
            ? 'średnica przyjęta'
            : 'sprawdzenie naprężenia'

  const gaugeX0 = 300
  const gaugeX1 = 438
  const gaugeMax = 100
  const gaugeY = 232
  const gaugeX = (value: number) => gaugeX0 + (value / gaugeMax) * (gaugeX1 - gaugeX0)
  const allowableX = gaugeX(80)
  const actualX = gaugeX(70.7)

  const note = isModel
    ? 'siła 50 kN, dopuszczalne naprężenie 80 MPa, średnica nieznana'
    : isLimit
      ? 'płaszczyzna ścinania jest jedna; w stanie granicznym τ = τ_dop'
      : isArea
        ? 'pole musi być co najmniej równe sile podzielonej przez τ_dop'
        : isDiameter
          ? 'z wymaganego pola wynika najmniejsza średnica 28,2 mm'
          : isSelect
            ? 'najbliższa większa średnica handlowa to 30 mm'
            : 'po zaokrągleniu naprężenie spada poniżej wartości dopuszczalnej'

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 300"
          role="img"
          aria-label="Dobór średnicy sworznia jednociętego: siła 50 kiloniutonów, naprężenie dopuszczalne 80 megapaskali. Animacja pokazuje płaszczyznę ścinania, wymagane pole, średnicę minimalną, dobór 30 milimetrów i sprawdzenie naprężenia 70,7 megapaskala."
        >
          <defs>
            <marker
              id="sht3-load"
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
              id="sht3-stress"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={stressColor} />
            </marker>
            <clipPath id="sht3-area-clip">
              <circle cx={panelCx} cy={panelCy} r={radius - 2} />
            </clipPath>
          </defs>

          <motion.g
            animate={playing ? { opacity: [0.8, 1, 0.8] } : { opacity: 1 }}
            transition={{ duration: 1.8, repeat: playing ? Infinity : 0, ease: 'easeInOut' }}
          >
            <rect
              x={36 + topShift}
              y={86}
              width={204}
              height={24}
              rx={3}
              fill={ACCENT}
              fillOpacity={0.16}
              stroke={ACCENT}
              strokeWidth={1.7}
            />
            <rect
              x={106 + bottomShift}
              y={114}
              width={174}
              height={24}
              rx={3}
              fill={ACCENT}
              fillOpacity={0.1}
              stroke={ACCENT}
              strokeWidth={1.7}
            />
          </motion.g>

          <polygon points={pinPoints} fill="#cfd8e6" stroke={EDGE} strokeWidth={1.6} />

          {showPlane && (
            <g>
              <line
                x1={planeX1}
                y1={planeY}
                x2={planeRight}
                y2={planeY}
                stroke={PLANE}
                strokeWidth={6}
                strokeOpacity={0.14}
                strokeLinecap="round"
              />
              <line
                x1={planeX1}
                y1={planeY}
                x2={planeRight}
                y2={planeY}
                stroke={PLANE}
                strokeWidth={2.3}
                strokeLinecap="round"
              />
            </g>
          )}

          <g opacity={loadAmount > 0.02 ? 1 : 0}>
            <line
              x1={36 + topShift}
              y1={98}
              x2={36 + topShift - 26 * loadAmount}
              y2={98}
              stroke={LOAD}
              strokeWidth={2.5}
              markerEnd="url(#sht3-load)"
            />
            <line
              x1={280 + bottomShift}
              y1={126}
              x2={280 + bottomShift + 24 * loadAmount}
              y2={126}
              stroke={LOAD}
              strokeWidth={2.5}
              markerEnd="url(#sht3-load)"
            />
            <text x={14} y={80} fontSize={9} fontWeight={700} fill={LOAD}>
              F = 50 kN
            </text>
            <text x={304} y={152} textAnchor="end" fontSize={9} fontWeight={700} fill={LOAD}>
              F = 50 kN
            </text>
          </g>

          <text x={pinCx + 14} y={170} fontSize={9} fill={EDGE}>
            sworzeń, d = ?
          </text>

          {isLimit && (
            <g opacity={p}>
              <line
                x1={246}
                y1={100}
                x2={planeRight}
                y2={planeY - 2}
                stroke={PLANE}
                strokeWidth={1}
                strokeDasharray="3 3"
              />
              <text x={250} y={96} fontSize={9} fill={PLANE}>
                płaszczyzna ścinania
              </text>
              <text x={250} y={108} fontSize={9} fill={MUTED}>
                A_s = A, n = 1
              </text>
            </g>
          )}

          <g>
            <text x={panelCx} y={52} textAnchor="middle" fontSize={9} fill={isLimit || isCheck ? stressColor : MUTED}>
              {panelTitle}
            </text>
            <circle
              cx={panelCx}
              cy={panelCy}
              r={radius}
              fill="#f2f5fa"
              stroke={isLimit ? PLANE : isCheck ? STRESS : EDGE}
              strokeWidth={isModel ? 1.4 : 1.9}
              strokeDasharray={isModel ? '5 4' : undefined}
            />
            {showFill && (
              <g clipPath="url(#sht3-area-clip)">
                <rect
                  x={panelCx - radius}
                  y={panelCy - radius}
                  width={radius * 2 * fillAmount}
                  height={radius * 2}
                  fill={STRESS}
                  fillOpacity={0.22}
                />
                {Array.from({ length: 6 }, (_, hatch) => {
                  const x = panelCx - radius + 10 + hatch * 16
                  return x <= panelCx - radius + radius * 2 * fillAmount ? (
                    <line
                      key={hatch}
                      x1={x}
                      y1={panelCy - radius}
                      x2={x - 9}
                      y2={panelCy + radius}
                      stroke={STRESS}
                      strokeWidth={0.8}
                      strokeOpacity={0.42}
                    />
                  ) : null
                })}
              </g>
            )}

            {isDiameter || isSelect || isCheck ? (
              <g>
                <line
                  x1={panelCx - radius}
                  y1={panelCy}
                  x2={panelCx + radius}
                  y2={panelCy}
                  stroke={MUTED}
                  strokeWidth={1}
                  strokeDasharray="4 3"
                />
                <line
                  x1={panelCx - radius}
                  y1={panelCy - 4}
                  x2={panelCx - radius}
                  y2={panelCy + 4}
                  stroke={MUTED}
                  strokeWidth={1}
                />
                <line
                  x1={panelCx + radius}
                  y1={panelCy - 4}
                  x2={panelCx + radius}
                  y2={panelCy + 4}
                  stroke={MUTED}
                  strokeWidth={1}
                />
                <text
                  x={panelCx}
                  y={panelCy + radius + 16}
                  textAnchor="middle"
                  fontSize={9}
                  fill={isSelect || isCheck ? OK : MUTED}
                >
                  {isDiameter ? 'd_min = 28,2 mm' : 'd = 30 mm'}
                </text>
              </g>
            ) : (
              <g>
                <line
                  x1={panelCx - radius}
                  y1={panelCy}
                  x2={panelCx + radius}
                  y2={panelCy}
                  stroke={MUTED}
                  strokeWidth={1}
                  strokeDasharray="4 3"
                />
                <line
                  x1={panelCx - radius}
                  y1={panelCy - 4}
                  x2={panelCx - radius}
                  y2={panelCy + 4}
                  stroke={MUTED}
                  strokeWidth={1}
                />
                <line
                  x1={panelCx + radius}
                  y1={panelCy - 4}
                  x2={panelCx + radius}
                  y2={panelCy + 4}
                  stroke={MUTED}
                  strokeWidth={1}
                />
                <text x={panelCx} y={panelCy + radius + 16} textAnchor="middle" fontSize={9} fill={MUTED}>
                  {isModel ? 'd = ?' : isArea ? 'A_s,min = 625 mm²' : 'A_s = ?'}
                </text>
              </g>
            )}

            {isArea && (
              <text x={panelCx} y={panelCy + 4} textAnchor="middle" fontSize={10} fontWeight={700} fill={STRESS}>
                625 mm²
              </text>
            )}
            {isDiameter && (
              <text x={panelCx} y={panelCy + 4} textAnchor="middle" fontSize={10} fontWeight={700} fill={MUTED}>
                28,2 mm
              </text>
            )}
            {isSelect && (
              <text x={panelCx} y={panelCy + 4} textAnchor="middle" fontSize={10} fontWeight={700} fill={OK}>
                706,86 mm²
              </text>
            )}

            {(isLimit || isCheck) && (
              <g opacity={stressAmount > 0.02 ? 1 : 0}>
                {[-0.55, -0.3, 0, 0.3, 0.55].map((ratio) => {
                  const offset = ratio * radius
                  const chord = Math.sqrt(radius * radius - offset * offset) - 8
                  return (
                    <line
                      key={ratio}
                      x1={panelCx - chord}
                      y1={panelCy + offset}
                      x2={panelCx - chord + chord * 2 * stressAmount}
                      y2={panelCy + offset}
                      stroke={stressColor}
                      strokeWidth={1.8}
                      markerEnd="url(#sht3-stress)"
                    />
                  )
                })}
                <text
                  x={panelCx}
                  y={panelCy + radius + 34}
                  textAnchor="middle"
                  fontSize={10}
                  fontWeight={700}
                  fill={stressColor}
                >
                  {isLimit ? 'τ = 80 MPa' : 'τ_sr = 70,7 MPa'}
                </text>
              </g>
            )}
          </g>

          {isCheck && (
            <g>
              <line x1={gaugeX0} y1={gaugeY} x2={gaugeX1} y2={gaugeY} stroke="#c9d0d9" strokeWidth={1.2} />
              <line x1={gaugeX0} y1={gaugeY - 9} x2={gaugeX0} y2={gaugeY + 5} stroke={MUTED} strokeWidth={1} />
              <line
                x1={allowableX}
                y1={gaugeY - 11}
                x2={allowableX}
                y2={gaugeY + 6}
                stroke={PLANE}
                strokeWidth={1.2}
                strokeDasharray="3 2"
              />
              <line
                x1={gaugeX0}
                y1={gaugeY - 4}
                x2={gaugeX0 + (actualX - gaugeX0) * p}
                y2={gaugeY - 4}
                stroke={OK}
                strokeWidth={5}
                strokeLinecap="round"
                opacity={0.8}
              />
              <line
                x1={actualX}
                y1={gaugeY - 10}
                x2={actualX}
                y2={gaugeY + 5}
                stroke={OK}
                strokeWidth={1.6}
                opacity={p}
              />
              <circle cx={actualX} cy={gaugeY - 4} r={3.5} fill={OK} opacity={p} />
              <text x={gaugeX0} y={gaugeY + 18} fontSize={8} fill={MUTED}>
                0
              </text>
              <text x={allowableX} y={gaugeY + 18} textAnchor="middle" fontSize={8} fill={PLANE}>
                80
              </text>
              <text x={gaugeX1} y={gaugeY + 18} textAnchor="end" fontSize={8} fill={MUTED}>
                τ (MPa)
              </text>
              <text x={gaugeX0} y={gaugeY - 16} fontSize={9} fontWeight={700} fill={OK}>
                70,7 MPa ≤ 80 MPa
              </text>
            </g>
          )}

          <text x={14} y={286} fontSize={9} fill={INK}>
            {note}
          </text>
        </svg>
      </div>
    </div>
  )
}
