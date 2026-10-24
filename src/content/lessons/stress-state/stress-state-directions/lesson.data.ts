import type { LessonData } from '../../../model'

export default {
  "id": "stress-state-directions",
  "moduleId": "stress-state",
  "number": 4,
  "title": "Kierunki główne: gdzie znika ścinanie",
  "shortTitle": "Kierunki główne",
  "description": "Wyznacz położenie płaszczyzn głównych i naucz się rozstrzygać niejednoznaczność kąta oraz przypadek stanu hydrostatycznego.",
  "duration": 9,
  "eyebrow": "Znajdź właściwy kierunek",
  "formula": "\\tan2\\theta_p=\\frac{2\\tau_{xy}}{\\sigma_x-\\sigma_y},\\qquad \\theta_{p2}=\\theta_{p1}+90^\\circ",
  "formulaNote": "Kąt θp odpowiada przyjętej wcześniej transformacji. Ponieważ tangens powtarza się co 180°, równanie dla 2θ wymaga sprawdzenia znaku licznika i mianownika lub podstawienia kąta do wzoru na σn.",
  "insight": "Kierunki główne są wzajemnie prostopadłe. Gdy σx = σy i τxy = 0, każdy kierunek w płaszczyźnie jest główny — nie ma jednego wyróżnionego kąta.",
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
      "question": "Dla σx = σy = 50 MPa i τxy = 0 co można powiedzieć o kierunkach głównych w płaszczyźnie?",
      "answers": [
        "Występują tylko przy 45°",
        "Każdy kierunek jest główny",
        "Nie istnieją"
      ],
      "correct": 1,
      "hint": "Oblicz promień R i pomyśl, czy koło ma wyróżniony punkt na obwodzie.",
      "explanation": "R = 0, więc koło Mohra redukuje się do punktu σ = 50 MPa. Na każdym przekroju w tej płaszczyźnie τ = 0 i σ = 50 MPa, zatem każdy kierunek jest główny.",
      "outcome": "U2"
    },
    {
      "question": "Dla σx = 80 MPa, σy = 0 i τxy = 40 MPa, jaki najmniejszy dodatni kąt θp wskazuje kierunek o większym naprężeniu głównym?",
      "answers": [
        "22,5°",
        "45°",
        "67,5°"
      ],
      "correct": 0,
      "hint": "tan2θp = 80/80 = 1; wybierz 2θp = 45°, a nie kąt o 180° dalszy.",
      "explanation": "2θp = 45° daje θp = 22,5°. Podstawienie do σn daje 40 + 40·cos45° + 40·sin45° ≈ 96,57 MPa, czyli większą wartość główną; drugi kierunek jest o 90°.",
      "outcome": "U2"
    },
    {
      "question": "Dlaczego samo wyrażenie 0,5·arctan[2τxy/(σx−σy)] może wskazać niewłaściwą z dwóch osi głównych?",
      "answers": [
        "Bo arctan nie rozróżnia pełnego położenia kąta 2θ na kole",
        "Bo kierunki główne nie są prostopadłe",
        "Bo wzór nie zawiera naprężeń normalnych"
      ],
      "correct": 0,
      "hint": "Tangens ma okres 180°, a funkcja arctan zwykle zwraca tylko jedną gałąź.",
      "explanation": "Ta sama wartość tangensa odpowiada kątom 2θ różniącym się o 180°, czyli kierunkom θ różniącym się o 90°. Trzeba ustalić, który odpowiada σ1, np. przez podstawienie do transformacji.",
      "outcome": "U2"
    }
  ],
  "workedExample": {
    "given": "Dla σx = 100 MPa, σy = 20 MPa, τxy = 30 MPa wyznacz kierunki główne.",
    "steps": [
      "Równanie daje tan2θp = 2·30/(100 − 20) = 0,75.",
      "Jedno rozwiązanie to 2θp = 36,87°, zatem θp = 18,435°.",
      "Podstawienie: σavg = 60 MPa, a = 40 MPa, więc σn = 60 + 40·cos36,87° + 30·sin36,87° = 110 MPa.",
      "Drugi kierunek: θp2 = 18,435° + 90° = 108,435°, z naprężeniem σ2 = 10 MPa."
    ],
    "result": "Kierunek σ1 = 110 MPa jest obrócony o około 18,44° od osi x; kierunek σ2 = 10 MPa jest do niego prostopadły. Na obu płaszczyznach głównych τ = 0."
  }
} satisfies LessonData
