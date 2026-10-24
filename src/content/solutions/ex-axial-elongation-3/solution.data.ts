import type { SolutionData } from '../../model'
import { AxialElongation3ExampleAnimation } from './animation'

export default {
  id: 'ex-axial-elongation-3',
  title: 'Wydłużenia i skrócenia prętów — przykład 3',
  duration: 7,
  given: ['A=200 mm²', 'E=200 GPa', 'P=10 kN', 'Q=30 kN'],
  result:
    'Gdyby drugi odcinek miał 500 mm, skrócenie wyniosłoby -0,125 mm, a pręt jako całość wydłużyłby się o 0,025 mm. Przy 700 mm przeważyłoby skrócenie i wypadkowe wydłużenie byłoby ujemne. Taki dobór długości przypomina kompensację: jeden odcinek celowo pracuje w przeciwnym kierunku, aby znieść przemieszczenie drugiego. Trzeba jednak pamiętać, że odcinek ściskany o długości 600 mm i polu 200 mm^2 jest stosunkowo smukły, więc należy dodatkowo sprawdzić wyboczenie.',
  animation: AxialElongation3ExampleAnimation,
  scenes: [
    {
      title: 'Model, dane i obliczenia',
      narration:
        'Tym razem znamy siły i geometrię, a szukamy długości, przy której całkowite wydłużenie będzie zerowe. Pręt jest utwierdzony na lewym końcu i ma dwa odcinki o jednakowym polu A=200 mm^2 oraz module E=200 GPa. Na prawym końcu działa siła P=10 kN skierowana w lewo, czyli ściskająca drugi odcinek. Na połączeniu odcinków działa siła Q=30 kN skierowana w prawo. Z równowagi wynika, że pierwszy odcinek jest rozciągany siłą N_1=Q-P=20 kN, a drugi ściskany siłą N_2=-P=-10 kN. Pierwszy odcinek ma długość L_1=300 mm. Szukamy L_2, przy której suma wydłużeń jest zerowa: Zapis matematyczny. Sprawdźmy: Δ L_1=20 000·300/(200 000·200)=0,15 mm, a Δ L_2=-10 000·600/(200 000·200)=-0,15 mm. Suma wynosi zero. Naprężenia są równe 100 MPa i -50 MPa, więc oba odcinki pozostają w zakresie sprężystym. Gdyby drugi odcinek miał 500 mm, skrócenie wyniosłoby -0,125 mm, a pręt jako całość wydłużyłby się o 0,025 mm. Przy 700 mm przeważyłoby skrócenie i wypadkowe wydłużenie byłoby ujemne. Taki dobór długości przypomina kompensację: jeden odcinek celowo pracuje w przeciwnym kierunku, aby znieść przemieszczenie drugiego. Trzeba jednak pamiętać, że odcinek ściskany o długości 600 mm i polu 200 mm^2 jest stosunkowo smukły, więc należy dodatkowo sprawdzić wyboczenie. Kontrola naprężeń: σ₁ = 20 000/200 = 100 MPa, σ₂ = −10 000/200 = −50 MPa. Oba odcinki pozostają w zakresie sprężystym.',
      caption: 'Naprężenia mają przeciwne znaki, bo pierwszy odcinek jest rozciągany, a drugi ściskany.',
      visual: 'axial',
      formula:
        'E = 200 GPa\\qquad L_{1} = 300 mm\\qquad \\Delta L=\\frac{N_1L_1}{EA}+\\frac{N_2L_2}{EA}=0 \\quad\\Rightarrow\\quad L_2=\\frac{N_1L_1}{|N_2|}=\\frac{20\\,000\\cdot300}{10\\,000}=600\\ \\text{mm}.\\qquad \\Delta L_{1} = 20\\,000\\cdot 300/(200\\,000\\cdot 200) = 0{,}15 mm\\qquad \\sigma_1=\\frac{20\\,000}{200}=100\\ \\text{MPa},\\qquad \\sigma_2=\\frac{-10\\,000}{200}=-50\\ \\text{MPa}',
    },
  ],
} satisfies SolutionData
