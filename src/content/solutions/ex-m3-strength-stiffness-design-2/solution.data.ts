import type { SolutionData } from '../../model'
import { StrengthStiffnessDesign2Animation } from './animation'

export default {
  id: 'ex-m3-strength-stiffness-design-2',
  title: 'Dobór ze względu na wytrzymałość i sztywność — przykład 2',
  duration: 7,
  given: ['A₁ = 200 mm²', 'A₂ = 350 mm²', 'A₃ = 500 mm²', 'P = 18 kN', 'Q = 10 kN', 'R = 28 kN'],
  result:
    'Po zaokrągleniu do 250 mm^2 otrzymujemy σ_1=112 MPa oraz wydłużenie około 0,400 mm. Jeden odcinek wystarczył, aby naprawić oba warunki, ponieważ był jednocześnie najbardziej wytężony i miał największy udział w wydłużeniu. W innym układzie te dwa kryteria mogą wskazywać różne odcinki.',
  animation: StrengthStiffnessDesign2Animation,
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
      title: 'Model pręta schodkowego',
      narration:
        'Pręt ma trzy odcinki po 400 mm, pola 200, 350 i 500 mm² oraz siły P = 18 kN na końcu i Q = 10 kN na pierwszym połączeniu. Reakcja utwierdzenia wynosi 28 kN, więc N₁ = 28 kN, a N₂ = N₃ = 18 kN.',
      caption: 'Siła wewnętrzna zmienia się na pierwszym połączeniu. Każdy odcinek trzeba sprawdzić osobno.',
      visual: 'axial',
      focus: { metric: 'model' },
      formula: 'N_1=28\\ \\text{kN},\\qquad N_2=N_3=18\\ \\text{kN},\\qquad A_1=200\\ \\text{mm}^2',
    },
    {
      title: 'Naprężenia w odcinkach',
      narration:
        'Dzielimy siłę przez pole każdego odcinka. Otrzymujemy σ₁ = 140 MPa, σ₂ ≈ 51,4 MPa i σ₃ = 36 MPa. Najbardziej wytężony jest odcinek pierwszy, bo ma jednocześnie największą siłę i najmniejsze pole.',
      caption: 'Przy σ_dop = 120 MPa warunek wytrzymałości narusza tylko odcinek pierwszy.',
      visual: 'axial',
      focus: { metric: 'σ' },
      formula:
        '\\sigma_1=\\frac{28\\,000}{200}=140\\ \\text{MPa},\\quad \\sigma_2=\\frac{18\\,000}{350}\\approx51{,}4\\ \\text{MPa},\\quad \\sigma_3=\\frac{18\\,000}{500}=36\\ \\text{MPa}',
    },
    {
      title: 'Wydłużenie całkowite',
      narration:
        'Wydłużenie jest sumą udziałów trzech odcinków: 0,280 + 0,103 + 0,072 = 0,455 mm. Największy udział ma odcinek pierwszy, mimo że wszystkie odcinki mają tę samą długość, ponieważ ma najmniejsze pole.',
      caption: 'Przy ΔL_dop = 0,40 mm warunek sztywności jest naruszony globalnie.',
      visual: 'axial',
      focus: { metric: 'ΔL' },
      formula:
        '\\Delta L=\\frac{28\\,000\\cdot400}{200\\,000\\cdot200}+\\frac{18\\,000\\cdot400}{200\\,000\\cdot350}+\\frac{18\\,000\\cdot400}{200\\,000\\cdot500}\\approx0{,}280+0{,}103+0{,}072=0{,}455\\ \\text{mm}',
    },
    {
      title: 'Wymagane pole z wytrzymałości',
      narration:
        'Dla pierwszego odcinka warunek naprężeniowy daje A₁ ≥ 28 000/120 ≈ 233,3 mm². To więcej niż obecne 200 mm², ale jeszcze nie rozstrzyga, czy wystarczy to również na wydłużenie.',
      caption: 'Warunek wytrzymałości dotyczy tylko najbardziej wytężonego odcinka.',
      visual: 'axial',
      focus: { metric: 'Aσ' },
      formula: 'A_{1\\sigma}=\\frac{28\\,000}{120}\\approx233{,}3\\ \\text{mm}^2',
    },
    {
      title: 'Wymagane pole ze sztywności',
      narration:
        'Pozostałe odcinki wnoszą 0,103 + 0,072 = 0,175 mm, więc na pierwszy odcinek zostaje 0,40 − 0,175 = 0,225 mm. Stąd A₁′ = 28 000·400/(200 000·0,225) ≈ 248,9 mm². To więcej niż 233,3 mm², więc decyduje sztywność. Przyjmujemy A₁ = 250 mm².',
      caption: 'Zaokrąglenie do 250 mm² spełnia oba warunki i mieści się w dopuszczalnym wydłużeniu.',
      visual: 'axial',
      focus: { metric: 'Aδ' },
      formula:
        'A_1^{\\prime}=\\frac{28\\,000\\cdot400}{200\\,000\\cdot0{,}225}\\approx248{,}9\\ \\text{mm}^2\\quad\\rightarrow\\quad A_1=250\\ \\text{mm}^2',
    },
    {
      title: 'Sprawdzenie końcowe',
      narration:
        'Po korekcie σ₁ = 28 000/250 = 112 MPa, czyli mniej niż 120 MPa. Wydłużenie wynosi 0,224 + 0,103 + 0,072 ≈ 0,400 mm, więc mieści się w dopuszczalnych 0,40 mm. Oba warunki są spełnione.',
      caption: 'Odcinek pierwszy był jednocześnie najbardziej wytężony i miał największy udział w wydłużeniu.',
      visual: 'axial',
      focus: { metric: 'check' },
      formula:
        '\\sigma_1=\\frac{28\\,000}{250}=112\\ \\text{MPa}\\le120\\ \\text{MPa},\\qquad \\Delta L\\approx0{,}400\\ \\text{mm}\\le0{,}40\\ \\text{mm}',
    },
  ],
} satisfies SolutionData
