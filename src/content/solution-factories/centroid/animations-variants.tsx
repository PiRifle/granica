import { useId } from 'react'
import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'
import type { CentroidConfig } from './configs'
import { pl } from '../core/source-task'

export function FigureTwoVariantAnimation({
  config,
  index,
  playing,
  sceneProgress,
}: SolutionAnimationProps & { config: CentroidConfig }) {
  const uid = useId().replace(/[:]/g, '')
  const a = config.a
  const circleArea = Math.PI * 25 * 25
  const rectArea = 2 * a * a
  const triangleArea = (a * a) / 2
  const cutArea = rectArea + triangleArea
  const qy = config.moments.qy
  const qx = config.moments.qx
  const xC = config.centroid.x
  const yC = config.centroid.y
  const removed = config.removedCentroid ?? { x: 0, y: 0 }

  let resX = 0
  let resY = 0
  for (const part of config.parts) {
    const signed = part.negative ? -Math.abs(part.area) : part.area
    resX += signed * (part.x - xC)
    resY += signed * (part.y - yC)
  }

  const MATERIAL = '#dfe7ff'
  const CUT = '#b56b3a'
  const CUT_FILL = '#ffffff'
  const AXIS = '#9aa5b1'
  const MUTED = '#87929d'
  const OK = '#2f7d5b'
  const INK = '#17202a'
  const ACCENT = '#a970dd'
  const RESULT = '#ff6b45'

  const OX = 185
  const OY = 168
  const S = 5.6
  const R = 25 * S
  const sx = (x: number) => OX + x * S
  const sy = (y: number) => OY - y * S

  const topY = sy(a)
  const bottomY = sy(0)
  const leftX = sx(-a)
  const rightX = sx(2 * a)

  const cutPath = `M ${leftX} ${bottomY} L ${rightX} ${bottomY} L ${rightX} ${topY} L ${sx(0)} ${topY} Z`
  const rectPath = `M ${sx(0)} ${bottomY} L ${rightX} ${bottomY} L ${rightX} ${topY} L ${sx(0)} ${topY} Z`
  const trianglePath = `M ${leftX} ${bottomY} L ${sx(0)} ${bottomY} L ${sx(0)} ${topY} Z`

  const angle = (132 * Math.PI) / 180
  const radiusPoint = { x: OX + R * Math.cos(angle), y: OY - R * Math.sin(angle) }
  const cutCentroid = { x: sx(removed.x), y: sy(removed.y) }
  const centroidPoint = { x: sx(xC), y: sy(yC) }

  const status = [
    `Koło R = 25 mm; wycięcie 2a × a = ${2 * a} × ${a} mm ze ścięciem 45°`,
    'Części: koło dodatnie, prostokąt i trójkąt wycięcia ujemne',
    `A_k = ${pl(circleArea, 2)}; A_r = ${pl(rectArea, 2)}; A_t = ${pl(triangleArea, 2)} mm²`,
    `Q_y = ${pl(qy, 2)} mm³ — wycięcie leży po prawej, więc przesuwa centroid w lewo`,
    `Q_x = ${pl(qx, 2)} mm³ — wycięcie leży nad osią x, więc przesuwa centroid w dół`,
    `x_C = ${pl(xC, 3)} mm, y_C = ${pl(yC, 3)} mm — centroid prawie w O`,
    'Znaki ujemne: usunięty materiał leżał w I i II ćwiartce',
    `Kontrola: ΣA(x−x_C) = ${pl(resX, 3)}, ΣA(y−y_C) = ${pl(resY, 3)} mm³`,
  ]

  function panelLines(index: number) {
    if (index === 2) {
      return [
        'Pola [mm²]',
        `A_k = ${pl(circleArea, 2)}`,
        `A_r = −${pl(rectArea, 2)}`,
        `A_t = −${pl(triangleArea, 2)}`,
        `A = ${pl(config.area, 2)}`,
      ]
    }
    if (index === 3) {
      return ['Moment względem y', `Q_y = −A_r·a + A_t·a/3`, `Q_y = ${pl(qy, 2)} mm³`, `x_w = ${pl(removed.x, 3)} mm`]
    }
    if (index === 4) {
      return ['Moment względem x', `Q_x = −A_r·a/2 − A_t·a/3`, `Q_x = ${pl(qx, 2)} mm³`, `y_w = ${pl(removed.y, 3)} mm`]
    }
    if (index === 5) {
      return ['Centroid figury', `x_C = Q_y / A`, `x_C = ${pl(xC, 3)} mm`, `y_C = ${pl(yC, 3)} mm`]
    }
    if (index === 6) {
      return ['Interpretacja', 'x_C < 0, y_C < 0', 'C w III ćwiartce', 'pas 5 mm nad wycięciem']
    }
    if (index >= 7) {
      return [
        'Niezależna kontrola',
        `ΣA(x−x_C) = ${pl(resX, 3)}`,
        `ΣA(y−y_C) = ${pl(resY, 3)}`,
        `A·x_C = ${pl(qy, 2)} = Q_y`,
      ]
    }
    return []
  }
  const p = playing ? Math.min(1, Math.max(0, sceneProgress)) : 1
  const showParts = index >= 1
  const showQy = index >= 3
  const showQx = index >= 4
  const showCentroid = index >= 5
  const showPanel = index >= 2
  const lines = panelLines(index)

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg viewBox="0 0 460 340" role="img" aria-label="Centroid koła z wycięciem prostokątno-trójkątnym">
          <title>Koło R = 25 mm z wycięciem 2a × a i ścięciem 45°</title>
          <desc>
            Koło o promieniu 25 mm, wycięcie od osi y w prawo, ścięte lewe naroże, pola części, momenty i centroid.
          </desc>
          <defs>
            <mask id="e22-mask">
              <rect x="0" y="0" width="460" height="340" fill="black" />
              <circle cx={OX} cy={OY} r={R} fill="white" />
              <path d={cutPath} fill="black" />
            </mask>
            <marker id="e22-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0 0L10 5L0 10Z" fill={RESULT} />
            </marker>
          </defs>

          <g>
            <circle cx={OX} cy={OY} r={R} fill={MATERIAL} mask="url(#${uid}-mask)" />
            <path d={cutPath} fill={CUT_FILL} stroke={CUT} strokeWidth="1.5" strokeLinejoin="round" />
            <motion.path
              d={rectPath}
              fill={CUT}
              stroke={CUT}
              strokeWidth="1.1"
              initial={false}
              animate={{ opacity: showParts ? 0.16 + 0.12 * p : 0 }}
              transition={{ duration: 0.25 }}
            />
            <motion.path
              d={trianglePath}
              fill={ACCENT}
              stroke={ACCENT}
              strokeWidth="1.1"
              initial={false}
              animate={{ opacity: showParts ? 0.2 + 0.14 * p : 0 }}
              transition={{ duration: 0.25 }}
            />

            <line x1="40" y1={OY} x2="352" y2={OY} stroke={AXIS} strokeWidth="1.2" strokeDasharray="5 4" />
            <line x1={OX} y1="12" x2={OX} y2="322" stroke={AXIS} strokeWidth="1.2" strokeDasharray="5 4" />
            <line x1={OX} y1={OY} x2={radiusPoint.x} y2={radiusPoint.y} stroke={MUTED} strokeWidth="1" />
            <line x1={radiusPoint.x} y1={radiusPoint.y} x2="78" y2="52" stroke={MUTED} strokeWidth="1" />

            <g stroke={MUTED} strokeWidth="1" fill="none">
              <line x1={leftX} y1={topY - 16} x2={rightX} y2={topY - 16} />
              <line x1={leftX} y1={topY - 20} x2={leftX} y2={topY - 12} />
              <line x1={rightX} y1={topY - 20} x2={rightX} y2={topY - 12} />
              <line x1={rightX + 14} y1={bottomY} x2={rightX + 14} y2={topY} />
              <line x1={rightX + 10} y1={bottomY} x2={rightX + 18} y2={bottomY} />
              <line x1={rightX + 10} y1={topY} x2={rightX + 18} y2={topY} />
              <line x1={rightX + 52} y1={topY} x2={rightX + 52} y2={sy(a + 5)} />
              <line x1={rightX + 48} y1={topY} x2={rightX + 56} y2={topY} />
              <line x1={rightX + 48} y1={sy(a + 5)} x2={rightX + 56} y2={sy(a + 5)} />
            </g>

            {showQy && (
              <line
                x1={OX}
                y1={cutCentroid.y}
                x2={cutCentroid.x}
                y2={cutCentroid.y}
                stroke={ACCENT}
                strokeWidth="1.2"
                strokeDasharray="4 3"
              />
            )}
            {showQx && (
              <line
                x1={cutCentroid.x}
                y1={OY}
                x2={cutCentroid.x}
                y2={cutCentroid.y}
                stroke={ACCENT}
                strokeWidth="1.2"
                strokeDasharray="4 3"
              />
            )}
            {showQy && <circle cx={cutCentroid.x} cy={cutCentroid.y} r="4" fill={ACCENT} />}
            {showCentroid && (
              <>
                <line
                  x1={centroidPoint.x}
                  y1={OY}
                  x2={centroidPoint.x}
                  y2={centroidPoint.y}
                  stroke={RESULT}
                  strokeWidth="1.2"
                  strokeDasharray="4 3"
                />
                <line
                  x1={OX}
                  y1={centroidPoint.y}
                  x2={centroidPoint.x}
                  y2={centroidPoint.y}
                  stroke={RESULT}
                  strokeWidth="1.2"
                  strokeDasharray="4 3"
                />
                <circle cx={centroidPoint.x} cy={centroidPoint.y} r="6" fill="#fff" stroke={RESULT} strokeWidth="2.2" />
                <line
                  x1={centroidPoint.x - 10}
                  y1={centroidPoint.y}
                  x2={centroidPoint.x + 10}
                  y2={centroidPoint.y}
                  stroke={RESULT}
                  strokeWidth="1.2"
                />
                <line
                  x1={centroidPoint.x}
                  y1={centroidPoint.y - 10}
                  x2={centroidPoint.x}
                  y2={centroidPoint.y + 10}
                  stroke={RESULT}
                  strokeWidth="1.2"
                />
              </>
            )}
            {showCentroid && (
              <line x1={centroidPoint.x} y1={centroidPoint.y} x2="204" y2="194" stroke={RESULT} strokeWidth="1.1" />
            )}

            {showPanel && (
              <rect x="332" y="22" width="120" height="126" rx="9" fill="#f8fafc" stroke="#d7dde5" strokeWidth="1.1" />
            )}
            {index >= 7 && <circle cx="438" cy="132" r="7" fill="#eef7f1" stroke={OK} strokeWidth="1.4" />}
          </g>

          <g>
            <g fontSize="12" fill={INK}>
              <text x="356" y="161">
                x
              </text>
              <text x={OX + 8} y="24">
                y
              </text>
              <text x={OX - 18} y={OY + 18}>
                O
              </text>
            </g>
            <text x="52" y="42" fontSize="10" fill={MUTED}>
              R = 25
            </text>
            <text x={(leftX + rightX) / 2} y={topY - 22} textAnchor="middle" fontSize="9.5" fill={MUTED}>
              2a = {2 * a}
            </text>
            <text x={rightX + 20} y={(topY + bottomY) / 2 + 3} fontSize="9.5" fill={MUTED}>
              a = {a}
            </text>
            <text x={rightX + 58} y={(topY + sy(a + 5)) / 2 + 3} fontSize="9.5" fill={MUTED}>
              5
            </text>
            <text x={leftX - 8} y={bottomY - 8} textAnchor="end" fontSize="9.5" fill={MUTED}>
              45°
            </text>
            {showQy && (
              <text x={cutCentroid.x + 8} y={cutCentroid.y - 6} fontSize="9.5" fill={ACCENT}>
                w
              </text>
            )}
            {showCentroid && (
              <text x="207" y="198" fontSize="10.5" fontWeight="700" fill={RESULT}>
                C = ({pl(xC, 3)}; {pl(yC, 3)}) mm
              </text>
            )}

            {showPanel &&
              lines.map((line, lineIndex) => (
                <text
                  key={`${index}-${lineIndex}`}
                  x="342"
                  y={42 + lineIndex * 15}
                  fontSize="9.5"
                  fontWeight={lineIndex === 0 ? 700 : 500}
                  fill={lineIndex === 0 ? INK : MUTED}
                >
                  {line}
                </text>
              ))}
            {index >= 7 && (
              <text x="438" y="136" textAnchor="middle" fontSize="8.5" fontWeight="700" fill={OK}>
                OK
              </text>
            )}

            <text x="230" y="331" textAnchor="middle" fontSize="10.5" fill={INK}>
              {status[index]}
            </text>
          </g>
        </svg>
      </div>
    </div>
  )
}

