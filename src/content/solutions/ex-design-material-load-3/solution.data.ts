import type { SolutionData } from '../../model'

export default {
  id: 'ex-design-material-load-3',
  title: 'Dobór materiału i obciążenia dopuszczalnego — przykład 3',
  duration: 7,
  given: ['A=250 mm²', 'R_e=235 MPa', 'P=40 kN', 'n=2'],
  result:
    'Błędy w doborze materiału wynikają najczęściej z pomylenia nośności ze sztywnością albo z niewłaściwego wyboru granicy. Poniższa lista pomaga ich uniknąć.',
  figure: {
    kind: 'axial',
    top: 'fixed',
    bottom: 'free',
    segments: [{ id: '1', label: 'pręt', length: 1000, area: 250, n: 40, sigma: 160, deltaL: 0.8 }],
    loads: [{ node: 1, value: 40, label: 'P = 40 kN', direction: 'down' }],
    units: { N: 'kN', σ: 'MPa', ΔL: 'mm', A: 'mm²' },
    note: 'Przy A = 250 mm² naprężenie 160 MPa przekracza zapas wynikający z n = 2.',
  },
  scenes: [
    {
      title: 'Krok 1',
      narration:
        'Pręt o polu A=250 mm^2 jest wykonany ze stali o R_e=235 MPa i obciążony siłą P=40 kN. Wymagany współczynnik bezpieczeństwa wynosi n=2. Czy materiał wystarcza?',
      caption:
        'Pręt o polu A=250 mm^2 jest wykonany ze stali o R_e=235 MPa i obciążony siłą P=40 kN. Wymagany współczynnik bezpieczeństwa wynosi…',
      visual: 'axial',
      focus: { metric: 'A', segment: '1' },
      formula: 'A=250\\ \\text{mm}^2',
    },
    {
      title: 'Krok 2',
      narration:
        'Naprężenie rzeczywiste: σ=P/A=40 000/250=160 MPa. Wymagana granica: R_e≥ nσ=2·160=320 MPa. Ponieważ dostępna stal ma 235 MPa, warunek nie jest spełniony.',
      caption:
        'Naprężenie rzeczywiste: σ=P/A=40 000/250=160 MPa. Wymagana granica: R_e≥ nσ=2·160=320 MPa. Ponieważ dostępna stal ma 235 MPa,…',
      visual: 'axial',
      focus: { metric: 'σ', segment: '1' },
      formula: '\\sigma=P/A=40\\,000/250=160\\ \\text{MPa}',
    },
    {
      title: 'Krok 3',
      narration:
        'Rzeczywisty zapas względem dostępnej stali wynosi n=235/160≈1,47, czyli mniej niż wymagane 2. Rozwiązania są trzy: wybrać stal o wyższej granicy, zwiększyć pole przekroju albo zmniejszyć obciążenie. Nowe pole przy tej samej stali i n=2 musi wynieść A≥ nP/R_e=2·40 000/235≈341 mm^2.',
      caption:
        'Rzeczywisty zapas względem dostępnej stali wynosi n=235/160≈1,47, czyli mniej niż wymagane 2. Rozwiązania są trzy: wybrać stal o…',
      visual: 'axial',
      focus: { metric: 'A', segment: '1' },
      formula: 'n=235/160\\approx1{,}47',
    },
    {
      title: 'Krok 4',
      narration:
        'Wariant odwrotny pokazuje, że „materiał nie wystarcza” nie jest końcem zadania. Trzeba wskazać, jaki parametr trzeba zmienić i o ile. Taki wniosek jest bardziej użyteczny niż samo stwierdzenie, że warunek jest niespełniony.',
      caption:
        'Wariant odwrotny pokazuje, że „materiał nie wystarcza” nie jest końcem zadania. Trzeba wskazać, jaki parametr trzeba zmienić i o…',
      visual: 'axial',
      focus: { metric: 'σ', segment: '1' },
    },
    {
      title: 'Krok 5',
      narration:
        'Można też zapytać, jaki materiał byłby potrzebny przy niezmienionym polu. Wymagana granica 320 MPa jest typowa dla stali o podwyższonej wytrzymałości, ale trzeba sprawdzić, czy taki materiał jest dostępny i czy jego E nie zmienia warunku sztywności. Sam wzrost R_e nie musi rozwiązać problemu, jeśli element jest zbyt podatny.',
      caption:
        'Można też zapytać, jaki materiał byłby potrzebny przy niezmienionym polu. Wymagana granica 320 MPa jest typowa dla stali o…',
      visual: 'axial',
      focus: { metric: 'σ', segment: '1' },
      formula: '320\\ \\text{MPa}',
    },
    {
      title: 'Krok 6',
      narration:
        'Błędy w doborze materiału wynikają najczęściej z pomylenia nośności ze sztywnością albo z niewłaściwego wyboru granicy. Poniższa lista pomaga ich uniknąć.',
      caption:
        'Błędy w doborze materiału wynikają najczęściej z pomylenia nośności ze sztywnością albo z niewłaściwego wyboru granicy. Poniższa…',
      visual: 'axial',
      focus: { metric: 'A', segment: '1' },
    },
  ],
} satisfies SolutionData
