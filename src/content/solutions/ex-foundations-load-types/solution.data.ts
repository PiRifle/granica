import type { SolutionData } from '../../model'
import { LoadTypesExampleAnimation } from './animation'

export default {
  id: 'ex-foundations-load-types',
  title: 'Obciążenia: siła, rozkład i moment — przykład 1',
  duration: 7,
  given: ['A = 500 mm²', 'L = 2,5 m', 'ρ = 7850 kg/m³', 'g = 9,81 m/s²'],
  result:
    'Ciężar pręta wynosi około 96,3 N, obciążenie liniowe około 38,5 N/m, a maksymalne naprężenie od ciężaru własnego około 0,193 MPa.',
  animation: LoadTypesExampleAnimation,
  scenes: [
    {
      title: 'Model, dane i obliczenia',
      narration:
        'Pręt o polu przekroju A = 500 mm² i długości L = 2,5 m wisi pionowo, utwierdzony górnym końcem. Obciążeniem jest wyłącznie jego ciężar własny. Przyjmujemy gęstość stali ρ = 7850 kg/m³ i przyspieszenie ziemskie g = 9,81 m/s². Ciężar objętościowy to ciężar jednostki objętości: γ = ρg. Mnożymy gęstość przez przyspieszenie ziemskie i otrzymujemy około 77 009 N/m³. Aby pomnożyć ciężar objętościowy przez pole, trzeba wyrazić pole w metrach kwadratowych. Jeden metr kwadratowy to milion milimetrów kwadratowych, więc 500 mm² = 0,0005 m². Ciężar własny na jednostkę długości wynosi q_g = γA. Po podstawieniu 77 009 · 0,0005 otrzymujemy około 38,5 N/m. Ciężar pręta to obciążenie liniowe pomnożone przez długość: G = q_g L = 38,5 · 2,5 ≈ 96,3 N. Taka sama siła działa na górny przekrój pręta. Objętość pręta wynosi V = AL = 0,0005 · 2,5 = 0,00125 m³, a masa m = ρV = 7850 · 0,00125 ≈ 9,81 kg. Ciężar G = mg ≈ 96,3 N potwierdza wcześniejszy wynik. Największa siła podłużna występuje tuż pod utwierdzeniem i jest równa ciężarowi całego pręta. Dzieląc G przez pole, otrzymujemy σ = 96,3 / 0,0005 ≈ 192 600 Pa, czyli około 0,193 MPa. Dla pręta obciążonego tylko ciężarem własnym maksymalne naprężenie można policzyć bezpośrednio ze wzoru σ_max = γL. Wynik 77 009 · 2,5 ≈ 192 500 Pa potwierdza obliczenie przez siłę. Ciężar własny daje bardzo małe naprężenie w stosunku do typowej wytrzymałości stali. W krótkim pręcie można go pominąć, ale przy dużej długości lub małym polu staje się istotny. Dlatego zawsze porównuj ciężar własny z obciążeniem zewnętrznym, zamiast zakładać z góry, że jest pomijalny.',
      caption: 'Ciężar własny jest tu mały, ale jego udział rośnie z długością.',
      visual: 'axial',
      formula:
        'A=500\\ \\text{mm}^2,\\quad L=2{,}5\\ \\text{m},\\quad \\rho=7850\\ \\text{kg/m}^3\\qquad \\gamma=\\rho g=7850\\cdot9{,}81\\approx77\\,009\\ \\text{N/m}^3\\qquad A=500\\ \\text{mm}^2=500\\cdot10^{-6}\\ \\text{m}^2=0{,}0005\\ \\text{m}^2\\qquad q_g=\\gamma A=77\\,009\\cdot0{,}0005\\approx38{,}5\\ \\text{N/m}\\qquad G=q_g L=38{,}5\\cdot2{,}5\\approx96{,}3\\ \\text{N}\\qquad V=0{,}0005\\cdot2{,}5=0{,}00125\\ \\text{m}^3,\\quad m=7850\\cdot0{,}00125\\approx9{,}81\\ \\text{kg},\\quad G=mg\\approx96{,}3\\ \\text{N}\\qquad \\sigma_{\\max}=\\frac{G}{A}=\\frac{96{,}3}{0{,}0005}\\approx192\\,600\\ \\text{Pa}\\approx0{,}193\\ \\text{MPa}\\qquad \\sigma_{\\max}=\\gamma L=77\\,009\\cdot2{,}5\\approx192\\,500\\ \\text{Pa}\\approx0{,}193\\ \\text{MPa}',
    },
  ],
} satisfies SolutionData
