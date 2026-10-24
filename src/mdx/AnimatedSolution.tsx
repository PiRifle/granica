import { getSolution } from '../content/course'
import { SolutionPlayer } from '../components/SolutionPlayer'

export function AnimatedSolution({ id }: { id: string }) {
  const solution = getSolution(id)
  if (!solution) return null
  return <SolutionPlayer solution={solution} />
}
