import type { SolutionData } from '../../model'
import { StressTensorExample2Animation } from './animation'

export default {
  id: 'ex-stress-state-tensor-2',
  title: 'Tensor naprężenia: mapa sił w punkcie — przykład 2',
  duration: 7,
  given: ['σ_x = σ_y = σ_z = -50 MPa'],
  result:
    'Warto zauważyć, że w tym stanie naprężenia normalne są ujemne na każdej płaszczyźnie. Nie oznacza to, że materiał jest „ściskany tylko w jednym kierunku”. Ściskanie jest jednakowe we wszystkich kierunkach, więc każda ścianka jest ściskana tak samo. Taki stan odpowiada ciśnieniu hydrostatycznemu i jest dobrym testem konwencji znaków: jeśli w którymś rachunku pojawi się dodatnie naprężenie normalne, gdzieś zgubiono minus.',
  animation: StressTensorExample2Animation,
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Rozważmy stan hydrostatyczny: σx = σy = σz = −50 MPa, a wszystkie naprężenia styczne są zerowe. Na każdej ściance działa więc jednakowe ściskanie, skierowane do wnętrza materiału.',
      caption: 'Hydrostatyczne ściskanie w trzech prostopadłych kierunkach.',
      visual: 'cube',
      focus: { metric: 'model' },
      formula: '\\sigma_x=\\sigma_y=\\sigma_z=-50\\ \\text{MPa},\\quad \\tau_{xy}=\\tau_{yz}=\\tau_{zx}=0',
    },
    {
      title: 'Tensor naprężenia',
      narration:
        'Macierz jest więc mnożeniem macierzy jednostkowej przez −50 MPa. Na przekątnej stoją trzy równe wartości, a poza przekątną same zera. Taki tensor nie wyróżnia żadnego kierunku.',
      caption: 'Tensor jest wielokrotnością macierzy jednostkowej: σ = −50·I.',
      visual: 'cube',
      focus: { metric: 'tensor' },
      formula:
        '\\boldsymbol{\\sigma}=\\begin{bmatrix}-50&0&0\\\\0&-50&0\\\\0&0&-50\\end{bmatrix}\\ \\text{MPa}=-50\\,\\mathbf{I}\\ \\text{MPa}',
    },
    {
      title: 'Dowolna płaszczyzna',
      narration:
        'Dla dowolnej normalnej n trakcja wynosi T = −50n. Wektor trakcji jest zawsze prostopadły do płaszczyzny, a jego zwrot jest przeciwny do normalnej.',
      caption: 'Normalna n wyznacza płaszczyznę, a trakcja jest do niej równoległa.',
      visual: 'cube',
      focus: { metric: 'plane' },
      formula: '\\mathbf{n}=(0{,}6;\\ 0{,}8;\\ 0),\\qquad \\mathbf{T}=-50\\,\\mathbf{n}\\ \\text{MPa}',
    },
    {
      title: 'Trakcja na płaszczyźnie',
      narration:
        'Trakcja jest równoległa do normalnej, więc nie ma składowej stycznej. Niezależnie od nachylenia płaszczyzny wektor T leży na jej normalnej i jest skierowany do wnętrza materiału.',
      caption: 'Trakcja i normalna leżą na jednej prostej, ale mają przeciwne zwroty.',
      visual: 'cube',
      focus: { metric: 'traction' },
      formula: '\\mathbf{T}=-50\\,\\mathbf{n}\\quad\\Rightarrow\\quad \\mathbf{T}\\parallel\\mathbf{n}',
    },
    {
      title: 'Naprężenie normalne i styczne',
      narration:
        'Naprężenie normalne na każdej płaszczyźnie wynosi −50 MPa, a styczne jest zerowe. W tym stanie każda płaszczyzna jest płaszczyzną główną, bo na żadnej nie pojawia się ścinanie.',
      caption: 'σn = −50 MPa i τ = 0 na każdej płaszczyźnie.',
      visual: 'cube',
      focus: { metric: 'components' },
      formula: '\\sigma_n=-50\\ \\text{MPa},\\qquad \\tau=0\\ \\text{MPa}',
    },
    {
      title: 'Sprawdzenie rachunkowe',
      narration:
        'Dla n = (0,6; 0,8; 0) trakcja to (−30; −40; 0) MPa. Jej długość wynosi 50 MPa, a rzut na normalną daje −30·0,6 − 40·0,8 = −18 − 32 = −50 MPa. Część styczna jest więc zerowa.',
      caption: 'Trójkąt 30–40–50 potwierdza, że cała trakcja jest normalna do płaszczyzny.',
      visual: 'cube',
      focus: { metric: 'check' },
      formula:
        '\\mathbf{T}=(-30;-40;0)\\ \\text{MPa},\\qquad |\\mathbf{T}|=50\\ \\text{MPa},\\qquad \\sigma_n=-50\\ \\text{MPa}',
    },
  ],
} satisfies SolutionData
