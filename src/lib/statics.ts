export interface Vec2 {
  x: number
  y: number
}

export interface Vec3 {
  x: number
  y: number
  z: number
}

export interface Force2D {
  magnitude: number
  angleDeg: number
}

export interface PointLoad {
  position: number
  force: number
}

export interface CentroidPart {
  area: number
  x: number
  y: number
  negative?: boolean
}

function assertFinite(value: number, name: string): void {
  if (!Number.isFinite(value)) {
    throw new Error(`${name} musi być liczbą skończoną`)
  }
}

function assertPositive(value: number, name: string): void {
  assertFinite(value, name)
  if (value <= 0) {
    throw new Error(`${name} musi być większe od zera`)
  }
}

function assertNonNegative(value: number, name: string): void {
  assertFinite(value, name)
  if (value < 0) {
    throw new Error(`${name} nie może być ujemne`)
  }
}

export function degToRad(angleDeg: number): number {
  assertFinite(angleDeg, 'Kąt')
  return (angleDeg * Math.PI) / 180
}

export function radToDeg(angleRad: number): number {
  assertFinite(angleRad, 'Kąt')
  return (angleRad * 180) / Math.PI
}

export function vector2(magnitude: number, angleDeg: number): Vec2 {
  assertFinite(magnitude, 'Moduł')
  const angle = degToRad(angleDeg)
  return {
    x: magnitude * Math.cos(angle),
    y: magnitude * Math.sin(angle),
  }
}

export function magnitude2(vector: Vec2): number {
  assertFinite(vector.x, 'Składowa x')
  assertFinite(vector.y, 'Składowa y')
  return Math.hypot(vector.x, vector.y)
}

export function angle2Deg(vector: Vec2): number {
  assertFinite(vector.x, 'Składowa x')
  assertFinite(vector.y, 'Składowa y')
  if (vector.x === 0 && vector.y === 0) {
    throw new Error('Kierunek wektora zerowego jest nieokreślony')
  }
  return radToDeg(Math.atan2(vector.y, vector.x))
}

export function addVectors2(vectors: Vec2[]): Vec2 {
  const result = vectors.reduce(
    (sum, vector) => {
      assertFinite(vector.x, 'Składowa x')
      assertFinite(vector.y, 'Składowa y')
      return { x: sum.x + vector.x, y: sum.y + vector.y }
    },
    { x: 0, y: 0 },
  )
  return result
}

export function subtractVectors2(a: Vec2, b: Vec2): Vec2 {
  return { x: a.x - b.x, y: a.y - b.y }
}

export function dot2(a: Vec2, b: Vec2): number {
  assertFinite(a.x, 'Składowa x')
  assertFinite(a.y, 'Składowa y')
  assertFinite(b.x, 'Składowa x')
  assertFinite(b.y, 'Składowa y')
  return a.x * b.x + a.y * b.y
}

export function cross2(a: Vec2, b: Vec2): number {
  assertFinite(a.x, 'Składowa x')
  assertFinite(a.y, 'Składowa y')
  assertFinite(b.x, 'Składowa x')
  assertFinite(b.y, 'Składowa y')
  return a.x * b.y - a.y * b.x
}

export function resultantConcurrent(forces: Force2D[]): Vec2 {
  return addVectors2(forces.map((force) => vector2(force.magnitude, force.angleDeg)))
}

export function moment2D(origin: Vec2, force: Vec2, applicationPoint: Vec2): number {
  const radius = subtractVectors2(applicationPoint, origin)
  assertFinite(force.x, 'Składowa x')
  assertFinite(force.y, 'Składowa y')
  return cross2(radius, force)
}

export function momentOfForceAboutPoint(magnitude: number, distance: number, angleBetweenDeg: number): number {
  assertFinite(magnitude, 'Siła')
  assertFinite(distance, 'Odległość')
  assertFinite(angleBetweenDeg, 'Kąt')
  return magnitude * distance * Math.sin(degToRad(angleBetweenDeg))
}

export interface SimplySupportedReactions {
  ra: number
  rb: number
}

export function simplySupportedPointLoad(
  force: number,
  length: number,
  distanceFromA: number,
): SimplySupportedReactions {
  assertFinite(force, 'Siła')
  assertPositive(length, 'Długość belki')
  assertFinite(distanceFromA, 'Położenie siły')
  if (distanceFromA < 0 || distanceFromA > length) {
    throw new Error('Położenie siły musi leżeć na belce')
  }
  const rb = (force * distanceFromA) / length
  return { ra: force - rb, rb }
}

