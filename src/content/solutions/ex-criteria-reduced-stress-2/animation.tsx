import type { SolutionAnimationProps } from '../../../types'
import {
  ReducedStressVisual,
  type ReducedMode,
  type ReducedStressConfig,
} from '../ex-criteria-reduced-stress/reduced-stress-visual'

const config: ReducedStressConfig = {
  id: 'reduced-stress-2',
  kind: 'tension-torsion',
  sigma: 90,
  tau: 40,
  re: 280,
  kr: 186.7,
  nWym: 1.5,
  principal: { s1: 105.2, s2: -15.2, s3: 0 },
  criteria: [
    {
      key: 'max-normal',
      label: 'maks. normalne',
      symbol: 'σ_max',
      value: 105.2,
      factorTau: 0,
      color: '#2e9e6b',
      usesPrincipal: true,
    },
    { key: 'hmh', label: 'HMH', symbol: 'σ_HMH', value: 113.6, factorTau: Math.sqrt(3), color: '#4f6df5' },
    { key: 'tresca', label: 'Tresca', symbol: 'σ_T', value: 120.4, factorTau: 2, color: '#ff6b45' },
  ],
  loads: {
    sigma: 'σ = 90 MPa',
    tau: 'τ = 40 MPa',
  },
}

export function ReducedStressExample2Animation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
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
