import type { AluminumBeamMomentInputs } from '../../solution-factories/factory-shear-bending/factory'

export const inputs: AluminumBeamMomentInputs = { width: 80, height: 100, wall: 6, re: 400, safety: 3 }

export const meta = {
  id: 'belka-aluminiowa-moment-dopuszczalny',
  title: 'Pręt aluminiowy — maksymalny dopuszczalny moment zginający',
  duration: 11,
  given: [
    'przekrój prostokątny rurowy: szerokość 80 mm, wysokość 100 mm, ścianka t = 6 mm',
    'zginanie względem poziomej osi środkowej x (wysokość przekroju 100 mm)',
    'aluminium: granica plastyczności R_e = 400 MPa',
    'współczynnik bezpieczeństwa n = 3, więc σ_dop = 400/3 = 133,33 MPa',
  ],
  result:
    'I_x = 2 804 992 mm⁴, W_x = 56 099,84 mm³ = 56,10 cm³, a maksymalny dopuszczalny moment wynosi M_max = 7,48 kN·m; przy tym momencie σ_max = 133,33 MPa nie przekracza σ_dop.',
}
