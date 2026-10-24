import type { SolutionData } from '../../model'

export default {
  id: 'cw9-1',
  title: 'Belka z przewieszeniem: wykresy T i M oraz warunek wytrzymałości',
  duration: 12,
  given: [
    'q = 16 kN/m na odcinku AB, gdzie AB = 1,5 m',
    'moment skupiony 8 kNm w B zgodnie z ruchem wskazówek zegara',
    'BC = CD = 0,5 m; podpory w A i C; P = 12 kN w D',
    'W_y = 81,9 cm³; k_g = 100 MPa',
  ],
  result: 'R_A = 8 kN, R_C = 28 kN, |M|max = 6 kNm, σmax = 73,3 MPa < 100 MPa — warunek wytrzymałości jest spełniony.',
  scenes: [
    {
      title: '1. Oznacz punkty i przyjmij znaki',
      narration:
        'Oś x prowadzimy od A w prawo. Zatem B ma współrzędną 1,5 m, C — 2,0 m, a D — 2,5 m. Reakcje R_A i R_C przyjmujemy w górę, momenty przeciwne do ruchu wskazówek zegara uznajemy za dodatnie, a dodatni moment gnący wywołuje ugięcie belki brzusznikiem w dół.',
      formula: 'x_A=0,quad x_B=1{,}5,mathrm{m},quad x_C=2{,}0,mathrm{m},quad x_D=2{,}5,mathrm{m}',
      caption: 'Rysunek belki: q na AB, moment 8 kNm w B, podpora C i siła P na końcu przewieszenia D.',
      visual: 'beam',
      emphasis: 'Najpierw jedna spójna umowa znaków — dopiero potem równania.',
    },
    {
      title: '2. Zastąp obciążenie ciągłe wypadkową',
      narration:
        'Na prostokątnym wykresie obciążenia wypadkowa jest równa jego polu, czyli q razy długość. Działa w środku odcinka AB, czyli 0,75 m od A. Używamy jej wyłącznie do równowagi całej belki, nie jako dodatkowego obciążenia.',
      formula: 'Q=q,l_1=16cdot1{,}5=24,mathrm{kN},qquad x_Q=0{,}75,mathrm{m}',
      caption: 'Prostokąt q × 1,5 m zastąpiony jedną siłą 24 kN przyłożoną w jego środku.',
      visual: 'beam',
    },
    {
      title: '3. Oblicz reakcje z równowagi',
      narration:
        'Z sumy momentów względem A otrzymujemy R_C. Moment skupiony w B jest zgodny z ruchem wskazówek zegara, więc wchodzi do równania ze znakiem minus. Następnie suma sił pionowych daje R_A. Kontrolnie: 8 + 28 = 36 kN, dokładnie tyle, co 24 + 12 kN obciążenia.',
      formula:
        '\\sum M_A=0:\\quad 2R_C-24\\cdot0{,}75-8-12\\cdot2{,}5=0\\\\R_C=28,mathrm{kN},\\qquad R_A=24+12-28=8,mathrm{kN}',
      caption: 'Schemat zastępczy z reakcjami 8 kN w A i 28 kN w C; wypadkowa q działa w odległości 0,75 m od A.',
      visual: 'beam',
      emphasis: 'Obie reakcje są dodatnie, czyli rzeczywiście działają w górę.',
    },
    {
      title: '4. Siła poprzeczna na AB',
      narration:
        'Przetnij belkę w odległości x od A, gdzie 0 ≤ x < 1,5 m. Na lewym odcinku działa reakcja 8 kN i obciążenie q na długości x. Siła poprzeczna maleje więc liniowo. W x = 0,5 m przechodzi przez zero — tam moment gnący osiągnie lokalne maksimum.',
      formula:
        'T_1(x)=R_A-qx=8-16x,mathrm{kN}\\\\T_1(0)=8,mathrm{kN},quad T_1(1{,}5^-)=-16,mathrm{kN},quad x_{T=0}=0{,}5,mathrm{m}',
      caption: 'Wykres T na AB: linia prosta od +8 kN w A do −16 kN tuż przed B, z zerem w x = 0,5 m.',
      visual: 'diagram',
    },
    {
      title: '5. Moment gnący na AB',
      narration:
        'Moment jest całką siły poprzecznej, więc przy stałym q powstaje parabola. W A moment wynosi zero. Największa dodatnia wartość na tym odcinku występuje przy T = 0, a tuż przed B otrzymujemy −6 kNm.',
      formula:
        'M_1(x)=R_Ax-\\frac{qx^2}{2}=8x-8x^2,mathrm{kNm}\\\\M_1(0)=0,quad M_1(0{,}5)=2,mathrm{kNm},quad M_1(1{,}5^-)=-6,mathrm{kNm}',
      caption: 'Wykres M na AB: parabola od 0 przez maksimum +2 kNm w x = 0,5 m do −6 kNm przed B.',
      visual: 'diagram',
    },
    {
      title: '6. Skok momentu w B i odcinek BC',
      narration:
        'Moment skupiony nie zmienia siły poprzecznej, ale powoduje skok wykresu M o 8 kNm. Dla przyjętego kierunku momentu w B wartość rośnie z −6 do +2 kNm. Na BC nadal T = −16 kN, zatem wykres M jest prostą o stałym nachyleniu.',
      formula:
        'T_2(x)=8-24=-16,mathrm{kN},qquad 1{,}5<x<2\\\\M_2(x)=8x-24(x-0{,}75)+8=-16x+26,mathrm{kNm}\\\\M(1{,}5^+)=2,mathrm{kNm},qquad M(2^-)=-6,mathrm{kNm}',
      caption: 'W B wykres M skacze z −6 do +2 kNm; na BC prosta spada do −6 kNm w C, a T pozostaje równe −16 kN.',
      visual: 'diagram',
      emphasis: 'Skok występuje na wykresie M, nie na wykresie T.',
    },
    {
      title: '7. Przewieszenie CD',
      narration:
        'W C reakcja 28 kN powoduje skok T z −16 do +12 kN. Na CD nie ma obciążenia rozłożonego, więc T jest stałe, a M zmienia się liniowo. Najprościej sprawdzić przebieg od prawej: siła 12 kN w D daje moment ujemny, którego wartość maleje do zera na swobodnym końcu.',
      formula:
        'T_3(x)=-16+28=12,mathrm{kN},qquad 2<x<2{,}5\\\\M_3(x)=-12(2{,}5-x)=12x-30,mathrm{kNm}\\\\M(2^+)=-6,mathrm{kNm},qquad M(2{,}5)=0',
      caption: 'Na CD wykres T ma poziom +12 kN, a wykres M rośnie liniowo od −6 kNm w C do 0 w D.',
      visual: 'diagram',
    },
    {
      title: '8. Zestaw wartości i wybierz Mmax',
      narration:
        'Dodatnie maksimum wynosi +2 kNm, natomiast największa wartość bezwzględna to 6 kNm — występuje tuż przed B oraz w C. Do naprężenia normalnego decyduje wartość bezwzględna momentu, bo zarówno rozciąganie, jak i ściskanie skrajnych włókien może być niebezpieczne.',
      formula: 'M_{\\max}^{(+)}=2,mathrm{kNm},qquad M_{\\min}=-6,mathrm{kNm},qquad |M|_{\\max}=6,mathrm{kNm}',
      caption: 'Zestawione wykresy: T z poziomami i skokiem w C; M z parabolą AB, skokiem w B i prostymi BC oraz CD.',
      visual: 'diagram',
      emphasis: 'Do warunku wytrzymałości przyjmujemy |M|max = 6 kNm.',
    },
    {
      title: '9. Sprawdź warunek wytrzymałości',
      narration:
        'Dla przekroju dwuteowego największe naprężenie od zginania wynosi M/W_y. Zamieniamy 6 kNm na 6·10⁶ Nmm, a 81,9 cm³ na 81,9·10³ mm³. Otrzymane naprężenie jest mniejsze od dopuszczalnego; zapas względem k_g wynosi około 26,7%.',
      formula:
        '\\sigma_{\\max}=\\frac{|M|_{\\max}}{W_y}=\\frac{6\\cdot10^6}{81{,}9\\cdot10^3}=73{,}3,mathrm{MPa}\\\\73{,}3,mathrm{MPa}<k_g=100,mathrm{MPa}',
      caption: 'Przekrój I 140 ze wskazanymi skrajnymi włóknami; porównanie 73,3 MPa z granicą 100 MPa.',
      visual: 'section',
      emphasis: 'Warunek wytrzymałości jest spełniony.',
    },
  ],
} satisfies SolutionData