export function FigureThreeAnimation({
  config,
  index,
  playing,
  sceneProgress,
}: SolutionAnimationProps & { config: CentroidConfig }) {
  const uid = useId().replace(/[:]/g, '')
  const a = config.a
  const b = config.b ?? 10
  const d = config.d ?? 40
  const radius = d / 2
  const circleArea = Math.PI * radius * radius
  const rectArea = 2 * b * (a + 2)
  const chamferArea = (a * a) / 2
  const cutArea = rectArea - chamferArea
  const qy = config.moments.qy
  const qx = config.moments.qx
  const xC = config.centroid.x
  const yC = config.centroid.y
  const removed = config.removedCentroid ?? { x: 0, y: 0 }

  let resX = 0
  let resY = 0
  for (const part of config.parts) {
    const signed = part.negative ? -Math.abs(part.area) : part.area
    resX += signed * (part.x - xC)
    resY += signed * (part.y - yC)
  }

  const MATERIAL = '#dfe7ff'
  const CUT = '#b56b3a'
  const CUT_FILL = '#ffffff'
  const AXIS = '#9aa5b1'
  const MUTED = '#87929d'
  const OK = '#2f7d5b'
  const INK = '#17202a'
  const ACCENT = '#a970dd'
  const RESULT = '#ff6b45'

  const OX = 190
  const OY = 165
  const R = 125
  const S = R / radius
  const sx = (x: number) => OX + x * S
  const sy = (y: number) => OY - y * S

  const leftX = sx(-b)
  const rightX = sx(b)
  const topY = sy(a)
  const bottomY = sy(-2)

  const cutPath = `M ${leftX} ${topY} L ${rightX} ${topY} L ${rightX} ${bottomY} L ${sx(-b + a)} ${bottomY} L ${leftX} ${sy(a - 2)} Z`
  const rectPath = `M ${leftX} ${topY} L ${rightX} ${topY} L ${rightX} ${bottomY} L ${leftX} ${bottomY} Z`
  const chamferPath = `M ${leftX} ${bottomY} L ${sx(-b + a)} ${bottomY} L ${leftX} ${sy(a - 2)} Z`

  const angle = (135 * Math.PI) / 180
  const radiusPoint = { x: OX + R * Math.cos(angle), y: OY - R * Math.sin(angle) }
  const cutCentroid = { x: sx(removed.x), y: sy(removed.y) }
  const centroidPoint = { x: sx(xC), y: sy(yC) }
  const chamferMid = { x: sx(-b + a / 2), y: sy((a - 4) / 2) }
  const rectCentroidPoint = { x: sx(0), y: sy((a - 2) / 2) }
  const chamferCentroidPoint = { x: sx(-b + a / 3), y: sy((a - 6) / 3) }
  const qxArmX = OX + 8

  const status = [
    `Koło d = ${d} mm (R = ${radius}); wycięcie 2b × (a+2) = ${2 * b} × ${a + 2} mm`,
    'Części: koło dodatnie, prostokąt ujemny, ścięty narożnik dodany z powrotem',
    `A_k = ${pl(circleArea, 2)}; A_r = ${pl(rectArea, 2)}; A_ś = ${pl(chamferArea, 2)} mm²`,
    `Q_y = ${pl(qy, 2)} mm³ — ścięcie po lewej daje moment ujemny`,
    `Q_x = ${pl(qx, 2)} mm³ — wycięcie nad osią x przesuwa centroid w dół`,
    `x_C = ${pl(xC, 3)} mm, y_C = ${pl(yC, 3)} mm — centroid w obszarze wycięcia`,
    'Znaki ujemne są przeciwne do znaków środka wycięcia (x_w > 0, y_w > 0)',
    `Kontrola: ΣA(x−x_C) = ${pl(resX, 3)}, ΣA(y−y_C) = ${pl(resY, 3)} mm³`,
  ]

  function panelLines(index: number) {
    if (index === 2) {
      return [
        'Pola [mm²]',
        `A_k = ${pl(circleArea, 2)}`,
        `A_r = −${pl(rectArea, 2)}`,
        `A_ś = +${pl(chamferArea, 2)}`,
        `A_w = ${pl(cutArea, 2)}`,
        `A = ${pl(config.area, 2)}`,
      ]
    }
    if (index === 3) {
      return ['Moment względem y', `Q_y = A_ś·(a/3 − b)`, `Q_y = ${pl(qy, 2)} mm³`, `x_w = ${pl(removed.x, 3)} mm`]
    }
    if (index === 4) {
      return [
        'Moment względem x',
        `Q_x = −A_r·(a−2)/2 + A_ś·(a−6)/3`,
        `Q_x = ${pl(qx, 2)} mm³`,
        `y_w = ${pl(removed.y, 3)} mm`,
      ]
    }
    if (index === 5) {
      return ['Centroid figury', `x_C = Q_y / A`, `x_C = ${pl(xC, 3)} mm`, `y_C = ${pl(yC, 3)} mm`]
    }
    if (index === 6) {
      return ['Interpretacja', 'x_C < 0, y_C < 0', 'C leży w wycięciu', 'to dopuszczalne dla ubytku']
    }
    if (index >= 7) {
      return [
        'Niezależna kontrola',
        `ΣA(x−x_C) = ${pl(resX, 3)}`,
        `ΣA(y−y_C) = ${pl(resY, 3)}`,
        `A·y_C = ${pl(qx, 2)} = Q_x`,
      ]
    }
    return []
  }
  const p = playing ? Math.min(1, Math.max(0, sceneProgress)) : 1
  const showParts = index >= 1
  const showQy = index === 3
  const showQx = index === 4
  const showCentroid = index >= 5
  const showPanel = index >= 2
  const lines = panelLines(index)

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg viewBox="0 0 460 340" role="img" aria-label="Centroid koła z prostokątnym wycięciem i ściętym narożnikiem">
          <title>Koło d z wycięciem 2b × (a+2) i ścięciem 45°</title>
          <desc>
            Koło o średnicy d, wycięcie sięgające 2 mm poniżej osi x, ścięty dolny lewy narożnik, pola, momenty i
            centroid.
          </desc>
          <defs>
            <mask id="e31-mask">
              <rect x="0" y="0" width="460" height="340" fill="black" />
              <circle cx={OX} cy={OY} r={R} fill="white" />
              <path d={cutPath} fill="black" />
            </mask>
            <marker id="e31-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0 0L10 5L0 10Z" fill={RESULT} />
            </marker>
          </defs>

          <g>
            <circle cx={OX} cy={OY} r={R} fill={MATERIAL} mask="url(#${uid}-mask)" />
            <path d={cutPath} fill={CUT_FILL} stroke={CUT} strokeWidth="1.5" strokeLinejoin="round" />
            <motion.path
              d={rectPath}
              fill={CUT}
              stroke={CUT}
              strokeWidth="1.1"
              strokeDasharray="4 3"
              initial={false}
              animate={{ opacity: showParts ? 0.14 + 0.12 * p : 0 }}
              transition={{ duration: 0.25 }}
            />
            <motion.path
              d={chamferPath}
              fill={OK}
              stroke={OK}
              strokeWidth="1.1"
              initial={false}
              animate={{ opacity: showParts ? 0.22 + 0.12 * p : 0 }}
              transition={{ duration: 0.25 }}
            />

            <line x1="40" y1={OY} x2="352" y2={OY} stroke={AXIS} strokeWidth="1.2" strokeDasharray="5 4" />
            <line x1={OX} y1="16" x2={OX} y2="318" stroke={AXIS} strokeWidth="1.2" strokeDasharray="5 4" />
            <line x1={OX} y1={OY} x2={radiusPoint.x} y2={radiusPoint.y} stroke={MUTED} strokeWidth="1" />
            <line x1={radiusPoint.x} y1={radiusPoint.y} x2="76" y2="54" stroke={MUTED} strokeWidth="1" />

            <g stroke={MUTED} strokeWidth="1" fill="none">
              <line x1={leftX} y1={topY - 18} x2={rightX} y2={topY - 18} />
              <line x1={leftX} y1={topY - 22} x2={leftX} y2={topY - 14} />
              <line x1={rightX} y1={topY - 22} x2={rightX} y2={topY - 14} />
              <line x1={rightX + 16} y1={bottomY} x2={rightX + 16} y2={topY} />
              <line x1={rightX + 12} y1={bottomY} x2={rightX + 20} y2={bottomY} />
              <line x1={rightX + 12} y1={topY} x2={rightX + 20} y2={topY} />
              <line x1={leftX - 16} y1={OY} x2={leftX - 16} y2={bottomY} />
              <line x1={leftX - 20} y1={OY} x2={leftX - 12} y2={OY} />
              <line x1={leftX - 20} y1={bottomY} x2={leftX - 12} y2={bottomY} />
            </g>

            {showQy && (
              <g>
                <line
                  x1={OX}
                  y1={chamferCentroidPoint.y}
                  x2={chamferCentroidPoint.x}
                  y2={chamferCentroidPoint.y}
                  stroke={ACCENT}
                  strokeWidth="1.2"
                  strokeDasharray="4 3"
                />
                <line
                  x1={OX - 4}
                  y1={chamferCentroidPoint.y}
                  x2={OX + 4}
                  y2={chamferCentroidPoint.y}
                  stroke={ACCENT}
                  strokeWidth="1.4"
                />
                <circle cx={chamferCentroidPoint.x} cy={chamferCentroidPoint.y} r="4" fill={ACCENT} />
                <circle cx={rectCentroidPoint.x} cy={rectCentroidPoint.y} r="4" fill={ACCENT} />
                <circle cx={cutCentroid.x} cy={cutCentroid.y} r="4" fill={ACCENT} />
              </g>
            )}
            {showQx && (
              <g>
                <line
                  x1={qxArmX}
                  y1={OY}
                  x2={qxArmX}
                  y2={rectCentroidPoint.y}
                  stroke={ACCENT}
                  strokeWidth="1.2"
                  strokeDasharray="4 3"
                />
                <line
                  x1={OX}
                  y1={rectCentroidPoint.y}
                  x2={qxArmX}
                  y2={rectCentroidPoint.y}
                  stroke={ACCENT}
                  strokeWidth="1.2"
                  strokeDasharray="4 3"
                />
                <line
                  x1={chamferCentroidPoint.x}
                  y1={OY}
                  x2={chamferCentroidPoint.x}
                  y2={chamferCentroidPoint.y}
                  stroke={ACCENT}
                  strokeWidth="1.2"
                  strokeDasharray="4 3"
                />
                <circle cx={rectCentroidPoint.x} cy={rectCentroidPoint.y} r="4" fill={ACCENT} />
                <circle cx={chamferCentroidPoint.x} cy={chamferCentroidPoint.y} r="4" fill={ACCENT} />
                <circle cx={cutCentroid.x} cy={cutCentroid.y} r="4" fill={ACCENT} />
              </g>
            )}
            {showCentroid && (
              <>
                <line
                  x1={centroidPoint.x}
                  y1={OY}
                  x2={centroidPoint.x}
                  y2={centroidPoint.y}
                  stroke={RESULT}
                  strokeWidth="1.2"
                  strokeDasharray="4 3"
                />
                <line
                  x1={OX}
                  y1={centroidPoint.y}
                  x2={centroidPoint.x}
                  y2={centroidPoint.y}
                  stroke={RESULT}
                  strokeWidth="1.2"
                  strokeDasharray="4 3"
                />
                <circle cx={centroidPoint.x} cy={centroidPoint.y} r="6" fill="#fff" stroke={RESULT} strokeWidth="2.2" />
                <line
                  x1={centroidPoint.x - 10}
                  y1={centroidPoint.y}
                  x2={centroidPoint.x + 10}
                  y2={centroidPoint.y}
                  stroke={RESULT}
                  strokeWidth="1.2"
                />
                <line
                  x1={centroidPoint.x}
                  y1={centroidPoint.y - 10}
                  x2={centroidPoint.x}
                  y2={centroidPoint.y + 10}
                  stroke={RESULT}
                  strokeWidth="1.2"
                />
              </>
            )}
            {showCentroid && (
              <line x1={centroidPoint.x} y1={centroidPoint.y} x2="204" y2="194" stroke={RESULT} strokeWidth="1.1" />
            )}

            {showPanel && (
              <rect x="332" y="22" width="120" height="140" rx="9" fill="#f8fafc" stroke="#d7dde5" strokeWidth="1.1" />
            )}
            {index >= 7 && <circle cx="438" cy="146" r="7" fill="#eef7f1" stroke={OK} strokeWidth="1.4" />}
          </g>

          <g>
            <g fontSize="12" fill={INK}>
              <text x="356" y="161">
                x
              </text>
              <text x={OX + 8} y="28">
                y
              </text>
              <text x={OX - 18} y={OY + 18}>
                O
              </text>
            </g>
            <text x="46" y="48" fontSize="9.5" fill={MUTED}>
              R = d/2 = {radius}
            </text>
            <text x={(leftX + rightX) / 2} y={topY - 24} textAnchor="middle" fontSize="9.5" fill={MUTED}>
              2b = {2 * b}
            </text>
            <text x={rightX + 22} y={(topY + bottomY) / 2 + 3} fontSize="9.5" fill={MUTED}>
              a+2 = {a + 2}
            </text>
            <text x={leftX - 22} y={(OY + bottomY) / 2 + 3} textAnchor="end" fontSize="9.5" fill={MUTED}>
              2
            </text>
            <text x={chamferMid.x - 4} y={chamferMid.y + 34} textAnchor="middle" fontSize="9.5" fill={MUTED}>
              45°
            </text>
            {showQy && (
              <g fontSize="9.5" fill={ACCENT}>
                <text x={(OX + chamferCentroidPoint.x) / 2 - 12} y={chamferCentroidPoint.y - 9} textAnchor="middle">
                  x_ś = {pl(-b + a / 3, 3)}
                </text>
                <text x={OX + 14} y={rectCentroidPoint.y - 6}>
                  x_r = 0
                </text>
                <text x={cutCentroid.x - 2} y={cutCentroid.y - 8} textAnchor="middle">
                  w
                </text>
              </g>
            )}
            {showQx && (
              <g fontSize="9.5" fill={ACCENT}>
                <text x={qxArmX + 5} y={(OY + rectCentroidPoint.y) / 2 + 3}>
                  y_r = {pl((a - 2) / 2, 3)}
                </text>
                <text x={OX + 6} y={OY + 24}>
                  y_ś = {pl((a - 6) / 3, 3)}
                </text>
                <text x={cutCentroid.x - 2} y={cutCentroid.y - 8} textAnchor="middle">
                  w
                </text>
              </g>
            )}
            {showCentroid && (
              <text x="207" y="198" fontSize="10.5" fontWeight="700" fill={RESULT}>
                C = ({pl(xC, 3)}; {pl(yC, 3)}) mm
              </text>
            )}

            {showPanel &&
              lines.map((line, lineIndex) => (
                <text
                  key={`${index}-${lineIndex}`}
                  x="342"
                  y={42 + lineIndex * 15}
                  fontSize="9.5"
                  fontWeight={lineIndex === 0 ? 700 : 500}
                  fill={lineIndex === 0 ? INK : MUTED}
                >
                  {line}
                </text>
              ))}
            {index >= 7 && (
              <text x="438" y="150" textAnchor="middle" fontSize="8.5" fontWeight="700" fill={OK}>
                OK
              </text>
            )}

            <text x="230" y="331" textAnchor="middle" fontSize="10.5" fill={INK}>
              {status[index]}
            </text>
          </g>
        </svg>
      </div>
    </div>
  )
}

