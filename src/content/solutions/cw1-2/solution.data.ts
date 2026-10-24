import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'cw1-2',
  title: 'Pręt stopniowany z przekrojem kołowym i kwadratowym',
  duration: 9,
  animation: lazy(() => import('./animation').then((module) => ({ default: module.SteppedBarStressAnimation }))),
  given: [
    'P₂ = 50 kN na górnym końcu',
    'Dwie siły P₁ = 60 kN każda, przyłożone na poziomie stopnia',
    'Odcinek górny: długość 500 mm, koło o średnicy d = 20 mm',
    'Odcinek dolny: długość 200 mm, kwadrat o boku a = 40 mm',
  ],
  result:
    'N górnego odcinka wynosi 50 kN, a dolnego 170 kN; oba są rozciągane. Naprężenia wynoszą odpowiednio 159,15 MPa i 106,25 MPa. Reakcja dolna ma wartość 170 kN.',
  figure: {
    kind: 'axial',
    top: 'free',
    bottom: 'fixed',
    units: { N: 'kN', σ: 'MPa', A: 'mm²' },
    segments: [
      { id: 'górny', label: 'górny · koło', length: 500, area: 314.159, n: 50, sigma: 159.15 },
      { id: 'dolny', label: 'dolny · kwadrat', length: 200, area: 1600, n: 170, sigma: 106.25 },
    ],
    loads: [
      { node: 0, value: 50, label: 'P₂ = 50 kN' },
      { node: 1, value: 120, label: '2P₁ = 120 kN' },
    ],
    note: 'Szerokość pręta na rysunku jest proporcjonalna do pierwiastka z pola przekroju.',
  },
  scenes: [
    {
      title: 'Budujemy model osiowy',
      narration:
        'Górny koniec jest swobodny i obciążony siłą P₂ w dół. Na stopniu działają dwie symetryczne siły P₁, również w dół; każda ma 60 kN. Dolny koniec jest utwierdzony. Centralne i symetryczne przyłożenie obciążeń pozwala pominąć zginanie i liczyć samo rozciąganie osiowe.',
      formula: 'P_2=50\\,\\mathrm{kN},\\qquad \\sum P_1=2\\cdot60=120\\,\\mathrm{kN}',
      caption: 'Na rysunku są dwie strzałki P₁ — nie wolno policzyć tylko jednej.',
      visual: 'axial',
      focus: { metric: 'model' },
      emphasis: 'Całkowite obciążenie na stopniu to 120 kN, a nie 60 kN.',
    },
    {
      title: 'Reakcja dolnej podpory',
      narration:
        'Równowaga pionowa całego pręta wymaga reakcji R skierowanej w górę. Równoważy ona siłę 50 kN na końcu i dwie siły po 60 kN na stopniu.',
      formula: 'R-P_2-2P_1=0\\quad\\Rightarrow\\quad R=50+2\\cdot60=170\\,\\mathrm{kN}',
      caption: 'Dolne utwierdzenie przejmuje 170 kN.',
      visual: 'axial',
      focus: { metric: 'R' },
    },
    {
      title: 'Przekrój przez odcinek górny',
      narration:
        'Przecinamy cienki odcinek powyżej stopnia i zostawiamy górną część. Na tę część działa tylko P₂, dlatego wewnętrzna siła N₂ musi mieć wartość 50 kN. Pręt jest rozciągany: dolna część trzyma górną i przeciwdziała jej ruchowi w dół.',
      formula: 'N_2=P_2=50\\,\\mathrm{kN}>0',
      caption: 'Powyżej stopnia siły P₁ nie wchodzą jeszcze do równowagi odciętej części.',
      visual: 'axial',
      focus: { metric: 'N', segment: 'górny' },
    },
    {
      title: 'Przekrój przez odcinek dolny',
      narration:
        'Teraz tniemy poniżej stopnia. Nad przekrojem znajdują się wszystkie trzy siły zewnętrzne, więc N₁ równoważy ich sumę. Siła jest dodatnia, czyli dolny odcinek także jest rozciągany.',
      formula: 'N_1=P_2+2P_1=50+120=170\\,\\mathrm{kN}>0',
      caption: 'Grubszy odcinek przenosi większą siłę, bo zbiera obciążenia z całej części górnej.',
      visual: 'axial',
      focus: { metric: 'N', segment: 'dolny' },
    },
    {
      title: 'Wykres siły podłużnej',
      narration:
        'Od swobodnego końca do stopnia wykres ma wartość +50 kN. Na stopniu dwie siły P₁ powodują łączny skok o 120 kN. Poniżej stopnia wykres jest stały na poziomie +170 kN aż do reakcji.',
      formula:
        'N(x)=\\begin{cases}50\\,\\mathrm{kN}&0<x<500\\,\\mathrm{mm}\\\\170\\,\\mathrm{kN}&500<x<700\\,\\mathrm{mm}\\end{cases}',
      caption: 'Dwa poziomy N i jeden skok o 120 kN na stopniu.',
      visual: 'diagram',
      focus: { metric: 'N' },
    },
    {
      title: 'Pola dwóch przekrojów',
      narration:
        'Górny przekrój jest kołem o średnicy 20 mm, a dolny kwadratem o boku 40 mm. Zachowujemy dokładne wyrażenie z π dla koła, aby zaokrąglić dopiero końcowe naprężenie.',
      formula:
        'A_2=\\frac{\\pi d^2}{4}=\\frac{\\pi\\cdot20^2}{4}=100\\pi=314,159\\,\\mathrm{mm^2},\\qquad A_1=a^2=40^2=1600\\,\\mathrm{mm^2}',
      caption: 'Pole kwadratu jest ponad pięć razy większe od pola koła.',
      visual: 'axial',
      focus: { metric: 'A' },
    },
    {
      title: 'Naprężenie w górnym odcinku',
      narration:
        'W górnym odcinku dzielimy 50 kN przez małe pole koła. Wynik 159,15 MPa jest największym naprężeniem w całym pręcie, mimo że działa tu mniejsza siła wewnętrzna.',
      formula: '\\sigma_2=\\frac{50\\,000}{314{,}159}=159{,}15\\,\\mathrm{MPa}',
      caption: 'Górny odcinek: σ₂ = 159,15 MPa — przekrój krytyczny.',
      visual: 'axial',
      focus: { metric: 'σ', segment: 'górny' },
      emphasis: 'Większa siła N nie oznacza automatycznie większego naprężenia — decyduje iloraz N/A.',
    },
    {
      title: 'Naprężenie w dolnym odcinku',
      narration:
        'W dolnym odcinku dzielimy 170 kN przez pole kwadratu. Mimo ponad trzykrotnie większej siły naprężenie jest mniejsze niż w górnym odcinku, ponieważ przekrój jest odpowiednio duży.',
      formula: '\\sigma_1=\\frac{170\\,000}{1600}=106{,}25\\,\\mathrm{MPa}',
      caption: 'Dolny odcinek: σ₁ = 106,25 MPa. Oba naprężenia są dodatnie, czyli rozciągające.',
      visual: 'axial',
      focus: { metric: 'σ', segment: 'dolny' },
    },
    {
      title: 'Wykres σ i kontrola równowagi',
      narration:
        'Na stopniu zmieniają się jednocześnie N i A, więc naprężenie spada ze 159,15 do 106,25 MPa. Na każdym odcinku jest stałe. Tuż nad dolnym utwierdzeniem N₁ = 170 kN zgadza się z reakcją, co zamyka kontrolę równowagi.',
      formula: '\\sigma_{max}=\\sigma_2=159{,}15\\,\\mathrm{MPa},\\qquad N_1=R=170\\,\\mathrm{kN}',
      caption: 'Wykres naprężeń ma dwa dodatnie poziomy; większy jest w cieńszym odcinku.',
      visual: 'diagram',
      focus: { metric: 'σmax' },
    },
  ],
} satisfies SolutionData
