import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-shear-stress-strain-2',
  title: 'Naprężenia i odkształcenia styczne — przykład 2',
  duration: 7,
  given: ['G = 27 GPa', 'nu = 0,33', 'gamma = 0,0012 rad'],
  result:
    'W metalu ciągliwym to samo rozciągnięcie może wywołać płynięcie, a nie pęknięcie. Granica między jednym a drugim zależy od temperatury i prędkości obciążenia, więc nie jest uniwersalna. Materiał zaczyna się odkształcać plastycznie, gdy naprężenie zredukowane przekroczy granicę plastyczności. Wtedy wzór τ = Gγ przestaje obowiązywać, a odkształcenie rośnie szybciej niż naprężenie. Dlatego przy projektowaniu na ścinanie trzeba znać nie tylko moduł G, ale też granicę plastyczności.',
  figure: {
    kind: 'cube',
    stresses: { x: 0, y: 0, z: 0 },
    values: [
      { label: 'G', value: '27 GPa', focus: 'design', reveal: 0 },
      { label: 'ν', value: '0,33', focus: 'design', reveal: 0 },
      { label: 'γ', value: '0,0012 rad', focus: 'stress', reveal: 0 },
    ],
    note: 'Dane pomiarowe dla aluminium: moduł ścinania, liczba Poissona i zmierzony kąt odkształcenia.',
  },
  animation: lazy(() =>
    import('./animation').then((module) => ({ default: module.ShearStressStrainExample2Animation })),
  ),
  scenes: [
    {
      title: 'Pomiar odkształcenia',
      narration:
        'Element z aluminium ma G = 27 GPa i ν = 0,33. Zmierzone odkształcenie postaciowe wynosi γ = 0,0012 rad. Na rysunku kąt jest powiększony.',
      caption: 'Dane: G, ν oraz zmierzony kąt γ.',
      visual: 'cube',
      focus: { metric: 'model' },
      formula: 'G = 27\\ \\text{GPa},\\quad \\nu = 0{,}33,\\quad \\gamma = 0{,}0012\\ \\text{rad}',
    },
    {
      title: 'Naprężenie z prawa Hooke’a',
      narration:
        'Naprężenie styczne obliczamy wprost z prawa Hooke’a: τ = Gγ = 27 000 · 0,0012 = 32,4 MPa. Zwróć uwagę, że G zamieniliśmy na MPa, ponieważ odkształcenie jest bezwymiarowe, a wynik ma być w MPa.',
      caption: 'Nachylenie prostej τ(γ) to moduł ścinania G.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '\\tau = G\\gamma = 27\\,000 \\cdot 0{,}0012 = 32{,}4\\ \\text{MPa}',
    },
    {
      title: 'Moduł Younga',
      narration:
        'Moduł Younga wyznaczamy z przekształcenia zależności między stałymi: E = 2G(1+ν) = 2 · 27 · 1,33 = 71,82 GPa. Ten wynik jest typowy dla stopów aluminium, dla których E mieści się w przedziale około 69–72 GPa.',
      caption: 'Z G i ν wynika E ≈ 71,8 GPa.',
      visual: 'cube',
      focus: { metric: 'E' },
      formula: 'E = 2G(1+\\nu) = 2 \\cdot 27 \\cdot 1{,}33 = 71{,}82\\ \\text{GPa}',
    },
    {
      title: 'Naprężenia główne',
      narration:
        'Naprężenia główne w czystym ścinaniu wynoszą σ_1 = +32,4 MPa i σ_2 = -32,4 MPa. Oznacza to, że mimo braku zewnętrznego rozciągania w materiale pojawia się lokalne rozciąganie o wartości 32,4 MPa, skierowane pod kątem 45 stopni do płaszczyzny ścinania.',
      caption: 'Naprężenia główne są równe ±τ i działają pod kątem 45°.',
      visual: 'cube',
      focus: { metric: 'principal' },
      formula: '\\sigma_{1,2} = \\pm 32{,}4\\ \\text{MPa}',
    },
    {
      title: 'Kruche pęknięcie pod 45°',
      narration:
        'Gdyby materiał był kruchy i miał wytrzymałość na rozciąganie mniejszą niż 32,4 MPa, mógłby pęknąć mimo tego, że naprężenie styczne wydaje się niewielkie. To pokazuje, dlaczego przy ścinaniu materiałów kruchych trzeba sprawdzać naprężenia główne, a nie tylko samo τ.',
      caption: 'Materiał kruchy pęka prostopadle do rozciągania, czyli po przekątnej.',
      visual: 'cube',
      focus: { metric: 'brittle' },
      formula: '\\sigma_1 = +32{,}4\\ \\text{MPa}',
    },
    {
      title: 'Granica stosowalności',
      narration:
        'W metalu ciągliwym to samo rozciągnięcie może wywołać płynięcie, a nie pęknięcie. Granica między jednym a drugim zależy od temperatury i prędkości obciążenia, więc nie jest uniwersalna. Materiał zaczyna się odkształcać plastycznie, gdy naprężenie zredukowane przekroczy granicę plastyczności. Wtedy wzór τ = Gγ przestaje obowiązywać, a odkształcenie rośnie szybciej niż naprężenie.',
      caption: 'Po przekroczeniu granicy plastyczności τ = Gγ przestaje obowiązywać.',
      visual: 'cube',
      focus: { metric: 'limit' },
      formula: '\\tau = G\\gamma \\quad \\text{tylko w zakresie sprężystym}',
    },
  ],
} satisfies SolutionData
