import { lazy } from 'react'
import type { SolutionData } from '../../model'
import type { SolutionScene } from '../../../types'
import { createAxialSolution } from '../../solution-factories/factory-axial-thermal/factory'
import { meta } from './task'

const scenes: SolutionScene[] = [
  {
    title: '1. Model pręta i dwóch lin',
    narration:
      'Jednorodny pręt AB o masie 800 kg i długości 10 m wisi poziomo na dwóch pionowych linach. Lina brązowa przy A ma 4 m, a stalowa przy B — 3 m. Punkty zawieszenia są na różnych wysokościach, dlatego pręt może pozostać poziomy.',
    caption: 'Pręt AB zawieszony na linie brązowej w A i stalowej w B, z zaznaczonymi długościami.',
    visual: 'diagram',
    focus: { metric: 'model' },
    formula: 'm=800\\ \\mathrm{kg}\\qquad L=10\\ \\mathrm{m}\\qquad L_1=4\\ \\mathrm{m}\\qquad L_2=3\\ \\mathrm{m}',
  },
  {
    title: '2. Ciężar i symetria zawieszenia',
    narration:
      'Przyjmujemy g = 9,81 m/s², więc ciężar wynosi W = mg = 7848 N. Pręt jest jednorodny, a liny są zaczepione symetrycznie na jego końcach. Z symetrii i sumy momentów wynika, że każda lina przenosi połowę ciężaru, czyli 3924 N.',
    caption: 'Ciężar 7848 N działa w środku pręta, a obie liny przenoszą po 3924 N.',
    visual: 'diagram',
    focus: { metric: 'load' },
    formula: 'W=mg=800\\cdot9{,}81=7848\\ \\mathrm{N}\\qquad N_b=N_{st}=\\frac{W}{2}=3924\\ \\mathrm{N}',
  },
  {
    title: '3. Dobór przekroju liny brązowej',
    narration:
      'Warunek wytrzymałości wymaga, aby naprężenie nie przekroczyło dopuszczalnego. Dla brązu k_b = 90 MPa, więc minimalne pole wynosi 3924/90 = 43,6 mm². Otrzymujemy bardzo cienką linę, bo dopuszczalne naprężenie jest wysokie.',
    caption: 'Minimalne pole przekroju liny brązowej wynikające z warunku wytrzymałości.',
    visual: 'diagram',
    focus: { metric: 'bronze-area' },
    formula: 'A_b\\ge\\frac{N_b}{k_b}=\\frac{3924}{90}=43{,}6\\ \\mathrm{mm^2}',
  },
  {
    title: '4. Dobór przekroju liny stalowej',
    narration:
      'Stal ma wyższe dopuszczalne naprężenie 120 MPa. Dlatego minimalne pole liny stalowej jest mniejsze: 3924/120 = 32,7 mm². Przy tej samej sile większa wytrzymałość materiału pozwala zastosować cieńszą linę.',
    caption: 'Minimalne pole przekroju liny stalowej jest mniejsze niż liny brązowej.',
    visual: 'diagram',
    focus: { metric: 'steel-area' },
    formula: 'A_{st}\\ge\\frac{N_{st}}{k_{st}}=\\frac{3924}{120}=32{,}7\\ \\mathrm{mm^2}',
  },
  {
    title: '5. Przyjęte pola i kontrola naprężeń',
    narration:
      'Przyjmujemy praktyczne pola 44 mm² i 33 mm². Sprawdzamy naprężenia: 3924/44 = 89,2 MPa oraz 3924/33 = 118,9 MPa. Oba są mniejsze od dopuszczalnych, więc przekroje można zaakceptować.',
    caption: 'Zaokrąglone pola 44 mm² i 33 mm² spełniają warunki wytrzymałości.',
    visual: 'diagram',
    focus: { metric: 'check' },
    formula:
      'A_b=44\\ \\mathrm{mm^2},\\ \\sigma_b=89{,}2\\ \\mathrm{MPa}\\\\ A_{st}=33\\ \\mathrm{mm^2},\\ \\sigma_{st}=118{,}9\\ \\mathrm{MPa}',
  },
  {
    title: '6. Wydłużenie liny brązowej',
    narration:
      'Wydłużenie liczymy z prawa Hooke’a: ΔL = NL/(EA). Dla liny brązowej używamy dokładnego pola minimalnego 43,6 mm², długości 4000 mm i E = 120 000 MPa. Otrzymujemy 3,00 mm.',
    caption: 'Lina brązowa wydłuża się o 3,00 mm; na rysunku wydłużenie jest celowo powiększone.',
    visual: 'diagram',
    focus: { metric: 'bronze-elongation' },
    formula: '\\Delta L_b=\\frac{N_bL_b}{E_bA_b}=\\frac{3924\\cdot4000}{120000\\cdot43{,}6}=3{,}00\\ \\mathrm{mm}',
  },
  {
    title: '7. Wydłużenie liny stalowej',
    narration:
      'Lina stalowa jest krótsza i ma większy moduł Younga. Mimo mniejszego pola wydłuża się tylko o 1,80 mm. W obliczeniu używamy dokładnego pola 32,7 mm² i długości 3000 mm.',
    caption: 'Lina stalowa wydłuża się o 1,80 mm, czyli mniej niż lina brązowa.',
    visual: 'diagram',
    focus: { metric: 'steel-elongation' },
    formula:
      '\\Delta L_{st}=\\frac{N_{st}L_{st}}{E_{st}A_{st}}=\\frac{3924\\cdot3000}{200000\\cdot32{,}7}=1{,}80\\ \\mathrm{mm}',
  },
  {
    title: '8. Porównanie i interpretacja',
    narration:
      'Lina brązowa wydłuża się bardziej, chociaż ma większe pole przekroju. Decyduje o tym jej większa długość i mniejszy moduł Younga. Gdyby pręt miał pozostać idealnie poziomy, trzeba by uwzględnić różnicę wydłużeń już przy montażu.',
    caption: 'Porównanie wydłużeń: 3,00 mm dla brązu i 1,80 mm dla stali.',
    visual: 'diagram',
    focus: { metric: 'compare' },
    formula: '\\Delta L_b>\\Delta L_{st}\\qquad\\text{mimo}\\qquad A_b>A_{st}',
    emphasis: 'O wydłużeniu decyduje iloczyn NL/(EA), a nie samo pole przekroju.',
  },
]

export default {
  ...createAxialSolution({ ...meta, scenes }),
  animation: lazy(() => import('./animation').then((module) => ({ default: module.TwoRopeBarDesignAnimation }))),
} satisfies SolutionData
