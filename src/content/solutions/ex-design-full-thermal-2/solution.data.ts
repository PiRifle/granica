import type { SolutionData } from '../../model'

export default {
  id: 'ex-design-full-thermal-2',
  title: 'Pełne zadanie: obciążenie mechaniczne i temperatura — przykład 2',
  duration: 7,
  given: ['L=1500 mm', 'A=400 mm²', 'g=0,5 mm', 'E=200 GPa', 'alpha=12·10⁻⁶ 1/K', 'ΔT=60 K'],
  result:
    'Luz nie działa jednak jak „bezpiecznik” przy dowolnie dużej temperaturze. Po jego zamknięciu naprężenie rośnie już liniowo z dalszym przyrostem temperatury. Projektant musi więc znać zarówno maksymalną temperaturę pracy, jak i początkowy luz, a nie tylko jedną z tych wartości.',
  figure: {
    kind: 'axial',
    top: 'fixed',
    bottom: 'gap',
    segments: [
      {
        id: '1',
        label: 'pręt',
        length: 1500,
        area: 400,
        n: -30.933,
        sigma: -77.3,
        thermalStrain: 0.00072,
        freeDeltaL: 1.08,
        deltaL: 0.5,
      },
    ],
    units: { N: 'kN', σ: 'MPa', ΔL: 'mm', ΔL_T: 'mm', αΔT: '–', A: 'mm²' },
    note: 'Luz g = 0,5 mm zamyka się przy ΔT ≈ 27,8 K; dalszy wzrost temperatury wywołuje ściskanie.',
  },
  scenes: [
    {
      title: 'Krok 1',
      narration:
        'Rozważmy pojedynczy pręt o długości L=1500 mm i polu A=400 mm^2, utwierdzony na lewym końcu, z luzem g=0,5 mm do sztywnej ściany po prawej. Materiał: E=200 GPa, α=12·10^-6 1/K. Temperatura wzrasta o Δ T=60 K. Jaki jest naprężenie po zamknięciu luzu?',
      caption:
        'Rozważmy pojedynczy pręt o długości L=1500 mm i polu A=400 mm^2, utwierdzony na lewym końcu, z luzem g=0,5 mm do sztywnej ściany…',
      visual: 'axial',
      focus: { metric: 'A', segment: '1' },
      formula: 'L=1500\\ \\text{mm}',
    },
    {
      title: 'Krok 2',
      narration:
        'Najpierw sprawdzamy, czy kontakt w ogóle nastąpi. Swobodne wydłużenie termiczne wynosi αΔ T L=12·10^-6·60·1500=1,08 mm, czyli więcej niż g=0,5 mm. Kontakt nastąpi.',
      caption:
        'Najpierw sprawdzamy, czy kontakt w ogóle nastąpi. Swobodne wydłużenie termiczne wynosi αΔ T L=12·10^-6·60·1500=1,08 mm, czyli…',
      visual: 'axial',
      focus: { metric: 'ΔL_T', segment: '1' },
      formula: '\\alpha\\Delta T L=12\\cdot10^{-6}\\cdot60\\cdot1500=1{,}08\\ \\text{mm}',
    },
    {
      title: 'Krok 3',
      narration: 'Temperatura kontaktu: Δ T_c=g/(α L)=0,5/(12·10^-6·1500)≈27,8 K.',
      caption: 'Temperatura kontaktu: Δ T_c=g/(α L)=0,5/(12·10^-6·1500)≈27,8 K.',
      visual: 'axial',
      focus: { metric: 'αΔT', segment: '1' },
      formula: '\\Delta T_c=g/(\\alpha L)=0{,}5/(12\\cdot10^{-6}\\cdot1500)\\approx27{,}8\\ \\text{K}',
    },
    {
      title: 'Krok 4',
      narration:
        'Po kontakcie obowiązuje g=αΔ T L+NL/(EA), więc N=EA(g/L-αΔ T). Podstawiamy EA=200 000·400=80 000 000 N, g/L=0,5/1500=0,0003333 i αΔ T=0,00072. Różnica wynosi -0,00038667, więc N≈-30 933 N.',
      caption:
        'Po kontakcie obowiązuje g=αΔ T L+NL/(EA), więc N=EA(g/L-αΔ T). Podstawiamy EA=200 000·400=80 000 000 N, g/L=0,5/1500=0,0003333 i…',
      visual: 'axial',
      focus: { metric: 'N', segment: '1' },
      formula: 'g=\\alpha\\Delta T L+NL/(EA)',
    },
    {
      title: 'Krok 5',
      narration:
        'Naprężenie: σ=-30 933/400≈-77,3 MPa. Pręt jest ściskany, ale naprężenie jest znacznie mniejsze niż w przypadku idealnego zablokowania przy tej samej temperaturze, gdzie wyniosłoby -EαΔ T=-144 MPa. Luz częściowo kompensuje rozszerzalność.',
      caption:
        'Naprężenie: σ=-30 933/400≈-77,3 MPa. Pręt jest ściskany, ale naprężenie jest znacznie mniejsze niż w przypadku idealnego…',
      visual: 'axial',
      focus: { metric: 'σ', segment: '1' },
      formula: '\\sigma=-30\\,933/400\\approx-77{,}3\\ \\text{MPa}',
    },
    {
      title: 'Krok 6',
      narration:
        'Ten przykład pokazuje, że luz jest świadomym elementem projektu. Zbyt mały luz nie chroni przed naprężeniem, a zbyt duży może powodować uderzenia i drgania. W kolejnictwie i konstrukcjach mostowych dylatacje pełnią właśnie taką funkcję.',
      caption:
        'Ten przykład pokazuje, że luz jest świadomym elementem projektu. Zbyt mały luz nie chroni przed naprężeniem, a zbyt duży może…',
      visual: 'axial',
      focus: { metric: 'ΔL', segment: '1' },
    },
    {
      title: 'Krok 7',
      narration:
        'Luz nie działa jednak jak „bezpiecznik” przy dowolnie dużej temperaturze. Po jego zamknięciu naprężenie rośnie już liniowo z dalszym przyrostem temperatury. Projektant musi więc znać zarówno maksymalną temperaturę pracy, jak i początkowy luz, a nie tylko jedną z tych wartości.',
      caption:
        'Luz nie działa jednak jak „bezpiecznik” przy dowolnie dużej temperaturze. Po jego zamknięciu naprężenie rośnie już liniowo z…',
      visual: 'axial',
      focus: { metric: 'σ', segment: '1' },
    },
  ],
} satisfies SolutionData
