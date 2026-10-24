import type { SolutionData } from '../../model'

export default {
  id: 'ex-shear-stress-strain-3',
  title: 'Naprężenia i odkształcenia styczne — przykład 3',
  duration: 7,
  given: ['tau = 72 MPa', 'gamma = 0,0009 rad', 'nu = 0,3'],
  result:
    'Uwaga na jednostki: E i G podaje się zwykle w GPa, a naprężenia w zadaniach często w MPa. Przy podstawianiu zamień 1 GPa = 1000 MPa. Jeśli tego nie zrobisz, odkształcenie wyjdzie tysiąc razy za małe, a wynik będzie wyglądał pozornie poprawnie.',
  figure: {
    kind: 'cube',
    stresses: { x: 72, y: -72, z: 0 },
    values: [
      { label: 'τ', value: '72 MPa', focus: 'stress', reveal: 0 },
      { label: 'γ', value: '0,0009 rad', focus: 'stress', reveal: 0 },
      { label: 'ν', value: '0,3', focus: 'design', reveal: 0 },
      { label: 'G', value: '80 GPa', focus: 'stress' },
      { label: 'E', value: '208 GPa', focus: 'design' },
      { label: 'G przy ν → 0,5', value: 'E/3', focus: 'design', reveal: 3 },
      { label: 'G przy ν = 0', value: 'E/2', focus: 'design' },
      { label: 'σ_1', value: '+72 MPa', focus: 'stress' },
      { label: 'σ_2', value: '-72 MPa', focus: 'stress', reveal: 6 },
    ],
    note: 'Z pomiaru τ i γ wynika G = 80 GPa, a stąd E = 208 GPa dla ν = 0,3.',
  },
  scenes: [
    {
      title: 'Krok 1',
      narration:
        'Załóżmy, że z pomiaru znamy naprężenie styczne τ = 72 MPa i odkształcenie γ = 0,0009 rad. Chcemy wyznaczyć moduł ścinania, a następnie moduł Younga dla ν = 0,3.',
      caption:
        'Załóżmy, że z pomiaru znamy naprężenie styczne τ = 72 MPa i odkształcenie γ = 0,0009 rad. Chcemy wyznaczyć moduł ścinania, a…',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '\\tau = 72\\ \\text{MPa}',
    },
    {
      title: 'Krok 2',
      narration:
        'Moduł ścinania to iloraz naprężenia i odkształcenia: G = τ/γ = 72/0,0009 = 80 000 MPa = 80 GPa. Taka wartość jest typowa dla stali.',
      caption:
        'Moduł ścinania to iloraz naprężenia i odkształcenia: G = τ/γ = 72/0,0009 = 80 000 MPa = 80 GPa. Taka wartość jest typowa dla…',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: 'G = \\tau/\\gamma = 72/0{,}0009 = 80\\,000\\ \\text{MPa} = 80\\ \\text{GPa}',
    },
    {
      title: 'Krok 3',
      narration:
        'Moduł Younga obliczamy z zależności E = 2G(1+ν) = 2 · 80 · 1,3 = 208 GPa. To nieco więcej niż typowe 200 GPa, ale mieści się w zakresie spotykanym dla stali stopowych. Gdyby wynik wyszedł 20 GPa albo 2000 GPa, oznaczałby błąd jednostek lub pomiaru.',
      caption:
        'Moduł Younga obliczamy z zależności E = 2G(1+ν) = 2 · 80 · 1,3 = 208 GPa. To nieco więcej niż typowe 200 GPa, ale mieści się w…',
      visual: 'cube',
      focus: { metric: 'design' },
      formula: 'E = 2G(1+\\nu) = 2 \\cdot 80 \\cdot 1{,}3 = 208\\ \\text{GPa}',
    },
    {
      title: 'Krok 4',
      narration:
        'Sprawdźmy jeszcze przypadek graniczny ν → 0,5. Wtedy G = E/[2(1+0,5)] = E/3. Materiał prawie nie zmienia objętości, więc cała energia odkształcenia idzie w zmianę kształtu. Dla gumy, której ν jest bliskie 0,5, moduł ścinania jest więc znacznie mniejszy od modułu Younga. To dlatego guma łatwo się ścina i skręca, choć przy rozciąganiu może być dość sztywna.',
      caption:
        'Sprawdźmy jeszcze przypadek graniczny ν → 0,5. Wtedy G = E/[2(1+0,5)] = E/3. Materiał prawie nie zmienia objętości, więc cała…',
      visual: 'cube',
      focus: { metric: 'design' },
      formula: '\\nu \\to 0{,}5',
    },
    {
      title: 'Krok 5',
      narration:
        'W drugą stronę, dla ν = 0 mielibyśmy G = E/2. Taki materiał zmienia objętość bez efektu Poissona. Rzeczywiste metale mają ν około 0,25–0,35, więc G jest zwykle około 2,5–2,7 razy mniejsze od E.',
      caption:
        'W drugą stronę, dla ν = 0 mielibyśmy G = E/2. Taki materiał zmienia objętość bez efektu Poissona. Rzeczywiste metale mają ν około…',
      visual: 'cube',
      focus: { metric: 'design' },
      formula: '\\nu = 0',
    },
    {
      title: 'Krok 6',
      narration:
        'Pomiar G wykonuje się na przykład w próbie skręcania cienkościennej rurki albo w teście ścinania. Zamiast mierzyć G bezpośrednio, często wystarczy znać E i ν, a potem zastosować wzór. To wygodne, ponieważ E i ν są standardowo wyznaczane w próbie rozciągania. Wartość G jest więc wielkością pochodną, a nie niezależnym parametrem.',
      caption:
        'Pomiar G wykonuje się na przykład w próbie skręcania cienkościennej rurki albo w teście ścinania. Zamiast mierzyć G bezpośrednio,…',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: 'G = 80\\ \\text{GPa}',
    },
    {
      title: 'Krok 7',
      narration:
        'Uwaga na jednostki: E i G podaje się zwykle w GPa, a naprężenia w zadaniach często w MPa. Przy podstawianiu zamień 1 GPa = 1000 MPa. Jeśli tego nie zrobisz, odkształcenie wyjdzie tysiąc razy za małe, a wynik będzie wyglądał pozornie poprawnie.',
      caption:
        'Uwaga na jednostki: E i G podaje się zwykle w GPa, a naprężenia w zadaniach często w MPa. Przy podstawianiu zamień 1 GPa = 1000…',
      visual: 'cube',
      focus: { metric: 'design' },
      formula: 'E = 208\\ \\text{GPa}',
    },
  ],
} satisfies SolutionData
