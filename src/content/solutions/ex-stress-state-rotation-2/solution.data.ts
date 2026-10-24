import type { SolutionData } from '../../model'

export default {
  id: 'ex-stress-state-rotation-2',
  title: 'Obrót przekroju: ten sam stan, inne liczby — przykład 2',
  duration: 7,
  given: ['σ_x = σ_y = 0', 'τ_xy = 50 MPa', 'θ = 45°'],
  result:
    'Zwróć uwagę na kolejność kątów. Maksymalne ścinanie w tym stanie występuje przy θ=0, a maksymalne rozciąganie przy θ=45°. Ten sam stan ma więc dwa różne „najgorsze” kierunki, zależnie od mechanizmu zniszczenia.',
  figure: {
    kind: 'cube',
    stresses: { x: 0, y: 0, z: 0 },
    values: [
      { label: 'σ_x', value: '0 MPa', focus: 'stress', reveal: 0 },
      { label: 'σ_y', value: '0 MPa', focus: 'stress', reveal: 0 },
      { label: 'τ_xy', value: '50 MPa', focus: 'stress', reveal: 0 },
      { label: 'θ', value: '45°', focus: 'stress', reveal: 0 },
      { label: 'σ_n (45°)', value: '50 MPa', focus: 'stress' },
      { label: 'σ_t (45°)', value: '−50 MPa', focus: 'stress' },
      { label: 'τ_nt (45°)', value: '0 MPa', focus: 'stress' },
    ],
    note: 'Czyste ścinanie: naprężenia normalne są zerowe, a τ_xy = 50 MPa nie jest rysowane na ściankach.',
  },
  scenes: [
    {
      title: 'Dane i czyste ścinanie',
      narration:
        'Rozważmy czyste ścinanie: σ_x=σ_y=0 i τ_xy=50 MPa. Na płaszczyznach równoległych do osi działa tylko ścinanie, a naprężenia normalne są zerowe.',
      caption: 'Czyste ścinanie w płaszczyźnie xy.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '\\sigma_x=\\sigma_y=0,\\quad \\tau_{xy}=50\\ \\text{MPa}',
    },
    {
      title: 'Obrót o 45°',
      narration:
        'Dla θ=45° mamy 2θ=90°, więc cos90°=0 i sin90°=1. Wzór daje σ_n=0+0+50·1=50 MPa oraz σ_t=0-0-50·1=-50 MPa. Naprężenie styczne wynosi τ_nt=-0+50·0=0.',
      caption: 'Na płaszczyznach nachylonych o 45° pojawia się czyste rozciąganie i ściskanie.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '\\sigma_n=50\\ \\text{MPa},\\quad \\sigma_t=-50\\ \\text{MPa},\\quad \\tau_{nt}=0',
    },
    {
      title: 'Koło Mohra',
      narration:
        'Dla czystego ścinania środek koła leży w początku układu, a promień wynosi 50 MPa. Punkty odpowiadające przekrojom o θ=0 i θ=45° leżą na przeciwległych końcach średnicy.',
      caption: 'Ten sam okrąg, tylko inny punkt na obwodzie.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: 'C=0,\\quad R=50\\ \\text{MPa}',
    },
    {
      title: 'Płaszczyzna θ = 0',
      narration:
        'Na płaszczyźnie θ=0 mamy σ_n=0 i τ_nt=50 MPa. Ten sam punkt materiału ma na jednym przekroju tylko ścinanie, a na innym tylko rozciąganie i ściskanie.',
      caption: 'Stan naprężenia nie jest tym samym co jego zapis w jednym układzie.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '\\sigma_n=0,\\quad \\tau_{nt}=50\\ \\text{MPa}',
    },
    {
      title: 'Kierunki krytyczne',
      narration:
        'Maksymalne ścinanie występuje przy θ=0, a maksymalne rozciąganie przy θ=45°. Kierunek niebezpieczny zależy od materiału: kruchy boi się rozciągania pod 45°, a ciągliwy może płynąć przy ścinaniu wzdłuż osi.',
      caption: 'Dwa różne „najgorsze” kierunki w tym samym stanie.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '\\theta_{\\tau\\max}=0^\\circ,\\quad \\theta_{\\sigma\\max}=45^\\circ',
    },
    {
      title: 'Interpretacja wyniku',
      narration:
        'Na płaszczyznach nachylonych o 45° do osi x nie ma ścinania, a występuje czyste rozciąganie i ściskanie o wartości 50 MPa. To ten sam stan, tylko opisany w innych osiach.',
      caption: 'Obrót układu ujawnia ukryte rozciąganie.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula:
        '\\boxed{\\sigma_n(45^\\circ)=50\\ \\text{MPa},\\quad \\sigma_t(45^\\circ)=-50\\ \\text{MPa},\\quad \\tau_{nt}(45^\\circ)=0}',
    },
    {
      title: 'Wniosek inżynierski',
      narration:
        'Materiały kruche skręcane lub ścinane mogą pękać pod kątem 45°: pęknięcie otwiera się pod wpływem rozciągania, które w układzie pierwotnym było „ukryte” w ścinaniu.',
      caption: 'Kierunek pęknięcia zależy od stanu naprężenia, nie od kierunku przyłożenia siły.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '\\tau_{xy}=50\\ \\text{MPa}\\quad\\Rightarrow\\quad\\sigma_{45^\\circ}=\\pm50\\ \\text{MPa}',
    },
  ],
} satisfies SolutionData
