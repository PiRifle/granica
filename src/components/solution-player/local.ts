import styles from '../SolutionPlayer.module.css'

export const local = (...values: Array<string | false | null | undefined>) =>
  values
    .filter(Boolean)
    .join(' ')
    .split(/\s+/)
    .filter(Boolean)
    .map((name) => styles[name] ?? name)
    .join(' ')