export function FigureThreeAltAnimation({
  config,
  index,
  playing,
  sceneProgress,
}: SolutionAnimationProps & { config: CentroidConfig }) {
  const uid = useId().replace(/[:]/g, '')
  const a = config.a
  const b = config.b ?? 10
  const d = config.d ?? 50
  const radius = d / 2
  const circleArea = Math.PI * radius * radius
  const rectArea = 2 * b * (a + 2)
  const chamferArea = (a * a) / 2
  const cutArea = rectArea - chamferArea
  const qy = config.moments.qy
  const qx = config.moments.qx
  const xC = config.centroid.x
  const yC = config.centroid.y
  const removed = config.removedCentroid ?? { x: 0, y: 0 }

  let resX = 0
  let resY = 0
  for (const part of config.parts) {
    const signed = part.negative ? -Math.abs(part.area) : part.area
    resX += signed * (part.x - xC)
    resY += signed * (part.y - yC)
  }

  const MATERIAL = '#dfe7ff'
  const CUT = '#b56b3a'
  const CUT_FILL = '#ffffff'
  const AXIS = '#9aa5b1'
  const MUTED = '#87929d'
  const OK = '#2f7d5b'
  const INK = '#17202a'
  const ACCENT = '#a970dd'
  const RESULT = '#ff6b45'

  const OX = 190
  const OY = 165
  const R = 125
  const S = R / radius
  const sx = (x: number) => OX + x * S
  const sy = (y: number) => OY - y * S

  const leftX = sx(-b)
  const rightX = sx(b)
  const topY = sy(a)
  const bottomY = sy(-2)

  const cutPath = `M ${leftX} ${topY} L ${rightX} ${topY} L ${rightX} ${bottomY} L ${sx(-b + a)} ${bottomY} L ${leftX} ${sy(a - 2)} Z`
  const rectPath = `M ${leftX} ${topY} L ${rightX} ${topY} L ${rightX} ${bottomY} L ${leftX} ${bottomY} Z`
  const chamferPath = `M ${leftX} ${bottomY} L ${sx(-b + a)} ${bottomY} L ${leftX} ${sy(a - 2)} Z`

  const angle = (135 * Math.PI) / 180
  const radiusPoint = { x: OX + R * Math.cos(angle), y: OY - R * Math.sin(angle) }
  const cutCentroid = { x: sx(removed.x), y: sy(removed.y) }
  const centroidPoint = { x: sx(xC), y: sy(yC) }
  const chamferMid = { x: sx(-b + a / 2), y: sy((a - 4) / 2) }
  const rectCentroidPoint = { x: sx(0), y: sy((a - 2) / 2) }
  const chamferCentroidPoint = { x: sx(-b + a / 3), y: sy((a - 6) / 3) }
  const qxArmX = OX + 8

  const status = [
    `Koło d = ${d} mm (R = ${radius}); wycięcie 2b × (a+2) = ${2 * b} × ${a + 2} mm`,
    'Części: koło dodatnie, prostokąt ujemny, ścięty narożnik dodany z powrotem',
    `A_k = ${pl(circleArea, 2)}; A_r = ${pl(rectArea, 2)}; A_ś = ${pl(chamferArea, 2)} mm²`,
    `Q_y = ${pl(qy, 2)} mm³ — ścięcie po lewej daje moment ujemny`,
    `Q_x = ${pl(qx, 2)} mm³ — wycięcie nad osią x przesuwa centroid w dół`,
    `x_C = ${pl(xC, 3)} mm, y_C = ${pl(yC, 3)} mm — centroid w obszarze wycięcia`,
    'Znaki ujemne są przeciwne do znaków środka wycięcia (x_w > 0, y_w > 0)',
    `Kontrola: ΣA(x−x_C) = ${pl(resX, 3)}, ΣA(y−y_C) = ${pl(resY, 3)} mm³`,
  ]

  function panelLines(index: number) {
    if (index === 2) {
      return [
        'Pola [mm²]',
        `A_k = ${pl(circleArea, 2)}`,
        `A_r = −${pl(rectArea, 2)}`,
        `A_ś = +${pl(chamferArea, 2)}`,
        `A_w = ${pl(cutArea, 2)}`,
        `A = ${pl(config.area, 2)}`,
      ]
    }
    if (index === 3) {
      return ['Moment względem y', `Q_y = ${pl(qy, 2)} mm³`, `x_w = ${pl(removed.x, 3)} mm`]
    }
    if (index === 4) {
      return ['Moment względem x', `Q_x = ${pl(qx, 2)} mm³`, `y_w = ${pl(removed.y, 3)} mm`]
    }
    if (index === 5) {
      return ['Centroid figury', `x_C = ${pl(xC, 3)} mm`, `y_C = ${pl(yC, 3)} mm`]
    }
    if (index === 6) {
      return ['Interpretacja', 'x_C < 0, y_C < 0', 'C leży w wycięciu', 'to dopuszczalne dla ubytku']
    }
    if (index >= 7) {
      return [
        'Niezależna kontrola',
        `ΣA(x−x_C) = ${pl(resX, 3)}`,
        `ΣA(y−y_C) = ${pl(resY, 3)}`,
        `A·y_C = ${pl(qx, 2)} = Q_x`,
      ]
    }
    return []
  }
  const p = playing ? Math.min(1, Math.max(0, sceneProgress)) : 1
  const showParts = index >= 1
  const showQy = index === 3
  const showQx = index === 4
  const showCentroid = index >= 5
  const showCheck = index >= 7
  const showPanel = index >= 2
  const lines = panelLines(index)

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg viewBox="0 0 460 340" role="img" aria-label="Centroid koła z prostokątnym wycięciem i ściętym narożnikiem">
          <title>Koło d z wycięciem 2b × (a+2) i ścięciem 45°</title>
          <desc>
            Koło o średnicy d = 50 mm, wycięcie 20 × 10 mm sięgające 2 mm poniżej osi x, ścięty dolny lewy narożnik,
            pola, momenty i centroid.
          </desc>
          <defs>
            <mask id="e33-mask">
              <rect x="0" y="0" width="460" height="340" fill="black" />
              <circle cx={OX} cy={OY} r={R} fill="white" />
              <path d={cutPath} fill="black" />
            </mask>
            <marker id="e33-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0 0L10 5L0 10Z" fill={RESULT} />
            </marker>
          </defs>

          <circle cx={OX} cy={OY} r={R} fill={MATERIAL} mask="url(#${uid}-mask)" />
          <path d={cutPath} fill={CUT_FILL} stroke={CUT} strokeWidth="1.5" strokeLinejoin="round" />
          <motion.path
            d={rectPath}
            fill={CUT}
            stroke={CUT}
            strokeWidth="1.1"
            strokeDasharray="4 3"
            initial={false}
            animate={{ opacity: showParts ? 0.14 + 0.12 * p : 0 }}
            transition={{ duration: 0.25 }}
          />
          <motion.path
            d={chamferPath}
            fill={OK}
            stroke={OK}
            strokeWidth="1.1"
            initial={false}
            animate={{ opacity: showParts ? 0.22 + 0.12 * p : 0 }}
            transition={{ duration: 0.25 }}
          />

          <line x1="40" y1={OY} x2="352" y2={OY} stroke={AXIS} strokeWidth="1.2" strokeDasharray="5 4" />
          <line x1={OX} y1="16" x2={OX} y2="318" stroke={AXIS} strokeWidth="1.2" strokeDasharray="5 4" />
          <line x1={OX} y1={OY} x2={radiusPoint.x} y2={radiusPoint.y} stroke={MUTED} strokeWidth="1" />
          <line x1={radiusPoint.x} y1={radiusPoint.y} x2="76" y2="54" stroke={MUTED} strokeWidth="1" />

          <g stroke={MUTED} strokeWidth="1" fill="none">
            <line x1={leftX} y1={topY - 18} x2={rightX} y2={topY - 18} />
            <line x1={leftX} y1={topY - 22} x2={leftX} y2={topY - 14} />
            <line x1={rightX} y1={topY - 22} x2={rightX} y2={topY - 14} />
            <line x1={rightX + 16} y1={bottomY} x2={rightX + 16} y2={topY} />
            <line x1={rightX + 12} y1={bottomY} x2={rightX + 20} y2={bottomY} />
            <line x1={rightX + 12} y1={topY} x2={rightX + 20} y2={topY} />
            <line x1={leftX - 16} y1={OY} x2={leftX - 16} y2={bottomY} />
            <line x1={leftX - 20} y1={OY} x2={leftX - 12} y2={OY} />
            <line x1={leftX - 20} y1={bottomY} x2={leftX - 12} y2={bottomY} />
          </g>

          {showQy && (
            <g>
              <line
                x1={OX}
                y1={chamferCentroidPoint.y}
                x2={chamferCentroidPoint.x}
                y2={chamferCentroidPoint.y}
                stroke={ACCENT}
                strokeWidth="1.2"
                strokeDasharray="4 3"
              />
              <line
                x1={OX - 4}
                y1={chamferCentroidPoint.y}
                x2={OX + 4}
                y2={chamferCentroidPoint.y}
                stroke={ACCENT}
                strokeWidth="1.4"
              />
              <circle cx={chamferCentroidPoint.x} cy={chamferCentroidPoint.y} r="4" fill={ACCENT} />
              <circle cx={rectCentroidPoint.x} cy={rectCentroidPoint.y} r="4" fill={ACCENT} />
              <circle cx={cutCentroid.x} cy={cutCentroid.y} r="4" fill={ACCENT} />
            </g>
          )}
          {showQx && (
            <g>
              <line
                x1={qxArmX}
                y1={OY}
                x2={qxArmX}
                y2={rectCentroidPoint.y}
                stroke={ACCENT}
                strokeWidth="1.2"
                strokeDasharray="4 3"
              />
              <line
                x1={OX}
                y1={rectCentroidPoint.y}
                x2={qxArmX}
                y2={rectCentroidPoint.y}
                stroke={ACCENT}
                strokeWidth="1.2"
                strokeDasharray="4 3"
              />
              <line
                x1={chamferCentroidPoint.x}
                y1={OY}
                x2={chamferCentroidPoint.x}
                y2={chamferCentroidPoint.y}
                stroke={ACCENT}
                strokeWidth="1.2"
                strokeDasharray="4 3"
              />
              <circle cx={rectCentroidPoint.x} cy={rectCentroidPoint.y} r="4" fill={ACCENT} />
              <circle cx={chamferCentroidPoint.x} cy={chamferCentroidPoint.y} r="4" fill={ACCENT} />
              <circle cx={cutCentroid.x} cy={cutCentroid.y} r="4" fill={ACCENT} />
            </g>
          )}
          {showCentroid && (
            <>
              <line
                x1={centroidPoint.x}
                y1={OY}
                x2={centroidPoint.x}
                y2={centroidPoint.y}
                stroke={RESULT}
                strokeWidth="1.2"
                strokeDasharray="4 3"
              />
              <line
                x1={OX}
                y1={centroidPoint.y}
                x2={centroidPoint.x}
                y2={centroidPoint.y}
                stroke={RESULT}
                strokeWidth="1.2"
                strokeDasharray="4 3"
              />
              <circle
                cx={centroidPoint.x}
                cy={centroidPoint.y}
                r="6"
                fill="#fff"
                stroke={showCheck ? OK : RESULT}
                strokeWidth="2.2"
              />
              <line
                x1={centroidPoint.x - 10}
                y1={centroidPoint.y}
                x2={centroidPoint.x + 10}
                y2={centroidPoint.y}
                stroke={showCheck ? OK : RESULT}
                strokeWidth="1.2"
              />
              <line
                x1={centroidPoint.x}
                y1={centroidPoint.y - 10}
                x2={centroidPoint.x}
                y2={centroidPoint.y + 10}
                stroke={showCheck ? OK : RESULT}
                strokeWidth="1.2"
              />
            </>
          )}
          {showCentroid && (
            <line x1={centroidPoint.x} y1={centroidPoint.y} x2="204" y2="194" stroke={RESULT} strokeWidth="1.1" />
          )}
          {showCentroid && (
            <motion.circle
              cx={centroidPoint.x}
              cy={centroidPoint.y}
              r="8"
              fill="none"
              stroke={showCheck ? OK : RESULT}
              strokeWidth="1.4"
              initial={false}
              animate={playing && p < 1 ? { r: [8, 14, 8], opacity: [0.55, 0, 0.55] } : { opacity: 0 }}
              transition={{ duration: 1.8, repeat: playing && p < 1 ? Infinity : 0, ease: 'easeInOut' }}
            />
          )}

          {showPanel && (
            <rect x="332" y="22" width="120" height="140" rx="9" fill="#f8fafc" stroke="#d7dde5" strokeWidth="1.1" />
          )}
          {showCheck && <circle cx="438" cy="146" r="7" fill="#eef7f1" stroke={OK} strokeWidth="1.4" />}

          <g fontSize="12" fill={INK}>
            <text x="356" y="161">
              x
            </text>
            <text x={OX + 8} y="28">
              y
            </text>
            <text x={OX - 18} y={OY + 18}>
              O
            </text>
          </g>
          <text x="46" y="48" fontSize="9.5" fill={MUTED}>
            R = d/2 = {radius}
          </text>
          <text x={(leftX + rightX) / 2} y={topY - 24} textAnchor="middle" fontSize="9.5" fill={MUTED}>
            2b = {2 * b}
          </text>
          <text x={rightX + 22} y={(topY + bottomY) / 2 + 3} fontSize="9.5" fill={MUTED}>
            a+2 = {a + 2}
          </text>
          <text x={leftX - 22} y={(OY + bottomY) / 2 + 3} textAnchor="end" fontSize="9.5" fill={MUTED}>
            2
          </text>
          <text x={chamferMid.x - 4} y={chamferMid.y + 34} textAnchor="middle" fontSize="9.5" fill={MUTED}>
            45°
          </text>
          {showQy && (
            <g fontSize="9.5" fill={ACCENT}>
              <text x={(OX + chamferCentroidPoint.x) / 2 - 12} y={chamferCentroidPoint.y - 9} textAnchor="middle">
                x_ś = {pl(-b + a / 3, 3)}
              </text>
              <text x={OX + 14} y={rectCentroidPoint.y - 6}>
                x_r = 0
              </text>
              <text x={cutCentroid.x - 2} y={cutCentroid.y - 8} textAnchor="middle">
                w
              </text>
            </g>
          )}
          {showQx && (
            <g fontSize="9.5" fill={ACCENT}>
              <text x={qxArmX + 5} y={(OY + rectCentroidPoint.y) / 2 + 3}>
                y_r = {pl((a - 2) / 2, 3)}
              </text>
              <text x={OX + 6} y={OY + 24}>
                y_ś = {pl((a - 6) / 3, 3)}
              </text>
              <text x={cutCentroid.x - 2} y={cutCentroid.y - 8} textAnchor="middle">
                w
              </text>
            </g>
          )}
          {showCentroid && (
            <text x="207" y="198" fontSize="10.5" fontWeight="700" fill={showCheck ? OK : RESULT}>
              C = ({pl(xC, 3)}; {pl(yC, 3)}) mm
            </text>
          )}

          {showPanel &&
            lines.map((line, lineIndex) => (
              <text
                key={`${index}-${lineIndex}`}
                x="342"
                y={42 + lineIndex * 15}
                fontSize="9.5"
                fontWeight={lineIndex === 0 ? 700 : 500}
                fill={lineIndex === 0 ? INK : MUTED}
              >
                {line}
              </text>
            ))}
          {showCheck && (
            <text x="438" y="150" textAnchor="middle" fontSize="8.5" fontWeight="700" fill={OK}>
              OK
            </text>
          )}

          <text x="230" y="331" textAnchor="middle" fontSize="9.5" fill={INK}>
            {status[index]}
          </text>
        </svg>
      </div>
    </div>
  )
}

