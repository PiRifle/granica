import type { SolutionData } from '../../model'

export default {
  id: 'ex-m3-self-weight-2',
  title: 'Ciężar własny elementu — przykład 2',
  duration: 7,
  given: ['P=5 kN'],
  result:
    'Zauważ, że w obu przypadkach wydłużenie od ciężaru własnego jest takie samo, bo nie zależy od ładunku P. Zmienia się tylko dodatkowy składnik PL/(EA). Dzięki zasadzie superpozycji możemy analizować te dwa wpływy osobno i dodać wyniki, dopóki materiał pozostaje liniowo sprężysty.',
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
        id: 'g',
        label: 'górny',
        length: 2000,
        area: 300,
        n: 5069,
        sigma: 16.9,
        epsilon: 0.0000845,
        deltaL: 0.16897,
      },
      {
        id: 'd',
        label: 'dolny',
        length: 2000,
        area: 300,
        n: 5023,
        sigma: 16.74,
        epsilon: 0.0000837,
        deltaL: 0.16743,
      },
    ],
    loads: [
      {
        node: 2,
        value: 5,
        label: 'P = 5 kN',
      },
    ],
    note: 'Podano średnie N i σ w połówkach; δ ≈ 0,336 mm.',
  },
  scenes: [
    {
      title: 'Krok 1',
      narration:
        'Do tego samego pręta zawieszono na dolnym końcu dodatkowy ładunek P=5 kN. Siła przy zawieszeniu wynosi teraz',
      caption:
        'Do tego samego pręta zawieszono na dolnym końcu dodatkowy ładunek P=5 kN. Siła przy zawieszeniu wynosi teraz',
      visual: 'thermal',
      focus: { metric: 'N' },
      formula: 'P = 5 kN',
    },
    {
      title: 'Krok 2',
      narration: 'Zapis matematyczny.',
      caption: 'N(L)=P+γ AL=5000+92,4=5092,4 N.',
      visual: 'thermal',
      focus: { metric: 'N' },
      formula: 'N(L)=P+\\gamma AL=5000+92{,}4=5092{,}4\\ \\text{N}.',
    },
    {
      title: 'Krok 3',
      narration: 'Naprężenie przy zawieszeniu:',
      caption: 'Naprężenie przy zawieszeniu:',
      visual: 'thermal',
      focus: { metric: 'σ' },
    },
    {
      title: 'Krok 4',
      narration: 'Zapis matematyczny.',
      caption: 'σ_max=(5092,4)/(300)≈ 16,97 MPa.',
      visual: 'thermal',
      focus: { metric: 'σ' },
      formula: '\\sigma_{\\max}=\\frac{5092{,}4}{300}\\approx 16{,}97\\ \\text{MPa}.',
    },
    {
      title: 'Krok 5',
      narration: 'Wydłużenie całkowite jest sumą wydłużenia od ładunku i od ciężaru własnego:',
      caption: 'Wydłużenie całkowite jest sumą wydłużenia od ładunku i od ciężaru własnego:',
      visual: 'thermal',
      focus: { metric: 'ΔL' },
    },
    {
      title: 'Krok 6',
      narration: 'Zapis matematyczny.',
      caption: 'δ=(PL)/(EA)+(γ L^2)/(2E) =(5000· 4000)/(200 000· 300)+(77 000· 16)/(2· 200· 10^9).',
      visual: 'thermal',
      focus: { metric: 'ΔL' },
      formula:
        '\\delta=\\frac{PL}{EA}+\\frac{\\gamma L^2}{2E}\n=\\frac{5000\\cdot 4000}{200\\,000\\cdot 300}+\\frac{77\\,000\\cdot 16}{2\\cdot 200\\cdot 10^9}.',
    },
    {
      title: 'Krok 7',
      narration:
        'Pierwszy składnik wynosi około 0,333 mm, drugi około 0,00308 mm. Razem δ≈ 0,336 mm. Widzimy, że w tym zadaniu o wydłużeniu decyduje ładunek zewnętrzny, a ciężar własny daje mniej niż jeden procent wyniku.',
      caption:
        'Pierwszy składnik wynosi około 0,333 mm, drugi około 0,00308 mm. Razem δ≈ 0,336 mm. Widzimy, że w tym zadaniu o wydłużeniu…',
      visual: 'thermal',
      focus: { metric: 'ΔL' },
      formula: '\\delta \\approx 0{,}336 mm',
    },
    {
      title: 'Krok 8',
      narration:
        'Gdyby ładunek zwiększyć do 50 kN, naprężenie wzrosłoby do około 170 MPa. Nadal byłoby mniejsze od typowej granicy plastyczności, ale zapas znacznie by się zmniejszył. Taki rachunek jest typowym elementem projektu: ciężar własny dodajemy do obciążenia użytkowego, a następnie sprawdzamy sumę.',
      caption:
        'Gdyby ładunek zwiększyć do 50 kN, naprężenie wzrosłoby do około 170 MPa. Nadal byłoby mniejsze od typowej granicy plastyczności,…',
      visual: 'thermal',
      focus: { metric: 'σ' },
    },
    {
      title: 'Krok 9',
      narration:
        'Zauważ, że w obu przypadkach wydłużenie od ciężaru własnego jest takie samo, bo nie zależy od ładunku P. Zmienia się tylko dodatkowy składnik PL/(EA). Dzięki zasadzie superpozycji możemy analizować te dwa wpływy osobno i dodać wyniki, dopóki materiał pozostaje liniowo sprężysty.',
      caption:
        'Zauważ, że w obu przypadkach wydłużenie od ciężaru własnego jest takie samo, bo nie zależy od ładunku P. Zmienia się tylko…',
      visual: 'thermal',
      focus: { metric: 'ΔL' },
    },

    {
      title: 'Krok 10',
      narration: 'Odkształcenie przy zawieszeniu: ε_max = 16,97/200 000 ≈ 8,49·10⁻⁵.',
      caption: 'Ciężar własny wnosi tu mniej niż procent wydłużenia, ale odkształcenie pozostaje liniowo sprężyste.',
      visual: 'axial',
      focus: { metric: 'ε' },
      formula: '\\varepsilon_{\\max}=16{,}97/200\\,000\\approx8{,}49\\cdot10^{-5}',
    },
  ],
} satisfies SolutionData
