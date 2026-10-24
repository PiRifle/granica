import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-m3-strength-elasticity-plasticity',
  title: 'Re, Rm, sprężystość i plastyczność — przykład 1',
  duration: 7,
  given: ['S_0=80 mm²', 'R_e=300 MPa', 'R_m=450 MPa'],
  result:
    'Uplastycznienie próbki zaczyna się przy około 24 kN, a wytrzymałości R_m odpowiada siła 36 kN. Zerwanie nastąpi przy sile mniejszej od 36 kN, po przewężeniu.',
  animation: lazy(() =>
    import('./animation').then((module) => ({ default: module.StrengthElasticityPlasticityAnimation })),
  ),
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
      title: 'Model próbki i dane',
      narration:
        'Próbka stalowa ma pole S₀ = 80 mm². Materiał ma granicę plastyczności R_e = 300 MPa i wytrzymałość R_m = 450 MPa. Na wykresie σ–ε oba punkty mają różne znaczenie, a na próbce zobaczymy, co dzieje się po odciążeniu.',
      caption: 'Na wykresie zaznaczymy obie granice, a na próbce pokażemy stan po odciążeniu.',
      visual: 'axial',
      focus: { metric: 'model' },
      formula: 'S_0=80\\ \\text{mm}^2,\\qquad R_e=300\\ \\text{MPa},\\qquad R_m=450\\ \\text{MPa}',
    },
    {
      title: 'Granica plastyczności R_e',
      narration:
        'Do naprężenia 300 MPa próbka pracuje sprężyście. Po przekroczeniu tej granicy odkształcenie staje się trwałe. Sile odpowiadającej granicy plastyczności przypisujemy oznaczenie F_e.',
      caption: 'R_e to naprężenie, a F_e to siła — nie mieszaj jednostek.',
      visual: 'axial',
      focus: { metric: 'Re' },
      formula: 'F_e=R_eS_0=300\\cdot80=24\\,000\\ \\text{N}=24\\ \\text{kN}',
    },
    {
      title: 'Wytrzymałość na rozciąganie R_m',
      narration:
        'Po uplastycznieniu materiał się umacnia. Maksimum krzywej odpowiada największej sile z próby, a nie chwili zerwania. Dlatego R_m jest większe od R_e, choć nadal jest naprężeniem odniesionym do pola początkowego.',
      caption: 'Po maksimum próbka się przewęża, a siła maleje.',
      visual: 'axial',
      focus: { metric: 'Rm' },
      formula: 'F_m=R_mS_0=450\\cdot80=36\\,000\\ \\text{N}=36\\ \\text{kN}',
    },
    {
      title: 'Sprężystość i plastyczność po odciążeniu',
      narration:
        'Odciążenie biegnie równolegle do początkowego odcinka sprężystego. Część ε_e znika, a część ε_p pozostaje jako trwałe wydłużenie próbki. To właśnie różnica między powrotem sprężystym a odkształceniem plastycznym.',
      caption: 'Po przekroczeniu R_e próbka wraca tylko częściowo — to odkształcenie trwałe.',
      visual: 'axial',
      focus: { metric: 'unload' },
      formula: '\\varepsilon=\\varepsilon_e+\\varepsilon_p,\\qquad \\varepsilon_p>0',
    },
    {
      title: 'Znaczenie R_e i R_m w projekcie',
      narration:
        'Stosunek R_m/R_e = 1,5 opisuje umocnienie między początkiem płynięcia a maksimum. Różnica sił 36 − 24 = 12 kN nie jest zapasem do swobodnego wykorzystania: w typowej konstrukcji decyduje R_e, a R_m jest miarą maksymalnej nośności. Kontrola MPa·mm² = N potwierdza jednostki.',
      caption: 'R_e jest podstawą projektu sprężystego, R_m opisuje maksimum, a nie naprężenie robocze.',
      visual: 'axial',
      focus: { metric: 'compare' },
      formula: '\\frac{R_m}{R_e}=\\frac{450}{300}=1{,}5,\\qquad F_m-F_e=12\\ \\text{kN}',
    },
  ],
} satisfies SolutionData
