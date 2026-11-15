import type { SolutionScene } from '../../../types'
import type { CentroidConfig } from './configs'
import { pl, sourceScene, tex } from '../core/source-task'

export function chamferedNotchVariantScenes(config: CentroidConfig): SolutionScene[] {
  const a = config.a
  const circleArea = Math.PI * 25 * 25
  const rectArea = 2 * a * a
  const triangleArea = (a * a) / 2
  const qy = config.moments.qy
  const qx = config.moments.qx
  const xC = config.centroid.x
  const yC = config.centroid.y

  let resX = 0
  let resY = 0
  for (const part of config.parts) {
    const signed = part.negative ? -Math.abs(part.area) : part.area
    resX += signed * (part.x - xC)
    resY += signed * (part.y - yC)
  }

  const scenes: SolutionScene[] = [
    {
      title: 'Model: koło z wycięciem i ścięciem',
      narration: `Materiał to koło o promieniu R = 25 mm. Wycięcie zaczyna się na osi y i biegnie w prawo: ma szerokość 2a = ${2 * a} mm i wysokość a = ${a} mm. Lewe naroże wycięcia jest ścięte pod 45°, więc dno sięga a = ${a} mm w lewo od osi y. Nad wycięciem pozostaje pas materiału o grubości 5 mm.`,
      formula: `R=25\\ \\text{mm},\\quad a=${tex(a)}\\ \\text{mm},\\quad 2a\\times a=${2 * a}\\times${a}\\ \\text{mm},\\quad 45^\\circ,\\quad p=5\\ \\text{mm}`,
      caption: 'Oś x jest pozioma, oś y pionowa, a początek O leży w środku koła.',
      visual: 'diagram',
      focus: { metric: 'model' },
      emphasis: `Wycięcie 2a × a = ${2 * a} × ${a} mm`,
    },
    {
      title: 'Części dodatnie i ujemne',
      narration:
        'Koło jest polem dodatnim. Wycięcie rozbijamy na dwa pola ujemne: prostokąt 2a × a po prawej stronie osi y oraz trójkąt ścięcia o przyprostokątnych a i a po lewej stronie osi y. Suma tych dwóch pól ujemnych daje rzeczywiste pole wycięcia.',
      formula: `A_k=\\pi R^2=${tex(circleArea)},\\quad A_r=-2a^2=-${tex(rectArea)},\\quad A_t=-\\frac{a^2}{2}=-${tex(triangleArea)}\\quad[\\text{mm}^2]`,
      caption: 'Pas materiału nad wycięciem nie jest osobną częścią — wynika z różnicy pól.',
      visual: 'diagram',
      focus: { metric: 'parts' },
      emphasis: 'Koło dodatnie, prostokąt i trójkąt ujemne',
    },
    {
      title: 'Pola i pole netto',
      narration: `Pole koła wynosi πR² = ${pl(circleArea)} mm². Prostokąt wycięcia ma 2a² = ${pl(rectArea)} mm², a trójkąt ścięcia a²/2 = ${pl(triangleArea)} mm². Po odjęciu obu ubytków zostaje pole netto A = ${pl(config.area)} mm².`,
      formula: `A=\\pi R^2-2a^2-\\frac{a^2}{2}=${tex(config.area)}\\ \\text{mm}^2`,
      caption: 'Pole netto jest mianownikiem obu współrzędnych centroidu.',
      visual: 'diagram',
      focus: { metric: 'areas' },
      emphasis: `A = ${pl(config.area)} mm²`,
    },
    {
      title: 'Moment względem osi y',
      narration:
        'Moment względem osi y to suma pól pomnożonych przez współrzędną x ich środków. Koło ma środek w O, więc jego wkład jest zerowy. Prostokąt leży przy x = a, a trójkąt przy x = −a/3. Wypadkowy moment jest ujemny, bo wycięto więcej materiału po prawej stronie osi y.',
      formula: `Q_y=-2a^2\\cdot a+\\frac{a^2}{2}\\cdot\\frac{a}{3}=-\\frac{11a^3}{6}=${tex(qy)}\\ \\text{mm}^3`,
      caption: 'Znak minus oznacza, że wycięcie przesuwa centroid w lewo.',
      visual: 'diagram',
      focus: { metric: 'moment-y' },
      emphasis: `Q_y = ${pl(qy)} mm³`,
    },
    {
      title: 'Moment względem osi x',
      narration:
        'Analogicznie mnożymy pola przez współrzędne y środków. Prostokąt ma środek na y = a/2, a trójkąt na y = a/3. Oba leżą nad osią x, więc ich momenty są dodatnie, a moment figury — ujemny. To zapowiada przesunięcie centroidu w dół.',
      formula: `Q_x=-2a^2\\cdot\\frac{a}{2}-\\frac{a^2}{2}\\cdot\\frac{a}{3}=-\\frac{7a^3}{6}=${tex(qx)}\\ \\text{mm}^3`,
      caption: 'Znak Q_x decyduje o znaku y_C.',
      visual: 'diagram',
      focus: { metric: 'moment-x' },
      emphasis: `Q_x = ${pl(qx)} mm³`,
    },
    {
      title: 'Współrzędne centroidu',
      narration: `Dzielimy momenty przez pole netto. Otrzymujemy x_C = ${pl(xC)} mm oraz y_C = ${pl(yC)} mm. Oba wyniki są bardzo bliskie zera, bo wycięcie jest małe w porównaniu z całym kołem. Centroid leży praktycznie w środku O, ale minimalnie w III ćwiartce.`,
      formula: `x_C=\\frac{Q_y}{A}=${tex(xC)}\\ \\text{mm},\\qquad y_C=\\frac{Q_x}{A}=${tex(yC)}\\ \\text{mm}`,
      caption: 'Wynik w milimetrach; pola w mm², momenty w mm³.',
      visual: 'diagram',
      focus: { metric: 'centroid' },
      emphasis: `C = (${pl(xC)}; ${pl(yC)}) mm`,
    },
    {
      title: 'Interpretacja znaków',
      narration:
        'Wycięcie leży w I i II ćwiartce, więc centroid przesuwa się do III ćwiartki: x_C < 0 i y_C < 0. Pas 5 mm nad wycięciem nie zmienia położenia centroidu, bo nie jest osobnym polem — jego wpływ jest już zawarty w polu netto i momentach. Mała wartość przesunięcia wynika z małego pola wycięcia.',
      formula: `x_C=${tex(xC)}<0,\\qquad y_C=${tex(yC)}<0`,
      caption: 'Centroid leży w materiale w III ćwiartce, bardzo blisko O.',
      visual: 'diagram',
      focus: { metric: 'signs' },
      emphasis: 'Przesunięcie do III ćwiartki',
    },
    {
      title: 'Niezależna kontrola',
      narration:
        'Bilans momentów względem wyznaczonego centroidu powinien się zerować. Sprawdzamy również tożsamości A·x_C = Q_y oraz A·y_C = Q_x. Zgodność obu kontroli potwierdza, że znaki i wartości pól ujemnych są poprawne.',
      formula: `\\sum A_i(x_i-x_C)=${tex(resX)},\\qquad \\sum A_i(y_i-y_C)=${tex(resY)}`,
      caption: 'Reszty są zerowe z dokładnością numeryczną; A·x_C = Q_y i A·y_C = Q_x.',
      visual: 'diagram',
      focus: { metric: 'check' },
      emphasis: 'Bilans momentów i tożsamości',
    },
  ]
  return scenes
}

