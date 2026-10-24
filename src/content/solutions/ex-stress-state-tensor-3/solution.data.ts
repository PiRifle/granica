import type { SolutionData } from '../../model'

export default {
  id: 'ex-stress-state-tensor-3',
  title: 'Tensor naprężenia: mapa sił w punkcie — przykład 3',
  duration: 7,
  given: ['T na ścianie x: (80, 25, 0) MPa', 'T na ścianie y: (25, -20, 0) MPa'],
  result:
    "Zauważ, że do odtworzenia tensora wystarczyły dwie trakcje, bo stan był płaski i trzecia kolumna była zerowa. W ogólnym przypadku potrzeba trzech trakcji na trzech niewspółpłaszczyznowych płaszczyznach. To odwrotność wzoru Cauchy'ego: zamiast mnożyć tensor przez normalną, składamy tensor z odpowiedzi materiału na trzy niezależne kierunki.",
  figure: {
    kind: 'cube',
    stresses: { x: 80, y: -20, z: 0 },
    values: [
      { label: 'σ_x', value: '80 MPa', focus: 'stress', reveal: 0 },
      { label: 'σ_y', value: '−20 MPa', focus: 'stress', reveal: 0 },
      { label: 'τ_xy', value: '25 MPa', focus: 'stress', reveal: 0 },
      { label: 'T_x', value: '68 MPa', focus: 'stress' },
      { label: 'T_y', value: '−1 MPa', focus: 'stress' },
      { label: 'σ_n', value: '40 MPa', focus: 'stress' },
      { label: 'τ', value: '55 MPa', focus: 'stress' },
    ],
    note: 'Tensor odtworzony z trakcji na dwóch prostopadłych ściankach; trzecia kolumna jest zerowa.',
  },
  scenes: [
    {
      title: 'Dane i trakcje',
      narration:
        'Z pomiarów znamy trakcje na dwóch prostopadłych ściankach. Na ścianie prostopadłej do x trakcja wynosi (80,25,0) MPa, a na ścianie prostopadłej do y — (25,-20,0) MPa.',
      caption: 'Dwie trakcje wystarczają do odtworzenia płaskiego tensora.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '\\mathbf{T}^{(x)}=(80,25,0)\\ \\text{MPa},\\quad \\mathbf{T}^{(y)}=(25,-20,0)\\ \\text{MPa}',
    },
    {
      title: 'Składanie tensora',
      narration:
        'Pierwsza kolumna tensora to trakcja na ścianie x, czyli (80,25,0). Druga kolumna to trakcja na ścianie y, czyli (25,-20,0). Trzecia kolumna jest zerowa. Symetria jest spełniona, bo w obu trakcjach składowa mieszana wynosi 25 MPa.',
      caption: 'Tensor ma σ_x=80, σ_y=-20 i τ_xy=25 MPa.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '\\sigma_x=80\\ \\text{MPa},\\quad \\sigma_y=-20\\ \\text{MPa},\\quad \\tau_{xy}=25\\ \\text{MPa}',
    },
    {
      title: 'Trakcja na płaszczyźnie nachylonej',
      narration:
        'Obliczamy trakcję na wybranej płaszczyźnie: T_x=80·0,6+25·0,8=48+20=68 MPa oraz T_y=25·0,6-20·0,8=15-16=-1 MPa.',
      caption: 'Trakcja dla normalnej n=(0,6;0,8;0).',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula:
        'T_x=80\\cdot0{,}6+25\\cdot0{,}8=68\\ \\text{MPa},\\quad T_y=25\\cdot0{,}6-20\\cdot0{,}8=-1\\ \\text{MPa}',
    },
    {
      title: 'Naprężenie normalne',
      narration: 'Naprężenie normalne wynosi 68·0,6-1·0,8=40,8-0,8=40 MPa.',
      caption: 'Rzut trakcji na normalną.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '\\sigma_n=68\\cdot0{,}6-1\\cdot0{,}8=40\\ \\text{MPa}',
    },
    {
      title: 'Naprężenie styczne',
      narration: 'Długość trakcji podniesiona do kwadratu to 68^2+1^2=4625, więc τ=√(4625-1600)=√(3025)=55 MPa.',
      caption: 'Część styczna trakcji jest duża.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '\\tau=\\sqrt{68^2+1^2-40^2}=\\sqrt{3025}=55\\ \\text{MPa}',
    },
    {
      title: 'Dlaczego potrzebny jest tensor',
      narration:
        'Gdybyśmy znali tylko σ_x=80 MPa z pierwszej trakcji, przeszacowalibyśmy naprężenie normalne na tej płaszczyźnie i pominęlibyśmy ścinanie. Tensor, a nie jedna składowa, jest pełnym opisem stanu.',
      caption: 'Jedna składowa nie opisuje stanu na dowolnej płaszczyźnie.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '\\sigma_x=80\\ \\text{MPa}\\neq\\sigma_n=40\\ \\text{MPa}',
    },
    {
      title: 'Interpretacja wyniku',
      narration:
        'Do odtworzenia tensora wystarczyły dwie trakcje, bo stan był płaski. W ogólnym przypadku potrzeba trzech trakcji na trzech niewspółpłaszczyznowych płaszczyznach.',
      caption: 'Wzór Cauchy’ego można odwrócić: z trakcji złożyć tensor.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula:
        '\\boxed{\\sigma_x=80\\ \\text{MPa},\\quad \\sigma_y=-20\\ \\text{MPa},\\quad \\tau_{xy}=25\\ \\text{MPa},\\quad \\sigma_n=40\\ \\text{MPa},\\quad \\tau=55\\ \\text{MPa}}',
    },
  ],
} satisfies SolutionData
