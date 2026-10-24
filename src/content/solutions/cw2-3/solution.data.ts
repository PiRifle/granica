import type { SolutionData } from '../../model'

export default {
  "id": "cw2-3",
  "title": "Ogrzany pręt z luzem przy dolnej podporze",
  "duration": 13,
  "given": [
    "L₁ = 250 mm, d₁ = 90 mm; L₂ = 300 mm, d₂ = 80 mm",
    "a = 1,20 mm, α = 12·10⁻⁶ K⁻¹, ΔT = 200 K",
    "E = 300 GPa = 300 000 MPa — wartość z treści zadania",
    "Górny koniec jest utwierdzony; dolna podpora działa dopiero po zamknięciu luzu"
  ],
  "result": "Swobodne ΔLT = 1,32 mm > a, więc luz zostaje zamknięty. Po kontakcie R = 363,708 kN; σ₁ = −57,17 MPa, σ₂ = −72,36 MPa. Odkształcenia całkowite: +0,00220943 i +0,00215881; ΔL₁ + ΔL₂ = 1,20 mm.",
  "scenes": [
    {
      "title": "Model z luzem",
      "narration": "Na początku dolny koniec nie styka się z podporą, więc pręt może się wydłużać swobodnie o luz a. Górne utwierdzenie nie stawia oporu osiowemu przesuwaniu dolnego końca jako całości; bez kontaktu reakcje osiowe i naprężenia termiczne są zerowe.",
      "formula": "a=1,20\\,\\mathrm{mm},\\qquad L_1+L_2=250+300=550\\,\\mathrm{mm}",
      "caption": "Najpierw badamy ruch swobodny, dopiero potem ewentualny kontakt.",
      "visual": "thermal"
    },
    {
      "title": "Czy luz zostanie zamknięty?",
      "narration": "Przy zerowych reakcjach całe wydłużenie jest termiczne. Wynosi 1,32 mm, czyli o 0,12 mm więcej niż dostępny luz. Dolny koniec zetknie się zatem z podporą, a dalsza swoboda ruchu zostanie zablokowana.",
      "formula": "\\Delta L_T=\\alpha\\Delta T(L_1+L_2)=0,0024\\cdot550=1,32\\,\\mathrm{mm}>a",
      "caption": "Luz zostaje zamknięty; po kontakcie pozostaje 0,12 mm nadwyżki do zniesienia przez ściskanie.",
      "visual": "thermal",
      "emphasis": "Gdyby ΔLT ≤ a, dolna reakcja i naprężenia pozostałyby zerowe."
    },
    {
      "title": "Reakcje po kontakcie",
      "narration": "Po zamknięciu luzu działają dwie reakcje osiowe: górna i dolna. Równowaga daje jedynie równe wartości R i przeciwne zwroty. Nie znamy R z równowagi, więc układ staje się statycznie niewyznaczalny. Potrzebny jest warunek, że całkowite wydłużenie jest równe pierwotnemu luzowi.",
      "formula": "\\Delta L_1+\\Delta L_2=a=1,20\\,\\mathrm{mm}",
      "caption": "Podpory działają do wewnątrz i ściskają pręt siłą R.",
      "visual": "thermal"
    },
    {
      "title": "Metoda przekrojów i wykres N",
      "narration": "Po kontakcie przekrój w dowolnym odcinku przenosi tę samą reakcję. Nie ma sił osiowych przyłożonych wzdłuż długości, więc N jest stałe w obu częściach. Przyjmujemy N = −R, ponieważ ogrzewanie po zablokowaniu wywołuje ściskanie.",
      "formula": "N_1=N_2=-R",
      "caption": "Przed kontaktem N = 0; po kontakcie wykres N jest stały i ujemny.",
      "visual": "diagram"
    },
    {
      "title": "Pola i podatności szeregowe",
      "narration": "Pola są takie same jak w zadaniu poprzednim, ale długości i moduł E są inne. Obliczamy podatności L/EA i dodajemy je, ponieważ odcinki połączone szeregowo przenoszą wspólną siłę, a ich przemieszczenia się sumują.",
      "formula": "A_1=6361,725\\,\\mathrm{mm^2},\\ A_2=5026,548\\,\\mathrm{mm^2};\\quad f=\\frac{250}{300\\,000A_1}+\\frac{300}{300\\,000A_2}=3,2993540\\cdot10^{-7}\\,\\mathrm{mm/N}",
      "caption": "f₁ = 1,3099172·10⁻⁷ mm/N, f₂ = 1,9894368·10⁻⁷ mm/N.",
      "visual": "axial"
    },
    {
      "title": "Warunek zgodności po zamknięciu luzu",
      "narration": "Całkowite wydłużenie jest sumą termicznego wydłużenia 1,32 mm i mechanicznego skrócenia Rf. Ma być równe 1,20 mm. Dlatego sprężyste skrócenie znosi tylko nadwyżkę 0,12 mm, a nie całe wydłużenie termiczne.",
      "formula": "1,32-Rf=1,20\\quad\\Rightarrow\\quad R=\\frac{0,12}{3,2993540\\cdot10^{-7}}=363\\,707,56\\,\\mathrm{N}=363,708\\,\\mathrm{kN}",
      "caption": "Po kontakcie obie reakcje mają wartość 363,708 kN.",
      "visual": "thermal"
    },
    {
      "title": "Naprężenia w obu odcinkach",
      "narration": "Dzielimy tę samą siłę ściskającą przez dwa pola. Otrzymujemy ujemne naprężenia; większą wartość bezwzględną ma odcinek o mniejszej średnicy d₂.",
      "formula": "\\sigma_1=-\\frac{363\\,707,56}{6361,725}=-57,17\\,\\mathrm{MPa},\\qquad \\sigma_2=-\\frac{363\\,707,56}{5026,548}=-72,36\\,\\mathrm{MPa}",
      "caption": "Wykres σ po kontakcie ma dwa ujemne poziomy.",
      "visual": "diagram"
    },
    {
      "title": "Odkształcenia mechaniczne i całkowite",
      "narration": "Mechaniczne odkształcenia wynoszą σ/E i są bardzo małe w porównaniu z odkształceniem termicznym 0,0024, ponieważ większość wydłużenia mieści się w luzie. Całkowite odkształcenia obu odcinków pozostają dodatnie.",
      "formula": "\\varepsilon_1=0,0024-\\frac{57,1712}{300\\,000}=0,00220943,\\qquad \\varepsilon_2=0,0024-\\frac{72,3573}{300\\,000}=0,00215881",
      "caption": "Ujeme jest naprężenie, ale całkowite odkształcenia są dodatnie — to nie jest sprzeczność.",
      "visual": "thermal"
    },
    {
      "title": "Wydłużenia odcinków i warunek końcowy",
      "narration": "Odcinek górny wydłuża się o 0,55236 mm, a dolny o 0,64764 mm. Suma wynosi dokładnie 1,20 mm, czyli dolny koniec dociera do podpory, lecz jej nie przekracza.",
      "formula": "\\Delta L_1=250\\cdot0,0022094293=0,552357\\,\\mathrm{mm},\\quad \\Delta L_2=300\\cdot0,0021588089=0,647643\\,\\mathrm{mm}",
      "caption": "0,552357 + 0,647643 = 1,200000 mm = a.",
      "visual": "thermal"
    },
    {
      "title": "Kontrola hipotezy kontaktu",
      "narration": "Otrzymana siła R jest dodatnia przy założeniu ściskania, więc podpora rzeczywiście dociska pręt i hipoteza kontaktu jest spójna. Gdyby z równania wyszła ujemna R, należałoby odrzucić kontakt i wrócić do rozwiązania swobodnego. Tutaj potwierdza to też wcześniejsza nierówność 1,32 > 1,20.",
      "formula": "R>0,\\qquad \\Delta L_T-Rf=1,32-0,12=1,20\\,\\mathrm{mm}=a",
      "caption": "Rozwiązanie statycznie niewyznaczalne jest aktywne tylko po zamknięciu luzu.",
      "visual": "diagram"
    }
  ]
} satisfies SolutionData
