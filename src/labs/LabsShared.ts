export const chartMargin = { top: 12, right: 18, left: 4, bottom: 24 }

export const materials = {
  steel: { label: 'Stal', youngGPa: 200 },
  aluminium: { label: 'Aluminium', youngGPa: 70 },
  wood: { label: 'Drewno', youngGPa: 12 },
} as const

export type MaterialKey = keyof typeof materials

export type ThermalMode = 'free' | 'fixed'