export function deepNotchScenes(config: CentroidConfig): SolutionScene[] {
  const a = config.a
  const b = config.b ?? 10
  const d = config.d ?? 40
  const radius = d / 2
  const circleArea = Math.PI * radius * radius
  const rectArea = 2 * b * (a + 2)
  const chamferArea = (a * a) / 2
  const cutArea = rectArea - chamferArea
  const qy = config.moments.qy
  const qx = config.moments.qx
  const xC = config.centroid.x
  const yC = config.centroid.y

  let resX = 0
  let resY = 0
  for (const part of config.parts) {
    const signed = part.negative ? -Math.abs(part.area) : part.area
    resX += signed * (part.x - xC)
    resY += signed * (part.y - yC)
  }

  const scenes: SolutionScene[] = [
    {
      title: 'Model: koło z wycięciem i ścięciem',
      narration: `Koło ma średnicę d = ${d} mm, więc promień R = ${radius} mm. Wycięcie ma szerokość 2b = ${2 * b} mm i wysokość a + 2 = ${a + 2} mm. Jego dolna krawędź leży 2 mm poniżej osi x, a górna na y = a = ${a} mm. Dolny lewy narożnik jest ścięty pod 45°; rzut poziomy ścięcia wynosi a = ${a} mm.`,
      formula: `d=${d}\\ \\text{mm},\\quad R=${radius}\\ \\text{mm},\\quad a=${tex(a)}\\ \\text{mm},\\quad b=${tex(b)}\\ \\text{mm},\\quad 2b\\times(a+2)=${2 * b}\\times${a + 2}\\ \\text{mm}`,
      caption: 'Oś x jest pozioma, oś y pionowa, a początek O leży w środku koła.',
      visual: 'diagram',
      focus: { metric: 'model' },
      emphasis: `Wycięcie 2b × (a+2) = ${2 * b} × ${a + 2} mm`,
    },
    {
      title: 'Części dodatnie i ujemne',
      narration:
        'Koło jest polem dodatnim. Prostokąt wycięcia 2b × (a+2) jest polem ujemnym. Ścięty narożnik to trójkąt o przyprostokątnych a i a, który dodajemy z powrotem jako pole dodatnie — bo względem pełnego prostokąta jest to materiał, a nie ubytek.',
      formula: `A_k=\\frac{\\pi d^2}{4}=${tex(circleArea)},\\quad A_r=-2b(a+2)=-${tex(rectArea)},\\quad A_ś=+\\frac{a^2}{2}=+${tex(chamferArea)}\\quad[\\text{mm}^2]`,
      caption: 'Prostokąt odejmujemy, a trójkąt ścięcia dodajemy z powrotem.',
      visual: 'diagram',
      focus: { metric: 'parts' },
      emphasis: 'Koło dodatnie, prostokąt ujemny, ścięcie dodatnie',
    },
    {
      title: 'Pola i pole netto',
      narration: `Pole wycięcia netto to prostokąt minus trójkąt ścięcia: ${pl(rectArea)} − ${pl(chamferArea)} = ${pl(cutArea)} mm². Pole figury to pole koła minus to pole: ${pl(circleArea)} − ${pl(cutArea)} = ${pl(config.area)} mm².`,
      formula: `A_w=2b(a+2)-\\frac{a^2}{2}=${tex(cutArea)}\\ \\text{mm}^2,\\qquad A=${tex(config.area)}\\ \\text{mm}^2`,
      caption: 'Pole netto jest mianownikiem obu współrzędnych centroidu.',
      visual: 'diagram',
      focus: { metric: 'areas' },
      emphasis: `A = ${pl(config.area)} mm²`,
    },
    {
      title: 'Moment względem osi y',
      narration:
        'Koło ma środek w O, więc jego moment względem osi y jest zerowy. Prostokąt jest symetryczny względem osi y, więc także nie wnosi momentu. Moment pochodzi tylko od dodanego trójkąta ścięcia, którego środek leży po lewej stronie osi y. Wypadkowy moment jest ujemny.',
      formula: `Q_y=\\frac{a^2}{2}\\left(\\frac{a}{3}-b\\right)=${tex(qy)}\\ \\text{mm}^3`,
      caption: 'Ścięcie po lewej stronie przesuwa centroid w lewo.',
      visual: 'diagram',
      focus: { metric: 'moment-y' },
      emphasis: `Q_y = ${pl(qy)} mm³`,
    },
    {
      title: 'Moment względem osi x',
      narration:
        'Prostokąt wnosi moment ujemny, bo jego środek leży na y = (a − 2)/2, czyli nad osią x. Trójkąt ścięcia ma środek na y = (a − 6)/3 i częściowo równoważy ten wkład. Przeważa jednak prostokąt, więc moment figury względem osi x jest ujemny.',
      formula: `Q_x=-2b(a+2)\\cdot\\frac{a-2}{2}+\\frac{a^2}{2}\\cdot\\frac{a-6}{3}=${tex(qx)}\\ \\text{mm}^3`,
      caption: 'Znak Q_x decyduje o znaku y_C.',
      visual: 'diagram',
      focus: { metric: 'moment-x' },
      emphasis: `Q_x = ${pl(qx)} mm³`,
    },
    {
      title: 'Współrzędne centroidu',
      narration: `Po podzieleniu momentów przez pole netto otrzymujemy x_C = ${pl(xC)} mm i y_C = ${pl(yC)} mm. Centroid przesuwa się w lewo i w dół względem O. Wartości są małe, bo wycięcie zajmuje niewielką część koła.`,
      formula: `x_C=\\frac{Q_y}{A}=${tex(xC)}\\ \\text{mm},\\qquad y_C=\\frac{Q_x}{A}=${tex(yC)}\\ \\text{mm}`,
      caption: 'Wynik w milimetrach; pola w mm², momenty w mm³.',
      visual: 'diagram',
      focus: { metric: 'centroid' },
      emphasis: `C = (${pl(xC)}; ${pl(yC)}) mm`,
    },
    {
      title: 'Interpretacja znaków',
      narration:
        'Wycięcie usuwa materiał głównie nad osią x i po prawej stronie osi y, więc centroid przesuwa się w lewo i w dół: x_C < 0 oraz y_C < 0. Punkt C wypada w obszarze wycięcia. Jest to dopuszczalne — centroid nie musi leżeć w materiale, a znaki są przeciwne do znaków środka wycięcia.',
      formula: `x_C=${tex(xC)}<0,\\qquad y_C=${tex(yC)}<0`,
      caption: 'C leży w wycięciu, co dla figury z ubytkiem jest poprawne.',
      visual: 'diagram',
      focus: { metric: 'signs' },
      emphasis: 'Przesunięcie w dół i w lewo',
    },
    {
      title: 'Niezależna kontrola',
      narration:
        'Bilans momentów względem wyznaczonego centroidu powinien się zerować. Sprawdzamy także tożsamości A·x_C = Q_y oraz A·y_C = Q_x. Dodatkowo kontrola znaków: środek wycięcia ma x_w > 0 i y_w > 0, a centroid figury ma znaki przeciwne.',
      formula: `\\sum A_i(x_i-x_C)=${tex(resX)},\\qquad \\sum A_i(y_i-y_C)=${tex(resY)}`,
      caption: 'Reszty są zerowe z dokładnością numeryczną; A·x_C = Q_y i A·y_C = Q_x.',
      visual: 'diagram',
      focus: { metric: 'check' },
      emphasis: 'Bilans momentów i znaki wycięcia',
    },
  ]
  return scenes
}

