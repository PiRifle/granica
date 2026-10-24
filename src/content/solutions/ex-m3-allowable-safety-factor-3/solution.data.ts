import type { SolutionData } from '../../model'

export default {
  id: 'ex-m3-allowable-safety-factor-3',
  title: 'Naprężenie dopuszczalne i współczynnik bezpieczeństwa — przykład 3',
  duration: 7,
  given: ['A=500 mm²', 'R_e=235 MPa', 'n=2'],
  result:
    'Zależność jest odwrotnie proporcjonalna do n. Podwojenie wymaganego zapasu oznacza w tym modelu dwukrotne zmniejszenie dopuszczalnej siły przy tym samym przekroju. W praktyce oznacza to konieczność zwiększenia pola albo zmiany materiału, a nie „lepszego wykorzystania” istniejącego pręta.',
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
        area: 500,
        n: 58.75,
        sigma: 117.5,
      },
      {
        id: '2',
        label: '2',
        length: 1000,
        area: 500,
        n: 58.75,
        sigma: 117.5,
      },
    ],
    loads: [
      {
        node: 2,
        value: 58.75,
        label: 'N_max = 58,75 kN',
      },
    ],
    note: 'Dla n = 2: σ_dop = 117,5 MPa i N_max = 58,75 kN.',
  },
  scenes: [
    {
      title: 'Krok 1',
      narration:
        'Rozważmy istniejący pręt o polu A=500 mm^2 wykonany ze stali o R_e=235 MPa. Wymagany współczynnik bezpieczeństwa wynosi n=2. Chcemy wyznaczyć maksymalną siłę roboczą.',
      caption:
        'Rozważmy istniejący pręt o polu A=500 mm^2 wykonany ze stali o R_e=235 MPa. Wymagany współczynnik bezpieczeństwa wynosi n=2.…',
      visual: 'thermal',
      focus: {
        metric: 'A',
      },
      formula: 'R_{e} = 235 MPa',
    },
    {
      title: 'Krok 2',
      narration: 'Naprężenie dopuszczalne jest równe',
      caption: 'Naprężenie dopuszczalne jest równe',
      visual: 'thermal',
      focus: {
        metric: 'σ',
      },
    },
    {
      title: 'Krok 3',
      narration: 'Zapis matematyczny.',
      caption: 'σ_dop=(235)/(2)=117,5 MPa.',
      visual: 'thermal',
      focus: {
        metric: 'σ',
      },
      formula: '\\sigma_{\\mathrm{dop}}=\\frac{235}{2}=117{,}5\\ \\text{MPa}.',
    },
    {
      title: 'Krok 4',
      narration: 'Maksymalna siła wynosi więc',
      caption: 'Maksymalna siła wynosi więc',
      visual: 'thermal',
      focus: {
        metric: 'N',
      },
    },
    {
      title: 'Krok 5',
      narration: 'Zapis matematyczny.',
      caption: 'N_max=σ_dopA=117,5·500=58 750 N≈58,8 kN.',
      visual: 'thermal',
      focus: {
        metric: 'N',
      },
      formula: 'N_{\\max}=\\sigma_{\\mathrm{dop}}A=117{,}5\\cdot500=58\\,750\\ \\text{N}\\approx58{,}8\\ \\text{kN}.',
    },
    {
      title: 'Krok 6',
      narration:
        'Przy sile 50 kN naprężenie wynosi 100 MPa, a rzeczywisty współczynnik n_rz=235/100=2,35, więc element ma zapas większy od wymaganego. Przy sile 70 kN naprężenie rośnie do 140 MPa, a n_rz=235/140≈1,68. Warunek n_rz≥2 nie jest spełniony, mimo że naprężenie jest jeszcze mniejsze od R_e. Element nie uległby natychmiastowemu zniszczeniu, ale nie spełnia przyjętego kryterium bezpieczeństwa.',
      caption:
        'Przy sile 50 kN naprężenie wynosi 100 MPa, a rzeczywisty współczynnik n_rz=235/100=2,35, więc element ma zapas większy od…',
      visual: 'thermal',
      focus: {
        metric: 'σ',
      },
      formula: 'n_{rz} = 235/100 = 2{,}35',
    },
    {
      title: 'Krok 7',
      narration: 'Jeżeli wymaganie wzrośnie do n=2,5, maksymalna siła maleje do',
      caption: 'Jeżeli wymaganie wzrośnie do n=2,5, maksymalna siła maleje do',
      visual: 'thermal',
      focus: {
        metric: 'σ',
      },
      formula: 'n = 2{,}5',
    },
    {
      title: 'Krok 8',
      narration: 'Zapis matematyczny.',
      caption: 'N_max=(235·500)/(2,5)=47 000 N=47 kN.',
      visual: 'thermal',
      focus: {
        metric: 'N',
      },
      formula: 'N_{\\max}=\\frac{235\\cdot500}{2{,}5}=47\\,000\\ \\text{N}=47\\ \\text{kN}.',
    },
    {
      title: 'Krok 9',
      narration:
        'Zależność jest odwrotnie proporcjonalna do n. Podwojenie wymaganego zapasu oznacza w tym modelu dwukrotne zmniejszenie dopuszczalnej siły przy tym samym przekroju. W praktyce oznacza to konieczność zwiększenia pola albo zmiany materiału, a nie „lepszego wykorzystania” istniejącego pręta.',
      caption:
        'Zależność jest odwrotnie proporcjonalna do n. Podwojenie wymaganego zapasu oznacza w tym modelu dwukrotne zmniejszenie…',
      visual: 'thermal',
      focus: {
        metric: 'σ',
      },
    },
  ],
} satisfies SolutionData
