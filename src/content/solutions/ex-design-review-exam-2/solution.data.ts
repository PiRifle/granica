import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-design-review-exam-2',
  title: 'Powtórka mieszana i strategia kolokwium — przykład 2',
  duration: 7,
  animation: lazy(() => import('./animation').then((module) => ({ default: module.DesignReviewExam2Animation }))),
  given: ['D_1=60 mm', 'L_1=0,8 m', 'D_2=40 mm', 'L_2=0,6 m', 'T=500 N·m', 'G=80 GPa'],
  result:
    'W układzie schodkowym trzeba sprawdzić każdy odcinek osobno. Moment jest wspólny, ale najmniejsza średnica decyduje o naprężeniu. Dla D_2 = 40 mm τ_2 ≈ 39,8 MPa jest bliskie 40 MPa, a odcinek 2 dominuje w sumie kąta. Oba warunki są spełnione, a wytrzymałość jest wykorzystana niemal w całości.',
  scenes: [
    {
      title: 'Model wału schodkowego',
      narration:
        'Wał składa się z dwóch odcinków: pierwszego o D_1 = 60 mm i L_1 = 0,8 m oraz drugiego o D_2 = 40 mm i L_2 = 0,6 m. Przenosi moment T = 500 N·m, a G = 80 GPa. Sprawdzamy τ_dop = 40 MPa i φ_dop = 1,2°.',
      caption: 'Geometria i dane materiałowe. Momenty i średnice są znane, szukamy naprężeń oraz kąta skręcenia.',
      visual: 'beam',
      focus: { metric: 'model' },
      formula:
        'D_1=60\\ \\text{mm},\\quad L_1=0{,}8\\ \\text{m},\\quad D_2=40\\ \\text{mm},\\quad L_2=0{,}6\\ \\text{m}',
    },
    {
      title: 'Moment skręcający w obu odcinkach',
      narration:
        'Moment T = 500 N·m, czyli 500 000 N·mm, jest przenoszony przez cały wał. Na obu odcinkach działa ten sam moment wewnętrzny, dlatego o naprężeniu decyduje mniejsza średnica.',
      caption: 'Wykres momentu jest stały na całej długości. Zmienia się tylko przekrój, a nie obciążenie.',
      visual: 'beam',
      focus: { metric: 'torque' },
      formula: 'T=500\\ \\text{N}\\cdot\\text{m}=500\\,000\\ \\text{N}\\cdot\\text{mm}',
    },
    {
      title: 'Naprężenia w obu odcinkach',
      narration:
        'Dla odcinka 1: J_o1 = π·60⁴/32 ≈ 1 272 345 mm⁴, W_o1 ≈ 42 412 mm³, więc τ_1 = 500 000/42 412 ≈ 11,8 MPa. Dla odcinka 2: J_o2 ≈ 251 327 mm⁴, W_o2 ≈ 12 566 mm³ i τ_2 ≈ 39,8 MPa, czyli niemal 40 MPa.',
      caption: 'Mniejsza średnica daje znacznie większe naprężenie. Odcinek 2 jest wykorzystany w 99,5%.',
      visual: 'beam',
      focus: { metric: 'stress' },
      formula:
        '\\tau_1=\\frac{500\\,000}{42\\,412}\\approx11{,}8\\ \\text{MPa},\\quad \\tau_2=\\frac{500\\,000}{12\\,566}\\approx39{,}8\\ \\text{MPa}',
    },
    {
      title: 'Kąty skręcenia odcinków',
      narration:
        'Kąt każdego odcinka liczymy osobno: φ = TL/(GJ_o). Odcinek 1 daje φ_1 ≈ 0,00393 rad, a odcinek 2 φ_2 ≈ 0,01492 rad. Mimo krótszej długości odcinek 2 obraca się znacznie mocniej, bo ma mały moment bezwładności J_o.',
      caption: 'Znaczniki przekrojów pokazują obrót. Odcinek 2 odpowiada za większość kąta skręcenia.',
      visual: 'beam',
      focus: { metric: 'twist' },
      formula:
        '\\varphi_1=\\frac{T L_1}{G J_{o1}}\\approx0{,}00393\\ \\text{rad},\\quad \\varphi_2=\\frac{T L_2}{G J_{o2}}\\approx0{,}01492\\ \\text{rad}',
    },
    {
      title: 'Suma kątów i warunek sztywności',
      narration:
        'Całkowity kąt jest sumą udziałów obu odcinków: φ = φ_1 + φ_2 ≈ 0,01885 rad, czyli 1,08°. To mniej niż φ_dop = 1,2°, więc warunek sztywności jest spełniony.',
      caption:
        'Wykres φ(x) rośnie łagodnie w odcinku 1 i stromo w odcinku 2. Cały przebieg pozostaje pod linią dopuszczalną.',
      visual: 'beam',
      focus: { metric: 'total' },
      formula: '\\varphi=\\varphi_1+\\varphi_2\\approx0{,}01885\\ \\text{rad}=1{,}08^\\circ\\le1{,}2^\\circ',
    },
    {
      title: 'Decyzja i kontrola',
      narration:
        'Oba warunki są spełnione: τ_2 ≈ 39,8 MPa ≤ 40 MPa oraz φ ≈ 1,08° ≤ 1,2°. Wytrzymałość jest jednak wykorzystana niemal w całości, więc decyduje cieńszy odcinek 2. W układzie schodkowym trzeba sprawdzić każdy odcinek osobno.',
      caption: 'Kontrola końcowa: naprężenie i kąt mieszczą się w granicach, a o wyniku decyduje odcinek 2.',
      visual: 'beam',
      focus: { metric: 'check' },
      formula:
        '\\tau_2\\approx39{,}8\\ \\text{MPa}\\le40\\ \\text{MPa},\\quad \\varphi\\approx1{,}08^\\circ\\le1{,}2^\\circ',
    },
  ],
} satisfies SolutionData
