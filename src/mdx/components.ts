import type { MDXComponents } from 'mdx/types.js'
import { Callout } from './Callout'
import { Caption, Formula } from './Formula'
import { Insight } from './Insight'
import { Lab } from './LabEmbed'
import { Answer, Explanation, Hint, Prompt, Question, Quiz } from './Quiz'
import { Given, Result, Step, Steps, WorkedExample } from './WorkedExample'

export const mdxComponents = {
  Formula,
  Caption,
  Callout,
  Insight,
  Lab,
  WorkedExample,
  Given,
  Steps,
  Step,
  Result,
  Quiz,
  Question,
  Prompt,
  Answer,
  Hint,
  Explanation,
} satisfies MDXComponents
