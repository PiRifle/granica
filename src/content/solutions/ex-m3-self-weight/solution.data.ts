import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-m3-self-weight',
  title: 'Ciężar własny elementu — przykład 1',
  duration: 7,
  given: ['A = 300 mm²', 'L = 4 m', 'ρ = 7850 kg/m³', 'γ = 77 kN/m³', 'E = 200 GPa'],
  result:
    'Pręt ma masę około 9,42 kg, jego ciężar wynosi 92,4 N, a największe naprężenie od ciężaru własnego to około 0,308 MPa. Wydłużenie własne jest rzędu tysięcznych części milimetra, więc w tym przypadku ciężar własny jest praktycznie nieistotny.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.SelfWeightExample1Animation }))),
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Pionowy, jednorodny pręt o polu A = 300 mm² i długości L = 4 m jest zawieszony u góry. Na każdy odcinek działa ciężar objętościowy γ = ρg = 77 kN/m³, czyli obciążenie liniowe q = γA = 23,1 N/m.',
      caption: 'Jednorodny pręt zawieszony u góry; x mierzymy od swobodnego dolnego końca.',
      visual: 'axial',
      focus: { metric: 'model' },
      formula: '\\rho=7850\\ \\text{kg/m}^3,\\qquad A=300\\ \\text{mm}^2,\\qquad L=4\\ \\text{m}',
    },
    {
      title: 'Siła osiowa N(x)',
      narration:
        'Przecinamy pręt na wysokości x i rozważamy dolną część. Jej ciężar wynosi G(x) = γAx, więc z równowagi N(x) = γAx. Siła rośnie liniowo od zera na dolnym końcu do N(L) = γAL = 92,4 N przy zawieszeniu.',
      caption: 'N rośnie liniowo od 0 do 92,4 N; maksimum jest przy zawieszeniu.',
      visual: 'axial',
      focus: { metric: 'N' },
      formula: 'N(x)=\\gamma Ax,\\qquad N(L)=\\gamma AL=92{,}4\\ \\text{N}',
    },
    {
      title: 'Naprężenie σ(x)',
      narration:
        'Naprężenie to siła podzielona przez pole: σ(x) = N(x)/A = γx. Pole A się skraca, więc naprężenie rośnie liniowo od zera do σmax = γL = 0,308 MPa i nie zależy od przekroju.',
      caption: 'σ(x) = γx; pogrubienie pręta nie zmienia naprężenia od ciężaru własnego.',
      visual: 'axial',
      focus: { metric: 'σ' },
      formula: '\\sigma(x)=\\frac{N(x)}{A}=\\gamma x,\\qquad \\sigma_{\\max}=\\gamma L=0{,}308\\ \\text{MPa}',
    },
    {
      title: 'Wydłużenie własne',
      narration:
        'Krótki odcinek dx wydłuża się o dδ = N(x)dx/(EA) = γx dx/E. Po scałkowaniu δ = γL²/(2E) = 0,00308 mm, niezależnie od pola przekroju.',
      caption: 'Wydłużenie w skali poglądowej; εmax = σmax/E = 1,54·10⁻⁶.',
      visual: 'axial',
      focus: { metric: 'ΔL' },
      formula: '\\delta=\\frac{\\gamma L^2}{2E}=\\frac{77\\,000\\cdot16}{2\\cdot200\\cdot10^9}=0{,}00308\\ \\text{mm}',
    },
  ],
} satisfies SolutionData
