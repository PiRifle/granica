import type { LessonData } from '../../../model'

export default {
  "id": "criteria-safety-factor",
  "moduleId": "criteria",
  "number": 7,
  "title": "Współczynnik bezpieczeństwa: ile zapasu ma element?",
  "shortTitle": "Współczynnik n",
  "description": "Rozróżniaj wytrzymałość od sztywności, obliczaj rzeczywisty zapas i wyznaczaj naprężenie dopuszczalne.",
  "duration": 10,
  "eyebrow": "Bezpieczeństwo to warunek",
  "formula": "n_{rz} = \\frac{R_e}{\\sigma_{red}} \\geq n_{wym} \\qquad k = \\frac{R_e}{n_{wym}}",
  "formulaNote": "Dla materiału kruchego granicą może być wytrzymałość Rm zamiast Re. Warunek n ≥ 1 dotyczy tylko sytuacji, gdy wymagany współczynnik wynosi 1.",
  "insight": "Małe odkształcenie nie dowodzi dużego zapasu wytrzymałości. Warunki σred ≤ k i ugięcia lub przemieszczenia sprawdza się niezależnie.",
  "lab": "safety",
  "outcomes": [
    "W1 — analizuję element konstrukcji i wskazuję przekrój oraz punkt decydujący o bezpieczeństwie.",
    "W2 — rozróżniam przypadki wytrzymałościowe i dobieram hipotezę do materiału oraz stanu naprężenia.",
    "W3 — uwzględniam geometrię przekroju przy wyznaczaniu naprężeń normalnych i stycznych.",
    "U1 — obliczam naprężenie zredukowane i sprawdzam warunek wytrzymałości z zachowaniem jednostek.",
    "U2 — stosuję koło Mohra do wyznaczenia naprężeń głównych i maksymalnego naprężenia stycznego.",
    "U3 — wyznaczam współczynnik bezpieczeństwa i oceniam, czy element spełnia przyjęty warunek."
  ],
  "questions": [
    {
      "question": "Materiał ma Re = 300 MPa, wymagane n = 2. Jakie jest naprężenie dopuszczalne?",
      "answers": [
        "150 MPa",
        "300 MPa",
        "600 MPa"
      ],
      "correct": 0,
      "hint": "Podziel granicę przez wymagany współczynnik.",
      "explanation": "k = Re/n = 300/2 = 150 MPa. Dopuszczalna wartość jest mniejsza od granicy, ponieważ pozostawiamy zapas.",
      "outcome": "U3"
    },
    {
      "question": "Dla Rm = 400 MPa i σred = 250 MPa materiał kruchy ma zapas n = 1,6. Co to oznacza?",
      "answers": [
        "Warunek n ≥ 2 nie jest spełniony",
        "Element na pewno ma za małą sztywność",
        "Naprężenie przekracza Rm"
      ],
      "correct": 0,
      "hint": "Porównaj rzeczywisty zapas z wymaganym i osobno naprężenie z granicą.",
      "explanation": "250 < 400 MPa, więc granica nie jest przekroczona, ale 1,6 < 2, więc wymagany zapas nie jest zapewniony. O sztywności ten wynik nic nie mówi.",
      "outcome": "U3"
    },
    {
      "question": "Jak zmieni się rzeczywiste n, jeśli przy niezmienionym materiale σred wzrośnie z 100 do 125 MPa?",
      "answers": [
        "Wzrośnie o 25%",
        "Spadnie do 80% poprzedniej wartości",
        "Nie zmieni się"
      ],
      "correct": 1,
      "hint": "n jest odwrotnie proporcjonalne do σred.",
      "explanation": "Stosunek nowego i starego zapasu wynosi 100/125 = 0,8. Wzrost wytężenia o 25% zmniejsza zapas o 20%, a nie o 25%.",
      "outcome": "U3"
    }
  ],
  "workedExample": {
    "given": "Stal ma Re = 355 MPa. W elemencie σHMH = 142 MPa, a wymagane n ≥ 2,2.",
    "steps": [
      "Rzeczywisty zapas: nrz = 355/142 = 2,50.",
      "Porównanie: 2,50 ≥ 2,2, więc warunek jest spełniony.",
      "Dopuszczalne naprężenie: k = 355/2,2 = 161,36 MPa.",
      "Kontrola alternatywna: 142 ≤ 161,36 MPa."
    ],
    "result": "Element spełnia warunek bezpieczeństwa; zapas wynosi około 2,50."
  }
} satisfies LessonData
