import type { SolutionData } from '../../model'

export default {
  id: 'ex-m3-self-weight',
  title: 'Ciężar własny elementu — przykład 1',
  duration: 7,
  given: ['A=300 mm^2', 'L=4 m', 'rho=7850', 'g=9', 'E=200 GPa'],
  result:
    'Pręt ma masę około 9,42 kg, jego ciężar wynosi 92,4 N, a największe naprężenie od ciężaru własnego to około 0,308 MPa. Wydłużenie własne jest rzędu tysięcznych części milimetra, więc w tym przypadku ciężar własny jest praktycznie nieistotny.',
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
        id: 'g',
        label: 'górny',
        length: 2000,
        area: 300,
        n: 69.3,
        sigma: 0.231,
        epsilon: 0.000001155,
        deltaL: 0.00231,
      },
      {
        id: 'd',
        label: 'dolny',
        length: 2000,
        area: 300,
        n: 23.1,
        sigma: 0.077,
        epsilon: 3.85e-7,
        deltaL: 0.00077,
      },
    ],
    note: 'N i σ zmieniają się liniowo; podano wartości średnie w połówkach. G = 92,4 N, γ = 77 000 N/m³.',
  },
  scenes: [
    {
      title: 'Krok 1',
      narration: 'Ciężar objętościowy: γ=ρ g=7850· 9,81≈ 77 000 N/m^3=77 kN/m^3.',
      caption: 'Ciężar objętościowy: γ=ρ g=7850· 9,81≈ 77 000 N/m^3=77 kN/m^3.',
      visual: 'thermal',
      focus: { metric: 'A' },
      formula: '\\gamma=\\rho g=7850\\cdot 9{,}81\\approx 77\\,000\\ \\text{N/m}^3=77\\ \\text{kN/m}^3',
    },
    {
      title: 'Krok 2',
      narration: 'Pole A=300 mm^2=0,0003 m^2; objętość V=AL=0,0012 m^3.',
      caption: 'Pole A=300 mm^2=0,0003 m^2; objętość V=AL=0,0012 m^3.',
      visual: 'thermal',
      focus: { metric: 'A' },
      formula: 'A=300\\ \\text{mm}^2=0{,}0003\\ \\text{m}^2',
    },
    {
      title: 'Krok 3',
      narration: 'Masa m=ρ V=7850· 0,0012=9,42 kg, a ciężar G=mg≈ 92,4 N.',
      caption: 'Masa m=ρ V=7850· 0,0012=9,42 kg, a ciężar G=mg≈ 92,4 N.',
      visual: 'thermal',
      focus: { metric: 'N' },
      formula: 'm=\\rho V=7850\\cdot 0{,}0012=9{,}42\\ \\text{kg}',
    },
    {
      title: 'Krok 4',
      narration: 'Obciążenie liniowe q=G/L=92,4/4=23,1 N/m.',
      caption: 'Obciążenie liniowe q=G/L=92,4/4=23,1 N/m.',
      visual: 'thermal',
      focus: { metric: 'N' },
      formula: 'q=G/L=92{,}4/4=23{,}1\\ \\text{N/m}',
    },
    {
      title: 'Krok 5',
      narration: 'Największe naprężenie przy zawieszeniu: σ_max=γ L=77 000· 4=308 000 Pa=0,308 MPa.',
      caption: 'Największe naprężenie przy zawieszeniu: σ_max=γ L=77 000· 4=308 000 Pa=0,308 MPa.',
      visual: 'thermal',
      focus: { metric: 'σ' },
      formula: '\\sigma_{\\max}=\\gamma L=77\\,000\\cdot 4=308\\,000\\ \\text{Pa}=0{,}308\\ \\text{MPa}',
    },
    {
      title: 'Krok 6',
      narration: 'To samo daje G/A=92,4/300=0,308 N/mm^2=0,308 MPa.',
      caption: 'To samo daje G/A=92,4/300=0,308 N/mm^2=0,308 MPa.',
      visual: 'thermal',
      focus: { metric: 'σ' },
      formula: 'G/A=92{,}4/300=0{,}308\\ \\text{N/mm}^2=0{,}308\\ \\text{MPa}',
    },
    {
      title: 'Krok 7',
      narration: 'Wydłużenie własne: δ=γ L^2/(2E)=77 000· 16/(2· 200· 10^9)=3,08· 10^-6 m=0,00308 mm.',
      caption: 'Wydłużenie własne: δ=γ L^2/(2E)=77 000· 16/(2· 200· 10^9)=3,08· 10^-6 m=0,00308 mm.',
      visual: 'thermal',
      focus: { metric: 'ΔL' },
      formula:
        '\\delta=\\gamma L^2/(2E)=77\\,000\\cdot 16/(2\\cdot 200\\cdot 10^9)=3{,}08\\cdot 10^{-6}\\ \\text{m}=0{,}00308\\ \\text{mm}',
    },
    {
      title: 'Krok 8',
      narration:
        'Kontrola rzędu wielkości: naprężenie 0,308 MPa jest znikome w porównaniu z typową granicą stali 235 MPa.',
      caption:
        'Kontrola rzędu wielkości: naprężenie 0,308 MPa jest znikome w porównaniu z typową granicą stali 235 MPa.',
      visual: 'thermal',
      focus: { metric: 'σ' },
      formula: '0{,}308\\ \\text{MPa}',
    },

    {
      title: 'Krok 9',
      narration: 'Odkształcenie przy zawieszeniu: ε_max = σ_max/E = 0,308/200 000 ≈ 1,54·10⁻⁶.',
      caption: 'Odkształcenie własne jest rzędu milionowych części, dlatego wydłużenie jest tak małe.',
      visual: 'axial',
      focus: { metric: 'ε' },
      formula: '\\varepsilon_{\\max}=\\sigma_{\\max}/E=0{,}308/200\\,000\\approx1{,}54\\cdot10^{-6}',
    },
  ],
} satisfies SolutionData
