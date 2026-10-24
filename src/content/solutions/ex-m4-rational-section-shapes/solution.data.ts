import type { SolutionData } from '../../model'

export default {
  id: 'ex-m4-rational-section-shapes',
  title: 'Racjonalne kształty przekrojów — przykład 1',
  duration: 7,
  given: ['D = 100 mm', 'd = 90 mm', 'c = 50 mm'],
  result:
    'Rura ma około 19,0% masy przekroju pełnego, zachowując około 34,4% jego I i W. Na jednostkę pola jest około 1,81 razy efektywniejsza, ale przy tej samej średnicy zewnętrznej ma mniejszą nośność bezwzględną. Porównanie „rura jest lepsza” ma sens tylko po ustaleniu kryterium: masa, średnica czy nośność.',
  figure: {
    kind: 'section',
    width: 100,
    height: 100,
    parts: [{ x: 0, y: 0, width: 100, height: 100, tone: 'light' }],
    holes: [{ cx: 50, cy: 50, r: 45, label: '∅90' }],
    centroid: { x: 50, y: 50 },
    values: [
      { label: 'D', value: '100 mm', focus: 'section', reveal: 0 },
      { label: 'd', value: '90 mm', focus: 'section', reveal: 0 },
      { label: 'c', value: '50 mm', focus: 'section', reveal: 0 },
      { label: 'A pełnego', value: '7854 mm²', focus: 'section' },
      { label: 'A rury', value: '1492 mm²', focus: 'section' },
      { label: 'I pełnego', value: '4,909·10⁶ mm⁴', focus: 'Ix' },
      { label: 'I rury', value: '1,688·10⁶ mm⁴', focus: 'Ix' },
      { label: 'W pełnego', value: '98,2·10³ mm³', focus: 'Ix' },
      { label: 'W rury', value: '33,8·10³ mm³', focus: 'Ix' },
      { label: 'I/A rury', value: '1131 mm²', focus: 'Iy' },
    ],
    note: 'Schemat: przekrój rurowy D = 100 mm i d = 90 mm narysowany jako kwadrat z otworem; wymiary są rzeczywiste.',
  },
  scenes: [
    {
      title: 'Dane i układ osi',
      narration:
        'Porównujemy pełne koło o średnicy 100 mm z rurą o średnicy zewnętrznej 100 mm i wewnętrznej 90 mm. Obie figury mają wspólny środek i wspólną odległość skrajnego włókna c=50 mm.',
      caption: 'Pełny przekrój i rura o tej samej średnicy zewnętrznej.',
      visual: 'section',
      focus: { metric: 'section' },
      formula: 'D=100\\ \\text{mm},\\quad d=90\\ \\text{mm},\\quad c=50\\ \\text{mm}',
    },
    {
      title: 'Pole przekroju',
      narration:
        'Pole pełnego koła: A_p=π· 100^2/4=7854 mm^2. Pole rury: A_r=π(100^2-90^2)/4=1492 mm^2, czyli około 19,0% pola pełnego.',
      caption: 'Pole rury stanowi około 19% pola przekroju pełnego.',
      visual: 'section',
      focus: { metric: 'section' },
      formula:
        'A_p=\\frac{\\pi\\cdot100^2}{4}=7854\\ \\text{mm}^2,\\quad A_r=\\frac{\\pi(100^2-90^2)}{4}=1492\\ \\text{mm}^2',
    },
    {
      title: 'Moment pełnego koła',
      narration: 'Moment pełnego koła: I_p=π· 100^4/64=4,909· 10^6 mm^4.',
      caption: 'Moment bezwładności pełnego koła.',
      visual: 'section',
      focus: { metric: 'Ix' },
      formula: 'I_p=\\pi\\cdot100^4/64=4{,}909\\cdot10^6\\ \\text{mm}^4',
    },
    {
      title: 'Moment rury',
      narration: 'Moment rury: I_r=π(100^4-90^4)/64=1,688· 10^6 mm^4, czyli około 34,4% momentu pełnego.',
      caption: 'Moment rury jest mniejszy, ale jej masa jest znacznie mniejsza.',
      visual: 'section',
      focus: { metric: 'Ix' },
      formula: 'I_r=\\pi(100^4-90^4)/64=1{,}688\\cdot10^6\\ \\text{mm}^4',
    },
    {
      title: 'Wskaźniki wytrzymałości',
      narration:
        'Wskaźniki: W_p=I_p/50=98,2· 10^3 mm^3 oraz W_r=I_r/50=33,8· 10^3 mm^3. Stosunek W jest równy stosunkowi I, bo c jest takie samo.',
      caption: 'Wskaźniki wytrzymałości przy tej samej odległości skrajnego włókna.',
      visual: 'section',
      focus: { metric: 'Ix' },
      formula: 'W_p=I_p/50=98{,}2\\cdot10^3\\ \\text{mm}^3,\\quad W_r=I_r/50=33{,}8\\cdot10^3\\ \\text{mm}^3',
    },
    {
      title: 'Efektywność materiału',
      narration:
        'Efektywność: I_p/A_p=625 mm^2 i I_r/A_r≈1131 mm^2, czyli rura ma około 1,81 razy większe I/A. Podobnie W_r/A_r≈22,6 mm wobec W_p/A_p=12,5 mm.',
      caption: 'Na jednostkę pola rura jest około 1,81 razy efektywniejsza.',
      visual: 'section',
      focus: { metric: 'Iy' },
      formula: 'I_p/A_p=625\\ \\text{mm}^2,\\quad I_r/A_r\\approx1131\\ \\text{mm}^2',
    },
    {
      title: 'Moment Iy',
      narration:
        'Przekrój jest kołowo symetryczny, więc moment względem osi pionowej jest taki sam jak względem poziomej: I_y=I_x=1,688·10⁶ mm⁴.',
      caption: 'Dla przekroju kołowego I_x = I_y.',
      visual: 'section',
      focus: { metric: 'Iy' },
      formula: 'I_y=I_x=\\pi(100^4-90^4)/64=1{,}688\\cdot10^6\\ \\text{mm}^4',
    },
    {
      title: 'Naprężenia przy zginaniu',
      narration:
        'Przy momencie 5 kN·m naprężenie w pręcie pełnym wynosi około 50,9 MPa, a w rurze około 148,1 MPa. Rura ma mniejszą nośność bezwzględną przy tej samej średnicy, ale lepiej wykorzystuje materiał.',
      caption: 'Mniejsza nośność bezwzględna nie oznacza gorszego wykorzystania materiału.',
      visual: 'section',
      focus: { metric: 'Ix' },
      formula:
        '\\sigma_p=\\frac{5\\cdot10^6}{98{,}2\\cdot10^3}\\approx50{,}9\\ \\text{MPa},\\quad \\sigma_r=\\frac{5\\cdot10^6}{33{,}8\\cdot10^3}\\approx148{,}1\\ \\text{MPa}',
    },
    {
      title: 'Interpretacja wyniku',
      narration:
        'Rura ma około 19,0% masy przekroju pełnego, zachowując około 34,4% jego I i W. Porównanie „rura jest lepsza” ma sens tylko po ustaleniu kryterium: masa, średnica czy nośność.',
      caption: 'Wybór przekroju zależy od przyjętego kryterium.',
      visual: 'section',
      focus: { metric: 'section' },
      formula:
        '\\boxed{A_r=1492\\ \\text{mm}^2,\\quad I_r=1{,}688\\cdot10^6\\ \\text{mm}^4,\\quad W_r=33{,}8\\cdot10^3\\ \\text{mm}^3}',
    },
  ],
} satisfies SolutionData
