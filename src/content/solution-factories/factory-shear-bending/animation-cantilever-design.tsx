import type { ComponentType } from 'react'
import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import type { CantileverDesignInputs } from './factory'
import { local } from '../../../components/solution-figures/shared'

const BLUE = '#4f6df5'
const LOAD = '#ff6b45'
const OK = '#2f7d5b'
const VIOLET = '#a970dd'
const MUTED = '#87929d'
const EDGE = '#7d8fa5'
const INK = '#17202a'
const FILL = '#eef3fa'
const TENS = '#2f7d5b'
const COMP = '#d84f28'

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}
const ramp = (value: number, from: number, to: number) => clamp01((value - from) / (to - from))

const BEAM_X0 = 50
const BEAM_X1 = 410
const BEAM_Y = 86
const B_X = 320
const xAt = (metres: number) => BEAM_X0 + metres * 180

function Arrow({
  x1,
  y1,
  x2,
  y2,
  color,
  amount = 1,
  width = 2.2,
}: {
  x1: number
  y1: number
  x2: number
  y2: number
  color: string
  amount?: number
  width?: number
}) {
  const t = clamp01(amount)
  if (t < 0.03) return null
  const ex = x1 + (x2 - x1) * t
  const ey = y1 + (y2 - y1) * t
  const angle = Math.atan2(ey - y1, ex - x1)
  const head = 7
  const baseX = ex - head * Math.cos(angle)
  const baseY = ey - head * Math.sin(angle)
  const wing = 3.6
  const lx = baseX - wing * Math.sin(angle)
  const ly = baseY + wing * Math.cos(angle)
  const rx = baseX + wing * Math.sin(angle)
  const ry = baseY - wing * Math.cos(angle)
  return (
    <g stroke={color} fill={color}>
      <line x1={x1} y1={y1} x2={baseX} y2={baseY} strokeWidth={width} strokeLinecap="round" />
      <polygon points={`${ex},${ey} ${lx},${ly} ${rx},${ry}`} stroke="none" />
    </g>
  )
}

function Header({ title, note }: { title: string; note: string }) {
  return (
    <g>
      <text x={14} y={18} fontSize={9.5} fontWeight={700} fill={INK}>
        {title}
      </text>
      <text x={446} y={18} textAnchor="end" fontSize={8.5} fill={MUTED}>
        {note}
      </text>
    </g>
  )
}

function BeamRig({ draw, dims = true, letters = true }: { draw: number; dims?: boolean; letters?: boolean }) {
  const opacity = clamp01(draw)
  return (
    <g opacity={opacity}>
      <line x1={412} y1={68} x2={412} y2={104} stroke={EDGE} strokeWidth={4} />
      {[68, 77, 86, 95, 104].map((y) => (
        <line key={`hatch-${y}`} x1={412} y1={y} x2={426} y2={y + 7} stroke={EDGE} strokeWidth={1.1} />
      ))}
      <rect
        x={BEAM_X0}
        y={BEAM_Y - 4}
        width={BEAM_X1 - BEAM_X0}
        height={9}
        rx={2}
        fill="#dce8f7"
        stroke={EDGE}
        strokeWidth={1.2}
      />
      <line x1={50} y1={56} x2={296} y2={56} stroke={LOAD} strokeWidth={1.6} />
      {[50, 95, 140, 185, 230, 275].map((x) => (
        <g key={`q-${x}`}>
          <line x1={x} y1={56} x2={x} y2={79} stroke={LOAD} strokeWidth={1.3} />
          <path d={`M ${x - 3} 73 L ${x} 79 L ${x + 3} 73`} fill="none" stroke={LOAD} strokeWidth={1.3} />
        </g>
      ))}
      <path d="M 304 76 Q 320 50 336 76" fill="none" stroke={VIOLET} strokeWidth={2} markerEnd="url(#cw93-moment)" />
      <text x={162} y={48} textAnchor="middle" fontSize={8.5} fontWeight={600} fill={LOAD}>
        q = 20 kN/m
      </text>
      <text x={342} y={58} fontSize={8.5} fontWeight={600} fill={VIOLET}>
        M = 5 kN·m
      </text>
      {letters && (
        <g fontSize={9} fontWeight={700} fill={INK}>
          <text x={50} y={110} textAnchor="middle">
            A
          </text>
          <text x={B_X} y={110} textAnchor="middle">
            B
          </text>
          <text x={400} y={110} textAnchor="middle">
            C
          </text>
        </g>
      )}
      {dims && (
        <g stroke={MUTED} fill={MUTED}>
          <line x1={50} y1={122} x2={B_X} y2={122} strokeWidth={1} />
          <line x1={50} y1={117} x2={50} y2={127} strokeWidth={1} />
          <line x1={B_X} y1={117} x2={B_X} y2={127} strokeWidth={1} />
          <line x1={B_X} y1={122} x2={BEAM_X1} y2={122} strokeWidth={1} />
          <line x1={BEAM_X1} y1={117} x2={BEAM_X1} y2={127} strokeWidth={1} />
          <text x={185} y={136} textAnchor="middle" fontSize={8.5} stroke="none">
            l₁ = 1,5 m
          </text>
          <text x={365} y={136} textAnchor="middle" fontSize={8.5} stroke="none">
            l₂ = 0,5 m
          </text>
        </g>
      )}
    </g>
  )
}

