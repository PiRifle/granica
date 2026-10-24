import { useState, type CSSProperties } from 'react'
import { motion } from 'motion/react'
import { MoveHorizontal } from 'lucide-react'
import type { Course } from '../types'
import { courseThemeStyle } from '../lib/courseTheme'
import { classNames, cx } from '../lib/css'
import home from './Home.module.css'

const h = classNames(home)

export function CoursePreview({
  courses,
  activeCourseId,
  showTabs = true,
  onCourseChange,
}: {
  courses: Course[]
  activeCourseId: string
  showTabs?: boolean
  onCourseChange?: (id: string) => void
}) {
  const [force, setForce] = useState(56)
  const course = courses.find((entry) => entry.id === activeCourseId) ?? courses[0]
  if (!course) return null
  const isTruss = course.marketing.visual === 'truss'

  return (
    <div className={h('course-preview')} style={courseThemeStyle(course.theme)}>
      {showTabs && (
        <div className={h('preview-tabs')} role="tablist" aria-label="Podgląd kursu">
          {courses.map((entry) => (
            <button
              key={entry.id}
              type="button"
              role="tab"
              aria-selected={entry.id === course.id}
              className={cx(h('preview-tab'), entry.id === course.id && h('active'))}
              onClick={() => onCourseChange?.(entry.id)}
            >
              <span className={h('preview-dot')} style={courseThemeStyle(entry.theme)} />
              {entry.shortTitle}
            </button>
          ))}
        </div>
      )}
      <div className={h('hero-graphic')}>
        <div className={h('hero-card-top')}>
          <span>
            <i /> LABORATORIUM 00
          </span>
          <small>{isTruss ? 'kratownica trójkątna' : 'belka swobodnie podparta'}</small>
        </div>
        {isTruss ? (
          <TrussVisual force={force} accent={course.theme.accent} highlight={course.theme.highlight} />
        ) : (
          <BeamVisual force={force} />
        )}
        <div className={h('sim-readings')}>
          <span>
            <small>SIŁA</small>
            <strong>
              {force} <i>kN</i>
            </strong>
          </span>
          {isTruss ? (
            <>
              <span>
                <small>ŚCISKANIE</small>
                <strong>
                  {Math.round(trussChordForce(force))} <i>kN</i>
                </strong>
              </span>
              <span>
                <small>ROZCIĄGANIE</small>
                <strong>
                  {Math.round(trussBottomForce(force))} <i>kN</i>
                </strong>
              </span>
            </>
          ) : (
            <>
              <span>
                <small>NAPRĘŻENIE</small>
                <strong>
                  {Math.round(force * 2.4)} <i>MPa</i>
                </strong>
              </span>
              <span>
                <small>UGIĘCIE</small>
                <strong>
                  {(force * 0.032).toFixed(2)} <i>mm</i>
                </strong>
              </span>
            </>
          )}
        </div>
        <div className={h('sim-control')}>
          <label htmlFor={`preview-force-${course.id}`}>
            <MoveHorizontal size={14} /> Siła
          </label>
          <input
            id={`preview-force-${course.id}`}
            type="range"
            min="0"
            max="100"
            value={force}
            onChange={(event) => setForce(Number(event.target.value))}
            style={{ '--range-progress': `${force}%` } as CSSProperties}
          />
          <output>{force} kN</output>
        </div>
      </div>
    </div>
  )
}

function BeamVisual({ force }: { force: number }) {
  const deflection = (force * 0.032).toFixed(2)
  const bend = force * 0.72

  return (
    <svg viewBox="0 0 560 300" role="img" aria-label={`Belka obciążona siłą ${force} kiloniutonów`}>
      <defs>
        <linearGradient id="previewBeam" gradientUnits="userSpaceOnUse" x1="86" y1="151" x2="474" y2="151">
          <stop stopColor="var(--accent)" />
          <stop offset="1" stopColor="var(--accent)" stopOpacity="0.65" />
        </linearGradient>
      </defs>
      {[70, 130, 190, 250, 310, 370, 430, 490].map((x) => (
        <line key={x} x1={x} x2={x} y1="35" y2="244" className={h('sim-grid')} />
      ))}
      {[55, 105, 155, 205].map((y) => (
        <line key={y} x1="48" x2="512" y1={y} y2={y} className={h('sim-grid')} />
      ))}
      <text x="49" y="31" className={h('sim-axis-label')}>
        OBCIĄŻENIE / ODKSZTAŁCENIE
      </text>
      <motion.g animate={{ y: bend * 0.55 }} transition={{ type: 'spring', stiffness: 170, damping: 20 }}>
        <line x1="280" x2="280" y1="56" y2="119" className={h('sim-force')} />
        <path d="M268 105 L280 122 L292 105" className={h('sim-force')} />
        <rect x="244" y="37" width="72" height="27" rx="6" className={h('sim-force-badge')} />
        <text x="280" y="55" textAnchor="middle" className={h('sim-force-text')}>
          F = {force} kN
        </text>
      </motion.g>
      <path
        d={`M86 151 C190 ${151 + bend} 370 ${151 + bend} 474 151`}
        fill="none"
        stroke="url(#previewBeam)"
        strokeWidth="16"
        strokeLinecap="round"
      />
      <path d="M69 171 L86 151 L103 171 Z M457 171 L474 151 L491 171 Z" fill="#d8dde5" />
      <line x1="58" x2="502" y1="174" y2="174" stroke="#778391" strokeWidth="2" />
      <motion.g animate={{ opacity: force > 8 ? 1 : 0 }} transition={{ duration: 0.2 }}>
        <path d={`M456 190v${Math.max(14, bend * 0.55)}m-6-6 6 6 6-6`} className={h('sim-deflection')} />
        <text x="443" y="231" textAnchor="end" className={h('sim-deflection-text')}>
          ugięcie {deflection} mm
        </text>
      </motion.g>
    </svg>
  )
}

