import type { CSSProperties } from 'react'
import type { CourseTheme } from '../types'

export interface ThemeStyle extends CSSProperties {
  '--accent': string
  '--accent-hover': string
  '--accent-strong': string
  '--surface-accent': string
  '--cobalt': string
  '--orange': string
  '--course-highlight-soft': string
  '--course-tint': string
}

export function courseThemeStyle(theme: CourseTheme): ThemeStyle {
  return {
    '--accent': theme.accent,
    '--accent-hover': theme.accentHover,
    '--accent-strong': theme.accentStrong,
    '--surface-accent': theme.accentSoft,
    '--cobalt': theme.accent,
    '--orange': theme.highlight,
    '--course-highlight-soft': theme.highlightSoft,
    '--course-tint': theme.tint,
  }
}
