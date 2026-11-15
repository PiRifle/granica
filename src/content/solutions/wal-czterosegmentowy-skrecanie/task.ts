import type { TorsionDiagramsInputs } from '../../solution-factories/factory-torsion-diagrams/factory'

export const inputs: TorsionDiagramsInputs = {
  stations: [0, 0.2, 0.4, 0.6, 0.8],
  applied: [
    { label: 'M₁', moment: 2, sign: -1 },
    { label: 'M₀', moment: 11, sign: 1 },
    { label: 'M₂', moment: 3, sign: -1 },
    { label: 'M₃', moment: 2, sign: -1 },
    { label: 'M₄', moment: 4, sign: -1 },
  ],
  balancingIndex: 1,
  d: 40,
  segmentLength: 0.2,
  shearModulus: 80000,
  ks: 200,
}

export const meta = {
  id: 'wal-czterosegmentowy-skrecanie',
  title: 'Wał skręcany czterosegmentowy — wykresy M_s, τ i φ',
  duration: 12,
  given: [
    'cztery odcinki o długości l = 0,2 m każdy (całkowita długość 0,8 m)',
    'momenty zewnętrzne M1 = 2, M2 = 3, M3 = 2, M4 = 4 kN·m',
    'wał o średnicy d = 40 mm, G = 80 GPa',
    'naprężenie dopuszczalne na ścinanie k_s = 200 MPa',
    'wał podparty w łożyskach na obu końcach, skręcanie swobodne',
    'nieznany moment M0 na pierwszej granicy odcinków',
  ],
  result:
    'Z równowagi M0 = 11 kN·m, a momenty wewnętrzne wynoszą −2, +9, +6 i +4 kN·m. Największe naprężenie τmax = 716,2 MPa przy k_s = 200 MPa — warunek wytrzymałości nie jest spełniony. Całkowity kąt skręcenia względnego to 0,16910 rad, czyli 9,69°.',
}
