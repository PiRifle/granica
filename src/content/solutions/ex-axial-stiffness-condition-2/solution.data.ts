import type { SolutionData } from '../../model'

export default {
  id: 'ex-axial-stiffness-condition-2',
  title: 'Warunek sztywności: bezpiecznie i bez nadmiernych ruchów — przykład 2',
  duration: 7,
  given: ['L_1=1 m', 'A_1=300 mm²', 'E_1=200 GPa', 'L_2=1 m', 'A_2=500 mm²', 'E_2=70 GPa'],
  result:
    'Gdyby drugi odcinek był stalowy, wystarczyłoby około 214 mm^2, aby uzyskać to samo wydłużenie. Materiał o większym E jest więc bardziej efektywny, jeśli chodzi o sztywność, ale może być droższy lub cięższy. W tym przykładzie o doborze decyduje aluminium o mniejszym module, a nie najbardziej wytężony odcinek. To kolejna ilustracja różnicy między warunkiem wytrzymałości a warunkiem sztywności.',
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
        label: 'stal',
        length: 1000,
        area: 300,
        n: 30,
        sigma: 100,
        epsilon: 0.0005,
        deltaL: 0.5,
      },
      {
        id: '2',
        label: 'aluminium',
        length: 1000,
        area: 500,
        n: 30,
        sigma: 60,
        epsilon: 0.000857,
        deltaL: 0.857,
      },
    ],
    loads: [
      {
        node: 2,
        value: 30,
        label: 'N = 30 kN',
      },
    ],
    note: 'E₁ = 200 000 MPa, E₂ = 70 000 MPa; suma ΔL = 1,357 mm.',
  },
  scenes: [
    {
      title: 'Krok 1',
      narration:
        'Rozważmy pręt złożony z dwóch odcinków o różnych materiałach. Pierwszy odcinek jest stalowy: L_1=1 m, A_1=300 mm^2, E_1=200 GPa. Drugi jest aluminiowy: L_2=1 m, A_2=500 mm^2, E_2=70 GPa. Siła rozciągająca wynosi N=30 kN, a dopuszczalne wydłużenie 1,2 mm.',
      caption:
        'Rozważmy pręt złożony z dwóch odcinków o różnych materiałach. Pierwszy odcinek jest stalowy: L_1=1 m, A_1=300 mm^2, E_1=200 GPa.…',
      visual: 'axial',
      focus: {
        metric: 'N',
      },
      formula: 'L_1=1\\ \\text{m}',
    },
    {
      title: 'Krok 2',
      narration:
        'Wydłużenia wynoszą Δ L_1=30 000·1000/(200 000·300)=0,50 mm oraz Δ L_2=30 000·1000/(70 000·500)=0,857 mm. Suma 1,357 mm przekracza limit 1,2 mm, mimo że naprężenia są niskie: σ_1=100 MPa i σ_2=60 MPa.',
      caption:
        'Wydłużenia wynoszą Δ L_1=30 000·1000/(200 000·300)=0,50 mm oraz Δ L_2=30 000·1000/(70 000·500)=0,857 mm. Suma 1,357 mm przekracza…',
      visual: 'axial',
      focus: {
        metric: 'ΔL',
      },
      formula: '\\Delta L_1=30\\,000\\cdot1000/(200\\,000\\cdot300)=0{,}50\\ \\text{mm}',
    },
    {
      title: 'Krok 3',
      narration:
        'Aby spełnić warunek sztywności, zwiększamy pole odcinka aluminiowego. Pozostałe odcinki mają już ustalone wydłużenie 0,50 mm, więc na odcinek drugi zostaje 0,70 mm. Wymagane pole wynosi A_2≥30 000·1000/(70 000·0,70)=612,2 mm^2. Po zaokrągleniu do 650 mm^2 otrzymujemy Δ L_2=0,659 mm i sumę 1,159 mm, czyli warunek jest spełniony.',
      caption:
        'Aby spełnić warunek sztywności, zwiększamy pole odcinka aluminiowego. Pozostałe odcinki mają już ustalone wydłużenie 0,50 mm,…',
      visual: 'axial',
      focus: {
        metric: 'A',
      },
      formula: '0{,}50\\ \\text{mm}',
    },
    {
      title: 'Krok 4',
      narration:
        'Gdyby drugi odcinek był stalowy, wystarczyłoby około 214 mm^2, aby uzyskać to samo wydłużenie. Materiał o większym E jest więc bardziej efektywny, jeśli chodzi o sztywność, ale może być droższy lub cięższy. W tym przykładzie o doborze decyduje aluminium o mniejszym module, a nie najbardziej wytężony odcinek. To kolejna ilustracja różnicy między warunkiem wytrzymałości a warunkiem sztywności.',
      caption:
        'Gdyby drugi odcinek był stalowy, wystarczyłoby około 214 mm^2, aby uzyskać to samo wydłużenie. Materiał o większym E jest więc…',
      visual: 'axial',
      focus: {
        metric: 'A',
      },
      formula: '214\\ \\text{mm}^2',
    },
    {
      title: 'Krok 5',
      narration: 'Odkształcenia odcinków: ε₁ = 100/200 000 = 0,0005 oraz ε₂ = 60/70 000 ≈ 0,000857.',
      caption: 'Aluminium odkształca się bardziej mimo mniejszego naprężenia, bo ma mniejszy moduł Younga.',
      visual: 'axial',
      focus: {
        metric: 'ε',
      },
      formula: '\\varepsilon_1=100/200\\,000=0{,}0005,\\qquad \\varepsilon_2=60/70\\,000\\approx0{,}000857',
    },
  ],
} satisfies SolutionData
