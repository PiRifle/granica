import type { SolutionData } from '../../model'

export default {
  id: 'cw1-3',
  title: 'Trzy odcinki pręta o dwóch polach przekroju',
  duration: 9,
  given: [
    'P₁ = 30 kN na dolnym końcu, P₂ = 40 kN między odcinkami α i β',
    'A₁ = 2 cm² = 200 mm² dla odcinka α',
    'A₂ = 5 cm² = 500 mm² dla odcinków β i γ',
    'Długości od dołu: 1,5 m, 1 m i 1 m',
  ],
  result:
    'Nα = 30 kN, Nβ = Nγ = 70 kN. Naprężenia rozciągające wynoszą σα = 150 MPa oraz σβ = σγ = 140 MPa; reakcja górna wynosi 70 kN.',
  figure: {
    kind: 'axial',
    top: 'fixed',
    bottom: 'free',
    units: { N: 'kN', σ: 'MPa', A: 'mm²' },
    segments: [
      { id: 'γ', label: 'γ', length: 1000, area: 500, n: 70, sigma: 140 },
      { id: 'β', label: 'β', length: 1000, area: 500, n: 70, sigma: 140 },
      { id: 'α', label: 'α', length: 1500, area: 200, n: 30, sigma: 150 },
    ],
    loads: [
      { node: 2, value: 40, label: 'P₂ = 40 kN' },
      { node: 3, value: 30, label: 'P₁ = 30 kN' },
    ],
    note: 'Zmiana siły N następuje przy P₂, a zmiana pola przekroju na granicy α/β.',
  },
  scenes: [
    {
      title: 'Dane i podział na odcinki',
      narration:
        'Dolny odcinek α ma mniejszy przekrój A₁, a odcinki β i γ mają wspólny większy przekrój A₂. Siła P₂ działa na granicy α i β; między β i γ nie ma natomiast żadnej siły skupionej. Dlatego N w β i γ będzie takie samo mimo rozdzielenia tych odcinków na rysunku.',
      formula:
        'L_\\alpha=1,5\\,\\mathrm{m},\\quad L_\\beta=L_\\gamma=1\\,\\mathrm{m};\\qquad A_\\alpha=A_1,\\quad A_\\beta=A_\\gamma=A_2',
      caption: 'Zmiana N następuje przy P₂, a zmiana pola — na granicy α/β.',
      visual: 'axial',
    },
    {
      title: 'Reakcja górnego utwierdzenia',
      narration:
        'Dwie siły zewnętrzne działają w dół, więc reakcja R jest skierowana w górę. Z sumy sił otrzymujemy jej wartość 70 kN.',
      formula: 'R-P_1-P_2=0\\quad\\Rightarrow\\quad R=30+40=70\\,\\mathrm{kN}',
      caption: 'Utwierdzenie przenosi sumę obu obciążeń.',
      visual: 'axial',
    },
    {
      title: 'Przekroje i siły wewnętrzne',
      narration:
        'Dla przekroju w α wystarczy rozważyć dolną część z siłą P₁. Dla przekroju w β lub γ poniżej znajdują się już obie siły P₁ i P₂. Wszystkie wyniki są dodatnie, ponieważ odcinki są rozciągane.',
      formula: 'N_\\alpha=P_1=30\\,\\mathrm{kN},\\qquad N_\\beta=N_\\gamma=P_1+P_2=70\\,\\mathrm{kN}',
      caption: 'Metoda przekrojów: sumujemy obciążenia tylko z jednej, wybranej strony cięcia.',
      visual: 'axial',
    },
    {
      title: 'Wykres N',
      narration:
        'Wykres jest stały na poziomie +30 kN w odcinku α. Przy sile P₂ skacze o 40 kN i dalej pozostaje na poziomie +70 kN przez β i γ. Na granicy β/γ nie ma skoku, bo nie ma tam siły skupionej.',
      formula: 'N=\\begin{cases}30\\,\\mathrm{kN}&\\alpha\\\\70\\,\\mathrm{kN}&\\beta,\\gamma\\end{cases}',
      caption: 'Jeden skok wykresu N odpowiada sile P₂ = 40 kN.',
      visual: 'diagram',
    },
    {
      title: 'Przeliczenie pól przekrojów',
      narration:
        'Zamieniamy centymetry kwadratowe na milimetry kwadratowe. Mniejszy przekrój ma 200 mm², a większy 500 mm². Pole zmienia się tylko raz, na przejściu z α do β.',
      formula: 'A_1=2\\cdot100=200\\,\\mathrm{mm^2},\\qquad A_2=5\\cdot100=500\\,\\mathrm{mm^2}',
      caption: 'Stałe pole w β i γ oraz stałe N oznaczają też stałe naprężenie.',
      visual: 'axial',
    },
    {
      title: 'Naprężenie w odcinku α',
      narration:
        'Dolny odcinek przenosi 30 kN na polu 200 mm². Wynik jest dodatni i równy 150 N/mm², czyli 150 MPa rozciągania.',
      formula: '\\sigma_\\alpha=\\frac{N_\\alpha}{A_1}=\\frac{30\\,000}{200}=150\\,\\mathrm{MPa}',
      caption: 'Mała siła na małym polu daje największe naprężenie w zadaniu.',
      visual: 'axial',
    },
    {
      title: 'Naprężenia w odcinkach β i γ',
      narration:
        'Oba odcinki przenoszą 70 kN i mają pole 500 mm². Otrzymujemy zatem identyczne naprężenie 140 MPa. Jest nieco mniejsze niż w α mimo większej siły, ponieważ pole przekroju wzrosło 2,5 raza.',
      formula: '\\sigma_\\beta=\\sigma_\\gamma=\\frac{70\\,000}{500}=140\\,\\mathrm{MPa}',
      caption: 'β i γ mają ten sam poziom naprężenia rozciągającego.',
      visual: 'axial',
    },
    {
      title: 'Wykres σ i kontrola końcowa',
      narration:
        'Na granicy α/β naprężenie zmienia się ze 150 na 140 MPa, chociaż N rośnie — to skutek jednoczesnej dużej zmiany pola. Między β i γ wykres nie skacze. Wartość Nγ = 70 kN zgadza się z reakcją podpory.',
      formula:
        '|\\sigma|_{max}=150\\,\\mathrm{MPa}\\quad\\text{w odcinku }\\alpha,\\qquad N_\\gamma=R=70\\,\\mathrm{kN}',
      caption: 'Odpowiedź: α: 150 MPa; β i γ: 140 MPa, wszystko rozciąganie.',
      visual: 'diagram',
    },
  ],
} satisfies SolutionData
