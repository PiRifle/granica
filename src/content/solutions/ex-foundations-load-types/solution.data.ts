import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-foundations-load-types',
  title: 'Obciążenia: siła, rozkład i moment — przykład 1',
  duration: 7,
  given: ['A = 500 mm²', 'L = 2,5 m', 'ρ = 7850 kg/m³', 'g = 9,81 m/s²'],
  result:
    'Ciężar pręta wynosi około 96,3 N, obciążenie liniowe około 38,5 N/m, a maksymalne naprężenie od ciężaru własnego około 0,193 MPa.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.LoadTypesExampleAnimation }))),
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Stalowy pręt o polu przekroju A = 500 mm² i długości L = 2,5 m wisi pionowo, utwierdzony górnym końcem. Obciąża go wyłącznie ciężar własny. Przyjmujemy gęstość stali ρ = 7850 kg/m³ i przyspieszenie ziemskie g = 9,81 m/s².',
      caption: 'Pojedynczy pręt obciążony równomiernie rozłożonym ciężarem własnym.',
      visual: 'axial',
      focus: { metric: 'N' },
      formula:
        'A=500\\ \\text{mm}^2,\\quad L=2{,}5\\ \\text{m},\\quad \\rho=7850\\ \\text{kg/m}^3,\\quad g=9{,}81\\ \\text{m/s}^2',
    },
    {
      title: 'Ciężar objętościowy i obciążenie liniowe',
      narration:
        'Ciężar objętościowy to ciężar jednostki objętości: γ = ρg ≈ 77 009 N/m³. Pole 500 mm² zamieniamy na 0,0005 m² i mnożymy przez γ. Otrzymujemy obciążenie liniowe q_g = γA ≈ 38,5 N/m, rozłożone równomiernie na całej długości pręta.',
      caption: 'Ciężar własny działa jako równomierne obciążenie liniowe q_g.',
      visual: 'axial',
      focus: { metric: 'N' },
      formula:
        'A=500\\ \\text{mm}^2=0{,}0005\\ \\text{m}^2,\\qquad \\gamma=\\rho g=7850\\cdot9{,}81\\approx77\\,009\\ \\text{N/m}^3,\\qquad q_g=\\gamma A=77\\,009\\cdot0{,}0005\\approx38{,}5\\ \\text{N/m}',
    },
    {
      title: 'Ciężar całego pręta',
      narration:
        'Ciężar pręta to obciążenie liniowe pomnożone przez długość: G = q_g L = 38,5 · 2,5 ≈ 96,3 N. Taka sama siła normalna działa w przekroju tuż pod utwierdzeniem, bo musi zrównoważyć ciężar całego pręta.',
      caption: 'Siła normalna rośnie od zera na swobodnym końcu do G przy utwierdzeniu.',
      visual: 'axial',
      focus: { metric: 'N' },
      formula: 'G=q_g L=38{,}5\\cdot2{,}5\\approx96{,}3\\ \\text{N}',
    },
    {
      title: 'Rozkład siły normalnej',
      narration:
        'W przekroju odległym o x od swobodnego końca siła normalna równoważy ciężar części poniżej: N(x) = γAx. Na swobodnym końcu N = 0, a przy utwierdzeniu N = G ≈ 96,3 N. Siła rośnie liniowo, więc nie wolno zastępować ciężaru własnego jedną siłą w środku pręta.',
      caption: 'N(x) rośnie liniowo od swobodnego końca do utwierdzenia.',
      visual: 'axial',
      focus: { metric: 'N' },
      formula: 'N(x)=\\gamma Ax,\\qquad N(0)=0,\\qquad N(L)=G\\approx96{,}3\\ \\text{N}',
    },
    {
      title: 'Naprężenie normalne',
      narration:
        'Dzielimy siłę normalną przez pole przekroju: σ(x) = N(x)/A = γx. Naprężenie rośnie liniowo od zera na swobodnym końcu do maksimum przy utwierdzeniu. Dla tego pręta σ_max = γL ≈ 192 500 Pa, czyli około 0,193 MPa.',
      caption: 'Największe naprężenie występuje u góry pręta i wynosi około 0,193 MPa.',
      visual: 'axial',
      focus: { metric: 'σ' },
      formula:
        '\\sigma(x)=\\frac{N(x)}{A}=\\gamma x,\\qquad \\sigma_{\\max}=\\gamma L=77\\,009\\cdot2{,}5\\approx192\\,500\\ \\text{Pa}\\approx0{,}193\\ \\text{MPa}',
    },
    {
      title: 'Kontrola i wniosek',
      narration:
        'Ten sam wynik daje obliczenie przez ciężar całego pręta: σ_max = G/A ≈ 192 600 Pa ≈ 0,193 MPa. Oba rachunki się zgadzają. Pole przekroju skraca się we wzorze, więc pogrubienie pręta nie zmniejsza naprężenia od ciężaru własnego — zwiększa zarówno nośność, jak i ciężar.',
      caption: 'Kontrola przez G/A i przez γL potwierdza wynik; pole przekroju nie wpływa na σ_max.',
      visual: 'axial',
      focus: { metric: 'σ' },
      formula:
        '\\sigma_{\\max}=\\frac{G}{A}=\\frac{96{,}3}{0{,}0005}\\approx192\\,600\\ \\text{Pa}\\approx0{,}193\\ \\text{MPa},\\qquad \\sigma_{\\max}=\\gamma L',
    },
  ],
} satisfies SolutionData
