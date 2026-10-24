import type { LessonData } from '../../../model'

export default {
  "id": "foundations-idealized-models",
  "moduleId": "foundations",
  "number": 2,
  "title": "Model obliczeniowy: świadome uproszczenia",
  "shortTitle": "Modele",
  "description": "Przejdź od rzeczywistego pręta do schematu, zachowując cechy istotne dla badanego zagadnienia.",
  "duration": 8,
  "eyebrow": "Uprość, ale nie zgub istoty",
  "formula": "P=\\int_0^L q(x)\\,\\mathrm{d}x,\\qquad x_P=\\frac{\\int_0^L xq(x)\\,\\mathrm{d}x}{P}",
  "formulaNote": "Obciążenie rozłożone q(x) można zastąpić wypadkową P przyłożoną w jego środku ciężkości. Ta równoważność dotyczy reakcji całego ciała, nie zawsze lokalnych naprężeń.",
  "insight": "Model ciała sztywnego wystarcza do wyznaczenia reakcji statycznie wyznaczalnych, ale do obliczenia odkształceń trzeba uwzględnić podatność materiału.",
  "lab": "sections",
  "outcomes": [
    "W1 — wybiera uproszczenia właściwe dla analizowanego elementu",
    "W2 — odróżnia model równowagi od modelu odkształcalnego",
    "W3 — zachowuje istotne cechy geometrii i rozkładu obciążenia",
    "U1 — zastępuje obciążenie rozłożone statycznie równoważną wypadkową",
    "U2 — ocenia zakres stosowalności uproszczonego opisu naprężeń",
    "U3 — przygotowuje poprawny model do doboru nośności i sztywności"
  ],
  "questions": [
    {
      "question": "Dlaczego przy obliczaniu wydłużenia pręta nie wolno przyjąć modelu idealnie sztywnego?",
      "answers": [
        "Bo nie można wtedy narysować osi pręta",
        "Bo model sztywny z definicji pomija odkształcenia",
        "Bo siła osiowa zawsze wynosi zero"
      ],
      "correct": 1,
      "hint": "Zastanów się, jaką własność materiału ma opisywać wzór ΔL = NL/(EA).",
      "explanation": "Ciało idealnie sztywne nie zmienia kształtu ani wymiarów pod obciążeniem. Taki model może służyć do analizy równowagi, lecz usuwa zjawisko, które chcemy obliczyć.",
      "outcome": "W1"
    },
    {
      "question": "Czy zastąpienie równomiernego obciążenia q jego wypadkową qL jest poprawne przy wyznaczaniu reakcji belki?",
      "answers": [
        "Tak, jeśli wypadkową przyłożymy w połowie obciążonego odcinka",
        "Tak, ale tylko gdy belka jest nieważka",
        "Nie, bo obciążenie rozłożone nie ma wypadkowej"
      ],
      "correct": 0,
      "hint": "Wypadkowa musi dać tę samą sumę sił i momentów.",
      "explanation": "Dla równomiernego q wypadkowa wynosi qL i działa w środku obciążonego odcinka. Zachowuje siłę oraz moment względem dowolnego punktu, więc nadaje się do równowagi całej belki.",
      "outcome": "U1"
    },
    {
      "question": "Który szczegół jest najistotniejszy w modelu pręta osiowo rozciąganego z dala od mocowania?",
      "answers": [
        "Kolor powierzchni",
        "Pole przekroju i moduł Younga",
        "Dokładny kształt drobnej faktury powierzchni"
      ],
      "correct": 1,
      "hint": "Wybierz wielkości występujące w σ = N/A i ΔL = NL/(EA).",
      "explanation": "Pole A decyduje o średnim naprężeniu, a E i A o sztywności osiowej. Drobne detale powierzchni można pominąć w tym modelu, o ile nie tworzą istotnego karbu.",
      "outcome": "W3"
    }
  ],
  "workedExample": {
    "given": "Na odcinku L = 3 m działa równomierne obciążenie q = 4 kN/m. Zastąp je jedną siłą do analizy równowagi.",
    "steps": [
      "Oblicz wypadkową jako pole wykresu obciążenia: P = qL.",
      "Podstaw dane: P = 4 kN/m · 3 m = 12 kN.",
      "Dla obciążenia równomiernego środek wykresu leży w połowie długości.",
      "Przyłóż wypadkową w odległości xP = L/2 = 1,5 m od początku odcinka, w kierunku zgodnym z q."
    ],
    "result": "Model równoważny dla reakcji: jedna siła P = 12 kN przyłożona 1,5 m od początku obciążonego odcinka."
  }
} satisfies LessonData
