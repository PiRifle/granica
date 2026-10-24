import type { SolutionData } from '../../model'

export default {
  id: 'ex-axial-normal-stress-3',
  title: 'Naprężenie normalne: siła na przekroju — przykład 3',
  duration: 7,
  given: ['N=72 kN', 'sigma_{dop}=120 MPa'],
  result:
    'Gdyby ten sam pręt miał przenosić siłę ściskającą, dobór średnicy z warunku naprężenia byłby tylko pierwszym krokiem. Trzeba by jeszcze sprawdzić smukłość i wyboczenie. Krótki i gruby pręt może być bezpieczny, ale długi i cienki może utracić stateczność przy znacznie mniejszym obciążeniu. W zadaniach projektowych oba warunki sprawdza się niezależnie.',
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
        area: 615.8,
        n: 72,
        sigma: 116.9,
      },
      {
        id: '2',
        label: '2',
        length: 1000,
        area: 615.8,
        n: 72,
        sigma: 116.9,
      },
    ],
    loads: [
      {
        node: 2,
        value: 72,
        label: 'N = 72 kN',
      },
    ],
    note: 'Przyjęto d = 28 mm, A = 615,8 mm²; długość schematyczna.',
  },
  scenes: [
    {
      title: 'Krok 1',
      narration:
        'Tym razem znamy naprężenie dopuszczalne i siłę, a szukamy geometrii. Pręt rozciągany przenosi N=72 kN, a materiał ma naprężenie dopuszczalne σ_dop=120 MPa. Przekrój ma być kołowy. Jaka średnica jest potrzebna?',
      caption:
        'Tym razem znamy naprężenie dopuszczalne i siłę, a szukamy geometrii. Pręt rozciągany przenosi N=72 kN, a materiał ma naprężenie…',
      visual: 'axial',
      focus: { metric: 'N' },
      formula: 'N = 72 kN',
    },
    {
      title: 'Krok 2',
      narration:
        'Przy doborze przekroju najpierw wyznaczamy minimalne pole z warunku wytrzymałości, a następnie wymiar geometryczny. Dla koła średnica wynika z pola, a nie odwrotnie.',
      caption: 'A_min=(|N|)/(σ_dop), d=√((4A)/(π))',
      visual: 'axial',
      focus: { metric: 'A' },
      formula: 'A_{\\min}=\\frac{|N|}{\\sigma_{\\mathrm{dop}}},\\qquad d=\\sqrt{\\frac{4A}{\\pi}}',
    },
    {
      title: 'Krok 3',
      narration:
        'Najpierw wyznaczamy minimalne pole: A_min=N/σ_dop=72 000/120=600 mm^2. Następnie korzystamy z pola koła: A=π d^2/4, więc d=√(4A/π). Po podstawieniu d=√(4· 600/π)≈ 27,6 mm.',
      caption:
        'Najpierw wyznaczamy minimalne pole: A_min=N/σ_dop=72 000/120=600 mm^2. Następnie korzystamy z pola koła: A=π d^2/4, więc…',
      visual: 'axial',
      focus: { metric: 'A' },
      formula: 'A_{min} = N/\\sigma_{\\mathrm{dop}} = 72\\,000/120 = 600 mm^{2}',
    },
    {
      title: 'Krok 4',
      narration:
        'W praktyce nie kupuje się pręta o dowolnej średnicy, więc przyjmujemy średnicę normalizowaną, na przykład d=28 mm. Pole wynosi wtedy A=π· 28^2/4≈ 615,8 mm^2. Rzeczywiste naprężenie jest równe 72 000/615,8≈ 116,9 MPa, czyli poniżej wartości dopuszczalnej.',
      caption:
        'W praktyce nie kupuje się pręta o dowolnej średnicy, więc przyjmujemy średnicę normalizowaną, na przykład d=28 mm. Pole wynosi…',
      visual: 'axial',
      focus: { metric: 'σ' },
      formula: 'd = 28 mm',
    },
    {
      title: 'Krok 5',
      narration:
        'Kontrola wyniku jest tu szczególnie ważna. Zaokrąglenie średnicy w dół do 27 mm dałoby pole około 572,6 mm^2 i naprężenie około 125,7 MPa, a więc przekroczenie warunku. Przy doborze wymiarów zawsze sprawdzaj przyjęty przekrój, a nie tylko wartość minimalną.',
      caption:
        'Kontrola wyniku jest tu szczególnie ważna. Zaokrąglenie średnicy w dół do 27 mm dałoby pole około 572,6 mm^2 i naprężenie około…',
      visual: 'axial',
      focus: { metric: 'σ' },
    },
    {
      title: 'Krok 6',
      narration:
        'Gdyby ten sam pręt miał przenosić siłę ściskającą, dobór średnicy z warunku naprężenia byłby tylko pierwszym krokiem. Trzeba by jeszcze sprawdzić smukłość i wyboczenie. Krótki i gruby pręt może być bezpieczny, ale długi i cienki może utracić stateczność przy znacznie mniejszym obciążeniu. W zadaniach projektowych oba warunki sprawdza się niezależnie.',
      caption:
        'Gdyby ten sam pręt miał przenosić siłę ściskającą, dobór średnicy z warunku naprężenia byłby tylko pierwszym krokiem. Trzeba by…',
      visual: 'axial',
      focus: { metric: 'σ' },
    },
  ],
} satisfies SolutionData
