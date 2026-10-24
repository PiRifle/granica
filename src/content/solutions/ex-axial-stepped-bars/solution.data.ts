import type { SolutionData } from '../../model'
import { SteppedBarsExample1Animation } from './animation'

export default {
  id: 'ex-axial-stepped-bars',
  title: 'Pręty schodkowe: ta sama siła, inne σ — przykład 1',
  duration: 7,
  given: ['N = 60 kN', 'A₁ = 300 mm²', 'A₂ = 150 mm²', 'A₃ = 250 mm²'],
  result:
    'σ₁ = 200 MPa, σ₂ = 400 MPa, σ₃ = 240 MPa. Przekrój krytyczny to odcinek drugi, a przy σdop = 160 MPa każde pole musi wynosić co najmniej 375 mm².',
  animation: SteppedBarsExample1Animation,
  figure: {
    kind: 'axial',
    top: 'fixed',
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
        n: 60,
        sigma: 200,
      },
      {
        id: '2',
        label: '2',
        length: 1000,
        area: 150,
        n: 60,
        sigma: 400,
      },
      {
        id: '3',
        label: '3',
        length: 1000,
        area: 250,
        n: 60,
        sigma: 240,
      },
    ],
    loads: [
      {
        node: 3,
        value: 60,
        label: 'N = 60 kN',
      },
    ],
    note: 'Długości nie są podane — odcinki są schematyczne.',
  },
  scenes: [
    {
      title: 'Model i geometria',
      narration:
        'Pręt składa się z trzech szeregowo połączonych odcinków o polach A₁ = 300 mm², A₂ = 150 mm² i A₃ = 250 mm². Lewy koniec jest utwierdzony, a na swobodnym końcu działa rozciągająca siła N = 60 kN.',
      caption: 'Trzy odcinki o różnych polach; grubość pręta na rysunku odpowiada polu przekroju.',
      visual: 'axial',
      focus: {
        metric: 'A',
      },
      formula: 'A_1=300\\ \\text{mm}^2,\\qquad A_2=150\\ \\text{mm}^2,\\qquad A_3=250\\ \\text{mm}^2',
    },
    {
      title: 'Siła osiowa w kolejnych odcinkach',
      narration:
        'Nie ma obciążeń pośrednich, więc każdy odcinek przenosi tę samą siłę osiową N = +60 kN. Siły są odczytywane kolejno na odcinkach od utwierdzenia do swobodnego końca.',
      caption: 'Ta sama siła wewnętrzna N = +60 kN działa w każdym z trzech odcinków.',
      visual: 'axial',
      focus: {
        metric: 'N',
      },
      formula: 'N_1=N_2=N_3=+60\\ \\text{kN}',
    },
    {
      title: 'Naprężenie w odcinku 1',
      narration:
        'W pierwszym odcinku σ₁ = 60 000/300 = 200 MPa. Ta sama siła jest rozłożona na największym z trzech pól, więc naprężenie jest tu najmniejsze.',
      caption: 'Odcinek 1: σ₁ = 200 MPa.',
      visual: 'axial',
      focus: {
        metric: 'σ',
        segment: '1',
      },
      formula: '\\sigma_1=\\frac{60\\,000}{300}=200\\ \\text{MPa}',
    },
    {
      title: 'Naprężenie w odcinku 2',
      narration:
        'W drugim odcinku σ₂ = 60 000/150 = 400 MPa. To największe naprężenie w całym pręcie, ponieważ pole 150 mm² jest najmniejsze.',
      caption: 'Odcinek 2: σ₂ = 400 MPa — przekrój krytyczny.',
      visual: 'axial',
      focus: {
        metric: 'σ',
        segment: '2',
      },
      formula: '\\sigma_2=\\frac{60\\,000}{150}=400\\ \\text{MPa}',
    },
    {
      title: 'Naprężenie w odcinku 3',
      narration:
        'W trzecim odcinku σ₃ = 60 000/250 = 240 MPa. Naprężenie jest większe niż w odcinku pierwszym, choć mniejsze niż w drugim.',
      caption: 'Odcinek 3: σ₃ = 240 MPa.',
      visual: 'axial',
      focus: {
        metric: 'σ',
        segment: '3',
      },
      formula: '\\sigma_3=\\frac{60\\,000}{250}=240\\ \\text{MPa}',
    },
    {
      title: 'Porównanie i przekrój krytyczny',
      narration:
        'Porównujemy wartości bezwzględne: 400 MPa > 240 MPa > 200 MPa, więc decyduje odcinek drugi. Wszystkie naprężenia przekraczają σdop = 160 MPa, dlatego przy tej geometrii żaden odcinek nie spełnia warunku. Wymagane pole każdego odcinka wynosi co najmniej 375 mm².',
      caption: 'Odcinek 2 jest krytyczny; σdop = 160 MPa jest przekroczone we wszystkich odcinkach.',
      emphasis: 'Przekrój krytyczny: odcinek 2 — σ₂ = 400 MPa.',
      visual: 'axial',
      focus: {
        metric: 'σmax',
      },
      formula: '|\\sigma|_{\\max}=400\\ \\text{MPa}>\\sigma_{\\mathrm{dop}}=160\\ \\text{MPa}',
    },
  ],
} satisfies SolutionData
