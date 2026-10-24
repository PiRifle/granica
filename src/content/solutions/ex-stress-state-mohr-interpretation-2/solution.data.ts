import type { SolutionData } from '../../model'
import { MohrInterpretationExample2Animation } from './animation'

export default {
  id: 'ex-stress-state-mohr-interpretation-2',
  title: 'Od koła do decyzji inżynierskiej — przykład 2',
  duration: 7,
  given: ['σ nominalne = 120 MPa', 'R_e = 235 MPa'],
  result:
    'Ten przykład pokazuje, że koło Mohra i kryterium wytężenia to dopiero część analizy. Trzeba jeszcze wiedzieć, gdzie przyłożone jest obciążenie i jaka jest geometria. W strefie karbu samo σ=N/A może zaniżać naprężenie nawet kilkukrotnie.',
  animation: MohrInterpretationExample2Animation,
  scenes: [
    {
      title: 'Model: blacha z otworem',
      narration:
        'Rozważmy blachę z otworem kołowym, rozciąganą nominalnie naprężeniem σ=120 MPa. Z dala od otworu stan naprężenia jest jednoosiowy, a nominalny współczynnik bezpieczeństwa dla R_e=235 MPa wydaje się równy 1,96.',
      caption: 'Z dala od otworu widzimy tylko naprężenie nominalne 120 MPa.',
      visual: 'cube',
      focus: { metric: 'model' },
      formula: '\\sigma_{\\text{nom}}=120\\ \\text{MPa},\\quad R_e=235\\ \\text{MPa}',
    },
    {
      title: 'Koncentracja naprężeń przy otworze',
      narration:
        'Otwór zaburza pole naprężeń. Strumienie naprężeń zaginają się wokół niego, a na brzegu, prostopadle do kierunku rozciągania, naprężenie styczne do brzegu osiąga około trzykrotności wartości nominalnej, czyli 360 MPa.',
      caption: 'Maksimum pojawia się na górze i dole otworu, a nie z dala od karbu.',
      visual: 'cube',
      focus: { metric: 'field' },
      formula: '\\sigma_{\\max}\\approx k_t\\sigma_{\\text{nom}}=3\\cdot120=360\\ \\text{MPa}',
    },
    {
      title: 'Koło Mohra w strefie karbu',
      narration:
        'W strefie karbu lokalny stan naprężenia jest jednoosiowy: σ_1=360 MPa, a σ_2=σ_3=0. Koło Mohra ma środek w 180 MPa i promień 180 MPa. To koło jest znacznie większe od nominalnego, mimo że nominalnie materiał byłby bezpieczny.',
      caption: 'Lokalne koło Mohra rośnie trzykrotnie względem stanu nominalnego.',
      visual: 'cube',
      focus: { metric: 'circle' },
      formula: '\\sigma_1=360\\ \\text{MPa},\\quad \\sigma_2=\\sigma_3=0,\\quad R=\\tau_{\\max}=180\\ \\text{MPa}',
    },
    {
      title: 'Nominalnie bezpiecznie, lokalnie nie',
      narration:
        'Nominalnie naprężenie 120 MPa jest mniejsze od R_e=235 MPa, więc n_nom≈1,96. Lokalnie 360 MPa przekracza granicę plastyczności, więc n_lok≈0,65. Nominalny zapas nie opisuje strefy karbu.',
      caption: 'Ta sama blacha, dwa różne wnioski: nominalny i lokalny.',
      visual: 'cube',
      focus: { metric: 'compare' },
      formula: 'n_{\\text{nom}}=\\frac{235}{120}\\approx1{,}96,\\quad n_{\\text{lok}}=\\frac{235}{360}\\approx0{,}65',
    },
    {
      title: 'Wniosek: geometria przed liczbami',
      narration:
        'W materiale ciągliwym strefa plastyczna wokół otworu może się rozwinąć i częściowo wyrównać naprężenia, ale przy obciążeniu cyklicznym lokalne uplastycznienie sprzyja inicjacji pęknięcia zmęczeniowego. Dlatego inżynier najpierw szuka miejsc koncentracji, a dopiero potem wykonuje obliczenia szczegółowe.',
      caption: 'Samo σ=N/A może zaniżać naprężenie nawet kilkukrotnie.',
      visual: 'cube',
      focus: { metric: 'decision' },
      formula: '\\sigma_{\\text{nom}}=120\\ \\text{MPa}\\ll\\sigma_{\\max}=360\\ \\text{MPa}>R_e=235\\ \\text{MPa}',
    },
  ],
} satisfies SolutionData
