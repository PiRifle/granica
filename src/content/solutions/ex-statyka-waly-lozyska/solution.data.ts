import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-statyka-waly-lozyska',
  title: 'Wał w dwóch łożyskach — reakcje i moment skręcający',
  duration: 7,
  given: [
    'Wał wzdłuż osi x, łożysko wzdłużne A = (0, 0, 0), poprzeczne B = (1,0; 0; 0) m',
    'P = 10 kN w dół przy x = 0,4 m, H = 4 kN w +x, Q = 6 kN w +y przy x = 0,7 m',
    'Moment skręcający M = 3 kN·m równoważony momentem napędowym',
  ],
  result:
    'R_A = (−4; −1,8; 6) kN, R_B = (0; −4,2; 4) kN. Reakcje promieniowe: R_A = 6,26 kN, R_B = 5,80 kN. Siłę osiową 4 kN przejmuje łożysko A, a moment skręcający równoważy napęd, nie łożyska.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.ShaftBearingsAnimation }))),
  scenes: [
    {
      title: 'Model wału',
      narration:
        'Oś wału pokrywa się z osią x. Łożysko A jest wzdłużne, więc daje trzy reakcje, a łożysko B poprzeczne — dwie. Obciążenia działają w dwóch prostopadłych płaszczyznach.',
      caption: 'Wał z łożyskami A i B oraz siłami P, Q i H.',
      visual: 'diagram',
      focus: { metric: 'model' },
      formula:
        'A=(0,0,0),\\quad B=(1{,}0,0)\\ \\text{m},\\quad P=10\\ \\text{kN},\\quad Q=6\\ \\text{kN},\\quad H=4\\ \\text{kN}',
    },
    {
      title: 'Siła osiowa',
      narration:
        'Tylko łożysko wzdłużne może przejąć siłę w kierunku osi wału. Reakcja A_x jest przeciwna do siły H, więc działa w stronę ujemną.',
      caption: 'A_x = −4 kN — całą siłę osiową bierze łożysko A.',
      visual: 'diagram',
      focus: { metric: 'axial' },
      formula: '\\sum F_x=A_x+4=0\\quad\\Rightarrow\\quad A_x=-4\\ \\text{kN}',
    },
    {
      title: 'Momenty względem A',
      narration:
        'Siła pionowa daje moment względem osi y, a pozioma względem osi z. Reakcje w B wyznaczamy z dwóch niezależnych równań momentów.',
      caption: 'B_z = 4 kN, B_y = −4,2 kN.',
      visual: 'diagram',
      focus: { metric: 'moments' },
      formula: '\\sum M_y=0:\\ B_z=4\\ \\text{kN},\\qquad \\sum M_z=0:\\ B_y=-4{,}2\\ \\text{kN}',
    },
    {
      title: 'Sumy sił w dwóch płaszczyznach',
      narration:
        'Po znalezieniu reakcji w B wracamy do rzutów. Znak A_y jest ujemny, bo łożysko A musi ciągnąć wał przeciwnie do nadwyżki siły Q.',
      caption: 'A_y = −1,8 kN, A_z = 6 kN.',
      visual: 'diagram',
      focus: { metric: 'forces' },
      formula: '\\sum F_y=0:\\ A_y=-1{,}8\\ \\text{kN},\\qquad \\sum F_z=0:\\ A_z=6\\ \\text{kN}',
    },
    {
      title: 'Reakcje promieniowe',
      narration:
        'Do oceny obciążenia łożyska składamy dwie składowe prostopadłe do osi. Siła osiowa nie wchodzi do reakcji promieniowej — ma osobne znaczenie konstrukcyjne.',
      caption: 'R_A = 6,26 kN, R_B = 5,80 kN.',
      visual: 'diagram',
      focus: { metric: 'radial' },
      formula: 'R_A=\\sqrt{1{,}8^2+6^2}=6{,}26\\ \\text{kN},\\qquad R_B=\\sqrt{4{,}2^2+4^2}=5{,}80\\ \\text{kN}',
    },
    {
      title: 'Moment skręcający i kontrola',
      narration:
        'Łożysko poprzeczne ma zerowe ramię względem osi wału, więc nie przenosi skręcania. Moment 3 kN·m równoważy napęd, a kontrola momentów względem B potwierdza reakcje.',
      caption: 'M_x: 3 − 3 = 0; łożyska nie wnoszą momentu skręcającego.',
      visual: 'diagram',
      focus: { metric: 'torque' },
      formula: '\\sum M_x=M_{\\text{nap}}+M_{\\text{opor}}=3-3=0,\\qquad M_{\\text{lozyska}}=0',
    },
  ],
} satisfies SolutionData
