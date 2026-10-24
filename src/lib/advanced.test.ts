import { describe, expect, it } from 'vitest'
import {
  centerPointDeflectionMM,
  compositeCentroidY,
  compositeInertiaXMM4,
  generalizedHookeStrains,
  hollowCircleInertiaMM4,
  hollowTorsionShearMPa,
  principalAngleDeg,
  rectangularRosette,
  requiredSolidShaftDiameterMM,
  safetyFactor,
  selfWeightStressMPa,
  shearBearingMPa,
  stressTransform,
  trescaPlaneMPa,
  volumetricStrain,
  vonMisesPlaneMPa,
} from './advanced'

describe('composite sections', () => {
  it('calculates the centroid of two rectangles', () => {
    expect(
      compositeCentroidY([
        { areaMM2: 5000, yMM: 25 },
        { areaMM2: 5000, yMM: 75 },
      ]),
    ).toBe(50)
  })

  it('uses negative area for a hole', () => {
    expect(
      compositeCentroidY([
        { areaMM2: 10_000, yMM: 50 },
        { areaMM2: -1000, yMM: 80 },
      ]),
    ).toBeCloseTo(46.6666667, 7)
  })

  it('applies the parallel axis theorem', () => {
    expect(
      compositeInertiaXMM4(
        [
          { areaMM2: 100, yMM: 0, ownIXMM4: 10 },
          { areaMM2: 100, yMM: 2, ownIXMM4: 20 },
        ],
        1,
      ),
    ).toBe(230)
  })

  it('rejects zero net area and an empty section', () => {
    expect(() =>
      compositeCentroidY([
        { areaMM2: 100, yMM: 0 },
        { areaMM2: -100, yMM: 10 },
      ]),
    ).toThrow(/pole/i)
    expect(() => compositeCentroidY([])).toThrow(/co najmniej jedną/)
  })

  it('rejects negative own inertia and non-finite part data', () => {
    expect(() => compositeInertiaXMM4([{ areaMM2: 100, yMM: 0, ownIXMM4: -1 }], 0)).toThrow(/moment bezwładności/i)
    expect(() => compositeCentroidY([{ areaMM2: Number.NaN, yMM: 0 }])).toThrow(/skończoną/)
  })
})

describe('plane stress transformation', () => {
  it('leaves components unchanged at zero degrees', () => {
    expect(stressTransform(100, 20, 30, 0)).toEqual({
      sigmaN: 100,
      sigmaT: 20,
      tauNT: 30,
    })
  })

  it('swaps normal stresses and reverses shear at 90 degrees', () => {
    const result = stressTransform(100, 20, 30, 90)
    expect(result.sigmaN).toBeCloseTo(20, 12)
    expect(result.sigmaT).toBeCloseTo(100, 12)
    expect(result.tauNT).toBeCloseTo(-30, 12)
  })

  it('transforms uniaxial stress at 45 degrees', () => {
    const result = stressTransform(100, 0, 0, 45)
    expect(result.sigmaN).toBeCloseTo(50, 12)
    expect(result.sigmaT).toBeCloseTo(50, 12)
    expect(result.tauNT).toBeCloseTo(-50, 12)
  })

  it('preserves the sum of normal stresses', () => {
    const result = stressTransform(80, -20, 35, 31)
    expect(result.sigmaN + result.sigmaT).toBeCloseTo(60, 12)
  })

  it('finds the principal direction and zero shear on principal planes', () => {
    const angle = principalAngleDeg(80, 20, 30)
    const result = stressTransform(80, 20, 30, angle)
    expect(angle).toBeCloseTo(22.5, 12)
    expect(result.sigmaN).toBeCloseTo(92.4264069, 7)
    expect(result.sigmaT).toBeCloseTo(7.5735931, 7)
    expect(result.tauNT).toBeCloseTo(0, 12)
  })

  it('finds 45 degrees for pure shear', () => {
    expect(principalAngleDeg(0, 0, 40)).toBe(45)
  })
})

