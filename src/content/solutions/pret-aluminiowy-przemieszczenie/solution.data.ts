import { lazy } from 'react'
import type { SolutionData } from '../../model'
import type { SolutionScene } from '../../../types'
import { createAxialSolution } from '../../solution-factories/factory-axial-thermal/factory'
import { meta } from './task'

const scenes: SolutionScene[] = [
  {
    title: '1. Model pręta i obciążenia',
    narration:
      'Pręt ma trzy odcinki o długościach 100, 300 i 200 mm oraz stałe pole przekroju 120 mm². Na końcach i na granicach odcinków działają cztery siły osiowe. Zwrot strzałki pokazuje zwrot siły, a nie znak siły wewnętrznej.',
    caption: 'Pręt aluminiowy podzielony na trzy odcinki z czterema siłami przyłożonymi w węzłach.',
    visual: 'axial',
    focus: { metric: 'model' },
    formula: 'L=L_1+L_2+L_3=100+300+200=600\\ \\mathrm{mm}',
  },
  {
    title: '2. Dane, jednostki i znak siły',
    narration:
      'Moduł Younga zamieniamy na MPa, czyli N/mm². Przyjmujemy, że dodatnia siła podłużna N rozciąga pręt, a ujemna go ściska. Wydłużenie dodatnie oznacza wzrost długości, a ujemne skrócenie.',
    caption: 'Zestaw danych w jednolitych jednostkach: N, mm, MPa oraz umowa znaków.',
    visual: 'axial',
    focus: { metric: 'data' },
    formula: 'E=75\\ \\mathrm{GPa}=75\\,000\\ \\mathrm{MPa}=75\\,000\\ \\mathrm{N/mm^2}',
  },
  {
    title: '3. Równowaga całego pręta',
    narration:
      'Suma sił poziomych musi być zerowa, bo pręt nie porusza się jako całość. Siły w lewo są ujemne, a w prawo dodatnie. Podstawienie danych potwierdza równowagę: −5000 + 3000 − 10 000 + 12 000 = 0.',
    caption: 'Cztery siły zewnętrzne tworzą układ równoważący się na kierunku osi pręta.',
    visual: 'axial',
    focus: { metric: 'equilibrium' },
    formula: '-P_1+P_2-P_3+P_4=-5000+3000-10000+12000=0\\ \\mathrm{N}',
  },
  {
    title: '4. Przekrój w odcinku 1',
    narration:
      'Przecinamy pręt w pierwszym odcinku i rozpatrujemy lewą część. Działa na nią tylko siła P₁ skierowana w lewo, więc siła wewnętrzna N₁ musi ją równoważyć i wynosi +5000 N. Dodatni znak oznacza rozciąganie.',
    caption: 'Przekrój w odcinku AB: siła wewnętrzna N₁ = +5 kN, a odcinek wydłuża się o 0,0556 mm.',
    visual: 'axial',
    focus: { metric: 'section1' },
    formula:
      'N_1=+P_1=+5000\\ \\mathrm{N}\\\\ \\Delta L_1=\\frac{N_1L_1}{EA}=\\frac{5000\\cdot100}{75000\\cdot120}=0{,}0556\\ \\mathrm{mm}',
  },
  {
    title: '5. Przekrój w odcinku 2',
    narration:
      'W drugim odcinku po lewej stronie przekroju działają P₁ w lewo i P₂ w prawo. Ich wypadkowa rozciąga odcinek siłą 2000 N. Pole i moduł są takie same, ale odcinek jest trzy razy dłuższy, więc jego wydłużenie jest większe niż w odcinku pierwszym.',
    caption: 'Przekrój w odcinku środkowym: N₂ = +2 kN i ΔL₂ = 0,0667 mm.',
    visual: 'axial',
    focus: { metric: 'section2' },
    formula:
      'N_2=P_1-P_2=5000-3000=+2000\\ \\mathrm{N}\\\\ \\Delta L_2=\\frac{2000\\cdot300}{75000\\cdot120}=0{,}0667\\ \\mathrm{mm}',
  },
  {
    title: '6. Przekrój w odcinku 3',
    narration:
      'W trzecim odcinku wygodniej rozpatrzyć prawą część przekroju. Działa na nią tylko siła P₄ = 12 000 N skierowana w prawo, więc N₃ = +12 000 N. Ten odcinek przenosi największą siłę i wydłuża się najbardziej.',
    caption: 'Przekrój w odcinku CD: N₃ = +12 kN i ΔL₃ = 0,2667 mm.',
    visual: 'axial',
    focus: { metric: 'section3' },
    formula:
      'N_3=+P_4=+12000\\ \\mathrm{N}\\\\ \\Delta L_3=\\frac{12000\\cdot200}{75000\\cdot120}=0{,}2667\\ \\mathrm{mm}',
  },
  {
    title: '7. Wykres N i suma wydłużeń',
    narration:
      'Wykres siły podłużnej jest schodkowy: +5 kN, +2 kN i +12 kN. Całkowite wydłużenie jest sumą wydłużeń odcinków, bo wszystkie są dodatnie. Otrzymujemy 0,3889 mm, czyli pręt wydłuża się o niespełna 0,4 mm.',
    caption: 'Schodkowy wykres N oraz suma trzech wydłużeń cząstkowych.',
    visual: 'diagram',
    focus: { metric: 'normal' },
    formula: '\\Delta L=\\sum_i\\frac{N_iL_i}{EA}=0{,}0556+0{,}0667+0{,}2667=0{,}3889\\ \\mathrm{mm}',
  },
  {
    title: '8. Kontrola jednostek i interpretacja',
    narration:
      'Jednostka wyniku zgadza się: N·mm dzielone przez MPa·mm² daje mm. Wszystkie siły wewnętrzne są dodatnie, więc cały pręt jest rozciągany, a suma wydłużeń jest dodatnia. Kolejność odcinków nie wpływa na sumę, ale wpływa na rozkład wydłużeń.',
    caption: 'Skumulowany pasek wydłużeń: największy udział ma najdłuższy i najsilniej rozciągany odcinek 3.',
    visual: 'diagram',
    focus: { metric: 'check' },
    formula:
      '\\frac{\\mathrm{N}\\cdot\\mathrm{mm}}{\\mathrm{MPa}\\cdot\\mathrm{mm^2}}=\\mathrm{mm}\\qquad \\Delta L>0\\Rightarrow\\text{wydłużenie}',
    emphasis: 'Wynik ΔL = +0,3889 mm jest wydłużeniem, nie skróceniem.',
  },
]

export default {
  ...createAxialSolution({ ...meta, scenes }),
  animation: lazy(() => import('./animation').then((module) => ({ default: module.AxialElongationAnimation }))),
} satisfies SolutionData
