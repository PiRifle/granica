import type { SolutionData } from '../../model'
import { AxialSteppedBarsAnimation } from './animation'

export default {
  id: 'ex-axial-stepped-bars',
  title: 'Pręty schodkowe: ta sama siła, inne σ — przykład 1',
  duration: 7,
  given: ['N = 60 kN', 'A₁ = 300 mm²', 'A₂ = 150 mm²', 'A₃ = 250 mm²'],
  result:
    'σ₁ = 200 MPa, σ₂ = 400 MPa, σ₃ = 240 MPa. Przekrój krytyczny to odcinek drugi, a przy σdop = 160 MPa każde pole musi wynosić co najmniej 375 mm².',
  animation: AxialSteppedBarsAnimation,
  scenes: [
    {
      title: 'Model, dane i obliczenia',
      narration:
        'Ponieważ nie ma obciążeń pośrednich, N₁ = N₂ = N₃ = +60 000 N. Dla pierwszego odcinka: σ₁ = 60 000/300 = 200 MPa. Dla drugiego odcinka: σ₂ = 60 000/150 = 400 MPa. Dla trzeciego odcinka: σ₃ = 60 000/250 = 240 MPa. Porównaj wartości bezwzględne: 400 MPa jest największe, więc decyduje odcinek drugi. Sprawdź warunek wytrzymałości: wszystkie naprężenia przekraczają 160 MPa, więc żaden odcinek nie spełnia wymagania. Wyznacz minimalne pola: 375, 375 i 375 mm². Dla stałej N i wspólnego σdop każde pole musi wynosić co najmniej 375 mm².',
      caption:
        'Wyznacz minimalne pola: 375, 375 i 375 mm². Dla stałej N i wspólnego σdop każde pole musi wynosić co najmniej 375 mm².',
      visual: 'axial',
      formula:
        'N=60\\ \\text{kN}=60\\,000\\ \\text{N}\\qquad A_1=300\\ \\text{mm}^2,\\quad A_2=150\\ \\text{mm}^2,\\quad A_3=250\\ \\text{mm}^2\\qquad N_1=N_2=N_3=60\\,000\\ \\text{N}\\qquad \\sigma_1=\\frac{60\\,000}{300}=200\\ \\text{MPa}\\qquad \\sigma_2=\\frac{60\\,000}{150}=400\\ \\text{MPa}\\qquad \\sigma_3=\\frac{60\\,000}{250}=240\\ \\text{MPa}\\qquad |\\sigma|_{\\max}=400\\ \\text{MPa}>\\sigma_{\\mathrm{dop}}=160\\ \\text{MPa}\\qquad A_{\\min}=\\frac{60\\,000}{160}=375\\ \\text{mm}^2',
    },
  ],
} satisfies SolutionData
