import type { SolutionData } from '../../model'

export default {
  id: 'ex-criteria-reduced-stress-2',
  title: 'Naprężenie zredukowane: jedna liczba dla złożonego stanu — przykład 2',
  duration: 7,
  given: ['σ = 90 MPa', 'τ = 40 MPa', 'Re = 280 MPa'],
  result:
    'Wniosek praktyczny jest taki: dla materiału plastycznego nie wystarczy powiedzieć „naprężenie wynosi 105 MPa”. Trzeba dodać, według jakiego kryterium. W tym przypadku Tresca jest najbardziej zachowawcza, a maksimum normalne najmniej. Kolejność może się zmienić przy innym stosunku σ do τ, dlatego nie można zapamiętać jednej stałej hierarchii dla wszystkich stanów.',
  figure: {
    kind: 'cube',
    stresses: { x: 90, y: 0, z: 0 },
    strains: { x: 0.00045, y: -0.000135, z: -0.000135 },
    volumeChange: '0,018%',
    values: [
      { label: 'σ', value: '90 MPa', focus: 'stress', reveal: 0 },
      { label: 'τ', value: '40 MPa', focus: 'stress', reveal: 0 },
      { label: 'R_e', value: '280 MPa', focus: 'stress', reveal: 0 },
      { label: 'k_r', value: '186,7 MPa', focus: 'stress' },
      { label: 'σ_HMH', value: '113,6 MPa', focus: 'stress' },
      { label: 'σ_T', value: '120,4 MPa', focus: 'stress' },
      { label: 'σ_1', value: '105,2 MPa', focus: 'stress' },
      { label: 'σ_2', value: '−15,2 MPa', focus: 'stress' },
      { label: 'σ_max', value: '105,2 MPa', focus: 'stress' },
      { label: 'ε_x', value: '450 με', focus: 'strain' },
      { label: 'γ_xy', value: '520 μrad', focus: 'strain' },
      { label: 'θ', value: '180 με', focus: 'volume' },
    ],
    note: 'Kolejność hipotez zależy od stosunku σ do τ; nie ma jednej stałej hierarchii dla wszystkich stanów.',
  },
  scenes: [
    {
      title: 'Zapisz stan naprężenia',
      narration:
        'Wał jest rozciągany naprężeniem σ = 90 MPa i skręcany naprężeniem τ = 40 MPa. Materiał ma R_e = 280 MPa, a wymagany zapas wynosi 1,5.',
      caption: 'σ = 90 MPa, τ = 40 MPa, R_e = 280 MPa.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '\\sigma=90\\,\\text{MPa},\\qquad \\tau=40\\,\\text{MPa},\\qquad R_e=280\\,\\text{MPa}',
    },
    {
      title: 'Oblicz naprężenia HMH i Tresca',
      narration:
        'Naprężenie dopuszczalne k_r = 280/1,5 = 186,7 MPa. HMH daje √(8 100 + 4 800) = 113,6 MPa, a Tresca √(8 100 + 6 400) = 120,4 MPa. Oba wyniki są mniejsze od k_r.',
      caption: 'σ_HMH = 113,6 MPa, σ_T = 120,4 MPa.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula:
        'k_r=\\frac{280}{1{,}5}=186{,}7\\,\\text{MPa},\\qquad \\sigma_{HMH}=\\sqrt{90^2+3\\cdot40^2}=113{,}6\\,\\text{MPa},\\qquad \\sigma_T=\\sqrt{90^2+4\\cdot40^2}=120{,}4\\,\\text{MPa}',
    },
    {
      title: 'Sprawdź naprężenia główne',
      narration:
        'Środek koła wynosi C = 45 MPa, a promień R = √(45² + 40²) = 60,2 MPa. Stąd σ_1 = 105,2 MPa, σ_2 = −15,2 MPa i σ_3 = 0.',
      caption: 'C = 45 MPa, R = 60,2 MPa, σ_1 = 105,2 MPa, σ_2 = −15,2 MPa.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula:
        'C=\\frac{90}{2}=45\\,\\text{MPa},\\qquad R=\\sqrt{45^2+40^2}=60{,}2\\,\\text{MPa},\\qquad \\sigma_1=105{,}2\\,\\text{MPa},\\qquad \\sigma_2=-15{,}2\\,\\text{MPa}',
    },
    {
      title: 'Porównaj z hipotezą maksimum normalnego',
      narration:
        'Największy moduł naprężenia głównego to 105,2 MPa, więc hipoteza maksimum normalnego dałaby σ_red = 105,2 MPa. To mniej niż HMH i Tresca, co pokazuje różne porządkowanie tego samego stanu.',
      caption: 'σ_max = 105,2 MPa.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '\\sigma_{max}=105{,}2\\,\\text{MPa},\\qquad 105{,}2<113{,}6<120{,}4',
    },
    {
      title: 'Przelicz stan na odkształcenia',
      narration:
        'Dla stali E = 200 GPa i ν = 0,30 otrzymujemy ε_x = 450 με, ε_y = −135 με, γ_xy = 520 μrad i θ = 180 με. Stan jest sprężysty i niewielki.',
      caption: 'ε_x = 450 με, γ_xy = 520 μrad, θ = 180 με.',
      visual: 'cube',
      focus: { metric: 'strain' },
      formula:
        '\\varepsilon_x=\\frac{90}{200\\,000}=450\\,\\mu\\varepsilon,\\qquad \\gamma_{xy}=\\frac{40}{76\\,923}=520\\,\\mu\\text{rad},\\qquad \\theta=450-135-135=180\\,\\mu\\varepsilon',
    },
    {
      title: 'Sprawdź zmianę objętości',
      narration:
        'Ślad tensora odkształcenia jest dodatni, więc objętość elementu rośnie. Wartość śladu jest miarą względnej zmiany objętości.',
      caption: 'Kontrola: θ = 180 με.',
      visual: 'cube',
      focus: { metric: 'volume' },
      formula: '\\theta=180\\,\\mu\\varepsilon,\\qquad |\\sigma_2|=15{,}2\\,\\text{MPa}',
    },
  ],
} satisfies SolutionData
