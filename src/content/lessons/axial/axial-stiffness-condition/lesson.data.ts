import type { LessonData } from '../../../model'

export default {
  "id": "axial-stiffness-condition",
  "moduleId": "axial",
  "number": 7,
  "title": "Warunek sztywności: bezpiecznie i bez nadmiernych ruchów",
  "shortTitle": "Sztywność",
  "description": "Ogranicz wydłużenie pręta i wybierz przekrój spełniający jednocześnie oba warunki projektowe.",
  "duration": 10,
  "eyebrow": "Niezłamany to nie zawsze użyteczny",
  "formula": "|\\Delta L|\\leq \\Delta L_{\\mathrm{dop}},\\qquad A_{\\min,\\Delta}=\\frac{|N|L}{E\\Delta L_{\\mathrm{dop}}}",
  "formulaNote": "Drugi wzór dotyczy jednorodnego pręta o stałych N, E i A. Ostatecznie przyjmujemy pole spełniające zarówno wymagania wytrzymałości, jak i sztywności.",
  "insight": "Jeśli Amin z warunku sztywności jest większe niż Amin z wytrzymałości, sztywność decyduje o doborze. Większe E zmniejsza wydłużenie, ale nie podnosi automatycznie wytrzymałości materiału.",
  "lab": "safety",
  "outcomes": [
    "W1 — analizuje użyteczność elementu pod kątem przemieszczeń",
    "W2 — odróżnia warunek wytrzymałości od warunku sztywności",
    "W3 — dobiera geometrię ograniczającą zmianę długości",
    "U1 — oblicza pole wymagane przez dopuszczalne wydłużenie",
    "U2 — łączy naprężenie i odkształcenie w pełnej ocenie stanu osiowego",
    "U3 — wybiera przekrój decydujący z dwóch warunków i podaje zapasy"
  ],
  "questions": [
    {
      "question": "Pręt spełnia |σ| < σdop, ale jego wydłużenie przekracza dopuszczalne. Jak ocenić projekt?",
      "answers": [
        "Jest poprawny, bo wytrzymałość zawsze wystarcza",
        "Nie spełnia warunku sztywności i wymaga zmiany",
        "Jest poprawny tylko dla stali"
      ],
      "correct": 1,
      "hint": "Bezpieczeństwo materiału i ograniczenie przemieszczeń to dwa osobne wymagania.",
      "explanation": "Warunki projektowe muszą być spełnione jednocześnie. Brak zniszczenia nie rekompensuje nadmiernej zmiany długości, jeśli ogranicza ona użyteczność konstrukcji.",
      "outcome": "W2"
    },
    {
      "question": "Dla jednorodnego pręta Amin,Δ = 800 mm² z warunku sztywności, a Amin,σ = 500 mm² z warunku wytrzymałości. Jakie minimalne pole należy przyjąć?",
      "answers": [
        "500 mm²",
        "650 mm² jako średnią",
        "800 mm²"
      ],
      "correct": 2,
      "hint": "Przyjęte pole musi być nie mniejsze od każdego z wymaganych minimów.",
      "explanation": "Należy przyjąć co najmniej max(500, 800) = 800 mm². Mniejsze pole nie ograniczy wydłużenia do wymaganego poziomu; uśrednianie warunków nie ma uzasadnienia.",
      "outcome": "U3"
    },
    {
      "question": "Jak zmieni się wymagane Amin,Δ, jeśli dopuszczalne wydłużenie zmniejszymy o połowę przy pozostałych danych bez zmian?",
      "answers": [
        "Wzrośnie dwa razy",
        "Zmaleje dwa razy",
        "Nie zmieni się"
      ],
      "correct": 0,
      "hint": "ΔLdop znajduje się w mianowniku Amin,Δ = NL/(EΔLdop).",
      "explanation": "Bardziej rygorystyczny limit przemieszczenia wymaga sztywniejszego przekroju. Zmniejszenie ΔLdop o połowę podwaja Amin,Δ.",
      "outcome": "U1"
    }
  ],
  "workedExample": {
    "given": "Jednorodny pręt ma N = 80 kN, L = 2 m i E = 200 GPa. Dopuszczalne wydłużenie wynosi 1 mm, a naprężenie dopuszczalne 160 MPa. Dobierz minimalne pole.",
    "steps": [
      "Warunek sztywności: Amin,Δ = NL/(EΔLdop). Przyjmij N = 80 000 N, L = 2000 mm i E = 200 000 N/mm².",
      "Oblicz Amin,Δ = 80 000·2000/(200 000·1) = 800 mm².",
      "Warunek wytrzymałości: Amin,σ = N/σdop = 80 000/160 = 500 mm².",
      "Przyjmij A ≥ max(800, 500) = 800 mm², ponieważ muszą być spełnione oba warunki.",
      "Dla A = 800 mm²: ΔL = 1,0 mm ≤ 1,0 mm oraz σ = 80 000/800 = 100 MPa ≤ 160 MPa."
    ],
    "result": "Minimalne pole wynosi 800 mm² i decyduje sztywność. Dla tego pola ΔL = 1,0 mm, a σ = 100 MPa."
  }
} satisfies LessonData
