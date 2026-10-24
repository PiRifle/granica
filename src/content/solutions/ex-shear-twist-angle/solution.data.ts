import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-shear-twist-angle',
  title: 'Kąt skręcenia i sztywność wału — przykład 1',
  duration: 7,
  animation: lazy(() => import('./animation').then((module) => ({ default: module.ShearTwistAngleAnimation }))),
  given: ['T = 1,2 kN·m', 'd_1 = 50 mm', 'L_1 = 600 mm', 'd_2 = 40 mm', 'L_2 = 400 mm', 'G = 80 GPa'],
  result:
    'Całkowity kąt skręcenia wynosi około 0,0385 rad, czyli 2,21°. Największe naprężenie styczne, około 95,5 MPa, występuje w cieńszym odcinku. Krótszy odcinek daje większy przyrost kąta, ponieważ ma znacznie mniejszy J_o.',
  figure: {
    kind: 'beam',
    length: 1,
    supports: [
      { at: 0, label: 'A' },
      { at: 1, label: 'B' },
    ],
    shear: [
      [
        [0, 1.2],
        [1, 1.2],
      ],
    ],
    markers: [{ x: 0.5, y: 1.2, text: 'T = 1,2 kN·m', diagram: 'shear' }],
    values: [
      { label: 'T', value: '1,2 kN·m', focus: 'T', reveal: 0 },
      { label: 'd_1', value: '50 mm', focus: 'design', reveal: 0 },
      { label: 'L_1', value: '600 mm', focus: 'design', reveal: 0 },
      { label: 'd_2', value: '40 mm', focus: 'design', reveal: 0 },
      { label: 'L_2', value: '400 mm', focus: 'design', reveal: 0 },
      { label: 'G', value: '80 GPa', focus: 'design', reveal: 0 },
      { label: 'J_o1', value: '613 592 mm⁴', focus: 'design' },
      { label: 'J_o2', value: '251 327 mm⁴', focus: 'design' },
      { label: 'φ_1', value: '0,01467 rad', focus: 'design' },
      { label: 'φ_2', value: '0,02387 rad', focus: 'design' },
      { label: 'φ', value: '0,03854 rad', focus: 'design' },
      { label: 'φ', value: '2,21°', focus: 'design' },
      { label: 'τ_1', value: '48,9 MPa', focus: 'stress' },
      { label: 'τ_2', value: '95,5 MPa', focus: 'stress', reveal: 7 },
    ],
    note: 'Moment skręcający jest stały na całej długości; o kącie decyduje suma TL/(GJ_o) obu odcinków.',
  },
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Wał stopniowany jest utwierdzony w przekroju A, a moment T = 1,2 kN·m działa na końcu B. Pierwszy odcinek ma d₁ = 50 mm i L₁ = 600 mm, drugi d₂ = 40 mm i L₂ = 400 mm. Moduł ścinania wynosi G = 80 GPa.',
      caption: 'Model: dwa odcinki o różnej średnicy, połączone stopniem. Moment jest stały na całej długości.',
      visual: 'beam',
      focus: { metric: 'T' },
      formula: 'T = 1{,}2\\ \\text{kN}\\cdot\\text{m} = 1\\,200\\,000\\ \\text{N}\\cdot\\text{mm}',
    },
    {
      title: 'Sztywność obu odcinków',
      narration:
        'Biegunowy moment bezwładności pierwszego odcinka wynosi J_o1 = π · 50^4/32 = 613 592 mm^4, a drugiego J_o2 = π · 40^4/32 = 251 327 mm^4.',
      caption: 'J_o2 jest ponad dwukrotnie mniejsze od J_o1, dlatego cieńszy odcinek stawia mniejszy opór skręcaniu.',
      visual: 'beam',
      focus: { metric: 'Jo' },
      formula:
        'J_{o1} = \\pi \\cdot 50^4/32 = 613\\,592\\ \\text{mm}^4 \\quad J_{o2} = \\pi \\cdot 40^4/32 = 251\\,327\\ \\text{mm}^4',
    },
    {
      title: 'Skręcenie odcinka 1',
      narration:
        'Kąt pierwszego odcinka: φ₁ = 1 200 000 · 600/(80 000 · 613 592) = 0,01467 rad. Na dłuższym, grubszym odcinku przyrost kąta jest umiarkowany.',
      caption: 'Widzimy rzeczywiste narastanie skręcenia wzdłuż odcinka 1.',
      visual: 'beam',
      focus: { metric: 'φ1' },
      formula: '\\varphi_1 = 1\\,200\\,000 \\cdot 600/(80\\,000 \\cdot 613\\,592) = 0{,}01467\\ \\text{rad}',
    },
    {
      title: 'Skręcenie odcinka 2',
      narration:
        'Kąt drugiego odcinka: φ₂ = 1 200 000 · 400/(80 000 · 251 327) = 0,02387 rad. Krótszy odcinek daje większy przyrost, bo ma znacznie mniejszy J_o.',
      caption: 'Odcinek 2 dołącza swój obrót do już skręconego odcinka 1; kąty się sumują.',
      visual: 'beam',
      focus: { metric: 'φ2' },
      formula: '\\varphi_2 = 1\\,200\\,000 \\cdot 400/(80\\,000 \\cdot 251\\,327) = 0{,}02387\\ \\text{rad}',
    },
    {
      title: 'Kąt całkowity',
      narration:
        'Całkowity kąt to suma przyrostów: φ = 0,01467 + 0,02387 = 0,03854 rad. Po przeliczeniu φ = 0,03854 · 180/π = 2,21°.',
      caption: 'Obrót końca B względem A wynosi 0,0385 rad, czyli 2,21°.',
      visual: 'beam',
      focus: { metric: 'φ' },
      formula:
        '\\varphi = 0{,}01467+0{,}02387 = 0{,}03854\\ \\text{rad} \\quad \\varphi = 0{,}03854 \\cdot 180/\\pi = 2{,}21^\\circ',
    },
    {
      title: 'Kontrola naprężenia',
      narration:
        'Kąt opisuje sztywność, a nie wytrzymałość. Naprężenia wynoszą τ₁ = 1 200 000 · 25/613 592 = 48,9 MPa oraz τ₂ = 1 200 000 · 20/251 327 = 95,5 MPa. Decyduje cieńszy odcinek 2.',
      caption: 'Oba warunki trzeba sprawdzać niezależnie: mały kąt nie gwarantuje małego naprężenia.',
      visual: 'beam',
      focus: { metric: 'stress' },
      formula:
        '\\tau_1 = 1\\,200\\,000 \\cdot 25/613\\,592 = 48{,}9\\ \\text{MPa} \\quad \\tau_2 = 1\\,200\\,000 \\cdot 20/251\\,327 = 95{,}5\\ \\text{MPa}',
    },
  ],
} satisfies SolutionData
