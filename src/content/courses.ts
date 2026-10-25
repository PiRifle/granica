import type { CourseDefinition } from '../types'

export const courseCollection: CourseDefinition[] = [
  {
    id: 'wytrzymalosc',
    title: 'Wytrzymałość materiałów',
    shortTitle: 'Wytrzymałość',
    description:
      'Od pierwszej reakcji po pełny obraz naprężeń. Laboratoria, animowane rozwiązania i zadania krok po kroku.',
    eyebrow: 'Interaktywny kurs wytrzymałości materiałów',
    status: 'ready',
    theme: {
      accent: '#4f6df5',
      accentHover: '#3d5de3',
      accentStrong: '#3155d9',
      accentSoft: '#edf1ff',
      highlight: '#ff6b45',
      highlightSoft: '#fff0eb',
      tint: '#f5f7fc',
    },
    moduleIds: [
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
    syllabus: [
      {
        moduleId: 'foundations',
        label: 'Jednostki SI, modele, obciążenia, podpory, równowaga, metoda przekrojów, Saint-Venant',
      },
      {
        moduleId: 'axial',
        label:
          'Naprężenia i siły osiowe, pręty schodkowe, prawo Hooke’a, wydłużenia, warunki wytrzymałości i sztywności',
      },
      {
        moduleId: 'material',
        label:
          'Próby materiałowe, Re/Rm, ciężar własny, temperatura, naprężenie dopuszczalne i współczynnik bezpieczeństwa',
      },
      {
        moduleId: 'geometry',
        label: 'Środek ciężkości, momenty statyczne i bezwładności, twierdzenie Steinera, wskaźnik wytrzymałości',
      },
      {
        moduleId: 'shear',
        label: 'Ścinanie techniczne połączeń, skręcanie wałów pełnych i rurowych, kąt skręcenia, dobór średnicy',
      },
      {
        moduleId: 'bending',
        label: 'Reakcje belek, wykresy T(x) i M(x), czyste zginanie, rozkład naprężeń i dobór przekroju',
      },
      {
        moduleId: 'stress-state',
        label: 'Tensor naprężenia, transformacja przy obrocie, naprężenia i kierunki główne, koło Mohra',
      },
      {
        moduleId: 'strain-state',
        label: 'Odkształcenia normalne i postaciowe, liczba Poissona, uogólnione prawo Hooke’a, rozety tensometryczne',
      },
      {
        moduleId: 'criteria',
        label: 'Naprężenie zredukowane, hipotezy HMH i Tresca, obciążenia złożone, współczynnik bezpieczeństwa',
      },
      {
        moduleId: 'design',
        label: 'Dobór wymiaru, materiału i obciążenia dopuszczalnego, pełne zadania i strategia kolokwium',
      },
    ],
    tools: {
      training: true,
      exam: true,
      cheatsheet: true,
      syllabus: true,
      library: true,
    },
    marketing: {
      tagline: 'Zrozum, zanim się złamie.',
      headlineLead: 'Zrozum, zanim',
      headlineAccent: 'się złamie.',
      promise:
        'Nie zgaduj, jak zadziała konstrukcja. Zmieniaj siły, obserwuj odkształcenia i przechodź przez zadania krok po kroku — od pierwszej reakcji po pełny obraz naprężeń.',
      audience: 'Znasz już siły i momenty? Wejdź od razu.',
      highlights: ['10 modułów', '70 lekcji', '23 laboratoria'],
      statusLabel: 'Pełny kurs',
      visual: 'beam',
      ctaLabel: 'Wejdź do wytrzymałości',
      crossSell: 'Naturalna kontynuacja po statyce.',
    },
  },
  {
    id: 'statyka',
    title: 'Statyka',
    shortTitle: 'Statyka',
    description:
      'Aksjomaty, układy sił, tarcie i środki ciężkości. Fundament, który procentuje w wytrzymałości materiałów.',
    eyebrow: 'Interaktywny kurs statyki',
    status: 'ready',
    theme: {
      accent: '#b4552d',
      accentHover: '#9a4423',
      accentStrong: '#7f381d',
      accentSoft: '#fbf0ea',
      highlight: '#2f6b4f',
      highlightSoft: '#e8f3ed',
      tint: '#fbf7f3',
    },
    moduleIds: [
      'statyka-aksjomaty',
      'statyka-plaskie-zbiezne',
      'statyka-plaskie-dowolne',
      'statyka-przestrzenny',
      'statyka-kratownice',
      'statyka-tarcie',
      'statyka-sily-wewnetrzne',
      'statyka-srodki-ciezkosci',
    ],
    syllabus: [
      {
        moduleId: 'statyka-aksjomaty',
        label: 'Aksjomaty statyki, rachunek wektorowy, więzy oraz moment siły względem punktu i prostej',
      },
      {
        moduleId: 'statyka-plaskie-zbiezne',
        label: 'Płaski zbieżny układ sił, analityczne warunki równowagi i równowaga trzech sił nierównoległych',
      },
      {
        moduleId: 'statyka-plaskie-dowolne',
        label: 'Redukcja płaskiego dowolnego układu sił, siły równoległe i warunki równowagi',
      },
      {
        moduleId: 'statyka-przestrzenny',
        label: 'Redukcja i równowaga przestrzennego dowolnego układu sił',
      },
      {
        moduleId: 'statyka-kratownice',
        label: 'Modele kratownic, pręty zerowe, metoda węzłów i Rittera oraz sztywność geometryczna',
      },
      {
        moduleId: 'statyka-tarcie',
        label: 'Tarcie i prawa tarcia w układach mechanicznych',
      },
      {
        moduleId: 'statyka-sily-wewnetrzne',
        label: 'Siły wewnętrzne w belkach i ramach',
      },
      {
        moduleId: 'statyka-srodki-ciezkosci',
        label: 'Środki ciężkości linii, figur płaskich i brył oraz twierdzenie Guldina',
      },
    ],
    tools: {
      training: true,
      exam: true,
      cheatsheet: true,
      syllabus: true,
      library: true,
    },
    marketing: {
      tagline: 'Najpierw równowaga. Potem wszystko inne.',
      headlineLead: 'Najpierw równowaga.',
      headlineAccent: 'Potem wszystko inne.',
      promise:
        'Zobacz, jak siły się równoważą, jak powstają reakcje i kiedy pojawia się tarcie. Fundament, bez którego wytrzymałość materiałów jest tylko zbiorem wzorów.',
      audience: 'Zaczynasz od zera? To dobry fundament.',
      highlights: ['8 modułów', '56 lekcji', '12 laboratoriów'],
      statusLabel: 'Pełny kurs',
      visual: 'truss',
      ctaLabel: 'Zobacz plan statyki',
      crossSell: 'Dobry fundament przed wytrzymałością.',
    },
  },
]
