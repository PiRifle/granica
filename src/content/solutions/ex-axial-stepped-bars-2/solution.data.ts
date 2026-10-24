import type { SolutionData } from '../../model'
import { AxialSteppedBars2Animation } from './animation'

export default {
  id: 'ex-axial-stepped-bars-2',
  title: 'Pręty schodkowe: ta sama siła, inne σ — przykład 2',
  duration: 7,
  given: ['A₁ = 500 mm²', 'A₂ = 150 mm²', 'P = 30 kN', 'Q = 20 kN'],
  result:
    'Przy σ_dop=160 MPa pierwszy odcinek spełnia warunek, a drugi nie. Minimalne pole drugiego odcinka wynosi 30 000/160=187,5 mm^2. Zwiększanie pola pierwszego odcinka nie pomoże, dopóki drugi pozostaje zbyt cienki. To praktyczna ilustracja zasady najsłabszego ogniwa.',
  animation: AxialSteppedBars2Animation,
  scenes: [
    {
      title: 'Model, dane i obliczenia',
      narration:
        'Tym razem siła osiowa zmienia się na długości. Pręt jest utwierdzony lewym końcem. Odcinek pierwszy, przy utwierdzeniu, ma pole A_1=500 mm^2, a odcinek drugi, przy swobodnym końcu, ma pole A_2=150 mm^2. Na prawym końcu działa siła P=30 kN w prawo, a na połączeniu odcinków siła Q=20 kN w prawo. Zaczynamy od prawego końca. W drugim odcinku działa tylko siła P, więc N_2=+30 kN. W pierwszym odcinku dochodzi siła Q, więc N_1=30+20=+50 kN. Reakcja utwierdzenia wynosi 50 kN w lewo i potwierdza wynik. Naprężenia wynoszą σ_1=50 000/500=100 MPa oraz σ_2=30 000/150=200 MPa. Mimo że pierwszy odcinek przenosi większą siłę, to drugi jest bardziej wytężony, ponieważ ma ponad trzy razy mniejsze pole. Przekrojem krytycznym jest więc odcinek drugi. Przy σ_dop=160 MPa pierwszy odcinek spełnia warunek, a drugi nie. Minimalne pole drugiego odcinka wynosi 30 000/160=187,5 mm^2. Zwiększanie pola pierwszego odcinka nie pomoże, dopóki drugi pozostaje zbyt cienki. To praktyczna ilustracja zasady najsłabszego ogniwa.',
      caption:
        'Przy σ_dop = 160 MPa pierwszy odcinek spełnia warunek, a drugi nie. Minimalne pole drugiego odcinka wynosi 30 000/160 = 187,5 mm².',
      visual: 'axial',
      formula:
        'A_1=500\\ \\text{mm}^2,\\quad A_2=150\\ \\text{mm}^2\\qquad P=30\\ \\text{kN},\\quad Q=20\\ \\text{kN}\\qquad N_2=+30\\ \\text{kN}\\qquad N_1=30+20=+50\\ \\text{kN}\\qquad R=50\\ \\text{kN}\\ (\\text{w lewo})\\qquad \\sigma_1=\\frac{50\\,000}{500}=100\\ \\text{MPa}\\qquad \\sigma_2=\\frac{30\\,000}{150}=200\\ \\text{MPa}\\qquad \\sigma_{\\mathrm{dop}}=160\\ \\text{MPa}\\qquad \\sigma_1=100\\ \\text{MPa}\\le160\\ \\text{MPa}<\\sigma_2=200\\ \\text{MPa}\\qquad A_{2,\\min}=\\frac{30\\,000}{160}=187{,}5\\ \\text{mm}^2',
    },
  ],
} satisfies SolutionData
