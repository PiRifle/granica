import type { SolutionData } from '../../model'
import { ThermalCompensationAnimation } from './animation'

export default {
  id: 'ex-strain-state-gauges-2',
  title: 'Tensometry: od oporu do odkształcenia — przykład 2',
  duration: 7,
  given: ['ΔT = 18 K', 'czułość pozorna 11 με/K', 'E = 200 GPa'],
  result:
    'W praktyce nie odejmujemy tej liczby „na oko”. Stosujemy czujnik kompensacyjny lub czujnik samokompensujący, dopasowany do współczynnika rozszerzalności podłoża. Ważne jest też, żeby temperatura czujnika czynnego i odniesienia była rzeczywiście podobna. Jeśli belka jest nagrzewana lokalnie, sam czujnik odniesienia umieszczony na końcu może nie wystarczyć.',
  animation: ThermalCompensationAnimation,
  scenes: [
    {
      title: 'Warunki temperaturowe',
      narration:
        'Tensometr jest przyklejony do nieobciążonej belki, która nagrzała się o 18 K. Karta czujnika podaje pozorną wrażliwość 11 με/K dla stali, czyli tyle, ile wskazuje czujnik na każdy kelwin różnicy temperatury. Belka nie jest rozciągana, więc każdy sygnał będzie skutkiem temperatury.',
      caption: 'ΔT = 18 K, czułość pozorna 11 με/K, brak obciążenia.',
      visual: 'diagram',
      focus: { metric: 'heat' },
      formula: '\\Delta T=18\\,\\text{K},\\qquad 11\\,\\mu\\varepsilon/\\text{K}',
    },
    {
      title: 'Oblicz pozorne odkształcenie',
      narration:
        'Mnożymy czułość przez różnicę temperatur: 11 · 18 = 198 με, czyli 0,000198. Czujnik wydłuża się termicznie razem z podłożem, choć obciążenie pozostaje zerowe.',
      caption: 'ε_poz = 11 · 18 = 198 με.',
      visual: 'diagram',
      focus: { metric: 'apparent' },
      formula: '11\\cdot18=198\\,\\mu\\varepsilon=0{,}000198',
    },
    {
      title: 'Oblicz fałszywe naprężenie',
      narration:
        'Gdyby zignorować temperaturę i użyć σ = Eε przy E = 200 GPa, otrzymalibyśmy 200 000 · 0,000198 ≈ 39,6 MPa. To więcej niż naprężenia robocze wielu spokojnie obciążonych elementów, mimo że belka jest nieobciążona.',
      caption: 'Fałszywe σ ≈ 39,6 MPa.',
      visual: 'diagram',
      focus: { metric: 'stress' },
      formula: '\\sigma=E\\varepsilon=200\\,000\\cdot0{,}000198=39{,}60\\,\\text{MPa}',
    },
    {
      title: 'Kompensacja temperatury',
      narration:
        'Dodajemy czujnik odniesienia na tym samym materiale i w podobnej temperaturze, ale bez odkształcenia mechanicznego. Jego wskazanie jest prawie takie samo jak czujnika czynnego, więc różnica sygnałów znosi udział temperatury. Zamiast „odejmować temperaturę po fakcie”, kompensacja działa w samym układzie mostka.',
      caption: 'ε_rzeczywiste = ε_zmierzone − ε_pozorne = 198 − 198 = 0.',
      visual: 'diagram',
      focus: { metric: 'compensate' },
      formula: '\\varepsilon_{\\text{rzecz}}=\\varepsilon_{\\text{zmierzone}}-\\varepsilon_{\\text{pozorne}}=198-198=0',
    },
    {
      title: 'Sprawdź wpływ na wynik',
      narration:
        'Po kompensacji pozostaje zero, więc fałszywe 39,6 MPa znika. Gdyby temperatura czujnika czynnego i odniesienia różniła się choćby o kilka kelwinów, błąd nadal byłby rzędu megapaskali. Dlatego kompensacja musi być rzeczywista, a nie tylko deklarowana.',
      caption: 'Kontrola: 198 − 198 = 0 με, czyli 0 MPa.',
      visual: 'diagram',
      focus: { metric: 'check' },
      formula: '198-198=0\\,\\mu\\varepsilon,\\qquad 39{,}60-39{,}60=0\\,\\text{MPa}',
    },
  ],
} satisfies SolutionData
