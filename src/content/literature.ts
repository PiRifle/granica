export type LiteratureKind = 'podstawowa' | 'uzupelniajaca'

export interface LiteratureEntry {
  id: string
  ref: string
  kind: LiteratureKind
  authors: string
  title: string
  edition?: string
  publisher: string
  year: string
  pages?: string
  level: string
  focus: string
  howToUse: string
  modules: string[]
}

export interface OpenSource {
  id: string
  authors: string
  title: string
  source: string
  license: string
  url: string
  covers: string
  note: string
}

export const literature: LiteratureEntry[] = [
  {
    id: 'jakubowicz-orlos',
    ref: 'P1',
    kind: 'podstawowa',
    authors: 'Andrzej Jakubowicz, Zbigniew Orłoś',
    title: 'Wytrzymałość materiałów',
    publisher: 'WNT',
    year: '1970',
    pages: '627',
    level: 'Klasyczny podręcznik akademicki',
    focus:
      'Podstawy analizy wytrzymałościowej: rozciąganie i ściskanie, ścinanie, skręcanie, zginanie, stan naprężenia oraz hipotezy wytężeniowe.',
    howToUse:
      'Czytaj równolegle z modułami 2–9. Po każdym rozdziale wróć do lekcji i rozwiąż podobne zadanie bez zaglądania do rozwiązania.',
    modules: [
      'foundations',
      'axial',
      'material',
      'geometry',
      'shear',
      'bending',
      'stress-state',
      'strain-state',
      'criteria',
    ],
  },
  {
    id: 'wolny-siemieniec',
    ref: 'P2',
    kind: 'podstawowa',
    authors: 'Stanisław Wolny, Andrzej Siemieniec',
    title: 'Wytrzymałość materiałów, cz. I',
    publisher: 'AGH',
    year: '2002',
    pages: '399',
    level: 'Wykład akademicki z rozbudowanymi rysunkami',
    focus:
      'Teoria stanu naprężenia i odkształcenia, rozciąganie, skręcanie i zginanie wraz z przykładami obliczeniowymi.',
    howToUse:
      'Dobre źródło do budowania obrazu geometrycznego: najpierw rysunek i model, potem wzory. Wracaj do niego, gdy w lekcji brakuje Ci intuicji.',
    modules: ['axial', 'material', 'shear', 'bending', 'stress-state', 'strain-state', 'criteria'],
  },
  {
    id: 'niezgodzinscy-zadania',
    ref: 'P3',
    kind: 'podstawowa',
    authors: 'Michał Niezgodziński, Tadeusz Niezgodziński',
    title: 'Zadania z wytrzymałości materiałów',
    publisher: 'WNT',
    year: '2002',
    level: 'Zbiór zadań z rozwiązaniami',
    focus: 'Obliczenia wytrzymałościowe, dobór przekrojów i materiały, stany złożone oraz pełne zadania projektowe.',
    howToUse:
      'Po przerobieniu lekcji rozwiąż 2–3 zadania z odpowiedniego działu. Najpierw samodzielnie, dopiero potem porównaj tok rozumowania.',
    modules: ['axial', 'geometry', 'shear', 'bending', 'stress-state', 'criteria', 'design'],
  },
  {
    id: 'kurowski-parszewski',
    ref: 'P4',
    kind: 'podstawowa',
    authors: 'Roman Kurowski, Zbigniew Parszewski',
    title: 'Zbiór zadań z wytrzymałości materiałów',
    publisher: 'PWN',
    year: '1966',
    pages: '627',
    level: 'Klasyczny, wymagający zbiór zadań',
    focus: 'Duży wybór zadań rachunkowych i konstrukcyjnych, w tym o podwyższonej trudności.',
    howToUse:
      'Traktuj jako trening przed kolokwium. Wybieraj zadania zgodne z aktualnie przerabianym modułem i zapisuj cały tok obliczeń.',
    modules: ['axial', 'geometry', 'shear', 'bending', 'criteria', 'design'],
  },
  {
    id: 'niezgodzinscy-podrecznik',
    ref: 'P5',
    kind: 'podstawowa',
    authors: 'Tadeusz Niezgodziński, Andrzej Niezgodziński',
    title: 'Wytrzymałość materiałów',
    publisher: 'wydanie zależne od biblioteki',
    year: '—',
    level: 'Podręcznik uzupełniający',
    focus: 'Zwięzłe omówienie teorii i przykładów obliczeniowych do większości działów kursu.',
    howToUse:
      'Sprawdź wydanie w bibliotece uczelnianej i wybierz rozdziały zgodne z tematyką lekcji. Dobry do szybkiej powtórki przed kolokwium.',
    modules: [
      'foundations',
      'axial',
      'material',
      'geometry',
      'shear',
      'bending',
      'stress-state',
      'strain-state',
      'criteria',
      'design',
    ],
  },
  {
    id: 'hibbeler',
    ref: 'P6',
    kind: 'podstawowa',
    authors: 'Russell C. Hibbeler',
    title: 'Mechanics of Materials',
    edition: '10th ed.',
    publisher: 'Pearson',
    year: '—',
    level: 'Nowoczesny podręcznik z bardzo dobrymi rysunkami',
    focus:
      'Mechanika materiałów po angielsku: naprężenia, odkształcenia, skręcanie, zginanie, stany złożone i wyboczenie.',
    howToUse:
      'Świetny do intuicji i rysunków. Korzystaj z rozdziałów o stanie naprężenia i zginaniu, jeśli polski podręcznik jest zbyt zwięzły.',
    modules: ['axial', 'material', 'shear', 'bending', 'stress-state', 'strain-state', 'criteria'],
  },
  {
    id: 'brzoska',
    ref: 'U1',
    kind: 'uzupelniajaca',
    authors: 'Zbigniew Brzoska',
    title: 'Wytrzymałość materiałów',
    publisher: 'PWN',
    year: '1983',
    level: 'Uzupełniający wykład teoretyczny',
    focus: 'Głębsze ujęcie teorii stanu naprężenia i odkształcenia oraz hipotez wytężeniowych.',
    howToUse:
      'Sięgaj po niego, gdy chcesz zrozumieć założenia i granice stosowalności wzorów, a nie tylko je zastosować.',
    modules: ['bending', 'stress-state', 'strain-state', 'criteria'],
  },
  {
    id: 'misiak',
    ref: 'U2',
    kind: 'uzupelniajaca',
    authors: 'Jan Misiak',
    title: 'Mechanika techniczna, t. 1: Statyka i wytrzymałość materiałów',
    publisher: 'WNT',
    year: '2003',
    level: 'Pomost między statyką a wytrzymałością',
    focus: 'Reakcje, równowaga, siły wewnętrzne i podstawy obliczeń wytrzymałościowych.',
    howToUse: 'Idealny na start: przypomnij statykę przed modułem 1 i wróć do niego przy belkach w module 6.',
    modules: ['foundations', 'bending', 'design'],
  },
]

