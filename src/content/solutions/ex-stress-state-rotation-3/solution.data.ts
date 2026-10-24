import type { SolutionData } from '../../model'

export default {
  id: 'ex-stress-state-rotation-3',
  title: 'Obrót przekroju: ten sam stan, inne liczby — przykład 3',
  duration: 7,
  given: ['θ = 0: σ = 80 MPa, τ = 30 MPa', 'θ = 45°: σ = 70 MPa'],
  result:
    'Warto zauważyć, że z dwóch pomiarów odtworzyliśmy trzy niewiadome, bo jedna z nich, σ_x, była znana bezpośrednio z kąta 0. W ogólnym przypadku potrzeba trzech niezależnych pomiarów, na przykład w rozecie tensometrycznej.',
  figure: {
    kind: 'cube',
    stresses: { x: 80, y: 0, z: 0 },
    values: [
      { label: 'σ_x', value: '80 MPa', focus: 'stress', reveal: 0 },
      { label: 'τ_xy', value: '30 MPa', focus: 'stress', reveal: 0 },
      { label: 'σ (45°)', value: '70 MPa', focus: 'stress', reveal: 0 },
      { label: 'σ_y', value: '0 MPa', focus: 'stress' },
      { label: 'σ_t (45°)', value: '10 MPa', focus: 'stress' },
      { label: 'τ_nt (45°)', value: '−40 MPa', focus: 'stress' },
    ],
    note: 'Dwa pomiary na kierunkach 0° i 45° pozwalają odtworzyć brakujące składowe stanu.',
  },
  scenes: [
    {
      title: 'Dane z pomiarów',
      narration:
        'Z pomiarów wiadomo, że przy θ=0 naprężenie normalne wynosi 80 MPa, a styczne 30 MPa. Przy θ=45° naprężenie normalne wynosi 70 MPa.',
      caption: 'Dwa kierunki pomiarowe i trzy odczytane wartości.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula:
        '\\sigma_x=80\\ \\text{MPa},\\quad \\tau_{xy}=30\\ \\text{MPa},\\quad \\sigma(45^\\circ)=70\\ \\text{MPa}',
    },
    {
      title: 'Odczyt przy θ = 0',
      narration:
        'Z pierwszego pomiaru od razu wynika σ_x=80 MPa i τ_xy=30 MPa. Dla θ=45° wzór upraszcza się, bo cos90°=0 i sin90°=1: σ_n=σ_avg+τ_xy.',
      caption: 'Kąt 0° daje bezpośrednio składowe na ścianie x.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '\\sigma_x=80\\ \\text{MPa},\\quad \\tau_{xy}=30\\ \\text{MPa}',
    },
    {
      title: 'Wyznaczenie σ_y',
      narration: 'Podstawiamy 70=(80+σ_y)/2+30, więc (80+σ_y)/2=40, czyli σ_y=0.',
      caption: 'Pomiar pod kątem 45° rozdziela wpływ średniej i stycznej.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '70=\\frac{80+\\sigma_y}{2}+30\\quad\\Rightarrow\\quad\\sigma_y=0',
    },
    {
      title: 'Dlaczego kąt 45° jest użyteczny',
      narration:
        'W tym kierunku naprężenie normalne zawiera bezpośrednio sumę średniej i stycznej, więc pozwala szybko rozdzielić wpływy.',
      caption: 'Pomiar pod 45° jest szczególnie czuły na ścinanie.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '\\sigma(45^\\circ)=\\sigma_{avg}+\\tau_{xy}=40+30=70\\ \\text{MPa}',
    },
    {
      title: 'Pozostałe składowe',
      narration:
        'Dla θ=45° mamy σ_t=80+0-70=10 MPa oraz τ_nt=-(80-0)/2+0=-40 MPa. Suma 70+10=80 zgadza się z σ_x+σ_y=80.',
      caption: 'Przekrój prostopadły uzupełnia obraz stanu.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '\\sigma_t=80-70=10\\ \\text{MPa},\\quad \\tau_{nt}=-40\\ \\text{MPa}',
    },
    {
      title: 'Kontrola sumy',
      narration: 'Suma 70+10=80 zgadza się z σ_x+σ_y=80, a znak stycznej wynika z przyjętego kierunku t.',
      caption: 'Niezmiennik śladu potwierdza odtworzony stan.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '70+10=80\\ \\text{MPa}=\\sigma_x+\\sigma_y',
    },
    {
      title: 'Interpretacja wyniku',
      narration:
        'Z dwóch pomiarów odtworzyliśmy trzy niewiadome, bo σ_x była znana bezpośrednio z kąta 0. W ogólnym przypadku potrzeba trzech niezależnych pomiarów, na przykład w rozecie tensometrycznej.',
      caption: 'Transformacja działa w obie strony: od stanu do pomiarów i od pomiarów do stanu.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula:
        '\\boxed{\\sigma_x=80\\ \\text{MPa},\\quad \\sigma_y=0,\\quad \\tau_{xy}=30\\ \\text{MPa},\\quad \\sigma_t=10\\ \\text{MPa},\\quad \\tau_{nt}=-40\\ \\text{MPa}}',
    },
  ],
} satisfies SolutionData
