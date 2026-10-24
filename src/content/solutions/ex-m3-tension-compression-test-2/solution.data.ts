import type { SolutionData } from '../../model'

export default {
  id: 'ex-m3-tension-compression-test-2',
  title: 'Próba rozciągania i ściskania — przykład 2',
  duration: 7,
  given: ['b=12', 't=4 mm', 'A_0=50 mm^2', 'L_0=50 mm', 'N=10 kN'],
  result:
    'Zauważ, że druga próbka ma identyczną długość pomiarową, więc różnica wydłużenia wynika wyłącznie z różnicy naprężenia. Gdyby dodatkowo zmienić długość, do porównania trzeba by użyć odkształcenia względnego, a nie samego wydłużenia. To właśnie dlatego krzywa materiału jest rysowana w układzie σ – ε, a nie siła–wydłużenie.',
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
        length: 25,
        area: 50,
        n: 10,
        sigma: 200,
        epsilon: 0.001,
        deltaL: 0.025,
      },
      {
        id: '2',
        label: '2',
        length: 25,
        area: 50,
        n: 10,
        sigma: 200,
        epsilon: 0.001,
        deltaL: 0.025,
      },
    ],
    loads: [
      {
        node: 2,
        value: 10,
        label: 'N = 10 kN',
      },
    ],
    note: 'A₀ = 50 mm², L₀ = 50 mm, E = 200 000 MPa.',
  },
  scenes: [
    {
      title: 'Krok 1',
      narration:
        'Rozważmy płaską próbkę stalową o szerokości b=12,5 mm i grubości t=4 mm. Pole przekroju wynosi A_0=50 mm^2, długość pomiarowa L_0=50 mm, a siła rozciągająca N=10 kN. Naprężenie obliczamy jako',
      caption:
        'Rozważmy płaską próbkę stalową o szerokości b=12,5 mm i grubości t=4 mm. Pole przekroju wynosi A_0=50 mm^2, długość pomiarowa…',
      visual: 'thermal',
      focus: { metric: 'A' },
      formula: 'b = 12{,}5 mm',
    },
    {
      title: 'Krok 2',
      narration: 'Zapis matematyczny.',
      caption: 'σ=(10 000)/(50)=200 MPa.',
      visual: 'thermal',
      focus: { metric: 'σ' },
      formula: '\\sigma=\\frac{10\\,000}{50}=200\\ \\text{MPa}.',
    },
    {
      title: 'Krok 3',
      narration: 'Przy module E=200 GPa odkształcenie wynosi ε=200/200 000=0,001, a wydłużenie',
      caption: 'Przy module E=200 GPa odkształcenie wynosi ε=200/200 000=0,001, a wydłużenie',
      visual: 'thermal',
      focus: { metric: 'ε' },
      formula: 'E = 200 GPa',
    },
    {
      title: 'Krok 4',
      narration: 'Zapis matematyczny.',
      caption: 'Δ L=ε L_0=0,001· 50=0,05 mm.',
      visual: 'thermal',
      focus: { metric: 'ΔL' },
      formula: '\\Delta L=\\varepsilon L_0=0{,}001\\cdot 50=0{,}05\\ \\text{mm}.',
    },
    {
      title: 'Krok 5',
      narration:
        'Gdyby ta sama siła działała na próbkę o polu 25 mm^2, naprężenie wzrosłoby do 400 MPa. To już przekracza typową granicę plastyczności stali konstrukcyjnej, więc nie wolno by było twierdzić, że odkształcenie nadal wynosi 400/200 000=0,002. Prawo Hooke’a przestałoby obowiązywać, a rzeczywiste wydłużenie byłoby większe i częściowo trwałe.',
      caption:
        'Gdyby ta sama siła działała na próbkę o polu 25 mm^2, naprężenie wzrosłoby do 400 MPa. To już przekracza typową granicę…',
      visual: 'thermal',
      focus: { metric: 'σ' },
      formula: '400/200\\,000 = 0{,}002',
    },
    {
      title: 'Krok 6',
      narration:
        'Ten przykład pokazuje, dlaczego w zadaniach trzeba sprawdzać nie tylko wynik arytmetyczny, ale także zakres modelu. Liczba 400 MPa jest poprawnym naprężeniem nominalnym, ale błędem byłoby użycie jej do liniowego wzoru na wydłużenie bez sprawdzenia granicy materiału.',
      caption:
        'Ten przykład pokazuje, dlaczego w zadaniach trzeba sprawdzać nie tylko wynik arytmetyczny, ale także zakres modelu. Liczba 400…',
      visual: 'thermal',
      focus: { metric: 'σ' },
    },
    {
      title: 'Krok 7',
      narration:
        'Zauważ, że druga próbka ma identyczną długość pomiarową, więc różnica wydłużenia wynika wyłącznie z różnicy naprężenia. Gdyby dodatkowo zmienić długość, do porównania trzeba by użyć odkształcenia względnego, a nie samego wydłużenia. To właśnie dlatego krzywa materiału jest rysowana w układzie σ – ε, a nie siła–wydłużenie.',
      caption:
        'Zauważ, że druga próbka ma identyczną długość pomiarową, więc różnica wydłużenia wynika wyłącznie z różnicy naprężenia. Gdyby…',
      visual: 'thermal',
      focus: { metric: 'ε' },
    },
  ],
} satisfies SolutionData
