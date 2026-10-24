import type { MDXComponents } from 'mdx/types.js'
import { Callout } from './Callout'
import { Insight } from './Insight'
import { LabEmbed } from './LabEmbed'
import { LessonFormula } from './LessonFormula'
import { WorkedExample } from './WorkedExample'

export const mdxComponents = {
  Formula: LessonFormula,
  Insight,
  WorkedExample,
  Callout,
  Lab: LabEmbed,
} satisfies MDXComponents
