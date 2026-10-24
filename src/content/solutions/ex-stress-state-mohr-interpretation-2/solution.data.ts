import type { SolutionData } from '../../model'

export default {
  id: 'ex-stress-state-mohr-interpretation-2',
  title: 'Od koła do decyzji inżynierskiej — przykład 2',
  duration: 7,
  given: ['σ nominalne = 120 MPa', 'R_e = 235 MPa'],
  result:
    'Ten przykład pokazuje, że koło Mohra i kryterium wytężenia to dopiero część analizy. Trzeba jeszcze wiedzieć, gdzie przyłożone jest obciążenie i jaka jest geometria. W strefie karbu samo σ=N/A może zaniżać naprężenie nawet kilkukrotnie.',
  figure: {
    kind: 'cube',
    stresses: { x: 120, y: 0, z: 0 },
    values: [
      { label: 'σ nominalne', value: '120 MPa', focus: 'stress', reveal: 0 },
      { label: 'σ lokalne', value: '360 MPa', focus: 'stress' },
      { label: 'R_e', value: '235 MPa', focus: 'stress', reveal: 0 },
      { label: 'n nominalny', value: '1,96', focus: 'stress' },
      { label: 'k_t', value: '3', focus: 'stress' },
    ],
    note: 'Naprężenie nominalne 120 MPa; przy otworze naprężenie lokalne osiąga około 360 MPa.',
  },
  scenes: [
    {
      title: 'Dane i naprężenie nominalne',
      narration:
        'Rozważmy blachę z otworem kołowym, rozciąganą nominalnie naprężeniem σ=120 MPa. W pobliżu otworu naprężenie styczne do brzegu osiąga około trzykrotności wartości nominalnej, czyli 360 MPa.',
      caption: 'Naprężenie nominalne i lokalna koncentracja przy otworze.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '\\sigma=120\\ \\text{MPa},\\quad \\sigma_{\\max}\\approx3\\sigma=360\\ \\text{MPa}',
    },
    {
      title: 'Nominalny współczynnik bezpieczeństwa',
      narration:
        'Dla stali o R_e=235 MPa nominalny współczynnik bezpieczeństwa wynosi 235/120≈1,96, ale lokalne naprężenie przekracza granicę plastyczności o 125 MPa.',
      caption: 'Nominalny współczynnik nie opisuje sytuacji w strefie karbu.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: 'n_{\\text{nom}}=\\frac{235}{120}\\approx1{,}96,\\quad \\sigma_{\\max}-R_e=360-235=125\\ \\text{MPa}',
    },
    {
      title: 'Znaczenie koncentracji',
      narration:
        'W materiale ciągliwym strefa plastyczna wokół otworu może się rozwinąć i częściowo wyrównać naprężenia, ale przy obciążeniu cyklicznym lokalne uplastycznienie sprzyja inicjacji pęknięcia zmęczeniowego.',
      caption: 'Koncentracja naprężeń ma znaczenie nawet w materiale ciągliwym.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '\\sigma_{\\max}=360\\ \\text{MPa}>R_e=235\\ \\text{MPa}',
    },
    {
      title: 'Współczynnik koncentracji',
      narration:
        'Współczynnik koncentracji naprężeń dla otworu kołowego w rozciąganej blasze jest równy około 3 i nie zależy od średnicy otworu. Efekt jest silny tylko w pobliżu otworu, w odległości rzędu kilku średnic.',
      caption: 'Zasada de Saint-Venanta: zaburzenie pola naprężeń wygasa z odległością.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: 'k_t=\\frac{\\sigma_{\\max}}{\\sigma_{\\text{nom}}}\\approx3',
    },
    {
      title: 'Naprężenia główne w strefie karbu',
      narration:
        'W stanie jednoosiowym naprężenia główne w strefie karbu wynoszą około 360, 0 i 0 MPa. To pokazuje, że lokalne naprężenie jest znacznie większe od nominalnego.',
      caption: 'Stan naprężenia w strefie karbu jest jednoosiowy, ale o dużej wartości.',
      visual: 'cube',
      focus: { metric: 'principal' },
      formula: '\\sigma_1\\approx360\\ \\text{MPa},\\quad \\sigma_2=\\sigma_3=0',
    },
    {
      title: 'Ograniczenia analizy nominalnej',
      narration:
        'Samo σ=N/A może zaniżać naprężenie nawet kilkukrotnie. Dlatego inżynier najpierw szuka miejsc, w których naprężenia mogą się koncentrować, a dopiero potem wykonuje obliczenia szczegółowe.',
      caption: 'Najpierw geometria i miejsca koncentracji, potem obliczenia.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '\\sigma_{\\text{nom}}=120\\ \\text{MPa}\\ll\\sigma_{\\max}=360\\ \\text{MPa}',
    },
    {
      title: 'Interpretacja inżynierska',
      narration:
        'Koło Mohra i kryterium wytężenia to dopiero część analizy. Trzeba jeszcze wiedzieć, gdzie przyłożone jest obciążenie i jaka jest geometria. W strefie karbu samo σ=N/A może zaniżać naprężenie nawet kilkukrotnie.',
      caption: 'Nominalny współczynnik bezpieczeństwa nie wystarcza w strefie karbu.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula:
        '\\boxed{\\sigma_{\\text{nom}}=120\\ \\text{MPa},\\quad k_t\\approx3,\\quad \\sigma_{\\max}\\approx360\\ \\text{MPa},\\quad n_{\\text{nom}}\\approx1{,}96}',
    },
  ],
} satisfies SolutionData
