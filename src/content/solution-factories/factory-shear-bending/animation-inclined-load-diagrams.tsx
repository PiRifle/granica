import type { ComponentType } from 'react'
import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import type { InclinedLoadDiagramsInputs } from './factory'
import { local } from '../../../components/solution-figures/shared'

const BLUE = '#4f6df5'
const LOAD = '#ff6b45'
const GREEN = '#2f7d5b'
const RED = '#d84f28'
const VIOLET = '#a970dd'
const MUTED = '#87929d'
const EDGE = '#7d8fa5'
const INK = '#17202a'

const X0 = 60
const X1 = 410
const BEAM_Y = 100
const SPAN = X1 - X0
const LENGTH = 1.2
const ALPHA = Math.PI / 6
const FORCE_LEN = 50
const xAt = (metres: number) => X0 + (metres / LENGTH) * SPAN
const forceTailX = X1 + FORCE_LEN * Math.cos(ALPHA)
const forceTailY = BEAM_Y - FORCE_LEN * Math.sin(ALPHA)

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}
const ramp = (value: number, from: number, to: number) => clamp01((value - from) / (to - from))

function Header({ title, note }: { title: string; note: string }) {
  return (
    <g>
      <text x={14} y={18} fontSize={9.5} fontWeight={700} fill={INK}>
        {title}
      </text>
      <text x={446} y={18} textAnchor="end" fontSize={8.5} fill={MUTED}>
        wspornik · siła pod kątem α
      </text>
      <text x={14} y={31} fontSize={8.5} fill={MUTED}>
        {note}
      </text>
    </g>
  )
}

function Wall() {
  const hatches = Array.from({ length: 7 }, (_, index) => 64 + index * 12)
  return (
    <g>
      <line x1={X0} y1={64} x2={X0} y2={136} stroke={EDGE} strokeWidth={2.6} />
      {hatches.map((y) => (
        <line key={`hatch-${y}`} x1={X0} y1={y} x2={X0 - 10} y2={y + 10} stroke={EDGE} strokeWidth={1} />
      ))}
      {hatches.map((y) => (
        <line key={`hatch2-${y}`} x1={X0 - 8} y1={y + 2} x2={X0 - 14} y2={y + 8} stroke={EDGE} strokeWidth={1} />
      ))}
      <text x={X0 - 12} y={152} textAnchor="end" fontSize={9} fontWeight={700} fill={INK}>
        A
      </text>
    </g>
  )
}

function Beam({ opacity = 1, cutAt }: { opacity?: number; cutAt?: number }) {
  return (
    <g opacity={opacity}>
      <line x1={X0} y1={BEAM_Y} x2={X1} y2={BEAM_Y} stroke={EDGE} strokeWidth={4.5} strokeLinecap="round" />
      <text x={X1 - 4} y={BEAM_Y - 8} textAnchor="end" fontSize={9} fontWeight={700} fill={INK}>
        B
      </text>
      {cutAt != null && (
        <g>
          <line
            x1={cutAt}
            y1={BEAM_Y - 14}
            x2={cutAt}
            y2={BEAM_Y + 14}
            stroke={LOAD}
            strokeWidth={1}
            strokeDasharray="4 3"
          />
          <circle cx={cutAt} cy={BEAM_Y} r={2.8} fill={LOAD} />
        </g>
      )}
    </g>
  )
}

function AngleArc({ p }: { p: number }) {
  const radius = 42
  const draw = smooth(p)
  const points = Array.from({ length: 9 }, (_, index) => {
    const theta = Math.PI - (ALPHA * index) / 8
    return [X1 + radius * Math.cos(theta), BEAM_Y + radius * Math.sin(theta)] as const
  })
  const path = points.map(([x, y], index) => `${index === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`).join(' ')
  return (
    <g>
      <line x1={X1} y1={BEAM_Y} x2={X1 - 62} y2={BEAM_Y} stroke={MUTED} strokeWidth={1} strokeDasharray="5 4" />
      <motion.path
        d={path}
        fill="none"
        stroke={LOAD}
        strokeWidth={1.3}
        initial={false}
        animate={{ pathLength: draw }}
        transition={{ duration: 0.15, ease: 'linear' }}
      />
      <motion.g initial={false} animate={{ opacity: smooth(ramp(p, 0.35, 0.7)) }}>
        <text x={X1 - 38} y={BEAM_Y + 32} textAnchor="middle" fontSize={9} fontWeight={700} fill={LOAD}>
          α
        </text>
      </motion.g>
    </g>
  )
}

