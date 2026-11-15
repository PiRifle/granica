import type { SolutionScene } from '../../../types'
import type { CentroidConfig } from './configs'
import { pl, tex } from '../core/source-task'

function residuals(config: CentroidConfig) {
  let x = 0
  let y = 0
  for (const part of config.parts) {
    const signed = part.negative ? -Math.abs(part.area) : part.area
    x += signed * (part.x - config.centroid.x)
    y += signed * (part.y - config.centroid.y)
  }
  return { x, y }
}

function scene(data: Omit<SolutionScene, 'visual'>): SolutionScene {
  return { visual: 'diagram', ...data }
}

export function figureOneScenes(config: CentroidConfig): SolutionScene[] {
  const a = config.a
  const d = config.d ?? 0
  const [cap, base, strip] = config.parts
  const notch = d - 2 * a - 2
  const residual = residuals(config)
  const { area, moments, centroid } = config

  return [
    scene({
      title: 'Figura i układ odniesienia',
      narration: `Figura składa się z czaszy kołowej o cięciwie d = ${pl(d)} mm i strzałce 15 mm, lewej podstawy 2a × a = ${pl(2 * a)} × ${pl(a)} mm oraz prawej pionowej listwy 2 × 2a = 2 × ${pl(2 * a)} mm. Między podstawą a listwą pozostaje prostokątne wycięcie ${pl(notch)} × ${pl(a)} mm. Początek O leży w lewym dolnym narożu podstawy, oś x biegnie wzdłuż jej dolnej krawędzi, a oś y wzdłuż lewej krawędzi.`,
      formula: `d=${tex(d)}\\ \\text{mm},\\qquad a=${tex(a)}\\ \\text{mm},\\qquad h_s=15\\ \\text{mm},\\qquad h_w=${tex(notch)}\\ \\text{mm}`,
      caption:
        'Cięciwa czaszy ma długość d, a nie 2d. Strzałka 15 mm jest mierzona od cięciwy do najwyższego punktu łuku.',
      focus: { metric: 'model' },
      emphasis: `Czasza d = ${pl(d)} mm, strzałka 15 mm, listwa 2 × ${pl(2 * a)} mm`,
    }),
    scene({
      title: 'Podział na części dodatnie',
      narration:
        'Figurę dzielimy na trzy części o dodatnich polach: czaszę (1), lewą podstawę (2) i prawą listwę (3). Wycięcie nie jest osobnym polem ujemnym — jest pustym prostokątem między podstawą i listwą, więc jego brak wynika wprost z geometrii części.',
      formula: `A_c=${tex(cap.area)},\\qquad A_L=${tex(base.area)},\\qquad A_P=${tex(strip.area)}\\quad[\\text{mm}^2]`,
      caption: `Numery 1–3 na rysunku odpowiadają częściom. Pole wycięcia ${pl(notch)} × ${pl(a)} mm nie wchodzi do sumy pól.`,
      focus: { metric: 'parts' },
      emphasis: 'Trzy części dodatnie, wycięcie puste',
    }),
    scene({
      title: 'Pola części i pole netto',
      narration:
        'Pole czaszy wynika ze wzoru na odcinek kołowy, pole podstawy to 2a·a, a pole listwy to 2·2a. Suma pól dodatnich daje pole netto figury, które będzie mianownikiem obu współrzędnych centroidu.',
      formula: `A=A_c+A_L+A_P=${tex(cap.area)}+${tex(base.area)}+${tex(strip.area)}=${tex(area)}\\ \\text{mm}^2`,
      caption: `A_c = ${pl(cap.area)} mm², A_L = ${pl(base.area)} mm², A_P = ${pl(strip.area)} mm².`,
      focus: { metric: 'areas' },
      emphasis: `A = ${pl(area)} mm²`,
    }),
    scene({
      title: 'Momenty względem osi y',
      narration:
        'Moment statyczny względem osi y to suma iloczynów x_i·A_i. Współrzędna x czaszy wynosi d/2 z symetrii, podstawy a, a listwy d − 1. Największy wkład wnosi duża czasza.',
      formula: `Q_y=x_cA_c+x_LA_L+x_PA_P=${tex(cap.area)}\\cdot${tex(cap.x)}+${tex(base.area)}\\cdot${tex(base.x)}+${tex(strip.area)}\\cdot${tex(strip.x)};\\qquad Q_y=${tex(moments.qy)}\\ \\text{mm}^3`,
      caption: `Ramiona x_i mierzymy od osi y; dla listwy x = d − 1 = ${pl(strip.x)} mm.`,
      focus: { metric: 'moment-y' },
      emphasis: `Q_y = ${pl(moments.qy)} mm³`,
    }),
    scene({
      title: 'Momenty względem osi x',
      narration:
        'Moment względem osi x używa iloczynów y_i·A_i. Czasza ma środek na wysokości a + y_odcinka, podstawa a/2, a listwa leży na osi x, więc jej y = 0 i nie wnosi udziału do Q_x.',
      formula: `Q_x=y_cA_c+y_LA_L+y_PA_P=${tex(cap.area)}\\cdot${tex(cap.y)}+${tex(base.area)}\\cdot${tex(base.y)}+${tex(strip.area)}\\cdot${tex(strip.y)};\\qquad Q_x=${tex(moments.qx)}\\ \\text{mm}^3`,
      caption: `Wysokość środka czaszy to a + ${pl(cap.y - a)} = ${pl(cap.y)} mm; listwa wnosi zero do Q_x.`,
      focus: { metric: 'moment-x' },
      emphasis: `Q_x = ${pl(moments.qx)} mm³`,
    }),
    scene({
      title: 'Współrzędne centroidu',
      narration: `Dzielimy momenty przez pole netto. Otrzymujemy x_C = ${pl(centroid.x)} mm oraz y_C = ${pl(centroid.y)} mm. Centroid leży w czaszy, powyżej pustego wycięcia.`,
      formula: `x_C=\\frac{Q_y}{A}=\\frac{${tex(moments.qy)}}{${tex(area)}}=${tex(centroid.x)}\\ \\text{mm};\\qquad y_C=\\frac{Q_x}{A}=\\frac{${tex(moments.qx)}}{${tex(area)}}=${tex(centroid.y)}\\ \\text{mm}`,
      caption: 'Wynik jest w milimetrach; pola w mm², momenty w mm³.',
      focus: { metric: 'centroid' },
      emphasis: `C = (${pl(centroid.x)}; ${pl(centroid.y)}) mm`,
    }),
    scene({
      title: 'Interpretacja położenia',
      narration: `Wycięcie usuwa materiał przy dnie, więc górna czasza zyskuje na znaczeniu i centroid przesuwa się w górę. Lewa podstawa jest szersza od prawej listwy, dlatego x_C wypada nieco na lewo od osi symetrii czaszy (d/2 = ${pl(d / 2)} mm).`,
      formula: `x_C=${tex(centroid.x)}>0,\\qquad y_C=${tex(centroid.y)}>0,\\qquad x_C<\\frac{d}{2}=${tex(d / 2)}\\ \\text{mm}`,
      caption: 'Centroid leży w materiale czaszy, nad pustym wycięciem.',
      focus: { metric: 'interpretation' },
      emphasis: 'Centroid w czaszy, nad wycięciem',
    }),
    scene({
      title: 'Kontrola bilansu momentów',
      narration:
        'Niezależny bilans momentów względem wyznaczonego centroidu powinien się zerować. Sprawdzamy także tożsamości A·x_C = Q_y oraz A·y_C = Q_x.',
      formula: `\\sum A_i(x_i-x_C)=${tex(residual.x)};\\qquad \\sum A_i(y_i-y_C)=${tex(residual.y)};\\qquad A\\,x_C=${tex(moments.qy)}=Q_y`,
      caption: 'Reszty są zerowe z dokładnością numeryczną; kontrola obejmuje wszystkie trzy części.',
      focus: { metric: 'check' },
      emphasis: 'Bilans momentów względem C',
    }),
  ]
}

