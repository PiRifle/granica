import { labRegistry } from '../components/LabRegistry'
import { labMeta } from '../labs/labMeta'

export function Lab({ id }: { id: string }) {
  const LabComponent = labRegistry[id]
  if (!LabComponent) throw new Error(`Nieznane laboratorium w treści MDX: ${id}`)
  const meta = labMeta[id]
  return (
    <div data-reading-ignore data-lab-id={id} data-lab-minutes={meta?.minutes ?? 4}>
      <LabComponent />
    </div>
  )
}