export const openSources: OpenSource[] = [
  {
    id: 'roylance',
    authors: 'David Roylance',
    title: 'Mechanics of Materials',
    source: 'Engineering LibreTexts',
    license: 'CC BY-NC-SA',
    url: 'https://eng.libretexts.org/Bookshelves/Mechanical_Engineering/Mechanics_of_Materials_(Roylance)',
    covers: 'Rozciąganie, ścinanie, skręcanie, zginanie, tensor naprężenia, plastyczność i pękanie.',
    note: 'Główny otwarty podręcznik wykorzystany przy modułach 2–9. Krótkie rozdziały i dużo przykładów.',
  },
  {
    id: 'wierzbicki',
    authors: 'Tomasz Wierzbicki',
    title: 'Structural Mechanics',
    source: 'Engineering LibreTexts',
    license: 'CC BY-NC-SA',
    url: 'https://eng.libretexts.org/Bookshelves/Mechanical_Engineering/Structural_Mechanics_(Wierzbicki)',
    covers: 'Odkształcenia, tensor naprężenia, równania konstytutywne, belki, energia i stateczność.',
    note: 'Dobry do zrozumienia założeń teorii belek i stanu naprężenia. Bardziej wymagający niż Roylance.',
  },
  {
    id: 'osgood',
    authors: 'Daniel Osgood, Cameron Christensen, Ethan Christensen',
    title: 'Engineering Mechanics: Statics',
    source: 'Engineering LibreTexts',
    license: 'CC BY-NC-SA',
    url: 'https://eng.libretexts.org/Bookshelves/Mechanical_Engineering/Engineering_Mechanics_-_Statics_(Osgood_Cameron_and_Christensen)',
    covers: 'Siły, momenty, podpory, równowaga, kratownice, siły wewnętrzne, centroidy i momenty bezwładności.',
    note: 'Podstawa modułów 1, 4 i 6: reakcje, wykresy sił wewnętrznych i geometria przekroju.',
  },
  {
    id: 'mit-311',
    authors: 'MIT OpenCourseWare',
    title: '3.11 Mechanics of Materials — lecture notes',
    source: 'MIT OpenCourseWare',
    license: 'CC BY-NC-SA',
    url: 'https://ocw.mit.edu/courses/3-11-mechanics-of-materials-fall-1999/pages/lecture-notes/',
    covers: 'Jednostki, statyka, skręcanie, naprężenia w belkach, stan naprężenia, doświadczenia i plastyczność.',
    note: 'Krótkie notatki wykładowe z rysunkami. Dobre do szybkiego sprawdzenia wyprowadzeń i definicji.',
  },
]
