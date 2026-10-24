export interface ReadingStats {
  words: number
  inlineMath: number
  displayMath: number
  experiments: number
  experimentMinutes: number
  readingMinutes: number
  totalMinutes: number
}

export interface ReadingStatsInput {
  words: number
  inlineMath: number
  displayMath: number
  experiments: number
  experimentMinutes: number
}

export const WORDS_PER_MINUTE = 180
export const INLINE_MATH_SECONDS = 5
export const DISPLAY_MATH_SECONDS = 15

export function countWords(text: string): number {
  if (!text) return 0
  if (typeof Intl.Segmenter === 'function') {
    const segmenter = new Intl.Segmenter('pl', { granularity: 'word' })
    return [...segmenter.segment(text)].filter((part) => part.isWordLike).length
  }
  return text.split(/\s+/).filter(Boolean).length
}

export function computeReadingStats(input: ReadingStatsInput): ReadingStats {
  const readingMinutes =
    input.words / WORDS_PER_MINUTE +
    (input.inlineMath * INLINE_MATH_SECONDS + input.displayMath * DISPLAY_MATH_SECONDS) / 60
  return {
    ...input,
    readingMinutes: Math.ceil(readingMinutes),
    totalMinutes: Math.ceil(readingMinutes + input.experimentMinutes),
  }
}
