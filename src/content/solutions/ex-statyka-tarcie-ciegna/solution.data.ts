import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-statyka-tarcie-ciegna',
  title: 'Tarcie cięgna: wzór Eulera — rozwiązanie krok po kroku',
  duration: 7,
  given: [
    'Lina na nieruchomym walcu, kąt opasania trzy czwarte obrotu',
    'Współczynnik tarcia statycznego μs = 0,30',
    'Napięcie strony luźnej T1 = 200 N',
  ],
  result:
    'T2 = T1 e^{μθ} = 200 · 4,11 ≈ 822 N. Bez tarcia utrzymano by tylko 200 N; graniczny stosunek napięć wynosi około 4,11.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.RopeFrictionAnimation }))),
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Lina opasuje nieruchomy walec i jest ciągnięta po obu stronach. Strona luźna ma napięcie T1, a strona napięta T2. Tarcie rozkłada się na całym łuku styku, dlatego nie da się go zastąpić jednym naciskiem punktowym.',
      caption: 'Lina na walcu, T1 = 200 N, μs = 0,30, opasanie trzy czwarte obrotu.',
      visual: 'diagram',
      focus: { metric: 'model' },
      formula: 'T_1=200\\ \\text{N},\\qquad \\mu_s=0{,}30,\\qquad \\theta=\\tfrac34\\cdot2\\pi',
    },
    {
      title: 'Kąt opasania w radianach',
      narration:
        'Kąt opasania to pełny kąt styku liny z walcem, a nie kąt między końcami liny. Trzy czwarte obrotu daje 1,5π radiana. Do wykładnika nie wolno podstawiać 270°, bo wtedy iloczyn μθ traci sens.',
      caption: 'θ = 3/4 · 2π = 1,5π ≈ 4,712 rad.',
      visual: 'diagram',
      focus: { metric: 'angle' },
      formula: '\\theta=\\tfrac34\\cdot2\\pi=\\tfrac32\\pi\\approx4{,}712\\ \\text{rad}',
    },
    {
      title: 'Równowaga małego wycinka',
      narration:
        'Na małym wycinku liny napięcie rośnie o ΔT, a różnicę równoważy tarcie μΔN. Docisk ΔN pochodzi od samego napięcia i jest w przybliżeniu równy TΔθ. To sprzężenie sprawia, że wzrost napięcia jest proporcjonalny do napięcia.',
      caption: 'ΔT = μs ΔN oraz ΔN ≈ T Δθ dla małego kąta.',
      visual: 'diagram',
      focus: { metric: 'element' },
      formula: '\\Delta T=\\mu_s\\Delta N,\\qquad \\Delta N\\approx T\\Delta\\theta',
    },
    {
      title: 'Całkowanie po łuku',
      narration:
        'Po podstawieniu docisku otrzymujemy równanie różniczkowe na napięcie. Rozdzielamy zmienne i całkujemy od strony luźnej do napiętej. Logarytm stosunku napięć jest równy iloczynowi μs i całkowitego kąta opasania.',
      caption: 'ΔT/T = μs Δθ, po scałkowaniu ln(T2/T1) = μsθ.',
      visual: 'diagram',
      focus: { metric: 'integral' },
      formula: '\\frac{\\Delta T}{T}=\\mu_s\\Delta\\theta\\ \\Rightarrow\\ \\ln\\frac{T_2}{T_1}=\\mu_s\\theta',
    },
    {
      title: 'Obliczenie napięcia granicznego',
      narration:
        'Podstawiamy dane do wzoru Eulera. Wykładnik wynosi 1,414, a jego eksponenta około 4,11. Mnożąc napięcie luźnego końca przez ten czynnik, otrzymujemy największe napięcie możliwe bez poślizgu.',
      caption: 'μsθ = 1,414; e^{1,414} = 4,11; T2 = 200 · 4,11 ≈ 822 N.',
      visual: 'diagram',
      focus: { metric: 'result' },
      formula: '\\mu_s\\theta=1{,}414,\\quad e^{1{,}414}=4{,}11,\\quad T_2=200\\cdot4{,}11\\approx822\\ \\text{N}',
    },
    {
      title: 'Kontrola odwrotna',
      narration:
        'Dzieląc otrzymane napięcie przez czynnik wykładniczy, wracamy do 200 N. Kontrola potwierdza, że przy tym kącie i tarciu lina przeniesie ponad czterokrotną różnicę napięć. O zapasie decyduje iloczyn μsθ, a nie promień walca.',
      caption: 'T1 = 822 / 4,11 ≈ 200 N — wynik się domyka.',
      visual: 'diagram',
      focus: { metric: 'check' },
      formula: 'T_1=\\frac{T_2}{e^{\\mu_s\\theta}}=\\frac{822}{4{,}11}\\approx200\\ \\text{N}',
    },
  ],
} satisfies SolutionData
