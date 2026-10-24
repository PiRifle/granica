import type { CourseModule, Lesson, WorkedSolution } from '../types'
import { modules as foundationsAxial } from './modules/foundations-axial'
import { modules as materialGeometry } from './modules/material-geometry'
import { modules as shearBending } from './modules/shear-bending'
import { modules as stressStrain } from './modules/stress-strain'
import { modules as criteriaDesign } from './modules/criteria-design'
import { workedSolutions as axialThermalSolutions } from './solutions/axial-thermal'
import { solutions as geometryStrainSolutions } from './solutions/geometry-strain'
import { solutions as bendingSolutions } from './solutions/bending'

export const modules: CourseModule[] = [
  ...foundationsAxial,
  ...materialGeometry,
  ...shearBending,
  ...stressStrain,
  ...criteriaDesign,
].sort((a, b) => a.number - b.number)

export const lessons: Lesson[] = modules.flatMap((module) => module.lessons)

export const workedSolutions: WorkedSolution[] = [
  ...axialThermalSolutions,
  ...geometryStrainSolutions,
  ...bendingSolutions,
]

export const totalDuration = lessons.reduce((sum, lesson) => sum + lesson.duration, 0)

export function getLesson(id: string): Lesson {
  return lessons.find((lesson) => lesson.id === id) ?? lessons[0]
}

export function getModule(id: string): CourseModule {
  return modules.find((module) => module.id === id) ?? modules[0]
}

export function getModuleForLesson(lesson: Lesson): CourseModule {
  return getModule(lesson.moduleId)
}

export function getSolution(id: string): WorkedSolution | undefined {
  return workedSolutions.find((solution) => solution.id === id)
}

export function lessonIndex(id: string): number {
  return lessons.findIndex((lesson) => lesson.id === id)
}

export const lessonIds = lessons.map((lesson) => lesson.id)

export const modulesById = new Map(modules.map((module) => [module.id, module]))

export const syllabus = [
  { moduleId: 'foundations', label: 'Jednostki SI, modele, obciążenia, podpory, równowaga, metoda przekrojów, Saint-Venant' },
  { moduleId: 'axial', label: 'Naprężenia i siły osiowe, pręty schodkowe, prawo Hooke’a, wydłużenia, warunki wytrzymałości i sztywności' },
  { moduleId: 'material', label: 'Próby materiałowe, Re/Rm, ciężar własny, temperatura, naprężenie dopuszczalne i współczynnik bezpieczeństwa' },
  { moduleId: 'geometry', label: 'Środek ciężkości, momenty statyczne i bezwładności, twierdzenie Steinera, wskaźnik wytrzymałości' },
  { moduleId: 'shear', label: 'Ścinanie techniczne połączeń, skręcanie wałów pełnych i rurowych, kąt skręcenia, dobór średnicy' },
  { moduleId: 'bending', label: 'Reakcje belek, wykresy T(x) i M(x), czyste zginanie, rozkład naprężeń i dobór przekroju' },
  { moduleId: 'stress-state', label: 'Tensor naprężenia, transformacja przy obrocie, naprężenia i kierunki główne, koło Mohra' },
  { moduleId: 'strain-state', label: 'Odkształcenia normalne i postaciowe, liczba Poissona, uogólnione prawo Hooke’a, rozety tensometryczne' },
  { moduleId: 'criteria', label: 'Naprężenie zredukowane, hipotezy HMH i Tresca, obciążenia złożone, współczynnik bezpieczeństwa' },
  { moduleId: 'design', label: 'Dobór wymiaru, materiału i obciążenia dopuszczalnego, pełne zadania i strategia kolokwium' },
]
