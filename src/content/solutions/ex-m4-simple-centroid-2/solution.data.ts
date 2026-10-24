import type { SolutionData } from '../../model'

export default {
  id: 'ex-m4-simple-centroid-2',
  title: 'Środek ciężkości figur prostych — przykład 2',
  duration: 7,
  given: ['r = 60 mm'],
  result:
    'Warto zauważyć, że nie jest to r/2=40 mm ani r/3≈ 26,7 mm. Wzór 4r/(3π) jest charakterystyczny dla figur ograniczonych łukiem okręgu i łatwo go pomylić z innymi „środkami” ćwiartki.',
  figure: {
    kind: 'section',
    width: 120,
    height: 60,
    parts: [
      { x: 0.05, y: 0, width: 119.9, height: 5, tone: 'light' },
      { x: 0.47, y: 5, width: 119.06, height: 5, tone: 'light' },
      { x: 1.32, y: 10, width: 117.36, height: 5, tone: 'light' },
      { x: 2.59, y: 15, width: 114.82, height: 5, tone: 'light' },
      { x: 4.35, y: 20, width: 111.3, height: 5, tone: 'light' },
      { x: 6.67, y: 25, width: 106.66, height: 5, tone: 'light' },
      { x: 9.56, y: 30, width: 100.88, height: 5, tone: 'light' },
      { x: 13.17, y: 35, width: 93.66, height: 5, tone: 'light' },
      { x: 17.63, y: 40, width: 84.74, height: 5, tone: 'light' },
      { x: 23.35, y: 45, width: 73.3, height: 5, tone: 'light' },
      { x: 30.95, y: 50, width: 58.1, height: 5, tone: 'light' },
      { x: 42.86, y: 55, width: 34.28, height: 5, tone: 'light' },
    ],
    centroid: { x: 60, y: 25.46 },
    values: [
      { label: 'r', value: '60 mm', focus: 'section', reveal: 0 },
      { label: 'A półkola', value: '5655 mm²', focus: 'section' },
      { label: 'x_C', value: '60 mm', focus: 'centroid' },
      { label: 'y_C', value: '25,46 mm', focus: 'centroid' },
      { label: 'S_x', value: '144 000 mm³', focus: 'centroid' },
      { label: 'A ćwiartki', value: '5027 mm²', focus: 'section' },
      { label: 'x_C = y_C ćwiartki', value: '33,95 mm', focus: 'centroid' },
      { label: 'I_x półkola', value: '5,09·10⁶ mm⁴', focus: 'Ix' },
      { label: 'I_y półkola', value: '5,09·10⁶ mm⁴', focus: 'Iy' },
    ],
    note: 'Schemat: półkole o promieniu 60 mm przybliżono poziomymi pasami; wymiary i centroid są rzeczywiste.',
  },
  scenes: [
    {
      title: 'Dane i układ osi',
      narration:
        'Rozważmy półkole o promieniu r=60 mm, którego średnica leży na osi x, a łuk jest skierowany w górę. Oś y jest osią symetrii, więc współrzędna pozioma środka jest znana bez rachunku.',
      caption: 'Półkole o promieniu 60 mm z podstawą na osi x; oś pionowa jest osią symetrii.',
      visual: 'section',
      focus: { metric: 'section' },
      formula: 'r=60\\ \\text{mm},\\quad x_C=60\\ \\text{mm}',
    },
    {
      title: 'Pole półkola',
      narration:
        'Pole wynosi A=(π r^2)/(2)=(π· 60^2)/(2)≈ 5655 mm^2. Współrzędna pozioma jest zerowa względem środka średnicy z symetrii.',
      caption: 'Pole półkola o promieniu 60 mm.',
      visual: 'section',
      focus: { metric: 'section' },
      formula: 'A=\\frac{\\pi r^2}{2}=\\frac{\\pi\\cdot60^2}{2}\\approx5655\\ \\text{mm}^2',
    },
    {
      title: 'Moment statyczny względem średnicy',
      narration:
        'Moment statyczny względem osi x obliczamy, dzieląc figurę na pionowe paski: dla wysokości y szerokość paska to 2√(r^2-y^2).',
      caption: 'Całkowanie po wysokości półkola daje S_x=2r³/3.',
      visual: 'section',
      focus: { metric: 'centroid' },
      formula: 'S_x=\\int_0^r y\\cdot 2\\sqrt{r^2-y^2}\\,dy=\\frac{2}{3}r^3=144\\,000\\ \\text{mm}^3',
    },
    {
      title: 'Położenie środka ciężkości',
      narration: 'Po podzieleniu przez pole otrzymujemy y=4r/(3π). Dla r=60 mm daje to około 25,46 mm.',
      caption: 'Po podzieleniu przez pole otrzymujemy y=4r/(3π).',
      visual: 'section',
      focus: { metric: 'centroid' },
      formula:
        '\\bar{y}=\\frac{\\frac{2}{3}r^3}{\\frac{\\pi r^2}{2}}=\\frac{4r}{3\\pi}\\approx\\frac{4\\cdot 60}{3\\pi}\\approx 25{,}46\\ \\text{mm}',
    },
    {
      title: 'Kontrola położenia',
      narration:
        'Wynik jest mniejszy od r/2=30 mm, ponieważ szerokie partie półkola leżą blisko średnicy. To dobra kontrola jakościowa: środek powinien być przesunięty w stronę „cięższej” podstawy, a nie w stronę wierzchołka łuku.',
      caption: 'Wynik jest mniejszy od r/2=30 mm, ponieważ szerokie partie półkola leżą blisko średnicy.',
      visual: 'section',
      focus: { metric: 'centroid' },
      formula: 'r/2=30\\ \\text{mm},\\quad \\bar{y}=25{,}46\\ \\text{mm}',
    },
    {
      title: 'Ćwiartka koła',
      narration:
        'Dla ćwiartki koła o promieniu r=80 mm położonej w pierwszej ćwiartce układu współrzędnych sytuacja jest symetryczna względem zamiany osi. Pole wynosi A=(π r^2)/(4)≈ 5027 mm^2, a obie współrzędne są równe.',
      caption: 'Ćwiartka koła o promieniu 80 mm ma jednakowe współrzędne środka.',
      visual: 'section',
      focus: { metric: 'centroid' },
      formula:
        'A=\\frac{\\pi r^2}{4}\\approx5027\\ \\text{mm}^2,\\quad \\bar{x}=\\bar{y}=\\frac{4r}{3\\pi}=\\frac{4\\cdot80}{3\\pi}\\approx33{,}95\\ \\text{mm}',
    },
    {
      title: 'Moment bezwładności Ix',
      narration:
        'Względem osi średnicy moment półkola wynosi I_x=πr^4/8. Po przeniesieniu do osi centralnej trzeba jeszcze odjąć składnik Steinera A y_C^2.',
      caption: 'Moment względem średnicy jest większy od momentu centralnego.',
      visual: 'section',
      focus: { metric: 'Ix' },
      formula: 'I_x=\\frac{\\pi r^4}{8}=\\frac{\\pi\\cdot60^4}{8}\\approx5{,}09\\cdot10^6\\ \\text{mm}^4',
    },
    {
      title: 'Moment bezwładności Iy',
      narration:
        'Oś y jest osią symetrii, więc moment względem niej wynosi również πr^4/8. Dla półkola oba momenty względem osi przez środek średnicy są więc jednakowe.',
      caption: 'Symetria sprawia, że I_x = I_y względem osi przechodzących przez początek układu.',
      visual: 'section',
      focus: { metric: 'Iy' },
      formula: 'I_y=\\frac{\\pi r^4}{8}=\\frac{\\pi\\cdot60^4}{8}\\approx5{,}09\\cdot10^6\\ \\text{mm}^4',
    },
    {
      title: 'Interpretacja wyniku',
      narration:
        'Warto zauważyć, że nie jest to r/2=40 mm ani r/3≈ 26,7 mm. Wzór 4r/(3π) jest charakterystyczny dla figur ograniczonych łukiem okręgu i łatwo go pomylić z innymi „środkami” ćwiartki.',
      caption: 'Centroid półkola i ćwiartki oraz momenty bezwładności względem osi symetrii.',
      visual: 'section',
      focus: { metric: 'centroid' },
      formula:
        '\\boxed{\\bar{y}=\\frac{4r}{3\\pi}\\approx25{,}46\\ \\text{mm},\\quad \\bar{x}=\\bar{y}=\\frac{4\\cdot80}{3\\pi}\\approx33{,}95\\ \\text{mm}}',
    },
  ],
} satisfies SolutionData
