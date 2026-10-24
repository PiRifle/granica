import type { SolutionData } from '../../model'
import { LoadTypesExample3Animation } from './animation'

export default {
  id: 'ex-foundations-load-types-3',
  title: 'Obciążenia: siła, rozkład i moment — przykład 3',
  duration: 7,
  given: ['γ = 77 kN/m³', 'σ_dop = 120 MPa', 'współczynnik bezpieczeństwa n = 2'],
  result:
    'Maksymalna długość linki wynosi około 1558 m. Przy współczynniku bezpieczeństwa 2 dopuszczalne naprężenie spada do 60 MPa, a długość do około 779 m. Ciężar własny może stać się głównym ograniczeniem, gdy element jest bardzo długi.',
  animation: LoadTypesExample3Animation,
  scenes: [
    {
      title: 'Model, dane i obliczenia',
      narration:
        'Linka stalowa przenosi wyłącznie ciężar własny. Przyjmujemy ciężar objętościowy stali γ = 77 kN/m³ i dopuszczalne naprężenie σ_dop = 120 MPa. Szukamy największej długości, przy której naprężenie nie przekroczy tej wartości. W pręcie obciążonym tylko ciężarem własnym maksymalne naprężenie występuje u góry i rośnie liniowo z długością: σ_max = γL. Warunek bezpieczeństwa ma więc postać γL ≤ σ_dop. Przekształcamy warunek do postaci L_max = σ_dop / γ. Dzielimy 120 000 kN/m² przez 77 kN/m³ i otrzymujemy około 1558 m. Zamieniamy 120 MPa na 120 000 kPa, czyli 120 000 kN/m². Dzielenie przez ciężar objętościowy w kN/m³ daje metry. Bez tej zamiany wynik byłby tysiące razy za mały. Podstawiamy długość 1558 m z powrotem do wzoru: σ = 77 · 1558 ≈ 120 000 kN/m² = 120 MPa. Wynik jest równy dopuszczalnemu, co potwierdza obliczenie. Przy współczynniku bezpieczeństwa 2 dopuszczalne naprężenie wynosi 60 MPa. Długość graniczna maleje do 60 000 / 77 ≈ 779 m. Zapas bezpieczeństwa zmniejsza dopuszczalną długość o połowę. Ten przykład pokazuje, że ciężar własny może stać się głównym ograniczeniem, gdy element jest bardzo długi. W typowych konstrukcjach budowlanych zwykle nie decyduje o nośności, ale w kablach, linach i wysmukłych masztach trzeba go liczyć osobno.',
      caption: 'W długiej linie o nośności decyduje ciężar własny, nie obciążenie zewnętrzne.',
      visual: 'axial',
      formula:
        '\\gamma=77\\ \\text{kN/m}^3,\\quad \\sigma_{\\text{dop}}=120\\ \\text{MPa}\\qquad \\sigma_{\\max}=\\gamma L\\le\\sigma_{\\text{dop}}\\qquad L_{\\max}=\\frac{\\sigma_{\\text{dop}}}{\\gamma}=\\frac{120\\,000}{77}\\approx1558\\ \\text{m}\\qquad 120\\ \\text{MPa}=120\\,000\\ \\text{kPa}=120\\,000\\ \\text{kN/m}^2\\qquad \\sigma_{\\max}=77\\cdot1558\\approx120\\,000\\ \\text{kN/m}^2=120\\ \\text{MPa}\\qquad \\sigma_{\\text{dop}}=\\frac{120}{2}=60\\ \\text{MPa},\\qquad L_{\\max}=\\frac{60\\,000}{77}\\approx779\\ \\text{m}',
    },
  ],
} satisfies SolutionData
