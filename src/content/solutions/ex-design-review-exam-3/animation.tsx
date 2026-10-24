import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const BLUE = '#4f6df5'
const ORANGE = '#ff6b45'
const GREEN = '#2e9e6b'
const RED = '#d64545'
const MUTED = '#87929d'
const EDGE = '#68727e'
const INK = '#17202a'
const FILL = '#eef3fa'

const K = 150
const D_MIN = 58.8
const D = 60
const SIGMA = 141.5

const X0 = 60
const X1 = 430
const BEAM_Y = 88
const MID = (X0 + X1) / 2

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}
const pl = (value: number, digits = 1) => value.toFixed(digits).replace('.', ',')

function Beam({ p, reactions = false }: { p: number; reactions?: boolean }) {
  return (
    <g>
      <motion.line
        x1={X0}
        y1={BEAM_Y}
        x2={X1}
        y2={BEAM_Y}
        stroke="#556273"
        strokeWidth={5}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: p }}
        transition={{ duration: 0.12, ease: 'linear' }}
      />
      <path d={`M${X0 - 10} ${BEAM_Y + 16} L${X0} ${BEAM_Y + 2} L${X0 + 10} ${BEAM_Y + 16} Z`} fill={EDGE} />
      <path d={`M${X1 - 10} ${BEAM_Y + 16} L${X1} ${BEAM_Y + 2} L${X1 + 10} ${BEAM_Y + 16} Z`} fill={EDGE} />
      <text x={X0} y={BEAM_Y + 30} textAnchor="middle" fontSize={9} fill={EDGE}>
        A
      </text>
      <text x={X1} y={BEAM_Y + 30} textAnchor="middle" fontSize={9} fill={EDGE}>
        B
      </text>

      <motion.g initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
        <line x1={MID} y1={BEAM_Y - 36} x2={MID} y2={BEAM_Y - 5} stroke={ORANGE} strokeWidth={2.5} />
        <path
          d={`M${MID - 5} ${BEAM_Y - 14} L${MID} ${BEAM_Y - 5} L${MID + 5} ${BEAM_Y - 14}`}
          fill="none"
          stroke={ORANGE}
          strokeWidth={2.5}
        />
        <text x={MID} y={BEAM_Y - 42} textAnchor="middle" fontSize={9.5} fontWeight={600} fill={ORANGE}>
          P = 6 kN
        </text>
      </motion.g>

      {reactions && (
        <g stroke={GREEN} fill={GREEN}>
          <line x1={X0} y1={BEAM_Y + 46} x2={X0} y2={BEAM_Y + 8} strokeWidth={2.2} />
          <path
            d={`M${X0 - 4} ${BEAM_Y + 18} L${X0} ${BEAM_Y + 7} L${X0 + 4} ${BEAM_Y + 18}`}
            fill="none"
            strokeWidth={2.2}
          />
          <text x={X0} y={BEAM_Y + 60} textAnchor="middle" fontSize={8.5} stroke="none">
            R_A = 3 kN
          </text>
          <line x1={X1} y1={BEAM_Y + 46} x2={X1} y2={BEAM_Y + 8} strokeWidth={2.2} />
          <path
            d={`M${X1 - 4} ${BEAM_Y + 18} L${X1} ${BEAM_Y + 7} L${X1 + 4} ${BEAM_Y + 18}`}
            fill="none"
            strokeWidth={2.2}
          />
          <text x={X1} y={BEAM_Y + 60} textAnchor="middle" fontSize={8.5} stroke="none">
            R_B = 3 kN
          </text>
        </g>
      )}
    </g>
  )
}

