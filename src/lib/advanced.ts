export interface CompositeAreaPart {
  areaMM2: number
  yMM: number
}

export interface CompositeInertiaPart extends CompositeAreaPart {
  ownIXMM4: number
}

export interface StressTransformResult {
  sigmaN: number
  sigmaT: number
  tauNT: number
}

export interface NormalStrains {
  epsilonX: number
  epsilonY: number
  epsilonZ: number
}

export interface RectangularRosetteResult {
  epsilonX: number
  epsilonY: number
  gammaXY: number
  principal1: number
  principal2: number
  angleDeg: number
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

function assertHollowCircle(outerD: number, innerD: number): void {
  assertPositive(outerD, 'Średnica zewnętrzna')
  assertNonNegative(innerD, 'Średnica wewnętrzna')
  if (innerD >= outerD) {
    throw new Error('Średnica wewnętrzna musi być mniejsza od zewnętrznej')
  }
}

export function compositeCentroidY(parts: CompositeAreaPart[]): number {
  if (parts.length === 0) {
    throw new Error('Przekrój musi zawierać co najmniej jedną część')
  }

  let area = 0
  let firstMoment = 0
  for (const part of parts) {
    assertFinite(part.areaMM2, 'Pole części')
    assertFinite(part.yMM, 'Położenie środka części')
    area += part.areaMM2
    firstMoment += part.areaMM2 * part.yMM
  }

  if (area === 0) {
    throw new Error('Wypadkowe pole przekroju musi być różne od zera')
  }
  return firstMoment / area
}

export function compositeInertiaXMM4(parts: CompositeInertiaPart[], centroidYMM: number): number {
  if (parts.length === 0) {
    throw new Error('Przekrój musi zawierać co najmniej jedną część')
  }
  assertFinite(centroidYMM, 'Położenie środka ciężkości')

  let inertia = 0
  for (const part of parts) {
    assertFinite(part.areaMM2, 'Pole części')
    assertFinite(part.yMM, 'Położenie środka części')
    assertNonNegative(part.ownIXMM4, 'Własny moment bezwładności')
    inertia += part.ownIXMM4 + part.areaMM2 * (part.yMM - centroidYMM) ** 2
  }
  return inertia
}

export function stressTransform(
  sigmaXMPa: number,
  sigmaYMPa: number,
  tauXYMPa: number,
  thetaDeg: number,
): StressTransformResult {
  assertFinite(sigmaXMPa, 'Naprężenie sigmaX')
  assertFinite(sigmaYMPa, 'Naprężenie sigmaY')
  assertFinite(tauXYMPa, 'Naprężenie tauXY')
  assertFinite(thetaDeg, 'Kąt')

  const theta = (thetaDeg * Math.PI) / 180
  const cosine = Math.cos(theta)
  const sine = Math.sin(theta)
  const shearTerm = 2 * tauXYMPa * sine * cosine

  return {
    sigmaN: sigmaXMPa * cosine ** 2 + sigmaYMPa * sine ** 2 + shearTerm,
    sigmaT: sigmaXMPa * sine ** 2 + sigmaYMPa * cosine ** 2 - shearTerm,
    tauNT: (sigmaYMPa - sigmaXMPa) * sine * cosine + tauXYMPa * (cosine ** 2 - sine ** 2),
  }
}

export function principalAngleDeg(sx: number, sy: number, tau: number): number {
  assertFinite(sx, 'Naprężenie sigmaX')
  assertFinite(sy, 'Naprężenie sigmaY')
  assertFinite(tau, 'Naprężenie tauXY')
  return (0.5 * Math.atan2(2 * tau, sx - sy) * 180) / Math.PI
}

export function generalizedHookeStrains(sx: number, sy: number, sz: number, E: number, poisson: number): NormalStrains {
  assertFinite(sx, 'Naprężenie sigmaX')
  assertFinite(sy, 'Naprężenie sigmaY')
  assertFinite(sz, 'Naprężenie sigmaZ')
  assertPositive(E, 'Moduł Younga')
  assertFinite(poisson, 'Liczba Poissona')
  if (poisson <= -1 || poisson >= 0.5) {
    throw new Error('Liczba Poissona musi należeć do przedziału (-1; 0,5)')
  }

  const modulusMPa = E * 1000
  return {
    epsilonX: (sx - poisson * (sy + sz)) / modulusMPa,
    epsilonY: (sy - poisson * (sx + sz)) / modulusMPa,
    epsilonZ: (sz - poisson * (sx + sy)) / modulusMPa,
  }
}

export function volumetricStrain(strains: NormalStrains): number {
  assertFinite(strains.epsilonX, 'Odkształcenie epsilonX')
  assertFinite(strains.epsilonY, 'Odkształcenie epsilonY')
  assertFinite(strains.epsilonZ, 'Odkształcenie epsilonZ')
  return strains.epsilonX + strains.epsilonY + strains.epsilonZ
}

export function vonMisesPlaneMPa(sx: number, sy: number, tau: number): number {
  assertFinite(sx, 'Naprężenie sigmaX')
  assertFinite(sy, 'Naprężenie sigmaY')
  assertFinite(tau, 'Naprężenie tauXY')
  return Math.sqrt(sx ** 2 - sx * sy + sy ** 2 + 3 * tau ** 2)
}

export function trescaPlaneMPa(sx: number, sy: number, tau: number): number {
  assertFinite(sx, 'Naprężenie sigmaX')
  assertFinite(sy, 'Naprężenie sigmaY')
  assertFinite(tau, 'Naprężenie tauXY')

  const average = (sx + sy) / 2
  const radius = Math.hypot((sx - sy) / 2, tau)
  const sigma1 = average + radius
  const sigma2 = average - radius
  return Math.max(Math.abs(sigma1 - sigma2), Math.abs(sigma1), Math.abs(sigma2))
}

export function safetyFactor(limitMPa: number, actualMPa: number): number {
  assertPositive(limitMPa, 'Naprężenie graniczne')
  assertPositive(actualMPa, 'Naprężenie rzeczywiste')
  return limitMPa / actualMPa
}

export function shearBearingMPa(forceKN: number, shearPlanes: number, areaMM2: number): number {
  assertFinite(forceKN, 'Siła')
  assertPositive(shearPlanes, 'Liczba płaszczyzn ścinania')
  if (!Number.isInteger(shearPlanes)) {
    throw new Error('Liczba płaszczyzn ścinania musi być liczbą całkowitą')
  }
  assertPositive(areaMM2, 'Pole ścinane')
  return (forceKN * 1000) / (shearPlanes * areaMM2)
}

export function selfWeightStressMPa(gammaKNM3: number, lengthMM: number): number {
  assertPositive(gammaKNM3, 'Ciężar objętościowy')
  assertNonNegative(lengthMM, 'Długość')
  return gammaKNM3 * 1e-6 * lengthMM
}

export function hollowCircleInertiaMM4(outerD: number, innerD: number): number {
  assertHollowCircle(outerD, innerD)
  return (Math.PI / 64) * (outerD ** 4 - innerD ** 4)
}

export function hollowTorsionShearMPa(T: number, outerD: number, innerD: number): number {
  assertFinite(T, 'Moment skręcający')
  const inertia = hollowCircleInertiaMM4(outerD, innerD)
  return (T * 1000 * (outerD / 2)) / inertia
}

export function requiredSolidShaftDiameterMM(T: number, tauAllowMPa: number): number {
  assertFinite(T, 'Moment skręcający')
  assertPositive(tauAllowMPa, 'Dopuszczalne naprężenie styczne')
  return Math.cbrt((16 * Math.abs(T) * 1000) / (Math.PI * tauAllowMPa))
}

export function centerPointDeflectionMM(P: number, L: number, E: number, I: number): number {
  assertFinite(P, 'Siła')
  assertPositive(L, 'Rozpiętość')
  assertPositive(E, 'Moduł Younga')
  assertPositive(I, 'Moment bezwładności')
  return (P * 1000 * L ** 3) / (48 * E * 1000 * I)
}

export function rectangularRosette(e0: number, e45: number, e90: number): RectangularRosetteResult {
  assertFinite(e0, 'Odczyt tensometru 0 stopni')
  assertFinite(e45, 'Odczyt tensometru 45 stopni')
  assertFinite(e90, 'Odczyt tensometru 90 stopni')

  const epsilonX = e0
  const epsilonY = e90
  const gammaXY = 2 * e45 - e0 - e90
  const average = (epsilonX + epsilonY) / 2
  const radius = Math.hypot((epsilonX - epsilonY) / 2, gammaXY / 2)

  return {
    epsilonX,
    epsilonY,
    gammaXY,
    principal1: average + radius,
    principal2: average - radius,
    angleDeg: (0.5 * Math.atan2(gammaXY, epsilonX - epsilonY) * 180) / Math.PI,
  }
}
