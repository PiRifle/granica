import type { SolutionAnimationProps } from '../../../types'
import { ReducedStressVisual, type ReducedMode, type ReducedStressConfig } from './reduced-stress-visual'

const config: ReducedStressConfig = {
  id: 'reduced-stress-1',
  kind: 'combined',
  sigma: 67.2,
  tau: 18.86,
  re: 235,
  kr: 117.5,
  nWym: 2,
  principal: { s1: 72.14, s2: -4.94, s3: 0 },
  criteria: [
    { key: 'hmh', label: 'HMH', symbol: 'σ_HMH', value: 74.72, factorTau: Math.sqrt(3), color: '#4f6df5' },
    { key: 'tresca', label: 'Tresca', symbol: 'σ_T', value: 77.06, factorTau: 2, color: '#ff6b45' },
  ],
  loads: {
    d: '60 mm',
    N: 'N = 30 kN',
    M: 'M = 1,2 kN·m',
    T: 'T = 800 N·m',
  },
}

export function ReducedStressExample1Animation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const mode: ReducedMode =
    metric === 'state'
      ? 'state'
      : metric === 'criteria'
        ? 'criteria'
        : metric === 'equivalent'
          ? 'equivalent'
          : metric === 'check'
            ? 'check'
            : 'model'

  return <ReducedStressVisual mode={mode} config={config} playing={playing} sceneProgress={sceneProgress} />
}
