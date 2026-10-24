import type { SolutionAnimationProps } from '../../../types'
import { TorsionVisual, type TorsionConfig, type TorsionMode } from '../ex-shear-solid-torsion/torsion-visual'

const config: TorsionConfig = {
  id: 'torsion-solid-2',
  d: 25,
  L: 1000,
  T: 98_786,
  tauMax: 32.2,
  J: 38_349.5,
  W: 3067.96,
  phiRad: 0.0322,
  phiDeg: 1.844,
  phiPerMeterDeg: 1.844,
  labels: {
    d: 'd = 25 mm',
    L: 'L = 1 m',
    T: 'T = 98,79 N·m',
    G: 'G = 80 GPa',
    phi: 'φ = 1,84°/m',
    power: 'P = 15 kW',
    speed: 'n = 1450 obr/min',
  },
}

export function SolidTorsionPowerAnimation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const mode: TorsionMode =
    metric === 'torque'
      ? 'load'
      : metric === 'twist'
        ? 'twist'
        : metric === 'stress'
          ? 'stress'
          : metric === 'result'
            ? 'result'
            : 'model'

  return (
    <TorsionVisual
      mode={mode}
      config={config}
      playing={playing}
      sceneProgress={sceneProgress}
      showGauge={mode === 'twist'}
      gaugeValue={config.phiPerMeterDeg}
      gaugeMax={2.5}
    />
  )
}
