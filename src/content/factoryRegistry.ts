import type { MdxBody } from '../types'
import type { SolutionData } from './model'
import type { CourseSolution } from '../types'

// Rejestr fabryk — wyłącznie do podglądu deweloperskiego. Fabryki NIGDY nie trafiają
// do workedSolutions, treści kursu ani linków AnimatedSolution; mounting następuje
// tylko po jawnej selekcji w trybie mode=factory (SolutionDebug).
type DataModule<T> = { default: T }
type BodyModule = Awaited<ReturnType<MdxBody>>

const factoryDataFiles = import.meta.glob<DataModule<SolutionData>>('./solution-factories/*/solution.data.ts')
const factoryBodyFiles = import.meta.glob<BodyModule>('./solution-factories/*/content.mdx')

export const factorySolutionIds = Object.keys(factoryDataFiles)
  .map((dataPath) => dataPath.replace(/^\.\/solution-factories\/([^/]+)\/solution\.data\.ts$/, '$1'))
  .sort((a, b) => a.localeCompare(b))

const factoryCache = new Map<string, Promise<CourseSolution>>()

export function loadFactorySolution(id: string): Promise<CourseSolution> {
  const cached = factoryCache.get(id)
  if (cached) return cached
  const dataLoader = factoryDataFiles[`./solution-factories/${id}/solution.data.ts`]
  const bodyLoader = factoryBodyFiles[`./solution-factories/${id}/content.mdx`]
  if (!dataLoader || !bodyLoader) {
    return Promise.reject(new Error(`Brak fabryki ${id} (solution.data.ts lub content.mdx)`))
  }
  const promise = Promise.all([dataLoader(), bodyLoader()]).then(([dataModule, bodyModule]) => {
    const data = dataModule.default
    return {
      ...data,
      loadBody: async () => bodyModule,
    } satisfies CourseSolution
  })
  factoryCache.set(id, promise)
  return promise
}

export async function loadFactorySolutions(ids: string[] = factorySolutionIds): Promise<CourseSolution[]> {
  const results = await Promise.allSettled(ids.map(loadFactorySolution))
  return results
    .filter((result): result is PromiseFulfilledResult<CourseSolution> => result.status === 'fulfilled')
    .map((result) => result.value)
}
