import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'cw1-1',
  title: 'Pręt o stałym przekroju z trzema siłami',
  duration: 9,
  given: [
    'P = 20 kN; wszystkie trzy siły są skierowane w dół',
    'A = 10 cm² = 1000 mm²',
    'Długości odcinków od góry: 100 mm, 100 mm i 200 mm',
    'E = 200 GPa, k = 100 MPa, ΔL_dop = 0,12 mm',
    'Przyjmujemy dodatni znak N i σ dla rozciągania',
  ],
  result:
    'Od góry: N = 80, 40, 20 kN oraz σ = 80, 40, 20 MPa. Wymagane pole decydującego odcinka to 800 mm², a przyjęte 1000 mm² daje zapas. Wydłużenie całkowite 0,08 mm < 0,12 mm, więc oba warunki są spełnione, a o wymiarze decyduje wytrzymałość.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.AxialDesignThreeForcesAnimation }))),
  figure: {
    kind: 'axial',
    top: 'fixed',
    bottom: 'free',
    units: { N: 'kN', σ: 'MPa', A: 'mm²', ΔL: 'mm' },
    segments: [
      { id: 'g', label: 'górny', length: 100, area: 1000, n: 80, sigma: 80, deltaL: 0.04 },
      { id: 's', label: 'środkowy', length: 100, area: 1000, n: 40, sigma: 40, deltaL: 0.02 },
      { id: 'd', label: 'dolny', length: 200, area: 1000, n: 20, sigma: 20, deltaL: 0.02 },
    ],
    loads: [
      { node: 1, value: 40, label: '2P = 40 kN' },
      { node: 2, value: 20, label: 'P = 20 kN' },
      { node: 3, value: 20, label: 'P = 20 kN' },
    ],
    note: 'Pole 1000 mm² jest stałe, dlatego wykres σ ma te same poziomy co wykres N, a wydłużenie zależy od długości odcinków.',
  },
  scenes: [
    {
      title: 'Model, dane i obciążenia',
      narration:
        'Pręt traktujemy jako osiowy: siły działają wzdłuż jego osi, więc w przekrojach powstaje tylko siła podłużna N. Odcinek górny ma długość 100 mm, środkowy 100 mm, a dolny 200 mm. Obciążenia wynoszą kolejno 2P, P i P, czyli 40, 20 i 20 kN. Do pełnej kontroli przyjmujemy E = 200 GPa, k = 100 MPa i ΔL_dop = 0,12 mm.',
      formula: 'P=20\\ \\text{kN},\\qquad 2P=40\\ \\text{kN},\\qquad A=1000\\ \\text{mm}^2',
      caption: 'Trzy siły w dół i jedno utwierdzenie na górze; pole przekroju jest stałe.',
      visual: 'axial',
      focus: { metric: 'model' },
      emphasis: 'Długości odcinków nie wpływają na N ani σ; będą potrzebne dopiero do obliczania wydłużeń.',
    },
    {
      title: 'Reakcja i wykres siły podłużnej',
      narration:
        'Jedyna reakcja R musi równoważyć wszystkie siły zewnętrzne. Przy zwrocie w górę jako dodatnim suma sił daje R minus suma obciążeń, więc R = 4P = 80 kN. Metoda przekrojów daje od dołu N = 20, 40 i 80 kN. Przy przejściu przez siłę skupioną wykres skacze o jej wartość.',
      formula: 'R=4P=80\\ \\text{kN},\\qquad N_d=20\\ \\text{kN},\\quad N_s=40\\ \\text{kN},\\quad N_g=80\\ \\text{kN}',
      caption: 'Wykres N: trzy prostokątne stopnie po dodatniej stronie osi.',
      visual: 'diagram',
      focus: { metric: 'N' },
      emphasis: 'Skok o 40 kN odpowiada sile 2P, a każdy skok o 20 kN sile P.',
    },
    {
      title: 'Naprężenia i warunek wytrzymałości',
      narration:
        'Dzielimy siłę podłużną każdego odcinka przez to samo pole. Dodatni wynik oznacza naprężenie rozciągające. Największa wartość występuje u góry, gdzie przekrój przenosi sumę wszystkich trzech obciążeń: 80 MPa. To mniej niż k = 100 MPa, więc wykorzystanie wytrzymałości wynosi 80%.',
      formula:
        '\\sigma_g=80\\ \\text{MPa},\\quad \\sigma_s=40\\ \\text{MPa},\\quad \\sigma_d=20\\ \\text{MPa},\\qquad \\sigma_{\\max}=80\\ \\text{MPa}\\le k=100\\ \\text{MPa}',
      caption: 'Naprężenia od góry: +80, +40 i +20 MPa; granica wynosi 100 MPa.',
      visual: 'axial',
      focus: { metric: 'σ' },
      emphasis: 'O decydującym przekroju rozstrzyga największy iloraz N/A, a nie sama siła.',
    },
    {
      title: 'Dobór pola przekroju',
      narration:
        'Z warunku σ ≤ k wynika wymagane pole A_req = N/k. Dla góry otrzymujemy 80 000/100 = 800 mm², dla środka 400 mm², a dla dołu 200 mm². Przyjęte pole 1000 mm² jest większe od każdego wymagania, ale najmniejszy zapas ma odcinek górny.',
      formula: 'A_{\\mathrm{req},g}=\\frac{80\\,000}{100}=800\\ \\text{mm}^2\\le A=1000\\ \\text{mm}^2',
      caption: 'A_req = 800, 400 i 200 mm²; stałe A = 1000 mm² spełnia wszystkie warunki.',
      visual: 'axial',
      focus: { metric: 'A' },
      emphasis: 'Pole dobiera się dla najbardziej wytężonego odcinka, a nie dla średniej siły w pręcie.',
    },
    {
      title: 'Wydłużenie pręta',
      narration:
        'Wydłużenia liczymy z ΔL_i = N_iL_i/(E A). Odcinek górny daje 0,04 mm, środkowy 0,02 mm, a dolny 0,02 mm. Suma wynosi 0,08 mm. Największy udział ma góra, mimo że jej długość jest krótsza od dolnej, bo przenosi największą siłę.',
      formula:
        '\\Delta L=\\frac{80\\,000\\cdot100+40\\,000\\cdot100+20\\,000\\cdot200}{200\\,000\\cdot1000}=0{,}08\\ \\text{mm}',
      caption: 'ΔL₁ = 0,04 mm, ΔL₂ = 0,02 mm, ΔL₃ = 0,02 mm; suma 0,08 mm.',
      visual: 'axial',
      focus: { metric: 'ΔL' },
      emphasis: 'Wydłużenie w figurze jest pokazane w skali poglądowej; rzeczywista wartość to 0,08 mm.',
    },
    {
      title: 'Kontrola wytrzymałości i sztywności',
      narration:
        'Naprężenie decydującego odcinka wynosi 80 MPa, czyli 80% granicy 100 MPa. Całkowite wydłużenie 0,08 mm to 67% wartości dopuszczalnej 0,12 mm. Oba warunki są spełnione, a większe wykorzystanie występuje przy wytrzymałości, więc to ona decyduje o projekcie.',
      formula:
        '\\sigma_{\\max}=80\\ \\text{MPa}\\le100\\ \\text{MPa},\\qquad \\Delta L=0{,}08\\ \\text{mm}\\le0{,}12\\ \\text{mm}',
      caption: 'Oba warunki spełnione; decyduje wytrzymałość, bo jej wykorzystanie jest większe.',
      visual: 'diagram',
      focus: { metric: 'check' },
      emphasis: 'Warunki są niezależne: małe wydłużenie nie zwalnia z kontroli naprężeń.',
    },
  ],
} satisfies SolutionData
