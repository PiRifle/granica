import type { SolutionData } from '../../model'
import { SolidTorsionPowerAnimation } from './animation'

export default {
  id: 'ex-shear-solid-torsion-2',
  title: 'Skręcanie wału pełnego — przykład 2',
  duration: 7,
  given: ['P = 15 kW', 'n = 1450 obr/min', 'd = 25 mm', 'G = 80 GPa'],
  result:
    'Ten przykład pokazuje, że moc i prędkość obrotowa są równoważne momentowi. Przy tej samej mocy mniejsza prędkość oznacza większy moment i większe naprężenie. Dlatego wały wolnoobrotowe muszą być grubsze od szybkoobrotowych przenoszących tę samą moc.',
  animation: SolidTorsionPowerAnimation,
  figure: {
    kind: 'section',
    width: 25,
    height: 25,
    parts: [
      {
        x: 0,
        y: 0,
        width: 25,
        height: 25,
        label: 'wał ∅25',
        tone: 'solid',
      },
    ],
    centroid: {
      x: 12.5,
      y: 12.5,
    },
    values: [
      {
        label: 'P',
        value: '15 kW',
        focus: 'load',
        reveal: 0,
      },
      {
        label: 'n',
        value: '1450 obr/min',
        focus: 'load',
        reveal: 0,
      },
      {
        label: 'd',
        value: '25 mm',
        focus: 'design',
        reveal: 0,
      },
      {
        label: 'G',
        value: '80 GPa',
        focus: 'design',
        reveal: 0,
      },
    ],
    note: 'Moc i prędkość obrotowa wyznaczają moment, a ten decyduje o naprężeniu i kącie skręcenia.',
    shape: 'circle',
  },
  scenes: [
    {
      title: 'Model wału napędowego',
      narration:
        'Wał napędowy przenosi moc P = 15 kW przy prędkości obrotowej n = 1450 obr/min. Średnica wału wynosi d = 25 mm, a materiał ma G = 80 GPa. Chcemy obliczyć moment i maksymalne naprężenie.',
      caption: 'Moc i prędkość obrotowa są danymi wejściowymi; średnica określa przekrój.',
      visual: 'section',
      focus: {
        metric: 'model',
      },
      formula: 'P = 15\\ \\text{kW}, \\qquad n = 1450\\ \\text{obr/min}',
    },
    {
      title: 'Moment z mocy i prędkości',
      narration:
        'Najpierw zamieniamy prędkość obrotową na prędkość kątową: ω = 2πn/60 = 151,84 rad/s. Moc w watach to 15 000 W, więc moment wynosi T = P/ω = 15 000/151,84 = 98,79 N·m.',
      caption: 'Moment jest przyłożony do wału i przenoszony na odbiornik.',
      visual: 'section',
      focus: {
        metric: 'torque',
      },
      formula:
        '\\omega = \\frac{2\\pi n}{60} = 151{,}84\\ \\text{rad/s}, \\qquad T = \\frac{P}{\\omega} = 98{,}79\\ \\text{N}\\cdot\\text{m}',
    },
    {
      title: 'Skręcenie wału',
      narration:
        'Wał skręca się o φ = TL/(GJ_o). Dla odcinka o długości 1 m otrzymujemy 0,0322 rad, czyli 1,84°. To już zauważalne skręcenie, które może być nieakceptowalne w precyzyjnym napędzie.',
      caption: 'Kąt skręcenia rośnie z długością i momentem, a maleje ze sztywnością GJ_o.',
      visual: 'section',
      focus: {
        metric: 'twist',
      },
      formula: '\\varphi = \\frac{T L}{G J_o} = 1{,}84^\\circ/\\text{m}',
    },
    {
      title: 'Naprężenia w przekroju',
      narration:
        'Naprężenie styczne rośnie liniowo od zera w osi do maksimum na powierzchni. Dla d = 25 mm wskaźnik wytrzymałości wynosi W_o = 3067,96 mm³, więc τ_max = 32,2 MPa.',
      caption: 'Maksimum występuje na obwodzie; w osi naprężenie jest zerowe.',
      visual: 'section',
      focus: {
        metric: 'stress',
      },
      formula: '\\tau_{max} = \\frac{T}{W_o} = \\frac{98\\,790}{3067{,}96} = 32{,}2\\ \\text{MPa}',
    },
    {
      title: 'Wniosek projektowy',
      narration:
        'Moc i prędkość obrotowa są równoważne momentowi. Przy tej samej mocy mniejsza prędkość oznacza większy moment i większe naprężenie. Dlatego wały wolnoobrotowe muszą być grubsze od szybkoobrotowych przenoszących tę samą moc.',
      caption: 'Moment łączy dane napędowe z rozkładem naprężeń i kątem skręcenia.',
      visual: 'section',
      focus: {
        metric: 'result',
      },
      formula: 'T = \\frac{P}{\\omega}, \\qquad \\tau_{max} = \\frac{T}{W_o}',
    },
  ],
} satisfies SolutionData