function Force({
  p,
  showComponents = false,
  showArc = true,
  opacity = 1,
}: {
  p: number
  showComponents?: boolean
  showArc?: boolean
  opacity?: number
}) {
  const draw = smooth(p)
  const comp = smooth(ramp(p, 0.15, 0.55))
  return (
    <g opacity={opacity}>
      {showArc && <AngleArc p={p} />}
      <line
        x1={forceTailX}
        y1={forceTailY}
        x2={forceTailX + (X1 - forceTailX) * draw}
        y2={forceTailY + (BEAM_Y - forceTailY) * draw}
        stroke={LOAD}
        strokeWidth={2.6}
        markerEnd={draw > 0.3 ? 'url(#w5ild-load)' : undefined}
      />
      <text x={forceTailX - 2} y={forceTailY - 24} textAnchor="end" fontSize={10} fontWeight={700} fill={LOAD}>
        P
      </text>
      {showComponents && (
        <g opacity={comp}>
          <line
            x1={forceTailX}
            y1={forceTailY}
            x2={forceTailX - FORCE_LEN * Math.cos(ALPHA)}
            y2={forceTailY}
            stroke={GREEN}
            strokeWidth={2}
            markerEnd="url(#w5ild-react)"
          />
          <line
            x1={forceTailX}
            y1={forceTailY}
            x2={forceTailX}
            y2={forceTailY + FORCE_LEN * Math.sin(ALPHA)}
            stroke={GREEN}
            strokeWidth={2}
            markerEnd="url(#w5ild-react)"
          />
          <line
            x1={forceTailX - FORCE_LEN * Math.cos(ALPHA)}
            y1={forceTailY}
            x2={X1}
            y2={BEAM_Y}
            stroke={MUTED}
            strokeWidth={1}
            strokeDasharray="4 3"
          />
          <line
            x1={forceTailX}
            y1={forceTailY + FORCE_LEN * Math.sin(ALPHA)}
            x2={X1}
            y2={BEAM_Y}
            stroke={MUTED}
            strokeWidth={1}
            strokeDasharray="4 3"
          />
          <text
            x={(forceTailX + X1) / 2}
            y={forceTailY - 6}
            textAnchor="middle"
            fontSize={8.5}
            fontWeight={700}
            fill={GREEN}
          >
            P cosα
          </text>
          <text x={forceTailX - 4} y={BEAM_Y + 16} textAnchor="end" fontSize={8.5} fontWeight={700} fill={GREEN}>
            P sinα
          </text>
        </g>
      )}
    </g>
  )
}

function Dimension() {
  return (
    <g stroke={MUTED} fill={MUTED} opacity={0.95}>
      <line x1={X0} y1={150} x2={X1} y2={150} strokeWidth={1} />
      <line x1={X0} y1={145} x2={X0} y2={155} strokeWidth={1} />
      <line x1={X1} y1={145} x2={X1} y2={155} strokeWidth={1} />
      <text x={235} y={164} textAnchor="middle" fontSize={8.5} stroke="none">
        l = 1,2 m (przykład)
      </text>
    </g>
  )
}

function Reactions({ p }: { p: number }) {
  const draw = smooth(p)
  return (
    <g opacity={draw}>
      <line
        x1={X0 + 5}
        y1={BEAM_Y - 16}
        x2={X0 + 96}
        y2={BEAM_Y - 16}
        stroke={GREEN}
        strokeWidth={2.2}
        markerEnd="url(#w5ild-react)"
      />
      <text x={X0 + 8} y={BEAM_Y - 20} fontSize={8.5} fontWeight={700} fill={GREEN}>
        H_A = P cosα
      </text>
      <line
        x1={X0}
        y1={BEAM_Y - 14}
        x2={X0}
        y2={BEAM_Y - 66}
        stroke={GREEN}
        strokeWidth={2.2}
        markerEnd="url(#w5ild-react)"
      />
      <text x={X0 + 10} y={BEAM_Y - 50} fontSize={8.5} fontWeight={700} fill={GREEN}>
        V_A = P sinα (w górę)
      </text>
      <motion.path
        d="M 56 50 Q 28 58 46 78"
        fill="none"
        stroke={VIOLET}
        strokeWidth={2.2}
        markerEnd="url(#w5ild-moment)"
        initial={false}
        animate={{ pathLength: draw }}
        transition={{ duration: 0.15, ease: 'linear' }}
      />
      <text x={X0 + 4} y={BEAM_Y - 36} fontSize={8.5} fontWeight={700} fill={VIOLET}>
        M_A (↺)
      </text>
    </g>
  )
}

