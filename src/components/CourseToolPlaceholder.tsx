import { ArrowLeft, Wrench } from 'lucide-react'
import type { Course, CourseTool } from '../types'
import { courseThemeStyle } from '../lib/courseTheme'
import tools from './Tools.module.css'
import home from './Home.module.css'

const names: Record<CourseTool, string> = {
  training: 'Trening liczbowy',
  exam: 'Kolokwium próbne',
  cheatsheet: 'Ściąga',
  syllabus: 'Mapa sylabusa',
  library: 'Biblioteka',
}

const descriptions: Record<CourseTool, string> = {
  training: 'Losowane zadania i pełne rozwiązania pojawią się razem z pierwszymi lekcjami tego kursu.',
  exam: 'Bank pytań i kolokwium próbne pojawią się po opublikowaniu lekcji tego kursu.',
  cheatsheet: 'Ściąga z wzorami i jednostkami powstanie razem z treścią kursu.',
  syllabus: 'Mapa sylabusa jest już dostępna dla tego kursu.',
  library: 'Literatura i źródła dla tego kursu są w przygotowaniu.',
}

export function CourseToolPlaceholder({
  course,
  tool,
  onBack,
}: {
  course: Course
  tool: CourseTool
  onBack: () => void
}) {
  return (
    <div className={tools['tool-page']} style={courseThemeStyle(course.theme)}>
      <header className={tools['tool-header']}>
        <button className="button button-quiet button-small" onClick={onBack}>
          <ArrowLeft size={15} />
          Wróć do kursu
        </button>
        <div className={tools['tool-header-copy']}>
          <span className="section-kicker">WKRÓTCE</span>
          <h1>{names[tool]} dołączy do tego kursu.</h1>
          <p>{descriptions[tool]}</p>
        </div>
        <span className={tools['tool-score']}>
          <Wrench size={17} /> w przygotowaniu
        </span>
      </header>
      <div className={home['planned-tool']}>
        <strong>{course.title}</strong>
        <p>
          Na razie możesz zobaczyć plan modułów i sylabus. Gdy pojawią się lekcje, to narzędzie automatycznie zacznie z
          nich korzystać.
        </p>
        <button className="button button-primary" onClick={onBack}>
          Zobacz plan kursu
        </button>
      </div>
    </div>
  )
}
