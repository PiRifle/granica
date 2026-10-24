import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const BLUE = '#4f6df5'
const ORANGE = '#ff6b45'
const VIOLET = '#a970dd'
const GREEN = '#2e9e6b'
const RED = '#d84f28'
const MUTED = '#87929d'
const EDGE = '#68727e'
const INK = '#17202a'
const FILL = '#eef3fa'

const M = 800
const T = 600
const K = 117.5
const M_EQ = 953.9
const D_MIN = 43.6
const D = 45
const SIGMA = 89.4
const TAU = 33.5
const SIGMA_RED = 106.6

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}
const mix = (from: number, to: number, t: number) => from + (to - from) * t
const pl = (value: number, digits = 1) => value.toFixed(digits).replace('.', ',')

function Arrow({
  x1,
  y1,
  x2,
  y2,
  color,
  width = 1.6,
}: {
  x1: number
  y1: number
  x2: number
  y2: number
  color: string
  width?: number
}) {
  const angle = Math.atan2(y2 - y1, x2 - x1)
  const length = Math.hypot(x2 - x1, y2 - y1)
  if (length < 0.8) return null
  const head = Math.min(7, length * 0.35)
  const wing = Math.min(3.6, length * 0.2)
  const baseX = x2 - head * Math.cos(angle)
  const baseY = y2 - head * Math.sin(angle)
  return (
    <g stroke={color} fill={color}>
      <line x1={x1} y1={y1} x2={baseX} y2={baseY} strokeWidth={width} strokeLinecap="round" />
      <polygon
        points={`${x2},${y2} ${baseX - wing * Math.sin(angle)},${baseY + wing * Math.cos(angle)} ${baseX + wing * Math.sin(angle)},${baseY - wing * Math.cos(angle)}`}
        stroke="none"
      />
    </g>
  )
}

function Shaft({ cy = 139, height = 62 }: { cy?: number; height?: number }) {
  const left = 54
  const right = 406
  return (
    <g>
      <rect
        x={left}
        y={cy - height / 2}
        width={right - left}
        height={height}
        fill="#e9eef7"
        stroke={EDGE}
        strokeWidth={1.6}
      />
      <ellipse cx={right} cy={cy} rx={9} ry={height / 2} fill="#dfe6f2" stroke={EDGE} strokeWidth={1.4} />
      <ellipse cx={left} cy={cy} rx={9} ry={height / 2} fill="#f5f7fc" stroke={EDGE} strokeWidth={1.4} />
      <line x1={left + 8} y1={cy} x2={right} y2={cy} stroke={MUTED} strokeWidth={0.8} strokeDasharray="5 5" />
    </g>
  )
}

function Heading({ extra }: { extra?: string }) {
  return (
    <g fontSize={9} fill={MUTED}>
      <text x={14} y={20}>
        wał pełny · M = {M} N·m · T = {T} N·m
      </text>
      <text x={14} y={34}>
        R_e = 235 MPa · n = 2 · k = 117,5 MPa
      </text>
      {extra && (
        <text x={14} y={48} fill={INK} fontWeight={600}>
          {extra}
        </text>
      )}
    </g>
  )
}

function CrossSection({ cx, cy, r, tauScale, p }: { cx: number; cy: number; r: number; tauScale: number; p: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={FILL} stroke={EDGE} strokeWidth={1.8} />
      <line x1={cx - r - 12} y1={cy} x2={cx + r + 12} y2={cy} stroke={INK} strokeWidth={1} strokeDasharray="6 5" />
      <line x1={cx} y1={cy - r - 12} x2={cx} y2={cy + r + 12} stroke={INK} strokeWidth={1} strokeDasharray="6 5" />
      {Array.from({ length: 12 }, (_, index) => {
        const angle = (index * Math.PI) / 6
        const x = cx + Math.cos(angle) * r
        const y = cy + Math.sin(angle) * r
        const tangent = angle + Math.PI / 2
        const length = tauScale * p
        return (
          <Arrow
            key={index}
            x1={x}
            y1={y}
            x2={x + Math.cos(tangent) * length}
            y2={y + Math.sin(tangent) * length}
            color={VIOLET}
            width={1.4}
          />
        )
      })}
      <circle cx={cx} cy={cy} r={2.6} fill={INK} />
    </g>
  )
}

