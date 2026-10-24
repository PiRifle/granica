import type { LessonData } from '../../../model'

export default {
  "id": "m4-central-principal-axes",
  "moduleId": "geometry",
  "number": 5,
  "title": "Osie centralne i główne",
  "shortTitle": "Osie przekroju",
  "description": "Osie przechodzące przez środek ciężkości, moment dewiacyjny oraz warunki, w których osie stają się główne.",
  "duration": 9,
  "eyebrow": "Wybieramy właściwy układ osi",
  "formula": "S_{xc} = S_{yc} = 0; \\qquad \\text{w osiach głównych: } I_{xy} = 0",
  "formulaNote": "Osie centralne przechodzą przez środek ciężkości. Osie główne są osiami centralnymi o Ixy = 0; oś symetrii przekroju wraz z osią prostopadłą przechodzącą przez środek tworzą układ główny.",
  "insight": "Każda oś główna jest centralna, ale nie każda para osi centralnych jest główna. Dla przekroju niesymetrycznego kierunki główne mogą być obrócone względem krawędzi.",
  "lab": "sections",
  "outcomes": [
    "W1 — analizuje związek układu osi z kierunkami zginania",
    "W2 — rozpoznaje, kiedy można rozdzielić zginanie na kierunki główne",
    "W3 — wyznacza i interpretuje osie centralne oraz główne",
    "U1 — sprawdza momenty statyczne i warunek Ixy = 0",
    "U2 — rozumie rolę głównych kierunków geometrycznych przy analizie koła Mohra",
    "U3 — wybiera osie umożliwiające poprawny i bezpieczny dobór przekroju"
  ],
  "questions": [
    {
      "question": "Które zdanie poprawnie opisuje relację między osiami centralnymi i głównymi?",
      "answers": [
        "Żadna oś główna nie musi przechodzić przez środek",
        "Każda oś centralna jest automatycznie główna",
        "Osie główne są centralne i spełniają Ixy = 0",
        "Osie główne występują tylko w kole"
      ],
      "correct": 2,
      "explanation": "Główne osie bezwładności przechodzą przez środek ciężkości i mają zerowy moment dewiacyjny. Zwykłe osie centralne mogą mieć Ixy różne od zera.",
      "hint": "Warunek główności zawiera zarówno położenie osi, jak i wartość Ixy.",
      "outcome": "W3"
    },
    {
      "question": "Przekrój ma poziomą oś symetrii. Co można powiedzieć o tej osi i osi pionowej przechodzącej przez środek ciężkości?",
      "answers": [
        "Tworzą układ osi głównych",
        "Na pewno mają równe momenty bezwładności",
        "Nie przechodzą przez środek ciężkości",
        "Moment dewiacyjny musi być dodatni"
      ],
      "correct": 0,
      "explanation": "Oś symetrii przechodzi przez środek i daje Ixy = 0 względem osi prostopadłej przez środek. Nie oznacza to równości Ix i Iy.",
      "hint": "Symetria upraszcza moment dewiacyjny, nie wymusza równych bezwładności.",
      "outcome": "W3"
    },
    {
      "question": "Niesymetryczny kątownik ma osie x i y równoległe do półek i przechodzące przez środek ciężkości, ale Ixy ≠ 0. Co to oznacza?",
      "answers": [
        "Środek ciężkości został źle wyznaczony, bo Ixy musi być zerowe",
        "Osie są centralne, lecz nie są główne",
        "Przekrój nie ma osi głównych",
        "Momenty statyczne na pewno są niezerowe"
      ],
      "correct": 1,
      "explanation": "Osie przechodzą przez środek, więc są centralne i dają zerowe momenty statyczne. Niezerowe Ixy oznacza jedynie, że kierunki główne są obrócone.",
      "hint": "Rozdziel warunek centralności od warunku główności.",
      "outcome": "W3"
    }
  ],
  "workedExample": {
    "given": "Prostokąt b × h ma centralne osie x i y równoległe do boków. Sprawdzamy warunki Sxc, Syc i Ixy dla tych osi.",
    "steps": [
      "Osie przechodzą przez środek ciężkości, więc odległość środka od każdej z nich wynosi zero.",
      "Z Sxc = A·ȳ i Syc = A·x̄ otrzymujemy Sxc = Syc = 0.",
      "Obie osie są osiami symetrii prostokąta; każda para symetrycznych elementów pola daje przeciwne składniki xy dA.",
      "Po zsumowaniu Ixy = ∫A xy dA = 0, więc centralne osie x i y są również główne, choć ogólnie Ix ≠ Iy."
    ],
    "result": "Dla prostokąta osie środkowe równoległe do boków są osiami głównymi: momenty statyczne i moment dewiacyjny wynoszą zero."
  }
} satisfies LessonData
