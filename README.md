# Granica — interaktywne kursy mechaniki

Platforma z dwoma kursami: **wytrzymałość materiałów** (10 modułów, 70 lekcji, laboratoria, animowane rozwiązania, trening i kolokwium próbne) oraz **statyka** (7 modułów w przygotowaniu, opartych na sylabusie). Aplikacja działa w przeglądarce, zapisuje postęp lokalnie i może być zainstalowana jako PWA.

[![Deploy to GitHub Pages](https://github.com/PiRifle/granica/actions/workflows/deploy.yml/badge.svg)](https://github.com/PiRifle/granica/actions/workflows/deploy.yml)

- Strona: <https://pirifle.github.io/granica/>
- Repozytorium: <https://github.com/PiRifle/granica>

## Co jest w środku

- **Wytrzymałość materiałów: 10 modułów × 7 lekcji** — łącznie 70 lekcji z czasem wyliczanym z treści.
- **Statyka: 7 modułów w planie** — aksjomaty, układy sił, tarcie, siły wewnętrzne, środki ciężkości i twierdzenie Guldina.
- **Wspólna strona główna** — wybór kursu, osobne motywy kolorystyczne, postęp i wznowienie nauki per kurs.
- **Wprowadzenie do każdego modułu** — co to jest, po co się uczyć, mapa lekcji i kluczowe wzory.
- **Rozbudowana teoria** — definicje, założenia, wyprowadzenia, po trzy przykłady i typowe błędy w każdej lekcji.
- **Biblioteka kursu** — pełna literatura z sylabusa i otwarte podręczniki, z których powstała treść.
- **23 interaktywne laboratoria** — suwaki, wykresy i natychmiastowa aktualizacja wyników.
- **12 animowanych rozwiązań zadań**, podzielonych na sceny z narracją.
- **Mapa źródeł** — każda lekcja wskazuje, gdzie pogłębić temat w literaturze.
- **Czas czytania z treści** — liczony z prozy, wzorów i laboratoriów, a nie z rozmiaru pliku.
- **Debug laboratoriów** — strona `/debug/labs` renderująca wszystkie eksperymenty naraz.
- **Trening liczbowy** z losowanymi zadaniami i podpowiedziami.
- **Kolokwium próbne** — bank 210 pytań z wyjaśnieniami.
- **Mapa sylabusa i ściąga** z najważniejszymi wzorami.
- **Postęp w `localStorage`** — ukończone lekcje i najlepsze wyniki, osobno dla każdego kursu.
- **Treści wspomagane AI** — materiały powstają z użyciem AI i mogą zawierać błędy; kluczowe wyniki sprawdzaj z literaturą.
- **PWA** — instalacja na telefonie i działanie offline po pierwszym wczytaniu.

Moduły wytrzymałości: fundamenty, rozciąganie i ściskanie, materiał pod obciążeniem, geometria przekrojów, ścinanie i skręcanie, zginanie belek, stan naprężenia, stan odkształcenia, hipotezy wytężeniowe oraz projektowanie elementów.

Moduły statyki: aksjomaty i rachunek wektorowy, płaski zbieżny układ sił, płaski dowolny układ sił, przestrzenny układ sił, tarcie, siły wewnętrzne w belkach i ramach oraz środki ciężkości i twierdzenie Guldina.

## Stos technologiczny

| Warstwa | Technologie                                        |
| ------- | -------------------------------------------------- |
| UI      | React 19, React Router 7, Radix UI, Lucide, Motion |
| Treść   | MDX 3, KaTeX, gray-matter                          |
| Wykresy | Recharts                                           |
| Stan    | Zustand z middleware `persist`                     |
| Build   | Vite 8, TypeScript, vite-plugin-pwa (Workbox)      |
| Testy   | Vitest, jsdom                                      |
| Jakość  | Prettier                                           |

## Wymagania

- Node.js 22 lub nowszy (taka wersja jest używana w CI)
- npm 10 lub nowszy

## Szybki start

```bash
npm install
npm run dev
```

Aplikacja będzie dostępna pod `http://localhost:5173/`.

## Skrypty

| Komenda                    | Opis                                                            |
| -------------------------- | --------------------------------------------------------------- |
| `npm run dev`              | Serwer deweloperski Vite na `0.0.0.0:5173`                      |
| `npm run build`            | Walidacja treści, kontrola typów i build produkcyjny do `dist/` |
| `npm run preview`          | Podgląd zbudowanej aplikacji                                    |
| `npm test`                 | Pełny zestaw testów Vitest                                      |
| `npm run validate:content` | Szybka walidacja treści kursu                                   |
| `npm run format`           | Formatowanie projektu Prettierem                                |
| `npm run format:check`     | Sprawdzenie formatowania bez zapisu                             |

`npm run build` wykonuje kolejno `validate:content`, `tsc -b` i `vite build`. Build kończy się błędem, jeśli treść MDX jest niespójna lub nie przechodzi kontroli typów.

## Struktura projektu

```text
.
├── .github/workflows/deploy.yml   # build i wdrożenie na GitHub Pages
├── public/                        # favicon, ikony PWA
├── scripts/
│   └── content-meta-plugin.ts     # wirtualny moduł z metadanymi lekcji
├── src/
│   ├── App.tsx                    # routing SPA
│   ├── components/                # widoki (lekcja, moduł, biblioteka), nawigacja, laboratoria
│   ├── content/
│   │   ├── courses.ts             # kolekcja kursów: moduły, motywy, sylabus, marketing
│   │   ├── course.ts              # publiczny re-export modelu kursów
│   │   ├── lessons/               # lekcje: <moduł>/<lekcja>/content.mdx
│   │   ├── modules/               # dane i omówienie modułów
│   │   ├── solutions/             # animowane rozwiązania zadań
│   │   ├── exam/exam-bank.ts      # bank pytań egzaminacyjnych
│   │   ├── literature.ts          # bibliografia i otwarte źródła
│   │   ├── registry.ts            # składanie kursów z plików
│   │   └── course.test.ts         # testy integralności treści
│   ├── labs/                      # interaktywne laboratoria
│   ├── lib/                       # obliczenia inżynierskie i ich testy
│   ├── mdx/                       # komponenty dostępne w MDX
│   ├── styles/
│   ├── store.ts                   # postęp użytkownika (Zustand)
│   └── types.ts
├── index.html
├── vite.config.ts
└── package.json
```

## Routing

| Ścieżka                              | Widok                                                |
| ------------------------------------ | ---------------------------------------------------- |
| `/`                                  | Strona główna z wyborem kursu                        |
| `/course/:courseId`                  | Strona kursu i plan modułów                          |
| `/course/:courseId/lesson/:lessonId` | Lekcja MDX z laboratorium, przykładami i quizem      |
| `/course/:courseId/module/:moduleId` | Wprowadzenie do modułu, efekty, mapa lekcji i postęp |
| `/course/:courseId/training`         | Trening liczbowy                                     |
| `/course/:courseId/exam`             | Kolokwium próbne                                     |
| `/course/:courseId/cheatsheet`       | Ściąga                                               |
| `/course/:courseId/syllabus`         | Mapa sylabusa                                        |
| `/course/:courseId/library`          | Literatura z sylabusa i otwarte podręczniki          |
| `/issues`                            | Jak zgłaszać błędy i problemy na GitHubie            |

Stare adresy `/lesson/:lessonId`, `/module/:moduleId`, `/training`, `/exam`, `/cheatsheet`, `/syllabus` i `/biblioteka` przekierowują do odpowiedniego kursu. Strona `/issues` zawiera instrukcję zgłaszania błędów przez GitHub Issues; link do niej znajduje się w stopce.

Router korzysta z `BrowserRouter`, a `basename` jest wyliczany z `import.meta.env.BASE_URL`. Dzięki temu te same pliki działają pod domeną główną i pod podścieżką GitHub Pages.

## Architektura treści

Treść jest rozdzielona od kodu:

1. `scripts/content-meta-plugin.ts` skanuje `src/content/lessons/**/content.mdx`, waliduje frontmatter i udostępnia go jako wirtualny moduł `virtual:lesson-meta`.
2. `src/content/courses.ts` jest jedynym źródłem prawdy o kursach: zawiera identyfikatory modułów, motyw, sylabus, dostępne narzędzia i treści marketingowe strony głównej.
3. `src/content/registry.ts` łączy metadane z leniwie ładowanymi plikami MDX, modułami, rozwiązaniami i buduje kolekcję `courses`.
4. `src/content/course.ts` udostępnia gotowy model kursów używany przez widoki i testy.

Dzięki temu lista kursów, modułów i lekcji nie wymaga ręcznej aktualizacji po dodaniu pliku — nowy moduł wystarczy dopisać do `moduleIds` w `courses.ts`.

### Frontmatter lekcji

Każda lekcja znajduje się w `src/content/lessons/<moduleId>/<lessonId>/content.mdx`. Wymagane pola:

```yaml
---
id: axial-elongation
moduleId: axial
number: 5
title: Wydłużenia i skrócenia prętów
shortTitle: Wydłużenia
description: Krótki opis lekcji.
eyebrow: Sztywność całego pręta
outcomes:
  - W1 — pierwszy efekt kształcenia
  - U1 — pierwsza umiejętność
solutionId: cw2-1 # opcjonalnie
---
```

Zasady egzekwowane przez walidację:

- `id` musi być zgodne z nazwą katalogu, a `moduleId` z nazwą modułu.
- `number` jest dodatnią liczbą całkowitą, a `outcomes` nie może być puste.
- Identyfikatory lekcji są unikalne.
- Każdy moduł wytrzymałości ma dokładnie 7 lekcji. Moduły statyki są na razie oznaczone jako `planned` i nie mają lekcji.
- Pola `duration`, `lab`, `formula`, `formulaNote`, `insight`, `questions`, `workedExample` nie mogą występować we frontmatterze. Czas jest wyliczany z treści, a pozostałe elementy umieszcza się w treści MDX.
- Każda lekcja zawiera `<Lab id="…" />`, `<Formula>`, `<WorkedExample>` i `<Quiz>` z co najmniej jednym `<Question>`.
- `lab` musi istnieć w `src/components/LabRegistry.tsx`.

### Komponenty MDX

| Komponent                                                                 | Przeznaczenie                               |
| ------------------------------------------------------------------------- | ------------------------------------------- |
| `<Lab id="hooke" />`                                                      | Osadza interaktywne laboratorium z rejestru |
| `<Formula>` + `<Caption>`                                                 | Wzór KaTeX i opis pod nim                   |
| `<Insight>`                                                               | Kluczowa obserwacja lub typowy błąd         |
| `<Callout>`                                                               | Dodatkowa uwaga lub ostrzeżenie             |
| `<WorkedExample>`                                                         | Rozwiązanie krok po kroku                   |
| `<Given>`, `<Steps>`, `<Step>`, `<Result>`                                | Części przykładu                            |
| `<Quiz>`, `<Question>`, `<Prompt>`, `<Answer>`, `<Hint>`, `<Explanation>` | Sprawdzian w lekcji                         |

Przykład quizu:

```mdx
<Quiz>
  <Question outcome="U1">
    <Prompt>Jak zmieni się wydłużenie, gdy długość wzrośnie trzy razy?</Prompt>
    <Answer correct>Wzrośnie trzy razy</Answer>
    <Answer>Nie zmieni się</Answer>
    <Hint>Zależność od długości jest liniowa.</Hint>
    <Explanation>ΔL jest proporcjonalne do L przy stałym N, E i A.</Explanation>
  </Question>
</Quiz>
```

### Wprowadzenie modułu

Każdy moduł ma `src/content/modules/<id>/overview.mdx`. To osobny dokument MDX renderowany na stronie `/course/<courseId>/module/<id>`: wyjaśnia, o czym jest moduł, po co go przechodzić, jak czytać mapę lekcji i jakie wzory są centralne. Wprowadzenie może używać `Formula`, `Caption`, `Insight`, `Callout`, `WorkedExample` i zwykłego markdownu, ale nie `Quiz` (brak kontekstu lekcji).

### Czas czytania

Czas w nagłówku lekcji jest liczony z **wyrenderowanej treści**, nie z rozmiaru pliku MDX:

```text
T = W / 180 + (5 · M_inline + 15 · M_display) / 60 + T_laboratoriów
```

- `W` — liczba słów prozy (`Intl.Segmenter`, bez znaczników i etykiet UI),
- `M_inline`, `M_display` — liczba wzorów KaTeX w linii i blokowych,
- `T_laboratoriów` — suma szacunków z `src/labs/labMeta.ts`.

Statystyki są liczone **podczas builda** w `scripts/content-meta-plugin.ts`. Plugin parsuje MDX (remark + remark-math), zlicza słowa z węzłów tekstowych, osobno wzory w linii i blokowe, a laboratoria wycenia przez `src/labs/labMeta.ts`. Pola `words`, `inlineMath`, `displayMath`, `experiments`, `experimentMinutes`, `readingMinutes`, `totalMinutes` trafiają do `virtual:lesson-meta`; `totalMinutes` jest wyliczanym czasem całkowitym. We frontmatterze **nie ma pola długości** — `duration` jest zabronione, żeby czas nie był definiowany ręcznie.

### Debug laboratoriów

Strona `/debug/labs` renderuje wszystkie laboratoria jednocześnie. **Nie trafia do builda produkcyjnego** — route, komponent i link w stopce są ogrodzone `import.meta.env.DEV`, a `LabDebug` jest ładowany dynamicznie tylko w trybie deweloperskim. Każde jest w osobnym error boundary, więc awaria jednego nie zatrzymuje pozostałych. Przycisk **Remount** resetuje pojedyncze laboratorium bez przeładowania strony. Metadane (nazwa, temat, szacowany czas) są w `src/labs/labMeta.ts`; test integralności pilnuje, żeby każdy wpis w `LabRegistry` miał metadane.

### Biblioteka i źródła

`src/content/literature.ts` zawiera osiem pozycji z karty przedmiotu (sześć podstawowych i dwie uzupełniające) oraz cztery otwarte podręczniki wykorzystane merytorycznie. Strona `/course/:courseId/library` pokazuje dane bibliograficzne, zgodny z modułami zakres tematyczny, sposób korzystania i legalne linki do otwartych tekstów. Każda lekcja kończy się sekcją `## Źródła i dalsze czytanie`.

Podręczniki z sylabusa są objęte prawem autorskim, więc repozytorium nie zawiera ich plików. Otwarte źródła (Roylance, Wierzbicki, Osgood i notatki MIT 3.11) są dostępne na licencjach CC BY-NC-SA.

### Dodawanie laboratorium

1. Utwórz komponent w `src/labs/`, np. `MyLab.tsx`.
2. Zarejestruj go pod unikalnym identyfikatorem w `src/components/LabRegistry.tsx`.
3. Użyj identyfikatora w treści: `<Lab id="myLab" />`.
4. Uruchom `npm test` — testy sprawdzają, czy każde użyte laboratorium istnieje.

### Dodawanie lekcji, modułu lub rozwiązania

- **Lekcja:** dodaj katalog w `src/content/lessons/<moduleId>/` z `content.mdx` i poprawnym frontmatterem. Limit modułu to 7 lekcji; czas wyliczy plugin.
- **Moduł:** dodaj `src/content/modules/<id>/module.data.ts` oraz `overview.mdx`, a następnie dopisz `id` do `moduleIds` i `syllabus` wybranego kursu w `src/content/courses.ts`.
- **Rozwiązanie:** dodaj `src/content/solutions/<id>/solution.data.ts` i `content.mdx`. Rozwiązanie podłącz do lekcji przez `solutionId`.
- **Pytania egzaminacyjne:** dopisuj wpisy w `src/content/exam/exam-bank.ts`; każde pytanie musi mieć co najmniej 3 odpowiedzi, poprawny indeks, wyjaśnienie i podpowiedź.

Po zmianach uruchom `npm run validate:content` lub pełne `npm test`.

## Postęp użytkownika

Postęp jest przechowywany wyłącznie w przeglądarce pod kluczem `wytrzymalosc-course-v2` (wersja 3 schematu). Aplikacja nie wysyła danych do żadnego backendu. Postęp, wyniki i ostatnia lekcja są pamiętane osobno dla każdego kursu. Reset postępu jest dostępny w interfejsie i czyści ukończone lekcje, wyniki oraz ostatnią lekcję.

## PWA i tryb offline

- Manifest, ikony i service worker generuje `vite-plugin-pwa`.
- Zakres i adres startowy manifestu są wyliczane z `base`, więc PWA działa również pod `/granica/`.
- Po pierwszym wczytaniu Workbox precache'uje aplikację i zasoby KaTeX, umożliwiając pracę offline.
- Rejestracja service workera odbywa się automatycznie (`registerType: 'autoUpdate'`).

## Wdrożenie na GitHub Pages

Wdrożenie obsługuje `.github/workflows/deploy.yml`:

1. `npm ci`
2. `npm run build` z `BASE_PATH=/<nazwa-repozytorium>/`
3. przesłanie `dist/` jako artefaktu Pages
4. publikacja przez `actions/deploy-pages`

Workflow uruchamia się przy pushu do `master` lub `main` oraz ręcznie przez `workflow_dispatch`.

### Konfiguracja

W repozytorium na GitHubie wejdź w **Settings → Pages** i ustaw **Source** na **GitHub Actions**. Workflow próbuje włączyć Pages automatycznie (`enablement: true`), ale ustawienie ręczne jest najpewniejsze.

### Ścieżka bazowa

- Lokalnie `base` wynosi `/`.
- W GitHub Actions workflow ustawia `BASE_PATH=/${{ github.event.repository.name }}/`, więc zmiana nazwy repozytorium nie wymaga edycji kodu.
- Poza Actions obowiązuje fallback `/granica/`.
- Dla domeny głównej lub własnej domeny ustaw `BASE_PATH=/` podczas builda.

`index.html`, manifest PWA, service worker i router korzystają z tej samej ścieżki bazowej. Build generuje dodatkowo `dist/404.html` (fallback dla odświeżenia trasy SPA) oraz `dist/.nojekyll`.

### Pierwsze wdrożenie

```bash
# po zatwierdzeniu zmian
gh repo create PiRifle/granica --public --source=. --remote=origin
git push -u origin master
```

Po zakończeniu workflow strona będzie pod `https://pirifle.github.io/granica/`.

> Uwaga: historia repozytorium została przepisana. Jeśli zdalne repozytorium już istnieje, wymagany będzie `git push --force-with-lease`.

## Testy i jakość

```bash
npm test
npm run format:check
npm run build
```

Testy sprawdzają między innymi:

- kolekcję dwóch kursów i przypisanie modułów do dokładnie jednego kursu,
- 10 modułów i 70 lekcji pełnego kursu wytrzymałości,
- 7 planowanych modułów statyki bez lekcji,
- kompilację wprowadzeń modułów,
- metadane wszystkich laboratoriów,
- build-time’owe liczenie słów, wzorów i czasu eksperymentów,
- kompletność bibliografii i mapowanie książek na moduły,
- unikalność identyfikatorów,
- poprawność frontmattera i kompilację każdego pliku MDX,
- istnienie laboratoriów użytych w lekcjach,
- spójność rozwiązań, scen i mapy sylabusa,
- bank 210 pytań egzaminacyjnych,
- obliczenia inżynierskie w `src/lib`.

## Rozwiązywanie problemów

| Problem                    | Rozwiązanie                                                                                 |
| -------------------------- | ------------------------------------------------------------------------------------------- |
| Pusta strona na Pages      | Sprawdź, czy `BASE_PATH` odpowiada nazwie repozytorium, i uruchom workflow ponownie.        |
| 404 po odświeżeniu trasy   | Upewnij się, że build wygenerował `dist/404.html` i że Pages publikuje artefakt z workflow. |
| Stara wersja po wdrożeniu  | Odśwież stronę; w razie potrzeby wyczyść dane witryny lub wyrejestruj service worker.       |
| Błąd `virtual:lesson-meta` | Uruchom `npm run validate:content`, aby zobaczyć szczegóły błędów frontmattera.             |
| Brak treści lekcji         | Sprawdź, czy plik ma dokładnie ścieżkę `src/content/lessons/<moduleId>/<id>/content.mdx`.   |
