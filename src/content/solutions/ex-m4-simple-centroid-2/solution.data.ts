import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-m4-simple-centroid-2',
  title: 'Środek ciężkości figur prostych — przykład 2',
  duration: 7,
  given: ['r = 60 mm'],
  result:
    'Środek ciężkości półkola leży na osi symetrii w odległości 4r/(3π)≈25,46 mm od średnicy; nie jest to r/2=30 mm ani r/3=20 mm. Dla ćwiartki koła o promieniu 80 mm obie współrzędne wynoszą 4r/(3π)≈33,95 mm.',
  animation: lazy(() =>
    import('./animation').then((module) => ({ default: module.SimpleCentroidSemicircleAnimation })),
  ),
  scenes: [
    {
      title: 'Dane i układ osi',
      narration:
        'Półkole ma promień r=60 mm, a jego średnica leży na osi x. Początek układu przyjmujemy w środku średnicy, więc łuk jest skierowany w górę, a oś y jest pionowa.',
      caption: 'Półkole o promieniu 60 mm i średnicy 120 mm; początek układu w środku średnicy.',
      visual: 'section',
      focus: { metric: 'axes' },
      formula: 'r=60\\ \\text{mm},\\qquad d=2r=120\\ \\text{mm}',
    },
    {
      title: 'Oś symetrii',
      narration:
        'Oś y jest osią symetrii półkola. Każdy element po lewej stronie ma odpowiednik po prawej, więc moment względem osi y znika, a współrzędna pozioma środka jest równa zeru.',
      caption: 'Pary symetrycznych punktów i pionowa oś symetrii wyznaczają x_C=0.',
      visual: 'section',
      focus: { metric: 'symmetry' },
      formula: '\\bar{x}=0\\ \\text{mm}',
    },
    {
      title: 'Pole i pasy pionowe',
      narration:
        'Pole półkola wynosi A=πr²/2. Dzielimy figurę na pionowe pasy: na wysokości y szerokość pasa to 2√(r²−y²).',
      caption: 'Coraz węższe pasy ku górze; zaznaczony pas ma szerokość 2√(r²−y²).',
      visual: 'section',
      focus: { metric: 'strips' },
      formula:
        'A=\\frac{\\pi r^2}{2}=\\frac{\\pi\\cdot60^2}{2}\\approx5655\\ \\text{mm}^2,\\qquad b(y)=2\\sqrt{r^2-y^2}',
    },
    {
      title: 'Momenty pasów',
      narration:
        'Każdy pas ma środek na osi symetrii. Ważona suma momentów względem średnicy daje S_x=2r³/3, a podzielenie przez pole prowadzi do środka ciężkości.',
      caption: 'Środki pasów leżą na osi symetrii; ich wypadkowa przesuwa się do C.',
      visual: 'section',
      focus: { metric: 'parts' },
      formula: 'S_x=\\int_0^r y\\cdot2\\sqrt{r^2-y^2}\\,dy=\\frac{2}{3}r^3=144\\,000\\ \\text{mm}^3',
    },
    {
      title: 'Wynik i osie centralne',
      narration:
        'Po podzieleniu przez pole otrzymujemy y=4r/(3π)≈25,46 mm. Wynik jest mniejszy od r/2=30 mm, bo szerokie partie półkola leżą blisko średnicy. Względem osi przez środek średnicy I_x=I_y=πr⁴/8.',
      caption: 'Centroid leży poniżej połowy promienia; osie centralne przechodzą przez C.',
      visual: 'section',
      focus: { metric: 'centroid' },
      formula:
        '\\bar{y}=\\frac{4r}{3\\pi}=\\frac{4\\cdot60}{3\\pi}\\approx25{,}46\\ \\text{mm},\\qquad I_x=I_y=\\frac{\\pi r^4}{8}\\approx5{,}09\\cdot10^6\\ \\text{mm}^4',
    },
    {
      title: 'Wariant: ćwiartka koła',
      narration:
        'Dla ćwiartki koła o promieniu r=80 mm położonej w pierwszej ćwiartce układu figura jest symetryczna względem przekątnej. Pole wynosi A=πr²/4, a obie współrzędne środka są równe 4r/(3π)≈33,95 mm.',
      caption: 'Ćwiartka koła o promieniu 80 mm; oś symetrii jest przekątną układu.',
      visual: 'section',
      focus: { metric: 'quarter' },
      formula:
        'A=\\frac{\\pi r^2}{4}\\approx5027\\ \\text{mm}^2,\\qquad \\bar{x}=\\bar{y}=\\frac{4r}{3\\pi}=\\frac{4\\cdot80}{3\\pi}\\approx33{,}95\\ \\text{mm}',
    },
  ],
} satisfies SolutionData