export function simplySupportedWithDistributed(
  pointLoad: number,
  pointPosition: number,
  distributed: number,
  length: number,
): SimplySupportedReactions {
  assertFinite(pointLoad, 'Siła skupiona')
  assertFinite(distributed, 'Obciążenie ciągłe')
  assertPositive(length, 'Długość belki')
  assertFinite(pointPosition, 'Położenie siły')
  if (pointPosition < 0 || pointPosition > length) {
    throw new Error('Położenie siły musi leżeć na belce')
  }
  const pointRb = (pointLoad * pointPosition) / length
  const distributedRb = (distributed * length) / 2
  const rb = pointRb + distributedRb
  const total = pointLoad + distributed * length
  return { ra: total - rb, rb }
}

export function distributedResultant(q: number, length: number): { force: number; position: number } {
  assertFinite(q, 'Obciążenie ciągłe')
  assertPositive(length, 'Długość')
  return { force: q * length, position: length / 2 }
}

export interface JointForces {
  n1: number
  n2: number
}

export function memberForcesAtJoint(knownForce: Vec2, direction1: Vec2, direction2: Vec2): JointForces {
  const det = cross2(direction1, direction2)
  if (Math.abs(det) < 1e-9) {
    throw new Error('Kierunki prętów są równoległe — układ nieoznaczony')
  }
  const rhs = { x: -knownForce.x, y: -knownForce.y }
  const n1 = cross2(rhs, direction2) / det
  const n2 = cross2(direction1, rhs) / det
  return { n1, n2 }
}

export function trussApexForces(load: number, span: number, height: number): { diagonal: number; reaction: number } {
  assertFinite(load, 'Obciążenie')
  assertPositive(span, 'Rozpiętość')
  assertPositive(height, 'Wysokość')
  const half = span / 2
  const length = Math.hypot(half, height)
  const sine = height / length
  const reaction = load / 2
  return { diagonal: -reaction / sine, reaction }
}

export interface ThreePanelTrussSolution {
  reactions: { rax: number; ray: number; rb: number }
  forces: number[]
}

export function threePanelTrussForces(
  p1: number,
  p2: number,
  p3: number,
  panelM = 2,
  heightM = panelM * Math.sqrt(3),
): ThreePanelTrussSolution {
  assertNonNegative(p1, 'Obciążenie P1')
  assertNonNegative(p2, 'Obciążenie P2')
  assertFinite(p3, 'Obciążenie P3')
  assertPositive(panelM, 'Panel')
  assertPositive(heightM, 'Wysokość')
  const ratio = panelM / heightM
  const diagonalLength = Math.hypot(panelM, heightM)
  const sine = heightM / diagonalLength
  return {
    reactions: {
      rax: -ratio * (p1 + 2 * p2),
      ray: p1 + p2,
      rb: ratio * (p1 + 2 * p2) - p3,
    },
    forces: [
      ratio * p2,
      (p1 + p2) / sine,
      p3 - ratio * (p1 + 2 * p2),
      -(p1 + p2),
      0,
      p2 / sine,
      p3 - ratio * p2,
      -p2,
      0,
      0,
      p3,
      0,
    ],
  }
}

export function frictionForce(normalForce: number, coefficient: number, sliding: boolean): number {
  assertNonNegative(normalForce, 'Siła normalna')
  assertNonNegative(coefficient, 'Współczynnik tarcia')
  return sliding ? coefficient * normalForce : Math.min(coefficient * normalForce, normalForce)
}

export function criticalFrictionAngleDeg(coefficient: number): number {
  assertNonNegative(coefficient, 'Współczynnik tarcia')
  return radToDeg(Math.atan(coefficient))
}

export function inclineFrictionState(
  weight: number,
  angleDeg: number,
  coefficient: number,
): { normal: number; driving: number; frictionMax: number; sliding: boolean; friction: number } {
  assertNonNegative(weight, 'Ciężar')
  assertNonNegative(coefficient, 'Współczynnik tarcia')
  const angle = degToRad(angleDeg)
  const normal = weight * Math.cos(angle)
  const driving = weight * Math.sin(angle)
  const frictionMax = coefficient * normal
  const sliding = driving > frictionMax
  return {
    normal,
    driving,
    frictionMax,
    sliding,
    friction: sliding ? frictionMax : driving,
  }
}

export function beltTensionEuler(tightTension: number, coefficient: number, wrapAngleRad: number): number {
  assertPositive(tightTension, 'Naprężenie w cięgnie')
  assertNonNegative(coefficient, 'Współczynnik tarcia')
  assertNonNegative(wrapAngleRad, 'Kąt opasania')
  return tightTension * Math.exp(coefficient * wrapAngleRad)
}

