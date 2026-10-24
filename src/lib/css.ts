export const cx = (...values: Array<string | false | null | undefined>) => values.filter(Boolean).join(' ')

export function classNames(styles: Record<string, string>) {
  return (names: string) =>
    names
      .split(/\s+/)
      .filter(Boolean)
      .map((name) => styles[name] ?? name)
      .join(' ')
}
