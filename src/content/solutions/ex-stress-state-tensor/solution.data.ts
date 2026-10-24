import type { SolutionData } from '../../model'
import { StressTensorExample1Animation } from './animation'

export default {
  id: 'ex-stress-state-tensor',
  title: 'Tensor naprężenia: mapa sił w punkcie — przykład 1',
  duration: 7,
  given: ['σ_x = 120 MPa', 'σ_y = 40 MPa', 'τ_xy = 30 MPa'],
  result:
    'Trakcja wynosi około (118,9; 46,0; 0) MPa, naprężenie normalne około 126,0 MPa, a styczne około 19,6 MPa. Jednostka MPa oznacza 1 N/mm^2, więc wynik jest spójny z danymi. Kontrola σ_n^2+τ^2≈|T|^2 potwierdza rachunek.',
  animation: StressTensorExample1Animation,
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'W punkcie płyty panuje płaski stan naprężenia. Na ścianie prostopadłej do x działa naprężenie normalne σx = 120 MPa, na ścianie prostopadłej do y — σy = 40 MPa, a w płaszczyźnie ściany x działa styczne τxy = 30 MPa. Pozostałe składowe są zerowe.',
      caption: 'Kostka w punkcie: dwa naprężenia normalne i jedno styczne w płaszczyźnie xy.',
      visual: 'cube',
      focus: { metric: 'model' },
      formula: '\\sigma_x=120\\ \\text{MPa},\\quad \\sigma_y=40\\ \\text{MPa},\\quad \\tau_{xy}=30\\ \\text{MPa}',
    },
    {
      title: 'Składanie tensora',
      narration:
        'Składowe trafiają do macierzy na swoje miejsca: σx i σy na przekątną, τxy do pól (x,y) i (y,x). Macierz jest symetryczna, bo τxy = τyx, a wiersz i kolumna z są zerowe.',
      caption: 'Tensor powstaje z uporządkowania składowych na trzech prostopadłych ściankach.',
      visual: 'cube',
      focus: { metric: 'tensor' },
      formula:
        '\\boldsymbol{\\sigma}=\\begin{bmatrix}\\sigma_x&\\tau_{xy}&\\tau_{xz}\\\\\\tau_{xy}&\\sigma_y&\\tau_{yz}\\\\\\tau_{xz}&\\tau_{yz}&\\sigma_z\\end{bmatrix}=\\begin{bmatrix}120&30&0\\\\30&40&0\\\\0&0&0\\end{bmatrix}\\ \\text{MPa}',
    },
    {
      title: 'Płaszczyzna i normalna',
      narration:
        'Płaszczyzna jest nachylona tak, że jej normalna tworzy z osią x kąt 30°. Składowe normalnej wynoszą cos 30° ≈ 0,8660 oraz sin 30° = 0,5. Wektor normalnej jest jednostkowy.',
      caption: 'Normalna n = (cos 30°, sin 30°, 0) wskazuje kierunek płaszczyzny przekroju.',
      visual: 'cube',
      focus: { metric: 'plane' },
      formula: '\\mathbf{n}=(\\cos30^\\circ,\\ \\sin30^\\circ,\\ 0)\\approx(0{,}8660;\\ 0{,}5;\\ 0)',
    },
    {
      title: 'Trakcja i jej rozkład',
      narration:
        'Trakcja na tej płaszczyźnie ma składowe Tx = 120·0,8660 + 30·0,5 = 118,92 MPa oraz Ty = 30·0,8660 + 40·0,5 = 45,98 MPa. Rzut na normalną daje σn ≈ 125,98 MPa, a część styczna τ ≈ 19,6 MPa.',
      caption: 'Trakcja T rozkłada się na składową normalną σn i styczną τ.',
      visual: 'cube',
      focus: { metric: 'traction' },
      formula:
        'T_x=118{,}92\\ \\text{MPa},\\quad T_y=45{,}98\\ \\text{MPa},\\quad \\sigma_n=125{,}98\\ \\text{MPa},\\quad \\tau=19{,}6\\ \\text{MPa}',
    },
    {
      title: 'Kontrola',
      narration:
        'Sprawdzenie: σn² + τ² = 125,98² + 19,6² ≈ 16 256 MPa², czyli tyle samo co |T|² = 118,92² + 45,98². Długość trakcji zgadza się z jej rozkładem, więc rachunek jest poprawny.',
      caption: 'Trójkąt prostokątny: σn i τ są przyprostokątnymi, a |T| — przeciwprostokątną.',
      visual: 'cube',
      focus: { metric: 'check' },
      formula: '\\sigma_n^2+\\tau^2\\approx125{,}98^2+19{,}6^2\\approx16\\,256=|T|^2',
    },
  ],
} satisfies SolutionData
