import type { SolutionData } from '../../model'

export default {
  id: 'ex-m3-tension-compression-test-3',
  title: 'Próba rozciągania i ściskania — przykład 3',
  duration: 7,
  given: ['A=40 mm²', 'varepsilon=800', 'E=200 GPa', 'L_0=80 mm'],
  result:
    'W praktyce tensometry mają niepewność pomiaru i mogą być przyklejone pod niewielkim kątem. Dlatego wynik zaokrągla się do liczby cyfr uzasadnionych dokładnością aparatury. W zadaniach szkolnych zwykle wystarczą trzy cyfry znaczące, ale w obliczeniach pośrednich warto zachować więcej, aby błąd zaokrąglenia nie urósł na końcu.',
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
        length: 40,
        area: 40,
        n: 6.4,
        sigma: 160,
        epsilon: 0.0008,
        deltaL: 0.032,
      },
      {
        id: '2',
        label: '2',
        length: 40,
        area: 40,
        n: 6.4,
        sigma: 160,
        epsilon: 0.0008,
        deltaL: 0.032,
      },
    ],
    loads: [
      {
        node: 2,
        value: 6.4,
        label: 'N = 6,4 kN',
      },
    ],
    note: 'ε = 800·10⁻⁶, A = 40 mm², L₀ = 80 mm.',
  },
  scenes: [
    {
      title: 'Krok 1',
      narration:
        'Załóżmy, że tensometr na stalowym pręcie o polu A=40 mm^2 wskazał odkształcenie ε=800· 10^-6. Moduł Younga stali przyjmujemy E=200 GPa. Szukamy siły osiowej i wydłużenia na bazie pomiarowej L_0=80 mm.',
      caption:
        'Załóżmy, że tensometr na stalowym pręcie o polu A=40 mm^2 wskazał odkształcenie ε=800· 10^-6. Moduł Younga stali przyjmujemy…',
      visual: 'thermal',
      focus: {
        metric: 'ε',
      },
      formula: '\\varepsilon = 800\\cdot 10^{-6}',
    },
    {
      title: 'Krok 2',
      narration: 'Najpierw wyznaczamy naprężenie z prawa Hooke’a:',
      caption: 'Najpierw wyznaczamy naprężenie z prawa Hooke’a:',
      visual: 'thermal',
      focus: {
        metric: 'σ',
      },
    },
    {
      title: 'Krok 3',
      narration: 'Zapis matematyczny.',
      caption: 'σ=Eε=200 000· 800· 10^-6=160 MPa.',
      visual: 'thermal',
      focus: {
        metric: 'σ',
      },
      formula: '\\sigma=E\\varepsilon=200\\,000\\cdot 800\\cdot 10^{-6}=160\\ \\text{MPa}.',
    },
    {
      title: 'Krok 4',
      narration: 'Następnie przekształcamy definicję naprężenia:',
      caption: 'Następnie przekształcamy definicję naprężenia:',
      visual: 'thermal',
      focus: {
        metric: 'N',
      },
    },
    {
      title: 'Krok 5',
      narration: 'Zapis matematyczny.',
      caption: 'N=σ A=160· 40=6400 N=6,4 kN.',
      visual: 'thermal',
      focus: {
        metric: 'N',
      },
      formula: 'N=\\sigma A=160\\cdot 40=6400\\ \\text{N}=6{,}4\\ \\text{kN}.',
    },
    {
      title: 'Krok 6',
      narration: 'Wydłużenie wynosi',
      caption: 'Wydłużenie wynosi',
      visual: 'thermal',
      focus: {
        metric: 'ΔL',
      },
    },
    {
      title: 'Krok 7',
      narration: 'Zapis matematyczny.',
      caption: 'Δ L=ε L_0=800· 10^-6· 80=0,064 mm.',
      visual: 'thermal',
      focus: {
        metric: 'ΔL',
      },
      formula: '\\Delta L=\\varepsilon L_0=800\\cdot 10^{-6}\\cdot 80=0{,}064\\ \\text{mm}.',
    },
    {
      title: 'Krok 8',
      narration:
        'Sprawdzenie: N L_0/(E A)=6400· 80/(200 000· 40)=0,064 mm. Wynik jest spójny. Naprężenie 160 MPa jest mniejsze od typowej granicy plastyczności stali 235 MPa, więc zastosowanie liniowego prawa Hooke’a jest uzasadnione. Gdyby tensometr wskazał 2000· 10^-6, otrzymalibyśmy 400 MPa i musielibyśmy sprawdzić, czy materiał nie wszedł w zakres plastyczny.',
      caption:
        'Sprawdzenie: N L_0/(E A)=6400· 80/(200 000· 40)=0,064 mm. Wynik jest spójny. Naprężenie 160 MPa jest mniejsze od typowej granicy…',
      visual: 'thermal',
      focus: {
        metric: 'ΔL',
      },
      formula: 'N L_{0}/(E A) = 6400\\cdot 80/(200\\,000\\cdot 40) = 0{,}064 mm',
    },
    {
      title: 'Krok 9',
      narration:
        'W praktyce tensometry mają niepewność pomiaru i mogą być przyklejone pod niewielkim kątem. Dlatego wynik zaokrągla się do liczby cyfr uzasadnionych dokładnością aparatury. W zadaniach szkolnych zwykle wystarczą trzy cyfry znaczące, ale w obliczeniach pośrednich warto zachować więcej, aby błąd zaokrąglenia nie urósł na końcu.',
      caption:
        'W praktyce tensometry mają niepewność pomiaru i mogą być przyklejone pod niewielkim kątem. Dlatego wynik zaokrągla się do liczby…',
      visual: 'thermal',
      focus: {
        metric: 'ε',
      },
    },
  ],
} satisfies SolutionData
