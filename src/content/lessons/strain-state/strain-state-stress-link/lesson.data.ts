import type { LessonData } from '../../../model'

export default {
  "id": "strain-state-stress-link",
  "moduleId": "strain-state",
  "number": 7,
  "title": "Od pomiaru do naprężeń i bezpiecznego doboru",
  "shortTitle": "Powiązanie stanów",
  "description": "Przelicz odkształcenia główne na naprężenia, połącz oba koła Mohra i uwzględnij wytrzymałość oraz sztywność.",
  "duration": 10,
  "eyebrow": "Pełna droga projektowa",
  "formula": "\\sigma_1=\\frac{E}{1-\\nu^2}(\\varepsilon_1+\\nu\\varepsilon_2),\\quad \\sigma_2=\\frac{E}{1-\\nu^2}(\\varepsilon_2+\\nu\\varepsilon_1),\\quad G=\\frac{E}{2(1+\\nu)}",
  "formulaNote": "Podane wzory na σ1 i σ2 dotyczą płaskiego stanu naprężenia (σz = 0) i izotropowego materiału liniowo-sprężystego. Dla płaskiego stanu odkształcenia relacje są inne. W stanie izotropowym kierunki główne naprężeń i odkształceń pokrywają się.",
  "insight": "Nie wolno używać σ = Eε osobno dla każdej osi przy ogólnym stanie wieloosiowym: pomija to efekt Poissona. Bezpieczny dobór wymaga właściwego modelu stanu, współczynnika bezpieczeństwa i kontroli deformacji.",
  "lab": "combined",
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
      "question": "W płaskim stanie naprężenia zmierzono ε1 = 1000 µε, ε2 = −200 µε. Dla E = 200 GPa i ν = 0,30 ile wynosi σ1?",
      "answers": [
        "Około 206,6 MPa",
        "200 MPa",
        "Około 193,4 MPa"
      ],
      "correct": 0,
      "hint": "Zastosuj E/(1−ν²) do sumy ε1 + νε2.",
      "explanation": "σ1 = 200 000/(1−0,09)·[0,001 + 0,30·(−0,0002)] = 219 780,22·0,00094 ≈ 206,59 MPa. Proste Eε1 dałoby błędne 200 MPa.",
      "outcome": "U1"
    },
    {
      "question": "Dlaczego kierunki główne naprężeń i odkształceń pokrywają się dla izotropowego materiału liniowo-sprężystego?",
      "answers": [
        "Bo materiał reaguje tak samo niezależnie od kierunku, a prawo Hooke’a jest współosiowe z tensorami",
        "Bo wszystkie odkształcenia styczne są zawsze zerowe",
        "Bo ν zawsze wynosi zero"
      ],
      "correct": 0,
      "hint": "Izotropia oznacza brak wyróżnionych kierunków materiałowych.",
      "explanation": "W izotropowym prawie Hooke’a nie ma osobnych osi materiałowych obracających odpowiedź. Tensory naprężenia i odkształcenia mają wspólne kierunki własne, choć ich wartości główne są powiązane przez E i ν.",
      "outcome": "W1"
    },
    {
      "question": "Pomiar wykazał małe odkształcenia i naprężenia poniżej granicy plastyczności. Czy element na pewno spełnia wymagania projektowe?",
      "answers": [
        "Tak, zawsze",
        "Nie, trzeba jeszcze sprawdzić wymagane n, przemieszczenia i warunki użytkowania",
        "Tylko jeśli γxy = 0"
      ],
      "correct": 1,
      "hint": "Brak uplastycznienia nie wyklucza nadmiernego ugięcia ani zbyt małego zapasu.",
      "explanation": "Trzeba porównać naprężenie równoważne z dopuszczalnym, sprawdzić wymagany współczynnik bezpieczeństwa oraz ograniczenia odkształceń i przemieszczeń. Sam fakt pozostania w zakresie sprężystym nie wystarcza.",
      "outcome": "U3"
    }
  ],
  "workedExample": {
    "given": "Pomiar główny: ε1 = 600 µε, ε2 = 100 µε. Materiał w płaskim stanie naprężenia: E = 70 GPa, ν = 0,33, Re = 180 MPa.",
    "steps": [
      "Wspólny czynnik E/(1−ν²) = 70 000/(1−0,1089) = 78 554,6 MPa.",
      "σ1 = 78 554,6·(0,0006 + 0,33·0,0001) = 49,62 MPa.",
      "σ2 = 78 554,6·(0,0001 + 0,33·0,0006) = 23,42 MPa.",
      "Dla prostego porównania maksymalnego rozciągania n = 180/49,62 = 3,63; pełna ocena wymaga kryterium właściwego dla materiału."
    ],
    "result": "σ1 ≈ 49,6 MPa i σ2 ≈ 23,4 MPa. Zapas względem Re dla σ1 wynosi około 3,63, ale decyzja projektowa wymaga jeszcze właściwej hipotezy, wymaganego n i kontroli sztywności."
  }
} satisfies LessonData
