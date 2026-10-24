import type { SolutionData } from '../../model'
import { Ideal3Animation } from './animation'

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
  animation: Ideal3Animation,
  scenes: [
    {
      title: 'Model, dane i obliczenia',
      narration:
        'Dla trójkąta o maksimum q₀ wypadkowa jest połową iloczynu q₀ i L. Przekształcamy ten związek tak, aby wyznaczyć q₀ z znanej wypadkowej i długości. Podstawiamy P = 27 kN i L = 6 m. Dzielenie 54 przez 6 daje 9 kN/m. Jednostka zgadza się, ponieważ kN dzielone przez metr daje kN/m. Dla trójkąta maksimum na końcu wypadkowa działa w 2L/3 od końca z zerowym obciążeniem. Dla L = 6 m daje to 4 m, czyli dokładnie tyle, ile podano w zadaniu. Wracamy do pola trójkąta z obliczonym q₀. Połowa iloczynu 9 i 6 daje 27 kN, czyli wartość z zadania. Model jest spójny.',
      caption: 'Odtworzona wypadkowa zgadza się z daną wartością.',
      visual: 'beam',
      formula:
        'P=\\frac{1}{2}q_0L\\quad\\Rightarrow\\quad q_0=\\frac{2P}{L}\\qquad q_0=\\frac{2\\cdot27}{6}=9\\,\\mathrm{kN/m}\\qquad x_P=\\frac{2}{3}L=\\frac{2}{3}\\cdot6=4\\,\\mathrm{m}\\qquad P=\\frac{1}{2}\\cdot9\\cdot6=27\\,\\mathrm{kN}',
    },
  ],
} satisfies SolutionData
