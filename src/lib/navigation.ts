export type View = 'home' | 'lesson' | 'training' | 'exam' | 'cheatsheet' | 'syllabus' | 'library'

export const toolPaths: Record<Exclude<View, 'home' | 'lesson'>, string> = {
  training: '/training',
  exam: '/exam',
  cheatsheet: '/cheatsheet',
  syllabus: '/syllabus',
  library: '/biblioteka',
}