export function FigureFourAnimation({
  config,
  index,
  playing,
  sceneProgress,
}: SolutionAnimationProps & { config: CentroidConfig }) {
  const uid = useId().replace(/[:]/g, '')
  const a = config.a
  const circleArea = Math.PI * 25 * 25
  const socketRadius = 10
  const semicircleArea = (Math.PI * socketRadius * socketRadius) / 2
  const semicircleX = (-4 * socketRadius) / (3 * Math.PI)
  const rectangleArea = 2 * socketRadius * a
  const rectangleX = a / 2
  const cutArea = semicircleArea + rectangleArea
  const qy = config.moments.qy
  const qx = config.moments.qx
  const xC = config.centroid.x
  const yC = config.centroid.y
  const removed = config.removedCentroid ?? { x: 0, y: 0 }
  const pappusVolume = (4 * Math.PI * socketRadius ** 3) / 3

  let resX = 0
  let resY = 0
  for (const part of config.parts) {
    const signed = part.negative ? -Math.abs(part.area) : part.area
    resX += signed * (part.x - xC)
    resY += signed * (part.y - yC)
  }

  const MATERIAL = '#dfe7ff'
  const CUT = '#b56b3a'
  const CUT_FILL = '#ffffff'
  const AXIS = '#9aa5b1'
  const MUTED = '#87929d'
  const OK = '#2f7d5b'
  const INK = '#17202a'
  const ACCENT = '#a970dd'
  const RESULT = '#ff6b45'

  const OX = 170
  const OY = 160
  const R = 120
  const S = R / 25
  const sx = (x: number) => OX + x * S
  const sy = (y: number) => OY - y * S

  const cutPath = `M ${sx(a)} ${sy(socketRadius)} L ${sx(0)} ${sy(socketRadius)} A ${socketRadius * S} ${socketRadius * S} 0 0 0 ${sx(0)} ${sy(-socketRadius)} L ${sx(a)} ${sy(-socketRadius)} Z`
  const rectanglePath = `M ${sx(0)} ${sy(socketRadius)} L ${sx(a)} ${sy(socketRadius)} L ${sx(a)} ${sy(-socketRadius)} L ${sx(0)} ${sy(-socketRadius)} Z`
  const semicirclePath = `M ${sx(0)} ${sy(socketRadius)} A ${socketRadius * S} ${socketRadius * S} 0 0 0 ${sx(0)} ${sy(-socketRadius)} Z`

  const leftCut = sx(-socketRadius)
  const rightCut = sx(a)
  const topCut = sy(socketRadius)
  const bottomCut = sy(-socketRadius)
  const radiusPoint = { x: OX - R * Math.SQRT1_2, y: OY - R * Math.SQRT1_2 }
  const cutCentroid = { x: sx(removed.x), y: sy(0) }
  const centroidPoint = { x: sx(xC), y: sy(yC) }

  const inset = { x: 316, y: 174, width: 138, height: 132 }
  const insetAxisY = 252
  const insetMin = -2.5
  const insetMax = 4
  const insetLeft = 326
  const insetRight = 446
  const insetX = (value: number) => insetLeft + ((value - insetMin) / (insetMax - insetMin)) * (insetRight - insetLeft)
  const insetCentroid = { x: insetX(xC), y: insetAxisY }
  const insetRemoved = { x: insetX(removed.x), y: insetAxisY }

  const status = [
    `Koło R = 25 mm; wycięcie: półkole R10 + prostokąt ${a} × 20 mm`,
    'Części: koło dodatnie; półkole i prostokąt ujemne',
    `A_k = ${pl(circleArea, 2)}; A_p = −${pl(semicircleArea, 2)}; A_r = −${pl(rectangleArea, 2)} mm²`,
    `Q_y = −A_w·x_w = ${pl(qy, 2)} mm³ — wycięcie po prawej`,
    'Q_x = 0 — symetria względem osi x ⇒ y_C = 0',
    `x_C = ${pl(xC, 3)} mm, y_C = 0 mm — C ≈ O`,
    'Wycięcie usuwa więcej materiału po prawej ⇒ C przesuwa się w lewo',
    `Kontrola: ΣA(x−x_C) = ${pl(resX, 3)}, ΣA(y−y_C) = ${pl(resY, 3)} mm³; Pappus OK`,
  ]

  function panelLines(index: number) {
    if (index === 2) {
      return [
        'Pola [mm²]',
        `A_k = ${pl(circleArea, 2)}`,
        `A_p = −${pl(semicircleArea, 2)}`,
        `A_r = −${pl(rectangleArea, 2)}`,
        `A_w = ${pl(cutArea, 2)}`,
        `A = ${pl(config.area, 2)}`,
      ]
    }
    if (index === 3) {
      return ['Moment względem y', `Q_y = ${pl(qy, 2)} mm³`, `x_w = ${pl(removed.x, 3)} mm`]
    }
    if (index === 4) {
      return ['Moment względem x', 'Q_x = 0', 'y_C = 0', 'oś x jest osią symetrii']
    }
    if (index === 5) {
      return ['Centroid figury', `x_C = ${pl(xC, 3)} mm`, 'y_C = 0 mm', 'C ≈ O']
    }
    if (index === 6) {
      return ['Interpretacja', 'x_C < 0, y_C = 0', 'przesunięcie w lewo', 'C w obszarze wycięcia']
    }
    if (index >= 7) {
      return [
        'Niezależna kontrola',
        `ΣA(x−x_C) = ${pl(resX, 3)}`,
        `ΣA(y−y_C) = ${pl(resY, 3)}`,
        `V = ${pl(pappusVolume, 2)} mm³`,
      ]
    }
    return []
  }
  const p = playing ? Math.min(1, Math.max(0, sceneProgress)) : 1
  const showParts = index >= 1
  const showQy = index >= 3
  const symmetry = index >= 4
  const showCentroid = index >= 5
  const showCheck = index >= 7
  const showPanel = index >= 2
  const lines = panelLines(index)

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg viewBox="0 0 460 340" role="img" aria-label="Centroid koła z wycięciem półkolisto-prostokątnym">
          <title>Koło R = 25 mm z wycięciem z półkola R10 i prostokąta a × 20</title>
          <desc>
            Koło o promieniu 25 mm z wycięciem symetrycznym względem osi x: półkole R10 po lewej i prostokąt {a} × 20 mm
            po prawej, pola, momenty, centroid i powiększenie przesunięcia.
          </desc>
          <defs>
            <mask id="e42-mask">
              <rect x="0" y="0" width="460" height="340" fill="black" />
              <circle cx={OX} cy={OY} r={R} fill="white" />
              <path d={cutPath} fill="black" />
            </mask>
          </defs>

          <circle cx={OX} cy={OY} r={R} fill={MATERIAL} mask="url(#${uid}-mask)" />
          <path d={cutPath} fill={CUT_FILL} stroke={CUT} strokeWidth="1.5" strokeLinejoin="round" />
          <motion.path
            d={semicirclePath}
            fill={ACCENT}
            stroke={ACCENT}
            strokeWidth="1.1"
            initial={false}
            animate={{ opacity: showParts ? 0.14 + 0.12 * p : 0 }}
            transition={{ duration: 0.25 }}
          />
          <motion.path
            d={rectanglePath}
            fill={CUT}
            stroke={CUT}
            strokeWidth="1.1"
            initial={false}
            animate={{ opacity: showParts ? 0.14 + 0.12 * p : 0 }}
            transition={{ duration: 0.25 }}
          />

          <line
            x1="44"
            y1={OY}
            x2="302"
            y2={OY}
            stroke={symmetry ? OK : AXIS}
            strokeWidth={symmetry ? 2 : 1.2}
            strokeDasharray="5 4"
          />
          <line x1={OX} y1="34" x2={OX} y2="292" stroke={AXIS} strokeWidth="1.2" strokeDasharray="5 4" />
          <line x1={OX} y1={OY} x2={radiusPoint.x} y2={radiusPoint.y} stroke={MUTED} strokeWidth="1" />
          <line x1={radiusPoint.x} y1={radiusPoint.y} x2="66" y2="50" stroke={MUTED} strokeWidth="1" />
          <line x1={leftCut} y1={OY} x2="106" y2="214" stroke={MUTED} strokeWidth="1" />

          <g stroke={MUTED} strokeWidth="1" fill="none">
            <line x1={sx(0)} y1={topCut - 18} x2={rightCut} y2={topCut - 18} />
            <line x1={sx(0)} y1={topCut - 22} x2={sx(0)} y2={topCut - 14} />
            <line x1={rightCut} y1={topCut - 22} x2={rightCut} y2={topCut - 14} />
            <line x1={rightCut + 16} y1={bottomCut} x2={rightCut + 16} y2={topCut} />
            <line x1={rightCut + 12} y1={bottomCut} x2={rightCut + 20} y2={bottomCut} />
            <line x1={rightCut + 12} y1={topCut} x2={rightCut + 20} y2={topCut} />
          </g>

          {showQy && (
            <>
              <line
                x1={OX}
                y1={cutCentroid.y}
                x2={cutCentroid.x}
                y2={cutCentroid.y}
                stroke={ACCENT}
                strokeWidth="1.2"
                strokeDasharray="4 3"
              />
              <circle cx={cutCentroid.x} cy={cutCentroid.y} r="4" fill={ACCENT} />
            </>
          )}
          {showCentroid && (
            <>
              <line
                x1={OX}
                y1={OY}
                x2={centroidPoint.x}
                y2={centroidPoint.y}
                stroke={RESULT}
                strokeWidth="1.2"
                strokeDasharray="4 3"
              />
              <circle
                cx={centroidPoint.x}
                cy={centroidPoint.y}
                r="5.5"
                fill="#fff"
                stroke={showCheck ? OK : RESULT}
                strokeWidth="2.2"
              />
              <line
                x1={centroidPoint.x - 10}
                y1={centroidPoint.y}
                x2={centroidPoint.x + 10}
                y2={centroidPoint.y}
                stroke={showCheck ? OK : RESULT}
                strokeWidth="1.2"
              />
              <line
                x1={centroidPoint.x}
                y1={centroidPoint.y - 10}
                x2={centroidPoint.x}
                y2={centroidPoint.y + 10}
                stroke={showCheck ? OK : RESULT}
                strokeWidth="1.2"
              />
            </>
          )}
          {showCentroid && (
            <motion.circle
              cx={centroidPoint.x}
              cy={centroidPoint.y}
              r="8"
              fill="none"
              stroke={showCheck ? OK : RESULT}
              strokeWidth="1.4"
              initial={false}
              animate={playing && p < 1 ? { r: [8, 14, 8], opacity: [0.5, 0, 0.5] } : { opacity: 0 }}
              transition={{ duration: 1.8, repeat: playing && p < 1 ? Infinity : 0, ease: 'easeInOut' }}
            />
          )}

          {showPanel && (
            <rect x="332" y="22" width="120" height="132" rx="9" fill="#f8fafc" stroke="#d7dde5" strokeWidth="1.1" />
          )}
          {showCheck && <circle cx="438" cy="140" r="7" fill="#eef7f1" stroke={OK} strokeWidth="1.4" />}

          {showCentroid && (
            <g>
              <rect
                x={inset.x}
                y={inset.y}
                width={inset.width}
                height={inset.height}
                rx="9"
                fill="#ffffff"
                stroke="#d7dde5"
                strokeWidth="1.1"
              />
              <line x1={insetLeft} y1={insetAxisY} x2={insetRight} y2={insetAxisY} stroke={AXIS} strokeWidth="1.1" />
              {[-2, -1, 0, 1, 2, 3, 4].map((tick) => (
                <g key={tick}>
                  <line
                    x1={insetX(tick)}
                    y1={insetAxisY - 4}
                    x2={insetX(tick)}
                    y2={insetAxisY + 4}
                    stroke={AXIS}
                    strokeWidth="1"
                  />
                  <text x={insetX(tick)} y={insetAxisY + 14} textAnchor="middle" fontSize="8" fill={MUTED}>
                    {tick < 0 ? `−${Math.abs(tick)}` : tick}
                  </text>
                </g>
              ))}
              <line x1={insetX(0)} y1={insetAxisY - 16} x2={insetX(0)} y2={insetAxisY} stroke={MUTED} strokeWidth="1" />
              <line
                x1={insetRemoved.x}
                y1={insetAxisY - 16}
                x2={insetRemoved.x}
                y2={insetAxisY}
                stroke={ACCENT}
                strokeWidth="1.1"
              />
              <circle cx={insetRemoved.x} cy={insetAxisY} r="3.2" fill={ACCENT} />
              <line
                x1={insetCentroid.x}
                y1={insetAxisY - 16}
                x2={insetCentroid.x}
                y2={insetAxisY}
                stroke={RESULT}
                strokeWidth="1.1"
              />
              <circle cx={insetCentroid.x} cy={insetAxisY} r="3.4" fill={RESULT} />
            </g>
          )}

          <g fontSize="12" fill={INK}>
            <text x="306" y="156">
              x
            </text>
            <text x={OX + 8} y="32">
              y
            </text>
            <text x={OX - 18} y={OY + 18}>
              O
            </text>
          </g>
          <text x="30" y="42" fontSize="9.5" fill={MUTED}>
            R = 25
          </text>
          <text x={(sx(0) + rightCut) / 2} y={topCut - 24} textAnchor="middle" fontSize="9.5" fill={MUTED}>
            a = {a}
          </text>
          <text x={rightCut + 24} y={(topCut + bottomCut) / 2 + 3} fontSize="9.5" fill={MUTED}>
            20
          </text>
          <text x="72" y="228" fontSize="9.5" fill={MUTED}>
            r = 10
          </text>
          {showQy && (
            <text x={cutCentroid.x + 6} y={cutCentroid.y - 8} fontSize="9.5" fill={ACCENT}>
              w
            </text>
          )}
          {showCentroid && (
            <text
              x={centroidPoint.x + 6}
              y={centroidPoint.y + 14}
              fontSize="9.5"
              fontWeight="700"
              fill={showCheck ? OK : RESULT}
            >
              C
            </text>
          )}
          {showCentroid && (
            <text x={inset.x + 8} y={inset.y + 16} fontSize="8" fill={MUTED}>
              powiększenie x [mm]
            </text>
          )}
          {showCentroid && (
            <text
              x={insetCentroid.x}
              y={insetAxisY - 22}
              textAnchor="middle"
              fontSize="8.5"
              fontWeight="700"
              fill={RESULT}
            >
              C
            </text>
          )}
          {showCentroid && (
            <text
              x={insetRemoved.x}
              y={insetAxisY - 22}
              textAnchor="middle"
              fontSize="8.5"
              fontWeight="700"
              fill={ACCENT}
            >
              w
            </text>
          )}
          {showCentroid && (
            <g fontSize="9" fontWeight="700" fill={RESULT}>
              <text x={inset.x + 8} y={inset.y + 106}>
                x_C = {pl(xC, 3)} mm
              </text>
              <text x={inset.x + 8} y={inset.y + 119}>
                y_C = 0 mm
              </text>
            </g>
          )}

          {showPanel &&
            lines.map((line, lineIndex) => (
              <text
                key={`${index}-${lineIndex}`}
                x="342"
                y={42 + lineIndex * 15}
                fontSize="9.5"
                fontWeight={lineIndex === 0 ? 700 : 500}
                fill={lineIndex === 0 ? INK : MUTED}
              >
                {line}
              </text>
            ))}
          {showCheck && (
            <text x="438" y="144" textAnchor="middle" fontSize="8.5" fontWeight="700" fill={OK}>
              OK
            </text>
          )}

          <text x="230" y="331" textAnchor="middle" fontSize="9.5" fill={INK}>
            {status[index]}
          </text>
        </svg>
      </div>
    </div>
  )
}

