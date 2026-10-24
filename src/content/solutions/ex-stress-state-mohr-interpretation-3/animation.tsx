import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const LOAD = '#ff6b45'
const VIOLET = '#a970dd'
const GREEN = '#2e9e6b'
const BAD = '#d64545'
const MUTED = '#87929d'
const EDGE = '#68727e'
const INK = '#17202a'
const LIGHT = '#eef2fb'

const RE = 235
const N_REQ = 2.5
const SIGMA_DOP = RE / N_REQ

const SCALE = 1.75
const AXIS_Y = 152
const MOHS = (value: number) => 258 + (value + 10) * SCALE
const MOHT = (value: number) => AXIS_Y - value * SCALE

type Candidate = {
  d: number
  sigmaX: number
  tau: number
  avg: number
  radius: number
  s1: number
  s2: number
  hmh: number
  n: number
}

const makeCandidate = (d: number, sigmaX: number, tau: number): Candidate => {
  const avg = sigmaX / 2
  const radius = Math.sqrt(avg ** 2 + tau ** 2)
  const hmh = Math.sqrt(sigmaX ** 2 + 3 * tau ** 2)
  return {
    d,
    sigmaX,
    tau,
    avg,
    radius,
    s1: avg + radius,
    s2: avg - radius,
    hmh,
    n: RE / hmh,
  }
}

const D55 = makeCandidate(55, 86.1, 24.49)
const D56 = makeCandidate(56, 81.79, 23.2)

