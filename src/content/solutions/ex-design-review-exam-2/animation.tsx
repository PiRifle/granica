import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const BLUE = '#4f6df5'
const ORANGE = '#ff6b45'
const VIOLET = '#a970dd'
const GREEN = '#2e9e6b'
const RED = '#d64545'
const MUTED = '#87929d'
const EDGE = '#68727e'
const INK = '#17202a'
const FILL = '#eef3fa'

const T = 500
const TAU1 = 11.8
const TAU2 = 39.8
const TAU_DOP = 40
const PHI1 = 0.00393
const PHI2 = 0.01492
const PHI_TOT = 0.01885
const PHI_DOP = 0.020944
const PHI_DEG = 1.08
const EXAGGERATION = 100

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}
const pl = (value: number, digits = 1) => value.toFixed(digits).replace('.', ',')

function TorqueArcs({ cy, p }: { cy: number; p: number }) {
  return (
    <g>
      <motion.path
        d={`M 48 ${cy - 32} A 28 28 0 1 1 48 ${cy + 32}`}
        fill="none"
        stroke={ORANGE}
        strokeWidth={2.2}
        strokeLinecap="round"
        markerEnd="url(#dr2-load)"
        initial={{ pathLength: 0, opacity: 0.2 }}
        animate={{ pathLength: p, opacity: 1 }}
        transition={{ duration: 0.12, ease: 'linear' }}
      />
      <motion.path
        d={`M 432 ${cy + 32} A 28 28 0 1 1 432 ${cy - 32}`}
        fill="none"
        stroke={ORANGE}
        strokeWidth={2.2}
        strokeLinecap="round"
        markerEnd="url(#dr2-load)"
        initial={{ pathLength: 0, opacity: 0.2 }}
        animate={{ pathLength: p, opacity: 1 }}
        transition={{ duration: 0.12, ease: 'linear' }}
      />
      <text x={22} y={cy + 4} fontSize={9} fontWeight={600} fill={ORANGE}>
        T
      </text>
      <text x={438} y={cy + 4} fontSize={9} fontWeight={600} fill={ORANGE}>
        T
      </text>
    </g>
  )
}

function SteppedShaft({
  cy,
  r1,
  r2,
  p = 1,
  highlight,
}: {
  cy: number
  r1: number
  r2: number
  p?: number
  highlight?: 'first' | 'second'
}) {
  const left = 60
  const step = 270
  const right = 420
  return (
    <g>
      <rect
        x={left}
        y={cy - r1}
        width={step - left}
        height={r1 * 2}
        fill={highlight === 'first' ? '#fff2ed' : '#e9eef7'}
        stroke={EDGE}
        strokeWidth={1.5}
      />
      <rect
        x={step}
        y={cy - r2}
        width={right - step}
        height={r2 * 2}
        fill={highlight === 'second' ? '#fff2ed' : '#e9eef7'}
        stroke={highlight === 'second' ? ORANGE : EDGE}
        strokeWidth={highlight === 'second' ? 2 : 1.5}
      />
      <line x1={step} y1={cy - r1} x2={step} y2={cy - r2} stroke={EDGE} strokeWidth={1.5} />
      <line x1={step} y1={cy + r1} x2={step} y2={cy + r2} stroke={EDGE} strokeWidth={1.5} />
      <ellipse cx={left} cy={cy} rx={9} ry={r1} fill="#f5f7fc" stroke={EDGE} strokeWidth={1.3} />
      <ellipse cx={right} cy={cy} rx={9} ry={r2} fill="#dfe6f2" stroke={EDGE} strokeWidth={1.3} />
      <line x1={left + 8} y1={cy} x2={right} y2={cy} stroke={MUTED} strokeWidth={0.8} strokeDasharray="5 5" />
      <text x={(left + step) / 2} y={cy + 4} textAnchor="middle" fontSize={9} fill={MUTED}>
        1
      </text>
      <text x={(step + right) / 2} y={cy + 4} textAnchor="middle" fontSize={9} fill={MUTED}>
        2
      </text>
      <motion.path
        d={`M ${left} ${cy - r1} L ${step} ${cy - r1} L ${step} ${cy - r2} L ${right} ${cy - r2}`}
        fill="none"
        stroke={BLUE}
        strokeWidth={2}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: p }}
        transition={{ duration: 0.12, ease: 'linear' }}
      />
    </g>
  )
}

