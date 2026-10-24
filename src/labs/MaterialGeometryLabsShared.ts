import { axialStrain } from '../lib/engineering'

export const chartMargin = { top: 14, right: 18, left: 4, bottom: 26 }

export const youngGPa = 200

export interface TensilePoint {
  strainPerMille: number
  stress: number
}

export function tensileStressMPa(strain: number, Re: number, Rm: number): number {
  const yieldStrain = axialStrain(Re, youngGPa)
  const ultimateStrain = 0.12
  const failureStrain = 0.2
  if (strain <= yieldStrain) return youngGPa * 1000 * strain
  if (strain <= ultimateStrain) {
    const progress = (strain - yieldStrain) / (ultimateStrain - yieldStrain)
    return Re + (Rm - Re) * Math.sin((progress * Math.PI) / 2)
  }
  const progress = (strain - ultimateStrain) / (failureStrain - ultimateStrain)
  return Rm - 0.25 * Rm * progress
}
