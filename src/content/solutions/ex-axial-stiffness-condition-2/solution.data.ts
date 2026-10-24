import type { SolutionData } from '../../model'
import { AxialStiffnessCondition2Animation } from './animation'

export default {
  id: 'ex-axial-stiffness-condition-2',
  title: 'Warunek sztywności: bezpiecznie i bez nadmiernych ruchów — przykład 2',
  duration: 7,
  given: ['L_1=1 m', 'A_1=300 mm²', 'E_1=200 GPa', 'L_2=1 m', 'A_2=500 mm²', 'E_2=70 GPa'],
  result:
    'Gdyby drugi odcinek był stalowy, wystarczyłoby około 214 mm^2, aby uzyskać to samo wydłużenie. Materiał o większym E jest więc bardziej efektywny, jeśli chodzi o sztywność, ale może być droższy lub cięższy. W tym przykładzie o doborze decyduje aluminium o mniejszym module, a nie najbardziej wytężony odcinek. To kolejna ilustracja różnicy między warunkiem wytrzymałości a warunkiem sztywności.',
  animation: AxialStiffnessCondition2Animation,
  scenes: [
    {
      title: 'Model, dane i obliczenia',
      narration:
        'Rozważmy pręt złożony z dwóch odcinków o różnych materiałach. Pierwszy odcinek jest stalowy: L_1=1 m, A_1=300 mm^2, E_1=200 GPa. Drugi jest aluminiowy: L_2=1 m, A_2=500 mm^2, E_2=70 GPa. Siła rozciągająca wynosi N=30 kN, a dopuszczalne wydłużenie 1,2 mm. Wydłużenia wynoszą Δ L_1=30 000·1000/(200 000·300)=0,50 mm oraz Δ L_2=30 000·1000/(70 000·500)=0,857 mm. Suma 1,357 mm przekracza limit 1,2 mm, mimo że naprężenia są niskie: σ_1=100 MPa i σ_2=60 MPa. Aby spełnić warunek sztywności, zwiększamy pole odcinka aluminiowego. Pozostałe odcinki mają już ustalone wydłużenie 0,50 mm, więc na odcinek drugi zostaje 0,70 mm. Wymagane pole wynosi A_2≥30 000·1000/(70 000·0,70)=612,2 mm^2. Po zaokrągleniu do 650 mm^2 otrzymujemy Δ L_2=0,659 mm i sumę 1,159 mm, czyli warunek jest spełniony. Gdyby drugi odcinek był stalowy, wystarczyłoby około 214 mm^2, aby uzyskać to samo wydłużenie. Materiał o większym E jest więc bardziej efektywny, jeśli chodzi o sztywność, ale może być droższy lub cięższy. W tym przykładzie o doborze decyduje aluminium o mniejszym module, a nie najbardziej wytężony odcinek. To kolejna ilustracja różnicy między warunkiem wytrzymałości a warunkiem sztywności. Odkształcenia odcinków: ε₁ = 100/200 000 = 0,0005 oraz ε₂ = 60/70 000 ≈ 0,000857.',
      caption: 'Aluminium odkształca się bardziej mimo mniejszego naprężenia, bo ma mniejszy moduł Younga.',
      visual: 'axial',
      formula:
        'L_1=1\\ \\text{m}\\qquad \\Delta L_1=\\frac{30\\,000\\cdot 1000}{200\\,000\\cdot 300}=0{,}50\\ \\text{mm}\\qquad 0{,}50\\ \\text{mm}\\qquad 214\\ \\text{mm}^2\\qquad \\varepsilon_1=\\frac{100}{200\\,000}=0{,}0005,\\qquad \\varepsilon_2=\\frac{60}{70\\,000}\\approx0{,}000857',
    },
  ],
} satisfies SolutionData
