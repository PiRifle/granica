import type { SolutionData } from '../../model'

export default {
  id: 'ex-foundations-load-types',
  title: 'Obciążenia: siła, rozkład i moment — przykład 1',
  duration: 7,
  given: ['A = 500 mm²', 'L = 2,5 m', 'ρ = 7850 kg/m³', 'g = 9,81 m/s²'],
  result:
    'Ciężar pręta wynosi około 96,3 N, obciążenie liniowe około 38,5 N/m, a maksymalne naprężenie od ciężaru własnego około 0,193 MPa.',
  figure: {
    kind: 'axial',
    top: 'fixed',
    bottom: 'free',
    units: { N: 'N', σ: 'MPa', A: 'mm²' },
    segments: [
      { id: 'g', label: 'górny', length: 1.25, area: 500, n: 96.3, sigma: 0.193 },
      { id: 'd', label: 'dolny', length: 1.25, area: 500, n: 48.15, sigma: 0.0963 },
    ],
    loads: [
      { node: 1, value: 48.15, label: 'G/2 ≈ 48,2 N' },
      { node: 2, value: 48.15, label: 'G/2 ≈ 48,2 N' },
    ],
    note: 'Ciężar własny zastąpiono dwiema siłami G/2 na granicach odcinków. N podano na górze każdego odcinka; długości 1,25 m są schematyczne.',
  },
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Pręt o polu przekroju A = 500 mm² i długości L = 2,5 m wisi pionowo, utwierdzony górnym końcem. Obciążeniem jest wyłącznie jego ciężar własny. Przyjmujemy gęstość stali ρ = 7850 kg/m³ i przyspieszenie ziemskie g = 9,81 m/s².',
      caption: 'Pręt obciążony ciężarem własnym; podział na dwa odcinki jest schematyczny.',
      visual: 'axial',
      focus: { metric: 'N' },
      formula: 'A=500\\ \\text{mm}^2,\\quad L=2{,}5\\ \\text{m},\\quad \\rho=7850\\ \\text{kg/m}^3',
    },
    {
      title: 'Ciężar objętościowy',
      narration:
        'Ciężar objętościowy to ciężar jednostki objętości: γ = ρg. Mnożymy gęstość przez przyspieszenie ziemskie i otrzymujemy około 77 009 N/m³.',
      caption: 'γ = 7850 · 9,81 ≈ 77 009 N/m³.',
      visual: 'axial',
      focus: { metric: 'N' },
      formula: '\\gamma=\\rho g=7850\\cdot9{,}81\\approx77\\,009\\ \\text{N/m}^3',
    },
    {
      title: 'Pole przekroju w m²',
      narration:
        'Aby pomnożyć ciężar objętościowy przez pole, trzeba wyrazić pole w metrach kwadratowych. Jeden metr kwadratowy to milion milimetrów kwadratowych, więc 500 mm² = 0,0005 m².',
      caption: 'A = 500 · 10⁻⁶ m² = 0,0005 m².',
      visual: 'axial',
      focus: { metric: 'A' },
      formula: 'A=500\\ \\text{mm}^2=500\\cdot10^{-6}\\ \\text{m}^2=0{,}0005\\ \\text{m}^2',
    },
    {
      title: 'Obciążenie liniowe',
      narration:
        'Ciężar własny na jednostkę długości wynosi q_g = γA. Po podstawieniu 77 009 · 0,0005 otrzymujemy około 38,5 N/m.',
      caption: 'q_g ≈ 38,5 N/m.',
      visual: 'axial',
      focus: { metric: 'N' },
      formula: 'q_g=\\gamma A=77\\,009\\cdot0{,}0005\\approx38{,}5\\ \\text{N/m}',
    },
    {
      title: 'Ciężar całego pręta',
      narration:
        'Ciężar pręta to obciążenie liniowe pomnożone przez długość: G = q_g L = 38,5 · 2,5 ≈ 96,3 N. Taka sama siła działa na górny przekrój pręta.',
      caption: 'G ≈ 96,3 N.',
      visual: 'axial',
      focus: { metric: 'N' },
      formula: 'G=q_g L=38{,}5\\cdot2{,}5\\approx96{,}3\\ \\text{N}',
    },
    {
      title: 'Kontrola przez objętość i masę',
      narration:
        'Objętość pręta wynosi V = AL = 0,0005 · 2,5 = 0,00125 m³, a masa m = ρV = 7850 · 0,00125 ≈ 9,81 kg. Ciężar G = mg ≈ 96,3 N potwierdza wcześniejszy wynik.',
      caption: 'Objętość, masa i ciężar dają spójny rezultat.',
      visual: 'axial',
      focus: { metric: 'N' },
      formula:
        'V=0{,}0005\\cdot2{,}5=0{,}00125\\ \\text{m}^3,\\quad m=7850\\cdot0{,}00125\\approx9{,}81\\ \\text{kg},\\quad G=mg\\approx96{,}3\\ \\text{N}',
    },
    {
      title: 'Maksymalne naprężenie',
      narration:
        'Największa siła podłużna występuje tuż pod utwierdzeniem i jest równa ciężarowi całego pręta. Dzieląc G przez pole, otrzymujemy σ = 96,3 / 0,0005 ≈ 192 600 Pa, czyli około 0,193 MPa.',
      caption: 'Naprężenie maksymalne jest na górze pręta i wynosi około 0,193 MPa.',
      visual: 'axial',
      focus: { metric: 'σ', segment: 'g' },
      formula:
        '\\sigma_{\\max}=\\frac{G}{A}=\\frac{96{,}3}{0{,}0005}\\approx192\\,600\\ \\text{Pa}\\approx0{,}193\\ \\text{MPa}',
    },
    {
      title: 'Kontrola wzorem skróconym',
      narration:
        'Dla pręta obciążonego tylko ciężarem własnym maksymalne naprężenie można policzyć bezpośrednio ze wzoru σ_max = γL. Wynik 77 009 · 2,5 ≈ 192 500 Pa potwierdza obliczenie przez siłę.',
      caption: 'σ_max = γL ≈ 0,193 MPa.',
      visual: 'axial',
      focus: { metric: 'σ', segment: 'g' },
      formula:
        '\\sigma_{\\max}=\\gamma L=77\\,009\\cdot2{,}5\\approx192\\,500\\ \\text{Pa}\\approx0{,}193\\ \\text{MPa}',
    },
    {
      title: 'Wniosek',
      narration:
        'Ciężar własny daje bardzo małe naprężenie w stosunku do typowej wytrzymałości stali. W krótkim pręcie można go pominąć, ale przy dużej długości lub małym polu staje się istotny. Dlatego zawsze porównuj ciężar własny z obciążeniem zewnętrznym, zamiast zakładać z góry, że jest pomijalny.',
      caption: 'Ciężar własny jest tu mały, ale jego udział rośnie z długością.',
      visual: 'axial',
      focus: { metric: 'σ', segment: 'd' },
    },
  ],
} satisfies SolutionData
