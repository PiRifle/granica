import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-m3-thermal-free-restrained-2',
  title: 'Temperatura: swoboda i zablokowanie — przykład 2',
  duration: 7,
  given: ['L_1=500 mm', 'A_1=400 mm²', 'L_2=500 mm', 'A_2=250 mm²', 'alpha=12', 'E=200 GPa', 'T=50 K'],
  result:
    'Swobodne wydłużenie wynosi 0,6 mm. Po pełnym utwierdzeniu podpory wymuszają wspólną siłę ściskającą N ≈ 36,9 kN, a naprężenia wynoszą σ₁ ≈ −92,3 MPa i σ₂ ≈ −147,7 MPa. Cieńszy dolny odcinek jest bardziej wytężony.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.SteppedThermalRestraintAnimation }))),
  figure: {
    kind: 'axial',
    top: 'fixed',
    bottom: 'fixed',
    units: {
      N: 'kN',
      σ: 'MPa',
      ε: '–',
      ΔL: 'mm',
      A: 'mm²',
      αΔT: '–',
      ΔL_T: 'mm',
    },
    segments: [
      {
        id: '1',
        label: '1',
        length: 500,
        area: 400,
        n: -36.9,
        sigma: -92.3,
        epsilon: -0.0004615,
        deltaL: -0.231,
        thermalStrain: 0.0006,
        freeDeltaL: 0.3,
      },
      {
        id: '2',
        label: '2',
        length: 500,
        area: 250,
        n: -36.9,
        sigma: -147.7,
        epsilon: -0.0007385,
        deltaL: -0.369,
        thermalStrain: 0.0006,
        freeDeltaL: 0.3,
      },
    ],
    note: 'ΔT = 50 K; sumaryczne skrócenie mechaniczne 0,6 mm znosi swobodne wydłużenie.',
  },
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Pręt schodkowy jest utwierdzony na obu końcach. Górny odcinek ma L₁ = 500 mm i A₁ = 400 mm², dolny L₂ = 500 mm i A₂ = 250 mm². Materiał jest ten sam: α = 12·10⁻⁶ 1/K i E = 200 GPa. Temperatura wzrasta o ΔT = 50 K.',
      caption: 'Oba końce nieruchome; całkowita długość 1000 mm nie może się zmienić.',
      visual: 'thermal',
      focus: {
        metric: 'model',
      },
      formula: 'L_1=L_2=500\\ \\text{mm},\\qquad A_1=400\\ \\text{mm}^2,\\quad A_2=250\\ \\text{mm}^2',
    },
    {
      title: 'Swobodne wydłużenie',
      narration:
        'Gdyby dolna podpora nie blokowała ruchu, cały pręt wydłużyłby się o ΔL_T = αΔT(L₁+L₂) = 12·10⁻⁶·50·1000 = 0,6 mm. Naprężenie byłoby zerowe.',
      caption: 'Swobodne wydłużenie całego pręta wynosi 0,6 mm.',
      visual: 'thermal',
      focus: {
        metric: 'ΔL_T',
      },
      formula: '\\Delta L_T=\\alpha\\Delta T(L_1+L_2)=12\\cdot10^{-6}\\cdot50\\cdot1000=0{,}6\\ \\text{mm}',
    },
    {
      title: 'To samo ΔT przy pełnym utwierdzeniu',
      narration:
        'Przy tych samych 50 K końce pozostają nieruchome, więc całkowita zmiana długości wynosi zero. Podpory wymuszają mechaniczne skrócenie o 0,6 mm. W pręcie pojawia się ściskanie.',
      caption: 'Ten sam przyrost temperatury, ale ΔL = 0; odkształcenie termiczne zostaje zniesione mechanicznie.',
      visual: 'thermal',
      focus: {
        metric: 'restraint',
      },
      formula: '\\alpha\\Delta T(L_1+L_2)=0{,}6\\ \\text{mm},\\qquad \\Delta L=0',
    },
    {
      title: 'Warunek zgodności i siła N',
      narration:
        'Siła osiowa N jest taka sama w obu odcinkach, bo między podporami nie ma dodatkowego obciążenia. Skrócenia mechaniczne sumują się do 0,6 mm, więc 0,6 = N(500/(200 000·400) + 500/(200 000·250)). Stąd N ≈ 36,9 kN ściskania.',
      caption: 'Wspólna siła ściskająca N ≈ 36,9 kN znosi swobodne wydłużenie.',
      visual: 'thermal',
      focus: {
        metric: 'N',
      },
      formula:
        '0{,}6=N\\left(\\frac{500}{200\\,000\\cdot400}+\\frac{500}{200\\,000\\cdot250}\\right)=N\\cdot1{,}625\\cdot10^{-5}',
    },
    {
      title: 'Naprężenia w odcinkach',
      narration:
        'Naprężenia liczymy z σ = N/A. Górny odcinek: σ₁ = −36 923/400 ≈ −92,3 MPa. Dolny: σ₂ = −36 923/250 ≈ −147,7 MPa. Cieńszy odcinek jest bardziej wytężony.',
      caption: 'σ₁ ≈ −92,3 MPa, σ₂ ≈ −147,7 MPa; decyduje cieńszy odcinek dolny.',
      visual: 'thermal',
      focus: {
        metric: 'σ',
        segment: '2',
      },
      formula:
        '\\sigma_1=\\frac{-36\\,923}{400}\\approx-92{,}3\\ \\text{MPa},\\qquad \\sigma_2=\\frac{-36\\,923}{250}\\approx-147{,}7\\ \\text{MPa}',
    },
    {
      title: 'Kontrola zgodności',
      narration:
        'Skrócenia wynoszą około 0,231 mm w górnym i 0,369 mm w dolnym odcinku. Ich suma to 0,6 mm, czyli dokładnie tyle, ile wynosiło swobodne wydłużenie. Całkowita długość pręta pozostaje więc niezmieniona.',
      caption: '0,231 + 0,369 = 0,6 mm; warunek zgodności jest spełniony.',
      visual: 'thermal',
      focus: {
        metric: 'check',
      },
      formula:
        '\\frac{36\\,923\\cdot500}{200\\,000\\cdot400}+\\frac{36\\,923\\cdot500}{200\\,000\\cdot250}\\approx0{,}231+0{,}369=0{,}6\\ \\text{mm}',
    },
  ],
} satisfies SolutionData
