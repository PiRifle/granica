import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-design-full-thermal-3',
  title: 'Pełne zadanie: obciążenie mechaniczne i temperatura — przykład 3',
  duration: 7,
  given: ['k_c=160 MPa', 'E=200 GPa', 'alpha=12·10⁻⁶ 1/K'],
  result:
    'Największa dopuszczalna zmiana temperatury dla stali wynosi około 66,7 K. Dla aluminium o E=70 GPa i α=23·10⁻⁶ 1/K limit wypada przy około 99,4 K, bo decyduje iloczyn Eα. Alternatywą dla większego przekroju jest luz: przy ΔT=80 K i L=1500 mm potrzeba g≈1,44 mm. Dla smukłego pręta trzeba jeszcze sprawdzić wyboczenie.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.ThermalLimitDesignAnimation }))),
  figure: {
    kind: 'axial',
    top: 'fixed',
    bottom: 'fixed',
    segments: [
      {
        id: '1',
        label: 'stal',
        length: 1500,
        area: 400,
        n: -64,
        sigma: -160,
        thermalStrain: 0.0008,
        freeDeltaL: 1.2,
        deltaL: 0,
      },
    ],
    units: { N: 'kN', σ: 'MPa', ΔL: 'mm', ΔL_T: 'mm', αΔT: '–', A: 'mm²' },
    note: 'Pręt idealnie zablokowany: przy ΔT = 66,7 K naprężenie ściskające osiąga 160 MPa.',
  },
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Pręt jest idealnie zablokowany na obu końcach. Dla stali E = 200 GPa, α = 12·10⁻⁶ 1/K, a dopuszczalne naprężenie ściskające k_c = 160 MPa. Szukamy największej dopuszczalnej zmiany temperatury.',
      caption: 'Oba końce nieruchome; szukamy ΔT, przy którym |σ| osiąga k_c.',
      visual: 'thermal',
      focus: { metric: 'model' },
      formula: '|\\sigma|=E\\alpha\\Delta T\\le k_c=160\\ \\text{MPa}',
    },
    {
      title: 'Naprężenie rośnie z temperaturą',
      narration:
        'Przy ogrzewaniu swobodne wydłużenie rośnie, ale końce są nieruchome. Odkształcenie mechaniczne kompensuje termiczne, a naprężenie rośnie liniowo: |σ| = EαΔT = 2,4·ΔT MPa. Przy ΔT = 50 K jest już równe 120 MPa.',
      caption: 'Wzrost jest liniowy; nachylenie wykresu wyznacza iloczyn Eα.',
      visual: 'thermal',
      focus: { metric: 'ramp' },
      formula:
        '|\\sigma|=E\\alpha\\Delta T=200\\,000\\cdot12\\cdot10^{-6}\\cdot\\Delta T=2{,}4\\,\\Delta T\\ \\text{MPa}',
    },
    {
      title: 'Granica dopuszczalna',
      narration:
        'Granica 160 MPa zostaje osiągnięta przy ΔT_max = k_c/(Eα) = 160/(200 000·12·10⁻⁶) ≈ 66,7 K. To jest dopuszczalna zmiana temperatury dla tego pręta.',
      caption: 'Powyżej 66,7 K naprężenie przekracza k_c.',
      visual: 'thermal',
      focus: { metric: 'limit' },
      formula:
        '\\Delta T_{\\max}=\\frac{k_c}{E\\alpha}=\\frac{160}{200\\,000\\cdot12\\cdot10^{-6}}\\approx66{,}7\\ \\text{K}',
    },
    {
      title: 'Porównanie materiałów',
      narration:
        'Dla aluminium E = 70 GPa i α = 23·10⁻⁶ 1/K iloczyn Eα ≈ 1,61 MPa/K, więc ΔT_max ≈ 160/1,61 ≈ 99,4 K. Aluminium znosi większą zmianę temperatury mimo większego α, bo decyduje iloczyn Eα. Trzeba jednak pamiętać o jego mniejszej granicy plastyczności.',
      caption: 'Porównuj Eα, nie samo α; dla aluminium limit wypada przy około 99,4 K.',
      visual: 'thermal',
      focus: { metric: 'materials' },
      formula:
        'E\\alpha=70\\,000\\cdot23\\cdot10^{-6}\\approx1{,}61\\ \\text{MPa/K}\\quad\\Rightarrow\\quad \\Delta T_{\\max}\\approx99{,}4\\ \\text{K}',
    },
    {
      title: 'Luz zamiast większego przekroju',
      narration:
        'Zamiast zwiększać przekrój, można dobrać luz. Przy ΔT = 80 K i L = 1500 mm swobodne wydłużenie wynosi g = αΔTL = 12·10⁻⁶·80·1500 ≈ 1,44 mm. Taki luz całkowicie usuwa naprężenie przy tej temperaturze.',
      caption: 'Luz 1,44 mm domyka się dokładnie przy 80 K; σ pozostaje zerowe.',
      visual: 'thermal',
      focus: { metric: 'gap' },
      formula: 'g=\\alpha\\Delta T L=12\\cdot10^{-6}\\cdot80\\cdot1500\\approx1{,}44\\ \\text{mm}',
    },
    {
      title: 'Sprawdzenie stateczności',
      narration:
        'Warunek naprężeniowy to jeszcze nie wszystko. Ściskany pręt może wyboczyć się przed osiągnięciem k_c, jeśli jest smukły. Wtedy o dopuszczalnej temperaturze decyduje stateczność, a nie sama wytrzymałość materiału.',
      caption: 'Sprawdź wyboczenie; dla smukłego pręta może ono wystąpić przed σ = 160 MPa.',
      visual: 'thermal',
      focus: { metric: 'buckling' },
      formula: '|\\sigma|\\le k_c\\quad\\text{oraz}\\quad \\text{sprawdzenie wyboczenia}',
    },
  ],
} satisfies SolutionData
