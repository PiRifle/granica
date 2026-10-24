import type { ModuleData } from '../../model'

export default {
  id: 'shear',
  number: 5,
  title: 'Ścinanie i skręcanie',
  shortTitle: 'Ścinanie i skręcanie',
  description:
    'Od ścinanego sworznia do skręcanego wału: naprężenia styczne, odkształcenia oraz dobór przekroju pełnego i rurowego.',
  outcomes: [
    'W1 — analizuje elementy ścinane i skręcane oraz wskazuje przekroje przenoszące obciążenie',
    'W2 — rozróżnia przypadki ścinania technicznego i swobodnego skręcania',
    'W3 — wyjaśnia wpływ geometrii przekroju na naprężenia i sztywność',
    'U1 — oblicza naprężenia styczne, kąt skręcenia i siły w przekrojach',
    'U2 — wykorzystuje koło Mohra do opisu czystego ścinania',
    'U3 — dobiera średnicę wału z warunków wytrzymałości i sztywności z zachowaniem bezpieczeństwa',
  ],
} satisfies ModuleData
