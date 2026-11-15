import { describe, expect, it } from 'vitest'
import { findPanelOverflow, intersectionArea, isRectOverflow } from './layoutDiagnostics'

function rect(left: number, top: number, width: number, height: number): DOMRect {
  return {
    left,
    top,
    width,
    height,
    right: left + width,
    bottom: top + height,
    x: left,
    y: top,
    toJSON: () => ({}),
  }
}

function withRect(element: Element, value: DOMRect) {
  Object.defineProperty(element, 'getBoundingClientRect', { value: () => value, configurable: true })
}

describe('diagnostyka układu odtwarzacza', () => {
  it('oblicza przecięcie przekazanych prostokątów', () => {
    expect(intersectionArea(rect(0, 0, 40, 20), rect(20, 10, 40, 20))).toBe(200)
    expect(intersectionArea(rect(0, 0, 40, 20), rect(50, 30, 10, 10))).toBe(0)
  })

  it('rozpoznaje wyjście treści poza prawy panel', () => {
    const panel = rect(300, 100, 400, 500)
    expect(isRectOverflow(panel, rect(650, 120, 80, 30))).toBe(true)
    expect(isRectOverflow(panel, rect(320, 120, 300, 30))).toBe(false)
  })

  it('zgłasza element widgetu wystający poza prawy panel', () => {
    const panel = document.createElement('div')
    const values = document.createElement('div')
    values.setAttribute('data-math-values', '')
    panel.append(values)
    withRect(panel, rect(300, 100, 400, 500))
    withRect(values, rect(310, 120, 410, 40))
    expect(findPanelOverflow(panel)).toEqual([values])
  })

  it('nie zgłasza treści mieszczącej się w prawym panelu', () => {
    const panel = document.createElement('div')
    const values = document.createElement('div')
    values.setAttribute('data-math-values', '')
    panel.append(values)
    withRect(panel, rect(300, 100, 400, 500))
    withRect(values, rect(310, 120, 360, 40))
    expect(findPanelOverflow(panel)).toEqual([])
  })
})
