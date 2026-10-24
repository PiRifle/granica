import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-stress-state-mohr-interpretation-3',
  title: 'Od koła do decyzji inżynierskiej — przykład 3',
  duration: 7,
  given: ['N = 30 kN', 'M = 1,2 kN·m', 'T = 800 N·m', 'R_e = 235 MPa', 'n = 2,5'],
  result:
    'Wniosek: średnica 55 mm jest zbyt mała, a 56 mm wystarcza. W praktyce wybieramy kolejny dostępny wymiar handlowy, często z zapasem na korozję, tolerancje i koncentrację naprężeń.',
  animation: lazy(() =>
    import('./animation').then((module) => ({ default: module.MohrInterpretationExample3Animation })),
  ),
  scenes: [
    {
      title: 'Model i wymaganie',
      narration:
        'Dla obciążeń N=30 kN, M=1,2 kN·m i T=800 N·m trzeba dobrać średnicę pręta tak, aby współczynnik bezpieczeństwa według HMH wynosił co najmniej 2,5. Granica plastyczności wynosi R_e=235 MPa. To zadanie odwrotne: od wyniku do danych.',
      caption: 'Zadanie odwrotne: od wymaganego współczynnika bezpieczeństwa do średnicy.',
      visual: 'cube',
      focus: { metric: 'model' },
      formula:
        'N=30\\ \\text{kN},\\quad M=1{,}2\\ \\text{kN}\\cdot\\text{m},\\quad T=800\\ \\text{N}\\cdot\\text{m},\\quad n\\geq2{,}5',
    },
    {
      title: 'Naprężenie dopuszczalne',
      narration:
        'Naprężenie dopuszczalne wynosi R_e/2,5=94 MPa. Szukamy średnicy d, dla której σ_HMH≤94 MPa. Mniejsza średnica daje większe naprężenie, więc dobór prowadzimy od góry zakresu.',
      caption: 'Wymagane naprężenie dopuszczalne jest granicą dla σ_HMH.',
      visual: 'cube',
      focus: { metric: 'allowable' },
      formula: '\\sigma_{dop}=\\frac{R_e}{2{,}5}=\\frac{235}{2{,}5}=94\\ \\text{MPa}',
    },
    {
      title: 'Próba dla d = 55 mm',
      narration:
        'Dla d=55 mm otrzymujemy σ_x=86,10 MPa oraz τ=24,49 MPa. Naprężenie HMH wynosi około 95,98 MPa, czyli przekracza dopuszczalne 94 MPa. Współczynnik n≈2,45 jest mniejszy od wymaganego 2,5, więc średnica 55 mm jest zbyt mała.',
      caption: 'σ_HMH przekracza naprężenie dopuszczalne, choć σ_x i σ_1 są niższe.',
      visual: 'cube',
      focus: { metric: 'trial55' },
      formula:
        'd=55\\ \\text{mm},\\quad \\sigma_x=86{,}10\\ \\text{MPa},\\quad \\tau=24{,}49\\ \\text{MPa},\\quad \\sigma_{HMH}\\approx95{,}98\\ \\text{MPa}',
    },
    {
      title: 'Sprawdzenie dla d = 56 mm',
      narration:
        'Dla d=56 mm mamy σ_x=81,79 MPa oraz τ=23,20 MPa. Naprężenia główne wynoszą około 87,91 i −6,12 MPa, a σ_HMH=91,13 MPa jest mniejsze od 94 MPa. Współczynnik 235/91,13≈2,58 jest większy od wymaganego.',
      caption: 'Średnica 56 mm mieści się pod granicą i daje n≈2,58.',
      visual: 'cube',
      focus: { metric: 'trial56' },
      formula:
        '\\sigma_x=81{,}79\\ \\text{MPa},\\quad \\tau=23{,}20\\ \\text{MPa},\\quad \\sigma_1\\approx87{,}91\\ \\text{MPa},\\quad \\sigma_2\\approx-6{,}12\\ \\text{MPa}',
    },
    {
      title: 'Interpretacja inżynierska',
      narration:
        'Średnica 55 mm jest zbyt mała, a 56 mm wystarcza. W praktyce wybieramy kolejny dostępny wymiar handlowy, często z zapasem na korozję, tolerancje i koncentrację naprężeń. Nie należy zaokrąglać średnicy w dół.',
      caption: 'Warunek n≥2,5 spełnia dopiero średnica 56 mm.',
      visual: 'cube',
      focus: { metric: 'decision' },
      formula:
        '\\boxed{d=56\\ \\text{mm},\\quad \\sigma_{HMH}\\approx91{,}13\\ \\text{MPa},\\quad n\\approx2{,}58>2{,}5}',
    },
  ],
} satisfies SolutionData
