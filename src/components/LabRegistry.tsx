import type { ComponentType } from 'react'
import {
  BendingLab,
  HookeLab,
  MohrLab,
  SectionLab,
  StressLab,
  ThermalLab,
  TorsionLab,
} from './Labs'
import {
  ReactionsLab,
  SaintVenantLab,
  SectionsLab,
  SteppedBarLab,
  UnitsLab,
} from './FundamentalsLabs'
import {
  CentroidLab,
  SafetyLab,
  SelfWeightLab,
  SteinerLab,
  TensileTestLab,
} from './MaterialGeometryLabs'
import {
  BeamGeneralLab,
  HollowShaftLab,
  ShearJointLab,
  StressTransformLab,
} from './ShearBeamLabs'
import { CombinedLab, RosetteLab } from './StrainCriteriaLabs'

export const labRegistry: Record<string, ComponentType> = {
  stress: StressLab,
  hooke: HookeLab,
  thermal: ThermalLab,
  section: SectionLab,
  torsion: TorsionLab,
  bending: BendingLab,
  mohr: MohrLab,
  units: UnitsLab,
  reactions: ReactionsLab,
  sections: SectionsLab,
  saintVenant: SaintVenantLab,
  steppedBar: SteppedBarLab,
  tensileTest: TensileTestLab,
  selfWeight: SelfWeightLab,
  safety: SafetyLab,
  centroid: CentroidLab,
  steiner: SteinerLab,
  shearJoint: ShearJointLab,
  hollowShaft: HollowShaftLab,
  beamGeneral: BeamGeneralLab,
  stressTransform: StressTransformLab,
  rosette: RosetteLab,
  combined: CombinedLab,
}

export const labIds = Object.keys(labRegistry)
