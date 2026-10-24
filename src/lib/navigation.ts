export type View = 'home' | 'lesson' | 'training' | 'exam' | 'cheatsheet' | 'syllabus'

export const toolPaths: Record<Exclude<View, 'home' | 'lesson'>, string> = {
  training: '/training',
  exam: '/exam',
  cheatsheet: '/cheatsheet',
  syllabus: '/syllabus',
}
