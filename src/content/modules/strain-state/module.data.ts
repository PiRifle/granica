import type { ModuleData } from '../../model'

export default {
  "id": "strain-state",
  "number": 8,
  "title": "Stan odkształcenia: pomiar, Hooke i rozeta",
  "shortTitle": "Stan odkształcenia",
  "description": "Połącz zmiany długości i kątów z prawami materiału, odczytaj tensometry oraz przejdź od pomiaru rozety do naprężeń i decyzji projektowej.",
  "outcomes": [
    "W1 — analizuje odkształcenia liniowe i postaciowe w elemencie konstrukcyjnym",
    "W2 — rozpoznaje sprężyste przypadki wytrzymałościowe z udziałem efektu Poissona",
    "W3 — wiąże geometrię, zmianę objętości i położenie czujników z mierzonymi wielkościami",
    "U1 — oblicza odkształcenia z uogólnionego prawa Hooke’a i danych tensometrycznych",
    "U2 — przekształca pomiary rozety w koło Mohra odkształceń i wielkości główne",
    "U3 — dobiera parametry materiałowe i geometryczne z uwagi na bezpieczeństwo oraz sztywność"
  ]
} satisfies ModuleData