function DiagramAxis({ label }: { label: string }) {
  return (
    <g>
      <line x1={50} y1={170} x2={432} y2={170} stroke="#c9d0d9" strokeWidth={1} />
      <text x={14} y={158} fontSize={10} fontWeight={700} fill={INK}>
        {label}
      </text>
      <text x={436} y={174} fontSize={8} fill={MUTED}>
        x
      </text>
    </g>
  )
}

function ModelScene({ p }: { p: number }) {
  const reveal = smooth(ramp(p, 0, 0.3))
  return (
    <g>
      <Header title="BELKA WSPORNIKOWA · MODEL" note="utwierdzenie w C · q i moment M" />
      <BeamRig draw={reveal} />
      <text x={230} y={316} textAnchor="middle" fontSize={8.5} fill={MUTED}>
        swobodny koniec A, moment skupiony w B, utwierdzenie w C
      </text>
    </g>
  )
}

function DataScene({ p }: { p: number }) {
  const reveal = smooth(ramp(p, 0, 0.3))
  return (
    <g>
      <Header title="DANE, JEDNOSTKI I ZNAKI" note="niuton i milimetr" />
      <BeamRig draw={reveal} />
      <g opacity={reveal}>
        <rect x={40} y={148} width={180} height={44} rx={8} fill="#f2f5fa" stroke="#d7dee8" strokeWidth={1.1} />
        <text x={52} y={165} fontSize={8} fill={MUTED}>
          obciążenie ciągłe
        </text>
        <text x={52} y={182} fontSize={9.5} fontWeight={700} fill={INK}>
          q = 20 kN/m
        </text>
        <rect x={240} y={148} width={180} height={44} rx={8} fill="#f2f5fa" stroke="#d7dee8" strokeWidth={1.1} />
        <text x={252} y={165} fontSize={8} fill={MUTED}>
          moment skupiony
        </text>
        <text x={252} y={182} fontSize={9.5} fontWeight={700} fill={INK}>
          M = 5 kN·m
        </text>
        <rect x={40} y={198} width={180} height={44} rx={8} fill="#f2f5fa" stroke="#d7dee8" strokeWidth={1.1} />
        <text x={52} y={215} fontSize={8} fill={MUTED}>
          geometria
        </text>
        <text x={52} y={232} fontSize={9} fontWeight={700} fill={INK}>
          l₁ = 1,5 m · l₂ = 0,5 m
        </text>
        <rect x={240} y={198} width={180} height={44} rx={8} fill="#f2f5fa" stroke="#d7dee8" strokeWidth={1.1} />
        <text x={252} y={215} fontSize={8} fill={MUTED}>
          materiał
        </text>
        <text x={252} y={232} fontSize={9.5} fontWeight={700} fill={INK}>
          k_g = 200 MPa
        </text>
        <rect x={40} y={252} width={380} height={58} rx={8} fill={FILL} stroke="#d7dee8" strokeWidth={1.1} />
        <text x={52} y={274} fontSize={9} fontWeight={600} fill={INK}>
          q = 20 kN/m = 20 N/mm
        </text>
        <text x={52} y={294} fontSize={9} fill={INK}>
          M = 5·10⁶ N·mm · k_g = 200 N/mm²
        </text>
      </g>
      <text x={230} y={326} textAnchor="middle" fontSize={8.5} fill={MUTED}>
        dodatni moment gnący: ugięcie brzusznikiem w dół
      </text>
    </g>
  )
}

