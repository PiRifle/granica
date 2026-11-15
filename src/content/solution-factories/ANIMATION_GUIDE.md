# Przewodnik: przebudowa playerów zadań studenckich

## Cel

Zadania studenckie A–G nie mogą pokazywać wklejonego zdjęcia źródłowego. Każde zadanie ma dostać własną, czytelną animację SVG albo scenę Three.js w lewym panelu oraz szeroko rozpisany prawy panel (sceny z narracją, równaniami i kontrolą). Wygląd i zachowanie mają być zgodne z istniejącymi, dopracowanymi playerami.

## Architektura fabryk

Zadania studenckie są budowane przez fabryki domenowe w `src/content/solution-factories/` (np. `factory-statyka-reakcje-rama`, `factory-axial-thermal`). Każda fabryka zawiera `factory.ts` (typy wejść, funkcje `derive*`, `create*Solution`, helpery `pl`/`tex`), `animation.tsx` (factory funkcje `create*Animation(config)`; dopuszczalne są też podpliki `animation-<zadanie>.tsx` reeksportowane przez barrel) oraz własne `solution.data.ts`/`content.mdx` z przykładem fabrycznym, który nie wchodzi do `workedSolutions` (rejestr globuje tylko `solutions/*/solution.data.ts`).

Wspólne helpery generyczne dla zadań źródłowych żyją w `src/content/solution-factories/core/`:

- `source-task.ts` — `SourceTaskDefinition`, `defineSourceSolution`, `sourceScene`, `pl`, `tex`, `signed`,
- `batch-task.ts` — `makeBatchTask` (sceny model → obciążenia → równania → rozwiązanie → interpretacja → kontrola).

Warianty konfigurują zadanie przez `task.ts` (`inputs` + `meta`), a sceny zapisują w `solution.data.ts`.

## Wzorce do naśladowania

- Belki, ramy, reakcje: `src/content/solutions/ex-statyka-reakcje-konstrukcji/animation.tsx`
- Układ zbieżny: `src/content/solutions/ex-statyka-zadania-zbiezne/animation.tsx`
- 3D / wał: `src/content/solutions/ex-statyka-waly-lozyska/animation.tsx`
- Kratownica: `src/content/solutions/ex-statyka-kratownica-przyklad/animation.tsx`
- Tarcie / hamulec: `src/content/solutions/ex-statyka-hamulce-tarcie/animation.tsx`, `ex-statyka-tarcie-suche`
- Centroidy: `src/content/solutions/ex-statyka-centroidy-zadania-2/animation.tsx`
- Osiowe: `src/content/solutions/cw1-1/animation.tsx`

Wszystkie te pliki mają wspólny schemat: `local('figure')` → `local('figure-canvas')` → `<svg viewBox="0 0 460 340">`, własne kolory, markery, wymiary, etykiety i warunkowe odsłanianie elementów na podstawie `index` oraz `sceneProgress`. Wejścia nowych elementów domykają się w pierwszych ~25% sceny (współczynnik `sceneProgress * 4` w `revealAt` i odpowiednikach); ruch ciągły (pulsy, obroty, symulacje) pozostaje rozłożony na całą scenę.

Zadania przestrzenne B i G oraz ćwiczenia ze statyki przestrzennej używają `src/components/solution-figures/ThreeSolutionScene.tsx`. Komponent zachowuje ten sam kontrakt `SolutionAnimationProps`, obsługuje odsłanianie przez `visibleAt`/`hideAt`, pulsowanie i obrót przez `playing`, rzutowane etykiety, orbitowanie, zoom, automatyczny obrót i reset kamery. Powtarzalne modele wałów korzystają z `components/solution-figures/shaft-three.tsx`, a wspólne kolory i prymitywy z `components/solution-figures/three-statics.tsx`.

## Wspólne prymitywy

`src/components/solution-figures/statics-schematic.tsx` eksportuje:

- `SCHEMA` — paleta kolorów,
- `SchematicFrame` — wrapper SVG,
- `Arrow`, `ReactionArrow` — strzałki z markerem,
- `Dimension`, `Label`, `Hatch`,
- `PinSupport`, `RollerSupport`, `FixedSupport`,
- `Beam`, `Member`, `Node`, `Pulley`,
- `Reveal`, `revealAt`, `clamp01`, `smooth`.

Można ich używać, ale nie jest to obowiązkowe. Ważne, aby animacja była rysowana wektorowo, a nie jako `<image>`.

## Co zmienić w każdym zadaniu

Dla każdego ID `zad-X-NN`:

1. `src/content/solutions/zad-X-NN/animation.tsx` — napisz własny komponent `SolutionAnimation` (lub nazwany, np. `AxialTaskAnimation`) przyjmujący `SolutionAnimationProps`. Narysuj konkretny schemat zadania: geometrię, podpory, obciążenia, wymiary, osie, reakcje, siły w prętach, momenty, tarcie, centroid itd. Elementy mają się pojawiać etapami zgodnie z `index`. Dodaj subtelny ruch (`motion`) związany z `sceneProgress`/`playing` (np. pulsujące obciążenie, obracający się bęben, przesuwający się klocek, wypełnianie przekroju).
2. `src/content/solutions/zad-X-NN/solution.data.ts` — podmień import animacji na nowy komponent. Zachowaj `id`, `given`, `result` i resztę danych.
3. Opcjonalnie rozszerz sceny w `solution.data.ts` (lokalna tablica `scenes`), aby prawy panel miał 7–9 scen z:
   - opisem, co dokładnie widać na schemacie,
   - pełnym równaniem i danymi pośrednimi,
   - interpretacją znaków i jednostek,
   - niezależną kontrolą.
     Jeśli nadpisujesz sceny, nie zmieniaj wyniku liczbowego ani solvera.
4. `content.mdx` — może zostać; ewentualnie dopisz jedno zdanie o tym, co pokazuje animacja.

## Zakazy

- Nie używaj `<image href="/solution-sources/...">` w nowych animacjach.
- Nie zmieniaj solverów, danych wejściowych, wyników liczbowych ani ID.
- Nie modyfikuj innych zadań, wspólnych `*-tasks.ts` (poza ewentualnym lokalnym nadpisaniem scen w `solution.data.ts`), `scripts/`, `SOURCE_MAP.md`.
- Nie dodawaj allowlist/baseline do testów layoutu.
- Nie zostawiaj tymczasowych plików `*.browser.test.tsx`.

## Wymagania jakości

- Lewy SVG: brak kolizji tekst/tekst, tekst/shape, brak wychodzenia poza viewBox.
- Prawy panel: brak overflow; sceny mogą być dłuższe, ale muszą się mieścić.
- Czytelne etykiety (fontSize 9–12), kolory spójne z `SCHEMA`.
- Każda scena pokazuje inny etap: model → geometria/obciążenia → równania → rozwiązanie → znaki → kontrola.
- Animacja ma być zrozumiała bez źródłowego zdjęcia.

## Weryfikacja

- `npx vitest run <test-batchu>` — testy numeryczne i podpięcia.
- `npx tsc --noEmit`.
- Targeted Chromium: tymczasowy plik `*.browser.test.tsx` filtrujący tylko twoje ID, `npx vitest run --config vitest.browser.config.ts <plik>`, potem usuń plik.
- Nie uruchamiaj `npm run build` ani pełnego `npm run test:browser`.
