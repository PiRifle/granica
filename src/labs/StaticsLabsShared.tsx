export const staticsSpring = { type: 'spring' as const, stiffness: 170, damping: 24 }

export const staticsColors = {
  force: '#ff6b45',
  reaction: '#27835a',
  tension: '#4f6df5',
  compression: '#b4552d',
  neutral: '#7c8794',
  axis: '#94a3b8',
  accent: '#2f6b4f',
} as const

export const staticsMarker = (id: string, color: string) => (
  <marker id={id} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
    <path d="M0 0L10 5L0 10Z" fill={color} />
  </marker>
)