function ReactionScene({ p }: { p: number }) {
  const reveal = smooth(ramp(p, 0, 0.35))
  return (
    <g>
      <Header title="REAKCJE W UTWIERDZENIU" note="R_C = 30 kN · M_R = 42,5 kN·m" />
      <BeamRig draw={reveal} dims={false} letters={false} />
      <g opacity={reveal}>
        <Arrow x1={380} y1={132} x2={380} y2={96} color={OK} amount={reveal} width={2.4} />
        <text x={374} y={146} textAnchor="end" fontSize={8.5} fontWeight={700} fill={OK}>
          R_C = 30 kN
        </text>
        <path d="M 394 76 Q 410 50 426 76" fill="none" stroke={VIOLET} strokeWidth={2} markerEnd="url(#cw93-moment)" />
        <text x={410} y={46} textAnchor="middle" fontSize={8.5} fontWeight={600} fill={VIOLET}>
          M_R = 42,5 kN·m
        </text>
        <g fontSize={9} fontWeight={700} fill={INK}>
          <text x={50} y={110} textAnchor="middle">
            A
          </text>
          <text x={B_X} y={110} textAnchor="middle">
            B
          </text>
          <text x={400} y={110} textAnchor="middle">
            C
          </text>
        </g>
        <rect x={40} y={160} width={380} height={72} rx={8} fill={FILL} stroke="#d7dee8" strokeWidth={1.1} />
        <text x={52} y={186} fontSize={9} fill={INK}>
          ΣF_y: R_C = q · l₁ = 20 · 1,5 = 30 kN
        </text>
        <text x={52} y={212} fontSize={9} fill={INK}>
          ΣM_C: M_R = 30 · 1,25 + 5 = 42,5 kN·m
        </text>
      </g>
      <text x={230} y={300} textAnchor="middle" fontSize={8.5} fill={MUTED}>
        reakcja momentowa działa przeciwnie do obciążenia belki
      </text>
    </g>
  )
}

function ShearScene({ p }: { p: number }) {
  const draw = smooth(ramp(p, 0, 0.7))
  return (
    <g>
      <Header title="SIŁA POPRZECZNA T" note="T = −qx na AB · T = −30 kN na BC" />
      <BeamRig draw={0.7} />
      <DiagramAxis label="T [kN]" />
      <motion.path
        d={`M ${BEAM_X0} 170 L ${B_X} 230 L ${BEAM_X1} 230`}
        fill="none"
        stroke={BLUE}
        strokeWidth={2.6}
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: draw }}
        transition={{ duration: 0.12, ease: 'linear' }}
      />
      <circle cx={BEAM_X0} cy={170} r={3} fill={BLUE} />
      <circle cx={B_X} cy={230} r={3} fill={BLUE} opacity={draw > 0.55 ? 1 : 0} />
      <text x={50} y={164} textAnchor="middle" fontSize={8.5} fontWeight={600} fill={BLUE}>
        0
      </text>
      <text x={365} y={222} textAnchor="middle" fontSize={9} fontWeight={700} fill={BLUE}>
        −30 kN
      </text>
      <text x={230} y={318} textAnchor="middle" fontSize={8.5} fill={MUTED}>
        moment skupiony w B nie zmienia siły poprzecznej
      </text>
    </g>
  )
}

const PARABOLA = Array.from({ length: 31 }, (_, index) => {
  const x = (index / 30) * 1.5
  return [xAt(x), 170 + 20 * x * x] as [number, number]
})

function MomentScene({ p }: { p: number }) {
  const draw = smooth(ramp(p, 0, 0.72))
  const path = `${PARABOLA.map(([x, y], index) => `${index === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`).join(
    ' ',
  )} L ${B_X} 225 L ${BEAM_X1} 255`
  return (
    <g>
      <Header title="MOMENT GNĄCY M" note="parabola · skok 5 kN·m · prosta BC" />
      <BeamRig draw={0.7} />
      <DiagramAxis label="M [kN·m]" />
      <motion.path
        d={path}
        fill="none"
        stroke={LOAD}
        strokeWidth={2.6}
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: draw }}
        transition={{ duration: 0.12, ease: 'linear' }}
      />
      <circle cx={BEAM_X0} cy={170} r={3} fill={LOAD} />
      <circle cx={B_X} cy={215} r={3} fill={LOAD} opacity={draw > 0.7 ? 1 : 0} />
      <circle cx={B_X} cy={225} r={3} fill={LOAD} opacity={draw > 0.75 ? 1 : 0} />
      <circle cx={BEAM_X1} cy={255} r={3} fill={LOAD} opacity={draw > 0.9 ? 1 : 0} />
      <text x={316} y={207} textAnchor="end" fontSize={8.5} fontWeight={700} fill={LOAD}>
        −22,5
      </text>
      <text x={328} y={221} fontSize={8.5} fontWeight={700} fill={LOAD}>
        −27,5
      </text>
      <text x={BEAM_X1} y={247} textAnchor="end" fontSize={8.5} fontWeight={700} fill={LOAD}>
        −42,5
      </text>
      <text x={230} y={318} textAnchor="middle" fontSize={8.5} fill={MUTED}>
        M(1,5⁻) = −22,5 · M(1,5⁺) = −27,5 · M(2,0) = −42,5 kN·m
      </text>
    </g>
  )
}