export function FigureFiveAltAnimation({
  config,
  index,
  playing,
  sceneProgress,
}: SolutionAnimationProps & { config: CentroidConfig }) {
  const uid = useId().replace(/[:]/g, '')
  const a = config.a
  const d = config.d ?? 10
  const base = a + 40
  const height = 2 * a + 25
  const stripWidth = 10
  const stripHeight = 25
  const stripArea = stripWidth * stripHeight
  const triangleArea = (base * height) / 2
  const holeRadius = d / 2
  const holeArea = Math.PI * holeRadius * holeRadius
  const qy = config.moments.qy
  const qx = config.moments.qx
  const xC = config.centroid.x
  const yC = config.centroid.y

  let resX = 0
  let resY = 0
  for (const part of config.parts) {
    const signed = part.negative ? -Math.abs(part.area) : part.area
    resX += signed * (part.x - xC)
    resY += signed * (part.y - yC)
  }

  const MATERIAL = '#dfe7ff'
  const CUT = '#b56b3a'
  const AXIS = '#9aa5b1'
  const MUTED = '#87929d'
  const OK = '#2f7d5b'
  const INK = '#17202a'
  const ACCENT = '#a970dd'
  const RESULT = '#ff6b45'
  const EDGE = '#68727e'
  const BASE_FILL = '#d9f0e2'

  const OX = 105
  const OY = 300
  const S = 5.5
  const sx = (x: number) => OX + x * S
  const sy = (y: number) => OY - y * S

  const trianglePath = `M ${sx(0)} ${sy(0)} L ${sx(base)} ${sy(0)} L ${sx(0)} ${sy(height)} Z`
  const strip = { x: sx(-stripWidth), y: sy(height), width: stripWidth * S, height: stripHeight * S }
  const stripTop = sy(height)
  const stripBottom = sy(height - stripHeight)
  const hole = { cx: sx(a), cy: sy(a), r: holeRadius * S }
  const centroidPoint = { x: sx(xC), y: sy(yC) }
  const removedPoint = { x: sx(a), y: sy(a) }

  const status = [
    `Listwa 10 × 25; trójkąt ${base} × ${height}; otwór d = ${d} w (${a}; ${a})`,
    'Części: listwa i trójkąt dodatnie, otwór ujemny',
    `A_L = ${pl(stripArea, 2)}; A_t = ${pl(triangleArea, 2)}; A_o = −${pl(holeArea, 2)}; A = ${pl(config.area, 2)} mm²`,
    `Q_y = ${pl(qy, 2)} mm³ — otwór po prawej zmniejsza moment`,
    `Q_x = ${pl(qx, 2)} mm³ — otwór nad osią x zmniejsza moment`,
    `x_C = ${pl(xC, 3)} mm, y_C = ${pl(yC, 3)} mm — C w trójkącie`,
    'Otwór leży poniżej i na lewo od C ⇒ usunięcie przesuwa C w prawo i w górę',
    `Kontrola: ΣA(x−x_C) = ${pl(resX, 3)}, ΣA(y−y_C) = ${pl(resY, 3)} mm³`,
  ]

  function panelLines(index: number) {
    if (index === 2) {
      return [
        'Pola [mm²]',
        `A_L = ${pl(stripArea, 2)}`,
        `A_t = ${pl(triangleArea, 2)}`,
        `A_o = −${pl(holeArea, 2)}`,
        `A = ${pl(config.area, 2)}`,
      ]
    }
    if (index === 3) {
      return ['Moment względem y', `Q_y = ${pl(qy, 2)} mm³`, `x_o = ${a} mm`]
    }
    if (index === 4) {
      return ['Moment względem x', `Q_x = ${pl(qx, 2)} mm³`, `y_o = ${a} mm`]
    }
    if (index === 5) {
      return ['Centroid figury', `x_C = ${pl(xC, 3)} mm`, `y_C = ${pl(yC, 3)} mm`]
    }
    if (index === 6) {
      return ['Interpretacja', 'x_C > 0, y_C > 0', 'C w trójkącie', 'otwór obniża i przesuwa w lewo']
    }
    if (index >= 7) {
      return [
        'Niezależna kontrola',
        `ΣA(x−x_C) = ${pl(resX, 3)}`,
        `ΣA(y−y_C) = ${pl(resY, 3)}`,
        `A·y_C = ${pl(qx, 2)} = Q_x`,
      ]
    }
    return []
  }
  const p = playing ? Math.min(1, Math.max(0, sceneProgress)) : 1
  const showParts = index >= 1
  const showQy = index >= 3
  const showQx = index >= 4
  const showCentroid = index >= 5
  const showCheck = index >= 7
  const showPanel = index >= 2
  const lines = panelLines(index)

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg viewBox="0 0 460 340" role="img" aria-label="Centroid listwy, trójkąta i kołowego otworu">
          <title>Listwa 10 × 25, trójkąt 50 × 45 i otwór d = 10</title>
          <desc>
            Pionowa listwa 10 × 25 mm po lewej stronie osi y, trójkąt prostokątny o podstawie 50 mm i wysokości 45 mm
            oraz kołowy otwór o średnicy 10 mm w punkcie (10; 10).
          </desc>
          <defs>
            <mask id="e51-mask">
              <rect x="0" y="0" width="460" height="340" fill="black" />
              <rect x={strip.x} y={strip.y} width={strip.width} height={strip.height} fill="white" />
              <path d={trianglePath} fill="white" />
              <circle cx={hole.cx} cy={hole.cy} r={hole.r} fill="black" />
            </mask>
          </defs>

          <g mask="url(#${uid}-mask)">
            <rect
              x={strip.x}
              y={strip.y}
              width={strip.width}
              height={strip.height}
              fill={MATERIAL}
              stroke={EDGE}
              strokeWidth="1.6"
            />
            <path d={trianglePath} fill={MATERIAL} stroke={EDGE} strokeWidth="1.6" strokeLinejoin="round" />
          </g>
          <motion.path
            d={trianglePath}
            fill={ACCENT}
            stroke={ACCENT}
            strokeWidth="1.1"
            initial={false}
            animate={{ opacity: showParts ? 0.08 + 0.08 * p : 0 }}
            transition={{ duration: 0.25 }}
          />
          <motion.rect
            x={strip.x}
            y={strip.y}
            width={strip.width}
            height={strip.height}
            fill={BASE_FILL}
            stroke={OK}
            strokeWidth="1.1"
            initial={false}
            animate={{ opacity: showParts ? 0.25 + 0.2 * p : 0 }}
            transition={{ duration: 0.25 }}
          />
          <circle cx={hole.cx} cy={hole.cy} r={hole.r} fill="#ffffff" stroke={CUT} strokeWidth="1.5" />
          <motion.circle
            cx={hole.cx}
            cy={hole.cy}
            r={hole.r}
            fill={CUT}
            initial={false}
            animate={{ opacity: showParts ? 0.1 + 0.1 * p : 0 }}
            transition={{ duration: 0.25 }}
          />

          <line x1="30" y1={OY} x2="400" y2={OY} stroke={AXIS} strokeWidth="1.2" strokeDasharray="5 4" />
          <line x1={OX} y1="30" x2={OX} y2="316" stroke={AXIS} strokeWidth="1.2" strokeDasharray="5 4" />

          <g stroke={MUTED} fill={MUTED} strokeWidth="1">
            <line x1={sx(0)} y1={OY + 18} x2={sx(base)} y2={OY + 18} />
            <line x1={sx(0)} y1={OY + 14} x2={sx(0)} y2={OY + 22} />
            <line x1={sx(base)} y1={OY + 14} x2={sx(base)} y2={OY + 22} />
            <line x1={sx(-stripWidth) - 14} y1={stripTop} x2={sx(-stripWidth) - 14} y2={stripBottom} />
            <line x1={sx(-stripWidth) - 18} y1={stripTop} x2={sx(-stripWidth) - 10} y2={stripTop} />
            <line x1={sx(-stripWidth) - 18} y1={stripBottom} x2={sx(-stripWidth) - 10} y2={stripBottom} />
          </g>

          {showQy && (
            <line
              x1={OX}
              y1={removedPoint.y}
              x2={removedPoint.x}
              y2={removedPoint.y}
              stroke={ACCENT}
              strokeWidth="1.2"
              strokeDasharray="4 3"
            />
          )}
          {showQx && (
            <line
              x1={removedPoint.x}
              y1={OY}
              x2={removedPoint.x}
              y2={removedPoint.y}
              stroke={ACCENT}
              strokeWidth="1.2"
              strokeDasharray="4 3"
            />
          )}
          {showQy && <circle cx={removedPoint.x} cy={removedPoint.y} r="4" fill={ACCENT} />}

          {showCentroid && (
            <>
              <line
                x1={OX}
                y1={centroidPoint.y}
                x2={centroidPoint.x}
                y2={centroidPoint.y}
                stroke={RESULT}
                strokeWidth="1.2"
                strokeDasharray="4 3"
              />
              <line
                x1={centroidPoint.x}
                y1={OY}
                x2={centroidPoint.x}
                y2={centroidPoint.y}
                stroke={RESULT}
                strokeWidth="1.2"
                strokeDasharray="4 3"
              />
              <circle
                cx={centroidPoint.x}
                cy={centroidPoint.y}
                r="6"
                fill="#fff"
                stroke={showCheck ? OK : RESULT}
                strokeWidth="2.2"
              />
              <line
                x1={centroidPoint.x - 10}
                y1={centroidPoint.y}
                x2={centroidPoint.x + 10}
                y2={centroidPoint.y}
                stroke={showCheck ? OK : RESULT}
                strokeWidth="1.2"
              />
              <line
                x1={centroidPoint.x}
                y1={centroidPoint.y - 10}
                x2={centroidPoint.x}
                y2={centroidPoint.y + 10}
                stroke={showCheck ? OK : RESULT}
                strokeWidth="1.2"
              />
              <motion.circle
                cx={centroidPoint.x}
                cy={centroidPoint.y}
                r="8"
                fill="none"
                stroke={showCheck ? OK : RESULT}
                strokeWidth="1.4"
                initial={false}
                animate={playing && p < 1 ? { r: [8, 14, 8], opacity: [0.5, 0, 0.5] } : { opacity: 0 }}
                transition={{ duration: 1.8, repeat: playing && p < 1 ? Infinity : 0, ease: 'easeInOut' }}
              />
            </>
          )}

          {showPanel && (
            <rect x="326" y="18" width="126" height="104" rx="9" fill="#f8fafc" stroke="#d7dde5" strokeWidth="1.1" />
          )}
          {showCheck && <circle cx="440" cy="108" r="7" fill="#eef7f1" stroke={OK} strokeWidth="1.4" />}

          <g fontSize="12" fill={INK}>
            <text x="404" y="304">
              x
            </text>
            <text x={OX + 8} y="28">
              y
            </text>
            <text x="86" y="316">
              O
            </text>
          </g>
          <text x="50" y="40" fontSize="9.5" fill={MUTED}>
            10 × 25
          </text>
          <text x="112" y="46" fontSize="9.5" fill={MUTED}>
            h = 2a+25 = {height}
          </text>
          <text x={(sx(0) + sx(base)) / 2} y={OY + 14} textAnchor="middle" fontSize="9.5" fill={MUTED}>
            a+40 = {base}
          </text>
          <text x="218" y="212" fontSize="9.5" fill={MUTED}>
            d = {d}
          </text>
          {showQy && (
            <text x={removedPoint.x + 8} y={removedPoint.y - 7} fontSize="9.5" fill={ACCENT}>
              w
            </text>
          )}
          {showCentroid && (
            <text
              x={centroidPoint.x + 10}
              y={centroidPoint.y - 10}
              fontSize="10.5"
              fontWeight="700"
              fill={showCheck ? OK : RESULT}
            >
              C = ({pl(xC, 3)}; {pl(yC, 3)}) mm
            </text>
          )}

          {showPanel &&
            lines.map((line, lineIndex) => (
              <text
                key={`${index}-${lineIndex}`}
                x="334"
                y={36 + lineIndex * 15}
                fontSize="9.5"
                fontWeight={lineIndex === 0 ? 700 : 500}
                fill={lineIndex === 0 ? INK : MUTED}
              >
                {line}
              </text>
            ))}
          {showCheck && (
            <text x="440" y="112" textAnchor="middle" fontSize="8.5" fontWeight="700" fill={OK}>
              OK
            </text>
          )}

          <text x="230" y="333" textAnchor="middle" fontSize="9.5" fill={INK}>
            {status[index]}
          </text>
        </svg>
      </div>
    </div>
  )
}

