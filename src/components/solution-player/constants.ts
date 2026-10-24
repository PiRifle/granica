export const SPEEDS = [1, 1.5, 2] as const
export const SCENE_MS = 7000
export const STEP_MS = 2600
export const SKIP_MS = 5000

export function formatTime(value: number) {
  const totalSeconds = Math.max(0, Math.round(value / 1000))
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}:${String(seconds).padStart(2, '0')}`
}
