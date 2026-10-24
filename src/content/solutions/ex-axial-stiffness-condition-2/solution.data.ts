import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-axial-stiffness-condition-2',
  title: 'Warunek sztywności: bezpiecznie i bez nadmiernych ruchów — przykład 2',
  duration: 7,
  given: [
    'N = 30 kN',
    'L₁ = 1 m',
    'A₁ = 300 mm²',
    'E₁ = 200 GPa',
    'L₂ = 1 m',
    'A₂ = 500 mm²',
    'E₂ = 70 GPa',
    'ΔL_dop = 1,2 mm',
  ],
  result:
    'Suma wydłużeń 1,357 mm przekracza limit 1,2 mm. Po powiększeniu odcinka aluminiowego do 650 mm² suma spada do 1,159 mm. Gdyby drugi odcinek był stalowy, wystarczyłoby około 214 mm², ale o doborze decyduje odcinek aluminiowy o mniejszym module, a nie najbardziej wytężony przekrój.',
  animation: lazy(() =>
    import('./animation').then((module) => ({ default: module.AxialStiffnessCondition2Animation })),
  ),
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Pręt składa się z dwóch odcinków o różnych materiałach. Górny odcinek jest stalowy: L₁ = 1 m, A₁ = 300 mm², E₁ = 200 GPa. Dolny jest aluminiowy: L₂ = 1 m, A₂ = 500 mm², E₂ = 70 GPa. Siła rozciągająca N = 30 kN, a dopuszczalne wydłużenie 1,2 mm.',
      caption: 'Pręt schodkowy stal–aluminium; oba odcinki mają długość 1 m, a limit wydłużenia wynosi 1,2 mm.',
      visual: 'axial',
      focus: { metric: 'N' },
      formula:
        'L_1=1\\ \\text{m},\\quad A_1=300\\ \\text{mm}^2,\\quad E_1=200\\ \\text{GPa},\\quad L_2=1\\ \\text{m},\\quad A_2=500\\ \\text{mm}^2,\\quad E_2=70\\ \\text{GPa}',
    },
    {
      title: 'Rzeczywiste wydłużenia',
      narration:
        'Wydłużenia odcinków wynoszą ΔL₁ = 30 000·1000/(200 000·300) = 0,50 mm oraz ΔL₂ = 30 000·1000/(70 000·500) = 0,857 mm. Suma 1,357 mm przekracza limit 1,2 mm, mimo że naprężenia są niskie: σ₁ = 100 MPa i σ₂ = 60 MPa. Odkształcenia ε₁ = 0,0005 i ε₂ ≈ 0,000857 pokazują, że aluminium odkształca się bardziej mimo mniejszego naprężenia.',
      caption:
        'Suma wydłużeń 1,357 mm wychodzi poza limit 1,2 mm; aluminium wnosi większy wkład mimo mniejszego naprężenia.',
      visual: 'axial',
      focus: { metric: 'ΔL' },
      formula:
        '\\Delta L_1=\\frac{30\\,000\\cdot1000}{200\\,000\\cdot300}=0{,}50\\ \\text{mm},\\qquad \\Delta L_2=\\frac{30\\,000\\cdot1000}{70\\,000\\cdot500}=0{,}857\\ \\text{mm},\\qquad \\sum\\Delta L=1{,}357\\ \\text{mm}>1{,}2\\ \\text{mm}',
    },
    {
      title: 'Korekta odcinka aluminiowego',
      narration:
        'Aby spełnić warunek sztywności, zwiększamy pole odcinka aluminiowego. Na odcinek drugi zostaje 1,2 − 0,50 = 0,70 mm, więc A₂ ≥ 30 000·1000/(70 000·0,70) = 612,2 mm². Po zaokrągleniu do 650 mm² otrzymujemy ΔL₂ = 30 000·1000/(70 000·650) = 0,659 mm i sumę 1,159 mm ≤ 1,2 mm.',
      caption: 'Pole aluminium rośnie z 500 do 650 mm², a suma wydłużeń spada poniżej limitu.',
      visual: 'axial',
      focus: { metric: 'A' },
      formula:
        '\\Delta L_2^{\\max}=1{,}2-0{,}50=0{,}70\\ \\text{mm},\\qquad A_2\\ge\\frac{30\\,000\\cdot1000}{70\\,000\\cdot0{,}70}=612{,}2\\ \\text{mm}^2,\\qquad A_2=650\\ \\text{mm}^2',
    },
    {
      title: 'Wniosek materiałowy',
      narration:
        'Gdyby dolny odcinek był stalowy, do uzyskania pozostałych 0,70 mm wystarczyłoby A₂ = 30 000·1000/(200 000·0,70) ≈ 214 mm². Materiał o większym E jest bardziej efektywny sztywnościowo, ale może być droższy lub cięższy. W tym przykładzie powiększamy aluminiowy odcinek, bo to on decyduje o wydłużeniu, a nie najbardziej wytężony przekrój.',
      caption:
        'Aluminium 650 mm² i stal 214 mm² dają limit 1,2 mm; stal jest bardziej efektywna sztywnościowo, ale wybór zależy też od kosztu i masy.',
      visual: 'axial',
      focus: { metric: 'A' },
      formula:
        'A_2^{\\text{stal}}\\approx\\frac{30\\,000\\cdot1000}{200\\,000\\cdot0{,}70}=214\\ \\text{mm}^2,\\qquad \\Delta L_2=\\frac{30\\,000\\cdot1000}{200\\,000\\cdot214}\\approx0{,}70\\ \\text{mm}',
    },
  ],
} satisfies SolutionData
