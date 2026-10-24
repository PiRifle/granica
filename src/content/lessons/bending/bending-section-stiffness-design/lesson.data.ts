import type { LessonData } from '../../../model'

export default {
  "id": "bending-section-stiffness-design",
  "moduleId": "bending",
  "number": 7,
  "title": "Dobór przekroju i kontrola sztywności",
  "shortTitle": "Dobór przekroju",
  "description": "Dobierz przekrój na moment zginający, a następnie sprawdź dopuszczalne ugięcie belki.",
  "duration": 10,
  "eyebrow": "Wytrzymała, ale czy dostatecznie sztywna?",
  "formula": "W_z \\geq \\frac{M_{max}}{\\sigma_{dop}} \\qquad f_{max} = \\frac{P L^3}{48EI} \\leq f_{dop}",
  "formulaNote": "Wzór na f dotyczy belki swobodnie podpartej z siłą P na środku. σdop powinno uwzględniać bezpieczeństwo, a E i I należy podstawiać w zgodnych jednostkach.",
  "insight": "Warunek wytrzymałości wyznacza wymagane W, a sztywności wymagane I. Po wyborze przekroju sprawdź oba; większa wysokość zwykle bardzo skutecznie zwiększa I.",
  "lab": "sections",
  "outcomes": [
    "W1 — analizuje schematy belek, podpory i wewnętrzne siły przekrojowe",
    "W2 — rozróżnia przypadki obciążenia oraz czyste zginanie i zginanie z udziałem siły tnącej",
    "W3 — wyjaśnia wpływ geometrii przekroju na rozkład naprężeń i ugięcie",
    "U1 — oblicza reakcje, funkcje T(x) i M(x) oraz naprężenia zginające",
    "U2 — wykorzystuje koło Mohra do analizy stanu naprężenia w zginanym elemencie",
    "U3 — dobiera przekrój belki z warunków bezpieczeństwa, wytrzymałości i sztywności"
  ],
  "questions": [
    {
      "question": "Dla Mmax = 16 kN·m i σdop = 160 MPa minimalny wskaźnik wytrzymałości przekroju wynosi:",
      "answers": [
        "10 cm³",
        "100 cm³",
        "1000 cm³"
      ],
      "correct": 1,
      "hint": "Zamień M na 16 000 000 N·mm; wynik w mm³ podziel przez 1000, aby otrzymać cm³.",
      "explanation": "Wmin = 16 000 000/160 = 100 000 mm³ = 100 cm³. Przyjęty przekrój musi mieć W co najmniej takiej wartości."
    },
    {
      "question": "Przekrój spełnia warunek σmax ≤ σdop, ale ugięcie przekracza fdop. Co to oznacza?",
      "answers": [
        "Przekrój jest nieprzyjęty; trzeba zwiększyć sztywność EI",
        "Przekrój jest poprawny, bo wytrzymałość zawsze unieważnia sztywność",
        "Należy zmniejszyć I, aby ograniczyć ugięcie"
      ],
      "correct": 0,
      "hint": "Oba warunki muszą być spełnione jednocześnie.",
      "explanation": "Naprężeniowy warunek bezpieczeństwa nie zastępuje kontroli odkształcalności. Ugięcie maleje ze wzrostem EI, więc można dobrać większy I lub inny materiał/schemat."
    },
    {
      "question": "Dla prostokąta o stałej szerokości b wysokość h wzrasta dwukrotnie. Jak zmieni się I = bh³/12 i ugięcie przy pozostałych danych bez zmian?",
      "answers": [
        "I wzrośnie 8 razy, ugięcie spadnie 8 razy",
        "I wzrośnie 2 razy, ugięcie spadnie 2 razy",
        "I wzrośnie 4 razy, ugięcie spadnie 4 razy"
      ],
      "correct": 0,
      "hint": "h jest w trzeciej potędze, a f jest odwrotnie proporcjonalne do I.",
      "explanation": "I rośnie 2³ = 8 razy. Ponieważ f = PL³/(48EI), przy stałych P, L i E ugięcie spada ośmiokrotnie."
    }
  ],
  "workedExample": {
    "given": "Belka swobodnie podparta L = 4 m, P = 10 kN na środku, E = 210 GPa, σdop = 160 MPa, fdop = L/250 = 16 mm. Rozważ przekrój b = 50 mm, h = 100 mm.",
    "steps": [
      "Mmax = PL/4 = 10·4/4 = 10 kN·m = 10 000 000 N·mm.",
      "Wymagane Wmin = Mmax/σdop = 10 000 000/160 = 62 500 mm³ = 62,5 cm³.",
      "Wymagane Imin = PL³/(48Efdop) = 10 000·4000³/(48·210 000·16) = 3 968 254 mm⁴.",
      "Dla przekroju W = bh²/6 = 50·100²/6 = 83 333 mm³ > Wmin.",
      "Dla przekroju I = bh³/12 = 50·100³/12 = 4 166 667 mm⁴ > Imin.",
      "Kontrola: σmax = 10 000 000/83 333 = 120 MPa < 160 MPa; fmax = PL³/(48EI) = 15,24 mm < 16 mm."
    ],
    "result": "Przekrój 50 × 100 mm spełnia oba warunki: σmax = 120 MPa i fmax ≈ 15,24 mm."
  }
} satisfies LessonData
