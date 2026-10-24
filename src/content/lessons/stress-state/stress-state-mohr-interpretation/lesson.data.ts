import type { LessonData } from '../../../model'

export default {
  "id": "stress-state-mohr-interpretation",
  "moduleId": "stress-state",
  "number": 7,
  "title": "Od koła do decyzji inżynierskiej",
  "shortTitle": "Interpretacja i dobór",
  "description": "Połącz odczyt koła Mohra z warunkiem wytrzymałości, kierunkiem pękania i świadomym doborem marginesu bezpieczeństwa.",
  "duration": 10,
  "eyebrow": "Liczby podejmują decyzję",
  "formula": "n_\\sigma=\\frac{R_e}{\\sigma_{eq}},\\qquad n_\\tau=\\frac{R_{e\\tau}}{\\tau_{max}},\\qquad \\sigma_{eq}\\;\\text{dobiera się do materiału}",
  "formulaNote": "Re to granica plastyczności, a Reτ granica przy ścinaniu. Dla materiałów ciągliwych często stosuje się hipotezę Hubera–von Misesa lub Treski; dla kruchych trzeba osobno uwzględnić rozciąganie i ściskanie. Nie wolno zastępować tych kryteriów samym σx.",
  "insight": "Zwiększenie przekroju może zmniejszyć wszystkie naprężenia, ale dodaje masę; zmiana kształtu lub trasy obciążenia bywa skuteczniejsza. Warunek wytrzymałości i warunek sztywności należy sprawdzać osobno.",
  "lab": "combined",
  "outcomes": [
    "W1 — analizuje stan naprężenia w punkcie i dobiera składowe do opisu elementu",
    "W2 — rozpoznaje przypadki wytrzymałościowe związane z rozciąganiem, ściskaniem i ścinaniem",
    "W3 — odróżnia wpływ geometrii przekroju i kierunku przekroju na naprężenia",
    "U1 — oblicza składowe po obrocie, naprężenia główne i maksymalne naprężenie styczne",
    "U2 — kreśli i interpretuje koło Mohra oraz wyznacza kierunki główne",
    "U3 — wykorzystuje wyniki analizy do bezpiecznego i sztywnego doboru elementu"
  ],
  "questions": [
    {
      "question": "Dla stalowego elementu σ1 = 180 MPa, σ2 = 60 MPa, σ3 = 0. Jakie τmax należy użyć w warunku Treski dla pełnego stanu?",
      "answers": [
        "60 MPa",
        "90 MPa",
        "120 MPa"
      ],
      "correct": 1,
      "hint": "Weź połowę różnicy największego i najmniejszego naprężenia głównego.",
      "explanation": "σI = 180 MPa, a σIII = 0. Zatem τmax = (180 − 0)/2 = 90 MPa. Warunek Treski porównuje σI − σIII = 180 MPa z dopuszczalną wytrzymałością.",
      "outcome": "U3"
    },
    {
      "question": "Jeśli w płytce kruchej σ1 = 75 MPa, a wytrzymałość na rozciąganie Rt = 60 MPa, co wynika z porównania?",
      "answers": [
        "Warunek jest spełniony, bo σ1 jest dodatnie",
        "Przekroczono wytrzymałość na rozciąganie",
        "Wystarczy sprawdzić tylko τmax"
      ],
      "correct": 1,
      "hint": "Materiał kruchy jest szczególnie wrażliwy na największe rozciąganie.",
      "explanation": "75 MPa > 60 MPa, więc naprężenie przekracza wytrzymałość o 15 MPa, czyli o 25%. Samo ścinanie nie opisuje tu ryzyka pęknięcia prostopadłego do kierunku σ1.",
      "outcome": "U3"
    },
    {
      "question": "Koło Mohra pokazuje duże τmax, lecz projekt spełnia warunek wytrzymałości. Czy to gwarantuje wystarczającą sztywność?",
      "answers": [
        "Tak, zawsze",
        "Nie, trzeba jeszcze sprawdzić odkształcenia lub przemieszczenia",
        "Tak, jeśli koło ma duży promień"
      ],
      "correct": 1,
      "hint": "Wytrzymałość dotyczy zniszczenia lub uplastycznienia, a sztywność wielkości deformacji.",
      "explanation": "Element może nie ulec zniszczeniu, ale odkształcać się ponad dopuszczalną granicę użytkowania. Potrzebne są odkształcenia, zależności materiałowe E, G, ν oraz geometria całego elementu.",
      "outcome": "U3"
    }
  ],
  "workedExample": {
    "given": "Płaski stan daje σ1 = 140 MPa, σ2 = 20 MPa, σz = 0. Dla hipotezy Treski przyjmij Re = 240 MPa; oblicz współczynnik bezpieczeństwa.",
    "steps": [
      "Pełne uporządkowanie: σI = 140, σII = 20, σIII = 0 MPa.",
      "Różnica skrajnych naprężeń: σI − σIII = 140 MPa.",
      "Równoważne τmax = 140/2 = 70 MPa, ale w zapisie Treski porównujemy różnicę 2τmax z Re.",
      "n = Re/(σI − σIII) = 240/140 = 1,714."
    ],
    "result": "Współczynnik bezpieczeństwa wynosi około 1,71 według Treski. Akceptowalność zależy od wymaganego n projektowego; wynik nie zastępuje osobnej kontroli sztywności."
  }
} satisfies LessonData
