import type { SolutionAnimationProps } from '../../../types'
import { TorsionVisual, type TorsionConfig, type TorsionMode } from '../ex-shear-solid-torsion/torsion-visual'

const config: TorsionConfig = {
  id: 'torsion-solid-3',
  d: 50,
  L: 1000,
  T: 800_000,
  tauMax: 32.6,
  tauAllow: 40,
  J: 613_592,
  W: 24_544,
  phiRad: 0.0163,
  phiDeg: 0.934,
  phiPerMeterDeg: 0.934,
  phiAllowDeg: 1,
  dMinStrength: 46.7,
  dAdopted: 48,
  dMinStiffness: 49.15,
  labels: {
    d: 'd = 50 mm',
    L: 'L = 1 m',
    T: 'T = 800 N·m',
    G: 'G = 80 GPa',
    phi: 'φ = 0,93°/m',
  },
}

export function SolidTorsionDesignAnimation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const mode: TorsionMode =
    metric === 'design'
      ? 'design'
      : metric === 'stress'
        ? 'stress'
        : metric === 'stiffness'
          ? 'twist'
          : metric === 'result'
            ? 'result'
            : 'model'

  const sceneConfig: TorsionConfig =
    metric === 'stress'
      ? { ...config, d: 48, tauMax: 36.85, W: 21_714.4, labels: { ...config.labels, d: 'd = 48 mm' } }
      : config

  return (
    <TorsionVisual
      mode={mode}
      config={sceneConfig}
      playing={playing}
      sceneProgress={sceneProgress}
      designStart={metric === 'design' ? 40 : undefined}
      designTarget={metric === 'design' ? 48 : undefined}
      designMin={metric === 'design' ? 46.7 : undefined}
      dOverride={metric === 'stress' ? 48 : metric === 'result' ? 50 : undefined}
      tauOverride={metric === 'stress' ? 36.85 : metric === 'result' ? 32.6 : undefined}
      showGauge={metric === 'stiffness' || metric === 'result'}
      gaugeValue={metric === 'stiffness' ? 0.934 : metric === 'result' ? 0.934 : undefined}
      gaugeLimit={metric === 'stiffness' ? 1 : undefined}
      gaugeMax={metric === 'stiffness' ? 1.4 : 2.5}
    />
  )
}