function NDiagram({ p }: { p: number }) {
  const draw = smooth(p)
  const base = 190
  const depth = 47.6
  const left = X0
  const right = X1
  return (
    <g>
      <Header title="SIŁA OSIOWA N" note="składowa pozioma P cosα ściska pręt na całej długości" />
      <Beam opacity={0.4} />
      <text x={22} y={base - 4} fontSize={10} fontWeight={700} fill={BLUE}>
        N
      </text>
      <line x1={left - 6} y1={base} x2={right + 6} y2={base} stroke="#c9d0d9" strokeWidth={1} />
      <motion.rect
        x={left}
        y={base}
        width={right - left}
        height={depth}
        fill={BLUE}
        fillOpacity={0.18}
        stroke={BLUE}
        strokeWidth={1.5}
        initial={false}
        animate={{ height: depth * draw }}
        transition={{ duration: 0.15, ease: 'linear' }}
      />
      <motion.g initial={false} animate={{ opacity: smooth(ramp(p, 0.35, 0.75)) }}>
        <text x={235} y={base + depth / 2 + 3} textAnchor="middle" fontSize={9} fontWeight={700} fill={BLUE}>
          N = −P cosα = −8,66 kN
        </text>
      </motion.g>
      <line
        x1={X0 + 16}
        y1={BEAM_Y - 10}
        x2={X0 + 64}
        y2={BEAM_Y - 10}
        stroke={RED}
        strokeWidth={1.8}
        markerEnd="url(#w5ild-comp)"
        opacity={draw}
      />
      <line
        x1={X1 - 16}
        y1={BEAM_Y - 10}
        x2={X1 - 64}
        y2={BEAM_Y - 10}
        stroke={RED}
        strokeWidth={1.8}
        markerEnd="url(#w5ild-comp)"
        opacity={draw}
      />
      <text x={235} y={BEAM_Y - 18} textAnchor="middle" fontSize={8.5} fill={RED}>
        ściskanie — stałe na całej długości
      </text>
      <text x={22} y={278} fontSize={8.5} fill={MUTED}>
        N(x) = −P cosα
      </text>
      <text x={446} y={278} textAnchor="end" fontSize={8.5} fill={BLUE}>
        wartość stała: −8,66 kN
      </text>
    </g>
  )
}

function TDiagram({ p }: { p: number }) {
  const draw = smooth(p)
  const base = 190
  const height = 27.5
  return (
    <g>
      <Header title="SIŁA POPRZECZNA T" note="składowa pionowa P sinα daje stałą siłę poprzeczną" />
      <Beam opacity={0.4} />
      <text x={22} y={base - 4} fontSize={10} fontWeight={700} fill={BLUE}>
        T
      </text>
      <line x1={X0 - 6} y1={base} x2={X1 + 6} y2={base} stroke="#c9d0d9" strokeWidth={1} />
      <motion.rect
        x={X0}
        y={base}
        width={SPAN}
        height={height}
        fill={BLUE}
        fillOpacity={0.2}
        stroke={BLUE}
        strokeWidth={1.5}
        initial={false}
        animate={{ y: base - height * draw, height: height * draw }}
        transition={{ duration: 0.15, ease: 'linear' }}
      />
      <motion.g initial={false} animate={{ opacity: smooth(ramp(p, 0.35, 0.75)) }}>
        <text x={235} y={base - height - 8} textAnchor="middle" fontSize={9} fontWeight={700} fill={BLUE}>
          T = +P sinα = +5,00 kN
        </text>
      </motion.g>
      <text x={X1 + 8} y={base - height / 2 + 3} fontSize={8} fill={BLUE}>
        +
      </text>
      <text x={22} y={278} fontSize={8.5} fill={MUTED}>
        T(x) = +P sinα
      </text>
      <text x={446} y={278} textAnchor="end" fontSize={8.5} fill={BLUE}>
        wartość stała: +5,00 kN
      </text>
    </g>
  )
}