export function figureTwoScenes(config: CentroidConfig): SolutionScene[] {
  const a = config.a
  const [circle, rectangle, triangle] = config.parts
  const rectangleArea = Math.abs(rectangle.area)
  const triangleArea = Math.abs(triangle.area)
  const cutArea = rectangleArea + triangleArea
  const removedX = (rectangleArea * rectangle.x + triangleArea * triangle.x) / cutArea
  const removedY = (rectangleArea * rectangle.y + triangleArea * triangle.y) / cutArea
  const residual = residuals(config)
  const { area, moments, centroid } = config

  return [
    scene({
      title: 'Koło, wycięcie i ścięcie 45°',
      narration: `Koło ma promień R = 25 mm i środek w O. Wycięcie ma szerokość 2a = ${pl(2 * a)} mm i wysokość a = ${pl(a)} mm, a jego dolna krawędź leży na osi x. Lewe naroże jest ścięte pod 45°, więc dno wycięcia sięga a = ${pl(a)} mm w lewo od osi y. Nad wycięciem pozostaje pas materiału o grubości 5 mm.`,
      formula: `R=25\\ \\text{mm},\\qquad a=${tex(a)}\\ \\text{mm},\\qquad b_w=${tex(2 * a)}\\ \\text{mm},\\qquad h_w=${tex(a)}\\ \\text{mm}`,
      caption: 'Wymiar 5 mm dotyczy materiału nad wycięciem, a nie wysokości wycięcia.',
      focus: { metric: 'model' },
      emphasis: `Wycięcie 2a × a = ${pl(2 * a)} × ${pl(a)} mm, ścięcie 45°`,
    }),
    scene({
      title: 'Podział na pola ze znakami',
      narration:
        'Koło jest polem dodatnim. Wycięcie rozbijamy na dwa pola ujemne: prostokąt 2a × a o środku (a; a/2) oraz trójkąt ścięcia o przyprostokątnych a i a, którego środek leży w (−a/3; a/3). Oba pola odejmujemy od pola koła.',
      formula: `A_k=${tex(circle.area)},\\qquad A_p=-${tex(rectangleArea)},\\qquad A_t=-${tex(triangleArea)}\\quad[\\text{mm}^2]`,
      caption: `Prostokąt i trójkąt są ujemne. Pole trójkąta wynosi a²/2 = ${pl(triangleArea)} mm².`,
      focus: { metric: 'parts' },
      emphasis: 'Koło dodatnie, prostokąt i trójkąt ujemne',
    }),
    scene({
      title: 'Pole wycięcia i pole netto',
      narration:
        'Pole wycięcia to suma pól ujemnych: prostokąta i trójkąta ścięcia. Pole netto figury otrzymujemy, odejmując pole wycięcia od pola pełnego koła.',
      formula: `A_w=2a^2+\\frac{a^2}{2}=${tex(rectangleArea)}+${tex(triangleArea)}=${tex(cutArea)}\\ \\text{mm}^2;\\qquad A=\\pi R^2-A_w=${tex(circle.area)}-${tex(cutArea)}=${tex(area)}\\ \\text{mm}^2`,
      caption: `A_w = ${pl(cutArea)} mm², A = ${pl(area)} mm².`,
      focus: { metric: 'areas' },
      emphasis: `A = ${pl(area)} mm²`,
    }),
    scene({
      title: 'Centroid wycięcia',
      narration: `Współrzędne środka wycięcia liczymy z pól ujemnych. Otrzymujemy x_w = ${pl(removedX)} mm oraz y_w = ${pl(removedY)} mm. Moment wycięcia względem osi y wynosi A_w·x_w, a względem osi x A_w·y_w.`,
      formula: `x_w=\\frac{A_px_p+A_tx_t}{A_w}=${tex(removedX)}\\ \\text{mm};\\qquad y_w=\\frac{A_py_p+A_ty_t}{A_w}=${tex(removedY)}\\ \\text{mm}`,
      caption: 'Dodatnie x_w i y_w oznaczają, że wycięcie leży w I i II ćwiartce, nad osią x.',
      focus: { metric: 'cut-centroid' },
      emphasis: `x_w = ${pl(removedX)} mm, y_w = ${pl(removedY)} mm`,
    }),
    scene({
      title: 'Moment względem osi y i x_C',
      narration:
        'Koło ma środek w O, więc jego moment względem osi y jest zerowy. Moment figury jest równy minus momentowi wycięcia, dlatego x_C wypada ujemne — centroid przesuwa się w lewo.',
      formula: `Q_y=0-A_wx_w=-${tex(cutArea)}\\cdot${tex(removedX)}=${tex(moments.qy)}\\ \\text{mm}^3;\\qquad x_C=\\frac{Q_y}{A}=${tex(centroid.x)}\\ \\text{mm}`,
      caption: `Q_y = ${pl(moments.qy)} mm³, x_C = ${pl(centroid.x)} mm.`,
      focus: { metric: 'moment-y' },
      emphasis: `x_C = ${pl(centroid.x)} mm`,
    }),
    scene({
      title: 'Moment względem osi x i y_C',
      narration:
        'Analogicznie moment względem osi x jest równy minus A_w·y_w. Współrzędna y_C wypada ujemna, bo wycięcie leży nad osią x i usuwa materiał z górnej części koła.',
      formula: `Q_x=0-A_wy_w=-${tex(cutArea)}\\cdot${tex(removedY)}=${tex(moments.qx)}\\ \\text{mm}^3;\\qquad y_C=\\frac{Q_x}{A}=${tex(centroid.y)}\\ \\text{mm}`,
      caption: `Q_x = ${pl(moments.qx)} mm³, y_C = ${pl(centroid.y)} mm.`,
      focus: { metric: 'moment-x' },
      emphasis: `y_C = ${pl(centroid.y)} mm`,
    }),
    scene({
      title: 'Wynik i interpretacja',
      narration: `Centroid ma współrzędne x_C = ${pl(centroid.x)} mm i y_C = ${pl(centroid.y)} mm, więc leży bardzo blisko O, w III ćwiartce. Wycięcie usuwa materiał w I i II ćwiartce, dlatego przesunięcie jest przeciwne do jego położenia.`,
      formula: `C=(${tex(centroid.x)};\\ ${tex(centroid.y)})\\ \\text{mm},\\qquad x_C<0,\\qquad y_C<0`,
      caption: 'Małe wartości wynikają z dużego pola koła w porównaniu z polem wycięcia.',
      focus: { metric: 'centroid' },
      emphasis: 'C ≈ O, przesunięcie do III ćwiartki',
    }),
    scene({
      title: 'Kontrola bilansu momentów',
      narration:
        'Bilans momentów względem centroidu zamyka się, a tożsamości A·x_C = Q_y i A·y_C = Q_x potwierdzają rachunek. Znaki momentów wycięcia są przeciwne do znaków przesunięcia centroidu.',
      formula: `\\sum A_i(x_i-x_C)=${tex(residual.x)};\\qquad \\sum A_i(y_i-y_C)=${tex(residual.y)};\\qquad A\\,x_C=${tex(moments.qy)}=Q_y`,
      caption: 'Reszty są zerowe; kontrola obejmuje pole koła, prostokąt i trójkąt ścięcia.',
      focus: { metric: 'check' },
      emphasis: 'Bilans momentów względem C',
    }),
  ]
}
