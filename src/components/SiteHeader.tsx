import { ArrowRight, Target } from 'lucide-react'
import { useCourseStore } from '../store'
import type { View } from '../lib/navigation'
import { Logo } from './Logo'
import home from './Home.module.css'
import { classNames } from '../lib/css'

const h = classNames(home)

export function SiteHeader({
  onHome,
  onStart,
  onTool,
}: {
  onHome: () => void
  onStart: () => void
  onTool: (view: View) => void
}) {
  const completed = useCourseStore((state) => state.completed)
  return (
    <header className={h('site-header')}>
      <Logo onClick={onHome} />
      <nav aria-label="Główna nawigacja">
        <a href="#metoda">Jak się uczymy</a>
        <a href="#moduly">Moduły</a>
        <a href="#narzedzia">Narzędzia</a>
      </nav>
      <div className={h('header-actions')}>
        <button className={h('button button-quiet button-small')} onClick={() => onTool('training')}>
          <Target size={15} />
          Trening
        </button>
        <button className={h('button button-dark button-small')} onClick={onStart}>
          {completed.length ? 'Wróć do kursu' : 'Zacznij naukę'}
          <ArrowRight size={16} />
        </button>
      </div>
    </header>
  )
}
