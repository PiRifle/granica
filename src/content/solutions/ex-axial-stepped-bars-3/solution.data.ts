import type { SolutionData } from '../../model'
import { AxialSteppedBars3Animation } from './animation'

export default {
  id: 'ex-axial-stepped-bars-3',
  title: 'Pręty schodkowe: ta sama siła, inne σ — przykład 3',
  duration: 7,
  given: ['N₁ = +45 kN', 'N₂ = +30 kN', 'N₃ = −20 kN', 'σ_dop = 150 MPa'],
  result:
    'Odcinek trzeci jest ściskany. Sam warunek naprężenia nie wystarcza, jeśli odcinek jest długi i smukły. Trzeba sprawdzić, czy siła 20 kN nie spowoduje wyboczenia przy założonej długości i sposobie zamocowania. Dopiero po tej kontroli dobór średnic można uznać za kompletny.',
  animation: AxialSteppedBars3Animation,
  scenes: [
    {
      title: 'Model, dane i obliczenia',
      narration:
        'Znamy siły osiowe i naprężenie dopuszczalne, a szukamy średnic odcinków. Pręt ma trzy odcinki o siłach N_1=+45 kN, N_2=+30 kN i N_3=-20 kN. Naprężenie dopuszczalne wynosi σ_dop=150 MPa, a przekroje mają być kołowe. Minimalne pola wyznaczamy z warunku wytrzymałości: A_1≥45 000/150=300 mm^2, A_2≥30 000/150=200 mm^2 oraz A_3≥20 000/150=133,3 mm^2. Dla przekroju kołowego średnica wynosi d=√(4A/π). Dla każdego odcinka osobno wyznaczamy minimalne pole, a następnie średnicę. Przyjęta średnica musi być nie mniejsza od obliczonej i powinna odpowiadać wymiarowi normalizowanemu. Otrzymujemy kolejno około 19,5, 16,0 i 13,0 mm. Przyjmujemy wymiary normalizowane: 20, 16 i 14 mm. Pola wynoszą wtedy około 314,2, 201,1 i 153,9 mm^2, a naprężenia około 143,3, 149,2 i 129,9 MPa. Wszystkie mieszczą się poniżej 150 MPa. Odcinek trzeci jest ściskany. Sam warunek naprężenia nie wystarcza, jeśli odcinek jest długi i smukły. Trzeba sprawdzić, czy siła 20 kN nie spowoduje wyboczenia przy założonej długości i sposobie zamocowania. Dopiero po tej kontroli dobór średnic można uznać za kompletny.',
      caption:
        'Odcinek trzeci jest ściskany. Sam warunek naprężenia nie wystarcza, jeśli odcinek jest długi i smukły; trzeba sprawdzić wyboczenie.',
      visual: 'axial',
      formula:
        'N_1=+45\\ \\text{kN},\\quad N_2=+30\\ \\text{kN},\\quad N_3=-20\\ \\text{kN}\\qquad \\sigma_{\\mathrm{dop}}=150\\ \\text{MPa}\\qquad A_{1,\\min}=\\frac{45\\,000}{150}=300\\ \\text{mm}^2\\qquad A_{2,\\min}=\\frac{30\\,000}{150}=200\\ \\text{mm}^2\\qquad A_{3,\\min}=\\frac{20\\,000}{150}=133{,}3\\ \\text{mm}^2\\qquad d_i=\\sqrt{\\frac{4A_{i,\\min}}{\\pi}}\\qquad d_1\\approx19{,}5\\ \\text{mm},\\quad d_2\\approx16{,}0\\ \\text{mm},\\quad d_3\\approx13{,}0\\ \\text{mm}\\qquad d_1=20\\ \\text{mm},\\quad d_2=16\\ \\text{mm},\\quad d_3=14\\ \\text{mm}\\qquad \\sigma_1\\approx143{,}3\\ \\text{MPa},\\quad \\sigma_2\\approx149{,}2\\ \\text{MPa},\\quad \\sigma_3\\approx129{,}9\\ \\text{MPa}',
    },
  ],
} satisfies SolutionData
