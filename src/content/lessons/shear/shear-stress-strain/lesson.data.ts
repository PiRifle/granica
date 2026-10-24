import type { LessonData } from '../../../model'

export default {
  "id": "shear-stress-strain",
  "moduleId": "shear",
  "number": 3,
  "title": "Naprężenia i odkształcenia styczne",
  "shortTitle": "Naprężenia styczne",
  "description": "Połącz τ z kątem odkształcenia postaciowego i poznaj czyste ścinanie na kole Mohra.",
  "duration": 8,
  "eyebrow": "Prostokąt zmienia kąty",
  "formula": "\\tau = G\\gamma \\qquad \\sigma_{1,2} = \\pm\\tau \\quad \\text{(czyste ścinanie)}",
  "formulaNote": "G to moduł Kirchhoffa w MPa, γ jest w radianach. W czystym ścinaniu naprężenia główne mają przeciwne znaki.",
  "insight": "W stanie czystego ścinania koło Mohra ma środek w zerze. Na płaszczyznach głównych nie ma ścinania, ale występują rozciąganie i ściskanie o wartości τ.",
  "lab": "mohr",
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
      "question": "Przy τ = 80 MPa i G = 80 GPa odkształcenie postaciowe γ wynosi:",
      "answers": [
        "0,0001",
        "0,001",
        "0,01"
      ],
      "correct": 1,
      "hint": "Zamień 80 GPa na 80 000 MPa i użyj γ = τ/G.",
      "explanation": "γ = 80 MPa / 80 000 MPa = 0,001 rad. Jest to kąt odkształcenia, czyli około 0,0573°, a nie 1°."
    },
    {
      "question": "Jakie naprężenia główne odpowiadają czystemu ścinaniu τ = 50 MPa?",
      "answers": [
        "σ1 = 50 MPa, σ2 = −50 MPa",
        "σ1 = σ2 = 50 MPa",
        "σ1 = 100 MPa, σ2 = 0"
      ],
      "correct": 0,
      "hint": "Koło ma środek C = 0 i promień R = τ.",
      "explanation": "Dla czystego ścinania σ1 = C + R = τ, a σ2 = C − R = −τ. Przy τ = 50 MPa otrzymujemy odpowiednio +50 i −50 MPa."
    },
    {
      "question": "W liniowym zakresie sprężystym naprężenie styczne rośnie dwukrotnie, a G nie zmienia się. Co stanie się z γ?",
      "answers": [
        "Wzrośnie dwukrotnie",
        "Spadnie dwukrotnie",
        "Nie zmieni się"
      ],
      "correct": 0,
      "hint": "Prawo Hooke’a dla ścinania jest wprost proporcjonalne: τ = Gγ.",
      "explanation": "Przy stałym G zachodzi γ = τ/G, więc podwojenie τ podwaja γ. Dotyczy to tylko liniowego zakresu sprężystego."
    }
  ],
  "workedExample": {
    "given": "Element jest w stanie czystego ścinania τ = 80 MPa. Moduł Kirchhoffa G = 80 GPa.",
    "steps": [
      "Zamień G = 80 GPa = 80 000 MPa, aby zgodne były jednostki.",
      "Oblicz γ = τ/G = 80/80 000 = 0,001 rad = 0,0573°.",
      "Koło Mohra ma C = 0 i R = 80 MPa, zatem σ1 = 80 MPa oraz σ2 = −80 MPa."
    ],
    "result": "γ = 0,001 rad; naprężenia główne to +80 MPa i −80 MPa."
  }
} satisfies LessonData