export function deepNotchAltScenes(config: CentroidConfig): SolutionScene[] {
  const a = config.a
  const b = config.b ?? 10
  const d = config.d ?? 50
  const radius = d / 2
  const circleArea = Math.PI * radius * radius
  const rectArea = 2 * b * (a + 2)
  const chamferArea = (a * a) / 2
  const cutArea = rectArea - chamferArea
  const removed = config.removedCentroid ?? { x: 0, y: 0 }
  const qy = config.moments.qy
  const qx = config.moments.qx
  const xC = config.centroid.x
  const yC = config.centroid.y

  let resX = 0
  let resY = 0
  for (const part of config.parts) {
    const signed = part.negative ? -Math.abs(part.area) : part.area
    resX += signed * (part.x - xC)
    resY += signed * (part.y - yC)
  }

  const scenes: SolutionScene[] = [
    {
      title: 'Model: koło z wycięciem i ścięciem',
      narration: `Koło ma średnicę d = ${d} mm, więc promień R = ${radius} mm. Wycięcie ma szerokość 2b = ${2 * b} mm i wysokość a + 2 = ${a + 2} mm. Dolna krawędź wycięcia leży 2 mm poniżej osi x, a górna na y = a = ${a} mm. Lewy dolny narożnik jest ścięty pod 45°; rzut poziomy ścięcia wynosi a = ${a} mm.`,
      formula: `d=${d}\\ \\text{mm},\\quad R=${radius}\\ \\text{mm},\\quad a=${tex(a)}\\ \\text{mm},\\quad b=${tex(b)}\\ \\text{mm},\\quad 2b\\times(a+2)=${2 * b}\\times${a + 2}\\ \\text{mm}`,
      caption: 'Oś x jest pozioma, oś y pionowa, a początek O leży w środku koła.',
      visual: 'diagram',
      focus: { metric: 'model' },
      emphasis: `Wycięcie 2b × (a+2) = ${2 * b} × ${a + 2} mm`,
    },
    {
      title: 'Części dodatnie i ujemne',
      narration:
        'Koło jest polem dodatnim. Prostokąt wycięcia 2b × (a+2) jest polem ujemnym. Ścięty narożnik to trójkąt o przyprostokątnych a i a, który dodajemy z powrotem jako pole dodatnie — względem pełnego prostokąta jest to materiał, a nie ubytek.',
      formula: `A_k=\\frac{\\pi d^2}{4}=${tex(circleArea)},\\quad A_r=-2b(a+2)=-${tex(rectArea)},\\quad A_ś=+\\frac{a^2}{2}=+${tex(chamferArea)}\\quad[\\text{mm}^2]`,
      caption: 'Prostokąt odejmujemy, a trójkąt ścięcia dodajemy z powrotem.',
      visual: 'diagram',
      focus: { metric: 'parts' },
      emphasis: 'Koło dodatnie, prostokąt ujemny, ścięcie dodatnie',
    },
    {
      title: 'Pola i pole netto',
      narration: `Pole wycięcia netto to prostokąt minus trójkąt ścięcia: ${pl(rectArea)} − ${pl(chamferArea)} = ${pl(cutArea)} mm². Pole figury to pole koła minus to pole: ${pl(circleArea)} − ${pl(cutArea)} = ${pl(config.area)} mm².`,
      formula: `A_w=2b(a+2)-\\frac{a^2}{2}=${tex(cutArea)}\\ \\text{mm}^2,\\qquad A=\\frac{\\pi d^2}{4}-A_w=${tex(config.area)}\\ \\text{mm}^2`,
      caption: 'Pole netto jest mianownikiem obu współrzędnych centroidu.',
      visual: 'diagram',
      focus: { metric: 'areas' },
      emphasis: `A = ${pl(config.area)} mm²`,
    },
    {
      title: 'Moment względem osi y',
      narration:
        'Koło ma środek w O, więc jego moment względem osi y jest zerowy. Prostokąt jest symetryczny względem osi y, więc także nie wnosi momentu. Moment pochodzi tylko od dodanego trójkąta ścięcia, którego środek leży po lewej stronie osi y. Wypadkowy moment jest ujemny.',
      formula: `Q_y=\\frac{a^2}{2}\\left(\\frac{a}{3}-b\\right)=${tex(qy)}\\ \\text{mm}^3`,
      caption: 'Ścięcie po lewej stronie przesuwa centroid w lewo.',
      visual: 'diagram',
      focus: { metric: 'moment-y' },
      emphasis: `Q_y = ${pl(qy)} mm³`,
    },
    {
      title: 'Moment względem osi x',
      narration:
        'Prostokąt wnosi moment ujemny, bo jego środek leży na y = (a − 2)/2, czyli nad osią x. Trójkąt ścięcia ma środek na y = (a − 6)/3 i częściowo równoważy ten wkład. Przeważa jednak prostokąt, więc moment figury względem osi x jest ujemny.',
      formula: `Q_x=-2b(a+2)\\cdot\\frac{a-2}{2}+\\frac{a^2}{2}\\cdot\\frac{a-6}{3}=${tex(qx)}\\ \\text{mm}^3`,
      caption: 'Znak Q_x decyduje o znaku y_C.',
      visual: 'diagram',
      focus: { metric: 'moment-x' },
      emphasis: `Q_x = ${pl(qx)} mm³`,
    },
    {
      title: 'Współrzędne centroidu',
      narration: `Po podzieleniu momentów przez pole netto otrzymujemy x_C = ${pl(xC)} mm i y_C = ${pl(yC)} mm. Centroid przesuwa się w lewo i w dół względem O. Wartości są małe, bo wycięcie zajmuje niewielką część koła.`,
      formula: `x_C=\\frac{Q_y}{A}=${tex(xC)}\\ \\text{mm},\\qquad y_C=\\frac{Q_x}{A}=${tex(yC)}\\ \\text{mm}`,
      caption: 'Wynik w milimetrach; pola w mm², momenty w mm³.',
      visual: 'diagram',
      focus: { metric: 'centroid' },
      emphasis: `C = (${pl(xC)}; ${pl(yC)}) mm`,
    },
    {
      title: 'Interpretacja znaków',
      narration:
        'Wycięcie usuwa materiał głównie nad osią x i po prawej stronie osi y, więc centroid przesuwa się w lewo i w dół: x_C < 0 oraz y_C < 0. Punkt C wypada w obszarze wycięcia. Jest to dopuszczalne — centroid nie musi leżeć w materiale, a znaki są przeciwne do znaków środka wycięcia.',
      formula: `x_C=${tex(xC)}<0,\\qquad y_C=${tex(yC)}<0,\\qquad x_w=${tex(removed.x)}>0,\\qquad y_w=${tex(removed.y)}>0`,
      caption: 'C leży w wycięciu, co dla figury z ubytkiem jest poprawne.',
      visual: 'diagram',
      focus: { metric: 'signs' },
      emphasis: 'Przesunięcie w dół i w lewo',
    },
    {
      title: 'Niezależna kontrola',
      narration:
        'Bilans momentów względem wyznaczonego centroidu powinien się zerować. Sprawdzamy także tożsamości A·x_C = Q_y oraz A·y_C = Q_x. Dodatkowo kontrola znaków: środek wycięcia ma x_w > 0 i y_w > 0, a centroid figury ma znaki przeciwne.',
      formula: `\\sum A_i(x_i-x_C)=${tex(resX)},\\qquad \\sum A_i(y_i-y_C)=${tex(resY)},\\qquad A\\,x_C=${tex(qy)}=Q_y`,
      caption: 'Reszty są zerowe z dokładnością numeryczną; A·x_C = Q_y i A·y_C = Q_x.',
      visual: 'diagram',
      focus: { metric: 'check' },
      emphasis: 'Bilans momentów i znaki wycięcia',
    },
  ]
  return scenes
}

