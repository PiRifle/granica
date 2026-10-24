import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-design-material-load-3',
  title: 'Dobór materiału i obciążenia dopuszczalnego — przykład 3',
  duration: 7,
  given: ['A=250 mm²', 'R_e=235 MPa', 'P=40 kN', 'n=2'],
  result:
    'Materiał nie wystarcza: σ = 160 MPa przekracza k = 117,5 MPa, a rzeczywisty zapas 1,47 jest mniejszy od wymaganego 2. Potrzebne jest A ≥ 340,4 mm²; po przyjęciu A = 341 mm² otrzymujemy σ ≈ 117,3 MPa ≤ k oraz n ≈ 2,00.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.MaterialLoad3Animation }))),
  figure: {
    kind: 'axial',
    top: 'fixed',
    bottom: 'free',
    segments: [{ id: '1', label: 'pręt', length: 1000, area: 250, n: 40, sigma: 160, deltaL: 0.8 }],
    loads: [{ node: 1, value: 40, label: 'P = 40 kN', direction: 'down' }],
    units: { N: 'kN', σ: 'MPa', ΔL: 'mm', A: 'mm²' },
    note: 'Przy A = 250 mm² naprężenie 160 MPa przekracza zapas wynikający z n = 2.',
  },
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Pręt o polu A = 250 mm² jest wykonany ze stali o granicy plastyczności R_e = 235 MPa i obciążony siłą P = 40 kN. Wymagany współczynnik bezpieczeństwa wynosi n = 2. Pytanie brzmi: czy ten materiał i przekrój wystarczają?',
      caption: 'Dane pręta i wymagany zapas n = 2; trzeba sprawdzić naprężenie i zapas rzeczywisty.',
      visual: 'axial',
      focus: { metric: 'model' },
      formula: 'A=250\\ \\text{mm}^2,\\quad R_e=235\\ \\text{MPa},\\quad P=40\\ \\text{kN},\\quad n=2',
    },
    {
      title: 'Naprężenie rzeczywiste i dopuszczalne',
      narration:
        'Naprężenie rzeczywiste wynosi σ = P/A = 40 000/250 = 160 MPa. Naprężenie dopuszczalne to k = R_e/n = 235/2 = 117,5 MPa. Ponieważ σ > k, sam warunek wytrzymałości nie jest spełniony przy wymaganym zapasie.',
      caption: 'σ = 160 MPa > k = 117,5 MPa — przekroczony jest dopuszczalny poziom naprężenia.',
      visual: 'axial',
      focus: { metric: 'stress' },
      formula:
        '\\sigma=\\frac{P}{A}=\\frac{40\\,000}{250}=160\\ \\text{MPa},\\quad k=\\frac{R_e}{n}=\\frac{235}{2}=117{,}5\\ \\text{MPa}',
    },
    {
      title: 'Rzeczywisty zapas bezpieczeństwa',
      narration:
        'Rzeczywisty zapas względem dostępnej stali wynosi n = R_e/σ = 235/160 ≈ 1,47. To mniej niż wymagane 2. Są trzy drogi naprawy: wybrać stal o wyższej granicy, zwiększyć pole przekroju albo zmniejszyć obciążenie.',
      caption: 'n = 1,47 < n_wym = 2 — dostępna stal nie zapewnia wymaganego zapasu.',
      visual: 'axial',
      focus: { metric: 'safety' },
      formula: 'n_{\\mathrm{rz}}=\\frac{235}{160}\\approx1{,}47<2',
    },
    {
      title: 'Jaka granica materiału byłaby potrzebna',
      narration:
        'Przy niezmienionym polu i obciążeniu wymagana granica plastyczności wynosi R_e,req = nσ = 2 · 160 = 320 MPa. Dostępna stal ma tylko 235 MPa, więc brakuje 85 MPa. Trzeba wybrać stal o podwyższonej wytrzymałości i sprawdzić, czy jej moduł E nie zmienia warunku sztywności.',
      caption: 'Wymagane R_e = 320 MPa > 235 MPa — sam wzrost wytrzymałości materiału jest jednym z wariantów.',
      visual: 'axial',
      focus: { metric: 'material' },
      formula: 'R_{e,\\mathrm{req}}=n\\sigma=2\\cdot160=320\\ \\text{MPa}>235\\ \\text{MPa}',
    },
    {
      title: 'Dobór nowego pola przekroju',
      narration:
        'Przy tej samej stali i wymaganym zapasie n = 2 nowe pole musi wynosić A_min = nP/R_e = 2 · 40 000/235 ≈ 340,4 mm². Przyjmujemy A = 341 mm², czyli zwiększamy przekrój o około 36% względem 250 mm².',
      caption: 'A_min ≈ 340,4 mm², przyjęto A = 341 mm².',
      visual: 'axial',
      focus: { metric: 'section' },
      formula:
        'A_{\\min}=\\frac{nP}{R_e}=\\frac{2\\cdot40\\,000}{235}\\approx340{,}4\\ \\text{mm}^2,\\quad A=341\\ \\text{mm}^2',
    },
    {
      title: 'Kontrola nowego przekroju',
      narration:
        'Dla A = 341 mm² naprężenie wynosi σ = 40 000/341 ≈ 117,3 MPa, czyli nie przekracza k = 117,5 MPa. Rzeczywisty zapas n = 235/117,3 ≈ 2,00 jest równy wymaganemu. Przekrój spełnia warunek, ale zapas jest bardzo mały, więc zaokrąglenie w dół byłoby błędem.',
      caption: 'σ = 117,3 MPa ≤ k = 117,5 MPa oraz n ≈ 2,00 ≥ 2 — warunek spełniony.',
      visual: 'axial',
      focus: { metric: 'check' },
      formula:
        '\\sigma=\\frac{40\\,000}{341}\\approx117{,}3\\ \\text{MPa}\\le k,\\quad n_{\\mathrm{rz}}=\\frac{235}{117{,}3}\\approx2{,}00\\ge2',
    },
  ],
} satisfies SolutionData
