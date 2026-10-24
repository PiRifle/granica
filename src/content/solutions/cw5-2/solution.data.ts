import type { SolutionData } from '../../model'

export default {
  "id": "cw5-2",
  "title": "Teownik T100 z dwoma kątownikami L45",
  "duration": 9,
  "given": [
    "Teownik: A_T = 20,9 cm², d = 2,74 cm, I_xT = 178,2 cm⁴, I_yT = 87,9 cm⁴",
    "Każdy kątownik: A_L = 3,49 cm², y_s = z_s = 1,23 cm, I_xL = I_yL = 6,43 cm⁴",
    "Wymiary profili: wysokość i szerokość teownika 10 cm; ramię kątownika 4,5 cm, grubość 0,4 cm",
    "Przyjęto osie jak na rysunku: x pozioma, y pionowa w osi symetrii; początek pomocniczego układu na dolnym końcu środnika teownika"
  ],
  "result": "y_C = 8,2539 cm od dolnego końca środnika, x_C = 0; I_x = 273,53 cm⁴, I_y = 132,43 cm⁴.",
  "scenes": [
    {
      "title": "Ustal osie i geometrię połączenia",
      "narration": "Przyjmijmy y pionowo w górę od dolnego końca środnika, a x poziomo w prawo. Oś pionowa profilu jest osią symetrii. Półka teownika kończy się na wysokości 10 cm. Kątowniki stoją pionowymi ramionami po obu stronach środnika, a ich poziome ramiona leżą na górnej powierzchni półki.",
      "formula": "x_C=0\\quad\\text{z symetrii}",
      "caption": "Cały przekrój liczymy w centymetrach, ponieważ dane tablicowe podano w cm² i cm⁴.",
      "visual": "section"
    },
    {
      "title": "Połóż centroid teownika",
      "narration": "Tablicowe d = 2,74 cm jest odległością środka ciężkości teownika od dolnej powierzchni jego półki. Ponieważ nasz początek układu jest 10 cm niżej, współrzędna centroidu teownika wynosi y_T = 10 − d = 7,26 cm.",
      "formula": "y_T=10-2,74=7,26\\ \\text{cm},\\qquad x_T=0",
      "caption": "Nie dodajemy d do 10 cm: d mierzymy w dół od spodu półki.",
      "visual": "section",
      "emphasis": "Moment I_xT = 178,2 cm⁴ jest już centralnym momentem samego teownika."
    },
    {
      "title": "Połóż centroidy kątowników",
      "narration": "Dla równoramiennego kątownika y_s = z_s = 1,23 cm mierzymy od zewnętrznych powierzchni ramion. Zatem pionowa współrzędna każdego kątownika to y_L = 10 + 1,23 = 11,23 cm. Prawy kątownik ma zewnętrzną powierzchnię pionowego ramienia 0,5 + 0,4 = 0,9 cm od osi symetrii, więc jego centroid leży na x = 0,9 + 1,23 = 2,13 cm; lewy ma x = −2,13 cm.",
      "formula": "y_L=11,23\\ \\text{cm},\\qquad x_{L}=\\pm(0,5+0,4+1,23)=\\pm2,13\\ \\text{cm}",
      "caption": "Grubość 0,4 cm dodajemy, bo tablicową odległość centroidu mierzymy od zewnętrznego, nie wewnętrznego, lica ramienia.",
      "visual": "section"
    },
    {
      "title": "Wyznacz wspólny środek ciężkości",
      "narration": "Pole całkowite wynosi A = 20,9 + 2·3,49 = 27,88 cm². Momenty statyczne kątowników względem osi x dodajemy, ponieważ oba leżą powyżej półki. W kierunku poziomym ich momenty się znoszą.",
      "formula": "y_C=\\frac{A_Ty_T+2A_Ly_L}{A_T+2A_L}=\\frac{20,9\\cdot7,26+2\\cdot3,49\\cdot11,23}{27,88}=8,2539\\ \\text{cm}",
      "caption": "Centralna oś x leży 8,2539 cm nad dolnym końcem środnika; centralna oś y pokrywa się z osią symetrii.",
      "visual": "section"
    },
    {
      "title": "Oblicz odległości do osi centralnej x",
      "narration": "Przed zastosowaniem Steinera wyznaczamy odległości pionowe centroidów profili od wspólnej osi x. Są to wartości bezwzględne, a we wzorze i tak występują ich kwadraty.",
      "formula": "\\Delta y_T=7,26-8,2539=-0,9939\\ \\text{cm},\\qquad \\Delta y_L=11,23-8,2539=2,9761\\ \\text{cm}",
      "caption": "Każdy profil ma własną odległość od wspólnego centroidu.",
      "visual": "diagram"
    },
    {
      "title": "Zastosuj Steinera dla osi x",
      "narration": "Dodajemy centralne momenty tablicowe i składniki przesunięcia. Dla kątowników suma obejmuje dwa własne momenty oraz dwa składniki A_LΔy_L².",
      "formula": "I_x=178,2+20,9(-0,9939)^2+2\\left[6,43+3,49(2,9761)^2\\right]",
      "caption": "Składnik teownika z przesunięciem wynosi 198,8468 cm⁴; dwa własne momenty kątowników 12,86 cm⁴, a ich przesunięcia łącznie 61,8221 cm⁴.",
      "visual": "diagram"
    },
    {
      "title": "Otrzymaj centralny moment I_x",
      "narration": "Suma wszystkich składników daje moment względem poziomej osi centralnej. Kątowniki zwiększają go nie tylko przez własne momenty, ale przede wszystkim przez oddalenie ich pól od centroidu całego przekroju.",
      "formula": "\\boxed{I_x=198,8468+12,86+61,8221=273,5289\\ \\text{cm}^4\\approx273,53\\ \\text{cm}^4}",
      "caption": "Nie wolno dodawać samych momentów tablicowych bez składników Steinera.",
      "visual": "diagram"
    },
    {
      "title": "Oblicz centralny moment I_y",
      "narration": "Oś y przechodzi przez centroid teownika, dlatego dla niego nie ma składnika przesunięcia. Centroid każdego kątownika jest oddalony o 2,13 cm, więc dla obu dodajemy A_L·2,13².",
      "formula": "I_y=87,9+2\\left(6,43+3,49\\cdot2,13^2\\right)=87,9+2(6,43+15,8338)",
      "caption": "Dla osi pionowej używamy odległości poziomych, a nie współrzędnych y_L.",
      "visual": "section"
    },
    {
      "title": "Zapisz i sprawdź wynik",
      "narration": "Po zsumowaniu I_y = 132,4276 cm⁴. Oba wyniki są większe od momentów samego teownika, co jest zgodne z dodaniem materiału. Osi x i y są centralnymi osiami głównymi, ponieważ y jest osią symetrii, a moment dewiacji całego przekroju wynosi zero.",
      "formula": "\\boxed{y_C=8,2539\\ \\text{cm},\\quad I_x=273,53\\ \\text{cm}^4,\\quad I_y=132,43\\ \\text{cm}^4}",
      "caption": "Wynik dotyczy dokładnie orientacji kątowników pokazanej na rysunku.",
      "visual": "section",
      "emphasis": "Symetria upraszcza centroid i eliminuje moment dewiacji, ale nie zwalnia z przesunięć Steinera."
    }
  ]
} satisfies SolutionData
