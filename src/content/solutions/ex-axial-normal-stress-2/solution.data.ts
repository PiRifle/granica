import type { SolutionData } from '../../model'

export default {
  id: 'ex-axial-normal-stress-2',
  title: 'Naprężenie normalne: siła na przekroju — przykład 2',
  duration: 7,
  given: ['N=30 kN', 'A_1=300 mm²', 'A_2=150 mm²'],
  result:
    'Gdyby dopuszczalne naprężenie wynosiło 160 MPa, pierwszy pręt spełniałby warunek, a drugi nie. Aby go spełnić, drugi pręt musiałby mieć pole co najmniej A_2,min=30 000/160=187,5 mm^2. To pokazuje, że dobór przekroju nie polega na skopiowaniu sąsiedniego elementu, lecz na sprawdzeniu każdego elementu osobno.',
  figure: {
    kind: 'axial',
    top: 'free',
    bottom: 'free',
    units: {
      N: 'kN',
      σ: 'MPa',
      ε: '–',
      ΔL: 'mm',
      A: 'mm²',
    },
    segments: [
      {
        id: '1',
        label: '1',
        length: 1000,
        area: 300,
        n: 30,
        sigma: 100,
      },
      {
        id: '2',
        label: '2',
        length: 1000,
        area: 150,
        n: 30,
        sigma: 200,
      },
    ],
    note: 'Dwa niezależne pręty o tej samej sile N = 30 kN; długości schematyczne.',
  },
  scenes: [
    {
      title: 'Krok 1',
      narration:
        'Rozważmy dwa niezależne pręty, z których każdy przenosi tę samą siłę rozciągającą N=30 kN. Pierwszy ma pole A_1=300 mm^2, drugi A_2=150 mm^2. Chcemy sprawdzić, który z nich jest bardziej wytężony.',
      caption:
        'Rozważmy dwa niezależne pręty, z których każdy przenosi tę samą siłę rozciągającą N=30 kN. Pierwszy ma pole A_1=300 mm^2, drugi…',
      visual: 'axial',
      focus: {
        metric: 'N',
      },
      formula: 'N=30\\ \\text{kN}',
    },
    {
      title: 'Krok 2',
      narration:
        'Dla pierwszego pręta naprężenie wynosi σ_1=30 000/300=100 MPa. Dla drugiego σ_2=30 000/150=200 MPa. Oba pręty są rozciągane, więc oba naprężenia są dodatnie, ale drugi pręt jest obciążony dwa razy mocniej.',
      caption:
        'Dla pierwszego pręta naprężenie wynosi σ_1=30 000/300=100 MPa. Dla drugiego σ_2=30 000/150=200 MPa. Oba pręty są rozciągane, więc…',
      visual: 'axial',
      focus: {
        metric: 'σ',
        segment: '2',
      },
      formula: '\\sigma_1=30\\,000/300=100\\ \\text{MPa}',
    },
    {
      title: 'Krok 3',
      narration:
        'Ten przykład pokazuje, że „równolegle” nie oznacza „po równo”. Jeśli pręty mają różne sztywności, to przy wspólnym przemieszczeniu podział sił może być inny, ale przy niezależnym obciążeniu każdym z nich tą samą siłą decyduje wyłącznie pole. W zadaniach z prętami połączonymi równolegle trzeba dodatkowo sprawdzić warunek zgodności przemieszczeń, którym zajmiemy się w późniejszych modułach.',
      caption:
        'Ten przykład pokazuje, że „równolegle” nie oznacza „po równo”. Jeśli pręty mają różne sztywności, to przy wspólnym…',
      visual: 'axial',
      focus: {
        metric: 'A',
      },
    },
    {
      title: 'Krok 4',
      narration:
        'Warto zauważyć różnicę między połączeniem szeregowym a równoległym. W szeregowym pręcie schodkowym wszystkie odcinki przenoszą tę samą siłę, a różnią się naprężeniem. W równoległym układzie prętów końce mają wspólne przemieszczenie, więc siły rozkładają się zgodnie ze sztywnościami. Ten sam wzór σ=N/A obowiązuje w obu przypadkach, ale sposób wyznaczenia N jest inny.',
      caption:
        'Warto zauważyć różnicę między połączeniem szeregowym a równoległym. W szeregowym pręcie schodkowym wszystkie odcinki przenoszą tę…',
      visual: 'axial',
      focus: {
        metric: 'σ',
      },
      formula: '\\sigma=N/A',
    },
    {
      title: 'Krok 5',
      narration:
        'Gdyby dopuszczalne naprężenie wynosiło 160 MPa, pierwszy pręt spełniałby warunek, a drugi nie. Aby go spełnić, drugi pręt musiałby mieć pole co najmniej A_2,min=30 000/160=187,5 mm^2. To pokazuje, że dobór przekroju nie polega na skopiowaniu sąsiedniego elementu, lecz na sprawdzeniu każdego elementu osobno.',
      caption:
        'Gdyby dopuszczalne naprężenie wynosiło 160 MPa, pierwszy pręt spełniałby warunek, a drugi nie. Aby go spełnić, drugi pręt…',
      visual: 'axial',
      focus: {
        metric: 'A',
      },
      formula: '160\\ \\text{MPa}',
    },
  ],
} satisfies SolutionData