export function semicircleSlotScenes(config: CentroidConfig): SolutionScene[] {
  const a = config.a
  const circleArea = Math.PI * 25 * 25
  const socketRadius = 10
  const semicircleArea = (Math.PI * socketRadius * socketRadius) / 2
  const semicircleX = (-4 * socketRadius) / (3 * Math.PI)
  const rectangleArea = 2 * socketRadius * a
  const rectangleX = a / 2
  const cutArea = semicircleArea + rectangleArea
  const removed = config.removedCentroid ?? { x: 0, y: 0 }
  const qy = config.moments.qy
  const qx = config.moments.qx
  const xC = config.centroid.x
  const yC = config.centroid.y
  const pappusVolume = (4 * Math.PI * socketRadius ** 3) / 3

  let resX = 0
  let resY = 0
  for (const part of config.parts) {
    const signed = part.negative ? -Math.abs(part.area) : part.area
    resX += signed * (part.x - xC)
    resY += signed * (part.y - yC)
  }

  const scenes: SolutionScene[] = [
    {
      title: 'Model: koło z wycięciem symetrycznym',
      narration: `Koło ma promień R = 25 mm i środek w O. Wycięcie jest symetryczne względem osi x: po lewej stronie leży półkole o promieniu r = 10 mm, a po prawej prostokąt o długości a = ${a} mm i wysokości 20 mm. Półkole ma średnicę na osi y i wystaje w lewo, a prostokąt zaczyna się na osi y i biegnie w prawo.`,
      formula: `R=25\\ \\text{mm},\\quad r=10\\ \\text{mm},\\quad a=${tex(a)}\\ \\text{mm},\\quad a\\times20=${a}\\times20\\ \\text{mm}`,
      caption: 'Oś x jest osią symetrii wycięcia, więc od razu wiadomo, że y_C = 0.',
      visual: 'diagram',
      focus: { metric: 'model' },
      emphasis: `Półkole R10 + prostokąt ${a} × 20 mm`,
    },
    {
      title: 'Części dodatnie i ujemne',
      narration:
        'Koło jest polem dodatnim. Półkole i prostokąt są polami ujemnymi. Środek półkola leży w odległości 4r/(3π) na lewo od O, a środek prostokąta na x = a/2. Suma pól ujemnych daje pole wycięcia.',
      formula: `A_k=${tex(circleArea)},\\quad A_p=-50\\pi=-${tex(semicircleArea)},\\quad A_r=-20a=-${tex(rectangleArea)}\\quad[\\text{mm}^2]`,
      caption: `x_p = −4r/(3π) = ${pl(semicircleX)} mm, x_r = a/2 = ${pl(rectangleX)} mm.`,
      visual: 'diagram',
      focus: { metric: 'parts' },
      emphasis: 'Koło dodatnie, półkole i prostokąt ujemne',
    },
    {
      title: 'Pola i pole netto',
      narration: `Pole wycięcia to suma pól półkola i prostokąta: ${pl(semicircleArea)} + ${pl(rectangleArea)} = ${pl(cutArea)} mm². Po odjęciu od pola koła otrzymujemy pole netto A = ${pl(config.area)} mm².`,
      formula: `A_w=50\\pi+20a=${tex(cutArea)}\\ \\text{mm}^2,\\qquad A=\\pi R^2-A_w=${tex(config.area)}\\ \\text{mm}^2`,
      caption: 'Pole netto jest mianownikiem współrzędnej x_C.',
      visual: 'diagram',
      focus: { metric: 'areas' },
      emphasis: `A = ${pl(config.area)} mm²`,
    },
    {
      title: 'Moment względem osi y',
      narration:
        'Koło ma środek w O, więc nie wnosi momentu względem osi y. Moment wycięcia liczymy z półkola i prostokąta. Prostokąt leży dalej od osi y i przeważa, dlatego moment wycięcia jest dodatni, a moment figury — ujemny.',
      formula: `Q_y=0-\\left[50\\pi\\left(-\\frac{4r}{3\\pi}\\right)+20a\\cdot\\frac{a}{2}\\right]=-${tex(-qy)}\\ \\text{mm}^3`,
      caption: `x_w = ${pl(removed.x)} mm; wycięcie ma środek po prawej stronie osi y.`,
      visual: 'diagram',
      focus: { metric: 'moment-y' },
      emphasis: `Q_y = ${pl(qy)} mm³`,
    },
    {
      title: 'Moment względem osi x',
      narration:
        'Półkole i prostokąt są symetryczne względem osi x, więc ich momenty względem tej osi zerują się. Moment figury Q_x = 0, a w konsekwencji y_C = 0. Oś x jest jednocześnie osią symetrii całej figury.',
      formula: `Q_x=0\\ \\text{mm}^3,\\qquad y_C=\\frac{Q_x}{A}=0\\ \\text{mm}`,
      caption: 'Symetria względem osi x jest niezależną kontrolą znaku y_C.',
      visual: 'diagram',
      focus: { metric: 'moment-x' },
      emphasis: 'Q_x = 0 ⇒ y_C = 0',
    },
    {
      title: 'Współrzędne centroidu',
      narration: `Dzielimy moment Q_y przez pole netto i otrzymujemy x_C = ${pl(xC)} mm. Współrzędna y_C = 0 mm wynika z symetrii. Centroid leży bardzo blisko O, minimalnie na lewo od środka koła.`,
      formula: `x_C=\\frac{Q_y}{A}=${tex(xC)}\\ \\text{mm},\\qquad y_C=0\\ \\text{mm}`,
      caption: 'Wynik w milimetrach; pole w mm², moment w mm³.',
      visual: 'diagram',
      focus: { metric: 'centroid' },
      emphasis: `C = (${pl(xC)}; 0) mm`,
    },
    {
      title: 'Interpretacja znaków',
      narration:
        'Wycięcie usuwa więcej materiału po prawej stronie osi y niż po lewej, więc centroid przesuwa się w lewo: x_C < 0. Symetria względem osi x utrzymuje y_C = 0. Punkt C wypada w obszarze wycięcia, co jest dopuszczalne dla figury z ubytkiem.',
      formula: `x_C=${tex(xC)}<0,\\qquad y_C=0,\\qquad x_w=${tex(removed.x)}>0`,
      caption: 'Znak x_C jest przeciwny do znaku środka wycięcia.',
      visual: 'diagram',
      focus: { metric: 'signs' },
      emphasis: 'Przesunięcie w lewo, y_C = 0',
    },
    {
      title: 'Niezależna kontrola',
      narration:
        'Kontrola Pappusa: obrót półkola R10 wokół jego średnicy daje kulę. Objętość z twierdzenia Pappusa jest równa 4πr³/3. Dodatkowo bilans momentów względem centroidu zeruje się, a tożsamości A·x_C = Q_y i A·y_C = Q_x są spełnione.',
      formula: `V=2\\pi\\cdot 50\\pi\\cdot\\frac{4r}{3\\pi}=\\frac{4\\pi r^3}{3}=${tex(pappusVolume)}\\ \\text{mm}^3,\\qquad \\sum A_i(x_i-x_C)=${tex(resX)}`,
      caption: `Reszty: ΣA(x−x_C) = ${pl(resX)} mm³, ΣA(y−y_C) = ${pl(resY)} mm³; Pappus zgodny z kulą.`,
      visual: 'diagram',
      focus: { metric: 'check' },
      emphasis: `V = ${pl(pappusVolume)} mm³`,
    },
  ]
  return scenes
}

