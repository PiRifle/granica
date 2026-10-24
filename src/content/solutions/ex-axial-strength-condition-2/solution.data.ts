import type { SolutionData } from '../../model'
import { AxialStrengthCondition2Animation } from './animation'

export default {
  id: 'ex-axial-strength-condition-2',
  title: 'Warunek wytrzymałości i zapas bezpieczeństwa — przykład 2',
  duration: 7,
  given: ['N_1=60 kN', 'A_1=400 mm²', 'N_2=45 kN', 'A_2=250 mm²', 'R_e=235 MPa', 'n=1,5'],
  result:
    'Zauważmy też, że sama zmiana pola nie zmienia sił osiowych w statycznie wyznaczalnym pręcie. Siły wynikają z równowagi, a nie ze sztywności. Dopiero w układzie statycznie niewyznaczalnym, na przykład gdy pręt jest połączony równolegle z innym elementem, zmiana sztywności jednego elementu zmienia rozkład sił. Ten przypadek wykracza poza obecną lekcję, ale warto o nim pamiętać przy bardziej złożonych konstrukcjach.',
  animation: AxialStrengthCondition2Animation,
  scenes: [
    {
      title: 'Model, dane i obliczenia',
      narration:
        'Rozważmy pręt złożony z dwóch odcinków o różnych polach i różnych siłach osiowych. Pierwszy odcinek przenosi N_1=60 kN i ma pole A_1=400 mm^2. Drugi przenosi N_2=45 kN i ma pole A_2=250 mm^2. Materiał jest ten sam, R_e=235 MPa, a wymagany zapas wynosi n=1,5, więc σ_dop=156,7 MPa. Naprężenia wynoszą σ_1=60 000/400=150 MPa oraz σ_2=45 000/250=180 MPa. Pierwszy odcinek spełnia warunek, drugi nie, mimo że przenosi mniejszą siłę. Decyduje mniejsze pole. To klasyczny przykład zasady najsłabszego ogniwa: zwiększanie pola pierwszego odcinka nie poprawi nośności całego pręta, dopóki drugi pozostaje zbyt cienki. Minimalne pole drugiego odcinka wynosi A_2,min=45 000/156,7=287,2 mm^2. Po zaokrągleniu do 300 mm^2 otrzymujemy σ_2=150 MPa i n_rz=235/150=1,567. Teraz oba odcinki mają taki sam poziom naprężenia i taki sam zapas. W praktyce drugi odcinek może być nagwintowany albo mieć otwór. Wtedy do obliczeń nie wystarcza pole zewnętrzne, bo siłę przenosi mniejszy przekrój netto. Dodatkowo gwint i podcięcie powodują koncentrację naprężeń, więc lokalne maksimum może być większe od N/A_net. W takim przypadku dobór samego pola nominalnego jest tylko pierwszym krokiem. Zauważmy też, że sama zmiana pola nie zmienia sił osiowych w statycznie wyznaczalnym pręcie. Siły wynikają z równowagi, a nie ze sztywności. Dopiero w układzie statycznie niewyznaczalnym, na przykład gdy pręt jest połączony równolegle z innym elementem, zmiana sztywności jednego elementu zmienia rozkład sił. Ten przypadek wykracza poza obecną lekcję, ale warto o nim pamiętać przy bardziej złożonych konstrukcjach.',
      caption:
        'Zauważmy też, że sama zmiana pola nie zmienia sił osiowych w statycznie wyznaczalnym pręcie. Siły wynikają z równowagi, a nie ze…',
      visual: 'axial',
      formula:
        'N_1=60\\ \\text{kN} \\qquad \\sigma_1=60\\,000/400=150\\ \\text{MPa} \\qquad A_{2,\\min}=45\\,000/156{,}7=287{,}2\\ \\text{mm}^2 \\qquad N/A_{\\mathrm{net}}',
    },
  ],
} satisfies SolutionData
