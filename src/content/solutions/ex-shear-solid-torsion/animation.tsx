import type { SolutionAnimationProps } from '../../../types'
import { TorsionVisual, type TorsionConfig, type TorsionMode } from './torsion-visual'

const config: TorsionConfig = {
  id: 'torsion-solid-1',
  d: 60,
  L: 1200,
  T: 1_500_000,
  tauMax: 35.37,
  J: 1_272_345,
  W: 42_411.5,
  phiRad: 0.01768,
  phiDeg: 1.013,
  labels: {
    d: 'd = 60 mm',
    L: 'L = 1200 mm',
    T: 'T = 1,5 kN·m',
    G: 'G = 80 GPa',
    phi: 'φ = 1,01°',
  },
}

export function SolidTorsionAnimation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const mode: TorsionMode =
    metric === 'twist'
      ? 'twist'
      : metric === 'section'
        ? 'section'
        : metric === 'stress'
          ? 'stress'
          : metric === 'result'
            ? 'result'
            : 'model'

  return <TorsionVisual mode={mode} config={config} playing={playing} sceneProgress={sceneProgress} />
}