function MDiagram({ p }: { p: number }) {
  const draw = smooth(p)
  const base = 222
  const scale = 6
  const leftY = base + 6 * scale
  const length = 350
  const trim = length * draw
  const endX = X0 + trim
  const endY = base + (leftY - base) * (1 - trim / length)
  return (
    <g>
      <Header title="MOMENT GNĄCY M" note="moment maleje liniowo od utwierdzenia do zera na swobodnym końcu" />
      <Beam opacity={0.4} />
      <text x={22} y={base - 4} fontSize={10} fontWeight={700} fill={LOAD}>
        M
      </text>
      <line x1={X0 - 6} y1={base} x2={X1 + 6} y2={base} stroke="#c9d0d9" strokeWidth={1} />
      <polygon points={`${X0},${base} ${X0},${leftY} ${endX},${endY} ${endX},${base}`} fill={LOAD} fillOpacity={0.16} />
      <line x1={X0} y1={leftY} x2={endX} y2={endY} stroke={LOAD} strokeWidth={2.6} strokeLinejoin="round" />
      <circle cx={X0} cy={leftY} r={3} fill={LOAD} />
      <motion.g initial={false} animate={{ opacity: smooth(ramp(p, 0.35, 0.75)) }}>
        <text x={X0 + 8} y={leftY + 16} fontSize={8.5} fontWeight={700} fill={LOAD}>
          M(0) = −P l sinα = −6,00 kN·m
        </text>
      </motion.g>
      <text x={X1} y={base - 8} textAnchor="end" fontSize={8.5} fill={MUTED}>
        M(l) = 0
      </text>
      <text x={22} y={300} fontSize={8.5} fill={MUTED}>
        M(x) = −P sinα (l − x)
      </text>
      <text x={446} y={300} textAnchor="end" fontSize={8.5} fill={LOAD}>
        wykres ujemny — pod osią
      </text>
    </g>
  )
}

function SignScene({ p }: { p: number }) {
  const draw = smooth(p)
  const cut = xAt(0.6)
  return (
    <g>
      <Header
        title="UMOWA ZNAKÓW I INTERPRETACJA"
        note="N ujemne oznacza ściskanie, M ujemne — rozciąganie górnych włókien"
      />
      <Beam opacity={0.85} cutAt={cut} />
      <path
        d={`M ${X0} ${BEAM_Y} Q 235 ${BEAM_Y + 140} ${X1} ${BEAM_Y}`}
        fill="none"
        stroke={BLUE}
        strokeWidth={1.6}
        strokeDasharray="5 4"
      />
      <text x={235} y={BEAM_Y + 94} textAnchor="middle" fontSize={8.5} fill={BLUE}>
        ugięcie do dołu
      </text>
      <motion.g initial={false} animate={{ opacity: draw }}>
        <rect x={cut + 10} y={BEAM_Y - 4} width={58} height={4} fill={RED} fillOpacity={0.65} />
        <rect x={cut + 10} y={BEAM_Y} width={58} height={4} fill={BLUE} fillOpacity={0.65} />
        <text x={cut + 74} y={BEAM_Y - 6} fontSize={8.5} fill={RED}>
          góra: rozciąganie
        </text>
        <text x={cut + 74} y={BEAM_Y + 12} fontSize={8.5} fill={BLUE}>
          dół: ściskanie
        </text>
        <line
          x1={cut - 42}
          y1={BEAM_Y - 14}
          x2={cut - 8}
          y2={BEAM_Y - 14}
          stroke={RED}
          strokeWidth={1.8}
          markerEnd="url(#w5ild-comp)"
        />
        <line
          x1={cut + 42}
          y1={BEAM_Y - 14}
          x2={cut + 8}
          y2={BEAM_Y - 14}
          stroke={RED}
          strokeWidth={1.8}
          markerEnd="url(#w5ild-comp)"
        />
        <text x={cut} y={62} textAnchor="middle" fontSize={8.5} fill={RED}>
          N — ściskanie
        </text>
        <line
          x1={cut}
          y1={BEAM_Y + 18}
          x2={cut}
          y2={BEAM_Y + 46}
          stroke={BLUE}
          strokeWidth={2}
          markerEnd="url(#w5ild-vector)"
        />
        <text x={cut + 6} y={BEAM_Y + 50} fontSize={8.5} fontWeight={700} fill={BLUE}>
          T (wewn.)
        </text>
        <path
          d={`M ${cut + 22} ${BEAM_Y + 12} Q ${cut + 48} ${BEAM_Y} ${cut + 22} ${BEAM_Y - 12}`}
          fill="none"
          stroke={VIOLET}
          strokeWidth={2.2}
          markerEnd="url(#w5ild-moment)"
        />
        <text x={cut + 50} y={BEAM_Y + 4} fontSize={8.5} fontWeight={700} fill={VIOLET}>
          M
        </text>
      </motion.g>
      <text x={30} y={292} fontSize={8.5} fill={MUTED}>
        N &lt; 0 → pręt ściskany
      </text>
      <text x={30} y={310} fontSize={8.5} fill={MUTED}>
        M &lt; 0 → górne włókna rozciągane
      </text>
      <text x={446} y={292} textAnchor="end" fontSize={8.5} fill={MUTED}>
        T = +P sinα — stała dodatnia
      </text>
    </g>
  )
}

