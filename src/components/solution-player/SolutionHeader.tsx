import { Suspense } from 'react'
import type { ComponentType } from 'react'
import { Gauge } from 'lucide-react'
import type { CourseSolution } from '../../types'
import { local } from './local'

export function SolutionHeader({
  solution,
  Body,
}: {
  solution: CourseSolution
  Body: ComponentType<{ components?: Record<string, ComponentType<any>> }>
}) {
  return (
    <>
      <div className={local('solution-head')}>
        <div>
          <span className={local('section-kicker')}>ROZWIĄZANIE KROK PO KROKU</span>
          <h2>{solution.title}</h2>
          <div className={local('solution-problem')}>
            <Suspense fallback={<p>Ładowanie treści…</p>}>
              <Body components={{}} />
            </Suspense>
          </div>
        </div>
        <span className={local('solution-duration')}>
          <Gauge size={15} /> {solution.duration} min
        </span>
      </div>
      <div className={local('solution-given')}>
        {solution.given.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </>
  )
}
