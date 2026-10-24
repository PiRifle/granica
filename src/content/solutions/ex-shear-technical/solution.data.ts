import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-shear-technical',
  title: 'Ścinanie techniczne: siła w poprzek przekroju — przykład 1',
  duration: 7,
  given: ['d = 20 mm', 'F = 30 kN'],
  result:
    'τ_sr ≈ 95,5 MPa. Wartość jest średnia po przekroju; w rzeczywistym sworzeniu naprężenie może być lokalnie większe, szczególnie przy krawędzi blachy.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.ShearTechnicalExample1Animation }))),
  figure: {
    kind: 'section',
    width: 20,
    height: 20,
    parts: [
      {
        x: 0,
        y: 0,
        width: 20,
        height: 20,
        label: 'sworzeń ∅20',
        tone: 'solid',
      },
    ],
    centroid: {
      x: 10,
      y: 10,
    },
    values: [
      {
        label: 'd',
        value: '20 mm',
        focus: 'design',
        reveal: 0,
      },
      {
        label: 'F',
        value: '30 kN',
        focus: 'load',
        reveal: 0,
      },
      {
        label: 'A',
        value: '314,16 mm²',
        focus: 'design',
      },
      {
        label: 'τ_sr',
        value: '95,5 MPa',
        focus: 'stress',
        reveal: 2,
      },
    ],
    note: 'Naprężenie średnie w przekroju sworznia wynosi około 95,5 MPa.',
    shape: 'circle',
  },
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Sworzeń o średnicy d = 20 mm pracuje w połączeniu jednociętym i przenosi siłę F = 30 kN. Dwie blachy naciskają na sworzeń z przeciwnych stron, a siła przechodzi przez jeden przekrój.',
      caption: 'Dwie blachy i jeden sworzeń; siła 30 kN jest przenoszona przez styk blach.',
      visual: 'section',
      focus: { metric: 'model' },
      formula: 'F = 30\\ \\text{kN},\\qquad d = 20\\ \\text{mm}',
    },
    {
      title: 'Płaszczyzna ścinania',
      narration:
        'W styku blach powstaje jedna płaszczyzna ścinania. Sworzeń jest przecięty tylko raz, więc liczba płaszczyzn wynosi n = 1, a pole ścinane jest równe polu jednego przekroju: A_s = A.',
      caption: 'Jedna płaszczyzna ścinania w styku blach; n = 1.',
      visual: 'section',
      focus: { metric: 'plane' },
      formula: 'n = 1,\\qquad A_s = A',
    },
    {
      title: 'Pole ścinane',
      narration:
        'Pole ścinane to przekrój poprzeczny sworznia, a nie powierzchnia boczna walca. Dla średnicy 20 mm otrzymujemy A = π d^2/4 = π · 20^2/4 = 314,16 mm^2.',
      caption: 'Pole ścinane to pole koła o średnicy 20 mm.',
      visual: 'section',
      focus: { metric: 'area' },
      formula: 'A = \\pi d^2/4 = \\pi \\cdot 20^2/4 = 314{,}16\\ \\text{mm}^2',
    },
    {
      title: 'Siła i naprężenie',
      narration:
        'Siła 30 kN = 30 000 N przechodzi przez cały przekrój. Przy równomiernym rozkładzie średnie naprężenie styczne wynosi τ_sr = 30 000/314,16 = 95,49 N/mm^2, czyli około 95,5 MPa.',
      caption: 'Siła przechodzi przez pole 314,16 mm²; τ_sr ≈ 95,5 MPa.',
      visual: 'section',
      focus: { metric: 'stress' },
      formula: '\\tau_{sr} = \\frac{30\\,000}{314{,}16} = 95{,}49\\ \\text{MPa}',
    },
    {
      title: 'Kontrola i interpretacja',
      narration:
        'Wynik około 95 MPa jest typowy dla stali konstrukcyjnej i znacznie poniżej granicy plastyczności. To wartość średnia: w rzeczywistym sworzeniu naprężenie jest większe przy krawędziach blach, dlatego model techniczny daje oszacowanie, a nie dokładny rozkład.',
      caption: 'τ_sr ≈ 95,5 MPa; lokalne spiętrzenia przy krawędziach blach są większe od średniej.',
      visual: 'section',
      focus: { metric: 'check' },
      formula: '\\tau_{sr} \\approx 95{,}5\\ \\text{MPa}',
    },
  ],
} satisfies SolutionData
