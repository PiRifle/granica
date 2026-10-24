import type { SolutionData } from '../../model'
import { MaterialLoad2Animation } from './animation'

export default {
  id: 'ex-design-material-load-2',
  title: 'Dobór materiału i obciążenia dopuszczalnego — przykład 2',
  duration: 7,
  given: [
    'L=1,2 m',
    'P=25 kN',
    'n=1,5',
    'R_e(stal)=235 MPa',
    'E(stal)=200 GPa',
    'R_e(aluminium)=120 MPa',
    'E(aluminium)=70 GPa',
    'ΔL_dop=1,2 mm',
  ],
  result:
    'Stal wymaga A = 160 mm² i decyduje wytrzymałość, a aluminium A = 360 mm², bo decyduje sztywność. Mimo większego przekroju aluminium jest lżejsze (około 1,17 kg wobec 1,51 kg), ale jego wydłużenie 1,19 mm prawie wykorzystuje limit 1,2 mm.',
  animation: MaterialLoad2Animation,
  figure: {
    kind: 'axial',
    top: 'fixed',
    bottom: 'free',
    segments: [{ id: '1', label: 'stal', length: 1200, area: 160, n: 25, sigma: 156.25, deltaL: 0.9375 }],
    loads: [{ node: 1, value: 25, label: 'P = 25 kN', direction: 'down' }],
    units: { N: 'kN', σ: 'MPa', ΔL: 'mm', A: 'mm²' },
    note: 'Na rysunku wariant stalowy A = 160 mm²; wariant aluminiowy wymaga A = 360 mm² ze względu na sztywność.',
  },
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Ten sam pręt o długości L = 1,2 m jest obciążony siłą P = 25 kN. Wymagamy współczynnika bezpieczeństwa n = 1,5 i wydłużenia nie większego niż 1,2 mm. Stal ma R_e = 235 MPa i E = 200 GPa, a aluminium R_e = 120 MPa i E = 70 GPa. Trzeba wybrać materiał i pole przekroju.',
      caption: 'Dwa materiały, jedno obciążenie i dwa warunki: wytrzymałość oraz sztywność.',
      visual: 'axial',
      focus: { metric: 'model' },
      formula:
        'P=25\\ \\text{kN},\\quad L=1200\\ \\text{mm},\\quad n=1{,}5,\\quad \\Delta L_{\\mathrm{dop}}=1{,}2\\ \\text{mm}',
    },
    {
      title: 'Stal: granica i dobór przekroju',
      narration:
        'Dla stali naprężenie dopuszczalne wynosi k = 235/1,5 = 156,7 MPa. Z wytrzymałości potrzeba A ≥ 25 000/156,7 = 159,6 mm², a ze sztywności A ≥ 25 000 · 1200/(200 000 · 1,2) = 125 mm². Decyduje wytrzymałość, więc przyjmujemy A = 160 mm².',
      caption: 'Stal: decyduje wytrzymałość, A = 160 mm².',
      visual: 'axial',
      focus: { metric: 'steel' },
      formula:
        'k_s=\\frac{235}{1{,}5}=156{,}7\\ \\text{MPa},\\quad A_{w,s}=\\frac{25\\,000}{156{,}7}=159{,}6\\ \\text{mm}^2,\\quad A_{\\Delta,s}=\\frac{25\\,000\\cdot1200}{200\\,000\\cdot1{,}2}=125\\ \\text{mm}^2',
    },
    {
      title: 'Aluminium: decyduje sztywność',
      narration:
        'Dla aluminium k = 120/1,5 = 80 MPa, więc z wytrzymałości A ≥ 25 000/80 = 312,5 mm². Ze sztywności A ≥ 25 000 · 1200/(70 000 · 1,2) = 357,1 mm². Teraz decyduje sztywność, więc przyjmujemy większe pole A = 360 mm².',
      caption: 'Aluminium: decyduje sztywność, A = 360 mm².',
      visual: 'axial',
      focus: { metric: 'aluminium' },
      formula:
        'k_a=\\frac{120}{1{,}5}=80\\ \\text{MPa},\\quad A_{w,a}=\\frac{25\\,000}{80}=312{,}5\\ \\text{mm}^2,\\quad A_{\\Delta,a}=\\frac{25\\,000\\cdot1200}{70\\,000\\cdot1{,}2}=357{,}1\\ \\text{mm}^2',
    },
    {
      title: 'Przekrój a masa',
      narration:
        'Większe pole aluminium nie musi oznaczać cięższego pręta. Masa stali to około 160 · 1200 · 7,85·10⁻⁶ ≈ 1,51 kg, a aluminium 360 · 1200 · 2,70·10⁻⁶ ≈ 1,17 kg. Mniejsza gęstość aluminium przeważa nad większym przekrojem.',
      caption: 'Aluminium ma większy przekrój, ale mniejszą masę: 1,17 kg wobec 1,51 kg.',
      visual: 'axial',
      focus: { metric: 'compare' },
      formula: 'm_s\\approx1{,}51\\ \\text{kg},\\quad m_a\\approx1{,}17\\ \\text{kg}',
    },
    {
      title: 'Kontrola obu wariantów',
      narration:
        'Dla stali σ = 25 000/160 = 156,3 MPa ≤ 156,7 MPa oraz ΔL = 25 000 · 1200/(200 000 · 160) = 0,94 mm ≤ 1,2 mm. Dla aluminium σ = 25 000/360 = 69,4 MPa ≤ 80 MPa oraz ΔL = 25 000 · 1200/(70 000 · 360) = 1,19 mm ≤ 1,2 mm. Oba warianty spełniają warunki, ale aluminium prawie wykorzystuje limit wydłużenia.',
      caption: 'Stal: σ = 156,3 MPa, ΔL = 0,94 mm. Aluminium: σ = 69,4 MPa, ΔL = 1,19 mm.',
      visual: 'axial',
      focus: { metric: 'check' },
      formula:
        '\\sigma_s=156{,}3\\le156{,}7\\ \\text{MPa},\\quad \\Delta L_s=0{,}94\\le1{,}2\\ \\text{mm},\\quad \\sigma_a=69{,}4\\le80\\ \\text{MPa},\\quad \\Delta L_a=1{,}19\\le1{,}2\\ \\text{mm}',
    },
  ],
} satisfies SolutionData