describe('generalized Hooke law and equivalent stresses', () => {
  it('calculates lateral contraction in a uniaxial test', () => {
    expect(generalizedHookeStrains(200, 0, 0, 200, 0.3)).toEqual({
      epsilonX: 0.001,
      epsilonY: -0.0003,
      epsilonZ: -0.0003,
    })
  })

  it('includes all three normal stresses', () => {
    const strains = generalizedHookeStrains(100, 50, -50, 200, 0.25)
    expect(strains.epsilonX).toBe(0.0005)
    expect(strains.epsilonY).toBe(0.0001875)
    expect(strains.epsilonZ).toBe(-0.0004375)
    expect(volumetricStrain(strains)).toBeCloseTo(0.00025, 12)
  })

  it('calculates volumetric strain under hydrostatic compression', () => {
    const strains = generalizedHookeStrains(-100, -100, -100, 200, 0.3)
    expect(volumetricStrain(strains)).toBeCloseTo(-0.0006, 12)
  })

  it('rejects invalid elastic constants', () => {
    expect(() => generalizedHookeStrains(1, 0, 0, 0, 0.3)).toThrow(/Younga/)
    expect(() => generalizedHookeStrains(1, 0, 0, 200, 0.5)).toThrow(/Poissona/)
    expect(() => generalizedHookeStrains(1, 0, 0, 200, -1)).toThrow(/Poissona/)
  })

  it('matches von Mises stress for uniaxial tension and pure shear', () => {
    expect(vonMisesPlaneMPa(100, 0, 0)).toBe(100)
    expect(vonMisesPlaneMPa(0, 0, 50)).toBeCloseTo(50 * Math.sqrt(3), 12)
  })

  it('calculates von Mises stress for a general plane state', () => {
    expect(vonMisesPlaneMPa(80, 20, 30)).toBeCloseTo(Math.sqrt(7900), 12)
  })

  it('matches Tresca stress for uniaxial tension and compression', () => {
    expect(trescaPlaneMPa(100, 0, 0)).toBe(100)
    expect(trescaPlaneMPa(-100, 0, 0)).toBe(100)
  })

  it('includes sigma3 equal to zero in the Tresca criterion', () => {
    expect(trescaPlaneMPa(80, 20, 30)).toBeCloseTo(92.4264069, 7)
    expect(trescaPlaneMPa(-80, -20, 0)).toBe(80)
  })

  it('gives twice the shear stress for pure shear in Tresca criterion', () => {
    expect(trescaPlaneMPa(0, 0, 40)).toBe(80)
  })
})

describe('joints, self weight and safety', () => {
  it('calculates a safety factor', () => {
    expect(safetyFactor(250, 125)).toBe(2)
  })

  it('rejects undefined or non-physical safety factors', () => {
    expect(() => safetyFactor(250, 0)).toThrow(/rzeczywiste/)
    expect(() => safetyFactor(-250, 100)).toThrow(/graniczne/)
  })

  it('divides force between two shear planes', () => {
    expect(shearBearingMPa(20, 2, 100)).toBe(100)
  })

  it('rejects invalid shear plane counts and areas', () => {
    expect(() => shearBearingMPa(20, 0, 100)).toThrow(/płaszczyzn/)
    expect(() => shearBearingMPa(20, 1.5, 100)).toThrow(/całkowitą/)
    expect(() => shearBearingMPa(20, 2, 0)).toThrow(/Pole/)
  })

  it('converts unit weight and length to MPa', () => {
    expect(selfWeightStressMPa(77, 10_000)).toBeCloseTo(0.77, 12)
  })

  it('rejects non-positive self weight inputs', () => {
    expect(() => selfWeightStressMPa(0, 1000)).toThrow(/Ciężar/)
    expect(() => selfWeightStressMPa(77, -1000)).toThrow(/Długość/)
  })
})