export function stripTriangleHoleAltScenes(config: CentroidConfig): SolutionScene[] {
  const a = config.a
  const d = config.d ?? 10
  const base = a + 40
  const height = 2 * a + 25
  const stripArea = 10 * 25
  const triangleArea = (base * height) / 2
  const holeArea = Math.PI * (d / 2) ** 2
  const qy = config.moments.qy
  const qx = config.moments.qx
  const xC = config.centroid.x
  const yC = config.centroid.y

  let resX = 0
  let resY = 0
  for (const part of config.parts) {
    const signed = part.negative ? -Math.abs(part.area) : part.area
    resX += signed * (part.x - xC)
    resY += signed * (part.y - yC)
  }

  const scenes: SolutionScene[] = [
    {
      title: 'Model: listwa, trójkąt i otwór',
      narration: `Figurę tworzą trzy elementy. Pionowa listwa 10 × 25 mm leży po lewej stronie osi y, od y = ${2 * a} mm do y = ${height} mm. Trójkąt prostokątny ma podstawę a + 40 = ${base} mm i wysokość 2a + 25 = ${height} mm. Kołowy otwór ma średnicę d = ${d} mm, a jego środek leży w (${a}; ${a}) mm.`,
      formula: `a=${tex(a)}\\ \\text{mm},\\quad d=${d}\\ \\text{mm},\\quad b_t=${base}\\ \\text{mm},\\quad h_t=${height}\\ \\text{mm},\\quad (x_o;y_o)=(${a};${a})\\ \\text{mm}`,
      caption: 'Początek O leży w dolnym lewym narożu trójkąta, oś x biegnie wzdłuż jego podstawy.',
      visual: 'diagram',
      focus: { metric: 'model' },
      emphasis: `Listwa 10 × 25, trójkąt ${base} × ${height}, otwór d = ${d}`,
    },
    {
      title: 'Części dodatnie i ujemne',
      narration:
        'Listwa i trójkąt są polami dodatnimi. Otwór jest polem ujemnym. Środek listwy leży w połowie jej szerokości i wysokości, środek trójkąta w jednej trzeciej podstawy i wysokości od kąta prostego, a środek otworu w punkcie (a; a).',
      formula: `A_L=10\\cdot25=${tex(stripArea)},\\quad A_t=\\frac{b_t h_t}{2}=${tex(triangleArea)},\\quad A_o=-\\pi\\left(\\frac{d}{2}\\right)^2=-${tex(holeArea)}\\quad[\\text{mm}^2]`,
      caption: `Listwa: (−5; ${pl(2 * a + 12.5)}) mm, trójkąt: (${pl(base / 3)}; ${pl(height / 3)}) mm, otwór: (${a}; ${a}) mm.`,
      visual: 'diagram',
      focus: { metric: 'parts' },
      emphasis: 'Listwa i trójkąt dodatnie, otwór ujemny',
    },
    {
      title: 'Pola i pole netto',
      narration: `Suma pól dodatnich wynosi ${pl(stripArea)} + ${pl(triangleArea)} = ${pl(stripArea + triangleArea)} mm². Po odjęciu otworu ${pl(holeArea)} mm² otrzymujemy pole netto A = ${pl(config.area)} mm².`,
      formula: `A=A_L+A_t-A_o=${tex(stripArea)}+${tex(triangleArea)}-${tex(holeArea)}=${tex(config.area)}\\ \\text{mm}^2`,
      caption: 'Pole netto jest mianownikiem obu współrzędnych centroidu.',
      visual: 'diagram',
      focus: { metric: 'areas' },
      emphasis: `A = ${pl(config.area)} mm²`,
    },
    {
      title: 'Moment względem osi y',
      narration:
        'Moment względem osi y to suma pól pomnożonych przez współrzędną x ich środków. Listwa leży po lewej stronie osi y, więc wnosi moment ujemny. Duży trójkąt wnosi moment dodatni, a otwór odejmuje moment proporcjonalny do x = a = 10 mm. Wypadkowy moment jest dodatni.',
      formula: `Q_y=250\\cdot(-5)+1125\\cdot\\frac{50}{3}-25\\pi\\cdot10=${tex(qy)}\\ \\text{mm}^3`,
      caption: 'Dodatni Q_y zapowiada x_C > 0, czyli przesunięcie w prawo od osi y.',
      visual: 'diagram',
      focus: { metric: 'moment-y' },
      emphasis: `Q_y = ${pl(qy)} mm³`,
    },
    {
      title: 'Moment względem osi x',
      narration:
        'Analogicznie mnożymy pola przez współrzędne y środków. Listwa leży wysoko, trójkąt ma środek na y = 15 mm, a otwór na y = 10 mm. Wszystkie momenty są dodatnie poza ujemnym wkładem otworu, więc wypadkowy moment Q_x jest dodatni.',
      formula: `Q_x=250\\cdot32{,}5+1125\\cdot15-25\\pi\\cdot10=${tex(qx)}\\ \\text{mm}^3`,
      caption: 'Otwór zmniejsza oba momenty, bo leży w dodatniej części układu.',
      visual: 'diagram',
      focus: { metric: 'moment-x' },
      emphasis: `Q_x = ${pl(qx)} mm³`,
    },
    {
      title: 'Współrzędne centroidu',
      narration: `Dzielimy momenty przez pole netto. Otrzymujemy x_C = ${pl(xC)} mm oraz y_C = ${pl(yC)} mm. Centroid leży w trójkącie, w prawo od listwy i powyżej otworu.`,
      formula: `x_C=\\frac{Q_y}{A}=${tex(xC)}\\ \\text{mm},\\qquad y_C=\\frac{Q_x}{A}=${tex(yC)}\\ \\text{mm}`,
      caption: 'Wynik w milimetrach; pola w mm², momenty w mm³.',
      visual: 'diagram',
      focus: { metric: 'centroid' },
      emphasis: `C = (${pl(xC)}; ${pl(yC)}) mm`,
    },
    {
      title: 'Interpretacja znaków',
      narration:
        'Dominuje duży trójkąt, więc centroid jest daleko od osi y. Otwór leży poniżej i na lewo od centroidu pełnej figury, dlatego jego usunięcie przesuwa wynik lekko w prawo i w górę. Otrzymujemy x_C > 0 i y_C > 0, a punkt C pozostaje w materiale.',
      formula: `x_C=${tex(xC)}>0,\\qquad y_C=${tex(yC)}>0,\\qquad (x_o;y_o)=(${a};${a})`,
      caption: 'Centroid pozostaje w trójkącie, powyżej i na prawo od otworu.',
      visual: 'diagram',
      focus: { metric: 'signs' },
      emphasis: 'Centroid w trójkącie',
    },
    {
      title: 'Niezależna kontrola',
      narration:
        'Bilans momentów względem wyznaczonego centroidu powinien się zerować. Sprawdzamy także tożsamości A·x_C = Q_y oraz A·y_C = Q_x. Dodatkowo kontrolujemy, że pole otworu wchodzi do sumy z przeciwnym znakiem.',
      formula: `\\sum A_i(x_i-x_C)=${tex(resX)},\\qquad \\sum A_i(y_i-y_C)=${tex(resY)},\\qquad A\\,y_C=${tex(qx)}=Q_x`,
      caption: 'Reszty są zerowe z dokładnością numeryczną; kontrola obejmuje listwę, trójkąt i otwór.',
      visual: 'diagram',
      focus: { metric: 'check' },
      emphasis: 'Bilans momentów i znak otworu',
    },
  ]
  return scenes
}