const clamp01 = (value: number) => Math.max(0, Math.min(1, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}
const pl = (value: number, digits = 2) => value.toFixed(digits).replace('.', ',')

const CX = 113
const CY = 210
const SEC_R = 38
const A_ANGLE = (-55 * Math.PI) / 180
const AX = CX + SEC_R * Math.cos(A_ANGLE)
const AY = CY + SEC_R * Math.sin(A_ANGLE)

function CrossSection({
  label,
  tone,
  sigmaText,
  playing,
}: {
  label: string
  tone: string
  sigmaText: string
  playing: boolean
}) {
  return (
    <g>
      <text x={14} y={68} fontSize={8.5} fill={MUTED}>
        punkt A na obwodzie przekroju
      </text>
      <circle cx={CX} cy={CY} r={SEC_R} fill={LIGHT} stroke={EDGE} strokeWidth={1.4} />
      <line x1={CX - SEC_R} y1={CY} x2={CX + SEC_R} y2={CY} stroke={MUTED} strokeWidth={0.8} />
      <line x1={CX} y1={CY - SEC_R} x2={CX} y2={CY + SEC_R} stroke={MUTED} strokeWidth={0.8} />
      <line x1={CX - SEC_R - 8} y1={CY + 18} x2={CX + SEC_R + 8} y2={CY + 18} stroke={MUTED} strokeWidth={1} />
      <line x1={CX - SEC_R - 8} y1={CY + 13} x2={CX - SEC_R - 8} y2={CY + 23} stroke={MUTED} strokeWidth={1} />
      <line x1={CX + SEC_R + 8} y1={CY + 13} x2={CX + SEC_R + 8} y2={CY + 23} stroke={MUTED} strokeWidth={1} />
      <text x={CX} y={CY + SEC_R + 18} textAnchor="middle" fontSize={9} fontWeight={700} fill={tone}>
        {label}
      </text>
      <motion.circle
        cx={AX}
        cy={AY}
        r={5}
        fill={LOAD}
        fillOpacity={0.22}
        stroke={LOAD}
        strokeWidth={1.2}
        animate={{ opacity: playing ? [0.45, 1, 0.45] : 1 }}
        transition={{ duration: 1.6, repeat: playing ? Infinity : 0, ease: 'easeInOut' }}
      />
      <circle cx={AX} cy={AY} r={2.4} fill={LOAD} />
      <text x={AX + 8} y={AY - 4} fontSize={9} fontWeight={700} fill={LOAD}>
        A
      </text>
      <text x={CX} y={CY + SEC_R + 32} textAnchor="middle" fontSize={8} fill={MUTED}>
        σx = {sigmaText} MPa
      </text>
    </g>
  )
}

function CandidateCircle({
  candidate,
  progress,
  playing,
  pass,
}: {
  candidate: Candidate
  progress: number
  playing: boolean
  pass: boolean
}) {
  const tone = pass ? GREEN : BAD
  const cx = MOHS(candidate.avg)
  const radiusPx = candidate.radius * SCALE
  const circumference = 2 * Math.PI * radiusPx
  const xPoint = MOHS(candidate.sigmaX)
  const yPoint = MOHT(candidate.tau)
  const s1x = MOHS(candidate.s1)
  const s2x = MOHS(candidate.s2)
  const hmhX = MOHS(candidate.hmh)
  const allowX = MOHS(SIGMA_DOP)
  const label = pass ? 'σHMH < σdop' : 'σHMH > σdop'

  return (
    <g>
      <text x={250} y={56} fontSize={9} fontWeight={700} fill={INK}>
        koło Mohra dla d = {candidate.d} mm
      </text>
      <line x1={246} y1={AXIS_Y} x2={460} y2={AXIS_Y} stroke={MUTED} strokeWidth={1} />
      <line x1={MOHS(0)} y1={56} x2={MOHS(0)} y2={252} stroke={MUTED} strokeWidth={1} />
      <text x={458} y={AXIS_Y - 7} textAnchor="end" fontSize={8.5} fill={MUTED}>
        σ [MPa]
      </text>
      <text x={MOHS(0) + 6} y={66} fontSize={8.5} fill={MUTED}>
        τ [MPa]
      </text>

      <line x1={allowX} y1={64} x2={allowX} y2={244} stroke={GREEN} strokeWidth={1.2} strokeDasharray="5 4" />
      <text x={allowX} y={74} textAnchor="middle" fontSize={8} fill={GREEN}>
        σdop = 94
      </text>

      <motion.circle
        cx={cx}
        cy={AXIS_Y}
        r={radiusPx}
        fill={ACCENT}
        fillOpacity={0.05}
        stroke={ACCENT}
        strokeWidth={2}
        strokeDasharray={circumference}
        initial={false}
        animate={{ strokeDashoffset: circumference * (1 - progress) }}
        transition={{ duration: 0.12, ease: 'linear' }}
      />
      <circle cx={cx} cy={AXIS_Y} r={2.6} fill={EDGE} />
      <text x={cx} y={AXIS_Y + 34} textAnchor="middle" fontSize={8.5} fill={MUTED}>
        σavg = {pl(candidate.avg)}
      </text>

      <line x1={cx} y1={AXIS_Y} x2={s1x} y2={AXIS_Y} stroke={ACCENT} strokeWidth={1.8} />
      <text x={(cx + s1x) / 2} y={AXIS_Y - 10} textAnchor="middle" fontSize={8} fill={ACCENT}>
        R = {pl(candidate.radius)}
      </text>

      <line x1={xPoint} y1={AXIS_Y} x2={xPoint} y2={yPoint} stroke={MUTED} strokeWidth={1} strokeDasharray="3 3" />
      <line x1={MOHS(0)} y1={yPoint} x2={xPoint} y2={yPoint} stroke={MUTED} strokeWidth={1} strokeDasharray="3 3" />
      <motion.circle
        cx={xPoint}
        cy={yPoint}
        r={4}
        fill={LOAD}
        animate={{ opacity: playing ? [0.6, 1, 0.6] : 1 }}
        transition={{ duration: 1.5, repeat: playing ? Infinity : 0, ease: 'easeInOut' }}
      />
      <text x={xPoint + 7} y={yPoint - 4} fontSize={8} fill={LOAD}>
        X
      </text>

      <line x1={s2x} y1={AXIS_Y - 5} x2={s2x} y2={AXIS_Y + 5} stroke={EDGE} strokeWidth={1.4} />
      <line x1={s1x} y1={AXIS_Y - 5} x2={s1x} y2={AXIS_Y + 5} stroke={EDGE} strokeWidth={1.4} />
      <text x={s2x} y={AXIS_Y + 18} textAnchor="middle" fontSize={8} fill={EDGE}>
        σ2 = {pl(candidate.s2)}
      </text>
      <text x={s1x} y={AXIS_Y + 18} textAnchor="middle" fontSize={8} fill={EDGE}>
        σ1 = {pl(candidate.s1)}
      </text>

      <line x1={hmhX} y1={AXIS_Y - 6} x2={hmhX} y2={AXIS_Y + 6} stroke={tone} strokeWidth={2} />
      <motion.circle
        cx={hmhX}
        cy={AXIS_Y}
        r={4.2}
        fill={tone}
        animate={{ opacity: playing ? [0.55, 1, 0.55] : 1 }}
        transition={{ duration: 1.4, repeat: playing ? Infinity : 0, ease: 'easeInOut' }}
      />
      <text x={250} y={250} fontSize={8.5} fontWeight={700} fill={tone}>
        σHMH = {pl(candidate.hmh)} MPa
      </text>
      <text x={250} y={270} fontSize={8.5} fill={tone}>
        {label} · n = {pl(candidate.n)} {pass ? '≥' : '<'} 2,5
      </text>
    </g>
  )
}

export function MohrInterpretationExample3Animation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const progress = playing ? smooth(sceneProgress) : 1
  const isModel = metric === 'model'
  const isAllowable = metric === 'allowable'
  const isTrial55 = metric === 'trial55'
  const isTrial56 = metric === 'trial56'
  const isDecision = metric === 'decision'
  const showCandidate = isTrial55 || isTrial56 || isDecision
  const candidate = isTrial55 ? D55 : D56

  const barScale = 170 / (100 - 85)
  const bar55 = (D55.hmh - 85) * barScale
  const bar56 = (D56.hmh - 85) * barScale
  const barAllow = (SIGMA_DOP - 85) * barScale

  const modelTrack = 180
  const modelScale = modelTrack / 4
  const reqX = 250 + N_REQ * modelScale

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 480 300"
          role="img"
          aria-label="Dobór średnicy pręta przy złożonym obciążeniu. Animacja pokazuje naprężenie dopuszczalne, koła Mohra dla średnic 55 i 56 mm oraz porównanie z wymaganym współczynnikiem bezpieczeństwa."
        >
          <defs>
            <marker
              id="mohr3-load"
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
              id="mohr3-violet"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={VIOLET} />
            </marker>
          </defs>

          <text x={14} y={20} fontSize={10} fontWeight={700} fill={INK}>
            dobór średnicy pręta
          </text>
          <text x={14} y={34} fontSize={8.5} fill={MUTED}>
            N = 30 kN · M = 1,2 kN·m
          </text>
          <text x={14} y={48} fontSize={8.5} fill={MUTED}>
            T = 800 N·m · R_e = 235 MPa · n ≥ 2,5
          </text>

          {isModel && (
            <g>
              <rect x={95} y={78} width={36} height={70} rx={4} fill={LIGHT} stroke={EDGE} strokeWidth={1.4} />
              <line x1={CX} y1={78} x2={CX} y2={148} stroke={ACCENT} strokeWidth={0.8} strokeDasharray="3 3" />
              <line x1={CX} y1={72} x2={CX} y2={54} stroke={LOAD} strokeWidth={2.2} markerEnd="url(#mohr3-load)" />
              <text x={CX + 8} y={64} fontSize={9} fill={LOAD}>
                N
              </text>
              <path
                d="M 94 92 C 76 82, 76 108, 94 100"
                fill="none"
                stroke={VIOLET}
                strokeWidth={1.8}
                markerEnd="url(#mohr3-violet)"
              />
              <text x={66} y={96} fontSize={9} fill={VIOLET}>
                M
              </text>
              <path
                d="M 133 116 C 153 108, 153 138, 133 130"
                fill="none"
                stroke={LOAD}
                strokeWidth={1.8}
                markerEnd="url(#mohr3-load)"
              />
              <text x={156} y={128} fontSize={9} fill={LOAD}>
                T
              </text>
              <text x={142} y={94} fontSize={8} fill={MUTED}>
                obciążenie
              </text>
              <circle cx={CX} cy={CY} r={SEC_R} fill={LIGHT} stroke={MUTED} strokeWidth={1.2} strokeDasharray="5 4" />
              <line x1={CX - SEC_R} y1={CY} x2={CX + SEC_R} y2={CY} stroke={MUTED} strokeWidth={0.8} />
              <line x1={CX} y1={CY - SEC_R} x2={CX} y2={CY + SEC_R} stroke={MUTED} strokeWidth={0.8} />
              <text x={CX} y={CY + 2} textAnchor="middle" fontSize={11} fontWeight={700} fill={MUTED}>
                d = ?
              </text>
              <text x={CX} y={CY + SEC_R + 16} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                średnica do wyznaczenia
              </text>
            </g>
          )}

          {showCandidate && (
            <CrossSection
              label={`d = ${candidate.d} mm`}
              tone={isTrial55 ? BAD : GREEN}
              sigmaText={isTrial55 ? '86,10' : '81,79'}
              playing={playing}
            />
          )}

          {isAllowable && (
            <g>
              <text x={14} y={68} fontSize={8.5} fill={MUTED}>
                szukana średnica przekroju
              </text>
              <circle cx={CX} cy={CY} r={SEC_R} fill={LIGHT} stroke={MUTED} strokeWidth={1.2} strokeDasharray="5 4" />
              <line x1={CX - SEC_R} y1={CY} x2={CX + SEC_R} y2={CY} stroke={MUTED} strokeWidth={0.8} />
              <line x1={CX} y1={CY - SEC_R} x2={CX} y2={CY + SEC_R} stroke={MUTED} strokeWidth={0.8} />
              <text x={CX} y={CY + 2} textAnchor="middle" fontSize={11} fontWeight={700} fill={MUTED}>
                d = ?
              </text>
              <text x={CX} y={CY + SEC_R + 16} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                σ_HMH ≤ 94 MPa
              </text>
            </g>
          )}

          {isModel && (
            <g>
              <text x={250} y={64} fontSize={9.5} fontWeight={700} fill={INK}>
                wymaganie projektowe
              </text>
              <rect x={250} y={92} width={modelTrack} height={16} rx={8} fill="#edf1f5" />
              <rect
                x={reqX}
                y={92}
                width={250 + modelTrack - reqX}
                height={16}
                rx={8}
                fill={GREEN}
                fillOpacity={0.16}
              />
              <line x1={reqX} y1={84} x2={reqX} y2={116} stroke={GREEN} strokeWidth={1.5} />
              <text x={reqX} y={78} textAnchor="middle" fontSize={8.5} fill={GREEN}>
                n_req = 2,5
              </text>
              <text x={250} y={130} fontSize={8.5} fill={MUTED}>
                0
              </text>
              <text x={250 + modelTrack} y={130} textAnchor="end" fontSize={8.5} fill={MUTED}>
                4
              </text>
              <text x={250} y={160} fontSize={9} fill={INK}>
                szukane: średnica d
              </text>
              <text x={250} y={178} fontSize={8.5} fill={MUTED}>
                najpierw σ_dop, potem σ_HMH(d)
              </text>
              <text x={250} y={196} fontSize={8.5} fill={MUTED}>
                i kontrola n = R_e/σ_HMH ≥ 2,5
              </text>
              <text x={250} y={224} fontSize={9} fill={ACCENT}>
                zadanie odwrotne: od wyniku do danych
              </text>
            </g>
          )}

          {isAllowable && (
            <g>
              <text x={250} y={74} fontSize={9.5} fontWeight={700} fill={INK}>
                naprężenie dopuszczalne
              </text>

              <text x={250} y={102} fontSize={8.5} fill={MUTED}>
                R_e = 235 MPa
              </text>
              <rect x={250} y={108} width={180} height={16} rx={8} fill="#edf1f5" />
              <rect
                x={250}
                y={108}
                width={180}
                height={16}
                rx={8}
                fill={MUTED}
                fillOpacity={0.25}
                stroke={MUTED}
                strokeWidth={1}
              />
              <text x={434} y={120} fontSize={8.5} fill={MUTED}>
                235
              </text>

              <text x={250} y={144} fontSize={8.5} fill={GREEN}>
                σdop = R_e / n = 94 MPa
              </text>
              <rect x={250} y={150} width={180} height={16} rx={8} fill="#edf1f5" />
              <motion.rect
                x={250}
                y={150}
                height={16}
                rx={8}
                fill={GREEN}
                fillOpacity={0.24}
                stroke={GREEN}
                strokeWidth={1.2}
                initial={false}
                animate={{ width: (SIGMA_DOP / RE) * 180 * progress }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <text x={250 + (SIGMA_DOP / RE) * 180 + 8} y={162} fontSize={8.5} fontWeight={700} fill={GREEN}>
                94
              </text>

              <line x1={250} y1={190} x2={450} y2={190} stroke="#dde3ea" strokeWidth={1} />
              <text x={250} y={210} fontSize={9} fill={INK}>
                R_e / 2,5 = 235 / 2,5 = 94 MPa
              </text>
              <text x={250} y={228} fontSize={8.5} fill={MUTED}>
                teraz szukamy d, dla którego σ_HMH ≤ 94 MPa
              </text>
              <text x={250} y={250} fontSize={8.5} fill={LOAD}>
                mniejsza średnica daje większe naprężenie
              </text>
            </g>
          )}

          {isTrial55 && <CandidateCircle candidate={D55} progress={progress} playing={playing} pass={false} />}
          {isTrial56 && <CandidateCircle candidate={D56} progress={progress} playing={playing} pass />}

          {isDecision && (
            <g>
              <text x={250} y={74} fontSize={9.5} fontWeight={700} fill={INK}>
                porównanie σ_HMH (skala powiększona)
              </text>

              <text x={250} y={100} fontSize={8.5} fill={BAD}>
                d = 55 mm · n = {pl(D55.n)} &lt; 2,5
              </text>
              <rect x={250} y={106} width={170} height={15} rx={7.5} fill="#edf1f5" />
              <motion.rect
                x={250}
                y={106}
                height={15}
                rx={7.5}
                fill={BAD}
                fillOpacity={0.3}
                stroke={BAD}
                strokeWidth={1.2}
                initial={false}
                animate={{ width: bar55 * progress }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <text x={250 + bar55 + 7} y={118} fontSize={8.5} fill={BAD}>
                {pl(D55.hmh)}
              </text>

              <text x={250} y={144} fontSize={8.5} fill={GREEN}>
                d = 56 mm · n = {pl(D56.n)} ≥ 2,5
              </text>
              <rect x={250} y={150} width={170} height={15} rx={7.5} fill="#edf1f5" />
              <motion.rect
                x={250}
                y={150}
                height={15}
                rx={7.5}
                fill={GREEN}
                fillOpacity={0.3}
                stroke={GREEN}
                strokeWidth={1.2}
                initial={false}
                animate={{ width: bar56 * progress }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <text x={250 + bar56 + 7} y={162} fontSize={8.5} fontWeight={700} fill={GREEN}>
                {pl(D56.hmh)}
              </text>

              <line
                x1={250 + barAllow}
                y1={96}
                x2={250 + barAllow}
                y2={172}
                stroke={EDGE}
                strokeWidth={1.3}
                strokeDasharray="5 4"
              />
              <text x={250 + barAllow} y={90} textAnchor="middle" fontSize={8} fill={EDGE}>
                σdop = 94
              </text>
              <text x={250} y={186} fontSize={7.5} fill={MUTED}>
                85
              </text>
              <text x={420} y={186} textAnchor="end" fontSize={7.5} fill={MUTED}>
                100 MPa
              </text>

              <line x1={250} y1={202} x2={450} y2={202} stroke="#dde3ea" strokeWidth={1} />
              <text x={250} y={224} fontSize={10} fontWeight={700} fill={GREEN}>
                wystarcza d = 56 mm
              </text>
              <text x={250} y={242} fontSize={8.5} fill={MUTED}>
                średnica 55 mm przekracza σdop
              </text>
              <text x={250} y={260} fontSize={8.5} fill={LOAD}>
                w praktyce wybierz kolejny wymiar handlowy
              </text>
            </g>
          )}

          <text x={466} y={292} textAnchor="end" fontSize={8} fill={MUTED}>
            {isModel
              ? 'model i wymaganie'
              : isAllowable
                ? 'naprężenie dopuszczalne'
                : isTrial55
                  ? 'próba d = 55 mm'
                  : isTrial56
                    ? 'próba d = 56 mm'
                    : 'decyzja: d = 56 mm'}
          </text>
        </svg>
      </div>
    </div>
  )
}
