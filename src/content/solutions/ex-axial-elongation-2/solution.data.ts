import type { SolutionData } from '../../model'

export default {
  id: 'ex-axial-elongation-2',
  title: 'Wydłużenia i skrócenia prętów — przykład 2',
  duration: 7,
  given: [],
  result:
    'Warto zauważyć, że zwiększanie pola nie zmniejsza wydłużenia od ciężaru własnego. Większe pole zwiększa zarówno sztywność, jak i ciężar, a te efekty znoszą się dokładnie. To pokazuje, że dobór przekroju nie jest uniwersalnym lekarstwem na każde przemieszczenie. Przy obciążeniu zewnętrznym większe pole pomaga, przy ciężarze własnym nie zmienia wyniku.',
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
        id: 'g',
        label: 'górny',
        length: 15000,
        area: 314,
        n: 545,
        sigma: 1.74,
        epsilon: 0.00000869,
        deltaL: 0.13,
      },
      {
        id: 'd',
        label: 'dolny',
        length: 15000,
        area: 314,
        n: 182,
        sigma: 0.58,
        epsilon: 0.00000289,
        deltaL: 0.043,
      },
    ],
    note: 'N zmienia się liniowo; podano wartości średnie w połówkach. γ = 7,7·10⁻⁵ N/mm³, E = 200 000 MPa.',
  },
  scenes: [
    {
      title: 'Krok 1',
      narration:
        'Rozważmy długą stalową linę zawieszoną pionowo i obciążoną tylko ciężarem własnym. Siła osiowa nie jest stała: przy dolnym końcu wynosi zero, a przy górnym jest równa ciężarowi całej liny. Nie można więc użyć jednego ilorazu NL/(EA) z siłą końcową. Trzeba pociąć linę na plasterki i scałkować.',
      caption:
        'Rozważmy długą stalową linę zawieszoną pionowo i obciążoną tylko ciężarem własnym. Siła osiowa nie jest stała: przy dolnym końcu…',
      visual: 'axial',
      focus: { metric: 'N' },
    },
    {
      title: 'Krok 2',
      narration:
        'Przyjmijmy, że materiał ma ciężar objętościowy γ, pole A i moduł E. Na wysokości y od dolnego końca przekrój dźwiga ciężar materiału poniżej, równy γ Ay. Siła osiowa wynosi więc N(y)=γ Ay. Wydłużenie plasterka o długości dy wynosi du=N(y) dy/(EA)=γ y dy/E.',
      caption:
        'Przyjmijmy, że materiał ma ciężar objętościowy γ, pole A i moduł E. Na wysokości y od dolnego końca przekrój dźwiga ciężar…',
      visual: 'axial',
      focus: { metric: 'N' },
      formula: 'N(y) = \\gamma Ay',
    },
    {
      title: 'Krok 3',
      narration:
        'Wydłużenie pręta pod działaniem ciężaru własnego nie zależy od pola przekroju. Zależy od ciężaru objętościowego, długości i modułu Younga.',
      caption: 'Δ L_γ=∫_0^L(γ y)/(E) dy=(γ L^2)/(2E)',
      visual: 'axial',
      focus: { metric: 'ΔL' },
      formula: '\\Delta L_{\\gamma}=\\int_0^L\\frac{\\gamma y}{E}\\,\\mathrm{d}y=\\frac{\\gamma L^2}{2E}',
    },
    {
      title: 'Krok 4',
      narration:
        'Dla stali przyjmijmy typowo γ=ρ g≈ 7,7×10^-5 N/mm^3 oraz E=200 000 MPa. Lina o długości L=30 m=30 000 mm wydłuży się o Δ L_γ=7,7×10^-5·(30 000)^2/(2·200 000)≈0,173 mm.',
      caption:
        'Dla stali przyjmijmy typowo γ=ρ g≈ 7,7×10^-5 N/mm^3 oraz E=200 000 MPa. Lina o długości L=30 m=30 000 mm wydłuży się o Δ…',
      visual: 'axial',
      focus: { metric: 'ΔL' },
      formula: '\\gamma = \\rho g \\approx 7{,}7\\times 10^{-5} N/mm^{3}',
    },
    {
      title: 'Krok 5',
      narration:
        'Dla porównania siła skupiona na końcu równa całkowitemu ciężarowi liny daje wydłużenie dwa razy większe. Pole liny o średnicy 20 mm wynosi około 314 mm^2, więc ciężar wynosi W=γ AL≈726 N. Wydłużenie od takiej siły końcowej to WL/(EA)≈0,347 mm. Ciężar własny działa więc jak połowa tego ciężaru przyłożona na końcu, bo siła rośnie liniowo od zera do wartości maksymalnej.',
      caption:
        'Dla porównania siła skupiona na końcu równa całkowitemu ciężarowi liny daje wydłużenie dwa razy większe. Pole liny o średnicy 20…',
      visual: 'axial',
      focus: { metric: 'ΔL' },
      formula: 'WL/(EA) \\approx 0{,}347 mm',
    },
    {
      title: 'Krok 6',
      narration:
        'Warto zauważyć, że zwiększanie pola nie zmniejsza wydłużenia od ciężaru własnego. Większe pole zwiększa zarówno sztywność, jak i ciężar, a te efekty znoszą się dokładnie. To pokazuje, że dobór przekroju nie jest uniwersalnym lekarstwem na każde przemieszczenie. Przy obciążeniu zewnętrznym większe pole pomaga, przy ciężarze własnym nie zmienia wyniku.',
      caption:
        'Warto zauważyć, że zwiększanie pola nie zmniejsza wydłużenia od ciężaru własnego. Większe pole zwiększa zarówno sztywność, jak i…',
      visual: 'axial',
      focus: { metric: 'A' },
    },

    {
      title: 'Krok 7',
      narration: 'Przy zawieszeniu naprężenie jest największe: σ_max = γL = 7,7·10⁻⁵·30 000 = 2,31 MPa.',
      caption: 'Naprężenie rośnie liniowo od zera na dolnym końcu do 2,31 MPa przy zawieszeniu.',
      visual: 'axial',
      focus: { metric: 'σ' },
      formula: '\\sigma_{\\max}=\\gamma L=7{,}7\\cdot10^{-5}\\cdot30\\,000=2{,}31\\ \\text{MPa}',
    },
    {
      title: 'Krok 8',
      narration: 'Odkształcenie przy zawieszeniu: ε_max = σ_max/E = 2,31/200 000 ≈ 1,16·10⁻⁵.',
      caption: 'Odkształcenie względne jest największe przy zawieszeniu i maleje do zera na dolnym końcu.',
      visual: 'axial',
      focus: { metric: 'ε' },
      formula: '\\varepsilon_{\\max}=\\sigma_{\\max}/E=2{,}31/200\\,000\\approx1{,}16\\cdot10^{-5}',
    },
  ],
} satisfies SolutionData
