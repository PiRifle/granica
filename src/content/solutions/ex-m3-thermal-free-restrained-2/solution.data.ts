import type { SolutionData } from '../../model'

export default {
  id: 'ex-m3-thermal-free-restrained-2',
  title: 'Temperatura: swoboda i zablokowanie — przykład 2',
  duration: 7,
  given: ['L_1=500 mm', 'A_1=400 mm^2', 'L_2=500 mm', 'A_2=250 mm^2', 'alpha=12', 'E=200 GPa'],
  result:
    'Gdyby jeden z końców miał luz, wynik zmieniłby się skokowo. Po zamknięciu luzu układ staje się niewyznaczalny, a przed zamknięciem jest swobodny. W zadaniach trzeba więc najpierw sprawdzić, czy luz został wykorzystany. Dopiero potem wolno pisać warunek zgodności z zablokowaniem.',
  figure: {
    kind: 'axial',
    top: 'fixed',
    bottom: 'fixed',
    units: {
      N: 'kN',
      σ: 'MPa',
      ε: '–',
      ΔL: 'mm',
      A: 'mm²',
      αΔT: '–',
      ΔL_T: 'mm',
    },
    segments: [
      {
        id: '1',
        label: '1',
        length: 500,
        area: 400,
        n: -36.9,
        sigma: -92.3,
        epsilon: -0.0004615,
        deltaL: -0.231,
        thermalStrain: 0.0006,
        freeDeltaL: 0.3,
      },
      {
        id: '2',
        label: '2',
        length: 500,
        area: 250,
        n: -36.9,
        sigma: -147.7,
        epsilon: -0.0007385,
        deltaL: -0.369,
        thermalStrain: 0.0006,
        freeDeltaL: 0.3,
      },
    ],
    note: 'ΔT = 50 K; sumaryczne skrócenie mechaniczne 0,6 mm znosi swobodne wydłużenie.',
  },
  scenes: [
    {
      title: 'Krok 1',
      narration:
        'Rozważmy pręt schodkowy utwierdzony na obu końcach. Górny odcinek ma L_1=500 mm i A_1=400 mm^2, dolny L_2=500 mm i A_2=250 mm^2. Materiał jest ten sam: α=12·10^-6 1/K i E=200 GPa. Temperatura wzrasta o Δ T=50 K. Oba końce są nieruchome, więc całkowita długość nie może się zmienić.',
      caption:
        'Rozważmy pręt schodkowy utwierdzony na obu końcach. Górny odcinek ma L_1=500 mm i A_1=400 mm^2, dolny L_2=500 mm i A_2=250 mm^2.…',
      visual: 'thermal',
      focus: { metric: 'αΔT' },
      formula: 'L_{1} = 500 mm',
    },
    {
      title: 'Krok 2',
      narration: 'Swobodne wydłużenie całego pręta wynosi',
      caption: 'Swobodne wydłużenie całego pręta wynosi',
      visual: 'thermal',
      focus: { metric: 'ΔL_T' },
    },
    {
      title: 'Krok 3',
      narration: 'Zapis matematyczny.',
      caption: 'Δ L_T=αΔ T(L_1+L_2)=12·10^-6·50·1000=0,6 mm.',
      visual: 'thermal',
      focus: { metric: 'ΔL_T' },
      formula: '\\Delta L_T=\\alpha\\Delta T(L_1+L_2)=12\\cdot10^{-6}\\cdot50\\cdot1000=0{,}6\\ \\text{mm}.',
    },
    {
      title: 'Krok 4',
      narration:
        'Podpory muszą wywołać skrócenie mechaniczne o tej samej wartości. Siła osiowa N jest taka sama w obu odcinkach, ponieważ między podporami nie ma dodatkowego obciążenia. Warunek zgodności ma postać',
      caption:
        'Podpory muszą wywołać skrócenie mechaniczne o tej samej wartości. Siła osiowa N jest taka sama w obu odcinkach, ponieważ między…',
      visual: 'thermal',
      focus: { metric: 'N' },
    },
    {
      title: 'Krok 5',
      narration: 'Zapis matematyczny.',
      caption: 'αΔ T(L_1+L_2)=(N L_1)/(E A_1)+(N L_2)/(E A_2).',
      visual: 'thermal',
      focus: { metric: 'N' },
      formula: '\\alpha\\Delta T(L_1+L_2)=\\frac{N L_1}{E A_1}+\\frac{N L_2}{E A_2}.',
    },
    {
      title: 'Krok 6',
      narration: 'Po podstawieniu danych otrzymujemy',
      caption: 'Po podstawieniu danych otrzymujemy',
      visual: 'thermal',
      focus: { metric: 'N' },
    },
    {
      title: 'Krok 7',
      narration: 'Zapis matematyczny.',
      caption: '0,6=N((500)/(200 000·400)+(500)/(200 000·250)) =N·1,625·10^-5 mm/N.',
      visual: 'thermal',
      focus: { metric: 'N' },
      formula:
        '0{,}6=N\\left(\\frac{500}{200\\,000\\cdot400}+\\frac{500}{200\\,000\\cdot250}\\right)\n=N\\cdot1{,}625\\cdot10^{-5}\\ \\text{mm/N}.',
    },
    {
      title: 'Krok 8',
      narration: 'Stąd N≈36 923 N, czyli około 36,9 kN ściskania. Naprężenia wynoszą',
      caption: 'Stąd N≈36 923 N, czyli około 36,9 kN ściskania. Naprężenia wynoszą',
      visual: 'thermal',
      focus: { metric: 'N' },
      formula: 'N \\approx 36\\,923 N',
    },
    {
      title: 'Krok 9',
      narration: 'Zapis matematyczny.',
      caption: 'σ_1=(-36 923)/(400)≈-92,3 MPa, σ_2=(-36 923)/(250)≈-147,7 MPa.',
      visual: 'thermal',
      focus: { metric: 'σ' },
      formula:
        '\\sigma_1=\\frac{-36\\,923}{400}\\approx-92{,}3\\ \\text{MPa},\n\\qquad\n\\sigma_2=\\frac{-36\\,923}{250}\\approx-147{,}7\\ \\text{MPa}.',
    },
    {
      title: 'Krok 10',
      narration:
        'Cieńszy odcinek jest więc bardziej wytężony, choć siła w obu odcinkach jest identyczna. To typowy wniosek dla prętów schodkowych: o naprężeniu decyduje iloraz N/A, a nie sama siła. Sprawdzenie zgodności: skrócenia wynoszą około 0,2308 mm i 0,3692 mm, a ich suma to 0,6 mm. Swobodne wydłużenie zostało dokładnie zniesione.',
      caption:
        'Cieńszy odcinek jest więc bardziej wytężony, choć siła w obu odcinkach jest identyczna. To typowy wniosek dla prętów schodkowych:…',
      visual: 'thermal',
      focus: { metric: 'ΔL' },
    },
    {
      title: 'Krok 11',
      narration:
        'Gdyby jeden z końców miał luz, wynik zmieniłby się skokowo. Po zamknięciu luzu układ staje się niewyznaczalny, a przed zamknięciem jest swobodny. W zadaniach trzeba więc najpierw sprawdzić, czy luz został wykorzystany. Dopiero potem wolno pisać warunek zgodności z zablokowaniem.',
      caption:
        'Gdyby jeden z końców miał luz, wynik zmieniłby się skokowo. Po zamknięciu luzu układ staje się niewyznaczalny, a przed…',
      visual: 'thermal',
      focus: { metric: 'αΔT' },
    },
  ],
} satisfies SolutionData