export function FigureFiveAnimation({
  config,
  index,
  playing,
  sceneProgress,
}: SolutionAnimationProps & { config: CentroidConfig }) {
  const uid = useId().replace(/[:]/g, '')
  const a = config.a
  const d = config.d ?? 10
  const base = a + 40
  const height = 2 * a + 25
  const stripArea = 10 * 25
  const triangleArea = (base * height) / 2
  const holeArea = Math.PI * (d / 2) ** 2
  const qy = config.moments.qy
  const qx = config.moments.qx
  const xC = config.centroid.x
  const yC = config.centroid.y

  let resX = 0
  let resY = 0
  for (const part of config.parts) {
    const signed = part.negative ? -Math.abs(part.area) : part.area
    resX += signed * (part.x - xC)
    resY += signed * (part.y - yC)
  }

  const MATERIAL = '#dfe7ff'
  const STRIP_FILL = '#ece0fb'
  const CUT = '#b56b3a'
  const AXIS = '#9aa5b1'
  const MUTED = '#687586'
  const OK = '#2f7d5b'
  const INK = '#17202a'
  const ACCENT = '#8b5cc7'
  const RESULT = '#ff6b45'
  const EDGE = '#68727e'

  const LEFT = 20
  const RIGHT = 342
  const TOP = 30
  const BOTTOM = 292
  const scale = Math.min((RIGHT - LEFT) / (base + 10), (BOTTOM - TOP) / height)
  const drawW = (base + 10) * scale
  const originX = LEFT + (RIGHT - LEFT - drawW) / 2 + 10 * scale
  const originY = BOTTOM
  const sx = (x: number) => originX + x * scale
  const sy = (y: number) => originY - y * scale

  const stripCenter = { x: -5, y: height - 12.5 }
  const triangleCenter = { x: base / 3, y: height / 3 }
  const holeCenter = { x: a, y: a }
  const holeRadius = (d / 2) * scale
  const holeDiagonal = holeRadius / Math.SQRT2
  const holeP1 = { x: sx(a) - holeDiagonal, y: sy(a) + holeDiagonal }
  const holeP2 = { x: sx(a) + holeDiagonal, y: sy(a) - holeDiagonal }
  const centroidPoint = { x: sx(xC), y: sy(yC) }
  const triangleLabel = { x: sx(base * 0.62), y: sy(height * 0.16) }
  const triangleBadge = { x: sx(base * 0.35), y: sy(height * 0.15) }
  const areaOne = { x: sx(-5), y: sy(height - 20) }
  const areaThree = { x: sx(a) - holeRadius - 6, y: sy(a) + 3 }

  const status = [
    `Listwa 10 × 25, trójkąt ${base} × ${height} mm, otwór R = ${pl(d / 2)} mm w (${pl(a)}; ${pl(a)})`,
    'Części: 1 listwa i 2 trójkąt dodatnie, 3 otwór ujemny',
    `Pola: ${pl(stripArea)} + ${pl(triangleArea)} − ${pl(holeArea)} = ${pl(config.area)} mm²`,
    `Q_y = ${pl(qy)} mm³ — listwa po lewej daje udział ujemny`,
    `Q_x = ${pl(qx)} mm³ — otwór leży nisko, więc obniża moment`,
    `x_C = ${pl(xC)} mm, y_C = ${pl(yC)} mm — centroid w trójkącie`,
    'x_C > 0, y_C > 0; otwór obniża figurę, dominuje trójkąt',
    `Kontrola: ΣA(x−x_C) = ${pl(resX)}, ΣA(y−y_C) = ${pl(resY)} mm³`,
  ]

  function panelLines(index: number) {
    if (index === 0) {
      return ['Model', `a = ${pl(a)} mm`, `d = ${pl(d)} mm`, `podstawa ${pl(base)} mm`, `wysokość ${pl(height)} mm`]
    }
    if (index === 1) {
      return [
        'Części',
        `1 listwa +${pl(stripArea)}`,
        `2 trójkąt +${pl(triangleArea)}`,
        `3 otwór −${pl(holeArea)}`,
        `A = ${pl(config.area)} mm²`,
      ]
    }
    if (index === 2) {
      return [
        'Pola [mm²]',
        `A1 = ${pl(stripArea)}`,
        `A2 = ${pl(triangleArea)}`,
        `A3 = −${pl(holeArea)}`,
        `A = ${pl(config.area)}`,
      ]
    }
    if (index === 3) {
      return ['Moment względem y', `Q_y = A1·(−5)`, `+ A2·${pl(base / 3)}`, `+ A3·${pl(a)}`, `Q_y = ${pl(qy)} mm³`]
    }
    if (index === 4) {
      return [
        'Moment względem x',
        `Q_x = A1·${pl(height - 12.5)}`,
        `+ A2·${pl(height / 3)}`,
        `+ A3·${pl(a)}`,
        `Q_x = ${pl(qx)} mm³`,
      ]
    }
    if (index === 5) {
      return ['Centroid', 'x_C = Q_y / A', `x_C = ${pl(xC)} mm`, `y_C = ${pl(yC)} mm`, `A = ${pl(config.area)} mm²`]
    }
    if (index === 6) {
      return ['Interpretacja', 'x_C > 0, y_C > 0', 'otwór ↓ obniża', 'trójkąt dominuje', 'C w materiale']
    }
    return [
      'Kontrola',
      `ΣA(x−x_C) = ${pl(resX)}`,
      `ΣA(y−y_C) = ${pl(resY)}`,
      `A·x_C = ${pl(qy, 0)} = Q_y`,
      `A·y_C = ${pl(qx, 0)} = Q_x`,
    ]
  }
  const p = playing ? Math.min(1, Math.max(0, sceneProgress)) : 1
  const showParts = index >= 1 && index <= 2
  const showAreas = index === 2
  const showQy = index === 3 || index === 4
  const showQx = index === 4
  const showCentroid = index >= 5
  const showCheck = index >= 7
  const lines = panelLines(index)
  const centroidColor = showCheck ? OK : RESULT

  const trianglePath = `M ${sx(0)} ${sy(0)} L ${sx(base)} ${sy(0)} L ${sx(0)} ${sy(height)} Z`
  const stripRect = { x: sx(-10), y: sy(height), width: 10 * scale, height: 25 * scale }

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg viewBox="0 0 460 340" role="img" aria-label="Centroid listwy, trójkąta i otworu kołowego">
          <title>Figura 5 — listwa, trójkąt i otwór</title>
          <desc>
            Pionowa listwa 10 × 25 mm po lewej stronie osi y, trójkąt prostokątny o podstawie a + 40 i wysokości 2a +
            25, kołowy otwór o średnicy d, pola, momenty i centroid.
          </desc>
          <path d={trianglePath} fill={MATERIAL} stroke={EDGE} strokeWidth="1.7" strokeLinejoin="round" />
          <rect {...stripRect} fill={STRIP_FILL} stroke={ACCENT} strokeWidth="1.7" />
          <circle
            cx={sx(a)}
            cy={sy(a)}
            r={holeRadius}
            fill="#ffffff"
            stroke={CUT}
            strokeWidth="1.7"
            strokeDasharray="5 4"
          />

          <line
            x1={sx(-18)}
            y1={sy(0)}
            x2={sx(base) + 8}
            y2={sy(0)}
            stroke={AXIS}
            strokeWidth="1.2"
            strokeDasharray="5 4"
          />
          <line
            x1={sx(0)}
            y1={sy(-12)}
            x2={sx(0)}
            y2={sy(height) + 12}
            stroke={AXIS}
            strokeWidth="1.2"
            strokeDasharray="5 4"
          />

          <g stroke={MUTED} strokeWidth="1" fill="none">
            <line x1={sx(-10) - 14} y1={sy(0)} x2={sx(-10) - 14} y2={sy(height)} />
            <line x1={sx(-10) - 18} y1={sy(0)} x2={sx(-10) - 10} y2={sy(0)} />
            <line x1={sx(-10) - 18} y1={sy(a)} x2={sx(-10) - 10} y2={sy(a)} />
            <line x1={sx(-10) - 18} y1={sy(2 * a)} x2={sx(-10) - 10} y2={sy(2 * a)} />
            <line x1={sx(-10) - 18} y1={sy(height)} x2={sx(-10) - 10} y2={sy(height)} />

            <line x1={sx(-10)} y1={sy(height) - 12} x2={sx(0)} y2={sy(height) - 12} />
            <line x1={sx(-10)} y1={sy(height) - 16} x2={sx(-10)} y2={sy(height) - 8} />
            <line x1={sx(0)} y1={sy(height) - 16} x2={sx(0)} y2={sy(height) - 8} />

            <line x1={sx(0)} y1={sy(0) + 16} x2={sx(a)} y2={sy(0) + 16} />
            <line x1={sx(0)} y1={sy(0) + 12} x2={sx(0)} y2={sy(0) + 20} />
            <line x1={sx(a)} y1={sy(0) + 12} x2={sx(a)} y2={sy(0) + 20} />
            <line x1={sx(a)} y1={sy(0) + 16} x2={sx(base)} y2={sy(0) + 16} />
            <line x1={sx(base)} y1={sy(0) + 12} x2={sx(base)} y2={sy(0) + 20} />

            <line x1={holeP1.x} y1={holeP1.y} x2={holeP2.x} y2={holeP2.y} />
            <line x1={holeP1.x - 3} y1={holeP1.y - 3} x2={holeP1.x + 3} y2={holeP1.y + 3} />
            <line x1={holeP2.x - 3} y1={holeP2.y - 3} x2={holeP2.x + 3} y2={holeP2.y + 3} />
          </g>

          {showParts && (
            <motion.circle
              cx={sx(a)}
              cy={sy(a)}
              r={holeRadius + 5}
              fill="none"
              stroke={ACCENT}
              strokeWidth="1.6"
              strokeDasharray="5 4"
              initial={false}
              animate={{ opacity: 0.35 + 0.45 * p, strokeDashoffset: playing ? [0, 18] : 0 }}
              transition={{
                opacity: { duration: 0.25 },
                strokeDashoffset: { duration: 1.6, repeat: playing ? Infinity : 0, ease: 'linear' },
              }}
            />
          )}

          {showQy && (
            <g stroke={ACCENT} strokeWidth="1.2" strokeDasharray="4 3" opacity="0.8">
              <line x1={sx(0)} y1={sy(stripCenter.y)} x2={sx(stripCenter.x)} y2={sy(stripCenter.y)} />
              <line x1={sx(0)} y1={sy(triangleCenter.y)} x2={sx(triangleCenter.x)} y2={sy(triangleCenter.y)} />
            </g>
          )}
          {showQy && (
            <line
              x1={sx(0)}
              y1={sy(holeCenter.y)}
              x2={sx(holeCenter.x)}
              y2={sy(holeCenter.y)}
              stroke={CUT}
              strokeWidth="1.2"
              strokeDasharray="4 3"
              opacity="0.8"
            />
          )}
          {showQx && (
            <g stroke={RESULT} strokeWidth="1.2" strokeDasharray="4 3" opacity="0.75">
              <line x1={sx(stripCenter.x)} y1={sy(0)} x2={sx(stripCenter.x)} y2={sy(stripCenter.y)} />
              <line x1={sx(triangleCenter.x)} y1={sy(0)} x2={sx(triangleCenter.x)} y2={sy(triangleCenter.y)} />
              <line x1={sx(holeCenter.x)} y1={sy(0)} x2={sx(holeCenter.x)} y2={sy(holeCenter.y)} />
            </g>
          )}

          {showCentroid && (
            <g>
              <line
                x1={centroidPoint.x}
                y1={sy(0)}
                x2={centroidPoint.x}
                y2={centroidPoint.y}
                stroke={centroidColor}
                strokeWidth="1.2"
                strokeDasharray="5 4"
              />
              <line
                x1={sx(0)}
                y1={centroidPoint.y}
                x2={centroidPoint.x}
                y2={centroidPoint.y}
                stroke={centroidColor}
                strokeWidth="1.2"
                strokeDasharray="5 4"
              />
              <circle
                cx={centroidPoint.x}
                cy={centroidPoint.y}
                r="5.6"
                fill="#ffffff"
                stroke={centroidColor}
                strokeWidth="2.2"
              />
              <line
                x1={centroidPoint.x - 10}
                y1={centroidPoint.y}
                x2={centroidPoint.x + 10}
                y2={centroidPoint.y}
                stroke={centroidColor}
                strokeWidth="1.3"
              />
              <line
                x1={centroidPoint.x}
                y1={centroidPoint.y - 10}
                x2={centroidPoint.x}
                y2={centroidPoint.y + 10}
                stroke={centroidColor}
                strokeWidth="1.3"
              />
            </g>
          )}

          {showCentroid && (
            <motion.circle
              cx={centroidPoint.x}
              cy={centroidPoint.y}
              r="8"
              fill="none"
              stroke={centroidColor}
              strokeWidth="1.3"
              initial={false}
              animate={playing && p < 1 ? { r: [8, 13, 8], opacity: [0.5, 0, 0.5] } : { opacity: 0 }}
              transition={{ duration: 1.9, repeat: playing && p < 1 ? Infinity : 0, ease: 'easeInOut' }}
            />
          )}

          {showParts && (
            <g>
              <circle cx={sx(stripCenter.x)} cy={sy(stripCenter.y)} r="7.2" fill={ACCENT} />
              <circle cx={triangleBadge.x} cy={triangleBadge.y} r="7.2" fill={EDGE} />
              <circle cx={sx(holeCenter.x)} cy={sy(holeCenter.y) + 12} r="7.2" fill={CUT} />
            </g>
          )}

          <rect x="350" y="24" width="110" height="132" rx="9" fill="#f8fafc" stroke="#d7dde5" strokeWidth="1.1" />

          <g>
            <g fontSize="11" fill={INK}>
              <text x={sx(base) + 11} y={sy(0) - 5}>
                x
              </text>
              <text x={sx(0) + 7} y={sy(height) + 20}>
                y
              </text>
              <text x={sx(0) - 19} y={sy(0) + 16}>
                O
              </text>
            </g>

            <text x={sx(-5)} y={sy(height) + 14} textAnchor="middle" fill={MUTED} fontSize="9">
              10
            </text>

            {showAreas && (
              <g fill={MUTED} fontSize="9" textAnchor="middle">
                <text x={areaOne.x} y={areaOne.y}>
                  A1 = {pl(stripArea)}
                </text>
                <text x={triangleLabel.x} y={triangleLabel.y}>
                  A2 = {pl(triangleArea)}
                </text>
                <text x={areaThree.x} y={areaThree.y} textAnchor="end">
                  A3 = −{pl(holeArea)}
                </text>
              </g>
            )}

            <g fill={MUTED} fontSize="9" textAnchor="end">
              <text x={sx(-10) - 22} y={sy(height - 12.5) + 3}>
                25
              </text>
            </g>
            <g fill={MUTED} fontSize="9">
              <text x={sx(-10) - 8} y={sy(1.5 * a) + 3}>
                a = {pl(a)}
              </text>
              <text x={sx(-10) - 8} y={sy(a / 2) + 3}>
                a = {pl(a)}
              </text>
            </g>

            <g fill={MUTED} fontSize="9" textAnchor="middle">
              <text x={sx(a / 2)} y={sy(0) + 26}>
                a = {pl(a)}
              </text>
              <text x={sx((a + base) / 2)} y={sy(0) + 26}>
                40
              </text>
            </g>

            <text x={holeP1.x - 7} y={holeP1.y + 5} fontSize="9.5" fill={CUT} textAnchor="end">
              d = {pl(d)}
            </text>

            {showParts && (
              <g fill="#ffffff" fontSize="9" fontWeight="700" textAnchor="middle">
                <text x={sx(stripCenter.x)} y={sy(stripCenter.y) + 3}>
                  1
                </text>
                <text x={triangleBadge.x} y={triangleBadge.y + 3}>
                  2
                </text>
                <text x={sx(holeCenter.x)} y={sy(holeCenter.y) + 15}>
                  3
                </text>
              </g>
            )}

            {showCentroid && (
              <text
                x={centroidPoint.x + 10}
                y={centroidPoint.y + 17}
                fontSize="10"
                fontWeight="700"
                fill={centroidColor}
              >
                C = ({pl(xC)}; {pl(yC)}) mm
              </text>
            )}

            {lines.map((line, lineIndex) => (
              <text
                key={`${index}-${lineIndex}`}
                x="358"
                y={40 + lineIndex * 15}
                fontSize="9.0"
                fontWeight={lineIndex === 0 ? 700 : 500}
                fill={lineIndex === 0 ? INK : MUTED}
              >
                {line}
              </text>
            ))}

            <text x="230" y="330" textAnchor="middle" fontSize="9.0" fill={INK}>
              {status[index]}
            </text>
          </g>
        </svg>
      </div>
    </div>
  )
}

