import { Formula as FormulaCard } from '../components/UI'
import { useLessonContent } from './LessonContentContext'

export function LessonFormula() {
  const lesson = useLessonContent()
  return <FormulaCard note={lesson.formulaNote}>{lesson.formula}</FormulaCard>
}