function DesignScene({ p }: { p: number }) {
  const reveal = smooth(ramp(p, 0, 0.3))
  const result = smooth(ramp(p, 0.5, 0.72))
  return (
    <g>
      <Header title="DOBÓR WSKAŹNIKA W_y" note="|M|max = 42,5 kN·m · k_g = 200 MPa" />
      <BeamRig draw={0.75} dims={false} />
      <text x={BEAM_X1} y={155} textAnchor="end" fontSize={8.5} fontWeight={600} fill={LOAD}>
        największy moment w utwierdzeniu
      </text>
      <g opacity={reveal}>
        <rect x={40} y={176} width={390} height={104} rx={8} fill={FILL} stroke="#d7dee8" strokeWidth={1.1} />
        <text x={54} y={202} fontSize={10} fontWeight={700} fill={INK}>
          |M|max = 42,5 kN·m
        </text>
        <text x={54} y={226} fontSize={9} fill={MUTED}>
          k_g = 200 MPa = 200 N/mm²
        </text>
        <text x={54} y={250} fontSize={9.5} fontWeight={600} fill={BLUE}>
          W_y ≥ 42,5·10⁶ / 200
        </text>
        <g opacity={result}>
          <text x={54} y={272} fontSize={9.5} fontWeight={700} fill={OK}>
            = 212 500 mm³ = 212,5 cm³
          </text>
        </g>
      </g>
      <text x={230} y={316} textAnchor="middle" fontSize={8.5} fill={MUTED}>
        wynik w mm³ dzielimy przez 1000, aby otrzymać cm³
      </text>
    </g>
  )
}

function IBeam({
  cx,
  top,
  height,
  width,
  flange,
  web,
  stress = 0,
}: {
  cx: number
  top: number
  height: number
  width: number
  flange: number
  web: number
  stress?: number
}) {
  const bottom = top + height
  const mid = top + height / 2
  const left = cx - width / 2
  const right = cx + width / 2
  const levels = [top + flange * 0.35, top + flange * 0.75, top + flange * 1.15]
  return (
    <g>
      <rect x={left} y={top} width={width} height={flange} fill={FILL} stroke={EDGE} strokeWidth={1.4} />
      <rect
        x={cx - web / 2}
        y={top + flange}
        width={web}
        height={height - 2 * flange}
        fill={FILL}
        stroke={EDGE}
        strokeWidth={1.4}
      />
      <rect x={left} y={bottom - flange} width={width} height={flange} fill={FILL} stroke={EDGE} strokeWidth={1.4} />
      <line x1={left - 12} y1={mid} x2={right + 12} y2={mid} stroke={VIOLET} strokeWidth={1.2} strokeDasharray="5 4" />
      {stress > 0 &&
        levels.map((y, index) => {
          const bottomY = bottom - flange + flange * 0.25 + index * 0.25 * flange
          return (
            <g key={`stress-${index}`}>
              <Arrow x1={left - 34} y1={y} x2={left} y2={y} color={COMP} amount={stress} width={1.4} />
              <Arrow x1={left} y1={bottomY} x2={left - 34} y2={bottomY} color={TENS} amount={stress} width={1.4} />
            </g>
          )
        })}
    </g>
  )
}

function SectionScene({ p }: { p: number }) {
  const reveal = smooth(ramp(p, 0, 0.45))
  return (
    <g>
      <Header title="DWUTEOWNIK Z TABELI" note="W_y ≥ 212,5 cm³" />
      <text x={128} y={60} textAnchor="middle" fontSize={10} fontWeight={700} fill={BLUE}>
        I 200
      </text>
      <IBeam cx={128} top={76} height={156} width={96} flange={14} web={9} />
      <text x={192} y={148} fontSize={8} fill={VIOLET}>
        oś obojętna
      </text>
      <g opacity={reveal}>
        <text x={256} y={80} fontSize={8} fill={MUTED}>
          dobór z tabeli
        </text>
        <text x={256} y={104} fontSize={10.5} fontWeight={700} fill={BLUE}>
          W_y = 214 cm³
        </text>
        <text x={256} y={132} fontSize={9} fill={INK}>
          W_required = 212,5 cm³
        </text>
        <text x={256} y={158} fontSize={9} fontWeight={700} fill={OK}>
          214 &gt; 212,5 → OK
        </text>
        <text x={256} y={186} fontSize={9} fill={MUTED}>
          h = 200 mm
        </text>
        <text x={256} y={206} fontSize={9} fill={MUTED}>
          b = 90 mm
        </text>
      </g>
      <text x={230} y={318} textAnchor="middle" fontSize={8.5} fill={MUTED}>
        najmniejszy profil spełniający W_y ≥ 212,5 cm³
      </text>
    </g>
  )
}

