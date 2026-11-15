import { describe, expect, it } from 'vitest'
import {
  createStrainTensorSolution,
  formatStrain,
  solveStrainTensor,
  strainTensorScenes,
  STRAIN_TENSOR_CONFIG,
  STRAIN_TENSOR_TASK,
} from './solution-factories/factory-hooke/factory'

describe('factory-hooke — tensor odkształcenia', () => {
  it('rozwiązuje tensor dla E = 205 GPa i ν = 0,30', () => {
    const solution = solveStrainTensor(STRAIN_TENSOR_CONFIG)
    expect(solution.g).toBeCloseTo(78_846.15, 2)
    expect(solution.ex).toBeCloseTo(4.5659e-4, 8)
    expect(solution.ey).toBeCloseTo(-3.9951e-4, 8)
    expect(solution.ez).toBeCloseTo(9.5122e-5, 8)
    expect(solution.gxy).toBeCloseTo(-3.1707e-4, 8)
    expect(solution.gxz).toBeCloseTo(9.5122e-4, 8)
    expect(solution.gyz).toBeCloseTo(-4.5659e-4, 8)
    expect(solution.trace).toBeCloseTo(1.522e-4, 8)
    expect(solution.ex + solution.ey + solution.ez).toBeCloseTo(solution.trace, 12)
  })

  it('buduje symetryczny tensor ε_ij = γ_ij/2 poza przekątną', () => {
    const { tensor } = solveStrainTensor(STRAIN_TENSOR_CONFIG)
    expect(tensor).toHaveLength(3)
    for (let row = 0; row < 3; row += 1) {
      for (let column = 0; column < 3; column += 1) {
        expect(tensor[row][column]).toBeCloseTo(tensor[column][row], 15)
      }
    }
    expect(tensor[0][1]).toBeCloseTo(-1.5854e-4, 8)
    expect(tensor[0][2]).toBeCloseTo(4.7561e-4, 8)
    expect(tensor[1][2]).toBeCloseTo(-2.2829e-4, 8)
  })

  it('zachowuje wynik w notacji wykładu', () => {
    expect(formatStrain(4.56585e-4)).toBe('4,5659·10⁻⁴')
    expect(formatStrain(-3.99512e-4)).toBe('−3,9951·10⁻⁴')
    expect(formatStrain(9.5122e-5)).toBe('9,5122·10⁻⁵')
    expect(STRAIN_TENSOR_TASK.result).toBe(
      'ε_x = 4,5659·10⁻⁴, ε_y = −3,9951·10⁻⁴, ε_z = 9,5122·10⁻⁵ oraz γ_xy = −3,1707·10⁻⁴, γ_xz = 9,5122·10⁻⁴, γ_yz = −4,5659·10⁻⁴; tensor jest symetryczny, a jego ślad wynosi 1,5220·10⁻⁴.',
    )
  })

  it('ma opisowy identyfikator i kompletny task', () => {
    expect(STRAIN_TENSOR_TASK.id).toBe('tensor-odksztalcenia-e205-nu030')
    expect(STRAIN_TENSOR_TASK.given.join(' ')).toContain('205 000 MPa')
    expect(STRAIN_TENSOR_TASK.given.join(' ')).toContain('ν = 0,30')
    const data = createStrainTensorSolution(STRAIN_TENSOR_TASK)
    expect(data.scenes).toHaveLength(9)
    expect(data.scenes.map((scene) => scene.focus?.metric)).toEqual([
      'stress',
      'material',
      'hooke',
      'ex',
      'eyz',
      'shear',
      'convention',
      'tensor',
      'check',
    ])
    expect(strainTensorScenes()).toHaveLength(9)
  })
})
