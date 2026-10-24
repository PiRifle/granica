import { Suspense } from 'react'
import { labRegistry } from '../components/LabRegistry'
import { useLessonContent } from './LessonContentContext'

export function LabEmbed({ id }: { id?: string }) {
  const lesson = useLessonContent()
  const labId = id ?? lesson.lab
  const LabComponent = labRegistry[labId]
  if (!LabComponent) return null
  return <Suspense fallback={<p role="status">Ładowanie laboratorium…</p>}><LabComponent /></Suspense>
}
