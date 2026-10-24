import type { LessonData } from '../../../model'

export default {
  "id": "strain-state-epsilon-gamma",
  "moduleId": "strain-state",
  "number": 1,
  "title": "Odkształcenia: długości i kąty",
  "shortTitle": "ε i γ",
  "description": "Rozróżnij względną zmianę długości od zniekształcenia postaciowego i poprawnie używaj bezwymiarowych wielkości.",
  "duration": 7,
  "eyebrow": "Jak zmienia się kształt",
  "formula": "\\varepsilon_x=\\frac{\\Delta L_x}{L_{0x}},\\qquad \\gamma_{xy}=\\frac{\\partial u}{\\partial y}+\\frac{\\partial v}{\\partial x},\\qquad \\varepsilon_{xy}=\\frac{\\gamma_{xy}}{2}",
  "formulaNote": "Dodatnie ε oznacza wydłużenie. γ jest odkształceniem inżynierskim w radianach; składowa tensorowa εxy jest połową γxy. Przy małych odkształceniach u i v oznaczają przemieszczenia w kierunkach x i y.",
  "insight": "Zapis 500 µε oznacza 500·10⁻⁶ = 0,0005, czyli 0,05%. Nie należy wstawiać do wzorów liczby 500 bez przeliczenia ani utożsamiać γxy z εxy.",
  "lab": "tensileTest",
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
      "question": "Odcinek o długości 200 mm wydłużył się o 0,30 mm. Ile wynosi odkształcenie?",
      "answers": [
        "0,0015",
        "0,015",
        "1,5"
      ],
      "correct": 0,
      "hint": "Podziel zmianę długości przez długość początkową, używając tych samych jednostek.",
      "explanation": "ε = 0,30/200 = 0,0015 = 1500·10⁻⁶ = 1500 µε. Odpowiada to wydłużeniu względnemu 0,15%.",
      "outcome": "W1"
    },
    {
      "question": "Początkowo prosty kąt zmniejszył się o 0,002 rad przy dodatniej konwencji ścinania. Ile wynoszą γxy i tensorowe εxy?",
      "answers": [
        "γxy = 0,002, εxy = 0,001",
        "γxy = 0,001, εxy = 0,002",
        "Obie wielkości wynoszą 0,002"
      ],
      "correct": 0,
      "hint": "Składowa tensorowa jest połową odkształcenia inżynierskiego.",
      "explanation": "Inżynierskie γxy opisuje pełną zmianę kąta i wynosi 0,002 rad. Do tensora wpisujemy εxy = γxy/2 = 0,001.",
      "outcome": "W1"
    },
    {
      "question": "Tensometr wskazuje −800 µε. Co oznacza znak i wartość?",
      "answers": [
        "Skrócenie względne 0,0008",
        "Wydłużenie względne 0,08",
        "Zmianę kąta o 800 rad"
      ],
      "correct": 0,
      "hint": "Przedrostek µ oznacza milionową część, a minus skrócenie.",
      "explanation": "−800 µε = −800·10⁻⁶ = −0,0008, czyli skrócenie o 0,08% długości pomiarowej. Nie jest to miara kątowa.",
      "outcome": "W1"
    }
  ],
  "workedExample": {
    "given": "Baza pomiarowa L0 = 50 mm wydłużyła się o 0,075 mm, a prosty kąt zmienił się tak, że γxy = 0,0012 rad.",
    "steps": [
      "Odkształcenie liniowe: εx = 0,075/50 = 0,0015.",
      "Zapis w mikroodkształceniach: 0,0015·10⁶ = 1500 µε.",
      "Odkształcenie postaciowe inżynierskie pozostaje γxy = 0,0012 = 1200 µrad.",
      "Składowa tensorowa: εxy = 0,0012/2 = 0,0006."
    ],
    "result": "εx = 1500 µε (wydłużenie 0,15%), γxy = 0,0012 rad, a εxy = 0,0006. Są to różne miary deformacji i nie wolno ich mieszać."
  }
} satisfies LessonData
