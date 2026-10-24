import type { SolutionData } from '../../model'
import { PipeSecondMomentAnimation } from './animation'

export default {
  id: 'ex-m4-second-moments',
  title: 'Momenty bezwładności przekroju — przykład 1',
  duration: 7,
  given: ['D = 120 mm', 'd = 100 mm'],
  result:
    'Rura ma I≈ 5,27· 10^6 mm^4≈ 527 cm^4 i i≈ 39,05 mm, podczas gdy pełny pręt ma I_s≈ 10,18· 10^6 mm^4 i i_s=30 mm. Rura zużywa około 31% materiału i zachowuje około 52% sztywności zginania.',
  figure: {
    kind: 'section',
    width: 120,
    height: 120,
    parts: [
      {
        x: 0,
        y: 0,
        width: 120,
        height: 120,
        tone: 'light',
      },
    ],
    holes: [
      {
        cx: 60,
        cy: 60,
        r: 50,
        label: '∅100',
      },
    ],
    centroid: {
      x: 60,
      y: 60,
    },
    values: [
      {
        label: 'D',
        value: '120 mm',
        focus: 'section',
        reveal: 0,
      },
      {
        label: 'd',
        value: '100 mm',
        focus: 'section',
        reveal: 0,
      },
      {
        label: 'A rury',
        value: '3455,75 mm²',
        focus: 'section',
      },
      {
        label: 'I rury',
        value: '5,27·10⁶ mm⁴',
        focus: 'Ix',
      },
      {
        label: 'I pełnego pręta',
        value: '10,179·10⁶ mm⁴',
        focus: 'Ix',
      },
      {
        label: 'i rury',
        value: '39,05 mm',
        focus: 'Ix',
      },
      {
        label: 'i pełnego pręta',
        value: '30 mm',
        focus: 'Ix',
      },
      {
        label: 'I_y rury',
        value: '5,27·10⁶ mm⁴',
        focus: 'Iy',
      },
    ],
    note: 'Schemat: przekrój kołowy rurowy D = 120 mm i d = 100 mm narysowany jako kwadrat z otworem; wymiary są rzeczywiste.',
    shape: 'circle',
  },
  animation: PipeSecondMomentAnimation,
  scenes: [
    {
      title: 'Model: pierścień i osie',
      narration:
        'Rura ma średnicę zewnętrzną D=120 mm i wewnętrzną d=100 mm. Osie x i y przechodzą przez środek koła, więc przekrój jest symetryczny, a oba momenty osiowe będą jednakowe.',
      caption: 'Pierścień o średnicach D i d; oś x jest pozioma, a oś y pionowa.',
      visual: 'section',
      focus: { metric: 'section' },
      formula: 'D=120\\ \\text{mm},\\quad d=100\\ \\text{mm}',
    },
    {
      title: 'Pasy poziome budują I_x',
      narration:
        'Dzielimy pierścień na poziome pasy elementarne. Wkład pasa wynosi y^2 dA, więc pasy położone daleko od osi x znaczą znacznie więcej niż te przy otworze.',
      caption: 'Pasy poziome; oś x wyznacza odległość y każdego pasa.',
      visual: 'section',
      focus: { metric: 'Ix' },
      formula: 'I_x=\\int_A y^2\\,dA',
    },
    {
      title: 'Odejmowanie otworu',
      narration:
        'Najpierw liczymy moment pełnego koła o średnicy D, a potem odejmujemy moment otworu o średnicy d. Odejmujemy czwarte potęgi średnic, a nie same średnice.',
      caption: 'Materiał otworu jest wycinany z pełnego koła.',
      visual: 'section',
      focus: { metric: 'Ix' },
      formula: 'I=\\frac{\\pi D^4}{64}-\\frac{\\pi d^4}{64}=\\frac{\\pi(D^4-d^4)}{64}',
    },
    {
      title: 'Pasy pionowe budują I_y',
      narration:
        'Analogicznie dzielimy przekrój na pionowe pasy. Teraz odległością od osi y jest x, więc każdy pas wnosi x^2 dA i buduje moment I_y.',
      caption: 'Pasy pionowe; oś y wyznacza odległość x każdego pasa.',
      visual: 'section',
      focus: { metric: 'Iy' },
      formula: 'I_y=\\int_A x^2\\,dA,\\qquad I_y=I_x',
    },
    {
      title: 'Rura i pręt pełny',
      narration:
        'Przy tej samej średnicy zewnętrznej rura ma mniej materiału, ale jej materiał leży przeciętnie dalej od osi. Dlatego zachowuje znaczną część momentu pełnego pręta przy mniejszym polu.',
      caption: 'Ten sam zarys zewnętrzny, inny rozkład materiału względem osi x.',
      visual: 'section',
      focus: { metric: 'section' },
      formula: 'I_s=\\frac{\\pi D^4}{64},\\qquad A=\\frac{\\pi(D^2-d^2)}{4}',
    },
  ],
} satisfies SolutionData