export function DesignReviewExam3Animation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'loads'
  const p = playing ? smooth(sceneProgress) : 1
  const isLoads = metric === 'loads'
  const isShear = metric === 'shear'
  const isMoment = metric === 'moment'
  const isDesign = metric === 'design'
  const isStress = metric === 'stress'
  const isCheck = metric === 'check'

  const grow = smooth(clamp01((p - 0.12) / 0.88))
  const dNow = 0.6 + (D - 0.6) * grow
  const radius = (dNow / 2) * 1.9
  const requiredRadius = (D_MIN / 2) * 1.9
  const chosenRadius = (D / 2) * 1.9

  const dAxisX0 = 296
  const dAxisX1 = 452
  const dAxis = (value: number) => dAxisX0 + (value / 70) * (dAxisX1 - dAxisX0)

  const levels = [115, 128, 141, 154, 167, 180, 193, 206]
  const stressAt = (y: number) => ((y - 168) / 55) * SIGMA

  const safetyX0 = 200
  const safetyX1 = 440
  const safety = (value: number) => safetyX0 + (value / 70) * (safetyX1 - safetyX0)

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 480 340"
          role="img"
          aria-label="Belka swobodnie podparta obciążona siłą 6 kN. Animacja pokazuje reakcje, siłę tnącą, moment 3 kN·m, poprawkę jednostek przy doborze średnicy 60 mm oraz kontrolę naprężeń i rzędu wielkości."
        >
          <defs>
            <marker id="dr3-load" viewBox="0 0 10 10" refX={8} refY={5} markerWidth={5} markerHeight={5} orient="auto">
              <path d="M0 0 L10 5 L0 10 Z" fill={ORANGE} />
            </marker>
            <marker
              id="dr3-stress"
              viewBox="0 0 10 10"
              refX={8}
              refY={5}
              markerWidth={5}
              markerHeight={5}
              orient="auto"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={BLUE} />
            </marker>
            <marker id="dr3-comp" viewBox="0 0 10 10" refX={8} refY={5} markerWidth={5} markerHeight={5} orient="auto">
              <path d="M0 0 L10 5 L0 10 Z" fill={RED} />
            </marker>
          </defs>

          {isLoads && (
            <g>
              <text x={14} y={20} fontSize={9} fill={MUTED}>
                belka swobodnie podparta · P = 6 kN · L = 2 m
              </text>
              <text x={14} y={34} fontSize={9} fill={MUTED}>
                k = 150 MPa · przekrój kołowy, średnica nieznana
              </text>
              <Beam p={p} />
              <line x1={X0} y1={BEAM_Y + 78} x2={X1} y2={BEAM_Y + 78} stroke={MUTED} strokeWidth={1} />
              <line x1={X0} y1={BEAM_Y + 72} x2={X0} y2={BEAM_Y + 84} stroke={MUTED} strokeWidth={1} />
              <line x1={X1} y1={BEAM_Y + 72} x2={X1} y2={BEAM_Y + 84} stroke={MUTED} strokeWidth={1} />
              <text x={MID} y={BEAM_Y + 92} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                L = 2 m
              </text>
              <text x={MID} y={BEAM_Y + 118} textAnchor="middle" fontSize={9} fill={MUTED}>
                siła działa w środku rozpiętości, więc układ jest symetryczny
              </text>
              <text x={MID} y={BEAM_Y + 140} textAnchor="middle" fontSize={9} fill={MUTED}>
                najpierw reakcje, potem siła tnąca i moment
              </text>
            </g>
          )}

          {isShear && (
            <g>
              <text x={14} y={20} fontSize={9} fill={MUTED}>
                reakcje i siła tnąca · R_A = R_B = 3 kN
              </text>
              <Beam p={1} reactions />
              <text x={MID} y={BEAM_Y + 92} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                T = R_A = 3 kN po lewej stronie siły
              </text>

              <line x1={X0} y1={212} x2={X1} y2={212} stroke={EDGE} strokeWidth={1.1} />
              <path d={`M ${X1} 212 L ${X1 - 8} 208 L ${X1 - 8} 216 Z`} fill={EDGE} />
              <text x={X1 + 6} y={216} fontSize={8.5} fill={MUTED}>
                x
              </text>
              <text x={X0 - 8} y={200} textAnchor="end" fontSize={9} fontWeight={700} fill={BLUE}>
                T
              </text>

              <rect x={X0} y={178} width={(MID - X0) * p} height={34} fill={BLUE} fillOpacity={0.12} />
              <rect x={MID} y={212} width={(X1 - MID) * p} height={34} fill={BLUE} fillOpacity={0.12} />
              <motion.path
                d={`M ${X0} 178 L ${MID} 178 L ${MID} 246 L ${X1} 246`}
                fill="none"
                stroke={BLUE}
                strokeWidth={2.4}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: p }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <line x1={MID} y1={178} x2={MID} y2={246} stroke={MUTED} strokeWidth={1} strokeDasharray="4 4" />
              <text x={MID - 8} y={172} textAnchor="end" fontSize={9} fontWeight={600} fill={BLUE}>
                T = +3 kN
              </text>
              <text x={MID + 8} y={260} fontSize={9} fontWeight={600} fill={BLUE}>
                T = −3 kN
              </text>
              <text x={MID} y={292} textAnchor="middle" fontSize={9} fill={MUTED}>
                siła tnąca zmienia znak pod siłą, więc moment osiąga ekstremum
              </text>
            </g>
          )}

          {isMoment && (
            <g>
              <text x={14} y={20} fontSize={9} fill={MUTED}>
                moment zginający · M_max = 3 kN·m
              </text>
              <Beam p={1} reactions />
              <line x1={X0} y1={306} x2={X1 + 12} y2={306} stroke={EDGE} strokeWidth={1.1} />
              <path d={`M ${X1 + 12} 306 L ${X1 + 4} 302 L ${X1 + 4} 310 Z`} fill={EDGE} />
              <text x={X1 + 18} y={310} fontSize={8.5} fill={MUTED}>
                x
              </text>
              <text x={X0 - 8} y={248} textAnchor="end" fontSize={9} fontWeight={700} fill={ORANGE}>
                M
              </text>

              <path d={`M ${X0} 306 L ${MID} 246 L ${X1} 306 Z`} fill={ORANGE} fillOpacity={0.1} />
              <motion.path
                d={`M ${X0} 306 L ${MID} 246 L ${X1} 306`}
                fill="none"
                stroke={ORANGE}
                strokeWidth={2.6}
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: p }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: p > 0.65 ? 1 : 0 }} transition={{ duration: 0.2 }}>
                <circle cx={MID} cy={246} r={4.5} fill={ORANGE} stroke="#fff" strokeWidth={1.2} />
                <text x={MID + 9} y={242} fontSize={9.5} fontWeight={600} fill={ORANGE}>
                  M_max = 3 kN·m
                </text>
              </motion.g>
              <line x1={MID} y1={246} x2={MID} y2={306} stroke={MUTED} strokeWidth={1} strokeDasharray="4 4" />
              <text x={MID} y={326} textAnchor="middle" fontSize={9} fill={MUTED}>
                maksimum wypada pod siłą, a nie na podporach
              </text>
            </g>
          )}

          {isDesign && (
            <g>
              <text x={14} y={20} fontSize={9} fill={MUTED}>
                dobór średnicy · M = 3 kN·m · k = 150 MPa
              </text>
              <text x={14} y={34} fontSize={9} fill={MUTED}>
                średnica wynika z warunku σ = M/W ≤ k; porównujemy wynik z minimum
              </text>

              <motion.circle
                cx={140}
                cy={176}
                fill="#edf1ff"
                fillOpacity={0.85}
                stroke={grow > 0.85 ? GREEN : INK}
                strokeWidth={1.8}
                initial={false}
                animate={{ r: radius }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <circle
                cx={140}
                cy={176}
                r={requiredRadius}
                fill="none"
                stroke={ORANGE}
                strokeWidth={1.4}
                strokeDasharray="5 4"
              />
              <circle cx={140} cy={176} r={chosenRadius} fill="none" stroke={GREEN} strokeWidth={1.4} opacity={0.7} />
              <line
                x1={140 - requiredRadius - 14}
                y1={176}
                x2={140 + requiredRadius + 14}
                y2={176}
                stroke={MUTED}
                strokeWidth={0.8}
                strokeDasharray="4 4"
              />
              <line
                x1={140}
                y1={176 - requiredRadius - 14}
                x2={140}
                y2={176 + requiredRadius + 14}
                stroke={MUTED}
                strokeWidth={0.8}
                strokeDasharray="4 4"
              />
              <text
                x={140}
                y={176 + requiredRadius + 28}
                textAnchor="middle"
                fontSize={9.5}
                fontWeight={600}
                fill={grow > 0.85 ? GREEN : INK}
              >
                d = {pl(dNow)} mm
              </text>
              <text x={140} y={176 - requiredRadius - 20} textAnchor="middle" fontSize={8.5} fill={ORANGE}>
                wymagane 58,8 mm
              </text>

              <motion.g initial={{ opacity: 0 }} animate={{ opacity: p < 0.28 ? 1 : 0 }} transition={{ duration: 0.2 }}>
                <circle
                  cx={140}
                  cy={176}
                  r={17}
                  fill="#fff"
                  fillOpacity={0.9}
                  stroke={RED}
                  strokeWidth={1.2}
                  strokeDasharray="3 3"
                />
                <circle cx={140} cy={176} r={2.4} fill={RED} />
                <text x={140} y={128} textAnchor="middle" fontSize={8.5} fontWeight={600} fill={RED}>
                  0,6 mm — poza skalą
                </text>
              </motion.g>

              <line x1={dAxisX0} y1={206} x2={dAxisX1} y2={206} stroke="#c9d0d9" strokeWidth={1.1} />
              {[0, 20, 40, 60, 70].map((value) => (
                <g key={value}>
                  <line x1={dAxis(value)} y1={202} x2={dAxis(value)} y2={210} stroke="#c9d0d9" strokeWidth={1} />
                  <text x={dAxis(value)} y={222} textAnchor="middle" fontSize={8} fill={MUTED}>
                    {value}
                  </text>
                </g>
              ))}
              <text x={dAxisX1} y={238} textAnchor="end" fontSize={8.5} fill={MUTED}>
                d [mm]
              </text>
              <line
                x1={dAxis(D_MIN)}
                y1={188}
                x2={dAxis(D_MIN)}
                y2={210}
                stroke={ORANGE}
                strokeWidth={1.3}
                strokeDasharray="4 3"
              />
              <line x1={dAxis(D)} y1={188} x2={dAxis(D)} y2={210} stroke={GREEN} strokeWidth={1.6} />
              <motion.circle
                cx={dAxis(dNow)}
                cy={206}
                r={4.5}
                fill={grow > 0.85 ? GREEN : INK}
                stroke="#fff"
                strokeWidth={1.2}
                initial={false}
                animate={{ cx: dAxis(dNow) }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <text x={dAxis(D_MIN)} y={182} textAnchor="middle" fontSize={8} fill={ORANGE}>
                58,8
              </text>
              <text x={dAxis(D)} y={268} textAnchor="middle" fontSize={8.5} fontWeight={600} fill={GREEN}>
                d = 60 mm
              </text>
              <text x={140} y={294} textAnchor="middle" fontSize={9} fill={MUTED}>
                porównanie skali: od nierealnego wymiaru do poprawnej średnicy
              </text>
            </g>
          )}

          {isStress && (
            <g>
              <text x={14} y={20} fontSize={9} fill={MUTED}>
                kontrola naprężeń · d = 60 mm · σ_max = 141,5 MPa
              </text>
              <text x={14} y={34} fontSize={9} fill={MUTED}>
                naprężenie pozostaje poniżej k = 150 MPa
              </text>

              <circle cx={130} cy={168} r={55} fill={FILL} stroke={EDGE} strokeWidth={1.7} />
              <line
                x1={130 - 67}
                y1={168}
                x2={130 + 67}
                y2={168}
                stroke={ORANGE}
                strokeWidth={1.1}
                strokeDasharray="6 4"
              />
              <text x={130} y={101} textAnchor="middle" fontSize={8.5} fill={ORANGE}>
                oś obojętna
              </text>
              {levels.map((y) => {
                const value = stressAt(y)
                const tip = 130 + (value / K) * 68 * p
                return (
                  <line
                    key={y}
                    x1={130}
                    y1={y}
                    x2={tip}
                    y2={y}
                    stroke={value >= 0 ? BLUE : RED}
                    strokeWidth={1.5}
                    markerEnd={
                      Math.abs(tip - 130) > 6 ? (value >= 0 ? 'url(#dr3-stress)' : 'url(#dr3-comp)') : undefined
                    }
                  />
                )
              })}
              <text x={130} y={242} textAnchor="middle" fontSize={9} fontWeight={600} fill={INK}>
                σ_max = 141,5 MPa
              </text>
              <text x={130} y={258} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                rozkład liniowy od osi obojętnej
              </text>

              <text x={240} y={128} fontSize={9} fontWeight={600} fill={INK}>
                wykorzystanie granicy
              </text>
              <rect x={240} y={140} width={192} height={18} rx={9} fill="#edf1f5" />
              <motion.rect
                x={240}
                y={140}
                height={18}
                rx={9}
                fill={GREEN}
                fillOpacity={0.32}
                stroke={GREEN}
                strokeWidth={1.2}
                initial={false}
                animate={{ width: 192 * (SIGMA / K) * p }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <line x1={432} y1={134} x2={432} y2={164} stroke={ORANGE} strokeWidth={1.4} />
              <text x={432} y={128} textAnchor="end" fontSize={8} fill={ORANGE}>
                k = 150 MPa
              </text>
              <text x={240} y={188} fontSize={9.5} fontWeight={600} fill={GREEN}>
                η = 94,3% ≤ 100%
              </text>
              <text x={240} y={208} fontSize={8.5} fill={MUTED}>
                zapas względem k wynosi około 6%
              </text>
              <text x={240} y={234} fontSize={9} fontWeight={600} fill={GREEN}>
                ✓ σ ≤ k
              </text>
              <text x={240} y={258} fontSize={8.5} fill={MUTED}>
                60 mm jest najmniejszym wymiarem z szeregu większym od 58,8 mm
              </text>
              <text x={240} y={300} textAnchor="middle" fontSize={9} fill={MUTED}>
                warunek wytrzymałości jest spełniony, ale zapas jest niewielki
              </text>
            </g>
          )}

          {isCheck && (
            <g>
              <text x={14} y={20} fontSize={9} fill={MUTED}>
                decyzja i kontrola rzędu wielkości · M = 3 kN·m · k = 150 MPa
              </text>

              <circle cx={105} cy={170} r={45} fill={FILL} stroke={GREEN} strokeWidth={1.8} />
              <line x1={55} y1={170} x2={155} y2={170} stroke={INK} strokeWidth={0.9} strokeDasharray="5 4" />
              <line x1={105} y1={120} x2={105} y2={220} stroke={INK} strokeWidth={0.9} strokeDasharray="5 4" />
              <text x={105} y={175} textAnchor="middle" fontSize={9} fontWeight={600} fill={INK}>
                d = 60
              </text>
              <text x={105} y={242} textAnchor="middle" fontSize={9} fontWeight={600} fill={GREEN}>
                σ = 141,5 MPa
              </text>
              <text x={105} y={258} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                σ ≤ k = 150 MPa
              </text>

              <text x={200} y={132} fontSize={9} fontWeight={600} fill={INK}>
                skala średnic: od błędu do poprawnego wymiaru
              </text>
              <line x1={safetyX0} y1={196} x2={safetyX1} y2={196} stroke="#c9d0d9" strokeWidth={1.1} />
              {[0, 20, 40, 60, 70].map((value) => (
                <g key={value}>
                  <line x1={safety(value)} y1={192} x2={safety(value)} y2={200} stroke="#c9d0d9" strokeWidth={1} />
                  <text x={safety(value)} y={212} textAnchor="middle" fontSize={8} fill={MUTED}>
                    {value}
                  </text>
                </g>
              ))}
              <text x={safetyX1} y={228} textAnchor="end" fontSize={8.5} fill={MUTED}>
                d [mm]
              </text>

              <motion.circle
                cx={safety(0.6)}
                cy={196}
                r={5}
                fill={RED}
                stroke="#fff"
                strokeWidth={1.2}
                initial={false}
                animate={{ opacity: p > 0.3 ? 1 : 0 }}
                transition={{ duration: 0.2 }}
              />
              <text x={safety(0.6) + 8} y={180} fontSize={8.5} fontWeight={600} fill={RED}>
                0,6 mm — absurd
              </text>

              <motion.g initial={{ opacity: 0 }} animate={{ opacity: p > 0.6 ? 1 : 0 }} transition={{ duration: 0.2 }}>
                <circle cx={safety(D)} cy={196} r={5} fill={GREEN} stroke="#fff" strokeWidth={1.2} />
                <text x={safety(D)} y={180} textAnchor="middle" fontSize={8.5} fontWeight={600} fill={GREEN}>
                  60 mm — poprawnie
                </text>
                <circle cx={safety(D)} cy={196} r={13} fill="none" stroke={GREEN} strokeWidth={1.6} />
                <path
                  d={`M ${safety(D) - 6} 196 L ${safety(D) - 1} 201 L ${safety(D) + 7} 189`}
                  fill="none"
                  stroke={GREEN}
                  strokeWidth={2}
                />
              </motion.g>

              <text x={200} y={254} fontSize={9} fontWeight={600} fill={GREEN}>
                ✓ d = 60 mm spełnia σ ≤ k
              </text>
              <text x={200} y={274} fontSize={8.5} fill={MUTED}>
                0,6 mm nie jest realnym wymiarem belki
              </text>
              <text x={240} y={304} textAnchor="middle" fontSize={9} fill={MUTED}>
                kontrola rzędu wielkości jest częścią poprawnego rozwiązania
              </text>
            </g>
          )}
        </svg>
      </div>
    </div>
  )
}
