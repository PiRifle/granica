import type { SolutionData } from '../../model'

export default {
  id: 'cw2-1',
  title: 'Naprężenia, odkształcenia i wydłużenie pręta stopniowanego',
  duration: 12,
  given: [
    'P₁ = 30 kN, P₂ = 40 kN; Nα = 30 kN, Nβ = Nγ = 70 kN',
    'A₁ = 200 mm², A₂ = 500 mm²',
    'Lα = 1500 mm, Lβ = Lγ = 1000 mm',
    'Dla stali przyjmujemy E = 200 GPa = 200 000 MPa',
  ],
  result:
    'σα = 150 MPa, σβ = σγ = 140 MPa; εα = 0,00075, εβ = εγ = 0,00070. Wydłużenia: 1,125 mm, 0,700 mm, 0,700 mm; ΔL = 2,525 mm.',
  figure: {
    kind: 'axial',
    top: 'fixed',
    bottom: 'free',
    units: { N: 'kN', σ: 'MPa', ε: '–', ΔL: 'mm', A: 'mm²' },
    segments: [
      { id: 'γ', label: 'γ', length: 1000, area: 500, n: 70, sigma: 140, epsilon: 0.0007, deltaL: 0.7 },
      { id: 'β', label: 'β', length: 1000, area: 500, n: 70, sigma: 140, epsilon: 0.0007, deltaL: 0.7 },
      { id: 'α', label: 'α', length: 1500, area: 200, n: 30, sigma: 150, epsilon: 0.00075, deltaL: 1.125 },
    ],
    loads: [
      { node: 2, value: 40, label: 'P₂ = 40 kN' },
      { node: 3, value: 30, label: 'P₁ = 30 kN' },
    ],
    note: 'E = 200 000 MPa; suma wydłużeń odcinków daje 2,525 mm.',
  },
  scenes: [
    {
      title: 'Model i przyjęcie modułu Younga',
      narration:
        'Geometria i obciążenia są takie jak w poprzednim zadaniu. Do odkształceń potrzebujemy dodatkowo modułu Younga; dla stali przyjmujemy typową wartość E = 200 GPa. Model jest liniowo sprężysty, więc naprężenie i odkształcenie łączy prawo Hooke’a.',
      formula: 'E=200\\,\\mathrm{GPa}=200\\,000\\,\\mathrm{N/mm^2},\\qquad \\varepsilon=\\frac{\\sigma}{E}',
      caption: 'Najpierw powtarzamy bilans sił, potem liczymy deformacje.',
      visual: 'axial',
    },
    {
      title: 'Reakcja i metoda przekrojów',
      narration:
        'Reakcja górna równoważy 30 i 40 kN. Przekrój w α obciąża tylko P₁, natomiast przekroje w β i γ obciążają obie siły. Dzięki temu odtwarzamy siły podłużne bez rozpatrywania odkształceń — zadanie jest statycznie wyznaczalne.',
      formula: 'R=70\\,\\mathrm{kN};\\qquad N_\\alpha=30\\,\\mathrm{kN},\\quad N_\\beta=N_\\gamma=70\\,\\mathrm{kN}',
      caption: 'Wszystkie odcinki są rozciągane.',
      visual: 'axial',
    },
    {
      title: 'Wykres siły podłużnej',
      narration:
        'Wykres N ma poziom +30 kN w α oraz +70 kN w β i γ. Skok o 40 kN występuje przy P₂. Brak skoku między β i γ potwierdza, że dzieli je jedynie oznaczenie odcinków, a nie dodatkowe obciążenie.',
      formula: 'N_\\beta-N_\\alpha=70-30=40\\,\\mathrm{kN}=P_2',
      caption: 'Skok wykresu jest równy sile skupionej.',
      visual: 'diagram',
    },
    {
      title: 'Pola i naprężenia',
      narration:
        'Pola wynoszą 200 mm² w α oraz 500 mm² w β i γ. Po podzieleniu sił przez pola otrzymujemy stałe naprężenia na poszczególnych odcinkach. Wszystkie są dodatnie.',
      formula:
        '\\sigma_\\alpha=\\frac{30\\,000}{200}=150\\,\\mathrm{MPa},\\qquad \\sigma_\\beta=\\sigma_\\gamma=\\frac{70\\,000}{500}=140\\,\\mathrm{MPa}',
      caption: 'Wykres σ: 150 MPa w α i 140 MPa w pozostałych odcinkach.',
      visual: 'diagram',
    },
    {
      title: 'Odkształcenia względne',
      narration:
        'Odkształcenie względne mówi, o jaką część długości początkowej wydłuża się odcinek. Jest bezwymiarowe. Dzielimy naprężenia przez 200 000 MPa, nie przez 200, ponieważ obie wielkości muszą mieć zgodne jednostki.',
      formula:
        '\\varepsilon_\\alpha=\\frac{150}{200\\,000}=0,00075,\\qquad \\varepsilon_\\beta=\\varepsilon_\\gamma=\\frac{140}{200\\,000}=0,00070',
      caption: 'Można to też zapisać jako 0,075% oraz 0,070%.',
      visual: 'diagram',
    },
    {
      title: 'Wydłużenie odcinka α',
      narration:
        'Najdłuższy odcinek ma długość 1500 mm. Jego wydłużenie można policzyć jako εα razy Lα albo bezpośrednio ze wzoru NL/EA. Oba sposoby dają 1,125 mm.',
      formula: '\\Delta L_\\alpha=\\varepsilon_\\alpha L_\\alpha=0,00075\\cdot1500=1,125\\,\\mathrm{mm}',
      caption: 'Dolny, cieńszy odcinek wydłuża się najbardziej.',
      visual: 'axial',
    },
    {
      title: 'Wydłużenia odcinków β i γ',
      narration:
        'Każdy z tych odcinków ma długość 1000 mm i odkształcenie 0,00070. Wydłużenie jednego wynosi 0,700 mm. Nie sumujemy jeszcze naprężeń ani odkształceń — sumowaniu podlegają wydłużenia odcinków.',
      formula: '\\Delta L_\\beta=\\Delta L_\\gamma=0,00070\\cdot1000=0,700\\,\\mathrm{mm}',
      caption: 'β i γ mają jednakowe wydłużenia, bo mają te same N, A, E i L.',
      visual: 'axial',
    },
    {
      title: 'Suma wydłużeń',
      narration:
        'Odcinki tworzą jeden pręt szeregowy, więc przemieszczenie dolnego końca jest sumą ich wydłużeń. Wynik jest dodatni, czyli koniec przesuwa się w dół o 2,525 mm względem nieruchomego utwierdzenia.',
      formula: '\\Delta L=1,125+0,700+0,700=2,525\\,\\mathrm{mm}',
      caption: 'Całkowite wydłużenie pręta wynosi 2,525 mm.',
      visual: 'axial',
      emphasis: 'Nie wolno uśredniać naprężeń i mnożyć ich przez całą długość; liczymy każdy odcinek osobno.',
    },
    {
      title: 'Przemieszczenia i kontrola',
      narration:
        'Przemieszczenie na granicy β/γ wynosi tylko 0,700 mm, na granicy α/β już 1,400 mm, a na dole 2,525 mm. Suma sprawdza się też w jednym wzorze z jednostkami N, mm i N/mm².',
      formula:
        '\\Delta L=\\frac{30\\,000\\cdot1500}{200\\,000\\cdot200}+2\\frac{70\\,000\\cdot1000}{200\\,000\\cdot500}=1,125+1,400=2,525\\,\\mathrm{mm}',
      caption: 'Wynik końcowy jest zgodny z sumą przemieszczeń kolejnych poziomów.',
      visual: 'diagram',
    },
  ],
} satisfies SolutionData
