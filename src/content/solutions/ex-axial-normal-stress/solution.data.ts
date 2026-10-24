import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-axial-normal-stress',
  title: 'Naprężenie normalne: siła na przekroju — przykład 1',
  duration: 7,
  given: ['A = 250 mm²', 'N = 50 kN'],
  result:
    'σ = +200 MPa, czyli naprężenie rozciągające. Pręt jest blisko granicy plastyczności typowej stali, więc zapas byłby niewielki.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.NormalStressExample1Animation }))),
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Pręt o polu przekroju A = 250 mm² jest utwierdzony górnym końcem i rozciągany na dolnym końcu siłą N = 50 kN. Oś obciążenia pokrywa się z osią pręta, więc model pręta rozciąganego jest właściwy.',
      caption: 'Jednorodny pręt A = 250 mm² obciążony osiowo siłą N = 50 kN.',
      visual: 'axial',
      focus: { metric: 'model' },
      formula: 'A=250\\ \\text{mm}^2,\\qquad N=50\\ \\text{kN}',
    },
    {
      title: 'Siła osiowa N',
      narration:
        'Przecinamy pręt prostopadle do osi. Z równowagi odciętej części otrzymujemy N = +50 kN. Znak dodatni oznacza rozciąganie, a wartość N jest stała na całej długości.',
      caption: 'W każdym przekroju N = +50 kN; dodatni znak oznacza rozciąganie.',
      visual: 'axial',
      focus: { metric: 'N' },
      formula: 'N=+50\\ \\text{kN}=50\\,000\\ \\text{N}',
    },
    {
      title: 'Wydłużenie pręta',
      narration:
        'Rozciąganie wydłuża pręt: przekroje pozostają płaskie, a swobodny koniec przesuwa się o ΔL. Przy nieznanej długości i module E nie liczymy ΔL, ale wiemy, że jest ono proporcjonalne do N.',
      caption: 'Przekroje pozostają płaskie; wydłużenie jest proporcjonalne do N.',
      visual: 'axial',
      focus: { metric: 'elongation' },
      formula: '\\Delta L=\\frac{NL}{EA}',
    },
    {
      title: 'Naprężenie normalne',
      narration:
        'Siła N rozkłada się równomiernie na polu A. Naprężenie σ = N/A jest jednakowe w całym przekroju, a jego znak dziedziczy znak siły osiowej.',
      caption: 'σ = 50 000/250 = 200 MPa; rozkład równomierny w przekroju.',
      visual: 'axial',
      focus: { metric: 'sigma' },
      formula: '\\sigma=\\frac{N}{A}=\\frac{50\\,000}{250}=200\\ \\text{MPa}',
    },
    {
      title: 'Wynik i interpretacja',
      narration:
        'Naprężenie wynosi +200 MPa, czyli jest rozciągające. To wartość bliska granicy plastyczności typowej stali, około 235 MPa, więc zapas byłby niewielki. Gdyby siła działała przeciwnie, σ = −200 MPa oznaczałoby ściskanie.',
      caption: '+200 MPa (rozciąganie) — blisko granicy plastyczności stali 235 MPa.',
      visual: 'axial',
      focus: { metric: 'result' },
      formula: '\\sigma=+200\\ \\text{MPa}<235\\ \\text{MPa}',
    },
  ],
} satisfies SolutionData