export interface BeamInternal {
  shear: number
  moment: number
}

export function beamInternalsPointLoad(x: number, force: number, length: number, loadPosition: number): BeamInternal {
  assertFinite(x, 'Położenie przekroju')
  assertPositive(length, 'Długość belki')
  if (x < 0 || x > length) {
    throw new Error('Przekrój musi leżeć na belce')
  }
  const reactions = simplySupportedPointLoad(force, length, loadPosition)
  if (x < loadPosition) {
    return { shear: reactions.ra, moment: reactions.ra * x }
  }
  return { shear: reactions.ra - force, moment: reactions.ra * x - force * (x - loadPosition) }
}

export function polygonCentroid(parts: CentroidPart[]): Vec2 {
  if (parts.length === 0) {
    throw new Error('Figura musi mieć co najmniej jedną część')
  }
  let area = 0
  let firstX = 0
  let firstY = 0
  for (const part of parts) {
    assertFinite(part.area, 'Pole części')
    assertFinite(part.x, 'Współrzędna x')
    assertFinite(part.y, 'Współrzędna y')
    const signedArea = part.negative ? -Math.abs(part.area) : part.area
    area += signedArea
    firstX += signedArea * part.x
    firstY += signedArea * part.y
  }
  if (Math.abs(area) < 1e-12) {
    throw new Error('Wypadkowe pole figury musi być różne od zera')
  }
  return { x: firstX / area, y: firstY / area }
}

export function pappusVolume(area: number, centroidDistance: number): number {
  assertNonNegative(area, 'Pole')
  assertNonNegative(centroidDistance, 'Odległość środka ciężkości od osi')
  return 2 * Math.PI * area * centroidDistance
}

export function pappusSurface(length: number, centroidDistance: number): number {
  assertNonNegative(length, 'Długość linii')
  assertNonNegative(centroidDistance, 'Odległość środka ciężkości od osi')
  return 2 * Math.PI * length * centroidDistance
}

export function torusVolume(majorRadius: number, minorRadius: number): number {
  assertPositive(majorRadius, 'Promień główny')
  assertPositive(minorRadius, 'Promień przekroju')
  return 2 * Math.PI ** 2 * majorRadius * minorRadius ** 2
}

export function torusSurface(majorRadius: number, minorRadius: number): number {
  assertPositive(majorRadius, 'Promień główny')
  assertPositive(minorRadius, 'Promień przekroju')
  return 4 * Math.PI ** 2 * majorRadius * minorRadius
}

export function vector3FromAngles(magnitude: number, azimuthDeg: number, elevationDeg: number): Vec3 {
  assertFinite(magnitude, 'Moduł')
  const azimuth = degToRad(azimuthDeg)
  const elevation = degToRad(elevationDeg)
  return {
    x: magnitude * Math.cos(elevation) * Math.cos(azimuth),
    y: magnitude * Math.cos(elevation) * Math.sin(azimuth),
    z: magnitude * Math.sin(elevation),
  }
}

export function magnitude3(vector: Vec3): number {
  return Math.hypot(vector.x, vector.y, vector.z)
}

export function cross3(a: Vec3, b: Vec3): Vec3 {
  return {
    x: a.y * b.z - a.z * b.y,
    y: a.z * b.x - a.x * b.z,
    z: a.x * b.y - a.y * b.x,
  }
}

export function moment3(r: Vec3, force: Vec3): Vec3 {
  return cross3(r, force)
}

export function momentAboutAxis(r: Vec3, force: Vec3, axis: Vec3): number {
  const moment = moment3(r, force)
  const length = magnitude3(axis)
  if (length === 0) {
    throw new Error('Oś musi mieć niezerowy kierunek')
  }
  return dot3(moment, axis) / length
}

export function dot3(a: Vec3, b: Vec3): number {
  assertFinite(a.x, 'Składowa x')
  assertFinite(a.y, 'Składowa y')
  assertFinite(a.z, 'Składowa z')
  assertFinite(b.x, 'Składowa x')
  assertFinite(b.y, 'Składowa y')
  assertFinite(b.z, 'Składowa z')
  return a.x * b.x + a.y * b.y + a.z * b.z
}

