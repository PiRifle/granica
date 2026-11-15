import type { BeamDiameterDesignInputs } from '../../solution-factories/factory-shear-bending/factory'

export const inputs: BeamDiameterDesignInputs = { kg: 120 }

export const meta = {
  id: 'belka-przewieszenie-dobor-srednicy',
  title: 'Belka z przewieszeniem — wykresy T/M i dobór średnicy',
  duration: 12,
  given: [
    'belka A–B–C–D: A — swobodny koniec, B — podpora, C — punkt obciążenia, D — podpora',
    'AB = 1,0 m, BC = 3,0 m, CD = 2,0 m',
    'P1 = 30 kN w A (w dół), P2 = 40 kN w C (w dół)',
    'k_g = 300 MPa; przekrój pełny kołowy o średnicy d',
  ],
  result:
    'R_D = 18 kN, R_B = 52 kN, |M|max = 36 kN·m w punkcie C. Wymagana średnica wynosi d ≥ 106,92 mm, więc przyjmujemy d = 107 mm; przy tej średnicy σ = 299,3 MPa < k_g = 300 MPa. Praktycznie warto przyjąć d = 110 mm.',
}
