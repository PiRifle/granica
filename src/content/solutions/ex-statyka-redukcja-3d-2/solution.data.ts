import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-statyka-redukcja-3d-2',
  title: 'Redukcja pary sił do bieguna — wektor główny zero, moment swobodny',
  duration: 6,
  given: [
    'F1 = (3, −2, 1) kN w punkcie A = (0, 1, 2) m',
    'F2 = (−3, 2, −1) kN w punkcie B = (2, 0, 1) m',
    'Biegun redukcji O = (0, 0, 0)',
    'Szukamy wektora głównego i momentu głównego',
  ],
  result:
    'R = F1 + F2 = 0. M1 = (5, 6, −3) kN·m, M2 = (−2, −1, 4) kN·m, więc M_O = (3, 5, 1) kN·m. Układ jest równoważny jednej parze, a jej moment nie zależy od bieguna. Kontrola z ramieniem pary: r_BA × F1 = (3, 5, 1) kN·m.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.CoupleReductionAnimation }))),
  scenes: [
    {
      title: 'Model układu',
      narration:
        'Dwie siły mają przeciwne zwroty i równe moduły, więc tworzą parę. Punkty przyłożenia A i B wyznaczają ramię pary. Redukcję zaczynamy od bieguna O i sumujemy momenty obu sił względem tego punktu.',
      caption: 'F2 = −F1, przyłożone w różnych punktach A i B.',
      visual: 'diagram',
      focus: { metric: 'model' },
      formula:
        '\\mathbf F_1=(3,-2,1)\\ \\text{kN},\\quad A=(0,1,2)\\ \\text{m},\\qquad \\mathbf F_2=(-3,2,-1)\\ \\text{kN},\\quad B=(2,0,1)\\ \\text{m}',
    },
    {
      title: 'Wektor główny',
      narration:
        'Sumujemy siły składowa po składowej. Trójki i minus trójki, minus dwójki i dwójki oraz jedynki i minus jedynki dają zero. Wektor główny znika, co oznacza, że układ nie daje wypadkowej siły — pozostaje tylko obrót.',
      caption: 'R = F1 + F2 = (0, 0, 0) kN.',
      visual: 'diagram',
      focus: { metric: 'resultant' },
      formula: '\\mathbf R=\\mathbf F_1+\\mathbf F_2=(3-3,\\,-2+2,\\,1-1)=(0,0,0)\\ \\text{kN}',
    },
    {
      title: 'Moment pierwszej siły',
      narration:
        'Wektor ramienia prowadzi od bieguna O do punktu A. Iloczyn wektorowy r_A × F1 daje moment pierwszej siły względem O. Kolejność czynników jest obowiązkowa: zamiana miejsc zmieniłaby znak całego wektora.',
      caption: 'M1 = r_A × F1 = (5, 6, −3) kN·m.',
      visual: 'diagram',
      focus: { metric: 'moment-1' },
      formula:
        '\\mathbf r_A\\times\\mathbf F_1=(0,1,2)\\times(3,-2,1)=((1)(1)-(2)(-2),\\ (2)(3)-(0)(1),\\ (0)(-2)-(1)(3))=(5,6,-3)',
    },
    {
      title: 'Moment drugiej siły',
      narration:
        'Analogicznie liczymy moment F2 względem O, tym razem z wektorem ramienia do punktu B. Wynik (−2, −1, 4) kN·m jest inny niż dla pierwszej siły, bo siła działa w innym miejscu.',
      caption: 'M2 = r_B × F2 = (−2, −1, 4) kN·m.',
      visual: 'diagram',
      focus: { metric: 'moment-2' },
      formula:
        '\\mathbf r_B\\times\\mathbf F_2=(2,0,1)\\times(-3,2,-1)=((0)(-1)-(1)(2),\\ (1)(-3)-(2)(-1),\\ (2)(2)-(0)(-3))=(-2,-1,4)',
    },
    {
      title: 'Moment główny',
      narration:
        'Dodajemy momenty obu sił. Suma (3, 5, 1) kN·m jest momentem głównym względem O. Ponieważ wektor główny jest zerowy, ten moment nie zmieni się przy przeniesieniu bieguna — to moment swobodny pary.',
      caption: 'M_O = (5, 6, −3) + (−2, −1, 4) = (3, 5, 1) kN·m.',
      visual: 'diagram',
      focus: { metric: 'moment-main' },
      formula: '\\mathbf M_O=\\mathbf M_1+\\mathbf M_2=(5-2,\\,6-1,\\,-3+4)=(3,5,1)\\ \\text{kN}\\cdot\\text{m}',
    },
    {
      title: 'Kontrola niezależności od bieguna',
      narration:
        'Przy zmianie bieguna moment przelicza się wzorem M_O′ = M_O − a × R. Skoro R = 0, drugi składnik znika i moment jest taki sam dla każdego bieguna. Niezależna kontrola z ramieniem pary od B do A i siłą F1 daje dokładnie (3, 5, 1) kN·m.',
      caption: 'R = 0 ⇒ M_O′ = M_O; r_BA × F1 = (3, 5, 1) kN·m.',
      visual: 'diagram',
      focus: { metric: 'check' },
      formula:
        '\\mathbf M_{O\\prime}=\\mathbf M_O-\\mathbf a\\times\\mathbf R=\\mathbf M_O,\\qquad \\mathbf r_{BA}\\times\\mathbf F_1=(-2,1,1)\\times(3,-2,1)=(3,5,1)',
    },
  ],
} satisfies SolutionData
