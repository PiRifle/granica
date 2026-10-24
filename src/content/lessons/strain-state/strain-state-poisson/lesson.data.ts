import type { LessonData } from '../../../model'

export default {
  "id": "strain-state-poisson",
  "moduleId": "strain-state",
  "number": 2,
  "title": "Efekt Poissona: dlaczego pręt robi się cieńszy",
  "shortTitle": "Współczynnik Poissona",
  "description": "Powiąż odkształcenie osiowe z poprzecznym i odróżnij zmianę przekroju od utraty objętości.",
  "duration": 8,
  "eyebrow": "Jedno rozciąganie, trzy reakcje",
  "formula": "\\nu=-\\frac{\\varepsilon_{poprz}}{\\varepsilon_{osi}},\\qquad \\varepsilon_y=\\varepsilon_z=-\\nu\\frac{\\sigma_x}{E}\\quad\\text{dla jednoosiowego }\\sigma_x",
  "formulaNote": "Dla typowego ν > 0 dodatnie rozciąganie osiowe daje ujemne odkształcenia poprzeczne. Dla izotropowych materiałów liniowo-sprężystych zwykle 0 ≤ ν < 0,5; istnieją też materiały auksetyczne o ν < 0.",
  "insight": "Przy ν bliskim 0,5 materiał jest prawie nieściśliwy w zakresie małych odkształceń. Poprzeczne skurcze nie oznaczają same w sobie zniszczenia — są częścią sprężystej odpowiedzi materiału.",
  "lab": "hooke",
  "outcomes": [
    "W1 — analizuje odkształcenia liniowe i postaciowe w elemencie konstrukcyjnym",
    "W2 — rozpoznaje sprężyste przypadki wytrzymałościowe z udziałem efektu Poissona",
    "W3 — wiąże geometrię, zmianę objętości i położenie czujników z mierzonymi wielkościami",
    "U1 — oblicza odkształcenia z uogólnionego prawa Hooke’a i danych tensometrycznych",
    "U2 — przekształca pomiary rozety w koło Mohra odkształceń i wielkości główne",
    "U3 — dobiera parametry materiałowe i geometryczne z uwagi na bezpieczeństwo oraz sztywność"
  ],
  "questions": [
    {
      "question": "Pręt ma εx = 0,002, a ν = 0,30. Ile wynoszą εy i εz przy jednoosiowym rozciąganiu?",
      "answers": [
        "−0,0006",
        "+0,0006",
        "−0,006"
      ],
      "correct": 0,
      "hint": "Odkształcenie poprzeczne to −ν razy odkształcenie osiowe.",
      "explanation": "εy = εz = −0,30·0,002 = −0,0006, czyli −600 µε. Oba kierunki poprzeczne ulegają skróceniu.",
      "outcome": "U1"
    },
    {
      "question": "Mierzono εosi = 1200 µε i εpoprz = −360 µε. Jaki jest współczynnik Poissona?",
      "answers": [
        "0,30",
        "3,33",
        "−0,30"
      ],
      "correct": 0,
      "hint": "Weź minus iloraz odkształcenia poprzecznego i osiowego.",
      "explanation": "ν = −(−360)/1200 = 0,30. Znak minus we wzorze powoduje, że dla zwykłego materiału ν jest dodatnie.",
      "outcome": "U1"
    },
    {
      "question": "Co oznacza ν bliskie 0,5 dla izotropowego materiału sprężystego?",
      "answers": [
        "Bardzo małą zmianę objętości przy odkształceniu",
        "Brak odkształceń poprzecznych",
        "Zerowy moduł Younga"
      ],
      "correct": 0,
      "hint": "Dla małych odkształceń zmiana objętości zależy od sumy trzech ε.",
      "explanation": "Przy jednoosiowym obciążeniu suma wynosi εx(1 − 2ν). Dla ν → 0,5 dąży ona do zera, czyli materiał staje się prawie nieściśliwy; odkształcenia poprzeczne nadal występują.",
      "outcome": "W2"
    }
  ],
  "workedExample": {
    "given": "Stalowy pręt o ν = 0,29 i średnicy 20 mm rozciągano tak, że εx = 1000 µε.",
    "steps": [
      "Odkształcenie osiowe w zapisie bezwymiarowym: εx = 0,001.",
      "Odkształcenie średnicy: εd = −ν εx = −0,29·0,001 = −0,00029.",
      "Zmiana średnicy: Δd = εd·d0 = −0,00029·20 = −0,0058 mm."
    ],
    "result": "Średnica zmniejsza się o 0,0058 mm, czyli 5,8 µm, do około 19,9942 mm. Jest to skutek sprężystego efektu Poissona."
  }
} satisfies LessonData
