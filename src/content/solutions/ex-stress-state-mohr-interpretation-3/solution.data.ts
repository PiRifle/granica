import type { SolutionData } from '../../model'

export default {
  id: 'ex-stress-state-mohr-interpretation-3',
  title: 'Od koła do decyzji inżynierskiej — przykład 3',
  duration: 7,
  given: ['N = 30 kN', 'M = 1,2 kN·m', 'T = 800 N·m', 'R_e = 235 MPa', 'n = 2,5'],
  result:
    'Wniosek: średnica 55 mm jest zbyt mała, a 56 mm wystarcza. W praktyce wybieramy kolejny dostępny wymiar handlowy, często z zapasem na korozję, tolerancje i koncentrację naprężeń.',
  figure: {
    kind: 'cube',
    stresses: { x: 81.79, y: 0, z: 0 },
    values: [
      { label: 'd', value: '56 mm', focus: 'stress' },
      { label: 'σ_x', value: '81,79 MPa', focus: 'stress' },
      { label: 'τ', value: '23,20 MPa', focus: 'stress' },
      { label: 'σ_HMH', value: '91,13 MPa', focus: 'principal' },
      { label: 'σ_1', value: '86,36 MPa', focus: 'principal' },
      { label: 'σ_2', value: '−4,57 MPa', focus: 'principal' },
      { label: 'n', value: '2,58', focus: 'principal' },
      { label: 'd przy d=55', value: '55 mm', focus: 'stress' },
      { label: 'σ_HMH przy d=55', value: '95,98 MPa', focus: 'principal' },
    ],
    note: 'Stan naprężenia dla przyjętej średnicy 56 mm; τ = 23,20 MPa nie jest rysowane na ściankach.',
  },
  scenes: [
    {
      title: 'Dane i wymaganie',
      narration:
        'Dla obciążeń N=30 kN, M=1,2 kN·m i T=800 N·m trzeba dobrać średnicę pręta tak, aby współczynnik bezpieczeństwa według HMH wynosił co najmniej 2,5. Granica plastyczności wynosi R_e=235 MPa.',
      caption: 'Zadanie odwrotne: od wymaganego współczynnika bezpieczeństwa do średnicy.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula:
        'N=30\\ \\text{kN},\\quad M=1{,}2\\ \\text{kN}\\cdot\\text{m},\\quad T=800\\ \\text{N}\\cdot\\text{m},\\quad n=2{,}5',
    },
    {
      title: 'Naprężenie dopuszczalne',
      narration: 'Naprężenie dopuszczalne wynosi R_e/2,5=94 MPa. Szukamy średnicy d, dla której σ_HMH≤94 MPa.',
      caption: 'Wymagane naprężenie dopuszczalne.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '\\sigma_{dop}=\\frac{R_e}{2{,}5}=\\frac{235}{2{,}5}=94\\ \\text{MPa}',
    },
    {
      title: 'Próba dla d = 55 mm',
      narration:
        'Dla d=55 mm otrzymujemy A=2375,8 mm^2, W=16 332,4 mm^3 i W_p=32 664,8 mm^3. Wtedy σ_N=12,63 MPa, σ_M=73,47 MPa, σ_x=86,10 MPa oraz τ=24,49 MPa. Naprężenie HMH wynosi około 95,98 MPa, czyli nieco więcej niż dopuszczalne.',
      caption: 'Średnica 55 mm jest zbyt mała.',
      visual: 'cube',
      focus: { metric: 'principal' },
      formula:
        'd=55\\ \\text{mm},\\quad \\sigma_x=86{,}10\\ \\text{MPa},\\quad \\tau=24{,}49\\ \\text{MPa},\\quad \\sigma_{HMH}\\approx95{,}98\\ \\text{MPa}',
    },
    {
      title: 'Sprawdzenie dla d = 56 mm',
      narration:
        'Dla d=56 mm mamy A=2463,0 mm^2, W=17 239,5 mm^3 i W_p=34 479,1 mm^3. Stąd σ_N=12,18 MPa, σ_M=69,61 MPa, σ_x=81,79 MPa oraz τ=23,20 MPa.',
      caption: 'Średnica 56 mm daje mniejsze naprężenia.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '\\sigma_x=81{,}79\\ \\text{MPa},\\quad \\tau=23{,}20\\ \\text{MPa}',
    },
    {
      title: 'Naprężenie HMH dla d = 56 mm',
      narration:
        'Naprężenie HMH wynosi około 91,13 MPa, a współczynnik 235/91,13=2,58, czyli jest większy od wymaganego.',
      caption: 'Warunek n ≥ 2,5 jest spełniony.',
      visual: 'cube',
      focus: { metric: 'principal' },
      formula:
        '\\sigma_{HMH}=\\sqrt{81{,}79^2+3\\cdot23{,}20^2}\\approx91{,}13\\ \\text{MPa},\\quad n=\\frac{235}{91{,}13}\\approx2{,}58',
    },
    {
      title: 'Naprężenia główne',
      narration:
        'Dla d=56 mm średnia wynosi 40,90 MPa, a promień √(40,90^2+23,20^2)≈47,02 MPa. Naprężenia główne to około 86,36 i -4,57 MPa.',
      caption: 'Naprężenia główne w przekroju dla d = 56 mm.',
      visual: 'cube',
      focus: { metric: 'principal' },
      formula: '\\sigma_1\\approx86{,}36\\ \\text{MPa},\\quad \\sigma_2\\approx-4{,}57\\ \\text{MPa}',
    },
    {
      title: 'Interpretacja inżynierska',
      narration:
        'Średnica 55 mm jest zbyt mała, a 56 mm wystarcza. W praktyce wybieramy kolejny dostępny wymiar handlowy, często z zapasem na korozję, tolerancje i koncentrację naprężeń.',
      caption: 'Nie należy zaokrąglać średnicy w dół.',
      visual: 'cube',
      focus: { metric: 'principal' },
      formula:
        '\\boxed{d=56\\ \\text{mm},\\quad \\sigma_{HMH}\\approx91{,}13\\ \\text{MPa},\\quad n\\approx2{,}58>2{,}5}',
    },
  ],
} satisfies SolutionData
