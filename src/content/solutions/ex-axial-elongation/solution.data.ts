import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-axial-elongation',
  title: 'Wydłużenia i skrócenia prętów — przykład 1',
  duration: 7,
  given: ['N = 24 kN', 'L₁ = 1,2 m', 'A₁ = 240 mm²', 'L₂ = 0,8 m', 'A₂ = 120 mm²', 'E = 200 GPa'],
  result:
    'ΔL₁ = 0,60 mm, ΔL₂ = 0,80 mm, a całkowite wydłużenie pręta wynosi 1,40 mm. Odkształcenie drugiego odcinka jest dwa razy większe, mimo że jego wkład w wydłużenie jest tylko o jedną trzecią większy, bo odcinek jest krótszy.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.AxialElongationAnimation }))),
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Stalowy pręt z dwóch odcinków jest utwierdzony górnym końcem i rozciągany siłą N = 24 kN. Odcinek 1 ma L₁ = 1,2 m i A₁ = 240 mm², a odcinek 2 ma L₂ = 0,8 m i A₂ = 120 mm². Dla obu E = 200 GPa. Przeliczamy dane: N = 24 000 N, L₁ = 1200 mm, L₂ = 800 mm, E = 200 000 MPa.',
      caption: 'Przelicz dane: N = 24 000 N, L₁ = 1200 mm, L₂ = 800 mm, E = 200 000 MPa.',
      visual: 'axial',
      focus: {
        metric: 'model',
      },
      formula: 'N = 24\\,000 N, L_{1} = 1200 mm, L_{2} = 800 mm, E = 200\\,000 MPa',
    },
    {
      title: 'Siła osiowa',
      narration:
        'Pręt jest obciążony tylko na końcach, więc siła osiowa jest stała na obu odcinkach: N = 24 kN. Zmienia się natomiast naprężenie, bo odcinki mają różne pola przekroju.',
      caption: 'N jest stałe na obu odcinkach, mimo zmiany pola przekroju.',
      visual: 'axial',
      focus: {
        metric: 'N',
      },
      formula: 'N_{1} = N_{2} = 24\\ \\text{kN}',
    },
    {
      title: 'Wydłużenie odcinka 1',
      narration: 'Odcinek 1: ΔL₁ = 24 000·1200/(200 000·240) = 0,60 mm.',
      caption: 'Odcinek 1 wydłuża się o 0,60 mm.',
      visual: 'axial',
      focus: {
        metric: 'ΔL',
        segment: '1',
      },
      formula: '\\Delta L_{1} = 24\\,000\\cdot 1200/(200\\,000\\cdot 240) = 0{,}60 mm',
    },
    {
      title: 'Wydłużenie odcinka 2',
      narration: 'Odcinek 2: ΔL₂ = 24 000·800/(200 000·120) = 0,80 mm.',
      caption: 'Odcinek 2 wydłuża się o 0,80 mm.',
      visual: 'axial',
      focus: {
        metric: 'ΔL',
        segment: '2',
      },
      formula: '\\Delta L_{2} = 24\\,000\\cdot 800/(200\\,000\\cdot 120) = 0{,}80 mm',
    },
    {
      title: 'Wydłużenie całkowite',
      narration:
        'Oba odcinki są rozciągane, więc oba wkłady są dodatnie. Całkowite wydłużenie: ΔL = 0,60 + 0,80 = 1,40 mm.',
      caption: 'Całkowite wydłużenie: ΔL = 0,60 + 0,80 = 1,40 mm.',
      visual: 'axial',
      focus: {
        metric: 'ΔL',
      },
      formula: '\\Delta L = 0{,}60 + 0{,}80 = 1{,}40 mm',
    },
    {
      title: 'Kontrola ε i σ',
      narration:
        'Sprawdź odkształcenia: ε₁ = 0,60/1200 = 0,0005, ε₂ = 0,80/800 = 0,001. Naprężenia: σ₁ = 24 000/240 = 100 MPa, σ₂ = 24 000/120 = 200 MPa. Oba są poniżej typowej granicy plastyczności stali 235 MPa, więc model liniowy jest uzasadniony.',
      caption: 'Sprawdź odkształcenia i naprężenia: ε₁ = 0,0005, ε₂ = 0,001 oraz σ₁ = 100 MPa, σ₂ = 200 MPa.',
      visual: 'axial',
      focus: {
        metric: 'check',
      },
      formula:
        '\\varepsilon_{1} = 0{,}0005, \\varepsilon_{2} = 0{,}001, \\sigma_{1} = 100\\ \\text{MPa}, \\sigma_{2} = 200\\ \\text{MPa}',
    },
  ],
} satisfies SolutionData
