import { useState } from 'react'
import { BookOpen, CheckCircle2, Circle, ClipboardList, Search } from 'lucide-react'
import { lessons, modules, syllabus } from '../content/course'
import { useCourseStore } from '../store'
import { Formula } from './UI'
import tools from './Tools.module.css'
import styles from './StudyTools.module.css'

const cx = (...values: Array<string | false | null | undefined>) => values.filter(Boolean).join(' ')
const local = (names: string) => names.split(/\s+/).filter(Boolean).map((name) => tools[name] ?? styles[name] ?? name).join(' ')

export function CheatSheet({ onBack }: { onBack: () => void }) {
  const [moduleId, setModuleId] = useState<string>('all')
  const [query, setQuery] = useState('')
  const visibleModules = modules.filter((module) => moduleId === 'all' || module.id === moduleId)
  const normalized = query.trim().toLowerCase()
  const matches = (value: string) => normalized.length === 0 || value.toLowerCase().includes(normalized)

  return <div className={local('tool-page')}>
    <header className={local('tool-header')}>
      <button className={local('button button-quiet button-small')} onClick={onBack}>← Wróć do kursu</button>
      <div className={local('tool-header-copy')}>
        <span className={local('section-kicker')}>ŚCIĄGA</span>
        <h1>Wszystkie wzory w jednym miejscu.</h1>
        <p>Wzór, jednostki i jedna myśl, która wyjaśnia sens. Bez szukania po rozdziałach.</p>
      </div>
      <span className={local('tool-score')}><BookOpen size={17} /> {lessons.length} lekcji</span>
    </header>
    <div className={local('cheatsheet-tools')}>
      <label className={local('search-field')}><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Szukaj wzoru lub tematu…" aria-label="Szukaj w ściądze" /></label>
      <div className={local('filter-chips')} role="group" aria-label="Filtr modułu">
        <button className={moduleId === 'all' ? local('active') : undefined} onClick={() => setModuleId('all')}>Wszystko</button>
        {modules.map((module) => <button key={module.id} className={moduleId === module.id ? local('active') : undefined} onClick={() => setModuleId(module.id)}>{module.shortTitle}</button>)}
      </div>
    </div>
    <div className={local('cheatsheet')}>
      {visibleModules.map((module) => {
        const items = module.lessons.filter((lesson) => matches(lesson.title) || matches(lesson.formula) || matches(lesson.formulaNote) || matches(lesson.insight))
        if (items.length === 0) return null
        return <section key={module.id} className={local('cheatsheet-module')}>
          <div className={local('cheatsheet-heading')}><span>{String(module.number).padStart(2, '0')}</span><div><h2>{module.title}</h2><p>{module.description}</p></div></div>
          <div className={local('cheatsheet-grid')}>
            {items.map((lesson) => <article key={lesson.id} className={local('cheatsheet-card')}>
              <span className={local('cheatsheet-lesson')}>{lesson.shortTitle}</span>
              <Formula note={lesson.formulaNote}>{lesson.formula}</Formula>
              <p>{lesson.insight}</p>
            </article>)}
          </div>
        </section>
      })}
    </div>
  </div>
}

export function SyllabusMap({ onBack }: { onBack: () => void }) {
  const { completed, scores } = useCourseStore()
  const totalCompleted = completed.length
  return <div className={local('tool-page')}>
    <header className={local('tool-header')}>
      <button className={local('button button-quiet button-small')} onClick={onBack}>← Wróć do kursu</button>
      <div className={local('tool-header-copy')}>
        <span className={local('section-kicker')}>MAPA POKRYCIA SYLABUSA</span>
        <h1>Widać dokładnie, co już umiesz.</h1>
        <p>Karta przedmiotu rozbita na moduły, lekcje i efekty kształcenia. Postęp liczy się z ukończonych lekcji na tym urządzeniu.</p>
      </div>
      <span className={local('tool-score')}><ClipboardList size={17} /> {totalCompleted} / {lessons.length} lekcji</span>
    </header>
    <div className={local('syllabus-list')}>
      {syllabus.map((item) => {
        const module = modules.find((entry) => entry.id === item.moduleId)
        if (!module) return null
        const done = module.lessons.filter((lesson) => completed.includes(lesson.id)).length
        const percent = Math.round(done / module.lessons.length * 100)
        const status = done === 0 ? 'not-started' : done === module.lessons.length ? 'complete' : 'in-progress'
        return <article key={item.moduleId} className={local(`syllabus-card ${status}`)}>
          <div className={local('syllabus-card-head')}>
            <span className={local('syllabus-number')}>{status === 'complete' ? <CheckCircle2 /> : <Circle />}</span>
            <div><span className={local('section-kicker')}>MODUŁ {String(module.number).padStart(2, '0')}</span><h2>{module.title}</h2><p>{item.label}</p></div>
            <span className={local('syllabus-percent')}>{percent}%<small>{done} / {module.lessons.length} lekcji</small></span>
          </div>
          <div className={local('progress-root')}><div className={local('progress-indicator')} style={{ transform: `translateX(-${100 - percent}%)` }} /></div>
          <div className={local('syllabus-outcomes')}>
            {module.outcomes.map((outcome) => {
              const code = outcome.trim().split(' ')[0]
              const covered = module.lessons.some((lesson) => completed.includes(lesson.id) && lesson.questions.some((question) => question.outcome === code))
              return <span key={outcome} className={covered ? local('covered') : undefined}>{covered ? <CheckCircle2 size={13} /> : <Circle size={13} />}{outcome}</span>
            })}
          </div>
          <div className={local('syllabus-lessons')}>
            {module.lessons.map((lesson) => {
              const isDone = completed.includes(lesson.id)
              const score = scores[lesson.id]
              return <span key={lesson.id} className={isDone ? local('done') : undefined}>{isDone ? <CheckCircle2 size={13} /> : <Circle size={13} />}{lesson.shortTitle}{isDone && score !== undefined ? ` · ${score}%` : ''}</span>
            })}
          </div>
        </article>
      })}
    </div>
  </div>
}
