import type { SolutionData } from '../../model'

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
  figure: {
    kind: 'beam',
    length: 6,
    supports: [
      { at: 0, label: 'A' },
      { at: 6, label: 'B' },
    ],
    distributed: [{ from: 0, to: 6, start: 0, end: 9, label: 'q₀ = 9 kN/m' }],
    values: [
      { label: 'P', value: '27,0 kN', focus: 'load' },
      { label: 'x_P', value: '4,0 m od A', focus: 'load' },
      { label: 'q₀', value: '9,0 kN/m', focus: 'load' },
    ],
    note: 'Znamy wypadkową i jej położenie; odtwarzamy maksimum obciążenia.',
  },
  scenes: [
    {
      title: 'Związek wypadkowej z maksimum',
      narration:
        'Dla trójkąta o maksimum q₀ wypadkowa jest połową iloczynu q₀ i L. Przekształcamy ten związek tak, aby wyznaczyć q₀ z znanej wypadkowej i długości.',
      formula: 'P=\\frac{1}{2}q_0L\\quad\\Rightarrow\\quad q_0=\\frac{2P}{L}',
      caption: 'Maksimum obciążenia wynika wprost z pola trójkąta.',
      visual: 'beam',
      focus: { metric: 'load' },
    },
    {
      title: 'Obliczenie maksimum',
      narration:
        'Podstawiamy P = 27 kN i L = 6 m. Dzielenie 54 przez 6 daje 9 kN/m. Jednostka zgadza się, ponieważ kN dzielone przez metr daje kN/m.',
      formula: 'q_0=\\frac{2\\cdot27}{6}=9\\,\\mathrm{kN/m}',
      caption: 'q₀ = 9 kN/m.',
      visual: 'beam',
      focus: { metric: 'load' },
    },
    {
      title: 'Kontrola położenia wypadkowej',
      narration:
        'Dla trójkąta maksimum na końcu wypadkowa działa w 2L/3 od końca z zerowym obciążeniem. Dla L = 6 m daje to 4 m, czyli dokładnie tyle, ile podano w zadaniu.',
      formula: 'x_P=\\frac{2}{3}L=\\frac{2}{3}\\cdot6=4\\,\\mathrm{m}',
      caption: 'Położenie wypadkowej potwierdza kształt trójkąta.',
      visual: 'beam',
      focus: { metric: 'load' },
    },
    {
      title: 'Kontrola wartości wypadkowej',
      narration:
        'Wracamy do pola trójkąta z obliczonym q₀. Połowa iloczynu 9 i 6 daje 27 kN, czyli wartość z zadania. Model jest spójny.',
      formula: 'P=\\frac{1}{2}\\cdot9\\cdot6=27\\,\\mathrm{kN}',
      caption: 'Odtworzona wypadkowa zgadza się z daną wartością.',
      visual: 'beam',
      focus: { metric: 'load' },
      emphasis: 'Kształt wykresu determinuje zarówno wartość, jak i położenie wypadkowej.',
    },
  ],
} satisfies SolutionData
