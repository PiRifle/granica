import type { SolutionData } from '../../model'

export default {
  id: 'cw7-1',
  title: 'Sześcian aluminium w sztywnym wycięciu',
  duration: 9,
  given: [
    'a = 10 mm = 0,01 m; P = 5 kN = 5 000 N',
    'E = 70 GPa = 70 000 MPa; ν = 0,35',
    'Osie x i y leżą w kierunkach zablokowanych boków, z jest osią pionową działania siły',
    'ε_x = ε_y = 0; σ_z = −P/a²; brak tarcia oznacza zerowe naprężenia styczne na ściankach',
  ],
  result: 'σ_x = σ_y = −26,923 MPa; ε_x = ε_y = 0, ε_z = −4,45055·10⁻⁴; ΔV = −0,445055 mm³ (zmniejszenie o 0,04451%).',
  scenes: [
    {
      title: 'Rozpoznaj warunki brzegowe',
      narration:
        'Sztywna płyta nie pozwala sześcianowi rozszerzyć się w dwóch poziomych kierunkach, więc ε_x = ε_y = 0. Siła ściska w pionie, a gładkie ścianki mogą wywierać tylko naciski normalne. Z symetrii obciążenia i więzów σ_x = σ_y.',
      formula: '\\varepsilon_x=\\varepsilon_y=0,\\qquad \\sigma_x=\\sigma_y,\\qquad \\tau_{xy}=\\tau_{yz}=\\tau_{zx}=0',
      caption: 'Brak odkształcenia w kierunku nie oznacza braku naprężenia — właśnie reakcja ścianek blokuje ruch.',
      visual: 'cube',
    },
    {
      title: 'Oblicz naprężenie pionowe',
      narration:
        'Siła działa na kwadratową powierzchnię a². Przyjmujemy rozciąganie jako dodatnie, więc ściskanie ma znak ujemny. Pole wynosi 100 mm², a 5 kN to 5 000 N.',
      formula: '\\sigma_z=-\\frac{P}{a^2}=-\\frac{5\\,000}{10^2}=-50\\ \\text{N/mm}^2=-50\\ \\text{MPa}',
      caption: 'Naprężenie jest jednorodne w przyjętym modelu sześcianu.',
      visual: 'cube',
    },
    {
      title: 'Zapisz uogólnione prawo Hooke’a',
      narration:
        'W izotropowym materiale odkształcenie w jednym kierunku zależy od wszystkich trzech naprężeń normalnych. Dla osi x mamy ε_x = [σ_x − ν(σ_y + σ_z)]/E. Analogiczne równanie obowiązuje dla y.',
      formula:
        '\\varepsilon_x=\\frac{\\sigma_x-\\nu(\\sigma_y+\\sigma_z)}{E},\\qquad \\varepsilon_z=\\frac{\\sigma_z-\\nu(\\sigma_x+\\sigma_y)}{E}',
      caption: 'Nie używamy prostego σ = Eε, bo sześcian znajduje się w trójosiowym stanie naprężenia.',
      visual: 'cube',
    },
    {
      title: 'Wyznacz naciski ścianek',
      narration:
        'Warunek ε_x = 0 wymaga zerowania licznika. Po podstawieniu σ_y = σ_x otrzymujemy (1 − ν)σ_x = νσ_z. Ta sama zależność wynika z warunku ε_y = 0.',
      formula:
        '(1-\\nu)\\sigma_x=\\nu\\sigma_z\\quad\\Rightarrow\\quad \\sigma_x=\\sigma_y=\\frac{0,35}{1-0,35}(-50)=-26,9231\\ \\text{MPa}',
      caption: 'Ścianki wycięcia ściskają sześcian w kierunkach x i y.',
      visual: 'cube',
    },
    {
      title: 'Oblicz odkształcenie pionowe',
      narration:
        'Do wzoru na ε_z podstawiamy wszystkie naprężenia w MPa oraz E = 70 000 MPa. Dwa ujemne naprężenia poziome częściowo zmniejszają skrócenie pionowe przez efekt Poissona.',
      formula: '\\varepsilon_z=\\frac{-50-0,35(-26,9231-26,9231)}{70\\,000}=-4,45055\\cdot10^{-4}',
      caption: 'W mikroodkształceniach: ε_z = −445,055 µε; ε_x = ε_y = 0.',
      visual: 'cube',
    },
    {
      title: 'Zapisz pełny stan odkształcenia',
      narration:
        'Ponieważ naprężenia styczne są zerowe, odkształcenia postaciowe również znikają. Tensor odkształcenia jest więc diagonalny. Bok pionowy skraca się o a·|ε_z| = 0,00445055 mm, a boki poziome zachowują długość.',
      formula: '\\boldsymbol{\\varepsilon}=\\begin{bmatrix}0&0&0\\\\0&0&0\\\\0&0&-4,45055\\cdot10^{-4}\\end{bmatrix}',
      caption: 'Skrócenie pionowe jest małe, ale objętość zmienia się mimo zablokowania dwóch wymiarów.',
      visual: 'cube',
    },
    {
      title: 'Oblicz odkształcenie objętościowe',
      narration:
        'Dla małych odkształceń względna zmiana objętości jest sumą trzech odkształceń normalnych. Dwa składniki są zerowe, dlatego θ = ε_z.',
      formula: '\\theta=\\frac{\\Delta V}{V_0}=\\varepsilon_x+\\varepsilon_y+\\varepsilon_z=-4,45055\\cdot10^{-4}',
      caption: 'Znak ujemny oznacza zmniejszenie objętości, a nie ujemną objętość.',
      visual: 'cube',
    },
    {
      title: 'Wyznacz zmianę objętości',
      narration:
        'Objętość początkowa wynosi V₀ = a³ = 1 000 mm³. Mnożymy ją przez θ i otrzymujemy ΔV = −0,445055 mm³. Objętość po odkształceniu to około 999,554945 mm³.',
      formula: '\\Delta V=V_0\\theta=1\\,000(-4,45055\\cdot10^{-4})=-0,445055\\ \\text{mm}^3',
      caption: 'Równoważnie ΔV = −4,45055·10⁻¹⁰ m³.',
      visual: 'cube',
    },
    {
      title: 'Sprawdź rząd wielkości i znak',
      narration:
        'Względny spadek objętości wynosi 0,0445055%, co jest zgodne z małym odkształceniem sprężystym. Ściskanie we wszystkich trzech kierunkach daje ujemne naprężenia normalne, ale tylko pion ma niezerowe odkształcenie.',
      formula: '\\boxed{\\varepsilon_z=-4,45055\\cdot10^{-4},\\qquad \\Delta V=-0,445055\\ \\text{mm}^3}',
      caption: 'Więzy zmieniają zarówno stan naprężenia, jak i odkształcenie względem swobodnego ściskania.',
      visual: 'cube',
      emphasis: 'Klucz zadania: zerowe ε_x i ε_y służą do wyznaczenia nieznanych σ_x i σ_y.',
    },
  ],
} satisfies SolutionData
