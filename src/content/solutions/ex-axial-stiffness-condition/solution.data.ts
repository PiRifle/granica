import type { SolutionData } from '../../model'
import { AxialStiffnessConditionAnimation } from './animation'

export default {
  id: 'ex-axial-stiffness-condition',
  title: 'Warunek sztywności: bezpiecznie i bez nadmiernych ruchów — przykład 1',
  duration: 7,
  given: ['N = 80 kN', 'L = 2 m', 'E = 200 GPa'],
  result:
    'Minimalne pole wynosi 800 mm² i decyduje sztywność. Dla tego pola ΔL = 1,0 mm, σ = 100 MPa, a zapas względem granicy plastyczności wynosi 2,35.',
  animation: AxialStiffnessConditionAnimation,
  scenes: [
    {
      title: 'Model, dane i obliczenia',
      narration:
        'Warunek sztywności: Amin,Δ = NL/(EΔLdop). Przyjmij N = 80 000 N, L = 2000 mm i E = 200 000 MPa. Oblicz Amin,Δ = 80 000·2000/(200 000·1) = 800 mm². Warunek wytrzymałości: Amin,σ = N/σdop = 80 000/160 = 500 mm². Przyjmij A ≥ max(800, 500) = 800 mm², ponieważ muszą być spełnione oba warunki. Dla A = 800 mm²: ΔL = 80 000·2000/(200 000·800) = 1,0 mm, czyli dokładnie na granicy dopuszczalnej. Naprężenie wynosi σ = 80 000/800 = 100 MPa, czyli jest mniejsze od 160 MPa. Rzeczywisty zapas względem typowej granicy plastyczności 235 MPa wynosi 235/100 = 2,35. Gdyby przyjąć A = 500 mm², warunek wytrzymałości byłby spełniony, ale ΔL = 1,6 mm przekroczyłoby limit. Decyduje sztywność. Kontrola odkształcenia: ε = σ/E = 100/200 000 = 0,0005, czyli 0,05%.',
      caption: 'Odkształcenie jest stałe na całej długości, bo N i A są stałe.',
      visual: 'axial',
      formula:
        'A_{\\min,\\Delta}=\\frac{NL}{E\\,\\Delta L_{\\mathrm{dop}}}\\qquad A_{\\min,\\Delta}=\\frac{80\\,000\\cdot 2000}{200\\,000\\cdot 1}=800\\ \\text{mm}^2\\qquad A_{\\min,\\sigma}=\\frac{N}{\\sigma_{\\mathrm{dop}}}=\\frac{80\\,000}{160}=500\\ \\text{mm}^2\\qquad \\Delta L=\\frac{80\\,000\\cdot 2000}{200\\,000\\cdot 800}=1{,}0\\ \\text{mm}\\qquad \\sigma=\\frac{80\\,000}{800}=100\\ \\text{MPa}\\qquad \\frac{235}{100}=2{,}35\\qquad \\Delta L=1{,}6\\ \\text{mm}\\qquad \\varepsilon=\\frac{\\sigma}{E}=\\frac{100}{200\\,000}=0{,}0005',
    },
  ],
} satisfies SolutionData
