import type { SolutionData } from '../../model'
import { AxialStiffnessConditionAnimation } from './animation'

export default {
  id: 'ex-axial-stiffness-condition',
  title: 'Warunek sztywności: bezpiecznie i bez nadmiernych ruchów — przykład 1',
  duration: 7,
  given: ['N = 80 kN', 'L = 2 m', 'E = 200 GPa', 'ΔL_dop = 1 mm', 'σ_dop = 160 MPa'],
  result:
    'Minimalne pole wynosi 800 mm² i decyduje sztywność. Dla tego pola ΔL = 1,0 mm, σ = 100 MPa, a zapas względem granicy plastyczności wynosi 2,35.',
  animation: AxialStiffnessConditionAnimation,
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Jednorodny pręt o długości L = 2 m jest rozciągany siłą N = 80 kN. Moduł Younga wynosi E = 200 GPa, dopuszczalne wydłużenie 1 mm, a naprężenie dopuszczalne 160 MPa. Przekrój nie jest jeszcze znany.',
      caption: 'Model: pręt utwierdzony u góry, swobodny u dołu. Dopuszczalne wydłużenie wynosi 1,0 mm.',
      visual: 'axial',
      focus: { metric: 'N' },
      formula:
        'N=80\\ \\text{kN},\\quad L=2\\ \\text{m},\\quad E=200\\ \\text{GPa},\\quad \\Delta L_{\\mathrm{dop}}=1\\ \\text{mm}',
    },
    {
      title: 'Warunek sztywności',
      narration:
        'Warunek sztywności daje A_min,Δ = NL/(E ΔL_dop) = 80 000·2000/(200 000·1) = 800 mm². Przy tym polu rzeczywiste wydłużenie wynosi ΔL = 80 000·2000/(200 000·800) = 1,0 mm, czyli dokładnie tyle, ile dopuszcza limit.',
      caption: 'Przy A = 800 mm² pręt wydłuża się o 1,0 mm i dochodzi do linii dopuszczalnej.',
      visual: 'axial',
      focus: { metric: 'ΔL' },
      formula:
        'A_{\\min,\\Delta}=\\frac{|N|\\,L}{E\\,\\Delta L_{\\mathrm{dop}}}=\\frac{80\\,000\\cdot2000}{200\\,000\\cdot1}=800\\ \\text{mm}^2,\\qquad \\Delta L=\\frac{80\\,000\\cdot2000}{200\\,000\\cdot800}=1{,}0\\ \\text{mm}',
    },
    {
      title: 'Warunek wytrzymałości',
      narration:
        'Warunek wytrzymałości daje A_min,σ = N/σ_dop = 80 000/160 = 500 mm². Gdyby przyjąć tylko to pole, naprężenie byłoby bezpieczne, ale ΔL = 1,6 mm przekroczyłoby limit 1,0 mm.',
      caption: 'A = 500 mm² spełnia wytrzymałość, ale nie sztywność: wydłużenie 1,6 mm wychodzi poza limit.',
      visual: 'axial',
      focus: { metric: 'ΔL' },
      formula:
        'A_{\\min,\\sigma}=\\frac{|N|}{\\sigma_{\\mathrm{dop}}}=\\frac{80\\,000}{160}=500\\ \\text{mm}^2,\\qquad \\Delta L=\\frac{80\\,000\\cdot2000}{200\\,000\\cdot500}=1{,}6\\ \\text{mm}>1{,}0\\ \\text{mm}',
    },
    {
      title: 'Decyzja i kontrola',
      narration:
        'Ostatecznie A_req = max(800, 500) = 800 mm², bo oba warunki muszą być spełnione jednocześnie. Dla A = 800 mm² mamy ΔL = 1,0 mm, σ = 100 MPa < 160 MPa, a zapas względem Re = 235 MPa wynosi 2,35. Odkształcenie ε = σ/E = 0,0005.',
      caption: 'Decyduje sztywność; przekrój 800 mm² spełnia oba warunki.',
      visual: 'axial',
      focus: { metric: 'A' },
      formula:
        'A_{\\mathrm{req}}=\\max(800,500)=800\\ \\text{mm}^2,\\qquad \\sigma=\\frac{80\\,000}{800}=100\\ \\text{MPa}<160\\ \\text{MPa},\\qquad n=\\frac{235}{100}=2{,}35',
    },
  ],
} satisfies SolutionData
