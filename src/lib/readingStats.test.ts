import { describe, expect, it } from 'vitest'
import { computeReadingStats, countWords } from './readingStats'

describe('readingStats', () => {
  it('liczy słowa bez interpunkcji', () => {
    expect(countWords('Ala ma kota i psa.')).toBe(5)
    expect(countWords('Naprężenie σ = N/A wynosi 150 MPa.')).toBe(7)
    expect(countWords('')).toBe(0)
  })

  it('dodaje czas wzorów i eksperymentów', () => {
    const stats = computeReadingStats({
      words: 180,
      inlineMath: 12,
      displayMath: 0,
      experiments: 1,
      experimentMinutes: 4,
    })
    expect(stats.readingMinutes).toBe(2)
    expect(stats.totalMinutes).toBe(6)
  })

  it('zaokrągla czas w górę i rozdziela czytanie od eksperymentu', () => {
    const stats = computeReadingStats({
      words: 1,
      inlineMath: 0,
      displayMath: 1,
      experiments: 0,
      experimentMinutes: 0,
    })
    expect(stats.readingMinutes).toBe(1)
    expect(stats.totalMinutes).toBe(1)
  })
})
