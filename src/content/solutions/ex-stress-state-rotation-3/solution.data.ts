import type { SolutionData } from '../../model'
import { StressRotationExample3Animation } from './animation'

export default {
  id: 'ex-stress-state-rotation-3',
  title: 'Obrót przekroju: ten sam stan, inne liczby — przykład 3',
  duration: 7,
  given: ['θ = 0: σ = 80 MPa, τ = 30 MPa', 'θ = 45°: σ = 70 MPa'],
  result:
    'Warto zauważyć, że z dwóch pomiarów odtworzyliśmy trzy niewiadome, bo jedna z nich, σ_x, była znana bezpośrednio z kąta 0. W ogólnym przypadku potrzeba trzech niezależnych pomiarów, na przykład w rozecie tensometrycznej.',
  animation: StressRotationExample3Animation,
  scenes: [
    {
      title: 'Dane z pomiarów',
      narration:
        'Z pomiarów wiadomo, że przy θ=0 naprężenie normalne wynosi 80 MPa, a styczne 30 MPa. Przy θ=45° naprężenie normalne wynosi 70 MPa. Znamy zatem σ_x i τ_xy, a σ_y pozostaje niewiadome.',
      caption: 'Dwa kierunki pomiarowe i trzy odczytane wartości.',
      visual: 'cube',
      focus: { metric: 'model' },
      formula:
        '\\sigma_x=80\\ \\text{MPa},\\quad \\tau_{xy}=30\\ \\text{MPa},\\quad \\sigma(45^\\circ)=70\\ \\text{MPa}',
    },
    {
      title: 'Obrót do kierunku pomiaru 45°',
      narration:
        'Obracamy przekrój od kąta 0° do 45°. Dla θ=45° mamy 2θ=90°, więc cos90°=0 i sin90°=1. Wzór upraszcza się do σ_n=σ_avg+τ_xy.',
      caption: 'Kąt 45° jest szczególnie czuły na ścinanie.',
      visual: 'cube',
      focus: { metric: 'rotate' },
      formula: '2\\theta=90^\\circ,\\quad \\sigma_n(45^\\circ)=\\sigma_{avg}+\\tau_{xy}',
    },
    {
      title: 'Wyznaczenie σ_y',
      narration:
        'Podstawiamy 70=(80+σ_y)/2+30, więc (80+σ_y)/2=40, czyli σ_y=0. Nieznana składowa znika, bo pomiar pod kątem 45° rozdziela wpływ średniej i stycznej.',
      caption: 'Pomiar pod kątem 45° domyka brakującą składową stanu.',
      visual: 'cube',
      focus: { metric: 'solve' },
      formula: '70=\\frac{80+\\sigma_y}{2}+30\\quad\\Rightarrow\\quad\\sigma_y=0',
    },
    {
      title: 'Pozostałe składowe',
      narration:
        'Dla θ=45° mamy σ_t=80+0-70=10 MPa oraz τ_nt=-(80-0)/2+0=-40 MPa. Przekrój prostopadły uzupełnia obraz stanu, a znak stycznej wynika z przyjętego kierunku t.',
      caption: 'Przekrój prostopadły uzupełnia obraz stanu.',
      visual: 'cube',
      focus: { metric: 'components' },
      formula: '\\sigma_t=80-70=10\\ \\text{MPa},\\qquad \\tau_{nt}=-40\\ \\text{MPa}',
    },
    {
      title: 'Kontrola sumy',
      narration:
        'Suma 70+10=80 zgadza się z σ_x+σ_y=80. Niezmiennik śladu potwierdza odtworzony stan, a z dwóch pomiarów udało się go odtworzyć, bo σ_x była znana bezpośrednio z kąta 0.',
      caption: 'Transformacja działa w obie strony: od stanu do pomiarów i od pomiarów do stanu.',
      visual: 'cube',
      focus: { metric: 'check' },
      formula: '70+10=80\\ \\text{MPa}=\\sigma_x+\\sigma_y',
    },
  ],
} satisfies SolutionData
