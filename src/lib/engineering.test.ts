import { describe, expect, it } from 'vitest'
import {
  axialStrain,
  bendingStressMPa,
  circleInertiaMM4,
  circleSectionModulusMM3,
  constrainedThermalStressMPa,
  elongationMM,
  mohrCircle,
  momentAtKNM,
  rectangleInertiaMM4,
  shearAtKN,
  simplySupportedCenterLoad,
  stressMPa,
  thermalStrain,
  torsionAngleDeg,
  torsionShearMPa,
} from './engineering'

describe('axial loading', () => {
  it('calculates stress, strain and elongation in consistent units', () => {
    expect(stressMPa(10, 200)).toBe(50)
    expect(axialStrain(50, 200)).toBe(0.00025)
    expect(elongationMM(10, 2000, 200, 200)).toBe(0.5)
  })

  it('supports compression', () => {
    expect(stressMPa(-10, 200)).toBe(-50)
    expect(elongationMM(-10, 2000, 200, 200)).toBe(-0.5)
  })

  it('returns zero for zero force and stress', () => {
    expect(stressMPa(0, 200)).toBe(0)
    expect(axialStrain(0, 200)).toBe(0)
    expect(elongationMM(0, 2000, 200, 200)).toBe(0)
  })

  it.each([0, -200])('rejects invalid area %s', (areaMM2) => {
    expect(() => stressMPa(10, areaMM2)).toThrow(Error)
  })

  it("rejects invalid length and Young's modulus", () => {
    expect(() => elongationMM(10, 0, 200, 200)).toThrow(Error)
    expect(() => elongationMM(10, 2000, 200, 0)).toThrow(Error)
    expect(() => axialStrain(50, -200)).toThrow(Error)
  })
})

describe('thermal loading', () => {
  it('calculates free thermal strain', () => {
    expect(thermalStrain(12e-6, 50)).toBeCloseTo(0.0006, 12)
  })

  it('calculates compressive stress for constrained heating', () => {
    expect(constrainedThermalStressMPa(12e-6, 50, 200)).toBeCloseTo(-120, 10)
    expect(constrainedThermalStressMPa(12e-6, -50, 200)).toBeCloseTo(120, 10)
  })

  it('returns zero without temperature change', () => {
    expect(thermalStrain(12e-6, 0)).toBe(0)
    expect(constrainedThermalStressMPa(12e-6, 0, 200)).toBe(0)
  })
})

describe('cross-section properties', () => {
  it('calculates rectangle second moment of area', () => {
    expect(rectangleInertiaMM4(100, 200)).toBeCloseTo(66_666_666.6667, 3)
  })

  it('calculates circle inertia and section modulus', () => {
    expect(circleInertiaMM4(100)).toBeCloseTo(4_908_738.5212, 4)
    expect(circleSectionModulusMM3(100)).toBeCloseTo(98_174.7704, 4)
  })

  it('rejects non-positive dimensions', () => {
    expect(() => rectangleInertiaMM4(0, 200)).toThrow(Error)
    expect(() => rectangleInertiaMM4(100, -200)).toThrow(Error)
    expect(() => circleInertiaMM4(0)).toThrow(Error)
    expect(() => circleSectionModulusMM3(-100)).toThrow(Error)
  })
})

describe('torsion', () => {
  it('calculates maximum shear stress and angle of twist', () => {
    expect(torsionShearMPa(1000, 50)).toBeCloseTo(40.7437, 4)
    expect(torsionAngleDeg(1000, 2000, 50, 80)).toBeCloseTo(2.33444, 4)
  })

  it('returns zero for zero torque', () => {
    expect(torsionShearMPa(0, 50)).toBe(0)
    expect(torsionAngleDeg(0, 2000, 50, 80)).toBe(0)
  })

  it('rejects invalid geometry and shear modulus', () => {
    expect(() => torsionShearMPa(1000, 0)).toThrow(Error)
    expect(() => torsionAngleDeg(1000, -2000, 50, 80)).toThrow(Error)
    expect(() => torsionAngleDeg(1000, 2000, 50, 0)).toThrow(Error)
  })
})

describe('simply supported beam with center load', () => {
  it('calculates reactions and maximum moment', () => {
    expect(simplySupportedCenterLoad(20, 4000)).toEqual({
      reactionsKN: { left: 10, right: 10 },
      maxMomentKNM: 20,
    })
  })

  it('provides shear force and bending moment values for charts', () => {
    expect(shearAtKN(1000, 20, 4000)).toBe(10)
    expect(shearAtKN(3000, 20, 4000)).toBe(-10)
    expect(momentAtKNM(0, 20, 4000)).toBe(0)
    expect(momentAtKNM(1000, 20, 4000)).toBe(10)
    expect(momentAtKNM(2000, 20, 4000)).toBe(20)
    expect(momentAtKNM(4000, 20, 4000)).toBe(0)
  })

  it('returns zero diagrams and result for zero load', () => {
    expect(simplySupportedCenterLoad(0, 4000)).toEqual({
      reactionsKN: { left: 0, right: 0 },
      maxMomentKNM: 0,
    })
    expect(shearAtKN(2000, 0, 4000)).toBe(0)
    expect(momentAtKNM(2000, 0, 4000)).toBe(0)
  })

  it('rejects invalid length and positions outside the beam', () => {
    expect(() => simplySupportedCenterLoad(20, 0)).toThrow(Error)
    expect(() => shearAtKN(-1, 20, 4000)).toThrow(Error)
    expect(() => momentAtKNM(4001, 20, 4000)).toThrow(Error)
  })
})

describe("bending and Mohr's circle", () => {
  it('calculates bending stress', () => {
    expect(bendingStressMPa(20, 100_000)).toBe(200)
    expect(bendingStressMPa(0, 100_000)).toBe(0)
    expect(() => bendingStressMPa(20, 0)).toThrow(Error)
  })

  it('calculates principal stresses and maximum shear', () => {
    const result = mohrCircle(80, 20, 30)
    expect(result.centerMPa).toBe(50)
    expect(result.radiusMPa).toBeCloseTo(42.4264, 4)
    expect(result.sigma1MPa).toBeCloseTo(92.4264, 4)
    expect(result.sigma2MPa).toBeCloseTo(7.5736, 4)
    expect(result.maxShearMPa).toBe(result.radiusMPa)
  })

  it('handles pure shear and zero stress', () => {
    expect(mohrCircle(0, 0, 40)).toEqual({
      centerMPa: 0,
      radiusMPa: 40,
      sigma1MPa: 40,
      sigma2MPa: -40,
      maxShearMPa: 40,
    })
    expect(mohrCircle(0, 0, 0)).toEqual({
      centerMPa: 0,
      radiusMPa: 0,
      sigma1MPa: 0,
      sigma2MPa: 0,
      maxShearMPa: 0,
    })
  })
})

describe('numeric input validation', () => {
  it('rejects non-finite inputs', () => {
    expect(() => stressMPa(Number.NaN, 200)).toThrow(Error)
    expect(() => thermalStrain(12e-6, Number.POSITIVE_INFINITY)).toThrow(Error)
    expect(() => mohrCircle(0, Number.NaN, 0)).toThrow(Error)
  })
})
