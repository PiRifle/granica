import type { SolutionData } from '../../model'

export default {
  id: 'ex-m3-self-weight-3',
  title: 'Ciężar własny elementu — przykład 3',
  duration: 7,
  given: ['R_e=235 MPa', 'rho=7850', 'g=9'],
  result:
    'Wniosek projektowy jest prosty: jeżeli długość jest ograniczona wytrzymałością od ciężaru własnego, to zmiana przekroju nie pomoże. Trzeba wybrać materiał o większym stosunku R_e/ρ albo zmienić schemat konstrukcji, na przykład dodać podpory pośrednie. To jakościowo inna decyzja niż zwykłe „zwiększenie przekroju”, które działa przy sile skupionej.',
  figure: {
    kind: 'axial',
    top: 'free',
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
        id: 'l300',
        label: 'L = 300 m',
        length: 300000,
        sigma: 23.1,
      },
      {
        id: 'lmax',
        label: 'L_max = 3052 m',
        length: 3052000,
        sigma: 235,
      },
    ],
    note: 'Schemat porównawczy długości; σ = γL, γ = 77 000 N/m³.',
  },
  scenes: [
    {
      title: 'Krok 1',
      narration:
        'Pytanie odwrotne brzmi: jak długi może być stalowy pręt wiszący, zanim naprężenie od ciężaru własnego osiągnie granicę plastyczności? Dla R_e=235 MPa, ρ=7850 kg/m^3 i g=9,81 m/s^2 otrzymujemy',
      caption:
        'Pytanie odwrotne brzmi: jak długi może być stalowy pręt wiszący, zanim naprężenie od ciężaru własnego osiągnie granicę…',
      visual: 'thermal',
      focus: { metric: 'σ' },
      formula: 'R_{e} = 235 MPa, \\rho = 7850 kg/m^{3}',
    },
    {
      title: 'Krok 2',
      narration: 'Zapis matematyczny.',
      caption: 'L_max=(R_e)/(ρ g) =(235· 10^6)/(7850· 9,81)≈ 3052 m.',
      visual: 'thermal',
      focus: { metric: 'σ' },
      formula: 'L_{\\max}=\\frac{R_e}{\\rho g}\n=\\frac{235\\cdot 10^6}{7850\\cdot 9{,}81}\\approx 3052\\ \\text{m}.',
    },
    {
      title: 'Krok 3',
      narration:
        'Jeśli wymagamy współczynnika bezpieczeństwa n=2 względem granicy plastyczności, dopuszczalne naprężenie wynosi 117,5 MPa, a maksymalna długość maleje do',
      caption:
        'Jeśli wymagamy współczynnika bezpieczeństwa n=2 względem granicy plastyczności, dopuszczalne naprężenie wynosi 117,5 MPa, a…',
      visual: 'thermal',
      focus: { metric: 'σ' },
      formula: 'n = 2',
    },
    {
      title: 'Krok 4',
      narration: 'Zapis matematyczny.',
      caption: 'L_max,n=(117,5· 10^6)/(77 000)≈ 1526 m.',
      visual: 'thermal',
      focus: { metric: 'σ' },
      formula: 'L_{\\max,n}=\\frac{117{,}5\\cdot 10^6}{77\\,000}\\approx 1526\\ \\text{m}.',
    },
    {
      title: 'Krok 5',
      narration: 'Dla pręta o długości 300 m naprężenie od ciężaru własnego wynosi tylko',
      caption: 'Dla pręta o długości 300 m naprężenie od ciężaru własnego wynosi tylko',
      visual: 'thermal',
      focus: { metric: 'σ' },
    },
    {
      title: 'Krok 6',
      narration: 'Zapis matematyczny.',
      caption: 'σ=γ L=77 000· 300=23,1 MPa,',
      visual: 'thermal',
      focus: { metric: 'σ' },
      formula: '\\sigma=\\gamma L=77\\,000\\cdot 300=23{,}1\\ \\text{MPa},',
    },
    {
      title: 'Krok 7',
      narration:
        'więc obliczony zapas względem R_e jest równy 235/23,1≈ 10,2. To pokazuje, że w typowych konstrukcjach budowlanych ciężar własny stali często nie jest dominujący, ale w bardzo długich elementach lub w materiałach o dużej gęstości i małej wytrzymałości może stać się warunkiem decydującym.',
      caption:
        'więc obliczony zapas względem R_e jest równy 235/23,1≈ 10,2. To pokazuje, że w typowych konstrukcjach budowlanych ciężar własny…',
      visual: 'thermal',
      focus: { metric: 'σ' },
      formula: '235/23{,}1 \\approx 10{,}2',
    },
    {
      title: 'Krok 8',
      narration:
        'Wniosek projektowy jest prosty: jeżeli długość jest ograniczona wytrzymałością od ciężaru własnego, to zmiana przekroju nie pomoże. Trzeba wybrać materiał o większym stosunku R_e/ρ albo zmienić schemat konstrukcji, na przykład dodać podpory pośrednie. To jakościowo inna decyzja niż zwykłe „zwiększenie przekroju”, które działa przy sile skupionej.',
      caption:
        'Wniosek projektowy jest prosty: jeżeli długość jest ograniczona wytrzymałością od ciężaru własnego, to zmiana przekroju nie…',
      visual: 'thermal',
      focus: { metric: 'σ' },
    },
  ],
} satisfies SolutionData
