import type { SolutionData } from '../../model'
import { TensileTestExample3Animation } from './animation'

export default {
  id: 'ex-m3-tension-compression-test-3',
  title: 'Próba rozciągania i ściskania — przykład 3',
  duration: 9,
  given: ['A = 40 mm²', 'ε = 800·10⁻⁶', 'E = 200 GPa', 'L₀ = 80 mm'],
  result:
    'Naprężenie wynosi 160 MPa, siła osiowa 6,4 kN, a wydłużenie bazy 0,064 mm. Ponieważ 160 MPa < Re ≈ 235 MPa, zastosowanie liniowego prawa Hooke’a jest uzasadnione.',
  animation: TensileTestExample3Animation,
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Tensometr na stalowym pręcie o polu A = 40 mm² wskazał odkształcenie ε = 800·10⁻⁶ = 0,0008. Moduł Younga stali przyjmujemy E = 200 GPa, a baza pomiarowa ma L₀ = 80 mm. Szukamy siły osiowej i wydłużenia.',
      caption: 'Odczyt tensometru jest odkształceniem względnym, więc od razu można nanieść go na oś ε.',
      visual: 'axial',
      focus: { metric: 'ε' },
      formula: '\\varepsilon=800\\cdot 10^{-6}=0{,}0008',
    },
    {
      title: 'Naprężenie z prawa Hooke’a',
      narration:
        'W zakresie sprężystym σ = Eε = 200 000·800·10⁻⁶ = 160 MPa. Punkt na wykresie leży na prostym odcinku krzywej, poniżej granicy plastyczności.',
      caption: 'Moduł E = 200 GPa = 200 000 MPa, więc wynik wychodzi bezpośrednio w MPa.',
      visual: 'axial',
      focus: { metric: 'σ' },
      formula: '\\sigma=E\\varepsilon=200\\,000\\cdot 800\\cdot 10^{-6}=160\\ \\text{MPa}',
    },
    {
      title: 'Siła osiowa',
      narration:
        'Z definicji naprężenia N = σA = 160·40 = 6400 N = 6,4 kN. To siła, którą przenosi pręt przy zmierzonym odkształceniu.',
      caption: 'Pole podstawiamy w mm², więc siła wychodzi w niutonach.',
      visual: 'axial',
      focus: { metric: 'N' },
      formula: 'N=\\sigma A=160\\cdot 40=6400\\ \\text{N}=6{,}4\\ \\text{kN}',
    },
    {
      title: 'Wydłużenie bazy pomiarowej',
      narration:
        'Wydłużenie wynosi ΔL = εL₀ = 800·10⁻⁶·80 = 0,064 mm. To niewielka zmiana długości, typowa dla zakresu sprężystego.',
      caption: 'Wydłużenie zależy od długości bazy, a odkształcenie względne — nie.',
      visual: 'axial',
      focus: { metric: 'ΔL' },
      formula: '\\Delta L=\\varepsilon L_0=800\\cdot 10^{-6}\\cdot 80=0{,}064\\ \\text{mm}',
    },
    {
      title: 'Kontrola zakresu',
      narration:
        'Naprężenie 160 MPa jest mniejsze od typowej granicy plastyczności stali Re ≈ 235 MPa, więc liniowe prawo Hooke’a jest uzasadnione. Gdyby tensometr wskazał 2000·10⁻⁶, otrzymalibyśmy 400 MPa — wartość powyżej Re, dla której wzór ε = σ/E przestaje obowiązywać.',
      caption: 'Zielony punkt mieści się pod Re; czerwony to hipotetyczny wynik 400 MPa poza zakresem liniowym.',
      visual: 'axial',
      focus: { metric: 'check' },
      formula: '160\\ \\text{MPa}<R_e\\approx 235\\ \\text{MPa}',
    },
    {
      title: 'Dalsze etapy próby',
      narration:
        'Po przekroczeniu Re materiał płynie, umacnia się do Rm i zaczyna się przewężać. Nasz pomiar zatrzymuje się jednak na 160 MPa, daleko przed tymi etapami, dlatego wynik 6,4 kN i 0,064 mm opisuje stan sprężysty.',
      caption: 'Pełna krzywa pokazuje kontekst; nasz punkt pozostaje w jej początkowym, liniowym odcinku.',
      visual: 'axial',
      focus: { metric: 'test' },
      formula: '\\sigma\\approx160\\ \\text{MPa}\\ll R_m\\approx400\\ \\text{MPa}',
    },
  ],
} satisfies SolutionData