function CheckScene({ p }: { p: number }) {
  const draw = smooth(p)
  const tBase = 140
  const tHeight = 25
  const mBase = 240
  const leftM = mBase + 36
  const p1x = xAt(0.4)
  const p2x = xAt(0.8)
  const p1y = mBase + 24
  const p2y = mBase + 12
  return (
    <g>
      <Header title="KONTROLA RÓŻNICZKOWA WYKRESÓW" note="nachylenie wykresu momentu jest równe sile poprzecznej" />
      <text x={22} y={tBase - 4} fontSize={10} fontWeight={700} fill={BLUE}>
        T
      </text>
      <line x1={X0 - 6} y1={tBase} x2={X1 + 6} y2={tBase} stroke="#c9d0d9" strokeWidth={1} />
      <motion.rect
        x={X0}
        y={tBase - tHeight}
        width={SPAN}
        height={tHeight}
        fill={BLUE}
        fillOpacity={0.18}
        stroke={BLUE}
        strokeWidth={1.4}
        initial={false}
        animate={{ opacity: draw }}
      />
      <text x={300} y={tBase - tHeight - 8} fontSize={8.5} fontWeight={700} fill={BLUE}>
        T = +5,00 kN
      </text>
      <text x={22} y={mBase - 4} fontSize={10} fontWeight={700} fill={LOAD}>
        M
      </text>
      <line x1={X0 - 6} y1={mBase} x2={X1 + 6} y2={mBase} stroke="#c9d0d9" strokeWidth={1} />
      <line x1={X0} y1={leftM} x2={X1} y2={mBase} stroke={LOAD} strokeWidth={2.4} />
      <line x1={p1x} y1={p1y} x2={p2x} y2={p1y} stroke={MUTED} strokeWidth={1} strokeDasharray="4 3" />
      <line x1={p2x} y1={p1y} x2={p2x} y2={p2y} stroke={MUTED} strokeWidth={1} strokeDasharray="4 3" />
      <text x={(p1x + p2x) / 2} y={p1y + 14} textAnchor="middle" fontSize={8.5} fill={MUTED}>
        Δx
      </text>
      <text x={p2x + 6} y={(p1y + p2y) / 2 + 3} fontSize={8.5} fill={MUTED}>
        ΔM = T Δx
      </text>
      <motion.g initial={false} animate={{ opacity: draw }}>
        <text x={235} y={78} textAnchor="middle" fontSize={9} fontWeight={700} fill={GREEN}>
          dM/dx = +P sinα = T
        </text>
      </motion.g>
      <text x={235} y={308} textAnchor="middle" fontSize={8.5} fill={MUTED}>
        dT/dx = 0 oraz dN/dx = 0 — brak obciążenia ciągłego
      </text>
      <text x={X0 + 6} y={leftM + 16} fontSize={8.5} fill={LOAD}>
        M(0) = −6,00 kN·m
      </text>
    </g>
  )
}

