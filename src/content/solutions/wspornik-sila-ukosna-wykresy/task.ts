import type { InclinedLoadDiagramsInputs } from '../../solution-factories/factory-shear-bending/factory'

export const inputs: InclinedLoadDiagramsInputs = { p: 10, alphaDeg: 30, length: 1.2 }

export const meta = {
  id: 'wspornik-sila-ukosna-wykresy',
  title: 'Wspornik z siłą P pod kątem α — wykresy N, T, M',
  duration: 11,
  given: [
    'wspornik utwierdzony w A ze swobodnym końcem B, długość l',
    'siła P zaczepiona w B, nachylona do osi belki pod kątem α, skierowana w dół i w lewo',
    'składowa osiowa P cosα ściska pręt, a składowa poprzeczna P sinα działa w dół',
    'w treści nie podano wartości liczbowych; przykład ilustracyjny: P = 10 kN, α = 30°, l = 1,2 m',
  ],
  result:
    'N(x) = −P cosα (ściskanie), T(x) = +P sinα (stała), M(x) = −P sinα(l − x), przy czym M(0) = −P l sinα i M(l) = 0. Dla przykładu P = 10 kN, α = 30°, l = 1,2 m otrzymujemy N = −8,66 kN, T = +5,00 kN, M(0) = −6,00 kN·m oraz reakcje H_A = 8,66 kN, V_A = +5,00 kN (w górę) i M_A = +6,00 kN·m.',
}