export function stripTriangleHoleScenes(config: CentroidConfig): SolutionScene[] {
  const a = config.a
  const d = config.d ?? 10
  const base = a + 40
  const height = 2 * a + 25
  const stripArea = 10 * 25
  const triangleArea = (base * height) / 2
  const holeArea = Math.PI * (d / 2) ** 2
  const qy = config.moments.qy
  const qx = config.moments.qx
  const xC = config.centroid.x
  const yC = config.centroid.y

  let resX = 0
  let resY = 0
  for (const part of config.parts) {
    const signed = part.negative ? -Math.abs(part.area) : part.area
    resX += signed * (part.x - xC)
    resY += signed * (part.y - yC)
  }

  const scenes: SolutionScene[] = [
    {
      title: 'Model: listwa, trójkąt i otwór',
      narration: `Pionowa listwa ma 10 × 25 mm i leży na lewo od osi y. Trójkąt prostokątny ma podstawę a + 40 = ${base} mm i wysokość 2a + 25 = ${height} mm; jego kąt prosty leży w początku O. Kołowy otwór ma średnicę d = ${d} mm i środek w (a; a) = (${a}; ${a}) mm.`,
      formula: `a=${tex(a)}\\ \\text{mm},\\quad d=${tex(d)}\\ \\text{mm},\\quad b_t=${base}\\ \\text{mm},\\quad h_t=${height}\\ \\text{mm}`,
      caption: 'Oś x biegnie wzdłuż podstawy trójkąta, oś y wzdłuż jego lewej krawędzi.',
      visual: 'diagram',
      focus: { metric: 'model' },
      emphasis: `Trójkąt ${base} × ${height} mm, otwór R = ${pl(d / 2)} mm`,
    },
    {
      title: 'Części dodatnie i otwór ujemny',
      narration:
        'Listwa i trójkąt są polami dodatnimi. Otwór jest polem ujemnym: usuwamy z materiału koło o środku (a; a). Jego pole liczymy ze wzoru πd²/4, a w sumie pól i momentów odejmujemy tę wartość.',
      formula: `A_L=10\\cdot25=${pl(stripArea)},\\quad A_t=\\frac{${base}\\cdot${height}}{2}=${pl(triangleArea)},\\quad A_o=\\frac{\\pi d^2}{4}=${pl(holeArea)}\\quad[\\text{mm}^2]`,
      caption:
        'Listwa ma środek w (−5; 2a + 12,5), trójkąt w ((a+40)/3; (2a+25)/3), a otwór w (a; a); otwór odejmujemy.',
      visual: 'diagram',
      focus: { metric: 'parts' },
      emphasis: 'Dwa pola dodatnie i jedno ujemne',
    },
    {
      title: 'Pole netto figury',
      narration: `Sumujemy pola z uwzględnieniem znaku otworu. Pole netto A jest mianownikiem obu współrzędnych centroidu.`,
      formula: `A=A_L+A_t-A_o=${pl(stripArea)}+${pl(triangleArea)}-${pl(holeArea)}=${pl(config.area)}\\ \\text{mm}^2`,
      caption: `A_L = ${pl(stripArea)} mm², A_t = ${pl(triangleArea)} mm², A_o = ${pl(holeArea)} mm², A = ${pl(config.area)} mm².`,
      visual: 'diagram',
      focus: { metric: 'areas' },
      emphasis: `A = ${pl(config.area)} mm²`,
    },
    {
      title: 'Moment względem osi y',
      narration:
        'Moment względem osi y to suma x_i·A_i. Listwa leży po lewej stronie osi y, więc jej udział jest ujemny. Trójkąt wnosi duży moment dodatni, a otwór odejmuje moment proporcjonalny do x = a.',
      formula: `Q_y=A_L(-5)+A_t\\cdot\\frac{a+40}{3}-A_o\\cdot a=${pl(qy)}\\ \\text{mm}^3`,
      caption: `Ramiona: x_L = −5 mm, x_t = ${pl(base / 3)} mm, x_o = ${pl(a)} mm.`,
      visual: 'diagram',
      focus: { metric: 'moment-y' },
      emphasis: `Q_y = ${pl(qy)} mm³`,
    },
    {
      title: 'Moment względem osi x',
      narration:
        'Analogicznie sumujemy y_i·A_i. Listwa jest wysoko (y = 2a + 12,5), trójkąt ma środek na wysokości (2a + 25)/3, a otwór leży nisko, na y = a, więc zmniejsza moment figury.',
      formula: `Q_x=A_L\\left(2a+\\frac{25}{2}\\right)+A_t\\cdot\\frac{2a+25}{3}-A_o\\cdot a=${pl(qx)}\\ \\text{mm}^3`,
      caption: `y_L = ${pl(height - 12.5)} mm, y_t = ${pl(height / 3)} mm, y_o = ${pl(a)} mm.`,
      visual: 'diagram',
      focus: { metric: 'moment-x' },
      emphasis: `Q_x = ${pl(qx)} mm³`,
    },
    {
      title: 'Współrzędne centroidu',
      narration: `Dzielimy momenty przez pole netto. Otrzymujemy x_C = ${pl(xC)} mm oraz y_C = ${pl(yC)} mm. Centroid leży w trójkącie, powyżej otworu i na prawo od listwy.`,
      formula: `x_C=\\frac{Q_y}{A}=\\frac{${tex(qy)}}{${tex(config.area)}}=${tex(xC)}\\ \\text{mm},\\qquad y_C=\\frac{Q_x}{A}=\\frac{${tex(qx)}}{${tex(config.area)}}=${tex(yC)}\\ \\text{mm}`,
      caption: 'Wynik w milimetrach; pola w mm², momenty w mm³.',
      visual: 'diagram',
      focus: { metric: 'centroid' },
      emphasis: `C = (${pl(xC)}; ${pl(yC)}) mm`,
    },
    {
      title: 'Interpretacja znaków',
      narration:
        'Oba wyniki są dodatnie: dominuje duży trójkąt, więc centroid leży daleko od osi y. Otwór jest położony poniżej centroidu, dlatego jego usunięcie podnosi y_C. Wpływ otworu na x_C jest niewielki, bo leży blisko środka trójkąta.',
      formula: `x_C=${tex(xC)}>0,\\qquad y_C=${tex(yC)}>0`,
      caption: 'Centroid leży w materiale trójkąta; otwór jest polem ujemnym w dolnej części figury.',
      visual: 'diagram',
      focus: { metric: 'signs' },
      emphasis: 'Centroid w trójkącie, nad otworem',
    },
    {
      title: 'Niezależna kontrola',
      narration:
        'Bilans momentów względem wyznaczonego centroidu powinien się zerować. Sprawdzamy też tożsamości A·x_C = Q_y i A·y_C = Q_x oraz to, że otwór wchodzi do sumy z przeciwnym znakiem.',
      formula: `\\sum A_i(x_i-x_C)=${tex(resX)},\\qquad \\sum A_i(y_i-y_C)=${tex(resY)};\\qquad A\\,x_C=${tex(qy)}=Q_y`,
      caption: 'Reszty są zerowe z dokładnością numeryczną; kontrola obejmuje listwę, trójkąt i otwór.',
      visual: 'diagram',
      focus: { metric: 'check' },
      emphasis: 'Bilans momentów i znak otworu',
    },
  ]
  return scenes
}

