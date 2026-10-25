import { lazy } from 'react'
import type { ComponentType } from 'react'

const loaders: Record<string, () => Promise<{ default: ComponentType }>> = {
  stress: () => import('../labs/StressLab').then((module) => ({ default: module.StressLab })),
  hooke: () => import('../labs/HookeLab').then((module) => ({ default: module.HookeLab })),
  thermal: () => import('../labs/ThermalLab').then((module) => ({ default: module.ThermalLab })),
  section: () => import('../labs/SectionLab').then((module) => ({ default: module.SectionLab })),
  torsion: () => import('../labs/TorsionLab').then((module) => ({ default: module.TorsionLab })),
  bending: () => import('../labs/BendingLab').then((module) => ({ default: module.BendingLab })),
  mohr: () => import('../labs/MohrLab').then((module) => ({ default: module.MohrLab })),
  units: () => import('../labs/UnitsLab').then((module) => ({ default: module.UnitsLab })),
  reactions: () => import('../labs/ReactionsLab').then((module) => ({ default: module.ReactionsLab })),
  sections: () => import('../labs/SectionsLab').then((module) => ({ default: module.SectionsLab })),
  saintVenant: () => import('../labs/SaintVenantLab').then((module) => ({ default: module.SaintVenantLab })),
  steppedBar: () => import('../labs/SteppedBarLab').then((module) => ({ default: module.SteppedBarLab })),
  tensileTest: () => import('../labs/TensileTestLab').then((module) => ({ default: module.TensileTestLab })),
  selfWeight: () => import('../labs/SelfWeightLab').then((module) => ({ default: module.SelfWeightLab })),
  safety: () => import('../labs/SafetyLab').then((module) => ({ default: module.SafetyLab })),
  centroid: () => import('../labs/CentroidLab').then((module) => ({ default: module.CentroidLab })),
  steiner: () => import('../labs/SteinerLab').then((module) => ({ default: module.SteinerLab })),
  shearJoint: () => import('../labs/ShearJointLab').then((module) => ({ default: module.ShearJointLab })),
  hollowShaft: () => import('../labs/HollowShaftLab').then((module) => ({ default: module.HollowShaftLab })),
  beamGeneral: () => import('../labs/BeamGeneralLab').then((module) => ({ default: module.BeamGeneralLab })),
  stressTransform: () =>
    import('../labs/StressTransformLab').then((module) => ({ default: module.StressTransformLab })),
  rosette: () => import('../labs/RosetteLab').then((module) => ({ default: module.RosetteLab })),
  combined: () => import('../labs/CombinedLab').then((module) => ({ default: module.CombinedLab })),
  staticsVector: () => import('../labs/StaticsVectorLab').then((module) => ({ default: module.StaticsVectorLab })),
  staticsSupports: () =>
    import('../labs/StaticsSupportsLab').then((module) => ({ default: module.StaticsSupportsLab })),
  staticsMoment: () => import('../labs/StaticsMomentLab').then((module) => ({ default: module.StaticsMomentLab })),
  staticsConcurrent: () =>
    import('../labs/StaticsConcurrentLab').then((module) => ({ default: module.StaticsConcurrentLab })),
  staticsPlanar: () => import('../labs/StaticsPlanarLab').then((module) => ({ default: module.StaticsPlanarLab })),
  staticsSpatial: () => import('../labs/StaticsSpatialLab').then((module) => ({ default: module.StaticsSpatialLab })),
  staticsTruss: () => import('../labs/StaticsTrussLab').then((module) => ({ default: module.StaticsTrussLab })),
  staticsTrussExtended: () =>
    import('../labs/StaticsTrussExtendedLab').then((module) => ({ default: module.StaticsTrussExtendedLab })),
  staticsFriction: () =>
    import('../labs/StaticsFrictionLab').then((module) => ({ default: module.StaticsFrictionLab })),
  staticsBelt: () => import('../labs/StaticsBeltLab').then((module) => ({ default: module.StaticsBeltLab })),
  staticsInternal: () =>
    import('../labs/StaticsInternalLab').then((module) => ({ default: module.StaticsInternalLab })),
  staticsCentroid: () =>
    import('../labs/StaticsCentroidLab').then((module) => ({ default: module.StaticsCentroidLab })),
  staticsPappus: () => import('../labs/StaticsPappusLab').then((module) => ({ default: module.StaticsPappusLab })),
}

export const labRegistry: Record<string, ComponentType> = Object.fromEntries(
  Object.entries(loaders).map(([id, load]) => [id, lazy(load)]),
)

export const labIds = Object.keys(labRegistry)
