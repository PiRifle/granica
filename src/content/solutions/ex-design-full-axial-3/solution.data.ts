import type { SolutionData } from '../../model'

export default {
  id: 'ex-design-full-axial-3',
  title: 'Pełne zadanie: pręt osiowo obciążony — przykład 3',
  duration: 7,
  given: ['L=400 mm', 'A_1=200 mm²', 'A_2=350 mm²', 'A_3=500 mm²', 'Q=10 kN', 'k=150 MPa'],
  result:
    'W prętach schodkowych najwięcej błędów powstaje przy przypisaniu sił do odcinków oraz przy sumowaniu wydłużeń ze znakami. Poniższa lista zbiera najważniejsze kontrole.',
  figure: {
    kind: 'axial',
    top: 'fixed',
    bottom: 'free',
    segments: [
      { id: '1', label: '1', length: 400, area: 200, n: 30, sigma: 150, deltaL: 0.3 },
      { id: '2', label: '2', length: 400, area: 350, n: 20, sigma: 57.14, deltaL: 0.1143 },
      { id: '3', label: '3', length: 400, area: 500, n: 20, sigma: 40, deltaL: 0.08 },
    ],
    loads: [
      { node: 1, value: 10, label: 'Q = 10 kN', direction: 'down' },
      { node: 3, value: 20, label: 'P = 20 kN', direction: 'down' },
    ],
    units: { N: 'kN', σ: 'MPa', ΔL: 'mm', A: 'mm²' },
    note: 'Decyduje odcinek 1: P_max = 20 kN, a całkowite wydłużenie 0,4943 mm jest mniejsze od 0,5 mm.',
  },
  scenes: [
    {
      title: 'Krok 1',
      narration:
        'Wróćmy do geometrii z laboratorium: L=400 mm, A_1=200, A_2=350, A_3=500 mm^2, Q=10 kN. Tym razem pytamy, jakie największe P można przyłożyć, jeśli k=150 MPa i Δ L_dop=0,5 mm.',
      caption:
        'Wróćmy do geometrii z laboratorium: L=400 mm, A_1=200, A_2=350, A_3=500 mm^2, Q=10 kN. Tym razem pytamy, jakie największe P można…',
      visual: 'axial',
      focus: { metric: 'A', segment: '1' },
      formula: 'L=400\\ \\text{mm}',
    },
    {
      title: 'Krok 2',
      narration:
        'Siły normalne wynoszą N_1=P+10, N_2=P, N_3=P (w kN). Z odcinka 1: (P+10)·1000/200≤150, czyli P+10≤30, więc P≤20 kN. Z odcinka 2: P·1000/350≤150, więc P≤52,5 kN. Z odcinka 3: P≤75 kN.',
      caption:
        'Siły normalne wynoszą N_1=P+10, N_2=P, N_3=P (w kN). Z odcinka 1: (P+10)·1000/200≤150, czyli P+10≤30, więc P≤20 kN. Z odcinka 2:…',
      visual: 'axial',
      focus: { metric: 'N', segment: '1' },
      formula: 'N_1=P+10',
    },
    {
      title: 'Krok 3',
      narration:
        'Decyduje odcinek 1, więc P_max=20 kN z warunku wytrzymałości. Sprawdźmy sztywność przy tej sile: N_1=30 kN, N_2=N_3=20 kN. Wydłużenie wynosi 30 000·400/(200 000·200)+20 000·400/(200 000·350)+20 000·400/(200 000·500)=0,3+0,1143+0,08=0,4943 mm, czyli nieco mniej niż 0,5 mm.',
      caption:
        'Decyduje odcinek 1, więc P_max=20 kN z warunku wytrzymałości. Sprawdźmy sztywność przy tej sile: N_1=30 kN, N_2=N_3=20 kN.…',
      visual: 'axial',
      focus: { metric: 'ΔL', segment: '3' },
      formula: 'P_{\\max}=20\\ \\text{kN}',
    },
    {
      title: 'Krok 4',
      narration:
        'W tym przypadku oba warunki dają wynik blisko siebie. Gdyby dopuszczalne wydłużenie było mniejsze, o P decydowałaby sztywność, a nie wytrzymałość. Wariant odwrotny uczy, że trzeba sprawdzić oba ograniczenia i wskazać to, które jest rzeczywiście aktywne.',
      caption:
        'W tym przypadku oba warunki dają wynik blisko siebie. Gdyby dopuszczalne wydłużenie było mniejsze, o P decydowałaby sztywność, a…',
      visual: 'axial',
      focus: { metric: 'ΔL', segment: '3' },
      formula: 'P',
    },
    {
      title: 'Krok 5',
      narration:
        'Warto też zauważyć, że ograniczenie z odcinka 1 ma postać P≤20 kN, a nie P≤30 kN. Siła Q dodaje się do P w pierwszym odcinku, więc zmniejsza dopuszczalne P o 10 kN. To bezpośredni skutek tego, gdzie przyłożono obciążenie.',
      caption:
        'Warto też zauważyć, że ograniczenie z odcinka 1 ma postać P≤20 kN, a nie P≤30 kN. Siła Q dodaje się do P w pierwszym odcinku,…',
      visual: 'axial',
      focus: { metric: 'N', segment: '1' },
      formula: 'P\\le20\\ \\text{kN}',
    },
    {
      title: 'Krok 6',
      narration:
        'Gdyby Q działało w przeciwną stronę, mogłoby zmniejszać siłę w pierwszym odcinku, a nie zwiększać. Dlatego kierunek siły jest równie ważny jak jej wartość. W zadaniach z prętami warto zawsze zaznaczyć zwroty na rysunku, zanim zacznie się liczyć.',
      caption:
        'Gdyby Q działało w przeciwną stronę, mogłoby zmniejszać siłę w pierwszym odcinku, a nie zwiększać. Dlatego kierunek siły jest…',
      visual: 'axial',
      focus: { metric: 'N', segment: '1' },
      formula: 'Q',
    },
    {
      title: 'Krok 7',
      narration:
        'W prętach schodkowych najwięcej błędów powstaje przy przypisaniu sił do odcinków oraz przy sumowaniu wydłużeń ze znakami. Poniższa lista zbiera najważniejsze kontrole.',
      caption:
        'W prętach schodkowych najwięcej błędów powstaje przy przypisaniu sił do odcinków oraz przy sumowaniu wydłużeń ze znakami.…',
      visual: 'axial',
      focus: { metric: 'σ', segment: '1' },
    },
  ],
} satisfies SolutionData
