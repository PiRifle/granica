import type { SolutionData } from '../../model'

export default {
  id: 'ex-strain-state-gauges-2',
  title: 'Tensometry: od oporu do odkształcenia — przykład 2',
  duration: 7,
  given: [],
  result:
    'W praktyce nie odejmujemy tej liczby „na oko”. Stosujemy czujnik kompensacyjny lub czujnik samokompensujący, dopasowany do współczynnika rozszerzalności podłoża. Ważne jest też, żeby temperatura czujnika czynnego i odniesienia była rzeczywiście podobna. Jeśli belka jest nagrzewana lokalnie, sam czujnik odniesienia umieszczony na końcu może nie wystarczyć.',
  figure: {
    kind: 'rosette',
    gauges: [
      { angle: 0, label: '0°', value: 0.000198, display: '198 με' },
      { angle: 45, label: '45°', value: 0.000099, display: '99 με' },
      { angle: 90, label: '90°', value: 0, display: '0 με' },
    ],
    gamma: { value: 0, display: '0 μrad' },
    mohr: {
      center: 0.000099,
      radius: 0.000099,
      left: 0,
      right: 0.000198,
      angle: 0,
    },
    values: [
      { label: 'ΔT', value: '18 K', focus: 'gauges', reveal: 0 },
      { label: 'czułość', value: '11 με/K', focus: 'gauges', reveal: 0 },
      { label: 'ε_poz', value: '198 με', focus: 'gauges' },
      { label: 'ε_x', value: '198 με', focus: 'gauges' },
      { label: 'ε_y', value: '0 με', focus: 'gauges' },
      { label: 'γ_xy', value: '0 μrad', focus: 'shear' },
      { label: 'ε_sr', value: '99 με', focus: 'mohr' },
      { label: 'R_ε', value: '99 με', focus: 'mohr' },
      { label: 'ε_I', value: '198 με', focus: 'principal' },
      { label: 'ε_II', value: '0 με', focus: 'principal' },
      { label: 'σ_fałszywe', value: '39,60 MPa', focus: 'stress' },
    ],
    note: 'Pozorne odkształcenie nie pochodzi od obciążenia — to skutek różnicy rozszerzalności cieplnej czujnika i podłoża.',
  },
  scenes: [
    {
      title: 'Zapisz warunki temperaturowe',
      narration:
        'Tensometr jest przyklejony do nieobciążonej belki, która nagrzała się o 18 K. Karta czujnika podaje pozorną wrażliwość 11 με/K dla stali, czyli tyle, ile wskazuje czujnik na każdy kelwin różnicy temperatury.',
      caption: 'ΔT = 18 K, czułość pozorna 11 με/K.',
      visual: 'rosette',
      focus: { metric: 'gauges' },
      formula: '\\Delta T=18\\,\\text{K},\\qquad 11\\,\\mu\\varepsilon/\\text{K}',
    },
    {
      title: 'Oblicz pozorne odkształcenie',
      narration:
        'Mnożymy czułość przez różnicę temperatur: 11 · 18 = 198 με, czyli 0,000198. To odkształcenie pojawia się mimo zerowego obciążenia.',
      caption: 'ε_poz = 11 · 18 = 198 με.',
      visual: 'rosette',
      focus: { metric: 'gauges' },
      formula: '11\\cdot18=198\\,\\mu\\varepsilon=0{,}000198',
    },
    {
      title: 'Oblicz fałszywe naprężenie',
      narration:
        'Gdyby zignorować temperaturę i użyć σ = Eε przy E = 200 GPa, otrzymalibyśmy 200 000 · 0,000198 ≈ 39,6 MPa. To więcej niż naprężenia robocze wielu spokojnie obciążonych elementów.',
      caption: 'Fałszywe σ ≈ 39,6 MPa.',
      visual: 'rosette',
      focus: { metric: 'stress' },
      formula: '\\sigma=E\\varepsilon=200\\,000\\cdot0{,}000198=39{,}60\\,\\text{MPa}',
    },
    {
      title: 'Zbuduj koło Mohra',
      narration:
        'Pozorny stan odkształcenia ma tylko jedną składową w kierunku czujnika. Przy zerowym ścinaniu środek i promień wynoszą po 99 με, a koło jest styczne do zera.',
      caption: 'ε_sr = 99 με, R_ε = 99 με.',
      visual: 'rosette',
      focus: { metric: 'mohr' },
      formula:
        '\\varepsilon_{sr}=\\frac{198+0}{2}=99\\,\\mu\\varepsilon,\\qquad R_\\varepsilon=\\frac{198-0}{2}=99\\,\\mu\\varepsilon',
    },
    {
      title: 'Odczytaj kierunki główne',
      narration:
        'Bez ścinania kierunek czujnika jest kierunkiem głównym. Otrzymujemy ε_I = 198 με i ε_II = 0, a kąt φ = 0°.',
      caption: 'ε_I = 198 με, ε_II = 0, φ_I = 0°.',
      visual: 'rosette',
      focus: { metric: 'principal' },
      formula:
        '\\varepsilon_I=99+99=198\\,\\mu\\varepsilon,\\qquad \\varepsilon_{II}=99-99=0,\\qquad \\varphi_I=0^\\circ',
    },
    {
      title: 'Przyjmij model kompensacji',
      narration:
        'Poprawny pomiar wymaga odjęcia składnika termicznego albo użycia czujnika kompensacyjnego. W modelu przyjmujemy, że czujnik odniesienia leży na tym samym podłożu i ma tę samą temperaturę, więc jego wskazanie odejmuje się od wskazania czujnika czynnego.',
      caption: 'Model: ε_rzeczywiste = ε_zmierzone − ε_pozorne.',
      visual: 'rosette',
      focus: { metric: 'stress' },
      formula: '\\varepsilon_{\\text{rzecz}}=\\varepsilon_{\\text{zmierzone}}-\\varepsilon_{\\text{pozorne}}=198-198=0',
    },
    {
      title: 'Sprawdź wpływ na wynik',
      narration:
        'Po kompensacji pozostaje zero, więc fałszywe 39,6 MPa znika. Gdyby temperatura czujnika czynnego i odniesienia różniła się choćby o kilka kelwinów, błąd nadal byłby rzędu megapaskali. Dlatego kompensacja musi być rzeczywista, a nie tylko deklarowana.',
      caption: 'Kontrola: 198 − 198 = 0 με, czyli 0 MPa.',
      visual: 'rosette',
      focus: { metric: 'gauges' },
      formula: '198-198=0\\,\\mu\\varepsilon,\\qquad 39{,}60-39{,}60=0\\,\\text{MPa}',
    },
  ],
} satisfies SolutionData
