import type { SolutionData } from '../../model'
import { AxialStrengthCondition2Animation } from './animation'

export default {
  id: 'ex-axial-strength-condition-2',
  title: 'Warunek wytrzymałości i zapas bezpieczeństwa — przykład 2',
  duration: 7,
  given: ['N_1=60 kN', 'A_1=400 mm²', 'N_2=45 kN', 'A_2=250 mm²', 'R_e=235 MPa', 'n=1,5'],
  result:
    'Odcinek 2 jest krytyczny: σ₂ = 180 MPa przekracza σdop = 156,7 MPa. Po poszerzeniu A₂ do 300 mm² otrzymujemy σ₂ = 150 MPa, a rzeczywisty zapas nrz = 1,567 jest większy od wymaganego 1,5.',
  animation: AxialStrengthCondition2Animation,
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Pręt schodkowy ma dwa odcinki o różnych polach. Górny odcinek przenosi N₁ = 60 kN i ma pole A₁ = 400 mm², dolny przenosi N₂ = 45 kN i ma pole A₂ = 250 mm². Materiał jest ten sam: Re = 235 MPa, a wymagany zapas n = 1,5, czyli σdop = 156,7 MPa. Siły osiowe wynikają z równowagi, więc w pręcie statycznie wyznaczalnym zmiana pola nie zmienia ich wartości.',
      caption: 'Dwa rzeczywiste odcinki o polach 400 mm² i 250 mm²; siły osiowe 60 kN i 45 kN.',
      visual: 'axial',
      focus: {
        metric: 'model',
      },
      formula:
        'N_1=60\\ \\text{kN},\\quad A_1=400\\ \\text{mm}^2,\\qquad N_2=45\\ \\text{kN},\\quad A_2=250\\ \\text{mm}^2',
    },
    {
      title: 'Naprężenia w odcinkach',
      narration:
        'Naprężenia nominalne wynoszą σ₁ = 60 000/400 = 150 MPa oraz σ₂ = 45 000/250 = 180 MPa. Górny odcinek spełnia warunek, dolny go przekracza, mimo że przenosi mniejszą siłę. Decyduje mniejsze pole, zgodnie z zasadą najsłabszego ogniwa.',
      caption: 'σ₂ = 180 MPa > σdop = 156,7 MPa; dolny odcinek jest krytyczny.',
      visual: 'axial',
      focus: {
        metric: 'stress',
        segment: '2',
      },
      formula: '\\sigma_1=150\\ \\text{MPa},\\qquad \\sigma_2=180\\ \\text{MPa}>156{,}7\\ \\text{MPa}',
    },
    {
      title: 'Dobór dolnego odcinka',
      narration:
        'Dla dolnego odcinka potrzebne jest A₂,min = N₂/σdop = 45 000/156,7 = 287,2 mm². Przyjmujemy A₂ = 300 mm²; przekrój się poszerza, a naprężenie spada do σ₂ = 45 000/300 = 150 MPa.',
      caption: 'Poszerzenie dolnego odcinka z 250 mm² do 300 mm² obniża σ₂ z 180 do 150 MPa.',
      visual: 'axial',
      focus: {
        metric: 'area',
        segment: '2',
      },
      formula: 'A_{2,\\min}=\\frac{45\\,000}{156{,}7}=287{,}2\\ \\text{mm}^2\\rightarrow A_2=300\\ \\text{mm}^2',
    },
    {
      title: 'Sprawdzenie zapasu',
      narration:
        'Po korekcie oba odcinki pracują przy σ = 150 MPa, poniżej σdop = 156,7 MPa. Rzeczywisty zapas wynosi nrz = 235/150 = 1,567 i jest większy od wymaganego 1,5. W praktyce trzeba jeszcze sprawdzić przekrój netto oraz koncentrację naprężeń przy gwincie lub otworze.',
      caption: 'Oba odcinki spełniają warunek; nrz = 1,567 ≥ 1,5. Przekrój netto i Kt wymagają osobnej kontroli.',
      visual: 'axial',
      focus: {
        metric: 'check',
      },
      formula: '\\sigma_1=\\sigma_2=150\\ \\text{MPa},\\qquad n_{\\mathrm{rz}}=\\frac{235}{150}=1{,}567\\ge 1{,}5',
    },
  ],
} satisfies SolutionData
