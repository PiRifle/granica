# Granica — wytrzymałość materiałów

Interaktywny kurs wytrzymałości materiałów: 10 modułów, 70 lekcji, animowane laboratoria, trening liczbowy, ściąga i kolokwium próbne. Aplikacja działa w przeglądarce, zapisuje postęp lokalnie i może być zainstalowana jako PWA.

[![Deploy to GitHub Pages](https://github.com/PiRifle/granica/actions/workflows/deploy.yml/badge.svg)](https://github.com/PiRifle/granica/actions/workflows/deploy.yml)

- Strona: <https://pirifle.github.io/granica/>
- Repozytorium: <https://github.com/PiRifle/granica>

## Co jest w środku

- **10 modułów × 7 lekcji** — łącznie 70 lekcji i 600 minut materiału.
- **23 interaktywne laboratoria** — suwaki, wykresy i natychmiastowa aktualizacja wyników.
- **12 animowanych rozwiązań zadań**, podzielonych na sceny z narracją.
- **Trening liczbowy** z losowanymi zadaniami i podpowiedziami.
- **Kolokwium próbne** — bank 210 pytań z wyjaśnieniami.
- **Mapa sylabusa i ściąga** z najważniejszymi wzorami.
- **Postęp w `localStorage`** — ukończone lekcje i najlepsze wyniki.
- **PWA** — instalacja na telefonie i działanie offline po pierwszym wczytaniu.

Moduły kursu: fundamenty, rozciąganie i ściskanie, materiał pod obciążeniem, geometria przekrojów, ścinanie i skręcanie, zginanie belek, stan naprężenia, stan odkształcenia, hipotezy wytężeniowe oraz projektowanie elementów.

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
│   ├── components/                # widoki, nawigacja, rejestr laboratoriów
│   ├── content/
│   │   ├── lessons/               # lekcje: <moduł>/<lekcja>/content.mdx
│   │   ├── modules/               # dane i omówienie modułów
│   │   ├── solutions/             # animowane rozwiązania zadań
│   │   ├── exam/exam-bank.ts      # bank pytań egzaminacyjnych
│   │   ├── registry.ts            # składanie kursu z plików
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

| Ścieżka             | Widok                                          |
| ------------------- | ---------------------------------------------- |
| `/`                 | Strona główna i plan kursu                     |
| `/lesson/:lessonId` | Lekcja MDX z laboratorium, przykładem i quizem |
| `/training`         | Trening liczbowy                               |
| `/exam`             | Kolokwium próbne                               |
| `/cheatsheet`       | Ściąga                                         |
| `/syllabus`         | Mapa sylabusa                                  |

Router korzysta z `BrowserRouter`, a `basename` jest wyliczany z `import.meta.env.BASE_URL`. Dzięki temu te same pliki działają pod domeną główną i pod podścieżką GitHub Pages.

## Architektura treści

Treść jest rozdzielona od kodu:

1. `scripts/content-meta-plugin.ts` skanuje `src/content/lessons/**/content.mdx`, waliduje frontmatter i udostępnia go jako wirtualny moduł `virtual:lesson-meta`.
2. `src/content/registry.ts` łączy metadane z leniwie ładowanymi plikami MDX oraz modułami i rozwiązaniami.
3. `src/content/course.ts` udostępnia gotowy model kursu używany przez widoki i testy.

Dzięki temu lista lekcji i nawigacja nie wymagają ręcznej aktualizacji po dodaniu pliku.

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
duration: 9
eyebrow: Sztywność całego pręta
outcomes:
  - W1 — pierwszy efekt kształcenia
  - U1 — pierwsza umiejętność
solutionId: cw2-1 # opcjonalnie
---
```

Zasady egzekwowane przez walidację:

- `id` musi być zgodne z nazwą katalogu, a `moduleId` z nazwą modułu.
- `number` i `duration` są dodatnimi liczbami, a `outcomes` nie może być puste.
- Identyfikatory lekcji są unikalne.
- Każdy moduł ma dokładnie 7 lekcji i 60 minut.
- Pola `lab`, `formula`, `formulaNote`, `insight`, `questions`, `workedExample` nie mogą występować we frontmatterze — odpowiadające im elementy umieszcza się w treści MDX.
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

### Dodawanie laboratorium

1. Utwórz komponent w `src/labs/`, np. `MyLab.tsx`.
2. Zarejestruj go pod unikalnym identyfikatorem w `src/components/LabRegistry.tsx`.
3. Użyj identyfikatora w treści: `<Lab id="myLab" />`.
4. Uruchom `npm test` — testy sprawdzają, czy każde użyte laboratorium istnieje.

### Dodawanie lekcji, modułu lub rozwiązania

- **Lekcja:** dodaj katalog w `src/content/lessons/<moduleId>/` z `content.mdx` i poprawnym frontmatterem. Pamiętaj o limicie 7 lekcji i 60 minut w module.
- **Moduł:** dodaj `src/content/modules/<id>/module.data.ts` oraz `overview.mdx`, a następnie uzupełnij numerację i mapę sylabusa.
- **Rozwiązanie:** dodaj `src/content/solutions/<id>/solution.data.ts` i `content.mdx`. Rozwiązanie podłącz do lekcji przez `solutionId`.
- **Pytania egzaminacyjne:** dopisuj wpisy w `src/content/exam/exam-bank.ts`; każde pytanie musi mieć co najmniej 3 odpowiedzi, poprawny indeks, wyjaśnienie i podpowiedź.

Po zmianach uruchom `npm run validate:content` lub pełne `npm test`.

## Postęp użytkownika

Postęp jest przechowywany wyłącznie w przeglądarce pod kluczem `wytrzymalosc-course-v2`. Aplikacja nie wysyła danych do żadnego backendu. Reset postępu jest dostępny w interfejsie i czyści ukończone lekcje, wyniki oraz ostatnią lekcję.

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

- 10 modułów, 70 lekcji i 600 minut,
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
