import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'cw5-1',
  title: 'Przekrój złożony z dwoma otworami',
  duration: 12,
  given: [
    'a = 300 mm — szerokość pasa górnego i dolnego',
    'b = 300 mm — wysokość pasa górnego; e = 50 mm — wysokość pasa dolnego',
    'c = 30 mm — grubość środnika; h = 400 mm — wysokość całkowita',
    'd = 30 mm — średnica każdego z dwóch otworów',
    'Z rysunku: środki otworów leżą na wysokości b/2 pasa górnego, a ich odległość od najbliższej bocznej krawędzi wynosi e',
  ],
  result:
    'y_C = 215,386 mm od dolnej krawędzi, x_C = 0; I_x = 1,35776 · 10⁹ mm⁴ = 135 776 cm⁴, I_y = 7,73396 · 10⁸ mm⁴ = 77 339,6 cm⁴.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.SectionCentroidMomentsAnimation }))),
  figure: {
    kind: 'section',
    width: 300,
    height: 400,
    parts: [
      { x: 0, y: 100, width: 300, height: 300, label: 'pas górny', tone: 'light' },
      { x: 135, y: 50, width: 30, height: 50, label: 'środnik', tone: 'accent' },
      { x: 0, y: 0, width: 300, height: 50, label: 'pas dolny', tone: 'light' },
    ],
    holes: [
      { cx: 50, cy: 250, r: 15, label: '∅30' },
      { cx: 250, cy: 250, r: 15, label: '∅30' },
    ],
    centroid: { x: 150, y: 215.386 },
    values: [
      { label: 'A netto', value: '105 086,28 mm²', focus: 'section' },
      { label: 'x_C', value: '0 mm', focus: 'centroid' },
      { label: 'y_C', value: '215,386 mm', focus: 'centroid' },
      { label: 'I_x', value: '1,35776·10⁹ mm⁴', focus: 'Ix' },
      { label: 'I_y', value: '7,73396·10⁸ mm⁴', focus: 'Iy' },
    ],
    note: 'Osie centralne przechodzą przez C = (0; 215,386 mm); otwory są odejmowane jako pole ujemne.',
  },
  scenes: [
    {
      title: 'Model, osie i dane',
      narration:
        'Oś y skierujmy w górę, z początkiem na dolnej krawędzi, a oś x umieśćmy w pionowej osi symetrii. Przekrój składa się z pasa górnego, środnika i pasa dolnego. Otwory traktujemy jako pole ujemne. Wysokość środnika to h − b − e = 50 mm.',
      formula: 'h_s = h-b-e = 400-300-50 = 50\\ \\text{mm}',
      caption:
        'Oś x pozioma przechodzi na razie przez dolną krawędź; po wyznaczeniu centroidu przeniesiemy ją do środka ciężkości.',
      visual: 'section',
      focus: { metric: 'model' },
      emphasis: 'Symetria daje od razu x_C = 0.',
    },
    {
      title: 'Pola części, środki i pole netto',
      narration:
        'Dla pasa górnego A_g = 300·300 = 90 000 mm², a jego środek leży na y_g = e + h_s + b/2 = 250 mm. Środnik ma pole 30·50 = 1 500 mm² i środek na y_s = 75 mm, a pas dolny 300·50 = 15 000 mm² i środek na y_d = 25 mm. Otwory mają łącznie A_o = 2π·15² = 1 413,72 mm², środek na y_o = 250 mm i położenie poziome ±(a/2 − e) = ±100 mm. Pole netto A = A_g + A_s + A_d − A_o = 105 086,28 mm² jest potrzebne do średniej ważonej wyznaczającej środek ciężkości.',
      formula:
        'A_g=90\\,000,\\quad A_s=1\\,500,\\quad A_d=15\\,000,\\quad A_o=1\\,413,72\\ \\text{mm}^2,\\qquad A=105\\,086,28\\ \\text{mm}^2',
      caption:
        'A_o = 1 413,72 mm²; pole netto A = 105 086,28 mm². Środki części: y_g = 250, y_s = 75, y_d = 25 mm; otwory: y = 250 mm, x = ±100 mm.',
      visual: 'section',
      focus: { metric: 'section' },
      emphasis: 'Otwory są polem ujemnym, więc ich pole i moment statyczny mają znak minus.',
    },
    {
      title: 'Wyznacz środek ciężkości',
      narration:
        'Moment statyczny względem dolnej krawędzi wynosi S = 90 000·250 + 1 500·75 + 15 000·25 − 1 413,72·250 = 22 634 070,83 mm³. Dzielimy go przez pole netto. Wynik leży między 100 a 400 mm, czyli w obrębie pasa górnego.',
      formula: 'y_C=\\frac{S}{A}=\\frac{22\\,634\\,070,83}{105\\,086,28}=215,386\\ \\text{mm}',
      caption: 'Centralna oś x jest pozioma i przechodzi 215,386 mm nad dolną krawędzią.',
      visual: 'section',
      focus: { metric: 'centroid' },
      emphasis: 'Nie zakładamy centroidu w połowie wysokości: przekrój nie jest symetryczny względem poziomu.',
    },
    {
      title: 'Przenieś momenty na centralną oś x',
      narration:
        'Dla każdego prostokąta stosujemy twierdzenie Steinera: własny moment bh³/12 plus pole razy kwadrat odległości jego centroidu od osi centralnej. Dla dwóch kół własny moment łączny wynosi 2πd⁴/64, a składnik przesunięcia odejmujemy razem z polem otworów.',
      formula:
        'I_x=\\left[\\frac{300\\cdot300^3}{12}+90\\,000(250-y_C)^2\\right]+\\left[\\frac{30\\cdot50^3}{12}+1\\,500(75-y_C)^2\\right]+\\left[\\frac{300\\cdot50^3}{12}+15\\,000(25-y_C)^2\\right]-\\left[\\frac{2\\pi30^4}{64}+1\\,413,72(250-y_C)^2\\right]',
      caption:
        'Kolejne dodatnie składniki to 782 834 182; 29 874 670 i 546 825 077 mm⁴, a ubytek za otwory wynosi 1 773 377 mm⁴.',
      visual: 'section',
      focus: { metric: 'Ix' },
    },
    {
      title: 'Zsumuj moment względem osi x',
      narration:
        'Po dodaniu trzech części i odjęciu otworów otrzymujemy moment bezwładności względem poziomej osi centralnej. Duży udział pasa dolnego wynika z jego dużej odległości od centroidu.',
      formula: 'I_x=1\\,357\\,760\\,552\\ \\text{mm}^4=135\\,776,1\\ \\text{cm}^4',
      caption: 'Przeliczenie: 1 cm⁴ = 10⁴ mm⁴.',
      visual: 'diagram',
      focus: { metric: 'Ix-sum' },
    },
    {
      title: 'Oblicz moment względem osi y',
      narration:
        'Oś y jest osią symetrii, więc centroidy wszystkich prostokątów już na niej leżą i ich składniki Steinera są zerowe. Dla pasa górnego własny moment to 300·300³/12, dla środnika 50·30³/12, a dla pasa dolnego 50·300³/12. Otwory są oddalone od osi y o 100 mm, dlatego ich składnik przesunięcia nie znika.',
      formula:
        'I_y=\\frac{300\\cdot300^3}{12}+\\frac{50\\cdot30^3}{12}+\\frac{50\\cdot300^3}{12}-\\left(\\frac{2\\pi30^4}{64}+1\\,413,72\\cdot100^2\\right)',
      caption: 'Przy osi pionowej w trzeciej potędze występują szerokości elementów, nie ich wysokości.',
      visual: 'section',
      focus: { metric: 'Iy' },
    },
    {
      title: 'Zsumuj moment względem osi y',
      narration:
        'Suma momentów prostokątów wynosi 787 612 500 mm⁴. Łączny ujemny wkład otworów to 14 216 688,51 mm⁴, z czego największa część pochodzi z ich odległości od osi y.',
      formula: 'I_y=787\\,612\\,500-14\\,216\\,688,51=773\\,395\\,811\\ \\text{mm}^4=77\\,339,6\\ \\text{cm}^4',
      caption: 'Moment względem osi pionowej jest mniejszy niż względem osi poziomej.',
      visual: 'diagram',
      focus: { metric: 'Iy-sum' },
    },
    {
      title: 'Co to oznacza dla belki',
      narration:
        'Ostateczne osie centralne przechodzą przez punkt (0; 215,386 mm). Większe I_x oznacza, że przekrój jest sztywniejszy przy zginaniu względem osi poziomej: przy tym samym momencie M naprężenie σ = My/I_x jest mniejsze, a ugięcie zależy od EI_x. Otwory zmniejszają oba momenty, ale w I_y szczególnie istotne jest ich położenie boczne.',
      formula:
        '\\boxed{y_C=215,386\\ \\text{mm},\\quad I_x=135\\,776,1\\ \\text{cm}^4,\\quad I_y=77\\,339,6\\ \\text{cm}^4}',
      caption: 'Wszystkie momenty odnoszą się do osi centralnych, nie do osi przez dolną krawędź.',
      visual: 'beam',
      focus: { metric: 'interpret' },
      emphasis: 'I_x > I_y, więc zginanie względem osi poziomej jest korzystniejsze.',
    },
  ],
} satisfies SolutionData
