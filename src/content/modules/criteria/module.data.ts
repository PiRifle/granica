import type { ModuleData } from '../../model'

export default {
  "id": "criteria",
  "number": 9,
  "title": "Hipotezy wytężeniowe i warunek wytrzymałości",
  "shortTitle": "Naprężenie zredukowane",
  "description": "Od pojedynczego naprężenia do jednej miary wytężenia: naprężenia główne, HMH, Tresca, obciążenia złożone i współczynnik bezpieczeństwa.",
  "outcomes": [
    "W1 — analizuję element konstrukcji i wskazuję przekrój oraz punkt decydujący o bezpieczeństwie.",
    "W2 — rozróżniam przypadki wytrzymałościowe i dobieram hipotezę do materiału oraz stanu naprężenia.",
    "W3 — uwzględniam geometrię przekroju przy wyznaczaniu naprężeń normalnych i stycznych.",
    "U1 — obliczam naprężenie zredukowane i sprawdzam warunek wytrzymałości z zachowaniem jednostek.",
    "U2 — stosuję koło Mohra do wyznaczenia naprężeń głównych i maksymalnego naprężenia stycznego.",
    "U3 — wyznaczam współczynnik bezpieczeństwa i oceniam, czy element spełnia przyjęty warunek."
  ]
} satisfies ModuleData
