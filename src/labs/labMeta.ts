export interface LabMeta {
  title: string
  minutes: number
  topic: string
}

export const labMeta: Record<string, LabMeta> = {
  units: { title: 'Jednostki siły i naprężenia', minutes: 2, topic: 'Jednostki' },
  stress: { title: 'Naprężenie normalne w pręcie', minutes: 3, topic: 'Rozciąganie' },
  hooke: { title: 'Prawo Hooke’a: stal, aluminium i drewno', minutes: 4, topic: 'Odkształcenia' },
  thermal: { title: 'Odkształcenia i naprężenia termiczne', minutes: 4, topic: 'Termika' },
  section: { title: 'Moment bezwładności przekroju', minutes: 4, topic: 'Geometria' },
  torsion: { title: 'Skręcanie wału kołowego', minutes: 4, topic: 'Skręcanie' },
  bending: { title: 'Zginanie belki swobodnie podpartej', minutes: 4, topic: 'Zginanie' },
  mohr: { title: 'Koło Mohra dla stanu płaskiego', minutes: 5, topic: 'Stan naprężenia' },
  reactions: { title: 'Reakcje belki z równowagi momentów', minutes: 3, topic: 'Statyka' },
  sections: { title: 'Metoda przekrojów: siła normalna N', minutes: 3, topic: 'Siły wewnętrzne' },
  saintVenant: { title: 'Zasada de Saint-Venanta', minutes: 4, topic: 'Modelowanie' },
  steppedBar: { title: 'Pręt schodkowy: wykresy N i σ', minutes: 4, topic: 'Rozciąganie' },
  tensileTest: { title: 'Próba rozciągania i odciążenie próbki', minutes: 5, topic: 'Materiał' },
  selfWeight: { title: 'Pręt zawieszony: ciężar własny', minutes: 4, topic: 'Ciężar własny' },
  safety: { title: 'Warunek wytrzymałości i dobór przekroju', minutes: 4, topic: 'Projektowanie' },
  centroid: { title: 'Środek ciężkości przekroju złożonego', minutes: 4, topic: 'Geometria' },
  steiner: { title: 'Twierdzenie Steinera: oś równoległa', minutes: 3, topic: 'Geometria' },
  shearJoint: { title: 'Ścinanie nitu: jedno- i dwucięcie', minutes: 3, topic: 'Połączenia' },
  hollowShaft: { title: 'Wał pełny i rura o tej samej średnicy', minutes: 4, topic: 'Skręcanie' },
  beamGeneral: { title: 'Belka swobodnie podparta: siła w dowolnym miejscu', minutes: 4, topic: 'Zginanie' },
  stressTransform: { title: 'Transformacja naprężeń i koło Mohra', minutes: 5, topic: 'Stan naprężenia' },
  rosette: { title: 'Prostokątna rozeta tensometryczna', minutes: 5, topic: 'Odkształcenia' },
  combined: { title: 'Pręt kołowy: rozciąganie, zginanie i skręcanie', minutes: 5, topic: 'Stany złożone' },
}
