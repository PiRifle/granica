import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-strain-state-epsilon-gamma',
  title: 'Odkształcenia: długości i kąty — przykład 1',
  duration: 7,
  given: ['L_0=250 mm', 'ΔL=0,18 mm', 'γ_xy=0,0009 rad'],
  result:
    'ε_x=720 με, γ_xy=0,0009 rad, a ε_xy=0,00045. Wydłużenie i ścinanie są osobnymi miarami i mają różne wartości liczbowe.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.StrainEpsilonGammaAnimation }))),
  figure: {
    kind: 'rosette',
    gauges: [
      { angle: 0, label: '0°', value: 0.00072, display: '720 με' },
      { angle: 45, label: '45°', value: 0.00081, display: '810 με' },
      { angle: 90, label: '90°', value: 0, display: '0 με' },
    ],
    gamma: { value: 0.0009, display: '900 μrad' },
    mohr: {
      center: 0.00036,
      radius: 0.0005762811814,
      left: -0.0002162811814,
      right: 0.0009362811814,
      angle: 25.67,
    },
    values: [
      { label: 'ΔL', value: '0,18 mm', focus: 'gauges', reveal: 0 },
      { label: 'ε_x', value: '720 με', focus: 'gauges' },
      { label: 'ε_y', value: '0 με', focus: 'gauges' },
      { label: 'γ_xy', value: '900 μrad', focus: 'shear' },
      { label: 'ε_xy', value: '450 μrad', focus: 'shear' },
      { label: 'ε_sr', value: '360 με', focus: 'mohr' },
      { label: 'R_ε', value: '576,28 με', focus: 'mohr' },
      { label: 'ε_I', value: '936,28 με', focus: 'principal' },
      { label: 'ε_II', value: '−216,28 με', focus: 'principal' },
      { label: 'φ_I', value: '25,67°', focus: 'angle' },
      { label: 'σ_I', value: '191,52 MPa', focus: 'stress' },
      { label: 'σ_II', value: '14,20 MPa', focus: 'stress' },
    ],
    note: 'Zadanie podaje tylko ε_x i γ_xy; na rysunku przyjęto ε_y = 0, aby pokazać pełne koło Mohra. To założenie ilustracyjne, nie dodatkowy pomiar.',
  },
  scenes: [
    {
      title: 'Model: baza pomiarowa i dane',
      narration:
        'Pręt pomiarowy ma długość początkową L₀ = 250 mm. Pod obciążeniem wydłużył się o ΔL = 0,18 mm, a początkowo prosty kąt zmniejszył się o γ_xy = 0,0009 rad. Na rysunku element jest pokazany poglądowo, a deformacje są celowo powiększone.',
      caption: 'L₀ = 250 mm, ΔL = 0,18 mm, γ_xy = 0,0009 rad.',
      visual: 'rosette',
      focus: { metric: 'model' },
      formula: 'L_0=250\\,\\text{mm},\\qquad \\Delta L=0{,}18\\,\\text{mm},\\qquad \\gamma_{xy}=0{,}0009\\,\\text{rad}',
    },
    {
      title: 'Odkształcenie liniowe: wydłużenie',
      narration:
        'Wydłużenie 0,18 mm na bazie 250 mm daje ε_x = 0,18/250 = 0,00072. Znak dodatni oznacza wydłużenie w kierunku x. To odpowiednik 720 με, czyli 0,072%.',
      caption: 'ε_x = 0,00072 = 720 με = 0,072%.',
      visual: 'rosette',
      focus: { metric: 'normal' },
      formula: '\\varepsilon_x=\\frac{0{,}18}{250}=0{,}00072=720\\,\\mu\\varepsilon',
    },
    {
      title: 'Odkształcenie postaciowe: zmiana kąta',
      narration:
        'Ten sam element doznaje też ścinania: początkowo prosty kąt zmniejsza się o γ_xy = 0,0009 rad, czyli 900 μrad. To osobna miara geometryczna, której nie dodajemy wprost do ε_x.',
      caption: 'γ_xy = 0,0009 rad = 900 μrad.',
      visual: 'rosette',
      focus: { metric: 'shear' },
      formula: '\\gamma_{xy}=0{,}0009\\,\\text{rad}=900\\,\\mu\\text{rad}',
    },
    {
      title: 'Składowa tensorowa: połowa kąta',
      narration:
        'Tensor odkształcenia jest symetryczny. Dwa boki obracają się po połowie kąta, dlatego składowa pozadiagonalna wynosi ε_xy = γ_xy/2 = 0,00045. To nie jest nowy pomiar, tylko inny zapis tej samej deformacji.',
      caption: 'ε_xy = γ_xy/2 = 0,00045 = 450 μrad.',
      visual: 'rosette',
      focus: { metric: 'tensor' },
      formula: '\\varepsilon_{xy}=\\frac{\\gamma_{xy}}{2}=\\frac{0{,}0009}{2}=0{,}00045',
    },
    {
      title: 'Koło Mohra: środek i promień',
      narration:
        'Aby pokazać pełny stan, przyjmujemy ε_y = 0, bo zadanie nie podaje odkształcenia poprzecznego. Środek koła wynosi ε_sr = 360 με, a promień R_ε = √(360² + 450²) = 576,28 με.',
      caption: 'ε_sr = 360 με, R_ε = 576,28 με.',
      visual: 'rosette',
      focus: { metric: 'mohr' },
      formula:
        '\\varepsilon_{sr}=\\frac{720+0}{2}=360\\,\\mu\\varepsilon,\\qquad R_\\varepsilon=\\sqrt{360^2+450^2}=576{,}28\\,\\mu\\varepsilon',
    },
    {
      title: 'Wartości główne, kierunek i naprężenia',
      narration:
        'Skrajne punkty koła dają ε_I = 936,28 με i ε_II = −216,28 με. Kierunek główny odchyla się o φ = 25,67° od osi x, bo tan 2φ = 900/720 = 1,25. Dla stali E = 200 GPa i ν = 0,30 otrzymujemy σ_I = 191,52 MPa oraz σ_II = 14,20 MPa. Odkształcenie 720 με to 0,072%, więc nadal jesteśmy w zakresie sprężystym.',
      caption: 'ε_I = 936,28 με, ε_II = −216,28 με, φ = 25,67°; σ_I = 191,52 MPa, σ_II = 14,20 MPa.',
      visual: 'rosette',
      focus: { metric: 'principal' },
      formula:
        '\\varepsilon_{I,II}=360\\pm576{,}28\\,\\mu\\varepsilon,\\qquad \\tan2\\varphi_I=\\frac{900}{720}=1{,}25\\ \\Rightarrow\\ \\varphi_I=25{,}67^\\circ',
    },
  ],
} satisfies SolutionData
