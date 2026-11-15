import { lazy } from 'react'
import type { SolutionData } from '../../model'
import type { SolutionScene } from '../../../types'
import { createShearBendingSolution } from '../../solution-factories/factory-shear-bending/factory'
import { meta } from './task'

const scenes: SolutionScene[] = [
  {
    title: '1. Model belki z przewieszeniem',
    narration:
      'Oś x prowadzimy od swobodnego końca A w prawo. Podpora B leży 1,0 m od A, obciążenie P2 działa w C po 3,0 m od B, a podpora D jest 2,0 m od C. Przewieszenie AB sprawia, że moment w B będzie ujemny, mimo że belka jest podparta.',
    formula: 'x_A=0\\quad x_B=1{,}0\\ \\mathrm{m}\\quad x_C=4{,}0\\ \\mathrm{m}\\quad x_D=6{,}0\\ \\mathrm{m}',
    caption: 'Belka A–B–C–D z przewieszeniem AB, podporami B i D oraz siłami 30 kN i 40 kN.',
    visual: 'beam',
    focus: { metric: 'model' },
    emphasis: 'Kolejność punktów i znaki są ustalone przed pisaniem równań.',
  },
  {
    title: '2. Reakcje podpór',
    narration:
      'Suma momentów względem B pozwala wyznaczyć reakcję R_D. Moment od P1 jest ujemny, bo siła działa na lewym przewieszeniu, a moment od P2 dodatni. Po podstawieniu otrzymujemy R_D = 18 kN, a z sumy sił pionowych R_B = 52 kN.',
    formula: 'R_D=\\frac{P_2L_2-P_1L_1}{L_2+L_3}=\\frac{120-30}{5}=18\\ \\mathrm{kN}\\\\R_B=30+40-18=52\\ \\mathrm{kN}',
    caption: 'Reakcje R_B = 52 kN i R_D = 18 kN działają w górę.',
    visual: 'beam',
    focus: { metric: 'reaction' },
    emphasis: 'Kontrola: 52 + 18 = 70 kN, czyli tyle, ile wynosi suma obciążeń.',
  },
  {
    title: '3. Wykres siły poprzecznej T',
    narration:
      'Na przewieszeniu AB działa tylko P1, więc T = −30 kN. W B reakcja 52 kN zmienia siłę poprzeczną na +22 kN. W C obciążenie 40 kN zmniejsza ją do −18 kN, a w D reakcja 18 kN domyka wykres do zera.',
    formula: 'T_{AB}=-P_1=-30\\ \\mathrm{kN}\\qquad T_{BC}=+22\\ \\mathrm{kN}\\qquad T_{CD}=-18\\ \\mathrm{kN}',
    caption: 'Wykres T: poziomy −30 kN, +22 kN i −18 kN ze skokami w B, C i D.',
    visual: 'diagram',
    focus: { metric: 'shear' },
    emphasis: 'Skok w B wynosi 52 kN, a w C — 40 kN; w D wykres wraca do zera.',
  },
  {
    title: '4. Wykres momentu gnącego M',
    narration:
      'Moment w A jest równy zeru. Na przewieszeniu rośnie liniowo do −30 kN·m w B. Na odcinku BC siła poprzeczna jest dodatnia, więc moment rośnie do +36 kN·m w C. Na CD moment maleje liniowo do zera w D.',
    formula:
      'M_B=-P_1L_1=-30\\ \\mathrm{kN\\cdot m}\\\\M_C=-P_1(L_1+L_2)+R_BL_2=+36\\ \\mathrm{kN\\cdot m}\\qquad M_D=0',
    caption: 'Wykres M: −30 kN·m w B, +36 kN·m w C i zero w D.',
    visual: 'diagram',
    focus: { metric: 'moment' },
    emphasis: 'Znak momentu zmienia się między B i C, bo siła poprzeczna przechodzi przez zero.',
  },
  {
    title: '5. Największy moment bezwzględny',
    narration:
      'Porównujemy wartości bezwzględne momentów: 30 kN·m w B oraz 36 kN·m w C. Do doboru przekroju decyduje większa z nich, czyli 36 kN·m w C. Wartość bezwzględna jest istotna, bo zarówno rozciąganie, jak i ściskanie skrajnych włókien może być niebezpieczne.',
    formula: '|M|_{\\max}=36\\ \\mathrm{kN\\cdot m}\\qquad \\text{w punkcie }C',
    caption: 'Zestawienie wykresów T i M z wyróżnionym momentem |M|max = 36 kN·m.',
    visual: 'diagram',
    focus: { metric: 'max-moment' },
    emphasis: 'Do warunku wytrzymałości przyjmujemy |M|max = 36 kN·m.',
  },
  {
    title: '6. Wskaźnik wytrzymałości przekroju kołowego',
    narration:
      'Dla pełnego przekroju kołowego wskaźnik wytrzymałości wynosi W_z = πd³/32. Warunek wytrzymałości ma postać σ_max = |M|max/W_z ≤ k_g. Na tym etapie średnica jest jeszcze niewiadoma, dlatego nie podstawiamy żadnej wartości d.',
    formula: 'W_z=\\frac{\\pi d^3}{32}\\qquad \\sigma_{\\max}=\\frac{|M|_{\\max}}{W_z}\\le k_g',
    caption: 'Przekrój kołowy o nieznanej średnicy d oraz warunek naprężenia.',
    visual: 'section',
    focus: { metric: 'section' },
    emphasis: 'Średnica pojawi się dopiero po przekształceniu warunku w następnej scenie.',
  },
  {
    title: '7. Dobór średnicy',
    narration:
      'Podstawiamy |M|max = 36·10⁶ N·mm i k_g = 300 MPa, a następnie przekształcamy warunek względem średnicy. Otrzymujemy d ≥ 106,92 mm. Zaokrąglenie w górę do pełnego milimetra daje d = 107 mm; praktycznie częściej przyjmuje się 110 mm.',
    formula:
      'd\\ge\\sqrt[3]{\\frac{32|M|_{\\max}}{\\pi k_g}}=\\sqrt[3]{\\frac{32\\cdot36\\cdot10^6}{\\pi\\cdot300}}\\\\d\\ge106{,}92\\ \\mathrm{mm}\\ \\Rightarrow\\ d=107\\ \\mathrm{mm}',
    caption: 'Obliczenie d_min = 106,92 mm i zaokrąglenie do 107 mm na skali średnic.',
    visual: 'section',
    focus: { metric: 'design' },
    emphasis: 'Zaokrąglamy zawsze w górę — mniejsza średnica nie spełni warunku.',
  },
  {
    title: '8. Sprawdzenie naprężenia przy d = 107 mm',
    narration:
      'Dla przyjętej średnicy wracamy do wzoru σ = 32|M|/(πd³). Otrzymujemy 299,3 MPa, czyli wartość mniejszą od 300 MPa. Zapas jest bardzo mały, dlatego w praktyce wybieramy d = 110 mm, dla którego naprężenie spada do 275,5 MPa.',
    formula: '\\sigma=\\frac{32\\cdot36\\cdot10^6}{\\pi\\cdot107^3}=299{,}3\\ \\mathrm{MPa}<300\\ \\mathrm{MPa}',
    caption: 'Sprawdzenie: 299,3 MPa przy d = 107 mm i pasek wykorzystania naprężenia.',
    visual: 'section',
    focus: { metric: 'check' },
    emphasis: 'Warunek jest spełniony, ale zapas 0,2% jest zbyt mały jak na praktykę projektową.',
  },
  {
    title: '9. Interpretacja wyniku',
    narration:
      'O doborze średnicy decyduje moment w C, a nie większa reakcja w B. Przewieszenie AB daje ujemny moment −30 kN·m, który jest mniejszy od +36 kN·m w przęśle BC. Dla d = 107 mm warunek jest spełniony na granicy, dlatego zalecane jest d = 110 mm.',
    formula:
      'd=107\\ \\mathrm{mm}\\ (praktycznie\\ 110\\ \\mathrm{mm})\\\\ \\sigma=299{,}3\\ \\mathrm{MPa}\\le k_g=300\\ \\mathrm{MPa}',
    caption: 'Podsumowanie: momenty w B i C, średnica 107 mm oraz praktyczna średnica 110 mm.',
    visual: 'diagram',
    focus: { metric: 'summary' },
    emphasis: 'Reakcje służą do wykresów, ale o przekroju decyduje ekstremalny moment.',
  },
]

export default {
  ...createShearBendingSolution({ ...meta, scenes }),
  animation: lazy(() => import('./animation').then((module) => ({ default: module.BeamDiameterDesignAnimation }))),
} satisfies SolutionData
