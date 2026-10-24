import { useState } from 'react'
import { motion } from 'motion/react'
import { MoveHorizontal } from 'lucide-react'
import home from './Home.module.css'
import { classNames } from '../lib/css'

const h = classNames(home)

export function HeroGraphic() {
  const [force, setForce] = useState(56)
  const deflection = (force * 0.032).toFixed(2)
  const stress = Math.round(force * 2.4)
  const bend = force * 0.72

  return (
    <div className={h('hero-graphic')}>
      <div className={h('hero-card-top')}>
        <span>
          <i /> LABORATORIUM 01
        </span>
        <small>belka swobodnie podparta</small>
      </div>
      <svg viewBox="0 0 560 300" role="img" aria-label={`Belka obciążona siłą ${force} kiloniutonów`}>
        <defs>
          <linearGradient id="heroBeam" gradientUnits="userSpaceOnUse" x1="86" y1="151" x2="474" y2="151">
            <stop stopColor="#7188ff" />
            <stop offset="1" stopColor="#91a2ff" />
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
          stroke="url(#heroBeam)"
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
      <div className={h('sim-readings')}>
        <span>
          <small>SIŁA</small>
          <strong>
            {force} <i>kN</i>
          </strong>
        </span>
        <span>
          <small>NAPRĘŻENIE</small>
          <strong>
            {stress} <i>MPa</i>
          </strong>
        </span>
        <span>
          <small>UGIĘCIE</small>
          <strong>
            {deflection} <i>mm</i>
          </strong>
        </span>
      </div>
      <div className={h('sim-control')}>
        <label htmlFor="hero-force">
          <MoveHorizontal size={15} /> Zmień siłę
        </label>
        <input
          id="hero-force"
          type="range"
          min="0"
          max="100"
          value={force}
          onChange={(event) => setForce(Number(event.target.value))}
          style={{ '--range-progress': `${force}%` } as React.CSSProperties}
        />
        <output htmlFor="hero-force">{force}%</output>
      </div>
      <div className={h('floating-note')}>
        <span className={h('note-symbol')}>σ</span>
        <span>
          <small>NIE TYLKO WZÓR</small>Zobacz, co naprawdę zmienia siła.
        </span>
      </div>
    </div>
  )
}
