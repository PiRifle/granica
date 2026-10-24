// Plik generowany przez scripts/generate-meta.mjs.
import type { LessonMeta } from '../model'

export const lessonMeta = [
  {
    "id": "axial-elongation",
    "moduleId": "axial",
    "number": 5,
    "title": "Wydłużenia i skrócenia prętów",
    "shortTitle": "Wydłużenia",
    "description": "Oblicz zmianę długości pręta i sumuj przemieszczenia kolejnych odcinków schodkowych.",
    "duration": 9,
    "eyebrow": "Sztywność całego pręta",
    "outcomes": [
      "W1 — analizuje odkształcalność prętów jednorodnych i złożonych",
      "W2 — odróżnia zmianę długości od samej wytrzymałości materiału",
      "W3 — uwzględnia długość i pole każdego odcinka",
      "U1 — oblicza i sumuje wydłużenia oraz skrócenia",
      "U2 — wiąże odkształcenia z jednoosiowym stanem naprężenia",
      "U3 — ocenia sztywność i przemieszczenia przy doborze przekroju"
    ],
    "solutionId": "cw2-1"
  },
  {
    "id": "axial-force-diagrams",
    "moduleId": "axial",
    "number": 2,
    "title": "Wykres siły osiowej N",
    "shortTitle": "Wykresy N",
    "description": "Wyznacz siłę osiową na kolejnych odcinkach i narysuj wykres zgodny z obciążeniami punktowymi.",
    "duration": 8,
    "eyebrow": "Jeden pręt, różne odcinki",
    "outcomes": [
      "W1 — analizuje przekroje pręta z różnymi obciążeniami osiowymi",
      "W2 — odczytuje strefy rozciągania i ściskania",
      "W3 — wiąże położenie sił z przebiegiem wykresu N",
      "U1 — wyznacza i rysuje wykres siły osiowej",
      "U2 — przygotowuje dane N do analizy naprężeń przekrojowych",
      "U3 — lokalizuje odcinki decydujące o wymiarowaniu"
    ],
    "solutionId": "cw1-3"
  },
  {
    "id": "axial-hooke-law",
    "moduleId": "axial",
    "number": 4,
    "title": "Prawo Hooke’a: proporcjonalne odkształcenie",
    "shortTitle": "Prawo Hooke’a",
    "description": "Połącz naprężenie, odkształcenie i moduł Younga w liniowo sprężystym zakresie pracy materiału.",
    "duration": 9,
    "eyebrow": "Materiał jako sprężyna",
    "outcomes": [
      "W1 — analizuje sprężystą odpowiedź elementu na obciążenie osiowe",
      "W2 — odróżnia zakres sprężysty od trwałego odkształcenia",
      "W3 — odnosi odkształcenie względne do długości początkowej",
      "U1 — oblicza σ, ε i E w zakresie liniowo sprężystym",
      "U2 — rozumie jednoosiowe σ i ε jako podstawę dalszej analizy Mohra",
      "U3 — uwzględnia sztywność materiału obok jego wytrzymałości"
    ]
  },
  {
    "id": "axial-normal-stress",
    "moduleId": "axial",
    "number": 1,
    "title": "Naprężenie normalne: siła na przekroju",
    "shortTitle": "Naprężenie σ",
    "description": "Oblicz średnie naprężenie osiowe i rozróżnij rozciąganie od ściskania za pomocą znaku.",
    "duration": 7,
    "eyebrow": "Od siły do intensywności",
    "outcomes": [
      "W1 — rozpoznaje osiowy sposób obciążenia pręta",
      "W2 — rozróżnia naprężenie rozciągające i ściskające",
      "W3 — wiąże pole przekroju z poziomem naprężenia",
      "U1 — oblicza naprężenie normalne z N/A",
      "U2 — opisuje jednoosiowy stan naprężenia dla koła Mohra",
      "U3 — porównuje naprężenie z wartością dopuszczalną"
    ]
  },
  {
    "id": "axial-stepped-bars",
    "moduleId": "axial",
    "number": 3,
    "title": "Pręty schodkowe: ta sama siła, inne σ",
    "shortTitle": "Pręty schodkowe",
    "description": "Analizuj odcinki o różnych przekrojach i wskaż miejsce największego naprężenia.",
    "duration": 8,
    "eyebrow": "Geometria zmienia obciążenie materiału",
    "outcomes": [
      "W1 — dzieli pręt schodkowy na jednorodne odcinki obliczeniowe",
      "W2 — rozpoznaje rozciąganie i ściskanie na kolejnych odcinkach",
      "W3 — ocenia wpływ zmiany pola na naprężenia nominalne",
      "U1 — oblicza naprężenia i wskazuje przekrój decydujący",
      "U2 — opisuje stan naprężenia osobno dla każdego odcinka",
      "U3 — dobiera najsłabszy odcinek z zachowaniem bezpieczeństwa"
    ],
    "solutionId": "cw1-2"
  },
  {
    "id": "axial-stiffness-condition",
    "moduleId": "axial",
    "number": 7,
    "title": "Warunek sztywności: bezpiecznie i bez nadmiernych ruchów",
    "shortTitle": "Sztywność",
    "description": "Ogranicz wydłużenie pręta i wybierz przekrój spełniający jednocześnie oba warunki projektowe.",
    "duration": 10,
    "eyebrow": "Niezłamany to nie zawsze użyteczny",
    "outcomes": [
      "W1 — analizuje użyteczność elementu pod kątem przemieszczeń",
      "W2 — odróżnia warunek wytrzymałości od warunku sztywności",
      "W3 — dobiera geometrię ograniczającą zmianę długości",
      "U1 — oblicza pole wymagane przez dopuszczalne wydłużenie",
      "U2 — łączy naprężenie i odkształcenie w pełnej ocenie stanu osiowego",
      "U3 — wybiera przekrój decydujący z dwóch warunków i podaje zapasy"
    ]
  },
  {
    "id": "axial-strength-condition",
    "moduleId": "axial",
    "number": 6,
    "title": "Warunek wytrzymałości i zapas bezpieczeństwa",
    "shortTitle": "Wytrzymałość",
    "description": "Dobierz przekrój tak, aby maksymalne naprężenie nie przekroczyło wartości dopuszczalnej.",
    "duration": 9,
    "eyebrow": "Nie projektuj na granicy zniszczenia",
    "outcomes": [
      "W1 — wskazuje przekroje krytyczne elementu osiowo obciążonego",
      "W2 — rozróżnia zniszczenie materiału od nadmiernego odkształcenia",
      "W3 — dobiera pole przekroju na podstawie maksymalnego naprężenia",
      "U1 — oblicza naprężenie dopuszczalne i wymagane pole",
      "U2 — interpretuje jednoosiowe naprężenie graniczne i jego zapas",
      "U3 — dobiera przekrój z zachowaniem wymaganego bezpieczeństwa"
    ]
  },
  {
    "id": "bending-beams-reactions",
    "moduleId": "bending",
    "number": 1,
    "title": "Belki i reakcje podporowe",
    "shortTitle": "Belki i reakcje",
    "description": "Zbuduj schemat statyczny i wyznacz reakcje z równowagi sił oraz momentów.",
    "duration": 7,
    "eyebrow": "Najpierw cała belka",
    "outcomes": [
      "W1 — analizuje schematy belek, podpory i wewnętrzne siły przekrojowe",
      "W2 — rozróżnia przypadki obciążenia oraz czyste zginanie i zginanie z udziałem siły tnącej",
      "W3 — wyjaśnia wpływ geometrii przekroju na rozkład naprężeń i ugięcie",
      "U1 — oblicza reakcje, funkcje T(x) i M(x) oraz naprężenia zginające",
      "U2 — wykorzystuje koło Mohra do analizy stanu naprężenia w zginanym elemencie",
      "U3 — dobiera przekrój belki z warunków bezpieczeństwa, wytrzymałości i sztywności"
    ]
  },
  {
    "id": "bending-moment-diagram",
    "moduleId": "bending",
    "number": 3,
    "title": "Moment zginający M(x)",
    "shortTitle": "Moment zginający",
    "description": "Wyznaczaj moment z równowagi odciętej części i znajduj jego ekstrema za pomocą T.",
    "duration": 8,
    "eyebrow": "Pole pod T buduje M",
    "outcomes": [
      "W1 — analizuje schematy belek, podpory i wewnętrzne siły przekrojowe",
      "W2 — rozróżnia przypadki obciążenia oraz czyste zginanie i zginanie z udziałem siły tnącej",
      "W3 — wyjaśnia wpływ geometrii przekroju na rozkład naprężeń i ugięcie",
      "U1 — oblicza reakcje, funkcje T(x) i M(x) oraz naprężenia zginające",
      "U2 — wykorzystuje koło Mohra do analizy stanu naprężenia w zginanym elemencie",
      "U3 — dobiera przekrój belki z warunków bezpieczeństwa, wytrzymałości i sztywności"
    ]
  },
  {
    "id": "bending-pure",
    "moduleId": "bending",
    "number": 5,
    "title": "Czyste zginanie",
    "shortTitle": "Czyste zginanie",
    "description": "Wydziel przypadek, w którym przekrój przenosi moment, ale nie przenosi siły tnącej.",
    "duration": 9,
    "eyebrow": "Moment bez ścinania",
    "outcomes": [
      "W1 — analizuje schematy belek, podpory i wewnętrzne siły przekrojowe",
      "W2 — rozróżnia przypadki obciążenia oraz czyste zginanie i zginanie z udziałem siły tnącej",
      "W3 — wyjaśnia wpływ geometrii przekroju na rozkład naprężeń i ugięcie",
      "U1 — oblicza reakcje, funkcje T(x) i M(x) oraz naprężenia zginające",
      "U2 — wykorzystuje koło Mohra do analizy stanu naprężenia w zginanym elemencie",
      "U3 — dobiera przekrój belki z warunków bezpieczeństwa, wytrzymałości i sztywności"
    ]
  },
  {
    "id": "bending-q-t-m",
    "moduleId": "bending",
    "number": 4,
    "title": "Zależności q–T–M",
    "shortTitle": "Zależności q–T–M",
    "description": "Przewiduj kształt wykresów bez liczenia każdego punktu: q jest nachyleniem T, a T nachyleniem M.",
    "duration": 9,
    "eyebrow": "Trzy wykresy, jedna historia",
    "outcomes": [
      "W1 — analizuje schematy belek, podpory i wewnętrzne siły przekrojowe",
      "W2 — rozróżnia przypadki obciążenia oraz czyste zginanie i zginanie z udziałem siły tnącej",
      "W3 — wyjaśnia wpływ geometrii przekroju na rozkład naprężeń i ugięcie",
      "U1 — oblicza reakcje, funkcje T(x) i M(x) oraz naprężenia zginające",
      "U2 — wykorzystuje koło Mohra do analizy stanu naprężenia w zginanym elemencie",
      "U3 — dobiera przekrój belki z warunków bezpieczeństwa, wytrzymałości i sztywności"
    ]
  },
  {
    "id": "bending-section-stiffness-design",
    "moduleId": "bending",
    "number": 7,
    "title": "Dobór przekroju i kontrola sztywności",
    "shortTitle": "Dobór przekroju",
    "description": "Dobierz przekrój na moment zginający, a następnie sprawdź dopuszczalne ugięcie belki.",
    "duration": 10,
    "eyebrow": "Wytrzymała, ale czy dostatecznie sztywna?",
    "outcomes": [
      "W1 — analizuje schematy belek, podpory i wewnętrzne siły przekrojowe",
      "W2 — rozróżnia przypadki obciążenia oraz czyste zginanie i zginanie z udziałem siły tnącej",
      "W3 — wyjaśnia wpływ geometrii przekroju na rozkład naprężeń i ugięcie",
      "U1 — oblicza reakcje, funkcje T(x) i M(x) oraz naprężenia zginające",
      "U2 — wykorzystuje koło Mohra do analizy stanu naprężenia w zginanym elemencie",
      "U3 — dobiera przekrój belki z warunków bezpieczeństwa, wytrzymałości i sztywności"
    ],
    "solutionId": "cw9-1"
  },
  {
    "id": "bending-shear-force",
    "moduleId": "bending",
    "number": 2,
    "title": "Siła tnąca T(x)",
    "shortTitle": "Siła tnąca",
    "description": "Czytaj skoki i odcinki wykresu siły tnącej jako zapis równowagi odciętej części belki.",
    "duration": 8,
    "eyebrow": "Przetnij i zrównoważ",
    "outcomes": [
      "W1 — analizuje schematy belek, podpory i wewnętrzne siły przekrojowe",
      "W2 — rozróżnia przypadki obciążenia oraz czyste zginanie i zginanie z udziałem siły tnącej",
      "W3 — wyjaśnia wpływ geometrii przekroju na rozkład naprężeń i ugięcie",
      "U1 — oblicza reakcje, funkcje T(x) i M(x) oraz naprężenia zginające",
      "U2 — wykorzystuje koło Mohra do analizy stanu naprężenia w zginanym elemencie",
      "U3 — dobiera przekrój belki z warunków bezpieczeństwa, wytrzymałości i sztywności"
    ]
  },
  {
    "id": "bending-stress-neutral-axis",
    "moduleId": "bending",
    "number": 6,
    "title": "Rozkład σ i oś obojętna",
    "shortTitle": "Naprężenia zginające",
    "description": "Zobacz, dlaczego naprężenie rośnie liniowo z odległością od osi obojętnej i gdzie przekrój pracuje najmocniej.",
    "duration": 9,
    "eyebrow": "Od ściskania do rozciągania",
    "outcomes": [
      "W1 — analizuje schematy belek, podpory i wewnętrzne siły przekrojowe",
      "W2 — rozróżnia przypadki obciążenia oraz czyste zginanie i zginanie z udziałem siły tnącej",
      "W3 — wyjaśnia wpływ geometrii przekroju na rozkład naprężeń i ugięcie",
      "U1 — oblicza reakcje, funkcje T(x) i M(x) oraz naprężenia zginające",
      "U2 — wykorzystuje koło Mohra do analizy stanu naprężenia w zginanym elemencie",
      "U3 — dobiera przekrój belki z warunków bezpieczeństwa, wytrzymałości i sztywności"
    ]
  },
  {
    "id": "criteria-combined-loading",
    "moduleId": "criteria",
    "number": 6,
    "title": "Zginanie, skręcanie i siła osiowa razem",
    "shortTitle": "Obciążenia złożone",
    "description": "Zsumuj naprężenia normalne we właściwym punkcie przekroju, dodaj ścinanie od skręcania i zastosuj HMH lub Tresca.",
    "duration": 9,
    "eyebrow": "Najpierw składowe, potem redukcja",
    "outcomes": [
      "W1 — analizuję element konstrukcji i wskazuję przekrój oraz punkt decydujący o bezpieczeństwie.",
      "W2 — rozróżniam przypadki wytrzymałościowe i dobieram hipotezę do materiału oraz stanu naprężenia.",
      "W3 — uwzględniam geometrię przekroju przy wyznaczaniu naprężeń normalnych i stycznych.",
      "U1 — obliczam naprężenie zredukowane i sprawdzam warunek wytrzymałości z zachowaniem jednostek.",
      "U2 — stosuję koło Mohra do wyznaczenia naprężeń głównych i maksymalnego naprężenia stycznego.",
      "U3 — wyznaczam współczynnik bezpieczeństwa i oceniam, czy element spełnia przyjęty warunek."
    ]
  },
  {
    "id": "criteria-comparison",
    "moduleId": "criteria",
    "number": 5,
    "title": "HMH czy Tresca? Porównanie hipotez",
    "shortTitle": "Porównanie hipotez",
    "description": "Porównuj wyniki dla tego samego stanu naprężenia i świadomie oceniaj zapas, zamiast wybierać hipotezę przypadkowo.",
    "duration": 9,
    "eyebrow": "Ten sam stan, różne modele",
    "outcomes": [
      "W1 — analizuję element konstrukcji i wskazuję przekrój oraz punkt decydujący o bezpieczeństwie.",
      "W2 — rozróżniam przypadki wytrzymałościowe i dobieram hipotezę do materiału oraz stanu naprężenia.",
      "W3 — uwzględniam geometrię przekroju przy wyznaczaniu naprężeń normalnych i stycznych.",
      "U1 — obliczam naprężenie zredukowane i sprawdzam warunek wytrzymałości z zachowaniem jednostek.",
      "U2 — stosuję koło Mohra do wyznaczenia naprężeń głównych i maksymalnego naprężenia stycznego.",
      "U3 — wyznaczam współczynnik bezpieczeństwa i oceniam, czy element spełnia przyjęty warunek."
    ]
  },
  {
    "id": "criteria-hmh",
    "moduleId": "criteria",
    "number": 3,
    "title": "Hipoteza HMH: energia zmiany postaci",
    "shortTitle": "HMH",
    "description": "Poznaj hipotezę Hubera–Misesa–Hencky’ego i obliczaj wytężenie materiałów plastycznych bez błędów w potęgach.",
    "duration": 8,
    "eyebrow": "Energia odkształcenia postaciowego",
    "outcomes": [
      "W1 — analizuję element konstrukcji i wskazuję przekrój oraz punkt decydujący o bezpieczeństwie.",
      "W2 — rozróżniam przypadki wytrzymałościowe i dobieram hipotezę do materiału oraz stanu naprężenia.",
      "W3 — uwzględniam geometrię przekroju przy wyznaczaniu naprężeń normalnych i stycznych.",
      "U1 — obliczam naprężenie zredukowane i sprawdzam warunek wytrzymałości z zachowaniem jednostek.",
      "U2 — stosuję koło Mohra do wyznaczenia naprężeń głównych i maksymalnego naprężenia stycznego.",
      "U3 — wyznaczam współczynnik bezpieczeństwa i oceniam, czy element spełnia przyjęty warunek."
    ]
  },
  {
    "id": "criteria-max-normal",
    "moduleId": "criteria",
    "number": 2,
    "title": "Hipoteza największego naprężenia normalnego",
    "shortTitle": "Maksimum normalne",
    "description": "Sprawdź, kiedy o zniszczeniu decyduje skrajne naprężenie główne i dlaczego trzeba zachować jego znak.",
    "duration": 8,
    "eyebrow": "Najpierw kierunki główne",
    "outcomes": [
      "W1 — analizuję element konstrukcji i wskazuję przekrój oraz punkt decydujący o bezpieczeństwie.",
      "W2 — rozróżniam przypadki wytrzymałościowe i dobieram hipotezę do materiału oraz stanu naprężenia.",
      "W3 — uwzględniam geometrię przekroju przy wyznaczaniu naprężeń normalnych i stycznych.",
      "U1 — obliczam naprężenie zredukowane i sprawdzam warunek wytrzymałości z zachowaniem jednostek.",
      "U2 — stosuję koło Mohra do wyznaczenia naprężeń głównych i maksymalnego naprężenia stycznego.",
      "U3 — wyznaczam współczynnik bezpieczeństwa i oceniam, czy element spełnia przyjęty warunek."
    ]
  },
  {
    "id": "criteria-reduced-stress",
    "moduleId": "criteria",
    "number": 1,
    "title": "Naprężenie zredukowane: jedna liczba dla złożonego stanu",
    "shortTitle": "Naprężenie zredukowane",
    "description": "Zrozum, po co zastępować kilka składowych naprężenia jedną wartością porównywaną z wytrzymałością materiału.",
    "duration": 7,
    "eyebrow": "Wspólna miara wytężenia",
    "outcomes": [
      "W1 — analizuję element konstrukcji i wskazuję przekrój oraz punkt decydujący o bezpieczeństwie.",
      "W2 — rozróżniam przypadki wytrzymałościowe i dobieram hipotezę do materiału oraz stanu naprężenia.",
      "W3 — uwzględniam geometrię przekroju przy wyznaczaniu naprężeń normalnych i stycznych.",
      "U1 — obliczam naprężenie zredukowane i sprawdzam warunek wytrzymałości z zachowaniem jednostek.",
      "U2 — stosuję koło Mohra do wyznaczenia naprężeń głównych i maksymalnego naprężenia stycznego.",
      "U3 — wyznaczam współczynnik bezpieczeństwa i oceniam, czy element spełnia przyjęty warunek."
    ]
  },
  {
    "id": "criteria-safety-factor",
    "moduleId": "criteria",
    "number": 7,
    "title": "Współczynnik bezpieczeństwa: ile zapasu ma element?",
    "shortTitle": "Współczynnik n",
    "description": "Rozróżniaj wytrzymałość od sztywności, obliczaj rzeczywisty zapas i wyznaczaj naprężenie dopuszczalne.",
    "duration": 10,
    "eyebrow": "Bezpieczeństwo to warunek",
    "outcomes": [
      "W1 — analizuję element konstrukcji i wskazuję przekrój oraz punkt decydujący o bezpieczeństwie.",
      "W2 — rozróżniam przypadki wytrzymałościowe i dobieram hipotezę do materiału oraz stanu naprężenia.",
      "W3 — uwzględniam geometrię przekroju przy wyznaczaniu naprężeń normalnych i stycznych.",
      "U1 — obliczam naprężenie zredukowane i sprawdzam warunek wytrzymałości z zachowaniem jednostek.",
      "U2 — stosuję koło Mohra do wyznaczenia naprężeń głównych i maksymalnego naprężenia stycznego.",
      "U3 — wyznaczam współczynnik bezpieczeństwa i oceniam, czy element spełnia przyjęty warunek."
    ]
  },
  {
    "id": "criteria-tresca",
    "moduleId": "criteria",
    "number": 4,
    "title": "Hipoteza Tresca: największe ścinanie",
    "shortTitle": "Tresca",
    "description": "Wyznaczaj wytężenie z różnicy skrajnych naprężeń głównych i unikaj pomijania trzeciego kierunku.",
    "duration": 9,
    "eyebrow": "Różnica skrajnych naprężeń",
    "outcomes": [
      "W1 — analizuję element konstrukcji i wskazuję przekrój oraz punkt decydujący o bezpieczeństwie.",
      "W2 — rozróżniam przypadki wytrzymałościowe i dobieram hipotezę do materiału oraz stanu naprężenia.",
      "W3 — uwzględniam geometrię przekroju przy wyznaczaniu naprężeń normalnych i stycznych.",
      "U1 — obliczam naprężenie zredukowane i sprawdzam warunek wytrzymałości z zachowaniem jednostek.",
      "U2 — stosuję koło Mohra do wyznaczenia naprężeń głównych i maksymalnego naprężenia stycznego.",
      "U3 — wyznaczam współczynnik bezpieczeństwa i oceniam, czy element spełnia przyjęty warunek."
    ]
  },
  {
    "id": "design-full-axial",
    "moduleId": "design",
    "number": 3,
    "title": "Pełne zadanie: pręt osiowo obciążony",
    "shortTitle": "Zadanie: pręt",
    "description": "Przejdź od schematu i sił wewnętrznych przez naprężenia do doboru przekroju i kontroli wydłużenia.",
    "duration": 8,
    "eyebrow": "Pełne rozwiązanie 1",
    "outcomes": [
      "W1 — analizuję schemat elementu, obciążenia i warunki podparcia przed rozpoczęciem obliczeń.",
      "W2 — rozpoznaję równoczesne przypadki wytrzymałościowe i warunek decydujący o wymiarze.",
      "W3 — dobieram wymiary i wskaźniki przekroju, uwzględniając jego kształt oraz sztywność.",
      "U1 — wykonuję pełne obliczenia wymiaru, obciążenia dopuszczalnego i zapasu wytrzymałości.",
      "U2 — wykorzystuję koło Mohra do kontroli stanu naprężenia w obciążeniach złożonych.",
      "U3 — dobieram materiał i przekrój z wymaganym bezpieczeństwem oraz sprawdzam warunek sztywności."
    ],
    "solutionId": "cw1-1"
  },
  {
    "id": "design-full-bending",
    "moduleId": "design",
    "number": 5,
    "title": "Pełne zadanie: dobór belki na zginanie",
    "shortTitle": "Zadanie: belka",
    "description": "Wyznacz reakcje i moment maksymalny, dobierz przekrój, a potem wykonaj kontrolę ugięcia.",
    "duration": 9,
    "eyebrow": "Pełne rozwiązanie 3",
    "outcomes": [
      "W1 — analizuję schemat elementu, obciążenia i warunki podparcia przed rozpoczęciem obliczeń.",
      "W2 — rozpoznaję równoczesne przypadki wytrzymałościowe i warunek decydujący o wymiarze.",
      "W3 — dobieram wymiary i wskaźniki przekroju, uwzględniając jego kształt oraz sztywność.",
      "U1 — wykonuję pełne obliczenia wymiaru, obciążenia dopuszczalnego i zapasu wytrzymałości.",
      "U2 — wykorzystuję koło Mohra do kontroli stanu naprężenia w obciążeniach złożonych.",
      "U3 — dobieram materiał i przekrój z wymaganym bezpieczeństwem oraz sprawdzam warunek sztywności."
    ],
    "solutionId": "cw5-1"
  },
  {
    "id": "design-full-thermal",
    "moduleId": "design",
    "number": 4,
    "title": "Pełne zadanie: obciążenie mechaniczne i temperatura",
    "shortTitle": "Zadanie: temperatura",
    "description": "Łącz równowagę, zgodność odkształceń i prawo Hooke’a w pręcie zablokowanym oraz sprawdzaj zapas.",
    "duration": 9,
    "eyebrow": "Pełne rozwiązanie 2",
    "outcomes": [
      "W1 — analizuję schemat elementu, obciążenia i warunki podparcia przed rozpoczęciem obliczeń.",
      "W2 — rozpoznaję równoczesne przypadki wytrzymałościowe i warunek decydujący o wymiarze.",
      "W3 — dobieram wymiary i wskaźniki przekroju, uwzględniając jego kształt oraz sztywność.",
      "U1 — wykonuję pełne obliczenia wymiaru, obciążenia dopuszczalnego i zapasu wytrzymałości.",
      "U2 — wykorzystuję koło Mohra do kontroli stanu naprężenia w obciążeniach złożonych.",
      "U3 — dobieram materiał i przekrój z wymaganym bezpieczeństwem oraz sprawdzam warunek sztywności."
    ],
    "solutionId": "cw2-1"
  },
  {
    "id": "design-full-torsion",
    "moduleId": "design",
    "number": 6,
    "title": "Pełne zadanie: wał pełny i drążony",
    "shortTitle": "Zadanie: wał",
    "description": "Dobieraj wał z warunków naprężenia i kąta skręcenia oraz porównuj wpływ średnicy zewnętrznej i wewnętrznej.",
    "duration": 9,
    "eyebrow": "Pełne rozwiązanie 4",
    "outcomes": [
      "W1 — analizuję schemat elementu, obciążenia i warunki podparcia przed rozpoczęciem obliczeń.",
      "W2 — rozpoznaję równoczesne przypadki wytrzymałościowe i warunek decydujący o wymiarze.",
      "W3 — dobieram wymiary i wskaźniki przekroju, uwzględniając jego kształt oraz sztywność.",
      "U1 — wykonuję pełne obliczenia wymiaru, obciążenia dopuszczalnego i zapasu wytrzymałości.",
      "U2 — wykorzystuję koło Mohra do kontroli stanu naprężenia w obciążeniach złożonych.",
      "U3 — dobieram materiał i przekrój z wymaganym bezpieczeństwem oraz sprawdzam warunek sztywności."
    ],
    "solutionId": "cw7-1"
  },
  {
    "id": "design-material-load",
    "moduleId": "design",
    "number": 2,
    "title": "Dobór materiału i obciążenia dopuszczalnego",
    "shortTitle": "Materiał i P dopuszczalne",
    "description": "Porównuj wymaganą wytrzymałość z danymi materiału, wyznaczaj Pdop i pamiętaj o osobnym warunku sztywności.",
    "duration": 8,
    "eyebrow": "Dwie strony nierówności",
    "outcomes": [
      "W1 — analizuję schemat elementu, obciążenia i warunki podparcia przed rozpoczęciem obliczeń.",
      "W2 — rozpoznaję równoczesne przypadki wytrzymałościowe i warunek decydujący o wymiarze.",
      "W3 — dobieram wymiary i wskaźniki przekroju, uwzględniając jego kształt oraz sztywność.",
      "U1 — wykonuję pełne obliczenia wymiaru, obciążenia dopuszczalnego i zapasu wytrzymałości.",
      "U2 — wykorzystuję koło Mohra do kontroli stanu naprężenia w obciążeniach złożonych.",
      "U3 — dobieram materiał i przekrój z wymaganym bezpieczeństwem oraz sprawdzam warunek sztywności."
    ]
  },
  {
    "id": "design-review-exam",
    "moduleId": "design",
    "number": 7,
    "title": "Powtórka mieszana i strategia kolokwium",
    "shortTitle": "Błędy i strategia",
    "description": "Ćwicz rozpoznawanie modelu, pilnuj jednostek i kończ zadanie kontrolą wyniku oraz wszystkich warunków projektowych.",
    "duration": 10,
    "eyebrow": "Pełna powtórka",
    "outcomes": [
      "W1 — analizuję schemat elementu, obciążenia i warunki podparcia przed rozpoczęciem obliczeń.",
      "W2 — rozpoznaję równoczesne przypadki wytrzymałościowe i warunek decydujący o wymiarze.",
      "W3 — dobieram wymiary i wskaźniki przekroju, uwzględniając jego kształt oraz sztywność.",
      "U1 — wykonuję pełne obliczenia wymiaru, obciążenia dopuszczalnego i zapasu wytrzymałości.",
      "U2 — wykorzystuję koło Mohra do kontroli stanu naprężenia w obciążeniach złożonych.",
      "U3 — dobieram materiał i przekrój z wymaganym bezpieczeństwem oraz sprawdzam warunek sztywności."
    ],
    "solutionId": "cw9-1"
  },
  {
    "id": "design-section-dimension",
    "moduleId": "design",
    "number": 1,
    "title": "Dobór wymiaru z warunku wytrzymałości",
    "shortTitle": "Dobór wymiaru",
    "description": "Odwracaj warunek naprężeniowy, wyznaczaj wymagany wskaźnik przekroju i dobieraj średnicę z poprawną potęgą.",
    "duration": 7,
    "eyebrow": "Od warunku do wymiaru",
    "outcomes": [
      "W1 — analizuję schemat elementu, obciążenia i warunki podparcia przed rozpoczęciem obliczeń.",
      "W2 — rozpoznaję równoczesne przypadki wytrzymałościowe i warunek decydujący o wymiarze.",
      "W3 — dobieram wymiary i wskaźniki przekroju, uwzględniając jego kształt oraz sztywność.",
      "U1 — wykonuję pełne obliczenia wymiaru, obciążenia dopuszczalnego i zapasu wytrzymałości.",
      "U2 — wykorzystuję koło Mohra do kontroli stanu naprężenia w obciążeniach złożonych.",
      "U3 — dobieram materiał i przekrój z wymaganym bezpieczeństwem oraz sprawdzam warunek sztywności."
    ]
  },
  {
    "id": "foundations-equilibrium",
    "moduleId": "foundations",
    "number": 5,
    "title": "Równowaga statyczna: trzy równania",
    "shortTitle": "Równowaga",
    "description": "Wyznacz reakcje płaskiego układu za pomocą równowagi sił i momentów.",
    "duration": 9,
    "eyebrow": "Spoczynek ma swoją matematykę",
    "outcomes": [
      "W1 — analizuje równowagę odizolowanego elementu",
      "W2 — rozróżnia obciążenia zewnętrzne i reakcje w równaniach",
      "W3 — wykorzystuje ramiona sił wynikające z geometrii",
      "U1 — wyznacza reakcje z równowagi sił i momentów",
      "U2 — sprawdza zgodność znaków potrzebną w dalszej analizie naprężeń",
      "U3 — ustala obciążenia obliczeniowe przed doborem przekroju"
    ]
  },
  {
    "id": "foundations-idealized-models",
    "moduleId": "foundations",
    "number": 2,
    "title": "Model obliczeniowy: świadome uproszczenia",
    "shortTitle": "Modele",
    "description": "Przejdź od rzeczywistego pręta do schematu, zachowując cechy istotne dla badanego zagadnienia.",
    "duration": 8,
    "eyebrow": "Uprość, ale nie zgub istoty",
    "outcomes": [
      "W1 — wybiera uproszczenia właściwe dla analizowanego elementu",
      "W2 — odróżnia model równowagi od modelu odkształcalnego",
      "W3 — zachowuje istotne cechy geometrii i rozkładu obciążenia",
      "U1 — zastępuje obciążenie rozłożone statycznie równoważną wypadkową",
      "U2 — ocenia zakres stosowalności uproszczonego opisu naprężeń",
      "U3 — przygotowuje poprawny model do doboru nośności i sztywności"
    ]
  },
  {
    "id": "foundations-load-types",
    "moduleId": "foundations",
    "number": 3,
    "title": "Obciążenia: siła, rozkład i moment",
    "shortTitle": "Obciążenia",
    "description": "Rozpoznaj sposób działania obciążenia i zapisz jego wartość, kierunek oraz miejsce przyłożenia.",
    "duration": 8,
    "eyebrow": "Co działa na element?",
    "outcomes": [
      "W1 — identyfikuje zewnętrzne oddziaływania na element konstrukcji",
      "W2 — rozróżnia obciążenia powodujące różne przypadki wytrzymałościowe",
      "W3 — uwzględnia ciężar własny zależny od pola i długości",
      "U1 — oblicza wypadkowe obciążeń skupionych i rozłożonych",
      "U2 — rozróżnia dane wejściowe potrzebne do późniejszej analizy naprężeń",
      "U3 — zestawia obciążenia potrzebne do bezpiecznego i sztywnego doboru"
    ]
  },
  {
    "id": "foundations-method-of-sections",
    "moduleId": "foundations",
    "number": 6,
    "title": "Metoda przekrojów: zajrzyj do środka",
    "shortTitle": "Metoda przekrojów",
    "description": "Przetnij myślowo element, zachowaj równowagę jednej części i wyznacz siły wewnętrzne.",
    "duration": 9,
    "eyebrow": "Równowaga każdej części",
    "outcomes": [
      "W1 — analizuje przekrój jako granicę oddziaływań między częściami",
      "W2 — rozróżnia rozciąganie, ścinanie i zginanie",
      "W3 — lokalizuje przekrój i siły względem osi elementu",
      "U1 — wyznacza N, V i M z równowagi odciętej części",
      "U2 — przygotowuje siły przekrojowe do analizy stanu naprężenia",
      "U3 — wskazuje przekroje potrzebne do sprawdzenia nośności"
    ]
  },
  {
    "id": "foundations-saint-venant",
    "moduleId": "foundations",
    "number": 7,
    "title": "Zasada Saint-Venanta: dystans od detalu",
    "shortTitle": "Saint-Venant",
    "description": "Oceń, kiedy lokalny sposób przyłożenia siły przestaje decydować o rozkładzie naprężeń.",
    "duration": 10,
    "eyebrow": "Lokalnie skomplikowanie, dalej prościej",
    "outcomes": [
      "W1 — ocenia zasięg uproszczeń modelu elementu",
      "W2 — rozróżnia średnie naprężenie osiowe od lokalnej koncentracji",
      "W3 — wiąże rozmiar przekroju i detal mocowania ze strefą zaburzeń",
      "U1 — oblicza naprężenie średnie poza strefą lokalną",
      "U2 — wskazuje ograniczenia uproszczonego opisu stanu naprężenia",
      "U3 — wybiera przekroje, w których prosty dobór jest zasadny"
    ]
  },
  {
    "id": "foundations-si-units",
    "moduleId": "foundations",
    "number": 1,
    "title": "Jednostki SI: wspólny język obliczeń",
    "shortTitle": "Jednostki SI",
    "description": "Łącz niutony, milimetry i megapaskale bez zgadywania oraz kontroluj wynik przez analizę jednostek.",
    "duration": 7,
    "eyebrow": "Najpierw uporządkuj dane",
    "outcomes": [
      "W1 — rozróżnia wielkości fizyczne opisujące element i jego obciążenie",
      "W2 — podaje jednostki siły, naprężenia i odkształcenia",
      "W3 — stosuje jednostki długości i pola przy opisie geometrii",
      "U1 — przelicza jednostki i sprawdza poprawność wzorów",
      "U2 — zapisuje naprężenia w jednostkach używanych przy kole Mohra",
      "U3 — unika błędów jednostkowych przy doborze nośności i sztywności"
    ]
  },
  {
    "id": "foundations-supports-reactions",
    "moduleId": "foundations",
    "number": 4,
    "title": "Podpory i reakcje: jak konstrukcja odpowiada",
    "shortTitle": "Podpory",
    "description": "Dobierz schemat podparcia i określ, które ruchy lub obroty ogranicza każda podpora.",
    "duration": 9,
    "eyebrow": "Najpierw swobody, potem reakcje",
    "outcomes": [
      "W1 — rozpoznaje ograniczenia ruchu w modelach podpór",
      "W2 — wiąże sposób podparcia z przenoszonymi obciążeniami",
      "W3 — uwzględnia położenie podpór względem geometrii elementu",
      "U1 — przewiduje liczbę i kierunki składowych reakcji",
      "U2 — oddziela reakcje siłowe od informacji o stanie naprężenia",
      "U3 — tworzy poprawny model wejściowy do wymiarowania"
    ]
  },
  {
    "id": "m3-allowable-safety-factor",
    "moduleId": "material",
    "number": 6,
    "title": "Naprężenie dopuszczalne i współczynnik bezpieczeństwa",
    "shortTitle": "Zapas bezpieczeństwa",
    "description": "Jak przejść od granicy materiału do naprężenia dopuszczalnego i jak sprawdzić nośność bez projektowania „na granicy zniszczenia”.",
    "duration": 9,
    "eyebrow": "Zostawiamy zapas",
    "outcomes": [
      "W1 — analizuje obciążenie graniczne i robocze elementu",
      "W2 — wybiera właściwy przypadek graniczny dla materiału",
      "W3 — wiąże wymagane pole przekroju z naprężeniem dopuszczalnym",
      "U1 — oblicza naprężenia dopuszczalne, siły graniczne i pola",
      "U2 — porównuje obliczone naprężenie osiowe z warunkiem wytrzymałościowym",
      "U3 — dobiera przekrój z zachowaniem wymaganego bezpieczeństwa"
    ]
  },
  {
    "id": "m3-hooke-stiffness",
    "moduleId": "material",
    "number": 3,
    "title": "Prawo Hooke’a i sztywność osiowa",
    "shortTitle": "Sprężystość",
    "description": "Liniowa zależność w zakresie sprężystym oraz wpływ materiału, pola i długości na wydłużenie pręta.",
    "duration": 8,
    "eyebrow": "Ile przesunie się element?",
    "outcomes": [
      "W1 — analizuje sprężystą odpowiedź pręta na siłę osiową",
      "W2 — rozpoznaje granice stosowalności prawa Hooke’a",
      "W3 — rozróżnia własność materiału E od sztywności całego pręta EA/L",
      "U1 — oblicza naprężenia, odkształcenia i wydłużenia",
      "U2 — rozumie odkształcenia osiowe potrzebne do analizy koła Mohra",
      "U3 — kontroluje element zarówno ze względu na wytrzymałość, jak i sztywność"
    ]
  },
  {
    "id": "m3-self-weight",
    "moduleId": "material",
    "number": 4,
    "title": "Ciężar własny elementu",
    "shortTitle": "Ciężar własny",
    "description": "Obliczanie masy, ciężaru i obciążenia liniowego oraz naprężenia wywołanego własnym ciężarem pręta.",
    "duration": 9,
    "eyebrow": "Konstrukcja też coś waży",
    "outcomes": [
      "W1 — analizuje rozkład siły wewnętrznej wywołanej ciężarem własnym",
      "W2 — rozpoznaje osiowy przypadek obciążenia objętościowego",
      "W3 — wyjaśnia wpływ pola przekroju na ciężar i nośność",
      "U1 — oblicza masę, ciężar, obciążenie liniowe i naprężenie",
      "U2 — wyznacza naprężenie osiowe do dalszej analizy stanu naprężenia",
      "U3 — uwzględnia ciężar własny w bezpiecznym doborze elementu"
    ]
  },
  {
    "id": "m3-strength-elasticity-plasticity",
    "moduleId": "material",
    "number": 2,
    "title": "Re, Rm, sprężystość i plastyczność",
    "shortTitle": "Granice materiału",
    "description": "Znaczenie granicy plastyczności, wytrzymałości na rozciąganie oraz różnicy między odkształceniem znikającym a trwałym.",
    "duration": 8,
    "eyebrow": "Czytamy krzywą materiału",
    "outcomes": [
      "W1 — wiąże punkty wykresu próby z zachowaniem elementu",
      "W2 — rozróżnia granicę plastyczności, wytrzymałość i zniszczenie",
      "W3 — rozumie znaczenie początkowego pola przekroju w oznaczaniu granic",
      "U1 — oblicza siły graniczne z Rₑ, Rₘ i pola przekroju",
      "U2 — rozpoznaje stan osiowy jako podstawę późniejszej interpretacji Mohra",
      "U3 — wybiera właściwą granicę materiału do oceny bezpieczeństwa"
    ]
  },
  {
    "id": "m3-strength-stiffness-design",
    "moduleId": "material",
    "number": 7,
    "title": "Dobór ze względu na wytrzymałość i sztywność",
    "shortTitle": "Dwa warunki doboru",
    "description": "Łączenie warunków naprężeniowego i przemieszczeniowego oraz rozpoznawanie, który z nich decyduje o wymiarze.",
    "duration": 10,
    "eyebrow": "Nie wystarczy, że nie pęknie",
    "outcomes": [
      "W1 — analizuje element pod kątem kilku jednoczesnych wymagań",
      "W2 — rozróżnia zniszczenie od nadmiernej deformacji",
      "W3 — dobiera geometrię przekroju na podstawie warunku decydującego",
      "U1 — wykonuje kompletne obliczenia naprężeniowe i sztywnościowe",
      "U2 — interpretuje obliczony stan osiowy jako punkt wyjścia do analizy Mohra",
      "U3 — dobiera element z uwagi na bezpieczeństwo i dopuszczalną podatność"
    ]
  },
  {
    "id": "m3-tension-compression-test",
    "moduleId": "material",
    "number": 1,
    "title": "Próba rozciągania i ściskania",
    "shortTitle": "Próby materiałowe",
    "description": "Jak z próbki uzyskać krzywą naprężenie–odkształcenie i dlaczego wynik jest niezależny od wielkości próbki w zakresie porównywalnych pomiarów.",
    "duration": 7,
    "eyebrow": "Poznajemy odpowiedź materiału",
    "outcomes": [
      "W1 — analizuje przebieg siły i naprężeń w próbce osiowo obciążonej",
      "W2 — odróżnia rozciąganie od ściskania oraz naprężenie od odkształcenia",
      "W3 — uwzględnia pole i długość próbki w opisie badania",
      "U1 — przelicza wyniki próby na naprężenia i odkształcenia",
      "U2 — przygotowuje dane naprężeniowe potrzebne do późniejszej analizy kołem Mohra",
      "U3 — ocenia, czy wynik próby może być podstawą bezpiecznego doboru"
    ]
  },
  {
    "id": "m3-thermal-free-restrained",
    "moduleId": "material",
    "number": 5,
    "title": "Temperatura: swoboda i zablokowanie",
    "shortTitle": "Efekt temperatury",
    "description": "Różnica między swobodną zmianą długości a naprężeniem powstającym, gdy podpory uniemożliwiają odkształcenie termiczne.",
    "duration": 9,
    "eyebrow": "Gdy materiał chce się rozszerzyć",
    "outcomes": [
      "W1 — analizuje współdziałanie pręta i podpór przy zmianie temperatury",
      "W2 — odróżnia odkształcenie termiczne od naprężenia termicznego",
      "W3 — uwzględnia długość i szczelinę w ocenie deformacji",
      "U1 — oblicza zmiany długości i naprężenia termiczne",
      "U2 — określa znak naprężenia osiowego do analizy kołem Mohra",
      "U3 — projektuje odkształcenia i naprężenia bez przekroczenia warunków bezpieczeństwa"
    ],
    "solutionId": "cw2-2"
  },
  {
    "id": "m4-central-principal-axes",
    "moduleId": "geometry",
    "number": 5,
    "title": "Osie centralne i główne",
    "shortTitle": "Osie przekroju",
    "description": "Osie przechodzące przez środek ciężkości, moment dewiacyjny oraz warunki, w których osie stają się główne.",
    "duration": 9,
    "eyebrow": "Wybieramy właściwy układ osi",
    "outcomes": [
      "W1 — analizuje związek układu osi z kierunkami zginania",
      "W2 — rozpoznaje, kiedy można rozdzielić zginanie na kierunki główne",
      "W3 — wyznacza i interpretuje osie centralne oraz główne",
      "U1 — sprawdza momenty statyczne i warunek Ixy = 0",
      "U2 — rozumie rolę głównych kierunków geometrycznych przy analizie koła Mohra",
      "U3 — wybiera osie umożliwiające poprawny i bezpieczny dobór przekroju"
    ]
  },
  {
    "id": "m4-composite-static-moments",
    "moduleId": "geometry",
    "number": 2,
    "title": "Momenty statyczne i figury złożone",
    "shortTitle": "Przekroje złożone",
    "description": "Dzielenie przekroju na proste części, sumowanie momentów statycznych i traktowanie otworów jako pól ujemnych.",
    "duration": 8,
    "eyebrow": "Całość jako suma części",
    "outcomes": [
      "W1 — analizuje udział poszczególnych części w równowadze geometrycznej",
      "W2 — wyznacza osie odniesienia do późniejszych obliczeń zginania",
      "W3 — oblicza charakterystyki przekrojów złożonych i z otworami",
      "U1 — sumuje pola i momenty statyczne oraz wyznacza środek",
      "U2 — lokalizuje osie centralne dla dalszej analizy stanu naprężenia",
      "U3 — ocenia wpływ zmiany geometrii na położenie osi obciążeń"
    ]
  },
  {
    "id": "m4-rational-section-shapes",
    "moduleId": "geometry",
    "number": 7,
    "title": "Racjonalne kształty przekrojów",
    "shortTitle": "Racjonalny przekrój",
    "description": "Porównywanie przekrojów przy tej samej masie, skuteczność rur i dwuteowników oraz łączenie wytrzymałości ze sztywnością.",
    "duration": 10,
    "eyebrow": "Materiał tam, gdzie pracuje",
    "outcomes": [
      "W1 — analizuje zgodność kształtu przekroju z rodzajem obciążenia",
      "W2 — łączy zginanie, skręcanie i warunki stateczności z geometrią",
      "W3 — porównuje charakterystyki racjonalnych przekrojów",
      "U1 — oblicza i porównuje A, I, W oraz miary efektywności",
      "U2 — rozpoznaje kierunki skrajnych naprężeń do analizy kołem Mohra",
      "U3 — dobiera przekrój z uwagi na bezpieczeństwo, sztywność i masę"
    ]
  },
  {
    "id": "m4-second-moments",
    "moduleId": "geometry",
    "number": 3,
    "title": "Momenty bezwładności przekroju",
    "shortTitle": "Bezwładność",
    "description": "Geometryczna miara rozmieszczenia pola względem osi oraz momenty bezwładności prostokąta, koła i przekroju pierścieniowego.",
    "duration": 8,
    "eyebrow": "Dalej od osi znaczy sztywniej",
    "outcomes": [
      "W1 — analizuje rozkład materiału względem osi zginania",
      "W2 — wiąże moment bezwładności ze sztywnością i naprężeniami przy zginaniu",
      "W3 — oblicza momenty bezwładności figur prostych",
      "U1 — stosuje wzory i prawidłowo zachowuje jednostki czwartego rzędu",
      "U2 — rozróżnia osie i kierunki potrzebne do analizy naprężeń",
      "U3 — porównuje sztywność różnych ustawień przekroju"
    ],
    "solutionId": "cw5-1"
  },
  {
    "id": "m4-section-modulus",
    "moduleId": "geometry",
    "number": 6,
    "title": "Wskaźnik wytrzymałości przekroju W",
    "shortTitle": "Wskaźnik W",
    "description": "Przejście od momentu bezwładności do największego naprężenia zginającego i różnica między przekrojami symetrycznymi a niesymetrycznymi.",
    "duration": 9,
    "eyebrow": "Od geometrii do naprężenia",
    "outcomes": [
      "W1 — analizuje rozkład naprężeń od osi obojętnej do krawędzi",
      "W2 — stosuje geometrię przekroju w przypadku zginania",
      "W3 — wyznacza wskaźniki wytrzymałości dla obu stron osi",
      "U1 — oblicza W i największe naprężenie zginające",
      "U2 — identyfikuje skrajne naprężenia normalne do dalszej analizy Mohra",
      "U3 — dobiera przekrój z uwagi na nośność i sztywność zginania"
    ]
  },
  {
    "id": "m4-simple-centroid",
    "moduleId": "geometry",
    "number": 1,
    "title": "Środek ciężkości figur prostych",
    "shortTitle": "Środek ciężkości",
    "description": "Geometryczny środek figury, osie symetrii i położenie środka ciężkości prostokąta, trójkąta oraz koła.",
    "duration": 7,
    "eyebrow": "Gdzie skupiony jest przekrój?",
    "outcomes": [
      "W1 — analizuje rozmieszczenie pola względem przyjętych osi",
      "W2 — przygotowuje położenie osi do obliczeń wytrzymałościowych",
      "W3 — rozpoznaje środek ciężkości figur prostych",
      "U1 — wyznacza współrzędne środka ciężkości z definicji i symetrii",
      "U2 — ustala osie odniesienia do dalszej analizy tensora naprężenia",
      "U3 — wykorzystuje położenie środka do bezpiecznego i sztywnego ułożenia przekroju"
    ]
  },
  {
    "id": "m4-steiner-parallel-axis",
    "moduleId": "geometry",
    "number": 4,
    "title": "Twierdzenie Steinera",
    "shortTitle": "Osie równoległe",
    "description": "Przenoszenie momentu bezwładności między osiami równoległymi i składanie przekrojów złożonych względem wspólnej osi.",
    "duration": 9,
    "eyebrow": "Przesuwamy oś odniesienia",
    "outcomes": [
      "W1 — analizuje udział odległych części przekroju w bezwładności",
      "W2 — przygotowuje poprawne charakterystyki do obliczeń zginania",
      "W3 — stosuje osie centralne i równoległe w przekrojach złożonych",
      "U1 — oblicza momenty bezwładności z korektą Aa²",
      "U2 — utrzymuje spójny układ osi dla analizy naprężeń i koła Mohra",
      "U3 — zwiększa sztywność przez racjonalne oddalanie materiału od osi"
    ],
    "solutionId": "cw5-2"
  },
  {
    "id": "shear-hollow-torsion",
    "moduleId": "shear",
    "number": 5,
    "title": "Skręcanie rury: materiał tam, gdzie pracuje",
    "shortTitle": "Wał rurowy",
    "description": "Porównaj rurę z wałem pełnym i naucz się poprawnie odejmować wnętrze we wzorach geometrycznych.",
    "duration": 9,
    "eyebrow": "Pusta oś nie jest stratą",
    "outcomes": [
      "W1 — analizuje elementy ścinane i skręcane oraz wskazuje przekroje przenoszące obciążenie",
      "W2 — rozróżnia przypadki ścinania technicznego i swobodnego skręcania",
      "W3 — wyjaśnia wpływ geometrii przekroju na naprężenia i sztywność",
      "U1 — oblicza naprężenia styczne, kąt skręcenia i siły w przekrojach",
      "U2 — wykorzystuje koło Mohra do opisu czystego ścinania",
      "U3 — dobiera średnicę wału z warunków wytrzymałości i sztywności z zachowaniem bezpieczeństwa"
    ]
  },
  {
    "id": "shear-shaft-design",
    "moduleId": "shear",
    "number": 7,
    "title": "Dobór średnicy: wytrzymałość i sztywność",
    "shortTitle": "Dobór wału",
    "description": "Wyznacz średnicę z dwóch niezależnych warunków i wybierz większą wartość.",
    "duration": 10,
    "eyebrow": "Dwa warunki, jedna decyzja",
    "outcomes": [
      "W1 — analizuje elementy ścinane i skręcane oraz wskazuje przekroje przenoszące obciążenie",
      "W2 — rozróżnia przypadki ścinania technicznego i swobodnego skręcania",
      "W3 — wyjaśnia wpływ geometrii przekroju na naprężenia i sztywność",
      "U1 — oblicza naprężenia styczne, kąt skręcenia i siły w przekrojach",
      "U2 — wykorzystuje koło Mohra do opisu czystego ścinania",
      "U3 — dobiera średnicę wału z warunków wytrzymałości i sztywności z zachowaniem bezpieczeństwa"
    ]
  },
  {
    "id": "shear-single-double",
    "moduleId": "shear",
    "number": 2,
    "title": "Połączenia jedno- i dwucięte",
    "shortTitle": "Jedno i dwa cięcia",
    "description": "Policz rzeczywiste płaszczyzny ścinania i uniknij najczęstszej pomyłki przy dwuciętym sworzniu.",
    "duration": 8,
    "eyebrow": "Licz przekroje, nie płyty",
    "outcomes": [
      "W1 — analizuje elementy ścinane i skręcane oraz wskazuje przekroje przenoszące obciążenie",
      "W2 — rozróżnia przypadki ścinania technicznego i swobodnego skręcania",
      "W3 — wyjaśnia wpływ geometrii przekroju na naprężenia i sztywność",
      "U1 — oblicza naprężenia styczne, kąt skręcenia i siły w przekrojach",
      "U2 — wykorzystuje koło Mohra do opisu czystego ścinania",
      "U3 — dobiera średnicę wału z warunków wytrzymałości i sztywności z zachowaniem bezpieczeństwa"
    ]
  },
  {
    "id": "shear-solid-torsion",
    "moduleId": "shear",
    "number": 4,
    "title": "Skręcanie wału pełnego",
    "shortTitle": "Wał pełny",
    "description": "Prześledź liniowy rozkład naprężeń od osi do powierzchni i oblicz τmax dla okrągłego wału.",
    "duration": 9,
    "eyebrow": "Najdalej od osi, największe τ",
    "outcomes": [
      "W1 — analizuje elementy ścinane i skręcane oraz wskazuje przekroje przenoszące obciążenie",
      "W2 — rozróżnia przypadki ścinania technicznego i swobodnego skręcania",
      "W3 — wyjaśnia wpływ geometrii przekroju na naprężenia i sztywność",
      "U1 — oblicza naprężenia styczne, kąt skręcenia i siły w przekrojach",
      "U2 — wykorzystuje koło Mohra do opisu czystego ścinania",
      "U3 — dobiera średnicę wału z warunków wytrzymałości i sztywności z zachowaniem bezpieczeństwa"
    ]
  },
  {
    "id": "shear-stress-strain",
    "moduleId": "shear",
    "number": 3,
    "title": "Naprężenia i odkształcenia styczne",
    "shortTitle": "Naprężenia styczne",
    "description": "Połącz τ z kątem odkształcenia postaciowego i poznaj czyste ścinanie na kole Mohra.",
    "duration": 8,
    "eyebrow": "Prostokąt zmienia kąty",
    "outcomes": [
      "W1 — analizuje elementy ścinane i skręcane oraz wskazuje przekroje przenoszące obciążenie",
      "W2 — rozróżnia przypadki ścinania technicznego i swobodnego skręcania",
      "W3 — wyjaśnia wpływ geometrii przekroju na naprężenia i sztywność",
      "U1 — oblicza naprężenia styczne, kąt skręcenia i siły w przekrojach",
      "U2 — wykorzystuje koło Mohra do opisu czystego ścinania",
      "U3 — dobiera średnicę wału z warunków wytrzymałości i sztywności z zachowaniem bezpieczeństwa"
    ]
  },
  {
    "id": "shear-technical",
    "moduleId": "shear",
    "number": 1,
    "title": "Ścinanie techniczne: siła w poprzek przekroju",
    "shortTitle": "Ścinanie techniczne",
    "description": "Zobacz, kiedy warstwy materiału przesuwają się względem siebie i jak oszacować średnie naprężenie styczne.",
    "duration": 7,
    "eyebrow": "Przekrój pracuje na ścinanie",
    "outcomes": [
      "W1 — analizuje elementy ścinane i skręcane oraz wskazuje przekroje przenoszące obciążenie",
      "W2 — rozróżnia przypadki ścinania technicznego i swobodnego skręcania",
      "W3 — wyjaśnia wpływ geometrii przekroju na naprężenia i sztywność",
      "U1 — oblicza naprężenia styczne, kąt skręcenia i siły w przekrojach",
      "U2 — wykorzystuje koło Mohra do opisu czystego ścinania",
      "U3 — dobiera średnicę wału z warunków wytrzymałości i sztywności z zachowaniem bezpieczeństwa"
    ]
  },
  {
    "id": "shear-twist-angle",
    "moduleId": "shear",
    "number": 6,
    "title": "Kąt skręcenia i sztywność wału",
    "shortTitle": "Kąt skręcenia",
    "description": "Sprawdź, kiedy wał jest wystarczająco wytrzymały, ale nadal zbyt podatny na skręcanie.",
    "duration": 9,
    "eyebrow": "Nie tylko naprężenie",
    "outcomes": [
      "W1 — analizuje elementy ścinane i skręcane oraz wskazuje przekroje przenoszące obciążenie",
      "W2 — rozróżnia przypadki ścinania technicznego i swobodnego skręcania",
      "W3 — wyjaśnia wpływ geometrii przekroju na naprężenia i sztywność",
      "U1 — oblicza naprężenia styczne, kąt skręcenia i siły w przekrojach",
      "U2 — wykorzystuje koło Mohra do opisu czystego ścinania",
      "U3 — dobiera średnicę wału z warunków wytrzymałości i sztywności z zachowaniem bezpieczeństwa"
    ]
  },
  {
    "id": "strain-state-epsilon-gamma",
    "moduleId": "strain-state",
    "number": 1,
    "title": "Odkształcenia: długości i kąty",
    "shortTitle": "ε i γ",
    "description": "Rozróżnij względną zmianę długości od zniekształcenia postaciowego i poprawnie używaj bezwymiarowych wielkości.",
    "duration": 7,
    "eyebrow": "Jak zmienia się kształt",
    "outcomes": [
      "W1 — analizuje odkształcenia liniowe i postaciowe w elemencie konstrukcyjnym",
      "W2 — rozpoznaje sprężyste przypadki wytrzymałościowe z udziałem efektu Poissona",
      "W3 — wiąże geometrię, zmianę objętości i położenie czujników z mierzonymi wielkościami",
      "U1 — oblicza odkształcenia z uogólnionego prawa Hooke’a i danych tensometrycznych",
      "U2 — przekształca pomiary rozety w koło Mohra odkształceń i wielkości główne",
      "U3 — dobiera parametry materiałowe i geometryczne z uwagi na bezpieczeństwo oraz sztywność"
    ]
  },
  {
    "id": "strain-state-gauges",
    "moduleId": "strain-state",
    "number": 5,
    "title": "Tensometry: od oporu do odkształcenia",
    "shortTitle": "Pomiar tensometryczny",
    "description": "Zrozumij zasadę pomiaru, bazę czujnika, kierunkowość i najważniejsze źródła błędów.",
    "duration": 9,
    "eyebrow": "Zobacz niewidzialne",
    "outcomes": [
      "W1 — analizuje odkształcenia liniowe i postaciowe w elemencie konstrukcyjnym",
      "W2 — rozpoznaje sprężyste przypadki wytrzymałościowe z udziałem efektu Poissona",
      "W3 — wiąże geometrię, zmianę objętości i położenie czujników z mierzonymi wielkościami",
      "U1 — oblicza odkształcenia z uogólnionego prawa Hooke’a i danych tensometrycznych",
      "U2 — przekształca pomiary rozety w koło Mohra odkształceń i wielkości główne",
      "U3 — dobiera parametry materiałowe i geometryczne z uwagi na bezpieczeństwo oraz sztywność"
    ]
  },
  {
    "id": "strain-state-general-hooke",
    "moduleId": "strain-state",
    "number": 3,
    "title": "Uogólnione prawo Hooke’a: wszystkie osie naraz",
    "shortTitle": "Prawo Hooke’a 3D",
    "description": "Oblicz odkształcenia przy wieloosiowym naprężeniu, nie zapominając o wpływie pozostałych kierunków i ścinania.",
    "duration": 8,
    "eyebrow": "Superpozycja materiału",
    "outcomes": [
      "W1 — analizuje odkształcenia liniowe i postaciowe w elemencie konstrukcyjnym",
      "W2 — rozpoznaje sprężyste przypadki wytrzymałościowe z udziałem efektu Poissona",
      "W3 — wiąże geometrię, zmianę objętości i położenie czujników z mierzonymi wielkościami",
      "U1 — oblicza odkształcenia z uogólnionego prawa Hooke’a i danych tensometrycznych",
      "U2 — przekształca pomiary rozety w koło Mohra odkształceń i wielkości główne",
      "U3 — dobiera parametry materiałowe i geometryczne z uwagi na bezpieczeństwo oraz sztywność"
    ],
    "solutionId": "cw7-1"
  },
  {
    "id": "strain-state-poisson",
    "moduleId": "strain-state",
    "number": 2,
    "title": "Efekt Poissona: dlaczego pręt robi się cieńszy",
    "shortTitle": "Współczynnik Poissona",
    "description": "Powiąż odkształcenie osiowe z poprzecznym i odróżnij zmianę przekroju od utraty objętości.",
    "duration": 8,
    "eyebrow": "Jedno rozciąganie, trzy reakcje",
    "outcomes": [
      "W1 — analizuje odkształcenia liniowe i postaciowe w elemencie konstrukcyjnym",
      "W2 — rozpoznaje sprężyste przypadki wytrzymałościowe z udziałem efektu Poissona",
      "W3 — wiąże geometrię, zmianę objętości i położenie czujników z mierzonymi wielkościami",
      "U1 — oblicza odkształcenia z uogólnionego prawa Hooke’a i danych tensometrycznych",
      "U2 — przekształca pomiary rozety w koło Mohra odkształceń i wielkości główne",
      "U3 — dobiera parametry materiałowe i geometryczne z uwagi na bezpieczeństwo oraz sztywność"
    ]
  },
  {
    "id": "strain-state-rosette",
    "moduleId": "strain-state",
    "number": 6,
    "title": "Rozeta 0°/45°/90°: trzy odczyty, pełny obraz",
    "shortTitle": "Rozeta tensometryczna",
    "description": "Wyznacz εx, εy i γxy z trzech kierunków, a następnie oblicz odkształcenia główne i maksymalne ścinanie.",
    "duration": 9,
    "eyebrow": "Trzy kierunki wystarczą",
    "outcomes": [
      "W1 — analizuje odkształcenia liniowe i postaciowe w elemencie konstrukcyjnym",
      "W2 — rozpoznaje sprężyste przypadki wytrzymałościowe z udziałem efektu Poissona",
      "W3 — wiąże geometrię, zmianę objętości i położenie czujników z mierzonymi wielkościami",
      "U1 — oblicza odkształcenia z uogólnionego prawa Hooke’a i danych tensometrycznych",
      "U2 — przekształca pomiary rozety w koło Mohra odkształceń i wielkości główne",
      "U3 — dobiera parametry materiałowe i geometryczne z uwagi na bezpieczeństwo oraz sztywność"
    ],
    "solutionId": "cw7-2"
  },
  {
    "id": "strain-state-stress-link",
    "moduleId": "strain-state",
    "number": 7,
    "title": "Od pomiaru do naprężeń i bezpiecznego doboru",
    "shortTitle": "Powiązanie stanów",
    "description": "Przelicz odkształcenia główne na naprężenia, połącz oba koła Mohra i uwzględnij wytrzymałość oraz sztywność.",
    "duration": 10,
    "eyebrow": "Pełna droga projektowa",
    "outcomes": [
      "W1 — analizuje odkształcenia liniowe i postaciowe w elemencie konstrukcyjnym",
      "W2 — rozpoznaje sprężyste przypadki wytrzymałościowe z udziałem efektu Poissona",
      "W3 — wiąże geometrię, zmianę objętości i położenie czujników z mierzonymi wielkościami",
      "U1 — oblicza odkształcenia z uogólnionego prawa Hooke’a i danych tensometrycznych",
      "U2 — przekształca pomiary rozety w koło Mohra odkształceń i wielkości główne",
      "U3 — dobiera parametry materiałowe i geometryczne z uwagi na bezpieczeństwo oraz sztywność"
    ]
  },
  {
    "id": "strain-state-volume",
    "moduleId": "strain-state",
    "number": 4,
    "title": "Zmiana objętości: ślad odkształcenia",
    "shortTitle": "Dylatacja objętości",
    "description": "Oblicz względną zmianę objętości i powiąż ją ze średnim naprężeniem oraz modułem ściśliwości.",
    "duration": 9,
    "eyebrow": "Kostka zmienia objętość",
    "outcomes": [
      "W1 — analizuje odkształcenia liniowe i postaciowe w elemencie konstrukcyjnym",
      "W2 — rozpoznaje sprężyste przypadki wytrzymałościowe z udziałem efektu Poissona",
      "W3 — wiąże geometrię, zmianę objętości i położenie czujników z mierzonymi wielkościami",
      "U1 — oblicza odkształcenia z uogólnionego prawa Hooke’a i danych tensometrycznych",
      "U2 — przekształca pomiary rozety w koło Mohra odkształceń i wielkości główne",
      "U3 — dobiera parametry materiałowe i geometryczne z uwagi na bezpieczeństwo oraz sztywność"
    ]
  },
  {
    "id": "stress-state-directions",
    "moduleId": "stress-state",
    "number": 4,
    "title": "Kierunki główne: gdzie znika ścinanie",
    "shortTitle": "Kierunki główne",
    "description": "Wyznacz położenie płaszczyzn głównych i naucz się rozstrzygać niejednoznaczność kąta oraz przypadek stanu hydrostatycznego.",
    "duration": 9,
    "eyebrow": "Znajdź właściwy kierunek",
    "outcomes": [
      "W1 — analizuje stan naprężenia w punkcie i dobiera składowe do opisu elementu",
      "W2 — rozpoznaje przypadki wytrzymałościowe związane z rozciąganiem, ściskaniem i ścinaniem",
      "W3 — odróżnia wpływ geometrii przekroju i kierunku przekroju na naprężenia",
      "U1 — oblicza składowe po obrocie, naprężenia główne i maksymalne naprężenie styczne",
      "U2 — kreśli i interpretuje koło Mohra oraz wyznacza kierunki główne",
      "U3 — wykorzystuje wyniki analizy do bezpiecznego i sztywnego doboru elementu"
    ]
  },
  {
    "id": "stress-state-mohr-drawing",
    "moduleId": "stress-state",
    "number": 6,
    "title": "Koło Mohra: narysuj je krok po kroku",
    "shortTitle": "Rysowanie koła",
    "description": "Przejdź od trzech składowych naprężenia do poprawnego wykresu, kątów i odczytu naprężeń głównych.",
    "duration": 9,
    "eyebrow": "Geometria zamiast zgadywania",
    "outcomes": [
      "W1 — analizuje stan naprężenia w punkcie i dobiera składowe do opisu elementu",
      "W2 — rozpoznaje przypadki wytrzymałościowe związane z rozciąganiem, ściskaniem i ścinaniem",
      "W3 — odróżnia wpływ geometrii przekroju i kierunku przekroju na naprężenia",
      "U1 — oblicza składowe po obrocie, naprężenia główne i maksymalne naprężenie styczne",
      "U2 — kreśli i interpretuje koło Mohra oraz wyznacza kierunki główne",
      "U3 — wykorzystuje wyniki analizy do bezpiecznego i sztywnego doboru elementu"
    ]
  },
  {
    "id": "stress-state-mohr-interpretation",
    "moduleId": "stress-state",
    "number": 7,
    "title": "Od koła do decyzji inżynierskiej",
    "shortTitle": "Interpretacja i dobór",
    "description": "Połącz odczyt koła Mohra z warunkiem wytrzymałości, kierunkiem pękania i świadomym doborem marginesu bezpieczeństwa.",
    "duration": 10,
    "eyebrow": "Liczby podejmują decyzję",
    "outcomes": [
      "W1 — analizuje stan naprężenia w punkcie i dobiera składowe do opisu elementu",
      "W2 — rozpoznaje przypadki wytrzymałościowe związane z rozciąganiem, ściskaniem i ścinaniem",
      "W3 — odróżnia wpływ geometrii przekroju i kierunku przekroju na naprężenia",
      "U1 — oblicza składowe po obrocie, naprężenia główne i maksymalne naprężenie styczne",
      "U2 — kreśli i interpretuje koło Mohra oraz wyznacza kierunki główne",
      "U3 — wykorzystuje wyniki analizy do bezpiecznego i sztywnego doboru elementu"
    ]
  },
  {
    "id": "stress-state-principal",
    "moduleId": "stress-state",
    "number": 3,
    "title": "Naprężenia główne: skrajne wartości bez ścinania",
    "shortTitle": "Naprężenia główne",
    "description": "Znajdź największe i najmniejsze naprężenie normalne oraz zrozumij znaczenie trzeciego kierunku w stanie przestrzennym.",
    "duration": 8,
    "eyebrow": "Niezmienniki stanu",
    "outcomes": [
      "W1 — analizuje stan naprężenia w punkcie i dobiera składowe do opisu elementu",
      "W2 — rozpoznaje przypadki wytrzymałościowe związane z rozciąganiem, ściskaniem i ścinaniem",
      "W3 — odróżnia wpływ geometrii przekroju i kierunku przekroju na naprężenia",
      "U1 — oblicza składowe po obrocie, naprężenia główne i maksymalne naprężenie styczne",
      "U2 — kreśli i interpretuje koło Mohra oraz wyznacza kierunki główne",
      "U3 — wykorzystuje wyniki analizy do bezpiecznego i sztywnego doboru elementu"
    ]
  },
  {
    "id": "stress-state-rotation",
    "moduleId": "stress-state",
    "number": 2,
    "title": "Obrót przekroju: ten sam stan, inne liczby",
    "shortTitle": "Transformacja obrotu",
    "description": "Oblicz naprężenia na ścianach obróconego elementu i sprawdź, które wielkości nie zależą od wyboru osi.",
    "duration": 8,
    "eyebrow": "Zmień perspektywę",
    "outcomes": [
      "W1 — analizuje stan naprężenia w punkcie i dobiera składowe do opisu elementu",
      "W2 — rozpoznaje przypadki wytrzymałościowe związane z rozciąganiem, ściskaniem i ścinaniem",
      "W3 — odróżnia wpływ geometrii przekroju i kierunku przekroju na naprężenia",
      "U1 — oblicza składowe po obrocie, naprężenia główne i maksymalne naprężenie styczne",
      "U2 — kreśli i interpretuje koło Mohra oraz wyznacza kierunki główne",
      "U3 — wykorzystuje wyniki analizy do bezpiecznego i sztywnego doboru elementu"
    ]
  },
  {
    "id": "stress-state-tau-max",
    "moduleId": "stress-state",
    "number": 5,
    "title": "Maksymalne ścinanie: płaskie i absolutne",
    "shortTitle": "τ maksymalne",
    "description": "Rozróżnij promień płaskiego koła od maksymalnego ścinania w pełnym stanie przestrzennym.",
    "duration": 9,
    "eyebrow": "Nie pomiń trzeciej osi",
    "outcomes": [
      "W1 — analizuje stan naprężenia w punkcie i dobiera składowe do opisu elementu",
      "W2 — rozpoznaje przypadki wytrzymałościowe związane z rozciąganiem, ściskaniem i ścinaniem",
      "W3 — odróżnia wpływ geometrii przekroju i kierunku przekroju na naprężenia",
      "U1 — oblicza składowe po obrocie, naprężenia główne i maksymalne naprężenie styczne",
      "U2 — kreśli i interpretuje koło Mohra oraz wyznacza kierunki główne",
      "U3 — wykorzystuje wyniki analizy do bezpiecznego i sztywnego doboru elementu"
    ]
  },
  {
    "id": "stress-state-tensor",
    "moduleId": "stress-state",
    "number": 1,
    "title": "Tensor naprężenia: mapa sił w punkcie",
    "shortTitle": "Składowe tensora",
    "description": "Uporządkuj naprężenia normalne i styczne oraz zobacz, dlaczego sama wartość σx nie opisuje całego obciążenia.",
    "duration": 7,
    "eyebrow": "Punkt pod lupą",
    "outcomes": [
      "W1 — analizuje stan naprężenia w punkcie i dobiera składowe do opisu elementu",
      "W2 — rozpoznaje przypadki wytrzymałościowe związane z rozciąganiem, ściskaniem i ścinaniem",
      "W3 — odróżnia wpływ geometrii przekroju i kierunku przekroju na naprężenia",
      "U1 — oblicza składowe po obrocie, naprężenia główne i maksymalne naprężenie styczne",
      "U2 — kreśli i interpretuje koło Mohra oraz wyznacza kierunki główne",
      "U3 — wykorzystuje wyniki analizy do bezpiecznego i sztywnego doboru elementu"
    ]
  }
] satisfies LessonMeta[]
