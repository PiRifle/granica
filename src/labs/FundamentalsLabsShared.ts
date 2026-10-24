export const chartMargin = { top: 12, right: 18, left: 4, bottom: 24 }

export const spring = { type: 'spring' as const, stiffness: 170, damping: 24 }

export type SegmentCount = '2' | '3'

export const steppedParts = [
  { lengthMM: 400, areaMM2: 200, color: '#4f6df5' },
  { lengthMM: 400, areaMM2: 350, color: '#27835a' },
  { lengthMM: 400, areaMM2: 500, color: '#e0a14b' },
] as const
