import { labRegistry } from '../components/LabRegistry'

export function Lab({ id }: { id: string }) {
  const LabComponent = labRegistry[id]
  if (!LabComponent) throw new Error(`Nieznane laboratorium w treści MDX: ${id}`)
  return <LabComponent />
}
