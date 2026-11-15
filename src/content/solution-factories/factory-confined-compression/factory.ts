import type { SolutionData } from '../../model'
import type { SolutionScene } from '../../../types'

export interface ConfinedCompressionInputs {
  a: number
  b: number
  g: number
  p: number
  nu: number
  e: number
}

export interface ConfinedCompressionValues {
  areaX: number
  areaY: number
  sigmaX: number
  sigmaY: number
  sigmaZ: number
  epsX: number
  epsY: number
}

export function pl(value: number, digits = 3) {
  const normalized = Math.abs(value) < 0.5 * 10 ** -digits ? 0 : value
  return normalized.toLocaleString('pl-PL', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
    useGrouping: false,
  })
}

export function plGroup(value: number, digits = 0) {
  const normalized = Math.abs(value) < 0.5 * 10 ** -digits ? 0 : value
  return normalized.toLocaleString('pl-PL', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
    useGrouping: true,
  })
}

const SUPERSCRIPTS: Record<string, string> = {
  '-': '⁻',
  '0': '⁰',
  '1': '¹',
  '2': '²',
  '3': '³',
  '4': '⁴',
  '5': '⁵',
  '6': '⁶',
  '7': '⁷',
  '8': '⁸',
  '9': '⁹',
}

export function scientific(value: number, mantissaDigits = 4): string {
  if (value === 0) return '0'
  const exponent = Math.floor(Math.log10(Math.abs(value)))
  let text = pl(value / 10 ** exponent, mantissaDigits)
  if (text.includes(',')) {
    text = text.replace(/0+$/, '').replace(/,$/, '')
  }
  const exponentText = String(exponent)
    .split('')
    .map((char) => SUPERSCRIPTS[char] ?? char)
    .join('')
  return `${text}·10${exponentText}`
}

export function deriveConfinedCompression(inputs: ConfinedCompressionInputs): ConfinedCompressionValues {
  const force = inputs.p * 1000
  const areaX = inputs.b * inputs.g
  const areaY = inputs.a * inputs.g
  const sigmaX = -force / areaX
  const sigmaY = -force / areaY
  const sigmaZ = inputs.nu * (sigmaX + sigmaY)
  const epsX = (sigmaX - inputs.nu * (sigmaY + sigmaZ)) / inputs.e
  const epsY = (sigmaY - inputs.nu * (sigmaX + sigmaZ)) / inputs.e
  return { areaX, areaY, sigmaX, sigmaY, sigmaZ, epsX, epsY }
}

export interface ConfinedCompressionTask {
  id: string
  title: string
  duration: number
  given: string[]
  result: string
}

export function createConfinedCompressionSolution(
  task: ConfinedCompressionTask,
): Omit<SolutionData, 'animation' | 'scenes'> {
  return { ...task }
}

export const exampleConfinedCompressionInputs: ConfinedCompressionInputs = {
  a: 200,
  b: 150,
  g: 25,
  p: 200,
  nu: 0.25,
  e: 200000,
}
