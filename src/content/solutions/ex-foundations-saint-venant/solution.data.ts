import type { SolutionData } from '../../model'
import { SaintVenantExampleAnimation } from './animation'

export default {
  id: 'ex-foundations-saint-venant',
  title: 'Zasada Saint-Venanta: dystans od detalu — przykład 1',
  duration: 7,
  given: ['b = 80 mm', 't = 8 mm', 'd = 16 mm', 'P = 64 kN', 'K_t ≈ 3'],
  result:
    'σ_nom = 125 MPa na przekroju netto, a σ_max ≈ 375 MPa jako górne oszacowanie przy K_t ≈ 3. Lokalne uplastycznienie jest możliwe, więc wynik traktuj jako sygnał do dokładniejszej analizy, a nie jako dokładną wartość naprężenia w otworze.',
  animation: SaintVenantExampleAnimation,
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Taśma o szerokości b = 80 mm i grubości t = 8 mm ma w środku szerokości otwór kołowy o średnicy d = 16 mm. Jest rozciągana siłą P = 64 kN. Otwór jest detalem, który zaburza pole naprężeń; z dala od niego rozkład będzie równomierny.',
      caption: 'Taśma z otworem osiowym poddana rozciąganiu.',
      visual: 'section',
      focus: { metric: 'model' },
      formula: 'b=80\\ \\text{mm},\\quad t=8\\ \\text{mm},\\quad d=16\\ \\text{mm},\\quad P=64\\ \\text{kN}',
    },
    {
      title: 'Pole przekroju netto',
      narration:
        'Otwór zmniejsza szerokość czynną przekroju z 80 mm do 80 − 16 = 64 mm. Mnożąc przez grubość 8 mm, otrzymujemy pole netto 512 mm².',
      caption: 'A_net = (b − d)t = 512 mm².',
      visual: 'section',
      focus: { metric: 'section' },
      formula: 'A_{\\text{net}}=(b-d)t=(80-16)\\cdot8=512\\ \\text{mm}^2',
    },
    {
      title: 'Naprężenie nominalne',
      narration:
        'Z dala od otworu siła rozkłada się równomiernie na przekroju netto. Dzielimy 64 000 N przez 512 mm² i otrzymujemy 125 MPa. To naprężenie średnie, a nie maksimum przy krawędzi otworu.',
      caption: 'σ_nom = 125 MPa poza strefą zaburzeń.',
      visual: 'section',
      focus: { metric: 'nominal' },
      formula: '\\sigma_{\\text{nom}}=\\frac{64\\,000}{512}=125\\ \\text{MPa}',
    },
    {
      title: 'Koncentracja naprężeń i K_t',
      narration:
        'Przy krawędzi otworu naprężenie rośnie lokalnie. Dla małego otworu kołowego w szerokiej taśmie przyjmujemy K_t ≈ 3, więc σ_max ≈ 3 · 125 = 375 MPa. To oszacowanie sprężyste; 375 MPa przekracza typową granicę plastyczności stali, więc możliwe jest miejscowe uplastycznienie.',
      caption: 'K_t ≈ 3, σ_max ≈ 375 MPa przy krawędzi otworu.',
      visual: 'section',
      focus: { metric: 'concentration' },
      formula: '\\sigma_{\\max}\\approx K_t\\sigma_{\\text{nom}}=3\\cdot125=375\\ \\text{MPa}',
    },
    {
      title: 'Zasięg zaburzeń',
      narration:
        'Zaburzenie jest lokalne. Wpływ otworu maleje w odległości rzędu trzech średnic otworu, czyli około 48 mm. Dalej rozkład wraca w przybliżeniu do σ = N/A, choć samo naprężenie nominalne nie znika.',
      caption: 'Po około 3d = 48 mm rozkład naprężeń jest bliski równomiernemu.',
      visual: 'section',
      focus: { metric: 'decay' },
      formula: '3d=3\\cdot16=48\\ \\text{mm}',
    },
  ],
} satisfies SolutionData
