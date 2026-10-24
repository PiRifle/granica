import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-axial-elongation-3',
  title: 'Wydłużenia i skrócenia prętów — przykład 3',
  duration: 7,
  given: ['A = 200 mm²', 'E = 200 GPa', 'P = 10 kN', 'Q = 30 kN', 'L₁ = 300 mm'],
  result:
    'Gdyby drugi odcinek miał 500 mm, skrócenie wyniosłoby -0,125 mm, a pręt jako całość wydłużyłby się o 0,025 mm. Przy 700 mm przeważyłoby skrócenie i wypadkowe wydłużenie byłoby ujemne. Taki dobór długości przypomina kompensację: jeden odcinek celowo pracuje w przeciwnym kierunku, aby znieść przemieszczenie drugiego. Trzeba jednak pamiętać, że odcinek ściskany o długości 600 mm i polu 200 mm² jest stosunkowo smukły, więc należy dodatkowo sprawdzić wyboczenie.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.AxialCompensationAnimation }))),
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Tym razem znamy siły i geometrię, a szukamy długości, przy której całkowite wydłużenie będzie zerowe. Pręt jest utwierdzony na lewym końcu i ma dwa odcinki o jednakowym polu A = 200 mm² oraz module E = 200 GPa. Na prawym końcu działa siła P = 10 kN skierowana w lewo, czyli ściskająca drugi odcinek. Na połączeniu odcinków działa siła Q = 30 kN skierowana w prawo. Pierwszy odcinek ma długość L₁ = 300 mm.',
      caption: 'Pręt poziomy utwierdzony na lewym końcu; szukana długość L₂ drugiego odcinka.',
      visual: 'axial',
      focus: { metric: 'model' },
      formula:
        'A = 200\\ \\text{mm}^{2}, E = 200\\ \\text{GPa}, P = 10\\ \\text{kN}, Q = 30\\ \\text{kN}, L_{1} = 300\\ \\text{mm}',
    },
    {
      title: 'Siły normalne',
      narration:
        'Z równowagi wynika, że pierwszy odcinek jest rozciągany siłą N₁ = Q − P = 20 kN, a drugi ściskany siłą N₂ = −P = −10 kN. Znaki są przeciwne, więc odcinki będą zmieniać długość w przeciwnych kierunkach.',
      caption: 'N₁ = +20 kN (rozciąganie), N₂ = −10 kN (ściskanie).',
      visual: 'axial',
      focus: { metric: 'N' },
      formula: 'N_{1} = Q - P = 20\\ \\text{kN},\\qquad N_{2} = -P = -10\\ \\text{kN}',
    },
    {
      title: 'Warunek zerowego wydłużenia',
      narration:
        'Szukamy L₂, przy której suma wydłużeń jest zerowa. Zapis matematyczny: ΔL = N₁L₁/(EA) + N₂L₂/(EA) = 0, więc L₂ = N₁L₁/|N₂| = 20 000·300/10 000 = 600 mm.',
      caption: 'L₂ = 600 mm, bo oba wkłady mają jednakową wartość bezwzględną.',
      visual: 'axial',
      focus: { metric: 'inverse' },
      formula:
        '\\Delta L=\\frac{N_1L_1}{EA}+\\frac{N_2L_2}{EA}=0\\quad\\Rightarrow\\quad L_2=\\frac{N_1L_1}{|N_2|}=\\frac{20\\,000\\cdot300}{10\\,000}=600\\ \\text{mm}',
    },
    {
      title: 'Kompensacja wydłużeń',
      narration:
        'Sprawdźmy: ΔL₁ = 20 000·300/(200 000·200) = 0,15 mm, a ΔL₂ = −10 000·600/(200 000·200) = −0,15 mm. Suma wynosi zero. Pierwszy odcinek wydłuża się, drugi skraca się o tyle samo, a prawy koniec pozostaje na miejscu.',
      caption: 'ΔL₁ = +0,15 mm, ΔL₂ = −0,15 mm; suma ΔL = 0.',
      visual: 'axial',
      focus: { metric: 'ΔL' },
      formula: '\\Delta L_{1} = 0{,}15\\ \\text{mm},\\qquad \\Delta L_{2} = -0{,}15\\ \\text{mm},\\qquad \\Delta L = 0',
    },
    {
      title: 'Warianty długości L₂',
      narration:
        'Gdyby drugi odcinek miał 500 mm, skrócenie wyniosłoby −0,125 mm, a pręt jako całość wydłużyłby się o 0,025 mm. Przy 700 mm przeważyłoby skrócenie i wypadkowe wydłużenie byłoby ujemne. Taki dobór długości przypomina kompensację: jeden odcinek celowo pracuje w przeciwnym kierunku, aby znieść przemieszczenie drugiego. Trzeba jednak pamiętać, że odcinek ściskany o długości 600 mm i polu 200 mm² jest stosunkowo smukły, więc należy dodatkowo sprawdzić wyboczenie.',
      caption: 'Przy L₂ = 500 mm ΔL > 0, przy 600 mm ΔL = 0, a przy 700 mm ΔL < 0.',
      visual: 'axial',
      focus: { metric: 'variants' },
      formula:
        'L_{2}=500\\ \\text{mm}\\Rightarrow\\Delta L=+0{,}025\\ \\text{mm},\\qquad L_{2}=700\\ \\text{mm}\\Rightarrow\\Delta L=-0{,}025\\ \\text{mm}',
    },
    {
      title: 'Kontrola naprężeń',
      narration:
        'Kontrola naprężeń: σ₁ = 20 000/200 = 100 MPa, σ₂ = −10 000/200 = −50 MPa. Oba odcinki pozostają w zakresie sprężystym.',
      caption: 'Naprężenia mają przeciwne znaki, bo pierwszy odcinek jest rozciągany, a drugi ściskany.',
      visual: 'axial',
      focus: { metric: 'σ' },
      formula:
        '\\sigma_1=\\frac{20\\,000}{200}=100\\ \\text{MPa},\\qquad \\sigma_2=\\frac{-10\\,000}{200}=-50\\ \\text{MPa}',
    },
  ],
} satisfies SolutionData