export function FigureSixAnimation({
  config,
  index,
  playing,
  sceneProgress,
}: SolutionAnimationProps & { config: CentroidConfig }) {
  const uid = useId().replace(/[:]/g, '')
  const a = config.a
  const d = config.d ?? 10
  const base = 5 * a
  const height = 3 * a
  const triangleBase = 5 * a - 2 * d
  const triangleArea = (triangleBase * height) / 2
  const rectangleArea = 2 * d * height
  const semicircleArea = (Math.PI * d * d) / 2
  const centerX = 5 * a - d
  const qy = config.moments.qy
  const qx = config.moments.qx
  const xC = config.centroid.x
  const yC = config.centroid.y
  const pappus = config.pappus
  const pappusVolume = pappus ? 2 * Math.PI * pappus.area * pappus.distance : (4 * Math.PI * d ** 3) / 3

  let resX = 0
  let resY = 0
  for (const part of config.parts) {
    const signed = part.negative ? -Math.abs(part.area) : part.area
    resX += signed * (part.x - xC)
    resY += signed * (part.y - yC)
  }

  const MATERIAL = '#dfe7ff'
  const RECT_FILL = '#e4ecff'
  const SEMI_FILL = '#d9f0e2'
  const AXIS = '#9aa5b1'
  const MUTED = '#687586'
  const OK = '#2f7d5b'
  const INK = '#17202a'
  const ACCENT = '#4f6df5'
  const RESULT = '#ff6b45'
  const EDGE = '#68727e'

  const LEFT = 20
  const RIGHT = 342
  const TOP = 30
  const BOTTOM = 292
  const scale = Math.min((RIGHT - LEFT) / base, (BOTTOM - TOP) / (height + d))
  const drawW = base * scale
  const originX = LEFT + (RIGHT - LEFT - drawW) / 2
  const originY = BOTTOM
  const sx = (x: number) => originX + x * scale
  const sy = (y: number) => originY - y * scale
  const arcRadius = d * scale

  const triangleCenter = { x: triangleBase / 3, y: height / 3 }
  const rectangleCenter = { x: centerX, y: height / 2 }
  const semicircleCenter = { x: centerX, y: height + (4 * d) / (3 * Math.PI) }
  const centroidPoint = { x: sx(xC), y: sy(yC) }

  const triangleLabel = { x: sx(triangleBase * 0.55), y: sy(height * 0.18) }
  const rectangleLabel = { x: sx(centerX), y: sy(height * 0.25) }
  const semicircleLabel = { x: sx(centerX), y: sy(height + d) - 8 }
  const triangleBadge = { x: sx(triangleBase * 0.35), y: sy(height * 0.15) }
  const rectangleBadge = { x: sx(centerX), y: sy(height * 0.6) }
  const semicircleBadge = { x: sx(centerX), y: sy(height + 0.5 * d) }

  const status = [
    `Podstawa 5a = ${pl(base)} mm, wysokość 3a = ${pl(height)} mm, półkole R = ${pl(d)} mm`,
    'Części: 1 trójkąt, 2 prostokąt i 3 półkole — wszystkie dodatnie',
    `Pola: ${pl(triangleArea)} + ${pl(rectangleArea)} + ${pl(semicircleArea)} = ${pl(config.area)} mm²`,
    `Q_y = ${pl(qy)} mm³ — największy wkład mają prostokąt i półkole`,
    `Q_x = ${pl(qx)} mm³ — półkole wnosi duży moment nad osią x`,
    `x_C = ${pl(xC)} mm, y_C = ${pl(yC)} mm — centroid w materiale`,
    'x_C > 0, y_C > 0; półkole podnosi centroid w prawo i w górę',
    `Kontrola: ΣA(x−x_C) = ${pl(resX)}, ΣA(y−y_C) = ${pl(resY)}; Pappus = ${pl(pappusVolume, 0)} mm³`,
  ]

  function panelLines(index: number) {
    if (index === 0) {
      return [
        'Model',
        `5a = ${pl(base)} mm`,
        `3a = ${pl(height)} mm`,
        `R = d = ${pl(d)} mm`,
        `środek (${pl(centerX)}; ${pl(height)})`,
      ]
    }
    if (index === 1) {
      return [
        'Części',
        `1 trójkąt +${pl(triangleArea)}`,
        `2 prostokąt +${pl(rectangleArea)}`,
        `3 półkole +${pl(semicircleArea)}`,
        'wszystkie dodatnie',
      ]
    }
    if (index === 2) {
      return [
        'Pola [mm²]',
        `A1 = ${pl(triangleArea)}`,
        `A2 = ${pl(rectangleArea)}`,
        `A3 = ${pl(semicircleArea)}`,
        `A = ${pl(config.area)}`,
      ]
    }
    if (index === 3) {
      return [
        'Moment względem y',
        `Q_y = A1·${pl(triangleBase / 3)}`,
        `+ A2·${pl(centerX)}`,
        `+ A3·${pl(centerX)}`,
        `Q_y = ${pl(qy)} mm³`,
      ]
    }
    if (index === 4) {
      return [
        'Moment względem x',
        `Q_x = A1·${pl(height / 3)}`,
        `+ A2·${pl(height / 2)}`,
        `+ A3·${pl(height + (4 * d) / (3 * Math.PI))}`,
        `Q_x = ${pl(qx)} mm³`,
      ]
    }
    if (index === 5) {
      return ['Centroid', 'x_C = Q_y / A', `x_C = ${pl(xC)} mm`, `y_C = ${pl(yC)} mm`, `A = ${pl(config.area)} mm²`]
    }
    if (index === 6) {
      return ['Interpretacja', 'x_C > 0, y_C > 0', 'półkole ↑ podnosi', 'C w materiale', 'poniżej łuku']
    }
    return ['Kontrola', `ΣA(x−x_C) = ${pl(resX)}`, `ΣA(y−y_C) = ${pl(resY)}`, 'A·x_C = Q_y', 'V_Pappus = V_kuli']
  }
  const p = playing ? Math.min(1, Math.max(0, sceneProgress)) : 1
  const showParts = index >= 1 && index <= 2
  const showAreas = index === 2
  const showQy = index === 3 || index === 4
  const showQx = index === 4
  const showCentroid = index >= 5
  const showCheck = index >= 7
  const lines = panelLines(index)
  const centroidColor = showCheck ? OK : RESULT

  const trianglePath = `M ${sx(0)} ${sy(0)} L ${sx(triangleBase)} ${sy(0)} L ${sx(triangleBase)} ${sy(height)} Z`
  const arcPath = `M ${sx(triangleBase)} ${sy(height)} A ${arcRadius} ${arcRadius} 0 0 1 ${sx(base)} ${sy(height)} Z`

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg viewBox="0 0 460 340" role="img" aria-label="Centroid figury z trójkątem, prostokątem i półkolem">
          <title>Figura 6 — trójkąt, prostokąt i półkole</title>
          <desc>
            Figura o podstawie 5a i wysokości 3a: trójkąt prostokątny, prostokąt pod półkolem o promieniu d oraz półkole
            na górze. Pola, momenty, centroid i kontrola Pappusa.
          </desc>

          <path d={trianglePath} fill={MATERIAL} stroke={EDGE} strokeWidth="1.7" strokeLinejoin="round" />
          <rect
            x={sx(triangleBase)}
            y={sy(height)}
            width={(base - triangleBase) * scale}
            height={height * scale}
            fill={RECT_FILL}
            stroke={EDGE}
            strokeWidth="1.7"
          />
          <path d={arcPath} fill={SEMI_FILL} stroke={EDGE} strokeWidth="1.7" strokeLinejoin="round" />

          <line
            x1={sx(-12)}
            y1={sy(0)}
            x2={sx(base) + 4}
            y2={sy(0)}
            stroke={AXIS}
            strokeWidth="1.2"
            strokeDasharray="5 4"
          />
          <line
            x1={sx(0)}
            y1={sy(-10)}
            x2={sx(0)}
            y2={sy(height + d) + 8}
            stroke={AXIS}
            strokeWidth="1.2"
            strokeDasharray="5 4"
          />

          <g stroke={MUTED} strokeWidth="1" fill="none">
            <line x1={sx(0)} y1={sy(0) + 16} x2={sx(base)} y2={sy(0) + 16} />
            <line x1={sx(0)} y1={sy(0) + 12} x2={sx(0)} y2={sy(0) + 20} />
            <line x1={sx(base)} y1={sy(0) + 12} x2={sx(base)} y2={sy(0) + 20} />

            <line x1={sx(base) - 10} y1={sy(0)} x2={sx(base) - 10} y2={sy(height)} />
            <line x1={sx(base) - 14} y1={sy(0)} x2={sx(base) - 6} y2={sy(0)} />
            <line x1={sx(base) - 14} y1={sy(height)} x2={sx(base) - 6} y2={sy(height)} />

            <line x1={sx(centerX)} y1={sy(height)} x2={sx(base)} y2={sy(height)} />
            <line x1={sx(centerX)} y1={sy(height) - 4} x2={sx(centerX)} y2={sy(height) + 4} />
            <line x1={sx(base)} y1={sy(height) - 4} x2={sx(base)} y2={sy(height) + 4} />
          </g>

          {showQy && (
            <g stroke={ACCENT} strokeWidth="1.2" strokeDasharray="4 3" opacity="0.8">
              <line x1={sx(0)} y1={sy(triangleCenter.y)} x2={sx(triangleCenter.x)} y2={sy(triangleCenter.y)} />
              <line x1={sx(0)} y1={sy(rectangleCenter.y)} x2={sx(rectangleCenter.x)} y2={sy(rectangleCenter.y)} />
              <line x1={sx(0)} y1={sy(semicircleCenter.y)} x2={sx(semicircleCenter.x)} y2={sy(semicircleCenter.y)} />
            </g>
          )}
          {showQx && (
            <g stroke={RESULT} strokeWidth="1.2" strokeDasharray="4 3" opacity="0.75">
              <line x1={sx(triangleCenter.x)} y1={sy(0)} x2={sx(triangleCenter.x)} y2={sy(triangleCenter.y)} />
              <line x1={sx(rectangleCenter.x)} y1={sy(0)} x2={sx(rectangleCenter.x)} y2={sy(rectangleCenter.y)} />
              <line x1={sx(semicircleCenter.x)} y1={sy(0)} x2={sx(semicircleCenter.x)} y2={sy(semicircleCenter.y)} />
            </g>
          )}

          {showCentroid && (
            <g>
              <line
                x1={centroidPoint.x}
                y1={sy(0)}
                x2={centroidPoint.x}
                y2={centroidPoint.y}
                stroke={centroidColor}
                strokeWidth="1.2"
                strokeDasharray="5 4"
              />
              <line
                x1={sx(0)}
                y1={centroidPoint.y}
                x2={centroidPoint.x}
                y2={centroidPoint.y}
                stroke={centroidColor}
                strokeWidth="1.2"
                strokeDasharray="5 4"
              />
              <circle
                cx={centroidPoint.x}
                cy={centroidPoint.y}
                r="5.6"
                fill="#ffffff"
                stroke={centroidColor}
                strokeWidth="2.2"
              />
              <line
                x1={centroidPoint.x - 10}
                y1={centroidPoint.y}
                x2={centroidPoint.x + 10}
                y2={centroidPoint.y}
                stroke={centroidColor}
                strokeWidth="1.3"
              />
              <line
                x1={centroidPoint.x}
                y1={centroidPoint.y - 10}
                x2={centroidPoint.x}
                y2={centroidPoint.y + 10}
                stroke={centroidColor}
                strokeWidth="1.3"
              />
            </g>
          )}

          {showCentroid && (
            <motion.circle
              cx={centroidPoint.x}
              cy={centroidPoint.y}
              r="8"
              fill="none"
              stroke={centroidColor}
              strokeWidth="1.3"
              initial={false}
              animate={playing && p < 1 ? { r: [8, 13, 8], opacity: [0.5, 0, 0.5] } : { opacity: 0 }}
              transition={{ duration: 1.9, repeat: playing && p < 1 ? Infinity : 0, ease: 'easeInOut' }}
            />
          )}

          {showParts && (
            <g>
              <circle cx={triangleBadge.x} cy={triangleBadge.y} r="7.2" fill={EDGE} />
              <circle cx={rectangleBadge.x} cy={rectangleBadge.y} r="7.2" fill={ACCENT} />
              <circle cx={semicircleBadge.x} cy={semicircleBadge.y} r="7.2" fill={OK} />
            </g>
          )}

          <rect x="350" y="24" width="110" height="132" rx="9" fill="#f8fafc" stroke="#d7dde5" strokeWidth="1.1" />

          <g>
            <g fontSize="11" fill={INK}>
              <text x={sx(base) + 2} y={sy(0) - 5}>
                x
              </text>
              <text x={sx(0) + 7} y={sy(height + d) - 6}>
                y
              </text>
              <text x={sx(0) - 17} y={sy(0) + 15}>
                O
              </text>
            </g>

            <g fill={MUTED} fontSize="9" textAnchor="middle">
              <text x={sx(base / 2)} y={sy(0) + 26}>
                5a = {pl(base)}
              </text>
              <text x={sx(triangleBase / 2)} y={sy(0) - 6}>
                5a−2d = {pl(triangleBase)}
              </text>
              <text x={sx(centerX)} y={sy(0) - 6}>
                2d = {pl(2 * d)}
              </text>
            </g>

            <text x={sx(base) - 14} y={sy(height / 2) + 3} textAnchor="end" fontSize="9" fill={MUTED}>
              3a = {pl(height)}
            </text>

            <text x={(sx(centerX) + sx(base)) / 2} y={sy(height) - 6} textAnchor="middle" fontSize="9" fill={MUTED}>
              d = {pl(d)}
            </text>

            {showAreas && (
              <g fill={MUTED} fontSize="9" textAnchor="middle">
                <text x={triangleLabel.x} y={triangleLabel.y}>
                  A1 = {pl(triangleArea)}
                </text>
                <text x={rectangleLabel.x} y={rectangleLabel.y}>
                  A2 = {pl(rectangleArea)}
                </text>
                <text x={semicircleLabel.x} y={semicircleLabel.y}>
                  A3 = {pl(semicircleArea)}
                </text>
              </g>
            )}

            {showParts && (
              <g fill="#ffffff" fontSize="9" fontWeight="700" textAnchor="middle">
                <text x={triangleBadge.x} y={triangleBadge.y + 3}>
                  1
                </text>
                <text x={rectangleBadge.x} y={rectangleBadge.y + 3}>
                  2
                </text>
                <text x={semicircleBadge.x} y={semicircleBadge.y + 3}>
                  3
                </text>
              </g>
            )}

            {showCentroid && (
              <text
                x={centroidPoint.x + 10}
                y={centroidPoint.y + 30}
                fontSize="10"
                fontWeight="700"
                fill={centroidColor}
              >
                C = ({pl(xC)}; {pl(yC)}) mm
              </text>
            )}

            {lines.map((line, lineIndex) => (
              <text
                key={`${index}-${lineIndex}`}
                x="358"
                y={40 + lineIndex * 15}
                fontSize="9.0"
                fontWeight={lineIndex === 0 ? 700 : 500}
                fill={lineIndex === 0 ? INK : MUTED}
              >
                {line}
              </text>
            ))}

            <text x="230" y="330" textAnchor="middle" fontSize="9.0" fill={INK}>
              {status[index]}
            </text>
          </g>
        </svg>
      </div>
    </div>
  )
}

