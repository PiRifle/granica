import type { SolutionData } from '../../model'
import { AxialStrengthConditionAnimation } from './animation'

export default {
  id: 'ex-axial-strength-condition',
  title: 'Warunek wytrzymałości i zapas bezpieczeństwa — przykład 1',
  duration: 7,
  given: ['N = 90 kN', 'R_e = 235 MPa', 'n = 1,5', 'A = 600 mm²'],
  result:
    'Amin = 574,5 mm², a przekrój 600 mm² spełnia warunek: σ = 150 MPa, nrz = 1,567, czyli zapas jest większy od wymaganego 1,5.',
  animation: AxialStrengthConditionAnimation,
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Pręt o polu A = 600 mm² jest rozciągany siłą N = 90 kN. Stal ma granicę plastyczności Re = 235 MPa, a wymagany współczynnik bezpieczeństwa wynosi n = 1,5. Na rysunku pokazano jeden pręt o stałym przekroju i jego obciążenie.',
      caption: 'Jeden pręt o stałym polu A = 600 mm², obciążony osiowo siłą N = 90 kN.',
      visual: 'axial',
      focus: {
        metric: 'model',
      },
      formula: 'N=90\\ \\text{kN},\\quad A=600\\ \\text{mm}^2,\\quad R_e=235\\ \\text{MPa},\\quad n=1{,}5',
    },
    {
      title: 'Naprężenie dopuszczalne',
      narration:
        'Naprężenie dopuszczalne wyznaczamy, dzieląc wartość graniczną przez współczynnik bezpieczeństwa: σdop = Re/n = 235/1,5 = 156,7 MPa. Na skali naprężeń poziom dopuszczalny przesuwa się poniżej granicy plastyczności.',
      caption: 'Poziom dopuszczalny 156,7 MPa leży poniżej granicy plastyczności 235 MPa.',
      visual: 'axial',
      focus: {
        metric: 'allowable',
      },
      formula: '\\sigma_{\\mathrm{dop}}=\\frac{R_e}{n}=\\frac{235}{1{,}5}=156{,}7\\ \\text{MPa}',
    },
    {
      title: 'Wymagane pole',
      narration:
        'Z warunku |σ| ≤ σdop otrzymujemy minimalne pole Amin = N/σdop = 90 000/156,7 = 574,5 mm². Przyjęte pole 600 mm² jest większe od minimalnego, więc wstępny dobór jest poprawny.',
      caption: 'A = 600 mm² leży powyżej Amin = 574,5 mm²; zaokrąglenie w górę jest bezpieczne.',
      visual: 'axial',
      focus: {
        metric: 'area',
      },
      formula: 'A_{\\min}=\\frac{N}{\\sigma_{\\mathrm{dop}}}=\\frac{90\\,000}{156{,}7}=574{,}5\\ \\text{mm}^2',
    },
    {
      title: 'Naprężenie rzeczywiste',
      narration:
        'Dla przyjętego pola obliczamy rzeczywiste naprężenie: σ = N/A = 90 000/600 = 150 MPa. Jest ono mniejsze od dopuszczalnego 156,7 MPa, więc warunek wytrzymałości jest spełniony.',
      caption: 'σ = 150 MPa < σdop = 156,7 MPa.',
      visual: 'axial',
      focus: {
        metric: 'stress',
      },
      formula: '\\sigma=\\frac{N}{A}=\\frac{90\\,000}{600}=150\\ \\text{MPa}',
    },
    {
      title: 'Sprawdzenie zapasu',
      narration:
        'Rzeczywisty zapas wynosi nrz = Re/σ = 235/150 = 1,567 i jest większy od wymaganego 1,5. Przekrój 600 mm² spełnia warunek. Warto zauważyć, że przekrój 570 mm² dałby 157,9 MPa, czyli przekroczyłby wartość dopuszczalną.',
      caption: 'nrz = 1,567 ≥ n = 1,5, więc przyjęty przekrój jest bezpieczny.',
      visual: 'axial',
      focus: {
        metric: 'check',
      },
      formula: 'n_{\\mathrm{rz}}=\\frac{R_e}{\\sigma}=\\frac{235}{150}=1{,}567\\ge 1{,}5',
    },
  ],
} satisfies SolutionData
