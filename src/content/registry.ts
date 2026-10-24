import type { MdxBody } from '../types'
import type { ModuleData, SolutionData } from './model'
import type { Course, CourseDefinition, CourseLesson, CourseModule, CourseSolution, LessonMeta } from '../types'
import { lessonMeta } from 'virtual:lesson-meta'
import { courseCollection } from './courses'

// Solver registry: solutions are discovered eagerly so ids stay stable.
type DataModule<T> = { default: T }
type BodyModule = Awaited<ReturnType<MdxBody>>

const lessonBodyFiles = import.meta.glob<BodyModule>('./lessons/*/*/content.mdx')
const moduleDataFiles = import.meta.glob<DataModule<ModuleData>>('./modules/*/module.data.ts', { eager: true })
const moduleOverviewFiles = import.meta.glob<BodyModule>('./modules/*/overview.mdx')
const solutionDataFiles = import.meta.glob<DataModule<SolutionData>>('./solutions/*/solution.data.ts', { eager: true })
const solutionBodyFiles = import.meta.glob<BodyModule>('./solutions/*/content.mdx')

function resolveLoader<T>(
  files: Record<string, () => Promise<T>>,
  dataPath: string,
  extension: string,
): () => Promise<T> {
  const bodyPath = dataPath.replace(/[^/]+$/, extension)
  const loader = files[bodyPath]
  if (!loader) throw new Error(`Brak treści MDX dla ${dataPath}`)
  return loader
}

export const lessonEntries = Object.fromEntries(
  lessonMeta.map((meta) => {
    const bodyPath = `./lessons/${meta.moduleId}/${meta.id}/content.mdx`
    const loadBody = lessonBodyFiles[bodyPath]
    if (!loadBody) throw new Error(`Brak treści MDX dla lekcji ${meta.id}`)
    return [meta.id, { ...meta, loadBody } satisfies CourseLesson]
  }),
) as Record<string, CourseLesson>

export const moduleEntries = Object.fromEntries(
  Object.entries(moduleDataFiles).map(([dataPath, module]) => {
    const data = module.default
    const loadOverview = moduleOverviewFiles[dataPath.replace(/[^/]+$/, 'overview.mdx')]
    return [data.id, { ...data, loadOverview }]
  }),
) as Record<string, ModuleData & { loadOverview?: () => Promise<BodyModule> }>

export const solutionEntries = Object.fromEntries(
  Object.entries(solutionDataFiles).map(([dataPath, module]) => {
    const data = module.default
    return [
      data.id,
      { ...data, loadBody: resolveLoader(solutionBodyFiles, dataPath, 'content.mdx') } satisfies CourseSolution,
    ]
  }),
) as Record<string, CourseSolution>

export const modules: CourseModule[] = Object.values(moduleEntries)
  .sort((a, b) => a.number - b.number)
  .map((module) => ({
    ...module,
    lessons: Object.values(lessonEntries)
      .filter((lesson) => lesson.moduleId === module.id)
      .sort((a, b) => a.number - b.number),
  }))

export const lessons: CourseLesson[] = modules.flatMap((module) => module.lessons)
export const workedSolutions: CourseSolution[] = Object.values(solutionEntries).sort((a, b) => a.id.localeCompare(b.id))

export const modulesById = new Map(modules.map((module) => [module.id, module]))
export const lessonEntriesById = new Map(lessons.map((lesson) => [lesson.id, lesson]))

function buildCourse(definition: CourseDefinition): Course {
  const courseModules = definition.moduleIds
    .map((id) => modulesById.get(id))
    .filter((module): module is CourseModule => Boolean(module))
  const courseLessons = courseModules.flatMap((module) => module.lessons)
  return {
    ...definition,
    modules: courseModules,
    lessons: courseLessons,
    totalDuration: courseLessons.reduce((sum, lesson) => sum + lesson.totalMinutes, 0),
  }
}

export const courses: Course[] = courseCollection.map(buildCourse)
export const defaultCourse = courses[0]

export function findCourse(id: string | undefined): Course | undefined {
  if (!id) return undefined
  return courses.find((course) => course.id === id)
}

export function getCourse(id: string | undefined): Course {
  return findCourse(id) ?? defaultCourse
}

export function getCourseForModule(moduleId: string | undefined): Course | undefined {
  if (!moduleId) return undefined
  return courses.find((course) => course.modules.some((module) => module.id === moduleId))
}

export function getCourseForLesson(lessonId: string | undefined): Course | undefined {
  if (!lessonId) return undefined
  return courses.find((course) => course.lessons.some((lesson) => lesson.id === lessonId))
}

export function getLesson(id: string): CourseLesson {
  return lessonEntriesById.get(id) ?? lessons[0]
}

export function getModule(id: string): CourseModule {
  return modulesById.get(id) ?? modules[0]
}

export function getModuleForLesson(lesson: LessonMeta): CourseModule {
  return getModule(lesson.moduleId)
}

export function getSolution(id: string): CourseSolution | undefined {
  return solutionEntries[id]
}

export function lessonIndex(id: string): number {
  return lessons.findIndex((lesson) => lesson.id === id)
}

export function lessonIndexInCourse(course: Course, id: string): number {
  return course.lessons.findIndex((lesson) => lesson.id === id)
}

export const lessonIds = lessons.map((lesson) => lesson.id)
export const totalDuration = lessons.reduce((sum, lesson) => sum + lesson.totalMinutes, 0)