function CheckScene({ p }: { p: number }) {
  const draw = smooth(ramp(p, 0, 0.55))
  const ratio = 198.6 / 200
  return (
    <g>
      <Header title="KONTROLA NAPRĘŻEŃ · I 200" note="σmax = 198,6 MPa · k_g = 200 MPa" />
      <IBeam cx={118} top={80} height={150} width={90} flange={13} web={8} stress={draw} />
      <text x={174} y={149} fontSize={8} fill={VIOLET}>
        oś obojętna
      </text>
      <text x={118} y={66} textAnchor="middle" fontSize={9} fontWeight={700} fill={COMP}>
        198,6 MPa
      </text>
      <text x={118} y={248} textAnchor="middle" fontSize={9} fontWeight={700} fill={TENS}>
        198,6 MPa
      </text>
      <text x={118} y={266} textAnchor="middle" fontSize={8.5} fill={MUTED}>
        I 200
      </text>
      <text x={250} y={92} fontSize={9} fontWeight={700} fill={INK}>
        wykorzystanie przekroju
      </text>
      <rect x={250} y={104} width={190} height={16} rx={6} fill="#edf1f5" />
      <rect
        x={250}
        y={104}
        width={190 * ratio * draw}
        height={16}
        rx={6}
        fill={OK}
        fillOpacity={0.25}
        stroke={OK}
        strokeWidth={1.2}
      />
      <text x={256} y={116} fontSize={8} fontWeight={700} fill={OK}>
        99,3%
      </text>
      <text x={250} y={140} fontSize={8.5} fill={MUTED}>
        σmax = 198,6 MPa
      </text>
      <text x={440} y={140} textAnchor="end" fontSize={8.5} fill={LOAD}>
        k_g = 200 MPa
      </text>
      <text x={250} y={162} fontSize={8.5} fontWeight={600} fill={OK}>
        zapas ≈ 0,7%
      </text>
      <rect x={250} y={178} width={190} height={74} rx={8} fill={FILL} stroke="#d7dee8" strokeWidth={1.1} />
      <text x={262} y={200} fontSize={8.5} fill={MUTED}>
        σ = Mmax / W_y
      </text>
      <text x={262} y={220} fontSize={9} fontWeight={600} fill={INK}>
        = 42,5·10⁶ / 214·10³
      </text>
      <text x={262} y={240} fontSize={9.5} fontWeight={700} fill={OK}>
        = 198,6 MPa
      </text>
      <text x={250} y={274} fontSize={9} fontWeight={700} fill={INK}>
        Mmax = 42,5 kN·m
      </text>
      <text x={230} y={318} textAnchor="middle" fontSize={8.5} fill={OK}>
        warunek σmax ≤ k_g jest spełniony, ale zapas jest niewielki
      </text>
    </g>
  )
}

function CantileverDesignAnimationScene({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const p = playing ? smooth(sceneProgress) : 1

  const content =
    metric === 'data' ? (
      <DataScene p={p} />
    ) : metric === 'reaction' ? (
      <ReactionScene p={p} />
    ) : metric === 'shear' ? (
      <ShearScene p={p} />
    ) : metric === 'moment' ? (
      <MomentScene p={p} />
    ) : metric === 'design' ? (
      <DesignScene p={p} />
    ) : metric === 'section' ? (
      <SectionScene p={p} />
    ) : metric === 'check' ? (
      <CheckScene p={p} />
    ) : (
      <ModelScene p={p} />
    )

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 340"
          role="img"
          aria-label="Belka wspornikowa z obciążeniem ciągłym i momentem skupionym: wykresy siły poprzecznej i momentu, dobór dwuteownika I 200 oraz kontrola naprężeń"
        >
          <defs>
            <marker
              id="cw93-moment"
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

export function createCantileverDesignAnimation(config: CantileverDesignInputs): ComponentType<SolutionAnimationProps> {
  return function CantileverDesignAnimation(props: SolutionAnimationProps) {
    return <CantileverDesignAnimationScene {...props} />
  }
}
