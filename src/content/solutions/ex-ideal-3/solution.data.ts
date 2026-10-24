import type { SolutionData } from '../../model'
import { Ideal3InverseAnimation } from './animation'

export default {
  id: 'ex-ideal-3',
  title: 'Odwrotny wariant obciążenia trójkątnego',
  duration: 6,
  given: [
    'L = 6 m; obciążenie trójkątne o maksimum q₀ na jednym końcu',
    'Wypadkowa P = 27 kN działa 4 m od końca, gdzie obciążenie jest zerowe',
    'Szukamy maksymalnej intensywności q₀',
  ],
  result: 'Maksymalna intensywność obciążenia wynosi q₀ = 9 kN/m.',
  animation: Ideal3InverseAnimation,
  scenes: [
    {
      title: 'Dane odwrotne: znana wypadkowa i położenie',
      narration:
        'Wiemy, że wypadkowa P = 27 kN działa 4 m od końca, na którym obciążenie jest zerowe. Położenie 4 m odpowiada 2L/3, więc kształt trójkąta się zgadza. Maksimum q₀ pozostaje jednak niewiadome.',
      formula: 'x_P=\\frac{2}{3}L=\\frac{2}{3}\\cdot6=4\\,\\mathrm{m}',
      caption: 'Dane: P = 27 kN i x_P = 4 m. Maksimum q₀ pozostaje niewiadome.',
      visual: 'beam',
      focus: { metric: 'given' },
    },
    {
      title: 'Od wypadkowej do pola trójkąta',
      narration:
        'Dla trójkąta o maksimum q₀ wypadkowa jest połową iloczynu q₀ i L. Przekształcamy ten związek tak, aby wyznaczyć q₀ ze znanej wypadkowej i długości.',
      formula: 'P=\\frac{1}{2}q_0L\\quad\\Rightarrow\\quad q_0=\\frac{2P}{L}',
      caption: 'Pole trójkąta wiąże znane P z nieznanym q₀.',
      visual: 'beam',
      focus: { metric: 'inverse' },
    },
    {
      title: 'Obliczenie maksimum i kontrola',
      narration:
        'Podstawiamy P = 27 kN i L = 6 m. Dzielenie 54 przez 6 daje 9 kN/m. Kontrola: połowa iloczynu 9 i 6 daje 27 kN, a wypadkowa nadal działa w 2L/3 = 4 m.',
      formula: 'q_0=\\frac{2\\cdot27}{6}=9\\,\\mathrm{kN/m},\\qquad P=\\frac{1}{2}\\cdot9\\cdot6=27\\,\\mathrm{kN}',
      caption: 'Obliczone q₀ = 9 kN/m odtwarza daną wypadkową 27 kN.',
      visual: 'beam',
      focus: { metric: 'result' },
      emphasis: 'Kształt wykresu determinuje zarówno wartość, jak i położenie wypadkowej.',
    },
  ],
} satisfies SolutionData
