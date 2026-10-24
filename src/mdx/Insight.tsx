import { Sparkles } from 'lucide-react'
import { useLessonContent } from './LessonContentContext'
import styles from './Content.module.css'

export function Insight() {
  const lesson = useLessonContent()
  return <div className={styles.insight}><Sparkles /><div><strong>Jedna rzecz do zapamiętania</strong><p>{lesson.insight}</p></div></div>
}
