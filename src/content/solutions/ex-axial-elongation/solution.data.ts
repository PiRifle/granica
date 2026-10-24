import type { SolutionData } from '../../model'
import { AxialElongationExampleAnimation } from './animation'

export default {
  id: 'ex-axial-elongation',
  title: 'Wydłużenia i skrócenia prętów — przykład 1',
  duration: 7,
  given: ['N = 24 kN', 'L₁ = 1,2 m', 'A₁ = 240 mm²', 'L₂ = 0,8 m', 'A₂ = 120 mm²', 'E = 200 GPa'],
  result:
    'ΔL₁ = 0,60 mm, ΔL₂ = 0,80 mm, a całkowite wydłużenie pręta wynosi 1,40 mm. Odkształcenie drugiego odcinka jest dwa razy większe, mimo że jego wkład w wydłużenie jest tylko o jedną trzecią większy, bo odcinek jest krótszy.',
  animation: AxialElongationExampleAnimation,
  scenes: [
    {
      title: 'Model, dane i obliczenia',
      narration:
        'Przelicz dane: N = 24 000 N, L₁ = 1200 mm, L₂ = 800 mm, E = 200 000 MPa. Odcinek 1: ΔL₁ = 24 000·1200/(200 000·240) = 0,60 mm. Odcinek 2: ΔL₂ = 24 000·800/(200 000·120) = 0,80 mm. Oba odcinki są rozciągane, więc oba wkłady są dodatnie: ΔL = ΔL₁ + ΔL₂. Całkowite wydłużenie: ΔL = 0,60 + 0,80 = 1,40 mm. Sprawdź odkształcenia: ε₁ = 0,60/1200 = 0,0005, ε₂ = 0,80/800 = 0,001. Sprawdź naprężenia: σ₁ = 24 000/240 = 100 MPa, σ₂ = 24 000/120 = 200 MPa. Oba są poniżej typowej granicy plastyczności stali 235 MPa, więc model liniowy jest uzasadniony.',
      caption:
        'Sprawdź naprężenia: σ₁ = 24 000/240 = 100 MPa, σ₂ = 24 000/120 = 200 MPa. Oba są poniżej typowej granicy plastyczności stali 235…',
      visual: 'axial',
      formula:
        'N = 24\\,000 N, L_{1} = 1200 mm, L_{2} = 800 mm, E = 200\\,000 MPa\\qquad \\Delta L_{1} = 24\\,000\\cdot 1200/(200\\,000\\cdot 240) = 0{,}60 mm\\qquad \\Delta L_{2} = 24\\,000\\cdot 800/(200\\,000\\cdot 120) = 0{,}80 mm\\qquad \\Delta L = \\Delta L_{1} + \\Delta L_{2}\\qquad \\Delta L = 0{,}60 + 0{,}80 = 1{,}40 mm\\qquad \\varepsilon_{1} = 0{,}60/1200 = 0{,}0005, \\varepsilon_{2} = 0{,}80/800 = 0{,}001\\qquad \\sigma_{1} = 24\\,000/240 = 100 MPa, \\sigma_{2} = 24\\,000/120 = 200 MPa',
    },
  ],
} satisfies SolutionData
