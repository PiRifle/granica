import type { LessonData } from '../../../model'

export default {
  "id": "axial-elongation",
  "moduleId": "axial",
  "number": 5,
  "title": "Wydłużenia i skrócenia prętów",
  "shortTitle": "Wydłużenia",
  "description": "Oblicz zmianę długości pręta i sumuj przemieszczenia kolejnych odcinków schodkowych.",
  "duration": 9,
  "eyebrow": "Sztywność całego pręta",
  "formula": "\\Delta L=\\sum_i\\frac{N_iL_i}{E_iA_i},\\qquad EA:\\ \\text{sztywność osiowa przekroju}",
  "formulaNote": "Dodatnie ΔL oznacza wydłużenie, a ujemne skrócenie. Wzór sumuje odcinki, na których N, E i A są stałe, w zakresie liniowo sprężystym.",
  "insight": "Największe naprężenie i największy udział we wydłużeniu nie zawsze dotyczą tego samego odcinka: ΔLi zależy również od Li. Dlatego warunek wytrzymałości i sztywności sprawdzamy osobno.",
  "lab": "hooke",
  "outcomes": [
    "W1 — analizuje odkształcalność prętów jednorodnych i złożonych",
    "W2 — odróżnia zmianę długości od samej wytrzymałości materiału",
    "W3 — uwzględnia długość i pole każdego odcinka",
    "U1 — oblicza i sumuje wydłużenia oraz skrócenia",
    "U2 — wiąże odkształcenia z jednoosiowym stanem naprężenia",
    "U3 — ocenia sztywność i przemieszczenia przy doborze przekroju"
  ],
  "solutionId": "cw2-1",
  "questions": [
    {
      "question": "Przy niezmienionych N, E i A długość pręta rośnie trzy razy. Jak zmieni się jego sprężyste wydłużenie?",
      "answers": [
        "Wzrośnie trzy razy",
        "Nie zmieni się",
        "Wzrośnie dziewięć razy"
      ],
      "correct": 0,
      "hint": "W ΔL = NL/(EA) długość występuje w pierwszej potędze.",
      "explanation": "Przy pozostałych danych stałych ΔL jest wprost proporcjonalne do L. Trzykrotnie dłuższy pręt ma trzykrotnie większe wydłużenie, choć ε = σ/E pozostaje takie samo.",
      "outcome": "U1"
    },
    {
      "question": "Dwa odcinki mają osobno wydłużenie +1,2 mm i skrócenie −0,4 mm. Jaka jest całkowita zmiana długości?",
      "answers": [
        "+0,8 mm",
        "+1,6 mm",
        "−0,8 mm"
      ],
      "correct": 0,
      "hint": "Dodaj wartości algebraicznie, zachowując znaki.",
      "explanation": "ΔL = +1,2 mm − 0,4 mm = +0,8 mm. Całkowity wynik dodatni oznacza, że pręt jako całość się wydłużył.",
      "outcome": "U1"
    },
    {
      "question": "Dlaczego dłuższy odcinek może dawać większy udział w ΔL, mimo że ma mniejsze naprężenie niż odcinek krótki?",
      "answers": [
        "Bo ΔL zależy od εL, a więc także od długości",
        "Bo naprężenie nie wpływa na odkształcenie",
        "Bo moduł Younga rośnie automatycznie z długością"
      ],
      "correct": 0,
      "hint": "Zapisz ΔL = (σ/E)L i porównaj oba czynniki.",
      "explanation": "Przy tym samym E wydłużenie odcinka to (σ/E)L. Mniejsze σ może zostać zrównoważone lub przeważone przez większe L, dlatego wkłady w całkowitą zmianę długości trzeba liczyć osobno.",
      "outcome": "W3"
    }
  ],
  "workedExample": {
    "given": "Pręt z dwóch odcinków przenosi N = 40 kN. Odcinek 1: L₁ = 1 m, A₁ = 200 mm². Odcinek 2: L₂ = 0,5 m, A₂ = 100 mm². Dla obu E = 200 GPa.",
    "steps": [
      "Przyjmij E = 200 000 N/mm², N = 40 000 N, L₁ = 1000 mm i L₂ = 500 mm.",
      "Odcinek 1: ΔL₁ = 40 000·1000/(200 000·200) = 1,0 mm.",
      "Odcinek 2: ΔL₂ = 40 000·500/(200 000·100) = 1,0 mm.",
      "Oba odcinki są rozciągane, więc wkłady mają znak dodatni: ΔL = ΔL₁ + ΔL₂.",
      "Całkowite wydłużenie: ΔL = 1,0 + 1,0 = 2,0 mm."
    ],
    "result": "ΔL₁ = 1,0 mm, ΔL₂ = 1,0 mm, a całkowite wydłużenie pręta wynosi 2,0 mm."
  }
} satisfies LessonData
