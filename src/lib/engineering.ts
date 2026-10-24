export interface CenterLoadBeamResult {
  reactionsKN: {
    left: number
    right: number
  }
  maxMomentKNM: number
}

export interface MohrCircleResult {
  centerMPa: number
  radiusMPa: number
  sigma1MPa: number
  sigma2MPa: number
  maxShearMPa: number
}

function assertFinite(value: number, name: string): void {
  if (!Number.isFinite(value)) {
    throw new Error(`${name} must be finite`)
  }
}

function assertPositive(value: number, name: string): void {
  assertFinite(value, name)
  if (value <= 0) {
    throw new Error(`${name} must be greater than zero`)
  }
}

export function stressMPa(forceKN: number, areaMM2: number): number {
  assertFinite(forceKN, 'forceKN')
  assertPositive(areaMM2, 'areaMM2')
  return (forceKN * 1000) / areaMM2
}

export function axialStrain(stressMPa: number, youngGPa: number): number {
  assertFinite(stressMPa, 'stressMPa')
  assertPositive(youngGPa, 'youngGPa')
  return stressMPa / (youngGPa * 1000)
}

export function elongationMM(forceKN: number, lengthMM: number, areaMM2: number, youngGPa: number): number {
  assertPositive(lengthMM, 'lengthMM')
  return axialStrain(stressMPa(forceKN, areaMM2), youngGPa) * lengthMM
}

export function thermalStrain(alphaPerK: number, deltaT: number): number {
  assertFinite(alphaPerK, 'alphaPerK')
  assertFinite(deltaT, 'deltaT')
  return alphaPerK * deltaT
}

export function constrainedThermalStressMPa(alphaPerK: number, deltaT: number, youngGPa: number): number {
  assertPositive(youngGPa, 'youngGPa')
  const strain = thermalStrain(alphaPerK, deltaT)
  return strain === 0 ? 0 : -strain * youngGPa * 1000
}

export function rectangleInertiaMM4(widthMM: number, heightMM: number): number {
  assertPositive(widthMM, 'widthMM')
  assertPositive(heightMM, 'heightMM')
  return (widthMM * heightMM ** 3) / 12
}

export function circleInertiaMM4(diameterMM: number): number {
  assertPositive(diameterMM, 'diameterMM')
  return (Math.PI * diameterMM ** 4) / 64
}

export function circleSectionModulusMM3(diameterMM: number): number {
  assertPositive(diameterMM, 'diameterMM')
  return (Math.PI * diameterMM ** 3) / 32
}

export function torsionShearMPa(torqueNM: number, diameterMM: number): number {
  assertFinite(torqueNM, 'torqueNM')
  assertPositive(diameterMM, 'diameterMM')
  return (16 * torqueNM * 1000) / (Math.PI * diameterMM ** 3)
}

export function torsionAngleDeg(
  torqueNM: number,
  lengthMM: number,
  diameterMM: number,
  shearModulusGPa: number,
): number {
  assertFinite(torqueNM, 'torqueNM')
  assertPositive(lengthMM, 'lengthMM')
  assertPositive(diameterMM, 'diameterMM')
  assertPositive(shearModulusGPa, 'shearModulusGPa')
  const polarInertiaMM4 = (Math.PI * diameterMM ** 4) / 32
  const angleRadians = (torqueNM * 1000 * lengthMM) / (shearModulusGPa * 1000 * polarInertiaMM4)
  return (angleRadians * 180) / Math.PI
}

export function simplySupportedCenterLoad(forceKN: number, lengthMM: number): CenterLoadBeamResult {
  assertFinite(forceKN, 'forceKN')
  assertPositive(lengthMM, 'lengthMM')
  return {
    reactionsKN: {
      left: forceKN / 2,
      right: forceKN / 2,
    },
    maxMomentKNM: (forceKN * lengthMM) / 4000,
  }
}

export function shearAtKN(xMM: number, forceKN: number, lengthMM: number): number {
  assertFinite(forceKN, 'forceKN')
  assertPositive(lengthMM, 'lengthMM')
  assertFinite(xMM, 'xMM')
  if (xMM < 0 || xMM > lengthMM) {
    throw new Error('xMM must lie within the beam')
  }
  if (forceKN === 0) {
    return 0
  }
  return xMM <= lengthMM / 2 ? forceKN / 2 : -forceKN / 2
}

export function momentAtKNM(xMM: number, forceKN: number, lengthMM: number): number {
  assertFinite(forceKN, 'forceKN')
  assertPositive(lengthMM, 'lengthMM')
  assertFinite(xMM, 'xMM')
  if (xMM < 0 || xMM > lengthMM) {
    throw new Error('xMM must lie within the beam')
  }
  const distanceFromNearestSupportMM = Math.min(xMM, lengthMM - xMM)
  return (forceKN * distanceFromNearestSupportMM) / 2000
}

export function bendingStressMPa(momentKNM: number, sectionModulusMM3: number): number {
  assertFinite(momentKNM, 'momentKNM')
  assertPositive(sectionModulusMM3, 'sectionModulusMM3')
  return (momentKNM * 1_000_000) / sectionModulusMM3
}

export function mohrCircle(sigmaXMPa: number, sigmaYMPa: number, tauXYMPa: number): MohrCircleResult {
  assertFinite(sigmaXMPa, 'sigmaXMPa')
  assertFinite(sigmaYMPa, 'sigmaYMPa')
  assertFinite(tauXYMPa, 'tauXYMPa')
  const centerMPa = (sigmaXMPa + sigmaYMPa) / 2
  const radiusMPa = Math.hypot((sigmaXMPa - sigmaYMPa) / 2, tauXYMPa)
  return {
    centerMPa,
    radiusMPa,
    sigma1MPa: centerMPa + radiusMPa,
    sigma2MPa: centerMPa - radiusMPa,
    maxShearMPa: radiusMPa,
  }
}
