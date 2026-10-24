import type { SolutionData } from '../../model'

export default {
  id: 'ex-criteria-safety-factor-3',
  title: 'Współczynnik bezpieczeństwa: ile zapasu ma element? — przykład 3',
  duration: 7,
  given: ['A=400 mm^2', 'F=60 kN', 'n_{wym}=2. N', 'sigma=60 000', 'n_{wym}=150', 'cdot2=300 MPa'],
  result:
    'Ostatnia kontrola dotyczy jednostek i rzędu wielkości. Naprężenie 150 MPa przy polu 400 mm² odpowiada sile 60 kN, czyli około 6 ton. To sensowna wartość dla pręta o średnicy około 22,6 mm. Gdyby wynik wychodził w setkach kiloniutonów albo w ułamkach niutona, trzeba sprawdzić przeliczenia, zanim uzna się zadanie za rozwiązane.',
  figure: {
    kind: 'cube',
    stresses: { x: 150, y: 0, z: 0 },
    strains: { x: 0.00075, y: -0.000225, z: -0.000225 },
    volumeChange: '0,03%',
    values: [
      { label: 'A', value: '400 mm²', focus: 'stress', reveal: 0 },
      { label: 'F', value: '60 kN', focus: 'stress', reveal: 0 },
      { label: 'n_wym', value: '2,0', focus: 'stress', reveal: 0 },
      { label: 'σ', value: '150 MPa', focus: 'stress' },
      { label: 'R_e,req', value: '300 MPa', focus: 'stress' },
      { label: 'k (R_e=235)', value: '117,5 MPa', focus: 'stress' },
      { label: 'A_min', value: '510,6 mm²', focus: 'stress' },
      { label: 'n (235 MPa)', value: '1,57', focus: 'stress' },
      { label: 'n (355 MPa)', value: '2,37', focus: 'stress' },
      { label: 'ε_x', value: '750 με', focus: 'strain' },
      { label: 'ε_y', value: '−225 με', focus: 'strain' },
      { label: 'θ', value: '300 με', focus: 'volume' },
    ],
    note: 'Wymaganą granicę 300 MPa można osiągnąć przez zmianę gatunku stali albo przez zwiększenie pola przekroju.',
  },
  scenes: [
    {
      title: 'Zapisz dane projektowe',
      narration:
        'Element o polu A = 400 mm² ma przenieść siłę F = 60 kN przy wymaganym zapasie n_wym = 2. Naprężenie wynosi σ = 60 000/400 = 150 MPa.',
      caption: 'A = 400 mm², F = 60 kN, n_wym = 2, σ = 150 MPa.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula:
        'A=400\\,\\text{mm}^2,\\qquad F=60\\,\\text{kN},\\qquad n_{wym}=2{,}0,\\qquad \\sigma=\\frac{60\\,000}{400}=150\\,\\text{MPa}',
    },
    {
      title: 'Oblicz wymaganą granicę materiału',
      narration:
        'Wymagana granica to R_e,req = σ·n_wym = 150·2 = 300 MPa. Typowa stal konstrukcyjna o granicy 235 MPa nie wystarcza.',
      caption: 'R_e,req = 300 MPa.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: 'R_{e,req}=\\sigma n_{wym}=150\\cdot2=300\\,\\text{MPa}',
    },
    {
      title: 'Sprawdź dostępne gatunki stali',
      narration:
        'Stal 235 MPa daje zapas 235/150 = 1,57, czyli mniej niż 2. Stal 355 MPa daje 355/150 = 2,37, więc spełnia wymaganie.',
      caption: 'n(235 MPa) = 1,57, n(355 MPa) = 2,37.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: 'n=\\frac{235}{150}=1{,}57,\\qquad n=\\frac{355}{150}=2{,}37',
    },
    {
      title: 'Oblicz minimalne pole dla stali 235 MPa',
      narration:
        'Przy stali 235 MPa i zapasie 2 naprężenie dopuszczalne wynosi k = 235/2 = 117,5 MPa. Minimalne pole to A_min = 60 000/117,5 = 510,6 mm².',
      caption: 'k = 117,5 MPa, A_min = 510,6 mm².',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula:
        'k=\\frac{235}{2}=117{,}5\\,\\text{MPa},\\qquad A_{min}=\\frac{60\\,000}{117{,}5}=510{,}6\\,\\text{mm}^2',
    },
    {
      title: 'Porównaj dwie drogi projektowe',
      narration:
        'Można wybrać stal o wyższej granicy i zachować pole 400 mm² albo zwiększyć pole do 510,6 mm² przy stali 235 MPa. Wybór zależy od kosztu, masy i sztywności.',
      caption: 'Dwie drogi: lepsza stal albo większe pole.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '510{,}6\\,\\text{mm}^2>400\\,\\text{mm}^2,\\qquad 355\\,\\text{MPa}>300\\,\\text{MPa}',
    },
    {
      title: 'Sprawdź wariant odwrotny',
      narration:
        'Gdyby projekt dopuszczał n_wym = 1,5 zamiast 2, to przy stali 235 MPa i polu 400 mm² warunek byłby spełniony, bo 1,57 ≥ 1,5. Wynik zależy więc od założenia projektowego.',
      caption: 'Dla n_wym = 1,5: 1,57 ≥ 1,5, warunek spełniony.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '1{,}57\\ge1{,}5,\\qquad n_{wym}=1{,}5',
    },
    {
      title: 'Sprawdź rząd wielkości i jednostki',
      narration:
        'Naprężenie 150 MPa przy polu 400 mm² odpowiada sile 60 kN, czyli około 6 ton. To sensowna wartość dla pręta o średnicy około 22,6 mm. Gdyby wynik wychodził w setkach kiloniutonów albo w ułamkach niutona, trzeba sprawdzić przeliczenia.',
      caption: 'Kontrola: 150 MPa · 400 mm² = 60 kN.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '150\\cdot400=60\\,000\\,\\text{N}=60\\,\\text{kN}',
    },
    {
      title: 'Przelicz stan na odkształcenia',
      narration:
        'Dla stali E = 200 GPa i ν = 0,30 naprężenie 150 MPa daje ε_x = 750 με, ε_y = ε_z = −225 με i θ = 300 με. Odkształcenia są sprężyste.',
      caption: 'ε_x = 750 με, ε_y = ε_z = −225 με, θ = 300 με.',
      visual: 'cube',
      focus: { metric: 'strain' },
      formula:
        '\\varepsilon_x=\\frac{150}{200\\,000}=750\\,\\mu\\varepsilon,\\qquad \\varepsilon_y=\\varepsilon_z=-225\\,\\mu\\varepsilon,\\qquad \\theta=300\\,\\mu\\varepsilon',
    },
    {
      title: 'Sprawdź zmianę objętości',
      narration:
        'Ślad tensora odkształcenia jest dodatni, więc objętość elementu rośnie. Wartość śladu jest miarą względnej zmiany objętości.',
      caption: 'Kontrola: θ = 300 με.',
      visual: 'cube',
      focus: { metric: 'volume' },
      formula: '\\theta=300\\,\\mu\\varepsilon',
    },
  ],
} satisfies SolutionData
