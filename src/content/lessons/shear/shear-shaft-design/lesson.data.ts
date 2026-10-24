import type { LessonData } from '../../../model'

export default {
  "id": "shear-shaft-design",
  "moduleId": "shear",
  "number": 7,
  "title": "Dobór średnicy: wytrzymałość i sztywność",
  "shortTitle": "Dobór wału",
  "description": "Wyznacz średnicę z dwóch niezależnych warunków i wybierz większą wartość.",
  "duration": 10,
  "eyebrow": "Dwa warunki, jedna decyzja",
  "formula": "d \\geq \\sqrt[3]{\\frac{16T}{\\pi\\tau_{dop}}} \\qquad d \\geq \\sqrt[4]{\\frac{32TL}{\\pi G\\varphi_{dop}}}",
  "formulaNote": "Wzory dotyczą wału pełnego. τdop powinno uwzględniać wymagane bezpieczeństwo, a φdop trzeba podstawić w radianach.",
  "insight": "Oblicz d osobno z obu warunków, wybierz większą średnicę, zaokrąglij ją w górę do dostępnego wymiaru i sprawdź ponownie naprężenie oraz kąt.",
  "lab": "hollowShaft",
  "outcomes": [
    "W1 — analizuje elementy ścinane i skręcane oraz wskazuje przekroje przenoszące obciążenie",
    "W2 — rozróżnia przypadki ścinania technicznego i swobodnego skręcania",
    "W3 — wyjaśnia wpływ geometrii przekroju na naprężenia i sztywność",
    "U1 — oblicza naprężenia styczne, kąt skręcenia i siły w przekrojach",
    "U2 — wykorzystuje koło Mohra do opisu czystego ścinania",
    "U3 — dobiera średnicę wału z warunków wytrzymałości i sztywności z zachowaniem bezpieczeństwa"
  ],
  "questions": [
    {
      "question": "Z warunku wytrzymałości wyszło d ≥ 42 mm, a ze sztywności d ≥ 48 mm. Jaką minimalną średnicę należy przyjąć przed zaokrągleniem do wymiaru katalogowego?",
      "answers": [
        "42 mm",
        "45 mm jako średnią",
        "48 mm"
      ],
      "correct": 2,
      "hint": "Przyjęta średnica musi spełniać jednocześnie obie nierówności.",
      "explanation": "Średnica 48 mm spełnia oba warunki, natomiast 42 mm nie spełnia warunku sztywności. Nie uśredniamy wymaganych minimów — wybieramy większą wartość.",
      "outcome": "U3"
    },
    {
      "question": "Po doborze średnicy katalogowej większej od obliczonej wartości minimalnej należy:",
      "answers": [
        "Sprawdzić ponownie τmax i φ dla przyjętego wymiaru",
        "Pominąć obliczenia, bo większy wał zawsze działa tak samo",
        "Sprawdzić wyłącznie masę wału"
      ],
      "correct": 0,
      "hint": "Projekt kończy się weryfikacją rzeczywiście przyjętego przekroju.",
      "explanation": "Dla przyjętego d oblicza się rzeczywiste τmax i φ oraz porównuje je z granicami. Większa średnica zmniejsza obie wielkości, ale sprawdzenie potwierdza poprawność jednostek i obliczeń.",
      "outcome": "U3"
    },
    {
      "question": "Do warunku sztywności podstawiono φdop = 1°, bez zamiany na radiany. Jaki to błąd?",
      "answers": [
        "Brak błędu, bo wzór zawsze wymaga stopni",
        "Błąd jednostek; należy użyć 0,01745 rad",
        "Błąd znaku; kąt musi być ujemny"
      ],
      "correct": 1,
      "hint": "Wzór φ = TL/(GJ_o) daje wynik w radianach.",
      "explanation": "Dopuszczalny kąt musi być wyrażony w tej samej miarze co obliczany. 1° = π/180 = 0,01745 rad; podstawienie liczby 1 zamiast 0,01745 da błędną średnicę.",
      "outcome": "U3"
    }
  ],
  "workedExample": {
    "given": "Wał pełny: T = 1,5 kN·m, L = 2 m, G = 80 GPa, τdop = 60 MPa, φdop = 1° = 0,017453 rad.",
    "steps": [
      "Przyjmij T = 1 500 000 N·mm, L = 2000 mm i G = 80 000 MPa.",
      "Z wytrzymałości: d ≥ [16·1 500 000/(π·60)]^(1/3) = 50,3 mm.",
      "Ze sztywności: d ≥ [32·1 500 000·2000/(π·80 000·0,017453)]^(1/4) = 68,4 mm.",
      "Warunek sztywności jest decydujący. Przyjmij przykładowo d = 70 mm.",
      "Kontrola: τmax = 16T/(π·70³) = 22,3 MPa < 60 MPa; φ = TL/(GJ_o) ≈ 0,0159 rad = 0,91° < 1°."
    ],
    "result": "Przyjęto d = 70 mm; oba warunki są spełnione, a decyduje sztywność."
  }
} satisfies LessonData