export function triangleRectangleSemicircleScenes(config: CentroidConfig): SolutionScene[] {
  const a = config.a
  const d = config.d ?? 10
  const base = 5 * a
  const height = 3 * a
  const triangleBase = 5 * a - 2 * d
  const triangleArea = (triangleBase * height) / 2
  const rectangleArea = 2 * d * height
  const semicircleArea = (Math.PI * d * d) / 2
  const centerX = 5 * a - d
  const qy = config.moments.qy
  const qx = config.moments.qx
  const xC = config.centroid.x
  const yC = config.centroid.y
  const pappusVolume = config.pappus
    ? 2 * Math.PI * config.pappus.area * config.pappus.distance
    : (4 * Math.PI * d ** 3) / 3

  let resX = 0
  let resY = 0
  for (const part of config.parts) {
    const signed = part.negative ? -Math.abs(part.area) : part.area
    resX += signed * (part.x - xC)
    resY += signed * (part.y - yC)
  }

  const scenes: SolutionScene[] = [
    {
      title: 'Model: trójkąt, prostokąt i półkole',
      narration: `Figura ma podstawę 5a = ${base} mm i pionową krawędź 3a = ${height} mm. Trójkąt prostokątny ma podstawę 5a − 2d = ${triangleBase} mm. Nad prostokątem 2d × 3a = ${2 * d} × ${height} mm leży półkole o promieniu d = ${d} mm, którego środek znajduje się w (5a − d; 3a) = (${centerX}; ${height}) mm.`,
      formula: `a=${tex(a)}\\ \\text{mm},\\quad d=${tex(d)}\\ \\text{mm},\\quad b=5a=${base}\\ \\text{mm},\\quad h=3a=${height}\\ \\text{mm}`,
      caption:
        'Oś x biegnie wzdłuż podstawy, oś y wzdłuż lewej krawędzi figury; początek O leży w lewym dolnym narożu.',
      visual: 'diagram',
      focus: { metric: 'model' },
      emphasis: `Podstawa 5a = ${base} mm, wysokość 3a = ${height} mm`,
    },
    {
      title: 'Podział na trzy pola dodatnie',
      narration:
        'Figurę dzielimy na trójkąt prostokątny, prostokąt pod półkolem i półkole. Wszystkie trzy części są materiałem, więc ich pola wchodzą do sumy ze znakiem plus. Trójkąt ma środek w jednej trzeciej podstawy i wysokości, prostokąt w połowie szerokości i wysokości, a półkole w odległości 4d/(3π) nad swoją średnicą.',
      formula: `A_1=\\frac{(5a-2d)\\cdot3a}{2}=${pl(triangleArea)},\\quad A_2=2d\\cdot3a=${pl(rectangleArea)},\\quad A_3=\\frac{\\pi d^2}{2}=${pl(semicircleArea)}\\quad[\\text{mm}^2]`,
      caption: `Środek trójkąta: (${pl(triangleBase / 3)}; ${pl(height / 3)}) mm, prostokąta: (${pl(centerX)}; ${pl(height / 2)}) mm, półkola: (${pl(centerX)}; ${pl(height + (4 * d) / (3 * Math.PI))}) mm.`,
      visual: 'diagram',
      focus: { metric: 'parts' },
      emphasis: 'Trzy części dodatnie',
    },
    {
      title: 'Pole netto figury',
      narration:
        'Pole netto jest sumą pól trójkąta, prostokąta i półkola. Ta wartość jest mianownikiem obu współrzędnych centroidu.',
      formula: `A=A_1+A_2+A_3=${pl(triangleArea)}+${pl(rectangleArea)}+${pl(semicircleArea)}=${pl(config.area)}\\ \\text{mm}^2`,
      caption: `A_1 = ${pl(triangleArea)} mm², A_2 = ${pl(rectangleArea)} mm², A_3 = ${pl(semicircleArea)} mm².`,
      visual: 'diagram',
      focus: { metric: 'areas' },
      emphasis: `A = ${pl(config.area)} mm²`,
    },
    {
      title: 'Moment względem osi y',
      narration:
        'Moment względem osi y sumujemy jako x_i·A_i. Trójkąt ma środek w jednej trzeciej swojej podstawy, a prostokąt i półkole mają wspólną współrzędną x = 5a − d. Wszystkie udziały są dodatnie.',
      formula: `Q_y=A_1\\cdot\\frac{5a-2d}{3}+A_2(5a-d)+A_3(5a-d)=${pl(qy)}\\ \\text{mm}^3`,
      caption: `x_1 = ${pl(triangleBase / 3)} mm, x_2 = x_3 = ${pl(centerX)} mm.`,
      visual: 'diagram',
      focus: { metric: 'moment-y' },
      emphasis: `Q_y = ${pl(qy)} mm³`,
    },
    {
      title: 'Moment względem osi x',
      narration:
        'Moment względem osi x rośnie wraz z wysokością środka części. Półkole leży najwyżej, więc jego udział jest największy względem własnego pola. Trójkąt ma y = 3a/3 = a, a prostokąt y = 3a/2.',
      formula: `Q_x=A_1\\cdot\\frac{3a}{3}+A_2\\cdot\\frac{3a}{2}+A_3\\left(3a+\\frac{4d}{3\\pi}\\right)=${pl(qx)}\\ \\text{mm}^3`,
      caption: `y_1 = ${pl(height / 3)} mm, y_2 = ${pl(height / 2)} mm, y_3 = ${pl(height + (4 * d) / (3 * Math.PI))} mm.`,
      visual: 'diagram',
      focus: { metric: 'moment-x' },
      emphasis: `Q_x = ${pl(qx)} mm³`,
    },
    {
      title: 'Współrzędne centroidu',
      narration: `Dzielimy momenty przez pole netto. Otrzymujemy x_C = ${pl(xC)} mm i y_C = ${pl(yC)} mm. Centroid leży w materiale, poniżej półkola i na prawo od osi y.`,
      formula: `x_C=\\frac{Q_y}{A}=\\frac{${tex(qy)}}{${tex(config.area)}}=${tex(xC)}\\ \\text{mm},\\qquad y_C=\\frac{Q_x}{A}=\\frac{${tex(qx)}}{${tex(config.area)}}=${tex(yC)}\\ \\text{mm}`,
      caption: 'Wynik w milimetrach; pola w mm², momenty w mm³.',
      visual: 'diagram',
      focus: { metric: 'centroid' },
      emphasis: `C = (${pl(xC)}; ${pl(yC)}) mm`,
    },
    {
      title: 'Interpretacja położenia',
      narration:
        'Duży trójkąt i prostokąt decydują o położeniu centroidu, a stosunkowo lekkie półkole przesuwa go w prawo i w górę. Oba wyniki są dodatnie, bo cała figura leży w pierwszej ćwiartce. Centroid znajduje się w materiale, poniżej łuku.',
      formula: `x_C=${tex(xC)}>0,\\qquad y_C=${tex(yC)}>0`,
      caption: 'Półkole podnosi y_C, a prostokąt i półkole przesuwają x_C w prawo.',
      visual: 'diagram',
      focus: { metric: 'signs' },
      emphasis: 'Centroid w prawej części figury, pod łukiem',
    },
    {
      title: 'Kontrola Pappusa i bilans momentów',
      narration:
        'Bilans momentów względem centroidu zeruje się, a tożsamości A·x_C = Q_y i A·y_C = Q_x potwierdzają rachunek. Dodatkowo obrót półkola wokół średnicy daje kulę: objętość z twierdzenia Pappusa jest równa 4πd³/3, co niezależnie sprawdza położenie środka półkola.',
      formula: `\\sum A_i(x_i-x_C)=${tex(resX)},\\qquad \\sum A_i(y_i-y_C)=${tex(resY)};\\qquad V_P=2\\pi A_3\\frac{4d}{3\\pi}=\\frac{4\\pi d^3}{3}=${tex(pappusVolume)}\\ \\text{mm}^3`,
      caption: 'Reszty są zerowe z dokładnością numeryczną; kontrola obejmuje trzy części i półkole.',
      visual: 'diagram',
      focus: { metric: 'check' },
      emphasis: `Pappus: V = ${pl(pappusVolume, 0)} mm³`,
    },
  ]
  return scenes
}

