import type { SolutionData } from '../../model'

export default {
  "id": "cw1-1",
  "title": "Pręt o stałym przekroju z trzema siłami",
  "duration": 8,
  "given": [
    "P = 20 kN; wszystkie trzy siły są skierowane w dół",
    "A = 10 cm² = 1000 mm²",
    "Długości odcinków od góry: 100 mm, 100 mm i 200 mm",
    "Przyjmujemy dodatni znak N i σ dla rozciągania"
  ],
  "result": "Od góry: N = 80, 40, 20 kN oraz σ = 80, 40, 20 MPa. Cały pręt jest rozciągany, a reakcja utwierdzenia wynosi 80 kN w górę.",
  "scenes": [
    {
      "title": "Model, dane i oznaczenia",
      "narration": "Pręt traktujemy jako osiowy: siły działają wzdłuż jego osi, więc w przekrojach powstaje tylko siła podłużna N. Odcinek górny ma długość 100 mm, środkowy 100 mm, a dolny 200 mm. Obciążenia wynoszą kolejno 2P, P i P, czyli 40, 20 i 20 kN.",
      "formula": "P=20\\,\\mathrm{kN},\\qquad 2P=40\\,\\mathrm{kN}",
      "caption": "Trzy siły w dół i jedno utwierdzenie na górze.",
      "visual": "axial",
      "emphasis": "Długości odcinków nie wpływają na N ani σ; będą potrzebne dopiero do obliczania wydłużeń."
    },
    {
      "title": "Reakcja w utwierdzeniu",
      "narration": "Jedyna reakcja R musi równoważyć wszystkie siły zewnętrzne. Przy zwrocie w górę jako dodatnim suma sił daje R minus suma obciążeń. Reakcja jest więc skierowana w górę i ma wartość czterech P.",
      "formula": "R-2P-P-P=0\\quad\\Rightarrow\\quad R=4P=80\\,\\mathrm{kN}",
      "caption": "Równowaga całego pręta: 80 kN w górę równoważy 80 kN w dół.",
      "visual": "axial"
    },
    {
      "title": "Metoda przekrojów",
      "narration": "Przecinamy pręt wewnątrz każdego odcinka i rozpatrujemy jego dolną część. Siła N na przecięciu równoważy wyłącznie obciążenia znajdujące poniżej przekroju. W odcinku dolnym jest to P, w środkowym P plus P, a w górnym P plus P plus 2P.",
      "formula": "N_d=P=20\\,\\mathrm{kN},\\quad N_s=P+P=40\\,\\mathrm{kN},\\quad N_g=P+P+2P=80\\,\\mathrm{kN}",
      "caption": "Dla dolnej części po przecięciu dodatnie N działa w dół i równoważy obciążenia.",
      "visual": "axial"
    },
    {
      "title": "Wykres siły podłużnej",
      "narration": "Na każdym odcinku między siłami N jest stałe, ponieważ nie ma obciążenia rozłożonego. Przy przejściu przez siłę skupioną wykres skacze o jej wartość. Idąc od dołu ku górze otrzymujemy kolejno 20, 40 i 80 kN; wszystkie wartości są dodatnie.",
      "formula": "N(x)=\\begin{cases}20\\,\\mathrm{kN}&\\text{odcinek dolny}\\\\40\\,\\mathrm{kN}&\\text{odcinek środkowy}\\\\80\\,\\mathrm{kN}&\\text{odcinek górny}\\end{cases}",
      "caption": "Wykres N: trzy prostokątne stopnie po dodatniej stronie osi.",
      "visual": "diagram",
      "emphasis": "Skok o 40 kN odpowiada sile 2P, a każdy skok o 20 kN sile P."
    },
    {
      "title": "Pole przekroju i jednostki",
      "narration": "Pole jest takie samo na całej długości. Do wzoru N/A wygodnie wstawić N w niutonach i A w milimetrach kwadratowych, bo wynik wyjdzie bezpośrednio w N/mm², czyli megapaskalach.",
      "formula": "A=10\\,\\mathrm{cm^2}=10\\cdot100\\,\\mathrm{mm^2}=1000\\,\\mathrm{mm^2},\\qquad 1\\,\\mathrm{MPa}=1\\,\\mathrm{N/mm^2}",
      "caption": "Jeden centymetr kwadratowy to sto milimetrów kwadratowych.",
      "visual": "axial"
    },
    {
      "title": "Naprężenia w trzech odcinkach",
      "narration": "Dzielimy siłę podłużną każdego odcinka przez to samo pole. Dodatni wynik oznacza naprężenie rozciągające. Największa wartość występuje u góry, gdzie przekrój przenosi sumę wszystkich trzech obciążeń.",
      "formula": "\\sigma_g=\\frac{80\\,000}{1000}=80\\,\\mathrm{MPa},\\quad \\sigma_s=\\frac{40\\,000}{1000}=40\\,\\mathrm{MPa},\\quad \\sigma_d=\\frac{20\\,000}{1000}=20\\,\\mathrm{MPa}",
      "caption": "Naprężenia od góry: +80 MPa, +40 MPa, +20 MPa.",
      "visual": "axial"
    },
    {
      "title": "Wykres naprężeń",
      "narration": "Ponieważ pole jest stałe, wykres σ ma dokładnie takie same stopnie jak wykres N, zmienia się tylko skala. W miejscach przyłożenia sił naprężenie zmienia się skokowo, a między nimi pozostaje stałe.",
      "formula": "\\sigma(x)=\\frac{N(x)}{A}=0,001\\,N(x)\\quad [N(x)\\text{ w N},\\ \\sigma(x)\\text{ w MPa}]",
      "caption": "Wykres σ: +20 MPa na dole, +40 MPa w środku, +80 MPa u góry.",
      "visual": "diagram"
    },
    {
      "title": "Kontrola wyniku",
      "narration": "Najwyższy przekrój tuż pod utwierdzeniem przenosi siłę równą reakcji 80 kN, co potwierdza obliczenia. Nie ma odcinka ściskanego, bo wszystkie obciążenia ciągną pręt w dół od górnej podpory. Wyniki są jednorodne wymiarowo i mają właściwe znaki.",
      "formula": "N_{max}=R=80\\,\\mathrm{kN},\\qquad |\\sigma|_{max}=80\\,\\mathrm{MPa}",
      "caption": "Odpowiedź końcowa obejmuje zarówno wartości, jak i charakter rozciągania.",
      "visual": "diagram"
    }
  ]
} satisfies SolutionData
