import { labRegistry } from '../components/LabRegistry'
import { useLessonContent } from './LessonContentContext'

export function LabEmbed({ id }: { id?: string }) {
  const lesson = useLessonContent()
  const labId = id ?? lesson.lab
  const LabComponent = labRegistry[labId]
  return LabComponent ? <LabComponent /> : null
}
