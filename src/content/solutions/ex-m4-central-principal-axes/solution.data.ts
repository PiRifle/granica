import type { SolutionData } from '../../model'
import { CentralPrincipalAxesAnimation } from './animation'

export default {
  id: 'ex-m4-central-principal-axes',
  title: 'Osie centralne i główne — przykład 1',
  animation: CentralPrincipalAxesAnimation,
  duration: 7,
  given: ['a = 120 mm', 'b = 80 mm', 'A = 4800 mm²'],
  result:
    'Dla trójkąta 120× 80 mm główne momenty wynoszą około I_1=4,44· 10^6 mm^4 i I_2=1,11· 10^6 mm^4. Oś największego momentu jest obrócona o około 64,9^circ od osi równoległej do przyprostokątnej a, a oś najmniejszego momentu jest do niej prostopadła.',
  figure: {
    kind: 'section',
    width: 120,
    height: 80,
    parts: [
      { x: 0, y: 0, width: 120, height: 16, tone: 'solid' },
      { x: 0, y: 16, width: 96, height: 16, tone: 'solid' },
      { x: 0, y: 32, width: 72, height: 16, tone: 'solid' },
      { x: 0, y: 48, width: 48, height: 16, tone: 'solid' },
      { x: 0, y: 64, width: 24, height: 16, tone: 'solid' },
    ],
    centroid: { x: 40, y: 26.67 },
    values: [
      { label: 'a', value: '120 mm', focus: 'section', reveal: 0 },
      { label: 'b', value: '80 mm', focus: 'section', reveal: 0 },
      { label: 'A', value: '4800 mm²', focus: 'section', reveal: 0 },
      { label: 'x_C', value: '40 mm', focus: 'centroid' },
      { label: 'y_C', value: '26,67 mm', focus: 'centroid' },
      { label: 'I_x', value: '1,707·10⁶ mm⁴', focus: 'Ix' },
      { label: 'I_y', value: '3,840·10⁶ mm⁴', focus: 'Iy' },
      { label: 'I_xy', value: '−1,280·10⁶ mm⁴', focus: 'Ix' },
      { label: 'I_1', value: '4,44·10⁶ mm⁴', focus: 'Ix' },
      { label: 'I_2', value: '1,11·10⁶ mm⁴', focus: 'Iy' },
      { label: 'θ_1', value: '64,9°', focus: 'Ix' },
    ],
    note: 'Schemat: trójkąt prostokątny 120 × 80 mm przybliżono pasami; centroid i momenty są rzeczywiste.',
  },
  scenes: [
    {
      title: 'Przekrój i dane',
      narration:
        'Przyjmujemy trójkąt prostokątny o przyprostokątnej a=120 mm wzdłuż osi x i b=80 mm wzdłuż osi y. Pole wynosi A=ab/2=4800 mm², a środek ciężkości leży w odległości a/3 od osi y i b/3 od osi x.',
      caption: 'Trójkąt prostokątny z przyprostokątnymi na osiach; początek w kącie prostym.',
      visual: 'section',
      focus: { metric: 'section' },
      formula: 'A=\\frac{ab}{2}=\\frac{120\\cdot80}{2}=4800\\ \\text{mm}^2',
    },
    {
      title: 'Centroid i osie centralne',
      narration:
        'Współrzędne środka ciężkości wynoszą x_C=a/3=40 mm oraz y_C=b/3≈26,67 mm. Przez ten punkt prowadzimy centralne osie x i y, równoległe do przyprostokątnych.',
      caption: 'Centroid trójkąta prostokątnego i para osi centralnych.',
      visual: 'section',
      focus: { metric: 'centroid' },
      formula: '\\bar{x}=\\frac{a}{3}=40\\ \\text{mm},\\quad \\bar{y}=\\frac{b}{3}\\approx26{,}67\\ \\text{mm}',
    },
    {
      title: 'Momenty względem osi centralnych',
      narration:
        'Momenty względem osi centralnych równoległych do przyprostokątnych: I_x=ab^3/36=120·80^3/36≈1,707·10^6 mm^4 oraz I_y=ba^3/36=80·120^3/36=3,840·10^6 mm^4. Większa wartość I_y wynika z większego wymiaru poziomego.',
      caption: 'Momenty względem centralnych osi równoległych do przyprostokątnych.',
      visual: 'section',
      focus: { metric: 'moments' },
      formula:
        'I_x=\\frac{ab^3}{36}\\approx1{,}707\\cdot10^6\\ \\text{mm}^4,\\quad I_y=\\frac{ba^3}{36}=3{,}840\\cdot10^6\\ \\text{mm}^4',
    },
    {
      title: 'Moment dewiacyjny',
      narration:
        'Moment dewiacyjny względem osi przyprostokątnych wynosi I_xy=a^2b^2/24. Po przejściu do środka ciężkości odejmujemy Axy i otrzymujemy I_xy,c=-a^2b^2/72=-1,280·10^6 mm^4. Osie są więc centralne, ale nie główne.',
      caption: 'Znak ujemny odzwierciedla rozmieszczenie pola względem środka ciężkości.',
      visual: 'section',
      focus: { metric: 'Ixy' },
      formula: 'I_{xy,c}=-\\frac{a^2b^2}{72}=-\\frac{120^2\\cdot80^2}{72}=-1{,}280\\cdot10^6\\ \\text{mm}^4',
    },
    {
      title: 'Obrót do osi głównych',
      narration:
        'Szukamy kąta, przy którym moment dewiacyjny znika: tan2θ=-2I_xy/(I_x-I_y)=-2·(-1,280)/(1,707-3,840)≈-1,20. Stąd 2θ≈129,8°, czyli θ_1≈64,9°. Osie obracają się od położenia wyjściowego do kierunków głównych.',
      caption: 'Obrót układu osi o kąt główny 64,9°; w końcowym położeniu I_xy=0.',
      visual: 'section',
      focus: { metric: 'rotate' },
      formula: '\\tan2\\theta=-\\frac{2I_{xy}}{I_x-I_y}=-\\frac{2\\cdot(-1{,}280)}{1{,}707-3{,}840}\\approx-1{,}20',
    },
    {
      title: 'Osie główne i wynik',
      narration:
        'W osiach głównych I_1=4,44·10^6 mm^4 oraz I_2=1,11·10^6 mm^4. Oś największego momentu jest obrócona o około 64,9° od osi x, a oś najmniejszego momentu jest do niej prostopadła. Kontrola: I_1+I_2=I_x+I_y=5,55·10^6 mm^4.',
      caption: 'Osie główne są prostopadłe; odpowiadają im skrajne momenty bezwładności.',
      visual: 'section',
      focus: { metric: 'result' },
      formula:
        '\\boxed{I_1\\approx4{,}44\\cdot10^6\\ \\text{mm}^4,\\quad I_2\\approx1{,}11\\cdot10^6\\ \\text{mm}^4,\\quad \\theta_1\\approx64{,}9^\\circ}',
    },
  ],
} satisfies SolutionData
