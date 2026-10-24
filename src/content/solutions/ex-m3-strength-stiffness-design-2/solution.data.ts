import type { SolutionData } from '../../model'

export default {
  id: 'ex-m3-strength-stiffness-design-2',
  title: 'Dobór ze względu na wytrzymałość i sztywność — przykład 2',
  duration: 7,
  given: ['A_1=200 mm^2', 'A_2=350 mm^2', 'A_3=500 mm^2', 'P=18 kN', 'Q=10 kN', 'Q=28 kN'],
  result:
    'Po zaokrągleniu do 250 mm^2 otrzymujemy σ_1=112 MPa oraz wydłużenie około 0,400 mm. Jeden odcinek wystarczył, aby naprawić oba warunki, ponieważ był jednocześnie najbardziej wytężony i miał największy udział w wydłużeniu. W innym układzie te dwa kryteria mogą wskazywać różne odcinki.',
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
        length: 400,
        area: 250,
        n: 28,
        sigma: 112,
        epsilon: 0.00056,
        deltaL: 0.224,
      },
      {
        id: '2',
        label: '2',
        length: 400,
        area: 350,
        n: 18,
        sigma: 51.4,
        epsilon: 0.000257,
        deltaL: 0.103,
      },
      {
        id: '3',
        label: '3',
        length: 400,
        area: 500,
        n: 18,
        sigma: 36,
        epsilon: 0.00018,
        deltaL: 0.072,
      },
    ],
    loads: [
      {
        node: 1,
        value: 10,
        label: 'Q = 10 kN',
      },
      {
        node: 3,
        value: 18,
        label: 'P = 18 kN',
      },
    ],
    note: 'Po korekcie A₁ = 250 mm²; suma ΔL ≈ 0,400 mm.',
  },
  scenes: [
    {
      title: 'Krok 1',
      narration:
        'Wróćmy do pręta schodkowego z laboratorium: trzy odcinki po 400 mm, pola A_1=200 mm^2, A_2=350 mm^2, A_3=500 mm^2, siły P=18 kN na końcu i Q=10 kN na pierwszym połączeniu. Reakcja utwierdzenia wynosi P+Q=28 kN. Siły wewnętrzne są równe N_1=28 kN oraz N_2=N_3=18 kN.',
      caption:
        'Wróćmy do pręta schodkowego z laboratorium: trzy odcinki po 400 mm, pola A_1=200 mm^2, A_2=350 mm^2, A_3=500 mm^2, siły P=18 kN…',
      visual: 'thermal',
      focus: { metric: 'N' },
      formula: 'A_{1} = 200 mm^{2}, A_{2} = 350 mm^{2}, A_{3} = 500 mm^{2}',
    },
    {
      title: 'Krok 2',
      narration: 'Naprężenia wynoszą',
      caption: 'Naprężenia wynoszą',
      visual: 'thermal',
      focus: { metric: 'σ' },
    },
    {
      title: 'Krok 3',
      narration: 'Zapis matematyczny.',
      caption: 'σ_1=(28 000)/(200)=140 MPa, σ_2=(18 000)/(350)≈51,4 MPa, σ_3=(18 000)/(500)=36 MPa.',
      visual: 'thermal',
      focus: { metric: 'σ' },
      formula:
        '\\sigma_1=\\frac{28\\,000}{200}=140\\ \\text{MPa},\n\\qquad\n\\sigma_2=\\frac{18\\,000}{350}\\approx51{,}4\\ \\text{MPa},\n\\qquad\n\\sigma_3=\\frac{18\\,000}{500}=36\\ \\text{MPa}.',
    },
    {
      title: 'Krok 4',
      narration:
        'Najbardziej wytężony jest pierwszy odcinek, mimo że nie jest najdłuższy. Decyduje jednocześnie duża siła i małe pole. Wydłużenie całkowite obliczamy jako sumę',
      caption:
        'Najbardziej wytężony jest pierwszy odcinek, mimo że nie jest najdłuższy. Decyduje jednocześnie duża siła i małe pole. Wydłużenie…',
      visual: 'thermal',
      focus: { metric: 'ΔL' },
    },
    {
      title: 'Krok 5',
      narration: 'Zapis matematyczny.',
      caption:
        'Δ L=(28 000·400)/(200 000·200) +(18 000·400)/(200 000·350) +(18 000·400)/(200 000·500) ≈0,280+0,103+0,072=0,455 mm.',
      visual: 'thermal',
      focus: { metric: 'ΔL' },
      formula:
        '\\Delta L=\\frac{28\\,000\\cdot400}{200\\,000\\cdot200}\n+\\frac{18\\,000\\cdot400}{200\\,000\\cdot350}\n+\\frac{18\\,000\\cdot400}{200\\,000\\cdot500}\n\\approx0{,}280+0{,}103+0{,}072=0{,}455\\ \\text{mm}.',
    },
    {
      title: 'Krok 6',
      narration:
        'Załóżmy, że dopuszczalne naprężenie wynosi 120 MPa, a dopuszczalne wydłużenie 0,40 mm. Warunek wytrzymałości jest naruszony tylko na pierwszym odcinku, bo 140 MPa przekracza 120 MPa. Wymagane pole pierwszego odcinka to co najmniej 28 000/120≈233,3 mm^2.',
      caption:
        'Załóżmy, że dopuszczalne naprężenie wynosi 120 MPa, a dopuszczalne wydłużenie 0,40 mm. Warunek wytrzymałości jest naruszony tylko…',
      visual: 'thermal',
      focus: { metric: 'A' },
      formula: '28\\,000/120 \\approx 233{,}3 mm^{2}',
    },
    {
      title: 'Krok 7',
      narration:
        'Warunek sztywności jest naruszony globalnie, bo 0,455 mm przekracza 0,40 mm. Można zwiększyć wszystkie pola proporcjonalnie albo tylko pierwszy odcinek. Sprawdźmy drugi wariant. Pierwszy składnik wydłużenia musi zmaleć z 0,280 do około 0,225 mm, aby suma spadła do 0,40 mm. Nowe pole pierwszego odcinka wynosi',
      caption:
        'Warunek sztywności jest naruszony globalnie, bo 0,455 mm przekracza 0,40 mm. Można zwiększyć wszystkie pola proporcjonalnie albo…',
      visual: 'thermal',
      focus: { metric: 'ΔL' },
    },
    {
      title: 'Krok 8',
      narration: 'Zapis matematyczny.',
      caption: "A_1'=(28 000·400)/(200 000·0,225)≈248,9 mm^2.",
      visual: 'thermal',
      focus: { metric: 'A' },
      formula: "A_1'=\\frac{28\\,000\\cdot400}{200\\,000\\cdot0{,}225}\\approx248{,}9\\ \\text{mm}^2.",
    },
    {
      title: 'Krok 9',
      narration:
        'Po zaokrągleniu do 250 mm^2 otrzymujemy σ_1=112 MPa oraz wydłużenie około 0,400 mm. Jeden odcinek wystarczył, aby naprawić oba warunki, ponieważ był jednocześnie najbardziej wytężony i miał największy udział w wydłużeniu. W innym układzie te dwa kryteria mogą wskazywać różne odcinki.',
      caption:
        'Po zaokrągleniu do 250 mm^2 otrzymujemy σ_1=112 MPa oraz wydłużenie około 0,400 mm. Jeden odcinek wystarczył, aby naprawić oba…',
      visual: 'thermal',
      focus: { metric: 'σ' },
      formula: '\\sigma_{1} = 112 MPa',
    },

    {
      title: 'Krok 10',
      narration: 'Odkształcenia po korekcie: ε₁ = 112/200 000 = 0,00056, ε₂ ≈ 0,000257, ε₃ = 0,00018.',
      caption: 'Suma εL daje około 0,400 mm, czyli wydłużenie na granicy dopuszczalnej.',
      visual: 'axial',
      focus: { metric: 'ε' },
      formula:
        '\\varepsilon_1=112/200\\,000=0{,}00056,\\quad \\varepsilon_2\\approx0{,}000257,\\quad \\varepsilon_3=0{,}00018',
    },
  ],
} satisfies SolutionData
