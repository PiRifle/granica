import { lazy } from 'react'
import type { SolutionData } from '../../model'
import type { SolutionScene } from '../../../types'
import { createShearBendingSolution } from '../../solution-factories/factory-shear-bending/factory'
import { meta } from './task'

const scenes: SolutionScene[] = [
  {
    title: '1. Model belki wspornikowej',
    narration:
      'Oś x prowadzimy od swobodnego lewego końca A do utwierdzenia C w x = 2,0 m. Na odcinku AB o długości 1,5 m działa obciążenie q, a w punkcie B przyłożony jest moment skupiony 5 kN·m. Odcinek BC o długości 0,5 m jest nieobciążony.',
    caption: 'Belka utwierdzona w C: q na AB, moment skupiony w B i swobodny odcinek BC.',
    visual: 'beam',
    focus: { metric: 'model' },
    formula:
      'q=20\\ \\mathrm{kN/m}\\quad M=5\\ \\mathrm{kN\\cdot m}\\quad l_1=1{,}5\\ \\mathrm{m}\\quad l_2=0{,}5\\ \\mathrm{m}',
  },
  {
    title: '2. Dane, jednostki i umowa znaków',
    narration:
      'Przeliczamy obciążenie na spójne jednostki: 20 kN/m = 20 N/mm, a moment 5 kN·m = 5·10⁶ N·mm. Naprężenie dopuszczalne 200 MPa jest równe 200 N/mm². Dodatni moment gnący przyjmujemy tak, że wywołuje ugięcie brzusznikiem w dół.',
    caption: 'Wszystkie wielkości w niutonach i milimetrach; dodatni moment odznaczamy umownie.',
    visual: 'beam',
    focus: { metric: 'data' },
    formula:
      'q=20\\ \\mathrm{N/mm}\\qquad M=5\\cdot10^6\\ \\mathrm{N\\cdot mm}\\\\ k_g=200\\ \\mathrm{MPa}=200\\ \\mathrm{N/mm^2}',
  },
  {
    title: '3. Reakcje w utwierdzeniu',
    narration:
      'Suma sił pionowych daje reakcję 30 kN, bo wypadkowa obciążenia ciągłego to q·l1 = 30 kN. Moment utwierdzenia wyznaczamy sumą momentów względem C: wypadkowa działa w odległości 2,0 − 0,75 = 1,25 m, a moment skupiony dodajemy bez zmiany ramienia. Otrzymujemy 42,5 kN·m.',
    caption: 'W utwierdzeniu działają reakcja 30 kN i moment 42,5 kN·m.',
    visual: 'beam',
    focus: { metric: 'reaction' },
    formula: 'R_C=q\\,l_1=30\\ \\mathrm{kN}\\\\ M_R=q\\,l_1\\,(2{,}0-0{,}75)+M=37{,}5+5=42{,}5\\ \\mathrm{kN\\cdot m}',
  },
  {
    title: '4. Wykres siły poprzecznej',
    narration:
      'Na odcinku AB siła poprzeczna maleje liniowo od zera w A do −30 kN przed B. Moment skupiony nie zmienia siły poprzecznej, więc na całym odcinku BC pozostaje ona równa −30 kN. Na wykresie nie ma skoku w B.',
    caption: 'T maleje liniowo do −30 kN i pozostaje stałe do utwierdzenia.',
    visual: 'diagram',
    focus: { metric: 'shear' },
    formula:
      'T(x)=-qx\\quad 0\\le x<1{,}5\\\\ T(1{,}5^-)=-30\\ \\mathrm{kN}\\qquad T=-30\\ \\mathrm{kN}\\quad 1{,}5<x<2',
  },
  {
    title: '5. Wykres momentu gnącego',
    narration:
      'Na AB moment jest parabolą: M = −qx²/2, więc przed B osiąga −22,5 kN·m. Moment skupiony powoduje skok o 5 kN·m do −27,5 kN·m, a na nieobciążonym odcinku BC wykres jest prostą. W utwierdzeniu otrzymujemy −42,5 kN·m.',
    caption: 'Parabola do −22,5 kN·m, skok do −27,5 kN·m i prosta do −42,5 kN·m w C.',
    visual: 'diagram',
    focus: { metric: 'moment' },
    formula:
      'M(x)=-\\frac{qx^2}{2}\\qquad M(1{,}5^-)=-22{,}5\\ \\mathrm{kN\\cdot m}\\\\ M(1{,}5^+)=-27{,}5\\qquad M(2{,}0)=-42{,}5\\ \\mathrm{kN\\cdot m}',
  },
  {
    title: '6. Największy moment i dobór wskaźnika',
    narration:
      'Największa wartość bezwzględna momentu to 42,5 kN·m w utwierdzeniu. Dzieląc ją przez naprężenie dopuszczalne, otrzymujemy wymagany wskaźnik 212 500 mm³, czyli 212,5 cm³. To dolna granica — przekrój musi mieć W_y co najmniej tak duże.',
    caption: 'Wymagane W_y ≥ 212,5 cm³ wynika z |M|max = 42,5 kN·m.',
    visual: 'diagram',
    focus: { metric: 'design' },
    formula:
      'W_y\\ge\\frac{|M|_{\\max}}{k_g}=\\frac{42{,}5\\cdot10^6}{200}=212\\,500\\ \\mathrm{mm^3}=212{,}5\\ \\mathrm{cm^3}',
  },
  {
    title: '7. Dobór dwuteownika z tabeli',
    narration:
      'W tabeli dwuteowników szukamy najmniejszego profilu, którego W_y jest nie mniejsze niż 212,5 cm³. Dwuteownik I 200 ma W_y = 214 cm³, więc spełnia warunek i jest najmniejszym wystarczającym przekrojem. O doborze decyduje wskaźnik wytrzymałości, a nie pole powierzchni.',
    caption: 'I 200 o W_y = 214 cm³ jest najmniejszym profilem spełniającym warunek.',
    visual: 'section',
    focus: { metric: 'section' },
    formula: 'I\\ 200:\\quad W_y=214\\ \\mathrm{cm^3}>212{,}5\\ \\mathrm{cm^3}',
  },
  {
    title: '8. Niezależna kontrola naprężeń',
    narration:
      'Dla przyjętego profilu naprężenie wynosi 42,5·10⁶ podzielone przez 214·10³, czyli 198,6 MPa. Jest to mniej od 200 MPa, więc warunek wytrzymałości jest spełniony. Zapas jest niewielki — około 0,7%, dlatego wynik należy traktować jako graniczny.',
    caption: 'σmax = 198,6 MPa < k_g = 200 MPa — warunek spełniony z zapasem 0,7%.',
    visual: 'section',
    focus: { metric: 'check' },
    formula:
      '\\sigma_{\\max}=\\frac{42{,}5\\cdot10^6}{214\\cdot10^3}=198{,}6\\ \\mathrm{MPa}\\\\ 198{,}6\\ \\mathrm{MPa}<200\\ \\mathrm{MPa}\\qquad \\text{zapas}\\approx0{,}7\\%',
  },
]

export default {
  ...createShearBendingSolution({ ...meta, scenes }),
  animation: lazy(() => import('./animation').then((module) => ({ default: module.CantileverDesignAnimation }))),
} satisfies SolutionData
