import type { CantileverDesignInputs } from '../../solution-factories/factory-shear-bending/factory'

export const inputs: CantileverDesignInputs = { q: 20, l1: 1.5, moment: 5, l2: 0.5, kg: 200 }

export const meta = {
  id: 'wspornik-q-moment-dobor-wskaznika',
  title: 'Belka wspornikowa z obciążeniem q i momentem M — dobór wskaźnika W_y',
  duration: 11,
  given: [
    'obciążenie ciągłe q = 20 kN/m na odcinku o długości l1 = 1,5 m',
    'moment skupiony M = 5 kN·m na końcu odcinka obciążonego (x = 1,5 m)',
    'odcinek swobodny l2 = 0,5 m do końca belki; utwierdzenie w x = 2,0 m',
    'materiał: k_g = 200 MPa',
    'szukany minimalny wskaźnik W_y dwuteownika',
  ],
  result:
    'Siła poprzeczna zmienia się od 0 do −30 kN, a największy moment |M| = 42,5 kN·m występuje w utwierdzeniu. Wymagane W_y ≥ 212,5 cm³ spełnia dwuteownik I 200 o W_y = 214 cm³; naprężenie σ = 198,6 MPa < 200 MPa, więc warunek jest spełniony z zapasem 0,7%.',
}
