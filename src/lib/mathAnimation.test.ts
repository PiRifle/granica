import { describe, expect, it } from 'vitest'
import { splitFormulaPresentation } from './mathAnimation'

describe('splitFormulaPresentation', () => {
  it('wydziela proste przypisania jako wartości pozostające na ekranie', () => {
    expect(
      splitFormulaPresentation('P=20\\ \\text{kN},\\qquad 2P=40\\ \\text{kN},\\qquad A=1000\\ \\text{mm}^2'),
    ).toEqual({
      values: ['P=20\\ \\text{kN}', '2P=40\\ \\text{kN}', 'A=1000\\ \\text{mm}^2'],
      steps: [],
    })
  })

  it('pozostawia podstawienia i łańcuchy równości w przekształceniu', () => {
    const result = splitFormulaPresentation('R=4P=80\\ \\text{kN}')
    expect(result.values).toEqual([])
    expect(result.steps).toEqual(['R=4P', 'R=4P=80\\ \\text{kN}'])
  })

  it('nie traktuje równania równowagi jako przypisania wartości', () => {
    expect(splitFormulaPresentation('\\sum F_x=0')).toEqual({ values: [], steps: ['\\sum F_x=0'] })
  })

  it('rozdziela wynik liczbowy od zależności symbolicznej', () => {
    expect(splitFormulaPresentation('N_1=N_2=-R,\\qquad \\sigma_1=-57{,}17\\ \\text{MPa}')).toEqual({
      values: ['\\sigma_1=-57{,}17\\ \\text{MPa}'],
      steps: ['N_1=N_2', 'N_1=N_2=-R'],
    })
  })
})