export function solveLinearSystem(matrix: number[][], rhs: number[]): number[] {
  const size = rhs.length
  if (matrix.length !== size || matrix.some((row) => row.length !== size)) {
    throw new Error('Układ równań musi być kwadratowy')
  }
  const augmented = matrix.map((row, index) => [...row, rhs[index]])
  for (let column = 0; column < size; column += 1) {
    let pivot = column
    for (let row = column + 1; row < size; row += 1) {
      if (Math.abs(augmented[row][column]) > Math.abs(augmented[pivot][column])) pivot = row
    }
    if (Math.abs(augmented[pivot][column]) < 1e-10) {
      throw new Error(`Układ jest osobliwy w kolumnie ${column + 1}`)
    }
    ;[augmented[column], augmented[pivot]] = [augmented[pivot], augmented[column]]
    const divisor = augmented[column][column]
    for (let entry = column; entry <= size; entry += 1) augmented[column][entry] /= divisor
    for (let row = 0; row < size; row += 1) {
      if (row === column) continue
      const factor = augmented[row][column]
      for (let entry = column; entry <= size; entry += 1) {
        augmented[row][entry] -= factor * augmented[column][entry]
      }
    }
  }
  return augmented.map((row) => row[size])
}

export interface PlanarForce {
  at: Vec2
  value: Vec2
}

export type PlanarUnknown =
  | { kind: 'force'; at: Vec2; direction: Vec2 }
  | { kind: 'couple' }

export interface PlanarEquation {
  type: 'Fx' | 'Fy' | 'M'
  at?: Vec2
  loadIndices?: number[]
  coupleIndices?: number[]
  unknownIndices?: number[]
}

function planarEquationRow(equation: PlanarEquation, loads: PlanarForce[], unknowns: PlanarUnknown[]) {
  const selectedLoads = loads.filter((_, index) => !equation.loadIndices || equation.loadIndices.includes(index))
  const selectedUnknowns = unknowns
    .map((unknown, index) => ({ unknown, index }))
    .filter(({ index }) => !equation.unknownIndices || equation.unknownIndices.includes(index))
  const row = Array.from({ length: unknowns.length }, () => 0)
  let rhs = 0
  for (const { unknown, index } of selectedUnknowns) {
    if (equation.type === 'Fx') row[index] = unknown.kind === 'force' ? unknown.direction.x : 0
    if (equation.type === 'Fy') row[index] = unknown.kind === 'force' ? unknown.direction.y : 0
    if (equation.type === 'M') {
      row[index] =
        unknown.kind === 'couple'
          ? 1
          : moment2D(equation.at ?? { x: 0, y: 0 }, unknown.direction, unknown.at)
    }
  }
  for (const load of selectedLoads) {
    if (equation.type === 'Fx') rhs -= load.value.x
    if (equation.type === 'Fy') rhs -= load.value.y
    if (equation.type === 'M') rhs -= moment2D(equation.at ?? { x: 0, y: 0 }, load.value, load.at)
  }
  return { row, rhs }
}

export function solvePlanarSystem(
  loads: PlanarForce[],
  couples: number[],
  unknowns: PlanarUnknown[],
  equations: PlanarEquation[],
) {
  const rows = equations.map((equation) => planarEquationRow(equation, loads, unknowns))
  const rhs = rows.map((row, index) => {
    const equation = equations[index]
    if (equation.type !== 'M') return row.rhs
    const selectedCouples = couples.filter(
      (_, coupleIndex) => !equation.coupleIndices || equation.coupleIndices.includes(coupleIndex),
    )
    return row.rhs - selectedCouples.reduce((sum, couple) => sum + couple, 0)
  })
  return solveLinearSystem(rows.map((row) => row.row), rhs)
}

export function planarResiduals(
  loads: PlanarForce[],
  couples: number[],
  unknowns: PlanarUnknown[],
  values: number[],
  at: Vec2 = { x: 0, y: 0 },
) {
  const allLoads = [...loads]
  unknowns.forEach((unknown, index) => {
    if (unknown.kind === 'force') {
      allLoads.push({
        at: unknown.at,
        value: { x: unknown.direction.x * values[index], y: unknown.direction.y * values[index] },
      })
    }
  })
  const totalCouple =
    couples.reduce((sum, couple) => sum + couple, 0) +
    unknowns.reduce((sum, unknown, index) => sum + (unknown.kind === 'couple' ? values[index] : 0), 0)
  return {
    x: allLoads.reduce((sum, load) => sum + load.value.x, 0),
    y: allLoads.reduce((sum, load) => sum + load.value.y, 0),
    moment: totalCouple + allLoads.reduce((sum, load) => sum + moment2D(at, load.value, load.at), 0),
  }
}
