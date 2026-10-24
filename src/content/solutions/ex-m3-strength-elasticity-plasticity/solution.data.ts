import type { SolutionData } from '../../model'

export default {
  id: 'ex-m3-strength-elasticity-plasticity',
  title: 'Re, Rm, sprężystość i plastyczność — przykład 1',
  duration: 7,
  given: ['S_0=80 mm²', 'R_e=300 MPa', 'R_m=450 MPa'],
  result:
    'Uplastycznienie próbki zaczyna się przy około 24 kN, a wytrzymałości R_m odpowiada siła 36 kN. Zerwanie nastąpi przy sile mniejszej od 36 kN, po przewężeniu.',
  figure: {
    kind: 'axial',
    top: 'free',
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
        id: 'e',
        label: 'F_e',
        length: 1000,
        area: 80,
        n: 24,
        sigma: 300,
      },
      {
        id: 'm',
        label: 'F_m',
        length: 1000,
        area: 80,
        n: 36,
        sigma: 450,
      },
    ],
    note: 'Schemat porównawczy siły na granicy plastyczności i wytrzymałości; S₀ = 80 mm².',
  },
  scenes: [
    {
      title: 'Krok 1',
      narration: 'Granica plastyczności odpowiada sile F_e=R_eS_0.',
      caption: 'Granica plastyczności odpowiada sile F_e=R_eS_0.',
      visual: 'thermal',
      focus: {
        metric: 'σ',
      },
      formula: 'F_e=R_eS_0',
    },
    {
      title: 'Krok 2',
      narration: 'F_e=300 N/mm^2· 80 mm^2=24 000 N=24 kN.',
      caption: 'F_e=300 N/mm^2· 80 mm^2=24 000 N=24 kN.',
      visual: 'thermal',
      focus: {
        metric: 'σ',
      },
      formula: 'F_e=300\\ \\text{N/mm}^2\\cdot 80\\ \\text{mm}^2=24\\,000\\ \\text{N}=24\\ \\text{kN}',
    },
    {
      title: 'Krok 3',
      narration: 'Największa siła wynika z wytrzymałości: F_m=R_mS_0=450· 80=36 000 N=36 kN.',
      caption: 'Największa siła wynika z wytrzymałości: F_m=R_mS_0=450· 80=36 000 N=36 kN.',
      visual: 'thermal',
      focus: {
        metric: 'σ',
      },
      formula: 'F_m=R_mS_0=450\\cdot 80=36\\,000\\ \\text{N}=36\\ \\text{kN}',
    },
    {
      title: 'Krok 4',
      narration: 'Stosunek R_m/R_e=450/300=1,5 opisuje umocnienie między początkiem płynięcia a maksimum.',
      caption: 'Stosunek R_m/R_e=450/300=1,5 opisuje umocnienie między początkiem płynięcia a maksimum.',
      visual: 'thermal',
      focus: {
        metric: 'σ',
      },
      formula: 'R_m/R_e=450/300=1{,}5',
    },
    {
      title: 'Krok 5',
      narration:
        'Różnica 36-24=12 kN pokazuje przyrost siły między uplastycznieniem a największą siłą, ale nie jest zapasem przeznaczonym do swobodnego wykorzystania w projekcie.',
      caption:
        'Różnica 36-24=12 kN pokazuje przyrost siły między uplastycznieniem a największą siłą, ale nie jest zapasem przeznaczonym do…',
      visual: 'thermal',
      focus: {
        metric: 'σ',
      },
      formula: '36-24=12\\ \\text{kN}',
    },
    {
      title: 'Krok 6',
      narration: 'Kontrola jednostek: MPa·mm^2=N, więc wynik w niutonach jest poprawny.',
      caption: 'Kontrola jednostek: MPa·mm^2=N, więc wynik w niutonach jest poprawny.',
      visual: 'thermal',
      focus: {
        metric: 'σ',
      },
      formula: '\\text{MPa}\\cdot\\text{mm}^2=\\text{N}',
    },
  ],
} satisfies SolutionData