function InclinedLoadDiagramsAnimationScene({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const p = playing ? smooth(sceneProgress) : 1

  const content =
    metric === 'components' ? (
      <g>
        <Header
          title="ROZKŁAD SIŁY P NA SKŁADOWE"
          note="składowa osiowa ściska pręt, składowa poprzeczna działa w dół"
        />
        <Wall />
        <Beam />
        <Force p={p} showComponents />
        <Dimension />
        <text x={30} y={300} fontSize={8.5} fill={MUTED}>
          przykład: P = 10 kN, α = 30°, l = 1,2 m
        </text>
        <text x={30} y={318} fontSize={8.5} fill={GREEN}>
          P cosα = 8,66 kN (←) · P sinα = 5,00 kN (↓)
        </text>
      </g>
    ) : metric === 'reaction' ? (
      <g>
        <Header title="REAKCJE W UTWIERDZENIU A" note="składowa P sinα działa w dół, więc reakcja V_A działa w górę" />
        <Wall />
        <Beam />
        <Force p={p} opacity={0.55} />
        <Reactions p={p} />
        <text x={30} y={300} fontSize={8.5} fill={MUTED}>
          przykład: H_A = 8,66 kN, V_A = +5,00 kN (w górę), M_A = +6,00 kN·m
        </text>
        <text x={30} y={318} fontSize={8.5} fill={VIOLET}>
          M_A działa przeciwnie do ruchu wskazówek zegara
        </text>
      </g>
    ) : metric === 'normal' ? (
      <NDiagram p={p} />
    ) : metric === 'shear' ? (
      <TDiagram p={p} />
    ) : metric === 'moment' ? (
      <MDiagram p={p} />
    ) : metric === 'signs' ? (
      <SignScene p={p} />
    ) : metric === 'check' ? (
      <CheckScene p={p} />
    ) : (
      <g>
        <Header
          title="WSPORNIK Z SIŁĄ P POD KĄTEM α"
          note="utwierdzenie w A, swobodny koniec B; siła P skierowana w dół i w lewo"
        />
        <Wall />
        <Beam />
        <Force p={p} />
        <Dimension />
        <text x={30} y={300} fontSize={8.5} fill={MUTED}>
          P jest skierowana w dół i w lewo; składowa pozioma ściska, pionowa zgina
        </text>
        <text x={30} y={318} fontSize={8.5} fill={GREEN}>
          przykład liczbowy: P = 10 kN, α = 30°, l = 1,2 m
        </text>
      </g>
    )

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 340"
          role="img"
          aria-label="Wspornik utwierdzony w A z siłą P pod kątem alfa na końcu B. Animacja pokazuje rozkład siły, reakcje oraz wykresy siły osiowej, siły poprzecznej i momentu gnącego."
        >
          <defs>
            <marker
              id="w5ild-load"
              viewBox="0 0 10 10"
              refX={8}
              refY={5}
              markerWidth={5.5}
              markerHeight={5.5}
              orient="auto"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={LOAD} />
            </marker>
            <marker
              id="w5ild-react"
              viewBox="0 0 10 10"
              refX={8}
              refY={5}
              markerWidth={5}
              markerHeight={5}
              orient="auto"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={GREEN} />
            </marker>
            <marker
              id="w5ild-vector"
              viewBox="0 0 10 10"
              refX={8}
              refY={5}
              markerWidth={5}
              markerHeight={5}
              orient="auto"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={BLUE} />
            </marker>
            <marker
              id="w5ild-comp"
              viewBox="0 0 10 10"
              refX={8}
              refY={5}
              markerWidth={5}
              markerHeight={5}
              orient="auto"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={RED} />
            </marker>
            <marker
              id="w5ild-moment"
              viewBox="0 0 10 10"
              refX={8}
              refY={5}
              markerWidth={5}
              markerHeight={5}
              orient="auto"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={VIOLET} />
            </marker>
          </defs>
          {content}
        </svg>
      </div>
    </div>
  )
}

export function createInclinedLoadDiagramsAnimation(
  config: InclinedLoadDiagramsInputs,
): ComponentType<SolutionAnimationProps> {
  return function InclinedLoadDiagramsAnimation(props: SolutionAnimationProps) {
    return <InclinedLoadDiagramsAnimationScene {...props} />
  }
}
