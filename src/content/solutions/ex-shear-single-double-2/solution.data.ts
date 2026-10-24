import type { SolutionData } from '../../model'
import { ShearMultiRivetAnimation } from './animation'

export default {
  id: 'ex-shear-single-double-2',
  title: 'Połączenia jedno- i dwucięte — przykład 2',
  duration: 7,
  given: ['F = 180 kN', 'd = 18 mm', 'm = 4', 'n = 2'],
  result:
    'W krótkim połączeniu z dwoma lub trzema nitami w szeregu nierównomierność jest niewielka. W długim szeregu może być znacząca, szczególnie gdy blachy są cienkie i podatne. Wtedy obliczenie z równym podziałem daje naprężenie mniejsze od rzeczywistego w pierwszym rzędzie. Zapas bezpieczeństwa powinien to uwzględniać.',
  animation: ShearMultiRivetAnimation,
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Połączenie ma cztery nity, a każdy z nich jest dwucięty. Całkowita siła wynosi F = 180 kN, a średnica nitu d = 18 mm. Siła rozkłada się na wszystkie cztery nity, dlatego trzeba policzyć łączną liczbę płaszczyzn, a nie tylko jeden przekrój.',
      caption: 'Cztery nity przechodzą przez trzy blachy; każdy nit ma dwa styki przenoszące siłę.',
      visual: 'section',
      focus: { metric: 'model' },
      formula: 'F=180\\ \\text{kN},\\quad d=18\\ \\text{mm},\\quad m=4,\\quad n=2',
    },
    {
      title: 'Dwa cięcia na nit',
      narration:
        'Każdy nit jest ścinany w dwóch miejscach: na styku z górną i dolną blachą zewnętrzną. Dla czterech nitów łączna liczba płaszczyzn wynosi mn = 4 · 2 = 8. Liczba blach nie jest równa liczbie płaszczyzn.',
      caption: 'Osiem płaszczyzn ścinania to wynik mnożenia liczby nitów przez liczbę cięć na nit.',
      visual: 'section',
      focus: { metric: 'planes' },
      formula: 'm n=4\\cdot2=8',
    },
    {
      title: 'Łączne pole ścinania',
      narration:
        'Pole jednego przekroju nitu wynosi A = π · 18²/4 = 254,47 mm². Przy ośmiu płaszczyznach łączne pole ścinania to A_s = mnA = 8A = 2035,75 mm². To właśnie to pole trafia do mianownika wzoru.',
      caption: 'Osiem pól A daje łączne pole A_s = 8A; nie liczymy tylko jednego nitu.',
      visual: 'section',
      focus: { metric: 'area' },
      formula: 'A=\\frac{\\pi d^{2}}{4}=254{,}47\\ \\text{mm}^{2},\\quad A_s=m n A=8A=2035{,}75\\ \\text{mm}^{2}',
    },
    {
      title: 'Siła na nit i płaszczyznę',
      narration:
        'Całkowita siła dzieli się najpierw na cztery nity: 180/4 = 45 kN na nit. Każdy nit ma dwa cięcia, więc na jedną płaszczyznę przypada 45/2 = 22,5 kN, czyli F/(mn) = 180/8 = 22,5 kN.',
      caption: 'Siła spada stopniowo: 180 kN na połączenie, 45 kN na nit i 22,5 kN na płaszczyznę.',
      visual: 'section',
      focus: { metric: 'load' },
      formula: 'F_p=\\frac{F}{m n}=\\frac{180}{4\\cdot2}=22{,}5\\ \\text{kN}',
    },
    {
      title: 'Naprężenie średnie',
      narration:
        'Średnie naprężenie wynosi τ_sr = 180 000/2035,75 = 88,42 MPa. Gdyby te same cztery nity były jednocięte, łączne pole byłoby dwa razy mniejsze, a naprężenie dwa razy większe, czyli około 176,8 MPa.',
      caption: 'Cztery nity dwucięte dają osiem płaszczyzn i naprężenie o połowę mniejsze niż w wariancie jednociętym.',
      visual: 'section',
      focus: { metric: 'stress' },
      formula: '\\tau_{sr}=\\frac{180\\,000}{8\\cdot254{,}47}=88{,}42\\ \\text{MPa}',
    },
    {
      title: 'Kontrola założeń',
      narration:
        'Obliczenie zakłada równy podział siły między nity i płaszczyzny. W krótkim połączeniu jest to dobre przybliżenie. W długim szeregu pierwszy nit może przenosić więcej, szczególnie przy cienkich i podatnych blachach. Dlatego normy wprowadzają współczynniki redukcyjne i dodatkowe sprawdzenia docisku oraz rozerwania blachy.',
      caption: 'Rzeczywisty podział może być nierówny; równomierne F/(mn) to założenie projektowe, nie pomiar.',
      visual: 'section',
      focus: { metric: 'distribution' },
      formula: 'F_p\\approx\\frac{F}{m n}',
    },
  ],
} satisfies SolutionData
