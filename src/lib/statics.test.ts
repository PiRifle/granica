import { describe, expect, it } from 'vitest'
import {
  addVectors2,
  beamInternalsPointLoad,
  beltTensionEuler,
  criticalFrictionAngleDeg,
  cross2,
  inclineFrictionState,
  magnitude2,
  magnitude3,
  memberForcesAtJoint,
  moment2D,
  moment3,
  momentAboutAxis,
  momentOfForceAboutPoint,
  pappusSurface,
  pappusVolume,
  polygonCentroid,
  resultantConcurrent,
  simplySupportedPointLoad,
  simplySupportedWithDistributed,
  torusSurface,
  torusVolume,
  threePanelTrussForces,
  trussApexForces,
  vector2,
  vector3FromAngles,
} from './statics'

const close = (actual: number, expected: number, digits = 6) => {
  expect(actual).toBeCloseTo(expected, digits)
}

describe('rachunek wektorowy', () => {
  it('rozkłada wektor na składowe', () => {
    const force = vector2(10, 30)
    close(force.x, 8.660254)
    close(force.y, 5)
    close(magnitude2(force), 10)
  })

  it('dodaje wektory i wyznacza wypadkową zbieżnego układu', () => {
    const sum = addVectors2([
      { x: 3, y: 4 },
      { x: -3, y: 4 },
    ])
    close(sum.x, 0)
    close(sum.y, 8)
    const resultant = resultantConcurrent([
      { magnitude: 3, angleDeg: 0 },
      { magnitude: 4, angleDeg: 90 },
    ])
    close(magnitude2(resultant), 5)
    close(resultant.x, 3)
    close(resultant.y, 4)
  })

  it('liczy iloczyn wektorowy i moment względem punktu', () => {
    close(cross2({ x: 2, y: 0 }, { x: 0, y: 3 }), 6)
    close(moment2D({ x: 1, y: 1 }, { x: 0, y: 10 }, { x: 4, y: 1 }), 30)
    close(momentOfForceAboutPoint(10, 2, 90), 20)
    close(momentOfForceAboutPoint(10, 2, 30), 10)
  })
})

describe('równowaga belek', () => {
  it('wyznacza reakcje belki swobodnie podpartej', () => {
    const reactions = simplySupportedPointLoad(20, 4, 1)
    close(reactions.rb, 5)
    close(reactions.ra, 15)
    close(reactions.ra + reactions.rb, 20)
  })

  it('dodaje obciążenie ciągłe do reakcji', () => {
    const reactions = simplySupportedWithDistributed(0, 0, 4, 5)
    close(reactions.ra, 10)
    close(reactions.rb, 10)
  })

  it('wyznacza siły tnące i momenty zginające', () => {
    const before = beamInternalsPointLoad(1, 20, 4, 2)
    close(before.shear, 10)
    close(before.moment, 10)
    const after = beamInternalsPointLoad(3, 20, 4, 2)
    close(after.shear, -10)
    close(after.moment, 10)
  })
})

describe('kratownice i tarcie', () => {
  it('rozwiązuje węzeł dwóch prętów', () => {
    const forces = memberForcesAtJoint({ x: 0, y: -10 }, { x: 1, y: 0 }, { x: Math.SQRT1_2, y: Math.SQRT1_2 })
    close(forces.n2, 10 * Math.SQRT2)
    close(forces.n1, -10)
  })

  it('liczy siłę w pasie trójkątnej kratownicy', () => {
    const result = trussApexForces(12, 4, 2)
    close(result.reaction, 6)
    close(result.diagonal, -6 / (2 / Math.hypot(2, 2)))
  })

  it('liczy siły w kratownicy trójpanelowej z wykładu', () => {
    const result = threePanelTrussForces(8, 4, 2)
    close(result.reactions.rax, -9.237604)
    close(result.reactions.ray, 12)
    close(result.reactions.rb, 7.237604)
    const expected = [2.309401, 13.856406, -7.237604, -12, 0, 4.618802, -0.309401, -4, 0, 0, 2, 0]
    expected.forEach((value, index) => close(result.forces[index] ?? 0, value))
  })

  it('rozpoznaje poślizg na równi', () => {
    const state = inclineFrictionState(100, 30, 0.3)
    close(state.normal, 86.60254)
    close(state.driving, 50)
    close(state.frictionMax, 25.980762)
    expect(state.sliding).toBe(true)
    close(state.friction, 25.980762)
  })

  it('liczy graniczny kąt tarcia', () => {
    close(criticalFrictionAngleDeg(1), 45)
  })

  it('stosuje wzór Eulera dla cięgna', () => {
    close(beltTensionEuler(100, 0.25, Math.PI), 100 * Math.exp(0.25 * Math.PI))
  })
})

describe('geometria i przestrzeń', () => {
  it('liczy środek ciężkości figury złożonej z polem ujemnym', () => {
    const centroid = polygonCentroid([
      { area: 100, x: 5, y: 5 },
      { area: 25, x: 5, y: 5, negative: true },
    ])
    close(centroid.x, 5)
    close(centroid.y, 5)
  })

  it('stosuje twierdzenia Pappusa-Guldina', () => {
    close(pappusVolume(10, 2), 40 * Math.PI)
    close(pappusSurface(5, 2), 20 * Math.PI)
    close(torusVolume(10, 2), 2 * Math.PI ** 2 * 10 * 4)
    close(torusSurface(10, 2), 4 * Math.PI ** 2 * 20)
  })

  it('rozkłada siłę w przestrzeni i liczy moment', () => {
    const force = vector3FromAngles(10, 0, 0)
    close(force.x, 10)
    close(force.y, 0)
    close(force.z, 0)
    close(magnitude3(force), 10)
    const moment = moment3({ x: 0, y: 2, z: 0 }, { x: 10, y: 0, z: 0 })
    close(moment.z, -20)
    close(momentAboutAxis({ x: 0, y: 2, z: 0 }, { x: 10, y: 0, z: 0 }, { x: 0, y: 0, z: 1 }), -20)
  })
})
