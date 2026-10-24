import type { SolutionAnimationProps } from '../../../types'
import {
  ReducedStressVisual,
  type ReducedMode,
  type ReducedStressConfig,
} from '../ex-criteria-reduced-stress/reduced-stress-visual'

const config: ReducedStressConfig = {
  id: 'reduced-stress-3',
  kind: 'design',
  sigma: 65.19,
  tauUnknown: true,
  re: 355,
  kr: 177.5,
  nWym: 2,
  principal: { s1: 65.19, s2: 0, s3: 0 },
  criteria: [{ key: 'hmh', label: 'HMH', symbol: 'σ_HMH', value: 177.5, factorTau: Math.sqrt(3), color: '#4f6df5' }],
  loads: {
    d: '50 mm',
    M: 'M = 0,8 kN·m',
    T: 'T = ?',
  },
  design: {
    tauLimit: 95.3,
    torque: '2,34 kN·m',
    wo: '24 543,7 mm³',
  },
}

export function ReducedStressExample3Animation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
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
