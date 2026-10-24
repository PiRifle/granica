import type { SolutionData } from '../../model'

export default {
  id: 'cw9-2',
  title: 'Belka z obciążeniem trójkątnym: wykresy i dobór średnicy',
  duration: 11,
  given: [
    'L = 2 m; prosta belka swobodnie podparta w A i B',
    'obciążenie liniowo zmienne q(x) = qx/L, od 0 do q = 20 kN/m',
    'k_g = 200 MPa; pełny przekrój kołowy o średnicy d',
    'w treści zadania wyrażenie „momentem gnącym” traktujemy jako omyłkę — rysunek i jednostka kN/m opisują obciążenie ciągłe',
  ],
  result:
    'R_A = 6,67 kN, R_B = 13,33 kN, Mmax = 5,132 kNm, W_req = 25,66 cm³, d ≥ 63,94 mm; praktycznie należy przyjąć co najmniej 64 mm.',
  figure: {
    kind: 'beam',
    length: 2,
    supports: [
      { at: 0, label: 'A' },
      { at: 2, label: 'B' },
    ],
    distributed: [{ from: 0, to: 2, start: 0, end: 20, label: 'q = 20 kN/m' }],
    shear: [
      [
        [0, 6.667],
        [0.5, 5.417],
        [1, 1.667],
        [1.155, 0],
        [1.5, -4.583],
        [2, -13.333],
      ],
    ],
    moment: [
      [
        [0, 0],
        [0.5, 0.729],
        [1, 1],
        [1.155, 5.132],
        [1.5, 4.375],
        [2, 0],
      ],
    ],
    markers: [
      { x: 1.155, y: 0, text: 'T = 0', diagram: 'shear' },
      { x: 1.155, y: 5.132, text: 'Mmax = 5,132', diagram: 'moment' },
    ],
    values: [
      { label: 'R_A', value: '6,667 kN', focus: 'reaction' },
      { label: 'R_B', value: '13,333 kN', focus: 'reaction' },
      { label: 'Wypadkowa', value: '20,0 kN w x = 2L/3', focus: 'load' },
      { label: 'Mmax', value: '5,132 kNm w x = 1,155 m', focus: 'M' },
      { label: 'W_req', value: '25,66 cm³', focus: 'design' },
      { label: 'd min', value: '63,94 mm → 64 mm', focus: 'design' },
    ],
    note: 'Ekstremum M leży w x = L/√3, czyli 1,155 m od podpory A.',
  },
  scenes: [
    {
      title: '1. Opisz obciążenie funkcją',
      narration:
        'Trójkąt na rysunku przedstawia natężenie obciążenia poprzecznego: w A jest zerowe, a w B osiąga q. W dowolnym przekroju x wysokość trójkąta rośnie proporcjonalnie do x. Jednostka kN/m potwierdza, że jest to obciążenie ciągłe, nie moment gnący.',
      formula: 'q(x)=q\\frac{x}{L}\\qquad 0\\le x\\le L',
      caption: 'Trójkąt obciążenia nad belką AB: zero w A, q = 20 kN/m w B, współrzędna x od A.',
      visual: 'beam',
    },
    {
      title: '2. Wyznacz wypadkową trójkąta',
      narration:
        'Wypadkowa równa się polu trójkąta, czyli qL/2. Jej położenie wyznacza środek ciężkości pola: większe obciążenie jest przy B, dlatego wypadkowa działa w 2L/3 od A, a nie w połowie belki.',
      formula:
        'Q=\\frac12qL=\\frac12\\cdot20\\cdot2=20\\,\\mathrm{kN}\\\\x_Q=\\frac23L=1{,}333\\,\\mathrm{m}\\quad\\text{od A}',
      caption: 'Trójkąt zastąpiony siłą 20 kN przyłożoną w odległości 2L/3 od podpory A.',
      visual: 'beam',
      emphasis: 'Wypadkowa trójkąta rosnącego w prawo działa bliżej B.',
    },
    {
      title: '3. Oblicz reakcje podpór',
      narration:
        'Momenty względem A pozwalają obliczyć R_B, a równowaga sił pionowych daje R_A. Większa reakcja występuje przy B, ponieważ tam belka jest mocniej obciążona. Suma reakcji wynosi 20 kN i równoważy wypadkową.',
      formula:
        'R_BL-Q\\frac23L=0\\Rightarrow R_B=\\frac{qL}{3}=13{,}333\\,\\mathrm{kN}\\\\R_A=Q-R_B=\\frac{qL}{6}=6{,}667\\,\\mathrm{kN}',
      caption: 'Reakcje w górę: 6,667 kN w A i 13,333 kN w B; wypadkowa 20 kN w dół.',
      visual: 'beam',
    },
    {
      title: '4. Zapisz siłę poprzeczną T(x)',
      narration:
        'W przekroju x obciążenie na lewym odcinku tworzy mały trójkąt o wysokości qx/L. Jego wypadkowa wynosi qx²/(2L). Odejmujemy ją od R_A. Dlatego T jest parabolą, a nie prostą: nachylenie wykresu T zależy od chwilowego natężenia q(x).',
      formula:
        'T(x)=R_A-\\int_0^x q\\frac{\\xi}{L}\\,d\\xi=\\frac{qL}{6}-\\frac{qx^2}{2L}\\\\T(0)=6{,}667\\,\\mathrm{kN}\\qquad T(L^-)=-13{,}333\\,\\mathrm{kN}',
      caption:
        'Wykres T: parabola od +6,667 kN w A, przez zero, do −13,333 kN tuż przed B; reakcja R_B domyka skok do zera.',
      visual: 'diagram',
    },
    {
      title: '5. Znajdź położenie ekstremum momentu',
      narration:
        'Ponieważ dM/dx = T, ekstremum momentu znajduje się tam, gdzie siła poprzeczna jest zerowa. Rozwiązanie daje x = L/√3. Drugi matematyczny pierwiastek byłby ujemny i leży poza belką.',
      formula:
        'T(x_*)=0\\Rightarrow \\frac{qL}{6}=\\frac{qx_*^2}{2L}\\\\x_*=\\frac{L}{\\sqrt3}=\\frac{2}{\\sqrt3}=1{,}155\\,\\mathrm{m}',
      caption: 'Na wykresie T zaznaczone zero w x = 1,155 m; dokładnie pod nim wykres M osiąga maksimum.',
      visual: 'diagram',
      emphasis: 'Maksimum M nie jest w połowie belki, lecz 1,155 m od A.',
    },
    {
      title: '6. Zapisz moment gnący M(x)',
      narration:
        'Całkując T i uwzględniając M(0) = 0, otrzymujemy wielomian trzeciego stopnia. Można go także uzyskać z momentu wypadkowej małego trójkąta, która działa w odległości x/3 od przekroju. Na obu podporach moment jest zerowy.',
      formula:
        'M(x)=R_Ax-\\frac{qx^2}{2L}\\cdot\\frac{x}{3}=\\frac{qLx}{6}-\\frac{qx^3}{6L}\\\\M(x)=\\frac{q}{6L}x(L^2-x^2)\\qquad M(0)=M(L)=0',
      caption: 'Wykres M: krzywa trzeciego stopnia, dodatnia na całej belce, od zera w A przez maksimum do zera w B.',
      visual: 'diagram',
    },
    {
      title: '7. Oblicz maksymalny moment',
      narration:
        'Podstawiamy x* = L/√3 do wzoru na moment. Po uproszczeniu otrzymujemy zależność Mmax = qL²/(9√3). Dla danych liczbowych jest to 5,132 kNm. To jedyna wartość potrzebna do dalszego doboru przekroju.',
      formula:
        'M_{\\max}=M(x_*)=\\frac{qL^2}{9\\sqrt3}\\\\M_{\\max}=\\frac{20\\cdot2^2}{9\\sqrt3}=5{,}132\\,\\mathrm{kNm}',
      caption: 'Maksimum +5,132 kNm zaznaczone na wykresie M w x = L/√3 = 1,155 m.',
      visual: 'diagram',
      emphasis: '|M|max = 5,132 kNm = 5,132·10⁶ Nmm.',
    },
    {
      title: '8. Wyznacz wymagany wskaźnik wytrzymałości',
      narration:
        'Warunek wytrzymałości wymaga, aby Mmax/W nie przekraczało k_g. Przyjmując stan graniczny, obliczamy najmniejszy dopuszczalny W. Konsekwentne jednostki N i mm dają wynik w mm³, który następnie zamieniamy na cm³.',
      formula:
        'W_{\\mathrm{req}}=\\frac{M_{\\max}}{k_g}=\\frac{5{,}132\\cdot10^6}{200}=25{,}660\\cdot10^3\\,\\mathrm{mm^3}\\\\W_{\\mathrm{req}}=25{,}66\\,\\mathrm{cm^3}',
      caption: 'Bilans wytrzymałości: moment 5,132 kNm i naprężenie dopuszczalne 200 MPa wymagają W = 25,66 cm³.',
      visual: 'section',
    },
    {
      title: '9. Dobierz średnicę przekroju kołowego',
      narration:
        'Dla pełnego koła wskaźnik wytrzymałości względem osi obojętnej wynosi πd³/32. Przekształcamy wzór względem d i podstawiamy W w mm³. Obliczone 63,94 mm jest wartością minimalną, więc nie wolno zaokrąglić jej w dół; przyjmujemy co najmniej 64 mm lub najbliższą większą średnicę katalogową.',
      formula:
        'W=\\frac{I}{d/2}=\\frac{\\pi d^4/64}{d/2}=\\frac{\\pi d^3}{32}\\\\d\\ge\\sqrt[3]{\\frac{32W_{\\mathrm{req}}}{\\pi}}=\\sqrt[3]{\\frac{32\\cdot25{,}660\\cdot10^3}{\\pi}}=63{,}94\\,\\mathrm{mm}\\\\\\boxed{d\\ge64\\,\\mathrm{mm}\\ \\text{przy zaokrągleniu do pełnych milimetrów}}',
      caption:
        'Pełny kołowy przekrój o średnicy d; zaznaczona osi obojętna i najbardziej oddalone włókna, gdzie σ = M/W.',
      visual: 'section',
      emphasis: 'Odpowiedź: d ≥ 63,94 mm, czyli praktycznie d = 64 mm lub więcej.',
    },
  ],
} satisfies SolutionData
