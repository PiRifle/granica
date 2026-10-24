export const chartMargin = { top: 12, right: 18, left: 4, bottom: 24 }

export const spring = { type: 'spring' as const, stiffness: 170, damping: 24 }

export type SegmentCount = '2' | '3'

export const steppedParts = [
  { lengthMM: 400, areaMM2: 200, color: '#4f86c6' },
  { lengthMM: 400, areaMM2: 350, color: '#2a9d8f' },
  { lengthMM: 400, areaMM2: 500, color: '#e9a23b' },
] as const
