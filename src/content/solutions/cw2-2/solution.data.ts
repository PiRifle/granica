import type { SolutionData } from '../../model'

export default {
  id: 'cw2-2',
  title: 'Ogrzany pręt stopniowany między dwoma utwierdzeniami',
  duration: 12,
  given: [
    'L₁ = 200 mm, d₁ = 90 mm; L₂ = 220 mm, d₂ = 80 mm',
    'α = 12·10⁻⁶ K⁻¹, ΔT = 200 K, E = 200 GPa',
    'Oba końce pozostają nieruchome; brak luzu',
    'Model liniowo sprężysty; ciężar własny pomijamy',
  ],
  result:
    'Reakcje ściskają pręt siłą R = 2,681 MN. N₁ = N₂ = −2,681 MN; σ₁ = −421,37 MPa, σ₂ = −533,30 MPa. Odkształcenia całkowite: ε₁ = +0,00029314, ε₂ = −0,00026649; wydłużenia odcinków +0,05863 mm i −0,05863 mm.',
  scenes: [
    {
      title: 'Model pełnego utwierdzenia',
      narration:
        'Górny odcinek ma średnicę d₁, a dolny d₂. Oba końce są zamocowane do nieruchomych podpór, więc łączna długość 420 mm nie może się zmienić. Ogrzewanie o 200 K daje względne wydłużenie termiczne αΔT = 0,0024 na każdym odcinku.',
      formula: '\\alpha\\Delta T=12\\cdot10^{-6}\\cdot200=0,0024',
      caption: 'Pełne utwierdzenie oznacza warunek ΔL₁ + ΔL₂ = 0.',
      visual: 'thermal',
    },
    {
      title: 'Swoboda, reakcje i niewyznaczalność',
      narration:
        'Gdyby podpory nie blokowały pręta, wydłużyłby się łącznie o 1,008 mm i nie powstałoby naprężenie. Tutaj podpory temu przeciwdziałają, więc działają na pręt do wewnątrz. Mamy dwie reakcje osiowe, ale tylko jedno równanie równowagi; drugie równanie dostarczy zgodność odkształceń.',
      formula: '\\Delta L_T=\\alpha\\Delta T(L_1+L_2)=0,0024\\cdot420=1,008\\,\\mathrm{mm}',
      caption: 'Reakcje mają równe wartości R i przeciwne zwroty; ściskają pręt.',
      visual: 'thermal',
      emphasis: 'Sama równowaga nie wystarczy — układ jest statycznie niewyznaczalny.',
    },
    {
      title: 'Przekrój i wykres N',
      narration:
        'Po przecięciu dowolnego odcinka siła wewnętrzna równoważy reakcję podpory. Między podporami nie ma innych sił osiowych, dlatego N jest takie samo w obu częściach i wynosi −R. Znak minus oznacza ściskanie.',
      formula: 'N_1=N_2=-R',
      caption: 'Wykres N jest jednym ujemnym prostokątem na całej długości pręta.',
      visual: 'diagram',
    },
    {
      title: 'Pola przekrojów',
      narration:
        'Liczymy pola kół bez wczesnego zaokrąglania. Większa średnica górnego odcinka daje większe pole, więc przy tej samej sile N jego naprężenie będzie mniejsze co do wartości bezwzględnej.',
      formula:
        'A_1=\\frac{\\pi90^2}{4}=6361,725\\,\\mathrm{mm^2},\\qquad A_2=\\frac{\\pi80^2}{4}=5026,548\\,\\mathrm{mm^2}',
      caption: 'A₁ jest większe od A₂, ale siła podłużna jest wspólna.',
      visual: 'axial',
    },
    {
      title: 'Sztywności połączone szeregowo',
      narration:
        'Sztywność osiowa odcinka to EA/L, a odwrotność, czyli podatność, wynosi L/EA. Odcinki są połączone szeregowo, więc ta sama siła przechodzi przez oba, a ich skrócenia się sumują. Dlatego dodajemy podatności, nie sztywności.',
      formula:
        'f=\\frac{L_1}{EA_1}+\\frac{L_2}{EA_2}=1,5719007\\cdot10^{-7}+2,1883805\\cdot10^{-7}=3,7602811\\cdot10^{-7}\\,\\mathrm{mm/N}',
      caption: 'Równoważna podatność dwóch odcinków wynosi f = f₁ + f₂.',
      visual: 'axial',
      emphasis: 'Dla połączenia szeregowego: k = 1/f; nie wolno liczyć k₁ + k₂.',
    },
    {
      title: 'Warunek zgodności i siła R',
      narration:
        'Swobodne wydłużenie termiczne musi zostać zniesione sprężystym skróceniem Rf. Stąd wyznaczamy wspólną siłę ściskającą. Reakcje podpór mają wartość R i skierowane są do wewnątrz pręta.',
      formula:
        '\\Delta L_T-Rf=0\\quad\\Rightarrow\\quad R=\\frac{1,008}{3,7602811\\cdot10^{-7}}=2\\,680\\,650,63\\,\\mathrm{N}\\approx2,681\\,\\mathrm{MN}',
      caption: 'Każda podpora działa na pręt siłą około 2,681 MN.',
      visual: 'thermal',
    },
    {
      title: 'Naprężenia ściskające',
      narration:
        'Ta sama siła wewnętrzna działa na różne pola. Wyniki są ujemne. Większe co do wartości ściskanie występuje w cieńszym dolnym odcinku.',
      formula:
        '\\sigma_1=-\\frac{R}{A_1}=-421,37\\,\\mathrm{MPa},\\qquad \\sigma_2=-\\frac{R}{A_2}=-533,30\\,\\mathrm{MPa}',
      caption: 'Wykres σ ma dwa ujemne poziomy; skok następuje na zmianie średnicy.',
      visual: 'diagram',
    },
    {
      title: 'Odkształcenia mechaniczne i całkowite',
      narration:
        'Odkształcenie mechaniczne σ/E jest ujemne, a termiczne αΔT dodatnie. Całkowite odkształcenie jest ich sumą. W grubszym odcinku pozostaje małe wydłużenie, a w cieńszym niewielkie skrócenie.',
      formula:
        '\\varepsilon_1=0,0024-\\frac{421,3717}{200\\,000}=+0,00029314,\\qquad \\varepsilon_2=0,0024-\\frac{533,2985}{200\\,000}=-0,00026649',
      caption: 'Odkształcenie całkowite obejmuje część termiczną i mechaniczną.',
      visual: 'thermal',
    },
    {
      title: 'Odkształcenia odcinków i suma końcowa',
      narration:
        'Mnożąc odkształcenia całkowite przez długości otrzymujemy +0,05863 mm dla L₁ i −0,05863 mm dla L₂. Ich suma jest zerowa, zgodnie z pełnym utwierdzeniem. Nie oznacza to, że każdy odcinek ma zerowe odkształcenie.',
      formula:
        '\\Delta L_1=200\\cdot0,0002931417=+0,058628\\,\\mathrm{mm},\\quad \\Delta L_2=220\\cdot(-0,0002664925)=-0,058628\\,\\mathrm{mm}',
      caption: 'ΔL₁ + ΔL₂ = 0; warunek zgodności jest spełniony.',
      visual: 'thermal',
      emphasis:
        'Wynik jest formalnym rozwiązaniem sprężystym; dla rzeczywistej stali tak duże naprężenia wymagałyby osobnego sprawdzenia granicy plastyczności.',
    },
    {
      title: 'Kontrola przez osobne składowe wydłużeń',
      narration:
        'Termiczne wydłużenia odcinków wynoszą 0,480 i 0,528 mm. Mechaniczne skrócenia to odpowiednio 0,42137 i 0,58663 mm. Sumy na odcinkach dają poprzednie przemieszczenia, a suma wszystkich czterech składowych jest zerowa.',
      formula: '(0,480-0,4213717)+(0,528-0,5866283)=0,0586283-0,0586283=0',
      caption: 'Bilans termiczny i mechaniczny potwierdza reakcje oraz znaki naprężeń.',
      visual: 'diagram',
    },
  ],
} satisfies SolutionData
