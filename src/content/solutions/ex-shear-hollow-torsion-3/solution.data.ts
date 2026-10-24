import type { SolutionData } from '../../model'

export default {
  id: 'ex-shear-hollow-torsion-3',
  title: 'Skręcanie rury: materiał tam, gdzie pracuje — przykład 3',
  duration: 7,
  given: ['D = 100 mm', 'T = 4 kN·m', 'tau_{dop} = 40 MPa'],
  result:
    'Wariant odwrotny pokazuje, że dla zadanej średnicy zewnętrznej nośność rośnie wraz z grubością ścianki, ale nie liniowo. Początkowo wystarczy cienka ścianka, a przy dużych momentach potrzebna grubość rośnie szybko. Jednocześnie bardzo cienka ścianka może utracić stateczność miejscową, mimo że wzór na naprężenie nadal daje poprawny wynik sprężysty.',
  figure: {
    kind: 'section',
    width: 100,
    height: 100,
    parts: [
      {
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        label: 'rura ∅100',
        tone: 'light',
      },
    ],
    holes: [
      {
        cx: 50,
        cy: 50,
        r: 41.85,
        label: '∅83,7',
      },
    ],
    centroid: {
      x: 50,
      y: 50,
    },
    values: [
      {
        label: 'T',
        value: '4,0 kN·m',
        focus: 'load',
        reveal: 0,
      },
      {
        label: 'D',
        value: '100 mm',
        focus: 'design',
        reveal: 0,
      },
      {
        label: 'τ_dop',
        value: '40 MPa',
        focus: 'stress',
        reveal: 0,
      },
      {
        label: 'W_o,min',
        value: '100 000 mm³',
        focus: 'design',
      },
      {
        label: 'd',
        value: '83,70 mm',
        focus: 'design',
      },
      {
        label: 't',
        value: '8,15 mm',
        focus: 'design',
        reveal: 3,
      },
      {
        label: 'J_o',
        value: '4 999 090 mm⁴',
        focus: 'design',
      },
      {
        label: 'W_o',
        value: '99 982 mm³',
        focus: 'design',
        reveal: 4,
      },
      {
        label: 'τ_max',
        value: '40,0 MPa',
        focus: 'stress',
      },
      {
        label: 'oszczędność',
        value: '70 %',
        focus: 'design',
        reveal: 3,
      },
    ],
    note: 'Dla D = 100 mm i τ_dop = 40 MPa wymagana ścianka ma grubość około 8,15 mm.',
    shape: 'circle',
  },
  scenes: [
    {
      title: 'Krok 1',
      narration:
        'Zaprojektujmy rurę o średnicy zewnętrznej D = 100 mm, która przy momencie T = 4 kN·m osiągnie naprężenie nie większe niż τ_dop = 40 MPa. Szukamy średnicy wewnętrznej d i grubości ścianki t.',
      caption:
        'Zaprojektujmy rurę o średnicy zewnętrznej D = 100 mm, która przy momencie T = 4 kN·m osiągnie naprężenie nie większe niż τ_dop =…',
      visual: 'section',
      focus: {
        metric: 'design',
      },
      formula: 'D = 100 mm',
    },
    {
      title: 'Krok 2',
      narration:
        'Najpierw wyznaczamy wymagany wskaźnik wytrzymałości: W_o ≥ T/τ_dop = 4 000 000/40 = 100 000 mm^3. Następnie korzystamy ze wzoru W_o = π(D^4-d^4)/(16D) i przekształcamy go względem d:',
      caption:
        'Najpierw wyznaczamy wymagany wskaźnik wytrzymałości: W_o ≥ T/τ_dop = 4 000 000/40 = 100 000 mm^3. Następnie korzystamy ze wzoru…',
      visual: 'section',
      focus: {
        metric: 'design',
      },
      formula: 'W_{o} \\ge T/\\tau_{\\mathrm{dop}} = 4\\,000\\,000/40 = 100\\,000 mm^{3}',
    },
    {
      title: 'Krok 3',
      narration: 'Przekształcenie wzoru na średnicę wewnętrzną.',
      caption: 'd^4 = D^4 - (16DW_o)/(π).',
      visual: 'section',
      focus: {
        metric: 'design',
      },
      formula: 'd^4 = D^4 - \\frac{16DW_o}{\\pi}.',
    },
    {
      title: 'Krok 4',
      narration:
        'Podstawiamy D = 100 mm i W_o = 100 000 mm^3: d^4 = 100 000 000 - 50 929 581 = 49 070 419 mm^4. Pierwiastek czwartego stopnia daje d = 83,70 mm. Grubość ścianki wynosi t = (100-83,70)/2 = 8,15 mm.',
      caption:
        'Podstawiamy D = 100 mm i W_o = 100 000 mm^3: d^4 = 100 000 000 - 50 929 581 = 49 070 419 mm^4. Pierwiastek czwartego stopnia daje…',
      visual: 'section',
      focus: {
        metric: 'design',
      },
      formula: 'd = 83{,}70\\ \\text{mm}',
    },
    {
      title: 'Krok 5',
      narration:
        'Sprawdzenie: J_o = π(100^4-83,70^4)/32 = 4 999 090 mm^4, a W_o = J_o/50 = 99 982 mm^3. Naprężenie wynosi 4 000 000/99 982 = 40,01 MPa, czyli praktycznie równa się wartości dopuszczalnej. Pole rury to około 2 352 mm^2, a pole pełnego wału o średnicy 100 mm to 7 854 mm^2, więc oszczędność materiału sięga około 70%.',
      caption:
        'Sprawdzenie: J_o = π(100^4-83,70^4)/32 = 4 999 090 mm^4, a W_o = J_o/50 = 99 982 mm^3. Naprężenie wynosi 4 000 000/99 982 = 40,01…',
      visual: 'section',
      focus: {
        metric: 'stress',
      },
      formula: 'J_{o} = \\pi (100^{4}-83{,}70^{4})/32 = 4\\,999\\,090 mm^{4}',
    },
    {
      title: 'Krok 6',
      narration:
        'Wariant odwrotny pokazuje, że dla zadanej średnicy zewnętrznej nośność rośnie wraz z grubością ścianki, ale nie liniowo. Początkowo wystarczy cienka ścianka, a przy dużych momentach potrzebna grubość rośnie szybko. Jednocześnie bardzo cienka ścianka może utracić stateczność miejscową, mimo że wzór na naprężenie nadal daje poprawny wynik sprężysty.',
      caption:
        'Wariant odwrotny pokazuje, że dla zadanej średnicy zewnętrznej nośność rośnie wraz z grubością ścianki, ale nie liniowo.…',
      visual: 'section',
      focus: {
        metric: 'design',
      },
    },
  ],
} satisfies SolutionData
