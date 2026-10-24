import type { SolutionData } from '../../model'

export default {
  id: 'ex-design-full-thermal-3',
  title: 'Pełne zadanie: obciążenie mechaniczne i temperatura — przykład 3',
  duration: 7,
  given: ['k_c=160 MPa', 'E=200 GPa', 'alpha=12·10⁻⁶ 1/K'],
  result:
    'Zadania termiczne najłatwiej pomylić przez pominięcie warunku zgodności lub przez złe ustalenie znaku. Poniższa lista porządkuje typowe pułapki.',
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
      title: 'Krok 1',
      narration:
        'Dla pręta idealnie zablokowanego pytamy, jaka maksymalna zmiana temperatury jest dopuszczalna, jeśli naprężenie ściskające nie może przekroczyć k_c=160 MPa. Dla stali E=200 GPa i α=12·10^-6 1/K mamy |σ|=EαΔ T, więc Δ T_max=k_c/(Eα)=160/(200 000·12·10^-6)≈66,7 K.',
      caption:
        'Dla pręta idealnie zablokowanego pytamy, jaka maksymalna zmiana temperatury jest dopuszczalna, jeśli naprężenie ściskające nie…',
      visual: 'axial',
      focus: { metric: 'σ', segment: '1' },
      formula: 'k_c=160\\ \\text{MPa}',
    },
    {
      title: 'Krok 2',
      narration:
        'Dla aluminium o E=70 GPa i α=23·10^-6 1/K iloczyn Eα wynosi około 1,61 MPa/K, więc Δ T_max≈160/1,61≈99,4 K. Aluminium znosi większą zmianę temperatury przy tym samym naprężeniu dopuszczalnym, ponieważ iloczyn Eα jest mniejszy, mimo większego współczynnika rozszerzalności.',
      caption:
        'Dla aluminium o E=70 GPa i α=23·10^-6 1/K iloczyn Eα wynosi około 1,61 MPa/K, więc Δ T_max≈160/1,61≈99,4 K. Aluminium znosi…',
      visual: 'axial',
      focus: { metric: 'σ', segment: '1' },
      formula: 'E=70\\ \\text{GPa}',
    },
    {
      title: 'Krok 3',
      narration:
        'Wariant odwrotny można też odwrócić inaczej: mając dopuszczalne naprężenie i znaną temperaturę, obliczyć wymagany luz. Dla Δ T=80 K i L=1500 mm luz całkowicie usuwający naprężenie wynosi g=αΔ T L=12·10^-6·80·1500=1,44 mm. Taki luz jest rozwiązaniem alternatywnym do zwiększania przekroju, które w przypadku idealnego zablokowania i tak nie zmniejsza naprężenia.',
      caption:
        'Wariant odwrotny można też odwrócić inaczej: mając dopuszczalne naprężenie i znaną temperaturę, obliczyć wymagany luz. Dla Δ T=80…',
      visual: 'axial',
      focus: { metric: 'ΔL_T', segment: '1' },
      formula: '\\Delta T=80\\ \\text{K}',
    },
    {
      title: 'Krok 4',
      narration:
        'Porównanie stali i aluminium nie jest jednoznaczne. Aluminium ma większe α, ale mniejsze E, więc iloczyn Eα może być mniejszy. Trzeba jednak pamiętać, że aluminium ma również mniejszą granicę plastyczności, więc k_c nie musi być takie samo. Porównanie naprężenia termicznego przy tej samej Δ T to dopiero jeden z elementów decyzji.',
      caption:
        'Porównanie stali i aluminium nie jest jednoznaczne. Aluminium ma większe α, ale mniejsze E, więc iloczyn Eα może być mniejszy.…',
      visual: 'axial',
      focus: { metric: 'αΔT', segment: '1' },
      formula: '\\alpha',
    },
    {
      title: 'Krok 5',
      narration:
        'Zadania termiczne najłatwiej pomylić przez pominięcie warunku zgodności lub przez złe ustalenie znaku. Poniższa lista porządkuje typowe pułapki.',
      caption:
        'Zadania termiczne najłatwiej pomylić przez pominięcie warunku zgodności lub przez złe ustalenie znaku. Poniższa lista porządkuje…',
      visual: 'axial',
      focus: { metric: 'σ', segment: '1' },
    },
  ],
} satisfies SolutionData