describe('hollow and solid shafts', () => {
  it('calculates solid circle inertia as the zero-hole limit', () => {
    expect(hollowCircleInertiaMM4(100, 0)).toBeCloseTo(4_908_738.5212, 4)
  })

  it('subtracts the hole inertia', () => {
    expect(hollowCircleInertiaMM4(100, 50)).toBeCloseTo(4_601_942.3637, 4)
  })

  it('calculates outer surface torsion shear', () => {
    expect(hollowTorsionShearMPa(1000, 100, 50)).toBeCloseTo(10.8649774, 7)
  })

  it('returns zero shear for zero torque', () => {
    expect(hollowTorsionShearMPa(0, 100, 50)).toBe(0)
  })

  it('rejects invalid hollow geometry', () => {
    expect(() => hollowCircleInertiaMM4(100, 100)).toThrow(/mniejsza/)
    expect(() => hollowCircleInertiaMM4(100, 120)).toThrow(/mniejsza/)
    expect(() => hollowTorsionShearMPa(100, 0, 0)).toThrow(/zewnętrzna/)
  })

  it('sizes a solid shaft from allowable shear', () => {
    const torqueNM = (Math.PI * 50 ** 3 * 40) / 16_000
    expect(requiredSolidShaftDiameterMM(torqueNM, 40)).toBeCloseTo(50, 12)
  })

  it('uses torque magnitude and handles zero torque', () => {
    const torqueNM = (Math.PI * 50 ** 3 * 40) / 16_000
    expect(requiredSolidShaftDiameterMM(-torqueNM, 40)).toBeCloseTo(50, 12)
    expect(requiredSolidShaftDiameterMM(0, 40)).toBe(0)
  })

  it('rejects non-positive allowable shear', () => {
    expect(() => requiredSolidShaftDiameterMM(100, 0)).toThrow(/Dopuszczalne/)
  })
})

describe('beam deflection', () => {
  it('calculates center deflection for a simply supported beam', () => {
    expect(centerPointDeflectionMM(10, 2000, 200, 1_000_000)).toBeCloseTo(25 / 3, 12)
  })

  it('preserves the load direction', () => {
    expect(centerPointDeflectionMM(-10, 2000, 200, 1_000_000)).toBeCloseTo(-25 / 3, 12)
  })

  it('rejects invalid beam properties', () => {
    expect(() => centerPointDeflectionMM(10, 0, 200, 1000)).toThrow(/Rozpiętość/)
    expect(() => centerPointDeflectionMM(10, 2000, 0, 1000)).toThrow(/Younga/)
    expect(() => centerPointDeflectionMM(10, 2000, 200, -1000)).toThrow(/bezwładności/)
  })
})

describe('rectangular strain rosette', () => {
  it('calculates strain components, principal strains and direction', () => {
    const result = rectangularRosette(200e-6, 150e-6, -100e-6)
    expect(result.epsilonX).toBe(200e-6)
    expect(result.epsilonY).toBe(-100e-6)
    expect(result.gammaXY).toBeCloseTo(200e-6, 15)
    expect(result.principal1).toBeCloseTo(230.2775638e-6, 12)
    expect(result.principal2).toBeCloseTo(-130.2775638e-6, 12)
    expect(result.angleDeg).toBeCloseTo(16.845033763, 9)
  })

  it('recognizes uniaxial strain without shear', () => {
    expect(rectangularRosette(100e-6, 50e-6, 0)).toEqual({
      epsilonX: 100e-6,
      epsilonY: 0,
      gammaXY: 0,
      principal1: 100e-6,
      principal2: 0,
      angleDeg: 0,
    })
  })

  it('recognizes pure shear at 45 degrees', () => {
    const result = rectangularRosette(0, 50e-6, 0)
    expect(result.principal1).toBeCloseTo(50e-6, 15)
    expect(result.principal2).toBeCloseTo(-50e-6, 15)
    expect(result.angleDeg).toBe(45)
  })

  it('rejects non-finite gauge readings', () => {
    expect(() => rectangularRosette(0, Number.POSITIVE_INFINITY, 0)).toThrow(/skończoną/)
  })
})
