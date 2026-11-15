import { lazy } from 'react'
import type { SolutionData } from '../../model'
import type { SolutionScene } from '../../../types'
import { createShearBendingSolution } from '../../solution-factories/factory-shear-bending/factory'
import { meta } from './task'

const scenes: SolutionScene[] = [
  {
    title: '1. Model: sworzeń w sztywnej ścianie',
    narration:
      'Sworzeń jest osadzony poziomo w sztywnej ścianie o grubości h. Na swobodnym końcu działa siła P, a ściana utrzymuje sworzeń. Przy ścianie powstaje jedna płaszczyzna ścinania, przez którą przenoszona jest cała siła.',
    caption: 'Sztywna ściana o grubości h, poziomy sworzeń i jedna płaszczyzna ścinania przy ścianie.',
    visual: 'diagram',
    focus: { metric: 'model' },
    formula: 'P=100\\ \\mathrm{kN}\\qquad k_s=200\\ \\mathrm{MPa}\\qquad k_t=100\\ \\mathrm{MPa}',
  },
  {
    title: '2. Dane, jednostki i szukane',
    narration:
      'Siłę zamieniamy na niutony: 100 kN = 100 000 N. Naprężenia podane w megapaskalach są liczbowo równe wartościom w N/mm², więc nie trzeba ich przeliczać. Szukamy średnicy sworznia d oraz grubości ściany h, obu w milimetrach.',
    caption: 'Jedna spójna jednostka: niuton i milimetr; naprężenia w N/mm².',
    visual: 'diagram',
    focus: { metric: 'data' },
    formula: '1\\ \\mathrm{MPa}=1\\ \\mathrm{N/mm^2}\\qquad P=100\\cdot10^3\\ \\mathrm{N}',
  },
  {
    title: '3. Jedna płaszczyzna ścinania i pole przekroju',
    narration:
      'Przy połączeniu jednociętym cała siła P przenoszona jest przez jeden przekrój sworznia. Pole tego przekroju to pole koła o średnicy d. Naprężenie ścinające obliczamy jako siłę podzieloną przez to pole i porównujemy z k_s.',
    caption: 'Płaszczyzna ścinania przecina sworzeń prostopadle do jego osi; pole przekroju A = πd²/4.',
    visual: 'diagram',
    focus: { metric: 'shear' },
    formula: 'V=P\\qquad A=\\frac{\\pi d^2}{4}\\qquad \\tau=\\frac{P}{A}\\le k_s',
  },
  {
    title: '4. Dobór średnicy sworznia',
    narration:
      'Z warunku wytrzymałości na ścinanie wyznaczamy najmniejszą dopuszczalną średnicę. Pierwiastek daje 25,23 mm, więc przyjmujemy najbliższy większy wymiar handlowy, czyli 26 mm. Dopiero teraz pojawia się konkretna wartość d.',
    caption: 'Wymagane 25,23 mm zaokrąglamy w górę do d = 26 mm.',
    visual: 'diagram',
    focus: { metric: 'diameter' },
    formula:
      'd\\ge\\sqrt{\\frac{4P}{\\pi k_s}}=\\sqrt{\\frac{4\\cdot100\\,000}{\\pi\\cdot200}}=25{,}23\\ \\mathrm{mm}\\\\ d=26\\ \\mathrm{mm}',
  },
  {
    title: '5. Docisk i pole rzutu styku',
    narration:
      'Oprócz ścinania sworzeń naciska na ścianę w otworze. Pole docisku przyjmujemy jako iloczyn obwodu sworznia πd i grubości ściany h, czyli A1 = h·πd. Naprężenie dociskowe to siła P podzielona przez to pole; porównujemy je z k_t.',
    caption: 'Pole docisku A1 = h·πd rozwijamy myślowo w prostokąt o bokach πd i h.',
    visual: 'diagram',
    focus: { metric: 'bearing' },
    formula: 'A_1=h\\,\\pi d\\qquad \\sigma_b=\\frac{P}{A_1}\\le k_t',
  },
  {
    title: '6. Dobór grubości ściany',
    narration:
      'Podstawiamy przyjętą średnicę d = 26 mm i przekształcamy warunek docisku względem h. Otrzymujemy h ≥ 12,24 mm, więc przyjmujemy grubość ściany h = 13 mm. Średnica jest już ustalona, dlatego nie wracamy do warunku ścinania.',
    caption: 'Wymagane 12,24 mm zaokrąglamy w górę do h = 13 mm.',
    visual: 'diagram',
    focus: { metric: 'height' },
    formula:
      'h\\ge\\frac{P}{\\pi d\\,k_t}=\\frac{100\\,000}{\\pi\\cdot26\\cdot100}=12{,}24\\ \\mathrm{mm}\\\\ h=13\\ \\mathrm{mm}',
  },
  {
    title: '7. Znaki, jednostki i porównanie z wartościami dopuszczalnymi',
    narration:
      'Naprężenia ścinające i dociskowe są dodatnie — ich zwrot wynika z kierunku siły. Obie wartości są poniżej odpowiednich naprężeń dopuszczalnych: 188,35 MPa wobec 200 MPa oraz 94,17 MPa wobec 100 MPa. Jednostki są spójne: MPa = N/mm².',
    caption: 'Oba naprężenia mieszczą się pod granicami; wykorzystanie materiału wynosi około 94,2%.',
    visual: 'diagram',
    focus: { metric: 'compare' },
    formula:
      '\\tau=188{,}35\\ \\mathrm{MPa}<k_s=200\\ \\mathrm{MPa}\\\\ \\sigma_b=94{,}17\\ \\mathrm{MPa}<k_t=100\\ \\mathrm{MPa}',
  },
  {
    title: '8. Niezależna kontrola obu warunków',
    narration:
      'Dla przyjętych wymiarów pole przekroju sworznia wynosi 530,93 mm², a pole docisku 1061,86 mm². Ponowne obliczenie daje dokładnie 188,35 MPa i 94,17 MPa. Zapas względem obu granic to około 5,8%, więc wymiary d = 26 mm i h = 13 mm są poprawne.',
    caption: 'Kontrola: obie wartości naprężeń i zapasy potwierdzają dobrane wymiary.',
    visual: 'diagram',
    focus: { metric: 'check' },
    formula:
      'A=\\frac{\\pi\\cdot26^2}{4}=530{,}93\\ \\mathrm{mm^2}\\qquad A_1=\\pi\\cdot26\\cdot13=1061{,}86\\ \\mathrm{mm^2}\\\\ \\text{zapas}=\\frac{200-188{,}35}{200}\\approx5{,}8\\%',
  },
]

export default {
  ...createShearBendingSolution({ ...meta, scenes }),
  animation: lazy(() => import('./animation').then((module) => ({ default: module.PinDesignAnimation }))),
} satisfies SolutionData
