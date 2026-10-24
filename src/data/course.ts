export {
  getLesson,
  getModule,
  getModuleForLesson,
  getSolution,
  lessonIds,
  lessonIndex,
  lessons,
  modules,
  modulesById,
  totalDuration,
  workedSolutions,
} from '../content/registry'

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
