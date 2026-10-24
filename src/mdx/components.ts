import { createElement, type ComponentPropsWithoutRef } from 'react'
import type { MDXComponents } from 'mdx/types.js'
import styles from './Content.module.css'
import { Callout } from './Callout'
import { Caption, Formula } from './Formula'
import { Insight } from './Insight'
import { Lab } from './LabEmbed'
import { Answer, Explanation, Hint, Prompt, Question, Quiz } from './Quiz'
import { Given, Result, Step, Steps, WorkedExample } from './WorkedExample'
import { AnimatedSolution } from './AnimatedSolution'

function Table(props: ComponentPropsWithoutRef<'table'>) {
  return createElement('div', { className: styles.tableWrap }, createElement('table', props))
}

export const mdxComponents = {
  table: Table,
  Formula,
  Caption,
  Callout,
  Insight,
  Lab,
  WorkedExample,
  AnimatedSolution,
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
