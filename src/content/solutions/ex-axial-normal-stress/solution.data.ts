import type { SolutionData } from '../../model'
import { AxialNormalStressExampleAnimation } from './animation'

export default {
  id: 'ex-axial-normal-stress',
  title: 'Naprężenie normalne: siła na przekroju — przykład 1',
  duration: 7,
  given: ['A = 250 mm²', 'N = 50 kN'],
  result:
    'σ = +200 MPa, czyli naprężenie rozciągające. Pręt jest blisko granicy plastyczności typowej stali, więc zapas byłby niewielki.',
  animation: AxialNormalStressExampleAnimation,
  scenes: [
    {
      title: 'Model, dane i obliczenia',
      narration:
        'Przyjmij N = +50 kN, ponieważ pręt jest rozciągany. Przelicz siłę na niutony: N = 50 000 N. Zachowaj pole w milimetrach kwadratowych: A = 250 mm². Podstaw do wzoru: σ = 50 000/250 = 200 N/mm². Zapisz N/mm² jako MPa i pozostaw znak dodatni. Sprawdź rząd wielkości: 200 MPa to typowe naprężenie robocze stali konstrukcyjnej, poniżej granicy plastyczności około 235 MPa. Gdyby ta sama siła działała w drugą stronę, N byłoby ujemne, a naprężenie wyniosło −200 MPa. Wartość bezwzględna byłaby ta sama, ale interpretacja zmieniłaby się na ściskanie.',
      caption:
        'Gdyby ta sama siła działała w drugą stronę, N byłoby ujemne, a naprężenie wyniosło −200 MPa. Wartość bezwzględna byłaby ta…',
      visual: 'axial',
      formula:
        'N = +50\\ \\text{kN}\\qquad N = 50\\,000\\ \\text{N}\\qquad \\sigma = \\frac{50\\,000}{250} = 200\\ \\text{N/mm}^{2}',
    },
  ],
} satisfies SolutionData
