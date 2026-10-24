import type { LessonData } from '../../../model'

export default {
  "id": "bending-beams-reactions",
  "moduleId": "bending",
  "number": 1,
  "title": "Belki i reakcje podporowe",
  "shortTitle": "Belki i reakcje",
  "description": "Zbuduj schemat statyczny i wyznacz reakcje z równowagi sił oraz momentów.",
  "duration": 7,
  "eyebrow": "Najpierw cała belka",
  "formula": "\\sum F_y = 0 \\qquad \\sum M_A = 0",
  "formulaNote": "Dla belki w płaszczyźnie potrzebny jest także warunek ΣF_x = 0. Zwroty reakcji przyjmij zgodnie z przyjętymi znakami.",
  "insight": "Reakcje zależą od położenia siły, nie tylko od jej wartości. Bliższa podpora przejmuje większą część obciążenia.",
  "lab": "reactions",
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
      "question": "Na belce swobodnie podpartej o L = 6 m siła P = 24 kN działa 2 m od lewej podpory A. Ile wynoszą reakcje pionowe?",
      "answers": [
        "RA = 8 kN, RB = 16 kN",
        "RA = 16 kN, RB = 8 kN",
        "RA = RB = 12 kN"
      ],
      "correct": 1,
      "hint": "Z momentów względem A: RB·6 = P·2; następnie RA = P − RB.",
      "explanation": "RB = 24·2/6 = 8 kN, a RA = 24−8 = 16 kN. Siła jest bliżej A, dlatego lewa reakcja jest większa.",
      "outcome": "U1"
    },
    {
      "question": "Jeżeli po rozwiązaniu równań reakcja ma znak ujemny, co to oznacza?",
      "answers": [
        "Rzeczywisty zwrot jest przeciwny do założonego",
        "Belka na pewno jest niestateczna",
        "Obciążenie musi być równe zero"
      ],
      "correct": 0,
      "hint": "Znak odnosi się do zwrotu przyjętego przed obliczeniami.",
      "explanation": "Ujemna reakcja ma wartość równą modułowi wyniku, lecz działa przeciwnie do strzałki przyjętej na schemacie. Sam znak nie przesądza o stateczności.",
      "outcome": "W1"
    },
    {
      "question": "Dlaczego w belce z siłą przyłożoną poza środkiem reakcje zwykle nie są równe?",
      "answers": [
        "Ponieważ muszą spełniać zarówno równowagę sił, jak i momentów",
        "Ponieważ prawa podpora zawsze przenosi więcej",
        "Ponieważ suma reakcji nie zależy od obciążenia"
      ],
      "correct": 0,
      "hint": "Sama suma sił nie określa podziału obciążenia między podpory.",
      "explanation": "Równowaga sił daje RA + RB = P, a równowaga momentów określa ich podział według ramion siły. Dlatego położenie P zmienia reakcje.",
      "outcome": "W1"
    }
  ],
  "workedExample": {
    "given": "Belka AB o L = 6 m jest podparta przegubowo w A i przesuwnie w B. Pionowa siła P = 24 kN działa w odległości a = 2 m od A.",
    "steps": [
      "Z równowagi momentów względem A: ΣM_A = RB·6 − 24·2 = 0.",
      "Stąd RB = 48/6 = 8 kN.",
      "Z równowagi sił pionowych: RA + RB − 24 = 0, więc RA = 16 kN.",
      "Kontrola momentów względem B: RA·6 − 24·4 = 16·6−96 = 0."
    ],
    "result": "RA = 16 kN w górę, RB = 8 kN w górę; reakcja pozioma w A wynosi zero."
  }
} satisfies LessonData
