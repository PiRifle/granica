import type { LessonData } from '../../../model'

export default {
  "id": "stress-state-mohr-drawing",
  "moduleId": "stress-state",
  "number": 6,
  "title": "Koło Mohra: narysuj je krok po kroku",
  "shortTitle": "Rysowanie koła",
  "description": "Przejdź od trzech składowych naprężenia do poprawnego wykresu, kątów i odczytu naprężeń głównych.",
  "duration": 9,
  "eyebrow": "Geometria zamiast zgadywania",
  "formula": "C=(\\sigma_{avg},0),\\qquad X=(\\sigma_x,\\tau_{xy}),\\qquad Y=(\\sigma_y,-\\tau_{xy}),\\qquad R=|CX|",
  "formulaNote": "Stosujemy konwencję wykresu zgodną z podaną transformacją: X ma rzędną +τxy, a Y −τxy. Dodatni fizyczny obrót θ odpowiada na tym wykresie obrotowi o 2θ zgodnie z ruchem wskazówek zegara.",
  "insight": "Najpierw zaznacz X i Y, potem środek jako środek odcinka XY, a na końcu okrąg. Przecięcia z osią σ dają naprężenia główne, górna i dolna krańcowa rzędna dają ±R.",
  "lab": "mohr",
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
      "question": "Jakie współrzędne mają X i Y dla σx = 70 MPa, σy = 10 MPa, τxy = 20 MPa w przyjętej konwencji?",
      "answers": [
        "X = (70, 20), Y = (10, −20)",
        "X = (70, −20), Y = (10, 20)",
        "X = (40, 20), Y = (40, −20)"
      ],
      "correct": 0,
      "hint": "Pierwsza współrzędna to naprężenie normalne na danej ścianie.",
      "explanation": "Przy tej konwencji X = (σx, τxy) = (70,20), a Y = (σy,−τxy) = (10,−20), wszystko w MPa. Środek odcinka XY leży przy σ = 40 MPa.",
      "outcome": "U2"
    },
    {
      "question": "Dlaczego kąt między promieniami CX i CY wynosi 180°, mimo że ściany x i y są prostopadłe?",
      "answers": [
        "Bo kąty fizyczne są na kole podwojone",
        "Bo ściany są równoległe",
        "To błąd: powinno być 90°"
      ],
      "correct": 0,
      "hint": "We wzorach transformacji występuje 2θ.",
      "explanation": "Fizyczne 90° odpowiada 2·90° = 180° na kole. Punkty X i Y są więc przeciwległymi końcami średnicy.",
      "outcome": "U2"
    },
    {
      "question": "Co odczytujesz z najbardziej wysuniętego w prawo punktu koła?",
      "answers": [
        "Największe naprężenie główne w danej płaszczyźnie",
        "Maksymalne ścinanie",
        "Zawsze zerowe naprężenie"
      ],
      "correct": 0,
      "hint": "Ten punkt leży na poziomej osi σ.",
      "explanation": "Prawy koniec średnicy ma współrzędne (σavg + R, 0), czyli σ1 i zerowe ścinanie. Maksymalne ścinanie odpowiada natomiast górnemu lub dolnemu punktowi koła.",
      "outcome": "U2"
    }
  ],
  "workedExample": {
    "given": "Narysuj koło dla σx = 90 MPa, σy = 30 MPa, τxy = 40 MPa.",
    "steps": [
      "Zaznacz X = (90,40) MPa i Y = (30,−40) MPa.",
      "Wyznacz środek C = ((90 + 30)/2,0) = (60,0) MPa.",
      "Oblicz R = √[(90 − 60)² + (40 − 0)²] = 50 MPa i zakreśl okrąg.",
      "Odczytaj przecięcia z osią σ: 60 − 50 = 10 MPa i 60 + 50 = 110 MPa."
    ],
    "result": "Koło ma środek (60,0) MPa i promień 50 MPa. Daje σ1 = 110 MPa, σ2 = 10 MPa oraz płaskie |τ|max = 50 MPa."
  }
} satisfies LessonData