const TRUSS_ANGLE = Math.atan2(140, 198)
const TRUSS_MAX_MEMBER_FORCE = 100 / (2 * Math.sin(TRUSS_ANGLE))
const stressNeutral = '#66717e'

function trussChordForce(force: number): number {
  return force / (2 * Math.sin(TRUSS_ANGLE))
}

function trussBottomForce(force: number): number {
  return force / (2 * Math.tan(TRUSS_ANGLE))
}

function mixHex(from: string, to: string, amount: number): string {
  const t = Math.max(0, Math.min(1, amount))
  const a = Number.parseInt(from.slice(1), 16)
  const b = Number.parseInt(to.slice(1), 16)
  const red = Math.round(((a >> 16) & 255) * (1 - t) + ((b >> 16) & 255) * t)
  const green = Math.round(((a >> 8) & 255) * (1 - t) + ((b >> 8) & 255) * t)
  const blue = Math.round((a & 255) * (1 - t) + (b & 255) * t)
  return `rgb(${red}, ${green}, ${blue})`
}

function stressColor(signedForce: number, compression: string, tension: string): string {
  const ratio = Math.max(-1, Math.min(1, signedForce / TRUSS_MAX_MEMBER_FORCE))
  const intensity = Math.abs(ratio)
  return ratio < 0 ? mixHex(stressNeutral, compression, intensity) : mixHex(stressNeutral, tension, intensity)
}

function TrussVisual({ force, accent, highlight }: { force: number; accent: string; highlight: string }) {
  const loadOffset = Math.min(22, force * 0.18)
  const chordForce = trussChordForce(force)
  const bottomForce = trussBottomForce(force)
  const chordColor = stressColor(-chordForce, accent, highlight)
  const bottomColor = stressColor(bottomForce, accent, highlight)

  return (
    <svg viewBox="0 0 560 300" role="img" aria-label={`Kratownica obciążona siłą ${force} kiloniutonów`}>
      <defs>
        <linearGradient id="stressLegend" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={accent} />
          <stop offset="50%" stopColor="#66717e" />
          <stop offset="100%" stopColor={highlight} />
        </linearGradient>
      </defs>
      {[70, 130, 190, 250, 310, 370, 430, 490].map((x) => (
        <line key={x} x1={x} x2={x} y1="35" y2="244" className={h('sim-grid')} />
      ))}
      {[55, 105, 155, 205].map((y) => (
        <line key={y} x1="48" x2="512" y1={y} y2={y} className={h('sim-grid')} />
      ))}
      <text x="49" y="31" className={h('sim-axis-label')}>
        SIŁY W KRATOWNICY
      </text>
      <line x1="82" y1="214" x2="478" y2="214" stroke={bottomColor} strokeWidth={6} strokeLinecap="round" />
      <line x1="82" y1="214" x2="280" y2="74" stroke={chordColor} strokeWidth={6} strokeLinecap="round" />
      <line x1="478" y1="214" x2="280" y2="74" stroke={chordColor} strokeWidth={6} strokeLinecap="round" />
      <line x1="82" y1="214" x2="280" y2="214" stroke={bottomColor} strokeWidth={6} strokeLinecap="round" />
      <line x1="280" y1="214" x2="478" y2="214" stroke={bottomColor} strokeWidth={6} strokeLinecap="round" />
      <line x1="280" y1="74" x2="280" y2="214" className={h('sim-member-frame')} />
      {[
        [82, 214],
        [280, 74],
        [478, 214],
        [280, 214],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="5" className={h('sim-node')} />
      ))}
      <path d="M64 236 L82 214 L100 236 Z M460 236 L478 214 L496 236 Z" className={h('sim-support')} />
      <line x1="56" x2="504" y1="238" y2="238" stroke="#778391" strokeWidth="2" />
      <motion.g animate={{ y: loadOffset }} transition={{ type: 'spring', stiffness: 190, damping: 20 }}>
        <line x1="280" x2="280" y1="32" y2="66" className={h('sim-force')} />
        <path d="M268 54 L280 70 L292 54" className={h('sim-force')} />
        <rect x="244" y="14" width="72" height="27" rx="6" className={h('sim-force-badge')} />
        <text x="280" y="32" textAnchor="middle" className={h('sim-force-text')}>
          P = {force} kN
        </text>
      </motion.g>
      <text x="62" y="208" className={h('sim-deflection-text')}>
        R_A
      </text>
      <text x="470" y="208" className={h('sim-deflection-text')}>
        R_B
      </text>
      <text x="318" y="257" textAnchor="end" className={h('sim-legend-label')}>
        SIŁA W PRĘCIE
      </text>
      <rect x="330" y="252" width="160" height="6" rx="3" fill="url(#stressLegend)" />
      <text x="330" y="272" className={h('sim-legend-compression')}>
        ŚCISK.
      </text>
      <text x="410" y="272" textAnchor="middle" className={h('sim-legend-value')}>
        0
      </text>
      <text x="490" y="272" textAnchor="end" className={h('sim-legend-tension')}>
        ROZCIĄG.
      </text>
      <text x="380" y="86" className={h('sim-deflection-text')}>
        N_c = −{Math.round(chordForce)} kN
      </text>
    </svg>
  )
}
