import { motion } from 'motion/react'
import { Lightbulb, MousePointer2 } from 'lucide-react'
import home from './Home.module.css'
import { classNames } from '../lib/css'

const h = classNames(home)

export function HeroGraphic() {
  return (
    <div className={h('hero-graphic')} aria-label="Animowana belka pokazująca odkształcenie pod siłą">
      <div className={h('hero-card-top')}>
        <span>
          <i /> SYMULACJA
        </span>
        <small>spróbuj sam</small>
      </div>
      <svg viewBox="0 0 540 300" role="img" aria-label="Belka uginająca się pod przyłożoną siłą">
        <defs>
          <linearGradient id="heroBeam" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#d8ef9c" />
            <stop offset="1" stopColor="#a7cf4c" />
          </linearGradient>
        </defs>
        {[80, 130, 180, 230, 280, 330, 380, 430].map((x) => (
          <line key={x} x1={x} x2={x} y1="45" y2="245" stroke="#e4e6df" strokeWidth="1" />
        ))}
        {[70, 120, 170, 220].map((y) => (
          <line key={y} x1="45" x2="495" y1={y} y2={y} stroke="#e4e6df" strokeWidth="1" />
        ))}
        <motion.g animate={{ y: [0, 16, 0] }} transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}>
          <line x1="270" x2="270" y1="42" y2="112" stroke="#e77451" strokeWidth="3" />
          <path
            d="M258 99 L270 116 L282 99"
            fill="none"
            stroke="#e77451"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect x="228" y="22" width="84" height="28" rx="14" fill="#fff4ec" />
          <text x="270" y="41" textAnchor="middle" fill="#c95c3d" fontSize="13" fontWeight="700">
            siła F
          </text>
        </motion.g>
        <motion.path
          d="M90 145 Q270 145 450 145"
          animate={{ d: ['M90 145 Q270 145 450 145', 'M90 145 Q270 204 450 145', 'M90 145 Q270 145 450 145'] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
          fill="none"
          stroke="url(#heroBeam)"
          strokeWidth="17"
          strokeLinecap="round"
        />
        <path d="M75 162 L90 145 L105 162 Z M435 162 L450 145 L465 162 Z" fill="#72776c" />
        <line x1="60" x2="480" y1="164" y2="164" stroke="#72776c" strokeWidth="2" />
        <motion.g
          animate={{ opacity: [0, 1, 0], y: [5, 0, 5] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path d="M387 184 L387 224 M380 217 L387 225 L394 217" stroke="#69705f" fill="none" strokeWidth="2" />
          <rect x="326" y="231" width="122" height="27" rx="8" fill="#fff" />
          <text x="387" y="249" textAnchor="middle" fill="#5f6657" fontSize="12">
            odkształcenie
          </text>
        </motion.g>
      </svg>
      <div className={h('hero-card-bottom')}>
        <span className={h('mini-icon')}>
          <MousePointer2 size={16} />
        </span>
        <span>
          <strong>Nie tylko czytasz.</strong>
          <small>Zmieniasz. Obserwujesz. Rozumiesz.</small>
        </span>
      </div>
      <motion.div
        className={h('floating-note')}
        animate={{ y: [-4, 5, -4] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Lightbulb size={18} />
        <span>
          <small>Wniosek</small>Belka pracuje nawet bez ruchu
        </span>
      </motion.div>
    </div>
  )
}
