import type { SolutionData } from '../../model'
import { TensileTestExample2Animation } from './animation'

export default {
  id: 'ex-m3-tension-compression-test-2',
  title: 'Próba rozciągania i ściskania — przykład 2',
  duration: 9,
  given: ['b = 12,5 mm', 't = 4 mm', 'A₀ = 50 mm²', 'L₀ = 50 mm', 'N = 10 kN'],
  result:
    'Przy polu 50 mm² naprężenie wynosi 200 MPa i próbka pozostaje sprężysta. Ta sama siła na polu 25 mm² daje 400 MPa, czyli stan po przekroczeniu granicy plastyczności; liniowe ε = 0,002 nie opisuje już rzeczywistego odkształcenia. Krzywa σ–ε jest wspólna dla obu próbek, a wykres N–ΔL zależałby od pola.',
  animation: TensileTestExample2Animation,
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Płaska próbka stalowa ma szerokość b = 12,5 mm i grubość t = 4 mm. Pole przekroju wynosi A₀ = b·t = 50 mm², a długość pomiarowa L₀ = 50 mm. Działamy siłą rozciągającą N = 10 kN.',
      caption: 'Pole liczymy z wymiarów początkowych przekroju, przed obciążeniem.',
      visual: 'axial',
      focus: { metric: 'A' },
      formula: 'A_0=b\\cdot t=12{,}5\\cdot 4=50\\ \\text{mm}^2',
    },
    {
      title: 'Naprężenie w zakresie sprężystym',
      narration:
        'Naprężenie obliczamy jako σ = N/A₀ = 10 000/50 = 200 MPa. Punkt leży na prostym odcinku krzywej σ–ε, poniżej granicy plastyczności stali Re ≈ 235 MPa.',
      caption: 'Siła 10 kN na polu 50 mm² daje 200 MPa — to jeszcze zakres sprężysty.',
      visual: 'axial',
      focus: { metric: 'σ' },
      formula: '\\sigma=\\frac{10\\,000}{50}=200\\ \\text{MPa}',
    },
    {
      title: 'Odkształcenie i wydłużenie',
      narration:
        'Przy module E = 200 GPa odkształcenie wynosi ε = σ/E = 200/200 000 = 0,001. Wydłużenie bazy pomiarowej to ΔL = εL₀ = 0,001·50 = 0,05 mm.',
      caption: 'ε jest bezwymiarowe; wydłużenie zależy dodatkowo od długości pomiarowej.',
      visual: 'axial',
      focus: { metric: 'ε' },
      formula: '\\varepsilon=\\frac{200}{200\\,000}=0{,}001,\\qquad \\Delta L=0{,}001\\cdot 50=0{,}05\\ \\text{mm}',
    },
    {
      title: 'Przekroczenie granicy plastyczności',
      narration:
        'Gdyby ta sama siła działała na próbkę o polu 25 mm², naprężenie wzrosłoby do σ = 10 000/25 = 400 MPa. To przekracza Re ≈ 235 MPa, więc materiał płynie, a prawo Hooke’a przestaje obowiązywać.',
      caption: '400 MPa leży powyżej Re; nie wolno już podstawiać tej wartości do liniowego wzoru ε = σ/E.',
      visual: 'axial',
      focus: { metric: 'σ' },
      formula: '\\sigma=\\frac{10\\,000}{25}=400\\ \\text{MPa}',
    },
    {
      title: 'Wytrzymałość i przewężenie',
      narration:
        'Przy 400 MPa materiał jest blisko wytrzymałości Rm i zaczyna się przewężać. Liniowe ε = 400/200 000 = 0,002 jest tylko pozornym wynikiem: rzeczywiste odkształcenie jest znacznie większe i częściowo trwałe.',
      caption:
        'Czerwony punkt poza krzywą pokazuje błędne liniowe przewidywanie; fioletowy — rzeczywisty stan przy Rm.',
      visual: 'axial',
      focus: { metric: 'test' },
      formula: '\\frac{400}{200\\,000}=0{,}002\\quad\\text{(poza zakresem liniowym)}',
    },
    {
      title: 'Dlaczego σ–ε, a nie N–ΔL',
      narration:
        'Obie próbki wykonano z tej samej stali, więc mają tę samą krzywą σ–ε. Różnią się polem przekroju, więc przy tej samej sile pracują w różnych punktach tej krzywej. Wykres N–ΔL zależałby od wymiarów próbki, a σ–ε opisuje materiał.',
      caption: 'Wspólna krzywa materiału pozwala porównywać próbki o różnych wymiarach.',
      visual: 'axial',
      focus: { metric: 'compare' },
      formula: '\\sigma=\\frac{N}{A_0},\\qquad \\varepsilon=\\frac{\\Delta L}{L_0}',
    },
  ],
} satisfies SolutionData
