import type { SolutionData } from '../../model'

export default {
  id: 'ex-axial-normal-stress',
  title: 'Naprężenie normalne: siła na przekroju — przykład 1',
  duration: 7,
  given: ['A = 250 mm'],
  result:
    'σ = +200 MPa, czyli naprężenie rozciągające. Pręt jest blisko granicy plastyczności typowej stali, więc zapas byłby niewielki.',
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
        area: 250,
        n: 50,
        sigma: 200,
      },
      {
        id: '2',
        label: '2',
        length: 1000,
        area: 250,
        n: 50,
        sigma: 200,
      },
    ],
    loads: [
      {
        node: 2,
        value: 50,
        label: 'N = 50 kN',
      },
    ],
    note: 'Długość nie jest podana — przyjęto schematyczne dwie połowy.',
  },
  scenes: [
    {
      title: 'Krok 1',
      narration: 'Przyjmij N = +50 kN, ponieważ pręt jest rozciągany.',
      caption: 'Przyjmij N = +50 kN, ponieważ pręt jest rozciągany.',
      visual: 'axial',
      focus: { metric: 'N' },
      formula: 'N = +50 kN',
    },
    {
      title: 'Krok 2',
      narration: 'Przelicz siłę na niutony: N = 50 000 N.',
      caption: 'Przelicz siłę na niutony: N = 50 000 N.',
      visual: 'axial',
      focus: { metric: 'N' },
      formula: 'N = 50\\,000 N',
    },
    {
      title: 'Krok 3',
      narration: 'Zachowaj pole w milimetrach kwadratowych: A = 250 mm².',
      caption: 'Zachowaj pole w milimetrach kwadratowych: A = 250 mm².',
      visual: 'axial',
      focus: { metric: 'A' },
    },
    {
      title: 'Krok 4',
      narration: 'Podstaw do wzoru: σ = 50 000/250 = 200 N/mm².',
      caption: 'Podstaw do wzoru: σ = 50 000/250 = 200 N/mm².',
      visual: 'axial',
      focus: { metric: 'σ' },
      formula: '\\sigma = 50\\,000/250 = 200 N/mm^{2}',
    },
    {
      title: 'Krok 5',
      narration: 'Zapisz N/mm² jako MPa i pozostaw znak dodatni.',
      caption: 'Zapisz N/mm² jako MPa i pozostaw znak dodatni.',
      visual: 'axial',
      focus: { metric: 'σ' },
    },
    {
      title: 'Krok 6',
      narration:
        'Sprawdź rząd wielkości: 200 MPa to typowe naprężenie robocze stali konstrukcyjnej, poniżej granicy plastyczności około 235 MPa.',
      caption:
        'Sprawdź rząd wielkości: 200 MPa to typowe naprężenie robocze stali konstrukcyjnej, poniżej granicy plastyczności około 235 MPa.',
      visual: 'axial',
      focus: { metric: 'σ' },
    },
    {
      title: 'Krok 7',
      narration:
        'Gdyby ta sama siła działała w drugą stronę, N byłoby ujemne, a naprężenie wyniosłoby −200 MPa. Wartość bezwzględna byłaby ta sama, ale interpretacja zmieniłaby się na ściskanie.',
      caption:
        'Gdyby ta sama siła działała w drugą stronę, N byłoby ujemne, a naprężenie wyniosłoby −200 MPa. Wartość bezwzględna byłaby ta…',
      visual: 'axial',
      focus: { metric: 'σ' },
    },
  ],
} satisfies SolutionData
