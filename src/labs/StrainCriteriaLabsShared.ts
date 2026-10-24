export const rosetteMaterials = {
  steel: { label: 'Stal', youngGPa: 200, poisson: 0.3 },
  aluminium: { label: 'Aluminium', youngGPa: 70, poisson: 0.33 },
  brass: { label: 'Mosiądz', youngGPa: 100, poisson: 0.34 },
} as const

export type RosetteMaterial = keyof typeof rosetteMaterials

export const combinedDiameterMM = 60
