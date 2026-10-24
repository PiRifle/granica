import type { SolutionData } from '../../model'

export default {
  id: 'ex-axial-strength-condition-2',
  title: 'Warunek wytrzymałości i zapas bezpieczeństwa — przykład 2',
  duration: 7,
  given: ['N_1=60 kN', 'A_1=400 mm^2', 'N_2=45 kN', 'A_2=250 mm^2', 'R_e=235 MPa', 'n=1'],
  result:
    'Zauważmy też, że sama zmiana pola nie zmienia sił osiowych w statycznie wyznaczalnym pręcie. Siły wynikają z równowagi, a nie ze sztywności. Dopiero w układzie statycznie niewyznaczalnym, na przykład gdy pręt jest połączony równolegle z innym elementem, zmiana sztywności jednego elementu zmienia rozkład sił. Ten przypadek wykracza poza obecną lekcję, ale warto o nim pamiętać przy bardziej złożonych konstrukcjach.',
  figure: {
    kind: 'axial',
    top: 'fixed',
    bottom: 'free',
    units: {
      N: 'kN',
      σ: 'MPa',
      ε: '–',
      ΔL: 'mm',
      A: 'mm²',
    },
    segments: [
      {
        id: '1',
        label: '1',
        length: 1000,
        area: 400,
        n: 60,
        sigma: 150,
      },
      {
        id: '2',
        label: '2',
        length: 1000,
        area: 250,
        n: 45,
        sigma: 180,
      },
    ],
    loads: [
      {
        node: 1,
        value: 15,
        label: '15 kN',
      },
      {
        node: 2,
        value: 45,
        label: 'N₂ = 45 kN',
      },
    ],
    note: 'Długości nie są podane — odcinki są schematyczne.',
  },
  scenes: [
    {
      title: 'Krok 1',
      narration:
        'Rozważmy pręt złożony z dwóch odcinków o różnych polach i różnych siłach osiowych. Pierwszy odcinek przenosi N_1=60 kN i ma pole A_1=400 mm^2. Drugi przenosi N_2=45 kN i ma pole A_2=250 mm^2. Materiał jest ten sam, R_e=235 MPa, a wymagany zapas wynosi n=1,5, więc σ_dop=156,7 MPa.',
      caption:
        'Rozważmy pręt złożony z dwóch odcinków o różnych polach i różnych siłach osiowych. Pierwszy odcinek przenosi N_1=60 kN i ma pole…',
      visual: 'axial',
      focus: { metric: 'N' },
      formula: 'N_1=60\\ \\text{kN}',
    },
    {
      title: 'Krok 2',
      narration:
        'Naprężenia wynoszą σ_1=60 000/400=150 MPa oraz σ_2=45 000/250=180 MPa. Pierwszy odcinek spełnia warunek, drugi nie, mimo że przenosi mniejszą siłę. Decyduje mniejsze pole. To klasyczny przykład zasady najsłabszego ogniwa: zwiększanie pola pierwszego odcinka nie poprawi nośności całego pręta, dopóki drugi pozostaje zbyt cienki.',
      caption:
        'Naprężenia wynoszą σ_1=60 000/400=150 MPa oraz σ_2=45 000/250=180 MPa. Pierwszy odcinek spełnia warunek, drugi nie, mimo że…',
      visual: 'axial',
      focus: { metric: 'σ', segment: '2' },
      formula: '\\sigma_1=60\\,000/400=150\\ \\text{MPa}',
    },
    {
      title: 'Krok 3',
      narration:
        'Minimalne pole drugiego odcinka wynosi A_2,min=45 000/156,7=287,2 mm^2. Po zaokrągleniu do 300 mm^2 otrzymujemy σ_2=150 MPa i n_rz=235/150=1,567. Teraz oba odcinki mają taki sam poziom naprężenia i taki sam zapas.',
      caption:
        'Minimalne pole drugiego odcinka wynosi A_2,min=45 000/156,7=287,2 mm^2. Po zaokrągleniu do 300 mm^2 otrzymujemy σ_2=150 MPa i…',
      visual: 'axial',
      focus: { metric: 'A' },
      formula: 'A_{2,\\min}=45\\,000/156{,}7=287{,}2\\ \\text{mm}^2',
    },
    {
      title: 'Krok 4',
      narration:
        'W praktyce drugi odcinek może być nagwintowany albo mieć otwór. Wtedy do obliczeń nie wystarcza pole zewnętrzne, bo siłę przenosi mniejszy przekrój netto. Dodatkowo gwint i podcięcie powodują koncentrację naprężeń, więc lokalne maksimum może być większe od N/A_net. W takim przypadku dobór samego pola nominalnego jest tylko pierwszym krokiem.',
      caption:
        'W praktyce drugi odcinek może być nagwintowany albo mieć otwór. Wtedy do obliczeń nie wystarcza pole zewnętrzne, bo siłę przenosi…',
      visual: 'axial',
      focus: { metric: 'σ' },
      formula: 'N/A_{\\mathrm{net}}',
    },
    {
      title: 'Krok 5',
      narration:
        'Zauważmy też, że sama zmiana pola nie zmienia sił osiowych w statycznie wyznaczalnym pręcie. Siły wynikają z równowagi, a nie ze sztywności. Dopiero w układzie statycznie niewyznaczalnym, na przykład gdy pręt jest połączony równolegle z innym elementem, zmiana sztywności jednego elementu zmienia rozkład sił. Ten przypadek wykracza poza obecną lekcję, ale warto o nim pamiętać przy bardziej złożonych konstrukcjach.',
      caption:
        'Zauważmy też, że sama zmiana pola nie zmienia sił osiowych w statycznie wyznaczalnym pręcie. Siły wynikają z równowagi, a nie ze…',
      visual: 'axial',
      focus: { metric: 'σ' },
    },
  ],
} satisfies SolutionData
