import type { SolutionData } from '../../model'

export default {
  id: 'ex-shear-stress-strain-2',
  title: 'Naprężenia i odkształcenia styczne — przykład 2',
  duration: 7,
  given: ['G = 27 GPa', 'nu = 0,33', 'gamma = 0,0012 rad'],
  result:
    'W metalu ciągliwym to samo rozciągnięcie może wywołać płynięcie, a nie pęknięcie. Granica między jednym a drugim zależy od temperatury i prędkości obciążenia, więc nie jest uniwersalna. Materiał zaczyna się odkształcać plastycznie, gdy naprężenie zredukowane przekroczy granicę plastyczności. Wtedy wzór τ = Gγ przestaje obowiązywać, a odkształcenie rośnie szybciej niż naprężenie. Dlatego przy projektowaniu na ścinanie trzeba znać nie tylko moduł G, ale też granicę plastyczności.',
  figure: {
    kind: 'cube',
    stresses: { x: 32.4, y: -32.4, z: 0 },
    values: [
      { label: 'G', value: '27 GPa', focus: 'design', reveal: 0 },
      { label: 'ν', value: '0,33', focus: 'design', reveal: 0 },
      { label: 'γ', value: '0,0012 rad', focus: 'stress', reveal: 0 },
      { label: 'τ', value: '32,4 MPa', focus: 'stress' },
      { label: 'E', value: '71,82 GPa', focus: 'design' },
      { label: 'σ_1', value: '+32,4 MPa', focus: 'stress' },
      { label: 'σ_2', value: '-32,4 MPa', focus: 'stress', reveal: 3 },
    ],
    note: 'Dla aluminium G = 27 GPa i ν = 0,33 dają E = 71,82 GPa, typowe dla stopów aluminium.',
  },
  scenes: [
    {
      title: 'Krok 1',
      narration:
        'Rozważmy element z aluminium, dla którego moduł ścinania wynosi G = 27 GPa, a liczba Poissona ν = 0,33. Zmierzone odkształcenie postaciowe wynosi γ = 0,0012 rad. Chcemy obliczyć naprężenie styczne, moduł Younga i naprężenia główne.',
      caption:
        'Rozważmy element z aluminium, dla którego moduł ścinania wynosi G = 27 GPa, a liczba Poissona ν = 0,33. Zmierzone odkształcenie…',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: 'G = 27\\ \\text{GPa}',
    },
    {
      title: 'Krok 2',
      narration:
        'Naprężenie styczne obliczamy wprost z prawa Hooke’a: τ = Gγ = 27 000 · 0,0012 = 32,4 MPa. Zwróć uwagę, że G zamieniliśmy na MPa, ponieważ odkształcenie jest bezwymiarowe, a wynik ma być w MPa.',
      caption:
        'Naprężenie styczne obliczamy wprost z prawa Hooke’a: τ = Gγ = 27 000 · 0,0012 = 32,4 MPa. Zwróć uwagę, że G zamieniliśmy na MPa,…',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '\\tau = G\\gamma = 27\\,000 \\cdot 0{,}0012 = 32{,}4\\ \\text{MPa}',
    },
    {
      title: 'Krok 3',
      narration:
        'Moduł Younga wyznaczamy z przekształcenia zależności między stałymi: E = 2G(1+ν) = 2 · 27 · 1,33 = 71,82 GPa. Ten wynik jest typowy dla stopów aluminium, dla których E mieści się w przedziale około 69–72 GPa.',
      caption:
        'Moduł Younga wyznaczamy z przekształcenia zależności między stałymi: E = 2G(1+ν) = 2 · 27 · 1,33 = 71,82 GPa. Ten wynik jest…',
      visual: 'cube',
      focus: { metric: 'design' },
      formula: 'E = 2G(1+\\nu) = 2 \\cdot 27 \\cdot 1{,}33 = 71{,}82\\ \\text{GPa}',
    },
    {
      title: 'Krok 4',
      narration:
        'Naprężenia główne w czystym ścinaniu wynoszą σ_1 = +32,4 MPa i σ_2 = -32,4 MPa. Oznacza to, że mimo braku zewnętrznego rozciągania w materiale pojawia się lokalne rozciąganie o wartości 32,4 MPa, skierowane pod kątem 45 stopni do płaszczyzny ścinania.',
      caption:
        'Naprężenia główne w czystym ścinaniu wynoszą σ_1 = +32,4 MPa i σ_2 = -32,4 MPa. Oznacza to, że mimo braku zewnętrznego…',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '\\sigma_1 = +32{,}4\\ \\text{MPa}',
    },
    {
      title: 'Krok 5',
      narration:
        'Gdyby materiał był kruchy i miał wytrzymałość na rozciąganie mniejszą niż 32,4 MPa, mógłby pęknąć mimo tego, że naprężenie styczne wydaje się niewielkie. To pokazuje, dlaczego przy ścinaniu materiałów kruchych trzeba sprawdzać naprężenia główne, a nie tylko samo τ.',
      caption:
        'Gdyby materiał był kruchy i miał wytrzymałość na rozciąganie mniejszą niż 32,4 MPa, mógłby pęknąć mimo tego, że naprężenie…',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '\\tau = 32{,}4\\ \\text{MPa}',
    },
    {
      title: 'Krok 6',
      narration:
        'W metalu ciągliwym to samo rozciągnięcie może wywołać płynięcie, a nie pęknięcie. Granica między jednym a drugim zależy od temperatury i prędkości obciążenia, więc nie jest uniwersalna. Materiał zaczyna się odkształcać plastycznie, gdy naprężenie zredukowane przekroczy granicę plastyczności. Wtedy wzór τ = Gγ przestaje obowiązywać, a odkształcenie rośnie szybciej niż naprężenie. Dlatego przy projektowaniu na ścinanie trzeba znać nie tylko moduł G, ale też granicę plastyczności.',
      caption:
        'W metalu ciągliwym to samo rozciągnięcie może wywołać płynięcie, a nie pęknięcie. Granica między jednym a drugim zależy od…',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '\\tau = G\\gamma',
    },
  ],
} satisfies SolutionData