export function FigureSixAltAnimation({
  config,
  index,
  playing,
  sceneProgress,
}: SolutionAnimationProps & { config: CentroidConfig }) {
  const uid = useId().replace(/[:]/g, '')
  const INK = '#17202a'
  const MUTED = '#87929d'
  const AXIS = '#9aa5b1'
  const EDGE = '#68727e'
  const ACCENT = '#4f6df5'
  const TRI_FILL = '#dfe7ff'
  const RECT_FILL = '#d9f0e2'
  const SEMI_FILL = '#ece0fb'
  const TRI_EDGE = '#4f6df5'
  const RECT_EDGE = '#2f7d5b'
  const SEMI_EDGE = '#8b5cc7'
  const RESULT = '#ff6b45'
  const OK = '#2f7d5b'

  const S = 4.4
  const OX = 65
  const OY = 268
  const sx = (x: number) => OX + x * S
  const sy = (y: number) => OY - y * S
  const id = useId().replace(/[:]/g, '')
  const a = config.a
  const d = config.d ?? 0
  const base = 5 * a - 2 * d
  const height = 3 * a
  const semiCenter = 5 * a - d
  const [triangle, rectangle, semicircle] = config.parts
  const centroid = config.centroid
  const centroidPoint = { x: sx(centroid.x), y: sy(centroid.y) }
  const showParts = index >= 1
  const showAreas = index >= 2
  const showArms = index >= 3
  const showCentroid = index >= 6
  const showCheck = index >= 7
  const progress = playing ? Math.min(1, Math.max(0, sceneProgress)) : 1
  const pappus = (4 * Math.PI * d ** 3) / 3
  const semiArc = `M ${sx(base)} ${sy(height)} A ${d * S} ${d * S} 0 0 1 ${sx(5 * a)} ${sy(height)} Z`

  const status =
    [
      `Figura 6: podstawa 5a = ${pl(5 * a)} mm, wysokość 3a = ${pl(height)} mm, półkole R = d = ${pl(d)} mm`,
      `Podział: 1 trójkąt (5a−2d = ${pl(base)} mm), 2 prostokąt 2d × 3a, 3 półkole R = d`,
      `Pola: A₁ = ${pl(triangle.area)} + A₂ = ${pl(rectangle.area)} + A₃ = ${pl(semicircle.area)} = ${pl(config.area)} mm²`,
      `Momenty: Q_y = ${pl(config.moments.qy)} mm³, Q_x = ${pl(config.moments.qx)} mm³`,
      `x_C = Q_y / A = ${pl(config.moments.qy)} / ${pl(config.area)} = ${pl(centroid.x)} mm`,
      `y_C = Q_x / A = ${pl(config.moments.qx)} / ${pl(config.area)} = ${pl(centroid.y)} mm`,
      `C = (${pl(centroid.x)}; ${pl(centroid.y)}) mm — centroid leży w trójkącie`,
      `Kontrola: Pappus V = 4πd³/3 = ${pl(pappus)} mm³ oraz ΣA_i(r_i − r_C) ≈ 0`,
    ][index] ?? ''

  const partDots = [
    { x: triangle.x, y: triangle.y, color: TRI_EDGE },
    { x: rectangle.x, y: rectangle.y, color: RECT_EDGE },
    { x: semicircle.x, y: semicircle.y, color: SEMI_EDGE },
  ]

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg viewBox="0 0 460 340" role="img" aria-label="Centroid figury 6 — trójkąt, prostokąt i półkole">
          <title>Figura 6 — trójkąt, prostokąt i półkole z centroidem</title>
          <desc>
            Trójkąt o podstawie 5a − 2d i wysokości 3a, prostokąt 2d × 3a oraz półkole o promieniu d na górnej krawędzi;
            wymiary, pola części, momenty statyczne i centroid.
          </desc>

          <polygon
            points={`${sx(0)},${sy(0)} ${sx(base)},${sy(0)} ${sx(base)},${sy(height)}`}
            fill={TRI_FILL}
            stroke={TRI_EDGE}
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
          <rect
            x={sx(base)}
            y={sy(height)}
            width={2 * d * S}
            height={height * S}
            fill={RECT_FILL}
            stroke={RECT_EDGE}
            strokeWidth="1.7"
          />
          <path d={semiArc} fill={SEMI_FILL} stroke={SEMI_EDGE} strokeWidth="1.7" strokeLinejoin="round" />

          <line x1={32} y1={OY} x2={424} y2={OY} stroke={AXIS} strokeWidth="1.2" strokeDasharray="5 4" />
          <line x1={OX} y1={OY + 40} x2={OX} y2={16} stroke={AXIS} strokeWidth="1.2" strokeDasharray="5 4" />

          <g stroke={MUTED} fill={MUTED} strokeWidth="1">
            <line x1={48} y1={sy(0)} x2={48} y2={sy(height)} />
            <line x1={44} y1={sy(0)} x2={52} y2={sy(0)} />
            <line x1={44} y1={sy(height)} x2={52} y2={sy(height)} />
            <line x1={OX} y1={sy(0)} x2={52} y2={sy(0)} />
            <line x1={OX} y1={sy(height)} x2={52} y2={sy(height)} />

            <line x1={sx(0)} y1={282} x2={sx(base)} y2={282} />
            <line x1={sx(0)} y1={278} x2={sx(0)} y2={286} />
            <line x1={sx(base)} y1={278} x2={sx(base)} y2={286} />

            <line x1={sx(base)} y1={282} x2={sx(5 * a)} y2={282} />
            <line x1={sx(5 * a)} y1={278} x2={sx(5 * a)} y2={286} />

            <line x1={sx(0)} y1={300} x2={sx(5 * a)} y2={300} />
            <line x1={sx(0)} y1={296} x2={sx(0)} y2={304} />
            <line x1={sx(5 * a)} y1={296} x2={sx(5 * a)} y2={304} />

            <line x1={sx(semiCenter)} y1={sy(height)} x2={sx(5 * a)} y2={sy(height)} strokeDasharray="4 3" />
          </g>

          {showParts && (
            <g>
              {partDots.map((point, dotIndex) => (
                <motion.circle
                  key={`dot-${dotIndex}`}
                  cx={sx(point.x)}
                  cy={sy(point.y)}
                  r="7"
                  fill={point.color}
                  initial={false}
                  animate={{ opacity: 1, scale: playing && progress < 1 ? [0.8, 1.12, 1] : 1 }}
                  transition={{ duration: 0.8, repeat: playing && progress < 1 ? Infinity : 0, delay: dotIndex * 0.15 }}
                  style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                />
              ))}
            </g>
          )}

          {showArms && (
            <g stroke={RESULT} strokeWidth="1.3" strokeDasharray="5 4" opacity="0.85">
              <line x1={sx(0)} y1={centroidPoint.y} x2={centroidPoint.x} y2={centroidPoint.y} />
              <line x1={centroidPoint.x} y1={centroidPoint.y} x2={centroidPoint.x} y2={sy(0)} />
            </g>
          )}

          {showCentroid && (
            <motion.g initial={false} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>
              <line
                x1={centroidPoint.x - 13}
                y1={centroidPoint.y}
                x2={centroidPoint.x + 13}
                y2={centroidPoint.y}
                stroke={showCheck ? OK : RESULT}
                strokeWidth="1.6"
              />
              <line
                x1={centroidPoint.x}
                y1={centroidPoint.y - 13}
                x2={centroidPoint.x}
                y2={centroidPoint.y + 13}
                stroke={showCheck ? OK : RESULT}
                strokeWidth="1.6"
              />
              <circle
                cx={centroidPoint.x}
                cy={centroidPoint.y}
                r="6"
                fill="#ffffff"
                stroke={showCheck ? OK : RESULT}
                strokeWidth="2.4"
              />
            </motion.g>
          )}

          {showCentroid && (
            <motion.circle
              cx={centroidPoint.x}
              cy={centroidPoint.y}
              r="8"
              fill="none"
              stroke={showCheck ? OK : RESULT}
              strokeWidth="1.4"
              initial={false}
              animate={playing && progress < 1 ? { r: [8, 15, 8], opacity: [0.6, 0, 0.6] } : { opacity: 0 }}
              transition={{ duration: 1.8, repeat: playing && progress < 1 ? Infinity : 0, ease: 'easeInOut' }}
            />
          )}

          <g fontSize="11" fill={INK}>
            <text x={412} y={263}>
              x
            </text>
            <text x={72} y={50}>
              y
            </text>
            <text x={50} y={282}>
              O
            </text>
          </g>

          <g fill={MUTED} fontSize="9.5">
            <text x={44} y={173} textAnchor="end">
              3a = {pl(height)}
            </text>
            <text x={sx(base / 2)} y={278} textAnchor="middle">
              5a − 2d = {pl(base)}
            </text>
            <text x={sx(base + d)} y={278} textAnchor="middle">
              2d = {pl(2 * d)}
            </text>
            <text x={sx(2.5 * a)} y={296} textAnchor="middle">
              5a = {pl(5 * a)}
            </text>
            <text x={sx(semiCenter + d / 2)} y={sy(height) - 34} textAnchor="middle" fill={SEMI_EDGE}>
              d = {pl(d)}
            </text>
          </g>

          {showParts && (
            <g fill="#ffffff" fontSize="9" fontWeight="700" textAnchor="middle">
              <text x={sx(triangle.x)} y={sy(triangle.y) + 3.2}>
                1
              </text>
              <text x={sx(rectangle.x)} y={sy(rectangle.y) + 3.2}>
                2
              </text>
              <text x={sx(semicircle.x)} y={sy(semicircle.y) + 3.2}>
                3
              </text>
            </g>
          )}

          {showAreas && (
            <g fontSize="9" fontWeight="600" textAnchor="middle">
              <text x={sx(triangle.x)} y={sy(triangle.y) + 20} fill={TRI_EDGE}>
                A₁ = {pl(triangle.area)}
              </text>
              <text x={sx(rectangle.x)} y={sy(rectangle.y) + 20} fill={RECT_EDGE}>
                A₂ = {pl(rectangle.area)}
              </text>
              <text x={sx(semicircle.x)} y={sy(semicircle.y) + 49} fill={SEMI_EDGE}>
                A₃ = {pl(semicircle.area)}
              </text>
            </g>
          )}

          {showArms && (
            <g fontSize="10" fontWeight="600" fill={RESULT}>
              <text x={150} y={172}>
                {index >= 4 ? `x_C = ${pl(centroid.x)} mm` : 'x_C'}
              </text>
              <text x={248} y={228}>
                {index >= 5 ? `y_C = ${pl(centroid.y)} mm` : 'y_C'}
              </text>
            </g>
          )}

          {index >= 3 && index < 6 && (
            <g fontSize="9" fill={ACCENT} fontWeight="600">
              <text x={12} y={20}>
                Q_y = A · x_C
              </text>
              <text x={12} y={34}>
                Q_x = A · y_C
              </text>
            </g>
          )}

          {showCentroid && (
            <text
              x={centroidPoint.x + 10}
              y={centroidPoint.y + 30}
              fontSize="10.5"
              fontWeight="700"
              fill={showCheck ? OK : RESULT}
            >
              {index >= 6 ? `C = (${pl(centroid.x)}; ${pl(centroid.y)}) mm` : 'C'}
            </text>
          )}

          {showCheck && (
            <g fontSize="9" fill={OK} fontWeight="600">
              <text x={12} y={66}>
                Pappus: V = 4πd³/3 = {pl(pappus)} mm³
              </text>
              <text x={12} y={80}>
                ΣA_i(r_i − r_C) ≈ 0
              </text>
            </g>
          )}

          <text x="230" y="328" textAnchor="middle" fontSize="9.3" fill={INK}>
            {status}
          </text>
        </svg>
      </div>
    </div>
  )
}
