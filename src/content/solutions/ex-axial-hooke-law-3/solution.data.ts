import type { SolutionData } from '../../model'

export default {
  id: 'ex-axial-hooke-law-3',
  title: 'Prawo Hooke’a: proporcjonalne odkształcenie — przykład 3',
  duration: 7,
  given: ['L=2 m', 'A=250 mm²', 'E=200 GPa', 'L_{dop}=1'],
  result:
    'Widzimy, że o dopuszczalnej sile może decydować sztywność, a nie wytrzymałość. Przy większym dopuszczalnym wydłużeniu limit siły wzrósłby proporcjonalnie. Przy większym polu również wzrósłby, bo większy przekrój jest sztywniejszy. Przy dłuższym pręcie limit siły zmalałby, bo ten sam przyrost długości rozkłada się na większą długość początkową.',
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
        n: 37.5,
        sigma: 150,
        epsilon: 0.00075,
        deltaL: 0.75,
      },
      {
        id: '2',
        label: '2',
        length: 1000,
        area: 250,
        n: 37.5,
        sigma: 150,
        epsilon: 0.00075,
        deltaL: 0.75,
      },
    ],
    loads: [
      {
        node: 2,
        value: 37.5,
        label: 'N = 37,5 kN',
      },
    ],
    note: 'E = 200 000 MPa; L = 2000 mm.',
  },
  scenes: [
    {
      title: 'Krok 1',
      narration:
        'Tym razem ogranicza nas dopuszczalne wydłużenie, a szukamy maksymalnej siły. Pręt stalowy ma długość L=2 m, pole A=250 mm^2 i moduł E=200 GPa. Dopuszczalne wydłużenie wynosi Δ L_dop=1,5 mm.',
      caption:
        'Tym razem ogranicza nas dopuszczalne wydłużenie, a szukamy maksymalnej siły. Pręt stalowy ma długość L=2 m, pole A=250 mm^2 i…',
      visual: 'axial',
      focus: {
        metric: 'A',
      },
      formula: 'L=2\\ \\text{m}',
    },
    {
      title: 'Krok 2',
      narration:
        'Przekształcamy wzór Δ L=NL/(EA) do postaci N=EAΔ L/L. Podstawiamy E=200 000 MPa, A=250 mm^2, Δ L=1,5 mm i L=2000 mm. Otrzymujemy N=200 000·250·1,5/2000=37 500 N, czyli 37,5 kN.',
      caption:
        'Przekształcamy wzór Δ L=NL/(EA) do postaci N=EAΔ L/L. Podstawiamy E=200 000 MPa, A=250 mm^2, Δ L=1,5 mm i L=2000 mm. Otrzymujemy…',
      visual: 'axial',
      focus: {
        metric: 'N',
      },
      formula: '\\Delta L=NL/(EA)',
    },
    {
      title: 'Krok 3',
      narration:
        'Sprawdźmy naprężenie: σ=37 500/250=150 MPa. Jest ono poniżej typowej granicy plastyczności stali, więc założenie liniowo sprężyste jest uzasadnione. Gdyby obliczona siła dawała naprężenie powyżej granicy proporcjonalności, wzór Hooke’a nie byłby już poprawny i trzeba by zastosować model sprężysto-plastyczny.',
      caption:
        'Sprawdźmy naprężenie: σ=37 500/250=150 MPa. Jest ono poniżej typowej granicy plastyczności stali, więc założenie liniowo…',
      visual: 'axial',
      focus: {
        metric: 'σ',
      },
      formula: '\\sigma=37\\,500/250=150\\ \\text{MPa}',
    },
    {
      title: 'Krok 4',
      narration:
        'Widzimy, że o dopuszczalnej sile może decydować sztywność, a nie wytrzymałość. Przy większym dopuszczalnym wydłużeniu limit siły wzrósłby proporcjonalnie. Przy większym polu również wzrósłby, bo większy przekrój jest sztywniejszy. Przy dłuższym pręcie limit siły zmalałby, bo ten sam przyrost długości rozkłada się na większą długość początkową.',
      caption:
        'Widzimy, że o dopuszczalnej sile może decydować sztywność, a nie wytrzymałość. Przy większym dopuszczalnym wydłużeniu limit siły…',
      visual: 'axial',
      focus: {
        metric: 'A',
      },
    },
  ],
} satisfies SolutionData
