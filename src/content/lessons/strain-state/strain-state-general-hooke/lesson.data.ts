import type { LessonData } from '../../../model'

export default {
  "id": "strain-state-general-hooke",
  "moduleId": "strain-state",
  "number": 3,
  "title": "Uogólnione prawo Hooke’a: wszystkie osie naraz",
  "shortTitle": "Prawo Hooke’a 3D",
  "description": "Oblicz odkształcenia przy wieloosiowym naprężeniu, nie zapominając o wpływie pozostałych kierunków i ścinania.",
  "duration": 8,
  "eyebrow": "Superpozycja materiału",
  "formula": "\\varepsilon_x=\\frac{\\sigma_x-\\nu(\\sigma_y+\\sigma_z)}{E},\\quad \\varepsilon_y=\\frac{\\sigma_y-\\nu(\\sigma_z+\\sigma_x)}{E},\\quad \\varepsilon_z=\\frac{\\sigma_z-\\nu(\\sigma_x+\\sigma_y)}{E},\\quad \\gamma_{xy}=\\frac{\\tau_{xy}}{G}",
  "formulaNote": "Analogiczne zależności dotyczą γyz i γzx. Dla materiału izotropowego G = E/[2(1+ν)]. Wzory zakładają małe odkształcenia, liniową sprężystość i brak dodatkowych odkształceń, np. termicznych.",
  "insight": "Nawet przy σx = 0 może istnieć εx różne od zera, jeśli działają σy lub σz. Zerowe naprężenie w danym kierunku nie oznacza automatycznie zerowego odkształcenia.",
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
      "question": "Dla E = 200 GPa, ν = 0,25, σx = 100 MPa, σy = 50 MPa i σz = 0 ile wynosi εx?",
      "answers": [
        "0,0004375",
        "0,0005",
        "0,0005625"
      ],
      "correct": 0,
      "hint": "Odejmij νσy od σx i podziel przez 200 000 MPa.",
      "explanation": "εx = [100 − 0,25(50 + 0)]/200 000 = 87,5/200 000 = 0,0004375 = 437,5 µε. Efekt Poissona zmniejsza wydłużenie x.",
      "outcome": "U1"
    },
    {
      "question": "Przy σx = σy = 60 MPa, σz = 0, E = 70 GPa i ν = 0,33 jaki znak ma εz?",
      "answers": [
        "Dodatni",
        "Ujemny",
        "Zawsze zerowy"
      ],
      "correct": 1,
      "hint": "Chociaż σz = 0, naprężenia x i y wywołują skurcz poprzeczny.",
      "explanation": "εz = [0 − 0,33(60 + 60)]/70 000 = −39,6/70 000 ≈ −0,000566. Kierunek z ulega skróceniu mimo zerowego σz.",
      "outcome": "W1"
    },
    {
      "question": "Dla τxy = 60 MPa i G = 80 GPa ile wynosi inżynierskie γxy?",
      "answers": [
        "0,00075",
        "0,0015",
        "750"
      ],
      "correct": 0,
      "hint": "Zamień 80 GPa na 80 000 MPa i podziel τ przez G.",
      "explanation": "γxy = 60/80 000 = 0,00075 rad = 750 µrad. Tensorowe εxy wyniosłoby połowę, czyli 0,000375.",
      "outcome": "U1"
    }
  ],
  "workedExample": {
    "given": "Aluminium: E = 70 000 MPa, ν = 0,33, G = 26 000 MPa. Stan: σx = 90 MPa, σy = −30 MPa, σz = 0, τxy = 40 MPa.",
    "steps": [
      "εx = [90 − 0,33(−30 + 0)]/70 000 = 99,9/70 000 = 0,0014271.",
      "εy = [−30 − 0,33(0 + 90)]/70 000 = −59,7/70 000 = −0,0008529.",
      "εz = [0 − 0,33(90 − 30)]/70 000 = −19,8/70 000 = −0,0002829.",
      "γxy = 40/26 000 = 0,0015385 rad."
    ],
    "result": "εx ≈ 1427 µε, εy ≈ −853 µε, εz ≈ −283 µε i γxy ≈ 1538 µrad. Wszystkie składowe wynikają z jednoczesnego działania naprężeń."
  }
} satisfies LessonData
