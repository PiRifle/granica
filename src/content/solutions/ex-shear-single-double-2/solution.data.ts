import type { SolutionData } from '../../model'

export default {
  id: 'ex-shear-single-double-2',
  title: 'Połączenia jedno- i dwucięte — przykład 2',
  duration: 7,
  given: ['F = 180 kN', 'd = 18 mm', 'm = 4', 'n = 2'],
  result:
    'W krótkim połączeniu z dwoma lub trzema nitami w szeregu nierównomierność jest niewielka. W długim szeregu może być znacząca, szczególnie gdy blachy są cienkie i podatne. Wtedy obliczenie z równym podziałem daje naprężenie mniejsze od rzeczywistego w pierwszym rzędzie. Zapas bezpieczeństwa powinien to uwzględniać.',
  figure: {
    kind: 'section',
    width: 180,
    height: 60,
    parts: [{ x: 0, y: 0, width: 180, height: 60, label: 'blacha z 4 nitami', tone: 'light' }],
    holes: [
      { cx: 30, cy: 30, r: 9, label: '∅18' },
      { cx: 70, cy: 30, r: 9, label: '∅18' },
      { cx: 110, cy: 30, r: 9, label: '∅18' },
      { cx: 150, cy: 30, r: 9, label: '∅18' },
    ],
    centroid: { x: 90, y: 30 },
    values: [
      { label: 'F', value: '180 kN', focus: 'load', reveal: 0 },
      { label: 'd', value: '18 mm', focus: 'design', reveal: 0 },
      { label: 'm', value: '4', focus: 'design', reveal: 0 },
      { label: 'n', value: '2', focus: 'design', reveal: 0 },
      { label: 'A', value: '254,47 mm²', focus: 'design' },
      { label: 'A_s', value: '2 035,75 mm²', focus: 'design' },
      { label: 'τ_sr', value: '88,4 MPa', focus: 'stress', reveal: 2 },
      { label: 'F na nit', value: '45 kN', focus: 'load', reveal: 2 },
      { label: 'F na płaszczyznę', value: '22,5 kN', focus: 'load', reveal: 2 },
      { label: 'τ jednocięte', value: '176,8 MPa', focus: 'stress' },
    ],
    note: 'Cztery nity dwucięte dają osiem płaszczyzn ścinania.',
  },
  scenes: [
    {
      title: 'Krok 1',
      narration:
        'Rozważmy połączenie z czterema nitami, z których każdy jest dwucięty. Całkowita siła wynosi F = 180 kN, a średnica nitu d = 18 mm. Tym razem nie liczymy tylko jednego łącznika, bo siła rozkłada się na wszystkie cztery.',
      caption:
        'Rozważmy połączenie z czterema nitami, z których każdy jest dwucięty. Całkowita siła wynosi F = 180 kN, a średnica nitu d = 18…',
      visual: 'section',
      focus: { metric: 'load' },
      formula: 'F = 180\\ \\text{kN}',
    },
    {
      title: 'Krok 2',
      narration:
        'Pole jednego przekroju wynosi A = π · 18^2/4 = 254,47 mm^2. Liczba łączników m = 4, liczba cięć na łącznik n = 2, więc łączne pole ścinania to A_s = m n A = 4 · 2 · 254,47 = 2035,75 mm^2.',
      caption:
        'Pole jednego przekroju wynosi A = π · 18^2/4 = 254,47 mm^2. Liczba łączników m = 4, liczba cięć na łącznik n = 2, więc łączne…',
      visual: 'section',
      focus: { metric: 'design' },
      formula: 'A = \\pi \\cdot 18^2/4 = 254{,}47\\ \\text{mm}^2',
    },
    {
      title: 'Krok 3',
      narration:
        'Średnie naprężenie wynosi τ_sr = 180 000/2035,75 = 88,42 MPa. Na jeden nit przypada 180/4 = 45 kN, a na jedną płaszczyznę 45/2 = 22,5 kN. Kontrola: 22 500/254,47 = 88,42 MPa.',
      caption:
        'Średnie naprężenie wynosi τ_sr = 180 000/2035,75 = 88,42 MPa. Na jeden nit przypada 180/4 = 45 kN, a na jedną płaszczyznę 45/2 =…',
      visual: 'section',
      focus: { metric: 'stress' },
      formula: '\\tau_{sr} = 180\\,000/2035{,}75 = 88{,}42\\ \\text{MPa}',
    },
    {
      title: 'Krok 4',
      narration:
        'Ten przykład pokazuje, że liczba łączników i liczba cięć działają mnożnikowo. Cztery nity dwucięte dają osiem płaszczyzn ścinania. Gdyby te same cztery nity były jednocięte, łączne pole byłoby dwa razy mniejsze, a naprężenie dwa razy większe, czyli około 176,8 MPa.',
      caption:
        'Ten przykład pokazuje, że liczba łączników i liczba cięć działają mnożnikowo. Cztery nity dwucięte dają osiem płaszczyzn…',
      visual: 'section',
      focus: { metric: 'stress' },
      formula: '\\tau = 176{,}8\\ \\text{MPa}',
    },
    {
      title: 'Krok 5',
      narration:
        'W praktyce nie zakładaj automatycznie, że wszystkie nity przenoszą równy udział siły. W krótkim połączeniu z jednakowymi blachami jest to dobre przybliżenie. W długim szeregu pierwszy nit może przenosić nawet kilkadziesiąt procent więcej niż wynika to z podziału. Dlatego normy wprowadzają współczynniki redukcyjne albo wymagają sprawdzenia nośności na docisk i rozerwanie blachy.',
      caption:
        'W praktyce nie zakładaj automatycznie, że wszystkie nity przenoszą równy udział siły. W krótkim połączeniu z jednakowymi blachami…',
      visual: 'section',
      focus: { metric: 'design' },
    },
    {
      title: 'Krok 6',
      narration:
        'W krótkim połączeniu z dwoma lub trzema nitami w szeregu nierównomierność jest niewielka. W długim szeregu może być znacząca, szczególnie gdy blachy są cienkie i podatne. Wtedy obliczenie z równym podziałem daje naprężenie mniejsze od rzeczywistego w pierwszym rzędzie. Zapas bezpieczeństwa powinien to uwzględniać.',
      caption:
        'W krótkim połączeniu z dwoma lub trzema nitami w szeregu nierównomierność jest niewielka. W długim szeregu może być znacząca,…',
      visual: 'section',
      focus: { metric: 'stress' },
    },
  ],
} satisfies SolutionData