export function DesignReviewExam1Animation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'loads'
  const p = playing ? smooth(sceneProgress) : 1
  const isLoads = metric === 'loads'
  const isStress = metric === 'stress'
  const isCriterion = metric === 'criterion'
  const isDesign = metric === 'design'
  const isCheck = metric === 'check'
  const isSafety = metric === 'safety'

  const sigmaScale = 0.72
  const dNow = isDesign ? mix(D_MIN, D, p) : D
  const radius = (dNow / 2) * 2.1
  const requiredRadius = (D_MIN / 2) * 2.1

  const ox = 75
  const oy = 235
  const sx = 1.7
  const sy = 2
  const boundaryPoints = Array.from({ length: 41 }, (_, index) => {
    const sigma = (index / 40) * K
    const tau = Math.sqrt(Math.max(0, (K * K - sigma * sigma) / 3))
    return `${index === 0 ? 'M' : 'L'} ${ox + sigma * sx} ${oy - tau * sy}`
  })
  const boundary = boundaryPoints.join(' ')
  const safeArea = `${boundary} L ${ox} ${oy} Z`

  const px = ox + SIGMA * sx
  const py = oy - TAU * sy

  const levels = [86, 107.3, 128.7, 150, 171.3, 192.7, 214]
  const normalAt = (y: number) => (SIGMA * (150 - y)) / 64

  const checkUtil = (SIGMA_RED / K) * 100
  const safetyX = 240
  const safetyWidth = 190
  const safetyMax = 3
  const requiredSafetyX = safetyX + (2 / safetyMax) * safetyWidth
  const actualSafetyX = safetyX + (2.2 / safetyMax) * safetyWidth

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 300"
          role="img"
          aria-label="Wał pełny pod zginaniem i skręcaniem. Animacja prowadzi od obciążeń przez rozkład naprężeń i kryterium HMH do doboru średnicy 45 mm oraz kontroli naprężenia i zapasu."
        >
          <defs>
            <marker
              id="dre1-orange"
              viewBox="0 0 10 10"
              refX={8}
              refY={5}
              markerWidth={5}
              markerHeight={5}
              orient="auto"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={ORANGE} />
            </marker>
            <marker
              id="dre1-violet"
              viewBox="0 0 10 10"
              refX={8}
              refY={5}
              markerWidth={5}
              markerHeight={5}
              orient="auto"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={VIOLET} />
            </marker>
            <marker
              id="dre1-green"
              viewBox="0 0 10 10"
              refX={8}
              refY={5}
              markerWidth={5}
              markerHeight={5}
              orient="auto"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={GREEN} />
            </marker>
          </defs>

          {isLoads && (
            <g>
              <Heading />
              <Shaft />
              <motion.path
                d="M 160 84 C 190 52, 270 52, 300 84"
                fill="none"
                stroke={ORANGE}
                strokeWidth={2.4}
                strokeLinecap="round"
                markerEnd="url(#dre1-orange)"
                initial={{ pathLength: 0, opacity: 0.2 }}
                animate={{ pathLength: p, opacity: 1 }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <text x={230} y={48} textAnchor="middle" fontSize={10} fontWeight={600} fill={ORANGE}>
                M = 800 N·m
              </text>
              <text x={230} y={62} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                moment zginający
              </text>

              <motion.ellipse
                cx={230}
                cy={139}
                rx={124}
                ry={44}
                fill="none"
                stroke={VIOLET}
                strokeWidth={2.2}
                strokeDasharray="7 5"
                initial={{ opacity: 0.2 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              />
              <motion.path
                d="M 344 120 A 46 44 0 0 1 350 158"
                fill="none"
                stroke={VIOLET}
                strokeWidth={2.2}
                strokeLinecap="round"
                markerEnd="url(#dre1-violet)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: p }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <text x={230} y={202} textAnchor="middle" fontSize={10} fontWeight={600} fill={VIOLET}>
                T = 600 N·m
              </text>
              <text x={230} y={216} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                moment skręcający
              </text>

              <line x1={54} y1={234} x2={406} y2={234} stroke={MUTED} strokeWidth={1} strokeDasharray="4 4" />
              <line x1={54} y1={228} x2={54} y2={240} stroke={MUTED} strokeWidth={1} />
              <line x1={406} y1={228} x2={406} y2={240} stroke={MUTED} strokeWidth={1} />
              <text x={230} y={252} textAnchor="middle" fontSize={9} fill={MUTED}>
                d = ? — średnica nie jest jeszcze znana
              </text>
              <text x={230} y={278} textAnchor="middle" fontSize={9} fill={MUTED}>
                oba obciążenia działają jednocześnie, więc nie dodajemy M i T wprost
              </text>
            </g>
          )}

          {isStress && (
            <g>
              <Heading extra="naprężenia w skrajnym włóknie przekroju" />
              <CrossSection cx={120} cy={150} r={58} tauScale={20} p={p} />
              <text x={120} y={92} textAnchor="middle" fontSize={9} fill={MUTED}>
                punkt A na obwodzie
              </text>
              <text x={120} y={228} textAnchor="middle" fontSize={9.5} fontWeight={600} fill={VIOLET}>
                τ = T/W_o = 33,5 MPa
              </text>
              <text x={120} y={244} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                naprężenie styczne rośnie liniowo od środka
              </text>

              <line x1={320} y1={238} x2={320} y2={78} stroke="#c9d0d9" strokeWidth={1} />
              <line x1={320} y1={150} x2={430} y2={150} stroke="#c9d0d9" strokeWidth={1} />
              <text x={320} y={254} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                0
              </text>
              <text x={430} y={154} fontSize={9} fill={MUTED}>
                σ
              </text>
              <text x={310} y={80} textAnchor="end" fontSize={8.5} fill={BLUE}>
                rozciąganie
              </text>
              <text x={310} y={224} textAnchor="end" fontSize={8.5} fill={RED}>
                ściskanie
              </text>

              {levels.map((y) => {
                const value = normalAt(y)
                const tip = 320 + value * sigmaScale * p
                return <Arrow key={y} x1={320} y1={y} x2={tip} y2={y} color={value >= 0 ? BLUE : RED} width={1.5} />
              })}
              <motion.line
                x1={320 + SIGMA * sigmaScale * p}
                y1={86}
                x2={320 - SIGMA * sigmaScale * p}
                y2={214}
                stroke={INK}
                strokeWidth={1.8}
                initial={false}
                animate={{
                  x1: 320 + SIGMA * sigmaScale * p,
                  x2: 320 - SIGMA * sigmaScale * p,
                }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <text x={320 + SIGMA * sigmaScale} y={72} textAnchor="middle" fontSize={9.5} fontWeight={600} fill={BLUE}>
                σ = 89,4 MPa
              </text>
              <text x={230} y={282} textAnchor="middle" fontSize={9} fill={MUTED}>
                σ = M/W oraz τ = T/W_o — oba naprężenia dotyczą tego samego punktu
              </text>
            </g>
          )}

          {isCriterion && (
            <g>
              <Heading extra="kryterium HMH: σ_red = √(σ² + 3τ²)" />
              <line x1={ox} y1={oy} x2={300} y2={oy} stroke={EDGE} strokeWidth={1.2} />
              <line x1={ox} y1={oy} x2={ox} y2={84} stroke={EDGE} strokeWidth={1.2} />
              <path d={`M 300 ${oy} L 292 ${oy - 4} L 292 ${oy + 4} Z`} fill={EDGE} />
              <path d={`M ${ox} 84 L ${ox - 4} 92 L ${ox + 4} 92 Z`} fill={EDGE} />
              <text x={304} y={oy + 4} fontSize={9} fill={MUTED}>
                σ
              </text>
              <text x={ox - 4} y={78} textAnchor="end" fontSize={9} fill={MUTED}>
                τ
              </text>

              {[0, 50, 100].map((value) => (
                <g key={value}>
                  <line
                    x1={ox + value * sx}
                    y1={oy - 4}
                    x2={ox + value * sx}
                    y2={oy + 4}
                    stroke={EDGE}
                    strokeWidth={1}
                  />
                  <text x={ox + value * sx} y={oy + 16} textAnchor="middle" fontSize={8} fill={MUTED}>
                    {value}
                  </text>
                </g>
              ))}
              {[0, 30, 60].map((value) => (
                <g key={value}>
                  <line
                    x1={ox - 4}
                    y1={oy - value * sy}
                    x2={ox + 4}
                    y2={oy - value * sy}
                    stroke={EDGE}
                    strokeWidth={1}
                  />
                  <text x={ox - 8} y={oy - value * sy + 3} textAnchor="end" fontSize={8} fill={MUTED}>
                    {value}
                  </text>
                </g>
              ))}

              <motion.path
                d={safeArea}
                fill={GREEN}
                fillOpacity={0.08 * p}
                stroke="none"
                initial={false}
                animate={{ opacity: p }}
                transition={{ duration: 0.2 }}
              />
              <motion.path
                d={boundary}
                fill="none"
                stroke={GREEN}
                strokeWidth={2.4}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: p }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <text x={ox + K * sx} y={oy - 8} textAnchor="middle" fontSize={9} fontWeight={600} fill={GREEN}>
                k = 117,5
              </text>
              <text x={ox + 4} y={oy - 67.8 * sy - 6} fontSize={8.5} fill={GREEN}>
                k/√3 = 67,8
              </text>

              <motion.g initial={{ opacity: 0 }} animate={{ opacity: p }} transition={{ duration: 0.2 }}>
                <line x1={px} y1={py} x2={px} y2={oy} stroke={ORANGE} strokeWidth={1} strokeDasharray="4 3" />
                <line x1={px} y1={py} x2={ox} y2={py} stroke={ORANGE} strokeWidth={1} strokeDasharray="4 3" />
                <circle cx={px} cy={py} r={4.5} fill={ORANGE} stroke="#fff" strokeWidth={1.2} />
                <text x={px + 8} y={py - 4} fontSize={9} fontWeight={600} fill={ORANGE}>
                  P (89,4; 33,5)
                </text>
                <text x={px + 8} y={py + 10} fontSize={8.5} fill={MUTED}>
                  σ_red = 106,6 MPa
                </text>
              </motion.g>

              <text x={230} y={282} textAnchor="middle" fontSize={9} fill={MUTED}>
                punkt leży wewnątrz elipsy, więc σ_red &lt; k
              </text>
            </g>
          )}

          {isDesign && (
            <g>
              <Heading extra="moment równoważny i dobór średnicy" />
              <text x={230} y={60} textAnchor="middle" fontSize={9.5} fontWeight={600} fill={ORANGE}>
                M_eq = {pl(M_EQ)} N·m
              </text>
              <motion.path
                d="M 120 86 C 150 62, 310 62, 340 86"
                fill="none"
                stroke={ORANGE}
                strokeWidth={2}
                strokeLinecap="round"
                markerEnd="url(#dre1-orange)"
                initial={false}
                animate={{ opacity: 1 }}
              />

              <motion.circle
                cx={140}
                cy={175}
                fill="#edf1ff"
                fillOpacity={0.85}
                stroke={GREEN}
                strokeWidth={1.8}
                initial={false}
                animate={{ r: radius }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <circle
                cx={140}
                cy={175}
                r={requiredRadius}
                fill="none"
                stroke={ORANGE}
                strokeWidth={1.4}
                strokeDasharray="5 4"
              />
              <line
                x1={140 - requiredRadius - 14}
                y1={175}
                x2={140 + requiredRadius + 14}
                y2={175}
                stroke={MUTED}
                strokeWidth={0.8}
                strokeDasharray="4 4"
              />
              <line
                x1={140}
                y1={175 - requiredRadius - 14}
                x2={140}
                y2={175 + requiredRadius + 14}
                stroke={MUTED}
                strokeWidth={0.8}
                strokeDasharray="4 4"
              />
              <text
                x={140}
                y={175 + requiredRadius + 28}
                textAnchor="middle"
                fontSize={9.5}
                fontWeight={600}
                fill={INK}
              >
                d = {pl(dNow)} mm
              </text>
              <text x={140} y={175 - requiredRadius - 20} textAnchor="middle" fontSize={8.5} fill={ORANGE}>
                wymagane 43,6 mm
              </text>

              <line x1={300} y1={250} x2={300} y2={100} stroke="#c9d0d9" strokeWidth={1} />
              {[40, 43.6, 45, 50].map((value) => {
                const y = 250 - (value - 40) * 15
                return (
                  <g key={value}>
                    <line x1={294} y1={y} x2={306} y2={y} stroke="#c9d0d9" strokeWidth={1} />
                    <text x={312} y={y + 3} fontSize={8} fill={MUTED}>
                      {pl(value)}
                    </text>
                  </g>
                )
              })}
              <line
                x1={282}
                y1={250 - (D_MIN - 40) * 15}
                x2={318}
                y2={250 - (D_MIN - 40) * 15}
                stroke={ORANGE}
                strokeWidth={1.3}
                strokeDasharray="4 3"
              />
              <line
                x1={282}
                y1={250 - (D - 40) * 15}
                x2={318}
                y2={250 - (D - 40) * 15}
                stroke={GREEN}
                strokeWidth={1.6}
              />
              <motion.circle
                cx={300}
                cy={250 - (dNow - 40) * 15}
                r={4.5}
                fill={GREEN}
                stroke="#fff"
                strokeWidth={1.2}
                initial={false}
                animate={{ cy: 250 - (dNow - 40) * 15 }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <text x={230} y={282} textAnchor="middle" fontSize={9} fill={MUTED}>
                przyjmujemy najmniejszy wymiar większy od 43,6 mm
              </text>
            </g>
          )}

          {isCheck && (
            <g>
              <Heading extra="kontrola dla przyjętej średnicy d = 45 mm" />
              <CrossSection cx={115} cy={160} r={52} tauScale={18} p={p} />
              <text x={115} y={88} textAnchor="middle" fontSize={9} fill={MUTED}>
                d = 45 mm
              </text>
              <text x={115} y={232} textAnchor="middle" fontSize={8.5} fill={VIOLET}>
                τ = 33,5 MPa
              </text>
              <text x={115} y={246} textAnchor="middle" fontSize={8.5} fill={BLUE}>
                σ = 89,4 MPa
              </text>

              <text x={240} y={96} fontSize={9} fontWeight={600} fill={INK}>
                wykorzystanie naprężenia dopuszczalnego
              </text>
              <rect x={240} y={108} width={190} height={18} rx={9} fill="#edf1f5" />
              <motion.rect
                x={240}
                y={108}
                height={18}
                rx={9}
                fill={GREEN}
                fillOpacity={0.32}
                stroke={GREEN}
                strokeWidth={1.2}
                initial={false}
                animate={{ width: 190 * (SIGMA_RED / K) * p }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <line x1={430} y1={102} x2={430} y2={132} stroke={ORANGE} strokeWidth={1.4} />
              <text x={430} y={96} textAnchor="end" fontSize={8} fill={ORANGE}>
                k = 117,5 MPa
              </text>
              <text x={240} y={152} fontSize={9.5} fontWeight={600} fill={GREEN}>
                σ_red = 106,6 MPa
              </text>
              <text x={240} y={168} fontSize={9} fill={MUTED}>
                η = {pl(checkUtil, 0)}% &lt; 100%
              </text>

              <text x={240} y={196} fontSize={8.5} fill={MUTED}>
                przekrój kołowy d = 45 mm
              </text>
              <text x={240} y={214} fontSize={8.5} fill={MUTED}>
                W_o = 2W dla przekroju kołowego
              </text>
              <text x={240} y={244} fontSize={9} fontWeight={600} fill={GREEN}>
                ✓ σ_red ≤ k
              </text>
              <text x={230} y={282} textAnchor="middle" fontSize={9} fill={MUTED}>
                warunek wytrzymałości jest spełniony po zaokrągleniu średnicy w górę
              </text>
            </g>
          )}

          {isSafety && (
            <g>
              <Heading extra="zapas rzeczywisty i decyzja" />
              <circle cx={105} cy={160} r={45} fill={FILL} stroke={GREEN} strokeWidth={1.8} />
              <line x1={55} y1={160} x2={155} y2={160} stroke={INK} strokeWidth={0.9} strokeDasharray="5 4" />
              <line x1={105} y1={110} x2={105} y2={210} stroke={INK} strokeWidth={0.9} strokeDasharray="5 4" />
              <text x={105} y={165} textAnchor="middle" fontSize={9} fontWeight={600} fill={INK}>
                d = 45
              </text>

              <text x={230} y={104} fontSize={9} fontWeight={600} fill={INK}>
                zapas względem R_e = 235 MPa
              </text>
              <line x1={safetyX} y1={170} x2={safetyX + safetyWidth} y2={170} stroke="#c9d0d9" strokeWidth={1.2} />
              {[0, 1, 2, 3].map((value) => {
                const x = safetyX + (value / safetyMax) * safetyWidth
                return (
                  <g key={value}>
                    <line x1={x} y1={166} x2={x} y2={174} stroke="#c9d0d9" strokeWidth={1} />
                    <text x={x} y={186} textAnchor="middle" fontSize={8} fill={MUTED}>
                      {value}
                    </text>
                  </g>
                )
              })}
              <motion.rect
                x={safetyX}
                y={142}
                height={16}
                rx={8}
                fill={GREEN}
                fillOpacity={0.28}
                stroke={GREEN}
                strokeWidth={1.2}
                initial={false}
                animate={{ width: (actualSafetyX - safetyX) * p }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <line
                x1={requiredSafetyX}
                y1={134}
                x2={requiredSafetyX}
                y2={172}
                stroke={ORANGE}
                strokeWidth={1.4}
                strokeDasharray="4 3"
              />
              <text x={requiredSafetyX - 4} y={128} textAnchor="end" fontSize={8} fill={ORANGE}>
                n = 2
              </text>
              <line x1={actualSafetyX} y1={134} x2={actualSafetyX} y2={172} stroke={GREEN} strokeWidth={1.6} />
              <text x={actualSafetyX + 4} y={128} textAnchor="start" fontSize={8} fontWeight={600} fill={GREEN}>
                2,20
              </text>

              <text x={230} y={214} fontSize={9.5} fontWeight={600} fill={GREEN}>
                n_rz = 2,20 &gt; 2
              </text>
              <text x={230} y={232} fontSize={8.5} fill={MUTED}>
                decyduje warunek wytrzymałości; średnica 45 mm jest poprawna
              </text>
              <text x={230} y={258} fontSize={9} fontWeight={600} fill={INK}>
                odpowiedź: d = 45 mm, σ_red ≈ 106,6 MPa
              </text>
              <text x={230} y={282} textAnchor="middle" fontSize={9} fill={MUTED}>
                kontrola wszystkich warunków zamyka zadanie projektowe
              </text>
            </g>
          )}
        </svg>
      </div>
    </div>
  )
}
