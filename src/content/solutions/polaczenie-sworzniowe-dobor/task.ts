import type { PinDesignInputs } from '../../solution-factories/factory-shear-bending/factory'

export const inputs: PinDesignInputs = { p: 100, kShear: 200, kBearing: 100 }

export const meta = {
  id: 'polaczenie-sworzniowe-dobor',
  title: 'Połączenie sworzniowe — dobór średnicy i wysokości elementu',
  duration: 11,
  given: [
    'siła przenoszona przez połączenie P = 100 kN',
    'naprężenie dopuszczalne na ścinanie k_s = 200 MPa',
    'naprężenie dopuszczalne na docisk k_t = 100 MPa',
    'sworzeń osadzony w sztywnej ścianie o grubości h; połączenie jednocięte',
    'sworzeń o średnicy d, obciążony siłą P na swobodnym końcu',
  ],
  result:
    'Wymagana średnica d ≥ 25,23 mm, przyjęto d = 26 mm; wymagana grubość ściany h ≥ 12,24 mm, przyjęto h = 13 mm. Sprawdzenie: τ = 188,35 MPa < 200 MPa oraz σ_b = 94,17 MPa < 100 MPa — oba warunki są spełnione z zapasem około 5,8%.',
}
