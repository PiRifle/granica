import { lazy } from 'react'
import type { ComponentType } from 'react'

const legacyLabs = {
  stress: 'StressLab',
  hooke: 'HookeLab',
  thermal: 'ThermalLab',
  section: 'SectionLab',
  torsion: 'TorsionLab',
  bending: 'BendingLab',
  mohr: 'MohrLab',
} as const

const fundamentalsLabs = {
  units: 'UnitsLab',
  reactions: 'ReactionsLab',
  sections: 'SectionsLab',
  saintVenant: 'SaintVenantLab',
  steppedBar: 'SteppedBarLab',
} as const

const materialGeometryLabs = {
  tensileTest: 'TensileTestLab',
  selfWeight: 'SelfWeightLab',
  safety: 'SafetyLab',
  centroid: 'CentroidLab',
  steiner: 'SteinerLab',
} as const

const shearBeamLabs = {
  shearJoint: 'ShearJointLab',
  hollowShaft: 'HollowShaftLab',
  beamGeneral: 'BeamGeneralLab',
  stressTransform: 'StressTransformLab',
} as const

function fromGroup<T extends Record<string, string>>(load: () => Promise<Record<string, ComponentType>>, group: T) {
  return Object.fromEntries(Object.entries(group).map(([id, name]) => [id, lazy(async () => {
    const module = await load()
    return { default: module[name] }
  })]))
}

export const labRegistry: Record<string, ComponentType> = {
  ...fromGroup(() => import('./Labs') as Promise<Record<string, ComponentType>>, legacyLabs),
  ...fromGroup(() => import('./FundamentalsLabs') as Promise<Record<string, ComponentType>>, fundamentalsLabs),
  ...fromGroup(() => import('./MaterialGeometryLabs') as Promise<Record<string, ComponentType>>, materialGeometryLabs),
  ...fromGroup(() => import('./ShearBeamLabs') as Promise<Record<string, ComponentType>>, shearBeamLabs),
  rosette: lazy(async () => ({ default: (await import('./StrainCriteriaLabs')).RosetteLab })),
  combined: lazy(async () => ({ default: (await import('./StrainCriteriaLabs')).CombinedLab })),
}

export const labIds = Object.keys(labRegistry)