function TauArrows({ cx, cy, r, value, p }: { cx: number; cy: number; r: number; value: number; p: number }) {
  return (
    <g>
      {Array.from({ length: 12 }, (_, index) => {
        const angle = (index * Math.PI) / 6
        const x = cx + Math.cos(angle) * r
        const y = cy + Math.sin(angle) * r
        const tangent = angle + Math.PI / 2
        const length = 44 * (value / TAU_DOP) * p
        return (
          <line
            key={index}
            x1={x}
            y1={y}
            x2={x + Math.cos(tangent) * length}
            y2={y + Math.sin(tangent) * length}
            stroke={BLUE}
            strokeWidth={1.5}
            markerEnd={length > 6 ? 'url(#dr2-tau)' : undefined}
          />
        )
      })}
    </g>
  )
}

export function DesignReviewExam2Animation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const p = playing ? smooth(sceneProgress) : 1
  const isModel = metric === 'model'
  const isTorque = metric === 'torque'
  const isStress = metric === 'stress'
  const isTwist = metric === 'twist'
  const isTotal = metric === 'total'
  const isCheck = metric === 'check'

  const chartX0 = 80
  const chartX1 = 440
  const chartBase = 262
  const chartTop = 96
  const phiMax = 0.024
  const stepX = chartX0 + (800 / 1400) * (chartX1 - chartX0)
  const yFor = (phi: number) => chartBase - (phi / phiMax) * (chartBase - chartTop)
  const limitY = yFor(PHI_DOP)
  const totalY = yFor(PHI_TOT)

  const stations = [90, 130, 170, 210, 250, 300, 340, 380, 420]
  const phiAt = (x: number) => (x <= 270 ? PHI1 * ((x - 60) / 210) : PHI1 + PHI2 * ((x - 270) / 150))

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 480 320"
          role="img"
          aria-label="Wał schodkowy o dwóch odcinkach. Animacja pokazuje moment skręcający, naprężenia w cieńszym odcinku, przyrost kąta skręcenia i kontrolę obu warunków."
        >
          <defs>
            <marker id="dr2-load" viewBox="0 0 10 10" refX={8} refY={5} markerWidth={5} markerHeight={5} orient="auto">
              <path d="M0 0 L10 5 L0 10 Z" fill={ORANGE} />
            </marker>
            <marker id="dr2-tau" viewBox="0 0 10 10" refX={8} refY={5} markerWidth={5} markerHeight={5} orient="auto">
              <path d="M0 0 L10 5 L0 10 Z" fill={BLUE} />
            </marker>
          </defs>

          {isModel && (
            <g>
              <text x={14} y={20} fontSize={9} fill={MUTED}>
                wał schodkowy · T = {T} N·m · G = 80 GPa
              </text>
              <text x={14} y={34} fontSize={9} fill={MUTED}>
                D_1 = 60 mm · L_1 = 0,8 m · D_2 = 40 mm · L_2 = 0,6 m
              </text>
              <text x={14} y={48} fontSize={9} fill={MUTED}>
                τ_dop = 40 MPa · φ_dop = 1,2°
              </text>

              <SteppedShaft cy={122} r1={32} r2={22} p={p} />
              <TorqueArcs cy={122} p={p} />

              <text x={165} y={84} textAnchor="middle" fontSize={9} fontWeight={600} fill={INK}>
                D_1 = 60 mm
              </text>
              <text x={345} y={92} textAnchor="middle" fontSize={9} fontWeight={600} fill={INK}>
                D_2 = 40 mm
              </text>

              <line x1={60} y1={190} x2={270} y2={190} stroke={MUTED} strokeWidth={1} />
              <line x1={60} y1={184} x2={60} y2={196} stroke={MUTED} strokeWidth={1} />
              <line x1={270} y1={184} x2={270} y2={196} stroke={MUTED} strokeWidth={1} />
              <line x1={270} y1={190} x2={420} y2={190} stroke={MUTED} strokeWidth={1} />
              <line x1={420} y1={184} x2={420} y2={196} stroke={MUTED} strokeWidth={1} />
              <text x={165} y={206} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                L_1 = 0,8 m
              </text>
              <text x={345} y={206} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                L_2 = 0,6 m
              </text>
              <text x={240} y={248} textAnchor="middle" fontSize={9} fill={MUTED}>
                dwa odcinki o różnych średnicach — moment jest przenoszony przez cały wał
              </text>
              <text x={240} y={272} textAnchor="middle" fontSize={9} fill={MUTED}>
                najpierw sprawdzamy każdy odcinek osobno
              </text>
            </g>
          )}

          {isTorque && (
            <g>
              <text x={14} y={20} fontSize={9} fill={MUTED}>
                moment skręcający · T = {T} N·m
              </text>
              <text x={14} y={34} fontSize={9} fill={MUTED}>
                T jest jednakowy w obu odcinkach, bo wał jest w równowadze
              </text>

              <SteppedShaft cy={104} r1={30} r2={21} p={p} />
              <TorqueArcs cy={104} p={p} />

              <line x1={60} y1={232} x2={440} y2={232} stroke={EDGE} strokeWidth={1.1} />
              <path d="M 440 232 L 432 228 L 432 236 Z" fill={EDGE} />
              <text x={446} y={236} fontSize={8.5} fill={MUTED}>
                x
              </text>
              <motion.rect x={60} y={178} width={360 * p} height={54} fill={BLUE} fillOpacity={0.12} />
              <motion.line
                x1={60}
                y1={178}
                x2={60 + 360 * p}
                y2={178}
                stroke={BLUE}
                strokeWidth={2.6}
                initial={false}
                animate={{ x2: 60 + 360 * p }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <text x={240} y={168} textAnchor="middle" fontSize={9.5} fontWeight={600} fill={BLUE}>
                T = {T} N·m
              </text>
              <line x1={270} y1={178} x2={270} y2={232} stroke={MUTED} strokeWidth={1} strokeDasharray="4 4" />
              <text x={270} y={250} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                zmiana średnicy
              </text>
              <text x={240} y={282} textAnchor="middle" fontSize={9} fill={MUTED}>
                ten sam moment działa na oba odcinki — decyduje mniejszy przekrój
              </text>
            </g>
          )}

          {isStress && (
            <g>
              <text x={14} y={20} fontSize={9} fill={MUTED}>
                naprężenia styczne · τ = T/W_o · τ_dop = 40 MPa
              </text>
              <text x={14} y={34} fontSize={9} fill={MUTED}>
                W_o rośnie z trzecią potęgą średnicy
              </text>

              <circle cx={110} cy={140} r={40} fill={FILL} stroke={EDGE} strokeWidth={1.6} />
              <line x1={62} y1={140} x2={158} y2={140} stroke={INK} strokeWidth={0.9} strokeDasharray="5 4" />
              <line x1={110} y1={92} x2={110} y2={188} stroke={INK} strokeWidth={0.9} strokeDasharray="5 4" />
              <TauArrows cx={110} cy={140} r={40} value={TAU1} p={p} />
              <circle cx={110} cy={140} r={2.4} fill={INK} />
              <text x={110} y={202} textAnchor="middle" fontSize={9} fontWeight={600} fill={INK}>
                odcinek 1 · D_1 = 60 mm
              </text>
              <text x={110} y={218} textAnchor="middle" fontSize={8.5} fill={BLUE}>
                τ_1 = 11,8 MPa
              </text>

              <circle cx={250} cy={140} r={27} fill={FILL} stroke={ORANGE} strokeWidth={1.8} />
              <line x1={217} y1={140} x2={283} y2={140} stroke={INK} strokeWidth={0.9} strokeDasharray="5 4" />
              <line x1={250} y1={107} x2={250} y2={173} stroke={INK} strokeWidth={0.9} strokeDasharray="5 4" />
              <TauArrows cx={250} cy={140} r={27} value={TAU2} p={p} />
              <circle cx={250} cy={140} r={2.4} fill={INK} />
              <text x={250} y={202} textAnchor="middle" fontSize={9} fontWeight={600} fill={INK}>
                odcinek 2 · D_2 = 40 mm
              </text>
              <text x={250} y={218} textAnchor="middle" fontSize={8.5} fontWeight={600} fill={ORANGE}>
                τ_2 = 39,8 MPa
              </text>

              <line x1={338} y1={238} x2={338} y2={112} stroke={EDGE} strokeWidth={1} />
              {[0, 20, 40].map((value) => {
                const y = 238 - (value / TAU_DOP) * 110
                return (
                  <g key={value}>
                    <line x1={334} y1={y} x2={342} y2={y} stroke={EDGE} strokeWidth={1} />
                    <text x={330} y={y + 3} textAnchor="end" fontSize={8} fill={MUTED}>
                      {value}
                    </text>
                  </g>
                )
              })}
              <motion.rect
                x={354}
                y={238 - (TAU1 / TAU_DOP) * 110 * p}
                width={24}
                height={(TAU1 / TAU_DOP) * 110 * p}
                fill={BLUE}
                fillOpacity={0.28}
                stroke={BLUE}
                strokeWidth={1.2}
                initial={false}
                animate={{
                  y: 238 - (TAU1 / TAU_DOP) * 110 * p,
                  height: (TAU1 / TAU_DOP) * 110 * p,
                }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <motion.rect
                x={404}
                y={238 - (TAU2 / TAU_DOP) * 110 * p}
                width={24}
                height={(TAU2 / TAU_DOP) * 110 * p}
                fill={ORANGE}
                fillOpacity={0.3}
                stroke={ORANGE}
                strokeWidth={1.2}
                initial={false}
                animate={{
                  y: 238 - (TAU2 / TAU_DOP) * 110 * p,
                  height: (TAU2 / TAU_DOP) * 110 * p,
                }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <line x1={344} y1={128} x2={440} y2={128} stroke={RED} strokeWidth={1.2} strokeDasharray="5 4" />
              <text x={440} y={122} textAnchor="end" fontSize={8} fill={RED}>
                τ_dop = 40 MPa
              </text>
              <text x={366} y={254} textAnchor="middle" fontSize={8.5} fill={BLUE}>
                τ_1
              </text>
              <text x={416} y={254} textAnchor="middle" fontSize={8.5} fill={ORANGE}>
                τ_2
              </text>
              <text x={240} y={284} textAnchor="middle" fontSize={9} fill={MUTED}>
                cieńszy odcinek 2 jest wykorzystany niemal w całości
              </text>
            </g>
          )}

          {isTwist && (
            <g>
              <text x={14} y={20} fontSize={9} fill={MUTED}>
                kąt skręcenia · φ = T L/(G J_o)
              </text>
              <text x={14} y={34} fontSize={9} fill={MUTED}>
                przekrój obraca się tym bardziej, im mniejsza jest sztywność J_o
              </text>

              <SteppedShaft cy={132} r1={34} r2={23} p={p} />
              {stations.map((x) => {
                const r = x <= 270 ? 34 : 23
                const angle = phiAt(x) * EXAGGERATION * p
                const tipX = x + 6 * Math.sin(angle)
                const tipY = 132 - r * Math.cos(angle)
                return (
                  <g key={x}>
                    <ellipse
                      cx={x}
                      cy={132}
                      rx={6}
                      ry={r}
                      fill="none"
                      stroke={MUTED}
                      strokeWidth={0.7}
                      opacity={0.45}
                    />
                    <line
                      x1={x}
                      y1={132}
                      x2={tipX}
                      y2={tipY}
                      stroke={x <= 270 ? BLUE : ORANGE}
                      strokeWidth={2}
                      strokeLinecap="round"
                    />
                    <circle cx={tipX} cy={tipY} r={2.2} fill={x <= 270 ? BLUE : ORANGE} />
                  </g>
                )
              })}
              <line
                x1={420}
                y1={132 - 23}
                x2={420}
                y2={132 + 23}
                stroke={MUTED}
                strokeWidth={1}
                strokeDasharray="4 3"
              />
              <text x={432} y={84} fontSize={8.5} fill={GREEN}>
                φ = {pl(PHI_DEG, 2)}°
              </text>
              <text x={165} y={200} textAnchor="middle" fontSize={9} fontWeight={600} fill={BLUE}>
                φ_1 = 0,00393 rad
              </text>
              <text x={345} y={200} textAnchor="middle" fontSize={9} fontWeight={600} fill={ORANGE}>
                φ_2 = 0,01492 rad
              </text>
              <text x={240} y={232} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                znaczniki pokazują obrót przekroju; kąt jest powiększony na rysunku
              </text>
              <text x={240} y={262} textAnchor="middle" fontSize={9} fontWeight={600} fill={INK}>
                odcinek 2 skręca się prawie czterokrotnie mocniej
              </text>
              <text x={240} y={286} textAnchor="middle" fontSize={9} fill={MUTED}>
                mimo większej długości odcinka 1 decyduje mniejsza średnica odcinka 2
              </text>
            </g>
          )}

          {isTotal && (
            <g>
              <text x={14} y={20} fontSize={9} fill={MUTED}>
                suma kątów · φ = φ_1 + φ_2 · φ_dop = 1,2° = 0,020944 rad
              </text>

              <line x1={chartX0} y1={chartBase} x2={chartX1 + 10} y2={chartBase} stroke={EDGE} strokeWidth={1.1} />
              <line x1={chartX0} y1={chartBase} x2={chartX0} y2={chartTop - 8} stroke={EDGE} strokeWidth={1.1} />
              <text x={chartX1 + 16} y={chartBase + 4} fontSize={8.5} fill={MUTED}>
                x
              </text>
              <text x={chartX0 - 6} y={chartTop - 14} textAnchor="end" fontSize={8.5} fill={MUTED}>
                φ [rad]
              </text>
              {[0, 0.008, 0.016, 0.024].map((value) => {
                const y = yFor(value)
                return (
                  <g key={value}>
                    <line x1={chartX0 - 4} y1={y} x2={chartX0 + 4} y2={y} stroke={EDGE} strokeWidth={1} />
                    <text x={chartX0 - 8} y={y + 3} textAnchor="end" fontSize={7.5} fill={MUTED}>
                      {pl(value, 3)}
                    </text>
                  </g>
                )
              })}
              <line
                x1={stepX}
                y1={chartBase}
                x2={stepX}
                y2={chartTop - 4}
                stroke={MUTED}
                strokeWidth={0.9}
                strokeDasharray="4 4"
              />
              <text x={(chartX0 + stepX) / 2} y={chartBase + 16} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                L_1 = 0,8 m
              </text>
              <text x={(stepX + chartX1) / 2} y={chartBase + 16} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                L_2 = 0,6 m
              </text>

              <path
                d={`M ${chartX0} ${chartBase} L ${chartX0} ${yFor(0)} L ${stepX} ${yFor(PHI1)} L ${chartX1} ${totalY} L ${chartX1} ${chartBase} Z`}
                fill={GREEN}
                fillOpacity={0.08}
              />
              <motion.path
                d={`M ${chartX0} ${yFor(0)} L ${stepX} ${yFor(PHI1)} L ${chartX1} ${totalY}`}
                fill="none"
                stroke={GREEN}
                strokeWidth={2.6}
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: p }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <line
                x1={chartX0}
                y1={limitY}
                x2={chartX1}
                y2={limitY}
                stroke={ORANGE}
                strokeWidth={1.3}
                strokeDasharray="6 4"
              />
              <text x={chartX1} y={limitY - 6} textAnchor="end" fontSize={8.5} fill={ORANGE}>
                φ_dop = 0,020944 rad
              </text>
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: p > 0.7 ? 1 : 0 }} transition={{ duration: 0.2 }}>
                <circle cx={chartX1} cy={totalY} r={4.5} fill={GREEN} stroke="#fff" strokeWidth={1.2} />
                <text x={chartX1 - 8} y={totalY + 18} textAnchor="end" fontSize={9} fontWeight={600} fill={GREEN}>
                  φ = 0,01885 rad = 1,08°
                </text>
              </motion.g>
              <text x={(chartX0 + stepX) / 2} y={yFor(PHI1 / 2) - 6} textAnchor="middle" fontSize={8.5} fill={BLUE}>
                φ_1
              </text>
              <text
                x={(stepX + chartX1) / 2}
                y={(yFor(PHI1) + totalY) / 2 - 6}
                textAnchor="middle"
                fontSize={8.5}
                fill={ORANGE}
              >
                φ_2
              </text>
              <text x={240} y={300} textAnchor="middle" fontSize={9} fill={MUTED}>
                suma obu udziałów pozostaje poniżej kąta dopuszczalnego
              </text>
            </g>
          )}

          {isCheck && (
            <g>
              <text x={14} y={20} fontSize={9} fill={MUTED}>
                kontrola końcowa · τ_dop = 40 MPa · φ_dop = 1,2°
              </text>

              <SteppedShaft cy={80} r1={20} r2={14} p={1} highlight="second" />
              <text x={345} y={58} textAnchor="middle" fontSize={8.5} fontWeight={600} fill={ORANGE}>
                decyduje odcinek 2
              </text>

              <text x={196} y={146} fontSize={9} fontWeight={600} fill={INK}>
                wytrzymałość: τ_2 / τ_dop
              </text>
              <rect x={196} y={154} width={232} height={16} rx={8} fill="#edf1f5" />
              <motion.rect
                x={196}
                y={154}
                height={16}
                rx={8}
                fill={ORANGE}
                fillOpacity={0.28}
                stroke={ORANGE}
                strokeWidth={1.2}
                initial={false}
                animate={{ width: 232 * (TAU2 / TAU_DOP) * p }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <text x={196} y={186} fontSize={8.5} fill={ORANGE}>
                99,5% — blisko granicy, ale poniżej 100%
              </text>

              <text x={196} y={214} fontSize={9} fontWeight={600} fill={INK}>
                sztywność: φ / φ_dop
              </text>
              <rect x={196} y={222} width={232} height={16} rx={8} fill="#edf1f5" />
              <motion.rect
                x={196}
                y={222}
                height={16}
                rx={8}
                fill={VIOLET}
                fillOpacity={0.26}
                stroke={VIOLET}
                strokeWidth={1.2}
                initial={false}
                animate={{ width: 232 * (PHI_TOT / PHI_DOP) * p }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <text x={196} y={254} fontSize={8.5} fill={VIOLET}>
                90,0% — zapas około 10%
              </text>
              <line x1={428} y1={148} x2={428} y2={244} stroke={RED} strokeWidth={1.2} strokeDasharray="5 4" />
              <text x={428} y={142} textAnchor="end" fontSize={8} fill={RED}>
                100%
              </text>

              <text x={105} y={160} textAnchor="middle" fontSize={9} fontWeight={600} fill={GREEN}>
                ✓ oba warunki
              </text>
              <text x={105} y={176} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                τ_2 = 39,8 MPa
              </text>
              <text x={105} y={192} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                φ = 1,08°
              </text>
              <text x={240} y={286} textAnchor="middle" fontSize={9} fill={MUTED}>
                wymiary są poprawne; o naprężeniu decyduje cieńszy odcinek 2
              </text>
            </g>
          )}
        </svg>
      </div>
    </div>
  )
}
