import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-bending-pure-3',
  title: 'Czyste zginanie — przykład 3',
  duration: 7,
  given: ['b = 40 mm', 'h = 80 mm', 'E = 200 GPa', 'sigma_{dop} = 160 MPa'],
  result:
    'Kontrola stanu granicznego: I = 40 · 80^3/12 = 1,707 · 10^6 mm⁴, więc κ = 6,83 · 10^6/(200,000 · 1,707 · 10^6) = 2,0 · 10^-5 1/mm. Promień krzywizny to około 50 m, a odkształcenie skrajne ε = 160/200,000 = 8 · 10^-4. Naprężenie, odkształcenie i krzywizna są spójne i mieszczą się w zakresie sprężystym stali.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.PureBendingExample3Animation }))),
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Znamy dopuszczalne naprężenie i przekrój, a szukamy największego momentu, jaki można bezpiecznie przyłożyć. Prostokąt ma b = 40 mm i h = 80 mm, E = 200 GPa, a σ_dop = 160 MPa. Rozpatrujemy czteropunktowy układ zginania o rozpiętości L = 3 m i sile P = 10 kN.',
      caption: 'Dane: przekrój 40 × 80 mm, E = 200 GPa, σ_dop = 160 MPa, P = 10 kN, L = 3 m.',
      visual: 'beam',
      focus: { metric: 'model' },
      formula:
        'b=40\\ \\text{mm},\\quad h=80\\ \\text{mm},\\quad E=200\\ \\text{GPa},\\quad \\sigma_{dop}=160\\ \\text{MPa}',
    },
    {
      title: 'Nośność przekroju',
      narration:
        'Wskaźnik wytrzymałości prostokąta wynosi W = b h²/6 = 42 667 mm³. Największy moment, przy którym naprężenie osiąga wartość dopuszczalną, to M_max = σ_dop W = 160 · 42 667 = 6,83·10⁶ N·mm, czyli 6,83 kN·m.',
      caption: 'Nośność przekroju: W = 42 667 mm³, więc M_max = 6,83 kN·m przy σ_dop.',
      visual: 'beam',
      focus: { metric: 'strength' },
      formula:
        'W=\\frac{b h^2}{6}=42\\,667\\ \\text{mm}^3,\\qquad M_{\\max}=\\sigma_{dop}W=6{,}83\\ \\text{kN}\\cdot\\text{m}',
    },
    {
      title: 'Położenie sił',
      narration:
        'Moment 6,83 kN·m można zrealizować w układzie czteropunktowym z siłą P = 10 kN, przykładając ją w odległości a = M/P = 0,683 m od każdej podpory. Między siłami powstaje odcinek czystego zginania o długości L − 2a = 1,63 m, na którym T = 0.',
      caption: 'Przy a = 0,683 m środkowy odcinek o długości 1,63 m pracuje w czystym zginaniu.',
      visual: 'beam',
      focus: { metric: 'layout' },
      formula: 'a=\\frac{M}{P}=0{,}683\\ \\text{m},\\qquad L-2a=1{,}63\\ \\text{m},\\qquad T=0',
    },
    {
      title: 'Krzywizna i odkształcenie',
      narration:
        'Moment bezwładności wynosi I = 40 · 80³/12 = 1,707·10⁶ mm⁴. Krzywizna κ = M/(EI) = 2,0·10⁻⁵ 1/mm daje promień ρ ≈ 50 m, a odkształcenie skrajnego włókna ε = σ/E = 160/200 000 = 8·10⁻⁴.',
      caption: 'Przy M_max: κ = 2,0·10⁻⁵ 1/mm, ρ ≈ 50 m, ε = 8·10⁻⁴.',
      visual: 'beam',
      focus: { metric: 'curvature' },
      formula:
        '\\kappa=\\frac{M}{EI}=2{,}0\\cdot10^{-5}\\ \\text{1/mm},\\qquad \\rho\\approx50\\ \\text{m},\\qquad \\varepsilon=8\\cdot10^{-4}',
    },
    {
      title: 'Kontrola stanu granicznego',
      narration:
        'Kontrola stanu granicznego: naprężenie skrajne osiąga dokładnie σ_dop = 160 MPa, a odkształcenie 8·10⁻⁴ pozostaje w zakresie sprężystym stali. Naprężenie, odkształcenie i krzywizna są spójne, więc dobrany moment 6,83 kN·m wykorzystuje nośność przekroju w 100%.',
      caption: 'σ_max = σ_dop = 160 MPa; ε = 8·10⁻⁴ i κ = 2,0·10⁻⁵ 1/mm są spójne.',
      visual: 'beam',
      focus: { metric: 'check' },
      formula:
        '\\sigma_{\\max}=160\\ \\text{MPa}=\\sigma_{dop},\\qquad \\varepsilon=8\\cdot10^{-4},\\qquad \\rho\\approx50\\ \\text{m}',
    },
  ],
} satisfies SolutionData
