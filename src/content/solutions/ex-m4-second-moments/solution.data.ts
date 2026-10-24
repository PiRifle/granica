import type { SolutionData } from '../../model'

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
    parts: [{ x: 0, y: 0, width: 120, height: 120, tone: 'light' }],
    holes: [{ cx: 60, cy: 60, r: 50, label: '∅100' }],
    centroid: { x: 60, y: 60 },
    values: [
      { label: 'D', value: '120 mm', focus: 'section', reveal: 0 },
      { label: 'd', value: '100 mm', focus: 'section', reveal: 0 },
      { label: 'A rury', value: '3455,75 mm²', focus: 'section' },
      { label: 'I rury', value: '5,27·10⁶ mm⁴', focus: 'Ix' },
      { label: 'I pełnego pręta', value: '10,179·10⁶ mm⁴', focus: 'Ix' },
      { label: 'i rury', value: '39,05 mm', focus: 'Ix' },
      { label: 'i pełnego pręta', value: '30 mm', focus: 'Ix' },
      { label: 'I_y rury', value: '5,27·10⁶ mm⁴', focus: 'Iy' },
    ],
    note: 'Schemat: przekrój kołowy rurowy D = 120 mm i d = 100 mm narysowany jako kwadrat z otworem; wymiary są rzeczywiste.',
  },
  scenes: [
    {
      title: 'Dane i układ osi',
      narration:
        'Rura ma średnicę zewnętrzną D=120 mm i wewnętrzną d=100 mm. Osie x i y przechodzą przez środek koła, więc momenty względem obu osi są jednakowe.',
      caption: 'Przekrój rurowy z osią centralną w środku koła.',
      visual: 'section',
      focus: { metric: 'section' },
      formula: 'D=120\\ \\text{mm},\\quad d=100\\ \\text{mm}',
    },
    {
      title: 'Pole przekroju rury',
      narration:
        'Pole rury: A=(π(120^2-100^2))/(4)=(π· 4400)/(4)≈ 3455,75 mm^2. Pole pręta pełnego wynosi 11 309,73 mm^2, czyli rura ma około 30,6% pola.',
      caption: 'Pole rury w porównaniu z pełnym prętem.',
      visual: 'section',
      focus: { metric: 'section' },
      formula: 'A=\\frac{\\pi(120^2-100^2)}{4}=\\frac{\\pi\\cdot4400}{4}\\approx3455{,}75\\ \\text{mm}^2',
    },
    {
      title: 'Moment bezwładności rury',
      narration:
        'Moment rury: I=(π(120^4-100^4))/(64)≈ 5,27· 10^6 mm^4. Różnica czwartych potęg 120^4-100^4=107 360 000 mm^4.',
      caption: 'Moment bezwładności względem osi centralnej.',
      visual: 'section',
      focus: { metric: 'Ix' },
      formula: 'I=\\frac{\\pi(120^4-100^4)}{64}\\approx5{,}27\\cdot10^6\\ \\text{mm}^4',
    },
    {
      title: 'Moment pełnego pręta',
      narration:
        'Moment pręta pełnego: I_s=(π· 120^4)/(64)≈ 10,179· 10^6 mm^4. Rura zachowuje około 51,8% momentu pełnego pręta.',
      caption: 'Moment pełnego pręta o tej samej średnicy zewnętrznej.',
      visual: 'section',
      focus: { metric: 'Ix' },
      formula: 'I_s=\\frac{\\pi\\cdot120^4}{64}\\approx10{,}179\\cdot10^6\\ \\text{mm}^4',
    },
    {
      title: 'Promień bezwładności rury',
      narration: 'Promień bezwładności rury: i=√(I/A)=√(5,270· 10^6/3455,75)≈ 39,05 mm.',
      caption: 'Promień bezwładności rury.',
      visual: 'section',
      focus: { metric: 'Ix' },
      formula: 'i=\\sqrt{I/A}=\\sqrt{5{,}270\\cdot10^6/3455{,}75}\\approx39{,}05\\ \\text{mm}',
    },
    {
      title: 'Promień bezwładności pręta',
      narration:
        'Dla pręta pełnego i_s=d/4=30 mm. Większy promień bezwładności rury potwierdza, że jej materiał jest przeciętnie dalej od osi.',
      caption: 'Dla pręta pełnego i_s=d/4=30 mm.',
      visual: 'section',
      focus: { metric: 'Ix' },
      formula: 'i_s=\\frac{d}{4}=\\frac{120}{4}=30\\ \\text{mm}',
    },
    {
      title: 'Moment Iy',
      narration:
        'Przekrój jest kołowo symetryczny, więc moment względem osi pionowej jest taki sam jak względem poziomej: I_y=I_x≈5,27·10⁶ mm⁴.',
      caption: 'Dla przekroju kołowego I_x = I_y.',
      visual: 'section',
      focus: { metric: 'Iy' },
      formula: 'I_y=I_x=\\frac{\\pi(120^4-100^4)}{64}\\approx5{,}27\\cdot10^6\\ \\text{mm}^4',
    },
    {
      title: 'Interpretacja wyniku',
      narration:
        'Kontrola jednostek: mm^4/mm^2=mm^2, a po pierwiastku otrzymujemy mm — zgodnie z definicją promienia bezwładności.',
      caption: 'Rura zużywa około 31% materiału i zachowuje około 52% sztywności zginania.',
      visual: 'section',
      focus: { metric: 'Ix' },
      formula:
        '\\boxed{A\\approx3455{,}75\\ \\text{mm}^2,\\quad I\\approx5{,}27\\cdot10^6\\ \\text{mm}^4,\\quad i\\approx39{,}05\\ \\text{mm}}',
    },
  ],
} satisfies SolutionData
