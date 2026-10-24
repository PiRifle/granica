import type { SolutionData } from '../../model'

export default {
  "id": "cw7-2",
  "title": "Rozeta tensometryczna 0°/45°/90°",
  "duration": 10,
  "given": [
    "ε₀ = 2,68·10⁻⁴; ε₄₅ = 1,25·10⁻⁴; ε₉₀ = −2,65·10⁻⁴",
    "Oś x pokrywa się z czujnikiem 0°, oś y z czujnikiem 90°; kąt 45° mierzony od x ku y",
    "Założenie materiałowe: stal izotropowa E = 200 GPa = 200 000 MPa, ν = 0,3",
    "Na swobodnej powierzchni przyjmujemy płaski stan naprężenia: σ_z = τ_xz = τ_yz = 0"
  ],
  "result": "γ_xy = 2,47·10⁻⁴; ε_I = 2,95225·10⁻⁴, ε_II = −2,92225·10⁻⁴; φ_I = 12,432°, φ_II = 102,432°; dla stali σ_I = 45,62 MPa, σ_II = −44,76 MPa.",
  "scenes": [
    {
      "title": "Przypisz odczyty do osi",
      "narration": "Czujnik 0° mierzy odkształcenie normalne w kierunku x, a czujnik 90° w kierunku y. Trzeci pomiar pozwoli wyznaczyć odkształcenie postaciowe γ_xy. Wszystkie odkształcenia są bezwymiarowe.",
      "formula": "\\varepsilon_x=\\varepsilon_0=2,68\\cdot10^{-4},\\qquad \\varepsilon_y=\\varepsilon_{90}=-2,65\\cdot10^{-4}",
      "caption": "Dodatnie ε_x oznacza wydłużenie w kierunku x, ujemne ε_y — skrócenie w kierunku y.",
      "visual": "rosette"
    },
    {
      "title": "Wyznacz odkształcenie postaciowe",
      "narration": "Transformacja odkształcenia normalnego dla kąta 45° daje ε₄₅ = (ε_x + ε_y)/2 + γ_xy/2. Po przekształceniu γ_xy = 2ε₄₅ − ε₀ − ε₉₀.",
      "formula": "\\gamma_{xy}=2(1,25\\cdot10^{-4})-2,68\\cdot10^{-4}-(-2,65\\cdot10^{-4})=2,47\\cdot10^{-4}",
      "caption": "Pomiar pod 45° nie jest odkształceniem postaciowym; trzeba go przeliczyć z trzech odczytów.",
      "visual": "rosette"
    },
    {
      "title": "Oblicz środek i promień koła odkształceń",
      "narration": "Średnia odkształceń normalnych wyznacza środek koła Mohra. Promień obejmuje połowę różnicy ε_x − ε_y oraz połowę γ_xy. Dzięki temu znajdziemy skrajne odkształcenia normalne.",
      "formula": "\\varepsilon_{sr}=\\frac{\\varepsilon_x+\\varepsilon_y}{2}=1,50\\cdot10^{-6},\\qquad R_\\varepsilon=\\sqrt{\\left(\\frac{\\varepsilon_x-\\varepsilon_y}{2}\\right)^2+\\left(\\frac{\\gamma_{xy}}{2}\\right)^2}=2,937252\\cdot10^{-4}",
      "caption": "Tutaj (ε_x − ε_y)/2 = 2,665·10⁻⁴, a γ_xy/2 = 1,235·10⁻⁴.",
      "visual": "diagram"
    },
    {
      "title": "Wyznacz odkształcenia główne",
      "narration": "Odkształcenia główne są skrajnymi punktami koła: średnia plus lub minus promień. W kierunkach głównych odkształcenie postaciowe znika.",
      "formula": "\\varepsilon_{I,II}=\\varepsilon_{sr}\\pm R_\\varepsilon",
      "caption": "ε_I = 2,952252·10⁻⁴ oraz ε_II = −2,922252·10⁻⁴.",
      "visual": "diagram"
    },
    {
      "title": "Wyznacz kierunki główne",
      "narration": "Kierunek pierwszego odkształcenia głównego znajdujemy z równania transformacji. Tangens podwójnego kąta to γ_xy/(ε_x − ε_y). Wybieramy rozwiązanie odpowiadające ε_I; drugi kierunek jest prostopadły.",
      "formula": "\\tan2\\varphi_I=\\frac{\\gamma_{xy}}{\\varepsilon_x-\\varepsilon_y}=\\frac{2,47}{5,33},\\qquad \\varphi_I=\\tfrac12\\arctan(0,463415)=12,4318^\\circ",
      "caption": "φ_I = 12,432° od czujnika 0° w stronę czujnika 90°, a φ_II = 102,432°.",
      "visual": "rosette",
      "emphasis": "Kąt na kole Mohra wynosi 2φ, ale kierunek fizyczny na elemencie to φ."
    },
    {
      "title": "Przyjmij model materiału i powierzchni",
      "narration": "Materiał nie jest określony, więc jawnie przyjmujemy stal o E = 200 GPa i ν = 0,3. Na nieobciążonej powierzchni stosujemy płaski stan naprężenia. Dla materiału izotropowego kierunki główne naprężeń i odkształceń pokrywają się.",
      "formula": "E=200\\,000\\ \\text{MPa},\\qquad \\nu=0,3,\\qquad \\frac{E}{1-\\nu^2}=219\\,780,22\\ \\text{MPa}",
      "caption": "Podane niżej naprężenia zależą od tego założenia; same kierunki i odkształcenia od niego nie zależą.",
      "visual": "rosette"
    },
    {
      "title": "Przelicz odkształcenia na naprężenia główne",
      "narration": "W płaskim stanie naprężenia odwracamy prawo Hooke’a w kierunkach głównych. Nie wolno użyć osobno σ = Eε, ponieważ naprężenie w jednym kierunku zależy także od odkształcenia w kierunku prostopadłym.",
      "formula": "\\sigma_I=\\frac{E}{1-\\nu^2}(\\varepsilon_I+\\nu\\varepsilon_{II}),\\qquad \\sigma_{II}=\\frac{E}{1-\\nu^2}(\\varepsilon_{II}+\\nu\\varepsilon_I)",
      "caption": "To wzory dla płaskiego stanu naprężenia, nie płaskiego stanu odkształcenia.",
      "visual": "diagram"
    },
    {
      "title": "Oblicz wartości naprężeń",
      "narration": "Po podstawieniu σ_I = 219 780,22·(2,952252·10⁻⁴ − 0,3·2,922252·10⁻⁴) = 45,617 MPa. Analogicznie σ_II = 219 780,22·(−2,922252·10⁻⁴ + 0,3·2,952252·10⁻⁴) = −44,760 MPa.",
      "formula": "\\boxed{\\sigma_I=45,62\\ \\text{MPa},\\qquad \\sigma_{II}=-44,76\\ \\text{MPa}}",
      "caption": "Naprężenie σ_I jest rozciągające, a σ_II ściskające.",
      "visual": "diagram"
    },
    {
      "title": "Sprawdź wynik w osiach pomiarowych",
      "narration": "Kontrolnie prawo Hooke’a w osiach x i y daje σ_x = 41,429 MPa i σ_y = −40,571 MPa. Moduł Kirchhoffa G = E/[2(1 + ν)] = 76 923,08 MPa, więc τ_xy = Gγ_xy = 19,00 MPa. Transformacja tych wartości prowadzi do tych samych naprężeń głównych.",
      "formula": "\\sigma_{I,II}=\\frac{41,429-40,571}{2}\\pm\\sqrt{\\left(\\frac{41,429+40,571}{2}\\right)^2+19^2}=45,62;\\,-44,76\\ \\text{MPa}",
      "caption": "To niezależne sprawdzenie obliczeń z rozety.",
      "visual": "diagram"
    },
    {
      "title": "Zinterpretuj pełną odpowiedź",
      "narration": "W punkcie A jeden kierunek główny jest nachylony o 12,432° od osi czujnika 0°, a drugi jest do niego prostopadły. Dla przyjętej stali występują odpowiednio rozciąganie 45,62 MPa i ściskanie 44,76 MPa. Trzecie naprężenie normalne na swobodnej powierzchni wynosi zero; tu podajemy dwa naprężenia główne w płaszczyźnie pomiaru.",
      "formula": "\\boxed{\\varphi_I=12,432^\\circ,\\quad \\varphi_II=102,432^\\circ,\\quad \\sigma_I=45,62\\ \\text{MPa},\\quad \\sigma_{II}=-44,76\\ \\text{MPa}}",
      "caption": "Wyniki naprężeń są poprawne dla E = 200 GPa i ν = 0,3 przyjętych na początku rozwiązania.",
      "visual": "rosette",
      "emphasis": "Rozeta daje najpierw stan odkształcenia; dopiero model materiału pozwala otrzymać naprężenia."
    }
  ]
} satisfies SolutionData