export function triangleRectangleSemicircleAltScenes(config: CentroidConfig): SolutionScene[] {
  const a = config.a
  const d = config.d ?? 0
  const base = 5 * a - 2 * d
  const height = 3 * a
  const semiCenter = 5 * a - d
  const [triangle, rectangle, semicircle] = config.parts
  const semiArm = (4 * d) / (3 * Math.PI)
  const pappusVolume = 2 * Math.PI * semicircle.area * semiArm
  const sphereVolume = (4 * Math.PI * d ** 3) / 3
  const residual = config.parts.reduce(
    (sum, part) => {
      const signed = part.negative ? -Math.abs(part.area) : part.area
      return {
        x: sum.x + signed * (part.x - config.centroid.x),
        y: sum.y + signed * (part.y - config.centroid.y),
      }
    },
    { x: 0, y: 0 },
  )

  const scenes = [
    sourceScene(
      'Model i geometria figury',
      `Figura ma całkowitą podstawę 5a = ${pl(5 * a)} mm i pionową krawędź 3a = ${pl(height)} mm. Trójkąt prostokątny zajmuje lewą część o podstawie 5a − 2d = ${pl(base)} mm i wysokości 3a. Po prawej stoi prostokąt o szerokości 2d = ${pl(2 * d)} mm, a na jego górnej krawędzi spoczywa półkole o promieniu d = ${pl(d)} mm. Środek półkola leży w (${pl(semiCenter)}; ${pl(height)}) mm.`,
      `b=5a-2d=${tex(base)}\\ \\mathrm{mm},\\qquad h=3a=${tex(height)}\\ \\mathrm{mm},\\qquad R=d=${tex(d)}\\ \\mathrm{mm}`,
      'Początek O leży w lewym dolnym narożu, oś x biegnie wzdłuż podstawy, a oś y wzdłuż lewej krawędzi.',
      'model',
      `Półkole R = d = ${pl(d)} mm na wysokości 3a`,
    ),
    sourceScene(
      'Podział na trzy części dodatnie',
      `Figurę dzielimy na trójkąt (1), prostokąt (2) i półkole (3). Wszystkie części mają pola dodatnie, bo żadna nie jest wycięciem. Trójkąt ma centroid w (b/3; h/3) = (${pl(triangle.x)}; ${pl(triangle.y)}) mm, prostokąt w (${pl(rectangle.x)}; ${pl(rectangle.y)}) mm, a półkole w (${pl(semicircle.x)}; ${pl(semicircle.y)}) mm.`,
      `C_1=(${tex(triangle.x)};\\ ${tex(triangle.y)}),\\qquad C_2=(${tex(rectangle.x)};\\ ${tex(rectangle.y)}),\\qquad C_3=(${tex(semicircle.x)};\\ ${tex(semicircle.y)})`,
      `Współrzędna y półkola to 3a + 4d/(3π) = ${pl(semicircle.y)} mm, mierzona od podstawy.`,
      'parts',
      'Trzy części dodatnie: trójkąt, prostokąt, półkole',
    ),
    sourceScene(
      'Pola części i pole netto',
      `Pole trójkąta wynosi (5a − 2d)·3a/2 = ${pl(triangle.area)} mm², pole prostokąta 2d·3a = ${pl(rectangle.area)} mm², a pole półkola πd²/2 = ${pl(semicircle.area)} mm². Suma tych pól daje pole netto figury, które jest mianownikiem obu współrzędnych centroidu.`,
      `A=A_t+A_r+A_s=${tex(triangle.area)}+${tex(rectangle.area)}+${tex(semicircle.area)}=${tex(config.area)}\\ \\mathrm{mm}^2`,
      `A_t = ${pl(triangle.area)} mm², A_r = ${pl(rectangle.area)} mm², A_s = ${pl(semicircle.area)} mm².`,
      'areas',
      `A = ${pl(config.area)} mm²`,
    ),
    sourceScene(
      'Moment statyczny względem osi y',
      `Moment względem osi y sumujemy jako x_i·A_i. Największy wkład wnosi prostokąt, którego środek leży daleko od osi y. Półkole ma ten sam x co prostokąt, bo jest styczne do prawej krawędzi figury. Otrzymujemy Q_y = ${pl(config.moments.qy)} mm³.`,
      `Q_y=A_tx_1+A_rx_2+A_sx_3=${tex(triangle.area)}\\cdot${tex(triangle.x)}+${tex(rectangle.area)}\\cdot${tex(rectangle.x)}+${tex(semicircle.area)}\\cdot${tex(semicircle.x)}=${tex(config.moments.qy)}\\ \\mathrm{mm}^3`,
      `x_1 = ${pl(triangle.x)} mm, x_2 = x_3 = ${pl(rectangle.x)} mm.`,
      'moment-y',
      `Q_y = ${pl(config.moments.qy)} mm³`,
    ),
    sourceScene(
      'Moment statyczny względem osi x',
      `Moment względem osi x używa iloczynów y_i·A_i. Półkole leży najwyżej, dlatego mimo małego pola wnosi zauważalny udział. Trójkąt ma środek na wysokości h/3 = ${pl(triangle.y)} mm, prostokąt h/2 = ${pl(rectangle.y)} mm, a półkole ${pl(semicircle.y)} mm. Otrzymujemy Q_x = ${pl(config.moments.qx)} mm³.`,
      `Q_x=A_ty_1+A_ry_2+A_sy_3=${tex(triangle.area)}\\cdot${tex(triangle.y)}+${tex(rectangle.area)}\\cdot${tex(rectangle.y)}+${tex(semicircle.area)}\\cdot${tex(semicircle.y)}=${tex(config.moments.qx)}\\ \\mathrm{mm}^3`,
      'Wysokości środków mierzymy od podstawy y = 0.',
      'moment-x',
      `Q_x = ${pl(config.moments.qx)} mm³`,
    ),
    sourceScene(
      'Współrzędne centroidu',
      `Dzielimy momenty przez pole netto. Otrzymujemy x_C = ${pl(config.centroid.x)} mm oraz y_C = ${pl(config.centroid.y)} mm. Centroid leży w trójkącie, poniżej półkola i poniżej połowy wysokości 3a.`,
      `x_C=\\frac{Q_y}{A}=\\frac{${tex(config.moments.qy)}}{${tex(config.area)}}=${tex(config.centroid.x)}\\ \\mathrm{mm};\\qquad y_C=\\frac{Q_x}{A}=\\frac{${tex(config.moments.qx)}}{${tex(config.area)}}=${tex(config.centroid.y)}\\ \\mathrm{mm}`,
      `C = (${pl(config.centroid.x)}; ${pl(config.centroid.y)}) mm.`,
      'centroid',
      `C = (${pl(config.centroid.x)}; ${pl(config.centroid.y)}) mm`,
    ),
    sourceScene(
      'Interpretacja położenia',
      `Półkole ma małe pole w porównaniu z trójkątem i prostokątem, więc nie przesuwa centroidu wysoko. Przesunięcie w prawo wynika z prostokąta i półkola, których środki leżą w x = ${pl(rectangle.x)} mm. Wartość y_C = ${pl(config.centroid.y)} mm jest mniejsza od h/2 = ${pl(height / 2)} mm, więc centroid pozostaje w dolnej części figury.`,
      `x_C=${tex(config.centroid.x)}>0,\\qquad y_C=${tex(config.centroid.y)}>0,\\qquad y_C<\\frac{3a}{2}=${tex(height / 2)}\\ \\mathrm{mm}`,
      'Centroid leży w materiale trójkąta, w prawej części figury.',
      'interpretation',
      'Centroid w trójkącie, poniżej półkola',
    ),
    sourceScene(
      'Kontrola Pappusa i bilansu momentów',
      `Obrót półkola wokół jego średnicy daje kulę o promieniu d. Objętość z twierdzenia Pappusa V = 2π·A_s·(4d/3π) = ${pl(pappusVolume)} mm³ zgadza się z objętością kuli 4πd³/3 = ${pl(sphereVolume)} mm³. Bilans momentów względem centroidu również się zeruje.`,
      `V=2\\pi\\cdot${tex(semicircle.area)}\\cdot${tex(semiArm)}=${tex(pappusVolume)}\\ \\mathrm{mm}^3=\\frac{4\\pi d^3}{3};\\qquad \\sum A_i(x_i-x_C)=${tex(residual.x)},\\quad \\sum A_i(y_i-y_C)=${tex(residual.y)}`,
      'Reszty są zerowe z dokładnością numeryczną; kontrola obejmuje wszystkie trzy części.',
      'check',
      `V = ${pl(pappusVolume)} mm³ = 4πd³/3`,
    ),
  ]
  return scenes
}
