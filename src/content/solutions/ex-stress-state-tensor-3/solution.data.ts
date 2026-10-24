import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-stress-state-tensor-3',
  title: 'Tensor naprężenia: mapa sił w punkcie — przykład 3',
  duration: 7,
  given: ['T na ścianie x: (80, 25, 0) MPa', 'T na ścianie y: (25, -20, 0) MPa'],
  result:
    "Zauważ, że do odtworzenia tensora wystarczyły dwie trakcje, bo stan był płaski i trzecia kolumna była zerowa. W ogólnym przypadku potrzeba trzech trakcji na trzech niewspółpłaszczyznowych płaszczyznach. To odwrotność wzoru Cauchy'ego: zamiast mnożyć tensor przez normalną, składamy tensor z odpowiedzi materiału na trzy niezależne kierunki.",
  animation: lazy(() => import('./animation').then((module) => ({ default: module.StressTensorExample3Animation }))),
  scenes: [
    {
      title: 'Dane i trakcje',
      narration:
        'Z pomiarów znamy trakcje na dwóch prostopadłych ściankach. Na ścianie prostopadłej do x trakcja wynosi (80; 25; 0) MPa, a na ścianie prostopadłej do y — (25; −20; 0) MPa. Każda trakcja ma część normalną i styczną.',
      caption: 'Dwie trakcje na prostopadłych ściankach są danymi wejściowymi.',
      visual: 'cube',
      focus: { metric: 'model' },
      formula:
        '\\mathbf{T}^{(x)}=(80;\\ 25;\\ 0)\\ \\text{MPa},\\qquad \\mathbf{T}^{(y)}=(25;\\ -20;\\ 0)\\ \\text{MPa}',
    },
    {
      title: 'Składanie tensora',
      narration:
        'Pierwsza kolumna tensora to trakcja na ścianie x, czyli (80; 25; 0). Druga kolumna to trakcja na ścianie y, czyli (25; −20; 0). Trzecia kolumna jest zerowa. Symetria jest spełniona, bo w obu trakcjach składowa mieszana wynosi 25 MPa.',
      caption: 'Tensor ma σx = 80 MPa, σy = −20 MPa i τxy = 25 MPa.',
      visual: 'cube',
      focus: { metric: 'tensor' },
      formula:
        '\\boldsymbol{\\sigma}=\\begin{bmatrix}80&25&0\\\\25&-20&0\\\\0&0&0\\end{bmatrix}\\ \\text{MPa},\\qquad \\tau_{xy}=\\tau_{yx}=25\\ \\text{MPa}',
    },
    {
      title: 'Płaszczyzna i normalna',
      narration:
        'Wybieramy płaszczyznę o normalnej n = (0,6; 0,8; 0). Wektor jest jednostkowy, bo 0,6² + 0,8² = 1. Kąt normalnej względem osi x wynosi około 53,1°.',
      caption: 'Normalna n = (0,6; 0,8; 0) wyznacza płaszczyznę sprawdzenia.',
      visual: 'cube',
      focus: { metric: 'plane' },
      formula: '\\mathbf{n}=(0{,}6;\\ 0{,}8;\\ 0),\\qquad 0{,}6^2+0{,}8^2=1',
    },
    {
      title: 'Trakcja na płaszczyźnie',
      narration:
        'Z pełnego tensora obliczamy trakcję: Tx = 80·0,6 + 25·0,8 = 48 + 20 = 68 MPa oraz Ty = 25·0,6 − 20·0,8 = 15 − 16 = −1 MPa. Trakcja jest więc prawie pozioma, mimo że normalna jest nachylona pod dużym kątem.',
      caption: 'Trakcja dla normalnej n = (0,6; 0,8; 0) wynosi (68; −1; 0) MPa.',
      visual: 'cube',
      focus: { metric: 'traction' },
      formula: 'T_x=68\\ \\text{MPa},\\qquad T_y=-1\\ \\text{MPa}',
    },
    {
      title: 'Naprężenie normalne i styczne',
      narration:
        'Naprężenie normalne wynosi σn = 68·0,6 − 1·0,8 = 40,8 − 0,8 = 40 MPa. Długość trakcji podniesiona do kwadratu to 68² + 1² = 4625, więc τ = √(4625 − 1600) = √3025 = 55 MPa. Część styczna jest duża.',
      caption: 'Trakcja rozkłada się na σn = 40 MPa i τ = 55 MPa.',
      visual: 'cube',
      focus: { metric: 'decomposition' },
      formula:
        '\\sigma_n=68\\cdot0{,}6-1\\cdot0{,}8=40\\ \\text{MPa},\\qquad \\tau=\\sqrt{68^2+1^2-40^2}=55\\ \\text{MPa}',
    },
    {
      title: 'Dlaczego potrzebny jest tensor',
      narration:
        'Gdybyśmy znali tylko σx = 80 MPa, nie opisalibyśmy poprawnie tej płaszczyzny: rzeczywiste naprężenie normalne wynosi 40 MPa, a styczne aż 55 MPa. Tensor, a nie jedna składowa, jest pełnym opisem stanu.',
      caption: 'σx = 80 MPa to nie to samo co σn = 40 MPa; brakuje informacji o ścinaniu.',
      visual: 'cube',
      focus: { metric: 'check' },
      formula: '\\sigma_x=80\\ \\text{MPa}\\neq\\sigma_n=40\\ \\text{MPa},\\qquad \\tau=55\\ \\text{MPa}',
    },
  ],
} satisfies SolutionData
