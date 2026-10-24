import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-shear-single-double-3',
  title: 'Połączenia jedno- i dwucięte — przykład 3',
  duration: 7,
  given: ['F = 90 kN', 'τ_dop = 120 MPa'],
  result:
    'W praktyce projektant często iteruje: dobiera średnicę, sprawdza rozstaw i odległości od krawędzi, a potem wraca do obliczeń. Nasz przykład pomija te szczegóły, ale pokazuje logikę. Najpierw warunek wytrzymałości, potem zaokrąglenie, na końcu kontrola. Dopiero po niej można przejść do rysunku wykonawczego.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.ShearDesignAnimation }))),
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Projektujemy średnicę sworznia dwuciętego dla siły F = 90 kN i naprężenia dopuszczalnego τ_dop = 120 MPa. Sworzeń przechodzi przez trzy blachy, więc ma dwie płaszczyzny ścinania. Tym razem szukamy wymiaru d, a nie naprężenia.',
      caption: 'Dwie płaszczyzny ścinania i znane τ_dop wyznaczają wymaganą średnicę sworznia.',
      visual: 'section',
      focus: { metric: 'model' },
      formula: 'F=90\\ \\text{kN},\\quad \\tau_{dop}=120\\ \\text{MPa},\\quad n=2',
    },
    {
      title: 'Wymagane łączne pole',
      narration:
        'Z warunku wytrzymałości τ_sr = F/A_s ≤ τ_dop otrzymujemy A_s ≥ F/τ_dop = 90 000/120 = 750 mm². To jest pole całkowite, potrzebne na wszystkich płaszczyznach ścinania.',
      caption: 'Najpierw liczymy łączne pole ścinania, a dopiero potem dzielimy je między przekroje.',
      visual: 'section',
      focus: { metric: 'area' },
      formula: 'A_s\\ge\\frac{F}{\\tau_{dop}}=\\frac{90\\,000}{120}=750\\ \\text{mm}^{2}',
    },
    {
      title: 'Dwie płaszczyzny, połowa pola',
      narration:
        'Sworzeń jest dwucięty, więc A_s = 2A. Na jeden przekrój przypada A ≥ 750/2 = 375 mm². W połączeniu jednociętym całe 750 mm² musiałoby przypadać na jeden przekrój, co dałoby znacznie większą średnicę.',
      caption: 'To samo pole A_s rozkłada się na dwie płaszczyzny; każda potrzebuje tylko 375 mm².',
      visual: 'section',
      focus: { metric: 'planes' },
      formula: 'A\\ge\\frac{A_s}{2}=\\frac{750}{2}=375\\ \\text{mm}^{2}',
    },
    {
      title: 'Wymagana średnica',
      narration:
        'Z zależności A = πd²/4 otrzymujemy d ≥ √(4A/π) = √(4 · 375/π) = √477,46 = 21,85 mm. Najmniejsza dopuszczalna średnica wynosi około 21,9 mm.',
      caption: 'Wymagane pole jednego przekroju zamieniamy na najmniejszą dopuszczalną średnicę.',
      visual: 'section',
      focus: { metric: 'diameter' },
      formula: 'd\\ge\\sqrt{\\frac{4A}{\\pi}}=\\sqrt{\\frac{4\\cdot375}{\\pi}}=21{,}85\\ \\text{mm}',
    },
    {
      title: 'Dobór i kontrola',
      narration:
        'Wybieramy średnicę handlową 22 mm. Pole wynosi A = π · 22²/4 = 380,13 mm², łączne pole 2A = 760,27 mm², a naprężenie τ_sr = 90 000/760,27 = 118,38 MPa. Jest ono mniejsze od 120 MPa, więc warunek jest spełniony. Zaokrąglenie zwiększyło pole, ale nie zmieniło liczby płaszczyzn.',
      caption: 'Średnica 22 mm daje naprężenie 118,4 MPa, czyli poniżej dopuszczalnych 120 MPa.',
      visual: 'section',
      focus: { metric: 'check' },
      formula: '\\tau_{sr}=\\frac{90\\,000}{2\\cdot380{,}13}=118{,}38\\ \\text{MPa}\\le120\\ \\text{MPa}',
    },
  ],
} satisfies SolutionData
